/* ════════════════════════════════════════════════════════════
   Adam Bouzekkoura — Portfolio & CV · interacties & animaties
   ════════════════════════════════════════════════════════════ */

// ─── Instellingen: pas hier aan ─────────────────────────────
const EMAIL = 'adambouzekkoura1@gmail.com';

// Formspree-URL (https://formspree.io → nieuw formulier). Leeg = formulier opent het mailprogramma van de bezoeker.
const FORM_ENDPOINT = '';

// Details voor het projectvenster. De sleutel moet gelijk zijn aan data-project in index.html.
const PROJECTEN = {
    'collectables': {
        titel: 'Collectables Web-app',
        context: 'Teamproject — Periode 4, ROC Mondriaan',
        afbeelding: 'images/projects/collectables.svg',
        alt: 'Illustratie van de Collectables web-app',
        beschrijving: 'Een webapplicatie waarin gebruikers verzamelobjecten kunnen toevoegen, bekijken en beheren — met naam, categorie, beschrijving en afbeelding.',
        tech: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
        rol: 'Ik werkte in een Scrum-team aan de overzichtspagina’s en de koppeling tussen de PHP-backend en de MySQL-database. Daarnaast reviewde ik pull requests van teamgenoten.',
        uitdagingen: ['Dynamische data uit de database netjes en snel tonen', 'Met meerdere developers in dezelfde codebase werken zonder conflicten'],
        geleerd: ['Een datamodel ontwerpen dat past bij de gebruiker', 'Werken met branches en pull requests', 'Formulierinvoer valideren aan client- en serverkant'],
        github: 'https://github.com/ROCMondriaanTIN/sd25-project-p04-collectables-smartnets',
        demo: ''
    },
    'vier-op-een-rij': {
        titel: 'Vier op een rij',
        context: '“Build your game” — Periode 3, ROC Mondriaan',
        afbeelding: 'img/Schermafbeelding 2026-06-15 134233.png',
        alt: 'Screenshot van Vier op een rij',
        beschrijving: 'Een digitaal bordspel waarin twee spelers om de beurt een steen laten vallen. De code berekent waar de steen landt en controleert na elke zet of er vier op een rij liggen.',
        tech: ['JavaScript', 'HTML', 'Bootstrap'],
        rol: 'Ik bouwde de game-loop: het bord als 2D-array, het wisselen van beurten en het algoritme dat horizontaal, verticaal en diagonaal op een winnaar controleert.',
        uitdagingen: ['Diagonale wincondities controleren zonder buiten het bord te lezen', 'Spelstaat en weergave synchroon houden'],
        geleerd: ['Werken met 2D-arrays en geneste loops', 'Logica scheiden van weergave', 'Systematisch debuggen met DevTools'],
        github: 'https://github.com/ROCMondriaanTIN/sd25-p03-proj-mon-in-project-p3',
        demo: ''
    },
    'landenquiz': {
        titel: 'Landenquiz',
        context: 'Persoonlijk project',
        afbeelding: 'images/projects/landenquiz.svg',
        alt: 'Illustratie van de Landenquiz',
        beschrijving: 'Een vlotte quiz met rondes van 10 willekeurige vragen uit een grotere set, inclusief score, streak, beste score en toetsenbordbediening (1 t/m 4).',
        tech: ['JavaScript', 'HTML', 'CSS', 'localStorage'],
        rol: 'Solo-project: ik ontwierp de interface, schreef de quizlogica en zorgde dat het spel volledig met het toetsenbord te spelen is.',
        uitdagingen: ['Iedere ronde een eerlijke, nieuwe mix van vragen kiezen', 'De beste score bewaren tussen sessies'],
        geleerd: ['Arrays schudden (Fisher–Yates)', 'Gegevens opslaan in localStorage', 'Toetsenbord-toegankelijkheid vanaf het begin inbouwen'],
        github: 'https://github.com/adambzka/adambzka.github.io/tree/main/Adam',
        demo: 'Adam/'
    },
    'voetbal-quiz': {
        titel: 'Voetbal Quiz',
        context: 'Project 1 — Periode 1, ROC Mondriaan',
        afbeelding: 'images/projects/voetbal-quiz.svg',
        alt: 'Illustratie van de Voetbal Quiz',
        beschrijving: 'Een interactieve quiz waarin de gebruiker vragen over voetbal beantwoordt, met directe feedback en een score die wordt bijgehouden.',
        tech: ['JavaScript', 'HTML', 'CSS'],
        rol: 'Solo-project waarin ik de vragenlogica, de score-telling en de feedback na elk antwoord heb gebouwd.',
        uitdagingen: ['De pagina laten reageren zonder te herladen', 'Vragen en antwoorden los van de HTML opslaan'],
        geleerd: ['De basis van DOM-manipulatie en events', 'Gebruikersinvoer controleren en feedback geven', 'Code opdelen in kleine functies'],
        github: 'https://github.com/adambzka/p01-project',
        demo: ''
    }
};

