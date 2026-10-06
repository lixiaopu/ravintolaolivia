/**
 * LOUNASLISTA — Google Sheets 自动同步版
 */
(function() {
  // Google Sheets 发布的 CSV 链接
  const MENU_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQSnPZe3m8mAAQlMd2YdT18i7cQ83hSapXFtwBKX_WOTyvvh72OUQAXmHBSEu2aiRybQqLX0pdSAyeq/pub?gid=0&single=true&output=csv";
  const INFO_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQSnPZe3m8mAAQlMd2YdT18i7cQ83hSapXFtwBKX_WOTyvvh72OUQAXmHBSEu2aiRybQqLX0pdSAyeq/pub?gid=1158728934&single=true&output=csv";

  // 基础常驻价格数据
  const PRICING_DATA = [
    {
      amount: "13,50 €",
      desc: {
        fi: "Lounas (sis. lämpimät ruoat, juomat, leivät, salaattipöytä, kahvi, pikkuleipä ja jäätelö)",
        en: "Lunch (incl. hot dishes, drinks, bread, salad bar, coffee, pastry and ice cream)"
      }
    },
    {
      amount: "12,50 €",
      desc: { fi: "Eläkelaisalennus", en: "Senior discount" }
    },
    {
      amount: "12,50 €",
      desc: {
        fi: "Keitto-salaattibuffet (sis. pizza buffet, keitto, salaattipöytä, kahvi, pikkuleipä ja jäätelö)",
        en: "Soup & salad buffet (incl. pizza buffet, soup, salad bar, coffee, pastry and ice cream)"
      }
    },
    {
      amount: "6 €",
      desc: {
        fi: "Lasten lounas 4–10 v. Alle 4 v. veloituksetta",
        en: "Children's lunch ages 4–10. Under 4 free"
      }
    }
  ];

  const DAY_NAMES = {
    Ma: { fi: "Maanantai", en: "Monday" },
    Ti: { fi: "Tiistai", en: "Tuesday" },
    Ke: { fi: "Keskiviikko", en: "Wednesday" },
    To: { fi: "Torstai", en: "Thursday" },
    Pe: { fi: "Perjantai", en: "Friday" }
  };

  // CSV 解析器
  function parseCSV(text) {
    const lines = text.trim().split('\n');
    return lines.map(line => {
      const result = [];
      let cur = '', inQuotes = false;
      for (let c of line) {
        if (c === '"') { inQuotes = !inQuotes; }
        else if (c === ',' && !inQuotes) { result.push(cur.trim()); cur = ''; }
        else { cur += c; }
      }
      result.push(cur.trim());
      return result;
    });
  }

  // 初始化默认全局数据结构
  window.LOUNAS_DATA = { week: "", dateRange: { fi: "", en: "" }, days: [], pricing: PRICING_DATA };

  // 异步读取 Google Sheets 数据
  window.loadLounasData = async function() {
    try {
      const [menuRes, infoRes] = await Promise.all([
        fetch(MENU_CSV_URL).then(r => r.text()),
        fetch(INFO_CSV_URL).then(r => r.text())
      ]);

      const menuRows = parseCSV(menuRes).slice(1); // 忽略表头
      const infoRows = parseCSV(infoRes).slice(1);

      // 解析 Info 页签
      let weekVal = 41;
      let dateRangeVal = { fi: "", en: "" };
      infoRows.forEach(row => {
        if (row[0] === 'week') weekVal = parseInt(row[1]) || weekVal;
        if (row[0] === 'dateRange') dateRangeVal = { fi: row[1], en: row[2] || row[1] };
      });

      // 解析 Menu 页签
      const daysMap = { Ma: [], Ti: [], Ke: [], To: [], Pe: [] };
      menuRows.forEach(row => {
        const day = row[0];
        const nameFi = row[1];
        const nameEn = row[2];
        const allergensStr = row[3] || "";
        const allergens = allergensStr ? allergensStr.split(',').map(a => a.trim()).filter(Boolean) : [];

        if (daysMap[day]) {
          let dishObj = { allergens };
          if (nameEn) {
            dishObj.name = { fi: nameFi, en: nameEn };
          } else {
            dishObj.name = nameFi;
          }
          daysMap[day].push(dishObj);
        }
      });

      const daysArray = Object.keys(daysMap).map(abbr => ({
        abbr: abbr,
        name: DAY_NAMES[abbr] || { fi: abbr, en: abbr },
        dishes: daysMap[abbr]
      }));

      window.LOUNAS_DATA = {
        week: weekVal,
        dateRange: dateRangeVal,
        days: daysArray,
        pricing: PRICING_DATA
      };

      return window.LOUNAS_DATA;
    } catch (err) {
      console.error("Failed to load lunch data from Google Sheets:", err);
      return window.LOUNAS_DATA;
    }
  };
})();
