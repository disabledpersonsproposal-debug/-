const NAV_ITEMS = [
  {
    section: '本編',
    items: [
      { href: 'index.html',        label: 'エグゼクティブサマリー' },
      { href: 'ch0.html',          label: '序章 ─ 制度の歴史と善意の限界' },
      { href: 'ch1.html',          label: '次世代型障害者雇用モデル' },
      { href: 'ch2.html',          label: '準公務・準企業職員制度' },
      { href: 'ch3.html',          label: '不作為のコストと社会契約' },
      { href: 'ch4.html',          label: '巻末付録 ─ 社会はすでに知っている' },
      { href: 'ch9.html',          label: '制度の終わらせ方設計' },
    ]
  },
  {
    section: '資料',
    items: [
      { href: 'intl.html',         label: '国際比較データ集' },
      { href: 'finance.html',      label: '財源シミュレーション' },
      { href: 'cost.html',         label: '不作為のコスト試算' },
      { href: 'faq.html',          label: 'FAQ' },
      { href: 'roadmap_corp.html', label: '民間企業 移行ロードマップ' },
      { href: 'roadmap_gov.html',  label: '準公務職員 移行ロードマップ' },
      { href: 'fraud.html',        label: '不正悪用防止設計' },
      { href: 'scp.html',          label: 'SCP制度図解' },
    ]
  }
];

(function () {
  const current = location.pathname.split('/').pop() || 'index.html';

  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar';

  // ロゴ
  sidebar.innerHTML = `
    <div class="sidebar-logo">
      <a href="index.html">
        <span class="sidebar-logo-title">提言書</span>
        <span class="sidebar-logo-sub">次世代型障害者雇用モデルの創設</span>
      </a>
    </div>`;

  // メニュー項目を生成
  NAV_ITEMS.forEach(group => {
    const sec = document.createElement('div');
    sec.className = 'sidebar-section';
    sec.textContent = group.section;
    sidebar.appendChild(sec);

    group.items.forEach(item => {
      const a = document.createElement('a');
      a.href = item.href;
      a.className = 'sidebar-item' + (item.href === current ? ' active' : '');
      a.innerHTML = `<span class="sidebar-dot"></span>${item.label}`;
      sidebar.appendChild(a);
    });
  });

  // body の先頭に挿入
  document.body.prepend(sidebar);
})();