// Tekst die in het code-venster in de hero wordt "getypt". [klasse, tekst] per stukje.
const CODE_LINES = [
    [['kw', 'const '], ['var', 'developer'], ['', ' = {']],
    [['', '  name: '], ['str', "'Adam Bouzekkoura'"], ['', ',']],
    [['', '  study: '], ['str', "'Software Development'"], ['', ',']],
    [['', '  school: '], ['str', "'ROC Mondriaan'"], ['', ',']],
    [['', '  focus: '], ['str', "'frontend'"], ['', ',']],
    [['', '  stack: ['], ['str', "'HTML'"], ['', ', '], ['str', "'CSS'"], ['', ', '], ['str', "'JS'"], ['', ', '], ['str', "'React'"], ['', '],']],
    [['', '  offline: ['], ['str', "'editen'"], ['', ', '], ['str', "'sport'"], ['', '],']],
    [['', '  lookingFor: '], ['str', "'internship'"], ['', ',']],
    [['', '  available: '], ['kw', 'true'], ['', ',']],
    [['', '};']],
    [['', '']],
    [['cm', '// klaar om te bouwen 🚀']],
    [['var', 'developer'], ['', '.'], ['kw', 'hire'], ['', '();']]
];

// ─── Hulpfuncties ───────────────────────────────────────────
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Roept callback één keer aan zodra het element in beeld komt. */
function onVisible(elements, callback, options = { threshold: 0.2 }) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                callback(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, options);
    elements.forEach((el) => observer.observe(el));
}

// ─── Preloader ──────────────────────────────────────────────
async function preloader() {
    const loader = $('#preloader');
    const text = $('#preloaderText');
    if (reduceMotion) {
        loader.remove();
        document.body.classList.add('ready');
        return;
    }
    document.body.classList.add('loading');
    const command = 'npm run portfolio --adam';
    for (const char of command) {
        text.textContent += char;
        await sleep(28);
    }
    await sleep(350);
    loader.classList.add('done');
    document.body.classList.remove('loading');
    document.body.classList.add('ready');
    setTimeout(() => loader.remove(), 700);
}

// ─── Navbar, voortgangsbalk, terug-naar-boven ──────────────
function navigation() {
    const navbar = $('#hoofdNavigatie');
    const progress = $('#scrollProgress');
    const toTop = $('#backToTop');
    const collapse = $('#navbarNav');
    const toggler = $('.navbar-toggler');

    const onScroll = () => {
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        navbar.classList.toggle('scrolled', y > 20);
        toTop.classList.toggle('show', y > 700);
        progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mobiel menu: achtergrond + label bijwerken en sluiten na klik op een link
    collapse.addEventListener('show.bs.collapse', () => {
        navbar.classList.add('menu-open');
        toggler.setAttribute('aria-label', 'Menu sluiten');
    });
    collapse.addEventListener('hide.bs.collapse', () => {
        navbar.classList.remove('menu-open');
        toggler.setAttribute('aria-label', 'Menu openen');
    });
    $$('a', collapse).forEach((link) =>
        link.addEventListener('click', () => {
            if (collapse.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(collapse).hide();
        })
    );
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && collapse.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(collapse).hide();
    });

    // Actief menu-item: de sectie die midden in beeld staat
    const links = $$('a[href^="#"]', collapse);
    const sections = links.map((a) => $(a.getAttribute('href'))).filter(Boolean);
    const spy = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            links.forEach((a) => {
                const active = a.getAttribute('href') === `#${entry.target.id}`;
                a.classList.toggle('active', active);
                active ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current');
            });
        });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach((s) => spy.observe(s));
}

