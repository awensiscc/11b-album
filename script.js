/*
 * Album behaviour. The content itself (photos, names, phrases)
 * lives in data.js - you normally don't need to touch this file.
 */
document.addEventListener('DOMContentLoaded', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const SLIDE_MS = 5000;      // gallery autoplay speed
    const HERO_MS = 6000;       // hero background speed
    const SWIPE_PX = 40;        // how far a finger must travel to count as a swipe

    // ---------- small helpers ----------
    const $ = (id) => document.getElementById(id);
    const pad = (n) => String(n).padStart(2, '0');

    // ukrainian plural: plural(27, ['випускник', 'випускники', 'випускників'])
    function plural(n, forms) {
        const n10 = n % 10;
        const n100 = n % 100;
        if (n10 === 1 && n100 !== 11) return forms[0];
        if (n10 >= 2 && n10 <= 4 && (n100 < 12 || n100 > 14)) return forms[1];
        return forms[2];
    }

    // detects a horizontal swipe on `el` and calls onSwipe(-1 | 1).
    // returns a function telling whether the last pointer gesture was a swipe
    // (so a click fired right after it can be ignored).
    function onSwipe(el, handler) {
        let startX = 0;
        let startY = 0;
        let tracking = false;
        let swiped = false;
        el.addEventListener('pointerdown', (e) => {
            if (e.pointerType === 'mouse' && e.button !== 0) return;
            tracking = true;
            swiped = false;
            startX = e.clientX;
            startY = e.clientY;
        });
        el.addEventListener('pointerup', (e) => {
            if (!tracking) return;
            tracking = false;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            if (Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(dy) * 1.2) {
                swiped = true;
                handler(dx < 0 ? 1 : -1);
            }
        });
        el.addEventListener('pointercancel', () => { tracking = false; });
        return () => swiped;
    }

    function setIcon(button, icon, label) {
        button.querySelector('use').setAttribute('href', `#i-${icon}`);
        button.setAttribute('aria-label', label);
    }

    const seasonNames = { spring: 'весна', autumn: 'осінь' };

    // =========================================================
    // photos: each one exists in several widths (listed in images.js),
    // and the browser downloads only the width that fits the screen
    // =========================================================
    const photoInfo = (key) => (typeof PHOTO_INFO !== 'undefined' && PHOTO_INFO[key]) || null;
    const photoUrl = (key, width) => `photos/${key}-${width}.webp`;
    const srcsetOf = (key) => photoInfo(key).widths.map((w) => `${photoUrl(key, w)} ${w}w`).join(', ');
    const galleryKey = (photo) => `gallery/${photo.photo}`;

    // smallest version at least `minWidth` px wide (or the biggest there is)
    function urlAtLeast(key, minWidth) {
        const widths = photoInfo(key).widths;
        return photoUrl(key, widths.find((w) => w >= minWidth) || widths[widths.length - 1]);
    }

    // tiny version shown (blurred) while the sharp one loads
    const previewOf = (key) => (photoInfo(key).thumb ? `photos/${key}-thumb.webp` : urlAtLeast(key, 0));

    function exists(key) {
        if (photoInfo(key)) return true;
        console.warn(`Photo "${key}" not found in images.js - run tools/build_images.py`);
        return false;
    }

    // points an <img> at a photo; `sizes` tells the browser how wide it is shown
    function setPhoto(img, key, sizes) {
        img.sizes = sizes;
        img.srcset = srcsetOf(key);
        img.src = urlAtLeast(key, 640);
    }

    // fills a preview + full <img> pair: the preview appears almost at once and
    // the sharp photo fades in over it when loaded. resolves once the preview is up.
    function loadPair(preview, full, key, sizes) {
        full.classList.remove('is-loaded');
        full.removeAttribute('srcset');
        full.removeAttribute('src');
        full.onload = () => full.classList.add('is-loaded');
        setPhoto(full, key, sizes);
        preview.classList.remove('is-sharp');
        return new Promise((resolve) => {
            preview.onload = resolve;
            preview.onerror = resolve;
            setTimeout(resolve, 400); // don't hold the slideshow on a slow connection
            preview.src = previewOf(key);
        });
    }

    // only show photos that were actually generated
    const galleryPhotos = GROUP_PHOTOS.filter((p) => exists(galleryKey(p)));
    const students = STUDENTS.filter((s) => exists(`students/${s.photo}`));
    const heroPhotos = HERO_PHOTOS.filter((name) => exists(`gallery/${name}`));

    // =========================================================
    // hero: stats + slowly changing background
    // =========================================================
    const seasonCount = new Set(galleryPhotos.map((p) => p.season)).size;
    $('hero-stats').innerHTML = [
        `<b>${students.length}</b> ${plural(students.length, ['випускник', 'випускники', 'випускників'])}`,
        `<b>${galleryPhotos.length}</b> фото`,
        `<b>${seasonCount}</b> ${plural(seasonCount, ['фотосесія', 'фотосесії', 'фотосесій'])}`,
    ].map((s) => `<li>${s}</li>`).join('');

    // the hero photo covers the screen: on tall screens it is wider than the viewport
    function heroSizes(key) {
        const ratio = photoInfo(key).ratio;
        return `(max-aspect-ratio: ${Math.round(ratio * 1000)}/1000) ${Math.ceil(ratio * 100)}vh, 100vw`;
    }

    const heroBg = $('hero-bg');
    const heroSlides = heroPhotos.map((name, i) => {
        const slide = document.createElement('img');
        slide.className = 'hero-slide' + (i === 0 ? ' is-visible' : '');
        slide.alt = '';
        slide.decoding = 'async';
        if (i === 0) {
            slide.fetchPriority = 'high';
            setPhoto(slide, `gallery/${name}`, heroSizes(`gallery/${name}`));
        }
        heroBg.appendChild(slide);
        return slide;
    });

    let heroIndex = 0;
    let heroTimer = null;
    function showHeroSlide(index) {
        if (index === heroIndex) return;
        heroSlides[heroIndex].classList.remove('is-visible');
        heroSlides[index].classList.add('is-visible');
        heroIndex = index;
    }
    function nextHeroSlide() {
        const next = (heroIndex + 1) % heroSlides.length;
        const slide = heroSlides[next];
        if (!slide.getAttribute('srcset')) {
            // first time: download it, show it once it's ready
            const key = `gallery/${heroPhotos[next]}`;
            slide.addEventListener('load', () => showHeroSlide(next), { once: true });
            setPhoto(slide, key, heroSizes(key));
        } else if (slide.complete && slide.naturalWidth) {
            showHeroSlide(next);
        }
    }
    function setHeroRunning(run) {
        clearInterval(heroTimer);
        if (run && !reduceMotion && heroSlides.length > 1) {
            heroTimer = setInterval(nextHeroSlide, HERO_MS);
        }
    }

    // =========================================================
    // top bar, current section, back-to-top
    // =========================================================
    const topbar = $('topbar');
    const toTop = $('to-top');
    function onScroll() {
        const y = window.scrollY;
        topbar.classList.toggle('is-scrolled', y > 10);
        toTop.classList.toggle('is-visible', y > window.innerHeight * 0.8);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const navLinks = [...document.querySelectorAll('.nav a')];

    // =========================================================
    // fullscreen (hidden where the browser can't do it, e.g. iPhone)
    // =========================================================
    const fullscreenBtn = $('fullscreen-btn');
    if (document.fullscreenEnabled) {
        fullscreenBtn.hidden = false;
        fullscreenBtn.addEventListener('click', () => {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            } else {
                document.documentElement.requestFullscreen().catch(() => {});
            }
        });
        document.addEventListener('fullscreenchange', () => {
            const on = Boolean(document.fullscreenElement);
            setIcon(fullscreenBtn, on ? 'compress' : 'expand', on ? 'Вийти з повноекранного режиму' : 'Повноекранний режим');
        });
    }

    // =========================================================
    // teacher photo
    // =========================================================
    const teacherImg = $('teacher-img');
    if (exists(teacherImg.dataset.photo)) {
        // shown at min(78vw, 300px) on phones, 380px on wider screens, minus the white border
        setPhoto(teacherImg, teacherImg.dataset.photo, '(max-width: 800px) min(calc(78vw - 24px), 276px), 356px');
    }

    // =========================================================
    // gallery: slideshow + thumbnails + season filter
    // =========================================================
    const stage = $('stage');
    const lightbox = $('lightbox');
    const layers = [...stage.querySelectorAll('.stage-layer')];
    const counter = $('stage-counter');
    const progress = $('stage-progress');
    const playPauseBtn = $('play-pause-btn');
    const thumbs = $('thumbs');
    const chips = [...document.querySelectorAll('#season-filter .chip')];

    let list = galleryPhotos;     // photos in the current filter
    let pos = 0;                  // current photo inside `list`
    let activeLayer = 0;
    let playing = !reduceMotion;  // autoplay unless the visitor prefers less motion
    let stageInView = false;
    let slideTimer = null;
    let loadToken = 0;

    const photoAlt = (i) => `Групове фото ${i + 1} з ${list.length} (${seasonNames[list[i].season] || 'фотосесія'})`;

    // counts next to the filter chips
    chips.forEach((chip) => {
        const season = chip.dataset.season;
        const count = season === 'all' ? galleryPhotos.length : galleryPhotos.filter((p) => p.season === season).length;
        chip.querySelector('span').textContent = count;
        if (!count) chip.hidden = true;
    });

    function buildThumbs() {
        thumbs.innerHTML = '';
        list.forEach((photo, i) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'thumb';
            btn.setAttribute('aria-label', `Фото ${i + 1}`);
            btn.innerHTML = `<img src="${previewOf(galleryKey(photo))}" alt="" loading="lazy" decoding="async">`;
            btn.addEventListener('click', () => showSlide(i));
            thumbs.appendChild(btn);
        });
    }

    // how wide the photo will appear inside the stage (it is fitted, not cropped)
    function stageSizes(key) {
        const box = stage.getBoundingClientRect();
        return `${Math.ceil(Math.min(box.width, box.height * photoInfo(key).ratio))}px`;
    }

    // downloads a photo ahead of time, in the size the stage will ask for
    let preloading = [];
    function preloadSlide(key) {
        const full = new Image();
        full.sizes = stageSizes(key);
        full.srcset = srcsetOf(key);
        const preview = new Image();
        preview.src = previewOf(key);
        preloading = [full, preview]; // keep a reference so the download isn't dropped
    }

    let started = false; // has the slideshow shown its first photo yet?

    function showSlide(index) {
        started = true;
        pos = (index + list.length) % list.length;
        const key = galleryKey(list[pos]);
        const token = ++loadToken;

        // fill the hidden layer, then cross-fade to it as soon as its preview is up
        const next = layers[1 - activeLayer];
        next.querySelector('.stage-layer-bg').style.backgroundImage = `url("${previewOf(key)}")`;
        next.querySelector('.photo-full').alt = photoAlt(pos);
        loadPair(next.querySelector('.photo-preview'), next.querySelector('.photo-full'), key, stageSizes(key)).then(() => {
            if (token !== loadToken) return; // a newer slide was requested meanwhile
            layers[activeLayer].classList.remove('is-visible');
            next.classList.add('is-visible');
            activeLayer = 1 - activeLayer;
        });

        counter.textContent = `${pad(pos + 1)} / ${pad(list.length)}`;

        // highlight + center the active thumbnail without scrolling the page
        [...thumbs.children].forEach((t, i) => {
            t.classList.toggle('is-active', i === pos);
            t.setAttribute('aria-current', i === pos ? 'true' : 'false');
        });
        const active = thumbs.children[pos];
        if (active) {
            thumbs.scrollTo({
                left: active.offsetLeft - thumbs.clientWidth / 2 + active.offsetWidth / 2,
                behavior: reduceMotion ? 'auto' : 'smooth',
            });
        }

        // warm up the next photo so it appears instantly
        preloadSlide(galleryKey(list[(pos + 1) % list.length]));

        scheduleNext();
    }

    function scheduleNext() {
        clearTimeout(slideTimer);
        progress.classList.remove('is-running');
        const run = playing && stageInView && !document.hidden && !lightbox.open;
        if (!run) return;
        void progress.offsetWidth; // restart the css progress animation
        progress.classList.add('is-running');
        slideTimer = setTimeout(() => showSlide(pos + 1), SLIDE_MS);
    }

    function setPlaying(value) {
        playing = value;
        setIcon(playPauseBtn, playing ? 'pause' : 'play', playing ? 'Пауза' : 'Відтворити');
        scheduleNext();
    }

    function setFilter(season) {
        list = season === 'all' ? galleryPhotos : galleryPhotos.filter((p) => p.season === season);
        chips.forEach((chip) => {
            const on = chip.dataset.season === season;
            chip.classList.toggle('is-active', on);
            chip.setAttribute('aria-pressed', String(on));
        });
        buildThumbs();
        showSlide(0);
    }

    stage.style.setProperty('--slide-ms', `${SLIDE_MS}ms`);
    chips.forEach((chip) => chip.addEventListener('click', () => setFilter(chip.dataset.season)));
    $('prev-btn').addEventListener('click', () => showSlide(pos - 1));
    $('next-btn').addEventListener('click', () => showSlide(pos + 1));
    playPauseBtn.addEventListener('click', () => setPlaying(!playing));
    $('zoom-btn').addEventListener('click', () => openLightbox(pos));

    const stageWasSwiped = onSwipe(stage, (dir) => showSlide(pos + dir));
    layers.forEach((layer) => {
        layer.addEventListener('click', () => {
            if (!stageWasSwiped()) openLightbox(pos);
        });
    });

    stage.addEventListener('keydown', (e) => {
        if (e.target !== stage) return;
        if (e.key === 'ArrowLeft') { showSlide(pos - 1); e.preventDefault(); }
        if (e.key === 'ArrowRight') { showSlide(pos + 1); e.preventDefault(); }
        if (e.key === ' ') { setPlaying(!playing); e.preventDefault(); }
        if (e.key === 'Enter') { openLightbox(pos); e.preventDefault(); }
    });

    document.addEventListener('visibilitychange', scheduleNext);

    // =========================================================
    // lightbox (enlarged photo)
    // =========================================================
    const lightboxFrame = $('lightbox-frame');
    const lightboxPreview = $('lightbox-preview');
    const lightboxImg = $('lightbox-img');
    const lightboxCounter = $('lightbox-counter');
    let lightboxPos = 0;

    function showInLightbox(index) {
        lightboxPos = (index + list.length) % list.length;
        const key = galleryKey(list[lightboxPos]);
        const ratio = photoInfo(key).ratio;

        // the frame takes the photo's shape, as big as the screen allows
        lightboxFrame.style.setProperty('--ratio', ratio);
        const width = Math.min(window.innerWidth * 0.94, (window.innerHeight - 120) * ratio);
        lightboxImg.alt = photoAlt(lightboxPos);
        loadPair(lightboxPreview, lightboxImg, key, `${Math.ceil(width)}px`);

        // the photo already sharp in the slideshow makes a better preview than the thumbnail
        const shown = layers[activeLayer].querySelector('.photo-full');
        if (lightboxPos === pos && shown.classList.contains('is-loaded') && shown.currentSrc) {
            lightboxPreview.src = shown.currentSrc;
            lightboxPreview.classList.add('is-sharp');
        }
        lightboxCounter.textContent = `${lightboxPos + 1} / ${list.length}`;
    }

    function openLightbox(index) {
        showInLightbox(index);
        if (typeof lightbox.showModal === 'function') {
            lightbox.showModal();
        } else {
            lightbox.setAttribute('open', '');
        }
        scheduleNext();
    }

    function closeLightbox() {
        if (typeof lightbox.close === 'function') {
            lightbox.close();
        } else {
            lightbox.removeAttribute('open');
            onLightboxClosed();
        }
    }

    function onLightboxClosed() {
        // continue the slideshow from the photo the visitor ended on
        if (lightboxPos !== pos) {
            showSlide(lightboxPos);
        } else {
            scheduleNext();
        }
        stage.focus({ preventScroll: true });
    }

    lightbox.addEventListener('close', onLightboxClosed);
    $('lightbox-close').addEventListener('click', closeLightbox);
    $('lightbox-prev').addEventListener('click', () => showInLightbox(lightboxPos - 1));
    $('lightbox-next').addEventListener('click', () => showInLightbox(lightboxPos + 1));
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });
    lightbox.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') showInLightbox(lightboxPos - 1);
        if (e.key === 'ArrowRight') showInLightbox(lightboxPos + 1);
    });
    onSwipe(lightbox, (dir) => showInLightbox(lightboxPos + dir));

    // =========================================================
    // classmates: card deck + roster
    // =========================================================
    const deck = $('deck');
    const track = $('deck-track');
    const deckPrev = $('deck-prev');
    const deckNext = $('deck-next');
    const deckCounter = $('deck-counter');
    const roster = $('roster');

    let current = 0;
    let flipped = false;

    $('class-title').textContent = `${students.length} ${plural(students.length, ['випускник', 'випускники', 'випускників'])}`;

    const hasPhrase = (s) => Boolean(s.phrase && s.phrase.trim());
    const firstName = (name) => name.split(' ')[0];
    const deckWasSwiped = onSwipe(deck, (dir) => goTo(current + dir));

    // card width in css: clamp(210px, 62vw, 300px)
    const CARD_SIZES = '(max-width: 338px) 210px, (max-width: 483px) 62vw, 300px';

    const cards = students.map((student, i) => {
        const card = document.createElement('div');
        card.className = 'card' + (hasPhrase(student) ? ' can-flip' : '');
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-face card-front">
                    <img alt="" loading="lazy" decoding="async" draggable="false">
                    <p class="card-name"></p>
                    ${hasPhrase(student) ? '<span class="card-flip-badge" aria-hidden="true"><svg><use href="#i-flip"/></svg></span>' : ''}
                </div>
                ${hasPhrase(student) ? '<div class="card-face card-back"><p class="card-phrase"></p><p class="card-signed"></p></div>' : ''}
            </div>`;
        // textContent keeps names/phrases safe from being read as html
        card.querySelector('.card-name').textContent = student.name;
        const photo = card.querySelector('.card-front img');
        photo.alt = student.name;
        photo.addEventListener('load', () => photo.classList.add('is-loaded'));
        if (hasPhrase(student)) {
            card.querySelector('.card-phrase').textContent = student.phrase.trim();
            card.querySelector('.card-signed').textContent = `— ${firstName(student.name)}`;
        }
        card.addEventListener('click', () => {
            if (deckWasSwiped()) return;
            if (i === current) {
                flip();
            } else {
                goTo(i);
            }
        });
        track.appendChild(card);
        return card;
    });

    const rosterButtons = students.map((student, i) => {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.innerHTML = `<img src="${urlAtLeast(`students/${student.photo}`, 120)}" alt="" loading="lazy" decoding="async"><span></span>`;
        btn.querySelector('span').textContent = student.name;
        btn.addEventListener('click', () => {
            goTo(i);
            deck.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
            deck.focus({ preventScroll: true });
        });
        li.appendChild(btn);
        roster.appendChild(li);
        return btn;
    });

    // portraits load only when their card gets close to the middle
    function loadCardPhoto(i) {
        const card = cards[i];
        if (card.dataset.loaded) return;
        card.dataset.loaded = 'true';
        const key = `students/${students[i].photo}`;
        card.querySelector('.card-front').style.backgroundImage = `url("${urlAtLeast(key, 0)}")`;
        setPhoto(card.querySelector('.card-front img'), key, CARD_SIZES);
    }

    function renderDeck() {
        cards.forEach((card, i) => {
            if (Math.abs(i - current) <= 3) loadCardPhoto(i);
            const offset = Math.max(-3, Math.min(3, i - current));
            const isCurrent = i === current;
            card.style.setProperty('--offset', offset);
            card.style.setProperty('--abs', Math.abs(offset));
            card.classList.toggle('is-far', Math.abs(i - current) > 2);
            card.classList.toggle('is-current', isCurrent);
            card.classList.toggle('is-flipped', isCurrent && flipped);
            // only the card in the middle is exposed to screen readers
            card.setAttribute('aria-hidden', String(!isCurrent));
        });
        rosterButtons.forEach((btn, i) => {
            btn.classList.toggle('is-active', i === current);
            btn.setAttribute('aria-current', i === current ? 'true' : 'false');
        });
        deckPrev.disabled = current === 0;
        deckNext.disabled = current === students.length - 1;
        deckCounter.textContent = `${pad(current + 1)} / ${pad(students.length)} · ${students[current].name}`;
    }

    function goTo(index) {
        const next = Math.max(0, Math.min(students.length - 1, index));
        if (next === current) return;
        current = next;
        flipped = false;
        renderDeck();
    }

    function flip() {
        if (!hasPhrase(students[current])) return;
        flipped = !flipped;
        renderDeck();
    }

    deckPrev.addEventListener('click', () => goTo(current - 1));
    deckNext.addEventListener('click', () => goTo(current + 1));
    deck.addEventListener('keydown', (e) => {
        if (e.target !== deck) return;
        if (e.key === 'ArrowLeft') { goTo(current - 1); e.preventDefault(); }
        if (e.key === 'ArrowRight') { goTo(current + 1); e.preventDefault(); }
        if (e.key === 'Home') { goTo(0); e.preventDefault(); }
        if (e.key === 'End') { goTo(students.length - 1); e.preventDefault(); }
        if (e.key === 'Enter' || e.key === ' ') { flip(); e.preventDefault(); }
    });

    renderDeck();
    buildThumbs();
    setPlaying(playing);

    // =========================================================
    // things that react to what is on screen
    // =========================================================
    if ('IntersectionObserver' in window) {
        // fade sections in as they appear
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-in');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

        // run the hero only while it's visible
        new IntersectionObserver(([entry]) => setHeroRunning(entry.isIntersecting))
            .observe(document.querySelector('.hero'));

        // the first gallery photo downloads only when the gallery gets close
        const nearObserver = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            nearObserver.disconnect();
            if (!started) showSlide(0);
        }, { rootMargin: '100% 0px' });
        nearObserver.observe(stage);

        // run the slideshow only while it's visible (saves data on phones)
        new IntersectionObserver(([entry]) => {
            stageInView = entry.isIntersecting;
            scheduleNext();
        }, { threshold: 0.35 }).observe(stage);

        // highlight the nav link of the section on screen
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                navLinks.forEach((a) => a.classList.toggle('is-current', a.hash === `#${entry.target.id}`));
            });
        }, { rootMargin: '-45% 0px -50% 0px' });
        document.querySelectorAll('main > section').forEach((s) => sectionObserver.observe(s));
    } else {
        document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-in'));
        stageInView = true;
        setHeroRunning(true);
        showSlide(0);
    }
});
