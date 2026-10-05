/**
 * LOUNASLISTA — Viikoittainen päivitys
 * -------------------------------------
 * Päivitä vain tämä tiedosto joka viikko:
 *   1. week + dateRange (fi/en)
 *   2. days → dishes (name + allergens: "L", "G", "VL", "M")
 *   3. pricing (valinnainen)
 */
window.LOUNAS_DATA = {
  week: 41,
  dateRange: {
    fi: "5.10 –9.10.2026 · Ma–Pe klo 10–15.30",
    en: "Oct 5 – Oct 9, 2026 · Mon–Fri 10–15.30"
  },
  days: [
    {
      abbr: "Ma",
      name: { fi: "Maanantai", en: "Monday" },
      dishes: [
        { name: "Paneroitua kan sriracha-majoneese dippillä", allergens: ["L"] },
        { name: "Possu Sinappikastikkeessa", allergens: ["L", "G"] },
        { name: "Pepperoni pasta", allergens: ["L"] },
        { name: "Korealainen rapea kana", allergens: ["L"] },
        { name: { fi: "Pizza Slice (vaihtelevilla täytteillä)", en: "Pizza slice (rotating toppings)" }, allergens: [] }
      ]
    },
    {
      abbr: "Ti",
      name: { fi: "Tiistai", en: "Tuesday" },
      dishes: [
        { name: "Beef stroganoff smetana", allergens: ["L", "G"] },
        { name: "Broileri cheddarjuustokastikkeessa", allergens: ["L", "G"] },
        { name: "Pekoni herkkusieni pasta", allergens: ["L"] },
        { name: "Kebab + tomaattikastike", allergens: ["L", "G"] },
        { name: { fi: "Pizza Slice (vaihtelevilla täytteillä)", en: "Pizza slice (rotating toppings)" }, allergens: [] }
      ]
    },
    {
      abbr: "Ke",
      name: { fi: "Keskiviikko", en: "Wednesday" },
      dishes: [
        { name: "Thai kookos kana", allergens: ["L", "G"] },
        { name: "Porsaanleike jalapeno-valkosipuli majoneese", allergens: ["L"] },
        { name: "Paistetua kasvis nuudelit", allergens: ["L"] },
        { name: "Korealainen rapea kana", allergens: ["L"] },
        { name: { fi: "Pizza Slice (vaihtelevilla täytteillä)", en: "Pizza slice (rotating toppings)" }, allergens: [] }
      ]
    },
    {
      abbr: "To",
      name: { fi: "Torstai", en: "Thursday" },
      dishes: [
        { name: "Kalaleike tomaatti-mozzarellatäytteellä", allergens: ["L"] },
        { name: "Broileri pippurikastikkeessa", allergens: ["L", "G"] },
        { name: "Makaroni laatikko", allergens: ["L"] },
        { name: "Kebab + tomaattikastike", allergens: ["L", "G"] },
        { name: { fi: "Pizza Slice (vaihtelevilla täytteillä)", en: "Pizza slice (rotating toppings)" }, allergens: [] }
      ]
    },
    {
      abbr: "Pe",
      name: { fi: "Perjantai", en: "Friday" },
      dishes: [
        { name: "Naudan mureke ruskeakastikkeessa", allergens: ["L"] },
        { name: "Kanaleike mangositrus-pippurimajoneesi", allergens: ["L"] },
        { name: "Pasta carbonara", allergens: ["L"] },
        { name: "Korealainen rapea kana", allergens: ["L"] },
        { name: { fi: "Pizza Slice (vaihtelevilla täytteillä)", en: "Pizza slice (rotating toppings)" }, allergens: [] }
      ]
    }
  ],
  pricing: [
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
  ]
};
