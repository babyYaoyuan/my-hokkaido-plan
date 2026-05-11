(function () {
  const trip = window.TRIP_DATA;
  const root = document.getElementById("app");
  const base = document.body.dataset.base || "";
  const page = document.body.dataset.page || "home";

  if (!trip || !root) {
    return;
  }

  const esc = (value) => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

  const path = (target) => `${base}${target}`;

  const modeLabel = {
    walking: "步行",
    transit: "公共交通",
    driving: "驾车/打车"
  };

  function hasCoordinates(point) {
    return point
      && Number.isFinite(point.lat)
      && Number.isFinite(point.lng);
  }

  function googleMapsValue(point) {
    if (hasCoordinates(point)) {
      return `${point.lat},${point.lng}`;
    }
    return point?.query || point?.name || String(point || "");
  }

  function googleDirectionsUrl(from, to, mode) {
    const params = new URLSearchParams({
      api: "1",
      destination: googleMapsValue(to),
      travelmode: mode || "transit",
      dir_action: "navigate"
    });

    const origin = googleMapsValue(from);
    if (origin) {
      params.set("origin", origin);
    }
    if (from?.placeId) {
      params.set("origin_place_id", from.placeId);
    }
    if (to?.placeId) {
      params.set("destination_place_id", to.placeId);
    }

    return `https://www.google.com/maps/dir/?${params.toString()}`;
  }

  function googlePlaceUrl(point) {
    const params = new URLSearchParams({
      api: "1",
      query: googleMapsValue(point)
    });
    if (point?.placeId) {
      params.set("query_place_id", point.placeId);
    }
    return `https://www.google.com/maps/search/?${params.toString()}`;
  }

  function renderTopbar(currentDayId) {
    const dayLinks = trip.days
      .filter((day) => day.id > 0)
      .map((day) => {
        const current = currentDayId === day.id ? ' aria-current="page"' : "";
        return `<a href="${esc(path(day.file))}"${current}>${esc(day.date.slice(0, 4))}</a>`;
      })
      .join("");

    return `
      <header class="topbar">
        <div class="topbar-inner">
          <a class="brand" href="${path("index.html")}">${esc(trip.navTitle)}</a>
          <nav class="nav" aria-label="主要导航">
            <a href="${path("index.html")}"${currentDayId === null ? ' aria-current="page"' : ""}>总览</a>
            ${dayLinks}
            <a href="${path("index.html#hotels")}">住宿</a>
            <a href="${path("index.html#sources")}">来源</a>
          </nav>
        </div>
      </header>
    `;
  }

  function renderPhotoGrid() {
    return `
      <div class="photo-grid" aria-label="${esc(trip.photoGridLabel)}">
        ${trip.photos.map((photo, index) => `
          <figure class="photo-tile${index === 0 ? " large" : ""}">
            <img src="${esc(photo.src)}" alt="${esc(photo.label)}">
            <figcaption class="photo-label">${esc(photo.label)}</figcaption>
          </figure>
        `).join("")}
      </div>
    `;
  }

  function renderHero() {
    const hero = trip.hero;
    return `
      <div class="hero">
        <div class="hero-copy">
          <p class="eyebrow">${esc(hero.eyebrow)}</p>
          <h1>${esc(trip.title)}</h1>
          <p class="lede">${esc(hero.lede)}</p>
          <div class="metric-row">
            ${hero.metrics.map((metric) => `
              <div class="metric"><strong>${esc(metric.value)}</strong><span>${esc(metric.text)}</span></div>
            `).join("")}
          </div>
          <div class="hero-actions">
            <a class="button primary" href="${esc(hero.primaryAction.href)}">${esc(hero.primaryAction.label)}</a>
            <a class="button" href="${esc(hero.secondaryAction.href)}">${esc(hero.secondaryAction.label)}</a>
          </div>
        </div>
        ${renderPhotoGrid()}
      </div>
    `;
  }

  function renderOverview() {
    return `
      <section>
        <h2>路线策略</h2>
        <div class="overview-grid">
          ${trip.overview.map((item) => `
            <div class="summary-card">
              <strong>${esc(item.value)}</strong>
              <p>${esc(item.text)}</p>
            </div>
          `).join("")}
        </div>
      </section>
    `;
  }

  function getOverviewRoute() {
    return trip.overviewRoute;
  }

  function renderMapSection(route, options = {}) {
    const title = options.title || route.title || "路线图";
    const text = options.text || route.text || "地图上的线段对应当天主要移动，下面每一段都有 Google 导航入口。";
    const homeClass = options.home ? " home-map" : "";
    return `
      <section class="map-section" id="${options.id || "route-map"}">
        <div class="map-head">
          <h2>${esc(title)}</h2>
          <p>${esc(text)}</p>
        </div>
        <div class="route-map${homeClass}" data-map="${esc(options.mapId || "main")}"></div>
        <div class="map-note">若地图底图加载较慢，路线和地点仍会以简化图显示；Google 导航按钮会直接打开 Google Maps。</div>
      </section>
    `;
  }

  function renderDayCards() {
    return `
      <section id="days">
        <h2>每日页面</h2>
        <div class="day-grid">
          ${trip.days.map((day) => `
            <a class="day-card" href="${esc(path(day.file))}">
              <div>
                <div class="day-meta"><span>${esc(day.date)}</span><span>${esc(day.stay)}</span><span>${esc(day.intensity)}</span></div>
                <h3 class="card-title">D${day.id}｜${esc(day.shortTitle)}</h3>
                <p class="card-text">${esc(day.summary)}</p>
              </div>
              <div class="chip-row">
                ${day.tags.map((tag) => `<span class="tag">${esc(tag)}</span>`).join("")}
              </div>
            </a>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderHotels() {
    return `
      <section id="hotels">
        <h2>住宿动作</h2>
        <div class="two-col">
          ${trip.hotels.map((hotel) => `
            <div class="mini-card">
              <strong>${esc(hotel.area)}｜${esc(hotel.date)}</strong>
              <p>${esc(hotel.text)}</p>
            </div>
          `).join("")}
        </div>
        <p class="notice" style="margin-top: 14px;">${esc(trip.hotelsNote)}</p>
      </section>
    `;
  }

  function renderChecklist() {
    return `
      <section>
        <h2>${esc(trip.checklistTitle)}</h2>
        <div class="two-col">
          ${trip.checklist.map((item, index) => `
            <label class="mini-card">
              <input type="checkbox" data-check="item-${index}">
              ${esc(item)}
            </label>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderSources() {
    return `
      <section id="sources">
        <h2>关键来源</h2>
        <ul class="source-list">
          ${trip.sources.map((source) => `<li><a href="${esc(source.url)}">${esc(source.label)}</a></li>`).join("")}
        </ul>
        <p class="footer-note">${esc(trip.footerNote)}</p>
      </section>
    `;
  }

  function renderHome() {
    root.innerHTML = `
      ${renderTopbar(null)}
      <main class="page-shell">
        ${renderHero()}
        ${renderOverview()}
        ${renderMapSection(getOverviewRoute(), {
          id: "route-map",
          mapId: "overview",
          home: true
        })}
        ${renderDayCards()}
        ${renderHotels()}
        ${renderChecklist()}
        ${renderSources()}
      </main>
    `;
    initMaps([{ selector: '[data-map="overview"]', route: getOverviewRoute() }]);
    initChecklist();
  }

  function renderDayPager(currentId) {
    return `
      <nav class="day-pager" aria-label="每日页面">
        ${trip.days.map((day) => `
          <a href="${esc(path(day.file))}"${day.id === currentId ? ' aria-current="page"' : ""}>D${day.id}</a>
        `).join("")}
      </nav>
    `;
  }

  function renderTimeline(day) {
    return `
      <section>
        <h2>当天时间线</h2>
        <div class="timeline">
          ${day.timeline.map((item) => `
            <article class="timeline-item">
              <div class="timeline-time">${esc(item.time)}</div>
              <div>
                <h3>${esc(item.title)}</h3>
                <p>${esc(item.text)}</p>
              </div>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  function findPoint(day, name) {
    return day.points.find((point) => point.name === name) || { name, query: name };
  }

  function renderLegs(day) {
    return `
      <section>
        <h2>分段导航</h2>
        <div class="leg-list">
          ${day.legs.map((leg, index) => {
            const from = findPoint(day, leg.from);
            const to = findPoint(day, leg.to);
            return `
              <article class="leg-card">
                <div class="leg-top">
                  <div>
                    <div class="leg-title">${index + 1}. ${esc(leg.from)} → ${esc(leg.to)}</div>
                    <div class="leg-meta">${esc(leg.time)} · ${esc(modeLabel[leg.mode] || leg.mode)} · ${esc(leg.duration)}</div>
                  </div>
                </div>
                <p class="leg-note">${esc(leg.note)}</p>
                <div class="leg-actions">
                  <a class="nav-link" href="${googleDirectionsUrl(from, to, leg.mode)}" target="_blank" rel="noreferrer">Google 导航</a>
                  <a class="place-link" href="${googlePlaceUrl(from)}" target="_blank" rel="noreferrer">起点定位</a>
                  <a class="place-link" href="${googlePlaceUrl(to)}" target="_blank" rel="noreferrer">终点定位</a>
                </div>
              </article>
            `;
          }).join("")}
        </div>
      </section>
    `;
  }

  function renderTextCards(title, items) {
    return `
      <section>
        <h2>${esc(title)}</h2>
        <div class="two-col">
          ${items.map((item) => `
            <div class="mini-card"><p>${esc(item)}</p></div>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderAlternatives(day) {
    if (!day.alternatives || day.alternatives.length === 0) {
      return "";
    }

    return `
      <section>
        <h2>备选方案</h2>
        <div class="alt-list">
          ${day.alternatives.map((item) => `
            <article class="alt-card">
              <h3>${esc(item.title)}</h3>
              <p>${esc(item.text)}</p>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }

  function renderDayPage(day) {
    const previous = trip.days.find((item) => item.id === day.id - 1);
    const next = trip.days.find((item) => item.id === day.id + 1);
    document.title = `D${day.id}｜${day.title}`;

    root.innerHTML = `
      ${renderTopbar(day.id)}
      <main class="page-shell">
        <div class="day-hero">
          <div class="breadcrumb"><a href="${path("index.html")}">总览</a> / D${day.id}</div>
          <p class="eyebrow">${esc(day.date)} · ${esc(day.stay)} · ${esc(day.intensity)}</p>
          <h1>D${day.id}｜${esc(day.title)}</h1>
          <p class="lede">${esc(day.theme)}</p>
          <div class="chip-row">
            ${day.tags.map((tag) => `<span class="tag">${esc(tag)}</span>`).join("")}
          </div>
          <div class="inline-actions">
            ${previous ? `<a class="button" href="${esc(path(previous.file))}">上一天 D${previous.id}</a>` : ""}
            ${next ? `<a class="button primary" href="${esc(path(next.file))}">下一天 D${next.id}</a>` : ""}
            <a class="button" href="${path("index.html#days")}">回到每日总览</a>
          </div>
          ${renderDayPager(day.id)}
        </div>
        <div class="day-layout">
          <div>
            ${renderTimeline(day)}
            ${renderLegs(day)}
          </div>
          <div>
            ${renderMapSection(day, {
              mapId: `day-${day.id}`,
              title: "当天路线图",
              text: "线段按当天主要移动顺序绘制；公共交通时刻以出发前查询为准。"
            })}
            ${renderTextCards("吃什么", day.food)}
            ${renderTextCards("购物和小任务", day.shopping)}
            ${renderTextCards("Plan B", day.planB)}
            ${renderAlternatives(day)}
          </div>
        </div>
      </main>
    `;

    initMaps([{ selector: `[data-map="day-${day.id}"]`, route: day }]);
  }

  function initMaps(mapConfigs) {
    mapConfigs.forEach((config) => {
      const element = document.querySelector(config.selector);
      if (!element) {
        return;
      }

      if (window.L) {
        renderLeafletMap(element, config.route);
      } else {
        renderFallbackMap(element, config.route);
      }
    });
  }

  function routeLatLngs(route) {
    return route.points.map((point) => [point.lat, point.lng]);
  }

  function renderLeafletMap(element, route) {
    const latLngs = routeLatLngs(route);
    const map = window.L.map(element, {
      scrollWheelZoom: false,
      zoomControl: true
    });

    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    const line = window.L.polyline(latLngs, {
      color: "#147c7a",
      weight: 4,
      opacity: .88
    }).addTo(map);

    route.points.forEach((point, index) => {
      window.L.circleMarker([point.lat, point.lng], {
        radius: index === 0 ? 8 : 6,
        color: "#ffffff",
        weight: 2,
        fillColor: index === 0 ? "#b64848" : "#386b9e",
        fillOpacity: .95
      })
        .bindPopup(`<div class="map-popup"><strong>${esc(point.name)}</strong><a href="${googlePlaceUrl(point)}" target="_blank" rel="noreferrer">Google Maps</a></div>`)
        .addTo(map);
    });

    function fitRoute() {
      if (typeof map.invalidateSize === "function") {
        map.invalidateSize();
      }
      if (latLngs.length > 1) {
        map.fitBounds(line.getBounds(), { padding: [28, 28] });
      } else if (latLngs.length === 1) {
        map.setView(latLngs[0], 14);
      }
    }

    fitRoute();
    const schedule = window.requestAnimationFrame
      || ((callback) => (typeof setTimeout === "function" ? setTimeout(callback, 0) : callback()));
    schedule(fitRoute);
    if (typeof setTimeout === "function") {
      setTimeout(fitRoute, 250);
    }
    if (typeof window.addEventListener === "function") {
      window.addEventListener("resize", fitRoute);
    }
  }

  function renderFallbackMap(element, route) {
    const points = route.points;
    const padding = 48;
    const width = 900;
    const height = 460;
    const lats = points.map((point) => point.lat);
    const lngs = points.map((point) => point.lng);
    let minLat = Math.min(...lats);
    let maxLat = Math.max(...lats);
    let minLng = Math.min(...lngs);
    let maxLng = Math.max(...lngs);

    if (maxLat - minLat < .02) {
      minLat -= .01;
      maxLat += .01;
    }
    if (maxLng - minLng < .02) {
      minLng -= .01;
      maxLng += .01;
    }

    const project = (point) => {
      const x = padding + ((point.lng - minLng) / (maxLng - minLng)) * (width - padding * 2);
      const y = padding + ((maxLat - point.lat) / (maxLat - minLat)) * (height - padding * 2);
      return { x, y };
    };

    const projected = points.map(project);
    const polyline = projected.map((point) => `${point.x.toFixed(1)},${point.y.toFixed(1)}`).join(" ");

    element.innerHTML = `
      <svg class="fallback-map" viewBox="0 0 ${width} ${height}" role="img" aria-label="简化路线图">
        <rect x="0" y="0" width="${width}" height="${height}" fill="#eaf0f4"></rect>
        <path d="M0 120 H${width} M0 240 H${width} M0 360 H${width} M180 0 V${height} M360 0 V${height} M540 0 V${height} M720 0 V${height}" stroke="#d7e0e8" stroke-width="1"></path>
        <polyline points="${polyline}" fill="none" stroke="#147c7a" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></polyline>
        ${projected.map((point, index) => `
          <g>
            <circle cx="${point.x.toFixed(1)}" cy="${point.y.toFixed(1)}" r="${index === 0 ? 10 : 8}" fill="${index === 0 ? "#b64848" : "#386b9e"}" stroke="#fff" stroke-width="3"></circle>
            <text x="${Math.min(point.x + 12, width - 220).toFixed(1)}" y="${Math.max(point.y - 10, 24).toFixed(1)}" fill="#1f2933" font-size="18" font-weight="700">${esc(points[index].name)}</text>
          </g>
        `).join("")}
      </svg>
    `;
  }

  function initChecklist() {
    document.querySelectorAll("[data-check]").forEach((box) => {
      const key = `hokkaido-pages-${box.dataset.check}`;
      box.checked = localStorage.getItem(key) === "1";
      box.addEventListener("change", () => {
        localStorage.setItem(key, box.checked ? "1" : "0");
      });
    });
  }

  if (page === "day") {
    const dayId = Number(document.body.dataset.day);
    const day = trip.days.find((item) => item.id === dayId);
    if (day) {
      renderDayPage(day);
    } else {
      renderHome();
    }
  } else {
    renderHome();
  }
}());
