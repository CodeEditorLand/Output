var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
const exports = {};
const module = { exports };
!((e, r) => {
  if ("object" === typeof exports && "object" === typeof module)
    module.exports = r();
  else if ("function" === typeof define && define.amd) define([], r);
  else {
    const t = r();
    for (const n in t)
      ("object" === typeof exports ? exports : e)[n] = t[n];
  }
})(
  "undefined" !== typeof self ? self : void 0,
  () => ((e) => {
    const r = {};
    function t(n) {
      if (r[n]) return r[n].exports;
      const o = r[n] = { i: n, l: false, exports: {} };
      return e[n].call(o.exports, o, o.exports, t), o.l = true, o.exports;
    }
    __name(t, "t");
    return t.m = e, t.c = r, t.d = (e2, r2, n) => {
      t.o(e2, r2) || Object.defineProperty(e2, r2, { enumerable: true, get: n });
    }, t.r = (e2) => {
      "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(e2, "__esModule", { value: true });
    }, t.t = (e2, r2) => {
      if (1 & r2 && (e2 = t(e2)), 8 & r2) return e2;
      if (4 & r2 && "object" === typeof e2 && e2 && e2.__esModule)
        return e2;
      const n = /* @__PURE__ */ Object.create(null);
      if (t.r(n), Object.defineProperty(n, "default", {
        enumerable: true,
        value: e2
      }), 2 & r2 && "string" !== typeof e2)
        for (const o in e2) t.d(n, o, ((r3) => e2[r3]).bind(null, o));
      return n;
    }, t.n = (e2) => {
      const r2 = e2?.__esModule ? () => e2.default : () => e2;
      return t.d(r2, "a", r2), r2;
    }, t.o = (e2, r2) => Object.prototype.hasOwnProperty.call(e2, r2), t.p = "", t(t.s = 0);
  })([
    function(e, r, t) {
      ((t2) => {
        let n;
        r = e.exports = H, n = "object" === typeof t2 && t2.env && t2.env.NODE_DEBUG && /\bsemver\b/i.test(t2.env.NODE_DEBUG) ? () => {
          const e2 = Array.prototype.slice.call(
            arguments,
            0
          );
          e2.unshift("SEMVER"), console.log.apply(console, e2);
        } : () => {
        }, r.SEMVER_SPEC_VERSION = "2.0.0";
        const o = 256;
        const i = Number.MAX_SAFE_INTEGER || 9007199254740991;
        const s = r.re = [];
        const a = r.src = [];
        let u = 0;
        const c = u++;
        a[c] = "0|[1-9]\\d*";
        const p = u++;
        a[p] = "[0-9]+";
        const f = u++;
        a[f] = "\\d*[a-zA-Z-][a-zA-Z0-9-]*";
        const l = u++;
        a[l] = `(${a[c]})\\.(${a[c]})\\.(${a[c]})`;
        const h = u++;
        a[h] = `(${a[p]})\\.(${a[p]})\\.(${a[p]})`;
        const v = u++;
        a[v] = `(?:${a[c]}|${a[f]})`;
        const m = u++;
        a[m] = `(?:${a[p]}|${a[f]})`;
        const w = u++;
        a[w] = `(?:-(${a[v]}(?:\\.${a[v]})*))`;
        const g = u++;
        a[g] = `(?:-?(${a[m]}(?:\\.${a[m]})*))`;
        const y = u++;
        a[y] = "[0-9A-Za-z-]+";
        const d = u++;
        a[d] = `(?:\\+(${a[y]}(?:\\.${a[y]})*))`;
        const b = u++;
        const j = `v?${a[l]}${a[w]}?${a[d]}?`;
        a[b] = `^${j}$`;
        const E = `[v=\\s]*${a[h]}${a[g]}?${a[d]}?`;
        const T = u++;
        a[T] = `^${E}$`;
        const x = u++;
        a[x] = "((?:<|>)?=?)";
        const $ = u++;
        a[$] = `${a[p]}|x|X|\\*`;
        const k = u++;
        a[k] = `${a[c]}|x|X|\\*`;
        const S = u++;
        a[S] = `[v=\\s]*(${a[k]})(?:\\.(${a[k]})(?:\\.(${a[k]})(?:${a[w]})?${a[d]}?)?)?`;
        const R = u++;
        a[R] = `[v=\\s]*(${a[$]})(?:\\.(${a[$]})(?:\\.(${a[$]})(?:${a[g]})?${a[d]}?)?)?`;
        const I = u++;
        a[I] = `^${a[x]}\\s*${a[S]}$`;
        const _ = u++;
        a[_] = `^${a[x]}\\s*${a[R]}$`;
        const O = u++;
        a[O] = "(?:^|[^\\d])(\\d{1,16})(?:\\.(\\d{1,16}))?(?:\\.(\\d{1,16}))?(?:$|[^\\d])";
        const A = u++;
        a[A] = "(?:~>?)";
        const M = u++;
        a[M] = `(\\s*)${a[A]}\\s+`, s[M] = new RegExp(a[M], "g");
        const V = u++;
        a[V] = `^${a[A]}${a[S]}$`;
        const P = u++;
        a[P] = `^${a[A]}${a[R]}$`;
        const C = u++;
        a[C] = "(?:\\^)";
        const L = u++;
        a[L] = `(\\s*)${a[C]}\\s+`, s[L] = new RegExp(a[L], "g");
        const N = u++;
        a[N] = `^${a[C]}${a[S]}$`;
        const q = u++;
        a[q] = `^${a[C]}${a[R]}$`;
        const D = u++;
        a[D] = `^${a[x]}\\s*(${E})$|^$`;
        const X = u++;
        a[X] = `^${a[x]}\\s*(${j})$|^$`;
        const z = u++;
        a[z] = `(\\s*)${a[x]}\\s*(${E}|${a[S]})`, s[z] = new RegExp(a[z], "g");
        const G = u++;
        a[G] = `^\\s*(${a[S]})\\s+-\\s+(${a[S]})\\s*$`;
        const Z = u++;
        a[Z] = `^\\s*(${a[R]})\\s+-\\s+(${a[R]})\\s*$`;
        const B = u++;
        a[B] = "(<|>)?=?\\s*\\*";
        for (let U = 0; U < 35; U++)
          n(U, a[U]), s[U] || (s[U] = new RegExp(a[U]));
        function F(e2, r2) {
          if (e2 instanceof H) return e2;
          if ("string" !== typeof e2) return null;
          if (e2.length > o) return null;
          if (!(r2 ? s[T] : s[b]).test(e2)) return null;
          try {
            return new H(e2, r2);
          } catch (e3) {
            return null;
          }
        }
        __name(F, "F");
        function H(e2, r2) {
          if (e2 instanceof H) {
            if (e2.loose === r2) return e2;
            e2 = e2.version;
          } else if ("string" !== typeof e2)
            throw new TypeError(`Invalid Version: ${e2}`);
          if (e2.length > o)
            throw new TypeError(
              `version is longer than ${o} characters`
            );
          if (!(this instanceof H)) return new H(e2, r2);
          n("SemVer", e2, r2), this.loose = r2;
          const t3 = e2.trim().match(r2 ? s[T] : s[b]);
          if (!t3) throw new TypeError(`Invalid Version: ${e2}`);
          if (this.raw = e2, this.major = +t3[1], this.minor = +t3[2], this.patch = +t3[3], this.major > i || this.major < 0)
            throw new TypeError("Invalid major version");
          if (this.minor > i || this.minor < 0)
            throw new TypeError("Invalid minor version");
          if (this.patch > i || this.patch < 0)
            throw new TypeError("Invalid patch version");
          t3[4] ? this.prerelease = t3[4].split(".").map((e3) => {
            if (/^[0-9]+$/.test(e3)) {
              const r3 = +e3;
              if (r3 >= 0 && r3 < i) return r3;
            }
            return e3;
          }) : this.prerelease = [], this.build = t3[5] ? t3[5].split(".") : [], this.format();
        }
        __name(H, "H");
        r.parse = F, r.valid = (e2, r2) => {
          const t3 = F(e2, r2);
          return t3 ? t3.version : null;
        }, r.clean = (e2, r2) => {
          const t3 = F(e2.trim().replace(/^[=v]+/, ""), r2);
          return t3 ? t3.version : null;
        }, r.SemVer = H, H.prototype.format = function() {
          return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
        }, H.prototype.toString = function() {
          return this.version;
        }, H.prototype.compare = function(e2) {
          return n("SemVer.compare", this.version, this.loose, e2), e2 instanceof H || (e2 = new H(e2, this.loose)), this.compareMain(e2) || this.comparePre(e2);
        }, H.prototype.compareMain = function(e2) {
          return e2 instanceof H || (e2 = new H(e2, this.loose)), K(this.major, e2.major) || K(this.minor, e2.minor) || K(this.patch, e2.patch);
        }, H.prototype.comparePre = function(e2) {
          if (e2 instanceof H || (e2 = new H(e2, this.loose)), this.prerelease.length && !e2.prerelease.length)
            return -1;
          if (!this.prerelease.length && e2.prerelease.length)
            return 1;
          if (!this.prerelease.length && !e2.prerelease.length)
            return 0;
          let r2 = 0;
          do {
            const t3 = this.prerelease[r2];
            const o2 = e2.prerelease[r2];
            if (n("prerelease compare", r2, t3, o2), void 0 === t3 && void 0 === o2)
              return 0;
            if (void 0 === o2) return 1;
            if (void 0 === t3) return -1;
            if (t3 !== o2) return K(t3, o2);
          } while (++r2);
        }, H.prototype.inc = function(e2, r2) {
          switch (e2) {
            case "premajor":
              this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", r2);
              break;
            case "preminor":
              this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", r2);
              break;
            case "prepatch":
              this.prerelease.length = 0, this.inc("patch", r2), this.inc("pre", r2);
              break;
            case "prerelease":
              0 === this.prerelease.length && this.inc("patch", r2), this.inc("pre", r2);
              break;
            case "major":
              0 === this.minor && 0 === this.patch && 0 !== this.prerelease.length || this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
              break;
            case "minor":
              0 === this.patch && 0 !== this.prerelease.length || this.minor++, this.patch = 0, this.prerelease = [];
              break;
            case "patch":
              0 === this.prerelease.length && this.patch++, this.prerelease = [];
              break;
            case "pre":
              if (0 === this.prerelease.length)
                this.prerelease = [0];
              else {
                for (let t3 = this.prerelease.length; --t3 >= 0; )
                  "number" === typeof this.prerelease[t3] && (this.prerelease[t3]++, t3 = -2);
                -1 === t2 && this.prerelease.push(0);
              }
              r2 && (this.prerelease[0] === r2 ? Number.isNaN(this.prerelease[1]) && (this.prerelease = [r2, 0]) : this.prerelease = [r2, 0]);
              break;
            default:
              throw new Error(
                `invalid increment argument: ${e2}`
              );
          }
          return this.format(), this.raw = this.version, this;
        }, r.inc = (e2, r2, t3, n2) => {
          "string" === typeof t3 && (n2 = t3, t3 = void 0);
          try {
            return new H(e2, t3).inc(r2, n2).version;
          } catch (e3) {
            return null;
          }
        }, r.diff = (e2, r2) => {
          if (ee(e2, r2)) return null;
          const t3 = F(e2);
          const n2 = F(r2);
          if (t3.prerelease.length || n2.prerelease.length) {
            for (const o2 in t3)
              if (("major" === o2 || "minor" === o2 || "patch" === o2) && t3[o2] !== n2[o2])
                return `pre${o2}`;
            return "prerelease";
          }
          for (const o2 in t3)
            if (("major" === o2 || "minor" === o2 || "patch" === o2) && t3[o2] !== n2[o2])
              return o2;
        }, r.compareIdentifiers = K;
        const J = /^[0-9]+$/;
        function K(e2, r2) {
          const t3 = J.test(e2);
          const n2 = J.test(r2);
          return t3 && n2 && (e2 = +e2, r2 = +r2), t3 && !n2 ? -1 : n2 && !t3 ? 1 : e2 < r2 ? -1 : e2 > r2 ? 1 : 0;
        }
        __name(K, "K");
        function Q(e2, r2, t3) {
          return new H(e2, t3).compare(new H(r2, t3));
        }
        __name(Q, "Q");
        function W(e2, r2, t3) {
          return Q(e2, r2, t3) > 0;
        }
        __name(W, "W");
        function Y(e2, r2, t3) {
          return Q(e2, r2, t3) < 0;
        }
        __name(Y, "Y");
        function ee(e2, r2, t3) {
          return 0 === Q(e2, r2, t3);
        }
        __name(ee, "ee");
        function re(e2, r2, t3) {
          return 0 !== Q(e2, r2, t3);
        }
        __name(re, "re");
        function te(e2, r2, t3) {
          return Q(e2, r2, t3) >= 0;
        }
        __name(te, "te");
        function ne(e2, r2, t3) {
          return Q(e2, r2, t3) <= 0;
        }
        __name(ne, "ne");
        function oe(e2, r2, t3, n2) {
          let o2;
          switch (r2) {
            case "===":
              "object" === typeof e2 && (e2 = e2.version), "object" === typeof t3 && (t3 = t3.version), o2 = e2 === t3;
              break;
            case "!==":
              "object" === typeof e2 && (e2 = e2.version), "object" === typeof t3 && (t3 = t3.version), o2 = e2 !== t3;
              break;
            case "":
            case "=":
            case "==":
              o2 = ee(e2, t3, n2);
              break;
            case "!=":
              o2 = re(e2, t3, n2);
              break;
            case ">":
              o2 = W(e2, t3, n2);
              break;
            case ">=":
              o2 = te(e2, t3, n2);
              break;
            case "<":
              o2 = Y(e2, t3, n2);
              break;
            case "<=":
              o2 = ne(e2, t3, n2);
              break;
            default:
              throw new TypeError(`Invalid operator: ${r2}`);
          }
          return o2;
        }
        __name(oe, "oe");
        function ie(e2, r2) {
          if (e2 instanceof ie) {
            if (e2.loose === r2) return e2;
            e2 = e2.value;
          }
          if (!(this instanceof ie)) return new ie(e2, r2);
          n("comparator", e2, r2), this.loose = r2, this.parse(e2), this.semver === se ? this.value = "" : this.value = this.operator + this.semver.version, n("comp", this);
        }
        __name(ie, "ie");
        r.rcompareIdentifiers = (e2, r2) => K(r2, e2), r.major = (e2, r2) => new H(e2, r2).major, r.minor = (e2, r2) => new H(e2, r2).minor, r.patch = (e2, r2) => new H(e2, r2).patch, r.compare = Q, r.compareLoose = (e2, r2) => Q(e2, r2, true), r.rcompare = (e2, r2, t3) => Q(r2, e2, t3), r.sort = (e2, t3) => e2.sort((e3, n2) => r.compare(e3, n2, t3)), r.rsort = (e2, t3) => e2.sort((e3, n2) => r.rcompare(e3, n2, t3)), r.gt = W, r.lt = Y, r.eq = ee, r.neq = re, r.gte = te, r.lte = ne, r.cmp = oe, r.Comparator = ie;
        const se = {};
        function ae(e2, r2) {
          if (e2 instanceof ae)
            return e2.loose === r2 ? e2 : new ae(e2.raw, r2);
          if (e2 instanceof ie) return new ae(e2.value, r2);
          if (!(this instanceof ae)) return new ae(e2, r2);
          if (this.loose = r2, this.raw = e2, this.set = e2.split(/\s*\|\|\s*/).map(function(e3) {
            return this.parseRange(e3.trim());
          }, this).filter((e3) => e3.length), !this.set.length)
            throw new TypeError(`Invalid SemVer Range: ${e2}`);
          this.format();
        }
        __name(ae, "ae");
        function ue(e2) {
          return !e2 || "x" === e2.toLowerCase() || "*" === e2;
        }
        __name(ue, "ue");
        function ce(e2, r2, t3, n2, o2, i2, s2, a2, u2, c2, p2, f2, l2) {
          return `${r2 = ue(t3) ? "" : ue(n2) ? `>=${t3}.0.0` : ue(o2) ? `>=${t3}.${n2}.0` : `>=${r2}`} ${a2 = ue(u2) ? "" : ue(c2) ? `<${+u2 + 1}.0.0` : ue(p2) ? `<${u2}.${+c2 + 1}.0` : f2 ? `<=${u2}.${c2}.${p2}-${f2}` : `<=${a2}`}`.trim();
        }
        __name(ce, "ce");
        function pe(e2, r2) {
          for (let t3 = 0; t3 < e2.length; t3++)
            if (!e2[t3].test(r2)) return false;
          if (r2.prerelease.length) {
            for (t2 = 0; t2 < e2.length; t2++)
              if (n(e2[t2].semver), e2[t2].semver !== se && e2[t2].semver.prerelease.length > 0) {
                const o2 = e2[t2].semver;
                if (o2.major === r2.major && o2.minor === r2.minor && o2.patch === r2.patch)
                  return true;
              }
            return false;
          }
          return true;
        }
        __name(pe, "pe");
        function fe(e2, r2, t3) {
          try {
            r2 = new ae(r2, t3);
          } catch (e3) {
            return false;
          }
          return r2.test(e2);
        }
        __name(fe, "fe");
        function le(e2, r2, t3, n2) {
          let o2;
          let i2;
          let s2;
          let a2;
          let u2;
          switch (e2 = new H(e2, n2), r2 = new ae(r2, n2), t3) {
            case ">":
              o2 = W, i2 = ne, s2 = Y, a2 = ">", u2 = ">=";
              break;
            case "<":
              o2 = Y, i2 = te, s2 = W, a2 = "<", u2 = "<=";
              break;
            default:
              throw new TypeError(
                'Must provide a hilo val of "<" or ">"'
              );
          }
          if (fe(e2, r2, n2)) return false;
          for (let c2 = 0; c2 < r2.set.length; ++c2) {
            const p2 = r2.set[c2];
            let f2 = null;
            let l2 = null;
            if (p2.forEach((e3) => {
              e3.semver === se && (e3 = new ie(">=0.0.0")), f2 = f2 || e3, l2 = l2 || e3, o2(e3.semver, f2.semver, n2) ? f2 = e3 : s2(e3.semver, l2.semver, n2) && (l2 = e3);
            }), f2.operator === a2 || f2.operator === u2)
              return false;
            if ((!l2.operator || l2.operator === a2) && i2(e2, l2.semver))
              return false;
            if (l2.operator === u2 && s2(e2, l2.semver)) return false;
          }
          return true;
        }
        __name(le, "le");
        ie.prototype.parse = function(e2) {
          const r2 = this.loose ? s[D] : s[X];
          const t3 = e2.match(r2);
          if (!t3) throw new TypeError(`Invalid comparator: ${e2}`);
          this.operator = t3[1], "=" === this.operator && (this.operator = ""), t3[2] ? this.semver = new H(t3[2], this.loose) : this.semver = se;
        }, ie.prototype.toString = function() {
          return this.value;
        }, ie.prototype.test = function(e2) {
          return n("Comparator.test", e2, this.loose), this.semver === se || ("string" === typeof e2 && (e2 = new H(e2, this.loose)), oe(e2, this.operator, this.semver, this.loose));
        }, ie.prototype.intersects = function(e2, r2) {
          if (!(e2 instanceof ie))
            throw new TypeError("a Comparator is required");
          let t3;
          if ("" === this.operator)
            return t3 = new ae(e2.value, r2), fe(this.value, t3, r2);
          if ("" === e2.operator)
            return t3 = new ae(this.value, r2), fe(e2.semver, t3, r2);
          const n2 = !(">=" !== this.operator && ">" !== this.operator || ">=" !== e2.operator && ">" !== e2.operator);
          const o2 = !("<=" !== this.operator && "<" !== this.operator || "<=" !== e2.operator && "<" !== e2.operator);
          const i2 = this.semver.version === e2.semver.version;
          const s2 = !(">=" !== this.operator && "<=" !== this.operator || ">=" !== e2.operator && "<=" !== e2.operator);
          const a2 = oe(this.semver, "<", e2.semver, r2) && (">=" === this.operator || ">" === this.operator) && ("<=" === e2.operator || "<" === e2.operator);
          const u2 = oe(this.semver, ">", e2.semver, r2) && ("<=" === this.operator || "<" === this.operator) && (">=" === e2.operator || ">" === e2.operator);
          return n2 || o2 || i2 && s2 || a2 || u2;
        }, r.Range = ae, ae.prototype.format = function() {
          return this.range = this.set.map((e2) => e2.join(" ").trim()).join("||").trim(), this.range;
        }, ae.prototype.toString = function() {
          return this.range;
        }, ae.prototype.parseRange = function(e2) {
          const r2 = this.loose;
          e2 = e2.trim(), n("range", e2, r2);
          const t3 = r2 ? s[Z] : s[G];
          e2 = e2.replace(t3, ce), n("hyphen replace", e2), e2 = e2.replace(s[z], "$1$2$3"), n("comparator trim", e2, s[z]), e2 = (e2 = (e2 = e2.replace(s[M], "$1~")).replace(
            s[L],
            "$1^"
          )).split(/\s+/).join(" ");
          const o2 = r2 ? s[D] : s[X];
          let i2 = e2.split(" ").map(
            (e3) => ((e4, r3) => (n("comp", e4), e4 = ((e5, r4) => e5.trim().split(/\s+/).map(
              (e6) => ((e7, r5) => {
                n("caret", e7, r5);
                const t4 = r5 ? s[q] : s[N];
                return e7.replace(
                  t4,
                  (r6, t5, o3, i3, s2) => {
                    let a2;
                    return n(
                      "caret",
                      e7,
                      r6,
                      t5,
                      o3,
                      i3,
                      s2
                    ), ue(t5) ? a2 = "" : ue(o3) ? a2 = `>=${t5}.0.0 <${+t5 + 1}.0.0` : ue(i3) ? a2 = "0" === t5 ? `>=${t5}.${o3}.0 <${t5}.${+o3 + 1}.0` : `>=${t5}.${o3}.0 <${+t5 + 1}.0.0` : s2 ? (n(
                      "replaceCaret pr",
                      s2
                    ), "-" !== s2.charAt(
                      0
                    ) && (s2 = `-${s2}`), a2 = "0" === t5 ? "0" === o3 ? `>=${t5}.${o3}.${i3}${s2} <${t5}.${o3}.${+i3 + 1}` : `>=${t5}.${o3}.${i3}${s2} <${t5}.${+o3 + 1}.0` : `>=${t5}.${o3}.${i3}${s2} <${+t5 + 1}.0.0`) : (n(
                      "no pr"
                    ), a2 = "0" === t5 ? "0" === o3 ? `>=${t5}.${o3}.${i3} <${t5}.${o3}.${+i3 + 1}` : `>=${t5}.${o3}.${i3} <${t5}.${+o3 + 1}.0` : `>=${t5}.${o3}.${i3} <${+t5 + 1}.0.0`), n(
                      "caret return",
                      a2
                    ), a2;
                  }
                );
              })(e6, r4)
            ).join(" "))(e4, r3), n("caret", e4), e4 = ((e5, r4) => e5.trim().split(/\s+/).map(
              (e6) => ((e7, r5) => {
                const t4 = r5 ? s[P] : s[V];
                return e7.replace(
                  t4,
                  (r6, t5, o3, i3, s2) => {
                    let a2;
                    return n(
                      "tilde",
                      e7,
                      r6,
                      t5,
                      o3,
                      i3,
                      s2
                    ), ue(t5) ? a2 = "" : ue(o3) ? a2 = `>=${t5}.0.0 <${+t5 + 1}.0.0` : ue(i3) ? a2 = `>=${t5}.${o3}.0 <${t5}.${+o3 + 1}.0` : s2 ? (n(
                      "replaceTilde pr",
                      s2
                    ), "-" !== s2.charAt(
                      0
                    ) && (s2 = `-${s2}`), a2 = `>=${t5}.${o3}.${i3}${s2} <${t5}.${+o3 + 1}.0`) : a2 = `>=${t5}.${o3}.${i3} <${t5}.${+o3 + 1}.0`, n(
                      "tilde return",
                      a2
                    ), a2;
                  }
                );
              })(e6, r4)
            ).join(" "))(e4, r3), n("tildes", e4), e4 = ((e5, r4) => (n("replaceXRanges", e5, r4), e5.split(/\s+/).map(
              (e6) => ((e7, r5) => {
                e7 = e7.trim();
                const t4 = r5 ? s[_] : s[I];
                return e7.replace(
                  t4,
                  (r6, t5, o3, i3, s2, a2) => {
                    n(
                      "xRange",
                      e7,
                      r6,
                      t5,
                      o3,
                      i3,
                      s2,
                      a2
                    );
                    const u2 = ue(o3);
                    const c2 = u2 || ue(i3);
                    const p2 = c2 || ue(s2);
                    return "=" === t5 && p2 && (t5 = ""), u2 ? r6 = ">" === t5 || "<" === t5 ? "<0.0.0" : "*" : t5 && p2 ? (c2 && (i3 = 0), p2 && (s2 = 0), ">" === t5 ? (t5 = ">=", c2 ? (o3 = +o3 + 1, i3 = 0, s2 = 0) : p2 && (i3 = +i3 + 1, s2 = 0)) : "<=" === t5 && (t5 = "<", c2 ? o3 = +o3 + 1 : i3 = +i3 + 1), r6 = `${t5 + o3}.${i3}.${s2}`) : c2 ? r6 = `>=${o3}.0.0 <${+o3 + 1}.0.0` : p2 && (r6 = `>=${o3}.${i3}.0 <${o3}.${+i3 + 1}.0`), n(
                      "xRange return",
                      r6
                    ), r6;
                  }
                );
              })(e6, r4)
            ).join(" ")))(e4, r3), n("xrange", e4), e4 = ((e5, r4) => (n("replaceStars", e5, r4), e5.trim().replace(s[B], "")))(e4, r3), n("stars", e4), e4))(e3, r2)
          ).join(" ").split(/\s+/);
          return this.loose && (i2 = i2.filter((e3) => !!e3.match(o2))), i2 = i2.map((e3) => new ie(e3, r2));
        }, ae.prototype.intersects = function(e2, r2) {
          if (!(e2 instanceof ae))
            throw new TypeError("a Range is required");
          return this.set.some(
            (t3) => t3.every(
              (t4) => e2.set.some(
                (e3) => e3.every((e4) => t4.intersects(e4, r2))
              )
            )
          );
        }, r.toComparators = (e2, r2) => new ae(e2, r2).set.map(
          (e3) => e3.map((e4) => e4.value).join(" ").trim().split(" ")
        ), ae.prototype.test = function(e2) {
          if (!e2) return false;
          "string" === typeof e2 && (e2 = new H(e2, this.loose));
          for (let r2 = 0; r2 < this.set.length; r2++)
            if (pe(this.set[r2], e2)) return true;
          return false;
        }, r.satisfies = fe, r.maxSatisfying = (e2, r2, t3) => {
          let n2 = null;
          let o2 = null;
          try {
            const i2 = new ae(r2, t3);
          } catch (e3) {
            return null;
          }
          return e2.forEach((e3) => {
            i.test(e3) && (n2 && -1 !== o2.compare(e3) || (o2 = new H(n2 = e3, t3)));
          }), n2;
        }, r.minSatisfying = (e2, r2, t3) => {
          let n2 = null;
          let o2 = null;
          try {
            const i2 = new ae(r2, t3);
          } catch (e3) {
            return null;
          }
          return e2.forEach((e3) => {
            i.test(e3) && (n2 && 1 !== o2.compare(e3) || (o2 = new H(n2 = e3, t3)));
          }), n2;
        }, r.validRange = (e2, r2) => {
          try {
            return new ae(e2, r2).range || "*";
          } catch (e3) {
            return null;
          }
        }, r.ltr = (e2, r2, t3) => le(e2, r2, "<", t3), r.gtr = (e2, r2, t3) => le(e2, r2, ">", t3), r.outside = le, r.prerelease = (e2, r2) => {
          const t3 = F(e2, r2);
          return t3?.prerelease.length ? t3.prerelease : null;
        }, r.intersects = (e2, r2, t3) => (e2 = new ae(e2, t3), r2 = new ae(r2, t3), e2.intersects(r2)), r.coerce = (e2) => {
          if (e2 instanceof H) return e2;
          if ("string" !== typeof e2) return null;
          const r2 = e2.match(s[O]);
          return null == r2 ? null : F(`${r2[1] || "0"}.${r2[2] || "0"}.${r2[3] || "0"}`);
        };
      }).call(this, t(1));
    },
    (e, r) => {
      let t;
      let n;
      const o = e.exports = {};
      function i() {
        throw new Error("setTimeout has not been defined");
      }
      __name(i, "i");
      function s() {
        throw new Error("clearTimeout has not been defined");
      }
      __name(s, "s");
      function a(e2) {
        if (t === setTimeout) return setTimeout(e2, 0);
        if ((t === i || !t) && setTimeout)
          return t = setTimeout, setTimeout(e2, 0);
        try {
          return t(e2, 0);
        } catch (r2) {
          try {
            return t.call(null, e2, 0);
          } catch (r3) {
            return t.call(this, e2, 0);
          }
        }
      }
      __name(a, "a");
      !(() => {
        try {
          t = "function" === typeof setTimeout ? setTimeout : i;
        } catch (e2) {
          t = i;
        }
        try {
          n = "function" === typeof clearTimeout ? clearTimeout : s;
        } catch (e2) {
          n = s;
        }
      })();
      let u;
      let c = [];
      let p = false;
      let f = -1;
      function l() {
        p && u && (p = false, u.length ? c = u.concat(c) : f = -1, c.length && h());
      }
      __name(l, "l");
      function h() {
        if (!p) {
          const e2 = a(l);
          p = true;
          for (let r2 = c.length; r2; ) {
            for (u = c, c = []; ++f < r2; ) u?.[f].run();
            f = -1, r2 = c.length;
          }
          u = null, p = false, function(e3) {
            if (n === clearTimeout) return clearTimeout(e3);
            if ((n === s || !n) && clearTimeout)
              return n = clearTimeout, clearTimeout(e3);
            try {
              n(e3);
            } catch (r2) {
              try {
                return n.call(null, e3);
              } catch (r3) {
                return n.call(this, e3);
              }
            }
          }(e2);
        }
      }
      __name(h, "h");
      function v(e2, r2) {
        this.fun = e2, this.array = r2;
      }
      __name(v, "v");
      function m() {
      }
      __name(m, "m");
      o.nextTick = (e2) => {
        const r2 = new Array(arguments.length - 1);
        if (arguments.length > 1)
          for (let t2 = 1; t2 < arguments.length; t2++)
            r2[t2 - 1] = arguments[t2];
        c.push(new v(e2, r2)), 1 !== c.length || p || a(h);
      }, v.prototype.run = function() {
        this.fun.apply(null, this.array);
      }, o.title = "browser", o.browser = true, o.env = {}, o.argv = [], o.version = "", o.versions = {}, o.on = m, o.addListener = m, o.once = m, o.off = m, o.removeListener = m, o.removeAllListeners = m, o.emit = m, o.prependListener = m, o.prependOnceListener = m, o.listeners = (e2) => [], o.binding = (e2) => {
        throw new Error("process.binding is not supported");
      }, o.cwd = () => "/", o.chdir = (e2) => {
        throw new Error("process.chdir is not supported");
      }, o.umask = () => 0;
    }
  ])
);
const SEMVER_SPEC_VERSION = module.exports.SEMVER_SPEC_VERSION;
const parse = module.exports.parse;
const valid = module.exports.valid;
const coerce = module.exports.coerce;
const clean = module.exports.clean;
const inc = module.exports.inc;
const major = module.exports.major;
const minor = module.exports.minor;
const patch = module.exports.patch;
const prerelease = module.exports.prerelease;
const gt = module.exports.gt;
const gte = module.exports.gte;
const lt = module.exports.lt;
const lte = module.exports.lte;
const eq = module.exports.eq;
const neq = module.exports.neq;
const cmp = module.exports.cmp;
const compare = module.exports.compare;
const rcompare = module.exports.rcompare;
const compareIdentifiers = module.exports.compareIdentifiers;
const rcompareIdentifiers = module.exports.rcompareIdentifiers;
const compareBuild = module.exports.compareBuild;
const sort = module.exports.sort;
const rsort = module.exports.rsort;
const diff = module.exports.diff;
const validRange = module.exports.validRange;
const satisfies = module.exports.satisfies;
const maxSatisfying = module.exports.maxSatisfying;
const minSatisfying = module.exports.minSatisfying;
const minVersion = module.exports.minVersion;
const gtr = module.exports.gtr;
const ltr = module.exports.ltr;
const outside = module.exports.outside;
const intersects = module.exports.intersects;
const SemVer = module.exports.SemVer;
const Comparator = module.exports.Comparator;
const Range = module.exports.Range;
export {
  Comparator,
  Range,
  SEMVER_SPEC_VERSION,
  SemVer,
  clean,
  cmp,
  coerce,
  compare,
  compareBuild,
  compareIdentifiers,
  diff,
  eq,
  gt,
  gte,
  gtr,
  inc,
  intersects,
  lt,
  lte,
  ltr,
  major,
  maxSatisfying,
  minSatisfying,
  minVersion,
  minor,
  neq,
  outside,
  parse,
  patch,
  prerelease,
  rcompare,
  rcompareIdentifiers,
  rsort,
  satisfies,
  sort,
  valid,
  validRange
};
//# sourceMappingURL=semver.js.map
