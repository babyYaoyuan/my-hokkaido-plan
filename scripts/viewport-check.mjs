import fs from "node:fs/promises";
import http from "node:http";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";

const rootDir = process.cwd();
const outputDir = path.join(os.tmpdir(), "hokkaido-responsive-checks");
const edgeCandidates = [
  process.env.EDGE_PATH,
  "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe"
].filter(Boolean);

const pages = [
  { name: "home", path: "/index.html" },
  { name: "travel-day", path: "/days/day-03.html" },
  { name: "city-day", path: "/days/day-04.html" },
  { name: "flex-day", path: "/days/day-07.html" }
];

const viewports = [
  { name: "desktop", width: 1366, height: 900, mobile: false },
  { name: "tablet", width: 820, height: 1000, mobile: false },
  { name: "mobile", width: 390, height: 844, mobile: true }
];

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function findBrowser() {
  for (const candidate of edgeCandidates) {
    if (await exists(candidate)) {
      return candidate;
    }
  }
  throw new Error("No supported Chromium browser found. Set EDGE_PATH to run viewport checks.");
}

function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      const port = typeof address === "object" ? address.port : null;
      server.close(() => resolve(port));
    });
  });
}

function requestJson(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let body = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => {
        body += chunk;
      });
      res.on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          reject(error);
        }
      });
    }).on("error", reject);
  });
}

function requestOk(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      res.resume();
      res.on("end", () => resolve(res.statusCode && res.statusCode < 500));
    }).on("error", reject);
  });
}

async function waitForJson(url, timeoutMs = 8000) {
  const deadline = Date.now() + timeoutMs;
  let lastError;
  while (Date.now() < deadline) {
    try {
      return await requestJson(url);
    } catch (error) {
      lastError = error;
      await wait(150);
    }
  }
  throw lastError || new Error(`Timed out waiting for ${url}`);
}

async function waitForHttpOk(url, timeoutMs = 8000) {
  const deadline = Date.now() + timeoutMs;
  let lastError;
  while (Date.now() < deadline) {
    try {
      if (await requestOk(url)) {
        return;
      }
    } catch (error) {
      lastError = error;
    }
    await wait(150);
  }
  throw lastError || new Error(`Timed out waiting for ${url}`);
}

class CdpClient {
  constructor(webSocketUrl) {
    this.webSocketUrl = webSocketUrl;
    this.nextId = 1;
    this.pending = new Map();
    this.waiters = [];
  }

  async connect() {
    this.socket = new WebSocket(this.webSocketUrl);
    this.socket.addEventListener("message", (event) => this.onMessage(event));
    await new Promise((resolve, reject) => {
      this.socket.addEventListener("open", resolve, { once: true });
      this.socket.addEventListener("error", reject, { once: true });
    });
  }

  close() {
    this.socket?.close();
  }

  onMessage(event) {
    const message = JSON.parse(event.data);
    if (message.id && this.pending.has(message.id)) {
      const { resolve, reject } = this.pending.get(message.id);
      this.pending.delete(message.id);
      if (message.error) {
        reject(new Error(message.error.message));
      } else {
        resolve(message.result);
      }
      return;
    }

    this.waiters = this.waiters.filter((waiter) => {
      if (
        message.method === waiter.method
        && (!waiter.sessionId || message.sessionId === waiter.sessionId)
      ) {
        clearTimeout(waiter.timer);
        waiter.resolve(message);
        return false;
      }
      return true;
    });
  }

  send(method, params = {}, sessionId) {
    const id = this.nextId++;
    const payload = { id, method, params };
    if (sessionId) {
      payload.sessionId = sessionId;
    }
    this.socket.send(JSON.stringify(payload));
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
    });
  }

  waitForEvent(method, sessionId, timeoutMs = 5000) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        this.waiters = this.waiters.filter((waiter) => waiter.timer !== timer);
        reject(new Error(`Timed out waiting for ${method}`));
      }, timeoutMs);
      this.waiters.push({ method, sessionId, resolve, timer });
    });
  }
}

async function createSession(client) {
  const { targetId } = await client.send("Target.createTarget", { url: "about:blank" });
  const { sessionId } = await client.send("Target.attachToTarget", {
    targetId,
    flatten: true
  });
  await client.send("Page.enable", {}, sessionId);
  await client.send("Runtime.enable", {}, sessionId);
  await client.send("Network.enable", {}, sessionId);
  await client.send("Network.setBlockedURLs", {
    urls: ["https://unpkg.com/*"]
  }, sessionId);
  return sessionId;
}

