const NAV_GROUPS = [
  {
    id: 'main',
    section: '本編',
    items: [
      { href: 'ch0.html',  label: '序章', sub: '制度の歴史と善意の限界' },
      { href: 'ch1.html',  label: 'Ch.1', sub: '次世代型障害者雇用モデル' },
      { href: 'ch2.html',  label: 'Ch.2', sub: '準公務・準企業職員制度' },
      { href: 'ch3.html',  label: 'Ch.3', sub: '不作為のコストと社会契約' },
      { href: 'ch9.html',  label: 'Ch.4', sub: '制度の終わらせ方設計' },
      { href: 'ch4.html',  label: '付録', sub: '社会はすでに知っている' },
    ]
  },
  {
    id: 'detail',
    section: '制度詳細',
    items: [
      { href: 'scp.html',          label: 'SCP制度図解' },
      { href: 'roadmap_corp.html', label: '民間企業 移行ロードマップ' },
      { href: 'roadmap_gov.html',  label: '準公務職員 移行ロードマップ' },
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
    id: 'faq',
    section: 'FAQ',
    items: [
      { href: 'faq.html', label: 'よくある質問と回答' },
    ]
  }
];

(function () {
  const current = location.pathname.split('/').pop() || 'index.html';

  // どのグループが現在ページを含むか判定
  function groupContainsCurrent(group) {
    return group.items.some(i => i.href === current);
  }

  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar';

  // ── ロゴ（トップページリンク）
  sidebar.innerHTML = `
    <div class="sidebar-logo">
      <a href="index.html">
        <span class="sidebar-logo-title">提言書</span>
        <span class="sidebar-logo-sub">次世代型障害者雇用モデルの創設</span>
      </a>
    </div>
    <div class="sidebar-top${current === 'index.html' ? ' active' : ''}">
      <a href="index.html" class="sidebar-top-link">
        <span class="sidebar-top-icon">▶</span>エグゼクティブサマリー
      </a>
    </div>`;

  // ── アコーディオングループ
  NAV_GROUPS.forEach(group => {
    const hasCurrent = groupContainsCurrent(group);
    const isOpen = hasCurrent;

    const wrap = document.createElement('div');
    wrap.className = 'nav-group';
    wrap.dataset.id = group.id;

    // ヘッダー（クリックで展開）
    const header = document.createElement('button');
    header.className = 'nav-group-header' + (isOpen ? ' open' : '');
    header.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    header.innerHTML = `
      <span class="nav-group-label">${group.section}</span>
      <span class="nav-chevron">${isOpen ? '▲' : '▼'}</span>`;

    // 中身
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
        a.innerHTML = `<span class="sidebar-dot"></span>${item.label}`;
      }
      body.appendChild(a);
    });

    // トグル動作
    header.addEventListener('click', () => {
      const opened = header.classList.contains('open');
      header.classList.toggle('open', !opened);
      header.setAttribute('aria-expanded', !opened);
      header.querySelector('.nav-chevron').textContent = !opened ? '▲' : '▼';
      body.style.display = !opened ? 'block' : 'none';
    });

    wrap.appendChild(header);
    wrap.appendChild(body);
    sidebar.appendChild(wrap);
  });

  document.body.prepend(sidebar);
})();
