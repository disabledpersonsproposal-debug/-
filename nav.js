/* ═══════════════════════════════════════════════════
   nav.js — サイドバー + TOC + ページナビ
   ═══════════════════════════════════════════════════ */

const NAV_GROUPS = [
  {
    id: 'main',
    section: '本編',
    items: [
      { href: 'summary.html',  label: 'エグゼクティブサマリー', sub: '提言の全体像・数字・構造' },
      { href: 'ch0.html',      label: '序章',          sub: '制度の歴史と善意の限界' },
      { href: 'ch1.html',      label: '第1章',          sub: '次世代型障害者雇用モデル' },
      { href: 'ch2.html',      label: '第2章',          sub: '準公務・準企業職員制度' },
      { href: 'ch3.html',      label: '第3章',          sub: '不作為のコストと社会契約' },
      { href: 'ch4.html',      label: '第4章',          sub: '制度の終わらせ方設計' },
      { href: 'appendix.html', label: '付録',          sub: '社会はすでに知っている' },
    ]
  },
  {
    id: 'detail',
    section: '制度詳細',
    items: [
      { href: 'scp.html',       label: 'SCP制度図解',              sub: '制度の全体像・3レーン・財源構造' },
      { href: 'timeline.html',     label: '全工程タイムライン',        sub: '3シナリオ・所要年数試算' },
      { href: 'roadmap_gov.html',  label: '準公務職員 移行ロードマップ', sub: 'タイムライン起算後' },
      { href: 'roadmap_corp.html', label: '民間企業 移行ロードマップ',   sub: 'タイムライン起算後' },
    ]
  },
  {
    id: 'data',
    section: 'データ・根拠',
    items: [
      { href: 'intl.html',    label: '国際比較データ集' },
      { href: 'finance.html', label: '財源シミュレーション' },
      { href: 'cost.html',    label: '不作為のコスト試算' },
      { href: 'fraud.html',   label: '不正悪用防止設計' },
    ]
  },
  {
    id: 'reference',
    section: '参考資料',
    items: [
      { href: 'glossary.html', label: '用語集', sub: '制度用語・PPP・現行制度' },
      { href: 'faq.html',      label: 'FAQ',    sub: 'よくある質問と回答' },
      { href: 'origin.html',   label: '本提言の記録',  sub: '概念の初出・公開履歴' },
    ]
  }
];

/* ── フラットなページ順序（前後ナビ用） ── */
const ALL_PAGES = [
  { href: 'index.html', label: '巻頭言・読書案内' },
  ...NAV_GROUPS.flatMap(g => g.items)
];

