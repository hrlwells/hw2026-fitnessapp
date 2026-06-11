export const DRAWS = [
  { player: "Wells",     top: "Spain",       regular: "Canada",               low: "Iran" },
  { player: "Morro",     top: "Brazil",      regular: "Ecuador",              low: "Cape Verde" },
  { player: "Shaz",      top: "Mexico",      regular: "Ivory Coast",          low: "Jordan" },
  { player: "Pete",      top: "Belgium",     regular: "Türkiye",              low: "New Zealand" },
  { player: "Hugo",      top: "USA",         regular: "Egypt",                low: "Iraq" },
  { player: "Ed",        top: "Colombia",    regular: "Algeria",              low: "Qatar" },
  { player: "Dodd",      top: "Germany",     regular: "Croatia",              low: "Saudi Arabia" },
  { player: "Jacko",     top: "Japan",       regular: "Czechia",              low: "DR Congo" },
  { player: "Mitch",     top: "France",      regular: "Sweden",               low: "Curacao" },
  { player: "Planchich", top: "England",     regular: "South Korea",          low: "South Africa" },
  { player: "Fred",      top: "Norway",      regular: "Austria",              low: "Haiti" },
  { player: "Steve",     top: "Netherlands", regular: "Senegal",              low: "Uzbekistan" },
  { player: "Liam",      top: "Argentina",   regular: "Uruguay",              low: "Scotland" },
  { player: "TLaw",      top: "Morocco",     regular: "Paraguay",             low: "Tunisia" },
  { player: "Andy Lee",  top: "Portugal",    regular: "Bosnia & Herzegovina", low: "Panama" },
  { player: "Pooley",    top: "Switzerland", regular: "Ghana",                low: "Australia" },
];

export const ALL_TEAMS = [...new Set(DRAWS.flatMap(d => [d.top, d.regular, d.low]))];

export const ROUNDS = [
  "Group Stage",
  "Round of 32",
  "Round of 16",
  "Quarter-final",
  "Semi-final",
  "Runner-up",
  "Champion",
];

export const ROUND_SCORE = Object.fromEntries(ROUNDS.map((r, i) => [r, i]));

export const FLAGS = {
  "Spain":"🇪🇸","Canada":"🇨🇦","Iran":"🇮🇷","Brazil":"🇧🇷","Ecuador":"🇪🇨","Cape Verde":"🇨🇻",
  "Mexico":"🇲🇽","Ivory Coast":"🇨🇮","Jordan":"🇯🇴","Belgium":"🇧🇪","Türkiye":"🇹🇷","New Zealand":"🇳🇿",
  "USA":"🇺🇸","Egypt":"🇪🇬","Iraq":"🇮🇶","Colombia":"🇨🇴","Algeria":"🇩🇿","Qatar":"🇶🇦",
  "Germany":"🇩🇪","Croatia":"🇭🇷","Saudi Arabia":"🇸🇦","Japan":"🇯🇵","Czechia":"🇨🇿","DR Congo":"🇨🇩",
  "France":"🇫🇷","Sweden":"🇸🇪","Curacao":"🇨🇼","England":"🏴󠁧󠁢󠁥󠁮󠁧󠁿","South Korea":"🇰🇷","South Africa":"🇿🇦",
  "Norway":"🇳🇴","Austria":"🇦🇹","Haiti":"🇭🇹","Netherlands":"🇳🇱","Senegal":"🇸🇳","Uzbekistan":"🇺🇿",
  "Argentina":"🇦🇷","Uruguay":"🇺🇾","Scotland":"🏴󠁧󠁢󠁳󠁣󠁴󠁿","Morocco":"🇲🇦","Paraguay":"🇵🇾","Tunisia":"🇹🇳",
  "Portugal":"🇵🇹","Bosnia & Herzegovina":"🇧🇦","Panama":"🇵🇦","Switzerland":"🇨🇭","Ghana":"🇬🇭","Australia":"🇦🇺",
};
