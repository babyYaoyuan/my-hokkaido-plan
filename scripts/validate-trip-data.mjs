import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";

const rootDir = process.cwd();
const tripDataPath = path.join(rootDir, "assets", "trip-data.js");
const errors = [];

function addError(message) {
  errors.push(message);
}

function isObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function expectObject(value, label) {
  if (!isObject(value)) {
    addError(`${label} must be an object.`);
    return false;
  }
  return true;
}

function expectString(value, label) {
  if (!isString(value)) {
    addError(`${label} must be a non-empty string.`);
    return false;
  }
  return true;
}

function expectArray(value, label) {
  if (!Array.isArray(value)) {
    addError(`${label} must be an array.`);
    return false;
  }
  return true;
}

function expectUrl(value, label) {
  if (!expectString(value, label)) {
    return;
  }
  try {
    const parsed = new URL(value);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      addError(`${label} must use http or https.`);
    }
  } catch {
    addError(`${label} must be a valid URL.`);
  }
}

function validateTextArray(value, label) {
  if (!expectArray(value, label)) {
    return;
  }
  value.forEach((item, index) => expectString(item, `${label}[${index}]`));
}

function validatePoint(point, label) {
  if (!expectObject(point, label)) {
    return;
  }
  expectString(point.id, `${label}.id`);
  expectString(point.name, `${label}.name`);
  expectString(point.query, `${label}.query`);
  if (!isNumber(point.lat) || point.lat < -90 || point.lat > 90) {
    addError(`${label}.lat must be a latitude number between -90 and 90.`);
  }
  if (!isNumber(point.lng) || point.lng < -180 || point.lng > 180) {
    addError(`${label}.lng must be a longitude number between -180 and 180.`);
  }
}

function validateLeg(leg, label, pointNames) {
  if (!expectObject(leg, label)) {
    return;
  }
  expectString(leg.from, `${label}.from`);
  expectString(leg.to, `${label}.to`);
  expectString(leg.time, `${label}.time`);
  expectString(leg.duration, `${label}.duration`);
  expectString(leg.note, `${label}.note`);

  if (!["walking", "transit", "driving"].includes(leg.mode)) {
    addError(`${label}.mode must be walking, transit, or driving.`);
  }
  if (isString(leg.from) && !pointNames.has(leg.from)) {
    addError(`${label}.from references "${leg.from}", which is not in points.`);
  }
  if (isString(leg.to) && !pointNames.has(leg.to)) {
    addError(`${label}.to references "${leg.to}", which is not in points.`);
  }
}

function validateRoute(route, label) {
  if (!expectObject(route, label)) {
    return;
  }
  expectString(route.title, `${label}.title`);
  expectString(route.text, `${label}.text`);
  if (!expectArray(route.points, `${label}.points`)) {
    return;
  }
  if (!expectArray(route.legs, `${label}.legs`)) {
    return;
  }

  const pointIds = new Set();
  const pointNames = new Set();
  route.points.forEach((point, index) => {
    validatePoint(point, `${label}.points[${index}]`);
    if (isString(point.id)) {
      if (pointIds.has(point.id)) {
        addError(`${label}.points[${index}].id duplicates "${point.id}".`);
      }
      pointIds.add(point.id);
    }
    if (isString(point.name)) {
      if (pointNames.has(point.name)) {
        addError(`${label}.points[${index}].name duplicates "${point.name}".`);
      }
      pointNames.add(point.name);
    }
  });
  route.legs.forEach((leg, index) => validateLeg(leg, `${label}.legs[${index}]`, pointNames));
}

function validateHtmlShells(trip) {
  const indexPath = path.join(rootDir, "index.html");
  if (!fs.existsSync(indexPath)) {
    addError("index.html must exist.");
  } else {
    const html = fs.readFileSync(indexPath, "utf8");
    if (!html.includes('data-page="home"')) {
      addError('index.html must include body data-page="home".');
    }
    const dataIndex = html.indexOf("assets/trip-data.js");
    const appIndex = html.indexOf("assets/app.js");
    if (dataIndex === -1 || appIndex === -1 || dataIndex > appIndex) {
      addError("index.html must load assets/trip-data.js before assets/app.js.");
    }
  }

  const referencedFiles = new Set();
  trip.days.forEach((day) => {
    if (!isString(day.file)) {
      return;
    }
    referencedFiles.add(day.file.replaceAll("\\", "/"));
    const shellPath = path.join(rootDir, ...day.file.split("/"));
    if (!fs.existsSync(shellPath)) {
      addError(`${day.file} must exist for D${day.id}.`);
      return;
    }
    const html = fs.readFileSync(shellPath, "utf8");
    if (!html.includes('data-page="day"')) {
      addError(`${day.file} must include body data-page="day".`);
    }
    if (!html.includes(`data-day="${day.id}"`)) {
      addError(`${day.file} must include data-day="${day.id}".`);
    }
    if (!html.includes('data-base="../"')) {
      addError(`${day.file} must include data-base="../".`);
    }
    const dataIndex = html.indexOf("../assets/trip-data.js");
    const appIndex = html.indexOf("../assets/app.js");
    if (dataIndex === -1 || appIndex === -1 || dataIndex > appIndex) {
      addError(`${day.file} must load ../assets/trip-data.js before ../assets/app.js.`);
    }
  });

  const daysDir = path.join(rootDir, "days");
  if (fs.existsSync(daysDir)) {
    const existingDayFiles = fs.readdirSync(daysDir)
      .filter((file) => /^day-\d+\.html$/.test(file))
      .map((file) => `days/${file}`);
    existingDayFiles.forEach((file) => {
      if (!referencedFiles.has(file)) {
        addError(`${file} exists but is not referenced by trip.days.`);
      }
    });
  }

  if (!fs.existsSync(path.join(rootDir, ".nojekyll"))) {
    addError(".nojekyll must exist for GitHub Pages static delivery.");
  }
}

