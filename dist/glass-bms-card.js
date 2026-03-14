const R = globalThis, Z = R.ShadowRoot && (R.ShadyCSS === void 0 || R.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, q = /* @__PURE__ */ Symbol(), et = /* @__PURE__ */ new WeakMap();
let pt = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== q) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Z && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = et.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && et.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const vt = (r) => new pt(typeof r == "string" ? r : r + "", void 0, q), At = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, n) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[n + 1], r[0]);
  return new pt(e, r, q);
}, wt = (r, t) => {
  if (Z) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = R.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, st = Z ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return vt(e);
})(r) : r;
const { is: St, defineProperty: Et, getOwnPropertyDescriptor: Ct, getOwnPropertyNames: Pt, getOwnPropertySymbols: Mt, getPrototypeOf: Ot } = Object, V = globalThis, it = V.trustedTypes, Ut = it ? it.emptyScript : "", Tt = V.reactiveElementPolyfillSupport, O = (r, t) => r, D = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? Ut : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, G = (r, t) => !St(r, t), rt = { attribute: !0, type: String, converter: D, reflect: !1, useDefault: !1, hasChanged: G };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), V.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let v = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = rt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = /* @__PURE__ */ Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && Et(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: n } = Ct(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: i, set(o) {
      const l = i?.call(this);
      n?.call(this, o), this.requestUpdate(t, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? rt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(O("elementProperties"))) return;
    const t = Ot(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(O("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(O("properties"))) {
      const e = this.properties, s = [...Pt(e), ...Mt(e)];
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
      for (const i of s) e.unshift(st(i));
    } else t !== void 0 && e.push(st(t));
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
    return wt(t, this.constructor.elementStyles), t;
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
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : D).toAttribute(e, s.type);
      this._$Em = t, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const n = s.getPropertyOptions(i), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : D;
      this._$Em = i;
      const l = o.fromAttribute(e, n.type);
      this[i] = l ?? this._$Ej?.get(i) ?? l, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, n) {
    if (t !== void 0) {
      const o = this.constructor;
      if (i === !1 && (n = this[t]), s ??= o.getPropertyOptions(t), !((s.hasChanged ?? G)(n, e) || s.useDefault && s.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: n }, o) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
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
        for (const [i, n] of this._$Ep) this[i] = n;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [i, n] of s) {
        const { wrapped: o } = n, l = this[i];
        o !== !0 || this._$AL.has(i) || l === void 0 || this.C(i, void 0, n, l);
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
v.elementStyles = [], v.shadowRootOptions = { mode: "open" }, v[O("elementProperties")] = /* @__PURE__ */ new Map(), v[O("finalized")] = /* @__PURE__ */ new Map(), Tt?.({ ReactiveElement: v }), (V.reactiveElementVersions ??= []).push("2.1.2");
const K = globalThis, nt = (r) => r, B = K.trustedTypes, ot = B ? B.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, ut = "$lit$", _ = `lit$${Math.random().toFixed(9).slice(2)}$`, ft = "?" + _, zt = `<${ft}>`, x = document, U = () => x.createComment(""), T = (r) => r === null || typeof r != "object" && typeof r != "function", X = Array.isArray, Nt = (r) => X(r) || typeof r?.[Symbol.iterator] == "function", W = `[ 	
\f\r]`, M = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, at = /-->/g, lt = />/g, y = RegExp(`>|${W}(?:([^\\s"'>=/]+)(${W}*=${W}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ht = /'/g, ct = /"/g, $t = /^(?:script|style|textarea|title)$/i, gt = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), j = gt(1), u = gt(2), w = /* @__PURE__ */ Symbol.for("lit-noChange"), f = /* @__PURE__ */ Symbol.for("lit-nothing"), dt = /* @__PURE__ */ new WeakMap(), b = x.createTreeWalker(x, 129);
function mt(r, t) {
  if (!X(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ot !== void 0 ? ot.createHTML(t) : t;
}
const kt = (r, t) => {
  const e = r.length - 1, s = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = M;
  for (let l = 0; l < e; l++) {
    const a = r[l];
    let c, d, h = -1, p = 0;
    for (; p < a.length && (o.lastIndex = p, d = o.exec(a), d !== null); ) p = o.lastIndex, o === M ? d[1] === "!--" ? o = at : d[1] !== void 0 ? o = lt : d[2] !== void 0 ? ($t.test(d[2]) && (i = RegExp("</" + d[2], "g")), o = y) : d[3] !== void 0 && (o = y) : o === y ? d[0] === ">" ? (o = i ?? M, h = -1) : d[1] === void 0 ? h = -2 : (h = o.lastIndex - d[2].length, c = d[1], o = d[3] === void 0 ? y : d[3] === '"' ? ct : ht) : o === ct || o === ht ? o = y : o === at || o === lt ? o = M : (o = y, i = void 0);
    const $ = o === y && r[l + 1].startsWith("/>") ? " " : "";
    n += o === M ? a + zt : h >= 0 ? (s.push(c), a.slice(0, h) + ut + a.slice(h) + _ + $) : a + _ + (h === -2 ? l : $);
  }
  return [mt(r, n + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class z {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let n = 0, o = 0;
    const l = t.length - 1, a = this.parts, [c, d] = kt(t, e);
    if (this.el = z.createElement(c, s), b.currentNode = this.el.content, e === 2 || e === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = b.nextNode()) !== null && a.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const h of i.getAttributeNames()) if (h.endsWith(ut)) {
          const p = d[o++], $ = i.getAttribute(h).split(_), g = /([.?@])?(.*)/.exec(p);
          a.push({ type: 1, index: n, name: g[2], strings: $, ctor: g[1] === "." ? Rt : g[1] === "?" ? Dt : g[1] === "@" ? Bt : F }), i.removeAttribute(h);
        } else h.startsWith(_) && (a.push({ type: 6, index: n }), i.removeAttribute(h));
        if ($t.test(i.tagName)) {
          const h = i.textContent.split(_), p = h.length - 1;
          if (p > 0) {
            i.textContent = B ? B.emptyScript : "";
            for (let $ = 0; $ < p; $++) i.append(h[$], U()), b.nextNode(), a.push({ type: 2, index: ++n });
            i.append(h[p], U());
          }
        }
      } else if (i.nodeType === 8) if (i.data === ft) a.push({ type: 2, index: n });
      else {
        let h = -1;
        for (; (h = i.data.indexOf(_, h + 1)) !== -1; ) a.push({ type: 7, index: n }), h += _.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = x.createElement("template");
    return s.innerHTML = t, s;
  }
}
function S(r, t, e = r, s) {
  if (t === w) return t;
  let i = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const n = T(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== n && (i?._$AO?.(!1), n === void 0 ? i = void 0 : (i = new n(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = i : e._$Cl = i), i !== void 0 && (t = S(r, i._$AS(r, t.values), i, s)), t;
}
class Ht {
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
    const { el: { content: e }, parts: s } = this._$AD, i = (t?.creationScope ?? x).importNode(e, !0);
    b.currentNode = i;
    let n = b.nextNode(), o = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let c;
        a.type === 2 ? c = new N(n, n.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (c = new jt(n, this, t)), this._$AV.push(c), a = s[++l];
      }
      o !== a?.index && (n = b.nextNode(), o++);
    }
    return b.currentNode = x, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class N {
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
    t = S(this, t, e), T(t) ? t === f || t == null || t === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : t !== this._$AH && t !== w && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Nt(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== f && T(this._$AH) ? this._$AA.nextSibling.data = t : this.T(x.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = z.createElement(mt(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === i) this._$AH.p(e);
    else {
      const n = new Ht(i, this), o = n.u(this.options);
      n.p(e), this.T(o), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = dt.get(t.strings);
    return e === void 0 && dt.set(t.strings, e = new z(t)), e;
  }
  k(t) {
    X(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const n of t) i === e.length ? e.push(s = new N(this.O(U()), this.O(U()), this, this.options)) : s = e[i], s._$AI(n), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = nt(t).nextSibling;
      nt(t).remove(), t = s;
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
  constructor(t, e, s, i, n) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = f;
  }
  _$AI(t, e = this, s, i) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = S(this, t, e, 0), o = !T(t) || t !== this._$AH && t !== w, o && (this._$AH = t);
    else {
      const l = t;
      let a, c;
      for (t = n[0], a = 0; a < n.length - 1; a++) c = S(this, l[s + a], e, a), c === w && (c = this._$AH[a]), o ||= !T(c) || c !== this._$AH[a], c === f ? t = f : t !== f && (t += (c ?? "") + n[a + 1]), this._$AH[a] = c;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Rt extends F {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === f ? void 0 : t;
  }
}
class Dt extends F {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== f);
  }
}
class Bt extends F {
  constructor(t, e, s, i, n) {
    super(t, e, s, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = S(this, t, e, 0) ?? f) === w) return;
    const s = this._$AH, i = t === f && s !== f || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== f && (s === f || i);
    i && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class jt {
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
const It = K.litHtmlPolyfillSupport;
It?.(z, N), (K.litHtmlVersions ??= []).push("3.3.2");
const Lt = (r, t, e) => {
  const s = e?.renderBefore ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const n = e?.renderBefore ?? null;
    s._$litPart$ = i = new N(t.insertBefore(U(), n), n, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
const J = globalThis;
class A extends v {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Lt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return w;
  }
}
A._$litElement$ = !0, A.finalized = !0, J.litElementHydrateSupport?.({ LitElement: A });
const Vt = J.litElementPolyfillSupport;
Vt?.({ LitElement: A });
(J.litElementVersions ??= []).push("4.2.2");
const _t = (r) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(r, t);
  }) : customElements.define(r, t);
};
const Ft = { attribute: !0, type: String, converter: D, reflect: !1, hasChanged: G }, Wt = (r = Ft, t, e) => {
  const { kind: s, metadata: i } = e;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), s === "setter" && ((r = Object.create(r)).wrapped = !0), n.set(e.name, r), s === "accessor") {
    const { name: o } = e;
    return { set(l) {
      const a = t.get.call(this);
      t.set.call(this, l), this.requestUpdate(o, a, r, !0, l);
    }, init(l) {
      return l !== void 0 && this.C(o, void 0, r, l), l;
    } };
  }
  if (s === "setter") {
    const { name: o } = e;
    return function(l) {
      const a = this[o];
      t.call(this, l), this.requestUpdate(o, a, r, !0, l);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function Y(r) {
  return (t, e) => typeof e == "object" ? Wt(r, t, e) : ((s, i, n) => {
    const o = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, s), o ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(r, t, e);
}
function yt(r) {
  return Y({ ...r, state: !0, attribute: !1 });
}
const Zt = At`
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
var qt = Object.defineProperty, Gt = Object.getOwnPropertyDescriptor, Q = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Gt(t, e) : t, n = r.length - 1, o; n >= 0; n--)
    (o = r[n]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && qt(t, e, i), i;
};
let I = class extends A {
  setConfig(r) {
    this._config = r;
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
  _valueChanged(r) {
    if (!this._config || !this.hass) return;
    const t = r.detail.value;
    this.dispatchEvent(new CustomEvent("config-changed", {
      detail: { config: t },
      bubbles: !0,
      composed: !0
    }));
  }
  render() {
    return !this.hass || !this._config ? j`` : j`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${this._schema()}
        .computeLabel=${(r) => r.label}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
};
Q([
  Y({ attribute: !1 })
], I.prototype, "hass", 2);
Q([
  yt()
], I.prototype, "_config", 2);
I = Q([
  _t("glass-bms-card-editor")
], I);
var Kt = Object.defineProperty, Xt = Object.getOwnPropertyDescriptor, tt = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Xt(t, e) : t, n = r.length - 1, o; n >= 0; n--)
    (o = r[n]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && Kt(t, e, i), i;
};
let L = class extends A {
  constructor() {
    if (super(), !document.getElementById("google-fonts-inter")) {
      const r = document.createElement("link");
      r.id = "google-fonts-inter", r.rel = "stylesheet", r.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap", document.head.appendChild(r);
    }
  }
  static getConfigElement() {
    return document.createElement("glass-bms-card-editor");
  }
  static getStubConfig() {
    return {
      title: "BMS Status",
      entities: [],
      soc: "sensor.soc",
      soc_bar: !0,
      soc_dots: !0
    };
  }
  setConfig(r) {
    if (!r.entities || r.entities.length === 0)
      throw new Error("Bitte definiere mindestens einen Sensor - sensor.xxx!");
    this.config = { ...r }, this.requestUpdate();
  }
  getCardSize() {
    return 1;
  }
  _renderTitleRow(r, t) {
    const e = this.config.title;
    return u`
      ${this.config.title ? u`
        <text x="${r}" y="${t}" class="title-text">${e}</text>
      ` : ""}
    `;
  }
  _showMoreInfo(r, t) {
    if (!t || !this.hass) return;
    r.stopPropagation();
    const e = new CustomEvent("hass-more-info", {
      detail: { entityId: t },
      bubbles: !0,
      composed: !0
    });
    this.dispatchEvent(e);
  }
  _renderCell(r, t, e, s, i, n) {
    if (!s || !this.hass.states[s]) return u``;
    const o = this.hass.states[s], l = parseFloat(o.state).toFixed(3), a = o.attributes.unit_of_measurement, c = n ? 74 : 6, d = n ? 6 : 74, h = n ? "end" : "start", p = n ? "start" : "end";
    return u`
      <g transform="translate(${r}, ${t})" @click=${($) => this._showMoreInfo($, s)} style="cursor: pointer;">
        <rect width="80" height="20" rx="10" class="cell-box" style="filter: url(#${i});" />
        <text x="${c}" y="13.5" class="text-label" text-anchor="${h}">Zelle ${e + 1}</text>
        <text x="${d}" y="13.5" class="cell-value" text-anchor="${p}">${l}<tspan dx="1" dy="-3" font-size="6">${a}</tspan></text>
      </g>  
    `;
  }
  _renderCellBig(r, t, e, s, i = 0) {
    const n = this.hass.states[e];
    if (!n) return u``;
    const o = n.state, l = n.attributes.unit_of_measurement || "", a = parseFloat(o), c = !isNaN(a), d = c ? a.toFixed(i) : o;
    let h = "";
    if (e === this.config.celldiff && this.config.diff_alarm_active) {
      const p = this.config.diff_warn || 0.05, $ = this.config.diff_alarm || 0.1;
      a > $ ? h = "alarm" : a > p && (h = "warn");
    }
    return u`
      <g transform="translate(${r}, ${t})" @click=${(p) => this._showMoreInfo(p, e)} style="cursor: pointer;">
        <text x="0" y="0" text-anchor="middle">
          <tspan class="text-label ${h}" style="font-size: 16px;">${d}</tspan>
          <tspan class="text-label ${h}" style="font-size: 10px; dx="3";">${c ? l : ""}</tspan>
        </text>
        
        <text x="0" y="15" text-anchor="middle" style="fill: rgba(255,255,255,0.5); font-size: 7px; text-transform: uppercase; letter-spacing: 0.5px;">
          ${s}
        </text>
      </g>
    `;
  }
  _renderCellSmall(r, t, e, s, i = 0, n = !1) {
    const o = this.hass.states[e], l = o ? o.state : "N/A", a = o ? o.attributes.unit_of_measurement : "", c = parseFloat(l), d = !isNaN(c), h = d ? c.toFixed(i) : l;
    return u`
      <g transform="translate(${r}, ${t})" @click=${(p) => this._showMoreInfo(p, e)} style="cursor: pointer;">
        <text x="0" y="0" text-anchor="start">
          <tspan class="cell-small-label">${s}:</tspan>
          <tspan dy="1" class="text-label" style="font-size: 12px;">
            ${h}
          </tspan>
          ${n && d ? u`
            <tspan dy="-2" class="text-label" style="font-size: 8px;">${a}</tspan>
          ` : ""}
        </text>
      </g>
    `;
  }
  _renderSocDisplay(r, t, e, s) {
    const i = e.toFixed(0), { soc_bar: n, soc_dots: o } = this.config, l = s === "Laden", a = [100, 80, 60, 40, 20], c = 120, d = 4, h = -c / 2, p = 15, $ = Math.min(100, Math.max(0, e)) / 100 * c;
    return u`
      <g id="soc-display" transform="translate(${r}, ${t})">
        ${this.config.soc ? u`
          <g @click=${(g) => this._showMoreInfo(g, this.config.soc)} style="cursor: pointer;">
            <text x="0" y="0" text-anchor="middle" class="soc-value-big" style="font-size: 36px;">
              ${i}%
            </text>
          </g>

          ${n ? u`
            <rect x="${h}" y="${p}" width="${c}" height="${d}" rx="${d / 2}" fill="rgba(255,255,255,0.1)" />
            <rect class="soc-bar-fill" x="${h}" y="${p}" width="${$}" height="${d}" rx="${d / 2}" />
          ` : ""}

          ${o ? u`
            ${a.map((g, E) => {
      const C = e >= g, k = l && !C && (E === a.length - 1 || e >= a[E + 1]), H = 40 + E * 18;
      return u`
                <circle 
                  cx="0" cy="${H}" r="3" 
                  fill="${C || k ? "#00d2ff" : "rgba(255,255,255,0.1)"}"
                  class="${k ? "charging-dot" : ""}"
                  style="${C ? "filter: drop-shadow(0 0 3px #00d2ff);" : ""} transition: all 0.5s ease;"
                />`;
    })}` : ""}
        ` : ""}

        ${s ? u`
          <text x="0" y="140" text-anchor="middle" class="text-label" style="font-size: 10px;">
            ${s}
          </text>
        ` : ""}
      </g>
    `;
  }
  _renderMeasurements(r, t, e) {
    if (e.length === 0) return u``;
    const s = 70, i = e.length;
    return u`
      <g id="measurements-cells" transform="translate(${r}, ${t})">
        ${e.map((n, o) => {
      const l = (o - (i - 1) / 2) * s;
      return this._renderCellBig(
        l,
        0,
        n.id,
        n.label,
        n.dec
      );
    })}
      </g>
    `;
  }
  _renderInfoStates(r, t, e) {
    if (e.length === 0) return u``;
    const s = 15;
    return u`
      <g id="InfoStates" transform="translate(${r}, ${t})">
        ${e.map((i, n) => {
      const o = -10 - n * s;
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
  _renderFailureState(r, t, e) {
    return u`
      ${e ? u`
        <text x="${r}" y="${t}" text-anchor="middle" class="text-label warn" style="font-size: 10px;">
          ${e}
        </text>
      ` : ""}
    `;
  }
  shouldUpdate(r) {
    return r.has("config") ? !0 : r.has("hass");
  }
  render() {
    if (!this.hass || !this.config) return j``;
    const r = 400, t = 350, e = 15, s = 80, i = 80, n = r - e - s, { entities: o } = this.config, l = o.length, a = [
      { id: this.config.voltage, label: "Spannung", dec: 1 },
      { id: this.config.remaining, label: "Restenergie", dec: 1 },
      { id: this.config.celldiff, label: "Zelldifferenz", dec: 3 }
    ].filter((m) => m.id && this.hass.states[m.id]), c = [
      { id: this.config.cycles, label: "Zyklen", dec: 0, show_uom: !1 },
      { id: this.config.case_temp, label: "Case", dec: 0, show_uom: !0 }
    ].filter((m) => m.id && this.hass.states[m.id]), d = this.config.soc ? this.hass.states[this.config.soc] : null, h = this.config.failure ? this.hass.states[this.config.failure] : null, p = this.config.status ? this.hass.states[this.config.status] : null, $ = {
      Charge: "Laden",
      Discharge: "Entladen",
      "Standby Mode": "Standby"
    }, g = l <= 8 ? l : Math.ceil(l / 2), E = o.slice(0, g), C = o.slice(g), k = d ? parseFloat(d.state) : 0, H = p ? p.state : "", bt = $[H] || H, xt = h ? h.state : "";
    return j`
      <ha-card>
        <svg 
          viewBox="0 0 ${r} ${t}" 
          xmlns="http://www.w3.org/2000/svg"
          style="font-family: 'Inter', sans-serif !important;">
          <defs>
            <filter id="bevel-filter" x="-20%" y="-20%" width="140%" height="140%">
               <feDropShadow dx="1" dy="1" stdDeviation="1" flood-color="#000" />
               <feDropShadow dx="-1" dy="-1" stdDeviation="1" flood-color="#fff" flood-opacity="0.2" />
            </filter>
          </defs>

          <g id="top-row" transform="translate(${r / 2}, 30)">
            ${this._renderTitleRow(0, 0)}
            ${this._renderInfoStates(125, 30, c)}
          </g>
          <g id="left-column" transform="translate(${e}, ${i})">
            ${E.map((m, P) => this._renderCell(0, P * 32, P, m, "bevel-filter", !1))}
          </g>

          ${this._renderSocDisplay(r / 2, i + 20, k, bt)}

          ${this._renderMeasurements(r / 2, i + 180, a)}
          
          ${this._renderFailureState(r / 2, i + 260, xt)}


          <g id="right-column" transform="translate(${n}, ${i})">
            ${C.map((m, P) => this._renderCell(0, P * 32, P + g, m, "bevel-filter", !0))}
          </g>

        </svg>
      </ha-card>
    `;
  }
  static get styles() {
    return Zt;
  }
};
tt([
  Y({ attribute: !1 })
], L.prototype, "hass", 2);
tt([
  yt()
], L.prototype, "config", 2);
L = tt([
  _t("glass-bms-card")
], L);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "glass-bms-card",
  name: "Glass BMS Card",
  author: "SirUlbrich",
  version: "1.0.0",
  preview: !0,
  description: "Eine Glass-Morphism Karte für BMS Daten"
});
export {
  L as GlassBmsCard
};
