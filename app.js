// CRACKPOT 도감: 주소(#/weapons, #/weapons/pistol …)로 페이지를 바꾸는 정적 사이트.
// 데이터는 data/codex.js (tools/site/export_site.gd 가 게임에서 뽑는다). 글은 {ko, en} 쌍.
"use strict";

const STEAM_URL = ""; // Steam 상점 주소가 생기면 넣는다 (비어 있으면 "곧 출시" 표시)

const D = window.CODEX;
const W = Object.fromEntries(D.weapons.map(w => [w.id, w]));
const I = Object.fromEntries(D.items.map(i => [i.id, i]));
const TAG = Object.fromEntries(D.tags.map(t => [t.id, t]));
const HERO = Object.fromEntries(D.heroes.map(h => [h.id, h]));
const ENEMY = Object.fromEntries(D.enemies.map(e => [e.id, e]));
const LEGEND = 4; // 전설 등급 (스포일러)

const UI = {
  ko: {
    codex: "도감", home: "홈", heroes: "캐릭터", weapons: "무기", items: "아이템", synergies: "시너지", tags: "태그 세트",
    enemies: "몬스터", bosses: "보스", world: "세계", npcs: "이벤트·NPC",
    t_npcs: "상점, 도박꾼, 대장장이와 특별한 방들", npcsSub: "층을 돌다 보면 만나는 사람들과 특별한 방. 특별한 방은 층마다 0~2개, 판마다 다르게 나와요.",
    npcTitle: "만나는 사람들", roomTitle: "NPC 없는 특별한 방", where: "나오는 곳",
    floorFeatures: "이 층의 특징", floorMobs: "사는 몬스터", floorBosses: "층의 주인", floorLegend: "무피격 보상 전설 총", common: "어느 층에서든",
    open: "펼쳐 보기",
    spoilOn: "스포일러 보는 중", spoilOff: "스포일러 가림", spoilTap: "눌러서 보기",
    lead: "버려진 봉인 시설 5층부터 맨 아래까지. 항아리를 깨고, 고물 총을 줍고, 장비를 엮어 나만의 조합을 만드는 탑다운 로그라이크 슈터.",
    wishlist: "Steam 에서 찜하기", soon: "COMING SOON TO STEAM", browse: "도감 둘러보기",
    explore: "무엇을 찾고 있나요?", exploreSub: "게임에 나오는 모든 것을 정리했어요. 항목을 누르면 자세한 내용과 함께 쓰면 좋은 짝이 나와요.",
    floorsTitle: "내려갈 다섯 층", floorsSub: "위층에서 시작해 봉인의 심장까지 내려가요. 층을 누르면 그 층의 특징이 펼쳐져요.",
    t_heroes: "저마다 다른 능력과 시작 무기", t_weapons: "총·던지기·설치·휘두르기까지", t_items: "주우면 바로 붙는 패시브 효과",
    t_synergies: "둘을 함께 가지면 켜지는 효과", t_tags: "같은 태그를 모으면 3·4·5단계", t_enemies: "층마다 다른 주민들", t_bosses: "층의 주인, 별이 붙으면 더 세다",
    search: "이름이나 효과로 찾기", allTiers: "모든 등급", none: "조건에 맞는 것이 없어요. 검색어나 태그를 줄여 보세요.",
    count: n => `${n}개`, syn: n => `시너지 ${n}`, noTags: "태그 없음",
    weapon: "무기", item: "아이템", hero: "캐릭터", close: "닫기", copy: "링크 복사", copied: "복사했어요",
    damage: "피해", interval: "발사 간격", mode: "방식", pellets: "발 수", magazine: "탄창", reload: "재장전", pierce: "관통", bounces: "튕김",
    homing: "유도", explode: "폭발", starter: "시작 무기", stackable: "여러 개 가질 수 있음", sec: "초",
    synOf: n => `함께 쓰면 좋은 짝 ${n}`, noSyn: "이 장비가 들어가는 짝 시너지는 없어요.", tagSet: "태그 세트",
    g_wi: ["무기 + 아이템", "그 무기를 쓸 때만 효과가 붙어요. 무기의 태그로 묶었어요."],
    g_ii: ["아이템 + 아이템", "들고 있는 모든 무기에 효과가 붙어요."],
    g_ww: ["무기 + 무기", "두 무기를 함께 들고 있으면 켜져요."],
    g_upgrade: ["설치물 업그레이드", "짝 아이템 하나면 2단, 둘 다면 3단. 놓는 순간 정해져요."],
    g_hero: ["캐릭터 전용", "그 캐릭터로 플레이할 때만 켜져요."],
    noTagWeapon: "태그 없는 무기",
    need: n => `${n}개`, power: "특수 능력", members: (w, i) => `무기 ${w} · 아이템 ${i}`,
    health: "체력", active: "액티브", passive: "패시브", cooldown: "재사용", startWeapon: "시작 무기", unlock: "해금",
    hp: n => `HP ${n}`, ownerOf: "층의 주인", talismans: "부적", talismansSub: "봉인 제단 층 곳곳에 붙어 있는 부적. 주워 던지면 그 자리에서 효과가 터져요.",
    worldSub: "오래전 강력한 존재와 위험한 병기를 봉인하려고 만든 5층짜리 시설.",
    heroesSub: "처음엔 회수자 한 명. 나머지는 게임 안에서 조건을 채우면 함께해요.",
    weaponsSub: "항아리와 상점에서 나오는 무기. 등급이 높을수록 드물어요.",
    itemsSub: "주우면 바로 효과가 붙는 패시브 아이템.",
    synSub: "특정 무기·아이템 둘을 함께 가지면 켜지는 숨은 효과.",
    tagsSub: "같은 태그 장비를 3개, 4개, 5개 모으면 단계마다 효과가 커지고, 5개면 특수 능력이 생겨요.",
    enemiesSub: "층마다 사는 몬스터. 마우스를 올리면 움직여요.", bossesSub: "층마다 세 명 중 하나가 기다려요. 별 1개부터 3개까지, 별이 많을수록 세요.",
    foot: "개발자가 직접 만드는 공식 도감", foot2: "게임 데이터에서 자동으로 만들어요",
    secretFloor: "???", mode_: { shot: "총", lob: "던지기", charge: "모아 쏘기", place: "설치", swing: "휘두르기", cone: "부채꼴", ring: "음파", beam: "줄기", vacuum: "빨아들이기" },
  },
  en: {
    codex: "Codex", home: "Home", heroes: "Characters", weapons: "Weapons", items: "Items", synergies: "Synergies", tags: "Tag Sets",
    enemies: "Monsters", bosses: "Bosses", world: "World", npcs: "Events & NPCs",
    t_npcs: "Shops, gamblers, blacksmiths and special rooms", npcsSub: "The people you meet and the special rooms you stumble into. Zero to two special rooms per floor, different every run.",
    npcTitle: "Who you'll meet", roomTitle: "Special rooms without an NPC", where: "Found in",
    floorFeatures: "What's different here", floorMobs: "Monsters", floorBosses: "Floor masters", floorLegend: "No-hit legendary gun", common: "On every floor",
    open: "Expand",
    spoilOn: "Spoilers shown", spoilOff: "Spoilers hidden", spoilTap: "Tap to reveal",
    lead: "From Floor 5 of an abandoned sealing facility down to its heart. Smash pots, grab junk guns, and wire your gear into combos of your own in this top-down roguelike shooter.",
    wishlist: "Wishlist on Steam", soon: "COMING SOON TO STEAM", browse: "Browse the codex",
    explore: "What are you looking for?", exploreSub: "Everything in the game, in one place. Open an entry to see the details and what pairs well with it.",
    floorsTitle: "Five floors down", floorsSub: "Start at the top and descend to the Heart of the Seal. Open a floor to see what makes it different.",
    t_heroes: "Each with their own ability and starting gun", t_weapons: "Guns, throwables, placeables and melee", t_items: "Passive effects the moment you pick them up",
    t_synergies: "Hidden effects when you own both", t_tags: "Collect a tag for tiers 3, 4 and 5", t_enemies: "Locals of every floor", t_bosses: "Floor masters; stars make them stronger",
    search: "Search by name or effect", allTiers: "All rarities", none: "Nothing matches. Try a shorter search or fewer tags.",
    count: n => `${n}`, syn: n => `${n} synergies`, noTags: "No tags",
    weapon: "Weapon", item: "Item", hero: "Character", close: "Close", copy: "Copy link", copied: "Copied",
    damage: "Damage", interval: "Fire interval", mode: "Type", pellets: "Pellets", magazine: "Magazine", reload: "Reload", pierce: "Pierce", bounces: "Bounces",
    homing: "Homing", explode: "Explosive", starter: "Starting weapon", stackable: "Stackable", sec: "s",
    synOf: n => `Pairs well with (${n})`, noSyn: "This one isn't part of any pair synergy.", tagSet: "Tag sets",
    g_wi: ["Weapon + Item", "Only applies while using that weapon. Grouped by the weapon's tag."],
    g_ii: ["Item + Item", "Applies to every weapon you carry."],
    g_ww: ["Weapon + Weapon", "Turns on when you carry both weapons."],
    g_upgrade: ["Placeable upgrades", "One partner item for Mk 2, both for Mk 3. Locked in when placed."],
    g_hero: ["Character only", "Only while playing that character."],
    noTagWeapon: "Untagged weapons",
    need: n => `${n} pieces`, power: "Special ability", members: (w, i) => `${w} weapons · ${i} items`,
    health: "Health", active: "Active", passive: "Passive", cooldown: "Cooldown", startWeapon: "Starting weapon", unlock: "Unlock",
    hp: n => `HP ${n}`, ownerOf: "Master of", talismans: "Talismans", talismansSub: "Talismans stuck around the Seal Altar floor. Pick one up and throw it to unleash it.",
    worldSub: "A five-floor facility built long ago to seal away mighty beings and dangerous weapons.",
    heroesSub: "You start with the Salvager. The others join once you meet their conditions in game.",
    weaponsSub: "Weapons from pots and shops. Higher rarities are rarer.",
    itemsSub: "Passive items that kick in as soon as you pick them up.",
    synSub: "Hidden effects that switch on when you own a specific pair.",
    tagsSub: "Collect 3, 4 and 5 pieces of one tag to power it up; at 5 you gain a special ability.",
    enemiesSub: "Monsters of each floor. Hover to see them move.", bossesSub: "One of three waits on each floor, rated one to three stars. More stars, more trouble.",
    foot: "Official codex made by the developer", foot2: "Generated from the game's own data",
    secretFloor: "???", mode_: { shot: "Gun", lob: "Throw", charge: "Charge", place: "Placeable", swing: "Melee", cone: "Cone", ring: "Sonic", beam: "Beam", vacuum: "Vacuum" },
  },
};