(function () {
  const current = location.pathname.split('/').pop() || 'index.html';

  function groupContainsCurrent(group) {
    return group.items.some(i => i.href === current);
  }

  /* ══ サイドバー構築 ══ */
  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar';

  sidebar.innerHTML = `
    <div class="sidebar-logo">
      <a href="index.html">
        <span class="sidebar-logo-title">提言書</span>
        <span class="sidebar-logo-sub">次世代型障害者雇用モデルの創設</span>
      </a>
    </div>
    <div class="sidebar-top${current === 'index.html' ? ' active' : ''}">
      <a href="index.html" class="sidebar-top-link">
        <span class="sidebar-top-icon">▶</span>巻頭言・読書案内
      </a>
    </div>`;

  NAV_GROUPS.forEach(group => {
    const hasCurrent = groupContainsCurrent(group);
    const isOpen = hasCurrent;

    const wrap = document.createElement('div');
    wrap.className = 'nav-group';
    wrap.dataset.id = group.id;

    const header = document.createElement('button');
    header.className = 'nav-group-header' + (isOpen ? ' open' : '');
    header.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    header.innerHTML = `
      <span class="nav-group-label">${group.section}</span>
      <span class="nav-chevron">▼</span>`;

    const body = document.createElement('div');
    body.className = 'nav-group-body';
    body.style.display = isOpen ? 'block' : 'none';

    group.items.forEach(item => {
      const a = document.createElement('a');
      const isActive = item.href === current;
      a.href = item.href;
      a.className = 'sidebar-item' + (isActive ? ' active' : '');

      if (item.sub) {
        a.innerHTML = `
          <span class="sidebar-dot"></span>
          <span class="sidebar-item-inner">
            <span class="sidebar-item-label">${item.label}</span>
            <span class="sidebar-item-sub">${item.sub}</span>
          </span>`;
      } else {
        a.innerHTML = `
          <span class="sidebar-dot"></span>
          <span class="sidebar-item-inner">
            <span class="sidebar-item-label">${item.label}</span>
          </span>`;
      }
      body.appendChild(a);
    });

    header.addEventListener('click', () => {
      const opened = header.classList.toggle('open');
      header.setAttribute('aria-expanded', opened ? 'true' : 'false');
      body.style.display = opened ? 'block' : 'none';
    });

    wrap.appendChild(header);
    wrap.appendChild(body);
    sidebar.appendChild(wrap);
  });

  document.body.insertBefore(sidebar, document.body.firstChild);

  /* ══ モバイルヘッダー ══ */
  const mobileHeader = document.createElement('div');
  mobileHeader.className = 'mobile-header';
  mobileHeader.innerHTML = `
    <a href="index.html" class="mobile-header-title">提言書</a>
    <button class="mobile-hamburger" aria-label="メニュー">
      <span></span><span></span><span></span>
    </button>`;

  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';

  const main = document.querySelector('.main');
  if (main) {
    main.insertBefore(mobileHeader, main.firstChild);
    main.appendChild(overlay);
  }

  const hamburger = mobileHeader.querySelector('.mobile-hamburger');
  function toggleMenu(open) {
    hamburger.classList.toggle('open', open);
    sidebar.classList.toggle('open', open);
    overlay.classList.toggle('visible', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  hamburger.addEventListener('click', () => toggleMenu(!sidebar.classList.contains('open')));
  overlay.addEventListener('click', () => toggleMenu(false));

  /* ══ ページ内TOC自動生成 ══ */
  function buildTOC() {
    if (current === 'index.html') return; // トップページはスキップ
    if (current === 'faq.html') return;   // FAQは独自アンカーナビを使用

    const content = document.querySelector('.content');
    if (!content) return;

    // h2要素を収集
    const headings = Array.from(content.querySelectorAll('h2'));
    if (headings.length < 2) return; // 1つ以下はTOC不要

    // idを付与（なければ自動生成）
    headings.forEach((h, i) => {
      if (!h.id) {
        const slug = 'section-' + (i + 1);
        h.id = slug;
      }
    });

    const toc = document.createElement('nav');
    toc.className = 'page-toc';
    toc.setAttribute('aria-label', 'ページ内目次');

    const title = document.createElement('span');
    title.className = 'page-toc-title';
    title.textContent = '目次';
    toc.appendChild(title);

    const ul = document.createElement('ul');
    headings.forEach(h => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#' + h.id;
      a.textContent = h.textContent.trim();
      li.appendChild(a);
      ul.appendChild(li);
    });
    toc.appendChild(ul);

    // gold-ruleの直後に挿入
    const goldRule = content.querySelector('.gold-rule');
    if (goldRule) {
      goldRule.after(toc);
    } else {
      // chapter-titleの後に挿入
      const subtitle = content.querySelector('.chapter-subtitle');
      if (subtitle) subtitle.after(toc);
    }
  }
  buildTOC();

  /* ══ 前後ページナビゲーション ══ */
  function buildPageNav() {
    const content = document.querySelector('.content');
    if (!content) return;

    const idx = ALL_PAGES.findIndex(p => p.href === current);
    if (idx === -1) return;

    const prev = ALL_PAGES[idx - 1] || null;
    const next = ALL_PAGES[idx + 1] || null;
    if (!prev && !next) return;

    const nav = document.createElement('nav');
    nav.className = 'page-nav';
    nav.setAttribute('aria-label', 'ページナビゲーション');

    if (prev) {
      nav.innerHTML += `
        <a href="${prev.href}" class="page-nav-item">
          <span class="page-nav-dir">← 前のページ</span>
          <span class="page-nav-title">${prev.label}</span>
          ${prev.sub ? `<span class="page-nav-sub">${prev.sub}</span>` : ''}
        </a>`;
    }
    if (next) {
      nav.innerHTML += `
        <a href="${next.href}" class="page-nav-item">
          <span class="page-nav-dir">次のページ →</span>
          <span class="page-nav-title">${next.label}</span>
          ${next.sub ? `<span class="page-nav-sub">${next.sub}</span>` : ''}
        </a>`;
    }

    content.appendChild(nav);
  }
  buildPageNav();

  /* ══ 内部資料アクセス（Ctrl+Shift+A） ══ */
  document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
      window.location.href = 'annex.html';
    }
  });

})();
