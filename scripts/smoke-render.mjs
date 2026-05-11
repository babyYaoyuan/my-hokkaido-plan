import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const rootDir = process.cwd();
const tripDataSource = fs.readFileSync(path.join(rootDir, "assets", "trip-data.js"), "utf8");
const appSource = fs.readFileSync(path.join(rootDir, "assets", "app.js"), "utf8");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function createLeafletStub(stats) {
  return {
    map() {
      stats.maps += 1;
      return {
        fitBounds() {
          stats.fitBounds += 1;
        },
        setView() {
          stats.setView += 1;
        }
      };
    },
    tileLayer() {
      stats.tileLayers += 1;
      return {
        addTo() {
          return this;
        }
      };
    },
    polyline() {
      stats.polylines += 1;
      const line = {
        addTo() {
          return line;
        },
        getBounds() {
          return [[0, 0], [1, 1]];
        }
      };
      return line;
    },
    circleMarker() {
      stats.markers += 1;
      return {
        bindPopup() {
          stats.popups += 1;
          return this;
        },
        addTo() {
          return this;
        }
      };
    }
  };
}

function renderPage(dataset, options = {}) {
  const root = { innerHTML: "" };
  const mapElements = new Map();
  const checklist = [];
  const leafletStats = {
    maps: 0,
    tileLayers: 0,
    polylines: 0,
    markers: 0,
    popups: 0,
    fitBounds: 0,
    setView: 0
  };

  const document = {
    title: "",
    body: { dataset },
    getElementById(id) {
      return id === "app" ? root : null;
    },
    querySelector(selector) {
      if (!mapElements.has(selector)) {
        mapElements.set(selector, { innerHTML: "", selector });
      }
      return mapElements.get(selector);
    },
    querySelectorAll(selector) {
      return selector === "[data-check]" ? checklist : [];
    }
  };

  const localStorage = {
    getItem() {
      return null;
    },
    setItem() {}
  };

  const sandbox = {
    window: {},
    document,
    localStorage,
    URLSearchParams,
    console
  };

  vm.runInNewContext(tripDataSource, sandbox, { filename: "assets/trip-data.js" });
  if (options.leaflet) {
    sandbox.window.L = createLeafletStub(leafletStats);
  }
  vm.runInNewContext(appSource, sandbox, { filename: "assets/app.js" });

  return {
    html: root.innerHTML,
    title: document.title,
    maps: mapElements,
    leafletStats,
    trip: sandbox.window.TRIP_DATA
  };
}

const home = renderPage({ page: "home", base: "" });
assert(home.html.includes("北海道 2026/6/13-6/20"), "Homepage title did not render.");
assert(home.html.includes("查看每日页面"), "Homepage hero action did not render.");
assert(home.html.includes("days/day-03.html"), "Homepage day links did not render from data.");
assert(home.maps.get('[data-map="overview"]')?.innerHTML.includes("fallback-map"), "Fallback overview map did not render.");

const travelDay = renderPage({ page: "day", day: "3", base: "../" });
assert(travelDay.title === "D3｜余市 Nikka + 小樽", "D3 document title did not render.");
assert(travelDay.html.includes("余市 Nikka + 小樽"), "D3 content did not render.");
assert(travelDay.html.includes("https://www.google.com/maps/dir/?api=1"), "D3 Google direction links did not render.");
assert(travelDay.html.includes("travelmode=transit"), "D3 transit direction mode did not render.");
assert(travelDay.html.includes("dir_action=navigate"), "D3 mobile navigation intent did not render.");
assert(travelDay.html.includes("origin=43.0582%2C141.35"), "D3 direction links did not use coordinate origins.");
assert(travelDay.html.includes("destination=43.0687%2C141.3508"), "D3 direction links did not use coordinate destinations.");
assert(travelDay.maps.get('[data-map="day-3"]')?.innerHTML.includes("fallback-map"), "D3 fallback map did not render.");

const cityDay = renderPage({ page: "day", day: "4", base: "../" });
assert(cityDay.html.includes("札幌祭最终日 + 购物深逛"), "D4 city day did not render.");
assert(cityDay.html.includes("../days/day-05.html"), "D4 next-day link did not use trip data file path.");

const flexibleDay = renderPage({ page: "day", day: "7", base: "../" });
assert(flexibleDay.html.includes("备选 A：积丹海胆/神威岬"), "D7 alternatives did not render.");
assert(flexibleDay.html.includes("备选方案"), "D7 alternatives section did not render.");

const leafletDay = renderPage({ page: "day", day: "3", base: "../" }, { leaflet: true });
assert(leafletDay.leafletStats.maps === 1, "Leaflet map path did not initialize a map.");
assert(leafletDay.leafletStats.markers > 0, "Leaflet map path did not create point markers.");
assert(leafletDay.leafletStats.polylines === 1, "Leaflet map path did not create a route line.");

console.log("Smoke render checks passed.");