async function inspectPage(client, sessionId, baseUrl, page, viewport) {
  await client.send("Emulation.setDeviceMetricsOverride", {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: viewport.mobile ? 2 : 1,
    mobile: viewport.mobile
  }, sessionId);

  const loadEvent = client.waitForEvent("Page.loadEventFired", sessionId).catch(() => null);
  await client.send("Page.navigate", { url: `${baseUrl}${page.path}` }, sessionId);
  await loadEvent;
  await wait(500);

  const expression = `(() => {
    const doc = document.documentElement;
    const body = document.body;
    const maxScrollWidth = Math.max(doc.scrollWidth, body ? body.scrollWidth : 0);
    const routeLinks = [...document.querySelectorAll(".nav-link")].map((link) => link.href);
    const mapHeights = [...document.querySelectorAll(".route-map")].map((el) => Math.round(el.getBoundingClientRect().height));
    const targetSelector = ".button, .nav-link, .place-link, .day-pager a, .nav a";
    const shortTargets = [...document.querySelectorAll(targetSelector)]
      .map((el) => ({ text: el.textContent.trim(), height: Math.round(el.getBoundingClientRect().height) }))
      .filter((item) => item.height > 0 && item.height < ${viewport.mobile ? 38 : 34});
    const overflowElements = [...document.body.querySelectorAll("*")]
      .map((el) => {
        const rect = el.getBoundingClientRect();
        const allowedScrollContainer = el.closest(".nav, .day-pager, .table-wrap");
        return {
          tag: el.tagName.toLowerCase(),
          className: typeof el.className === "string" ? el.className : "",
          text: el.textContent.trim().slice(0, 32),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
          allowedScroll: Boolean(allowedScrollContainer)
        };
      })
      .filter((item) => !item.allowedScroll && item.width > 0 && (item.right > window.innerWidth + 1 || item.left < -1))
      .slice(0, 8);
    return {
      title: document.title,
      width: window.innerWidth,
      height: window.innerHeight,
      scrollWidth: maxScrollWidth,
      overflowX: Math.max(0, maxScrollWidth - window.innerWidth),
      routeLinks,
      mapHeights,
      shortTargets,
      overflowElements
    };
  })()`;

  const result = await client.send("Runtime.evaluate", {
    expression,
    returnByValue: true
  }, sessionId);
  const value = result.result.value;

  const screenshot = await client.send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: false
  }, sessionId);
  const screenshotPath = path.join(outputDir, `${page.name}-${viewport.name}.png`);
  await fs.writeFile(screenshotPath, Buffer.from(screenshot.data, "base64"));

  return { ...value, screenshotPath };
}

function validateResult(page, viewport, result) {
  const errors = [];
  if (result.overflowX > 1) {
    errors.push(`${page.name}/${viewport.name} has page-level horizontal overflow (${result.overflowX}px).`);
  }
  if (result.overflowElements.length > 0) {
    errors.push(`${page.name}/${viewport.name} has overflowing elements: ${JSON.stringify(result.overflowElements)}`);
  }
  if (result.shortTargets.length > 0) {
    errors.push(`${page.name}/${viewport.name} has undersized touch/click targets: ${JSON.stringify(result.shortTargets)}`);
  }
  if (page.name !== "home") {
    if (result.routeLinks.length === 0) {
      errors.push(`${page.name}/${viewport.name} did not render Google direction links.`);
    }
    result.routeLinks.forEach((href) => {
      if (!href.includes("/maps/dir/") || !href.includes("api=1") || !href.includes("destination=") || !href.includes("travelmode=")) {
        errors.push(`${page.name}/${viewport.name} has malformed direction link: ${href}`);
      }
      if (!href.includes("dir_action=navigate")) {
        errors.push(`${page.name}/${viewport.name} direction link is missing dir_action=navigate: ${href}`);
      }
      if (!/destination=[^&]*%2C/i.test(href)) {
        errors.push(`${page.name}/${viewport.name} direction link does not use coordinate destination: ${href}`);
      }
    });
  }
  result.mapHeights.forEach((height) => {
    const minHeight = viewport.mobile ? 320 : 360;
    if (height < minHeight) {
      errors.push(`${page.name}/${viewport.name} map is too short (${height}px).`);
    }
  });
  return errors;
}

let devServer;
let browser;
let client;

try {
  await fs.mkdir(outputDir, { recursive: true });
  const browserPath = await findBrowser();
  const devPort = 4173;
  const debugPort = await getFreePort();
  const userDataDir = await fs.mkdtemp(path.join(os.tmpdir(), "hokkaido-edge-"));

  devServer = spawn(process.execPath, ["dev-server.mjs"], {
    cwd: rootDir,
    stdio: "ignore",
    windowsHide: true
  });

  await waitForHttpOk(`http://127.0.0.1:${devPort}/index.html`);

  browser = spawn(browserPath, [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    `--remote-debugging-port=${debugPort}`,
    `--user-data-dir=${userDataDir}`,
    "about:blank"
  ], {
    stdio: "ignore",
    windowsHide: true
  });

  const version = await waitForJson(`http://127.0.0.1:${debugPort}/json/version`);
  client = new CdpClient(version.webSocketDebuggerUrl);
  await client.connect();
  const sessionId = await createSession(client);
  const baseUrl = `http://127.0.0.1:${devPort}`;
  const allErrors = [];

  for (const page of pages) {
    for (const viewport of viewports) {
      const result = await inspectPage(client, sessionId, baseUrl, page, viewport);
      const errors = validateResult(page, viewport, result);
      allErrors.push(...errors);
      console.log(`${page.name}/${viewport.name}: overflow=${result.overflowX}px, maps=${result.mapHeights.join(",") || "none"}, screenshot=${result.screenshotPath}`);
    }
  }

  if (allErrors.length > 0) {
    console.error("Viewport checks failed:");
    allErrors.forEach((error) => console.error(`- ${error}`));
    process.exitCode = 1;
  } else {
    console.log(`Viewport checks passed. Screenshots: ${outputDir}`);
  }
} finally {
  client?.close();
  browser?.kill();
  devServer?.kill();
}