function loadTripData() {
  const source = fs.readFileSync(tripDataPath, "utf8");
  const sandbox = { window: {} };
  vm.runInNewContext(source, sandbox, { filename: tripDataPath });
  return sandbox.window.TRIP_DATA;
}

let trip;
try {
  trip = loadTripData();
} catch (error) {
  addError(`Unable to load assets/trip-data.js: ${error.message}`);
}

if (!expectObject(trip, "window.TRIP_DATA")) {
  report();
}

expectString(trip.title, "title");
expectString(trip.subtitle, "subtitle");
expectString(trip.navTitle, "navTitle");
expectString(trip.photoGridLabel, "photoGridLabel");
expectString(trip.checklistTitle, "checklistTitle");
expectString(trip.hotelsNote, "hotelsNote");
expectString(trip.footerNote, "footerNote");

if (expectObject(trip.hero, "hero")) {
  expectString(trip.hero.eyebrow, "hero.eyebrow");
  expectString(trip.hero.lede, "hero.lede");
  if (expectArray(trip.hero.metrics, "hero.metrics")) {
    trip.hero.metrics.forEach((metric, index) => {
      if (expectObject(metric, `hero.metrics[${index}]`)) {
        expectString(metric.value, `hero.metrics[${index}].value`);
        expectString(metric.text, `hero.metrics[${index}].text`);
      }
    });
  }
  ["primaryAction", "secondaryAction"].forEach((name) => {
    if (expectObject(trip.hero[name], `hero.${name}`)) {
      expectString(trip.hero[name].label, `hero.${name}.label`);
      expectString(trip.hero[name].href, `hero.${name}.href`);
    }
  });
}

if (expectArray(trip.photos, "photos")) {
  trip.photos.forEach((photo, index) => {
    if (expectObject(photo, `photos[${index}]`)) {
      expectUrl(photo.src, `photos[${index}].src`);
      expectString(photo.label, `photos[${index}].label`);
    }
  });
}

if (expectArray(trip.overview, "overview")) {
  trip.overview.forEach((item, index) => {
    if (expectObject(item, `overview[${index}]`)) {
      expectString(item.label, `overview[${index}].label`);
      expectString(item.value, `overview[${index}].value`);
      expectString(item.text, `overview[${index}].text`);
    }
  });
}

validateRoute(trip.overviewRoute, "overviewRoute");

if (expectArray(trip.hotels, "hotels")) {
  trip.hotels.forEach((hotel, index) => {
    if (expectObject(hotel, `hotels[${index}]`)) {
      expectString(hotel.area, `hotels[${index}].area`);
      expectString(hotel.date, `hotels[${index}].date`);
      expectString(hotel.text, `hotels[${index}].text`);
    }
  });
}

validateTextArray(trip.checklist, "checklist");

if (expectArray(trip.days, "days")) {
  const dayIds = new Set();
  const dayFiles = new Set();
  trip.days.forEach((day, index) => {
    const label = `days[${index}]`;
    if (!expectObject(day, label)) {
      return;
    }

    if (!Number.isInteger(day.id)) {
      addError(`${label}.id must be an integer.`);
    } else if (dayIds.has(day.id)) {
      addError(`${label}.id duplicates ${day.id}.`);
    }
    dayIds.add(day.id);

    [
      "file",
      "date",
      "stay",
      "title",
      "shortTitle",
      "theme",
      "intensity",
      "summary"
    ].forEach((field) => expectString(day[field], `${label}.${field}`));

    if (isString(day.file)) {
      if (dayFiles.has(day.file)) {
        addError(`${label}.file duplicates ${day.file}.`);
      }
      dayFiles.add(day.file);
    }

    validateTextArray(day.tags, `${label}.tags`);
    validateTextArray(day.food, `${label}.food`);
    validateTextArray(day.shopping, `${label}.shopping`);
    validateTextArray(day.planB, `${label}.planB`);

    validateRoute({
      title: day.title,
      text: day.summary,
      points: day.points,
      legs: day.legs
    }, label);

    if (expectArray(day.timeline, `${label}.timeline`)) {
      day.timeline.forEach((item, timelineIndex) => {
        if (expectObject(item, `${label}.timeline[${timelineIndex}]`)) {
          expectString(item.time, `${label}.timeline[${timelineIndex}].time`);
          expectString(item.title, `${label}.timeline[${timelineIndex}].title`);
          expectString(item.text, `${label}.timeline[${timelineIndex}].text`);
        }
      });
    }

    if (day.alternatives !== undefined) {
      if (expectArray(day.alternatives, `${label}.alternatives`)) {
        day.alternatives.forEach((item, altIndex) => {
          if (expectObject(item, `${label}.alternatives[${altIndex}]`)) {
            expectString(item.title, `${label}.alternatives[${altIndex}].title`);
            expectString(item.text, `${label}.alternatives[${altIndex}].text`);
          }
        });
      }
    }
  });
}

if (expectArray(trip.sources, "sources")) {
  trip.sources.forEach((source, index) => {
    if (expectObject(source, `sources[${index}]`)) {
      expectString(source.label, `sources[${index}].label`);
      expectUrl(source.url, `sources[${index}].url`);
    }
  });
}

if (trip?.days) {
  validateHtmlShells(trip);
}

report();

function report() {
  if (errors.length > 0) {
    console.error("Trip data validation failed:");
    errors.forEach((error) => console.error(`- ${error}`));
    process.exit(1);
  }
  console.log("Trip data validation passed.");
}
