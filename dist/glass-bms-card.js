const D = globalThis, G = D.ShadowRoot && (D.ShadyCSS === void 0 || D.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, K = /* @__PURE__ */ Symbol(), nt = /* @__PURE__ */ new WeakMap();
let gt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== K) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (G && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = nt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && nt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Ut = (n) => new gt(typeof n == "string" ? n : n + "", void 0, K), zt = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((s, i, r) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + n[r + 1], n[0]);
  return new gt(e, n, K);
}, Tt = (n, t) => {
  if (G) n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = D.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, n.appendChild(s);
  }
}, rt = G ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return Ut(e);
})(n) : n;
const { is: kt, defineProperty: Ht, getOwnPropertyDescriptor: Nt, getOwnPropertyNames: Dt, getOwnPropertySymbols: Rt, getPrototypeOf: jt } = Object, V = globalThis, ot = V.trustedTypes, Lt = ot ? ot.emptyScript : "", Bt = V.reactiveElementPolyfillSupport, U = (n, t) => n, R = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? Lt : null;
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
} }, X = (n, t) => !kt(n, t), at = { attribute: !0, type: String, converter: R, reflect: !1, useDefault: !1, hasChanged: X };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), V.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let w = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = at) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && Ht(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: r } = Nt(this.prototype, t) ?? { get() {
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
    return this.elementProperties.get(t) ?? at;
  }
  static _$Ei() {
    if (this.hasOwnProperty(U("elementProperties"))) return;
    const t = jt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(U("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(U("properties"))) {
      const e = this.properties, s = [...Dt(e), ...Rt(e)];
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
      for (const i of s) e.unshift(rt(i));
    } else t !== void 0 && e.push(rt(t));
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
    return Tt(t, this.constructor.elementStyles), t;
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
      const r = (s.converter?.toAttribute !== void 0 ? s.converter : R).toAttribute(e, s.type);
      this._$Em = t, r == null ? this.removeAttribute(i) : this.setAttribute(i, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const r = s.getPropertyOptions(i), o = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : R;
      this._$Em = i;
      const l = o.fromAttribute(e, r.type);
      this[i] = l ?? this._$Ej?.get(i) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, r) {
    if (t !== void 0) {
      const o = this.constructor;
      if (i === !1 && (r = this[t]), s ??= o.getPropertyOptions(t), !((s.hasChanged ?? X)(r, e) || s.useDefault && s.reflect && r === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, s)))) return;
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
w.elementStyles = [], w.shadowRootOptions = { mode: "open" }, w[U("elementProperties")] = /* @__PURE__ */ new Map(), w[U("finalized")] = /* @__PURE__ */ new Map(), Bt?.({ ReactiveElement: w }), (V.reactiveElementVersions ??= []).push("2.1.2");
const J = globalThis, lt = (n) => n, j = J.trustedTypes, ct = j ? j.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, $t = "$lit$", b = `lit$${Math.random().toFixed(9).slice(2)}$`, mt = "?" + b, It = `<${mt}>`, A = document, z = () => A.createComment(""), T = (n) => n === null || typeof n != "object" && typeof n != "function", Y = Array.isArray, Vt = (n) => Y(n) || typeof n?.[Symbol.iterator] == "function", Z = `[ 	
\f\r]`, M = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, ht = /-->/g, dt = />/g, v = RegExp(`>|${Z}(?:([^\\s"'>=/]+)(${Z}*=${Z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ut = /'/g, pt = /"/g, _t = /^(?:script|style|textarea|title)$/i, bt = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), L = bt(1), p = bt(2), E = /* @__PURE__ */ Symbol.for("lit-noChange"), f = /* @__PURE__ */ Symbol.for("lit-nothing"), ft = /* @__PURE__ */ new WeakMap(), x = A.createTreeWalker(A, 129);
function yt(n, t) {
  if (!Y(n) || !n.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ct !== void 0 ? ct.createHTML(t) : t;
}
const Ft = (n, t) => {
  const e = n.length - 1, s = [];
  let i, r = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = M;
  for (let l = 0; l < e; l++) {
    const a = n[l];
    let h, d, c = -1, u = 0;
    for (; u < a.length && (o.lastIndex = u, d = o.exec(a), d !== null); ) u = o.lastIndex, o === M ? d[1] === "!--" ? o = ht : d[1] !== void 0 ? o = dt : d[2] !== void 0 ? (_t.test(d[2]) && (i = RegExp("</" + d[2], "g")), o = v) : d[3] !== void 0 && (o = v) : o === v ? d[0] === ">" ? (o = i ?? M, c = -1) : d[1] === void 0 ? c = -2 : (c = o.lastIndex - d[2].length, h = d[1], o = d[3] === void 0 ? v : d[3] === '"' ? pt : ut) : o === pt || o === ut ? o = v : o === ht || o === dt ? o = M : (o = v, i = void 0);
    const g = o === v && n[l + 1].startsWith("/>") ? " " : "";
    r += o === M ? a + It : c >= 0 ? (s.push(h), a.slice(0, c) + $t + a.slice(c) + b + g) : a + b + (c === -2 ? l : g);
  }
  return [yt(n, r + (n[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class k {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let r = 0, o = 0;
    const l = t.length - 1, a = this.parts, [h, d] = Ft(t, e);
    if (this.el = k.createElement(h, s), x.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (i = x.nextNode()) !== null && a.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const c of i.getAttributeNames()) if (c.endsWith($t)) {
          const u = d[o++], g = i.getAttribute(c).split(b), $ = /([.?@])?(.*)/.exec(u);
          a.push({ type: 1, index: r, name: $[2], strings: g, ctor: $[1] === "." ? Zt : $[1] === "?" ? qt : $[1] === "@" ? Gt : F }), i.removeAttribute(c);
        } else c.startsWith(b) && (a.push({ type: 6, index: r }), i.removeAttribute(c));
        if (_t.test(i.tagName)) {
          const c = i.textContent.split(b), u = c.length - 1;
          if (u > 0) {
            i.textContent = j ? j.emptyScript : "";
            for (let g = 0; g < u; g++) i.append(c[g], z()), x.nextNode(), a.push({ type: 2, index: ++r });
            i.append(c[u], z());
          }
        }
      } else if (i.nodeType === 8) if (i.data === mt) a.push({ type: 2, index: r });
      else {
        let c = -1;
        for (; (c = i.data.indexOf(b, c + 1)) !== -1; ) a.push({ type: 7, index: r }), c += b.length - 1;
      }
      r++;
    }
  }
  static createElement(t, e) {
    const s = A.createElement("template");
    return s.innerHTML = t, s;
  }
}
function C(n, t, e = n, s) {
  if (t === E) return t;
  let i = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const r = T(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== r && (i?._$AO?.(!1), r === void 0 ? i = void 0 : (i = new r(n), i._$AT(n, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = i : e._$Cl = i), i !== void 0 && (t = C(n, i._$AS(n, t.values), i, s)), t;
}
class Wt {
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
    const { el: { content: e }, parts: s } = this._$AD, i = (t?.creationScope ?? A).importNode(e, !0);
    x.currentNode = i;
    let r = x.nextNode(), o = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let h;
        a.type === 2 ? h = new H(r, r.nextSibling, this, t) : a.type === 1 ? h = new a.ctor(r, a.name, a.strings, this, t) : a.type === 6 && (h = new Kt(r, this, t)), this._$AV.push(h), a = s[++l];
      }
      o !== a?.index && (r = x.nextNode(), o++);
    }
    return x.currentNode = A, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class H {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = i?.isConnected ?? !0;
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
    t = C(this, t, e), T(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== E && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Vt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== f && T(this._$AH) ? this._$AA.nextSibling.data = t : this.T(A.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = k.createElement(yt(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === i) this._$AH.p(e);
    else {
      const r = new Wt(i, this), o = r.u(this.options);
      r.p(e), this.T(o), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = ft.get(t.strings);
    return e === void 0 && ft.set(t.strings, e = new k(t)), e;
  }
  k(t) {
    Y(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const r of t) i === e.length ? e.push(s = new H(this.O(z()), this.O(z()), this, this.options)) : s = e[i], s._$AI(r), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = lt(t).nextSibling;
      lt(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class F {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, r) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = f;
  }
  _$AI(t, e = this, s, i) {
    const r = this.strings;
    let o = !1;
    if (r === void 0) t = C(this, t, e, 0), o = !T(t) || t !== this._$AH && t !== E, o && (this._$AH = t);
    else {
      const l = t;
      let a, h;
      for (t = r[0], a = 0; a < r.length - 1; a++) h = C(this, l[s + a], e, a), h === E && (h = this._$AH[a]), o ||= !T(h) || h !== this._$AH[a], h === f ? t = f : t !== f && (t += (h ?? "") + r[a + 1]), this._$AH[a] = h;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Zt extends F {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === f ? void 0 : t;
  }
}
class qt extends F {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== f);
  }
}
class Gt extends F {
  constructor(t, e, s, i, r) {
    super(t, e, s, i, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = C(this, t, e, 0) ?? f) === E) return;
    const s = this._$AH, i = t === f && s !== f || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, r = t !== f && (s === f || i);
    i && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Kt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    C(this, t);
  }
}
const Xt = J.litHtmlPolyfillSupport;
Xt?.(k, H), (J.litHtmlVersions ??= []).push("3.3.2");
const Jt = (n, t, e) => {
  const s = e?.renderBefore ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const r = e?.renderBefore ?? null;
    s._$litPart$ = i = new H(t.insertBefore(z(), r), r, void 0, e ?? {});
  }
  return i._$AI(n), i;
};
const Q = globalThis;
class S extends w {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Jt(e, this.renderRoot, this.renderOptions);
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
S._$litElement$ = !0, S.finalized = !0, Q.litElementHydrateSupport?.({ LitElement: S });
const Yt = Q.litElementPolyfillSupport;
Yt?.({ LitElement: S });
(Q.litElementVersions ??= []).push("4.2.2");
const vt = (n) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(n, t);
  }) : customElements.define(n, t);
};
const Qt = { attribute: !0, type: String, converter: R, reflect: !1, hasChanged: X }, te = (n = Qt, t, e) => {
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
function tt(n) {
  return (t, e) => typeof e == "object" ? te(n, t, e) : ((s, i, r) => {
    const o = i.hasOwnProperty(r);
    return i.constructor.createProperty(r, s), o ? Object.getOwnPropertyDescriptor(i, r) : void 0;
  })(n, t, e);
}
function xt(n) {
  return tt({ ...n, state: !0, attribute: !1 });
}
const ee = zt`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
  
  :host {
    display: block;
    background: transparent !important;
    --ha-card-background: transparent;
    --ha-card-box-shadow: none;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }
  ha-card {
    background-color: transparent !important;
    border-radius: 20px;
    box-shadow: inset 2px 2px 5px rgba(0,0,0,0.5), inset -1px -1px 3px rgba(255,255,255,0.1) !important;
    padding: 16px;
    display: block;
    /* backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); */
  }
  svg {
    display: block;
    width: 100%;
    height: auto;
    background: transparent !important; /* Erzwingt Transparenz für das SVG-Feld */
    font-family: 'Inter', sans-serif;
  } 
  svg text {
    font-family: 'Inter', sans-serif !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }
  .title-text {
    text-anchor: middle;
    fill: rgba(255, 255, 255, 0.5);
    font-size: 36px;
  }
  .cell-box {
    fill: #1a1d21; /* #1a1d21;  Dunkel für Neumorphismus */
    stroke: rgba(0, 0, 0, 0.2);
    stroke-width: 1;
    transition: all 0.5s ease; /* Macht den Wechsel zum Glow-Filter geschmeidig */
  }
  .cell-value { 
    fill: #00d2ff; 
    font-weight: 700; 
    font-size: 10px;
    text-shadow: 0 0 5px rgba(0, 210, 255, 0.3); /* Zusätzlicher Text-Glow */
  }
  .cell-small-label {
    text-anchor: start;
    font-size: 7px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    fill: rgba(255, 255, 255, 0.5);
  }
  .text-label { 
    fill: rgba(255, 255, 255, 0.5); 
    font-size: 8px; 
    font-weight: bold 
  }
  .text-label.warn {
    fill: rgba(255, 165, 0, 0.7);
  }
  .text-label.alarm {
    fill: rgba(255,0,0,0.8); 
  }
  .soc-value-big {
    fill: rgba(255, 255, 255, 0.5);
    font-weight: 700;
  }
  .soc-bar-fill {
    fill: #00d2ff;
    filter: drop-shadow(0 0 3px #00d2ff);
    transition: width 1s ease-in-out; /* Animiert den Balken bei Wertänderung */
  }
  @keyframes blink {
    0% { opacity: 0.2; }
    50% { opacity: 1; filter: drop-shadow(0 0 5px #00d2ff); }
    100% { opacity: 0.2; }
  }
  .charging-dot {
    animation: blink 1.5s infinite ease-in-out;
  }
`;
var se = Object.defineProperty, ie = Object.getOwnPropertyDescriptor, et = (n, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? ie(t, e) : t, r = n.length - 1, o; r >= 0; r--)
    (o = n[r]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && se(t, e, i), i;
};
let B = class extends S {
  setConfig(n) {
    this._config = n;
  }
  _schema() {
    return [
      { name: "title", label: "Titel der Karte", selector: { text: {} } },
      {
        name: "language",
        label: "Sprache (Language)",
        selector: {
          select: {
            options: [
              { value: "", label: "Auto (System)" },
              { value: "de", label: "Deutsch" },
              { value: "en", label: "English" }
            ],
            mode: "dropdown"
          }
        }
      },
      {
        name: "entities",
        label: "Zellspannungen",
        selector: { entity: { multiple: !0, domain: "sensor" } }
      },
      {
        type: "grid",
        name: "",
        title: "Haupt-Sensoren",
        schema: [
          { name: "soc", label: "SoC", selector: { entity: {} } },
          { name: "voltage", label: "Gesamtspannung", selector: { entity: {} } },
          { name: "remaining", label: "Verbl. Leistung", selector: { entity: {} } },
          { name: "celldiff", label: "Zellendifferenz", selector: { entity: {} } }
        ]
      },
      {
        type: "grid",
        title: "Info-Sensoren",
        name: "",
        schema: [
          { name: "celldiff", label: "Zellendifferenz", selector: { entity: { domain: "sensor" } } },
          { name: "cycles", label: "Ladezyklen", selector: { entity: { domain: "sensor" } } },
          { name: "case_temp", label: "Case-Temperatur", selector: { entity: { domain: "sensor" } } },
          { name: "status", label: "Status", selector: { entity: {} } },
          { name: "failure", label: "Fehlermeldung-Sensor", selector: { entity: { domain: "sensor" } } }
        ]
      },
      {
        type: "grid",
        title: "Anzeige-Optionen",
        name: "",
        schema: [
          { name: "soc_bar", label: "Balken anzeigen", selector: { boolean: {} } },
          { name: "soc_dots", label: "Punkte anzeigen", selector: { boolean: {} } }
        ]
      },
      {
        type: "expandable",
        title: "Alarm-Einstellung (Zell-Differenz)",
        schema: [
          { name: "diff_alarm_active", label: "Alarme aktivieren", selector: { boolean: {} } },
          { name: "diff_warn", label: "Warnschwelle (Standard 0.05)", selector: { number: { step: 1e-3, mode: "box" } } },
          { name: "diff_alarm", label: "Alarmschwelle (Standard 0.10)", selector: { number: { step: 1e-3, mode: "box" } } }
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
    return !this.hass || !this._config ? L`` : L`
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
et([
  tt({ attribute: !1 })
], B.prototype, "hass", 2);
et([
  xt()
], B.prototype, "_config", 2);
B = et([
  vt("glass-bms-card-editor")
], B);
const At = { voltage: "Spannung", remaining: "Restenergie", celldiff: "Zelldifferenz", cycles: "Zyklen", case: "Gehäuse", cell: "Zelle" }, wt = { charging: "Laden", discharging: "Entladen", standby: "Standby" }, St = { no_entities: "Bitte definiere mindestens einen Sensor!" }, ne = {
  common: At,
  status: wt,
  error: St
}, re = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  common: At,
  default: ne,
  error: St,
  status: wt
}, Symbol.toStringTag, { value: "Module" })), Et = { voltage: "Voltage", remaining: "Remaining", celldiff: "Cell Diff", cycles: "Cycles", case: "Case", cell: "Cell" }, Ct = { charging: "Charging", discharging: "Discharging", standby: "Standby" }, Pt = { no_entities: "Please define at least one sensor!" }, oe = {
  common: Et,
  status: Ct,
  error: Pt
}, ae = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  common: Et,
  default: oe,
  error: Pt,
  status: Ct
}, Symbol.toStringTag, { value: "Module" })), q = {
  de: re,
  en: ae
};
function m(n, t = "", e = "") {
  const s = (localStorage.getItem("selectedLanguage") || "en").replace(/['"]+/g, "");
  let i;
  try {
    i = n.split(".").reduce((r, o) => r[o], q[s]);
  } catch {
    i = n.split(".").reduce((o, l) => o[l], q.en);
  }
  return i === void 0 && (i = n.split(".").reduce((r, o) => r[o], q.en)), t !== "" && e !== "" && (i = i.replace(t, e)), i || n;
}
var le = Object.defineProperty, ce = Object.getOwnPropertyDescriptor, st = (n, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? ce(t, e) : t, r = n.length - 1, o; r >= 0; r--)
    (o = n[r]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && le(t, e, i), i;
};
let I = class extends S {
  constructor() {
    if (super(), !document.getElementById("google-fonts-inter")) {
      const n = document.createElement("link");
      n.id = "google-fonts-inter", n.rel = "stylesheet", n.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap", document.head.appendChild(n);
    }
  }
  static getConfigElement() {
    return document.createElement("glass-bms-card-editor");
  }
  static getStubConfig() {
    return {
      title: "BMS Status",
      entities: [],
      language: "de"
    };
  }
  setConfig(n) {
    if (!n.entities || n.entities.length === 0) {
      const t = n.language || (this.hass ? this.hass.language : "en");
      throw new Error(m("error.no_entities", t));
    }
    this.config = { ...n }, this.requestUpdate();
  }
  getCardSize() {
    return 1;
  }
  // Hilfs-Getter für die aktuelle Sprache
  get _selectedLanguage() {
    return (this.config.language || this.hass.language || "en").split("-")[0];
  }
  _renderTitleRow(n, t) {
    const e = this.config.title;
    return p`
      ${this.config.title ? p`
        <text x="${n}" y="${t}" class="title-text">${e}</text>
      ` : ""}
    `;
  }
  _showMoreInfo(n, t) {
    if (!t || !this.hass) return;
    n.stopPropagation();
    const e = new CustomEvent("hass-more-info", {
      detail: { entityId: t },
      bubbles: !0,
      composed: !0
    });
    this.dispatchEvent(e);
  }
  _renderCell(n, t, e, s, i, r) {
    if (!s || !this.hass.states[s]) return p``;
    const o = this.hass.states[s], l = parseFloat(o.state).toFixed(3), a = o.attributes.unit_of_measurement, h = r ? 74 : 6, d = r ? 6 : 74, c = r ? "end" : "start", u = r ? "start" : "end";
    return p`
      <g transform="translate(${n}, ${t})" @click=${(g) => this._showMoreInfo(g, s)} style="cursor: pointer;">
        <rect width="80" height="20" rx="10" class="cell-box" style="filter: url(#${i});" />
        <text x="${h}" y="13.5" class="text-label" text-anchor="${c}">
          ${m("common.cell", this.hass.language)} ${e + 1}
        </text>
        <text x="${d}" y="13.5" class="cell-value" text-anchor="${u}">${l}<tspan dx="1" dy="-3" font-size="6">${a}</tspan></text>
      </g>  
    `;
  }
  _renderCellBig(n, t, e, s, i = 0) {
    const r = this.hass.states[e];
    if (!r) return p``;
    const o = r.state, l = r.attributes.unit_of_measurement || "", a = parseFloat(o), h = !isNaN(a), d = h ? a.toFixed(i) : o;
    let c = "";
    if (e === this.config.celldiff && this.config.diff_alarm_active) {
      const u = this.config.diff_warn || 0.05, g = this.config.diff_alarm || 0.1;
      a > g ? c = "alarm" : a > u && (c = "warn");
    }
    return p`
      <g transform="translate(${n}, ${t})" @click=${(u) => this._showMoreInfo(u, e)} style="cursor: pointer;">
        <text x="0" y="0" text-anchor="middle">
          <tspan class="text-label ${c}" style="font-size: 16px;">${d}</tspan>
          <tspan class="text-label ${c}" style="font-size: 10px; dx="3";">${h ? l : ""}</tspan>
        </text>
        
        <text x="0" y="15" text-anchor="middle" style="fill: rgba(255,255,255,0.5); font-size: 7px; text-transform: uppercase; letter-spacing: 0.5px;">
          ${s}
        </text>
      </g>
    `;
  }
  _renderCellSmall(n, t, e, s, i = 0, r = !1) {
    const o = this.hass.states[e], l = o ? o.state : "N/A", a = o ? o.attributes.unit_of_measurement : "", h = parseFloat(l), d = !isNaN(h), c = d ? h.toFixed(i) : l;
    return p`
      <g transform="translate(${n}, ${t})" @click=${(u) => this._showMoreInfo(u, e)} style="cursor: pointer;">
        <text x="0" y="0" text-anchor="start">
          <tspan class="cell-small-label">${s}:</tspan>
          <tspan dy="1" class="text-label" style="font-size: 12px;">
            ${c}
          </tspan>
          ${r && d ? p`
            <tspan dy="-2" class="text-label" style="font-size: 8px;">${a}</tspan>
          ` : ""}
        </text>
      </g>
    `;
  }
  _renderSocDisplay(n, t, e, s) {
    const i = e.toFixed(0), { soc_bar: r, soc_dots: o } = this.config, l = s === "Laden" || s === "Charging", a = [100, 80, 60, 40, 20], h = 120, d = 4, c = -h / 2, u = 15, g = Math.min(100, Math.max(0, e)) / 100 * h;
    return p`
      <g id="soc-display" transform="translate(${n}, ${t})">
        ${this.config.soc ? p`
          <g @click=${($) => this._showMoreInfo($, this.config.soc)} style="cursor: pointer;">
            <text x="0" y="0" text-anchor="middle" class="soc-value-big" style="font-size: 36px;">
              ${i}%
            </text>
          </g>

          ${r ? p`
            <rect x="${c}" y="${u}" width="${h}" height="${d}" rx="${d / 2}" fill="rgba(255,255,255,0.1)" />
            <rect class="soc-bar-fill" x="${c}" y="${u}" width="${g}" height="${d}" rx="${d / 2}" />
          ` : ""}

          ${o ? p`
            ${a.map(($, y) => {
      const P = e >= $, N = l && !P && (y === a.length - 1 || e >= a[y + 1]), W = 40 + y * 18;
      return p`
                <circle 
                  cx="0" cy="${W}" r="3" 
                  fill="${P || N ? "#00d2ff" : "rgba(255,255,255,0.1)"}"
                  class="${N ? "charging-dot" : ""}"
                  style="${P ? "filter: drop-shadow(0 0 3px #00d2ff);" : ""} transition: all 0.5s ease;"
                />`;
    })}` : ""}
        ` : ""}

        ${s ? p`
          <text x="0" y="140" text-anchor="middle" class="text-label" style="font-size: 10px;">
            ${s}
          </text>
        ` : ""}
      </g>
    `;
  }
  _renderMeasurements(n, t, e) {
    if (e.length === 0) return p``;
    const s = 70, i = e.length;
    return p`
      <g id="measurements-cells" transform="translate(${n}, ${t})">
        ${e.map((r, o) => {
      const l = (o - (i - 1) / 2) * s;
      return this._renderCellBig(
        l,
        0,
        r.id,
        r.label,
        r.dec
      );
    })}
      </g>
    `;
  }
  _renderInfoStates(n, t, e) {
    if (e.length === 0) return p``;
    const s = 15;
    return p`
      <g id="InfoStates" transform="translate(${n}, ${t})">
        ${e.map((i, r) => {
      const o = -10 - r * s;
      return this._renderCellSmall(
        0,
        o,
        i.id,
        i.label,
        i.dec,
        i.show_uom
      );
    })}
      </g>
    `;
  }
  _renderFailureState(n, t, e) {
    return p`
      ${e ? p`
        <text x="${n}" y="${t}" text-anchor="middle" class="text-label warn" style="font-size: 10px;">
          ${e}
        </text>
      ` : ""}
    `;
  }
  shouldUpdate(n) {
    return n.has("config") ? !0 : n.has("hass");
  }
  render() {
    if (!this.hass || !this.config) return L``;
    const n = this._selectedLanguage, t = 400, e = 350, s = 15, i = 80, r = 80, o = t - s - i, { entities: l } = this.config, a = l.length, h = [
      { id: this.config.voltage, label: m("common.voltage", n), dec: 1 },
      { id: this.config.remaining, label: m("common.remaining", n), dec: 1 },
      { id: this.config.celldiff, label: m("common.celldiff", n), dec: 3 }
    ].filter((_) => _.id && this.hass.states[_.id]), d = [
      { id: this.config.cycles, label: m("common.cycles", n), dec: 0, show_uom: !1 },
      { id: this.config.case_temp, label: m("common.case", n), dec: 0, show_uom: !0 }
    ].filter((_) => _.id && this.hass.states[_.id]), c = this.config.soc ? this.hass.states[this.config.soc] : null, u = this.config.failure ? this.hass.states[this.config.failure] : null, g = this.config.status ? this.hass.states[this.config.status] : null, $ = {
      Charge: m("status.charging", n),
      Discharge: m("status.discharging", n),
      "Standby Mode": m("status.standby", n)
    }, y = a <= 8 ? a : Math.ceil(a / 2), P = l.slice(0, y), N = l.slice(y), W = c ? parseFloat(c.state) : 0, it = g ? g.state : "", Ot = $[it] || it, Mt = u ? u.state : "";
    return L`
      <ha-card>
        <svg 
          viewBox="0 0 ${t} ${e}" 
          xmlns="http://www.w3.org/2000/svg"
          style="font-family: 'Inter', sans-serif !important;">
          <defs>
            <filter id="bevel-filter" x="-20%" y="-20%" width="140%" height="140%">
               <feDropShadow dx="1" dy="1" stdDeviation="1" flood-color="#000" />
               <feDropShadow dx="-1" dy="-1" stdDeviation="1" flood-color="#fff" flood-opacity="0.2" />
            </filter>
          </defs>

          <g id="top-row" transform="translate(${t / 2}, 30)">
            ${this._renderTitleRow(0, 0)}
            ${this._renderInfoStates(125, 30, d)}
          </g>
          <g id="left-column" transform="translate(${s}, ${r})">
            ${P.map((_, O) => this._renderCell(0, O * 32, O, _, "bevel-filter", !1))}
          </g>

          ${this._renderSocDisplay(t / 2, r + 20, W, Ot)}

          ${this._renderMeasurements(t / 2, r + 180, h)}
          
          ${this._renderFailureState(t / 2, r + 260, Mt)}


          <g id="right-column" transform="translate(${o}, ${r})">
            ${N.map((_, O) => this._renderCell(0, O * 32, O + y, _, "bevel-filter", !0))}
          </g>

        </svg>
      </ha-card>
    `;
  }
  static get styles() {
    return ee;
  }
};
st([
  tt({ attribute: !1 })
], I.prototype, "hass", 2);
st([
  xt()
], I.prototype, "config", 2);
I = st([
  vt("glass-bms-card")
], I);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "glass-bms-card",
  name: "Glass BMS Card",
  author: "SirUlbrich",
  version: "1.1.1",
  preview: !0,
  description: "Eine Glass-Morphism Karte für BMS Daten"
});
export {
  I as GlassBmsCard
};
