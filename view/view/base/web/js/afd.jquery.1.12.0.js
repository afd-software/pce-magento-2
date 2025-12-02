window.afdVersion = '1.12.0'
;(() => {
  var ze = Object.create
  var jt = Object.defineProperty
  var je = Object.getOwnPropertyDescriptor
  var Be = Object.getOwnPropertyNames
  var Qe = Object.getPrototypeOf,
    Ue = Object.prototype.hasOwnProperty
  var Ge = ((d) =>
    typeof require < 'u'
      ? require
      : typeof Proxy < 'u'
        ? new Proxy(d, {
            get: (t, e) => (typeof require < 'u' ? require : t)[e]
          })
        : d)(function (d) {
    if (typeof require < 'u') return require.apply(this, arguments)
    throw Error('Dynamic require of "' + d + '" is not supported')
  })
  var K = (d, t) => () => (t || d((t = { exports: {} }).exports, t), t.exports)
  var qe = (d, t, e, s) => {
    if ((t && typeof t == 'object') || typeof t == 'function')
      for (let o of Be(t))
        !Ue.call(d, o) &&
          o !== e &&
          jt(d, o, {
            get: () => t[o],
            enumerable: !(s = je(t, o)) || s.enumerable
          })
    return d
  }
  var ht = (d, t, e) => (
    (e = d != null ? ze(Qe(d)) : {}),
    qe(
      t || !d || !d.__esModule
        ? jt(e, 'default', { value: d, enumerable: !0 })
        : e,
      d
    )
  )
  var Ht = K((Bi, qt) => {
    'use strict'
    function He(d) {
      for (var t = 0, e = !1, s = d.length - 1, o; s >= 0; )
        (o = parseInt(d.charAt(s), 10)),
          e && ((o *= 2), o > 9 && (o = (o % 10) + 1)),
          (e = !e),
          (t += o),
          s--
      return t % 10 === 0
    }
    qt.exports = He
  })
  var Rt = K((Qi, Yt) => {
    'use strict'
    var X,
      J = {},
      rt = {},
      pt = 'visa',
      ft = 'mastercard',
      mt = 'american-express',
      yt = 'diners-club',
      gt = 'discover',
      Ct = 'elo',
      vt = 'jcb',
      wt = 'unionpay',
      bt = 'maestro',
      It = 'mir',
      Pt = 'CVV',
      Kt = 'CID',
      Jt = 'CVC',
      Ke = 'CVN',
      Je = 'CVP2',
      We = 'CVE',
      Wt = [pt, ft, mt, yt, gt, vt, wt, bt, Ct, It]
    function it(d, t) {
      var e, s, o
      return d
        ? ((s = d.prefixPattern),
          (o = d.exactPattern),
          (e = JSON.parse(JSON.stringify(d))),
          t
            ? ((e.prefixPattern = s), (e.exactPattern = o))
            : (delete e.prefixPattern, delete e.exactPattern),
          e)
        : null
    }
    X = it(Wt)
    J[pt] = {
      niceType: 'Visa',
      type: pt,
      prefixPattern: /^4/,
      exactPattern: new RegExp(
        '^4(?!31274|51416|57393|0117[89]|38935|5763[12])\\d{5,}$'
      ),
      gaps: [4, 8, 12],
      lengths: [16, 18, 19],
      code: { name: Pt, size: 3 }
    }
    J[ft] = {
      niceType: 'Mastercard',
      type: ft,
      prefixPattern: /^(5|5[1-5]|2|22|222|222[1-9]|2[3-6]|27|27[0-2]|2720)$/,
      exactPattern: /^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[0-1]|2720)\d*$/,
      gaps: [4, 8, 12],
      lengths: [16],
      code: { name: Jt, size: 3 }
    }
    J[mt] = {
      niceType: 'American Express',
      type: mt,
      prefixPattern: /^(3|34|37)$/,
      exactPattern: /^3[47]\d*$/,
      isAmex: !0,
      gaps: [4, 10],
      lengths: [15],
      code: { name: Kt, size: 4 }
    }
    J[yt] = {
      niceType: 'Diners Club',
      type: yt,
      prefixPattern: /^(3|3[0689]|30[0-5])$/,
      exactPattern: /^3(0[0-5]|[689])\d*$/,
      gaps: [4, 10],
      lengths: [14, 16, 19],
      code: { name: Pt, size: 3 }
    }
    J[gt] = {
      niceType: 'Discover',
      type: gt,
      prefixPattern: /^(6|60|601|6011|65|65\d{1,4}|64|64[4-9])$/,
      exactPattern: new RegExp(
        '^(6011|65(?!003[1-3]|003[5-9]|004\\d|005[0-1]|040[5-9]|04[1-3]\\d|048[5-9]|049\\d|05[0-2]\\d|053[0-8]|054[1-9]|05[5-8]\\d|059[0-8]|070\\d|071[0-8]|072[0-7]|090[1-9]|09[1-6]\\d|097[0-8]|165[2-9]|16[6-7]\\d|50[0-1]\\d|502[1-9]|50[3-4]\\d|505[0-8])\\d{4}|64[4-9])\\d*$'
      ),
      gaps: [4, 8, 12],
      lengths: [16, 19],
      code: { name: Kt, size: 3 }
    }
    J[vt] = {
      niceType: 'JCB',
      type: vt,
      prefixPattern: /^(2|21|213|2131|1|18|180|1800|3|35)$/,
      exactPattern: /^(2131|1800|35)\d*$/,
      gaps: [4, 8, 12],
      lengths: [16, 17, 18, 19],
      code: { name: Pt, size: 3 }
    }
    J[wt] = {
      niceType: 'UnionPay',
      type: wt,
      prefixPattern:
        /^((6|62|62\d|(621(?!83|88|98|99))|622(?!06)|627[0267]\d?|628(?!0|1)|629[1,2])|622018)$/,
      exactPattern: new RegExp(
        '^((620|(621(?!83|88|98|99))|622(?!06|018)|62[3-6]|627[026]|6277(?!80)\\d{2}|628(?!0|1)|629[12])\\d*|622018\\d{12})$'
      ),
      gaps: [4, 8, 12],
      lengths: [16, 17, 18, 19],
      code: { name: Ke, size: 3 }
    }
    J[bt] = {
      niceType: 'Maestro',
      type: bt,
      prefixPattern: /^(5|5[06-9]|6\d*)$/,
      exactPattern: new RegExp(
        '^(5[6-9]|50(?!6699|067[0-6][0-9]|677[0-8]|9[0-9][0-9][0-9])\\d{4}|67|63(?!6297|6368)\\d{4})\\d*$'
      ),
      gaps: [4, 8, 12],
      lengths: [12, 13, 14, 15, 16, 17, 18, 19],
      code: { name: Jt, size: 3 }
    }
    J[Ct] = {
      niceType: 'Elo',
      type: Ct,
      prefixPattern: new RegExp(
        '^([4-6]|4[035]|4[035]1|4011|40117|40117[89]|4312|43127|431274|438|4389|43893|438935|4514|45141|451416|457|457[36]|45739|45763|457393|45763[12]|50|50[69]|506[6-7]|50669|5067[0-7]|5067[0-6][0-9]|50677[0-8]|509[0-9]|509[0-9][0-9]|509[0-9][0-9][0-9]|6[235]|627|636|65[015]|6277|62778|627780|636[23]|63629|636297|63636|636368|650[0479]|6500[3-5]|65003[1-3]|65003[5-9]|65004[0-9]65005[01]|6504[0-3]|65040[5-9]|65041[0-9]|6505[4-9]|65054[1-9]|6505[5-8][0-9]|65059[0-8]|6507[0-2]|65070[0-9]|65071[0-8]|65072[0-7]|6509[0-7]|65090[1-9]|6509[1-6][0-9]|65097[0-8]|6516|6516[5-7]|65165[2-9]|6516[6-7][0-9]|6550|6550[0-5]|6550[01][0-9]|65502[1-9]|6550[3-4][0-9]|65505[0-8])$'
      ),
      exactPattern: new RegExp(
        '^(4(31274|51416|57393)|50(4175|6699|67[0-6][0-9]|677[0-8]|9[0-9][0-9][0-9])|627780|636(297|368)|4(0117[89]|38935|5763[12])|65(003[1-3]|003[5-9]|004\\d|005[0-1]|040[5-9]|04[1-3]\\d|048[5-9]|049\\d|05[0-2]\\d|053[0-8]|054[1-9]|05[5-8]\\d|059[0-8]|070[0-9]|071[0-8]|072[0-7]|090[1-9]|09[1-6][0-9]|097[0-8]|165[2-9]|16[6-7][0-9]|50[0-1][0-9]|502[1-9]|50[3-4][0-9]|505[0-8]))\\d*$'
      ),
      gaps: [4, 8, 12],
      lengths: [16],
      code: { name: We, size: 3 }
    }
    J[It] = {
      niceType: 'Mir',
      type: It,
      prefixPattern: /^(2|22|220|220[0-4])$/,
      exactPattern: /^(220[0-4])\d*$/,
      gaps: [4, 8, 12],
      lengths: [16, 17, 18, 19],
      code: { name: Je, size: 3 }
    }
    function Zt(d) {
      return rt[d] || J[d]
    }
    function et(d) {
      var t,
        e,
        s,
        o = [],
        u = []
      if (!(typeof d == 'string' || d instanceof String)) return []
      for (s = 0; s < X.length; s++) {
        if (((t = X[s]), (e = Zt(t)), d.length === 0)) {
          o.push(it(e))
          continue
        }
        e.exactPattern.test(d)
          ? u.push(it(e))
          : e.prefixPattern.test(d) && o.push(it(e))
      }
      return u.length ? u : o
    }
    et.getTypeInfo = function (d) {
      return it(Zt(d))
    }
    function _t(d, t) {
      var e = X.indexOf(d)
      if (!t && e === -1)
        throw new Error('"' + d + '" is not a supported card type.')
      return e
    }
    et.removeCard = function (d) {
      var t = _t(d)
      X.splice(t, 1)
    }
    et.addCard = function (d) {
      var t = _t(d.type, !0)
      ;(rt[d.type] = d), t === -1 && X.push(d.type)
    }
    et.updateCard = function (d, t) {
      var e,
        s = rt[d] || J[d]
      if (!s)
        throw new Error(
          '"' + d + '" is not a recognized type. Use `addCard` instead.'
        )
      if (t.type && s.type !== t.type)
        throw new Error('Cannot overwrite type parameter.')
      ;(e = it(s, !0)),
        Object.keys(e).forEach(function (o) {
          t[o] && (e[o] = t[o])
        }),
        (rt[e.type] = e)
    }
    et.changeOrder = function (d, t) {
      var e = _t(d)
      X.splice(e, 1), X.splice(t, 0, d)
    }
    et.resetModifications = function () {
      ;(X = it(Wt)), (rt = {})
    }
    et.types = {
      VISA: pt,
      MASTERCARD: ft,
      AMERICAN_EXPRESS: mt,
      DINERS_CLUB: yt,
      DISCOVER: gt,
      JCB: vt,
      UNIONPAY: wt,
      MAESTRO: bt,
      ELO: Ct,
      MIR: It
    }
    Yt.exports = et
  })
  var ee = K((Ui, te) => {
    'use strict'
    var Ze = Ht(),
      Xt = Rt()
    function ot(d, t, e) {
      return { card: d, isPotentiallyValid: t, isValid: e }
    }
    function Ye(d, t) {
      var e, s, o, u, y, w
      if (
        ((t = t || {}),
        typeof d == 'number' && (d = String(d)),
        typeof d != 'string' ||
          ((d = d.replace(/\-|\s/g, '')), !/^\d*$/.test(d)) ||
          ((e = Xt(d)), e.length === 0))
      )
        return ot(null, !1, !1)
      if (e.length !== 1) return ot(null, !0, !1)
      for (
        s = e[0],
          s.type === Xt.types.UNIONPAY && t.luhnValidateUnionPay !== !0
            ? (u = !0)
            : (u = Ze(d)),
          w = Math.max.apply(null, s.lengths),
          y = 0;
        y < s.lengths.length;
        y++
      )
        if (s.lengths[y] === d.length)
          return (o = d.length !== w || u), ot(s, o, u)
      return ot(s, d.length < w, !1)
    }
    te.exports = Ye
  })
  var kt = K((Gi, ie) => {
    'use strict'
    var Xe = 19
    function st(d, t, e) {
      return { isValid: d, isPotentiallyValid: t, isCurrentYear: e || !1 }
    }
    function ti(d, t) {
      var e, s, o, u, y, w, I
      return (
        (t = t || Xe),
        typeof d != 'string'
          ? st(!1, !1)
          : d.replace(/\s/g, '') === ''
            ? st(!1, !0)
            : /^\d*$/.test(d)
              ? ((u = d.length),
                u < 2
                  ? st(!1, !0)
                  : ((s = new Date().getFullYear()),
                    u === 3
                      ? ((o = d.slice(0, 2)),
                        (e = String(s).slice(0, 2)),
                        st(!1, o === e))
                      : u > 4
                        ? st(!1, !1)
                        : ((d = parseInt(d, 10)),
                          (y = Number(String(s).substr(2, 2))),
                          u === 2
                            ? ((I = y === d), (w = d >= y && d <= y + t))
                            : u === 4 &&
                              ((I = s === d), (w = d >= s && d <= s + t)),
                          st(w, w, I))))
              : st(!1, !1)
      )
    }
    ie.exports = ti
  })
  var ne = K((qi, se) => {
    'use strict'
    se.exports =
      Array.isArray ||
      function (d) {
        return Object.prototype.toString.call(d) === '[object Array]'
      }
  })
  var ae = K((Hi, oe) => {
    'use strict'
    var ei = kt(),
      ii = ne()
    function si(d) {
      var t, e, s, o
      return (
        /\//.test(d)
          ? (d = d.split(/\s*\/\s*/g))
          : /\s/.test(d) && (d = d.split(/ +/g)),
        ii(d)
          ? { month: d[0], year: d.slice(1).join() }
          : ((e = d[0] === '0' || d.length > 5 ? 2 : 1),
            d[0] === '1' &&
              ((s = d.substr(1)), (o = ei(s)), o.isPotentiallyValid || (e = 2)),
            (t = d.substr(0, e)),
            { month: t, year: d.substr(t.length) })
      )
    }
    oe.exports = si
  })
  var Ot = K((Ki, re) => {
    'use strict'
    function lt(d, t, e) {
      return { isValid: d, isPotentiallyValid: t, isValidForThisYear: e || !1 }
    }
    function ni(d) {
      var t,
        e,
        s = new Date().getMonth() + 1
      return typeof d != 'string'
        ? lt(!1, !1)
        : d.replace(/\s/g, '') === '' || d === '0'
          ? lt(!1, !0)
          : !/^\d*$/.test(d) || ((t = parseInt(d, 10)), isNaN(d))
            ? lt(!1, !1)
            : ((e = t > 0 && t < 13), lt(e, e, e && t >= s))
    }
    re.exports = ni
  })
  var de = K((Ji, le) => {
    'use strict'
    var oi = ae(),
      ai = Ot(),
      ri = kt()
    function dt(d, t, e, s) {
      return { isValid: d, isPotentiallyValid: t, month: e, year: s }
    }
    function li(d, t) {
      var e, s, o, u
      if (typeof d == 'string')
        (d = d.replace(/^(\d\d) (\d\d(\d\d)?)$/, '$1/$2')), (e = oi(d))
      else if (d !== null && typeof d == 'object')
        e = { month: String(d.month), year: String(d.year) }
      else return dt(!1, !1, null, null)
      if (((s = ai(e.month)), (o = ri(e.year, t)), s.isValid)) {
        if (o.isCurrentYear)
          return (u = s.isValidForThisYear), dt(u, u, e.month, e.year)
        if (o.isValid) return dt(!0, !0, e.month, e.year)
      }
      return s.isPotentiallyValid && o.isPotentiallyValid
        ? dt(!1, !0, null, null)
        : dt(!1, !1, null, null)
    }
    le.exports = li
  })
  var ce = K((Wi, he) => {
    'use strict'
    var ue = 3
    function di(d, t) {
      for (var e = 0; e < d.length; e++) if (t === d[e]) return !0
      return !1
    }
    function ui(d) {
      for (var t = ue, e = 0; e < d.length; e++) t = d[e] > t ? d[e] : t
      return t
    }
    function at(d, t) {
      return { isValid: d, isPotentiallyValid: t }
    }
    function hi(d, t) {
      return (
        (t = t || ue),
        (t = t instanceof Array ? t : [t]),
        typeof d != 'string' || !/^\d*$/.test(d)
          ? at(!1, !1)
          : di(t, d.length)
            ? at(!0, !0)
            : d.length < Math.min.apply(null, t)
              ? at(!1, !0)
              : d.length > ui(t)
                ? at(!1, !1)
                : at(!0, !0)
      )
    }
    he.exports = hi
  })
  var fe = K((Zi, pe) => {
    'use strict'
    var ci = 3
    function Vt(d, t) {
      return { isValid: d, isPotentiallyValid: t }
    }
    function pi(d, t) {
      var e
      return (
        (t = t || {}),
        (e = t.minLength || ci),
        typeof d != 'string'
          ? Vt(!1, !1)
          : d.length < e
            ? Vt(!1, !0)
            : Vt(!0, !0)
      )
    }
    pe.exports = pi
  })
  var ye = K((Yi, me) => {
    'use strict'
    me.exports = {
      number: ee(),
      expirationDate: de(),
      expirationMonth: Ot(),
      expirationYear: kt(),
      cvv: ce(),
      postalCode: fe(),
      creditCardType: Rt()
    }
  })
  var Me = K((Ae) => {
    'use strict'
    var Si =
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/
    Ae.validate = function (d) {
      if (!d || d.length > 254) return !1
      var t = Si.test(d)
      if (!t) return !1
      var e = d.split('@')
      if (e[0].length > 64) return !1
      var s = e[1].split('.')
      return !s.some(function (o) {
        return o.length > 63
      })
    }
  })
  var Te = K((Ps, Et) => {
    ;(function (d) {
      typeof Et == 'object' && Et.exports
        ? (Et.exports = d())
        : (window.intlTelInput = d())
    })(() => {
      var d = (() => {
        var t = Object.defineProperty,
          e = Object.getOwnPropertyDescriptor,
          s = Object.getOwnPropertyNames,
          o = Object.prototype.hasOwnProperty,
          u = (l, r) => {
            for (var h in r) t(l, h, { get: r[h], enumerable: !0 })
          },
          y = (l, r, h, p) => {
            if ((r && typeof r == 'object') || typeof r == 'function')
              for (let C of s(r))
                !o.call(l, C) &&
                  C !== h &&
                  t(l, C, {
                    get: () => r[C],
                    enumerable: !(p = e(r, C)) || p.enumerable
                  })
            return l
          },
          w = (l) => y(t({}, '__esModule', { value: !0 }), l),
          I = {}
        u(I, { Iti: () => O, default: () => W })
        var b = [
            ['af', '93'],
            ['ax', '358', 1],
            ['al', '355'],
            ['dz', '213'],
            ['as', '1', 5, ['684']],
            ['ad', '376'],
            ['ao', '244'],
            ['ai', '1', 6, ['264']],
            ['ag', '1', 7, ['268']],
            ['ar', '54'],
            ['am', '374'],
            ['aw', '297'],
            ['ac', '247'],
            ['au', '61', 0, null, '0'],
            ['at', '43'],
            ['az', '994'],
            ['bs', '1', 8, ['242']],
            ['bh', '973'],
            ['bd', '880'],
            ['bb', '1', 9, ['246']],
            ['by', '375'],
            ['be', '32'],
            ['bz', '501'],
            ['bj', '229'],
            ['bm', '1', 10, ['441']],
            ['bt', '975'],
            ['bo', '591'],
            ['ba', '387'],
            ['bw', '267'],
            ['br', '55'],
            ['io', '246'],
            ['vg', '1', 11, ['284']],
            ['bn', '673'],
            ['bg', '359'],
            ['bf', '226'],
            ['bi', '257'],
            ['kh', '855'],
            ['cm', '237'],
            [
              'ca',
              '1',
              1,
              [
                '204',
                '226',
                '236',
                '249',
                '250',
                '263',
                '289',
                '306',
                '343',
                '354',
                '365',
                '367',
                '368',
                '382',
                '387',
                '403',
                '416',
                '418',
                '428',
                '431',
                '437',
                '438',
                '450',
                '584',
                '468',
                '474',
                '506',
                '514',
                '519',
                '548',
                '579',
                '581',
                '584',
                '587',
                '604',
                '613',
                '639',
                '647',
                '672',
                '683',
                '705',
                '709',
                '742',
                '753',
                '778',
                '780',
                '782',
                '807',
                '819',
                '825',
                '867',
                '873',
                '879',
                '902',
                '905'
              ]
            ],
            ['cv', '238'],
            ['bq', '599', 1, ['3', '4', '7']],
            ['ky', '1', 12, ['345']],
            ['cf', '236'],
            ['td', '235'],
            ['cl', '56'],
            ['cn', '86'],
            ['cx', '61', 2, ['89164'], '0'],
            ['cc', '61', 1, ['89162'], '0'],
            ['co', '57'],
            ['km', '269'],
            ['cg', '242'],
            ['cd', '243'],
            ['ck', '682'],
            ['cr', '506'],
            ['ci', '225'],
            ['hr', '385'],
            ['cu', '53'],
            ['cw', '599', 0],
            ['cy', '357'],
            ['cz', '420'],
            ['dk', '45'],
            ['dj', '253'],
            ['dm', '1', 13, ['767']],
            ['do', '1', 2, ['809', '829', '849']],
            ['ec', '593'],
            ['eg', '20'],
            ['sv', '503'],
            ['gq', '240'],
            ['er', '291'],
            ['ee', '372'],
            ['sz', '268'],
            ['et', '251'],
            ['fk', '500'],
            ['fo', '298'],
            ['fj', '679'],
            ['fi', '358', 0],
            ['fr', '33'],
            ['gf', '594'],
            ['pf', '689'],
            ['ga', '241'],
            ['gm', '220'],
            ['ge', '995'],
            ['de', '49'],
            ['gh', '233'],
            ['gi', '350'],
            ['gr', '30'],
            ['gl', '299'],
            ['gd', '1', 14, ['473']],
            ['gp', '590', 0],
            ['gu', '1', 15, ['671']],
            ['gt', '502'],
            ['gg', '44', 1, ['1481', '7781', '7839', '7911'], '0'],
            ['gn', '224'],
            ['gw', '245'],
            ['gy', '592'],
            ['ht', '509'],
            ['hn', '504'],
            ['hk', '852'],
            ['hu', '36'],
            ['is', '354'],
            ['in', '91'],
            ['id', '62'],
            ['ir', '98'],
            ['iq', '964'],
            ['ie', '353'],
            ['im', '44', 2, ['1624', '74576', '7524', '7924', '7624'], '0'],
            ['il', '972'],
            ['it', '39', 0],
            ['jm', '1', 4, ['876', '658']],
            ['jp', '81'],
            [
              'je',
              '44',
              3,
              ['1534', '7509', '7700', '7797', '7829', '7937'],
              '0'
            ],
            ['jo', '962'],
            ['kz', '7', 1, ['33', '7'], '8'],
            ['ke', '254'],
            ['ki', '686'],
            ['xk', '383'],
            ['kw', '965'],
            ['kg', '996'],
            ['la', '856'],
            ['lv', '371'],
            ['lb', '961'],
            ['ls', '266'],
            ['lr', '231'],
            ['ly', '218'],
            ['li', '423'],
            ['lt', '370'],
            ['lu', '352'],
            ['mo', '853'],
            ['mg', '261'],
            ['mw', '265'],
            ['my', '60'],
            ['mv', '960'],
            ['ml', '223'],
            ['mt', '356'],
            ['mh', '692'],
            ['mq', '596'],
            ['mr', '222'],
            ['mu', '230'],
            ['yt', '262', 1, ['269', '639'], '0'],
            ['mx', '52'],
            ['fm', '691'],
            ['md', '373'],
            ['mc', '377'],
            ['mn', '976'],
            ['me', '382'],
            ['ms', '1', 16, ['664']],
            ['ma', '212', 0, null, '0'],
            ['mz', '258'],
            ['mm', '95'],
            ['na', '264'],
            ['nr', '674'],
            ['np', '977'],
            ['nl', '31'],
            ['nc', '687'],
            ['nz', '64'],
            ['ni', '505'],
            ['ne', '227'],
            ['ng', '234'],
            ['nu', '683'],
            ['nf', '672'],
            ['kp', '850'],
            ['mk', '389'],
            ['mp', '1', 17, ['670']],
            ['no', '47', 0],
            ['om', '968'],
            ['pk', '92'],
            ['pw', '680'],
            ['ps', '970'],
            ['pa', '507'],
            ['pg', '675'],
            ['py', '595'],
            ['pe', '51'],
            ['ph', '63'],
            ['pl', '48'],
            ['pt', '351'],
            ['pr', '1', 3, ['787', '939']],
            ['qa', '974'],
            ['re', '262', 0, null, '0'],
            ['ro', '40'],
            ['ru', '7', 0, null, '8'],
            ['rw', '250'],
            ['ws', '685'],
            ['sm', '378'],
            ['st', '239'],
            ['sa', '966'],
            ['sn', '221'],
            ['rs', '381'],
            ['sc', '248'],
            ['sl', '232'],
            ['sg', '65'],
            ['sx', '1', 21, ['721']],
            ['sk', '421'],
            ['si', '386'],
            ['sb', '677'],
            ['so', '252'],
            ['za', '27'],
            ['kr', '82'],
            ['ss', '211'],
            ['es', '34'],
            ['lk', '94'],
            ['bl', '590', 1],
            ['sh', '290'],
            ['kn', '1', 18, ['869']],
            ['lc', '1', 19, ['758']],
            ['mf', '590', 2],
            ['pm', '508'],
            ['vc', '1', 20, ['784']],
            ['sd', '249'],
            ['sr', '597'],
            ['sj', '47', 1, ['79']],
            ['se', '46'],
            ['ch', '41'],
            ['sy', '963'],
            ['tw', '886'],
            ['tj', '992'],
            ['tz', '255'],
            ['th', '66'],
            ['tl', '670'],
            ['tg', '228'],
            ['tk', '690'],
            ['to', '676'],
            ['tt', '1', 22, ['868']],
            ['tn', '216'],
            ['tr', '90'],
            ['tm', '993'],
            ['tc', '1', 23, ['649']],
            ['tv', '688'],
            ['ug', '256'],
            ['ua', '380'],
            ['ae', '971'],
            ['gb', '44', 0, null, '0'],
            ['us', '1', 0],
            ['uy', '598'],
            ['vi', '1', 24, ['340']],
            ['uz', '998'],
            ['vu', '678'],
            ['va', '39', 1, ['06698']],
            ['ve', '58'],
            ['vn', '84'],
            ['wf', '681'],
            ['eh', '212', 1, ['5288', '5289'], '0'],
            ['ye', '967'],
            ['zm', '260'],
            ['zw', '263']
          ],
          M = []
        for (let l = 0; l < b.length; l++) {
          let r = b[l]
          M[l] = {
            name: '',
            iso2: r[0],
            dialCode: r[1],
            priority: r[2] || 0,
            areaCodes: r[3] || null,
            nodeById: {},
            nationalPrefix: r[4] || null
          }
        }
        var g = M,
          i = {
            ad: 'Andorra',
            ae: 'United Arab Emirates',
            af: 'Afghanistan',
            ag: 'Antigua & Barbuda',
            ai: 'Anguilla',
            al: 'Albania',
            am: 'Armenia',
            ao: 'Angola',
            ar: 'Argentina',
            as: 'American Samoa',
            at: 'Austria',
            au: 'Australia',
            aw: 'Aruba',
            ax: '\xC5land Islands',
            az: 'Azerbaijan',
            ba: 'Bosnia & Herzegovina',
            bb: 'Barbados',
            bd: 'Bangladesh',
            be: 'Belgium',
            bf: 'Burkina Faso',
            bg: 'Bulgaria',
            bh: 'Bahrain',
            bi: 'Burundi',
            bj: 'Benin',
            bl: 'St. Barth\xE9lemy',
            bm: 'Bermuda',
            bn: 'Brunei',
            bo: 'Bolivia',
            bq: 'Caribbean Netherlands',
            br: 'Brazil',
            bs: 'Bahamas',
            bt: 'Bhutan',
            bw: 'Botswana',
            by: 'Belarus',
            bz: 'Belize',
            ca: 'Canada',
            cc: 'Cocos (Keeling) Islands',
            cd: 'Congo - Kinshasa',
            cf: 'Central African Republic',
            cg: 'Congo - Brazzaville',
            ch: 'Switzerland',
            ci: 'C\xF4te d\u2019Ivoire',
            ck: 'Cook Islands',
            cl: 'Chile',
            cm: 'Cameroon',
            cn: 'China',
            co: 'Colombia',
            cr: 'Costa Rica',
            cu: 'Cuba',
            cv: 'Cape Verde',
            cw: 'Cura\xE7ao',
            cx: 'Christmas Island',
            cy: 'Cyprus',
            cz: 'Czechia',
            de: 'Germany',
            dj: 'Djibouti',
            dk: 'Denmark',
            dm: 'Dominica',
            do: 'Dominican Republic',
            dz: 'Algeria',
            ec: 'Ecuador',
            ee: 'Estonia',
            eg: 'Egypt',
            eh: 'Western Sahara',
            er: 'Eritrea',
            es: 'Spain',
            et: 'Ethiopia',
            fi: 'Finland',
            fj: 'Fiji',
            fk: 'Falkland Islands',
            fm: 'Micronesia',
            fo: 'Faroe Islands',
            fr: 'France',
            ga: 'Gabon',
            gb: 'United Kingdom',
            gd: 'Grenada',
            ge: 'Georgia',
            gf: 'French Guiana',
            gg: 'Guernsey',
            gh: 'Ghana',
            gi: 'Gibraltar',
            gl: 'Greenland',
            gm: 'Gambia',
            gn: 'Guinea',
            gp: 'Guadeloupe',
            gq: 'Equatorial Guinea',
            gr: 'Greece',
            gt: 'Guatemala',
            gu: 'Guam',
            gw: 'Guinea-Bissau',
            gy: 'Guyana',
            hk: 'Hong Kong SAR China',
            hn: 'Honduras',
            hr: 'Croatia',
            ht: 'Haiti',
            hu: 'Hungary',
            id: 'Indonesia',
            ie: 'Ireland',
            il: 'Israel',
            im: 'Isle of Man',
            in: 'India',
            io: 'British Indian Ocean Territory',
            iq: 'Iraq',
            ir: 'Iran',
            is: 'Iceland',
            it: 'Italy',
            je: 'Jersey',
            jm: 'Jamaica',
            jo: 'Jordan',
            jp: 'Japan',
            ke: 'Kenya',
            kg: 'Kyrgyzstan',
            kh: 'Cambodia',
            ki: 'Kiribati',
            km: 'Comoros',
            kn: 'St. Kitts & Nevis',
            kp: 'North Korea',
            kr: 'South Korea',
            kw: 'Kuwait',
            ky: 'Cayman Islands',
            kz: 'Kazakhstan',
            la: 'Laos',
            lb: 'Lebanon',
            lc: 'St. Lucia',
            li: 'Liechtenstein',
            lk: 'Sri Lanka',
            lr: 'Liberia',
            ls: 'Lesotho',
            lt: 'Lithuania',
            lu: 'Luxembourg',
            lv: 'Latvia',
            ly: 'Libya',
            ma: 'Morocco',
            mc: 'Monaco',
            md: 'Moldova',
            me: 'Montenegro',
            mf: 'St. Martin',
            mg: 'Madagascar',
            mh: 'Marshall Islands',
            mk: 'North Macedonia',
            ml: 'Mali',
            mm: 'Myanmar (Burma)',
            mn: 'Mongolia',
            mo: 'Macao SAR China',
            mp: 'Northern Mariana Islands',
            mq: 'Martinique',
            mr: 'Mauritania',
            ms: 'Montserrat',
            mt: 'Malta',
            mu: 'Mauritius',
            mv: 'Maldives',
            mw: 'Malawi',
            mx: 'Mexico',
            my: 'Malaysia',
            mz: 'Mozambique',
            na: 'Namibia',
            nc: 'New Caledonia',
            ne: 'Niger',
            nf: 'Norfolk Island',
            ng: 'Nigeria',
            ni: 'Nicaragua',
            nl: 'Netherlands',
            no: 'Norway',
            np: 'Nepal',
            nr: 'Nauru',
            nu: 'Niue',
            nz: 'New Zealand',
            om: 'Oman',
            pa: 'Panama',
            pe: 'Peru',
            pf: 'French Polynesia',
            pg: 'Papua New Guinea',
            ph: 'Philippines',
            pk: 'Pakistan',
            pl: 'Poland',
            pm: 'St. Pierre & Miquelon',
            pr: 'Puerto Rico',
            ps: 'Palestinian Territories',
            pt: 'Portugal',
            pw: 'Palau',
            py: 'Paraguay',
            qa: 'Qatar',
            re: 'R\xE9union',
            ro: 'Romania',
            rs: 'Serbia',
            ru: 'Russia',
            rw: 'Rwanda',
            sa: 'Saudi Arabia',
            sb: 'Solomon Islands',
            sc: 'Seychelles',
            sd: 'Sudan',
            se: 'Sweden',
            sg: 'Singapore',
            sh: 'St. Helena',
            si: 'Slovenia',
            sj: 'Svalbard & Jan Mayen',
            sk: 'Slovakia',
            sl: 'Sierra Leone',
            sm: 'San Marino',
            sn: 'Senegal',
            so: 'Somalia',
            sr: 'Suriname',
            ss: 'South Sudan',
            st: 'S\xE3o Tom\xE9 & Pr\xEDncipe',
            sv: 'El Salvador',
            sx: 'Sint Maarten',
            sy: 'Syria',
            sz: 'Eswatini',
            tc: 'Turks & Caicos Islands',
            td: 'Chad',
            tg: 'Togo',
            th: 'Thailand',
            tj: 'Tajikistan',
            tk: 'Tokelau',
            tl: 'Timor-Leste',
            tm: 'Turkmenistan',
            tn: 'Tunisia',
            to: 'Tonga',
            tr: 'Turkey',
            tt: 'Trinidad & Tobago',
            tv: 'Tuvalu',
            tw: 'Taiwan',
            tz: 'Tanzania',
            ua: 'Ukraine',
            ug: 'Uganda',
            us: 'United States',
            uy: 'Uruguay',
            uz: 'Uzbekistan',
            va: 'Vatican City',
            vc: 'St. Vincent & Grenadines',
            ve: 'Venezuela',
            vg: 'British Virgin Islands',
            vi: 'U.S. Virgin Islands',
            vn: 'Vietnam',
            vu: 'Vanuatu',
            wf: 'Wallis & Futuna',
            ws: 'Samoa',
            ye: 'Yemen',
            yt: 'Mayotte',
            za: 'South Africa',
            zm: 'Zambia',
            zw: 'Zimbabwe'
          },
          n = i,
          a = {
            selectedCountryAriaLabel: 'Selected country',
            noCountrySelected: 'No country selected',
            countryListAriaLabel: 'List of countries',
            searchPlaceholder: 'Search',
            zeroSearchResults: 'No results found',
            oneSearchResult: '1 result found',
            multipleSearchResults: '${count} results found',
            ac: 'Ascension Island',
            xk: 'Kosovo'
          },
          f = a,
          m = { ...n, ...f },
          c = m
        for (let l = 0; l < g.length; l++) g[l].name = c[g[l].iso2]
        var v = 0,
          S = {
            allowDropdown: !0,
            autoPlaceholder: 'polite',
            containerClass: '',
            countryOrder: null,
            countrySearch: !0,
            customPlaceholder: null,
            dropdownContainer: null,
            excludeCountries: [],
            fixDropdownWidth: !0,
            formatAsYouType: !0,
            formatOnDisplay: !0,
            geoIpLookup: null,
            hiddenInput: null,
            i18n: {},
            initialCountry: '',
            loadUtils: null,
            nationalMode: !0,
            onlyCountries: [],
            placeholderNumberType: 'MOBILE',
            showFlags: !0,
            separateDialCode: !1,
            strictMode: !1,
            useFullscreenPopup:
              typeof navigator < 'u' && typeof window < 'u'
                ? /Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                    navigator.userAgent
                  ) || window.innerWidth <= 500
                : !1,
            validationNumberTypes: ['MOBILE']
          },
          L = [
            '800',
            '822',
            '833',
            '844',
            '855',
            '866',
            '877',
            '880',
            '881',
            '882',
            '883',
            '884',
            '885',
            '886',
            '887',
            '888',
            '889'
          ],
          E = (l) => l.replace(/\D/g, ''),
          R = (l = '') =>
            l
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .toLowerCase(),
          P = (l) => {
            let r = E(l)
            if (r.charAt(0) === '1') {
              let h = r.substr(1, 3)
              return L.includes(h)
            }
            return !1
          },
          T = (l, r, h, p) => {
            if (h === 0 && !p) return 0
            let C = 0
            for (let k = 0; k < r.length; k++) {
              if ((/[+0-9]/.test(r[k]) && C++, C === l && !p)) return k + 1
              if (p && C === l + 1) return k
            }
            return r.length
          },
          F = (l, r, h) => {
            let p = document.createElement(l)
            return (
              r && Object.entries(r).forEach(([C, k]) => p.setAttribute(C, k)),
              h && h.appendChild(p),
              p
            )
          },
          _ = (l, ...r) => {
            let { instances: h } = x
            Object.values(h).forEach((p) => p[l](...r))
          },
          O = class {
            constructor(l, r = {}) {
              ;(this.id = v++),
                (this.telInput = l),
                (this.highlightedItem = null),
                (this.options = Object.assign({}, S, r)),
                (this.hadInitialPlaceholder = !!l.getAttribute('placeholder'))
            }
            _init() {
              this.options.useFullscreenPopup &&
                (this.options.fixDropdownWidth = !1),
                this.options.onlyCountries.length === 1 &&
                  (this.options.initialCountry = this.options.onlyCountries[0]),
                this.options.separateDialCode &&
                  (this.options.nationalMode = !1),
                this.options.allowDropdown &&
                  !this.options.showFlags &&
                  !this.options.separateDialCode &&
                  (this.options.nationalMode = !1),
                this.options.useFullscreenPopup &&
                  !this.options.dropdownContainer &&
                  (this.options.dropdownContainer = document.body),
                (this.isAndroid =
                  typeof navigator < 'u'
                    ? /Android/i.test(navigator.userAgent)
                    : !1),
                (this.isRTL = !!this.telInput.closest('[dir=rtl]'))
              let l =
                this.options.allowDropdown || this.options.separateDialCode
              ;(this.showSelectedCountryOnLeft = this.isRTL ? !l : l),
                this.options.separateDialCode &&
                  (this.isRTL
                    ? (this.originalPaddingRight =
                        this.telInput.style.paddingRight)
                    : (this.originalPaddingLeft =
                        this.telInput.style.paddingLeft)),
                (this.options.i18n = { ...c, ...this.options.i18n })
              let r = new Promise((p, C) => {
                  ;(this.resolveAutoCountryPromise = p),
                    (this.rejectAutoCountryPromise = C)
                }),
                h = new Promise((p, C) => {
                  ;(this.resolveUtilsScriptPromise = p),
                    (this.rejectUtilsScriptPromise = C)
                })
              ;(this.promise = Promise.all([r, h])),
                (this.selectedCountryData = {}),
                this._processCountryData(),
                this._generateMarkup(),
                this._setInitialState(),
                this._initListeners(),
                this._initRequests()
            }
            _processCountryData() {
              this._processAllCountries(),
                this._processDialCodes(),
                this._translateCountryNames(),
                this._sortCountries()
            }
            _sortCountries() {
              this.options.countryOrder &&
                (this.options.countryOrder = this.options.countryOrder.map(
                  (l) => l.toLowerCase()
                )),
                this.countries.sort((l, r) => {
                  let { countryOrder: h } = this.options
                  if (h) {
                    let p = h.indexOf(l.iso2),
                      C = h.indexOf(r.iso2),
                      k = p > -1,
                      D = C > -1
                    if (k || D) return k && D ? p - C : k ? -1 : 1
                  }
                  return l.name.localeCompare(r.name)
                })
            }
            _addToDialCodeMap(l, r, h) {
              r.length > this.dialCodeMaxLen &&
                (this.dialCodeMaxLen = r.length),
                this.dialCodeToIso2Map.hasOwnProperty(r) ||
                  (this.dialCodeToIso2Map[r] = [])
              for (let C = 0; C < this.dialCodeToIso2Map[r].length; C++)
                if (this.dialCodeToIso2Map[r][C] === l) return
              let p = h !== void 0 ? h : this.dialCodeToIso2Map[r].length
              this.dialCodeToIso2Map[r][p] = l
            }
            _processAllCountries() {
              let { onlyCountries: l, excludeCountries: r } = this.options
              if (l.length) {
                let h = l.map((p) => p.toLowerCase())
                this.countries = g.filter((p) => h.includes(p.iso2))
              } else if (r.length) {
                let h = r.map((p) => p.toLowerCase())
                this.countries = g.filter((p) => !h.includes(p.iso2))
              } else this.countries = g
            }
            _translateCountryNames() {
              for (let l = 0; l < this.countries.length; l++) {
                let r = this.countries[l].iso2.toLowerCase()
                this.options.i18n.hasOwnProperty(r) &&
                  (this.countries[l].name = this.options.i18n[r])
              }
            }
            _processDialCodes() {
              ;(this.dialCodes = {}),
                (this.dialCodeMaxLen = 0),
                (this.dialCodeToIso2Map = {})
              for (let l = 0; l < this.countries.length; l++) {
                let r = this.countries[l]
                this.dialCodes[r.dialCode] || (this.dialCodes[r.dialCode] = !0),
                  this._addToDialCodeMap(r.iso2, r.dialCode, r.priority)
              }
              for (let l = 0; l < this.countries.length; l++) {
                let r = this.countries[l]
                if (r.areaCodes) {
                  let h = this.dialCodeToIso2Map[r.dialCode][0]
                  for (let p = 0; p < r.areaCodes.length; p++) {
                    let C = r.areaCodes[p]
                    for (let k = 1; k < C.length; k++) {
                      let D = C.substr(0, k),
                        A = r.dialCode + D
                      this._addToDialCodeMap(h, A),
                        this._addToDialCodeMap(r.iso2, A)
                    }
                    this._addToDialCodeMap(r.iso2, r.dialCode + C)
                  }
                }
              }
            }
            _generateMarkup() {
              this.telInput.classList.add('iti__tel-input'),
                !this.telInput.hasAttribute('autocomplete') &&
                  !(
                    this.telInput.form &&
                    this.telInput.form.hasAttribute('autocomplete')
                  ) &&
                  this.telInput.setAttribute('autocomplete', 'off')
              let {
                  allowDropdown: l,
                  separateDialCode: r,
                  showFlags: h,
                  containerClass: p,
                  hiddenInput: C,
                  dropdownContainer: k,
                  fixDropdownWidth: D,
                  useFullscreenPopup: A,
                  countrySearch: z,
                  i18n: V
                } = this.options,
                U = 'iti'
              l && (U += ' iti--allow-dropdown'),
                h && (U += ' iti--show-flags'),
                p && (U += ` ${p}`),
                A || (U += ' iti--inline-dropdown')
              let j = F('div', { class: U })
              if (
                (this.telInput.parentNode?.insertBefore(j, this.telInput),
                l || h || r)
              ) {
                ;(this.countryContainer = F(
                  'div',
                  { class: 'iti__country-container' },
                  j
                )),
                  this.showSelectedCountryOnLeft
                    ? (this.countryContainer.style.left = '0px')
                    : (this.countryContainer.style.right = '0px'),
                  l
                    ? ((this.selectedCountry = F(
                        'button',
                        {
                          type: 'button',
                          class: 'iti__selected-country',
                          'aria-expanded': 'false',
                          'aria-label':
                            this.options.i18n.selectedCountryAriaLabel,
                          'aria-haspopup': 'true',
                          'aria-controls': `iti-${this.id}__dropdown-content`,
                          role: 'combobox'
                        },
                        this.countryContainer
                      )),
                      this.telInput.disabled &&
                        this.selectedCountry.setAttribute('disabled', 'true'))
                    : (this.selectedCountry = F(
                        'div',
                        { class: 'iti__selected-country' },
                        this.countryContainer
                      ))
                let H = F(
                  'div',
                  { class: 'iti__selected-country-primary' },
                  this.selectedCountry
                )
                if (
                  ((this.selectedCountryInner = F(
                    'div',
                    { class: 'iti__flag' },
                    H
                  )),
                  (this.selectedCountryA11yText = F(
                    'span',
                    { class: 'iti__a11y-text' },
                    this.selectedCountryInner
                  )),
                  l &&
                    (this.dropdownArrow = F(
                      'div',
                      { class: 'iti__arrow', 'aria-hidden': 'true' },
                      H
                    )),
                  r &&
                    (this.selectedDialCode = F(
                      'div',
                      { class: 'iti__selected-dial-code' },
                      this.selectedCountry
                    )),
                  l)
                ) {
                  let B = D ? '' : 'iti--flexible-dropdown-width'
                  if (
                    ((this.dropdownContent = F('div', {
                      id: `iti-${this.id}__dropdown-content`,
                      class: `iti__dropdown-content iti__hide ${B}`
                    })),
                    z &&
                      ((this.searchInput = F(
                        'input',
                        {
                          type: 'text',
                          class: 'iti__search-input',
                          placeholder: V.searchPlaceholder,
                          role: 'combobox',
                          'aria-expanded': 'true',
                          'aria-label': V.searchPlaceholder,
                          'aria-controls': `iti-${this.id}__country-listbox`,
                          'aria-autocomplete': 'list',
                          autocomplete: 'off'
                        },
                        this.dropdownContent
                      )),
                      (this.searchResultsA11yText = F(
                        'span',
                        { class: 'iti__a11y-text' },
                        this.dropdownContent
                      ))),
                    (this.countryList = F(
                      'ul',
                      {
                        class: 'iti__country-list',
                        id: `iti-${this.id}__country-listbox`,
                        role: 'listbox',
                        'aria-label': V.countryListAriaLabel
                      },
                      this.dropdownContent
                    )),
                    this._appendListItems(),
                    z && this._updateSearchResultsText(),
                    k)
                  ) {
                    let q = 'iti iti--container'
                    A
                      ? (q += ' iti--fullscreen-popup')
                      : (q += ' iti--inline-dropdown'),
                      (this.dropdown = F('div', { class: q })),
                      this.dropdown.appendChild(this.dropdownContent)
                  } else this.countryContainer.appendChild(this.dropdownContent)
                }
              }
              if (
                (j.appendChild(this.telInput), this._updateInputPadding(), C)
              ) {
                let H = this.telInput.getAttribute('name') || '',
                  B = C(H)
                if (B.phone) {
                  let q = this.telInput.form?.querySelector(
                    `input[name="${B.phone}"]`
                  )
                  q
                    ? (this.hiddenInput = q)
                    : ((this.hiddenInput = F('input', {
                        type: 'hidden',
                        name: B.phone
                      })),
                      j.appendChild(this.hiddenInput))
                }
                if (B.country) {
                  let q = this.telInput.form?.querySelector(
                    `input[name="${B.country}"]`
                  )
                  q
                    ? (this.hiddenInputCountry = q)
                    : ((this.hiddenInputCountry = F('input', {
                        type: 'hidden',
                        name: B.country
                      })),
                      j.appendChild(this.hiddenInputCountry))
                }
              }
            }
            _appendListItems() {
              for (let l = 0; l < this.countries.length; l++) {
                let r = this.countries[l],
                  h = l === 0 ? 'iti__highlight' : '',
                  p = F(
                    'li',
                    {
                      id: `iti-${this.id}__item-${r.iso2}`,
                      class: `iti__country ${h}`,
                      tabindex: '-1',
                      role: 'option',
                      'data-dial-code': r.dialCode,
                      'data-country-code': r.iso2,
                      'aria-selected': 'false'
                    },
                    this.countryList
                  )
                r.nodeById[this.id] = p
                let C = ''
                this.options.showFlags &&
                  (C += `<div class='iti__flag iti__${r.iso2}'></div>`),
                  (C += `<span class='iti__country-name'>${r.name}</span>`),
                  (C += `<span class='iti__dial-code'>+${r.dialCode}</span>`),
                  p.insertAdjacentHTML('beforeend', C)
              }
            }
            _setInitialState(l = !1) {
              let r = this.telInput.getAttribute('value'),
                h = this.telInput.value,
                C =
                  r && r.charAt(0) === '+' && (!h || h.charAt(0) !== '+')
                    ? r
                    : h,
                k = this._getDialCode(C),
                D = P(C),
                { initialCountry: A, geoIpLookup: z } = this.options,
                V = A === 'auto' && z
              if (k && !D) this._updateCountryFromNumber(C)
              else if (!V || l) {
                let U = A ? A.toLowerCase() : ''
                U && this._getCountryData(U, !0)
                  ? this._setCountry(U)
                  : k && D
                    ? this._setCountry('us')
                    : this._setCountry()
              }
              C && this._updateValFromNumber(C)
            }
            _initListeners() {
              this._initTelInputListeners(),
                this.options.allowDropdown && this._initDropdownListeners(),
                (this.hiddenInput || this.hiddenInputCountry) &&
                  this.telInput.form &&
                  this._initHiddenInputListener()
            }
            _initHiddenInputListener() {
              ;(this._handleHiddenInputSubmit = () => {
                this.hiddenInput && (this.hiddenInput.value = this.getNumber()),
                  this.hiddenInputCountry &&
                    (this.hiddenInputCountry.value =
                      this.getSelectedCountryData().iso2 || '')
              }),
                this.telInput.form?.addEventListener(
                  'submit',
                  this._handleHiddenInputSubmit
                )
            }
            _initDropdownListeners() {
              this._handleLabelClick = (r) => {
                this.dropdownContent.classList.contains('iti__hide')
                  ? this.telInput.focus()
                  : r.preventDefault()
              }
              let l = this.telInput.closest('label')
              l && l.addEventListener('click', this._handleLabelClick),
                (this._handleClickSelectedCountry = () => {
                  this.dropdownContent.classList.contains('iti__hide') &&
                    !this.telInput.disabled &&
                    !this.telInput.readOnly &&
                    this._openDropdown()
                }),
                this.selectedCountry.addEventListener(
                  'click',
                  this._handleClickSelectedCountry
                ),
                (this._handleCountryContainerKeydown = (r) => {
                  this.dropdownContent.classList.contains('iti__hide') &&
                    ['ArrowUp', 'ArrowDown', ' ', 'Enter'].includes(r.key) &&
                    (r.preventDefault(),
                    r.stopPropagation(),
                    this._openDropdown()),
                    r.key === 'Tab' && this._closeDropdown()
                }),
                this.countryContainer.addEventListener(
                  'keydown',
                  this._handleCountryContainerKeydown
                )
            }
            _initRequests() {
              let {
                loadUtils: l,
                initialCountry: r,
                geoIpLookup: h
              } = this.options
              l && !x.utils
                ? ((this._handlePageLoad = () => {
                    window.removeEventListener('load', this._handlePageLoad),
                      x.attachUtils(l)?.catch(() => {})
                  }),
                  x.documentReady()
                    ? this._handlePageLoad()
                    : window.addEventListener('load', this._handlePageLoad))
                : this.resolveUtilsScriptPromise(),
                r === 'auto' && h && !this.selectedCountryData.iso2
                  ? this._loadAutoCountry()
                  : this.resolveAutoCountryPromise()
            }
            _loadAutoCountry() {
              x.autoCountry
                ? this.handleAutoCountry()
                : x.startedLoadingAutoCountry ||
                  ((x.startedLoadingAutoCountry = !0),
                  typeof this.options.geoIpLookup == 'function' &&
                    this.options.geoIpLookup(
                      (l = '') => {
                        let r = l.toLowerCase()
                        r && this._getCountryData(r, !0)
                          ? ((x.autoCountry = r),
                            setTimeout(() => _('handleAutoCountry')))
                          : (this._setInitialState(!0),
                            _('rejectAutoCountryPromise'))
                      },
                      () => {
                        this._setInitialState(!0), _('rejectAutoCountryPromise')
                      }
                    ))
            }
            _openDropdownWithPlus() {
              this._openDropdown(),
                (this.searchInput.value = '+'),
                this._filterCountries('', !0)
            }
            _initTelInputListeners() {
              let {
                  strictMode: l,
                  formatAsYouType: r,
                  separateDialCode: h,
                  formatOnDisplay: p,
                  allowDropdown: C,
                  countrySearch: k
                } = this.options,
                D = !1
              ;/\p{L}/u.test(this.telInput.value) && (D = !0),
                (this._handleInputEvent = (A) => {
                  if (this.isAndroid && A?.data === '+' && h && C && k) {
                    let j = this.telInput.selectionStart || 0,
                      H = this.telInput.value.substring(0, j - 1),
                      B = this.telInput.value.substring(j)
                    ;(this.telInput.value = H + B), this._openDropdownWithPlus()
                    return
                  }
                  this._updateCountryFromNumber(this.telInput.value) &&
                    this._triggerCountryChange()
                  let z = A?.data && /[^+0-9]/.test(A.data),
                    V =
                      A?.inputType === 'insertFromPaste' && this.telInput.value
                  z || (V && !l)
                    ? (D = !0)
                    : /[^+0-9]/.test(this.telInput.value) || (D = !1)
                  let U = A?.detail && A.detail.isSetNumber && !p
                  if (r && !D && !U) {
                    let j = this.telInput.selectionStart || 0,
                      B = this.telInput.value
                        .substring(0, j)
                        .replace(/[^+0-9]/g, '').length,
                      q = A?.inputType === 'deleteContentForward',
                      ut = this._formatNumberAsYouType(),
                      nt = T(B, ut, j, q)
                    ;(this.telInput.value = ut),
                      this.telInput.setSelectionRange(nt, nt)
                  }
                }),
                this.telInput.addEventListener('input', this._handleInputEvent),
                (l || h) &&
                  ((this._handleKeydownEvent = (A) => {
                    if (
                      A.key &&
                      A.key.length === 1 &&
                      !A.altKey &&
                      !A.ctrlKey &&
                      !A.metaKey
                    ) {
                      if (h && C && k && A.key === '+') {
                        A.preventDefault(), this._openDropdownWithPlus()
                        return
                      }
                      if (l) {
                        let z = this.telInput.value,
                          V = z.charAt(0) === '+',
                          U =
                            !V &&
                            this.telInput.selectionStart === 0 &&
                            A.key === '+',
                          j = /^[0-9]$/.test(A.key),
                          H = h ? j : U || j,
                          B =
                            z.slice(0, this.telInput.selectionStart) +
                            A.key +
                            z.slice(this.telInput.selectionEnd),
                          q = this._getFullNumber(B),
                          ut = x.utils.getCoreNumber(
                            q,
                            this.selectedCountryData.iso2
                          ),
                          nt =
                            this.maxCoreNumberLength &&
                            ut.length > this.maxCoreNumberLength,
                          zt = !1
                        if (V) {
                          let Ne = this.selectedCountryData.iso2
                          zt = this._getCountryFromNumber(q) !== Ne
                        }
                        ;(!H || (nt && !zt && !U)) && A.preventDefault()
                      }
                    }
                  }),
                  this.telInput.addEventListener(
                    'keydown',
                    this._handleKeydownEvent
                  ))
            }
            _cap(l) {
              let r = parseInt(
                this.telInput.getAttribute('maxlength') || '',
                10
              )
              return r && l.length > r ? l.substr(0, r) : l
            }
            _trigger(l, r = {}) {
              let h = new CustomEvent(l, {
                bubbles: !0,
                cancelable: !0,
                detail: r
              })
              this.telInput.dispatchEvent(h)
            }
            _openDropdown() {
              let { fixDropdownWidth: l, countrySearch: r } = this.options
              if (
                (l &&
                  (this.dropdownContent.style.width = `${this.telInput.offsetWidth}px`),
                this.dropdownContent.classList.remove('iti__hide'),
                this.selectedCountry.setAttribute('aria-expanded', 'true'),
                this._setDropdownPosition(),
                r)
              ) {
                let h = this.countryList.firstElementChild
                h &&
                  (this._highlightListItem(h, !1),
                  (this.countryList.scrollTop = 0)),
                  this.searchInput.focus()
              }
              this._bindDropdownListeners(),
                this.dropdownArrow.classList.add('iti__arrow--up'),
                this._trigger('open:countrydropdown')
            }
            _setDropdownPosition() {
              if (
                (this.options.dropdownContainer &&
                  this.options.dropdownContainer.appendChild(this.dropdown),
                !this.options.useFullscreenPopup)
              ) {
                let l = this.telInput.getBoundingClientRect(),
                  r = this.telInput.offsetHeight
                this.options.dropdownContainer &&
                  ((this.dropdown.style.top = `${l.top + r}px`),
                  (this.dropdown.style.left = `${l.left}px`),
                  (this._handleWindowScroll = () => this._closeDropdown()),
                  window.addEventListener('scroll', this._handleWindowScroll))
              }
            }
            _bindDropdownListeners() {
              ;(this._handleMouseoverCountryList = (p) => {
                let C = p.target?.closest('.iti__country')
                C && this._highlightListItem(C, !1)
              }),
                this.countryList.addEventListener(
                  'mouseover',
                  this._handleMouseoverCountryList
                ),
                (this._handleClickCountryList = (p) => {
                  let C = p.target?.closest('.iti__country')
                  C && this._selectListItem(C)
                }),
                this.countryList.addEventListener(
                  'click',
                  this._handleClickCountryList
                )
              let l = !0
              ;(this._handleClickOffToClose = () => {
                l || this._closeDropdown(), (l = !1)
              }),
                document.documentElement.addEventListener(
                  'click',
                  this._handleClickOffToClose
                )
              let r = '',
                h = null
              if (
                ((this._handleKeydownOnDropdown = (p) => {
                  ;['ArrowUp', 'ArrowDown', 'Enter', 'Escape'].includes(
                    p.key
                  ) &&
                    (p.preventDefault(),
                    p.stopPropagation(),
                    p.key === 'ArrowUp' || p.key === 'ArrowDown'
                      ? this._handleUpDownKey(p.key)
                      : p.key === 'Enter'
                        ? this._handleEnterKey()
                        : p.key === 'Escape' && this._closeDropdown()),
                    !this.options.countrySearch &&
                      /^[a-zA-ZÀ-ÿа-яА-Я ]$/.test(p.key) &&
                      (p.stopPropagation(),
                      h && clearTimeout(h),
                      (r += p.key.toLowerCase()),
                      this._searchForCountry(r),
                      (h = setTimeout(() => {
                        r = ''
                      }, 1e3)))
                }),
                document.addEventListener(
                  'keydown',
                  this._handleKeydownOnDropdown
                ),
                this.options.countrySearch)
              ) {
                let p = () => {
                    let k = this.searchInput.value.trim()
                    k ? this._filterCountries(k) : this._filterCountries('', !0)
                  },
                  C = null
                ;(this._handleSearchChange = () => {
                  C && clearTimeout(C),
                    (C = setTimeout(() => {
                      p(), (C = null)
                    }, 100))
                }),
                  this.searchInput.addEventListener(
                    'input',
                    this._handleSearchChange
                  ),
                  this.searchInput.addEventListener('click', (k) =>
                    k.stopPropagation()
                  )
              }
            }
            _searchForCountry(l) {
              for (let r = 0; r < this.countries.length; r++) {
                let h = this.countries[r]
                if (h.name.substr(0, l.length).toLowerCase() === l) {
                  let C = h.nodeById[this.id]
                  this._highlightListItem(C, !1), this._scrollTo(C)
                  break
                }
              }
            }
            _filterCountries(l, r = !1) {
              let h = !0
              this.countryList.innerHTML = ''
              let p = R(l)
              for (let C = 0; C < this.countries.length; C++) {
                let k = this.countries[C],
                  D = R(k.name),
                  A = k.name
                    .split(/[^a-zA-ZÀ-ÿа-яА-Я]/)
                    .map((V) => V[0])
                    .join('')
                    .toLowerCase(),
                  z = `+${k.dialCode}`
                if (
                  r ||
                  D.includes(p) ||
                  z.includes(p) ||
                  k.iso2.includes(p) ||
                  A.includes(p)
                ) {
                  let V = k.nodeById[this.id]
                  V && this.countryList.appendChild(V),
                    h && (this._highlightListItem(V, !1), (h = !1))
                }
              }
              h && this._highlightListItem(null, !1),
                (this.countryList.scrollTop = 0),
                this._updateSearchResultsText()
            }
            _updateSearchResultsText() {
              let { i18n: l } = this.options,
                r = this.countryList.childElementCount,
                h
              r === 0
                ? (h = l.zeroSearchResults)
                : r === 1
                  ? (h = l.oneSearchResult)
                  : (h = l.multipleSearchResults.replace(
                      '${count}',
                      r.toString()
                    )),
                (this.searchResultsA11yText.textContent = h)
            }
            _handleUpDownKey(l) {
              let r =
                l === 'ArrowUp'
                  ? this.highlightedItem?.previousElementSibling
                  : this.highlightedItem?.nextElementSibling
              !r &&
                this.countryList.childElementCount > 1 &&
                (r =
                  l === 'ArrowUp'
                    ? this.countryList.lastElementChild
                    : this.countryList.firstElementChild),
                r && (this._scrollTo(r), this._highlightListItem(r, !1))
            }
            _handleEnterKey() {
              this.highlightedItem && this._selectListItem(this.highlightedItem)
            }
            _updateValFromNumber(l) {
              let r = l
              if (
                this.options.formatOnDisplay &&
                x.utils &&
                this.selectedCountryData
              ) {
                let h =
                    this.options.nationalMode ||
                    (r.charAt(0) !== '+' && !this.options.separateDialCode),
                  { NATIONAL: p, INTERNATIONAL: C } = x.utils.numberFormat,
                  k = h ? p : C
                r = x.utils.formatNumber(r, this.selectedCountryData.iso2, k)
              }
              ;(r = this._beforeSetNumber(r)), (this.telInput.value = r)
            }
            _updateCountryFromNumber(l) {
              let r = this._getCountryFromNumber(l)
              return r !== null ? this._setCountry(r) : !1
            }
            _ensureHasDialCode(l) {
              let { dialCode: r, nationalPrefix: h } = this.selectedCountryData
              if (l.charAt(0) === '+' || !r) return l
              let k =
                h && l.charAt(0) === h && !this.options.separateDialCode
                  ? l.substring(1)
                  : l
              return `+${r}${k}`
            }
            _getCountryFromNumber(l) {
              let r = l.indexOf('+'),
                h = r ? l.substring(r) : l,
                p = this.selectedCountryData.iso2,
                C = this.selectedCountryData.dialCode
              h = this._ensureHasDialCode(h)
              let k = this._getDialCode(h, !0),
                D = E(h)
              if (k) {
                let A = E(k),
                  z = this.dialCodeToIso2Map[A]
                if (
                  !p &&
                  this.defaultCountry &&
                  z.includes(this.defaultCountry)
                )
                  return this.defaultCountry
                let V =
                  p &&
                  z.includes(p) &&
                  (D.length === A.length || !this.selectedCountryData.areaCodes)
                if (!(C === '1' && P(D)) && !V) {
                  for (let j = 0; j < z.length; j++) if (z[j]) return z[j]
                }
              } else {
                if (h.charAt(0) === '+' && D.length) return ''
                if ((!h || h === '+') && !this.selectedCountryData.iso2)
                  return this.defaultCountry
              }
              return null
            }
            _highlightListItem(l, r) {
              let h = this.highlightedItem
              if (
                (h &&
                  (h.classList.remove('iti__highlight'),
                  h.setAttribute('aria-selected', 'false')),
                (this.highlightedItem = l),
                this.highlightedItem)
              ) {
                this.highlightedItem.classList.add('iti__highlight'),
                  this.highlightedItem.setAttribute('aria-selected', 'true')
                let p = this.highlightedItem.getAttribute('id') || ''
                this.selectedCountry.setAttribute('aria-activedescendant', p),
                  this.options.countrySearch &&
                    this.searchInput.setAttribute('aria-activedescendant', p)
              }
              r && this.highlightedItem.focus()
            }
            _getCountryData(l, r) {
              for (let h = 0; h < this.countries.length; h++)
                if (this.countries[h].iso2 === l) return this.countries[h]
              if (r) return null
              throw new Error(`No country data for '${l}'`)
            }
            _setCountry(l) {
              let { separateDialCode: r, showFlags: h, i18n: p } = this.options,
                C = this.selectedCountryData.iso2
                  ? this.selectedCountryData
                  : {}
              if (
                ((this.selectedCountryData = l
                  ? this._getCountryData(l, !1) || {}
                  : {}),
                this.selectedCountryData.iso2 &&
                  (this.defaultCountry = this.selectedCountryData.iso2),
                this.selectedCountryInner)
              ) {
                let k = '',
                  D = ''
                l && h
                  ? ((k = `iti__flag iti__${l}`),
                    (D = `${this.selectedCountryData.name} +${this.selectedCountryData.dialCode}`))
                  : ((k = 'iti__flag iti__globe'), (D = p.noCountrySelected)),
                  (this.selectedCountryInner.className = k),
                  (this.selectedCountryA11yText.textContent = D)
              }
              if ((this._setSelectedCountryTitleAttribute(l, r), r)) {
                let k = this.selectedCountryData.dialCode
                  ? `+${this.selectedCountryData.dialCode}`
                  : ''
                ;(this.selectedDialCode.innerHTML = k),
                  this._updateInputPadding()
              }
              return (
                this._updatePlaceholder(), this._updateMaxLength(), C.iso2 !== l
              )
            }
            _updateInputPadding() {
              if (this.selectedCountry) {
                let r =
                  (this.selectedCountry.offsetWidth ||
                    this._getHiddenSelectedCountryWidth()) + 6
                this.showSelectedCountryOnLeft
                  ? (this.telInput.style.paddingLeft = `${r}px`)
                  : (this.telInput.style.paddingRight = `${r}px`)
              }
            }
            _updateMaxLength() {
              let {
                  strictMode: l,
                  placeholderNumberType: r,
                  validationNumberTypes: h
                } = this.options,
                { iso2: p } = this.selectedCountryData
              if (l && x.utils)
                if (p) {
                  let C = x.utils.numberType[r],
                    k = x.utils.getExampleNumber(p, !1, C, !0),
                    D = k
                  for (; x.utils.isPossibleNumber(k, p, h); )
                    (D = k), (k += '0')
                  let A = x.utils.getCoreNumber(D, p)
                  ;(this.maxCoreNumberLength = A.length),
                    p === 'by' && (this.maxCoreNumberLength = A.length + 1)
                } else this.maxCoreNumberLength = null
            }
            _setSelectedCountryTitleAttribute(l = null, r) {
              if (!this.selectedCountry) return
              let h
              l && !r
                ? (h = `${this.selectedCountryData.name}: +${this.selectedCountryData.dialCode}`)
                : l
                  ? (h = this.selectedCountryData.name)
                  : (h = 'Unknown'),
                this.selectedCountry.setAttribute('title', h)
            }
            _getHiddenSelectedCountryWidth() {
              if (this.telInput.parentNode) {
                let l = this.telInput.parentNode.cloneNode(!1)
                ;(l.style.visibility = 'hidden'), document.body.appendChild(l)
                let r = this.countryContainer.cloneNode()
                l.appendChild(r)
                let h = this.selectedCountry.cloneNode(!0)
                r.appendChild(h)
                let p = h.offsetWidth
                return document.body.removeChild(l), p
              }
              return 0
            }
            _updatePlaceholder() {
              let {
                  autoPlaceholder: l,
                  placeholderNumberType: r,
                  nationalMode: h,
                  customPlaceholder: p
                } = this.options,
                C =
                  l === 'aggressive' ||
                  (!this.hadInitialPlaceholder && l === 'polite')
              if (x.utils && C) {
                let k = x.utils.numberType[r],
                  D = this.selectedCountryData.iso2
                    ? x.utils.getExampleNumber(
                        this.selectedCountryData.iso2,
                        h,
                        k
                      )
                    : ''
                ;(D = this._beforeSetNumber(D)),
                  typeof p == 'function' &&
                    (D = p(D, this.selectedCountryData)),
                  this.telInput.setAttribute('placeholder', D)
              }
            }
            _selectListItem(l) {
              let r = this._setCountry(l.getAttribute('data-country-code'))
              this._closeDropdown(),
                this._updateDialCode(l.getAttribute('data-dial-code')),
                this.telInput.focus(),
                r && this._triggerCountryChange()
            }
            _closeDropdown() {
              this.dropdownContent.classList.add('iti__hide'),
                this.selectedCountry.setAttribute('aria-expanded', 'false'),
                this.selectedCountry.removeAttribute('aria-activedescendant'),
                this.highlightedItem &&
                  this.highlightedItem.setAttribute('aria-selected', 'false'),
                this.options.countrySearch &&
                  this.searchInput.removeAttribute('aria-activedescendant'),
                this.dropdownArrow.classList.remove('iti__arrow--up'),
                document.removeEventListener(
                  'keydown',
                  this._handleKeydownOnDropdown
                ),
                this.options.countrySearch &&
                  this.searchInput.removeEventListener(
                    'input',
                    this._handleSearchChange
                  ),
                document.documentElement.removeEventListener(
                  'click',
                  this._handleClickOffToClose
                ),
                this.countryList.removeEventListener(
                  'mouseover',
                  this._handleMouseoverCountryList
                ),
                this.countryList.removeEventListener(
                  'click',
                  this._handleClickCountryList
                ),
                this.options.dropdownContainer &&
                  (this.options.useFullscreenPopup ||
                    window.removeEventListener(
                      'scroll',
                      this._handleWindowScroll
                    ),
                  this.dropdown.parentNode &&
                    this.dropdown.parentNode.removeChild(this.dropdown)),
                this._handlePageLoad &&
                  window.removeEventListener('load', this._handlePageLoad),
                this._trigger('close:countrydropdown')
            }
            _scrollTo(l) {
              let r = this.countryList,
                h = document.documentElement.scrollTop,
                p = r.offsetHeight,
                C = r.getBoundingClientRect().top + h,
                k = C + p,
                D = l.offsetHeight,
                A = l.getBoundingClientRect().top + h,
                z = A + D,
                V = A - C + r.scrollTop
              if (A < C) r.scrollTop = V
              else if (z > k) {
                let U = p - D
                r.scrollTop = V - U
              }
            }
            _updateDialCode(l) {
              let r = this.telInput.value,
                h = `+${l}`,
                p
              if (r.charAt(0) === '+') {
                let C = this._getDialCode(r)
                C ? (p = r.replace(C, h)) : (p = h), (this.telInput.value = p)
              }
            }
            _getDialCode(l, r) {
              let h = ''
              if (l.charAt(0) === '+') {
                let p = ''
                for (let C = 0; C < l.length; C++) {
                  let k = l.charAt(C)
                  if (!isNaN(parseInt(k, 10))) {
                    if (((p += k), r))
                      this.dialCodeToIso2Map[p] && (h = l.substr(0, C + 1))
                    else if (this.dialCodes[p]) {
                      h = l.substr(0, C + 1)
                      break
                    }
                    if (p.length === this.dialCodeMaxLen) break
                  }
                }
              }
              return h
            }
            _getFullNumber(l) {
              let r = l || this.telInput.value.trim(),
                { dialCode: h } = this.selectedCountryData,
                p,
                C = E(r)
              return (
                this.options.separateDialCode && r.charAt(0) !== '+' && h && C
                  ? (p = `+${h}`)
                  : (p = ''),
                p + r
              )
            }
            _beforeSetNumber(l) {
              let r = l
              if (this.options.separateDialCode) {
                let h = this._getDialCode(r)
                if (h) {
                  h = `+${this.selectedCountryData.dialCode}`
                  let p =
                    r[h.length] === ' ' || r[h.length] === '-'
                      ? h.length + 1
                      : h.length
                  r = r.substr(p)
                }
              }
              return this._cap(r)
            }
            _triggerCountryChange() {
              this._trigger('countrychange')
            }
            _formatNumberAsYouType() {
              let l = this._getFullNumber(),
                r = x.utils
                  ? x.utils.formatNumberAsYouType(
                      l,
                      this.selectedCountryData.iso2
                    )
                  : l,
                { dialCode: h } = this.selectedCountryData
              return this.options.separateDialCode &&
                this.telInput.value.charAt(0) !== '+' &&
                r.includes(`+${h}`)
                ? (r.split(`+${h}`)[1] || '').trim()
                : r
            }
            handleAutoCountry() {
              this.options.initialCountry === 'auto' &&
                x.autoCountry &&
                ((this.defaultCountry = x.autoCountry),
                this.selectedCountryData.iso2 ||
                  this.selectedCountryInner.classList.contains('iti__globe') ||
                  this.setCountry(this.defaultCountry),
                this.resolveAutoCountryPromise())
            }
            handleUtils() {
              x.utils &&
                (this.telInput.value &&
                  this._updateValFromNumber(this.telInput.value),
                this.selectedCountryData.iso2 &&
                  (this._updatePlaceholder(), this._updateMaxLength())),
                this.resolveUtilsScriptPromise()
            }
            destroy() {
              let { allowDropdown: l, separateDialCode: r } = this.options
              if (l) {
                this._closeDropdown(),
                  this.selectedCountry.removeEventListener(
                    'click',
                    this._handleClickSelectedCountry
                  ),
                  this.countryContainer.removeEventListener(
                    'keydown',
                    this._handleCountryContainerKeydown
                  )
                let C = this.telInput.closest('label')
                C && C.removeEventListener('click', this._handleLabelClick)
              }
              let { form: h } = this.telInput
              this._handleHiddenInputSubmit &&
                h &&
                h.removeEventListener('submit', this._handleHiddenInputSubmit),
                this.telInput.removeEventListener(
                  'input',
                  this._handleInputEvent
                ),
                this._handleKeydownEvent &&
                  this.telInput.removeEventListener(
                    'keydown',
                    this._handleKeydownEvent
                  ),
                this.telInput.removeAttribute('data-intl-tel-input-id'),
                r &&
                  (this.isRTL
                    ? (this.telInput.style.paddingRight =
                        this.originalPaddingRight)
                    : (this.telInput.style.paddingLeft =
                        this.originalPaddingLeft))
              let p = this.telInput.parentNode
              p?.parentNode?.insertBefore(this.telInput, p),
                p?.parentNode?.removeChild(p),
                delete x.instances[this.id]
            }
            getExtension() {
              return x.utils
                ? x.utils.getExtension(
                    this._getFullNumber(),
                    this.selectedCountryData.iso2
                  )
                : ''
            }
            getNumber(l) {
              if (x.utils) {
                let { iso2: r } = this.selectedCountryData
                return x.utils.formatNumber(this._getFullNumber(), r, l)
              }
              return ''
            }
            getNumberType() {
              return x.utils
                ? x.utils.getNumberType(
                    this._getFullNumber(),
                    this.selectedCountryData.iso2
                  )
                : -99
            }
            getSelectedCountryData() {
              return this.selectedCountryData
            }
            getValidationError() {
              if (x.utils) {
                let { iso2: l } = this.selectedCountryData
                return x.utils.getValidationError(this._getFullNumber(), l)
              }
              return -99
            }
            isValidNumber() {
              if (!this.selectedCountryData.iso2) return !1
              let l = this._getFullNumber(),
                r = l.search(/\p{L}/u)
              if (r > -1) {
                let h = l.substring(0, r),
                  p = this._utilsIsPossibleNumber(h),
                  C = this._utilsIsPossibleNumber(l)
                return p && C
              }
              return this._utilsIsPossibleNumber(l)
            }
            _utilsIsPossibleNumber(l) {
              return x.utils
                ? x.utils.isPossibleNumber(
                    l,
                    this.selectedCountryData.iso2,
                    this.options.validationNumberTypes
                  )
                : null
            }
            isValidNumberPrecise() {
              if (!this.selectedCountryData.iso2) return !1
              let l = this._getFullNumber(),
                r = l.search(/\p{L}/u)
              if (r > -1) {
                let h = l.substring(0, r),
                  p = this._utilsIsValidNumber(h),
                  C = this._utilsIsValidNumber(l)
                return p && C
              }
              return this._utilsIsValidNumber(l)
            }
            _utilsIsValidNumber(l) {
              return x.utils
                ? x.utils.isValidNumber(
                    l,
                    this.selectedCountryData.iso2,
                    this.options.validationNumberTypes
                  )
                : null
            }
            setCountry(l) {
              let r = l?.toLowerCase(),
                h = this.selectedCountryData.iso2
              ;((l && r !== h) || (!l && h)) &&
                (this._setCountry(r),
                this._updateDialCode(this.selectedCountryData.dialCode),
                this._triggerCountryChange())
            }
            setNumber(l) {
              let r = this._updateCountryFromNumber(l)
              this._updateValFromNumber(l),
                r && this._triggerCountryChange(),
                this._trigger('input', { isSetNumber: !0 })
            }
            setPlaceholderNumberType(l) {
              ;(this.options.placeholderNumberType = l),
                this._updatePlaceholder()
            }
            setDisabled(l) {
              ;(this.telInput.disabled = l),
                l
                  ? this.selectedCountry.setAttribute('disabled', 'true')
                  : this.selectedCountry.removeAttribute('disabled')
            }
          },
          N = (l) => {
            if (!x.utils && !x.startedLoadingUtilsScript) {
              let r
              if (typeof l == 'function')
                try {
                  r = Promise.resolve(l())
                } catch (h) {
                  return Promise.reject(h)
                }
              else
                return Promise.reject(
                  new TypeError(
                    `The argument passed to attachUtils must be a function that returns a promise for the utilities module, not ${typeof l}`
                  )
                )
              return (
                (x.startedLoadingUtilsScript = !0),
                r
                  .then((h) => {
                    let p = h?.default
                    if (!p || typeof p != 'object')
                      throw new TypeError(
                        'The loader function passed to attachUtils did not resolve to a module object with utils as its default export.'
                      )
                    return (x.utils = p), _('handleUtils'), !0
                  })
                  .catch((h) => {
                    throw (_('rejectUtilsScriptPromise', h), h)
                  })
              )
            }
            return null
          },
          x = Object.assign(
            (l, r) => {
              let h = new O(l, r)
              return (
                h._init(),
                l.setAttribute('data-intl-tel-input-id', h.id.toString()),
                (x.instances[h.id] = h),
                h
              )
            },
            {
              defaults: S,
              documentReady: () => document.readyState === 'complete',
              getCountryData: () => g,
              getInstance: (l) => {
                let r = l.getAttribute('data-intl-tel-input-id')
                return r ? x.instances[r] : null
              },
              instances: {},
              attachUtils: N,
              startedLoadingUtilsScript: !1,
              startedLoadingAutoCountry: !1,
              version: '25.3.2'
            }
          ),
          W = x
        return w(I)
      })()
      return d.default
    })
  })
  function Qt() {
    typeof window.afdDataInit > 'u' && (window.afdDataInit = !1)
    let d = () => {
      let e = ['country'],
        s = []
      jQuery('[data-afd-control]').each(function () {
        let o = jQuery(this),
          u = o.data('afd-control')
        e.indexOf(u) > -1 &&
          s.push(
            new Promise(function (y) {
              Bt(o, u, y)
            })
          )
      }),
        Promise.all(s).then(function () {
          jQuery('[data-afd-control]').each(function () {
            let o = jQuery(this),
              u = o.data('afd-control')
            e.indexOf(u) === -1 && Bt(o, u, null)
          })
        })
    }
    jQuery(document).off('afd::page_ready').on('afd::page_ready', d),
      document.readyState === 'loading'
        ? document.addEventListener('DOMContentLoaded', t)
        : t()
    function t() {
      window.afdDataInit || ((window.afdDataInit = !0), d())
    }
  }
  function Bt(d, t, e) {
    try {
      d.afd(t, void 0, e)
    } catch (s) {
      console.error('Error initializing control:', s)
    }
  }
  var Ut = () => {
    ;(function (d) {
      if (d.fn.afd) return
      ;(d.fn.afd = function (s, o, u) {
        return (
          this.each((y, w) => {
            let I = d(w)
            I.attr('data-afd-control', s)
            let b = [
              'lookupField',
              'lookupResultsList',
              'reverseGeocodeResultsList',
              'sort',
              'expiry',
              'cvv'
            ]
            if (b.indexOf(s) > -1) return
            let M = [
              'typeahead',
              'lookupButton',
              'country',
              'reverseGeocodeButton',
              'phone',
              'email',
              'account',
              'card',
              'cleanse'
            ]
            if (M.indexOf(s) === -1)
              throw (
                '`' +
                s +
                '` is not a valid AFD jQuery control.  Please use one of ' +
                M +
                ',' +
                b
              )
            t(s)
            try {
              e(I, s, o, u)
            } catch (g) {
              console.error('Problem initialising AFD Control'),
                console.error(g)
            }
          }),
          this
        )
      }),
        Qt($),
        typeof window.afdPostRenderInit < 'u' &&
          (d(document).ready(function () {
            afdOptions.postRender.preventAutoInit ||
              d(document).trigger('afd::initPostRender')
          }),
          d(document).on('afd::initPostRender', () => {
            try {
              if (typeof afdOptions.postRender > 'u')
                throw 'Post Render version of plugin used but no post render options supplied'
              window.afdPostRenderInit(afdOptions.postRender),
                d(document).trigger('afd:postRenderInitComplete')
            } catch (s) {
              console.error(s)
            }
            d(document).trigger('afd::page_ready')
          }))
      let t = (s) => {
          if (!window.afdInitScripts[s])
            throw (
              'You are trying to intitialise the control `' +
              s +
              '` but it seems that you have not loaded this module'
            )
        },
        e = (s, o, u, y) => {
          try {
            window.afdInitScripts[o](s, u, y)
          } catch (w) {
            console.error('Problem initialising AFD Control'), console.error(w)
          }
        }
    })(jQuery)
  }
  var G = {
    pceUrl: '//pce.afd.co.uk/afddata.pce',
    nativeValidationMessages: !1,
    defaultCountry: null,
    afdc: 0,
    platformVersion: null,
    phone: {
      defaultDialingCode: '+44',
      invalidPhoneNumberMessage: 'Please input a valid phone number',
      loadingSpinner: null,
      countryControl: null,
      countryControlConverter: null,
      additionalPCEParams: {}
    },
    email: {
      invalidEmailMessage: 'Please input a valid email address',
      loadingSpinner: null,
      task: 'live',
      additionalPCEParams: {}
    },
    card: {
      invalidCardNumberMessage: 'Please input a valid card number',
      invalidCardOrExpiryMessage:
        'Either the card number or expiry date are not valid',
      invalidExpiryMonthMessage: 'Please input a valid month',
      invalidExpiryDateMessage: 'Please input a valid expiry date',
      loadingSpinner: null,
      logoHeight: 16,
      logoWidth: 24,
      additionalPCEParams: {}
    },
    account: {
      invalidAccountNumberMessage: 'Please input a valid account number',
      invalidSortCodeMessage: 'Please input a valid Sort Code',
      loadingSpinner: null,
      additionalPCEParams: {}
    },
    typeahead: {
      maxItems: 5,
      pushUp: !1,
      afterHideTypeahead: !1,
      searchAgain: !0,
      afterClearTypeahead: !0,
      beforeHideResults: !1,
      parentClass: null,
      fieldSets: [],
      manualInputButton: !1,
      fewResultsManualInput: !0,
      fewResultsManualInputText: "Can't see your address? Enter it manually",
      notEmptyShowResults: !1,
      hideEmpties: !1,
      containers: [],
      retrieveFields: 'standard',
      availableCountries: [],
      minLength: 2,
      matchPositions: !1,
      postcodeFirst: !0,
      hideForCountries: [],
      showForCountries: [],
      containerOnlyContainsControl: !1,
      regionMap: null,
      regionAttribute: 'value',
      listEnv: !1,
      flatSubBuild: !1,
      extraPCESearchParams: {},
      extraPCERetrieveParams: {},
      bankLookup: !1,
      providerInfo: !1,
      w3wMode: 1,
      w3wNear: !1,
      w3wNearTemplate: 'Near {near}',
      w3wFocusMode: !1,
      w3wDistance: !1,
      w3wDistanceUnit: 'm',
      w3wDistanceTemplate: '{distance} Miles',
      requiredSelector: null,
      searchTask: 'fastfindv4',
      searchField: 'lookup',
      locationBias: !1
    },
    lookup: {
      prefetch: !0,
      pushUp: !1,
      afterHideButtonAndFields: !1,
      fieldContainer: null,
      searchAgain: !0,
      beforeHideResults: !1,
      parentClass: null,
      fieldSets: [],
      manualInputButton: !1,
      hideEmpties: !1,
      afterRetrieveHideResultsList: !0,
      postcodeIsLookup: !1,
      resultsContainer: '',
      containers: [],
      retrieveFields: 'standard',
      availableCountries: [],
      postcodeFirst: !0,
      hideForCountries: [],
      showForCountries: [],
      regionMap: null,
      regionAttribute: 'value',
      selectAddressText: 'Please select an address',
      noResultsText: 'No results found, click to enter address manually',
      listEnv: !1,
      flatSubBuild: !1,
      extraPCESearchParams: {},
      extraPCERetrieveParams: {},
      bankLookup: !1,
      requiredSelector: null,
      searchTask: 'fastfindv4',
      searchField: 'lookup'
    },
    country: {
      containers: [],
      defaultCountry: null,
      availableCountries: [],
      preferredCountries: [],
      customCountryControl: null,
      customCountryConverter: null,
      selectIPCountry: !1,
      mostUsedCountries: 0
    },
    cleanse: {
      pceUrl: 'https://refiner.afd.co.uk/v1/refiner/GBR/clean',
      linkedControl: 'typeahead',
      message:
        'We found a better match for your address. Do you want to use it?',
      yesButtonText: 'Yes',
      noButtonText: 'No'
    },
    reverseGeocode: {
      maxItems: 100,
      pushUp: !1,
      fieldSets: [],
      hideEmpties: !1,
      afterRetrieveHideResultsList: !0,
      containers: [],
      retrieveFields: 'standard',
      postcodeFirst: !0,
      hideForCountries: [],
      showForCountries: ['GBR'],
      linkedControl: 'typeahead',
      hideOnDesktop: !1,
      buttonContainer: null
    }
  }
  var Q = class {
    constructor(t, e) {
      this.countryCodeMap = [
        ['AF', 'AFG'],
        ['AX', 'ALA'],
        ['AL', 'ALB'],
        ['DZ', 'DZA'],
        ['AS', 'ASM'],
        ['AD', 'AND'],
        ['AO', 'AGO'],
        ['AI', 'AIA'],
        ['AQ', 'ATA'],
        ['AG', 'ATG'],
        ['AR', 'ARG'],
        ['AM', 'ARM'],
        ['AN', 'ANT'],
        ['AW', 'ABW'],
        ['AU', 'AUS'],
        ['AT', 'AUT'],
        ['AZ', 'AZE'],
        ['BS', 'BHS'],
        ['BH', 'BHR'],
        ['BD', 'BGD'],
        ['BB', 'BRB'],
        ['BY', 'BLR'],
        ['BE', 'BEL'],
        ['BZ', 'BLZ'],
        ['BJ', 'BEN'],
        ['BM', 'BMU'],
        ['BT', 'BTN'],
        ['BQ', 'BES'],
        ['BO', 'BOL'],
        ['BA', 'BIH'],
        ['BW', 'BWA'],
        ['BR', 'BRA'],
        ['IO', 'IOT'],
        ['BN', 'BRN'],
        ['BG', 'BGR'],
        ['BF', 'BFA'],
        ['BI', 'BDI'],
        ['KH', 'KHM'],
        ['CM', 'CMR'],
        ['CA', 'CAN'],
        ['CV', 'CPV'],
        ['KY', 'CYM'],
        ['CF', 'CAF'],
        ['TD', 'TCD'],
        ['CL', 'CHL'],
        ['CN', 'CHN'],
        ['CX', 'CXR'],
        ['CC', 'CCK'],
        ['CO', 'COL'],
        ['KM', 'COM'],
        ['CG', 'COG'],
        ['CD', 'COD'],
        ['CK', 'COK'],
        ['CR', 'CRI'],
        ['CI', 'CIV'],
        ['HR', 'HRV'],
        ['CU', 'CUB'],
        ['CW', 'CUW'],
        ['CY', 'CYP'],
        ['CZ', 'CZE'],
        ['DK', 'DNK'],
        ['DJ', 'DJI'],
        ['DM', 'DMA'],
        ['DO', 'DOM'],
        ['EC', 'ECU'],
        ['EG', 'EGY'],
        ['SV', 'SLV'],
        ['GQ', 'GNQ'],
        ['ER', 'ERI'],
        ['EE', 'EST'],
        ['SZ', 'SWZ'],
        ['ET', 'ETH'],
        ['FK', 'FLK'],
        ['FO', 'FRO'],
        ['FJ', 'FJI'],
        ['FI', 'FIN'],
        ['FR', 'FRA'],
        ['GF', 'GUF'],
        ['PF', 'PYF'],
        ['TF', 'ATF'],
        ['GA', 'GAB'],
        ['GM', 'GMB'],
        ['GE', 'GEO'],
        ['DE', 'DEU'],
        ['GH', 'GHA'],
        ['GI', 'GIB'],
        ['GR', 'GRC'],
        ['GL', 'GRL'],
        ['GD', 'GRD'],
        ['GP', 'GLP'],
        ['GT', 'GTM'],
        ['GG', 'GGY'],
        ['GN', 'GIN'],
        ['GW', 'GNB'],
        ['GY', 'GUY'],
        ['HT', 'HTI'],
        ['VA', 'VAT'],
        ['HN', 'HND'],
        ['HK', 'HKG'],
        ['HU', 'HUN'],
        ['IS', 'ISL'],
        ['IN', 'IND'],
        ['ID', 'IDN'],
        ['IR', 'IRN'],
        ['IQ', 'IRQ'],
        ['IE', 'IRL'],
        ['IM', 'IMN'],
        ['IL', 'ISR'],
        ['IT', 'ITA'],
        ['JM', 'JAM'],
        ['JP', 'JPN'],
        ['JE', 'JEY'],
        ['JO', 'JOR'],
        ['KZ', 'KAZ'],
        ['KE', 'KEN'],
        ['KI', 'KIR'],
        ['KP', 'PRK'],
        ['KR', 'KOR'],
        ['KW', 'KWT'],
        ['KG', 'KGZ'],
        ['LA', 'LAO'],
        ['LV', 'LVA'],
        ['LB', 'LBN'],
        ['LS', 'LSO'],
        ['LR', 'LBR'],
        ['LY', 'LBY'],
        ['LI', 'LIE'],
        ['LT', 'LTU'],
        ['LU', 'LUX'],
        ['MO', 'MAC'],
        ['MK', 'MKD'],
        ['MG', 'MDG'],
        ['MW', 'MWI'],
        ['MY', 'MYS'],
        ['MV', 'MDV'],
        ['ML', 'MLI'],
        ['MT', 'MLT'],
        ['MH', 'MHL'],
        ['MQ', 'MTQ'],
        ['MR', 'MRT'],
        ['MU', 'MUS'],
        ['YT', 'MYT'],
        ['MX', 'MEX'],
        ['FM', 'FSM'],
        ['MD', 'MDA'],
        ['MC', 'MCO'],
        ['MN', 'MNG'],
        ['ME', 'MNE'],
        ['MS', 'MSR'],
        ['MA', 'MAR'],
        ['MZ', 'MOZ'],
        ['MM', 'MMR'],
        ['NA', 'NAM'],
        ['NR', 'NRU'],
        ['NP', 'NPL'],
        ['NL', 'NLD'],
        ['NC', 'NCL'],
        ['NZ', 'NZL'],
        ['NI', 'NIC'],
        ['NE', 'NER'],
        ['NG', 'NGA'],
        ['NU', 'NIU'],
        ['NF', 'NFK'],
        ['MP', 'MNP'],
        ['NO', 'NOR'],
        ['OM', 'OMN'],
        ['PK', 'PAK'],
        ['PW', 'PLW'],
        ['PS', 'PSE'],
        ['PA', 'PAN'],
        ['PG', 'PNG'],
        ['PY', 'PRY'],
        ['PE', 'PER'],
        ['PH', 'PHL'],
        ['PN', 'PCN'],
        ['PL', 'POL'],
        ['PT', 'PRT'],
        ['PR', 'PRI'],
        ['QA', 'QAT'],
        ['RE', 'REU'],
        ['RO', 'ROU'],
        ['RU', 'RUS'],
        ['RW', 'RWA'],
        ['BL', 'BLM'],
        ['SH', 'SHN'],
        ['KN', 'KNA'],
        ['LC', 'LCA'],
        ['MF', 'MAF'],
        ['PM', 'SPM'],
        ['VC', 'VCT'],
        ['WS', 'WSM'],
        ['SM', 'SMR'],
        ['ST', 'STP'],
        ['SA', 'SAU'],
        ['SN', 'SEN'],
        ['RS', 'SRB'],
        ['SC', 'SYC'],
        ['SL', 'SLE'],
        ['SG', 'SGP'],
        ['SX', 'SXM'],
        ['SK', 'SVK'],
        ['SI', 'SVN'],
        ['SB', 'SLB'],
        ['SO', 'SOM'],
        ['ZA', 'ZAF'],
        ['GS', 'SGS'],
        ['SS', 'SSD'],
        ['ES', 'ESP'],
        ['LK', 'LKA'],
        ['SD', 'SDN'],
        ['SR', 'SUR'],
        ['SJ', 'SJM'],
        ['SE', 'SWE'],
        ['CH', 'CHE'],
        ['SY', 'SYR'],
        ['TW', 'TWN'],
        ['TJ', 'TJK'],
        ['TZ', 'TZA'],
        ['TH', 'THA'],
        ['TL', 'TLS'],
        ['TG', 'TGO'],
        ['TK', 'TKL'],
        ['TO', 'TON'],
        ['TT', 'TTO'],
        ['TN', 'TUN'],
        ['TR', 'TUR'],
        ['TM', 'TKM'],
        ['TC', 'TCA'],
        ['TV', 'TUV'],
        ['UG', 'UGA'],
        ['UA', 'UKR'],
        ['AE', 'ARE'],
        ['GB', 'GBR'],
        ['US', 'USA'],
        ['UM', 'UMI'],
        ['UY', 'URY'],
        ['UZ', 'UZB'],
        ['VU', 'VUT'],
        ['VE', 'VEN'],
        ['VN', 'VNM'],
        ['VG', 'VGB'],
        ['WF', 'WLF'],
        ['EH', 'ESH'],
        ['YE', 'YEM'],
        ['ZM', 'ZMB'],
        ['ZW', 'ZWE']
      ]
      this.setupParams = (t) => {
        let { options: e, $element: s } = this,
          { platformVersion: o, defaultCountry: u } = e,
          y = e[this.controlType]?.searchField || 'lookup',
          w = this.convertSemverToString(afdVersion),
          I = {
            ...t,
            ...this.setupAuth(e),
            format: 'json',
            intf: w,
            ...(o ? { intp: o } : {}),
            countryiso: e.country?.defaultCountry ?? u
          }
        if (
          ['typeahead', 'lookup', 'reverseGeocode'].indexOf(this.controlType) >
          -1
        ) {
          let b = this.$container.find(jQuery('[data-afd-control="country"]'))
          if (
            (b.length > 0 &&
              s.attr('data-afd-control') !== 'country' &&
              (I.countryiso =
                b.prop('tagName') === 'SELECT'
                  ? b.val()
                  : b.data('selectedCountry')),
            e.country?.customCountryControl)
          ) {
            let M = this.$container.find(e.country.customCountryControl)
            if (e.country.customCountryConverter) {
              if (typeof e.country.customCountryConverter != 'function')
                throw 'customCountryConverter Must be a function'
              I.countryiso = e.country.customCountryConverter(M.val())
            } else I.countryiso = M.val()
          }
        }
        this.options.afdc === 1 && (I.afdc = 1)
        try {
          return {
            method: 'GET',
            url: this.options.pceUrl,
            dataType: 'json',
            error: function (b, M, g) {
              console.error(b),
                console.error(M),
                console.error(g),
                jQuery(document).trigger('afd:pceError', b)
            },
            data: { ...I, ...t },
            ...(this.beforeSend
              ? {
                  beforeSend: (b, M) => {
                    this.beforeSend(b, M, y)
                  }
                }
              : {})
          }
        } catch (b) {
          return (
            console.error('Error setting up request'),
            console.error(b),
            {
              method: 'GET',
              url: this.options.pceUrl,
              error: function (M) {
                console.error('Failed to setup request:', M),
                  jQuery(document).trigger('afd:pceError', M)
              }
            }
          )
        }
      }
      this.setupAuth = (t) => {
        let { serial: e, password: s, token: o, id: u } = t,
          y = {}
        if (e && s) y = { serial: e, password: s }
        else if (o && u) y = { token: o, id: u }
        else
          throw new Error(
            'You must either supply password and serial, or token and id'
          )
        return y
      }
      this.eventHandler = (t, e, s) => {
        t.off(e + '.afd' + this.controlID).on(e + '.afd' + this.controlID, s)
      }
      this.handlePCEError = (t, e) => {
        parseInt(t) > 0 || console.error(e)
      }
      this.iso2ToIso3 = (t) => {
        let e = this.countryCodeMap.find(
          ([s, o]) => s === t.toUpperCase() || o === t.toUpperCase()
        )
        return e
          ? e[1]
          : (console.warn(`AFD jQuery Plugin: Unable to convert ${t} to ISO3, it is not a valid country code, ignoring
      `),
            null)
      }
      this.iso3ToIso2 = (t) => {
        let e = this.countryCodeMap.find(
          ([s, o]) => o === t.toUpperCase() || s === t.toUpperCase()
        )
        return e
          ? e[0]
          : (console.warn(
              `AFD jQuery Plugin: Unable to convert ${t} to ISO2, it is not a valid country code, ignoring`
            ),
            null)
      }
      this.iso3ToCountry = (t, e) => t.find((s) => s.iso === e)
      this.iso2ToAFDCountry = (t, e) => t.find((s) => s.iso2 === e)
      this.iso3ToAFDCountry = (t, e) => t.find((s) => s.iso3 === e)
      this.convertSemverToString = (t) => {
        try {
          let e = t.split('.')
          if (e.length !== 3) return `jqu:${t}`
          let s = e[0].padStart(2, '0'),
            o = e[1].padStart(2, '0'),
            u = e[2].padStart(2, '0')
          return `jqu${s}${o}${u}`
        } catch (e) {
          return (
            console.error('Error converting semver to string:', e), `jqu:${t}`
          )
        }
      }
      if (
        ((this.$element = t),
        (this.element = t.get()[0]),
        typeof this.$element.data('afd-control-id') > 'u' &&
          this.$element.data(
            'afd-control-id',
            Math.random().toString().slice(2, 11)
          ),
        (this.controlID = this.$element.data('afd-control-id')),
        typeof t.data('afd-additional-options') < 'u')
      ) {
        let s = window[t.data('afd-additional-options')]
        ;(s = typeof s > 'u' ? t.data('afdAdditionalOptions') : s),
          (this.options = jQuery.extend(!0, {}, e, s))
      } else this.options = e
    }
  }
  var tt = (d) =>
    class extends d {
      handleInvalid = (t, e = null) => {
        let s = e ? e[0] : this.$element[0],
          o = e || this.$element
        s.setCustomValidity(t),
          this.options.nativeValidationMessages === !0 && s.reportValidity(),
          o
            .removeClass('afd-valid')
            .addClass('afd-invalid')
            .closest('.iti')
            .addClass('afd-invalid'),
          o
            .parent('.form-group')
            .addClass('has-error')
            .removeClass('has-success'),
          o.parent().addClass('was-validated'),
          o.siblings('.invalid-feedback').first().html(s.validationMessage),
          jQuery(document).trigger('afd:validateComplete', {
            valid: !1,
            validationMessage: t
          })
      }
      handleValid = (t = null) => {
        let e = t ? t[0] : this.$element[0],
          s = t || this.$element
        e.setCustomValidity(''),
          s
            .addClass('afd-valid')
            .removeClass('afd-invalid')
            .closest('.iti')
            .removeClass('afd-invalid'),
          s
            .parent('.form-group')
            .removeClass('has-error')
            .addClass('has-success'),
          s.parent().addClass('was-validated'),
          s.siblings('.invalid-feedback').first().html(e.validationMessage),
          jQuery(document).trigger('afd:validateComplete', {
            valid: !0,
            validationMessage: null
          })
      }
      clearValidation = (t = null) => {
        let e = t ? t[0] : this.$element[0],
          s = t || this.$element
        e.setCustomValidity(''),
          s
            .parent('.form-group')
            .removeClass('has-error')
            .removeClass('has-success'),
          s
            .removeClass('afd-valid')
            .removeClass('afd-invalid')
            .closest('.iti')
            .removeClass('afd-invalid'),
          s.parent().removeClass('was-validated')
      }
      showLoadingSpinner = (t, e) => {
        e && t.closest(e).addClass('afd-loading')
      }
      hideLoadingSpinner = (t, e) => {
        e && t.closest(e).removeClass('afd-loading')
      }
    }
  var ct = class extends tt(Q) {
    constructor(t, e) {
      super(t, e),
        (this.$sortCodeElement = jQuery('[data-afd-control="sort"]')),
        (this.accountPattern = /^(?:\d{6,12}|\d{2}-\d{8})$/),
        (this.sortCodePattern = /^[0-9]{2}-[0-9]{2}-[0-9]{2}$/)
    }
    init = () => {
      this.$element.data('account-is-regex-valid', !1),
        this.$element.data('account-is-syntax-valid', !1),
        this.$element.data('account-is-afd-valid', !1),
        this.$sortCodeElement.data('sort-code-is-regex-valid', !1),
        this.$sortCodeElement.data('sort-code-is-syntax-valid', !1)
      let t = this.eventHandler
      t(this.$element, 'keydown', this.onKeyDown),
        t(this.$element, 'keyup', this.onKeyUp),
        t(this.$element, 'focusout', this.onFocusOut),
        t(this.$sortCodeElement, 'keydown', this.onSortKeyDown),
        t(this.$sortCodeElement, 'input', this.onSortKeyUp),
        t(this.$sortCodeElement, 'focus', this.onSortFocus),
        t(this.$sortCodeElement, 'focusout', this.onSortFocusOut),
        this.$sortCodeElement.val(this.applySortMask(''))
    }
    onKeyDown = (t) => {
      let e = t.target,
        s = e.selectionStart
      if (t.key === 'Backspace' && s > 0) {
        let u = s - 1,
          y = e.value.substring(0, u) + e.value.substring(s)
        ;(e.value = y), e.setSelectionRange(u, u), t.preventDefault()
      }
    }
    onFocusOut = () => {
      this.checkAccountSyntaxValid()
      let t = this.$element
      this.$element.val().length > 0 &&
        (t.data('account-is-syntax-valid')
          ? this.checkBoth()
          : this.handleInvalid(
              this.options.account.invalidAccountNumberMessage
            ))
    }
    onSortKeyDown = (t) => {
      let e = t.target,
        s = e.selectionStart
      if (t.key === 'Backspace' && s > 0) {
        e.value[s - 1] === '-' && (s -= 1)
        let u = e.value.substring(0, s - 1) + e.value.substring(s)
        ;(e.value = this.applySortMask(u)),
          e.setSelectionRange(s - 1, s - 1),
          t.preventDefault()
      }
    }
    onSortKeyUp = (t) => {
      let e = t.target,
        s = e.selectionStart,
        o = t.key,
        u = this.applySortMask(e.value)
      ;(e.value = u),
        o === 'Backspace' && u[s - 1] === '-'
          ? (s -= 1)
          : o === 'Delete' && u[s] === '-'
            ? (s += 1)
            : (s += u[s - 1] === '-' ? 1 : 0),
        e.setSelectionRange(s, s)
    }
    onSortFocus = (t) => {
      let e = t.target
      jQuery(e).css({ color: 'transparent', 'text-shadow': '0 0 0 #000' }),
        setTimeout(() => {
          e.setSelectionRange(0, 0),
            jQuery(e).css({ color: '', 'text-shadow': '' })
        }, 0)
    }
    onSortFocusOut = () => {
      this.checkSortSyntaxValid()
      let t = this.$sortCodeElement.val()
      if (t.length === 0 || t.replaceAll('-', '').trim().length === 0) return
      let e = this.$sortCodeElement
      e.data('sort-code-is-syntax-valid')
        ? this.checkBoth()
        : (this.handleInvalid(this.options.account.invalidSortCodeMessage, e),
          this.$element.data('account-is-afd-valid', !1),
          this.$element.data('account-clearing-system', null),
          this.$element.data('account-iban', null),
          this.$element.data('account-roll-number', null),
          this.$element.data('account-type', null)),
        jQuery(document).trigger('afd:accountValidationUpdated', [
          this.$element.get()[0],
          e.get()[0]
        ]),
        this.$element.trigger('afd:accountValidationUpdated', [
          this.$element,
          e
        ]),
        e.trigger('afd:accountValidationUpdated', [this.$element, e])
    }
    checkBoth() {
      let t = this.$element,
        e = t.val(),
        s = t.data('account-is-syntax-valid'),
        o = this.$sortCodeElement,
        u = o.val(),
        y = o.data('sort-code-is-syntax-valid'),
        w = t.data('last-checked-value'),
        I = o.data('last-checked-value')
      s &&
        y &&
        (e !== w || u !== I) &&
        (jQuery(document).trigger('afd:accountValidationStarted', [t, o]),
        t.trigger('afd:accountValidationStarted', [t, o]),
        o.trigger('afd:accountValidationStarted', [t, o]),
        this.showLoadingSpinner(t, this.options.account.loadingSpinner),
        this.validateAccount(e, u)
          .then((b, M, g) => {
            if (
              (t.data('last-checked-value', e),
              o.data('last-checked-value', u),
              b.Result === '1')
            ) {
              let [i] = b.Item
              this.handleValid(),
                this.handleValid(o),
                t.data('account-is-afd-valid', !0),
                t.data('account-clearing-system', i.ClearingSystem),
                t.data('account-iban', i.IBAN),
                t.data('account-roll-number', i.RollNumber),
                t.data('account-type', i.TypeOfAccount)
            } else
              b.Result === '-12' || b.Result === '-13'
                ? this.handleInvalid(b.ErrorText, o)
                : (this.handlePCEError(b.Result, b.ErrorText),
                  this.handleInvalid(b.ErrorText))
            jQuery(document).trigger('afd:accountValidationSuccess', [
              b,
              t,
              o,
              g
            ]),
              t.trigger('afd:accountValidationSuccess', [b, t, o, g]),
              o.trigger('afd:accountValidationSuccess', [b, t, o, g]),
              this.hideLoadingSpinner(t, this.options.account.loadingSpinner),
              jQuery(document).trigger('afd:accountValidationUpdated', [
                t.get()[0],
                o.get()[0]
              ]),
              t.trigger('afd:accountValidationUpdated', [t, o]),
              o.trigger('afd:accountValidationUpdated', [t, o])
          })
          .catch((b) => {
            console.error(b),
              jQuery(document).trigger('afd:accountValidationError', [b]),
              t.trigger('afd:accountValidationError', [b]),
              o.trigger('afd:accountValidationError', [b]),
              this.hideLoadingSpinner(t, this.options.account.loadingSpinner)
          }))
    }
    checkAccountSyntaxValid() {
      let t = this.$sortCodeElement,
        e = this.$element,
        s = e.val()
      s.length !== 0 &&
        (this.accountPattern.test(s)
          ? (e.data('account-is-regex-valid', !0),
            e.data('account-is-syntax-valid', !0),
            this.clearValidation(e))
          : (e.data('account-is-regex-valid', !1),
            e.data('account-is-syntax-valid', !1),
            this.handleInvalid(
              this.options.account.invalidAccountNumberMessage
            )),
        jQuery(document).trigger('afd:accountValidationUpdated', [
          e.get()[0],
          t.get()[0]
        ]),
        e.trigger('afd:accountValidationUpdated', [e, t]),
        t.trigger('afd:accountValidationUpdated', [e, t]))
    }
    checkSortSyntaxValid() {
      let t = this.$sortCodeElement,
        e = this.$element,
        s = t.val()
      s.length === 0 ||
        s.replaceAll('-', '').trim().length === 0 ||
        (this.sortCodePattern.test(s)
          ? (t.data('sort-code-is-regex-valid', !0),
            t.data('sort-code-is-syntax-valid', !0),
            this.clearValidation(t))
          : (t.data('sort-code-is-regex-valid', !1),
            t.data('sort-code-is-syntax-valid', !1),
            this.handleInvalid(this.options.account.invalidSortCodeMessage, t)),
        jQuery(document).trigger('afd:accountValidationUpdated', [
          e.get()[0],
          t.get()[0]
        ]),
        e.trigger('afd:accountValidationUpdated', [e, t]),
        t.trigger('afd:accountValidationUpdated', [e, t]))
    }
    validateAccount(t, e) {
      let s = this.setupParams({
        accountNumber: t,
        sortCode: e,
        data: 'bank',
        task: 'account',
        fields: 'account',
        afdc: this.options.afdc
      })
      return jQuery.ajax(s)
    }
    applySortMask = (t) => {
      let s = '99-99-99'.split('-'),
        o = '',
        u = t.replace(/\D/g, '').split('')
      for (let y = 0; y < s.length; y++) {
        let w = s[y].length,
          I = u.splice(0, w).join('')
        I.length < w && (I += new Array(w - I.length + 1).join(' ')),
          (o += (y !== 0 ? '-' : '') + I)
      }
      return o
    }
  }
  var Gt = (d, t, e) => {
    let s = {}
    if (
      (e ? (s = e) : typeof afdOptions < 'u' && (s = afdOptions),
      (s = jQuery.extend(!0, {}, G, s)),
      !d.is('input'))
    )
      throw (
        '<' +
        d.prop('tagName').toLowerCase() +
        '> is not a valid tag for `[data-afd-control="account"]`, use <input>'
      )
    let o = jQuery('[data-afd-control="sort"]'),
      u = o.length
    if (u === 0)
      throw 'Could not find an instance of `[data-afd-control="sort"]`.  This is required for account number validation'
    if (u > 1)
      throw 'More than one instance of `[data-afd-control="sort"]` found'
    if (!o.is('input'))
      throw (
        '<' +
        o.prop('tagName').toLowerCase() +
        '> is not a valid tag for `[data-afd-control="sort"]`, use <input>'
      )
    let y = new ct(d, s)
    jQuery(document)
      .off('afd:init.afd')
      .on('afd:init.afd', () => {
        y.init()
      }),
      y.init()
  }
  var Z = ht(ye(), 1)
  var xt =
    '<svg width="750" height="471" viewBox="0 0 750 471" xmlns="http://www.w3.org/2000/svg"><g fill-rule="nonzero" fill="none"><rect fill="#000C9D" width="750" height="471" rx="40"/><rect fill="#9D9400" x="48.71" y="153.576" width="110.324" height="99.679" rx="20.323"/><g fill="#FFF"><path d="M78.102 310.37v-3.795h-5.117v-11.27h-4.198l-.402 11.27H56.942l10.58-25.07-3.967-1.725-11.673 27.14v3.45h16.445v9.66h4.658v-9.66h5.117zM97.688 279.78c-4.025 0-7.878 1.38-11.213 4.6l2.588 2.933c2.645-2.473 5.002-3.68 8.395-3.68 4.197 0 7.532 2.357 7.532 6.727 0 4.773-3.737 6.958-7.532 6.958H95.1l-.575 3.795h3.335c4.658 0 8.223 1.84 8.223 7.532 0 4.945-3.278 8.108-8.855 8.108-3.22 0-6.555-1.323-8.798-3.968l-3.22 2.645c2.99 3.68 7.705 5.233 12.133 5.233 8.165 0 13.742-5.175 13.742-12.018 0-6.152-4.37-9.372-9.027-9.717 4.197-.805 7.762-4.428 7.762-9.2 0-5.405-4.715-9.948-12.132-9.948zM132.165 279.78c-5.347 0-8.912 1.898-12.075 5.693l3.335 2.53c2.53-2.933 4.658-4.198 8.568-4.198 4.427 0 7.072 2.76 7.072 7.188 0 6.497-3.22 10.81-18.17 25.127v3.91h23.518l.575-4.082h-18.63c13.052-11.903 17.71-17.825 17.71-25.07 0-6.325-4.428-11.098-11.903-11.098zM180.903 316.12h-8.28v-35.65h-4.198l-11.73 7.245 2.07 3.393 9.085-5.463v30.475h-9.775v3.91h22.828v-3.91zM250.49 310.37v-3.795h-5.117v-11.27h-4.198l-.402 11.27H229.33l10.58-25.07-3.967-1.725-11.673 27.14v3.45h16.445v9.66h4.658v-9.66h5.117zM270.075 279.78c-4.025 0-7.877 1.38-11.212 4.6l2.587 2.933c2.645-2.473 5.003-3.68 8.395-3.68 4.198 0 7.533 2.357 7.533 6.727 0 4.773-3.738 6.958-7.533 6.958h-2.357l-.575 3.795h3.335c4.657 0 8.222 1.84 8.222 7.532 0 4.945-3.277 8.108-8.855 8.108-3.22 0-6.555-1.323-8.797-3.968l-3.22 2.645c2.99 3.68 7.705 5.233 12.132 5.233 8.165 0 13.743-5.175 13.743-12.018 0-6.152-4.37-9.372-9.028-9.717 4.198-.805 7.763-4.428 7.763-9.2 0-5.405-4.715-9.948-12.133-9.948zM304.553 279.78c-5.348 0-8.913 1.898-12.075 5.693l3.335 2.53c2.53-2.933 4.657-4.198 8.567-4.198 4.428 0 7.073 2.76 7.073 7.188 0 6.497-3.22 10.81-18.17 25.127v3.91H316.8l.575-4.082h-18.63c13.053-11.903 17.71-17.825 17.71-25.07 0-6.325-4.427-11.098-11.902-11.098zM353.29 316.12h-8.28v-35.65h-4.197l-11.73 7.245 2.07 3.393 9.085-5.463v30.475h-9.775v3.91h22.827v-3.91zM422.878 310.37v-3.795h-5.118v-11.27h-4.197l-.403 11.27h-11.442l10.58-25.07-3.968-1.725-11.672 27.14v3.45h16.445v9.66h4.657v-9.66h5.118zM442.463 279.78c-4.025 0-7.878 1.38-11.213 4.6l2.588 2.933c2.645-2.473 5.002-3.68 8.395-3.68 4.197 0 7.532 2.357 7.532 6.727 0 4.773-3.737 6.958-7.532 6.958h-2.358l-.575 3.795h3.335c4.658 0 8.223 1.84 8.223 7.532 0 4.945-3.278 8.108-8.855 8.108-3.22 0-6.555-1.323-8.798-3.968l-3.22 2.645c2.99 3.68 7.705 5.233 12.133 5.233 8.165 0 13.742-5.175 13.742-12.018 0-6.152-4.37-9.372-9.027-9.717 4.197-.805 7.762-4.428 7.762-9.2 0-5.405-4.715-9.948-12.132-9.948zM476.94 279.78c-5.347 0-8.912 1.898-12.075 5.693l3.335 2.53c2.53-2.933 4.658-4.198 8.568-4.198 4.427 0 7.072 2.76 7.072 7.188 0 6.497-3.22 10.81-18.17 25.127v3.91h23.518l.575-4.082h-18.63c13.052-11.903 17.71-17.825 17.71-25.07 0-6.325-4.428-11.098-11.903-11.098zM525.678 316.12h-8.28v-35.65H513.2l-11.73 7.245 2.07 3.393 9.085-5.463v30.475h-9.775v3.91h22.828v-3.91zM595.266 310.37v-3.795h-5.118v-11.27h-4.197l-.403 11.27h-11.442l10.58-25.07-3.968-1.725-11.672 27.14v3.45h16.445v9.66h4.657v-9.66h5.118zM614.85 279.78c-4.024 0-7.877 1.38-11.212 4.6l2.588 2.933c2.645-2.473 5.002-3.68 8.395-3.68 4.197 0 7.532 2.357 7.532 6.727 0 4.773-3.737 6.958-7.532 6.958h-2.358l-.575 3.795h3.335c4.658 0 8.223 1.84 8.223 7.532 0 4.945-3.278 8.108-8.855 8.108-3.22 0-6.555-1.323-8.798-3.968l-3.22 2.645c2.99 3.68 7.705 5.233 12.133 5.233 8.165 0 13.742-5.175 13.742-12.018 0-6.152-4.37-9.372-9.027-9.717 4.197-.805 7.762-4.428 7.762-9.2 0-5.405-4.715-9.948-12.132-9.948zM649.328 279.78c-5.347 0-8.912 1.898-12.075 5.693l3.335 2.53c2.53-2.933 4.658-4.198 8.568-4.198 4.427 0 7.072 2.76 7.072 7.188 0 6.497-3.22 10.81-18.17 25.127v3.91h23.518l.575-4.082h-18.63c13.052-11.903 17.71-17.825 17.71-25.07 0-6.325-4.428-11.098-11.903-11.098zM698.066 316.12h-8.28v-35.65h-4.198l-11.73 7.245 2.07 3.393 9.085-5.463v30.475h-9.775v3.91h22.828v-3.91z"/></g><g fill="#FFF" fill-opacity=".784"><path d="M55.607 415.42h6.445v-22.245l-7.012 1.406v-3.594l6.973-1.406h3.945v25.84h6.446v3.32H55.607zM81.075 415.42h6.446v-22.245l-7.012 1.406v-3.594l6.973-1.406h3.945v25.84h6.445v3.32H81.075zM121.993 415.42h13.77v3.321h-18.516v-3.32a762.619 762.619 0 0 1 6.114-6.23c2.59-2.618 4.218-4.304 4.882-5.06 1.263-1.418 2.142-2.616 2.637-3.593.508-.99.762-1.96.762-2.91 0-1.55-.547-2.813-1.64-3.79-1.082-.976-2.494-1.464-4.24-1.464-1.236 0-2.545.215-3.925.645-1.367.43-2.832 1.08-4.394 1.953v-3.985c1.588-.638 3.073-1.12 4.453-1.445 1.38-.326 2.643-.488 3.789-.488 3.02 0 5.43.755 7.226 2.265 1.797 1.51 2.696 3.529 2.696 6.055a8.707 8.707 0 0 1-.684 3.418c-.443 1.068-1.256 2.33-2.441 3.789-.326.378-1.361 1.471-3.106 3.281a2473.283 2473.283 0 0 1-7.383 7.559zM156.017 403.019c1.888.403 3.36 1.243 4.414 2.52 1.068 1.275 1.601 2.85 1.601 4.726 0 2.877-.99 5.104-2.968 6.68-1.98 1.575-4.792 2.363-8.438 2.363-1.224 0-2.487-.124-3.789-.372a26.623 26.623 0 0 1-4.004-1.074v-3.808a13.669 13.669 0 0 0 3.594 1.445 16.77 16.77 0 0 0 4.082.488c2.474 0 4.355-.488 5.645-1.465 1.302-.976 1.953-2.395 1.953-4.257 0-1.72-.606-3.06-1.817-4.024-1.198-.976-2.87-1.465-5.02-1.465h-3.398v-3.242h3.555c1.94 0 3.424-.384 4.453-1.152 1.029-.781 1.543-1.901 1.543-3.36 0-1.497-.534-2.643-1.601-3.437-1.055-.807-2.572-1.211-4.551-1.211-1.081 0-2.24.117-3.477.352-1.237.234-2.597.599-4.082 1.093v-3.515a38.347 38.347 0 0 1 4.2-.938 23.777 23.777 0 0 1 3.71-.312c2.995 0 5.365.683 7.11 2.05 1.744 1.355 2.617 3.19 2.617 5.508 0 1.615-.462 2.982-1.387 4.102-.924 1.107-2.24 1.875-3.945 2.305zM182.306 389.581h15.488v3.32H185.92v7.149a10.371 10.371 0 0 1 1.719-.43 9.59 9.59 0 0 1 1.719-.156c3.255 0 5.833.892 7.734 2.676 1.901 1.783 2.852 4.199 2.852 7.246 0 3.138-.977 5.58-2.93 7.324-1.953 1.732-4.707 2.598-8.262 2.598-1.224 0-2.474-.105-3.75-.313a29.94 29.94 0 0 1-3.926-.937v-3.965a15.373 15.373 0 0 0 3.633 1.426c1.25.312 2.572.468 3.965.468 2.253 0 4.037-.592 5.352-1.777 1.315-1.185 1.972-2.793 1.972-4.824 0-2.032-.657-3.64-1.972-4.825-1.315-1.184-3.1-1.777-5.352-1.777-1.055 0-2.11.117-3.164.352a16.66 16.66 0 0 0-3.203 1.093v-14.648zM216.173 404.894c-1.875 0-3.353.5-4.434 1.503-1.067 1.003-1.601 2.383-1.601 4.141s.534 3.138 1.601 4.14c1.081 1.003 2.56 1.505 4.434 1.505 1.875 0 3.353-.502 4.434-1.504 1.08-1.016 1.62-2.396 1.62-4.14 0-1.759-.54-3.139-1.62-4.142-1.068-1.002-2.546-1.503-4.434-1.503zm-3.945-1.68c-1.693-.417-3.015-1.205-3.965-2.363-.938-1.16-1.406-2.572-1.406-4.239 0-2.33.827-4.173 2.48-5.527 1.667-1.354 3.945-2.031 6.836-2.031 2.904 0 5.182.677 6.836 2.03 1.654 1.355 2.48 3.198 2.48 5.528 0 1.667-.475 3.08-1.425 4.239-.938 1.158-2.246 1.946-3.926 2.363 1.901.443 3.379 1.308 4.434 2.597 1.067 1.29 1.601 2.865 1.601 4.727 0 2.826-.866 4.994-2.598 6.504-1.718 1.51-4.186 2.266-7.402 2.266s-5.69-.756-7.422-2.266c-1.719-1.51-2.578-3.678-2.578-6.504 0-1.862.534-3.437 1.602-4.727 1.067-1.289 2.552-2.154 4.453-2.597zm-1.446-6.23c0 1.51.47 2.688 1.407 3.535.95.846 2.278 1.27 3.984 1.27 1.693 0 3.014-.424 3.965-1.27.963-.847 1.445-2.025 1.445-3.536 0-1.51-.482-2.688-1.445-3.535-.95-.846-2.272-1.27-3.965-1.27-1.706 0-3.034.424-3.984 1.27-.938.847-1.407 2.025-1.407 3.535z"/></g><g fill="#FFF" fill-opacity=".784"><path d="M308.836 414.453h6.445v-22.246l-7.011 1.406v-3.593l6.972-1.407h3.946v25.84h6.445v3.32h-16.797zM345.574 402.05c1.888.404 3.36 1.244 4.415 2.52 1.067 1.276 1.601 2.852 1.601 4.727 0 2.877-.99 5.104-2.969 6.68-1.979 1.575-4.791 2.363-8.437 2.363-1.224 0-2.487-.124-3.79-.371a26.623 26.623 0 0 1-4.003-1.074v-3.81a13.669 13.669 0 0 0 3.594 1.446 16.77 16.77 0 0 0 4.082.489c2.474 0 4.355-.489 5.644-1.465 1.302-.977 1.953-2.396 1.953-4.258 0-1.719-.605-3.06-1.816-4.024-1.198-.976-2.871-1.464-5.02-1.464h-3.398v-3.243h3.555c1.94 0 3.424-.384 4.453-1.152 1.028-.781 1.543-1.901 1.543-3.36 0-1.497-.534-2.643-1.602-3.437-1.055-.807-2.571-1.21-4.55-1.21-1.081 0-2.24.116-3.477.35-1.237.235-2.598.6-4.082 1.095v-3.516a38.348 38.348 0 0 1 4.199-.938 23.777 23.777 0 0 1 3.71-.312c2.996 0 5.366.684 7.11 2.05 1.745 1.355 2.617 3.19 2.617 5.509 0 1.614-.462 2.981-1.386 4.101-.925 1.107-2.24 1.875-3.946 2.305zM362.489 414.453h13.77v3.32h-18.517v-3.32a762.755 762.755 0 0 1 6.114-6.23c2.59-2.618 4.218-4.304 4.883-5.059 1.263-1.42 2.141-2.617 2.636-3.594.508-.99.762-1.96.762-2.91 0-1.55-.547-2.812-1.64-3.789-1.081-.976-2.494-1.465-4.239-1.465-1.237 0-2.546.215-3.926.645-1.367.43-2.832 1.08-4.394 1.953v-3.984c1.588-.638 3.073-1.12 4.453-1.446 1.38-.325 2.643-.488 3.789-.488 3.02 0 5.43.755 7.226 2.266 1.797 1.51 2.696 3.528 2.696 6.054a8.707 8.707 0 0 1-.684 3.418c-.442 1.068-1.256 2.33-2.441 3.79-.326.377-1.36 1.47-3.106 3.28a2474.291 2474.291 0 0 1-7.382 7.56zM385.242 414.453h6.446v-22.246l-7.012 1.406v-3.593l6.973-1.407h3.945v25.84h6.445v3.32h-16.797zM434.715 402.05c1.888.404 3.36 1.244 4.414 2.52 1.068 1.276 1.602 2.852 1.602 4.727 0 2.877-.99 5.104-2.969 6.68-1.98 1.575-4.792 2.363-8.438 2.363-1.223 0-2.487-.124-3.789-.371a26.623 26.623 0 0 1-4.004-1.074v-3.81a13.669 13.669 0 0 0 3.594 1.446 16.77 16.77 0 0 0 4.082.489c2.474 0 4.356-.489 5.645-1.465 1.302-.977 1.953-2.396 1.953-4.258 0-1.719-.606-3.06-1.816-4.024-1.198-.976-2.872-1.464-5.02-1.464h-3.398v-3.243h3.554c1.94 0 3.425-.384 4.453-1.152 1.029-.781 1.543-1.901 1.543-3.36 0-1.497-.534-2.643-1.601-3.437-1.055-.807-2.572-1.21-4.551-1.21-1.08 0-2.24.116-3.477.35-1.237.235-2.597.6-4.082 1.095v-3.516a38.347 38.347 0 0 1 4.2-.938 23.777 23.777 0 0 1 3.71-.312c2.995 0 5.365.684 7.11 2.05 1.745 1.355 2.617 3.19 2.617 5.509 0 1.614-.462 2.981-1.387 4.101-.924 1.107-2.24 1.875-3.945 2.305zM459.07 392.05l-9.96 15.567h9.96v-15.566zm-1.035-3.437h4.961v19.004h4.16v3.281h-4.16v6.875h-3.925v-6.875h-13.165v-3.808l12.13-18.477zM473.739 388.613h15.488v3.32h-11.875v7.149a10.37 10.37 0 0 1 1.719-.43 9.59 9.59 0 0 1 1.718-.156c3.256 0 5.834.892 7.735 2.676 1.9 1.784 2.851 4.2 2.851 7.246 0 3.138-.976 5.58-2.93 7.324-1.953 1.732-4.706 2.598-8.261 2.598-1.224 0-2.474-.104-3.75-.313a29.94 29.94 0 0 1-3.926-.937v-3.965a15.373 15.373 0 0 0 3.633 1.426c1.25.312 2.571.469 3.965.469 2.252 0 4.036-.593 5.351-1.778 1.315-1.185 1.973-2.793 1.973-4.824 0-2.031-.658-3.64-1.973-4.824-1.315-1.185-3.099-1.778-5.351-1.778-1.055 0-2.11.118-3.164.352a16.66 16.66 0 0 0-3.203 1.094v-14.649zM499.207 388.613h15.489v3.32H502.82v7.149a10.37 10.37 0 0 1 1.718-.43 9.59 9.59 0 0 1 1.72-.156c3.254 0 5.832.892 7.733 2.676 1.901 1.784 2.852 4.2 2.852 7.246 0 3.138-.977 5.58-2.93 7.324-1.953 1.732-4.707 2.598-8.261 2.598-1.224 0-2.474-.104-3.75-.313a29.94 29.94 0 0 1-3.926-.937v-3.965a15.373 15.373 0 0 0 3.633 1.426c1.25.312 2.571.469 3.964.469 2.253 0 4.037-.593 5.352-1.778 1.315-1.185 1.973-2.793 1.973-4.824 0-2.031-.658-3.64-1.973-4.824-1.315-1.185-3.099-1.778-5.352-1.778-1.054 0-2.109.118-3.164.352a16.66 16.66 0 0 0-3.203 1.094v-14.649z"/></g></g></svg>'
  var ge =
    '<svg xmlns="http://www.w3.org/2000/svg" width="750" height="471" viewBox="0 0 750 471"><g fill-rule="nonzero" fill="none"><rect fill="#0E4595" width="750" height="471" rx="40"/><path fill="#FFF" d="M278.197 334.228l33.361-195.763h53.36l-33.385 195.763zM524.308 142.688c-10.572-3.966-27.137-8.222-47.823-8.222-52.725 0-89.865 26.55-90.18 64.603-.298 28.13 26.513 43.822 46.753 53.186 20.77 9.594 27.752 15.714 27.654 24.283-.132 13.121-16.587 19.116-31.923 19.116-21.357 0-32.703-2.966-50.226-10.276l-6.876-3.111-7.49 43.824c12.464 5.464 35.51 10.198 59.438 10.443 56.09 0 92.501-26.246 92.916-66.882.2-22.268-14.016-39.216-44.8-53.188-18.65-9.055-30.072-15.099-29.951-24.268 0-8.137 9.667-16.839 30.556-16.839 17.45-.27 30.089 3.535 39.937 7.5l4.781 2.26 7.234-42.43M661.615 138.465h-41.231c-12.774 0-22.332 3.487-27.942 16.234l-79.245 179.404h56.032s9.161-24.123 11.233-29.418c6.124 0 60.554.084 68.337.084 1.596 6.853 6.491 29.334 6.491 29.334h49.513l-43.188-195.638zm-65.418 126.407c4.413-11.279 21.26-54.723 21.26-54.723-.316.522 4.38-11.334 7.075-18.684l3.606 16.879s10.217 46.728 12.352 56.528h-44.293z"/><path d="M45.879 138.465l-.682 4.074c21.091 5.106 39.93 12.494 56.422 21.686l47.346 169.691 56.455-.066 84.004-195.385h-56.522l-52.24 133.496-5.566-27.129a88.005 88.005 0 0 0-.823-2.49l-18.166-87.35c-3.23-12.396-12.598-16.095-24.187-16.527H45.879z" fill="#fff"/></g></svg>'
  var Ce =
    '<svg width="750" height="471" viewBox="0 0 750 471" xmlns="http://www.w3.org/2000/svg"><g fill-rule="nonzero" fill="none"><rect fill="#000" width="750" height="471" rx="40"/><path d="M221.13 421.67v-24.85c0-9.53-5.8-15.74-15.32-15.74-5 0-10.35 1.66-14.08 7-2.9-4.56-7-7-13.25-7a14.07 14.07 0 0 0-12 5.8v-5h-7.87v39.76h7.87v-22.75c0-7 4.14-10.35 9.94-10.35s9.11 3.73 9.11 10.35v22.78h7.87v-22.78c0-7 4.14-10.35 9.94-10.35s9.11 3.73 9.11 10.35v22.78h8.68zm129.22-39.35h-14.5v-12H328v12h-8.28v7H328V408c0 9.11 3.31 14.5 13.25 14.5a23.17 23.17 0 0 0 10.75-2.9l-2.49-7a13.63 13.63 0 0 1-7.46 2.07c-4.14 0-6.21-2.49-6.21-6.63V389h14.5v-6.63l.01-.05zm73.72-1.24a12.39 12.39 0 0 0-10.77 5.8v-5h-7.87v39.76h7.87v-22.33c0-6.63 3.31-10.77 8.7-10.77a24.24 24.24 0 0 1 5.38.83l2.49-7.46a28 28 0 0 0-5.8-.83zm-111.41 4.14c-4.14-2.9-9.94-4.14-16.15-4.14-9.94 0-16.15 4.56-16.15 12.43 0 6.63 4.56 10.35 13.25 11.6l4.14.41c4.56.83 7.46 2.49 7.46 4.56 0 2.9-3.31 5-9.53 5a21.84 21.84 0 0 1-13.25-4.14l-4.14 6.21c5.8 4.14 12.84 5 17 5 11.6 0 17.81-5.38 17.81-12.84 0-7-5-10.35-13.67-11.6l-4.14-.41c-3.73-.41-7-1.66-7-4.14 0-2.9 3.31-5 7.87-5 5 0 9.94 2.07 12.43 3.31l4.07-6.25zm120.11 16.57c0 12 7.87 20.71 20.71 20.71 5.8 0 9.94-1.24 14.08-4.56l-4.14-6.21a16.74 16.74 0 0 1-10.35 3.73c-7 0-12.43-5.38-12.43-13.25S446 389 453.07 389a16.74 16.74 0 0 1 10.35 3.73l4.14-6.21c-4.14-3.31-8.28-4.56-14.08-4.56-12.43-.83-20.71 7.87-20.71 19.88v-.05zm-55.5-20.71c-11.6 0-19.47 8.28-19.47 20.71 0 12.43 8.28 20.71 20.29 20.71a25.33 25.33 0 0 0 16.15-5.38l-4.14-5.8a19.79 19.79 0 0 1-11.6 4.14c-5.38 0-11.18-3.31-12-10.35h29.41v-3.31c0-12.43-7.46-20.71-18.64-20.71v-.01zm-.41 7.46c5.8 0 9.94 3.73 10.35 9.94h-21.53c1.24-5.8 5-9.94 11.18-9.94zm-107.27 13.25v-19.88h-7.87v5c-2.9-3.73-7-5.8-12.84-5.8-11.18 0-19.47 8.7-19.47 20.71 0 12.01 8.28 20.71 19.47 20.71 5.8 0 9.94-2.07 12.84-5.8v5h7.87v-19.94zm-31.89 0c0-7.46 4.56-13.25 12.43-13.25 7.46 0 12 5.8 12 13.25 0 7.87-5 13.25-12 13.25-7.87.41-12.43-5.8-12.43-13.25zm306.08-20.71a12.39 12.39 0 0 0-10.77 5.8v-5h-7.87v39.76H533v-22.33c0-6.63 3.31-10.77 8.7-10.77a24.24 24.24 0 0 1 5.38.83l2.49-7.46a28 28 0 0 0-5.8-.83h.01zm-30.65 20.71v-19.88h-7.87v5c-2.9-3.73-7-5.8-12.84-5.8-11.18 0-19.47 8.7-19.47 20.71 0 12.01 8.28 20.71 19.47 20.71 5.8 0 9.94-2.07 12.84-5.8v5h7.87v-19.94zm-31.89 0c0-7.46 4.56-13.25 12.43-13.25 7.46 0 12 5.8 12 13.25 0 7.87-5 13.25-12 13.25-7.87.41-12.43-5.8-12.43-13.25zm111.83 0v-35.62h-7.87v20.71c-2.9-3.73-7-5.8-12.84-5.8-11.18 0-19.47 8.7-19.47 20.71 0 12.01 8.28 20.71 19.47 20.71 5.8 0 9.94-2.07 12.84-5.8v5h7.87v-19.91zm-31.89 0c0-7.46 4.56-13.25 12.43-13.25 7.46 0 12 5.8 12 13.25 0 7.87-5 13.25-12 13.25-7.88.42-12.44-5.79-12.44-13.25h.01z" fill="#FFF"/><path fill="#FF5F00" d="M303.55 80.39h143.72v234.42H303.55z"/><path d="M318.05 197.6a149.5 149.5 0 0 1 56.74-117.21c-61.128-48.061-148.928-41.075-201.687 16.048-52.758 57.123-52.758 145.2 0 202.324 52.759 57.123 140.559 64.11 201.687 16.048a149.5 149.5 0 0 1-56.74-117.21z" fill="#EB001B"/><path d="M616.26 197.6c.041 57.047-32.503 109.106-83.804 134.056-51.302 24.95-112.347 18.408-157.196-16.846a149.43 149.43 0 0 0 0-234.42c44.85-35.254 105.894-41.797 157.196-16.846 51.3 24.95 83.845 77.01 83.804 134.056z" fill="#F79E1B"/></g></svg>'
  var ve =
    '<svg width="750" height="471" viewBox="0 0 750 471" xmlns="http://www.w3.org/2000/svg"><g fill-rule="nonzero" fill="none"><rect fill="#2557D6" width="750" height="471" rx="40"/><path d="M.003 221.185h36.024l8.123-19.51h18.185l8.101 19.51h70.88V206.27l6.327 14.98h36.796l6.327-15.202v15.138h176.151l-.082-32.026h3.408c2.386.083 3.083.302 3.083 4.226v27.8h91.106v-7.455c7.349 3.92 18.779 7.455 33.819 7.455h38.328l8.203-19.51h18.185l8.021 19.51h73.86v-18.532l11.186 18.532h59.187V98.678h-58.576v14.468l-8.202-14.468h-60.105v14.468l-7.532-14.468h-81.188c-13.59 0-25.536 1.889-35.186 7.153v-7.153h-56.026v7.153c-6.14-5.426-14.508-7.153-23.812-7.153H179.908l-13.734 31.641-14.104-31.641H87.6v14.468l-7.083-14.468H25.534L0 156.924v64.261h.003zm227.397-17.67h-21.615l-.08-68.794-30.573 68.793H156.62l-30.652-68.854v68.854H83.084l-8.101-19.592h-43.9L22.9 203.514H0l37.756-87.837h31.326l35.859 83.164v-83.164h34.412l27.593 59.587 25.347-59.587h35.104v87.837h.003zM67.777 165.692l-14.43-35.017-14.35 35.017h28.78zm245.642 37.821h-70.433v-87.837h70.433v18.291h-49.348v15.833h48.165v18.005H264.07v17.542h49.348v18.166zm99.256-64.18c0 14.004-9.386 21.24-14.856 23.412 4.613 1.748 8.553 4.838 10.43 7.397 2.976 4.369 3.49 8.271 3.49 16.116v17.255h-21.266l-.08-11.077c0-5.285.508-12.886-3.328-17.112-3.081-3.09-7.777-3.76-15.368-3.76h-22.633v31.95H327.98v-87.838h48.495c10.775 0 18.714.283 25.53 4.207 6.67 3.924 10.67 9.652 10.67 19.45zm-26.652 13.042c-2.898 1.752-6.324 1.81-10.43 1.81H349.98v-19.51h25.962c3.674 0 7.508.164 9.998 1.584 2.735 1.28 4.427 4.003 4.427 7.765 0 3.84-1.61 6.929-4.344 8.351zm60.466 51.138h-21.513v-87.837h21.513v87.837zm249.74 0H666.35l-39.964-65.927v65.927h-42.94l-8.204-19.592h-43.799l-7.96 19.592H498.81c-10.248 0-23.224-2.257-30.572-9.715-7.41-7.458-11.265-17.56-11.265-33.533 0-13.027 2.304-24.936 11.366-34.347 6.816-7.01 17.49-10.242 32.02-10.242h20.412v18.821h-19.984c-7.694 0-12.039 1.14-16.224 5.203-3.594 3.699-6.06 10.69-6.06 19.897 0 9.41 1.878 16.196 5.797 20.628 3.245 3.476 9.144 4.53 14.694 4.53h9.469l29.716-69.076h31.592l35.696 83.081V115.68h32.103l37.062 61.174V115.68h21.596v87.834zM568.07 165.693l-14.591-35.017-14.51 35.017h29.1zM749.956 343.767c-5.121 7.458-15.101 11.239-28.611 11.239h-40.718v-18.84h40.553c4.022 0 6.837-.527 8.532-2.175a7.71 7.71 0 0 0 2.493-5.73c0-2.56-1.024-4.592-2.575-5.81-1.53-1.341-3.757-1.95-7.429-1.95-19.797-.67-44.495.609-44.495-27.194 0-12.743 8.125-26.157 30.25-26.157h41.998l.002-17.48h-39.022c-11.776 0-20.33 2.808-26.388 7.174v-7.175H626.83c-9.23 0-20.063 2.279-25.187 7.175v-7.175H498.578v7.175c-8.203-5.892-22.043-7.175-28.431-7.175h-67.983v7.175c-6.49-6.258-20.92-7.175-29.716-7.175h-76.085l-17.41 18.763-16.307-18.763H148.99v122.592h111.516l17.94-19.06 16.9 19.06 68.739.061v-28.838h6.757c9.12.14 19.878-.226 29.368-4.31v33.085h56.697v-31.952h2.735c3.49 0 3.834.143 3.834 3.616v28.333H635.71c10.935 0 22.365-2.787 28.695-7.845v7.845h54.632c11.369 0 22.471-1.587 30.918-5.651v-22.838zm-341.503-47.154c0 24.406-18.286 29.445-36.716 29.445H345.43v29.469h-40.98l-25.962-29.085-26.981 29.085H167.99v-87.859h84.8l25.941 28.799 26.819-28.799h67.371c16.732 0 35.532 4.613 35.532 28.945zm-167.625 40.434h-51.839v-17.481h46.289V301.64h-46.289v-15.973h52.86l23.062 25.604-24.083 25.776zm83.526 10.06l-32.37-35.788 32.37-34.651v70.439zm47.873-39.066H344.98v-22.374h27.492c7.612 0 12.896 3.09 12.896 10.773 0 7.598-5.04 11.601-13.14 11.601zm142.744-40.373h70.369v18.17h-49.372v15.973h48.167v17.925h-48.167v17.481l49.372.08v18.23h-70.37v-87.859zm-27.054 47.03c4.693 1.724 8.53 4.816 10.329 7.375 2.977 4.29 3.408 8.293 3.493 16.037v17.417H480.57v-10.992c0-5.286.511-13.112-3.408-17.198-3.08-3.147-7.777-3.9-15.468-3.9h-22.533v32.09h-21.186v-87.859h48.678c10.674 0 18.448.47 25.369 4.146 6.654 4.004 10.839 9.488 10.839 19.51-.003 14.024-9.395 21.18-14.945 23.373zM476 303.59c-2.82 1.667-6.308 1.81-10.41 1.81h-25.614v-19.733h25.962c3.754 0 7.51.08 10.062 1.587 2.732 1.423 4.366 4.144 4.366 7.903 0 3.76-1.634 6.788-4.366 8.433zm190.336 5.597c4.106 4.23 6.306 9.572 6.306 18.614 0 18.9-11.858 27.723-33.122 27.723h-41.065v-18.84h40.9c4 0 6.836-.527 8.613-2.175 1.45-1.359 2.49-3.333 2.49-5.73 0-2.56-1.125-4.592-2.573-5.81-1.612-1.34-3.836-1.95-7.508-1.95-19.717-.67-44.41.61-44.41-27.193 0-12.744 8.04-26.158 30.144-26.158h42.269v18.7h-38.677c-3.834 0-6.327.143-8.447 1.587-2.31 1.422-3.166 3.534-3.166 6.32 0 3.315 1.96 5.57 4.613 6.545 2.224.77 4.613.996 8.205.996l11.35.305c11.446.278 19.303 2.249 24.078 7.066zM750 285.667h-38.427c-3.836 0-6.385.143-8.532 1.587-2.224 1.423-3.081 3.534-3.081 6.322 0 3.314 1.878 5.569 4.61 6.544 2.225.77 4.614.996 8.126.996l11.427.304c11.531.284 19.228 2.258 23.921 7.072.855.67 1.368 1.422 1.956 2.175v-25z" fill="#FFF"/></g></svg>'
  var we =
    '<svg width="750" height="471" viewBox="0 0 750 471" xmlns="http://www.w3.org/2000/svg"><g fill-rule="nonzero" fill="none"><rect fill="#0079BE" width="750" height="471" rx="40"/><path d="M584.934 237.947c0-99.415-82.981-168.133-173.895-168.1h-78.242c-92.003-.033-167.73 68.705-167.73 168.1 0 90.93 75.727 165.64 167.73 165.204h78.242c90.914.436 173.895-74.293 173.895-165.204z" fill="#FFF"/><path d="M333.28 83.93c-84.07.027-152.194 68.308-152.214 152.58.02 84.258 68.144 152.533 152.214 152.56 84.09-.027 152.228-68.302 152.24-152.56-.012-84.272-68.15-152.553-152.24-152.58z" fill="#0079BE"/><path d="M237.066 236.098c.08-41.18 25.746-76.296 61.94-90.25v180.48c-36.194-13.947-61.861-49.044-61.94-90.23zm131 90.275V145.847c36.207 13.92 61.914 49.057 61.98 90.257-.066 41.212-25.773 76.322-61.98 90.269z" fill="#FFF"/></g></svg>'
  var be =
    '<svg width="750" height="471" viewBox="0 0 750 471" xmlns="http://www.w3.org/2000/svg"><g fill-rule="nonzero" fill="none"><path d="M52.877 0C23.68 0 0 23.155 0 51.71v367.58C0 447.85 23.672 471 52.877 471h644.246C726.32 471 750 447.845 750 419.29V51.71C750 23.15 726.328 0 697.123 0H52.877z" fill="#4D4D4D"/><path d="M314.57 152.198c8.496 0 15.623 1.733 24.295 5.912v22.087c-8.215-7.633-15.341-10.828-24.765-10.828-18.523 0-33.09 14.576-33.09 33.055 0 19.488 14.116 33.196 34.008 33.196 8.955 0 15.95-3.029 23.847-10.54v22.098c-8.981 4.02-16.26 5.607-24.765 5.607-30.075 0-53.444-21.935-53.444-50.224 0-27.984 23.991-50.363 53.914-50.363zm-93.379.609c11.102 0 21.26 3.612 29.754 10.673l-10.335 12.86c-5.145-5.48-10.01-7.792-15.927-7.792-8.513 0-14.713 4.606-14.713 10.667 0 5.198 3.48 7.95 15.332 12.118 22.467 7.808 29.124 14.732 29.124 30.021 0 18.633-14.399 31.602-34.923 31.602-15.029 0-25.955-5.626-35.055-18.32l12.758-11.68c4.549 8.36 12.136 12.837 21.557 12.837 8.811 0 15.334-5.779 15.334-13.576 0-4.042-1.976-7.507-5.921-9.958-1.987-1.16-5.921-2.89-13.653-5.481-18.55-6.347-24.914-13.132-24.914-26.391 0-15.75 13.667-27.58 31.582-27.58zm225.695 1.678h21.575l27.004 64.645 27.35-64.645h21.412l-43.744 98.713h-10.628l-42.969-98.713zm-382.065.148h28.991c32.03 0 54.359 19.786 54.359 48.19 0 14.163-6.831 27.856-18.382 36.944-9.72 7.67-20.795 11.11-36.13 11.11H64.822v-96.244zm92.437 0h19.751v96.245h-19.75v-96.245zm395.899 0h56.011v16.308h-36.275v21.362h34.938v16.3h-34.938v25.98h36.275v16.295h-56.011v-96.245zm69.094 0h29.283c22.78 0 35.833 10.397 35.833 28.416 0 14.735-8.187 24.406-23.064 27.284l31.873 40.545h-24.288l-27.336-38.664h-2.575v38.664h-19.726v-96.245zm19.726 15.159v29.148h5.771c12.612 0 19.297-5.206 19.297-14.88 0-9.367-6.686-14.268-18.985-14.268h-6.083zm-557.42 1.149v63.642h5.3c12.763 0 20.823-2.324 27.028-7.648 6.83-5.782 10.94-15.015 10.94-24.25 0-9.222-4.11-18.18-10.94-23.961-6.523-5.61-14.265-7.783-27.028-7.783h-5.3z" fill="#FFF"/><path d="M399.164 151.56c29.75 0 53.867 22.167 53.867 49.552v.031c0 27.385-24.117 49.584-53.867 49.584-29.75 0-53.867-22.199-53.867-49.584v-.03c0-27.386 24.117-49.554 53.867-49.554zm350.819 119.534c-25.048 17.233-212.574 140.397-537.264 199.891h484.387c29.197 0 52.877-23.154 52.877-51.71V271.094z" fill="#F47216"/></g></svg>'
  var Ie =
    '<svg width="750" height="471" viewBox="0 0 750 471" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient x1=".032%" y1="50%" x2="99.974%" y2="50%" id="a"><stop stop-color="#007B40" offset="0%"/><stop stop-color="#55B330" offset="100%"/></linearGradient><linearGradient x1=".472%" y1="50%" x2="99.986%" y2="50%" id="b"><stop stop-color="#1D2970" offset="0%"/><stop stop-color="#006DBA" offset="100%"/></linearGradient><linearGradient x1=".114%" y1="50.001%" x2="99.986%" y2="50.001%" id="c"><stop stop-color="#6E2B2F" offset="0%"/><stop stop-color="#E30138" offset="100%"/></linearGradient></defs><g fill-rule="nonzero" fill="none"><rect fill="#0E4C96" width="750" height="471" rx="40"/><path d="M617.243 346.766c0 41.615-33.728 75.36-75.36 75.36H132.757V124.245c0-41.626 33.733-75.37 75.365-75.37l409.121-.001v297.892z" fill="#FFF"/><path d="M483.859 242.045c11.684.253 23.437-.516 35.077.4 11.787 2.2 14.628 20.043 4.156 25.888-7.141 3.85-15.633 1.432-23.379 2.113H483.86v-28.401zm41.833-32.145c2.596 9.165-6.238 17.392-15.066 16.13h-26.767c.185-8.642-.368-18.021.272-26.208 10.724.301 21.549-.616 32.21.48 4.58 1.15 8.413 4.916 9.35 9.598zM590.12 73.997c.498 17.501.071 35.927.214 53.783-.035 72.596.072 145.194-.055 217.79-.469 27.207-24.582 50.844-51.6 51.387-27.046.111-54.095.016-81.142.047v-109.75c29.47-.154 58.959.307 88.417-.232 13.667-.86 28.632-9.876 29.27-24.915 1.61-15.102-12.632-25.55-26.153-27.201-5.198-.135-5.044-1.515 0-2.117 12.892-2.787 23.02-16.133 19.226-29.499-3.236-14.058-18.773-19.499-31.697-19.472-26.351-.18-52.709-.026-79.063-.077.172-20.489-.354-41 .286-61.474 2.087-26.716 26.806-48.747 53.447-48.27h78.85z" fill="url(#a)"/><path d="M159.74 125.04c.674-27.163 24.889-50.611 51.875-51.007 26.944-.083 53.891-.012 80.837-.036-.074 90.885.148 181.777-.112 272.658-1.038 26.834-24.99 49.834-51.679 50.307-26.996.099-53.995.014-80.992.042V283.551c26.223 6.194 53.722 8.832 80.473 4.721 15.993-2.575 33.488-10.424 38.902-27.014 3.986-14.192 1.742-29.126 2.334-43.692v-33.824h-46.297c-.208 22.37.426 44.78-.335 67.125-1.248 13.734-14.846 22.46-27.8 21.995-16.066.169-47.898-11.64-47.898-11.64-.08-41.917.466-94.408.692-136.182z" fill="url(#b)"/><path d="M309.72 197.39c-2.434.517-.49-8.3-1.114-11.646.166-21.15-.346-42.323.284-63.458 2.083-26.829 26.991-48.916 53.739-48.288h78.766c-.074 90.884.147 181.775-.112 272.656-1.039 26.834-24.992 49.833-51.68 50.308-26.998.1-53.998.015-80.997.043V272.708c18.44 15.128 43.5 17.484 66.472 17.525 17.317-.006 34.534-2.675 51.35-6.67V260.79c-18.953 9.447-41.233 15.446-62.243 10.018-14.656-3.65-25.294-17.811-25.056-32.936-1.699-15.728 7.524-32.335 22.981-37.011 19.19-6.008 40.108-1.413 58.096 6.398 3.855 2.018 7.765 4.521 6.222-1.921v-17.9c-30.084-7.157-62.101-9.792-92.329-2.004-8.748 2.468-17.27 6.21-24.379 11.956z" fill="url(#c)"/></g></svg>'
  var ke =
    '<svg width="750" height="471" viewBox="0 0 750 471" xmlns="http://www.w3.org/2000/svg"><g fill-rule="nonzero" fill="none"><rect fill="#FFF" width="750" height="471" rx="40"/><path d="M201.81 55h142.393c19.87 0 32.287 16.406 27.63 36.47L305.5 378.948c-4.656 20.064-24.629 36.47-44.498 36.47H118.61c-19.87 0-32.287-16.406-27.63-36.47L157.311 91.47C161.968 71.302 181.837 55 201.706 55h.104z" fill="#D10429"/><path d="M331.75 55h163.815c19.869 0 10.866 16.406 6.209 36.47L435.44 378.948c-4.657 20.064-3.208 36.47-23.077 36.47H248.549c-19.972 0-32.287-16.406-27.527-36.47L287.356 91.47C292.012 71.302 311.88 55 331.854 55h-.104z" fill="#022E64"/><path d="M489.815 55h142.394c19.869 0 32.287 16.406 27.63 36.47l-66.333 287.478c-4.657 20.064-24.63 36.47-44.498 36.47H406.614c-19.972 0-32.287-16.406-27.63-36.47L445.317 91.47C449.974 71.302 469.843 55 489.711 55h.104z" fill="#076F74"/><path d="M465.905 326.015h13.453l3.829-13.063h-13.35l-3.932 13.063zm10.762-35.948l-4.657 15.466s5.071-2.613 7.865-3.449c2.794-.627 6.933-1.15 6.933-1.15l3.208-10.763h-13.452l.103-.104zm6.727-22.154l-4.45 14.839s4.967-2.3 7.761-3.03c2.794-.732 6.933-.941 6.933-.941l3.208-10.764h-13.349l-.103-.104zm29.7 0l-17.386 57.997h4.657l-3.622 12.017h-4.657l-1.138 3.658H474.39l1.139-3.658H442l3.311-11.076h3.415l17.593-58.938L469.837 256h16.868l-1.76 5.956s4.45-3.239 8.797-4.389c4.243-1.149 28.665-1.567 28.665-1.567l-3.622 11.808h-5.795l.103.105z" fill="#FEFEFE"/><path d="M520 256h18.006l.207 6.792c-.103 1.15.828 1.672 3.001 1.672h3.622l-3.311 11.182h-9.728c-8.382.627-11.59-3.03-11.383-7.106l-.31-12.436L520 256zm2.216 53.2h-17.178l2.897-9.927h19.662l2.794-9.092H511.04L514.351 279h53.812l-3.311 11.181h-18.11l-2.794 9.092h18.11l-3.002 9.927h-19.558l-3.518 4.18h7.968l1.966 12.54c.207 1.254.207 2.09.62 2.613.415.418 2.795.627 4.14.627h2.38l-3.725 12.226h-6.106c-.93 0-2.38-.104-4.346-.104-1.863-.21-3.104-1.254-4.346-1.881-1.139-.523-2.794-1.881-3.208-4.285l-1.863-12.54-8.9 12.331c-2.794 3.867-6.622 6.897-13.142 6.897H495l3.311-10.868h4.76c1.346 0 2.588-.522 3.52-1.045.93-.418 1.758-.836 2.586-2.194l13.04-18.497zM334.314 282h45.429l-3.312 10.972h-18.11l-2.793 9.3h18.627l-3.415 11.287h-18.524l-4.553 15.152c-.517 1.672 4.45 1.881 6.209 1.881l9.314-1.254-3.726 12.54h-20.904c-1.655 0-2.897-.209-4.76-.627-1.76-.418-2.587-1.254-3.311-2.403-.725-1.254-1.967-2.195-1.139-4.912l6.002-20.064H325l3.415-11.495h10.348l2.794-9.3H331.21l3.312-10.973-.207-.104zm31.387-19.835h18.627l-3.415 11.39h-25.457l-2.794 2.404c-1.242 1.15-1.552.732-3.105 1.568-1.448.731-4.45 2.194-8.382 2.194H333l3.311-10.972h2.484c2.07 0 3.519-.21 4.243-.627.828-.523 1.76-1.672 2.69-3.553l4.657-8.569h18.524l-3.208 6.27v-.105zm35.108 18.81s5.07-4.702 13.763-6.165c1.966-.418 14.384-.21 14.384-.21l1.863-6.27h-26.181l-3.83 12.75v-.105zm24.629 4.807h-25.975l-1.552 5.33h22.56c2.69-.314 3.208.104 3.415-.105l1.655-5.225h-.103zm-33.736-29.678h15.833l-2.276 8.047s4.967-4.076 8.485-5.539c3.519-1.254 11.383-2.508 11.383-2.508l25.664-.104-8.796 29.469c-1.449 5.016-3.208 8.255-4.243 9.823-.93 1.463-2.07 2.821-4.346 4.075-2.173 1.15-4.14 1.881-6.002 1.986-1.656.104-4.346.209-7.865.209h-24.732l-6.934 23.303c-.62 2.299-.931 3.448-.517 4.075.31.523 1.242 1.15 2.38 1.15l10.866-1.045-3.726 12.749h-12.21c-3.933 0-6.727-.105-8.693-.21-1.863-.208-3.83 0-5.175-1.044-1.138-1.045-2.897-2.404-2.794-3.762.104-1.254.621-3.344 1.45-6.27l22.248-74.404z" fill="#FEFEFE"/><path d="M437.84 303l-1.449 7.106c-.62 2.194-1.138 3.866-2.794 5.33-1.759 1.462-3.725 3.03-8.485 3.03l-8.796.418-.104 7.942c-.103 2.194.518 1.985.828 2.403.414.418.724.523 1.138.732l2.794-.21 8.383-.417-3.519 11.704h-9.624c-6.726 0-11.797-.21-13.35-1.463-1.655-1.045-1.862-2.3-1.862-4.598l.62-31.141h15.42l-.207 6.374h3.725c1.242 0 2.174-.104 2.691-.418.517-.313.828-.836 1.035-1.567l1.552-5.016h12.108l-.104-.209zM218.47 147c-.517 2.508-10.451 48.592-10.451 48.592-2.174 9.3-3.726 15.989-8.9 20.273-3.001 2.508-6.52 3.657-10.555 3.657-6.52 0-10.245-3.239-10.866-9.404l-.104-2.09s1.966-12.436 1.966-12.54c0 0 10.349-42.009 12.212-47.548.103-.313.103-.522.103-.627-20.18.21-23.801 0-24.008-.313-.104.418-.621 3.03-.621 3.03L156.69 197.37l-.932 3.97L154 214.508c0 3.866.724 7.105 2.277 9.718 4.863 8.569 18.627 9.823 26.388 9.823 10.038 0 19.455-2.195 25.767-6.061 11.073-6.584 13.97-16.929 16.454-26.02l1.242-4.703s10.659-43.576 12.522-49.219c.103-.314.103-.523.207-.627-14.695.104-18.938 0-20.387-.314V147zm59.03 86.623c-7.141-.105-9.728-.105-18.11.313l-.311-.627c.724-3.24 1.552-6.374 2.173-9.614l1.035-4.389c1.552-6.792 3.001-14.839 3.208-17.242.207-1.463.62-5.12-3.519-5.12-1.759 0-3.518.835-5.38 1.671-1.036 3.658-3.002 13.899-4.037 18.497-2.07 9.823-2.173 10.972-3.104 15.78l-.621.626c-7.347-.104-9.934-.104-18.42.314L230 233.1c1.449-5.852 2.794-11.704 4.14-17.556 3.518-15.78 4.45-21.84 5.38-29.887l.725-.418c8.279-1.149 10.245-1.463 19.248-3.239l.724.836-1.345 5.016c1.552-.94 3.001-1.881 4.553-2.613 4.243-2.09 8.9-2.717 11.487-2.717 3.932 0 8.279 1.15 10.038 5.748 1.656 4.075.62 9.091-1.656 19.019l-1.138 5.016c-2.277 11.077-2.69 13.062-3.933 20.586l-.827.627.103.105zm29.058.027c-4.346 0-7.14-.104-9.83 0-2.691 0-5.278.21-9.314.314l-.207-.314-.207-.418c1.138-4.18 1.656-5.643 2.277-7.106.517-1.463 1.034-2.926 2.07-7.21 1.241-5.539 2.069-9.405 2.586-12.854.621-3.24.932-6.06 1.346-9.3l.31-.209.31-.314c4.347-.627 7.038-1.045 9.832-1.463 2.794-.418 5.691-.94 10.141-1.776l.207.418.103.418-2.483 10.345c-.828 3.449-1.656 6.897-2.38 10.346-1.553 7.315-2.277 10.032-2.587 12.017-.414 1.881-.518 2.822-1.139 6.584l-.414.313-.414.314-.207-.105zm45.941-25.675c-.31 1.881-1.966 8.883-4.139 11.809-1.552 2.194-3.312 3.553-5.381 3.553-.621 0-4.14 0-4.243-5.33 0-2.612.517-5.33 1.138-8.255 1.863-8.465 4.14-15.466 9.831-15.466 4.45 0 4.76 5.225 2.794 13.69zm18.73.836c2.484-11.077.518-16.302-1.862-19.437-3.725-4.807-10.348-6.374-17.178-6.374-4.14 0-13.867.418-21.525 7.524-5.484 5.12-8.071 12.122-9.52 18.81-1.553 6.792-3.312 19.019 7.865 23.617 3.414 1.463 8.382 1.88 11.59 1.88 8.175 0 16.557-2.298 22.87-8.986 4.863-5.434 7.036-13.585 7.864-17.034h-.103zm174.433 26.08c-8.693-.104-11.176-.104-19.145.314l-.517-.627c2.173-8.256 4.346-16.616 6.313-24.976 2.483-10.868 3.104-15.466 3.932-21.84l.62-.523c8.59-1.254 10.97-1.567 19.973-3.239l.207.731c-1.656 6.897-3.208 13.69-4.864 20.482-3.311 14.317-4.45 21.632-5.691 29.156l-.828.627v-.105z" fill="#FEFEFE"/><path d="M533.16 209.374c-.414 1.776-2.07 8.882-4.243 11.808-1.449 2.09-4.967 3.449-6.933 3.449-.621 0-4.036 0-4.243-5.225 0-2.613.517-5.33 1.138-8.256 1.863-8.255 4.14-15.257 9.831-15.257 4.45 0 6.416 5.12 4.45 13.585v-.104zm17.075.836c2.483-11.077-7.658-.94-9.21-4.598-2.484-5.748-.932-17.243-10.866-21.109-3.829-1.568-12.832.418-20.49 7.524-5.381 5.016-8.072 12.017-9.52 18.705-1.553 6.688-3.312 19.02 7.76 23.304 3.52 1.567 6.727 1.985 9.935 1.776 11.177-.627 19.662-17.66 25.975-24.348 4.863-5.33 5.691 1.985 6.416-1.254zm-129.943 23.413c-7.14-.105-9.624-.105-18.006.313l-.31-.627c.724-3.24 1.552-6.374 2.276-9.614l.931-4.389c1.553-6.792 3.105-14.839 3.208-17.242.207-1.463.621-5.12-3.415-5.12-1.759 0-3.621.835-5.38 1.671-.932 3.658-3.002 13.899-4.037 18.497-1.966 9.823-2.173 10.972-3.104 15.78l-.621.626c-7.347-.104-9.934-.104-18.42.314L373 233.1c1.449-5.852 2.794-11.704 4.14-17.556 3.518-15.78 4.346-21.84 5.38-29.887l.621-.418c8.28-1.149 10.349-1.463 19.248-3.239l.725.836-1.242 5.016c1.449-.94 3.001-1.881 4.45-2.613 4.243-2.09 8.9-2.717 11.486-2.717 3.933 0 8.176 1.15 10.038 5.748 1.656 4.075.518 9.091-1.759 19.019l-1.138 5.016c-2.38 11.077-2.69 13.062-3.933 20.586l-.827.627.103.105zm62.001-86.519l-6.002.105c-15.523.209-21.732.104-24.215-.209-.207 1.15-.621 3.135-.621 3.135s-5.588 25.916-5.588 26.02c0 0-13.246 55.176-13.867 57.788 13.556-.209 19.041-.209 21.421.105.518-2.613 3.622-17.974 3.726-17.974 0 0 2.69-11.286 2.794-11.704 0 0 .827-1.15 1.655-1.672h1.242c11.694 0 24.836 0 35.185-7.628 7.037-5.225 11.797-13.063 13.97-22.468.517-2.299.931-5.016.931-7.837 0-3.658-.724-7.21-2.794-10.032-5.277-7.42-15.73-7.524-27.837-7.629zm7.761 27.066c-1.241 5.747-4.967 10.659-9.727 12.958-3.932 1.985-8.693 2.194-13.66 2.194h-3.208l.207-1.254s5.899-25.916 5.899-25.811l.207-1.359.103-1.045 2.38.21s12.211 1.044 12.418 1.044c4.76 1.881 6.83 6.688 5.381 13.063zm127.207 8.666l-.724-.836c-8.796 1.776-10.452 2.09-18.524 3.24l-.62.626c0 .105-.104.21-.104.418v-.104c-6.002 14.107-5.899 11.077-10.762 22.154 0-.523 0-.836-.104-1.359l-1.242-24.035-.724-.836c-9.314 1.777-9.52 2.09-18.006 3.24l-.621.627c-.104.313-.104.627-.104.94l.104.105c1.035 5.538.828 4.284 1.863 12.958.517 4.284 1.138 8.569 1.655 12.749.828 7.106 1.346 10.554 2.38 21.318-5.795 9.614-7.14 13.271-12.728 21.735l.31.836c8.383-.313 10.245-.313 16.454-.313l1.346-1.568c4.656-10.136 40.255-71.79 40.255-71.79l-.104-.105zm-302.717 6.922c4.76-3.344 5.38-7.942 1.345-10.345-4.036-2.404-11.176-1.672-15.937 1.672-4.76 3.24-5.277 7.837-1.241 10.345 3.932 2.3 11.072 1.672 15.833-1.672z" fill="#FEFEFE"/><path d="M575.735 256.104l-6.934 12.018c-2.173 4.075-6.312 7.21-12.728 7.21L545 275.123l3.208-10.868h2.173c1.138 0 1.966-.104 2.587-.418.621-.209.932-.627 1.449-1.254l4.14-6.583h17.281l-.103.104z" fill="#FEFEFE"/></g></svg>'
  var xe =
    '<svg width="750" height="471" viewBox="0 0 750 471" xmlns="http://www.w3.org/2000/svg"><g fill-rule="nonzero" fill="none"><rect fill="#000" width="750" height="471" rx="40"/><path d="M279.8 421.77V397c0-9.35-6-15.64-15.55-15.72-5-.08-10.26 1.49-13.9 7-2.73-4.38-7-7-13.07-7a13.08 13.08 0 0 0-11.58 5.87v-4.88h-8.61v39.55h8.69v-21.97c0-6.87 3.81-10.51 9.68-10.51 5.71 0 8.61 3.72 8.61 10.42v22h8.69v-21.91c0-6.87 4-10.51 9.68-10.51 5.87 0 8.69 3.72 8.69 10.42v22l8.67.01zM328.28 402v-19.77h-8.61V387c-2.73-3.56-6.87-5.79-12.49-5.79-11.09 0-19.77 8.69-19.77 20.77s8.69 20.77 19.77 20.77c5.63 0 9.76-2.23 12.49-5.79v4.8h8.61V402zm-32 0c0-6.95 4.55-12.66 12-12.66 7.12 0 11.91 5.46 11.91 12.66s-4.8 12.66-11.91 12.66c-7.47 0-12.02-5.71-12.02-12.66h.02zm216.12-20.81a22.29 22.29 0 0 1 8.49 1.59 20.71 20.71 0 0 1 6.75 4.38 20 20 0 0 1 4.46 6.59 22 22 0 0 1 0 16.52 20 20 0 0 1-4.46 6.59 20.69 20.69 0 0 1-6.75 4.38 23.43 23.43 0 0 1-17 0 20.47 20.47 0 0 1-6.73-4.38 20.21 20.21 0 0 1-4.44-6.59 22 22 0 0 1 0-16.52 20.23 20.23 0 0 1 4.44-6.59 20.48 20.48 0 0 1 6.73-4.38 22.29 22.29 0 0 1 8.51-1.59zm0 8.14a12.84 12.84 0 0 0-4.91.93 11.62 11.62 0 0 0-3.92 2.6 12.13 12.13 0 0 0-2.6 4 14.39 14.39 0 0 0 0 10.28 12.11 12.11 0 0 0 2.6 4 11.62 11.62 0 0 0 3.92 2.6 13.46 13.46 0 0 0 9.83 0 11.86 11.86 0 0 0 3.94-2.6 12 12 0 0 0 2.62-4 14.39 14.39 0 0 0 0-10.28 12 12 0 0 0-2.62-4 11.86 11.86 0 0 0-3.94-2.6 12.84 12.84 0 0 0-4.92-.94v.01zM375.1 402c-.08-12.33-7.69-20.77-18.78-20.77-11.58 0-19.69 8.44-19.69 20.77 0 12.58 8.44 20.77 20.27 20.77 6 0 11.42-1.49 16.22-5.54l-4.22-6.37a18.84 18.84 0 0 1-11.5 4.14c-5.54 0-10.59-2.56-11.83-9.68h29.37c.06-1.09.16-2.16.16-3.32zm-29.45-3.47c.91-5.71 4.38-9.6 10.51-9.6 5.54 0 9.1 3.47 10 9.6h-20.51zm65.69-6.2a25.49 25.49 0 0 0-12.34-3.4c-4.72 0-7.53 1.74-7.53 4.63 0 2.65 3 3.39 6.7 3.89l4.05.58c8.61 1.24 13.82 4.88 13.82 11.83 0 7.53-6.62 12.91-18 12.91-6.45 0-12.41-1.66-17.13-5.13l4.05-6.7a21.07 21.07 0 0 0 13.16 4.14c5.87 0 9-1.74 9-4.8 0-2.23-2.23-3.47-6.95-4.14l-4.05-.58c-8.85-1.24-13.65-5.21-13.65-11.67 0-7.86 6.45-12.66 16.46-12.66 6.29 0 12 1.41 16.13 4.14l-3.72 6.96zm41.35-2.23h-14.07V408c0 4 1.41 6.62 5.71 6.62a15.89 15.89 0 0 0 7.61-2.23l2.48 7.36a20.22 20.22 0 0 1-10.76 3.06c-10.18 0-13.73-5.46-13.73-14.65v-18h-8v-7.86h8v-12h8.69v12h14.06l.01 7.8zm29.78-8.85a18.38 18.38 0 0 1 6.12 1.08l-2.65 8.11a14 14 0 0 0-5.38-1c-5.63 0-8.44 3.64-8.44 10.18v22.17h-8.6v-39.56H472V387a11.66 11.66 0 0 1 10.42-5.79l.05.04z" fill="#FFF"/><path fill="#7673C0" d="M309.95 80.39h130.5V314.9h-130.5z"/><path d="M318.24 197.64a148.88 148.88 0 0 1 57-117.26c-61.147-48.062-148.962-41.066-201.728 16.071-52.766 57.137-52.766 145.23 0 202.368 52.766 57.137 140.581 64.133 201.728 16.071a148.88 148.88 0 0 1-57-117.25z" fill="#EB001B"/><path d="M616.5 197.64c.001 57.099-32.598 109.186-83.954 134.143-51.356 24.956-112.454 18.4-157.346-16.883a149.16 149.16 0 0 0 0-234.51c44.89-35.283 105.986-41.839 157.341-16.885 51.355 24.954 83.956 77.038 83.959 134.135z" fill="#00A1DF"/></g></svg>'
  var Se =
    '<svg width="750" height="471" viewBox="0 0 750 471" xmlns="http://www.w3.org/2000/svg"><g fill-rule="nonzero" fill="none"><path d="M40 0h670c22.1 0 40 17.9 40 40v391c0 22.1-17.9 40-40 40H40c-22.1 0-40-17.9-40-40V40C0 17.9 17.9 0 40 0z" fill="#000"/><path d="M150.7 170.6c6.8-2.3 14.1-3.5 21.7-3.5 33.2 0 60.9 23.6 67.2 54.9l47-9.6c-10.8-53.2-57.8-93.3-114.2-93.3-12.9 0-25.3 2.1-36.9 6l15.2 45.5z" fill="#FFF100"/><path d="M95.2 323l31.8-36c-14.2-12.6-23.1-30.9-23.1-51.4 0-20.4 8.9-38.8 23.1-51.3l-31.8-35.9c-24.1 21.4-39.3 52.5-39.3 87.3 0 34.7 15.2 65.9 39.3 87.3z" fill="#00A3DF"/><path d="M239.6 249.4c-6.4 31.3-34 54.8-67.2 54.8-7.6 0-14.9-1.2-21.8-3.5l-15.2 45.5c11.6 3.9 24.1 6 37 6 56.4 0 103.4-40 114.2-93.2l-47-9.6z" fill="#EE4023"/><g fill="#FFF"><path d="M443.2 281.6c-7.8 7.6-18.3 12.2-29.9 12-8-.1-15.4-2.5-21.6-6.5l-15.6 24.8c10.7 6.7 23.2 10.7 36.8 10.9 19.7.3 37.7-7.5 50.8-20.2l-20.5-21zM415 180.5c-39.2-.6-71.6 30.8-72.2 70-.2 14.7 4 28.5 11.5 39.9l128.8-55.1c-7.2-30.9-34.8-54.2-68.1-54.8zm-42.7 75.6c-.2-1.6-.3-3.3-.3-5 .4-23.1 19.4-41.6 42.5-41.2 12.6.2 23.8 5.9 31.3 14.9l-73.5 31.3zm151.3-107.6v137.3l23.8 9.9-11.3 27.1-23.6-9.8c-5.3-2.3-8.9-5.8-11.6-9.8-2.6-4-4.6-9.6-4.6-17V148.5h27.3zM609.5 212c4.2-1.4 8.6-2.1 13.3-2.1 20.3 0 37.1 14.4 41 33.5l28.7-5.9c-6.6-32.5-35.3-56.9-69.7-56.9-7.9 0-15.5 1.3-22.5 3.6l9.2 27.8zm-33.9 92.9L595 283c-8.7-7.7-14.1-18.9-14.1-31.4s5.5-23.7 14.1-31.3l-19.4-21.9c-14.7 13-24 32.1-24 53.3 0 21.2 9.3 40.2 24 53.2zm88.2-44.8c-3.9 19.1-20.8 33.5-41 33.5-4.6 0-9.1-.8-13.3-2.2l-9.3 27.8c7.1 2.4 14.7 3.7 22.6 3.7 34.4 0 63.1-24.4 69.7-56.9l-28.7-5.9z"/></g></g></svg>'
  var Le =
    '<svg width="750" height="471" viewBox="0 0 750 471" xmlns="http://www.w3.org/2000/svg"><g fill-rule="nonzero" fill="none"><path d="M697.115 0H52.885C23.724 0 0 23.196 0 51.707v367.586C0 447.804 23.724 471 52.885 471h644.23C726.274 471 750 447.804 750 419.293V51.707C750 23.196 726.274 0 697.115 0z" fill="#FFF"/><path d="M321.004 378.44L47 378.54v-.66c0-.363.437-2.714.97-5.226.535-2.511 1.365-6.507 1.847-8.877.48-2.372 1.303-6.4 1.826-8.955a3823.979 3823.979 0 0 0 3.815-18.735c.494-2.463 1.317-6.493 1.831-8.955a2558.2 2558.2 0 0 0 1.948-9.45c.557-2.736 1.403-6.915 1.881-9.287a794.28 794.28 0 0 1 1.688-8.123 271.84 271.84 0 0 0 1.275-6.302c.251-1.368 1.065-5.397 1.808-8.954a730.47 730.47 0 0 0 1.822-8.953c.26-1.369 1.082-5.398 1.83-8.955.747-3.555 1.568-7.585 1.824-8.953.256-1.368 1.081-5.398 1.833-8.954.754-3.557 1.566-7.511 1.805-8.788.241-1.277.9-4.56 1.464-7.295.563-2.736 1.63-7.885 2.37-11.441.741-3.558 2.007-9.75 2.813-13.764.809-4.012 1.773-8.787 2.145-10.61a4107.793 4107.793 0 0 1 3.31-16.084c.549-2.646 1.441-6.973 1.983-9.618a3528.87 3528.87 0 0 0 1.858-9.12c.48-2.37 1.297-6.325 1.817-8.787.52-2.463 1.416-6.79 1.99-9.618a306.964 306.964 0 0 1 2.135-9.617c.6-2.462 1.45-5.447 1.887-6.632.437-1.186 1.645-3.755 2.684-5.711l1.888-3.555 1.717-2.249c.943-1.235 2.629-3.19 3.745-4.34 1.116-1.152 2.997-2.885 4.184-3.85 1.185-.967 2.902-2.272 3.813-2.899.912-.627 2.703-1.726 3.98-2.441 1.276-.716 3.069-1.652 3.98-2.081.912-.43 2.778-1.215 4.145-1.743 1.368-.528 3.98-1.415 5.803-1.968 1.824-.555 5.248-1.39 7.609-1.857 2.361-.466 6.09-1.09 8.29-1.385l3.999-.538 274.17-.103L702.95 93v.66c0 .362-.44 2.714-.976 5.225-.539 2.511-1.437 6.805-1.997 9.54-.561 2.736-1.378 6.692-1.818 8.789-.439 2.098-1.27 6.127-1.848 8.953-.577 2.828-1.465 7.156-1.973 9.618-.508 2.462-1.331 6.492-1.829 8.953-.497 2.463-1.325 6.492-1.838 8.955-.516 2.462-1.312 6.343-1.772 8.622-.461 2.28-1.294 6.383-1.852 9.12a1955.06 1955.06 0 0 1-1.992 9.616c-.538 2.554-1.356 6.509-1.819 8.789l-1.853 9.119c-.556 2.736-1.45 7.064-1.988 9.618-.537 2.553-1.338 6.433-1.78 8.622a8069.947 8069.947 0 0 1-3.704 18.24c-.45 2.187-1.25 6.068-1.78 8.62-.531 2.554-1.439 6.957-2.015 9.784-.58 2.827-1.407 6.855-1.84 8.954-.434 2.096-1.244 6.052-1.802 8.787-.557 2.737-1.445 7.064-1.973 9.618-.527 2.553-1.353 6.583-1.837 8.954-.482 2.37-1.322 6.475-1.864 9.12-.545 2.643-1.432 6.971-1.973 9.615-.542 2.646-1.352 6.6-1.803 8.79a4228.93 4228.93 0 0 0-1.828 8.953 911.017 911.017 0 0 1-2.01 9.581l-.998 4.606-1.19 3.187c-.653 1.752-1.637 4.082-2.186 5.177-.547 1.093-1.663 3.025-2.479 4.29-.817 1.266-1.955 2.887-2.528 3.603-.574.716-2.302 2.566-3.842 4.111l-2.795 2.807-2.692 1.912c-1.48 1.052-3.075 2.122-3.543 2.377-.468.256-2.252 1.167-3.963 2.023-1.711.858-4.13 1.948-5.372 2.423-1.243.477-3.705 1.287-5.472 1.8-1.766.516-3.66 1.023-4.206 1.127-.548.105-2.446.498-4.221.874-1.774.376-5.355.937-7.958 1.247l-4.734.564-274.003.097zm-97.486-70.874h7.13l.2-.525c.113-.289.203-.967.203-1.507 0-.541.235-2.505.523-4.366.286-1.863.96-6.146 1.497-9.52.537-3.375 1.34-8.449 1.785-11.275.446-2.828.99-6.447 1.21-8.043.22-1.596.486-2.9.594-2.9.107 0 .568.704 1.024 1.566l.828 1.567 1.838 1.853 1.84 1.851 2.262.907 2.263.905 2.697.35 2.698.35 3.422-.21 3.423-.21 3.707-.96 3.707-.96 1.99-.906c1.094-.5 3.034-1.59 4.31-2.421l2.322-1.512 2.164-2.164c1.19-1.188 2.87-3.097 3.73-4.24.863-1.141 1.568-2.159 1.568-2.26 0-.102.424-.809.94-1.572.518-.762 1.576-2.88 2.352-4.703.778-1.824 1.99-5.107 2.698-7.295l1.285-3.98.665-3.447c.365-1.895.836-5.029 1.045-6.964l.38-3.517-.22-2.984-.22-2.985-.692-2.985-.69-2.985-1.122-2.233-1.12-2.235-2.164-2.294-2.163-2.294-2.56-1.323-2.56-1.322-2.819-.677-2.819-.674-2.819-.206-2.818-.207-3.14.36-3.14.361-2.563.655-2.562.653-2.227 1.032c-1.224.565-3.007 1.528-3.96 2.138-.953.61-1.937 1.311-2.185 1.56-.248.247-.844.707-1.322 1.018l-.871.571.608-2.913c.336-1.602.615-3.099.623-3.328l.013-.414h-12.16l-1.065 6.716c-.587 3.694-1.513 9.4-2.058 12.685a5718.93 5718.93 0 0 1-3.65 21.72c-.542 3.191-1.438 8.266-1.991 11.276-.554 3.01-1.364 7.412-1.802 9.783-.437 2.37-1.261 6.847-1.83 9.947-.567 3.103-1.481 8.026-2.03 10.945-.55 2.918-1.441 7.544-1.984 10.28-.543 2.736-1.067 5.311-1.167 5.72l-.181.747h7.13zm30.696-38.342l-2.768.167-1.81-.32-1.81-.32-1.838-.839-1.838-.84-1.284-1.226-1.284-1.225-.741-1.658c-.408-.913-.932-2.462-1.164-3.444l-.423-1.784.17-2.858.17-2.858.854-4.477c.47-2.462 1.313-7.089 1.874-10.28.561-3.192 1.413-7.87 1.89-10.394l.867-4.59 1.901-1.581c1.046-.87 2.703-2.036 3.682-2.591l1.778-1.01 2.321-.718 2.322-.72 2.985-.174 2.984-.175 2.431.518 2.43.518 1.715.79 1.715.79 1.438 1.445 1.44 1.446.774 1.531c.427.843 1.027 2.49 1.332 3.663l.556 2.131-.17 6.302-.17 6.3-.852 3.725c-.468 2.049-1.36 5.183-1.981 6.964l-1.13 3.24-1.384 2.622c-.761 1.443-1.935 3.392-2.608 4.332-.673.939-1.747 2.158-2.386 2.705a52.14 52.14 0 0 1-2.375 1.905l-1.216.908-2.814.957-2.814.957-2.769.166zm68.862 9.117l3.648.042 3.648-.333c2.007-.183 5.29-.564 7.295-.847 2.007-.283 5.473-.916 7.703-1.405l4.053-.892.203-1.496c.111-.821.566-3.268 1.012-5.436l.81-3.945-.18-.178-.178-.178-1.24.598c-.68.329-2.805 1.115-4.717 1.745l-3.48 1.146-3.65.708-3.651.707-5.804.012-5.804.01-1.99-.635c-1.094-.349-2.703-.988-3.576-1.421l-1.586-.785-1.31-1.184-1.31-1.184-1.023-1.785-1.022-1.787-.64-2.24-.642-2.24-.003-4.147-.005-4.147.568-3.698.57-3.7 4.99-.233 4.99-.234 18.447.12 18.446.118.557-2.362c.307-1.3.775-3.986 1.041-5.97l.484-3.607.01-3.033.011-3.034-.525-2.266-.526-2.264-.869-1.5c-.476-.824-1.319-2.019-1.87-2.656-.55-.636-1.534-1.533-2.186-1.993-.652-.46-1.93-1.233-2.843-1.718l-1.658-.882-2.896-.698-2.898-.697-3.569-.341-3.57-.342-3.316.216-3.316.215-3.98.764-3.98.765-2.487.994c-1.368.546-3.457 1.544-4.642 2.217-1.186.672-2.827 1.766-3.647 2.43-.823.666-2.244 1.959-3.159 2.874-.916.916-2.272 2.56-3.011 3.654-.74 1.095-1.874 3.034-2.522 4.31-.646 1.278-1.489 3.069-1.872 3.98-.383.912-1.08 2.778-1.547 4.145-.469 1.369-1.204 3.98-1.635 5.805a109.124 109.124 0 0 0-1.313 6.67l-.528 3.357.005 4.935.005 4.934.504 2.156c.276 1.185.807 2.977 1.177 3.98.37 1.003 1.057 2.495 1.524 3.316.466.82 1.465 2.142 2.216 2.937.752.794 2.114 2 3.026 2.678.911.68 2.535 1.634 3.607 2.122l1.95.887 2.718.658c1.495.36 3.752.79 5.015.952 1.262.162 3.937.314 5.943.336zm6.246-46.717c-9.18 0-16.692-.065-16.692-.146 0-.08.392-1.237.871-2.57.478-1.334 1.32-3.317 1.868-4.41l.999-1.985 2.193-2.182 2.193-2.183 2.157-1.03c1.185-.567 2.752-1.185 3.48-1.372.731-.187 2.82-.436 4.643-.552l3.318-.213 2.547.328 2.546.327 1.85.847 1.851.847 1.016 1.095c.558.602 1.223 1.488 1.478 1.97l.463.875.306 1.943.307 1.944-.35 3.233-.35 3.234h-16.694zm99.213 46.718l3.65.04 4.142-.49c2.28-.27 5.313-.717 6.742-.995a76.861 76.861 0 0 0 5.14-1.22c1.398-.397 2.663-.824 2.812-.95.148-.127.542-1.633.877-3.345.335-1.712.758-4.009.938-5.103.18-1.095.274-2.048.208-2.12-.067-.072-.31.021-.543.205-.234.185-1.86.87-3.617 1.522l-3.193 1.186-4.547.88-4.548.881-3.865-.13-3.866-.133-2.197-.762-2.196-.762-1.697-1.483-1.696-1.485-1.127-2.05-1.124-2.05-.538-2.743-.535-2.743.004-3.557.002-3.558.652-4.311.652-4.312.688-2.322c.38-1.277.81-2.768.954-3.315.146-.548.753-2.115 1.352-3.483.598-1.368 1.665-3.482 2.37-4.698l1.284-2.21 1.577-1.635 1.577-1.634 1.668-1.034 1.67-1.036 2.145-.66c1.179-.364 3.264-.836 4.631-1.048l2.487-.388 3.648.183 3.648.183 4.31.864 4.312.861 1.753.654c.964.36 1.795.655 1.848.655.05 0 .282-1.231.513-2.737.232-1.504.643-3.98.914-5.5.273-1.522.43-2.833.349-2.912-.08-.08-1.376-.286-2.879-.457-1.504-.171-5.591-.475-9.082-.677l-6.35-.364-4.476.343-4.477.344-3.317.696-3.315.697-2.137.854c-1.174.47-2.894 1.318-3.823 1.884a60.66 60.66 0 0 0-2.625 1.693c-.516.365-2.08 1.788-3.479 3.163l-2.539 2.5-1.419 2.077c-.78 1.143-2.127 3.524-2.997 5.294l-1.58 3.217-1.211 3.48c-.666 1.916-1.596 5.05-2.066 6.965l-.855 3.483-.311 3.15-.31 3.15.003 4.146.004 4.145.312 2.411.313 2.412.994 2.48.992 2.481 1.149 1.793 1.146 1.793 1.824 1.796 1.825 1.795 1.93 1.021 1.93 1.02 2.535.704c1.393.387 3.408.831 4.476.987 1.068.156 3.584.302 5.593.324h-.006zm54.55-.122l4.476-.129 2.819-.721 2.819-.722 1.824-.862c1.003-.473 2.644-1.41 3.648-2.08 1.003-.67 2.557-1.944 3.45-2.83.895-.888 2.221-2.4 2.948-3.362.727-.963 1.365-1.707 1.419-1.653.055.054-.114 1.587-.372 3.407-.257 1.822-.471 4.244-.475 5.384l-.006 2.072h12.172l.187-4.724.185-4.726.869-6.136c.478-3.374 1.25-8.374 1.715-11.109.465-2.736 1.273-7.361 1.797-10.28.523-2.92 1.352-7.47 1.84-10.115l.892-4.808.03-4.153.03-4.154-.939-1.92-.94-1.92-1.272-1.222-1.275-1.223-2.09-1.059-2.091-1.06-3.116-.693-3.117-.694-4.29-.326-4.29-.326-5.527.342c-3.04.188-7.317.559-9.506.826l-3.98.482-2.712.01-2.712.01-.395 1.908c-.217 1.049-.82 3.54-1.34 5.537-.521 1.997-.898 3.678-.838 3.737.058.06 1.509-.27 3.222-.731 1.714-.462 5.355-1.22 8.092-1.686l4.974-.847 4.476-.184 4.477-.185 2.884.505 2.884.506 1.925.95 1.924.95 1.078 1.607 1.079 1.606-.015 2.532-.017 2.533-.57 2.779-.572 2.78-11.933.043-11.932.042-3.905 1.07c-2.147.59-4.526 1.372-5.285 1.738-.76.368-1.518.668-1.688.668-.168 0-1.446.707-2.839 1.575l-2.532 1.573-1.994 1.99c-1.098 1.096-2.499 2.738-3.114 3.65-.616.911-1.618 2.816-2.224 4.233l-1.103 2.576-.507 2.895-.507 2.897v6.077l.483 2.53.485 2.53.897 1.65c.494.906 1.402 2.236 2.015 2.953l1.117 1.304 1.982 1.205 1.983 1.205 2.271.642c1.25.353 3.15.781 4.224.951l1.953.308 4.477-.128h-.003zm4.145-9.274l-2.654.14-1.757-.449c-.965-.245-2.432-.794-3.259-1.219l-1.5-.772-.82-.974c-.45-.537-1.14-1.588-1.53-2.34l-.711-1.365-.139-3.187-.14-3.188.562-1.934c.309-1.063 1.035-2.91 1.612-4.101l1.05-2.168 2.011-1.996 2.01-1.996 2.135-1.028 2.134-1.028 2.653-.63 2.654-.63h16.581l.524.216.524.216-.44 2.603c-.243 1.43-.822 4.02-1.288 5.752-.464 1.734-1.285 4.28-1.823 5.66-.539 1.381-.98 2.602-.98 2.712 0 .112-.545 1.117-1.211 2.235l-1.21 2.034-1.989 1.971c-1.093 1.083-2.11 1.97-2.257 1.97-.146 0-.816.373-1.488.83l-1.223.827-2.69.851-2.689.85-2.652.138zm107.943 9.392l3.15.04 2.985-.485c1.642-.266 3.73-.695 4.643-.953.911-.259 2.554-.928 3.647-1.488l1.99-1.02 1.713-1.507 1.71-1.507 1.804-2.403c.992-1.323 1.889-2.628 1.995-2.902l.192-.499-.167 1.66a54.148 54.148 0 0 1-.46 3.316c-.16.912-.389 2.665-.51 3.897l-.22 2.237h13.012v-4.476l.99-8.457c.546-4.651 1.352-10.843 1.792-13.762.44-2.92 1.12-7.096 1.51-9.285.39-2.19 1.081-6.144 1.534-8.788.456-2.644 1.276-7.272 1.825-10.28.548-3.01 1.427-7.785 1.952-10.612l1.812-9.784c.471-2.553 1.317-7.03 1.878-9.948a704.51 704.51 0 0 1 1.823-9.12c.441-2.097.802-3.926.801-4.062v-.25h-14.195l-.21 2.074c-.114 1.14-.658 4.907-1.206 8.374-.549 3.464-1.444 8.986-1.99 12.269-.544 3.283-1.068 6.467-1.165 7.075l-.178 1.106-.56-.238c-.307-.131-1.978-.595-3.71-1.03l-3.15-.791-4.31-.336-4.312-.335-3.648.339-3.647.34-3.317.84-3.316.837-3.15 1.537-3.152 1.536-2.32 1.718-2.322 1.718-2.005 2.15c-1.103 1.183-2.695 3.138-3.54 4.346l-1.534 2.196-1.804 3.75c-.99 2.064-2.197 4.796-2.68 6.072-.484 1.278-1.335 4.108-1.894 6.29l-1.015 3.968-.5 5.153-.5 5.15.375 4.146.376 4.145.443 1.492c.246.821.76 2.283 1.145 3.25l.7 1.758 1.276 1.727 1.278 1.729 1.457 1.193 1.458 1.195 1.99.988c1.095.543 2.93 1.245 4.08 1.56 1.148.315 3.013.693 4.145.84 1.13.147 3.472.286 5.206.307zm5.654-9.407l-2.504.13-1.69-.303c-.929-.167-2.416-.616-3.305-.997l-1.615-.691-1.36-1.115-1.359-1.113-1.01-1.935-1.01-1.934-.461-2.156-.46-2.156.04-4.31.038-4.312.535-3.814.534-3.813.831-2.653c.457-1.459.834-2.836.836-3.06.004-.223.453-1.416 1.003-2.652a89.832 89.832 0 0 1 2.037-4.237c.572-1.095 1.64-2.8 2.374-3.79.736-.991 2.045-2.484 2.91-3.318.864-.832 2.238-1.926 3.056-2.428l1.484-.913 2.607-.903 2.607-.902 5.472-.003h5.472l3.15.875c1.733.48 3.573 1.037 4.089 1.238l.938.364-.183.91c-.1.502-.495 2.702-.876 4.89-.38 2.19-1.132 6.368-1.668 9.287-.537 2.918-1.361 7.32-1.833 9.782-.47 2.463-1.152 5.596-1.515 6.964a457.836 457.836 0 0 1-1.138 4.21c-.263.948-.889 2.59-1.39 3.648-.503 1.059-1.382 2.597-1.953 3.417-.572.82-1.538 1.959-2.148 2.527-.611.57-1.93 1.58-2.934 2.246l-1.824 1.212-2.636.837-2.637.837-2.504.134zm-488.066 7.793h8.056l.579-3.564c.317-1.96.939-5.73 1.38-8.374l1.823-10.943c.563-3.375 1.406-8.374 1.874-11.11.467-2.735 1.211-6.979 1.651-9.43.441-2.453.886-4.541.987-4.644l.187-.185h43.331l.241.24.241.24-.377 1.915c-.205 1.054-.816 4.303-1.357 7.221-.54 2.919-1.448 7.843-2.02 10.945-.568 3.1-1.393 7.503-1.83 9.782a1289.35 1289.35 0 0 0-1.968 10.612c-.643 3.556-1.17 6.653-1.167 6.881l.004.414h16.18l.358-2.072c.198-1.14.514-3.192.705-4.56.19-1.368.65-4.279 1.02-6.467.37-2.187 1.109-6.517 1.643-9.617.534-3.1 1.429-8.398 1.987-11.772.559-3.375 1.387-8.299 1.842-10.943a711.931 711.931 0 0 1 1.798-9.95 2821.88 2821.88 0 0 0 1.98-10.612c.555-3.008 1.384-7.56 1.845-10.114.461-2.553 1.3-7.18 1.867-10.28.566-3.1 1.28-6.719 1.587-8.042l.559-2.404h-16.384l-.223 1.576c-.121.865-.517 3.291-.879 5.388a1576.67 1576.67 0 0 1-1.46 8.29c-.442 2.463-1.249 7.163-1.794 10.447a784.292 784.292 0 0 0-1.543 9.658l-.553 3.688-12.025.244-12.026.243-10.072-.24c-5.54-.13-10.103-.265-10.141-.296-.037-.032.151-1.32.419-2.864a262.12 262.12 0 0 1 1.127-5.956c.352-1.733 1.02-5.165 1.482-7.629.464-2.461.988-5.52 1.167-6.797a84.57 84.57 0 0 1 .83-4.727c.278-1.321.806-4.107 1.174-6.189.366-2.081.757-4.022.869-4.31l.2-.526H121.685l-.52 2.902a231.194 231.194 0 0 0-.848 5.057c-.18 1.185-.786 4.99-1.345 8.456-.56 3.465-1.386 8.614-1.836 11.44-.45 2.828-1.27 7.977-1.82 11.442a700.908 700.908 0 0 1-2.023 11.938c-.56 3.102-1.373 7.503-1.805 9.783-.431 2.28-1.253 6.608-1.826 9.617a840.991 840.991 0 0 1-1.86 9.452c-.45 2.188-.946 4.725-1.103 5.636-.159.913-.671 3.543-1.142 5.846-.47 2.303-.854 4.429-.854 4.726v.538h8.059zm89.199 0h7.133l.2-.524c.112-.29.202-1.046.202-1.68 0-.638.45-3.946.997-7.353a2950.858 2950.858 0 0 1 3.848-23.273c.45-2.644 1.25-7.046 1.777-9.784a2436.17 2436.17 0 0 0 1.802-9.45 1195.97 1195.97 0 0 1 2.022-10.41c.649-3.264 1.26-6.064 1.36-6.224l.18-.292-7.213.09-7.213.088-.603 4.312a535.526 535.526 0 0 1-1.604 10.445c-.552 3.375-1.388 8.525-1.857 11.441a493.02 493.02 0 0 1-1.817 10.447l-1.808 9.617c-.462 2.463-1.293 6.79-1.846 9.617a1286.42 1286.42 0 0 1-1.648 8.29c-.355 1.734-.734 3.487-.845 3.898l-.2.745h7.133zm166.83 0h7.081l.212-2.996c.118-1.646.518-4.967.89-7.378.374-2.41 1.138-7.218 1.697-10.683.56-3.466 1.6-9.234 2.312-12.82.714-3.583 1.518-7.147 1.79-7.916.272-.771.494-1.605.494-1.855s.533-1.612 1.183-3.026c.65-1.414 1.863-3.58 2.695-4.812l1.511-2.242 2.023-1.874 2.023-1.872 2.495-1.192 2.495-1.192 3.815.02 3.812.02 1.876.56c1.03.308 1.963.56 2.072.56.109 0 .198-.351.198-.783 0-.43.373-2.614.829-4.854.455-2.238.829-4.164.829-4.28 0-.116-1.082-.54-2.404-.94-1.323-.402-3.15-.823-4.062-.937l-1.658-.205-2.156.382c-1.186.21-2.948.672-3.917 1.029-.97.356-2.57 1.163-3.556 1.794-.986.632-2.52 1.862-3.41 2.733-.89.872-2.385 2.63-3.323 3.907-.94 1.277-1.92 2.62-2.181 2.985l-.475.662.288-1.325c.159-.73.6-3.118.981-5.306.38-2.19.774-4.242.87-4.56l.176-.581H373.65v.8c0 .44-.374 3.087-.83 5.885-.456 2.799-1.208 7.475-1.671 10.394-.463 2.918-1.285 7.992-1.826 11.275a572.387 572.387 0 0 1-1.828 10.445 2317.56 2317.56 0 0 1-3.83 19.898c-.558 2.828-1.227 6.166-1.484 7.42-.259 1.253-.47 2.41-.47 2.569v.291h7.08zm168.074 0h7.239v-4.431l.834-5.495c.46-3.02 1.216-7.808 1.683-10.633a1372.56 1372.56 0 0 0 1.29-7.96c.246-1.55.892-4.908 1.438-7.461.548-2.554 1.23-5.314 1.518-6.136.288-.82.525-1.682.528-1.913.003-.232.62-1.721 1.37-3.31l1.367-2.892 1.804-2.395 1.802-2.394 1.973-1.484c1.085-.816 2.83-1.898 3.878-2.406l1.905-.922 4.144.028 4.146.03 1.632.523 1.631.524.276-.17.274-.17.016-1.058c.006-.582.361-2.747.788-4.813l.775-3.754-.872-.342a51.307 51.307 0 0 0-2.53-.862l-1.658-.523-2.984.008-2.985.007-2.432.857-2.433.855-1.827 1.101-1.825 1.102-2.375 2.487-2.375 2.487-1.276 1.93c-.7 1.06-1.318 1.881-1.372 1.823-.053-.057.328-2.27.847-4.913.52-2.645.952-5.145.96-5.555l.014-.747h-12.27v.212c0 .116-.306 2.242-.68 4.725a1358.83 1358.83 0 0 1-1.668 10.65c-.544 3.374-1.435 8.82-1.982 12.104a646.012 646.012 0 0 1-1.831 10.447c-.46 2.461-1.278 6.79-1.817 9.616-.54 2.828-1.425 7.38-1.968 10.115-.543 2.735-1.264 6.355-1.6 8.042l-.612 3.066h7.24zm-320.878-80.922l2.012.007 1.601-.545 1.602-.545 1.416-1.438 1.417-1.436.745-1.915.747-1.915.026-2.819.027-2.817-.663-1.102-.664-1.1-1.154-.715-1.155-.715h-4.986l-1.697.76-1.698.76-.985 1.055-.985 1.057-.774 1.823-.774 1.824-.146 2.841-.146 2.841.72 1.413.72 1.411 1.391.631 1.39.63 2.013.009z" fill="#B3131B"/></g></svg>'
  var St = class extends tt(Q) {
    constructor(t, e) {
      super(t, e),
        (this.utilKeys = [37, 39, 8, 46, 111, 220, 109, 32, 9]),
        (this.validSeperators = [' ', '-', '/', '\\']),
        (this.keyupVal = '')
    }
    init = () => {
      ;(this.$expiryElement = jQuery('[data-afd-control="expiry"]')),
        (this.$cvvElement = jQuery('[data-afd-control="cvv"]')),
        this.$element.data('card-is-afd-valid', !1),
        this.$expiryElement.data('expiry-is-regex-valid', !1),
        this.$expiryElement.data('expiry-is-syntax-valid', !1)
      let t = this.eventHandler
      t(this.$element, 'keydown', this.onKeyDown),
        t(this.$element, 'keyup', this.onKeyUp),
        t(this.$element, 'focusout', this.onFocusOut),
        t(this.$expiryElement, 'keydown', this.onExpiryKeyDown),
        t(this.$expiryElement, 'keyup', this.onExpiryKeyUp),
        t(this.$expiryElement, 'focusout', this.onExpiryFocusOut),
        jQuery('.afd-card-logo')
          .html(xt)
          .find('svg')
          .attr('height', this.options.card.logoHeight)
          .attr('width', this.options.card.logoWidth),
        this.$element.data('card-is-regex-valid', !1),
        this.$element.data('card-is-syntax-valid', !1),
        this.$element.data('card-is-afd-valid', !1),
        this.$element.data('card-type', ''),
        this.$element.data('card-type-nice', ''),
        this.$element.data('expiry-is-regex-valid', !1),
        this.$element.data('expiry-is-syntax-valid', !1),
        this.$cvvElement.data('code-name', ''),
        this.$cvvElement.data('code-length', ''),
        this.$cvvElement.attr('maxlength', 3)
    }
    onKeyDown = (t) => {
      ;((t.keyCode == 65 || t.keyCode == 86 || t.keyCode == 67) &&
        (t.ctrlKey === !0 || t.metaKey === !0)) ||
        ((t.keyCode < 48 || t.keyCode > 57) &&
          (t.keyCode < 96 || t.keyCode > 105) &&
          (t.keyCode < 112 || t.keyCode > 123) &&
          this.utilKeys.indexOf(t.keyCode) === -1 &&
          t.preventDefault())
    }
    onKeyUp = () => {
      if (this.$element.val().length < 1) return
      this.checkCardSyntaxValid().isValid
        ? this.handleValid()
        : this.clearValidation()
    }
    onFocusOut = () => {
      if (this.$element.val().length < 1) return
      this.checkCardSyntaxValid().isValid
        ? this.checkBoth()
        : this.handleInvalid(this.options.card.invalidCardNumberMessage)
    }
    checkCardSyntaxValid = () => {
      let t = this.$element,
        e = t.val(),
        s = Z.number(e)
      if (s.card !== null) {
        t.data('card-type', s.card.type),
          t.data('card-type-nice', s.card.niceType)
        let o = xt
        switch (s.card.type) {
          case 'visa':
            o = ge
            break
          case 'mastercard':
            o = Ce
            break
          case 'american-express':
            o = ve
            break
          case 'diners-club':
            o = we
            break
          case 'discover':
            o = be
            break
          case 'jcb':
            o = Ie
            break
          case 'unionpay':
            o = ke
            break
          case 'maestro':
            o = xe
            break
          case 'elo':
            o = Se
            break
          case 'hipercard':
            o = Le
            break
          default:
            o = xt
        }
        jQuery('.afd-card-logo')
          .html(o)
          .find('svg')
          .attr('height', this.options.card.logoHeight)
          .attr('width', this.options.card.logoWidth)
        let u = s.card.code
        this.$cvvElement.data('code-name', u.name),
          this.$cvvElement.data('code-length', u.size),
          this.$cvvElement.attr('maxlength', u.size)
      }
      return (
        t.data('card-is-regex-valid', s.isValid),
        t.data('card-is-syntax-valid', s.isValid),
        t.data('card-is-afd-valid', !1),
        jQuery(document).trigger('afd:cardValidationUpdated', [
          t,
          this.$expiryElement,
          this.$cvvElement
        ]),
        t.trigger('afd:cardValidationUpdated', [
          t,
          this.$expiryElement,
          this.$cvvElement
        ]),
        this.$expiryElement.trigger('afd:cardValidationUpdated', [
          t,
          this.$expiryElement,
          this.$cvvElement
        ]),
        this.$cvvElement.trigger('afd:cardValidationUpdated', [
          t,
          this.$expiryElement,
          this.$cvvElement
        ]),
        s
      )
    }
    onExpiryKeyDown = (t) => {
      if (
        (t.keyCode == 65 || t.keyCode == 86 || t.keyCode == 67) &&
        (t.ctrlKey === !0 || t.metaKey === !0)
      )
        return
      let e = this.$expiryElement,
        s = e.val()
      ;(t.keyCode < 48 || t.keyCode > 57) &&
        (t.keyCode < 96 || t.keyCode > 105) &&
        (t.keyCode < 112 || t.keyCode > 123) &&
        this.utilKeys.indexOf(t.keyCode) === -1 &&
        t.preventDefault(),
        s.length > 9 &&
          t.keyCode !== 37 &&
          t.keyCode !== 39 &&
          t.keyCode !== 8 &&
          t.keyCode !== 46 &&
          t.preventDefault(),
        s.length === 2 &&
          !Z.expirationMonth(s).isValid &&
          [8, 46, 37, 39].indexOf(t.keyCode) === -1 &&
          t.preventDefault(),
        this.keyupVal.length > 4 &&
          this.validSeperators.indexOf(t.key) > -1 &&
          t.preventDefault(),
        this.keyupVal.length === 5 &&
          t.keyCode === 8 &&
          (e.val(this.keyupVal.replace(' / ', '')), t.preventDefault())
    }
    onExpiryKeyUp = (t) => {
      let e = this.$expiryElement,
        s = e.val().replace(' ', ''),
        o = Z.expirationDate(s)
      if (o.isValid) this.handleValid(e)
      else if (s.length === 1) this.clearValidation(e)
      else if (s.length === 2) {
        let u = s.substr(0, 1),
          y = s.substr(1, 1)
        if (this.validSeperators.indexOf(y) > -1)
          Z.expirationMonth(u).isValid
            ? e.val('0' + u + ' / ')
            : this.handleInvalid(this.options.card.invalidExpiryMonthMessage, e)
        else {
          let w = Z.expirationMonth(s)
          w.isValid && t.keyCode !== 8 && t.keyCode !== 46
            ? e.val(s + ' / ')
            : t.keyCode === 8 || (t.keyCode === 46 && w.isValid)
              ? this.clearValidation(e)
              : this.handleInvalid(
                  this.options.card.invalidExpiryMonthMessage,
                  e
                )
        }
      } else
        s.length === 3
          ? this.validSeperators.indexOf(t.key) > -1 &&
            e.val(s.replace(t.key, ' / '))
          : this.clearValidation(e)
      ;(this.keyupVal = e.val()),
        this.$element.data('card-is-afd-valid', !1),
        e.data('expiry-is-regex-valid', o.isValid),
        e.data('expiry-is-syntax-valid', o.isValid),
        jQuery(document).trigger('afd:cardValidationUpdated', [
          this.$element,
          e,
          this.$cvvElement
        ]),
        this.$element.trigger('afd:cardValidationUpdated', [
          this.$element,
          e,
          this.$cvvElement
        ]),
        e.trigger('afd:cardValidationUpdated', [
          this.$element,
          e,
          this.$cvvElement
        ]),
        this.$cvvElement.trigger('afd:cardValidationUpdated', [
          this.$element,
          e,
          this.$cvvElement
        ])
    }
    onExpiryFocusOut = () => {
      let t = this.$expiryElement,
        e = t.val().replace(' ', '')
      if (t.val().length < 1) return
      let s = Z.expirationDate(e)
      if (s.isValid) {
        let o = s.year.length === 2 ? '20' + s.year : s.year
        t.val(s.month + ' / ' + o), this.checkBoth()
      } else this.handleInvalid(this.options.card.invalidExpiryDateMessage, t)
      this.$element.data('card-is-afd-valid', !1),
        t.data('expiry-is-regex-valid', s.isValid),
        t.data('expiry-is-syntax-valid', s.isValid),
        jQuery(document).trigger('afd:cardValidationUpdated', [
          this.$element,
          t,
          this.$cvvElement
        ]),
        this.$element.trigger('afd:cardValidationUpdated', [
          this.$element,
          t,
          this.$cvvElement
        ]),
        t.trigger('afd:cardValidationUpdated', [
          this.$element,
          t,
          this.$cvvElement
        ]),
        this.$cvvElement.trigger('afd:cardValidationUpdated', [
          this.$element,
          t,
          this.$cvvElement
        ])
    }
    checkBoth = () => {
      let t = jQuery('[data-afd-control="card"]'),
        e = t.val(),
        s = Z.number(e),
        o = jQuery('[data-afd-control="expiry"]'),
        u = o.val().replace(' / ', '/'),
        y = Z.expirationDate(u),
        w = t.data('last-checked-value'),
        I = o.data('last-checked-value')
      s.isValid &&
        y.isValid &&
        (e !== w || u !== I) &&
        (jQuery(document).trigger('afd:cardValidationStarted', [
          t,
          o,
          this.$cvvElement
        ]),
        t.trigger('afd:cardValidationStarted', [t, o, this.$cvvElement]),
        o.trigger('afd:cardValidationStarted', [t, o, this.$cvvElement]),
        this.showLoadingSpinner(t, this.options.card.loadingSpinner),
        this.validateCard(e, u)
          .then((b) => {
            if (
              (t.data('last-checked-value', e),
              o.data('last-checked-value', u),
              b.Result === '1')
            ) {
              let [M] = b.Item
              this.handleValid(),
                this.handleValid(o),
                t.data('card-type-nice', M.CardType),
                t.data('card-is-afd-valid', !0),
                jQuery(document).trigger('afd:cardValidationUpdated', [
                  t,
                  o,
                  this.$cvvElement
                ]),
                t.trigger('afd:cardValidationUpdated', [
                  t,
                  o,
                  this.$cvvElement
                ]),
                o.trigger('afd:cardValidationUpdated', [
                  t,
                  o,
                  this.$cvvElement
                ]),
                this.$cvvElement.trigger('afd:cardValidationUpdated', [
                  t,
                  o,
                  this.$cvvElement
                ])
            } else
              this.$element.data('card-is-afd-valid', !1),
                this.handlePCEError(b.Result, b.ErrorText),
                this.handleInvalid(this.options.card.invalidCardOrExpiryMessage)
            jQuery(document).trigger('afd:cardValidationSuccess', [
              b,
              t,
              o,
              this.$cvvElement
            ]),
              t.trigger('afd:cardValidationSuccess', [
                b,
                t,
                o,
                this.$cvvElement
              ]),
              o.trigger('afd:cardValidationSuccess', [
                b,
                t,
                o,
                this.$cvvElement
              ]),
              this.hideLoadingSpinner(t, this.options.card.loadingSpinner)
          })
          .catch((b) => {
            console.error(b),
              jQuery(document).trigger('afd:cardValidationError', [b]),
              t.trigger('afd:cardValidationError', [b]),
              o.trigger('afd:cardValidationError', [b]),
              this.hideLoadingSpinner(t, this.options.card.loadingSpinner)
          }))
    }
    validateCard(t, e) {
      let s = this.setupParams({
        cardNumber: t,
        expiryDate: e,
        data: 'bank',
        task: 'card',
        fields: 'card',
        afdc: this.options.afdc
      })
      return jQuery.ajax(s)
    }
  }
  var Ee = (d, t) => {
    let e = {}
    if (
      (t ? (e = t) : typeof afdOptions < 'u' && (e = afdOptions),
      (e = jQuery.extend(!0, {}, G, e)),
      !d.is('input'))
    )
      throw (
        '<' +
        d.prop('tagName').toLowerCase() +
        '> is not a valid tag for `[data-afd-control="card"]`, use <input>'
      )
    let s = jQuery('[data-afd-control="expiry"]'),
      o = s.length
    if (o === 0)
      throw 'Could not find an instance of `[data-afd-control="expiry"]`.  This is required for card validation'
    if (o > 1)
      throw 'More than one instance of `[data-afd-control="expiry"]` found'
    if (!s.is('input'))
      throw (
        '<' +
        s.prop('tagName').toLowerCase() +
        '> is not a valid tag for `[data-afd-control="expiry"]`, use <input>'
      )
    let u = new St(d, e)
    jQuery(document)
      .off('afd:init.afd')
      .on('afd:init.afd', () => {
        u.init()
      }),
      u.init()
  }
  var Nt = ht(Me(), 1)
  var Lt = class extends tt(Q) {
    constructor(t, e) {
      super(t, e), (this.controlType = 'email')
    }
    init() {
      let t = this.eventHandler
      t(this.$element, 'keyup', this.onKeyUp),
        t(this.$element, 'focusout', this.onFocusOut)
    }
    onKeyUp = () => {
      let t = this.$element
      if (t.val().length < 1) return
      let e = t.val()
      t.data('email-is-afd-valid', !1),
        t.data('email-pce-message', 'Syntax not valid'),
        (0, Nt.validate)(e)
          ? (t.data('email-is-regex-valid', !0),
            t.data('email-syntax-valid', !0),
            t.data('email-pce-message', 'Regex valid, not yet queried PCE'))
          : (t.data('email-is-regex-valid', !1),
            t.data('email-syntax-valid', !1),
            jQuery(document).trigger('afd:emailValidationUpdated', [t]),
            t.trigger('afd:emailValidationUpdated', [t])),
        this.clearValidation(),
        jQuery(document).trigger('afd:emailValidationUpdated', [t]),
        t.trigger('afd:emailValidationUpdated', [t])
    }
    onFocusOut = () => {
      typeof this.$element.data('afd-already-valid') > 'u' &&
        this.$element.data('afd-already-valid', []),
        typeof this.$element.data('afd-already-invalid') > 'u' &&
          this.$element.data('afd-already-invalid', [])
      let t = this.$element
      if (t.val().length < 1) return
      let e = t.val()
      if ((0, Nt.validate)(e)) {
        if (
          (t.data('email-is-regex-valid', !0),
          t.data('email-syntax-valid', !0),
          this.$element.data('afd-already-valid').indexOf(e) > -1)
        ) {
          this.handleValid(),
            t.data('email-is-afd-valid', !0),
            jQuery(document).trigger('afd:emailValidationUpdated', [t]),
            jQuery(document).trigger('afd:emailValidationUpdatedFocusOut', [t]),
            t.trigger('afd:emailValidationUpdated', [t]),
            t.trigger('afd:emailValidationUpdatedFocusOut', [t])
          return
        } else if (this.$element.data('afd-already-invalid').indexOf(e) > -1) {
          this.handleInvalid(this.options.email.invalidEmailMessage),
            t.data('email-is-afd-valid', !1),
            jQuery(document).trigger('afd:emailValidationUpdated', [t]),
            jQuery(document).trigger('afd:emailValidationUpdatedFocusOut', [t]),
            t.trigger('afd:emailValidationUpdated', [t]),
            t.trigger('afd:emailValidationUpdatedFocusOut', [t])
          return
        }
        jQuery(document).trigger('afd:emailValidationStarted', [t]),
          t.trigger('afd:emailValidationStarted', [t]),
          this.showLoadingSpinner(t, this.options.email.loadingSpinner),
          this.validateEmail(e)
            .then((o, u, y) => {
              if (o.Result === '1') {
                let [w] = o.Item
                this.handleValid(),
                  t.data('email-is-afd-valid', !0),
                  t.data('email-pce-message', w.Status),
                  jQuery(document).trigger('afd:emailValidationUpdated', [t]),
                  jQuery(document).trigger(
                    'afd:emailValidationUpdatedFocusOut',
                    [t]
                  ),
                  t.trigger('afd:emailValidationUpdated', [t]),
                  t.trigger('afd:emailValidationUpdatedFocusOut', [t])
                let I = this.$element.data('afd-already-valid')
                I.indexOf(e) < 0 &&
                  (I.push(e), this.$element.data('afd-already-valid', I))
              } else if (o.Result === '-2') {
                this.handleInvalid(this.options.email.invalidEmailMessage),
                  t.data('email-is-afd-valid', !1),
                  t.data('email-pce-message', o.ErrorText),
                  jQuery(document).trigger('afd:emailValidationUpdated', [t]),
                  jQuery(document).trigger(
                    'afd:emailValidationUpdatedFocusOut',
                    [t]
                  ),
                  t.trigger('afd:emailValidationUpdated', [t]),
                  t.trigger('afd:emailValidationUpdatedFocusOut', [t])
                let w = this.$element.data('afd-already-invalid')
                w.indexOf(e) < 0 &&
                  (w.push(e), this.$element.data('afd-already-invalid', w))
              } else
                this.clearValidation(),
                  this.handlePCEError(o.Result, o.ErrorText),
                  t.data('email-is-afd-valid', !1),
                  t.data('email-pce-message', o.Result),
                  jQuery(document).trigger('afd:emailValidationUpdated', [t]),
                  jQuery(document).trigger(
                    'afd:emailValidationUpdatedFocusOut',
                    [t]
                  ),
                  t.trigger('afd:emailValidationUpdated', [t]),
                  t.trigger('afd:emailValidationUpdatedFocusOut', [t])
              jQuery(document).trigger('afd:emailValidationSuccess', [o, t, y]),
                t.trigger('afd:emailValidationSuccess', [o, t, y]),
                this.hideLoadingSpinner(t, this.options.email.loadingSpinner)
            })
            .fail((o) => {
              console.error(o),
                jQuery(document).trigger('afd:emailValidationError', [o]),
                this.hideLoadingSpinner(t, this.options.email.loadingSpinner)
            })
      } else
        t.data('email-is-regex-valid', !1),
          t.data('email-syntax-valid', !1),
          this.handleInvalid(this.options.email.invalidEmailMessage),
          jQuery(document).trigger('afd:emailValidationUpdatedFocusOut', [t]),
          jQuery(document).trigger('afd:emailValidationUpdated', [t]),
          t.trigger('afd:emailValidationUpdated', [t]),
          t.trigger('afd:emailValidationUpdatedFocusOut', [t])
      jQuery(document).trigger('afd:emailValidationUpdated', [t]),
        t.trigger('afd:emailValidationUpdated', [t])
    }
    validateEmail = (t) => {
      let e = {
        data: 'email',
        task: this.options.email.task,
        fields: 'standard',
        email: t,
        afdc: this.options.afdc
      }
      e = jQuery.extend(e, this.options.email.additionalPCEParams)
      let s = this.setupParams(e)
      return jQuery.ajax(s)
    }
  }
  var Fe = (d, t) => {
    let e = {}
    if (
      (t ? (e = t) : typeof afdOptions < 'u' && (e = afdOptions),
      (e = jQuery.extend(!0, {}, G, e)),
      !d.is('input'))
    )
      throw (
        '<' +
        d.prop('tagName').toLowerCase() +
        '> is not a valid tag for `[data-afd-control="email"]`, use <input>'
      )
    let s = new Lt(d, e)
    jQuery(document)
      .off('afd:init.afd')
      .on('afd:init.afd', () => {
        s.init()
      }),
      s.init()
  }
  var $e = ht(Te(), 1),
    At = class extends tt(Q) {
      constructor(t, e) {
        super(t, e), (this.controlType = 'phone')
      }
      init() {
        this.$element.data('phone-is-afd-valid', !1),
          (this.countryControl = jQuery(this.options.phone.countryControl)),
          this.options.phone.countryControl &&
            this.countryControl.length === 0 &&
            console.warn(
              'Country control `' +
                this.options.phone.countryControl +
                '` not found'
            )
        let t = this.$element.val()
        ;(this.iti = (0, $e.default)(this.element, {
          loadUtils: () =>
            import(
              'https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.0/build/js/utils.js'
            ),
          separateDialCode: !0
        })),
          this.iti.setNumber(t || this.options.phone.defaultDialingCode),
          (this.countryData = this.iti.getSelectedCountryData())
        let e = this.eventHandler
        e(this.$element, 'keyup', this.onKeyUp),
          e(this.$element, 'focusout', this.onFocusOut),
          e(this.countryControl, 'change', this.onCountryControlChange),
          e(this.$element, 'countrychange', this.onCountryChange),
          e(this.$element, 'change', this.onChange),
          this.$element.trigger('countrychange')
      }
      onKeyUp = () => {
        let t = this.$element,
          e = this.$element.val()
        this.iti.setNumber(e),
          this.$element.val().startsWith('00') && (e = e.replace('00', '+')),
          this.$element.val(e),
          this.updateDataAttributes(),
          t.data('phone-is-afd-valid', !1),
          this.clearValidation(),
          this.iti.isValidNumber() &&
            this.iti.setNumber(this.iti.getNumber('2')),
          jQuery(document).trigger('afd:phoneValidationUpdated', [t]),
          t.trigger('afd:phoneValidationUpdated', [t])
      }
      onFocusOut = () => {
        typeof this.$element.data('afd-already-valid') > 'u' &&
          this.$element.data('afd-already-valid', []),
          typeof this.$element.data('afd-already-invalid') > 'u' &&
            this.$element.data('afd-already-invalid', [])
        let t = this.$element
        if (!(t.val().length < 1))
          if (this.iti.isValidNumber()) {
            if (
              this.$element
                .data('afd-already-valid')
                .indexOf(this.iti.getNumber()) > -1
            ) {
              this.handleValid(),
                t.data('phone-is-afd-valid', !0),
                jQuery(document).trigger('afd:phoneValidationUpdated', [t]),
                t.trigger('afd:phoneValidationUpdated', [t])
              return
            }
            if (
              this.$element
                .data('afd-already-invalid')
                .indexOf(this.iti.getNumber()) > -1
            ) {
              this.handleInvalid(this.options.phone.invalidPhoneNumberMessage),
                t.data('phone-is-afd-valid', !1),
                jQuery(document).trigger('afd:phoneValidationUpdated', [t]),
                t.trigger('afd:phoneValidationUpdated', [t])
              return
            }
            jQuery(document).trigger('afd:phoneValidationStarted', [t]),
              t.trigger('afd:phoneValidationStarted', [t]),
              this.showLoadingSpinner(t, this.options.phone.loadingSpinner),
              this.validatePhone(this.iti.getNumber(), this.countryData.iso3)
                .done((s, o, u) => {
                  if (s.Result === '1') {
                    this.handleValid(),
                      t.data('phone-is-afd-valid', !0),
                      jQuery(document).trigger('afd:phoneValidationUpdated', [
                        t
                      ]),
                      t.trigger('afd:phoneValidationUpdated', [t])
                    let y = this.$element.data('afd-already-valid')
                    y.indexOf(this.iti.getNumber()) < 0 &&
                      (y.push(this.iti.getNumber()),
                      this.$element.data('afd-already-valid', y))
                  } else if (s.Result === '-2') {
                    this.handleInvalid(
                      this.options.phone.invalidPhoneNumberMessage
                    ),
                      t.data('phone-is-afd-valid', !1),
                      jQuery(document).trigger('afd:phoneValidationUpdated', [
                        t
                      ]),
                      t.trigger('afd:phoneValidationUpdated', [t])
                    let y = this.$element.data('afd-already-invalid')
                    y.indexOf(this.iti.getNumber()) < 0 &&
                      (y.push(this.iti.getNumber()),
                      this.$element.data('afd-already-invalid', y))
                  } else
                    s.Result < 0 &&
                      (this.handlePCEError(s.Result, s.ErrorText),
                      t.data('phone-is-afd-valid', !0),
                      jQuery(document).trigger('afd:phoneValidationUpdated', [
                        t
                      ]),
                      t.trigger('afd:phoneValidationUpdated', [t]))
                  jQuery(document).trigger('afd:phoneValidationSuccess', [
                    s,
                    t,
                    u
                  ]),
                    t.trigger('afd:phoneValidationSuccess', [s, t, u]),
                    this.hideLoadingSpinner(
                      t,
                      this.options.phone.loadingSpinner
                    )
                })
                .fail((s) => {
                  console.error(s),
                    jQuery(document).trigger('afd:phoneValidationError', [s]),
                    t.trigger('afd:phoneValidationError', [s]),
                    this.hideLoadingSpinner(
                      t,
                      this.options.phone.loadingSpinner
                    )
                })
          } else
            this.handleInvalid(this.options.phone.invalidPhoneNumberMessage),
              t.data('phone-is-afd-valid', !1),
              jQuery(document).trigger('afd:phoneValidationUpdated', [
                this.$element
              ]),
              t.trigger('afd:phoneValidationUpdated', [this.$element])
      }
      onCountryChange = () => {
        let t = this.$element,
          e = t.val()
        ;(this.countryData = this.iti.getSelectedCountryData()),
          typeof this.countryData.iso2 < 'u' &&
            (this.countryData.iso3 = this.iso2ToIso3(
              this.countryData.iso2.toUpperCase()
            )),
          typeof this.countryData.dialCode < 'u' &&
            e.startsWith('+') &&
            (e = e.replace('+' + this.countryData.dialCode, '')),
          this.$element.val(e),
          this.updateDataAttributes(),
          jQuery(document).trigger('afd:phoneValidationUpdated', [t]),
          t.trigger('afd:phoneValidationUpdated', [t])
      }
      onCountryControlChange = (t) => {
        let e = this.options.phone.countryControlConverter
          ? this.options.phone.countryControlConverter(t, this.iso2ToIso3)
          : this.formatCountryISO2(t.target.value)
        this.iti.setCountry(e)
      }
      onChange = (t) => {
        this.iti.setNumber(t.target.value)
      }
      formatCountryISO2 = (t) => {
        if ([2, 3].indexOf(t.length) < 0)
          throw 'Value of country field should be either ISO2 or ISo3 format'
        return (
          t.length === 2
            ? (t = t.toLowerCase())
            : (t = this.iso3ToIso2(t).toLowerCase()),
          t
        )
      }
      setCountryDialingCode = (t, e) =>
        t.substr(0, 1) !== '+' && t.substr(0, !0) ? e + t : t
      validatePhone(t, e) {
        let s = this.$element
        jQuery(document).trigger('afd:phoneValidationStarted', this.$element),
          s.trigger('afd:phoneValidationStarted', this.$element)
        let o = this.setupParams({
          phone: t,
          data: 'phone',
          task: 'full',
          fields: 'standard',
          countryiso: e,
          afdc: this.options.afdc
        })
        return jQuery.ajax(o)
      }
      updateDataAttributes = () => {
        let t = this.$element,
          e = this.iti.getNumberType()
        t.data('phone-is-regex-valid', this.iti.isValidNumber()),
          t.data('phone-is-syntax-valid', this.iti.isValidNumber()),
          t.data('phone-syntax-valid', this.iti.isValidNumber()),
          t.data(
            'phone-region-name',
            typeof this.countryData.name < 'u' ? this.countryData.name : ''
          ),
          t.data(
            'phone-region',
            typeof this.countryData.iso2 < 'u'
              ? this.countryData.iso2.toUpperCase()
              : ''
          ),
          t.data(
            'phone-region-iso2',
            typeof this.countryData.iso2 < 'u'
              ? this.countryData.iso2.toUpperCase()
              : ''
          ),
          t.data(
            'phone-region-iso3',
            typeof this.countryData.iso3 < 'u' ? this.countryData.iso3 : ''
          ),
          t.data('phone-number', this.iti.getNumber()),
          t.data('phone-number-e164', this.iti.getNumber()),
          t.data('phone-number-international', this.iti.getNumber(1)),
          t.data('phone-number-national', this.iti.getNumber(2)),
          t.data('phone-number-rfc3966', this.iti.getNumber(3))
        var s = [
          'FIXED_LINE',
          'MOBILE',
          'FIXED_LINE_OR_MOBILE',
          'TOLL_FREE',
          'PREMIUM_RATE',
          'SHARED_COST',
          'VOIP',
          'PERSONAL_NUMBER',
          'PAGER',
          'UAN',
          'VOICEMAIL'
        ]
        t.data('phone-is-mobile', e > -1 ? s[e] === 'MOBILE' : !1),
          t.data('phone-is-landline', e > -1 ? s[e] === 'FIXED_LINE' : !1),
          t.data('phone-number-type', e > -1 ? s[e] : 'UNKNOWN')
      }
    }
  var De = (d, t) => {
    let e = {}
    if (
      (typeof t < 'u' ? (e = t) : typeof afdOptions < 'u' && (e = afdOptions),
      (e = jQuery.extend(!0, {}, G, e)),
      !d.is('input'))
    )
      throw (
        '<' +
        d.prop('tagName').toLowerCase() +
        '> is not a valid tag for `[data-afd-control="phone"]`, use <input>'
      )
    let s = new At(d, e)
    jQuery(document)
      .off('afd:init.afd')
      .on('afd:init.afd', () => {
        s.init()
      }),
      s.init()
  }
  var Y = (d) =>
    class extends d {
      constructor() {
        super(...arguments)
        this.isReverseGeocode = !1
        this.seq = 0
        this.lastSeq = 0
        this.w3w = !1
        this.multiForms = !1
        this.initRequestSequence = () => {
          ;(this.seq = 0), (this.lastSeq = 0)
        }
        this.beforeSend = (e, s, o) => {
          let u = new URLSearchParams(s.url)
          ;(e.lookup = u.get(o)),
            (e.seq = this.seq),
            this.seq++,
            jQuery(document).trigger('afd:pceLookupStarted', [
              e,
              u.get('lookup')
            ])
        }
        this.getUniqueID = () => Math.floor(Math.random() * 9e4) + 1e4
        this.setFields = () => {
          let { options: e, controlType: s } = this,
            o = e[s]?.containers?.toString() || '',
            u =
              this.$element.closest(o).length > 0
                ? this.$element.closest(o)
                : jQuery(document)
          this.$container = u
          let y = e[s]?.containerOnlyContainsControl ?? !1
          ;(this.$typeaheadFieldandLabel = y
            ? u.find('.afd-typeahead-container')
            : u.find('.afd-typeahead-container > label, .afd-typeahead-field')),
            (this.$typeAheadInput = u.find('.afd-typeahead-container input')),
            (this.$resultFields = u.find('[data-afd-result]')),
            (this.$typeaheadContainer = u.find('.afd-typeahead-container')),
            (this.$errorField = u.find('.afd-' + s + '-error'))
          let w =
              e[s]?.manualInputButtonIdentifier ?? '.afd-manual-input-button',
            I =
              e[s]?.manualInputSearchButtonIdentifier ??
              '.afd-manual-input-search-button',
            b = e[s]?.searchAgainButtonIdentifier ?? '.afd-search-again'
          ;(this.$manualInputButton = u.find(w)),
            (this.$manualInputSearchButton = u.find(I)),
            (this.$searchAgainButton = u.find(b)),
            (this.$fieldSets = u.find(e[s]?.fieldSets?.toString() || '')),
            (this.$afdCountryField = u.find('[data-afd-control="country"]'))
          let M = u.find(e.country?.customCountryControl || ''),
            g = this.originalControlType || s
          if (
            ((this.$customCountryField =
              M.length > 0
                ? M.off('change.afd' + g).on(
                    'change.afd' + g,
                    this.onCustomCountryChange
                  )
                : null),
            this.$afdCountryField
              .off('change.afd' + g)
              .on('change.afd' + g, this.onAfdCountryChange),
            (this.multiForms = jQuery(o).length > 0),
            e.country &&
              this.$customCountryField &&
              this.$customCountryField.length === 0)
          )
            throw (
              'Custom country field selector `' +
              e.country.customCountryControl +
              '` supplied, but no matching control found.'
            )
          this.parentSelector = e[s]?.parentClass
            ? this.options[s]?.parentClass?.charAt(0) === '.'
              ? this.options[s]?.parentClass
              : '.' + this.options[s]?.parentClass
            : null
        }
        this.initFields = () => {
          let e = this.controlType
          this.$typeaheadFieldandLabel.show()
          let s = this.options[e]?.fieldSets,
            o = this.getInitialCountry()
          if (this.options[e]?.beforeHideResults) {
            if (
              (this.$manualInputSearchButton.hide(),
              this.hideResultFields(o),
              s.length > 0)
            )
              for (let u = 0; u < s.length; u++) jQuery(s[u]).hide()
          } else if ((this.showResultFields(), s.length > 0))
            for (let u = 0; u < s.length; u++) jQuery(s[u]).show()
        }
        this.addressLookup = (e) => {
          let s = this.controlType,
            o = this.options[s],
            {
              searchTask: u,
              searchField: y,
              postcodeFirst: w,
              extraPCESearchParams: I
            } = o,
            b = {
              format: 'json',
              data: 'address',
              task: u,
              fields: w ? 'list' : 'fflist',
              uniqueid: this.uniqueID,
              allpc: '1',
              ...(I || {})
            }
          if (
            ((this.options[s].listEnv ||
              (this.country === 'USA' && !this.options[s].postcodeFirst)) &&
              (b.listEnv = '1'),
            this.position &&
              ((b.longitude = this.position.coords.longitude),
              (b.latitude = this.position.coords.latitude)),
            u && u.toLowerCase() === 'search')
          ) {
            if (!y) throw 'No search field provided'
            b[y] = e
          } else b.lookup = e
          this.options[s].bankLookup &&
            ((b.data = 'bank'), (b.task = 'fastfind'), (b.clearing = 'all'))
          let M = this.setupParams(b)
          return jQuery.ajax(M)
        }
        this.addressRetrieve = (e) => {
          let s = {
            format: 'json',
            key: e,
            data: 'address',
            task: 'retrieve',
            fields: this.options[this.controlType].retrieveFields
          }
          this.options[this.controlType].flatSubBuild && (s.flatSubBuild = '1'),
            this.options[this.controlType].bankLookup &&
              ((s.data = 'bank'),
              (s.clearing = 'all'),
              (s.task = 'retrieve'),
              (s.fields = 'standard')),
            (this.options[this.controlType].listEnv ||
              (this.country === 'USA' &&
                !this.options[this.controlType].postcodeFirst)) &&
              (s.listEnv = '1'),
            jQuery.extend(
              s,
              this.options[this.controlType].extraPCERetrieveParams
            )
          let o = this.setupParams(s)
          return jQuery.ajax(o)
        }
        this.reverseGeocodeLookup = (e) => {
          let s = this.controlType,
            o = this.setupParams({
              format: 'json',
              data: 'address',
              task: 'nearest',
              fields: this.options[s].postcodeFirst ? 'list' : 'fflist',
              uniqueid: this.uniqueID,
              longitude: e.longitude,
              latitude: e.latitude,
              allpc: '1'
            })
          return jQuery.ajax(o)
        }
        this.handleAddressRetrieve = (e, s) => {
          let o = this.controlType
          typeof e.Item > 'u' ||
            (([this.result] = e.Item),
            jQuery(document).trigger('afd:pceRetrieveComplete', [
              this.result,
              s
            ]),
            this.$element.trigger('afd:pceRetrieveComplete', [this.result, s]),
            this.$manualInputButton.hide(),
            this.options[o].afterClearTypeahead && this.$typeAheadInput.val(''),
            this.options[o].afterHideTypeahead &&
              this.$typeaheadFieldandLabel.hide(),
            this.options[o].afterHideButtonAndFields &&
              (this.$container
                .find('[data-afd-control="reverseGeocodeButton"]')
                .hide(),
              this.$container.find('[data-afd-control="lookupButton"]').hide(),
              this.$container.find('[data-afd-control="lookupField"]').hide()),
            this.options[o].afterHideTypeahead &&
              this.options[o].searchAgain &&
              this.$searchAgainButton.show(),
            this.$fieldSets.show(),
            !(this.$resultFields.length < 1) &&
              (this.$resultFields.removeAttr('data-afd-source'),
              this.$resultFields.each(this.populateResult),
              this.$typeAheadInput.blur()))
        }
        this.populateResult = (e) => {
          let s = jQuery(this.$resultFields[e]),
            o = s.data('afd-result')
          if ((s.val(''), o.toLowerCase() === 'w3w')) {
            let w = this.result.Key.split('///')[1]
            if (
              (s.val(w),
              this.parentSelector && s.closest(this.parentSelector).show(),
              s.show(),
              w && w.length > 0)
            )
              return
          }
          let u = this.options[this.controlType].linkedControl
            ? this.options[this.controlType].linkedControl
            : this.controlType
          if (!u) throw 'linkedControl is not defined'
          if (
            [
              'Region',
              'State',
              'AbbreviatedOptionalCounty',
              'AbbreviatedPostalCounty',
              'AdministrativeCounty',
              'PostalCounty',
              'TraditionalCounty'
            ].indexOf(o) > -1 &&
            s.is('select')
          ) {
            let w = this.options[u].regionAttribute,
              I = this.result[o],
              b = this.options[u].regionMap
                ? this.options[u].regionMap(this.result)
                : I,
              M = s.find(`[${w}="${b}"]`).val() || ''
            s.val(M),
              this.parentSelector && s.closest(this.parentSelector).show(),
              s.show(),
              s.trigger('afd:populateRegionIDComplete')
            return
          }
          if (
            (this.options[u].pushUp
              ? Array.isArray(this.options[u].pushUp)
                ? this.handlePushUp(
                    this.$container,
                    this.options[u].pushUp,
                    o,
                    s
                  )
                : this.handlePushUp(
                    this.$container,
                    ['Property', 'Street', 'Locality'],
                    o,
                    s
                  )
              : this.setResultValue(s, o),
            o.toLowerCase() === 'w3w')
          ) {
            s.val(this.result.Key.split('///')[1]),
              this.parentSelector && s.closest(this.parentSelector).show(),
              s.show()
            return
          }
          !this.options[u].hideEmpties ||
          (s.val()?.length ?? 0) > 0 ||
          s.is('[required]') ||
          (this.options[u].requiredSelector &&
            (s.is(this.options[u].requiredSelector) ||
              (this.parentSelector &&
                s
                  .closest(this.parentSelector)
                  .is(this.options[u].requiredSelector))))
            ? (this.parentSelector && s.closest(this.parentSelector).show(),
              s.show())
            : this.parentSelector
              ? s.closest(this.parentSelector).hide()
              : s.hide(),
            this.$fieldSets.show(),
            s.triggerHandler('keyup'),
            s.triggerHandler('change'),
            jQuery(document).trigger('afd:populateResultsComplete')
        }
        this.setResultValue = (e, s) => {
          if ((e.val(''), s.indexOf(',') > -1)) {
            let o = ''
            s.split(',').forEach((u, y) => {
              let w = o || '',
                I = this.result[u] || ''
              y !== 0 && I && w && (o += ', '), (o += this.result[u])
            }),
              e.val(o)
          } else if (s.indexOf('.') > -1) {
            let o = s.split('.').reduce((u, y) => u && u[y], this.result)
            e.val(o)
          } else e.val(this.result[s] || '')
          e.val()
        }
        this.populateResultsList = () => {
          if (this.results.length === 1) {
            this.selectResult(this.results[0].Key)
            return
          }
          let e =
            this.$resultList.prop('tagName') === 'SELECT' ? 'option' : 'li'
          this.$resultList.empty(),
            e === 'option' &&
              typeof this.$resultList.attr('multiple') > 'u' &&
              this.$resultList.append(
                `<option value="null">${this.options[this.controlType].selectAddressText || 'Select your address'}</option>`
              ),
            this.results.length === 0 &&
              this.$resultList.append(
                `<${e} value="null">${this.options[this.controlType].noResultsText || 'Select your address'}</${e}>`
              )
          for (let s = 0; s < this.results.length; s++) {
            let o = this.results[s]
            this.$resultList.append(`<${e} value="${o.Key}">${o.List}</${e}>`)
          }
          e === 'li' &&
            ((this.$resultListResults = this.$resultList.children('li')),
            this.eventHandler(
              this.$resultListResults,
              'click',
              this.onResultListItemClick
            )),
            this.$resultList.show().closest('.afd-form-control').show(),
            this.$resultList.focus()
        }
        this.onResultListItemClick = (e) => {
          this.selectResult(jQuery(e.target).attr('value') || '')
        }
        this.onKeyDownResult = (e) => {
          let s = e.keyCode ? e.keyCode : e.which
          s === 13 && e.preventDefault(),
            [38, 40].indexOf(s) > -1 && (this.blockChange = !0)
        }
        this.onKeyUpResult = (e) => {
          ;(e.keyCode ? e.keyCode : e.which) === 13 &&
            this.selectResult(e.target.value)
        }
        this.onChangeResult = (e) => {
          this.blockChange || this.selectResult(e.target.value),
            (this.blockChange = !1)
        }
        this.selectResult = (e) => {
          ;(this.options[this.controlType].afterRetrieveHideResultsList ||
            this.isReverseGeocode) &&
            this.hideResultsElement(),
            e === 'null' && this.onAfdManualInputButtonClick(),
            this.addressRetrieve(e)
              .then((s, o, u) => {
                this.handleAddressRetrieve(s, u)
              })
              .catch((s) => {
                throw (
                  (console.error('Error in selectResult:', s),
                  jQuery(document).trigger('afd:error', s),
                  s)
                )
              })
        }
        this.hideResultsElement = () => {
          this.$resultList.closest('.afd-form-control').hide()
        }
        this.hideResultFields = (e) => {
          let s = this.controlType
          ;(!(
            this.options[s].showForCountries.length > 0 ||
            this.options[s].hideForCountries.length > 0
          ) ||
            e === null ||
            (this.options[s].showForCountries.length > 0 &&
              this.options[s].showForCountries.indexOf(e) > -1) ||
            (this.options[s].hideForCountries.length > 0 &&
              this.options[s].hideForCountries.indexOf(e) === -1)) &&
            (this.parentSelector
              ? this.$resultFields.closest(this.parentSelector).hide()
              : this.$resultFields.hide(),
            this.$fieldSets.hide(),
            (this.options?.[s]?.postcodeIsLookup ?? !1) &&
              (this.parentSelector
                ? jQuery('[data-afd-result="Postcode"]')
                    .closest(this.parentSelector)
                    .show()
                : jQuery('[data-afd-result="Postcode"]').show()))
        }
        this.showResultFields = () => {
          this.parentSelector
            ? this.$resultFields.closest(this.parentSelector).show()
            : this.$resultFields.show(),
            this.$fieldSets.show()
        }
        this.onAfdSearchAgainButtonClick = () => {
          let e = this.controlType
          this.$resultFields.val(''),
            this.$searchAgainButton.hide(),
            this.$container
              .find('[data-afd-control="reverseGeocodeButton"]')
              .show(),
            this.isReverseGeocode
              ? this.$button.show()
              : e === 'typeahead'
                ? this.$typeaheadFieldandLabel.show()
                : e === 'lookup' &&
                  (this.$lookupButton.show(),
                  this.$lookupField.show().focus().val(''),
                  this.$resultList.empty()),
            typeof this.$button < 'u' && this.$button.show(),
            this.options[e].beforeHideResults
              ? (this.$manualInputButton.show(),
                this.hideResultFields(this.country),
                this.$fieldSets.hide())
              : (this.$manualInputButton.hide(),
                this.showResultFields(),
                this.$fieldSets.show())
        }
        this.onAfdManualInputButtonClick = () => {
          let e = this.controlType
          if (
            (this.$manualInputButton.hide(),
            this.$manualInputSearchButton.show(),
            e === 'typeahead'
              ? this.$typeaheadFieldandLabel.hide()
              : (this.$lookupButton.hide(),
                this.$lookupField.hide(),
                this.hideResultsElement()),
            this.showResultFields(),
            this.options[e].fieldSets.length > 0)
          )
            for (let s = 0; s < this.options[e].fieldSets.length; s++)
              jQuery(this.options[e].fieldSets[s]).show()
          jQuery(document).trigger('afd:manualInputButtonClicked', [
            this.$el,
            this.$container
          ])
        }
        this.onAfdManualInputSearchButtonClick = () => {
          let e = this.controlType
          e === 'typeahead'
            ? this.$typeaheadFieldandLabel.show()
            : e === 'lookup' &&
              (this.$lookupButton.show(), this.$lookupField.show()),
            this.$manualInputButton.show(),
            this.$manualInputSearchButton.hide(),
            this.hideResultFields(this.country),
            this.$fieldSets.hide()
        }
        this.onCustomCountryChange = (e) => {
          let s = e.target.value
          if (this.options.country.customCountryConverter) {
            if (
              typeof this.options.country.customCountryConverter != 'function'
            )
              throw 'customCountryConverter Must be a function'
            s = this.options.country.customCountryConverter(s)
          }
          this.$element.trigger('afd:customCountryChanged', [s]),
            this.onCountryChanged(s)
        }
        this.onAfdCountryChange = (e, s) => {
          s &&
            (this.$element.trigger('afd:afdCountryChanged', [s]),
            this.onCountryChanged(s))
        }
        this.onCountryChanged = (e) => {
          this.$resultFields.val(''),
            this.$typeAheadInput && this.$typeAheadInput.val(''),
            this.$lookupField && this.$lookupField.val(''),
            this.$resultList && this.$resultList.hide(),
            (this.country = e),
            this.handleHideShowControls(e),
            this.$element.trigger('afd:countryChanged', [e]),
            typeof this.onCountryChangedLocal < 'u' &&
              this.onCountryChangedLocal(e)
        }
        this.handleHideShowControls = (e) => {
          let s = this.controlType
          if (!s) return
          this.$searchAgainButton.hide(), this.$manualInputSearchButton.hide()
          let o,
            u = null
          if (
            (s === 'typeahead'
              ? ((o = this.$container.find(
                  '[data-afd-control="lookupButton"]'
                )),
                (u = 'lookup'))
              : s === 'lookup' &&
                ((o = this.$container.find('[data-afd-control="typeahead"]')),
                (u = 'typeahead')),
            o &&
              u &&
              o.length > 0 &&
              this.options[u].showForCountries.indexOf(e) > -1)
          ) {
            this.hideControls(s)
            return
          }
          this.options[s].hideForCountries.length > 0 &&
            (this.options[s].hideForCountries.indexOf(e) > -1
              ? this.hideControls(s)
              : this.showControls(s)),
            this.options[s].showForCountries.length > 0 &&
              (this.options[s].showForCountries.indexOf(e) > -1 || !e
                ? (this.showControls(s),
                  this.options[s].beforeHideResults
                    ? (this.$manualInputButton.show(),
                      this.hideResultFields(e),
                      this.options[s].notEmptyShowResults &&
                        (this.$container
                          .find('[data-afd-result]:empty')
                          .filter(function () {
                            return !!jQuery(this).val()
                          }).length === 0 ||
                          (this.showResultFields(),
                          this.$manualInputButton.hide())))
                    : (this.$manualInputButton.hide(),
                      this.showResultFields(),
                      this.$fieldSets.show()))
                : (this.hideControls(s), this.showResultFields())),
            this.options[s].hideForCountries.length === 0 &&
              this.options[s].showForCountries.length === 0 &&
              this.showControls(s)
        }
        this.showControls = (e) => {
          this.isReverseGeocode
            ? this.$button.show()
            : e === 'lookup'
              ? (this.$lookupButton.closest('.afd-form-control').show(),
                this.$lookupField.closest('.afd-form-control').show())
              : this.$typeaheadFieldandLabel.show(),
            this.options[e].manualInputButton && this.$manualInputButton.show()
        }
        this.hideControls = (e) => {
          e === 'lookup'
            ? (this.$lookupButton.closest('.afd-form-control').hide(),
              this.$lookupField.closest('.afd-form-control').hide(),
              this.$resultList.closest('.afd-form-control').hide())
            : this.$typeaheadFieldandLabel.hide(),
            this.$manualInputButton.hide()
        }
        this.getInitialCountry = () => {
          let e = null
          if (this.$customCountryField) {
            if (
              ((e = this.$customCountryField.val()),
              this.options.country.customCountryConverter)
            ) {
              if (
                typeof this.options.country.customCountryConverter != 'function'
              )
                throw 'customCountryConverter Must be a function'
              e = this.options.country.customCountryConverter(e)
            }
            this.handleHideShowControls(e)
          } else
            this.$afdCountryField.length
              ? (this.$afdCountryField[0].tagName === 'SELECT'
                  ? (e = this.$afdCountryField.val())
                  : (e = this.$afdCountryField.data('selected-country')),
                this.handleHideShowControls(e))
              : this.options.country.defaultCountry
                ? ((e = this.options.country.defaultCountry),
                  this.handleHideShowControls(
                    this.options.country.defaultCountry
                  ))
                : this.options.defaultCountry
                  ? ((e = this.options.defaultCountry),
                    this.handleHideShowControls(this.options.defaultCountry))
                  : this.$manualInputSearchButton.show()
          return e && (this.country = e), e
        }
        this.handlePushUp = (e, s, o, u) => {
          let y = []
          e.find('[data-afd-source]').each(function () {
            let n = (jQuery(this).attr('data-afd-source') || '').split(',')
            for (let a = 0; a < n.length; a++) y.push(n[a])
          })
          let w = !1,
            I = o.split(',')
          for (let i = 0; i < I.length && !w; i++)
            if (s.includes(I[i].trim())) {
              w = !0
              break
            }
          if (!w) {
            this.setResultValue(u, o)
            return
          }
          let b = -1,
            M = !1,
            g = []
          for (let i = 0; i < I.length; i++)
            (b = s.indexOf(I[i].trim())),
              b != -1 &&
                (this.result[s[b]]?.length ?? 0) > 0 &&
                (y.includes(s[b]) || (y.push(s[b]), g.push(s[b]), (M = !0)))
          if (!M) {
            for (let i = b + 1; i < s.length; i++)
              if (this.result[s[i]] && !y.includes(s[i])) {
                y.push(s[i]), g.push(s[i]), (M = !0)
                break
              }
          }
          g.length > 0 &&
            (this.setResultValue(u, g.toString()),
            u.attr('data-afd-source', g.toString()))
        }
      }
    }
  ;(function (d) {
    'use strict'
    window.Typeahead = { version: '2.10.6' }
    var t = {
        input: null,
        minLength: 2,
        maxLength: !1,
        maxItem: 8,
        dynamic: !1,
        delay: 300,
        order: null,
        offset: !1,
        hint: !1,
        accent: !1,
        highlight: !0,
        multiselect: null,
        group: !1,
        groupOrder: null,
        maxItemPerGroup: null,
        dropdownFilter: !1,
        dynamicFilter: null,
        backdrop: !1,
        backdropOnFocus: !1,
        cache: !1,
        ttl: 36e5,
        compression: !1,
        searchOnFocus: !1,
        blurOnTab: !0,
        resultContainer: null,
        generateOnLoad: null,
        mustSelectItem: !1,
        href: null,
        display: ['display'],
        template: null,
        templateValue: null,
        groupTemplate: null,
        correlativeTemplate: !1,
        emptyTemplate: !1,
        cancelButton: !0,
        loadingAnimation: !0,
        filter: !0,
        matcher: null,
        source: null,
        abortAjax: !0,
        callback: {
          onInit: null,
          onReady: null,
          onShowLayout: null,
          onHideLayout: null,
          onSearch: null,
          onResult: null,
          onLayoutBuiltBefore: null,
          onLayoutBuiltAfter: null,
          onNavigateBefore: null,
          onNavigateAfter: null,
          onEnter: null,
          onLeave: null,
          onClickBefore: null,
          onClickAfter: null,
          onDropdownFilter: null,
          onSendRequest: null,
          onReceiveRequest: null,
          onPopulateSource: null,
          onCacheSave: null,
          onSubmit: null,
          onCancel: null
        },
        selector: {
          container: 'typeahead__container',
          result: 'typeahead__result',
          list: 'typeahead__list',
          group: 'typeahead__group',
          item: 'typeahead__item',
          empty: 'typeahead__empty',
          display: 'typeahead__display',
          query: 'typeahead__query',
          filter: 'typeahead__filter',
          filterButton: 'typeahead__filter-button',
          dropdown: 'typeahead__dropdown',
          dropdownItem: 'typeahead__dropdown-item',
          labelContainer: 'typeahead__label-container',
          label: 'typeahead__label',
          button: 'typeahead__button',
          backdrop: 'typeahead__backdrop',
          hint: 'typeahead__hint',
          cancelButton: 'typeahead__cancel-button'
        },
        debug: !1
      },
      e = '.typeahead',
      s = {
        from: '\xE3\xE0\xE1\xE4\xE2\u1EBD\xE8\xE9\xEB\xEA\xEC\xED\xEF\xEE\xF5\xF2\xF3\xF6\xF4\xF9\xFA\xFC\xFB\xF1\xE7',
        to: 'aaaaaeeeeeiiiiooooouuuunc'
      },
      o = ~window.navigator.appVersion.indexOf('MSIE 9.'),
      u = ~window.navigator.appVersion.indexOf('MSIE 10'),
      y = ~window.navigator.userAgent.indexOf('Trident')
        ? ~window.navigator.userAgent.indexOf('rv:11')
        : !1,
      w = 0,
      I = 0,
      b = function (i, n) {
        ;(this.rawQuery = i.val() || ''),
          (this.query = i.val() || ''),
          (this.selector = i[0].selector),
          (this.deferred = null),
          (this.tmpSource = {}),
          (this.source = {}),
          (this.dynamicGroups = []),
          (this.hasDynamicGroups = !1),
          (this.generatedGroupCount = 0),
          (this.groupBy = 'group'),
          (this.groups = []),
          (this.searchGroups = []),
          (this.generateGroups = []),
          (this.requestGroups = []),
          (this.result = []),
          (this.tmpResult = {}),
          (this.groupTemplate = ''),
          (this.resultHtml = null),
          (this.resultCount = 0),
          (this.resultCountPerGroup = {}),
          (this.options = n),
          (this.node = i),
          (this.namespace =
            '.' + this.helper.slugify.call(this, this.selector) + e),
          (this.isContentEditable =
            typeof this.node.attr('contenteditable') < 'u' &&
            this.node.attr('contenteditable') !== 'false'),
          (this.container = null),
          (this.resultContainer = null),
          (this.item = null),
          (this.items = null),
          (this.comparedItems = null),
          (this.xhr = {}),
          (this.hintIndex = null),
          (this.filters = { dropdown: {}, dynamic: {} }),
          (this.dropdownFilter = { static: [], dynamic: [] }),
          (this.dropdownFilterAll = null),
          (this.isDropdownEvent = !1),
          (this.requests = {}),
          (this.backdrop = {}),
          (this.hint = {}),
          (this.label = {}),
          (this.hasDragged = !1),
          (this.focusOnly = !1),
          this.displayEmptyTemplate,
          (this._lastSeq = 0),
          this.__construct()
      }
    ;(b.prototype = {
      _validateCacheMethod: function (i) {
        var n = ['localStorage', 'sessionStorage'],
          a
        if (i === !0) i = 'localStorage'
        else if (typeof i == 'string' && !~n.indexOf(i))
          return (
            this.options.debug &&
              (g.log({
                node: this.selector,
                function: 'extendOptions()',
                message:
                  'Invalid options.cache, possible options are "localStorage" or "sessionStorage"'
              }),
              g.print()),
            !1
          )
        a = typeof window[i] < 'u'
        try {
          window[i].setItem('typeahead', 'typeahead'),
            window[i].removeItem('typeahead')
        } catch {
          a = !1
        }
        return (a && i) || !1
      },
      extendOptions: function () {
        if (
          ((this.options.cache = this._validateCacheMethod(this.options.cache)),
          this.options.compression &&
            (typeof LZString != 'object' || !this.options.cache) &&
            (this.options.debug &&
              (g.log({
                node: this.selector,
                function: 'extendOptions()',
                message:
                  'Missing LZString Library or options.cache, no compression will occur.'
              }),
              g.print()),
            (this.options.compression = !1)),
          (!this.options.maxLength || isNaN(this.options.maxLength)) &&
            (this.options.maxLength = 1 / 0),
          typeof this.options.maxItem < 'u' &&
            ~[0, !1].indexOf(this.options.maxItem) &&
            (this.options.maxItem = 1 / 0),
          this.options.maxItemPerGroup &&
            !/^\d+$/.test(this.options.maxItemPerGroup) &&
            (this.options.maxItemPerGroup = null),
          this.options.display &&
            !Array.isArray(this.options.display) &&
            (this.options.display = [this.options.display]),
          this.options.multiselect &&
            ((this.items = []),
            (this.comparedItems = []),
            typeof this.options.multiselect.matchOn == 'string' &&
              (this.options.multiselect.matchOn = [
                this.options.multiselect.matchOn
              ])),
          this.options.group &&
            (Array.isArray(this.options.group)
              ? this.options.debug &&
                (g.log({
                  node: this.selector,
                  function: 'extendOptions()',
                  message:
                    'options.group must be a boolean|string|object as of 2.5.0'
                }),
                g.print())
              : (typeof this.options.group == 'string'
                  ? (this.options.group = { key: this.options.group })
                  : typeof this.options.group == 'boolean' &&
                    (this.options.group = { key: 'group' }),
                (this.options.group.key = this.options.group.key || 'group'))),
          this.options.highlight &&
            !~['any', !0].indexOf(this.options.highlight) &&
            (this.options.highlight = !1),
          this.options.dropdownFilter &&
            this.options.dropdownFilter instanceof Object)
        ) {
          Array.isArray(this.options.dropdownFilter) ||
            (this.options.dropdownFilter = [this.options.dropdownFilter])
          for (var i = 0, n = this.options.dropdownFilter.length; i < n; ++i)
            this.dropdownFilter[
              this.options.dropdownFilter[i].value ? 'static' : 'dynamic'
            ].push(this.options.dropdownFilter[i])
        }
        this.options.dynamicFilter &&
          !Array.isArray(this.options.dynamicFilter) &&
          (this.options.dynamicFilter = [this.options.dynamicFilter]),
          this.options.accent &&
            (typeof this.options.accent == 'object'
              ? this.options.accent.from &&
                this.options.accent.to &&
                this.options.accent.from.length !==
                  this.options.accent.to.length &&
                this.options.debug &&
                (g.log({
                  node: this.selector,
                  function: 'extendOptions()',
                  message:
                    'Invalid "options.accent", from and to must be defined and same length.'
                }),
                g.print())
              : (this.options.accent = s)),
          this.options.groupTemplate &&
            (this.groupTemplate = this.options.groupTemplate),
          this.options.resultContainer &&
            (typeof this.options.resultContainer == 'string' &&
              (this.options.resultContainer = jQuery(
                this.options.resultContainer
              )),
            !(this.options.resultContainer instanceof d) ||
            !this.options.resultContainer[0]
              ? this.options.debug &&
                (g.log({
                  node: this.selector,
                  function: 'extendOptions()',
                  message:
                    'Invalid jQuery selector or jQuery Object for "options.resultContainer".'
                }),
                g.print())
              : (this.resultContainer = this.options.resultContainer)),
          this.options.group &&
            this.options.group.key &&
            (this.groupBy = this.options.group.key),
          this.options.callback &&
            this.options.callback.onClick &&
            ((this.options.callback.onClickBefore =
              this.options.callback.onClick),
            delete this.options.callback.onClick),
          this.options.callback &&
            this.options.callback.onNavigate &&
            ((this.options.callback.onNavigateBefore =
              this.options.callback.onNavigate),
            delete this.options.callback.onNavigate),
          (this.options = jQuery.extend(!0, {}, t, this.options))
      },
      unifySourceFormat: function () {
        ;(this.dynamicGroups = []),
          Array.isArray(this.options.source) &&
            (this.options.source = { group: { data: this.options.source } }),
          typeof this.options.source == 'string' &&
            (this.options.source = {
              group: { ajax: { url: this.options.source } }
            }),
          this.options.source.ajax &&
            (this.options.source = {
              group: { ajax: this.options.source.ajax }
            }),
          (this.options.source.url || this.options.source.data) &&
            (this.options.source = { group: this.options.source })
        var i, n, a
        for (i in this.options.source)
          if (this.options.source.hasOwnProperty(i)) {
            if (
              ((n = this.options.source[i]),
              typeof n == 'string' && (n = { ajax: { url: n } }),
              (a = n.url || n.ajax),
              Array.isArray(a)
                ? ((n.ajax = typeof a[0] == 'string' ? { url: a[0] } : a[0]),
                  (n.ajax.path = n.ajax.path || a[1] || null),
                  delete n.url)
                : (typeof n.url == 'object'
                    ? (n.ajax = n.url)
                    : typeof n.url == 'string' && (n.ajax = { url: n.url }),
                  delete n.url),
              !n.data && !n.ajax)
            )
              return (
                this.options.debug &&
                  (g.log({
                    node: this.selector,
                    function: 'unifySourceFormat()',
                    arguments: JSON.stringify(this.options.source),
                    message:
                      'Undefined "options.source.' +
                      i +
                      '.[data|ajax]" is Missing - Typeahead dropped'
                  }),
                  g.print()),
                !1
              )
            n.display && !Array.isArray(n.display) && (n.display = [n.display]),
              (n.minLength =
                typeof n.minLength == 'number'
                  ? n.minLength
                  : this.options.minLength),
              (n.maxLength =
                typeof n.maxLength == 'number'
                  ? n.maxLength
                  : this.options.maxLength),
              (n.dynamic =
                typeof n.dynamic == 'boolean' || this.options.dynamic),
              n.minLength > n.maxLength && (n.minLength = n.maxLength),
              (this.options.source[i] = n),
              this.options.source[i].dynamic && this.dynamicGroups.push(i),
              (n.cache =
                typeof n.cache < 'u'
                  ? this._validateCacheMethod(n.cache)
                  : this.options.cache),
              n.compression &&
                (typeof LZString != 'object' || !n.cache) &&
                (this.options.debug &&
                  (g.log({
                    node: this.selector,
                    function: 'unifySourceFormat()',
                    message:
                      'Missing LZString Library or group.cache, no compression will occur on group: ' +
                      i
                  }),
                  g.print()),
                (n.compression = !1))
          }
        return (
          (this.hasDynamicGroups =
            this.options.dynamic || !!this.dynamicGroups.length),
          !0
        )
      },
      init: function () {
        ;(this._lastSeq = 0),
          this.helper.executeCallback.call(this, this.options.callback.onInit, [
            this.node
          ]),
          (this.container = this.node.closest(
            '.' + this.options.selector.container
          )),
          this.options.debug &&
            (g.log({
              node: this.selector,
              function: 'init()',
              message: 'OK - Typeahead activated on ' + this.selector
            }),
            g.print())
      },
      delegateEvents: function () {
        var i = this,
          n = [
            'focus' + this.namespace,
            'input' + this.namespace,
            'propertychange' + this.namespace,
            'keydown' + this.namespace,
            'keyup' + this.namespace,
            'search' + this.namespace,
            'generate' + this.namespace
          ]
        jQuery('html')
          .on('touchmove', function () {
            i.hasDragged = !0
          })
          .on('touchstart', function () {
            i.hasDragged = !1
          }),
          this.node
            .closest('form')
            .on('submit', function (m) {
              if (i.options.mustSelectItem && i.helper.isEmpty(i.item)) {
                m.preventDefault()
                return
              }
              if (
                (i.options.backdropOnFocus || i.hideLayout(),
                i.options.callback.onSubmit)
              )
                return i.helper.executeCallback.call(
                  i,
                  i.options.callback.onSubmit,
                  [i.node, this, i.item || i.items, m]
                )
            })
            .on('reset', function () {
              setTimeout(function () {
                i.node.trigger('input' + i.namespace), i.hideLayout()
              })
            })
        var a = !1
        if (this.node.attr('placeholder') && (u || y)) {
          var f = !0
          this.node.on('focusin focusout', function () {
            f = !!(!this.value && this.placeholder)
          }),
            this.node.on('input', function (m) {
              f && (m.stopImmediatePropagation(), (f = !1))
            })
        }
        this.node.off(this.namespace).on(n.join(' '), function (m, c) {
          switch (m.type) {
            case 'generate':
              i.generateSource(Object.keys(i.options.source))
              break
            case 'focus':
              if (i.focusOnly) {
                i.focusOnly = !1
                break
              }
              i.options.backdropOnFocus &&
                (i.buildBackdropLayout(), i.showLayout()),
                i.options.searchOnFocus &&
                  !i.item &&
                  ((i.deferred = jQuery.Deferred()),
                  i.assignQuery(),
                  i.generateSource())
              break
            case 'keydown':
              m.keyCode === 8 &&
              i.options.multiselect &&
              i.options.multiselect.cancelOnBackspace &&
              i.query === '' &&
              i.items.length
                ? i.cancelMultiselectItem(i.items.length - 1, null, m)
                : m.keyCode &&
                  ~[9, 13, 27, 38, 39, 40].indexOf(m.keyCode) &&
                  ((a = !0), i.navigate(m))
              break
            case 'keyup':
              o &&
                i.node[0].value.replace(/^\s+/, '').toString().length <
                  i.query.length &&
                i.node.trigger('input' + i.namespace)
              break
            case 'propertychange':
              if (a) {
                a = !1
                break
              }
            case 'input':
              ;(i.deferred = jQuery.Deferred()),
                i.assignQuery(),
                i.rawQuery === '' &&
                  i.query === '' &&
                  ((m.originalEvent = c || {}),
                  i.helper.executeCallback.call(
                    i,
                    i.options.callback.onCancel,
                    [i.node, i.item, m]
                  ),
                  (i.item = null)),
                i.options.cancelButton && i.toggleCancelButtonVisibility(),
                i.options.hint &&
                  i.hint.container &&
                  i.hint.container.val() !== '' &&
                  i.hint.container.val().indexOf(i.rawQuery) !== 0 &&
                  (i.hint.container.val(''),
                  i.isContentEditable && i.hint.container.text('')),
                i.hasDynamicGroups
                  ? i.helper.typeWatch(function () {
                      i.generateSource()
                    }, i.options.delay)
                  : i.generateSource()
              break
            case 'search':
              i.searchResult(),
                i.buildLayout(),
                i.result.length ||
                (i.searchGroups.length && i.displayEmptyTemplate)
                  ? i.showLayout()
                  : i.hideLayout(),
                i.deferred && i.deferred.resolve()
              break
          }
          return i.deferred && i.deferred.promise()
        }),
          this.options.generateOnLoad &&
            this.node.trigger('generate' + this.namespace)
      },
      assignQuery: function () {
        this.isContentEditable
          ? (this.rawQuery = this.node.text())
          : (this.rawQuery = this.node.val().toString()),
          (this.rawQuery = this.rawQuery.replace(/^\s+/, '')),
          this.rawQuery !== this.query && (this.query = this.rawQuery)
      },
      filterGenerateSource: function () {
        if (
          ((this.searchGroups = []),
          (this.generateGroups = []),
          !(this.focusOnly && !this.options.multiselect))
        ) {
          for (var i in this.options.source)
            if (
              this.options.source.hasOwnProperty(i) &&
              this.query.length >= this.options.source[i].minLength &&
              this.query.length <= this.options.source[i].maxLength
            ) {
              if (
                (this.filters.dropdown &&
                  this.filters.dropdown.key === 'group' &&
                  this.filters.dropdown.value !== i) ||
                (this.searchGroups.push(i),
                !this.options.source[i].dynamic && this.source[i])
              )
                continue
              this.generateGroups.push(i)
            }
        }
      },
      generateSource: function (i) {
        if (
          (this.filterGenerateSource(),
          (this.generateGroups = ['lookup']),
          Array.isArray(i) && i.length)
        )
          this.generateGroups = i
        else if (!this.generateGroups.length) {
          this.node.trigger('search' + this.namespace)
          return
        }
        if (
          ((this.requestGroups = []),
          (this.generatedGroupCount = 0),
          this.options.loadingAnimation && this.container.addClass('loading'),
          !this.helper.isEmpty(this.xhr))
        ) {
          for (var n in this.xhr)
            this.xhr.hasOwnProperty(n) &&
              this.options.abortAjax &&
              this.xhr[n].abort()
          this.xhr = {}
        }
        for (
          var a = this,
            f,
            m,
            c,
            v,
            S,
            L,
            E,
            n = 0,
            R = this.generateGroups.length;
          n < R;
          ++n
        ) {
          if (
            ((f = this.generateGroups[n]),
            (c = this.options.source[f]),
            (v = c.cache),
            (S = c.compression),
            v &&
              ((L = window[v].getItem('TYPEAHEAD_' + this.selector + ':' + f)),
              L))
          ) {
            S && (L = LZString.decompressFromUTF16(L)), (E = !1)
            try {
              ;(L = JSON.parse(L + '')),
                L.data && L.ttl > new Date().getTime()
                  ? (this.populateSource(L.data, f),
                    (E = !0),
                    this.options.debug &&
                      (g.log({
                        node: this.selector,
                        function: 'generateSource()',
                        message: 'Source for group "' + f + '" found in ' + v
                      }),
                      g.print()))
                  : window[v].removeItem('TYPEAHEAD_' + this.selector + ':' + f)
            } catch {}
            if (E) continue
          }
          if (c.data && !c.ajax) {
            typeof c.data == 'function'
              ? ((m = c.data.call(this)),
                Array.isArray(m)
                  ? a.populateSource(m, f)
                  : typeof m.promise == 'function' &&
                    (function (T) {
                      jQuery.when(m).then(function (F) {
                        F && Array.isArray(F) && a.populateSource(F, T)
                      })
                    })(f))
              : this.populateSource(jQuery.extend(!0, [], c.data), f)
            continue
          }
          c.ajax &&
            (this.requests[f] ||
              (this.requests[f] = this.generateRequestObject(f)),
            this.requestGroups.push(f))
        }
        return (
          this.requestGroups.length && this.handleRequests(),
          !!this.generateGroups.length
        )
      },
      generateRequestObject: function (i) {
        var n = this,
          a = this.options.source[i],
          f = {
            request: {
              url: a.ajax.url || null,
              dataType: 'json',
              beforeSend: function (c, v) {
                ;(n.xhr[i] = c), n.options.abortAjax || ((c.seq = w), w++)
                var S = n.requests[i].callback.beforeSend || a.ajax.beforeSend
                typeof S == 'function' && S.apply(null, arguments)
              }
            },
            callback: {
              beforeSend: null,
              done: null,
              fail: null,
              then: null,
              always: null
            },
            extra: { path: a.ajax.path || null, group: i },
            validForGroup: [i]
          }
        if (
          typeof a.ajax != 'function' &&
          (a.ajax instanceof Object && (f = this.extendXhrObject(f, a.ajax)),
          Object.keys(this.options.source).length > 1)
        )
          for (var m in this.requests)
            this.requests.hasOwnProperty(m) &&
              (this.requests[m].isDuplicated ||
                (f.request.url &&
                  f.request.url === this.requests[m].request.url &&
                  (this.requests[m].validForGroup.push(i),
                  (f.isDuplicated = !0),
                  delete f.validForGroup)))
        return f
      },
      extendXhrObject: function (i, n) {
        return (
          typeof n.callback == 'object' &&
            ((i.callback = n.callback), delete n.callback),
          typeof n.beforeSend == 'function' &&
            ((i.callback.beforeSend = n.beforeSend), delete n.beforeSend),
          (i.request = jQuery.extend(!0, i.request, n)),
          i.request.dataType.toLowerCase() === 'jsonp' &&
            !i.request.jsonpCallback &&
            (i.request.jsonpCallback = 'callback_' + i.extra.group),
          i
        )
      },
      handleRequests: function () {
        var i = this,
          n,
          a = this.requestGroups.length
        if (
          this.helper.executeCallback.call(
            this,
            this.options.callback.onSendRequest,
            [this.node, this.query]
          ) !== !1
        )
          for (var f = 0, m = this.requestGroups.length; f < m; ++f)
            (n = this.requestGroups[f]),
              !this.requests[n].isDuplicated &&
                (function (c, v) {
                  if (typeof i.options.source[c].ajax == 'function') {
                    var S = i.options.source[c].ajax.call(i, i.query)
                    if (
                      ((v = i.extendXhrObject(
                        i.generateRequestObject(c),
                        typeof S == 'object' ? S : {}
                      )),
                      typeof v.request != 'object' || !v.request.url)
                    ) {
                      i.options.debug &&
                        (g.log({
                          node: i.selector,
                          function: 'handleRequests',
                          message:
                            'Source function must return an object containing ".url" key for group "' +
                            c +
                            '"'
                        }),
                        g.print()),
                        i.populateSource([], c)
                      return
                    }
                    i.requests[c] = v
                  }
                  var L,
                    E = !1,
                    R = {}
                  if (
                    (~v.request.url.indexOf('{{query}}') &&
                      (E || ((v = jQuery.extend(!0, {}, v)), (E = !0)),
                      (v.request.url = v.request.url.replace(
                        '{{query}}',
                        encodeURIComponent(i.query)
                      ))),
                    v.request.data)
                  ) {
                    for (var P in v.request.data)
                      if (
                        v.request.data.hasOwnProperty(P) &&
                        ~String(v.request.data[P]).indexOf('{{query}}')
                      ) {
                        E || ((v = jQuery.extend(!0, {}, v)), (E = !0)),
                          (v.request.data[P] = v.request.data[P].replace(
                            '{{query}}',
                            i.query
                          ))
                        break
                      }
                  }
                  jQuery
                    .ajax(v.request)
                    .done(function (T, F, _) {
                      for (var O, N = 0, x = v.validForGroup.length; N < x; N++)
                        (O = v.validForGroup[N]),
                          (L = i.requests[O]),
                          typeof L.callback.done == 'function' &&
                            ((R[O] = L.callback.done.call(i, T, F, _)),
                            (!Array.isArray(R[O]) || typeof R[O] != 'object') &&
                              i.options.debug &&
                              (g.log({
                                node: i.selector,
                                function: 'Ajax.callback.done()',
                                message:
                                  'Invalid returned data has to be an Array'
                              }),
                              g.print()))
                    })
                    .fail(function (T, F, _) {
                      for (var O = 0, N = v.validForGroup.length; O < N; O++)
                        (L = i.requests[v.validForGroup[O]]),
                          L.callback.fail instanceof Function &&
                            L.callback.fail.call(i, T, F, _)
                      i.options.debug &&
                        (g.log({
                          node: i.selector,
                          function: 'Ajax.callback.fail()',
                          arguments: JSON.stringify(v.request),
                          message: F
                        }),
                        console.log(_),
                        g.print())
                    })
                    .always(function (T, F, _) {
                      for (
                        var O, N = 0, x = v.validForGroup.length;
                        N < x;
                        N++
                      ) {
                        if (
                          ((O = v.validForGroup[N]),
                          (L = i.requests[O]),
                          L.callback.always instanceof Function &&
                            L.callback.always.call(i, T, F, _),
                          F === 'abort')
                        )
                          return
                        if (!i.options.abortAjax) {
                          if (_.seq < i._lastSeq) return
                          i._lastSeq = _.seq
                        }
                        i.populateSource(
                          (T !== null &&
                            typeof T.promise == 'function' &&
                            []) ||
                            R[O] ||
                            T,
                          L.extra.group,
                          L.extra.path || L.request.path
                        ),
                          (a -= 1),
                          a === 0 &&
                            i.helper.executeCallback.call(
                              i,
                              i.options.callback.onReceiveRequest,
                              [i.node, i.query, T]
                            )
                      }
                    })
                    .then(function (T, F) {
                      for (var _ = 0, O = v.validForGroup.length; _ < O; _++)
                        (L = i.requests[v.validForGroup[_]]),
                          L.callback.then instanceof Function &&
                            L.callback.then.call(i, T, F)
                    })
                })(n, this.requests[n])
      },
      populateSource: function (i, n, a) {
        var f = this,
          m = this.options.source[n],
          c = m.ajax && m.data,
          v = i
        a &&
          typeof a == 'string' &&
          (i = this.helper.namespace.call(this, a, i)),
          typeof i > 'u' &&
            this.options.debug &&
            (g.log({
              node: this.selector,
              function: 'populateSource()',
              arguments: a,
              message: 'Invalid data path.'
            }),
            g.print()),
          Array.isArray(i) ||
            (this.options.debug &&
              (g.log({
                node: this.selector,
                function: 'populateSource()',
                arguments: JSON.stringify({ group: n }),
                message: 'Invalid data type, must be Array type.'
              }),
              g.print()),
            (i = [])),
          c &&
            (typeof c == 'function' && (c = c()),
            Array.isArray(c)
              ? (i = i.concat(c))
              : this.options.debug &&
                (g.log({
                  node: this.selector,
                  function: 'populateSource()',
                  arguments: JSON.stringify(c),
                  message:
                    'WARNING - this.options.source.' +
                    n +
                    '.data Must be an Array or a function that returns an Array.'
                }),
                g.print()))
        for (
          var S,
            L = m.display
              ? m.display[0] === 'compiled'
                ? m.display[1]
                : m.display[0]
              : this.options.display[0] === 'compiled'
                ? this.options.display[1]
                : this.options.display[0],
            E = 0,
            R = i.length;
          E < R;
          E++
        ) {
          if (i[E] === null || typeof i[E] == 'boolean') {
            this.options.debug &&
              (g.log({
                node: this.selector,
                function: 'populateSource()',
                message:
                  'WARNING - NULL/BOOLEAN value inside ' +
                  n +
                  '! The data was skipped.'
              }),
              g.print())
            continue
          }
          typeof i[E] == 'string' && ((S = {}), (S[L] = i[E]), (i[E] = S)),
            (i[E].group = n)
        }
        if (!this.hasDynamicGroups && this.dropdownFilter.dynamic.length)
          for (var P, T, F = {}, E = 0, R = i.length; E < R; E++)
            for (var _ = 0, O = this.dropdownFilter.dynamic.length; _ < O; _++)
              (P = this.dropdownFilter.dynamic[_].key),
                (T = i[E][P]),
                T &&
                  (this.dropdownFilter.dynamic[_].value ||
                    (this.dropdownFilter.dynamic[_].value = []),
                  F[P] || (F[P] = []),
                  ~F[P].indexOf(T.toLowerCase()) ||
                    (F[P].push(T.toLowerCase()),
                    this.dropdownFilter.dynamic[_].value.push(T)))
        if (this.options.correlativeTemplate) {
          var N = m.template || this.options.template,
            x = ''
          if ((typeof N == 'function' && (N = N.call(this, '', {})), !N))
            this.options.debug &&
              (g.log({
                node: this.selector,
                function: 'populateSource()',
                arguments: String(n),
                message:
                  'WARNING - this.options.correlativeTemplate is enabled but no template was found.'
              }),
              g.print())
          else {
            if (Array.isArray(this.options.correlativeTemplate))
              for (
                var E = 0, R = this.options.correlativeTemplate.length;
                E < R;
                E++
              )
                x += '{{' + this.options.correlativeTemplate[E] + '}} '
            else
              x = N.replace(/<.+?>/g, ' ')
                .replace(/\s{2,}/, ' ')
                .trim()
            for (var E = 0, R = i.length; E < R; E++)
              i[E].compiled = jQuery('<textarea />')
                .html(
                  x
                    .replace(/\{\{([\w\-\.]+)(?:\|(\w+))?}}/g, function (k, D) {
                      return f.helper.namespace.call(f, D, i[E], 'get', '')
                    })
                    .trim()
                )
                .text()
            m.display
              ? ~m.display.indexOf('compiled') || m.display.unshift('compiled')
              : ~this.options.display.indexOf('compiled') ||
                this.options.display.unshift('compiled')
          }
        }
        this.options.callback.onPopulateSource &&
          ((i = this.helper.executeCallback.call(
            this,
            this.options.callback.onPopulateSource,
            [this.node, i, n, a, v, this.query]
          )),
          this.options.debug &&
            (!i || !Array.isArray(i)) &&
            (g.log({
              node: this.selector,
              function: 'callback.populateSource()',
              message:
                'callback.onPopulateSource must return the "data" parameter'
            }),
            g.print())),
          (this.tmpSource[n] = (Array.isArray(i) && i) || [])
        var W = this.options.source[n].cache,
          l = this.options.source[n].compression,
          r = this.options.source[n].ttl || this.options.ttl
        if (W && !window[W].getItem('TYPEAHEAD_' + this.selector + ':' + n)) {
          this.options.callback.onCacheSave &&
            ((i = this.helper.executeCallback.call(
              this,
              this.options.callback.onCacheSave,
              [this.node, i, n, a]
            )),
            this.options.debug &&
              (!i || !Array.isArray(i)) &&
              (g.log({
                node: this.selector,
                function: 'callback.populateSource()',
                message: 'callback.onCacheSave must return the "data" parameter'
              }),
              g.print()))
          var h = JSON.stringify({ data: i, ttl: new Date().getTime() + r })
          l && (h = LZString.compressToUTF16(h)),
            window[W].setItem('TYPEAHEAD_' + this.selector + ':' + n, h)
        }
        this.incrementGeneratedGroup()
      },
      incrementGeneratedGroup: function () {
        this.generatedGroupCount++,
          this.options.abortAjax ||
            (this.generatedGroupCount, this.generateGroups.length),
          (this.xhr = {})
        for (var i = 0, n = this.generateGroups.length; i < n; i++)
          this.source[this.generateGroups[i]] =
            this.tmpSource[this.generateGroups[i]]
        this.hasDynamicGroups || this.buildDropdownItemLayout('dynamic'),
          this.options.loadingAnimation &&
            this.container.removeClass('loading'),
          this.node.trigger('search' + this.namespace)
      },
      navigate: function (i) {
        if (
          (this.helper.executeCallback.call(
            this,
            this.options.callback.onNavigateBefore,
            [this.node, this.query, i]
          ),
          i.keyCode === 27)
        ) {
          i.preventDefault(),
            this.query.length
              ? (this.resetInput(),
                this.node.trigger('input' + this.namespace, [i]))
              : (this.node.blur(), this.hideLayout())
          return
        }
        if (this.result.length) {
          var n = this.resultContainer
              .find('.' + this.options.selector.item)
              .not('[disabled]'),
            a = n.filter('.active'),
            f = a[0] ? n.index(a) : null,
            m = a[0] ? a.attr('data-index') : null,
            c = null,
            v = null
          if (
            (this.clearActiveItem(),
            this.helper.executeCallback.call(
              this,
              this.options.callback.onLeave,
              [
                this.node,
                (f !== null && n.eq(f)) || void 0,
                (m !== null && this.result[m]) || void 0,
                i
              ]
            ),
            i.keyCode === 13)
          ) {
            i.preventDefault(),
              n.length === 1 && n.click(),
              a.length > 0
                ? a.find('div:first')[0].click()
                : this.node.closest('form').trigger('submit')
            return
          }
          if (i.keyCode === 15802020) {
            f !== null
              ? n.eq(f).find('a:first')[0].click()
              : this.options.hint &&
                this.hint.container.val() !== '' &&
                this.helper.getCaret(this.node[0]) >= this.query.length &&
                n
                  .filter('[data-index="' + this.hintIndex + '"]')
                  .find('a:first')[0]
                  .click()
            return
          }
          i.keyCode === 9
            ? this.options.blurOnTab
              ? this.hideLayout()
              : a.length > 0
                ? f + 1 < n.length
                  ? (i.preventDefault(),
                    (c = f + 1),
                    this.addActiveItem(n.eq(c)))
                  : this.hideLayout()
                : n.length
                  ? (i.preventDefault(), (c = 0), this.addActiveItem(n.first()))
                  : this.hideLayout()
            : i.keyCode === 38
              ? (i.preventDefault(),
                a.length > 0
                  ? f - 1 >= 0 && ((c = f - 1), this.addActiveItem(n.eq(c)))
                  : n.length &&
                    ((c = n.length - 1), this.addActiveItem(n.last())))
              : i.keyCode === 40 &&
                (i.preventDefault(),
                a.length > 0
                  ? f + 1 < n.length &&
                    ((c = f + 1), this.addActiveItem(n.eq(c)))
                  : n.length && ((c = 0), this.addActiveItem(n.first()))),
            (v = c !== null ? n.eq(c).attr('data-index') : null),
            this.helper.executeCallback.call(
              this,
              this.options.callback.onEnter,
              [
                this.node,
                (c !== null && n.eq(c)) || void 0,
                (v !== null && this.result[v]) || void 0,
                i
              ]
            ),
            i.preventInputChange &&
              ~[38, 40].indexOf(i.keyCode) &&
              this.buildHintLayout(
                v !== null && v < this.result.length ? [this.result[v]] : null
              ),
            this.options.hint &&
              this.hint.container &&
              this.hint.container.css(
                'color',
                i.preventInputChange
                  ? this.hint.css.color
                  : (v === null && this.hint.css.color) ||
                      this.hint.container.css('background-color') ||
                      'fff'
              )
          var S =
            v === null || i.preventInputChange
              ? this.rawQuery
              : this.getTemplateValue.call(this, this.result[v])
          this.node.val(S),
            this.isContentEditable && this.node.text(S),
            this.helper.executeCallback.call(
              this,
              this.options.callback.onNavigateAfter,
              [
                this.node,
                n,
                (c !== null && n.eq(c).find('a:first')) || void 0,
                (v !== null && this.result[v]) || void 0,
                this.query,
                i
              ]
            )
        }
      },
      getTemplateValue: function (i) {
        if (i) {
          var n =
            (i.group && this.options.source[i.group].templateValue) ||
            this.options.templateValue
          if ((typeof n == 'function' && (n = n.call(this)), !n))
            return this.helper.namespace.call(this, i.matchedKey, i).toString()
          var a = this
          return n.replace(/\{\{([\w\-.]+)}}/gi, function (f, m) {
            return a.helper.namespace.call(a, m, i, 'get', '')
          })
        }
      },
      clearActiveItem: function () {
        this.resultContainer
          .find('.' + this.options.selector.item)
          .removeClass('active')
      },
      addActiveItem: function (i) {
        i.addClass('active')
      },
      searchResult: function () {
        this.resetLayout(),
          this.helper.executeCallback.call(
            this,
            this.options.callback.onSearch,
            [this.node, this.query]
          ) !== !1 &&
            ((this.searchGroups = ['lookup']),
            this.searchGroups.length &&
              !(
                this.options.multiselect &&
                this.options.multiselect.limit &&
                this.items.length >= this.options.multiselect.limit
              ) &&
              this.searchResultData(),
            this.helper.executeCallback.call(
              this,
              this.options.callback.onResult,
              [
                this.node,
                this.query,
                this.result,
                this.resultCount,
                this.resultCountPerGroup
              ]
            ),
            this.isDropdownEvent &&
              (this.helper.executeCallback.call(
                this,
                this.options.callback.onDropdownFilter,
                [this.node, this.query, this.filters.dropdown, this.result]
              ),
              (this.isDropdownEvent = !1)))
      },
      searchResultData: function () {
        var i = this,
          n,
          a = this.groupBy,
          f = null,
          m,
          c,
          v,
          S = this.query.toLowerCase(),
          L = this.options.maxItem,
          E = this.options.maxItemPerGroup,
          R =
            this.filters.dynamic && !this.helper.isEmpty(this.filters.dynamic),
          P,
          T,
          F = {},
          _,
          O,
          N,
          x,
          W = typeof this.options.matcher == 'function' && this.options.matcher,
          l,
          r,
          h
        this.options.accent && (S = this.helper.removeAccent.call(this, S))
        for (var p = 0, C = this.searchGroups.length; p < C; ++p)
          if (
            ((n = this.searchGroups[p]),
            !(
              this.filters.dropdown &&
              this.filters.dropdown.key === 'group' &&
              this.filters.dropdown.value !== n
            ))
          ) {
            ;(_ =
              typeof this.options.source[n].filter < 'u'
                ? this.options.source[n].filter
                : this.options.filter),
              (N =
                (typeof this.options.source[n].matcher == 'function' &&
                  this.options.source[n].matcher) ||
                W)
            for (
              var k = 0, D = this.source[n].length;
              k < D &&
              !(this.resultItemCount >= L && !this.options.callback.onResult);
              k++
            )
              if (
                !(
                  R &&
                  !this.dynamicFilter.validate.apply(this, [this.source[n][k]])
                ) &&
                ((m = this.source[n][k]),
                !(m === null || typeof m == 'boolean') &&
                  !(
                    this.options.multiselect && !this.isMultiselectUniqueData(m)
                  ) &&
                  !(
                    this.filters.dropdown &&
                    (m[this.filters.dropdown.key] || '').toLowerCase() !==
                      (this.filters.dropdown.value || '').toLowerCase()
                  ))
              ) {
                if (
                  ((f = a === 'group' ? n : m[a] ? m[a] : m.group),
                  f &&
                    !this.tmpResult[f] &&
                    ((this.tmpResult[f] = []),
                    (this.resultCountPerGroup[f] = 0)),
                  E &&
                    a === 'group' &&
                    this.tmpResult[f].length >= E &&
                    !this.options.callback.onResult)
                )
                  break
                P = this.options.source[n].display || this.options.display
                for (var A = 0, z = P.length; A < z; ++A) {
                  if (_ !== !1) {
                    if (
                      ((T = /\./.test(P[A])
                        ? this.helper.namespace.call(this, P[A], m)
                        : m[P[A]]),
                      typeof T > 'u' || T === '')
                    ) {
                      this.options.debug && (F[A] = { display: P[A], data: m })
                      continue
                    }
                    T = this.helper.cleanStringFromScript(T)
                  }
                  if (typeof _ == 'function') {
                    if (((O = _.call(this, m, T)), O === void 0)) break
                    if (!O) continue
                    typeof O == 'object' && (m = O)
                  }
                  if (~[void 0, !0].indexOf(_)) {
                    if (T === null) continue
                    if (
                      ((v = T),
                      (v = v.toString().toLowerCase()),
                      this.options.accent &&
                        (v = this.helper.removeAccent.call(this, v)),
                      (c = v.indexOf(S)),
                      this.options.correlativeTemplate &&
                        P[A] === 'compiled' &&
                        c < 0 &&
                        /\s/.test(S))
                    ) {
                      ;(l = !0), (r = S.split(' ')), (h = v)
                      for (var V = 0, U = r.length; V < U; V++)
                        if (r[V] !== '') {
                          if (!~h.indexOf(r[V])) {
                            l = !1
                            break
                          }
                          h = h.replace(r[V], '')
                        }
                    }
                    if ((c < 0 && !l) || (this.options.offset && c !== 0))
                      continue
                    if (N) {
                      if (((x = N.call(this, m, T)), x === void 0)) break
                      if (!x) continue
                      typeof x == 'object' && (m = x)
                    }
                  }
                  if (
                    (this.resultCount++,
                    this.resultCountPerGroup[f]++,
                    this.resultItemCount < L)
                  ) {
                    if (E && this.tmpResult[f].length >= E) break
                    this.tmpResult[f].push(
                      jQuery.extend(!0, { matchedKey: P[A] }, m)
                    ),
                      this.resultItemCount++
                  }
                  break
                }
                if (
                  !this.options.callback.onResult &&
                  (this.resultItemCount >= L ||
                    (E && this.tmpResult[f].length >= E && a === 'group'))
                )
                  break
              }
          }
        if (
          (this.options.debug &&
            (this.helper.isEmpty(F) ||
              (g.log({
                node: this.selector,
                function: 'searchResult()',
                arguments: JSON.stringify(F),
                message:
                  'Missing keys for display, make sure options.display is set properly.'
              }),
              g.print())),
          this.options.order)
        ) {
          var P = [],
            j
          for (var n in this.tmpResult)
            if (this.tmpResult.hasOwnProperty(n)) {
              for (var p = 0, C = this.tmpResult[n].length; p < C; p++)
                (j =
                  this.options.source[this.tmpResult[n][p].group].display ||
                  this.options.display),
                  ~P.indexOf(j[0]) || P.push(j[0])
              this.tmpResult[n].sort(
                i.helper.sort(P, i.options.order === 'asc', function (nt) {
                  return nt.toString().toUpperCase()
                })
              )
            }
        }
        var H = [],
          B = []
        typeof this.options.groupOrder == 'function'
          ? (B = this.options.groupOrder.apply(this, [
              this.node,
              this.query,
              this.tmpResult,
              this.resultCount,
              this.resultCountPerGroup
            ]))
          : Array.isArray(this.options.groupOrder)
            ? (B = this.options.groupOrder)
            : typeof this.options.groupOrder == 'string' &&
                ~['asc', 'desc'].indexOf(this.options.groupOrder)
              ? (B = Object.keys(this.tmpResult).sort(
                  i.helper.sort(
                    [],
                    i.options.groupOrder === 'asc',
                    function (q) {
                      return q.toString().toUpperCase()
                    }
                  )
                ))
              : (B = Object.keys(this.tmpResult))
        for (var p = 0, C = B.length; p < C; p++)
          H = H.concat(this.tmpResult[B[p]] || [])
        ;(this.groups = JSON.parse(JSON.stringify(B))), (this.result = H)
      },
      buildLayout: function () {
        this.buildHtmlLayout(),
          this.buildBackdropLayout(),
          this.buildHintLayout(),
          this.options.callback.onLayoutBuiltBefore &&
            (this.tmpResultHtml = this.helper.executeCallback.call(
              this,
              this.options.callback.onLayoutBuiltBefore,
              [this.node, this.query, this.result, this.resultHtml]
            )),
          this.tmpResultHtml instanceof d
            ? this.resultContainer.html(this.tmpResultHtml)
            : this.resultHtml instanceof d &&
              this.resultContainer.html(this.resultHtml),
          this.options.callback.onLayoutBuiltAfter &&
            this.helper.executeCallback.call(
              this,
              this.options.callback.onLayoutBuiltAfter,
              [this.node, this.query, this.result]
            )
      },
      buildHtmlLayout: function () {
        if (this.options.resultContainer !== !1) {
          this.resultContainer ||
            ((this.resultContainer = jQuery('<div/>', {
              class: this.options.selector.result
            })),
            this.container.append(this.resultContainer))
          var i
          if (!this.result.length)
            if (
              this.options.multiselect &&
              this.options.multiselect.limit &&
              this.items.length >= this.options.multiselect.limit
            )
              this.options.multiselect.limitTemplate
                ? (i =
                    typeof this.options.multiselect.limitTemplate == 'function'
                      ? this.options.multiselect.limitTemplate.call(
                          this,
                          this.query
                        )
                      : this.options.multiselect.limitTemplate.replace(
                          /\{\{query}}/gi,
                          jQuery('<div>')
                            .text(this.helper.cleanStringFromScript(this.query))
                            .html()
                        ))
                : (i =
                    "Can't select more than " + this.items.length + ' items.')
            else if (this.options.emptyTemplate && this.query !== '')
              i =
                typeof this.options.emptyTemplate == 'function'
                  ? this.options.emptyTemplate.call(this, this.query)
                  : this.options.emptyTemplate.replace(
                      /\{\{query}}/gi,
                      jQuery('<div>')
                        .text(this.helper.cleanStringFromScript(this.query))
                        .html()
                    )
            else return
          this.displayEmptyTemplate = !!i
          var n = this.query.toLowerCase()
          this.options.accent && (n = this.helper.removeAccent.call(this, n))
          var a = this,
            f = this.groupTemplate || '<ul></ul>',
            m = !1
          this.groupTemplate
            ? (f = jQuery(
                f.replace(
                  /<([^>]+)>\{\{(.+?)}}<\/[^>]+>/g,
                  function (l, r, h, p, C) {
                    var k = '',
                      D = h === 'group' ? a.groups : [h]
                    if (!a.result.length)
                      return m === !0
                        ? ''
                        : ((m = !0),
                          '<' +
                            r +
                            ' class="' +
                            a.options.selector.empty +
                            '">' +
                            i +
                            '</' +
                            r +
                            '>')
                    for (var A = 0, z = D.length; A < z; ++A)
                      k +=
                        '<' +
                        r +
                        ' data-group-template="' +
                        D[A] +
                        '"><ul></ul></' +
                        r +
                        '>'
                    return k
                  }
                )
              ))
            : ((f = jQuery(f)),
              this.result.length ||
                f.append(
                  i instanceof d
                    ? i
                    : '<li class="' +
                        a.options.selector.empty +
                        '">' +
                        i +
                        '</li>'
                )),
            f.addClass(
              this.options.selector.list +
                (this.helper.isEmpty(this.result) ? ' empty' : '')
            )
          for (
            var c,
              v,
              S,
              L,
              E,
              R,
              P,
              T,
              F,
              _,
              O = (this.groupTemplate && this.result.length && a.groups) || [],
              N,
              x = 0,
              W = this.result.length;
            x < W;
            ++x
          )
            (S = this.result[x]),
              (c = S.group),
              (L =
                (!this.options.multiselect &&
                  this.options.source[S.group].href) ||
                this.options.href),
              (T = []),
              (F =
                this.options.source[S.group].display || this.options.display),
              this.options.group &&
                ((c = S[this.options.group.key]),
                this.options.group.template &&
                  (typeof this.options.group.template == 'function' ||
                    (typeof this.options.group.template == 'string' &&
                      (v = this.options.group.template.replace(
                        /\{\{([\w\-\.]+)}}/gi,
                        function (l, r) {
                          return a.helper.namespace.call(a, r, S, 'get', '')
                        }
                      )))),
                f.find('[data-search-group="' + c + '"]')[0] ||
                  (this.groupTemplate
                    ? f.find('[data-group-template="' + c + '"] ul')
                    : f
                  ).append(
                    jQuery('<li/>', {
                      class: a.options.selector.group,
                      html: jQuery('<div/>', { html: v || c, tabindex: -1 }),
                      'data-search-group': c
                    })
                  )),
              this.groupTemplate &&
                O.length &&
                ((N = O.indexOf(c || S.group)), ~N && O.splice(N, 1)),
              (E = jQuery('<li/>', {
                class:
                  a.options.selector.item +
                  ' ' +
                  a.options.selector.group +
                  '-' +
                  this.helper.slugify.call(this, c),
                disabled: !!S.disabled,
                'data-group': c,
                'data-index': x,
                html: jQuery('<div/>', {
                  html: function () {
                    if (
                      ((R =
                        (S.group && a.options.source[S.group].template) ||
                        a.options.template),
                      R)
                    )
                      typeof R == 'function' && (R = R.call(a, a.query, S)),
                        (P = R.replace(
                          /\{\{([^\|}]+)(?:\|([^}]+))*}}/gi,
                          function (h, p, C) {
                            var k = a.helper.cleanStringFromScript(
                              String(
                                a.helper.namespace.call(a, p, S, 'get', '')
                              )
                            )
                            return (
                              (C = (C && C.split('|')) || []),
                              ~C.indexOf('slugify') &&
                                (k = a.helper.slugify.call(a, k)),
                              ~C.indexOf('raw') ||
                                (a.options.highlight === !0 &&
                                  n &&
                                  ~F.indexOf(p) &&
                                  (k = a.helper.highlight.call(
                                    a,
                                    k,
                                    n.split(' '),
                                    a.options.accent
                                  ))),
                              k
                            )
                          }
                        ))
                    else {
                      for (var l = 0, r = F.length; l < r; l++)
                        (_ = /\./.test(F[l])
                          ? a.helper.namespace.call(a, F[l], S, 'get', '')
                          : S[F[l]]),
                          !(typeof _ > 'u' || _ === '') && T.push(_)
                      P =
                        '<span class="' +
                        a.options.selector.display +
                        '">' +
                        a.helper.cleanStringFromScript(String(T.join(' '))) +
                        '</span>'
                    }
                    ;((a.options.highlight === !0 && n && !R) ||
                      a.options.highlight === 'any') &&
                      (P = a.helper.highlight.call(
                        a,
                        P,
                        n.split(' '),
                        a.options.accent
                      )),
                      jQuery(this).append(P)
                  }
                })
              })),
              (function (l, r, h) {
                h.on('click', function (p, C) {
                  if (r.disabled) {
                    p.preventDefault()
                    return
                  }
                  if (
                    (C && typeof C == 'object' && (p.originalEvent = C),
                    a.options.mustSelectItem && a.helper.isEmpty(r))
                  ) {
                    p.preventDefault()
                    return
                  }
                  a.options.multiselect || (a.item = r),
                    a.helper.executeCallback.call(
                      a,
                      a.options.callback.onClickBefore,
                      [a.node, jQuery(this), r, p]
                    ) !== !1 &&
                      ((p.originalEvent && p.originalEvent.defaultPrevented) ||
                        p.isDefaultPrevented() ||
                        (a.options.multiselect
                          ? ((a.query = a.rawQuery = ''),
                            a.addMultiselectItemLayout(r))
                          : ((a.focusOnly = !0),
                            (a.query = a.rawQuery =
                              a.getTemplateValue.call(a, r)),
                            a.isContentEditable &&
                              (a.node.text(a.query),
                              a.helper.setCaretAtEnd(a.node[0]))),
                        a.hideLayout(),
                        a.node.val(a.query),
                        a.options.cancelButton &&
                          a.toggleCancelButtonVisibility(),
                        a.helper.executeCallback.call(
                          a,
                          a.options.callback.onClickAfter,
                          [a.node, jQuery(this), r, p]
                        )))
                }),
                  h.on('mouseenter', function (p) {
                    r.disabled ||
                      (a.clearActiveItem(), a.addActiveItem(jQuery(this))),
                      a.helper.executeCallback.call(
                        a,
                        a.options.callback.onEnter,
                        [a.node, jQuery(this), r, p]
                      )
                  }),
                  h.on('mouseleave', function (p) {
                    r.disabled || a.clearActiveItem(),
                      a.helper.executeCallback.call(
                        a,
                        a.options.callback.onLeave,
                        [a.node, jQuery(this), r, p]
                      )
                  })
              })(x, S, E),
              (this.groupTemplate
                ? f.find('[data-group-template="' + c + '"] ul')
                : f
              ).append(E)
          if (this.result.length && O.length)
            for (var x = 0, W = O.length; x < W; ++x)
              f.find('[data-group-template="' + O[x] + '"]').remove()
          this.resultHtml = f
        }
      },
      generateHref: function (i, n) {
        var a = this
        return (
          typeof i == 'string'
            ? (i = i.replace(
                /\{\{([^\|}]+)(?:\|([^}]+))*}}/gi,
                function (f, m, c) {
                  var v = a.helper.namespace.call(a, m, n, 'get', '')
                  return (
                    (c = (c && c.split('|')) || []),
                    ~c.indexOf('slugify') && (v = a.helper.slugify.call(a, v)),
                    v
                  )
                }
              ))
            : typeof i == 'function' && (i = i.call(this, n)),
          i
        )
      },
      getMultiselectComparedData: function (i) {
        var n = ''
        if (Array.isArray(this.options.multiselect.matchOn))
          for (
            var a = 0, f = this.options.multiselect.matchOn.length;
            a < f;
            ++a
          )
            n +=
              typeof i[this.options.multiselect.matchOn[a]] < 'u'
                ? i[this.options.multiselect.matchOn[a]]
                : ''
        else {
          for (
            var m = JSON.parse(JSON.stringify(i)),
              c = ['group', 'matchedKey', 'compiled', 'href'],
              a = 0,
              f = c.length;
            a < f;
            ++a
          )
            delete m[c[a]]
          n = JSON.stringify(m)
        }
        return n
      },
      buildBackdropLayout: function () {
        this.options.backdrop &&
          (this.backdrop.container ||
            ((this.backdrop.css = jQuery.extend(
              {
                opacity: 0.6,
                filter: 'alpha(opacity=60)',
                position: 'fixed',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
                'z-index': 1040,
                'background-color': '#000'
              },
              this.options.backdrop
            )),
            (this.backdrop.container = jQuery('<div/>', {
              class: this.options.selector.backdrop,
              css: this.backdrop.css
            }).insertAfter(this.container))),
          this.container
            .addClass('backdrop')
            .css({
              'z-index': this.backdrop.css['z-index'] + 1,
              position: 'relative'
            }))
      },
      buildHintLayout: function (f) {
        if (this.options.hint) {
          if (this.node[0].scrollWidth > Math.ceil(this.node.innerWidth())) {
            this.hint.container && this.hint.container.val('')
            return
          }
          var n = this,
            a = '',
            f = f || this.result,
            m = this.query.toLowerCase()
          if (
            (this.options.accent &&
              (m = this.helper.removeAccent.call(this, m)),
            (this.hintIndex = null),
            this.searchGroups.length)
          ) {
            if (
              (this.hint.container ||
                ((this.hint.css = jQuery.extend(
                  {
                    'border-color': 'transparent',
                    position: 'absolute',
                    top: 0,
                    display: 'inline',
                    'z-index': -1,
                    float: 'none',
                    color: 'silver',
                    'box-shadow': 'none',
                    cursor: 'default',
                    '-webkit-user-select': 'none',
                    '-moz-user-select': 'none',
                    '-ms-user-select': 'none',
                    'user-select': 'none'
                  },
                  this.options.hint
                )),
                (this.hint.container = jQuery(
                  '<' + this.node[0].nodeName + '/>',
                  {
                    type: this.node.attr('type'),
                    class: this.node.attr('class'),
                    readonly: !0,
                    unselectable: 'on',
                    'aria-hidden': 'true',
                    tabindex: -1,
                    click: function () {
                      n.node.focus()
                    }
                  }
                )
                  .addClass(this.options.selector.hint)
                  .css(this.hint.css)
                  .insertAfter(this.node)),
                this.node.parent().css({ position: 'relative' })),
              this.hint.container.css('color', this.hint.css.color),
              m)
            ) {
              for (var c, v, S, L = 0, E = f.length; L < E; L++)
                if (!f[L].disabled) {
                  ;(v = f[L].group),
                    (c = this.options.source[v].display || this.options.display)
                  for (var R = 0, P = c.length; R < P; R++)
                    if (
                      ((S = String(f[L][c[R]]).toLowerCase()),
                      this.options.accent &&
                        (S = this.helper.removeAccent.call(this, S)),
                      S.indexOf(m) === 0)
                    ) {
                      ;(a = String(f[L][c[R]])), (this.hintIndex = L)
                      break
                    }
                  if (this.hintIndex !== null) break
                }
            }
            var T =
              (a.length > 0 &&
                this.rawQuery + a.substring(this.query.length)) ||
              ''
            this.hint.container.val(T),
              this.isContentEditable && this.hint.container.text(T)
          }
        }
      },
      buildDropdownLayout: function () {
        if (this.options.dropdownFilter) {
          var i = this
          jQuery('<span/>', {
            class: this.options.selector.filter,
            html: function () {
              jQuery(this).append(
                jQuery('<button/>', {
                  type: 'button',
                  class: i.options.selector.filterButton,
                  style: 'display: none;',
                  click: function () {
                    i.container.toggleClass('filter')
                    var n = i.namespace + '-dropdown-filter'
                    jQuery('html').off(n),
                      i.container.hasClass('filter') &&
                        jQuery('html').on(
                          'click' + n + ' touchend' + n,
                          function (a) {
                            ;(jQuery(a.target).closest(
                              '.' + i.options.selector.filter
                            )[0] &&
                              jQuery(a.target).closest(i.container)[0]) ||
                              i.hasDragged ||
                              (i.container.removeClass('filter'),
                              jQuery('html').off(n))
                          }
                        )
                  }
                })
              ),
                jQuery(this).append(
                  jQuery('<ul/>', { class: i.options.selector.dropdown })
                )
            }
          }).insertAfter(i.container.find('.' + i.options.selector.query))
        }
      },
      buildDropdownItemLayout: function (i) {
        if (!this.options.dropdownFilter) return
        var n = this,
          a,
          f =
            (typeof this.options.dropdownFilter == 'string' &&
              this.options.dropdownFilter) ||
            'All',
          m = this.container.find('.' + this.options.selector.dropdown),
          c
        i === 'static' &&
          (this.options.dropdownFilter === !0 ||
            typeof this.options.dropdownFilter == 'string') &&
          this.dropdownFilter.static.push({
            key: 'group',
            template: '{{group}}',
            all: f,
            value: Object.keys(this.options.source)
          })
        for (var v = 0, S = this.dropdownFilter[i].length; v < S; v++) {
          ;(c = this.dropdownFilter[i][v]),
            Array.isArray(c.value) || (c.value = [c.value]),
            c.all && (this.dropdownFilterAll = c.all)
          for (var L = 0, E = c.value.length; L <= E; L++)
            (L === E && v !== S - 1) ||
              (L === E &&
                v === S - 1 &&
                i === 'static' &&
                this.dropdownFilter.dynamic.length) ||
              ((a = this.dropdownFilterAll || f),
              c.value[L]
                ? c.template
                  ? (a = c.template.replace(
                      new RegExp('{{' + c.key + '}}', 'gi'),
                      c.value[L]
                    ))
                  : (a = c.value[L])
                : this.container
                    .find('.' + n.options.selector.filterButton)
                    .html(a),
              (function (P, T, F) {
                m.append(
                  jQuery('<li/>', {
                    class:
                      n.options.selector.dropdownItem +
                      ' ' +
                      n.helper.slugify.call(n, T.key + '-' + (T.value[P] || f)),
                    html: jQuery('<div/>', {
                      html: F,
                      click: function (_) {
                        _.preventDefault(),
                          R.call(n, {
                            key: T.key,
                            value: T.value[P] || '*',
                            template: F
                          })
                      }
                    })
                  })
                )
              })(L, c, a))
        }
        this.dropdownFilter[i].length &&
          this.container
            .find('.' + n.options.selector.filterButton)
            .removeAttr('style')
        function R(P) {
          P.value === '*'
            ? delete this.filters.dropdown
            : (this.filters.dropdown = P),
            this.container
              .removeClass('filter')
              .find('.' + this.options.selector.filterButton)
              .html(P.template),
            (this.isDropdownEvent = !0),
            this.node.trigger('input' + this.namespace),
            this.options.multiselect && this.adjustInputSize(),
            this.node.focus()
        }
      },
      dynamicFilter: {
        isEnabled: !1,
        init: function () {
          this.options.dynamicFilter &&
            (this.dynamicFilter.bind.call(this),
            (this.dynamicFilter.isEnabled = !0))
        },
        validate: function (i) {
          var n,
            a = null,
            f = null,
            m
          for (var c in this.filters.dynamic)
            if (
              this.filters.dynamic.hasOwnProperty(c) &&
              (~c.indexOf('.')
                ? (m = this.helper.namespace.call(this, c, i, 'get'))
                : (m = i[c]),
              this.filters.dynamic[c].modifier === '|' &&
                !a &&
                (a = m == this.filters.dynamic[c].value || !1),
              this.filters.dynamic[c].modifier === '&')
            )
              if (m == this.filters.dynamic[c].value) f = !0
              else {
                f = !1
                break
              }
          return (
            (n = a),
            f !== null && ((n = f), f === !0 && a !== null && (n = a)),
            !!n
          )
        },
        set: function (i, n) {
          var a = i.match(/^([|&])?(.+)/)
          n
            ? (this.filters.dynamic[a[2]] = { modifier: a[1] || '|', value: n })
            : delete this.filters.dynamic[a[2]],
            this.dynamicFilter.isEnabled && this.generateSource()
        },
        bind: function () {
          for (
            var i = this, n, a = 0, f = this.options.dynamicFilter.length;
            a < f;
            a++
          ) {
            if (
              ((n = this.options.dynamicFilter[a]),
              typeof n.selector == 'string' &&
                (n.selector = jQuery(n.selector)),
              !(n.selector instanceof d) || !n.selector[0] || !n.key)
            ) {
              this.options.debug &&
                (g.log({
                  node: this.selector,
                  function: 'buildDynamicLayout()',
                  message:
                    'Invalid jQuery selector or jQuery Object for "filter.selector" or missing filter.key'
                }),
                g.print())
              continue
            }
            ;(function (m) {
              m.selector
                .off(i.namespace)
                .on('change' + i.namespace, function () {
                  i.dynamicFilter.set.apply(i, [
                    m.key,
                    i.dynamicFilter.getValue(this)
                  ])
                })
                .trigger('change' + i.namespace)
            })(n)
          }
        },
        getValue: function (i) {
          var n
          return (
            i.tagName === 'SELECT'
              ? (n = i.value)
              : i.tagName === 'INPUT' &&
                (i.type === 'checkbox'
                  ? (n =
                      (i.checked && i.getAttribute('value')) ||
                      i.checked ||
                      null)
                  : i.type === 'radio' && i.checked && (n = i.value)),
            n
          )
        }
      },
      buildMultiselectLayout: function () {
        if (this.options.multiselect) {
          var i = this,
            n
          ;(this.label.container = jQuery('<span/>', {
            class: this.options.selector.labelContainer,
            'data-padding-left': parseFloat(this.node.css('padding-left')) || 0,
            'data-padding-right':
              parseFloat(this.node.css('padding-right')) || 0,
            'data-padding-top': parseFloat(this.node.css('padding-top')) || 0,
            click: function (a) {
              jQuery(a.target).hasClass(i.options.selector.labelContainer) &&
                i.node.focus()
            }
          })),
            this.node
              .closest('.' + this.options.selector.query)
              .prepend(this.label.container),
            this.options.multiselect.data &&
              (Array.isArray(this.options.multiselect.data)
                ? this.populateMultiselectData(this.options.multiselect.data)
                : typeof this.options.multiselect.data == 'function' &&
                  ((n = this.options.multiselect.data.call(this)),
                  Array.isArray(n)
                    ? this.populateMultiselectData(n)
                    : typeof n.promise == 'function' &&
                      jQuery.when(n).then(function (a) {
                        a && Array.isArray(a) && i.populateMultiselectData(a)
                      })))
        }
      },
      isMultiselectUniqueData: function (i) {
        for (var n = !0, a = 0, f = this.comparedItems.length; a < f; ++a)
          if (this.comparedItems[a] === this.getMultiselectComparedData(i)) {
            n = !1
            break
          }
        return n
      },
      populateMultiselectData: function (i) {
        for (var n = 0, a = i.length; n < a; ++n)
          this.addMultiselectItemLayout(i[n])
        this.node.trigger('search' + this.namespace, {
          origin: 'populateMultiselectData'
        })
      },
      addMultiselectItemLayout: function (i) {
        if (this.isMultiselectUniqueData(i)) {
          this.items.push(i),
            this.comparedItems.push(this.getMultiselectComparedData(i))
          var n = this.getTemplateValue(i),
            a = this,
            f = this.options.multiselect.href ? 'a' : 'span',
            m = jQuery('<span/>', {
              class: this.options.selector.label,
              html: jQuery('<' + f + '/>', {
                text: n,
                click: function (c) {
                  var v = jQuery(this).closest('.' + a.options.selector.label),
                    S = a.label.container
                      .find('.' + a.options.selector.label)
                      .index(v)
                  a.options.multiselect.callback &&
                    a.helper.executeCallback.call(
                      a,
                      a.options.multiselect.callback.onClick,
                      [a.node, a.items[S], c]
                    )
                },
                href: this.options.multiselect.href
                  ? (function (c) {
                      return a.generateHref.call(
                        a,
                        a.options.multiselect.href,
                        c
                      )
                    })(a.items[a.items.length - 1])
                  : null
              })
            })
          return (
            m.append(
              jQuery('<span/>', {
                class: this.options.selector.cancelButton,
                html: '\xD7',
                click: function (c) {
                  var v = jQuery(this).closest('.' + a.options.selector.label),
                    S = a.label.container
                      .find('.' + a.options.selector.label)
                      .index(v)
                  a.cancelMultiselectItem(S, v, c)
                }
              })
            ),
            this.label.container.append(m),
            this.adjustInputSize(),
            !0
          )
        }
      },
      cancelMultiselectItem: function (i, n, a) {
        var f = this.items[i]
        ;(n =
          n ||
          this.label.container.find('.' + this.options.selector.label).eq(i)),
          n.remove(),
          this.items.splice(i, 1),
          this.comparedItems.splice(i, 1),
          this.options.multiselect.callback &&
            this.helper.executeCallback.call(
              this,
              this.options.multiselect.callback.onCancel,
              [this.node, f, a]
            ),
          this.adjustInputSize(),
          (this.focusOnly = !0),
          this.node
            .focus()
            .trigger('input' + this.namespace, {
              origin: 'cancelMultiselectItem'
            })
      },
      adjustInputSize: function () {
        var i =
            this.node[0].getBoundingClientRect().width -
            (parseFloat(this.label.container.data('padding-right')) || 0) -
            (parseFloat(this.label.container.css('padding-left')) || 0),
          n = 0,
          a = 0,
          f = 0,
          m = !1,
          c = 0
        this.label.container
          .find('.' + this.options.selector.label)
          .filter(function (L, E) {
            L === 0 &&
              (c =
                jQuery(E)[0].getBoundingClientRect().height +
                parseFloat(jQuery(E).css('margin-bottom') || 0)),
              (n =
                jQuery(E)[0].getBoundingClientRect().width +
                parseFloat(jQuery(E).css('margin-right') || 0)),
              f + n > i * 0.7 && !m && (a++, (m = !0)),
              f + n < i ? (f += n) : ((m = !1), (f = n))
          })
        var v =
            parseFloat(this.label.container.data('padding-left') || 0) +
            (m ? 0 : f),
          S = a * c + parseFloat(this.label.container.data('padding-top') || 0)
        this.container
          .find('.' + this.options.selector.query)
          .find('input, textarea, [contenteditable], .typeahead__hint')
          .css({ paddingLeft: v, paddingTop: S })
      },
      showLayout: function () {
        if (
          this.container.hasClass('result') ||
          (!this.result.length &&
            !this.displayEmptyTemplate &&
            !this.options.backdropOnFocus)
        )
          return
        i.call(this),
          this.container.addClass(
            [
              this.result.length ||
              (this.searchGroups.length && this.displayEmptyTemplate)
                ? 'result '
                : '',
              this.options.hint && this.searchGroups.length ? 'hint' : '',
              this.options.backdrop || this.options.backdropOnFocus
                ? 'backdrop'
                : ''
            ].join(' ')
          ),
          this.helper.executeCallback.call(
            this,
            this.options.callback.onShowLayout,
            [this.node, this.query]
          )
        function i() {
          var n = this
          jQuery('html')
            .off('keydown' + this.namespace)
            .on('keydown' + this.namespace, function (a) {
              !a.keyCode ||
                a.keyCode !== 9 ||
                setTimeout(function () {
                  jQuery(':focus').closest(n.container).find(n.node)[0] ||
                    n.hideLayout()
                }, 0)
            }),
            jQuery('html')
              .off('click' + this.namespace + ' touchend' + this.namespace)
              .on(
                'click' + this.namespace + ' touchend' + this.namespace,
                function (a) {
                  jQuery(a.target).closest(n.container)[0] ||
                    jQuery(a.target).closest(
                      '.' + n.options.selector.item
                    )[0] ||
                    a.target.className === n.options.selector.cancelButton ||
                    n.hasDragged ||
                    n.hideLayout()
                }
              )
        }
      },
      hideLayout: function () {
        ;(!this.container.hasClass('result') &&
          !this.container.hasClass('backdrop')) ||
          (this.container.removeClass(
            'result hint filter' +
              (this.options.backdropOnFocus && jQuery(this.node).is(':focus')
                ? ''
                : ' backdrop')
          ),
          !(
            this.options.backdropOnFocus && this.container.hasClass('backdrop')
          ) &&
            (jQuery('html').off(this.namespace),
            this.helper.executeCallback.call(
              this,
              this.options.callback.onHideLayout,
              [this.node, this.query]
            )))
      },
      resetLayout: function () {
        ;(this.result = []),
          (this.tmpResult = {}),
          (this.groups = []),
          (this.resultCount = 0),
          (this.resultCountPerGroup = {}),
          (this.resultItemCount = 0),
          (this.resultHtml = null),
          this.options.hint &&
            this.hint.container &&
            (this.hint.container.val(''),
            this.isContentEditable && this.hint.container.text(''))
      },
      resetInput: function () {
        this.node.val(''),
          this.isContentEditable && this.node.text(''),
          (this.query = ''),
          (this.rawQuery = '')
      },
      buildCancelButtonLayout: function () {
        if (this.options.cancelButton) {
          var i = this
          jQuery('<span/>', {
            class: this.options.selector.cancelButton,
            html: '\xD7',
            mousedown: function (n) {
              n.stopImmediatePropagation(),
                n.preventDefault(),
                i.resetInput(),
                i.node.trigger('input' + i.namespace, [n])
            }
          }).insertBefore(this.node)
        }
      },
      toggleCancelButtonVisibility: function () {
        this.container.toggleClass('cancel', !!this.query.length)
      },
      __construct: function () {
        this.extendOptions(),
          this.unifySourceFormat() &&
            (this.dynamicFilter.init.apply(this),
            this.init(),
            this.buildDropdownLayout(),
            this.buildDropdownItemLayout('static'),
            this.buildMultiselectLayout(),
            this.delegateEvents(),
            this.buildCancelButtonLayout(),
            this.helper.executeCallback.call(
              this,
              this.options.callback.onReady,
              [this.node]
            ))
      },
      helper: {
        isEmpty: function (i) {
          for (var n in i) if (i.hasOwnProperty(n)) return !1
          return !0
        },
        removeAccent: function (i) {
          if (typeof i == 'string') {
            var n = s
            return (
              typeof this.options.accent == 'object' &&
                (n = this.options.accent),
              (i = i
                .toLowerCase()
                .replace(new RegExp('[' + n.from + ']', 'g'), function (a) {
                  return n.to[n.from.indexOf(a)]
                })),
              i
            )
          }
        },
        slugify: function (i) {
          return (
            (i = String(i)),
            i !== '' &&
              ((i = this.helper.removeAccent.call(this, i)),
              (i = i
                .replace(/[^-a-z0-9]+/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, ''))),
            i
          )
        },
        sort: function (i, n, a) {
          var f = function (m) {
            for (var c = 0, v = i.length; c < v; c++)
              if (typeof m[i[c]] < 'u') return a(m[i[c]])
            return m
          }
          return (
            (n = [-1, 1][+!!n]),
            function (m, c) {
              return (m = f(m)), (c = f(c)), n * ((m > c) - (c > m))
            }
          )
        },
        replaceAt: function (i, n, a, f) {
          return i.substring(0, n) + f + i.substring(n + a)
        },
        highlight: function (i, n, a) {
          i = String(i)
          var f = (a && this.helper.removeAccent.call(this, i)) || i,
            m = []
          Array.isArray(n) || (n = [n]),
            n.sort(function (v, S) {
              return S.length - v.length
            })
          for (var c = n.length - 1; c >= 0; c--) {
            if (n[c].trim() === '') {
              n.splice(c, 1)
              continue
            }
            n[c] = n[c].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
          }
          f.replace(
            new RegExp('(?:' + n.join('|') + ')(?!([^<]+)?>)', 'gi'),
            function (v, S, L) {
              m.push({ offset: L, length: v.length })
            }
          )
          for (var c = m.length - 1; c >= 0; c--)
            i = this.helper.replaceAt(
              i,
              m[c].offset,
              m[c].length,
              '<strong>' + i.substr(m[c].offset, m[c].length) + '</strong>'
            )
          return i
        },
        getCaret: function (i) {
          var n = 0
          if (i.selectionStart) return i.selectionStart
          if (document.selection) {
            var a = document.selection.createRange()
            if (a === null) return n
            var f = i.createTextRange(),
              m = f.duplicate()
            f.moveToBookmark(a.getBookmark()),
              m.setEndPoint('EndToStart', f),
              (n = m.text.length)
          } else if (window.getSelection) {
            var c = window.getSelection()
            if (c.rangeCount) {
              var v = c.getRangeAt(0)
              v.commonAncestorContainer.parentNode == i && (n = v.endOffset)
            }
          }
          return n
        },
        setCaretAtEnd: function (i) {
          if (
            typeof window.getSelection < 'u' &&
            typeof document.createRange < 'u'
          ) {
            var n = document.createRange()
            n.selectNodeContents(i), n.collapse(!1)
            var a = window.getSelection()
            a.removeAllRanges(), a.addRange(n)
          } else if (typeof document.body.createTextRange < 'u') {
            var f = document.body.createTextRange()
            f.moveToElementText(i), f.collapse(!1), f.select()
          }
        },
        cleanStringFromScript: function (i) {
          return (
            (typeof i == 'string' &&
              i.replace(/<\/?(?:script|iframe)\b[^>]*>/gm, '')) ||
            i
          )
        },
        executeCallback: function (i, n) {
          if (i) {
            var a
            if (typeof i == 'function') a = i
            else if (
              (typeof i == 'string' || Array.isArray(i)) &&
              (typeof i == 'string' && (i = [i, []]),
              (a = this.helper.namespace.call(this, i[0], window)),
              typeof a != 'function')
            ) {
              this.options.debug &&
                (g.log({
                  node: this.selector,
                  function: 'executeCallback()',
                  arguments: JSON.stringify(i),
                  message: 'WARNING - Invalid callback function"'
                }),
                g.print())
              return
            }
            return a.apply(this, (i[1] || []).concat(n || []))
          }
        },
        namespace: function (i, n, S, f) {
          if (typeof i != 'string' || i === '')
            return (
              this.options.debug &&
                (g.log({
                  node: this.options.input || this.selector,
                  function: 'helper.namespace()',
                  arguments: i,
                  message: 'ERROR - Missing string"'
                }),
                g.print()),
              !1
            )
          var m = typeof f < 'u' ? f : void 0
          if (!~i.indexOf('.')) return n[i] || m
          for (
            var c = i.split('.'),
              v = n || window,
              S = S || 'get',
              L = '',
              E = 0,
              R = c.length;
            E < R;
            E++
          ) {
            if (((L = c[E]), typeof v[L] > 'u')) {
              if (~['get', 'delete'].indexOf(S))
                return typeof f < 'u' ? f : void 0
              v[L] = {}
            }
            if (~['set', 'create', 'delete'].indexOf(S) && E === R - 1)
              if (S === 'set' || S === 'create') v[L] = m
              else return delete v[L], !0
            v = v[L]
          }
          return v
        },
        typeWatch: (function () {
          var i = 0
          return function (n, a) {
            clearTimeout(i), (i = setTimeout(n, a))
          }
        })()
      }
    }),
      (jQuery.fn.typeahead = jQuery.typeahead =
        function (i) {
          return M.typeahead(this, i)
        })
    var M = {
        typeahead: function (i, n) {
          if (!n || !n.source || typeof n.source != 'object') {
            g.log({
              node: i.selector || (n && n.input),
              function: 'jQuery.typeahead()',
              arguments: JSON.stringify((n && n.source) || ''),
              message:
                'Undefined "options" or "options.source" or invalid source type - Typeahead dropped'
            }),
              g.print()
            return
          }
          if (typeof i == 'function') {
            if (!n.input) {
              g.log({
                node: i.selector,
                function: 'jQuery.typeahead()',
                message: 'Undefined "options.input" - Typeahead dropped'
              }),
                g.print()
              return
            }
            i = jQuery(n.input)
          }
          if ((typeof i[0].value > 'u' && (i[0].value = i.text()), !i.length)) {
            g.log({
              node: i.selector,
              function: 'jQuery.typeahead()',
              arguments: JSON.stringify(n.input),
              message: 'Unable to find jQuery input element - Typeahead dropped'
            }),
              g.print()
            return
          }
          if (i.length === 1)
            return (
              (i[0].selector =
                i.selector || n.input || i[0].nodeName.toLowerCase()),
              (window.Typeahead[i[0].selector] = new b(i, n))
            )
          for (var a = {}, f, m = 0, c = i.length; m < c; ++m)
            (f = i[m].nodeName.toLowerCase()),
              typeof a[f] < 'u' && (f += m),
              (i[m].selector = f),
              (window.Typeahead[f] = a[f] = new b(i.eq(m), n))
          return a
        }
      },
      g = {
        table: {},
        log: function (i) {
          !i.message ||
            typeof i.message != 'string' ||
            (this.table[i.message] = jQuery.extend(
              { node: '', function: '', arguments: '' },
              i
            ))
        },
        print: function () {
          b.prototype.helper.isEmpty(this.table) ||
            !console ||
            !console.table ||
            (this.table = {})
        }
      }
    return (
      g.log({
        message:
          'WARNING - You are using the DEBUG version. Use /dist/jquery.typeahead.min.js in production.'
      }),
      g.print(),
      (window.console = window.console || { log: function () {} }),
      Array.isArray ||
        (Array.isArray = function (i) {
          return Object.prototype.toString.call(i) === '[object Array]'
        }),
      'trim' in String.prototype ||
        (String.prototype.trim = function () {
          return this.replace(/^\s+/, '').replace(/\s+$/, '')
        }),
      'indexOf' in Array.prototype ||
        (Array.prototype.indexOf = function (i, n) {
          n === void 0 && (n = 0), n < 0 && (n += this.length), n < 0 && (n = 0)
          for (var a = this.length; n < a; n++)
            if (n in this && this[n] === i) return n
          return -1
        }),
      Object.keys ||
        (Object.keys = function (i) {
          var n = [],
            a
          for (a in i) Object.prototype.hasOwnProperty.call(i, a) && n.push(a)
          return n
        }),
      b
    )
  })(jQuery)
  var Mt = class extends Y(Q) {
    constructor(t, e) {
      super(t, e),
        (this.controlType = 'typeahead'),
        (this.$reverseGeocodeButton = t.siblings(
          '.afd-typeahead-reverse-geocode-button'
        )),
        this.setFields(),
        (this.uniqueID = this.getUniqueID()),
        this.setupTypeaheadRequestOptions(),
        (this.typeaheadOptions = this.prepareTypeaheadOptions())
    }
    init = () => {
      try {
        this.initFields(), this.$element.typeahead(this.typeaheadOptions)
      } catch (e) {
        console.error('Error initisalising typeahead control'), console.error(e)
      }
      this.options.typeahead.w3wFocusMode === 'init' &&
        navigator.geolocation.getCurrentPosition(
          this.onGeolocationSuccess,
          this.onGeolocationError
        )
      let t = this.eventHandler
      t(this.$element, 'input', this.onInput),
        t(this.$element, 'afd:initFields', this.onAfdInitFields),
        t(this.$element, 'focusin', this.onFocusIn),
        t(this.$searchAgainButton, 'click', this.onAfdSearchAgainButtonClick),
        this.options.typeahead.manualInputButton &&
          (t(
            this.$manualInputButton,
            'click',
            this.onAfdManualInputButtonClick
          ),
          t(
            this.$manualInputSearchButton,
            'click',
            this.onAfdManualInputSearchButtonClick
          ))
    }
    setupTypeaheadRequestOptions = () => {
      this.initRequestSequence()
      let t = {
        data: 'address',
        fields: this.options.typeahead.postcodeFirst ? 'list' : 'fflist',
        task: 'fastfindv4',
        lookup: '{{query}}',
        allpc: '1',
        ...(this.options.typeahead.matchPositions ? { matchPositions: 1 } : {}),
        maxquantity: this.options.typeahead.maxItems,
        uniqueid: this.uniqueID,
        w3wmode: this.options.typeahead.w3wMode,
        ...(this.options.typeahead.locationBias ? { iploc: 1 } : {})
      }
      ;(this.options.typeahead.listEnv ||
        (this.country === 'USA' && !this.options.typeahead.postcodeFirst)) &&
        (t.listEnv = '1'),
        this.country ||
          (this.country =
            this.options.country.defaultCountry ?? this.options.defaultCountry),
        (this.options.typeahead.listEnv ||
          (this.country === 'USA' && !this.options.typeahead.postcodeFirst)) &&
          (t.listEnv = '1'),
        this.options.typeahead.bankLookup &&
          ((t.data = 'bank'), (t.task = 'fastfind'), (t.clearing = 'all')),
        jQuery.extend(t, this.options.typeahead.extraPCESearchParams),
        (this.requestOptions = this.setupParams(t)),
        (this.requestOptions.path = 'Item')
    }
    prepareTypeaheadOptions = () => ({
      dynamic: !0,
      source: { lookup: { ajax: this.requestOptions } },
      template: '<span>{{List}}</span>',
      templateValue: '{{List}}',
      cancelButton: !1,
      emptyTemplate: 'No results found for {{query}}',
      filter: !1,
      maxItem: 0,
      minLength: this.options.typeahead.minLength,
      delay: 20,
      abortAjax: !1,
      selector: this.getTypeaheadSelectors(),
      callback: {
        onResult: this.onResult,
        onShowLayout: this.onShowLayout,
        onHideLayout: this.onHideLayout,
        onLayoutBuiltBefore: this.onLayoutBuiltBefore,
        onLayoutBuiltAfter: this.onLayoutBuiltAfter,
        onSearch: this.onSearch,
        onNavigateBefore: this.onNavigateBefore,
        onNavigateAfter: this.onNavigateAfter,
        onClickAfter: this.onClickAfter,
        onPopulateSource: this.onPopulateSource,
        onReceiveRequest: this.onReceiveRequest
      }
    })
    onInput = (t) => {
      let { $container: e } = this
      e.find('.afd-typeahead-status').html('&nbsp;'),
        e.find('[data-afd-control="reverseGeocodeResultsList"]').hide(),
        jQuery(document).trigger('afd:typeaheadInput', [t.target.value]),
        this.$element.trigger('afd:typeaheadInput', [t.target.value])
    }
    onFocusIn = () => {
      this.options[this.controlType].w3wFocusMode === 'focus' &&
        navigator.geolocation.getCurrentPosition(
          this.onGeolocationSuccess,
          this.onGeolocationError
        )
    }
    onCountryChangedLocal = (t) => {
      this.options.typeahead.w3wFocusMode === 'init' &&
        navigator.geolocation.getCurrentPosition(
          this.onGeolocationSuccess,
          this.onGeolocationError
        ),
        (this.typeaheadOptions.source.lookup.ajax.data.countryiso = t),
        this.setupTypeaheadRequestOptions(),
        (this.typeaheadOptions = this.prepareTypeaheadOptions()),
        this.$element.typeahead(this.typeaheadOptions)
    }
    onAfdInitFields = () => {
      this.$element.typeahead(this.typeaheadOptions),
        this.setFields(),
        this.initFields()
    }
    onResult = (t, e, s) => {
      let { $container: o, options: u } = this
      o.find('.afd-typeahead-status').html(s.length + ' results found'),
        u.typeahead.beforeHideResults &&
          u.typeahead.fewResultsManualInput &&
          s.length < u.typeahead.maxItems &&
          e.length > 3 &&
          window.Typeahead.input.result.push({
            List: u.typeahead.fewResultsManualInputText,
            Key: null,
            group: 'lookup',
            matchedKey: 'display'
          })
    }
    onShowLayout = () => {
      this.$manualInputButton.hide()
    }
    onHideLayout = () => {
      let { $container: t, options: e } = this
      !(t.find('[data-afd-result]:hidden').length === 0) &&
        e.typeahead.manualInputButton &&
        this.$manualInputButton.show(),
        t.find('.provider').remove()
    }
    onLayoutBuiltBefore = (t, e, s, o) => {
      let { $container: u } = this
      if (s.length === 0) return o
      let y = u.length > 0 ? '-' + u.attr('id') : ''
      if (
        (o.attr('id', 'afd-results' + y).attr('role', 'listbox'),
        this.options.typeahead.matchPositions &&
          typeof s[0].matchPositions < 'u')
      ) {
        let w = '<span class="afd-matched-highlight">',
          I = '</span>',
          b = w.length + I.length
        for (let M = 0; M < s.length; M++) {
          let g = s[M],
            n = jQuery(o.children().eq(M)).text()
          if (typeof g.matchPositions < 'u')
            for (let f = 0; f < g.matchPositions.length; f++) {
              let m = g.matchPositions[f],
                c = f * b,
                v = ''
              ;(v += n.substr(0, m[0] + c)),
                (v += w),
                (v += n.substr(m[0] + c, m[1] - m[0])),
                (v += I),
                (v += n.substr(m[1] + c)),
                (n = v)
            }
          let a = '<div>'
          ;(a += n), (a += '</a>'), o.children().eq(M).html(a)
        }
      }
      for (let w = 0; w < s.length; w++) {
        let I = s[w],
          {
            w3wNear: b,
            w3wNearTemplate: M,
            w3wDistanceUnit: g,
            w3wDistanceTemplate: i
          } = this.options.typeahead
        if (b && typeof I.Near < 'u') {
          let n = M.replace('{near}', I.Near)
          o.children().eq(w).append(`<span class="afd-near">${n}</span>`)
        }
        if (typeof I.Km < 'u' || typeof I.Miles < 'u') {
          if (['m', 'km'].indexOf(g.toLowerCase()) === -1)
            throw 'Invalid w3wDistanceUnit option. Must be "m" or "km"'
          let n = g.toLowerCase() === 'm' ? 'Miles' : 'Km',
            a = i.replace('{distance}', I[n])
          o.children().eq(w).append(`<span class="afd-distance">${a}</span>`)
        }
      }
      return (
        s.length === 1 && o.children().addClass('active'),
        o.children().attr('role', 'option'),
        o.children().each((w) => {
          o.children()
            .eq(w)
            .attr('id', 'afd-result-' + w)
        }),
        o.attr('aria-label', 'Results'),
        o
      )
    }
    onLayoutBuiltAfter = (t) => {
      let e = t
        .closest('.afd-typeahead-field')
        .siblings('.afd-typeahead-result')
      this.options.typeahead.providerInfo &&
        e.prepend('<div class="provider"></div>'),
        this.w3w
          ? e
              .find('.provider')
              .html(this.w3wLogo + '<strong> what3words</strong>')
          : e
              .find('.provider')
              .html(this.afdLogo + '<strong> afd Software</strong>')
    }
    onSearch = () => {
      jQuery('.' + this.typeaheadOptions.selector.result).empty()
    }
    onNavigateBefore = (t, e, s) => {
      ~[38, 40].indexOf(event.keyCode) && (s.preventInputChange = !0)
    }
    onNavigateAfter = (t, e, s, o, u, y) => {
      let { $container: w } = this,
        I = e.filter('li.active')
      if (~[38, 40].indexOf(y.keyCode)) {
        let b = w.find('.afd-typeahead-list'),
          M = (I[0] && I[0].offsetTop - b.height() / 2) || 0
        b.scrollTop(M)
      }
      e.removeAttr('aria-selected'),
        I.attr('aria-selected', 'true'),
        this.$element.attr('aria-activedescendant', I.attr('id'))
    }
    onClickAfter = (t, e, s) => {
      let { $container: o, options: u } = this
      if (
        (o.find('.afd-typeahead-status').html('&nbsp;'),
        u.typeahead.afterClearTypeahead &&
          jQuery('.afd-typeahead-field input').val(''),
        !s.Key)
      ) {
        this.showResultFields(),
          this.$fieldSets.show(),
          this.$manualInputButton.hide(),
          this.$manualInputSearchButton.show(),
          this.$typeaheadFieldandLabel.hide()
        return
      }
      s.suggestion
        ? jQuery(t)
            .val('///' + s.Key + '///')
            .trigger('input')
            .val(s.Key)
        : this.addressRetrieve(s.Key)
            .then((y, w, I) => {
              this.handleAddressRetrieve(y, I)
            })
            .fail((y) => this.handlePCEError(y))
    }
    onPopulateSource = (t, e, s, o, u) =>
      e.map((w) => {
        let I = w.List
        return {
          ...w,
          List: I,
          suggestion: typeof u.Suggestion < 'u',
          w3w: typeof u.W3W < 'u'
        }
      })
    onReceiveRequest = (t, e, s) => {
      this.handlePCEError(s.Result, s.ErrorText)
    }
    onGeolocationSuccess = (t) => {
      ;(this.position = t),
        typeof this.typeaheadOptions < 'u' &&
          ((this.typeaheadOptions.source.lookup.ajax.data.longitude =
            t.coords.longitude),
          (this.typeaheadOptions.source.lookup.ajax.data.latitude =
            t.coords.latitude),
          this.$element.typeahead(this.typeaheadOptions))
    }
    onGeolocationError = (t) => {
      ;(this.position = null), console.log(t)
    }
    getTypeaheadSelectors = () => ({
      container: 'afd-typeahead-container',
      result: 'afd-typeahead-result',
      list: 'afd-typeahead-list',
      group: 'afd-typeahead-group',
      item: 'afd-typeahead-item',
      empty: 'afd-typeahead-empty',
      display: 'afd-typeahead-display',
      query: 'afd-typeahead-query',
      filter: 'afd-typeahead-filter',
      filterButton: 'afd-typeahead-filterButton',
      dropdown: 'afd-typeahead-dropdown',
      dropdownItem: 'afd-typeahead-dropdownItem',
      button: 'afd-typeahead-button',
      backdrop: 'afd-typeahead-backdrop',
      hint: 'afd-typeahead-hint',
      cancelButton: 'afd-typeahead-cancelButton'
    })
    w3wLogo =
      '<svg viewBox="0 0 24 24" width="24px" height="24px"><path d="M24 0H0V24H24V0Z" fill="#E11F26"></path><path d="M10.5029 17.2564C10.3838 17.2563 10.2665 17.2278 10.1605 17.1735C10.0545 17.1191 9.96298 17.0404 9.89335 16.9438C9.82373 16.8472 9.77801 16.7354 9.75997 16.6177C9.74193 16.5 9.75207 16.3797 9.78957 16.2667L12.7971 7.24404C12.8283 7.15037 12.8777 7.06376 12.9424 6.98917C13.0071 6.91458 13.0859 6.85346 13.1742 6.80932C13.2626 6.76517 13.3587 6.73885 13.4572 6.73186C13.5557 6.72488 13.6547 6.73736 13.7483 6.76861C13.842 6.79985 13.9286 6.84923 14.0032 6.91394C14.0778 6.97865 14.1389 7.05742 14.1831 7.14575C14.2272 7.23408 14.2535 7.33024 14.2605 7.42874C14.2675 7.52725 14.255 7.62616 14.2238 7.71983L11.2162 16.7425C11.1663 16.8922 11.0705 17.0223 10.9425 17.1146C10.8145 17.2068 10.6607 17.2565 10.5029 17.2564Z" fill="white"></path><path d="M5.99161 17.2564C5.87252 17.2563 5.75518 17.2278 5.64921 17.1735C5.54325 17.1191 5.45169 17.0404 5.38206 16.9438C5.31243 16.8472 5.26672 16.7354 5.24868 16.6177C5.23064 16.5 5.24078 16.3797 5.27828 16.2667L8.28583 7.24404C8.31707 7.15037 8.36646 7.06376 8.43117 6.98917C8.49588 6.91458 8.57465 6.85346 8.66298 6.80932C8.75131 6.76517 8.84747 6.73885 8.94597 6.73186C9.04447 6.72488 9.14338 6.73736 9.23706 6.76861C9.33074 6.79985 9.41734 6.84923 9.49193 6.91394C9.56652 6.97865 9.62764 7.05742 9.67179 7.14575C9.71594 7.23408 9.74225 7.33024 9.74924 7.42874C9.75622 7.52725 9.74374 7.62616 9.7125 7.71983L6.70497 16.7425C6.65503 16.8922 6.55927 17.0223 6.43124 17.1146C6.30322 17.2068 6.14941 17.2565 5.99161 17.2564Z" fill="white"></path><path d="M15.0143 17.2564C14.8952 17.2563 14.7778 17.2278 14.6719 17.1735C14.5659 17.1191 14.4743 17.0404 14.4047 16.9438C14.3351 16.8472 14.2894 16.7354 14.2713 16.6177C14.2533 16.5 14.2634 16.3797 14.3009 16.2667L17.3084 7.24403C17.3724 7.05596 17.5082 6.90085 17.6862 6.81258C17.8641 6.7243 18.0698 6.71003 18.2583 6.77288C18.4467 6.83572 18.6026 6.97058 18.692 7.148C18.7813 7.32543 18.7968 7.53099 18.7351 7.71982L15.7276 16.7425C15.6777 16.8921 15.5819 17.0223 15.4539 17.1146C15.3258 17.2068 15.1721 17.2564 15.0143 17.2564Z" fill="white"></path><path d="M121.07 6.76392C119.841 6.76509 118.774 7.06461 118.08 7.7184V7.51503C118.079 7.31641 117.999 7.12633 117.858 6.9863C117.717 6.84628 117.527 6.76769 117.328 6.76769C117.129 6.76769 116.939 6.84628 116.798 6.9863C116.657 7.12633 116.577 7.31641 116.576 7.51503V16.5409C116.577 16.7395 116.657 16.9296 116.798 17.0696C116.939 17.2097 117.129 17.2883 117.328 17.2883C117.527 17.2883 117.717 17.2097 117.858 17.0696C117.999 16.9296 118.079 16.7395 118.08 16.5409V11.5631C118.08 9.33085 118.82 8.27054 121.05 8.26761C121.246 8.25942 121.432 8.17915 121.573 8.04217C121.713 7.90519 121.798 7.72114 121.812 7.52532C121.813 7.42648 121.795 7.32827 121.759 7.23637C121.723 7.14447 121.668 7.0607 121.599 6.9899C121.53 6.9191 121.448 6.86268 121.357 6.82389C121.266 6.7851 121.168 6.76472 121.07 6.76392Z" fill="white"></path><path d="M38.553 17.2928C38.3988 17.2928 38.2484 17.2453 38.1221 17.1569C37.9958 17.0686 37.8997 16.9435 37.8468 16.7987L35.2717 9.74276L32.7578 16.7935C32.7199 16.9482 32.6273 17.084 32.4972 17.1758C32.367 17.2676 32.208 17.3091 32.0496 17.2928C31.8954 17.2928 31.745 17.2453 31.6187 17.1569C31.4924 17.0686 31.3963 16.9435 31.3434 16.7987L28.0507 7.77647C28.0167 7.68367 28.0012 7.58506 28.0053 7.4863C28.0094 7.38753 28.033 7.29055 28.0746 7.20089C28.1162 7.11123 28.1751 7.03066 28.2479 6.96379C28.3207 6.89692 28.406 6.84505 28.4989 6.81117C28.5917 6.77729 28.6904 6.76205 28.7891 6.76633C28.8879 6.77061 28.9848 6.79432 29.0744 6.8361C29.164 6.87788 29.2444 6.93692 29.3112 7.00984C29.3779 7.08276 29.4296 7.16812 29.4634 7.26104L32.0416 14.3251L34.5265 7.35586C34.5539 7.23237 34.612 7.11778 34.6954 7.0227C34.7788 6.92762 34.8849 6.85513 35.0038 6.81194C35.1227 6.76875 35.2505 6.75626 35.3755 6.77561C35.5005 6.79497 35.6186 6.84556 35.7189 6.92269C35.8459 7.02055 35.9388 7.15593 35.9844 7.3096L38.545 14.3252L41.0606 7.27002C41.0938 7.17702 41.1449 7.09147 41.2112 7.01824C41.2774 6.94502 41.3574 6.88555 41.4466 6.84325C41.5358 6.80094 41.6325 6.77662 41.7311 6.77168C41.8297 6.76673 41.9283 6.78126 42.0213 6.81443C42.1143 6.84759 42.1999 6.89875 42.2731 6.96499C42.3463 7.03122 42.4058 7.11122 42.4481 7.20043C42.4904 7.28965 42.5147 7.38632 42.5197 7.48493C42.5246 7.58354 42.5101 7.68216 42.4769 7.77515L39.2614 16.7937C39.2187 16.9457 39.1249 17.0783 38.9959 17.1692C38.8669 17.2601 38.7105 17.3038 38.553 17.2928Z" fill="white"></path><path d="M49.4924 6.76319C48.442 6.72516 47.4125 7.064 46.59 7.7185V3.00393C46.5888 2.80531 46.5091 2.61523 46.3682 2.47521C46.2273 2.33519 46.0368 2.25659 45.8382 2.25659C45.6395 2.25659 45.449 2.33519 45.3081 2.47521C45.1672 2.61523 45.0875 2.80531 45.0863 3.00393V16.5409C45.0875 16.7396 45.1672 16.9296 45.3081 17.0697C45.449 17.2097 45.6395 17.2883 45.8382 17.2883C46.0368 17.2883 46.2273 17.2097 46.3682 17.0697C46.5091 16.9296 46.5888 16.7396 46.59 16.5409V10.9439C46.5922 10.67 46.694 8.26683 49.4924 8.26683C51.9804 8.26683 52.0758 10.6083 52.0784 10.8719V16.5408C52.0784 16.7402 52.1576 16.9314 52.2986 17.0724C52.4396 17.2134 52.6308 17.2926 52.8302 17.2926C53.0296 17.2926 53.2209 17.2134 53.3619 17.0724C53.5029 16.9314 53.5821 16.7402 53.5821 16.5408V10.8719C53.5821 9.45049 52.7275 6.76319 49.4924 6.76319Z" fill="white"></path><path d="M73.7634 15.7891C72.4936 15.7891 71.9987 15.2318 71.9987 13.8008V8.2669H73.7634C73.9628 8.2669 74.154 8.18769 74.295 8.04669C74.436 7.90569 74.5152 7.71446 74.5152 7.51505C74.5152 7.31565 74.436 7.12442 74.295 6.98342C74.154 6.84242 73.9628 6.76321 73.7634 6.76321H71.9987V5.12514C71.9987 4.92574 71.9195 4.7345 71.7785 4.5935C71.6375 4.45251 71.4462 4.37329 71.2468 4.37329C71.0474 4.37329 70.8562 4.45251 70.7152 4.5935C70.5742 4.7345 70.495 4.92574 70.495 5.12514V6.76321H69.3191C69.1197 6.76321 68.9285 6.84242 68.7875 6.98342C68.6465 7.12442 68.5673 7.31565 68.5673 7.51505C68.5673 7.71446 68.6465 7.90569 68.7875 8.04669C68.9285 8.18769 69.1197 8.2669 69.3191 8.2669H70.495V13.8008C70.495 16.8392 72.5427 17.2928 73.7633 17.2928C73.9627 17.2928 74.1539 17.2136 74.2949 17.0726C74.4359 16.9316 74.5151 16.7403 74.5151 16.5409C74.5151 16.3415 74.4359 16.1503 74.2949 16.0093C74.1539 15.8683 73.9627 15.7891 73.7633 15.7891H73.7634Z" fill="white"></path><path d="M81.0129 17.6474C80.0152 17.6444 79.0552 17.2655 78.3242 16.5864C77.5933 15.9072 77.1451 14.9776 77.069 13.9827C77.0555 13.7843 77.1211 13.5885 77.2515 13.4384C77.3819 13.2882 77.5665 13.1958 77.7649 13.1814C77.9633 13.1671 78.1593 13.2319 78.31 13.3617C78.4607 13.4915 78.5539 13.6757 78.569 13.8741C78.6042 14.3497 78.7775 14.8048 79.0675 15.1834C79.3576 15.5621 79.7518 15.8478 80.2019 16.0057C80.652 16.1635 81.1384 16.1866 81.6014 16.0721C82.0644 15.9575 82.4839 15.7104 82.8085 15.3609C83.1331 15.0114 83.3486 14.5748 83.4287 14.1046C83.5087 13.6344 83.4498 13.1511 83.2592 12.7138C83.0686 12.2766 82.7545 11.9045 82.3555 11.6432C81.9565 11.3819 81.4899 11.2427 81.0129 11.2427C80.9142 11.2427 80.8164 11.2232 80.7252 11.1855C80.634 11.1477 80.5511 11.0923 80.4813 11.0225C80.4115 10.9527 80.3561 10.8698 80.3183 10.7786C80.2805 10.6873 80.2611 10.5896 80.2611 10.4908C80.2611 10.3921 80.2805 10.2943 80.3183 10.2031C80.3561 10.1119 80.4115 10.029 80.4813 9.95921C80.5511 9.88939 80.634 9.83401 80.7252 9.79623C80.8164 9.75844 80.9142 9.739 81.0129 9.739C81.4056 9.73905 81.7898 9.62449 82.1184 9.40937C82.447 9.19426 82.7056 8.88793 82.8626 8.52796C83.0196 8.16799 83.0681 7.77002 83.0023 7.38287C82.9364 6.99572 82.759 6.6362 82.4917 6.34842C82.2245 6.06063 81.8791 5.85709 81.4979 5.76274C81.1167 5.6684 80.7162 5.68735 80.3456 5.81729C79.975 5.94722 79.6504 6.18248 79.4116 6.49423C79.1727 6.80597 79.03 7.18063 79.001 7.57228C78.9859 7.77066 78.8928 7.95496 78.7421 8.08482C78.5914 8.21469 78.3953 8.27953 78.1969 8.26516C77.9985 8.25078 77.8138 8.15836 77.6834 8.00812C77.5529 7.85789 77.4874 7.66209 77.501 7.46361C77.5433 6.88253 77.7291 6.32101 78.0417 5.82938C78.3543 5.33776 78.7841 4.93137 79.2924 4.64666C79.8007 4.36194 80.3717 4.20779 80.9542 4.19801C81.5368 4.18823 82.1126 4.32313 82.6302 4.59062C83.1478 4.85812 83.5909 5.24984 83.9199 5.7307C84.2488 6.21156 84.4533 6.76652 84.5151 7.34586C84.5769 7.92519 84.4939 8.5108 84.2737 9.05019C84.0535 9.58959 83.7029 10.0659 83.2533 10.4365C83.9486 10.9145 84.4727 11.6024 84.749 12.3996C85.0254 13.1968 85.0394 14.0614 84.789 14.8672C84.5387 15.6729 84.0371 16.3774 83.3577 16.8776C82.6782 17.3779 81.8566 17.6476 81.0128 17.6474L81.0129 17.6474Z" fill="white"></path><path d="M97.7745 17.2928C97.6203 17.2927 97.4699 17.2453 97.3436 17.1569C97.2173 17.0685 97.1212 16.9434 97.0683 16.7986L94.4929 9.74271L91.9792 16.7935C91.9272 16.9391 91.8316 17.0651 91.7054 17.1545C91.5792 17.2438 91.4286 17.2921 91.274 17.2928H91.2711C91.1169 17.2927 90.9665 17.2453 90.8402 17.1569C90.7138 17.0685 90.6177 16.9435 90.5648 16.7987L87.2719 7.77644C87.204 7.58921 87.2131 7.38267 87.2973 7.20216C87.3815 7.02165 87.5339 6.88193 87.721 6.81365C87.9081 6.74538 88.1146 6.75415 88.2953 6.83802C88.476 6.92189 88.6159 7.07402 88.6846 7.26101L91.2628 14.325L93.7476 7.3558C93.775 7.23232 93.8331 7.11773 93.9165 7.02266C94 6.92758 94.106 6.8551 94.2249 6.81191C94.3438 6.76872 94.4717 6.75622 94.5967 6.77558C94.7216 6.79493 94.8397 6.84551 94.94 6.92263C95.067 7.02049 95.1599 7.15587 95.2055 7.30955L97.7662 14.3252L100.282 7.26996C100.315 7.17697 100.366 7.09141 100.432 7.01819C100.499 6.94496 100.579 6.8855 100.668 6.84319C100.757 6.80089 100.854 6.77657 100.952 6.77162C101.051 6.76668 101.149 6.7812 101.242 6.81437C101.335 6.84754 101.421 6.8987 101.494 6.96493C101.567 7.03116 101.627 7.11117 101.669 7.20038C101.712 7.28959 101.736 7.38626 101.741 7.48487C101.746 7.58349 101.731 7.6821 101.698 7.7751L98.4828 16.7937C98.4308 16.9392 98.3352 17.0653 98.209 17.1546C98.0829 17.2439 97.9322 17.2922 97.7776 17.2929L97.7745 17.2928Z" fill="white"></path><path d="M108.707 17.2928C107.666 17.2928 106.648 16.9841 105.783 16.4058C104.917 15.8275 104.243 15.0055 103.844 14.0438C103.446 13.0822 103.342 12.024 103.545 11.003C103.748 9.98213 104.249 9.04436 104.985 8.30832C105.721 7.57229 106.659 7.07104 107.68 6.86797C108.701 6.6649 109.759 6.76913 110.721 7.16747C111.682 7.56581 112.504 8.24038 113.083 9.10587C113.661 9.97136 113.97 10.9889 113.97 12.0298C113.968 13.4251 113.413 14.7628 112.426 15.7495C111.44 16.7361 110.102 17.2911 108.707 17.2928ZM108.707 8.27054C107.963 8.27054 107.236 8.49102 106.618 8.90409C106 9.31717 105.518 9.90428 105.233 10.5912C104.949 11.2781 104.874 12.034 105.02 12.7632C105.165 13.4924 105.523 14.1623 106.048 14.688C106.574 15.2137 107.244 15.5718 107.973 15.7168C108.702 15.8619 109.458 15.7874 110.145 15.5029C110.832 15.2184 111.419 14.7365 111.832 14.1183C112.245 13.5001 112.466 12.7733 112.466 12.0298C112.465 11.0332 112.068 10.0777 111.363 9.37292C110.659 8.66818 109.703 8.27173 108.707 8.27054Z" fill="white"></path><path d="M132.54 2.25208C132.442 2.25205 132.344 2.27147 132.253 2.30925C132.161 2.34702 132.078 2.4024 132.009 2.47222C131.939 2.54204 131.883 2.62494 131.846 2.71617C131.808 2.8074 131.788 2.90518 131.788 3.00392V8.28185C131.335 7.80577 130.79 7.42616 130.187 7.16582C129.583 6.90548 128.933 6.76978 128.276 6.76685C125.51 6.76685 123.26 9.12814 123.26 12.0298C123.26 14.9315 125.51 17.2928 128.276 17.2928C128.933 17.2898 129.583 17.1541 130.187 16.8938C130.79 16.6335 131.335 16.2539 131.788 15.7778V16.5409C131.79 16.7395 131.869 16.9296 132.01 17.0696C132.151 17.2097 132.342 17.2883 132.54 17.2883C132.739 17.2883 132.929 17.2097 133.07 17.0696C133.211 16.9296 133.291 16.7395 133.292 16.5409V3.00392C133.292 2.90518 133.273 2.8074 133.235 2.71617C133.197 2.62494 133.142 2.54205 133.072 2.47223C133.002 2.40241 132.919 2.34703 132.828 2.30925C132.737 2.27148 132.639 2.25205 132.54 2.25208ZM128.276 15.7891C126.339 15.7891 124.763 14.1026 124.763 12.0298C124.763 9.95707 126.339 8.27055 128.276 8.27055C130.213 8.27055 131.788 9.95709 131.788 12.0298C131.788 14.1025 130.213 15.7891 128.276 15.7891Z" fill="white"></path><path d="M65.2198 6.76685C65.121 6.76682 65.0233 6.78625 64.932 6.82402C64.8408 6.86179 64.7579 6.91717 64.6881 6.98699C64.6183 7.05681 64.5629 7.13971 64.5251 7.23094C64.4873 7.32217 64.4679 7.41995 64.4679 7.51869V8.29195C64.0141 7.81274 63.4679 7.43053 62.8622 7.16841C62.2565 6.9063 61.6039 6.76973 60.944 6.76696C58.1782 6.76696 55.9277 9.12824 55.9277 12.0299C55.9277 14.9316 58.1782 17.2929 60.944 17.2929C61.6039 17.2901 62.2565 17.1535 62.8622 16.8914C63.4679 16.6293 64.0141 16.2471 64.4679 15.7679C64.4679 15.7679 64.5239 15.6286 64.4679 16.541C64.4691 16.7396 64.5489 16.9297 64.6897 17.0697C64.8306 17.2098 65.0212 17.2884 65.2198 17.2884C65.4184 17.2884 65.609 17.2098 65.7498 17.0697C65.8907 16.9297 65.9704 16.7396 65.9716 16.541V7.51869C65.9717 7.41995 65.9522 7.32217 65.9145 7.23095C65.8767 7.13972 65.8213 7.05682 65.7515 6.987C65.6817 6.91718 65.5988 6.8618 65.5075 6.82403C65.4163 6.78625 65.3185 6.76682 65.2198 6.76685ZM60.944 15.7891C59.0071 15.7891 57.4314 14.1026 57.4314 12.0298C57.4314 9.95706 59.0071 8.27054 60.944 8.27054C62.8809 8.27054 64.4562 9.95709 64.4562 12.0298C64.4562 14.1025 62.8805 15.7891 60.944 15.7891Z" fill="white"></path><path d="M139.541 17.2858C137.975 17.2858 136.683 16.6117 135.997 15.4362C135.899 15.2681 135.865 15.0699 135.902 14.8786C135.939 14.6873 136.044 14.516 136.198 14.3966C136.272 14.3435 136.357 14.307 136.447 14.2894C136.537 14.2719 136.629 14.2738 136.718 14.2949C136.807 14.3161 136.89 14.356 136.962 14.412C137.034 14.4681 137.093 14.5389 137.136 14.6198C137.402 15.016 137.762 15.3408 138.183 15.5657C138.604 15.7907 139.073 15.9089 139.551 15.91C140.807 15.91 141.607 15.3801 141.607 14.5342C141.607 13.6857 140.683 13.3306 139.283 12.6866C137.706 11.9612 136.174 11.4504 136.145 9.54096C136.126 8.26561 137.433 6.88909 139.427 6.76942C140.652 6.69378 141.855 7.17502 142.493 7.85828C142.626 8.00123 142.703 8.18668 142.711 8.38139C142.719 8.57609 142.658 8.7673 142.537 8.92072C142.482 8.99253 142.411 9.05147 142.33 9.09352C142.249 9.13557 142.161 9.15975 142.07 9.16443C141.979 9.1691 141.888 9.15416 141.803 9.12061C141.719 9.08706 141.642 9.03569 141.579 8.96999C140.026 7.51516 137.517 8.20199 137.517 9.54104C137.517 10.3547 138.663 10.8057 139.8 11.3159C140.909 11.8137 143 12.5979 143 14.5344C143 15.7842 141.91 17.2858 139.541 17.2858Z" fill="white"></path></svg>'
    royalMailLogo =
      '<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 192.756 192.756"><g fill-rule="evenodd" clip-rule="evenodd"><path fill="#fff" d="M0 0h192.756v192.756H0V0z"/><path fill="#fff" stroke="#ee2722" stroke-width="1.289" stroke-miterlimit="2.613" d="M64.619 33.917h63.613v124.921H64.619V33.917z"/><path d="M94.822 46.76h3.153c-.133-.095-.244-.21-.373-.337-.547-.553-.457-1.183-.234-1.409s.846.038 1.393.59c.139.135.256.276.355.417V42.11a3.465 3.465 0 0 1-.336.393c-.547.553-1.17.815-1.395.59-.223-.226.037-.858.584-1.408.135-.136.262-.255.396-.354h-3.846c.126.093.258.209.381.335.547.549.807 1.182.584 1.408-.224.226-.847-.038-1.394-.59a3.34 3.34 0 0 1-.353-.41v3.896c.095-.13.208-.258.334-.385.547-.553 1.17-.815 1.394-.591.224.226.313.856-.233 1.409a3.122 3.122 0 0 1-.41.357zM93.223 51.035c.3 1.488 1.604 2.612 3.166 2.612 1.564 0 2.869-1.122 3.168-2.612h-6.334zM99.555 49.722a3.263 3.263 0 0 0-2.545-2.548v2.548h2.545zM95.734 47.183a3.248 3.248 0 0 0-2.511 2.539h2.511v-2.539zM95.413 55.044a.98.98 0 0 1 .976-.983c.539 0 .977.441.977.983a.982.982 0 0 1-.977.986.98.98 0 0 1-.976-.986zM95.413 57.515a.98.98 0 0 1 .976-.983c.539 0 .977.441.977.983a.98.98 0 0 1-.977.985.98.98 0 0 1-.976-.985zM95.413 59.989a.98.98 0 0 1 .976-.986c.539 0 .977.441.977.986a.981.981 0 0 1-.977.983.98.98 0 0 1-.976-.983zM95.413 62.46a.98.98 0 0 1 .976-.986c.539 0 .977.44.977.986a.98.98 0 0 1-.977.983.979.979 0 0 1-.976-.983zM95.313 67.959c0-.6.481-1.083 1.076-1.083s1.076.483 1.076 1.083c0 .601-.482 1.087-1.076 1.087s-1.076-.486-1.076-1.087zM112.602 71.102c.377.128.859-.292 1.074-.94.217-.646.084-1.276-.293-1.403-.379-.127-.861.292-1.076.938-.217.648-.084 1.275.295 1.405zM80.176 71.102c-.379.128-.859-.292-1.076-.94-.215-.646-.083-1.276.295-1.403.379-.127.86.292 1.075.938.217.648.085 1.275-.294 1.405zM100.012 52.539a1.44 1.44 0 0 1 1.432-1.445c.789 0 1.428.648 1.428 1.445s-.639 1.442-1.428 1.442a1.436 1.436 0 0 1-1.432-1.442zM103.352 51.083c0-.798.639-1.443 1.428-1.443s1.432.646 1.432 1.443c0 .799-.643 1.445-1.432 1.445s-1.428-.646-1.428-1.445zM106.781 49.847c0-.799.639-1.445 1.43-1.445.789 0 1.43.646 1.43 1.445 0 .797-.641 1.443-1.43 1.443a1.435 1.435 0 0 1-1.43-1.443zM110.395 49.722c0-.797.641-1.445 1.43-1.445s1.43.648 1.43 1.445c0 .798-.641 1.445-1.43 1.445s-1.43-.647-1.43-1.445zM113.703 51.146c0-.797.639-1.445 1.43-1.445.789 0 1.428.648 1.428 1.445s-.639 1.443-1.428 1.443c-.791 0-1.43-.645-1.43-1.443zM116.02 54c0-.8.639-1.445 1.428-1.445s1.432.646 1.432 1.445c0 .796-.643 1.443-1.432 1.443s-1.428-.646-1.428-1.443zM116.863 57.52c0-.797.639-1.445 1.428-1.445.793 0 1.43.648 1.43 1.445 0 .798-.637 1.443-1.43 1.443a1.435 1.435 0 0 1-1.428-1.443zM116.674 61.134c0-.797.639-1.442 1.428-1.442s1.432.646 1.432 1.442-.643 1.445-1.432 1.445-1.428-.648-1.428-1.445zM115.73 64.593c0-.797.639-1.442 1.43-1.442.789 0 1.428.645 1.428 1.442 0 .797-.639 1.445-1.428 1.445-.791 0-1.43-.648-1.43-1.445zM89.915 52.539c0-.797.639-1.445 1.428-1.445s1.43.648 1.43 1.445-.641 1.442-1.43 1.442-1.428-.645-1.428-1.442zM86.574 51.083c0-.798.642-1.443 1.431-1.443s1.428.646 1.428 1.443c0 .799-.639 1.445-1.428 1.445a1.438 1.438 0 0 1-1.431-1.445zM83.145 49.847c0-.799.639-1.445 1.428-1.445.792 0 1.431.646 1.431 1.445 0 .797-.639 1.443-1.431 1.443a1.435 1.435 0 0 1-1.428-1.443zM79.532 49.722c0-.797.639-1.445 1.428-1.445.789 0 1.43.648 1.43 1.445 0 .798-.642 1.445-1.43 1.445a1.436 1.436 0 0 1-1.428-1.445zM76.224 51.146c0-.797.639-1.445 1.428-1.445.789 0 1.43.648 1.43 1.445s-.642 1.443-1.43 1.443a1.435 1.435 0 0 1-1.428-1.443zM73.907 54c0-.8.642-1.445 1.43-1.445.79 0 1.429.646 1.429 1.445 0 .796-.639 1.443-1.429 1.443-.788 0-1.43-.646-1.43-1.443zM73.063 57.52c0-.797.639-1.445 1.427-1.445.792 0 1.431.648 1.431 1.445 0 .798-.639 1.443-1.431 1.443a1.434 1.434 0 0 1-1.427-1.443zM73.252 61.134c0-.797.639-1.442 1.431-1.442.789 0 1.428.646 1.428 1.442s-.639 1.445-1.428 1.445a1.438 1.438 0 0 1-1.431-1.445zM74.196 64.593c0-.797.639-1.442 1.428-1.442.792 0 1.431.645 1.431 1.442 0 .797-.639 1.445-1.431 1.445a1.437 1.437 0 0 1-1.428-1.445z" fill="#ee2722"/><path d="M83.921 65.791c-.427.292-.853 1.942.684 3.202.3-.696.644-.766.965-.696s.573.242.747.898l2.159-.167c.034-.568.287-.94.791-1.078.46-.085.873.138 1.218.672.316-.938.371-2.144.05-2.827l2.215-.003v4.676c1.052-1.802 2.545-2.009 2.682-.5.121 1.318-1.494 2.785-3.032 2.785s-2.595-.654-3.676-2.349l-2.16.167c-.389 1.299-2.411 2.574-4.294 1.903-.91-.325-1.548-.814-1.333-1.393.252-.671 1.094-.125 1.725.117 0 0-.896-2.994-1.333-4.272-.116.348-.645 1.626-1.333 1.23-.374-.212-.134-1.092.294-2.359l3.631-.006zm1.617 0c.129.327.284.659.468.996-.439-.536-.808-.839-1.117-.991l.649-.005zm3.169 0a3.236 3.236 0 0 0-.589.879c.066-.313.122-.605.166-.876l.423-.003zm6.232 0c.25.428.313.8.126.979-.3.284-1.134-.048-1.865-.744a5.004 5.004 0 0 1-.23-.234h1.969v-.001zm4.875 0a4.18 4.18 0 0 1-.23.234c-.73.696-1.564 1.028-1.865.744-.186-.179-.123-.551.127-.976l1.968-.002zm2.428 0c-.32.686-.266 1.892.051 2.83.344-.534.756-.757 1.217-.672.506.138.758.51.791 1.078l2.16.167c.172-.656.426-.829.746-.898s.666 0 .965.696c1.535-1.26 1.111-2.91.684-3.202h3.641c.428 1.272.668 2.152.295 2.365-.689.396-1.219-.882-1.334-1.23-.438 1.278-1.334 4.272-1.334 4.272.631-.242 1.471-.789 1.727-.117.215.579-.424 1.068-1.334 1.393-1.883.671-3.904-.604-4.297-1.903l-2.158-.167c-1.08 1.694-2.137 2.349-3.676 2.349-1.537 0-3.152-1.467-3.031-2.785.137-1.509 1.631-1.302 2.682.5v-4.676h2.205zm2.252 0c.045.274.1.566.164.879a3.176 3.176 0 0 0-.588-.876l.424-.003zm3.395 0c-.311.157-.68.46-1.117.996.184-.337.338-.669.467-.993l.65-.003z" fill="#ee2722"/><path d="M80.29 65.791c.092-.273.197-.571.303-.884l-2.31.706s-1.793-2.473-1.961-6.761c-.253-6.361 4.086-7.429 5.992-7.45 2.046-.024 2.988.51 4.871 1.254 1.885.741 3.193 1.854 6.913 2.274l-.252 1.854c-3.766 0-7.303-2.705-10.819-2.729-3.882-.026-4.41 3.89-4.362 5.096.044 1.206.113 2.484.917 4.18.16-.976.866-3.925 1.907-4.435 2.916-1.207 5.835-.186 5.835-.186 3.353-1.044 6.177-1.044 6.177-1.044l.013-3.853 1.31-.544v10.478h3.137V53.27l1.311.544.012 3.853s2.824 0 6.178 1.044c0 0 2.92-1.021 5.836.186 1.125.51 1.746 3.459 1.906 4.435.805-1.695.873-2.974.918-4.18.047-1.206-.482-5.122-4.363-5.096-3.516.024-7.053 2.729-10.818 2.729l-.252-1.854c3.721-.42 5.027-1.533 6.914-2.274 1.883-.744 2.822-1.278 4.867-1.254 1.908.021 6.248 1.089 5.994 7.45-.17 4.289-1.961 6.761-1.961 6.761l-2.309-.706c.105.313.207.611.303.89l-3.641-.005a.112.112 0 0 0-.039-.023c-.242-.117-.541-.163-.928.029l-.65-.005c.824-2.096.459-3.871-.996-5.037-1.799 1.671-2.164 2.572-1.748 5.04l-.424-.003c-.305-.31-.695-.56-1.137-.536-.318.018-.545.223-.691.539l-2.207-.003v-.265c-.068.09-.141.178-.221.265h-1.969c.152-.255.375-.536.652-.8.182-.172.35-.324.533-.446h-5.278c.184.122.353.273.534.446.276.264.5.542.652.803l-1.969-.003a3.83 3.83 0 0 1-.221-.265v.265h-2.215c-.147-.313-.374-.518-.692-.536-.441-.024-.831.226-1.136.539l-.423-.003c.416-2.465.051-3.366-1.748-5.037-1.455 1.166-1.82 2.94-.998 5.04l-.649-.003c-.387-.186-.684-.141-.928-.023a.164.164 0 0 0-.04.023h-3.63v-.003zM111.732 75.43l.277-2.702s-1 1.079-2.746 1.034c-1.746-.049-3.318-1.313-4.008-2.333-.139-.231-.334-.244-.484.011-1.057 1.44-1.998 2.495-4.57 2.495s-3.536-1.623-3.857-2.088c-.324.465-1.288 2.088-3.861 2.088-2.571 0-3.513-1.055-4.57-2.495-.15-.254-.345-.242-.484-.011-.688 1.021-2.262 2.285-4.007 2.333-1.747.045-2.746-1.034-2.746-1.034l.276 2.702h30.78zM81.504 82.952c-1.102 0-1.996-.851-1.996-1.899 0-1.05.895-1.899 1.996-1.899h29.675c1.105 0 2 .85 2 1.899s-.895 1.899-2 1.899H81.504zM83.595 78.39v-2.16h-2.643l-.917 1.068.917 1.092h2.643zM85.999 77.312c0-.651 1.042-1.18 2.322-1.18 1.283 0 2.324.529 2.324 1.18 0 .65-1.042 1.177-2.324 1.177-1.281 0-2.322-.527-2.322-1.177zM109.09 78.39v-2.16h2.642l.918 1.068-.918 1.092h-2.642zM102.043 77.312c0-.651 1.037-1.18 2.322-1.18 1.281 0 2.322.529 2.322 1.18 0 .65-1.041 1.177-2.322 1.177-1.285 0-2.322-.527-2.322-1.177zM93.424 76.23h5.836v2.158h-5.836V76.23zM2.834 91.552h187.088v46.37H2.834v-46.37z" fill="#ee2722"/><path d="M168.279 99.246c-1.213 0-2.195.994-2.195 2.221 0 1.225.982 2.223 2.195 2.223 1.215 0 2.199-.998 2.199-2.223a2.209 2.209 0 0 0-2.199-2.221zm0 2.9a.678.678 0 0 1-.674-.68c0-.377.303-.68.674-.68.373 0 .676.303.676.68 0 .376-.303.68-.676.68zM49.792 108.154a9.78 9.78 0 0 0-7-2.93c-5.457 0-9.896 4.486-9.896 10a9.99 9.99 0 0 0 2.898 7.07 9.779 9.779 0 0 0 6.997 2.93 9.78 9.78 0 0 0 7-2.93c1.87-1.891 2.898-4.4 2.898-7.07s-1.026-5.181-2.897-7.07zm-1.209 12.92a8.094 8.094 0 0 1-5.791 2.42 8.088 8.088 0 0 1-5.788-2.42 8.262 8.262 0 0 1-2.399-5.85c0-4.562 3.674-8.271 8.187-8.271 2.188 0 4.244.859 5.791 2.424a8.257 8.257 0 0 1 2.398 5.848 8.258 8.258 0 0 1-2.398 5.849z" fill="#fff"/><path d="M48.121 109.844a7.442 7.442 0 0 0-5.328-2.229 7.441 7.441 0 0 0-5.325 2.229 7.6 7.6 0 0 0-2.207 5.381c0 2.031.784 3.941 2.207 5.379a7.44 7.44 0 0 0 5.325 2.23c4.155 0 7.535-3.414 7.535-7.609a7.605 7.605 0 0 0-2.207-5.381zm-5.329 11.263a5.75 5.75 0 0 1-4.116-1.723c-1.099-1.113-1.706-2.59-1.706-4.16s.607-3.047 1.706-4.16a5.755 5.755 0 0 1 4.116-1.723c1.557 0 3.019.611 4.118 1.723a5.882 5.882 0 0 1 1.707 4.16c0 3.245-2.613 5.883-5.825 5.883zM69.382 105.801v17.469a6.492 6.492 0 0 1-1.886 4.596 6.35 6.35 0 0 1-4.549 1.906 6.369 6.369 0 0 1-4.55-1.906 6.483 6.483 0 0 1-1.72-3.154h-1.743a8.212 8.212 0 0 0 2.256 4.377 8.043 8.043 0 0 0 5.757 2.41c2.177 0 4.22-.855 5.759-2.41s2.385-3.619 2.385-5.818v-17.469h-1.709v-.001z" fill="#fff"/><path d="M62.947 123.631a7.733 7.733 0 0 0 4.068-1.17v.809c0 2.266-1.825 4.109-4.068 4.109a4.024 4.024 0 0 1-2.877-1.203 4.112 4.112 0 0 1-.923-1.465h-1.793a5.803 5.803 0 0 0 1.51 2.688 5.708 5.708 0 0 0 4.083 1.711c3.188 0 5.78-2.621 5.78-5.84v-5.223a6.965 6.965 0 0 1-1.352 1.957c-1.212 1.225-2.785 1.9-4.428 1.9a6.373 6.373 0 0 1-4.55-1.902 6.498 6.498 0 0 1-1.883-4.598V105.8h-1.709v9.604a8.21 8.21 0 0 0 2.385 5.816 8.044 8.044 0 0 0 5.757 2.411z" fill="#fff"/><path d="M58.863 119.531a5.7 5.7 0 0 0 4.083 1.711c3.132 0 5.78-2.787 5.78-6.084v-9.357h-1.711v9.357c0 2.322-1.898 4.357-4.068 4.357a4.025 4.025 0 0 1-2.877-1.205 4.108 4.108 0 0 1-1.191-2.906V105.8H57.17v9.604a5.823 5.823 0 0 0 1.693 4.127zM98.674 99.699h1.709v25.01h-1.709v-25.01zM96.307 99.699h1.709v25.01h-1.709v-25.01zM168.598 105.781h1.709v18.93h-1.709v-18.93zM166.23 105.781h1.709v18.93h-1.709v-18.93zM176.342 99.699h1.709v25.01h-1.709v-25.01zM173.979 99.699h1.709v25.01h-1.709v-25.01zM78.22 110.248c-1.378 1.393-2.138 3.244-2.138 5.213s.759 3.82 2.138 5.213a7.199 7.199 0 0 0 5.159 2.16c4.024 0 7.298-3.309 7.298-7.373v-7.373h-7.298a7.206 7.206 0 0 0-5.159 2.16zm10.748 5.213c0 3.113-2.506 5.646-5.588 5.646a5.522 5.522 0 0 1-3.95-1.654c-1.054-1.066-1.638-2.482-1.638-3.992s.584-2.926 1.638-3.994a5.53 5.53 0 0 1 3.95-1.652h5.588v5.646z" fill="#fff"/><path d="M83.379 105.697c-5.328 0-9.662 4.381-9.662 9.764a9.743 9.743 0 0 0 2.83 6.902 9.552 9.552 0 0 0 6.832 2.861 9.536 9.536 0 0 0 5.588-1.807v1.293h1.709v-6.059a8.01 8.01 0 0 1-1.673 2.492 7.869 7.869 0 0 1-5.625 2.35 7.862 7.862 0 0 1-5.622-2.35 8.035 8.035 0 0 1-2.33-5.684c0-4.432 3.568-8.035 7.952-8.035h7.952v17.285h1.712v-19.014h-9.663v.002zM147.996 110.248c-1.377 1.393-2.137 3.244-2.137 5.213s.76 3.82 2.137 5.213a7.204 7.204 0 0 0 5.16 2.16c4.023 0 7.297-3.309 7.297-7.373v-7.373h-7.297a7.208 7.208 0 0 0-5.16 2.16zm10.748 5.213c0 3.113-2.506 5.646-5.588 5.646a5.516 5.516 0 0 1-3.949-1.654c-1.059-1.066-1.639-2.482-1.639-3.992s.58-2.926 1.639-3.994a5.522 5.522 0 0 1 3.949-1.652h5.588v5.646z" fill="#fff"/><path d="M153.156 105.697c-5.328 0-9.662 4.381-9.662 9.764a9.739 9.739 0 0 0 2.83 6.902 9.55 9.55 0 0 0 6.832 2.861 9.536 9.536 0 0 0 5.588-1.807v1.293h1.709v-6.059a8.02 8.02 0 0 1-1.676 2.492 7.856 7.856 0 0 1-5.621 2.35 7.864 7.864 0 0 1-5.623-2.35 8.035 8.035 0 0 1-2.33-5.684c0-4.432 3.568-8.035 7.953-8.035h7.951v17.285h1.709v-19.014h-9.66v.002zM26.638 115.785a7.822 7.822 0 0 0 2.522-1.719c1.626-1.643 2.596-3.986 2.596-6.268a8.372 8.372 0 0 0-2.407-5.84c-1.503-1.518-3.463-2.322-5.667-2.322h-8.667v25.037h1.709v-23.309h6.958c1.741 0 3.282.629 4.458 1.816 1.194 1.205 1.906 2.932 1.906 4.617 0 1.807-.805 3.74-2.095 5.045-1.149 1.16-2.604 1.777-4.21 1.793l7.023 10.029h2.096l-6.222-8.879z" fill="#fff"/><path d="M22.478 113.979h1.205c3.724 0 5.709-3.59 5.709-6.18 0-1.516-.642-3.066-1.715-4.15-1.049-1.061-2.432-1.621-3.995-1.621h-6.303v22.646h1.712v-20.918h4.591c1.115 0 2.054.373 2.785 1.115a4.252 4.252 0 0 1 1.212 2.928c0 1.867-1.388 4.453-3.997 4.453h-4.509l8.693 12.414h2.096l-7.484-10.687zM138.021 99.705h-1.732l4.412 25.043h1.737l-4.417-25.043zM126.723 114.627l-6.84-14.922h-1.879l8.719 19.033 8.718-19.033h-1.879l-6.839 14.922zM111.008 124.748h1.738l4.412-25.043h-1.744l-4.406 25.043z" fill="#fff"/><path fill="#fff" d="M126.723 120.314l-9.049-19.759-4.264 24.193h1.736l3.258-18.482 8.319 18.162 8.32-18.162 3.254 18.482h1.74l-4.264-24.193-9.05 19.759z"/></g></svg>'
    afdLogo =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841 438" width="24px" height="24px" x="0px" y="0px" style="enable-background:new 0 0 841.9 438.9;" xml:space="preserve"><style type="text/css">.st0{fill:#2273B9;}.st1{fill:#10437C;}.st2{fill:#03A29A;}.st3{fill:#878787;}</style><g><path class="st0" d="M652,199.7c7.1,6.7,18.2,6.7,25.3-0.1L765,115c-0.8-4.6-4.8-8.1-9.6-8.1H574.2c-5,0-9.1,3.8-9.7,8.7L652,199.7z"/><g><path class="st1" d="M567.9,249.8l56.7-56.9l-60.1-57.8v107.3C564.4,245.4,565.8,248,567.9,249.8z"/><path class="st1" d="M762,249.6c1.9-1.8,3.2-4.3,3.2-7.2V134.5l-60.2,58.2L762,249.6z"/></g><path class="st2" d="M755.4,252.2c2.6,0,4.9-1,6.6-2.6l-57-56.8l-17.8,17.2c-6.3,6-14.4,9-22.5,9c-8.1,0-16.1-3-22.4-9l-17.7-17l-56.7,56.9c1.7,1.5,3.9,2.4,6.3,2.4L755.4,252.2L755.4,252.2z"/><g><path class="st0" d="M670.1,344.5l-170.9-0.7V172.3c0-94.2,76.7-170.9,170.9-170.9c94.2,0,170.9,76.7,170.9,170.9C840.9,267.2,764.3,344.5,670.1,344.5z M513.2,329.9l156.9,0.6c86.5,0,156.8-71,156.8-158.2c0-86.5-70.4-156.9-156.9-156.9c-86.5,0-156.9,70.4-156.9,156.9L513.2,329.9L513.2,329.9z"/></g><g><path class="st0" d="M127.8,211.9c-13.4-11.1-30.6-17.8-49.3-17.8C35.7,194.1,1,228.8,1,271.6s34.8,77.5,77.5,77.5c18.7,0,35.9-6.7,49.3-17.8v13.3H156V192.2h-28.1V211.9z M78.5,320.9c-27.2,0-49.3-22.1-49.3-49.3s22.1-49.4,49.3-49.4s49.4,22.1,49.4,49.4S105.7,320.9,78.5,320.9z"/><path class="st0" d="M275.7,166.7l1.5-28.3c-28.6-1.5-51,5.3-66.6,20c-14.4,13.7-22.5,33.7-23.8,59.6l0,0v126.6h28.1v-98.5H277V218h-61.7c1.1-17.6,6.1-30.7,14.8-39C239.8,169.7,255.1,165.6,275.7,166.7z"/><path class="st0" d="M444,138.6v-0.7h-28.1v74c-13.4-11.1-30.6-17.8-49.4-17.8c-42.7,0-77.5,34.8-77.5,77.5s34.8,77.5,77.5,77.5c18.9,0,36.1-6.8,49.6-18v13.5h28L444,138.6L444,138.6z M366.5,320.9c-27.2,0-49.4-22.1-49.4-49.3s22.1-49.4,49.4-49.4c27.2,0,49.4,22.1,49.4,49.4C415.8,298.8,393.7,320.9,366.5,320.9z"/></g><g><path class="st3" d="M37,437.5c-10.3,0-17.6-5.8-17.8-14.2h7.2c0.4,4.3,3.5,8.6,10.6,8.6c6.5,0,10.3-3.7,10.3-8.6c0-13.9-27.8-5-27.8-24.1c0-8.5,6.9-14.2,17-14.2c9.8,0,16.2,5.4,17,13.2h-7.4c-0.4-3.5-3.7-7.4-10-7.4c-5.5-0.1-9.9,2.7-9.9,8.3c0,13.3,27.7,5,27.7,24C54.1,430.3,48.1,437.5,37,437.5z"/><path class="st3" d="M94.6,437.5c-14.5,0-25.8-10.8-25.8-26.2c0-15.4,11.4-26.2,25.8-26.2c14.5,0,25.8,10.8,25.8,26.2C120.4,426.7,109.1,437.5,94.6,437.5z M94.6,431.7c10.8,0,19-7.9,19-20.4c0-12.6-8.1-20.4-19-20.4s-19,7.8-19,20.4C75.7,423.8,83.8,431.7,94.6,431.7z"/><path class="st3" d="M136.7,385.6h29.1v5.5h-22.3v17.3h18.1v5.5h-18.1V437h-6.7L136.7,385.6L136.7,385.6z"/><path class="st3" d="M178,385.6h34.8v5.5h-14V437h-6.7v-45.9H178L178,385.6L178,385.6z"/><path class="st3" d="M224.5,385.6h7.2l11.2,43.6l12.4-43.6h7.5l11.8,43.4l11.3-43.4h7.2L278.2,437h-7.5l-11.9-41.4L246.3,437l-7.4,0.1L224.5,385.6z"/><path class="st3" d="M338.2,425.6h-22.4l-4.1,11.4h-7.1l18.6-51.1h7.7l18.5,51.1h-7.1L338.2,425.6z M327,394.2l-9.3,26h18.6L327,394.2z"/><path class="st3" d="M381.4,385.6c12.1,0,17.9,6.7,17.9,15.1c0,6.6-3.6,12.8-12.2,14.7L400,437h-8l-12.2-21h-8.1v21h-6.7v-51.4L381.4,385.6L381.4,385.6z M381.4,391.1h-9.9v19.5h9.9c7.6,0,10.9-4.1,10.9-9.9C392.4,394.9,389.1,391.1,381.4,391.1z"/><path class="st3" d="M444.7,391.1h-20.9v17.2h18.7v5.5h-18.7v17.7h20.9v5.5h-27.6v-51.5h27.6V391.1z"/></g></g></svg>'
  }
  var Pe = (d, t) => {
    try {
      let e = {}
      if (
        (t ? (e = t) : typeof afdOptions < 'u' && (e = afdOptions),
        (e = jQuery.extend(!0, {}, G, e)),
        (e.typeahead.containers.length === 0
          ? jQuery(document)
          : d.closest(e.typeahead.containers.toString())
        ).find('[data-afd-control="typeahead"]').length > 1 &&
          console.warn(
            'More than one instance of `typeahead` detected. If these are in separate containers please define the containers in `afdOptions.typeahead.containers`'
          ),
        !d.is('input'))
      )
        throw new Error(
          `<${d.prop('tagName').toLowerCase()}> is not a valid tag for [data-afd-control="typeahead"], use <input>`
        )
      let o
      try {
        o = new Mt(d, e)
      } catch (u) {
        throw (
          (console.error('Failed to create AfdTypeahead instance:', u),
          jQuery(document).trigger('afd:typeaheadConstructorError', u),
          u)
        )
      }
      jQuery(document)
        .off('afd:init.afd')
        .on('afd:init.afd', () => {
          try {
            o.init()
          } catch (u) {
            throw (
              (console.error('Error during typeahead init event:', u),
              jQuery(document).trigger('afd:typeaheadInitError', u),
              u)
            )
          }
        })
      try {
        o.init()
      } catch (u) {
        throw (
          (console.error('Error during initial typeahead init:', u),
          jQuery(document).trigger('afd:typeaheadInitError', u),
          u)
        )
      }
    } catch (e) {
      throw (
        (console.error('Error in typeahead initialization:', e),
        jQuery(document).trigger('afd:typeaheadError', e),
        e)
      )
    }
  }
  var Ft = class extends Y(Q) {
    constructor(t, e, s) {
      super(t, s),
        (this.controlType = this.options.reverseGeocode.linkedControl
          ? this.options.reverseGeocode.linkedControl
          : 'reverseGeocode'),
        (this.originalControlType = 'reverseGeocode'),
        (this.$button = t),
        (this.$resultList = e),
        (function (o) {
          ;(jQuery.browser = jQuery.browser || {}).mobile =
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
              o
            ) ||
            /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
              o.substr(0, 4)
            )
        })(navigator.userAgent || navigator.vendor || window.opera),
        this.setFields(),
        (this.isReverseGeocode = !0)
    }
    init = () => {
      this.hideResultsElement(this.$resultList, this.options)
      let t = this.eventHandler
      t(this.$button, 'click', this.onButtonClick),
        t(jQuery(document), 'afd:initFields', this.onAfdInitFields),
        t(this.$resultList, 'keydown', this.onKeyDownResult),
        t(this.$resultList, 'keyup', this.onKeyUpResult),
        t(this.$resultList, 'change', this.onChangeResult),
        !jQuery.browser.mobile &&
          this.options.reverseGeocode.hideOnDesktop &&
          (this.$resultList.remove(),
          this.options.reverseGeocode.buttonContainer
            ? this.$button
                .closest(this.options.reverseGeocode.buttonContainer)
                .remove()
            : this.$button.remove()),
        this.$resultList.hide()
      try {
        this.initFields(), this.checkVisibilityByCountry(this.country)
      } catch (e) {
        console.error('Error initisalising reverseGeocode controls'),
          console.error(e)
      }
    }
    setupReverseGeocodeRequestOptions = (t, e) => {
      this.requestOptions = this.setupParams({
        data: 'address',
        fields: this.options.reverseGeocode.postcodeFirst ? 'list' : 'fflist',
        task: 'nearest',
        maxquantity: this.options.reverseGeocode.maxItems,
        longitude: t,
        latitude: e
      })
    }
    onAfdInitFields = () => {
      this.setFields()
    }
    onCountryChangedLocal = (t) => {
      this.checkVisibilityByCountry(t)
    }
    checkVisibilityByCountry = (t) => {
      ;['gb', 'gbr', 'GB', 'GBR', 'United Kingdom'].indexOf(t) > -1
        ? (this.$button.show(),
          this.$container.find('[data-afd-control="reverseGeocode"]').show())
        : (this.$button.hide(),
          this.$container.find('[data-afd-control="reverseGeocode"]').hide())
    }
    onButtonClick = (t) => {
      t.preventDefault(),
        navigator.geolocation.getCurrentPosition(
          (e) => {
            this.setupReverseGeocodeRequestOptions(
              e.coords.longitude,
              e.coords.latitude
            ),
              jQuery.ajax(this.requestOptions).then((s) => {
                ;(this.results = typeof s.Item < 'u' ? s.Item : []),
                  this.populateResultsList()
              })
          },
          (e) => {
            this.$button.hide(),
              this.$errorField
                .text(
                  'We were unable to get your location from your device.  Search for your address or enter it manually'
                )
                .show(),
              console.error(e)
          }
        )
    }
    onGeolocationSuccess = (t) => {
      ;(this.position = t),
        typeof this.typeaheadOptions < 'u' &&
          ((this.typeaheadOptions.source.lookup.ajax.data.longitude =
            t.coords.longitude),
          (this.typeaheadOptions.source.lookup.ajax.data.latitude =
            t.coords.latitude),
          this.$element.typeahead(this.typeaheadOptions))
    }
    onGeolocationError = (t) => {
      ;(this.position = null), console.log(t)
    }
  }
  var _e = (d, t, e) => {
    let s = {}
    e ? (s = e) : typeof afdOptions < 'u' && (s = afdOptions),
      (s = jQuery.extend(!0, {}, G, s))
    let o =
      s.reverseGeocode.containers.length === 0
        ? jQuery(document)
        : d.closest(s.reverseGeocode.containers.toString())
    if (o.find('[data-afd-control="reverseGeocodeButton"]').length > 1)
      throw 'More than one instance of `reverseGeocodeButton` detected.  If these are in separate containers please define the containers in `afdOptions.reverseGeocode.containers'
    if (!d.is('a, button'))
      throw (
        '<' +
        d.prop('tagName').toLowerCase() +
        '> is not a valid tag for `reverseGeocodeButton`, use either <a> or <button>'
      )
    let u = o.find('[data-afd-control="reverseGeocodeResultsList"]'),
      y = o.find('[data-afd-control="reverseGeocodeResultsList"]').length
    if (y === 0)
      throw 'Could not find an instance of `reverseGeocodeResultsList`.  If afdoptions.[controlType].containers is set have you included the results list inside the supplied container?'
    if (y > 1)
      throw 'More than one instance of `reverseGeocodeResultsList` found'
    if (!u.is('select, ul'))
      throw (
        '<' +
        u.prop('tagName').toLowerCase() +
        '> is not a valid tag for `reverseGeocodeResultsList`, use <select> or <ul>'
      )
    let w = new Ft(d, u, s)
    jQuery(document)
      .off('afd:init.afd')
      .on('afd:init.afd', () => {
        w.init()
      }),
      w.init()
  }
  var Tt = class extends Y(Q) {
    constructor(t, e, s, o) {
      super(t, o),
        (this.$lookupButton = t),
        (this.$element = t),
        (this.$lookupField = e),
        (this.$resultList = s),
        (this.controlType = 'lookup'),
        this.setFields(),
        (this.preFetchRequests = []),
        (this.results = []),
        (this.blockChange = !1),
        (this.uniqueID = this.getUniqueID())
    }
    init() {
      this.hideResultsElement(this.$resultList, this.options)
      let t = this.eventHandler
      t(this.$lookupButton, 'click', this.onClickButton),
        t(this.$lookupField, 'keydown', this.onKeydownField),
        t(this.$lookupField, 'keyup', this.onKeyupField),
        t(this.$resultList, 'keydown', this.onKeyDownResult),
        t(this.$resultList, 'keyup', this.onKeyUpResult),
        t(this.$resultList, 'change', this.onChangeResult),
        t(this.$searchAgainButton, 'click', this.onAfdSearchAgainButtonClick),
        this.options.lookup.manualInputButton &&
          (t(
            this.$manualInputButton,
            'click',
            this.onAfdManualInputButtonClick
          ),
          t(
            this.$manualInputSearchButton,
            'click',
            this.onAfdManualInputSearchButtonClick
          )),
        this.initFields(),
        this.initFieldsLookup()
      let e = this.getInitialCountry()
      this.handleHideShowControls(e)
    }
    onClickButton = (t) => {
      t.preventDefault(), this.handleLookup()
    }
    onKeydownField = () => {
      this.hideResultsElement()
    }
    onKeyupField = (t) => {
      if (
        (this.$lookupButton.attr('disabled', !t.target.value.length),
        (t.keyCode ? t.keyCode : t.which) === 13)
      )
        t.preventDefault(), this.handleLookup()
      else if (this.options.lookup.prefetch) {
        let s = this.addressLookup(t.target.value)
        this.preFetchRequests.push(s),
          s.then((o, u, y) => {
            this.handlePCEError(o.Result, o.ErrorText),
              y.lookup === t.target.value &&
                ((this.results = typeof o.Item < 'u' ? o.Item : []),
                jQuery(document).trigger('afd:pcePrefetchComplete', [
                  o,
                  y,
                  y.lookup
                ]),
                this.$element.trigger('afd:pcePrefetchComplete', [
                  o,
                  y,
                  y.lookup
                ]))
          })
      }
    }
    hideResultsElement = () => {
      this.$resultList.closest('.afd-form-control').hide()
    }
    initFieldsLookup = () => {
      this.options.lookup.beforeHideResults &&
        (this.hideResultFields(),
        this.options.lookup.postcodeIsLookup &&
          (this.options.lookup.parentClass
            ? jQuery('[data-afd-result="Postcode"]')
                .closest('.' + this.options.lookup.parentClass)
                .show()
            : jQuery('[data-afd-result="Postcode"]').show()))
    }
    handleLookup = () => {
      let t = this.options.postcodeIsLookup
        ? jQuery('[data-afd-result="Postcode"]').val()
        : jQuery('[data-afd-control="lookupField"]').val()
      this.options.lookup.prefetch
        ? (this.preFetchRequests.length === 0 &&
            this.$lookupField.trigger('keyup'),
          Promise.all(this.preFetchRequests).then(() => {
            this.populateResultsList(),
              jQuery(document).trigger('afd:lookupComplete', [this.results]),
              this.$element.trigger('afd:lookupComplete', [this.results])
          }))
        : this.addressLookup(t).then((s) => {
            this.handlePCEError(s.Result, s.ErrorText),
              (this.results = typeof s.Item < 'u' ? s.Item : []),
              this.populateResultsList(),
              jQuery(document).trigger('afd:lookupComplete', [this.results]),
              this.$element.trigger('afd:lookupComplete', [this.results])
          })
    }
  }
  function Re(d, t) {
    let e = {}
    t ? (e = t) : typeof afdOptions < 'u' && (e = afdOptions),
      (e = jQuery.extend(!0, {}, G, e)),
      d.each(function (s, o) {
        let u = jQuery(o),
          y =
            e.lookup.containers.length === 0
              ? jQuery(document)
              : u.closest(e.lookup.containers.toString())
        if (y.find('[data-afd-control="lookupButton"]').length > 1)
          throw 'More than one instance of `lookupButton` detected.  If these are in separate containers please define the containers in `afdOptions.lookup.containers'
        if (!u.is('a, button'))
          throw (
            '<' +
            u.prop('tagName').toLowerCase() +
            '> is not a valid tag for `lookupButton`, use either <a> or <button>'
          )
        let w = ''
        if (e.lookup.postcodeIsLookup) {
          if (
            ((w = y.find('[data-afd-result="Postcode"]')),
            y.find('[data-afd-result="Postcode"]').length === 0)
          )
            throw 'Could not find an instance of `Postcode` field.  If afdOptions.lookup.containers is set, have you included the lookup field inside the supplied container?'
          if (!w.is('input'))
            throw (
              '<' +
              u.prop('tagName').toLowerCase() +
              '> is not a valid tag for `Postcode`, use <input>'
            )
        } else {
          if (
            ((w = y.find('[data-afd-control="lookupField"]')),
            y.find('[data-afd-control="lookupField"]').length === 0)
          )
            throw 'Could not find an instance of `lookupField`.  If afdOptions.lookup.containers is set, have you included the lookup field inside the supplied container?'
          if (!w.is('input'))
            throw (
              '<' +
              u.prop('tagName').toLowerCase() +
              '> is not a valid tag for `lookupField`, use <input>'
            )
        }
        let I = y.find('[data-afd-control="lookupResultsList"]'),
          b = y.find('[data-afd-control="lookupResultsList"]').length
        if (b === 0)
          throw 'Could not find an instance of `lookupResultsList`.  If afdOptions.lookup.containers is set, have you included the results list inside the supplied container?'
        if (b > 1) throw 'More than one instance of `lookupResultsList` found'
        if (!I.is('select, ul'))
          throw (
            '<' +
            u.prop('tagName').toLowerCase() +
            '> is not a valid tag for `lookupResultsList`, use <select> or <ul>'
          )
        let M = new Tt(u, w, I, e)
        jQuery(document)
          .off('afd:init.afd')
          .on('afd:init.afd', () => {
            M.init()
          }),
          M.init()
      })
  }
  var $t = class extends Y(Q) {
    constructor(e, s) {
      super(e, s)
      this.countryListElements = []
      this.getCountries = async () => {
        let { selectIPCountry: e, mostUsedCountries: s } = this.options.country
        jQuery(document).trigger('afd:getCountriesStart')
        let o = new Promise((y) => {
            this.externalResolver = y
          }),
          u = this.setupParams({
            format: 'json',
            data: 'list',
            task: 'listcountryinfo',
            fields: 'standard',
            countryISO: 'FRA',
            ...(e ? { iploc: 1 } : {}),
            ...(s ? { preferredCountries: s } : {})
          })
        return (
          jQuery
            .ajax(u)
            .done((y) => this.handleGetCountries(y))
            .fail((y) => {
              console.error('Ajax request failed:', y),
                jQuery(document).trigger('afd:error', y),
                this.externalResolver(null)
            }),
          o
        )
      }
      this.handleGetCountries = (e) => {
        let { preferredCountries: s, availableCountries: o } =
            this.options.country,
          u = e.Item,
          y = new Set(
            s.flatMap((g) => {
              let i = this.iso2ToIso3(g)
              return i ? [i] : []
            })
          ),
          w = new Set(
            o.flatMap((g) => {
              let i = this.iso2ToIso3(g)
              return i ? [i] : []
            })
          ),
          I = [],
          [b, M] = u.reduce(
            ([g, i], n) => {
              if (w.size && !w.has(n.iso)) return [g, i]
              let a = {
                name: n.name,
                iso3: n.iso,
                iso2: this.iso3ToIso2(n.iso)
              }
              return n.PreferredCountry
                ? (I.push(a), [g, i])
                : ((y.has(n.iso) ? g : i).push(a), [g, i])
            },
            [[], []]
          )
        if (
          ((this.fullCountryList = [...I, ...b, ...M]),
          this.$element[0].tagName === 'SELECT')
        ) {
          if (
            (this.fullCountryList.map((g) => {
              this.$element.append(
                jQuery('<option />').val(g.iso3).text(g.name)
              )
            }),
            e.IPCountryISO3)
          ) {
            this.$element.val(e.IPCountryISO3),
              jQuery(document).trigger(
                'afd:getCountriesComplete',
                this.fullCountryList
              ),
              this.externalResolver()
            return
          }
          if (this.options.country.defaultCountry) {
            this.$element.val(this.options.country.defaultCountry),
              this.$element.trigger('afd:countryChanged', [
                this.$element.val()
              ]),
              this.externalResolver(),
              $(document).trigger(
                'afd:getCountriesComplete',
                this.fullCountryList
              )
            return
          }
          this.options.defaultCountry &&
            (this.$element.val(this.options.defaultCountry),
            this.$element.trigger('afd:countryChanged', [this.$element.val()]),
            this.externalResolver(),
            $(document).trigger(
              'afd:getCountriesComplete',
              this.fullCountryList
            ))
        } else {
          this.eventHandler(this.$element, 'focusin', this.onFocusIn),
            this.eventHandler(this.$element, 'focusout', this.onFocusOut),
            this.eventHandler(this.$element, 'keyup', this.onKeyUp),
            this.eventHandler(this.$element, 'keydown', this.onKeyDown)
          let g =
            e.IPCountryISO2 ||
            this.options.country.defaultCountry ||
            this.options.defaultCountry ||
            'GB'
          ;(this.selectedAFDCountry =
            this.iso3ToAFDCountry(this.fullCountryList, g) ||
            this.iso2ToAFDCountry(this.fullCountryList, g)),
            (this.country =
              this.selectedAFDCountry.iso2 || this.fullCountryList[0].iso2),
            this.createCountryList()
        }
        jQuery(document).trigger(
          'afd:getCountriesComplete',
          this.fullCountryList
        ),
          this.externalResolver()
      }
      this.createCountryList = () => {
        this.intialiseInputElement(),
          this.initialiseWrapper(),
          this.initialiseCountryList(),
          this.createCountryListItems(),
          this.element.insertAdjacentElement(
            'afterend',
            this.countryListContainer
          )
      }
      this.intialiseInputElement = () => {
        let e = this.element
        ;(e.className = this.element.className + ' afd-country-input'),
          (e.value = this.selectedAFDCountry.name),
          (e.autocomplete = 'new-password'),
          (e.dataset.selectedCountry = this.selectedAFDCountry.iso3)
      }
      this.initialiseWrapper = () => {
        ;(this.elementWrapper = document.createElement('div')),
          (this.elementWrapper.className = `afd-country-input-wrapper iti__${this.selectedAFDCountry.iso2.toLowerCase()}`)
        let e = this.element.parentNode
        if (!e) throw new Error('parent is null')
        e.insertBefore(this.elementWrapper, this.element),
          this.elementWrapper.appendChild(this.element),
          (this.elementFlag = document.createElement('div')),
          (this.elementFlag.className = 'afd-country-input-flag')
      }
      this.initialiseCountryList = () => {
        ;(this.countryListContainer = document.createElement('div')),
          (this.countryListContainer.className = 'afd-country-list-container'),
          (this.countryListContainer.style.display = 'none')
      }
      this.createCountryListItems = () => {
        this.fullCountryList.forEach((e) => {
          let s = document.createElement('div')
          ;(s.className = `afd-country-item afd-country-item-${e.iso2.toLowerCase()} afd-country-item-${e.iso3.toLowerCase()}`),
            this.eventHandler(jQuery(s), 'mousedown', () => {
              this.selectCountry(e)
            })
          let o = document.createElement('div')
          o.className = `afd-country-item-flag iti__${e.iso2.toLowerCase()}`
          let u = document.createElement('div')
          ;(u.className = 'afd-country-item-text'),
            (u.textContent = e.name),
            s.appendChild(o),
            s.appendChild(u),
            this.countryListElements.push(s),
            this.countryListContainer.appendChild(s),
            this.eventHandler(
              jQuery(s),
              'mouseEnter',
              this.onCountryItemMouseEnter
            )
        })
      }
      this.onFocusIn = () => {
        let e = this.element
        ;(e.value = ''),
          (this.countryListContainer.style.display = 'block'),
          this.countryListElements.findIndex(
            (o) => o.style.display !== 'none'
          ) !== -1 &&
            this.countryListElements.forEach((o) =>
              o.classList.remove('active')
            )
      }
      this.onFocusOut = () => {
        ;(this.countryListContainer.style.display = 'none'),
          (this.highlightedIndex = 0)
      }
      this.onKeyUp = (e) => {
        e.key === 'ArrowUp' ||
          e.key === 'ArrowDown' ||
          e.key === 'Enter' ||
          this.filterCountries(e.target.value)
      }
      this.onKeyDown = (e) => {
        let s = this.countryListElements
          .map((u, y) => (u.style.display !== 'none' ? y : -1))
          .filter((u) => u !== -1)
        if (!s.length) return
        let o = this.highlightedIndex ?? s[0]
        if (e.key === 'ArrowDown') {
          e.preventDefault()
          let u = s.find((y) => y > o) ?? s[0]
          this.updateActiveItem(u)
        } else if (e.key === 'ArrowUp') {
          e.preventDefault()
          let u = s.slice().reverse(),
            y = u.find((w) => w < o) ?? u[0]
          this.updateActiveItem(y)
        } else if (e.key === 'Enter') {
          e.preventDefault()
          let u = this.fullCountryList[this.highlightedIndex]
          u && this.selectCountry(u)
        }
      }
      this.onCountryItemMouseEnter = (e) => {
        this.countryListElements.forEach((o) => {
          o.classList.remove('active')
        })
        let s = e.target
        s.classList.add('active'),
          (this.highlightedIndex = this.countryListElements.indexOf(s))
      }
      this.filterCountries = (e) => {
        this.countryListElements.forEach((s) => {
          ;(s.textContent?.toLowerCase() || '').includes(e.toLowerCase())
            ? (s.style.display = 'flex')
            : (s.style.display = 'none')
        }),
          this.resetActiveItem()
      }
      this.selectCountry = (e) => {
        let s = this.element
        ;(s.value = e.name),
          (this.countryListContainer.style.display = 'none'),
          this.$element.data('selectedCountry', e.iso3),
          jQuery(s).trigger('change', [e.iso3]),
          (this.elementWrapper.className = `afd-country-input-wrapper iti__${e.iso2.toLowerCase()}`),
          (this.selectedAFDCountry = e)
      }
      this.updateActiveItem = (e) => {
        this.countryListElements.forEach((s) => s.classList.remove('active')),
          this.countryListElements[e].style.display !== 'none' &&
            (this.countryListElements[e].classList.add('active'),
            (this.highlightedIndex = e))
      }
      this.resetActiveItem = () => {
        this.countryListElements.forEach((s) => s.classList.remove('active'))
        let e = this.countryListElements.findIndex(
          (s) => s.style.display !== 'none'
        )
        e !== -1 &&
          (this.countryListElements[e].classList.add('active'),
          (this.highlightedIndex = e))
      }
      this.controlType = 'country'
    }
    init() {
      return this.$element.addClass('afd-country'), this.getCountries()
    }
  }
  var Oe = (d, t, e) => {
    let s = {}
    if (
      (t ? (s = t) : typeof afdOptions < 'u' && (s = afdOptions),
      (s = jQuery.extend(!0, {}, G, s)),
      ['SELECT', 'INPUT'].indexOf(d.prop('tagName')) === -1)
    )
      throw 'Country control should be either INPUT or SELECT'
    try {
      new $t(d, s).init().then(() => {
        e()
      })
    } catch (o) {
      console.error('Error initialising country control'), console.error(o)
    }
  }
  var Dt = class extends Y(Q) {
    constructor(e, s) {
      super(e, s)
      this.init = () => {
        let e = this.eventHandler
        e(this.$element, 'submit', this.onSubmitForm),
          e(jQuery(document), 'afd:triggerCleanse', this.onTriggerCleanse)
      }
      this.cleanseAddress = async () => {
        let { options: e, $resultFields: s } = this,
          { serial: o, password: u, token: y, id: w, cleanse: I } = e,
          { pceUrl: b, serial: M, password: g, id: i, token: n } = I,
          a = new URLSearchParams('format=json')
        if (M && g) a.append('serial', M), a.append('password', g)
        else if (i && n) a.append('id', i), a.append('token', n)
        else if (o && u) a.append('serial', o), a.append('password', u)
        else if (y && w) a.append('token', y), a.append('id', w)
        else throw 'No valid authentication provided'
        let f = ''
        s.each((c, v) => {
          let S = jQuery(v).data('afd-result'),
            L = jQuery(v).val()
          S && ((f += f ? '@' : ''), (f += S)),
            L && a.append(`address${c + 1}`, L)
        }),
          a.append('fields', f)
        let m = `${b}?${a.toString()}`
        try {
          return await (await fetch(m)).json()
        } catch (c) {
          throw (console.error('Error calling Refiner API:', c), c)
        }
      }
      this.handleCleanseResponse = async (e) => {
        let s = e.ResultCode
        return (
          s === 100 ||
            s === void 0 ||
            (s > 0 &&
              (await this.openCleanseModal(e)) &&
              ((this.result = e),
              this.$resultFields.each(this.populateResult))),
          !0
        )
      }
      this.openCleanseModal = async (e) =>
        new Promise((s) => {
          let {
              message: o,
              yesButtonText: u,
              noButtonText: y
            } = this.options.cleanse,
            w = document.createElement('div')
          w.className = 'afd-modal-overlay'
          let I = document.createElement('div')
          I.className = 'afd-modal'
          let b = document.createElement('p')
          ;(b.className = 'afd-modal-message'),
            (b.textContent = o),
            I.appendChild(b)
          let M = document.createElement('p')
          ;(M.className = 'afd-modal-address-suggestion'),
            this.$resultFields.each((a, f) => {
              let m = jQuery(f).data('afd-result')
              m &&
                (M.textContent +=
                  e[m] +
                  `
`)
            }),
            I.appendChild(M)
          let g = document.createElement('div')
          g.className = 'afd-modal-button-container'
          let i = document.createElement('button')
          ;(i.className = 'afd-modal-yes-button afd-modal-button'),
            (i.textContent = u)
          let n = document.createElement('button')
          ;(n.className = 'afd-modal-no-button afd-modal-button'),
            (n.textContent = y),
            g.appendChild(i),
            g.appendChild(n),
            I.appendChild(g),
            w.appendChild(I),
            document.body.appendChild(w),
            i.addEventListener('click', () => {
              document.body.removeChild(w), s(!0)
            }),
            n.addEventListener('click', () => {
              document.body.removeChild(w), s(!1)
            })
        })
      this.onSubmitForm = async (e) => {
        e.preventDefault()
        let s = this.element
        await this.onTriggerCleanse(),
          this.$element.off('submit.afd'),
          s.submit()
      }
      this.onTriggerCleanse = async () => {
        let e = await this.cleanseAddress()
        await this.handleCleanseResponse(e)
      }
      ;(this.controlType = 'cleanse'), this.setFields()
    }
  }
  function Ve(d, t) {
    let e = {}
    t ? (e = t) : typeof afdOptions < 'u' && (e = afdOptions),
      (e = jQuery.extend(!0, {}, G, e))
    let s = new Dt(d, e)
    jQuery(document)
      .off('afd:init.afd')
      .on('afd:init.afd', () => {
        s.init()
      }),
      s.init()
  }
  var Li = () => {
    window.afdInitScripts || (window.afdInitScripts = {}),
      (window.afdInitScripts.account = Gt),
      (window.afdInitScripts.card = Ee),
      (window.afdInitScripts.email = Fe),
      (window.afdInitScripts.phone = De),
      (window.afdInitScripts.typeahead = Pe),
      (window.afdInitScripts.reverseGeocodeButton = _e),
      (window.afdInitScripts.lookupButton = Re),
      (window.afdInitScripts.country = Oe),
      (window.afdInitScripts.cleanse = Ve),
      Ut()
  }
  Li()
})()
/*!
 * jQuery Typeahead
 * Copyright (C) 2018 RunningCoder.org
 * Licensed under the MIT license
 *
 * @author Tom Bertrand
 * @version 2.10.6 (2018-7-30)
 * @link http://www.runningcoder.org/jquerytypeahead/
 */