const store = {
  get(k, d) { try { const v = localStorage.getItem("crackpot." + k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem("crackpot." + k, JSON.stringify(v)); } catch { /* 저장 못 해도 화면은 그대로 */ } },
};
const state = {
  lang: store.get("lang", (navigator.language || "ko").startsWith("ko") ? "ko" : "en"),
  spoil: store.get("spoil", false),
  revealed: new Set(),
  openFloors: new Set(),
  q: "", tier: "", tags: new Set(),
};
const L = () => UI[state.lang];
const tx = v => v == null ? "" : typeof v === "string" ? v : (v[state.lang] || v.ko);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const num = v => Math.round(v * 100) / 100;
const tierColor = t => (D.tiers[t] || {}).color || "#ccc";
const sortKey = x => tx(x.name);
const byTier = (a, b) => a.tier - b.tier || sortKey(a).localeCompare(sortKey(b), state.lang);

const PAGES = ["heroes", "weapons", "items", "synergies", "tags", "enemies", "bosses", "npcs", "world"];
const COUNTS = { npcs: D.npcs.length + D.rooms.length, heroes: D.heroes.length, weapons: D.weapons.length, items: D.items.length, synergies: D.synergies.length, enemies: D.enemies.length, bosses: D.bosses.length };

// ---------------------------------------------------------------- 공통 조각

function isHidden(key, secret) { return secret && !state.spoil && !state.revealed.has(key); }
function gearHidden(x, kind) { return isHidden(kind + ":" + x.id, x.tier >= LEGEND); }

function tagChip(id, button) {
  const t = TAG[id]; if (!t) return "";
  const img = t.icon ? `<img class="px" src="${t.icon}" alt="">` : "";
  if (!button) return `<span class="chip" style="--c:${t.color}">${img}${esc(tx(t.name))}</span>`;
  return `<button type="button" class="chip" style="--c:${t.color}" data-tag="${id}" aria-pressed="${state.tags.has(id)}">${img}${esc(tx(t.name))}</button>`;
}

function piece(id) {
  if (id.startsWith("hero:")) {
    const h = HERO[id.slice(5)];
    return { kind: L().hero, name: h ? tx(h.name) : id, icon: h && h.icon, tier: null, href: "#/heroes" };
  }
  if (W[id]) return { kind: L().weapon, name: tx(W[id].name), icon: W[id].icon, tier: W[id].tier, href: `#/weapons/${id}`, hidden: gearHidden(W[id], "w") };
  if (I[id]) return { kind: L().item, name: tx(I[id].name), icon: I[id].icon, tier: I[id].tier, href: `#/items/${id}`, hidden: gearHidden(I[id], "i") };
  return { kind: "?", name: id, icon: null, tier: null, href: null };
}
function pieceHTML(id) {
  const p = piece(id);
  const style = p.tier == null ? "" : ` style="--tier:${tierColor(p.tier)}"`;
  const img = p.icon ? `<img class="px" src="${p.icon}" alt=""${p.hidden ? ' style="filter:brightness(0) drop-shadow(0 0 1px #8a7f98)"' : ""}>` : `<span class="blank"></span>`;
  const name = p.hidden ? "???" : esc(p.name);
  const tag = p.href ? "a" : "span";
  return `<${tag} class="piece"${p.href ? ` href="${p.href}"` : ""}${style}>${img}${name}<span class="kind">${p.kind}</span></${tag}>`;
}
function synHTML(s) {
  return `<div class="syn"><div class="pair">${pieceHTML(s.a)}<span class="plus">+</span>${pieceHTML(s.b)}</div>
    <div><b>${esc(tx(s.name))}</b><span class="d">${esc(tx(s.description))}</span></div></div>`;
}
const synsOf = id => D.synergies.filter(s => s.a === id || s.b === id);

function weaponMeta(w) {
  const u = L();
  const bits = [`${u.damage} ${num(w.damage)}`, `${num(w.interval)}${u.sec}`, u.mode_[w.mode] || w.mode];
  if (w.pellets > 1) bits.push(`×${w.pellets}`);
  if (w.starter) bits.push(u.starter);
  return bits.join(" · ");
}

function pageHead(key, sub) {
  return `<div class="wrap page-head"><div class="eyebrow">CRACKPOT · ${esc(L().codex)}</div><h1>${esc(L()[key])}</h1><p>${esc(sub)}</p></div>`;
}

function filtersHTML(withTier) {
  const u = L();
  const tiers = withTier ? `<select class="sel" id="tier" aria-label="${esc(u.allTiers)}"><option value="">${esc(u.allTiers)}</option>${D.tiers.map((t, i) => `<option value="${i}"${state.tier === String(i) ? " selected" : ""}>${esc(tx(t.name))}</option>`).join("")}</select>` : "";
  return `<div class="filters"><div class="wrap" style="display:grid;gap:10px">
    <div class="frow"><input class="search" id="q" type="search" placeholder="${esc(u.search)}" aria-label="${esc(u.search)}" value="${esc(state.q)}">${tiers}<span class="count" id="shown"></span></div>
    <div class="chips">${D.tags.map(t => tagChip(t.id, true)).join("")}</div></div></div>`;
}

function hay(x) {
  return [tx(x.name), tx(x.description), x.name.ko, x.name.en, x.id, ...x.tags.map(t => tx(TAG[t] && TAG[t].name))].join(" ").toLowerCase();
}
function matches(x, hidden) {
  if (state.tier !== "" && String(x.tier) !== state.tier) return false;
  for (const t of state.tags) if (!x.tags.includes(t)) return false;
  if (state.q && (hidden || !hay(x).includes(state.q))) return false;
  return true;
}

// ---------------------------------------------------------------- 페이지

function home() {
  const u = L();
  const pick = (list, n) => list.filter(x => x.tier < LEGEND).slice(0, 400).sort((a, b) => b.tier - a.tier).slice(0, n);
  const tileIcons = {
    heroes: D.heroes.slice(0, 3).map(h => h.icon), weapons: pick(D.weapons, 3).map(w => w.icon), items: pick(D.items, 3).map(i => i.icon),
    synergies: [], tags: D.tags.slice(0, 3).map(t => t.icon), enemies: D.enemies.filter(e => !e.secret).slice(9, 12).map(e => e.icon), bosses: [D.bosses[0].icon],
    npcs: D.npcs.filter(n => !n.secret).slice(0, 3).map(n => n.icon),
  };
  const tiles = ["heroes", "weapons", "items", "synergies", "tags", "enemies", "bosses", "npcs"].map(k => `
    <a class="tile" href="#/${k}"><span class="icons">${(tileIcons[k] || []).map(s => `<img class="px" src="${s}" alt="">`).join("")}</span>
      <h3>${esc(u[k])}</h3><span class="n">${k === "tags" ? D.tags.length : COUNTS[k]}</span><p>${esc(u["t_" + k])}</p></a>`).join("");
  const steam = STEAM_URL
    ? `<a class="btn main" href="${STEAM_URL}" target="_blank" rel="noopener">${esc(u.wishlist)}</a>`
    : `<span class="btn main" aria-disabled="true">${esc(u.wishlist)}</span>`;
  const strip = ["weapons", "items", "synergies", "heroes", "enemies", "bosses"].map(k => `<a href="#/${k}"><b>${COUNTS[k]}</b><span>${esc(u[k])}</span></a>`).join("");
  return `
  <section class="hero">
    <video class="hero-bg" autoplay muted loop playsinline preload="auto" poster="img/ui/title_bg.png" aria-hidden="true" tabindex="-1">
      <source src="media/title_bg.webm" type="video/webm"><source src="media/title_bg.mp4" type="video/mp4"></video>
    <div class="hero-in">
      <div class="hero-logo"><img src="img/ui/logo.png" alt="CRACKPOT" width="930" height="200"></div>
      <p class="lead">${esc(u.lead)}</p>
      <div class="cta">${steam}<a class="btn" href="#/weapons">${esc(u.browse)}</a></div>
      ${STEAM_URL ? "" : `<span class="soon">${esc(u.soon)}</span>`}
    </div>
  </section>
  <div class="wrap"><nav class="stats-strip" aria-label="${esc(u.codex)}">${strip}</nav></div>
  <section class="section"><div class="wrap"><h2>${esc(u.explore)}</h2><p class="sub">${esc(u.exploreSub)}</p><div class="tiles">${tiles}</div></div></section>
  <section class="section"><div class="wrap"><h2>${esc(u.floorsTitle)}</h2><p class="sub">${esc(u.floorsSub)}</p>${floorList()}</div></section>`;
}

function floorList() {
  const u = L();
  const floors = D.floors.map(f => {
    const hidden = isHidden("floor:" + f.number, f.secret);
    const bosses = D.bosses.filter(b => b.floor === f.number);
    const open = state.openFloors.has(f.number) && !hidden;
    const thumbs = bosses.filter(b => b.stars === 1).map(b => `<img class="px" src="${b.icon}" alt="">`).join("");
    const head = `<summary${hidden ? ` data-reveal="floor:${f.number}"` : ""}>
        <span class="code">${hidden ? "??" : f.code}</span>
        <div><h3>${hidden ? esc(u.secretFloor) : esc(tx(f.name))}</h3><p>${hidden ? esc(u.spoilTap) : esc(tx(f.description))}</p></div>
        <div class="boss-row">${hidden ? "" : thumbs}</div><span class="chev" aria-hidden="true"></span></summary>`;
    if (hidden) return `<details class="floor" data-floor="${f.number}">${head}</details>`;
    const feats = (f.features || []).map(x => { const [t, d] = x[state.lang] || x.ko; return `<li><b>${esc(t)}</b><span>${esc(d)}</span></li>`; }).join("");
    const mobs = f.enemies.map(id => ENEMY[id]).filter(Boolean).map(e => {
      const hid = !f.secret && isHidden("e:" + e.id, e.secret);  // 숨은 층을 펼쳤으면 그 층 몬스터도 보여 준다
      return `<a class="mini" href="#/enemies"><img class="px" src="${e.icon}" alt=""${hid ? ' style="filter:brightness(0) drop-shadow(0 0 1px #8a7f98)"' : ""}><span>${hid ? "???" : esc(tx(e.name))}</span></a>`;
    }).join("");
    const masters = bosses.map(b => `<a class="mini" href="#/bosses"><img class="px" src="${b.icon}" alt=""><span>${esc(tx(b.name))}<i>${"★".repeat(b.stars)}</i></span></a>`).join("");
    const legend = f.legend && W[f.legend] ? `<div class="fsec"><h4>${esc(u.floorLegend)}</h4><div class="members">${pieceHTML(f.legend)}</div></div>` : "";
    return `<details class="floor" data-floor="${f.number}"${open ? " open" : ""}>${head}
      <div class="floor-body">
        ${feats ? `<div class="fsec"><h4>${esc(u.floorFeatures)}</h4><ul class="feats">${feats}</ul></div>` : ""}
        ${mobs ? `<div class="fsec"><h4>${esc(u.floorMobs)}</h4><div class="minis">${mobs}</div></div>` : ""}
        ${masters ? `<div class="fsec"><h4>${esc(u.floorBosses)}</h4><div class="minis">${masters}</div></div>` : ""}
        ${legend}
      </div></details>`;
  }).join("");
  const common = (D.common || []).map(x => { const [t, d] = x[state.lang] || x.ko; return `<li><b>${esc(t)}</b><span>${esc(d)}</span></li>`; }).join("");
  return `<div class="floors">${floors}</div>
    ${common ? `<div class="common"><h4>${esc(u.common)}</h4><ul class="feats">${common}</ul></div>` : ""}`;
}

function gearPage(kind) {
  const isW = kind === "weapons";
  const list = (isW ? D.weapons : D.items).slice().sort(byTier);
  const u = L();
  const shown = list.filter(x => matches(x, gearHidden(x, isW ? "w" : "i")));
  const cards = shown.map(x => {
    const key = (isW ? "w:" : "i:") + x.id;
    const hidden = gearHidden(x, isW ? "w" : "i");
    const n = synsOf(x.id).length;
    return `<a class="card${hidden ? " spoiler" : ""}" href="#/${kind}/${x.id}" style="--tier:${tierColor(x.tier)}"${hidden ? ` data-reveal="${key}" data-spoil="${esc(u.spoilTap)}"` : ""}>
      ${n && !hidden ? `<span class="badge">${esc(u.syn(n))}</span>` : ""}
      <span class="ic"><img class="px" src="${x.icon}" alt="" loading="lazy"></span>
      <h3>${hidden ? "???" : esc(tx(x.name))}</h3>
      <span class="tier">${esc(tx(D.tiers[x.tier].name))}</span>
      <span class="chips">${x.tags.map(t => tagChip(t, false)).join("") || `<span class="count">${esc(u.noTags)}</span>`}</span>
      <span class="desc">${hidden ? "????????????????" : esc(tx(x.description))}</span>
      ${isW ? `<span class="meta">${hidden ? "???" : esc(weaponMeta(x))}</span>` : ""}
    </a>`;
  }).join("");
  return pageHead(kind, isW ? u.weaponsSub : u.itemsSub) + filtersHTML(true)
    + `<div class="wrap">${shown.length ? `<div class="grid">${cards}</div>` : `<p class="empty">${esc(u.none)}</p>`}</div>`;
}

function synKind(s) {
  const k = id => id.startsWith("hero:") ? "h" : W[id] ? "w" : "i";
  const a = k(s.a), b = k(s.b);
  if (a === "h" || b === "h") return "hero";
  if (/^(tesla|turret)_mk/.test(s.id)) return "upgrade";
  if (a === "w" && b === "w") return "ww";
  if (a === "i" && b === "i") return "ii";
  return "wi";
}
function synMatches(s) {
  const ids = [s.a, s.b].filter(id => !id.startsWith("hero:"));
  const gear = ids.map(id => W[id] || I[id]).filter(Boolean);
  for (const t of state.tags) if (!gear.some(g => g.tags.includes(t))) return false;
  if (state.q) {
    const text = [tx(s.name), tx(s.description), ...[s.a, s.b].map(id => piece(id).name)].join(" ").toLowerCase();
    if (!text.includes(state.q)) return false;
  }
  return true;
}
function synergiesPage() {
  const u = L();
  let total = 0;
  const out = ["wi", "ii", "ww", "upgrade", "hero"].map(k => {
    const list = D.synergies.filter(s => synKind(s) === k && synMatches(s));
    total += list.length;
    if (!list.length) return "";
    const [title, note] = u["g_" + k];
    let body;
    if (k === "wi") {
      const groups = {};
      for (const s of list) {
        const w = W[s.a] || W[s.b];
        (groups[(w && w.tags[0]) || "none"] ||= []).push(s);
      }
      body = [...D.tags.map(t => t.id), "none"].filter(t => groups[t]).map(t =>
        `<div class="subhead">${t === "none" ? `<span class="chip" style="--c:var(--dim)">${esc(u.noTagWeapon)}</span>` : tagChip(t, false)}</div><div class="syns">${groups[t].map(synHTML).join("")}</div>`).join("");
    } else {
      body = `<div class="syns">${list.map(synHTML).join("")}</div>`;
    }
    return `<section class="group"><h2>${esc(title)} <span class="count">${list.length}</span></h2><p>${esc(note)}</p>${body}</section>`;
  }).join("");
  return pageHead("synergies", u.synSub) + filtersHTML(false) + `<div class="wrap">${total ? out : `<p class="empty">${esc(u.none)}</p>`}</div>`;
}

function tagsPage() {
  const u = L();
  const tags = state.tags.size ? D.tags.filter(t => state.tags.has(t.id)) : D.tags;
  const body = tags.map(t => {
    const sets = D.tag_sets.filter(s => s.tag === t.id).sort((a, b) => a.need - b.need);
    const ws = D.weapons.filter(w => w.tags.includes(t.id) && matches(w, gearHidden(w, "w"))).sort(byTier);
    const is = D.items.filter(i => i.tags.includes(t.id) && matches(i, gearHidden(i, "i"))).sort(byTier);
    return `<section class="tagsec" style="--c:${t.color}">
      <header>${t.icon ? `<img class="px" src="${t.icon}" alt="">` : ""}<h2>${esc(tx(t.name))}</h2><span class="count">${esc(u.members(ws.length, is.length))}</span></header>
      <div class="steps">${sets.map(s => `<div class="step${s.power ? " power" : ""}"><span class="n">${esc(u.need(s.need))}${s.power ? " · " + esc(u.power) : ""}</span><b>${esc(tx(s.name))}</b><span>${esc(tx(s.description).replace(/^\[[^\]]+\]\s*/, ""))}</span></div>`).join("")}</div>
      <div class="members">${[...ws, ...is].map(x => pieceHTML(x.id)).join("")}</div></section>`;
  }).join("");
  return pageHead("tags", u.tagsSub) + filtersHTML(true) + `<div class="wrap">${body}</div>`;
}

