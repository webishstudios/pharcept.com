// PHARCEPT — interaction + global language/theme layer
(() => {
  const header = document.getElementById('siteHeader');
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');
  const body = document.body;

  /*
   * Nigerian language note:
   * Nigeria has 500+ languages. A browser-only translator cannot honestly
   * provide high-quality translations for every one of them without a
   * translation service/API. This site therefore exposes a comprehensive
   * Nigerian-language selector and ships native starter packs for English,
   * Nigerian Pidgin, Yoruba, Hausa and Igbo. Additional languages gracefully
   * fall back to English until an approved translation pack is supplied.
   * The same engine works on every page that includes this script.
   */
  const LANGUAGES = [
    ['en', 'English'], ['pcm', 'Nigerian Pidgin'], ['yo', 'Yorùbá'], ['ha', 'Hausa'], ['ig', 'Igbo'],
    ['ff', 'Fulfulde'], ['kr', 'Kanuri'], ['tiv', 'Tiv'], ['efi', 'Efik'], ['ibb', 'Ibibio'],
    ['bin', 'Edo (Bini)'], ['nupe', 'Nupe'], ['ijaw', 'Ijaw'], ['urh', 'Urhobo'], ['its', 'Itsekiri'],
    ['gbg', 'Gbagyi'], ['idu', 'Idoma'], ['igl', 'Igala'], ['ber', 'Berom'], ['ann', 'Annang'], ['ebira', 'Ebira']
  ];

  const T = {
    en: {},
    yo: {
      'Work': 'Iṣẹ́', 'Services': 'Àwọn Iṣẹ́', 'About': 'Nípa Wa', 'Our Story': 'Ìtàn Wa', 'Leadership': 'Àṣáájú', 'Contact': 'Kàn Sí Wa',
      'Start a project': 'Bẹ̀rẹ̀ iṣẹ́ kan', 'Explore our work': 'Wo àwọn iṣẹ́ wa', 'Discover our story': 'Ṣàwárí ìtàn wa', 'Scroll to explore': 'Yí lọ láti ṣàwárí',
      'THE PRACTICE': 'IṢẸ́ ILÉ IṢẸ́', 'OUR STORY': 'ÌTÀN WA', 'LEADERSHIP': 'ÀṢÁJÚ', 'VISION': 'ÌRÍRÍ', 'MISSION + VALUES': 'IṢẸ́ ÀTI ÀWỌN ÌLÀNÀ',
      'Architecture with purpose.': 'Àyíká ilé pẹ̀lú ète.', 'Construction with precision.': 'Ìkọ́lé pẹ̀lú ìpéye.',
      'Where it all began.': 'Ibi tí gbogbo rẹ̀ ti bẹ̀rẹ̀.', 'The person behind the vision': 'Ẹni tó wà lẹ́yìn ìrísí náà',
      'Design with purpose.': 'Ṣàpẹẹrẹ pẹ̀lú ète.', 'Build with integrity.': 'Kọ́ pẹ̀lú ìwà títọ́.',
      'Have a project in mind?': 'Ṣé o ní iṣẹ́ kan lọ́kàn?'
    },
    ha: {
      'Work': 'Ayyuka', 'Services': 'Ayyuka', 'About': 'Game da Mu', 'Our Story': 'Tarihinmu', 'Leadership': 'Jagoranci', 'Contact': 'Tuntuɓe Mu',
      'Start a project': 'Fara aiki', 'Explore our work': 'Duba ayyukanmu', 'Discover our story': 'Gano tarihinmu', 'Scroll to explore': 'Gungura don bincike',
      'THE PRACTICE': 'AIKIN KAMFANI', 'OUR STORY': 'TARIHINMU', 'LEADERSHIP': 'JAGORANCI', 'VISION': 'HANGEN NESA', 'MISSION + VALUES': 'MANUFA DA ƘIMOMI',
      'Architecture with purpose.': 'Gine-gine masu manufa.', 'Construction with precision.': 'Gini cikin ƙwarewa.',
      'Where it all began.': 'Inda komai ya fara.', 'The person behind the vision': 'Mutumin da ke bayan hangen nesan',
      'Design with purpose.': 'Tsara da manufa.', 'Build with integrity.': 'Gina cikin gaskiya.',
      'Have a project in mind?': 'Kana da wani aiki a zuciya?'
    },
    ig: {
      'Work': 'Ọrụ', 'Services': 'Ọrụ Anyị', 'About': 'Maka Anyị', 'Our Story': 'Akụkọ Anyị', 'Leadership': 'Nduzi', 'Contact': 'Kpọtụrụ Anyị',
      'Start a project': 'Malite ọrụ', 'Explore our work': 'Lee ọrụ anyị', 'Discover our story': 'Chọpụta akụkọ anyị', 'Scroll to explore': 'Pịgharịa ka ị chọpụta',
      'THE PRACTICE': 'OMUME ỤLỌ ỌRỤ', 'OUR STORY': 'AKỤKỌ ANYỊ', 'LEADERSHIP': 'NDUZI', 'VISION': 'ỌHỤNỤ', 'MISSION + VALUES': 'EBUMNỤCHE NA ỤKPỌRỌ',
      'Architecture with purpose.': 'Nhazi ụlọ nwere ebumnuche.', 'Construction with precision.': 'Mwube nwere izi ezi.',
      'Where it all began.': 'Ebe ihe niile malitere.', 'The person behind the vision': 'Onye nọ n’azụ ọhụụ ahụ',
      'Design with purpose.': 'Hazie ihe nwere ebumnuche.', 'Build with integrity.': 'Wuo ya n’eziokwu.',
      'Have a project in mind?': 'Ị nwere ọrụ ị na-eche banyere ya?'
    },
    pcm: {
      'Work': 'Work', 'Services': 'Services', 'About': 'About Us', 'Our Story': 'Our Story', 'Leadership': 'Leadership', 'Contact': 'Contact Us',
      'Start a project': 'Start project', 'Explore our work': 'See our work', 'Discover our story': 'Know our story', 'Scroll to explore': 'Scroll to explore',
      'THE PRACTICE': 'THE PRACTICE', 'OUR STORY': 'OUR STORY', 'LEADERSHIP': 'LEADERSHIP', 'VISION': 'VISION', 'MISSION + VALUES': 'MISSION + VALUES',
      'Architecture with purpose.': 'Design wey get purpose.', 'Construction with precision.': 'Build am with precision.',
      'Where it all began.': 'Where e start.', 'The person behind the vision': 'The person behind the vision',
      'Design with purpose.': 'Design am with purpose.', 'Build with integrity.': 'Build am with integrity.',
      'Have a project in mind?': 'You get project for mind?'
    }
  };

  T.yo.storyHeading = 'Ibi tí gbogbo rẹ̀<br /><em>ti bẹ̀rẹ̀.</em>';
  T.ha.storyHeading = 'Inda komai<br /><em>ya fara.</em>';
  T.ig.storyHeading = 'Ebe ihe niile<br /><em>malitere.</em>';
  T.pcm.storyHeading = 'Where e<br /><em>start.</em>';

  Object.assign(T.yo, {
    Architecture: 'Àyíká ilé', Construction: 'Ìkọ́lé', 'Interior design': 'Àpẹrẹ inú ilé', Development: 'Ìdàgbàsókè', Discover: 'Ṣàwárí', Design: 'Àpẹrẹ', Develop: 'Dàgbàsókè', Build: 'Kọ́', Deliver: 'Fí léṣẹ́', 'Send project enquiry': 'Rán ìbéèrè iṣẹ́ sí wa', 'What we do': 'Ohun tí a ń ṣe', CONTACT: 'KÀN SÍ WA', 'SELECTED WORK': 'ÀWỌN IṢẸ́ TÍ A YÀN', introHeading: 'Àyíká ilé<br />pẹ̀lú <em>ète.</em><br />Ìkọ́lé<br />pẹ̀lú ìpéye.', missionHeading: 'Àpẹrẹ pẹ̀lú<br /><em>ète.</em><br />Kọ́ pẹ̀lú<br />ìwà títọ́.'
  });
  Object.assign(T.ha, {
    Architecture: 'Gine-gine', Construction: 'Gini', 'Interior design': 'Tsarin ciki', Development: 'Ci gaba', Discover: 'Bincika', Design: 'Tsara', Develop: 'Haɓaka', Build: 'Gina', Deliver: 'Isar da', 'Send project enquiry': 'Aika buƙatar aiki', 'What we do': 'Abin da muke yi', CONTACT: 'TUNTUƁE MU', 'SELECTED WORK': 'ZAƁAƁƁUN AIYYUKA', introHeading: 'Gine-gine<br />masu <em>manufa.</em><br />Gini<br />cikin ƙwarewa.', missionHeading: 'Tsara da<br /><em>manufa.</em><br />Gina cikin<br />gaskiya.'
  });
  Object.assign(T.ig, {
    Architecture: 'Nhazi ụlọ', Construction: 'Mwube', 'Interior design': 'Nhazi ime ụlọ', Development: 'Mmepe', Discover: 'Chọpụta', Design: 'Hazie', Develop: 'Zụlite', Build: 'Wuo', Deliver: 'Nyefee', 'Send project enquiry': 'Zipu arịrịọ ọrụ', 'What we do': 'Ihe anyị na-eme', CONTACT: 'KPỌTỤRỤ ANYỊ', 'SELECTED WORK': 'ỌRỤ A HỌRỌRỌ', introHeading: 'Nhazi ụlọ<br />nwere <em>ebumnuche.</em><br />Mwube<br />nwere izi ezi.', missionHeading: 'Hazie ihe<br /><em>nwere ebumnuche.</em><br />Wuo ya<br />n’eziokwu.'
  });
  Object.assign(T.pcm, {
    Architecture: 'Building design', Construction: 'Building work', 'Interior design': 'Inside design', Development: 'Development', Discover: 'Find out', Design: 'Design am', Develop: 'Develop am', Build: 'Build am', Deliver: 'Deliver am', 'Send project enquiry': 'Send project request', 'What we do': 'Wetin we dey do', CONTACT: 'CONTACT US', 'SELECTED WORK': 'WORK WE PICK', introHeading: 'Building design<br />wey get <em>purpose.</em><br />Building work<br />with precision.', missionHeading: 'Design am with<br /><em>purpose.</em><br />Build am with<br />integrity.'
  });

  function cleanText(text) { return text.replace(/\s+/g, ' ').trim(); }
  function ensureI18nTargets() {
    document.querySelectorAll('main a, main button, main h1, main h2, main h3, main p, main span, nav a, .mono-label, .section-label, .hero-kicker, .hero-meta, .mobile-bottom').forEach(el => {
      if (!el.dataset.i18n && el.children.length === 0) {
        const t = cleanText(el.textContent);
        if (t && t.length < 180) el.dataset.i18n = t;
      }
    });
  }

  function translatePage(lang) {
    const pack = T[lang] || {};
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.dataset.i18nHtml;
      if (!el.dataset.i18nOriginalHtml) el.dataset.i18nOriginalHtml = el.innerHTML;
      el.innerHTML = pack[key] || el.dataset.i18nOriginalHtml;
    });
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (!el.dataset.i18nOriginal) el.dataset.i18nOriginal = el.textContent;
      el.textContent = pack[key] || el.dataset.i18nOriginal;
    });
    document.documentElement.lang = lang === 'pcm' ? 'pcm' : lang;
    document.body.dataset.language = lang;
    document.querySelectorAll('[data-lang-value]').forEach(el => el.textContent = lang.toUpperCase());
    document.querySelectorAll('.language-select').forEach(select => {
      if (select.value !== lang) select.value = lang;
    });
    try {
      localStorage.setItem('pharcept-language', lang);
    } catch (error) {
      console.warn('Unable to save language preference.', error);
    }
  }

  function buildLanguageMenu() {
    document.querySelectorAll('[data-language-menu]').forEach(menuEl => {
      if (menuEl.dataset.ready) return;
      menuEl.dataset.ready = '1';
      const select = document.createElement('select');
      select.className = 'language-select';
      select.setAttribute('aria-label', 'Choose language');
      LANGUAGES.forEach(([code, label]) => {
        const option = document.createElement('option'); option.value = code; option.textContent = label; select.appendChild(option);
      });
      let saved = 'en';
      try { saved = localStorage.getItem('pharcept-language') || 'en'; } catch (error) { console.warn('Unable to read language preference.', error); }
      select.value = LANGUAGES.some(x => x[0] === saved) ? saved : 'en';
      select.addEventListener('change', () => {
        translatePage(select.value);
        const supported = ['en', 'pcm', 'yo', 'ha', 'ig'].includes(select.value);
        showToast(supported ? `Language: ${select.options[select.selectedIndex].text}` : `${select.options[select.selectedIndex].text}: English fallback is active until the approved translation pack is added.`);
      });
      menuEl.appendChild(select);
    });
  }

  function showToast(message) {
    let toast = document.getElementById('languageToast');
    if (!toast) { toast = document.createElement('div'); toast.id = 'languageToast'; toast.className = 'language-toast'; document.body.appendChild(toast); }
    toast.textContent = message; toast.classList.add('show');
    clearTimeout(showToast.timer); showToast.timer = setTimeout(() => toast.classList.remove('show'), 3200);
  }

  function setupTheme() {
    let saved = null;
    try { saved = localStorage.getItem('pharcept-theme'); } catch (error) { console.warn('Unable to read theme preference.', error); }
    const systemDark = matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved === 'dark' || saved === 'light' ? saved : (systemDark ? 'dark' : 'light');
    document.documentElement.dataset.theme = theme;
    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to day mode' : 'Switch to night mode');
      btn.innerHTML = theme === 'dark' ? '☀' : '☾';
      btn.onclick = () => {
        const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.dataset.theme = next;
        try { localStorage.setItem('pharcept-theme', next); } catch (error) { console.warn('Unable to save theme preference.', error); }
        document.querySelectorAll('[data-theme-toggle]').forEach(b => { b.innerHTML = next === 'dark' ? '☀' : '☾'; b.setAttribute('aria-label', next === 'dark' ? 'Switch to day mode' : 'Switch to night mode'); });
      };
    });
  }

  function setMenu(open) {
    toggle.classList.toggle('active', open); toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    menu.classList.toggle('open', open); menu.setAttribute('aria-hidden', String(!open)); menu.setAttribute('aria-modal', String(open)); body.classList.toggle('menu-open', open);
  }
  function closeMenuOnPageInteraction(event) {
    if (!menu.classList.contains('open')) return;
    if (menu.contains(event.target) || toggle.contains(event.target)) return;
    setMenu(false);
  }
  toggle.addEventListener('click', e => { e.stopPropagation(); setMenu(!menu.classList.contains('open')); });
  document.addEventListener('click', e => { if (menu.classList.contains('open') && !menu.contains(e.target) && !toggle.contains(e.target)) setMenu(false); });
  document.addEventListener('wheel', closeMenuOnPageInteraction, { passive: true });
  document.addEventListener('touchstart', closeMenuOnPageInteraction, { passive: true });
  document.addEventListener('touchmove', closeMenuOnPageInteraction, { passive: true });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
  window.addEventListener('scroll', () => {
    if (menu.classList.contains('open')) setMenu(false);
    header.classList.toggle('scrolled', window.scrollY > 35);
  }, { passive: true });

  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); } }), { threshold: .12 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  const counterObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (!entry.isIntersecting) return; const el = entry.target, target = Number(el.dataset.target), start = performance.now(), duration = 1400; function tick(now) { const p = Math.min((now - start) / duration, 1), e = 1 - Math.pow(1 - p, 3); el.textContent = Math.floor(target * e); if (p < 1) requestAnimationFrame(tick); else el.textContent = target; } requestAnimationFrame(tick); counterObserver.unobserve(el); }), { threshold: .5 });
  document.querySelectorAll('.counter').forEach(c => counterObserver.observe(c));

  const testimonials = [
    { quote: '“From the first concept to final delivery, Pharcept brought professionalism, creativity and attention to detail to every stage of the project.”', name: 'CLIENT NAME', meta: 'LAGOS, NIGERIA / CLIENT' },
    { quote: '“The team listened carefully, solved problems thoughtfully and delivered a result we are proud to live and work in.”', name: 'CLIENT NAME', meta: 'OGUN / CLIENT' },
    { quote: '“A disciplined process, strong design thinking and a genuine commitment to getting the details right.”', name: 'CLIENT NAME', meta: 'LAGOS / CLIENT' }
  ];
  let current = 0; const quote = document.getElementById('testimonialQuote'), name = document.getElementById('testimonialName'), meta = document.getElementById('testimonialMeta'), index = document.getElementById('testimonialIndex');
  function renderTestimonial(i) { const item = testimonials[i]; quote.style.opacity = name.style.opacity = meta.style.opacity = '0'; setTimeout(() => { quote.textContent = item.quote; name.textContent = item.name; meta.textContent = item.meta; index.textContent = String(i + 1).padStart(2, '0'); quote.style.opacity = name.style.opacity = meta.style.opacity = '1'; }, 180) }
  document.getElementById('nextTestimonial')?.addEventListener('click', () => { current = (current + 1) % testimonials.length; renderTestimonial(current) });
  document.getElementById('prevTestimonial')?.addEventListener('click', () => { current = (current - 1 + testimonials.length) % testimonials.length; renderTestimonial(current) });
  [quote, name, meta].forEach(el => { if (el) el.style.transition = 'opacity .2s ease' });

  document.querySelectorAll('[data-carousel]').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = [...track.children];
    const currentLabel = carousel.querySelector('[data-carousel-current]');
    let currentSlide = 0;
    const updateCarousel = () => {
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
      if (currentLabel) currentLabel.textContent = String(currentSlide + 1).padStart(2, '0');
      slides.forEach((slide, index) => slide.setAttribute('aria-hidden', String(index !== currentSlide)));
    };
    carousel.querySelector('[data-carousel-prev]')?.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateCarousel();
    });
    carousel.querySelector('[data-carousel-next]')?.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % slides.length;
      updateCarousel();
    });
    carousel.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') carousel.querySelector('[data-carousel-prev]')?.click();
      if (event.key === 'ArrowRight') carousel.querySelector('[data-carousel-next]')?.click();
    });
    updateCarousel();
  });

  const sponsorTrack = document.querySelector('[data-sponsor-track]');
  const sponsorSet = sponsorTrack?.querySelector('[data-sponsor-set]');
  if (sponsorTrack && sponsorSet) {
    const duplicate = sponsorSet.cloneNode(true);
    duplicate.setAttribute('aria-hidden', 'true');
    sponsorTrack.appendChild(duplicate);
  }

  const dot = document.getElementById('cursorDot'), ring = document.getElementById('cursorRing');
  if (dot && ring && matchMedia('(pointer:fine)').matches) { let x = 0, y = 0, rx = 0, ry = 0; addEventListener('mousemove', e => { x = e.clientX; y = e.clientY; dot.style.left = x + 'px'; dot.style.top = y + 'px' }, { passive: true }); function loop() { rx += (x - rx) * .14; ry += (y - ry) * .14; ring.style.left = rx + 'px'; ring.style.top = ry + 'px'; requestAnimationFrame(loop) } loop(); document.querySelectorAll('a,button,.project-card,.service-row').forEach(el => { el.addEventListener('mouseenter', () => ring.classList.add('hover')); el.addEventListener('mouseleave', () => ring.classList.remove('hover')) }) }
  if (matchMedia('(pointer:fine)').matches) { const heroImage = document.querySelector('.hero-image'); if (heroImage) addEventListener('mousemove', e => { const x = (e.clientX / innerWidth - .5) * 5, y = (e.clientY / innerHeight - .5) * 5; heroImage.style.transform = `scale(1.04) translate(${x}px,${y}px)` }, { passive: true }) }

  const enquiryForm = document.getElementById('enquiryForm');
  const formStatus = document.getElementById('formStatus');
  const enquiryDraftKey = 'pharcept-enquiry-draft';
  const enquirySubmissionsKey = 'pharcept-enquiries';

  if (enquiryForm) {
    try {
      const draft = JSON.parse(localStorage.getItem(enquiryDraftKey) || '{}');
      Object.entries(draft).forEach(([name, value]) => {
        const field = enquiryForm.elements.namedItem(name);
        if (field) field.value = value;
      });
    } catch (error) {
      console.warn('Unable to restore enquiry draft.', error);
    }

    enquiryForm.addEventListener('input', () => {
      const values = Object.fromEntries(new FormData(enquiryForm).entries());
      try { localStorage.setItem(enquiryDraftKey, JSON.stringify(values)); } catch (error) { console.warn('Unable to save enquiry draft.', error); }
    });

    enquiryForm.addEventListener('submit', e => {
      e.preventDefault();
      const enquiry = Object.fromEntries(new FormData(enquiryForm).entries());
      let savedEnquiries = [];
      try {
        savedEnquiries = JSON.parse(localStorage.getItem(enquirySubmissionsKey) || '[]');
        if (!Array.isArray(savedEnquiries)) savedEnquiries = [];
        savedEnquiries.push({ ...enquiry, savedAt: new Date().toISOString() });
        localStorage.setItem(enquirySubmissionsKey, JSON.stringify(savedEnquiries));
        localStorage.removeItem(enquiryDraftKey);
      } catch (error) { console.warn('Unable to save enquiry locally.', error); }
      const subject = encodeURIComponent(`Project enquiry from ${enquiry.name}`);
      const body = encodeURIComponent([
        `Name: ${enquiry.name}`,
        `Email: ${enquiry.email}`,
        `Phone: ${enquiry.phone || 'Not provided'}`,
        `Project type: ${enquiry.type}`,
        '',
        enquiry.message || 'No message provided.'
      ].join('\n'));
      if (formStatus) formStatus.textContent = 'Your enquiry is saved. Opening your email app…';
      window.location.href = `mailto:hello@pharcept.com?subject=${subject}&body=${body}`;
    });
  }

  let savedLanguage = 'en';
  try { savedLanguage = localStorage.getItem('pharcept-language') || 'en'; } catch (error) { console.warn('Unable to read language preference.', error); }
  ensureI18nTargets(); buildLanguageMenu(); setupTheme(); translatePage(savedLanguage);
})();
