(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery')) :
      typeof define === 'function' && define.amd ? define(['jquery'], factory) :
          (factory(global.$));
}(this, (function ($$1) { 'use strict';

  $$1 = $$1 && $$1.hasOwnProperty('default') ? $$1['default'] : $$1;

  $ = jQuery;
  
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var classCallCheck = _classCallCheck;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var createClass = _createClass;

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  var arrayWithHoles = _arrayWithHoles;

  function _iterableToArrayLimit(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  var iterableToArrayLimit = _iterableToArrayLimit;

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

  var nonIterableRest = _nonIterableRest;

  function _slicedToArray(arr, i) {
    return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
  }

  var slicedToArray = _slicedToArray;

  var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function unwrapExports (x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
    return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var _typeof_1 = createCommonjsModule(function (module) {
    function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

    function _typeof(obj) {
      if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
        module.exports = _typeof = function _typeof(obj) {
          return _typeof2(obj);
        };
      } else {
        module.exports = _typeof = function _typeof(obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
        };
      }

      return _typeof(obj);
    }

    module.exports = _typeof;
  });

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  var assertThisInitialized = _assertThisInitialized;

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof_1(call) === "object" || typeof call === "function")) {
      return call;
    }

    return assertThisInitialized(self);
  }

  var possibleConstructorReturn = _possibleConstructorReturn;

  var getPrototypeOf = createCommonjsModule(function (module) {
    function _getPrototypeOf(o) {
      module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
      return _getPrototypeOf(o);
    }

    module.exports = _getPrototypeOf;
  });

  var setPrototypeOf = createCommonjsModule(function (module) {
    function _setPrototypeOf(o, p) {
      module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o;
      };

      return _setPrototypeOf(o, p);
    }

    module.exports = _setPrototypeOf;
  });

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) setPrototypeOf(subClass, superClass);
  }

  var inherits = _inherits;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var defineProperty = _defineProperty;

  var tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  // Thanks to:
  // http://fightingforalostcause.net/misc/2006/compare-email-regex.php
  // http://thedailywtf.com/Articles/Validating_Email_Addresses.aspx
  // http://stackoverflow.com/questions/201323/what-is-the-best-regular-expression-for-validating-email-addresses/201378#201378
  var validate = function(email)
  {
    if (!email)
      return false;

    if(email.length>254)
      return false;

    var valid = tester.test(email);
    if(!valid)
      return false;

    // Further checking of some things regex can't handle
    var parts = email.split("@");
    if(parts[0].length>64)
      return false;

    var domainParts = parts[1].split(".");
    if(domainParts.some(function(part) { return part.length>63; }))
      return false;

    return true;
  };

  var AfdControl = function AfdControl($el, options) {
    var _this = this;

    classCallCheck(this, AfdControl);

    defineProperty(this, "setupParams", function (requestOptions) {
      var defaultData = {
        format: 'json'
      };

      if (_this.options.serial && _this.options.password) {
        defaultData.serial = _this.options.serial;
        defaultData.password = _this.options.password;
      } else if (_this.options.token && _this.options.id) {
        defaultData.token = _this.options.token;
        defaultData.id = _this.options.id;
      } else {
        throw 'You must either supply password and serial, or token and id';
      } // check to see if default country


      if (_this.options.defaultCountry) {
        defaultData.countryiso = _this.options.defaultCountry;
      }

      if (_this.options.country.defaultCountry) {
        defaultData.countryiso = _this.options.country.defaultCountry;
      } // Check to see if there is a country control, if so WA will be activated


      var $countryField = $('[data-afd-control="country"]');

      if ($countryField.length > 0) {
        defaultData.countryiso = $countryField.val();
      } // checks to see if there is a custom country control and whether or not a function is supplied to turn the value into ISO3


      if (_this.options.country.customCountryControl) {
        var customCountryControl = $(_this.options.country.customCountryControl);

        if (_this.options.country.customCountryConverter) {
          if (typeof _this.options.country.customCountryConverter !== 'function') {
            throw 'customCountryConverter Must be a function';
          }

          defaultData.countryiso = _this.options.country.customCountryConverter(customCountryControl.val());
        } else {
          defaultData.countryiso = customCountryControl.val();
        }
      }

      try {
        return {
          method: 'GET',
          url: _this.options.pceUrl,
          error: function error(err, errText, errThrown) {
            console.log(err);
            console.log(errText);
            console.log(errThrown);
            $(document).trigger('afd:pceError', err);
          },
          data: $.extend(true, {}, defaultData, requestOptions),
          // callback and beforesend are only applicable when the request sequence module is used
          callback: typeof _this.requestCallback !== 'undefined' ? {
            done: _this.requestCallback
          } : null,
          beforeSend: typeof _this.beforeSend !== 'undefined' ? _this.beforeSend : null
        };
      } catch (err) {
        console.error('Error setting up request');
        console.error(err);
      }
    });

    defineProperty(this, "eventHandler", function ($element, event, handler) {
      $element.off(event + '.afd', handler).on(event + '.afd', handler);
    });

    this.$element = $el;

    if (typeof $el.data('afd-additional-options') !== 'undefined') {
      var customOptions = window[$el.data('afd-additional-options')];
      this.options = $.extend(true, {}, options, customOptions);
    } else {
      this.options = options;
    }
  };

  var afdValidationMixin = function afdValidationMixin(Base) {
    var _temp;

    return _temp =
        /*#__PURE__*/
        function (_Base) {
          inherits(_temp, _Base);

          function _temp() {
            var _getPrototypeOf2;

            var _this;

            classCallCheck(this, _temp);

            for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
              args[_key] = arguments[_key];
            }

            _this = possibleConstructorReturn(this, (_getPrototypeOf2 = getPrototypeOf(_temp)).call.apply(_getPrototypeOf2, [this].concat(args)));

            defineProperty(assertThisInitialized(assertThisInitialized(_this)), "handleInvalid", function (message) {
              var $el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
              var element = $el ? $el[0] : _this.$element[0];
              var $element = $el ? $el : _this.$element;
              element.setCustomValidity(message); // If user wants to use browser native validation messages then report the failure now

              if (_this.options.nativeValidationMessages === true) {
                element.reportValidity();
              } // Add afd Invalid class


              $element.removeClass('afd-valid').addClass('afd-invalid'); // Bootstrap 3 Validation

              $element.parent('.form-group').addClass('has-error').removeClass('has-success'); // Bootstrap 4 Validation

              $element.parent().addClass('was-validated');
              $element.siblings('.invalid-feedback').first().html(element.validationMessage); // trigger validation complete event

              $$1(document).trigger('afd:validateComplete', {
                valid: false,
                validationMessage: message
              });
            });

            defineProperty(assertThisInitialized(assertThisInitialized(_this)), "handleValid", function () {
              var $el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
              var element = $el ? $el[0] : _this.$element[0];
              var $element = $el ? $el : _this.$element;
              element.setCustomValidity(''); //Add afd Valid class

              $element.addClass('afd-valid').removeClass('afd-invalid'); // Bootstrap 3 Validation

              $element.parent('.form-group').removeClass('has-error').addClass('has-success'); // Bootstrap 4 Validation

              $element.parent().addClass('was-validated');
              $element.siblings('.invalid-feedback').first().html(element.validationMessage); // trigger validation complete event

              $$1(document).trigger('afd:validateComplete', {
                valid: true,
                validationMessage: null
              });
            });

            defineProperty(assertThisInitialized(assertThisInitialized(_this)), "clearValidation", function () {
              var $el = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
              var element = $el ? $el[0] : _this.$element[0];
              var $element = $el ? $el : _this.$element;
              element.setCustomValidity('');
              $element.parent('.form-group').removeClass('has-error').removeClass('has-success'); // Add afd Invalid class

              $element.removeClass('afd-valid').removeClass('afd-invalid'); // Bootstrap 4 Validation

              $element.parent().removeClass('was-validated');
            });

            return _this;
          }

          createClass(_temp, [{
            key: "validateCard",
            value: function validateCard(card, expiry) {
              var requestOptions = this.setupParams({
                cardNumber: card,
                expiryDate: expiry,
                data: 'bank',
                task: 'card',
                fields: 'card',
                afdc: this.options.afdc
              });
              return $$1.ajax(requestOptions);
            }
          }]);

          return _temp;
        }(Base), _temp;
  };

  var AfdEmail =
      /*#__PURE__*/
      function (_afdValidationMixin) {
        inherits(AfdEmail, _afdValidationMixin);

        function AfdEmail(_$element, options) {
          var _this;

          classCallCheck(this, AfdEmail);

          _this = possibleConstructorReturn(this, getPrototypeOf(AfdEmail).call(this, _$element, options));

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onKeyUp", function () {
            var $element = _this.$element;
            var email = $element.val();
            $element.data('email-is-afd-valid', false);
            $element.data('email-pce-message', 'Syntax not valid'); // check to see if we can locally confirm email address via regex

            if (validate(email)) {
              $element.data('email-is-regex-valid', true);
              $element.data('email-pce-message', 'Regex valid, not yet queried PCE');
            } else {
              $element.data('email-is-regex-valid', false); // this.handleInvalid(this.options.email.invalidEmailMessage);

              $(document).trigger('afd:emailValidationUpdated', _this.$element);
            }

            _this.clearValidation();

            $(document).trigger('afd:emailValidationUpdated', _this.$element);
          });

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onFocusOut", function () {
            var $element = _this.$element;
            var email = $element.val(); // first check to see if we can locally confirm email address via regex

            if (validate(email)) {
              $element.data('email-is-regex-valid', true);
              $(document).trigger('afd:emailValidationStarted', [$element]); // if it is a correctly structured email address then check against PCE

              var pceValid = _this.validateEmail(email);

              pceValid.then(function (data) {
                if (data.Result === '1') {
                  var _data$Item = slicedToArray(data.Item, 1),
                      item = _data$Item[0];

                  _this.handleValid();

                  $element.data('email-is-afd-valid', true);
                  $element.data('email-pce-message', item.Status);
                  $(document).trigger('afd:emailValidationUpdatedFocusOut', [$element]);
                } else if (data.Result === '-2') {
                  _this.handleInvalid(data.ErrorText);

                  $element.data('email-is-afd-valid', false);
                  $element.data('email-pce-message', data.ErrorText);
                  $(document).trigger('afd:emailValidationUpdated', [$element]);
                  $(document).trigger('afd:emailValidationUpdatedFocusOut', [$element]);
                }

                $(document).trigger('afd:emailValidationSuccess', [data, $element]);
              }).fail(function (err) {
                console.error(err);
                $(document).trigger('afd:emailValidationError', [err]);
              });
            } else {
              $element.data('email-is-regex-valid', false);

              _this.handleInvalid(_this.options.email.invalidEmailMessage);

              $(document).trigger('afd:emailValidationUpdatedFocusOut', [$element.get()[0]]);
              $(document).trigger('afd:emailValidationUpdated', [$element.get()[0]]);
            }

            $(document).trigger('afd:emailValidationUpdated', $element);
          });

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "validateEmail", function (email) {
            var requestOptions = _this.setupParams({
              data: 'email',
              task: 'live',
              fields: 'standard',
              email: email,
              afdc: _this.options.afdc
            });

            return $.ajax(requestOptions);
          });

          return _this;
        }

        createClass(AfdEmail, [{
          key: "init",
          value: function init() {
            var event = this.eventHandler;
            event(this.$element, 'keyup', this.onKeyUp);
            event(this.$element, 'focusout', this.onFocusOut);
          }
        }]);

        return AfdEmail;
      }(afdValidationMixin(AfdControl));

  var lib = createCommonjsModule(function (module, exports) {
    (function(){var h,aa=this;function l(a){return "string"==typeof a}function m(a,b){a=a.split(".");var c=aa;a[0]in c||!c.execScript||c.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)a.length||void 0===b?c[d]&&c[d]!==Object.prototype[d]?c=c[d]:c=c[d]={}:c[d]=b;}
      function n(a,b){function c(){}c.prototype=b.prototype;a.wa=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.Ca=function(a,c,f){for(var d=Array(arguments.length-2),e=2;e<arguments.length;e++)d[e-2]=arguments[e];return b.prototype[c].apply(a,d)};}function q(a,b){null!=a&&this.a.apply(this,arguments);}q.prototype.b="";q.prototype.set=function(a){this.b=""+a;};q.prototype.a=function(a,b,c){this.b+=String(a);if(null!=b)for(var d=1;d<arguments.length;d++)this.b+=arguments[d];return this};function r(a){a.b="";}q.prototype.toString=function(){return this.b};var t=Array.prototype.indexOf?function(a,b,c){return Array.prototype.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(l(a))return l(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return -1},ba=Array.prototype.filter?function(a,b,c){return Array.prototype.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,g=l(a)?a.split(""):a,k=0;k<d;k++)if(k in g){var p=g[k];b.call(c,p,k,a)&&(e[f++]=p);}return e},ca=Array.prototype.map?
          function(a,b,c){return Array.prototype.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=l(a)?a.split(""):a,g=0;g<d;g++)g in f&&(e[g]=b.call(c,f[g],g,a));return e};function da(a){return Array.prototype.concat.apply([],arguments)}function ea(a,b){a.sort(b||fa);}function fa(a,b){return a>b?1:a<b?-1:0}function ha(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b}function ia(a,b){this.b=a;this.a={};for(a=0;a<b.length;a++){var c=b[a];this.a[c.a]=c;}}function ja(a){a=ha(a.a);ea(a,function(a,c){return a.a-c.a});return a}function ka(a,b){this.a=a;this.g=!!b.v;this.b=b.c;this.j=b.type;this.i=!1;switch(this.b){case la:case ma:case na:case oa:case pa:case qa:case ra:this.i=!0;}this.f=b.defaultValue;}var ra=1,qa=2,la=3,ma=4,na=6,oa=16,pa=18;function u(){this.b={};this.f=this.h().a;this.a=this.g=null;}h=u.prototype;h.has=function(a){return v(this,a.a)};h.get=function(a,b){return w(this,a.a,b)};h.set=function(a,b){x(this,a.a,b);};h.add=function(a,b){sa(this,a.a,b);};function ta(a,b){for(var c=ja(a.h()),d=0;d<c.length;d++){var e=c[d],f=e.a;if(v(b,f)){a.a&&delete a.a[e.a];var g=11==e.b||10==e.b;if(e.g){e=y(b,f);for(var k=0;k<e.length;k++)sa(a,f,g?e[k].clone():e[k]);}else e=z(b,f),g?(g=z(a,f))?ta(g,e):x(a,f,e.clone()):x(a,f,e);}}}
      h.clone=function(){var a=new this.constructor;a!=this&&(a.b={},a.a&&(a.a={}),ta(a,this));return a};function v(a,b){return null!=a.b[b]}function z(a,b){var c=a.b[b];if(null==c)return null;if(a.g){if(!(b in a.a)){var d=a.g,e=a.f[b];if(null!=c)if(e.g){for(var f=[],g=0;g<c.length;g++)f[g]=d.b(e,c[g]);c=f;}else c=d.b(e,c);return a.a[b]=c}return a.a[b]}return c}function w(a,b,c){var d=z(a,b);return a.f[b].g?d[c||0]:d}
      function A(a,b){if(v(a,b))a=w(a,b,void 0);else a:{a=a.f[b];if(void 0===a.f)if(b=a.j,b===Boolean)a.f=!1;else if(b===Number)a.f=0;else if(b===String)a.f=a.i?"0":"";else{a=new b;break a}a=a.f;}return a}function y(a,b){return z(a,b)||[]}function B(a,b){return a.f[b].g?v(a,b)?a.b[b].length:0:v(a,b)?1:0}function x(a,b,c){a.b[b]=c;a.a&&(a.a[b]=c);}function sa(a,b,c){a.b[b]||(a.b[b]=[]);a.b[b].push(c);a.a&&delete a.a[b];}function C(a,b){var c=[],d;for(d in b)0!=d&&c.push(new ka(d,b[d]));return new ia(a,c)}function D(){u.call(this);}n(D,u);var ua=null;function E(){u.call(this);}n(E,u);var va=null;function F(){u.call(this);}n(F,u);var wa=null;
      D.prototype.h=function(){var a=ua;a||(ua=a=C(D,{0:{name:"NumberFormat",fa:"i18n.phonenumbers.NumberFormat"},1:{name:"pattern",required:!0,c:9,type:String},2:{name:"format",required:!0,c:9,type:String},3:{name:"leading_digits_pattern",v:!0,c:9,type:String},4:{name:"national_prefix_formatting_rule",c:9,type:String},6:{name:"national_prefix_optional_when_formatting",c:8,defaultValue:!1,type:Boolean},5:{name:"domestic_carrier_code_formatting_rule",c:9,type:String}}));return a};D.h=D.prototype.h;
      E.prototype.h=function(){var a=va;a||(va=a=C(E,{0:{name:"PhoneNumberDesc",fa:"i18n.phonenumbers.PhoneNumberDesc"},2:{name:"national_number_pattern",c:9,type:String},9:{name:"possible_length",v:!0,c:5,type:Number},10:{name:"possible_length_local_only",v:!0,c:5,type:Number},6:{name:"example_number",c:9,type:String}}));return a};E.h=E.prototype.h;
      F.prototype.h=function(){var a=wa;a||(wa=a=C(F,{0:{name:"PhoneMetadata",fa:"i18n.phonenumbers.PhoneMetadata"},1:{name:"general_desc",c:11,type:E},2:{name:"fixed_line",c:11,type:E},3:{name:"mobile",c:11,type:E},4:{name:"toll_free",c:11,type:E},5:{name:"premium_rate",c:11,type:E},6:{name:"shared_cost",c:11,type:E},7:{name:"personal_number",c:11,type:E},8:{name:"voip",c:11,type:E},21:{name:"pager",c:11,type:E},25:{name:"uan",c:11,type:E},27:{name:"emergency",c:11,type:E},28:{name:"voicemail",c:11,type:E},
        29:{name:"short_code",c:11,type:E},30:{name:"standard_rate",c:11,type:E},31:{name:"carrier_specific",c:11,type:E},33:{name:"sms_services",c:11,type:E},24:{name:"no_international_dialling",c:11,type:E},9:{name:"id",required:!0,c:9,type:String},10:{name:"country_code",c:5,type:Number},11:{name:"international_prefix",c:9,type:String},17:{name:"preferred_international_prefix",c:9,type:String},12:{name:"national_prefix",c:9,type:String},13:{name:"preferred_extn_prefix",c:9,type:String},15:{name:"national_prefix_for_parsing",
          c:9,type:String},16:{name:"national_prefix_transform_rule",c:9,type:String},18:{name:"same_mobile_and_fixed_line_pattern",c:8,defaultValue:!1,type:Boolean},19:{name:"number_format",v:!0,c:11,type:D},20:{name:"intl_number_format",v:!0,c:11,type:D},22:{name:"main_country_for_code",c:8,defaultValue:!1,type:Boolean},23:{name:"leading_digits",c:9,type:String},26:{name:"leading_zero_possible",c:8,defaultValue:!1,type:Boolean}}));return a};F.h=F.prototype.h;function G(){}G.prototype.a=function(a){new a.b;throw Error("Unimplemented");};G.prototype.b=function(a,b){if(11==a.b||10==a.b)return b instanceof u?b:this.a(a.j.prototype.h(),b);if(14==a.b)return l(b)&&xa.test(b)&&(a=Number(b),0<a)?a:b;if(!a.i)return b;a=a.j;if(a===String){if("number"==typeof b)return String(b)}else if(a===Number&&l(b)&&("Infinity"===b||"-Infinity"===b||"NaN"===b||xa.test(b)))return Number(b);return b};var xa=/^-?[0-9]+$/;function ya(){}n(ya,G);ya.prototype.a=function(a,b){a=new a.b;a.g=this;a.b=b;a.a={};return a};function H(){}n(H,ya);H.prototype.b=function(a,b){return 8==a.b?!!b:G.prototype.b.apply(this,arguments)};H.prototype.a=function(a,b){return H.wa.a.call(this,a,b)};function I(){u.call(this);}n(I,u);var za=null,Aa={Ba:0,Aa:1,za:5,ya:10,xa:20};
      I.prototype.h=function(){var a=za;a||(za=a=C(I,{0:{name:"PhoneNumber",fa:"i18n.phonenumbers.PhoneNumber"},1:{name:"country_code",required:!0,c:5,type:Number},2:{name:"national_number",required:!0,c:4,type:Number},3:{name:"extension",c:9,type:String},4:{name:"italian_leading_zero",c:8,type:Boolean},8:{name:"number_of_leading_zeros",c:5,defaultValue:1,type:Number},5:{name:"raw_input",c:9,type:String},6:{name:"country_code_source",c:14,defaultValue:0,type:Aa},7:{name:"preferred_domestic_carrier_code",
          c:9,type:String}}));return a};I.ctor=I;I.ctor.h=I.prototype.h;/*

   Copyright (C) 2010 The Libphonenumber Authors

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
  */
      var J={1:"US AG AI AS BB BM BS CA DM DO GD GU JM KN KY LC MP MS PR SX TC TT VC VG VI".split(" "),7:["RU","KZ"],20:["EG"],27:["ZA"],30:["GR"],31:["NL"],32:["BE"],33:["FR"],34:["ES"],36:["HU"],39:["IT","VA"],40:["RO"],41:["CH"],43:["AT"],44:["GB","GG","IM","JE"],45:["DK"],46:["SE"],47:["NO","SJ"],48:["PL"],49:["DE"],51:["PE"],52:["MX"],53:["CU"],54:["AR"],55:["BR"],56:["CL"],57:["CO"],58:["VE"],60:["MY"],61:["AU","CC","CX"],62:["ID"],63:["PH"],64:["NZ"],65:["SG"],66:["TH"],81:["JP"],82:["KR"],84:["VN"],
        86:["CN"],90:["TR"],91:["IN"],92:["PK"],93:["AF"],94:["LK"],95:["MM"],98:["IR"],211:["SS"],212:["MA","EH"],213:["DZ"],216:["TN"],218:["LY"],220:["GM"],221:["SN"],222:["MR"],223:["ML"],224:["GN"],225:["CI"],226:["BF"],227:["NE"],228:["TG"],229:["BJ"],230:["MU"],231:["LR"],232:["SL"],233:["GH"],234:["NG"],235:["TD"],236:["CF"],237:["CM"],238:["CV"],239:["ST"],240:["GQ"],241:["GA"],242:["CG"],243:["CD"],244:["AO"],245:["GW"],246:["IO"],247:["AC"],248:["SC"],249:["SD"],250:["RW"],251:["ET"],252:["SO"],
        253:["DJ"],254:["KE"],255:["TZ"],256:["UG"],257:["BI"],258:["MZ"],260:["ZM"],261:["MG"],262:["RE","YT"],263:["ZW"],264:["NA"],265:["MW"],266:["LS"],267:["BW"],268:["SZ"],269:["KM"],290:["SH","TA"],291:["ER"],297:["AW"],298:["FO"],299:["GL"],350:["GI"],351:["PT"],352:["LU"],353:["IE"],354:["IS"],355:["AL"],356:["MT"],357:["CY"],358:["FI","AX"],359:["BG"],370:["LT"],371:["LV"],372:["EE"],373:["MD"],374:["AM"],375:["BY"],376:["AD"],377:["MC"],378:["SM"],380:["UA"],381:["RS"],382:["ME"],383:["XK"],385:["HR"],
        386:["SI"],387:["BA"],389:["MK"],420:["CZ"],421:["SK"],423:["LI"],500:["FK"],501:["BZ"],502:["GT"],503:["SV"],504:["HN"],505:["NI"],506:["CR"],507:["PA"],508:["PM"],509:["HT"],590:["GP","BL","MF"],591:["BO"],592:["GY"],593:["EC"],594:["GF"],595:["PY"],596:["MQ"],597:["SR"],598:["UY"],599:["CW","BQ"],670:["TL"],672:["NF"],673:["BN"],674:["NR"],675:["PG"],676:["TO"],677:["SB"],678:["VU"],679:["FJ"],680:["PW"],681:["WF"],682:["CK"],683:["NU"],685:["WS"],686:["KI"],687:["NC"],688:["TV"],689:["PF"],690:["TK"],
        691:["FM"],692:["MH"],800:["001"],808:["001"],850:["KP"],852:["HK"],853:["MO"],855:["KH"],856:["LA"],870:["001"],878:["001"],880:["BD"],881:["001"],882:["001"],883:["001"],886:["TW"],888:["001"],960:["MV"],961:["LB"],962:["JO"],963:["SY"],964:["IQ"],965:["KW"],966:["SA"],967:["YE"],968:["OM"],970:["PS"],971:["AE"],972:["IL"],973:["BH"],974:["QA"],975:["BT"],976:["MN"],977:["NP"],979:["001"],992:["TJ"],993:["TM"],994:["AZ"],995:["GE"],996:["KG"],998:["UZ"]},Ba={AC:[,[,,"[46]\\d{4}|[01589]\\d{5}",,
          ,,,,,[5,6]],[,,"6[2-467]\\d{3}",,,,"62889",,,[5]],[,,"4\\d{4}",,,,"40123",,,[5]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AC",247,"00",,,,,,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"[01589]\\d{5}",,,,"542011",,,[6]],,,[,,,,,,,,,[-1]]],AD:[,[,,"[16]\\d{5,8}|[37-9]\\d{5}",,,,,,,[6,8,9]],[,,"[78]\\d{5}",,,,"712345",,,[6]],[,,"(?:3\\d|6(?:[0-8]|9(?:0\\d{2})?))\\d{4}",,,,"312345",,,[6,9]],[,,"180[02]\\d{4}",,,,"18001234",,,[8]],[,,"[19]\\d{5}",,,,"912345",,,[6]],
          [,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AD",376,"00",,,,,,,,[[,"(\\d{3})(\\d{3})","$1 $2",["[136-9]"]],[,"(\\d{4})(\\d{4})","$1 $2",["180","180[02]"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["690"]]],,[,,,,,,,,,[-1]],,,[,,"1800\\d{4}",,,,"18000000",,,[8]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AE:[,[,,"[2-79]\\d{7,8}|800\\d{2,9}",,,,,,,[5,6,7,8,9,10,11,12]],[,,"[2-4679][2-8]\\d{6}",,,,"22345678",,,[8],[7]],[,,"5[024-68]\\d{7}",,,,"501234567",,,[9]],[,,"400\\d{6}|800\\d{2,9}",,,,"800123456"],
          [,,"900[02]\\d{5}",,,,"900234567",,,[9]],[,,"700[05]\\d{5}",,,,"700012345",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AE",971,"00","0",,,"0",,,,[[,"([2-4679])(\\d{3})(\\d{4})","$1 $2 $3",["[2-4679][2-8]"],"0$1"],[,"(5\\d)(\\d{3})(\\d{4})","$1 $2 $3",["5"],"0$1"],[,"([479]00)(\\d)(\\d{5})","$1 $2 $3",["[479]00"],"$1"],[,"([68]00)(\\d{2,9})","$1 $2",["[68]00"],"$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"600[25]\\d{5}",,,,"600212345",,,[9]],,,[,,,,,,,,,[-1]]],AF:[,[,,"[2-7]\\d{8}",,,,,,,[9],[7]],[,,"(?:[25][0-8]|[34][0-4]|6[0-5])[2-9]\\d{6}",
          ,,,"234567890",,,,[7]],[,,"7(?:[014-9]\\d|2[89]|3[01])\\d{6}",,,,"701234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AF",93,"00","0",,,"0",,,,[[,"([2-7]\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[2-7]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AG:[,[,,"[2589]\\d{9}",,,,,,,[10],[7]],[,,"268(?:4(?:6[0-38]|84)|56[0-2])\\d{4}",,,,"2684601234",,,,[7]],[,,"268(?:464|7(?:1[3-9]|2\\d|3[246]|64|[78][0-689]))\\d{4}",,,,"2684641234",,,,[7]],
          [,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:(?:00|22|33|44|66|77|88)[2-9]|21[23])\\d{6}",,,,"5002345678"],[,,"26848[01]\\d{4}",,,,"2684801234",,,,[7]],"AG",1,"011","1",,,"1",,,,,,[,,"26840[69]\\d{4}",,,,"2684061234",,,,[7]],,"268",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AI:[,[,,"[2589]\\d{9}",,,,,,,[10],[7]],[,,"2644(?:6[12]|9[78])\\d{4}",,,,"2644612345",,,,[7]],[,,"264(?:235|476|5(?:3[6-9]|8[1-4])|7(?:29|72))\\d{4}",
          ,,,"2642351234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:(?:00|22|33|44|66|77|88)[2-9]|21[23])\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"AI",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"264",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AL:[,[,,"[2-57]\\d{7}|6\\d{8}|8\\d{5,7}|9\\d{5}",,,,,,,[6,7,8,9],[5]],[,,"(?:[2358](?:[16-9]\\d[2-9]|[2-5][2-9]\\d)|4(?:[2-57-9][2-9]\\d|6\\d{2}))\\d{4}",,,,"22345678",,,[8],[5,
          6,7]],[,,"6(?:[689][2-9]|7[2-6])\\d{6}",,,,"662123456",,,[9]],[,,"800\\d{4}",,,,"8001234",,,[7]],[,,"900[1-9]\\d{2}",,,,"900123",,,[6]],[,,"808[1-9]\\d{2}",,,,"808123",,,[6]],[,,"700[2-9]\\d{4}",,,,"70021234",,,[8]],[,,,,,,,,,[-1]],"AL",355,"00","0",,,"0",,,,[[,"(4)(\\d{3})(\\d{4})","$1 $2 $3",["4[0-6]"],"0$1"],[,"(6\\d)(\\d{3})(\\d{4})","$1 $2 $3",["6"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[2358][2-5]|4[7-9]"],"0$1"],[,"(\\d{3})(\\d{3,5})","$1 $2",["[235][16-9]|[79]|8[016-9]"],"0$1"]],
          ,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AM:[,[,,"[1-9]\\d{7}",,,,,,,[8],[5,6]],[,,"(?:1[0-2]\\d|2(?:2[2-46]|3[1-8]|4[2-69]|5[2-7]|6[1-9]|8[1-7])|3[12]2|47\\d)\\d{5}",,,,"10123456",,,,[5,6]],[,,"(?:4[1349]|55|77|88|9[13-9])\\d{6}",,,,"77123456"],[,,"800\\d{5}",,,,"80012345"],[,,"90[016]\\d{5}",,,,"90012345"],[,,"80[1-4]\\d{5}",,,,"80112345"],[,,,,,,,,,[-1]],[,,"60(?:2[78]|3[5-9]|4[02-9]|5[0-46-9]|[6-8]\\d|90)\\d{4}",,,,"60271234"],"AM",374,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{6})",
          "$1 $2",["1|47"],"(0$1)"],[,"(\\d{2})(\\d{6})","$1 $2",["4[1349]|[5-7]|88|9[1-9]"],"0$1"],[,"(\\d{3})(\\d{5})","$1 $2",["[23]"],"(0$1)"],[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["8|90"],"0 $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AO:[,[,,"[29]\\d{8}",,,,,,,[9]],[,,"2\\d(?:[26-9]\\d|\\d[26-9])\\d{5}",,,,"222123456"],[,,"9[1-49]\\d{7}",,,,"923123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AO",244,"00",,,,,,,,[[,"(\\d{3})(\\d{3})(\\d{3})",
          "$1 $2 $3"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AR:[,[,,"11\\d{8}|[2368]\\d{9}|9\\d{10}",,,,,,,[10,11],[6,7,8]],[,,"11\\d{8}|(?:2(?:2(?:[013]\\d|2[13-79]|4[1-6]|5[2457]|6[124-8]|7[1-4]|8[13-6]|9[1267])|3(?:[07]\\d|1[467]|2[03-6]|3[13-8]|[49][2-6]|5[2-8]|6[013-9])|4(?:7[3-8]|9\\d)|6(?:[01346]\\d|2[24-6]|5[15-8])|80\\d|9(?:[012789]\\d|3[1-6]|4[02-9]|5[234]|6[2-46]))|3(?:3(?:2[79]|6\\d|8[2578])|4(?:0[0124-9]|[1-357]\\d|4[24-7]|6[02-9]|8[0-79]|9[1236-8])|5(?:[138]\\d|2[1245]|4[1-9]|6[2-4]|7[1-6])|6[24]\\d|7(?:[069]\\d|1[1568]|2[013-9]|3[145]|4[0-35-9]|5[14-8]|7[2-57]|8[0-24-9])|8(?:[01578]\\d|2[15-7]|3[0-24-9]|4[13-6]|6[1-357-9]|9[124]))|670\\d)\\d{6}",
          ,,,"1123456789",,,[10],[6,7,8]],[,,"675\\d{7}|9(?:11[2-9]\\d{7}|(?:2(?:2[013]|3[067]|49|6[01346]|80|9[147-9])|3(?:36|4[12358]|5[138]|6[24]|7[069]|8[013578]))[2-9]\\d{6}|\\d{4}[2-9]\\d{5})",,,,"91123456789",,,,[6,7,8]],[,,"800\\d{7}",,,,"8001234567",,,[10]],[,,"60[04579]\\d{7}",,,,"6001234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AR",54,"00","0",,,"0?(?:(11|2(?:2(?:02?|[13]|2[13-79]|4[1-6]|5[2457]|6[124-8]|7[1-4]|8[13-6]|9[1267])|3(?:02?|1[467]|2[03-6]|3[13-8]|[49][2-6]|5[2-8]|[67])|4(?:7[3-578]|9)|6(?:[0136]|2[24-6]|4[6-8]?|5[15-8])|80|9(?:0[1-3]|[19]|2\\d|3[1-6]|4[02568]?|5[2-4]|6[2-46]|72?|8[23]?))|3(?:3(?:2[79]|6|8[2578])|4(?:0[0-24-9]|[12]|3[5-8]?|4[24-7]|5[4-68]?|6[02-9]|7[126]|8[2379]?|9[1-36-8])|5(?:1|2[1245]|3[237]?|4[1-46-9]|6[2-4]|7[1-6]|8[2-5]?)|6[24]|7(?:[069]|1[1568]|2[15]|3[145]|4[13]|5[14-8]|7[2-57]|8[126])|8(?:[01]|2[15-7]|3[2578]?|4[13-6]|5[4-8]?|6[1-357-9]|7[36-8]?|8[5-8]?|9[124])))?15)?",
          "9$1",,,[[,"([68]\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["[68]"],"0$1"],[,"(\\d{2})(\\d{4})","$1-$2",["[2-9]"],"$1"],[,"(\\d{3})(\\d{4})","$1-$2",["[2-9]"],"$1"],[,"(\\d{4})(\\d{4})","$1-$2",["[2-9]"],"$1"],[,"(9)(11)(\\d{4})(\\d{4})","$2 15-$3-$4",["911"],"0$1"],[,"(9)(\\d{3})(\\d{3})(\\d{4})","$2 15-$3-$4",["9(?:2[2-4689]|3[3-8])","9(?:2(?:2[013]|3[067]|49|6[01346]|8|9[147-9])|3(?:36|4[1-358]|5[138]|6|7[069]|8[013578]))","9(?:2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3[4-6]|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45])))",
            "9(?:2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3(?:4|5[014]|6[1-39])|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45])))"],"0$1"],[,"(9)(\\d{4})(\\d{2})(\\d{4})","$2 15-$3-$4",["9[23]"],"0$1"],[,"(11)(\\d{4})(\\d{4})","$1 $2-$3",["11"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2-$3",["2(?:2[013]|3[067]|49|6[01346]|8|9[147-9])|3(?:36|4[1-358]|5[138]|6|7[069]|8[013578])","2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3[4-6]|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45]))",
            "2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3(?:4|5[014]|6[1-39])|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45]))"],"0$1",,1],[,"(\\d{4})(\\d{2})(\\d{4})","$1 $2-$3",["[23]"],"0$1",,1],[,"(\\d{3})","$1",["1[0-2]|911"],"$1"]],[[,"([68]\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["[68]"],"0$1"],[,"(9)(11)(\\d{4})(\\d{4})","$1 $2 $3-$4",["911"]],[,"(9)(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3-$4",["9(?:2[2-4689]|3[3-8])","9(?:2(?:2[013]|3[067]|49|6[01346]|8|9[147-9])|3(?:36|4[1-358]|5[138]|6|7[069]|8[013578]))",
            "9(?:2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3[4-6]|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45])))","9(?:2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3(?:4|5[014]|6[1-39])|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45])))"]],[,"(9)(\\d{4})(\\d{2})(\\d{4})","$1 $2 $3-$4",["9[23]"]],[,"(11)(\\d{4})(\\d{4})","$1 $2-$3",["11"],"0$1",
            ,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2-$3",["2(?:2[013]|3[067]|49|6[01346]|8|9[147-9])|3(?:36|4[1-358]|5[138]|6|7[069]|8[013578])","2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3[4-6]|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45]))","2(?:2(?:0[013-9]|[13])|3(?:0[013-9]|[67])|49|6(?:[0136]|4[0-59])|8|9(?:[19]|44|7[013-9]|8[14]))|3(?:36|4(?:[12]|3(?:4|5[014]|6[1-39])|[58]4)|5(?:1|3[0-24-689]|8[46])|6|7[069]|8(?:[01]|34|[578][45]))"],
            "0$1",,1],[,"(\\d{4})(\\d{2})(\\d{4})","$1 $2-$3",["[23]"],"0$1",,1]],[,,,,,,,,,[-1]],,,[,,"810\\d{7}",,,,"8101234567",,,[10]],[,,"810\\d{7}",,,,"8101234567",,,[10]],,,[,,,,,,,,,[-1]]],AS:[,[,,"[5689]\\d{9}",,,,,,,[10],[7]],[,,"6846(?:22|33|44|55|77|88|9[19])\\d{4}",,,,"6846221234",,,,[7]],[,,"684(?:2(?:5[2468]|72)|7(?:3[13]|70))\\d{4}",,,,"6847331234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:(?:00|22|33|44|66|77|88)[2-9]|21[23])\\d{6}",
          ,,,"5002345678"],[,,,,,,,,,[-1]],"AS",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"684",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AT:[,[,,"[1-9]\\d{3,12}",,,,,,,[4,5,6,7,8,9,10,11,12,13],[3]],[,,"1\\d{3,12}|(?:2(?:1[467]|2[13-8]|5[2357]|6[1-46-8]|7[1-8]|8[124-7]|9[1458])|3(?:1[1-8]|3[23568]|4[5-7]|5[1378]|6[1-38]|8[3-68])|4(?:2[1-8]|35|63|7[1368]|8[2457])|5(?:12|2[1-8]|3[357]|4[147]|5[12578]|6[37])|6(?:13|2[1-47]|4[1-35-8]|5[468]|62)|7(?:2[1-8]|3[25]|4[13478]|5[68]|6[16-8]|7[1-6]|9[45]))\\d{3,10}",
          ,,,"1234567890",,,,[3]],[,,"6(?:5[0-3579]|6[013-9]|[7-9]\\d)\\d{4,10}",,,,"664123456",,,[7,8,9,10,11,12,13]],[,,"800\\d{6,10}",,,,"800123456",,,[9,10,11,12,13]],[,,"9(?:0[01]|3[019])\\d{6,10}",,,,"900123456",,,[9,10,11,12,13]],[,,"8(?:10\\d|2(?:[01]\\d|8\\d?))\\d{5,9}",,,,"810123456",,,[8,9,10,11,12,13]],[,,,,,,,,,[-1]],[,,"780\\d{6,10}",,,,"780123456",,,[9,10,11,12,13]],"AT",43,"00","0",,,"0",,,,[[,"(116\\d{3})","$1",["116"],"$1"],[,"(1)(\\d{3,12})","$1 $2",["1"],"0$1"],[,"(5\\d)(\\d{3,5})","$1 $2",
          ["5[079]"],"0$1"],[,"(5\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["5[079]"],"0$1"],[,"(5\\d)(\\d{4})(\\d{4,7})","$1 $2 $3",["5[079]"],"0$1"],[,"(\\d{3})(\\d{3,10})","$1 $2",["(?:31|4)6|51|6(?:5[0-3579]|[6-9])|7(?:[28]0|32)|[89]"],"0$1"],[,"(\\d{4})(\\d{3,9})","$1 $2",["2|3(?:1[1-578]|[3-8])|4[2378]|5[2-6]|6(?:[12]|4[1-9]|5[468])|7(?:[24][1-8]|35|[5-79])"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"5(?:(?:0[1-9]|17)\\d{2,10}|[79]\\d{3,11})|720\\d{6,10}",,,,"50123",,,[5,6,7,8,9,10,11,12,13]],,,[,,,,,,
          ,,,[-1]]],AU:[,[,,"1\\d{4,9}|[2-578]\\d{8}",,,,,,,[5,6,7,8,9,10]],[,,"[237]\\d{8}|8(?:51(?:0(?:0[03-9]|[1247]\\d|3[2-9]|5[0-8]|6[1-9]|8[0-6])|1(?:1[69]|[23]\\d|4[0-4]))|[6-8]\\d{4}|9(?:[02-9]\\d{3}|1(?:[0-57-9]\\d{2}|6[0135-9]\\d)))\\d{3}",,,,"212345678",,,[9],[8]],[,,"14(?:5\\d|71)\\d{5}|4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[6-9]|7[02-9]|8[12457-9]|9[017-9])\\d{6}",,,,"412345678",,,[9]],[,,"180(?:0\\d{3}|2)\\d{3}",,,,"1800123456",,,[7,10]],[,,"19(?:0[0126]\\d|[679])\\d{5}",,,,"1900123456",,,[8,10]],
          [,,"13(?:00\\d{3}|45[0-4]|\\d)\\d{3}",,,,"1300123456",,,[6,8,10]],[,,"500\\d{6}",,,,"500123456",,,[9]],[,,"550\\d{6}",,,,"550123456",,,[9]],"AU",61,"(?:14(?:1[14]|34|4[17]|[56]6|7[47]|88)0011)|001[14-689]","0",,,"0",,"0011",,[[,"([2378])(\\d{4})(\\d{4})","$1 $2 $3",["[2378]"],"(0$1)"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["14|[45]"],"0$1"],[,"(16)(\\d{3,4})","$1 $2",["16"],"0$1"],[,"(16)(\\d{3})(\\d{2,4})","$1 $2 $3",["16"],"0$1"],[,"(1[389]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["1[389]0","1(?:[38]0|9)0"]],
            [,"(180)(2\\d{3})","$1 $2",["180","1802"]],[,"(19\\d)(\\d{3})","$1 $2",["19[13]"]],[,"(19\\d{2})(\\d{4})","$1 $2",["19[679]"]],[,"(13)(\\d{2})(\\d{2})","$1 $2 $3",["13[1-9]"]]],,[,,"16\\d{3,7}",,,,"1612345",,,[5,6,7,8,9]],1,,[,,"1(?:3(?:00\\d{3}|45[0-4]|\\d)\\d{3}|80(?:0\\d{6}|2\\d{3}))",,,,"1300123456",,,[6,7,8,10]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AW:[,[,,"[25-9]\\d{6}",,,,,,,[7]],[,,"5(?:2\\d|8[1-9])\\d{4}",,,,"5212345"],[,,"(?:290|5[69]\\d|6(?:[03]0|22|4[0-2]|[69]\\d)|7(?:[34]\\d|7[07])|9(?:6[45]|9[4-8]))\\d{4}",
          ,,,"5601234"],[,,"800\\d{4}",,,,"8001234"],[,,"900\\d{4}",,,,"9001234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"28\\d{5}|501\\d{4}",,,,"5011234"],"AW",297,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],AX:[,[,,"1\\d{5,11}|[35]\\d{5,9}|2\\d{4,9}|4\\d{5,10}|6\\d{7,9}|7\\d{4,9}|8\\d{6,9}",,,,,,,[5,6,7,8,9,10,11,12]],[,,"18[1-8]\\d{3,9}",,,,"181234567",,,[6,7,8,9,10,11,12]],[,,"4\\d{5,10}|50\\d{4,8}",,,,"412345678",,,[6,7,8,9,10,11]],[,,"800\\d{4,7}",
          ,,,"8001234567",,,[7,8,9,10]],[,,"[67]00\\d{5,6}",,,,"600123456",,,[8,9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AX",358,"00|99(?:[01469]|5(?:11|3[23]|41|5[59]|77|88|9[09]))","0",,,"0",,"00",,,,[,,,,,,,,,[-1]],,,[,,"[13]00\\d{3,7}|2(?:0(?:0\\d{3,7}|2[023]\\d{1,6}|9[89]\\d{1,6}))|60(?:[12]\\d{5,6}|6\\d{7})|7(?:1\\d{7}|3\\d{8}|5[03-9]\\d{3,7})",,,,"1001234",,,[5,6,7,8,9,10]],[,,"[13]0\\d{4,8}|2(?:0(?:[016-8]\\d{3,7}|[2-59]\\d{2,7})|9\\d{4,8})|60(?:[12]\\d{5,6}|6\\d{7})|7(?:1\\d{7}|3\\d{8}|5[03-9]\\d{2,7})",
          ,,,"10112345",,,[5,6,7,8,9,10]],,,[,,,,,,,,,[-1]]],AZ:[,[,,"[1-9]\\d{8}",,,,,,,[9],[7]],[,,"(?:1[28]\\d{3}|2(?:02|1[24]|2[2-4]|33|[45]2|6[23])\\d{2}|365(?:[0-46-9]\\d|5[0-35-9]))\\d{4}",,,,"123123456",,,,[7]],[,,"(?:36554|(?:4[04]|5[015]|60|7[07])\\d{3})\\d{4}",,,,"401234567"],[,,"88\\d{7}",,,,"881234567"],[,,"900200\\d{3}",,,,"900200123"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"AZ",994,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1[28]|2(?:[0-36]|[45]2)|365"],
          "(0$1)"],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[4-8]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["9"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BA:[,[,,"[3-9]\\d{7,8}",,,,,,,[8,9],[6]],[,,"(?:3(?:[05679][2-9]|1[4579]|[23][24-9]|4[2-4689]|8[2457-9])|49[2-579]|5(?:0[2-49]|[13][2-9]|[268][2-4679]|4[4689]|5[2-79]|7[2-69]|9[2-4689]))\\d{5}",,,,"30212345",,,[8],[6]],[,,"6(?:0(?:3\\d|40)|[1-356]\\d|44[0-6]|71[137])\\d{5}",,,,"61123456"],
          [,,"8[08]\\d{6}",,,,"80123456",,,[8]],[,,"9[0246]\\d{6}",,,,"90123456",,,[8]],[,,"8[12]\\d{6}",,,,"82123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BA",387,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2-$3",["[3-5]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["6[1-356]|[7-9]"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["6[047]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"70(?:3[0146]|[56]0)\\d{4}",,,,"70341234",,,[8]],,,[,,,,,,,,,[-1]]],BB:[,[,,"[2589]\\d{9}",,,,
          ,,,[10],[7]],[,,"246(?:2(?:2[78]|7[0-4])|4(?:1[024-6]|2\\d|3[2-9])|5(?:20|[34]\\d|54|7[1-3])|6(?:2\\d|38)|7(?:37|57)|9(?:1[89]|63))\\d{4}",,,,"2464123456",,,,[7]],[,,"246(?:2(?:[356]\\d|4[0-57-9]|8[0-79])|45\\d|69[5-7]|8(?:[2-5]\\d|83))\\d{4}",,,,"2462501234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900\\d{7}|246976\\d{4}",,,,"9002123456",,,,[7]],[,,,,,,,,,[-1]],[,,"5(?:(?:00|22|33|44|66|77|88)[2-9]|21[23])\\d{6}",,,,"5002345678"],[,,"24631\\d{5}",,,,"2463101234",,,,
          [7]],"BB",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"246",[,,,,,,,,,[-1]],[,,"246(?:292|367|4(?:1[7-9]|3[01]|44|67)|736)\\d{4}",,,,"2464301234",,,,[7]],,,[,,,,,,,,,[-1]]],BD:[,[,,"[2-79]\\d{5,9}|1\\d{9}|8[0-7]\\d{4,8}",,,,,,,[6,7,8,9,10]],[,,"2(?:[45]\\d{3}|7(?:1[0-267]|2[0-289]|3[0-29]|4[01]|5[1-3]|6[013]|7[0178]|91)|8(?:0[125]|[139][1-6]|2[0157-9]|41|6[1-35]|7[1-5]|8[1-8]|90)|9(?:0[0-2]|1[0-4]|2[568]|3[3-6]|5[5-7]|6[0167]|7[15]|8[0146-9]))\\d{4}|3(?:12?[5-7]\\d{2}|0(?:2(?:[025-79]\\d|[348]\\d{1,2})|3(?:[2-4]\\d|[56]\\d?))|2(?:1\\d{2}|2(?:[12]\\d|[35]\\d{1,2}|4\\d?))|3(?:1\\d{2}|2(?:[2356]\\d|4\\d{1,2}))|4(?:1\\d{2}|2(?:2\\d{1,2}|[47]|5\\d{2}))|5(?:1\\d{2}|29)|[67]1\\d{2}|8(?:1\\d{2}|2(?:2\\d{2}|3|4\\d)))\\d{3}|4(?:0(?:2(?:[09]\\d|7)|33\\d{2})|1\\d{3}|2(?:1\\d{2}|2(?:[25]\\d?|[348]\\d|[67]\\d{1,2}))|3(?:1\\d{2}(?:\\d{2})?|2(?:[045]\\d|[236-9]\\d{1,2})|32\\d{2})|4(?:[18]\\d{2}|2(?:[2-46]\\d{2}|3)|5[25]\\d{2})|5(?:1\\d{2}|2(?:3\\d|5))|6(?:[18]\\d{2}|2(?:3(?:\\d{2})?|[46]\\d{1,2}|5\\d{2}|7\\d)|5(?:3\\d?|4\\d|[57]\\d{1,2}|6\\d{2}|8))|71\\d{2}|8(?:[18]\\d{2}|23\\d{2}|54\\d{2})|9(?:[18]\\d{2}|2[2-5]\\d{2}|53\\d{1,2}))\\d{3}|5(?:02[03489]\\d{2}|1\\d{2}|2(?:1\\d{2}|2(?:2(?:\\d{2})?|[457]\\d{2}))|3(?:1\\d{2}|2(?:[37](?:\\d{2})?|[569]\\d{2}))|4(?:1\\d{2}|2[46]\\d{2})|5(?:1\\d{2}|26\\d{1,2})|6(?:[18]\\d{2}|2|53\\d{2})|7(?:1|24)\\d{2}|8(?:1|26)\\d{2}|91\\d{2})\\d{3}|6(?:0(?:1\\d{2}|2(?:3\\d{2}|4\\d{1,2}))|2(?:2[2-5]\\d{2}|5(?:[3-5]\\d{2}|7)|8\\d{2})|3(?:1|2[3478])\\d{2}|4(?:1|2[34])\\d{2}|5(?:1|2[47])\\d{2}|6(?:[18]\\d{2}|6(?:2(?:2\\d|[34]\\d{2})|5(?:[24]\\d{2}|3\\d|5\\d{1,2})))|72[2-5]\\d{2}|8(?:1\\d{2}|2[2-5]\\d{2})|9(?:1\\d{2}|2[2-6]\\d{2}))\\d{3}|7(?:(?:02|[3-589]1|6[12]|72[24])\\d{2}|21\\d{3}|32)\\d{3}|8(?:(?:4[12]|[5-7]2|1\\d?)|(?:0|3[12]|[5-7]1|217)\\d)\\d{4}|9(?:[35]1|(?:[024]2|81)\\d|(?:1|[24]1)\\d{2})\\d{3}",
          ,,,"27111234",,,[6,7,8,9]],[,,"(?:1[13-9]\\d|(?:3[78]|44)[02-9]|6(?:44|6[02-9]))\\d{7}",,,,"1812345678",,,[10]],[,,"80[03]\\d{7}",,,,"8001234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"96(?:0[469]|1[0-4]|3[389]|6[69]|7[78])\\d{6}",,,,"9604123456",,,[10]],"BD",880,"00","0",,,"0",,,,[[,"(2)(\\d{7,8})","$1-$2",["2"],"0$1"],[,"(\\d{2})(\\d{4,6})","$1-$2",["[3-79]1"],"0$1"],[,"(\\d{4})(\\d{3,6})","$1-$2",["1|3(?:0|[2-58]2)|4(?:0|[25]2|3[23]|[4689][25])|5(?:[02-578]2|6[25])|6(?:[0347-9]2|[26][25])|7[02-9]2|8(?:[023][23]|[4-7]2)|9(?:[02][23]|[458]2|6[01367])"],
          "0$1"],[,"(\\d{3})(\\d{3,7})","$1-$2",["[3-79][2-9]|8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BE:[,[,,"[1-9]\\d{7,8}",,,,,,,[8,9]],[,,"(?:1[0-69]|[23][2-8]|4[23]|5\\d|6[013-57-9]|71|8[1-79]|9[2-4])\\d{6}|80[2-8]\\d{5}",,,,"12345678",,,[8]],[,,"4(?:56|6[0135-8]|[79]\\d|8[3-9])\\d{6}",,,,"470123456",,,[9]],[,,"800[1-9]\\d{4}",,,,"80012345",,,[8]],[,,"(?:70(?:2[0-57]|3[0457]|44|69|7[0579])|90(?:0[0-35-8]|1[36]|2[0-3568]|3[0135689]|4[2-68]|5[1-68]|6[0-378]|7[23568]|9[34679]))\\d{4}",
          ,,,"90012345",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BE",32,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["4[5-9]"],"0$1"],[,"(\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[23]|4[23]|9[2-4]"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[156]|7[018]|8(?:0[1-9]|[1-79])"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["(?:80|9)0"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"78[0-7]\\d{5}",,,,"78102345",,,[8]],,,[,,,,,,,,,[-1]]],BF:[,[,,"[25-7]\\d{7}",
          ,,,,,,[8]],[,,"2(?:0(?:49|5[23]|6[56]|9[016-9])|4(?:4[569]|5[4-6]|6[56]|7[0179])|5(?:[34]\\d|50|6[5-7]))\\d{4}",,,,"20491234"],[,,"(?:5[124-8]|[67]\\d)\\d{6}",,,,"70123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BF",226,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BG:[,[,,"[23567]\\d{5,7}|[489]\\d{6,8}",,,,,,,[6,7,8,9],[4,5]],[,,"2\\d{5,7}|(?:[36]\\d|5[1-9]|8[1-6]|9[1-7])\\d{5,6}|(?:4(?:[124-7]\\d|3[1-6])|7(?:0[1-9]|[1-9]\\d))\\d{4,5}",
          ,,,"2123456",,,[6,7,8],[4,5]],[,,"(?:8[7-9]\\d|9(?:8\\d|9[69]))\\d{6}|4(?:3[0789]|8\\d)\\d{5}",,,,"48123456",,,[8,9]],[,,"800\\d{5}",,,,"80012345",,,[8]],[,,"90\\d{6}",,,,"90123456",,,[8]],[,,,,,,,,,[-1]],[,,"700\\d{5}",,,,"70012345",,,[8]],[,,,,,,,,,[-1]],"BG",359,"00","0",,,"0",,,,[[,"(2)(\\d)(\\d{2})(\\d{2})","$1 $2 $3 $4",["2"],"0$1"],[,"(2)(\\d{3})(\\d{3,4})","$1 $2 $3",["2"],"0$1"],[,"(\\d{3})(\\d{4})","$1 $2",["43[124-7]|70[1-9]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{2})","$1 $2 $3",["43[124-7]|70[1-9]"],
          "0$1"],[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["[78]00"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["99[69]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2,3})","$1 $2 $3",["[356]|4[124-7]|7[1-9]|8[1-6]|9[1-7]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["48|8[7-9]|9[08]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BH:[,[,,"[136-9]\\d{7}",,,,,,,[8]],[,,"(?:1(?:3[1356]|6[0156]|7\\d)\\d|6(?:1[16]\\d|500|6(?:0\\d|3[12]|44|7[7-9])|9[69][69])|7(?:1(?:11|78)|7\\d{2}))\\d{4}",
          ,,,"17001234"],[,,"(?:3(?:[1-4679]\\d|5[013-69]|8[0-47-9])\\d|6(?:3(?:00|33|6[16])|6(?:[69]\\d|3[03-9]|7[0-6])))\\d{4}",,,,"36001234"],[,,"80\\d{6}",,,,"80123456"],[,,"(?:87|9[014578])\\d{6}",,,,"90123456"],[,,"84\\d{6}",,,,"84123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BH",973,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BI:[,[,,"[2367]\\d{7}",,,,,,,[8]],[,,"22\\d{6}",,,,"22201234"],[,,"(?:29|31|6[189]|7[125-9])\\d{6}",,,,"79561234"],
          [,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BI",257,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BJ:[,[,,"[2689]\\d{7}",,,,,,,[8]],[,,"2(?:02|1[037]|2[45]|3[68])\\d{5}",,,,"20211234"],[,,"(?:6\\d|9[03-9])\\d{6}",,,,"90011234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"857[58]\\d{4}",,,,"85751234"],"BJ",229,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
          "$1 $2 $3 $4",["[2689]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"81\\d{6}",,,,"81123456"],,,[,,,,,,,,,[-1]]],BL:[,[,,"[56]\\d{8}",,,,,,,[9]],[,,"590(?:2[7-9]|5[12]|87)\\d{4}",,,,"590271234"],[,,"69(?:0\\d{2}|1(?:2[29]|3[0-5]))\\d{4}",,,,"690001234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BL",590,"00","0",,,"0",,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BM:[,[,,"[4589]\\d{9}",,,,,,,[10],[7]],[,,"441(?:2(?:02|23|61|[3479]\\d)|[46]\\d{2}|5(?:4\\d|60|89)|824)\\d{4}",
          ,,,"4412345678",,,,[7]],[,,"441(?:[37]\\d|5[0-39])\\d{5}",,,,"4413701234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:(?:00|22|33|44|66|77|88)[2-9]|21[23])\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"BM",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"441",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BN:[,[,,"[2-578]\\d{6}",,,,,,,[7]],[,,"2(?:[013-9]\\d|2[0-7])\\d{4}|[3-5]\\d{6}",,,,"2345678"],[,,"22[89]\\d{4}|[78]\\d{6}",
          ,,,"7123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BN",673,"00",,,,,,,,[[,"([2-578]\\d{2})(\\d{4})","$1 $2",["[2-578]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BO:[,[,,"[23467]\\d{7}|8\\d{8}",,,,,,,[8,9],[7]],[,,"(?:2(?:2\\d{2}|5(?:11|[258]\\d|9[67])|6(?:12|2\\d|9[34])|8(?:2[34]|39|62))|3(?:3\\d{2}|4(?:6\\d|8[24])|8(?:25|42|5[257]|86|9[25])|9(?:2\\d|3[234]|4[248]|5[24]|6[2-6]|7\\d))|4(?:4\\d{2}|6(?:11|[24689]\\d|72)))\\d{4}",
          ,,,"22123456",,,[8],[7]],[,,"[67]\\d{7}",,,,"71234567",,,[8]],[,,"80017\\d{4}",,,,"800171234",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BO",591,"00(1\\d)?","0",,,"0(1\\d)?",,,,[[,"([234])(\\d{7})","$1 $2",["[2-4]"],,"0$CC $1"],[,"([67]\\d{7})","$1",["[67]"],,"0$CC $1"],[,"(800)(\\d{2})(\\d{4})","$1 $2 $3",["800"],,"0$CC $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BQ:[,[,,"[347]\\d{6}",,,,,,,[7]],[,,"(?:318[023]|41(?:6[023]|70)|7(?:1[578]|50)\\d)\\d{3}",
          ,,,"7151234"],[,,"(?:31(?:8[14-8]|9[14578])|416[145-9]|7(?:0[01]|7[07]|8\\d|9[056])\\d)\\d{3}",,,,"3181234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BQ",599,"00",,,,,,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BR:[,[,,"[1-46-9]\\d{7,10}|5(?:[0-4]\\d{7,9}|5(?:[2-8]\\d{7}|9\\d{7,8}))",,,,,,,[8,9,10,11]],[,,"(?:[14689][1-9]|2[12478]|3[1-578]|5[13-5]|7[13-579])[2-5]\\d{7}",,,,"1123456789",,,[10],[8]],[,,"(?:[189][1-9]|2[12478])(?:7|9\\d)\\d{7}|(?:3[1-578]|[46][1-9]|5[13-5]|7[13-579])(?:[6-9]|9\\d)\\d{7}",
          ,,,"11961234567",,,[10,11],[8]],[,,"800\\d{6,7}",,,,"800123456",,,[9,10]],[,,"(?:300|[59]00\\d?)\\d{6}",,,,"300123456",,,[9,10]],[,,"(?:300\\d(?:\\d{2})?|4(?:0(?:0\\d|20)|370))\\d{4}",,,,"40041234",,,[8,10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BR",55,"00(?:1[245]|2[1-35]|31|4[13]|[56]5|99)","0",,,"0(?:(1[245]|2[1-35]|31|4[13]|[56]5|99)(\\d{10,11}))?","$2",,,[[,"(\\d{4})(\\d{4})","$1-$2",["300|4(?:0[02]|37)","300|4(?:0(?:0|20)|370)"]],[,"([3589]00)(\\d{2,3})(\\d{4})","$1 $2 $3",["[3589]00"],"0$1"],[,
          "(\\d{3,5})","$1",["1[125689]"]],[,"(\\d{4})(\\d{4})","$1-$2",["[2-9](?:0[1-9]|[1-9])"]],[,"(\\d{5})(\\d{4})","$1-$2",["9(?:0[1-9]|[1-9])"]],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2-$3",["[1-9][1-9]"],"($1)","0 $CC ($1)"],[,"(\\d{2})(\\d{5})(\\d{4})","$1 $2-$3",["[1-9][1-9]9"],"($1)","0 $CC ($1)"]],[[,"(\\d{4})(\\d{4})","$1-$2",["300|4(?:0[02]|37)","300|4(?:0(?:0|20)|370)"]],[,"([3589]00)(\\d{2,3})(\\d{4})","$1 $2 $3",["[3589]00"],"0$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2-$3",["[1-9][1-9]"],"($1)","0 $CC ($1)"],
          [,"(\\d{2})(\\d{5})(\\d{4})","$1 $2-$3",["[1-9][1-9]9"],"($1)","0 $CC ($1)"]],[,,,,,,,,,[-1]],,,[,,"(?:300\\d|40(?:0\\d|20))\\d{4}",,,,"40041234",,,[8]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BS:[,[,,"[2589]\\d{9}",,,,,,,[10],[7]],[,,"242(?:3(?:02|[236][1-9]|4[0-24-9]|5[0-68]|7[347]|8[0-4]|9[2-467])|461|502|6(?:0[1-4]|12|2[013]|[45]0|7[67]|8[78]|9[89])|7(?:02|88))\\d{4}",,,,"2423456789",,,,[7]],[,,"242(?:3(?:5[79]|7[56]|95)|4(?:[23][1-9]|4[1-35-9]|5[1-8]|6[2-8]|7\\d|81)|5(?:2[45]|3[35]|44|5[1-46-9]|65|77)|6[34]6|7(?:27|38)|8(?:0[1-9]|1[02-9]|2\\d|[89]9))\\d{4}",
          ,,,"2423591234",,,,[7]],[,,"242300\\d{4}|8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456",,,,[7]],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:(?:00|22|33|44|66|77|88)[2-9]|21[23])\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"BS",1,"011?","1",,,"1",,"011",,,,[,,,,,,,,,[-1]],,"242",[,,,,,,,,,[-1]],[,,"242225[0-46-9]\\d{3}",,,,"2422250123"],,,[,,,,,,,,,[-1]]],BT:[,[,,"[1-8]\\d{6,7}",,,,,,,[7,8],[6]],[,,"(?:2[3-6]|[34][5-7]|5[236]|6[2-46]|7[246]|8[2-4])\\d{5}",,,,"2345678",,,[7],[6]],
          [,,"(?:1[67]|77)\\d{6}",,,,"17123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BT",975,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1|77"]],[,"([2-8])(\\d{3})(\\d{3})","$1 $2 $3",["[2-68]|7[246]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BW:[,[,,"[2-79]\\d{6,7}",,,,,,,[7,8]],[,,"(?:2(?:4[0-48]|6[0-24]|9[0578])|3(?:1[0-35-9]|55|[69]\\d|7[01])|4(?:6[03]|7[1267]|9[0-5])|5(?:3[0389]|4[0489]|7[1-47]|88|9[0-49])|6(?:2[1-35]|5[149]|8[067]))\\d{4}",
          ,,,"2401234",,,[7]],[,,"7(?:[1-6]\\d|7[014-8])\\d{5}",,,,"71123456",,,[8]],[,,,,,,,,,[-1]],[,,"90\\d{5}",,,,"9012345",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"79[12][01]\\d{4}",,,,"79101234",,,[8]],"BW",267,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[2-6]"]],[,"(7\\d)(\\d{3})(\\d{3})","$1 $2 $3",["7"]],[,"(90)(\\d{5})","$1 $2",["90"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BY:[,[,,"[1-4]\\d{8}|8(?:0(?:0\\d{3,7}|[13]\\d{7})|(?:10|20\\d)\\d{7})|9\\d{9,10}",,,,,,,[6,
          7,8,9,10,11],[5]],[,,"(?:1(?:5(?:1[1-5]|[24]\\d|6[2-4]|9[1-7])|6(?:[235]\\d|4[1-7])|7\\d{2})|2(?:1(?:[246]\\d|3[0-35-9]|5[1-9])|2(?:[235]\\d|4[0-8])|3(?:[26]\\d|3[02-79]|4[024-7]|5[03-7])))\\d{5}",,,,"152450911",,,[9],[5,6,7]],[,,"(?:2(?:5[5679]|9[1-9])|33\\d|44\\d)\\d{6}",,,,"294911911",,,[9]],[,,"8(?:0[13]|20\\d)\\d{7}|800\\d{3,7}",,,,"8011234567"],[,,"(?:810|902)\\d{7}",,,,"9021234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"249\\d{6}",,,,"249123456",,,[9]],"BY",375,"810","8",,,"8?0?",,"8~10",
          ,[[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2-$3-$4",["17[0-3589]|2[4-9]|[34]","17(?:[02358]|1[0-2]|9[0189])|2[4-9]|[34]"],"8 0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2-$3-$4",["1(?:5[24]|6[235]|7[467])|2(?:1[246]|2[25]|3[26])","1(?:5[24]|6(?:2|3[04-9]|5[0346-9])|7(?:[46]|7[37-9]))|2(?:1[246]|2[25]|3[26])"],"8 0$1"],[,"(\\d{4})(\\d{2})(\\d{3})","$1 $2-$3",["1(?:5[169]|6[3-5]|7[179])|2(?:1[35]|2[34]|3[3-5])","1(?:5[169]|6(?:3[1-3]|4|5[125])|7(?:1[3-9]|7[0-24-6]|9[2-7]))|2(?:1[35]|2[34]|3[3-5])"],
            "8 0$1"],[,"([89]\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["8[01]|9"],"8 $1"],[,"(82\\d)(\\d{4})(\\d{4})","$1 $2 $3",["82"],"8 $1"],[,"(800)(\\d{3})","$1 $2",["800"],"8 $1"],[,"(800)(\\d{2})(\\d{2,4})","$1 $2 $3",["800"],"8 $1"]],,[,,,,,,,,,[-1]],,,[,,"8(?:0[13]|10|20\\d)\\d{7}|800\\d{3,7}|902\\d{7}",,,,"82012345678"],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],BZ:[,[,,"[2-8]\\d{6}|0\\d{10}",,,,,,,[7,11]],[,,"(?:2(?:[02]\\d|36)|[3-58][02]\\d|7(?:[02]\\d|32))\\d{4}",,,,"2221234",,,[7]],[,,"6[0-35-7]\\d{5}",,,,"6221234",
          ,,[7]],[,,"0800\\d{7}",,,,"08001234123",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"BZ",501,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1-$2",["[2-8]"]],[,"(0)(800)(\\d{4})(\\d{3})","$1-$2-$3-$4",["080","0800"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CA:[,[,,"[2-9]\\d{9}",,,,,,,[10],[7]],[,,"(?:2(?:04|[23]6|[48]9|50)|3(?:06|43|65)|4(?:03|1[68]|3[178]|50)|5(?:06|1[49]|48|79|8[17])|6(?:0[04]|13|22|39|47)|7(?:0[59]|78|8[02])|8(?:[06]7|19|25|73)|90[25])[2-9]\\d{6}",
          ,,,"5062345678",,,,[7]],[,,"(?:2(?:04|[23]6|[48]9|50)|3(?:06|43|65)|4(?:03|1[68]|3[178]|50)|5(?:06|1[49]|48|79|8[17])|6(?:0[04]|13|22|39|47)|7(?:0[59]|78|8[02])|8(?:[06]7|19|25|73)|90[25])[2-9]\\d{6}",,,,"2042345678",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:(?:00|22|33|44|66|77|88)[2-9]|21[23])\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"CA",1,"011","1",,,"1",,,1,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],
          ,,[,,,,,,,,,[-1]]],CC:[,[,,"[1458]\\d{5,9}",,,,,,,[6,7,8,9,10]],[,,"8(?:51(?:0(?:02|31|60)|118)|91(?:0(?:1[0-2]|29)|1(?:[28]2|50|79)|2(?:10|64)|3(?:08|22|68)|4[29]8|62\\d|70[23]|959))\\d{3}",,,,"891621234",,,[9],[8]],[,,"14(?:5\\d|71)\\d{5}|4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[6-9]|7[02-9]|8[12547-9]|9[017-9])\\d{6}",,,,"412345678",,,[9]],[,,"180(?:0\\d{3}|2)\\d{3}",,,,"1800123456",,,[7,10]],[,,"19(?:0[0126]\\d|[679])\\d{5}",,,,"1900123456",,,[8,10]],[,,"13(?:00\\d{2})?\\d{4}",,,,"1300123456",,,[6,10]],
          [,,"500\\d{6}",,,,"500123456",,,[9]],[,,"550\\d{6}",,,,"550123456",,,[9]],"CC",61,"(?:14(?:1[14]|34|4[17]|[56]6|7[47]|88))?001[14-689]","0",,,"0",,"0011",,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CD:[,[,,"[2-6]\\d{6}|[18]\\d{6,8}|9\\d{8}",,,,,,,[7,9]],[,,"1(?:2\\d{7}|\\d{6})|[2-6]\\d{6}",,,,"1234567"],[,,"8(?:[0-2459]\\d{2}|8)\\d{5}|9[017-9]\\d{7}",,,,"991234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CD",243,"00","0",,,"0",
          ,,,[[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["12"],"0$1"],[,"([89]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["8[0-2459]|9"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["88"],"0$1"],[,"(\\d{2})(\\d{5})","$1 $2",["[1-6]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CF:[,[,,"[278]\\d{7}",,,,,,,[8]],[,,"2[12]\\d{6}",,,,"21612345"],[,,"7[0257]\\d{6}",,,,"70012345"],[,,,,,,,,,[-1]],[,,"8776\\d{4}",,,,"87761234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CF",236,"00",
          ,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CG:[,[,,"[028]\\d{8}",,,,,,,[9]],[,,"222[1-589]\\d{5}",,,,"222123456"],[,,"0[14-6]\\d{7}",,,,"061234567"],[,,,,,,,,,[-1]],[,,"80(?:0\\d{2}|11[0-4])\\d{4}",,,,"800123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CG",242,"00",,,,,,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["801"]],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[02]"]],[,"(\\d)(\\d{4})(\\d{4})",
          "$1 $2 $3",["800"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CH:[,[,,"[2-9]\\d{8}|860\\d{9}",,,,,,,[9,12]],[,,"(?:2[12467]|3[1-4]|4[134]|5[256]|6[12]|[7-9]1)\\d{7}",,,,"212345678",,,[9]],[,,"7[5-9]\\d{7}",,,,"781234567",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"90[016]\\d{6}",,,,"900123456",,,[9]],[,,"84[0248]\\d{6}",,,,"840123456",,,[9]],[,,"878\\d{6}",,,,"878123456",,,[9]],[,,,,,,,,,[-1]],"CH",41,"00","0",,,"0",,,,[[,"([2-9]\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",
          ["[2-7]|[89]1"],"0$1"],[,"([89]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["8[047]|90"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["860"],"0$1"]],,[,,"74[0248]\\d{6}",,,,"740123456",,,[9]],,,[,,,,,,,,,[-1]],[,,"5[18]\\d{7}",,,,"581234567",,,[9]],,,[,,"860\\d{9}",,,,"860123456789",,,[12]]],CI:[,[,,"[02-8]\\d{7}",,,,,,,[8]],[,,"(?:2(?:0[023]|1[02357]|[23][045]|4[03-5])|3(?:0[06]|1[069]|[2-4][07]|5[09]|6[08]))\\d{5}",,,,"21234567"],[,,"(?:0[1-9]|[45]\\d|6[014-9]|7[124-9]|8[4-9])\\d{6}",
          ,,,"01234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CI",225,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CK:[,[,,"[2-8]\\d{4}",,,,,,,[5]],[,,"(?:2\\d|3[13-7]|4[1-5])\\d{3}",,,,"21234"],[,,"[5-8]\\d{4}",,,,"71234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CK",682,"00",,,,,,,,[[,"(\\d{2})(\\d{3})","$1 $2"]],,[,,,,,,,,,[-1]],,,
          [,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CL:[,[,,"1230\\d{7}|[2-46-9]\\d{8,10}|5[1-3578]\\d{7}",,,,,,,[9,10,11]],[,,"2(?:1962\\d{4}|2\\d{7}|32[0-467]\\d{5})|(?:3[2-5]\\d|[47][1-35]\\d|5[1-3578]\\d|6[13-57]\\d|8(?:0[1-9]|[1-9]\\d)|9[3-9]\\d)\\d{6}",,,,"221234567",,,[9]],[,,"2(?:1962\\d{4}|2\\d{7}|32[0-467]\\d{5})|(?:3[2-5]\\d|[47][1-35]\\d|5[1-3578]\\d|6[13-57]\\d|8(?:0[1-9]|[1-9]\\d)|9[3-9]\\d)\\d{6}",,,,"961234567",,,[9]],[,,"800\\d{6}|1230\\d{7}",,,,"800123456",,,[9,11]],[,,,,,,,,,[-1]],
          [,,"600\\d{7,8}",,,,"6001234567",,,[10,11]],[,,,,,,,,,[-1]],[,,"44\\d{7}",,,,"441234567",,,[9]],"CL",56,"(?:0|1(?:1[0-69]|2[0-57]|5[13-58]|69|7[0167]|8[018]))0",,,,,,,1,[[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["2[23]"],"($1)"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[357]|4[1-35]|6[13-57]|8(?:0[1-9]|[1-9])"],"($1)"],[,"(9)(\\d{4})(\\d{4})","$1 $2 $3",["9"]],[,"(44)(\\d{3})(\\d{4})","$1 $2 $3",["44"]],[,"([68]00)(\\d{3})(\\d{3,4})","$1 $2 $3",["[68]00"]],[,"(600)(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3 $4",
            ["600"]],[,"(1230)(\\d{3})(\\d{4})","$1 $2 $3",["123","1230"]],[,"(\\d{5})(\\d{4})","$1 $2",["219"],"($1)"],[,"(\\d{4,5})","$1",["[1-9]"],"$1"]],[[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3",["2[23]"],"($1)"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[357]|4[1-35]|6[13-57]|8(?:0[1-9]|[1-9])"],"($1)"],[,"(9)(\\d{4})(\\d{4})","$1 $2 $3",["9"]],[,"(44)(\\d{3})(\\d{4})","$1 $2 $3",["44"]],[,"([68]00)(\\d{3})(\\d{3,4})","$1 $2 $3",["[68]00"]],[,"(600)(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3 $4",["600"]],[,"(1230)(\\d{3})(\\d{4})",
            "$1 $2 $3",["123","1230"]],[,"(\\d{5})(\\d{4})","$1 $2",["219"],"($1)"]],[,,,,,,,,,[-1]],,,[,,"600\\d{7,8}",,,,"6001234567",,,[10,11]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CM:[,[,,"[2368]\\d{7,8}",,,,,,,[8,9]],[,,"2(?:22|33|4[23])\\d{6}",,,,"222123456",,,[9]],[,,"6[5-9]\\d{7}",,,,"671234567",,,[9]],[,,"88\\d{6}",,,,"88012345",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CM",237,"00",,,,,,,,[[,"([26])(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["[26]"]],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
          "$1 $2 $3 $4",["[23]|88"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CN:[,[,,"[1-7]\\d{6,11}|8[0-357-9]\\d{6,9}|9\\d{7,10}",,,,,,,[7,8,9,10,11,12],[5,6]],[,,"21(?:100\\d{2}|95\\d{3,4}|\\d{8,10})|(?:10|2[02-57-9]|3(?:11|7[179])|4(?:[15]1|3[1-35])|5(?:1\\d|2[37]|3[12]|51|7[13-79]|9[15])|7(?:31|5[457]|6[09]|91)|8(?:[57]1|98))(?:100\\d{2}|95\\d{3,4}|\\d{8})|(?:3(?:1[02-9]|35|49|5\\d|7[02-68]|9[1-68])|4(?:1[02-9]|2[179]|3[3-9]|5[2-9]|6[4789]|7\\d|8[23])|5(?:3[03-9]|4[36]|5[02-9]|6[1-46]|7[028]|80|9[2-46-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[17]\\d|2[248]|3[04-9]|4[3-6]|5[0-4689]|6[2368]|9[02-9])|8(?:078|1[236-8]|2[5-7]|3\\d|5[1-9]|7[02-9]|8[3678]|9[1-7])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))(?:100\\d{2}|95\\d{3,4}|\\d{7})",
          ,,,"1012345678",,,,[5,6]],[,,"1(?:[38]\\d{3}|4[57]\\d{2}|5[0-35-9]\\d{2}|66\\d{2}|7(?:[0-35-8]\\d{2}|40[0-5])|9[89]\\d{2})\\d{6}",,,,"13123456789",,,[11]],[,,"(?:10)?800\\d{7}",,,,"8001234567",,,[10,12]],[,,"16[08]\\d{5}",,,,"16812345",,,[8]],[,,"400\\d{7}|950\\d{7,8}|(?:10|2[0-57-9]|3(?:[157]\\d|35|49|9[1-68])|4(?:[17]\\d|2[179]|[35][1-9]|6[4789]|8[23])|5(?:[1357]\\d|2[37]|4[36]|6[1-46]|80|9[1-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]\\d|2[248]|3[014-9]|4[3-6]|6[023689])|8(?:1[236-8]|2[5-7]|[37]\\d|5[14-9]|8[3678]|9[1-8])|9(?:0[1-3689]|1[1-79]|[379]\\d|4[13]|5[1-5]))96\\d{3,4}",
          ,,,"4001234567",,,[7,8,9,10,11],[5,6]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CN",86,"(?:1(?:[12]\\d{3}|79\\d{2}|9[0-7]\\d{2}))?00","0",,,"(1(?:[12]\\d{3}|79\\d{2}|9[0-7]\\d{2}))|0",,"00",,[[,"([48]00)(\\d{3})(\\d{4})","$1 $2 $3",["[48]00"]],[,"(\\d{5,6})","$1",["100|95"]],[,"(\\d{2})(\\d{5,6})","$1 $2",["(?:10|2\\d)[19]","(?:10|2\\d)(?:10|9[56])","(?:10|2\\d)(?:100|9[56])"],"0$1","$CC $1"],[,"(\\d{3})(\\d{5,6})","$1 $2",["[3-9]","[3-9]\\d\\d[19]","[3-9]\\d\\d(?:10|9[56])"],"0$1","$CC $1"],[,"(\\d{3,4})(\\d{4})",
          "$1 $2",["[2-9]"]],[,"(21)(\\d{4})(\\d{4,6})","$1 $2 $3",["21"],"0$1","$CC $1",1],[,"([12]\\d)(\\d{4})(\\d{4})","$1 $2 $3",["10[1-9]|2[02-9]","10[1-9]|2[02-9]","10(?:[1-79]|8(?:0[1-9]|[1-9]))|2[02-9]"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["3(?:1[02-9]|35|49|5|7[02-68]|9[1-68])|4(?:1[02-9]|2[179]|[35][2-9]|6[47-9]|7|8[23])|5(?:3[03-9]|4[36]|5[02-9]|6[1-46]|7[028]|80|9[2-46-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[04-9]|4[3-6]|6[2368])|8(?:1[236-8]|2[5-7]|3|5[1-9]|7[02-9]|8[36-8]|9[1-7])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])"],
          "0$1","$CC $1",1],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["3(?:11|7[179])|4(?:[15]1|3[1-35])|5(?:1|2[37]|3[12]|51|7[13-79]|9[15])|7(?:[39]1|5[457]|6[09])|8(?:[57]1|98)"],"0$1","$CC $1",1],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["807","8078"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["1(?:[3-57-9]|66)"],,"$CC $1"],[,"(10800)(\\d{3})(\\d{4})","$1 $2 $3",["108","1080","10800"]],[,"(\\d{3})(\\d{7,8})","$1 $2",["950"]]],[[,"([48]00)(\\d{3})(\\d{4})","$1 $2 $3",["[48]00"]],[,"(\\d{2})(\\d{5,6})",
          "$1 $2",["(?:10|2\\d)[19]","(?:10|2\\d)(?:10|9[56])","(?:10|2\\d)(?:100|9[56])"],"0$1","$CC $1"],[,"(\\d{3})(\\d{5,6})","$1 $2",["[3-9]","[3-9]\\d\\d[19]","[3-9]\\d\\d(?:10|9[56])"],"0$1","$CC $1"],[,"(21)(\\d{4})(\\d{4,6})","$1 $2 $3",["21"],"0$1","$CC $1",1],[,"([12]\\d)(\\d{4})(\\d{4})","$1 $2 $3",["10[1-9]|2[02-9]","10[1-9]|2[02-9]","10(?:[1-79]|8(?:0[1-9]|[1-9]))|2[02-9]"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["3(?:1[02-9]|35|49|5|7[02-68]|9[1-68])|4(?:1[02-9]|2[179]|[35][2-9]|6[47-9]|7|8[23])|5(?:3[03-9]|4[36]|5[02-9]|6[1-46]|7[028]|80|9[2-46-9])|6(?:3[1-5]|6[0238]|9[12])|7(?:01|[1579]|2[248]|3[04-9]|4[3-6]|6[2368])|8(?:1[236-8]|2[5-7]|3|5[1-9]|7[02-9]|8[36-8]|9[1-7])|9(?:0[1-3689]|1[1-79]|[379]|4[13]|5[1-5])"],
          "0$1","$CC $1",1],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["3(?:11|7[179])|4(?:[15]1|3[1-35])|5(?:1|2[37]|3[12]|51|7[13-79]|9[15])|7(?:[39]1|5[457]|6[09])|8(?:[57]1|98)"],"0$1","$CC $1",1],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["807","8078"],"0$1","$CC $1",1],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["1(?:[3-57-9]|66)"],,"$CC $1"],[,"(10800)(\\d{3})(\\d{4})","$1 $2 $3",["108","1080","10800"]],[,"(\\d{3})(\\d{7,8})","$1 $2",["950"]]],[,,,,,,,,,[-1]],,,[,,"(?:4|(?:10)?8)00\\d{7}|950\\d{7,8}",,,,"4001234567",
          ,,[10,11,12]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CO:[,[,,"(?:[13]\\d{0,3}|[24-8])\\d{7}",,,,,,,[8,10,11],[7]],[,,"[124-8][2-9]\\d{6}",,,,"12345678",,,[8],[7]],[,,"3(?:0[0-5]|1\\d|2[0-3]|5[01])\\d{7}",,,,"3211234567",,,[10]],[,,"1800\\d{7}",,,,"18001234567",,,[11]],[,,"19(?:0[01]|4[78])\\d{7}",,,,"19001234567",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CO",57,"00(?:4(?:[14]4|56)|[579])","0",,,"0([3579]|4(?:44|56))?",,,,[[,"(\\d)(\\d{7})","$1 $2",["1(?:[2-7]|8[2-9]|9[0-3])|[24-8]","1(?:[2-7]|8[2-9]|9(?:09|[1-3]))|[24-8]"],
          "($1)","0$CC $1"],[,"(\\d{3})(\\d{7})","$1 $2",["3"],,"0$CC $1"],[,"(1)(\\d{3})(\\d{7})","$1-$2-$3",["1(?:80|9[04])","1(?:800|9(?:0[01]|4[78]))"],"0$1"]],[[,"(\\d)(\\d{7})","$1 $2",["1(?:[2-7]|8[2-9]|9[0-3])|[24-8]","1(?:[2-7]|8[2-9]|9(?:09|[1-3]))|[24-8]"],"($1)","0$CC $1"],[,"(\\d{3})(\\d{7})","$1 $2",["3"],,"0$CC $1"],[,"(1)(\\d{3})(\\d{7})","$1 $2 $3",["1(?:80|9[04])","1(?:800|9(?:0[01]|4[78]))"]]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CR:[,[,,"[24-9]\\d{7,9}",,
          ,,,,,[8,10]],[,,"2(?:[024-7]\\d{2}|1(?:0[7-9]|[1-9]\\d))\\d{4}",,,,"22123456",,,[8]],[,,"5(?:0[01]|7[0-3])\\d{5}|6(?:[0-4]\\d{3}|500[01])\\d{3}|(?:7[0-3]|8[3-9])\\d{6}",,,,"83123456",,,[8]],[,,"800\\d{7}",,,,"8001234567",,,[10]],[,,"90[059]\\d{7}",,,,"9001234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"210[0-6]\\d{4}|4\\d{7}|5100\\d{4}",,,,"40001234",,,[8]],"CR",506,"00",,,,"(19(?:0[012468]|1[09]|20|66|77|99))",,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[24-7]|8[3-9]"],,"$CC $1"],[,"(\\d{3})(\\d{3})(\\d{4})",
          "$1-$2-$3",["[89]0"],,"$CC $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CU:[,[,,"[2-57]\\d{5,7}",,,,,,,[6,7,8],[4,5]],[,,"2[1-4]\\d{5,6}|3(?:1\\d{6}|[23]\\d{4,6})|4(?:[125]\\d{5,6}|[36]\\d{6}|[78]\\d{4,6})|7\\d{6,7}",,,,"71234567",,,,[4,5]],[,,"5\\d{7}",,,,"51234567",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CU",53,"119","0",,,"0",,,,[[,"(\\d)(\\d{6,7})","$1 $2",["7"],"(0$1)"],[,"(\\d{2})(\\d{4,6})","$1 $2",["[2-4]"],"(0$1)"],
          [,"(\\d)(\\d{7})","$1 $2",["5"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CV:[,[,,"[2-59]\\d{6}",,,,,,,[7]],[,,"2(?:2[1-7]|3[0-8]|4[12]|5[1256]|6\\d|7[1-3]|8[1-5])\\d{4}",,,,"2211234"],[,,"(?:[34][36]|5[1-389]|9\\d)\\d{5}",,,,"9911234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CV",238,"0",,,,,,,,[[,"(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CW:[,[,,"[134679]\\d{6,7}",
          ,,,,,,[7,8]],[,,"9(?:[48]\\d{2}|50\\d|7(?:2[0-24]|[34]\\d|6[35-7]|77|8[7-9]))\\d{4}",,,,"94151234",,,[8]],[,,"9(?:5(?:[12467]\\d|3[01])|6(?:[15-9]\\d|3[01]))\\d{4}",,,,"95181234",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"60[0-2]\\d{4}",,,,"6001234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"CW",599,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[13-7]"]],[,"(9)(\\d{3})(\\d{4})","$1 $2 $3",["9"]]],,[,,"955\\d{5}",,,,"95581234",,,[8]],1,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CX:[,[,,"[1458]\\d{5,9}",
          ,,,,,,[6,7,8,9,10]],[,,"8(?:51(?:0(?:01|30|59)|117)|91(?:00[6-9]|1(?:21|49|78|81)|2(?:09|63)|3(?:12|26|75)|4(?:56|97)|64\\d|7(?:0[01]|1[0-2])|958))\\d{3}",,,,"891641234",,,[9],[8]],[,,"14(?:5\\d|71)\\d{5}|4(?:[0-3]\\d|4[047-9]|5[0-25-9]|6[6-9]|7[02-9]|8[12547-9]|9[017-9])\\d{6}",,,,"412345678",,,[9]],[,,"180(?:0\\d{3}|2)\\d{3}",,,,"1800123456",,,[7,10]],[,,"19(?:0[0126]\\d|[679])\\d{5}",,,,"1900123456",,,[8,10]],[,,"13(?:00\\d{2})?\\d{4}",,,,"1300123456",,,[6,8,10]],[,,"500\\d{6}",,,,"500123456",
          ,,[9]],[,,"550\\d{6}",,,,"550123456",,,[9]],"CX",61,"(?:14(?:1[14]|34|4[17]|[56]6|7[47]|88))?001[14-689]","0",,,"0",,"0011",,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],CY:[,[,,"[257-9]\\d{7}",,,,,,,[8]],[,,"2[2-6]\\d{6}",,,,"22345678"],[,,"9[4-79]\\d{6}",,,,"96123456"],[,,"800\\d{5}",,,,"80001234"],[,,"90[09]\\d{5}",,,,"90012345"],[,,"80[1-9]\\d{5}",,,,"80112345"],[,,"700\\d{5}",,,,"70012345"],[,,,,,,,,,[-1]],"CY",357,"00",,,,,,,,[[,"(\\d{2})(\\d{6})","$1 $2"]],,[,,,,,
          ,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"(?:50|77)\\d{6}",,,,"77123456"],,,[,,,,,,,,,[-1]]],CZ:[,[,,"[2-8]\\d{8}|9\\d{8,11}",,,,,,,[9,10,11,12]],[,,"2\\d{8}|(?:3[1257-9]|4[16-9]|5[13-9])\\d{7}",,,,"212345678",,,[9]],[,,"(?:60[1-8]|7(?:0[2-5]|[2379]\\d))\\d{6}",,,,"601123456",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"9(?:0[05689]|76)\\d{6}",,,,"900123456",,,[9]],[,,"8[134]\\d{7}",,,,"811234567",,,[9]],[,,"70[01]\\d{6}",,,,"700123456",,,[9]],[,,"9[17]0\\d{6}",,,,"910123456",,,[9]],"CZ",420,"00",,,,,,,
          ,[[,"([2-9]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[2-8]|9[015-7]"]],[,"(96\\d)(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["96"]],[,"(9\\d)(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["9[36]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"9(?:5\\d|7[234])\\d{6}",,,,"972123456",,,[9]],,,[,,"9(?:3\\d{9}|6\\d{7,10})",,,,"93123456789"]],DE:[,[,,"[1-35-9]\\d{3,14}|4(?:[0-8]\\d{3,12}|9(?:[0-37]\\d|4(?:[1-35-8]|4\\d?)|5\\d{1,2}|6[1-8]\\d?)\\d{2,8})",,,,,,,[4,5,6,7,8,9,10,11,12,13,14,15],[3]],[,,"2\\d{5,13}|3(?:0\\d{3,13}|2\\d{9}|[3-9]\\d{4,13})|4(?:0\\d{3,12}|[1-8]\\d{4,12}|9(?:[0-37]\\d|4(?:[1-35-8]|4\\d?)|5\\d{1,2}|6[1-8]\\d?)\\d{2,8})|5(?:0[2-8]|[1256]\\d|[38][0-8]|4\\d{0,2}|[79][0-7])\\d{3,11}|6(?:\\d{5,13}|9\\d{3,12})|7(?:0[2-8]|[1-9]\\d)\\d{3,10}|8(?:0[2-9]|[1-8]\\d|9\\d?)\\d{3,10}|9(?:0[6-9]\\d{3,10}|1\\d{4,12}|[2-9]\\d{4,11})",
          ,,,"30123456",,,[5,6,7,8,9,10,11,12,13,14,15],[3,4]],[,,"1(?:5[0-25-9]\\d{8}|6[023]\\d{7,8}|7\\d{8,9})",,,,"15123456789",,,[10,11]],[,,"800\\d{7,12}",,,,"8001234567890",,,[10,11,12,13,14,15]],[,,"137[7-9]\\d{6}|900(?:[135]\\d{6}|9\\d{7})",,,,"9001234567",,,[10,11]],[,,"1(?:3(?:7[1-6]\\d{6}|8\\d{4})|80\\d{5,11})",,,,"18012345",,,[7,8,9,10,11,12,13,14]],[,,"700\\d{8}",,,,"70012345678",,,[11]],[,,,,,,,,,[-1]],"DE",49,"00","0",,,"0",,,,[[,"(1\\d{2})(\\d{7,8})","$1 $2",["1[67]"],"0$1"],[,"(15\\d{3})(\\d{6})",
          "$1 $2",["15[0568]"],"0$1"],[,"(1\\d{3})(\\d{7})","$1 $2",["15"],"0$1"],[,"(\\d{2})(\\d{3,11})","$1 $2",["3[02]|40|[68]9"],"0$1"],[,"(\\d{3})(\\d{3,11})","$1 $2",["2(?:0[1-389]|1[124]|2[18]|3[14]|[4-9]1)|3(?:[35-9][15]|4[015])|[4-8][1-9]1|9(?:06|[1-9]1)","2(?:0[1-389]|1(?:[14]|2[0-8])|2[18]|3[14]|[4-9]1)|3(?:[35-9][15]|4[015])|[4-8][1-9]1|9(?:06|[1-9]1)"],"0$1"],[,"(\\d{4})(\\d{2,11})","$1 $2",["[24-6]|3(?:[3569][02-46-9]|4[2-4679]|7[2-467]|8[2-46-8])|[7-9](?:0[1-9]|[1-9])","[24-6]|3(?:3(?:0[1-467]|2[127-9]|3[124578]|[46][1246]|7[1257-9]|8[1256]|9[145])|4(?:2[135]|3[1357]|4[13578]|6[1246]|7[1356]|9[1346])|5(?:0[14]|2[1-3589]|3[1357]|[49][1246]|6[1-4]|7[13468]|8[13568])|6(?:0[1356]|2[1-489]|3[124-6]|4[1347]|6[13]|7[12579]|8[1-356]|9[135])|7(?:2[1-7]|3[1357]|4[145]|6[1-5]|7[1-4])|8(?:21|3[1468]|4[1347]|6[0135-9]|7[1467]|8[136])|9(?:0[12479]|2[1358]|3[1357]|4[134679]|6[1-9]|7[136]|8[147]|9[1468]))|[7-9](?:0[1-9]|[1-9])"],
          "0$1"],[,"(3\\d{4})(\\d{1,10})","$1 $2",["3"],"0$1"],[,"(800)(\\d{7,12})","$1 $2",["800"],"0$1"],[,"(\\d{3})(\\d)(\\d{4,10})","$1 $2 $3",["1(?:37|80)|900","1(?:37|80)|900[1359]"],"0$1"],[,"(1\\d{2})(\\d{5,11})","$1 $2",["181"],"0$1"],[,"(18\\d{3})(\\d{6})","$1 $2",["185","1850","18500"],"0$1"],[,"(18\\d{2})(\\d{7})","$1 $2",["18[68]"],"0$1"],[,"(18\\d)(\\d{8})","$1 $2",["18[2-579]"],"0$1"],[,"(700)(\\d{4})(\\d{4})","$1 $2 $3",["700"],"0$1"],[,"(138)(\\d{4})","$1 $2",["138"],"0$1"],[,"(15[013-68])(\\d{2})(\\d{8})",
          "$1 $2 $3",["15[013-68]"],"0$1"],[,"(15[279]\\d)(\\d{2})(\\d{7})","$1 $2 $3",["15[279]"],"0$1"],[,"(1[67]\\d)(\\d{2})(\\d{7,8})","$1 $2 $3",["1(?:6[023]|7)"],"0$1"]],,[,,"16(?:4\\d{1,10}|[89]\\d{1,11})",,,,"16412345",,,[4,5,6,7,8,9,10,11,12,13,14]],,,[,,,,,,,,,[-1]],[,,"18(?:1\\d{5,11}|[2-9]\\d{8})",,,,"18500123456",,,[8,9,10,11,12,13,14]],,,[,,"1(?:5(?:(?:2\\d55|7\\d99|9\\d33)\\d{7}|(?:[034568]00|113)\\d{8})|6(?:013|255|399)\\d{7,8}|7(?:[015]13|[234]55|[69]33|[78]99)\\d{7,8})",,,,"177991234567",
          ,,[12,13]]],DJ:[,[,,"[27]\\d{7}",,,,,,,[8]],[,,"2(?:1[2-5]|7[45])\\d{5}",,,,"21360003"],[,,"77\\d{6}",,,,"77831001"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"DJ",253,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],DK:[,[,,"[2-9]\\d{7}",,,,,,,[8]],[,,"(?:[2-7]\\d|8[126-9]|9[1-36-9])\\d{6}",,,,"32123456"],[,,"(?:[2-7]\\d|8[126-9]|9[1-36-9])\\d{6}",,,,"20123456"],[,,"80\\d{6}",
          ,,,"80123456"],[,,"90\\d{6}",,,,"90123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"DK",45,"00",,,,,,,1,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],DM:[,[,,"[57-9]\\d{9}",,,,,,,[10],[7]],[,,"767(?:2(?:55|66)|4(?:2[01]|4[0-25-9])|50[0-4]|70[1-3])\\d{4}",,,,"7674201234",,,,[7]],[,,"767(?:2(?:[234689]5|7[5-7])|31[5-7]|61[1-7])\\d{4}",,,,"7672251234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],
          [,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:(?:00|22|33|44|66|77|88)[2-9]|21[23])\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"DM",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"767",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],DO:[,[,,"[589]\\d{9}",,,,,,,[10],[7]],[,,"8(?:[04]9[2-9]\\d{6}|29(?:2(?:[0-59]\\d|6[04-9]|7[0-27]|8[0237-9])|3(?:[0-35-9]\\d|4[7-9])|[45]\\d{2}|6(?:[0-27-9]\\d|[3-5][1-9]|6[0135-8])|7(?:0[013-9]|[1-37]\\d|4[1-35689]|5[1-4689]|6[1-57-9]|8[1-79]|9[1-8])|8(?:0[146-9]|1[0-48]|[248]\\d|3[1-79]|5[01589]|6[013-68]|7[124-8]|9[0-8])|9(?:[0-24]\\d|3[02-46-9]|5[0-79]|60|7[0169]|8[57-9]|9[02-9]))\\d{4})",
          ,,,"8092345678",,,,[7]],[,,"8[024]9[2-9]\\d{6}",,,,"8092345678",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:(?:00|22|33|44|66|77|88)[2-9]|21[23])\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"DO",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"8[024]9",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],DZ:[,[,,"(?:[1-4]|[5-9]\\d)\\d{7}",,,,,,,[8,9]],[,,"(?:1\\d|2[013-79]|3[0-8]|4[0135689])\\d{6}|9619\\d{5}",,,,"12345678"],[,,
          "(?:5[4-6]|7[7-9])\\d{7}|6(?:[569]\\d|7[0-6])\\d{6}",,,,"551234567",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"80[3-689]1\\d{5}",,,,"808123456",,,[9]],[,,"80[12]1\\d{5}",,,,"801123456",,,[9]],[,,,,,,,,,[-1]],[,,"98[23]\\d{6}",,,,"983123456",,,[9]],"DZ",213,"00","0",,,"0",,,,[[,"([1-4]\\d)(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[1-4]"],"0$1"],[,"([5-8]\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-8]"],"0$1"],[,"(9\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["9"],"0$1"]],,[,,,,,,,,,[-1]],
          ,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],EC:[,[,,"1\\d{9,10}|[2-8]\\d{7}|9\\d{8}",,,,,,,[8,9,10,11],[7]],[,,"[2-7][2-7]\\d{6}",,,,"22123456",,,[8],[7]],[,,"9(?:(?:39|[57][89]|[89]\\d)\\d|6(?:[0-27-9]\\d|30))\\d{5}",,,,"991234567",,,[9]],[,,"1800\\d{6,7}",,,,"18001234567",,,[10,11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"[2-7]890\\d{4}",,,,"28901234",,,[8]],"EC",593,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{4})","$1 $2-$3",["[247]|[356][2-8]"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{4})",
          "$1 $2 $3",["9"],"0$1"],[,"(1800)(\\d{3})(\\d{3,4})","$1 $2 $3",["180","1800"],"$1"]],[[,"(\\d)(\\d{3})(\\d{4})","$1-$2-$3",["[247]|[356][2-8]"]],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["9"],"0$1"],[,"(1800)(\\d{3})(\\d{3,4})","$1 $2 $3",["180","1800"],"$1"]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],EE:[,[,,"[3-9]\\d{6,7}|800\\d{6,7}",,,,,,,[7,8,10]],[,,"(?:3[23589]|4[3-8]|6\\d|7[1-9]|88)\\d{5}",,,,"3212345",,,[7]],[,,"(?:5\\d|8[1-5])\\d{6}|5(?:[02]\\d{2}|1(?:[0-8]\\d|95)|5[0-478]\\d|64[0-4]|65[1-589])\\d{3}",
          ,,,"51234567",,,[7,8]],[,,"800(?:0\\d{3}|1\\d|[2-9])\\d{3}",,,,"80012345"],[,,"(?:40\\d{2}|900)\\d{4}",,,,"9001234",,,[7,8]],[,,,,,,,,,[-1]],[,,"70[0-2]\\d{5}",,,,"70012345",,,[8]],[,,,,,,,,,[-1]],"EE",372,"00",,,,,,,,[[,"([3-79]\\d{2})(\\d{4})","$1 $2",["[369]|4[3-8]|5(?:[0-2]|5[0-478]|6[45])|7[1-9]","[369]|4[3-8]|5(?:[02]|1(?:[0-8]|95)|5[0-478]|6(?:4[0-4]|5[1-589]))|7[1-9]"]],[,"(70)(\\d{2})(\\d{4})","$1 $2 $3",["70"]],[,"(8000)(\\d{3})(\\d{3})","$1 $2 $3",["800","8000"]],[,"([458]\\d{3})(\\d{3,4})",
          "$1 $2",["40|5|8(?:00|[1-5])","40|5|8(?:00[1-9]|[1-5])"]]],,[,,,,,,,,,[-1]],,,[,,"800[2-9]\\d{3}",,,,"8002123",,,[7]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],EG:[,[,,"1\\d{4,9}|[24-6]\\d{8}|3\\d{7}|[89]\\d{8,9}",,,,,,,[8,9,10],[7]],[,,"(?:1(?:3[23]\\d|5(?:[23]|9\\d))|2[2-4]\\d{2}|3\\d{2}|4(?:0[2-5]|[578][23]|64)\\d|5(?:0[2-7]|5\\d|7[23])\\d|6[24-689]3\\d|8(?:2[2-57]|4[26]|6[237]|8[2-4])\\d|9(?:2[27]|3[24]|52|6[2356]|7[2-4])\\d)\\d{5}",,,,"234567890",,,[8,9],[7]],[,,"1[0125]\\d{8}",,,,"1001234567",,,[10]],
          [,,"800\\d{7}",,,,"8001234567",,,[10]],[,,"900\\d{7}",,,,"9001234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"EG",20,"00","0",,,"0",,,,[[,"(\\d)(\\d{7,8})","$1 $2",["[23]"],"0$1"],[,"(\\d{2})(\\d{6,7})","$1 $2",["1(?:3|5[239])|[4-6]|[89][2-9]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1[0-25]|[89]00"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],EH:[,[,,"[5-9]\\d{8}",,,,,,,[9]],[,,"528[89]\\d{5}",,,,"528812345"],[,,"(?:6(?:[0-79]\\d|8[0-247-9])|7(?:0[067]|6[1267]|7[017]))\\d{6}",
          ,,,"650123456"],[,,"80\\d{7}",,,,"801234567"],[,,"89\\d{7}",,,,"891234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"5924[01]\\d{4}",,,,"592401234"],"EH",212,"00","0",,,"0",,,,,,[,,,,,,,,,[-1]],,"528[89]",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],ER:[,[,,"[178]\\d{6}",,,,,,,[7],[6]],[,,"1(?:1[12568]|20|40|55|6[146])\\d{4}|8\\d{6}",,,,"8370362",,,,[6]],[,,"17[1-3]\\d{4}|7\\d{6}",,,,"7123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"ER",291,"00","0",,,"0",
          ,,,[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",,"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],ES:[,[,,"[5-9]\\d{8}",,,,,,,[9]],[,,"8(?:[1356]\\d|[28][0-8]|[47][1-9])\\d{6}|9(?:[135]\\d{7}|[28][0-8]\\d{6}|4[1-9]\\d{6}|6(?:[0-8]\\d{6}|9(?:0(?:[0-57-9]\\d{4}|6(?:0[0-8]|1[1-9]|[2-9]\\d)\\d{2})|[1-9]\\d{5}))|7(?:[124-9]\\d{2}|3(?:[0-8]\\d|9[1-9]))\\d{4})",,,,"810123456"],[,,"(?:6\\d{6}|7[1-48]\\d{5}|9(?:6906(?:09|10)|7390\\d{2}))\\d{2}",,,,"612345678"],[,,"[89]00\\d{6}",,,,"800123456"],
          [,,"80[367]\\d{6}",,,,"803123456"],[,,"90[12]\\d{6}",,,,"901123456"],[,,"70\\d{7}",,,,"701234567"],[,,,,,,,,,[-1]],"ES",34,"00",,,,,,,,[[,"([89]00)(\\d{3})(\\d{3})","$1 $2 $3",["[89]00"]],[,"([5-9]\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[568]|[79][0-8]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"51\\d{7}",,,,"511234567"],,,[,,,,,,,,,[-1]]],ET:[,[,,"[1-59]\\d{8}",,,,,,,[9],[7]],[,,"(?:11(?:1(?:1[124]|2[2-57]|3[1-5]|5[5-8]|8[6-8])|2(?:13|3[6-8]|5[89]|7[05-9]|8[2-6])|3(?:2[01]|3[0-289]|4[1289]|7[1-4]|87)|4(?:1[69]|3[2-49]|4[0-3]|6[5-8])|5(?:1[578]|44|5[0-4])|6(?:18|2[69]|39|4[5-7]|5[1-5]|6[0-59]|8[015-8]))|2(?:2(?:11[1-9]|22[0-7]|33\\d|44[1467]|66[1-68])|5(?:11[124-6]|33[2-8]|44[1467]|55[14]|66[1-3679]|77[124-79]|880))|3(?:3(?:11[0-46-8]|22[0-6]|33[0134689]|44[04]|55[0-6]|66[01467])|4(?:44[0-8]|55[0-69]|66[0-3]|77[1-5]))|4(?:6(?:22[0-24-7]|33[1-5]|44[13-69]|55[14-689]|660|88[1-4])|7(?:11[1-9]|22[1-9]|33[13-7]|44[13-6]|55[1-689]))|5(?:7(?:227|55[05]|(?:66|77)[14-8])|8(?:11[149]|22[013-79]|33[0-68]|44[013-8]|550|66[1-5]|77\\d)))\\d{4}",
          ,,,"111112345",,,,[7]],[,,"9\\d{8}",,,,"911234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"ET",251,"00","0",,,"0",,,,[[,"([1-59]\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[1-59]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],FI:[,[,,"1\\d{4,11}|[2-9]\\d{4,10}",,,,,,,[5,6,7,8,9,10,11,12]],[,,"1(?:[3569][1-8]\\d{3,9}|[47]\\d{5,10})|2[1-8]\\d{3,9}|3(?:[1-8]\\d{3,9}|9\\d{4,8})|[5689][1-8]\\d{3,9}",,,,"1312345678"],[,,"4(?:[0-8]\\d{4,9}|9\\d{3,8})|50\\d{4,8}",
          ,,,"412345678",,,[6,7,8,9,10,11]],[,,"800\\d{4,7}",,,,"8001234567",,,[7,8,9,10]],[,,"[67]00\\d{5,6}",,,,"600123456",,,[8,9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"FI",358,"00|99(?:[01469]|5(?:11|3[23]|41|5[59]|77|88|9[09]))","0",,,"0",,"00",,[[,"(\\d{3})(\\d{3,7})","$1 $2",["(?:[1-3]0|[6-8])0"],"0$1"],[,"(75\\d{3})","$1",["75[12]"],"0$1"],[,"(116\\d{3})","$1",["116"],"$1"],[,"(\\d{2})(\\d{4,10})","$1 $2",["[14]|2[09]|50|7[135]"],"0$1"],[,"(\\d)(\\d{4,11})","$1 $2",["[25689][1-8]|3"],"0$1"]],
          ,[,,,,,,,,,[-1]],1,,[,,"[13]00\\d{3,7}|2(?:0(?:0\\d{3,7}|2[023]\\d{1,6}|9[89]\\d{1,6}))|60(?:[12]\\d{5,6}|6\\d{7})|7(?:1\\d{7}|3\\d{8}|5[03-9]\\d{3,7})",,,,"100123",,,[5,6,7,8,9,10]],[,,"[13]0\\d{4,8}|2(?:0(?:[016-8]\\d{3,7}|[2-59]\\d{2,7})|9\\d{4,8})|60(?:[12]\\d{5,6}|6\\d{7})|7(?:1\\d{7}|3\\d{8}|5[03-9]\\d{3,7})",,,,"10112345",,,[5,6,7,8,9,10]],,,[,,,,,,,,,[-1]]],FJ:[,[,,"[2-9]\\d{6}|0\\d{10}",,,,,,,[7,11]],[,,"(?:3[0-5]\\d|6(?:03|[25-7]\\d)|8[58]\\d)\\d{4}",,,,"3212345",,,[7]],[,,"(?:[279]\\d|45|5[01568]|8[034679])\\d{5}",
          ,,,"7012345",,,[7]],[,,"0800\\d{7}",,,,"08001234567",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"FJ",679,"0(?:0|52)",,,,,,"00",,[[,"(\\d{3})(\\d{4})","$1 $2",["[2-9]"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["0"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],FK:[,[,,"[2-7]\\d{4}",,,,,,,[5]],[,,"[2-47]\\d{4}",,,,"31234"],[,,"[56]\\d{4}",,,,"51234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"FK",500,"00",
          ,,,,,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],FM:[,[,,"[39]\\d{6}",,,,,,,[7]],[,,"3[2357]0[1-9]\\d{3}|9[2-6]\\d{5}",,,,"3201234"],[,,"3[2357]0[1-9]\\d{3}|9[2-7]\\d{5}",,,,"3501234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"FM",691,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],FO:[,[,,"[2-9]\\d{5}",,,,,,,[6]],[,,"(?:20|[3-4]\\d|8[19])\\d{4}",,,,"201234"],[,,"(?:[27][1-9]|5\\d)\\d{4}",
          ,,,"211234"],[,,"80[257-9]\\d{3}",,,,"802123"],[,,"90(?:[1345][15-7]|2[125-7]|99)\\d{2}",,,,"901123"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:6[0-36]|88)\\d{4}",,,,"601234"],"FO",298,"00",,,,"(10(?:01|[12]0|88))",,,,[[,"(\\d{6})","$1",,,"$CC $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],FR:[,[,,"[1-9]\\d{8}",,,,,,,[9]],[,,"[1-5]\\d{8}",,,,"123456789"],[,,"(?:6\\d|7[3-9])\\d{7}",,,,"612345678"],[,,"80[0-5]\\d{6}",,,,"801234567"],[,,"8[129]\\d{7}",,,,"891123456"],[,,"884\\d{6}",
          ,,,"884012345"],[,,,,,,,,,[-1]],[,,"9\\d{8}",,,,"912345678"],"FR",33,"00","0",,,"0",,,,[[,"([1-79])(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["[1-79]"],"0$1"],[,"(1\\d{2})(\\d{3})","$1 $2",["11"],"$1"],[,"(8\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"],"0 $1"]],[[,"([1-79])(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["[1-79]"],"0$1"],[,"(8\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"],"0 $1"]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"80[6-9]\\d{6}",,,,"806123456"],,,[,,,
          ,,,,,,[-1]]],GA:[,[,,"0?\\d{7}",,,,,,,[7,8]],[,,"01\\d{6}",,,,"01441234",,,[8]],[,,"0?[2-7]\\d{6}",,,,"06031234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GA",241,"00",,,,,,,,[[,"(\\d)(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-7]"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["0"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GB:[,[,,"\\d{7,10}",,,,,,,[7,9,10],[4,5,6,8]],[,,"2(?:0[01378]|3[0189]|4[017]|8[0-46-9]|9[0-2])\\d{7}|1(?:1(?:3[0-48]|[46][0-4]|5[0-26-9]|[78][0-49])|21[0-7]|31[0-8]|[4-69]1\\d)\\d{6}|1(?:2(?:0[024-9]|2[3-9]|3[3-79]|4[1-689]|[58][02-9]|6[0-47-9]|7[013-9]|9\\d)|3(?:0\\d|[25][02-9]|3[02-579]|[468][0-46-9]|7[1-35-79]|9[2-578])|4(?:0[03-9]|[28][02-57-9]|[37]\\d|4[02-69]|5[0-8]|[69][0-79])|5(?:0[1-35-9]|2[024-9]|3[015689]|4[02-9]|5[03-9]|6\\d|7[0-35-9]|8[0-468]|9[0-57-9])|6(?:0[034689]|2[0-35689]|[38][013-9]|4[1-467]|5[0-69]|6[13-9]|7[0-8]|9[0124578])|7(?:0[0246-9]|2\\d|3[0236-8]|4[03-9]|5[0-46-9]|6[013-9]|7[0-35-9]|8[024-9]|9[02-9])|8(?:0[35-9]|2[1-57-9]|3[02-578]|4[0-578]|5[124-9]|6[2-69]|7\\d|8[02-9]|9[02569])|9(?:0[02-589]|2[02-689]|3[1-57-9]|4[2-9]|5[0-579]|6[2-47-9]|7[0-24578]|8\\d|9[2-57]))\\d{6}|1(?:2(?:0(?:46[1-4]|87[2-9])|545[1-79]|76(?:2\\d|3[1-8]|6[1-6])|9(?:7(?:2[0-4]|3[2-5])|8(?:2[2-8]|7[0-47-9]|8[345])))|3(?:638[2-5]|647[23]|8(?:47[04-9]|64[0157-9]))|4(?:044[1-7]|20(?:2[23]|8\\d)|6(?:0(?:30|5[2-57]|6[1-8]|7[2-8])|140)|8(?:052|87[123]))|5(?:24(?:3[2-79]|6\\d)|276\\d|6(?:26[06-9]|686))|6(?:06(?:4\\d|7[4-79])|295[567]|35[34]\\d|47(?:24|61)|59(?:5[08]|6[67]|74)|955[0-4])|7(?:26(?:6[13-9]|7[0-7])|442\\d|50(?:2[0-3]|[3-68]2|76))|8(?:27[56]\\d|37(?:5[2-5]|8[239])|84(?:3[2-58]))|9(?:0(?:0(?:6[1-8]|85)|52\\d)|3583|4(?:66[1-8]|9(?:2[01]|81))|63(?:23|3[1-4])|9561))\\d{3}|176888[2-46-8]\\d{2}|16977[23]\\d{3}",
          ,,,"1212345678",,,[9,10],[4,5,6,7,8]],[,,"7(?:[1-3]\\d{3}|4(?:[0-46-9]\\d{2}|5(?:[0-689]\\d|7[0-57-9]))|5(?:0[0-8]|[13-9]\\d|2[0-35-9])\\d|7(?:0(?:0[01]|[1-9]\\d)|[1-7]\\d{2}|8[02-9]\\d|9[0-689]\\d)|8(?:[014-9]\\d|[23][0-8])\\d|9(?:[024-9]\\d{2}|1(?:[02-9]\\d|1[028])|3[0-689]\\d))\\d{5}",,,,"7400123456",,,[10]],[,,"80(?:0(?:1111|\\d{6,7})|8\\d{7})",,,,"8001234567"],[,,"(?:87[123]|9(?:[01]\\d|8[2349]))\\d{7}",,,,"9012345678",,,[10]],[,,"8(?:4(?:5464\\d|[2-5]\\d{7})|70\\d{7})",,,,"8431234567",,,[7,
          10]],[,,"70\\d{8}",,,,"7012345678",,,[10]],[,,"56\\d{8}",,,,"5612345678",,,[10]],"GB",44,"00","0"," x",,"0",,,,[[,"(7\\d{3})(\\d{6})","$1 $2",["7(?:[1-57-9]|62)","7(?:[1-57-9]|624)"],"0$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["2|5[56]|7[06]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1(?:[02-9]1|1)|3|9[018]"],"0$1"],[,"(\\d{5})(\\d{4,5})","$1 $2",["1(?:38|5[23]|69|76|94)","1(?:(?:38|69)7|5(?:24|39)|768|946)","1(?:3873|5(?:242|39[4-6])|(?:697|768)[347]|9467)"],"0$1"],[,"(1\\d{3})(\\d{5,6})",
          "$1 $2",["1"],"0$1"],[,"(800)(\\d{4})","$1 $2",["800","8001","80011","800111","8001111"],"0$1"],[,"(845)(46)(4\\d)","$1 $2 $3",["845","8454","84546","845464"],"0$1"],[,"(8\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["8(?:4[2-5]|7[0-3])"],"0$1"],[,"(80\\d)(\\d{3})(\\d{4})","$1 $2 $3",["80"],"0$1"],[,"(800)(\\d{6})","$1 $2",["800"],"0$1"]],,[,,"76(?:0[012]|2[356]|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}",,,,"7640123456",,,[10]],1,,[,,,,,,,,,[-1]],[,,"(?:3[0347]|55)\\d{8}",,,,"5512345678",,,[10]],,,[,,,,,,
          ,,,[-1]]],GD:[,[,,"[4589]\\d{9}",,,,,,,[10],[7]],[,,"473(?:2(?:3[0-2]|69)|3(?:2[89]|86)|4(?:[06]8|3[5-9]|4[0-49]|5[5-79]|68|73|90)|63[68]|7(?:58|84)|800|938)\\d{4}",,,,"4732691234",,,,[7]],[,,"473(?:4(?:0[2-79]|1[04-9]|2[0-5]|58)|5(?:2[01]|3[3-8])|901)\\d{4}",,,,"4734031234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:(?:00|22|33|44|66|77|88)[2-9]|21[23])\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"GD",1,"011","1",,,
          "1",,,,,,[,,,,,,,,,[-1]],,"473",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GE:[,[,,"[34578]\\d{8}",,,,,,,[9],[6]],[,,"(?:3(?:[256]\\d|4[124-9]|7[0-4])|4(?:1\\d|2[2-7]|3[1-79]|4[2-8]|7[239]|9[1-7]))\\d{6}",,,,"322123456",,,,[6]],[,,"(?:5(?:[14]4|5[0157-9]|68|7[0147-9]|9[1-35-9])|790)\\d{6}",,,,"555123456"],[,,"800\\d{6}",,,,"800123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"706\\d{6}",,,,"706123456"],"GE",995,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",
          ["[348]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["5|790"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["7"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,"706\\d{6}",,,,"706123456"],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GF:[,[,,"[56]\\d{8}",,,,,,,[9]],[,,"594(?:[023]\\d|1[01]|4[03-9]|5[6-9]|6[0-3]|80|9[014])\\d{4}",,,,"594101234"],[,,"694(?:[0-249]\\d|3[0-48])\\d{4}",,,,"694201234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GF",594,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})",
          "$1 $2 $3 $4",,"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GG:[,[,,"[135789]\\d{6,9}",,,,,,,[7,9,10],[6]],[,,"1481[25-9]\\d{5}",,,,"1481256789",,,[10],[6]],[,,"7(?:781\\d|839\\d|911[17])\\d{5}",,,,"7781123456",,,[10]],[,,"80(?:0(?:1111|\\d{6,7})|8\\d{7})",,,,"8001234567"],[,,"(?:87[123]|9(?:[01]\\d|8[0-3]))\\d{7}",,,,"9012345678",,,[10]],[,,"8(?:4(?:5464\\d|[2-5]\\d{7})|70\\d{7})",,,,"8431234567",,,[7,10]],[,,"70\\d{8}",,,,"7012345678",,,[10]],[,,"56\\d{8}",,,,"5612345678",
          ,,[10]],"GG",44,"00","0",,,"0",,,,,,[,,"76(?:0[012]|2[356]|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}",,,,"7640123456",,,[10]],,,[,,,,,,,,,[-1]],[,,"(?:3[0347]|55)\\d{8}",,,,"5512345678",,,[10]],,,[,,,,,,,,,[-1]]],GH:[,[,,"[235]\\d{8}|8\\d{7}",,,,,,,[8,9],[7]],[,,"3(?:0(?:[237]\\d|80)|[167](?:2[0-6]|7\\d|80)|2(?:2[0-5]|7\\d|80)|3(?:2[0-3]|7\\d|80)|4(?:2[013-9]|3[01]|7\\d|80)|5(?:2[0-7]|7\\d|80)|8(?:2[0-2]|7\\d|80)|9(?:[28]0|7\\d))\\d{5}",,,,"302345678",,,[9],[7]],[,,"(?:2[034678]\\d|5(?:[0457]\\d|6[01]))\\d{6}",
          ,,,"231234567",,,[9]],[,,"800\\d{5}",,,,"80012345",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GH",233,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[235]"],"0$1"],[,"(\\d{3})(\\d{5})","$1 $2",["8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,"800\\d{5}",,,,"80012345",,,[8]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GI:[,[,,"[256]\\d{7}",,,,,,,[8]],[,,"2(?:00\\d{2}|1(?:6[24-7]\\d|90[0-2])|2(?:2[2457]\\d|50[0-2]))\\d{3}",,,,"20012345"],[,,"(?:5[46-8]|62)\\d{6}",,,,"57123456"],
          [,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GI",350,"00",,,,,,,,[[,"(\\d{3})(\\d{5})","$1 $2",["2"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GL:[,[,,"[1-689]\\d{5}",,,,,,,[6]],[,,"(?:19|3[1-7]|6[14689]|8[14-79]|9\\d)\\d{4}",,,,"321000"],[,,"(?:[25][1-9]|4[2-9])\\d{4}",,,,"221234"],[,,"80\\d{4}",,,,"801234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"3[89]\\d{4}",,,,"381234"],"GL",299,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})",
          "$1 $2 $3"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GM:[,[,,"[2-9]\\d{6}",,,,,,,[7]],[,,"(?:4(?:[23]\\d{2}|4(?:1[024679]|[6-9]\\d))|5(?:54[0-7]|6(?:[67]\\d)|7(?:1[04]|2[035]|3[58]|48))|8\\d{3})\\d{3}",,,,"5661234"],[,,"[23679]\\d{6}",,,,"3012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GM",220,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GN:[,[,,"[367]\\d{7,8}",
          ,,,,,,[8,9]],[,,"30(?:24|3[12]|4[1-35-7]|5[13]|6[189]|[78]1|9[1478])\\d{4}",,,,"30241234",,,[8]],[,,"6[02356]\\d{7}",,,,"601123456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"722\\d{6}",,,,"722123456",,,[9]],"GN",224,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["3"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[67]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GP:[,[,,"[56]\\d{8}",,,,,,,[9]],[,,"590(?:0[1-68]|1[0-2]|2[0-68]|3[1289]|4[0-24-9]|5[3-579]|6[0189]|7[08]|8[0-689]|9\\d)\\d{4}",
          ,,,"590201234"],[,,"69(?:0\\d{2}|1(?:2[29]|3[0-5]))\\d{4}",,,,"690001234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GP",590,"00","0",,,"0",,,,[[,"([56]\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["590|69[01]"],"0$1"]],,[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GQ:[,[,,"[23589]\\d{8}",,,,,,,[9]],[,,"3(?:3(?:3\\d[7-9]|[0-24-9]\\d[46])|5\\d{2}[7-9])\\d{4}",,,,"333091234"],[,,"(?:222|55[15])\\d{6}",,,,"222123456"],[,,"80\\d[1-9]\\d{5}",
          ,,,"800123456"],[,,"90\\d[1-9]\\d{5}",,,,"900123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GQ",240,"00",,,,,,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[235]"]],[,"(\\d{3})(\\d{6})","$1 $2",["[89]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GR:[,[,,"[26-9]\\d{9}",,,,,,,[10]],[,,"2(?:1\\d{2}|2(?:2[1-46-9]|3[1-8]|4[1-7]|5[1-4]|6[1-8]|7[1-5]|[89][1-9])|3(?:1\\d|2[1-57]|[35][1-3]|4[13]|7[1-7]|8[124-6]|9[1-79])|4(?:1\\d|2[1-8]|3[1-4]|4[13-5]|6[1-578]|9[1-5])|5(?:1\\d|[29][1-4]|3[1-5]|4[124]|5[1-6])|6(?:1\\d|3[1245]|4[1-7]|5[13-9]|[269][1-6]|7[14]|8[1-5])|7(?:1\\d|2[1-5]|3[1-6]|4[1-7]|5[1-57]|6[135]|9[125-7])|8(?:1\\d|2[1-5]|[34][1-4]|9[1-57]))\\d{6}",
          ,,,"2123456789"],[,,"6(?:8[57-9]|9\\d)\\d{7}",,,,"6912345678"],[,,"800\\d{7}",,,,"8001234567"],[,,"90[19]\\d{7}",,,,"9091234567"],[,,"8(?:0[16]|12|25)\\d{7}",,,,"8011234567"],[,,"70\\d{8}",,,,"7012345678"],[,,,,,,,,,[-1]],"GR",30,"00",,,,,,,,[[,"([27]\\d)(\\d{4})(\\d{4})","$1 $2 $3",["21|7"]],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["2[2-9]1|[689]"]],[,"(2\\d{3})(\\d{6})","$1 $2",["2[2-9][02-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GT:[,[,,"[2-7]\\d{7}|1[89]\\d{9}",
          ,,,,,,[8,11]],[,,"[267][2-9]\\d{6}",,,,"22456789",,,[8]],[,,"[345]\\d{7}",,,,"51234567",,,[8]],[,,"18[01]\\d{8}",,,,"18001112222",,,[11]],[,,"19\\d{9}",,,,"19001112222",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GT",502,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[2-7]"]],[,"(\\d{4})(\\d{3})(\\d{4})","$1 $2 $3",["1"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GU:[,[,,"[5689]\\d{9}",,,,,,,[10],[7]],[,,"671(?:3(?:00|3[39]|4[349]|55|6[26])|4(?:00|56|7[1-9]|8[0236-9])|5(?:55|6[2-5]|88)|6(?:3[2-578]|4[24-9]|5[34]|78|8[235-9])|7(?:[079]7|2[0167]|3[45]|47|8[7-9])|8(?:[2-57-9]8|6[48])|9(?:2[29]|6[79]|7[1279]|8[7-9]|9[78]))\\d{4}",
          ,,,"6713001234",,,,[7]],[,,"671(?:3(?:00|3[39]|4[349]|55|6[26])|4(?:00|56|7[1-9]|8[0236-9])|5(?:55|6[2-5]|88)|6(?:3[2-578]|4[24-9]|5[34]|78|8[235-9])|7(?:[079]7|2[0167]|3[45]|47|8[7-9])|8(?:[2-57-9]8|6[48])|9(?:2[29]|6[79]|7[1279]|8[7-9]|9[78]))\\d{4}",,,,"6713001234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:(?:00|22|33|44|66|77|88)[2-9]|21[23])\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"GU",1,"011","1",,,"1",,,1,
          ,,[,,,,,,,,,[-1]],,"671",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],GW:[,[,,"(?:4(?:0\\d{5}|4\\d{7})|9\\d{8})",,,,,,,[7,9]],[,,"443\\d{6}",,,,"443201234",,,[9]],[,,"9(?:5\\d|6[569]|77)\\d{6}",,,,"955012345",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"40\\d{5}",,,,"4012345",,,[7]],"GW",245,"00",,,,,,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["44|9[5-7]"]],[,"(\\d{3})(\\d{4})","$1 $2",["40"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],
        GY:[,[,,"[2-46-9]\\d{6}",,,,,,,[7]],[,,"(?:2(?:1[6-9]|2[0-35-9]|3[1-4]|5[3-9]|6\\d|7[0-24-79])|3(?:2[25-9]|3\\d)|4(?:4[0-24]|5[56])|77[1-57])\\d{4}",,,,"2201234"],[,,"6\\d{6}",,,,"6091234"],[,,"(?:289|862)\\d{4}",,,,"2891234"],[,,"9008\\d{3}",,,,"9008123"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"GY",592,"001",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],HK:[,[,,"[2-7]\\d{7}|8[0-4]\\d{6,7}|9\\d{4,10}",,,,,,,[5,6,7,8,9,11]],[,
          ,"(?:2(?:[13-8]\\d|2[013-9]|9[0-24-9])\\d|3(?:[1569][0-24-9]\\d|4[0-246-9]\\d|7[0-24-69]\\d|8(?:4[04]|9\\d))|58(?:0[1-8]|1[2-9]))\\d{4}",,,,"21234567",,,[8]],[,,"(?:46(?:0[0-6]|4[0-57-9])|5(?:[1-59][0-46-9]\\d|6[0-4689]\\d|7(?:[0-2469]\\d|30))|6(?:0[1-9]\\d|[1459]\\d{2}|2(?:[0-57-9]\\d|6[01])|[368][0-57-9]\\d|7[0-79]\\d)|707[1-5]|8480|9(?:0[1-9]\\d|1[02-9]\\d|2(?:[0-8]\\d|9[03-9])|[358][0-8]\\d|[467]\\d{2}))\\d{4}",,,,"51234567",,,[8]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"900(?:[0-24-9]\\d{7}|3\\d{1,4})",
          ,,,"90012345678",,,[5,6,7,8,11]],[,,,,,,,,,[-1]],[,,"8(?:1[0-4679]\\d|2(?:[0-36]\\d|7[0-4])|3(?:[034]\\d|2[09]|70))\\d{4}",,,,"81123456",,,[8]],[,,,,,,,,,[-1]],"HK",852,"00(?:[126-9]|30|5[09])?",,,,,,"00",,[[,"(\\d{4})(\\d{4})","$1 $2",["[2-7]|[89](?:0[1-9]|[1-9])"]],[,"(800)(\\d{3})(\\d{3})","$1 $2 $3",["800"]],[,"(900)(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3 $4",["900"]],[,"(900)(\\d{2,5})","$1 $2",["900"]]],,[,,"7(?:1(?:0[0-38]|1[0-3679]|3[013]|69|9[136])|2(?:[02389]\\d|1[18]|7[27-9])|3(?:[0-38]\\d|7[0-369]|9[2357-9])|47\\d|5(?:[178]\\d|5[0-5])|6(?:0[0-7]|2[236-9]|[35]\\d)|7(?:[27]\\d|8[7-9])|8(?:[23689]\\d|7[1-9])|9(?:[025]\\d|6[0-246-8]|7[0-36-9]|8[238]))\\d{4}",
          ,,,"71123456",,,[8]],,,[,,,,,,,,,[-1]],[,,"30(?:0[1-9]|[15-7]\\d|2[047]|89)\\d{4}",,,,"30161234",,,[8]],,,[,,,,,,,,,[-1]]],HN:[,[,,"[237-9]\\d{7}",,,,,,,[8]],[,,"2(?:2(?:0[019]|1[1-36]|[23]\\d|4[04-6]|5[57]|7[013689]|8[0146-9]|9[012])|4(?:07|2[3-59]|3[13-689]|4[0-68]|5[1-35])|5(?:16|4[03-5]|5\\d|6[4-6]|74)|6(?:[056]\\d|17|3[04]|4[0-378]|[78][0-8]|9[01])|7(?:6[46-9]|7[02-9]|8[034])|8(?:79|8[0-35789]|9[1-57-9]))\\d{4}",,,,"22123456"],[,,"[37-9]\\d{7}",,,,"91234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],
          [,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"HN",504,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1-$2"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],HR:[,[,,"[1-7]\\d{5,8}|[89]\\d{6,8}",,,,,,,[6,7,8,9]],[,,"1\\d{7}|(?:2[0-3]|3[1-5]|4[02-47-9]|5[1-3])\\d{6,7}",,,,"12345678",,,[8,9],[6,7]],[,,"9(?:01\\d|[1259]\\d{2}|7(?:[0679]\\d|51)|8\\d{1,2})\\d{5}",,,,"921234567",,,[8,9]],[,,"80[01]\\d{4,6}",,,,"800123456",,,[7,8,9]],[,,"6(?:[01]\\d{0,2}|[459]\\d{2})\\d{4}",,,,"611234",,,[6,
          7,8]],[,,,,,,,,,[-1]],[,,"7[45]\\d{6}",,,,"74123456",,,[8]],[,,,,,,,,,[-1]],"HR",385,"00","0",,,"0",,,,[[,"(1)(\\d{4})(\\d{3})","$1 $2 $3",["1"],"0$1"],[,"([2-5]\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-5]"],"0$1"],[,"(9\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["9"],"0$1"],[,"(6[01])(\\d{2})(\\d{2,3})","$1 $2 $3",["6[01]"],"0$1"],[,"([67]\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[67]"],"0$1"],[,"(80[01])(\\d{2})(\\d{2,3})","$1 $2 $3",["80[01]"],"0$1"],[,"(80[01])(\\d{3})(\\d{3})","$1 $2 $3",["80[01]"],"0$1"]],
          ,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"(?:62\\d?|72)\\d{6}",,,,"62123456",,,[8,9]],,,[,,,,,,,,,[-1]]],HT:[,[,,"[2-489]\\d{7}",,,,,,,[8]],[,,"2(?:2\\d|5[1-5]|81|9[149])\\d{5}",,,,"22453300"],[,,"[34]\\d{7}",,,,"34101234"],[,,"8\\d{7}",,,,"80012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:9(?:[67][0-4]|8[0-3589]|9\\d))\\d{5}",,,,"98901234"],"HT",509,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],HU:[,[,,"[1-9]\\d{7,8}",
          ,,,,,,[8,9],[6]],[,,"(?:1\\d|2[2-9]|3[2-7]|4[24-9]|5[2-79]|6[23689]|7[2-9]|8[2-57-9]|9[2-69])\\d{6}",,,,"12345678",,,[8],[6]],[,,"(?:[257]0|3[01])\\d{7}",,,,"201234567",,,[9]],[,,"[48]0\\d{6}",,,,"80123456",,,[8]],[,,"9[01]\\d{6}",,,,"90123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"21\\d{7}",,,,"211234567",,,[9]],"HU",36,"00","06",,,"06",,,,[[,"(1)(\\d{3})(\\d{4})","$1 $2 $3",["1"],"($1)"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-9]"],"($1)"]],,[,,,,,,,,,[-1]],,,[,,"[48]0\\d{6}",,,,"80123456",
          ,,[8]],[,,"38\\d{7}",,,,"381234567",,,[9]],,,[,,,,,,,,,[-1]]],ID:[,[,,"(?:[1-79]\\d{6,10}|8\\d{7,11})",,,,,,,[7,8,9,10,11,12],[5,6]],[,,"2(?:1(?:14\\d{3}|500\\d{3}|\\d{7,8})|2\\d{6,8}|4\\d{7,8})|(?:2(?:[35][1-4]|6[0-8]|7[1-6]|8\\d|9[1-8])|3(?:1|[25][1-8]|3[1-68]|4[1-3]|6[1-3568]|7[0-469]|8\\d)|4(?:0[1-589]|1[01347-9]|2[0-36-8]|3[0-24-68]|43|5[1-378]|6[1-5]|7[134]|8[1245])|5(?:1[1-35-9]|2[25-8]|3[124-9]|4[1-3589]|5[1-46]|6[1-8])|6(?:19?|[25]\\d|3[1-69]|4[1-6])|7(?:02|[125][1-9]|[36]\\d|4[1-8]|7[0-36-9])|9(?:0[12]|1[013-8]|2[0-479]|5[125-8]|6[23679]|7[159]|8[01346]))\\d{5,8}",
          ,,,"612345678",,,[7,8,9,10,11],[5,6]],[,,"(?:2(?:1(?:3[145]|4[01]|5[1-469]|60|8[0359])|2(?:88|9[1256])|3[1-4]9|4(?:36|91)|5(?:1[349]|[2-4]9)|6[0-7]9|7(?:[1-36]9|4[39])|8[1-5]9|9[1-48]9)|3(?:19[1-3]|2[12]9|3[13]9|4(?:1[69]|39)|5[14]9|6(?:1[69]|2[89])|709)|4[13]19|5(?:1(?:19|8[39])|4[129]9|6[12]9)|6(?:19[12]|2(?:[23]9|77))|7(?:1[13]9|2[15]9|419|5(?:1[89]|29)|6[15]9|7[178]9))\\d{5,6}|8[1-35-9]\\d{7,10}",,,,"812345678",,,[9,10,11,12]],[,,"177\\d{6,8}|800\\d{5,7}",,,,"8001234567",,,[8,9,10,11]],[,,"809\\d{7}",
          ,,,"8091234567",,,[10]],[,,"804\\d{7}",,,,"8041234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"ID",62,"0(?:0[1789]|10(?:00|1[67]))","0",,,"0",,,,[[,"(\\d{2})(\\d{5,8})","$1 $2",["2[124]|[36]1"],"(0$1)"],[,"(\\d{3})(\\d{5,8})","$1 $2",["2[035-9]|[36][02-9]|[4579]"],"(0$1)"],[,"(8\\d{2})(\\d{3,4})(\\d{3})","$1-$2-$3",["8[1-35-9]"],"0$1"],[,"(8\\d{2})(\\d{4})(\\d{4,5})","$1-$2-$3",["8[1-35-9]"],"0$1"],[,"(1)(500)(\\d{3})","$1 $2 $3",["150","1500"],"$1"],[,"(177)(\\d{6,8})","$1 $2",["177"],"0$1"],[,
          "(800)(\\d{5,7})","$1 $2",["800"],"0$1"],[,"(804)(\\d{3})(\\d{4})","$1 $2 $3",["804"],"0$1"],[,"(80\\d)(\\d)(\\d{3})(\\d{3})","$1 $2 $3 $4",["80[79]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,"8071\\d{6}",,,,"8071123456",,,[10]],[,,"1500\\d{3}|8071\\d{6}",,,,"8071123456",,,[7,10]],,,[,,,,,,,,,[-1]]],IE:[,[,,"[124-9]\\d{6,9}",,,,,,,[7,8,9,10],[5,6]],[,,"1\\d{7,8}|2(?:1\\d{6,7}|3\\d{7}|[24-9]\\d{5})|4(?:0[24]\\d{5}|[1-469]\\d{7}|5\\d{6}|7\\d{5}|8[0-46-9]\\d{7})|5(?:0[45]\\d{5}|1\\d{6}|[23679]\\d{7}|8\\d{5})|6(?:1\\d{6}|[237-9]\\d{5}|[4-6]\\d{7})|7[14]\\d{7}|9(?:1\\d{6}|[04]\\d{7}|[35-9]\\d{5})",
          ,,,"2212345",,,,[5,6]],[,,"8(?:22\\d{6}|[35-9]\\d{7})",,,,"850123456",,,[9]],[,,"1800\\d{6}",,,,"1800123456",,,[10]],[,,"15(?:1[2-8]|[2-8]0|9[089])\\d{6}",,,,"1520123456",,,[10]],[,,"18[59]0\\d{6}",,,,"1850123456",,,[10]],[,,"700\\d{6}",,,,"700123456",,,[9]],[,,"76\\d{7}",,,,"761234567",,,[9]],"IE",353,"00","0",,,"0",,,,[[,"(1)(\\d{3,4})(\\d{4})","$1 $2 $3",["1"],"(0$1)"],[,"(\\d{2})(\\d{5})","$1 $2",["2[24-9]|47|58|6[237-9]|9[35-9]"],"(0$1)"],[,"(\\d{3})(\\d{5})","$1 $2",["40[24]|50[45]"],"(0$1)"],
          [,"(48)(\\d{4})(\\d{4})","$1 $2 $3",["48"],"(0$1)"],[,"(818)(\\d{3})(\\d{3})","$1 $2 $3",["818"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[24-69]|7[14]"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["76|8[35-9]"],"0$1"],[,"(8\\d)(\\d)(\\d{3})(\\d{4})","$1 $2 $3 $4",["8[35-9]5"],"0$1"],[,"(700)(\\d{3})(\\d{3})","$1 $2 $3",["700"],"0$1"],[,"(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1(?:5|8[059])","1(?:5|8[059]0)"],"$1"]],,[,,,,,,,,,[-1]],,,[,,"18[59]0\\d{6}",,,,"1850123456",,,[10]],[,
          ,"818\\d{6}",,,,"818123456",,,[9]],,,[,,"8[35-9]5\\d{7}",,,,"8551234567",,,[10]]],IL:[,[,,"1\\d{6,11}|[2-589]\\d{3}(?:\\d{3,6})?|6\\d{3}|7\\d{6,9}",,,,,,,[4,7,8,9,10,11,12]],[,,"(?:153\\d{1,2}|[2-489])\\d{7}",,,,"21234567",,,[8,11,12],[7]],[,,"5(?:[0-489][2-9]\\d|5(?:01|[23][23]|4[45]|5[015689]|6[6-8]|7[0-267]|8[7-9]|9[1-9])|6\\d{2})\\d{5}",,,,"502345678",,,[9]],[,,"1(?:80[019]\\d{3}|255)\\d{3}",,,,"1800123456",,,[7,10]],[,,"1(?:212|(?:9(?:0[01]|19)|200)\\d{2})\\d{4}",,,,"1919123456",,,[8,9,10]],
          [,,"1700\\d{6}",,,,"1700123456",,,[10]],[,,,,,,,,,[-1]],[,,"7(?:18\\d|2[23]\\d|3[237]\\d|47\\d|6[58]\\d|7\\d{2}|8(?:2\\d|33|55|77|81)|9[2579]\\d)\\d{5}",,,,"771234567",,,[9]],"IL",972,"0(?:0|1[2-9])","0",,,"0",,,,[[,"([2-489])(\\d{3})(\\d{4})","$1-$2-$3",["[2-489]"],"0$1"],[,"([57]\\d)(\\d{3})(\\d{4})","$1-$2-$3",["[57]"],"0$1"],[,"(153)(\\d{1,2})(\\d{3})(\\d{4})","$1 $2 $3 $4",["153"]],[,"(1)([7-9]\\d{2})(\\d{3})(\\d{3})","$1-$2-$3-$4",["1[7-9]"]],[,"(1255)(\\d{3})","$1-$2",["125","1255"]],[,"(1200)(\\d{3})(\\d{3})",
            "$1-$2-$3",["120","1200"]],[,"(1212)(\\d{2})(\\d{2})","$1-$2-$3",["121","1212"]],[,"(1599)(\\d{6})","$1-$2",["159","1599"]],[,"(151)(\\d{1,2})(\\d{3})(\\d{4})","$1-$2 $3-$4",["151"]],[,"(\\d{4})","*$1",["[2-689]"]]],,[,,,,,,,,,[-1]],,,[,,"1700\\d{6}|[2-689]\\d{3}",,,,"1700123456",,,[4,10]],[,,"[2-689]\\d{3}|1599\\d{6}",,,,"1599123456",,,[4,10]],,,[,,"151\\d{8,9}",,,,"15112340000",,,[11,12]]],IM:[,[,,"[135789]\\d{6,9}",,,,,,,[10],[6]],[,,"1624[5-8]\\d{5}",,,,"1624756789",,,,[6]],[,,"7(?:4576|[59]24\\d|624[0-4689])\\d{5}",
          ,,,"7924123456"],[,,"808162\\d{4}",,,,"8081624567"],[,,"(?:872299|90[0167]624)\\d{4}",,,,"9016247890"],[,,"8(?:4(?:40[49]06|5624\\d)|70624\\d)\\d{3}",,,,"8456247890"],[,,"70\\d{8}",,,,"7012345678"],[,,"56\\d{8}",,,,"5612345678"],"IM",44,"00","0",,,"0",,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"3(?:08162\\d|3\\d{5}|4(?:40[49]06|5624\\d)|7(?:0624\\d|2299\\d))\\d{3}|55\\d{8}",,,,"5512345678"],,,[,,,,,,,,,[-1]]],IN:[,[,,"008\\d{9}|1\\d{7,12}|[2-9]\\d{9,10}",,,,,,,[8,9,10,11,12,13],[6,7]],[,,"(?:11|2[02]|33|4[04]|79|80)[2-7]\\d{7}|(?:1(?:2[0-249]|3[0-25]|4[145]|[59][14]|6[014]|7[1257]|8[01346])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|[36][25]|22|4[28]|5[12]|[78]1|9[15])|6(?:12|[2345]1|57|6[13]|7[14]|80)|7(?:12|2[14]|3[134]|4[47]|5[15]|[67]1|88)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91))[2-7]\\d{6}|(?:(?:1(?:2[35-8]|3[346-9]|4[236-9]|[59][0235-9]|6[235-9]|7[34689]|8[257-9])|2(?:1[134689]|3[24-8]|4[2-8]|5[25689]|6[2-4679]|7[13-79]|8[2-479]|9[235-9])|3(?:01|1[79]|2[1-5]|4[25-8]|5[125689]|6[235-7]|7[157-9]|8[2-46-8])|4(?:1[14578]|2[5689]|3[2-467]|5[4-7]|6[35]|73|8[2689]|9[2389])|5(?:[16][146-9]|2[14-8]|3[1346]|4[14-69]|5[46]|7[2-4]|8[2-8]|9[246])|6(?:1[1358]|2[2457]|3[2-4]|4[235-7]|[57][2-689]|6[24-578]|8[1-6])|8(?:1[1357-9]|2[235-8]|3[03-57-9]|4[0-24-9]|5\\d|6[2457-9]|7[1-6]|8[1256]|9[2-4]))\\d|7(?:(?:1[013-9]|2[0235-9]|3[2679]|4[1-35689]|5[2-46-9]|[67][02-9]|9\\d)\\d|8(?:2[0-6]|[013-8]\\d)))[2-7]\\d{5}",
          ,,,"1123456789",,,[10],[6,7,8]],[,,"(?:6(?:0(?:0[0-35]|26)\\d|1279|2(?:0[0-49]|3[589]|[68][0-49]|9[0-6])\\d|3(?:0[0-39]\\d|5(?:0[0-6]|[1-9]\\d)|6[0-2]\\d|7[015-79]\\d|[89][0-79]\\d)|90[019]\\d)|7(?:0\\d{3}|19[0-5]\\d|2(?:[0235679]\\d{2}|[14][017-9]\\d|8(?:[0-59]\\d|[678][089]))|3(?:[05-8]\\d{2}|1(?:[089]\\d|11|7[024-8])|2(?:[0-49][089]|[5-8]\\d)|3[017-9]\\d|4(?:[07-9]\\d|11)|9(?:[016-9]\\d|[2-5][089]))|4(?:0\\d{2}|1(?:[015-9]\\d|[23][089]|4[089])|2(?:0[089]|[1-7][089]|[89]\\d)|3(?:[0-8][089]|9\\d)|4(?:[089]\\d|11|7[02-8])|[56]\\d[089]|7(?:[089]\\d|11|7[02-8])|8(?:[0-24-7][089]|[389]\\d)|9(?:[0-6][089]|7[089]|[89]\\d))|5(?:[0346-8]\\d{2}|1(?:[07-9]\\d|11)|2(?:[04-9]\\d|[123][089])|5[017-9]\\d|9(?:[0-6][089]|[7-9]\\d))|6(?:0(?:[0-47]\\d|[5689][089])|(?:1[0-257-9]|[6-9]\\d)\\d|2(?:[0-4]\\d|[5-9][089])|3(?:[02-8][089]|[19]\\d)|4\\d[089]|5(?:[0-367][089]|[4589]\\d))|7(?:0(?:0[02-9]|[13-7][089]|[289]\\d)|[1-9]\\d{2})|8(?:[0-79]\\d{2}|8(?:[089]\\d|11|7[02-9]))|9(?:[089]\\d{2}|313|7(?:[02-8]\\d|9[07-9])))|8(?:0(?:[01589]\\d{2}|6[67]\\d|7(?:[02-8]\\d|9[04-9]))|1(?:[02-57-9]\\d{2}|1(?:[0-35-9]\\d|4[0-46-9])|6(?:[089]\\d|7[02-8]))|2(?:0(?:[089]\\d|7[02-8])|[14](?:[089]\\d|7[02-8])|[235-9]\\d{2})|3(?:[0357-9]\\d{2}|1(?:[089]\\d|7[02-8])|2(?:[09]\\d|7[02-8]|8[0-689])|4\\d{2}|6(?:[089]\\d|7[02-8]))|[45]\\d{3}|6(?:[02457-9]\\d{2}|1(?:[089]\\d|7[02-8])|3(?:[089]\\d|7[02-8])|6(?:[08]\\d|7[02-8]|9\\d))|7(?:0[07-9]\\d|[1-69]\\d{2}|[78](?:[089]\\d|7[02-8]))|8(?:[0-25-9]\\d{2}|3(?:[089]\\d|7[02-8])|4(?:[0489]\\d|7[02-8]))|9(?:[02-9]\\d{2}|1(?:[0289]\\d|7[02-8])))|9\\d{4})\\d{5}",
          ,,,"8123456789",,,[10]],[,,"00800\\d{7}|1(?:600\\d{6}|80(?:0\\d{4,9}|3\\d{9}))",,,,"1800123456"],[,,"186[12]\\d{9}",,,,"1861123456789",,,[13]],[,,"1860\\d{7}",,,,"18603451234",,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"IN",91,"00","0",,,"0",,,,[[,"(\\d{8})","$1",["561","5616","56161"],"$1",,1],[,"(\\d{5})(\\d{5})","$1 $2",["6(?:0[02]|12|2[03689]|3[05-9]|9[019])|7(?:[02-8]|19|9[037-9])|8(?:0[015-9]|[1-9])|9","6(?:0(?:0|26)|127|2(?:0[0-49]|3[589]|[68][0-39]|9[0-46])|3(?:0[0-39]|5[0-46-9]|6[0-2]|7[015-79]|[89][0-79])|9[019])|7(?:[07]|19[0-5]|2(?:[0235-9]|[14][017-9])|3(?:[025-9]|[134][017-9])|4(?:[0-35689]|[47][017-9])|5(?:[02-46-9]|[15][017-9])|6(?:[02-9]|1[0-257-9])|8(?:[0-79]|8[0189])|9(?:[089]|31|7[02-9]))|8(?:0(?:[01589]|6[67]|7[02-9])|1(?:[0-57-9]|6[07-9])|2(?:[014][07-9]|[235-9])|3(?:[03-57-9]|[126][07-9])|[45]|6(?:[02457-9]|[136][07-9])|7(?:[078][07-9]|[1-69])|8(?:[0-25-9]|3[07-9]|4[047-9])|9(?:[02-9]|1[027-9]))|9",
          "6(?:0(?:0|26)|1279|2(?:0[0-49]|3[589]|[68][0-39]|9[0-46])|3(?:0[0-39]|5[0-46-9]|6[0-2]|7[015-79]|[89][0-79])|9[019])|7(?:0|19[0-5]|2(?:[0235-79]|[14][017-9]|8(?:[0-69]|[78][089]))|3(?:[05-8]|1(?:[0189]|7[024-9])|2(?:[0-49][089]|[5-8])|3[017-9]|4(?:[07-9]|11)|9(?:[01689]|[2-5][089]|7[0189]))|4(?:[056]|1(?:[0135-9]|[24][089])|[29](?:[0-7][089]|[89])|3(?:[0-8][089]|9)|[47](?:[089]|11|7[02-8])|8(?:[0-24-7][089]|[389]))|5(?:[0346-9]|[15][017-9]|2(?:[03-9]|[12][089]))|6(?:[0346-9]|1[0-257-9]|2(?:[0-4]|[5-9][089])|5(?:[0-367][089]|[4589]))|7(?:0(?:[02-9]|1[089])|[1-9])|8(?:[0-79]|8(?:0[0189]|11|8[013-9]|9))|9(?:[089]|313|7(?:[02-8]|9[07-9])))|8(?:0(?:[01589]|6[67]|7(?:[02-8]|9[04-9]))|1(?:[02-57-9]|1(?:[0-35-9]|4[0-46-9])|6(?:[089]|7[02-8]))|2(?:[014](?:[089]|7[02-8])|[235-9])|3(?:[03-57-9]|[16](?:[089]|7[02-8])|2(?:[09]|7[02-8]|8[0-689]))|[45]|6(?:[02457-9]|[136](?:[089]|7[02-8]))|7(?:0[07-9]|[1-69]|[78](?:[089]|7[02-8]))|8(?:[0-25-9]|3(?:[089]|7[02-8])|4(?:[0489]|7[02-8]))|9(?:[02-9]|1(?:[0289]|7[02-8])))|9"],
          "0$1",,1],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["11|2[02]|33|4[04]|79[1-9]|80[2-46]"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1(?:2[0-249]|3[0-25]|4[145]|[59][14]|[68][1-9]|7[1257])|2(?:1[257]|3[013]|4[01]|5[0137]|6[0158]|78|8[1568]|9[14])|3(?:26|4[1-3]|5[34]|6[01489]|7[02-46]|8[159])|4(?:1[36]|2[1-47]|3[15]|5[12]|6[0-26-9]|7[0-24-9]|8[013-57]|9[014-7])|5(?:1[025]|22|[36][25]|4[28]|5[12]|[78]1|9[15])|6(?:12|[2-4]1|5[17]|6[13]|7[14]|80)|7(?:12|2[14]|3[134]|4[47]|5[15]|[67]1|88)|8(?:16|2[014]|3[126]|6[136]|7[078]|8[34]|91)"],
          "0$1",,1],[,"(\\d{4})(\\d{3})(\\d{3})","$1 $2 $3",["1(?:[23579]|[468][1-9])|[2-8]"],"0$1",,1],[,"(\\d{2})(\\d{3})(\\d{4})(\\d{3})","$1 $2 $3 $4",["008"],"0$1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["140"],"$1",,1],[,"(\\d{4})(\\d{2})(\\d{4})","$1 $2 $3",["160","1600"],"$1",,1],[,"(\\d{4})(\\d{4,5})","$1 $2",["180","1800"],"$1",,1],[,"(\\d{4})(\\d{2,4})(\\d{4})","$1 $2 $3",["180","1800"],"$1",,1],[,"(\\d{4})(\\d{3,4})(\\d{4})","$1 $2 $3",["186","1860"],"$1",,1],[,"(\\d{4})(\\d{3})(\\d{3})(\\d{3})",
          "$1 $2 $3 $4",["18[06]"],"$1",,1]],,[,,,,,,,,,[-1]],,,[,,"00800\\d{7}|1(?:600\\d{6}|8(?:0(?:0\\d{4,9}|3\\d{9})|6(?:0\\d{7}|[12]\\d{9})))",,,,"1800123456"],[,,"140\\d{7}",,,,"1409305260",,,[10]],,,[,,,,,,,,,[-1]]],IO:[,[,,"3\\d{6}",,,,,,,[7]],[,,"37\\d{5}",,,,"3709100"],[,,"38\\d{5}",,,,"3801234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"IO",246,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],
        IQ:[,[,,"[1-7]\\d{7,9}",,,,,,,[8,9,10],[6,7]],[,,"1\\d{7}|(?:2[13-5]|3[02367]|4[023]|5[03]|6[026])\\d{6,7}",,,,"12345678",,,[8,9],[6,7]],[,,"7[3-9]\\d{8}",,,,"7912345678",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"IQ",964,"00","0",,,"0",,,,[[,"(1)(\\d{3})(\\d{4})","$1 $2 $3",["1"],"0$1"],[,"([2-6]\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-6]"],"0$1"],[,"(7\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],
          ,,[,,,,,,,,,[-1]]],IR:[,[,,"[1-8]\\d{5,9}|9(?:[0-4]\\d{8}|9\\d{8})",,,,,,,[6,7,10],[4,5,8]],[,,"(?:(?:1[137]|2[13-68]|3[1458]|4[145]|5[1468]|6[16]|7[1467]|8[13467])(?:\\d{8}|(?:[16]|[289]\\d?)\\d{3}))|94(?:000|11[0-7]|2\\d{2}|30[01]|4(?:11|40))\\d{5}",,,,"2123456789",,,,[4,5,8]],[,,"9(?:0(?:[1-35]\\d{2}|44\\d)|[13]\\d{3}|2[0-2]\\d{2}|9(?:[01]\\d{2}|44\\d|8(?:10|88)|9(?:0[013]|1[134]|21|9[89])))\\d{5}",,,,"9123456789",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"993\\d{7}",
          ,,,"9932123456",,,[10]],"IR",98,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["[1-8]"],"0$1"],[,"(\\d{2})(\\d{4,5})","$1 $2",["[1-8]"],"0$1"],[,"(\\d{4,5})","$1",["96"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["9"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,"(?:9411[1-7]|94440)\\d{5}",,,,"9411110000",,,[10]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],IS:[,[,,"[4-9]\\d{6}|38\\d{7}",,,,,,,[7,9]],[,,"(?:4(?:1[0-24-69]|2[0-7]|[37][0-8]|4[0-245]|5[0-68]|6\\d|8[0-36-8])|5(?:05|[156]\\d|2[02578]|3[0-579]|4[03-7]|7[0-2578]|8[0-35-9]|9[013-689])|87[23])\\d{4}",
          ,,,"4101234",,,[7]],[,,"38[589]\\d{6}|(?:6(?:1[1-8]|2[0-6]|3[027-9]|4[014679]|5[0159]|6[0-69]|70|8[06-8]|9\\d)|7(?:5[057]|[6-8]\\d|9[0-3])|8(?:2[0-59]|[3469]\\d|5[1-9]|8[28]))\\d{4}",,,,"6111234"],[,,"800\\d{4}",,,,"8001234",,,[7]],[,,"90\\d{5}",,,,"9011234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"49\\d{5}",,,,"4921234",,,[7]],"IS",354,"1(?:0(?:01|10|20)|100)|00",,,,,,"00",,[[,"(\\d{3})(\\d{4})","$1 $2",["[4-9]"]],[,"(3\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["3"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],
          [,,"809\\d{4}",,,,"8091234",,,[7]],,,[,,"(?:689|8(?:7[0189]|80)|95[48])\\d{4}",,,,"6891234",,,[7]]],IT:[,[,,"[01589]\\d{5,10}|3(?:[12457-9]\\d{8}|[36]\\d{7,9})",,,,,,,[6,7,8,9,10,11]],[,,"0(?:[26]\\d{4,9}|(?:1(?:[0159]\\d|[27][1-5]|31|4[1-4]|6[1356]|8[2-57])|3(?:[0159]\\d|2[1-4]|3[12]|[48][1-6]|6[2-59]|7[1-7])|4(?:[0159]\\d|[23][1-9]|4[245]|6[1-5]|7[1-4]|81)|5(?:[0159]\\d|2[1-5]|3[2-6]|4[1-79]|6[4-6]|7[1-578]|8[3-8])|7(?:[0159]\\d|2[12]|3[1-7]|4[2346]|6[13569]|7[13-6]|8[1-59])|8(?:[0159]\\d|2[34578]|3[1-356]|[6-8][1-5])|9(?:[0159]\\d|[238][1-5]|4[12]|6[1-8]|7[1-6]))\\d{2,7})",
          ,,,"0212345678"],[,,"3(?:[12457-9]\\d{8}|6\\d{7,8}|3\\d{7,9})",,,,"3123456789",,,[9,10,11]],[,,"80(?:0\\d{6}|3\\d{3})",,,,"800123456",,,[6,9]],[,,"0878\\d{5}|1(?:44|6[346])\\d{6}|89(?:2\\d{3}|4(?:[0-4]\\d{2}|[5-9]\\d{4})|5(?:[0-4]\\d{2}|[5-9]\\d{6})|9\\d{6})",,,,"899123456",,,[6,8,9,10]],[,,"84(?:[08]\\d{6}|[17]\\d{3})",,,,"848123456",,,[6,9]],[,,"1(?:78\\d|99)\\d{6}",,,,"1781234567",,,[9,10]],[,,"55\\d{8}",,,,"5512345678",,,[10]],"IT",39,"00",,,,,,,,[[,"(\\d{2})(\\d{3,4})(\\d{4})","$1 $2 $3",["0[26]|55"]],
          [,"(0[26])(\\d{4})(\\d{5})","$1 $2 $3",["0[26]"]],[,"(0[26])(\\d{4,6})","$1 $2",["0[26]"]],[,"(0\\d{2})(\\d{3,4})(\\d{4})","$1 $2 $3",["0[13-57-9][0159]"]],[,"(\\d{3})(\\d{3,6})","$1 $2",["0[13-57-9][0159]|8(?:03|4[17]|9[245])","0[13-57-9][0159]|8(?:03|4[17]|9(?:2|[45][0-4]))"]],[,"(0\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["0[13-57-9][2-46-8]"]],[,"(0\\d{3})(\\d{2,6})","$1 $2",["0[13-57-9][2-46-8]"]],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["[13]|8(?:00|4[08]|9[59])","[13]|8(?:00|4[08]|9(?:5[5-9]|9))"]],
          [,"(\\d{4})(\\d{4})","$1 $2",["894","894[5-9]"]],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["3"]]],,[,,,,,,,,,[-1]],1,,[,,"848\\d{6}",,,,"848123456",,,[9]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],JE:[,[,,"[135789]\\d{6,9}",,,,,,,[10],[6]],[,,"1534[0-24-8]\\d{5}",,,,"1534456789",,,,[6]],[,,"7(?:509\\d|7(?:00[378]|97[7-9])|829\\d|937\\d)\\d{5}",,,,"7797712345"],[,,"80(?:07(?:35|81)|8901)\\d{4}",,,,"8007354567"],[,,"(?:871206|90(?:066[59]|1810|71(?:07|55)))\\d{4}",,,,"9018105678"],[,,"8(?:4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|70002)\\d{4}",
          ,,,"8447034567"],[,,"701511\\d{4}",,,,"7015115678"],[,,"56\\d{8}",,,,"5612345678"],"JE",44,"00","0",,,"0",,,,,,[,,"76(?:0[012]|2[356]|4[0134]|5[49]|6[0-369]|77|81|9[39])\\d{6}",,,,"7640123456"],,,[,,,,,,,,,[-1]],[,,"3(?:0(?:07(?:35|81)|8901)|3\\d{4}|4(?:4(?:4(?:05|42|69)|703)|5(?:041|800))|7(?:0002|1206))\\d{4}|55\\d{8}",,,,"5512345678"],,,[,,,,,,,,,[-1]]],JM:[,[,,"[589]\\d{9}",,,,,,,[10],[7]],[,,"876(?:5(?:0[12]|1[0-468]|2[35]|63)|6(?:0[1-3579]|1[0237-9]|[23]\\d|40|5[06]|6[2-589]|7[05]|8[04]|9[4-9])|7(?:0[2-689]|[1-6]\\d|8[056]|9[45])|9(?:0[1-8]|1[02378]|[2-8]\\d|9[2-468]))\\d{4}",
          ,,,"8765123456",,,,[7]],[,,"876(?:2[14-9]\\d|[348]\\d{2}|5(?:0[3-9]|[2-57-9]\\d|6[0-24-9])|7(?:0[07]|7\\d|8[1-47-9]|9[0-36-9])|9(?:[01]9|9[0579]))\\d{4}",,,,"8762101234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:(?:00|22|33|44|66|77|88)[2-9]|21[23])\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"JM",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"876",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],JO:[,[,,"[235-9]\\d{7,8}",
          ,,,,,,[8,9]],[,,"(?:2(?:6(?:2[0-35-9]|3[0-57-8]|4[24-7]|5[0-24-8]|[6-8][023]|9[0-3])|7(?:0[1-79]|10|2[014-7]|3[0-689]|4[019]|5[0-3578]))|32(?:0[1-69]|1[1-35-7]|2[024-7]|3\\d|4[0-3]|[57][023]|6[03])|53(?:0[0-3]|[13][023]|2[0-59]|49|5[0-35-9]|6[15]|7[45]|8[1-6]|9[0-36-9])|6(?:2[50]0|3(?:00|33)|4(?:0[0125]|1[2-7]|2[0569]|[38][07-9]|4[025689]|6[0-589]|7\\d|9[0-2])|5(?:[01][056]|2[034]|3[0-57-9]|4[17-8]|5[0-69]|6[0-35-9]|7[1-379]|8[0-68]|9[02-39]))|87(?:[02]0|7[08]|90))\\d{4}",,,,"62001234",,,[8]],[,,
          "7(?:55[0-49]|7[025-9]\\d|8[0-25-9]\\d|9[0-25-9]\\d)\\d{5}",,,,"790123456",,,[9]],[,,"80\\d{6}",,,,"80012345",,,[8]],[,,"900\\d{5}",,,,"90012345",,,[8]],[,,"85\\d{6}",,,,"85012345",,,[8]],[,,"70\\d{7}",,,,"700123456",,,[9]],[,,,,,,,,,[-1]],"JO",962,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[2356]|87"],"(0$1)"],[,"(7)(\\d{4})(\\d{4})","$1 $2 $3",["7[457-9]"],"0$1"],[,"(\\d{2})(\\d{7})","$1 $2",["70"],"0$1"],[,"(\\d{3})(\\d{5,6})","$1 $2",["8[0158]|9"],"0$1"]],,[,,"74(?:66|77)\\d{5}",
          ,,,"746612345",,,[9]],,,[,,,,,,,,,[-1]],[,,"8(?:10|8\\d)\\d{5}",,,,"88101234",,,[8]],,,[,,,,,,,,,[-1]]],JP:[,[,,"[1-9]\\d{8,9}|00(?:[36]\\d{7,14}|7\\d{5,7}|8\\d{7})",,,,,,,[8,9,10,11,12,13,14,15,16,17]],[,,"(?:1(?:1[235-8]|2[3-6]|3[3-9]|4[2-6]|[58][2-8]|6[2-7]|7[2-9]|9[1-9])|2[2-9]\\d|[36][1-9]\\d|4(?:6[02-8]|[2-578]\\d|9[2-59])|5(?:6[1-9]|7[2-8]|[2-589]\\d)|7(?:3[4-9]|4[02-9]|[25-9]\\d)|8(?:3[2-9]|4[5-9]|5[1-9]|8[03-9]|[2679]\\d)|9(?:[679][1-9]|[2-58]\\d))\\d{6}",,,,"312345678",,,[9]],[,,"[7-9]0[1-9]\\d{7}",
          ,,,"9012345678",,,[10]],[,,"120\\d{6}|800\\d{7}|00(?:37\\d{6,13}|66\\d{6,13}|777(?:[01]\\d{2}|5\\d{3}|8\\d{4})|882[1245]\\d{4})",,,,"120123456"],[,,"990\\d{6}",,,,"990123456",,,[9]],[,,,,,,,,,[-1]],[,,"60\\d{7}",,,,"601234567",,,[9]],[,,"50[1-9]\\d{7}",,,,"5012345678",,,[10]],"JP",81,"010","0",,,"0",,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1-$2-$3",["(?:12|57|99)0"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["800"],"0$1"],[,"(\\d{4})(\\d{4})","$1-$2",["007","0077"],"$1"],[,"(\\d{4})(\\d{2})(\\d{3,4})",
          "$1-$2-$3",["007","0077"],"$1"],[,"(\\d{4})(\\d{2})(\\d{4})","$1-$2-$3",["008","0088"],"$1"],[,"(\\d{4})(\\d{3})(\\d{3,4})","$1-$2-$3",["00[36]","00(?:37|66)"],"$1"],[,"(\\d{4})(\\d{4})(\\d{4,5})","$1-$2-$3",["00[36]","00(?:37|66)"],"$1"],[,"(\\d{4})(\\d{5})(\\d{5,6})","$1-$2-$3",["00[36]","00(?:37|66)"],"$1"],[,"(\\d{4})(\\d{6})(\\d{6,7})","$1-$2-$3",["00[36]","00(?:37|66)"],"$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1-$2-$3",["[2579]0|80[1-9]"],"0$1"],[,"(\\d{4})(\\d)(\\d{4})","$1-$2-$3",["1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|499|5(?:76|97)|746|8(?:3[89]|47|51|63)|9(?:49|80|9[16])",
          "1(?:267|3(?:7[247]|9[278])|4(?:5[67]|66)|5(?:47|58|64|8[67])|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:76|97)9|7468|8(?:3(?:8[78]|96)|477|51[24]|636)|9(?:496|802|9(?:1[23]|69))","1(?:267|3(?:7[247]|9[278])|4(?:5[67]|66)|5(?:47|58|64|8[67])|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:769|979[2-69])|7468|8(?:3(?:8[78]|96[2457-9])|477|51[24]|636[2-57-9])|9(?:496|802|9(?:1[23]|69))"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{4})","$1-$2-$3",["1(?:2[3-6]|3[3-9]|4[2-6]|5[2-8]|[68][2-7]|7[2-689]|9[1-578])|2(?:2[03-689]|3[3-58]|4[0-468]|5[04-8]|6[013-8]|7[06-9]|8[02-57-9]|9[13])|4(?:2[28]|3[689]|6[035-7]|7[05689]|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9[4-9])|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9[014-9])|8(?:2[49]|3[3-8]|4[5-8]|5[2-9]|6[35-9]|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9[3-7])",
          "1(?:2[3-6]|3[3-9]|4[2-6]|5(?:[236-8]|[45][2-69])|[68][2-7]|7[2-689]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:[0468][2-9]|5[78]|7[2-4])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9(?:[4-7]|[89][2-8]))|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9[2-8])|3(?:[3-6][2-9]|7[2-6]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5[4-7]|6[2-9]|8[2-8]|9[236-9])|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3[34]|4[2-69]|[5-7]))",
          "1(?:2[3-6]|3[3-9]|4[2-6]|5(?:[236-8]|[45][2-69])|[68][2-7]|7[2-689]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:[0468][2-9]|5[78]|7[2-4])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9(?:[4-7]|[89][2-8]))|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9(?:20|[3578]|4[04-9]|6[56]))|3(?:[3-6][2-9]|7(?:[2-5]|6[0-59])|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5(?:[467]|5[014-9])|6(?:[2-8]|9[02-69])|8[2-8]|9(?:[236-8]|9[23]))|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3(?:3[02-9]|4[0-24689])|4[2-69]|[5-7]))",
          "1(?:2[3-6]|3[3-9]|4[2-6]|5(?:[236-8]|[45][2-69])|[68][2-7]|7[2-689]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:[0468][2-9]|5[78]|7[2-4])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9(?:[4-7]|[89][2-8]))|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9(?:20|[3578]|4[04-9]|6(?:5[25]|60)))|3(?:[3-6][2-9]|7(?:[2-5]|6[0-59])|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5(?:[467]|5[014-9])|6(?:[2-8]|9[02-69])|8[2-8]|9(?:[236-8]|9[23]))|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3(?:3[02-9]|4[0-24689])|4[2-69]|[5-7]))"],
          "0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["1|2(?:2[37]|5[5-9]|64|78|8[39]|91)|4(?:2[2689]|64|7[347])|5[2-589]|60|8(?:2[124589]|3[279]|[46-9])|9(?:[235-8]|93)","1|2(?:2[37]|5(?:[57]|[68]0|9[19])|64|78|8[39]|917)|4(?:2(?:20|[68]|9[178])|64|7[347])|5[2-589]|60|8(?:2[124589]|3[279]|[46-9])|9(?:[235-8]|93[34])","1|2(?:2[37]|5(?:[57]|[68]0|9(?:17|99))|64|78|8[39]|917)|4(?:2(?:20|[68]|9[178])|64|7[347])|5[2-589]|60|8(?:2[124589]|3[279]|[46-9])|9(?:[235-8]|93(?:31|4))"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{4})",
          "$1-$2-$3",["2(?:[34]7|[56]9|74|9[14-79])|82|993"],"0$1"],[,"(\\d)(\\d{4})(\\d{4})","$1-$2-$3",["3|4(?:2[09]|7[01])|6[1-9]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["[2479][1-9]"],"0$1"]],[[,"(\\d{3})(\\d{3})(\\d{3})","$1-$2-$3",["(?:12|57|99)0"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3",["800"],"0$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1-$2-$3",["[2579]0|80[1-9]"],"0$1"],[,"(\\d{4})(\\d)(\\d{4})","$1-$2-$3",["1(?:26|3[79]|4[56]|5[4-68]|6[3-5])|499|5(?:76|97)|746|8(?:3[89]|47|51|63)|9(?:49|80|9[16])",
          "1(?:267|3(?:7[247]|9[278])|4(?:5[67]|66)|5(?:47|58|64|8[67])|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:76|97)9|7468|8(?:3(?:8[78]|96)|477|51[24]|636)|9(?:496|802|9(?:1[23]|69))","1(?:267|3(?:7[247]|9[278])|4(?:5[67]|66)|5(?:47|58|64|8[67])|6(?:3[245]|48|5[4-68]))|499[2468]|5(?:769|979[2-69])|7468|8(?:3(?:8[78]|96[2457-9])|477|51[24]|636[2-57-9])|9(?:496|802|9(?:1[23]|69))"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{4})","$1-$2-$3",["1(?:2[3-6]|3[3-9]|4[2-6]|5[2-8]|[68][2-7]|7[2-689]|9[1-578])|2(?:2[03-689]|3[3-58]|4[0-468]|5[04-8]|6[013-8]|7[06-9]|8[02-57-9]|9[13])|4(?:2[28]|3[689]|6[035-7]|7[05689]|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9[4-9])|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9[014-9])|8(?:2[49]|3[3-8]|4[5-8]|5[2-9]|6[35-9]|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9[3-7])",
          "1(?:2[3-6]|3[3-9]|4[2-6]|5(?:[236-8]|[45][2-69])|[68][2-7]|7[2-689]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:[0468][2-9]|5[78]|7[2-4])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9(?:[4-7]|[89][2-8]))|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9[2-8])|3(?:[3-6][2-9]|7[2-6]|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5[4-7]|6[2-9]|8[2-8]|9[236-9])|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3[34]|4[2-69]|[5-7]))",
          "1(?:2[3-6]|3[3-9]|4[2-6]|5(?:[236-8]|[45][2-69])|[68][2-7]|7[2-689]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:[0468][2-9]|5[78]|7[2-4])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9(?:[4-7]|[89][2-8]))|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9(?:20|[3578]|4[04-9]|6[56]))|3(?:[3-6][2-9]|7(?:[2-5]|6[0-59])|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5(?:[467]|5[014-9])|6(?:[2-8]|9[02-69])|8[2-8]|9(?:[236-8]|9[23]))|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3(?:3[02-9]|4[0-24689])|4[2-69]|[5-7]))",
          "1(?:2[3-6]|3[3-9]|4[2-6]|5(?:[236-8]|[45][2-69])|[68][2-7]|7[2-689]|9[1-578])|2(?:2(?:[04-689]|3[23])|3[3-58]|4[0-468]|5(?:[0468][2-9]|5[78]|7[2-4])|6(?:[0135-8]|4[2-5])|7(?:[0679]|8[2-7])|8(?:[024578]|3[25-9]|9[6-9])|9(?:11|3[2-4]))|4(?:2(?:2[2-9]|8[237-9])|3[689]|6[035-7]|7(?:[059][2-8]|[68])|80|9[3-5])|5(?:3[1-36-9]|4[4578]|5[013-8]|6[1-9]|7[2-8]|8[14-7]|9(?:[4-7]|[89][2-8]))|7(?:2[15]|3[5-9]|4[02-9]|6[135-8]|7[0-4689]|9(?:[017-9]|4[6-8]|5[2-478]|6[2-589]))|8(?:2(?:4[4-8]|9(?:20|[3578]|4[04-9]|6(?:5[25]|60)))|3(?:[3-6][2-9]|7(?:[2-5]|6[0-59])|8[2-5])|4[5-8]|5[2-9]|6(?:[37]|5(?:[467]|5[014-9])|6(?:[2-8]|9[02-69])|8[2-8]|9(?:[236-8]|9[23]))|7[579]|8[03-579]|9[2-8])|9(?:[23]0|4[02-46-9]|5[024-79]|6[4-9]|7[2-47-9]|8[02-7]|9(?:3(?:3[02-9]|4[0-24689])|4[2-69]|[5-7]))"],
          "0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["1|2(?:2[37]|5[5-9]|64|78|8[39]|91)|4(?:2[2689]|64|7[347])|5[2-589]|60|8(?:2[124589]|3[279]|[46-9])|9(?:[235-8]|93)","1|2(?:2[37]|5(?:[57]|[68]0|9[19])|64|78|8[39]|917)|4(?:2(?:20|[68]|9[178])|64|7[347])|5[2-589]|60|8(?:2[124589]|3[279]|[46-9])|9(?:[235-8]|93[34])","1|2(?:2[37]|5(?:[57]|[68]0|9(?:17|99))|64|78|8[39]|917)|4(?:2(?:20|[68]|9[178])|64|7[347])|5[2-589]|60|8(?:2[124589]|3[279]|[46-9])|9(?:[235-8]|93(?:31|4))"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{4})",
          "$1-$2-$3",["2(?:[34]7|[56]9|74|9[14-79])|82|993"],"0$1"],[,"(\\d)(\\d{4})(\\d{4})","$1-$2-$3",["3|4(?:2[09]|7[01])|6[1-9]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["[2479][1-9]"],"0$1"]],[,,"20\\d{8}",,,,"2012345678",,,[10]],,,[,,"00(?:37\\d{6,13}|66\\d{6,13}|777(?:[01]\\d{2}|5\\d{3}|8\\d{4})|882[1245]\\d{4})",,,,"00777012"],[,,"570\\d{6}",,,,"570123456",,,[9]],,,[,,,,,,,,,[-1]]],KE:[,[,,"20\\d{6,7}|[4-9]\\d{6,9}",,,,,,,[7,8,9,10]],[,,"20\\d{6,7}|4(?:0\\d{6,7}|[136]\\d{7}|[245]\\d{5,7})|5(?:[08]\\d{7}|[1-79]\\d{5,7})|6(?:[01457-9]\\d{5,7}|2\\d{7}|6\\d{6,7})",
          ,,,"202012345",,,[7,8,9]],[,,"7(?:[0-3679]\\d|4[0-9]|5[0-7]|8[0-25-9])\\d{6}",,,,"712123456",,,[9]],[,,"800[24-8]\\d{5,6}",,,,"800223456",,,[9,10]],[,,"900[02-9]\\d{5}",,,,"900223456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"KE",254,"000","0",,,"005|0",,,,[[,"(\\d{2})(\\d{5,7})","$1 $2",["[24-6]"],"0$1"],[,"(\\d{3})(\\d{6})","$1 $2",["7"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["[89]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KG:[,[,,"[235-8]\\d{8,9}",
          ,,,,,,[9,10],[5,6]],[,,"(?:3(?:1(?:[256]\\d|3[1-9]|47)|2(?:22|3[0-479]|6[0-7])|4(?:22|5[6-9]|6\\d)|5(?:22|3[4-7]|59|6\\d)|6(?:22|5[35-7]|6\\d)|7(?:22|3[468]|4[1-9]|59|[67]\\d)|9(?:22|4[1-8]|6\\d))|6(?:09|12|2[2-4])\\d)\\d{5}",,,,"312123456",,,[9],[5,6]],[,,"(?:2(?:0[0-35]|2\\d)|5[0-24-7]\\d|7(?:[07]\\d|55))\\d{6}",,,,"700123456",,,[9]],[,,"800\\d{6,7}",,,,"800123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"KG",996,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",
          ["[25-7]|31[25]"],"0$1"],[,"(\\d{4})(\\d{5})","$1 $2",["3(?:1[36]|[2-9])"],"0$1"],[,"(\\d{3})(\\d{3})(\\d)(\\d{3})","$1 $2 $3 $4",["8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KH:[,[,,"[1-9]\\d{7,9}",,,,,,,[8,9,10],[6,7]],[,,"(?:2[3-6]|3[2-6]|4[2-4]|[5-7][2-5])(?:[237-9]|4[56]|5\\d|6\\d?)\\d{5}|23(?:4[234]|8\\d{2})\\d{4}",,,,"23756789",,,[8,9],[6,7]],[,,"(?:1(?:[013-79]\\d|[28]\\d{1,2})|2[3-6]48|3(?:[18]\\d{2}|[2-6]48)|4[2-4]48|5[2-5]48|6(?:[016-9]\\d|[2-5]48)|7(?:[07-9]\\d|[16]\\d{2}|[2-5]48)|8(?:[013-79]\\d|8\\d{2})|9(?:6\\d{2}|7\\d{1,2}|[0-589]\\d))\\d{5}",
          ,,,"91234567",,,[8,9]],[,,"1800(?:1\\d|2[019])\\d{4}",,,,"1800123456",,,[10]],[,,"1900(?:1\\d|2[09])\\d{4}",,,,"1900123456",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"KH",855,"00[14-9]","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["1\\d[1-9]|[2-9]"],"0$1"],[,"(1[89]00)(\\d{3})(\\d{3})","$1 $2 $3",["1[89]0","1[89]00"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KI:[,[,,"[2458]\\d{4}|3\\d{4,7}|[67]\\d{7}",,,,,,,[5,8]],[,,"(?:[24]\\d|3[1-9]|50|8[0-5])\\d{3}|(?:65(?:02[12]|12[56]|22[89]|[3-5]00)|7(?:27\\d{2}|3100|5(?:02[12]|12[56]|22[89]|[34](?:00|81)|500)))\\d{3}",
          ,,,"31234"],[,,"(?:6(?:200[01]|30[01]\\d)|7(?:200[01]|3(?:0[0-5]\\d|140)))\\d{3}",,,,"72001234",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"30(?:0[01]\\d{2}|12(?:11|20))\\d{2}",,,,"30010000",,,[8]],"KI",686,"00",,,,"0",,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KM:[,[,,"[3478]\\d{6}",,,,,,,[7]],[,,"7[4-7]\\d{5}",,,,"7712345"],[,,"[34]\\d{6}",,,,"3212345"],[,,,,,,,,,[-1]],[,,"8\\d{6}",,,,"8001234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,
          ,,,,[-1]],"KM",269,"00",,,,,,,,[[,"(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KN:[,[,,"[589]\\d{9}",,,,,,,[10],[7]],[,,"869(?:2(?:29|36)|302|4(?:6[015-9]|70))\\d{4}",,,,"8692361234",,,,[7]],[,,"869(?:5(?:5[6-8]|6[5-7])|66\\d|76[02-7])\\d{4}",,,,"8697652917",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:(?:00|22|33|44|66|77|88)[2-9]|21[23])\\d{6}",,,,"5002345678"],
          [,,,,,,,,,[-1]],"KN",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"869",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KP:[,[,,"1\\d{9}|[28]\\d{7}",,,,,,,[8,10],[6,7]],[,,"2\\d{7}|85\\d{6}",,,,"21234567",,,[8],[6,7]],[,,"19[123]\\d{7}",,,,"1921234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"KP",850,"00|99","0",,,"0",,,,[[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["1"],"0$1"],[,"(\\d)(\\d{3})(\\d{4})","$1 $2 $3",["2"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})",
          "$1 $2 $3",["8"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,"2(?:[0-24-9]\\d{2}|3(?:[0-79]\\d|8[02-9]))\\d{4}",,,,"23821234",,,[8]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KR:[,[,,"00(?:3\\d{8,9}|7\\d{9,11})|[1-7]\\d{4,9}|8\\d{8}",,,,,,,[5,6,8,9,10,11,12,13,14],[3,7]],[,,"2[1-9]\\d{6,7}|(?:3[1-3]|[46][1-4]|5[1-5])(?:1\\d{2,3}|[1-9]\\d{6,7})",,,,"22123456",,,[5,6,8,9,10],[3,7]],[,,"1[0-26-9]\\d{7,8}",,,,"1000000000",,,[9,10]],[,,"(?:00(?:3(?:08|68\\d)|798\\d{1,3})|80\\d)\\d{6}",,,,"801234567",,,[9,11,12,13,14]],[,,
          "60[2-9]\\d{6}",,,,"602345678",,,[9]],[,,,,,,,,,[-1]],[,,"50\\d{8}",,,,"5012345678",,,[10]],[,,"70\\d{8}",,,,"7012345678",,,[10]],"KR",82,"00(?:[1259]|3(?:[46]5|91)|7(?:00|27|3|55|6[126]))","0",,,"0(8[1-46-8]|85\\d{2})?",,,,[[,"(\\d{2})(\\d{3,4})","$1-$2",["(?:3[1-3]|[46][1-4]|5[1-5])1"],"0$1","0$CC-$1"],[,"(\\d{4})(\\d{4})","$1-$2",["1(?:5[246-9]|6[046-8]|8[03579])","1(?:5(?:22|44|66|77|88|99)|6(?:[07]0|44|6[16]|88)|8(?:00|33|55|77|99))"],"$1","0$CC-$1"],[,"(\\d{5})","$1",["1[016-9]1","1[016-9]11",
          "1[016-9]114"],"0$1","0$CC-$1"],[,"(\\d)(\\d{3,4})(\\d{4})","$1-$2-$3",["2[1-9]"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1-$2-$3",["60[2-9]|80"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{3,4})(\\d{4})","$1-$2-$3",["1[0-25-9]|(?:3[1-3]|[46][1-4]|5[1-5])[1-9]"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1-$2-$3",["[57]0"],"0$1","0$CC-$1"],[,"(\\d{5})(\\d{3})(\\d{3})","$1 $2 $3",["003","0030","00308"],"$1","0$CC-$1"],[,"(\\d{5})(\\d{3,4})(\\d{4})","$1 $2 $3",["00[37]","00(?:36|79)","00(?:36|79)8"],
          "$1","0$CC-$1"],[,"(\\d{5})(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3 $4",["007","0079","00798"],"$1","0$CC-$1"]],[[,"(\\d{2})(\\d{3,4})","$1-$2",["(?:3[1-3]|[46][1-4]|5[1-5])1"],"0$1","0$CC-$1"],[,"(\\d{4})(\\d{4})","$1-$2",["1(?:5[246-9]|6[046-8]|8[03579])","1(?:5(?:22|44|66|77|88|99)|6(?:[07]0|44|6[16]|88)|8(?:00|33|55|77|99))"],"$1","0$CC-$1"],[,"(\\d{5})","$1",["1[016-9]1","1[016-9]11","1[016-9]114"],"0$1","0$CC-$1"],[,"(\\d)(\\d{3,4})(\\d{4})","$1-$2-$3",["2[1-9]"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{3})(\\d{4})",
          "$1-$2-$3",["60[2-9]|80"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{3,4})(\\d{4})","$1-$2-$3",["1[0-25-9]|(?:3[1-3]|[46][1-4]|5[1-5])[1-9]"],"0$1","0$CC-$1"],[,"(\\d{2})(\\d{4})(\\d{4})","$1-$2-$3",["[57]0"],"0$1","0$CC-$1"]],[,,"15\\d{7,8}",,,,"1523456789",,,[9,10]],,,[,,"00(?:3(?:08|68\\d)|798\\d{1,3})\\d{6}",,,,"007981234567",,,[11,12,13,14]],[,,"1(?:5(?:22|44|66|77|88|99)|6(?:00|44|6[16]|70|88)|8(?:00|33|55|77|99))\\d{4}",,,,"15441234",,,[8]],,,[,,,,,,,,,[-1]]],KW:[,[,,"[12569]\\d{6,7}",,,,,,,[7,8]],[,
          ,"(?:18\\d|2(?:[23]\\d{2}|4(?:[1-35-9]\\d|44)|5(?:0[034]|[2-46]\\d|5[1-3]|7[1-7])))\\d{4}",,,,"22345678"],[,,"(?:5(?:[05]\\d{2}|1[0-7]\\d|2(?:22|5[25])|6[56]\\d)|6(?:0[034679]\\d|222|5[015-9]\\d|6\\d{2}|7(?:0[013-9]|[67]\\d)|9(?:[069]\\d|3[039]))|9(?:0[09]\\d|11[01]|22\\d|4[01479]\\d|55\\d|6[0679]\\d|7(?:02|[1-9]\\d)|8[057-9]\\d|9\\d{2}))\\d{4}",,,,"50012345",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"KW",965,"00",,,,,,,,[[,"(\\d{4})(\\d{3,4})","$1 $2",
          ["[16]|2(?:[0-35-9]|4[0-35-9])|52[25]|9[0-24-9]"]],[,"(\\d{3})(\\d{5})","$1 $2",["244|5(?:[015]|6[56])"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KY:[,[,,"[3589]\\d{9}",,,,,,,[10],[7]],[,,"345(?:2(?:22|44)|444|6(?:23|38|40)|7(?:4[35-79]|6[6-9]|77)|8(?:00|1[45]|25|[48]8)|9(?:14|4[035-9]))\\d{4}",,,,"3452221234",,,,[7]],[,,"345(?:32[1-9]|5(?:1[67]|2[5-79]|4[6-9]|50|76)|649|9(?:1[67]|2[2-9]|3[689]))\\d{4}",,,,"3453231234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",
          ,,,"8002345678"],[,,"900[2-9]\\d{6}|345976\\d{4}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"5(?:(?:00|22|33|44|66|77|88)[2-9]|21[23])\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"KY",1,"011","1",,,"1",,,,,,[,,"345849\\d{4}",,,,"3458491234"],,"345",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],KZ:[,[,,"(?:33\\d|7\\d{2}|80[089])\\d{7}",,,,,,,[10]],[,,"33622\\d{5}|7(?:1(?:0(?:[23]\\d|4[0-3]|59|63)|1(?:[23]\\d|4[0-79]|59)|2(?:[23]\\d|59)|3(?:2\\d|3[0-79]|4[0-35-9]|59)|4(?:[24]\\d|3[013-9]|5[1-9])|5(?:2\\d|3[1-9]|4[0-7]|59)|6(?:[234]\\d|5[19]|61)|72\\d|8(?:[27]\\d|3[1-46-9]|4[0-5]))|2(?:1(?:[23]\\d|4[46-9]|5[3469])|2(?:2\\d|3[0679]|46|5[12679])|3(?:[234]\\d|5[139])|4(?:2\\d|3[1235-9]|59)|5(?:[23]\\d|4[01246-8]|59|61)|6(?:2\\d|3[1-9]|4[0-4]|59)|7(?:[2379]\\d|40|5[279])|8(?:[23]\\d|4[0-3]|59)|9(?:2\\d|3[124578]|59)))\\d{5}",
          ,,,"7123456789"],[,,"7(?:0[012578]|47|6[02-4]|7[15-8]|85)\\d{7}",,,,"7710009998"],[,,"800\\d{7}",,,,"8001234567"],[,,"809\\d{7}",,,,"8091234567"],[,,,,,,,,,[-1]],[,,"808\\d{7}",,,,"8081234567"],[,,"751\\d{7}",,,,"7511234567"],"KZ",7,"810","8",,,"8",,"8~10",,,,[,,,,,,,,,[-1]],,,[,,"751\\d{7}",,,,"7511234567"],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],LA:[,[,,"[2-8]\\d{7,9}",,,,,,,[8,9,10],[6]],[,,"(?:2[13]|3(?:0\\d|[14])|[5-7][14]|41|8[1468])\\d{6}",,,,"21212862",,,[8,9],[6]],[,,"20(?:2[2389]|5[24-689]|7[6-8]|9[1-35-9])\\d{6}",
          ,,,"2023123456",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LA",856,"00","0",,,"0",,,,[[,"(20)(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3 $4",["20"],"0$1"],[,"([2-8]\\d)(\\d{3})(\\d{3})","$1 $2 $3",["2[13]|3[14]|[4-8]"],"0$1"],[,"(30)(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["30"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],LB:[,[,,"[13-9]\\d{6,7}",,,,,,,[7,8]],[,,"(?:[14-6]\\d{2}|7(?:[2-57]\\d|62|8[0-7]|9[04-9])|8[02-9]\\d|9\\d{2})\\d{4}",
          ,,,"1123456",,,[7]],[,,"(?:3\\d|7(?:[01]\\d|6[013-9]|8[89]|9[1-3])|81\\d)\\d{5}",,,,"71123456"],[,,,,,,,,,[-1]],[,,"9[01]\\d{6}",,,,"90123456",,,[8]],[,,"80\\d{6}",,,,"80123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LB",961,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[13-69]|7(?:[2-57]|62|8[0-7]|9[04-9])|8[02-9]"],"0$1"],[,"([7-9]\\d)(\\d{3})(\\d{3})","$1 $2 $3",["7(?:[01]|6[013-9]|8[89]|9[1-3])|[89][01]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],LC:[,
          [,,"[5789]\\d{9}",,,,,,,[10],[7]],[,,"758(?:4(?:30|5[0-9]|6[2-9]|8[0-2])|57[0-2]|638)\\d{4}",,,,"7584305678",,,,[7]],[,,"758(?:28[4-7]|384|4(?:6[01]|8[4-9])|5(?:1[89]|20|84)|7(?:1[2-9]|2\\d|3[01]))\\d{4}",,,,"7582845678",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:(?:00|22|33|44|66|77|88)[2-9]|21[23])\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"LC",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"758",[,,,,,,,,,[-1]],[,,,,,,
            ,,,[-1]],,,[,,,,,,,,,[-1]]],LI:[,[,,"6\\d{8}|[23789]\\d{6}",,,,,,,[7,9]],[,,"(?:2(?:01|1[27]|3\\d|6[02-578]|96)|3(?:7[0135-7]|8[048]|9[0269]))\\d{4}",,,,"2345678",,,[7]],[,,"6(?:5(?:09|1\\d|20)|6(?:0[0-6]|10|2[06-9]|39))\\d{5}|7(?:[37-9]\\d|42|56)\\d{4}",,,,"660234567"],[,,"80(?:02[28]|9\\d{2})\\d{2}",,,,"8002222",,,[7]],[,,"90(?:02[258]|1(?:23|3[14])|66[136])\\d{2}",,,,"9002222",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LI",423,"00","0",,,"0|10(?:01|20|66)",,,,[[,"(\\d{3})(\\d{2})(\\d{2})",
          "$1 $2 $3",["[237-9]"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["6[56]"]],[,"(69)(7\\d{2})(\\d{4})","$1 $2 $3",["697"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"870(?:28|87)\\d{2}",,,,"8702812",,,[7]],,,[,,"697(?:42|56|[78]\\d)\\d{4}",,,,"697861234",,,[9]]],LK:[,[,,"[1-9]\\d{8}",,,,,,,[9],[7]],[,,"1(?:1[2-57]\\d{6}|973\\d{5})|(?:2[13-7]|3[1-8]|4[157]|5[12457]|6[35-7]|[89]1)[2-57]\\d{6}",,,,"112345678",,,,[7]],[,,"7[0125-8]\\d{7}",,,,"712345678"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,
          ,,,,,,,[-1]],[,,,,,,,,,[-1]],"LK",94,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[1-689]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],LR:[,[,,"2\\d{7,8}|[378]\\d{8}|4\\d{6}|5\\d{6,8}",,,,,,,[7,8,9]],[,,"(?:2\\d{3}|33333)\\d{4}",,,,"21234567",,,[8,9]],[,,"(?:20\\d{2}|330\\d|4[67]|5(?:55)?\\d|77\\d{2}|88\\d{2})\\d{5}",,,,"770123456",,,[7,9]],[,,,,,,,,,[-1]],[,,"332(?:02|[2-5]\\d)\\d{4}",,,,"332021234",
          ,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LR",231,"00","0",,,"0",,,,[[,"(2\\d)(\\d{3})(\\d{3})","$1 $2 $3",["2"],"0$1"],[,"([4-5])(\\d{3})(\\d{3})","$1 $2 $3",["[45]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[23578]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],LS:[,[,,"[2568]\\d{7}",,,,,,,[8]],[,,"2\\d{7}",,,,"22123456"],[,,"[56]\\d{7}",,,,"50123456"],[,,"800[256]\\d{4}",,,,"80021234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,
          ,,,,[-1]],"LS",266,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],LT:[,[,,"[3-9]\\d{7}",,,,,,,[8]],[,,"(?:3[1478]|4[124-6]|52)\\d{6}",,,,"31234567"],[,,"6\\d{7}",,,,"61234567"],[,,"800\\d{5}",,,,"80012345"],[,,"9(?:0[0239]|10)\\d{5}",,,,"90012345"],[,,"808\\d{5}",,,,"80812345"],[,,"700\\d{5}",,,,"70012345"],[,,,,,,,,,[-1]],"LT",370,"00","8",,,"[08]",,,,[[,"([34]\\d)(\\d{6})","$1 $2",["37|4(?:1|5[45]|6[2-4])"],"(8-$1)",,1],[,"([3-6]\\d{2})(\\d{5})",
          "$1 $2",["3[148]|4(?:[24]|6[09])|528|6"],"(8-$1)",,1],[,"([7-9]\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["[7-9]"],"8 $1",,1],[,"(5)(2\\d{2})(\\d{4})","$1 $2 $3",["52[0-79]"],"(8-$1)",,1]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"70[67]\\d{5}",,,,"70712345"],,,[,,,,,,,,,[-1]]],LU:[,[,,"[24-9]\\d{3,10}|3(?:[0-46-9]\\d{2,9}|5[013-9]\\d{1,8})",,,,,,,[4,5,6,7,8,9,10,11]],[,,"(?:2[2-9]\\d{2,9}|(?:3(?:[0-46-9]\\d|5[013-9])|[457]\\d{2}|8(?:0[2-9]|[13-9]\\d)|9(?:0[89]|[2-579]\\d))\\d{1,8})",,,,"27123456"],[,,"6[25-79][18]\\d{6}",
          ,,,"628123456",,,[9]],[,,"800\\d{5}",,,,"80012345",,,[8]],[,,"90[015]\\d{5}",,,,"90012345",,,[8]],[,,"801\\d{5}",,,,"80112345",,,[8]],[,,,,,,,,,[-1]],[,,"20(?:1\\d{5}|[2-689]\\d{1,7})",,,,"20201234",,,[4,5,6,7,8,9,10]],"LU",352,"00",,,,"(15(?:0[06]|1[12]|35|4[04]|55|6[26]|77|88|99)\\d)",,,,[[,"(\\d{2})(\\d{3})","$1 $2",["[2-5]|7[1-9]|[89](?:0[2-9]|[1-9])"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["[2-5]|7[1-9]|[89](?:0[2-9]|[1-9])"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["20"],
          ,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})","$1 $2 $3 $4",["2(?:[0367]|4[3-8])"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3 $4",["20"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})(\\d{1,2})","$1 $2 $3 $4 $5",["2(?:[0367]|4[3-8])"],,"$CC $1"],[,"(\\d{2})(\\d{2})(\\d{2})(\\d{1,4})","$1 $2 $3 $4",["2(?:[12589]|4[12])|[3-5]|7[1-9]|8(?:0[2-9]|[1-9])|9(?:0[2-46-9]|[1-9])"],,"$CC $1"],[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["70|80[01]|90[015]"],,"$CC $1"],[,"(\\d{3})(\\d{3})(\\d{3})",
          "$1 $2 $3",["6"],,"$CC $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],LV:[,[,,"[2689]\\d{7}",,,,,,,[8]],[,,"6\\d{7}",,,,"63123456"],[,,"2\\d{7}",,,,"21234567"],[,,"80\\d{6}",,,,"80123456"],[,,"90\\d{6}",,,,"90123456"],[,,"81\\d{6}",,,,"81123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LV",371,"00",,,,,,,,[[,"([2689]\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[2689]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],LY:[,[,,"[25679]\\d{8}",,,,,,,[9],[7]],[,,"(?:2[1345]|5[1347]|6[123479]|71)\\d{7}",
          ,,,"212345678",,,,[7]],[,,"9[1-6]\\d{7}",,,,"912345678"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"LY",218,"00","0",,,"0",,,,[[,"([25-79]\\d)(\\d{7})","$1-$2",["[25-79]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MA:[,[,,"[5-9]\\d{8}",,,,,,,[9]],[,,"5(?:2(?:[015-79]\\d|2[02-9]|3[2-57]|4[2-8]|8[235-7])\\d|3(?:[0-48]\\d|[57][2-9]|6[2-8]|9[3-9])\\d|4[067]\\d{2}|5[03]\\d{2})\\d{4}",,,,"520123456"],[,,"(?:6(?:[0-79]\\d|8[0-247-9])|7(?:0[067]|6[1267]|7[017]))\\d{6}",
          ,,,"650123456"],[,,"80\\d{7}",,,,"801234567"],[,,"89\\d{7}",,,,"891234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"5924[01]\\d{4}",,,,"592401234"],"MA",212,"00","0",,,"0",,,,[[,"([5-7]\\d{2})(\\d{6})","$1-$2",["5(?:2[015-7]|3[0-4])|[67]"],"0$1"],[,"([58]\\d{3})(\\d{5})","$1-$2",["5(?:2[2-489]|3[5-9]|92)|892","5(?:2(?:[2-48]|9[0-7])|3(?:[5-79]|8[0-7])|924)|892"],"0$1"],[,"(5\\d{4})(\\d{4})","$1-$2",["5(?:29|38)","5(?:29|38)[89]"],"0$1"],[,"([5]\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["5(?:4[067]|5[03])"],
          "0$1"],[,"(8[09])(\\d{7})","$1-$2",["8(?:0|9[013-9])"],"0$1"]],,[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MC:[,[,,"[34689]\\d{7,8}",,,,,,,[8,9]],[,,"870\\d{5}|9[2-47-9]\\d{6}",,,,"99123456",,,[8]],[,,"3\\d{7}|4(?:4\\d|5[1-9])\\d{5}|6\\d{8}",,,,"612345678"],[,,"90\\d{6}",,,,"90123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MC",377,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[39]"],"$1"],[,"(\\d{2})(\\d{3})(\\d{3})",
          "$1 $2 $3",["4"],"0$1"],[,"(6)(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["6"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{2})","$1 $2 $3",["8"],"$1"]],,[,,,,,,,,,[-1]],,,[,,"870\\d{5}",,,,"87012345",,,[8]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MD:[,[,,"[235-9]\\d{7}",,,,,,,[8]],[,,"(?:2[1-9]\\d|3[1-79]\\d|5(?:33|5[257]))\\d{5}",,,,"22212345"],[,,"(?:562|6\\d{2}|7(?:[189]\\d|6[07]|7[457-9]))\\d{5}",,,,"62112345"],[,,"800\\d{5}",,,,"80012345"],[,,"90[056]\\d{5}",,,,"90012345"],[,,"808\\d{5}",,,,"80812345"],
          [,,,,,,,,,[-1]],[,,"3[08]\\d{6}",,,,"30123456"],"MD",373,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["22|3"],"0$1"],[,"([25-7]\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["2[13-9]|[5-7]"],"0$1"],[,"([89]\\d{2})(\\d{5})","$1 $2",["[89]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"803\\d{5}",,,,"80312345"],,,[,,,,,,,,,[-1]]],ME:[,[,,"[2-9]\\d{7,8}",,,,,,,[8,9],[6]],[,,"(?:20[2-8]|3(?:[0-2][2-7]|3[24-7])|4(?:0[2-467]|1[2467])|5(?:[01][2467]|2[2-467]))\\d{5}",,,,"30234567",,,[8],[6]],[,,"6(?:00\\d|3[024]\\d|6[0-25]\\d|[7-9]\\d{2})\\d{4}",
          ,,,"67622901",,,[8]],[,,"80(?:[0-2578]|9\\d)\\d{5}",,,,"80080002"],[,,"(?:9(?:4[1568]|5[178]))\\d{5}",,,,"94515151",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"78[1-49]\\d{5}",,,,"78108780",,,[8]],"ME",382,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[2-57-9]|6[036-9]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"77[1-9]\\d{5}",,,,"77273012",,,[8]],,,[,,,,,,,,,[-1]]],MF:[,[,,"[56]\\d{8}",,,,,,,[9]],[,,"590(?:0[079]|13|2[79]|30|43|5[0-268]|7[79]|87)\\d{4}",,,,"590271234"],[,,"69(?:0\\d{2}|1(?:2[29]|3[0-5]))\\d{4}",
          ,,,"690001234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MF",590,"00","0",,,"0",,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MG:[,[,,"[23]\\d{8}",,,,,,,[9],[7]],[,,"20(?:2\\d{2}|4[47]\\d|5[3467]\\d|6[279]\\d|7(?:2[29]|[35]\\d)|8[268]\\d|9[245]\\d)\\d{4}",,,,"202123456",,,,[7]],[,,"3[2-49]\\d{7}",,,,"321234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"22\\d{7}",,,,"221234567"],"MG",261,"00","0",,,"0",,
          ,,[[,"([23]\\d)(\\d{2})(\\d{3})(\\d{2})","$1 $2 $3 $4",["[23]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MH:[,[,,"[2-6]\\d{6}",,,,,,,[7]],[,,"(?:247|528|625)\\d{4}",,,,"2471234"],[,,"(?:235|329|45[56]|545)\\d{4}",,,,"2351234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"635\\d{4}",,,,"6351234"],"MH",692,"011","1",,,"1",,,,[[,"(\\d{3})(\\d{4})","$1-$2"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MK:[,[,,"[2-578]\\d{7}",
          ,,,,,,[8],[6,7]],[,,"(?:2(?:[23]\\d|5[0-24578]|6[01]|82)|3(?:1[3-68]|[23][2-68]|4[23568])|4(?:[23][2-68]|4[3-68]|5[2568]|6[25-8]|7[24-68]|8[4-68]))\\d{5}",,,,"22012345",,,,[6,7]],[,,"7(?:[0-25-8]\\d{2}|3[2-4]\\d|421|9[23]\\d)\\d{4}",,,,"72345678"],[,,"800\\d{5}",,,,"80012345"],[,,"5[02-9]\\d{6}",,,,"50012345"],[,,"8(?:0[1-9]|[1-9]\\d)\\d{5}",,,,"80123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MK",389,"00","0",,,"0",,,,[[,"(2)(\\d{3})(\\d{4})","$1 $2 $3",["2"],"0$1"],[,"([347]\\d)(\\d{3})(\\d{3})","$1 $2 $3",
          ["[347]"],"0$1"],[,"([58]\\d{2})(\\d)(\\d{2})(\\d{2})","$1 $2 $3 $4",["[58]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],ML:[,[,,"[24-9]\\d{7}",,,,,,,[8]],[,,"(?:2(?:0(?:2\\d|7[0-8])|1(?:2[67]|[4-689]\\d))|4(?:0[0-4]|4[1-39])\\d)\\d{4}",,,,"20212345"],[,,"(?:2(?:079|17\\d)|50\\d{2}|[679]\\d{3}|8[239]\\d{2})\\d{4}",,,,"65012345"],[,,"80\\d{6}",,,,"80012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"ML",223,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})",
          "$1 $2 $3 $4",["[24-9]"]],[,"(\\d{4})","$1",["67|74"]]],[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[24-9]"]]],[,,,,,,,,,[-1]],,,[,,"80\\d{6}",,,,"80012345"],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MM:[,[,,"[178]\\d{5,7}|[24-6]\\d{5,8}|9(?:[279]\\d{0,2}|5|[34]\\d{1,2}|6(?:\\d{1,2})?|8(?:\\d{2})?)\\d{6}",,,,,,,[6,7,8,9,10],[5]],[,,"1(?:2\\d{1,2}|[35]\\d|4(?:\\d|2[236]|39)|6\\d?|[89][0-6]\\d)\\d{4}|2(?:2(?:000\\d{3}|\\d{4})|3\\d{4}|4(?:0\\d{5}|26\\d{4}|39\\d{4}|\\d{4})|5(?:1\\d{3,6}|[02-9]\\d{3,5})|[6-9]\\d{4})|4(?:2[245-8]|3(?:2(?:02)?|[346]|56?)|[46][2-6]|5[3-5])\\d{4}|5(?:2(?:2(?:\\d{1,2})?|[3-8])|3[2-68]|4(?:21?|[4-8])|5[23]|6[2-4]|7[2-8]|8[24-7]|9[2-7])\\d{4}|6(?:0[23]|1(?:2(?:0|4\\d)?|[356])|2[2-6]|3[24-6]|4(?:2(?:4\\d)?|[3-6])|5[2-4]|6[2-8]|7(?:[2367]|4(?:\\d|39)|5\\d?|8[145]\\d)|8[245]|9(?:20?|4))\\d{4}|7(?:[04][24-8]|1(?:20?|[3-7])|22|3[2-4]|5[2-7])\\d{4}|8(?:1(?:2\\d{1,2}|[3-689]\\d)|2(?:2\\d|3(?:\\d|20)|[4-8]\\d)|3[24]\\d|4[24-7]\\d|5[245]\\d|6[23]\\d)\\d{3}",
          ,,,"1234567",,,[6,7,8,9],[5]],[,,"17[01]\\d{4}|9(?:2(?:[0-4]|5\\d{2}|6[0-5]\\d)|3(?:[0-36]|4[069])\\d|4(?:0[0-4]\\d|[1379]\\d|2\\d{2}|4[0-589]\\d|5\\d{2}|88)|5[0-6]|6(?:1\\d|9\\d{2}|\\d)|7(?:3|5[0-2]|[6-9]\\d)\\d|8(?:\\d|9\\d{2})|9(?:1\\d|[5-7]\\d{2}|[089]))\\d{5}",,,,"92123456",,,[7,8,9,10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"1333\\d{4}",,,,"13331234",,,[8]],"MM",95,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["1|2[245]"],"0$1"],[,"(2)(\\d{4})(\\d{4})",
          "$1 $2 $3",["251"],"0$1"],[,"(\\d)(\\d{2})(\\d{3})","$1 $2 $3",["16|2"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["432|67|81"],"0$1"],[,"(\\d{2})(\\d{2})(\\d{3,4})","$1 $2 $3",["[4-8]"],"0$1"],[,"(9)(\\d{3})(\\d{4,6})","$1 $2 $3",["9(?:2[0-4]|[35-9]|4[137-9])"],"0$1"],[,"(9)([34]\\d{4})(\\d{4})","$1 $2 $3",["9(?:3[0-36]|4[0-57-9])"],"0$1"],[,"(9)(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["92[56]"],"0$1"],[,"(9)(\\d{3})(\\d{3})(\\d{2})","$1 $2 $3 $4",["93"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,
          ,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MN:[,[,,"[12]\\d{7,9}|[57-9]\\d{7}",,,,,,,[8,9,10],[6,7]],[,,"[12](?:1\\d|2(?:[1-3]\\d?|7\\d)|3[2-8]\\d{1,2}|4[2-68]\\d{1,2}|5[1-4689]\\d{1,2})\\d{5}|5[0568]\\d{6}",,,,"50123456",,,,[6,7]],[,,"(?:8(?:[05689]\\d|3[01])|9[013-9]\\d)\\d{5}",,,,"88123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"7[05-8]\\d{6}",,,,"75123456",,,[8]],"MN",976,"001","0",,,"0",,,,[[,"([12]\\d)(\\d{2})(\\d{4})","$1 $2 $3",["[12]1"],"0$1"],[,"([12]2\\d)(\\d{5,6})",
          "$1 $2",["[12]2[1-3]"],"0$1"],[,"([12]\\d{3})(\\d{5})","$1 $2",["[12](?:27|[3-5])","[12](?:27|[3-5]\\d)2"],"0$1"],[,"(\\d{4})(\\d{4})","$1 $2",["[57-9]"],"$1"],[,"([12]\\d{4})(\\d{4,5})","$1 $2",["[12](?:27|[3-5])","[12](?:27|[3-5]\\d)[4-9]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MO:[,[,,"[268]\\d{7}",,,,,,,[8]],[,,"(?:28[2-57-9]|8(?:11|[2-57-9]\\d))\\d{5}",,,,"28212345"],[,,"6(?:[2356]\\d{2}|8(?:[02][5-9]|[1478]\\d|[356][0-4]))\\d{4}",,,,"66123456"],[,,,,,
          ,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MO",853,"00",,,,,,,,[[,"([268]\\d{3})(\\d{4})","$1 $2",["[268]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MP:[,[,,"[5689]\\d{9}",,,,,,,[10],[7]],[,,"670(?:2(?:3[3-7]|56|8[5-8])|32[1238]|4(?:33|8[348])|5(?:32|55|88)|6(?:64|70|82)|78[3589]|8[3-9]8|989)\\d{4}",,,,"6702345678",,,,[7]],[,,"670(?:2(?:3[3-7]|56|8[5-8])|32[1238]|4(?:33|8[348])|5(?:32|55|88)|6(?:64|70|82)|78[3589]|8[3-9]8|989)\\d{4}",
          ,,,"6702345678",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:(?:00|22|33|44|66|77|88)[2-9]|21[23])\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"MP",1,"011","1",,,"1",,,1,,,[,,,,,,,,,[-1]],,"670",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MQ:[,[,,"[56]\\d{8}",,,,,,,[9]],[,,"596(?:0[0-7]|10|2[7-9]|3[05-9]|4[0-46-8]|[5-7]\\d|8[09]|9[4-8])\\d{4}",,,,"596301234"],[,,"69(?:6(?:[0-47-9]\\d|5[0-6]|6[0-4])|727)\\d{4}",,
          ,,"696201234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MQ",596,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",,"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MR:[,[,,"[2-48]\\d{7}",,,,,,,[8]],[,,"25[08]\\d{5}|35\\d{6}|45[1-7]\\d{5}",,,,"35123456"],[,,"[234][0-46-9]\\d{6}",,,,"22123456"],[,,"800\\d{5}",,,,"80012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MR",222,"00",,,,,,,,[[,
          "([2-48]\\d)(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[2-48]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MS:[,[,,"[5689]\\d{9}",,,,,,,[10],[7]],[,,"664491\\d{4}",,,,"6644912345",,,,[7]],[,,"66449[2-6]\\d{4}",,,,"6644923456",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:(?:00|22|33|44|66|77|88)[2-9]|21[23])\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"MS",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],
          ,"664",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MT:[,[,,"[2357-9]\\d{7}",,,,,,,[8]],[,,"2(?:0(?:[169]\\d|3[1-4])|[1-357]\\d{2})\\d{4}",,,,"21001234"],[,,"(?:7(?:210|[79]\\d{2})|9(?:2(?:1[01]|31)|69[67]|8(?:1[1-3]|89|97)|9\\d{2}))\\d{4}",,,,"96961234"],[,,"800[3467]\\d{4}",,,,"80071234"],[,,"5(?:0(?:0(?:37|43)|6\\d{2}|70\\d|9[0168]\\d)|[12]\\d0[1-5])\\d{3}",,,,"50037123"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"3550\\d{4}",,,,"35501234"],"MT",356,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2"]],,
          [,,"7117\\d{4}",,,,"71171234"],,,[,,,,,,,,,[-1]],[,,"501\\d{5}",,,,"50112345"],,,[,,,,,,,,,[-1]]],MU:[,[,,"[2-9]\\d{6,7}",,,,,,,[7,8]],[,,"(?:2(?:[03478]\\d|1[0-7]|6[1-69])|4(?:[013568]\\d|2[4-7])|5(?:44\\d|471)|6\\d{2}|8(?:14|3[129]))\\d{4}",,,,"2012345"],[,,"5(?:2[589]\\d|4(?:2[1-389]|[489]\\d|7[1-9])|7\\d{2}|8(?:[0-689]\\d|7[15-8])|9[0-8]\\d)\\d{4}",,,,"52512345",,,[8]],[,,"80[012]\\d{4}",,,,"8001234",,,[7]],[,,"30\\d{5}",,,,"3012345",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"3(?:20|9\\d)\\d{4}",
          ,,,"3201234",,,[7]],"MU",230,"0(?:0|[2-7]0|33)",,,,,,"020",,[[,"([2-46-9]\\d{2})(\\d{4})","$1 $2",["[2-46-9]"]],[,"(5\\d{3})(\\d{4})","$1 $2",["5"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MV:[,[,,"[346-8]\\d{6,9}|9(?:00\\d{7}|\\d{6})",,,,,,,[7,10]],[,,"(?:3(?:0[0-3]|3[0-59])|6(?:[57][02468]|6[024568]|8[024689]))\\d{4}",,,,"6701234",,,[7]],[,,"(?:46[46]|7[2-9]\\d|9[14-9]\\d)\\d{4}",,,,"7712345",,,[7]],[,,"800\\d{7}",,,,"8001234567",,,[10]],[,,"900\\d{7}",,,,"9001234567",
          ,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MV",960,"0(?:0|19)",,,,,,"00",,[[,"(\\d{3})(\\d{4})","$1-$2",["[3467]|9(?:0[1-9]|[1-9])"]],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[89]00"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"4[05]0\\d{4}",,,,"4001234",,,[7]],,,[,,,,,,,,,[-1]]],MW:[,[,,"(?:1(?:\\d{2})?|[2789]\\d{2}|31\\d)\\d{6}",,,,,,,[7,9]],[,,"(?:1[2-9]|21\\d{2})\\d{5}",,,,"1234567"],[,,"(?:111|77\\d|88\\d|99\\d)\\d{6}",,,,"991234567",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,
          ,,,[-1]],[,,,,,,,,,[-1]],[,,"31\\d{7}",,,,"310123456",,,[9]],"MW",265,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["1"],"0$1"],[,"(2\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["2"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[17-9]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["31"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MX:[,[,,"[1-9]\\d{9,10}",,,,,,,[10,11],[7,8]],[,,"(?:33|55|81)\\d{8}|(?:2(?:0[01]|2[1-9]|3[1-35-8]|4[13-9]|7[1-689]|8[1-578]|9[467])|3(?:1[1-79]|[2458][1-9]|7[1-8]|9[1-5])|4(?:1[1-57-9]|[24-6][1-9]|[37][1-8]|8[1-35-9]|9[2-689])|5(?:88|9[1-79])|6(?:1[2-68]|[234][1-9]|5[1-3689]|6[12457-9]|7[1-7]|8[67]|9[4-8])|7(?:[13467][1-9]|2[1-9]|5[13-9]|8[1-69]|9[17])|8(?:2[13-689]|3[1-6]|4[124-6]|6[1246-9]|7[1-378]|9[12479])|9(?:1[346-9]|2[1-4]|3[2-46-8]|5[1348]|[69][1-9]|7[12]|8[1-8]))\\d{7}",
          ,,,"2221234567",,,[10],[7,8]],[,,"1(?:(?:33|55|81)\\d{8}|(?:2(?:2[1-9]|3[1-35-8]|4[13-9]|7[1-689]|8[1-578]|9[467])|3(?:1[1-79]|[2458][1-9]|7[1-8]|9[1-5])|4(?:1[1-57-9]|[24-6][1-9]|[37][1-8]|8[1-35-9]|9[2-689])|5(?:88|9[1-79])|6(?:1[2-68]|[2-4][1-9]|5[1-3689]|6[12457-9]|7[1-7]|8[67]|9[4-8])|7(?:[13467][1-9]|2[1-9]|5[13-9]|8[1-69]|9[17])|8(?:2[13-689]|3[1-6]|4[124-6]|6[1246-9]|7[1-378]|9[12479])|9(?:1[346-9]|2[1-4]|3[2-46-8]|5[1348]|[69][1-9]|7[12]|8[1-8]))\\d{7})",,,,"12221234567",,,[11]],[,,"8(?:00|88)\\d{7}",
          ,,,"8001234567",,,[10]],[,,"900\\d{7}",,,,"9001234567",,,[10]],[,,"300\\d{7}",,,,"3001234567",,,[10]],[,,"500\\d{7}",,,,"5001234567",,,[10]],[,,,,,,,,,[-1]],"MX",52,"0[09]","01",,,"0[12]|04[45](\\d{10})","1$1",,,[[,"([358]\\d)(\\d{4})(\\d{4})","$1 $2 $3",["33|55|81"],"01 $1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[2467]|3[0-2457-9]|5[089]|8[02-9]|9[0-35-9]"],"01 $1",,1],[,"(1)([358]\\d)(\\d{4})(\\d{4})","044 $2 $3 $4",["1(?:33|55|81)"],"$1",,1],[,"(1)(\\d{3})(\\d{3})(\\d{4})","044 $2 $3 $4",
          ["1(?:[2467]|3[0-2457-9]|5[089]|8[2-9]|9[1-35-9])"],"$1",,1]],[[,"([358]\\d)(\\d{4})(\\d{4})","$1 $2 $3",["33|55|81"],"01 $1",,1],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["[2467]|3[0-2457-9]|5[089]|8[02-9]|9[0-35-9]"],"01 $1",,1],[,"(1)([358]\\d)(\\d{4})(\\d{4})","$1 $2 $3 $4",["1(?:33|55|81)"]],[,"(1)(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3 $4",["1(?:[2467]|3[0-2457-9]|5[089]|8[2-9]|9[1-35-9])"]]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MY:[,[,,"[13-9]\\d{7,9}",,,,,,,[8,9,
          10],[6,7]],[,,"(?:3(?:2(?:0(?:11|2[0-8]|3[0-24-79]|[579]\\d|8[0-57-9])|1(?:0[6-9]|1[03-9]|[467]\\d|8[0-2]|9[13])|2(?:0[1-3]|2[2-4]|4[0-25-7]|6[0-8]|7[02-689]|8\\d|9[5-9])|3(?:0[0-3]|3[0-36]|8[0-35-9]|9[1-3])|6(?:0[0-5]|[139]\\d|8[15-8])|7(?:1\\d|2[0-7]|3[0-3]|42|7[0-356]|8[0-35-8])|8(?:00|4[78]|5[6-9])|93[58])|3(?:0(?:0[0-35-9]|10|5[01]|8[0-6]|9[39])|1(?:0[1-39]|10|2[02-469]|3[245]|4[0-3589]|6[0-35-9]|7[067]|8[0-57]|9[0-278])|2(?:1[3467]|2[45]|4[1-3]|5[0689]|6[04589]|7[0-3579]|8[0-489]|9[0-27])|3(?:1[7-9]|2[1-6]|4[1-689]|5[89]|6[1-3]|7\\d|8[125]|9[236])|6(?:[12]0|3[01]|5[0-256]|6[08]|8[45]))|4(?:0(?:09|[14]\\d|2[0-8]|3[12]|5[01]|65)|1(?:0[0-8]|31|4\\d|6[12])|2(?:17|5[0-35-9]|6[024-6]|7[0189]|8[057-9]|9\\d)|770|8(?:0[0-2]|1[0-3569]|2[01]))|5(?:0(?:2[0-2]|3[0-35-9])|1(?:0[1-3]|1[05]|2[0-6]|31|6[1-7]|9[1258])|270|48[0-5]|5(?:1\\d|2[0-6]|4[0-589]|6[125-9]|9[01])|6(?:1[1-4]|2[0-589]|3\\d|5[0-3])|7(?:21|40)|8(?:7[06-9]|8[025-9]|9[12]))|6(?:0(?:2[0-28]|3[24-9]|4[246-9]|5[57]|6[13-6]|7[358]|8[1247]|9[0-59])|1(?:[04][0-58]|15|2[02-8]|3[015-9]|5[016-8]|7[7-9]|8[14-9]|9[1-356])|2(?:[05]\\d|11|[46][1-3]|7[02-79]|8[015-7])|303|4(?:1[129]|2[01]|3[36]|6[0-2])|690|7(?:3\\d|89))|7(?:118|2(?:0[02]|6[01])|4(?:[59]\\d|8[01])|6(?:1[01]|2\\d|5[0-2]|6[0-69])|7(?:1[0-37-9]|[28]\\d|3[1-5]|7[0-3])|8(?:[04]\\d|3[129]|59|6[1-356]|7[02-79]|8[02-7]|90)|9(?:10|3[1-3]|4[016-9]|[56]\\d|7[12]|8\\d))|8(?:0(?:0[08]|11|2[0-7]|5[12]|6\\d|7[013-69]|8[0-24]|9[0-5])|100|21[0-36]|3(?:08|1\\d|2[0-589]|31)|408|5(?:2[0-35-79]|88)|6(?:0[0-259]|5[5-79]|6[01]|8[46-9]|9[019])|7(?:0[35-8]|2[3-7]|3\\d|4[0149]|5[0-2]|6[016-9]|7[5-9]|8[037]|90)|8(?:00|61|7[0-3]|8\\d|9[0-4])|9(?:1[1-3]|[2-5]\\d|6[1-4689]|8[89]|9[0-689]))|9(?:0(?:1[0-289]|2[15]|5[014-9]|7[04-68]|8[0-256])|1(?:0[0-3568]|3[0-49]|4[015]|7[0-59]|9[15])|2(?:0[0-25-7]|12|2[1-6]|3[1256]|7[14]|8\\d)|3[68]8|41[01]|5(?:14|2[01]|4[03-9]|6[5-79]|7[0-2569])))\\d|4(?:2(?:0[01]|1[07-9]|2[02-46-9]|38|4[0-28]|5[0-589]|6[0-47-9]|8[0-389]|9[0-38])\\d|3(?:0[5-9]|[12][034]|3[0-37]|47|5[168]|6[7-9]|7[0135-8]|8\\d|9[0-27-9])\\d|4(?:[02-9]\\d{2}|1(?:[02-9]\\d|10))|5(?:[07]\\d{2}|1[0-358]\\d|2[1246]\\d|3[06-9]\\d|4[0589]\\d|5[12457-9]\\d|6[0-689]\\d|8(?:[0-57-9]\\d|60)|9(?:[2-57-9]\\d|60))|6(?:0[79]|1[0-689]|2[0135-9]|[3-5]\\d|6[07-9]|7[23]|8[03-9]|99)\\d|7(?:0[0-59]\\d|1[04679]\\d|2(?:[02-9]\\d|10)|[37]\\d{2}|4(?:[0178]\\d|5[0-6])|5(?:[0-57-9]\\d|60)|6[024-689]\\d|8[0-79]\\d|9(?:[0479]\\d|3[01]))|8(?:1[0189]\\d|2[046-9]\\d|3[058]\\d|5[029]\\d|6(?:[0689]\\d|40)|8[14568]\\d|9[0-389]\\d)|9(?:0[1368]\\d|1[13-9]\\d|[27]\\d{2}|3(?:[0-368]\\d|7[0-3])|4[013-79]\\d|5[0-35689]\\d|6[0-46-9]\\d|8[0-24-9]\\d|97\\d))|5(?:2(?:0[13589]\\d|1[0-2]\\d|2[056]\\d|3(?:[067]\\d|2[01])|4[0-69]\\d|5[3-6]\\d|8[0-25-9]\\d|9[0-469]\\d)|3(?:[12][0-38]|3[0-37]|4[89]|5[01346-9]|[67]\\d|8[01589]|95)\\d|4(?:0[1346]\\d|1[02-35-9]\\d|2[1379]\\d|3[0-46-9]\\d|4[013689]\\d|[59]\\d{2}|6(?:[15-9]\\d|20)|7[036-9]\\d|8[015-8]\\d)|5(?:0[167]\\d|17\\d|2[025-9]\\d|3[035-7]\\d|4[0-35-9]\\d|8[13]\\d|9(?:[124-9]\\d|31))|6(?:0[89]\\d|1[02-46-8]\\d|2[0-69]\\d|3(?:[1-367]\\d|40)|4[0-689]\\d|5(?:[0-24-9]\\d|30)|6[1457-9]\\d|7\\d{2}|8[0-57-9]\\d|9[0-389]\\d)|7(?:1(?:[024679]\\d|80)|2[0-35-8]\\d|3[23]\\d|4[34]\\d|5[0-36-9]\\d|6[356-9]\\d|7\\d{2}|8(?:[23]\\d|[01]1)|9(?:[1-689]\\d|70))|8(?:0[145-9]\\d|1[0-2]\\d|2[09]\\d|3(?:[058]\\d|0[017])|4[016-9]\\d|5[02-9]\\d|7(?:10|2\\d)|8[013589]\\d|9[0-57-9]\\d)|9[23]0\\d)|6(?:2(?:2[1246-9]\\d|3[0-5]\\d|4[02]\\d|5[1-3]\\d|[68]\\d{2}|7(?:[04-8]\\d|10)|9[2-5]\\d)|3(?:1(?:[125-9]\\d|3[01])|3[0-7]\\d|5[0-478]\\d|79\\d|8[3-578]\\d|9[018]\\d)|4(?:1[015]|[2-689]\\d|7[1-79])\\d|5(?:09\\d|1(?:10|[2479]\\d)|2[1-579]\\d|3(?:[0-467]\\d|50)|4[0-24-9]\\d|5\\d{2}|60\\d)|6(?:0[13]\\d|1[0-57]\\d|2[03]\\d|3[0-478]\\d|4[0-8]\\d|5[013-689]\\d|6[0-467]\\d|[78]\\d{2}|9(?:[13-9]\\d|20))|7(?:01|2[06-9]|3[367]|5[7-9]|6\\d|7[0156]|8[12]|9[0-47-9])\\d|85[0-26]\\d|9(?:0[167]|10|[57]\\d|6[02-9]|8[013-9])\\d)|7(?:2(?:0[7-9]|1[016-9]|2[0-8]|[39]\\d|4[014]|5[0-79]|6[125-8]|7[1246-9]|8[37-9])\\d|3(?:0[0-5]|[35]\\d|40|5[0-478]|6[0-5]|8[0-26-8])\\d|4(?:0[07-9]|[1-35]\\d|6[7-9]|7[57]|8[1-68])\\d|5(?:0[04-9]|1[0-68]|2[0-378]|3[0-3]|5\\d|6[0-2]|7[018]|8[5-7]|9[05-9])\\d|6(?:5[0-24-9]|6[0-3568]|7[0457-9]|8[02-9]|9\\d)\\d|7(?:0[25-8]\\d|1(?:[01]\\d|20)|2[0-2]\\d|3[489]\\d|[457-9]\\d{2}|6(?:[0-8]\\d|90))|8(?:01[01]|10\\d|[289]\\d{2}|3(?:[028]\\d|10)|50\\d|6[0-357-9]\\d|7(?:[0235-9]\\d|[14]0))|9(?:0(?:[0246-8]\\d|10)|[1-4]\\d{2}|50\\d|6[014589]\\d|[7-9]0\\d))|8(?:2(?:2(?:[013-5]\\d|[28][0-8]|6[016]|7[0-589]|9[0-49])|3(?:[02][0-689]|1[1-59]|[3-7]\\d|8[0-389]|9[13])|4(?:0[1-3]|[1-8]\\d|9[1-359])|5(?:0[1-7]|[17]\\d|20|3[0-26-9]|4[1-9]|5[0-35]|8[0-689]|9[02367])|6(?:[147]\\d|2[0-25-9]|39|5[014-9]|6[1-9]|8[1-8]|9[089])|7(?:0[017-9]|1[1-356]|20|3[01457-9]|4[15]|5[0-25]|6[0-6]|70|8[0-2]|9[01378])|8(?:0[3-57-9]|[15]0|2[124-9]|3[01]|4[02-6]|6[02-578]|7\\d|8[25-8]|9[04-689]))|3(?:220|3(?:0[089]|10|2[0-7]|3[7-9]|4[0-48])|4(?:0[68]|1[0-478]|2[5-79]|3[024-9]|50|6\\d|7[0-57]|8[05]|96)|5(?:4[4578]|55|6[2-9]|70|8[459]|92))|4(?:2(?:[15]\\d|2[0-489]|3[124-9])|3(?:0[1-8]|[1-4]\\d|5[0-3]|6[1-7]|7[56]|8[0-4]|9[1-578])|4(?:05|80)|555|6(?:1[0-3]|20|3[1-4]|4[0-24-7]|5\\d|6[0-2]|71|8[0-47-9]|9[0-689])|7(02|1[79]|21|3[0-2468]|5[0-5]|6[0256]|7[0-8]|8[01589]|9[026-9])|8(?:0[1-9]|1[0-3568]|2[0138]|3[0-4]|4[046-9]|5[06]|6\\d|7[0-579]|80|9[0-8]))|5(?:2(?:0[0-26]|1\\d|2[0-5]|3[18]|4[0-2]|6[3-68]|70|8[025-9]|9[05-9])|3(?:10|2\\d|31|95)|4(?:0[1-7]|[1-4]\\d|5[02-6]|6[0-3]|7[0-245]|8[125]|9[1-6])|5(?:40|55)|6(?:0[1459]|1[0-8]|2[0-36-8]|3[0-35-8]|[45]\\d|6[0-8]|80)|7(?:1[07-9]|20|3[3-9]|4[02-4]|5[05689]|6[015-9]|7\\d|8[045]|9[0-6]))|6(?:2(?:01|3[12]|5[1-7]|60|8[1-6]|9[0-8])|3(?:0[0137]|[134]\\d|2[0-8]|[59][01]|60|[78]1)|4(?:2[2-4]|49|5[17]|6\\d|7[0-46-9]|8[0-689])|5(?:0[6-8]|55|8[0149]|90)|8(?:5\\d|[68]0)|9(?:5[12]|81))|7(?:2(?:0[189]|[12][1-9]|3[0-47]|50)|3(?:[01][1-9]|3\\d|4[0-245]|6[4-9]|7[237-9]|9[12])|4(?:[0-2]\\d|3[167-9]|[45][0-3]|6[0-8]|7[25-9]|8[0-6]|90)|5(?:0[1-9]|[89]\\d)|7(?:1[89]|[27]\\d|3[013-9]|4[0-8]|50|6[01568]|82)|8(?:[03][1-3]|1[0-28]|2[0-38]|48|5[0-4]|6[1-3]|7[124]|8[013-57-9]|9[07]))|8(?:2(?:0[13-7]|[1-9]\\d)|3(?:0[1-47-9]|[128]\\d|3[0-4]|4[1-9]|5[0-35-7]|6[0-46-9]|9[3-7])|4(?:0[1-58]|1[1-5]|[2-57-9]\\d|69)|5(?:1[1-35-9]|2\\d|3[2-8]|52)|6(?:0[2-9]|1[1-8]|[23]\\d|41|5[12367]|6[1-9]|7[14-9]|8[02-8]|9[05])|7(?:0[1-589]|[1-35-8]\\d|4[0-7]|9[0-46-9])|8(?:01|30|5[0-48]|6[13]|7\\d|8[013-689]|9[24-9])|9(?:0[2-4689]|1\\d|2[08]|3[18]|4[03]|59|6[0-36-9]|7[0-35-79]|8[1235]))|9(?:2(?:[057][1-9]|[1-3]\\d|4[0-8]|6[1-5]|8[015-9]|9[04-6])|300|4(?:01|36|6[1-6]|[89][12])|5(?:0[25689]|1\\d|2[0134]|3[1-8]|5[17]|6[0-35-9]|7[0-7]|91)|6(?:1[1-9]|2[23]|3[0-4]|6[03-9]|7[0-7])|7(?:0[1-68]|1[1-8]|2[25-9]|3[056]|4[4-9]|[5-8]\\d|9[0-46-9])|8(?:0[1-7]|[189]\\d|2[1-46]|4[1-689]|5[0-79]|6[1-9]|71)|9(?:0[1-3]|1\\d|2[0-35-7]|3[67]|4[12]|5[0-249]|6[5-9]|75|8[1-6])))|9(?:2(?:0[458]\\d|1[2-57]\\d|2[0-589]\\d|[39]\\d{2}|4(?:[02-9]\\d|10)|5(?:[024-6]\\d|[7-9]0)|6(?:[03-9]\\d|20)|7[0-26-9]\\d|8(?:[0-24-68]\\d|7[01]))|3(?:0[0-2689]\\d|1(?:[0235]\\d|1[0-2]|4[01])|2(?:0[01]|[1-57-9]\\d|6[0-2])|3(?:00|1[0-4]|2\\d)|4[05]\\d|5[0-3568]\\d|6(?:[1-357-9]\\d|60)|[78]0\\d)|4(?:0[24578]\\d|1[02-57-9]\\d|2\\d{2}|3(?:[0278]\\d|1[01]|60)|4[013579]\\d|5[0-8]\\d|6[0678]\\d|7[013-9]\\d|8[01569]\\d)|5(0(?:[589]\\d|7[01])|1\\d{2}|2[0159]\\d|3[14689]\\d|4[0-46-9]\\d|5[0-35-9]\\d|6[0156-8]\\d|7[0-35]\\d|8[0-7]\\d|9[0-3589]\\d)|6(?:0[269]\\d|[12]\\d{2}|3[0-57-9]\\d|44[0-2]|5[01379]\\d|6[02-9]\\d|7[69]\\d|8(?:[0-24-8]\\d|30)|9(?:[0-24-9]\\d|3[01]))|7(?:0[0136-8]|1[02-4]|2[156]|3[258]|[489]\\d|5[0-589]|6[024-9]|7[0-689])\\d|8(?:0(?:0[01]|1\\d)|1[3-9]\\d|[23]\\d{2}|4[0-24-689]\\d|5[0-689]\\d|6[02-9]\\d|7(?:[01]0|[2-4]\\d)|888)|9(?:00\\d|1[2-57-9]\\d|2(?:00|1[01]|[238]\\d)|3(?:[2-467]\\d|50)|4[4-9]\\d|5(?:[0-2457-9]\\d|60)|6[0156]\\d|7[04-9]\\d|8[01]\\d)))\\d{3}",
          ,,,"323856789",,,[8,9],[6,7]],[,,"1(?:0(?:[23568]\\d|4[0-6]|7[016-9]|9[0-8])\\d|1(?:[1-5]\\d{2}|6(?:0[5-9]|[1-9]\\d))\\d|[23679][2-9]\\d{2}|4(?:[235-9]\\d{2}|400)|59\\d{3}|8(?:1[23]\\d|[236]\\d{2}|4(?:[06]\\d|7[0-4])|5[7-9]\\d|7[016-9]\\d|8(?:[01]\\d|[27][0-4])|9[0-8]\\d))\\d{4}",,,,"123456789",,,[9,10]],[,,"1[378]00\\d{6}",,,,"1300123456",,,[10]],[,,"1600\\d{6}",,,,"1600123456",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"154(?:6(?:0\\d|1[0-3])|8(?:[25]1|4[0189]|7[0-4679]))\\d{4}",,,,"1546012345",
          ,,[10]],"MY",60,"00","0",,,"0",,,,[[,"([4-79])(\\d{3})(\\d{4})","$1-$2 $3",["[4-79]"],"0$1"],[,"(3)(\\d{4})(\\d{4})","$1-$2 $3",["3"],"0$1"],[,"([18]\\d)(\\d{3})(\\d{3,4})","$1-$2 $3",["1[02-46-9][1-9]|8"],"0$1"],[,"(1)([36-8]00)(\\d{2})(\\d{4})","$1-$2-$3-$4",["1[36-8]0","1[36-8]00"]],[,"(11)(\\d{4})(\\d{4})","$1-$2 $3",["11"],"0$1"],[,"(15[49])(\\d{3})(\\d{4})","$1-$2 $3",["15[49]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],MZ:[,[,,"[28]\\d{7,8}",,,,,,,[8,9]],
          [,,"2(?:[1346]\\d|5[0-2]|[78][12]|93)\\d{5}",,,,"21123456",,,[8]],[,,"8[2-7]\\d{7}",,,,"821234567",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"MZ",258,"00",,,,,,,,[[,"([28]\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["2|8[2-7]"]],[,"(80\\d)(\\d{3})(\\d{3})","$1 $2 $3",["80"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],NA:[,[,,"[68]\\d{7,8}",,,,,,,[8,9]],[,,"6(?:1(?:17|2(?:[0189]\\d|[2-6]|7\\d?)|3(?:[01378]|2\\d)|4(?:[024]|10?|3[15]?)|69|7[014])|2(?:17|5(?:[0-36-8]|4\\d?)|69|70)|3(?:17|2(?:[0237]\\d?|[14-689])|34|6[289]|7[01]|81)|4(?:17|2(?:[012]|7\\d?)|4(?:[06]|1\\d?)|5(?:[01357]|[25]\\d?)|69|7[01])|5(?:17|2(?:[0459]|[23678]\\d?)|69|7[01])|6(?:17|2(?:5|6\\d?)|38|42|69|7[01])|7(?:17|2(?:[569]|[234]\\d?)|3(?:0\\d?|[13])|6[89]|7[01]))\\d{4}",
          ,,,"61221234"],[,,"(?:60|8[125])\\d{7}",,,,"811234567",,,[9]],[,,,,,,,,,[-1]],[,,"8701\\d{5}",,,,"870123456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"8(?:3\\d{2}|86)\\d{5}",,,,"88612345"],"NA",264,"00","0",,,"0",,,,[[,"(8\\d)(\\d{3})(\\d{4})","$1 $2 $3",["8[1-35]"],"0$1"],[,"(6\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["6"],"0$1"],[,"(88)(\\d{3})(\\d{3})","$1 $2 $3",["88"],"0$1"],[,"(870)(\\d{3})(\\d{3})","$1 $2 $3",["870"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],
        NC:[,[,,"[2-57-9]\\d{5}",,,,,,,[6]],[,,"(?:2[03-9]|3[0-5]|4[1-7]|88)\\d{4}",,,,"201234"],[,,"(?:5[0-4]|[79]\\d|8[0-79])\\d{4}",,,,"751234"],[,,,,,,,,,[-1]],[,,"36\\d{4}",,,,"366711"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NC",687,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})","$1.$2.$3",["[2-46-9]|5[0-4]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],NE:[,[,,"[0289]\\d{7}",,,,,,,[8]],[,,"2(?:0(?:20|3[1-7]|4[134]|5[14]|6[14578]|7[1-578])|1(?:4[145]|5[14]|6[14-68]|7[169]|88))\\d{4}",
          ,,,"20201234"],[,,"(?:8[04589]|9\\d)\\d{6}",,,,"93123456"],[,,"08\\d{6}",,,,"08123456"],[,,"09\\d{6}",,,,"09123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NE",227,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["09|[289]"]],[,"(08)(\\d{3})(\\d{3})","$1 $2 $3",["08"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],NF:[,[,,"[13]\\d{5}",,,,,,,[6],[5]],[,,"(?:1(?:06|17|28|39)|3[012]\\d)\\d{3}",,,,"106609",,,,[5]],[,,"3[58]\\d{4}",,,,"381234",,,,[5]],
          [,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NF",672,"00",,,,,,,,[[,"(\\d{2})(\\d{4})","$1 $2",["1"]],[,"(\\d)(\\d{5})","$1 $2",["3"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],NG:[,[,,"[1-6]\\d{5,8}|9\\d{5,9}|[78]\\d{5,13}",,,,,,,[7,8,10,11,12,13,14],[5,6]],[,,"[12]\\d{6,7}|9(?:0[3-9]|[1-9]\\d)\\d{5}|(?:3\\d|4[023568]|5[02368]|6[02-469]|7[4-69]|8[2-9])\\d{6}|(?:4[47]|5[14579]|6[1578]|7[0-357])\\d{5,6}|(?:78|41)\\d{5}",,,,"12345678",
          ,,[7,8],[5,6]],[,,"(?:1(?:7[34]\\d|8(?:04|[124579]\\d|8[0-3])|95\\d)|287[0-7]|3(?:18[1-8]|88[0-7]|9(?:8[5-9]|6[1-5]))|4(?:28[0-2]|6(?:7[1-9]|8[02-47])|88[0-2])|5(?:2(?:7[7-9]|8\\d)|38[1-79]|48[0-7]|68[4-7])|6(?:2(?:7[7-9]|8\\d)|4(?:3[7-9]|[68][129]|7[04-69]|9[1-8])|58[0-2]|98[7-9])|7(?:38[0-7]|69[1-8]|78[2-4])|8(?:28[3-9]|38[0-2]|4(?:2[12]|3[147-9]|5[346]|7[4-9]|8[014-689]|90)|58[1-8]|78[2-9]|88[5-7])|98[07]\\d)\\d{4}|(?:70(?:[1-689]\\d|7[0-3])|8(?:0(?:1[01]|[2-9]\\d)|1(?:[0-8]\\d|9[01]))|90[235-9]\\d)\\d{6}",
          ,,,"8021234567",,,[8,10]],[,,"800\\d{7,11}",,,,"80017591759",,,[10,11,12,13,14]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NG",234,"009","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[12]|9(?:0[3-9]|[1-9])"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2,3})","$1 $2 $3",["[3-6]|7(?:0[1-9]|[1-79])|8[2-9]"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["70|8[01]|90[235-9]"],"0$1"],[,"([78]00)(\\d{4})(\\d{4,5})","$1 $2 $3",["[78]00"],"0$1"],[,"([78]00)(\\d{5})(\\d{5,6})","$1 $2 $3",
          ["[78]00"],"0$1"],[,"(78)(\\d{2})(\\d{3})","$1 $2 $3",["78"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"700\\d{7,11}",,,,"7001234567",,,[10,11,12,13,14]],,,[,,,,,,,,,[-1]]],NI:[,[,,"[125-8]\\d{7}",,,,,,,[8]],[,,"2\\d{7}",,,,"21234567"],[,,"(?:5(?:5[0-7]|[78]\\d)|6(?:20|3[035]|4[045]|5[05]|77|8[1-9]|9[059])|7[5-8]\\d|8\\d{2})\\d{5}",,,,"81234567"],[,,"1800\\d{4}",,,,"18001234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NI",505,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2"]],
          ,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],NL:[,[,,"1\\d{4,8}|[2-7]\\d{8}|[89]\\d{6,9}",,,,,,,[5,6,7,8,9,10]],[,,"(?:1(?:[035]\\d|1[13-578]|6[124-8]|7[24]|8[0-467])|2(?:[0346]\\d|2[2-46-9]|5[125]|9[479])|3(?:[03568]\\d|1[3-8]|2[01]|4[1-8])|4(?:[0356]\\d|1[1-368]|7[58]|8[15-8]|9[23579])|5(?:[0358]\\d|[19][1-9]|2[1-57-9]|4[13-8]|6[126]|7[0-3578])|7\\d{2})\\d{6}",,,,"101234567",,,[9]],[,,"6[1-58]\\d{7}",,,,"612345678",,,[9]],[,,"800\\d{4,7}",,,,"8001234",,,[7,8,9,10]],[,,"90[069]\\d{4,7}",
          ,,,"9061234",,,[7,8,9,10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:6760|85\\d{2})\\d{5}",,,,"851234567",,,[9]],"NL",31,"00","0",,,"0",,,,[[,"([1-578]\\d)(\\d{3})(\\d{4})","$1 $2 $3",["1[035]|2[0346]|3[03568]|4[0356]|5[0358]|7|8[4578]"],"0$1"],[,"([1-5]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["1[16-8]|2[259]|3[124]|4[17-9]|5[124679]"],"0$1"],[,"(6)(\\d{8})","$1 $2",["6[0-57-9]"],"0$1"],[,"(66)(\\d{7})","$1 $2",["66"],"0$1"],[,"(14)(\\d{3,4})","$1 $2",["14"],"$1"],[,"([89]0\\d)(\\d{4,7})","$1 $2",["[89]0"],
          "0$1"]],,[,,"66\\d{7}",,,,"662345678",,,[9]],,,[,,"140(?:1(?:[035]|[16-8]\\d)|2(?:[0346]|[259]\\d)|3(?:[03568]|[124]\\d)|4(?:[0356]|[17-9]\\d)|5(?:[0358]|[124679]\\d)|7\\d|8[458])",,,,"14023",,,[5,6]],[,,"140(?:1(?:[035]|[16-8]\\d)|2(?:[0346]|[259]\\d)|3(?:[03568]|[124]\\d)|4(?:[0356]|[17-9]\\d)|5(?:[0358]|[124679]\\d)|7\\d|8[458])|8[478]\\d{7}",,,,"14020",,,[5,6,9]],,,[,,,,,,,,,[-1]]],NO:[,[,,"0\\d{4}|[2-9]\\d{7}",,,,,,,[5,8]],[,,"(?:2[1-4]|3[1-3578]|5[1-35-7]|6[1-4679]|7[0-8])\\d{6}",,,,"21234567",
          ,,[8]],[,,"(?:4[015-8]|5[89]|9\\d)\\d{6}",,,,"40612345",,,[8]],[,,"80[01]\\d{5}",,,,"80012345",,,[8]],[,,"82[09]\\d{5}",,,,"82012345",,,[8]],[,,"810(?:0[0-6]|[2-8]\\d)\\d{3}",,,,"81021234",,,[8]],[,,"880\\d{5}",,,,"88012345",,,[8]],[,,"85[0-5]\\d{5}",,,,"85012345",,,[8]],"NO",47,"00",,,,,,,,[[,"([489]\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["[489]"]],[,"([235-7]\\d)(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[235-7]"]]],,[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]],[,,"0\\d{4}|81(?:0(?:0[7-9]|1\\d)|5\\d{2})\\d{3}",
          ,,,"01234"],,,[,,"81[23]\\d{5}",,,,"81212345",,,[8]]],NP:[,[,,"[1-8]\\d{7}|9(?:[1-69]\\d{6,8}|7[2-6]\\d{5,7}|8\\d{8})",,,,,,,[8,10],[6,7]],[,,"(?:1[0-6]\\d|2[13-79][2-6]|3[135-8][2-6]|4[146-9][2-6]|5[135-7][2-6]|6[13-9][2-6]|7[15-9][2-6]|8[1-46-9][2-6]|9[1-79][2-6])\\d{5}",,,,"14567890",,,[8],[6,7]],[,,"9(?:6[0-3]|7[245]|8[0-24-68])\\d{7}",,,,"9841234567",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NP",977,"00","0",,,"0",,,,[[,"(1)(\\d{7})","$1-$2",["1[2-6]"],
          "0$1"],[,"(\\d{2})(\\d{6})","$1-$2",["1[01]|[2-8]|9(?:[1-69]|7[15-9])"],"0$1"],[,"(9\\d{2})(\\d{7})","$1-$2",["9(?:6[013]|7[245]|8)"],"$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],NR:[,[,,"[458]\\d{6}",,,,,,,[7]],[,,"(?:444|888)\\d{4}",,,,"4441234"],[,,"55[4-9]\\d{4}",,,,"5551234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NR",674,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,
          ,,,,,,,,[-1]]],NU:[,[,,"[1-5]\\d{3}",,,,,,,[4]],[,,"[34]\\d{3}",,,,"4002"],[,,"[125]\\d{3}",,,,"1234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"NU",683,"00",,,,,,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],NZ:[,[,,"6[235-9]\\d{6}|[2-57-9]\\d{7,9}",,,,,,,[8,9,10],[7]],[,,"(?:3[2-79]|[49][2-9]|6[235-9]|7[2-57-9])\\d{6}|24099\\d{3}",,,,"32345678",,,[8],[7]],[,,"2(?:[028]\\d{7,8}|1\\d{6,8}|[79]\\d{7})",,,,"211234567"],[,,"508\\d{6,7}|80\\d{6,8}",
          ,,,"800123456"],[,,"90\\d{6,7}",,,,"900123456",,,[8,9]],[,,,,,,,,,[-1]],[,,"70\\d{7}",,,,"701234567",,,[9]],[,,,,,,,,,[-1]],"NZ",64,"0(?:0|161)","0",,,"0",,"00",,[[,"(\\d)(\\d{3})(\\d{4})","$1-$2 $3",["240|[346]|7[2-57-9]|9[1-9]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["21"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{3,5})","$1 $2 $3",["2(?:1[1-9]|[69]|7[0-35-9])|70|86"],"0$1"],[,"(2\\d)(\\d{3,4})(\\d{4})","$1 $2 $3",["2[028]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{3})","$1 $2 $3",["90"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})",
          "$1 $2 $3",["2(?:10|74)|5|[89]0"],"0$1"]],,[,,"[28]6\\d{6,7}",,,,"26123456",,,[8,9]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],OM:[,[,,"(?:5|[279]\\d)\\d{6}|800\\d{5,6}",,,,,,,[7,8,9]],[,,"2[2-6]\\d{6}",,,,"23123456",,,[8]],[,,"7[19]\\d{6}|9(?:0[1-9]|[1-9]\\d)\\d{5}",,,,"92123456",,,[8]],[,,"8007\\d{4,5}|500\\d{4}",,,,"80071234"],[,,"900\\d{5}",,,,"90012345",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"OM",968,"00",,,,,,,,[[,"(2\\d)(\\d{6})","$1 $2",["2"]],[,"([79]\\d{3})(\\d{4})",
          "$1 $2",["[79]"]],[,"([58]00)(\\d{4,6})","$1 $2",["[58]00"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PA:[,[,,"[1-9]\\d{6,7}",,,,,,,[7,8]],[,,"(?:1(?:0\\d|1[479]|2[37]|3[0137]|4[17]|5[05]|[68][58]|7[0167]|9[39])|2(?:[0235-79]\\d|1[0-7]|4[013-9]|8[026-9])|3(?:[089]\\d|1[014-7]|2[0-35]|33|4[0-579]|55|6[068]|7[06-8])|4(?:00|3[0-579]|4\\d|7[0-57-9])|5(?:[01]\\d|2[0-7]|[56]0|79)|7(?:0[09]|2[0-26-8]|3[03]|4[04]|5[05-9]|6[05]|7[0-24-9]|8[7-9]|90)|8(?:09|2[89]|3\\d|4[0-24-689]|5[014]|8[02])|9(?:0[5-9]|1[0135-8]|2[036-9]|3[35-79]|40|5[0457-9]|6[05-9]|7[04-9]|8[35-8]|9\\d))\\d{4}",
          ,,,"2001234",,,[7]],[,,"(?:1[16]1|21[89]|8(?:1[01]|7[23]))\\d{4}|6(?:[02-9]\\d|1[0-5])\\d{5}",,,,"61234567"],[,,"800\\d{4}",,,,"8001234",,,[7]],[,,"(?:8(?:22|55|60|7[78]|86)|9(?:00|81))\\d{4}",,,,"8601234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"PA",507,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1-$2",["[1-57-9]"]],[,"(\\d{4})(\\d{4})","$1-$2",["6"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PE:[,[,,"[14-9]\\d{7,8}",,,,,,,[8,9],[6,7]],[,,"(?:1\\d|4[1-4]|5[1-46]|6[1-7]|7[2-46]|8[2-4])\\d{6}",
          ,,,"11234567",,,[8],[6,7]],[,,"9\\d{8}",,,,"912345678",,,[9]],[,,"800\\d{5}",,,,"80012345",,,[8]],[,,"805\\d{5}",,,,"80512345",,,[8]],[,,"801\\d{5}",,,,"80112345",,,[8]],[,,"80[24]\\d{5}",,,,"80212345",,,[8]],[,,,,,,,,,[-1]],"PE",51,"19(?:1[124]|77|90)00","0"," Anexo ",,"0",,,,[[,"(1)(\\d{7})","$1 $2",["1"],"(0$1)"],[,"([4-8]\\d)(\\d{6})","$1 $2",["[4-7]|8[2-4]"],"(0$1)"],[,"(\\d{3})(\\d{5})","$1 $2",["80"],"(0$1)"],[,"(9\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["9"],"$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,
          ,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PF:[,[,,"4\\d{5,7}|8\\d{7}",,,,,,,[6,8]],[,,"4(?:[09][45689]\\d|4)\\d{4}",,,,"40412345"],[,,"8[79]\\d{6}",,,,"87123456",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"PF",689,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["4[09]|8[79]"]],[,"(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3",["44"]]],,[,,,,,,,,,[-1]],,,[,,"44\\d{4}",,,,"441234",,,[6]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PG:[,[,,"[1-9]\\d{6,7}",,
          ,,,,,[7,8]],[,,"(?:3[0-2]\\d|4[257]\\d|5[34]\\d|64[1-9]|77(?:[0-24]\\d|30)|85[02-46-9]|9[78]\\d)\\d{4}",,,,"3123456",,,[7]],[,,"7(?:[0-689]\\d|75)\\d{5}",,,,"70123456",,,[8]],[,,"180\\d{4}",,,,"1801234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"2(?:0[0-47]|7[568])\\d{4}",,,,"2751234",,,[7]],"PG",675,"140[1-3]|00",,,,,,"00",,[[,"(\\d{3})(\\d{4})","$1 $2",["[13-689]|27"]],[,"(\\d{4})(\\d{4})","$1 $2",["20|7"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PH:[,
          [,,"1\\d{10,12}|2\\d{5,7}|[3-7]\\d{8}|8\\d{7,9}|9\\d{9}",,,,,,,[6,8,9,10,11,12,13],[5,7]],[,,"2\\d{5}(?:\\d{2})?|(?:3[2-68]|4[2-9]|5[2-6]|6[2-58]|7[24578]|8[2-8])\\d{7}|88(?:22\\d{6}|42\\d{4})",,,,"21234567",,,[6,8,9,10],[5,7]],[,,"(?:81[37]|9(?:0[5-9]|1[024-9]|2[0-35-9]|3[02-9]|4[235-9]|5[056]|6[5-7]|7[34-79]|89|9[4-9]))\\d{7}",,,,"9051234567",,,[10]],[,,"1800\\d{7,9}",,,,"180012345678",,,[11,12,13]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"PH",63,"00","0",,,"0",,,,[[,"(2)(\\d{3})(\\d{4})",
            "$1 $2 $3",["2"],"(0$1)"],[,"(2)(\\d{5})","$1 $2",["2"],"(0$1)"],[,"(\\d{4})(\\d{4,6})","$1 $2",["3(?:23|39|46)|4(?:2[3-6]|[35]9|4[26]|76)|5(?:22|44)|642|8(?:62|8[245])","3(?:230|397|461)|4(?:2(?:35|[46]4|51)|396|4(?:22|63)|59[347]|76[15])|5(?:221|446)|642[23]|8(?:622|8(?:[24]2|5[13]))"],"(0$1)"],[,"(\\d{5})(\\d{4})","$1 $2",["346|4(?:27|9[35])|883","3469|4(?:279|9(?:30|56))|8834"],"(0$1)"],[,"([3-8]\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[3-8]"],"(0$1)"],[,"(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["81|9"],
            "0$1"],[,"(1800)(\\d{3})(\\d{4})","$1 $2 $3",["180","1800"]],[,"(1800)(\\d{1,2})(\\d{3})(\\d{4})","$1 $2 $3 $4",["180","1800"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PK:[,[,,"1\\d{8}|[2-8]\\d{5,11}|9(?:[013-9]\\d{4,10}|2\\d(?:111\\d{6}|\\d{3,7}))",,,,,,,[8,9,10,11,12],[6,7]],[,,"(?:21|42)[2-9]\\d{7}|(?:2[25]|4[0146-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]\\d{6}|(?:2(?:3[2358]|4[2-4]|9[2-8])|45[3479]|54[2-467]|60[468]|72[236]|8(?:2[2-689]|3[23578]|4[3478]|5[2356])|9(?:2[2-8]|3[27-9]|4[2-6]|6[3569]|9[25-8]))[2-9]\\d{5,6}|58[126]\\d{7}",
          ,,,"2123456789",,,[9,10],[6,7,8]],[,,"3(?:[014]\\d|2[0-5]|3[0-7]|55|64)\\d{7}",,,,"3012345678",,,[10]],[,,"800\\d{5}",,,,"80012345",,,[8]],[,,"900\\d{5}",,,,"90012345",,,[8]],[,,,,,,,,,[-1]],[,,"122\\d{6}",,,,"122044444",,,[9]],[,,,,,,,,,[-1]],"PK",92,"00","0",,,"0",,,,[[,"([89]00)(\\d{3})(\\d{2})","$1 $2 $3",["[89]00"],"0$1"],[,"(1\\d{3})(\\d{5})","$1 $2",["1"],"$1"],[,"(\\d{2})(\\d{7,8})","$1 $2",["(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)[2-9]"],"(0$1)"],[,"(\\d{3})(\\d{6,7})","$1 $2",
          ["2[349]|45|54|60|72|8[2-5]|9[2-469]","(?:2[349]|45|54|60|72|8[2-5]|9[2-469])\\d[2-9]"],"(0$1)"],[,"(58\\d{3})(\\d{5})","$1 $2",["58[126]"],"(0$1)"],[,"(3\\d{2})(\\d{7})","$1 $2",["3"],"0$1"],[,"(\\d{2})(111)(\\d{3})(\\d{3})","$1 $2 $3 $4",["(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)1","(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)11","(?:2[125]|4[0-246-9]|5[1-35-7]|6[1-8]|7[14]|8[16]|91)111"],"(0$1)"],[,"(\\d{3})(111)(\\d{3})(\\d{3})","$1 $2 $3 $4",["2[349]|45|54|60|72|8[2-5]|9[2-9]",
          "(?:2[349]|45|54|60|72|8[2-5]|9[2-9])\\d1","(?:2[349]|45|54|60|72|8[2-5]|9[2-9])\\d11","(?:2[349]|45|54|60|72|8[2-5]|9[2-9])\\d111"],"(0$1)"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"(?:2(?:[125]|3[2358]|4[2-4]|9[2-8])|4(?:[0-246-9]|5[3479])|5(?:[1-35-7]|4[2-467])|6(?:[1-8]|0[468])|7(?:[14]|2[236])|8(?:[16]|2[2-689]|3[23578]|4[3478]|5[2356])|9(?:1|22|3[27-9]|4[2-6]|6[3569]|9[2-7]))111\\d{6}",,,,"21111825888",,,[11,12]],,,[,,,,,,,,,[-1]]],PL:[,[,,"[1-57-9]\\d{6,8}|6\\d{5,8}",,,,,,,[6,7,8,9]],[,,"(?:1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145])(?:\\d{7}|19\\d{3})",
          ,,,"123456789",,,[7,9]],[,,"(?:45|5[0137]|6[069]|7[2389]|88)\\d{7}",,,,"512345678",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"70[01346-8]\\d{6}",,,,"701234567",,,[9]],[,,"801\\d{6}",,,,"801234567",,,[9]],[,,,,,,,,,[-1]],[,,"39\\d{7}",,,,"391234567",,,[9]],"PL",48,"00",,,,,,,,[[,"(\\d{3})(\\d{3})","$1 $2",["11[68]|64"]],[,"(\\d{5})","$1",["19"]],[,"(\\d{2})(\\d{2})(\\d{3})","$1 $2 $3",["1[2-8]|2[2-69]|3[2-4]|4[1-468]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145]"]],[,"(\\d{3})(\\d{2})(\\d{2,3})",
          "$1 $2 $3",["64"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["26|39|45|5[0137]|6[0469]|7[02389]|8[08]"]],[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[14]|2[0-57-9]|3[2-4]|5[24-689]|6[1-3578]|7[14-7]|8[1-79]|9[145]"]]],,[,,"64\\d{4,7}",,,,"641234567"],,,[,,,,,,,,,[-1]],[,,"804\\d{6}",,,,"804123456",,,[9]],,,[,,,,,,,,,[-1]]],PM:[,[,,"[45]\\d{5}",,,,,,,[6]],[,,"(?:4[1-3]|50)\\d{4}",,,,"411234"],[,,"(?:4[02-4]|5[05])\\d{4}",,,,"551234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,
          ,,[-1]],[,,,,,,,,,[-1]],"PM",508,"00","0",,,"0",,,,[[,"([45]\\d)(\\d{2})(\\d{2})","$1 $2 $3",["[45]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PR:[,[,,"[5789]\\d{9}",,,,,,,[10],[7]],[,,"(?:787|939)[2-9]\\d{6}",,,,"7872345678",,,,[7]],[,,"(?:787|939)[2-9]\\d{6}",,,,"7872345678",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"5(?:(?:00|22|33|44|66|77|88)[2-9]|21[23])\\d{6}",,,,"5002345678"],
          [,,,,,,,,,[-1]],"PR",1,"011","1",,,"1",,,1,,,[,,,,,,,,,[-1]],,"787|939",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PS:[,[,,"1\\d{9}|[24589]\\d{7,8}",,,,,,,[8,9,10],[7]],[,,"(?:22[234789]|42[45]|82[01458]|92[369])\\d{5}",,,,"22234567",,,[8],[7]],[,,"5[69]\\d{7}",,,,"599123456",,,[9]],[,,"1800\\d{6}",,,,"1800123456",,,[10]],[,,,,,,,,,[-1]],[,,"1700\\d{6}",,,,"1700123456",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"PS",970,"00","0",,,"0",,,,[[,"([2489])(2\\d{2})(\\d{4})","$1 $2 $3",["[2489]2"],
          "0$1"],[,"(5[69]\\d)(\\d{3})(\\d{3})","$1 $2 $3",["5[69]"],"0$1"],[,"(1[78]00)(\\d{3})(\\d{3})","$1 $2 $3",["1[78]0","1[78]00"],"$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PT:[,[,,"[2-46-9]\\d{8}",,,,,,,[9]],[,,"2(?:[12]\\d|[35][1-689]|4[1-59]|6[1-35689]|7[1-9]|8[1-69]|9[1256])\\d{6}",,,,"212345678"],[,,"9(?:[1236]\\d{2}|480)\\d{5}",,,,"912345678"],[,,"80[02]\\d{6}",,,,"800123456"],[,,"6(?:0[178]|4[68])\\d{6}|76(?:0[1-57]|1[2-47]|2[237])\\d{5}",,,,"760123456"],[,,
          "80(?:8\\d|9[1579])\\d{5}",,,,"808123456"],[,,"884[0-4689]\\d{5}",,,,"884123456"],[,,"30\\d{7}",,,,"301234567"],"PT",351,"00",,,,,,,,[[,"(2\\d)(\\d{3})(\\d{4})","$1 $2 $3",["2[12]"]],[,"([2-46-9]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["2[3-9]|[346-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"7(?:0(?:7\\d|8[17]))\\d{5}",,,,"707123456"],,,[,,"600\\d{6}",,,,"600110000"]],PW:[,[,,"[2-9]\\d{6}",,,,,,,[7]],[,,"(?:2(?:55|77)|345|488|5(?:35|44|87)|6(?:22|54|79)|7(?:33|47)|8(?:24|55|76)|900)\\d{4}",,,,"2771234"],
          [,,"(?:6[234689]0|77\\d|88[0-4])\\d{4}",,,,"6201234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"PW",680,"01[12]",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],PY:[,[,,"5[0-5]\\d{4,7}|[2-46-9]\\d{5,8}",,,,,,,[6,7,8,9],[5]],[,,"(?:[26]1|3[289]|4[124678]|7[123]|8[1236])\\d{5,7}|(?:2(?:2[4568]|7[15]|9[1-5])|3(?:18|3[167]|4[2357]|51)|4(?:18|2[45]|3[12]|5[13]|64|71|9[1-47])|5(?:[1-4]\\d|5[0234])|6(?:3[1-3]|44|7[1-4678])|7(?:17|4[0-4]|6[1-578]|75|8[0-8])|858)\\d{5,6}",
          ,,,"212345678",,,[7,8,9],[5,6]],[,,"9(?:51|6[129]|[78][1-6]|9[1-5])\\d{6}",,,,"961456789",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"8700[0-4]\\d{4}",,,,"870012345",,,[9]],"PY",595,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{5})","$1 $2",["[26]1|3[289]|4[1246-8]|7[1-3]|8[1-36]"],"(0$1)"],[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[26]1|3[289]|4[1246-8]|7[1-3]|8[1-36]"],"(0$1)"],[,"(\\d{3})(\\d{3,6})","$1 $2",["[2-9]0"],"0$1"],[,"(\\d{3})(\\d{6})","$1 $2",["9[1-9]"],"0$1"],
          [,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["870","8700"]],[,"(\\d{3})(\\d{4,5})","$1 $2",["[2-8][1-9]"],"(0$1)"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[2-8][1-9]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"[2-9]0\\d{4,7}",,,,"201234567"],,,[,,,,,,,,,[-1]]],QA:[,[,,"[2-8]\\d{6,7}",,,,,,,[7,8]],[,,"4[04]\\d{6}",,,,"44123456",,,[8]],[,,"[3567]\\d{7}",,,,"33123456",,,[8]],[,,"800\\d{4}",,,,"8001234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"QA",974,"00",,,,,,,,[[,
          "([28]\\d{2})(\\d{4})","$1 $2",["[28]"]],[,"([3-7]\\d{3})(\\d{4})","$1 $2",["[3-7]"]]],,[,,"2(?:[12]\\d|61)\\d{4}",,,,"2123456",,,[7]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],RE:[,[,,"[268]\\d{8}",,,,,,,[9]],[,,"262\\d{6}",,,,"262161234"],[,,"69(?:2\\d{2}|3(?:0[0-46]|1[013]|2[0-2]|3[0-39]|4\\d|5[05]|6[0-26]|7[0-27]|8[0-38]|9[0-479]))\\d{4}",,,,"692123456"],[,,"80\\d{7}",,,,"801234567"],[,,"89[1-37-9]\\d{6}",,,,"891123456"],[,,"8(?:1[019]|2[0156]|84|90)\\d{6}",,,,"810123456"],[,,,,,,,
          ,,[-1]],[,,,,,,,,,[-1]],"RE",262,"00","0",,,"0",,,,[[,"([268]\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[268]"],"0$1"]],,[,,,,,,,,,[-1]],1,"262|69|8",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],RO:[,[,,"[23]\\d{5,8}|[7-9]\\d{8}",,,,,,,[6,9]],[,,"2(?:1(?:\\d{7}|9\\d{3})|[3-6](?:\\d{7}|\\d9\\d{2}))|3(?:1\\d{4}(?:\\d{3})?|[3-6]\\d{7})",,,,"211234567"],[,,"7(?:[02-7]\\d{2}|1(?:[01]\\d|20)|8[03-8]\\d|99\\d)\\d{5}",,,,"712034567",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"90[036]\\d{6}",
          ,,,"900123456",,,[9]],[,,"801\\d{6}",,,,"801123456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"RO",40,"00","0"," int ",,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[23]1"],"0$1"],[,"(\\d{2})(\\d{4})","$1 $2",["[23]1"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["[23][3-7]|[7-9]"],"0$1"],[,"(2\\d{2})(\\d{3})","$1 $2",["2[3-6]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"37\\d{7}",,,,"372123456",,,[9]],,,[,,,,,,,,,[-1]]],RS:[,[,,"[126-9]\\d{4,11}|3(?:[0-79]\\d{3,10}|8[2-9]\\d{2,9})",,,,,
          ,,[6,7,8,9,10,11,12],[5]],[,,"(?:1(?:[02-9][2-9]|1[1-9])\\d|2(?:[0-24-7][2-9]\\d|[389](?:0[2-9]|[2-9]\\d))|3(?:[0-8][2-9]\\d|9(?:[2-9]\\d|0[2-9])))\\d{3,8}",,,,"10234567",,,[7,8,9,10,11,12],[5,6]],[,,"6(?:[0-689]|7\\d)\\d{6,7}",,,,"601234567",,,[8,9,10]],[,,"800\\d{3,9}",,,,"80012345"],[,,"(?:90[0169]|78\\d)\\d{3,7}",,,,"90012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"RS",381,"00","0",,,"0",,,,[[,"([23]\\d{2})(\\d{4,9})","$1 $2",["(?:2[389]|39)0"],"0$1"],[,"([1-3]\\d)(\\d{5,10})","$1 $2",
          ["1|2(?:[0-24-7]|[389][1-9])|3(?:[0-8]|9[1-9])"],"0$1"],[,"(6\\d)(\\d{6,8})","$1 $2",["6"],"0$1"],[,"([89]\\d{2})(\\d{3,9})","$1 $2",["[89]"],"0$1"],[,"(7[26])(\\d{4,9})","$1 $2",["7[26]"],"0$1"],[,"(7[08]\\d)(\\d{4,9})","$1 $2",["7[08]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"7[06]\\d{4,10}",,,,"700123456"],,,[,,,,,,,,,[-1]]],RU:[,[,,"[347-9]\\d{9}",,,,,,,[10]],[,,"(?:3(?:0[12]|4[1-35-79]|5[1-3]|65|8[1-58]|9[0145])|4(?:01|1[1356]|2[13467]|7[1-5]|8[1-7]|9[1-689])|8(?:1[1-8]|2[01]|3[13-6]|4[0-8]|5[15]|6[1-35-79]|7[1-37-9]))\\d{7}",
          ,,,"3011234567"],[,,"9\\d{9}",,,,"9123456789"],[,,"80[04]\\d{7}",,,,"8001234567"],[,,"80[39]\\d{7}",,,,"8091234567"],[,,,,,,,,,[-1]],[,,"808\\d{7}",,,,"8081234567"],[,,,,,,,,,[-1]],"RU",7,"810","8",,,"8",,"8~10",,[[,"(\\d{3})(\\d{2})(\\d{2})","$1-$2-$3",["[1-79]"],"$1",,1],[,"([3489]\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2-$3-$4",["[3489]"],"8 ($1)",,1],[,"(7\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["7"],"8 ($1)",,1]],[[,"([3489]\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2-$3-$4",["[3489]"],"8 ($1)",,1],[,"(7\\d{2})(\\d{3})(\\d{4})",
          "$1 $2 $3",["7"],"8 ($1)",,1]],[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],RW:[,[,,"[027-9]\\d{7,8}",,,,,,,[8,9]],[,,"2[258]\\d{7}|06\\d{6}",,,,"250123456"],[,,"7[238]\\d{7}",,,,"720123456",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"900\\d{6}",,,,"900123456",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"RW",250,"00","0",,,"0",,,,[[,"(2\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["2"]],[,"([7-9]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[7-9]"],"0$1"],[,"(0\\d)(\\d{2})(\\d{2})(\\d{2})",
          "$1 $2 $3 $4",["0"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SA:[,[,,"[15]\\d{8}|8\\d{9}|92\\d{7}",,,,,,,[9,10],[7]],[,,"1(?:1\\d|2[24-8]|3[35-8]|4[3-68]|6[2-5]|7[235-7])\\d{6}",,,,"112345678",,,[9],[7]],[,,"(?:5(?:[013-689]\\d|7[0-36-8])|811\\d)\\d{6}",,,,"512345678"],[,,"800\\d{7}",,,,"8001234567",,,[10]],[,,,,,,,,,[-1]],[,,"92[05]\\d{6}",,,,"920012345",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SA",966,"00","0",,,"0",,,,[[,"(1\\d)(\\d{3})(\\d{4})","$1 $2 $3",["1[1-467]"],
          "0$1"],[,"(5\\d)(\\d{3})(\\d{4})","$1 $2 $3",["5"],"0$1"],[,"(92\\d{2})(\\d{5})","$1 $2",["92"],"$1"],[,"(800)(\\d{3})(\\d{4})","$1 $2 $3",["800"],"$1"],[,"(811)(\\d{3})(\\d{3,4})","$1 $2 $3",["811"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SB:[,[,,"[1-9]\\d{4,6}",,,,,,,[5,7]],[,,"(?:1[4-79]|[23]\\d|4[0-2]|5[03]|6[0-37])\\d{3}",,,,"40123",,,[5]],[,,"48\\d{3}|7(?:30|[46-8]\\d|5[025-9]|9[0-5])\\d{4}|8[4-9]\\d{5}|9(?:1[2-9]|2[013-9]|3[0-2]|[46]\\d|5[0-46-9]|7[0-689]|8[0-79]|9[0-8])\\d{4}",
          ,,,"7421234"],[,,"1[38]\\d{3}",,,,"18123",,,[5]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"5[12]\\d{3}",,,,"51123",,,[5]],"SB",677,"0[01]",,,,,,,,[[,"(\\d{2})(\\d{5})","$1 $2",["[7-9]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SC:[,[,,"[24689]\\d{5,6}",,,,,,,[7]],[,,"4[2-46]\\d{5}",,,,"4217123"],[,,"2[5-8]\\d{5}",,,,"2510123"],[,,"8000\\d{3}",,,,"8000000"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:64\\d|971)\\d{4}",,,,"6412345"],"SC",248,"0(?:[02]|10?)",
          ,,,,,"00",,[[,"(\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[246]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SD:[,[,,"[19]\\d{8}",,,,,,,[9]],[,,"1(?:5\\d|8[3567])\\d{6}",,,,"151231234"],[,,"(?:1[0-2]|9[0-3569])\\d{7}",,,,"911231234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SD",249,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",,"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SE:[,[,,"[1-35-9]\\d{5,11}|4\\d{6,8}",
          ,,,,,,[6,7,8,9,10,12]],[,,"1(?:0[1-8]\\d{6}|[136]\\d{5,7}|(?:2[0-35]|4[0-4]|5[0-25-9]|7[13-6]|[89]\\d)\\d{5,6})|2(?:[136]\\d{5,7}|(?:2[0-7]|4[0136-8]|5[0138]|7[018]|8[01]|9[0-57])\\d{5,6})|3(?:[356]\\d{5,7}|(?:0[0-4]|1\\d|2[0-25]|4[056]|7[0-2]|8[0-3]|9[023])\\d{5,6})|4(?:[0246]\\d{5,7}|(?:1[013-8]|3[0135]|5[14-79]|7[0-246-9]|8[0156]|9[0-689])\\d{5,6})|5(?:0[0-6]|[15][0-5]|2[0-68]|3[0-4]|4\\d|6[03-5]|7[013]|8[0-79]|9[01])\\d{5,6}|6(?:[03]\\d{5,7}|(?:1[1-3]|2[0-4]|4[02-57]|5[0-37]|6[0-3]|7[0-2]|8[0247]|9[0-356])\\d{5,6})|8\\d{6,8}|9(?:0[1-9]\\d{4,6}|(?:1[0-68]|2\\d|3[02-5]|4[0-3]|5[0-4]|[68][01]|7[0135-8])\\d{5,6})",
          ,,,"8123456",,,[7,8,9]],[,,"7[02369]\\d{7}",,,,"701234567",,,[9]],[,,"20\\d{4,7}",,,,"20123456",,,[6,7,8,9]],[,,"649\\d{6}|9(?:00|39|44)[1-8]\\d{3,6}",,,,"9001234567",,,[7,8,9,10]],[,,"77(?:0\\d{3}(?:\\d{3})?|[1-7]\\d{6})",,,,"771234567",,,[6,9]],[,,"75[1-8]\\d{6}",,,,"751234567",,,[9]],[,,,,,,,,,[-1]],"SE",46,"00","0",,,"0",,,,[[,"(8)(\\d{2,3})(\\d{2,3})(\\d{2})","$1-$2 $3 $4",["8"],"0$1"],[,"([1-69]\\d)(\\d{2,3})(\\d{2})(\\d{2})","$1-$2 $3 $4",["1[013689]|2[0136]|3[1356]|4[0246]|54|6[03]|90"],"0$1"],
          [,"([1-469]\\d)(\\d{3})(\\d{2})","$1-$2 $3",["[12][136]|3[356]|4[0246]|6[03]|90"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1-$2 $3 $4",["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[0-5]|4[0-3])"],"0$1"],[,"(\\d{3})(\\d{2,3})(\\d{2})","$1-$2 $3",["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[0-5]|4[0-3])"],"0$1"],[,"(7\\d)(\\d{3})(\\d{2})(\\d{2})","$1-$2 $3 $4",["7"],"0$1"],[,"(77)(\\d{2})(\\d{2})",
            "$1-$2$3",["77"],"0$1"],[,"(20)(\\d{2,3})(\\d{2})","$1-$2 $3",["20"],"0$1"],[,"(9[034]\\d)(\\d{2})(\\d{2})(\\d{3})","$1-$2 $3 $4",["9[034]"],"0$1"],[,"(9[034]\\d)(\\d{4})","$1-$2",["9[034]"],"0$1"],[,"(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1-$2 $3 $4 $5",["25[245]|67[3-6]"],"0$1"]],[[,"(8)(\\d{2,3})(\\d{2,3})(\\d{2})","$1 $2 $3 $4",["8"]],[,"([1-69]\\d)(\\d{2,3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1[013689]|2[0136]|3[1356]|4[0246]|54|6[03]|90"]],[,"([1-469]\\d)(\\d{3})(\\d{2})","$1 $2 $3",["[12][136]|3[356]|4[0246]|6[03]|90"]],
          [,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[0-5]|4[0-3])"]],[,"(\\d{3})(\\d{2,3})(\\d{2})","$1 $2 $3",["1[2457]|2(?:[247-9]|5[0138])|3[0247-9]|4[1357-9]|5[0-35-9]|6(?:[124-689]|7[0-2])|9(?:[125-8]|3[0-5]|4[0-3])"]],[,"(7\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["7"]],[,"(77)(\\d{2})(\\d{2})","$1 $2 $3",["77"]],[,"(20)(\\d{2,3})(\\d{2})","$1 $2 $3",["20"]],[,"(9[034]\\d)(\\d{2})(\\d{2})(\\d{3})",
            "$1 $2 $3 $4",["9[034]"]],[,"(9[034]\\d)(\\d{4})","$1 $2",["9[034]"]],[,"(\\d{3})(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4 $5",["25[245]|67[3-6]"]]],[,,"74[02-9]\\d{6}",,,,"740123456",,,[9]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,"(?:25[245]|67[3-6])\\d{9}",,,,"254123456789",,,[12]]],SG:[,[,,"[36]\\d{7}|[17-9]\\d{7,10}",,,,,,,[8,10,11]],[,,"6[1-9]\\d{6}",,,,"61234567",,,[8]],[,,"(?:8[1-8]|9[0-8])\\d{6}",,,,"81234567",,,[8]],[,,"1?800\\d{7}",,,,"18001234567",,,[10,11]],[,,"1900\\d{7}",,,,"19001234567",
          ,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"3[12]\\d{6}",,,,"31234567",,,[8]],"SG",65,"0[0-3]\\d",,,,,,,,[[,"([3689]\\d{3})(\\d{4})","$1 $2",["[369]|8[1-9]"]],[,"(1[89]00)(\\d{3})(\\d{4})","$1 $2 $3",["1[89]0","1[89]00"]],[,"(7000)(\\d{4})(\\d{3})","$1 $2 $3",["700","7000"]],[,"(800)(\\d{3})(\\d{4})","$1 $2 $3",["800"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"7000\\d{7}",,,,"70001234567",,,[11]],,,[,,,,,,,,,[-1]]],SH:[,[,,"[256]\\d{4}|8\\d{3}",,,,,,,[4,5]],[,,"2(?:[0-57-9]\\d|6[4-9])\\d{2}",,,,"22158"],
          [,,"[56]\\d{4}",,,,"51234",,,[5]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"262\\d{2}",,,,"26212",,,[5]],"SH",290,"00",,,,,,,,,,[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SI:[,[,,"[1-7]\\d{6,7}|[89]\\d{4,7}",,,,,,,[5,6,7,8]],[,,"(?:1\\d|[25][2-8]|3[24-8]|4[24-8]|7[3-8])\\d{6}",,,,"11234567",,,[8],[7]],[,,"(?:[37][01]\\d|4[0139]\\d|51\\d|6(?:[48]\\d|5[15-7]|9[69]))\\d{5}",,,,"31234567",,,[8]],[,,"80\\d{4,6}",,,,"80123456",,,[6,7,8]],[,,"90\\d{4,6}|89[1-3]\\d{2,5}",
          ,,,"90123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"(?:59|8[1-3])\\d{6}",,,,"59012345",,,[8]],"SI",386,"00","0",,,"0",,,,[[,"(\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[12]|[34][24-8]|5[2-8]|7[3-8]"],"(0$1)"],[,"([3-7]\\d)(\\d{3})(\\d{3})","$1 $2 $3",["[37][01]|4[0139]|51|6"],"0$1"],[,"([89][09])(\\d{3,6})","$1 $2",["[89][09]"],"0$1"],[,"([58]\\d{2})(\\d{5})","$1 $2",["59|8[1-3]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SJ:[,[,,"0\\d{4}|[45789]\\d{7}",,,,,
          ,,[5,8]],[,,"79\\d{6}",,,,"79123456",,,[8]],[,,"(?:4[015-8]|5[89]|9\\d)\\d{6}",,,,"41234567",,,[8]],[,,"80[01]\\d{5}",,,,"80012345",,,[8]],[,,"82[09]\\d{5}",,,,"82012345",,,[8]],[,,"810(?:0[0-6]|[2-8]\\d)\\d{3}",,,,"81021234",,,[8]],[,,"880\\d{5}",,,,"88012345",,,[8]],[,,"85[0-5]\\d{5}",,,,"85012345",,,[8]],"SJ",47,"00",,,,,,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"0\\d{4}|81(?:0(?:0[7-9]|1\\d)|5\\d{2})\\d{3}",,,,"01234"],,,[,,"81[23]\\d{5}",,,,"81212345",,,[8]]],SK:[,[,,"(?:[2-68]\\d{5,8}|9\\d{6,8})",
          ,,,,,,[6,7,9]],[,,"2(?:1(?:6\\d{3,4}|7\\d{3})|[2-9]\\d{7})|[3-5][1-8](?:1(?:6\\d{2,3}|7\\d{3})|\\d{7})",,,,"221234567"],[,,"9(?:0(?:[1-8]\\d|9[1-9])|(?:1[0-24-9]|[45]\\d)\\d)\\d{5}",,,,"912123456",,,[9]],[,,"800\\d{6}",,,,"800123456",,,[9]],[,,"9(?:[78]\\d{7}|00\\d{6})",,,,"900123456",,,[9]],[,,"8[5-9]\\d{7}",,,,"850123456",,,[9]],[,,,,,,,,,[-1]],[,,"6(?:02|5[0-4]|9[0-6])\\d{6}",,,,"690123456",,,[9]],"SK",421,"00","0",,,"0",,,,[[,"(2)(1[67])(\\d{3,4})","$1 $2 $3",["21[67]"],"0$1"],[,"([3-5]\\d)(\\d{2})(\\d{2,3})",
          "$1 $2 $3",["[3-5]"],"0$1"],[,"(2)(\\d{3})(\\d{3})(\\d{2})","$1/$2 $3 $4",["2"],"0$1"],[,"([3-5]\\d)(\\d{3})(\\d{2})(\\d{2})","$1/$2 $3 $4",["[3-5]"],"0$1"],[,"([689]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[689]"],"0$1"],[,"(9090)(\\d{3})","$1 $2",["909","9090"],"0$1"]],,[,,"9090\\d{3}",,,,"9090123",,,[7]],,,[,,"(?:602|8(?:00|[5-9]\\d)|9(?:00|[78]\\d))\\d{6}|9090\\d{3}",,,,"800123456",,,[7,9]],[,,"96\\d{7}",,,,"961234567",,,[9]],,,[,,,,,,,,,[-1]]],SL:[,[,,"[2-9]\\d{7}",,,,,,,[8],[6]],[,,"[235]2[2-4][2-9]\\d{4}",
          ,,,"22221234",,,,[6]],[,,"(?:2[15]|3[013-5]|4[04]|5[05]|66|7[5-9]|8[08]|99)\\d{6}",,,,"25123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SL",232,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{6})","$1 $2",,"(0$1)"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SM:[,[,,"[05-7]\\d{7,9}",,,,,,,[8,10],[6]],[,,"0549(?:8[0157-9]|9\\d)\\d{4}",,,,"0549886377",,,[10],[6]],[,,"6[16]\\d{6}",,,,"66661212",,,[8]],[,,,,,,,,,[-1]],[,,"7[178]\\d{6}",,,,"71123456",
          ,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"5[158]\\d{6}",,,,"58001110",,,[8]],"SM",378,"00",,,,"([89]\\d{5})","0549$1",,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-7]"]],[,"(0549)(\\d{6})","$1 $2",["054","0549"]],[,"(\\d{6})","0549 $1",["[89]"]]],[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[5-7]"]],[,"(0549)(\\d{6})","($1) $2",["054","0549"]],[,"(\\d{6})","(0549) $1",["[89]"]]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SN:[,[,,"[3789]\\d{8}",,,,,
          ,,[9]],[,,"3(?:0(?:1[0-2]|80)|282|3(?:8[1-9]|9[3-9])|611)\\d{5}",,,,"301012345"],[,,"7(?:[06-8]\\d|21|90)\\d{6}",,,,"701234567"],[,,"800\\d{6}",,,,"800123456"],[,,"88[4689]\\d{6}",,,,"884123456"],[,,"81[02468]\\d{6}",,,,"810123456"],[,,,,,,,,,[-1]],[,,"39[01]\\d{6}|3392\\d{5}|93330\\d{4}",,,,"933301234"],"SN",221,"00",,,,,,,,[[,"(\\d{2})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[379]"]],[,"(\\d{3})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,
          ,[,,,,,,,,,[-1]]],SO:[,[,,"[1-9]\\d{5,8}",,,,,,,[6,7,8,9]],[,,"(?:1\\d{1,2}|2[0-79]\\d|3[0-46-8]?\\d|4[0-7]?\\d|59\\d|8[125])\\d{4}",,,,"4012345",,,[6,7]],[,,"(?:15\\d|2(?:4\\d|8)|3[59]\\d{2}|4[89]\\d{2}|6[1-9]?\\d{2}|7(?:[1-8]\\d|9\\d{1,2})|8[08]\\d{2}|9(?:0[67]|[2-9])\\d)\\d{5}",,,,"71123456",,,[7,8,9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SO",252,"00","0",,,"0",,,,[[,"(\\d{6})","$1",["[134]"]],[,"(\\d)(\\d{6})","$1 $2",["[13-5]|2[0-79]"]],[,"(\\d)(\\d{7})",
          "$1 $2",["24|[67]"]],[,"(\\d{2})(\\d{4})","$1 $2",["8[125]"]],[,"(\\d{2})(\\d{5,7})","$1 $2",["15|28|6[1-35-9]|799|9[2-9]"]],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["3[59]|4[89]|6[24-6]|79|8[08]|90"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SR:[,[,,"[2-8]\\d{5,6}",,,,,,,[6,7]],[,,"(?:2[1-3]|3[0-7]|4\\d|5[2-58]|68\\d)\\d{4}",,,,"211234"],[,,"(?:7[124-7]|8[125-9])\\d{5}",,,,"7412345",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"56\\d{4}",
          ,,,"561234",,,[6]],"SR",597,"00",,,,,,,,[[,"(\\d{3})(\\d{3})","$1-$2",["[2-4]|5[2-58]"]],[,"(\\d{2})(\\d{2})(\\d{2})","$1-$2-$3",["56"]],[,"(\\d{3})(\\d{4})","$1-$2",["[6-8]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SS:[,[,,"[19]\\d{8}",,,,,,,[9]],[,,"18\\d{7}",,,,"181234567"],[,,"(?:12|9[1257])\\d{7}",,,,"977123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SS",211,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",,
          "0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],ST:[,[,,"[29]\\d{6}",,,,,,,[7]],[,,"22\\d{5}",,,,"2221234"],[,,"9(?:0(?:0[5-9]|[1-9]\\d)|[89]\\d{2})\\d{3}",,,,"9812345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"ST",239,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SV:[,[,,"[267]\\d{7}|[89]\\d{6}(?:\\d{4})?",,,,,,,[7,8,11]],[,,"2[1-6]\\d{6}",,,,"21234567",,,[8]],
          [,,"[67]\\d{7}",,,,"70123456",,,[8]],[,,"800\\d{4}(?:\\d{4})?",,,,"8001234",,,[7,11]],[,,"900\\d{4}(?:\\d{4})?",,,,"9001234",,,[7,11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SV",503,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[267]"]],[,"(\\d{3})(\\d{4})","$1 $2",["[89]"]],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["[89]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SX:[,[,,"[5789]\\d{9}",,,,,,,[10],[7]],[,,"7215(?:4[2-8]|8[239]|9[056])\\d{4}",,,,"7215425678",,
          ,,[7]],[,,"7215(?:1[02]|2\\d|5[034679]|8[014-8])\\d{4}",,,,"7215205678",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002123456"],[,,"900[2-9]\\d{6}",,,,"9002123456"],[,,,,,,,,,[-1]],[,,"5(?:(?:00|22|33|44|66|77|88)[2-9]|21[23])\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"SX",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"721",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SY:[,[,,"[1-59]\\d{7,8}",,,,,,,[8,9],[6,7]],[,,"(?:1(?:1\\d?|4\\d|[2356])|2(?:1\\d?|[235])|3(?:[13]\\d|4)|4[13]|5[1-3])\\d{6}",
          ,,,"112345678",,,,[6,7]],[,,"9(?:22|[3-589]\\d|6[024-9])\\d{6}",,,,"944567890",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"SY",963,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3,4})","$1 $2 $3",["[1-5]"],"0$1",,1],[,"(9\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["9"],"0$1",,1]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],SZ:[,[,,"[0237]\\d{7}|900\\d{6}",,,,,,,[8,9]],[,,"[23][2-5]\\d{6}",,,,"22171234",,,[8]],[,,"7[6-9]\\d{6}",,,,"76123456",
          ,,[8]],[,,"0800\\d{4}",,,,"08001234",,,[8]],[,,"900\\d{6}",,,,"900012345",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"70\\d{6}",,,,"70012345",,,[8]],"SZ",268,"00",,,,,,,,[[,"(\\d{4})(\\d{4})","$1 $2",["[0237]"]],[,"(\\d{5})(\\d{4})","$1 $2",["900"]]],,[,,,,,,,,,[-1]],,,[,,"0800\\d{4}",,,,"08001234",,,[8]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TA:[,[,,"8\\d{3}",,,,,,,[4]],[,,"8\\d{3}",,,,"8999"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TA",290,"00",
          ,,,,,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TC:[,[,,"[5689]\\d{9}",,,,,,,[10],[7]],[,,"649(?:712|9(?:4\\d|50))\\d{4}",,,,"6497121234",,,,[7]],[,,"649(?:2(?:3[129]|4[1-7])|3(?:3[1-389]|4[1-8])|4[34][1-3])\\d{4}",,,,"6492311234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"5(?:(?:00|22|33|44|66|77|88)[2-9]|21[23])\\d{6}",,,,"5002345678"],[,,"64971[01]\\d{4}",,,,"6497101234",,,,[7]],"TC",
          1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"649",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TD:[,[,,"[2679]\\d{7}",,,,,,,[8]],[,,"22(?:[3789]0|5[0-5]|6[89])\\d{4}",,,,"22501234"],[,,"(?:6[023568]\\d|77\\d|9\\d{2})\\d{5}",,,,"63012345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TD",235,"00|16",,,,,,"00",,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TG:[,[,,"[279]\\d{7}",,,,,,,
          [8]],[,,"2(?:2[2-7]|3[23]|4[45]|55|6[67]|77)\\d{5}",,,,"22212345"],[,,"(?:7[09]|9[0-36-9])\\d{6}",,,,"90112345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TG",228,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[279]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TH:[,[,,"1\\d{8,9}|[2-9]\\d{7,8}",,,,,,,[8,9,10]],[,,"(?:2\\d|3[2-9]|4[2-5]|5[2-6]|7[3-7])\\d{6}",,,,"21234567",,,[8]],[,,"(?:14|6[1-6]|[89]\\d)\\d{7}",,
          ,,"812345678",,,[9]],[,,"1800\\d{6}",,,,"1800123456",,,[10]],[,,"1900\\d{6}",,,,"1900123456",,,[10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"6[08]\\d{7}",,,,"601234567",,,[9]],"TH",66,"00[1-9]","0",,,"0",,,,[[,"(2)(\\d{3})(\\d{4})","$1 $2 $3",["2"],"0$1"],[,"([13-9]\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["14|[3-9]"],"0$1"],[,"(1[89]00)(\\d{3})(\\d{3})","$1 $2 $3",["1[89]0","1[89]00"],"$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TJ:[,[,,"[3-57-9]\\d{8}",,,,,,,[9],[3,5,7]],[,
          ,"(?:3(?:1[3-5]|2[245]|3[12]|4[24-7]|5[25]|72)|4(?:46|74|87))\\d{6}",,,,"372123456",,,,[3,5,7]],[,,"(?:41[18]|(?:5[05]|77|88|9[0-35-9])\\d)\\d{6}",,,,"917123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TJ",992,"810","8",,,"8",,"8~10",,[[,"([349]\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["[34]7|91[78]"],,,1],[,"([457-9]\\d)(\\d{3})(\\d{4})","$1 $2 $3",["4[148]|[578]|9(?:[0235-9]|1[59])"],,,1],[,"(331700)(\\d)(\\d{2})","$1 $2 $3",["331","3317","33170","331700"],,
          ,1],[,"(\\d{4})(\\d)(\\d{4})","$1 $2 $3",["3[1-5]","3(?:[1245]|3(?:[02-9]|1[0-589]))"],,,1]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TK:[,[,,"[2-47]\\d{3,6}",,,,,,,[4,5,6,7]],[,,"(?:2[2-4]|[34]\\d)\\d{2,5}",,,,"3101"],[,,"7[2-4]\\d{2,5}",,,,"7290"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TK",690,"00",,,,,,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TL:[,[,,"[2-489]\\d{6}|7\\d{6,7}",,,,,,,[7,8]],[,,
          "(?:2[1-5]|3[1-9]|4[1-4])\\d{5}",,,,"2112345",,,[7]],[,,"7[3-8]\\d{6}",,,,"77212345",,,[8]],[,,"80\\d{5}",,,,"8012345",,,[7]],[,,"90\\d{5}",,,,"9012345",,,[7]],[,,,,,,,,,[-1]],[,,"70\\d{5}",,,,"7012345",,,[7]],[,,,,,,,,,[-1]],"TL",670,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[2-489]|70"]],[,"(\\d{4})(\\d{4})","$1 $2",["7[3-8]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TM:[,[,,"[1-6]\\d{7}",,,,,,,[8]],[,,"(?:1(?:2\\d|3[1-9])|2(?:22|4[0-35-8])|3(?:22|4[03-9])|4(?:22|3[128]|4\\d|6[15])|5(?:22|5[7-9]|6[014-689]))\\d{5}",
          ,,,"12345678"],[,,"6[1-9]\\d{6}",,,,"66123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TM",993,"810","8",,,"8",,"8~10",,[[,"(\\d{2})(\\d{2})(\\d{2})(\\d{2})","$1 $2-$3-$4",["12"],"(8 $1)"],[,"(\\d{2})(\\d{6})","$1 $2",["6"],"8 $1"],[,"(\\d{3})(\\d)(\\d{2})(\\d{2})","$1 $2-$3-$4",["13|[2-5]"],"(8 $1)"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TN:[,[,,"[2-57-9]\\d{7}",,,,,,,[8]],[,,"(?:3[0-2]\\d{3}|7\\d{4}|81200)\\d{3}",,,,"71234567"],
          [,,"(?:[259]\\d{3}|3(?:001|1(?:[1-35]\\d|40)|240|6[0-4]\\d|91\\d)|4[0-6]\\d{2})\\d{4}",,,,"20123456"],[,,"8010\\d{4}",,,,"80101234"],[,,"88\\d{6}",,,,"88123456"],[,,"8[12]10\\d{4}",,,,"81101234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TN",216,"00",,,,,,,,[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TO:[,[,,"[02-8]\\d{4,6}",,,,,,,[5,7]],[,,"(?:2\\d|3[1-8]|4[1-4]|[56]0|7[0149]|8[05])\\d{3}",,,,"20123",,,[5]],[,,"(?:7[578]|8[46-9])\\d{5}",
          ,,,"7715123",,,[7]],[,,"0800\\d{3}",,,,"0800222",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TO",676,"00",,,,,,,,[[,"(\\d{2})(\\d{3})","$1-$2",["[1-6]|7[0-4]|8[05]"]],[,"(\\d{3})(\\d{4})","$1 $2",["7[5-9]|8[46-9]"]],[,"(\\d{4})(\\d{3})","$1 $2",["0"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TR:[,[,,"[2-589]\\d{9}|444\\d{4}",,,,,,,[7,10]],[,,"(?:2(?:[13][26]|[28][2468]|[45][268]|[67][246])|3(?:[13][28]|[24-6][2468]|[78][02468]|92)|4(?:[16][246]|[23578][2468]|4[26]))\\d{7}",
          ,,,"2123456789",,,[10]],[,,"5(?:(?:0[15-7]|1[06]|24|[34]\\d|5[1-59]|9[46])\\d{2}|6161)\\d{5}",,,,"5012345678",,,[10]],[,,"800\\d{7}",,,,"8001234567",,,[10]],[,,"(?:8[89]8|900)\\d{7}",,,,"9001234567",,,[10]],[,,,,,,,,,[-1]],[,,"592(?:21[12]|461)\\d{4}",,,,"5922121234",,,[10]],[,,,,,,,,,[-1]],"TR",90,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[23]|4(?:[0-35-9]|4[0-35-9])"],"(0$1)",,1],[,"(\\d{3})(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["5(?:[02-69]|1[06])"],"0$1",,1],[,
          "(\\d{3})(\\d{3})(\\d{4})","$1 $2 $3",["51|[89]"],"0$1",,1],[,"(444)(\\d{1})(\\d{3})","$1 $2 $3",["444"],,,1]],,[,,"512\\d{7}",,,,"5123456789",,,[10]],,,[,,"444\\d{4}",,,,"4441444",,,[7]],[,,"444\\d{4}|850\\d{7}",,,,"4441444"],,,[,,,,,,,,,[-1]]],TT:[,[,,"[589]\\d{9}",,,,,,,[10],[7]],[,,"868(?:2(?:01|[23]\\d)|6(?:0[7-9]|1[02-8]|2[1-9]|[3-69]\\d|7[0-79])|82[124])\\d{4}",,,,"8682211234",,,,[7]],[,,"868(?:2(?:6[6-9]|[789]\\d)|3(?:0[1-9]|1[02-9]|[2-9]\\d)|4[6-9]\\d|6(?:20|78|8\\d)|7(?:0[1-9]|1[02-9]|[2-9]\\d))\\d{4}",
          ,,,"8682911234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"5(?:(?:00|22|33|44|66|77|88)[2-9]|21[23])\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"TT",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"868",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,"868619\\d{4}",,,,"8686191234",,,,[7]]],TV:[,[,,"[279]\\d{4,6}",,,,,,,[5,6,7]],[,,"2[02-9]\\d{3}",,,,"20123",,,[5]],[,,"(?:7[01]\\d|90)\\d{4}",,,,"901234",,,[6,7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],
          [,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"TV",688,"00",,,,,,,,,,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],TW:[,[,,"2\\d{6,8}|[3-689]\\d{7,8}|7\\d{7,9}",,,,,,,[7,8,9,10]],[,,"(?:2(?:[235-8]\\d{3}|4\\d{2,3})|3[2-9]\\d{2}|4(?:[239]\\d|[78])\\d{2}|5[2-8]\\d{2}|6[235-79]\\d{2}|7[1-9]\\d{2}|8(?:2(?:3\\d|66)|[7-9]\\d{2}))\\d{4}",,,,"221234567",,,[8,9]],[,,"9[0-8]\\d{7}",,,,"912345678",,,[9]],[,,"80[0-79]\\d{6}",,,,"800123456",,,[9]],[,,"20(?:2|[013-9]\\d{2})\\d{4}",,,,"203123456",
          ,,[7,9]],[,,,,,,,,,[-1]],[,,"99\\d{7}",,,,"990123456",,,[9]],[,,"70\\d{8}",,,,"7012345678",,,[10]],"TW",886,"0(?:0[25679]|19)","0","#",,"0",,,,[[,"(20)(\\d)(\\d{4})","$1 $2 $3",["202"],"0$1"],[,"([258]0)(\\d{3})(\\d{4})","$1 $2 $3",["20[013-9]|50[0-46-9]|80[0-79]"],"0$1"],[,"([2-8])(\\d{3,4})(\\d{4})","$1 $2 $3",["[25][2-8]|[346]|[78][1-9]"],"0$1"],[,"(9\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["9"],"0$1"],[,"(70)(\\d{4})(\\d{4})","$1 $2 $3",["70"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"50[0-46-9]\\d{6}",
          ,,,"500123456",,,[9]],,,[,,,,,,,,,[-1]]],TZ:[,[,,"\\d{9}",,,,,,,[7,9]],[,,"2[2-8]\\d{7}",,,,"222345678"],[,,"(?:6[2-9]|7[13-9])\\d{7}",,,,"621234567",,,[9]],[,,"80[08]\\d{6}",,,,"800123456",,,[9]],[,,"90\\d{7}",,,,"900123456",,,[9]],[,,"8(?:40|6[01])\\d{6}",,,,"840123456",,,[9]],[,,,,,,,,,[-1]],[,,"41\\d{7}",,,,"412345678",,,[9]],"TZ",255,"00[056]","0",,,"0",,,,[[,"([24]\\d)(\\d{3})(\\d{4})","$1 $2 $3",["[24]"],"0$1"],[,"([67]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[67]"],"0$1"],[,"([89]\\d{2})(\\d{2})(\\d{4})",
          "$1 $2 $3",["[89]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,"(?:8(?:[04]0|6[01])|90\\d)\\d{6}",,,,"800123456",,,[9]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],UA:[,[,,"[3-9]\\d{8}",,,,,,,[9],[5,6,7]],[,,"(?:3[1-8]|4[13-8]|5[1-7]|6[12459])\\d{7}",,,,"311234567",,,,[5,6,7]],[,,"(?:39|50|6[36-8]|7[1-3]|9[1-9])\\d{7}",,,,"391234567"],[,,"800\\d{6}",,,,"800123456"],[,,"900[2-49]\\d{5}",,,,"900212345"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"89[1-579]\\d{6}",,,,"891234567"],"UA",380,"00","0",,,"0",,"0~0",,[[,"([3-9]\\d)(\\d{3})(\\d{4})",
          "$1 $2 $3",["[38]9|4(?:[45][0-5]|87)|5(?:0|[67][37])|6[36-8]|7|9[1-9]","[38]9|4(?:[45][0-5]|87)|5(?:0|6(?:3[14-7]|7)|7[37])|6[36-8]|7|9[1-9]"],"0$1"],[,"([3-689]\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["(?:3[1-8]|4[136-8])2|5(?:[12457]2|6[24])|6(?:[12][29]|[49]2|5[24])|8[0-8]|90","3(?:[1-46-8]2[013-9]|52)|4(?:[1378]2|62[013-9])|5(?:[12457]2|6[24])|6(?:[12][29]|[49]2|5[24])|8[0-8]|90"],"0$1"],[,"([3-6]\\d{3})(\\d{5})","$1 $2",["3(?:[1-46-8]|5[013-9])|4(?:[137][013-9]|[45][6-9]|6|8[4-6])|5(?:[1245][013-9]|3|6[0135689]|7[4-6])|6(?:[12][13-8]|[49][013-9]|5[0135-9])",
          "3(?:[1-46-8](?:[013-9]|22)|5[013-9])|4(?:[137][013-9]|[45][6-9]|6(?:[013-9]|22)|8[4-6])|5(?:[1245][013-9]|3|6(?:[015689]|3[02389])|7[4-6])|6(?:[12][13-8]|[49][013-9]|5[0135-9])"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],UG:[,[,,"\\d{9}",,,,,,,[9],[5,6,7]],[,,"20(?:[0147]\\d{3}|2(?:40|[5-9]\\d)\\d|3(?:0[0-4]|[2367]\\d)\\d|5[0-4]\\d{2}|6(?:00[0-2]|30[0-4]|[5-9]\\d{2})|8[0-2]\\d{2})\\d{3}|[34]\\d{8}",,,,"312345678",,,,[5,6,7]],[,,"7(?:[09][0-7]\\d|[1578]\\d{2}|2(?:[03]\\d|60)|30\\d|4[0-4]\\d)\\d{5}",
          ,,,"712345678"],[,,"800[123]\\d{5}",,,,"800123456"],[,,"90[123]\\d{6}",,,,"901123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"UG",256,"00[057]","0",,,"0",,,,[[,"(\\d{3})(\\d{6})","$1 $2",["20[0-8]|4(?:6[45]|[7-9])|[7-9]","20(?:[013-8]|2[5-9])|4(?:6[45]|[7-9])|[7-9]"],"0$1"],[,"(\\d{2})(\\d{7})","$1 $2",["3|4(?:[1-5]|6[0-36-9])"],"0$1"],[,"(2024)(\\d{5})","$1 $2",["202","2024"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],US:[,[,,"[2-9]\\d{9}",,,,,,,[10],
          [7]],[,,"(?:2(?:0[1-35-9]|1[02-9]|2[03-589]|3[149]|4[08]|5[1-46]|6[0279]|7[0269]|8[13])|3(?:0[1-57-9]|1[02-9]|2[0135]|3[0-24679]|4[67]|5[12]|6[014]|8[056])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[0235]|58|6[39]|7[0589]|8[04])|5(?:0[1-57-9]|1[0235-8]|20|3[0149]|4[01]|5[19]|6[1-47]|7[013-5]|8[056])|6(?:0[1-35-9]|1[024-9]|2[03689]|3[016]|4[16]|5[017]|6[0-279]|78|8[012])|7(?:0[1-46-8]|1[02-9]|2[04-7]|3[1247]|4[037]|5[47]|6[02359]|7[02-59]|8[156])|8(?:0[1-68]|1[02-8]|2[08]|3[0-258]|4[3578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[014678]|4[0179]|5[12469]|7[0-3589]|8[04-69]))[2-9]\\d{6}",
          ,,,"2015550123",,,,[7]],[,,"(?:2(?:0[1-35-9]|1[02-9]|2[03-589]|3[149]|4[08]|5[1-46]|6[0279]|7[0269]|8[13])|3(?:0[1-57-9]|1[02-9]|2[0135]|3[0-24679]|4[67]|5[12]|6[014]|8[056])|4(?:0[124-9]|1[02-579]|2[3-5]|3[0245]|4[0235]|58|6[39]|7[0589]|8[04])|5(?:0[1-57-9]|1[0235-8]|20|3[0149]|4[01]|5[19]|6[1-47]|7[013-5]|8[056])|6(?:0[1-35-9]|1[024-9]|2[03689]|3[016]|4[16]|5[017]|6[0-279]|78|8[012])|7(?:0[1-46-8]|1[02-9]|2[04-7]|3[1247]|4[037]|5[47]|6[02359]|7[02-59]|8[156])|8(?:0[1-68]|1[02-8]|2[08]|3[0-258]|4[3578]|5[046-9]|6[02-5]|7[028])|9(?:0[1346-9]|1[02-9]|2[0589]|3[014678]|4[0179]|5[12469]|7[0-3589]|8[04-69]))[2-9]\\d{6}",
          ,,,"2015550123",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"5(?:(?:00|22|33|44|66|77|88)[2-9]|21[23])\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"US",1,"011","1",,,"1",,,1,[[,"(\\d{3})(\\d{4})","$1-$2",,,,1],[,"(\\d{3})(\\d{3})(\\d{4})","($1) $2-$3",,,,1]],[[,"(\\d{3})(\\d{3})(\\d{4})","$1-$2-$3"]],[,,,,,,,,,[-1]],1,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],UY:[,[,,"[2489]\\d{6,7}",,,,,,,[7,8]],[,,"2\\d{7}|4[2-7]\\d{6}",
          ,,,"21231234",,,[8],[7]],[,,"9[1-9]\\d{6}",,,,"94231234",,,[8]],[,,"80[05]\\d{4}",,,,"8001234",,,[7]],[,,"90[0-8]\\d{4}",,,,"9001234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"UY",598,"0(?:1[3-9]\\d|0)","0"," int. ",,"0",,"00",,[[,"(\\d{4})(\\d{4})","$1 $2",["[24]"]],[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["9[1-9]"],"0$1"],[,"(\\d{3})(\\d{4})","$1 $2",["[89]0"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],UZ:[,[,,"[679]\\d{8}",,,,,,,[9],[7]],[,,"(?:6(?:1(?:22|3[124]|4[1-4]|5[123578]|64)|2(?:22|3[0-57-9]|41)|5(?:22|3[3-7]|5[024-8])|6\\d{2}|7(?:[23]\\d|7[69])|9(?:22|4[1-8]|6[135]))|7(?:0(?:5[4-9]|6[0146]|7[12456]|9[135-8])|1[12]\\d|2(?:22|3[1345789]|4[123579]|5[14])|3(?:2\\d|3[1578]|4[1-35-7]|5[1-57]|61)|4(?:2\\d|3[1-579]|7[1-79])|5(?:22|5[1-9]|6[1457])|6(?:22|3[12457]|4[13-8])|9(?:22|5[1-9])))\\d{5}",
          ,,,"662345678",,,,[7]],[,,"6(?:1(?:2(?:98|2[01])|35[0-4]|50\\d|61[23]|7(?:[01][017]|4\\d|55|9[5-9]))|2(?:11\\d|2(?:[12]1|9[01379])|5(?:[126]\\d|3[0-4])|7\\d{2})|5(?:19[01]|2(?:27|9[26])|30\\d|59\\d|7\\d{2})|6(?:2(?:1[5-9]|2[0367]|38|41|52|60)|3[79]\\d|4(?:56|83)|7(?:[07]\\d|1[017]|3[07]|4[047]|5[057]|67|8[0178]|9[79])|9[0-3]\\d)|7(?:2(?:24|3[237]|4[5-9]|7[15-8])|5(?:7[12]|8[0589])|7(?:0\\d|[39][07])|9(?:0\\d|7[079]))|9(?:2(?:1[1267]|5\\d|3[01]|7[0-4])|5[67]\\d|6(?:2[0-26]|8\\d)|7\\d{2}))\\d{4}|7(?:0\\d{3}|1(?:13[01]|6(?:0[47]|1[67]|66)|71[3-69]|98\\d)|2(?:2(?:2[79]|95)|3(?:2[5-9]|6[0-6])|57\\d|7(?:0\\d|1[17]|2[27]|3[37]|44|5[057]|66|88))|3(?:2(?:1[0-6]|21|3[469]|7[159])|33\\d|5(?:0[0-4]|5[579]|9\\d)|7(?:[0-3579]\\d|4[0467]|6[67]|8[078])|9[4-6]\\d)|4(?:2(?:29|5[0257]|6[0-7]|7[1-57])|5(?:1[0-4]|8\\d|9[5-9])|7(?:0\\d|1[024589]|2[0127]|3[0137]|[46][07]|5[01]|7[5-9]|9[079])|9(?:7[015-9]|[89]\\d))|5(?:112|2(?:0\\d|2[29]|[49]4)|3[1568]\\d|52[6-9]|7(?:0[01578]|1[017]|[23]7|4[047]|[5-7]\\d|8[78]|9[079]))|6(?:2(?:2[1245]|4[2-4])|39\\d|41[179]|5(?:[349]\\d|5[0-2])|7(?:0[017]|[13]\\d|22|44|55|67|88))|9(?:22[128]|3(?:2[0-4]|7\\d)|57[05629]|7(?:2[05-9]|3[37]|4\\d|60|7[2579]|87|9[07])))\\d{4}|9[0-57-9]\\d{7}",
          ,,,"912345678"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"UZ",998,"810","8",,,"8",,"8~10",,[[,"([679]\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["[679]"],"8 $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],VA:[,[,,"(?:0(?:878\\d{5}|6698\\d{5})|[1589]\\d{5,10}|3(?:[12457-9]\\d{8}|[36]\\d{7,9}))",,,,,,,[6,8,9,10,11]],[,,"06698\\d{5}",,,,"0669812345",,,[10]],[,,"3(?:[12457-9]\\d{8}|6\\d{7,8}|3\\d{7,9})",,,,"3123456789",,,[9,10,11]],[,
          ,"80(?:0\\d{6}|3\\d{3})",,,,"800123456",,,[6,9]],[,,"0878\\d{5}|1(?:44|6[346])\\d{6}|89(?:2\\d{3}|4(?:[0-4]\\d{2}|[5-9]\\d{4})|5(?:[0-4]\\d{2}|[5-9]\\d{6})|9\\d{6})",,,,"899123456",,,[6,8,9,10]],[,,"84(?:[08]\\d{6}|[17]\\d{3})",,,,"848123456",,,[6,9]],[,,"1(?:78\\d|99)\\d{6}",,,,"1781234567",,,[9,10]],[,,"55\\d{8}",,,,"5512345678",,,[10]],"VA",39,"00",,,,,,,,,,[,,,,,,,,,[-1]],,,[,,"848\\d{6}",,,,"848123456",,,[9]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],VC:[,[,,"[5789]\\d{9}",,,,,,,[10],[7]],[,,"784(?:266|3(?:6[6-9]|7\\d|8[0-24-6])|4(?:38|5[0-36-8]|8[0-8])|5(?:55|7[0-2]|93)|638|784)\\d{4}",
          ,,,"7842661234",,,,[7]],[,,"784(?:4(?:3[0-5]|5[45]|89|9[0-8])|5(?:2[6-9]|3[0-4]))\\d{4}",,,,"7844301234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"5(?:(?:00|22|33|44|66|77|88)[2-9]|21[23])\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"VC",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"784",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],VE:[,[,,"[24589]\\d{9}",,,,,,,[10],[7]],[,,"(?:2(?:12|3[457-9]|[58][1-9]|[467]\\d|9[1-6])|50[01])\\d{7}",
          ,,,"2121234567",,,,[7]],[,,"4(?:1[24-8]|2[46])\\d{7}",,,,"4121234567"],[,,"800\\d{7}",,,,"8001234567"],[,,"900\\d{7}",,,,"9001234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"VE",58,"00","0",,,"0",,,,[[,"(\\d{3})(\\d{7})","$1-$2",,"0$1","$CC $1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],VG:[,[,,"[2589]\\d{9}",,,,,,,[10],[7]],[,,"284(?:(?:229|4(?:22|9[45])|774|8(?:52|6[459]))\\d{4}|496[0-5]\\d{3})",,,,"2842291234",,,,[7]],[,,"284(?:(?:3(?:0[0-3]|4[0-7]|68|9[34])|4(?:4[0-6]|68|99)|54[0-57])\\d{4}|496[6-9]\\d{3})",
          ,,,"2843001234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"5(?:(?:00|22|33|44|66|77|88)[2-9]|21[23])\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"VG",1,"011","1",,,"1",,,,,,[,,,,,,,,,[-1]],,"284",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],VI:[,[,,"[3589]\\d{9}",,,,,,,[10],[7]],[,,"340(?:2(?:01|2[0678]|44|77)|3(?:32|44)|4(?:22|7[34])|5(?:1[34]|55)|6(?:26|4[23]|77|9[023])|7(?:1[2-57-9]|27|7\\d)|884|998)\\d{4}",,,,"3406421234",
          ,,,[7]],[,,"340(?:2(?:01|2[0678]|44|77)|3(?:32|44)|4(?:22|7[34])|5(?:1[34]|55)|6(?:26|4[23]|77|9[023])|7(?:1[2-57-9]|27|7\\d)|884|998)\\d{4}",,,,"3406421234",,,,[7]],[,,"8(?:00|33|44|55|66|77|88)[2-9]\\d{6}",,,,"8002345678"],[,,"900[2-9]\\d{6}",,,,"9002345678"],[,,,,,,,,,[-1]],[,,"5(?:(?:00|22|33|44|66|77|88)[2-9]|21[23])\\d{6}",,,,"5002345678"],[,,,,,,,,,[-1]],"VI",1,"011","1",,,"1",,,1,,,[,,,,,,,,,[-1]],,"340",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],VN:[,[,,"1\\d{6,9}|2\\d{9}|6\\d{6,7}|7\\d{6}|8\\d{6,8}|9\\d{8}",
          ,,,,,,[7,8,9,10]],[,,"2(?:0[3-9]|1[0-689]|2[0-25-9]|3[2-9]|4[2-8]|5[124-9]|6[0-39]|7[0-7]|8[2-7]|9[0-4679])\\d{7}",,,,"2101234567",,,[10]],[,,"(?:9\\d|1(?:2\\d|6[2-9]|8[68]|99))\\d{7}|8(?:6[89]|8\\d|9[89])\\d{6}",,,,"912345678",,,[9,10]],[,,"1800\\d{4,6}",,,,"1800123456",,,[8,9,10]],[,,"1900\\d{4,6}",,,,"1900123456",,,[8,9,10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"VN",84,"00","0",,,"0",,,,[[,"([17]99)(\\d{4})","$1 $2",["[17]99"],"0$1",,1],[,"(\\d{2})(\\d{4})(\\d{4})","$1 $2 $3",["2[48]"],
          "0$1",,1],[,"(80)(\\d{5})","$1 $2",["80"],"0$1",,1],[,"(69\\d)(\\d{4,5})","$1 $2",["69"],"0$1",,1],[,"(\\d{3})(\\d{4})(\\d{3})","$1 $2 $3",["2[0-35-79]"],"0$1",,1],[,"([89]\\d)(\\d{3})(\\d{2})(\\d{2})","$1 $2 $3 $4",["8(?:8|9[89])|9"],"0$1",,1],[,"(1[2689]\\d)(\\d{3})(\\d{4})","$1 $2 $3",["1(?:[26]|8[68]|99)"],"0$1",,1],[,"(86[89])(\\d{3})(\\d{3})","$1 $2 $3",["86[89]"],"0$1",,1],[,"(1[89]00)(\\d{4,6})","$1 $2",["1[89]0","1[89]00"],"$1",,1]],,[,,,,,,,,,[-1]],,,[,,"[17]99\\d{4}|69\\d{5,6}",,,,"1992000",
          ,,[7,8]],[,,"[17]99\\d{4}|69\\d{5,6}|80\\d{5}",,,,"1992000",,,[7,8]],,,[,,,,,,,,,[-1]]],VU:[,[,,"[2-57-9]\\d{4,6}",,,,,,,[5,7]],[,,"(?:2[02-9]\\d|3(?:[5-7]\\d|8[0-8])|48[4-9]|88\\d)\\d{2}",,,,"22123",,,[5]],[,,"(?:5(?:7[2-5]|[0-689]\\d)|7[013-7]\\d)\\d{4}",,,,"5912345",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"VU",678,"00",,,,,,,,[[,"(\\d{3})(\\d{4})","$1 $2",["[579]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"3[03]\\d{3}|900\\d{4}",,,,"30123"],,,[,,,,
          ,,,,,[-1]]],WF:[,[,,"[4-8]\\d{5}",,,,,,,[6]],[,,"(?:50|68|72)\\d{4}",,,,"501234"],[,,"(?:50|68|72|8[23])\\d{4}",,,,"501234"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"WF",681,"00",,,,,,,,[[,"(\\d{2})(\\d{2})(\\d{2})","$1 $2 $3"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,"[48]0\\d{4}",,,,"401234"]],WS:[,[,,"[2-578]\\d{4,9}|6[1-9]\\d{3}",,,,,,,[5,6,7,10]],[,,"(?:[2-5]\\d|6[1-9])\\d{3}",,,,"22123",,,[5]],[,,"(?:7[25-7]|8(?:[3-7]|9\\d{3}))\\d{5}",
          ,,,"7212345",,,[7,10]],[,,"800\\d{3}",,,,"800123",,,[6]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"WS",685,"0",,,,,,,,[[,"(8\\d{2})(\\d{3,7})","$1 $2",["8"]],[,"(7\\d)(\\d{5})","$1 $2",["7"]],[,"(\\d{5})","$1",["[2-6]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],XK:[,[,,"[23][89]\\d{6,7}|4[3-79]\\d{6}|[89]00\\d{5}",,,,,,,[8,9]],[,,"(?:2[89]0?|3(?:8|90?))\\d{6}",,,,"28012345"],[,,"4[3-79]\\d{6}",,,,"43201234",,,[8]],[,,"800\\d{5}",,,,"80001234",,
          ,[8]],[,,"900\\d{5}",,,,"90001234",,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"XK",383,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["[23][89]|4[3-79]"],"0$1"],[,"(\\d{3})(\\d{5})","$1 $2",["[89]00"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",,"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],YE:[,[,,"[1-7]\\d{6,8}",,,,,,,[7,8,9],[6]],[,,"(?:1(?:7\\d|[2-68])|2[2-68]|3[2358]|4[2-58]|5[2-6]|6[3-58]|7[24-68])\\d{5}",,,,"1234567",,,[7,8],[6]],
          [,,"7[0137]\\d{7}",,,,"712345678",,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"YE",967,"00","0",,,"0",,,,[[,"([1-7])(\\d{3})(\\d{3,4})","$1 $2 $3",["[1-6]|7[24-68]"],"0$1"],[,"(7\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["7[0137]"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],YT:[,[,,"[268]\\d{8}",,,,,,,[9]],[,,"269(?:0[67]|5[01]|6\\d|[78]0)\\d{4}",,,,"269601234"],[,,"639(?:0[0-79]|1[019]|[267]\\d|3[09]|[45]0|9[04-79])\\d{4}",,
          ,,"639012345"],[,,"80\\d{7}",,,,"801234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"YT",262,"00","0",,,"0",,,,,,[,,,,,,,,,[-1]],,"269|63",[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],ZA:[,[,,"[1-79]\\d{8}|8\\d{4,8}",,,,,,,[5,6,7,8,9]],[,,"(?:1[0-8]|2[1-378]|3[1-69]|4\\d|5[1346-8])\\d{7}",,,,"101234567",,,[9]],[,,"(?:6\\d|7[0-46-9])\\d{7}|8(?:[1-4]\\d{1,5}|5\\d{5})\\d{2}",,,,"711234567"],[,,"80\\d{7}",,,,"801234567",,,[9]],[,,"86[2-9]\\d{6}|9[0-2]\\d{7}",,,,"862345678",
          ,,[9]],[,,"860\\d{6}",,,,"860123456",,,[9]],[,,,,,,,,,[-1]],[,,"87\\d{7}",,,,"871234567",,,[9]],"ZA",27,"00","0",,,"0",,,,[[,"(860)(\\d{3})(\\d{3})","$1 $2 $3",["860"],"0$1"],[,"(\\d{2})(\\d{3,4})","$1 $2",["8[1-4]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{2,3})","$1 $2 $3",["8[1-4]"],"0$1"],[,"(\\d{2})(\\d{3})(\\d{4})","$1 $2 $3",["[1-79]|8(?:[0-57]|6[1-9])"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,"861\\d{6}",,,,"861123456",,,[9]],,,[,,,,,,,,,[-1]]],ZM:[,[,,"[289]\\d{8}",,,,,,,[9],[6,7]],[,,"21[1-8]\\d{6}",
          ,,,"211234567",,,,[6,7]],[,,"9[4-9]\\d{7}",,,,"955123456"],[,,"800\\d{6}",,,,"800123456"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"ZM",260,"00","0",,,"0",,,,[[,"(\\d{2})(\\d{4})","$1 $2",,"$1"],[,"([1-8])(\\d{2})(\\d{4})","$1 $2 $3",["[1-8]"],"$1"],[,"([29]\\d)(\\d{7})","$1 $2",["[29]"],"0$1"],[,"(800)(\\d{3})(\\d{3})","$1 $2 $3",["800"],"0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],ZW:[,[,,"2(?:[0-57-9]\\d{3,8}|6(?:[14]\\d{7}|\\d{4}))|[13-69]\\d{4,9}|7\\d{8}|8[06]\\d{5,8}",
          ,,,,,,[5,6,7,8,9,10],[3,4]],[,,"(?:2(?:0(?:4\\d|5\\d{2})|2[278]\\d|48\\d|7(?:[1-7]\\d|[089]\\d{2})|8(?:[2-57-9]|[146]\\d{2})|98)|3(?:08|17|3[78]|7(?:[19]|[56]\\d)|8[37]|98)|5[15][78]|6(?:28\\d{2}|37|6[78]|75\\d|98|8(?:7\\d|8)))\\d{3}|(?:2(?:1[39]|2[0157]|31|[56][14]|7[35]|84)|329)\\d{7}|(?:1(?:3\\d{2}|[4-8]|9\\d)|2(?:0\\d{2}|12|292|[569]\\d)|3(?:[26]|[013459]\\d)|5(?:0|1[2-4]|26|[37]2|5\\d{2}|[689]\\d)|6(?:[39]|[01246]\\d|[78]\\d{2}))\\d{3}|(?:29\\d|39|54)\\d{6}|(?:(?:25|54)83\\d|2582\\d{2}|65[2-8])\\d{2}|(?:4\\d{6,7}|9[2-9]\\d{4,5})",
          ,,,"1312345",,,,[3,4]],[,,"(?:7(?:1\\d|3[2-9]|7[1-9]|8[2-5])|8644)\\d{6}",,,,"712345678",,,[9,10]],[,,"80(?:[01]\\d|20|8[0-8])\\d{3}",,,,"8001234",,,[7]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"86(?:1[12]|30|55|77|8[368])\\d{6}",,,,"8686123456",,,[10]],"ZW",263,"00","0",,,"0",,,,[[,"([49])(\\d{3})(\\d{2,4})","$1 $2 $3",["4|9[2-9]"],"0$1"],[,"(7\\d)(\\d{3})(\\d{4})","$1 $2 $3",["7"],"0$1"],[,"(86\\d{2})(\\d{3})(\\d{3})","$1 $2 $3",["86[24]"],"0$1"],[,"([2356]\\d{2})(\\d{3,5})","$1 $2",
          ["2(?:0[45]|2[278]|[49]8|[78])|3(?:[09]8|17|3[78]|7[1569]|8[37])|5[15][78]|6(?:[29]8|37|[68][78]|75)"],"0$1"],[,"(\\d{3})(\\d{3})(\\d{3,4})","$1 $2 $3",["2(?:1[39]|2[0157]|31|[56][14]|7[35]|84)|329"],"0$1"],[,"([1-356]\\d)(\\d{3,5})","$1 $2",["1[3-9]|2[02569]|3[0-69]|5[05689]|6"],"0$1"],[,"([235]\\d)(\\d{3})(\\d{3,4})","$1 $2 $3",["[23]9|54"],"0$1"],[,"([25]\\d{3})(\\d{3,5})","$1 $2",["(?:25|54)8","258[23]|5483"],"0$1"],[,"(8\\d{3})(\\d{6})","$1 $2",["86"],"0$1"],[,"(80\\d)(\\d{4})","$1 $2",["80"],
          "0$1"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],800:[,[,,"\\d{8}",,,,,,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"\\d{8}",,,,"12345678"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"001",800,,,,,,,,1,[[,"(\\d{4})(\\d{4})","$1 $2"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],808:[,[,,"\\d{8}",,,,,,,[8]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"\\d{8}",,,,"12345678"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],
          "001",808,,,,,,,,1,[[,"(\\d{4})(\\d{4})","$1 $2"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],870:[,[,,"[35-7]\\d{8}",,,,,,,[9]],[,,,,,,,,,[-1]],[,,"(?:[356]\\d|7[6-8])\\d{7}",,,,"301234567"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"001",870,,,,,,,,,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],878:[,[,,"1\\d{11}",,,,,,,[12]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,
          ,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"10\\d{10}",,,,"101234567890"],"001",878,,,,,,,,1,[[,"(\\d{2})(\\d{5})(\\d{5})","$1 $2 $3"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],881:[,[,,"[67]\\d{8}",,,,,,,[9]],[,,,,,,,,,[-1]],[,,"[67]\\d{8}",,,,"612345678"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"001",881,,,,,,,,,[[,"(\\d)(\\d{3})(\\d{5})","$1 $2 $3",["[67]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],
          ,,[,,,,,,,,,[-1]]],882:[,[,,"[13]\\d{6,11}",,,,,,,[7,8,9,10,11,12]],[,,,,,,,,,[-1]],[,,"3(?:2\\d{3}|37\\d{2}|4(?:2|7\\d{3}))\\d{4}",,,,"3421234",,,[7,9,10]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"1(?:3(?:0[0347]|[13][0139]|2[035]|4[013568]|6[0459]|7[06]|8[15678]|9[0689])\\d{4}|6\\d{5,10})|3(?:45|9\\d{3})\\d{7}",,,,"390123456789"],"001",882,,,,,,,,,[[,"(\\d{2})(\\d{4})(\\d{3})","$1 $2 $3",["3[23]"]],[,"(\\d{2})(\\d{5})","$1 $2",["16|342"]],[,"(\\d{2})(\\d{4})(\\d{4})",
          "$1 $2 $3",["34[57]"]],[,"(\\d{3})(\\d{4})(\\d{4})","$1 $2 $3",["348"]],[,"(\\d{2})(\\d{2})(\\d{4})","$1 $2 $3",["1"]],[,"(\\d{2})(\\d{3,4})(\\d{4})","$1 $2 $3",["16"]],[,"(\\d{2})(\\d{4,5})(\\d{5})","$1 $2 $3",["16|39"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,"348[57]\\d{7}",,,,"34851234567",,,[11]]],883:[,[,,"51\\d{7}(?:\\d{3})?",,,,,,,[9,12]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"51(?:00\\d{5}(?:\\d{3})?|[13]0\\d{8})",
          ,,,"510012345"],"001",883,,,,,,,,1,[[,"(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3",["510"]],[,"(\\d{3})(\\d{3})(\\d{3})(\\d{3})","$1 $2 $3 $4",["510"]],[,"(\\d{4})(\\d{4})(\\d{4})","$1 $2 $3",["51[13]"]]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]],888:[,[,,"\\d{11}",,,,,,,[11]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"001",888,,,,,,,,1,[[,"(\\d{3})(\\d{3})(\\d{5})","$1 $2 $3"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,
          ,[-1]],[,,"\\d{11}",,,,"12345678901"],,,[,,,,,,,,,[-1]]],979:[,[,,"\\d{9}",,,,,,,[9]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,"\\d{9}",,,,"123456789"],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],"001",979,,,,,,,,1,[[,"(\\d)(\\d{4})(\\d{4})","$1 $2 $3"]],,[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]],[,,,,,,,,,[-1]],,,[,,,,,,,,,[-1]]]};/*

   Copyright (C) 2010 The Libphonenumber Authors.

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
  */
      function K(){this.a={};}K.a=void 0;K.b=function(){return K.a?K.a:K.a=new K};
      var Ca={0:"0",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",7:"7",8:"8",9:"9","\uff10":"0","\uff11":"1","\uff12":"2","\uff13":"3","\uff14":"4","\uff15":"5","\uff16":"6","\uff17":"7","\uff18":"8","\uff19":"9","\u0660":"0","\u0661":"1","\u0662":"2","\u0663":"3","\u0664":"4","\u0665":"5","\u0666":"6","\u0667":"7","\u0668":"8","\u0669":"9","\u06f0":"0","\u06f1":"1","\u06f2":"2","\u06f3":"3","\u06f4":"4","\u06f5":"5","\u06f6":"6","\u06f7":"7","\u06f8":"8","\u06f9":"9"},Da={0:"0",1:"1",2:"2",3:"3",4:"4",5:"5",6:"6",
            7:"7",8:"8",9:"9","\uff10":"0","\uff11":"1","\uff12":"2","\uff13":"3","\uff14":"4","\uff15":"5","\uff16":"6","\uff17":"7","\uff18":"8","\uff19":"9","\u0660":"0","\u0661":"1","\u0662":"2","\u0663":"3","\u0664":"4","\u0665":"5","\u0666":"6","\u0667":"7","\u0668":"8","\u0669":"9","\u06f0":"0","\u06f1":"1","\u06f2":"2","\u06f3":"3","\u06f4":"4","\u06f5":"5","\u06f6":"6","\u06f7":"7","\u06f8":"8","\u06f9":"9",A:"2",B:"2",C:"2",D:"3",E:"3",F:"3",G:"4",H:"4",I:"4",J:"5",K:"5",L:"5",M:"6",N:"6",O:"6",P:"7",
            Q:"7",R:"7",S:"7",T:"8",U:"8",V:"8",W:"9",X:"9",Y:"9",Z:"9"},Ea=/[\d]+(?:[~\u2053\u223C\uFF5E][\d]+)?/,Fa=/[+\uff0b]+/,L=/^[+\uff0b]+/,Ga=/([0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9])/,Ha=/[+\uff0b0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]/,Ia=/[\\\/] *x/,Ja=/[^0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9A-Za-z#]+$/,Ka=/(?:.*?[A-Za-z]){3}.*/,La=/(?:;ext=([0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]{1,7})|[ \u00a0\t,]*(?:e?xt(?:ensi(?:o\u0301?|\u00f3))?n?|\uff45?\uff58\uff54\uff4e?|[;,x\uff58#\uff03~\uff5e]|int|anexo|\uff49\uff4e\uff54)[:\.\uff0e]?[ \u00a0\t,-]*([0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]{1,7})#?|[- ]+([0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]{1,5})#)$/i,
          Ma=/^[0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]{2}$|^[+\uff0b]*(?:[-x\u2010-\u2015\u2212\u30fc\uff0d-\uff0f \u00a0\u00ad\u200b\u2060\u3000()\uff08\uff09\uff3b\uff3d.\[\]/~\u2053\u223c\uff5e*]*[0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]){3,}[-x\u2010-\u2015\u2212\u30fc\uff0d-\uff0f \u00a0\u00ad\u200b\u2060\u3000()\uff08\uff09\uff3b\uff3d.\[\]/~\u2053\u223c\uff5e*A-Za-z0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]*(?:;ext=([0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]{1,7})|[ \u00a0\t,]*(?:e?xt(?:ensi(?:o\u0301?|\u00f3))?n?|\uff45?\uff58\uff54\uff4e?|[;,x\uff58#\uff03~\uff5e]|int|anexo|\uff49\uff4e\uff54)[:\.\uff0e]?[ \u00a0\t,-]*([0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]{1,7})#?|[- ]+([0-9\uff10-\uff19\u0660-\u0669\u06f0-\u06f9]{1,5})#)?$/i,
          Na=/(\$\d)/,Oa=/^\(?\$1\)?$/;function Pa(a){var b=a.search(Ha);0<=b?(a=a.substring(b),a=a.replace(Ja,""),b=a.search(Ia),0<=b&&(a=a.substring(0,b))):a="";return a}function Qa(a){return 2>a.length?!1:M(Ma,a)}function Ra(a){return M(Ka,a)?Sa(a,Da):Sa(a,Ca)}function Ta(a){var b=Ra(a.toString());r(a);a.a(b);}function Ua(){var a=ba(Object.keys(Ba),function(a){return !isNaN(a)});return ca(a,function(a){return parseInt(a,10)})}
      function Va(){var a=Object.keys(J);return da(Ua(),ca(a,function(a){return parseInt(a,10)}))}function Wa(a){return null!=a&&(1!=B(a,9)||-1!=y(a,9)[0])}function Sa(a,b){for(var c=new q,d,e=a.length,f=0;f<e;++f)d=a.charAt(f),d=b[d.toUpperCase()],null!=d&&c.a(d);return c.toString()}function N(a){return null!=a&&isNaN(a)&&a.toUpperCase()in Ba}
      function O(a,b,c){if(0==w(b,2)&&v(b,5)){var d=A(b,5);if(0<d.length)return d}d=A(b,1);var e=P(b);if(0==c)return Xa(d,0,e,"");if(!(d in J))return e;a=R(a,d,S(d));b=Ya(b,a,c);e=Za(e,a,c);return Xa(d,c,e,b)}function R(a,b,c){return "001"==c?T(a,""+b):T(a,c)}
      function $a(a,b){var c=U;if(!N(b))return O(c,a,1);var d=A(a,1),e=P(a);if(!(d in J))return e;if(1==d){if(null!=b&&0<=t(J[1],b.toUpperCase()))return d+" "+O(c,a,2)}else if(d==V(c,b))return O(c,a,2);var f=T(c,b),g=A(f,11);b="";M(Ea,g)?b=g:v(f,17)&&(b=A(f,17));c=R(c,d,S(d));e=Za(e,c,1);a=Ya(a,c,1);return 0<b.length?b+" "+d+" "+e+a:Xa(d,1,e,a)}function P(a){if(!v(a,2))return "";var b=""+w(a,2);return v(a,4)&&w(a,4)&&0<A(a,8)?Array(A(a,8)+1).join("0")+b:b}
      function Xa(a,b,c,d){switch(b){case 0:return "+"+a+c+d;case 1:return "+"+a+" "+c+d;case 3:return "tel:+"+a+"-"+c+d;default:return c+d}}
      function Za(a,b,c){a:{b=0==y(b,20).length||2==c?y(b,19):y(b,20);for(var d,e=b.length,f=0;f<e;++f){d=b[f];var g=B(d,3);if(0==g||0==a.search(w(d,3,g-1)))if(g=new RegExp(w(d,1)),M(g,a)){b=d;break a}}b=null;}null!=b&&(e=b,b=A(e,2),d=new RegExp(w(e,1)),A(e,5),e=A(e,4),a=2==c&&null!=e&&0<e.length?a.replace(d,b.replace(Na,e)):a.replace(d,b),3==c&&(a=a.replace(/^[-x\u2010-\u2015\u2212\u30fc\uff0d-\uff0f \u00a0\u00ad\u200b\u2060\u3000()\uff08\uff09\uff3b\uff3d.\[\]/~\u2053\u223c\uff5e]+/,""),a=a.replace(/[-x\u2010-\u2015\u2212\u30fc\uff0d-\uff0f \u00a0\u00ad\u200b\u2060\u3000()\uff08\uff09\uff3b\uff3d.\[\]/~\u2053\u223c\uff5e]+/g,
          "-")));return c=a}function ab(a,b){var c=U;if(!N(a))return null;b=W(T(c,a),b);try{if(v(b,6)){var d=w(b,6);return bb(c,d,a)}}catch(e){}return null}function Ya(a,b,c){return v(a,3)&&0!=w(a,3).length?3==c?";ext="+w(a,3):v(b,13)?w(b,13)+A(a,3):" ext. "+A(a,3):""}
      function W(a,b){switch(b){case 4:return w(a,5);case 3:return w(a,4);case 1:return w(a,3);case 0:case 2:return w(a,2);case 5:return w(a,6);case 6:return w(a,8);case 7:return w(a,7);case 8:return w(a,21);case 9:return w(a,25);case 10:return w(a,28);default:return w(a,1)}}function cb(a,b){return X(a,w(b,1))?X(a,w(b,5))?4:X(a,w(b,4))?3:X(a,w(b,6))?5:X(a,w(b,8))?6:X(a,w(b,7))?7:X(a,w(b,21))?8:X(a,w(b,25))?9:X(a,w(b,28))?10:X(a,w(b,2))?w(b,18)||X(a,w(b,3))?2:0:!w(b,18)&&X(a,w(b,3))?1:-1:-1}
      function T(a,b){if(null==b)return null;b=b.toUpperCase();var c=a.a[b];if(null==c){c=Ba[b];if(null==c)return null;c=(new H).a(F.h(),c);a.a[b]=c;}return c}function X(a,b){var c=a.length;return 0<B(b,9)&&-1==t(y(b,9),c)?!1:M(A(b,2),a)}function db(a){var b=U,c=eb(b,a);var d=A(a,1);var e=R(b,d,c);null==e||"001"!=c&&d!=V(b,c)?e=!1:(a=P(a),e=-1!=cb(a,e));return e}
      function eb(a,b){if(null==b)return null;var c=A(b,1);c=J[c];if(null==c)a=null;else if(1==c.length)a=c[0];else a:{b=P(b);for(var d,e=c.length,f=0;f<e;f++){d=c[f];var g=T(a,d);if(v(g,23)){if(0==b.search(w(g,23))){a=d;break a}}else if(-1!=cb(b,g)){a=d;break a}}a=null;}return a}function S(a){a=J[a];return null==a?"ZZ":a[0]}function V(a,b){a=T(a,b);if(null==a)throw Error("Invalid region code: "+b);return A(a,10)}function fb(a){a=gb(a);return 0==a||4==a}
      function hb(a,b,c,d){var e=W(c,d),f=0==B(e,9)?y(w(c,1),9):y(e,9);e=y(e,10);if(2==d)if(Wa(W(c,0)))a=W(c,1),Wa(a)&&(f=f.concat(0==B(a,9)?y(w(c,1),9):y(a,9)),ea(f),0==e.length?e=y(a,10):(e=e.concat(y(a,10)),ea(e)));else return hb(a,b,c,1);if(-1==f[0])return 5;b=b.length;if(-1<t(e,b))return 4;c=f[0];return c==b?0:c>b?2:f[f.length-1]<b?3:-1<t(f,b,1)?0:5}function gb(a){var b=U,c=P(a);a=A(a,1);if(!(a in J))return 1;a=R(b,a,S(a));return hb(b,c,a,-1)}
      function ib(a,b){a=a.toString();if(0==a.length||"0"==a.charAt(0))return 0;for(var c,d=a.length,e=1;3>=e&&e<=d;++e)if(c=parseInt(a.substring(0,e),10),c in J)return b.a(a.substring(e)),c;return 0}
      function jb(a,b,c,d,e){if(0==b.length)return 0;b=new q(b);var f;null!=c&&(f=w(c,11));null==f&&(f="NonMatch");var g=b.toString();if(0==g.length)f=20;else if(L.test(g))g=g.replace(L,""),r(b),b.a(Ra(g)),f=1;else{g=new RegExp(f);Ta(b);f=b.toString();if(0==f.search(g)){g=f.match(g)[0].length;var k=f.substring(g).match(Ga);k&&null!=k[1]&&0<k[1].length&&"0"==Sa(k[1],Ca)?f=!1:(r(b),b.a(f.substring(g)),f=!0);}else f=!1;f=f?5:20;}if(20!=f){if(2>=b.b.length)throw Error("Phone number too short after IDD");a=ib(b,
          d);if(0!=a)return x(e,1,a),a;throw Error("Invalid country calling code");}if(null!=c&&(f=A(c,10),g=""+f,k=b.toString(),0==k.lastIndexOf(g,0)&&(g=new q(k.substring(g.length)),k=w(c,1),k=new RegExp(A(k,2)),kb(g,c,null),g=g.toString(),!M(k,b.toString())&&M(k,g)||3==hb(a,b.toString(),c,-1))))return d.a(g),x(e,1,f),f;x(e,1,0);return 0}
      function kb(a,b,c){var d=a.toString(),e=d.length,f=w(b,15);if(0!=e&&null!=f&&0!=f.length){var g=new RegExp("^(?:"+f+")");if(e=g.exec(d)){f=new RegExp(A(w(b,1),2));var k=M(f,d),p=e.length-1;b=w(b,16);if(null==b||0==b.length||null==e[p]||0==e[p].length){if(!k||M(f,d.substring(e[0].length)))null!=c&&0<p&&null!=e[p]&&c.a(e[1]),a.set(d.substring(e[0].length));}else if(d=d.replace(g,b),!k||M(f,d))null!=c&&0<p&&c.a(e[1]),a.set(d);}}}
      function bb(a,b,c){if(null==b)throw Error("The string supplied did not seem to be a phone number");if(250<b.length)throw Error("The string supplied is too long to be a phone number");var d=new q,e=b.indexOf(";phone-context=");if(0<=e){var f=e+15;if("+"==b.charAt(f)){var g=b.indexOf(";",f);0<g?d.a(b.substring(f,g)):d.a(b.substring(f));}f=b.indexOf("tel:");d.a(b.substring(0<=f?f+4:0,e));}else d.a(Pa(b));b=d.toString();e=b.indexOf(";isub=");0<e&&(r(d),d.a(b.substring(0,e)));if(!Qa(d.toString()))throw Error("The string supplied did not seem to be a phone number");
        b=d.toString();if(!(N(c)||null!=b&&0<b.length&&L.test(b)))throw Error("Invalid country calling code");b=new I;a:{e=d.toString();f=e.search(La);if(0<=f&&Qa(e.substring(0,f))){g=e.match(La);for(var k=g.length,p=1;p<k;++p)if(null!=g[p]&&0<g[p].length){r(d);d.a(e.substring(0,f));e=g[p];break a}}e="";}0<e.length&&x(b,3,e);f=T(a,c);e=new q;g=0;k=d.toString();try{g=jb(a,k,f,e,b);}catch(Q){if("Invalid country calling code"==Q.message&&L.test(k)){if(k=k.replace(L,""),g=jb(a,k,f,e,b),0==g)throw Q;}else throw Q;
        }0!=g?(d=S(g),d!=c&&(f=R(a,g,d))):(Ta(d),e.a(d.toString()),null!=c&&(g=A(f,10),x(b,1,g)));if(2>e.b.length)throw Error("The string supplied is too short to be a phone number");null!=f&&(c=new q(e.toString()),kb(c,f,new q),a=hb(a,c.toString(),f,-1),2!=a&&4!=a&&5!=a&&(e=c));a=e.toString();c=a.length;if(2>c)throw Error("The string supplied is too short to be a phone number");if(17<c)throw Error("The string supplied is too long to be a phone number");if(1<a.length&&"0"==a.charAt(0)){x(b,4,!0);for(c=1;c<
        a.length-1&&"0"==a.charAt(c);)c++;1!=c&&x(b,8,c);}x(b,2,parseInt(a,10));return b}function M(a,b){return (a="string"==typeof a?b.match("^(?:"+a+")$"):b.match(a))&&a[0].length==b.length?!0:!1}function lb(a){this.ga=/\u2008/;this.ba="";this.m=new q;this.w="";this.i=new q;this.u=new q;this.j=!0;this.$=this.o=this.da=!1;this.ea=K.b();this.s=0;this.b=new q;this.aa=!1;this.l="";this.a=new q;this.f=[];this.ca=a;this.ka=this.g=mb(this,this.ca);}var nb=new F;x(nb,11,"NA");
      var ob=/\[([^\[\]])*\]/g,pb=/\d(?=[^,}][^,}])/g,qb=/^[-x\u2010-\u2015\u2212\u30fc\uff0d-\uff0f \u00a0\u00ad\u200b\u2060\u3000()\uff08\uff09\uff3b\uff3d.\[\]/~\u2053\u223c\uff5e]*(\$\d[-x\u2010-\u2015\u2212\u30fc\uff0d-\uff0f \u00a0\u00ad\u200b\u2060\u3000()\uff08\uff09\uff3b\uff3d.\[\]/~\u2053\u223c\uff5e]*)+$/,rb=/[- ]/;function mb(a,b){b=N(b)?V(a.ea,b):0;a=T(a.ea,S(b));return null!=a?a:nb}
      function sb(a){for(var b=a.f.length,c=0;c<b;++c){var d=a.f[c],e=A(d,1);if(a.w==e)return !1;var f=a;var g=d,k=A(g,1);if(-1!=k.indexOf("|"))f=!1;else{k=k.replace(ob,"\\d");k=k.replace(pb,"\\d");r(f.m);var p=f;g=A(g,2);var Q="999999999999999".match(k)[0];Q.length<p.a.b.length?p="":(p=Q.replace(new RegExp(k,"g"),g),p=p.replace(/9/g,"\u2008"));0<p.length?(f.m.a(p),f=!0):f=!1;}if(f)return a.w=e,a.aa=rb.test(w(d,4)),a.s=0,!0}return a.j=!1}
      function tb(a,b){for(var c=[],d=b.length-3,e=a.f.length,f=0;f<e;++f){var g=a.f[f];0==B(g,3)?c.push(a.f[f]):(g=w(g,3,Math.min(d,B(g,3)-1)),0==b.search(g)&&c.push(a.f[f]));}a.f=c;}
      function ub(a,b){a.i.a(b);var c=b;Ga.test(c)||1==a.i.b.length&&Fa.test(c)?("+"==b?(c=b,a.u.a(b)):(c=Ca[b],a.u.a(c),a.a.a(c)),b=c):(a.j=!1,a.da=!0);if(!a.j){if(!a.da)if(vb(a)){if(wb(a))return xb(a)}else if(0<a.l.length&&(b=a.a.toString(),r(a.a),a.a.a(a.l),a.a.a(b),b=a.b.toString(),c=b.lastIndexOf(a.l),r(a.b),a.b.a(b.substring(0,c))),a.l!=yb(a))return a.b.a(" "),xb(a);return a.i.toString()}switch(a.u.b.length){case 0:case 1:case 2:return a.i.toString();case 3:if(vb(a))a.$=!0;else return a.l=yb(a),zb(a);
        default:if(a.$)return wb(a)&&(a.$=!1),a.b.toString()+a.a.toString();if(0<a.f.length){b=Ab(a,b);c=Bb(a);if(0<c.length)return c;tb(a,a.a.toString());return sb(a)?Cb(a):a.j?Db(a,b):a.i.toString()}return zb(a)}}function xb(a){a.j=!0;a.$=!1;a.f=[];a.s=0;r(a.m);a.w="";return zb(a)}function Bb(a){for(var b=a.a.toString(),c=a.f.length,d=0;d<c;++d){var e=a.f[d],f=A(e,1);if((new RegExp("^(?:"+f+")$")).test(b))return a.aa=rb.test(w(e,4)),b=b.replace(new RegExp(f,"g"),w(e,2)),Db(a,b)}return ""}
      function Db(a,b){var c=a.b.b.length;return a.aa&&0<c&&" "!=a.b.toString().charAt(c-1)?a.b+" "+b:a.b+b}function zb(a){var b=a.a.toString();if(3<=b.length){for(var c=a.o&&0<B(a.g,20)?y(a.g,20):y(a.g,19),d=c.length,e=0;e<d;++e){var f=c[e],g;(g=!v(a.g,12)||a.o||w(f,6))||(g=A(f,4),g=0==g.length||Oa.test(g));g&&qb.test(A(f,2))&&a.f.push(f);}tb(a,b);b=Bb(a);return 0<b.length?b:sb(a)?Cb(a):a.i.toString()}return Db(a,b)}
      function Cb(a){var b=a.a.toString(),c=b.length;if(0<c){for(var d="",e=0;e<c;e++)d=Ab(a,b.charAt(e));return a.j?Db(a,d):a.i.toString()}return a.b.toString()}
      function yb(a){var b=a.a.toString(),c=0;if(1!=w(a.g,10))var d=!1;else d=a.a.toString(),d="1"==d.charAt(0)&&"0"!=d.charAt(1)&&"1"!=d.charAt(1);d?(c=1,a.b.a("1").a(" "),a.o=!0):v(a.g,15)&&(d=new RegExp("^(?:"+w(a.g,15)+")"),d=b.match(d),null!=d&&null!=d[0]&&0<d[0].length&&(a.o=!0,c=d[0].length,a.b.a(b.substring(0,c))));r(a.a);a.a.a(b.substring(c));return b.substring(0,c)}
      function vb(a){var b=a.u.toString(),c=new RegExp("^(?:\\+|"+w(a.g,11)+")");c=b.match(c);return null!=c&&null!=c[0]&&0<c[0].length?(a.o=!0,c=c[0].length,r(a.a),a.a.a(b.substring(c)),r(a.b),a.b.a(b.substring(0,c)),"+"!=b.charAt(0)&&a.b.a(" "),!0):!1}function wb(a){if(0==a.a.b.length)return !1;var b=new q,c=ib(a.a,b);if(0==c)return !1;r(a.a);a.a.a(b.toString());b=S(c);"001"==b?a.g=T(a.ea,""+c):b!=a.ca&&(a.g=mb(a,b));a.b.a(""+c).a(" ");a.l="";return !0}
      function Ab(a,b){var c=a.m.toString();if(0<=c.substring(a.s).search(a.ga)){var d=c.search(a.ga);b=c.replace(a.ga,b);r(a.m);a.m.a(b);a.s=d;return b.substring(0,a.s+1)}1==a.f.length&&(a.j=!1);a.w="";return a.i.toString()}var U=K.b();function Eb(a){var b=U,c=eb(b,a);b=R(b,A(a,1),c);null==b?a=-1:(a=P(a),a=cb(a,b));switch(a){case 0:return "fixed-line";case 2:return "fixed-line-or-mobile";case 1:return "mobile";case 8:return "pager";case 7:return "personal-number";case 4:return "premium-rate";case 5:return "shared-cost";case 3:return "toll-free";case 9:return "uan";case 6:return "voip";default:case -1:return "unknown"}}
      function Fb(a){switch(a){case "fixed-line":return 0;case "fixed-line-or-mobile":return 2;case "mobile":return 1;case "pager":return 8;case "personal-number":return 7;case "premium-rate":return 4;case "shared-cost":return 5;case "toll-free":return 3;case "uan":return 9;case "voip":return 6;default:case "unknown":return -1}}
      function Gb(a){switch(gb(a)){case 0:return "is-possible";case 1:return "invalid-country-code";case 3:return "too-long";case 2:return "too-short"}return fb(a)?"is-possible":"unknown"}function Hb(a){if("+"!==a.charAt(0)||5>a.length)return null;var b=a.substr(1,2),c=a.substr(1,3);a=S(a.substr(1,1));if("ZZ"!==a)return a;a=S(b);if("ZZ"!==a)return a;a=S(c);if("ZZ"!==a)return a}
      function Y(a,b){if(!(this instanceof Y))return new Y(a,b);if("string"===typeof a)var c=!1;else try{db(a),c=!0;}catch(e){c=!1;}if(!c){if(b&&"+"===a.charAt(0)){var d=Ib(b);a.substr(1,(""+d).length)!==""+d&&(b=null);}b||(b=Hb(a));}this.a={number:{},regionCode:b,valid:!1,possible:!1};if(c)this.b=a;else{this.b=null;this.a.number.input=a;try{this.b=bb(U,a,b);}catch(e){return}}this.a.number.international=O(U,this.b,1);this.a.number.national=O(U,this.b,2);this.a.number.e164=O(U,this.b,0);this.a.number.rfc3966=
          O(U,this.b,3);this.a.number.significant=P(this.b);a=this.a;b=this.b;c=U;c=T(c,eb(c,b));null==c?b=!0:(b=P(b),b=!X(b,w(c,24)));a.canBeInternationallyDialled=b;this.a.possible=fb(this.b);this.a.valid=db(this.b);this.a.type=Eb(this.b);this.a.possibility=Gb(this.b);}function Ib(a){return N(a)?V(U,a):0}h=Y.prototype;h.toJSON=function(){return this.a};h.ja=function(){return this.a.canBeInternationallyDialled};h.ta=function(){return this.a.valid};h.sa=function(){return this.a.possible};h.pa=function(){return this.a.type};
      h.ra=function(){return "mobile"===this.a.type||"fixed-line-or-mobile"===this.a.type};h.qa=function(){return "fixed-line"===this.a.type||"fixed-line-or-mobile"===this.a.type};h.la=function(a){return this.a.number[null==a?"e164":a]};h.ma=function(a){return $a(this.b,a)};h.oa=function(){return this.a.regionCode};function Z(a){this.f=a;this.b=new lb(a);this.a="";}h=Z.prototype;h.ia=function(a){var b=this.b;b.ba=ub(b,a);return this.a=b.ba};h.ua=function(){return this.a};
      h.va=function(){var a=this.a;0<a.length&&this.ha(a.substr(0,a.length-1));return this.a};h.ha=function(a){var b=this.b;b.ba="";r(b.i);r(b.u);r(b.m);b.s=0;b.w="";r(b.b);b.l="";r(b.a);b.j=!0;b.da=!1;b.o=!1;b.$=!1;b.f=[];b.aa=!1;b.g!=b.ka&&(b.g=mb(b,b.ca));if(a){b=0;for(var c=a.length;b<c;++b)this.ia(a.charAt(b));}return this.a};h.na=function(){return new Y(this.a,this.f)};aa=exports;m("PhoneNumber",Y);
      m("PhoneNumber.getCountryCodeForRegionCode",Ib);m("PhoneNumber.getRegionCodeForCountryCode",function(a){return S(a)});m("PhoneNumber.getSupportedCallingCodes",function(){return Va()});m("PhoneNumber.getExample",function(a,b){b=b?ab(a,Fb(b)):ab(a,0);return new Y(b,a)});m("PhoneNumber.getAsYouType",function(a){return new Z(a)});m("PhoneNumber.prototype.toJSON",Y.prototype.toJSON);m("PhoneNumber.prototype.canBeInternationallyDialled",Y.prototype.ja);m("PhoneNumber.prototype.isValid",Y.prototype.ta);
      m("PhoneNumber.prototype.isPossible",Y.prototype.sa);m("PhoneNumber.prototype.getType",Y.prototype.pa);m("PhoneNumber.prototype.isMobile",Y.prototype.ra);m("PhoneNumber.prototype.isFixedLine",Y.prototype.qa);m("PhoneNumber.prototype.getNumber",Y.prototype.la);m("PhoneNumber.prototype.getNumberFrom",Y.prototype.ma);m("PhoneNumber.prototype.getRegionCode",Y.prototype.oa);m("AsYouType",Z);m("AsYouType.prototype.addChar",Z.prototype.ia);m("AsYouType.prototype.number",Z.prototype.ua);
      m("AsYouType.prototype.removeChar",Z.prototype.va);m("AsYouType.prototype.reset",Z.prototype.ha);m("AsYouType.prototype.getPhoneNumber",Z.prototype.na);})();
  });

  var awesomePhonenumber = createCommonjsModule(function (module) {

    module.exports = lib.PhoneNumber;

    Object.defineProperty(
        module.exports,
        "__esModule",
        {
          value: true
        }
    );

    module.exports.default = module.exports;
  });

  var Phone = unwrapExports(awesomePhonenumber);
  var awesomePhonenumber_1 = awesomePhonenumber.Phone;

  var codes = [
        ["AF","AFG","004","ISO 3166-2:AF"],
        ["AX","ALA","248","ISO 3166-2:AX"],
        ["AL","ALB","008","ISO 3166-2:AL"],
        ["DZ","DZA","012","ISO 3166-2:DZ"],
        ["AS","ASM","016","ISO 3166-2:AS"],
        ["AD","AND","020","ISO 3166-2:AD"],
        ["AO","AGO","024","ISO 3166-2:AO"],
        ["AI","AIA","660","ISO 3166-2:AI"],
        ["AQ","ATA","010","ISO 3166-2:AQ"],
        ["AG","ATG","028","ISO 3166-2:AG"],
        ["AR","ARG","032","ISO 3166-2:AR"],
        ["AM","ARM","051","ISO 3166-2:AM"],
        ["AW","ABW","533","ISO 3166-2:AW"],
        ["AU","AUS","036","ISO 3166-2:AU"],
        ["AT","AUT","040","ISO 3166-2:AT"],
        ["AZ","AZE","031","ISO 3166-2:AZ"],
        ["BS","BHS","044","ISO 3166-2:BS"],
        ["BH","BHR","048","ISO 3166-2:BH"],
        ["BD","BGD","050","ISO 3166-2:BD"],
        ["BB","BRB","052","ISO 3166-2:BB"],
        ["BY","BLR","112","ISO 3166-2:BY"],
        ["BE","BEL","056","ISO 3166-2:BE"],
        ["BZ","BLZ","084","ISO 3166-2:BZ"],
        ["BJ","BEN","204","ISO 3166-2:BJ"],
        ["BM","BMU","060","ISO 3166-2:BM"],
        ["BT","BTN","064","ISO 3166-2:BT"],
        ["BO","BOL","068","ISO 3166-2:BO"],
        ["BQ","BES","535","ISO 3166-2:BQ"],
        ["BA","BIH","070","ISO 3166-2:BA"],
        ["BW","BWA","072","ISO 3166-2:BW"],
        ["BV","BVT","074","ISO 3166-2:BV"],
        ["BR","BRA","076","ISO 3166-2:BR"],
        ["IO","IOT","086","ISO 3166-2:IO"],
        ["BN","BRN","096","ISO 3166-2:BN"],
        ["BG","BGR","100","ISO 3166-2:BG"],
        ["BF","BFA","854","ISO 3166-2:BF"],
        ["BI","BDI","108","ISO 3166-2:BI"],
        ["KH","KHM","116","ISO 3166-2:KH"],
        ["CM","CMR","120","ISO 3166-2:CM"],
        ["CA","CAN","124","ISO 3166-2:CA"],
        ["CV","CPV","132","ISO 3166-2:CV"],
        ["KY","CYM","136","ISO 3166-2:KY"],
        ["CF","CAF","140","ISO 3166-2:CF"],
        ["TD","TCD","148","ISO 3166-2:TD"],
        ["CL","CHL","152","ISO 3166-2:CL"],
        ["CN","CHN","156","ISO 3166-2:CN"],
        ["CX","CXR","162","ISO 3166-2:CX"],
        ["CC","CCK","166","ISO 3166-2:CC"],
        ["CO","COL","170","ISO 3166-2:CO"],
        ["KM","COM","174","ISO 3166-2:KM"],
        ["CG","COG","178","ISO 3166-2:CG"],
        ["CD","COD","180","ISO 3166-2:CD"],
        ["CK","COK","184","ISO 3166-2:CK"],
        ["CR","CRI","188","ISO 3166-2:CR"],
        ["CI","CIV","384","ISO 3166-2:CI"],
        ["HR","HRV","191","ISO 3166-2:HR"],
        ["CU","CUB","192","ISO 3166-2:CU"],
        ["CW","CUW","531","ISO 3166-2:CW"],
        ["CY","CYP","196","ISO 3166-2:CY"],
        ["CZ","CZE","203","ISO 3166-2:CZ"],
        ["DK","DNK","208","ISO 3166-2:DK"],
        ["DJ","DJI","262","ISO 3166-2:DJ"],
        ["DM","DMA","212","ISO 3166-2:DM"],
        ["DO","DOM","214","ISO 3166-2:DO"],
        ["EC","ECU","218","ISO 3166-2:EC"],
        ["EG","EGY","818","ISO 3166-2:EG"],
        ["SV","SLV","222","ISO 3166-2:SV"],
        ["GQ","GNQ","226","ISO 3166-2:GQ"],
        ["ER","ERI","232","ISO 3166-2:ER"],
        ["EE","EST","233","ISO 3166-2:EE"],
        ["ET","ETH","231","ISO 3166-2:ET"],
        ["FK","FLK","238","ISO 3166-2:FK"],
        ["FO","FRO","234","ISO 3166-2:FO"],
        ["FJ","FJI","242","ISO 3166-2:FJ"],
        ["FI","FIN","246","ISO 3166-2:FI"],
        ["FR","FRA","250","ISO 3166-2:FR"],
        ["GF","GUF","254","ISO 3166-2:GF"],
        ["PF","PYF","258","ISO 3166-2:PF"],
        ["TF","ATF","260","ISO 3166-2:TF"],
        ["GA","GAB","266","ISO 3166-2:GA"],
        ["GM","GMB","270","ISO 3166-2:GM"],
        ["GE","GEO","268","ISO 3166-2:GE"],
        ["DE","DEU","276","ISO 3166-2:DE"],
        ["GH","GHA","288","ISO 3166-2:GH"],
        ["GI","GIB","292","ISO 3166-2:GI"],
        ["GR","GRC","300","ISO 3166-2:GR"],
        ["GL","GRL","304","ISO 3166-2:GL"],
        ["GD","GRD","308","ISO 3166-2:GD"],
        ["GP","GLP","312","ISO 3166-2:GP"],
        ["GU","GUM","316","ISO 3166-2:GU"],
        ["GT","GTM","320","ISO 3166-2:GT"],
        ["GG","GGY","831","ISO 3166-2:GG"],
        ["GN","GIN","324","ISO 3166-2:GN"],
        ["GW","GNB","624","ISO 3166-2:GW"],
        ["GY","GUY","328","ISO 3166-2:GY"],
        ["HT","HTI","332","ISO 3166-2:HT"],
        ["HM","HMD","334","ISO 3166-2:HM"],
        ["VA","VAT","336","ISO 3166-2:VA"],
        ["HN","HND","340","ISO 3166-2:HN"],
        ["HK","HKG","344","ISO 3166-2:HK"],
        ["HU","HUN","348","ISO 3166-2:HU"],
        ["IS","ISL","352","ISO 3166-2:IS"],
        ["IN","IND","356","ISO 3166-2:IN"],
        ["ID","IDN","360","ISO 3166-2:ID"],
        ["IR","IRN","364","ISO 3166-2:IR"],
        ["IQ","IRQ","368","ISO 3166-2:IQ"],
        ["IE","IRL","372","ISO 3166-2:IE"],
        ["IM","IMN","833","ISO 3166-2:IM"],
        ["IL","ISR","376","ISO 3166-2:IL"],
        ["IT","ITA","380","ISO 3166-2:IT"],
        ["JM","JAM","388","ISO 3166-2:JM"],
        ["JP","JPN","392","ISO 3166-2:JP"],
        ["JE","JEY","832","ISO 3166-2:JE"],
        ["JO","JOR","400","ISO 3166-2:JO"],
        ["KZ","KAZ","398","ISO 3166-2:KZ"],
        ["KE","KEN","404","ISO 3166-2:KE"],
        ["KI","KIR","296","ISO 3166-2:KI"],
        ["KP","PRK","408","ISO 3166-2:KP"],
        ["KR","KOR","410","ISO 3166-2:KR"],
        ["KW","KWT","414","ISO 3166-2:KW"],
        ["KG","KGZ","417","ISO 3166-2:KG"],
        ["LA","LAO","418","ISO 3166-2:LA"],
        ["LV","LVA","428","ISO 3166-2:LV"],
        ["LB","LBN","422","ISO 3166-2:LB"],
        ["LS","LSO","426","ISO 3166-2:LS"],
        ["LR","LBR","430","ISO 3166-2:LR"],
        ["LY","LBY","434","ISO 3166-2:LY"],
        ["LI","LIE","438","ISO 3166-2:LI"],
        ["LT","LTU","440","ISO 3166-2:LT"],
        ["LU","LUX","442","ISO 3166-2:LU"],
        ["MO","MAC","446","ISO 3166-2:MO"],
        ["MK","MKD","807","ISO 3166-2:MK"],
        ["MG","MDG","450","ISO 3166-2:MG"],
        ["MW","MWI","454","ISO 3166-2:MW"],
        ["MY","MYS","458","ISO 3166-2:MY"],
        ["MV","MDV","462","ISO 3166-2:MV"],
        ["ML","MLI","466","ISO 3166-2:ML"],
        ["MT","MLT","470","ISO 3166-2:MT"],
        ["MH","MHL","584","ISO 3166-2:MH"],
        ["MQ","MTQ","474","ISO 3166-2:MQ"],
        ["MR","MRT","478","ISO 3166-2:MR"],
        ["MU","MUS","480","ISO 3166-2:MU"],
        ["YT","MYT","175","ISO 3166-2:YT"],
        ["MX","MEX","484","ISO 3166-2:MX"],
        ["FM","FSM","583","ISO 3166-2:FM"],
        ["MD","MDA","498","ISO 3166-2:MD"],
        ["MC","MCO","492","ISO 3166-2:MC"],
        ["MN","MNG","496","ISO 3166-2:MN"],
        ["ME","MNE","499","ISO 3166-2:ME"],
        ["MS","MSR","500","ISO 3166-2:MS"],
        ["MA","MAR","504","ISO 3166-2:MA"],
        ["MZ","MOZ","508","ISO 3166-2:MZ"],
        ["MM","MMR","104","ISO 3166-2:MM"],
        ["NA","NAM","516","ISO 3166-2:NA"],
        ["NR","NRU","520","ISO 3166-2:NR"],
        ["NP","NPL","524","ISO 3166-2:NP"],
        ["NL","NLD","528","ISO 3166-2:NL"],
        ["NC","NCL","540","ISO 3166-2:NC"],
        ["NZ","NZL","554","ISO 3166-2:NZ"],
        ["NI","NIC","558","ISO 3166-2:NI"],
        ["NE","NER","562","ISO 3166-2:NE"],
        ["NG","NGA","566","ISO 3166-2:NG"],
        ["NU","NIU","570","ISO 3166-2:NU"],
        ["NF","NFK","574","ISO 3166-2:NF"],
        ["MP","MNP","580","ISO 3166-2:MP"],
        ["NO","NOR","578","ISO 3166-2:NO"],
        ["OM","OMN","512","ISO 3166-2:OM"],
        ["PK","PAK","586","ISO 3166-2:PK"],
        ["PW","PLW","585","ISO 3166-2:PW"],
        ["PS","PSE","275","ISO 3166-2:PS"],
        ["PA","PAN","591","ISO 3166-2:PA"],
        ["PG","PNG","598","ISO 3166-2:PG"],
        ["PY","PRY","600","ISO 3166-2:PY"],
        ["PE","PER","604","ISO 3166-2:PE"],
        ["PH","PHL","608","ISO 3166-2:PH"],
        ["PN","PCN","612","ISO 3166-2:PN"],
        ["PL","POL","616","ISO 3166-2:PL"],
        ["PT","PRT","620","ISO 3166-2:PT"],
        ["PR","PRI","630","ISO 3166-2:PR"],
        ["QA","QAT","634","ISO 3166-2:QA"],
        ["RE","REU","638","ISO 3166-2:RE"],
        ["RO","ROU","642","ISO 3166-2:RO"],
        ["RU","RUS","643","ISO 3166-2:RU"],
        ["RW","RWA","646","ISO 3166-2:RW"],
        ["BL","BLM","652","ISO 3166-2:BL"],
        ["SH","SHN","654","ISO 3166-2:SH"],
        ["KN","KNA","659","ISO 3166-2:KN"],
        ["LC","LCA","662","ISO 3166-2:LC"],
        ["MF","MAF","663","ISO 3166-2:MF"],
        ["PM","SPM","666","ISO 3166-2:PM"],
        ["VC","VCT","670","ISO 3166-2:VC"],
        ["WS","WSM","882","ISO 3166-2:WS"],
        ["SM","SMR","674","ISO 3166-2:SM"],
        ["ST","STP","678","ISO 3166-2:ST"],
        ["SA","SAU","682","ISO 3166-2:SA"],
        ["SN","SEN","686","ISO 3166-2:SN"],
        ["RS","SRB","688","ISO 3166-2:RS"],
        ["SC","SYC","690","ISO 3166-2:SC"],
        ["SL","SLE","694","ISO 3166-2:SL"],
        ["SG","SGP","702","ISO 3166-2:SG"],
        ["SX","SXM","534","ISO 3166-2:SX"],
        ["SK","SVK","703","ISO 3166-2:SK"],
        ["SI","SVN","705","ISO 3166-2:SI"],
        ["SB","SLB","090","ISO 3166-2:SB"],
        ["SO","SOM","706","ISO 3166-2:SO"],
        ["ZA","ZAF","710","ISO 3166-2:ZA"],
        ["GS","SGS","239","ISO 3166-2:GS"],
        ["SS","SSD","728","ISO 3166-2:SS"],
        ["ES","ESP","724","ISO 3166-2:ES"],
        ["LK","LKA","144","ISO 3166-2:LK"],
        ["SD","SDN","729","ISO 3166-2:SD"],
        ["SR","SUR","740","ISO 3166-2:SR"],
        ["SJ","SJM","744","ISO 3166-2:SJ"],
        ["SZ","SWZ","748","ISO 3166-2:SZ"],
        ["SE","SWE","752","ISO 3166-2:SE"],
        ["CH","CHE","756","ISO 3166-2:CH"],
        ["SY","SYR","760","ISO 3166-2:SY"],
        ["TW","TWN","158","ISO 3166-2:TW"],
        ["TJ","TJK","762","ISO 3166-2:TJ"],
        ["TZ","TZA","834","ISO 3166-2:TZ"],
        ["TH","THA","764","ISO 3166-2:TH"],
        ["TL","TLS","626","ISO 3166-2:TL"],
        ["TG","TGO","768","ISO 3166-2:TG"],
        ["TK","TKL","772","ISO 3166-2:TK"],
        ["TO","TON","776","ISO 3166-2:TO"],
        ["TT","TTO","780","ISO 3166-2:TT"],
        ["TN","TUN","788","ISO 3166-2:TN"],
        ["TR","TUR","792","ISO 3166-2:TR"],
        ["TM","TKM","795","ISO 3166-2:TM"],
        ["TC","TCA","796","ISO 3166-2:TC"],
        ["TV","TUV","798","ISO 3166-2:TV"],
        ["UG","UGA","800","ISO 3166-2:UG"],
        ["UA","UKR","804","ISO 3166-2:UA"],
        ["AE","ARE","784","ISO 3166-2:AE"],
        ["GB","GBR","826","ISO 3166-2:GB"],
        ["US","USA","840","ISO 3166-2:US"],
        ["UM","UMI","581","ISO 3166-2:UM"],
        ["UY","URY","858","ISO 3166-2:UY"],
        ["UZ","UZB","860","ISO 3166-2:UZ"],
        ["VU","VUT","548","ISO 3166-2:VU"],
        ["VE","VEN","862","ISO 3166-2:VE"],
        ["VN","VNM","704","ISO 3166-2:VN"],
        ["VG","VGB","092","ISO 3166-2:VG"],
        ["VI","VIR","850","ISO 3166-2:VI"],
        ["WF","WLF","876","ISO 3166-2:WF"],
        ["EH","ESH","732","ISO 3166-2:EH"],
        ["YE","YEM","887","ISO 3166-2:YE"],
        ["ZM","ZMB","894","ISO 3166-2:ZM"],
        ["ZW","ZWE","716","ISO 3166-2:ZW"],
        ["XK","XKX","","ISO 3166-2:XK"]
      ]
  ;

  var codes$1 = /*#__PURE__*/Object.freeze({
    default: codes
  });

  var codes$2 = ( codes$1 && codes ) || codes$1;

  var registeredLocales = {};

  /*
   * All codes map to ISO 3166-1 alpha-2
   */
  var alpha2 = {},
      alpha3 = {},
      numeric = {},
      invertedNumeric = {};

  codes$2.forEach(function(codeInformation) {
    var s = codeInformation;
    alpha2[s[0]] = s[1];
    alpha3[s[1]] = s[0];
    numeric[s[2]] = s[0];
    invertedNumeric[s[0]] = s[2];
  });

  function formatNumericCode(code) {
    return String('000'+(code ? code : '')).slice(-3);
  }

  function registerLocale(localeData) {
    if (!localeData.locale) {
      throw new TypeError('Missing localeData.locale');
    }

    if (!localeData.countries) {
      throw new TypeError('Missing localeData.countries');
    }

    registeredLocales[localeData.locale] = localeData.countries;
  }

  var registerLocale_1 = registerLocale;

  /*
   * @param code Alpha-3 code
   * @return Alpha-2 code or undefined
   */
  function alpha3ToAlpha2(code) {
    return alpha3[code];
  }
  var alpha3ToAlpha2_1 = alpha3ToAlpha2;

  /*
   * @param code Alpha-2 code
   * @return Alpha-3 code or undefined
   */
  function alpha2ToAlpha3(code) {
    return alpha2[code];
  }
  var alpha2ToAlpha3_1 = alpha2ToAlpha3;

  /*
   * @param code Alpha-3 code
   * @return Numeric code or undefined
   */
  function alpha3ToNumeric(code) {
    return invertedNumeric[alpha3ToAlpha2(code)];
  }
  var alpha3ToNumeric_1 = alpha3ToNumeric;

  /*
   * @param code Alpha-2 code
   * @return Numeric code or undefined
   */
  function alpha2ToNumeric(code) {
    return invertedNumeric[code];
  }
  var alpha2ToNumeric_1 = alpha2ToNumeric;

  /*
   * @param code Numeric code
   * @return Alpha-3 code or undefined
   */
  function numericToAlpha3(code) {
    var padded = formatNumericCode(code);
    return alpha2ToAlpha3(numeric[padded]);
  }
  var numericToAlpha3_1 = numericToAlpha3;

  /*
   * @param code Numeric code
   * @return Alpha-2 code or undefined
   */
  function numericToAlpha2(code) {
    var padded = formatNumericCode(code);
    return numeric[padded];
  }
  var numericToAlpha2_1 = numericToAlpha2;

  /*
   * @param code ISO 3166-1 alpha-2, alpha-3 or numeric code
   * @return ISO 3166-1 alpha-3
   */
  function toAlpha3(code) {
    if (typeof code === "string") {
      if (/^[0-9]*$/.test(code)) {
        return numericToAlpha3(code);
      }
      if(code.length === 2) {
        return alpha2ToAlpha3(code.toUpperCase());
      }
      if (code.length === 3) {
        return code.toUpperCase();
      }
    }
    if (typeof code === "number") {
      return numericToAlpha3(code);
    }
    return undefined;
  }
  var toAlpha3_1 = toAlpha3;

  /*
   * @param code ISO 3166-1 alpha-2, alpha-3 or numeric code
   * @return ISO 3166-1 alpha-2
   */
  function toAlpha2(code) {
    if (typeof code === "string") {
      if (/^[0-9]*$/.test(code)) {
        return numericToAlpha2(code);
      }
      if (code.length === 2) {
        return code.toUpperCase();
      }
      if(code.length === 3) {
        return alpha3ToAlpha2(code.toUpperCase());
      }
    }
    if (typeof code === "number") {
      return numericToAlpha2(code);
    }
    return undefined;
  }
  var toAlpha2_1 = toAlpha2;

  /*
   * @param code ISO 3166-1 alpha-2, alpha-3 or numeric code
   * @param lang language for country name
   * @return name or undefined
   */
  var getName = function(code, lang) {
    try {
      var d = registeredLocales[lang.toLowerCase()];
      return d[toAlpha2(code)];
    } catch (err) {
      return undefined;
    }
  };

  /*
   * @param lang language for country names
   * @return Object of country code mapped to county name
   */
  var getNames = function(lang) {
    var d = registeredLocales[lang.toLowerCase()];
    if (d === undefined) {
      return {};
    }
    return d;
  };

  /*
   * @param name name
   * @param lang language for country name
   * @return ISO 3166-1 alpha-2 or undefined
   */
  var getAlpha2Code = function(name, lang) {
    try {
      var p, codenames = registeredLocales[lang.toLowerCase()];
      for (p in codenames) {
        if (codenames.hasOwnProperty(p)) {
          if (codenames[p].toLowerCase() === name.toLowerCase()) {
            return p;
          }
        }
      }
      return undefined;
    } catch (err) {
      return undefined;
    }
  };

  /*
   * @return Object of alpha-2 codes mapped to alpha-3 codes
   */
  var getAlpha2Codes = function() {
    return alpha2;
  };

  /*
   * @param name name
   * @param lang language for country name
   * @return ISO 3166-1 alpha-3 or undefined
   */
  var getAlpha3Code = function(name, lang) {
    var alpha2 = this.getAlpha2Code(name, lang);
    if (alpha2) {
      return this.toAlpha3(alpha2);
    } else {
      return undefined;
    }
  };

  /*
   * @return Object of alpha-3 codes mapped to alpha-2 codes
   */
  var getAlpha3Codes = function() {
    return alpha3;
  };

  /*
   * @return Object of numeric codes mapped to alpha-2 codes
   */
  var getNumericCodes = function() {
    return numeric;
  };

  /*
   * @return Array of supported languages
   */
  var langs = function() {
    return Object.keys(registeredLocales);
  };

  /*
   * @param code ISO 3166-1 alpha-2, alpha-3 or numeric code
   * @return Boolean
   */
  var isValid = function(code) {
    if (!code) {
      return false;
    }

    var coerced = code.toString().toUpperCase();
    return alpha3.hasOwnProperty(coerced) || alpha2.hasOwnProperty(coerced) ||
        numeric.hasOwnProperty(coerced);
  };

  var i18nIsoCountries = {
    registerLocale: registerLocale_1,
    alpha3ToAlpha2: alpha3ToAlpha2_1,
    alpha2ToAlpha3: alpha2ToAlpha3_1,
    alpha3ToNumeric: alpha3ToNumeric_1,
    alpha2ToNumeric: alpha2ToNumeric_1,
    numericToAlpha3: numericToAlpha3_1,
    numericToAlpha2: numericToAlpha2_1,
    toAlpha3: toAlpha3_1,
    toAlpha2: toAlpha2_1,
    getName: getName,
    getNames: getNames,
    getAlpha2Code: getAlpha2Code,
    getAlpha2Codes: getAlpha2Codes,
    getAlpha3Code: getAlpha3Code,
    getAlpha3Codes: getAlpha3Codes,
    getNumericCodes: getNumericCodes,
    langs: langs,
    isValid: isValid
  };

  var locale = "ar";
  var countries = {
    AF: " أفغانستان",
    AL: " ألبانيا",
    DZ: " الجزائر",
    AS: " ساموا الأمريكية",
    AD: " أندورا",
    AO: " أنغولا",
    AI: " أنغويلا",
    AQ: " القارة القطبية الجنوبية",
    AG: " أنتيغوا وباربودا",
    AR: " الأرجنتين",
    AM: " أرمينيا",
    AW: " أروبا",
    AU: " أستراليا",
    AT: " النمسا",
    AZ: " أذربيجان",
    BS: " باهاماس",
    BH: " البحرين",
    BD: " بنغلاديش",
    BB: " باربادوس",
    BY: " روسيا البيضاء",
    BE: " بلجيكا",
    BZ: " بليز",
    BJ: " بنين",
    BM: " برمودا",
    BT: " بوتان",
    BO: " بوليفيا",
    BA: " البوسنة والهرسك",
    BW: " بوتسوانا",
    BV: " جزيرة بوفيه",
    BR: " البرازيل",
    IO: " إقليم المحيط الهندي البريطاني",
    BN: " بروناي",
    BG: " بلغاريا",
    BF: " بوركينا فاسو",
    BI: " بوروندي",
    KH: " كمبوديا",
    CM: " الكاميرون",
    CA: " كندا",
    CV: " الرأس الأخضر",
    KY: " جزر كايمان",
    CF: " جمهورية أفريقيا الوسطى",
    TD: " تشاد",
    CL: " تشيلي",
    CN: " الصين",
    CX: " جزيرة عيد الميلاد",
    CC: " جزر كوكوس",
    CO: " كولومبيا",
    KM: " جزر القمر",
    CG: " جمهورية الكونغو",
    CD: " جمهورية الكونغو الديمقراطية",
    CK: " جزر كوك",
    CR: " كوستاريكا",
    CI: " ساحل العاج",
    HR: " كرواتيا",
    CU: " كوبا",
    CY: " قبرص",
    CZ: " جمهورية التشيك",
    DK: " الدنمارك",
    DJ: " جيبوتي",
    DM: " دومينيكا",
    DO: " جمهورية الدومينيكان",
    EC: " الإكوادور",
    EG: " مصر",
    SV: " السلفادور",
    GQ: " غينيا الاستوائية",
    ER: " إريتريا",
    EE: " إستونيا",
    ET: " إثيوبيا",
    FK: " جزر فوكلاند",
    FO: " جزر فارو",
    FJ: " فيجي",
    FI: " فنلندا",
    FR: " فرنسا",
    GF: " غويانا الفرنسية",
    PF: " بولينزيا الفرنسية",
    TF: " أراض فرنسية جنوبية وأنتارتيكية",
    GA: " الغابون",
    GM: " غامبيا",
    GE: " جورجيا",
    DE: " ألمانيا",
    GH: " غانا",
    GI: " جبل طارق",
    GR: " اليونان",
    GL: " جرينلاند",
    GD: " غرينادا",
    GP: " غوادلوب",
    GU: " غوام",
    GT: " غواتيمالا",
    GN: " غينيا",
    GW: " غينيا بيساو",
    GY: " غيانا",
    HT: " هايتي",
    HM: " جزيرة هيرد وجزر ماكدونالد",
    VA: "  الفاتيكان",
    HN: " هندوراس",
    HK: " هونغ كونغ",
    HU: " المجر",
    IS: " آيسلندا",
    IN: " الهند",
    ID: " إندونيسيا",
    IR: " إيران",
    IQ: " العراق",
    IE: " أيرلندا",
    IL: " إسرائيل",
    IT: " إيطاليا",
    JM: " جامايكا",
    JP: " اليابان",
    JO: " الأردن",
    KZ: " كازاخستان",
    KE: " كينيا",
    KI: " كيريباتي",
    KP: " كوريا الشمالية",
    KR: " كوريا الجنوبية",
    KW: " الكويت",
    KG: " قيرغيزستان",
    LA: " لاوس",
    LV: " لاتفيا",
    LB: " لبنان",
    LS: " ليسوتو",
    LR: " ليبيريا",
    LY: " ليبيا",
    LI: " ليختنشتاين",
    LT: " ليتوانيا",
    LU: " لوكسمبورغ",
    MO: " ماكاو",
    MK: " مقدونيا",
    MG: " مدغشقر",
    MW: " مالاوي",
    MY: " ماليزيا",
    MV: " جزر المالديف",
    ML: " مالي",
    MT: " مالطا",
    MH: " جزر مارشال",
    MQ: " مارتينيك",
    MR: " موريتانيا",
    MU: " موريشيوس",
    YT: " مايوت",
    MX: " المكسيك",
    FM: " ولايات ميكرونيسيا المتحدة",
    MD: " مولدوفا",
    MC: " موناكو",
    MN: " منغوليا",
    MS: " مونتسرات",
    MA: " المغرب",
    MZ: " موزمبيق",
    MM: " بورما",
    NA: " ناميبيا",
    NR: " ناورو",
    NP: " نيبال",
    NL: " هولندا",
    NC: " كاليدونيا الجديدة",
    NZ: " نيوزيلندا",
    NI: " نيكاراغوا",
    NE: " النيجر",
    NG: " نيجيريا",
    NU: " نييوي",
    NF: " جزيرة نورفولك",
    MP: " جزر ماريانا الشمالية",
    NO: " النرويج",
    OM: " عمان",
    PK: " باكستان",
    PW: " بالاو",
    PS: " فلسطين",
    PA: " بنما",
    PG: " بابوا غينيا الجديدة",
    PY: " باراغواي",
    PE: " بيرو",
    PH: " الفلبين",
    PN: " جزر بيتكيرن",
    PL: " بولندا",
    PT: " البرتغال",
    PR: " بورتوريكو",
    QA: " قطر",
    RE: " لا ريونيون",
    RO: " رومانيا",
    RU: " روسيا",
    RW: " رواندا",
    SH: " سانت هيلينا وأسينشين وتريستان دا كونا",
    KN: " سانت كيتس ونيفيس",
    LC: " سانت لوسيا",
    PM: " سان بيير وميكلون",
    VC: " سانت فينسنت والغرينادين",
    WS: " ساموا",
    SM: " سان مارينو",
    ST: " ساو تومي وبرينسيب",
    SA: " السعودية",
    SN: " السنغال",
    SC: " سيشل",
    SL: " سيراليون",
    SG: " سنغافورة",
    SK: " سلوفاكيا",
    SI: " سلوفينيا",
    SB: " جزر سليمان",
    SO: " الصومال",
    ZA: " جنوب أفريقيا",
    GS: " جورجيا الجنوبية وجزر ساندويتش الجنوبية",
    ES: " إسبانيا",
    LK: " سريلانكا",
    SD: " السودان",
    SR: " سورينام",
    SJ: " سفالبارد ويان ماين",
    SZ: " سوازيلاند",
    SE: " السويد",
    CH: " سويسرا",
    SY: " سوريا",
    TW: " تايوان",
    TJ: " طاجيكستان",
    TZ: " تانزانيا",
    TH: " تايلاند",
    TL: " تيمور الشرقية",
    TG: " توغو",
    TK: " توكيلاو",
    TO: " تونغا",
    TT: "ترينيداد وتوباغو",
    TN: " تونس",
    TR: " تركيا",
    TM: " تركمانستان",
    TC: " جزر توركس وكايكوس",
    TV: " توفالو",
    UG: " أوغندا",
    UA: " أوكرانيا",
    AE: " الإمارات العربية المتحدة",
    GB: " المملكة المتحدة",
    US: " الولايات المتحدة",
    UM: " جزر الولايات المتحدة",
    UY: " الأوروغواي",
    UZ: " أوزبكستان",
    VU: " فانواتو",
    VE: " فنزويلا",
    VN: " فيتنام",
    VG: " جزر العذراء البريطانية",
    VI: " جزر العذراء الأمريكية",
    WF: " والس وفوتونا",
    EH: " الصحراء الغربية",
    YE: " اليمن",
    ZM: " زامبيا",
    ZW: " زيمبابوي",
    AX: " جزر أولاند",
    BQ: " الجزر الكاريبية الهولندية",
    CW: " كوراساو",
    GG: " غيرنزي",
    IM: " جزيرة مان",
    JE: " جيرزي",
    ME: " الجبل الأسود",
    BL: " سان بارتيلمي",
    MF: " سانت مارتن (الجزء الفرنسي)",
    RS: " صربيا",
    SX: " سانت مارتن (الجزء الهولندي)",
    SS: " جنوب السودان",
    XK: " كوسوفو"
  };
  var ar = {
    locale: locale,
    countries: countries
  };

  var ar$1 = /*#__PURE__*/Object.freeze({
    locale: locale,
    countries: countries,
    default: ar
  });

  var locale$1 = "az";
  var countries$1 = {
    AD: "Andorra",
    AE: "Birləşmiş Ərəb Əmirlikləri",
    AF: "Əfqanıstan",
    AG: "Antiqua və Barbuda",
    AI: "Angilya",
    AL: "Albaniya",
    AM: "Ermənistan",
    AO: "Anqola",
    AQ: "Antarktika",
    AR: "Argentina",
    AS: "Amerika Samoası",
    AT: "Avstriya",
    AU: "Avstraliya",
    AW: "Aruba",
    AX: "Aland adaları",
    AZ: "Azərbaycan",
    BA: "Bosniya və Herseqovina",
    BB: "Barbados",
    BD: "Banqladeş",
    BE: "Belçika",
    BF: "Burkina Faso",
    BG: "Bolqarıstan",
    BH: "Bəhreyn",
    BI: "Burundi",
    BJ: "Benin",
    BL: "Sent-Bartelemi",
    BM: "Bermud adaları",
    BN: "Bruney",
    BO: "Boliviya",
    BQ: "Karib Niderlandı",
    BR: "Braziliya",
    BS: "Baham adaları",
    BT: "Butan",
    BV: "Buve adası",
    BW: "Botsvana",
    BY: "Belarus",
    BZ: "Beliz",
    CA: "Kanada",
    CC: "Kokos (Kilinq) adaları",
    CD: "Konqo - Kinşasa",
    CF: "Mərkəzi Afrika Respublikası",
    CG: "Konqo - Brazzavil",
    CH: "İsveçrə",
    CI: "Kotd’ivuar",
    CK: "Kuk adaları",
    CL: "Çili",
    CM: "Kamerun",
    CN: "Çin",
    CO: "Kolumbiya",
    CR: "Kosta Rika",
    CU: "Kuba",
    CV: "Kabo-Verde",
    CW: "Kurasao",
    CX: "Milad adası",
    CY: "Kipr",
    CZ: "Çex Respublikası",
    DE: "Almaniya",
    DJ: "Cibuti",
    DK: "Danimarka",
    DM: "Dominika",
    DO: "Dominikan Respublikası",
    DZ: "Əlcəzair",
    EC: "Ekvador",
    EE: "Estoniya",
    EG: "Misir",
    EH: "Qərbi Saxara",
    ER: "Eritreya",
    ES: "İspaniya",
    ET: "Efiopiya",
    FI: "Finlandiya",
    FJ: "Fici",
    FK: "Folklend adaları",
    FM: "Mikroneziya",
    FO: "Farer adaları",
    FR: "Fransa",
    GA: "Qabon",
    GB: "Birləşmiş Krallıq",
    GD: "Qrenada",
    GE: "Gürcüstan",
    GF: "Fransa Qvianası",
    GG: "Gernsi",
    GH: "Qana",
    GI: "Cəbəllütariq",
    GL: "Qrenlandiya",
    GM: "Qambiya",
    GN: "Qvineya",
    GP: "Qvadelupa",
    GQ: "Ekvatorial Qvineya",
    GR: "Yunanıstan",
    GS: "Cənubi Corciya və Cənubi Sendviç adaları",
    GT: "Qvatemala",
    GU: "Quam",
    GW: "Qvineya-Bisau",
    GY: "Qayana",
    HK: "Honq Konq",
    HM: "Herd və Makdonald adaları",
    HN: "Honduras",
    HR: "Xorvatiya",
    HT: "Haiti",
    HU: "Macarıstan",
    ID: "İndoneziya",
    IE: "İrlandiya",
    IL: "İsrail",
    IM: "Men adası",
    IN: "Hindistan",
    IO: "Britaniyanın Hind Okeanı Ərazisi",
    IQ: "İraq",
    IR: "İran",
    IS: "İslandiya",
    IT: "İtaliya",
    JE: "Cersi",
    JM: "Yamayka",
    JO: "İordaniya",
    JP: "Yaponiya",
    KE: "Keniya",
    KG: "Qırğızıstan",
    KH: "Kamboca",
    KI: "Kiribati",
    KM: "Komor adaları",
    KN: "Sent-Kits və Nevis",
    KP: "Şimali Koreya",
    KR: "Cənubi Koreya",
    KW: "Küveyt",
    KY: "Kayman adaları",
    KZ: "Qazaxıstan",
    LA: "Laos",
    LB: "Livan",
    LC: "Sent-Lusiya",
    LI: "Lixtenşteyn",
    LK: "Şri-Lanka",
    LR: "Liberiya",
    LS: "Lesoto",
    LT: "Litva",
    LU: "Lüksemburq",
    LV: "Latviya",
    LY: "Liviya",
    MA: "Mərakeş",
    MC: "Monako",
    MD: "Moldova",
    ME: "Monteneqro",
    MF: "Sent Martin",
    MG: "Madaqaskar",
    MH: "Marşal adaları",
    MK: "Makedoniya",
    ML: "Mali",
    MM: "Myanma",
    MN: "Monqolustan",
    MO: "Makao",
    MP: "Şimali Marian adaları",
    MQ: "Martinik",
    MR: "Mavritaniya",
    MS: "Monserat",
    MT: "Malta",
    MU: "Mavriki",
    MV: "Maldiv adaları",
    MW: "Malavi",
    MX: "Meksika",
    MY: "Malayziya",
    MZ: "Mozambik",
    NA: "Namibiya",
    NC: "Yeni Kaledoniya",
    NE: "Niger",
    NF: "Norfolk adası",
    NG: "Nigeriya",
    NI: "Nikaraqua",
    NL: "Niderland",
    NO: "Norveç",
    NP: "Nepal",
    NR: "Nauru",
    NU: "Niue",
    NZ: "Yeni Zelandiya",
    OM: "Oman",
    PA: "Panama",
    PE: "Peru",
    PF: "Fransa Polineziyası",
    PG: "Papua-Yeni Qvineya",
    PH: "Filippin",
    PK: "Pakistan",
    PL: "Polşa",
    PM: "Müqəddəs Pyer və Mikelon",
    PN: "Pitkern adaları",
    PR: "Puerto Riko",
    PS: "Fələstin Əraziləri",
    PT: "Portuqaliya",
    PW: "Palau",
    PY: "Paraqvay",
    QA: "Qətər",
    RE: "Reyunyon",
    RO: "Rumıniya",
    RS: "Serbiya",
    RU: "Rusiya",
    RW: "Ruanda",
    SA: "Səudiyyə Ərəbistanı",
    SB: "Solomon adaları",
    SC: "Seyşel adaları",
    SD: "Sudan",
    SE: "İsveç",
    SG: "Sinqapur",
    SH: "Müqəddəs Yelena",
    SI: "Sloveniya",
    SJ: "Svalbard və Yan-Mayen",
    SK: "Slovakiya",
    SL: "Syerra-Leone",
    SM: "San-Marino",
    SN: "Seneqal",
    SO: "Somali",
    SR: "Surinam",
    SS: "Cənubi Sudan",
    ST: "San-Tome və Prinsipi",
    SV: "Salvador",
    SX: "Sint-Marten",
    SY: "Suriya",
    SZ: "Svazilend",
    TC: "Törks və Kaykos adaları",
    TD: "Çad",
    TF: "Fransanın Cənub Əraziləri",
    TG: "Toqo",
    TH: "Tailand",
    TJ: "Tacikistan",
    TK: "Tokelau",
    TL: "Şərqi Timor",
    TM: "Türkmənistan",
    TN: "Tunis",
    TO: "Tonqa",
    TR: "Türkiyə",
    TT: "Trinidad və Tobaqo",
    TV: "Tuvalu",
    TW: "Tayvan",
    TZ: "Tanzaniya",
    UA: "Ukrayna",
    UG: "Uqanda",
    UM: "ABŞ-a bağlı kiçik adacıqlar",
    US: "Amerika Birləşmiş Ştatları",
    UY: "Uruqvay",
    UZ: "Özbəkistan",
    VA: "Vatikan",
    VC: "Sent-Vinsent və Qrenadinlər",
    VE: "Venesuela",
    VG: "Britaniyanın Virgin adaları",
    VI: "ABŞ Virgin adaları",
    VN: "Vyetnam",
    VU: "Vanuatu",
    WF: "Uollis və Futuna",
    WS: "Samoa",
    XK: "Kosovo",
    YE: "Yəmən",
    YT: "Mayot",
    ZA: "Cənub Afrika",
    ZM: "Zambiya",
    ZW: "Zimbabve"
  };
  var az = {
    locale: locale$1,
    countries: countries$1
  };

  var az$1 = /*#__PURE__*/Object.freeze({
    locale: locale$1,
    countries: countries$1,
    default: az
  });

  var locale$2 = "be";
  var countries$2 = {
    AD: "Андора",
    AE: "Аб’яднаныя Арабскія Эміраты",
    AF: "Афганістан",
    AG: "Антыгуа і Барбуда",
    AI: "Ангілья",
    AL: "Албанія",
    AM: "Арменія",
    AO: "Ангола",
    AQ: "Антарктыка",
    AR: "Аргенціна",
    AS: "Амерыканскае Самоа",
    AT: "Аўстрыя",
    AU: "Аўстралія",
    AW: "Аруба",
    AX: "Аландскія астравы",
    AZ: "Азербайджан",
    BA: "Боснія і Герцагавіна",
    BB: "Барбадас",
    BD: "Бангладэш",
    BE: "Бельгія",
    BF: "Буркіна-Фасо",
    BG: "Балгарыя",
    BH: "Бахрэйн",
    BI: "Бурундзі",
    BJ: "Бенін",
    BL: "Сен-Бартэльмі",
    BM: "Бермудскія астравы",
    BN: "Бруней",
    BO: "Балівія",
    BQ: "Карыбскія Нідэрланды",
    BR: "Бразілія",
    BS: "Багамы",
    BT: "Бутан",
    BV: "Востраў Бувэ",
    BW: "Батсвана",
    BY: "Беларусь",
    BZ: "Беліз",
    CA: "Канада",
    CC: "Какосавыя (Кілінг) астравы",
    CD: "Конга (Кіншаса)",
    CF: "Цэнтральнаафрыканская Рэспубліка",
    CG: "Конга - Бразавіль",
    CH: "Швейцарыя",
    CI: "Кот-д’Івуар",
    CK: "Астравы Кука",
    CL: "Чылі",
    CM: "Камерун",
    CN: "Кітай",
    CO: "Калумбія",
    CR: "Коста-Рыка",
    CU: "Куба",
    CV: "Каба-Вердэ",
    CW: "Кюрасаа",
    CX: "Востраў Каляд",
    CY: "Кіпр",
    CZ: "Чэхія",
    DE: "Германія",
    DJ: "Джыбуці",
    DK: "Данія",
    DM: "Дамініка",
    DO: "Дамініканская Рэспубліка",
    DZ: "Алжыр",
    EC: "Эквадор",
    EE: "Эстонія",
    EG: "Егіпет",
    EH: "Заходняя Сахара",
    ER: "Эрытрэя",
    ES: "Іспанія",
    ET: "Эфіопія",
    FI: "Фінляндыя",
    FJ: "Фіджы",
    FK: "Фалклендскія астравы",
    FM: "Мікранезія",
    FO: "Фарэрскія астравы",
    FR: "Францыя",
    GA: "Габон",
    GB: "Вялікабрытанія",
    GD: "Грэнада",
    GE: "Грузія",
    GF: "Французская Гвіяна",
    GG: "Гернсі",
    GH: "Гана",
    GI: "Гібралтар",
    GL: "Грэнландыя",
    GM: "Гамбія",
    GN: "Гвінея",
    GP: "Гвадэлупа",
    GQ: "Экватарыяльная Гвінея",
    GR: "Грэцыя",
    GS: "Паўднёвая Джорджыя і Паўднёвыя Сандвічавы астравы",
    GT: "Гватэмала",
    GU: "Гуам",
    GW: "Гвінея-Бісау",
    GY: "Гаяна",
    HK: "Ганконг, САР (Кітай)",
    HM: "Астравы Херд і Макдональд",
    HN: "Гандурас",
    HR: "Харватыя",
    HT: "Гаіці",
    HU: "Венгрыя",
    ID: "Інданезія",
    IE: "Ірландыя",
    IL: "Ізраіль",
    IM: "Востраў Мэн",
    IN: "Індыя",
    IO: "Брытанская тэрыторыя ў Індыйскім акіяне",
    IQ: "Ірак",
    IR: "Іран",
    IS: "Ісландыя",
    IT: "Італія",
    JE: "Джэрсі",
    JM: "Ямайка",
    JO: "Іарданія",
    JP: "Японія",
    KE: "Кенія",
    KG: "Кыргызстан",
    KH: "Камбоджа",
    KI: "Кірыбаці",
    KM: "Каморскія Астравы",
    KN: "Сент-Кітс і Невіс",
    KP: "Паўночная Карэя",
    KR: "Паўднёвая Карэя",
    KW: "Кувейт",
    KY: "Кайманавы астравы",
    KZ: "Казахстан",
    LA: "Лаос",
    LB: "Ліван",
    LC: "Сент-Люсія",
    LI: "Ліхтэнштэйн",
    LK: "Шры-Ланка",
    LR: "Ліберыя",
    LS: "Лесота",
    LT: "Літва",
    LU: "Люксембург",
    LV: "Латвія",
    LY: "Лівія",
    MA: "Марока",
    MC: "Манака",
    MD: "Малдова",
    ME: "Чарнагорыя",
    MF: "Сен-Мартэн",
    MG: "Мадагаскар",
    MH: "Маршалавы Астравы",
    MK: "Македонія",
    ML: "Малі",
    MM: "М’янма (Бірма)",
    MN: "Манголія",
    MO: "Макаа, САР (Кітай)",
    MP: "Паўночныя Марыянскія астравы",
    MQ: "Марцініка",
    MR: "Маўрытанія",
    MS: "Мантсерат",
    MT: "Мальта",
    MU: "Маўрыкій",
    MV: "Мальдывы",
    MW: "Малаві",
    MX: "Мексіка",
    MY: "Малайзія",
    MZ: "Мазамбік",
    NA: "Намібія",
    NC: "Новая Каледонія",
    NE: "Нігер",
    NF: "Востраў Норфалк",
    NG: "Нігерыя",
    NI: "Нікарагуа",
    NL: "Нідэрланды",
    NO: "Нарвегія",
    NP: "Непал",
    NR: "Науру",
    NU: "Ніуэ",
    NZ: "Новая Зеландыя",
    OM: "Аман",
    PA: "Панама",
    PE: "Перу",
    PF: "Французская Палінезія",
    PG: "Папуа-Новая Гвінея",
    PH: "Філіпіны",
    PK: "Пакістан",
    PL: "Польшча",
    PM: "Сен-П’ер і Мікелон",
    PN: "Астравы Піткэрн",
    PR: "Пуэрта-Рыка",
    PS: "Палесцінскія Тэрыторыі",
    PT: "Партугалія",
    PW: "Палау",
    PY: "Парагвай",
    QA: "Катар",
    RE: "Рэюньён",
    RO: "Румынія",
    RS: "Сербія",
    RU: "Расія",
    RW: "Руанда",
    SA: "Саудаўская Аравія",
    SB: "Саламонавы Астравы",
    SC: "Сейшэльскія Астравы",
    SD: "Судан",
    SE: "Швецыя",
    SG: "Сінгапур",
    SH: "Востраў Святой Алены",
    SI: "Славенія",
    SJ: "Шпіцберген і Ян-Маен",
    SK: "Славакія",
    SL: "Сьера-Леонэ",
    SM: "Сан-Марына",
    SN: "Сенегал",
    SO: "Самалі",
    SR: "Сурынам",
    SS: "Паўднёвы Судан",
    ST: "Сан-Тамэ і Прынсіпі",
    SV: "Сальвадор",
    SX: "Сінт-Мартэн",
    SY: "Сірыя",
    SZ: "Свазіленд",
    TC: "Цёркс і Кайкас",
    TD: "Чад",
    TF: "Французскія Паўднёвыя тэрыторыі",
    TG: "Тога",
    TH: "Тайланд",
    TJ: "Таджыкістан",
    TK: "Такелау",
    TL: "Тымор-Лешці",
    TM: "Туркменістан",
    TN: "Туніс",
    TO: "Тонга",
    TR: "Турцыя",
    TT: "Трынідад і Табага",
    TV: "Тувалу",
    TW: "Тайвань",
    TZ: "Танзанія",
    UA: "Украіна",
    UG: "Уганда",
    UM: "Малыя Аддаленыя астравы ЗША",
    US: "Злучаныя Штаты Амерыкі",
    UY: "Уругвай",
    UZ: "Узбекістан",
    VA: "Ватыкан",
    VC: "Сент-Вінсент і Грэнадзіны",
    VE: "Венесуэла",
    VG: "Брытанскія Віргінскія астравы",
    VI: "Амерыканскія Віргінскія астравы",
    VN: "В’етнам",
    VU: "Вануату",
    WF: "Уоліс і Футуна",
    WS: "Самоа",
    XK: "Косава",
    YE: "Емен",
    YT: "Маёта",
    ZA: "Паўднёваафрыканская Рэспубліка",
    ZM: "Замбія",
    ZW: "Зімбабвэ"
  };
  var be = {
    locale: locale$2,
    countries: countries$2
  };

  var be$1 = /*#__PURE__*/Object.freeze({
    locale: locale$2,
    countries: countries$2,
    default: be
  });

  var locale$3 = "bg";
  var countries$3 = {
    AD: "Андора",
    AE: "Обединени арабски емирства",
    AF: "Афганистан",
    AG: "Антигуа и Барбуда",
    AI: "Ангуила",
    AL: "Албания",
    AM: "Армения",
    AO: "Ангола",
    AQ: "Антарктика",
    AR: "Аржентина",
    AS: "Американска Самоа",
    AT: "Австрия",
    AU: "Австралия",
    AW: "Аруба",
    AX: "Оландски острови",
    AZ: "Азербайджан",
    BA: "Босна и Херцеговина",
    BB: "Барбадос",
    BD: "Бангладеш",
    BE: "Белгия",
    BF: "Буркина Фасо",
    BG: "България",
    BH: "Бахрейн",
    BI: "Бурунди",
    BJ: "Бенин",
    BL: "Сен Бартелеми",
    BM: "Бермуда",
    BN: "Бруней Даруссалам",
    BO: "Боливия",
    BQ: "Карибска Нидерландия",
    BR: "Бразилия",
    BS: "Бахами",
    BT: "Бутан",
    BV: "остров Буве",
    BW: "Ботсвана",
    BY: "Беларус",
    BZ: "Белиз",
    CA: "Канада",
    CC: "Кокосови острови (острови Кийлинг)",
    CD: "Конго (Киншаса)",
    CF: "Централноафриканска република",
    CG: "Конго (Бразавил)",
    CH: "Швейцария",
    CI: "Кот д’Ивоар",
    CK: "острови Кук",
    CL: "Чили",
    CM: "Камерун",
    CN: "Китай",
    CO: "Колумбия",
    CR: "Коста Рика",
    CU: "Куба",
    CV: "Кабо Верде",
    CW: "Кюрасао",
    CX: "остров Рождество",
    CY: "Кипър",
    CZ: "Чехия",
    DE: "Германия",
    DJ: "Джибути",
    DK: "Дания",
    DM: "Доминика",
    DO: "Доминиканска република",
    DZ: "Алжир",
    EC: "Еквадор",
    EE: "Естония",
    EG: "Египет",
    EH: "Западна Сахара",
    ER: "Еритрея",
    ES: "Испания",
    ET: "Етиопия",
    FI: "Финландия",
    FJ: "Фиджи",
    FK: "Фолклендски острови",
    FM: "Микронезия",
    FO: "Фарьорски острови",
    FR: "Франция",
    GA: "Габон",
    GB: "Обединеното кралство",
    GD: "Гренада",
    GE: "Грузия",
    GF: "Френска Гвиана",
    GG: "Гърнзи",
    GH: "Гана",
    GI: "Гибралтар",
    GL: "Гренландия",
    GM: "Гамбия",
    GN: "Гвинея",
    GP: "Гваделупа",
    GQ: "Екваториална Гвинея",
    GR: "Гърция",
    GS: "Южна Джорджия и Южни Сандвичеви острови",
    GT: "Гватемала",
    GU: "Гуам",
    GW: "Гвинея-Бисау",
    GY: "Гаяна",
    HK: "Хонконг, САР на Китай",
    HM: "остров Хърд и острови Макдоналд",
    HN: "Хондурас",
    HR: "Хърватия",
    HT: "Хаити",
    HU: "Унгария",
    ID: "Индонезия",
    IE: "Ирландия",
    IL: "Израел",
    IM: "остров Ман",
    IN: "Индия",
    IO: "Британска територия в Индийския океан",
    IQ: "Ирак",
    IR: "Иран",
    IS: "Исландия",
    IT: "Италия",
    JE: "Джърси",
    JM: "Ямайка",
    JO: "Йордания",
    JP: "Япония",
    KE: "Кения",
    KG: "Киргизстан",
    KH: "Камбоджа",
    KI: "Кирибати",
    KM: "Коморски острови",
    KN: "Сейнт Китс и Невис",
    KP: "Северна Корея",
    KR: "Южна Корея",
    KW: "Кувейт",
    KY: "Кайманови острови",
    KZ: "Казахстан",
    LA: "Лаос",
    LB: "Ливан",
    LC: "Сейнт Лусия",
    LI: "Лихтенщайн",
    LK: "Шри Ланка",
    LR: "Либерия",
    LS: "Лесото",
    LT: "Литва",
    LU: "Люксембург",
    LV: "Латвия",
    LY: "Либия",
    MA: "Мароко",
    MC: "Монако",
    MD: "Молдова",
    ME: "Черна гора",
    MF: "Сен Мартен",
    MG: "Мадагаскар",
    MH: "Маршалови острови",
    MK: "Македония",
    ML: "Мали",
    MM: "Мианмар (Бирма)",
    MN: "Монголия",
    MO: "Макао, САР на Китай",
    MP: "Северни Мариански острови",
    MQ: "Мартиника",
    MR: "Мавритания",
    MS: "Монтсерат",
    MT: "Малта",
    MU: "Мавриций",
    MV: "Малдиви",
    MW: "Малави",
    MX: "Мексико",
    MY: "Малайзия",
    MZ: "Мозамбик",
    NA: "Намибия",
    NC: "Нова Каледония",
    NE: "Нигер",
    NF: "остров Норфолк",
    NG: "Нигерия",
    NI: "Никарагуа",
    NL: "Нидерландия",
    NO: "Норвегия",
    NP: "Непал",
    NR: "Науру",
    NU: "Ниуе",
    NZ: "Нова Зеландия",
    OM: "Оман",
    PA: "Панама",
    PE: "Перу",
    PF: "Френска Полинезия",
    PG: "Папуа-Нова Гвинея",
    PH: "Филипини",
    PK: "Пакистан",
    PL: "Полша",
    PM: "Сен Пиер и Микелон",
    PN: "Острови Питкерн",
    PR: "Пуерто Рико",
    PS: "Палестински територии",
    PT: "Португалия",
    PW: "Палау",
    PY: "Парагвай",
    QA: "Катар",
    RE: "Реюнион",
    RO: "Румъния",
    RS: "Сърбия",
    RU: "Русия",
    RW: "Руанда",
    SA: "Саудитска Арабия",
    SB: "Соломонови острови",
    SC: "Сейшели",
    SD: "Судан",
    SE: "Швеция",
    SG: "Сингапур",
    SH: "Света Елена",
    SI: "Словения",
    SJ: "Свалбард и Ян Майен",
    SK: "Словакия",
    SL: "Сиера Леоне",
    SM: "Сан Марино",
    SN: "Сенегал",
    SO: "Сомалия",
    SR: "Суринам",
    SS: "Южен Судан",
    ST: "Сао Томе и Принсипи",
    SV: "Салвадор",
    SX: "Синт Мартен",
    SY: "Сирия",
    SZ: "Свазиленд",
    TC: "острови Търкс и Кайкос",
    TD: "Чад",
    TF: "Френски южни територии",
    TG: "Того",
    TH: "Тайланд",
    TJ: "Таджикистан",
    TK: "Токелау",
    TL: "Източен Тимор",
    TM: "Туркменистан",
    TN: "Тунис",
    TO: "Тонга",
    TR: "Турция",
    TT: "Тринидад и Тобаго",
    TV: "Тувалу",
    TW: "Тайван",
    TZ: "Танзания",
    UA: "Украйна",
    UG: "Уганда",
    UM: "Отдалечени острови на САЩ",
    US: "Съединени щати",
    UY: "Уругвай",
    UZ: "Узбекистан",
    VA: "Ватикан",
    VC: "Сейнт Винсънт и Гренадини",
    VE: "Венецуела",
    VG: "Британски Вирджински острови",
    VI: "Американски Вирджински острови",
    VN: "Виетнам",
    VU: "Вануату",
    WF: "Уолис и Футуна",
    WS: "Самоа",
    XK: "Косово",
    YE: "Йемен",
    YT: "Майот",
    ZA: "Южна Африка",
    ZM: "Замбия",
    ZW: "Зимбабве"
  };
  var bg = {
    locale: locale$3,
    countries: countries$3
  };

  var bg$1 = /*#__PURE__*/Object.freeze({
    locale: locale$3,
    countries: countries$3,
    default: bg
  });

  var locale$4 = "bs";
  var countries$4 = {
    AD: "Andora",
    AE: "Ujedinjeni Arapski Emirati",
    AF: "Afganistan",
    AG: "Antigva i Barbuda",
    AI: "Angvila",
    AL: "Albanija",
    AM: "Armenija",
    AO: "Angola",
    AQ: "Antarktika",
    AR: "Argentina",
    AS: "Američka Samoa",
    AT: "Austrija",
    AU: "Australija",
    AW: "Aruba",
    AX: "Olandska Ostrva",
    AZ: "Azerbejdžan",
    BA: "Bosna i Hercegovina",
    BB: "Barbados",
    BD: "Bangladeš",
    BE: "Belgija",
    BF: "Burkina Faso",
    BG: "Bugarska",
    BH: "Bahrein",
    BI: "Burundi",
    BJ: "Benin",
    BL: "Sveti Bartolomej",
    BM: "Bermuda",
    BN: "Brunej",
    BO: "Bolivija",
    BQ: "Karipska Holandija",
    BR: "Brazil",
    BS: "Bahami",
    BT: "Butan",
    BV: "Ostrvo Buve",
    BW: "Bocvana",
    BY: "Bjelorusija",
    BZ: "Belize",
    CA: "Kanada",
    CC: "Kokosova (Kilingova) Ostrva",
    CD: "Demokratska Republika Kongo",
    CF: "Centralnoafrička Republika",
    CG: "Kongo",
    CH: "Švicarska",
    CI: "Obala Slonovače",
    CK: "Kukova Ostrva",
    CL: "Čile",
    CM: "Kamerun",
    CN: "Kina",
    CO: "Kolumbija",
    CR: "Kostarika",
    CU: "Kuba",
    CV: "Kape Verde",
    CW: "Kurasao",
    CX: "Božićna Ostrva",
    CY: "Kipar",
    CZ: "Češka",
    DE: "Njemačka",
    DJ: "Džibuti",
    DK: "Danska",
    DM: "Dominika",
    DO: "Dominikanska Republika",
    DZ: "Alžir",
    EC: "Ekvador",
    EE: "Estonija",
    EG: "Egipat",
    EH: "Zapadna Sahara",
    ER: "Eritreja",
    ES: "Španija",
    ET: "Etiopija",
    FI: "Finska",
    FJ: "Fidži",
    FK: "Folklandska Ostrva",
    FM: "Mikronezija",
    FO: "Farska Ostrva",
    FR: "Francuska",
    GA: "Gabon",
    GB: "Velika Britanija",
    GD: "Grenada",
    GE: "Gruzija",
    GF: "Francuska Gvajana",
    GG: "Gernzi",
    GH: "Gana",
    GI: "Gibraltar",
    GL: "Grenland",
    GM: "Gambija",
    GN: "Gvineja",
    GP: "Gvadalupe",
    GQ: "Ekvatorijalna Gvineja",
    GR: "Grčka",
    GS: "Južna Džordžija i Južna Sendvička Ostrva",
    GT: "Gvatemala",
    GU: "Guam",
    GW: "Gvineja-Bisao",
    GY: "Gvajana",
    HK: "Hong Kong (SAR Kina)",
    HM: "Herd i arhipelag MekDonald",
    HN: "Honduras",
    HR: "Hrvatska",
    HT: "Haiti",
    HU: "Mađarska",
    ID: "Indonezija",
    IE: "Irska",
    IL: "Izrael",
    IM: "Ostrvo Man",
    IN: "Indija",
    IO: "Britanska Teritorija u Indijskom Okeanu",
    IQ: "Irak",
    IR: "Iran",
    IS: "Island",
    IT: "Italija",
    JE: "Džerzi",
    JM: "Jamajka",
    JO: "Jordan",
    JP: "Japan",
    KE: "Kenija",
    KG: "Kirgistan",
    KH: "Kambodža",
    KI: "Kiribati",
    KM: "Komorska Ostrva",
    KN: "Sveti Kits i Nevis",
    KP: "Sjeverna Koreja",
    KR: "Južna Koreja",
    KW: "Kuvajt",
    KY: "Kajmanska Ostrva",
    KZ: "Kazahstan",
    LA: "Laos",
    LB: "Liban",
    LC: "Sveta Lucija",
    LI: "Lihtenštajn",
    LK: "Šri Lanka",
    LR: "Liberija",
    LS: "Lesoto",
    LT: "Litvanija",
    LU: "Luksemburg",
    LV: "Latvija",
    LY: "Libija",
    MA: "Maroko",
    MC: "Monako",
    MD: "Moldavija",
    ME: "Crna Gora",
    MF: "Sv. Martin",
    MG: "Madagaskar",
    MH: "Maršalova Ostrva",
    MK: "Makedonija",
    ML: "Mali",
    MM: "Mijanmar",
    MN: "Mongolija",
    MO: "Makao (SAR Kina)",
    MP: "Sjeverna Marijanska Ostrva",
    MQ: "Martinik",
    MR: "Mauritanija",
    MS: "Monserat",
    MT: "Malta",
    MU: "Mauricijus",
    MV: "Maldivi",
    MW: "Malavi",
    MX: "Meksiko",
    MY: "Malezija",
    MZ: "Mozambik",
    NA: "Namibija",
    NC: "Nova Kaledonija",
    NE: "Niger",
    NF: "Ostrvo Norfolk",
    NG: "Nigerija",
    NI: "Nikaragva",
    NL: "Holandija",
    NO: "Norveška",
    NP: "Nepal",
    NR: "Nauru",
    NU: "Niue",
    NZ: "Novi Zeland",
    OM: "Oman",
    PA: "Panama",
    PE: "Peru",
    PF: "Francuska Polinezija",
    PG: "Papua Nova Gvineja",
    PH: "Filipini",
    PK: "Pakistan",
    PL: "Poljska",
    PM: "Sveti Petar i Mikelon",
    PN: "Pitkernska Ostrva",
    PR: "Porto Riko",
    PS: "Palestinska Teritorija",
    PT: "Portugal",
    PW: "Palau",
    PY: "Paragvaj",
    QA: "Katar",
    RE: "Reunion",
    RO: "Rumunija",
    RS: "Srbija",
    RU: "Rusija",
    RW: "Ruanda",
    SA: "Saudijska Arabija",
    SB: "Solomonska Ostrva",
    SC: "Sejšeli",
    SD: "Sudan",
    SE: "Švedska",
    SG: "Singapur",
    SH: "Sveta Helena",
    SI: "Slovenija",
    SJ: "Svalbard i Jan Majen",
    SK: "Slovačka",
    SL: "Sijera Leone",
    SM: "San Marino",
    SN: "Senegal",
    SO: "Somalija",
    SR: "Surinam",
    SS: "Južni Sudan",
    ST: "Sao Tome i Principe",
    SV: "Salvador",
    SX: "Sint Marten",
    SY: "Sirija",
    SZ: "Svazilend",
    TC: "Ostrva Turks i Kaikos",
    TD: "Čad",
    TF: "Francuske Južne Teritorije",
    TG: "Togo",
    TH: "Tajland",
    TJ: "Tadžikistan",
    TK: "Tokelau",
    TL: "Istočni Timor",
    TM: "Turkmenistan",
    TN: "Tunis",
    TO: "Tonga",
    TR: "Turska",
    TT: "Trinidad i Tobago",
    TV: "Tuvalu",
    TW: "Tajvan",
    TZ: "Tanzanija",
    UA: "Ukrajina",
    UG: "Uganda",
    UM: "Američka Vanjska Ostrva",
    US: "Sjedinjene Američke Države",
    UY: "Urugvaj",
    UZ: "Uzbekistan",
    VA: "Vatikan",
    VC: "Sveti Vinsent i Grenadin",
    VE: "Venecuela",
    VG: "Britanska Djevičanska Ostrva",
    VI: "Američka Djevičanska Ostrva",
    VN: "Vijetnam",
    VU: "Vanuatu",
    WF: "Ostrva Valis i Futuna",
    WS: "Samoa",
    XK: "Kosovo",
    YE: "Jemen",
    YT: "Majote",
    ZA: "Južnoafrička Republika",
    ZM: "Zambija",
    ZW: "Zimbabve"
  };
  var bs = {
    locale: locale$4,
    countries: countries$4
  };

  var bs$1 = /*#__PURE__*/Object.freeze({
    locale: locale$4,
    countries: countries$4,
    default: bs
  });

  var locale$5 = "ca";
  var countries$5 = {
    AF: "Afganistan",
    AX: "Åland, illes",
    AL: "Albània",
    DE: "Alemanya",
    DZ: "Algèria",
    AD: "Andorra",
    AO: "Angola",
    AI: "Anguilla",
    AQ: "Antàrtida",
    AG: "Antigua i Barbuda",
    SA: "Aràbia Saudita",
    AR: "Argentina",
    AM: "Armènia",
    AW: "Aruba",
    AU: "Austràlia",
    AT: "Àustria",
    AZ: "Azerbaidjan",
    BS: "Bahames",
    BH: "Bahrain",
    BD: "Bangla Desh",
    BB: "Barbados",
    BE: "Bèlgica",
    BZ: "Belize",
    BJ: "Benín",
    BM: "Bermudes",
    BT: "Bhutan",
    BY: "Bielorússia",
    BO: "Bolívia",
    BQ: "Bonaire, Sint Eustatius i Saba",
    BA: "Bòsnia i Hercegovina",
    BW: "Botswana",
    BV: "Bouvet",
    BR: "Brasil",
    BN: "Brunei",
    BG: "Bulgària",
    BF: "Burkina Faso",
    BI: "Burundi",
    KY: "Caiman, illes",
    KH: "Cambodja",
    CM: "Camerun",
    CA: "Canadà",
    CV: "Cap Verd",
    CF: "Centreafricana, República",
    CX: "Christmas, illa",
    CC: "Cocos, illes",
    CO: "Colòmbia",
    KM: "Comores",
    CG: "Congo, República del",
    CD: "Congo, República Democràtica del",
    CK: "Cook, illes",
    KP: "Corea del Nord",
    KR: "Corea del Sud",
    CI: "Costa d'Ivori",
    CR: "Costa Rica",
    HR: "Croàcia",
    CU: "Cuba",
    CW: "Curaçao",
    DK: "Dinamarca",
    DJ: "Djibouti",
    DM: "Dominica",
    DO: "Dominicana, República",
    EG: "Egipte",
    EC: "Equador",
    AE: "Emirats Àrabs Units",
    ER: "Eritrea",
    SK: "Eslovàquia",
    SI: "Eslovènia",
    ES: "Espanya",
    US: "Estats Units (EUA)",
    EE: "Estònia",
    ET: "Etiòpia",
    FO: "Fèroe, illes",
    FJ: "Fiji",
    PH: "Filipines",
    FI: "Finlàndia",
    FR: "França",
    GA: "Gabon",
    GM: "Gàmbia",
    GE: "Geòrgia",
    GS: "Geòrgia del Sud i Sandwich del Sud, illes",
    GH: "Ghana",
    GI: "Gibraltar",
    GR: "Grècia",
    GD: "Grenada",
    GL: "Groenlàndia",
    GP: "Guadeloupe",
    GF: "Guaiana Francesa",
    GU: "Guam",
    GT: "Guatemala",
    GG: "Guernsey",
    GN: "República de Guinea",
    GW: "Guinea Bissau",
    GQ: "Guinea Equatorial",
    GY: "Guyana",
    HT: "Haití",
    HM: "Heard, illa i McDonald, illes",
    HN: "Hondures",
    HK: "Hong Kong",
    HU: "Hongria",
    YE: "Iemen",
    IM: "Illa de Man",
    UM: "Illes Perifèriques Menors dels EUA",
    IN: "Índia",
    ID: "Indonèsia",
    IR: "Iran",
    IQ: "Iraq",
    IE: "Irlanda",
    IS: "Islàndia",
    IL: "Israel",
    IT: "Itàlia",
    JM: "Jamaica",
    JP: "Japó",
    JE: "Jersey",
    JO: "Jordània",
    KZ: "Kazakhstan",
    KE: "Kenya",
    KG: "Kirguizistan",
    KI: "Kiribati",
    KW: "Kuwait",
    LA: "Laos",
    LS: "Lesotho",
    LV: "Letònia",
    LB: "Líban",
    LR: "Libèria",
    LY: "Líbia",
    LI: "Liechtenstein",
    LT: "Lituània",
    LU: "Luxemburg",
    MO: "Macau",
    MK: "Macedònia",
    MG: "Madagascar",
    MY: "Malàisia",
    MW: "Malawi",
    MV: "Maldives",
    ML: "Mali",
    MT: "Malta",
    FK: "Malvines, illes",
    MP: "Mariannes Septentrionals, illes",
    MA: "Marroc",
    MH: "Marshall, illes",
    MQ: "Martinica",
    MU: "Maurici",
    MR: "Mauritània",
    YT: "Mayotte",
    MX: "Mèxic",
    FM: "Micronèsia, Estats Federats de",
    MZ: "Moçambic",
    MD: "Moldàvia",
    MC: "Mònaco",
    MN: "Mongòlia",
    ME: "Montenegro",
    MS: "Montserrat",
    MM: "Myanmar",
    NA: "Namíbia",
    NR: "Nauru",
    NP: "Nepal",
    NI: "Nicaragua",
    NE: "Níger",
    NG: "Nigèria",
    NU: "Niue",
    NF: "Norfolk, illa",
    NO: "Noruega",
    NC: "Nova Caledònia",
    NZ: "Nova Zelanda",
    OM: "Oman",
    NL: "Països Baixos",
    PK: "Pakistan",
    PW: "Palau",
    PS: "Palestina",
    PA: "Panamà",
    PG: "Papua Nova Guinea",
    PY: "Paraguai",
    PE: "Perú",
    PN: "Pitcairn, illes",
    PF: "Polinèsia Francesa",
    PL: "Polònia",
    PT: "Portugal",
    PR: "Puerto Rico",
    QA: "Qatar",
    GB: "Regne Unit",
    RE: "Reunió, illa de la",
    RO: "Romania",
    RU: "Rússia",
    RW: "Ruanda",
    EH: "Sàhara Occidental",
    KN: "Saint Kitts i Nevis",
    LC: "Saint Lucia",
    PM: "Saint-Pierre i Miquelon",
    VC: "Saint Vincent i les Grenadines",
    BL: "Saint-Barthélemy",
    MF: "Saint-Martin",
    SB: "Salomó",
    SV: "Salvador, El",
    WS: "Samoa",
    AS: "Samoa Nord-americana",
    SM: "San Marino",
    SH: "Santa Helena",
    ST: "São Tomé i Príncipe",
    SN: "Senegal",
    RS: "Sèrbia",
    SC: "Seychelles",
    SL: "Sierra Leone",
    SG: "Singapur",
    SX: "Sint Maarten",
    SY: "Síria",
    SO: "Somàlia",
    LK: "Sri Lanka",
    ZA: "Sud-àfrica",
    SD: "Sudan",
    SS: "Sudan del Sud",
    SE: "Suècia",
    CH: "Suïssa",
    SR: "Surinam",
    SJ: "Svalbard i Jan Mayen",
    SZ: "Swazilàndia",
    TJ: "Tadjikistan",
    TH: "Tailàndia",
    TW: "Taiwan",
    TZ: "Tanzània",
    IO: "Territori Britànic de l'Oceà Índic",
    TF: "Territoris Francesos del Sud",
    TL: "Timor Oriental",
    TG: "Togo",
    TK: "Tokelau",
    TO: "Tonga",
    TT: "Trinitat i Tobago",
    TN: "Tunísia",
    TM: "Turkmenistan",
    TC: "Turks i Caicos, illes",
    TR: "Turquia",
    TV: "Tuvalu",
    TD: "Txad",
    CZ: "Txèquia",
    UA: "Ucraïna",
    UG: "Uganda",
    UY: "Uruguai",
    UZ: "Uzbekistan",
    VU: "Vanuatu",
    VA: "Vaticà, Ciutat del",
    VE: "Veneçuela",
    VG: "Verges Britàniques, illes",
    VI: "Verges Nord-americanes, illes",
    VN: "Vietnam",
    WF: "Wallis i Futuna",
    CL: "Xile",
    CN: "Xina",
    CY: "Xipre",
    ZM: "Zàmbia",
    ZW: "Zimbabwe",
    XK: "Kosovo"
  };
  var ca = {
    locale: locale$5,
    countries: countries$5
  };

  var ca$1 = /*#__PURE__*/Object.freeze({
    locale: locale$5,
    countries: countries$5,
    default: ca
  });

  var locale$6 = "cs";
  var countries$6 = {
    AF: "Afghánistán",
    AX: "Ålandy",
    AL: "Albánie",
    DZ: "Alžírsko",
    AS: "Americká Samoa",
    VI: "Americké Panenské ostrovy",
    AD: "Andorra",
    AO: "Angola",
    AI: "Anguilla",
    AQ: "Antarktida",
    AG: "Antigua a Barbuda",
    AR: "Argentina",
    AM: "Arménie",
    AW: "Aruba",
    AU: "Austrálie",
    AZ: "Ázerbájdžán",
    BS: "Bahamy",
    BH: "Bahrajn",
    BD: "Bangladéš",
    BB: "Barbados",
    BE: "Belgie",
    BZ: "Belize",
    BY: "Bělorusko",
    BJ: "Benin",
    BM: "Bermudy",
    BT: "Bhútán",
    BO: "Bolívie",
    BQ: "Bonaire, Svatý Eustach a Saba",
    BA: "Bosna a Hercegovina",
    BW: "Botswana",
    BV: "Bouvetův ostrov",
    BR: "Brazílie",
    IO: "Britské indickooceánské území",
    VG: "Britské Panenské ostrovy",
    BN: "Brunej",
    BG: "Bulharsko",
    BF: "Burkina Faso",
    BI: "Burundi",
    CK: "Cookovy ostrovy",
    CW: "Curaçao",
    TD: "Čad",
    ME: "Černá Hora",
    CZ: "Česko",
    CN: "Čína",
    DK: "Dánsko",
    CD: "Demokratická republika Kongo",
    DM: "Dominika",
    DO: "Dominikánská republika",
    DJ: "Džibutsko",
    EG: "Egypt",
    EC: "Ekvádor",
    ER: "Eritrea",
    EE: "Estonsko",
    ET: "Etiopie",
    FO: "Faerské ostrovy",
    FK: "Falklandy (Malvíny)",
    FJ: "Fidži",
    PH: "Filipíny",
    FI: "Finsko",
    FR: "Francie",
    GF: "Francouzská Guyana",
    TF: "Francouzská jižní a antarktická území",
    PF: "Francouzská Polynésie",
    GA: "Gabon",
    GM: "Gambie",
    GH: "Ghana",
    GI: "Gibraltar",
    GD: "Grenada",
    GL: "Grónsko",
    GE: "Gruzie",
    GP: "Guadeloupe",
    GU: "Guam",
    GT: "Guatemala",
    GN: "Guinea",
    GW: "Guinea-Bissau",
    GG: "Guernsey",
    GY: "Guyana",
    HT: "Haiti",
    HM: "Heardův ostrov a McDonaldovy ostrovy",
    HN: "Honduras",
    HK: "Hongkong",
    CL: "Chile",
    HR: "Chorvatsko",
    IN: "Indie",
    ID: "Indonésie",
    IQ: "Irák",
    IR: "Írán",
    IE: "Irsko",
    IS: "Island",
    IT: "Itálie",
    IL: "Izrael",
    JM: "Jamajka",
    JP: "Japonsko",
    YE: "Jemen",
    JE: "Jersey",
    ZA: "Jihoafrická republika",
    GS: "Jižní Georgie a Jižní Sandwichovy ostrovy",
    KR: "Jižní Korea",
    SS: "Jižní Súdán",
    JO: "Jordánsko",
    KY: "Kajmanské ostrovy",
    KH: "Kambodža",
    CM: "Kamerun",
    CA: "Kanada",
    CV: "Kapverdy",
    QA: "Katar",
    KZ: "Kazachstán",
    KE: "Keňa",
    KI: "Kiribati",
    CC: "Kokosové ostrovy",
    CO: "Kolumbie",
    KM: "Komory",
    CG: "Kongo",
    CR: "Kostarika",
    CU: "Kuba",
    KW: "Kuvajt",
    CY: "Kypr",
    KG: "Kyrgyzstán",
    LA: "Laos",
    LS: "Lesotho",
    LB: "Libanon",
    LR: "Libérie",
    LY: "Libye",
    LI: "Lichtenštejnsko",
    LT: "Litva",
    LV: "Lotyšsko",
    LU: "Lucembursko",
    MO: "Macao",
    MG: "Madagaskar",
    HU: "Maďarsko",
    MK: "Makedonie",
    MY: "Malajsie",
    MW: "Malawi",
    MV: "Maledivy",
    ML: "Mali",
    MT: "Malta",
    IM: "Ostrov Man",
    MA: "Maroko",
    MH: "Marshallovy ostrovy",
    MQ: "Martinik",
    MU: "Mauricius",
    MR: "Mauritánie",
    YT: "Mayotte",
    UM: "Menší odlehlé ostrovy USA",
    MX: "Mexiko",
    FM: "Mikronésie",
    MD: "Moldavsko",
    MC: "Monako",
    MN: "Mongolsko",
    MS: "Montserrat",
    MZ: "Mosambik",
    MM: "Myanmar",
    NA: "Namibie",
    NR: "Nauru",
    DE: "Německo",
    NP: "Nepál",
    NE: "Niger",
    NG: "Nigérie",
    NI: "Nikaragua",
    NU: "Niue",
    NL: "Nizozemsko",
    NF: "Norfolk",
    NO: "Norsko",
    NC: "Nová Kaledonie",
    NZ: "Nový Zéland",
    OM: "Omán",
    PK: "Pákistán",
    PW: "Palau",
    PS: "Palestinská autonomie",
    PA: "Panama",
    PG: "Papua-Nová Guinea",
    PY: "Paraguay",
    PE: "Peru",
    PN: "Pitcairnovy ostrovy",
    CI: "Pobřeží slonoviny",
    PL: "Polsko",
    PR: "Portoriko",
    PT: "Portugalsko",
    AT: "Rakousko",
    RE: "Réunion",
    GQ: "Rovníková Guinea",
    RO: "Rumunsko",
    RU: "Rusko",
    RW: "Rwanda",
    GR: "Řecko",
    PM: "Saint-Pierre a Miquelon",
    SV: "Salvador",
    WS: "Samoa",
    SM: "San Marino",
    SA: "Saúdská Arábie",
    SN: "Senegal",
    KP: "Severní Korea",
    MP: "Severní Mariany",
    SC: "Seychely",
    SL: "Sierra Leone",
    SG: "Singapur",
    SK: "Slovensko",
    SI: "Slovinsko",
    SO: "Somálsko",
    AE: "Spojené arabské emiráty",
    GB: "Spojené království",
    US: "Spojené státy americké",
    RS: "Srbsko",
    CF: "Středoafrická republika",
    SD: "Súdán",
    SR: "Surinam",
    SH: "Svatá Helena, Ascension a Tristan da Cunha",
    LC: "Svatá Lucie",
    BL: "Svatý Bartoloměj",
    KN: "Svatý Kryštof a Nevis",
    MF: "Svatý Martin (francouzská část)",
    SX: "Svatý Martin (nizozemská část)",
    ST: "Svatý Tomáš a Princův ostrov",
    VC: "Svatý Vincenc a Grenadiny",
    SZ: "Svazijsko",
    SY: "Sýrie",
    SB: "Šalamounovy ostrovy",
    ES: "Španělsko",
    SJ: "Špicberky a Jan Mayen",
    LK: "Šrí Lanka",
    SE: "Švédsko",
    CH: "Švýcarsko",
    TJ: "Tádžikistán",
    TZ: "Tanzanie",
    TH: "Thajsko",
    TW: "Tchaj-wan",
    TG: "Togo",
    TK: "Tokelau",
    TO: "Tonga",
    TT: "Trinidad a Tobago",
    TN: "Tunisko",
    TR: "Turecko",
    TM: "Turkmenistán",
    TC: "Turks a Caicos",
    TV: "Tuvalu",
    UG: "Uganda",
    UA: "Ukrajina",
    UY: "Uruguay",
    UZ: "Uzbekistán",
    CX: "Vánoční ostrov",
    VU: "Vanuatu",
    VA: "Vatikán",
    VE: "Venezuela",
    VN: "Vietnam",
    TL: "Východní Timor",
    WF: "Wallis a Futuna",
    ZM: "Zambie",
    EH: "Západní Sahara",
    ZW: "Zimbabwe",
    XK: "Kosovo"
  };
  var cs = {
    locale: locale$6,
    countries: countries$6
  };

  var cs$1 = /*#__PURE__*/Object.freeze({
    locale: locale$6,
    countries: countries$6,
    default: cs
  });

  var locale$7 = "da";
  var countries$7 = {
    AF: "Afghanistan",
    AL: "Albanien",
    DZ: "Algeriet",
    AS: "Amerikansk Samoa",
    AD: "Andorra",
    AO: "Angola",
    AI: "Anguilla",
    AQ: "Antarktis",
    AG: "Antigua og Barbuda",
    AR: "Argentina",
    AM: "Armenien",
    AW: "Aruba",
    AU: "Australien",
    AT: "Østrig",
    AZ: "Aserbajdsjan",
    BS: "Bahamas",
    BH: "Bahrain",
    BD: "Bangladesh",
    BB: "Barbados",
    BY: "Hviderusland",
    BE: "Belgien",
    BZ: "Belize",
    BJ: "Benin",
    BM: "Bermuda",
    BT: "Bhutan",
    BO: "Bolivia",
    BA: "Bosnien-Hercegovina",
    BW: "Botswana",
    BV: "Bouvet Island",
    BR: "Brasilien",
    IO: "British Indian Ocean Territory",
    BN: "Brunei Darussalam",
    BG: "Bulgarien",
    BF: "Burkina Faso",
    BI: "Burundi",
    KH: "Cambodja",
    CM: "Cameroun",
    CA: "Canada",
    CV: "Kap Verde",
    KY: "Caymanøerne",
    CF: "Den Centralafrikanske Republik",
    TD: "Tchad",
    CL: "Chile",
    CN: "Kina",
    CX: "Juløen",
    CC: "Cocosøerne",
    CO: "Colombia",
    KM: "Comorerne",
    CG: "Congo",
    CD: "Demokratiske Republik Congo",
    CK: "Cookøerne",
    CR: "Costa Rica",
    CI: "Elfenbenskysten",
    HR: "Kroatien",
    CU: "Cuba",
    CY: "Cypern",
    CZ: "Tjekkiet",
    DK: "Danmark",
    DJ: "Djibouti",
    DM: "Dominica",
    DO: "Dominikanske Republik",
    EC: "Ecuador",
    EG: "Egypten",
    SV: "El Salvador",
    GQ: "Ækvatorialguinea",
    ER: "Eritrea",
    EE: "Estland",
    ET: "Etiopien",
    FK: "Falklandsøerne",
    FO: "Færøerne",
    FJ: "Fiji",
    FI: "Finland",
    FR: "Frankrig",
    GF: "Fransk Guiana",
    PF: "Fransk Polynesien",
    TF: "Franske Sydterritorier",
    GA: "Gabon",
    GM: "Gambia",
    GE: "Georgien",
    DE: "Tyskland",
    GH: "Ghana",
    GI: "Gibraltar",
    GR: "Grækenland",
    GL: "Grønland",
    GD: "Grenada",
    GP: "Guadeloupe",
    GU: "Guam",
    GT: "Guatemala",
    GN: "Guinea",
    GW: "Guinea-Bissau",
    GY: "Guyana",
    HT: "Haiti",
    HM: "Heard-øen og McDonald-øerne",
    VA: "Vatikanstaten",
    HN: "Honduras",
    HK: "Hong Kong",
    HU: "Ungarn",
    IS: "Island",
    IN: "Indien",
    ID: "Indonesien",
    IR: "Iran",
    IQ: "Irak",
    IE: "Irland",
    IL: "Israel",
    IT: "Italien",
    JM: "Jamaica",
    JP: "Japan",
    JO: "Jordan",
    KZ: "Kazakhstan",
    KE: "Kenya",
    KI: "Kiribati",
    KP: "Nordkorea",
    KR: "Sydkorea",
    KW: "Kuwait",
    KG: "Kirgisistan",
    LA: "Laos",
    LV: "Letland",
    LB: "Libanon",
    LS: "Lesotho",
    LR: "Liberia",
    LY: "Libyen",
    LI: "Liechtenstein",
    LT: "Litauen",
    LU: "Luxembourg",
    MO: "Macao",
    MK: "Makedonien",
    MG: "Madagaskar",
    MW: "Malawi",
    MY: "Malaysia",
    MV: "Maldiverne",
    ML: "Mali",
    MT: "Malta",
    MH: "Marshalløerne",
    MQ: "Martinique",
    MR: "Mauretanien",
    MU: "Mauritius",
    YT: "Mayotte",
    MX: "Mexico",
    FM: "Mikronesien",
    MD: "Moldova",
    MC: "Monaco",
    MN: "Mongoliet",
    MS: "Montserrat",
    MA: "Marokko",
    MZ: "Mozambique",
    MM: "Myanmar (Burma)",
    NA: "Namibia",
    NR: "Nauru",
    NP: "Nepal",
    NL: "Holland",
    NC: "Ny Kaledonien",
    NZ: "New Zealand",
    NI: "Nicaragua",
    NE: "Niger",
    NG: "Nigeria",
    NU: "Niue",
    NF: "Norfolk Island",
    MP: "Nordmarianerne",
    NO: "Norge",
    OM: "Oman",
    PK: "Pakistan",
    PW: "Palau",
    PS: "Palæstina",
    PA: "Panama",
    PG: "Papua Ny Guinea",
    PY: "Paraguay",
    PE: "Peru",
    PH: "Filippinerne",
    PN: "Pitcairn",
    PL: "Polen",
    PT: "Portugal",
    PR: "Puerto Rico",
    QA: "Qatar",
    RE: "Réunion",
    RO: "Rumænien",
    RU: "Rusland",
    RW: "Rwanda",
    SH: "Sankt Helena",
    KN: "Saint Kitts og Nevis",
    LC: "Saint Lucia",
    PM: "Saint-Pierre og Miquelon",
    VC: "Saint Vincent og Grenadinerne",
    WS: "Samoa",
    SM: "San Marino",
    ST: "São Tomé og Príncipe",
    SA: "Saudi-Arabien",
    SN: "Senegal",
    SC: "Seychellerne",
    SL: "Sierra Leone",
    SG: "Singapore",
    SK: "Slovakiet",
    SI: "Slovenien",
    SB: "Salomonøerne",
    SO: "Somalia",
    ZA: "Sydafrika",
    GS: "South Georgia og South Sandwich Islands",
    ES: "Spanien",
    LK: "Sri Lanka",
    SD: "Sudan",
    SR: "Surinam",
    SJ: "Norge Svalbard og Jan Mayen",
    SZ: "Swaziland",
    SE: "Sverige",
    CH: "Schweiz",
    SY: "Syrien",
    TW: "Republikken Kina Taiwan",
    TJ: "Tadsjikistan",
    TZ: "Tanzania",
    TH: "Thailand",
    TL: "Østtimor",
    TG: "Togo",
    TK: "Tokelau",
    TO: "Tonga",
    TT: "Trinidad og Tobago",
    TN: "Tunesien",
    TR: "Tyrkiet",
    TM: "Turkmenistan",
    TC: "Turks- og Caicosøerne",
    TV: "Tuvalu",
    UG: "Uganda",
    UA: "Ukraine",
    AE: "Forenede Arabiske Emirater",
    GB: "Storbritannien",
    US: "USA",
    UM: "USA's ydre småøer",
    UY: "Uruguay",
    UZ: "Usbekistan",
    VU: "Vanuatu",
    VE: "Venezuela",
    VN: "Vietnam",
    VG: "Britiske Jomfruøer",
    VI: "Amerikanske Jomfruøer",
    WF: "Wallis og Futuna",
    EH: "Vestsahara",
    YE: "Yemen",
    ZM: "Zambia",
    ZW: "Zimbabwe",
    AX: "Ålandsøerne",
    BQ: "Nederlandske Antiller",
    CW: "Curaçao",
    GG: "Guernsey",
    IM: "Isle of Man",
    JE: "Jersey",
    ME: "Montenegro",
    BL: "Saint-Barthélemy",
    MF: "Saint Martin (fransk side)",
    RS: "Serbien",
    SX: "Saint Martin (hollandsk side)",
    SS: "Sydsudan",
    XK: "Kosovo"
  };
  var da = {
    locale: locale$7,
    countries: countries$7
  };

  var da$1 = /*#__PURE__*/Object.freeze({
    locale: locale$7,
    countries: countries$7,
    default: da
  });

  var locale$8 = "de";
  var countries$8 = {
    AF: "Afghanistan",
    EG: "Ägypten",
    AX: "Åland",
    AL: "Albanien",
    DZ: "Algerien",
    AS: "Amerikanisch-Samoa",
    VI: "Amerikanische Jungferninseln",
    AD: "Andorra",
    AO: "Angola",
    AI: "Anguilla",
    AQ: "Antarktika",
    AG: "Antigua und Barbuda",
    GQ: "Äquatorialguinea",
    AR: "Argentinien",
    AM: "Armenien",
    AW: "Aruba",
    AZ: "Aserbaidschan",
    ET: "Äthiopien",
    AU: "Australien",
    BS: "Bahamas",
    BH: "Bahrain",
    BD: "Bangladesch",
    BB: "Barbados",
    BY: "Weißrussland",
    BE: "Belgien",
    BZ: "Belize",
    BJ: "Benin",
    BM: "Bermuda",
    BT: "Bhutan",
    BO: "Bolivien",
    BQ: "Bonaire",
    BA: "Bosnien und Herzegowina",
    BW: "Botswana",
    BV: "Bouvetinsel",
    BR: "Brasilien",
    VG: "Britische Jungferninseln",
    IO: "Britisches Territorium im Indischen Ozean",
    BN: "Brunei Darussalam",
    BG: "Bulgarien",
    BF: "Burkina Faso",
    BI: "Burundi",
    CL: "Chile",
    CN: "China",
    CK: "Cookinseln",
    CR: "Costa Rica",
    CI: "Elfenbeinküste",
    CW: "Curaçao",
    DK: "Dänemark",
    DE: "Deutschland",
    DM: "Dominica",
    DO: "Dominikanische Republik",
    DJ: "Dschibuti",
    EC: "Ecuador",
    SV: "El Salvador",
    ER: "Eritrea",
    EE: "Estland",
    FK: "Falklandinseln",
    FO: "Färöer",
    FJ: "Fidschi",
    FI: "Finnland",
    FR: "Frankreich",
    GF: "Französisch-Guayana",
    PF: "Französisch-Polynesien",
    TF: "Französische Süd- und Antarktisgebiete",
    GA: "Gabun",
    GM: "Gambia",
    GE: "Georgien",
    GH: "Ghana",
    GI: "Gibraltar",
    GD: "Grenada",
    GR: "Griechenland",
    GL: "Grönland",
    GP: "Guadeloupe",
    GU: "Guam",
    GT: "Guatemala",
    GG: "Guernsey",
    GN: "Guinea",
    GW: "Guinea-Bissau",
    GY: "Guyana",
    HT: "Haiti",
    HM: "Heard und McDonaldinseln",
    HN: "Honduras",
    HK: "Hongkong",
    IN: "Indien",
    ID: "Indonesien",
    IM: "Insel Man",
    IQ: "Irak",
    IR: "Iran",
    IE: "Irland",
    IS: "Island",
    IL: "Israel",
    IT: "Italien",
    JM: "Jamaika",
    JP: "Japan",
    YE: "Jemen",
    JE: "Jersey",
    JO: "Jordanien",
    KY: "Kaimaninseln",
    KH: "Kambodscha",
    CM: "Kamerun",
    CA: "Kanada",
    CV: "Kap Verde",
    KZ: "Kasachstan",
    QA: "Katar",
    KE: "Kenia",
    KG: "Kirgisistan",
    KI: "Kiribati",
    CC: "Kokosinseln",
    CO: "Kolumbien",
    KM: "Komoren",
    CD: "Kongo",
    KP: "Nordkorea",
    KR: "Südkorea",
    HR: "Kroatien",
    CU: "Kuba",
    KW: "Kuwait",
    LA: "Laos",
    LS: "Lesotho",
    LV: "Lettland",
    LB: "Libanon",
    LR: "Liberia",
    LY: "Libyen",
    LI: "Liechtenstein",
    LT: "Litauen",
    LU: "Luxemburg",
    MO: "Macao",
    MG: "Madagaskar",
    MW: "Malawi",
    MY: "Malaysia",
    MV: "Malediven",
    ML: "Mali",
    MT: "Malta",
    MA: "Marokko",
    MH: "Marshallinseln",
    MQ: "Martinique",
    MR: "Mauretanien",
    MU: "Mauritius",
    YT: "Mayotte",
    MK: "Mazedonien",
    MX: "Mexiko",
    FM: "Mikronesien",
    MD: "Moldawien",
    MC: "Monaco",
    MN: "Mongolei",
    ME: "Montenegro",
    MS: "Montserrat",
    MZ: "Mosambik",
    MM: "Myanmar",
    NA: "Namibia",
    NR: "Nauru",
    NP: "Nepal",
    NC: "Neukaledonien",
    NZ: "Neuseeland",
    NI: "Nicaragua",
    NL: "Niederlande",
    NE: "Niger",
    NG: "Nigeria",
    NU: "Niue",
    MP: "Nördliche Marianen",
    NF: "Norfolkinsel",
    NO: "Norwegen",
    OM: "Oman",
    AT: "Österreich",
    TL: "Osttimor",
    PK: "Pakistan",
    PS: "Staat Palästina",
    PW: "Palau",
    PA: "Panama",
    PG: "Papua-Neuguinea",
    PY: "Paraguay",
    PE: "Peru",
    PH: "Philippinen",
    PN: "Pitcairninseln",
    PL: "Polen",
    PT: "Portugal",
    PR: "Puerto Rico",
    TW: "Taiwan",
    CG: "Republik Kongo",
    RE: "Réunion",
    RW: "Ruanda",
    RO: "Rumänien",
    RU: "Russische Föderation",
    BL: "Saint-Barthélemy",
    MF: "Saint-Martin",
    SB: "Salomonen",
    ZM: "Sambia",
    WS: "Samoa",
    SM: "San Marino",
    ST: "São Tomé und Príncipe",
    SA: "Saudi-Arabien",
    SE: "Schweden",
    CH: "Schweiz",
    SN: "Senegal",
    RS: "Serbien",
    SC: "Seychellen",
    SL: "Sierra Leone",
    ZW: "Simbabwe",
    SG: "Singapur",
    SX: "Sint Maarten",
    SK: "Slowakei",
    SI: "Slowenien",
    SO: "Somalia",
    ES: "Spanien",
    LK: "Sri Lanka",
    SH: "St. Helena",
    KN: "St. Kitts und Nevis",
    LC: "St. Lucia",
    PM: "Saint-Pierre und Miquelon",
    VC: "St. Vincent und die Grenadinen",
    ZA: "Südafrika",
    SD: "Sudan",
    GS: "Südgeorgien und die Südlichen Sandwichinseln",
    SS: "Südsudan",
    SR: "Suriname",
    SJ: "Svalbard und Jan Mayen",
    SZ: "Swasiland",
    SY: "Syrien, Arabische Republik",
    TJ: "Tadschikistan",
    TZ: "Tansania, Vereinigte Republik",
    TH: "Thailand",
    TG: "Togo",
    TK: "Tokelau",
    TO: "Tonga",
    TT: "Trinidad und Tobago",
    TD: "Tschad",
    CZ: "Tschechische Republik",
    TN: "Tunesien",
    TR: "Türkei",
    TM: "Turkmenistan",
    TC: "Turks- und Caicosinseln",
    TV: "Tuvalu",
    UG: "Uganda",
    UA: "Ukraine",
    HU: "Ungarn",
    UM: "United States Minor Outlying Islands",
    UY: "Uruguay",
    UZ: "Usbekistan",
    VU: "Vanuatu",
    VA: "Vatikanstadt",
    VE: "Venezuela",
    AE: "Vereinigte Arabische Emirate",
    US: "Vereinigte Staaten von Amerika",
    GB: "Vereinigtes Königreich",
    VN: "Vietnam",
    WF: "Wallis und Futuna",
    CX: "Weihnachtsinsel",
    EH: "Westsahara",
    CF: "Zentralafrikanische Republik",
    CY: "Zypern",
    XK: "Kosovo"
  };
  var de = {
    locale: locale$8,
    countries: countries$8
  };

  var de$1 = /*#__PURE__*/Object.freeze({
    locale: locale$8,
    countries: countries$8,
    default: de
  });

  var locale$9 = "el";
  var countries$9 = {
    AF: "Αφγανιστάν",
    AL: "Αλβανία",
    DZ: "Αλγερία",
    AS: "Αμερικανική Σαμόα",
    AD: "Ανδόρρα",
    AO: "Ανγκόλα",
    AI: "Ανγκουίλα",
    AQ: "Ανταρκτική",
    AG: "Αντίγκουα και Μπαρμπούντα",
    AR: "Αργεντινή",
    AM: "Αρμενία",
    AW: "Αρούμπα",
    AU: "Αυστραλία",
    AT: "Αυστρία",
    AZ: "Αζερμπαϊτζάν",
    BS: "Μπαχάμες",
    BH: "Μπαχρέιν",
    BD: "Μπανγκλαντές",
    BB: "Μπαρμπάντος",
    BY: "Λευκορωσία",
    BE: "Βέλγιο",
    BZ: "Μπελίζ",
    BJ: "Μπενίν",
    BM: "Βερμούδες",
    BT: "Μπουτάν",
    BO: "Βολιβία",
    BA: "Βοσνία και Ερζεγοβίνη",
    BW: "Μποτσουάνα",
    BV: "Μπουβέ",
    BR: "Βραζιλία",
    IO: "Βρετανικό Έδαφος Ινδικού Ωκεανού",
    BN: "Σουλτανάτο του Μπρουνέι",
    BG: "Βουλγαρία",
    BF: "Μπουρκίνα Φάσο",
    BI: "Μπουρουντί",
    KH: "Καμπότζη",
    CM: "Καμερούν",
    CA: "Καναδάς",
    CV: "Δημοκρατία του Πράσινου Ακρωτηρίου",
    KY: "Κέιμαν Νήσοι",
    CF: "Κεντροαφρικανική Δημοκρατίαc",
    TD: "Τσάντ",
    CL: "Χιλή",
    CN: "Κίνα",
    CX: "Νήσος των Χριστουγέννων",
    CC: "Νησιά Κόκος",
    CO: "Κολομβία",
    KM: "Ένωση των Κομορών",
    CG: "Δημοκρατία του Κονγκό",
    CD: "Λαϊκή Δημοκρατία του Κονγκό",
    CK: "Νήσοι Κουκ",
    CR: "Κόστα Ρίκα",
    CI: "Ακτή Ελεφαντοστού",
    HR: "Κροατία",
    CU: "Κούβα",
    CY: "Κύπρος",
    CZ: "Τσεχική Δημοκρατία",
    DK: "Δανία",
    DJ: "Τζιμπουτί",
    DM: "Κοινοπολιτεία της Δομινίκας",
    DO: "Δομινικανή Δημοκρατία",
    EC: "Εκουαδόρ",
    EG: "Αίγυπτος",
    SV: "Ελ Σαλβαδόρ",
    GQ: "Ισημερινή-Γουινέα",
    ER: "Κράτος της Ερυθραίας",
    EE: "Εσθονία",
    ET: "Αιθιοπία",
    FK: "Νήσοι Φώκλαντ (Μαλβίνας)",
    FO: "Νήσοι Φερόες",
    FJ: "Δημοκρατία των Φίτζι",
    FI: "Φινλανδία",
    FR: "Γαλλία",
    GF: "Γαλλική Γουιάνα",
    PF: "Γαλλική Πολυνησία",
    TF: "Γαλλικά Νότια και Ανταρκτικά Εδάφη",
    GA: "Γκαμπόν",
    GM: "Γκάμπια",
    GE: "Γεωργία",
    DE: "Γερμανία",
    GH: "Γκάνα",
    GI: "Γιβραλτάρ",
    GR: "Ελλάδα",
    GL: "Γροιλανδία",
    GD: "Γρενάδα",
    GP: "Γουαδελούπη",
    GU: "Γκουάμ",
    GT: "Γουατεμάλα",
    GN: "Γουινέα",
    GW: "Γουινέα-Μπισσάου",
    GY: "Γουιάνα",
    HT: "Αϊτη",
    HM: "Νήσοι Χερντ και Μακντόναλντ",
    VA: "Κράτος της Πόλης του Βατικανού",
    HN: "Ονδούρα",
    HK: "Χονγκ Κόνγκ",
    HU: "Ουγγαρία",
    IS: "Ισλανδία",
    IN: "Ινδία",
    ID: "Ινδονησία",
    IR: "Ισλαμική Δημοκρατία του Ιράν",
    IQ: "Ιράκ",
    IE: "Ιρλανδία",
    IL: "Ισραήλ",
    IT: "Ιταλία",
    JM: "Τζαμάικα",
    JP: "Ιαπωνία",
    JO: "Ιορδανία",
    KZ: "Καζακστάν",
    KE: "Κένυα",
    KI: "Κιριμπάτι",
    KP: "Λαοκρατική Δημοκρατία της Κορέας",
    KR: "Δημοκρατία της Κορέας",
    KW: "Κουβέιτ",
    KG: "Κιργιζία",
    LA: "Λαϊκή Δημοκρατία του Λάος",
    LV: "Λετονία",
    LB: "Λίβανο",
    LS: "Βασίλειο του Λεσότο",
    LR: "Λιβερία",
    LY: "Κράτος της Λιβύης",
    LI: "Πριγκιπάτο του Λίχτενσταϊν",
    LT: "Λιθουανία",
    LU: "Λουξεμβούργο",
    MO: "Μακάου",
    MK: "πρώην Γιουγκοσλαβική Δημοκρατία της Μακεδονίας",
    MG: "Μαδαγασκάρη",
    MW: "Μαλάουι",
    MY: "Μαλαισία",
    MV: "Μαλβίδες",
    ML: "Μαλί",
    MT: "Μάλτα",
    MH: "Νήσοι Μάρσαλ",
    MQ: "Μαρτινίκα",
    MR: "Μαυριτανία",
    MU: "Μαυρίκιος",
    YT: "Μαγιότ",
    MX: "Μεξικό",
    FM: "Ομόσπονδες Πολιτείες της Μικρονησίας",
    MD: "Δημοκρατία της Μολδαβίας",
    MC: "Πριγκιπάτο του Μονακό",
    MN: "Μογγολία",
    MS: "Μοντσερράτ",
    MA: "Μαρόκο",
    MZ: "Μοζαμβίκη",
    MM: "Μιανμάρ",
    NA: "Ναμίμπια",
    NR: "Ναουρού",
    NP: "Νεπάλ",
    NL: "Ολλανδία",
    NC: "Νέα Καληδονία",
    NZ: "Νέα Ζηλανδία",
    NI: "Νικαράγουα",
    NE: "Νίγηρας",
    NG: "Νιγηρία",
    NU: "Νιούε",
    NF: "Νησί Νόρφολκ",
    MP: "Βόρειες Μαριάνες Νήσοι",
    NO: "Νορβηγία",
    OM: "Ομάν",
    PK: "Πακιστάν",
    PW: "Παλάου",
    PS: "Κράτος της Παλαιστίνης",
    PA: "Παναμάς",
    PG: "Παπούα Νέα Γουινέα",
    PY: "Παραγουάη",
    PE: "Περού",
    PH: "Φιλιππίνες",
    PN: "Νήσοι Πίτκαιρν",
    PL: "Πολωνία",
    PT: "Πορτογαλία",
    PR: "Πουέρτο Ρίκο",
    QA: "Κατάρ",
    RE: "Ρεϋνιόν",
    RO: "Ρουμανία",
    RU: "Ρωσική Ομοσπονδία",
    RW: "Ρουάντα",
    SH: "Νήσος Αγίας Ελένης",
    KN: "Ομοσπονδία Αγίου Χριστόφορου και Νέβις",
    LC: "Αγία Λουκία",
    PM: "Σαιν Πιερ και Μικελόν",
    VC: "Άγιος Βικέντιος και Γρεναδίνες",
    WS: "Σαμόα",
    SM: "Άγιος Μαρίνος",
    ST: "Σάο Τομέ και Πρίνσιπε",
    SA: "Σαουδική Αραβία",
    SN: "Σενεγάλη",
    SC: "Σεϋχέλλες",
    SL: "Σιέρα Λεόνε",
    SG: "Σιγκαπούρη",
    SK: "Σλοβακία",
    SI: "Σλοβενία",
    SB: "Νήσοι Σολομώντα",
    SO: "Σομαλία",
    ZA: "Νότια Αφρική",
    GS: "Νότιος Γεωργία και Νότιοι Σάντουιτς Νήσοι",
    ES: "Ισπανία",
    LK: "Σρι Λάνκα",
    SD: "Σουδάν",
    SR: "Σουρινάμ",
    SJ: "Σβάλμπαρντ και Γιαν Μαγιέν",
    SZ: "Σουαζιλάνδη",
    SE: "Σουηδία",
    CH: "Ελβετία",
    SY: "Αραβική Δημοκρατία της Συρίας",
    TW: "Δημοκρατία της Κίνας",
    TJ: "Τατζικιστάν",
    TZ: "Ενωμένη Δημοκρατία της Τανζανίας",
    TH: "Ταϊλάνδη",
    TL: "Ανατολικό Τιμόρ",
    TG: "Τογκό",
    TK: "Τοκελάου",
    TO: "Τόνγκα",
    TT: "Τρινιντάντ και Τομπάγκο",
    TN: "Τυνησία",
    TR: "Τουρκία",
    TM: "Τουρκμενιστάν",
    TC: "Τερκς και Κέικος",
    TV: "Τουβαλού",
    UG: "Ουγκάντα",
    UA: "Ουκρανια",
    AE: "Ηνωμένα Αραβικά Εμιράτα",
    GB: "Ηνωμένο Βασίλειο",
    US: "Ηνωμένες Πολιτείες Αμερικής",
    UM: "Απομακρυσμένες Νησίδες των Ηνωμένων Πολιτειών",
    UY: "Ουρουγουάη",
    UZ: "Ουζμπεκιστάν",
    VU: "Βανουάτου",
    VE: "Βενεζουέλα",
    VN: "Βιετνάμ",
    VG: "Βρετανικές Παρθένοι Νήσοι",
    VI: "Αμερικανικές Παρθένοι Νήσοι",
    WF: "Ουαλίς και Φουτουνά",
    EH: "Δυτική Σαχάρα",
    YE: "Υεμένη",
    ZM: "Ζάμπια",
    ZW: "Ζιμπάμπουε",
    AX: "Νήσοι Ώλαντ",
    BQ: "Μποναίρ, Άγιος Ευστάθιος και Σάμπα",
    CW: "Κουρασάο",
    GG: "Γκουέρνσεϊ",
    IM: "Νήσος του Μαν",
    JE: "Βαϊλάτο του Τζέρσεϊ",
    ME: "Μαυροβούνιο",
    BL: "Άγιος Βαρθολομαίος",
    MF: "Άγιος Μαρτίνος (Γαλλία)",
    RS: "Σερβία",
    SX: "Άγιος Μαρτίνος (Ολλανδία)",
    SS: "Νότιο Σουδάν",
    XK: "Κόσοβο"
  };
  var el = {
    locale: locale$9,
    countries: countries$9
  };

  var el$1 = /*#__PURE__*/Object.freeze({
    locale: locale$9,
    countries: countries$9,
    default: el
  });

  var locale$a = "en";
  var countries$a = {
    AF: "Afghanistan",
    AL: "Albania",
    DZ: "Algeria",
    AS: "American Samoa",
    AD: "Andorra",
    AO: "Angola",
    AI: "Anguilla",
    AQ: "Antarctica",
    AG: "Antigua and Barbuda",
    AR: "Argentina",
    AM: "Armenia",
    AW: "Aruba",
    AU: "Australia",
    AT: "Austria",
    AZ: "Azerbaijan",
    BS: "Bahamas",
    BH: "Bahrain",
    BD: "Bangladesh",
    BB: "Barbados",
    BY: "Belarus",
    BE: "Belgium",
    BZ: "Belize",
    BJ: "Benin",
    BM: "Bermuda",
    BT: "Bhutan",
    BO: "Bolivia",
    BA: "Bosnia and Herzegovina",
    BW: "Botswana",
    BV: "Bouvet Island",
    BR: "Brazil",
    IO: "British Indian Ocean Territory",
    BN: "Brunei Darussalam",
    BG: "Bulgaria",
    BF: "Burkina Faso",
    BI: "Burundi",
    KH: "Cambodia",
    CM: "Cameroon",
    CA: "Canada",
    CV: "Cape Verde",
    KY: "Cayman Islands",
    CF: "Central African Republic",
    TD: "Chad",
    CL: "Chile",
    CN: "China",
    CX: "Christmas Island",
    CC: "Cocos (Keeling) Islands",
    CO: "Colombia",
    KM: "Comoros",
    CG: "Congo",
    CD: "Congo, the Democratic Republic of the",
    CK: "Cook Islands",
    CR: "Costa Rica",
    CI: "Cote D'Ivoire",
    HR: "Croatia",
    CU: "Cuba",
    CY: "Cyprus",
    CZ: "Czech Republic",
    DK: "Denmark",
    DJ: "Djibouti",
    DM: "Dominica",
    DO: "Dominican Republic",
    EC: "Ecuador",
    EG: "Egypt",
    SV: "El Salvador",
    GQ: "Equatorial Guinea",
    ER: "Eritrea",
    EE: "Estonia",
    ET: "Ethiopia",
    FK: "Falkland Islands (Malvinas)",
    FO: "Faroe Islands",
    FJ: "Fiji",
    FI: "Finland",
    FR: "France",
    GF: "French Guiana",
    PF: "French Polynesia",
    TF: "French Southern Territories",
    GA: "Gabon",
    GM: "Gambia",
    GE: "Georgia",
    DE: "Germany",
    GH: "Ghana",
    GI: "Gibraltar",
    GR: "Greece",
    GL: "Greenland",
    GD: "Grenada",
    GP: "Guadeloupe",
    GU: "Guam",
    GT: "Guatemala",
    GN: "Guinea",
    GW: "Guinea-Bissau",
    GY: "Guyana",
    HT: "Haiti",
    HM: "Heard Island and Mcdonald Islands",
    VA: "Holy See (Vatican City State)",
    HN: "Honduras",
    HK: "Hong Kong",
    HU: "Hungary",
    IS: "Iceland",
    IN: "India",
    ID: "Indonesia",
    IR: "Iran, Islamic Republic of",
    IQ: "Iraq",
    IE: "Ireland",
    IL: "Israel",
    IT: "Italy",
    JM: "Jamaica",
    JP: "Japan",
    JO: "Jordan",
    KZ: "Kazakhstan",
    KE: "Kenya",
    KI: "Kiribati",
    KP: "North Korea",
    KR: "South Korea",
    KW: "Kuwait",
    KG: "Kyrgyzstan",
    LA: "Lao People's Democratic Republic",
    LV: "Latvia",
    LB: "Lebanon",
    LS: "Lesotho",
    LR: "Liberia",
    LY: "Libya",
    LI: "Liechtenstein",
    LT: "Lithuania",
    LU: "Luxembourg",
    MO: "Macao",
    MK: "Macedonia, the Former Yugoslav Republic of",
    MG: "Madagascar",
    MW: "Malawi",
    MY: "Malaysia",
    MV: "Maldives",
    ML: "Mali",
    MT: "Malta",
    MH: "Marshall Islands",
    MQ: "Martinique",
    MR: "Mauritania",
    MU: "Mauritius",
    YT: "Mayotte",
    MX: "Mexico",
    FM: "Micronesia, Federated States of",
    MD: "Moldova, Republic of",
    MC: "Monaco",
    MN: "Mongolia",
    MS: "Montserrat",
    MA: "Morocco",
    MZ: "Mozambique",
    MM: "Myanmar",
    NA: "Namibia",
    NR: "Nauru",
    NP: "Nepal",
    NL: "Netherlands",
    NC: "New Caledonia",
    NZ: "New Zealand",
    NI: "Nicaragua",
    NE: "Niger",
    NG: "Nigeria",
    NU: "Niue",
    NF: "Norfolk Island",
    MP: "Northern Mariana Islands",
    NO: "Norway",
    OM: "Oman",
    PK: "Pakistan",
    PW: "Palau",
    PS: "Palestinian Territory, Occupied",
    PA: "Panama",
    PG: "Papua New Guinea",
    PY: "Paraguay",
    PE: "Peru",
    PH: "Philippines",
    PN: "Pitcairn",
    PL: "Poland",
    PT: "Portugal",
    PR: "Puerto Rico",
    QA: "Qatar",
    RE: "Reunion",
    RO: "Romania",
    RU: "Russian Federation",
    RW: "Rwanda",
    SH: "Saint Helena",
    KN: "Saint Kitts and Nevis",
    LC: "Saint Lucia",
    PM: "Saint Pierre and Miquelon",
    VC: "Saint Vincent and the Grenadines",
    WS: "Samoa",
    SM: "San Marino",
    ST: "Sao Tome and Principe",
    SA: "Saudi Arabia",
    SN: "Senegal",
    SC: "Seychelles",
    SL: "Sierra Leone",
    SG: "Singapore",
    SK: "Slovakia",
    SI: "Slovenia",
    SB: "Solomon Islands",
    SO: "Somalia",
    ZA: "South Africa",
    GS: "South Georgia and the South Sandwich Islands",
    ES: "Spain",
    LK: "Sri Lanka",
    SD: "Sudan",
    SR: "Suriname",
    SJ: "Svalbard and Jan Mayen",
    SZ: "Swaziland",
    SE: "Sweden",
    CH: "Switzerland",
    SY: "Syrian Arab Republic",
    TW: "Taiwan",
    TJ: "Tajikistan",
    TZ: "Tanzania, United Republic of",
    TH: "Thailand",
    TL: "Timor-Leste",
    TG: "Togo",
    TK: "Tokelau",
    TO: "Tonga",
    TT: "Trinidad and Tobago",
    TN: "Tunisia",
    TR: "Turkey",
    TM: "Turkmenistan",
    TC: "Turks and Caicos Islands",
    TV: "Tuvalu",
    UG: "Uganda",
    UA: "Ukraine",
    AE: "United Arab Emirates",
    GB: "United Kingdom",
    US: "United States of America",
    UM: "United States Minor Outlying Islands",
    UY: "Uruguay",
    UZ: "Uzbekistan",
    VU: "Vanuatu",
    VE: "Venezuela",
    VN: "Viet Nam",
    VG: "Virgin Islands, British",
    VI: "Virgin Islands, U.S.",
    WF: "Wallis and Futuna",
    EH: "Western Sahara",
    YE: "Yemen",
    ZM: "Zambia",
    ZW: "Zimbabwe",
    AX: "Åland Islands",
    BQ: "Bonaire, Sint Eustatius and Saba",
    CW: "Curaçao",
    GG: "Guernsey",
    IM: "Isle of Man",
    JE: "Jersey",
    ME: "Montenegro",
    BL: "Saint Barthélemy",
    MF: "Saint Martin (French part)",
    RS: "Serbia",
    SX: "Sint Maarten (Dutch part)",
    SS: "South Sudan",
    XK: "Kosovo"
  };
  var en = {
    locale: locale$a,
    countries: countries$a
  };

  var en$1 = /*#__PURE__*/Object.freeze({
    locale: locale$a,
    countries: countries$a,
    default: en
  });

  var locale$b = "es";
  var countries$b = {
    AF: "Afganistán",
    AL: "Albania",
    DZ: "Argelia",
    AS: "Samoa Americana",
    AD: "Andorra",
    AO: "Angola",
    AI: "Anguila",
    AQ: "Antártida",
    AG: "Antigua y Barbuda",
    AR: "Argentina",
    AM: "Armenia",
    AW: "Aruba",
    AU: "Australia",
    AT: "Austria",
    AZ: "Azerbaiyán",
    BS: "Bahamas",
    BH: "Bahrein",
    BD: "Bangladesh",
    BB: "Barbados",
    BY: "Belarús",
    BE: "Bélgica",
    BZ: "Belice",
    BJ: "Benin",
    BM: "Bermudas",
    BT: "Bhután",
    BO: "Bolivia",
    BA: "Bosnia y Herzegovina",
    BW: "Botswana",
    BV: "Isla Bouvet",
    BR: "Brasil",
    IO: "Territorio Británico del Océano Índico",
    BN: "Brunei Darussalam",
    BG: "Bulgaria",
    BF: "Burkina Faso",
    BI: "Burundi",
    KH: "Camboya",
    CM: "Camerún",
    CA: "Canadá",
    CV: "Cabo Verde",
    KY: "Islas Caimán",
    CF: "República Centroafricana",
    TD: "Chad",
    CL: "Chile",
    CN: "China",
    CX: "Isla de Navidad",
    CC: "Islas Cocos (Keeling)",
    CO: "Colombia",
    KM: "Comoras",
    CG: "Congo",
    CD: "Congo (República Democrática del)",
    CK: "Islas Cook",
    CR: "Costa Rica",
    CI: "Costa de Marfil",
    HR: "Croacia",
    CU: "Cuba",
    CY: "Chipre",
    CZ: "República Checa",
    DK: "Dinamarca",
    DJ: "Djibouti",
    DM: "Dominica",
    DO: "República Dominicana",
    EC: "Ecuador",
    EG: "Egipto",
    SV: "El Salvador",
    GQ: "Guinea Ecuatorial",
    ER: "Eritrea",
    EE: "Estonia",
    ET: "Etiopía",
    FK: "Islas Malvinas",
    FO: "Islas Feroe",
    FJ: "Fiji",
    FI: "Finlandia",
    FR: "Francia",
    GF: "Guayana Francesa",
    PF: "Polinesia Francesa",
    TF: "Tierras Australes Francesas",
    GA: "Gabón",
    GM: "Gambia",
    GE: "Georgia",
    DE: "Alemania",
    GH: "Ghana",
    GI: "Gibraltar",
    GR: "Grecia",
    GL: "Groenlandia",
    GD: "Granada",
    GP: "Guadeloupe",
    GU: "Guam",
    GT: "Guatemala",
    GN: "Guinea",
    GW: "Guinea Bissau",
    GY: "Guyana",
    HT: "Haití",
    HM: "Heard e Islas McDonald",
    VA: "Santa Sede",
    HN: "Honduras",
    HK: "Hong Kong",
    HU: "Hungría",
    IS: "Islandia",
    IN: "India",
    ID: "Indonesia",
    IR: "Irán (República Islámica de)",
    IQ: "Iraq",
    IE: "Irlanda",
    IL: "Israel",
    IT: "Italia",
    JM: "Jamaica",
    JP: "Japón",
    JO: "Jordania",
    KZ: "Kazajstán",
    KE: "Kenya",
    KI: "Kiribati",
    KP: "República Popular Democrática de Corea",
    KR: "República de Corea",
    KW: "Kuwait",
    KG: "Kirguistán",
    LA: "República Democrática Popular de Lao",
    LV: "Letonia",
    LB: "Líbano",
    LS: "Lesotho",
    LR: "Liberia",
    LY: "Libia",
    LI: "Liechtenstein",
    LT: "Lituania",
    LU: "Luxemburgo",
    MO: "Macao",
    MK: "Macedonia",
    MG: "Madagascar",
    MW: "Malawi",
    MY: "Malasia",
    MV: "Maldivas",
    ML: "Malí",
    MT: "Malta",
    MH: "Islas Marshall",
    MQ: "Martinique",
    MR: "Mauritania",
    MU: "Mauricio",
    YT: "Mayotte",
    MX: "México",
    FM: "Micronesia",
    MD: "Moldavia",
    MC: "Mónaco",
    MN: "Mongolia",
    MS: "Montserrat",
    MA: "Marruecos",
    MZ: "Mozambique",
    MM: "Myanmar",
    NA: "Namibia",
    NR: "Nauru",
    NP: "Nepal",
    NL: "Países Bajos",
    NC: "Nueva Caledonia",
    NZ: "Nueva Zelanda",
    NI: "Nicaragua",
    NE: "Níger",
    NG: "Nigeria",
    NU: "Niue",
    NF: "Isla Norfolk",
    MP: "Isla Marianas del Norte",
    NO: "Noruega",
    OM: "Omán",
    PK: "Pakistán",
    PW: "Palau",
    PS: "Palestina",
    PA: "Panamá",
    PG: "Papua Nueva Guinea",
    PY: "Paraguay",
    PE: "Perú",
    PH: "Filipinas",
    PN: "Pitcairn",
    PL: "Polonia",
    PT: "Portugal",
    PR: "Puerto Rico",
    QA: "Qatar",
    RE: "Reunión",
    RO: "Rumania",
    RU: "Rusia",
    RW: "Rwanda",
    SH: "Santa Helena, Ascensión y Tristán de Acuña",
    KN: "Saint Kitts y Nevis",
    LC: "Santa Lucía",
    PM: "San Pedro y Miquelón",
    VC: "San Vicente y las Granadinas",
    WS: "Samoa",
    SM: "San Marino",
    ST: "Santo Tomé y Príncipe",
    SA: "Arabia Saudita",
    SN: "Senegal",
    SC: "Seychelles",
    SL: "Sierra Leona",
    SG: "Singapur",
    SK: "Eslovaquia",
    SI: "Eslovenia",
    SB: "Islas Salomón",
    SO: "Somalia",
    ZA: "Sudáfrica",
    GS: "Georgia del Sur y las Islas Sandwich del Sur",
    ES: "España",
    LK: "Sri Lanka",
    SD: "Sudan",
    SR: "Suriname",
    SJ: "Svalbard y Jan Mayen",
    SZ: "Swazilandia",
    SE: "Suecia",
    CH: "Suiza",
    SY: "República Árabe Siria",
    TW: "Taiwán",
    TJ: "Tayikistán",
    TZ: "Tanzania",
    TH: "Tailandia",
    TL: "Timor-Leste",
    TG: "Togo",
    TK: "Tokelau",
    TO: "Tonga",
    TT: "Trinidad y Tobago",
    TN: "Túnez",
    TR: "Turquía",
    TM: "Turkmenistán",
    TC: "Islas Turcas y Caicos",
    TV: "Tuvalu",
    UG: "Uganda",
    UA: "Ucrania",
    AE: "Emiratos Árabes Unidos",
    GB: "Reino Unido",
    US: "Estados Unidos",
    UM: "Islas Ultramarinas Menores de los Estados Unidos",
    UY: "Uruguay",
    UZ: "Uzbekistán",
    VU: "Vanuatu",
    VE: "Venezuela",
    VN: "Vietnam",
    VG: "Islas Vírgenes británicas",
    VI: "Islas Vírgenes de los Estados Unidos",
    WF: "Wallis y Futuna",
    EH: "Sahara Occidental",
    YE: "Yemen",
    ZM: "Zambia",
    ZW: "Zimbabwe",
    AX: "Islas Åland",
    BQ: "Bonaire, San Eustaquio y Saba",
    CW: "Curaçao",
    GG: "Guernsey",
    IM: "Isla de Man",
    JE: "Jersey",
    ME: "Montenegro",
    BL: "Saint Barthélemy",
    MF: "Saint Martin (francesa)",
    RS: "Serbia",
    SX: "Sint Maarten (neerlandesa)",
    SS: "Sudán del Sur",
    XK: "Kosovo"
  };
  var es = {
    locale: locale$b,
    countries: countries$b
  };

  var es$1 = /*#__PURE__*/Object.freeze({
    locale: locale$b,
    countries: countries$b,
    default: es
  });

  var locale$c = "et";
  var countries$c = {
    AF: "Afganistan",
    AX: "Ahvenamaa",
    AL: "Albaania",
    DZ: "Alžeeria",
    AS: "Ameerika Samoa",
    US: "Ameerika Ühendriigid",
    AD: "Andorra",
    AO: "Angola",
    AI: "Anguilla",
    AQ: "Antarktis",
    AG: "Antigua ja Barbuda",
    MO: "Aomen - Hiina erihalduspiirkond",
    AE: "Araabia Ühendemiraadid",
    AR: "Argentina",
    AM: "Armeenia",
    AW: "Aruba",
    AZ: "Aserbaidžaan",
    AU: "Austraalia",
    AT: "Austria",
    BS: "Bahama",
    BH: "Bahrein",
    BD: "Bangladesh",
    BB: "Barbados",
    PW: "Belau",
    BE: "Belgia",
    BZ: "Belize",
    BJ: "Benin",
    BM: "Bermuda",
    BT: "Bhutan",
    BO: "Boliivia",
    BA: "Bosnia ja Hertsegoviina",
    BW: "Botswana",
    BV: "Bouvet’i saar",
    BR: "Brasiilia",
    BQ: "Bonaire, Sint Eustatius ja Saba",
    IO: "Briti India ookeani ala",
    VG: "Briti Neitsisaared",
    BN: "Brunei",
    BG: "Bulgaaria",
    BF: "Burkina Faso",
    BI: "Burundi",
    CO: "Colombia",
    CK: "Cooki saared",
    CR: "Costa Rica",
    CI: "Côte d'Ivoire",
    CW: "Curaçao",
    DJ: "Djibouti",
    DM: "Dominica",
    DO: "Dominikaani Vabariik",
    EC: "Ecuador",
    EE: "Eesti",
    EG: "Egiptus",
    GQ: "Ekvatoriaal-Guinea",
    SV: "El Salvador",
    ER: "Eritrea",
    ET: "Etioopia",
    FK: "Falklandi saared",
    FJ: "Fidži",
    PH: "Filipiinid",
    FO: "Fääri saared",
    GA: "Gabon",
    GM: "Gambia",
    GH: "Ghana",
    GI: "Gibraltar",
    GD: "Grenada",
    GE: "Gruusia",
    GL: "Gröönimaa",
    GP: "Guadeloupe",
    GU: "Guam",
    GT: "Guatemala",
    GG: "Guernsey",
    GN: "Guinea",
    GW: "Guinea-Bissau",
    GY: "Guyana",
    HT: "Haiti",
    HM: "Heard ja McDonald saared",
    CN: "Hiina",
    ES: "Hispaania",
    NL: "Holland",
    HN: "Honduras",
    HK: "Hongkong - Hiina erihalduspiirkond",
    HR: "Horvaatia",
    TL: "Ida-Timor",
    IE: "Iirimaa",
    IL: "Iisrael",
    IN: "India",
    ID: "Indoneesia",
    IQ: "Iraak",
    IR: "Iraan",
    IS: "Island",
    IT: "Itaalia",
    JP: "Jaapan",
    JM: "Jamaica",
    YE: "Jeemen",
    JE: "Jersey",
    JO: "Jordaania",
    CX: "Jõulusaar",
    KY: "Kaimanisaared",
    KH: "Kambodža",
    CM: "Kamerun",
    CA: "Kanada",
    KZ: "Kasahstan",
    QA: "Katar",
    KE: "Kenya",
    CF: "Kesk-Aafrika Vabariik",
    KI: "Kiribati",
    KM: "Komoorid",
    CD: "Kongo DV",
    CG: "Kongo-Brazzaville",
    CC: "Kookossaared",
    GR: "Kreeka",
    CU: "Kuuba",
    KW: "Kuveit",
    KG: "Kõrgõzstan",
    CY: "Küpros",
    LA: "Laos",
    LT: "Leedu",
    LS: "Lesotho",
    LR: "Libeeria",
    LI: "Liechtenstein",
    LB: "Liibanon",
    LY: "Liibüa",
    LU: "Luksemburg",
    ZA: "Lõuna-Aafrika Vabariik",
    GS: "Lõuna-Georgia ja Lõuna-Sandwichi saared",
    KR: "Lõuna-Korea",
    LV: "Läti",
    EH: "Lääne-Sahara",
    MG: "Madagaskar",
    MK: "Makedoonia",
    MY: "Malaisia",
    MW: "Malawi",
    MV: "Maldiivid",
    ML: "Mali",
    MT: "Malta",
    IM: "Mani saar",
    MA: "Maroko",
    MH: "Marshalli saared",
    MQ: "Martinique",
    MR: "Mauritaania",
    MU: "Mauritius",
    YT: "Mayotte",
    MX: "Mehhiko",
    FM: "Mikroneesia Liiduriigid",
    MD: "Moldova",
    MC: "Monaco",
    MN: "Mongoolia",
    ME: "Montenegro",
    MS: "Montserrat",
    MZ: "Mosambiik",
    MM: "Myanmar",
    NA: "Namiibia",
    NR: "Nauru",
    NP: "Nepal",
    NI: "Nicaragua",
    NG: "Nigeeria",
    NE: "Niger",
    NU: "Niue",
    NF: "Norfolk",
    NO: "Norra",
    OM: "Omaan",
    PG: "Paapua Uus-Guinea",
    PK: "Pakistan",
    PS: "Palestiina ala",
    PA: "Panama",
    PY: "Paraguay",
    PE: "Peruu",
    PN: "Pitcairn",
    PL: "Poola",
    PT: "Portugal",
    GF: "Prantsuse Guajaana",
    TF: "Prantsuse Lõunaalad",
    PF: "Prantsuse Polüneesia",
    FR: "Prantsusmaa",
    PR: "Puerto Rico",
    KP: "Põhja-Korea",
    MP: "Põhja-Mariaanid",
    RE: "Réunion",
    CV: "Roheneemesaared",
    SE: "Rootsi",
    SX: "Sint Maarten",
    RO: "Rumeenia",
    RW: "Rwanda",
    SB: "Saalomoni Saared",
    BL: "Saint Barthélemy",
    SH: "Saint Helena",
    KN: "Saint Kitts ja Nevis",
    LC: "Saint Lucia",
    MF: "Saint Martin",
    PM: "Saint Pierre ja Miquelon",
    VC: "Saint Vincent ja Grenadiinid",
    DE: "Saksamaa",
    ZM: "Sambia",
    WS: "Samoa",
    SM: "San Marino",
    ST: "São Tomé ja Príncipe",
    SA: "Saudi Araabia",
    SC: "Seišellid",
    SN: "Senegal",
    RS: "Serbia",
    SL: "Sierra Leone",
    SG: "Singapur",
    SK: "Slovakkia",
    SI: "Sloveenia",
    SO: "Somaalia",
    FI: "Soome",
    LK: "Sri Lanka",
    SD: "Sudaan",
    SS: "Lõuna-Sudaan",
    SR: "Suriname",
    GB: "Suurbritannia",
    SZ: "Svaasimaa",
    SJ: "Svalbard ja Jan Mayen",
    SY: "Süüria",
    CH: "Šveits",
    ZW: "Zimbabwe",
    DK: "Taani",
    TJ: "Tadžikistan",
    TH: "Tai",
    TW: "Taiwan",
    TZ: "Tansaania",
    TG: "Togo",
    TK: "Tokelau",
    TO: "Tonga",
    TT: "Trinidad ja Tobago",
    TD: "Tšaad",
    CZ: "Tšehhi",
    CL: "Tšiili",
    TN: "Tuneesia",
    TC: "Turks ja Caicos",
    TV: "Tuvalu",
    TR: "Türgi",
    TM: "Türkmenistan",
    UG: "Uganda",
    UA: "Ukraina",
    HU: "Ungari",
    UY: "Uruguay",
    VI: "USA Neitsisaared",
    UZ: "Usbekistan",
    NC: "Uus-Kaledoonia",
    NZ: "Uus-Meremaa",
    BY: "Valgevene",
    WF: "Wallis ja Futuna",
    VU: "Vanuatu",
    VA: "Vatikan",
    RU: "Venemaa",
    VE: "Venezuela",
    VN: "Vietnam",
    UM: "Ühendriikide hajasaared",
    XK: "Kosovo"
  };
  var et = {
    locale: locale$c,
    countries: countries$c
  };

  var et$1 = /*#__PURE__*/Object.freeze({
    locale: locale$c,
    countries: countries$c,
    default: et
  });

  var locale$d = "fa";
  var countries$d = {
    AD: "آندورا",
    AE: "امارات متحدهٔ عربی",
    AF: "افغانستان",
    AG: "آنتیگوا و باربودا",
    AI: "آنگویلا",
    AL: "آلبانی",
    AM: "ارمنستان",
    AO: "آنگولا",
    AQ: "جنوبگان",
    AR: "آرژانتین",
    AS: "ساموآی امریکا",
    AT: "اتریش",
    AU: "استرالیا",
    AW: "آروبا",
    AX: "جزایر آلاند",
    AZ: "جمهوری آذربایجان",
    BA: "بوسنی و هرزگوین",
    BB: "باربادوس",
    BD: "بنگلادش",
    BE: "بلژیک",
    BF: "بورکینافاسو",
    BG: "بلغارستان",
    BH: "بحرین",
    BI: "بوروندی",
    BJ: "بنین",
    BL: "سن بارتلمی",
    BM: "برمودا",
    BN: "برونئی",
    BO: "بولیوی",
    BQ: "جزایر کارائیب هلند",
    BR: "برزیل",
    BS: "باهاما",
    BT: "بوتان",
    BV: "جزیرهٔ بووه",
    BW: "بوتسوانا",
    BY: "بلاروس",
    BZ: "بلیز",
    CA: "کانادا",
    CC: "جزایر کوکوس",
    CD: "کنگو - کینشاسا",
    CF: "جمهوری افریقای مرکزی",
    CG: "کنگو - برازویل",
    CH: "سوئیس",
    CI: "ساحل عاج",
    CK: "جزایر کوک",
    CL: "شیلی",
    CM: "کامرون",
    CN: "چین",
    CO: "کلمبیا",
    CR: "کاستاریکا",
    CU: "کوبا",
    CV: "کیپ‌ورد",
    CW: "کوراسائو",
    CX: "جزیرهٔ کریسمس",
    CY: "قبرس",
    CZ: "جمهوری چک",
    DE: "آلمان",
    DJ: "جیبوتی",
    DK: "دانمارک",
    DM: "دومینیکا",
    DO: "جمهوری دومینیکن",
    DZ: "الجزایر",
    EC: "اکوادور",
    EE: "استونی",
    EG: "مصر",
    EH: "صحرای غربی",
    ER: "اریتره",
    ES: "اسپانیا",
    ET: "اتیوپی",
    FI: "فنلاند",
    FJ: "فیجی",
    FK: "جزایر فالکلند",
    FM: "میکرونزی",
    FO: "جزایر فارو",
    FR: "فرانسه",
    GA: "گابن",
    GB: "بریتانیا",
    GD: "گرنادا",
    GE: "گرجستان",
    GF: "گویان فرانسه",
    GG: "گرنزی",
    GH: "غنا",
    GI: "جبل‌الطارق",
    GL: "گرینلند",
    GM: "گامبیا",
    GN: "گینه",
    GP: "گوادلوپ",
    GQ: "گینهٔ استوایی",
    GR: "یونان",
    GS: "جزایر جورجیای جنوبی و ساندویچ جنوبی",
    GT: "گواتمالا",
    GU: "گوام",
    GW: "گینهٔ بیسائو",
    GY: "گویان",
    HK: "هنگ‌کنگ",
    HM: "جزیرهٔ هرد و جزایر مک‌دونالد",
    HN: "هندوراس",
    HR: "کرواسی",
    HT: "هائیتی",
    HU: "مجارستان",
    ID: "اندونزی",
    IE: "ایرلند",
    IL: "اسرائیل",
    IM: "جزیرهٔ من",
    IN: "هند",
    IO: "قلمرو بریتانیا در اقیانوس هند",
    IQ: "عراق",
    IR: "ایران",
    IS: "ایسلند",
    IT: "ایتالیا",
    JE: "جرزی",
    JM: "جامائیکا",
    JO: "اردن",
    JP: "ژاپن",
    KE: "کنیا",
    KG: "قرقیزستان",
    KH: "کامبوج",
    KI: "کیریباتی",
    KM: "کومورو",
    KN: "سنت کیتس و نویس",
    KP: "کرهٔ شمالی",
    KR: "کرهٔ جنوبی",
    KW: "کویت",
    KY: "جزایر کِیمن",
    KZ: "قزاقستان",
    LA: "لائوس",
    LB: "لبنان",
    LC: "سنت لوسیا",
    LI: "لیختن‌اشتاین",
    LK: "سری‌لانکا",
    LR: "لیبریا",
    LS: "لسوتو",
    LT: "لیتوانی",
    LU: "لوکزامبورگ",
    LV: "لتونی",
    LY: "لیبی",
    MA: "مراکش",
    MC: "موناکو",
    MD: "مولداوی",
    ME: "مونته‌نگرو",
    MF: "سنت مارتین",
    MG: "ماداگاسکار",
    MH: "جزایر مارشال",
    MK: "مقدونیه",
    ML: "مالی",
    MM: "میانمار (برمه)",
    MN: "مغولستان",
    MO: "ماکائو",
    MP: "جزایر ماریانای شمالی",
    MQ: "مارتینیک",
    MR: "موریتانی",
    MS: "مونت‌سرات",
    MT: "مالت",
    MU: "موریس",
    MV: "مالدیو",
    MW: "مالاوی",
    MX: "مکزیک",
    MY: "مالزی",
    MZ: "موزامبیک",
    NA: "نامیبیا",
    NC: "کالدونیای جدید",
    NE: "نیجر",
    NF: "جزیرهٔ نورفولک",
    NG: "نیجریه",
    NI: "نیکاراگوئه",
    NL: "هلند",
    NO: "نروژ",
    NP: "نپال",
    NR: "نائورو",
    NU: "نیوئه",
    NZ: "نیوزیلند",
    OM: "عمان",
    PA: "پاناما",
    PE: "پرو",
    PF: "پلی‌نزی فرانسه",
    PG: "پاپوا گینهٔ نو",
    PH: "فیلیپین",
    PK: "پاکستان",
    PL: "لهستان",
    PM: "سن پیر و میکلن",
    PN: "جزایر پیت‌کرن",
    PR: "پورتوریکو",
    PS: "سرزمین‌های فلسطینی",
    PT: "پرتغال",
    PW: "پالائو",
    PY: "پاراگوئه",
    QA: "قطر",
    RE: "رئونیون",
    RO: "رومانی",
    RS: "صربستان",
    RU: "روسیه",
    RW: "رواندا",
    SA: "عربستان سعودی",
    SB: "جزایر سلیمان",
    SC: "سیشل",
    SD: "سودان",
    SE: "سوئد",
    SG: "سنگاپور",
    SH: "سنت هلن",
    SI: "اسلوونی",
    SJ: "اسوالبارد و جان‌ماین",
    SK: "اسلواکی",
    SL: "سیرالئون",
    SM: "سان‌مارینو",
    SN: "سنگال",
    SO: "سومالی",
    SR: "سورینام",
    SS: "سودان جنوبی",
    ST: "سائوتومه و پرینسیپ",
    SV: "السالوادور",
    SX: "سنت مارتن",
    SY: "سوریه",
    SZ: "سوازیلند",
    TC: "جزایر تورکس و کایکوس",
    TD: "چاد",
    TF: "قلمروهای جنوبی فرانسه",
    TG: "توگو",
    TH: "تایلند",
    TJ: "تاجیکستان",
    TK: "توکلائو",
    TL: "تیمور-لسته",
    TM: "ترکمنستان",
    TN: "تونس",
    TO: "تونگا",
    TR: "ترکیه",
    TT: "ترینیداد و توباگو",
    TV: "تووالو",
    TW: "تایوان",
    TZ: "تانزانیا",
    UA: "اوکراین",
    UG: "اوگاندا",
    UM: "جزایر دورافتادهٔ ایالات متحده",
    US: "ایالات متحده",
    UY: "اروگوئه",
    UZ: "ازبکستان",
    VA: "واتیکان",
    VC: "سنت وینسنت و گرنادین",
    VE: "ونزوئلا",
    VG: "جزایر ویرجین بریتانیا",
    VI: "جزایر ویرجین ایالات متحده",
    VN: "ویتنام",
    VU: "وانواتو",
    WF: "والیس و فوتونا",
    WS: "ساموآ",
    XK: "کوزوو",
    YE: "یمن",
    YT: "مایوت",
    ZA: "افریقای جنوبی",
    ZM: "زامبیا",
    ZW: "زیمبابوه"
  };
  var fa = {
    locale: locale$d,
    countries: countries$d
  };

  var fa$1 = /*#__PURE__*/Object.freeze({
    locale: locale$d,
    countries: countries$d,
    default: fa
  });

  var locale$e = "fi";
  var countries$e = {
    AF: "Afganistan",
    AX: "Ahvenanmaa",
    NL: "Alankomaat",
    AL: "Albania",
    DZ: "Algeria",
    AS: "Amerikan Samoa",
    AD: "Andorra",
    AO: "Angola",
    AI: "Anguilla",
    AQ: "Antarktis",
    AG: "Antigua ja Barbuda",
    AE: "Arabiemiirikunnat",
    AR: "Argentiina",
    AM: "Armenia",
    AW: "Aruba",
    AU: "Australia",
    AZ: "Azerbaidžan",
    BS: "Bahama",
    BH: "Bahrain",
    BD: "Bangladesh",
    BB: "Barbados",
    BE: "Belgia",
    BZ: "Belize",
    BJ: "Benin",
    BM: "Bermuda",
    BT: "Bhutan",
    BO: "Bolivia",
    BQ: "Bonaire, Sint Eustatius ja Saba",
    BA: "Bosnia ja Hertsegovina",
    BW: "Botswana",
    BV: "Bouvet’nsaari",
    BR: "Brasilia",
    IO: "Brittiläinen Intian valtameren alue",
    VG: "Brittiläiset Neitsytsaaret",
    BN: "Brunei",
    BG: "Bulgaria",
    BF: "Burkina Faso",
    BI: "Burundi",
    KY: "Caymansaaret",
    CL: "Chile",
    CK: "Cookinsaaret",
    CR: "Costa Rica",
    CW: "Curaçao",
    DJ: "Djibouti",
    DM: "Dominica",
    DO: "Dominikaaninen tasavalta",
    EC: "Ecuador",
    EG: "Egypti",
    SV: "El Salvador",
    ER: "Eritrea",
    ES: "Espanja",
    ET: "Etiopia",
    ZA: "Etelä-Afrikka",
    GS: "Etelä-Georgia ja Eteläiset Sandwichsaaret",
    SS: "Etelä-Sudan",
    FK: "Falklandinsaaret",
    FO: "Färsaaret",
    FJ: "Fidži",
    PH: "Filippiinit",
    GA: "Gabon",
    GM: "Gambia",
    GE: "Georgia",
    GH: "Ghana",
    GI: "Gibraltar",
    GD: "Grenada",
    GL: "Grönlanti",
    GP: "Guadeloupe",
    GU: "Guam",
    GT: "Guatemala",
    GG: "Guernsey",
    GN: "Guinea",
    GW: "Guinea-Bissau",
    GY: "Guyana",
    HT: "Haiti",
    HM: "Heard ja McDonaldinsaaret",
    HN: "Honduras",
    HK: "Hongkong",
    ID: "Indonesia",
    IN: "Intia",
    IQ: "Irak",
    IR: "Iran",
    IE: "Irlanti",
    IS: "Islanti",
    IL: "Israel",
    IT: "Italia",
    TL: "Itä-Timor",
    AT: "Itävalta",
    JM: "Jamaika",
    JP: "Japani",
    YE: "Jemen",
    JE: "Jersey",
    JO: "Jordania",
    CX: "Joulusaari",
    KH: "Kambodža",
    CM: "Kamerun",
    CA: "Kanada",
    CV: "Kap Verde",
    KZ: "Kazakstan",
    KE: "Kenia",
    CF: "Keski-Afrikan tasavalta",
    CN: "Kiina",
    KG: "Kirgisia",
    KI: "Kiribati",
    CO: "Kolumbia",
    KM: "Komorit",
    CD: "Kongon demokraattinen tasavalta",
    CG: "Kongon tasavalta",
    CC: "Kookossaaret",
    KP: "Korean demokraattinen kansantasavalta",
    KR: "Korean tasavalta",
    GR: "Kreikka",
    HR: "Kroatia",
    CU: "Kuuba",
    KW: "Kuwait",
    CY: "Kypros",
    LA: "Laos",
    LV: "Latvia",
    LS: "Lesotho",
    LB: "Libanon",
    LR: "Liberia",
    LY: "Libya",
    LI: "Liechtenstein",
    LT: "Liettua",
    LU: "Luxemburg",
    EH: "Länsi-Sahara",
    MO: "Macao",
    MG: "Madagaskar",
    MK: "Makedonia",
    MW: "Malawi",
    MV: "Malediivit",
    MY: "Malesia",
    ML: "Mali",
    MT: "Malta",
    IM: "Mansaari",
    MA: "Marokko",
    MH: "Marshallinsaaret",
    MQ: "Martinique",
    MR: "Mauritania",
    MU: "Mauritius",
    YT: "Mayotte",
    MX: "Meksiko",
    FM: "Mikronesian liittovaltio",
    MD: "Moldova",
    MC: "Monaco",
    MN: "Mongolia",
    ME: "Montenegro",
    MS: "Montserrat",
    MZ: "Mosambik",
    MM: "Myanmar",
    NA: "Namibia",
    NR: "Nauru",
    NP: "Nepal",
    NI: "Nicaragua",
    NE: "Niger",
    NG: "Nigeria",
    NU: "Niue",
    NF: "Norfolkinsaari",
    NO: "Norja",
    CI: "Norsunluurannikko",
    OM: "Oman",
    PK: "Pakistan",
    PW: "Palau",
    PS: "Palestiina",
    PA: "Panama",
    PG: "Papua-Uusi-Guinea",
    PY: "Paraguay",
    PE: "Peru",
    MP: "Pohjois-Mariaanit",
    PN: "Pitcairn",
    PT: "Portugali",
    PR: "Puerto Rico",
    PL: "Puola",
    GQ: "Päiväntasaajan Guinea",
    QA: "Qatar",
    FR: "Ranska",
    TF: "Ranskan eteläiset alueet",
    GF: "Ranskan Guayana",
    PF: "Ranskan Polynesia",
    RE: "Réunion",
    RO: "Romania",
    RW: "Ruanda",
    SE: "Ruotsi",
    BL: "Saint-Barthélemy",
    SH: "Saint Helena",
    KN: "Saint Kitts ja Nevis",
    LC: "Saint Lucia",
    MF: "Saint-Martin",
    PM: "Saint-Pierre ja Miquelon",
    VC: "Saint Vincent ja Grenadiinit",
    DE: "Saksa",
    SB: "Salomonsaaret",
    ZM: "Sambia",
    WS: "Samoa",
    SM: "San Marino",
    ST: "São Tomé ja Príncipe",
    SA: "Saudi-Arabia",
    SN: "Senegal",
    RS: "Serbia",
    SC: "Seychellit",
    SL: "Sierra Leone",
    SG: "Singapore",
    SX: "Sint Maarten",
    SK: "Slovakia",
    SI: "Slovenia",
    SO: "Somalia",
    LK: "Sri Lanka",
    SD: "Sudan",
    FI: "Suomi",
    SR: "Suriname",
    SJ: "Svalbard ja Jan Mayen",
    SZ: "Swazimaa",
    CH: "Sveitsi",
    SY: "Syyria",
    TJ: "Tadžikistan",
    TW: "Taiwan",
    TZ: "Tansania",
    DK: "Tanska",
    TH: "Thaimaa",
    TG: "Togo",
    TK: "Tokelau",
    TO: "Tonga",
    TT: "Trinidad ja Tobago",
    TD: "Tšad",
    CZ: "Tšekki",
    TN: "Tunisia",
    TR: "Turkki",
    TM: "Turkmenistan",
    TC: "Turks- ja Caicossaaret",
    TV: "Tuvalu",
    UG: "Uganda",
    UA: "Ukraina",
    HU: "Unkari",
    UY: "Uruguay",
    NC: "Uusi-Kaledonia",
    NZ: "Uusi-Seelanti",
    UZ: "Uzbekistan",
    BY: "Valko-Venäjä",
    VU: "Vanuatu",
    VA: "Vatikaanivaltio",
    VE: "Venezuela",
    RU: "Venäjä",
    VN: "Vietnam",
    EE: "Viro",
    WF: "Wallis ja Futunasaaret",
    GB: "Yhdistynyt kuningaskunta",
    US: "Yhdysvallat",
    VI: "Yhdysvaltain Neitsytsaaret",
    UM: "Yhdysvaltain pienet erillissaaret",
    ZW: "Zimbabwe",
    XK: "Kosovo"
  };
  var fi = {
    locale: locale$e,
    countries: countries$e
  };

  var fi$1 = /*#__PURE__*/Object.freeze({
    locale: locale$e,
    countries: countries$e,
    default: fi
  });

  var locale$f = "fr";
  var countries$f = {
    AF: "Afghanistan",
    AL: "Albanie",
    DZ: "Algérie",
    AS: "Samoa américaine",
    AD: "Andorre",
    AO: "Angola",
    AI: "Anguilla",
    AQ: "Antarctique",
    AG: "Antigua et Barbuda",
    AR: "Argentine",
    AM: "Arménie",
    AW: "Aruba",
    AU: "Australie",
    AT: "Autriche",
    AZ: "Azerbaidjan",
    BS: "Bahamas",
    BH: "Bahrein",
    BD: "Bangladesh",
    BB: "Barbade",
    BY: "Bielorussie",
    BE: "Belgique",
    BZ: "Belize",
    BJ: "Bénin",
    BM: "Bermudes",
    BT: "Bhoutan",
    BO: "Bolivie",
    BA: "Bosnie-Herzégovine",
    BW: "Botswana",
    BV: "Île Bouvet",
    BR: "Brésil",
    IO: "Océan Indien Britannique",
    BN: "Brunei Darussalam",
    BG: "Bulgarie",
    BF: "Burkina Faso",
    BI: "Burundi",
    KH: "Cambodge",
    CM: "Cameroun",
    CA: "Canada",
    CV: "Cap-Vert",
    KY: "Caïmanes",
    CF: "Centrafricaine, République",
    TD: "Tchad",
    CL: "Chili",
    CN: "Chine",
    CX: "Île Christmas",
    CC: "Cocos",
    CO: "Colombie",
    KM: "Comores",
    CG: "Congo, République populaire",
    CD: "Congo, République démocratique",
    CK: "Îles Cook",
    CR: "Costa Rica",
    CI: "Côte-d'Ivoire",
    HR: "Croatie",
    CU: "Cuba",
    CY: "Chypre",
    CZ: "Tchéquie",
    DK: "Danemark",
    DJ: "Djibouti",
    DM: "Dominique",
    DO: "République Dominicaine",
    EC: "Équateur",
    EG: "Égypte",
    SV: "El Salvador",
    GQ: "Guinée équatoriale",
    ER: "Érythrée",
    EE: "Estonie",
    ET: "Éthiopie",
    FK: "Îles Malouines",
    FO: "Îles Féroé",
    FJ: "Fidji",
    FI: "Finlande",
    FR: "France",
    GF: "Guyane française",
    PF: "Polynésie française",
    TF: "Terres australes françaises",
    GA: "Gabon",
    GM: "Gambie",
    GE: "Géorgie",
    DE: "Allemagne",
    GH: "Ghana",
    GI: "Gibraltar",
    GR: "Grèce",
    GL: "Groenland",
    GD: "Grenada",
    GP: "Guadeloupe",
    GU: "Guam",
    GT: "Guatemala",
    GN: "Guinée",
    GW: "Guinée-Bissau",
    GY: "Guyana",
    HT: "Haïti",
    HM: "Îles Heard-et-MacDonald",
    VA: "Saint-Siège",
    HN: "Honduras",
    HK: "Hong Kong",
    HU: "Hongrie",
    IS: "Islande",
    IN: "Inde",
    ID: "Indonésie",
    IR: "Iran",
    IQ: "Irak",
    IE: "Irlande",
    IL: "Israël",
    IT: "Italie",
    JM: "Jamaïque",
    JP: "Japon",
    JO: "Jordanie",
    KZ: "Kazakhstan",
    KE: "Kenya",
    KI: "Kiribati",
    KP: "Corée du Nord, République populaire démocratique",
    KR: "Corée du Sud, République",
    KW: "Koweit",
    KG: "Kirghistan",
    LA: "Laos",
    LV: "Lettonie",
    LB: "Liban",
    LS: "Lesotho",
    LR: "Libéria",
    LY: "Libye",
    LI: "Liechtenstein",
    LT: "Lituanie",
    LU: "Luxembourg, Grand-Duché",
    MO: "Macao",
    MK: "Macédoine, Ex-République yougoslave",
    MG: "Madagascar",
    MW: "Malawi",
    MY: "Malaisie",
    MV: "Maldives",
    ML: "Mali",
    MT: "Malte",
    MH: "Îles Marshall",
    MQ: "Martinique",
    MR: "Mauritanie",
    MU: "Maurice",
    YT: "Mayotte",
    MX: "Mexique",
    FM: "Micronésie",
    MD: "Moldavie",
    MC: "Monaco",
    MN: "Mongolie",
    MS: "Montserrat",
    MA: "Maroc",
    MZ: "Mozambique",
    MM: "Myanmar",
    NA: "Namibie",
    NR: "Nauru",
    NP: "Népal",
    NL: "Pays-Bas",
    NC: "Nouvelle-Calédonie",
    NZ: "Nouvelle-Zélande",
    NI: "Nicaragua",
    NE: "Niger",
    NG: "Nigéria",
    NU: "Niué",
    NF: "Île Norfolk",
    MP: "Mariannes du Nord",
    NO: "Norvège",
    OM: "Oman",
    PK: "Pakistan",
    PW: "Palau",
    PS: "Palestine",
    PA: "Panama",
    PG: "Papouasie-Nouvelle-Guinée",
    PY: "Paraguay",
    PE: "Pérou",
    PH: "Philippines",
    PN: "Pitcairn",
    PL: "Pologne",
    PT: "Portugal",
    PR: "Porto Rico",
    QA: "Qatar",
    RE: "Réunion",
    RO: "Roumanie",
    RU: "Russie",
    RW: "Rwanda",
    SH: "Sainte-Hélène",
    KN: "Saint-Christophe-et-Niévès",
    LC: "Sainte-Lucie",
    PM: "Saint Pierre and Miquelon",
    VC: "Saint-Vincent et les Grenadines",
    WS: "Samoa",
    SM: "Saint-Marin",
    ST: "São Tomé et Principe",
    SA: "Arabie Saoudite",
    SN: "Sénégal",
    SC: "Seychelles",
    SL: "Sierra Leone",
    SG: "Singapour",
    SK: "Slovaquie",
    SI: "Slovénie",
    SB: "Salomon",
    SO: "Somalie",
    ZA: "Afrique du Sud",
    GS: "Géorgie du Sud-et-les Îles Sandwich du Sud",
    ES: "Espagne",
    LK: "Sri Lanka",
    SD: "Soudan",
    SR: "Suriname",
    SJ: "Svalbard et Île Jan Mayen",
    SZ: "Ngwane, Royaume du Swaziland",
    SE: "Suède",
    CH: "Suisse",
    SY: "Syrie",
    TW: "Taïwan",
    TJ: "Tadjikistan",
    TZ: "Tanzanie, République unie",
    TH: "Thaïlande",
    TL: "Timor Leste",
    TG: "Togo",
    TK: "Tokelau",
    TO: "Tonga",
    TT: "Trinidad et Tobago",
    TN: "Tunisie",
    TR: "Turquie",
    TM: "Turkménistan",
    TC: "Îles Turques-et-Caïques",
    TV: "Tuvalu",
    UG: "Ouganda",
    UA: "Ukraine",
    AE: "Émirats Arabes Unis",
    GB: "Royaume-Uni",
    US: "États-Unis d'Amérique",
    UM: "Îles mineures éloignées des États-Unis",
    UY: "Uruguay",
    UZ: "Ouzbékistan",
    VU: "Vanuatu",
    VE: "Venezuela",
    VN: "Vietnam",
    VG: "Îles vierges britanniques",
    VI: "Îles vierges américaines",
    WF: "Wallis et Futuna",
    EH: "Sahara occidental",
    YE: "Yémen",
    ZM: "Zambie",
    ZW: "Zimbabwe",
    AX: "Åland",
    BQ: "Bonaire, Saint-Eustache et Saba",
    CW: "Curaçao",
    GG: "Guernesey",
    IM: "Île de Man",
    JE: "Jersey",
    ME: "Monténégro",
    BL: "Saint-Barthélemy",
    MF: "Saint-Martin (partie française)",
    RS: "Serbie",
    SX: "Saint-Martin (partie néerlandaise)",
    SS: "Sud-Soudan",
    XK: "Kosovo"
  };
  var fr = {
    locale: locale$f,
    countries: countries$f
  };

  var fr$1 = /*#__PURE__*/Object.freeze({
    locale: locale$f,
    countries: countries$f,
    default: fr
  });

  var locale$g = "he";
  var countries$g = {
    AF: "אפגניסטן",
    AX: "איי אולנד",
    AL: "אלבניה",
    DZ: "אלג׳יריה",
    AS: "סמואה האמריקנית",
    AD: "אנדורה",
    AO: "אנגולה",
    AI: "אנגילה",
    AQ: "אנטארקטיקה",
    AG: "אנטיגואה וברבודה",
    AR: "ארגנטינה",
    AM: "ארמניה",
    AW: "ארובה",
    AU: "אוסטרליה",
    AT: "אוסטריה",
    AZ: "אזרבייג׳ן",
    BS: "איי בהאמה",
    BH: "בחריין",
    BD: "בנגלדש",
    BB: "ברבדוס",
    BY: "בלארוס",
    BE: "בלגיה",
    BZ: "בליז",
    BJ: "בנין",
    BM: "ברמודה",
    BT: "בהוטן",
    BO: "בוליביה",
    BQ: "האיים הקריביים ההולנדיים",
    BA: "בוסניה והרצגובינה",
    BW: "בוצוואנה",
    BV: "איי בובה",
    BR: "ברזיל",
    IO: "הטריטוריה הבריטית באוקיינוס ההודי",
    BN: "ברוניי",
    BG: "בולגריה",
    BF: "בורקינה פאסו",
    BI: "בורונדי",
    KH: "קמבודיה",
    CM: "קמרון",
    CA: "קנדה",
    CV: "כף ורדה",
    KY: "איי קיימן",
    CF: "הרפובליקה של מרכז אפריקה",
    TD: "צ׳אד",
    CL: "צ׳ילה",
    CN: "סין",
    CX: "האי כריסטמס",
    CC: "איי קוקוס (קילינג)",
    CO: "קולומביה",
    KM: "קומורו",
    CG: "קונגו - ברזאויל",
    CD: "קונגו - קינשאסה",
    CK: "איי קוק",
    CR: "קוסטה ריקה",
    CI: "חוף השנהב",
    HR: "קרואטיה",
    CU: "קובה",
    CW: "קוראסאו",
    CY: "קפריסין",
    CZ: "צ׳כיה",
    DK: "דנמרק",
    DJ: "ג׳יבוטי",
    DM: "דומיניקה",
    DO: "הרפובליקה הדומיניקנית",
    EC: "אקוודור",
    EG: "מצרים",
    SV: "אל סלבדור",
    GQ: "גינאה המשוונית",
    ER: "אריתריאה",
    EE: "אסטוניה",
    ET: "אתיופיה",
    FK: "איי פוקלנד",
    FO: "איי פארו",
    FJ: "פיג׳י",
    FI: "פינלנד",
    FR: "צרפת",
    GF: "גיאנה הצרפתית",
    PF: "פולינזיה הצרפתית",
    TF: "הטריטוריות הדרומיות של צרפת",
    GA: "גבון",
    GM: "גמביה",
    GE: "גאורגיה",
    DE: "גרמניה",
    GH: "גאנה",
    GI: "גיברלטר",
    GR: "יוון",
    GL: "גרינלנד",
    GD: "גרנדה",
    GP: "גוואדלופ",
    GU: "גואם",
    GT: "גואטמלה",
    GG: "גרנסי",
    GN: "גינאה",
    GW: "גינאה ביסאו",
    GY: "גיאנה",
    HT: "האיטי",
    HM: "איי הרד ומקדונלד",
    VA: "הוותיקן",
    HN: "הונדורס",
    HK: "הונג קונג (מחוז מנהלי מיוחד של סין)",
    HU: "הונגריה",
    IS: "איסלנד",
    IN: "הודו",
    ID: "אינדונזיה",
    IR: "איראן",
    IQ: "עיראק",
    IE: "אירלנד",
    IM: "האי מאן",
    IL: "ישראל",
    IT: "איטליה",
    JM: "ג׳מייקה",
    JP: "יפן",
    JE: "ג׳רסי",
    JO: "ירדן",
    KZ: "קזחסטן",
    KE: "קניה",
    KI: "קיריבאטי",
    KP: "קוריאה הצפונית",
    KR: "קוריאה הדרומית",
    KW: "כווית",
    KG: "קירגיזסטן",
    LA: "לאוס",
    LV: "לטביה",
    LB: "לבנון",
    LS: "לסוטו",
    LR: "ליבריה",
    LY: "לוב",
    LI: "ליכטנשטיין",
    LT: "ליטא",
    LU: "לוקסמבורג",
    MO: "מקאו (מחוז מנהלי מיוחד של סין)",
    MK: "מקדוניה",
    MG: "מדגסקר",
    MW: "מלאווי",
    MY: "מלזיה",
    MV: "האיים המלדיביים",
    ML: "מאלי",
    MT: "מלטה",
    MH: "איי מרשל",
    MQ: "מרטיניק",
    MR: "מאוריטניה",
    MU: "מאוריציוס",
    YT: "מאיוט",
    MX: "מקסיקו",
    FM: "מיקרונזיה",
    MD: "מולדובה",
    MC: "מונקו",
    MN: "מונגוליה",
    ME: "מונטנגרו",
    MS: "מונסראט",
    MA: "מרוקו",
    MZ: "מוזמביק",
    MM: "מיאנמר (בורמה)",
    NA: "נמיביה",
    NR: "נאורו",
    NP: "נפאל",
    NL: "הולנד",
    NC: "קלדוניה החדשה",
    NZ: "ניו זילנד",
    NI: "ניקרגואה",
    NE: "ניז׳ר",
    NG: "ניגריה",
    NU: "ניווה",
    NF: "איי נורפוק",
    MP: "איי מריאנה הצפוניים",
    NO: "נורווגיה",
    OM: "עומאן",
    PK: "פקיסטן",
    PW: "פלאו",
    PS: "השטחים הפלסטיניים",
    PA: "פנמה",
    PG: "פפואה גינאה החדשה",
    PY: "פרגוואי",
    PE: "פרו",
    PH: "הפיליפינים",
    PN: "איי פיטקרן",
    PL: "פולין",
    PT: "פורטוגל",
    PR: "פוארטו ריקו",
    QA: "קטאר",
    RE: "ראוניון",
    RO: "רומניה",
    RU: "רוסיה",
    RW: "רואנדה",
    BL: "סנט ברתולומיאו",
    SH: "סנט הלנה",
    KN: "סנט קיטס ונוויס",
    LC: "סנט לוסיה",
    MF: "סן מרטן",
    PM: "סנט פייר ומיקלון",
    VC: "סנט וינסנט והגרנדינים",
    WS: "סמואה",
    SM: "סן מרינו",
    ST: "סאו טומה ופרינסיפה",
    SA: "ערב הסעודית",
    SN: "סנגל",
    RS: "סרביה",
    SC: "איי סיישל",
    SL: "סיירה לאונה",
    SG: "סינגפור",
    SX: "סנט מארטן",
    SK: "סלובקיה",
    SI: "סלובניה",
    SB: "איי שלמה",
    SO: "סומליה",
    ZA: "דרום אפריקה",
    GS: "ג׳ורג׳יה הדרומית ואיי סנדוויץ׳ הדרומיים",
    SS: "דרום סודן",
    ES: "ספרד",
    LK: "סרי לנקה",
    SD: "סודן",
    SR: "סורינם",
    SJ: "סוולבארד ויאן מאיין",
    SZ: "סווזילנד",
    SE: "שוודיה",
    CH: "שווייץ",
    SY: "סוריה",
    TW: "טייוואן",
    TJ: "טג׳יקיסטן",
    TZ: "טנזניה",
    TH: "תאילנד",
    TL: "טימור לסטה",
    TG: "טוגו",
    TK: "טוקלאו",
    TO: "טונגה",
    TT: "טרינידד וטובגו",
    TN: "טוניסיה",
    TR: "טורקיה",
    TM: "טורקמניסטן",
    TC: "איי טורקס וקאיקוס",
    TV: "טובאלו",
    UG: "אוגנדה",
    UA: "אוקראינה",
    AE: "איחוד האמירויות הערביות",
    GB: "הממלכה המאוחדת",
    US: "ארצות הברית",
    UM: "האיים המרוחקים הקטנים של ארה״ב",
    UY: "אורוגוואי",
    UZ: "אוזבקיסטן",
    VU: "ונואטו",
    VE: "ונצואלה",
    VN: "וייטנאם",
    VG: "איי הבתולה הבריטיים",
    VI: "איי הבתולה של ארצות הברית",
    WF: "איי ווליס ופוטונה",
    EH: "סהרה המערבית",
    YE: "תימן",
    ZM: "זמביה",
    ZW: "זימבבואה",
    XK: "קוסובו"
  };
  var he = {
    locale: locale$g,
    countries: countries$g
  };

  var he$1 = /*#__PURE__*/Object.freeze({
    locale: locale$g,
    countries: countries$g,
    default: he
  });

  var locale$h = "hr";
  var countries$h = {
    AD: "Andora",
    AE: "Ujedinjeni Arapski Emirati",
    AF: "Afganistan",
    AG: "Antigva i Barbuda",
    AI: "Angvila",
    AL: "Albanija",
    AM: "Armenija",
    AO: "Angola",
    AQ: "Antarktika",
    AR: "Argentina",
    AS: "Američka Samoa",
    AT: "Austrija",
    AU: "Australija",
    AW: "Aruba",
    AX: "Ålandski otoci",
    AZ: "Azerbajdžan",
    BA: "Bosna i Hercegovina",
    BB: "Barbados",
    BD: "Bangladeš",
    BE: "Belgija",
    BF: "Burkina Faso",
    BG: "Bugarska",
    BH: "Bahrein",
    BI: "Burundi",
    BJ: "Benin",
    BL: "Saint Barthélemy",
    BM: "Bermudi",
    BN: "Brunej",
    BO: "Bolivija",
    BQ: "Karipski otoci Nizozemske",
    BR: "Brazil",
    BS: "Bahami",
    BT: "Butan",
    BV: "Otok Bouvet",
    BW: "Bocvana",
    BY: "Bjelorusija",
    BZ: "Belize",
    CA: "Kanada",
    CC: "Kokosovi (Keelingovi) otoci",
    CD: "Kongo - Kinshasa",
    CF: "Srednjoafrička Republika",
    CG: "Kongo - Brazzaville",
    CH: "Švicarska",
    CI: "Obala Bjelokosti",
    CK: "Cookovi Otoci",
    CL: "Čile",
    CM: "Kamerun",
    CN: "Kina",
    CO: "Kolumbija",
    CR: "Kostarika",
    CU: "Kuba",
    CV: "Zelenortska Republika",
    CW: "Curaçao",
    CX: "Božićni otok",
    CY: "Cipar",
    CZ: "Češka",
    DE: "Njemačka",
    DJ: "Džibuti",
    DK: "Danska",
    DM: "Dominika",
    DO: "Dominikanska Republika",
    DZ: "Alžir",
    EC: "Ekvador",
    EE: "Estonija",
    EG: "Egipat",
    EH: "Zapadna Sahara",
    ER: "Eritreja",
    ES: "Španjolska",
    ET: "Etiopija",
    FI: "Finska",
    FJ: "Fidži",
    FK: "Falklandski otoci",
    FM: "Mikronezija",
    FO: "Farski otoci",
    FR: "Francuska",
    GA: "Gabon",
    GB: "Ujedinjeno Kraljevstvo",
    GD: "Grenada",
    GE: "Gruzija",
    GF: "Francuska Gijana",
    GG: "Guernsey",
    GH: "Gana",
    GI: "Gibraltar",
    GL: "Grenland",
    GM: "Gambija",
    GN: "Gvineja",
    GP: "Guadalupe",
    GQ: "Ekvatorska Gvineja",
    GR: "Grčka",
    GS: "Južna Georgija i Južni Sendvički Otoci",
    GT: "Gvatemala",
    GU: "Guam",
    GW: "Gvineja Bisau",
    GY: "Gvajana",
    HK: "PUP Hong Kong Kina",
    HM: "Otoci Heard i McDonald",
    HN: "Honduras",
    HR: "Hrvatska",
    HT: "Haiti",
    HU: "Mađarska",
    ID: "Indonezija",
    IE: "Irska",
    IL: "Izrael",
    IM: "Otok Man",
    IN: "Indija",
    IO: "Britanski Indijskooceanski teritorij",
    IQ: "Irak",
    IR: "Iran",
    IS: "Island",
    IT: "Italija",
    JE: "Jersey",
    JM: "Jamajka",
    JO: "Jordan",
    JP: "Japan",
    KE: "Kenija",
    KG: "Kirgistan",
    KH: "Kambodža",
    KI: "Kiribati",
    KM: "Komori",
    KN: "Sveti Kristofor i Nevis",
    KP: "Sjeverna Koreja",
    KR: "Južna Koreja",
    KW: "Kuvajt",
    KY: "Kajmanski otoci",
    KZ: "Kazahstan",
    LA: "Laos",
    LB: "Libanon",
    LC: "Sveta Lucija",
    LI: "Lihtenštajn",
    LK: "Šri Lanka",
    LR: "Liberija",
    LS: "Lesoto",
    LT: "Litva",
    LU: "Luksemburg",
    LV: "Latvija",
    LY: "Libija",
    MA: "Maroko",
    MC: "Monako",
    MD: "Moldavija",
    ME: "Crna Gora",
    MF: "Saint Martin",
    MG: "Madagaskar",
    MH: "Maršalovi Otoci",
    MK: "Makedonija",
    ML: "Mali",
    MM: "Mjanmar (Burma)",
    MN: "Mongolija",
    MO: "PUP Makao Kina",
    MP: "Sjevernomarijanski otoci",
    MQ: "Martinique",
    MR: "Mauretanija",
    MS: "Montserrat",
    MT: "Malta",
    MU: "Mauricijus",
    MV: "Maldivi",
    MW: "Malavi",
    MX: "Meksiko",
    MY: "Malezija",
    MZ: "Mozambik",
    NA: "Namibija",
    NC: "Nova Kaledonija",
    NE: "Niger",
    NF: "Otok Norfolk",
    NG: "Nigerija",
    NI: "Nikaragva",
    NL: "Nizozemska",
    NO: "Norveška",
    NP: "Nepal",
    NR: "Nauru",
    NU: "Niue",
    NZ: "Novi Zeland",
    OM: "Oman",
    PA: "Panama",
    PE: "Peru",
    PF: "Francuska Polinezija",
    PG: "Papua Nova Gvineja",
    PH: "Filipini",
    PK: "Pakistan",
    PL: "Poljska",
    PM: "Saint-Pierre-et-Miquelon",
    PN: "Otoci Pitcairn",
    PR: "Portoriko",
    PS: "Palestinsko Područje",
    PT: "Portugal",
    PW: "Palau",
    PY: "Paragvaj",
    QA: "Katar",
    RE: "Réunion",
    RO: "Rumunjska",
    RS: "Srbija",
    RU: "Rusija",
    RW: "Ruanda",
    SA: "Saudijska Arabija",
    SB: "Salomonski Otoci",
    SC: "Sejšeli",
    SD: "Sudan",
    SE: "Švedska",
    SG: "Singapur",
    SH: "Sveta Helena",
    SI: "Slovenija",
    SJ: "Svalbard i Jan Mayen",
    SK: "Slovačka",
    SL: "Sijera Leone",
    SM: "San Marino",
    SN: "Senegal",
    SO: "Somalija",
    SR: "Surinam",
    SS: "Južni Sudan",
    ST: "Sveti Toma i Princip",
    SV: "Salvador",
    SX: "Sint Maarten",
    SY: "Sirija",
    SZ: "Svazi",
    TC: "Otoci Turks i Caicos",
    TD: "Čad",
    TF: "Francuski južni i antarktički teritoriji",
    TG: "Togo",
    TH: "Tajland",
    TJ: "Tadžikistan",
    TK: "Tokelau",
    TL: "Timor-Leste",
    TM: "Turkmenistan",
    TN: "Tunis",
    TO: "Tonga",
    TR: "Turska",
    TT: "Trinidad i Tobago",
    TV: "Tuvalu",
    TW: "Tajvan",
    TZ: "Tanzanija",
    UA: "Ukrajina",
    UG: "Uganda",
    UM: "Mali udaljeni otoci SAD-a",
    US: "Sjedinjene Američke Države",
    UY: "Urugvaj",
    UZ: "Uzbekistan",
    VA: "Vatikanski Grad",
    VC: "Sveti Vincent i Grenadini",
    VE: "Venezuela",
    VG: "Britanski Djevičanski otoci",
    VI: "Američki Djevičanski otoci",
    VN: "Vijetnam",
    VU: "Vanuatu",
    WF: "Wallis i Futuna",
    WS: "Samoa",
    XK: "Kosovo",
    YE: "Jemen",
    YT: "Mayotte",
    ZA: "Južnoafrička Republika",
    ZM: "Zambija",
    ZW: "Zimbabve"
  };
  var hr = {
    locale: locale$h,
    countries: countries$h
  };

  var hr$1 = /*#__PURE__*/Object.freeze({
    locale: locale$h,
    countries: countries$h,
    default: hr
  });

  var locale$i = "hu";
  var countries$i = {
    AF: "Afganisztán",
    AL: "Albánia",
    DZ: "Algéria",
    AS: "Amerikai Szamoa",
    AD: "Andorra",
    AO: "Angola",
    AI: "Anguilla",
    AQ: "Antarktisz",
    AG: "Antigua és Barbuda",
    AR: "Argentína",
    AM: "Örményország",
    AW: "Aruba",
    AU: "Ausztrália",
    AT: "Ausztria",
    AZ: "Azerbajdzsán",
    BS: "Bahama-szigetek",
    BH: "Bahrein",
    BD: "Banglades",
    BB: "Barbados",
    BY: "Fehéroroszország",
    BE: "Belgium",
    BZ: "Belize",
    BJ: "Benin",
    BM: "Bermuda",
    BT: "Bhután",
    BO: "Bolívia",
    BA: "Bosznia-Hercegovina",
    BW: "Botswana",
    BV: "Bouvet-sziget",
    BR: "Brazília",
    IO: "Brit Indiai-óceáni Terület",
    BN: "Brunei",
    BG: "Bulgária",
    BF: "Burkina Faso",
    BI: "Burundi",
    KH: "Kambodzsa",
    CM: "Kamerun",
    CA: "Kanada",
    CV: "Zöld-foki Köztársaság",
    KY: "Kajmán-szigetek",
    CF: "Közép-afrikai Köztársaság",
    TD: "Csád",
    CL: "Chile",
    CN: "Kína",
    CX: "Karácsony-sziget",
    CC: "Kókusz (Keeling)-szigetek",
    CO: "Kolumbia",
    KM: "Comore-szigetek",
    CG: "Kongói Köztársaság",
    CD: "Kongói Demokratikus Köztársaság",
    CK: "Cook-szigetek",
    CR: "Costa Rica",
    CI: "Elefántcsontpart",
    HR: "Horvátország",
    CU: "Kuba",
    CY: "Ciprus",
    CZ: "Csehország",
    DK: "Dánia",
    DJ: "Dzsibuti",
    DM: "Dominikai Közösség",
    DO: "Dominikai Köztársaság",
    EC: "Ecuador",
    EG: "Egyiptom",
    SV: "Salvador",
    GQ: "Egyenlítői-Guinea",
    ER: "Eritrea",
    EE: "Észtország",
    ET: "Etiópia",
    FK: "Falkland-szigetek",
    FO: "Feröer",
    FJ: "Fidzsi-szigetek",
    FI: "Finnország",
    FR: "Franciaország",
    GF: "Francia Guyana",
    PF: "Francia Polinézia",
    TF: "Francia déli területek",
    GA: "Gabon",
    GM: "Gambia",
    GE: "Grúzia",
    DE: "Németország",
    GH: "Ghána",
    GI: "Gibraltár",
    GR: "Görögország",
    GL: "Grönland",
    GD: "Grenada",
    GP: "Guadeloupe",
    GU: "Guam",
    GT: "Guatemala",
    GN: "Guinea",
    GW: "Bissau-Guinea",
    GY: "Guyana",
    HT: "Haiti",
    HM: "Heard-sziget és McDonald-szigetek",
    VA: "Vatikán",
    HN: "Honduras",
    HK: "Hong Kong",
    HU: "Magyarország",
    IS: "Izland",
    IN: "India",
    ID: "Indonézia",
    IR: "Irán",
    IQ: "Irak",
    IE: "Írország",
    IL: "Izrael",
    IT: "Olaszország",
    JM: "Jamaica",
    JP: "Japán",
    JO: "Jordánia",
    KZ: "Kazahsztán",
    KE: "Kenya",
    KI: "Kiribati",
    KP: "Észak-Korea",
    KR: "Dél-Korea",
    KW: "Kuvait",
    KG: "Kirgizisztán",
    LA: "Laosz",
    LV: "Lettország",
    LB: "Libanon",
    LS: "Lesotho",
    LR: "Libéria",
    LY: "Líbia",
    LI: "Liechtenstein",
    LT: "Litvánia",
    LU: "Luxemburg",
    MO: "Makao",
    MK: "Macedónia",
    MG: "Madagaszkár",
    MW: "Malawi",
    MY: "Malajzia",
    MV: "Maldív-szigetek",
    ML: "Mali",
    MT: "Málta",
    MH: "Marshall-szigetek",
    MQ: "Martinique",
    MR: "Mauritánia",
    MU: "Mauritius",
    YT: "Mayotte",
    MX: "Mexikó",
    FM: "Mikronéziai Szövetségi Államok",
    MD: "Moldova",
    MC: "Monaco",
    MN: "Mongólia",
    MS: "Montserrat",
    MA: "Marokkó",
    MZ: "Mozambik",
    MM: "Mianmar",
    NA: "Namíbia",
    NR: "Nauru",
    NP: "Nepál",
    NL: "Hollandia",
    NC: "Új-Kaledónia",
    NZ: "Új-Zéland",
    NI: "Nicaragua",
    NE: "Niger",
    NG: "Nigéria",
    NU: "Niue",
    NF: "Norfolk-sziget",
    MP: "Északi-Mariana-szigetek",
    NO: "Norvégia",
    OM: "Omán",
    PK: "Pakisztán",
    PW: "Palau",
    PS: "Palesztina",
    PA: "Panama",
    PG: "Pápua Új-Guinea",
    PY: "Paraguay",
    PE: "Peru",
    PH: "Fülöp-szigetek",
    PN: "Pitcairn-szigetek",
    PL: "Lengyelország",
    PT: "Portugália",
    PR: "Puerto Rico",
    QA: "Katar",
    RE: "Réunion",
    RO: "Románia",
    RU: "Oroszország",
    RW: "Ruanda",
    SH: "Saint Helena",
    KN: "Saint Kitts és Nevis",
    LC: "Saint Lucia",
    PM: "Saint Pierre and Miquelon",
    VC: "Saint Vincent és a Grenadine-szigetek",
    WS: "Szamoa",
    SM: "San Marino",
    ST: "São Tomé és Príncipe",
    SA: "Szaudi-Arábia",
    SN: "Szenegál",
    SC: "Seychelle-szigetek",
    SL: "Sierra Leone",
    SG: "Szingapúr",
    SK: "Szlovákia",
    SI: "Szlovénia",
    SB: "Salamon-szigetek",
    SO: "Szomália",
    ZA: "Dél-Afrika",
    GS: "Déli-Georgia és Déli-Sandwich-szigetek",
    ES: "Spanyolország",
    LK: "Sri Lanka",
    SD: "Szudán",
    SR: "Suriname",
    SJ: "Spitzbergák és Jan Mayen",
    SZ: "Szváziföld",
    SE: "Svédország",
    CH: "Svájc",
    SY: "Szíria",
    TW: "Tajvan",
    TJ: "Tádzsikisztán",
    TZ: "Tanzánia",
    TH: "Thaiföld",
    TL: "Kelet-Timor",
    TG: "Togo",
    TK: "Tokelau-szigetek",
    TO: "Tonga",
    TT: "Trinidad és Tobago",
    TN: "Tunézia",
    TR: "Törökország",
    TM: "Türkmenisztán",
    TC: "Turks- és Caicos-szigetek",
    TV: "Tuvalu",
    UG: "Uganda",
    UA: "Ukrajna",
    AE: "Egyesült Arab Emírségek",
    GB: "Egyesült Királyság",
    US: "Amerikai Egyesült Államok",
    UM: "Az Amerikai Egyesült Államok lakatlan külbirtokai",
    UY: "Uruguay",
    UZ: "Üzbegisztán",
    VU: "Vanuatu",
    VE: "Venezuela",
    VN: "Vietnam",
    VG: "Brit Virgin-szigetek",
    VI: "Amerikai Virgin-szigetek",
    WF: "Wallis és Futuna",
    EH: "Nyugat-Szahara",
    YE: "Jemen",
    ZM: "Zambia",
    ZW: "Zimbabwe",
    AX: "Åland",
    BQ: "Karibi Hollandia",
    CW: "Curaçao",
    GG: "Guernsey",
    IM: "Man-sziget",
    JE: "Jersey",
    ME: "Montenegró",
    BL: "Saint Barthélemy",
    MF: "Szent Márton-sziget (francia rész)",
    RS: "Szerbia",
    SX: "Szent Márton-sziget (holland rész)",
    SS: "Dél-Szudán",
    XK: "Koszovó"
  };
  var hu = {
    locale: locale$i,
    countries: countries$i
  };

  var hu$1 = /*#__PURE__*/Object.freeze({
    locale: locale$i,
    countries: countries$i,
    default: hu
  });

  var locale$j = "hy";
  var countries$j = {
    AD: "Անդորրա",
    AE: "Արաբական Միացյալ Էմիրություններ",
    AF: "Աֆղանստան",
    AG: "Անտիգուա և Բարբուդա",
    AI: "Անգուիլա",
    AL: "Ալբանիա",
    AM: "Հայաստան",
    AO: "Անգոլա",
    AQ: "Անտարկտիդա",
    AR: "Արգենտինա",
    AS: "Ամերիկյան Սամոա",
    AT: "Ավստրիա",
    AU: "Ավստրալիա",
    AW: "Արուբա",
    AX: "Ալանդյան կղզիներ",
    AZ: "Ադրբեջան",
    BA: "Բոսնիա և Հերցեգովինա",
    BB: "Բարբադոս",
    BD: "Բանգլադեշ",
    BE: "Բելգիա",
    BF: "Բուրկինա Ֆասո",
    BG: "Բուլղարիա",
    BH: "Բահրեյն",
    BI: "Բուրունդի",
    BJ: "Բենին",
    BL: "Սեն Բարտելմի",
    BM: "Բերմուդներ",
    BN: "Բրունեյ",
    BO: "Բոլիվիա",
    BQ: "Կարիբյան Նիդեռլանդներ",
    BR: "Բրազիլիա",
    BS: "Բահամաներ",
    BT: "Բութան",
    BV: "Բուվե կղզի",
    BW: "Բոթսվանա",
    BY: "Բելառուս",
    BZ: "Բելիզ",
    CA: "Կանադա",
    CC: "Կոկոսյան (Քիլինգ) կղզիներ",
    CD: "Կոնգո - Կինշասա",
    CF: "Կենտրոնական Աֆրիկյան Հանրապետություն",
    CG: "Կոնգո - Բրազավիլ",
    CH: "Շվեյցարիա",
    CI: "Կոտ դ’Իվուար",
    CK: "Կուկի կղզիներ",
    CL: "Չիլի",
    CM: "Կամերուն",
    CN: "Չինաստան",
    CO: "Կոլումբիա",
    CR: "Կոստա Ռիկա",
    CU: "Կուբա",
    CV: "Կաբո Վերդե",
    CW: "Կյուրասաո",
    CX: "Սուրբ Ծննդյան կղզի",
    CY: "Կիպրոս",
    CZ: "Չեխիա",
    DE: "Գերմանիա",
    DJ: "Ջիբութի",
    DK: "Դանիա",
    DM: "Դոմինիկա",
    DO: "Դոմինիկյան Հանրապետություն",
    DZ: "Ալժիր",
    EC: "Էկվադոր",
    EE: "Էստոնիա",
    EG: "Եգիպտոս",
    EH: "Արևմտյան Սահարա",
    ER: "Էրիթրեա",
    ES: "Իսպանիա",
    ET: "Եթովպիա",
    FI: "Ֆինլանդիա",
    FJ: "Ֆիջի",
    FK: "Ֆոլքլենդյան կղզիներ",
    FM: "Միկրոնեզիա",
    FO: "Ֆարերյան կղզիներ",
    FR: "Ֆրանսիա",
    GA: "Գաբոն",
    GB: "Միացյալ Թագավորություն",
    GD: "Գրենադա",
    GE: "Վրաստան",
    GF: "Ֆրանսիական Գվիանա",
    GG: "Գերնսի",
    GH: "Գանա",
    GI: "Ջիբրալթար",
    GL: "Գրենլանդիա",
    GM: "Գամբիա",
    GN: "Գվինեա",
    GP: "Գվադելուպա",
    GQ: "Հասարակածային Գվինեա",
    GR: "Հունաստան",
    GS: "Հարավային Ջորջիա և Հարավային Սենդվիչյան կղզիներ",
    GT: "Գվատեմալա",
    GU: "Գուամ",
    GW: "Գվինեա-Բիսսաու",
    GY: "Գայանա",
    HK: "Հոնկոնգի ՀՎՇ",
    HM: "Հերդ կղզի և ՄակԴոնալդի կղզիներ",
    HN: "Հոնդուրաս",
    HR: "Խորվաթիա",
    HT: "Հայիթի",
    HU: "Հունգարիա",
    ID: "Ինդոնեզիա",
    IE: "Իռլանդիա",
    IL: "Իսրայել",
    IM: "Մեն կղզի",
    IN: "Հնդկաստան",
    IO: "Բրիտանական Տարածք Հնդկական Օվկիանոսում",
    IQ: "Իրաք",
    IR: "Իրան",
    IS: "Իսլանդիա",
    IT: "Իտալիա",
    JE: "Ջերսի",
    JM: "Ճամայկա",
    JO: "Հորդանան",
    JP: "Ճապոնիա",
    KE: "Քենիա",
    KG: "Ղրղզստան",
    KH: "Կամբոջա",
    KI: "Կիրիբատի",
    KM: "Կոմորյան կղզիներ",
    KN: "Սենտ Քիտս և Նևիս",
    KP: "Հյուսիսային Կորեա",
    KR: "Հարավային Կորեա",
    KW: "Քուվեյթ",
    KY: "Կայմանյան կղզիներ",
    KZ: "Ղազախստան",
    LA: "Լաոս",
    LB: "Լիբանան",
    LC: "Սենթ Լյուսիա",
    LI: "Լիխտենշտեյն",
    LK: "Շրի Լանկա",
    LR: "Լիբերիա",
    LS: "Լեսոտո",
    LT: "Լիտվա",
    LU: "Լյուքսեմբուրգ",
    LV: "Լատվիա",
    LY: "Լիբիա",
    MA: "Մարոկկո",
    MC: "Մոնակո",
    MD: "Մոլդովա",
    ME: "Չեռնոգորիա",
    MF: "Սեն Մարտեն",
    MG: "Մադագասկար",
    MH: "Մարշալյան կղզիներ",
    MK: "Մակեդոնիա",
    ML: "Մալի",
    MM: "Մյանմա (Բիրմա)",
    MN: "Մոնղոլիա",
    MO: "Չինաստանի Մակաո ՀՎՇ",
    MP: "Հյուսիսային Մարիանյան կղզիներ",
    MQ: "Մարտինիկա",
    MR: "Մավրիտանիա",
    MS: "Մոնսեռատ",
    MT: "Մալթա",
    MU: "Մավրիկիոս",
    MV: "Մալդիվներ",
    MW: "Մալավի",
    MX: "Մեքսիկա",
    MY: "Մալայզիա",
    MZ: "Մոզամբիկ",
    NA: "Նամիբիա",
    NC: "Նոր Կալեդոնիա",
    NE: "Նիգեր",
    NF: "Նորֆոլկ կղզի",
    NG: "Նիգերիա",
    NI: "Նիկարագուա",
    NL: "Նիդեռլանդներ",
    NO: "Նորվեգիա",
    NP: "Նեպալ",
    NR: "Նաուրու",
    NU: "Նիուե",
    NZ: "Նոր Զելանդիա",
    OM: "Օման",
    PA: "Պանամա",
    PE: "Պերու",
    PF: "Ֆրանսիական Պոլինեզիա",
    PG: "Պապուա Նոր Գվինեա",
    PH: "Ֆիլիպիններ",
    PK: "Պակիստան",
    PL: "Լեհաստան",
    PM: "Սեն Պիեռ և Միքելոն",
    PN: "Պիտկեռն կղզիներ",
    PR: "Պուերտո Ռիկո",
    PS: "Պաղեստինյան տարածքներ",
    PT: "Պորտուգալիա",
    PW: "Պալաու",
    PY: "Պարագվայ",
    QA: "Կատար",
    RE: "Ռեյունիոն",
    RO: "Ռումինիա",
    RS: "Սերբիա",
    RU: "Ռուսաստան",
    RW: "Ռուանդա",
    SA: "Սաուդյան Արաբիա",
    SB: "Սողոմոնյան կղզիներ",
    SC: "Սեյշելներ",
    SD: "Սուդան",
    SE: "Շվեդիա",
    SG: "Սինգապուր",
    SH: "Սուրբ Հեղինեի կղզի",
    SI: "Սլովենիա",
    SJ: "Սվալբարդ և Յան Մայեն",
    SK: "Սլովակիա",
    SL: "Սիեռա Լեոնե",
    SM: "Սան Մարինո",
    SN: "Սենեգալ",
    SO: "Սոմալի",
    SR: "Սուրինամ",
    SS: "Հարավային Սուդան",
    ST: "Սան Տոմե և Փրինսիպի",
    SV: "Սալվադոր",
    SX: "Սինտ Մարտեն",
    SY: "Սիրիա",
    SZ: "Սվազիլենդ",
    TC: "Թըրքս և Կայկոս կղզիներ",
    TD: "Չադ",
    TF: "Ֆրանսիական Հարավային Տարածքներ",
    TG: "Տոգո",
    TH: "Թայլանդ",
    TJ: "Տաջիկստան",
    TK: "Տոկելաու",
    TL: "Թիմոր Լեշտի",
    TM: "Թուրքմենստան",
    TN: "Թունիս",
    TO: "Տոնգա",
    TR: "Թուրքիա",
    TT: "Տրինիդադ և Տոբագո",
    TV: "Տուվալու",
    TW: "Թայվան",
    TZ: "Տանզանիա",
    UA: "Ուկրաինա",
    UG: "Ուգանդա",
    UM: "Արտաքին կղզիներ (ԱՄՆ)",
    US: "Միացյալ Նահանգներ",
    UY: "Ուրուգվայ",
    UZ: "Ուզբեկստան",
    VA: "Վատիկան",
    VC: "Սենթ Վինսենթ և Գրենադիններ",
    VE: "Վենեսուելա",
    VG: "Բրիտանական Վիրջինյան կղզիներ",
    VI: "ԱՄՆ Վիրջինյան կղզիներ",
    VN: "Վիետնամ",
    VU: "Վանուատու",
    WF: "Ուոլիս և Ֆուտունա",
    WS: "Սամոա",
    XK: "Կոսովո",
    YE: "Եմեն",
    YT: "Մայոտ",
    ZA: "Հարավաֆրիկյան Հանրապետություն",
    ZM: "Զամբիա",
    ZW: "Զիմբաբվե"
  };
  var hy = {
    locale: locale$j,
    countries: countries$j
  };

  var hy$1 = /*#__PURE__*/Object.freeze({
    locale: locale$j,
    countries: countries$j,
    default: hy
  });

  var locale$k = "id";
  var countries$k = {
    AF: "Afghanistan",
    AL: "Albania",
    DZ: "Algeria",
    AS: "Amerika Serikat",
    AD: "Andorra",
    AO: "Angola",
    AI: "Anguilla",
    AQ: "Antarctica",
    AG: "Antigua dan Barbuda",
    AR: "Argentina",
    AM: "Armenia",
    AW: "Aruba",
    AU: "Australia",
    AT: "Austria",
    AZ: "Azerbaijan",
    BS: "Bahama",
    BH: "Bahrain",
    BD: "Bangladesh",
    BB: "Barbados",
    BY: "Belarusia",
    BE: "Belgia",
    BZ: "Belize",
    BJ: "Benin",
    BM: "Bermuda",
    BT: "Bhutan",
    BO: "Bolivia",
    BA: "Bosnia dan Herzegovina",
    BW: "Botswana",
    BV: "Kepulauan Bouvet",
    BR: "Brasil",
    IO: "Teritori Samudra Hindia Britania",
    BN: "Brunei Darussalam",
    BG: "Bulgaria",
    BF: "Burkina Faso",
    BI: "Burundi",
    KH: "Kamboja",
    CM: "Kamerun",
    CA: "Kanada",
    CV: "Tanjung Verde",
    KY: "Kepulauan Cayman",
    CF: "Afrika Tengah",
    TD: "Chad",
    CL: "Chile",
    CN: "China",
    CX: "Pulau Natal",
    CC: "Kepulauan Cocos (Keeling)",
    CO: "Kolombia",
    KM: "Komoro",
    CG: "Kongo",
    CD: "Republik Demokratik Kongo",
    CK: "Kepulauan Cook",
    CR: "Kosta Rika",
    CI: "Pantai Gading",
    HR: "Kroasia",
    CU: "Kuba",
    CY: "Siprus",
    CZ: "Republik Ceko",
    DK: "Denmark",
    DJ: "Djibouti",
    DM: "Dominika",
    DO: "Republik Dominika",
    EC: "Ekuador",
    EG: "Mesir",
    SV: "El Salvador",
    GQ: "Guinea Khatulistiwa",
    ER: "Eritrea",
    EE: "Estonia",
    ET: "Ethiopia",
    FK: "Kepulauan Falkland(Malvinas)",
    FO: "Kepulauan Faroe",
    FJ: "Fiji",
    FI: "Finlandia",
    FR: "Perancis",
    GF: "Guyana Perancis",
    PF: "Polinesia Perancis",
    TF: "Antartika Perancis",
    GA: "Gabon",
    GM: "Gambia",
    GE: "Georgia",
    DE: "Jerman",
    GH: "Ghana",
    GI: "Gibraltar",
    GR: "Yunani",
    GL: "Greenland",
    GD: "Grenada",
    GP: "Guadeloupe",
    GU: "Guam",
    GT: "Guatamala",
    GN: "Guinea",
    GW: "Guinea-Bissau",
    GY: "Guyana",
    HT: "Haiti",
    HM: "Pulau Heard dan Kepulauan McDonald",
    VA: "Vatikan",
    HN: "Honduras",
    HK: "Hong Kong",
    HU: "Hungaria",
    IS: "Islandia",
    IN: "India",
    ID: "Indonesia",
    IR: "Iran",
    IQ: "Irak",
    IE: "Irlandia",
    IL: "Israel",
    IT: "Italia",
    JM: "Jamaika",
    JP: "Jepang",
    JO: "Yordania",
    KZ: "Kazakhstan",
    KE: "Kenya",
    KI: "Kiribati",
    KP: "Korea Utara",
    KR: "Korea Selatan",
    KW: "Kuwait",
    KG: "Kyrgyzstan",
    LA: "Laos",
    LV: "Latvia",
    LB: "Lebanon",
    LS: "Lesotho",
    LR: "Liberia",
    LY: "Libya",
    LI: "Liechtenstein",
    LT: "Lithuania",
    LU: "Luxemburg",
    MO: "Makau",
    MK: "Makedonia",
    MG: "Madagaskar",
    MW: "Malawi",
    MY: "Malaysia",
    MV: "Maldives",
    ML: "Mali",
    MT: "Malta",
    MH: "Kepulauan Marshall",
    MQ: "Martinik",
    MR: "Mauritania",
    MU: "Mauritius",
    YT: "Mayotte",
    MX: "Meksiko",
    FM: "Federasi Mikronesia",
    MD: "Moldova",
    MC: "Monako",
    MN: "Mongolia",
    MS: "Montserrat",
    MA: "Moroko",
    MZ: "Mozambik",
    MM: "Myanmar",
    NA: "Namibia",
    NR: "Nauru",
    NP: "Nepal",
    NL: "Belanda",
    NC: "Kaledonia Baru",
    NZ: "Selandia Baru",
    NI: "Nikaragua",
    NE: "Niger",
    NG: "Nigeria",
    NU: "Niue",
    NF: "Kepulauan Norfolk",
    MP: "Kepulauan Mariana Utara",
    NO: "Norwegia",
    OM: "Oman",
    PK: "Pakistan",
    PW: "Palau",
    PS: "Palestina",
    PA: "Panama",
    PG: "Papua Nugini",
    PY: "Paraguay",
    PE: "Peru",
    PH: "Filipina",
    PN: "Pitcairn",
    PL: "Polandia",
    PT: "Portugal",
    PR: "Puerto Riko",
    QA: "Qatar",
    RE: "Reunion",
    RO: "Rumania",
    RU: "Rusia",
    RW: "Rwanda",
    SH: "Saint Helena",
    KN: "Saint Kitts dan Nevis",
    LC: "Saint Lucia",
    PM: "Saint Pierre dan Miquelon",
    VC: "Saint Vincent dan the Grenadines",
    WS: "Samoa",
    SM: "San Marino",
    ST: "Sao Tome dan Principe",
    SA: "Arab Saudi",
    SN: "Senegal",
    SC: "Seychelles",
    SL: "Sierra Leone",
    SG: "Singapura",
    SK: "Slovakia",
    SI: "Slovenia",
    SB: "Kepulauan Solomon",
    SO: "Somalia",
    ZA: "Afrika Selatan",
    GS: "Georgia Selatan dan Kepulauan Sandwich Selatan",
    ES: "Spanyol",
    LK: "Sri Lanka",
    SD: "Sudan",
    SR: "Suriname",
    SJ: "Svalbard dan Jan Mayen",
    SZ: "Swaziland",
    SE: "Sweden",
    CH: "Swiss",
    SY: "Suriah",
    TW: "Taiwan",
    TJ: "Tajikistan",
    TZ: "Tanzania",
    TH: "Thailand",
    TL: "Timor-Leste",
    TG: "Togo",
    TK: "Tokelau",
    TO: "Tonga",
    TT: "Trinidad dan Tobago",
    TN: "Tunisia",
    TR: "Turki",
    TM: "Turkmenistan",
    TC: "Turks dan Caicos Islands",
    TV: "Tuvalu",
    UG: "Uganda",
    UA: "Ukraina",
    AE: "Uni Emirat Arab",
    GB: "Britania Raya",
    US: "Amerika Serikat",
    UM: "United States Minor Outlying Islands",
    UY: "Uruguay",
    UZ: "Uzbekistan",
    VU: "Vanuatu",
    VE: "Venezuela",
    VN: "Viet Nam",
    VG: "Virgin Islands, British",
    VI: "Virgin Islands, U.S.",
    WF: "Wallis and Futuna",
    EH: "Sahara Barat",
    YE: "Yaman",
    ZM: "Zambia",
    ZW: "Zimbabwe",
    AX: "Åland Islands",
    BQ: "Bonaire, Sint Eustatius and Saba",
    CW: "Curaçao",
    GG: "Guernsey",
    IM: "Isle of Man",
    JE: "Jersey",
    ME: "Montenegro",
    BL: "Saint Barthélemy",
    MF: "Saint Martin (French part)",
    RS: "Serbia",
    SX: "Sint Maarten (Dutch part)",
    SS: "Sudan Selatan",
    XK: "Kosovo"
  };
  var id = {
    locale: locale$k,
    countries: countries$k
  };

  var id$1 = /*#__PURE__*/Object.freeze({
    locale: locale$k,
    countries: countries$k,
    default: id
  });

  var locale$l = "it";
  var countries$l = {
    AD: "Andorra",
    AE: "Emirati Arabi Uniti",
    AF: "Afghanistan",
    AG: "Antigua e Barbuda",
    AI: "Anguilla",
    AL: "Albania",
    AM: "Armenia",
    AO: "Angola",
    AQ: "Antartide",
    AR: "Argentina",
    AS: "Samoa Americane",
    AT: "Austria",
    AU: "Australia",
    AW: "Aruba",
    AX: "Isole Åland",
    AZ: "Azerbaigian",
    BA: "Bosnia ed Erzegovina",
    BB: "Barbados",
    BD: "Bangladesh",
    BE: "Belgio",
    BF: "Burkina Faso",
    BG: "Bulgaria",
    BH: "Bahrain",
    BI: "Burundi",
    BJ: "Benin",
    BL: "Saint-Barthélemy",
    BM: "Bermuda",
    BN: "Brunei",
    BO: "Bolivia",
    BQ: "Isole BES",
    BR: "Brasile",
    BS: "Bahamas",
    BT: "Bhutan",
    BV: "Isola Bouvet",
    BW: "Botswana",
    BY: "Bielorussia",
    BZ: "Belize",
    CA: "Canada",
    CC: "Isole Cocos e Keeling",
    CD: "Repubblica Democratica del Congo",
    CF: "Repubblica Centrafricana",
    CG: "Repubblica del Congo",
    CH: "Svizzera",
    CI: "Costa d'Avorio",
    CK: "Isole Cook",
    CL: "Cile",
    CM: "Camerun",
    CN: "Cina",
    CO: "Colombia",
    CR: "Costa Rica",
    CU: "Cuba",
    CV: "Capo Verde",
    CW: "Curaçao",
    CX: "Isola del Natale",
    CY: "Cipro",
    CZ: "Repubblica Ceca",
    DE: "Germania",
    DJ: "Gibuti",
    DK: "Danimarca",
    DM: "Dominica",
    DO: "Repubblica Dominicana",
    DZ: "Algeria",
    EC: "Ecuador",
    EE: "Estonia",
    EG: "Egitto",
    EH: "Sahara Occidentale",
    ER: "Eritrea",
    ES: "Spagna",
    ET: "Etiopia",
    FI: "Finlandia",
    FJ: "Figi",
    FK: "Isole Falkland",
    FM: "Stati Federati di Micronesia",
    FO: "Isole Fær Øer",
    FR: "Francia",
    GA: "Gabon",
    GB: "Regno Unito",
    GD: "Grenada",
    GE: "Georgia",
    GF: "Guyana Francese",
    GG: "Guernsey",
    GH: "Ghana",
    GI: "Gibilterra",
    GL: "Groenlandia",
    GM: "Gambia",
    GN: "Guinea",
    GP: "Guadalupa",
    GQ: "Guinea Equatoriale",
    GR: "Grecia",
    GS: "Georgia del Sud e isole Sandwich meridionali",
    GT: "Guatemala",
    GU: "Guam",
    GW: "Guinea-Bissau",
    GY: "Guyana",
    HK: "Hong Kong",
    HM: "Isole Heard e McDonald",
    HN: "Honduras",
    HR: "Croazia",
    HT: "Haiti",
    HU: "Ungheria",
    ID: "Indonesia",
    IE: "Irlanda",
    IL: "Israele",
    IM: "Isola di Man",
    IN: "India",
    IO: "Territori Britannici dell'Oceano Indiano",
    IQ: "Iraq",
    IR: "Iran",
    IS: "Islanda",
    IT: "Italia",
    JE: "Jersey",
    JM: "Giamaica",
    JO: "Giordania",
    JP: "Giappone",
    KE: "Kenya",
    KG: "Kirghizistan",
    KH: "Cambogia",
    KI: "Kiribati",
    KM: "Comore",
    KN: "Saint Kitts e Nevis",
    KP: "Corea del Nord",
    KR: "Corea del Sud",
    KW: "Kuwait",
    KY: "Isole Cayman",
    KZ: "Kazakistan",
    LA: "Laos",
    LB: "Libano",
    LC: "Santa Lucia",
    LI: "Liechtenstein",
    LK: "Sri Lanka",
    LR: "Liberia",
    LS: "Lesotho",
    LT: "Lituania",
    LU: "Lussemburgo",
    LV: "Lettonia",
    LY: "Libia",
    MA: "Marocco",
    MC: "Monaco",
    MD: "Moldavia",
    ME: "Montenegro",
    MF: "Saint-Martin",
    MG: "Madagascar",
    MH: "Isole Marshall",
    MK: "Macedonia",
    ML: "Mali",
    MM: "Birmania  Myanmar",
    MN: "Mongolia",
    MO: "Macao",
    MP: "Isole Marianne Settentrionali",
    MQ: "Martinica",
    MR: "Mauritania",
    MS: "Montserrat",
    MT: "Malta",
    MU: "Mauritius",
    MV: "Maldive",
    MW: "Malawi",
    MX: "Messico",
    MY: "Malesia",
    MZ: "Mozambico",
    NA: "Namibia",
    NC: "Nuova Caledonia",
    NE: "Niger",
    NF: "Isola Norfolk",
    NG: "Nigeria",
    NI: "Nicaragua",
    NL: "Paesi Bassi",
    NO: "Norvegia",
    NP: "Nepal",
    NR: "Nauru",
    NU: "Niue",
    NZ: "Nuova Zelanda",
    OM: "Oman",
    PA: "Panamá",
    PE: "Perù",
    PF: "Polinesia Francese",
    PG: "Papua Nuova Guinea",
    PH: "Filippine",
    PK: "Pakistan",
    PL: "Polonia",
    PM: "Saint Pierre e Miquelon",
    PN: "Isole Pitcairn",
    PR: "Porto Rico",
    PS: "Stato di Palestina",
    PT: "Portogallo",
    PW: "Palau",
    PY: "Paraguay",
    QA: "Qatar",
    RE: "Réunion",
    RO: "Romania",
    RS: "Serbia",
    RU: "Russia",
    RW: "Ruanda",
    SA: "Arabia Saudita",
    SB: "Isole Salomone",
    SC: "Seychelles",
    SD: "Sudan",
    SE: "Svezia",
    SG: "Singapore",
    SH: "Sant'Elena, Isola di Ascensione e Tristan da Cunha",
    SI: "Slovenia",
    SJ: "Svalbard e Jan Mayen",
    SK: "Slovacchia",
    SL: "Sierra Leone",
    SM: "San Marino",
    SN: "Senegal",
    SO: "Somalia",
    SR: "Suriname",
    SS: "Sudan del Sud",
    ST: "São Tomé e Príncipe",
    SV: "El Salvador",
    SX: "Sint Maarten",
    SY: "Siria",
    SZ: "Swaziland",
    TC: "Isole Turks e Caicos",
    TD: "Ciad",
    TF: "Territori Francesi del Sud",
    TG: "Togo",
    TH: "Thailandia",
    TJ: "Tagikistan",
    TK: "Tokelau",
    TL: "Timor Est",
    TM: "Turkmenistan",
    TN: "Tunisia",
    TO: "Tonga",
    TR: "Turchia",
    TT: "Trinidad e Tobago",
    TV: "Tuvalu",
    TW: "Repubblica di Cina",
    TZ: "Tanzania",
    UA: "Ucraina",
    UG: "Uganda",
    UM: "Isole minori esterne degli Stati Uniti",
    US: "Stati Uniti d'America",
    UY: "Uruguay",
    UZ: "Uzbekistan",
    VA: "Città del Vaticano",
    VC: "Saint Vincent e Grenadine",
    VE: "Venezuela",
    VG: "Isole Vergini Britanniche",
    VI: "Isole Vergini Americane",
    VN: "Vietnam",
    VU: "Vanuatu",
    WF: "Wallis e Futuna",
    WS: "Samoa",
    YE: "Yemen",
    YT: "Mayotte",
    ZA: "Sudafrica",
    ZM: "Zambia",
    ZW: "Zimbabwe",
    XK: "Kosovo"
  };
  var it = {
    locale: locale$l,
    countries: countries$l
  };

  var it$1 = /*#__PURE__*/Object.freeze({
    locale: locale$l,
    countries: countries$l,
    default: it
  });

  var locale$m = "ja";
  var countries$m = {
    AF: "アフガニスタン",
    AL: "アルバニア",
    DZ: "アルジェリア",
    AS: "アメリカ領サモア",
    AD: "アンドラ",
    AO: "アンゴラ",
    AI: "アンギラ",
    AQ: "南極",
    AG: "アンティグア・バーブーダ",
    AR: "アルゼンチン",
    AM: "アルメニア",
    AW: "アルバ",
    AU: "オーストラリア",
    AT: "オーストリア",
    AZ: "アゼルバイジャン",
    BS: "バハマ",
    BH: "バーレーン",
    BD: "バングラデシュ",
    BB: "バルバドス",
    BY: "ベラルーシ",
    BE: "ベルギー",
    BZ: "ベリーズ",
    BJ: "ベナン",
    BM: "バミューダ",
    BT: "ブータン",
    BO: "ボリビア多民族国",
    BA: "ボスニア・ヘルツェゴビナ",
    BW: "ボツワナ",
    BV: "ブーベ島",
    BR: "ブラジル",
    IO: "イギリス領インド洋地域",
    BN: "ブルネイ・ダルサラーム",
    BG: "ブルガリア",
    BF: "ブルキナファソ",
    BI: "ブルンジ",
    KH: "カンボジア",
    CM: "カメルーン",
    CA: "カナダ",
    CV: "カーボベルデ",
    KY: "ケイマン諸島",
    CF: "中央アフリカ共和国",
    TD: "チャド",
    CL: "チリ",
    CN: "中華人民共和国",
    CX: "クリスマス島",
    CC: "ココス（キーリング）諸島",
    CO: "コロンビア",
    KM: "小諸",
    CG: "コンゴ共和国",
    CD: "コンゴ民主共和国",
    CK: "クック諸島",
    CR: "コスタリカ",
    CI: "コートジボワール",
    HR: "クロアチア",
    CU: "キューバ",
    CY: "キプロス",
    CZ: "チェコ",
    DK: "デンマーク",
    DJ: "ジブチ",
    DM: "ドミニカ国",
    DO: "ドミニカ共和国",
    EC: "エクアドル",
    EG: "エジプト",
    SV: "エルサルバドル",
    GQ: "赤道ギニア",
    ER: "エリトリア",
    EE: "エストニア",
    ET: "エチオピア",
    FK: "フォークランド（マルビナス）諸島",
    FO: "フェロー諸島",
    FJ: "フィジー",
    FI: "フィンランド",
    FR: "フランス",
    GF: "フランス領ギアナ",
    PF: "フランス領ポリネシア",
    TF: "フランス領南方・南極地域",
    GA: "ガボン",
    GM: "ガンビア",
    GE: "ジョージア",
    DE: "ドイツ",
    GH: "ガーナ",
    GI: "ジブラルタル",
    GR: "ギリシャ",
    GL: "グリーンランド",
    GD: "グレナダ",
    GP: "グアドループ",
    GU: "グアム",
    GT: "グアテマラ",
    GN: "ギニア",
    GW: "ギニアビサウ",
    GY: "ガイアナ",
    HT: "ハイチ",
    HM: "ハード島とマクドナルド諸島",
    VA: "バチカン市国",
    HN: "ホンジュラス",
    HK: "香港",
    HU: "ハンガリー",
    IS: "アイスランド",
    IN: "インド",
    ID: "インドネシア",
    IR: "イラン・イスラム共和国",
    IQ: "イラク",
    IE: "アイルランド",
    IL: "イスラエル",
    IT: "イタリア",
    JM: "ジャマイカ",
    JP: "日本",
    JO: "ヨルダン",
    KZ: "カザフスタン",
    KE: "ケニア",
    KI: "キリバス",
    KP: "朝鮮民主主義人民共和国",
    KR: "大韓民国",
    KW: "クウェート",
    KG: "キルギス",
    LA: "ラオス人民民主共和国",
    LV: "ラトビア",
    LB: "レバノン",
    LS: "レソト",
    LR: "リベリア",
    LY: "リビア",
    LI: "リヒテンシュタイン",
    LT: "リトアニア",
    LU: "ルクセンブルク",
    MO: "マカオ",
    MK: "マケドニア旧ユーゴスラビア共和国",
    MG: "マダガスカル",
    MW: "マラウイ",
    MY: "マレーシア",
    MV: "モルディブ",
    ML: "マリ",
    MT: "マルタ",
    MH: "マーシャル諸島",
    MQ: "マルティニーク",
    MR: "モーリタニア",
    MU: "モーリシャス",
    YT: "マヨット",
    MX: "メキシコ",
    FM: "ミクロネシア連邦",
    MD: "モルドバ共和国",
    MC: "モナコ",
    MN: "モンゴル",
    MS: "モントセラト",
    MA: "モロッコ",
    MZ: "モザンビーク",
    MM: "ミャンマー",
    NA: "ナミビア",
    NR: "ナウル",
    NP: "ネパール",
    NL: "オランダ",
    NC: "ニューカレドニア",
    NZ: "ニュージーランド",
    NI: "ニカラグア",
    NE: "ニジェール",
    NG: "ナイジェリア",
    NU: "ニウエ",
    NF: "ノーフォーク島",
    MP: "北マリアナ諸島",
    NO: "ノルウェー",
    OM: "オマーン",
    PK: "パキスタン",
    PW: "パラオ",
    PS: "パレスチナ",
    PA: "パナマ",
    PG: "パプアニューギニア",
    PY: "パラグアイ",
    PE: "ペルー",
    PH: "フィリピン",
    PN: "ピトケアン",
    PL: "ポーランド",
    PT: "ポルトガル",
    PR: "プエルトリコ",
    QA: "カタール",
    RE: "レユニオン",
    RO: "ルーマニア",
    RU: "ロシア連邦",
    RW: "ルワンダ",
    SH: "セントヘレナ・アセンションおよびトリスタンダクーニャ",
    KN: "セントクリストファー・ネイビス",
    LC: "セントルシア",
    PM: "サンピエール島・ミクロン島",
    VC: "セントビンセントおよびグレナディーン諸島",
    WS: "サモア",
    SM: "サンマリノ",
    ST: "サントメ・プリンシペ",
    SA: "サウジアラビア",
    SN: "セネガル",
    SC: "セーシェル",
    SL: "シエラレオネ",
    SG: "シンガポール",
    SK: "スロバキア",
    SI: "スロベニア",
    SB: "ソロモン諸島",
    SO: "ソマリア",
    ZA: "南アフリカ",
    GS: "サウスジョージア・サウスサンドウィッチ諸島",
    ES: "スペイン",
    LK: "スリランカ",
    SD: "スーダン",
    SR: "スリナム",
    SJ: "スヴァールバル諸島およびヤンマイエン島",
    SZ: "スワジランド",
    SE: "スウェーデン",
    CH: "スイス",
    SY: "シリア・アラブ共和国",
    TW: "台湾",
    TJ: "タジキスタン",
    TZ: "タンザニア",
    TH: "タイ",
    TL: "東ティモール",
    TG: "トーゴ",
    TK: "トケラウ",
    TO: "トンガ",
    TT: "トリニダード・トバゴ",
    TN: "チュニジア",
    TR: "トルコ",
    TM: "トルクメニスタン",
    TC: "タークス・カイコス諸島",
    TV: "ツバル",
    UG: "ウガンダ",
    UA: "ウクライナ",
    AE: "アラブ首長国連邦",
    GB: "イギリス",
    US: "アメリカ合衆国",
    UM: "合衆国領有小離島",
    UY: "ウルグアイ",
    UZ: "ウズベキスタン",
    VU: "バヌアツ",
    VE: "ベネズエラ・ボリバル共和国",
    VN: "ベトナム",
    VG: "イギリス領ヴァージン諸島",
    VI: "アメリカ領ヴァージン諸島",
    WF: "ウォリス・フツナ",
    EH: "西サハラ",
    YE: "イエメン",
    ZM: "ザンビア",
    ZW: "ジンバブエ",
    AX: "オーランド諸島",
    BQ: "ボネール、シント・ユースタティウスおよびサバ",
    CW: "キュラソー",
    GG: "ガーンジー",
    IM: "マン島",
    JE: "ジャージー",
    ME: "モンテネグロ",
    BL: "サン・バルテルミー",
    MF: "サン・マルタン（フランス領）",
    RS: "セルビア",
    SX: "シント・マールテン（オランダ領）",
    SS: "南スーダン",
    XK: "コソボ"
  };
  var ja = {
    locale: locale$m,
    countries: countries$m
  };

  var ja$1 = /*#__PURE__*/Object.freeze({
    locale: locale$m,
    countries: countries$m,
    default: ja
  });

  var locale$n = "ka";
  var countries$n = {
    AD: "ანდორა",
    AE: "არაბთა გაერთიანებული საამიროები",
    AF: "ავღანეთი",
    AG: "ანტიგუა და ბარბუდა",
    AI: "ანგვილა",
    AL: "ალბანეთი",
    AM: "სომხეთი",
    AO: "ანგოლა",
    AQ: "ანტარქტიკა",
    AR: "არგენტინა",
    AS: "ამერიკის სამოა",
    AT: "ავსტრია",
    AU: "ავსტრალია",
    AW: "არუბა",
    AX: "ალანდის კუნძულები",
    AZ: "აზერბაიჯანი",
    BA: "ბოსნია და ჰერცეგოვინა",
    BB: "ბარბადოსი",
    BD: "ბანგლადეში",
    BE: "ბელგია",
    BF: "ბურკინა-ფასო",
    BG: "ბულგარეთი",
    BH: "ბაჰრეინი",
    BI: "ბურუნდი",
    BJ: "ბენინი",
    BL: "სენ-ბართელმი",
    BM: "ბერმუდა",
    BN: "ბრუნეი",
    BO: "ბოლივია",
    BQ: "კარიბის ნიდერლანდები",
    BR: "ბრაზილია",
    BS: "ბაჰამის კუნძულები",
    BT: "ბუტანი",
    BV: "ბუვე",
    BW: "ბოტსვანა",
    BY: "ბელარუსი",
    BZ: "ბელიზი",
    CA: "კანადა",
    CC: "ქოქოსის (კილინგის) კუნძულები",
    CD: "კონგო - კინშასა",
    CF: "ცენტრალური აფრიკის რესპუბლიკა",
    CG: "კონგო - ბრაზავილი",
    CH: "შვეიცარია",
    CI: "კოტ-დივუარი",
    CK: "კუკის კუნძულები",
    CL: "ჩილე",
    CM: "კამერუნი",
    CN: "ჩინეთი",
    CO: "კოლუმბია",
    CR: "კოსტა-რიკა",
    CU: "კუბა",
    CV: "კაბო-ვერდე",
    CW: "კიურასაო",
    CX: "შობის კუნძული",
    CY: "კვიპროსი",
    CZ: "ჩეხეთის რესპუბლიკა",
    DE: "გერმანია",
    DJ: "ჯიბუტი",
    DK: "დანია",
    DM: "დომინიკა",
    DO: "დომინიკელთა რესპუბლიკა",
    DZ: "ალჟირი",
    EC: "ეკვადორი",
    EE: "ესტონეთი",
    EG: "ეგვიპტე",
    EH: "დასავლეთ საჰარა",
    ER: "ერიტრეა",
    ES: "ესპანეთი",
    ET: "ეთიოპია",
    FI: "ფინეთი",
    FJ: "ფიჯი",
    FK: "ფოლკლენდის კუნძულები",
    FM: "მიკრონეზია",
    FO: "ფარერის კუნძულები",
    FR: "საფრანგეთი",
    GA: "გაბონი",
    GB: "გაერთიანებული სამეფო",
    GD: "გრენადა",
    GE: "საქართველო",
    GF: "საფრანგეთის გვიანა",
    GG: "გერნსი",
    GH: "განა",
    GI: "გიბრალტარი",
    GL: "გრენლანდია",
    GM: "გამბია",
    GN: "გვინეა",
    GP: "გვადელუპა",
    GQ: "ეკვატორული გვინეა",
    GR: "საბერძნეთი",
    GS: "სამხრეთ ჯორჯია და სამხრეთ სენდვიჩის კუნძულები",
    GT: "გვატემალა",
    GU: "გუამი",
    GW: "გვინეა-ბისაუ",
    GY: "გაიანა",
    HK: "ჰონკონგი",
    HM: "ჰერდი და მაკდონალდის კუნძულები",
    HN: "ჰონდურასი",
    HR: "ხორვატია",
    HT: "ჰაიტი",
    HU: "უნგრეთი",
    ID: "ინდონეზია",
    IE: "ირლანდია",
    IL: "ისრაელი",
    IM: "მენის კუნძული",
    IN: "ინდოეთი",
    IO: "ბრიტანეთის ტერიტორია ინდოეთის ოკეანეში",
    IQ: "ერაყი",
    IR: "ირანი",
    IS: "ისლანდია",
    IT: "იტალია",
    JE: "ჯერსი",
    JM: "იამაიკა",
    JO: "იორდანია",
    JP: "იაპონია",
    KE: "კენია",
    KG: "ყირგიზეთი",
    KH: "კამბოჯა",
    KI: "კირიბატი",
    KM: "კომორის კუნძულები",
    KN: "სენტ-კიტსი და ნევისი",
    KP: "ჩრდილოეთ კორეა",
    KR: "სამხრეთ კორეა",
    KW: "ქუვეითი",
    KY: "კაიმანის კუნძულები",
    KZ: "ყაზახეთი",
    LA: "ლაოსი",
    LB: "ლიბანი",
    LC: "სენტ-ლუსია",
    LI: "ლიხტენშტაინი",
    LK: "შრი-ლანკა",
    LR: "ლიბერია",
    LS: "ლესოთო",
    LT: "ლიტვა",
    LU: "ლუქსემბურგი",
    LV: "ლატვია",
    LY: "ლიბია",
    MA: "მაროკო",
    MC: "მონაკო",
    MD: "მოლდოვა",
    ME: "მონტენეგრო",
    MF: "სენ-მარტენი",
    MG: "მადაგასკარი",
    MH: "მარშალის კუნძულები",
    MK: "მაკედონია",
    ML: "მალი",
    MM: "მიანმარი (ბირმა)",
    MN: "მონღოლეთი",
    MO: "მაკაო",
    MP: "ჩრდილოეთ მარიანას კუნძულები",
    MQ: "მარტინიკა",
    MR: "მავრიტანია",
    MS: "მონსერატი",
    MT: "მალტა",
    MU: "მავრიკი",
    MV: "მალდივები",
    MW: "მალავი",
    MX: "მექსიკა",
    MY: "მალაიზია",
    MZ: "მოზამბიკი",
    NA: "ნამიბია",
    NC: "ახალი კალედონია",
    NE: "ნიგერი",
    NF: "ნორფოლკის კუნძული",
    NG: "ნიგერია",
    NI: "ნიკარაგუა",
    NL: "ნიდერლანდები",
    NO: "ნორვეგია",
    NP: "ნეპალი",
    NR: "ნაურუ",
    NU: "ნიუე",
    NZ: "ახალი ზელანდია",
    OM: "ომანი",
    PA: "პანამა",
    PE: "პერუ",
    PF: "საფრანგეთის პოლინეზია",
    PG: "პაპუა-ახალი გვინეა",
    PH: "ფილიპინები",
    PK: "პაკისტანი",
    PL: "პოლონეთი",
    PM: "სენ-პიერი და მიკელონი",
    PN: "პიტკერნის კუნძულები",
    PR: "პუერტო-რიკო",
    PS: "პალესტინის ტერიტორიები",
    PT: "პორტუგალია",
    PW: "პალაუ",
    PY: "პარაგვაი",
    QA: "კატარი",
    RE: "რეუნიონი",
    RO: "რუმინეთი",
    RS: "სერბეთი",
    RU: "რუსეთი",
    RW: "რუანდა",
    SA: "საუდის არაბეთი",
    SB: "სოლომონის კუნძულები",
    SC: "სეიშელის კუნძულები",
    SD: "სუდანი",
    SE: "შვედეთი",
    SG: "სინგაპური",
    SH: "წმინდა ელენეს კუნძული",
    SI: "სლოვენია",
    SJ: "შპიცბერგენი და იან-მაიენი",
    SK: "სლოვაკეთი",
    SL: "სიერა-ლეონე",
    SM: "სან-მარინო",
    SN: "სენეგალი",
    SO: "სომალი",
    SR: "სურინამი",
    SS: "სამხრეთ სუდანი",
    ST: "სან-ტომე და პრინსიპი",
    SV: "სალვადორი",
    SX: "სინტ-მარტენი",
    SY: "სირია",
    SZ: "სვაზილენდი",
    TC: "თერქს-ქაიქოსის კუნძულები",
    TD: "ჩადი",
    TF: "ფრანგული სამხრეთის ტერიტორიები",
    TG: "ტოგო",
    TH: "ტაილანდი",
    TJ: "ტაჯიკეთი",
    TK: "ტოკელაუ",
    TL: "ტიმორ-ლესტე",
    TM: "თურქმენეთი",
    TN: "ტუნისი",
    TO: "ტონგა",
    TR: "თურქეთი",
    TT: "ტრინიდადი და ტობაგო",
    TV: "ტუვალუ",
    TW: "ტაივანი",
    TZ: "ტანზანია",
    UA: "უკრაინა",
    UG: "უგანდა",
    UM: "აშშ-ის შორეული კუნძულები",
    US: "ამერიკის შეერთებული შტატები",
    UY: "ურუგვაი",
    UZ: "უზბეკეთი",
    VA: "ქალაქი ვატიკანი",
    VC: "სენტ-ვინსენტი და გრენადინები",
    VE: "ვენესუელა",
    VG: "ბრიტანეთის ვირჯინის კუნძულები",
    VI: "აშშ-ის ვირჯინის კუნძულები",
    VN: "ვიეტნამი",
    VU: "ვანუატუ",
    WF: "უოლისი და ფუტუნა",
    WS: "სამოა",
    XK: "კოსოვო",
    YE: "იემენი",
    YT: "მაიოტა",
    ZA: "სამხრეთ აფრიკის რესპუბლიკა",
    ZM: "ზამბია",
    ZW: "ზიმბაბვე"
  };
  var ka = {
    locale: locale$n,
    countries: countries$n
  };

  var ka$1 = /*#__PURE__*/Object.freeze({
    locale: locale$n,
    countries: countries$n,
    default: ka
  });

  var locale$o = "kk";
  var countries$o = {
    AD: "Андорра",
    AE: "Біріккен Араб Әмірліктері",
    AF: "Ауғанстан",
    AG: "Антигуа және Барбуда",
    AI: "Ангилья",
    AL: "Албания",
    AM: "Армения",
    AO: "Ангола",
    AQ: "Антарктида",
    AR: "Аргентина",
    AS: "Америкалық Самоа",
    AT: "Австрия",
    AU: "Австралия",
    AW: "Аруба",
    AX: "Аланд аралдары",
    AZ: "Әзірбайжан",
    BA: "Босния және Герцеговина",
    BB: "Барбадос",
    BD: "Бангладеш",
    BE: "Бельгия",
    BF: "Буркина-Фасо",
    BG: "Болгария",
    BH: "Бахрейн",
    BI: "Бурунди",
    BJ: "Бенин",
    BL: "Сен-Бартелеми",
    BM: "Бермуд аралдары",
    BN: "Бруней",
    BO: "Боливия",
    BQ: "Кариб Нидерландысы",
    BR: "Бразилия",
    BS: "Багам аралдары",
    BT: "Бутан",
    BV: "Буве аралы",
    BW: "Ботсвана",
    BY: "Беларусь",
    BZ: "Белиз",
    CA: "Канада",
    CC: "Кокос (Килинг) аралдары",
    CD: "Конго",
    CF: "Орталық Африка Республикасы",
    CG: "Конго Республикасы",
    CH: "Швейцария",
    CI: "Кот-д’Ивуар",
    CK: "Кук аралдары",
    CL: "Чили",
    CM: "Камерун",
    CN: "Қытай",
    CO: "Колумбия",
    CR: "Коста-Рика",
    CU: "Куба",
    CV: "Кабо-Верде",
    CW: "Кюрасао",
    CX: "Рождество аралы",
    CY: "Кипр",
    CZ: "Чех Республикасы",
    DE: "Германия",
    DJ: "Джибути",
    DK: "Дания",
    DM: "Доминика",
    DO: "Доминикан Республикасы",
    DZ: "Алжир",
    EC: "Эквадор",
    EE: "Эстония",
    EG: "Мысыр",
    EH: "Батыс Сахара",
    ER: "Эритрея",
    ES: "Испания",
    ET: "Эфиопия",
    FI: "Финляндия",
    FJ: "Фиджи",
    FK: "Фолкленд аралдары",
    FM: "Микронезия",
    FO: "Фарер аралдары",
    FR: "Франция",
    GA: "Габон",
    GB: "Ұлыбритания",
    GD: "Гренада",
    GE: "Грузия",
    GF: "Француз Гвианасы",
    GG: "Гернси",
    GH: "Гана",
    GI: "Гибралтар",
    GL: "Гренландия",
    GM: "Гамбия",
    GN: "Гвинея",
    GP: "Гваделупа",
    GQ: "Экваторлық Гвинея",
    GR: "Грекия",
    GS: "Оңтүстік Георгия және Оңтүстік Сандвич аралдары",
    GT: "Гватемала",
    GU: "Гуам",
    GW: "Гвинея-Бисау",
    GY: "Гайана",
    HK: "Гонконг",
    HM: "Херд аралы және Макдональд аралдары",
    HN: "Гондурас",
    HR: "Хорватия",
    HT: "Гаити",
    HU: "Венгрия",
    ID: "Индонезия",
    IE: "Ирландия",
    IL: "Израиль",
    IM: "Мэн аралы",
    IN: "Үндістан",
    IO: "Үнді мұхитындағы Британ аймағы",
    IQ: "Ирак",
    IR: "Иран",
    IS: "Исландия",
    IT: "Италия",
    JE: "Джерси",
    JM: "Ямайка",
    JO: "Иордания",
    JP: "Жапония",
    KE: "Кения",
    KG: "Қырғызстан",
    KH: "Камбоджа",
    KI: "Кирибати",
    KM: "Комор аралдары",
    KN: "Сент-Китс және Невис",
    KP: "Солтүстік Корея",
    KR: "Оңтүстік Корея",
    KW: "Кувейт",
    KY: "Кайман аралдары",
    KZ: "Қазақстан",
    LA: "Лаос",
    LB: "Ливан",
    LC: "Сент-Люсия",
    LI: "Лихтенштейн",
    LK: "Шри-Ланка",
    LR: "Либерия",
    LS: "Лесото",
    LT: "Литва",
    LU: "Люксембург",
    LV: "Латвия",
    LY: "Ливия",
    MA: "Марокко",
    MC: "Монако",
    MD: "Молдова",
    ME: "Черногория",
    MF: "Сен-Мартен",
    MG: "Мадагаскар",
    MH: "Маршалл аралдары",
    MK: "Македония Республикасы",
    ML: "Мали",
    MM: "Мьянма (Бирма)",
    MN: "Моңғолия",
    MO: "Макао",
    MP: "Солтүстік Мариана аралдары",
    MQ: "Мартиника",
    MR: "Мавритания",
    MS: "Монтсеррат",
    MT: "Мальта",
    MU: "Маврикий",
    MV: "Мальдив аралдары",
    MW: "Малави",
    MX: "Мексика",
    MY: "Малайзия",
    MZ: "Мозамбик",
    NA: "Намибия",
    NC: "Жаңа Каледония",
    NE: "Нигер",
    NF: "Норфолк аралы",
    NG: "Нигерия",
    NI: "Никарагуа",
    NL: "Нидерланд",
    NO: "Норвегия",
    NP: "Непал",
    NR: "Науру",
    NU: "Ниуэ",
    NZ: "Жаңа Зеландия",
    OM: "Оман",
    PA: "Панама",
    PE: "Перу",
    PF: "Француз Полинезиясы",
    PG: "Папуа — Жаңа Гвинея",
    PH: "Филиппин",
    PK: "Пәкістан",
    PL: "Польша",
    PM: "Сен-Пьер және Микелон",
    PN: "Питкэрн аралдары",
    PR: "Пуэрто-Рико",
    PS: "Палестина аймақтары",
    PT: "Португалия",
    PW: "Палау",
    PY: "Парагвай",
    QA: "Катар",
    RE: "Реюньон",
    RO: "Румыния",
    RS: "Сербия",
    RU: "Ресей",
    RW: "Руанда",
    SA: "Сауд Арабиясы",
    SB: "Соломон аралдары",
    SC: "Сейшель аралдары",
    SD: "Судан",
    SE: "Швеция",
    SG: "Сингапур",
    SH: "Әулие Елена аралы",
    SI: "Словения",
    SJ: "Шпицберген және Ян-Майен",
    SK: "Словакия",
    SL: "Сьерра-Леоне",
    SM: "Сан-Марино",
    SN: "Сенегал",
    SO: "Сомали",
    SR: "Суринам",
    SS: "Оңтүстік Судан",
    ST: "Сан-Томе және Принсипи",
    SV: "Сальвадор",
    SX: "Синт-Мартен",
    SY: "Сирия",
    SZ: "Свазиленд",
    TC: "Теркс және Кайкос аралдары",
    TD: "Чад",
    TF: "Францияның оңтүстік аймақтары",
    TG: "Того",
    TH: "Тайланд",
    TJ: "Тәжікстан",
    TK: "Токелау",
    TL: "Тимор-Лесте",
    TM: "Түрікменстан",
    TN: "Тунис",
    TO: "Тонга",
    TR: "Түркия",
    TT: "Тринидад және Тобаго",
    TV: "Тувалу",
    TW: "Тайвань",
    TZ: "Танзания",
    UA: "Украина",
    UG: "Уганда",
    UM: "АҚШ-тың сыртқы кіші аралдары",
    US: "Америка Құрама Штаттары",
    UY: "Уругвай",
    UZ: "Өзбекстан",
    VA: "Ватикан",
    VC: "Сент-Винсент және Гренадин аралдары",
    VE: "Венесуэла",
    VG: "Британдық Виргин аралдары",
    VI: "АҚШ-тың Виргин аралдары",
    VN: "Вьетнам",
    VU: "Вануату",
    WF: "Уоллис және Футуна",
    WS: "Самоа",
    XK: "Косово",
    YE: "Йемен",
    YT: "Майотта",
    ZA: "Оңтүстік Африка Республикасы",
    ZM: "Замбия",
    ZW: "Зимбабве"
  };
  var kk = {
    locale: locale$o,
    countries: countries$o
  };

  var kk$1 = /*#__PURE__*/Object.freeze({
    locale: locale$o,
    countries: countries$o,
    default: kk
  });

  var locale$p = "ko";
  var countries$p = {
    AF: "아프가니스탄",
    AL: "알바니아",
    DZ: "알제리",
    AS: "아메리칸 사모아",
    AD: "안도라",
    AO: "앙골라",
    AI: "앵 귈라",
    AQ: "남극 대륙",
    AG: "앤티가 바부 다",
    AR: "아르헨티나",
    AM: "아르메니아",
    AW: "아루바",
    AU: "호주",
    AT: "오스트리아",
    AZ: "아제르바이잔",
    BS: "바하마",
    BH: "바레인",
    BD: "방글라데시",
    BB: "바베이도스",
    BY: "벨라루스",
    BE: "벨기에",
    BZ: "벨리즈",
    BJ: "베냉",
    BM: "버뮤다",
    BT: "부탄",
    BO: "볼리비아",
    BA: "보스니아 헤르체고비나",
    BW: "보츠와나",
    BV: "부베 섬",
    BR: "브라질",
    IO: "영국령 인도양 지역",
    BN: "브루나이 다루 살람",
    BG: "불가리아",
    BF: "부키 나 파소",
    BI: "부룬디",
    KH: "캄보디아",
    CM: "카메룬",
    CA: "캐나다",
    CV: "카보 베르데",
    KY: "케이맨 제도",
    CF: "중앙 아프리카 공화국",
    TD: "차드",
    CL: "칠레",
    CN: "중국",
    CX: "크리스마스 섬",
    CC: "코코스 군도",
    CO: "콜롬비아",
    KM: "코모로",
    CG: "콩고",
    CD: "콩고 민주 공화국",
    CK: "쿡 제도",
    CR: "코스타리카",
    CI: "코트 디부 아르",
    HR: "크로아티아",
    CU: "쿠바",
    CY: "키프로스",
    CZ: "체코 공화국",
    DK: "덴마크",
    DJ: "지부티",
    DM: "도미니카 공화국",
    DO: "도미니카 공화국",
    EC: "에콰도르",
    EG: "이집트",
    SV: "엘살바도르",
    GQ: "적도 기니",
    ER: "에리트레아",
    EE: "에스토니아",
    ET: "에티오피아",
    FK: "포클랜드 제도 (말 비나 스)",
    FO: "페로 제도",
    FJ: "피지",
    FI: "핀란드",
    FR: "프랑스",
    GF: "프랑스 령 기아나",
    PF: "프랑스 령 폴리네시아의",
    TF: "프랑스 남부 지역",
    GA: "가봉",
    GM: "감비아",
    GE: "그루지야",
    DE: "독일",
    GH: "가나",
    GI: "지브롤터",
    GR: "그리스",
    GL: "그린란드",
    GD: "그레나다",
    GP: "과들루프",
    GU: "괌",
    GT: "과테말라",
    GN: "기니",
    GW: "기니 비사우",
    GY: "가이아나",
    HT: "아이티",
    HM: "허드 섬 및 맥도널드 제도",
    VA: "성좌 (바티칸 시국)",
    HN: "온두라스",
    HK: "홍콩",
    HU: "헝가리",
    IS: "아이슬란드",
    IN: "인도",
    ID: "인도네시아 공화국",
    IR: "이란, 이슬람 공화국",
    IQ: "이라크",
    IE: "아일랜드",
    IL: "이스라엘",
    IT: "이탈리아",
    JM: "자메이카",
    JP: "일본",
    JO: "요르단",
    KZ: "카자흐스탄",
    KE: "케냐",
    KI: "키리바시",
    KP: "한국, 조선 민주주의 인민 공화국",
    KR: "대한민국",
    KW: "쿠웨이트",
    KG: "키르기즈스탄",
    LA: "라오스 인민 민주주의 공화국",
    LV: "라트비아",
    LB: "레바논",
    LS: "레소토",
    LR: "라이베리아",
    LY: "리비아 아랍 자 마히리 야",
    LI: "리히텐슈타인",
    LT: "리투아니아",
    LU: "룩셈부르크",
    MO: "마카오",
    MK: "마케도니아, 이전의 유고 슬라비아 공화국",
    MG: "마다가스카르",
    MW: "말라위",
    MY: "말레이시아",
    MV: "몰디브",
    ML: "말리",
    MT: "몰타",
    MH: "마샬 군도",
    MQ: "마르티니크",
    MR: "모리타니",
    MU: "모리셔스",
    YT: "마 요트",
    MX: "멕시코",
    FM: "미크로네시아,",
    MD: "몰도바, 공화국",
    MC: "모나코",
    MN: "몽골리아",
    MS: "몬세 라트",
    MA: "모로코",
    MZ: "모잠비크",
    MM: "미얀마",
    NA: "나미비아",
    NR: "나우루",
    NP: "네팔",
    NL: "네덜란드",
    NC: "뉴 칼레도니아",
    NZ: "뉴질랜드",
    NI: "니카라과",
    NE: "니제르",
    NG: "나이지리아",
    NU: "니우에",
    NF: "노퍽 섬",
    MP: "북 마리아나 제도",
    NO: "노르웨이",
    OM: "오만",
    PK: "파키스탄",
    PW: "팔라우",
    PS: "팔레스타인 자치구, 점령 자",
    PA: "파나마",
    PG: "파푸아 뉴기니",
    PY: "파라과이",
    PE: "페루",
    PH: "필리핀 제도",
    PN: "핏 케언",
    PL: "폴란드",
    PT: "포르투갈",
    PR: "푸에르토 리코",
    QA: "카타르",
    RE: "재결합",
    RO: "루마니아",
    RU: "러시아 연방",
    RW: "르완다",
    SH: "세인트 헬레나",
    KN: "세인트 키츠 네비스",
    LC: "세인트 루시아",
    PM: "생 피에르 미 클롱",
    VC: "세인트 빈센트 그레나딘",
    WS: "사모아",
    SM: "산 마리노",
    ST: "상투 메 프린시 페",
    SA: "사우디 아라비아",
    SN: "세네갈",
    SC: "세이셸",
    SL: "시에라 리온",
    SG: "싱가포르",
    SK: "슬로바키아",
    SI: "슬로베니아",
    SB: "솔로몬 제도",
    SO: "소말리아",
    ZA: "남아프리카",
    GS: "사우스 조지아 및 사우스 샌드위치 제도",
    ES: "스페인",
    LK: "스리랑카",
    SD: "수단",
    SR: "수리남",
    SJ: "스발 바르와 얀 메이 엔",
    SZ: "스와질란드",
    SE: "스웨덴",
    CH: "스위스",
    SY: "시리아",
    TW: "대만",
    TJ: "타지키스탄",
    TZ: "탄자니아, 유엔",
    TH: "태국",
    TL: "동 티모르",
    TG: "가다",
    TK: "토켈 라우",
    TO: "통가",
    TT: "트리니다드 토바고",
    TN: "튀니지",
    TR: "터키",
    TM: "투르크 메니스탄",
    TC: "터크 스 케이 커스 제도",
    TV: "투발루",
    UG: "우간다",
    UA: "우크라이나",
    AE: "아랍 에미리트",
    GB: "영국",
    US: "미국",
    UM: "미국령 군소 제도",
    UY: "우루과이",
    UZ: "우즈베키스탄",
    VU: "바누아투",
    VE: "베네수엘라",
    VN: "베트남",
    VG: "영국령 버진 아일랜드",
    VI: "미국령 버진 아일랜드",
    WF: "월리스 푸 투나",
    EH: "서사하라",
    YE: "예멘 아랍 공화국",
    ZM: "잠비아",
    ZW: "짐바브웨",
    AX: "올란드 제도",
    BQ: "보네르, 신트 유스 타티 우스, 사바",
    CW: "쿠라 사오",
    GG: "건지 섬",
    IM: "아일 오브 맨",
    JE: "저지",
    ME: "몬테네그로",
    BL: "생 바르 텔레 미",
    MF: "세인트 마틴 (프랑스어 부분)",
    RS: "세르비아",
    SX: "신트 마틴 (네덜란드어 부분)",
    SS: "남 수단",
    XK: "코소보"
  };
  var ko = {
    locale: locale$p,
    countries: countries$p
  };

  var ko$1 = /*#__PURE__*/Object.freeze({
    locale: locale$p,
    countries: countries$p,
    default: ko
  });

  var locale$q = "ky";
  var countries$q = {
    AD: "Андорра",
    AE: "Бириккен Араб Эмираттары",
    AF: "Афганистан",
    AG: "Антигуа жана Барбуда",
    AI: "Ангуила",
    AL: "Албания",
    AM: "Армения",
    AO: "Ангола",
    AQ: "Антарктика",
    AR: "Аргентина",
    AS: "Америка Самоасы",
    AT: "Австрия",
    AU: "Австралия",
    AW: "Аруба",
    AX: "Аланд аралдары",
    AZ: "Азербайжан",
    BA: "Босния жана Герцеговина",
    BB: "Барбадос",
    BD: "Бангладеш",
    BE: "Бельгия",
    BF: "Буркина-Фасо",
    BG: "Болгария",
    BH: "Бахрейн",
    BI: "Бурунди",
    BJ: "Бенин",
    BL: "Сент Бартелеми",
    BM: "Бермуд аралдары",
    BN: "Бруней",
    BO: "Боливия",
    BQ: "Кариб Нидерланддары",
    BR: "Бразилия",
    BS: "Багам аралдары",
    BT: "Бутан",
    BV: "Буве аралдары",
    BW: "Ботсвана",
    BY: "Беларусь",
    BZ: "Белиз",
    CA: "Канада",
    CC: "Кокос (Килиӊ) аралдары",
    CD: "Конго-Киншаса",
    CF: "Борбордук Африка Республикасы",
    CG: "Конго-Браззавил",
    CH: "Швейцария",
    CI: "Кот-д’Ивуар",
    CK: "Кук аралдары",
    CL: "Чили",
    CM: "Камерун",
    CN: "Кытай",
    CO: "Колумбия",
    CR: "Коста-Рика",
    CU: "Куба",
    CV: "Капе Верде",
    CW: "Кюрасао",
    CX: "Крисмас аралы",
    CY: "Кипр",
    CZ: "Чехия",
    DE: "Германия",
    DJ: "Джибути",
    DK: "Дания",
    DM: "Доминика",
    DO: "Доминика Республикасы",
    DZ: "Алжир",
    EC: "Эквадор",
    EE: "Эстония",
    EG: "Египет",
    EH: "Батыш Сахара",
    ER: "Эритрея",
    ES: "Испания",
    ET: "Эфиопия",
    FI: "Финляндия",
    FJ: "Фиджи",
    FK: "Фолклэнд аралдары",
    FM: "Микронезия",
    FO: "Фарер аралдары",
    FR: "Франция",
    GA: "Габон",
    GB: "Улуу Британия",
    GD: "Гренада",
    GE: "Грузия",
    GF: "Гвиана (Франция)",
    GG: "Гернси",
    GH: "Гана",
    GI: "Гибралтар",
    GL: "Гренландия",
    GM: "Гамбия",
    GN: "Гвинея",
    GP: "Гваделупа",
    GQ: "Экваториалдык Гвинея",
    GR: "Греция",
    GS: "Түштүк Жоржия жана Түштүк Сэндвич аралдары",
    GT: "Гватемала",
    GU: "Гуам",
    GW: "Гвинея-Бисау",
    GY: "Гайана",
    HK: "Гонконг Кытай ААА",
    HM: "Херд жана Макдоналд аралдары",
    HN: "Гондурас",
    HR: "Хорватия",
    HT: "Гаити",
    HU: "Венгрия",
    ID: "Индонезия",
    IE: "Ирландия",
    IL: "Израиль",
    IM: "Мэн аралы",
    IN: "Индия",
    IO: "Британиянын Индия океанындагы аймагы",
    IQ: "Ирак",
    IR: "Иран",
    IS: "Исландия",
    IT: "Италия",
    JE: "Жерси",
    JM: "Ямайка",
    JO: "Иордания",
    JP: "Япония",
    KE: "Кения",
    KG: "Кыргызстан",
    KH: "Камбоджа",
    KI: "Кирибати",
    KM: "Коморос",
    KN: "Сент-Китс жана Невис",
    KP: "Түндүк Корея",
    KR: "Түштүк Корея",
    KW: "Кувейт",
    KY: "Кайман Аралдары",
    KZ: "Казакстан",
    LA: "Лаос",
    LB: "Ливан",
    LC: "Сент-Люсия",
    LI: "Лихтенштейн",
    LK: "Шри-Ланка",
    LR: "Либерия",
    LS: "Лесото",
    LT: "Литва",
    LU: "Люксембург",
    LV: "Латвия",
    LY: "Ливия",
    MA: "Марокко",
    MC: "Монако",
    MD: "Молдова",
    ME: "Черногория",
    MF: "Сент-Мартин",
    MG: "Мадагаскар",
    MH: "Маршалл аралдары",
    MK: "Македония",
    ML: "Мали",
    MM: "Мьянма (Бирма)",
    MN: "Монголия",
    MO: "Макау Кытай ААА",
    MP: "Түндүк Мариана аралдары",
    MQ: "Мартиника",
    MR: "Мавритания",
    MS: "Монсеррат",
    MT: "Мальта",
    MU: "Маврикий",
    MV: "Малдив аралдары",
    MW: "Малави",
    MX: "Мексика",
    MY: "Малайзия",
    MZ: "Мозамбик",
    NA: "Намибия",
    NC: "Жаӊы Каледония",
    NE: "Нигер",
    NF: "Норфолк аралы",
    NG: "Нигерия",
    NI: "Никарагуа",
    NL: "Нидерланддар",
    NO: "Норвегия",
    NP: "Непал",
    NR: "Науру",
    NU: "Ниуэ",
    NZ: "Жаӊы Зеландия",
    OM: "Оман",
    PA: "Панама",
    PE: "Перу",
    PF: "Француз Полинезиясы",
    PG: "Папуа Жаңы-Гвинея",
    PH: "Филлипин",
    PK: "Пакистан",
    PL: "Польша",
    PM: "Сен-Пьер жана Микелон",
    PN: "Питкэрн аралдары",
    PR: "Пуэрто-Рико",
    PS: "Палестина аймактары",
    PT: "Португалия",
    PW: "Палау",
    PY: "Парагвай",
    QA: "Катар",
    RE: "Реюнион",
    RO: "Румыния",
    RS: "Сербия",
    RU: "Россия",
    RW: "Руанда",
    SA: "Сауд Арабиясы",
    SB: "Соломон аралдары",
    SC: "Сейшелдер",
    SD: "Судан",
    SE: "Швеция",
    SG: "Сингапур",
    SH: "Ыйык Елена",
    SI: "Словения",
    SJ: "Свалбард жана Жан Майен",
    SK: "Словакия",
    SL: "Сьерра-Леоне",
    SM: "Сан Марино",
    SN: "Сенегал",
    SO: "Сомали",
    SR: "Суринаме",
    SS: "Түштүк Судан",
    ST: "Сан-Томе жана Принсипи",
    SV: "Эл Салвадор",
    SX: "Синт Маартен",
    SY: "Сирия",
    SZ: "Свазиленд",
    TC: "Түркс жана Кайкос аралдары",
    TD: "Чад",
    TF: "Франциянын Түштүктөгү аймактары",
    TG: "Того",
    TH: "Таиланд",
    TJ: "Тажикстан",
    TK: "Токелау",
    TL: "Тимор-Лесте",
    TM: "Түркмөнстан",
    TN: "Тунис",
    TO: "Тонга",
    TR: "Түркия",
    TT: "Тринидад жана Тобаго",
    TV: "Тувалу",
    TW: "Тайвань",
    TZ: "Танзания",
    UA: "Украина",
    UG: "Уганда",
    UM: "АКШнын сырткы аралдары",
    US: "Америка Кошмо Штаттары",
    UY: "Уругвай",
    UZ: "Өзбекстан",
    VA: "Ватикан",
    VC: "Сент-Винсент жана Гренадиналар",
    VE: "Венесуэла",
    VG: "Виргин аралдары (Британия)",
    VI: "Виргин аралдары (АКШ)",
    VN: "Вьетнам",
    VU: "Вануату",
    WF: "Уоллис жана Футуна",
    WS: "Самоа",
    XK: "Косово",
    YE: "Йемен",
    YT: "Майотта",
    ZA: "Түштүк Африка Республикасы",
    ZM: "Замбия",
    ZW: "Зимбабве"
  };
  var ky = {
    locale: locale$q,
    countries: countries$q
  };

  var ky$1 = /*#__PURE__*/Object.freeze({
    locale: locale$q,
    countries: countries$q,
    default: ky
  });

  var locale$r = "lt";
  var countries$r = {
    AD: "Andora",
    AE: "Jungtiniai Arabų Emyratai",
    AF: "Afganistanas",
    AG: "Antigva ir Barbuda",
    AI: "Angilija",
    AL: "Albanija",
    AM: "Armėnija",
    AO: "Angola",
    AQ: "Antarktida",
    AR: "Argentina",
    AS: "Amerikos Samoa",
    AT: "Austrija",
    AU: "Australija",
    AW: "Aruba",
    AX: "Alandų Salos",
    AZ: "Azerbaidžanas",
    BA: "Bosnija ir Hercegovina",
    BB: "Barbadosas",
    BD: "Bangladešas",
    BE: "Belgija",
    BF: "Burkina Fasas",
    BG: "Bulgarija",
    BH: "Bahreinas",
    BI: "Burundis",
    BJ: "Beninas",
    BL: "Sen Bartelemi",
    BM: "Bermuda",
    BN: "Brunėjus",
    BO: "Bolivija",
    BQ: "Karibų Nyderlandai",
    BR: "Brazilija",
    BS: "Bahamos",
    BT: "Butanas",
    BV: "Buvė Sala",
    BW: "Botsvana",
    BY: "Baltarusija",
    BZ: "Belizas",
    CA: "Kanada",
    CC: "Kokosų (Kilingo) Salos",
    CD: "Kongas-Kinšasa",
    CF: "Centrinės Afrikos Respublika",
    CG: "Kongas-Brazavilis",
    CH: "Šveicarija",
    CI: "Dramblio Kaulo Krantas",
    CK: "Kuko Salos",
    CL: "Čilė",
    CM: "Kamerūnas",
    CN: "Kinija",
    CO: "Kolumbija",
    CR: "Kosta Rika",
    CU: "Kuba",
    CV: "Žaliasis Kyšulys",
    CW: "Kiurasao",
    CX: "Kalėdų Sala",
    CY: "Kipras",
    CZ: "Čekija",
    DE: "Vokietija",
    DJ: "Džibutis",
    DK: "Danija",
    DM: "Dominika",
    DO: "Dominikos Respublika",
    DZ: "Alžyras",
    EC: "Ekvadoras",
    EE: "Estija",
    EG: "Egiptas",
    EH: "Vakarų Sachara",
    ER: "Eritrėja",
    ES: "Ispanija",
    ET: "Etiopija",
    FI: "Suomija",
    FJ: "Fidžis",
    FK: "Folklando Salos",
    FM: "Mikronezija",
    FO: "Farerų Salos",
    FR: "Prancūzija",
    GA: "Gabonas",
    GB: "Jungtinė Karalystė",
    GD: "Grenada",
    GE: "Gruzija",
    GF: "Prancūzijos Gviana",
    GG: "Gernsis",
    GH: "Gana",
    GI: "Gibraltaras",
    GL: "Grenlandija",
    GM: "Gambija",
    GN: "Gvinėja",
    GP: "Gvadelupa",
    GQ: "Pusiaujo Gvinėja",
    GR: "Graikija",
    GS: "Pietų Džordžija ir Pietų Sandvičo salos",
    GT: "Gvatemala",
    GU: "Guamas",
    GW: "Bisau Gvinėja",
    GY: "Gajana",
    HK: "Honkongas",
    HM: "Herdo ir Makdonaldo Salos",
    HN: "Hondūras",
    HR: "Kroatija",
    HT: "Haitis",
    HU: "Vengrija",
    ID: "Indonezija",
    IE: "Airija",
    IL: "Izraelis",
    IM: "Meno Sala",
    IN: "Indija",
    IO: "Indijos Vandenyno Britų Sritis",
    IQ: "Irakas",
    IR: "Iranas",
    IS: "Islandija",
    IT: "Italija",
    JE: "Džersis",
    JM: "Jamaika",
    JO: "Jordanija",
    JP: "Japonija",
    KE: "Kenija",
    KG: "Kirgizija",
    KH: "Kambodža",
    KI: "Kiribatis",
    KM: "Komorai",
    KN: "Sent Kitsas ir Nevis",
    KP: "Šiaurės Korėja",
    KR: "Pietų Korėja",
    KW: "Kuveitas",
    KY: "Kaimanų Salos",
    KZ: "Kazachstanas",
    LA: "Laosas",
    LB: "Libanas",
    LC: "Sent Lusija",
    LI: "Lichtenšteinas",
    LK: "Šri Lanka",
    LR: "Liberija",
    LS: "Lesotas",
    LT: "Lietuva",
    LU: "Liuksemburgas",
    LV: "Latvija",
    LY: "Libija",
    MA: "Marokas",
    MC: "Monakas",
    MD: "Moldova",
    ME: "Juodkalnija",
    MF: "Sen Martenas",
    MG: "Madagaskaras",
    MH: "Maršalo Salos",
    MK: "Makedonija",
    ML: "Malis",
    MM: "Mianmaras (Birma)",
    MN: "Mongolija",
    MO: "Makao",
    MP: "Marianos Šiaurinės Salos",
    MQ: "Martinika",
    MR: "Mauritanija",
    MS: "Montseratas",
    MT: "Malta",
    MU: "Mauricijus",
    MV: "Maldyvai",
    MW: "Malavis",
    MX: "Meksika",
    MY: "Malaizija",
    MZ: "Mozambikas",
    NA: "Namibija",
    NC: "Naujoji Kaledonija",
    NE: "Nigeris",
    NF: "Norfolko sala",
    NG: "Nigerija",
    NI: "Nikaragva",
    NL: "Nyderlandai",
    NO: "Norvegija",
    NP: "Nepalas",
    NR: "Nauru",
    NU: "Niujė",
    NZ: "Naujoji Zelandija",
    OM: "Omanas",
    PA: "Panama",
    PE: "Peru",
    PF: "Prancūzijos Polinezija",
    PG: "Papua Naujoji Gvinėja",
    PH: "Filipinai",
    PK: "Pakistanas",
    PL: "Lenkija",
    PM: "Sen Pjeras ir Mikelonas",
    PN: "Pitkerno salos",
    PR: "Puerto Rikas",
    PS: "Palestinos teritorija",
    PT: "Portugalija",
    PW: "Palau",
    PY: "Paragvajus",
    QA: "Kataras",
    RE: "Reunjonas",
    RO: "Rumunija",
    RS: "Serbija",
    RU: "Rusija",
    RW: "Ruanda",
    SA: "Saudo Arabija",
    SB: "Saliamono Salos",
    SC: "Seišeliai",
    SD: "Sudanas",
    SE: "Švedija",
    SG: "Singapūras",
    SH: "Šv. Elenos Sala",
    SI: "Slovėnija",
    SJ: "Svalbardas ir Janas Majenas",
    SK: "Slovakija",
    SL: "Siera Leonė",
    SM: "San Marinas",
    SN: "Senegalas",
    SO: "Somalis",
    SR: "Surinamas",
    SS: "Pietų Sudanas",
    ST: "San Tomė ir Prinsipė",
    SV: "Salvadoras",
    SX: "Sint Martenas",
    SY: "Sirija",
    SZ: "Svazilandas",
    TC: "Terkso ir Kaikoso Salos",
    TD: "Čadas",
    TF: "Prancūzijos Pietų sritys",
    TG: "Togas",
    TH: "Tailandas",
    TJ: "Tadžikija",
    TK: "Tokelau",
    TL: "Rytų Timoras",
    TM: "Turkmėnistanas",
    TN: "Tunisas",
    TO: "Tonga",
    TR: "Turkija",
    TT: "Trinidadas ir Tobagas",
    TV: "Tuvalu",
    TW: "Taivanas",
    TZ: "Tanzanija",
    UA: "Ukraina",
    UG: "Uganda",
    UM: "Jungtinių Valstijų Mažosios Tolimosios Salos",
    US: "Jungtinės Valstijos",
    UY: "Urugvajus",
    UZ: "Uzbekistanas",
    VA: "Vatikano Miesto Valstybė",
    VC: "Šventasis Vincentas ir Grenadinai",
    VE: "Venesuela",
    VG: "Didžiosios Britanijos Mergelių Salos",
    VI: "Jungtinių Valstijų Mergelių Salos",
    VN: "Vietnamas",
    VU: "Vanuatu",
    WF: "Volisas ir Futūna",
    WS: "Samoa",
    XK: "Kosovas",
    YE: "Jemenas",
    YT: "Majotas",
    ZA: "Pietų Afrika",
    ZM: "Zambija",
    ZW: "Zimbabvė"
  };
  var lt = {
    locale: locale$r,
    countries: countries$r
  };

  var lt$1 = /*#__PURE__*/Object.freeze({
    locale: locale$r,
    countries: countries$r,
    default: lt
  });

  var locale$s = "lv";
  var countries$s = {
    AD: "Andora",
    AE: "Apvienotie Arābu Emirāti",
    AF: "Afganistāna",
    AG: "Antigva un Barbuda",
    AI: "Angilja",
    AL: "Albānija",
    AM: "Armēnija",
    AO: "Angola",
    AQ: "Antarktika",
    AR: "Argentīna",
    AS: "ASV Samoa",
    AT: "Austrija",
    AU: "Austrālija",
    AW: "Aruba",
    AX: "Olandes salas",
    AZ: "Azerbaidžāna",
    BA: "Bosnija un Hercegovina",
    BB: "Barbadosa",
    BD: "Bangladeša",
    BE: "Beļģija",
    BF: "Burkinafaso",
    BG: "Bulgārija",
    BH: "Bahreina",
    BI: "Burundija",
    BJ: "Benina",
    BL: "Senbartelmī",
    BM: "Bermudu salas",
    BN: "Bruneja",
    BO: "Bolīvija",
    BQ: "Nīderlandes Karību salas",
    BR: "Brazīlija",
    BS: "Bahamu salas",
    BT: "Butāna",
    BV: "Buvē sala",
    BW: "Botsvāna",
    BY: "Baltkrievija",
    BZ: "Beliza",
    CA: "Kanāda",
    CC: "Kokosu (Kīlinga) salas",
    CD: "Kongo (Kinšasa)",
    CF: "Centrālāfrikas Republika",
    CG: "Kongo (Brazavila)",
    CH: "Šveice",
    CI: "Kotdivuāra",
    CK: "Kuka salas",
    CL: "Čīle",
    CM: "Kamerūna",
    CN: "Ķīna",
    CO: "Kolumbija",
    CR: "Kostarika",
    CU: "Kuba",
    CV: "Kaboverde",
    CW: "Kirasao",
    CX: "Ziemsvētku sala",
    CY: "Kipra",
    CZ: "Čehija",
    DE: "Vācija",
    DJ: "Džibutija",
    DK: "Dānija",
    DM: "Dominika",
    DO: "Dominikāna",
    DZ: "Alžīrija",
    EC: "Ekvadora",
    EE: "Igaunija",
    EG: "Ēģipte",
    EH: "Rietumsahāra",
    ER: "Eritreja",
    ES: "Spānija",
    ET: "Etiopija",
    FI: "Somija",
    FJ: "Fidži",
    FK: "Folklenda salas",
    FM: "Mikronēzija",
    FO: "Fēru salas",
    FR: "Francija",
    GA: "Gabona",
    GB: "Lielbritānija",
    GD: "Grenāda",
    GE: "Gruzija",
    GF: "Francijas Gviāna",
    GG: "Gērnsija",
    GH: "Gana",
    GI: "Gibraltārs",
    GL: "Grenlande",
    GM: "Gambija",
    GN: "Gvineja",
    GP: "Gvadelupa",
    GQ: "Ekvatoriālā Gvineja",
    GR: "Grieķija",
    GS: "Dienviddžordžija un Dienvidsendviču salas",
    GT: "Gvatemala",
    GU: "Guama",
    GW: "Gvineja-Bisava",
    GY: "Gajāna",
    HK: "Ķīnas īpašās pārvaldes apgabals Honkonga",
    HM: "Hērda sala un Makdonalda salas",
    HN: "Hondurasa",
    HR: "Horvātija",
    HT: "Haiti",
    HU: "Ungārija",
    ID: "Indonēzija",
    IE: "Īrija",
    IL: "Izraēla",
    IM: "Mena",
    IN: "Indija",
    IO: "Indijas okeāna Britu teritorija",
    IQ: "Irāka",
    IR: "Irāna",
    IS: "Islande",
    IT: "Itālija",
    JE: "Džērsija",
    JM: "Jamaika",
    JO: "Jordānija",
    JP: "Japāna",
    KE: "Kenija",
    KG: "Kirgizstāna",
    KH: "Kambodža",
    KI: "Kiribati",
    KM: "Komoru salas",
    KN: "Sentkitsa un Nevisa",
    KP: "Ziemeļkoreja",
    KR: "Dienvidkoreja",
    KW: "Kuveita",
    KY: "Kaimanu salas",
    KZ: "Kazahstāna",
    LA: "Laosa",
    LB: "Libāna",
    LC: "Sentlūsija",
    LI: "Lihtenšteina",
    LK: "Šrilanka",
    LR: "Libērija",
    LS: "Lesoto",
    LT: "Lietuva",
    LU: "Luksemburga",
    LV: "Latvija",
    LY: "Lībija",
    MA: "Maroka",
    MC: "Monako",
    MD: "Moldova",
    ME: "Melnkalne",
    MF: "Senmartēna",
    MG: "Madagaskara",
    MH: "Māršala salas",
    MK: "Maķedonija",
    ML: "Mali",
    MM: "Mjanma (Birma)",
    MN: "Mongolija",
    MO: "Ķīnas īpašās pārvaldes apgabals Makao",
    MP: "Ziemeļu Marianas salas",
    MQ: "Martinika",
    MR: "Mauritānija",
    MS: "Montserrata",
    MT: "Malta",
    MU: "Maurīcija",
    MV: "Maldīvija",
    MW: "Malāvija",
    MX: "Meksika",
    MY: "Malaizija",
    MZ: "Mozambika",
    NA: "Namībija",
    NC: "Jaunkaledonija",
    NE: "Nigēra",
    NF: "Norfolkas sala",
    NG: "Nigērija",
    NI: "Nikaragva",
    NL: "Nīderlande",
    NO: "Norvēģija",
    NP: "Nepāla",
    NR: "Nauru",
    NU: "Niue",
    NZ: "Jaunzēlande",
    OM: "Omāna",
    PA: "Panama",
    PE: "Peru",
    PF: "Francijas Polinēzija",
    PG: "Papua-Jaungvineja",
    PH: "Filipīnas",
    PK: "Pakistāna",
    PL: "Polija",
    PM: "Senpjēra un Mikelona",
    PN: "Pitkērnas salas",
    PR: "Puertoriko",
    PS: "Palestīna",
    PT: "Portugāle",
    PW: "Palau",
    PY: "Paragvaja",
    QA: "Katara",
    RE: "Reinjona",
    RO: "Rumānija",
    RS: "Serbija",
    RU: "Krievija",
    RW: "Ruanda",
    SA: "Saūda Arābija",
    SB: "Zālamana salas",
    SC: "Seišelu salas",
    SD: "Sudāna",
    SE: "Zviedrija",
    SG: "Singapūra",
    SH: "Sv.Helēnas sala",
    SI: "Slovēnija",
    SJ: "Svalbāra un Jana Majena sala",
    SK: "Slovākija",
    SL: "Sjerraleone",
    SM: "Sanmarīno",
    SN: "Senegāla",
    SO: "Somālija",
    SR: "Surinama",
    SS: "Dienvidsudāna",
    ST: "Santome un Prinsipi",
    SV: "Salvadora",
    SX: "Sintmārtena",
    SY: "Sīrija",
    SZ: "Svazilenda",
    TC: "Tērksas un Kaikosas salas",
    TD: "Čada",
    TF: "Francijas Dienvidjūru teritorija",
    TG: "Togo",
    TH: "Taizeme",
    TJ: "Tadžikistāna",
    TK: "Tokelau",
    TL: "Austrumtimora",
    TM: "Turkmenistāna",
    TN: "Tunisija",
    TO: "Tonga",
    TR: "Turcija",
    TT: "Trinidāda un Tobāgo",
    TV: "Tuvalu",
    TW: "Taivāna",
    TZ: "Tanzānija",
    UA: "Ukraina",
    UG: "Uganda",
    UM: "ASV Mazās Aizjūras salas",
    US: "Amerikas Savienotās Valstis",
    UY: "Urugvaja",
    UZ: "Uzbekistāna",
    VA: "Vatikāns",
    VC: "Sentvinsenta un Grenadīnas",
    VE: "Venecuēla",
    VG: "Britu Virdžīnas",
    VI: "ASV Virdžīnas",
    VN: "Vjetnama",
    VU: "Vanuatu",
    WF: "Volisa un Futunas salas",
    WS: "Samoa",
    XK: "Kosova",
    YE: "Jemena",
    YT: "Majota",
    ZA: "Dienvidāfrikas Republika",
    ZM: "Zambija",
    ZW: "Zimbabve"
  };
  var lv = {
    locale: locale$s,
    countries: countries$s
  };

  var lv$1 = /*#__PURE__*/Object.freeze({
    locale: locale$s,
    countries: countries$s,
    default: lv
  });

  var locale$t = "mk";
  var countries$t = {
    AD: "Андора",
    AE: "Обединети Арапски Емирати",
    AF: "Авганистан",
    AG: "Антигва и Барбуда",
    AI: "Ангвила",
    AL: "Албанија",
    AM: "Ерменија",
    AO: "Ангола",
    AQ: "Антарктик",
    AR: "Аргентина",
    AS: "Американска Самоа",
    AT: "Австрија",
    AU: "Австралија",
    AW: "Аруба",
    AX: "Оландски Острови",
    AZ: "Азербејџан",
    BA: "Босна и Херцеговина",
    BB: "Барбадос",
    BD: "Бангладеш",
    BE: "Белгија",
    BF: "Буркина Фасо",
    BG: "Бугарија",
    BH: "Бахреин",
    BI: "Бурунди",
    BJ: "Бенин",
    BL: "Свети Вартоломеј",
    BM: "Бермуди",
    BN: "Брунеј",
    BO: "Боливија",
    BQ: "Карипска Холандија",
    BR: "Бразил",
    BS: "Бахами",
    BT: "Бутан",
    BV: "Остров Буве",
    BW: "Боцвана",
    BY: "Белорусија",
    BZ: "Белизе",
    CA: "Канада",
    CC: "Кокосови (Килиншки) Острови",
    CD: "Конго - Киншаса",
    CF: "Централноафриканска Република",
    CG: "Конго - Бразавил",
    CH: "Швајцарија",
    CI: "Брегот на Слоновата Коска",
    CK: "Кукови Острови",
    CL: "Чиле",
    CM: "Камерун",
    CN: "Кина",
    CO: "Колумбија",
    CR: "Костарика",
    CU: "Куба",
    CV: "Зелен ’Рт",
    CW: "Курасао",
    CX: "Божиќен Остров",
    CY: "Кипар",
    CZ: "Чешка",
    DE: "Германија",
    DJ: "Џибути",
    DK: "Данска",
    DM: "Доминика",
    DO: "Доминиканска Република",
    DZ: "Алжир",
    EC: "Еквадор",
    EE: "Естонија",
    EG: "Египет",
    EH: "Западна Сахара",
    ER: "Еритреја",
    ES: "Шпанија",
    ET: "Етиопија",
    FI: "Финска",
    FJ: "Фиџи",
    FK: "Фолкландски Острови",
    FM: "Микронезија",
    FO: "Фарски Острови",
    FR: "Франција",
    GA: "Габон",
    GB: "Обединето Кралство",
    GD: "Гренада",
    GE: "Грузија",
    GF: "Француска Гвајана",
    GG: "Гернзи",
    GH: "Гана",
    GI: "Гибралтар",
    GL: "Гренланд",
    GM: "Гамбија",
    GN: "Гвинеја",
    GP: "Гвадалупе",
    GQ: "Екваторска Гвинеја",
    GR: "Грција",
    GS: "Јужна Џорџија и Јужни Сендвички Острови",
    GT: "Гватемала",
    GU: "Гуам",
    GW: "Гвинеја-Бисау",
    GY: "Гвајана",
    HK: "Хонг Конг С.А.Р Кина",
    HM: "Остров Херд и Острови Мекдоналд",
    HN: "Хондурас",
    HR: "Хрватска",
    HT: "Хаити",
    HU: "Унгарија",
    ID: "Индонезија",
    IE: "Ирска",
    IL: "Израел",
    IM: "Остров Ман",
    IN: "Индија",
    IO: "Британска Индоокеанска Територија",
    IQ: "Ирак",
    IR: "Иран",
    IS: "Исланд",
    IT: "Италија",
    JE: "Џерси",
    JM: "Јамајка",
    JO: "Јордан",
    JP: "Јапонија",
    KE: "Кенија",
    KG: "Киргистан",
    KH: "Камбоџа",
    KI: "Кирибати",
    KM: "Коморски Острови",
    KN: "Свети Кристофер и Невис",
    KP: "Северна Кореја",
    KR: "Јужна Кореја",
    KW: "Кувајт",
    KY: "Кајмански Острови",
    KZ: "Казахстан",
    LA: "Лаос",
    LB: "Либан",
    LC: "Света Луција",
    LI: "Лихтенштајн",
    LK: "Шри Ланка",
    LR: "Либерија",
    LS: "Лесото",
    LT: "Литванија",
    LU: "Луксембург",
    LV: "Латвија",
    LY: "Либија",
    MA: "Мароко",
    MC: "Монако",
    MD: "Молдавија",
    ME: "Црна Гора",
    MF: "Сент Мартин",
    MG: "Мадагаскар",
    MH: "Маршалски Острови",
    MK: "Македонија",
    ML: "Мали",
    MM: "Мјанмар (Бурма)",
    MN: "Монголија",
    MO: "Макао САР",
    MP: "Северни Маријански Острови",
    MQ: "Мартиник",
    MR: "Мавританија",
    MS: "Монсерат",
    MT: "Малта",
    MU: "Маврициус",
    MV: "Малдиви",
    MW: "Малави",
    MX: "Мексико",
    MY: "Малезија",
    MZ: "Мозамбик",
    NA: "Намибија",
    NC: "Нова Каледонија",
    NE: "Нигер",
    NF: "Норфолшки Остров",
    NG: "Нигерија",
    NI: "Никарагва",
    NL: "Холандија",
    NO: "Норвешка",
    NP: "Непал",
    NR: "Науру",
    NU: "Ниује",
    NZ: "Нов Зеланд",
    OM: "Оман",
    PA: "Панама",
    PE: "Перу",
    PF: "Француска Полинезија",
    PG: "Папуа Нова Гвинеја",
    PH: "Филипини",
    PK: "Пакистан",
    PL: "Полска",
    PM: "Сент Пјер и Микелан",
    PN: "Питкернски Острови",
    PR: "Порторико",
    PS: "Палестински територии",
    PT: "Португалија",
    PW: "Палау",
    PY: "Парагвај",
    QA: "Катар",
    RE: "Реунион",
    RO: "Романија",
    RS: "Србија",
    RU: "Русија",
    RW: "Руанда",
    SA: "Саудиска Арабија",
    SB: "Соломонски Острови",
    SC: "Сејшели",
    SD: "Судан",
    SE: "Шведска",
    SG: "Сингапур",
    SH: "Света Елена",
    SI: "Словенија",
    SJ: "Свалбард и Жан Мејен",
    SK: "Словачка",
    SL: "Сиера Леоне",
    SM: "Сан Марино",
    SN: "Сенегал",
    SO: "Сомалија",
    SR: "Суринам",
    SS: "Јужен Судан",
    ST: "Сао Томе и Принсипе",
    SV: "Ел Салвадор",
    SX: "Свети Мартин",
    SY: "Сирија",
    SZ: "Свазиленд",
    TC: "Острови Туркс и Каикос",
    TD: "Чад",
    TF: "Француски Јужни Територии",
    TG: "Того",
    TH: "Тајланд",
    TJ: "Таџикистан",
    TK: "Токелау",
    TL: "Источен Тимор (Тимор Лесте)",
    TM: "Туркменистан",
    TN: "Тунис",
    TO: "Тонга",
    TR: "Турција",
    TT: "Тринидад и Тобаго",
    TV: "Тувалу",
    TW: "Тајван",
    TZ: "Танзанија",
    UA: "Украина",
    UG: "Уганда",
    UM: "Американски територии во Пацификот",
    US: "Соединети Американски Држави",
    UY: "Уругвај",
    UZ: "Узбекистан",
    VA: "Ватикан",
    VC: "Свети Винсент и Гренадините",
    VE: "Венецуела",
    VG: "Британски Девствени Острови",
    VI: "Американски Девствени Острови",
    VN: "Виетнам",
    VU: "Вануату",
    WF: "Валис и Футуна",
    WS: "Самоа",
    XK: "Косово",
    YE: "Јемен",
    YT: "Мајот",
    ZA: "Јужноафриканска Република",
    ZM: "Замбија",
    ZW: "Зимбабве"
  };
  var mk = {
    locale: locale$t,
    countries: countries$t
  };

  var mk$1 = /*#__PURE__*/Object.freeze({
    locale: locale$t,
    countries: countries$t,
    default: mk
  });

  var locale$u = "mn";
  var countries$u = {
    AD: "Андорра",
    AE: "Арабын Нэгдсэн Эмират",
    AF: "Афганистан",
    AG: "Антигуа ба Барбуда",
    AI: "Ангила",
    AL: "Албани",
    AM: "Армени",
    AO: "Ангол",
    AQ: "Антарктик",
    AR: "Аргентин",
    AS: "Америкийн Самоа",
    AT: "Австри",
    AU: "Австрали",
    AW: "Аруба",
    AX: "Аландын Арлууд",
    AZ: "Азербайжан",
    BA: "Босни Герцеговин",
    BB: "Барбадос",
    BD: "Бангладеш",
    BE: "Белги",
    BF: "Буркина фасо",
    BG: "Болгар",
    BH: "Бахрейн",
    BI: "Бурунди",
    BJ: "Бенин",
    BL: "Сент Бартельми",
    BM: "Бермуд",
    BN: "Бруней",
    BO: "Боливи",
    BQ: "Карибын Нидерланд",
    BR: "Бразил",
    BS: "Багам",
    BT: "Бутан",
    BV: "Буветын арлууд",
    BW: "Ботсвана",
    BY: "Беларусь",
    BZ: "Белиз",
    CA: "Канад",
    CC: "Кокос (Кийлинг) арлууд",
    CD: "Конго-Киншаса",
    CF: "Төв Африкийн Бүгд Найрамдах Улс",
    CG: "Конго Браззавиль",
    CH: "Швейцари",
    CI: "Кот д’Ивуар",
    CK: "Күүкийн арлууд",
    CL: "Чили",
    CM: "Камерун",
    CN: "Хятад",
    CO: "Колумб",
    CR: "Коста Рика",
    CU: "Куба",
    CV: "Капе Верде",
    CW: "Куракао",
    CX: "Зул сарын арал",
    CY: "Кипр",
    CZ: "Чех",
    DE: "Герман",
    DJ: "Джибути",
    DK: "Дани",
    DM: "Доминик",
    DO: "Бүгд Найрамдах Доминикан Улс",
    DZ: "Алжир",
    EC: "Эквадор",
    EE: "Эстони",
    EG: "Египет",
    EH: "Баруун Сахар",
    ER: "Эритри",
    ES: "Испани",
    ET: "Этиоп",
    FI: "Финланд",
    FJ: "Фижи",
    FK: "Фолькландын Арлууд",
    FM: "Микронези",
    FO: "Фароэ Арлууд",
    FR: "Франц",
    GA: "Габон",
    GB: "Их Британи",
    GD: "Гренада",
    GE: "Гүрж",
    GF: "Францын Гайана",
    GG: "Гернси",
    GH: "Гана",
    GI: "Гибралтар",
    GL: "Гренланд",
    GM: "Гамби",
    GN: "Гвиней",
    GP: "Гваделуп",
    GQ: "Экваторын Гвиней",
    GR: "Грек",
    GS: "Өмнөд Жоржиа ба Өмнөд Сэндвичийн Арлууд",
    GT: "Гватемал",
    GU: "Гуам",
    GW: "Гвиней-Бисау",
    GY: "Гайана",
    HK: "Хонг Конг",
    HM: "Хэрд болон Макдоналд арлууд",
    HN: "Гондурас",
    HR: "Хорват",
    HT: "Гаити",
    HU: "Унгар",
    ID: "Индонези",
    IE: "Ирланд",
    IL: "Израиль",
    IM: "Мэн Арал",
    IN: "Энэтхэг",
    IO: "Британийн харьяа Энэтхэгийн далай дахь нутаг дэвсгэрүүд",
    IQ: "Ирак",
    IR: "Иран",
    IS: "Исланд",
    IT: "Итали",
    JE: "Жерси",
    JM: "Ямайк",
    JO: "Йордан",
    JP: "Япон",
    KE: "Кени",
    KG: "Кыргызстан",
    KH: "Камбож",
    KI: "Кирибати",
    KM: "Коморос",
    KN: "Сент-Киттс ба Невис",
    KP: "Хойд Солонгос",
    KR: "Өмнөд Солонгос",
    KW: "Кувейт",
    KY: "Кайманы Арлууд",
    KZ: "Казахстан",
    LA: "Лаос",
    LB: "Ливан",
    LC: "Сент Люсиа",
    LI: "Лихтенштейн",
    LK: "Шри Ланка",
    LR: "Либери",
    LS: "Лесото",
    LT: "Литва",
    LU: "Люксембург",
    LV: "Латви",
    LY: "Ливи",
    MA: "Марокко",
    MC: "Монако",
    MD: "Молдав",
    ME: "Монтенегро",
    MF: "Сент-Мартин",
    MG: "Мадагаскар",
    MH: "Маршаллын арлууд",
    MK: "Македон",
    ML: "Мали",
    MM: "Мьянмар (Бурма)",
    MN: "Монгол",
    MO: "Макао",
    MP: "Хойд Марианы арлууд",
    MQ: "Мартиник",
    MR: "Мавритани",
    MS: "Монтсеррат",
    MT: "Мальта",
    MU: "Мавритус",
    MV: "Мальдив",
    MW: "Малави",
    MX: "Мексик",
    MY: "Малайз",
    MZ: "Мозамбик",
    NA: "Намиби",
    NC: "Шинэ Каледони",
    NE: "Нигер",
    NF: "Норфолк арлууд",
    NG: "Нигери",
    NI: "Никарагуа",
    NL: "Нидерланд",
    NO: "Норвеги",
    NP: "Балба",
    NR: "Науру",
    NU: "Ниуэ",
    NZ: "Шинэ Зеланд",
    OM: "Оман",
    PA: "Панам",
    PE: "Перу",
    PF: "Францын Полинез",
    PG: "Папуа Шинэ Гвиней",
    PH: "Филиппин",
    PK: "Пакистан",
    PL: "Польш",
    PM: "Сэнт Пьер ба Микелон",
    PN: "Питкэрн арлууд",
    PR: "Пуэрто Рико",
    PS: "Палестины нутаг дэвсгэрүүд",
    PT: "Португаль",
    PW: "Палау",
    PY: "Парагвай",
    QA: "Катар",
    RE: "Реюньон",
    RO: "Румын",
    RS: "Серби",
    RU: "Орос",
    RW: "Руанда",
    SA: "Саудын Араб",
    SB: "Соломоны Арлууд",
    SC: "Сейшел",
    SD: "Судан",
    SE: "Швед",
    SG: "Сингапур",
    SH: "Сент Хелена",
    SI: "Словени",
    SJ: "Свалбард ба Ян Майен",
    SK: "Словак",
    SL: "Сьерра-Леоне",
    SM: "Сан-Марино",
    SN: "Сенегал",
    SO: "Сомали",
    SR: "Суринам",
    SS: "Өмнөд Судан",
    ST: "Сан-Томе ба Принсипи",
    SV: "Эль Сальвадор",
    SX: "Синт Мартен",
    SY: "Сири",
    SZ: "Свазиланд",
    TC: "Турк ба Кайкосын Арлууд",
    TD: "Чад",
    TF: "Францын өмнөд газар нутаг",
    TG: "Того",
    TH: "Тайланд",
    TJ: "Тажикистан",
    TK: "Токелау",
    TL: "Тимор-Лесте",
    TM: "Туркменистан",
    TN: "Тунис",
    TO: "Тонга",
    TR: "Турк",
    TT: "Тринидад Тобаго",
    TV: "Тувалу",
    TW: "Тайвань",
    TZ: "Танзани",
    UA: "Украин",
    UG: "Уганда",
    UM: "АНУ-ын тойрсон арлууд",
    US: "Америкийн Нэгдсэн Улс",
    UY: "Уругвай",
    UZ: "Узбекистан",
    VA: "Ватикан хот улс",
    VC: "Сэнт Винсэнт ба Гренадин",
    VE: "Венесуэл",
    VG: "Британийн Виржиний Арлууд",
    VI: "АНУ-ын Виржиний Арлууд",
    VN: "Вьетнам",
    VU: "Вануату",
    WF: "Уоллис ба Футуна",
    WS: "Самоа",
    XK: "Косово",
    YE: "Йемен",
    YT: "Майотте",
    ZA: "Өмнөд Африк тив",
    ZM: "Замби",
    ZW: "Зимбабве"
  };
  var mn = {
    locale: locale$u,
    countries: countries$u
  };

  var mn$1 = /*#__PURE__*/Object.freeze({
    locale: locale$u,
    countries: countries$u,
    default: mn
  });

  var locale$v = "nb";
  var countries$v = {
    AD: "Andorra",
    AE: "De forente arabiske emirater",
    AF: "Afghanistan",
    AG: "Antigua og Barbuda",
    AI: "Anguilla",
    AL: "Albania",
    AM: "Armenia",
    AO: "Angola",
    AQ: "Antarktis",
    AR: "Argentina",
    AS: "Amerikansk Samoa",
    AT: "Østerrike",
    AU: "Australia",
    AW: "Aruba",
    AX: "Åland",
    AZ: "Aserbajdsjan",
    BA: "Bosnia-Hercegovina",
    BB: "Barbados",
    BD: "Bangladesh",
    BE: "Belgia",
    BF: "Burkina Faso",
    BG: "Bulgaria",
    BH: "Bahrain",
    BI: "Burundi",
    BJ: "Benin",
    BL: "Saint-Barthélemy",
    BM: "Bermuda",
    BN: "Brunei",
    BO: "Bolivia",
    BQ: "Karibisk Nederland",
    BR: "Brasil",
    BS: "Bahamas",
    BT: "Bhutan",
    BV: "Bouvetøya",
    BW: "Botswana",
    BY: "Hviterussland",
    BZ: "Belize",
    CA: "Canada",
    CC: "Kokosøyene",
    CD: "Kongo",
    CF: "Den sentralafrikanske republikk",
    CG: "Kongo-Brazzaville",
    CH: "Sveits",
    CI: "Elfenbenskysten",
    CK: "Cookøyene",
    CL: "Chile",
    CM: "Kamerun",
    CN: "Kina",
    CO: "Colombia",
    CR: "Costa Rica",
    CU: "Cuba",
    CV: "Kapp Verde",
    CW: "Curaçao",
    CX: "Christmasøya",
    CY: "Kypros",
    CZ: "Tsjekkia",
    DE: "Tyskland",
    DJ: "Djibouti",
    DK: "Danmark",
    DM: "Dominica",
    DO: "Den dominikanske republikk",
    DZ: "Algerie",
    EC: "Ecuador",
    EE: "Estland",
    EG: "Egypt",
    EH: "Vest-Sahara",
    ER: "Eritrea",
    ES: "Spania",
    ET: "Etiopia",
    FI: "Finland",
    FJ: "Fiji",
    FK: "Falklandsøyene",
    FM: "Mikronesiaføderasjonen",
    FO: "Færøyene",
    FR: "Frankrike",
    GA: "Gabon",
    GB: "Storbritannia",
    GD: "Grenada",
    GE: "Georgia",
    GF: "Fransk Guyana",
    GG: "Guernsey",
    GH: "Ghana",
    GI: "Gibraltar",
    GL: "Grønland",
    GM: "Gambia",
    GN: "Guinea",
    GP: "Guadeloupe",
    GQ: "Ekvatorial-Guinea",
    GR: "Hellas",
    GS: "Sør-Georgia og de søre Sandwichøyene",
    GT: "Guatemala",
    GU: "Guam",
    GW: "Guinea-Bissau",
    GY: "Guyana",
    HK: "Hongkong",
    HM: "Heard- og McDonald-øyene",
    HN: "Honduras",
    HR: "Kroatia",
    HT: "Haiti",
    HU: "Ungarn",
    ID: "Indonesia",
    IE: "Irland",
    IL: "Israel",
    IM: "Man",
    IN: "India",
    IO: "Britisk territorium i Indiahavet",
    IQ: "Irak",
    IR: "Iran",
    IS: "Island",
    IT: "Italia",
    JE: "Jersey",
    JM: "Jamaica",
    JO: "Jordan",
    JP: "Japan",
    KE: "Kenya",
    KG: "Kirgisistan",
    KH: "Kambodsja",
    KI: "Kiribati",
    KM: "Komorene",
    KN: "Saint Kitts og Nevis",
    KP: "Nord-Korea",
    KR: "Sør-Korea",
    KW: "Kuwait",
    KY: "Caymanøyene",
    KZ: "Kasakhstan",
    LA: "Laos",
    LB: "Libanon",
    LC: "Saint Lucia",
    LI: "Liechtenstein",
    LK: "Sri Lanka",
    LR: "Liberia",
    LS: "Lesotho",
    LT: "Litauen",
    LU: "Luxembourg",
    LV: "Latvia",
    LY: "Libya",
    MA: "Marokko",
    MC: "Monaco",
    MD: "Moldova",
    ME: "Montenegro",
    MF: "Saint-Martin",
    MG: "Madagaskar",
    MH: "Marshalløyene",
    MK: "Makedonia",
    ML: "Mali",
    MM: "Burma",
    MN: "Mongolia",
    MO: "Macao",
    MP: "Nord-Marianene",
    MQ: "Martinique",
    MR: "Mauritania",
    MS: "Montserrat",
    MT: "Malta",
    MU: "Mauritius",
    MV: "Maldivene",
    MW: "Malawi",
    MX: "Mexico",
    MY: "Malaysia",
    MZ: "Mosambik",
    NA: "Namibia",
    NC: "Ny-Caledonia",
    NE: "Niger",
    NF: "Norfolk Island",
    NG: "Nigeria",
    NI: "Nicaragua",
    NL: "Nederland",
    NO: "Norge",
    NP: "Nepal",
    NR: "Nauru",
    NU: "Niue",
    NZ: "New Zealand",
    OM: "Oman",
    PA: "Panama",
    PE: "Peru",
    PF: "Fransk Polynesia",
    PG: "Papua Ny-Guinea",
    PH: "Filippinene",
    PK: "Pakistan",
    PL: "Polen",
    PM: "Saint-Pierre-et-Miquelon",
    PN: "Pitcairn",
    PR: "Puerto Rico",
    PS: "De okkuperte palestinske områdene",
    PT: "Portugal",
    PW: "Palau",
    PY: "Paraguay",
    QA: "Qatar",
    RE: "Réunion",
    RO: "Romania",
    RS: "Serbia",
    RU: "Russland",
    RW: "Rwanda",
    SA: "Saudi-Arabia",
    SB: "Salomonøyene",
    SC: "Seychellene",
    SD: "Sudan",
    SE: "Sverige",
    SG: "Singapore",
    SH: "St. Helena",
    SI: "Slovenia",
    SJ: "Svalbard og Jan Mayen",
    SK: "Slovakia",
    SL: "Sierra Leone",
    SM: "San Marino",
    SN: "Senegal",
    SO: "Somalia",
    SR: "Surinam",
    SS: "Sør-Sudan",
    ST: "São Tomé og Príncipe",
    SV: "El Salvador",
    SX: "Sint Maarten (Nederlandsk del)",
    SY: "Syria",
    SZ: "Swaziland",
    TC: "Turks- og Caicosøyene",
    TD: "Tsjad",
    TF: "Søre franske territorier",
    TG: "Togo",
    TH: "Thailand",
    TJ: "Tadsjikistan",
    TK: "Tokelau",
    TL: "Øst-Timor",
    TM: "Turkmenistan",
    TN: "Tunisia",
    TO: "Tonga",
    TR: "Tyrkia",
    TT: "Trinidad og Tobago",
    TV: "Tuvalu",
    TW: "Taiwan",
    TZ: "Tanzania",
    UA: "Ukraina",
    UG: "Uganda",
    UM: "USA, mindre, utenforliggende øyer",
    US: "USA",
    UY: "Uruguay",
    UZ: "Usbekistan",
    VA: "Vatikanstaten",
    VC: "Saint Vincent og Grenadinene",
    VE: "Venezuela",
    VG: "Jomfruøyene (Britisk)",
    VI: "Jomfruøyene (USA)",
    VN: "Vietnam",
    VU: "Vanuatu",
    WF: "Wallis- og Futunaøyene",
    WS: "Samoa",
    YE: "Jemen",
    YT: "Mayotte",
    ZA: "Sør-Afrika",
    ZM: "Zambia",
    ZW: "Zimbabwe",
    XK: "Kosovo"
  };
  var nb = {
    locale: locale$v,
    countries: countries$v
  };

  var nb$1 = /*#__PURE__*/Object.freeze({
    locale: locale$v,
    countries: countries$v,
    default: nb
  });

  var locale$w = "nl";
  var countries$w = {
    AF: "Afghanistan",
    AL: "Albanië",
    DZ: "Algerije",
    AS: "Amerikaans-Samoa",
    AD: "Andorra",
    AO: "Angola",
    AI: "Anguilla",
    AQ: "Antarctica",
    AG: "Antigua en Barbuda",
    AR: "Argentinië",
    AM: "Armenië",
    AW: "Aruba",
    AU: "Australië",
    AT: "Oostenrijk",
    AZ: "Azerbeidzjan",
    BS: "Bahama's",
    BH: "Bahrein",
    BD: "Bangladesh",
    BB: "Barbados",
    BY: "Wit-Rusland",
    BE: "België",
    BZ: "Belize",
    BJ: "Benin",
    BM: "Bermuda",
    BT: "Bhutan",
    BO: "Bolivië",
    BA: "Bosnië-Herzegovina",
    BW: "Botswana",
    BV: "Bouvet Eiland",
    BR: "Brazilië",
    IO: "Brits Indische oceaan",
    BN: "Brunei Darussalam",
    BG: "Bulgarije",
    BF: "Burkina Faso",
    BI: "Burundi",
    KH: "Cambodja",
    CM: "Kameroen",
    CA: "Canada",
    CV: "Kaapverdië",
    KY: "Kaaimaneilanden",
    CF: "Centraal-Afrikaanse Republiek",
    TD: "Tsjaad",
    CL: "Chili",
    CN: "China",
    CX: "Christmaseiland",
    CC: "Cocoseilanden",
    CO: "Colombia",
    KM: "Comoren",
    CG: "Congo, Volksrepubliek",
    CD: "Congo, Democratische Republiek",
    CK: "Cookeilanden",
    CR: "Costa Rica",
    CI: "Ivoorkust",
    HR: "Kroatië",
    CU: "Cuba",
    CY: "Cyprus",
    CZ: "Tsjechië",
    DK: "Denemarken",
    DJ: "Djibouti",
    DM: "Dominica",
    DO: "Dominicaanse Republiek",
    EC: "Ecuador",
    EG: "Egypte",
    SV: "El Salvador",
    GQ: "Equatoriaal-Guinea",
    ER: "Eritrea",
    EE: "Estland",
    ET: "Ethiopië",
    FK: "Falklandeilanden",
    FO: "Faeröer",
    FJ: "Fiji",
    FI: "Finland",
    FR: "Frankrijk",
    GF: "Frans-Guyana",
    PF: "Frans-Polynesië",
    TF: "Franse Zuidelijke Gebieden",
    GA: "Gabon",
    GM: "Gambia",
    GE: "Georgië",
    DE: "Duitsland",
    GH: "Ghana",
    GI: "Gibraltar",
    GR: "Griekenland",
    GL: "Groenland",
    GD: "Grenada",
    GP: "Guadeloupe",
    GU: "Guam",
    GT: "Guatemala",
    GN: "Guinea",
    GW: "Guinee-Bissau",
    GY: "Guyana",
    HT: "Haïti",
    HM: "Heard en McDonaldeilanden",
    VA: "Heilige Stoel",
    HN: "Honduras",
    HK: "Hong Kong",
    HU: "Hongarije",
    IS: "IJsland",
    IN: "India",
    ID: "Indonesia",
    IR: "Iran",
    IQ: "Irak",
    IE: "Ierland",
    IL: "Israël",
    IT: "Italië",
    JM: "Jamaica",
    JP: "Japan",
    JO: "Jordanië",
    KZ: "Kazachstan",
    KE: "Kenia",
    KI: "Kiribati",
    KP: "Noord-Korea",
    KR: "Zuid-Korea",
    KW: "Koeweit",
    KG: "Kirgizstan",
    LA: "Laos",
    LV: "Letland",
    LB: "Libanon",
    LS: "Lesotho",
    LR: "Liberia",
    LY: "Libië",
    LI: "Liechtenstein",
    LT: "Litouwen",
    LU: "Luxemburg",
    MO: "Macao",
    MK: "Macedonië, Ex-Joegoslavische Republiek",
    MG: "Madagaskar",
    MW: "Malawi",
    MY: "Maleisië",
    MV: "Maldiven",
    ML: "Mali",
    MT: "Malta",
    MH: "Marshalleilanden",
    MQ: "Martinique",
    MR: "Mauritanië",
    MU: "Mauritius",
    YT: "Mayotte",
    MX: "Mexico",
    FM: "Micronesië, Federale Staten",
    MD: "Moldavië",
    MC: "Monaco",
    MN: "Mongolië",
    MS: "Montserrat",
    MA: "Marokko",
    MZ: "Mozambique",
    MM: "Myanmar",
    NA: "Namibië",
    NR: "Nauru",
    NP: "Nepal",
    NL: "Nederland",
    NC: "Nieuw-Caledonië",
    NZ: "Nieuw-Zeeland",
    NI: "Nicaragua",
    NE: "Niger",
    NG: "Nigeria",
    NU: "Niue",
    NF: "Norfolk",
    MP: "Noordelijke Marianen",
    NO: "Noorwegen",
    OM: "Oman",
    PK: "Pakistan",
    PW: "Palau",
    PS: "Palestina",
    PA: "Panama",
    PG: "Papoea-Nieuw-Guinea",
    PY: "Paraguay",
    PE: "Peru",
    PH: "Filipijnen",
    PN: "Pitcairn",
    PL: "Polen",
    PT: "Portugal",
    PR: "Puerto Rico",
    QA: "Qatar",
    RE: "Réunion",
    RO: "Roemenië",
    RU: "Rusland",
    RW: "Rwanda",
    SH: "Sint-Helena",
    KN: "Saint Kitts en Nevis",
    LC: "Saint Lucia",
    PM: "Saint-Pierre en Miquelon",
    VC: "Saint Vincent en de Grenadines",
    WS: "Samoa",
    SM: "San Marino",
    ST: "São Tomé en Principe",
    SA: "Saudi-Arabië",
    SN: "Senegal",
    SC: "Seychellen",
    SL: "Sierra Leone",
    SG: "Singapore",
    SK: "Slowakije",
    SI: "Slovenië",
    SB: "Salomonseilanden",
    SO: "Somalië",
    ZA: "Zuid-Afrika",
    GS: "Zuid-Georgia en de Zuidelijke Sandwicheilanden",
    ES: "Spanje",
    LK: "Sri Lanka",
    SD: "Soedan",
    SR: "Suriname",
    SJ: "Spitsbergen en Jan Mayen",
    SZ: "Ngwane, Koninkrijk Swaziland",
    SE: "Zweden",
    CH: "Zwitserland",
    SY: "Syrië",
    TW: "Taiwan",
    TJ: "Tadzjikistan",
    TZ: "Tanzania, Verenigde Republiek",
    TH: "Thailand",
    TL: "Timor Leste",
    TG: "Togo",
    TK: "Tokelau",
    TO: "Tonga",
    TT: "Trinidad en Tobago",
    TN: "Tunesië",
    TR: "Turkije",
    TM: "Turkmenistan",
    TC: "Turks- en Caicoseilanden",
    TV: "Tuvalu",
    UG: "Oeganda",
    UA: "Oekraïne",
    AE: "Verenigde Arabische Emiraten",
    GB: "Verenigd Koninkrijk",
    US: "Verenigde Staten van Amerika",
    UM: "Ver afgelegen eilandjes van de Verenigde Staten",
    UY: "Uruguay",
    UZ: "Oezbekistan",
    VU: "Vanuatu",
    VE: "Venezuela",
    VN: "Vietnam",
    VG: "Maagdeneilanden, Britse",
    VI: "Maagdeneilanden, Amerikaanse",
    WF: "Wallis en Futuna",
    EH: "Westelijke Sahara",
    YE: "Jemen",
    ZM: "Zambia",
    ZW: "Zimbabwe",
    AX: "Åland",
    BQ: "Bonaire, Sint Eustatius en Saba",
    CW: "Curaçao",
    GG: "Guernsey",
    IM: "Man Eiland",
    JE: "Jersey",
    ME: "Montenegro",
    BL: "Saint Barthélemy",
    MF: "Sint-Maarten (Frans deel)",
    RS: "Servië",
    SX: "Sint Maarten (Nederlands deel)",
    SS: "Zuid-Soedan",
    XK: "Kosovo"
  };
  var nl = {
    locale: locale$w,
    countries: countries$w
  };

  var nl$1 = /*#__PURE__*/Object.freeze({
    locale: locale$w,
    countries: countries$w,
    default: nl
  });

  var locale$x = "nn";
  var countries$x = {
    AD: "Andorra",
    AE: "Dei sameinte arabiske emirata",
    AF: "Afghanistan",
    AG: "Antigua og Barbuda",
    AI: "Anguilla",
    AL: "Albania",
    AM: "Armenia",
    AO: "Angola",
    AQ: "Antarktis",
    AR: "Argentina",
    AS: "Amerikansk Samoa",
    AT: "Austerrike",
    AU: "Australia",
    AW: "Aruba",
    AX: "Åland",
    AZ: "Aserbajdsjan",
    BA: "Bosnia-Hercegovina",
    BB: "Barbados",
    BD: "Bangladesh",
    BE: "Belgia",
    BF: "Burkina Faso",
    BG: "Bulgaria",
    BH: "Bahrain",
    BI: "Burundi",
    BJ: "Benin",
    BL: "Saint-Barthélemy",
    BM: "Bermuda",
    BN: "Brunei",
    BO: "Bolivia",
    BQ: "Karibisk Nederland",
    BR: "Brasil",
    BS: "Bahamas",
    BT: "Bhutan",
    BV: "Bouvetøya",
    BW: "Botswana",
    BY: "Kviterussland",
    BZ: "Belize",
    CA: "Canada",
    CC: "Kokosøyane",
    CD: "Kongo",
    CF: "Den sentralafrikanske republikken",
    CG: "Kongo-Brazzaville",
    CH: "Sveits",
    CI: "Elfenbeinskysten",
    CK: "Cookøyane",
    CL: "Chile",
    CM: "Kamerun",
    CN: "Kina",
    CO: "Colombia",
    CR: "Costa Rica",
    CU: "Cuba",
    CV: "Kapp Verde",
    CW: "Curaçao",
    CX: "Christmasøya",
    CY: "Kypros",
    CZ: "Tsjekkia",
    DE: "Tyskland",
    DJ: "Djibouti",
    DK: "Danmark",
    DM: "Dominica",
    DO: "Den dominikanske republikken",
    DZ: "Algerie",
    EC: "Ecuador",
    EE: "Estland",
    EG: "Egypt",
    EH: "Vest-Sahara",
    ER: "Eritrea",
    ES: "Spania",
    ET: "Etiopia",
    FI: "Finland",
    FJ: "Fiji",
    FK: "Falklandsøyane",
    FM: "Mikronesiaføderasjonen",
    FO: "Færøyane",
    FR: "Frankrike",
    GA: "Gabon",
    GB: "Storbritannia",
    GD: "Grenada",
    GE: "Georgia",
    GF: "Fransk Guyana",
    GG: "Guernsey",
    GH: "Ghana",
    GI: "Gibraltar",
    GL: "Grønland",
    GM: "Gambia",
    GN: "Guinea",
    GP: "Guadeloupe",
    GQ: "Ekvatorial-Guinea",
    GR: "Hellas",
    GS: "Sør-Georgia og de søre Sandwichøyane",
    GT: "Guatemala",
    GU: "Guam",
    GW: "Guinea-Bissau",
    GY: "Guyana",
    HK: "Hongkong",
    HM: "Heard- og McDonald-øyane",
    HN: "Honduras",
    HR: "Kroatia",
    HT: "Haiti",
    HU: "Ungarn",
    ID: "Indonesia",
    IE: "Irland",
    IL: "Israel",
    IM: "Man",
    IN: "India",
    IO: "Britisk territorium i Indiahavet",
    IQ: "Irak",
    IR: "Iran",
    IS: "Island",
    IT: "Italia",
    JE: "Jersey",
    JM: "Jamaica",
    JO: "Jordan",
    JP: "Japan",
    KE: "Kenya",
    KG: "Kirgisistan",
    KH: "Kambodsja",
    KI: "Kiribati",
    KM: "Komorane",
    KN: "Saint Kitts og Nevis",
    KP: "Nord-Korea",
    KR: "Sør-Korea",
    KW: "Kuwait",
    KY: "Caymanøyane",
    KZ: "Kasakhstan",
    LA: "Laos",
    LB: "Libanon",
    LC: "Saint Lucia",
    LI: "Liechtenstein",
    LK: "Sri Lanka",
    LR: "Liberia",
    LS: "Lesotho",
    LT: "Litauen",
    LU: "Luxembourg",
    LV: "Latvia",
    LY: "Libya",
    MA: "Marokko",
    MC: "Monaco",
    MD: "Moldova",
    ME: "Montenegro",
    MF: "Saint-Martin",
    MG: "Madagaskar",
    MH: "Marshalløyane",
    MK: "Makedonia",
    ML: "Mali",
    MM: "Burma",
    MN: "Mongolia",
    MO: "Macao",
    MP: "Nord-Marianane",
    MQ: "Martinique",
    MR: "Mauritania",
    MS: "Montserrat",
    MT: "Malta",
    MU: "Mauritius",
    MV: "Maldivane",
    MW: "Malawi",
    MX: "Mexico",
    MY: "Malaysia",
    MZ: "Mosambik",
    NA: "Namibia",
    NC: "Ny-Caledonia",
    NE: "Niger",
    NF: "Norfolk Island",
    NG: "Nigeria",
    NI: "Nicaragua",
    NL: "Nederland",
    NO: "Noreg",
    NP: "Nepal",
    NR: "Nauru",
    NU: "Niue",
    NZ: "New Zealand",
    OM: "Oman",
    PA: "Panama",
    PE: "Peru",
    PF: "Fransk Polynesia",
    PG: "Papua Ny-Guinea",
    PH: "Filippinane",
    PK: "Pakistan",
    PL: "Polen",
    PM: "Saint-Pierre-et-Miquelon",
    PN: "Pitcairn",
    PR: "Puerto Rico",
    PS: "Dei okkuperte palestinske områda",
    PT: "Portugal",
    PW: "Palau",
    PY: "Paraguay",
    QA: "Qatar",
    RE: "Réunion",
    RO: "Romania",
    RS: "Serbia",
    RU: "Russland",
    RW: "Rwanda",
    SA: "Saudi-Arabia",
    SB: "Salomonøyane",
    SC: "Seychellane",
    SD: "Sudan",
    SE: "Sverige",
    SG: "Singapore",
    SH: "St. Helena",
    SI: "Slovenia",
    SJ: "Svalbard og Jan Mayen",
    SK: "Slovakia",
    SL: "Sierra Leone",
    SM: "San Marino",
    SN: "Senegal",
    SO: "Somalia",
    SR: "Surinam",
    SS: "Sør-Sudan",
    ST: "São Tomé og Príncipe",
    SV: "El Salvador",
    SX: "Sint Maarten (Nederlandsk del)",
    SY: "Syria",
    SZ: "Swaziland",
    TC: "Turks- og Caicosøyane",
    TD: "Tsjad",
    TF: "Søre franske territorier",
    TG: "Togo",
    TH: "Thailand",
    TJ: "Tadsjikistan",
    TK: "Tokelau",
    TL: "Aust-Timor",
    TM: "Turkmenistan",
    TN: "Tunisia",
    TO: "Tonga",
    TR: "Tyrkia",
    TT: "Trinidad og Tobago",
    TV: "Tuvalu",
    TW: "Taiwan",
    TZ: "Tanzania",
    UA: "Ukraina",
    UG: "Uganda",
    UM: "USA, mindre, utanforliggande øyar",
    US: "USA",
    UY: "Uruguay",
    UZ: "Usbekistan",
    VA: "Vatikanstaten",
    VC: "Saint Vincent og Grenadinane",
    VE: "Venezuela",
    VG: "Jomfruøyane (Britisk)",
    VI: "Jomfruøyane (USA)",
    VN: "Vietnam",
    VU: "Vanuatu",
    WF: "Wallis- og Futunaøyane",
    WS: "Samoa",
    YE: "Jemen",
    YT: "Mayotte",
    ZA: "Sør-Afrika",
    ZM: "Zambia",
    ZW: "Zimbabwe",
    XK: "Kosovo"
  };
  var nn = {
    locale: locale$x,
    countries: countries$x
  };

  var nn$1 = /*#__PURE__*/Object.freeze({
    locale: locale$x,
    countries: countries$x,
    default: nn
  });

  var locale$y = "pl";
  var countries$y = {
    AF: "Afganistan",
    AL: "Albania",
    DZ: "Algieria",
    AS: "Samoa Amerykańskie",
    AD: "Andora",
    AO: "Angola",
    AI: "Anguilla",
    AQ: "Antarktyka",
    AG: "Antigua i Barbuda",
    AR: "Argentyna",
    AM: "Armenia",
    AW: "Aruba",
    AU: "Australia",
    AT: "Austria",
    AZ: "Azerbejdżan",
    BS: "Bahamy",
    BH: "Bahrajn",
    BD: "Bangladesz",
    BB: "Barbados",
    BY: "Białoruś",
    BE: "Belgia",
    BZ: "Belize",
    BJ: "Benin",
    BM: "Bermudy",
    BT: "Bhutan",
    BO: "Boliwia",
    BA: "Bośnia i Hercegowina",
    BW: "Botswana",
    BV: "Wyspa Bouveta",
    BR: "Brazylia",
    IO: "Brytyjskie Terytorium Oceanu Indyjskiego",
    BN: "Brunei",
    BG: "Bułgaria",
    BF: "Burkina Faso",
    BI: "Burundi",
    KH: "Kambodża",
    CM: "Kamerun",
    CA: "Kanada",
    CV: "Republika Zielonego Przylądka",
    KY: "Kajmany",
    CF: "Republika Środkowoafrykańska",
    TD: "Czad",
    CL: "Chile",
    CN: "Chiny",
    CX: "Wyspa Bożego Narodzenia",
    CC: "Wyspy Kokosowe",
    CO: "Kolumbia",
    KM: "Komory",
    CG: "Kongo",
    CD: "Demokratyczna Republika Konga",
    CK: "Wyspy Cooka",
    CR: "Kostaryka",
    CI: "Wybrzeże Kości Słoniowej",
    HR: "Chorwacja",
    CU: "Kuba",
    CY: "Cypr",
    CZ: "Czechy",
    DK: "Dania",
    DJ: "Dżibuti",
    DM: "Dominika",
    DO: "Dominikana",
    EC: "Ekwador",
    EG: "Egipt",
    SV: "Salwador",
    GQ: "Gwinea Równikowa",
    ER: "Erytrea",
    EE: "Estonia",
    ET: "Etiopia",
    FK: "Falklandy",
    FO: "Wyspy Owcze",
    FJ: "Fidżi",
    FI: "Finlandia",
    FR: "Francja",
    GF: "Gujana Francuska",
    PF: "Polinezja Francuska",
    TF: "Francuskie Terytoria Południowe i Antarktyczne",
    GA: "Gabon",
    GM: "Gambia",
    GE: "Gruzja",
    DE: "Niemcy",
    GH: "Ghana",
    GI: "Gibraltar",
    GR: "Grecja",
    GL: "Grenlandia",
    GD: "Grenada",
    GP: "Gwadelupa",
    GU: "Guam",
    GT: "Gwatemala",
    GN: "Gwinea",
    GW: "Gwinea Bissau",
    GY: "Gujana",
    HT: "Haiti",
    HM: "Wyspy Heard i McDonalda",
    VA: "Watykan",
    HN: "Honduras",
    HK: "Hongkong",
    HU: "Węgry",
    IS: "Islandia",
    IN: "Indie",
    ID: "Indonezja",
    IR: "Iran",
    IQ: "Irak",
    IE: "Irlandia",
    IL: "Izrael",
    IT: "Włochy",
    JM: "Jamajka",
    JP: "Japonia",
    JO: "Jordania",
    KZ: "Kazachstan",
    KE: "Kenia",
    KI: "Kiribati",
    KP: "Korea Północna",
    KR: "Korea Południowa",
    KW: "Kuwejt",
    KG: "Kirgistan",
    LA: "Laos",
    LV: "Łotwa",
    LB: "Liban",
    LS: "Lesotho",
    LR: "Liberia",
    LY: "Libia",
    LI: "Liechtenstein",
    LT: "Litwa",
    LU: "Luksemburg",
    MO: "Makau",
    MK: "Macedonia",
    MG: "Madagaskar",
    MW: "Malawi",
    MY: "Malezja",
    MV: "Malediwy",
    ML: "Mali",
    MT: "Malta",
    MH: "Wyspy Marshalla",
    MQ: "Martynika",
    MR: "Mauretania",
    MU: "Mauritius",
    YT: "Majotta",
    MX: "Meksyk",
    FM: "Mikronezja",
    MD: "Mołdawia",
    MC: "Monako",
    MN: "Mongolia",
    MS: "Montserrat",
    MA: "Maroko",
    MZ: "Mozambik",
    MM: "Mjanma",
    NA: "Namibia",
    NR: "Nauru",
    NP: "Nepal",
    NL: "Holandia",
    NC: "Nowa Kaledonia",
    NZ: "Nowa Zelandia",
    NI: "Nikaragua",
    NE: "Niger",
    NG: "Nigeria",
    NU: "Niue",
    NF: "Norfolk",
    MP: "Mariany Północne",
    NO: "Norwegia",
    OM: "Oman",
    PK: "Pakistan",
    PW: "Palau",
    PS: "Palestyna",
    PA: "Panama",
    PG: "Papua-Nowa Gwinea",
    PY: "Paragwaj",
    PE: "Peru",
    PH: "Filipiny",
    PN: "Pitcairn",
    PL: "Polska",
    PT: "Portugalia",
    PR: "Portoryko",
    QA: "Katar",
    RE: "Reunion",
    RO: "Rumunia",
    RU: "Rosja",
    RW: "Rwanda",
    SH: "Wyspa Świętej Heleny, Wyspa Wniebowstąpienia i Tristan da Cunha",
    KN: "Saint Kitts i Nevis",
    LC: "Saint Lucia",
    PM: "Saint-Pierre i Miquelon",
    VC: "Saint Vincent i Grenadyny",
    WS: "Samoa",
    SM: "San Marino",
    ST: "Wyspy Świętego Tomasza i Książęca",
    SA: "Arabia Saudyjska",
    SN: "Senegal",
    SC: "Seszele",
    SL: "Sierra Leone",
    SG: "Singapur",
    SK: "Słowacja",
    SI: "Słowenia",
    SB: "Wyspy Salomona",
    SO: "Somalia",
    ZA: "Południowa Afryka",
    GS: "Georgia Południowa i Sandwich Południowy",
    ES: "Hiszpania",
    LK: "Sri Lanka",
    SD: "Sudan",
    SR: "Surinam",
    SJ: "Svalbard i Jan Mayen",
    SZ: "Suazi",
    SE: "Szwecja",
    CH: "Szwajcaria",
    SY: "Syria",
    TW: "Tajwan",
    TJ: "Tadżykistan",
    TZ: "Tanzania",
    TH: "Tajlandia",
    TL: "Timor Wschodni",
    TG: "Togo",
    TK: "Tokelau",
    TO: "Tonga",
    TT: "Trynidad i Tobago",
    TN: "Tunezja",
    TR: "Turcja",
    TM: "Turkmenistan",
    TC: "Turks i Caicos",
    TV: "Tuvalu",
    UG: "Uganda",
    UA: "Ukraina",
    AE: "Zjednoczone Emiraty Arabskie",
    GB: "Wielka Brytania",
    US: "Stany Zjednoczone",
    UM: "Dalekie Wyspy Mniejsze Stanów Zjednoczonych",
    UY: "Urugwaj",
    UZ: "Uzbekistan",
    VU: "Vanuatu",
    VE: "Wenezuela",
    VN: "Wietnam",
    VG: "Brytyjskie Wyspy Dziewicze",
    VI: "Wyspy Dziewicze Stanów Zjednoczonych",
    WF: "Wallis i Futuna",
    EH: "Sahara Zachodnia",
    YE: "Jemen",
    ZM: "Zambia",
    ZW: "Zimbabwe",
    AX: "Wyspy Alandzkie",
    BQ: "Bonaire, Sint Eustatius i Saba",
    CW: "Curaçao",
    GG: "Guernsey",
    IM: "Wyspa Man",
    JE: "Jersey",
    ME: "Czarnogóra",
    BL: "Saint-Barthélemy",
    MF: "Saint-Martin",
    RS: "Serbia",
    SX: "Sint Maarten",
    SS: "Sudan Południowy",
    XK: "Kosowo"
  };
  var pl = {
    locale: locale$y,
    countries: countries$y
  };

  var pl$1 = /*#__PURE__*/Object.freeze({
    locale: locale$y,
    countries: countries$y,
    default: pl
  });

  var locale$z = "pt";
  var countries$z = {
    AF: "Afeganistão",
    ZA: "África do Sul",
    AL: "Albânia",
    DE: "Alemanha",
    AD: "Andorra",
    AO: "Angola",
    AI: "Anguilla",
    AQ: "Antártida",
    AG: "Antígua e Barbuda",
    SA: "Arábia Saudita",
    DZ: "Argélia",
    AR: "Argentina",
    AM: "Armênia",
    AW: "Aruba",
    AU: "Austrália",
    AT: "Áustria",
    AZ: "Azerbaijão",
    BS: "Bahamas",
    BH: "Bahrein",
    BD: "Bangladesh",
    BB: "Barbados",
    BE: "Bélgica",
    BZ: "Belize",
    BJ: "Benin",
    BM: "Bermudas",
    BY: "Bielorrússia",
    BO: "Bolívia",
    BA: "Bósnia e Herzegovina",
    BW: "Botsuana",
    BR: "Brasil",
    BN: "Brunei",
    BG: "Bulgária",
    BF: "Burquina Faso",
    BI: "Burundi",
    BT: "Butão",
    CV: "Cabo Verde",
    KH: "Camboja",
    CA: "Canadá",
    QA: "Catar",
    KZ: "Cazaquistão",
    TD: "Chade",
    CL: "Chile",
    CN: "China",
    CY: "Chipre",
    VA: "Cidade do Vaticano",
    SG: "Cingapura",
    CO: "Colômbia",
    KM: "Comores",
    CG: "Congo - Brazzaville",
    CD: "Congo - Kinshasa",
    KP: "Coreia do Norte",
    KR: "Coreia do Sul",
    CI: "Costa do Marfim",
    CR: "Costa Rica",
    HR: "Croácia",
    CU: "Cuba",
    CW: "Curaçao",
    DK: "Dinamarca",
    DJ: "Djibuti",
    DM: "Dominica",
    EG: "Egito",
    SV: "El Salvador",
    AE: "Emirados Árabes Unidos",
    EC: "Equador",
    ER: "Eritreia",
    SK: "Eslováquia",
    SI: "Eslovênia",
    ES: "Espanha",
    US: "Estados Unidos",
    EE: "Estônia",
    ET: "Etiópia",
    FJ: "Fiji",
    PH: "Filipinas",
    FI: "Finlândia",
    FR: "França",
    GA: "Gabão",
    GM: "Gâmbia",
    GH: "Gana",
    GE: "Geórgia",
    GS: "Geórgia do Sul e Ilhas Sandwich do Sul",
    GI: "Gibraltar",
    GD: "Granada",
    GR: "Grécia",
    GL: "Groenlândia",
    GP: "Guadalupe",
    GU: "Guam",
    GT: "Guatemala",
    GG: "Guernsey",
    GY: "Guiana",
    GF: "Guiana Francesa",
    GN: "Guiné",
    GW: "Guiné Bissau",
    GQ: "Guiné Equatorial",
    HT: "Haiti",
    NL: "Holanda",
    HN: "Honduras",
    HK: "Hong Kong, RAE da China",
    HU: "Hungria",
    YE: "Iêmen",
    BV: "Ilhas Bouvet",
    CX: "Ilha Christmas",
    IM: "Ilha de Man",
    NF: "Ilha Norfolk",
    AX: "Ilhas Åland",
    KY: "Ilhas Caiman",
    CC: "Ilhas Cocos (Keeling)",
    CK: "Ilhas Cook",
    UM: "Ilhas Distantes dos EUA",
    HM: "Ilha Heard e Ilha McDonald",
    FO: "Ilhas Faroe",
    FK: "Ilhas Malvinas",
    MP: "Ilhas Marianas do Norte",
    MH: "Ilhas Marshall",
    PN: "Ilhas Pitcairn",
    SB: "Ilhas Salomão",
    TC: "Ilhas Turks e Caicos",
    VG: "Ilhas Virgens Britânicas",
    VI: "Ilhas Virgens dos EUA",
    IN: "Índia",
    ID: "Indonésia",
    IR: "Irã",
    IQ: "Iraque",
    IE: "Irlanda",
    IS: "Islândia",
    IL: "Israel",
    IT: "Itália",
    JM: "Jamaica",
    JP: "Japão",
    JE: "Jersey",
    JO: "Jordânia",
    KW: "Kuwait",
    LA: "Laos",
    LS: "Lesoto",
    LV: "Letônia",
    LB: "Líbano",
    LR: "Libéria",
    LY: "Líbia",
    LI: "Liechtenstein",
    LT: "Lituânia",
    LU: "Luxemburgo",
    MO: "Macau, RAE da China",
    MK: "Macedônia",
    MG: "Madagascar",
    MY: "Malásia",
    MW: "Malawi",
    MV: "Maldivas",
    ML: "Mali",
    MT: "Malta",
    MA: "Marrocos",
    MQ: "Martinica",
    MU: "Maurício",
    MR: "Mauritânia",
    YT: "Mayotte",
    MX: "México",
    MM: "Mianmar (Birmânia)",
    FM: "Micronésia",
    MZ: "Moçambique",
    MD: "Moldávia",
    MC: "Mônaco",
    MN: "Mongólia",
    ME: "Montenegro",
    MS: "Montserrat",
    NA: "Namíbia",
    NR: "Nauru",
    NP: "Nepal",
    NI: "Nicarágua",
    NE: "Níger",
    NG: "Nigéria",
    NU: "Niue",
    NO: "Noruega",
    NC: "Nova Caledônia",
    NZ: "Nova Zelândia",
    OM: "Omã",
    BQ: "Países Baixos Caribenhos",
    PW: "Palau",
    PA: "Panamá",
    PG: "Papua-Nova Guiné",
    PK: "Paquistão",
    PY: "Paraguai",
    PE: "Peru",
    PF: "Polinésia Francesa",
    PL: "Polônia",
    PR: "Porto Rico",
    PT: "Portugal",
    KE: "Quênia",
    KG: "Quirguistão",
    KI: "Quiribati",
    GB: "Reino Unido",
    CF: "República Centro-Africana",
    DO: "República Dominicana",
    CM: "República dos Camarões",
    CZ: "República Tcheca",
    RE: "Reunião",
    RO: "Romênia",
    RW: "Ruanda",
    RU: "Rússia",
    EH: "Saara Ocidental",
    PM: "Saint Pierre e Miquelon",
    WS: "Samoa",
    AS: "Samoa Americana",
    SM: "San Marino",
    SH: "Santa Helena",
    LC: "Santa Lúcia",
    BL: "São Bartolomeu",
    KN: "São Cristóvão e Nevis",
    MF: "São Martinho",
    ST: "São Tomé e Príncipe",
    VC: "São Vicente e Granadinas",
    SN: "Senegal",
    SL: "Serra Leoa",
    RS: "Sérvia",
    SC: "Seychelles",
    SX: "Sint Maarten",
    SY: "Síria",
    SO: "Somália",
    LK: "Sri Lanka",
    SZ: "Suazilândia",
    SD: "Sudão",
    SS: "Sudão do Sul",
    SE: "Suécia",
    CH: "Suíça",
    SR: "Suriname",
    SJ: "Svalbard e Jan Mayen",
    TH: "Tailândia",
    TW: "Taiwan",
    TJ: "Tajiquistão",
    TZ: "Tanzânia",
    IO: "Território Britânico do Oceano Índico",
    TF: "Territórios Franceses do Sul",
    PS: "Territórios palestinos",
    TL: "Timor-Leste",
    TG: "Togo",
    TK: "Tokelau",
    TO: "Tonga",
    TT: "Trinidad e Tobago",
    TN: "Tunísia",
    TM: "Turcomenistão",
    TR: "Turquia",
    TV: "Tuvalu",
    UA: "Ucrânia",
    UG: "Uganda",
    UY: "Uruguai",
    UZ: "Uzbequistão",
    VU: "Vanuatu",
    VE: "Venezuela",
    VN: "Vietnã",
    WF: "Wallis e Futuna",
    ZM: "Zâmbia",
    ZW: "Zimbábue",
    XK: "Kosovo"
  };
  var pt = {
    locale: locale$z,
    countries: countries$z
  };

  var pt$1 = /*#__PURE__*/Object.freeze({
    locale: locale$z,
    countries: countries$z,
    default: pt
  });

  var locale$A = "ro";
  var countries$A = {
    AD: "Andorra",
    AE: "Emiratele Arabe Unite",
    AF: "Afganistan",
    AG: "Antigua și Barbuda",
    AI: "Anguilla",
    AL: "Albania",
    AM: "Armenia",
    AO: "Angola",
    AQ: "Antarctica",
    AR: "Argentina",
    AS: "Samoa Americană",
    AT: "Austria",
    AU: "Australia",
    AW: "Aruba",
    AX: "Insulele Åland",
    AZ: "Azerbaidjan",
    BA: "Bosnia și Herțegovina",
    BB: "Barbados",
    BD: "Bangladesh",
    BE: "Belgia",
    BF: "Burkina Faso",
    BG: "Bulgaria",
    BH: "Bahrain",
    BI: "Burundi",
    BJ: "Benin",
    BL: "Sfântul Bartolomeu",
    BM: "Bermuda",
    BN: "Brunei",
    BO: "Bolivia",
    BQ: "Insulele Caraibe Olandeze",
    BR: "Brazilia",
    BS: "Bahamas",
    BT: "Bhutan",
    BV: "Insula Bouvet",
    BW: "Botswana",
    BY: "Belarus",
    BZ: "Belize",
    CA: "Canada",
    CC: "Insulele Cocos (Keeling)",
    CD: "Congo - Kinshasa",
    CF: "Republica Centrafricană",
    CG: "Congo - Brazzaville",
    CH: "Elveția",
    CI: "Côte d’Ivoire",
    CK: "Insulele Cook",
    CL: "Chile",
    CM: "Camerun",
    CN: "China",
    CO: "Columbia",
    CR: "Costa Rica",
    CU: "Cuba",
    CV: "Capul Verde",
    CW: "Curaçao",
    CX: "Insula Christmas",
    CY: "Cipru",
    CZ: "Cehia",
    DE: "Germania",
    DJ: "Djibouti",
    DK: "Danemarca",
    DM: "Dominica",
    DO: "Republica Dominicană",
    DZ: "Algeria",
    EC: "Ecuador",
    EE: "Estonia",
    EG: "Egipt",
    EH: "Sahara Occidentală",
    ER: "Eritreea",
    ES: "Spania",
    ET: "Etiopia",
    FI: "Finlanda",
    FJ: "Fiji",
    FK: "Insulele Falkland",
    FM: "Micronezia",
    FO: "Insulele Feroe",
    FR: "Franța",
    GA: "Gabon",
    GB: "Regatul Unit",
    GD: "Grenada",
    GE: "Georgia",
    GF: "Guyana Franceză",
    GG: "Guernsey",
    GH: "Ghana",
    GI: "Gibraltar",
    GL: "Groenlanda",
    GM: "Gambia",
    GN: "Guineea",
    GP: "Guadelupa",
    GQ: "Guineea Ecuatorială",
    GR: "Grecia",
    GS: "Georgia de Sud și Insulele Sandwich de Sud",
    GT: "Guatemala",
    GU: "Guam",
    GW: "Guineea-Bissau",
    GY: "Guyana",
    HK: "R.A.S. Hong Kong a Chinei",
    HM: "Insula Heard și Insulele McDonald",
    HN: "Honduras",
    HR: "Croația",
    HT: "Haiti",
    HU: "Ungaria",
    ID: "Indonezia",
    IE: "Irlanda",
    IL: "Israel",
    IM: "Insula Man",
    IN: "India",
    IO: "Teritoriul Britanic din Oceanul Indian",
    IQ: "Irak",
    IR: "Iran",
    IS: "Islanda",
    IT: "Italia",
    JE: "Jersey",
    JM: "Jamaica",
    JO: "Iordania",
    JP: "Japonia",
    KE: "Kenya",
    KG: "Kârgâzstan",
    KH: "Cambodgia",
    KI: "Kiribati",
    KM: "Comore",
    KN: "Saint Kitts și Nevis",
    KP: "Coreea de Nord",
    KR: "Coreea de Sud",
    KW: "Kuweit",
    KY: "Insulele Cayman",
    KZ: "Kazahstan",
    LA: "Laos",
    LB: "Liban",
    LC: "Sfânta Lucia",
    LI: "Liechtenstein",
    LK: "Sri Lanka",
    LR: "Liberia",
    LS: "Lesotho",
    LT: "Lituania",
    LU: "Luxemburg",
    LV: "Letonia",
    LY: "Libia",
    MA: "Maroc",
    MC: "Monaco",
    MD: "Republica Moldova",
    ME: "Muntenegru",
    MF: "Sfântul Martin",
    MG: "Madagascar",
    MH: "Insulele Marshall",
    MK: "Republica Macedonia",
    ML: "Mali",
    MM: "Myanmar",
    MN: "Mongolia",
    MO: "R.A.S. Macao a Chinei",
    MP: "Insulele Mariane de Nord",
    MQ: "Martinica",
    MR: "Mauritania",
    MS: "Montserrat",
    MT: "Malta",
    MU: "Mauritius",
    MV: "Maldive",
    MW: "Malawi",
    MX: "Mexic",
    MY: "Malaysia",
    MZ: "Mozambic",
    NA: "Namibia",
    NC: "Noua Caledonie",
    NE: "Niger",
    NF: "Insula Norfolk",
    NG: "Nigeria",
    NI: "Nicaragua",
    NL: "Țările de Jos",
    NO: "Norvegia",
    NP: "Nepal",
    NR: "Nauru",
    NU: "Niue",
    NZ: "Noua Zeelandă",
    OM: "Oman",
    PA: "Panama",
    PE: "Peru",
    PF: "Polinezia Franceză",
    PG: "Papua-Noua Guinee",
    PH: "Filipine",
    PK: "Pakistan",
    PL: "Polonia",
    PM: "Saint-Pierre și Miquelon",
    PN: "Insulele Pitcairn",
    PR: "Puerto Rico",
    PS: "Teritoriile Palestiniene",
    PT: "Portugalia",
    PW: "Palau",
    PY: "Paraguay",
    QA: "Qatar",
    RE: "Réunion",
    RO: "România",
    RS: "Serbia",
    RU: "Rusia",
    RW: "Rwanda",
    SA: "Arabia Saudită",
    SB: "Insulele Solomon",
    SC: "Seychelles",
    SD: "Sudan",
    SE: "Suedia",
    SG: "Singapore",
    SH: "Sfânta Elena",
    SI: "Slovenia",
    SJ: "Svalbard și Jan Mayen",
    SK: "Slovacia",
    SL: "Sierra Leone",
    SM: "San Marino",
    SN: "Senegal",
    SO: "Somalia",
    SR: "Suriname",
    SS: "Sudanul de Sud",
    ST: "Sao Tomé și Príncipe",
    SV: "El Salvador",
    SX: "Sint-Maarten",
    SY: "Siria",
    SZ: "Swaziland",
    TC: "Insulele Turks și Caicos",
    TD: "Ciad",
    TF: "Teritoriile Australe și Antarctice Franceze",
    TG: "Togo",
    TH: "Thailanda",
    TJ: "Tadjikistan",
    TK: "Tokelau",
    TL: "Timorul de Est",
    TM: "Turkmenistan",
    TN: "Tunisia",
    TO: "Tonga",
    TR: "Turcia",
    TT: "Trinidad și Tobago",
    TV: "Tuvalu",
    TW: "Taiwan",
    TZ: "Tanzania",
    UA: "Ucraina",
    UG: "Uganda",
    UM: "Insulele Îndepărtate ale S.U.A.",
    US: "Statele Unite ale Americii",
    UY: "Uruguay",
    UZ: "Uzbekistan",
    VA: "Statul Cetății Vaticanului",
    VC: "Saint Vincent și Grenadinele",
    VE: "Venezuela",
    VG: "Insulele Virgine Britanice",
    VI: "Insulele Virgine Americane",
    VN: "Vietnam",
    VU: "Vanuatu",
    WF: "Wallis și Futuna",
    WS: "Samoa",
    XK: "Kosovo",
    YE: "Yemen",
    YT: "Mayotte",
    ZA: "Africa de Sud",
    ZM: "Zambia",
    ZW: "Zimbabwe"
  };
  var ro = {
    locale: locale$A,
    countries: countries$A
  };

  var ro$1 = /*#__PURE__*/Object.freeze({
    locale: locale$A,
    countries: countries$A,
    default: ro
  });

  var locale$B = "ru";
  var countries$B = {
    AU: "Австралия",
    AT: "Австрия",
    AZ: "Азербайджан",
    AX: "Аландские острова",
    AL: "Албания",
    DZ: "Алжир",
    VI: "Виргинские Острова (США)",
    AS: "Американское Самоа",
    AI: "Ангилья",
    AO: "Ангола",
    AD: "Андорра",
    AQ: "Антарктида",
    AG: "Антигуа и Барбуда",
    AR: "Аргентина",
    AM: "Армения",
    AW: "Аруба",
    AF: "Афганистан",
    BS: "Багамы",
    BD: "Бангладеш",
    BB: "Барбадос",
    BH: "Бахрейн",
    BZ: "Белиз",
    BY: "Беларусь",
    BE: "Бельгия",
    BJ: "Бенин",
    BM: "Бермуды",
    BG: "Болгария",
    BO: "Боливия",
    BQ: "Бонэйр, Синт-Эстатиус и Саба",
    BA: "Босния и Герцеговина",
    BW: "Ботсвана",
    BR: "Бразилия",
    IO: "Британская территория в Индийском океане",
    VG: "Виргинские Острова (Великобритания)",
    BN: "Бруней",
    BF: "Буркина-Фасо",
    BI: "Бурунди",
    BT: "Бутан",
    VU: "Вануату",
    VA: "Ватикан",
    GB: "Великобритания",
    HU: "Венгрия",
    VE: "Венесуэла",
    UM: "Внешние малые острова (США)",
    TL: "Восточный Тимор",
    VN: "Вьетнам",
    GA: "Габон",
    HT: "Гаити",
    GY: "Гайана",
    GM: "Гамбия",
    GH: "Гана",
    GP: "Гваделупа",
    GT: "Гватемала",
    GF: "Гвиана",
    GN: "Гвинея",
    GW: "Гвинея-Бисау",
    DE: "Германия",
    GG: "Гернси",
    GI: "Гибралтар",
    HN: "Гондурас",
    HK: "Гонконг",
    GD: "Гренада",
    GL: "Гренландия",
    GR: "Греция",
    GE: "Грузия",
    GU: "Гуам",
    DK: "Дания",
    JE: "Джерси",
    DJ: "Джибути",
    DM: "Доминика",
    DO: "Доминиканская Республика",
    CD: "Демократическая Республика Конго",
    EG: "Египет",
    ZM: "Замбия",
    EH: "САДР",
    ZW: "Зимбабве",
    IL: "Израиль",
    IN: "Индия",
    ID: "Индонезия",
    JO: "Иордания",
    IQ: "Ирак",
    IR: "Иран",
    IE: "Ирландия",
    IS: "Исландия",
    ES: "Испания",
    IT: "Италия",
    YE: "Йемен",
    CV: "Кабо-Верде",
    KZ: "Казахстан",
    KY: "Острова Кайман",
    KH: "Камбоджа",
    CM: "Камерун",
    CA: "Канада",
    QA: "Катар",
    KE: "Кения",
    CY: "Кипр",
    KG: "Киргизия",
    KI: "Кирибати",
    TW: "Китайская Республика",
    KP: "КНДР (Корейская Народно-Демократическая Республика)",
    CN: "КНР (Китайская Народная Республика)",
    CC: "Кокосовые острова",
    CO: "Колумбия",
    KM: "Коморы",
    CR: "Коста-Рика",
    CI: "Кот-д’Ивуар",
    CU: "Куба",
    KW: "Кувейт",
    CW: "Кюрасао",
    LA: "Лаос",
    LV: "Латвия",
    LS: "Лесото",
    LR: "Либерия",
    LB: "Ливан",
    LY: "Ливия",
    LT: "Литва",
    LI: "Лихтенштейн",
    LU: "Люксембург",
    MU: "Маврикий",
    MR: "Мавритания",
    MG: "Мадагаскар",
    YT: "Майотта",
    MO: "Макао",
    MK: "Македония",
    MW: "Малави",
    MY: "Малайзия",
    ML: "Мали",
    MV: "Мальдивы",
    MT: "Мальта",
    MA: "Марокко",
    MQ: "Мартиника",
    MH: "Маршалловы Острова",
    MX: "Мексика",
    FM: "Микронезия",
    MZ: "Мозамбик",
    MD: "Молдавия",
    MC: "Монако",
    MN: "Монголия",
    MS: "Монтсеррат",
    MM: "Мьянма",
    NA: "Намибия",
    NR: "Науру",
    NP: "Непал",
    NE: "Нигер",
    NG: "Нигерия",
    NL: "Нидерланды",
    NI: "Никарагуа",
    NU: "Ниуэ",
    NZ: "Новая Зеландия",
    NC: "Новая Каледония",
    NO: "Норвегия",
    AE: "ОАЭ",
    OM: "Оман",
    BV: "Остров Буве",
    IM: "Остров Мэн",
    CK: "Острова Кука",
    NF: "Остров Норфолк",
    CX: "Остров Рождества",
    PN: "Острова Питкэрн",
    SH: "Острова Святой Елены, Вознесения и Тристан-да-Кунья",
    PK: "Пакистан",
    PW: "Палау",
    PS: "Государство Палестина",
    PA: "Панама",
    PG: "Папуа — Новая Гвинея",
    PY: "Парагвай",
    PE: "Перу",
    PL: "Польша",
    PT: "Португалия",
    PR: "Пуэрто-Рико",
    CG: "Республика Конго",
    KR: "Республика Корея",
    RE: "Реюньон",
    RU: "Россия",
    RW: "Руанда",
    RO: "Румыния",
    SV: "Сальвадор",
    WS: "Самоа",
    SM: "Сан-Марино",
    ST: "Сан-Томе и Принсипи",
    SA: "Саудовская Аравия",
    SZ: "Свазиленд",
    MP: "Северные Марианские Острова",
    SC: "Сейшельские Острова",
    BL: "Сен-Бартелеми",
    MF: "Сен-Мартен",
    PM: "Сен-Пьер и Микелон",
    SN: "Сенегал",
    VC: "Сент-Винсент и Гренадины",
    KN: "Сент-Китс и Невис",
    LC: "Сент-Люсия",
    RS: "Сербия",
    SG: "Сингапур",
    SX: "Синт-Мартен",
    SY: "Сирия",
    SK: "Словакия",
    SI: "Словения",
    SB: "Соломоновы Острова",
    SO: "Сомали",
    SD: "Судан",
    SR: "Суринам",
    US: "США",
    SL: "Сьерра-Леоне",
    TJ: "Таджикистан",
    TH: "Таиланд",
    TZ: "Танзания",
    TC: "Теркс и Кайкос",
    TG: "Того",
    TK: "Токелау",
    TO: "Тонга",
    TT: "Тринидад и Тобаго",
    TV: "Тувалу",
    TN: "Тунис",
    TM: "Туркмения",
    TR: "Турция",
    UG: "Уганда",
    UZ: "Узбекистан",
    UA: "Украина",
    WF: "Уоллис и Футуна",
    UY: "Уругвай",
    FO: "Фареры",
    FJ: "Фиджи",
    PH: "Филиппины",
    FI: "Финляндия",
    FK: "Фолклендские острова",
    FR: "Франция",
    PF: "Французская Полинезия",
    TF: "Французские Южные и Антарктические Территории",
    HM: "Херд и Макдональд",
    HR: "Хорватия",
    CF: "ЦАР",
    TD: "Чад",
    ME: "Черногория",
    CZ: "Чехия",
    CL: "Чили",
    CH: "Швейцария",
    SE: "Швеция",
    SJ: "Шпицберген и Ян-Майен",
    LK: "Шри-Ланка",
    EC: "Эквадор",
    GQ: "Экваториальная Гвинея",
    ER: "Эритрея",
    EE: "Эстония",
    ET: "Эфиопия",
    ZA: "ЮАР",
    GS: "Южная Георгия и Южные Сандвичевы Острова",
    SS: "Южный Судан",
    JM: "Ямайка",
    JP: "Япония",
    XK: "Косово"
  };
  var ru = {
    locale: locale$B,
    countries: countries$B
  };

  var ru$1 = /*#__PURE__*/Object.freeze({
    locale: locale$B,
    countries: countries$B,
    default: ru
  });

  var locale$C = "sk";
  var countries$C = {
    AD: "Andorra",
    AE: "Spojené arabské emiráty",
    AF: "Afganistan",
    AG: "Antigua a Barbuda",
    AI: "Anguilla",
    AL: "Albánsko",
    AM: "Arménsko",
    AO: "Angola",
    AQ: "Antarktída",
    AR: "Argentína",
    AS: "Americká Samoa",
    AT: "Rakúsko",
    AU: "Austrália",
    AW: "Aruba",
    AX: "Alandy",
    AZ: "Azerbajdžan",
    BA: "Bosna a Hercegovina",
    BB: "Barbados",
    BD: "Bangladéš",
    BE: "Belgicko",
    BF: "Burkina Faso",
    BG: "Bulharsko",
    BH: "Bahrajn",
    BI: "Burundi",
    BJ: "Benin",
    BL: "Svätý Bartolomej",
    BM: "Bermudy",
    BN: "Brunej",
    BO: "Bolívia",
    BQ: "Karibské Holandsko",
    BR: "Brazília",
    BS: "Bahamy",
    BT: "Bhután",
    BV: "Bouvetov ostrov",
    BW: "Botswana",
    BY: "Bielorusko",
    BZ: "Belize",
    CA: "Kanada",
    CC: "Kokosové ostrovy",
    CD: "Konžská demokratická republika",
    CF: "Stredoafrická republika",
    CG: "Konžská republika",
    CH: "Švajčiarsko",
    CI: "Pobrežie Slonoviny",
    CK: "Cookove ostrovy",
    CL: "Čile",
    CM: "Kamerun",
    CN: "Čína",
    CO: "Kolumbia",
    CR: "Kostarika",
    CU: "Kuba",
    CV: "Kapverdy",
    CW: "Curaçao",
    CX: "Vianočný ostrov",
    CY: "Cyprus",
    CZ: "Česko",
    DE: "Nemecko",
    DJ: "Džibutsko",
    DK: "Dánsko",
    DM: "Dominika",
    DO: "Dominikánska republika",
    DZ: "Alžírsko",
    EC: "Ekvádor",
    EE: "Estónsko",
    EG: "Egypt",
    EH: "Západná Sahara",
    ER: "Eritrea",
    ES: "Španielsko",
    ET: "Etiópia",
    FI: "Fínsko",
    FJ: "Fidži",
    FK: "Falklandy",
    FM: "Mikronézia",
    FO: "Faerské ostrovy",
    FR: "Francúzsko",
    GA: "Gabon",
    GB: "Spojené kráľovstvo",
    GD: "Grenada",
    GE: "Gruzínsko",
    GF: "Francúzska Guayana",
    GG: "Guernsey",
    GH: "Ghana",
    GI: "Gibraltár",
    GL: "Grónsko",
    GM: "Gambia",
    GN: "Guinea",
    GP: "Guadeloupe",
    GQ: "Rovníková Guinea",
    GR: "Grécko",
    GS: "Južná Georgia a Južné Sandwichove ostrovy",
    GT: "Guatemala",
    GU: "Guam",
    GW: "Guinea-Bissau",
    GY: "Guayana",
    HK: "Hongkong – OAO Číny",
    HM: "Heardov ostrov a Macdonaldove ostrovy",
    HN: "Honduras",
    HR: "Chorvátsko",
    HT: "Haiti",
    HU: "Maďarsko",
    ID: "Indonézia",
    IE: "Írsko",
    IL: "Izrael",
    IM: "Ostrov Man",
    IN: "India",
    IO: "Britské indickooceánske územie",
    IQ: "Irak",
    IR: "Irán",
    IS: "Island",
    IT: "Taliansko",
    JE: "Jersey",
    JM: "Jamajka",
    JO: "Jordánsko",
    JP: "Japonsko",
    KE: "Keňa",
    KG: "Kirgizsko",
    KH: "Kambodža",
    KI: "Kiribati",
    KM: "Komory",
    KN: "Svätý Krištof a Nevis",
    KP: "Severná Kórea",
    KR: "Južná Kórea",
    KW: "Kuvajt",
    KY: "Kajmanie ostrovy",
    KZ: "Kazachstan",
    LA: "Laos",
    LB: "Libanon",
    LC: "Svätá Lucia",
    LI: "Lichtenštajnsko",
    LK: "Srí Lanka",
    LR: "Libéria",
    LS: "Lesotho",
    LT: "Litva",
    LU: "Luxembursko",
    LV: "Lotyšsko",
    LY: "Líbya",
    MA: "Maroko",
    MC: "Monako",
    MD: "Moldavsko",
    ME: "Čierna Hora",
    MF: "Svätý Martin (fr.)",
    MG: "Madagaskar",
    MH: "Marshallove ostrovy",
    MK: "Macedónsko",
    ML: "Mali",
    MM: "Mjanmarsko",
    MN: "Mongolsko",
    MO: "Macao – OAO Číny",
    MP: "Severné Mariány",
    MQ: "Martinik",
    MR: "Mauritánia",
    MS: "Montserrat",
    MT: "Malta",
    MU: "Maurícius",
    MV: "Maldivy",
    MW: "Malawi",
    MX: "Mexiko",
    MY: "Malajzia",
    MZ: "Mozambik",
    NA: "Namíbia",
    NC: "Nová Kaledónia",
    NE: "Niger",
    NF: "Norfolk",
    NG: "Nigéria",
    NI: "Nikaragua",
    NL: "Holandsko",
    NO: "Nórsko",
    NP: "Nepál",
    NR: "Nauru",
    NU: "Niue",
    NZ: "Nový Zéland",
    OM: "Omán",
    PA: "Panama",
    PE: "Peru",
    PF: "Francúzska Polynézia",
    PG: "Papua Nová Guinea",
    PH: "Filipíny",
    PK: "Pakistan",
    PL: "Poľsko",
    PM: "Saint Pierre a Miquelon",
    PN: "Pitcairnove ostrovy",
    PR: "Portoriko",
    PS: "Palestínske územia",
    PT: "Portugalsko",
    PW: "Palau",
    PY: "Paraguaj",
    QA: "Katar",
    RE: "Réunion",
    RO: "Rumunsko",
    RS: "Srbsko",
    RU: "Rusko",
    RW: "Rwanda",
    SA: "Saudská Arábia",
    SB: "Šalamúnove ostrovy",
    SC: "Seychely",
    SD: "Sudán",
    SE: "Švédsko",
    SG: "Singapur",
    SH: "Svätá Helena",
    SI: "Slovinsko",
    SJ: "Svalbard a Jan Mayen",
    SK: "Slovensko",
    SL: "Sierra Leone",
    SM: "San Maríno",
    SN: "Senegal",
    SO: "Somálsko",
    SR: "Surinam",
    SS: "Južný Sudán",
    ST: "Svätý Tomáš a Princov ostrov",
    SV: "Salvádor",
    SX: "Svätý Martin (hol.)",
    SY: "Sýria",
    SZ: "Svazijsko",
    TC: "Turks a Caicos",
    TD: "Čad",
    TF: "Francúzske južné a antarktické územia",
    TG: "Togo",
    TH: "Thajsko",
    TJ: "Tadžikistan",
    TK: "Tokelau",
    TL: "Východný Timor",
    TM: "Turkménsko",
    TN: "Tunisko",
    TO: "Tonga",
    TR: "Turecko",
    TT: "Trinidad a Tobago",
    TV: "Tuvalu",
    TW: "Taiwan",
    TZ: "Tanzánia",
    UA: "Ukrajina",
    UG: "Uganda",
    UM: "Menšie odľahlé ostrovy USA",
    US: "Spojené štáty",
    UY: "Uruguaj",
    UZ: "Uzbekistan",
    VA: "Vatikán",
    VC: "Svätý Vincent a Grenadíny",
    VE: "Venezuela",
    VG: "Britské Panenské ostrovy",
    VI: "Americké Panenské ostrovy",
    VN: "Vietnam",
    VU: "Vanuatu",
    WF: "Wallis a Futuna",
    WS: "Samoa",
    XK: "Kosovo",
    YE: "Jemen",
    YT: "Mayotte",
    ZA: "Južná Afrika",
    ZM: "Zambia",
    ZW: "Zimbabwe"
  };
  var sk = {
    locale: locale$C,
    countries: countries$C
  };

  var sk$1 = /*#__PURE__*/Object.freeze({
    locale: locale$C,
    countries: countries$C,
    default: sk
  });

  var locale$D = "sl";
  var countries$D = {
    AD: "Andora",
    AE: "Združeni arabski emirati",
    AF: "Afganistan",
    AG: "Antigva in Barbuda",
    AI: "Angvila",
    AL: "Albanija",
    AM: "Armenija",
    AO: "Angola",
    AQ: "Antarktika",
    AR: "Argentina",
    AS: "Ameriška Samoa",
    AT: "Avstrija",
    AU: "Avstralija",
    AW: "Aruba",
    AX: "Ålandski otoki",
    AZ: "Azerbajdžan",
    BA: "Bosna in Hercegovina",
    BB: "Barbados",
    BD: "Bangladeš",
    BE: "Belgija",
    BF: "Burkina Faso",
    BG: "Bolgarija",
    BH: "Bahrajn",
    BI: "Burundi",
    BJ: "Benin",
    BL: "Saint Barthélemy",
    BM: "Bermudi",
    BN: "Brunej",
    BO: "Bolivija",
    BQ: "Nizozemski Karibi",
    BR: "Brazilija",
    BS: "Bahami",
    BT: "Butan",
    BV: "Bouvetov otok",
    BW: "Bocvana",
    BY: "Belorusija",
    BZ: "Belize",
    CA: "Kanada",
    CC: "Kokosovi otoki",
    CD: "Demokratična republika Kongo",
    CF: "Centralnoafriška republika",
    CG: "Kongo - Brazzaville",
    CH: "Švica",
    CI: "Slonokoščena obala",
    CK: "Cookovi otoki",
    CL: "Čile",
    CM: "Kamerun",
    CN: "Kitajska",
    CO: "Kolumbija",
    CR: "Kostarika",
    CU: "Kuba",
    CV: "Zelenortski otoki",
    CW: "Curaçao",
    CX: "Božični otok",
    CY: "Ciper",
    CZ: "Češka",
    DE: "Nemčija",
    DJ: "Džibuti",
    DK: "Danska",
    DM: "Dominika",
    DO: "Dominikanska republika",
    DZ: "Alžirija",
    EC: "Ekvador",
    EE: "Estonija",
    EG: "Egipt",
    EH: "Zahodna Sahara",
    ER: "Eritreja",
    ES: "Španija",
    ET: "Etiopija",
    FI: "Finska",
    FJ: "Fidži",
    FK: "Falklandski otoki",
    FM: "Mikronezija",
    FO: "Ferski otoki",
    FR: "Francija",
    GA: "Gabon",
    GB: "Združeno kraljestvo",
    GD: "Grenada",
    GE: "Gruzija",
    GF: "Francoska Gvajana",
    GG: "Guernsey",
    GH: "Gana",
    GI: "Gibraltar",
    GL: "Grenlandija",
    GM: "Gambija",
    GN: "Gvineja",
    GP: "Gvadalupe",
    GQ: "Ekvatorialna Gvineja",
    GR: "Grčija",
    GS: "Južna Georgia in Južni Sandwichevi otoki",
    GT: "Gvatemala",
    GU: "Guam",
    GW: "Gvineja Bissau",
    GY: "Gvajana",
    HK: "Hongkong",
    HM: "Heardov otok in McDonaldovi otoki",
    HN: "Honduras",
    HR: "Hrvaška",
    HT: "Haiti",
    HU: "Madžarska",
    ID: "Indonezija",
    IE: "Irska",
    IL: "Izrael",
    IM: "Otok Man",
    IN: "Indija",
    IO: "Britansko ozemlje v Indijskem oceanu",
    IQ: "Irak",
    IR: "Iran",
    IS: "Islandija",
    IT: "Italija",
    JE: "Jersey",
    JM: "Jamajka",
    JO: "Jordanija",
    JP: "Japonska",
    KE: "Kenija",
    KG: "Kirgizistan",
    KH: "Kambodža",
    KI: "Kiribati",
    KM: "Komori",
    KN: "Saint Kitts in Nevis",
    KP: "Severna Koreja",
    KR: "Južna Koreja",
    KW: "Kuvajt",
    KY: "Kajmanski otoki",
    KZ: "Kazahstan",
    LA: "Laos",
    LB: "Libanon",
    LC: "Saint Lucia",
    LI: "Lihtenštajn",
    LK: "Šrilanka",
    LR: "Liberija",
    LS: "Lesoto",
    LT: "Litva",
    LU: "Luksemburg",
    LV: "Latvija",
    LY: "Libija",
    MA: "Maroko",
    MC: "Monako",
    MD: "Moldavija",
    ME: "Črna gora",
    MF: "Saint Martin",
    MG: "Madagaskar",
    MH: "Marshallovi otoki",
    MK: "Makedonija",
    ML: "Mali",
    MM: "Mjanmar (Burma)",
    MN: "Mongolija",
    MO: "Macao",
    MP: "Severni Marianski otoki",
    MQ: "Martinik",
    MR: "Mavretanija",
    MS: "Montserrat",
    MT: "Malta",
    MU: "Mauritius",
    MV: "Maldivi",
    MW: "Malavi",
    MX: "Mehika",
    MY: "Malezija",
    MZ: "Mozambik",
    NA: "Namibija",
    NC: "Nova Kaledonija",
    NE: "Niger",
    NF: "Norfolški otok",
    NG: "Nigerija",
    NI: "Nikaragva",
    NL: "Nizozemska",
    NO: "Norveška",
    NP: "Nepal",
    NR: "Nauru",
    NU: "Niue",
    NZ: "Nova Zelandija",
    OM: "Oman",
    PA: "Panama",
    PE: "Peru",
    PF: "Francoska Polinezija",
    PG: "Papua Nova Gvineja",
    PH: "Filipini",
    PK: "Pakistan",
    PL: "Poljska",
    PM: "Saint Pierre in Miquelon",
    PN: "Pitcairn",
    PR: "Portoriko",
    PS: "Palestinsko ozemlje",
    PT: "Portugalska",
    PW: "Palau",
    PY: "Paragvaj",
    QA: "Katar",
    RE: "Reunion",
    RO: "Romunija",
    RS: "Srbija",
    RU: "Rusija",
    RW: "Ruanda",
    SA: "Saudova Arabija",
    SB: "Salomonovi otoki",
    SC: "Sejšeli",
    SD: "Sudan",
    SE: "Švedska",
    SG: "Singapur",
    SH: "Sveta Helena",
    SI: "Slovenija",
    SJ: "Svalbard in Jan Mayen",
    SK: "Slovaška",
    SL: "Sierra Leone",
    SM: "San Marino",
    SN: "Senegal",
    SO: "Somalija",
    SR: "Surinam",
    SS: "Južni Sudan",
    ST: "Sao Tome in Principe",
    SV: "Salvador",
    SX: "Sint Maarten",
    SY: "Sirija",
    SZ: "Svazi",
    TC: "Otoki Turks in Caicos",
    TD: "Čad",
    TF: "Francosko južno ozemlje",
    TG: "Togo",
    TH: "Tajska",
    TJ: "Tadžikistan",
    TK: "Tokelau",
    TL: "Timor-Leste",
    TM: "Turkmenistan",
    TN: "Tunizija",
    TO: "Tonga",
    TR: "Turčija",
    TT: "Trinidad in Tobago",
    TV: "Tuvalu",
    TW: "Tajvan",
    TZ: "Tanzanija",
    UA: "Ukrajina",
    UG: "Uganda",
    UM: "Stranski zunanji otoki Združenih držav",
    US: "Združene države Amerike",
    UY: "Urugvaj",
    UZ: "Uzbekistan",
    VA: "Vatikan",
    VC: "Saint Vincent in Grenadine",
    VE: "Venezuela",
    VG: "Britanski Deviški otoki",
    VI: "Ameriški Deviški otoki",
    VN: "Vietnam",
    VU: "Vanuatu",
    WF: "Wallis in Futuna",
    WS: "Samoa",
    XK: "Kosovo",
    YE: "Jemen",
    YT: "Mayotte",
    ZA: "Južnoafriška republika",
    ZM: "Zambija",
    ZW: "Zimbabve"
  };
  var sl = {
    locale: locale$D,
    countries: countries$D
  };

  var sl$1 = /*#__PURE__*/Object.freeze({
    locale: locale$D,
    countries: countries$D,
    default: sl
  });

  var locale$E = "sr";
  var countries$E = {
    AD: "Андора",
    AE: "Уједињени Арапски Емирати",
    AF: "Авганистан",
    AG: "Антигва и Барбуда",
    AI: "Ангвила",
    AL: "Албанија",
    AM: "Јерменија",
    AO: "Ангола",
    AQ: "Антарктик",
    AR: "Аргентина",
    AS: "Америчка Самоа",
    AT: "Аустрија",
    AU: "Аустралија",
    AW: "Аруба",
    AX: "Оландска Острва",
    AZ: "Азербејџан",
    BA: "Босна и Херцеговина",
    BB: "Барбадос",
    BD: "Бангладеш",
    BE: "Белгија",
    BF: "Буркина Фасо",
    BG: "Бугарска",
    BH: "Бахреин",
    BI: "Бурунди",
    BJ: "Бенин",
    BL: "Сен Бартелеми",
    BM: "Бермуда",
    BN: "Брунеј",
    BO: "Боливија",
    BQ: "Карипска Холандија",
    BR: "Бразил",
    BS: "Бахами",
    BT: "Бутан",
    BV: "Острво Буве",
    BW: "Боцвана",
    BY: "Белорусија",
    BZ: "Белизе",
    CA: "Канада",
    CC: "Кокосова (Килингова) Острва",
    CD: "Конго - Киншаса",
    CF: "Централноафричка Република",
    CG: "Конго - Бразавил",
    CH: "Швајцарска",
    CI: "Обала Слоноваче",
    CK: "Кукова Острва",
    CL: "Чиле",
    CM: "Камерун",
    CN: "Кина",
    CO: "Колумбија",
    CR: "Костарика",
    CU: "Куба",
    CV: "Зеленортска Острва",
    CW: "Курасао",
    CX: "Божићно Острво",
    CY: "Кипар",
    CZ: "Чешка",
    DE: "Немачка",
    DJ: "Џибути",
    DK: "Данска",
    DM: "Доминика",
    DO: "Доминиканска Република",
    DZ: "Алжир",
    EC: "Еквадор",
    EE: "Естонија",
    EG: "Египат",
    EH: "Западна Сахара",
    ER: "Еритреја",
    ES: "Шпанија",
    ET: "Етиопија",
    FI: "Финска",
    FJ: "Фиџи",
    FK: "Фокландска Острва",
    FM: "Микронезија",
    FO: "Фарска Острва",
    FR: "Француска",
    GA: "Габон",
    GB: "Уједињено Краљевство",
    GD: "Гренада",
    GE: "Грузија",
    GF: "Француска Гвајана",
    GG: "Гернзи",
    GH: "Гана",
    GI: "Гибралтар",
    GL: "Гренланд",
    GM: "Гамбија",
    GN: "Гвинеја",
    GP: "Гваделуп",
    GQ: "Екваторијална Гвинеја",
    GR: "Грчка",
    GS: "Јужна Џорџија и Јужна Сендвичка Острва",
    GT: "Гватемала",
    GU: "Гуам",
    GW: "Гвинеја-Бисао",
    GY: "Гвајана",
    HK: "САР Хонгконг (Кина)",
    HM: "Острво Херд и Мекдоналдова острва",
    HN: "Хондурас",
    HR: "Хрватска",
    HT: "Хаити",
    HU: "Мађарска",
    ID: "Индонезија",
    IE: "Ирска",
    IL: "Израел",
    IM: "Острво Ман",
    IN: "Индија",
    IO: "Британска територија Индијског океана",
    IQ: "Ирак",
    IR: "Иран",
    IS: "Исланд",
    IT: "Италија",
    JE: "Џерзи",
    JM: "Јамајка",
    JO: "Јордан",
    JP: "Јапан",
    KE: "Кенија",
    KG: "Киргистан",
    KH: "Камбоџа",
    KI: "Кирибати",
    KM: "Коморска Острва",
    KN: "Сент Китс и Невис",
    KP: "Северна Кореја",
    KR: "Јужна Кореја",
    KW: "Кувајт",
    KY: "Кајманска Острва",
    KZ: "Казахстан",
    LA: "Лаос",
    LB: "Либан",
    LC: "Света Луција",
    LI: "Лихтенштајн",
    LK: "Шри Ланка",
    LR: "Либерија",
    LS: "Лесото",
    LT: "Литванија",
    LU: "Луксембург",
    LV: "Летонија",
    LY: "Либија",
    MA: "Мароко",
    MC: "Монако",
    MD: "Молдавија",
    ME: "Црна Гора",
    MF: "Свети Мартин (Француска)",
    MG: "Мадагаскар",
    MH: "Маршалска Острва",
    MK: "Македонија",
    ML: "Мали",
    MM: "Мијанмар (Бурма)",
    MN: "Монголија",
    MO: "САР Макао (Кина)",
    MP: "Северна Маријанска Острва",
    MQ: "Мартиник",
    MR: "Мауританија",
    MS: "Монсерат",
    MT: "Малта",
    MU: "Маурицијус",
    MV: "Малдиви",
    MW: "Малави",
    MX: "Мексико",
    MY: "Малезија",
    MZ: "Мозамбик",
    NA: "Намибија",
    NC: "Нова Каледонија",
    NE: "Нигер",
    NF: "Острво Норфок",
    NG: "Нигерија",
    NI: "Никарагва",
    NL: "Холандија",
    NO: "Норвешка",
    NP: "Непал",
    NR: "Науру",
    NU: "Ниуе",
    NZ: "Нови Зеланд",
    OM: "Оман",
    PA: "Панама",
    PE: "Перу",
    PF: "Француска Полинезија",
    PG: "Папуа Нова Гвинеја",
    PH: "Филипини",
    PK: "Пакистан",
    PL: "Пољска",
    PM: "Сен Пјер и Микелон",
    PN: "Питкерн",
    PR: "Порторико",
    PS: "Палестинске територије",
    PT: "Португалија",
    PW: "Палау",
    PY: "Парагвај",
    QA: "Катар",
    RE: "Реинион",
    RO: "Румунија",
    RS: "Србија",
    RU: "Русија",
    RW: "Руанда",
    SA: "Саудијска Арабија",
    SB: "Соломонска Острва",
    SC: "Сејшели",
    SD: "Судан",
    SE: "Шведска",
    SG: "Сингапур",
    SH: "Света Јелена",
    SI: "Словенија",
    SJ: "Свалбард и Јан Мајен",
    SK: "Словачка",
    SL: "Сијера Леоне",
    SM: "Сан Марино",
    SN: "Сенегал",
    SO: "Сомалија",
    SR: "Суринам",
    SS: "Јужни Судан",
    ST: "Сао Томе и Принципе",
    SV: "Салвадор",
    SX: "Свети Мартин (Холандија)",
    SY: "Сирија",
    SZ: "Свазиленд",
    TC: "Острва Туркс и Каикос",
    TD: "Чад",
    TF: "Француске Јужне Територије",
    TG: "Того",
    TH: "Тајланд",
    TJ: "Таџикистан",
    TK: "Токелау",
    TL: "Источни Тимор",
    TM: "Туркменистан",
    TN: "Тунис",
    TO: "Тонга",
    TR: "Турска",
    TT: "Тринидад и Тобаго",
    TV: "Тувалу",
    TW: "Тајван",
    TZ: "Танзанија",
    UA: "Украјина",
    UG: "Уганда",
    UM: "Удаљена острва САД",
    US: "Сједињене Државе",
    UY: "Уругвај",
    UZ: "Узбекистан",
    VA: "Ватикан",
    VC: "Сент Винсент и Гренадини",
    VE: "Венецуела",
    VG: "Британска Девичанска Острва",
    VI: "Америчка Девичанска Острва",
    VN: "Вијетнам",
    VU: "Вануату",
    WF: "Валис и Футуна",
    WS: "Самоа",
    XK: "Косово",
    YE: "Јемен",
    YT: "Мајот",
    ZA: "Јужноафричка Република",
    ZM: "Замбија",
    ZW: "Зимбабве"
  };
  var sr = {
    locale: locale$E,
    countries: countries$E
  };

  var sr$1 = /*#__PURE__*/Object.freeze({
    locale: locale$E,
    countries: countries$E,
    default: sr
  });

  var locale$F = "sv";
  var countries$F = {
    AD: "Andorra",
    AE: "Förenade Arabemiraten",
    AF: "Afghanistan",
    AG: "Antigua och Barbuda",
    AI: "Anguilla",
    AL: "Albanien",
    AM: "Armenien",
    AO: "Angola",
    AQ: "Antarktis",
    AR: "Argentina",
    AS: "Amerikanska Samoa",
    AT: "Österrike",
    AU: "Australien",
    AW: "Aruba",
    AX: "Åland",
    AZ: "Azerbajdzjan",
    BA: "Bosnien och Hercegovina",
    BB: "Barbados",
    BD: "Bangladesh",
    BE: "Belgien",
    BF: "Burkina Faso",
    BG: "Bulgarien",
    BH: "Bahrain",
    BI: "Burundi",
    BJ: "Benin",
    BL: "Saint-Barthélemy",
    BM: "Bermuda",
    BN: "Brunei",
    BO: "Bolivia",
    BQ: "Bonaire, Saint Eustatius och Saba",
    BR: "Brasilien",
    BS: "Bahamas",
    BT: "Bhutan",
    BV: "Bouvetön",
    BW: "Botswana",
    BY: "Vitryssland",
    BZ: "Belize",
    CA: "Kanada",
    CC: "Kokosöarna",
    CD: "Demokratiska republiken Kongo",
    CF: "Centralafrikanska republiken",
    CG: "Kongo-Brazzaville",
    CH: "Schweiz",
    CI: "Elfenbenskusten",
    CK: "Cooköarna",
    CL: "Chile",
    CM: "Kamerun",
    CN: "Kina",
    CO: "Colombia",
    CR: "Costa Rica",
    CU: "Kuba",
    CV: "Kap Verde",
    CW: "Curacao",
    CX: "Julön",
    CY: "Cypern",
    CZ: "Tjeckien",
    DE: "Tyskland",
    DJ: "Djibouti",
    DK: "Danmark",
    DM: "Dominica",
    DO: "Dominikanska republiken",
    DZ: "Algeriet",
    EC: "Ecuador",
    EE: "Estland",
    EG: "Egypten",
    EH: "Västsahara",
    ER: "Eritrea",
    ES: "Spanien",
    ET: "Etiopien",
    FI: "Finland",
    FJ: "Fiji",
    FK: "Falklandsöarna",
    FM: "Mikronesiska federationen",
    FO: "Färöarna",
    FR: "Frankrike",
    GA: "Gabon",
    GB: "Storbritannien",
    GD: "Grenada",
    GE: "Georgien",
    GF: "Franska Guyana",
    GG: "Guernsey",
    GH: "Ghana",
    GI: "Gibraltar",
    GL: "Grönland",
    GM: "Gambia",
    GN: "Guinea",
    GP: "Guadeloupe",
    GQ: "Ekvatorialguinea",
    GR: "Grekland",
    GS: "Sydgeorgien och Sydsandwichöarna",
    GT: "Guatemala",
    GU: "Guam",
    GW: "Guinea Bissau",
    GY: "Guyana",
    HK: "Hongkong",
    HM: "Heard- och McDonaldsöarna",
    HN: "Honduras",
    HR: "Kroatien",
    HT: "Haiti",
    HU: "Ungern",
    ID: "Indonesien",
    IE: "Irland",
    IL: "Israel",
    IM: "Isle of Man",
    IN: "Indien",
    IO: "Brittiska territoriet i Indiska Oceanen",
    IQ: "Irak",
    IR: "Iran",
    IS: "Island",
    IT: "Italien",
    JE: "Jersey",
    JM: "Jamaica",
    JO: "Jordanien",
    JP: "Japan",
    KE: "Kenya",
    KG: "Kirgizistan",
    KH: "Kambodja",
    KI: "Kiribati",
    KM: "Komorerna",
    KN: "Saint Kitts och Nevis",
    KP: "Nordkorea",
    KR: "Sydkorea",
    KW: "Kuwait",
    KY: "Caymanöarna",
    KZ: "Kazakstan",
    LA: "Laos",
    LB: "Libanon",
    LC: "Saint Lucia",
    LI: "Liechtenstein",
    LK: "Sri Lanka",
    LR: "Liberia",
    LS: "Lesotho",
    LT: "Litauen",
    LU: "Luxemburg",
    LV: "Lettland",
    LY: "Libyen",
    MA: "Marocko",
    MC: "Monaco",
    MD: "Moldavien",
    ME: "Montenegro",
    MF: "Saint Martin (franska delen)",
    MG: "Madagaskar",
    MH: "Marshallöarna",
    MK: "Makedonien",
    ML: "Mali",
    MM: "Burma",
    MN: "Mongoliet",
    MO: "Macau",
    MP: "Nordmarianerna",
    MQ: "Martinique",
    MR: "Mauretanien",
    MS: "Montserrat",
    MT: "Malta",
    MU: "Mauritius",
    MV: "Maldiverna",
    MW: "Malawi",
    MX: "Mexiko",
    MY: "Malaysia",
    MZ: "Moçambique",
    NA: "Namibia",
    NC: "Nya Kaledonien",
    NE: "Niger",
    NF: "Norfolkön",
    NG: "Nigeria",
    NI: "Nicaragua",
    NL: "Nederländerna",
    NO: "Norge",
    NP: "Nepal",
    NR: "Nauru",
    NU: "Niue",
    NZ: "Nya Zeeland",
    OM: "Oman",
    PA: "Panama",
    PE: "Peru",
    PF: "Franska Polynesien",
    PG: "Papua Nya Guinea",
    PH: "Filippinerna",
    PK: "Pakistan",
    PL: "Polen",
    PM: "Saint-Pierre och Miquelon",
    PN: "Pitcairnöarna",
    PR: "Puerto Rico",
    PS: "Palestinska territoriet, ockuperade",
    PT: "Portugal",
    PW: "Palau",
    PY: "Paraguay",
    QA: "Qatar",
    RE: "Réunion",
    RO: "Rumänien",
    RS: "Serbien",
    RU: "Ryssland",
    RW: "Rwanda",
    SA: "Saudiarabien",
    SB: "Salomonöarna",
    SC: "Seychellerna",
    SD: "Sudan",
    SE: "Sverige",
    SG: "Singapore",
    SH: "Sankta Helena",
    SI: "Slovenien",
    SJ: "Svalbard och Jan Mayen",
    SK: "Slovakien",
    SL: "Sierra Leone",
    SM: "San Marino",
    SN: "Senegal",
    SO: "Somalia",
    SR: "Surinam",
    SS: "Sydsudan",
    ST: "São Tomé och Príncipe",
    SV: "El Salvador",
    SX: "Sint Maarten (nederländska delen)",
    SY: "Syrien",
    SZ: "Swaziland",
    TC: "Turks- och Caicosöarna",
    TD: "Tchad",
    TF: "Franska södra territorierna",
    TG: "Togo",
    TH: "Thailand",
    TJ: "Tadzjikistan",
    TK: "Tokelauöarna",
    TL: "Östtimor",
    TM: "Turkmenistan",
    TN: "Tunisien",
    TO: "Tonga",
    TR: "Turkiet",
    TT: "Trinidad och Tobago",
    TV: "Tuvalu",
    TW: "Taiwan",
    TZ: "Tanzania",
    UA: "Ukraina",
    UG: "Uganda",
    UM: "USA:s yttre öar",
    US: "USA",
    UY: "Uruguay",
    UZ: "Uzbekistan",
    VA: "Vatikanstaten",
    VC: "Saint Vincent och Grenadinerna",
    VE: "Venezuela",
    VG: "Brittiska Jungfruöarna",
    VI: "Amerikanska Jungfruöarna",
    VN: "Vietnam",
    VU: "Vanuatu",
    WF: "Wallis- och Futunaöarna",
    WS: "Samoa",
    YE: "Jemen",
    YT: "Mayotte",
    ZA: "Sydafrika",
    ZM: "Zambia",
    ZW: "Zimbabwe",
    XK: "Kosovo"
  };
  var sv = {
    locale: locale$F,
    countries: countries$F
  };

  var sv$1 = /*#__PURE__*/Object.freeze({
    locale: locale$F,
    countries: countries$F,
    default: sv
  });

  var locale$G = "tr";
  var countries$G = {
    AD: "Andorra",
    AE: "Birleşik Arap Emirlikleri",
    AF: "Afganistan",
    AG: "Antigua ve Barbuda",
    AI: "Anguilla",
    AL: "Arnavutluk",
    AM: "Ermenistan",
    AO: "Angola",
    AQ: "Antarktika",
    AR: "Arjantin",
    AS: "Amerikan Samoası",
    AT: "Avusturya",
    AU: "Avustralya",
    AW: "Aruba",
    AX: "Åland Adaları",
    AZ: "Azerbaycan",
    BA: "Bosna Hersek",
    BB: "Barbados",
    BD: "Bangladeş",
    BE: "Belçika",
    BF: "Burkina Faso",
    BG: "Bulgaristan",
    BH: "Bahreyn",
    BI: "Burundi",
    BJ: "Benin",
    BL: "Saint Barthelemy",
    BM: "Bermuda",
    BN: "Brunei",
    BO: "Bolivya",
    BQ: "Karayip Hollanda",
    BR: "Brezilya",
    BS: "Bahamalar",
    BT: "Butan",
    BV: "Bouvet Adası",
    BW: "Botsvana",
    BY: "Beyaz Rusya",
    BZ: "Belize",
    CA: "Kanada",
    CC: "Cocos (Keeling) Adaları",
    CD: "Kongo - Kinşasa",
    CF: "Orta Afrika Cumhuriyeti",
    CG: "Kongo - Brazavil",
    CH: "İsviçre",
    CI: "Fildişi Sahili",
    CK: "Cook Adaları",
    CL: "Şili",
    CM: "Kamerun",
    CN: "Çin",
    CO: "Kolombiya",
    CR: "Kosta Rika",
    CU: "Küba",
    CV: "Cape Verde",
    CW: "Curaçao",
    CX: "Christmas Adası",
    CY: "Güney Kıbrıs Rum Kesimi",
    CZ: "Çek Cumhuriyeti",
    DE: "Almanya",
    DJ: "Cibuti",
    DK: "Danimarka",
    DM: "Dominika",
    DO: "Dominik Cumhuriyeti",
    DZ: "Cezayir",
    EC: "Ekvador",
    EE: "Estonya",
    EG: "Mısır",
    EH: "Batı Sahara",
    ER: "Eritre",
    ES: "İspanya",
    ET: "Etiyopya",
    FI: "Finlandiya",
    FJ: "Fiji",
    FK: "Falkland Adaları",
    FM: "Mikronezya",
    FO: "Faroe Adaları",
    FR: "Fransa",
    GA: "Gabon",
    GB: "Birleşik Krallık",
    GD: "Grenada",
    GE: "Gürcistan",
    GF: "Fransız Guyanası",
    GG: "Guernsey",
    GH: "Gana",
    GI: "Cebelitarık",
    GL: "Grönland",
    GM: "Gambiya",
    GN: "Gine",
    GP: "Guadalupe",
    GQ: "Ekvator Ginesi",
    GR: "Yunanistan",
    GS: "Güney Georgia ve Güney Sandwich Adaları",
    GT: "Guatemala",
    GU: "Guam",
    GW: "Gine-Bissau",
    GY: "Guyana",
    HK: "Çin Hong Kong ÖYB",
    HM: "Heard Adası ve McDonald Adaları",
    HN: "Honduras",
    HR: "Hırvatistan",
    HT: "Haiti",
    HU: "Macaristan",
    ID: "Endonezya",
    IE: "İrlanda",
    IL: "İsrail",
    IM: "Man Adası",
    IN: "Hindistan",
    IO: "Britanya Hint Okyanusu Toprakları",
    IQ: "Irak",
    IR: "İran",
    IS: "İzlanda",
    IT: "İtalya",
    JE: "Jersey",
    JM: "Jamaika",
    JO: "Ürdün",
    JP: "Japonya",
    KE: "Kenya",
    KG: "Kırgızistan",
    KH: "Kamboçya",
    KI: "Kiribati",
    KM: "Komorlar",
    KN: "Saint Kitts ve Nevis",
    KP: "Kuzey Kore",
    KR: "Güney Kore",
    KW: "Kuveyt",
    KY: "Cayman Adaları",
    KZ: "Kazakistan",
    LA: "Laos",
    LB: "Lübnan",
    LC: "Saint Lucia",
    LI: "Liechtenstein",
    LK: "Sri Lanka",
    LR: "Liberya",
    LS: "Lesoto",
    LT: "Litvanya",
    LU: "Lüksemburg",
    LV: "Letonya",
    LY: "Libya",
    MA: "Fas",
    MC: "Monako",
    MD: "Moldova",
    ME: "Karadağ",
    MF: "Saint Martin",
    MG: "Madagaskar",
    MH: "Marshall Adaları",
    MK: "Makedonya",
    ML: "Mali",
    MM: "Myanmar (Burma)",
    MN: "Moğolistan",
    MO: "Çin Makao ÖYB",
    MP: "Kuzey Mariana Adaları",
    MQ: "Martinik",
    MR: "Moritanya",
    MS: "Montserrat",
    MT: "Malta",
    MU: "Mauritius",
    MV: "Maldivler",
    MW: "Malavi",
    MX: "Meksika",
    MY: "Malezya",
    MZ: "Mozambik",
    NA: "Namibya",
    NC: "Yeni Kaledonya",
    NE: "Nijer",
    NF: "Norfolk Adası",
    NG: "Nijerya",
    NI: "Nikaragua",
    NL: "Hollanda",
    NO: "Norveç",
    NP: "Nepal",
    NR: "Nauru",
    NU: "Niue",
    NZ: "Yeni Zelanda",
    OM: "Umman",
    PA: "Panama",
    PE: "Peru",
    PF: "Fransız Polinezyası",
    PG: "Papua Yeni Gine",
    PH: "Filipinler",
    PK: "Pakistan",
    PL: "Polonya",
    PM: "Saint Pierre ve Miquelon",
    PN: "Pitcairn Adaları",
    PR: "Porto Riko",
    PS: "Filistin Bölgeleri",
    PT: "Portekiz",
    PW: "Palau",
    PY: "Paraguay",
    QA: "Katar",
    RE: "Réunion",
    RO: "Romanya",
    RS: "Sırbistan",
    RU: "Rusya",
    RW: "Ruanda",
    SA: "Suudi Arabistan",
    SB: "Solomon Adaları",
    SC: "Seyşeller",
    SD: "Sudan",
    SE: "İsveç",
    SG: "Singapur",
    SH: "Saint Helena",
    SI: "Slovenya",
    SJ: "Svalbard ve Jan Mayen Adaları",
    SK: "Slovakya",
    SL: "Sierra Leone",
    SM: "San Marino",
    SN: "Senegal",
    SO: "Somali",
    SR: "Surinam",
    SS: "Güney Sudan",
    ST: "São Tomé ve Príncipe",
    SV: "El Salvador",
    SX: "Sint Maarten",
    SY: "Suriye",
    SZ: "Svaziland",
    TC: "Turks ve Caicos Adaları",
    TD: "Çad",
    TF: "Fransız Güney Toprakları",
    TG: "Togo",
    TH: "Tayland",
    TJ: "Tacikistan",
    TK: "Tokelau",
    TL: "Timor-Leste",
    TM: "Türkmenistan",
    TN: "Tunus",
    TO: "Tonga",
    TR: "Türkiye",
    TT: "Trinidad ve Tobago",
    TV: "Tuvalu",
    TW: "Tayvan",
    TZ: "Tanzanya",
    UA: "Ukrayna",
    UG: "Uganda",
    UM: "ABD Uzak Adaları",
    US: "ABD",
    UY: "Uruguay",
    UZ: "Özbekistan",
    VA: "Vatikan",
    VC: "Saint Vincent ve Grenadinler",
    VE: "Venezuela",
    VG: "Britanya Virjin Adaları",
    VI: "ABD Virjin Adaları",
    VN: "Vietnam",
    VU: "Vanuatu",
    WF: "Wallis ve Futuna Adaları",
    WS: "Samoa",
    YE: "Yemen",
    YT: "Mayotte",
    ZA: "Güney Afrika",
    ZM: "Zambiya",
    ZW: "Zimbabve",
    XK: "Kosova"
  };
  var tr = {
    locale: locale$G,
    countries: countries$G
  };

  var tr$1 = /*#__PURE__*/Object.freeze({
    locale: locale$G,
    countries: countries$G,
    default: tr
  });

  var locale$H = "uk";
  var countries$H = {
    AU: "Австралія",
    AT: "Австрія",
    AZ: "Азербайджан",
    AX: "Аландські острови",
    AL: "Албанія",
    DZ: "Алжир",
    AS: "Американське Самоа",
    AI: "Ангілья",
    AO: "Ангола",
    AD: "Андорра",
    AQ: "Антарктида",
    AG: "Антигуа і Барбуда",
    MO: "Аоминь",
    AR: "Аргентина",
    AM: "Арменія",
    AW: "Аруба",
    AF: "Афганістан",
    BS: "Багами",
    BD: "Бангладеш",
    BB: "Барбадос",
    BH: "Бахрейн",
    BZ: "Беліз",
    BE: "Бельгія",
    BJ: "Бенін",
    BM: "Бермуди",
    BY: "Білорусь",
    BG: "Болгарія",
    BO: "Болівія",
    BA: "Боснія і Герцеговина",
    BW: "Ботсвана",
    BR: "Бразилія",
    IO: "Британська Територія в Індійському Океані",
    VG: "Британські Віргінські Острови",
    BN: "Бруней Даруссалам",
    BF: "Буркіна-Фасо",
    BI: "Бурунді",
    BT: "Бутан",
    VU: "Вануату",
    VA: "Ватикан",
    GB: "Великобританія",
    VE: "Венесуела",
    VI: "Віргінські Острови (США)",
    WF: "Волліс і Футуна",
    VN: "В'єтнам",
    UM: "Зовнішні малі острови (США)",
    GA: "Габон",
    HT: "Гаїті",
    GY: "Гаяна",
    GM: "Гамбія",
    GH: "Гана",
    GP: "Гваделупа",
    GT: "Гватемала",
    GF: "Гвіана",
    GN: "Гвінея",
    GW: "Гвінея-Бісау",
    GG: "Гернсі",
    GI: "Гібралтар",
    HN: "Гондурас",
    HK: "Гонконг",
    GD: "Гренада",
    GR: "Греція",
    GE: "Грузія",
    GU: "Гуам",
    GL: "Ґренландія",
    DK: "Данія",
    JE: "Джерсі",
    DJ: "Джибуті",
    DM: "Домініка",
    DO: "Домініканська Республіка",
    CD: "Демократична Республіка Конго",
    EC: "Еквадор",
    GQ: "Екваторіальна Гвінея",
    ER: "Еритрея",
    EE: "Естонія",
    ET: "Ефіопія",
    EG: "Єгипет",
    YE: "Ємен",
    ZM: "Замбія",
    ZW: "Зімбабве",
    IL: "Ізраїль",
    IN: "Індія",
    ID: "Індонезія",
    IQ: "Ірак",
    IR: "Іран",
    IE: "Ірландія",
    IS: "Ісландія",
    ES: "Іспанія",
    IT: "Італія",
    JO: "Йорданія",
    CV: "Кабо-Верде",
    KZ: "Казахстан",
    KY: "Кайманові Острови",
    KH: "Камбоджа",
    CM: "Камерун",
    CA: "Канада",
    BQ: "Карибські Нідерланди",
    QA: "Катар",
    KE: "Кенія",
    CY: "Кіпр",
    KI: "Кірибаті",
    KG: "Киргизстан",
    TW: "Республіка Китай",
    KP: "КНДР (Корейська Народно-Демократична Республіка)",
    CN: "КНР (Китайська Народна Республіка)",
    CC: "Кокосові острови",
    CO: "Колумбія",
    KM: "Коморські Острови",
    XK: "Косово",
    CR: "Коста-Рика",
    CI: "Кот-д'Івуар",
    CU: "Куба",
    KW: "Кувейт",
    CW: "Кюрасао",
    LA: "Лаос",
    LV: "Латвія",
    LS: "Лесото",
    LR: "Ліберія",
    LB: "Ліван",
    LY: "Лівія",
    LT: "Литва",
    LI: "Ліхтенштейн",
    LU: "Люксембург",
    MU: "Маврикій",
    MR: "Мавританія",
    MG: "Мадагаскар",
    YT: "Майотта",
    MK: "Македонія",
    MW: "Малаві",
    MY: "Малайзія",
    ML: "Малі",
    MV: "Мальдівы",
    MT: "Мальта",
    MA: "Марокко",
    MQ: "Мартиніка",
    MH: "Маршаллові Острови",
    MX: "Мексика",
    FM: "Мікронезія",
    MZ: "Мозамбік",
    MD: "Молдова",
    MC: "Монако",
    MN: "Монголія",
    MS: "Монтсеррат",
    MM: "М'янма",
    NA: "Намібія",
    NR: "Науру",
    NP: "Непал",
    NE: "Нігер",
    NG: "Нігерія",
    NL: "Нідерланди",
    NI: "Нікарагуа",
    DE: "Німеччина",
    NU: "Ніуе",
    NZ: "Нова Зеландія",
    NC: "Нова Каледонія",
    NO: "Норвегія",
    AE: "Об'єднані Арабські Емірати",
    OM: "Оман",
    BV: "Острів Буве",
    HM: "Острів Герд і острови Макдональд",
    IM: "Острів Мен",
    NF: "Острів Норфолк",
    CX: "Острів Різдва",
    CK: "Острови Кука",
    SH: "Острови Святої Єлени, Вознесіння і Тристан-да-Кунья",
    TC: "Острови Теркс і Кайкос",
    PK: "Пакистан",
    PW: "Палау",
    PS: "Палестинська держава",
    PA: "Панама",
    PG: "Папуа Нова Гвінея",
    ZA: "ПАР",
    PY: "Парагвай",
    PE: "Перу",
    GS: "Південна Джорджія та Південні Сандвічеві Острови",
    KR: "Південна Корея",
    SS: "Південний Судан",
    MP: "Північні Маріанські Острови",
    PN: "Піткерн",
    PL: "Польша",
    PT: "Португалія",
    PR: "Пуерто-Ріко",
    CG: "Республіка Конго",
    RE: "Реюньйон",
    RU: "Росія",
    RW: "Руанда",
    RO: "Румунія",
    EH: "САДР",
    SV: "Сальвадор",
    WS: "Самоа",
    SM: "Сан-Маріно",
    ST: "Сан-Томе і Принсіпі",
    SA: "Саудівська Аравія",
    SZ: "Свазіленд",
    SJ: "Свальбард і Ян-Маєн",
    SC: "Сейшельські Острови",
    BL: "Сен-Бартельмі",
    MF: "Сен-Мартен",
    PM: "Сен-П'єр і Мікелон",
    SN: "Сенегал",
    VC: "Сент-Вінсент і Гренадини",
    KN: "Сент-Кіттс і Невіс",
    LC: "Сент-Люсія",
    RS: "Сербія",
    SG: "Сінгапур",
    SX: "Сінт-Мартен",
    SY: "Сірія",
    SK: "Словаччина",
    SI: "Словенія",
    SB: "Соломонові Острови",
    SO: "Сомалі",
    SD: "Судан",
    SR: "Суринам",
    TL: "Східний Тимор",
    US: "США",
    SL: "Сьєрра-Леоне",
    TJ: "Таджикистан",
    TH: "Таїланд",
    TZ: "Танзанія",
    TG: "Того",
    TK: "Токелау",
    TO: "Тонга",
    TT: "Тринідад і Тобаго",
    TV: "Тувалу",
    TN: "Туніс",
    TM: "Туркменістан",
    TR: "Турція",
    UG: "Уганда",
    HU: "Угорщина",
    UZ: "Узбекистан",
    UA: "Україна",
    UY: "Уругвай",
    FO: "Фарерські острови",
    FJ: "Фіджі",
    PH: "Філіппіни",
    FI: "Фінляндія",
    FK: "Фолклендські Острови",
    FR: "Франція",
    PF: "Французька Полінезія",
    TF: "Французькі Південні і Антарктичні Території",
    HR: "Хорватія",
    CF: "Центральноафриканська Республіка",
    TD: "Чад",
    ME: "Чорногорія",
    CZ: "Чехія",
    CL: "Чілі",
    CH: "Швейцарія",
    SE: "Швеція",
    LK: "Шрі-Ланка",
    JM: "Ямайка",
    JP: "Японія"
  };
  var uk = {
    locale: locale$H,
    countries: countries$H
  };

  var uk$1 = /*#__PURE__*/Object.freeze({
    locale: locale$H,
    countries: countries$H,
    default: uk
  });

  var locale$I = "uz";
  var countries$I = {
    AD: "Andorra",
    AE: "Birlashgan Arab Amirliklari",
    AF: "Afgʻoniston",
    AG: "Antigua va Barbuda",
    AI: "Angilya",
    AL: "Albaniya",
    AM: "Armaniston",
    AO: "Angola",
    AQ: "Antarktida",
    AR: "Argentina",
    AS: "Amerika Samoasi",
    AT: "Avstriya",
    AU: "Avstraliya",
    AW: "Aruba",
    AX: "Aland orollari",
    AZ: "Ozarbayjon",
    BA: "Bosniya va Gertsegovina",
    BB: "Barbados",
    BD: "Bangladesh",
    BE: "Belgiya",
    BF: "Burkina-Faso",
    BG: "Bolgariya",
    BH: "Bahrayn",
    BI: "Burundi",
    BJ: "Benin",
    BL: "Sen-Bartelemi",
    BM: "Bermuda orollari",
    BN: "Bruney",
    BO: "Boliviya",
    BQ: "Boneyr, Sint-Estatius va Saba",
    BR: "Braziliya",
    BS: "Bagama orollari",
    BT: "Butan",
    BV: "Buve oroli",
    BW: "Botsvana",
    BY: "Belarus",
    BZ: "Beliz",
    CA: "Kanada",
    CC: "Kokos (Kiling) orollari",
    CD: "Kongo – Kinshasa",
    CF: "Markaziy Afrika Respublikasi",
    CG: "Kongo – Brazzavil",
    CH: "Shveytsariya",
    CI: "Kot-d’Ivuar",
    CK: "Kuk orollari",
    CL: "Chili",
    CM: "Kamerun",
    CN: "Xitoy",
    CO: "Kolumbiya",
    CR: "Kosta-Rika",
    CU: "Kuba",
    CV: "Kabo-Verde",
    CW: "Kyurasao",
    CX: "Rojdestvo oroli",
    CY: "Kipr",
    CZ: "Chexiya",
    DE: "Germaniya",
    DJ: "Jibuti",
    DK: "Daniya",
    DM: "Dominika",
    DO: "Dominikan Respublikasi",
    DZ: "Jazoir",
    EC: "Ekvador",
    EE: "Estoniya",
    EG: "Misr",
    EH: "G‘arbiy Sahroi Kabir",
    ER: "Eritreya",
    ES: "Ispaniya",
    ET: "Efiopiya",
    FI: "Finlandiya",
    FJ: "Fiji",
    FK: "Folklend orollari",
    FM: "Mikroneziya",
    FO: "Farer orollari",
    FR: "Fransiya",
    GA: "Gabon",
    GB: "Buyuk Britaniya",
    GD: "Grenada",
    GE: "Gruziya",
    GF: "Fransuz Gvianasi",
    GG: "Gernsi",
    GH: "Gana",
    GI: "Gibraltar",
    GL: "Grenlandiya",
    GM: "Gambiya",
    GN: "Gvineya",
    GP: "Gvadelupe",
    GQ: "Ekvatorial Gvineya",
    GR: "Gretsiya",
    GS: "Janubiy Georgiya va Janubiy Sendvich orollari",
    GT: "Gvatemala",
    GU: "Guam",
    GW: "Gvineya-Bisau",
    GY: "Gayana",
    HK: "Gonkong (Xitoy MMH)",
    HM: "Xerd va Makdonald orollari",
    HN: "Gonduras",
    HR: "Xorvatiya",
    HT: "Gaiti",
    HU: "Vengriya",
    ID: "Indoneziya",
    IE: "Irlandiya",
    IL: "Isroil",
    IM: "Men oroli",
    IN: "Hindiston",
    IO: "Britaniyaning Hind okeanidagi hududi",
    IQ: "Iroq",
    IR: "Eron",
    IS: "Islandiya",
    IT: "Italiya",
    JE: "Jersi",
    JM: "Yamayka",
    JO: "Iordaniya",
    JP: "Yaponiya",
    KE: "Keniya",
    KG: "Qirgʻiziston",
    KH: "Kambodja",
    KI: "Kiribati",
    KM: "Komor orollari",
    KN: "Sent-Kits va Nevis",
    KP: "Shimoliy Koreya",
    KR: "Janubiy Koreya",
    KW: "Quvayt",
    KY: "Kayman orollari",
    KZ: "Qozogʻiston",
    LA: "Laos",
    LB: "Livan",
    LC: "Sent-Lyusiya",
    LI: "Lixtenshteyn",
    LK: "Shri-Lanka",
    LR: "Liberiya",
    LS: "Lesoto",
    LT: "Litva",
    LU: "Lyuksemburg",
    LV: "Latviya",
    LY: "Liviya",
    MA: "Marokash",
    MC: "Monako",
    MD: "Moldova",
    ME: "Chernogoriya",
    MF: "Sent-Martin",
    MG: "Madagaskar",
    MH: "Marshall orollari",
    MK: "Makedoniya",
    ML: "Mali",
    MM: "Myanma (Birma)",
    MN: "Mongoliya",
    MO: "Makao (Xitoy MMH)",
    MP: "Shimoliy Mariana orollari",
    MQ: "Martinika",
    MR: "Mavritaniya",
    MS: "Montserrat",
    MT: "Malta",
    MU: "Mavrikiy",
    MV: "Maldiv orollari",
    MW: "Malavi",
    MX: "Meksika",
    MY: "Malayziya",
    MZ: "Mozambik",
    NA: "Namibiya",
    NC: "Yangi Kaledoniya",
    NE: "Niger",
    NF: "Norfolk oroli",
    NG: "Nigeriya",
    NI: "Nikaragua",
    NL: "Niderlandiya",
    NO: "Norvegiya",
    NP: "Nepal",
    NR: "Nauru",
    NU: "Niue",
    NZ: "Yangi Zelandiya",
    OM: "Ummon",
    PA: "Panama",
    PE: "Peru",
    PF: "Fransuz Polineziyasi",
    PG: "Papua – Yangi Gvineya",
    PH: "Filippin",
    PK: "Pokiston",
    PL: "Polsha",
    PM: "Sen-Pyer va Mikelon",
    PN: "Pitkern orollari",
    PR: "Puerto-Riko",
    PS: "Falastin hududi",
    PT: "Portugaliya",
    PW: "Palau",
    PY: "Paragvay",
    QA: "Qatar",
    RE: "Reyunion",
    RO: "Ruminiya",
    RS: "Serbiya",
    RU: "Rossiya",
    RW: "Ruanda",
    SA: "Saudiya Arabistoni",
    SB: "Solomon orollari",
    SC: "Seyshel orollari",
    SD: "Sudan",
    SE: "Shvetsiya",
    SG: "Singapur",
    SH: "Muqaddas Yelena oroli",
    SI: "Sloveniya",
    SJ: "Svalbard va Yan-Mayen",
    SK: "Slovakiya",
    SL: "Syerra-Leone",
    SM: "San-Marino",
    SN: "Senegal",
    SO: "Somali",
    SR: "Surinam",
    SS: "Janubiy Sudan",
    ST: "San-Tome va Prinsipi",
    SV: "Salvador",
    SX: "Sint-Marten",
    SY: "Suriya",
    SZ: "Svazilend",
    TC: "Turks va Kaykos orollari",
    TD: "Chad",
    TF: "Fransuz Janubiy hududlari",
    TG: "Togo",
    TH: "Tailand",
    TJ: "Tojikiston",
    TK: "Tokelau",
    TL: "Timor-Leste",
    TM: "Turkmaniston",
    TN: "Tunis",
    TO: "Tonga",
    TR: "Turkiya",
    TT: "Trinidad va Tobago",
    TV: "Tuvalu",
    TW: "Tayvan",
    TZ: "Tanzaniya",
    UA: "Ukraina",
    UG: "Uganda",
    UM: "AQSH yondosh orollari",
    US: "Amerika Qo‘shma Shtatlari",
    UY: "Urugvay",
    UZ: "Oʻzbekiston",
    VA: "Vatikan",
    VC: "Sent-Vinsent va Grenadin",
    VE: "Venesuela",
    VG: "Britaniya Virgin orollari",
    VI: "AQSH Virgin orollari",
    VN: "Vyetnam",
    VU: "Vanuatu",
    WF: "Uollis va Futuna",
    WS: "Samoa",
    XK: "Kosovo",
    YE: "Yaman",
    YT: "Mayotta",
    ZA: "Janubiy Afrika Respublikasi",
    ZM: "Zambiya",
    ZW: "Zimbabve"
  };
  var uz = {
    locale: locale$I,
    countries: countries$I
  };

  var uz$1 = /*#__PURE__*/Object.freeze({
    locale: locale$I,
    countries: countries$I,
    default: uz
  });

  var locale$J = "zh";
  var countries$J = {
    AD: "安道尔",
    AE: "阿联酋",
    AF: "阿富汗",
    AG: "安地卡及巴布达",
    AI: "安圭拉",
    AL: "阿尔巴尼亚",
    AM: "亚美尼亚",
    AO: "安哥拉",
    AQ: "南极洲",
    AR: "阿根廷",
    AS: "美属萨摩亚",
    AT: "奥地利",
    AU: "澳大利亚",
    AW: "阿鲁巴",
    AX: "奥兰",
    AZ: "阿塞拜疆",
    BA: "波斯尼亚和黑塞哥维那",
    BB: "巴巴多斯",
    BD: "孟加拉国",
    BE: "比利时",
    BF: "布吉纳法索",
    BG: "保加利亚",
    BH: "巴林",
    BI: "布隆迪",
    BJ: "贝宁",
    BL: "圣巴泰勒米",
    BM: "百慕大",
    BN: "文莱",
    BO: "玻利维亚",
    BQ: "加勒比荷兰",
    BR: "巴西",
    BS: "巴哈马",
    BT: "不丹",
    BV: "布韦岛",
    BW: "博茨瓦纳",
    BY: "白俄罗斯",
    BZ: "伯利兹",
    CA: "加拿大",
    CC: "科科斯（基林）群岛",
    CD: "刚果（金)",
    CF: "中非",
    CG: "刚果（布)",
    CH: "瑞士",
    CI: "科特迪瓦",
    CK: "库克群岛",
    CL: "智利",
    CM: "喀麦隆",
    CN: "中国",
    CO: "哥伦比亚",
    CR: "哥斯达黎加",
    CU: "古巴",
    CV: "佛得角",
    CW: "库拉索",
    CX: "圣诞岛",
    CY: "赛普勒斯",
    CZ: "捷克",
    DE: "德国",
    DJ: "吉布提",
    DK: "丹麦",
    DM: "多米尼克",
    DO: "多米尼加",
    DZ: "阿尔及利亚",
    EC: "厄瓜多尔",
    EE: "爱沙尼亚",
    EG: "埃及",
    EH: "阿拉伯撒哈拉民主共和国",
    ER: "厄立特里亚",
    ES: "西班牙",
    ET: "衣索比亚",
    FI: "芬兰",
    FJ: "斐济",
    FK: "福克兰群岛",
    FM: "密克罗尼西亚联邦",
    FO: "法罗群岛",
    FR: "法国",
    GA: "加彭",
    GB: "英国",
    GD: "格瑞那达",
    GE: "格鲁吉亚",
    GF: "法属圭亚那",
    GG: "根西",
    GH: "加纳",
    GI: "直布罗陀",
    GL: "格陵兰",
    GM: "冈比亚",
    GN: "几内亚",
    GP: "瓜德罗普",
    GQ: "赤道几内亚",
    GR: "希腊",
    GS: "南乔治亚和南桑威奇群岛",
    GT: "危地马拉",
    GU: "关岛",
    GW: "几内亚比绍",
    GY: "圭亚那",
    HK: "香港",
    HM: "赫德岛和麦克唐纳群岛",
    HN: "宏都拉斯",
    HR: "克罗地亚",
    HT: "海地",
    HU: "匈牙利",
    ID: "印尼",
    IE: "爱尔兰",
    IL: "以色列",
    IM: "马恩岛",
    IN: "印度",
    IO: "英属印度洋领地",
    IQ: "伊拉克",
    IR: "伊朗",
    IS: "冰岛",
    IT: "意大利",
    JE: "泽西",
    JM: "牙买加",
    JO: "约旦",
    JP: "日本",
    KE: "肯尼亚",
    KG: "吉尔吉斯斯坦",
    KH: "柬埔寨",
    KI: "基里巴斯",
    KM: "科摩罗",
    KN: "圣基茨和尼维斯",
    KP: "朝鲜",
    KR: "韩国",
    KW: "科威特",
    KY: "开曼群岛",
    KZ: "哈萨克斯坦",
    LA: "老挝",
    LB: "黎巴嫩",
    LC: "圣卢西亚",
    LI: "列支敦斯登",
    LK: "斯里兰卡",
    LR: "利比里亚",
    LS: "赖索托",
    LT: "立陶宛",
    LU: "卢森堡",
    LV: "拉脱维亚",
    LY: "利比亚",
    MA: "摩洛哥",
    MC: "摩纳哥",
    MD: "摩尔多瓦",
    ME: "蒙特内哥罗",
    MF: "法属圣马丁",
    MG: "马达加斯加",
    MH: "马绍尔群岛",
    MK: "马其顿",
    ML: "马里",
    MM: "缅甸",
    MN: "蒙古",
    MO: "澳门",
    MP: "北马里亚纳群岛",
    MQ: "马提尼克",
    MR: "毛里塔尼亚",
    MS: "蒙特塞拉特",
    MT: "马尔他",
    MU: "模里西斯",
    MV: "马尔地夫",
    MW: "马拉维",
    MX: "墨西哥",
    MY: "马来西亚",
    MZ: "莫桑比克",
    NA: "纳米比亚",
    NC: "新喀里多尼亚",
    NE: "尼日尔",
    NF: "诺福克岛",
    NG: "奈及利亚",
    NI: "尼加拉瓜",
    NL: "荷兰",
    NO: "挪威",
    NP: "尼泊尔",
    NR: "瑙鲁",
    NU: "纽埃",
    NZ: "新西兰",
    OM: "阿曼",
    PA: "巴拿马",
    PE: "秘鲁",
    PF: "法属玻里尼西亚",
    PG: "巴布亚新几内亚",
    PH: "菲律宾",
    PK: "巴基斯坦",
    PL: "波兰",
    PM: "圣皮埃尔和密克隆",
    PN: "皮特凯恩群岛",
    PR: "波多黎各",
    PS: "巴勒斯坦",
    PT: "葡萄牙",
    PW: "帛琉",
    PY: "巴拉圭",
    QA: "卡塔尔",
    RE: "留尼汪",
    RO: "罗马尼亚",
    RS: "塞尔维亚",
    RU: "俄罗斯",
    RW: "卢旺达",
    SA: "沙乌地阿拉伯",
    SB: "所罗门群岛",
    SC: "塞舌尔",
    SD: "苏丹",
    SE: "瑞典",
    SG: "新加坡",
    SH: "圣赫勒拿",
    SI: "斯洛维尼亚",
    SJ: "斯瓦尔巴群岛和扬马延岛",
    SK: "斯洛伐克",
    SL: "塞拉利昂",
    SM: "圣马力诺",
    SN: "塞内加尔",
    SO: "索马利亚",
    SR: "苏里南",
    SS: "南苏丹",
    ST: "圣多美和普林西比",
    SV: "萨尔瓦多",
    SX: "荷属圣马丁",
    SY: "叙利亚",
    SZ: "斯威士兰",
    TC: "特克斯和凯科斯群岛",
    TD: "乍得",
    TF: "法属南部领地",
    TG: "多哥",
    TH: "泰国",
    TJ: "塔吉克斯坦",
    TK: "托克劳",
    TL: "东帝汶",
    TM: "土库曼斯坦",
    TN: "突尼西亚",
    TO: "汤加",
    TR: "土耳其",
    TT: "千里达及托巴哥",
    TV: "图瓦卢",
    TW: "臺湾",
    TZ: "坦桑尼亚",
    UA: "乌克兰",
    UG: "乌干达",
    UM: "美国本土外小岛屿",
    US: "美国",
    UY: "乌拉圭",
    UZ: "乌兹别克斯坦",
    VA: "梵蒂冈",
    VC: "圣文森及格瑞那丁",
    VE: "委内瑞拉",
    VG: "英属维尔京群岛",
    VI: "美属维尔京群岛",
    VN: "越南",
    VU: "瓦努阿图",
    WF: "瓦利斯和富图纳",
    WS: "萨摩亚",
    YE: "叶门",
    YT: "马约特",
    ZA: "南非",
    ZM: "尚比亚",
    ZW: "辛巴威",
    XK: "科索沃"
  };
  var zh = {
    locale: locale$J,
    countries: countries$J
  };

  var zh$1 = /*#__PURE__*/Object.freeze({
    locale: locale$J,
    countries: countries$J,
    default: zh
  });

  var require$$0 = ( ar$1 && ar ) || ar$1;

  var require$$1 = ( az$1 && az ) || az$1;

  var require$$2 = ( be$1 && be ) || be$1;

  var require$$3 = ( bg$1 && bg ) || bg$1;

  var require$$4 = ( bs$1 && bs ) || bs$1;

  var require$$5 = ( ca$1 && ca ) || ca$1;

  var require$$6 = ( cs$1 && cs ) || cs$1;

  var require$$7 = ( da$1 && da ) || da$1;

  var require$$8 = ( de$1 && de ) || de$1;

  var require$$9 = ( el$1 && el ) || el$1;

  var require$$10 = ( en$1 && en ) || en$1;

  var require$$11 = ( es$1 && es ) || es$1;

  var require$$12 = ( et$1 && et ) || et$1;

  var require$$13 = ( fa$1 && fa ) || fa$1;

  var require$$14 = ( fi$1 && fi ) || fi$1;

  var require$$15 = ( fr$1 && fr ) || fr$1;

  var require$$16 = ( he$1 && he ) || he$1;

  var require$$17 = ( hr$1 && hr ) || hr$1;

  var require$$18 = ( hu$1 && hu ) || hu$1;

  var require$$19 = ( hy$1 && hy ) || hy$1;

  var require$$20 = ( id$1 && id ) || id$1;

  var require$$21 = ( it$1 && it ) || it$1;

  var require$$22 = ( ja$1 && ja ) || ja$1;

  var require$$23 = ( ka$1 && ka ) || ka$1;

  var require$$24 = ( kk$1 && kk ) || kk$1;

  var require$$25 = ( ko$1 && ko ) || ko$1;

  var require$$26 = ( ky$1 && ky ) || ky$1;

  var require$$27 = ( lt$1 && lt ) || lt$1;

  var require$$28 = ( lv$1 && lv ) || lv$1;

  var require$$29 = ( mk$1 && mk ) || mk$1;

  var require$$30 = ( mn$1 && mn ) || mn$1;

  var require$$31 = ( nb$1 && nb ) || nb$1;

  var require$$32 = ( nl$1 && nl ) || nl$1;

  var require$$33 = ( nn$1 && nn ) || nn$1;

  var require$$34 = ( pl$1 && pl ) || pl$1;

  var require$$35 = ( pt$1 && pt ) || pt$1;

  var require$$36 = ( ro$1 && ro ) || ro$1;

  var require$$37 = ( ru$1 && ru ) || ru$1;

  var require$$38 = ( sk$1 && sk ) || sk$1;

  var require$$39 = ( sl$1 && sl ) || sl$1;

  var require$$40 = ( sr$1 && sr ) || sr$1;

  var require$$41 = ( sv$1 && sv ) || sv$1;

  var require$$42 = ( tr$1 && tr ) || tr$1;

  var require$$43 = ( uk$1 && uk ) || uk$1;

  var require$$44 = ( uz$1 && uz ) || uz$1;

  var require$$45 = ( zh$1 && zh ) || zh$1;

  var locales = [
    require$$0,
    require$$1,
    require$$2,
    require$$3,
    require$$4,
    require$$5,
    require$$6,
    require$$7,
    require$$8,
    require$$9,
    require$$10,
    require$$11,
    require$$12,
    require$$13,
    require$$14,
    require$$15,
    require$$9,
    require$$16,
    require$$17,
    require$$18,
    require$$19,
    require$$20,
    require$$21,
    require$$22,
    require$$23,
    require$$24,
    require$$25,
    require$$26,
    require$$27,
    require$$28,
    require$$29,
    require$$30,
    require$$31,
    require$$32,
    require$$33,
    require$$34,
    require$$35,
    require$$36,
    require$$37,
    require$$38,
    require$$39,
    require$$40,
    require$$41,
    require$$42,
    require$$43,
    require$$44,
    require$$45
  ];

  for (var i = 0; i < locales.length; i++) {
    i18nIsoCountries.registerLocale(locales[i]);
  }

  var entryNode = i18nIsoCountries;

  var countries$K = entryNode;

  var AfdPhone =
      /*#__PURE__*/
      function (_afdValidationMixin) {
        inherits(AfdPhone, _afdValidationMixin);

        function AfdPhone(element, options) {
          var _this;

          classCallCheck(this, AfdPhone);

          _this = possibleConstructorReturn(this, getPrototypeOf(AfdPhone).call(this, element, options));

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onKeyUp", function () {
            var $element = _this.$element; // dont do validation until focus out, however we can provide seful info on each type
            // set phone variable and handle country prefix

            var phoneNumber = _this.setCountryDialingCode(_this.$element.val(), _this.options.phone.defaultDialingCode);

            var pn = new Phone(phoneNumber);

            if (pn.isValid() !== null) {
              $element.data('phone-is-regex-valid', pn.isValid());
            }

            if (pn.getRegionCode() !== null) {
              $element.data('phone-region', pn.getRegionCode());
            }

            if (pn.isMobile() !== null) {
              $element.data('phone-is-mobile', pn.isMobile());
            }

            if (pn.isFixedLine() !== null) {
              $element.data('phone-is-landline', pn.isFixedLine());
            }

            $element.data('phone-is-afd-valid', false);

            _this.clearValidation();

            $(document).trigger('afd:phoneValidationUpdated', $element);
          });

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onFocusOut", function () {
            var $element = _this.$element; // we only want to set the invalid state if the user focuses out of the field
            // set phone variable and handle country prefix

            var phoneNumber = _this.setCountryDialingCode($element.val(), _this.options.phone.defaultDialingCode); // setup regex validation object


            var pn = new Phone(phoneNumber); // set options country iso code

            var countryiso = countries$K.alpha2ToAlpha3(pn.getRegionCode()); // first check to see if we can locally confirm email valid via plugin

            if (pn.isValid()) {
              // if it is a correctly structured phone number then check against PCE
              var pceValid = _this.validatePhone(pn.getNumber(), countryiso);

              pceValid.done(function (data) {
                if (data.Result === '1') {
                  _this.handleValid();

                  $element.data('phone-is-afd-valid', true);
                  $(document).trigger('afd:phoneValidationUpdated', $element);
                } else {
                  _this.handleInvalid(_this.options.phone.invalidPhoneNumberMessage);

                  $element.data('phone-is-afd-valid', false);
                  $(document).trigger('afd:phoneValidationUpdated', $element);
                }

                $(document).trigger('afd:phoneValidationUpdated', $element);
              }).fail(function (err) {
                console.error(err);
              }); // Format the phone number correctly

              if ('+' + Phone.getCountryCodeForRegionCode(pn.getRegionCode()) === _this.options.phone.defaultDialingCode) {
                $element.val(pn.getNumber('national'));
              } else {
                $element.val(pn.getNumber('international'));
              }
            } else {
              _this.handleInvalid(_this.options.phone.invalidPhoneNumberMessage);

              $element.data('phone-is-afd-valid', false);
              $(document).trigger('afd:phoneValidationUpdated', $element);
            }
          });

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "setCountryDialingCode", function (phoneNumber, defaultCountryDialingCode) {
            if (phoneNumber.substr(0, 1) !== '+' && phoneNumber.substr(0, 2 !== '00')) ; else {
              return phoneNumber;
            }

            return defaultCountryDialingCode + phoneNumber;
          });

          return _this;
        }

        createClass(AfdPhone, [{
          key: "init",
          value: function init() {
            this.$element.data('phone-is-afd-valid', false);
            var event = this.eventHandler;
            event(this.$element, 'keyup', this.onKeyUp);
            event(this.$element, 'focusout', this.onFocusOut);
          } // check for validation on each keystroke

        }, {
          key: "validatePhone",
          value: function validatePhone(phone, countryiso) {
            $(document).trigger('afd:phoneValidationStared', this.$element);
            var requestOptions = this.setupParams({
              phone: phone,
              data: 'phone',
              task: 'full',
              fields: 'standard',
              countryiso: countryiso,
              afdc: this.options.afdc
            });
            return $.ajax(requestOptions);
          }
        }]);

        return AfdPhone;
      }(afdValidationMixin(AfdControl));

  var _isObject = function (it) {
    return typeof it === 'object' ? it !== null : typeof it === 'function';
  };

  var _anObject = function (it) {
    if (!_isObject(it)) throw TypeError(it + ' is not an object!');
    return it;
  };

  var _fails = function (exec) {
    try {
      return !!exec();
    } catch (e) {
      return true;
    }
  };

  // Thank's IE8 for his funny defineProperty
  var _descriptors = !_fails(function () {
    return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
  });

  var _global = createCommonjsModule(function (module) {
    // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
    var global = module.exports = typeof window != 'undefined' && window.Math == Math
        ? window : typeof self != 'undefined' && self.Math == Math ? self
            // eslint-disable-next-line no-new-func
            : Function('return this')();
    if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
  });

  var document$1 = _global.document;
  // typeof document.createElement is 'object' in old IE
  var is = _isObject(document$1) && _isObject(document$1.createElement);
  var _domCreate = function (it) {
    return is ? document$1.createElement(it) : {};
  };

  var _ie8DomDefine = !_descriptors && !_fails(function () {
    return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
  });

  // 7.1.1 ToPrimitive(input [, PreferredType])

  // instead of the ES6 spec version, we didn't implement @@toPrimitive case
  // and the second argument - flag - preferred type is a string
  var _toPrimitive = function (it, S) {
    if (!_isObject(it)) return it;
    var fn, val;
    if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
    if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
    if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
    throw TypeError("Can't convert object to primitive value");
  };

  var dP = Object.defineProperty;

  var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
    _anObject(O);
    P = _toPrimitive(P, true);
    _anObject(Attributes);
    if (_ie8DomDefine) try {
      return dP(O, P, Attributes);
    } catch (e) { /* empty */ }
    if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
    if ('value' in Attributes) O[P] = Attributes.value;
    return O;
  };

  var _objectDp = {
    f: f
  };

  var _propertyDesc = function (bitmap, value) {
    return {
      enumerable: !(bitmap & 1),
      configurable: !(bitmap & 2),
      writable: !(bitmap & 4),
      value: value
    };
  };

  var _hide = _descriptors ? function (object, key, value) {
    return _objectDp.f(object, key, _propertyDesc(1, value));
  } : function (object, key, value) {
    object[key] = value;
    return object;
  };

  var hasOwnProperty = {}.hasOwnProperty;
  var _has = function (it, key) {
    return hasOwnProperty.call(it, key);
  };

  var id$2 = 0;
  var px = Math.random();
  var _uid = function (key) {
    return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id$2 + px).toString(36));
  };

  var _core = createCommonjsModule(function (module) {
    var core = module.exports = { version: '2.5.7' };
    if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
  });
  var _core_1 = _core.version;

  var _redefine = createCommonjsModule(function (module) {
    var SRC = _uid('src');
    var TO_STRING = 'toString';
    var $toString = Function[TO_STRING];
    var TPL = ('' + $toString).split(TO_STRING);

    _core.inspectSource = function (it) {
      return $toString.call(it);
    };

    (module.exports = function (O, key, val, safe) {
      var isFunction = typeof val == 'function';
      if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
      if (O[key] === val) return;
      if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
      if (O === _global) {
        O[key] = val;
      } else if (!safe) {
        delete O[key];
        _hide(O, key, val);
      } else if (O[key]) {
        O[key] = val;
      } else {
        _hide(O, key, val);
      }
      // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
    })(Function.prototype, TO_STRING, function toString() {
      return typeof this == 'function' && this[SRC] || $toString.call(this);
    });
  });

  // 7.2.1 RequireObjectCoercible(argument)
  var _defined = function (it) {
    if (it == undefined) throw TypeError("Can't call method on  " + it);
    return it;
  };

  var _library = false;

  var _shared = createCommonjsModule(function (module) {
    var SHARED = '__core-js_shared__';
    var store = _global[SHARED] || (_global[SHARED] = {});

    (module.exports = function (key, value) {
      return store[key] || (store[key] = value !== undefined ? value : {});
    })('versions', []).push({
      version: _core.version,
      mode: 'global',
      copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
    });
  });

  var _wks = createCommonjsModule(function (module) {
    var store = _shared('wks');

    var Symbol = _global.Symbol;
    var USE_SYMBOL = typeof Symbol == 'function';

    var $exports = module.exports = function (name) {
      return store[name] || (store[name] =
          USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
    };

    $exports.store = store;
  });

  var _fixReWks = function (KEY, length, exec) {
    var SYMBOL = _wks(KEY);
    var fns = exec(_defined, SYMBOL, ''[KEY]);
    var strfn = fns[0];
    var rxfn = fns[1];
    if (_fails(function () {
      var O = {};
      O[SYMBOL] = function () { return 7; };
      return ''[KEY](O) != 7;
    })) {
      _redefine(String.prototype, KEY, strfn);
      _hide(RegExp.prototype, SYMBOL, length == 2
          // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
          // 21.2.5.11 RegExp.prototype[@@split](string, limit)
          ? function (string, arg) { return rxfn.call(string, this, arg); }
          // 21.2.5.6 RegExp.prototype[@@match](string)
          // 21.2.5.9 RegExp.prototype[@@search](string)
          : function (string) { return rxfn.call(string, this); }
      );
    }
  };

  // @@replace logic
  _fixReWks('replace', 2, function (defined, REPLACE, $replace) {
    // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
    return [function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
          ? fn.call(searchValue, O, replaceValue)
          : $replace.call(String(O), searchValue, replaceValue);
    }, $replace];
  });

  /*
   * Luhn algorithm implementation in JavaScript
   * Copyright (c) 2009 Nicholas C. Zakas
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
   * THE SOFTWARE.
   */

  function luhn10(identifier) {
    var sum = 0;
    var alt = false;
    var i = identifier.length - 1;
    var num;

    while (i >= 0) {
      num = parseInt(identifier.charAt(i), 10);

      if (alt) {
        num *= 2;
        if (num > 9) {
          num = (num % 10) + 1; // eslint-disable-line no-extra-parens
        }
      }

      alt = !alt;

      sum += num;

      i--;
    }

    return sum % 10 === 0;
  }

  var luhn10_1 = luhn10;

  var testOrder;
  var types = {};
  var customCards = {};
  var VISA = 'visa';
  var MASTERCARD = 'mastercard';
  var AMERICAN_EXPRESS = 'american-express';
  var DINERS_CLUB = 'diners-club';
  var DISCOVER = 'discover';
  var ELO = 'elo';
  var JCB = 'jcb';
  var UNIONPAY = 'unionpay';
  var MAESTRO = 'maestro';
  var MIR = 'mir';
  var CVV = 'CVV';
  var CID = 'CID';
  var CVC = 'CVC';
  var CVN = 'CVN';
  var CVP2 = 'CVP2';
  var CVE = 'CVE';
  var ORIGINAL_TEST_ORDER = [
    VISA,
    MASTERCARD,
    AMERICAN_EXPRESS,
    DINERS_CLUB,
    DISCOVER,
    JCB,
    UNIONPAY,
    MAESTRO,
    ELO,
    MIR
  ];

  function clone(originalObject, persistPatterns) {
    var dupe, prefixPattern, exactPattern;

    if (!originalObject) { return null; }

    prefixPattern = originalObject.prefixPattern;
    exactPattern = originalObject.exactPattern;
    dupe = JSON.parse(JSON.stringify(originalObject));

    if (persistPatterns) {
      dupe.prefixPattern = prefixPattern;
      dupe.exactPattern = exactPattern;
    } else {
      delete dupe.prefixPattern;
      delete dupe.exactPattern;
    }

    return dupe;
  }

  testOrder = clone(ORIGINAL_TEST_ORDER);

  types[VISA] = {
    niceType: 'Visa',
    type: VISA,
    prefixPattern: /^4/,
    exactPattern: new RegExp('^' +
        '4' +
        '(?!' +
        '31274|51416|57393|0117[89]|38935|5763[12]' + // Elo cards
        ')\\d{5,}' +
        '$'),
    gaps: [4, 8, 12],
    lengths: [16, 18, 19],
    code: {
      name: CVV,
      size: 3
    }
  };

  types[MASTERCARD] = {
    niceType: 'Mastercard',
    type: MASTERCARD,
    prefixPattern: /^(5|5[1-5]|2|22|222|222[1-9]|2[3-6]|27|27[0-2]|2720)$/,
    exactPattern: /^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[0-1]|2720)\d*$/,
    gaps: [4, 8, 12],
    lengths: [16],
    code: {
      name: CVC,
      size: 3
    }
  };

  types[AMERICAN_EXPRESS] = {
    niceType: 'American Express',
    type: AMERICAN_EXPRESS,
    prefixPattern: /^(3|34|37)$/,
    exactPattern: /^3[47]\d*$/,
    isAmex: true,
    gaps: [4, 10],
    lengths: [15],
    code: {
      name: CID,
      size: 4
    }
  };

  types[DINERS_CLUB] = {
    niceType: 'Diners Club',
    type: DINERS_CLUB,
    prefixPattern: /^(3|3[0689]|30[0-5])$/,
    exactPattern: /^3(0[0-5]|[689])\d*$/,
    gaps: [4, 10],
    lengths: [14, 16, 19],
    code: {
      name: CVV,
      size: 3
    }
  };

  types[DISCOVER] = {
    niceType: 'Discover',
    type: DISCOVER,
    prefixPattern: /^(6|60|601|6011|65|65\d{1,4}|64|64[4-9])$/,
    exactPattern: new RegExp('^(' +
        '6011' +
        '|' +
        '65' +
        '(?!' + // Elo cards
        '003[1-3]' +
        '|' +
        '003[5-9]|004\\d|005[0-1]' +
        '|' +
        '040[5-9]|04[1-3]\\d' +
        '|' +
        '048[5-9]|049\\d|05[0-2]\\d|053[0-8]' +
        '|' +
        '054[1-9]|05[5-8]\\d|059[0-8]' +
        '|' +
        '070\\d|071[0-8]' +
        '|' +
        '072[0-7]' +
        '|' +
        '090[1-9]|09[1-6]\\d|097[0-8]' +
        '|' +
        '165[2-9]|16[6-7]\\d' +
        '|' +
        '50[0-1]\\d' +
        '|' +
        '502[1-9]|50[3-4]\\d|505[0-8]' +
        ')\\d{4}' +
        '|' +
        '64[4-9]' +
        ')\\d*$'),
    gaps: [4, 8, 12],
    lengths: [16, 19],
    code: {
      name: CID,
      size: 3
    }
  };

  types[JCB] = {
    niceType: 'JCB',
    type: JCB,
    prefixPattern: /^(2|21|213|2131|1|18|180|1800|3|35)$/,
    exactPattern: /^(2131|1800|35)\d*$/,
    gaps: [4, 8, 12],
    lengths: [16, 17, 18, 19],
    code: {
      name: CVV,
      size: 3
    }
  };

  types[UNIONPAY] = {
    niceType: 'UnionPay',
    type: UNIONPAY,
    prefixPattern: /^((6|62|62\d|(621(?!83|88|98|99))|622(?!06)|627[0267]\d?|628(?!0|1)|629[1,2])|622018)$/,
    exactPattern: new RegExp('^(' +
        '(' +
        '620' +
        '|' +
        '(621(?!83|88|98|99))' +
        '|' +
        '622(?!06|018)' +
        '|' +
        '62[3-6]' +
        '|' +
        '627[026]' +
        '|' +
        '6277(?!80)\\d{2}' + // Elo card
        '|' +
        '628(?!0|1)' +
        '|' +
        '629[12]' +
        ')\\d*' +

        '|' +

        '622018\\d{12}' +
        ')$'),
    gaps: [4, 8, 12],
    lengths: [16, 17, 18, 19],
    code: {
      name: CVN,
      size: 3
    }
  };

  types[MAESTRO] = {
    niceType: 'Maestro',
    type: MAESTRO,
    prefixPattern: /^(5|5[06-9]|6\d*)$/,
    exactPattern: new RegExp('^(' +
        '5[6-9]' +
        '|' +
        '50' +
        '(?!' + // Elo card ranges
        '6699|067[0-6][0-9]' +
        '|' +
        '677[0-8]' +
        '|' +
        '9[0-9][0-9][0-9]' +
        ')\\d{4}' +
        '|' +
        '67' +
        '|' +
        '63' +
        '(?!' + // More Elo card ranges
        '6297|6368' +
        ')\\d{4}' +
        ')\\d*$'
    ),
    gaps: [4, 8, 12],
    lengths: [12, 13, 14, 15, 16, 17, 18, 19],
    code: {
      name: CVC,
      size: 3
    }
  };

  types[ELO] = {
    niceType: 'Elo',
    type: ELO,
    prefixPattern: new RegExp('^(' +
        '[4-6]' +

        '|' +

        '4[035]|4[035]1' +
        '|' +
        '4011|40117|40117[89]' +
        '|' +
        '4312|43127|431274' +
        '|' +
        '438|4389|43893|438935' +
        '|' +
        '4514|45141|451416' +
        '|' +
        '457|457[36]|45739|45763|457393|45763[12]' +

        '|' +

        '50|50[69]' +
        '|' +
        '506[6-7]|50669|5067[0-7]|5067[0-6][0-9]|50677[0-8]' +
        '|' +
        '509[0-9]|509[0-9][0-9]|509[0-9][0-9][0-9]' +

        '|' +

        '6[235]|627|636|65[015]' +
        '|' +
        '6277|62778|627780' +
        '|' +
        '636[23]|63629|636297|63636|636368' +
        '|' +
        '650[0479]' +
        '|' +
        '6500[3-5]|65003[1-3]|65003[5-9]|65004[0-9]65005[01]' +
        '|' +
        '6504[0-3]|65040[5-9]|65041[0-9]' +
        '|' +
        '6505[4-9]|65054[1-9]|6505[5-8][0-9]|65059[0-8]' +
        '|' +
        '6507[0-2]|65070[0-9]|65071[0-8]|65072[0-7]' +
        '|' +
        '6509[0-7]|65090[1-9]|6509[1-6][0-9]|65097[0-8]' +
        '|' +
        '6516|6516[5-7]|65165[2-9]|6516[6-7][0-9]' +
        '|' +
        '6550|6550[0-5]|6550[01][0-9]|65502[1-9]|6550[3-4][0-9]|65505[0-8]' +
        ')$'),
    exactPattern: new RegExp('^(' +
        // Elo only ranges
        '4(31274|51416|57393)' +

        '|' +

        '50(' +
        '4175' +
        '|' +
        '6699|67[0-6][0-9]|677[0-8]' + // 506699-506778
        '|' +
        '9[0-9][0-9][0-9]' + // 509000-509999
        ')' +

        '|' +

        '627780' +

        '|' +

        '636(297|368)' +

        '|' +

        // Dual Branded with Visa
        '4(0117[89]|38935|5763[12])' +

        '|' +

        // Dual Branded with Discover
        '65(' +
        '003[1-3]' + // 650031-650033
        '|' +
        '003[5-9]|004\\d|005[0-1]' + // 650035-650051
        '|' +
        '040[5-9]|04[1-3]\\d' + // 650405-650439
        '|' +
        '048[5-9]|049\\d|05[0-2]\\d|053[0-8]' + // 650485-650538
        '|' +
        '054[1-9]|05[5-8]\\d|059[0-8]' + // 650541-650598
        '|' +
        '070[0-9]|071[0-8]' + // 650700-650718
        '|' +
        '072[0-7]' + // 650720-650727
        '|' +
        '090[1-9]|09[1-6][0-9]|097[0-8]' + // 650901-650978
        '|' +
        '165[2-9]|16[6-7][0-9]' + // 651652-651679
        '|' +
        '50[0-1][0-9]' + // 655000-655019
        '|' +
        '502[1-9]|50[3-4][0-9]|505[0-8]' + // 655021-655058
        ')' +
        ')\\d*$'),
    gaps: [4, 8, 12],
    lengths: [16],
    code: {
      name: CVE,
      size: 3
    }
  };

  types[MIR] = {
    niceType: 'Mir',
    type: MIR,
    prefixPattern: /^(2|22|220|220[0-4])$/,
    exactPattern: /^(220[0-4])\d*$/,
    gaps: [4, 8, 12],
    lengths: [16, 17, 18, 19],
    code: {
      name: CVP2,
      size: 3
    }
  };

  function findType(type) {
    return customCards[type] || types[type];
  }

  function creditCardType(cardNumber) {
    var type, value, i;
    var prefixResults = [];
    var exactResults = [];

    if (!(typeof cardNumber === 'string' || cardNumber instanceof String)) {
      return [];
    }

    for (i = 0; i < testOrder.length; i++) {
      type = testOrder[i];
      value = findType(type);

      if (cardNumber.length === 0) {
        prefixResults.push(clone(value));
        continue;
      }

      if (value.exactPattern.test(cardNumber)) {
        exactResults.push(clone(value));
      } else if (value.prefixPattern.test(cardNumber)) {
        prefixResults.push(clone(value));
      }
    }

    return exactResults.length ? exactResults : prefixResults;
  }

  creditCardType.getTypeInfo = function (type) {
    return clone(findType(type));
  };

  function getCardPosition(name, ignoreErrorForNotExisting) {
    var position = testOrder.indexOf(name);

    if (!ignoreErrorForNotExisting && position === -1) {
      throw new Error('"' + name + '" is not a supported card type.');
    }

    return position;
  }

  creditCardType.removeCard = function (name) {
    var position = getCardPosition(name);

    testOrder.splice(position, 1);
  };

  creditCardType.addCard = function (config) {
    var existingCardPosition = getCardPosition(config.type, true);

    customCards[config.type] = config;

    if (existingCardPosition === -1) {
      testOrder.push(config.type);
    }
  };

  creditCardType.updateCard = function (cardType, updates) {
    var clonedCard;
    var originalObject = customCards[cardType] || types[cardType];

    if (!originalObject) {
      throw new Error('"' + cardType + '" is not a recognized type. Use `addCard` instead.');
    }

    if (updates.type && originalObject.type !== updates.type) {
      throw new Error('Cannot overwrite type parameter.');
    }

    clonedCard = clone(originalObject, true);

    Object.keys(clonedCard).forEach(function (key) {
      if (updates[key]) {
        clonedCard[key] = updates[key];
      }
    });

    customCards[clonedCard.type] = clonedCard;
  };

  creditCardType.changeOrder = function (name, position) {
    var currentPosition = getCardPosition(name);

    testOrder.splice(currentPosition, 1);
    testOrder.splice(position, 0, name);
  };

  creditCardType.resetModifications = function () {
    testOrder = clone(ORIGINAL_TEST_ORDER);
    customCards = {};
  };

  creditCardType.types = {
    VISA: VISA,
    MASTERCARD: MASTERCARD,
    AMERICAN_EXPRESS: AMERICAN_EXPRESS,
    DINERS_CLUB: DINERS_CLUB,
    DISCOVER: DISCOVER,
    JCB: JCB,
    UNIONPAY: UNIONPAY,
    MAESTRO: MAESTRO,
    ELO: ELO,
    MIR: MIR
  };

  var creditCardType_1 = creditCardType;

  function verification(card, isPotentiallyValid, isValid) {
    return {card: card, isPotentiallyValid: isPotentiallyValid, isValid: isValid};
  }

  function cardNumber(value) {
    var potentialTypes, cardType, isPotentiallyValid, isValid, i, maxLength;

    if (typeof value === 'number') {
      value = String(value);
    }

    if (typeof value !== 'string') { return verification(null, false, false); }

    value = value.replace(/\-|\s/g, '');

    if (!/^\d*$/.test(value)) { return verification(null, false, false); }

    potentialTypes = creditCardType_1(value);

    if (potentialTypes.length === 0) {
      return verification(null, false, false);
    } else if (potentialTypes.length !== 1) {
      return verification(null, true, false);
    }

    cardType = potentialTypes[0];

    if (cardType.type === 'unionpay') {  // UnionPay is not Luhn 10 compliant
      isValid = true;
    } else {
      isValid = luhn10_1(value);
    }

    maxLength = Math.max.apply(null, cardType.lengths);

    for (i = 0; i < cardType.lengths.length; i++) {
      if (cardType.lengths[i] === value.length) {
        isPotentiallyValid = value.length !== maxLength || isValid;
        return verification(cardType, isPotentiallyValid, isValid);
      }
    }

    return verification(cardType, value.length < maxLength, false);
  }

  var cardNumber_1 = cardNumber;

  var DEFAULT_VALID_NUMBER_OF_YEARS_IN_THE_FUTURE = 19;

  function verification$1(isValid, isPotentiallyValid, isCurrentYear) {
    return {
      isValid: isValid,
      isPotentiallyValid: isPotentiallyValid,
      isCurrentYear: isCurrentYear || false
    };
  }

  function expirationYear(value, maxElapsedYear) {
    var currentFirstTwo, currentYear, firstTwo, len, twoDigitYear, valid, isCurrentYear;

    maxElapsedYear = maxElapsedYear || DEFAULT_VALID_NUMBER_OF_YEARS_IN_THE_FUTURE;

    if (typeof value !== 'string') {
      return verification$1(false, false);
    }
    if (value.replace(/\s/g, '') === '') {
      return verification$1(false, true);
    }
    if (!/^\d*$/.test(value)) {
      return verification$1(false, false);
    }

    len = value.length;

    if (len < 2) {
      return verification$1(false, true);
    }

    currentYear = new Date().getFullYear();

    if (len === 3) {
      // 20x === 20x
      firstTwo = value.slice(0, 2);
      currentFirstTwo = String(currentYear).slice(0, 2);
      return verification$1(false, firstTwo === currentFirstTwo);
    }

    if (len > 4) {
      return verification$1(false, false);
    }

    value = parseInt(value, 10);
    twoDigitYear = Number(String(currentYear).substr(2, 2));

    if (len === 2) {
      isCurrentYear = twoDigitYear === value;
      valid = value >= twoDigitYear && value <= twoDigitYear + maxElapsedYear;
    } else if (len === 4) {
      isCurrentYear = currentYear === value;
      valid = value >= currentYear && value <= currentYear + maxElapsedYear;
    }

    return verification$1(valid, valid, isCurrentYear);
  }

  var expirationYear_1 = expirationYear;

  // Polyfill taken from <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray#Polyfill>.

  var isArray = Array.isArray || function (arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };

  function parseDate(value) {
    var month, len, year, yearValid;

    if (/\//.test(value)) {
      value = value.split(/\s*\/\s*/g);
    } else if (/\s/.test(value)) {
      value = value.split(/ +/g);
    }

    if (isArray(value)) {
      return {
        month: value[0],
        year: value.slice(1).join()
      };
    }

    len = value[0] === '0' || value.length > 5 ? 2 : 1;

    if (value[0] === '1') {
      year = value.substr(1);
      yearValid = expirationYear_1(year);
      if (!yearValid.isPotentiallyValid) {
        len = 2;
      }
    }

    month = value.substr(0, len);

    return {
      month: month,
      year: value.substr(month.length)
    };
  }

  var parseDate_1 = parseDate;

  function verification$2(isValid, isPotentiallyValid, isValidForThisYear) {
    return {
      isValid: isValid,
      isPotentiallyValid: isPotentiallyValid,
      isValidForThisYear: isValidForThisYear || false
    };
  }

  function expirationMonth(value) {
    var month, result;
    var currentMonth = new Date().getMonth() + 1;

    if (typeof value !== 'string') {
      return verification$2(false, false);
    }
    if (value.replace(/\s/g, '') === '' || value === '0') {
      return verification$2(false, true);
    }
    if (!/^\d*$/.test(value)) {
      return verification$2(false, false);
    }

    month = parseInt(value, 10);

    if (isNaN(value)) {
      return verification$2(false, false);
    }

    result = month > 0 && month < 13;

    return verification$2(result, result, result && month >= currentMonth);
  }

  var expirationMonth_1 = expirationMonth;

  function verification$3(isValid, isPotentiallyValid, month, year) {
    return {
      isValid: isValid,
      isPotentiallyValid: isPotentiallyValid,
      month: month,
      year: year
    };
  }

  function expirationDate(value, maxElapsedYear) {
    var date, monthValid, yearValid, isValidForThisYear;

    if (typeof value === 'string') {
      value = value.replace(/^(\d\d) (\d\d(\d\d)?)$/, '$1/$2');
      date = parseDate_1(value);
    } else if (value !== null && typeof value === 'object') {
      date = {
        month: String(value.month),
        year: String(value.year)
      };
    } else {
      return verification$3(false, false, null, null);
    }

    monthValid = expirationMonth_1(date.month);
    yearValid = expirationYear_1(date.year, maxElapsedYear);

    if (monthValid.isValid) {
      if (yearValid.isCurrentYear) {
        isValidForThisYear = monthValid.isValidForThisYear;
        return verification$3(isValidForThisYear, isValidForThisYear, date.month, date.year);
      }

      if (yearValid.isValid) {
        return verification$3(true, true, date.month, date.year);
      }
    }

    if (monthValid.isPotentiallyValid && yearValid.isPotentiallyValid) {
      return verification$3(false, true, null, null);
    }

    return verification$3(false, false, null, null);
  }

  var expirationDate_1 = expirationDate;

  var DEFAULT_LENGTH = 3;

  function includes(array, thing) {
    var i = 0;

    for (; i < array.length; i++) {
      if (thing === array[i]) { return true; }
    }

    return false;
  }

  function max(array) {
    var maximum = DEFAULT_LENGTH;
    var i = 0;

    for (; i < array.length; i++) {
      maximum = array[i] > maximum ? array[i] : maximum;
    }

    return maximum;
  }

  function verification$4(isValid, isPotentiallyValid) {
    return {isValid: isValid, isPotentiallyValid: isPotentiallyValid};
  }

  function cvv(value, maxLength) {
    maxLength = maxLength || DEFAULT_LENGTH;
    maxLength = maxLength instanceof Array ? maxLength : [maxLength];

    if (typeof value !== 'string') { return verification$4(false, false); }
    if (!/^\d*$/.test(value)) { return verification$4(false, false); }
    if (includes(maxLength, value.length)) { return verification$4(true, true); }
    if (value.length < Math.min.apply(null, maxLength)) { return verification$4(false, true); }
    if (value.length > max(maxLength)) { return verification$4(false, false); }

    return verification$4(true, true);
  }

  var cvv_1 = cvv;

  var DEFAULT_MIN_POSTAL_CODE_LENGTH = 3;

  function verification$5(isValid, isPotentiallyValid) {
    return {isValid: isValid, isPotentiallyValid: isPotentiallyValid};
  }

  function postalCode(value, options) {
    var minLength;

    options = options || {};

    minLength = options.minLength || DEFAULT_MIN_POSTAL_CODE_LENGTH;

    if (typeof value !== 'string') {
      return verification$5(false, false);
    } else if (value.length < minLength) {
      return verification$5(false, true);
    }

    return verification$5(true, true);
  }

  var postalCode_1 = postalCode;

  var cardValidator = {
    number: cardNumber_1,
    expirationDate: expirationDate_1,
    expirationMonth: expirationMonth_1,
    expirationYear: expirationYear_1,
    cvv: cvv_1,
    postalCode: postalCode_1,
    creditCardType: creditCardType_1
  };
  var cardValidator_1 = cardValidator.number;
  var cardValidator_2 = cardValidator.expirationDate;
  var cardValidator_3 = cardValidator.expirationMonth;

  var AfdCard =
      /*#__PURE__*/
      function (_afdValidationMixin) {
        inherits(AfdCard, _afdValidationMixin);

        function AfdCard(_element, _options) {
          var _this;

          classCallCheck(this, AfdCard);

          _this = possibleConstructorReturn(this, getPrototypeOf(AfdCard).call(this, _element, _options));

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "init", function () {
            _this.$expiryElement = $('[data-afd-control="expiry"]');

            _this.$element.data('card-is-afd-valid', false);

            _this.$expiryElement.data('expiry-is-regex-valid', false);

            var event = _this.eventHandler;
            event(_this.$element, 'keydown', _this.onKeyDown);
            event(_this.$element, 'keyup', _this.onKeyUp);
            event(_this.$element, 'focusout', _this.onFocusOut);
            event(_this.$expiryElement, 'keydown', _this.onExpiryKeyDown);
            event(_this.$expiryElement, 'keyup', _this.onExpiryKeyUp);
            event(_this.$expiryElement, 'focusout', _this.onExpiryFocusOut);
          });

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onKeyDown", function (e) {
            // only allow number input
            if ((e.keyCode < 48 || e.keyCode > 57) && ( // top number
                e.keyCode < 96 || e.keyCode > 105) && ( // keypad
                e.keyCode < 112 || e.keyCode > 123) && // F keys
                _this.utilKeys.indexOf(e.keyCode) === -1) {
              e.preventDefault();
            }
          });

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onKeyUp", function () {
            var $element = _this.$element;
            var card = $element.val();
            var regexValid = cardValidator_1(card); // See if we can get the card type from the numbers we have

            if (regexValid.card !== null) {
              // if it could be a correct card and we can get the cardtype
              $element.data('card-type', regexValid.card.type);
              $element.data('card-type-nice', regexValid.card.niceType);
            }

            if (regexValid.isValid) {
              _this.handleValid();
            } else {
              _this.clearValidation();
            }

            $element.data('card-is-regex-valid', regexValid.isValid);
            $element.data('card-is-afd-valid', false);
            $(document).trigger('afd:cardValidationUpdated', [$element.get()[0], _this.$expiryElement.get()[0]]);
          });

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onFocusOut", function () {
            var $element = _this.$element;
            var card = $element.val();
            var regexValid = cardValidator_1(card); // if it is regex valid when we mouse out

            if (regexValid.isValid) {
              _this.checkBoth();
            } else {
              _this.handleInvalid(_this.options.card.invalidCardNumberMessage);
            }
          });

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onExpiryKeyDown", function (e) {
            var $element = _this.$expiryElement;
            var expiry = $element.val(); // only allow number input

            if ((e.keyCode < 48 || e.keyCode > 57) && ( // top number
                e.keyCode < 96 || e.keyCode > 105) && ( // keypad
                e.keyCode < 112 || e.keyCode > 123) && // F keys
                _this.utilKeys.indexOf(e.keyCode) === -1) {
              e.preventDefault();
            }

            if (expiry.length > 9 && e.keyCode !== 37 && // left arrow
                e.keyCode !== 39 && // right arrow
                e.keyCode !== 8 && // backspace
                e.keyCode !== 46 // delete
            ) {
              e.preventDefault();
            }

            if (expiry.length === 2 && //if there are two characters
                !cardValidator_3(expiry).isValid && // that are not valid months
                [8, 46, 37, 39].indexOf(e.keyCode) === -1 //and the keys pressed are not delete or backspace or arrows
            ) {
              e.preventDefault(); // prevent further input
            } // prevent the input of other characters if the length of the string is longer than 4


            if (_this.keyupVal.length > 4 && _this.validSeperators.indexOf(e.key) > -1) {
              e.preventDefault();
            } // if the length of the string is 5, this means there is a month followed by ' / '
            // This makes it so that when you press backspace from the end of the sting you delete all three characters at once


            if (_this.keyupVal.length === 5 && e.keyCode === 8) {
              $element.val(_this.keyupVal.replace(' / ', ''));
              e.preventDefault();
            }
          });

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onExpiryKeyUp", function (e) {
            var $element = _this.$expiryElement;
            var expiry = $element.val().replace(' ', '');
            var dateValid = cardValidator_2(expiry); // validation checks

            if (dateValid.isValid) {
              _this.handleValid($element);
            } else if (expiry.length === 1) {
              _this.clearValidation($element);
            } else if (expiry.length === 2) {
              // what to do if there are two characters in the input
              var firstChar = expiry.substr(0, 1);
              var secondChar = expiry.substr(1, 1);

              if (_this.validSeperators.indexOf(secondChar) > -1) {
                // what to do if the second character is a valid seperator
                var validMonth = cardValidator_3(firstChar);

                if (validMonth.isValid) {
                  // is the single digit month valid
                  element.val('0' + firstChar + ' / ');
                } else {
                  // the two characters cannot be a valid month
                  _this.handleInvalid(_this.options.card.invalidExpiryMonthMessage, $element);
                }
              } else {
                // what to do is the second character is a number
                var _validMonth = cardValidator_3(expiry);

                if (_validMonth.isValid && e.keyCode !== 8 && e.keyCode !== 46) {
                  // is the two digit month valid?
                  $element.val(expiry + ' / ');
                } else if (e.keyCode === 8 || e.keyCode === 46 && _validMonth.isValid) {
                  //if we got to two characters via delete/backspace
                  _this.clearValidation($element);
                } else {
                  _this.handleInvalid(_this.options.card.invalidExpiryMonthMessage, $element);
                }
              }
            } else if (expiry.length === 3) {
              // if after keypress the length is three makre sure that the seperator is formatted properly
              if (_this.validSeperators.indexOf(e.key) > -1) {
                $element.val(expiry.replace(e.key, ' / '));
              }
            } else {
              _this.clearValidation($element);
            }

            _this.keyupVal = $element.val();

            _this.$element.data('card-is-afd-valid', false);

            $element.data('expiry-is-regex-valid', dateValid.isValid);
            $(document).trigger('afd:cardValidationUpdated', [_this.$element.get()[0], $element.get()[0]]);
          });

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onExpiryFocusOut", function (e) {
            var $element = _this.$expiryElement;
            var expiry = $element.val().replace(' ', '');
            var dateValid = cardValidator_2(expiry);

            if (dateValid.isValid) {
              var year = dateValid.year.length === 2 ? '20' + dateValid.year : dateValid.year;
              $element.val(dateValid.month + ' / ' + year); // then do afd check

              _this.checkBoth();
            } else {
              _this.handleInvalid(options.card.invalidExpiryDateMessage, $element);
            }

            _this.$element.data('card-is-afd-valid', false);

            $element.data('expiry-is-regex-valid', dateValid.isValid);
            $(document).trigger('afd:cardValidationUpdated', [_this.$element.get()[0], $element.get()[0]]);
          });

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "checkBoth", function () {
            // When we focus out of either card or expiry field we check if both are regex valid and if they are an AFD
            // validation lookup
            var cardElement = $('[data-afd-control="card"]');
            var card = cardElement.val();
            var cardValid = cardValidator_1(card);
            var expiryElement = $('[data-afd-control="expiry"]');
            var expiry = expiryElement.val().replace(' / ', '/');
            var expiryValid = cardValidator_2(expiry);

            if (cardValid.isValid && expiryValid.isValid) {
              _this.validateCard(card, expiry).then(function (data) {
                // what to do if AFD confirms validation
                if (data.Result === '1') {
                  var _data$Item = slicedToArray(data.Item, 1),
                      item = _data$Item[0];

                  _this.handleValid();

                  _this.handleValid(expiryElement);

                  cardElement.data('card-type-nice', item.CardType);
                  cardElement.data('card-is-afd-valid', true);
                  $(document).trigger('afd:cardValidationUpdated', [cardElement.get()[0], expiryElement.get()[0]]);
                } else {
                  _this.$element.data('card-is-afd-valid', false);

                  handleInvalid(options.card.invalidCardOrExpiryMessage);
                }
              }).catch(function (err) {
                console.error(err);
              });
            }
          });

          _this.utilKeys = [37, // left arrow
            39, // right arrow
            8, // backspace
            46, // delete
            111, // forward slash
            220, // back slash
            109, // dash
            32, // space bar
            9 // tab
          ];
          _this.validSeperators = [' ', '-', '/', '\\'];
          _this.keyupVal = '';
          return _this;
        }

        return AfdCard;
      }(afdValidationMixin(AfdControl));

  var AfdAccount =
      /*#__PURE__*/
      function (_afdValidationMixin) {
        inherits(AfdAccount, _afdValidationMixin);

        function AfdAccount(element, options) {
          var _this;

          classCallCheck(this, AfdAccount);

          _this = possibleConstructorReturn(this, getPrototypeOf(AfdAccount).call(this, element, options));

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "init", function () {
            _this.$element.data('account-is-regex-valid', false);

            _this.$element.data('account-is-afd-valid', false);

            _this.$sortCodeElement.data('sort-code-is-regex-valid', false);

            var event = _this.eventHandler;
            event(_this.$element, 'keydown', _this.onKeyDown);
            event(_this.$element, 'keyup', _this.onKeyUp);
            event(_this.$element, 'focusout', _this.onFocusOut);
            event(_this.$sortCodeElement, 'keydown', _this.onSortKeyDown);
            event(_this.$sortCodeElement, 'keyup', _this.onSortKeyUp);
            event(_this.$sortCodeElement, 'focusout', _this.onSortFocusOut);
          });

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onKeyDown", function (e) {
            var account = _this.$element.val(); // only allow number input


            if ((e.keyCode < 48 || e.keyCode > 57) && ( // top number
                e.keyCode < 96 || e.keyCode > 105) && ( // keypad
                e.keyCode < 112 || e.keyCode > 123) && // F keys
                _this.utilKeys.indexOf(e.keyCode) === -1) {
              e.preventDefault();
            }

            if (account.length > 7 && _this.utilKeys.indexOf(e.keyCode) === -1) {
              e.preventDefault();
            }
          });

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onKeyUp", function () {
            var $element = _this.$element;
            var account = $element.val();

            if (account.length === 8) {
              $element.data('account-is-regex-valid', true);

              _this.handleValid();
            } else {
              $element.data('account-is-regex-valid', false);

              _this.clearValidation();
            }

            $(document).trigger('afd:accountValidationUpdated', [$element.get()[0], _this.$sortCodeElement.get()[0]]);
          });

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onFocusOut", function () {
            var $element = _this.$element;

            var account = _this.$element.val();

            if (!$element.data('account-is-regex-valid')) {
              _this.handleInvalid(_this.options.account.invalidAccountNumberMessage);
            } else {
              _this.checkBoth();
            }
          });

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onSortKeyDown", function (e) {
            // only allow number input
            if ((e.keyCode < 48 || e.keyCode > 57) && ( // top number
                e.keyCode < 96 || e.keyCode > 105) && ( // keypad
                e.keyCode < 112 || e.keyCode > 123) && // F keys
                _this.utilKeys.indexOf(e.keyCode) === -1) {
              e.preventDefault();
            }

            var sortCode = _this.$sortCodeElement.val();

            if (sortCode.length > 7 && _this.utilKeys.indexOf(e.keyCode) === -1) {
              e.preventDefault();
            }
          });

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onSortKeyUp", function (e) {
            var $element = _this.$sortCodeElement;
            var sortCode = $element.val(); // add in dashes at correct place

            if ((sortCode.length === 2 || sortCode.length === 5) && _this.utilKeys.indexOf(e.keyCode) === -1) {
              $element.val(sortCode + '-');
            }

            if (sortCode.length === 8) {
              $element.data('sort-code-is-regex-valid', true);

              _this.handleValid($element);
            } else {
              $element.data('sort-code-is-regex-valid', false);

              _this.clearValidation($element);
            }

            $(document).trigger('afd:accountValidationUpdated', [_this.$element.get()[0], $element.get()[0]]);
          });

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onSortFocusOut", function () {
            var $element = _this.$sortCodeElement;
            var sortCode = $element.val();

            if (sortCode.length !== 8) {
              _this.handleInvalid(_this.options.account.invalidSortCodeMessage, $element);

              _this.$element.data('account-is-afd-valid', false);

              _this.$element.data('account-clearing-system', null);

              _this.$element.data('account-iban', null);

              _this.$element.data('account-roll-number', null);

              _this.$element.data('account-type', null);
            } else {
              _this.checkBoth();
            }

            $(document).trigger('afd:accountValidationUpdated', [_this.$element.get()[0], $element.get()[0]]);
          });

          _this.$sortCodeElement = $('[data-afd-control="sort"]');
          _this.utilKeys = [37, // left arrow
            39, // right arrow
            8, // backspace
            46, // delete
            9 // tab
          ];
          return _this;
        }

        createClass(AfdAccount, [{
          key: "checkBoth",
          value: function checkBoth() {
            var _this2 = this;

            var accountElement = $('[data-afd-control="account"]');
            var account = accountElement.val();
            var accountValid = accountElement.data('account-is-regex-valid');
            var sortCodeElement = $('[data-afd-control="sort"]');
            var sortCode = sortCodeElement.val();
            var sortCodeValid = sortCodeElement.data('sort-code-is-regex-valid');

            if (accountValid && sortCodeValid) {
              this.validateAccount(account, sortCode).then(function (data) {
                if (data.Result === '1') {
                  var _data$Item = slicedToArray(data.Item, 1),
                      item = _data$Item[0];

                  _this2.handleValid();

                  _this2.handleValid(sortCodeElement);

                  accountElement.data('account-is-afd-valid', true);
                  accountElement.data('account-clearing-system', item.ClearingSystem);
                  accountElement.data('account-iban', item.IBAN);
                  accountElement.data('account-roll-number', item.RollNumber);
                  accountElement.data('account-type', item.TypeOfAccount);
                } else if (data.Result === '-12' || data.Result === '-13') {
                  _this2.handleInvalid(data.ErrorText);
                } else {
                  _this2.handleInvalid(data.ErrorText);
                }

                $(document).trigger('afd:accountValidationUpdated', [accountElement.get()[0], sortCodeElement.get()[0]]);
              }).catch(function (err) {
                console.error(err);
              });
            }
          }
        }, {
          key: "validateAccount",
          value: function validateAccount(account, sortCode) {
            var requestOptions = this.setupParams({
              accountNumber: account,
              sortCode: sortCode,
              data: 'bank',
              task: 'account',
              fields: 'account',
              afdc: this.options.afdc
            });
            return $.ajax(requestOptions);
          }
        }]);

        return AfdAccount;
      }(afdValidationMixin(AfdControl));

  var _aFunction = function (it) {
    if (typeof it != 'function') throw TypeError(it + ' is not a function!');
    return it;
  };

  // optional / simple context binding

  var _ctx = function (fn, that, length) {
    _aFunction(fn);
    if (that === undefined) return fn;
    switch (length) {
      case 1: return function (a) {
        return fn.call(that, a);
      };
      case 2: return function (a, b) {
        return fn.call(that, a, b);
      };
      case 3: return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
    }
    return function (/* ...args */) {
      return fn.apply(that, arguments);
    };
  };

  var PROTOTYPE = 'prototype';

  var $export = function (type, name, source) {
    var IS_FORCED = type & $export.F;
    var IS_GLOBAL = type & $export.G;
    var IS_STATIC = type & $export.S;
    var IS_PROTO = type & $export.P;
    var IS_BIND = type & $export.B;
    var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
    var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
    var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
    var key, own, out, exp;
    if (IS_GLOBAL) source = name;
    for (key in source) {
      // contains in native
      own = !IS_FORCED && target && target[key] !== undefined;
      // export native or passed
      out = (own ? target : source)[key];
      // bind timers to global for call from export context
      exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
      // extend global
      if (target) _redefine(target, key, out, type & $export.U);
      // export
      if (exports[key] != out) _hide(exports, key, exp);
      if (IS_PROTO && expProto[key] != out) expProto[key] = out;
    }
  };
  _global.core = _core;
  // type bitmap
  $export.F = 1;   // forced
  $export.G = 2;   // global
  $export.S = 4;   // static
  $export.P = 8;   // proto
  $export.B = 16;  // bind
  $export.W = 32;  // wrap
  $export.U = 64;  // safe
  $export.R = 128; // real proto method for `library`
  var _export = $export;

  var toString = {}.toString;

  var _cof = function (it) {
    return toString.call(it).slice(8, -1);
  };

  // fallback for non-array-like ES3 and non-enumerable old V8 strings

  // eslint-disable-next-line no-prototype-builtins
  var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
    return _cof(it) == 'String' ? it.split('') : Object(it);
  };

  // 7.1.13 ToObject(argument)

  var _toObject = function (it) {
    return Object(_defined(it));
  };

  // 7.1.4 ToInteger
  var ceil = Math.ceil;
  var floor = Math.floor;
  var _toInteger = function (it) {
    return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
  };

  // 7.1.15 ToLength

  var min = Math.min;
  var _toLength = function (it) {
    return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
  };

  // 7.2.2 IsArray(argument)

  var _isArray = Array.isArray || function isArray(arg) {
    return _cof(arg) == 'Array';
  };

  var SPECIES = _wks('species');

  var _arraySpeciesConstructor = function (original) {
    var C;
    if (_isArray(original)) {
      C = original.constructor;
      // cross-realm fallback
      if (typeof C == 'function' && (C === Array || _isArray(C.prototype))) C = undefined;
      if (_isObject(C)) {
        C = C[SPECIES];
        if (C === null) C = undefined;
      }
    } return C === undefined ? Array : C;
  };

  // 9.4.2.3 ArraySpeciesCreate(originalArray, length)


  var _arraySpeciesCreate = function (original, length) {
    return new (_arraySpeciesConstructor(original))(length);
  };

  // 0 -> Array#forEach
  // 1 -> Array#map
  // 2 -> Array#filter
  // 3 -> Array#some
  // 4 -> Array#every
  // 5 -> Array#find
  // 6 -> Array#findIndex





  var _arrayMethods = function (TYPE, $create) {
    var IS_MAP = TYPE == 1;
    var IS_FILTER = TYPE == 2;
    var IS_SOME = TYPE == 3;
    var IS_EVERY = TYPE == 4;
    var IS_FIND_INDEX = TYPE == 6;
    var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
    var create = $create || _arraySpeciesCreate;
    return function ($this, callbackfn, that) {
      var O = _toObject($this);
      var self = _iobject(O);
      var f = _ctx(callbackfn, that, 3);
      var length = _toLength(self.length);
      var index = 0;
      var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
      var val, res;
      for (;length > index; index++) if (NO_HOLES || index in self) {
        val = self[index];
        res = f(val, index, O);
        if (TYPE) {
          if (IS_MAP) result[index] = res;   // map
          else if (res) switch (TYPE) {
            case 3: return true;             // some
            case 5: return val;              // find
            case 6: return index;            // findIndex
            case 2: result.push(val);        // filter
          } else if (IS_EVERY) return false; // every
        }
      }
      return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
    };
  };

  // 22.1.3.31 Array.prototype[@@unscopables]
  var UNSCOPABLES = _wks('unscopables');
  var ArrayProto = Array.prototype;
  if (ArrayProto[UNSCOPABLES] == undefined) _hide(ArrayProto, UNSCOPABLES, {});
  var _addToUnscopables = function (key) {
    ArrayProto[UNSCOPABLES][key] = true;
  };

  // 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)

  var $find = _arrayMethods(5);
  var KEY = 'find';
  var forced = true;
  // Shouldn't skip holes
  if (KEY in []) Array(1)[KEY](function () { forced = false; });
  _export(_export.P + _export.F * forced, 'Array', {
    find: function find(callbackfn /* , that = undefined */) {
      return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    }
  });
  _addToUnscopables(KEY);

  // 21.2.5.3 get RegExp.prototype.flags

  var _flags = function () {
    var that = _anObject(this);
    var result = '';
    if (that.global) result += 'g';
    if (that.ignoreCase) result += 'i';
    if (that.multiline) result += 'm';
    if (that.unicode) result += 'u';
    if (that.sticky) result += 'y';
    return result;
  };

  // 21.2.5.3 get RegExp.prototype.flags()
  if (_descriptors && /./g.flags != 'g') _objectDp.f(RegExp.prototype, 'flags', {
    configurable: true,
    get: _flags
  });

  var TO_STRING = 'toString';
  var $toString = /./[TO_STRING];

  var define = function (fn) {
    _redefine(RegExp.prototype, TO_STRING, fn, true);
  };

  // 21.2.5.14 RegExp.prototype.toString()
  if (_fails(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
    define(function toString() {
      var R = _anObject(this);
      return '/'.concat(R.source, '/',
          'flags' in R ? R.flags : !_descriptors && R instanceof RegExp ? _flags.call(R) : undefined);
    });
    // FF44- RegExp#toString has a wrong name
  } else if ($toString.name != TO_STRING) {
    define(function toString() {
      return $toString.call(this);
    });
  }

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$1 = objectProto.hasOwnProperty;

  /**
   * The base implementation of `_.has` without support for deep paths.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {Array|string} key The key to check.
   * @returns {boolean} Returns `true` if `key` exists, else `false`.
   */
  function baseHas(object, key) {
    return object != null && hasOwnProperty$1.call(object, key);
  }

  var _baseHas = baseHas;

  /**
   * Checks if `value` is classified as an `Array` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an array, else `false`.
   * @example
   *
   * _.isArray([1, 2, 3]);
   * // => true
   *
   * _.isArray(document.body.children);
   * // => false
   *
   * _.isArray('abc');
   * // => false
   *
   * _.isArray(_.noop);
   * // => false
   */
  var isArray$1 = Array.isArray;

  var isArray_1 = isArray$1;

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

  var _freeGlobal = freeGlobal;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = _freeGlobal || freeSelf || Function('return this')();

  var _root = root;

  /** Built-in value references. */
  var Symbol$1 = _root.Symbol;

  var _Symbol = Symbol$1;

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$2 = objectProto$1.hasOwnProperty;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString = objectProto$1.toString;

  /** Built-in value references. */
  var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */
  function getRawTag(value) {
    var isOwn = hasOwnProperty$2.call(value, symToStringTag),
        tag = value[symToStringTag];

    try {
      value[symToStringTag] = undefined;
    } catch (e) {}

    var result = nativeObjectToString.call(value);
    {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }
    return result;
  }

  var _getRawTag = getRawTag;

  /** Used for built-in method references. */
  var objectProto$2 = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString$1 = objectProto$2.toString;

  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */
  function objectToString(value) {
    return nativeObjectToString$1.call(value);
  }

  var _objectToString = objectToString;

  /** `Object#toString` result references. */
  var nullTag = '[object Null]',
      undefinedTag = '[object Undefined]';

  /** Built-in value references. */
  var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }
    return (symToStringTag$1 && symToStringTag$1 in Object(value))
        ? _getRawTag(value)
        : _objectToString(value);
  }

  var _baseGetTag = baseGetTag;

  /**
   * Checks if `value` is object-like. A value is object-like if it's not `null`
   * and has a `typeof` result of "object".
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
   * @example
   *
   * _.isObjectLike({});
   * // => true
   *
   * _.isObjectLike([1, 2, 3]);
   * // => true
   *
   * _.isObjectLike(_.noop);
   * // => false
   *
   * _.isObjectLike(null);
   * // => false
   */
  function isObjectLike(value) {
    return value != null && typeof value == 'object';
  }

  var isObjectLike_1 = isObjectLike;

  /** `Object#toString` result references. */
  var symbolTag = '[object Symbol]';

  /**
   * Checks if `value` is classified as a `Symbol` primitive or object.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
   * @example
   *
   * _.isSymbol(Symbol.iterator);
   * // => true
   *
   * _.isSymbol('abc');
   * // => false
   */
  function isSymbol(value) {
    return typeof value == 'symbol' ||
        (isObjectLike_1(value) && _baseGetTag(value) == symbolTag);
  }

  var isSymbol_1 = isSymbol;

  /** Used to match property names within property paths. */
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
      reIsPlainProp = /^\w*$/;

  /**
   * Checks if `value` is a property name and not a property path.
   *
   * @private
   * @param {*} value The value to check.
   * @param {Object} [object] The object to query keys on.
   * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
   */
  function isKey(value, object) {
    if (isArray_1(value)) {
      return false;
    }
    var type = typeof value;
    if (type == 'number' || type == 'symbol' || type == 'boolean' ||
        value == null || isSymbol_1(value)) {
      return true;
    }
    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
        (object != null && value in Object(object));
  }

  var _isKey = isKey;

  /**
   * Checks if `value` is the
   * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
   * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an object, else `false`.
   * @example
   *
   * _.isObject({});
   * // => true
   *
   * _.isObject([1, 2, 3]);
   * // => true
   *
   * _.isObject(_.noop);
   * // => true
   *
   * _.isObject(null);
   * // => false
   */
  function isObject(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
  }

  var isObject_1 = isObject;

  /** `Object#toString` result references. */
  var asyncTag = '[object AsyncFunction]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
      proxyTag = '[object Proxy]';

  /**
   * Checks if `value` is classified as a `Function` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a function, else `false`.
   * @example
   *
   * _.isFunction(_);
   * // => true
   *
   * _.isFunction(/abc/);
   * // => false
   */
  function isFunction(value) {
    if (!isObject_1(value)) {
      return false;
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    var tag = _baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }

  var isFunction_1 = isFunction;

  /** Used to detect overreaching core-js shims. */
  var coreJsData = _root['__core-js_shared__'];

  var _coreJsData = coreJsData;

  /** Used to detect methods masquerading as native. */
  var maskSrcKey = (function() {
    var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
    return uid ? ('Symbol(src)_1.' + uid) : '';
  }());

  /**
   * Checks if `func` has its source masked.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
   */
  function isMasked(func) {
    return !!maskSrcKey && (maskSrcKey in func);
  }

  var _isMasked = isMasked;

  /** Used for built-in method references. */
  var funcProto = Function.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString = funcProto.toString;

  /**
   * Converts `func` to its source code.
   *
   * @private
   * @param {Function} func The function to convert.
   * @returns {string} Returns the source code.
   */
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {}
      try {
        return (func + '');
      } catch (e) {}
    }
    return '';
  }

  var _toSource = toSource;

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

  /** Used to detect host constructors (Safari). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/;

  /** Used for built-in method references. */
  var funcProto$1 = Function.prototype,
      objectProto$3 = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString$1 = funcProto$1.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty$3 = objectProto$3.hasOwnProperty;

  /** Used to detect if a method is native. */
  var reIsNative = RegExp('^' +
      funcToString$1.call(hasOwnProperty$3).replace(reRegExpChar, '\\$&')
          .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
  );

  /**
   * The base implementation of `_.isNative` without bad shim checks.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a native function,
   *  else `false`.
   */
  function baseIsNative(value) {
    if (!isObject_1(value) || _isMasked(value)) {
      return false;
    }
    var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
    return pattern.test(_toSource(value));
  }

  var _baseIsNative = baseIsNative;

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }

  var _getValue = getValue;

  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */
  function getNative(object, key) {
    var value = _getValue(object, key);
    return _baseIsNative(value) ? value : undefined;
  }

  var _getNative = getNative;

  /* Built-in method references that are verified to be native. */
  var nativeCreate = _getNative(Object, 'create');

  var _nativeCreate = nativeCreate;

  /**
   * Removes all key-value entries from the hash.
   *
   * @private
   * @name clear
   * @memberOf Hash
   */
  function hashClear() {
    this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
    this.size = 0;
  }

  var _hashClear = hashClear;

  /**
   * Removes `key` and its value from the hash.
   *
   * @private
   * @name delete
   * @memberOf Hash
   * @param {Object} hash The hash to modify.
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }

  var _hashDelete = hashDelete;

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED = '__lodash_hash_undefined__';

  /** Used for built-in method references. */
  var objectProto$4 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$4 = objectProto$4.hasOwnProperty;

  /**
   * Gets the hash value for `key`.
   *
   * @private
   * @name get
   * @memberOf Hash
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function hashGet(key) {
    var data = this.__data__;
    if (_nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED ? undefined : result;
    }
    return hasOwnProperty$4.call(data, key) ? data[key] : undefined;
  }

  var _hashGet = hashGet;

  /** Used for built-in method references. */
  var objectProto$5 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$5 = objectProto$5.hasOwnProperty;

  /**
   * Checks if a hash value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Hash
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function hashHas(key) {
    var data = this.__data__;
    return _nativeCreate ? (data[key] !== undefined) : hasOwnProperty$5.call(data, key);
  }

  var _hashHas = hashHas;

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

  /**
   * Sets the hash `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf Hash
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the hash instance.
   */
  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = (_nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
    return this;
  }

  var _hashSet = hashSet;

  /**
   * Creates a hash object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Hash(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `Hash`.
  Hash.prototype.clear = _hashClear;
  Hash.prototype['delete'] = _hashDelete;
  Hash.prototype.get = _hashGet;
  Hash.prototype.has = _hashHas;
  Hash.prototype.set = _hashSet;

  var _Hash = Hash;

  /**
   * Removes all key-value entries from the list cache.
   *
   * @private
   * @name clear
   * @memberOf ListCache
   */
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }

  var _listCacheClear = listCacheClear;

  /**
   * Performs a
   * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
   * comparison between two values to determine if they are equivalent.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to compare.
   * @param {*} other The other value to compare.
   * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
   * @example
   *
   * var object = { 'a': 1 };
   * var other = { 'a': 1 };
   *
   * _.eq(object, object);
   * // => true
   *
   * _.eq(object, other);
   * // => false
   *
   * _.eq('a', 'a');
   * // => true
   *
   * _.eq('a', Object('a'));
   * // => false
   *
   * _.eq(NaN, NaN);
   * // => true
   */
  function eq(value, other) {
    return value === other || (value !== value && other !== other);
  }

  var eq_1 = eq;

  /**
   * Gets the index at which the `key` is found in `array` of key-value pairs.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} key The key to search for.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq_1(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }

  var _assocIndexOf = assocIndexOf;

  /** Used for built-in method references. */
  var arrayProto = Array.prototype;

  /** Built-in value references. */
  var splice = arrayProto.splice;

  /**
   * Removes `key` and its value from the list cache.
   *
   * @private
   * @name delete
   * @memberOf ListCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function listCacheDelete(key) {
    var data = this.__data__,
        index = _assocIndexOf(data, key);

    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    --this.size;
    return true;
  }

  var _listCacheDelete = listCacheDelete;

  /**
   * Gets the list cache value for `key`.
   *
   * @private
   * @name get
   * @memberOf ListCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function listCacheGet(key) {
    var data = this.__data__,
        index = _assocIndexOf(data, key);

    return index < 0 ? undefined : data[index][1];
  }

  var _listCacheGet = listCacheGet;

  /**
   * Checks if a list cache value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf ListCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function listCacheHas(key) {
    return _assocIndexOf(this.__data__, key) > -1;
  }

  var _listCacheHas = listCacheHas;

  /**
   * Sets the list cache `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf ListCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the list cache instance.
   */
  function listCacheSet(key, value) {
    var data = this.__data__,
        index = _assocIndexOf(data, key);

    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }

  var _listCacheSet = listCacheSet;

  /**
   * Creates an list cache object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function ListCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `ListCache`.
  ListCache.prototype.clear = _listCacheClear;
  ListCache.prototype['delete'] = _listCacheDelete;
  ListCache.prototype.get = _listCacheGet;
  ListCache.prototype.has = _listCacheHas;
  ListCache.prototype.set = _listCacheSet;

  var _ListCache = ListCache;

  /* Built-in method references that are verified to be native. */
  var Map = _getNative(_root, 'Map');

  var _Map = Map;

  /**
   * Removes all key-value entries from the map.
   *
   * @private
   * @name clear
   * @memberOf MapCache
   */
  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      'hash': new _Hash,
      'map': new (_Map || _ListCache),
      'string': new _Hash
    };
  }

  var _mapCacheClear = mapCacheClear;

  /**
   * Checks if `value` is suitable for use as unique object key.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
   */
  function isKeyable(value) {
    var type = typeof value;
    return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
        ? (value !== '__proto__')
        : (value === null);
  }

  var _isKeyable = isKeyable;

  /**
   * Gets the data for `map`.
   *
   * @private
   * @param {Object} map The map to query.
   * @param {string} key The reference key.
   * @returns {*} Returns the map data.
   */
  function getMapData(map, key) {
    var data = map.__data__;
    return _isKeyable(key)
        ? data[typeof key == 'string' ? 'string' : 'hash']
        : data.map;
  }

  var _getMapData = getMapData;

  /**
   * Removes `key` and its value from the map.
   *
   * @private
   * @name delete
   * @memberOf MapCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function mapCacheDelete(key) {
    var result = _getMapData(this, key)['delete'](key);
    this.size -= result ? 1 : 0;
    return result;
  }

  var _mapCacheDelete = mapCacheDelete;

  /**
   * Gets the map value for `key`.
   *
   * @private
   * @name get
   * @memberOf MapCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function mapCacheGet(key) {
    return _getMapData(this, key).get(key);
  }

  var _mapCacheGet = mapCacheGet;

  /**
   * Checks if a map value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf MapCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function mapCacheHas(key) {
    return _getMapData(this, key).has(key);
  }

  var _mapCacheHas = mapCacheHas;

  /**
   * Sets the map `key` to `value`.
   *
   * @private
   * @name set
   * @memberOf MapCache
   * @param {string} key The key of the value to set.
   * @param {*} value The value to set.
   * @returns {Object} Returns the map cache instance.
   */
  function mapCacheSet(key, value) {
    var data = _getMapData(this, key),
        size = data.size;

    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }

  var _mapCacheSet = mapCacheSet;

  /**
   * Creates a map cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function MapCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `MapCache`.
  MapCache.prototype.clear = _mapCacheClear;
  MapCache.prototype['delete'] = _mapCacheDelete;
  MapCache.prototype.get = _mapCacheGet;
  MapCache.prototype.has = _mapCacheHas;
  MapCache.prototype.set = _mapCacheSet;

  var _MapCache = MapCache;

  /** Error message constants. */
  var FUNC_ERROR_TEXT = 'Expected a function';

  /**
   * Creates a function that memoizes the result of `func`. If `resolver` is
   * provided, it determines the cache key for storing the result based on the
   * arguments provided to the memoized function. By default, the first argument
   * provided to the memoized function is used as the map cache key. The `func`
   * is invoked with the `this` binding of the memoized function.
   *
   * **Note:** The cache is exposed as the `cache` property on the memoized
   * function. Its creation may be customized by replacing the `_.memoize.Cache`
   * constructor with one whose instances implement the
   * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
   * method interface of `clear`, `delete`, `get`, `has`, and `set`.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Function
   * @param {Function} func The function to have its output memoized.
   * @param {Function} [resolver] The function to resolve the cache key.
   * @returns {Function} Returns the new memoized function.
   * @example
   *
   * var object = { 'a': 1, 'b': 2 };
   * var other = { 'c': 3, 'd': 4 };
   *
   * var values = _.memoize(_.values);
   * values(object);
   * // => [1, 2]
   *
   * values(other);
   * // => [3, 4]
   *
   * object.a = 2;
   * values(object);
   * // => [1, 2]
   *
   * // Modify the result cache.
   * values.cache.set(object, ['a', 'b']);
   * values(object);
   * // => ['a', 'b']
   *
   * // Replace `_.memoize.Cache`.
   * _.memoize.Cache = WeakMap;
   */
  function memoize(func, resolver) {
    if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    var memoized = function() {
      var args = arguments,
          key = resolver ? resolver.apply(this, args) : args[0],
          cache = memoized.cache;

      if (cache.has(key)) {
        return cache.get(key);
      }
      var result = func.apply(this, args);
      memoized.cache = cache.set(key, result) || cache;
      return result;
    };
    memoized.cache = new (memoize.Cache || _MapCache);
    return memoized;
  }

  // Expose `MapCache`.
  memoize.Cache = _MapCache;

  var memoize_1 = memoize;

  /** Used as the maximum memoize cache size. */
  var MAX_MEMOIZE_SIZE = 500;

  /**
   * A specialized version of `_.memoize` which clears the memoized function's
   * cache when it exceeds `MAX_MEMOIZE_SIZE`.
   *
   * @private
   * @param {Function} func The function to have its output memoized.
   * @returns {Function} Returns the new memoized function.
   */
  function memoizeCapped(func) {
    var result = memoize_1(func, function(key) {
      if (cache.size === MAX_MEMOIZE_SIZE) {
        cache.clear();
      }
      return key;
    });

    var cache = result.cache;
    return result;
  }

  var _memoizeCapped = memoizeCapped;

  /** Used to match property names within property paths. */
  var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

  /** Used to match backslashes in property paths. */
  var reEscapeChar = /\\(\\)?/g;

  /**
   * Converts `string` to a property path array.
   *
   * @private
   * @param {string} string The string to convert.
   * @returns {Array} Returns the property path array.
   */
  var stringToPath = _memoizeCapped(function(string) {
    var result = [];
    if (string.charCodeAt(0) === 46 /* . */) {
      result.push('');
    }
    string.replace(rePropName, function(match, number, quote, subString) {
      result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
    });
    return result;
  });

  var _stringToPath = stringToPath;

  /**
   * A specialized version of `_.map` for arrays without support for iteratee
   * shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the new mapped array.
   */
  function arrayMap(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length,
        result = Array(length);

    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }

  var _arrayMap = arrayMap;

  /** Used as references for various `Number` constants. */
  var INFINITY = 1 / 0;

  /** Used to convert symbols to primitives and strings. */
  var symbolProto = _Symbol ? _Symbol.prototype : undefined,
      symbolToString = symbolProto ? symbolProto.toString : undefined;

  /**
   * The base implementation of `_.toString` which doesn't convert nullish
   * values to empty strings.
   *
   * @private
   * @param {*} value The value to process.
   * @returns {string} Returns the string.
   */
  function baseToString(value) {
    // Exit early for strings to avoid a performance hit in some environments.
    if (typeof value == 'string') {
      return value;
    }
    if (isArray_1(value)) {
      // Recursively convert values (susceptible to call stack limits).
      return _arrayMap(value, baseToString) + '';
    }
    if (isSymbol_1(value)) {
      return symbolToString ? symbolToString.call(value) : '';
    }
    var result = (value + '');
    return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
  }

  var _baseToString = baseToString;

  /**
   * Converts `value` to a string. An empty string is returned for `null`
   * and `undefined` values. The sign of `-0` is preserved.
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   * @example
   *
   * _.toString(null);
   * // => ''
   *
   * _.toString(-0);
   * // => '-0'
   *
   * _.toString([1, 2, 3]);
   * // => '1,2,3'
   */
  function toString$1(value) {
    return value == null ? '' : _baseToString(value);
  }

  var toString_1 = toString$1;

  /**
   * Casts `value` to a path array if it's not one.
   *
   * @private
   * @param {*} value The value to inspect.
   * @param {Object} [object] The object to query keys on.
   * @returns {Array} Returns the cast property path array.
   */
  function castPath(value, object) {
    if (isArray_1(value)) {
      return value;
    }
    return _isKey(value, object) ? [value] : _stringToPath(toString_1(value));
  }

  var _castPath = castPath;

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]';

  /**
   * The base implementation of `_.isArguments`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   */
  function baseIsArguments(value) {
    return isObjectLike_1(value) && _baseGetTag(value) == argsTag;
  }

  var _baseIsArguments = baseIsArguments;

  /** Used for built-in method references. */
  var objectProto$6 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$6 = objectProto$6.hasOwnProperty;

  /** Built-in value references. */
  var propertyIsEnumerable = objectProto$6.propertyIsEnumerable;

  /**
   * Checks if `value` is likely an `arguments` object.
   *
   * @static
   * @memberOf _
   * @since 0.1.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   *  else `false`.
   * @example
   *
   * _.isArguments(function() { return arguments; }());
   * // => true
   *
   * _.isArguments([1, 2, 3]);
   * // => false
   */
  var isArguments = _baseIsArguments(function() { return arguments; }()) ? _baseIsArguments : function(value) {
    return isObjectLike_1(value) && hasOwnProperty$6.call(value, 'callee') &&
        !propertyIsEnumerable.call(value, 'callee');
  };

  var isArguments_1 = isArguments;

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER = 9007199254740991;

  /** Used to detect unsigned integer values. */
  var reIsUint = /^(?:0|[1-9]\d*)$/;

  /**
   * Checks if `value` is a valid array-like index.
   *
   * @private
   * @param {*} value The value to check.
   * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
   * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
   */
  function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER : length;

    return !!length &&
        (type == 'number' ||
            (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
  }

  var _isIndex = isIndex;

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER$1 = 9007199254740991;

  /**
   * Checks if `value` is a valid array-like length.
   *
   * **Note:** This method is loosely based on
   * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
   *
   * @static
   * @memberOf _
   * @since 4.0.0
   * @category Lang
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
   * @example
   *
   * _.isLength(3);
   * // => true
   *
   * _.isLength(Number.MIN_VALUE);
   * // => false
   *
   * _.isLength(Infinity);
   * // => false
   *
   * _.isLength('3');
   * // => false
   */
  function isLength(value) {
    return typeof value == 'number' &&
        value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
  }

  var isLength_1 = isLength;

  /** Used as references for various `Number` constants. */
  var INFINITY$1 = 1 / 0;

  /**
   * Converts `value` to a string key if it's not a string or symbol.
   *
   * @private
   * @param {*} value The value to inspect.
   * @returns {string|symbol} Returns the key.
   */
  function toKey(value) {
    if (typeof value == 'string' || isSymbol_1(value)) {
      return value;
    }
    var result = (value + '');
    return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
  }

  var _toKey = toKey;

  /**
   * Checks if `path` exists on `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @param {Function} hasFunc The function to check properties.
   * @returns {boolean} Returns `true` if `path` exists, else `false`.
   */
  function hasPath(object, path, hasFunc) {
    path = _castPath(path, object);

    var index = -1,
        length = path.length,
        result = false;

    while (++index < length) {
      var key = _toKey(path[index]);
      if (!(result = object != null && hasFunc(object, key))) {
        break;
      }
      object = object[key];
    }
    if (result || ++index != length) {
      return result;
    }
    length = object == null ? 0 : object.length;
    return !!length && isLength_1(length) && _isIndex(key, length) &&
        (isArray_1(object) || isArguments_1(object));
  }

  var _hasPath = hasPath;

  /**
   * Checks if `path` is a direct property of `object`.
   *
   * @static
   * @since 0.1.0
   * @memberOf _
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path to check.
   * @returns {boolean} Returns `true` if `path` exists, else `false`.
   * @example
   *
   * var object = { 'a': { 'b': 2 } };
   * var other = _.create({ 'a': _.create({ 'b': 2 }) });
   *
   * _.has(object, 'a');
   * // => true
   *
   * _.has(object, 'a.b');
   * // => true
   *
   * _.has(object, ['a', 'b']);
   * // => true
   *
   * _.has(other, 'a');
   * // => false
   */
  function has(object, path) {
    return object != null && _hasPath(object, path, _baseHas);
  }

  var has_1 = has;

  /**
   * The base implementation of `_.get` without support for default values.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @returns {*} Returns the resolved value.
   */
  function baseGet(object, path) {
    path = _castPath(path, object);

    var index = 0,
        length = path.length;

    while (object != null && index < length) {
      object = object[_toKey(path[index++])];
    }
    return (index && index == length) ? object : undefined;
  }

  var _baseGet = baseGet;

  /**
   * Gets the value at `path` of `object`. If the resolved value is
   * `undefined`, the `defaultValue` is returned in its place.
   *
   * @static
   * @memberOf _
   * @since 3.7.0
   * @category Object
   * @param {Object} object The object to query.
   * @param {Array|string} path The path of the property to get.
   * @param {*} [defaultValue] The value returned for `undefined` resolved values.
   * @returns {*} Returns the resolved value.
   * @example
   *
   * var object = { 'a': [{ 'b': { 'c': 3 } }] };
   *
   * _.get(object, 'a[0].b.c');
   * // => 3
   *
   * _.get(object, ['a', '0', 'b', 'c']);
   * // => 3
   *
   * _.get(object, 'a.b.c', 'default');
   * // => 'default'
   */
  function get(object, path, defaultValue) {
    var result = object == null ? undefined : _baseGet(object, path);
    return result === undefined ? defaultValue : result;
  }

  var get_1 = get;

  /**
   *
   *
   * @author Jerry Bendy <jerry@icewingcc.com>
   * @licence MIT
   *
   */

  (function(self) {

    var nativeURLSearchParams = (self.URLSearchParams && self.URLSearchParams.prototype.get) ? self.URLSearchParams : null,
        isSupportObjectConstructor = nativeURLSearchParams && (new nativeURLSearchParams({a: 1})).toString() === 'a=1',
        // There is a bug in safari 10.1 (and earlier) that incorrectly decodes `%2B` as an empty space and not a plus.
        decodesPlusesCorrectly = nativeURLSearchParams && (new nativeURLSearchParams('s=%2B').get('s') === '+'),
        __URLSearchParams__ = "__URLSearchParams__",
        // Fix bug in Edge which cannot encode ' &' correctly
        encodesAmpersandsCorrectly = nativeURLSearchParams ? (function() {
          var ampersandTest = new nativeURLSearchParams();
          ampersandTest.append('s', ' &');
          return ampersandTest.toString() === 's=+%26';
        })() : true,
        prototype = URLSearchParamsPolyfill.prototype,
        iterable = !!(self.Symbol && self.Symbol.iterator);

    if (nativeURLSearchParams && isSupportObjectConstructor && decodesPlusesCorrectly && encodesAmpersandsCorrectly) {
      return;
    }


    /**
     * Make a URLSearchParams instance
     *
     * @param {object|string|URLSearchParams} search
     * @constructor
     */
    function URLSearchParamsPolyfill(search) {
      search = search || "";

      // support construct object with another URLSearchParams instance
      if (search instanceof URLSearchParams || search instanceof URLSearchParamsPolyfill) {
        search = search.toString();
      }
      this [__URLSearchParams__] = parseToDict(search);
    }


    /**
     * Appends a specified key/value pair as a new search parameter.
     *
     * @param {string} name
     * @param {string} value
     */
    prototype.append = function(name, value) {
      appendTo(this [__URLSearchParams__], name, value);
    };

    /**
     * Deletes the given search parameter, and its associated value,
     * from the list of all search parameters.
     *
     * @param {string} name
     */
    prototype['delete'] = function(name) {
      delete this [__URLSearchParams__] [name];
    };

    /**
     * Returns the first value associated to the given search parameter.
     *
     * @param {string} name
     * @returns {string|null}
     */
    prototype.get = function(name) {
      var dict = this [__URLSearchParams__];
      return name in dict ? dict[name][0] : null;
    };

    /**
     * Returns all the values association with a given search parameter.
     *
     * @param {string} name
     * @returns {Array}
     */
    prototype.getAll = function(name) {
      var dict = this [__URLSearchParams__];
      return name in dict ? dict [name].slice(0) : [];
    };

    /**
     * Returns a Boolean indicating if such a search parameter exists.
     *
     * @param {string} name
     * @returns {boolean}
     */
    prototype.has = function(name) {
      return name in this [__URLSearchParams__];
    };

    /**
     * Sets the value associated to a given search parameter to
     * the given value. If there were several values, delete the
     * others.
     *
     * @param {string} name
     * @param {string} value
     */
    prototype.set = function set(name, value) {
      this [__URLSearchParams__][name] = ['' + value];
    };

    /**
     * Returns a string containg a query string suitable for use in a URL.
     *
     * @returns {string}
     */
    prototype.toString = function() {
      var dict = this[__URLSearchParams__], query = [], i, key, name, value;
      for (key in dict) {
        name = encode(key);
        for (i = 0, value = dict[key]; i < value.length; i++) {
          query.push(name + '=' + encode(value[i]));
        }
      }
      return query.join('&');
    };

    // There is a bug in Safari 10.1 and `Proxy`ing it is not enough.
    var forSureUsePolyfill = !decodesPlusesCorrectly;
    var useProxy = (!forSureUsePolyfill && nativeURLSearchParams && !isSupportObjectConstructor && self.Proxy);
    /*
       * Apply polifill to global object and append other prototype into it
       */
    Object.defineProperty(self, 'URLSearchParams', {
      value: (useProxy ?
          // Safari 10.0 doesn't support Proxy, so it won't extend URLSearchParams on safari 10.0
          new Proxy(nativeURLSearchParams, {
            construct: function(target, args) {
              return new target((new URLSearchParamsPolyfill(args[0]).toString()));
            }
          }) :
          URLSearchParamsPolyfill)
    });

    var USPProto = self.URLSearchParams.prototype;

    USPProto.polyfill = true;

    /**
     *
     * @param {function} callback
     * @param {object} thisArg
     */
    USPProto.forEach = USPProto.forEach || function(callback, thisArg) {
      var dict = parseToDict(this.toString());
      Object.getOwnPropertyNames(dict).forEach(function(name) {
        dict[name].forEach(function(value) {
          callback.call(thisArg, value, name, this);
        }, this);
      }, this);
    };

    /**
     * Sort all name-value pairs
     */
    USPProto.sort = USPProto.sort || function() {
      var dict = parseToDict(this.toString()), keys = [], k, i, j;
      for (k in dict) {
        keys.push(k);
      }
      keys.sort();

      for (i = 0; i < keys.length; i++) {
        this['delete'](keys[i]);
      }
      for (i = 0; i < keys.length; i++) {
        var key = keys[i], values = dict[key];
        for (j = 0; j < values.length; j++) {
          this.append(key, values[j]);
        }
      }
    };

    /**
     * Returns an iterator allowing to go through all keys of
     * the key/value pairs contained in this object.
     *
     * @returns {function}
     */
    USPProto.keys = USPProto.keys || function() {
      var items = [];
      this.forEach(function(item, name) {
        items.push(name);
      });
      return makeIterator(items);
    };

    /**
     * Returns an iterator allowing to go through all values of
     * the key/value pairs contained in this object.
     *
     * @returns {function}
     */
    USPProto.values = USPProto.values || function() {
      var items = [];
      this.forEach(function(item) {
        items.push(item);
      });
      return makeIterator(items);
    };

    /**
     * Returns an iterator allowing to go through all key/value
     * pairs contained in this object.
     *
     * @returns {function}
     */
    USPProto.entries = USPProto.entries || function() {
      var items = [];
      this.forEach(function(item, name) {
        items.push([name, item]);
      });
      return makeIterator(items);
    };


    if (iterable) {
      USPProto[self.Symbol.iterator] = USPProto[self.Symbol.iterator] || USPProto.entries;
    }


    function encode(str) {
      var replace = {
        '!': '%21',
        "'": '%27',
        '(': '%28',
        ')': '%29',
        '~': '%7E',
        '%20': '+',
        '%00': '\x00'
      };
      return encodeURIComponent(str).replace(/[!'\(\)~]|%20|%00/g, function(match) {
        return replace[match];
      });
    }

    function decode(str) {
      return str
          .replace(/[ +]/g, '%20')
          .replace(/(%[a-f0-9]{2})+/ig, function(match) {
            return decodeURIComponent(match);
          });
    }

    function makeIterator(arr) {
      var iterator = {
        next: function() {
          var value = arr.shift();
          return {done: value === undefined, value: value};
        }
      };

      if (iterable) {
        iterator[self.Symbol.iterator] = function() {
          return iterator;
        };
      }

      return iterator;
    }

    function parseToDict(search) {
      var dict = {};

      if (typeof search === "object") {
        // if `search` is an array, treat it as a sequence
        if (isArray(search)) {
          for (var i = 0; i < search.length; i++) {
            var item = search[i];
            if (isArray(item) && item.length === 2) {
              appendTo(dict, item[0], item[1]);
            } else {
              throw new TypeError("Failed to construct 'URLSearchParams': Sequence initializer must only contain pair elements");
            }
          }

        } else {
          for (var key in search) {
            if (search.hasOwnProperty(key)) {
              appendTo(dict, key, search[key]);
            }
          }
        }

      } else {
        // remove first '?'
        if (search.indexOf("?") === 0) {
          search = search.slice(1);
        }

        var pairs = search.split("&");
        for (var j = 0; j < pairs.length; j++) {
          var value = pairs [j],
              index = value.indexOf('=');

          if (-1 < index) {
            appendTo(dict, decode(value.slice(0, index)), decode(value.slice(index + 1)));

          } else {
            if (value) {
              appendTo(dict, decode(value), '');
            }
          }
        }
      }

      return dict;
    }

    function appendTo(dict, name, value) {
      var val = typeof value === 'string' ? value : (
          value !== null && value !== undefined && typeof value.toString === 'function' ? value.toString() : JSON.stringify(value)
      );

      if (name in dict) {
        dict[name].push(val);
      } else {
        dict[name] = [val];
      }
    }

    function isArray(val) {
      return !!val && '[object Array]' === Object.prototype.toString.call(val);
    }

  })(typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : (typeof window !== 'undefined' ? window : commonjsGlobal));

  var addressToolsMixin = function addressToolsMixin(Base) {
    var _temp;

    return _temp =
        /*#__PURE__*/
        function (_Base) {
          inherits(_temp, _Base);

          function _temp($element, _options) {
            var _this;

            classCallCheck(this, _temp);

            _this = possibleConstructorReturn(this, getPrototypeOf(_temp).call(this, $element, _options));

            defineProperty(assertThisInitialized(assertThisInitialized(_this)), "initRequestSequence", function () {
              _this.seq = 0;
              _this.lastSeq = 0;
            });

            defineProperty(assertThisInitialized(assertThisInitialized(_this)), "beforeSend", function (jqXHR, options) {
              var urlParams = new URLSearchParams(options.url);
              jqXHR.lookup = urlParams.get('lookup');
              jqXHR.seq = _this.seq;
              _this.seq++;
              $(document).trigger('afd:pceLookupStarted', [jqXHR, urlParams.get('lookup')]);
            });

            defineProperty(assertThisInitialized(assertThisInitialized(_this)), "requestCallback", function (data, textStatus, jqXHR) {
              $(document).trigger('afd:pceLookupComplete', [data, jqXHR, jqXHR.lookup]);
            });

            defineProperty(assertThisInitialized(assertThisInitialized(_this)), "refreshUniqeID", function () {
              _this.uniqueID = _this.getUniqueID();
            });

            defineProperty(assertThisInitialized(assertThisInitialized(_this)), "getUniqueID", function () {
              return Math.floor(Math.random() * 90000) + 10000;
            });

            defineProperty(assertThisInitialized(assertThisInitialized(_this)), "uniqueIDTimer", function () {
              if (_this.timer) {
                window.clearTimeout(_this.timer);
              } // timer for changing unique id


              _this.timer = window.setTimeout(function () {
                _this.timer = null; // get a new unique id

                _this.refreshUniqeID();

                if (typeof _this.$element.typeahead !== 'undefined') {
                  // we have to reinitialise the control with the new uniqueid, however doing this overwrites and results
                  // this breaks navigation if a 5 second delay happens after navigation, so we need to reinput the old results
                  var _window$Typeahead$inp = window.Typeahead.input,
                      result = _window$Typeahead$inp.result,
                      resultContainer = _window$Typeahead$inp.resultContainer;

                  _this.$element.typeahead(_this.typeaheadOptions);

                  window.Typeahead.input.result = result;
                  window.Typeahead.input.resultContainer = resultContainer;
                }
              }, 5000);
            });

            defineProperty(assertThisInitialized(assertThisInitialized(_this)), "setFields", function () {
              var controlType = _this.controlType;
              _this.$typeaheadFieldandLabel = get_1(_this.options, controlType + '.containerOnlyContainsControl', false) ? _this.$typeaheadFieldandLabel = $('.afd-typeahead-container') : _this.$typeaheadFieldandLabel = $('.afd-typeahead-container label, .afd-typeahead-field');
              _this.$typeAheadInput = $('.afd-typeahead-container input');
              _this.$resultFields = $('[data-afd-result]');
              _this.$typeaheadContainer = $('.afd-typeahead-container');
              _this.$manualInputButton = has_1(_this.options, controlType + '.manualInputButtonIdentifier') ? $(_this.options[controlType].manualInputButtonIdentifier) : $('.afd-manual-input-button');
              _this.$manualInputSearchButton = has_1(_this.options, controlType + '.manualInputSearchButtonIdentifier') ? $(_this.options[controlType].manualInputSearchButtonIdentifier) : $('.afd-manual-input-search-button');
              _this.$searchAgainButton = has_1(_this.options, controlType + '.searchAgainButtonIdentifier') ? $(_this.options[controlType].searchAgainButtonIdentifier) : $('.afd-search-again');
              _this.$fieldSets = $(_this.options[controlType].fieldSets.toString());
              _this.$customCountryField = _this.options.country.customCountryControl ? $(_this.options.country.customCountryControl) : null;
              _this.containers = _this.options[controlType].containers.toString();
              _this.multiForms = _this.containers.length > 0; // If a non-afd country control is supplied then listen for changes and fire change event

              if (_this.$customCountryField) {
                if (_this.$customCountryField.length === 0) {
                  throw 'Custom country field selector ' + _this.options.country.customCountryControl + ' supplied, but no matching control found.';
                }

                _this.$customCountryField.off('change.afd', _this.onCustomCountryChange).on('change.afd', _this.onCustomCountryChange);
              }
            });

            defineProperty(assertThisInitialized(assertThisInitialized(_this)), "initFields", function () {
              var controlType = _this.controlType;

              _this.handleMultiForms();

              _this.$typeaheadFieldandLabel.show();

              var fieldSets = _this.options[controlType].fieldSets; // show or hide the manual input button
              // hide or show controls based on the country - also returns country

              var country = _this.getInitialCountry(); // if set to hide result fields beforehand


              if (_this.options[controlType].beforeHideResults) {
                _this.$manualInputSearchButton.hide();

                _this.hideResultFields(country);

                if (fieldSets.length > 0) {
                  for (var i = 0; i < fieldSets.length; i++) {
                    $(fieldSets[i]).hide();
                  }
                }
              } else {
                _this.showResultFields();

                if (fieldSets.length > 0) {
                  for (var _i = 0; _i < fieldSets.length; _i++) {
                    $(fieldSets[_i]).show();
                  }
                }
              } // If option is set, show fields of not empty regardless of what is set on beforeHideResults
              // this setting is useful when you are editing a previous address and you want to still show the previous values


              if (_this.options[controlType].notEmptyShowResults) {
                var container = _this.$element.closest(_this.containers);

                var allEmpty = !_this.multiForms ? $('[data-afd-result]:empty').filter(function () {
                  return $.trim($(this).val()).length !== 0;
                }).length === 0 : container.find('[data-afd-result]:empty').filter(function () {
                  return $.trim($(this).val()).length !== 0;
                }).length === 0;

                if (!allEmpty) {
                  _this.showResultFields();

                  _this.$fieldSets.show();

                  _this.$manualInputButton.hide();
                }
              }
            });

            defineProperty(assertThisInitialized(assertThisInitialized(_this)), "handleMultiForms", function () {
              // this function handles the fact that their may be multiple forms on a single page
              var controlType = _this.controlType; // if the containers array lists containers, we need to make sure that only fields in the containers are initialised

              var container = _this.$element.closest(_this.containers);

              if (_this.multiForms) {
                _this.$manualInputButton = has_1(_this.options, controlType + '.manualInputButtonIdentifier') ? container.find(_this.options[controlType].manualInputButtonIdentifier) : container.find('.afd-manual-input-button');
                _this.$manualInputSearchButton = has_1(_this.options, controlType + '.manualInputSearchButtonIdentifier') ? container.find(_this.options[controlType].manualInputSearchButtonIdentifier) : container.find('.afd-manual-input-search-button');
                _this.$searchAgainButton = has_1(_this.options, controlType + '.searchAgainButtonIdentifier') ? container.find(_this.options[controlType].searchAgainButtonIdentifier) : container.find('.afd-search-again');
                _this.$resultFields = container.find('[data-afd-result]');
                _this.$typeaheadFieldandLabel = get_1(_this.options, controlType + '.containerOnlyContainsControl', false) ? container.find('.afd-typeahead-container') : container.find('.afd-typeahead-container > label, .afd-typeahead-field');
                _this.$typeaheadContainer = container.find('.afd-typeahead-container');
                _this.$customCountryField = _this.options.country.customCountryControl ? container.find(_this.options.country.customCountryControl) : null;
                _this.$fieldSets = container.find(_this.options[controlType].fieldSets.toString());
              }
            });

            defineProperty(assertThisInitialized(assertThisInitialized(_this)), "addressLookup", function (lookup) {
              var controlType = _this.controlType;

              var requestOptions = _this.setupParams({
                data: 'address',
                task: 'fastfindv4',
                fields: _this.options[controlType].postcodeFirst ? 'list' : 'fflist',
                uniqueid: _this.uniqueID,
                lookup: lookup,
                allpc: '1'
              }); // for afd website


              if (_this.options.afdc === 1) {
                requestOptions.data.afdc = 1;
              }

              return $.ajax(requestOptions);
            });

            defineProperty(assertThisInitialized(assertThisInitialized(_this)), "addressRetrieve", function (key) {
              var requestOptions = _this.setupParams({
                key: key,
                data: 'address',
                task: 'retrieve',
                fields: _this.options[_this.controlType].retrieveFields
              });

              if (_this.options.afdc === 1) {
                requestOptions.data.afdc = 1;
              }

              return $.ajax(requestOptions);
            });

            defineProperty(assertThisInitialized(assertThisInitialized(_this)), "reverseGeocodeLookup", function (coords) {
              var controlType = _this.controlType;

              var requestOptions = _this.setupParams({
                data: 'address',
                task: 'nearest',
                fields: _this.options[controlType].postcodeFirst ? 'list' : 'fflist',
                uniqueid: _this.uniqueID,
                longitude: coords.longitude,
                latitude: coords.latitude,
                allpc: '1'
              }); // for afd website


              if (_this.options.afdc === 1) {
                requestOptions.data.afdc = 1;
              }

              return $.ajax(requestOptions);
            });

            defineProperty(assertThisInitialized(assertThisInitialized(_this)), "handleAddressRetrieve", function (data) {
              var controlType = _this.controlType;

              if (typeof data.Item === 'undefined') {
                return;
              }

              var _data$Item = slicedToArray(data.Item, 1);

              _this.result = _data$Item[0];
              $(document).trigger('afd:pceRetrieveComplete', [_this.result]); // hide the manual input after search completed

              _this.$manualInputButton.hide(); // Clear the typeahead if option set


              if (_this.options[controlType].afterClearTypeahead) {
                _this.$typeAheadInput.val('');
              } // Hide typeahed if option set


              if (_this.options[controlType].afterHideTypeahead) {
                _this.$typeaheadFieldandLabel.hide(); // Show search again if set


                if (_this.options[controlType].searchAgain) {
                  _this.$searchAgainButton.show();
                }
              } // Hide lookup button if option set


              if (_this.options[controlType].afterHideLookupButton) {
                _this.$lookupButton.hide(); // Show search again if set


                if (_this.options[controlType].searchAgain) {
                  _this.$searchAgainButton.show();
                }
              }

              _this.$fieldSets.show();

              if (_this.$resultFields.length < 1) {
                return;
              }

              _this.$resultFields.each(_this.populateResult);

              _this.$typeAheadInput.blur();
            });

            defineProperty(assertThisInitialized(assertThisInitialized(_this)), "populateResult", function (index) {
              var $el = $(_this.$resultFields[index]);
              var fieldName = $el.data('afd-result');
              var controlType = _this.controlType; // if pushup option is turned off, just fill out the form

              if (!_this.options[controlType].pushUp) {
                $el.val(_this.result[fieldName]);
              } else if (fieldName === 'Property' && _this.fieldEmpty('Property')) {
                $el.val(_this.result.Street);
              } else if (fieldName === 'Building' && _this.fieldEmpty('Building')) {
                $el.val(_this.result.Street);
              } else if (fieldName === 'Street' && _this.fieldEmpty('Property')) {
                $el.val(_this.result.Locality);
              } else if (fieldName === 'Street' && _this.fieldEmpty('Building')) {
                $el.val(_this.result.Locality);
              } else if (fieldName === 'Locality' && _this.fieldEmpty('Property')) {
                $el.val('');
              } else if (fieldName === 'Locality' && _this.fieldEmpty('Building')) {
                $el.val('');
              } else if (fieldName === 'Street' && _this.fieldEmpty('Street')) {
                $el.val(_this.result.Locality);
              } else if (fieldName === 'Locality' && _this.fieldEmpty('Street')) {
                $el.val('');
              } else {
                $el.val(_this.result[fieldName]);
              } // logic for hiding empty fields


              if (!_this.options[controlType].hideEmpties || $el.val() && $el.val().length > 0) {
                if (_this.options[controlType].parentClass) {
                  $el.closest('.' + _this.options[controlType].parentClass).show();
                } else {
                  $el.show();
                }
              } else {
                if (_this.options[controlType].parentClass) {
                  $el.closest('.' + _this.options[controlType].parentClass).hide();
                } else {
                  $el.hide();
                }
              }

              _this.$fieldSets.show(); // manually triggering keyup on the field, without this some validators still think the field is empty


              $el.keyup();
              $(document).trigger('afd:populateResultsComplete');
            });

            defineProperty(assertThisInitialized(assertThisInitialized(_this)), "hideResultFields", function (country) {
              var controlType = _this.controlType; // only do this if the current control is visible - needed if both lookup and typeahead are on same form

              var controlRestricted = _this.options[controlType].showForCountries.length > 0 || _this.options[controlType].hideForCountries.length > 0;
              var controlVisible = !controlRestricted || _this.options[controlType].showForCountries.length > 0 && _this.options[controlType].showForCountries.indexOf(country) > -1 || _this.options[controlType].hideForCountries.length > 0 && _this.options[controlType].hideForCountries.indexOf(country) === -1;

              if (controlVisible) {
                // parentClass is for input containers which may include labels/validation etc
                if (_this.options[controlType].parentClass) {
                  _this.$resultFields.closest('.' + _this.options[controlType].parentClass).hide();
                } else {
                  _this.$resultFields.hide();
                }

                _this.$fieldSets.hide(); // only lookup


                var showPostcode = get_1(_this.options, controlType + '.postcodeIsLookup', false);

                if (showPostcode) {
                  if (_this.options[controlType].parentClass) {
                    $('[data-afd-result="Postcode"]').closest('.' + _this.options[controlType].parentClass).show();
                  } else {
                    $('[data-afd-result="Postcode"]').show();
                  }
                }
              }
            });

            defineProperty(assertThisInitialized(assertThisInitialized(_this)), "showResultFields", function () {
              var controlType = _this.controlType; // parentClass is for input containers whcih may include labels/validation etc

              if (_this.options[controlType].parentClass) {
                _this.$resultFields.closest('.' + _this.options[controlType].parentClass).show();
              } else {
                _this.$resultFields.show();
              }

              _this.$fieldSets.show();
            });

            defineProperty(assertThisInitialized(assertThisInitialized(_this)), "fieldEmpty", function (field) {
              return typeof _this.result[field] !== 'undefined' && _this.result[field].length === 0;
            });

            defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onAfdSearchAgainButtonClick", function () {
              var controlType = _this.controlType;

              _this.$resultFields.val('');

              _this.$searchAgainButton.hide();

              if (controlType === 'typeahead') {
                _this.$typeaheadFieldandLabel.show();
              } else if (controlType === 'lookup') {
                _this.$lookupButton.show();

                _this.$lookupField.focus();
              }

              if (_this.options[controlType].beforeHideResults) {
                _this.$manualInputButton.show();

                _this.hideResultFields(_this.country);

                _this.$fieldSets.hide();
              } else {
                _this.$manualInputButton.hide();

                _this.showResultFields();

                _this.$fieldSets.show();
              }
            });

            defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onAfdManualInputButtonClick", function () {
              var controlType = _this.controlType;

              _this.$manualInputButton.hide();

              _this.$manualInputSearchButton.show();

              if (controlType === 'typeahead') {
                _this.$typeaheadFieldandLabel.hide();
              } else {
                _this.$lookupButton.hide();
              }

              _this.showResultFields();

              if (_this.options[controlType].fieldSets.length > 0) {
                for (var i = 0; i < _this.options[controlType].fieldSets.length; i++) {
                  $(_this.options[controlType].fieldSets[i]).show();
                }
              }
            });

            defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onAfdManualInputSearchButtonClick", function () {
              var controlType = _this.controlType;

              if (controlType === 'typeahead') {
                _this.$typeaheadFieldandLabel.show();
              } else if (controlType === 'lookup') {
                _this.$lookupButton.show();
              }

              _this.$manualInputButton.show();

              _this.$manualInputSearchButton.hide();

              _this.hideResultFields(_this.country);

              _this.$fieldSets.hide();
            });

            defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onCustomCountryChange", function () {
              var country = _this.$customCountryField.val();

              if (_this.options.country.customCountryConverter) {
                if (typeof _this.options.country.customCountryConverter !== 'function') {
                  throw 'customCountryConverter Must be a function';
                }

                country = _this.options.country.customCountryConverter(country);
              }

              $(document).trigger('afd:countryChanged', [country]);
            });

            defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onCountryChanged", function (e, country) {
              _this.country = country;

              _this.handleHideShowControls(country);
            });

            defineProperty(assertThisInitialized(assertThisInitialized(_this)), "handleHideShowControls", function (country) {
              var controlType = _this.controlType;

              if (_this.options[controlType].hideForCountries.length > 0) {
                if (_this.options[controlType].hideForCountries.indexOf(country) > -1) {
                  _this.hideControls(controlType);
                } else {
                  _this.showControls(controlType);
                }
              }

              if (_this.options[controlType].showForCountries.length > 0) {
                if (_this.options[controlType].showForCountries.indexOf(country) > -1) {
                  _this.showControls(controlType);

                  if (_this.options[controlType].beforeHideResults) {
                    _this.$manualInputButton.show();

                    _this.hideResultFields(country);

                    _this.$fieldSets.hide();
                  } else {
                    _this.$manualInputButton.hide();

                    _this.showResultFields();

                    _this.$fieldSets.show();
                  }
                } else {
                  _this.hideControls(controlType);

                  _this.showResultFields();
                }
              }

              if (_this.options[controlType].hideForCountries.length === 0 && _this.options[controlType].showForCountries.length === 0) {
                _this.showControls(controlType);
              }
            });

            defineProperty(assertThisInitialized(assertThisInitialized(_this)), "showControls", function (controlType) {
              if (controlType === 'lookup') {
                _this.$lookupButton.closest('.afd-form-control').show();

                _this.$lookupField.closest('.afd-form-control').show();
              } else {
                _this.$typeaheadFieldandLabel.show();
              }

              if (_this.options[controlType].manualInputButton) {
                _this.$manualInputButton.show();
              }
            });

            defineProperty(assertThisInitialized(assertThisInitialized(_this)), "hideControls", function (controlType) {
              if (controlType === 'lookup') {
                _this.$lookupButton.closest('.afd-form-control').hide();

                _this.$lookupField.closest('.afd-form-control').hide();

                _this.$lookupResult.closest('.afd-form-control').hide();
              } else {
                _this.$typeaheadFieldandLabel.hide();
              }

              _this.$manualInputButton.hide();
            });

            defineProperty(assertThisInitialized(assertThisInitialized(_this)), "getInitialCountry", function () {
              var country = null;

              if (_this.$customCountryField) {
                country = _this.$customCountryField.val();

                if (_this.options.country.customCountryConverter) {
                  if (typeof _this.options.country.customCountryConverter !== 'function') {
                    throw 'customCountryConverter Must be a function';
                  }

                  country = _this.options.country.customCountryConverter(country);
                }

                _this.handleHideShowControls(country);
              } else if (_this.options.country.defaultCountry) {
                country = _this.options.country.defaultCountry;

                _this.handleHideShowControls(_this.options.country.defaultCountry);
              } else if (_this.options.defaultCountry) {
                country = _this.options.defaultCountry;

                _this.handleHideShowControls(_this.options.defaultCountry);
              }

              return country;
            });

            return _this;
          } // logic for identifying each different lookup so that old ones can be discarded if they come in too late


          return _temp;
        }(Base), _temp;
  };

  // @@match logic
  _fixReWks('match', 1, function (defined, MATCH, $match) {
    // 21.1.3.11 String.prototype.match(regexp)
    return [function match(regexp) {
      var O = defined(this);
      var fn = regexp == undefined ? undefined : regexp[MATCH];
      return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    }, $match];
  });

  var f$1 = {}.propertyIsEnumerable;

  var _objectPie = {
    f: f$1
  };

  // to indexed object, toObject with fallback for non-array-like ES3 strings


  var _toIobject = function (it) {
    return _iobject(_defined(it));
  };

  var gOPD = Object.getOwnPropertyDescriptor;

  var f$2 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
    O = _toIobject(O);
    P = _toPrimitive(P, true);
    if (_ie8DomDefine) try {
      return gOPD(O, P);
    } catch (e) { /* empty */ }
    if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
  };

  var _objectGopd = {
    f: f$2
  };

  // Works with __proto__ only. Old v8 can't work with null proto objects.
  /* eslint-disable no-proto */


  var check = function (O, proto) {
    _anObject(O);
    if (!_isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
  };
  var _setProto = {
    set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
        function (test, buggy, set) {
          try {
            set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
            set(test, []);
            buggy = !(test instanceof Array);
          } catch (e) { buggy = true; }
          return function setPrototypeOf(O, proto) {
            check(O, proto);
            if (buggy) O.__proto__ = proto;
            else set(O, proto);
            return O;
          };
        }({}, false) : undefined),
    check: check
  };

  var setPrototypeOf$1 = _setProto.set;
  var _inheritIfRequired = function (that, target, C) {
    var S = target.constructor;
    var P;
    if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && _isObject(P) && setPrototypeOf$1) {
      setPrototypeOf$1(that, P);
    } return that;
  };

  var max$1 = Math.max;
  var min$1 = Math.min;
  var _toAbsoluteIndex = function (index, length) {
    index = _toInteger(index);
    return index < 0 ? max$1(index + length, 0) : min$1(index, length);
  };

  // false -> Array#indexOf
  // true  -> Array#includes



  var _arrayIncludes = function (IS_INCLUDES) {
    return function ($this, el, fromIndex) {
      var O = _toIobject($this);
      var length = _toLength(O.length);
      var index = _toAbsoluteIndex(fromIndex, length);
      var value;
      // Array#includes uses SameValueZero equality algorithm
      // eslint-disable-next-line no-self-compare
      if (IS_INCLUDES && el != el) while (length > index) {
        value = O[index++];
        // eslint-disable-next-line no-self-compare
        if (value != value) return true;
        // Array#indexOf ignores holes, Array#includes - not
      } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
        if (O[index] === el) return IS_INCLUDES || index || 0;
      } return !IS_INCLUDES && -1;
    };
  };

  var shared = _shared('keys');

  var _sharedKey = function (key) {
    return shared[key] || (shared[key] = _uid(key));
  };

  var arrayIndexOf = _arrayIncludes(false);
  var IE_PROTO = _sharedKey('IE_PROTO');

  var _objectKeysInternal = function (object, names) {
    var O = _toIobject(object);
    var i = 0;
    var result = [];
    var key;
    for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
    // Don't enum bug & hidden keys
    while (names.length > i) if (_has(O, key = names[i++])) {
      ~arrayIndexOf(result, key) || result.push(key);
    }
    return result;
  };

  // IE 8- don't enum bug keys
  var _enumBugKeys = (
      'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
  ).split(',');

  // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

  var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

  var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
    return _objectKeysInternal(O, hiddenKeys);
  };

  var _objectGopn = {
    f: f$3
  };

  // 7.2.8 IsRegExp(argument)


  var MATCH = _wks('match');
  var _isRegexp = function (it) {
    var isRegExp;
    return _isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof(it) == 'RegExp');
  };

  var SPECIES$1 = _wks('species');

  var _setSpecies = function (KEY) {
    var C = _global[KEY];
    if (_descriptors && C && !C[SPECIES$1]) _objectDp.f(C, SPECIES$1, {
      configurable: true,
      get: function () { return this; }
    });
  };

  var dP$1 = _objectDp.f;
  var gOPN = _objectGopn.f;


  var $RegExp = _global.RegExp;
  var Base = $RegExp;
  var proto = $RegExp.prototype;
  var re1 = /a/g;
  var re2 = /a/g;
  // "new" creates a new object, old webkit buggy here
  var CORRECT_NEW = new $RegExp(re1) !== re1;

  if (_descriptors && (!CORRECT_NEW || _fails(function () {
    re2[_wks('match')] = false;
    // RegExp constructor can alter flags and IsRegExp works correct with @@match
    return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
  }))) {
    $RegExp = function RegExp(p, f) {
      var tiRE = this instanceof $RegExp;
      var piRE = _isRegexp(p);
      var fiU = f === undefined;
      return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
          : _inheritIfRequired(CORRECT_NEW
              ? new Base(piRE && !fiU ? p.source : p, f)
              : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? _flags.call(p) : f)
              , tiRE ? this : proto, $RegExp);
    };
    var proxy = function (key) {
      key in $RegExp || dP$1($RegExp, key, {
        configurable: true,
        get: function () { return Base[key]; },
        set: function (it) { Base[key] = it; }
      });
    };
    for (var keys = gOPN(Base), i$1 = 0; keys.length > i$1;) proxy(keys[i$1++]);
    proto.constructor = $RegExp;
    $RegExp.prototype = proto;
    _redefine(_global, 'RegExp', $RegExp);
  }

  _setSpecies('RegExp');

  var _strictMethod = function (method, arg) {
    return !!method && _fails(function () {
      // eslint-disable-next-line no-useless-call
      arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
    });
  };

  var $sort = [].sort;
  var test = [1, 2, 3];

  _export(_export.P + _export.F * (_fails(function () {
    // IE8-
    test.sort(undefined);
  }) || !_fails(function () {
    // V8 bug
    test.sort(null);
    // Old WebKit
  }) || !_strictMethod($sort)), 'Array', {
    // 22.1.3.25 Array.prototype.sort(comparefn)
    sort: function sort(comparefn) {
      return comparefn === undefined
          ? $sort.call(_toObject(this))
          : $sort.call(_toObject(this), _aFunction(comparefn));
    }
  });

  // @@split logic
  _fixReWks('split', 2, function (defined, SPLIT, $split) {
    var isRegExp = _isRegexp;
    var _split = $split;
    var $push = [].push;
    var $SPLIT = 'split';
    var LENGTH = 'length';
    var LAST_INDEX = 'lastIndex';
    if (
        'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
        'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
        'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
        '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
        '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
        ''[$SPLIT](/.?/)[LENGTH]
    ) {
      var NPCG = /()??/.exec('')[1] === undefined; // nonparticipating capturing group
      // based on es5-shim implementation, need to rework it
      $split = function (separator, limit) {
        var string = String(this);
        if (separator === undefined && limit === 0) return [];
        // If `separator` is not a regex, use native split
        if (!isRegExp(separator)) return _split.call(string, separator, limit);
        var output = [];
        var flags = (separator.ignoreCase ? 'i' : '') +
            (separator.multiline ? 'm' : '') +
            (separator.unicode ? 'u' : '') +
            (separator.sticky ? 'y' : '');
        var lastLastIndex = 0;
        var splitLimit = limit === undefined ? 4294967295 : limit >>> 0;
        // Make `global` and avoid `lastIndex` issues by working with a copy
        var separatorCopy = new RegExp(separator.source, flags + 'g');
        var separator2, match, lastIndex, lastLength, i;
        // Doesn't need flags gy, but they don't hurt
        if (!NPCG) separator2 = new RegExp('^' + separatorCopy.source + '$(?!\\s)', flags);
        while (match = separatorCopy.exec(string)) {
          // `separatorCopy.lastIndex` is not reliable cross-browser
          lastIndex = match.index + match[0][LENGTH];
          if (lastIndex > lastLastIndex) {
            output.push(string.slice(lastLastIndex, match.index));
            // Fix browsers whose `exec` methods don't consistently return `undefined` for NPCG
            // eslint-disable-next-line no-loop-func
            if (!NPCG && match[LENGTH] > 1) match[0].replace(separator2, function () {
              for (i = 1; i < arguments[LENGTH] - 2; i++) if (arguments[i] === undefined) match[i] = undefined;
            });
            if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
            lastLength = match[0][LENGTH];
            lastLastIndex = lastIndex;
            if (output[LENGTH] >= splitLimit) break;
          }
          if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
        }
        if (lastLastIndex === string[LENGTH]) {
          if (lastLength || !separatorCopy.test('')) output.push('');
        } else output.push(string.slice(lastLastIndex));
        return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
      };
      // Chakra, V8
    } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
      $split = function (separator, limit) {
        return separator === undefined && limit === 0 ? [] : _split.call(this, separator, limit);
      };
    }
    // 21.1.3.17 String.prototype.split(separator, limit)
    return [function split(separator, limit) {
      var O = defined(this);
      var fn = separator == undefined ? undefined : separator[SPLIT];
      return fn !== undefined ? fn.call(separator, O, limit) : $split.call(String(O), separator, limit);
    }, $split];
  });

  var _iterStep = function (done, value) {
    return { value: value, done: !!done };
  };

  var _iterators = {};

  // 19.1.2.14 / 15.2.3.14 Object.keys(O)



  var _objectKeys = Object.keys || function keys(O) {
    return _objectKeysInternal(O, _enumBugKeys);
  };

  var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
    _anObject(O);
    var keys = _objectKeys(Properties);
    var length = keys.length;
    var i = 0;
    var P;
    while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
    return O;
  };

  var document$2 = _global.document;
  var _html = document$2 && document$2.documentElement;

  // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



  var IE_PROTO$1 = _sharedKey('IE_PROTO');
  var Empty = function () { /* empty */ };
  var PROTOTYPE$1 = 'prototype';

  // Create object with fake `null` prototype: use iframe Object with cleared prototype
  var createDict = function () {
    // Thrash, waste and sodomy: IE GC bug
    var iframe = _domCreate('iframe');
    var i = _enumBugKeys.length;
    var lt = '<';
    var gt = '>';
    var iframeDocument;
    iframe.style.display = 'none';
    _html.appendChild(iframe);
    iframe.src = 'javascript:'; // eslint-disable-line no-script-url
    // createDict = iframe.contentWindow.Object;
    // html.removeChild(iframe);
    iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
    iframeDocument.close();
    createDict = iframeDocument.F;
    while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
    return createDict();
  };

  var _objectCreate = Object.create || function create(O, Properties) {
    var result;
    if (O !== null) {
      Empty[PROTOTYPE$1] = _anObject(O);
      result = new Empty();
      Empty[PROTOTYPE$1] = null;
      // add "__proto__" for Object.getPrototypeOf polyfill
      result[IE_PROTO$1] = O;
    } else result = createDict();
    return Properties === undefined ? result : _objectDps(result, Properties);
  };

  var def = _objectDp.f;

  var TAG = _wks('toStringTag');

  var _setToStringTag = function (it, tag, stat) {
    if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
  };

  var IteratorPrototype = {};

  // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
  _hide(IteratorPrototype, _wks('iterator'), function () { return this; });

  var _iterCreate = function (Constructor, NAME, next) {
    Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
    _setToStringTag(Constructor, NAME + ' Iterator');
  };

  // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


  var IE_PROTO$2 = _sharedKey('IE_PROTO');
  var ObjectProto = Object.prototype;

  var _objectGpo = Object.getPrototypeOf || function (O) {
    O = _toObject(O);
    if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
    if (typeof O.constructor == 'function' && O instanceof O.constructor) {
      return O.constructor.prototype;
    } return O instanceof Object ? ObjectProto : null;
  };

  var ITERATOR = _wks('iterator');
  var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
  var FF_ITERATOR = '@@iterator';
  var KEYS = 'keys';
  var VALUES = 'values';

  var returnThis = function () { return this; };

  var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
    _iterCreate(Constructor, NAME, next);
    var getMethod = function (kind) {
      if (!BUGGY && kind in proto) return proto[kind];
      switch (kind) {
        case KEYS: return function keys() { return new Constructor(this, kind); };
        case VALUES: return function values() { return new Constructor(this, kind); };
      } return function entries() { return new Constructor(this, kind); };
    };
    var TAG = NAME + ' Iterator';
    var DEF_VALUES = DEFAULT == VALUES;
    var VALUES_BUG = false;
    var proto = Base.prototype;
    var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
    var $default = $native || getMethod(DEFAULT);
    var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
    var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
    var methods, key, IteratorPrototype;
    // Fix native
    if ($anyNative) {
      IteratorPrototype = _objectGpo($anyNative.call(new Base()));
      if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
        // Set @@toStringTag to native iterators
        _setToStringTag(IteratorPrototype, TAG, true);
        // fix for some old engines
        if (typeof IteratorPrototype[ITERATOR] != 'function') _hide(IteratorPrototype, ITERATOR, returnThis);
      }
    }
    // fix Array#{values, @@iterator}.name in V8 / FF
    if (DEF_VALUES && $native && $native.name !== VALUES) {
      VALUES_BUG = true;
      $default = function values() { return $native.call(this); };
    }
    // Define iterator
    if (BUGGY || VALUES_BUG || !proto[ITERATOR]) {
      _hide(proto, ITERATOR, $default);
    }
    // Plug for library
    _iterators[NAME] = $default;
    _iterators[TAG] = returnThis;
    if (DEFAULT) {
      methods = {
        values: DEF_VALUES ? $default : getMethod(VALUES),
        keys: IS_SET ? $default : getMethod(KEYS),
        entries: $entries
      };
      if (FORCED) for (key in methods) {
        if (!(key in proto)) _redefine(proto, key, methods[key]);
      } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
    }
    return methods;
  };

  // 22.1.3.4 Array.prototype.entries()
  // 22.1.3.13 Array.prototype.keys()
  // 22.1.3.29 Array.prototype.values()
  // 22.1.3.30 Array.prototype[@@iterator]()
  var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
    this._t = _toIobject(iterated); // target
    this._i = 0;                   // next index
    this._k = kind;                // kind
    // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
  }, function () {
    var O = this._t;
    var kind = this._k;
    var index = this._i++;
    if (!O || index >= O.length) {
      this._t = undefined;
      return _iterStep(1);
    }
    if (kind == 'keys') return _iterStep(0, index);
    if (kind == 'values') return _iterStep(0, O[index]);
    return _iterStep(0, [index, O[index]]);
  }, 'values');

  // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
  _iterators.Arguments = _iterators.Array;

  _addToUnscopables('keys');
  _addToUnscopables('values');
  _addToUnscopables('entries');

  var ITERATOR$1 = _wks('iterator');
  var TO_STRING_TAG = _wks('toStringTag');
  var ArrayValues = _iterators.Array;

  var DOMIterables = {
    CSSRuleList: true, // TODO: Not spec compliant, should be false.
    CSSStyleDeclaration: false,
    CSSValueList: false,
    ClientRectList: false,
    DOMRectList: false,
    DOMStringList: false,
    DOMTokenList: true,
    DataTransferItemList: false,
    FileList: false,
    HTMLAllCollection: false,
    HTMLCollection: false,
    HTMLFormElement: false,
    HTMLSelectElement: false,
    MediaList: true, // TODO: Not spec compliant, should be false.
    MimeTypeArray: false,
    NamedNodeMap: false,
    NodeList: true,
    PaintRequestList: false,
    Plugin: false,
    PluginArray: false,
    SVGLengthList: false,
    SVGNumberList: false,
    SVGPathSegList: false,
    SVGPointList: false,
    SVGStringList: false,
    SVGTransformList: false,
    SourceBufferList: false,
    StyleSheetList: true, // TODO: Not spec compliant, should be false.
    TextTrackCueList: false,
    TextTrackList: false,
    TouchList: false
  };

  for (var collections = _objectKeys(DOMIterables), i$2 = 0; i$2 < collections.length; i$2++) {
    var NAME = collections[i$2];
    var explicit = DOMIterables[NAME];
    var Collection = _global[NAME];
    var proto$1 = Collection && Collection.prototype;
    var key;
    if (proto$1) {
      if (!proto$1[ITERATOR$1]) _hide(proto$1, ITERATOR$1, ArrayValues);
      if (!proto$1[TO_STRING_TAG]) _hide(proto$1, TO_STRING_TAG, NAME);
      _iterators[NAME] = ArrayValues;
      if (explicit) for (key in es6_array_iterator) if (!proto$1[key]) _redefine(proto$1, key, es6_array_iterator[key], true);
    }
  }

  // most Object methods by ES6 should accept primitives



  var _objectSap = function (KEY, exec) {
    var fn = (_core.Object || {})[KEY] || Object[KEY];
    var exp = {};
    exp[KEY] = exec(fn);
    _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
  };

  // 19.1.2.14 Object.keys(O)



  _objectSap('keys', function () {
    return function keys(it) {
      return _objectKeys(_toObject(it));
    };
  });

  /*!
   * jQuery Typeahead
   * Copyright (C) 2018 RunningCoder.org
   * Licensed under the MIT license
   *
   * @author Tom Bertrand
   * @version 2.10.6 (2018-7-30)
   * @link http://www.runningcoder.org/jquerytypeahead/
   */
  //shopify
  (function ($) {

    window.Typeahead = {
      version: '2.10.6'
    };
    /**
     * @private
     * Default options
     * @link http://www.runningcoder.org/jquerytypeahead/documentation/
     */

    var _options = {
      input: null,
      // *RECOMMENDED*, jQuery selector to reach Typeahead's input for initialization
      minLength: 2,
      // Accepts 0 to search on focus, minimum character length to perform a search
      maxLength: false,
      // False as "Infinity" will not put character length restriction for searching results
      maxItem: 8,
      // Accepts 0 / false as "Infinity" meaning all the results will be displayed
      dynamic: false,
      // When true, Typeahead will get a new dataset from the source option on every key press
      delay: 300,
      // delay in ms when dynamic option is set to true
      order: null,
      // "asc" or "desc" to sort results
      offset: false,
      // Set to true to match items starting from their first character
      hint: false,
      // Added support for excessive "space" characters
      accent: false,
      // Will allow to type accent and give letter equivalent results, also can define a custom replacement object
      highlight: true,
      // Added "any" to highlight any word in the template, by default true will only highlight display keys
      multiselect: null,
      // Multiselect configuration object, see documentation for all options
      group: false,
      // Improved feature, Boolean,string,object(key, template (string, function))
      groupOrder: null,
      // New feature, order groups "asc", "desc", Array, Function
      maxItemPerGroup: null,
      // Maximum number of result per Group
      dropdownFilter: false,
      // Take group options string and create a dropdown filter
      dynamicFilter: null,
      // Filter the typeahead results based on dynamic value, Ex: Players based on TeamID
      backdrop: false,
      // Add a backdrop behind Typeahead results
      backdropOnFocus: false,
      // Display the backdrop option as the Typeahead input is :focused
      cache: false,
      // Improved option, true OR 'localStorage' OR 'sessionStorage'
      ttl: 3600000,
      // Cache time to live in ms
      compression: false,
      // Requires LZString library
      searchOnFocus: false,
      // Display search results on input focus
      blurOnTab: true,
      // Blur Typeahead when Tab key is pressed, if false Tab will go though search results
      resultContainer: null,
      // List the results inside any container string or jQuery object
      generateOnLoad: null,
      // Forces the source to be generated on page load even if the input is not focused!
      mustSelectItem: false,
      // The submit function only gets called if an item is selected
      href: null,
      // String or Function to format the url for right-click & open in new tab on link results
      display: ["display"],
      // Allows search in multiple item keys ["display1", "display2"]
      template: null,
      // Display template of each of the result list
      templateValue: null,
      // Set the input value template when an item is clicked
      groupTemplate: null,
      // Set a custom template for the groups
      correlativeTemplate: false,
      // Compile display keys, enables multiple key search from the template string
      emptyTemplate: false,
      // Display an empty template if no result
      cancelButton: true,
      // If text is detected in the input, a cancel button will be available to reset the input (pressing ESC also cancels)
      loadingAnimation: true,
      // Display a loading animation when typeahead is doing request / searching for results
      filter: true,
      // Set to false or function to bypass Typeahead filtering. WARNING: accent, correlativeTemplate, offset & matcher will not be interpreted
      matcher: null,
      // Add an extra filtering function after the typeahead functions
      source: null,
      // Source of data for Typeahead to filter
      abortAjax: true,
      // Abort Ajax requests even if a new request is initiated
      callback: {
        onInit: null,
        // When Typeahead is first initialized (happens only once)
        onReady: null,
        // When the Typeahead initial preparation is completed
        onShowLayout: null,
        // Called when the layout is shown
        onHideLayout: null,
        // Called when the layout is hidden
        onSearch: null,
        // When data is being fetched & analyzed to give search results
        onResult: null,
        // When the result container is displayed
        onLayoutBuiltBefore: null,
        // When the result HTML is build, modify it before it get showed
        onLayoutBuiltAfter: null,
        // Modify the dom right after the results gets inserted in the result container
        onNavigateBefore: null,
        // When a key is pressed to navigate the results, before the navigation happens
        onNavigateAfter: null,
        // When a key is pressed to navigate the results
        onEnter: null,
        // When an item in the result list is focused
        onLeave: null,
        // When an item in the result list is blurred
        onClickBefore: null,
        // Possibility to e.preventDefault() to prevent the Typeahead behaviors
        onClickAfter: null,
        // Happens after the default clicked behaviors has been executed
        onDropdownFilter: null,
        // When the dropdownFilter is changed, trigger this callback
        onSendRequest: null,
        // Gets called when the Ajax request(s) are sent
        onReceiveRequest: null,
        // Gets called when the Ajax request(s) are all received
        onPopulateSource: null,
        // Perform operation on the source data before it gets in Typeahead data
        onCacheSave: null,
        // Perform operation on the source data before it gets in Typeahead cache
        onSubmit: null,
        // When Typeahead form is submitted
        onCancel: null // Triggered if the typeahead had text inside and is cleared

      },
      selector: {
        container: "typeahead__container",
        result: "typeahead__result",
        list: "typeahead__list",
        group: "typeahead__group",
        item: "typeahead__item",
        empty: "typeahead__empty",
        display: "typeahead__display",
        query: "typeahead__query",
        filter: "typeahead__filter",
        filterButton: "typeahead__filter-button",
        dropdown: "typeahead__dropdown",
        dropdownItem: "typeahead__dropdown-item",
        labelContainer: "typeahead__label-container",
        label: "typeahead__label",
        button: "typeahead__button",
        backdrop: "typeahead__backdrop",
        hint: "typeahead__hint",
        cancelButton: "typeahead__cancel-button"
      },
      debug: false // Display debug information (RECOMMENDED for dev environment)

    };
    /**
     * @private
     * Event namespace
     */

    var _namespace = ".typeahead";
    /**
     * @private
     * Accent equivalents
     */

    var _accent = {
      from: "ãàáäâẽèéëêìíïîõòóöôùúüûñç",
      to: "aaaaaeeeeeiiiiooooouuuunc"
    };
    /**
     * #62 IE9 doesn't trigger "input" event when text gets removed (backspace, ctrl+x, etc)
     * @private
     */

    var _isIE9 = ~window.navigator.appVersion.indexOf("MSIE 9.");
    /**
     * #193 Clicking on a suggested option does not select it on IE10/11
     * @private
     */


    var _isIE10 = ~window.navigator.appVersion.indexOf("MSIE 10");

    var _isIE11 = ~window.navigator.userAgent.indexOf("Trident") ? ~window.navigator.userAgent.indexOf("rv:11") : false;
    /**
     * Sequence of ajax requests sent
     * @type {number}
     * @private
     */


    var _seq = 0;
    /**
     * The last processed sequence
     * @type {number}
     * @private
     */

    var _lastSeq = 0; // SOURCE GROUP RESERVED WORDS: ajax, data, url
    // SOURCE ITEMS RESERVED KEYS: group, display, data, matchedKey, compiled, href

    /**
     * @constructor
     * Typeahead Class
     *
     * @param {object} node jQuery input object
     * @param {object} options User defined options
     */

    var Typeahead = function Typeahead(node, options) {
      this.rawQuery = node.val() || ""; // Unmodified input query

      this.query = node.val() || ""; // Input query

      this.selector = node[0].selector; // Typeahead instance selector (to reach from window.Typeahead[SELECTOR])

      this.deferred = null; // Promise when "input" event in triggered, this.node.triggerHandler('input').then(() => {})

      this.tmpSource = {}; // Temp var to preserve the source order for the searchResult function

      this.source = {}; // The generated source kept in memory

      this.dynamicGroups = []; // Store the source groups that are defined as dynamic

      this.hasDynamicGroups = false; // Boolean if at least one of the groups has a dynamic source

      this.generatedGroupCount = 0; // Number of groups generated, if limit reached the search can be done

      this.groupBy = "group"; // This option will change according to filtering or custom grouping

      this.groups = []; // Array of all the available groups, used to build the groupTemplate

      this.searchGroups = []; // Array of groups to generate when Typeahead searches data

      this.generateGroups = []; // Array of groups to generate when Typeahead requests data

      this.requestGroups = []; // Array of groups to request via Ajax

      this.result = []; // Results based on Source-query match (only contains the displayed elements)

      this.tmpResult = {}; // Temporary object of results, before they get passed to the buildLayout function

      this.groupTemplate = ""; // Result template at the {{group}} level

      this.resultHtml = null; // HTML Results (displayed elements)

      this.resultCount = 0; // Total results based on Source-query match

      this.resultCountPerGroup = {}; // Total results based on Source-query match per group

      this.options = options; // Typeahead options (Merged default & user defined)

      this.node = node; // jQuery object of the Typeahead <input>

      this.namespace = "." + this.helper.slugify.call(this, this.selector) + _namespace; // Every Typeahead instance gets its own namespace for events

      this.isContentEditable = typeof this.node.attr('contenteditable') !== "undefined" && this.node.attr('contenteditable') !== "false";
      this.container = null; // Typeahead container, usually right after <form>

      this.resultContainer = null; // Typeahead result container (html)

      this.item = null; // Selected item

      this.items = null; // Multiselect selected items

      this.comparedItems = null; // Multiselect items stored for comparison

      this.xhr = {}; // Ajax request(s) stack

      this.hintIndex = null; // Numeric value of the hint index in the result list

      this.filters = {
        // Filter list for searching, dropdown and dynamic(s)
        dropdown: {},
        // Dropdown menu if options.dropdownFilter is set
        dynamic: {} // Checkbox / Radio / Select to filter the source data

      };
      this.dropdownFilter = {
        static: [],
        // Objects that has a value
        dynamic: []
      };
      this.dropdownFilterAll = null; // The last "all" definition

      this.isDropdownEvent = false; // If a dropdownFilter is clicked, this will be true to trigger the callback

      this.requests = {}; // Store the group:request instead of generating them every time

      this.backdrop = {}; // The backdrop object

      this.hint = {}; // The hint object

      this.label = {}; // The label object

      this.hasDragged = false; // Will cancel mouseend events if true

      this.focusOnly = false; // Focus the input preventing any operations

      this.displayEmptyTemplate; // Display the empty template in the result list

      this.__construct();
    };

    Typeahead.prototype = {
      _validateCacheMethod: function _validateCacheMethod(cache) {
        var supportedCache = ["localStorage", "sessionStorage"],
            supported;

        if (cache === true) {
          cache = "localStorage";
        } else if (typeof cache === "string" && !~supportedCache.indexOf(cache)) {
          // {debug}
          if (this.options.debug) {
            _debug.log({
              node: this.selector,
              function: "extendOptions()",
              message: 'Invalid options.cache, possible options are "localStorage" or "sessionStorage"'
            });

            _debug.print();
          } // {/debug}


          return false;
        }

        supported = typeof window[cache] !== "undefined";

        try {
          window[cache].setItem("typeahead", "typeahead");
          window[cache].removeItem("typeahead");
        } catch (e) {
          supported = false;
        }

        return supported && cache || false;
      },
      extendOptions: function extendOptions() {
        this.options.cache = this._validateCacheMethod(this.options.cache);

        if (this.options.compression) {
          if ((typeof LZString === "undefined" ? "undefined" : _typeof_1(LZString)) !== "object" || !this.options.cache) {
            // {debug}
            if (this.options.debug) {
              _debug.log({
                node: this.selector,
                function: "extendOptions()",
                message: "Missing LZString Library or options.cache, no compression will occur."
              });

              _debug.print();
            } // {/debug}


            this.options.compression = false;
          }
        }

        if (!this.options.maxLength || isNaN(this.options.maxLength)) {
          this.options.maxLength = Infinity;
        }

        if (typeof this.options.maxItem !== "undefined" && ~[0, false].indexOf(this.options.maxItem)) {
          this.options.maxItem = Infinity;
        }

        if (this.options.maxItemPerGroup && !/^\d+$/.test(this.options.maxItemPerGroup)) {
          this.options.maxItemPerGroup = null;
        }

        if (this.options.display && !Array.isArray(this.options.display)) {
          this.options.display = [this.options.display];
        }

        if (this.options.multiselect) {
          this.items = [];
          this.comparedItems = [];

          if (typeof this.options.multiselect.matchOn === "string") {
            this.options.multiselect.matchOn = [this.options.multiselect.matchOn];
          }
        }

        if (this.options.group) {
          if (!Array.isArray(this.options.group)) {
            if (typeof this.options.group === "string") {
              this.options.group = {
                key: this.options.group
              };
            } else if (typeof this.options.group === "boolean") {
              this.options.group = {
                key: "group"
              };
            }

            this.options.group.key = this.options.group.key || "group";
          } else {
            // {debug}
            if (this.options.debug) {
              _debug.log({
                node: this.selector,
                function: "extendOptions()",
                message: "options.group must be a boolean|string|object as of 2.5.0"
              });

              _debug.print();
            } // {/debug}

          }
        }

        if (this.options.highlight && !~["any", true].indexOf(this.options.highlight)) {
          this.options.highlight = false;
        }

        if (this.options.dropdownFilter && this.options.dropdownFilter instanceof Object) {
          if (!Array.isArray(this.options.dropdownFilter)) {
            this.options.dropdownFilter = [this.options.dropdownFilter];
          }

          for (var i = 0, ii = this.options.dropdownFilter.length; i < ii; ++i) {
            this.dropdownFilter[this.options.dropdownFilter[i].value ? "static" : "dynamic"].push(this.options.dropdownFilter[i]);
          }
        }

        if (this.options.dynamicFilter && !Array.isArray(this.options.dynamicFilter)) {
          this.options.dynamicFilter = [this.options.dynamicFilter];
        }

        if (this.options.accent) {
          if (_typeof_1(this.options.accent) === "object") {
            if (this.options.accent.from && this.options.accent.to && this.options.accent.from.length !== this.options.accent.to.length) {
              // {debug}
              if (this.options.debug) {
                _debug.log({
                  node: this.selector,
                  function: "extendOptions()",
                  message: 'Invalid "options.accent", from and to must be defined and same length.'
                });

                _debug.print();
              } // {/debug}

            }
          } else {
            this.options.accent = _accent;
          }
        }

        if (this.options.groupTemplate) {
          this.groupTemplate = this.options.groupTemplate;
        }

        if (this.options.resultContainer) {
          if (typeof this.options.resultContainer === "string") {
            this.options.resultContainer = $(this.options.resultContainer);
          }

          if (!(this.options.resultContainer instanceof $) || !this.options.resultContainer[0]) {
            // {debug}
            if (this.options.debug) {
              _debug.log({
                node: this.selector,
                function: "extendOptions()",
                message: 'Invalid jQuery selector or jQuery Object for "options.resultContainer".'
              });

              _debug.print();
            } // {/debug}

          } else {
            this.resultContainer = this.options.resultContainer;
          }
        }

        if (this.options.group && this.options.group.key) {
          this.groupBy = this.options.group.key;
        } // Compatibility onClick callback


        if (this.options.callback && this.options.callback.onClick) {
          this.options.callback.onClickBefore = this.options.callback.onClick;
          delete this.options.callback.onClick;
        } // Compatibility onNavigate callback


        if (this.options.callback && this.options.callback.onNavigate) {
          this.options.callback.onNavigateBefore = this.options.callback.onNavigate;
          delete this.options.callback.onNavigate;
        }

        this.options = $.extend(true, {}, _options, this.options);
      },
      unifySourceFormat: function unifySourceFormat() {
        this.dynamicGroups = []; // source: ['item1', 'item2', 'item3']

        if (Array.isArray(this.options.source)) {
          this.options.source = {
            group: {
              data: this.options.source
            }
          };
        } // source: "http://www.test.com/url.json"


        if (typeof this.options.source === "string") {
          this.options.source = {
            group: {
              ajax: {
                url: this.options.source
              }
            }
          };
        }

        if (this.options.source.ajax) {
          this.options.source = {
            group: {
              ajax: this.options.source.ajax
            }
          };
        } // source: {data: ['item1', 'item2'], url: "http://www.test.com/url.json"}


        if (this.options.source.url || this.options.source.data) {
          this.options.source = {
            group: this.options.source
          };
        }

        var group, groupSource, tmpAjax;

        for (group in this.options.source) {
          if (!this.options.source.hasOwnProperty(group)) continue;
          groupSource = this.options.source[group]; // source: {group: "http://www.test.com/url.json"}

          if (typeof groupSource === "string") {
            groupSource = {
              ajax: {
                url: groupSource
              }
            };
          } // source: {group: {url: ["http://www.test.com/url.json", "json.path"]}}


          tmpAjax = groupSource.url || groupSource.ajax;

          if (Array.isArray(tmpAjax)) {
            groupSource.ajax = typeof tmpAjax[0] === "string" ? {
              url: tmpAjax[0]
            } : tmpAjax[0];
            groupSource.ajax.path = groupSource.ajax.path || tmpAjax[1] || null;
            delete groupSource.url;
          } else {
            // source: {group: {url: {url: "http://www.test.com/url.json", method: "GET"}}}
            // source: {group: {url: "http://www.test.com/url.json", dataType: "jsonp"}}
            if (_typeof_1(groupSource.url) === "object") {
              groupSource.ajax = groupSource.url;
            } else if (typeof groupSource.url === "string") {
              groupSource.ajax = {
                url: groupSource.url
              };
            }

            delete groupSource.url;
          }

          if (!groupSource.data && !groupSource.ajax) {
            // {debug}
            if (this.options.debug) {
              _debug.log({
                node: this.selector,
                function: "unifySourceFormat()",
                arguments: JSON.stringify(this.options.source),
                message: 'Undefined "options.source.' + group + '.[data|ajax]" is Missing - Typeahead dropped'
              });

              _debug.print();
            } // {/debug}


            return false;
          }

          if (groupSource.display && !Array.isArray(groupSource.display)) {
            groupSource.display = [groupSource.display];
          }

          groupSource.minLength = typeof groupSource.minLength === "number" ? groupSource.minLength : this.options.minLength;
          groupSource.maxLength = typeof groupSource.maxLength === "number" ? groupSource.maxLength : this.options.maxLength;
          groupSource.dynamic = typeof groupSource.dynamic === "boolean" || this.options.dynamic;

          if (groupSource.minLength > groupSource.maxLength) {
            groupSource.minLength = groupSource.maxLength;
          }

          this.options.source[group] = groupSource;

          if (this.options.source[group].dynamic) {
            this.dynamicGroups.push(group);
          }

          groupSource.cache = typeof groupSource.cache !== "undefined" ? this._validateCacheMethod(groupSource.cache) : this.options.cache;

          if (groupSource.compression) {
            if ((typeof LZString === "undefined" ? "undefined" : _typeof_1(LZString)) !== "object" || !groupSource.cache) {
              // {debug}
              if (this.options.debug) {
                _debug.log({
                  node: this.selector,
                  function: "unifySourceFormat()",
                  message: "Missing LZString Library or group.cache, no compression will occur on group: " + group
                });

                _debug.print();
              } // {/debug}


              groupSource.compression = false;
            }
          }
        }

        this.hasDynamicGroups = this.options.dynamic || !!this.dynamicGroups.length;
        return true;
      },
      init: function init() {
        _lastSeq = 0;
        this.helper.executeCallback.call(this, this.options.callback.onInit, [this.node]);
        this.container = this.node.closest("." + this.options.selector.container); // {debug}

        if (this.options.debug) {
          _debug.log({
            node: this.selector,
            function: "init()",
            //'arguments': JSON.stringify(this.options),
            message: "OK - Typeahead activated on " + this.selector
          });

          _debug.print();
        } // {/debug}

      },
      delegateEvents: function delegateEvents() {
        var scope = this,
            events = ["focus" + this.namespace, "input" + this.namespace, "propertychange" + this.namespace, // IE8 Fix
              "keydown" + this.namespace, "keyup" + this.namespace, // IE9 Fix
              "search" + this.namespace, "generate" + this.namespace]; // #149 - Adding support for Mobiles

        $("html").on("touchmove", function () {
          scope.hasDragged = true;
        }).on("touchstart", function () {
          scope.hasDragged = false;
        });
        this.node.closest("form").on("submit", function (e) {
          if (scope.options.mustSelectItem && scope.helper.isEmpty(scope.item)) {
            e.preventDefault();
            return;
          }

          if (!scope.options.backdropOnFocus) {
            scope.hideLayout();
          }

          if (scope.options.callback.onSubmit) {
            return scope.helper.executeCallback.call(scope, scope.options.callback.onSubmit, [scope.node, this, scope.item || scope.items, e]);
          }
        }).on("reset", function () {
          // #221 - Reset Typeahead on form reset.
          // setTimeout to re-queue the `input.typeahead` event at the end
          setTimeout(function () {
            scope.node.trigger("input" + scope.namespace); // #243 - minLength: 0 opens the Typeahead results

            scope.hideLayout();
          });
        }); // IE8 fix

        var preventNextEvent = false; // IE10/11 fix

        if (this.node.attr("placeholder") && (_isIE10 || _isIE11)) {
          var preventInputEvent = true;
          this.node.on("focusin focusout", function () {
            preventInputEvent = !!(!this.value && this.placeholder);
          });
          this.node.on("input", function (e) {
            if (preventInputEvent) {
              e.stopImmediatePropagation();
              preventInputEvent = false;
            }
          });
        }

        this.node.off(this.namespace).on(events.join(" "), function (e, data) {
          switch (e.type) {
            case "generate":
              scope.generateSource(Object.keys(scope.options.source));
              break;

            case "focus":
              if (scope.focusOnly) {
                scope.focusOnly = false;
                break;
              }

              if (scope.options.backdropOnFocus) {
                scope.buildBackdropLayout();
                scope.showLayout();
              }

              if (scope.options.searchOnFocus && !scope.item) {
                scope.deferred = $.Deferred();
                scope.assignQuery();
                scope.generateSource();
              }

              break;

            case "keydown":
              if (e.keyCode === 8 && scope.options.multiselect && scope.options.multiselect.cancelOnBackspace && scope.query === '' && scope.items.length) {
                scope.cancelMultiselectItem(scope.items.length - 1, null, e);
              } else if (e.keyCode && ~[9, 13, 27, 38, 39, 40].indexOf(e.keyCode)) {
                preventNextEvent = true;
                scope.navigate(e);
              }

              break;

            case "keyup":
              if (_isIE9 && scope.node[0].value.replace(/^\s+/, "").toString().length < scope.query.length) {
                scope.node.trigger("input" + scope.namespace);
              }

              break;

            case "propertychange":
              if (preventNextEvent) {
                preventNextEvent = false;
                break;
              }

            case "input":
              scope.deferred = $.Deferred();
              scope.assignQuery(); // #195 Trigger an onCancel event if the Typeahead is cleared

              if (scope.rawQuery === "" && scope.query === "") {
                e.originalEvent = data || {};
                scope.helper.executeCallback.call(scope, scope.options.callback.onCancel, [scope.node, scope.item, e]);
                scope.item = null;
              }

              scope.options.cancelButton && scope.toggleCancelButtonVisibility();

              if (scope.options.hint && scope.hint.container && scope.hint.container.val() !== "") {
                if (scope.hint.container.val().indexOf(scope.rawQuery) !== 0) {
                  scope.hint.container.val("");

                  if (scope.isContentEditable) {
                    scope.hint.container.text("");
                  }
                }
              }

              if (scope.hasDynamicGroups) {
                scope.helper.typeWatch(function () {
                  scope.generateSource();
                }, scope.options.delay);
              } else {
                scope.generateSource();
              }

              break;

            case "search":
              scope.searchResult();
              scope.buildLayout();

              if (scope.result.length || scope.searchGroups.length && scope.displayEmptyTemplate) {
                scope.showLayout();
              } else {
                scope.hideLayout();
              }

              scope.deferred && scope.deferred.resolve();
              break;
          }

          return scope.deferred && scope.deferred.promise();
        });

        if (this.options.generateOnLoad) {
          this.node.trigger("generate" + this.namespace);
        }
      },
      assignQuery: function assignQuery() {
        if (this.isContentEditable) {
          this.rawQuery = this.node.text();
        } else {
          this.rawQuery = this.node.val().toString();
        }

        this.rawQuery = this.rawQuery.replace(/^\s+/, "");

        if (this.rawQuery !== this.query) {
          this.query = this.rawQuery;
        }
      },
      filterGenerateSource: function filterGenerateSource() {
        this.searchGroups = [];
        this.generateGroups = [];
        if (this.focusOnly && !this.options.multiselect) return;

        for (var group in this.options.source) {
          if (!this.options.source.hasOwnProperty(group)) continue;

          if (this.query.length >= this.options.source[group].minLength && this.query.length <= this.options.source[group].maxLength) {
            if (this.filters.dropdown && this.filters.dropdown.key === 'group' && this.filters.dropdown.value !== group) {
              continue;
            }

            this.searchGroups.push(group);

            if (!this.options.source[group].dynamic && this.source[group]) {
              continue;
            }

            this.generateGroups.push(group);
          }
        }
      },
      generateSource: function generateSource(generateGroups) {
        this.filterGenerateSource();

        if (Array.isArray(generateGroups) && generateGroups.length) {
          this.generateGroups = generateGroups;
        } else if (!this.generateGroups.length) {
          this.node.trigger("search" + this.namespace);
          return;
        }

        this.requestGroups = [];
        this.generatedGroupCount = 0;
        this.options.loadingAnimation && this.container.addClass("loading");

        if (!this.helper.isEmpty(this.xhr)) {
          for (var i in this.xhr) {
            if (!this.xhr.hasOwnProperty(i)) continue;

            if (this.options.abortAjax) {
              this.xhr[i].abort();
            }
          }

          this.xhr = {};
        }

        var scope = this,
            group,
            groupData,
            groupSource,
            cache,
            compression,
            dataInStorage,
            isValidStorage;

        for (var i = 0, ii = this.generateGroups.length; i < ii; ++i) {
          group = this.generateGroups[i];
          groupSource = this.options.source[group];
          cache = groupSource.cache;
          compression = groupSource.compression;

          if (cache) {
            dataInStorage = window[cache].getItem("TYPEAHEAD_" + this.selector + ":" + group);

            if (dataInStorage) {
              if (compression) {
                dataInStorage = LZString.decompressFromUTF16(dataInStorage);
              }

              isValidStorage = false;

              try {
                dataInStorage = JSON.parse(dataInStorage + "");

                if (dataInStorage.data && dataInStorage.ttl > new Date().getTime()) {
                  this.populateSource(dataInStorage.data, group);
                  isValidStorage = true; // {debug}

                  if (this.options.debug) {
                    _debug.log({
                      node: this.selector,
                      function: "generateSource()",
                      message: 'Source for group "' + group + '" found in ' + cache
                    });

                    _debug.print();
                  } // {/debug}

                } else {
                  window[cache].removeItem("TYPEAHEAD_" + this.selector + ":" + group);
                }
              } catch (error) {}

              if (isValidStorage) continue;
            }
          }

          if (groupSource.data && !groupSource.ajax) {
            // #198 Add support for async data source
            if (typeof groupSource.data === "function") {
              groupData = groupSource.data.call(this);

              if (Array.isArray(groupData)) {
                scope.populateSource(groupData, group);
              } else if (typeof groupData.promise === "function") {
                (function (group) {
                  $.when(groupData).then(function (deferredData) {
                    if (deferredData && Array.isArray(deferredData)) {
                      scope.populateSource(deferredData, group);
                    }
                  });
                })(group);
              }
            } else {
              this.populateSource($.extend(true, [], groupSource.data), group);
            }

            continue;
          }

          if (groupSource.ajax) {
            if (!this.requests[group]) {
              this.requests[group] = this.generateRequestObject(group);
            }

            this.requestGroups.push(group);
          }
        }

        if (this.requestGroups.length) {
          this.handleRequests();
        }

        return !!this.generateGroups.length;
      },
      generateRequestObject: function generateRequestObject(group) {
        var scope = this,
            groupSource = this.options.source[group];
        var xhrObject = {
          request: {
            url: groupSource.ajax.url || null,
            dataType: "json",
            beforeSend: function beforeSend(jqXHR, options) {
              // Important to call .abort() in case of dynamic requests
              scope.xhr[group] = jqXHR;

              if (!scope.options.abortAjax) {
                jqXHR.seq = _seq;
                _seq++;
              }

              var beforeSend = scope.requests[group].callback.beforeSend || groupSource.ajax.beforeSend;
              typeof beforeSend === "function" && beforeSend.apply(null, arguments);
            }
          },
          callback: {
            beforeSend: null,
            done: null,
            fail: null,
            then: null,
            always: null
          },
          extra: {
            path: groupSource.ajax.path || null,
            group: group
          },
          validForGroup: [group]
        };

        if (typeof groupSource.ajax !== "function") {
          if (groupSource.ajax instanceof Object) {
            xhrObject = this.extendXhrObject(xhrObject, groupSource.ajax);
          }

          if (Object.keys(this.options.source).length > 1) {
            for (var _group in this.requests) {
              if (!this.requests.hasOwnProperty(_group)) continue;
              if (this.requests[_group].isDuplicated) continue;

              if (xhrObject.request.url && xhrObject.request.url === this.requests[_group].request.url) {
                this.requests[_group].validForGroup.push(group);

                xhrObject.isDuplicated = true;
                delete xhrObject.validForGroup;
              }
            }
          }
        }

        return xhrObject;
      },
      extendXhrObject: function extendXhrObject(xhrObject, groupRequest) {
        if (_typeof_1(groupRequest.callback) === "object") {
          xhrObject.callback = groupRequest.callback;
          delete groupRequest.callback;
        } // #132 Fixed beforeSend when using a function as the request object


        if (typeof groupRequest.beforeSend === "function") {
          xhrObject.callback.beforeSend = groupRequest.beforeSend;
          delete groupRequest.beforeSend;
        } // Fixes #105 Allow user to define their beforeSend function.
        // Fixes #181 IE8 incompatibility


        xhrObject.request = $.extend(true, xhrObject.request, groupRequest); // JSONP needs a unique jsonpCallback to run concurrently

        if (xhrObject.request.dataType.toLowerCase() === "jsonp" && !xhrObject.request.jsonpCallback) {
          xhrObject.request.jsonpCallback = "callback_" + xhrObject.extra.group;
        }

        return xhrObject;
      },
      handleRequests: function handleRequests() {
        var scope = this,
            group,
            requestsCount = this.requestGroups.length;

        if (this.helper.executeCallback.call(this, this.options.callback.onSendRequest, [this.node, this.query]) === false) {
          return;
        }

        for (var i = 0, ii = this.requestGroups.length; i < ii; ++i) {
          group = this.requestGroups[i];
          if (this.requests[group].isDuplicated) continue;

          (function (group, xhrObject) {
            if (typeof scope.options.source[group].ajax === "function") {
              var _groupRequest = scope.options.source[group].ajax.call(scope, scope.query); // Fixes #271 Data is cached inside the xhrObject


              xhrObject = scope.extendXhrObject(scope.generateRequestObject(group), _typeof_1(_groupRequest) === "object" ? _groupRequest : {});

              if (_typeof_1(xhrObject.request) !== "object" || !xhrObject.request.url) {
                // {debug}
                if (scope.options.debug) {
                  _debug.log({
                    node: scope.selector,
                    function: "handleRequests",
                    message: 'Source function must return an object containing ".url" key for group "' + group + '"'
                  });

                  _debug.print();
                } // {/debug}


                scope.populateSource([], group);
                return;
              }

              scope.requests[group] = xhrObject;
            }

            var _request,
                _isExtended = false,
                // Prevent the main request from being changed
                _groupData = {};

            if (~xhrObject.request.url.indexOf("{{query}}")) {
              if (!_isExtended) {
                xhrObject = $.extend(true, {}, xhrObject);
                _isExtended = true;
              } // #184 Invalid encoded characters on dynamic requests for `{{query}}`


              xhrObject.request.url = xhrObject.request.url.replace("{{query}}", encodeURIComponent(scope.query));
            }

            if (xhrObject.request.data) {
              for (var i in xhrObject.request.data) {
                if (!xhrObject.request.data.hasOwnProperty(i)) continue;

                if (~String(xhrObject.request.data[i]).indexOf("{{query}}")) {
                  if (!_isExtended) {
                    xhrObject = $.extend(true, {}, xhrObject);
                    _isExtended = true;
                  } // jQuery handles encodeURIComponent when the query is inside the data object


                  xhrObject.request.data[i] = xhrObject.request.data[i].replace("{{query}}", scope.query);
                  break;
                }
              }
            }

            $.ajax(xhrObject.request).done(function (data, textStatus, jqXHR) {
              var _group;

              for (var i = 0, ii = xhrObject.validForGroup.length; i < ii; i++) {
                _group = xhrObject.validForGroup[i];
                _request = scope.requests[_group];

                if (typeof _request.callback.done === 'function') {
                  _groupData[_group] = _request.callback.done.call(scope, data, textStatus, jqXHR); // {debug}

                  if (!Array.isArray(_groupData[_group]) || _typeof_1(_groupData[_group]) !== "object") {
                    if (scope.options.debug) {
                      _debug.log({
                        node: scope.selector,
                        function: "Ajax.callback.done()",
                        message: "Invalid returned data has to be an Array"
                      });

                      _debug.print();
                    }
                  } // {/debug}

                }
              }
            }).fail(function (jqXHR, textStatus, errorThrown) {
              for (var i = 0, ii = xhrObject.validForGroup.length; i < ii; i++) {
                _request = scope.requests[xhrObject.validForGroup[i]];
                _request.callback.fail instanceof Function && _request.callback.fail.call(scope, jqXHR, textStatus, errorThrown);
              } // {debug}


              if (scope.options.debug) {
                _debug.log({
                  node: scope.selector,
                  function: "Ajax.callback.fail()",
                  arguments: JSON.stringify(xhrObject.request),
                  message: textStatus
                });

                console.log(errorThrown);

                _debug.print();
              } // {/debug}

            }).always(function (data, textStatus, jqXHR) {
              var _group;

              for (var i = 0, ii = xhrObject.validForGroup.length; i < ii; i++) {
                _group = xhrObject.validForGroup[i];
                _request = scope.requests[_group];
                _request.callback.always instanceof Function && _request.callback.always.call(scope, data, textStatus, jqXHR); // #248, #303 Aborted requests would call populate with invalid data

                if (textStatus === 'abort') return; // If aborting ajax request is disaled, check to make sure that this request is not older than previous requests

                if (!scope.options.abortAjax) {
                  if (jqXHR.seq < _lastSeq) {
                    return;
                  } else {
                    _lastSeq = jqXHR.seq;
                  }
                } // #265 Modified data from ajax.callback.done is not being registered (use of _groupData[_group])


                scope.populateSource(data !== null && typeof data.promise === "function" && [] || _groupData[_group] || data, _request.extra.group, _request.extra.path || _request.request.path);
                requestsCount -= 1;

                if (requestsCount === 0) {
                  scope.helper.executeCallback.call(scope, scope.options.callback.onReceiveRequest, [scope.node, scope.query]);
                }
              }
            }).then(function (jqXHR, textStatus) {
              for (var i = 0, ii = xhrObject.validForGroup.length; i < ii; i++) {
                _request = scope.requests[xhrObject.validForGroup[i]];
                _request.callback.then instanceof Function && _request.callback.then.call(scope, jqXHR, textStatus);
              }
            });
          })(group, this.requests[group]);
        }
      },

      /**
       * Build the source groups to be cycled for matched results
       *
       * @param {Array} data Array of Strings or Array of Objects
       * @param {String} group
       * @param {String} [path]
       * @return {*}
       */
      populateSource: function populateSource(data, group, path) {
        var scope = this,
            groupSource = this.options.source[group],
            extraData = groupSource.ajax && groupSource.data;

        if (path && typeof path === "string") {
          data = this.helper.namespace.call(this, path, data);
        }

        if (typeof data === "undefined") {
          // {debug}
          if (this.options.debug) {
            _debug.log({
              node: this.selector,
              function: "populateSource()",
              arguments: path,
              message: "Invalid data path."
            });

            _debug.print();
          } // {/debug}

        }

        if (!Array.isArray(data)) {
          // {debug}
          if (this.options.debug) {
            _debug.log({
              node: this.selector,
              function: "populateSource()",
              arguments: JSON.stringify({
                group: group
              }),
              message: "Invalid data type, must be Array type."
            });

            _debug.print();
          } // {/debug}


          data = [];
        }

        if (extraData) {
          if (typeof extraData === "function") {
            extraData = extraData();
          }

          if (Array.isArray(extraData)) {
            data = data.concat(extraData);
          } else {
            // {debug}
            if (this.options.debug) {
              _debug.log({
                node: this.selector,
                function: "populateSource()",
                arguments: JSON.stringify(extraData),
                message: "WARNING - this.options.source." + group + ".data Must be an Array or a function that returns an Array."
              });

              _debug.print();
            } // {/debug}

          }
        }

        var tmpObj,
            display = groupSource.display ? groupSource.display[0] === "compiled" ? groupSource.display[1] : groupSource.display[0] : this.options.display[0] === "compiled" ? this.options.display[1] : this.options.display[0];

        for (var i = 0, ii = data.length; i < ii; i++) {
          if (data[i] === null || typeof data[i] === "boolean") {
            // {debug}
            if (this.options.debug) {
              _debug.log({
                node: this.selector,
                function: "populateSource()",
                message: "WARNING - NULL/BOOLEAN value inside " + group + "! The data was skipped."
              });

              _debug.print();
            } // {/debug}


            continue;
          }

          if (typeof data[i] === "string") {
            tmpObj = {};
            tmpObj[display] = data[i];
            data[i] = tmpObj;
          }

          data[i].group = group;
        }

        if (!this.hasDynamicGroups && this.dropdownFilter.dynamic.length) {
          var key,
              value,
              tmpValues = {};

          for (var i = 0, ii = data.length; i < ii; i++) {
            for (var k = 0, kk = this.dropdownFilter.dynamic.length; k < kk; k++) {
              key = this.dropdownFilter.dynamic[k].key;
              value = data[i][key];
              if (!value) continue;

              if (!this.dropdownFilter.dynamic[k].value) {
                this.dropdownFilter.dynamic[k].value = [];
              }

              if (!tmpValues[key]) {
                tmpValues[key] = [];
              }

              if (!~tmpValues[key].indexOf(value.toLowerCase())) {
                tmpValues[key].push(value.toLowerCase());
                this.dropdownFilter.dynamic[k].value.push(value);
              }
            }
          }
        }

        if (this.options.correlativeTemplate) {
          var template = groupSource.template || this.options.template,
              compiledTemplate = "";

          if (typeof template === "function") {
            template = template.call(this, "", {});
          }

          if (!template) {
            // {debug}
            if (this.options.debug) {
              _debug.log({
                node: this.selector,
                function: "populateSource()",
                arguments: String(group),
                message: "WARNING - this.options.correlativeTemplate is enabled but no template was found."
              });

              _debug.print();
            } // {/debug}

          } else {
            // #109 correlativeTemplate can be an array of display keys instead of the complete template
            if (Array.isArray(this.options.correlativeTemplate)) {
              for (var i = 0, ii = this.options.correlativeTemplate.length; i < ii; i++) {
                compiledTemplate += "{{" + this.options.correlativeTemplate[i] + "}} ";
              }
            } else {
              // Strip down the html tags, #351 if the template needs "<>" use html entities instead &#60;{{email}}&#62;
              compiledTemplate = template.replace(/<.+?>/g, " ").replace(/\s{2,}/, " ").trim();
            }

            for (var i = 0, ii = data.length; i < ii; i++) {
              // Fix #351, convert htmlEntities from the template string
              data[i].compiled = $("<textarea />").html(compiledTemplate.replace(/\{\{([\w\-\.]+)(?:\|(\w+))?}}/g, function (match, index) {
                return scope.helper.namespace.call(scope, index, data[i], "get", "");
              }).trim()).text();
            }

            if (groupSource.display) {
              if (!~groupSource.display.indexOf("compiled")) {
                groupSource.display.unshift("compiled");
              }
            } else if (!~this.options.display.indexOf("compiled")) {
              this.options.display.unshift("compiled");
            }
          }
        }

        if (this.options.callback.onPopulateSource) {
          data = this.helper.executeCallback.call(this, this.options.callback.onPopulateSource, [this.node, data, group, path]); // {debug}

          if (this.options.debug) {
            if (!data || !Array.isArray(data)) {
              _debug.log({
                node: this.selector,
                function: "callback.populateSource()",
                message: 'callback.onPopulateSource must return the "data" parameter'
              });

              _debug.print();
            }
          } // {/debug}

        } // Save the data inside tmpSource to re-order once every requests are completed


        this.tmpSource[group] = Array.isArray(data) && data || [];
        var cache = this.options.source[group].cache,
            compression = this.options.source[group].compression,
            ttl = this.options.source[group].ttl || this.options.ttl;

        if (cache && !window[cache].getItem("TYPEAHEAD_" + this.selector + ":" + group)) {
          if (this.options.callback.onCacheSave) {
            data = this.helper.executeCallback.call(this, this.options.callback.onCacheSave, [this.node, data, group, path]); // {debug}

            if (this.options.debug) {
              if (!data || !Array.isArray(data)) {
                _debug.log({
                  node: this.selector,
                  function: "callback.populateSource()",
                  message: 'callback.onCacheSave must return the "data" parameter'
                });

                _debug.print();
              }
            } // {/debug}

          }

          var storage = JSON.stringify({
            data: data,
            ttl: new Date().getTime() + ttl
          });

          if (compression) {
            storage = LZString.compressToUTF16(storage);
          }

          window[cache].setItem("TYPEAHEAD_" + this.selector + ":" + group, storage);
        }

        this.incrementGeneratedGroup();
      },
      incrementGeneratedGroup: function incrementGeneratedGroup() {
        this.generatedGroupCount++;

        if (!this.options.abortAjax) {
          if (this.generatedGroupCount !== this.generateGroups.length) ;
        }

        this.xhr = {};

        for (var i = 0, ii = this.generateGroups.length; i < ii; i++) {
          this.source[this.generateGroups[i]] = this.tmpSource[this.generateGroups[i]];
        }

        if (!this.hasDynamicGroups) {
          this.buildDropdownItemLayout("dynamic");
        }

        this.options.loadingAnimation && this.container.removeClass("loading");
        this.node.trigger("search" + this.namespace);
      },

      /**
       * Key Navigation
       * tab 9: if option is enabled, blur Typeahead
       * Up 38: select previous item, skip "group" item
       * Down 40: select next item, skip "group" item
       * Right 39: change charAt, if last char fill hint (if options is true)
       * Esc 27: clears input (is not empty) / blur (if empty)
       * Enter 13: Select item + submit search
       *
       * @param {Object} e Event object
       * @returns {*}
       */
      navigate: function navigate(e) {
        this.helper.executeCallback.call(this, this.options.callback.onNavigateBefore, [this.node, this.query, e]);

        if (e.keyCode === 27) {
          // #166 Different browsers do not have the same behaviors by default, lets enforce what we want instead
          e.preventDefault();

          if (this.query.length) {
            this.resetInput();
            this.node.trigger("input" + this.namespace, [e]);
          } else {
            this.node.blur();
            this.hideLayout();
          }

          return;
        }

        if (!this.result.length) return;
        var itemList = this.resultContainer.find("." + this.options.selector.item).not("[disabled]"),
            activeItem = itemList.filter(".active"),
            activeItemIndex = activeItem[0] ? itemList.index(activeItem) : null,
            activeDataIndex = activeItem[0] ? activeItem.attr("data-index") : null,
            newActiveItemIndex = null,
            newActiveDataIndex = null;
        this.clearActiveItem();
        this.helper.executeCallback.call(this, this.options.callback.onLeave, [this.node, activeItemIndex !== null && itemList.eq(activeItemIndex) || undefined, activeDataIndex !== null && this.result[activeDataIndex] || undefined, e]);

        if (e.keyCode === 13) {
          // Chrome needs preventDefault else the input search event is triggered
          e.preventDefault(); // select if only one item

          if (itemList.length === 1) {
            itemList.click();
          }

          if (activeItem.length > 0) {
            // #311 When href is defined and "enter" is pressed, it needs to act as a "clicked" link
            if (activeItem.find("a:first")[0].href === "javascript:;") {
              activeItem.find("a:first").trigger("click", e);
            } else {
              activeItem.find("a:first")[0].click();
            }
          } else {
            this.node.closest("form").trigger("submit");
          }

          return;
        }

        if (e.keyCode === 15802020) {
          if (activeItemIndex !== null) {
            itemList.eq(activeItemIndex).find("a:first")[0].click();
          } else if (this.options.hint && this.hint.container.val() !== "" && this.helper.getCaret(this.node[0]) >= this.query.length) {
            itemList.filter('[data-index="' + this.hintIndex + '"]').find("a:first")[0].click();
          }

          return;
        } // #284 Blur Typeahead when "Tab" key is pressed
        // #326 Improve Up / Down / Tab navigation to have only 1 "selected" item


        if (e.keyCode === 9) {
          if (this.options.blurOnTab) {
            this.hideLayout();
          } else {
            if (activeItem.length > 0) {
              if (activeItemIndex + 1 < itemList.length) {
                e.preventDefault();
                newActiveItemIndex = activeItemIndex + 1;
                this.addActiveItem(itemList.eq(newActiveItemIndex));
              } else {
                this.hideLayout();
              }
            } else {
              if (itemList.length) {
                e.preventDefault();
                newActiveItemIndex = 0;
                this.addActiveItem(itemList.first());
              } else {
                this.hideLayout();
              }
            }
          }
        } else if (e.keyCode === 38) {
          e.preventDefault();

          if (activeItem.length > 0) {
            if (activeItemIndex - 1 >= 0) {
              newActiveItemIndex = activeItemIndex - 1;
              this.addActiveItem(itemList.eq(newActiveItemIndex));
            }
          } else if (itemList.length) {
            newActiveItemIndex = itemList.length - 1;
            this.addActiveItem(itemList.last());
          }
        } else if (e.keyCode === 40) {
          e.preventDefault();

          if (activeItem.length > 0) {
            if (activeItemIndex + 1 < itemList.length) {
              newActiveItemIndex = activeItemIndex + 1;
              this.addActiveItem(itemList.eq(newActiveItemIndex));
            }
          } else if (itemList.length) {
            newActiveItemIndex = 0;
            this.addActiveItem(itemList.first());
          }
        }

        newActiveDataIndex = newActiveItemIndex !== null ? itemList.eq(newActiveItemIndex).attr("data-index") : null;
        this.helper.executeCallback.call(this, this.options.callback.onEnter, [this.node, newActiveItemIndex !== null && itemList.eq(newActiveItemIndex) || undefined, newActiveDataIndex !== null && this.result[newActiveDataIndex] || undefined, e]); // #115 Prevent the input from changing when navigating (arrow up / down) the results

        if (e.preventInputChange && ~[38, 40].indexOf(e.keyCode)) {
          this.buildHintLayout(newActiveDataIndex !== null && newActiveDataIndex < this.result.length ? [this.result[newActiveDataIndex]] : null);
        }

        if (this.options.hint && this.hint.container) {
          this.hint.container.css("color", e.preventInputChange ? this.hint.css.color : newActiveDataIndex === null && this.hint.css.color || this.hint.container.css("background-color") || "fff");
        }

        var nodeValue = newActiveDataIndex === null || e.preventInputChange ? this.rawQuery : this.getTemplateValue.call(this, this.result[newActiveDataIndex]);
        this.node.val(nodeValue);

        if (this.isContentEditable) {
          this.node.text(nodeValue);
        }

        this.helper.executeCallback.call(this, this.options.callback.onNavigateAfter, [this.node, itemList, newActiveItemIndex !== null && itemList.eq(newActiveItemIndex).find("a:first") || undefined, newActiveDataIndex !== null && this.result[newActiveDataIndex] || undefined, this.query, e]);
      },
      getTemplateValue: function getTemplateValue(item) {
        if (!item) return;
        var templateValue = item.group && this.options.source[item.group].templateValue || this.options.templateValue;

        if (typeof templateValue === "function") {
          templateValue = templateValue.call(this);
        }

        if (!templateValue) {
          return this.helper.namespace.call(this, item.matchedKey, item).toString();
        }

        var scope = this;
        return templateValue.replace(/\{\{([\w\-.]+)}}/gi, function (match, index) {
          return scope.helper.namespace.call(scope, index, item, "get", "");
        });
      },
      clearActiveItem: function clearActiveItem() {
        this.resultContainer.find("." + this.options.selector.item).removeClass("active");
      },
      addActiveItem: function addActiveItem(item) {
        item.addClass("active");
      },
      searchResult: function searchResult() {
        this.resetLayout();
        if (this.helper.executeCallback.call(this, this.options.callback.onSearch, [this.node, this.query]) === false) return;

        if (this.searchGroups.length && !(this.options.multiselect && this.options.multiselect.limit && this.items.length >= this.options.multiselect.limit)) {
          this.searchResultData();
        }

        this.helper.executeCallback.call(this, this.options.callback.onResult, [this.node, this.query, this.result, this.resultCount, this.resultCountPerGroup]);

        if (this.isDropdownEvent) {
          this.helper.executeCallback.call(this, this.options.callback.onDropdownFilter, [this.node, this.query, this.filters.dropdown, this.result]);
          this.isDropdownEvent = false;
        }
      },
      searchResultData: function searchResultData() {
        var scope = this,
            group,
            groupBy = this.groupBy,
            groupReference = null,
            item,
            match,
            comparedDisplay,
            comparedQuery = this.query.toLowerCase(),
            maxItem = this.options.maxItem,
            maxItemPerGroup = this.options.maxItemPerGroup,
            hasDynamicFilters = this.filters.dynamic && !this.helper.isEmpty(this.filters.dynamic),
            displayKeys,
            displayValue,
            missingDisplayKey = {},
            groupFilter,
            groupFilterResult,
            groupMatcher,
            groupMatcherResult,
            matcher = typeof this.options.matcher === "function" && this.options.matcher,
            correlativeMatch,
            correlativeQuery,
            correlativeDisplay;

        if (this.options.accent) {
          comparedQuery = this.helper.removeAccent.call(this, comparedQuery);
        }

        for (var i = 0, ii = this.searchGroups.length; i < ii; ++i) {
          group = this.searchGroups[i];
          if (this.filters.dropdown && this.filters.dropdown.key === "group" && this.filters.dropdown.value !== group) continue;
          groupFilter = typeof this.options.source[group].filter !== "undefined" ? this.options.source[group].filter : this.options.filter;
          groupMatcher = typeof this.options.source[group].matcher === "function" && this.options.source[group].matcher || matcher;

          for (var k = 0, kk = this.source[group].length; k < kk; k++) {
            if (this.resultItemCount >= maxItem && !this.options.callback.onResult) break;
            if (hasDynamicFilters && !this.dynamicFilter.validate.apply(this, [this.source[group][k]])) continue;
            item = this.source[group][k]; // Validation over null item

            if (item === null || typeof item === "boolean") continue;
            if (this.options.multiselect && !this.isMultiselectUniqueData(item)) continue; // dropdownFilter by custom groups

            if (this.filters.dropdown && (item[this.filters.dropdown.key] || "").toLowerCase() !== (this.filters.dropdown.value || "").toLowerCase()) {
              continue;
            }

            groupReference = groupBy === "group" ? group : item[groupBy] ? item[groupBy] : item.group;

            if (groupReference && !this.tmpResult[groupReference]) {
              this.tmpResult[groupReference] = [];
              this.resultCountPerGroup[groupReference] = 0;
            }

            if (maxItemPerGroup) {
              if (groupBy === "group" && this.tmpResult[groupReference].length >= maxItemPerGroup && !this.options.callback.onResult) {
                break;
              }
            }

            displayKeys = this.options.source[group].display || this.options.display;

            for (var v = 0, vv = displayKeys.length; v < vv; ++v) {
              // #286 option.filter: false shouldn't bother about the option.display keys
              if (groupFilter !== false) {
                // #183 Allow searching for deep source object keys
                displayValue = /\./.test(displayKeys[v]) ? this.helper.namespace.call(this, displayKeys[v], item) : item[displayKeys[v]]; // #182 Continue looping if empty or undefined key

                if (typeof displayValue === "undefined" || displayValue === "") {
                  // {debug}
                  if (this.options.debug) {
                    missingDisplayKey[v] = {
                      display: displayKeys[v],
                      data: item
                    };
                  } // {/debug}


                  continue;
                }

                displayValue = this.helper.cleanStringFromScript(displayValue);
              }

              if (typeof groupFilter === "function") {
                groupFilterResult = groupFilter.call(this, item, displayValue); // return undefined to skip to next item
                // return false to attempt the matching function on the next displayKey
                // return true to add the item to the result list
                // return item object to modify the item and add it to the result list

                if (groupFilterResult === undefined) break;
                if (!groupFilterResult) continue;

                if (_typeof_1(groupFilterResult) === "object") {
                  item = groupFilterResult;
                }
              }

              if (~[undefined, true].indexOf(groupFilter)) {
                if (displayValue === null) continue;
                comparedDisplay = displayValue;
                comparedDisplay = comparedDisplay.toString().toLowerCase();

                if (this.options.accent) {
                  comparedDisplay = this.helper.removeAccent.call(this, comparedDisplay);
                }

                match = comparedDisplay.indexOf(comparedQuery);

                if (this.options.correlativeTemplate && displayKeys[v] === "compiled" && match < 0 && /\s/.test(comparedQuery)) {
                  correlativeMatch = true;
                  correlativeQuery = comparedQuery.split(" ");
                  correlativeDisplay = comparedDisplay;

                  for (var x = 0, xx = correlativeQuery.length; x < xx; x++) {
                    if (correlativeQuery[x] === "") continue;

                    if (!~correlativeDisplay.indexOf(correlativeQuery[x])) {
                      correlativeMatch = false;
                      break;
                    }

                    correlativeDisplay = correlativeDisplay.replace(correlativeQuery[x], "");
                  }
                }

                if (match < 0 && !correlativeMatch) continue;
                if (this.options.offset && match !== 0) continue;

                if (groupMatcher) {
                  groupMatcherResult = groupMatcher.call(this, item, displayValue); // return undefined to skip to next item
                  // return false to attempt the matching function on the next displayKey
                  // return true to add the item to the result list
                  // return item object to modify the item and add it to the result list

                  if (groupMatcherResult === undefined) break;
                  if (!groupMatcherResult) continue;

                  if (_typeof_1(groupMatcherResult) === "object") {
                    item = groupMatcherResult;
                  }
                }
              }

              this.resultCount++;
              this.resultCountPerGroup[groupReference]++;

              if (this.resultItemCount < maxItem) {
                if (maxItemPerGroup && this.tmpResult[groupReference].length >= maxItemPerGroup) {
                  break;
                }

                this.tmpResult[groupReference].push($.extend(true, {
                  matchedKey: displayKeys[v]
                }, item));
                this.resultItemCount++;
              }

              break;
            }

            if (!this.options.callback.onResult) {
              if (this.resultItemCount >= maxItem) {
                break;
              }

              if (maxItemPerGroup && this.tmpResult[groupReference].length >= maxItemPerGroup) {
                if (groupBy === "group") {
                  break;
                }
              }
            }
          }
        } // {debug}


        if (this.options.debug) {
          if (!this.helper.isEmpty(missingDisplayKey)) {
            _debug.log({
              node: this.selector,
              function: "searchResult()",
              arguments: JSON.stringify(missingDisplayKey),
              message: "Missing keys for display, make sure options.display is set properly."
            });

            _debug.print();
          }
        } // {/debug}


        if (this.options.order) {
          var displayKeys = [],
              displayKey;

          for (var group in this.tmpResult) {
            if (!this.tmpResult.hasOwnProperty(group)) continue;

            for (var i = 0, ii = this.tmpResult[group].length; i < ii; i++) {
              displayKey = this.options.source[this.tmpResult[group][i].group].display || this.options.display;

              if (!~displayKeys.indexOf(displayKey[0])) {
                displayKeys.push(displayKey[0]);
              }
            }

            this.tmpResult[group].sort(scope.helper.sort(displayKeys, scope.options.order === "asc", function (a) {
              return a.toString().toUpperCase();
            }));
          }
        }

        var concatResults = [],
            groupOrder = [];

        if (typeof this.options.groupOrder === "function") {
          groupOrder = this.options.groupOrder.apply(this, [this.node, this.query, this.tmpResult, this.resultCount, this.resultCountPerGroup]);
        } else if (Array.isArray(this.options.groupOrder)) {
          groupOrder = this.options.groupOrder;
        } else if (typeof this.options.groupOrder === "string" && ~["asc", "desc"].indexOf(this.options.groupOrder)) {
          groupOrder = Object.keys(this.tmpResult).sort(scope.helper.sort([], scope.options.groupOrder === "asc", function (a) {
            return a.toString().toUpperCase();
          }));
        } else {
          groupOrder = Object.keys(this.tmpResult);
        }

        for (var i = 0, ii = groupOrder.length; i < ii; i++) {
          concatResults = concatResults.concat(this.tmpResult[groupOrder[i]] || []);
        } // #286 groupTemplate option was deleting group reference Array


        this.groups = JSON.parse(JSON.stringify(groupOrder));
        this.result = concatResults;
      },
      buildLayout: function buildLayout() {
        this.buildHtmlLayout();
        this.buildBackdropLayout();
        this.buildHintLayout();

        if (this.options.callback.onLayoutBuiltBefore) {
          this.tmpResultHtml = this.helper.executeCallback.call(this, this.options.callback.onLayoutBuiltBefore, [this.node, this.query, this.result, this.resultHtml]);
        }

        if (this.tmpResultHtml instanceof $) {
          this.resultContainer.html(this.tmpResultHtml);
        } else if (this.resultHtml instanceof $) {
          this.resultContainer.html(this.resultHtml);
        }

        if (this.options.callback.onLayoutBuiltAfter) {
          this.helper.executeCallback.call(this, this.options.callback.onLayoutBuiltAfter, [this.node, this.query, this.result]);
        }
      },
      buildHtmlLayout: function buildHtmlLayout() {
        // #150 Add the option to have no resultList but still perform the search and trigger the callbacks
        if (this.options.resultContainer === false) return;

        if (!this.resultContainer) {
          this.resultContainer = $("<div/>", {
            class: this.options.selector.result
          });
          this.container.append(this.resultContainer);
        }

        var emptyTemplate;

        if (!this.result.length) {
          if (this.options.multiselect && this.options.multiselect.limit && this.items.length >= this.options.multiselect.limit) {
            if (this.options.multiselect.limitTemplate) {
              emptyTemplate = typeof this.options.multiselect.limitTemplate === "function" ? this.options.multiselect.limitTemplate.call(this, this.query) : this.options.multiselect.limitTemplate.replace(/\{\{query}}/gi, $("<div>").text(this.helper.cleanStringFromScript(this.query)).html());
            } else {
              emptyTemplate = "Can't select more than " + this.items.length + " items.";
            }
          } else if (this.options.emptyTemplate && this.query !== "") {
            emptyTemplate = typeof this.options.emptyTemplate === "function" ? this.options.emptyTemplate.call(this, this.query) : this.options.emptyTemplate.replace(/\{\{query}}/gi, $("<div>").text(this.helper.cleanStringFromScript(this.query)).html());
          } else {
            return;
          }
        }

        this.displayEmptyTemplate = !!emptyTemplate;

        var _query = this.query.toLowerCase();

        if (this.options.accent) {
          _query = this.helper.removeAccent.call(this, _query);
        }

        var scope = this,
            groupTemplate = this.groupTemplate || "<ul></ul>",
            hasEmptyTemplate = false;

        if (this.groupTemplate) {
          groupTemplate = $(groupTemplate.replace(/<([^>]+)>\{\{(.+?)}}<\/[^>]+>/g, function (match, tag, group, offset, string) {
            var template = "",
                groups = group === "group" ? scope.groups : [group];

            if (!scope.result.length) {
              if (hasEmptyTemplate === true) return "";
              hasEmptyTemplate = true;
              return "<" + tag + ' class="' + scope.options.selector.empty + '">' + emptyTemplate + "</" + tag + ">";
            }

            for (var i = 0, ii = groups.length; i < ii; ++i) {
              template += "<" + tag + ' data-group-template="' + groups[i] + '"><ul></ul></' + tag + ">";
            }

            return template;
          }));
        } else {
          groupTemplate = $(groupTemplate);

          if (!this.result.length) {
            groupTemplate.append(emptyTemplate instanceof $ ? emptyTemplate : '<li class="' + scope.options.selector.empty + '">' + emptyTemplate + "</li>");
          }
        }

        groupTemplate.addClass(this.options.selector.list + (this.helper.isEmpty(this.result) ? " empty" : ""));

        var _group,
            _groupTemplate,
            _item,
            _href,
            _liHtml,
            _template,
            _aHtml,
            _display,
            _displayKeys,
            _displayValue,
            _unusedGroups = this.groupTemplate && this.result.length && scope.groups || [],
            _tmpIndexOf;

        for (var i = 0, ii = this.result.length; i < ii; ++i) {
          _item = this.result[i];
          _group = _item.group;
          _href = !this.options.multiselect && this.options.source[_item.group].href || this.options.href;
          _display = [];
          _displayKeys = this.options.source[_item.group].display || this.options.display;

          if (this.options.group) {
            _group = _item[this.options.group.key];

            if (this.options.group.template) {
              if (typeof this.options.group.template === "function") {
                _groupTemplate = this.options.group.template.call(this, _item);
              } else if (typeof this.options.group.template === "string") {
                _groupTemplate = this.options.group.template.replace(/\{\{([\w\-\.]+)}}/gi, function (match, index) {
                  return scope.helper.namespace.call(scope, index, _item, "get", "");
                });
              }
            }

            if (!groupTemplate.find('[data-search-group="' + _group + '"]')[0]) {
              (this.groupTemplate ? groupTemplate.find('[data-group-template="' + _group + '"] ul') : groupTemplate).append($("<li/>", {
                class: scope.options.selector.group,
                html: $("<a/>", {
                  href: "javascript:;",
                  html: _groupTemplate || _group,
                  tabindex: -1
                }),
                "data-search-group": _group
              }));
            }
          }

          if (this.groupTemplate && _unusedGroups.length) {
            _tmpIndexOf = _unusedGroups.indexOf(_group || _item.group);

            if (~_tmpIndexOf) {
              _unusedGroups.splice(_tmpIndexOf, 1);
            }
          }

          _liHtml = $("<li/>", {
            class: scope.options.selector.item + " " + scope.options.selector.group + "-" + this.helper.slugify.call(this, _group),
            disabled: _item.disabled ? true : false,
            "data-group": _group,
            "data-index": i,
            html: $("<a/>", {
              href: _href && !_item.disabled ? function (href, item) {
                return item.href = scope.generateHref.call(scope, href, item);
              }(_href, _item) : "javascript:;",
              html: function html() {
                _template = _item.group && scope.options.source[_item.group].template || scope.options.template;

                if (_template) {
                  if (typeof _template === "function") {
                    _template = _template.call(scope, scope.query, _item);
                  }

                  _aHtml = _template.replace(/\{\{([^\|}]+)(?:\|([^}]+))*}}/gi, function (match, index, options) {
                    var value = scope.helper.cleanStringFromScript(String(scope.helper.namespace.call(scope, index, _item, "get", ""))); // #151 Slugify should be an option, not enforced

                    options = options && options.split("|") || [];

                    if (~options.indexOf("slugify")) {
                      value = scope.helper.slugify.call(scope, value);
                    }

                    if (!~options.indexOf("raw")) {
                      if (scope.options.highlight === true && _query && ~_displayKeys.indexOf(index)) {
                        value = scope.helper.highlight.call(scope, value, _query.split(" "), scope.options.accent);
                      }
                    }

                    return value;
                  });
                } else {
                  for (var i = 0, ii = _displayKeys.length; i < ii; i++) {
                    _displayValue = /\./.test(_displayKeys[i]) ? scope.helper.namespace.call(scope, _displayKeys[i], _item, "get", "") : _item[_displayKeys[i]];
                    if (typeof _displayValue === "undefined" || _displayValue === "") continue;

                    _display.push(_displayValue);
                  }

                  _aHtml = '<span class="' + scope.options.selector.display + '">' + scope.helper.cleanStringFromScript(String(_display.join(" "))) + "</span>";
                }

                if (scope.options.highlight === true && _query && !_template || scope.options.highlight === "any") {
                  _aHtml = scope.helper.highlight.call(scope, _aHtml, _query.split(" "), scope.options.accent);
                }

                $(this).append(_aHtml);
              }
            })
          });

          (function (i, item, liHtml) {
            liHtml.on("click", function (e, originalEvent) {
              if (item.disabled) {
                e.preventDefault();
                return;
              } // #208 - Attach "keyboard Enter" original event


              if (originalEvent && _typeof_1(originalEvent) === "object") {
                e.originalEvent = originalEvent;
              }

              if (scope.options.mustSelectItem && scope.helper.isEmpty(item)) {
                e.preventDefault();
                return;
              }

              if (!scope.options.multiselect) {
                scope.item = item;
              }

              if (scope.helper.executeCallback.call(scope, scope.options.callback.onClickBefore, [scope.node, $(this), item, e]) === false) return;
              if (e.originalEvent && e.originalEvent.defaultPrevented || e.isDefaultPrevented()) return;

              if (scope.options.multiselect) {
                scope.query = scope.rawQuery = "";
                scope.addMultiselectItemLayout(item);
              } else {
                scope.focusOnly = true;
                scope.query = scope.rawQuery = scope.getTemplateValue.call(scope, item);

                if (scope.isContentEditable) {
                  scope.node.text(scope.query);
                  scope.helper.setCaretAtEnd(scope.node[0]);
                }
              }

              scope.hideLayout();
              scope.node.val(scope.query); // .focus();

              scope.options.cancelButton && scope.toggleCancelButtonVisibility();
              scope.helper.executeCallback.call(scope, scope.options.callback.onClickAfter, [scope.node, $(this), item, e]);
            });
            liHtml.on("mouseenter", function (e) {
              if (!item.disabled) {
                scope.clearActiveItem();
                scope.addActiveItem($(this));
              }

              scope.helper.executeCallback.call(scope, scope.options.callback.onEnter, [scope.node, $(this), item, e]);
            });
            liHtml.on("mouseleave", function (e) {
              if (!item.disabled) {
                scope.clearActiveItem();
              }

              scope.helper.executeCallback.call(scope, scope.options.callback.onLeave, [scope.node, $(this), item, e]);
            });
          })(i, _item, _liHtml);

          (this.groupTemplate ? groupTemplate.find('[data-group-template="' + _group + '"] ul') : groupTemplate).append(_liHtml);
        }

        if (this.result.length && _unusedGroups.length) {
          for (var i = 0, ii = _unusedGroups.length; i < ii; ++i) {
            groupTemplate.find('[data-group-template="' + _unusedGroups[i] + '"]').remove();
          }
        }

        this.resultHtml = groupTemplate;
      },
      generateHref: function generateHref(href, item) {
        var scope = this;

        if (typeof href === "string") {
          href = href.replace(/\{\{([^\|}]+)(?:\|([^}]+))*}}/gi, function (match, index, options) {
            var value = scope.helper.namespace.call(scope, index, item, "get", ""); // #151 Slugify should be an option, not enforced

            options = options && options.split("|") || [];

            if (~options.indexOf("slugify")) {
              value = scope.helper.slugify.call(scope, value);
            }

            return value;
          });
        } else if (typeof href === "function") {
          href = href.call(this, item);
        }

        return href;
      },
      getMultiselectComparedData: function getMultiselectComparedData(item) {
        var uniqueComparedItem = "";

        if (Array.isArray(this.options.multiselect.matchOn)) {
          for (var i = 0, ii = this.options.multiselect.matchOn.length; i < ii; ++i) {
            uniqueComparedItem += typeof item[this.options.multiselect.matchOn[i]] !== "undefined" ? item[this.options.multiselect.matchOn[i]] : "";
          }
        } else {
          var tmpItem = JSON.parse(JSON.stringify(item)),
              extraKeys = ["group", "matchedKey", "compiled", "href"];

          for (var i = 0, ii = extraKeys.length; i < ii; ++i) {
            delete tmpItem[extraKeys[i]];
          }

          uniqueComparedItem = JSON.stringify(tmpItem);
        }

        return uniqueComparedItem;
      },
      buildBackdropLayout: function buildBackdropLayout() {
        if (!this.options.backdrop) return;

        if (!this.backdrop.container) {
          this.backdrop.css = $.extend({
            opacity: 0.6,
            filter: "alpha(opacity=60)",
            position: "fixed",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            "z-index": 1040,
            "background-color": "#000"
          }, this.options.backdrop);
          this.backdrop.container = $("<div/>", {
            class: this.options.selector.backdrop,
            css: this.backdrop.css
          }).insertAfter(this.container);
        }

        this.container.addClass("backdrop").css({
          "z-index": this.backdrop.css["z-index"] + 1,
          position: "relative"
        });
      },
      buildHintLayout: function buildHintLayout(result) {
        if (!this.options.hint) return; // #144 hint doesn't overlap with the input when the query is too long

        if (this.node[0].scrollWidth > Math.ceil(this.node.innerWidth())) {
          this.hint.container && this.hint.container.val("");
          return;
        }

        var scope = this,
            hint = "",
            result = result || this.result,
            query = this.query.toLowerCase();

        if (this.options.accent) {
          query = this.helper.removeAccent.call(this, query);
        }

        this.hintIndex = null;

        if (this.searchGroups.length) {
          if (!this.hint.container) {
            this.hint.css = $.extend({
              "border-color": "transparent",
              position: "absolute",
              top: 0,
              display: "inline",
              "z-index": -1,
              float: "none",
              color: "silver",
              "box-shadow": "none",
              cursor: "default",
              "-webkit-user-select": "none",
              "-moz-user-select": "none",
              "-ms-user-select": "none",
              "user-select": "none"
            }, this.options.hint);
            this.hint.container = $("<" + this.node[0].nodeName + "/>", {
              type: this.node.attr("type"),
              class: this.node.attr("class"),
              readonly: true,
              unselectable: "on",
              "aria-hidden": "true",
              tabindex: -1,
              click: function click() {
                // IE8 Fix
                scope.node.focus();
              }
            }).addClass(this.options.selector.hint).css(this.hint.css).insertAfter(this.node);
            this.node.parent().css({
              position: "relative"
            });
          }

          this.hint.container.css("color", this.hint.css.color); // Do not display hint for empty query

          if (query) {
            var _displayKeys, _group, _comparedValue;

            for (var i = 0, ii = result.length; i < ii; i++) {
              if (result[i].disabled) continue;
              _group = result[i].group;
              _displayKeys = this.options.source[_group].display || this.options.display;

              for (var k = 0, kk = _displayKeys.length; k < kk; k++) {
                _comparedValue = String(result[i][_displayKeys[k]]).toLowerCase();

                if (this.options.accent) {
                  _comparedValue = this.helper.removeAccent.call(this, _comparedValue);
                }

                if (_comparedValue.indexOf(query) === 0) {
                  hint = String(result[i][_displayKeys[k]]);
                  this.hintIndex = i;
                  break;
                }
              }

              if (this.hintIndex !== null) {
                break;
              }
            }
          }

          var hintValue = hint.length > 0 && this.rawQuery + hint.substring(this.query.length) || "";
          this.hint.container.val(hintValue);

          if (this.isContentEditable) {
            this.hint.container.text(hintValue);
          }
        }
      },
      buildDropdownLayout: function buildDropdownLayout() {
        if (!this.options.dropdownFilter) return;
        var scope = this;
        $("<span/>", {
          class: this.options.selector.filter,
          html: function html() {
            $(this).append($("<button/>", {
              type: "button",
              class: scope.options.selector.filterButton,
              style: "display: none;",
              click: function click() {
                scope.container.toggleClass("filter");

                var _ns = scope.namespace + "-dropdown-filter";

                $("html").off(_ns);

                if (scope.container.hasClass("filter")) {
                  $("html").on("click" + _ns + " touchend" + _ns, function (e) {
                    if ($(e.target).closest("." + scope.options.selector.filter)[0] && $(e.target).closest(scope.container)[0] || scope.hasDragged) return;
                    scope.container.removeClass("filter");
                    $("html").off(_ns);
                  });
                }
              }
            }));
            $(this).append($("<ul/>", {
              class: scope.options.selector.dropdown
            }));
          }
        }).insertAfter(scope.container.find("." + scope.options.selector.query));
      },
      buildDropdownItemLayout: function buildDropdownItemLayout(type) {
        if (!this.options.dropdownFilter) return;
        var scope = this,
            template,
            all = typeof this.options.dropdownFilter === "string" && this.options.dropdownFilter || "All",
            ulScope = this.container.find("." + this.options.selector.dropdown),
            filter; // Use regular groups defined in options.source

        if (type === "static" && (this.options.dropdownFilter === true || typeof this.options.dropdownFilter === "string")) {
          this.dropdownFilter.static.push({
            key: "group",
            template: "{{group}}",
            all: all,
            value: Object.keys(this.options.source)
          });
        }

        for (var i = 0, ii = this.dropdownFilter[type].length; i < ii; i++) {
          filter = this.dropdownFilter[type][i];

          if (!Array.isArray(filter.value)) {
            filter.value = [filter.value];
          }

          if (filter.all) {
            this.dropdownFilterAll = filter.all;
          }

          for (var k = 0, kk = filter.value.length; k <= kk; k++) {
            // Only add "all" at the last filter iteration
            if (k === kk && i !== ii - 1) {
              continue;
            } else if (k === kk && i === ii - 1) {
              if (type === "static" && this.dropdownFilter.dynamic.length) {
                continue;
              }
            }

            template = this.dropdownFilterAll || all;

            if (filter.value[k]) {
              if (filter.template) {
                template = filter.template.replace(new RegExp("{{" + filter.key + "}}", "gi"), filter.value[k]);
              } else {
                template = filter.value[k];
              }
            } else {
              this.container.find("." + scope.options.selector.filterButton).html(template);
            }

            (function (k, filter, template) {
              ulScope.append($("<li/>", {
                class: scope.options.selector.dropdownItem + " " + scope.helper.slugify.call(scope, filter.key + "-" + (filter.value[k] || all)),
                html: $("<a/>", {
                  href: "javascript:;",
                  html: template,
                  click: function click(e) {
                    e.preventDefault();

                    _selectFilter.call(scope, {
                      key: filter.key,
                      value: filter.value[k] || "*",
                      template: template
                    });
                  }
                })
              }));
            })(k, filter, template);
          }
        }

        if (this.dropdownFilter[type].length) {
          this.container.find("." + scope.options.selector.filterButton).removeAttr("style");
        }
        /**
         * @private
         * Select the filter and rebuild the result group
         *
         * @param {object} item
         */


        function _selectFilter(item) {
          if (item.value === "*") {
            delete this.filters.dropdown;
          } else {
            this.filters.dropdown = item;
          }

          this.container.removeClass("filter").find("." + this.options.selector.filterButton).html(item.template);
          this.isDropdownEvent = true;
          this.node.trigger("input" + this.namespace);

          if (this.options.multiselect) {
            this.adjustInputSize();
          }

          this.node.focus();
        }
      },
      dynamicFilter: {
        isEnabled: false,
        init: function init() {
          if (!this.options.dynamicFilter) return;
          this.dynamicFilter.bind.call(this);
          this.dynamicFilter.isEnabled = true;
        },
        validate: function validate(item) {
          var isValid,
              softValid = null,
              hardValid = null,
              itemValue;

          for (var key in this.filters.dynamic) {
            if (!this.filters.dynamic.hasOwnProperty(key)) continue;

            if (!!~key.indexOf(".")) {
              itemValue = this.helper.namespace.call(this, key, item, "get");
            } else {
              itemValue = item[key];
            }

            if (this.filters.dynamic[key].modifier === "|" && !softValid) {
              softValid = itemValue == this.filters.dynamic[key].value || false;
            }

            if (this.filters.dynamic[key].modifier === "&") {
              // Leaving "==" in case of comparing number with string
              if (itemValue == this.filters.dynamic[key].value) {
                hardValid = true;
              } else {
                hardValid = false;
                break;
              }
            }
          }

          isValid = softValid;

          if (hardValid !== null) {
            isValid = hardValid;

            if (hardValid === true && softValid !== null) {
              isValid = softValid;
            }
          }

          return !!isValid;
        },
        set: function set(key, value) {
          var matches = key.match(/^([|&])?(.+)/);

          if (!value) {
            delete this.filters.dynamic[matches[2]];
          } else {
            this.filters.dynamic[matches[2]] = {
              modifier: matches[1] || "|",
              value: value
            };
          }

          if (this.dynamicFilter.isEnabled) {
            this.generateSource();
          }
        },
        bind: function bind() {
          var scope = this,
              filter;

          for (var i = 0, ii = this.options.dynamicFilter.length; i < ii; i++) {
            filter = this.options.dynamicFilter[i];

            if (typeof filter.selector === "string") {
              filter.selector = $(filter.selector);
            }

            if (!(filter.selector instanceof $) || !filter.selector[0] || !filter.key) {
              // {debug}
              if (this.options.debug) {
                _debug.log({
                  node: this.selector,
                  function: "buildDynamicLayout()",
                  message: 'Invalid jQuery selector or jQuery Object for "filter.selector" or missing filter.key'
                });

                _debug.print();
              } // {/debug}


              continue;
            }

            (function (filter) {
              filter.selector.off(scope.namespace).on("change" + scope.namespace, function () {
                scope.dynamicFilter.set.apply(scope, [filter.key, scope.dynamicFilter.getValue(this)]);
              }).trigger("change" + scope.namespace);
            })(filter);
          }
        },
        getValue: function getValue(tag) {
          var value;

          if (tag.tagName === "SELECT") {
            value = tag.value;
          } else if (tag.tagName === "INPUT") {
            if (tag.type === "checkbox") {
              value = tag.checked && tag.getAttribute("value") || tag.checked || null;
            } else if (tag.type === "radio" && tag.checked) {
              value = tag.value;
            }
          }

          return value;
        }
      },
      buildMultiselectLayout: function buildMultiselectLayout() {
        if (!this.options.multiselect) return;
        var scope = this;
        var multiselectData;
        this.label.container = $("<span/>", {
          class: this.options.selector.labelContainer,
          "data-padding-left": parseFloat(this.node.css("padding-left")) || 0,
          "data-padding-right": parseFloat(this.node.css("padding-right")) || 0,
          "data-padding-top": parseFloat(this.node.css("padding-top")) || 0,
          click: function click(e) {
            if ($(e.target).hasClass(scope.options.selector.labelContainer)) {
              scope.node.focus();
            }
          }
        });
        this.node.closest("." + this.options.selector.query).prepend(this.label.container);
        if (!this.options.multiselect.data) return;

        if (Array.isArray(this.options.multiselect.data)) {
          this.populateMultiselectData(this.options.multiselect.data);
        } else if (typeof this.options.multiselect.data === 'function') {
          multiselectData = this.options.multiselect.data.call(this);

          if (Array.isArray(multiselectData)) {
            this.populateMultiselectData(multiselectData);
          } else if (typeof multiselectData.promise === "function") {
            $.when(multiselectData).then(function (deferredData) {
              if (deferredData && Array.isArray(deferredData)) {
                scope.populateMultiselectData(deferredData);
              }
            });
          }
        }
      },
      isMultiselectUniqueData: function isMultiselectUniqueData(data) {
        var isUniqueData = true;

        for (var x = 0, xx = this.comparedItems.length; x < xx; ++x) {
          if (this.comparedItems[x] === this.getMultiselectComparedData(data)) {
            isUniqueData = false;
            break;
          }
        }

        return isUniqueData;
      },
      populateMultiselectData: function populateMultiselectData(data) {
        for (var i = 0, ii = data.length; i < ii; ++i) {
          this.addMultiselectItemLayout(data[i]);
        }

        this.node.trigger("search" + this.namespace, {
          origin: 'populateMultiselectData'
        });
      },
      addMultiselectItemLayout: function addMultiselectItemLayout(item) {
        if (!this.isMultiselectUniqueData(item)) return;
        this.items.push(item);
        this.comparedItems.push(this.getMultiselectComparedData(item));
        var templateValue = this.getTemplateValue(item);
        var scope = this,
            htmlTag = this.options.multiselect.href ? "a" : "span";
        var label = $("<span/>", {
          class: this.options.selector.label,
          html: $("<" + htmlTag + "/>", {
            text: templateValue,
            click: function click(e) {
              var currentLabel = $(this).closest("." + scope.options.selector.label),
                  index = scope.label.container.find("." + scope.options.selector.label).index(currentLabel);
              scope.options.multiselect.callback && scope.helper.executeCallback.call(scope, scope.options.multiselect.callback.onClick, [scope.node, scope.items[index], e]);
            },
            href: this.options.multiselect.href ? function (item) {
              return scope.generateHref.call(scope, scope.options.multiselect.href, item);
            }(scope.items[scope.items.length - 1]) : null
          })
        });
        label.append($("<span/>", {
          class: this.options.selector.cancelButton,
          html: "×",
          click: function click(e) {
            var label = $(this).closest("." + scope.options.selector.label),
                index = scope.label.container.find("." + scope.options.selector.label).index(label);
            scope.cancelMultiselectItem(index, label, e);
          }
        }));
        this.label.container.append(label);
        this.adjustInputSize();
        return true;
      },
      cancelMultiselectItem: function cancelMultiselectItem(index, label, e) {
        var item = this.items[index];
        label = label || this.label.container.find('.' + this.options.selector.label).eq(index);
        label.remove();
        this.items.splice(index, 1);
        this.comparedItems.splice(index, 1);
        this.options.multiselect.callback && this.helper.executeCallback.call(this, this.options.multiselect.callback.onCancel, [this.node, item, e]);
        this.adjustInputSize();
        this.focusOnly = true;
        this.node.focus().trigger('input' + this.namespace, {
          origin: 'cancelMultiselectItem'
        });
      },
      adjustInputSize: function adjustInputSize() {
        var nodeWidth = this.node[0].getBoundingClientRect().width - (parseFloat(this.label.container.data("padding-right")) || 0) - (parseFloat(this.label.container.css("padding-left")) || 0);
        var labelOuterWidth = 0,
            numberOfRows = 0,
            currentRowWidth = 0,
            isRowAdded = false,
            labelOuterHeight = 0;
        this.label.container.find("." + this.options.selector.label).filter(function (i, v) {
          if (i === 0) {
            labelOuterHeight = $(v)[0].getBoundingClientRect().height + parseFloat($(v).css("margin-bottom") || 0);
          } // labelOuterWidth = Math.round($(v)[0].getBoundingClientRect().width * 100) / 100 + parseFloat($(v).css('margin-right'));


          labelOuterWidth = $(v)[0].getBoundingClientRect().width + parseFloat($(v).css("margin-right") || 0);

          if (currentRowWidth + labelOuterWidth > nodeWidth * 0.7 && !isRowAdded) {
            numberOfRows++;
            isRowAdded = true;
          }

          if (currentRowWidth + labelOuterWidth < nodeWidth) {
            currentRowWidth += labelOuterWidth;
          } else {
            isRowAdded = false;
            currentRowWidth = labelOuterWidth;
          }
        });
        var paddingLeft = parseFloat(this.label.container.data("padding-left") || 0) + (isRowAdded ? 0 : currentRowWidth);
        var paddingTop = numberOfRows * labelOuterHeight + parseFloat(this.label.container.data("padding-top") || 0);
        this.container.find("." + this.options.selector.query).find("input, textarea, [contenteditable], .typeahead__hint").css({
          paddingLeft: paddingLeft,
          paddingTop: paddingTop
        });
      },
      showLayout: function showLayout() {
        if (this.container.hasClass("result") || !this.result.length && !this.displayEmptyTemplate && !this.options.backdropOnFocus) return;

        _addHtmlListeners.call(this);

        this.container.addClass([this.result.length || this.searchGroups.length && this.displayEmptyTemplate ? "result " : "", this.options.hint && this.searchGroups.length ? "hint" : "", this.options.backdrop || this.options.backdropOnFocus ? "backdrop" : ""].join(" "));
        this.helper.executeCallback.call(this, this.options.callback.onShowLayout, [this.node, this.query]);

        function _addHtmlListeners() {
          var scope = this; // If Typeahead is blured by pressing the "Tab" Key, hide the results

          $("html").off("keydown" + this.namespace).on("keydown" + this.namespace, function (e) {
            if (!e.keyCode || e.keyCode !== 9) return;
            setTimeout(function () {
              if (!$(":focus").closest(scope.container).find(scope.node)[0]) {
                scope.hideLayout();
              }
            }, 0);
          }); // If Typeahead is blured by clicking outside, hide the results

          $("html").off("click" + this.namespace + " touchend" + this.namespace).on("click" + this.namespace + " touchend" + this.namespace, function (e) {
            if ($(e.target).closest(scope.container)[0] || $(e.target).closest('.' + scope.options.selector.item)[0] || e.target.className === scope.options.selector.cancelButton || scope.hasDragged) return;
            scope.hideLayout();
          });
        }
      },
      hideLayout: function hideLayout() {
        // Means the container is already hidden
        if (!this.container.hasClass("result") && !this.container.hasClass("backdrop")) return;
        this.container.removeClass("result hint filter" + (this.options.backdropOnFocus && $(this.node).is(":focus") ? "" : " backdrop"));
        if (this.options.backdropOnFocus && this.container.hasClass("backdrop")) return; // Make sure the event HTML gets cleared

        $("html").off(this.namespace);
        this.helper.executeCallback.call(this, this.options.callback.onHideLayout, [this.node, this.query]);
      },
      resetLayout: function resetLayout() {
        this.result = [];
        this.tmpResult = {};
        this.groups = [];
        this.resultCount = 0;
        this.resultCountPerGroup = {};
        this.resultItemCount = 0;
        this.resultHtml = null;

        if (this.options.hint && this.hint.container) {
          this.hint.container.val("");

          if (this.isContentEditable) {
            this.hint.container.text("");
          }
        }
      },
      resetInput: function resetInput() {
        this.node.val("");

        if (this.isContentEditable) {
          this.node.text("");
        }

        this.query = "";
        this.rawQuery = "";
      },
      buildCancelButtonLayout: function buildCancelButtonLayout() {
        if (!this.options.cancelButton) return;
        var scope = this;
        $("<span/>", {
          class: this.options.selector.cancelButton,
          html: "×",
          mousedown: function mousedown(e) {
            // Don't blur the input
            e.stopImmediatePropagation();
            e.preventDefault();
            scope.resetInput();
            scope.node.trigger("input" + scope.namespace, [e]);
          }
        }).insertBefore(this.node);
      },
      toggleCancelButtonVisibility: function toggleCancelButtonVisibility() {
        this.container.toggleClass("cancel", !!this.query.length);
      },
      __construct: function __construct() {
        this.extendOptions();

        if (!this.unifySourceFormat()) {
          return;
        }

        this.dynamicFilter.init.apply(this);
        this.init();
        this.buildDropdownLayout();
        this.buildDropdownItemLayout("static");
        this.buildMultiselectLayout();
        this.delegateEvents();
        this.buildCancelButtonLayout();
        this.helper.executeCallback.call(this, this.options.callback.onReady, [this.node]);
      },
      helper: {
        isEmpty: function isEmpty(obj) {
          for (var prop in obj) {
            if (obj.hasOwnProperty(prop)) return false;
          }

          return true;
        },

        /**
         * Remove every accent(s) from a string
         *
         * @param {String} string
         * @returns {*}
         */
        removeAccent: function removeAccent(string) {
          if (typeof string !== "string") {
            return;
          }

          var accent = _accent;

          if (_typeof_1(this.options.accent) === "object") {
            accent = this.options.accent;
          }

          string = string.toLowerCase().replace(new RegExp("[" + accent.from + "]", "g"), function (match) {
            return accent.to[accent.from.indexOf(match)];
          });
          return string;
        },

        /**
         * Creates a valid url from string
         *
         * @param {String} string
         * @returns {string}
         */
        slugify: function slugify(string) {
          string = String(string);

          if (string !== "") {
            string = this.helper.removeAccent.call(this, string);
            string = string.replace(/[^-a-z0-9]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
          }

          return string;
        },

        /**
         * Sort list of object by key
         *
         * @param {String|Array} field
         * @param {Boolean} reverse
         * @param {Function} primer
         * @returns {Function}
         */
        sort: function sort(field, reverse, primer) {
          var key = function key(x) {
            for (var i = 0, ii = field.length; i < ii; i++) {
              if (typeof x[field[i]] !== "undefined") {
                return primer(x[field[i]]);
              }
            }

            return x;
          };

          reverse = [-1, 1][+!!reverse];
          return function (a, b) {
            return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
          };
        },

        /**
         * Replace a string from-to index
         *
         * @param {String} string The complete string to replace into
         * @param {Number} offset The cursor position to start replacing from
         * @param {Number} length The length of the replacing string
         * @param {String} replace The replacing string
         * @returns {String}
         */
        replaceAt: function replaceAt(string, offset, length, replace) {
          return string.substring(0, offset) + replace + string.substring(offset + length);
        },

        /**
         * Adds <strong> html around a matched string
         *
         * @param {String} string The complete string to match from
         * @param {String} key
         * @param {Boolean} [accents]
         * @returns {*}
         */
        highlight: function highlight(string, keys, accents) {
          string = String(string);
          var searchString = accents && this.helper.removeAccent.call(this, string) || string,
              matches = [];

          if (!Array.isArray(keys)) {
            keys = [keys];
          }

          keys.sort(function (a, b) {
            return b.length - a.length;
          }); // Make sure the '|' join will be safe!

          for (var i = keys.length - 1; i >= 0; i--) {
            if (keys[i].trim() === "") {
              keys.splice(i, 1);
              continue;
            }

            keys[i] = keys[i].replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
          }

          searchString.replace(new RegExp("(?:" + keys.join("|") + ")(?!([^<]+)?>)", "gi"), function (match, index, offset) {
            matches.push({
              offset: offset,
              length: match.length
            });
          });

          for (var i = matches.length - 1; i >= 0; i--) {
            string = this.helper.replaceAt(string, matches[i].offset, matches[i].length, "<strong>" + string.substr(matches[i].offset, matches[i].length) + "</strong>");
          }

          return string;
        },

        /**
         * Get caret position, used for right arrow navigation
         * when hint option is enabled
         * @param {Node} element
         * @returns {Number} Caret position
         */
        getCaret: function getCaret(element) {
          var caretPos = 0;

          if (element.selectionStart) {
            // Input & Textarea
            return element.selectionStart;
          } else if (document.selection) {
            var r = document.selection.createRange();

            if (r === null) {
              return caretPos;
            }

            var re = element.createTextRange(),
                rc = re.duplicate();
            re.moveToBookmark(r.getBookmark());
            rc.setEndPoint("EndToStart", re);
            caretPos = rc.text.length;
          } else if (window.getSelection) {
            // Contenteditable
            var sel = window.getSelection();

            if (sel.rangeCount) {
              var range = sel.getRangeAt(0);

              if (range.commonAncestorContainer.parentNode == element) {
                caretPos = range.endOffset;
              }
            }
          }

          return caretPos;
        },

        /**
         * For [contenteditable] typeahead node only,
         * when an item is clicked set the cursor at the end
         * @param {Node} element
         */
        setCaretAtEnd: function setCaretAtEnd(element) {
          if (typeof window.getSelection !== "undefined" && typeof document.createRange !== "undefined") {
            var range = document.createRange();
            range.selectNodeContents(element);
            range.collapse(false);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
          } else if (typeof document.body.createTextRange !== "undefined") {
            var textRange = document.body.createTextRange();
            textRange.moveToElementText(element);
            textRange.collapse(false);
            textRange.select();
          }
        },

        /**
         * Clean strings from possible XSS (script and iframe tags)
         * @param string
         * @returns {string}
         */
        cleanStringFromScript: function cleanStringFromScript(string) {
          return typeof string === "string" && string.replace(/<\/?(?:script|iframe)\b[^>]*>/gm, "") || string;
        },

        /**
         * Executes an anonymous function or a string reached from the window scope.
         *
         * @example
         * Note: These examples works with every configuration callbacks
         *
         * // An anonymous function inside the "onInit" option
         * onInit: function() { console.log(':D'); };
         *
         * // myFunction() located on window.coucou scope
         * onInit: 'window.coucou.myFunction'
         *
         * // myFunction(a,b) located on window.coucou scope passing 2 parameters
         * onInit: ['window.coucou.myFunction', [':D', ':)']];
         *
         * // Anonymous function to execute a local function
         * onInit: function () { myFunction(':D'); }
         *
         * @param {String|Array} callback The function to be called
         * @param {Array} [extraParams] In some cases the function can be called with Extra parameters (onError)
         * @returns {*}
         */
        executeCallback: function executeCallback(callback, extraParams) {
          if (!callback) {
            return;
          }

          var _callback;

          if (typeof callback === "function") {
            _callback = callback;
          } else if (typeof callback === "string" || Array.isArray(callback)) {
            if (typeof callback === "string") {
              callback = [callback, []];
            }

            _callback = this.helper.namespace.call(this, callback[0], window);

            if (typeof _callback !== "function") {
              // {debug}
              if (this.options.debug) {
                _debug.log({
                  node: this.selector,
                  function: "executeCallback()",
                  arguments: JSON.stringify(callback),
                  message: 'WARNING - Invalid callback function"'
                });

                _debug.print();
              } // {/debug}


              return;
            }
          }

          return _callback.apply(this, (callback[1] || []).concat(extraParams ? extraParams : []));
        },
        namespace: function namespace(string, object, method, defaultValue) {
          if (typeof string !== "string" || string === "") {
            // {debug}
            if (this.options.debug) {
              _debug.log({
                node: this.options.input || this.selector,
                function: "helper.namespace()",
                arguments: string,
                message: 'ERROR - Missing string"'
              });

              _debug.print();
            } // {/debug}


            return false;
          }

          var value = typeof defaultValue !== "undefined" ? defaultValue : undefined; // Exit before looping if the string doesn't contain an object reference

          if (!~string.indexOf(".")) {
            return object[string] || value;
          }

          var parts = string.split("."),
              parent = object || window,
              method = method || "get",
              currentPart = "";

          for (var i = 0, length = parts.length; i < length; i++) {
            currentPart = parts[i];

            if (typeof parent[currentPart] === "undefined") {
              if (~["get", "delete"].indexOf(method)) {
                return typeof defaultValue !== "undefined" ? defaultValue : undefined;
              }

              parent[currentPart] = {};
            }

            if (~["set", "create", "delete"].indexOf(method)) {
              if (i === length - 1) {
                if (method === "set" || method === "create") {
                  parent[currentPart] = value;
                } else {
                  delete parent[currentPart];
                  return true;
                }
              }
            }

            parent = parent[currentPart];
          }

          return parent;
        },
        typeWatch: function () {
          var timer = 0;
          return function (callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
          };
        }()
      }
    };
    /**
     * @public
     * Implement Typeahead on the selected input node.
     *
     * @param {Object} options
     * @return {Object} Modified DOM element
     */

    $.fn.typeahead = $.typeahead = function (options) {
      return _api.typeahead(this, options);
    };
    /**
     * @private
     * API to handles Typeahead methods via jQuery.
     */


    var _api = {
      /**
       * Enable Typeahead
       *
       * @param {Object} node
       * @param {Object} options
       * @returns {*}
       */
      typeahead: function typeahead(node, options) {
        if (!options || !options.source || _typeof_1(options.source) !== "object") {
          // {debug}
          _debug.log({
            node: node.selector || options && options.input,
            function: "$.typeahead()",
            arguments: JSON.stringify(options && options.source || ""),
            message: 'Undefined "options" or "options.source" or invalid source type - Typeahead dropped'
          });

          _debug.print(); // {/debug}


          return;
        }

        if (typeof node === "function") {
          if (!options.input) {
            // {debug}
            _debug.log({
              node: node.selector,
              function: "$.typeahead()",
              //'arguments': JSON.stringify(options),
              message: 'Undefined "options.input" - Typeahead dropped'
            });

            _debug.print(); // {/debug}


            return;
          }

          node = $(options.input);
        }

        if (typeof node[0].value === "undefined") {
          node[0].value = node.text();
        }

        if (!node.length) {
          // {debug}
          _debug.log({
            node: node.selector,
            function: "$.typeahead()",
            arguments: JSON.stringify(options.input),
            message: "Unable to find jQuery input element - Typeahead dropped"
          });

          _debug.print(); // {/debug}


          return;
        } // #270 Forcing node.selector, the property was deleted from jQuery3
        // In case of multiple init, each of the instances needs it's own selector!


        if (node.length === 1) {
          node[0].selector = node.selector || options.input || node[0].nodeName.toLowerCase();
          /*jshint boss:true */

          return window.Typeahead[node[0].selector] = new Typeahead(node, options);
        } else {
          var instances = {},
              instanceName;

          for (var i = 0, ii = node.length; i < ii; ++i) {
            instanceName = node[i].nodeName.toLowerCase();

            if (typeof instances[instanceName] !== "undefined") {
              instanceName += i;
            }

            node[i].selector = instanceName;
            window.Typeahead[instanceName] = instances[instanceName] = new Typeahead(node.eq(i), options);
          }

          return instances;
        }
      }
    }; // {debug}

    var _debug = {
      table: {},
      log: function log(debugObject) {
        if (!debugObject.message || typeof debugObject.message !== "string") {
          return;
        }

        this.table[debugObject.message] = $.extend({
          node: "",
          function: "",
          arguments: ""
        }, debugObject);
      },
      print: function print() {
        if (Typeahead.prototype.helper.isEmpty(this.table) || !console || !console.table) {
          return;
        }

        if (console.group !== undefined || console.table !== undefined) ;

        this.table = {};
      }
    };

    _debug.log({
      message: "WARNING - You are using the DEBUG version. Use /dist/jquery.typeahead.min.js in production."
    });

    _debug.print(); // {/debug}
    // IE8 Shims


    window.console = window.console || {
      log: function log() {}
    };

    if (!Array.isArray) {
      Array.isArray = function (arg) {
        return Object.prototype.toString.call(arg) === "[object Array]";
      };
    }

    if (!("trim" in String.prototype)) {
      String.prototype.trim = function () {
        return this.replace(/^\s+/, "").replace(/\s+$/, "");
      };
    }

    if (!("indexOf" in Array.prototype)) {
      Array.prototype.indexOf = function (find, i
                                          /*opt*/
      ) {
        if (i === undefined) i = 0;
        if (i < 0) i += this.length;
        if (i < 0) i = 0;

        for (var n = this.length; i < n; i++) {
          if (i in this && this[i] === find) return i;
        }

        return -1;
      };
    }

    if (!Object.keys) {
      Object.keys = function (obj) {
        var keys = [],
            k;

        for (k in obj) {
          if (Object.prototype.hasOwnProperty.call(obj, k)) {
            keys.push(k);
          }
        }

        return keys;
      };
    }

    return Typeahead;
  })($);

  var AfdTypeahead =
      /*#__PURE__*/
      function (_addressToolsMixin) {
        inherits(AfdTypeahead, _addressToolsMixin);

        function AfdTypeahead($element, options) {
          var _this;

          classCallCheck(this, AfdTypeahead);

          _this = possibleConstructorReturn(this, getPrototypeOf(AfdTypeahead).call(this, $element, options));

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "init", function () {
            // events
            var event = _this.eventHandler;
            event(_this.$element, 'input', _this.onInput);
            event(_this.$element, 'keydown', _this.uniqueIDTimer);
            event($(document), 'afd:initFields', _this.onAfdInitFields);
            event($(document), 'afd:countryChanged', _this.onAfdCountryChanged);
            event(_this.$searchAgainButton, 'click', _this.onAfdSearchAgainButtonClick);
            _this.options.typeahead.manualInputButton && event(_this.$manualInputButton, 'click', _this.onAfdManualInputButtonClick);
            _this.options.typeahead.manualInputButton && event(_this.$manualInputSearchButton, 'click', _this.onAfdManualInputSearchButtonClick);
            event($(document), 'afd:countryChanged', _this.onCountryChanged);
            event(_this.$reverseGeocodeButton, 'click', _this.onReverseGeocodeButtonClick); //if reverse geocode enabled

            if (_this.options.typeahead.enableReverseGeocode) {
              _this.$typeaheadContainer.addClass('reverse-geocode-enabled');
            }

            try {
              _this.initFields();

              _this.$element.typeahead(_this.typeaheadOptions);
            } catch (err) {
              console.error('Error initisalising typeahead control');
              console.error(err);
            }

            _this.getInitialCountry();
          });

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "setupTypeaheadRequestOptions", function () {
            // setup the request sequencing
            _this.initRequestSequence();

            _this.requestOptions = _this.setupParams({
              data: 'address',
              fields: _this.options.typeahead.postcodeFirst ? 'list' : 'fflist',
              task: 'fastfindv4',
              lookup: '{{query}}',
              allpc: '1',
              matchPositions: _this.options.typeahead.matchPositions ? 1 : 0,
              maxquantity: _this.options.typeahead.maxItems,
              uniqueid: _this.uniqueID
            });
            _this.requestOptions.path = 'Item';
          });

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "prepareTypeaheadOptions", function () {
            return {
              dynamic: true,
              source: {
                lookup: {
                  ajax: _this.requestOptions
                }
              },
              template: '<span>{{List}}</span>',
              templateValue: '{{List}}',
              cancelButton: false,
              emptyTemplate: 'No results found for {{query}}',
              filter: false,
              maxItem: 0,
              minLength: _this.options.typeahead.minLength,
              delay: 20,
              abortAjax: false,
              selector: _this.getTypeaheadSelectors(),
              callback: {
                onResult: _this.onResult,
                onShowLayout: _this.onShowLayout,
                onHideLayout: _this.onHideLayout,
                onLayoutBuiltBefore: _this.onLayoutBuiltBefore,
                onSearch: _this.onSearch,
                onNavigateBefore: _this.onNavigateBefore,
                onClickAfter: _this.onClickAfter
              }
            };
          });

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onInput", function (e) {
            $(document).trigger('afd:typeaheadInput', [e.target.value]);
          });

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onAfdCountryChanged", function (e, country) {
            _this.typeaheadOptions.source.lookup.ajax.data.countryiso = country;

            _this.$resultFields.val('');

            _this.$element.typeahead(_this.typeaheadOptions);
          });

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onAfdInitFields", function () {
            _this.$element.typeahead(_this.typeaheadOptions); // in case the elements were loaded after initialisation re declare variables


            _this.setFields();

            _this.initFields();
          });

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onResult", function (node, query, result, resultHtmlList) {
            // if results are less than the max ask about manual input
            if (_this.options.typeahead.beforeHideResults && _this.options.typeahead.fewResultsManualInput) {
              if (result.length < _this.options.typeahead.maxItems && query.length > 3) {
                window.Typeahead.input.result.push({
                  List: _this.options.typeahead.fewResultsManualInputText,
                  Key: null,
                  group: 'lookup',
                  matchedKey: 'display'
                });
              }
            }
          });

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onShowLayout", function (node, query) {
            // let container = node.closest(this.containers);
            // let _$manualInputButton = !this.multiForms ?
            //  this.$manualInputButton :
            //  container.find('.afd-manual-input-button');
            // hide the manual input button if enabled
            _this.$manualInputButton.hide();
          });

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onHideLayout", function (node, query) {
            var container = node.closest(_this.containers);
            /*let _$manualInputButton = !this.multiForms ?
            this.$manualInputButton :
            container.find('.afd-manual-input-button');
        */
            // show the manual input button if enabled and not all visible

            var allVisible = !_this.multiForms ? $('[data-afd-result]:hidden').length === 0 : container.find('[data-afd-result]:hidden').length === 0;

            if (!allVisible && _this.options.typeahead.manualInputButton) {
              _this.$manualInputButton.show();
            }
          });

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onLayoutBuiltBefore", function (node, query, result, resultHtmlList) {
            if (result.length === 0) {
              return resultHtmlList;
            }

            if (_this.options.typeahead.matchPositions && typeof result[0].matchPositions !== 'undefined') {
              var openingTag = '<span class="afd-matched-highlight">';
              var closingTag = '</span>';
              var tagLengths = openingTag.length + closingTag.length;

              for (var i = 0; i < result.length; i++) {
                var item = result[i];
                var resultItem = $(resultHtmlList.children().eq(i));
                var holder = resultItem.text();

                if (typeof item.matchPositions !== 'undefined') {
                  for (var j = 0; j < item.matchPositions.length; j++) {
                    var position = item.matchPositions[j];
                    var offset = j * tagLengths;
                    var inner = '';
                    inner += holder.substr(0, position[0] + offset);
                    inner += openingTag;
                    inner += holder.substr(position[0] + offset, position[1] - position[0]);
                    inner += closingTag;
                    inner += holder.substr(position[1] + offset);
                    holder = inner;
                  }
                }

                var output = '<a href="javascript:;">';
                output += holder;
                output += '</a>';
                resultHtmlList.children().eq(i).html(output);
              }
            }

            if (result.length === 1) {
              resultHtmlList.children().addClass('active');
            }

            return resultHtmlList;
          });

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onSearch", function (node, query) {
            $('.' + _this.typeaheadOptions.selector.result).empty();
          });

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onNavigateBefore", function (node, query, e) {
            if (~[38, 40].indexOf(event.keyCode)) {
              e.preventInputChange = true;
            }
          });

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onClickAfter", function (node, a, item, event) {
            _this.handleMultiForms();

            $('.afd-typeahead-field input').val('');

            if (!item.Key) {
              _this.showResultFields();

              _this.$fieldSets.show();

              _this.$manualInputButton.hide();

              _this.$manualInputSearchButton.show();

              _this.$typeaheadFieldandLabel.hide();

              return;
            }

            _this.addressRetrieve(item.Key).then(_this.handleAddressRetrieve).fail(function (err) {
              return console.error(err);
            });
          });

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "getTypeaheadSelectors", function (e) {
            return {
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
            };
          });

          _this.controlType = 'typeahead';
          _this.timer = null;
          _this.$reverseGeocodeButton = $element.siblings('.afd-typeahead-reverse-geocode-button');

          _this.setFields(); // specifying controltype is important for the options that the addressTools Mixin uses


          _this.refreshUniqeID();

          _this.setupTypeaheadRequestOptions();

          _this.typeaheadOptions = _this.prepareTypeaheadOptions();
          return _this;
        }

        return AfdTypeahead;
      }(addressToolsMixin(AfdControl));

  var dP$2 = _objectDp.f;
  var FProto = Function.prototype;
  var nameRE = /^\s*function ([^ (]*)/;
  var NAME$1 = 'name';

  // 19.2.4.2 name
  NAME$1 in FProto || _descriptors && dP$2(FProto, NAME$1, {
    configurable: true,
    get: function () {
      try {
        return ('' + this).match(nameRE)[1];
      } catch (e) {
        return '';
      }
    }
  });

  // getting tag from 19.1.3.6 Object.prototype.toString()

  var TAG$1 = _wks('toStringTag');
  // ES3 wrong here
  var ARG = _cof(function () { return arguments; }()) == 'Arguments';

  // fallback for IE11 Script Access Denied error
  var tryGet = function (it, key) {
    try {
      return it[key];
    } catch (e) { /* empty */ }
  };

  var _classof = function (it) {
    var O, T, B;
    return it === undefined ? 'Undefined' : it === null ? 'Null'
        // @@toStringTag case
        : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
            // builtinTag case
            : ARG ? _cof(O)
                // ES3 arguments fallback
                : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
  };

  var _anInstance = function (it, Constructor, name, forbiddenField) {
    if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
      throw TypeError(name + ': incorrect invocation!');
    } return it;
  };

  // call something on iterator step with safe closing on error

  var _iterCall = function (iterator, fn, value, entries) {
    try {
      return entries ? fn(_anObject(value)[0], value[1]) : fn(value);
      // 7.4.6 IteratorClose(iterator, completion)
    } catch (e) {
      var ret = iterator['return'];
      if (ret !== undefined) _anObject(ret.call(iterator));
      throw e;
    }
  };

  // check on default Array iterator

  var ITERATOR$2 = _wks('iterator');
  var ArrayProto$1 = Array.prototype;

  var _isArrayIter = function (it) {
    return it !== undefined && (_iterators.Array === it || ArrayProto$1[ITERATOR$2] === it);
  };

  var ITERATOR$3 = _wks('iterator');

  var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
    if (it != undefined) return it[ITERATOR$3]
        || it['@@iterator']
        || _iterators[_classof(it)];
  };

  var _forOf = createCommonjsModule(function (module) {
    var BREAK = {};
    var RETURN = {};
    var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
      var iterFn = ITERATOR ? function () { return iterable; } : core_getIteratorMethod(iterable);
      var f = _ctx(fn, that, entries ? 2 : 1);
      var index = 0;
      var length, step, iterator, result;
      if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
      // fast case for arrays with default iterator
      if (_isArrayIter(iterFn)) for (length = _toLength(iterable.length); length > index; index++) {
        result = entries ? f(_anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
        if (result === BREAK || result === RETURN) return result;
      } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
        result = _iterCall(iterator, f, step.value, entries);
        if (result === BREAK || result === RETURN) return result;
      }
    };
    exports.BREAK = BREAK;
    exports.RETURN = RETURN;
  });

  // 7.3.20 SpeciesConstructor(O, defaultConstructor)


  var SPECIES$2 = _wks('species');
  var _speciesConstructor = function (O, D) {
    var C = _anObject(O).constructor;
    var S;
    return C === undefined || (S = _anObject(C)[SPECIES$2]) == undefined ? D : _aFunction(S);
  };

  // fast apply, http://jsperf.lnkit.com/fast-apply/5
  var _invoke = function (fn, args, that) {
    var un = that === undefined;
    switch (args.length) {
      case 0: return un ? fn()
          : fn.call(that);
      case 1: return un ? fn(args[0])
          : fn.call(that, args[0]);
      case 2: return un ? fn(args[0], args[1])
          : fn.call(that, args[0], args[1]);
      case 3: return un ? fn(args[0], args[1], args[2])
          : fn.call(that, args[0], args[1], args[2]);
      case 4: return un ? fn(args[0], args[1], args[2], args[3])
          : fn.call(that, args[0], args[1], args[2], args[3]);
    } return fn.apply(that, args);
  };

  var process = _global.process;
  var setTask = _global.setImmediate;
  var clearTask = _global.clearImmediate;
  var MessageChannel = _global.MessageChannel;
  var Dispatch = _global.Dispatch;
  var counter = 0;
  var queue = {};
  var ONREADYSTATECHANGE = 'onreadystatechange';
  var defer, channel, port;
  var run = function () {
    var id = +this;
    // eslint-disable-next-line no-prototype-builtins
    if (queue.hasOwnProperty(id)) {
      var fn = queue[id];
      delete queue[id];
      fn();
    }
  };
  var listener = function (event) {
    run.call(event.data);
  };
  // Node.js 0.9+ & IE10+ has setImmediate, otherwise:
  if (!setTask || !clearTask) {
    setTask = function setImmediate(fn) {
      var args = [];
      var i = 1;
      while (arguments.length > i) args.push(arguments[i++]);
      queue[++counter] = function () {
        // eslint-disable-next-line no-new-func
        _invoke(typeof fn == 'function' ? fn : Function(fn), args);
      };
      defer(counter);
      return counter;
    };
    clearTask = function clearImmediate(id) {
      delete queue[id];
    };
    // Node.js 0.8-
    if (_cof(process) == 'process') {
      defer = function (id) {
        process.nextTick(_ctx(run, id, 1));
      };
      // Sphere (JS game engine) Dispatch API
    } else if (Dispatch && Dispatch.now) {
      defer = function (id) {
        Dispatch.now(_ctx(run, id, 1));
      };
      // Browsers with MessageChannel, includes WebWorkers
    } else if (MessageChannel) {
      channel = new MessageChannel();
      port = channel.port2;
      channel.port1.onmessage = listener;
      defer = _ctx(port.postMessage, port, 1);
      // Browsers with postMessage, skip WebWorkers
      // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
    } else if (_global.addEventListener && typeof postMessage == 'function' && !_global.importScripts) {
      defer = function (id) {
        _global.postMessage(id + '', '*');
      };
      _global.addEventListener('message', listener, false);
      // IE8-
    } else if (ONREADYSTATECHANGE in _domCreate('script')) {
      defer = function (id) {
        _html.appendChild(_domCreate('script'))[ONREADYSTATECHANGE] = function () {
          _html.removeChild(this);
          run.call(id);
        };
      };
      // Rest old browsers
    } else {
      defer = function (id) {
        setTimeout(_ctx(run, id, 1), 0);
      };
    }
  }
  var _task = {
    set: setTask,
    clear: clearTask
  };

  var macrotask = _task.set;
  var Observer = _global.MutationObserver || _global.WebKitMutationObserver;
  var process$1 = _global.process;
  var Promise$1 = _global.Promise;
  var isNode = _cof(process$1) == 'process';

  var _microtask = function () {
    var head, last, notify;

    var flush = function () {
      var parent, fn;
      if (isNode && (parent = process$1.domain)) parent.exit();
      while (head) {
        fn = head.fn;
        head = head.next;
        try {
          fn();
        } catch (e) {
          if (head) notify();
          else last = undefined;
          throw e;
        }
      } last = undefined;
      if (parent) parent.enter();
    };

    // Node.js
    if (isNode) {
      notify = function () {
        process$1.nextTick(flush);
      };
      // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
    } else if (Observer && !(_global.navigator && _global.navigator.standalone)) {
      var toggle = true;
      var node = document.createTextNode('');
      new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
      notify = function () {
        node.data = toggle = !toggle;
      };
      // environments with maybe non-completely correct, but existent Promise
    } else if (Promise$1 && Promise$1.resolve) {
      // Promise.resolve without an argument throws an error in LG WebOS 2
      var promise = Promise$1.resolve(undefined);
      notify = function () {
        promise.then(flush);
      };
      // for other environments - macrotask based on:
      // - setImmediate
      // - MessageChannel
      // - window.postMessag
      // - onreadystatechange
      // - setTimeout
    } else {
      notify = function () {
        // strange IE + webpack dev server bug - use .call(global)
        macrotask.call(_global, flush);
      };
    }

    return function (fn) {
      var task = { fn: fn, next: undefined };
      if (last) last.next = task;
      if (!head) {
        head = task;
        notify();
      } last = task;
    };
  };

  // 25.4.1.5 NewPromiseCapability(C)


  function PromiseCapability(C) {
    var resolve, reject;
    this.promise = new C(function ($$resolve, $$reject) {
      if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
      resolve = $$resolve;
      reject = $$reject;
    });
    this.resolve = _aFunction(resolve);
    this.reject = _aFunction(reject);
  }

  var f$4 = function (C) {
    return new PromiseCapability(C);
  };

  var _newPromiseCapability = {
    f: f$4
  };

  var _perform = function (exec) {
    try {
      return { e: false, v: exec() };
    } catch (e) {
      return { e: true, v: e };
    }
  };

  var navigator = _global.navigator;

  var _userAgent = navigator && navigator.userAgent || '';

  var _promiseResolve = function (C, x) {
    _anObject(C);
    if (_isObject(x) && x.constructor === C) return x;
    var promiseCapability = _newPromiseCapability.f(C);
    var resolve = promiseCapability.resolve;
    resolve(x);
    return promiseCapability.promise;
  };

  var _redefineAll = function (target, src, safe) {
    for (var key in src) _redefine(target, key, src[key], safe);
    return target;
  };

  var ITERATOR$4 = _wks('iterator');
  var SAFE_CLOSING = false;

  try {
    var riter = [7][ITERATOR$4]();
    riter['return'] = function () { SAFE_CLOSING = true; };
  } catch (e) { /* empty */ }

  var _iterDetect = function (exec, skipClosing) {
    if (!skipClosing && !SAFE_CLOSING) return false;
    var safe = false;
    try {
      var arr = [7];
      var iter = arr[ITERATOR$4]();
      iter.next = function () { return { done: safe = true }; };
      arr[ITERATOR$4] = function () { return iter; };
      exec(arr);
    } catch (e) { /* empty */ }
    return safe;
  };

  var task = _task.set;
  var microtask = _microtask();




  var PROMISE = 'Promise';
  var TypeError$1 = _global.TypeError;
  var process$2 = _global.process;
  var versions = process$2 && process$2.versions;
  var v8 = versions && versions.v8 || '';
  var $Promise = _global[PROMISE];
  var isNode$1 = _classof(process$2) == 'process';
  var empty = function () { /* empty */ };
  var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
  var newPromiseCapability = newGenericPromiseCapability = _newPromiseCapability.f;

  var USE_NATIVE = !!function () {
    try {
      // correct subclassing with @@species support
      var promise = $Promise.resolve(1);
      var FakePromise = (promise.constructor = {})[_wks('species')] = function (exec) {
        exec(empty, empty);
      };
      // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
      return (isNode$1 || typeof PromiseRejectionEvent == 'function')
          && promise.then(empty) instanceof FakePromise
          // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
          // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
          // we can't detect it synchronously, so just check versions
          && v8.indexOf('6.6') !== 0
          && _userAgent.indexOf('Chrome/66') === -1;
    } catch (e) { /* empty */ }
  }();

  // helpers
  var isThenable = function (it) {
    var then;
    return _isObject(it) && typeof (then = it.then) == 'function' ? then : false;
  };
  var notify = function (promise, isReject) {
    if (promise._n) return;
    promise._n = true;
    var chain = promise._c;
    microtask(function () {
      var value = promise._v;
      var ok = promise._s == 1;
      var i = 0;
      var run = function (reaction) {
        var handler = ok ? reaction.ok : reaction.fail;
        var resolve = reaction.resolve;
        var reject = reaction.reject;
        var domain = reaction.domain;
        var result, then, exited;
        try {
          if (handler) {
            if (!ok) {
              if (promise._h == 2) onHandleUnhandled(promise);
              promise._h = 1;
            }
            if (handler === true) result = value;
            else {
              if (domain) domain.enter();
              result = handler(value); // may throw
              if (domain) {
                domain.exit();
                exited = true;
              }
            }
            if (result === reaction.promise) {
              reject(TypeError$1('Promise-chain cycle'));
            } else if (then = isThenable(result)) {
              then.call(result, resolve, reject);
            } else resolve(result);
          } else reject(value);
        } catch (e) {
          if (domain && !exited) domain.exit();
          reject(e);
        }
      };
      while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
      promise._c = [];
      promise._n = false;
      if (isReject && !promise._h) onUnhandled(promise);
    });
  };
  var onUnhandled = function (promise) {
    task.call(_global, function () {
      var value = promise._v;
      var unhandled = isUnhandled(promise);
      var result, handler, console;
      if (unhandled) {
        result = _perform(function () {
          if (isNode$1) {
            process$2.emit('unhandledRejection', value, promise);
          } else if (handler = _global.onunhandledrejection) {
            handler({ promise: promise, reason: value });
          } else if ((console = _global.console) && console.error) {
            console.error('Unhandled promise rejection', value);
          }
        });
        // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
        promise._h = isNode$1 || isUnhandled(promise) ? 2 : 1;
      } promise._a = undefined;
      if (unhandled && result.e) throw result.v;
    });
  };
  var isUnhandled = function (promise) {
    return promise._h !== 1 && (promise._a || promise._c).length === 0;
  };
  var onHandleUnhandled = function (promise) {
    task.call(_global, function () {
      var handler;
      if (isNode$1) {
        process$2.emit('rejectionHandled', promise);
      } else if (handler = _global.onrejectionhandled) {
        handler({ promise: promise, reason: promise._v });
      }
    });
  };
  var $reject = function (value) {
    var promise = this;
    if (promise._d) return;
    promise._d = true;
    promise = promise._w || promise; // unwrap
    promise._v = value;
    promise._s = 2;
    if (!promise._a) promise._a = promise._c.slice();
    notify(promise, true);
  };
  var $resolve = function (value) {
    var promise = this;
    var then;
    if (promise._d) return;
    promise._d = true;
    promise = promise._w || promise; // unwrap
    try {
      if (promise === value) throw TypeError$1("Promise can't be resolved itself");
      if (then = isThenable(value)) {
        microtask(function () {
          var wrapper = { _w: promise, _d: false }; // wrap
          try {
            then.call(value, _ctx($resolve, wrapper, 1), _ctx($reject, wrapper, 1));
          } catch (e) {
            $reject.call(wrapper, e);
          }
        });
      } else {
        promise._v = value;
        promise._s = 1;
        notify(promise, false);
      }
    } catch (e) {
      $reject.call({ _w: promise, _d: false }, e); // wrap
    }
  };

  // constructor polyfill
  if (!USE_NATIVE) {
    // 25.4.3.1 Promise(executor)
    $Promise = function Promise(executor) {
      _anInstance(this, $Promise, PROMISE, '_h');
      _aFunction(executor);
      Internal.call(this);
      try {
        executor(_ctx($resolve, this, 1), _ctx($reject, this, 1));
      } catch (err) {
        $reject.call(this, err);
      }
    };
    // eslint-disable-next-line no-unused-vars
    Internal = function Promise(executor) {
      this._c = [];             // <- awaiting reactions
      this._a = undefined;      // <- checked in isUnhandled reactions
      this._s = 0;              // <- state
      this._d = false;          // <- done
      this._v = undefined;      // <- value
      this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
      this._n = false;          // <- notify
    };
    Internal.prototype = _redefineAll($Promise.prototype, {
      // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
      then: function then(onFulfilled, onRejected) {
        var reaction = newPromiseCapability(_speciesConstructor(this, $Promise));
        reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
        reaction.fail = typeof onRejected == 'function' && onRejected;
        reaction.domain = isNode$1 ? process$2.domain : undefined;
        this._c.push(reaction);
        if (this._a) this._a.push(reaction);
        if (this._s) notify(this, false);
        return reaction.promise;
      },
      // 25.4.5.1 Promise.prototype.catch(onRejected)
      'catch': function (onRejected) {
        return this.then(undefined, onRejected);
      }
    });
    OwnPromiseCapability = function () {
      var promise = new Internal();
      this.promise = promise;
      this.resolve = _ctx($resolve, promise, 1);
      this.reject = _ctx($reject, promise, 1);
    };
    _newPromiseCapability.f = newPromiseCapability = function (C) {
      return C === $Promise || C === Wrapper
          ? new OwnPromiseCapability(C)
          : newGenericPromiseCapability(C);
    };
  }

  _export(_export.G + _export.W + _export.F * !USE_NATIVE, { Promise: $Promise });
  _setToStringTag($Promise, PROMISE);
  _setSpecies(PROMISE);
  Wrapper = _core[PROMISE];

  // statics
  _export(_export.S + _export.F * !USE_NATIVE, PROMISE, {
    // 25.4.4.5 Promise.reject(r)
    reject: function reject(r) {
      var capability = newPromiseCapability(this);
      var $$reject = capability.reject;
      $$reject(r);
      return capability.promise;
    }
  });
  _export(_export.S + _export.F * (_library || !USE_NATIVE), PROMISE, {
    // 25.4.4.6 Promise.resolve(x)
    resolve: function resolve(x) {
      return _promiseResolve(_library && this === Wrapper ? $Promise : this, x);
    }
  });
  _export(_export.S + _export.F * !(USE_NATIVE && _iterDetect(function (iter) {
    $Promise.all(iter)['catch'](empty);
  })), PROMISE, {
    // 25.4.4.1 Promise.all(iterable)
    all: function all(iterable) {
      var C = this;
      var capability = newPromiseCapability(C);
      var resolve = capability.resolve;
      var reject = capability.reject;
      var result = _perform(function () {
        var values = [];
        var index = 0;
        var remaining = 1;
        _forOf(iterable, false, function (promise) {
          var $index = index++;
          var alreadyCalled = false;
          values.push(undefined);
          remaining++;
          C.resolve(promise).then(function (value) {
            if (alreadyCalled) return;
            alreadyCalled = true;
            values[$index] = value;
            --remaining || resolve(values);
          }, reject);
        });
        --remaining || resolve(values);
      });
      if (result.e) reject(result.v);
      return capability.promise;
    },
    // 25.4.4.4 Promise.race(iterable)
    race: function race(iterable) {
      var C = this;
      var capability = newPromiseCapability(C);
      var reject = capability.reject;
      var result = _perform(function () {
        _forOf(iterable, false, function (promise) {
          C.resolve(promise).then(capability.resolve, reject);
        });
      });
      if (result.e) reject(result.v);
      return capability.promise;
    }
  });

  var AfdCountries =
      /*#__PURE__*/
      function (_AfdControl) {
        inherits(AfdCountries, _AfdControl);

        function AfdCountries($element, options) {
          var _this;

          classCallCheck(this, AfdCountries);

          _this = possibleConstructorReturn(this, getPrototypeOf(AfdCountries).call(this, $element, options));

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onChange", function (e) {
            $(document).trigger('afd:countryChanged', [e.target.value]);
          });

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "getCountries", function ($element) {
            $(document).trigger('afd:getCountriesStart');
            var externalResolver;
            var outputPromise = new Promise(function (resolve) {
              externalResolver = resolve;
            });

            var requestOptions = _this.setupParams({
              data: 'list',
              task: 'listcountries',
              fields: 'standard'
            });

            $.ajax(requestOptions).done(_this.handleGetCountries.bind(null, externalResolver));
            return outputPromise;
          });

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "handleGetCountries", function (externalResolver, data) {
            var countries = data.Item;
            $.each(countries, function (index, country) {
              var shouldAppend = _this.options.typeahead.availableCountries.length > 0 && _this.options.typeahead.availableCountries.indexOf(country.iso) > -1 || _this.options.country.availableCountries.length > 0 && _this.options.country.availableCountries.indexOf(country.iso) > -1 || _this.options.typeahead.availableCountries.length < 1 && _this.options.country.availableCountries.length < 1;

              if (shouldAppend) {
                _this.$element.append($('<option />').val(country.iso).text(country.name));
              }
            }); // depricated

            if (_this.options.defaultCountry) {
              _this.$element.val(_this.options.defaultCountry);

              $(document).trigger('afd:countryChanged', [_this.$element.val()]);
            } // should use this


            if (_this.options.country.defaultCountry) {
              _this.$element.val(_this.options.country.defaultCountry);

              $(document).trigger('afd:countryChanged', [_this.$element.val()]);
            }

            $(document).trigger('afd:getCountriesComplete', countries);
            externalResolver();
          });

          return _this;
        }

        createClass(AfdCountries, [{
          key: "init",
          value: function init() {
            this.eventHandler(this.$element, 'change', this.onChange);
            return this.getCountries();
          }
        }]);

        return AfdCountries;
      }(AfdControl);

  /* Built-in method references that are verified to be native. */
  var DataView = _getNative(_root, 'DataView');

  var _DataView = DataView;

  /* Built-in method references that are verified to be native. */
  var Promise$2 = _getNative(_root, 'Promise');

  var _Promise = Promise$2;

  /* Built-in method references that are verified to be native. */
  var Set = _getNative(_root, 'Set');

  var _Set = Set;

  /* Built-in method references that are verified to be native. */
  var WeakMap = _getNative(_root, 'WeakMap');

  var _WeakMap = WeakMap;

  /** `Object#toString` result references. */
  var mapTag = '[object Map]',
      objectTag = '[object Object]',
      promiseTag = '[object Promise]',
      setTag = '[object Set]',
      weakMapTag = '[object WeakMap]';

  var dataViewTag = '[object DataView]';

  /** Used to detect maps, sets, and weakmaps. */
  var dataViewCtorString = _toSource(_DataView),
      mapCtorString = _toSource(_Map),
      promiseCtorString = _toSource(_Promise),
      setCtorString = _toSource(_Set),
      weakMapCtorString = _toSource(_WeakMap);

  /**
   * Gets the `toStringTag` of `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  var getTag = _baseGetTag;

  // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
  if ((_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag) ||
      (_Map && getTag(new _Map) != mapTag) ||
      (_Promise && getTag(_Promise.resolve()) != promiseTag) ||
      (_Set && getTag(new _Set) != setTag) ||
      (_WeakMap && getTag(new _WeakMap) != weakMapTag)) {
    getTag = function(value) {
      var result = _baseGetTag(value),
          Ctor = result == objectTag ? value.constructor : undefined,
          ctorString = Ctor ? _toSource(Ctor) : '';

      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString: return dataViewTag;
          case mapCtorString: return mapTag;
          case promiseCtorString: return promiseTag;
          case setCtorString: return setTag;
          case weakMapCtorString: return weakMapTag;
        }
      }
      return result;
    };
  }

  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */

  var _nodeUtil = createCommonjsModule(function (module, exports) {
    /** Detect free variable `exports`. */
    var freeExports = exports && !exports.nodeType && exports;

    /** Detect free variable `module`. */
    var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

    /** Detect the popular CommonJS extension `module.exports`. */
    var moduleExports = freeModule && freeModule.exports === freeExports;

    /** Detect free variable `process` from Node.js. */
    var freeProcess = moduleExports && _freeGlobal.process;

    /** Used to access faster Node.js helpers. */
    var nodeUtil = (function() {
      try {
        // Use `util.types` for Node.js 10+.
        var types = freeModule && freeModule.require && freeModule.require('util').types;

        if (types) {
          return types;
        }

        // Legacy `process.binding('util')` for Node.js < 10.
        return freeProcess && freeProcess.binding && freeProcess.binding('util');
      } catch (e) {}
    }());

    module.exports = nodeUtil;
  });

  /* Node.js helper references. */
  var nodeIsSet = _nodeUtil && _nodeUtil.isSet;

  var AfdLookup =
      /*#__PURE__*/
      function (_addressToolsMixin) {
        inherits(AfdLookup, _addressToolsMixin);

        function AfdLookup($button, $field, $result, options) {
          var _this;

          classCallCheck(this, AfdLookup);

          _this = possibleConstructorReturn(this, getPrototypeOf(AfdLookup).call(this, $button, options));

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onClickButton", function (e) {
            e.preventDefault();

            _this.handleLookup();
          });

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onKeydownField", function () {
            _this.hideResultsElement();
          });

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onKeyupField", function (e) {
            var keycode = e.keyCode ? e.keyCode : e.which;

            if (keycode === 13) {
              e.preventDefault();

              _this.handleLookup();
            } else if (_this.options.lookup.prefetch) {
              var request = _this.addressLookup(e.target.value);

              _this.preFetchRequests.push(request);

              request.then(function (data, status, jqXHR) {
                // We are prefetching results in the background.
                // We are only interested in results that match what is currently in the input
                if (jqXHR.lookup === e.target.value) {
                  _this.results = data.Item;
                  $(document).trigger('afd:pcePrefetchComplete', [data, jqXHR, jqXHR.lookup]);
                }
              });
            }
          });

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onKeyDownResult", function (e) {
            var keycode = e.keyCode ? e.keyCode : e.which;

            if (keycode === 13) {
              e.preventDefault();
            }

            if ([38, 40].indexOf(keycode) > -1) {
              _this.blockChange = true;
            }
          });

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onKeyUpResult", function (e) {
            var keycode = e.keyCode ? e.keyCode : e.which;

            if (keycode === 13) {
              _this.selectResult(e);
            }
          });

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onChangeResult", function (e) {
            if (!_this.blockChange) {
              _this.selectResult(e);
            }

            _this.blockChange = false;
          });

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "hideResultsElement", function () {
            _this.$lookupResult.closest('.afd-form-control').hide();
          });

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "initFieldsLookup", function () {
            if (_this.options.lookup.beforeHideResults) {
              _this.hideResultFields();

              if (_this.options.lookup.postcodeIsLookup) {
                if (_this.options.lookup.parentClass) {
                  $('[data-afd-result="Postcode"]').closest('.' + _this.options.lookup.parentClass).show();
                } else {
                  $('[data-afd-result="Postcode"]').show();
                }
              }
            }
          });

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "handleLookup", function () {
            var val = _this.options.postcodeIsLookup ? $('[data-afd-result="Postcode"]').val() : $('[data-afd-control="lookupField"]').val();

            if (_this.options.lookup.prefetch) {
              if (_this.preFetchRequests.length === 0) {
                _this.$lookupField.trigger('keyup');
              }

              Promise.all(_this.preFetchRequests).then(function () {
                $(document).trigger('afd:lookupComplete', [_this.results]);

                _this.populateResultsList();
              });
            } else {
              var request = _this.address(val);

              request.then(function (data
                                     /*, status, jqXHR*/
              ) {
                _this.results = data.Item;
                $(document).trigger('afd:lookupComplete', [_this.results]);

                _this.populateResultsList();
              });
            }
          });

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "populateResultsList", function () {
            _this.$lookupResult.empty();

            for (var i = 0; i < _this.results.length; i++) {
              var result = _this.results[i];
              $('[data-afd-control="lookupResultsList"]').append('<option value="' + result.Key + '">' + result.List + '</option>');
            }

            _this.$lookupResult.closest('.afd-form-control').show();

            _this.$lookupResult.focus();
          });

          defineProperty(assertThisInitialized(assertThisInitialized(_this)), "selectResult", function (e) {
            if (_this.options.lookup.afterRetrieveHideResultsList) {
              _this.hideResultsElement();
            }

            _this.addressRetrieve(e.target.value).then(function (data) {
              _this.handleAddressRetrieve(data);
            }).fail(function (err) {
              console.error(err);
            });
          });

          _this.$lookupButton = $button;
          _this.$lookupField = options.lookup.postcodeIsLookup ? $('[data-afd-result="Postcode"]') : $field;
          _this.$lookupResult = $result; // specifying controltype is important for the options that the addressTools Mixin uses

          _this.controlType = 'lookup';

          _this.setFields();

          _this.preFetchRequests = [];
          _this.results = [];
          _this.blockChange = false;

          _this.refreshUniqeID();

          return _this;
        }

        createClass(AfdLookup, [{
          key: "init",
          value: function init() {
            // hide result element by default
            this.hideResultsElement(this.$lookupResult, this.options);
            var event = this.eventHandler;
            event(this.$lookupButton, 'click', this.onClickButton);
            event(this.$lookupField, 'keypress', this.uniqueIDTimer);
            event(this.$lookupField, 'keydown', this.onKeydownField);
            event(this.$lookupField, 'keyup', this.onKeyupField);
            event(this.$lookupResult, 'keydown', this.onKeyDownResult);
            event(this.$lookupResult, 'keyup', this.onKeyUpResult);
            event(this.$lookupResult, 'change', this.onChangeResult);
            event(this.$searchAgainButton, 'click', this.onAfdSearchAgainButtonClick);
            this.options.lookup.manualInputButton && event(this.$manualInputButton, 'click', this.onAfdManualInputButtonClick);
            this.options.lookup.manualInputButton && event(this.$manualInputSearchButton, 'click', this.onAfdManualInputSearchButtonClick);
            event($(document), 'afd:countryChanged', this.onCountryChanged);
            this.initFields();
            this.initFieldsLookup();
            this.getInitialCountry();
          }
        }]);

        return AfdLookup;
      }(addressToolsMixin(AfdControl));
  /*


  function

  }



  function


  export {
      lookupButton,
      lookupField,
      lookupResultsList
  };

  */

  var Afd =
      /*#__PURE__*/
      function () {
        function Afd(el, options) {
          classCallCheck(this, Afd);

          $ = window.$;
          this.element = el;
          this.options = options;
        }

        createClass(Afd, [{
          key: "email",
          value: function email() {
            var email = new AfdEmail(this.element, this.options);
            return email.init();
          }
        }, {
          key: "phone",
          value: function phone() {
            var phone = new AfdPhone(this.element, this.options);
            return phone.init();
          }
        }, {
          key: "card",
          value: function card() {
            var card = new AfdCard(this.element, this.options);
            return card.init();
          }
        }, {
          key: "account",
          value: function account() {
            var account = new AfdAccount(this.element, this.options);
            return account.init();
          }
        }, {
          key: "typeahead",
          value: function typeahead() {
            var typeahead = new AfdTypeahead(this.element, this.options);
            return typeahead.init();
          }
        }, {
          key: "country",
          value: function country() {
            var country = new AfdCountries(this.element, this.options);
            return country.init();
          }
        }, {
          key: "lookupButton",
          value: function lookupButton() {
            var $button = $('[data-afd-control="lookupButton"]');
            var $field = $('[data-afd-control="lookupField"]');
            var $result = $('[data-afd-control="lookupResultsList"]');
            var lookup = new AfdLookup($button, $field, $result, this.options);
            return lookup.init();
          }
        }]);

        return Afd;
      }();

  var defaults = {
    pceUrl: '//pce.afd.co.uk/afddata.pce',
    nativeValidationMessages: false,
    defaultCountry: null,
    afdc: 0,
    phone: {
      defaultDialingCode: '+44',
      invalidPhoneNumberMessage: 'Please input a valid phone number'
    },
    email: {
      invalidEmailMessage: 'Please input a valid email address'
    },
    card: {
      invalidCardNumberMessage: 'Please input a valid card number',
      invalidCardOrExpiryMessage: 'Either the card number or expiry date are not valid',
      invalidExpiryMonthMessage: 'Please input a valid month',
      invalidExpiryDateMessage: 'Please input a valid expiry date'
    },
    account: {
      invalidAccountNumberMessage: 'Please input a valid account number',
      invalidSortCodeMessage: 'Please input a valid Sort Code'
    },
    typeahead: {
      maxItems: 5,
      pushUp: false,
      afterHideTypeahead: false,
      searchAgain: true,
      afterClearTypeahead: true,
      beforeHideResults: false,
      parentClass: null,
      fieldSets: [],
      manualInputButton: false,
      fewResultsManualInput: true,
      fewResultsManualInputText: 'Can\'t see your address? Enter it manually',
      notEmptyShowResults: false,
      hideEmpties: false,
      containers: [],
      retrieveFields: 'standard',
      availableCountries: [],
      minLength: 2,
      matchPositions: false,
      postcodeFirst: true,
      hideForCountries: [],
      showForCountries: [],
      containerOnlyContainsControl: false,
      enableReverseGeocode: false
    },
    lookup: {
      prefetch: true,
      pushUp: false,
      beforeHideResults: false,
      parentClass: null,
      fieldSets: [],
      manualInputButton: false,
      hideEmpties: false,
      afterRetrieveHideResultsList: true,
      postcodeIsLookup: false,
      resultsContainer: '',
      containers: [],
      retrieveFields: 'standard',
      availableCountries: [],
      postcodeFirst: true,
      hideForCountries: [],
      showForCountries: []
    },
    country: {
      defaultCountry: null,
      availableCountries: [],
      customCountryControl: null,
      customCountryConverter: null
    }
  };

  // Fields that need to perform ajax requests before the rest of the controls can be initialised
  var dependantFields = ['country'];
  function afdReady() {
    //$(document).ready(function(){
    //    $(document).trigger('afd::page_ready');
    //});
    // Data API definitions
    dataDefinition();
  }

  function dataDefinition() {
    // create an array of promises for dependent requests
    var dependantRequests = []; //First only initialise the controls that other controls are dependant on

    $('[data-afd-control]').each(function () {
      var $this = $(this);
      var controlType = $this.data('afd-control'); // check if this is a control that needs to be initialised before the rest

      if (dependantFields.indexOf(controlType) > -1) {
        // add a new promise to the dependent requests array
        dependantRequests.push(new Promise(function (resolve, reject) {
          initialiseControl($this, controlType, resolve);
        }));
      }
    }); // If there were dependant requests then once they have all completed we can intialise the rest of the controls

    Promise.all(dependantRequests).then(function () {
      // Only do non dependant controls
      $('[data-afd-control]').each(function () {
        var $this = $(this);
        var controlType = $this.data('afd-control');

        if (dependantFields.indexOf(controlType) === -1) {
          initialiseControl($this, controlType);
        }
      });
    });
  }

  function initialiseControl(control, controlType, resolve) {
    // check to see whether or not AFD has been initiated on this control yet
    if (control.data('afdInit') === true) {
      return;
    } // activate the module on this element according to the data-afd-
    // first make sure that the function exists on the afd class


    try {
      control.afd(controlType, resolve);
    } catch (e) {
      console.error(e);
    }
  }

  (function ($) {
    // Plugin Definition
    $.fn.afd = function (control, resolve) {
      var controlType = this.data('afd-control');
      return this.each(function () {
        var $this = $(this); // set afd as initialised on this element

        $this.data('afdInit', true);

        var options = $.extend(true, {}, defaults, afdOptions); // create a new afd object on this control

        var afd = new Afd($this, options); // choose which function should be activated on
        // initialise the control

        var control;

        if (typeof afd[controlType] === 'function') {
          $(document).on('afd:init', function () {
            control = afd[controlType]();
          });
          control = afd[controlType]();
        } // If the control is returning a promise (dependant requests) then resolve it


        if (typeof resolve !== 'undefined') {
          control.then(function () {
            resolve();
          });
        }
      });
    };

    $(document).ready(function () {
      $(document).trigger('afd::page_ready');
    }); // some lazyloaders like require js do not set $ on the window which is required for this module

    if (typeof window.$ === 'undefined') {
      window.$ = $;
    } // Data API definitions


    $(document).on('afd::page_ready', function () {
      afdReady();
    });
  })($$1);

})));
//# sourceMappingURL=afd.jquery.1.9.0.js.map