// ─── Muis-gloed ─────────────────────────────────────────────
function cursorGlow() {
    const glow = $('#cursorGlow');
    if (!finePointer || reduceMotion) return glow.remove();
    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;
    window.addEventListener('pointermove', (e) => { x = e.clientX; y = e.clientY; }, { passive: true });
    (function loop() {
        cx += (x - cx) * 0.12;
        cy += (y - cy) * 0.12;
        glow.style.transform = `translate(${cx - 240}px, ${cy - 240}px)`;
        requestAnimationFrame(loop);
    })();
}

// ─── Deeltjes-netwerk op de achtergrond ─────────────────────
function particles() {
    const canvas = $('#particles');
    const ctx = canvas.getContext('2d');
    const LINK = 130;
    let list = [], w = 0, h = 0, frame = 0;
    const mouse = { x: -999, y: -999 };

    function resize() {
        const dpr = Math.min(devicePixelRatio || 1, 2);
        w = innerWidth; h = innerHeight;
        canvas.width = w * dpr; canvas.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const count = Math.round(Math.min(80, (w * h) / 20000));
        list = Array.from({ length: count }, () => ({
            x: Math.random() * w, y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.25, vy: -Math.random() * 0.25 - 0.05,
            r: Math.random() * 1.5 + 0.4, a: Math.random() * 0.5 + 0.25
        }));
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);
        for (let i = 0; i < list.length; i++) {
            const p = list[i];
            for (let j = i + 1; j < list.length; j++) {
                const q = list[j];
                const d = Math.hypot(p.x - q.x, p.y - q.y);
                if (d < LINK) {
                    ctx.strokeStyle = `rgba(194,26,43,${0.14 * (1 - d / LINK)})`;
                    ctx.lineWidth = 0.6;
                    ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
                }
            }
            // lijnen naar de muis
            const dm = Math.hypot(p.x - mouse.x, p.y - mouse.y);
            if (dm < 170) {
                ctx.strokeStyle = `rgba(229,57,74,${0.35 * (1 - dm / 170)})`;
                ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
            }
            ctx.fillStyle = `rgba(229,57,74,${p.a})`;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        }
    }

    function step() {
        for (const p of list) {
            p.x += p.vx; p.y += p.vy;
            if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
            if (p.x < -10) p.x = w + 10;
            if (p.x > w + 10) p.x = -10;
        }
        draw();
        frame = requestAnimationFrame(step);
    }

    const start = () => { cancelAnimationFrame(frame); reduceMotion ? draw() : (frame = requestAnimationFrame(step)); };
    resize(); start();
    window.addEventListener('resize', () => { resize(); start(); });
    document.addEventListener('visibilitychange', () => (document.hidden ? cancelAnimationFrame(frame) : start()));
    if (finePointer) window.addEventListener('pointermove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });
}

// ─── Typ-effect functietitel ────────────────────────────────
async function typing() {
    const el = $('#typed');
    const words = JSON.parse(el.dataset.words);
    if (reduceMotion) { el.textContent = words[0]; return; }
    await sleep(1400);
    for (let i = 0; ; i = (i + 1) % words.length) {
        const word = words[i];
        for (let c = 1; c <= word.length; c++) { el.textContent = word.slice(0, c); await sleep(60); }
        await sleep(2200);
        for (let c = word.length; c >= 0; c--) { el.textContent = word.slice(0, c); await sleep(30); }
        await sleep(300);
    }
}

// ─── Code-venster dat zichzelf typt ─────────────────────────
async function codeTyper() {
    const target = $('#codeTyper');
    if (!target) return;
    const addLine = (n) => {
        const line = document.createElement('span');
        line.innerHTML = `<span class="ln">${n}</span>`;
        target.appendChild(line);
        return line;
    };
    if (reduceMotion) {
        CODE_LINES.forEach((tokens, i) => {
            const line = addLine(i + 1);
            tokens.forEach(([cls, text]) => line.insertAdjacentHTML('beforeend', `<span class="${cls}">${text}</span>`));
            target.appendChild(document.createTextNode('\n'));
        });
        return;
    }
    await sleep(1600);
    for (let i = 0; i < CODE_LINES.length; i++) {
        const line = addLine(i + 1);
        for (const [cls, text] of CODE_LINES[i]) {
            const span = document.createElement('span');
            span.className = cls;
            line.appendChild(span);
            for (const char of text) { span.textContent += char; await sleep(18); }
        }
        target.appendChild(document.createTextNode('\n'));
        await sleep(90);
    }
}

