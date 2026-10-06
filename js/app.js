(function () {
  var langBtns = document.querySelectorAll('.lang-btn');
  var translatable = document.querySelectorAll('[data-fi]');
  var currentLang = 'fi';

  function resolveText(value, lang) {
    if (!value) return '';
    if (typeof value === 'string') return value;
    return value[lang] || value.fi || '';
  }

  function setLang(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    translatable.forEach(function (el) {
      var text = el.getAttribute('data-' + lang);
      if (!text) return;
      if (text.indexOf('<br>') !== -1) {
        el.innerHTML = text;
      } else {
        el.textContent = text;
      }
    });
    renderLounas(lang);
    langBtns.forEach(function (btn) {
      var active = btn.dataset.lang === lang;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active);
    });
    try { localStorage.setItem('olivia-lang', lang); } catch (e) {}
  }

  function renderAllergens(allergens) {
    if (!allergens || !allergens.length) return '';
    return '<span class="allergens">' +
      allergens.map(function (a) { return '<span class="tag">' + a + '</span>'; }).join('') +
      '</span>';
  }

  function renderLounas(lang) {
    var data = window.LOUNAS_DATA;
    if (!data) return;

    var weekLabel = document.getElementById('lounas-week');
    var dateRange = document.getElementById('lounas-dates');
    var grid = document.getElementById('lounas-grid');
    var pricing = document.getElementById('lounas-pricing');

    if (weekLabel) {
      weekLabel.textContent = lang === 'en' ? 'Week ' + data.week : 'Viikko ' + data.week;
    }
    if (dateRange) {
      dateRange.textContent = resolveText(data.dateRange, lang);
    }

    if (grid && data.days) {
      grid.innerHTML = data.days.map(function (day) {
        var dishes = (day.dishes || []).map(function (dish) {
          return '<li><span class="dish-name">' + resolveText(dish.name, lang) + '</span> ' +
            renderAllergens(dish.allergens) + '</li>';
        }).join('');

        return '<article class="day-card">' +
          '<header class="day-header">' +
          '<span class="day-abbr">' + day.abbr + '</span>' +
          '<span class="day-name">' + resolveText(day.name, lang) + '</span>' +
          '</header>' +
          '<ul class="dish-list">' + dishes + '</ul>' +
          '</article>';
      }).join('');
    }

    if (pricing && data.pricing) {
      pricing.innerHTML = data.pricing.map(function (item) {
        return '<div class="price-card">' +
          '<span class="price-amount">' + item.amount + '</span>' +
          '<p class="price-desc">' + resolveText(item.desc, lang) + '</p>' +
          '</div>';
      }).join('');
    }
  }

  langBtns.forEach(function (btn) {
    btn.addEventListener('click', function () { setLang(btn.dataset.lang); });
  });

  // 支持 Google Sheets 异步加载数据的初始化函数
  async function initApp() {
    var saved;
    try { saved = localStorage.getItem('olivia-lang'); } catch (e) {}
    var targetLang = (saved === 'en') ? 'en' : 'fi';

    // 如果启用了 Google Sheets 异步获取，先等待数据加载完毕
    if (typeof window.loadLounasData === 'function') {
      await window.loadLounasData();
    }

    // 加载完成后渲染
    setLang(targetLang);
  }

  // 启动应用
  initApp();

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