function heroesPage() {
  const u = L();
  const cards = D.heroes.map(h => {
    const w = W[h.start_weapon];
    return `<article class="hero-card"><div class="portrait"><img class="px" src="${h.icon}" alt=""></div>
      <div><h3>${esc(tx(h.name))}</h3><div class="title">${esc(tx(h.title))}</div>
        <div class="kv">
          <div><b>${esc(u.health)}</b> <span class="hearts" aria-label="${h.health}">${"<i></i>".repeat(h.health)}</span></div>
          <div><b>${esc(u.startWeapon)}</b> ${w ? `<a href="#/weapons/${w.id}">${esc(tx(w.name))}</a>` : esc(h.start_weapon)}</div>
          <div><b>${esc(u.active)} · ${esc(tx(h.active))}</b> <span class="count">${num(h.cooldown)}${u.sec}</span><br>${esc(tx(h.active_desc))}</div>
          <div><b>${esc(u.passive)}</b><br>${esc(tx(h.passive))}</div>
        </div>
        ${h.unlock ? `<div class="lock">🔒 ${esc(tx(h.unlock))}</div>` : ""}
      </div></article>`;
  }).join("");
  const synHero = D.synergies.filter(s => synKind(s) === "hero");
  return pageHead("heroes", u.heroesSub) + `<div class="wrap"><div class="heroes">${cards}</div>
    ${synHero.length ? `<section class="group" style="margin-top:34px"><h2>${esc(u.g_hero[0])}</h2><p>${esc(u.g_hero[1])}</p><div class="syns">${synHero.map(synHTML).join("")}</div></section>` : ""}</div>`;
}