// ─── Tellers ────────────────────────────────────────────────
function counters() {
    onVisible($$('.counter'), (el) => {
        const end = +el.dataset.target;
        const begin = +(el.dataset.start || 0);
        if (reduceMotion) { el.textContent = end; return; }
        const duration = 1600;
        const t0 = performance.now();
        (function tick(now) {
            const t = Math.min((now - t0) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.round(begin + (end - begin) * eased);
            if (t < 1) requestAnimationFrame(tick);
        })(t0);
    }, { threshold: 0.5 });
}

// ─── Scroll-reveal + balken ─────────────────────────────────
function reveals() {
    // kleine vertraging per element binnen dezelfde rij voor een "waterval"-effect
    $$('.row').forEach((row) => {
        $$(':scope > .reveal', row).forEach((el, i) => el.style.setProperty('--delay', `${(i % 4) * 0.08}s`));
    });
    onVisible($$('.reveal, .reveal-right'), (el) => el.classList.add('visible'), { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    onVisible($$('[data-level]'), (el) => { el.style.width = `${el.dataset.level}%`; }, { threshold: 0.3 });
}

// ─── Filters (skills & projecten) ───────────────────────────
function filters() {
    $$('.filter-bar').forEach((bar) => {
        const group = $('[data-filter-group]', bar.closest('section'));
        const buttons = $$('.filter-btn', bar);
        buttons.forEach((btn) =>
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                buttons.forEach((b) => {
                    b.classList.toggle('active', b === btn);
                    b.setAttribute('aria-pressed', b === btn);
                });
                const items = $$(':scope > [data-category]', group);
                items.forEach((item) => item.classList.add('is-hiding'));
                setTimeout(() => {
                    items.forEach((item) => {
                        const match = filter === 'all' || item.dataset.category === filter;
                        item.classList.toggle('is-hidden', !match);
                        if (match) requestAnimationFrame(() => requestAnimationFrame(() => item.classList.remove('is-hiding')));
                    });
                    $$('[data-level]', group).forEach((bar) => (bar.style.width = `${bar.dataset.level}%`));
                }, reduceMotion ? 0 : 250);
            })
        );
    });
}

// ─── 3D-tilt, spotlight en magnetische knoppen ──────────────
function pointerEffects() {
    if (!finePointer || reduceMotion) return;

    $$('.tilt').forEach((el) => {
        el.addEventListener('pointermove', (e) => {
            const r = el.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            el.style.transform = `perspective(900px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg)`;
        });
        el.addEventListener('pointerleave', () => (el.style.transform = ''));
    });

    $$('.spotlight').forEach((el) =>
        el.addEventListener('pointermove', (e) => {
            const r = el.getBoundingClientRect();
            el.style.setProperty('--mx', `${e.clientX - r.left}px`);
            el.style.setProperty('--my', `${e.clientY - r.top}px`);
        })
    );

    $$('.magnetic').forEach((btn) => {
        btn.addEventListener('pointermove', (e) => {
            const r = btn.getBoundingClientRect();
            const x = e.clientX - r.left - r.width / 2;
            const y = e.clientY - r.top - r.height / 2;
            btn.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('pointerleave', () => (btn.style.transform = ''));
    });
}

// ─── Tijdlijn die zich vult tijdens het scrollen ───────────
function timeline() {
    const wrap = $('#timeline');
    const fill = $('#timelineFill');
    const update = () => {
        const r = wrap.getBoundingClientRect();
        const start = innerHeight * 0.75;
        const progress = (start - r.top) / (r.height * 0.9);
        fill.style.transform = `scaleY(${Math.max(0, Math.min(1, progress))})`;
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
}

// ─── Aftellen naar de stage ─────────────────────────────────
function countdown() {
    const box = $('#countdown');
    const target = new Date(`${box.dataset.date}T09:00:00`).getTime();
    const units = Object.fromEntries($$('[data-unit]', box).map((el) => [el.dataset.unit, el]));
    const pad = (n, l = 2) => String(n).padStart(l, '0');
    const tick = () => {
        const diff = Math.max(0, target - Date.now());
        units.days.textContent = pad(Math.floor(diff / 864e5), 3);
        units.hours.textContent = pad(Math.floor((diff / 36e5) % 24));
        units.minutes.textContent = pad(Math.floor((diff / 6e4) % 60));
        units.seconds.textContent = pad(Math.floor((diff / 1e3) % 60));
    };
    tick();
    setInterval(tick, 1000);
}

// ─── Projectvenster (Bootstrap modal) ───────────────────────
function projectModal() {
    const modalEl = $('#projectModal');
    const modal = new bootstrap.Modal(modalEl);
    const list = (items) => items.map((t) => `<li>${t}</li>`).join('');

    $$('.project-card').forEach((card) =>
        $('.project-trigger', card).addEventListener('click', () => {
            const p = PROJECTEN[card.dataset.project];
            if (!p) return;
            $('#modalImg').src = p.afbeelding;
            $('#modalImg').alt = p.alt;
            $('#modalContext').textContent = p.context;
            $('#projectModalTitle').textContent = p.titel;
            $('#modalDesc').textContent = p.beschrijving;
            $('#modalTags').innerHTML = p.tech.map((t) => `<span>${t}</span>`).join('');
            $('#modalRole').textContent = p.rol;
            $('#modalChallenges').innerHTML = list(p.uitdagingen);
            $('#modalLearned').innerHTML = list(p.geleerd);
            $('#modalLinks').innerHTML =
                (p.github ? `<a href="${p.github}" target="_blank" rel="noopener" class="btn btn-glass"><i class="bi bi-github me-2"></i>Bekijk op GitHub</a>` : '') +
                (p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener" class="btn btn-accent"><i class="bi bi-play-circle me-2"></i>Live demo</a>` : '');
            modal.show();
        })
    );
}

// ─── Contactformulier ───────────────────────────────────────
function contactForm() {
    const form = $('#contactForm');
    const btn = $('#submitBtn');
    const message = $('#bericht');
    const toast = new bootstrap.Toast($('#formToast'), { delay: 6000 });

    message.addEventListener('input', () => ($('#charCount').textContent = message.value.length));

    const showToast = (ok, title, text) => {
        $('#toastIcon').className = `bi fs-4 ${ok ? 'bi-check-circle-fill text-success' : 'bi-exclamation-triangle-fill text-danger'}`;
        $('#toastTitle').textContent = title;
        $('#toastMsg').textContent = text;
        toast.show();
    };
    const setLoading = (on) => {
        btn.disabled = on;
        $('.btn-label', btn).classList.toggle('d-none', on);
        $('.btn-loading', btn).classList.toggle('d-none', !on);
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            form.classList.remove('shake');
            void form.offsetWidth; // herstart de animatie
            form.classList.add('shake');
            $(':invalid', form)?.focus();
            return;
        }
        if (form.bedrijf.value) return; // spam-bot

        const data = {
            naam: form.naam.value.trim(),
            email: form.email.value.trim(),
            onderwerp: form.onderwerp.value.trim(),
            bericht: form.bericht.value.trim()
        };
        setLoading(true);

        try {
            if (FORM_ENDPOINT) {
                const res = await fetch(FORM_ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                    body: JSON.stringify(data)
                });
                if (!res.ok) throw new Error(res.status);
                showToast(true, `Bedankt ${data.naam.split(' ')[0]}!`, 'Je bericht is verzonden — ik reageer binnen twee werkdagen.');
            } else {
                const body = `${data.bericht}\n\n— ${data.naam} (${data.email})`;
                window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(data.onderwerp)}&body=${encodeURIComponent(body)}`;
                showToast(true, 'Bijna klaar!', 'Je e-mailprogramma is geopend met je bericht. Druk daar op verzenden.');
            }
            form.reset();
            form.classList.remove('was-validated');
            $('#charCount').textContent = '0';
        } catch {
            showToast(false, 'Er ging iets mis', `Probeer het opnieuw of mail direct naar ${EMAIL}.`);
        } finally {
            setLoading(false);
        }
    });
}

// ─── Start ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    preloader();
    navigation();
    cursorGlow();
    particles();
    typing();
    codeTyper();
    counters();
    reveals();
    filters();
    pointerEffects();
    timeline();
    countdown();
    projectModal();
    contactForm();
    $$('[data-bs-toggle="tooltip"]').forEach((el) => new bootstrap.Tooltip(el));
});
