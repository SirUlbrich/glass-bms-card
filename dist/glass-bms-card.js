const U = globalThis, B = U.ShadowRoot && (U.ShadyCSS === void 0 || U.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, L = /* @__PURE__ */ Symbol(), G = /* @__PURE__ */ new WeakMap();
let rt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== L) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (B && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = G.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && G.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const $t = (n) => new rt(typeof n == "string" ? n : n + "", void 0, L), _t = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((s, i, r) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + n[r + 1], n[0]);
  return new rt(e, n, L);
}, gt = (n, t) => {
  if (B) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = U.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, n.appendChild(s);
  }
}, K = B ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return $t(e);
})(n) : n;
const { is: mt, defineProperty: vt, getOwnPropertyDescriptor: yt, getOwnPropertyNames: bt, getOwnPropertySymbols: At, getPrototypeOf: Et } = Object, z = globalThis, J = z.trustedTypes, St = J ? J.emptyScript : "", wt = z.reactiveElementPolyfillSupport, x = (n, t) => n, T = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? St : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, t) {
  let e = n;
  switch (t) {
    case Boolean:
      e = n !== null;
      break;
    case Number:
      e = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(n);
      } catch {
        e = null;
      }
  }
  return e;
} }, k = (n, t) => !mt(n, t), Y = { attribute: !0, type: String, converter: T, reflect: !1, useDefault: !1, hasChanged: k };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), z.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let y = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Y) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && vt(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: r } = yt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: i, set(o) {
      const l = i?.call(this);
      r?.call(this, o), this.requestUpdate(t, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Y;
  }
  static _$Ei() {
    if (this.hasOwnProperty(x("elementProperties"))) return;
    const t = Et(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(x("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(x("properties"))) {
      const e = this.properties, s = [...bt(e), ...At(e)];
      for (const i of s) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, i] of e) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const i = this._$Eu(e, s);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s) e.unshift(K(i));
    } else t !== void 0 && e.push(K(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return gt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const r = (s.converter?.toAttribute !== void 0 ? s.converter : T).toAttribute(e, s.type);
      this._$Em = t, r == null ? this.removeAttribute(i) : this.setAttribute(i, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const r = s.getPropertyOptions(i), o = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : T;
      this._$Em = i;
      const l = o.fromAttribute(e, r.type);
      this[i] = l ?? this._$Ej?.get(i) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, r) {
    if (t !== void 0) {
      const o = this.constructor;
      if (i === !1 && (r = this[t]), s ??= o.getPropertyOptions(t), !((s.hasChanged ?? k)(r, e) || s.useDefault && s.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: r }, o) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), r !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [i, r] of this._$Ep) this[i] = r;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [i, r] of s) {
        const { wrapped: o } = r, l = this[i];
        o !== !0 || this._$AL.has(i) || l === void 0 || this.C(i, void 0, r, l);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[x("elementProperties")] = /* @__PURE__ */ new Map(), y[x("finalized")] = /* @__PURE__ */ new Map(), wt?.({ ReactiveElement: y }), (z.reactiveElementVersions ??= []).push("2.1.2");
const I = globalThis, Q = (n) => n, H = I.trustedTypes, X = H ? H.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, ot = "$lit$", $ = `lit$${Math.random().toFixed(9).slice(2)}$`, at = "?" + $, xt = `<${at}>`, m = document, C = () => m.createComment(""), P = (n) => n === null || typeof n != "object" && typeof n != "function", V = Array.isArray, Ct = (n) => V(n) || typeof n?.[Symbol.iterator] == "function", j = `[ 	
\f\r]`, w = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, tt = /-->/g, et = />/g, _ = RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), st = /'/g, it = /"/g, lt = /^(?:script|style|textarea|title)$/i, Pt = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), b = Pt(1), E = /* @__PURE__ */ Symbol.for("lit-noChange"), u = /* @__PURE__ */ Symbol.for("lit-nothing"), nt = /* @__PURE__ */ new WeakMap(), g = m.createTreeWalker(m, 129);
function ht(n, t) {
  if (!V(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return X !== void 0 ? X.createHTML(t) : t;
}
const Ot = (n, t) => {
  const e = n.length - 1, s = [];
  let i, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = w;
  for (let l = 0; l < e; l++) {
    const a = n[l];
    let c, d, h = -1, p = 0;
    for (; p < a.length && (o.lastIndex = p, d = o.exec(a), d !== null); ) p = o.lastIndex, o === w ? d[1] === "!--" ? o = tt : d[1] !== void 0 ? o = et : d[2] !== void 0 ? (lt.test(d[2]) && (i = RegExp("</" + d[2], "g")), o = _) : d[3] !== void 0 && (o = _) : o === _ ? d[0] === ">" ? (o = i ?? w, h = -1) : d[1] === void 0 ? h = -2 : (h = o.lastIndex - d[2].length, c = d[1], o = d[3] === void 0 ? _ : d[3] === '"' ? it : st) : o === it || o === st ? o = _ : o === tt || o === et ? o = w : (o = _, i = void 0);
    const f = o === _ && n[l + 1].startsWith("/>") ? " " : "";
    r += o === w ? a + xt : h >= 0 ? (s.push(c), a.slice(0, h) + ot + a.slice(h) + $ + f) : a + $ + (h === -2 ? l : f);
  }
  return [ht(n, r + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class O {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let r = 0, o = 0;
    const l = t.length - 1, a = this.parts, [c, d] = Ot(t, e);
    if (this.el = O.createElement(c, s), g.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = g.nextNode()) !== null && a.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(ot)) {
          const p = d[o++], f = i.getAttribute(h).split($), v = /([.?@])?(.*)/.exec(p);
          a.push({ type: 1, index: r, name: v[2], strings: f, ctor: v[1] === "." ? Ut : v[1] === "?" ? Tt : v[1] === "@" ? Ht : D }), i.removeAttribute(h);
        } else h.startsWith($) && (a.push({ type: 6, index: r }), i.removeAttribute(h));
        if (lt.test(i.tagName)) {
          const h = i.textContent.split($), p = h.length - 1;
          if (p > 0) {
            i.textContent = H ? H.emptyScript : "";
            for (let f = 0; f < p; f++) i.append(h[f], C()), g.nextNode(), a.push({ type: 2, index: ++r });
            i.append(h[p], C());
          }
        }
      } else if (i.nodeType === 8) if (i.data === at) a.push({ type: 2, index: r });
      else {
        let h = -1;
        for (; (h = i.data.indexOf($, h + 1)) !== -1; ) a.push({ type: 7, index: r }), h += $.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const s = m.createElement("template");
    return s.innerHTML = t, s;
  }
}
function S(n, t, e = n, s) {
  if (t === E) return t;
  let i = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const r = P(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== r && (i?._$AO?.(!1), r === void 0 ? i = void 0 : (i = new r(n), i._$AT(n, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = i : e._$Cl = i), i !== void 0 && (t = S(n, i._$AS(n, t.values), i, s)), t;
}
class Mt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, i = (t?.creationScope ?? m).importNode(e, !0);
    g.currentNode = i;
    let r = g.nextNode(), o = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let c;
        a.type === 2 ? c = new M(r, r.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(r, a.name, a.strings, this, t) : a.type === 6 && (c = new Nt(r, this, t)), this._$AV.push(c), a = s[++l];
      }
      o !== a?.index && (r = g.nextNode(), o++);
    }
    return g.currentNode = m, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class M {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = i?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = S(this, t, e), P(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== E && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ct(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== u && P(this._$AH) ? this._$AA.nextSibling.data = t : this.T(m.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = O.createElement(ht(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === i) this._$AH.p(e);
    else {
      const r = new Mt(i, this), o = r.u(this.options);
      r.p(e), this.T(o), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = nt.get(t.strings);
    return e === void 0 && nt.set(t.strings, e = new O(t)), e;
  }
  k(t) {
    V(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const r of t) i === e.length ? e.push(s = new M(this.O(C()), this.O(C()), this, this.options)) : s = e[i], s._$AI(r), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = Q(t).nextSibling;
      Q(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class D {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, r) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = u;
  }
  _$AI(t, e = this, s, i) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) t = S(this, t, e, 0), o = !P(t) || t !== this._$AH && t !== E, o && (this._$AH = t);
    else {
      const l = t;
      let a, c;
      for (t = r[0], a = 0; a < r.length - 1; a++) c = S(this, l[s + a], e, a), c === E && (c = this._$AH[a]), o ||= !P(c) || c !== this._$AH[a], c === u ? t = u : t !== u && (t += (c ?? "") + r[a + 1]), this._$AH[a] = c;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ut extends D {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class Tt extends D {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class Ht extends D {
  constructor(t, e, s, i, r) {
    super(t, e, s, i, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = S(this, t, e, 0) ?? u) === E) return;
    const s = this._$AH, i = t === u && s !== u || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, r = t !== u && (s === u || i);
    i && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Nt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    S(this, t);
  }
}
const Rt = I.litHtmlPolyfillSupport;
Rt?.(O, M), (I.litHtmlVersions ??= []).push("3.3.2");
const zt = (n, t, e) => {
  const s = e?.renderBefore ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const r = e?.renderBefore ?? null;
    s._$litPart$ = i = new M(t.insertBefore(C(), r), r, void 0, e ?? {});
  }
  return i._$AI(n), i;
};
const F = globalThis;
class A extends y {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = zt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return E;
  }
}
A._$litElement$ = !0, A.finalized = !0, F.litElementHydrateSupport?.({ LitElement: A });
const Dt = F.litElementPolyfillSupport;
Dt?.({ LitElement: A });
(F.litElementVersions ??= []).push("4.2.2");
const ct = (n) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(n, t);
  }) : customElements.define(n, t);
};
const jt = { attribute: !0, type: String, converter: T, reflect: !1, hasChanged: k }, Bt = (n = jt, t, e) => {
  const { kind: s, metadata: i } = e;
  let r = globalThis.litPropertyMetadata.get(i);
  if (r === void 0 && globalThis.litPropertyMetadata.set(i, r = /* @__PURE__ */ new Map()), s === "setter" && ((n = Object.create(n)).wrapped = !0), r.set(e.name, n), s === "accessor") {
    const { name: o } = e;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(o, a, n, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(o, void 0, n, l), l;
    } };
  }
  if (s === "setter") {
    const { name: o } = e;
    return function(l) {
      const a = this[o];
      t.call(this, l), this.requestUpdate(o, a, n, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function W(n) {
  return (t, e) => typeof e == "object" ? Bt(n, t, e) : ((s, i, r) => {
    const o = i.hasOwnProperty(r);
    return i.constructor.createProperty(r, s), o ? Object.getOwnPropertyDescriptor(i, r) : void 0;
  })(n, t, e);
}
function dt(n) {
  return W({ ...n, state: !0, attribute: !1 });
}
const Lt = _t`
  /* Dein CSS bleibt hier exakt gleich wie im Original */
  :host { 
    display: block;
    width: 450px;
    height: 300px;
  }
  .ha-card {
      background: transparent !important; 
      box-shadow: inset 2px 2px 5px rgba(0,0,0,0.5), inset -1px -1px 3px rgba(255,255,255,0.1) !important;
      backdrop-filter: blur(10px);
      padding: 20px;
      witdh: 100%;
      box-sizing: border-box;
  }
  .bms-svg {
    width: 100%;
    height: 100%;
  }
  .svg-title {
    fill: #808080; /* Grau */
    font-size: 36px;
    font-family: 'Poppins', sans-serif;
    font-weight: bold;
    text-anchor: middle; /* Anchor Middle */
  }

  /* WERTE (z.B. Spannung): Grau, 36px, Zentriert */
  .svg-main-val {
    fill: #808080; /* Grau */
    font-size: 36px;
    font-family: 'Poppins', sans-serif;
    font-weight: bold;
    text-anchor: middle;
  }

  /* Hilfs-Labels (kleiner) */
  .svg-sub-label {
    fill: rgba(255, 255, 255, 0.5);
    font-size: 14px;
    text-anchor: middle;
  }
`;
var kt = Object.defineProperty, It = Object.getOwnPropertyDescriptor, Z = (n, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? It(t, e) : t, r = n.length - 1, o; r >= 0; r--)
    (o = n[r]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && kt(t, e, i), i;
};
let N = class extends A {
  setConfig(n) {
    this._config = n;
  }
  _schema() {
    return [
      { name: "title", label: "Titel der Karte", selector: { text: {} } },
      {
        name: "entities",
        label: "Zellspannungen (Liste)",
        selector: { entity: { multiple: !0, domain: "sensor" } }
      },
      { name: "soc", label: "SoC", selector: { entity: {} } },
      { name: "status", label: "Status", selector: { entity: {} } },
      { name: "voltage", label: "Gesamtspannung", selector: { entity: {} } },
      { name: "remaining", label: "Verbl. Leistung", selector: { entity: {} } },
      { name: "celldiff", label: "Zellendifferenz", selector: { entity: {} } },
      { name: "cycles", label: "Zyklen", selector: { entity: {} } },
      { name: "temperature", label: "Temperatur", selector: { entity: {} } },
      {
        type: "grid",
        name: "",
        schema: [
          { name: "soc_bar", label: "Balken anzeigen", selector: { boolean: {} } },
          { name: "soc_dots", label: "Punkte anzeigen", selector: { boolean: {} } }
        ]
      }
    ];
  }
  _valueChanged(n) {
    if (!this._config || !this.hass) return;
    const t = n.detail.value;
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config: t },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    return !this.hass || !this._config ? b`` : b`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema()}
        .computeLabel=${(n) => n.label}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
};
Z([
  W({ attribute: !1 })
], N.prototype, "hass", 2);
Z([
  dt()
], N.prototype, "_config", 2);
N = Z([
  ct("glass-bms-card-editor")
], N);
var Vt = Object.defineProperty, Ft = Object.getOwnPropertyDescriptor, q = (n, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Ft(t, e) : t, r = n.length - 1, o; r >= 0; r--)
    (o = n[r]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && Vt(t, e, i), i;
};
let R = class extends A {
  static getConfigElement() {
    return document.createElement("glass-bms-card-editor");
  }
  static getStubConfig() {
    return {
      title: "BMS Status",
      entities: [],
      soc_bar: !0,
      soc_dots: !0
    };
  }
  setConfig(n) {
    if (!n.entities || n.entities.length === 0)
      throw new Error("Bitte definiere mindestens eine Zellenspannung!");
    this.config = n;
  }
  getCardSize() {
    return 6;
  }
  render() {
    if (!this.hass || !this.config) return b``;
    const { entities: n } = this.config, t = n.length;
    this.config.soc_bar, this.config.soc_dots, this.config.diff_alarm_active, this.config.diff_warn, this.config.diff_alarm, this.config.soc_warn, this.config.soc_warn_active;
    const e = this.config.soc ? this.hass.states[this.config.soc] : void 0, s = this.config.status ? this.hass.states[this.config.status] : void 0, i = this.config.voltage ? this.hass.states[this.config.voltage] : void 0, r = this.config.remaining ? this.hass.states[this.config.remaining] : void 0, o = this.config.celldiff ? this.hass.states[this.config.celldiff] : void 0, l = this.config.cycles ? this.hass.states[this.config.cycles] : void 0, a = this.config.temperature ? this.hass.states[this.config.temperature] : void 0, c = this.config.on_off ? this.hass.states[this.config.on_off] : void 0, d = this.config.balancer ? this.hass.states[this.config.balancer] : void 0, h = this.config.failure ? this.hass.states[this.config.failure] : void 0, p = this.config.title || "";
    i?.attributes?.unit_of_measurement, r?.attributes?.unit_of_measurement, e?.attributes?.unit_of_measurement, o?.attributes?.unit_of_measurement, a?.attributes?.unit_of_measurement;
    const f = t <= 8 ? t : Math.ceil(t / 2);
    n.slice(0, f), n.slice(f);
    const v = e ? parseFloat(e.state) : 0, ut = e ? v.toFixed(0) : "0", pt = i ? (Math.ceil(parseFloat(i.state) * 100) / 100).toFixed(2) : "0.00";
    r && r.state, a && (Math.ceil(parseFloat(a.state) * 10) / 10).toFixed(1), s && s.state, c && c.state, d && d.state, h && h.state;
    const ft = o ? parseFloat(o.state) : 0;
    return o && (Math.ceil(ft * 1e3) / 1e3).toFixed(3), l && parseInt(l.state), b`
      <ha-card>
        <svg viewBox="0 0 450 300" preserveAspectRatio="xMidYMid meet" class="bms-svg">
          
          <text x="225" y="40" text-anchor="middle" class="svg-title">${p}</text>

          <g transform="translate(225, 70)">

            <text x="0" y="0" text-anchor="middle" class="svg-main-val">${ut}%</text>
          </g>

          <text x="225" y="180" text-anchor="middle" class="svg-main-val">${pt} V</text>

        </svg>
      </ha-card>
    `;
  }
  renderSensor(n, t) {
    const e = this.hass.states[n];
    if (!e) return b`<div class="sensor-row error">Err</div>`;
    const s = e.attributes.unit_of_measurement || "", i = parseFloat(e.state).toFixed(3);
    return b`
      <div class="sensor-row">
        <span class="text-label">Zelle ${t}</span>
        <div class="value-container">
          <span class="cell-value">${i}</span>
          <span class="cell-unit">${s}</span>
        </div>
      </div>
    `;
  }
  static get styles() {
    return Lt;
  }
};
q([
  W({ attribute: !1 })
], R.prototype, "hass", 2);
q([
  dt()
], R.prototype, "config", 2);
R = q([
  ct("glass-bms-card")
], R);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "glass-bms-card",
  name: "Glass BMS Card",
  version: "1.0.0",
  preview: !0,
  description: "Eine Glass-Morphism Karte für BMS Daten"
});
export {
  R as GlassBmsCard
};