function mobCard(e, key, secret, extra) {
  const hidden = isHidden(key, secret);
  const frames = (e.walk || []).length ? ` data-walk='${JSON.stringify([e.icon, ...e.walk])}'` : "";
  return `<article class="mob${hidden ? " spoiler" : ""}"${hidden ? ` data-reveal="${key}"` : ""}>
    <div class="stage"><img class="px" src="${e.icon}" alt=""${frames} loading="lazy"></div>
    ${extra || ""}<h3>${hidden ? "???" : esc(tx(e.name))}</h3>
    ${e.health ? `<span class="hp">${esc(L().hp(e.health))}</span>` : ""}
    ${e.description ? `<p>${hidden ? esc(L().spoilTap) : esc(tx(e.description))}</p>` : ""}</article>`;
}

function enemiesPage() {
  const u = L();
  return pageHead("enemies", u.enemiesSub) + `<div class="wrap"><div class="mobs">${D.enemies.map(e => mobCard(e, "e:" + e.id, e.secret)).join("")}</div></div>`;
}

function bossesPage() {
  const u = L();
  const body = D.floors.filter(f => f.number > 0).map(f => {
    const list = D.bosses.filter(b => b.floor === f.number);
    return `<section class="floor-block"><h2><span class="code">${f.code}</span>${esc(tx(f.name))}</h2><p>${esc(tx(f.description))}</p>
      <div class="mobs bosses">${list.map(b => mobCard(b, "b:" + b.id, false, `<span class="stars">${"★".repeat(b.stars)}</span>`)).join("")}</div></section>`;
  }).join("");
  return pageHead("bosses", u.bossesSub) + `<div class="wrap">${body}</div>`;
}

