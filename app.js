(function () {
  const R = window.RUELAS;
  const $ = (id) => document.getElementById(id);
  const state = {
    lang: localStorage.getItem('ruelas_lang') || R.CONFIG.defaultLang || 'pt',
    step: 1,
    tripType: 'airport_hotel',
    hotel: null,
    hotelCustom: false,
    pickupHotel: null,
    pickupHotelCustom: false,
    vehicleId: R.VEHICLES[0].id,
    options: {},
    tourId: null,
    tourHotel: null
  };

  function t(key) {
    const pack = R.I18N[state.lang] || R.I18N.pt;
    return pack[key] || (R.I18N.pt[key] || key);
  }

  function headerOffset() {
    const header = document.querySelector('.site-header');
    const topbar = document.querySelector('.topbar');
    let h = 10;
    if (topbar) h += topbar.getBoundingClientRect().height;
    if (header) h += header.getBoundingClientRect().height;
    return h;
  }

  function scrollXOnly(scroller, child) {
    if (!scroller || !child) return;
    const left = child.offsetLeft - (scroller.clientWidth / 2) + (child.offsetWidth / 2);
    scroller.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
  }

  function scrollToId(id) {
    if (!id || id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.pageYOffset - headerOffset();
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
  }

  function money(n) {
    return (Number(n) || 0) + ' €';
  }

  function todayISO() {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  }

  function genId() {
    const d = new Date();
    return 'RU-' + String(d.getFullYear()).slice(-2) + String(d.getMonth() + 1).padStart(2, '0') + '-' + Math.floor(Math.random() * 90000 + 10000);
  }

  function applyI18n() {
    document.documentElement.lang = state.lang === 'pt' ? 'pt-PT' : state.lang;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
    });
    $('top-phone').textContent = R.CONFIG.phone;
    $('top-phone').href = 'tel:' + R.CONFIG.phone.replace(/\s/g, '');
    $('top-email').textContent = R.CONFIG.email;
    $('top-email').href = 'mailto:' + R.CONFIG.email;
    $('contact-phone').textContent = R.CONFIG.phone;
    $('contact-phone').href = 'tel:' + R.CONFIG.phone.replace(/\s/g, '');
    $('contact-email').textContent = R.CONFIG.email;
    $('contact-email').href = 'mailto:' + R.CONFIG.email;
    $('wa-link').href = 'https://wa.me/' + R.CONFIG.whatsapp;
    if ($('wa-float')) $('wa-float').href = 'https://wa.me/' + R.CONFIG.whatsapp;
    if ($('drawer-phone')) {
      $('drawer-phone').href = 'tel:' + R.CONFIG.phone.replace(/\s/g, '');
    }
    if ($('drawer-wa')) $('drawer-wa').href = 'https://wa.me/' + R.CONFIG.whatsapp;
    if ($('drawer-mail')) $('drawer-mail').href = 'mailto:' + R.CONFIG.email;
    if ($('menu-btn')) $('menu-btn').setAttribute('aria-label', t('navMenu'));
    if ($('drawer-close')) $('drawer-close').setAttribute('aria-label', t('menuClose'));
    if ($('tabbar')) $('tabbar').setAttribute('aria-label', t('navMenu'));
    if ($('hotel-count')) $('hotel-count').textContent = (R.HOTELS || []).length + ' ' + t('hotelCount');
    if ($('lb-close')) $('lb-close').setAttribute('aria-label', t('closeGallery'));
    if ($('lb-prev')) $('lb-prev').setAttribute('aria-label', t('prevPhoto'));
    if ($('lb-next')) $('lb-next').setAttribute('aria-label', t('nextPhoto'));
    if ($('hero-place') && $('hero-slides')) {
      const hs = $('hero-slides').querySelectorAll('figure')[window._heroIndex || 0];
      if (hs) $('hero-place').textContent = hs.getAttribute('data-' + state.lang) || hs.getAttribute('data-pt') || '';
    }
    renderLangs();
    renderTripTypes();
    fillLocationSelects();
    renderVehicles();
    renderOptions();
    renderTours();
    renderPlaces();
    renderFleet();
    updateTourTotal();
    updateTotal();
    renderAccountBtn();
    renderAccountHistory();
    if (currentUser() && $('create-account-wrap')) $('create-account-wrap').classList.add('hidden');
  }

  function renderLangs() {
    const html = ['pt', 'en', 'fr', 'es'].map((code) =>
      '<button type="button" class="' + (state.lang === code ? 'on' : '') + '" data-lang="' + code + '">' + code.toUpperCase() + '</button>'
    ).join('');
    if ($('langs')) $('langs').innerHTML = html;
    if ($('drawer-langs')) $('drawer-langs').innerHTML = html;
  }

  function renderTripTypes() {
    const types = [
      ['airport_hotel', 'typeAh'],
      ['hotel_airport', 'typeHa'],
      ['station_hotel', 'typeSh'],
      ['hotel_station', 'typeHs'],
      ['custom', 'typeCustom'],
      ['round_trip', 'typeRt']
    ];
    $('trip-types').innerHTML = types.map(([id, key]) =>
      '<button type="button" class="' + (state.tripType === id ? 'on' : '') + '" data-type="' + id + '">' + t(key) + '</button>'
    ).join('');
  }

  function locationGroupsForPickup() {
    const tt = state.tripType;
    if (tt === 'airport_hotel' || tt === 'round_trip') return { airports: true };
    if (tt === 'hotel_airport' || tt === 'hotel_station') return { hotels: true };
    if (tt === 'station_hotel') return { train: true, metro: true };
    return { airports: true, train: true, metro: true };
  }

  function locationGroupsForDropoff() {
    const tt = state.tripType;
    if (tt === 'hotel_airport') return { airports: true };
    if (tt === 'hotel_station') return { train: true, metro: true };
    return { hotels: true };
  }

  function optionHtml(list, groupLabel) {
    return '<optgroup label="' + groupLabel + '">' + list.map((x) =>
      '<option value="' + x.name + '">' + x.name + (x.line ? ' · ' + x.line : '') + '</option>'
    ).join('') + '</optgroup>';
  }

  function fillSelectFromGroups(sel, groups) {
    let html = '';
    if (groups.airports) html += optionHtml(R.AIRPORTS, t('groupAirports'));
    if (groups.train) html += optionHtml(R.STATIONS_TRAIN, t('groupTrain'));
    if (groups.metro) html += optionHtml(R.STATIONS_METRO, t('groupMetro'));
    if (groups.hotels) html += optionHtml(R.HOTELS.map((h) => ({ name: h.name })), t('hotelLabel'));
    sel.innerHTML = html;
  }

  function usesHotelPickup() {
    return state.tripType === 'hotel_airport' || state.tripType === 'hotel_station';
  }

  function usesHotelDropoff() {
    return state.tripType === 'airport_hotel' || state.tripType === 'station_hotel' || state.tripType === 'custom' || state.tripType === 'round_trip';
  }

  function fillLocationSelects() {
    const hotelPick = usesHotelPickup();
    const hotelDrop = usesHotelDropoff();
    $('pickup').classList.toggle('hidden', hotelPick);
    $('pickup-hotel-combo').classList.toggle('hidden', !hotelPick);
    $('pickup-hotel-extra').classList.toggle('hidden', !hotelPick);
    if (!hotelPick) fillSelectFromGroups($('pickup'), locationGroupsForPickup());
    $('hotel-combo').classList.toggle('hidden', !hotelDrop);
    $('hotel-extra').classList.toggle('hidden', !hotelDrop);
    $('dropoff-select').classList.toggle('hidden', hotelDrop);
    if (!hotelDrop) fillSelectFromGroups($('dropoff-select'), locationGroupsForDropoff());
    const custom = state.tripType === 'custom';
    if ($('custom-pickup-wrap')) $('custom-pickup-wrap').classList.toggle('hidden', !custom);
    const flightOn = state.tripType === 'airport_hotel' || state.tripType === 'hotel_airport' || state.tripType === 'round_trip';
    $('flight-wrap').classList.toggle('hidden', !flightOn);
    $('return-wrap').style.display = state.tripType === 'round_trip' ? 'grid' : 'none';
    if ($('pickup-manual') && $('pickup-manual').checked) $('pickup').classList.add('hidden');
  }

  function hotelHay(h) {
    return [h.name, h.aka, h.area, h.address].filter(Boolean).join(' ');
  }

  function fold(s) {
    return String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function hotelsSorted(list, byArea) {
    return list.slice().sort(function (a, b) {
      if (byArea) {
        const aa = fold(a.area || 'zzz');
        const bb = fold(b.area || 'zzz');
        if (aa !== bb) return aa.localeCompare(bb);
      }
      return fold(a.name).localeCompare(fold(b.name));
    });
  }

  function hotelMatches(q) {
    const list = R.HOTELS || [];
    q = fold(q).trim();
    if (!q) return hotelsSorted(list, true);
    return hotelsSorted(list.filter(function (h) {
      return fold(hotelHay(h)).indexOf(q) !== -1;
    }), false);
  }

  function hotelRowHtml(h) {
    return '<button type="button" data-id="' + h.id + '">' + h.name +
      '<span class="area">' + (h.address || h.area || '') + '</span></button>';
  }

  function bindCombo(inputId, listId, onPick) {
    const input = $(inputId);
    const list = $(listId);
    function draw() {
      const q = (input.value || '').trim();
      const rows = hotelMatches(q);
      if (!rows.length) {
        list.innerHTML = '<button type="button" disabled>' + t('noHotelMatch') + '</button>';
      } else {
        let html = '<div class="combo-head">' + rows.length + ' ' + t('hotelCount') + ' · ' + t('hotelScroll') + '</div>';
        if (!q) {
          let last = '';
          rows.forEach(function (h) {
            const area = h.area || '';
            if (area && area !== last) {
              html += '<div class="combo-group">' + area + '</div>';
              last = area;
            }
            html += hotelRowHtml(h);
          });
        } else {
          html += rows.map(hotelRowHtml).join('');
        }
        list.innerHTML = html;
      }
      list.classList.add('open');
    }
    input.addEventListener('focus', draw);
    input.addEventListener('click', draw);
    input.addEventListener('input', function () {
      onPick(null);
      draw();
    });
    list.addEventListener('click', function (e) {
      const btn = e.target.closest('button[data-id]');
      if (!btn) return;
      const h = R.HOTELS.find((x) => x.id === btn.getAttribute('data-id'));
      if (!h) return;
      input.value = h.name;
      list.classList.remove('open');
      onPick(h);
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest('#' + inputId) && !e.target.closest('#' + listId)) list.classList.remove('open');
    });
  }

  function renderVehicles() {
    $('vehicles').innerHTML = R.VEHICLES.map((v) =>
      '<article class="vcard' + (state.vehicleId === v.id ? ' on' : '') + '" data-vid="' + v.id + '">' +
        '<header><div><span class="badge">' + t(v.badgeKey) + '</span><h3 class="serif" style="margin:8px 0 0;font-size:24px">' + t(v.nameKey) + '</h3><div class="meta">' + v.models + '</div></div>' +
        '<div class="price">' + money(v.price) + '</div></header>' +
        '<div class="meta">' + v.pax + ' ' + t('paxShort') + ' · ' + v.bags + ' ' + t('bagsShort') + '</div>' +
      '</article>'
    ).join('');
  }

  function renderOptions() {
    $('options').innerHTML = R.OPTIONS.map((o) =>
      '<label class="opt' + (state.options[o.id] ? ' on' : '') + '"><div><strong>' + t(o.nameKey) + '</strong><div class="meta">' + t(o.descKey) + '</div></div>' +
      '<div><input type="checkbox" data-oid="' + o.id + '"' + (state.options[o.id] ? ' checked' : '') + '> <b>+' + money(o.price) + '</b></div></label>'
    ).join('');
  }

  function selectedVehicle() {
    return R.VEHICLES.find((v) => v.id === state.vehicleId) || R.VEHICLES[0];
  }

  function optionsTotal() {
    return R.OPTIONS.reduce((s, o) => s + (state.options[o.id] ? o.price : 0), 0);
  }

  function updateTotal() {
    const n = selectedVehicle().price + optionsTotal();
    const rt = state.tripType === 'round_trip' ? Math.round(n * 1.85) : n;
    if ($('total-display')) $('total-display').textContent = money(rt);
    return rt;
  }

  const PHOTO_FALLBACK = {
    pena: 'https://images.unsplash.com/photo-1588614959060-4d144f28b207?auto=format&fit=crop&w=1600&q=80',
    mouros: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1600&q=80',
    regaleira: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1600&q=80',
    monserrate: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1600&q=80',
    roca: 'https://images.unsplash.com/photo-1558642084-fd07fae5282e?auto=format&fit=crop&w=1600&q=80',
    'sintra-town': 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1600&q=80',
    'cascais-bay': 'https://images.unsplash.com/photo-1555881400-74d7e90a8c7e?auto=format&fit=crop&w=1600&q=80',
    'cascais-marina': 'https://images.unsplash.com/photo-1555881400-74d7e90a8c7e?auto=format&fit=crop&w=1600&q=80',
    cidadela: 'https://images.unsplash.com/photo-1555881400-74d7e90a8c7e?auto=format&fit=crop&w=1600&q=80',
    'santa-marta': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    boca: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80',
    guincho: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1600&q=80',
    estoril: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1600&q=80',
    fatima: 'https://images.unsplash.com/photo-1438032005730-c779502df4e3?auto=format&fit=crop&w=1600&q=80',
    obidos: 'https://images.unsplash.com/photo-1513415564515-763d91423bdd?auto=format&fit=crop&w=1600&q=80',
    'belem-tower': 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1600&q=80',
    jeronimos: 'https://images.unsplash.com/photo-1555881400-74d7e90a8c7e?auto=format&fit=crop&w=1600&q=80',
    padrao: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1600&q=80',
    maat: 'https://images.unsplash.com/photo-1555881400-74d7e90a8c7e?auto=format&fit=crop&w=1600&q=80',
    alfama: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?auto=format&fit=crop&w=1600&q=80',
    miradouro: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&w=1600&q=80',
    castelo: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&w=1600&q=80',
    comercio: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?auto=format&fit=crop&w=1600&q=80',
    'santa-justa': 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?auto=format&fit=crop&w=1600&q=80',
    ponte: 'https://images.unsplash.com/photo-1555881400-74d7e90a8c7e?auto=format&fit=crop&w=1600&q=80',
    'cristo-rei': 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1600&q=80'
  };

  function photoSrc(photo) {
    if (photo.src) return photo.src;
    if (photo.file) return wikiPhoto(photo.file);
    return '';
  }

  function escAttr(s) {
    return String(s || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  }

  function imgTag(src, alt, stopId, eager) {
    const fb = PHOTO_FALLBACK[stopId] || '';
    return '<img src="' + escAttr(src) + '" alt="' + escAttr(alt) + '"' +
      (eager ? '' : ' loading="lazy" decoding="async"') +
      (fb ? ' data-fb="' + escAttr(fb) + '"' : '') + '>';
  }

  function bindFallbacks(root) {
    if (!root) return;
    root.querySelectorAll('img[data-fb]').forEach(function (img) {
      if (img.getAttribute('data-bound-fb')) return;
      img.setAttribute('data-bound-fb', '1');
      img.addEventListener('error', function () {
        const fb = img.getAttribute('data-fb');
        if (fb && img.src !== fb) img.src = fb;
      });
    });
  }

  function locName(obj) {
    if (!obj) return '';
    if (typeof obj === 'string') return obj;
    return obj[state.lang] || obj.pt || '';
  }

  function tourPhotos(tour) {
    const list = [];
    (tour.stops || []).forEach(function (stop) {
      (stop.photos || []).forEach(function (photo) {
        list.push({
          src: photoSrc(photo),
          place: locName(stop.name),
          cap: locName(photo.cap),
          stopId: stop.id
        });
      });
    });
    if (!list.length && tour.image) list.push({ src: tour.image, place: locName(tour.title), cap: '', stopId: '' });
    return list;
  }

  const galleryState = { list: [], index: 0, tourTitle: '' };

  function renderTours() {
    $('tours-grid').innerHTML = R.TOURS.map((tour) => {
      const photos = tourPhotos(tour);
      const rows = tour.private.map((p) =>
        '<tr><td>' + t('privateHire') + ' · ' + p.pax + '</td><td><strong>' + money(p.price) + '</strong></td></tr>'
      ).join('') +
        '<tr><td>' + t('shared') + ' · ' + t('minPax') + ' ' + tour.sharedMin + '</td><td><strong>' + money(tour.sharedPerPerson) + '</strong> ' + t('perPerson') + '</td></tr>';
      const inc = (tour.includes[state.lang] || tour.includes.pt).map((x) => '<li>' + x + '</li>').join('');
      const maxThumbs = 6;
      const preview = photos.slice(0, maxThumbs);
      const extra = photos.length - maxThumbs;
      const thumbs = preview.map(function (p, i) {
        const more = (i === preview.length - 1 && extra > 0)
          ? '<span class="thumb-more">+' + extra + '</span>' : '';
        return '<button type="button" data-gal="' + tour.id + '" data-i="' + i + '">' + imgTag(p.src, p.place, p.stopId) + more + '</button>';
      }).join('');
      const chips = (tour.stops || []).map(function (stop) {
        const idx = photos.findIndex(function (p) { return p.stopId === stop.id; });
        return '<button type="button" class="stop-chip" data-gal="' + tour.id + '" data-i="' + (idx < 0 ? 0 : idx) + '">' + locName(stop.name) + '</button>';
      }).join('');
      const coverSrc = photos[0] ? photos[0].src : tour.image;
      const coverStop = photos[0] ? photos[0].stopId : '';
      return '<article class="tour">' +
        '<div class="tour-cover" data-gal="' + tour.id + '" data-i="0">' +
          imgTag(coverSrc, locName(tour.title), coverStop, true) +
          '<button class="cover-btn" type="button" data-gal="' + tour.id + '" data-i="0">' + t('seePhotos') + ' · ' + photos.length + ' ' + t('photos') + '</button>' +
        '</div>' +
        '<div class="thumbs">' + thumbs + '</div>' +
        '<div class="tour-body">' +
        '<h3>' + locName(tour.title) + '</h3>' +
        '<p>' + locName(tour.desc) + '</p>' +
        '<div class="stops-row">' + chips + '</div>' +
        '<div class="meta">' + t('duration') + ': ' + tour.durationH + ' ' + t('hours') + '</div>' +
        '<table class="price-table"><thead><tr><th></th><th></th></tr></thead><tbody>' + rows + '</tbody></table>' +
        '<div class="meta">' + t('include') + '</div><ul class="includes">' + inc + '</ul>' +
        '<button class="btn btn-gold" type="button" data-tour="' + tour.id + '">' + t('bookTour') + '</button>' +
        '</div></article>';
    }).join('');
    bindFallbacks($('tours-grid'));
  }

  function renderPlaces() {
    const box = $('places-mosaic');
    if (!box) return;
    box.innerHTML = R.TOURS.map(function (tour) {
      const photos = tourPhotos(tour);
      const tiles = (tour.stops || []).map(function (stop) {
        const idx = photos.findIndex(function (p) { return p.stopId === stop.id; });
        const nPhotos = (stop.photos || []).length;
        const cover = (stop.photos && stop.photos[0]) ? photoSrc(stop.photos[0]) : (photos[0] && photos[0].src) || '';
        return '<button type="button" class="place-tile" data-gal="' + tour.id + '" data-i="' + (idx < 0 ? 0 : idx) + '">' +
          imgTag(cover, locName(stop.name), stop.id) +
          '<span><em>' + nPhotos + ' ' + t('photos') + '</em>' + locName(stop.name) + '</span>' +
        '</button>';
      }).join('');
      return '<div class="place-group">' +
        '<div class="place-group-head"><h3>' + locName(tour.title) + '</h3><span>' + photos.length + ' ' + t('photos') + ' · ' + (tour.stops || []).length + ' ' + t('stopsLabel') + '</span></div>' +
        '<div class="places-mosaic">' + tiles + '</div>' +
      '</div>';
    }).join('');
    bindFallbacks(box);
  }

  function openGallery(tourId, index) {
    const tour = R.TOURS.find(function (x) { return x.id === tourId; });
    if (!tour) return;
    galleryState.list = tourPhotos(tour);
    galleryState.index = Number(index) || 0;
    galleryState.tourTitle = locName(tour.title);
    $('lb-overlay').classList.add('open');
    document.body.classList.add('gallery-open');
    drawGallery();
    if ($('lb-close')) $('lb-close').focus();
  }

  function closeGallery() {
    $('lb-overlay').classList.remove('open');
    document.body.classList.remove('gallery-open');
  }

  function galleryStep(delta) {
    if (!galleryState.list.length) return;
    galleryState.index = (galleryState.index + delta + galleryState.list.length) % galleryState.list.length;
    drawGallery();
  }

  function drawGallery() {
    const item = galleryState.list[galleryState.index];
    if (!item) return;
    const img = $('lb-img');
    img.classList.add('loading');
    img.alt = item.place + (item.cap ? ' — ' + item.cap : '');
    img.onload = function () { img.classList.remove('loading'); };
    img.onerror = function () {
      const fb = PHOTO_FALLBACK[item.stopId];
      if (fb && img.src !== fb) img.src = fb;
      else img.classList.remove('loading');
    };
    img.src = item.src;
    $('lb-place').textContent = item.place;
    $('lb-cap').textContent = item.cap;
    $('lb-count').textContent = (galleryState.index + 1) + ' ' + t('photoOf') + ' ' + galleryState.list.length;
    const seen = [];
    galleryState.list.forEach(function (p, i) {
      if (!p.stopId || seen.some(function (s) { return s.id === p.stopId; })) return;
      seen.push({ id: p.stopId, name: p.place, i: i });
    });
    $('lb-stops').innerHTML = seen.map(function (s) {
      return '<button type="button" class="' + (s.id === item.stopId ? 'on' : '') + '" data-i="' + s.i + '">' + s.name + '</button>';
    }).join('');
    $('lb-strip').innerHTML = galleryState.list.map(function (p, i) {
      return '<button type="button" class="' + (i === galleryState.index ? 'on' : '') + '" data-i="' + i + '">' + imgTag(p.src, p.place, p.stopId) + '</button>';
    }).join('');
    bindFallbacks($('lb-strip'));
    const onThumb = $('lb-strip').querySelector('button.on');
    if (onThumb) scrollXOnly($('lb-strip'), onThumb);
    if ($('lb-credit')) $('lb-credit').textContent = t('photoCredit') + '  ·  ' + t('galleryKeys');
  }

  function renderFleet() {
    $('fleet-grid').innerHTML = R.VEHICLES.map((v) =>
      '<article class="vcard" style="cursor:default"><header><div><span class="badge">' + t(v.badgeKey) + '</span><h3 class="serif" style="margin:8px 0 0;font-size:24px">' + t(v.nameKey) + '</h3><div class="meta">' + v.models + '</div></div><div class="price">' + t('fromPrice') + ' ' + money(v.price) + '</div></header><div class="meta">' + v.pax + ' ' + t('paxShort') + ' · ' + v.bags + ' ' + t('bagsShort') + '</div></article>'
    ).join('');
  }

  function goStep(n) {
    if (n === 2 && !validateStep1()) return;
    state.step = n;
    [1, 2, 3, 4].forEach((i) => {
      const p = $('panel-' + i);
      if (p) p.classList.toggle('hidden', i !== n);
    });
    document.querySelectorAll('#steps span').forEach((s) => {
      s.classList.toggle('on', Number(s.getAttribute('data-step')) <= n);
    });
    if (n >= 2) {
      renderVehicles();
      updateTotal();
    }
    scrollToId('book');
  }

  function resolveHotel(customOn, customNameId, customAddrId, picked, typedId) {
    if (customOn) {
      const name = ($(customNameId).value || '').trim();
      const addr = ($(customAddrId).value || '').trim();
      if (!name && !addr) return null;
      return { name: name || addr, address: addr, inList: false };
    }
    if (picked) return { name: picked.name, address: picked.area, inList: true };
    const typed = ($(typedId).value || '').trim();
    if (typed) return { name: typed, address: '', inList: false };
    return null;
  }

  function hotelDestination() {
    return resolveHotel(state.hotelCustom, 'hotel-name-custom', 'hotel-address', state.hotel, 'hotel-q');
  }

  function hotelPickup() {
    return resolveHotel(state.pickupHotelCustom, 'pickup-hotel-name', 'pickup-address', state.pickupHotel, 'pickup-hotel-q');
  }

  function validateStep1() {
    $('err-1').textContent = '';
    if (usesHotelDropoff() && !hotelDestination()) {
      $('err-1').textContent = t('selectHotel');
      return false;
    }
    if (usesHotelPickup() && !hotelPickup()) {
      $('err-1').textContent = t('selectHotel');
      return false;
    }
    if (state.tripType === 'custom' && $('pickup-manual') && $('pickup-manual').checked) {
      if (!$('pickup-manual-name').value.trim() && !$('pickup-manual-address').value.trim()) {
        $('err-1').textContent = t('selectHotel');
        return false;
      }
    }
    const phone = ($('phone-early') && $('phone-early').value.trim()) || $('phone').value.trim();
    const email = ($('email-early') && $('email-early').value.trim()) || $('email').value.trim();
    if (!phone || !email) {
      $('err-1').textContent = t('requiredBoth');
      return false;
    }
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      $('err-1').textContent = t('requiredBoth');
      return false;
    }
    $('phone').value = phone;
    $('email').value = email;
    if (!$('date').value) {
      $('err-1').textContent = t('required');
      return false;
    }
    return true;
  }

  function loadBookings() {
    try { return JSON.parse(localStorage.getItem(R.CONFIG.storageKey) || '[]'); } catch (e) { return []; }
  }

  function saveBooking(row) {
    const all = loadBookings();
    all.unshift(row);
    localStorage.setItem(R.CONFIG.storageKey, JSON.stringify(all));
  }

  function origineType() {
    if (state.tripType === 'airport_hotel' || state.tripType === 'round_trip') return 'airport';
    if (state.tripType === 'station_hotel') return 'train';
    if (state.tripType.indexOf('hotel') === 0) return 'hotel';
    return 'custom';
  }

  function pickupName() {
    if (state.tripType === 'custom' && $('pickup-manual') && $('pickup-manual').checked) {
      return ($('pickup-manual-name').value.trim() || $('pickup-manual-address').value.trim());
    }
    if (usesHotelPickup()) {
      const h = hotelPickup();
      return h ? h.name : '';
    }
    return $('pickup').value;
  }

  function dropoffName() {
    if (usesHotelDropoff()) {
      const h = hotelDestination();
      return h ? h.name : '';
    }
    return $('dropoff-select').value;
  }

  function submitTransfer() {
    $('err-4').textContent = '';
    const first = $('firstName').value.trim();
    const last = $('lastName').value.trim();
    const email = $('email').value.trim();
    const phone = $('phone').value.trim();
    if (!first || !last || !email || !phone) {
      $('err-4').textContent = t('required');
      return;
    }
    const hotel = usesHotelDropoff() ? hotelDestination() : hotelPickup();
    const row = {
      id: genId(),
      source: 'SITE',
      kind: 'TRANSFER',
      statut: 'pendente',
      creePar: 'SITE',
      nom: first + ' ' + last,
      email: email.toLowerCase(),
      telephone: phone,
      langue: state.lang.toUpperCase(),
      origineType: origineType(),
      clientId: currentUser() ? currentUser().id : '',
      tripType: state.tripType,
      pointDepart: pickupName(),
      destination: dropoffName(),
      hotelNom: hotel ? hotel.name : dropoffName(),
      hotelAdresse: hotel && !hotel.inList ? hotel.address : '',
      hotelInList: !!(hotel && hotel.inList),
      dateTransfer: $('date').value,
      heureTransfer: $('time').value,
      dateRetour: state.tripType === 'round_trip' ? $('return-date').value : '',
      heureRetour: state.tripType === 'round_trip' ? $('return-time').value : '',
      personnes: $('pax').value,
      malas: $('bags').value,
      numVol: $('flight').value.trim(),
      numChambre: $('room').value.trim(),
      vehicle: selectedVehicle().id,
      options: Object.keys(state.options).filter((k) => state.options[k]),
      prixEstime: updateTotal(),
      commentaires: $('notes').value.trim(),
      adresseDepart: (state.tripType === 'custom' && $('pickup-manual') && $('pickup-manual').checked) ? $('pickup-manual-address').value.trim() : '',
      createdAt: new Date().toISOString()
    };
    saveBooking(row);
    if ($('create-account') && $('create-account').checked && !currentUser()) {
      const pass = ($('create-pass') && $('create-pass').value) || '';
      if (pass.length >= 4) {
        createUser({ firstName: first, lastName: last, email: email, phone: phone, password: pass });
      }
    }
    showVoucher(row);
    renderAccountHistory();
    goStep(1);
  }

  function openTourBook(id) {
    state.tourId = id;
    const tour = R.TOURS.find((x) => x.id === id);
    $('tour-book').style.display = 'block';
    $('tour-book-title').textContent = tour.title[state.lang] || tour.title.pt;
    $('tour-date').value = todayISO();
    updateTourTotal();
    scrollToId('tour-book');
  }

  function closeTourBook() {
    state.tourId = null;
    $('tour-book').style.display = 'none';
  }

  function tourPrice() {
    const tour = R.TOURS.find((x) => x.id === state.tourId);
    if (!tour) return 0;
    const pax = Number($('tour-pax').value || 2);
    const mode = $('tour-mode').value;
    if (mode === 'shared') return tour.sharedPerPerson * Math.max(pax, tour.sharedMin);
    const band = pax <= 3 ? tour.private[0] : tour.private[1];
    return band.price;
  }

  function updateTourTotal() {
    if (!$('tour-total')) return;
    $('tour-total').textContent = money(state.tourId ? tourPrice() : 0);
  }

  function submitTour() {
    $('err-tour').textContent = '';
    const tour = R.TOURS.find((x) => x.id === state.tourId);
    const first = $('tour-first').value.trim();
    const last = $('tour-last').value.trim();
    const email = $('tour-email').value.trim();
    const phone = $('tour-phone').value.trim();
    if (!first || !last || !email || !phone || !$('tour-date').value) {
      $('err-tour').textContent = t('required');
      return;
    }
    let hotelNom = '';
    let hotelAdresse = '';
    let inList = false;
    if ($('tour-hotel-custom').checked) {
      hotelNom = $('tour-hotel-name').value.trim();
      hotelAdresse = $('tour-address').value.trim();
      if (!hotelNom && !hotelAdresse) {
        $('err-tour').textContent = t('selectHotel');
        return;
      }
    } else if (state.tourHotel) {
      hotelNom = state.tourHotel.name;
      inList = true;
    } else if ($('tour-hotel-q').value.trim()) {
      hotelNom = $('tour-hotel-q').value.trim();
    } else {
      $('err-tour').textContent = t('selectHotel');
      return;
    }
    const row = {
      id: genId(),
      source: 'SITE',
      kind: 'TOUR',
      tourId: tour.id,
      tourMode: $('tour-mode').value,
      statut: 'pendente',
      creePar: 'SITE',
      nom: first + ' ' + last,
      email: email.toLowerCase(),
      telephone: phone,
      langue: state.lang.toUpperCase(),
      origineType: 'tour',
      clientId: currentUser() ? currentUser().id : '',
      pointDepart: hotelNom,
      destination: tour.title[state.lang] || tour.title.pt,
      hotelNom: hotelNom,
      hotelAdresse: hotelAdresse,
      hotelInList: inList,
      dateTransfer: $('tour-date').value,
      heureTransfer: $('tour-time').value,
      personnes: $('tour-pax').value,
      malas: '0',
      prixEstime: tourPrice(),
      createdAt: new Date().toISOString()
    };
    saveBooking(row);
    closeTourBook();
    showVoucher(row);
    renderAccountHistory();
  }

  function showVoucher(row) {
    $('voucher-id').textContent = row.id;
    const hotelLine = row.hotelNom ? '<p><strong>' + t('hotelLabel') + ':</strong> ' + row.hotelNom + (row.hotelAdresse ? ' — ' + row.hotelAdresse : '') + '</p>' : '';
    $('voucher-body').innerHTML =
      '<p><strong>' + (row.kind === 'TOUR' ? t('kindTour') : t('kindTransfer')) + '</strong></p>' +
      '<p>' + row.pointDepart + ' → ' + row.destination + '</p>' +
      hotelLine +
      '<p>' + row.dateTransfer + ' · ' + row.heureTransfer + ' · ' + row.personnes + ' ' + t('paxShort') + '</p>' +
      '<p>' + t('totalEst') + ': <strong>' + money(row.prixEstime) + '</strong></p>' +
      '<p>' + t('email') + ': ' + row.email + '</p>';
    $('voucher-overlay').classList.add('open');
  }

  function closeVoucher() {
    $('voucher-overlay').classList.remove('open');
  }

  function statusLabel(st) {
    if (st === 'cancel_req') return t('stCancelReq');
    const map = { pendente: 'stPendente', confirmado: 'stConfirmado', cancelado: 'stCancelado', realizado: 'stRealizado' };
    return t(map[st] || 'stPendente');
  }

  function phoneDigits(s) {
    return String(s || '').replace(/\D/g, '');
  }

  function phonesMatch(a, b) {
    const x = phoneDigits(a);
    const y = phoneDigits(b);
    if (!x || !y) return false;
    if (x === y) return true;
    const nx = x.slice(-9);
    const ny = y.slice(-9);
    if (nx.length >= 9 && nx === ny) return true;
    return x.length >= 8 && y.length >= 8 && (x.slice(-8) === y.slice(-8));
  }

  function trackBooking() {
    $('err-track').textContent = '';
    const id = ($('track-ref').value || '').trim().toUpperCase().replace(/\s+/g, '');
    const email = ($('track-email').value || '').trim().toLowerCase();
    const phone = ($('track-phone').value || '').trim();
    if (!id || (!email && !phone)) {
      $('err-track').textContent = t('trackNeedContact');
      return;
    }
    const row = loadBookings().find(function (b) {
      if (b.id.toUpperCase() !== id) return false;
      if (email && String(b.email || '').toLowerCase() === email) return true;
      if (phone && phonesMatch(b.telephone, phone)) return true;
      return false;
    });
    const box = $('track-result');
    if (!row) {
      box.classList.add('hidden');
      $('err-track').textContent = t('trackNotFound');
      return;
    }
    const stClass = row.statut === 'cancel_req' ? 'cancel_req' : row.statut;
    const wa = 'https://wa.me/' + R.CONFIG.whatsapp + '?text=' + encodeURIComponent(t('whatsappMsg') + ' ' + row.id);
    box.classList.remove('hidden');
    box.innerHTML =
      '<p class="ref">' + row.id + '</p>' +
      '<p><span class="st st-' + stClass + '">' + statusLabel(row.statut) + '</span> · ' + (row.kind === 'TOUR' ? t('kindTour') : t('kindTransfer')) + '</p>' +
      '<p>' + row.pointDepart + ' → ' + row.destination + '</p>' +
      (row.hotelNom ? '<p><strong>' + t('hotelLabel') + ':</strong> ' + row.hotelNom + '</p>' : '') +
      '<p>' + row.dateTransfer + ' · ' + row.heureTransfer + '</p>' +
      '<p>' + t('totalEst') + ': ' + money(row.prixEstime) + '</p>' +
      '<p class="meta">' + t('cancelHint') + '</p>' +
      '<div class="row-actions">' +
        '<a class="btn btn-gold" target="_blank" rel="noopener" href="' + wa + '">WhatsApp</a>' +
        (row.statut === 'pendente' || row.statut === 'confirmado'
          ? '<button class="btn btn-danger" type="button" id="btn-cancel">' + t('cancelBtn') + '</button>'
          : '') +
      '</div>';
    const btn = $('btn-cancel');
    if (btn) btn.onclick = function () { requestCancel(row.id); };
  }

  function requestCancel(id) {
    const all = loadBookings();
    const row = all.find((b) => b.id === id);
    if (!row) return;
    row.statut = 'cancel_req';
    localStorage.setItem(R.CONFIG.storageKey, JSON.stringify(all));
    trackBooking();
    $('err-track').textContent = t('cancelDone');
  }

  window.closeGallery = closeGallery;
  window.galleryStep = galleryStep;
  window.openGallery = openGallery;
  window.goStep = goStep;
  window.submitTransfer = submitTransfer;
  window.submitTour = submitTour;
  window.closeTourBook = closeTourBook;
  window.trackBooking = trackBooking;
  window.closeVoucher = closeVoucher;
  window.toggleMenu = function (on) {
    const d = $('drawer');
    const btn = $('menu-btn');
    if (!d) return;
    if (on === undefined || on === null) on = !d.classList.contains('open');
    d.classList.toggle('open', on);
    document.body.classList.toggle('menu-open', on);
    if (btn) btn.setAttribute('aria-expanded', on ? 'true' : 'false');
    if ($('tabbar')) {
      const menuBtn = $('tabbar').querySelector('[data-tab="menu"]');
      if (menuBtn) menuBtn.classList.toggle('on', on);
    }
  };
  window.go = function () { scrollToId('top'); };
  window.openAuth = openAuth;
  window.closeAuth = closeAuth;
  window.setAuthTab = setAuthTab;
  window.doLogin = doLogin;
  window.doRegister = doRegister;

  function users() {
    try { return JSON.parse(localStorage.getItem(R.CONFIG.usersKey) || '[]'); } catch (e) { return []; }
  }
  function saveUsers(list) { localStorage.setItem(R.CONFIG.usersKey, JSON.stringify(list)); }
  function currentUser() {
    try {
      const id = localStorage.getItem(R.CONFIG.sessionKey);
      return users().find((u) => u.id === id) || null;
    } catch (e) { return null; }
  }
  function createUser(p) {
    const list = users();
    if (list.some((u) => u.email === p.email.toLowerCase())) return { ok: false, error: 'email' };
    const u = { id: 'CL-' + Date.now(), firstName: p.firstName, lastName: p.lastName, email: p.email.toLowerCase(), phone: p.phone, password: p.password };
    list.push(u);
    saveUsers(list);
    localStorage.setItem(R.CONFIG.sessionKey, u.id);
    return { ok: true, user: u };
  }
  function openAuth() {
    if (currentUser()) {
      scrollToId('account-history');
      return;
    }
    $('auth-overlay').classList.add('open');
    setAuthTab('login');
  }
  function closeAuth() { $('auth-overlay').classList.remove('open'); }
  function setAuthTab(tab) {
    $('auth-login').classList.toggle('hidden', tab !== 'login');
    $('auth-register').classList.toggle('hidden', tab !== 'register');
    $('auth-tab-login').classList.toggle('on', tab === 'login');
    $('auth-tab-register').classList.toggle('on', tab === 'register');
  }
  function doLogin() {
    const email = $('auth-login-email').value.trim().toLowerCase();
    const pass = $('auth-login-pass').value;
    const u = users().find((x) => x.email === email && x.password === pass);
    $('err-auth').textContent = u ? '' : t('trackNotFound');
    if (!u) return;
    localStorage.setItem(R.CONFIG.sessionKey, u.id);
    closeAuth();
    renderAccountBtn();
    renderAccountHistory();
  }
  function doRegister() {
    const first = $('auth-reg-first').value.trim();
    const last = $('auth-reg-last').value.trim();
    const email = $('auth-reg-email').value.trim();
    const phone = $('auth-reg-phone').value.trim();
    const pass = $('auth-reg-pass').value;
    $('err-auth-reg').textContent = '';
    if (!first || !last || !email || !phone || pass.length < 4) {
      $('err-auth-reg').textContent = t('requiredBoth');
      return;
    }
    const r = createUser({ firstName: first, lastName: last, email: email, phone: phone, password: pass });
    if (!r.ok) { $('err-auth-reg').textContent = t('required'); return; }
    closeAuth();
    renderAccountBtn();
    renderAccountHistory();
  }
  function logout() {
    localStorage.removeItem(R.CONFIG.sessionKey);
    renderAccountBtn();
    renderAccountHistory();
  }
  function renderAccountBtn() {
    const btn = $('btn-account');
    if (!btn) return;
    const u = currentUser();
    btn.textContent = u ? (u.firstName + ' · ' + t('myBookings')) : t('accountBtn');
  }
  function renderAccountHistory() {
    const box = $('account-bookings');
    if (!box) return;
    const u = currentUser();
    const wrap = $('account-history');
    if (!u) {
      wrap.style.display = 'none';
      return;
    }
    wrap.style.display = 'block';
    const rows = loadBookings().filter((b) => b.email === u.email || b.clientId === u.id);
    if (!rows.length) { box.innerHTML = '<p class="lead">' + t('noAccountBookings') + '</p>'; return; }
    box.innerHTML = rows.map((b) =>
      '<div class="result" style="margin-top:10px"><strong class="ref" style="font-size:16px">' + b.id + '</strong> · ' +
      (b.kind === 'TOUR' ? t('kindTour') : t('kindTransfer')) +
      ' · <span class="st st-' + (b.statut || 'pendente') + '">' + statusLabel(b.statut) + '</span>' +
      '<p>' + b.pointDepart + ' → ' + b.destination + '</p><p>' + b.dateTransfer + ' · ' + (b.hotelNom || '') + '</p></div>'
    ).join('') + '<p style="margin-top:12px"><button class="btn btn-ghost" type="button" id="btn-logout">' + t('logout') + '</button></p>';
    const lo = $('btn-logout');
    if (lo) lo.onclick = logout;
  }

  document.addEventListener('DOMContentLoaded', function () {
    $('date').value = todayISO();
    $('tour-date').value = todayISO();
    for (let i = 1; i <= 16; i++) {
      $('pax').innerHTML += '<option value="' + i + '"' + (i === 2 ? ' selected' : '') + '>' + i + '</option>';
      $('bags').innerHTML += '<option value="' + i + '"' + (i === 2 ? ' selected' : '') + '>' + i + '</option>';
      $('tour-pax').innerHTML += '<option value="' + i + '"' + (i === 2 ? ' selected' : '') + '>' + i + '</option>';
    }
    bindCombo('hotel-q', 'hotel-list', function (h) { state.hotel = h; });
    bindCombo('pickup-hotel-q', 'pickup-hotel-list', function (h) { state.pickupHotel = h; });
    bindCombo('tour-hotel-q', 'tour-hotel-list', function (h) { state.tourHotel = h; });
    document.addEventListener('click', function (e) {
      const b = e.target.closest('#langs button[data-lang], #drawer-langs button[data-lang]');
      if (!b) return;
      state.lang = b.getAttribute('data-lang');
      localStorage.setItem('ruelas_lang', state.lang);
      applyI18n();
    });
    $('trip-types').addEventListener('click', function (e) {
      const b = e.target.closest('button[data-type]');
      if (!b) return;
      state.tripType = b.getAttribute('data-type');
      state.hotel = null;
      state.pickupHotel = null;
      $('hotel-q').value = '';
      $('pickup-hotel-q').value = '';
      renderTripTypes();
      fillLocationSelects();
      updateTotal();
    });
    $('vehicles').addEventListener('click', function (e) {
      const card = e.target.closest('[data-vid]');
      if (!card) return;
      state.vehicleId = card.getAttribute('data-vid');
      renderVehicles();
      updateTotal();
    });
    $('options').addEventListener('change', function (e) {
      const cb = e.target.closest('input[data-oid]');
      if (!cb) return;
      state.options[cb.getAttribute('data-oid')] = cb.checked;
      renderOptions();
      updateTotal();
    });
    $('hotel-custom').addEventListener('change', function () {
      state.hotelCustom = this.checked;
      $('hotel-address-wrap').classList.toggle('hidden', !this.checked);
      if (this.checked) { state.hotel = null; $('hotel-list').classList.remove('open'); }
    });
    $('pickup-hotel-custom').addEventListener('change', function () {
      state.pickupHotelCustom = this.checked;
      $('pickup-address-wrap').classList.toggle('hidden', !this.checked);
      if (this.checked) { state.pickupHotel = null; $('pickup-hotel-list').classList.remove('open'); }
    });
    $('tour-hotel-custom').addEventListener('change', function () {
      $('tour-address-wrap').classList.toggle('hidden', !this.checked);
    });
    $('tours-grid').addEventListener('click', function (e) {
      const gal = e.target.closest('[data-gal]');
      if (gal) {
        e.preventDefault();
        openGallery(gal.getAttribute('data-gal'), gal.getAttribute('data-i'));
        return;
      }
      const b = e.target.closest('[data-tour]');
      if (!b) return;
      openTourBook(b.getAttribute('data-tour'));
    });
    if ($('places-mosaic')) {
      $('places-mosaic').addEventListener('click', function (e) {
        const gal = e.target.closest('[data-gal]');
        if (!gal) return;
        openGallery(gal.getAttribute('data-gal'), gal.getAttribute('data-i'));
      });
    }
    if ($('lb-stops')) {
      $('lb-stops').addEventListener('click', function (e) {
        const b = e.target.closest('button[data-i]');
        if (!b) return;
        galleryState.index = Number(b.getAttribute('data-i'));
        drawGallery();
      });
    }
    (function () {
      const stage = $('lb-stage');
      if (!stage) return;
      let x0 = null;
      stage.addEventListener('touchstart', function (e) {
        x0 = e.changedTouches[0].clientX;
      }, { passive: true });
      stage.addEventListener('touchend', function (e) {
        if (x0 == null) return;
        const dx = e.changedTouches[0].clientX - x0;
        if (dx > 48) galleryStep(-1);
        if (dx < -48) galleryStep(1);
        x0 = null;
      });
    })();
    if ($('lb-strip')) {
      $('lb-strip').addEventListener('click', function (e) {
        const b = e.target.closest('button[data-i]');
        if (!b) return;
        galleryState.index = Number(b.getAttribute('data-i'));
        drawGallery();
      });
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && $('drawer') && $('drawer').classList.contains('open')) {
        toggleMenu(false);
        return;
      }
      if (!$('lb-overlay').classList.contains('open')) return;
      if (e.key === 'Escape') closeGallery();
      if (e.key === 'ArrowRight') galleryStep(1);
      if (e.key === 'ArrowLeft') galleryStep(-1);
    });
    document.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest('a[href^="#"]');
      if (!a || a.target === '_blank') return;
      const href = a.getAttribute('href') || '';
      if (href === '#') {
        e.preventDefault();
        return;
      }
      const id = decodeURIComponent(href.slice(1));
      if (id && id !== 'top' && !document.getElementById(id)) return;
      e.preventDefault();
      toggleMenu(false);
      scrollToId(id);
      if (history.replaceState) {
        history.replaceState(null, '', (id && id !== 'top') ? ('#' + id) : (location.pathname + location.search));
      }
    });
    (function initTabbarSpy() {
      const bar = $('tabbar');
      if (!bar) return;
      const ids = ['book', 'tours', 'fleet', 'track', 'about', 'contact'];
      let ticking = false;
      function paintTabs() {
        ticking = false;
        if (document.body.classList.contains('menu-open')) return;
        const line = window.scrollY + headerOffset() + 48;
        let current = '';
        ids.forEach(function (id) {
          const el = $(id);
          if (el && el.offsetTop <= line) current = id;
        });
        bar.querySelectorAll('a[data-tab]').forEach(function (el) {
          el.classList.toggle('on', el.getAttribute('data-tab') === current);
        });
      }
      window.addEventListener('scroll', function () {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(paintTabs);
        }
      }, { passive: true });
      paintTabs();
    })();
    if (location.hash === '#top' || location.hash === '#') {
      if (history.replaceState) history.replaceState(null, '', location.pathname + location.search);
    }
    $('tour-pax').addEventListener('change', updateTourTotal);
    $('tour-mode').addEventListener('change', updateTourTotal);
    if ($('pickup-manual')) {
      $('pickup-manual').addEventListener('change', function () {
        $('pickup-manual-fields').classList.toggle('hidden', !this.checked);
        $('pickup').classList.toggle('hidden', this.checked);
      });
    }
    if ($('create-account')) {
      $('create-account').addEventListener('change', function () {
        $('create-pass-wrap').classList.toggle('hidden', !this.checked);
      });
    }
    ['email-early', 'phone-early'].forEach(function (id) {
      if (!$(id)) return;
      $(id).addEventListener('input', function () {
        const el = $(id);
        if (id === 'email-early') $('email').value = el.value;
        if (id === 'phone-early') $('phone').value = el.value;
      });
    });
    ['track-ref', 'track-email', 'track-phone'].forEach(function (id) {
      if (!$(id)) return;
      $(id).addEventListener('keydown', function (e) {
        if (e.key === 'Enter') trackBooking();
      });
    });
    applyI18n();
    (function initHeroSlideshow() {
      const slides = document.querySelectorAll('#hero-slides figure');
      const thumbs = $('hero-thumbs');
      const place = $('hero-place');
      if (!slides.length) return;
      let index = 0;
      let timer = null;
      let busy = false;
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (thumbs && !thumbs.childElementCount) {
        thumbs.innerHTML = Array.prototype.map.call(slides, function (s, i) {
          const src = (s.querySelector('img') && s.querySelector('img').src) || '';
          return '<button type="button" data-i="' + i + '"><img src="' + src.replace('width=2000', 'width=240') + '" alt=""></button>';
        }).join('');
        thumbs.addEventListener('click', function (e) {
          const b = e.target.closest('button[data-i]');
          if (!b) return;
          show(Number(b.getAttribute('data-i')), true);
        });
      }
      function labelOf(el) {
        return el.getAttribute('data-' + state.lang) || el.getAttribute('data-pt') || '';
      }
      function paint(n) {
        index = (n + slides.length) % slides.length;
        window._heroIndex = index;
        Array.prototype.forEach.call(slides, function (s, i) {
          const on = i === index;
          s.classList.toggle('is-active', on);
          s.classList.toggle('alt', on && index % 2 === 1);
        });
        if (thumbs) {
          thumbs.querySelectorAll('button').forEach(function (b, i) {
            b.classList.toggle('on', i === index);
          });
        }
        if (place) place.textContent = labelOf(slides[index]);
        if (thumbs) scrollXOnly(thumbs, thumbs.querySelector('button.on'));
      }
      function show(n, restart) {
        const next = (n + slides.length) % slides.length;
        if (next === index || busy) return;
        if (reduce) {
          paint(next);
          return;
        }
        busy = true;
        slides[index].classList.remove('is-active', 'alt');
        setTimeout(function () {
          paint(next);
          busy = false;
        }, 120);
        if (restart && !reduce) {
          if (timer) clearInterval(timer);
          timer = setInterval(function () { show(index + 1); }, 6200);
        }
      }
      if ($('hero-prev')) $('hero-prev').addEventListener('click', function () { show(index - 1, true); });
      if ($('hero-next')) $('hero-next').addEventListener('click', function () { show(index + 1, true); });
      const hero = document.querySelector('.hero');
      if (hero) {
        let x0 = null, y0 = null;
        hero.addEventListener('touchstart', function (e) {
          if (e.target.closest('a, button, input')) return;
          x0 = e.changedTouches[0].clientX;
          y0 = e.changedTouches[0].clientY;
        }, { passive: true });
        hero.addEventListener('touchend', function (e) {
          if (x0 == null) return;
          const dx = e.changedTouches[0].clientX - x0;
          const dy = e.changedTouches[0].clientY - y0;
          x0 = null;
          if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy)) return;
          show(index + (dx < 0 ? 1 : -1), true);
        }, { passive: true });
      }
      window._heroShow = show;
      paint(0);
      if (!reduce) timer = setInterval(function () { show(index + 1); }, 6200);
    })();
    const u = currentUser();
    if (u) {
      $('firstName').value = u.firstName;
      $('lastName').value = u.lastName;
      $('email').value = u.email;
      $('phone').value = u.phone;
      if ($('email-early')) $('email-early').value = u.email;
      if ($('phone-early')) $('phone-early').value = u.phone;
      $('create-account-wrap').classList.add('hidden');
    }
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('sw.js').catch(function () {});
    }
  });
})();
