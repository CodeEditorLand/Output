var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
let CachedTags = null;
let CachedShort = null;
const GetEnabledTags = /* @__PURE__ */ __name(() => {
  if (CachedTags !== null) return CachedTags;
  const Raw = window.__Trace ?? (typeof localStorage !== "undefined" ? localStorage.getItem("Trace") : null);
  CachedTags = Raw ? String(Raw).split(",").map((S) => S.trim().toLowerCase()) : [];
  return CachedTags;
}, "GetEnabledTags");
const IsShort = /* @__PURE__ */ __name(() => {
  if (CachedShort !== null) return CachedShort;
  CachedShort = GetEnabledTags().includes("short");
  return CachedShort;
}, "IsShort");
const IsEnabled = /* @__PURE__ */ __name((Tag) => {
  const Tags = GetEnabledTags();
  if (Tags.length === 0) return false;
  if (IsShort()) return true;
  const Lower = Tag.toLowerCase();
  return Tags.some((T) => T === "all" || T === Lower);
}, "IsEnabled");
const AppDataPattern = /land\.editor\.binary\.[^\s/\\)]+/g;
const AliasPath = /* @__PURE__ */ __name((Input) => Input.replace(AppDataPattern, "$APP"), "AliasPath");
let DedupKey = "";
let DedupCount = 0;
const FlushDedup = /* @__PURE__ */ __name(() => {
  if (DedupCount > 1) {
    console.log(`  (x${DedupCount})`);
  }
  DedupKey = "";
  DedupCount = 0;
}, "FlushDedup");
const DevLog = /* @__PURE__ */ __name((Tag, ...Args) => {
  if (!IsEnabled(Tag)) return;
  const TagUpper = Tag.toUpperCase();
  if (IsShort()) {
    const Message = Args.map(String).join(" ");
    const Aliased = AliasPath(Message);
    const Key = `${TagUpper}:${Aliased}`;
    if (Key === DedupKey) {
      DedupCount++;
      return;
    }
    FlushDedup();
    DedupKey = Key;
    DedupCount = 1;
    console.log(`[DEV:${TagUpper}]`, Aliased);
  } else {
    console.log(`[DEV:${TagUpper}]`, ...Args);
  }
}, "DevLog");
DevLog.reset = () => {
  CachedTags = null;
  CachedShort = null;
  FlushDedup();
};
var Log_default = DevLog;
export {
  Log_default as default
};
//# sourceMappingURL=Log.js.map