function npcsPage() {
  const u = L();
  const npcs = D.npcs.map(n => {
    const hidden = isHidden("n:" + n.id, n.secret);
    const frames = (n.walk || []).length ? ` data-walk='${JSON.stringify([n.icon, ...n.walk])}'` : "";
    return `<article class="npc${hidden ? " spoiler" : ""}"${hidden ? ` data-reveal="n:${n.id}"` : ""}>
      <div class="stage"><img class="px" src="${n.icon}" alt=""${frames}></div>
      <div><h3>${hidden ? "???" : esc(tx(n.name))}</h3><span class="where">${esc(u.where)} · ${hidden ? "???" : esc(tx(n.where))}</span>
        <p>${hidden ? esc(u.spoilTap) : esc(tx(n.description))}</p></div></article>`;
  }).join("");
  const rooms = D.rooms.map(r => `<div class="tali" style="--c:var(--seal)"><img class="px" src="${r.icon}" alt=""><div><b>${esc(tx(r.name))}</b><span>${esc(tx(r.description))}</span></div></div>`).join("");
  return pageHead("npcs", u.npcsSub) + `<div class="wrap">
    <section class="group"><h2>${esc(u.npcTitle)}</h2><div class="npcs">${npcs}</div></section>
    <section class="group"><h2>${esc(u.roomTitle)}</h2><div class="talis">${rooms}</div></section></div>`;
}

