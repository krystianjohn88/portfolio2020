// ==========================================================
//  Krystian John – portfolio: interakcje i odrobina zabawy
// ==========================================================

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;

// ---------- motyw jasny / ciemny ----------
const root = document.documentElement;
try {
    const saved = localStorage.getItem('theme');
    if (saved) root.dataset.theme = saved;
} catch (e) { /* brak dostępu do storage – trudno */ }

$('#themeToggle').addEventListener('click', () => {
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) { }
});

$('#year').textContent = new Date().getFullYear();

// ---------- toast ----------
let toastTimer;
function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2400);
}

// ---------- cząsteczki (konfetti / emoji) ----------
const confettiColors = ['#ff7a59', '#6c63ff', '#2ee6c5', '#ffd166', '#c86dd7'];

function burst(x, y, { count = 24, emoji = null, colors = confettiColors, spread = 1 } = {}) {
    if (reduceMotion) return;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('span');
        p.className = 'particle';
        if (emoji) {
            p.textContent = emoji;
            p.style.fontSize = `${16 + Math.random() * 16}px`;
        } else {
            const size = 6 + Math.random() * 6;
            p.style.width = `${size}px`;
            p.style.height = `${size * (Math.random() > 0.5 ? 1 : 0.4)}px`;
            p.style.background = colors[i % colors.length];
            p.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        }
        p.style.left = `${x}px`;
        p.style.top = `${y}px`;
        document.body.appendChild(p);

        const angle = Math.random() * Math.PI * 2;
        const velocity = (80 + Math.random() * 160) * spread;
        const dx = Math.cos(angle) * velocity;
        const dy = Math.sin(angle) * velocity - 120;
        const rot = (Math.random() - 0.5) * 720;

        p.animate([
            { transform: 'translate(-50%, -50%) rotate(0deg)', opacity: 1 },
            { transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy + 220}px)) rotate(${rot}deg)`, opacity: 0 }
        ], {
            duration: 900 + Math.random() * 700,
            easing: 'cubic-bezier(.2,.7,.4,1)'
        }).onfinish = () => p.remove();
    }
}

function centerOf(el) {
    const r = el.getBoundingClientRect();
    return [r.left + r.width / 2, r.top + r.height / 2];
}

// ---------- poświata za kursorem ----------
const glow = $('.cursor-glow');
if (finePointer) {
    window.addEventListener('pointermove', e => {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
    });
} else {
    glow.style.display = 'none';
}

// ---------- imię: litery skaczą po najechaniu ----------
$$('.name .letters').forEach(word => {
    const text = word.textContent;
    word.textContent = '';
    [...text].forEach(ch => {
        const s = document.createElement('span');
        s.className = 'ch';
        s.textContent = ch;
        s.addEventListener('mouseenter', () => {
            s.classList.remove('jump');
            void s.offsetWidth; // restart animacji
            s.classList.add('jump');
        });
        s.addEventListener('animationend', () => s.classList.remove('jump'));
        word.appendChild(s);
    });
});

// ---------- efekt pisania ----------
const roles = ['Web Developer', 'JavaScript lover', 'rozwiązywacz zagadek', 'fan rowerów 🚴', 'szachista ♟️'];
const typed = $('#typed');
let roleIdx = 0, charIdx = 0, deleting = false;

function typeLoop() {
    const word = roles[roleIdx];
    typed.textContent = word.slice(0, charIdx);
    if (!deleting && charIdx < word.length) {
        charIdx++;
        setTimeout(typeLoop, 70 + Math.random() * 60);
    } else if (!deleting) {
        deleting = true;
        setTimeout(typeLoop, 1600);
    } else if (charIdx > 0) {
        charIdx--;
        setTimeout(typeLoop, 35);
    } else {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        setTimeout(typeLoop, 300);
    }
}
reduceMotion ? (typed.textContent = roles[0]) : typeLoop();

// ---------- zdjęcie: klik = konfetti ----------
const photoMessages = [
    'Hej! To łaskocze 😄',
    'Jeszcze raz? 🎉',
    'Okej, lubisz konfetti 🥳',
    'Dobra, dobra – zatrudnij mnie i będzie więcej 😎',
    'Rekord! Jesteś mistrzem klikania 🏆'
];
let photoClicks = 0;
const ring = $('.photo-ring');
ring.addEventListener('click', () => {
    const [x, y] = centerOf(ring);
    burst(x, y, { count: 40, spread: 1.4 });
    ring.classList.remove('boing');
    void ring.offsetWidth;
    ring.classList.add('boing');
    toast(photoMessages[Math.min(photoClicks, photoMessages.length - 1)]);
    photoClicks++;
});

// ---------- przeciągane naklejki ----------
$$('.sticker').forEach(st => {
    let startX, startY, baseX = 0, baseY = 0;
    st.addEventListener('pointerdown', e => {
        st.setPointerCapture(e.pointerId);
        st.classList.add('dragging');
        startX = e.clientX - baseX;
        startY = e.clientY - baseY;
    });
    st.addEventListener('pointermove', e => {
        if (!st.classList.contains('dragging')) return;
        baseX = e.clientX - startX;
        baseY = e.clientY - startY;
        st.style.translate = `${baseX}px ${baseY}px`;
    });
    const drop = () => {
        if (!st.classList.contains('dragging')) return;
        st.classList.remove('dragging');
        const [x, y] = centerOf(st);
        burst(x, y, { count: 10, spread: 0.5 });
    };
    st.addEventListener('pointerup', drop);
    st.addEventListener('pointercancel', drop);
});

// ---------- magnetyczne przyciski ----------
if (finePointer && !reduceMotion) {
    $$('.magnetic').forEach(btn => {
        btn.addEventListener('pointermove', e => {
            const r = btn.getBoundingClientRect();
            const x = e.clientX - r.left - r.width / 2;
            const y = e.clientY - r.top - r.height / 2;
            btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
        });
        btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
    });
}

// ---------- karty projektów 3D ----------
if (finePointer && !reduceMotion) {
    $$('.tilt').forEach(card => {
        card.addEventListener('pointermove', e => {
            const r = card.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            card.style.transform = `rotateY(${px * 14}deg) rotateX(${-py * 14}deg) translateY(-6px)`;
        });
        card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
}

// ---------- hobby: deszcz emoji ----------
$$('.hobbies li').forEach(li => {
    li.addEventListener('click', () => {
        const [x, y] = centerOf(li);
        burst(x, y, { count: 12, emoji: li.dataset.emoji, spread: 0.9 });
    });
});

// ---------- umiejętności: paski poziomu + zabawa ----------
const lvlNames = { 1: 'podstawy', 2: 'średni', 3: 'dobry' };
const skillQuips = [
    'Ładowanie skilla… 99% ⏳',
    'Poziom w górę! 🆙',
    '+10 do doświadczenia ✨',
    'Combo! 🔥',
    'Ten skill już się nie zmieści 😅'
];
$$('.skill').forEach(skill => {
    const lvl = Number(skill.dataset.level);
    const bars = document.createElement('div');
    bars.className = 'level';
    for (let i = 1; i <= 3; i++) {
        const b = document.createElement('i');
        if (i <= lvl) b.classList.add('on');
        bars.appendChild(b);
    }
    const label = document.createElement('span');
    label.className = 'lvl-label';
    label.textContent = `poziom: ${lvlNames[lvl]}`;
    skill.append(bars, label);

    let clicks = 0;
    skill.addEventListener('click', () => {
        const color = getComputedStyle(skill).getPropertyValue('--c').trim();
        const [x, y] = centerOf(skill);
        burst(x, y, { count: 18, colors: [color, '#ffffff'], spread: 0.8 });
        skill.classList.remove('shake');
        void skill.offsetWidth;
        skill.classList.add('shake');
        toast(`${skill.querySelector('b').textContent}: ${skillQuips[clicks % skillQuips.length]}`);
        clicks++;
    });
});

// ---------- pojawianie się przy przewijaniu ----------
const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        // lekkie opóźnienie dla elementów w tej samej siatce
        const siblings = el.parentElement ? $$(':scope > .reveal', el.parentElement) : [];
        const idx = Math.max(0, siblings.indexOf(el));
        el.style.transitionDelay = `${Math.min(idx, 8) * 60}ms`;
        el.classList.add('in');
        io.unobserve(el);
    });
}, { threshold: 0.15 });
$$('.reveal').forEach(el => io.observe(el));

// ---------- aktywny link w nawigacji ----------
const navLinks = $$('.nav nav a');
const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
    });
}, { rootMargin: '-45% 0px -50% 0px' });
$$('main section[id]').forEach(s => sectionObserver.observe(s));

// ---------- kopiowanie maila ----------
$('#copyMail').addEventListener('click', async e => {
    const mail = e.currentTarget.dataset.mail;
    try {
        await navigator.clipboard.writeText(mail);
        toast('Skopiowano maila! 📋 Czekam na wiadomość');
        burst(e.clientX, e.clientY, { count: 14, emoji: '✉️', spread: 0.7 });
    } catch (err) {
        window.location.href = `mailto:${mail}`;
    }
});

// ---------- kod Konami = tryb imprezy ----------
const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiPos = 0;
window.addEventListener('keydown', e => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    konamiPos = key === konami[konamiPos] ? konamiPos + 1 : (key === konami[0] ? 1 : 0);
    if (konamiPos === konami.length) {
        konamiPos = 0;
        partyMode();
    }
});

function partyMode() {
    document.body.classList.toggle('party');
    const on = document.body.classList.contains('party');
    toast(on ? '🎉 TRYB IMPREZY WŁĄCZONY 🎉' : 'Impreza skończona, wracamy do pracy 💼');
    if (!on) return;
    const emojis = ['🎉', '🥳', '🕺', '💃', '🍕', '🚀', '⭐'];
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            burst(Math.random() * innerWidth, Math.random() * innerHeight * 0.6, {
                count: 14,
                emoji: emojis[i % emojis.length],
                spread: 1.2
            });
        }, i * 220);
    }
}