function worldPage() {
  const u = L();
  return pageHead("world", u.worldSub) + `<div class="wrap">${floorList()}
    <section class="group" style="margin-top:40px"><h2>${esc(u.talismans)}</h2><p>${esc(u.talismansSub)}</p>
      <div class="talis">${D.talismans.map(t => `<div class="tali" style="--c:${t.color}"><img class="px" src="${t.icon}" alt=""><div><b>${esc(tx(t.name))}</b><span>${esc(tx(t.description))}</span></div></div>`).join("")}</div></section></div>`;
}

// ---------------------------------------------------------------- 자세히 보기 (#/weapons/<id>)

function detail(kind, id) {
  const isW = kind === "weapons";
  const x = (isW ? W : I)[id];
  if (!x) return false;
  const u = L();
  const key = (isW ? "w:" : "i:") + id;
  state.revealed.add(key); // 주소로 직접 들어왔으면 보여 준다
  const syns = synsOf(id);
  const sets = x.tags.map(t => D.tag_sets.filter(s => s.tag === t).sort((a, b) => a.need - b.need)[0]).filter(Boolean);
  const stat = (k, v) => `<div><small>${esc(u[k])}</small><b>${esc(v)}</b></div>`;
  let stats = "";
  if (isW) {
    stats = [stat("damage", num(x.damage)), stat("interval", num(x.interval) + u.sec), stat("mode", u.mode_[x.mode] || x.mode)];
    if (x.pellets > 1) stats.push(stat("pellets", x.pellets));
    if (x.magazine > 0 && x.mode !== "place") stats.push(stat("magazine", x.magazine));
    if (x.reload > 0 && x.magazine > 0) stats.push(stat("reload", num(x.reload) + u.sec));
    if (x.pierce) stats.push(stat("pierce", x.pierce));
    if (x.bounces) stats.push(stat("bounces", x.bounces));
    if (x.homing) stats.push(stat("homing", "✓"));
    if (x.explode) stats.push(stat("explode", "✓"));
    stats = `<div class="statgrid">${stats.join("")}</div>`;
  }
  document.getElementById("dlgbody").innerHTML = `
    <div class="head" style="--tier:${tierColor(x.tier)}"><span class="big"><img class="px" src="${x.icon}" alt=""></span>
      <div><h3 id="dlg-title">${esc(tx(x.name))}</h3><span class="tier">${esc(tx(D.tiers[x.tier].name))} ${esc(isW ? u.weapon : u.item)}${x.starter ? " · " + esc(u.starter) : ""}${x.stackable ? " · " + esc(u.stackable) : ""}</span></div>
      <button class="x" type="button" data-close>${esc(u.close)}</button></div>
    ${x.tags.length ? `<div class="chips">${x.tags.map(t => tagChip(t, false)).join("")}</div>` : ""}
    <div>${esc(tx(x.description))}</div>
    ${stats}
    <h4>${esc(u.synOf(syns.length))}</h4>
    ${syns.length ? `<div class="syns">${syns.map(synHTML).join("")}</div>` : `<div class="empty" style="padding:0">${esc(u.noSyn)}</div>`}
    ${sets.length ? `<h4>${esc(u.tagSet)}</h4><div class="steps" style="grid-template-columns:1fr">${sets.map(s => `<a class="step" href="#/tags" style="--c:${TAG[s.tag].color};text-decoration:none"><span class="n">${esc(tx(TAG[s.tag].name))} · ${esc(u.need(s.need))}</span><b>${esc(tx(s.name))}</b><span>${esc(tx(s.description).replace(/^\[[^\]]+\]\s*/, ""))}</span></a>`).join("")}</div>` : ""}
    <div><button class="pill copy" type="button" data-copy>${esc(u.copy)}</button></div>`;
  const dlg = document.getElementById("dlg");
  if (!dlg.open) dlg.showModal();
  dlg.scrollTop = 0;
  return true;
}

// ---------------------------------------------------------------- 길 찾기

let lastPage = "";
function route() {
  const [, page = "", id = ""] = location.hash.replace(/^#/, "").split("/");
  const name = PAGES.includes(page) ? page : "";
  const dlg = document.getElementById("dlg");
  // 같은 목록 위에서 자세히 보기만 열고 닫을 때는 목록을 다시 그리지 않는다 (스크롤 유지)
  if (name !== lastPage || !id) {
    const view = document.getElementById("view");
    const html = { "": home, heroes: heroesPage, weapons: () => gearPage("weapons"), items: () => gearPage("items"), synergies: synergiesPage,
      tags: tagsPage, enemies: enemiesPage, bosses: bossesPage, npcs: npcsPage, world: worldPage }[name]();
    if (name !== lastPage || !dlg.open) {
      const keep = name === lastPage ? window.scrollY : 0;
      view.innerHTML = html;
      window.scrollTo(0, keep);
      bindPage();
    }
    lastPage = name;
  }
  if (id && (name === "weapons" || name === "items")) detail(name, id);
  else if (dlg.open) dlg.close();
  document.querySelectorAll("#links a").forEach(a => a.setAttribute("aria-current", a.dataset.page === name ? "page" : "false"));
  document.title = (name ? L()[name] + " · " : "") + "CRACKPOT " + L().codex;
  document.getElementById("links").classList.remove("open");
}

function rerender() {
  const keep = window.scrollY;
  lastPage = "#";
  route();
  window.scrollTo(0, keep);
}

function bindPage() {
  const q = document.getElementById("q");
  if (q) q.addEventListener("input", e => {
    state.q = e.target.value.trim().toLowerCase();
    rerender();
    const again = document.getElementById("q");
    again.focus();
    again.setSelectionRange(again.value.length, again.value.length);
  });
  const tier = document.getElementById("tier");
  if (tier) tier.addEventListener("change", e => { state.tier = e.target.value; rerender(); });
  const shown = document.getElementById("shown");
  if (shown) shown.textContent = L().count(document.querySelectorAll("#view .card, #view .syn, #view .tagsec").length);
}

function chrome() {
  const u = L();
  document.documentElement.lang = state.lang;
  document.getElementById("links").innerHTML = PAGES.map(p => `<a href="#/${p}" data-page="${p}">${esc(u[p])}</a>`).join("");
  document.querySelectorAll("[data-ui]").forEach(el => { el.textContent = u[el.dataset.ui]; });
  document.getElementById("lang").textContent = state.lang === "ko" ? "EN" : "한국어";
  const sp = document.getElementById("spoil");
  sp.textContent = state.spoil ? u.spoilOn : u.spoilOff;
  sp.setAttribute("aria-pressed", state.spoil);
}

// 걷기 그림 돌리기: 몬스터·보스 페이지에서만, 마우스를 올린 카드만 (움직임 줄이기 설정이면 안 돌린다)
const still = window.matchMedia("(prefers-reduced-motion: reduce)");
let walker = null;
document.addEventListener("pointerover", e => {
  const card = e.target.closest(".mob, .npc");
  const img = card && card.querySelector("img[data-walk]");
  if (!img || still.matches || card.classList.contains("spoiler") || (walker && walker.img === img)) return;
  stopWalk();
  const frames = JSON.parse(img.dataset.walk);
  let i = 0;
  walker = { img, first: img.src, timer: setInterval(() => { i = (i + 1) % frames.length; img.src = frames[i]; }, 110) };
  card.addEventListener("pointerleave", stopWalk, { once: true });
});
function stopWalk() {
  if (!walker) return;
  clearInterval(walker.timer);
  walker.img.src = walker.first;
  walker = null;
}

document.addEventListener("click", e => {
  const reveal = e.target.closest("[data-reveal]");
  if (reveal && !state.spoil && !state.revealed.has(reveal.dataset.reveal)) {
    e.preventDefault();
    state.revealed.add(reveal.dataset.reveal);
    rerender();
    return;
  }
  const tag = e.target.closest("button[data-tag]");
  if (tag) {
    const t = tag.dataset.tag;
    state.tags.has(t) ? state.tags.delete(t) : state.tags.add(t);
    rerender();
    return;
  }
  if (e.target.closest("[data-close]")) { closeDetail(); return; }
  const copy = e.target.closest("[data-copy]");
  if (copy) {
    const done = () => { copy.textContent = L().copied; };
    if (navigator.clipboard) navigator.clipboard.writeText(location.href).then(done, () => {});
    return;
  }
  const inDialog = e.target.closest("#dlg a[href^='#/']");
  if (inDialog) document.getElementById("dlg").close();
});
function closeDetail() {
  const [, page = ""] = location.hash.replace(/^#/, "").split("/");
  history.pushState(null, "", "#/" + page);
  document.getElementById("dlg").close();
}
document.getElementById("dlg").addEventListener("click", e => { if (e.target.id === "dlg") closeDetail(); });
document.getElementById("dlg").addEventListener("cancel", e => { e.preventDefault(); closeDetail(); });
document.getElementById("lang").addEventListener("click", () => {
  state.lang = state.lang === "ko" ? "en" : "ko";
  store.set("lang", state.lang);
  chrome();
  rerender();
});
document.getElementById("spoil").addEventListener("click", () => {
  state.spoil = !state.spoil;
  store.set("spoil", state.spoil);
  chrome();
  rerender();
});
document.getElementById("menu").addEventListener("click", e => {
  const open = document.getElementById("links").classList.toggle("open");
  e.currentTarget.setAttribute("aria-expanded", open);
});
document.addEventListener("toggle", e => {
  const d = e.target;
  if (!(d instanceof HTMLDetailsElement) || !d.dataset.floor) return;
  const n = Number(d.dataset.floor);
  d.open ? state.openFloors.add(n) : state.openFloors.delete(n);
}, true);
window.addEventListener("hashchange", () => {
  const [, page = ""] = location.hash.replace(/^#/, "").split("/");
  if (page !== lastPage) { state.q = ""; state.tier = ""; state.tags.clear(); }
  route();
});

chrome();
route();
