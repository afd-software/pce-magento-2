(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery')) :
	typeof define === 'function' && define.amd ? define(['jquery'], factory) :
	(factory(global.$));
}(this, (function ($$1) { 'use strict';

	$$1 = $$1 && $$1.hasOwnProperty('default') ? $$1['default'] : $$1;

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.5.7' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

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

	var id = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

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

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
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

	var defaults = {
	  pceUrl: '//pce.afd.co.uk/afddata.pce',
	  nativeValidationMessages: false,
	  defaultCountry: null,
	  afdc: 0,
	  phone: {
	    defaultDialingCode: '+44',
	    invalidPhoneNumberMessage: 'Please input a valid phone number',
	    loadingSpinner: null,
	    countryControl: null,
	    countryControlConverter: null
	  },
	  email: {
	    invalidEmailMessage: 'Please input a valid email address',
	    loadingSpinner: null
	  },
	  card: {
	    invalidCardNumberMessage: 'Please input a valid card number',
	    invalidCardOrExpiryMessage: 'Either the card number or expiry date are not valid',
	    invalidExpiryMonthMessage: 'Please input a valid month',
	    invalidExpiryDateMessage: 'Please input a valid expiry date',
	    loadingSpinner: null,
	    logoHeight: 16,
	    logoWidth: 24
	  },
	  account: {
	    invalidAccountNumberMessage: 'Please input a valid account number',
	    invalidSortCodeMessage: 'Please input a valid Sort Code',
	    loadingSpinner: null
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
	    regionMap: null,
	    regionAttribute: 'value'
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
	    showForCountries: [],
	    regionMap: null,
	    regionAttribute: 'value',
	    selectAddressText: 'Please select an address',
	    noResultsText: 'No results found, click to enter address manually'
	  },
	  country: {
	    defaultCountry: null,
	    availableCountries: [],
	    preferredCountries: [],
	    customCountryControl: null,
	    customCountryConverter: null
	  },
	  reverseGeocode: {
	    maxItems: 100,
	    pushUp: false,
	    fieldSets: [],
	    hideEmpties: false,
	    afterRetrieveHideResultsList: true,
	    containers: [],
	    retrieveFields: 'standard',
	    postcodeFirst: true,
	    hideForCountries: [],
	    showForCountries: ['GBR'],
	    linkedControl: 'typeahead',
	    hideOnDesktop: false,
	    buttonContainer: null
	  }
	};

	// getting tag from 19.1.3.6 Object.prototype.toString()

	var TAG = _wks('toStringTag');
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
	    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
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

	var _iterators = {};

	// check on default Array iterator

	var ITERATOR = _wks('iterator');
	var ArrayProto$1 = Array.prototype;

	var _isArrayIter = function (it) {
	  return it !== undefined && (_iterators.Array === it || ArrayProto$1[ITERATOR] === it);
	};

	var ITERATOR$1 = _wks('iterator');

	var core_getIteratorMethod = _core.getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$1]
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


	var SPECIES$1 = _wks('species');
	var _speciesConstructor = function (O, D) {
	  var C = _anObject(O).constructor;
	  var S;
	  return C === undefined || (S = _anObject(C)[SPECIES$1]) == undefined ? D : _aFunction(S);
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

	var document$2 = _global.document;
	var _html = document$2 && document$2.documentElement;

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

	var f$1 = function (C) {
	  return new PromiseCapability(C);
	};

	var _newPromiseCapability = {
		f: f$1
	};

	var _perform = function (exec) {
	  try {
	    return { e: false, v: exec() };
	  } catch (e) {
	    return { e: true, v: e };
	  }
	};

	var navigator$1 = _global.navigator;

	var _userAgent = navigator$1 && navigator$1.userAgent || '';

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

	var def = _objectDp.f;

	var TAG$1 = _wks('toStringTag');

	var _setToStringTag = function (it, tag, stat) {
	  if (it && !_has(it = stat ? it : it.prototype, TAG$1)) def(it, TAG$1, { configurable: true, value: tag });
	};

	var SPECIES$2 = _wks('species');

	var _setSpecies = function (KEY) {
	  var C = _global[KEY];
	  if (_descriptors && C && !C[SPECIES$2]) _objectDp.f(C, SPECIES$2, {
	    configurable: true,
	    get: function () { return this; }
	  });
	};

	var ITERATOR$2 = _wks('iterator');
	var SAFE_CLOSING = false;

	try {
	  var riter = [7][ITERATOR$2]();
	  riter['return'] = function () { SAFE_CLOSING = true; };
	} catch (e) { /* empty */ }

	var _iterDetect = function (exec, skipClosing) {
	  if (!skipClosing && !SAFE_CLOSING) return false;
	  var safe = false;
	  try {
	    var arr = [7];
	    var iter = arr[ITERATOR$2]();
	    iter.next = function () { return { done: safe = true }; };
	    arr[ITERATOR$2] = function () { return iter; };
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

	var _iterStep = function (done, value) {
	  return { value: value, done: !!done };
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return _iobject(_defined(it));
	};

	var max = Math.max;
	var min$1 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = _toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
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

	var ITERATOR$3 = _wks('iterator');
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
	  var $native = proto[ITERATOR$3] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
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
	      if (typeof IteratorPrototype[ITERATOR$3] != 'function') _hide(IteratorPrototype, ITERATOR$3, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if (BUGGY || VALUES_BUG || !proto[ITERATOR$3]) {
	    _hide(proto, ITERATOR$3, $default);
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

	var ITERATOR$4 = _wks('iterator');
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

	for (var collections = _objectKeys(DOMIterables), i = 0; i < collections.length; i++) {
	  var NAME = collections[i];
	  var explicit = DOMIterables[NAME];
	  var Collection = _global[NAME];
	  var proto = Collection && Collection.prototype;
	  var key;
	  if (proto) {
	    if (!proto[ITERATOR$4]) _hide(proto, ITERATOR$4, ArrayValues);
	    if (!proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
	    _iterators[NAME] = ArrayValues;
	    if (explicit) for (key in es6_array_iterator) if (!proto[key]) _redefine(proto, key, es6_array_iterator[key], true);
	  }
	}

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

	var $$2 = jQuery;

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


	    var $countryField = $$2('[data-afd-control="country"]');

	    if ($countryField.length > 0) {
	      defaultData.countryiso = $countryField.val();
	    } // checks to see if there is a custom country control and whether or not a function is supplied to turn the value into ISO3


	    if (_this.options.country.customCountryControl) {
	      var customCountryControl = $$2(_this.options.typeahead.containers.toString()).length === 0 ? $$2(_this.options.country.customCountryControl) : _this.$element.closest(_this.options.typeahead.containers.toString()).find(_this.options.country.customCountryControl);

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
	          $$2(document).trigger('afd:pceError', err);
	        },
	        data: $$2.extend(true, {}, defaultData, requestOptions),
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
	    $element.off(event + '.afd' + _this.controlType).on(event + '.afd', handler);
	  });

	  this.$element = $el;
	  this.element = $el.get()[0];

	  if (typeof $el.data('afd-additional-options') !== 'undefined') {
	    var customOptions = window[$el.data('afd-additional-options')];
	    this.options = $$2.extend(true, {}, options, customOptions);
	  } else {
	    this.options = options;
	  }
	};

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
	var isArray = Array.isArray;

	var isArray_1 = isArray;

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

	var $$3 = jQuery; // Common functions and tools for lookup and typeahead

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
	        $$3(document).trigger('afd:pceLookupStarted', [jqXHR, urlParams.get('lookup')]);
	      });

	      defineProperty(assertThisInitialized(assertThisInitialized(_this)), "requestCallback", function (data, textStatus, jqXHR) {
	        $$3(document).trigger('afd:pceLookupComplete', [data, jqXHR, jqXHR.lookup]);
	      });

	      defineProperty(assertThisInitialized(assertThisInitialized(_this)), "refreshUniqeID", function () {
	        _this.uniqueID = _this.getUniqueID();
	      });

	      defineProperty(assertThisInitialized(assertThisInitialized(_this)), "getUniqueID", function () {
	        return Math.floor(Math.random() * 90000) + 10000;
	      });

	      defineProperty(assertThisInitialized(assertThisInitialized(_this)), "setFields", function () {
	        // If reversegeocode is being used then the options should be lifted from the options of the linked control
	        var controlType = _this.options[_this.controlType].linkedControl ? _this.options[_this.controlType].linkedControl : _this.controlType;
	        _this.$typeaheadFieldandLabel = get_1(_this.options, controlType + '.containerOnlyContainsControl', false) ? _this.$typeaheadFieldandLabel = $$3('.afd-typeahead-container') : _this.$typeaheadFieldandLabel = $$3('.afd-typeahead-container label, .afd-typeahead-field');
	        _this.$typeAheadInput = $$3('.afd-typeahead-container input');
	        _this.$resultFields = $$3('[data-afd-result]');
	        _this.$typeaheadContainer = $$3('.afd-typeahead-container');
	        _this.$errorField = $$3('.afd-' + controlType + '-error');
	        _this.$manualInputButton = has_1(_this.options, controlType + '.manualInputButtonIdentifier') ? $$3(_this.options[controlType].manualInputButtonIdentifier) : $$3('.afd-manual-input-button');
	        _this.$manualInputSearchButton = has_1(_this.options, controlType + '.manualInputSearchButtonIdentifier') ? $$3(_this.options[controlType].manualInputSearchButtonIdentifier) : $$3('.afd-manual-input-search-button');
	        _this.$searchAgainButton = has_1(_this.options, controlType + '.searchAgainButtonIdentifier') ? $$3(_this.options[controlType].searchAgainButtonIdentifier) : $$3('.afd-search-again');
	        _this.$fieldSets = $$3(_this.options[controlType].fieldSets.toString());
	        _this.$afdCountryField = $$3('[data-afd-control="country"]').off('change.afd.' + _this.controlType, _this.onCountryChanged).on('change.afd.' + _this.controlType, _this.onCountryChanged);
	        _this.$customCountryField = _this.options.country.customCountryControl ? $$3(_this.options.country.customCountryControl) : null;
	        _this.containers = _this.options[controlType].containers.toString();
	        _this.multiForms = $$3(_this.containers).length > 0; // If a non-afd country control is supplied then listen for changes and fire change event

	        if (_this.$customCountryField) {
	          if (_this.$customCountryField.length === 0) {
	            throw 'Custom country field selector `' + _this.options.country.customCountryControl + '` supplied, but no matching control found.';
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
	              $$3(fieldSets[i]).hide();
	            }
	          }
	        } else {
	          _this.showResultFields();

	          if (fieldSets.length > 0) {
	            for (var _i = 0; _i < fieldSets.length; _i++) {
	              $$3(fieldSets[_i]).show();
	            }
	          }
	        } // If option is set, show fields of not empty regardless of what is set on beforeHideResults
	        // this setting is useful when you are editing a previous address and you want to still show the previous values


	        if (_this.options[controlType].notEmptyShowResults) {
	          var container = _this.$element.closest(_this.containers);

	          var allEmpty = !_this.multiForms ? $$3('[data-afd-result]:empty').filter(function () {
	            return $$3.trim($$3(this).val()).length !== 0;
	          }).length === 0 : container.find('[data-afd-result]:empty').filter(function () {
	            return $$3.trim($$3(this).val()).length !== 0;
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
	          _this.$errorField = container.find('.afd-' + controlType + '-error'); // get rid of old listener before adding new one

	          _this.$afdCountryField = container.find('[data-afd-control="country"]');
	          _this.$customCountryField = _this.options.country.customCountryControl ? container.find(_this.options.country.customCountryControl) : null;
	          _this.$fieldSets = container.find(_this.options[controlType].fieldSets.toString()); // If a non-afd country control is supplied then listen for changes and fire change event

	          if (_this.$customCountryField) {
	            if (_this.$customCountryField.length === 0) {
	              throw 'Custom country field selector `' + _this.options.country.customCountryControl + '` supplied, but no matching control found within container.';
	            }

	            _this.$customCountryField.off('change.afd', _this.onCustomCountryChange).on('change.afd', _this.onCustomCountryChange);
	          }

	          if (_this.$afdCountryField.length > 0) {
	            _this.$afdCountryField.off('change.afd', _this.onCountryChanged).on('change.afd', _this.onCountryChanged);
	          }
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

	        return $$3.ajax(requestOptions);
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

	        return $$3.ajax(requestOptions);
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

	        return $$3.ajax(requestOptions);
	      });

	      defineProperty(assertThisInitialized(assertThisInitialized(_this)), "handleAddressRetrieve", function (data) {
	        var controlType = _this.controlType;

	        if (typeof data.Item === 'undefined') {
	          return;
	        }

	        var _data$Item = slicedToArray(data.Item, 1);

	        _this.result = _data$Item[0];
	        $$3(document).trigger('afd:pceRetrieveComplete', [_this.result]); // hide the manual input after search completed

	        _this.$manualInputButton.hide(); // hide reverse geolocation button


	        if (typeof _this.$button !== 'undefined') {
	          _this.$button.hide();
	        } // Clear the typeahead if option set


	        if (_this.options[controlType].afterClearTypeahead) {
	          _this.$typeAheadInput.val('');
	        } // Hide typeahead if option set


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
	        var $el = $$3(_this.$resultFields[index]);
	        var fieldName = $el.data('afd-result'); // this is for linking geoloaction with either lookup or typeahead

	        var controlType = _this.options[_this.controlType].linkedControl ? _this.options[_this.controlType].linkedControl : _this.controlType; // If a region mapping function is supplied, deal with region fields as dropdown

	        var regionFields = ['Region', 'State', 'AbbreviatedOptionalCounty', 'AbbreviatedPostalCounty', 'AdministrativeCounty', 'PostalCounty', 'TraditionalCounty'];

	        if (regionFields.indexOf(fieldName) > -1 && _this.options[controlType].regionMap) {
	          if (!$el.is('select')) {
	            throw '<' + $el.prop('tagName').toLowerCase() + '> is not a valid tag for `[data-afd-result="' + fieldName + '"]`, when regionMap is set.  This should be <select>';
	          }

	          var regionAttribute = _this.options[controlType].regionAttribute;
	          var afdResult = _this.result[fieldName];

	          var mappedResult = _this.options[controlType].regionMap(_this.result);

	          var optionValue = $el.find('[' + regionAttribute + '="' + mappedResult + '"]').val();
	          $el.val(optionValue);
	          return;
	        } // if pushup option is turned off, just fill out the form


	        if (!_this.options[controlType].pushUp) {
	          $el.val(_this.result[fieldName]); // if pushup is supplied as an array
	        } else if (Array.isArray(_this.options[controlType].pushUp)) {
	          _this.handlePushUp(_this.options[controlType].pushUp, fieldName, $el); // for anything else use default pushup options

	        } else {
	          _this.handlePushUp(['Property', 'Street', 'Locality'], fieldName, $el);
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


	        $el.triggerHandler('keyup');
	        $el.triggerHandler('change');
	        $$3(document).trigger('afd:populateResultsComplete');
	      });

	      defineProperty(assertThisInitialized(assertThisInitialized(_this)), "populateResultsList", function () {
	        var itemTag = _this.$resultList.prop('tagName') === 'SELECT' ? 'option' : 'li';

	        _this.$resultList.empty();

	        if (itemTag === 'option' && typeof _this.$resultList.attr('multiple') === 'undefined') {
	          _this.$resultList.append('<option value="' + null + '">' + _this.options.lookup.selectAddressText + '</option>');
	        }

	        if (_this.results.length === 0) {
	          _this.$resultList.append('<' + itemTag + ' value="null">' + _this.options.lookup.noResultsText + '</' + itemTag + '>');
	        }

	        for (var i = 0; i < _this.results.length; i++) {
	          var result = _this.results[i];

	          _this.$resultList.append('<' + itemTag + ' value="' + result.Key + '">' + result.List + '</' + itemTag + '>');
	        } // Special event handling required if $resultList is <ul>


	        if (itemTag === 'li') {
	          _this.$resultListResults = _this.$resultList.children('li');

	          _this.eventHandler(_this.$resultListResults, 'click', _this.onResultListItemClick);
	        }

	        _this.$resultList.show().closest('.afd-form-control').show();

	        _this.$resultList.focus();
	      });

	      defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onResultListItemClick", function (e) {
	        _this.selectResult(e);
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

	      defineProperty(assertThisInitialized(assertThisInitialized(_this)), "selectResult", function (e) {
	        if (_this.options[_this.controlType].afterRetrieveHideResultsList || _this.isReverseGeocode) {
	          _this.hideResultsElement();
	        }

	        _this.addressRetrieve(e.target.value).then(function (data) {
	          _this.handleAddressRetrieve(data);
	        }).fail(function (err) {
	          throw err;
	        });
	      });

	      defineProperty(assertThisInitialized(assertThisInitialized(_this)), "hideResultsElement", function () {
	        _this.$resultList.closest('.afd-form-control').hide();
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
	              $$3('[data-afd-result="Postcode"]').closest('.' + _this.options[controlType].parentClass).show();
	            } else {
	              $$3('[data-afd-result="Postcode"]').show();
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

	          _this.hideResultsElement();
	        }

	        _this.showResultFields();

	        if (_this.options[controlType].fieldSets.length > 0) {
	          for (var i = 0; i < _this.options[controlType].fieldSets.length; i++) {
	            var fieldSet = $$3(_this.options[controlType].fieldSets[i]).show();
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

	      defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onCustomCountryChange", function (e) {
	        var country = e.target.value;

	        if (_this.options.country.customCountryConverter) {
	          if (typeof _this.options.country.customCountryConverter !== 'function') {
	            throw 'customCountryConverter Must be a function';
	          }

	          country = _this.options.country.customCountryConverter(country);
	        }

	        _this.$element.trigger('afd:customCountryChanged', [country]);

	        _this.onCountryChanged(e);
	      });

	      defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onAfdCountryChanged", function (e) {
	        _this.countryChanged(e.target.value);
	      });

	      defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onCountryChanged", function (country) {
	        _this.$resultFields.val('');

	        _this.country = country;

	        _this.handleHideShowControls(country);

	        _this.$element.trigger('afd:countryChanged', [country]); // if there is a function with specific logic related to country changes


	        if (typeof _this.onCountryChangedLocal !== 'undefined') {
	          _this.onCountryChangedLocal(country);
	        }
	      });

	      defineProperty(assertThisInitialized(assertThisInitialized(_this)), "handleHideShowControls", function (country) {

	        var controlType = _this.controlType;

	        _this.$searchAgainButton.hide();

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

	        if (_this.isReverseGeocode) {
	          _this.checkVisibilityByCountry(country);
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

	          _this.$resultList.closest('.afd-form-control').hide();
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

	      defineProperty(assertThisInitialized(assertThisInitialized(_this)), "handlePushUp", function (fields, fieldName, $el) {
	        // get index of current field in array
	        var index = fields.indexOf(fieldName); // if this field is not involved in pushup manipulation

	        if (index === -1) {
	          $el.val(_this.result[fieldName]);
	          return;
	        } // create an array that contains the populated fields


	        var populatedFields = [];

	        for (var i = 0; i < fields.length; i++) {
	          if (_this.result[fields[i]].length > 0) {
	            populatedFields.push(_this.result[fields[i]]);
	          }
	        }

	        $el.val(populatedFields[index]);
	      });

	      _this.isReverseGeocode = false;
	      return _this;
	    } // logic for identifying each different lookup so that old ones can be discarded if they come in too late


	    return _temp;
	  }(Base), _temp;
	};

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

	var _getTag = getTag;

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}

	var _baseUnary = baseUnary;

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

	var $$4 = jQuery;

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
	      // disable lookup button if field is empty
	      _this.$lookupButton.attr('disabled', !e.target.value.length);

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
	            _this.results = typeof data.Item !== 'undefined' ? data.Item : [];
	            $$4(document).trigger('afd:pcePrefetchComplete', [data, jqXHR, jqXHR.lookup]);
	          }
	        });
	      }
	    });

	    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "hideResultsElement", function () {
	      _this.$resultList.closest('.afd-form-control').hide();
	    });

	    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "initFieldsLookup", function () {
	      if (_this.options.lookup.beforeHideResults) {
	        _this.hideResultFields();

	        if (_this.options.lookup.postcodeIsLookup) {
	          if (_this.options.lookup.parentClass) {
	            $$4('[data-afd-result="Postcode"]').closest('.' + _this.options.lookup.parentClass).show();
	          } else {
	            $$4('[data-afd-result="Postcode"]').show();
	          }
	        }
	      }
	    });

	    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "handleLookup", function () {
	      var val = _this.options.postcodeIsLookup ? $$4('[data-afd-result="Postcode"]').val() : $$4('[data-afd-control="lookupField"]').val();

	      if (_this.options.lookup.prefetch) {
	        if (_this.preFetchRequests.length === 0) {
	          _this.$lookupField.trigger('keyup');
	        }

	        Promise.all(_this.preFetchRequests).then(function () {
	          _this.populateResultsList();

	          $$4(document).trigger('afd:lookupComplete', [_this.results]);
	        });
	      } else {
	        var request = _this.address(val);

	        request.then(function (data
	        /*, status, jqXHR*/
	        ) {
	          _this.results = typeof data.Item !== 'undefined' ? data.Item : [];
	          $$4(document).trigger('afd:lookupComplete', [_this.results]);
	        });
	      }
	    });

	    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "selectResult", function (e) {
	      if (_this.options.lookup.afterRetrieveHideResultsList) {
	        _this.hideResultsElement();
	      } // if no results message clicked


	      if (e.target.value === 'null') {
	        _this.onAfdManualInputButtonClick();
	      }

	      _this.addressRetrieve(e.target.value).then(function (data) {
	        _this.handleAddressRetrieve(data);
	      }).fail(function (err) {
	        console.error(err);
	      });
	    });

	    _this.$lookupButton = $button;
	    _this.$lookupField = options.lookup.postcodeIsLookup ? $$4('[data-afd-result="Postcode"]') : $field;
	    _this.$resultList = $result; // specifying controltype is important for the options that the addressTools Mixin uses

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
	      this.hideResultsElement(this.$resultList, this.options);
	      var event = this.eventHandler;
	      event(this.$lookupButton, 'click', this.onClickButton);
	      event(this.$lookupField, 'keydown', this.onKeydownField);
	      event(this.$lookupField, 'keyup', this.onKeyupField);
	      event(this.$resultList, 'keydown', this.onKeyDownResult);
	      event(this.$resultList, 'keyup', this.onKeyUpResult);
	      event(this.$resultList, 'change', this.onChangeResult);
	      event(this.$searchAgainButton, 'click', this.onAfdSearchAgainButtonClick);
	      this.options.lookup.manualInputButton && event(this.$manualInputButton, 'click', this.onAfdManualInputButtonClick);
	      this.options.lookup.manualInputButton && event(this.$manualInputSearchButton, 'click', this.onAfdManualInputSearchButtonClick);
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

	function initLookup() {
	  var $ = jQuery;

	  var options = $.extend(true, {}, defaults, afdOptions); /////////Lookup Button
	  //Assign Button

	  var $button = $(this); // find out whether or not there is a container in which all elements should be present

	  var $containerScope = options.lookup.containers.length === 0 ? $(document) : $button.closest(afdOptions.lookup.containers.toString()); // Validate that there is only one button in container scope

	  if ($containerScope.find('[data-afd-control="lookupButton"]').length > 1) {
	    throw 'More than one instance of `lookupButton` detected.  If these are in separate containers please define the containers in `afdOptions.lookup.containers';
	  } // Validate that button is either <a> or <button>


	  if (!$button.is('a, button')) {
	    throw '<' + $button.prop('tagName').toLowerCase() + '> is not a valid tag for `lookupButton`, use either <a> or <button>';
	  } /////////Lookup Field
	  // Assign lookup field


	  var $field = $containerScope.find('[data-afd-control="lookupField"]'); // Validate that there is only one LookupField in container scope

	  var fieldCount = $containerScope.find('[data-afd-control="lookupField"]').length;

	  if (fieldCount === 0) {
	    throw 'Could not find an instance of `lookupField`.  If afdOptions.lookup.containers is set, have you included the lookup field inside the supplied container?';
	  } else if (fieldCount > 1) {
	    throw 'More than one instance of `lookupField` found';
	  } // Validate that lookup field is <input>


	  if (!$field.is('input')) {
	    throw '<' + $button.prop('tagName').toLowerCase() + '> is not a valid tag for `lookupField`, use <input>';
	  } /////////Result Field
	  // Assign result field


	  var $result = $containerScope.find('[data-afd-control="lookupResultsList"]'); // Validate that there is only one result in container scope

	  var resultCount = $containerScope.find('[data-afd-control="lookupResultsList"]').length;

	  if (resultCount === 0) {
	    throw 'Could not find an instance of `lookupResultsList`.  If afdOptions.lookup.containers is set, have you included the results list inside the supplied container?';
	  } else if (resultCount > 1) {
	    throw 'More than one instance of `lookupResultsList` found';
	  } // Validate that result list is <select>


	  if (!$result.is('select')) {
	    throw '<' + $button.prop('tagName').toLowerCase() + '> is not a valid tag for `lookupResultsList`, use <select>';
	  } /////////
	  // Initialise the control


	  var lookup = new AfdLookup($button, $field, $result, options);
	  $(document).off('afd:init.afd').on('afd:init.afd', function () {
	    lookup.init();
	  });
	  lookup.init();
	}

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

	// @@match logic
	_fixReWks('match', 1, function (defined, MATCH, $match) {
	  // 21.1.3.11 String.prototype.match(regexp)
	  return [function match(regexp) {
	    var O = defined(this);
	    var fn = regexp == undefined ? undefined : regexp[MATCH];
	    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	  }, $match];
	});

	var f$2 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$2
	};

	var gOPD = Object.getOwnPropertyDescriptor;

	var f$3 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = _toIobject(O);
	  P = _toPrimitive(P, true);
	  if (_ie8DomDefine) try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ }
	  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
	};

	var _objectGopd = {
		f: f$3
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

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

	var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

	var f$4 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return _objectKeysInternal(O, hiddenKeys);
	};

	var _objectGopn = {
		f: f$4
	};

	// 7.2.8 IsRegExp(argument)


	var MATCH = _wks('match');
	var _isRegexp = function (it) {
	  var isRegExp;
	  return _isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof(it) == 'RegExp');
	};

	var dP$1 = _objectDp.f;
	var gOPN = _objectGopn.f;


	var $RegExp = _global.RegExp;
	var Base = $RegExp;
	var proto$1 = $RegExp.prototype;
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
	      , tiRE ? this : proto$1, $RegExp);
	  };
	  var proxy = function (key) {
	    key in $RegExp || dP$1($RegExp, key, {
	      configurable: true,
	      get: function () { return Base[key]; },
	      set: function (it) { Base[key] = it; }
	    });
	  };
	  for (var keys = gOPN(Base), i$1 = 0; keys.length > i$1;) proxy(keys[i$1++]);
	  proto$1.constructor = $RegExp;
	  $RegExp.prototype = proto$1;
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

	    this._lastSeq = 0;

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
	      this._lastSeq = 0;
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

	              if (textStatus === 'abort') return; // If aborting ajax request is disabled, check to make sure that this request is not older than previous requests

	              if (!scope.options.abortAjax) {
	                if (jqXHR.seq < scope._lastSeq) {
	                  return;
	                } else {
	                  scope._lastSeq = jqXHR.seq;
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

	  $ = jQuery;

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

	var $$5 = jQuery;

	var AfdTypeahead =
	/*#__PURE__*/
	function (_addressToolsMixin) {
	  inherits(AfdTypeahead, _addressToolsMixin);

	  function AfdTypeahead($element, options) {
	    var _this;

	    classCallCheck(this, AfdTypeahead);

	    _this = possibleConstructorReturn(this, getPrototypeOf(AfdTypeahead).call(this, $element, options)); // specifying controltype is important for the options that the addressTools Mixin uses

	    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "init", function () {
	      try {
	        _this.initFields();

	        _this.$element.typeahead(_this.typeaheadOptions);
	      } catch (err) {
	        console.error('Error initisalising typeahead control');
	        console.error(err);
	      } // events


	      var event = _this.eventHandler;
	      event(_this.$element, 'input', _this.onInput);
	      event(_this.$element, 'afd:initFields', _this.onAfdInitFields);
	      event(_this.$searchAgainButton, 'click', _this.onAfdSearchAgainButtonClick);
	      _this.options.typeahead.manualInputButton && event(_this.$manualInputButton, 'click', _this.onAfdManualInputButtonClick);
	      _this.options.typeahead.manualInputButton && event(_this.$manualInputSearchButton, 'click', _this.onAfdManualInputSearchButtonClick);

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
	          onNavigateAfter: _this.onNavigateAfter,
	          onClickAfter: _this.onClickAfter
	        }
	      };
	    });

	    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onInput", function (e) {
	      var $container = _this.containers.length > 0 ? $$5(_this.containers) : $$5(document);
	      $container.find('.afd-typeahead-status').html('&nbsp;'); // this.$errorField.hide(); //todo erorfield

	      $$5(document).trigger('afd:typeaheadInput', [e.target.value]);
	    });

	    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onCountryChangedLocal", function (country) {
	      _this.typeaheadOptions.source.lookup.ajax.data.countryiso = country;

	      _this.$element.typeahead(_this.typeaheadOptions);
	    });

	    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onAfdInitFields", function () {
	      _this.$element.typeahead(_this.typeaheadOptions); // in case the elements were loaded after initialisation re declare variables


	      _this.setFields();

	      _this.initFields();
	    });

	    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onResult", function (node, query, result, resultHtmlList) {
	      var $container = _this.containers.length > 0 ? $$5(_this.containers) : $$5(document);
	      $container.find('.afd-typeahead-status').html(result.length + ' results found'); // if results are less than the max ask about manual input

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

	      var allVisible = !_this.multiForms ? $$5('[data-afd-result]:hidden').length === 0 : container.find('[data-afd-result]:hidden').length === 0;

	      if (!allVisible && _this.options.typeahead.manualInputButton) {
	        _this.$manualInputButton.show();
	      }
	    });

	    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onLayoutBuiltBefore", function (node, query, result, resultHtmlList) {
	      if (result.length === 0) {
	        return resultHtmlList;
	      }

	      var suffixPrefix = _this.containers.length > 0 ? '-' + _this.$element.closest(_this.containers.toString()).attr('id') : '';
	      resultHtmlList.attr('id', 'afd-results' + suffixPrefix).attr('role', 'listbox');

	      if (_this.options.typeahead.matchPositions && typeof result[0].matchPositions !== 'undefined') {
	        var openingTag = '<span class="afd-matched-highlight">';
	        var closingTag = '</span>';
	        var tagLengths = openingTag.length + closingTag.length;

	        for (var i = 0; i < result.length; i++) {
	          var item = result[i];
	          var resultItem = $$5(resultHtmlList.children().eq(i));
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
	      } // set role and id on results for aria


	      resultHtmlList.children().attr('role', 'option');
	      resultHtmlList.children().each(function (index) {
	        resultHtmlList.children().eq(index).attr('id', 'afd-result-' + index);
	      });
	      resultHtmlList.attr('aria-label', 'Results');
	      return resultHtmlList;
	    });

	    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onSearch", function (node, query) {
	      $$5('.' + _this.typeaheadOptions.selector.result).empty();
	    });

	    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onNavigateBefore", function (node, query, e) {
	      if (~[38, 40].indexOf(event.keyCode)) {
	        e.preventInputChange = true;
	      }
	    });

	    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onNavigateAfter", function (node, lis, a, item, query, event) {
	      // handle scrolling
	      var activeLi = lis.filter('li.active');
	      var $container = _this.containers.length > 0 ? $$5(_this.containers) : $$5(document);

	      if (~[38, 40].indexOf(event.keyCode)) {
	        var resultList = $container.find('.afd-typeahead-list'),
	            offsetTop = activeLi[0] && activeLi[0].offsetTop - resultList.height() / 2 || 0;
	        resultList.scrollTop(offsetTop);
	      } // aria actions


	      lis.removeAttr('aria-selected');
	      activeLi.attr('aria-selected', 'true');

	      _this.$element.attr('aria-activedescendant', activeLi.attr('id'));
	    });

	    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onClickAfter", function (node, a, item, event) {
	      var $container = _this.containers.length > 0 ? $$5(_this.containers) : $$5(document);
	      $container.find('.afd-typeahead-status').html('&nbsp;');

	      _this.handleMultiForms();

	      $$5('.afd-typeahead-field input').val('');

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
	    _this.$reverseGeocodeButton = $element.siblings('.afd-typeahead-reverse-geocode-button');

	    _this.setFields();

	    _this.refreshUniqeID();

	    _this.setupTypeaheadRequestOptions();

	    _this.typeaheadOptions = _this.prepareTypeaheadOptions();
	    return _this;
	  }

	  return AfdTypeahead;
	}(addressToolsMixin(AfdControl));

	function initTypeahead () {
	  var $ = jQuery; // set options

	  var options = $.extend(true, {}, defaults, afdOptions); // assign typeahead field

	  var $typeahead = $(this); // find out whether or not there is a container in which all elements should be present

	  var $containerScope = options.typeahead.containers.length === 0 ? $(document) : $typeahead.closest(afdOptions.typeahead.containers.toString()); // Validate that there is only one button in container scope

	  if ($containerScope.find('[data-afd-control="typeahead"]').length > 1) {
	    console.warn('More than one instance of `typeahead` detected.  If these are in separate containers please define the containers in `afdOptions.typeahead.containers`');
	  } // Validate that field is <input>


	  if (!$typeahead.is('input')) {
	    throw '<' + $typeahead.prop('tagName').toLowerCase() + '> is not a valid tag for `[data-afd-control="typeahead"]`, use <input>';
	  } // initialise the control


	  var typeahead = new AfdTypeahead($typeahead, options);
	  $(document).off('afd:init.afd').on('afd:init.afd', function () {
	    typeahead.init();
	  });
	  typeahead.init();
	}

	var $$6 = jQuery;
	/**
	 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
	 *
	 * jQuery.browser.mobile will be true if the browser is a mobile device
	 *
	 **/

	(function (a) {
	  (jQuery.browser = jQuery.browser || {}).mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4));
	})(navigator.userAgent || navigator.vendor || window.opera);

	var AfdReverseGeocode =
	/*#__PURE__*/
	function (_addressToolsMixin) {
	  inherits(AfdReverseGeocode, _addressToolsMixin);

	  function AfdReverseGeocode($button, $result, options) {
	    var _this;

	    classCallCheck(this, AfdReverseGeocode);

	    _this = possibleConstructorReturn(this, getPrototypeOf(AfdReverseGeocode).call(this, $button, options)); // specifying controlType is important for the options that the addressTools Mixin uses

	    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "init", function () {
	      // hide result element by default
	      _this.hideResultsElement(_this.$resultList, _this.options); // events


	      var event = _this.eventHandler;
	      event(_this.$button, 'click', _this.onButtonClick);
	      event($$6(document), 'afd:initFields', _this.onAfdInitFields);
	      event(_this.$resultList, 'keydown', _this.onKeyDownResult);
	      event(_this.$resultList, 'keyup', _this.onKeyUpResult);
	      event(_this.$resultList, 'change', _this.onChangeResult);

	      if (!$$6.browser.mobile && _this.options.reverseGeocode.hideOnDesktop) {
	        if (_this.options.buttonContainer) {
	          _this.$button.closest(_this.options.buttonContainer).hide();
	        } else {
	          _this.$button.hide();
	        }
	      }

	      _this.$resultList.hide();

	      try {
	        _this.initFields();
	      } catch (err) {
	        console.error('Error initisalising reverseGeocode controls');
	        console.error(err);
	      }
	    });

	    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "setupReverseGeocodeRequestOptions", function (lng, lat) {
	      _this.requestOptions = _this.setupParams({
	        data: 'address',
	        fields: _this.options.reverseGeocode.postcodeFirst ? 'list' : 'fflist',
	        task: 'nearest',
	        maxquantity: _this.options.reverseGeocode.maxItems,
	        longitude: lng,
	        latitude: lat
	      });
	    });

	    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onAfdInitFields", function () {
	      // in case the elements were loaded after initialisation redeclare variables
	      _this.setFields();

	      _this.handleMultiForms();
	    });

	    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onCountryChangedLocal", function (country) {
	      _this.checkVisibilityByCountry(country);
	    });

	    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "checkVisibilityByCountry", function (country) {
	      if (['GB', 'GBR', 'United Kingdom'].indexOf(country) > -1) {
	        _this.$button.show();
	      } else {
	        _this.$button.hide();
	      }
	    });

	    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onButtonClick", function (e) {
	      navigator.geolocation.getCurrentPosition(function (position) {
	        _this.setupReverseGeocodeRequestOptions(position.coords.longitude, position.coords.latitude);

	        $$6.ajax(_this.requestOptions).then(function (res) {
	          if (res.Result === '-2') {
	            _this.$button.hide();

	            _this.$errorField.text('We were unable to find your address from your device.  Search for it or enter it manually').show();

	            return;
	          }

	          _this.results = res.Item;

	          _this.populateResultsList();
	        });
	      }, function (error) {
	        _this.$button.hide();

	        _this.$errorField.text('We were unable to get your location from your device.  Search for your address or enter it manually').show();

	        console.error(error);
	      });
	    });

	    _this.controlType = _this.options.reverseGeocode.linkedControl ? _this.options.reverseGeocode.linkedControl : 'reverseGeocode';
	    _this.$button = $button;
	    _this.$resultList = $result; // set all the correct vars

	    _this.setFields();

	    _this.handleMultiForms();

	    _this.isReverseGeocode = true;
	    return _this;
	  }

	  return AfdReverseGeocode;
	}(addressToolsMixin(AfdControl));

	function initReverseGeocode () {
	  var $ = jQuery; // set options

	  var options = $.extend(true, {}, defaults, afdOptions); // assign button

	  var $button = $(this); // find out whether or not there is a container in which all elements should be present

	  var $containerScope = options.reverseGeocode.containers.length === 0 ? $(document) : $button.closest(afdOptions.reverseGeocode.containers.toString()); // Validate that there is only one button in container scope

	  if ($containerScope.find('[data-afd-control="reverseGeocodeButton"]').length > 1) {
	    throw 'More than one instance of `reverseGeocodeButton` detected.  If these are in separate containers please define the containers in `afdOptions.reverseGeocode.containers';
	  } // Validate that button is either <a> or <button>


	  if (!$button.is('a, button')) {
	    throw '<' + $button.prop('tagName').toLowerCase() + '> is not a valid tag for `reverseGeocodeButton`, use either <a> or <button>';
	  } // assign result


	  var $result = $containerScope.find('[data-afd-control="reverseGeocodeResultsList"]'); // Validate that there is only one result in container scope

	  var resultCount = $containerScope.find('[data-afd-control="reverseGeocodeResultsList"]').length;

	  if (resultCount === 0) {
	    throw 'Could not find an instance of `reverseGeocodeResultsList`.  If afdoptions.[controlType].containers is set have you included the results list inside the supplied container?';
	  } else if (resultCount > 1) {
	    throw 'More than one instance of `reverseGeocodeResultsList` found';
	  } // Validate that result is <select>


	  if (!$result.is('select, ul')) {
	    throw '<' + $result.prop('tagName').toLowerCase() + '> is not a valid tag for `reverseGeocodeResultsList`, use <select> or <ul>';
	  } // initialise the control


	  var reverseGeocode = new AfdReverseGeocode($button, $result, options);
	  $(document).off('afd:init.afd').on('afd:init.afd', function () {
	    reverseGeocode.init();
	  });
	  reverseGeocode.init();
	}

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


	        $element.removeClass('afd-valid').addClass('afd-invalid').closest('.iti').addClass('afd-invalid'); // Bootstrap 3 Validation

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

	        $element.addClass('afd-valid').removeClass('afd-invalid').closest('.iti').removeClass('afd-invalid'); // Bootstrap 3 Validation

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

	        $element.removeClass('afd-valid').removeClass('afd-invalid').closest('.iti').removeClass('afd-invalid'); // Bootstrap 4 Validation

	        $element.parent().removeClass('was-validated');
	      });

	      defineProperty(assertThisInitialized(assertThisInitialized(_this)), "showLoadingSpinner", function ($element, parentSelector) {
	        if (parentSelector) {
	          $element.closest(parentSelector).addClass('afd-loading');
	        }
	      });

	      defineProperty(assertThisInitialized(assertThisInitialized(_this)), "hideLoadingSpinner", function ($element, parentSelector) {
	        if (parentSelector) {
	          $element.closest(parentSelector).removeClass('afd-loading');
	        }
	      });

	      return _this;
	    }

	    return _temp;
	  }(Base), _temp;
	};

	var $$7 = jQuery;

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

	      _this.$element.data('account-is-syntax-valid', false);

	      _this.$element.data('account-is-afd-valid', false);

	      _this.$sortCodeElement.data('sort-code-is-regex-valid', false);

	      _this.$sortCodeElement.data('sort-code-is-syntax-valid', false);

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
	        $element.data('account-is-syntax-valid', true);

	        _this.handleValid();
	      } else {
	        $element.data('account-is-regex-valid', false);
	        $element.data('account-is-syntax-valid', false);

	        _this.clearValidation();
	      }

	      $$7(document).trigger('afd:accountValidationUpdated', [$element.get()[0], _this.$sortCodeElement.get()[0]]);
	    });

	    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onFocusOut", function () {
	      var $element = _this.$element;

	      var account = _this.$element.val();

	      if (!$element.data('account-is-syntax-valid')) {
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
	        $element.data('sort-code-is-syntax-valid', true);

	        _this.handleValid($element);
	      } else {
	        $element.data('sort-code-is-regex-valid', false);
	        $element.data('sort-code-is-syntax-valid', false);

	        _this.clearValidation($element);
	      }

	      $$7(document).trigger('afd:accountValidationUpdated', [_this.$element.get()[0], $element.get()[0]]);
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

	      $$7(document).trigger('afd:accountValidationUpdated', [_this.$element.get()[0], $element.get()[0]]);
	    });

	    _this.$sortCodeElement = $$7('[data-afd-control="sort"]');
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

	      var accountElement = $$7('[data-afd-control="account"]');
	      var account = accountElement.val();
	      var accountValid = accountElement.data('account-is-syntax-valid');
	      var sortCodeElement = $$7('[data-afd-control="sort"]');
	      var sortCode = sortCodeElement.val();
	      var sortCodeValid = sortCodeElement.data('sort-code-is-syntax-valid');

	      if (accountValid && sortCodeValid) {
	        $$7(document).trigger('afd:accountValidationStarted', [accountElement, sortCodeElement]);
	        this.showLoadingSpinner(accountElement, this.options.account.loadingSpinner);
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
	            _this2.handleInvalid(data.ErrorText, sortCodeElement);
	          } else {
	            _this2.handleInvalid(data.ErrorText);
	          }

	          $$7(document).trigger('afd:accountValidationSuccess', [data, accountElement, sortCodeElement]);

	          _this2.hideLoadingSpinner(accountElement, _this2.options.account.loadingSpinner);

	          $$7(document).trigger('afd:accountValidationUpdated', [accountElement.get()[0], sortCodeElement.get()[0]]);
	        }).catch(function (err) {
	          console.error(err);
	          $$7(document).trigger('afd:accountValidationError', [err]);

	          _this2.hideLoadingSpinner(accountElement, _this2.options.account.loadingSpinner);
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
	      return $$7.ajax(requestOptions);
	    }
	  }]);

	  return AfdAccount;
	}(afdValidationMixin(AfdControl));

	function initAccount () {
	  var $ = jQuery; // set options

	  var options = $.extend(true, {}, defaults, afdOptions); // assign account field

	  var $account = $(this); // Validate that field is <input>

	  if (!$account.is('input')) {
	    throw '<' + $account.prop('tagName').toLowerCase() + '> is not a valid tag for `[data-afd-control="account"]`, use <input>';
	  } // Assign sort


	  var $sort = $('[data-afd-control="sort"]'); // Validate that there is only one sort code field on page

	  var sortCount = $sort.length;

	  if (sortCount === 0) {
	    throw 'Could not find an instance of `[data-afd-control="sort"]`.  This is required for account number validation';
	  } else if (sortCount > 1) {
	    throw 'More than one instance of `[data-afd-control="sort"]` found';
	  } // Validate that sort code field is <input>


	  if (!$sort.is('input')) {
	    throw '<' + $sort.prop('tagName').toLowerCase() + '> is not a valid tag for `[data-afd-control="sort"]`, use <input>';
	  } // initialise the control


	  var account = new AfdAccount($account, options);
	  $(document).off('afd:init.afd').on('afd:init.afd', function () {
	    acount.init();
	  });
	  account.init();
	}

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

	var isArray$1 = Array.isArray || function (arg) {
	  return Object.prototype.toString.call(arg) === '[object Array]';
	};

	function parseDate(value) {
	  var month, len, year, yearValid;

	  if (/\//.test(value)) {
	    value = value.split(/\s*\/\s*/g);
	  } else if (/\s/.test(value)) {
	    value = value.split(/ +/g);
	  }

	  if (isArray$1(value)) {
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

	function max$1(array) {
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
	  if (value.length > max$1(maxLength)) { return verification$4(false, false); }

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

	var blankCard = "<svg width=\"750\" height=\"471\" viewBox=\"0 0 750 471\" xmlns=\"http://www.w3.org/2000/svg\"><g fill-rule=\"nonzero\" fill=\"none\"><rect fill=\"#000C9D\" width=\"750\" height=\"471\" rx=\"40\"/><rect fill=\"#9D9400\" x=\"48.71\" y=\"153.576\" width=\"110.324\" height=\"99.679\" rx=\"20.323\"/><g fill=\"#FFF\"><path d=\"M78.102 310.37v-3.795h-5.117v-11.27h-4.198l-.402 11.27H56.942l10.58-25.07-3.967-1.725-11.673 27.14v3.45h16.445v9.66h4.658v-9.66h5.117zM97.688 279.78c-4.025 0-7.878 1.38-11.213 4.6l2.588 2.933c2.645-2.473 5.002-3.68 8.395-3.68 4.197 0 7.532 2.357 7.532 6.727 0 4.773-3.737 6.958-7.532 6.958H95.1l-.575 3.795h3.335c4.658 0 8.223 1.84 8.223 7.532 0 4.945-3.278 8.108-8.855 8.108-3.22 0-6.555-1.323-8.798-3.968l-3.22 2.645c2.99 3.68 7.705 5.233 12.133 5.233 8.165 0 13.742-5.175 13.742-12.018 0-6.152-4.37-9.372-9.027-9.717 4.197-.805 7.762-4.428 7.762-9.2 0-5.405-4.715-9.948-12.132-9.948zM132.165 279.78c-5.347 0-8.912 1.898-12.075 5.693l3.335 2.53c2.53-2.933 4.658-4.198 8.568-4.198 4.427 0 7.072 2.76 7.072 7.188 0 6.497-3.22 10.81-18.17 25.127v3.91h23.518l.575-4.082h-18.63c13.052-11.903 17.71-17.825 17.71-25.07 0-6.325-4.428-11.098-11.903-11.098zM180.903 316.12h-8.28v-35.65h-4.198l-11.73 7.245 2.07 3.393 9.085-5.463v30.475h-9.775v3.91h22.828v-3.91zM250.49 310.37v-3.795h-5.117v-11.27h-4.198l-.402 11.27H229.33l10.58-25.07-3.967-1.725-11.673 27.14v3.45h16.445v9.66h4.658v-9.66h5.117zM270.075 279.78c-4.025 0-7.877 1.38-11.212 4.6l2.587 2.933c2.645-2.473 5.003-3.68 8.395-3.68 4.198 0 7.533 2.357 7.533 6.727 0 4.773-3.738 6.958-7.533 6.958h-2.357l-.575 3.795h3.335c4.657 0 8.222 1.84 8.222 7.532 0 4.945-3.277 8.108-8.855 8.108-3.22 0-6.555-1.323-8.797-3.968l-3.22 2.645c2.99 3.68 7.705 5.233 12.132 5.233 8.165 0 13.743-5.175 13.743-12.018 0-6.152-4.37-9.372-9.028-9.717 4.198-.805 7.763-4.428 7.763-9.2 0-5.405-4.715-9.948-12.133-9.948zM304.553 279.78c-5.348 0-8.913 1.898-12.075 5.693l3.335 2.53c2.53-2.933 4.657-4.198 8.567-4.198 4.428 0 7.073 2.76 7.073 7.188 0 6.497-3.22 10.81-18.17 25.127v3.91H316.8l.575-4.082h-18.63c13.053-11.903 17.71-17.825 17.71-25.07 0-6.325-4.427-11.098-11.902-11.098zM353.29 316.12h-8.28v-35.65h-4.197l-11.73 7.245 2.07 3.393 9.085-5.463v30.475h-9.775v3.91h22.827v-3.91zM422.878 310.37v-3.795h-5.118v-11.27h-4.197l-.403 11.27h-11.442l10.58-25.07-3.968-1.725-11.672 27.14v3.45h16.445v9.66h4.657v-9.66h5.118zM442.463 279.78c-4.025 0-7.878 1.38-11.213 4.6l2.588 2.933c2.645-2.473 5.002-3.68 8.395-3.68 4.197 0 7.532 2.357 7.532 6.727 0 4.773-3.737 6.958-7.532 6.958h-2.358l-.575 3.795h3.335c4.658 0 8.223 1.84 8.223 7.532 0 4.945-3.278 8.108-8.855 8.108-3.22 0-6.555-1.323-8.798-3.968l-3.22 2.645c2.99 3.68 7.705 5.233 12.133 5.233 8.165 0 13.742-5.175 13.742-12.018 0-6.152-4.37-9.372-9.027-9.717 4.197-.805 7.762-4.428 7.762-9.2 0-5.405-4.715-9.948-12.132-9.948zM476.94 279.78c-5.347 0-8.912 1.898-12.075 5.693l3.335 2.53c2.53-2.933 4.658-4.198 8.568-4.198 4.427 0 7.072 2.76 7.072 7.188 0 6.497-3.22 10.81-18.17 25.127v3.91h23.518l.575-4.082h-18.63c13.052-11.903 17.71-17.825 17.71-25.07 0-6.325-4.428-11.098-11.903-11.098zM525.678 316.12h-8.28v-35.65H513.2l-11.73 7.245 2.07 3.393 9.085-5.463v30.475h-9.775v3.91h22.828v-3.91zM595.266 310.37v-3.795h-5.118v-11.27h-4.197l-.403 11.27h-11.442l10.58-25.07-3.968-1.725-11.672 27.14v3.45h16.445v9.66h4.657v-9.66h5.118zM614.85 279.78c-4.024 0-7.877 1.38-11.212 4.6l2.588 2.933c2.645-2.473 5.002-3.68 8.395-3.68 4.197 0 7.532 2.357 7.532 6.727 0 4.773-3.737 6.958-7.532 6.958h-2.358l-.575 3.795h3.335c4.658 0 8.223 1.84 8.223 7.532 0 4.945-3.278 8.108-8.855 8.108-3.22 0-6.555-1.323-8.798-3.968l-3.22 2.645c2.99 3.68 7.705 5.233 12.133 5.233 8.165 0 13.742-5.175 13.742-12.018 0-6.152-4.37-9.372-9.027-9.717 4.197-.805 7.762-4.428 7.762-9.2 0-5.405-4.715-9.948-12.132-9.948zM649.328 279.78c-5.347 0-8.912 1.898-12.075 5.693l3.335 2.53c2.53-2.933 4.658-4.198 8.568-4.198 4.427 0 7.072 2.76 7.072 7.188 0 6.497-3.22 10.81-18.17 25.127v3.91h23.518l.575-4.082h-18.63c13.052-11.903 17.71-17.825 17.71-25.07 0-6.325-4.428-11.098-11.903-11.098zM698.066 316.12h-8.28v-35.65h-4.198l-11.73 7.245 2.07 3.393 9.085-5.463v30.475h-9.775v3.91h22.828v-3.91z\"/></g><g fill=\"#FFF\" fill-opacity=\".784\"><path d=\"M55.607 415.42h6.445v-22.245l-7.012 1.406v-3.594l6.973-1.406h3.945v25.84h6.446v3.32H55.607zM81.075 415.42h6.446v-22.245l-7.012 1.406v-3.594l6.973-1.406h3.945v25.84h6.445v3.32H81.075zM121.993 415.42h13.77v3.321h-18.516v-3.32a762.619 762.619 0 0 1 6.114-6.23c2.59-2.618 4.218-4.304 4.882-5.06 1.263-1.418 2.142-2.616 2.637-3.593.508-.99.762-1.96.762-2.91 0-1.55-.547-2.813-1.64-3.79-1.082-.976-2.494-1.464-4.24-1.464-1.236 0-2.545.215-3.925.645-1.367.43-2.832 1.08-4.394 1.953v-3.985c1.588-.638 3.073-1.12 4.453-1.445 1.38-.326 2.643-.488 3.789-.488 3.02 0 5.43.755 7.226 2.265 1.797 1.51 2.696 3.529 2.696 6.055a8.707 8.707 0 0 1-.684 3.418c-.443 1.068-1.256 2.33-2.441 3.789-.326.378-1.361 1.471-3.106 3.281a2473.283 2473.283 0 0 1-7.383 7.559zM156.017 403.019c1.888.403 3.36 1.243 4.414 2.52 1.068 1.275 1.601 2.85 1.601 4.726 0 2.877-.99 5.104-2.968 6.68-1.98 1.575-4.792 2.363-8.438 2.363-1.224 0-2.487-.124-3.789-.372a26.623 26.623 0 0 1-4.004-1.074v-3.808a13.669 13.669 0 0 0 3.594 1.445 16.77 16.77 0 0 0 4.082.488c2.474 0 4.355-.488 5.645-1.465 1.302-.976 1.953-2.395 1.953-4.257 0-1.72-.606-3.06-1.817-4.024-1.198-.976-2.87-1.465-5.02-1.465h-3.398v-3.242h3.555c1.94 0 3.424-.384 4.453-1.152 1.029-.781 1.543-1.901 1.543-3.36 0-1.497-.534-2.643-1.601-3.437-1.055-.807-2.572-1.211-4.551-1.211-1.081 0-2.24.117-3.477.352-1.237.234-2.597.599-4.082 1.093v-3.515a38.347 38.347 0 0 1 4.2-.938 23.777 23.777 0 0 1 3.71-.312c2.995 0 5.365.683 7.11 2.05 1.744 1.355 2.617 3.19 2.617 5.508 0 1.615-.462 2.982-1.387 4.102-.924 1.107-2.24 1.875-3.945 2.305zM182.306 389.581h15.488v3.32H185.92v7.149a10.371 10.371 0 0 1 1.719-.43 9.59 9.59 0 0 1 1.719-.156c3.255 0 5.833.892 7.734 2.676 1.901 1.783 2.852 4.199 2.852 7.246 0 3.138-.977 5.58-2.93 7.324-1.953 1.732-4.707 2.598-8.262 2.598-1.224 0-2.474-.105-3.75-.313a29.94 29.94 0 0 1-3.926-.937v-3.965a15.373 15.373 0 0 0 3.633 1.426c1.25.312 2.572.468 3.965.468 2.253 0 4.037-.592 5.352-1.777 1.315-1.185 1.972-2.793 1.972-4.824 0-2.032-.657-3.64-1.972-4.825-1.315-1.184-3.1-1.777-5.352-1.777-1.055 0-2.11.117-3.164.352a16.66 16.66 0 0 0-3.203 1.093v-14.648zM216.173 404.894c-1.875 0-3.353.5-4.434 1.503-1.067 1.003-1.601 2.383-1.601 4.141s.534 3.138 1.601 4.14c1.081 1.003 2.56 1.505 4.434 1.505 1.875 0 3.353-.502 4.434-1.504 1.08-1.016 1.62-2.396 1.62-4.14 0-1.759-.54-3.139-1.62-4.142-1.068-1.002-2.546-1.503-4.434-1.503zm-3.945-1.68c-1.693-.417-3.015-1.205-3.965-2.363-.938-1.16-1.406-2.572-1.406-4.239 0-2.33.827-4.173 2.48-5.527 1.667-1.354 3.945-2.031 6.836-2.031 2.904 0 5.182.677 6.836 2.03 1.654 1.355 2.48 3.198 2.48 5.528 0 1.667-.475 3.08-1.425 4.239-.938 1.158-2.246 1.946-3.926 2.363 1.901.443 3.379 1.308 4.434 2.597 1.067 1.29 1.601 2.865 1.601 4.727 0 2.826-.866 4.994-2.598 6.504-1.718 1.51-4.186 2.266-7.402 2.266s-5.69-.756-7.422-2.266c-1.719-1.51-2.578-3.678-2.578-6.504 0-1.862.534-3.437 1.602-4.727 1.067-1.289 2.552-2.154 4.453-2.597zm-1.446-6.23c0 1.51.47 2.688 1.407 3.535.95.846 2.278 1.27 3.984 1.27 1.693 0 3.014-.424 3.965-1.27.963-.847 1.445-2.025 1.445-3.536 0-1.51-.482-2.688-1.445-3.535-.95-.846-2.272-1.27-3.965-1.27-1.706 0-3.034.424-3.984 1.27-.938.847-1.407 2.025-1.407 3.535z\"/></g><g fill=\"#FFF\" fill-opacity=\".784\"><path d=\"M308.836 414.453h6.445v-22.246l-7.011 1.406v-3.593l6.972-1.407h3.946v25.84h6.445v3.32h-16.797zM345.574 402.05c1.888.404 3.36 1.244 4.415 2.52 1.067 1.276 1.601 2.852 1.601 4.727 0 2.877-.99 5.104-2.969 6.68-1.979 1.575-4.791 2.363-8.437 2.363-1.224 0-2.487-.124-3.79-.371a26.623 26.623 0 0 1-4.003-1.074v-3.81a13.669 13.669 0 0 0 3.594 1.446 16.77 16.77 0 0 0 4.082.489c2.474 0 4.355-.489 5.644-1.465 1.302-.977 1.953-2.396 1.953-4.258 0-1.719-.605-3.06-1.816-4.024-1.198-.976-2.871-1.464-5.02-1.464h-3.398v-3.243h3.555c1.94 0 3.424-.384 4.453-1.152 1.028-.781 1.543-1.901 1.543-3.36 0-1.497-.534-2.643-1.602-3.437-1.055-.807-2.571-1.21-4.55-1.21-1.081 0-2.24.116-3.477.35-1.237.235-2.598.6-4.082 1.095v-3.516a38.348 38.348 0 0 1 4.199-.938 23.777 23.777 0 0 1 3.71-.312c2.996 0 5.366.684 7.11 2.05 1.745 1.355 2.617 3.19 2.617 5.509 0 1.614-.462 2.981-1.386 4.101-.925 1.107-2.24 1.875-3.946 2.305zM362.489 414.453h13.77v3.32h-18.517v-3.32a762.755 762.755 0 0 1 6.114-6.23c2.59-2.618 4.218-4.304 4.883-5.059 1.263-1.42 2.141-2.617 2.636-3.594.508-.99.762-1.96.762-2.91 0-1.55-.547-2.812-1.64-3.789-1.081-.976-2.494-1.465-4.239-1.465-1.237 0-2.546.215-3.926.645-1.367.43-2.832 1.08-4.394 1.953v-3.984c1.588-.638 3.073-1.12 4.453-1.446 1.38-.325 2.643-.488 3.789-.488 3.02 0 5.43.755 7.226 2.266 1.797 1.51 2.696 3.528 2.696 6.054a8.707 8.707 0 0 1-.684 3.418c-.442 1.068-1.256 2.33-2.441 3.79-.326.377-1.36 1.47-3.106 3.28a2474.291 2474.291 0 0 1-7.382 7.56zM385.242 414.453h6.446v-22.246l-7.012 1.406v-3.593l6.973-1.407h3.945v25.84h6.445v3.32h-16.797zM434.715 402.05c1.888.404 3.36 1.244 4.414 2.52 1.068 1.276 1.602 2.852 1.602 4.727 0 2.877-.99 5.104-2.969 6.68-1.98 1.575-4.792 2.363-8.438 2.363-1.223 0-2.487-.124-3.789-.371a26.623 26.623 0 0 1-4.004-1.074v-3.81a13.669 13.669 0 0 0 3.594 1.446 16.77 16.77 0 0 0 4.082.489c2.474 0 4.356-.489 5.645-1.465 1.302-.977 1.953-2.396 1.953-4.258 0-1.719-.606-3.06-1.816-4.024-1.198-.976-2.872-1.464-5.02-1.464h-3.398v-3.243h3.554c1.94 0 3.425-.384 4.453-1.152 1.029-.781 1.543-1.901 1.543-3.36 0-1.497-.534-2.643-1.601-3.437-1.055-.807-2.572-1.21-4.551-1.21-1.08 0-2.24.116-3.477.35-1.237.235-2.597.6-4.082 1.095v-3.516a38.347 38.347 0 0 1 4.2-.938 23.777 23.777 0 0 1 3.71-.312c2.995 0 5.365.684 7.11 2.05 1.745 1.355 2.617 3.19 2.617 5.509 0 1.614-.462 2.981-1.387 4.101-.924 1.107-2.24 1.875-3.945 2.305zM459.07 392.05l-9.96 15.567h9.96v-15.566zm-1.035-3.437h4.961v19.004h4.16v3.281h-4.16v6.875h-3.925v-6.875h-13.165v-3.808l12.13-18.477zM473.739 388.613h15.488v3.32h-11.875v7.149a10.37 10.37 0 0 1 1.719-.43 9.59 9.59 0 0 1 1.718-.156c3.256 0 5.834.892 7.735 2.676 1.9 1.784 2.851 4.2 2.851 7.246 0 3.138-.976 5.58-2.93 7.324-1.953 1.732-4.706 2.598-8.261 2.598-1.224 0-2.474-.104-3.75-.313a29.94 29.94 0 0 1-3.926-.937v-3.965a15.373 15.373 0 0 0 3.633 1.426c1.25.312 2.571.469 3.965.469 2.252 0 4.036-.593 5.351-1.778 1.315-1.185 1.973-2.793 1.973-4.824 0-2.031-.658-3.64-1.973-4.824-1.315-1.185-3.099-1.778-5.351-1.778-1.055 0-2.11.118-3.164.352a16.66 16.66 0 0 0-3.203 1.094v-14.649zM499.207 388.613h15.489v3.32H502.82v7.149a10.37 10.37 0 0 1 1.718-.43 9.59 9.59 0 0 1 1.72-.156c3.254 0 5.832.892 7.733 2.676 1.901 1.784 2.852 4.2 2.852 7.246 0 3.138-.977 5.58-2.93 7.324-1.953 1.732-4.707 2.598-8.261 2.598-1.224 0-2.474-.104-3.75-.313a29.94 29.94 0 0 1-3.926-.937v-3.965a15.373 15.373 0 0 0 3.633 1.426c1.25.312 2.571.469 3.964.469 2.253 0 4.037-.593 5.352-1.778 1.315-1.185 1.973-2.793 1.973-4.824 0-2.031-.658-3.64-1.973-4.824-1.315-1.185-3.099-1.778-5.352-1.778-1.054 0-2.109.118-3.164.352a16.66 16.66 0 0 0-3.203 1.094v-14.649z\"/></g></g></svg>";

	var visa = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"750\" height=\"471\" viewBox=\"0 0 750 471\"><g fill-rule=\"nonzero\" fill=\"none\"><rect fill=\"#0E4595\" width=\"750\" height=\"471\" rx=\"40\"/><path fill=\"#FFF\" d=\"M278.197 334.228l33.361-195.763h53.36l-33.385 195.763zM524.308 142.688c-10.572-3.966-27.137-8.222-47.823-8.222-52.725 0-89.865 26.55-90.18 64.603-.298 28.13 26.513 43.822 46.753 53.186 20.77 9.594 27.752 15.714 27.654 24.283-.132 13.121-16.587 19.116-31.923 19.116-21.357 0-32.703-2.966-50.226-10.276l-6.876-3.111-7.49 43.824c12.464 5.464 35.51 10.198 59.438 10.443 56.09 0 92.501-26.246 92.916-66.882.2-22.268-14.016-39.216-44.8-53.188-18.65-9.055-30.072-15.099-29.951-24.268 0-8.137 9.667-16.839 30.556-16.839 17.45-.27 30.089 3.535 39.937 7.5l4.781 2.26 7.234-42.43M661.615 138.465h-41.231c-12.774 0-22.332 3.487-27.942 16.234l-79.245 179.404h56.032s9.161-24.123 11.233-29.418c6.124 0 60.554.084 68.337.084 1.596 6.853 6.491 29.334 6.491 29.334h49.513l-43.188-195.638zm-65.418 126.407c4.413-11.279 21.26-54.723 21.26-54.723-.316.522 4.38-11.334 7.075-18.684l3.606 16.879s10.217 46.728 12.352 56.528h-44.293z\"/><path d=\"M45.879 138.465l-.682 4.074c21.091 5.106 39.93 12.494 56.422 21.686l47.346 169.691 56.455-.066 84.004-195.385h-56.522l-52.24 133.496-5.566-27.129a88.005 88.005 0 0 0-.823-2.49l-18.166-87.35c-3.23-12.396-12.598-16.095-24.187-16.527H45.879z\" fill=\"#fff\"/></g></svg>";

	var mastercard = "<svg width=\"750\" height=\"471\" viewBox=\"0 0 750 471\" xmlns=\"http://www.w3.org/2000/svg\"><g fill-rule=\"nonzero\" fill=\"none\"><rect fill=\"#000\" width=\"750\" height=\"471\" rx=\"40\"/><path d=\"M221.13 421.67v-24.85c0-9.53-5.8-15.74-15.32-15.74-5 0-10.35 1.66-14.08 7-2.9-4.56-7-7-13.25-7a14.07 14.07 0 0 0-12 5.8v-5h-7.87v39.76h7.87v-22.75c0-7 4.14-10.35 9.94-10.35s9.11 3.73 9.11 10.35v22.78h7.87v-22.78c0-7 4.14-10.35 9.94-10.35s9.11 3.73 9.11 10.35v22.78h8.68zm129.22-39.35h-14.5v-12H328v12h-8.28v7H328V408c0 9.11 3.31 14.5 13.25 14.5a23.17 23.17 0 0 0 10.75-2.9l-2.49-7a13.63 13.63 0 0 1-7.46 2.07c-4.14 0-6.21-2.49-6.21-6.63V389h14.5v-6.63l.01-.05zm73.72-1.24a12.39 12.39 0 0 0-10.77 5.8v-5h-7.87v39.76h7.87v-22.33c0-6.63 3.31-10.77 8.7-10.77a24.24 24.24 0 0 1 5.38.83l2.49-7.46a28 28 0 0 0-5.8-.83zm-111.41 4.14c-4.14-2.9-9.94-4.14-16.15-4.14-9.94 0-16.15 4.56-16.15 12.43 0 6.63 4.56 10.35 13.25 11.6l4.14.41c4.56.83 7.46 2.49 7.46 4.56 0 2.9-3.31 5-9.53 5a21.84 21.84 0 0 1-13.25-4.14l-4.14 6.21c5.8 4.14 12.84 5 17 5 11.6 0 17.81-5.38 17.81-12.84 0-7-5-10.35-13.67-11.6l-4.14-.41c-3.73-.41-7-1.66-7-4.14 0-2.9 3.31-5 7.87-5 5 0 9.94 2.07 12.43 3.31l4.07-6.25zm120.11 16.57c0 12 7.87 20.71 20.71 20.71 5.8 0 9.94-1.24 14.08-4.56l-4.14-6.21a16.74 16.74 0 0 1-10.35 3.73c-7 0-12.43-5.38-12.43-13.25S446 389 453.07 389a16.74 16.74 0 0 1 10.35 3.73l4.14-6.21c-4.14-3.31-8.28-4.56-14.08-4.56-12.43-.83-20.71 7.87-20.71 19.88v-.05zm-55.5-20.71c-11.6 0-19.47 8.28-19.47 20.71 0 12.43 8.28 20.71 20.29 20.71a25.33 25.33 0 0 0 16.15-5.38l-4.14-5.8a19.79 19.79 0 0 1-11.6 4.14c-5.38 0-11.18-3.31-12-10.35h29.41v-3.31c0-12.43-7.46-20.71-18.64-20.71v-.01zm-.41 7.46c5.8 0 9.94 3.73 10.35 9.94h-21.53c1.24-5.8 5-9.94 11.18-9.94zm-107.27 13.25v-19.88h-7.87v5c-2.9-3.73-7-5.8-12.84-5.8-11.18 0-19.47 8.7-19.47 20.71 0 12.01 8.28 20.71 19.47 20.71 5.8 0 9.94-2.07 12.84-5.8v5h7.87v-19.94zm-31.89 0c0-7.46 4.56-13.25 12.43-13.25 7.46 0 12 5.8 12 13.25 0 7.87-5 13.25-12 13.25-7.87.41-12.43-5.8-12.43-13.25zm306.08-20.71a12.39 12.39 0 0 0-10.77 5.8v-5h-7.87v39.76H533v-22.33c0-6.63 3.31-10.77 8.7-10.77a24.24 24.24 0 0 1 5.38.83l2.49-7.46a28 28 0 0 0-5.8-.83h.01zm-30.65 20.71v-19.88h-7.87v5c-2.9-3.73-7-5.8-12.84-5.8-11.18 0-19.47 8.7-19.47 20.71 0 12.01 8.28 20.71 19.47 20.71 5.8 0 9.94-2.07 12.84-5.8v5h7.87v-19.94zm-31.89 0c0-7.46 4.56-13.25 12.43-13.25 7.46 0 12 5.8 12 13.25 0 7.87-5 13.25-12 13.25-7.87.41-12.43-5.8-12.43-13.25zm111.83 0v-35.62h-7.87v20.71c-2.9-3.73-7-5.8-12.84-5.8-11.18 0-19.47 8.7-19.47 20.71 0 12.01 8.28 20.71 19.47 20.71 5.8 0 9.94-2.07 12.84-5.8v5h7.87v-19.91zm-31.89 0c0-7.46 4.56-13.25 12.43-13.25 7.46 0 12 5.8 12 13.25 0 7.87-5 13.25-12 13.25-7.88.42-12.44-5.79-12.44-13.25h.01z\" fill=\"#FFF\"/><path fill=\"#FF5F00\" d=\"M303.55 80.39h143.72v234.42H303.55z\"/><path d=\"M318.05 197.6a149.5 149.5 0 0 1 56.74-117.21c-61.128-48.061-148.928-41.075-201.687 16.048-52.758 57.123-52.758 145.2 0 202.324 52.759 57.123 140.559 64.11 201.687 16.048a149.5 149.5 0 0 1-56.74-117.21z\" fill=\"#EB001B\"/><path d=\"M616.26 197.6c.041 57.047-32.503 109.106-83.804 134.056-51.302 24.95-112.347 18.408-157.196-16.846a149.43 149.43 0 0 0 0-234.42c44.85-35.254 105.894-41.797 157.196-16.846 51.3 24.95 83.845 77.01 83.804 134.056z\" fill=\"#F79E1B\"/></g></svg>";

	var amex = "<svg width=\"750\" height=\"471\" viewBox=\"0 0 750 471\" xmlns=\"http://www.w3.org/2000/svg\"><g fill-rule=\"nonzero\" fill=\"none\"><rect fill=\"#2557D6\" width=\"750\" height=\"471\" rx=\"40\"/><path d=\"M.003 221.185h36.024l8.123-19.51h18.185l8.101 19.51h70.88V206.27l6.327 14.98h36.796l6.327-15.202v15.138h176.151l-.082-32.026h3.408c2.386.083 3.083.302 3.083 4.226v27.8h91.106v-7.455c7.349 3.92 18.779 7.455 33.819 7.455h38.328l8.203-19.51h18.185l8.021 19.51h73.86v-18.532l11.186 18.532h59.187V98.678h-58.576v14.468l-8.202-14.468h-60.105v14.468l-7.532-14.468h-81.188c-13.59 0-25.536 1.889-35.186 7.153v-7.153h-56.026v7.153c-6.14-5.426-14.508-7.153-23.812-7.153H179.908l-13.734 31.641-14.104-31.641H87.6v14.468l-7.083-14.468H25.534L0 156.924v64.261h.003zm227.397-17.67h-21.615l-.08-68.794-30.573 68.793H156.62l-30.652-68.854v68.854H83.084l-8.101-19.592h-43.9L22.9 203.514H0l37.756-87.837h31.326l35.859 83.164v-83.164h34.412l27.593 59.587 25.347-59.587h35.104v87.837h.003zM67.777 165.692l-14.43-35.017-14.35 35.017h28.78zm245.642 37.821h-70.433v-87.837h70.433v18.291h-49.348v15.833h48.165v18.005H264.07v17.542h49.348v18.166zm99.256-64.18c0 14.004-9.386 21.24-14.856 23.412 4.613 1.748 8.553 4.838 10.43 7.397 2.976 4.369 3.49 8.271 3.49 16.116v17.255h-21.266l-.08-11.077c0-5.285.508-12.886-3.328-17.112-3.081-3.09-7.777-3.76-15.368-3.76h-22.633v31.95H327.98v-87.838h48.495c10.775 0 18.714.283 25.53 4.207 6.67 3.924 10.67 9.652 10.67 19.45zm-26.652 13.042c-2.898 1.752-6.324 1.81-10.43 1.81H349.98v-19.51h25.962c3.674 0 7.508.164 9.998 1.584 2.735 1.28 4.427 4.003 4.427 7.765 0 3.84-1.61 6.929-4.344 8.351zm60.466 51.138h-21.513v-87.837h21.513v87.837zm249.74 0H666.35l-39.964-65.927v65.927h-42.94l-8.204-19.592h-43.799l-7.96 19.592H498.81c-10.248 0-23.224-2.257-30.572-9.715-7.41-7.458-11.265-17.56-11.265-33.533 0-13.027 2.304-24.936 11.366-34.347 6.816-7.01 17.49-10.242 32.02-10.242h20.412v18.821h-19.984c-7.694 0-12.039 1.14-16.224 5.203-3.594 3.699-6.06 10.69-6.06 19.897 0 9.41 1.878 16.196 5.797 20.628 3.245 3.476 9.144 4.53 14.694 4.53h9.469l29.716-69.076h31.592l35.696 83.081V115.68h32.103l37.062 61.174V115.68h21.596v87.834zM568.07 165.693l-14.591-35.017-14.51 35.017h29.1zM749.956 343.767c-5.121 7.458-15.101 11.239-28.611 11.239h-40.718v-18.84h40.553c4.022 0 6.837-.527 8.532-2.175a7.71 7.71 0 0 0 2.493-5.73c0-2.56-1.024-4.592-2.575-5.81-1.53-1.341-3.757-1.95-7.429-1.95-19.797-.67-44.495.609-44.495-27.194 0-12.743 8.125-26.157 30.25-26.157h41.998l.002-17.48h-39.022c-11.776 0-20.33 2.808-26.388 7.174v-7.175H626.83c-9.23 0-20.063 2.279-25.187 7.175v-7.175H498.578v7.175c-8.203-5.892-22.043-7.175-28.431-7.175h-67.983v7.175c-6.49-6.258-20.92-7.175-29.716-7.175h-76.085l-17.41 18.763-16.307-18.763H148.99v122.592h111.516l17.94-19.06 16.9 19.06 68.739.061v-28.838h6.757c9.12.14 19.878-.226 29.368-4.31v33.085h56.697v-31.952h2.735c3.49 0 3.834.143 3.834 3.616v28.333H635.71c10.935 0 22.365-2.787 28.695-7.845v7.845h54.632c11.369 0 22.471-1.587 30.918-5.651v-22.838zm-341.503-47.154c0 24.406-18.286 29.445-36.716 29.445H345.43v29.469h-40.98l-25.962-29.085-26.981 29.085H167.99v-87.859h84.8l25.941 28.799 26.819-28.799h67.371c16.732 0 35.532 4.613 35.532 28.945zm-167.625 40.434h-51.839v-17.481h46.289V301.64h-46.289v-15.973h52.86l23.062 25.604-24.083 25.776zm83.526 10.06l-32.37-35.788 32.37-34.651v70.439zm47.873-39.066H344.98v-22.374h27.492c7.612 0 12.896 3.09 12.896 10.773 0 7.598-5.04 11.601-13.14 11.601zm142.744-40.373h70.369v18.17h-49.372v15.973h48.167v17.925h-48.167v17.481l49.372.08v18.23h-70.37v-87.859zm-27.054 47.03c4.693 1.724 8.53 4.816 10.329 7.375 2.977 4.29 3.408 8.293 3.493 16.037v17.417H480.57v-10.992c0-5.286.511-13.112-3.408-17.198-3.08-3.147-7.777-3.9-15.468-3.9h-22.533v32.09h-21.186v-87.859h48.678c10.674 0 18.448.47 25.369 4.146 6.654 4.004 10.839 9.488 10.839 19.51-.003 14.024-9.395 21.18-14.945 23.373zM476 303.59c-2.82 1.667-6.308 1.81-10.41 1.81h-25.614v-19.733h25.962c3.754 0 7.51.08 10.062 1.587 2.732 1.423 4.366 4.144 4.366 7.903 0 3.76-1.634 6.788-4.366 8.433zm190.336 5.597c4.106 4.23 6.306 9.572 6.306 18.614 0 18.9-11.858 27.723-33.122 27.723h-41.065v-18.84h40.9c4 0 6.836-.527 8.613-2.175 1.45-1.359 2.49-3.333 2.49-5.73 0-2.56-1.125-4.592-2.573-5.81-1.612-1.34-3.836-1.95-7.508-1.95-19.717-.67-44.41.61-44.41-27.193 0-12.744 8.04-26.158 30.144-26.158h42.269v18.7h-38.677c-3.834 0-6.327.143-8.447 1.587-2.31 1.422-3.166 3.534-3.166 6.32 0 3.315 1.96 5.57 4.613 6.545 2.224.77 4.613.996 8.205.996l11.35.305c11.446.278 19.303 2.249 24.078 7.066zM750 285.667h-38.427c-3.836 0-6.385.143-8.532 1.587-2.224 1.423-3.081 3.534-3.081 6.322 0 3.314 1.878 5.569 4.61 6.544 2.225.77 4.614.996 8.126.996l11.427.304c11.531.284 19.228 2.258 23.921 7.072.855.67 1.368 1.422 1.956 2.175v-25z\" fill=\"#FFF\"/></g></svg>";

	var diners = "<svg width=\"750\" height=\"471\" viewBox=\"0 0 750 471\" xmlns=\"http://www.w3.org/2000/svg\"><g fill-rule=\"nonzero\" fill=\"none\"><rect fill=\"#0079BE\" width=\"750\" height=\"471\" rx=\"40\"/><path d=\"M584.934 237.947c0-99.415-82.981-168.133-173.895-168.1h-78.242c-92.003-.033-167.73 68.705-167.73 168.1 0 90.93 75.727 165.64 167.73 165.204h78.242c90.914.436 173.895-74.293 173.895-165.204z\" fill=\"#FFF\"/><path d=\"M333.28 83.93c-84.07.027-152.194 68.308-152.214 152.58.02 84.258 68.144 152.533 152.214 152.56 84.09-.027 152.228-68.302 152.24-152.56-.012-84.272-68.15-152.553-152.24-152.58z\" fill=\"#0079BE\"/><path d=\"M237.066 236.098c.08-41.18 25.746-76.296 61.94-90.25v180.48c-36.194-13.947-61.861-49.044-61.94-90.23zm131 90.275V145.847c36.207 13.92 61.914 49.057 61.98 90.257-.066 41.212-25.773 76.322-61.98 90.269z\" fill=\"#FFF\"/></g></svg>";

	var discover = "<svg width=\"750\" height=\"471\" viewBox=\"0 0 750 471\" xmlns=\"http://www.w3.org/2000/svg\"><g fill-rule=\"nonzero\" fill=\"none\"><path d=\"M52.877 0C23.68 0 0 23.155 0 51.71v367.58C0 447.85 23.672 471 52.877 471h644.246C726.32 471 750 447.845 750 419.29V51.71C750 23.15 726.328 0 697.123 0H52.877z\" fill=\"#4D4D4D\"/><path d=\"M314.57 152.198c8.496 0 15.623 1.733 24.295 5.912v22.087c-8.215-7.633-15.341-10.828-24.765-10.828-18.523 0-33.09 14.576-33.09 33.055 0 19.488 14.116 33.196 34.008 33.196 8.955 0 15.95-3.029 23.847-10.54v22.098c-8.981 4.02-16.26 5.607-24.765 5.607-30.075 0-53.444-21.935-53.444-50.224 0-27.984 23.991-50.363 53.914-50.363zm-93.379.609c11.102 0 21.26 3.612 29.754 10.673l-10.335 12.86c-5.145-5.48-10.01-7.792-15.927-7.792-8.513 0-14.713 4.606-14.713 10.667 0 5.198 3.48 7.95 15.332 12.118 22.467 7.808 29.124 14.732 29.124 30.021 0 18.633-14.399 31.602-34.923 31.602-15.029 0-25.955-5.626-35.055-18.32l12.758-11.68c4.549 8.36 12.136 12.837 21.557 12.837 8.811 0 15.334-5.779 15.334-13.576 0-4.042-1.976-7.507-5.921-9.958-1.987-1.16-5.921-2.89-13.653-5.481-18.55-6.347-24.914-13.132-24.914-26.391 0-15.75 13.667-27.58 31.582-27.58zm225.695 1.678h21.575l27.004 64.645 27.35-64.645h21.412l-43.744 98.713h-10.628l-42.969-98.713zm-382.065.148h28.991c32.03 0 54.359 19.786 54.359 48.19 0 14.163-6.831 27.856-18.382 36.944-9.72 7.67-20.795 11.11-36.13 11.11H64.822v-96.244zm92.437 0h19.751v96.245h-19.75v-96.245zm395.899 0h56.011v16.308h-36.275v21.362h34.938v16.3h-34.938v25.98h36.275v16.295h-56.011v-96.245zm69.094 0h29.283c22.78 0 35.833 10.397 35.833 28.416 0 14.735-8.187 24.406-23.064 27.284l31.873 40.545h-24.288l-27.336-38.664h-2.575v38.664h-19.726v-96.245zm19.726 15.159v29.148h5.771c12.612 0 19.297-5.206 19.297-14.88 0-9.367-6.686-14.268-18.985-14.268h-6.083zm-557.42 1.149v63.642h5.3c12.763 0 20.823-2.324 27.028-7.648 6.83-5.782 10.94-15.015 10.94-24.25 0-9.222-4.11-18.18-10.94-23.961-6.523-5.61-14.265-7.783-27.028-7.783h-5.3z\" fill=\"#FFF\"/><path d=\"M399.164 151.56c29.75 0 53.867 22.167 53.867 49.552v.031c0 27.385-24.117 49.584-53.867 49.584-29.75 0-53.867-22.199-53.867-49.584v-.03c0-27.386 24.117-49.554 53.867-49.554zm350.819 119.534c-25.048 17.233-212.574 140.397-537.264 199.891h484.387c29.197 0 52.877-23.154 52.877-51.71V271.094z\" fill=\"#F47216\"/></g></svg>";

	var jcb = "<svg width=\"750\" height=\"471\" viewBox=\"0 0 750 471\" xmlns=\"http://www.w3.org/2000/svg\"><defs><linearGradient x1=\".032%\" y1=\"50%\" x2=\"99.974%\" y2=\"50%\" id=\"a\"><stop stop-color=\"#007B40\" offset=\"0%\"/><stop stop-color=\"#55B330\" offset=\"100%\"/></linearGradient><linearGradient x1=\".472%\" y1=\"50%\" x2=\"99.986%\" y2=\"50%\" id=\"b\"><stop stop-color=\"#1D2970\" offset=\"0%\"/><stop stop-color=\"#006DBA\" offset=\"100%\"/></linearGradient><linearGradient x1=\".114%\" y1=\"50.001%\" x2=\"99.986%\" y2=\"50.001%\" id=\"c\"><stop stop-color=\"#6E2B2F\" offset=\"0%\"/><stop stop-color=\"#E30138\" offset=\"100%\"/></linearGradient></defs><g fill-rule=\"nonzero\" fill=\"none\"><rect fill=\"#0E4C96\" width=\"750\" height=\"471\" rx=\"40\"/><path d=\"M617.243 346.766c0 41.615-33.728 75.36-75.36 75.36H132.757V124.245c0-41.626 33.733-75.37 75.365-75.37l409.121-.001v297.892z\" fill=\"#FFF\"/><path d=\"M483.859 242.045c11.684.253 23.437-.516 35.077.4 11.787 2.2 14.628 20.043 4.156 25.888-7.141 3.85-15.633 1.432-23.379 2.113H483.86v-28.401zm41.833-32.145c2.596 9.165-6.238 17.392-15.066 16.13h-26.767c.185-8.642-.368-18.021.272-26.208 10.724.301 21.549-.616 32.21.48 4.58 1.15 8.413 4.916 9.35 9.598zM590.12 73.997c.498 17.501.071 35.927.214 53.783-.035 72.596.072 145.194-.055 217.79-.469 27.207-24.582 50.844-51.6 51.387-27.046.111-54.095.016-81.142.047v-109.75c29.47-.154 58.959.307 88.417-.232 13.667-.86 28.632-9.876 29.27-24.915 1.61-15.102-12.632-25.55-26.153-27.201-5.198-.135-5.044-1.515 0-2.117 12.892-2.787 23.02-16.133 19.226-29.499-3.236-14.058-18.773-19.499-31.697-19.472-26.351-.18-52.709-.026-79.063-.077.172-20.489-.354-41 .286-61.474 2.087-26.716 26.806-48.747 53.447-48.27h78.85z\" fill=\"url(#a)\"/><path d=\"M159.74 125.04c.674-27.163 24.889-50.611 51.875-51.007 26.944-.083 53.891-.012 80.837-.036-.074 90.885.148 181.777-.112 272.658-1.038 26.834-24.99 49.834-51.679 50.307-26.996.099-53.995.014-80.992.042V283.551c26.223 6.194 53.722 8.832 80.473 4.721 15.993-2.575 33.488-10.424 38.902-27.014 3.986-14.192 1.742-29.126 2.334-43.692v-33.824h-46.297c-.208 22.37.426 44.78-.335 67.125-1.248 13.734-14.846 22.46-27.8 21.995-16.066.169-47.898-11.64-47.898-11.64-.08-41.917.466-94.408.692-136.182z\" fill=\"url(#b)\"/><path d=\"M309.72 197.39c-2.434.517-.49-8.3-1.114-11.646.166-21.15-.346-42.323.284-63.458 2.083-26.829 26.991-48.916 53.739-48.288h78.766c-.074 90.884.147 181.775-.112 272.656-1.039 26.834-24.992 49.833-51.68 50.308-26.998.1-53.998.015-80.997.043V272.708c18.44 15.128 43.5 17.484 66.472 17.525 17.317-.006 34.534-2.675 51.35-6.67V260.79c-18.953 9.447-41.233 15.446-62.243 10.018-14.656-3.65-25.294-17.811-25.056-32.936-1.699-15.728 7.524-32.335 22.981-37.011 19.19-6.008 40.108-1.413 58.096 6.398 3.855 2.018 7.765 4.521 6.222-1.921v-17.9c-30.084-7.157-62.101-9.792-92.329-2.004-8.748 2.468-17.27 6.21-24.379 11.956z\" fill=\"url(#c)\"/></g></svg>";

	var unionpay = "<svg width=\"750\" height=\"471\" viewBox=\"0 0 750 471\" xmlns=\"http://www.w3.org/2000/svg\"><g fill-rule=\"nonzero\" fill=\"none\"><rect fill=\"#FFF\" width=\"750\" height=\"471\" rx=\"40\"/><path d=\"M201.81 55h142.393c19.87 0 32.287 16.406 27.63 36.47L305.5 378.948c-4.656 20.064-24.629 36.47-44.498 36.47H118.61c-19.87 0-32.287-16.406-27.63-36.47L157.311 91.47C161.968 71.302 181.837 55 201.706 55h.104z\" fill=\"#D10429\"/><path d=\"M331.75 55h163.815c19.869 0 10.866 16.406 6.209 36.47L435.44 378.948c-4.657 20.064-3.208 36.47-23.077 36.47H248.549c-19.972 0-32.287-16.406-27.527-36.47L287.356 91.47C292.012 71.302 311.88 55 331.854 55h-.104z\" fill=\"#022E64\"/><path d=\"M489.815 55h142.394c19.869 0 32.287 16.406 27.63 36.47l-66.333 287.478c-4.657 20.064-24.63 36.47-44.498 36.47H406.614c-19.972 0-32.287-16.406-27.63-36.47L445.317 91.47C449.974 71.302 469.843 55 489.711 55h.104z\" fill=\"#076F74\"/><path d=\"M465.905 326.015h13.453l3.829-13.063h-13.35l-3.932 13.063zm10.762-35.948l-4.657 15.466s5.071-2.613 7.865-3.449c2.794-.627 6.933-1.15 6.933-1.15l3.208-10.763h-13.452l.103-.104zm6.727-22.154l-4.45 14.839s4.967-2.3 7.761-3.03c2.794-.732 6.933-.941 6.933-.941l3.208-10.764h-13.349l-.103-.104zm29.7 0l-17.386 57.997h4.657l-3.622 12.017h-4.657l-1.138 3.658H474.39l1.139-3.658H442l3.311-11.076h3.415l17.593-58.938L469.837 256h16.868l-1.76 5.956s4.45-3.239 8.797-4.389c4.243-1.149 28.665-1.567 28.665-1.567l-3.622 11.808h-5.795l.103.105z\" fill=\"#FEFEFE\"/><path d=\"M520 256h18.006l.207 6.792c-.103 1.15.828 1.672 3.001 1.672h3.622l-3.311 11.182h-9.728c-8.382.627-11.59-3.03-11.383-7.106l-.31-12.436L520 256zm2.216 53.2h-17.178l2.897-9.927h19.662l2.794-9.092H511.04L514.351 279h53.812l-3.311 11.181h-18.11l-2.794 9.092h18.11l-3.002 9.927h-19.558l-3.518 4.18h7.968l1.966 12.54c.207 1.254.207 2.09.62 2.613.415.418 2.795.627 4.14.627h2.38l-3.725 12.226h-6.106c-.93 0-2.38-.104-4.346-.104-1.863-.21-3.104-1.254-4.346-1.881-1.139-.523-2.794-1.881-3.208-4.285l-1.863-12.54-8.9 12.331c-2.794 3.867-6.622 6.897-13.142 6.897H495l3.311-10.868h4.76c1.346 0 2.588-.522 3.52-1.045.93-.418 1.758-.836 2.586-2.194l13.04-18.497zM334.314 282h45.429l-3.312 10.972h-18.11l-2.793 9.3h18.627l-3.415 11.287h-18.524l-4.553 15.152c-.517 1.672 4.45 1.881 6.209 1.881l9.314-1.254-3.726 12.54h-20.904c-1.655 0-2.897-.209-4.76-.627-1.76-.418-2.587-1.254-3.311-2.403-.725-1.254-1.967-2.195-1.139-4.912l6.002-20.064H325l3.415-11.495h10.348l2.794-9.3H331.21l3.312-10.973-.207-.104zm31.387-19.835h18.627l-3.415 11.39h-25.457l-2.794 2.404c-1.242 1.15-1.552.732-3.105 1.568-1.448.731-4.45 2.194-8.382 2.194H333l3.311-10.972h2.484c2.07 0 3.519-.21 4.243-.627.828-.523 1.76-1.672 2.69-3.553l4.657-8.569h18.524l-3.208 6.27v-.105zm35.108 18.81s5.07-4.702 13.763-6.165c1.966-.418 14.384-.21 14.384-.21l1.863-6.27h-26.181l-3.83 12.75v-.105zm24.629 4.807h-25.975l-1.552 5.33h22.56c2.69-.314 3.208.104 3.415-.105l1.655-5.225h-.103zm-33.736-29.678h15.833l-2.276 8.047s4.967-4.076 8.485-5.539c3.519-1.254 11.383-2.508 11.383-2.508l25.664-.104-8.796 29.469c-1.449 5.016-3.208 8.255-4.243 9.823-.93 1.463-2.07 2.821-4.346 4.075-2.173 1.15-4.14 1.881-6.002 1.986-1.656.104-4.346.209-7.865.209h-24.732l-6.934 23.303c-.62 2.299-.931 3.448-.517 4.075.31.523 1.242 1.15 2.38 1.15l10.866-1.045-3.726 12.749h-12.21c-3.933 0-6.727-.105-8.693-.21-1.863-.208-3.83 0-5.175-1.044-1.138-1.045-2.897-2.404-2.794-3.762.104-1.254.621-3.344 1.45-6.27l22.248-74.404z\" fill=\"#FEFEFE\"/><path d=\"M437.84 303l-1.449 7.106c-.62 2.194-1.138 3.866-2.794 5.33-1.759 1.462-3.725 3.03-8.485 3.03l-8.796.418-.104 7.942c-.103 2.194.518 1.985.828 2.403.414.418.724.523 1.138.732l2.794-.21 8.383-.417-3.519 11.704h-9.624c-6.726 0-11.797-.21-13.35-1.463-1.655-1.045-1.862-2.3-1.862-4.598l.62-31.141h15.42l-.207 6.374h3.725c1.242 0 2.174-.104 2.691-.418.517-.313.828-.836 1.035-1.567l1.552-5.016h12.108l-.104-.209zM218.47 147c-.517 2.508-10.451 48.592-10.451 48.592-2.174 9.3-3.726 15.989-8.9 20.273-3.001 2.508-6.52 3.657-10.555 3.657-6.52 0-10.245-3.239-10.866-9.404l-.104-2.09s1.966-12.436 1.966-12.54c0 0 10.349-42.009 12.212-47.548.103-.313.103-.522.103-.627-20.18.21-23.801 0-24.008-.313-.104.418-.621 3.03-.621 3.03L156.69 197.37l-.932 3.97L154 214.508c0 3.866.724 7.105 2.277 9.718 4.863 8.569 18.627 9.823 26.388 9.823 10.038 0 19.455-2.195 25.767-6.061 11.073-6.584 13.97-16.929 16.454-26.02l1.242-4.703s10.659-43.576 12.522-49.219c.103-.314.103-.523.207-.627-14.695.104-18.938 0-20.387-.314V147zm59.03 86.623c-7.141-.105-9.728-.105-18.11.313l-.311-.627c.724-3.24 1.552-6.374 2.173-9.614l1.035-4.389c1.552-6.792 3.001-14.839 3.208-17.242.207-1.463.62-5.12-3.519-5.12-1.759 0-3.518.835-5.38 1.671-1.036 3.658-3.002 13.899-4.037 18.497-2.07 9.823-2.173 10.972-3.104 15.78l-.621.626c-7.347-.104-9.934-.104-18.42.314L230 233.1c1.449-5.852 2.794-11.704 4.14-17.556 3.518-15.78 4.45-21.84 5.38-29.887l.725-.418c8.279-1.149 10.245-1.463 19.248-3.239l.724.836-1.345 5.016c1.552-.94 3.001-1.881 4.553-2.613 4.243-2.09 8.9-2.717 11.487-2.717 3.932 0 8.279 1.15 10.038 5.748 1.656 4.075.62 9.091-1.656 19.019l-1.138 5.016c-2.277 11.077-2.69 13.062-3.933 20.586l-.827.627.103.105zm29.058.027c-4.346 0-7.14-.104-9.83 0-2.691 0-5.278.21-9.314.314l-.207-.314-.207-.418c1.138-4.18 1.656-5.643 2.277-7.106.517-1.463 1.034-2.926 2.07-7.21 1.241-5.539 2.069-9.405 2.586-12.854.621-3.24.932-6.06 1.346-9.3l.31-.209.31-.314c4.347-.627 7.038-1.045 9.832-1.463 2.794-.418 5.691-.94 10.141-1.776l.207.418.103.418-2.483 10.345c-.828 3.449-1.656 6.897-2.38 10.346-1.553 7.315-2.277 10.032-2.587 12.017-.414 1.881-.518 2.822-1.139 6.584l-.414.313-.414.314-.207-.105zm45.941-25.675c-.31 1.881-1.966 8.883-4.139 11.809-1.552 2.194-3.312 3.553-5.381 3.553-.621 0-4.14 0-4.243-5.33 0-2.612.517-5.33 1.138-8.255 1.863-8.465 4.14-15.466 9.831-15.466 4.45 0 4.76 5.225 2.794 13.69zm18.73.836c2.484-11.077.518-16.302-1.862-19.437-3.725-4.807-10.348-6.374-17.178-6.374-4.14 0-13.867.418-21.525 7.524-5.484 5.12-8.071 12.122-9.52 18.81-1.553 6.792-3.312 19.019 7.865 23.617 3.414 1.463 8.382 1.88 11.59 1.88 8.175 0 16.557-2.298 22.87-8.986 4.863-5.434 7.036-13.585 7.864-17.034h-.103zm174.433 26.08c-8.693-.104-11.176-.104-19.145.314l-.517-.627c2.173-8.256 4.346-16.616 6.313-24.976 2.483-10.868 3.104-15.466 3.932-21.84l.62-.523c8.59-1.254 10.97-1.567 19.973-3.239l.207.731c-1.656 6.897-3.208 13.69-4.864 20.482-3.311 14.317-4.45 21.632-5.691 29.156l-.828.627v-.105z\" fill=\"#FEFEFE\"/><path d=\"M533.16 209.374c-.414 1.776-2.07 8.882-4.243 11.808-1.449 2.09-4.967 3.449-6.933 3.449-.621 0-4.036 0-4.243-5.225 0-2.613.517-5.33 1.138-8.256 1.863-8.255 4.14-15.257 9.831-15.257 4.45 0 6.416 5.12 4.45 13.585v-.104zm17.075.836c2.483-11.077-7.658-.94-9.21-4.598-2.484-5.748-.932-17.243-10.866-21.109-3.829-1.568-12.832.418-20.49 7.524-5.381 5.016-8.072 12.017-9.52 18.705-1.553 6.688-3.312 19.02 7.76 23.304 3.52 1.567 6.727 1.985 9.935 1.776 11.177-.627 19.662-17.66 25.975-24.348 4.863-5.33 5.691 1.985 6.416-1.254zm-129.943 23.413c-7.14-.105-9.624-.105-18.006.313l-.31-.627c.724-3.24 1.552-6.374 2.276-9.614l.931-4.389c1.553-6.792 3.105-14.839 3.208-17.242.207-1.463.621-5.12-3.415-5.12-1.759 0-3.621.835-5.38 1.671-.932 3.658-3.002 13.899-4.037 18.497-1.966 9.823-2.173 10.972-3.104 15.78l-.621.626c-7.347-.104-9.934-.104-18.42.314L373 233.1c1.449-5.852 2.794-11.704 4.14-17.556 3.518-15.78 4.346-21.84 5.38-29.887l.621-.418c8.28-1.149 10.349-1.463 19.248-3.239l.725.836-1.242 5.016c1.449-.94 3.001-1.881 4.45-2.613 4.243-2.09 8.9-2.717 11.486-2.717 3.933 0 8.176 1.15 10.038 5.748 1.656 4.075.518 9.091-1.759 19.019l-1.138 5.016c-2.38 11.077-2.69 13.062-3.933 20.586l-.827.627.103.105zm62.001-86.519l-6.002.105c-15.523.209-21.732.104-24.215-.209-.207 1.15-.621 3.135-.621 3.135s-5.588 25.916-5.588 26.02c0 0-13.246 55.176-13.867 57.788 13.556-.209 19.041-.209 21.421.105.518-2.613 3.622-17.974 3.726-17.974 0 0 2.69-11.286 2.794-11.704 0 0 .827-1.15 1.655-1.672h1.242c11.694 0 24.836 0 35.185-7.628 7.037-5.225 11.797-13.063 13.97-22.468.517-2.299.931-5.016.931-7.837 0-3.658-.724-7.21-2.794-10.032-5.277-7.42-15.73-7.524-27.837-7.629zm7.761 27.066c-1.241 5.747-4.967 10.659-9.727 12.958-3.932 1.985-8.693 2.194-13.66 2.194h-3.208l.207-1.254s5.899-25.916 5.899-25.811l.207-1.359.103-1.045 2.38.21s12.211 1.044 12.418 1.044c4.76 1.881 6.83 6.688 5.381 13.063zm127.207 8.666l-.724-.836c-8.796 1.776-10.452 2.09-18.524 3.24l-.62.626c0 .105-.104.21-.104.418v-.104c-6.002 14.107-5.899 11.077-10.762 22.154 0-.523 0-.836-.104-1.359l-1.242-24.035-.724-.836c-9.314 1.777-9.52 2.09-18.006 3.24l-.621.627c-.104.313-.104.627-.104.94l.104.105c1.035 5.538.828 4.284 1.863 12.958.517 4.284 1.138 8.569 1.655 12.749.828 7.106 1.346 10.554 2.38 21.318-5.795 9.614-7.14 13.271-12.728 21.735l.31.836c8.383-.313 10.245-.313 16.454-.313l1.346-1.568c4.656-10.136 40.255-71.79 40.255-71.79l-.104-.105zm-302.717 6.922c4.76-3.344 5.38-7.942 1.345-10.345-4.036-2.404-11.176-1.672-15.937 1.672-4.76 3.24-5.277 7.837-1.241 10.345 3.932 2.3 11.072 1.672 15.833-1.672z\" fill=\"#FEFEFE\"/><path d=\"M575.735 256.104l-6.934 12.018c-2.173 4.075-6.312 7.21-12.728 7.21L545 275.123l3.208-10.868h2.173c1.138 0 1.966-.104 2.587-.418.621-.209.932-.627 1.449-1.254l4.14-6.583h17.281l-.103.104z\" fill=\"#FEFEFE\"/></g></svg>";

	var maestro = "<svg width=\"750\" height=\"471\" viewBox=\"0 0 750 471\" xmlns=\"http://www.w3.org/2000/svg\"><g fill-rule=\"nonzero\" fill=\"none\"><rect fill=\"#000\" width=\"750\" height=\"471\" rx=\"40\"/><path d=\"M279.8 421.77V397c0-9.35-6-15.64-15.55-15.72-5-.08-10.26 1.49-13.9 7-2.73-4.38-7-7-13.07-7a13.08 13.08 0 0 0-11.58 5.87v-4.88h-8.61v39.55h8.69v-21.97c0-6.87 3.81-10.51 9.68-10.51 5.71 0 8.61 3.72 8.61 10.42v22h8.69v-21.91c0-6.87 4-10.51 9.68-10.51 5.87 0 8.69 3.72 8.69 10.42v22l8.67.01zM328.28 402v-19.77h-8.61V387c-2.73-3.56-6.87-5.79-12.49-5.79-11.09 0-19.77 8.69-19.77 20.77s8.69 20.77 19.77 20.77c5.63 0 9.76-2.23 12.49-5.79v4.8h8.61V402zm-32 0c0-6.95 4.55-12.66 12-12.66 7.12 0 11.91 5.46 11.91 12.66s-4.8 12.66-11.91 12.66c-7.47 0-12.02-5.71-12.02-12.66h.02zm216.12-20.81a22.29 22.29 0 0 1 8.49 1.59 20.71 20.71 0 0 1 6.75 4.38 20 20 0 0 1 4.46 6.59 22 22 0 0 1 0 16.52 20 20 0 0 1-4.46 6.59 20.69 20.69 0 0 1-6.75 4.38 23.43 23.43 0 0 1-17 0 20.47 20.47 0 0 1-6.73-4.38 20.21 20.21 0 0 1-4.44-6.59 22 22 0 0 1 0-16.52 20.23 20.23 0 0 1 4.44-6.59 20.48 20.48 0 0 1 6.73-4.38 22.29 22.29 0 0 1 8.51-1.59zm0 8.14a12.84 12.84 0 0 0-4.91.93 11.62 11.62 0 0 0-3.92 2.6 12.13 12.13 0 0 0-2.6 4 14.39 14.39 0 0 0 0 10.28 12.11 12.11 0 0 0 2.6 4 11.62 11.62 0 0 0 3.92 2.6 13.46 13.46 0 0 0 9.83 0 11.86 11.86 0 0 0 3.94-2.6 12 12 0 0 0 2.62-4 14.39 14.39 0 0 0 0-10.28 12 12 0 0 0-2.62-4 11.86 11.86 0 0 0-3.94-2.6 12.84 12.84 0 0 0-4.92-.94v.01zM375.1 402c-.08-12.33-7.69-20.77-18.78-20.77-11.58 0-19.69 8.44-19.69 20.77 0 12.58 8.44 20.77 20.27 20.77 6 0 11.42-1.49 16.22-5.54l-4.22-6.37a18.84 18.84 0 0 1-11.5 4.14c-5.54 0-10.59-2.56-11.83-9.68h29.37c.06-1.09.16-2.16.16-3.32zm-29.45-3.47c.91-5.71 4.38-9.6 10.51-9.6 5.54 0 9.1 3.47 10 9.6h-20.51zm65.69-6.2a25.49 25.49 0 0 0-12.34-3.4c-4.72 0-7.53 1.74-7.53 4.63 0 2.65 3 3.39 6.7 3.89l4.05.58c8.61 1.24 13.82 4.88 13.82 11.83 0 7.53-6.62 12.91-18 12.91-6.45 0-12.41-1.66-17.13-5.13l4.05-6.7a21.07 21.07 0 0 0 13.16 4.14c5.87 0 9-1.74 9-4.8 0-2.23-2.23-3.47-6.95-4.14l-4.05-.58c-8.85-1.24-13.65-5.21-13.65-11.67 0-7.86 6.45-12.66 16.46-12.66 6.29 0 12 1.41 16.13 4.14l-3.72 6.96zm41.35-2.23h-14.07V408c0 4 1.41 6.62 5.71 6.62a15.89 15.89 0 0 0 7.61-2.23l2.48 7.36a20.22 20.22 0 0 1-10.76 3.06c-10.18 0-13.73-5.46-13.73-14.65v-18h-8v-7.86h8v-12h8.69v12h14.06l.01 7.8zm29.78-8.85a18.38 18.38 0 0 1 6.12 1.08l-2.65 8.11a14 14 0 0 0-5.38-1c-5.63 0-8.44 3.64-8.44 10.18v22.17h-8.6v-39.56H472V387a11.66 11.66 0 0 1 10.42-5.79l.05.04z\" fill=\"#FFF\"/><path fill=\"#7673C0\" d=\"M309.95 80.39h130.5V314.9h-130.5z\"/><path d=\"M318.24 197.64a148.88 148.88 0 0 1 57-117.26c-61.147-48.062-148.962-41.066-201.728 16.071-52.766 57.137-52.766 145.23 0 202.368 52.766 57.137 140.581 64.133 201.728 16.071a148.88 148.88 0 0 1-57-117.25z\" fill=\"#EB001B\"/><path d=\"M616.5 197.64c.001 57.099-32.598 109.186-83.954 134.143-51.356 24.956-112.454 18.4-157.346-16.883a149.16 149.16 0 0 0 0-234.51c44.89-35.283 105.986-41.839 157.341-16.885 51.355 24.954 83.956 77.038 83.959 134.135z\" fill=\"#00A1DF\"/></g></svg>";

	var elo = "<svg width=\"750\" height=\"471\" viewBox=\"0 0 750 471\" xmlns=\"http://www.w3.org/2000/svg\"><g fill-rule=\"nonzero\" fill=\"none\"><path d=\"M40 0h670c22.1 0 40 17.9 40 40v391c0 22.1-17.9 40-40 40H40c-22.1 0-40-17.9-40-40V40C0 17.9 17.9 0 40 0z\" fill=\"#000\"/><path d=\"M150.7 170.6c6.8-2.3 14.1-3.5 21.7-3.5 33.2 0 60.9 23.6 67.2 54.9l47-9.6c-10.8-53.2-57.8-93.3-114.2-93.3-12.9 0-25.3 2.1-36.9 6l15.2 45.5z\" fill=\"#FFF100\"/><path d=\"M95.2 323l31.8-36c-14.2-12.6-23.1-30.9-23.1-51.4 0-20.4 8.9-38.8 23.1-51.3l-31.8-35.9c-24.1 21.4-39.3 52.5-39.3 87.3 0 34.7 15.2 65.9 39.3 87.3z\" fill=\"#00A3DF\"/><path d=\"M239.6 249.4c-6.4 31.3-34 54.8-67.2 54.8-7.6 0-14.9-1.2-21.8-3.5l-15.2 45.5c11.6 3.9 24.1 6 37 6 56.4 0 103.4-40 114.2-93.2l-47-9.6z\" fill=\"#EE4023\"/><g fill=\"#FFF\"><path d=\"M443.2 281.6c-7.8 7.6-18.3 12.2-29.9 12-8-.1-15.4-2.5-21.6-6.5l-15.6 24.8c10.7 6.7 23.2 10.7 36.8 10.9 19.7.3 37.7-7.5 50.8-20.2l-20.5-21zM415 180.5c-39.2-.6-71.6 30.8-72.2 70-.2 14.7 4 28.5 11.5 39.9l128.8-55.1c-7.2-30.9-34.8-54.2-68.1-54.8zm-42.7 75.6c-.2-1.6-.3-3.3-.3-5 .4-23.1 19.4-41.6 42.5-41.2 12.6.2 23.8 5.9 31.3 14.9l-73.5 31.3zm151.3-107.6v137.3l23.8 9.9-11.3 27.1-23.6-9.8c-5.3-2.3-8.9-5.8-11.6-9.8-2.6-4-4.6-9.6-4.6-17V148.5h27.3zM609.5 212c4.2-1.4 8.6-2.1 13.3-2.1 20.3 0 37.1 14.4 41 33.5l28.7-5.9c-6.6-32.5-35.3-56.9-69.7-56.9-7.9 0-15.5 1.3-22.5 3.6l9.2 27.8zm-33.9 92.9L595 283c-8.7-7.7-14.1-18.9-14.1-31.4s5.5-23.7 14.1-31.3l-19.4-21.9c-14.7 13-24 32.1-24 53.3 0 21.2 9.3 40.2 24 53.2zm88.2-44.8c-3.9 19.1-20.8 33.5-41 33.5-4.6 0-9.1-.8-13.3-2.2l-9.3 27.8c7.1 2.4 14.7 3.7 22.6 3.7 34.4 0 63.1-24.4 69.7-56.9l-28.7-5.9z\"/></g></g></svg>";

	var hipercard = "<svg width=\"750\" height=\"471\" viewBox=\"0 0 750 471\" xmlns=\"http://www.w3.org/2000/svg\"><g fill-rule=\"nonzero\" fill=\"none\"><path d=\"M697.115 0H52.885C23.724 0 0 23.196 0 51.707v367.586C0 447.804 23.724 471 52.885 471h644.23C726.274 471 750 447.804 750 419.293V51.707C750 23.196 726.274 0 697.115 0z\" fill=\"#FFF\"/><path d=\"M321.004 378.44L47 378.54v-.66c0-.363.437-2.714.97-5.226.535-2.511 1.365-6.507 1.847-8.877.48-2.372 1.303-6.4 1.826-8.955a3823.979 3823.979 0 0 0 3.815-18.735c.494-2.463 1.317-6.493 1.831-8.955a2558.2 2558.2 0 0 0 1.948-9.45c.557-2.736 1.403-6.915 1.881-9.287a794.28 794.28 0 0 1 1.688-8.123 271.84 271.84 0 0 0 1.275-6.302c.251-1.368 1.065-5.397 1.808-8.954a730.47 730.47 0 0 0 1.822-8.953c.26-1.369 1.082-5.398 1.83-8.955.747-3.555 1.568-7.585 1.824-8.953.256-1.368 1.081-5.398 1.833-8.954.754-3.557 1.566-7.511 1.805-8.788.241-1.277.9-4.56 1.464-7.295.563-2.736 1.63-7.885 2.37-11.441.741-3.558 2.007-9.75 2.813-13.764.809-4.012 1.773-8.787 2.145-10.61a4107.793 4107.793 0 0 1 3.31-16.084c.549-2.646 1.441-6.973 1.983-9.618a3528.87 3528.87 0 0 0 1.858-9.12c.48-2.37 1.297-6.325 1.817-8.787.52-2.463 1.416-6.79 1.99-9.618a306.964 306.964 0 0 1 2.135-9.617c.6-2.462 1.45-5.447 1.887-6.632.437-1.186 1.645-3.755 2.684-5.711l1.888-3.555 1.717-2.249c.943-1.235 2.629-3.19 3.745-4.34 1.116-1.152 2.997-2.885 4.184-3.85 1.185-.967 2.902-2.272 3.813-2.899.912-.627 2.703-1.726 3.98-2.441 1.276-.716 3.069-1.652 3.98-2.081.912-.43 2.778-1.215 4.145-1.743 1.368-.528 3.98-1.415 5.803-1.968 1.824-.555 5.248-1.39 7.609-1.857 2.361-.466 6.09-1.09 8.29-1.385l3.999-.538 274.17-.103L702.95 93v.66c0 .362-.44 2.714-.976 5.225-.539 2.511-1.437 6.805-1.997 9.54-.561 2.736-1.378 6.692-1.818 8.789-.439 2.098-1.27 6.127-1.848 8.953-.577 2.828-1.465 7.156-1.973 9.618-.508 2.462-1.331 6.492-1.829 8.953-.497 2.463-1.325 6.492-1.838 8.955-.516 2.462-1.312 6.343-1.772 8.622-.461 2.28-1.294 6.383-1.852 9.12a1955.06 1955.06 0 0 1-1.992 9.616c-.538 2.554-1.356 6.509-1.819 8.789l-1.853 9.119c-.556 2.736-1.45 7.064-1.988 9.618-.537 2.553-1.338 6.433-1.78 8.622a8069.947 8069.947 0 0 1-3.704 18.24c-.45 2.187-1.25 6.068-1.78 8.62-.531 2.554-1.439 6.957-2.015 9.784-.58 2.827-1.407 6.855-1.84 8.954-.434 2.096-1.244 6.052-1.802 8.787-.557 2.737-1.445 7.064-1.973 9.618-.527 2.553-1.353 6.583-1.837 8.954-.482 2.37-1.322 6.475-1.864 9.12-.545 2.643-1.432 6.971-1.973 9.615-.542 2.646-1.352 6.6-1.803 8.79a4228.93 4228.93 0 0 0-1.828 8.953 911.017 911.017 0 0 1-2.01 9.581l-.998 4.606-1.19 3.187c-.653 1.752-1.637 4.082-2.186 5.177-.547 1.093-1.663 3.025-2.479 4.29-.817 1.266-1.955 2.887-2.528 3.603-.574.716-2.302 2.566-3.842 4.111l-2.795 2.807-2.692 1.912c-1.48 1.052-3.075 2.122-3.543 2.377-.468.256-2.252 1.167-3.963 2.023-1.711.858-4.13 1.948-5.372 2.423-1.243.477-3.705 1.287-5.472 1.8-1.766.516-3.66 1.023-4.206 1.127-.548.105-2.446.498-4.221.874-1.774.376-5.355.937-7.958 1.247l-4.734.564-274.003.097zm-97.486-70.874h7.13l.2-.525c.113-.289.203-.967.203-1.507 0-.541.235-2.505.523-4.366.286-1.863.96-6.146 1.497-9.52.537-3.375 1.34-8.449 1.785-11.275.446-2.828.99-6.447 1.21-8.043.22-1.596.486-2.9.594-2.9.107 0 .568.704 1.024 1.566l.828 1.567 1.838 1.853 1.84 1.851 2.262.907 2.263.905 2.697.35 2.698.35 3.422-.21 3.423-.21 3.707-.96 3.707-.96 1.99-.906c1.094-.5 3.034-1.59 4.31-2.421l2.322-1.512 2.164-2.164c1.19-1.188 2.87-3.097 3.73-4.24.863-1.141 1.568-2.159 1.568-2.26 0-.102.424-.809.94-1.572.518-.762 1.576-2.88 2.352-4.703.778-1.824 1.99-5.107 2.698-7.295l1.285-3.98.665-3.447c.365-1.895.836-5.029 1.045-6.964l.38-3.517-.22-2.984-.22-2.985-.692-2.985-.69-2.985-1.122-2.233-1.12-2.235-2.164-2.294-2.163-2.294-2.56-1.323-2.56-1.322-2.819-.677-2.819-.674-2.819-.206-2.818-.207-3.14.36-3.14.361-2.563.655-2.562.653-2.227 1.032c-1.224.565-3.007 1.528-3.96 2.138-.953.61-1.937 1.311-2.185 1.56-.248.247-.844.707-1.322 1.018l-.871.571.608-2.913c.336-1.602.615-3.099.623-3.328l.013-.414h-12.16l-1.065 6.716c-.587 3.694-1.513 9.4-2.058 12.685a5718.93 5718.93 0 0 1-3.65 21.72c-.542 3.191-1.438 8.266-1.991 11.276-.554 3.01-1.364 7.412-1.802 9.783-.437 2.37-1.261 6.847-1.83 9.947-.567 3.103-1.481 8.026-2.03 10.945-.55 2.918-1.441 7.544-1.984 10.28-.543 2.736-1.067 5.311-1.167 5.72l-.181.747h7.13zm30.696-38.342l-2.768.167-1.81-.32-1.81-.32-1.838-.839-1.838-.84-1.284-1.226-1.284-1.225-.741-1.658c-.408-.913-.932-2.462-1.164-3.444l-.423-1.784.17-2.858.17-2.858.854-4.477c.47-2.462 1.313-7.089 1.874-10.28.561-3.192 1.413-7.87 1.89-10.394l.867-4.59 1.901-1.581c1.046-.87 2.703-2.036 3.682-2.591l1.778-1.01 2.321-.718 2.322-.72 2.985-.174 2.984-.175 2.431.518 2.43.518 1.715.79 1.715.79 1.438 1.445 1.44 1.446.774 1.531c.427.843 1.027 2.49 1.332 3.663l.556 2.131-.17 6.302-.17 6.3-.852 3.725c-.468 2.049-1.36 5.183-1.981 6.964l-1.13 3.24-1.384 2.622c-.761 1.443-1.935 3.392-2.608 4.332-.673.939-1.747 2.158-2.386 2.705a52.14 52.14 0 0 1-2.375 1.905l-1.216.908-2.814.957-2.814.957-2.769.166zm68.862 9.117l3.648.042 3.648-.333c2.007-.183 5.29-.564 7.295-.847 2.007-.283 5.473-.916 7.703-1.405l4.053-.892.203-1.496c.111-.821.566-3.268 1.012-5.436l.81-3.945-.18-.178-.178-.178-1.24.598c-.68.329-2.805 1.115-4.717 1.745l-3.48 1.146-3.65.708-3.651.707-5.804.012-5.804.01-1.99-.635c-1.094-.349-2.703-.988-3.576-1.421l-1.586-.785-1.31-1.184-1.31-1.184-1.023-1.785-1.022-1.787-.64-2.24-.642-2.24-.003-4.147-.005-4.147.568-3.698.57-3.7 4.99-.233 4.99-.234 18.447.12 18.446.118.557-2.362c.307-1.3.775-3.986 1.041-5.97l.484-3.607.01-3.033.011-3.034-.525-2.266-.526-2.264-.869-1.5c-.476-.824-1.319-2.019-1.87-2.656-.55-.636-1.534-1.533-2.186-1.993-.652-.46-1.93-1.233-2.843-1.718l-1.658-.882-2.896-.698-2.898-.697-3.569-.341-3.57-.342-3.316.216-3.316.215-3.98.764-3.98.765-2.487.994c-1.368.546-3.457 1.544-4.642 2.217-1.186.672-2.827 1.766-3.647 2.43-.823.666-2.244 1.959-3.159 2.874-.916.916-2.272 2.56-3.011 3.654-.74 1.095-1.874 3.034-2.522 4.31-.646 1.278-1.489 3.069-1.872 3.98-.383.912-1.08 2.778-1.547 4.145-.469 1.369-1.204 3.98-1.635 5.805a109.124 109.124 0 0 0-1.313 6.67l-.528 3.357.005 4.935.005 4.934.504 2.156c.276 1.185.807 2.977 1.177 3.98.37 1.003 1.057 2.495 1.524 3.316.466.82 1.465 2.142 2.216 2.937.752.794 2.114 2 3.026 2.678.911.68 2.535 1.634 3.607 2.122l1.95.887 2.718.658c1.495.36 3.752.79 5.015.952 1.262.162 3.937.314 5.943.336zm6.246-46.717c-9.18 0-16.692-.065-16.692-.146 0-.08.392-1.237.871-2.57.478-1.334 1.32-3.317 1.868-4.41l.999-1.985 2.193-2.182 2.193-2.183 2.157-1.03c1.185-.567 2.752-1.185 3.48-1.372.731-.187 2.82-.436 4.643-.552l3.318-.213 2.547.328 2.546.327 1.85.847 1.851.847 1.016 1.095c.558.602 1.223 1.488 1.478 1.97l.463.875.306 1.943.307 1.944-.35 3.233-.35 3.234h-16.694zm99.213 46.718l3.65.04 4.142-.49c2.28-.27 5.313-.717 6.742-.995a76.861 76.861 0 0 0 5.14-1.22c1.398-.397 2.663-.824 2.812-.95.148-.127.542-1.633.877-3.345.335-1.712.758-4.009.938-5.103.18-1.095.274-2.048.208-2.12-.067-.072-.31.021-.543.205-.234.185-1.86.87-3.617 1.522l-3.193 1.186-4.547.88-4.548.881-3.865-.13-3.866-.133-2.197-.762-2.196-.762-1.697-1.483-1.696-1.485-1.127-2.05-1.124-2.05-.538-2.743-.535-2.743.004-3.557.002-3.558.652-4.311.652-4.312.688-2.322c.38-1.277.81-2.768.954-3.315.146-.548.753-2.115 1.352-3.483.598-1.368 1.665-3.482 2.37-4.698l1.284-2.21 1.577-1.635 1.577-1.634 1.668-1.034 1.67-1.036 2.145-.66c1.179-.364 3.264-.836 4.631-1.048l2.487-.388 3.648.183 3.648.183 4.31.864 4.312.861 1.753.654c.964.36 1.795.655 1.848.655.05 0 .282-1.231.513-2.737.232-1.504.643-3.98.914-5.5.273-1.522.43-2.833.349-2.912-.08-.08-1.376-.286-2.879-.457-1.504-.171-5.591-.475-9.082-.677l-6.35-.364-4.476.343-4.477.344-3.317.696-3.315.697-2.137.854c-1.174.47-2.894 1.318-3.823 1.884a60.66 60.66 0 0 0-2.625 1.693c-.516.365-2.08 1.788-3.479 3.163l-2.539 2.5-1.419 2.077c-.78 1.143-2.127 3.524-2.997 5.294l-1.58 3.217-1.211 3.48c-.666 1.916-1.596 5.05-2.066 6.965l-.855 3.483-.311 3.15-.31 3.15.003 4.146.004 4.145.312 2.411.313 2.412.994 2.48.992 2.481 1.149 1.793 1.146 1.793 1.824 1.796 1.825 1.795 1.93 1.021 1.93 1.02 2.535.704c1.393.387 3.408.831 4.476.987 1.068.156 3.584.302 5.593.324h-.006zm54.55-.122l4.476-.129 2.819-.721 2.819-.722 1.824-.862c1.003-.473 2.644-1.41 3.648-2.08 1.003-.67 2.557-1.944 3.45-2.83.895-.888 2.221-2.4 2.948-3.362.727-.963 1.365-1.707 1.419-1.653.055.054-.114 1.587-.372 3.407-.257 1.822-.471 4.244-.475 5.384l-.006 2.072h12.172l.187-4.724.185-4.726.869-6.136c.478-3.374 1.25-8.374 1.715-11.109.465-2.736 1.273-7.361 1.797-10.28.523-2.92 1.352-7.47 1.84-10.115l.892-4.808.03-4.153.03-4.154-.939-1.92-.94-1.92-1.272-1.222-1.275-1.223-2.09-1.059-2.091-1.06-3.116-.693-3.117-.694-4.29-.326-4.29-.326-5.527.342c-3.04.188-7.317.559-9.506.826l-3.98.482-2.712.01-2.712.01-.395 1.908c-.217 1.049-.82 3.54-1.34 5.537-.521 1.997-.898 3.678-.838 3.737.058.06 1.509-.27 3.222-.731 1.714-.462 5.355-1.22 8.092-1.686l4.974-.847 4.476-.184 4.477-.185 2.884.505 2.884.506 1.925.95 1.924.95 1.078 1.607 1.079 1.606-.015 2.532-.017 2.533-.57 2.779-.572 2.78-11.933.043-11.932.042-3.905 1.07c-2.147.59-4.526 1.372-5.285 1.738-.76.368-1.518.668-1.688.668-.168 0-1.446.707-2.839 1.575l-2.532 1.573-1.994 1.99c-1.098 1.096-2.499 2.738-3.114 3.65-.616.911-1.618 2.816-2.224 4.233l-1.103 2.576-.507 2.895-.507 2.897v6.077l.483 2.53.485 2.53.897 1.65c.494.906 1.402 2.236 2.015 2.953l1.117 1.304 1.982 1.205 1.983 1.205 2.271.642c1.25.353 3.15.781 4.224.951l1.953.308 4.477-.128h-.003zm4.145-9.274l-2.654.14-1.757-.449c-.965-.245-2.432-.794-3.259-1.219l-1.5-.772-.82-.974c-.45-.537-1.14-1.588-1.53-2.34l-.711-1.365-.139-3.187-.14-3.188.562-1.934c.309-1.063 1.035-2.91 1.612-4.101l1.05-2.168 2.011-1.996 2.01-1.996 2.135-1.028 2.134-1.028 2.653-.63 2.654-.63h16.581l.524.216.524.216-.44 2.603c-.243 1.43-.822 4.02-1.288 5.752-.464 1.734-1.285 4.28-1.823 5.66-.539 1.381-.98 2.602-.98 2.712 0 .112-.545 1.117-1.211 2.235l-1.21 2.034-1.989 1.971c-1.093 1.083-2.11 1.97-2.257 1.97-.146 0-.816.373-1.488.83l-1.223.827-2.69.851-2.689.85-2.652.138zm107.943 9.392l3.15.04 2.985-.485c1.642-.266 3.73-.695 4.643-.953.911-.259 2.554-.928 3.647-1.488l1.99-1.02 1.713-1.507 1.71-1.507 1.804-2.403c.992-1.323 1.889-2.628 1.995-2.902l.192-.499-.167 1.66a54.148 54.148 0 0 1-.46 3.316c-.16.912-.389 2.665-.51 3.897l-.22 2.237h13.012v-4.476l.99-8.457c.546-4.651 1.352-10.843 1.792-13.762.44-2.92 1.12-7.096 1.51-9.285.39-2.19 1.081-6.144 1.534-8.788.456-2.644 1.276-7.272 1.825-10.28.548-3.01 1.427-7.785 1.952-10.612l1.812-9.784c.471-2.553 1.317-7.03 1.878-9.948a704.51 704.51 0 0 1 1.823-9.12c.441-2.097.802-3.926.801-4.062v-.25h-14.195l-.21 2.074c-.114 1.14-.658 4.907-1.206 8.374-.549 3.464-1.444 8.986-1.99 12.269-.544 3.283-1.068 6.467-1.165 7.075l-.178 1.106-.56-.238c-.307-.131-1.978-.595-3.71-1.03l-3.15-.791-4.31-.336-4.312-.335-3.648.339-3.647.34-3.317.84-3.316.837-3.15 1.537-3.152 1.536-2.32 1.718-2.322 1.718-2.005 2.15c-1.103 1.183-2.695 3.138-3.54 4.346l-1.534 2.196-1.804 3.75c-.99 2.064-2.197 4.796-2.68 6.072-.484 1.278-1.335 4.108-1.894 6.29l-1.015 3.968-.5 5.153-.5 5.15.375 4.146.376 4.145.443 1.492c.246.821.76 2.283 1.145 3.25l.7 1.758 1.276 1.727 1.278 1.729 1.457 1.193 1.458 1.195 1.99.988c1.095.543 2.93 1.245 4.08 1.56 1.148.315 3.013.693 4.145.84 1.13.147 3.472.286 5.206.307zm5.654-9.407l-2.504.13-1.69-.303c-.929-.167-2.416-.616-3.305-.997l-1.615-.691-1.36-1.115-1.359-1.113-1.01-1.935-1.01-1.934-.461-2.156-.46-2.156.04-4.31.038-4.312.535-3.814.534-3.813.831-2.653c.457-1.459.834-2.836.836-3.06.004-.223.453-1.416 1.003-2.652a89.832 89.832 0 0 1 2.037-4.237c.572-1.095 1.64-2.8 2.374-3.79.736-.991 2.045-2.484 2.91-3.318.864-.832 2.238-1.926 3.056-2.428l1.484-.913 2.607-.903 2.607-.902 5.472-.003h5.472l3.15.875c1.733.48 3.573 1.037 4.089 1.238l.938.364-.183.91c-.1.502-.495 2.702-.876 4.89-.38 2.19-1.132 6.368-1.668 9.287-.537 2.918-1.361 7.32-1.833 9.782-.47 2.463-1.152 5.596-1.515 6.964a457.836 457.836 0 0 1-1.138 4.21c-.263.948-.889 2.59-1.39 3.648-.503 1.059-1.382 2.597-1.953 3.417-.572.82-1.538 1.959-2.148 2.527-.611.57-1.93 1.58-2.934 2.246l-1.824 1.212-2.636.837-2.637.837-2.504.134zm-488.066 7.793h8.056l.579-3.564c.317-1.96.939-5.73 1.38-8.374l1.823-10.943c.563-3.375 1.406-8.374 1.874-11.11.467-2.735 1.211-6.979 1.651-9.43.441-2.453.886-4.541.987-4.644l.187-.185h43.331l.241.24.241.24-.377 1.915c-.205 1.054-.816 4.303-1.357 7.221-.54 2.919-1.448 7.843-2.02 10.945-.568 3.1-1.393 7.503-1.83 9.782a1289.35 1289.35 0 0 0-1.968 10.612c-.643 3.556-1.17 6.653-1.167 6.881l.004.414h16.18l.358-2.072c.198-1.14.514-3.192.705-4.56.19-1.368.65-4.279 1.02-6.467.37-2.187 1.109-6.517 1.643-9.617.534-3.1 1.429-8.398 1.987-11.772.559-3.375 1.387-8.299 1.842-10.943a711.931 711.931 0 0 1 1.798-9.95 2821.88 2821.88 0 0 0 1.98-10.612c.555-3.008 1.384-7.56 1.845-10.114.461-2.553 1.3-7.18 1.867-10.28.566-3.1 1.28-6.719 1.587-8.042l.559-2.404h-16.384l-.223 1.576c-.121.865-.517 3.291-.879 5.388a1576.67 1576.67 0 0 1-1.46 8.29c-.442 2.463-1.249 7.163-1.794 10.447a784.292 784.292 0 0 0-1.543 9.658l-.553 3.688-12.025.244-12.026.243-10.072-.24c-5.54-.13-10.103-.265-10.141-.296-.037-.032.151-1.32.419-2.864a262.12 262.12 0 0 1 1.127-5.956c.352-1.733 1.02-5.165 1.482-7.629.464-2.461.988-5.52 1.167-6.797a84.57 84.57 0 0 1 .83-4.727c.278-1.321.806-4.107 1.174-6.189.366-2.081.757-4.022.869-4.31l.2-.526H121.685l-.52 2.902a231.194 231.194 0 0 0-.848 5.057c-.18 1.185-.786 4.99-1.345 8.456-.56 3.465-1.386 8.614-1.836 11.44-.45 2.828-1.27 7.977-1.82 11.442a700.908 700.908 0 0 1-2.023 11.938c-.56 3.102-1.373 7.503-1.805 9.783-.431 2.28-1.253 6.608-1.826 9.617a840.991 840.991 0 0 1-1.86 9.452c-.45 2.188-.946 4.725-1.103 5.636-.159.913-.671 3.543-1.142 5.846-.47 2.303-.854 4.429-.854 4.726v.538h8.059zm89.199 0h7.133l.2-.524c.112-.29.202-1.046.202-1.68 0-.638.45-3.946.997-7.353a2950.858 2950.858 0 0 1 3.848-23.273c.45-2.644 1.25-7.046 1.777-9.784a2436.17 2436.17 0 0 0 1.802-9.45 1195.97 1195.97 0 0 1 2.022-10.41c.649-3.264 1.26-6.064 1.36-6.224l.18-.292-7.213.09-7.213.088-.603 4.312a535.526 535.526 0 0 1-1.604 10.445c-.552 3.375-1.388 8.525-1.857 11.441a493.02 493.02 0 0 1-1.817 10.447l-1.808 9.617c-.462 2.463-1.293 6.79-1.846 9.617a1286.42 1286.42 0 0 1-1.648 8.29c-.355 1.734-.734 3.487-.845 3.898l-.2.745h7.133zm166.83 0h7.081l.212-2.996c.118-1.646.518-4.967.89-7.378.374-2.41 1.138-7.218 1.697-10.683.56-3.466 1.6-9.234 2.312-12.82.714-3.583 1.518-7.147 1.79-7.916.272-.771.494-1.605.494-1.855s.533-1.612 1.183-3.026c.65-1.414 1.863-3.58 2.695-4.812l1.511-2.242 2.023-1.874 2.023-1.872 2.495-1.192 2.495-1.192 3.815.02 3.812.02 1.876.56c1.03.308 1.963.56 2.072.56.109 0 .198-.351.198-.783 0-.43.373-2.614.829-4.854.455-2.238.829-4.164.829-4.28 0-.116-1.082-.54-2.404-.94-1.323-.402-3.15-.823-4.062-.937l-1.658-.205-2.156.382c-1.186.21-2.948.672-3.917 1.029-.97.356-2.57 1.163-3.556 1.794-.986.632-2.52 1.862-3.41 2.733-.89.872-2.385 2.63-3.323 3.907-.94 1.277-1.92 2.62-2.181 2.985l-.475.662.288-1.325c.159-.73.6-3.118.981-5.306.38-2.19.774-4.242.87-4.56l.176-.581H373.65v.8c0 .44-.374 3.087-.83 5.885-.456 2.799-1.208 7.475-1.671 10.394-.463 2.918-1.285 7.992-1.826 11.275a572.387 572.387 0 0 1-1.828 10.445 2317.56 2317.56 0 0 1-3.83 19.898c-.558 2.828-1.227 6.166-1.484 7.42-.259 1.253-.47 2.41-.47 2.569v.291h7.08zm168.074 0h7.239v-4.431l.834-5.495c.46-3.02 1.216-7.808 1.683-10.633a1372.56 1372.56 0 0 0 1.29-7.96c.246-1.55.892-4.908 1.438-7.461.548-2.554 1.23-5.314 1.518-6.136.288-.82.525-1.682.528-1.913.003-.232.62-1.721 1.37-3.31l1.367-2.892 1.804-2.395 1.802-2.394 1.973-1.484c1.085-.816 2.83-1.898 3.878-2.406l1.905-.922 4.144.028 4.146.03 1.632.523 1.631.524.276-.17.274-.17.016-1.058c.006-.582.361-2.747.788-4.813l.775-3.754-.872-.342a51.307 51.307 0 0 0-2.53-.862l-1.658-.523-2.984.008-2.985.007-2.432.857-2.433.855-1.827 1.101-1.825 1.102-2.375 2.487-2.375 2.487-1.276 1.93c-.7 1.06-1.318 1.881-1.372 1.823-.053-.057.328-2.27.847-4.913.52-2.645.952-5.145.96-5.555l.014-.747h-12.27v.212c0 .116-.306 2.242-.68 4.725a1358.83 1358.83 0 0 1-1.668 10.65c-.544 3.374-1.435 8.82-1.982 12.104a646.012 646.012 0 0 1-1.831 10.447c-.46 2.461-1.278 6.79-1.817 9.616-.54 2.828-1.425 7.38-1.968 10.115-.543 2.735-1.264 6.355-1.6 8.042l-.612 3.066h7.24zm-320.878-80.922l2.012.007 1.601-.545 1.602-.545 1.416-1.438 1.417-1.436.745-1.915.747-1.915.026-2.819.027-2.817-.663-1.102-.664-1.1-1.154-.715-1.155-.715h-4.986l-1.697.76-1.698.76-.985 1.055-.985 1.057-.774 1.823-.774 1.824-.146 2.841-.146 2.841.72 1.413.72 1.411 1.391.631 1.39.63 2.013.009z\" fill=\"#B3131B\"/></g></svg>";

	var $$8 = jQuery; // sets an input element to validate email address on keypress

	var AfdCard =
	/*#__PURE__*/
	function (_afdValidationMixin) {
	  inherits(AfdCard, _afdValidationMixin);

	  function AfdCard(_element, _options) {
	    var _this;

	    classCallCheck(this, AfdCard);

	    _this = possibleConstructorReturn(this, getPrototypeOf(AfdCard).call(this, _element, _options));

	    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "init", function () {
	      _this.$expiryElement = $$8('[data-afd-control="expiry"]');
	      _this.$cvvElement = $$8('[data-afd-control="cvv"]');

	      _this.$element.data('card-is-afd-valid', false);

	      _this.$expiryElement.data('expiry-is-regex-valid', false);

	      _this.$expiryElement.data('expiry-is-syntax-valid', false);

	      var event = _this.eventHandler;
	      event(_this.$element, 'keydown', _this.onKeyDown);
	      event(_this.$element, 'keyup', _this.onKeyUp);
	      event(_this.$element, 'focusout', _this.onFocusOut);
	      event(_this.$expiryElement, 'keydown', _this.onExpiryKeyDown);
	      event(_this.$expiryElement, 'keyup', _this.onExpiryKeyUp);
	      event(_this.$expiryElement, 'focusout', _this.onExpiryFocusOut);
	      $$8('.afd-card-logo').html(blankCard).find('svg').attr('height', _this.options.card.logoHeight).attr('width', _this.options.card.logoWidth);

	      _this.$element.data('card-is-regex-valid', false);

	      _this.$element.data('card-is-syntax-valid', false);

	      _this.$element.data('card-is-afd-valid', false);

	      _this.$element.data('card-type', '');

	      _this.$element.data('card-type-nice', '');

	      _this.$element.data('expiry-is-regex-valid', false);

	      _this.$element.data('expiry-is-syntax-valid', false);

	      _this.$cvvElement.data('code-name', '');

	      _this.$cvvElement.data('code-length', '');

	      _this.$cvvElement.attr('maxlength', 3);
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
	        var cardLogo = blankCard;

	        switch (regexValid.card.type) {
	          case 'visa':
	            cardLogo = visa;
	            break;

	          case 'mastercard':
	            cardLogo = mastercard;
	            break;

	          case 'american-express':
	            cardLogo = amex;
	            break;

	          case 'diners-club':
	            cardLogo = diners;
	            break;

	          case 'discover':
	            cardLogo = discover;
	            break;

	          case 'jcb':
	            cardLogo = jcb;
	            break;

	          case 'unionpay':
	            cardLogo = unionpay;
	            break;

	          case 'maestro':
	            cardLogo = maestro;
	            break;

	          case 'elo':
	            cardLogo = elo;
	            break;

	          case 'hipercard':
	            cardLogo = hipercard;
	            break;

	          default:

	        }

	        $$8('.afd-card-logo').html(cardLogo).find('svg').attr('height', _this.options.card.logoHeight).attr('width', _this.options.card.logoWidth);
	        var code = regexValid.card.code;

	        _this.$cvvElement.data('code-name', code.name);

	        _this.$cvvElement.data('code-length', code.size);

	        _this.$cvvElement.attr('maxlength', code.size);
	      }

	      if (regexValid.isValid) {
	        _this.handleValid();
	      } else {
	        _this.clearValidation();
	      }

	      $element.data('card-is-regex-valid', regexValid.isValid);
	      $element.data('card-is-syntax-valid', regexValid.isValid);
	      $element.data('card-is-afd-valid', false);
	      $$8(document).trigger('afd:cardValidationUpdated', [$element, _this.$expiryElement, _this.$cvvElement]);
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
	      $element.data('expiry-is-syntax-valid', dateValid.isValid);
	      $$8(document).trigger('afd:cardValidationUpdated', [_this.$element, $element, _this.$cvvElement]);
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
	        _this.handleInvalid(_this.options.card.invalidExpiryDateMessage, $element);
	      }

	      _this.$element.data('card-is-afd-valid', false);

	      $element.data('expiry-is-regex-valid', dateValid.isValid);
	      $element.data('expiry-is-syntax-valid', dateValid.isValid);
	      $$8(document).trigger('afd:cardValidationUpdated', [_this.$element, $element, _this.$cvvElement]);
	    });

	    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "checkBoth", function () {
	      // When we focus out of either card or expiry field we check if both are regex valid and if they are an AFD
	      // validation lookup
	      var cardElement = $$8('[data-afd-control="card"]');
	      var card = cardElement.val();
	      var cardValid = cardValidator_1(card);
	      var expiryElement = $$8('[data-afd-control="expiry"]');
	      var expiry = expiryElement.val().replace(' / ', '/');
	      var expiryValid = cardValidator_2(expiry);

	      if (cardValid.isValid && expiryValid.isValid) {
	        $$8(document).trigger('afd:cardValidationStarted', [cardElement, expiryElement]);

	        _this.showLoadingSpinner(cardElement, _this.options.card.loadingSpinner);

	        _this.validateCard(card, expiry).then(function (data) {
	          // what to do if AFD confirms validation
	          if (data.Result === '1') {
	            var _data$Item = slicedToArray(data.Item, 1),
	                item = _data$Item[0];

	            _this.handleValid();

	            _this.handleValid(expiryElement);

	            cardElement.data('card-type-nice', item.CardType);
	            cardElement.data('card-is-afd-valid', true);
	            $$8(document).trigger('afd:cardValidationUpdated', [cardElement, expiryElement, _this.$cvvElement]);
	          } else {
	            _this.$element.data('card-is-afd-valid', false);

	            handleInvalid(options.card.invalidCardOrExpiryMessage);
	          }

	          $$8(document).trigger('afd:cardValidationSuccess', [data, cardElement, expiryElement]);

	          _this.hideLoadingSpinner(cardElement, _this.options.card.loadingSpinner);
	        }).catch(function (err) {
	          console.error(err);
	          $$8(document).trigger('afd:cardValidationError', [err]);

	          _this.hideLoadingSpinner(cardElement, _this.options.card.loadingSpinner);
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

	  createClass(AfdCard, [{
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
	      return $$8.ajax(requestOptions);
	    }
	  }]);

	  return AfdCard;
	}(afdValidationMixin(AfdControl));

	function initCard () {
	  var $ = jQuery; // set options

	  var options = $.extend(true, {}, defaults, afdOptions); // assign card field

	  var $card = $(this); // Validate that field is <input>

	  if (!$card.is('input')) {
	    throw '<' + $card.prop('tagName').toLowerCase() + '> is not a valid tag for `[data-afd-control="card"]`, use <input>';
	  } // Assign expiry date field


	  var $expiry = $('[data-afd-control="expiry"]'); // Validate that there is only one sort code field on page

	  var expiryCount = $expiry.length;

	  if (expiryCount === 0) {
	    throw 'Could not find an instance of `[data-afd-control="expiry"]`.  This is required for card validation';
	  } else if (expiryCount > 1) {
	    throw 'More than one instance of `[data-afd-control="expiry"]` found';
	  } // Validate that expiry code field is <input>


	  if (!$expiry.is('input')) {
	    throw '<' + $expiry.prop('tagName').toLowerCase() + '> is not a valid tag for `[data-afd-control="expiry"]`, use <input>';
	  } // initialise the control


	  var card = new AfdCard($card, options);
	  $(document).off('afd:init.afd').on('afd:init.afd', function () {
	    card.init();
	  });
	  card.init();
	}

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

	var $$9 = jQuery; // sets an input element to validate email address on keypress

	var AfdEmail =
	/*#__PURE__*/
	function (_afdValidationMixin) {
	  inherits(AfdEmail, _afdValidationMixin);

	  function AfdEmail(_$element, options) {
	    var _this;

	    classCallCheck(this, AfdEmail);

	    _this = possibleConstructorReturn(this, getPrototypeOf(AfdEmail).call(this, _$element, options));

	    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onKeyUp", function (e) {
	      var $element = _this.$element;
	      var email = $element.val();
	      $element.data('email-is-afd-valid', false);
	      $element.data('email-pce-message', 'Syntax not valid'); // check to see if we can locally confirm email address via regex

	      if (validate(email)) {
	        $element.data('email-is-regex-valid', true);
	        $element.data('email-pce-message', 'Regex valid, not yet queried PCE');
	      } else {
	        $element.data('email-is-regex-valid', false); // this.handleInvalid(this.options.email.invalidEmailMessage);

	        $$9(document).trigger('afd:emailValidationUpdated', [_this.$element]);
	      }

	      _this.clearValidation();

	      $$9(document).trigger('afd:emailValidationUpdated', [_this.$element]);
	    });

	    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onFocusOut", function () {
	      if (typeof _this.$element.data('afd-already-valid') === 'undefined') {
	        _this.$element.data('afd-already-valid', []);
	      }

	      var $element = _this.$element;
	      var email = $element.val(); // first check to see if we can locally confirm email address via regex

	      if (validate(email)) {
	        $element.data('email-is-regex-valid', true);

	        if (_this.$element.data('afd-already-valid').indexOf(email) > -1) {
	          _this.handleValid();

	          $element.data('email-is-afd-valid', true);
	          $$9(document).trigger('afd:emailValidationUpdated', [$element]);
	          $$9(document).trigger('afd:emailValidationUpdatedFocusOut', [$element]);
	          return;
	        }

	        $$9(document).trigger('afd:emailValidationStarted', [$element]);

	        _this.showLoadingSpinner($element, _this.options.email.loadingSpinner); // if it is a correctly structured email address then check against PCE


	        var pceValid = _this.validateEmail(email);

	        pceValid.then(function (data) {
	          if (data.Result === '1') {
	            var _data$Item = slicedToArray(data.Item, 1),
	                item = _data$Item[0];

	            _this.handleValid();

	            $element.data('email-is-afd-valid', true);
	            $element.data('email-pce-message', item.Status);
	            $$9(document).trigger('afd:emailValidationUpdated', [$element]);
	            $$9(document).trigger('afd:emailValidationUpdatedFocusOut', [$element]);

	            var alreadyValid = _this.$element.data('afd-already-valid');

	            if (alreadyValid.indexOf(email) < 0) {
	              alreadyValid.push(email);

	              _this.$element.data('afd-already-valid', alreadyValid);
	            }
	          } else if (data.Result === '-2') {
	            _this.handleInvalid(data.ErrorText);

	            $element.data('email-is-afd-valid', false);
	            $element.data('email-pce-message', data.ErrorText);
	            $$9(document).trigger('afd:emailValidationUpdated', [$element]);
	            $$9(document).trigger('afd:emailValidationUpdatedFocusOut', [$element]);
	          }

	          $$9(document).trigger('afd:emailValidationSuccess', [data, $element]);

	          _this.hideLoadingSpinner($element, _this.options.email.loadingSpinner);
	        }).fail(function (err) {
	          console.error(err);
	          $$9(document).trigger('afd:emailValidationError', [err]);

	          _this.hideLoadingSpinner($element, _this.options.email.loadingSpinner);
	        });
	      } else {
	        $element.data('email-is-regex-valid', false);

	        _this.handleInvalid(_this.options.email.invalidEmailMessage);

	        $$9(document).trigger('afd:emailValidationUpdatedFocusOut', [$element]);
	        $$9(document).trigger('afd:emailValidationUpdated', [$element]);
	      }

	      $$9(document).trigger('afd:emailValidationUpdated', [$element]);
	    });

	    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "validateEmail", function (email) {
	      var requestOptions = _this.setupParams({
	        data: 'email',
	        task: 'live',
	        fields: 'standard',
	        email: email,
	        afdc: _this.options.afdc
	      });

	      return $$9.ajax(requestOptions);
	    });

	    _this.controlType = 'email';
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

	function initEmail () {
	  var $ = jQuery; // set options

	  var options = $.extend(true, {}, defaults, afdOptions); // assign email field

	  var $email = $(this); // Validate that email field is <input>

	  if (!$email.is('input')) {
	    throw '<' + $email.prop('tagName').toLowerCase() + '> is not a valid tag for `[data-afd-control="email"]`, use <input>';
	  } // initialise the control


	  var email = new AfdEmail($email, options);
	  $(document).off('afd:init.afd').on('afd:init.afd', function () {
	    email.init();
	  });
	  email.init();
	}

	// helper for String#{startsWith, endsWith, includes}



	var _stringContext = function (that, searchString, NAME) {
	  if (_isRegexp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
	  return String(_defined(that));
	};

	var MATCH$1 = _wks('match');
	var _failsIsRegexp = function (KEY) {
	  var re = /./;
	  try {
	    '/./'[KEY](re);
	  } catch (e) {
	    try {
	      re[MATCH$1] = false;
	      return !'/./'[KEY](re);
	    } catch (f) { /* empty */ }
	  } return true;
	};

	var STARTS_WITH = 'startsWith';
	var $startsWith = ''[STARTS_WITH];

	_export(_export.P + _export.F * _failsIsRegexp(STARTS_WITH), 'String', {
	  startsWith: function startsWith(searchString /* , position = 0 */) {
	    var that = _stringContext(this, searchString, STARTS_WITH);
	    var index = _toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
	    var search = String(searchString);
	    return $startsWith
	      ? $startsWith.call(that, search, index)
	      : that.slice(index, index + search.length) === search;
	  }
	});

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
	var id$1 = {
		locale: locale$k,
		countries: countries$k
	};

	var id$2 = /*#__PURE__*/Object.freeze({
		locale: locale$k,
		countries: countries$k,
		default: id$1
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

	var require$$20 = ( id$2 && id$1 ) || id$2;

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

	for (var i$2 = 0; i$2 < locales.length; i$2++) {
	  i18nIsoCountries.registerLocale(locales[i$2]);
	}

	var entryNode = i18nIsoCountries;

	var intlTelInput = createCommonjsModule(function (module) {
	/*
	 * International Telephone Input v17.0.0
	 * https://github.com/jackocnr/intl-tel-input.git
	 * Licensed under the MIT license
	 */

	// wrap in UMD
	(function(factory) {
	    if (module.exports) module.exports = factory(); else window.intlTelInput = factory();
	})(function(undefined) {
	    return function() {
	        // Array of country objects for the flag dropdown.
	        // Here is the criteria for the plugin to support a given country/territory
	        // - It has an iso2 code: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
	        // - It has it's own country calling code (it is not a sub-region of another country): https://en.wikipedia.org/wiki/List_of_country_calling_codes
	        // - It has a flag in the region-flags project: https://github.com/behdad/region-flags/tree/gh-pages/png
	        // - It is supported by libphonenumber (it must be listed on this page): https://github.com/googlei18n/libphonenumber/blob/master/resources/ShortNumberMetadata.xml
	        // Each country array has the following information:
	        // [
	        //    Country name,
	        //    iso2 code,
	        //    International dial code,
	        //    Order (if >1 country with same dial code),
	        //    Area codes
	        // ]
	        var allCountries = [ [ "Afghanistan (‫افغانستان‬‎)", "af", "93" ], [ "Albania (Shqipëri)", "al", "355" ], [ "Algeria (‫الجزائر‬‎)", "dz", "213" ], [ "American Samoa", "as", "1", 5, [ "684" ] ], [ "Andorra", "ad", "376" ], [ "Angola", "ao", "244" ], [ "Anguilla", "ai", "1", 6, [ "264" ] ], [ "Antigua and Barbuda", "ag", "1", 7, [ "268" ] ], [ "Argentina", "ar", "54" ], [ "Armenia (Հայաստան)", "am", "374" ], [ "Aruba", "aw", "297" ], [ "Australia", "au", "61", 0 ], [ "Austria (Österreich)", "at", "43" ], [ "Azerbaijan (Azərbaycan)", "az", "994" ], [ "Bahamas", "bs", "1", 8, [ "242" ] ], [ "Bahrain (‫البحرين‬‎)", "bh", "973" ], [ "Bangladesh (বাংলাদেশ)", "bd", "880" ], [ "Barbados", "bb", "1", 9, [ "246" ] ], [ "Belarus (Беларусь)", "by", "375" ], [ "Belgium (België)", "be", "32" ], [ "Belize", "bz", "501" ], [ "Benin (Bénin)", "bj", "229" ], [ "Bermuda", "bm", "1", 10, [ "441" ] ], [ "Bhutan (འབྲུག)", "bt", "975" ], [ "Bolivia", "bo", "591" ], [ "Bosnia and Herzegovina (Босна и Херцеговина)", "ba", "387" ], [ "Botswana", "bw", "267" ], [ "Brazil (Brasil)", "br", "55" ], [ "British Indian Ocean Territory", "io", "246" ], [ "British Virgin Islands", "vg", "1", 11, [ "284" ] ], [ "Brunei", "bn", "673" ], [ "Bulgaria (България)", "bg", "359" ], [ "Burkina Faso", "bf", "226" ], [ "Burundi (Uburundi)", "bi", "257" ], [ "Cambodia (កម្ពុជា)", "kh", "855" ], [ "Cameroon (Cameroun)", "cm", "237" ], [ "Canada", "ca", "1", 1, [ "204", "226", "236", "249", "250", "289", "306", "343", "365", "387", "403", "416", "418", "431", "437", "438", "450", "506", "514", "519", "548", "579", "581", "587", "604", "613", "639", "647", "672", "705", "709", "742", "778", "780", "782", "807", "819", "825", "867", "873", "902", "905" ] ], [ "Cape Verde (Kabu Verdi)", "cv", "238" ], [ "Caribbean Netherlands", "bq", "599", 1, [ "3", "4", "7" ] ], [ "Cayman Islands", "ky", "1", 12, [ "345" ] ], [ "Central African Republic (République centrafricaine)", "cf", "236" ], [ "Chad (Tchad)", "td", "235" ], [ "Chile", "cl", "56" ], [ "China (中国)", "cn", "86" ], [ "Christmas Island", "cx", "61", 2 ], [ "Cocos (Keeling) Islands", "cc", "61", 1 ], [ "Colombia", "co", "57" ], [ "Comoros (‫جزر القمر‬‎)", "km", "269" ], [ "Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)", "cd", "243" ], [ "Congo (Republic) (Congo-Brazzaville)", "cg", "242" ], [ "Cook Islands", "ck", "682" ], [ "Costa Rica", "cr", "506" ], [ "Côte d’Ivoire", "ci", "225" ], [ "Croatia (Hrvatska)", "hr", "385" ], [ "Cuba", "cu", "53" ], [ "Curaçao", "cw", "599", 0 ], [ "Cyprus (Κύπρος)", "cy", "357" ], [ "Czech Republic (Česká republika)", "cz", "420" ], [ "Denmark (Danmark)", "dk", "45" ], [ "Djibouti", "dj", "253" ], [ "Dominica", "dm", "1", 13, [ "767" ] ], [ "Dominican Republic (República Dominicana)", "do", "1", 2, [ "809", "829", "849" ] ], [ "Ecuador", "ec", "593" ], [ "Egypt (‫مصر‬‎)", "eg", "20" ], [ "El Salvador", "sv", "503" ], [ "Equatorial Guinea (Guinea Ecuatorial)", "gq", "240" ], [ "Eritrea", "er", "291" ], [ "Estonia (Eesti)", "ee", "372" ], [ "Ethiopia", "et", "251" ], [ "Falkland Islands (Islas Malvinas)", "fk", "500" ], [ "Faroe Islands (Føroyar)", "fo", "298" ], [ "Fiji", "fj", "679" ], [ "Finland (Suomi)", "fi", "358", 0 ], [ "France", "fr", "33" ], [ "French Guiana (Guyane française)", "gf", "594" ], [ "French Polynesia (Polynésie française)", "pf", "689" ], [ "Gabon", "ga", "241" ], [ "Gambia", "gm", "220" ], [ "Georgia (საქართველო)", "ge", "995" ], [ "Germany (Deutschland)", "de", "49" ], [ "Ghana (Gaana)", "gh", "233" ], [ "Gibraltar", "gi", "350" ], [ "Greece (Ελλάδα)", "gr", "30" ], [ "Greenland (Kalaallit Nunaat)", "gl", "299" ], [ "Grenada", "gd", "1", 14, [ "473" ] ], [ "Guadeloupe", "gp", "590", 0 ], [ "Guam", "gu", "1", 15, [ "671" ] ], [ "Guatemala", "gt", "502" ], [ "Guernsey", "gg", "44", 1, [ "1481", "7781", "7839", "7911" ] ], [ "Guinea (Guinée)", "gn", "224" ], [ "Guinea-Bissau (Guiné Bissau)", "gw", "245" ], [ "Guyana", "gy", "592" ], [ "Haiti", "ht", "509" ], [ "Honduras", "hn", "504" ], [ "Hong Kong (香港)", "hk", "852" ], [ "Hungary (Magyarország)", "hu", "36" ], [ "Iceland (Ísland)", "is", "354" ], [ "India (भारत)", "in", "91" ], [ "Indonesia", "id", "62" ], [ "Iran (‫ایران‬‎)", "ir", "98" ], [ "Iraq (‫العراق‬‎)", "iq", "964" ], [ "Ireland", "ie", "353" ], [ "Isle of Man", "im", "44", 2, [ "1624", "74576", "7524", "7924", "7624" ] ], [ "Israel (‫ישראל‬‎)", "il", "972" ], [ "Italy (Italia)", "it", "39", 0 ], [ "Jamaica", "jm", "1", 4, [ "876", "658" ] ], [ "Japan (日本)", "jp", "81" ], [ "Jersey", "je", "44", 3, [ "1534", "7509", "7700", "7797", "7829", "7937" ] ], [ "Jordan (‫الأردن‬‎)", "jo", "962" ], [ "Kazakhstan (Казахстан)", "kz", "7", 1, [ "33", "7" ] ], [ "Kenya", "ke", "254" ], [ "Kiribati", "ki", "686" ], [ "Kosovo", "xk", "383" ], [ "Kuwait (‫الكويت‬‎)", "kw", "965" ], [ "Kyrgyzstan (Кыргызстан)", "kg", "996" ], [ "Laos (ລາວ)", "la", "856" ], [ "Latvia (Latvija)", "lv", "371" ], [ "Lebanon (‫لبنان‬‎)", "lb", "961" ], [ "Lesotho", "ls", "266" ], [ "Liberia", "lr", "231" ], [ "Libya (‫ليبيا‬‎)", "ly", "218" ], [ "Liechtenstein", "li", "423" ], [ "Lithuania (Lietuva)", "lt", "370" ], [ "Luxembourg", "lu", "352" ], [ "Macau (澳門)", "mo", "853" ], [ "Macedonia (FYROM) (Македонија)", "mk", "389" ], [ "Madagascar (Madagasikara)", "mg", "261" ], [ "Malawi", "mw", "265" ], [ "Malaysia", "my", "60" ], [ "Maldives", "mv", "960" ], [ "Mali", "ml", "223" ], [ "Malta", "mt", "356" ], [ "Marshall Islands", "mh", "692" ], [ "Martinique", "mq", "596" ], [ "Mauritania (‫موريتانيا‬‎)", "mr", "222" ], [ "Mauritius (Moris)", "mu", "230" ], [ "Mayotte", "yt", "262", 1, [ "269", "639" ] ], [ "Mexico (México)", "mx", "52" ], [ "Micronesia", "fm", "691" ], [ "Moldova (Republica Moldova)", "md", "373" ], [ "Monaco", "mc", "377" ], [ "Mongolia (Монгол)", "mn", "976" ], [ "Montenegro (Crna Gora)", "me", "382" ], [ "Montserrat", "ms", "1", 16, [ "664" ] ], [ "Morocco (‫المغرب‬‎)", "ma", "212", 0 ], [ "Mozambique (Moçambique)", "mz", "258" ], [ "Myanmar (Burma) (မြန်မာ)", "mm", "95" ], [ "Namibia (Namibië)", "na", "264" ], [ "Nauru", "nr", "674" ], [ "Nepal (नेपाल)", "np", "977" ], [ "Netherlands (Nederland)", "nl", "31" ], [ "New Caledonia (Nouvelle-Calédonie)", "nc", "687" ], [ "New Zealand", "nz", "64" ], [ "Nicaragua", "ni", "505" ], [ "Niger (Nijar)", "ne", "227" ], [ "Nigeria", "ng", "234" ], [ "Niue", "nu", "683" ], [ "Norfolk Island", "nf", "672" ], [ "North Korea (조선 민주주의 인민 공화국)", "kp", "850" ], [ "Northern Mariana Islands", "mp", "1", 17, [ "670" ] ], [ "Norway (Norge)", "no", "47", 0 ], [ "Oman (‫عُمان‬‎)", "om", "968" ], [ "Pakistan (‫پاکستان‬‎)", "pk", "92" ], [ "Palau", "pw", "680" ], [ "Palestine (‫فلسطين‬‎)", "ps", "970" ], [ "Panama (Panamá)", "pa", "507" ], [ "Papua New Guinea", "pg", "675" ], [ "Paraguay", "py", "595" ], [ "Peru (Perú)", "pe", "51" ], [ "Philippines", "ph", "63" ], [ "Poland (Polska)", "pl", "48" ], [ "Portugal", "pt", "351" ], [ "Puerto Rico", "pr", "1", 3, [ "787", "939" ] ], [ "Qatar (‫قطر‬‎)", "qa", "974" ], [ "Réunion (La Réunion)", "re", "262", 0 ], [ "Romania (România)", "ro", "40" ], [ "Russia (Россия)", "ru", "7", 0 ], [ "Rwanda", "rw", "250" ], [ "Saint Barthélemy", "bl", "590", 1 ], [ "Saint Helena", "sh", "290" ], [ "Saint Kitts and Nevis", "kn", "1", 18, [ "869" ] ], [ "Saint Lucia", "lc", "1", 19, [ "758" ] ], [ "Saint Martin (Saint-Martin (partie française))", "mf", "590", 2 ], [ "Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)", "pm", "508" ], [ "Saint Vincent and the Grenadines", "vc", "1", 20, [ "784" ] ], [ "Samoa", "ws", "685" ], [ "San Marino", "sm", "378" ], [ "São Tomé and Príncipe (São Tomé e Príncipe)", "st", "239" ], [ "Saudi Arabia (‫المملكة العربية السعودية‬‎)", "sa", "966" ], [ "Senegal (Sénégal)", "sn", "221" ], [ "Serbia (Србија)", "rs", "381" ], [ "Seychelles", "sc", "248" ], [ "Sierra Leone", "sl", "232" ], [ "Singapore", "sg", "65" ], [ "Sint Maarten", "sx", "1", 21, [ "721" ] ], [ "Slovakia (Slovensko)", "sk", "421" ], [ "Slovenia (Slovenija)", "si", "386" ], [ "Solomon Islands", "sb", "677" ], [ "Somalia (Soomaaliya)", "so", "252" ], [ "South Africa", "za", "27" ], [ "South Korea (대한민국)", "kr", "82" ], [ "South Sudan (‫جنوب السودان‬‎)", "ss", "211" ], [ "Spain (España)", "es", "34" ], [ "Sri Lanka (ශ්‍රී ලංකාව)", "lk", "94" ], [ "Sudan (‫السودان‬‎)", "sd", "249" ], [ "Suriname", "sr", "597" ], [ "Svalbard and Jan Mayen", "sj", "47", 1, [ "79" ] ], [ "Swaziland", "sz", "268" ], [ "Sweden (Sverige)", "se", "46" ], [ "Switzerland (Schweiz)", "ch", "41" ], [ "Syria (‫سوريا‬‎)", "sy", "963" ], [ "Taiwan (台灣)", "tw", "886" ], [ "Tajikistan", "tj", "992" ], [ "Tanzania", "tz", "255" ], [ "Thailand (ไทย)", "th", "66" ], [ "Timor-Leste", "tl", "670" ], [ "Togo", "tg", "228" ], [ "Tokelau", "tk", "690" ], [ "Tonga", "to", "676" ], [ "Trinidad and Tobago", "tt", "1", 22, [ "868" ] ], [ "Tunisia (‫تونس‬‎)", "tn", "216" ], [ "Turkey (Türkiye)", "tr", "90" ], [ "Turkmenistan", "tm", "993" ], [ "Turks and Caicos Islands", "tc", "1", 23, [ "649" ] ], [ "Tuvalu", "tv", "688" ], [ "U.S. Virgin Islands", "vi", "1", 24, [ "340" ] ], [ "Uganda", "ug", "256" ], [ "Ukraine (Україна)", "ua", "380" ], [ "United Arab Emirates (‫الإمارات العربية المتحدة‬‎)", "ae", "971" ], [ "United Kingdom", "gb", "44", 0 ], [ "United States", "us", "1", 0 ], [ "Uruguay", "uy", "598" ], [ "Uzbekistan (Oʻzbekiston)", "uz", "998" ], [ "Vanuatu", "vu", "678" ], [ "Vatican City (Città del Vaticano)", "va", "39", 1, [ "06698" ] ], [ "Venezuela", "ve", "58" ], [ "Vietnam (Việt Nam)", "vn", "84" ], [ "Wallis and Futuna (Wallis-et-Futuna)", "wf", "681" ], [ "Western Sahara (‫الصحراء الغربية‬‎)", "eh", "212", 1, [ "5288", "5289" ] ], [ "Yemen (‫اليمن‬‎)", "ye", "967" ], [ "Zambia", "zm", "260" ], [ "Zimbabwe", "zw", "263" ], [ "Åland Islands", "ax", "358", 1, [ "18" ] ] ];
	        // loop over all of the countries above, restructuring the data to be objects with named keys
	        for (var i = 0; i < allCountries.length; i++) {
	            var c = allCountries[i];
	            allCountries[i] = {
	                name: c[0],
	                iso2: c[1],
	                dialCode: c[2],
	                priority: c[3] || 0,
	                areaCodes: c[4] || null
	            };
	        }
	        function _classCallCheck(instance, Constructor) {
	            if (!(instance instanceof Constructor)) {
	                throw new TypeError("Cannot call a class as a function");
	            }
	        }
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
	        var intlTelInputGlobals = {
	            getInstance: function getInstance(input) {
	                var id = input.getAttribute("data-intl-tel-input-id");
	                return window.intlTelInputGlobals.instances[id];
	            },
	            instances: {}
	        };
	        if (typeof window === "object") window.intlTelInputGlobals = intlTelInputGlobals;
	        // these vars persist through all instances of the plugin
	        var id = 0;
	        var defaults = {
	            // whether or not to allow the dropdown
	            allowDropdown: true,
	            // if there is just a dial code in the input: remove it on blur
	            autoHideDialCode: true,
	            // add a placeholder in the input with an example number for the selected country
	            autoPlaceholder: "polite",
	            // modify the parentClass
	            customContainer: "",
	            // modify the auto placeholder
	            customPlaceholder: null,
	            // append menu to specified element
	            dropdownContainer: null,
	            // don't display these countries
	            excludeCountries: [],
	            // format the input value during initialisation and on setNumber
	            formatOnDisplay: true,
	            // geoIp lookup function
	            geoIpLookup: null,
	            // inject a hidden input with this name, and on submit, populate it with the result of getNumber
	            hiddenInput: "",
	            // initial country
	            initialCountry: "",
	            // localized country names e.g. { 'de': 'Deutschland' }
	            localizedCountries: null,
	            // don't insert international dial codes
	            nationalMode: true,
	            // display only these countries
	            onlyCountries: [],
	            // number type to use for placeholders
	            placeholderNumberType: "MOBILE",
	            // the countries at the top of the list. defaults to united states and united kingdom
	            preferredCountries: [ "us", "gb" ],
	            // display the country dial code next to the selected flag so it's not part of the typed number
	            separateDialCode: false,
	            // specify the path to the libphonenumber script to enable validation/formatting
	            utilsScript: ""
	        };
	        // https://en.wikipedia.org/wiki/List_of_North_American_Numbering_Plan_area_codes#Non-geographic_area_codes
	        var regionlessNanpNumbers = [ "800", "822", "833", "844", "855", "866", "877", "880", "881", "882", "883", "884", "885", "886", "887", "888", "889" ];
	        if (typeof window === "object") {
	            // keep track of if the window.load event has fired as impossible to check after the fact
	            window.addEventListener("load", function() {
	                // UPDATE: use a public static field so we can fudge it in the tests
	                window.intlTelInputGlobals.windowLoaded = true;
	            });
	        }
	        // utility function to iterate over an object. can't use Object.entries or native forEach because
	        // of IE11
	        var forEachProp = function forEachProp(obj, callback) {
	            var keys = Object.keys(obj);
	            for (var i = 0; i < keys.length; i++) {
	                callback(keys[i], obj[keys[i]]);
	            }
	        };
	        // run a method on each instance of the plugin
	        var forEachInstance = function forEachInstance(method) {
	            forEachProp(window.intlTelInputGlobals.instances, function(key) {
	                window.intlTelInputGlobals.instances[key][method]();
	            });
	        };
	        // this is our plugin class that we will create an instance of
	        // eslint-disable-next-line no-unused-vars
	        var Iti = /*#__PURE__*/
	        function() {
	            function Iti(input, options) {
	                var _this = this;
	                _classCallCheck(this, Iti);
	                this.id = id++;
	                this.telInput = input;
	                this.activeItem = null;
	                this.highlightedItem = null;
	                // process specified options / defaults
	                // alternative to Object.assign, which isn't supported by IE11
	                var customOptions = options || {};
	                this.options = {};
	                forEachProp(defaults, function(key, value) {
	                    _this.options[key] = customOptions.hasOwnProperty(key) ? customOptions[key] : value;
	                });
	                this.hadInitialPlaceholder = Boolean(input.getAttribute("placeholder"));
	            }
	            _createClass(Iti, [ {
	                key: "_init",
	                value: function _init() {
	                    var _this2 = this;
	                    // if in nationalMode, disable options relating to dial codes
	                    if (this.options.nationalMode) this.options.autoHideDialCode = false;
	                    // if separateDialCode then doesn't make sense to A) insert dial code into input
	                    // (autoHideDialCode), and B) display national numbers (because we're displaying the country
	                    // dial code next to them)
	                    if (this.options.separateDialCode) {
	                        this.options.autoHideDialCode = this.options.nationalMode = false;
	                    }
	                    // we cannot just test screen size as some smartphones/website meta tags will report desktop
	                    // resolutions
	                    // Note: for some reason jasmine breaks if you put this in the main Plugin function with the
	                    // rest of these declarations
	                    // Note: to target Android Mobiles (and not Tablets), we must find 'Android' and 'Mobile'
	                    this.isMobile = /Android.+Mobile|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
	                    if (this.isMobile) {
	                        // trigger the mobile dropdown css
	                        document.body.classList.add("iti-mobile");
	                        // on mobile, we want a full screen dropdown, so we must append it to the body
	                        if (!this.options.dropdownContainer) this.options.dropdownContainer = document.body;
	                    }
	                    // these promises get resolved when their individual requests complete
	                    // this way the dev can do something like iti.promise.then(...) to know when all requests are
	                    // complete
	                    if (typeof Promise !== "undefined") {
	                        var autoCountryPromise = new Promise(function(resolve, reject) {
	                            _this2.resolveAutoCountryPromise = resolve;
	                            _this2.rejectAutoCountryPromise = reject;
	                        });
	                        var utilsScriptPromise = new Promise(function(resolve, reject) {
	                            _this2.resolveUtilsScriptPromise = resolve;
	                            _this2.rejectUtilsScriptPromise = reject;
	                        });
	                        this.promise = Promise.all([ autoCountryPromise, utilsScriptPromise ]);
	                    } else {
	                        // prevent errors when Promise doesn't exist
	                        this.resolveAutoCountryPromise = this.rejectAutoCountryPromise = function() {};
	                        this.resolveUtilsScriptPromise = this.rejectUtilsScriptPromise = function() {};
	                    }
	                    // in various situations there could be no country selected initially, but we need to be able
	                    // to assume this variable exists
	                    this.selectedCountryData = {};
	                    // process all the data: onlyCountries, excludeCountries, preferredCountries etc
	                    this._processCountryData();
	                    // generate the markup
	                    this._generateMarkup();
	                    // set the initial state of the input value and the selected flag
	                    this._setInitialState();
	                    // start all of the event listeners: autoHideDialCode, input keydown, selectedFlag click
	                    this._initListeners();
	                    // utils script, and auto country
	                    this._initRequests();
	                }
	            }, {
	                key: "_processCountryData",
	                value: function _processCountryData() {
	                    // process onlyCountries or excludeCountries array if present
	                    this._processAllCountries();
	                    // process the countryCodes map
	                    this._processCountryCodes();
	                    // process the preferredCountries
	                    this._processPreferredCountries();
	                    // translate countries according to localizedCountries option
	                    if (this.options.localizedCountries) this._translateCountriesByLocale();
	                    // sort countries by name
	                    if (this.options.onlyCountries.length || this.options.localizedCountries) {
	                        this.countries.sort(this._countryNameSort);
	                    }
	                }
	            }, {
	                key: "_addCountryCode",
	                value: function _addCountryCode(iso2, dialCode, priority) {
	                    if (dialCode.length > this.dialCodeMaxLen) {
	                        this.dialCodeMaxLen = dialCode.length;
	                    }
	                    if (!this.countryCodes.hasOwnProperty(dialCode)) {
	                        this.countryCodes[dialCode] = [];
	                    }
	                    // bail if we already have this country for this dialCode
	                    for (var i = 0; i < this.countryCodes[dialCode].length; i++) {
	                        if (this.countryCodes[dialCode][i] === iso2) return;
	                    }
	                    // check for undefined as 0 is falsy
	                    var index = priority !== undefined ? priority : this.countryCodes[dialCode].length;
	                    this.countryCodes[dialCode][index] = iso2;
	                }
	            }, {
	                key: "_processAllCountries",
	                value: function _processAllCountries() {
	                    if (this.options.onlyCountries.length) {
	                        var lowerCaseOnlyCountries = this.options.onlyCountries.map(function(country) {
	                            return country.toLowerCase();
	                        });
	                        this.countries = allCountries.filter(function(country) {
	                            return lowerCaseOnlyCountries.indexOf(country.iso2) > -1;
	                        });
	                    } else if (this.options.excludeCountries.length) {
	                        var lowerCaseExcludeCountries = this.options.excludeCountries.map(function(country) {
	                            return country.toLowerCase();
	                        });
	                        this.countries = allCountries.filter(function(country) {
	                            return lowerCaseExcludeCountries.indexOf(country.iso2) === -1;
	                        });
	                    } else {
	                        this.countries = allCountries;
	                    }
	                }
	            }, {
	                key: "_translateCountriesByLocale",
	                value: function _translateCountriesByLocale() {
	                    for (var i = 0; i < this.countries.length; i++) {
	                        var iso = this.countries[i].iso2.toLowerCase();
	                        if (this.options.localizedCountries.hasOwnProperty(iso)) {
	                            this.countries[i].name = this.options.localizedCountries[iso];
	                        }
	                    }
	                }
	            }, {
	                key: "_countryNameSort",
	                value: function _countryNameSort(a, b) {
	                    return a.name.localeCompare(b.name);
	                }
	            }, {
	                key: "_processCountryCodes",
	                value: function _processCountryCodes() {
	                    this.dialCodeMaxLen = 0;
	                    this.countryCodes = {};
	                    // first: add dial codes
	                    for (var i = 0; i < this.countries.length; i++) {
	                        var c = this.countries[i];
	                        this._addCountryCode(c.iso2, c.dialCode, c.priority);
	                    }
	                    // next: add area codes
	                    // this is a second loop over countries, to make sure we have all of the "root" countries
	                    // already in the map, so that we can access them, as each time we add an area code substring
	                    // to the map, we also need to include the "root" country's code, as that also matches
	                    for (var _i = 0; _i < this.countries.length; _i++) {
	                        var _c = this.countries[_i];
	                        // area codes
	                        if (_c.areaCodes) {
	                            var rootCountryCode = this.countryCodes[_c.dialCode][0];
	                            // for each area code
	                            for (var j = 0; j < _c.areaCodes.length; j++) {
	                                var areaCode = _c.areaCodes[j];
	                                // for each digit in the area code to add all partial matches as well
	                                for (var k = 1; k < areaCode.length; k++) {
	                                    var partialDialCode = _c.dialCode + areaCode.substr(0, k);
	                                    // start with the root country, as that also matches this dial code
	                                    this._addCountryCode(rootCountryCode, partialDialCode);
	                                    this._addCountryCode(_c.iso2, partialDialCode);
	                                }
	                                // add the full area code
	                                this._addCountryCode(_c.iso2, _c.dialCode + areaCode);
	                            }
	                        }
	                    }
	                }
	            }, {
	                key: "_processPreferredCountries",
	                value: function _processPreferredCountries() {
	                    this.preferredCountries = [];
	                    for (var i = 0; i < this.options.preferredCountries.length; i++) {
	                        var countryCode = this.options.preferredCountries[i].toLowerCase();
	                        var countryData = this._getCountryData(countryCode, false, true);
	                        if (countryData) this.preferredCountries.push(countryData);
	                    }
	                }
	            }, {
	                key: "_createEl",
	                value: function _createEl(name, attrs, container) {
	                    var el = document.createElement(name);
	                    if (attrs) forEachProp(attrs, function(key, value) {
	                        return el.setAttribute(key, value);
	                    });
	                    if (container) container.appendChild(el);
	                    return el;
	                }
	            }, {
	                key: "_generateMarkup",
	                value: function _generateMarkup() {
	                    // if autocomplete does not exist on the element and its form, then
	                    // prevent autocomplete as there's no safe, cross-browser event we can react to, so it can
	                    // easily put the plugin in an inconsistent state e.g. the wrong flag selected for the
	                    // autocompleted number, which on submit could mean wrong number is saved (esp in nationalMode)
	                    if (!this.telInput.hasAttribute("autocomplete") && !(this.telInput.form && this.telInput.form.hasAttribute("autocomplete"))) {
	                        this.telInput.setAttribute("autocomplete", "off");
	                    }
	                    // containers (mostly for positioning)
	                    var parentClass = "iti";
	                    if (this.options.allowDropdown) parentClass += " iti--allow-dropdown";
	                    if (this.options.separateDialCode) parentClass += " iti--separate-dial-code";
	                    if (this.options.customContainer) {
	                        parentClass += " ";
	                        parentClass += this.options.customContainer;
	                    }
	                    var wrapper = this._createEl("div", {
	                        "class": parentClass
	                    });
	                    this.telInput.parentNode.insertBefore(wrapper, this.telInput);
	                    this.flagsContainer = this._createEl("div", {
	                        "class": "iti__flag-container"
	                    }, wrapper);
	                    wrapper.appendChild(this.telInput);
	                    // selected flag (displayed to left of input)
	                    this.selectedFlag = this._createEl("div", {
	                        "class": "iti__selected-flag",
	                        role: "combobox",
	                        "aria-owns": "iti-".concat(this.id, "__country-listbox"),
	                        "aria-expanded": "false"
	                    }, this.flagsContainer);
	                    this.selectedFlagInner = this._createEl("div", {
	                        "class": "iti__flag"
	                    }, this.selectedFlag);
	                    if (this.options.separateDialCode) {
	                        this.selectedDialCode = this._createEl("div", {
	                            "class": "iti__selected-dial-code"
	                        }, this.selectedFlag);
	                    }
	                    if (this.options.allowDropdown) {
	                        // make element focusable and tab navigable
	                        this.selectedFlag.setAttribute("tabindex", "0");
	                        this.dropdownArrow = this._createEl("div", {
	                            "class": "iti__arrow"
	                        }, this.selectedFlag);
	                        // country dropdown: preferred countries, then divider, then all countries
	                        this.countryList = this._createEl("ul", {
	                            "class": "iti__country-list iti__hide",
	                            id: "iti-".concat(this.id, "__country-listbox"),
	                            role: "listbox"
	                        });
	                        if (this.preferredCountries.length) {
	                            this._appendListItems(this.preferredCountries, "iti__preferred", true);
	                            this._createEl("li", {
	                                "class": "iti__divider",
	                                role: "separator",
	                                "aria-disabled": "true"
	                            }, this.countryList);
	                        }
	                        this._appendListItems(this.countries, "iti__standard");
	                        // create dropdownContainer markup
	                        if (this.options.dropdownContainer) {
	                            this.dropdown = this._createEl("div", {
	                                "class": "iti iti--container"
	                            });
	                            this.dropdown.appendChild(this.countryList);
	                        } else {
	                            this.flagsContainer.appendChild(this.countryList);
	                        }
	                    }
	                    if (this.options.hiddenInput) {
	                        var hiddenInputName = this.options.hiddenInput;
	                        var name = this.telInput.getAttribute("name");
	                        if (name) {
	                            var i = name.lastIndexOf("[");
	                            // if input name contains square brackets, then give the hidden input the same name,
	                            // replacing the contents of the last set of brackets with the given hiddenInput name
	                            if (i !== -1) hiddenInputName = "".concat(name.substr(0, i), "[").concat(hiddenInputName, "]");
	                        }
	                        this.hiddenInput = this._createEl("input", {
	                            type: "hidden",
	                            name: hiddenInputName
	                        });
	                        wrapper.appendChild(this.hiddenInput);
	                    }
	                }
	            }, {
	                key: "_appendListItems",
	                value: function _appendListItems(countries, className, preferred) {
	                    // we create so many DOM elements, it is faster to build a temp string
	                    // and then add everything to the DOM in one go at the end
	                    var tmp = "";
	                    // for each country
	                    for (var i = 0; i < countries.length; i++) {
	                        var c = countries[i];
	                        var idSuffix = preferred ? "-preferred" : "";
	                        // open the list item
	                        tmp += "<li class='iti__country ".concat(className, "' tabIndex='-1' id='iti-").concat(this.id, "__item-").concat(c.iso2).concat(idSuffix, "' role='option' data-dial-code='").concat(c.dialCode, "' data-country-code='").concat(c.iso2, "'>");
	                        // add the flag
	                        tmp += "<div class='iti__flag-box'><div class='iti__flag iti__".concat(c.iso2, "'></div></div>");
	                        // and the country name and dial code
	                        tmp += "<span class='iti__country-name'>".concat(c.name, "</span>");
	                        tmp += "<span class='iti__dial-code'>+".concat(c.dialCode, "</span>");
	                        // close the list item
	                        tmp += "</li>";
	                    }
	                    this.countryList.insertAdjacentHTML("beforeend", tmp);
	                }
	            }, {
	                key: "_setInitialState",
	                value: function _setInitialState() {
	                    var val = this.telInput.value;
	                    var dialCode = this._getDialCode(val);
	                    var isRegionlessNanp = this._isRegionlessNanp(val);
	                    var _this$options = this.options, initialCountry = _this$options.initialCountry, nationalMode = _this$options.nationalMode, autoHideDialCode = _this$options.autoHideDialCode, separateDialCode = _this$options.separateDialCode;
	                    // if we already have a dial code, and it's not a regionlessNanp, we can go ahead and set the
	                    // flag, else fall back to the default country
	                    if (dialCode && !isRegionlessNanp) {
	                        this._updateFlagFromNumber(val);
	                    } else if (initialCountry !== "auto") {
	                        // see if we should select a flag
	                        if (initialCountry) {
	                            this._setFlag(initialCountry.toLowerCase());
	                        } else {
	                            if (dialCode && isRegionlessNanp) {
	                                // has intl dial code, is regionless nanp, and no initialCountry, so default to US
	                                this._setFlag("us");
	                            } else {
	                                // no dial code and no initialCountry, so default to first in list
	                                this.defaultCountry = this.preferredCountries.length ? this.preferredCountries[0].iso2 : this.countries[0].iso2;
	                                if (!val) {
	                                    this._setFlag(this.defaultCountry);
	                                }
	                            }
	                        }
	                        // if empty and no nationalMode and no autoHideDialCode then insert the default dial code
	                        if (!val && !nationalMode && !autoHideDialCode && !separateDialCode) {
	                            this.telInput.value = "+".concat(this.selectedCountryData.dialCode);
	                        }
	                    }
	                    // NOTE: if initialCountry is set to auto, that will be handled separately
	                    // format - note this wont be run after _updateDialCode as that's only called if no val
	                    if (val) this._updateValFromNumber(val);
	                }
	            }, {
	                key: "_initListeners",
	                value: function _initListeners() {
	                    this._initKeyListeners();
	                    if (this.options.autoHideDialCode) this._initBlurListeners();
	                    if (this.options.allowDropdown) this._initDropdownListeners();
	                    if (this.hiddenInput) this._initHiddenInputListener();
	                }
	            }, {
	                key: "_initHiddenInputListener",
	                value: function _initHiddenInputListener() {
	                    var _this3 = this;
	                    this._handleHiddenInputSubmit = function() {
	                        _this3.hiddenInput.value = _this3.getNumber();
	                    };
	                    if (this.telInput.form) this.telInput.form.addEventListener("submit", this._handleHiddenInputSubmit);
	                }
	            }, {
	                key: "_getClosestLabel",
	                value: function _getClosestLabel() {
	                    var el = this.telInput;
	                    while (el && el.tagName !== "LABEL") {
	                        el = el.parentNode;
	                    }
	                    return el;
	                }
	            }, {
	                key: "_initDropdownListeners",
	                value: function _initDropdownListeners() {
	                    var _this4 = this;
	                    // hack for input nested inside label (which is valid markup): clicking the selected-flag to
	                    // open the dropdown would then automatically trigger a 2nd click on the input which would
	                    // close it again
	                    this._handleLabelClick = function(e) {
	                        // if the dropdown is closed, then focus the input, else ignore the click
	                        if (_this4.countryList.classList.contains("iti__hide")) _this4.telInput.focus(); else e.preventDefault();
	                    };
	                    var label = this._getClosestLabel();
	                    if (label) label.addEventListener("click", this._handleLabelClick);
	                    // toggle country dropdown on click
	                    this._handleClickSelectedFlag = function() {
	                        // only intercept this event if we're opening the dropdown
	                        // else let it bubble up to the top ("click-off-to-close" listener)
	                        // we cannot just stopPropagation as it may be needed to close another instance
	                        if (_this4.countryList.classList.contains("iti__hide") && !_this4.telInput.disabled && !_this4.telInput.readOnly) {
	                            _this4._showDropdown();
	                        }
	                    };
	                    this.selectedFlag.addEventListener("click", this._handleClickSelectedFlag);
	                    // open dropdown list if currently focused
	                    this._handleFlagsContainerKeydown = function(e) {
	                        var isDropdownHidden = _this4.countryList.classList.contains("iti__hide");
	                        if (isDropdownHidden && [ "ArrowUp", "Up", "ArrowDown", "Down", " ", "Enter" ].indexOf(e.key) !== -1) {
	                            // prevent form from being submitted if "ENTER" was pressed
	                            e.preventDefault();
	                            // prevent event from being handled again by document
	                            e.stopPropagation();
	                            _this4._showDropdown();
	                        }
	                        // allow navigation from dropdown to input on TAB
	                        if (e.key === "Tab") _this4._closeDropdown();
	                    };
	                    this.flagsContainer.addEventListener("keydown", this._handleFlagsContainerKeydown);
	                }
	            }, {
	                key: "_initRequests",
	                value: function _initRequests() {
	                    var _this5 = this;
	                    // if the user has specified the path to the utils script, fetch it on window.load, else resolve
	                    if (this.options.utilsScript && !window.intlTelInputUtils) {
	                        // if the plugin is being initialised after the window.load event has already been fired
	                        if (window.intlTelInputGlobals.windowLoaded) {
	                            window.intlTelInputGlobals.loadUtils(this.options.utilsScript);
	                        } else {
	                            // wait until the load event so we don't block any other requests e.g. the flags image
	                            window.addEventListener("load", function() {
	                                window.intlTelInputGlobals.loadUtils(_this5.options.utilsScript);
	                            });
	                        }
	                    } else this.resolveUtilsScriptPromise();
	                    if (this.options.initialCountry === "auto") this._loadAutoCountry(); else this.resolveAutoCountryPromise();
	                }
	            }, {
	                key: "_loadAutoCountry",
	                value: function _loadAutoCountry() {
	                    // 3 options:
	                    // 1) already loaded (we're done)
	                    // 2) not already started loading (start)
	                    // 3) already started loading (do nothing - just wait for loading callback to fire)
	                    if (window.intlTelInputGlobals.autoCountry) {
	                        this.handleAutoCountry();
	                    } else if (!window.intlTelInputGlobals.startedLoadingAutoCountry) {
	                        // don't do this twice!
	                        window.intlTelInputGlobals.startedLoadingAutoCountry = true;
	                        if (typeof this.options.geoIpLookup === "function") {
	                            this.options.geoIpLookup(function(countryCode) {
	                                window.intlTelInputGlobals.autoCountry = countryCode.toLowerCase();
	                                // tell all instances the auto country is ready
	                                // TODO: this should just be the current instances
	                                // UPDATE: use setTimeout in case their geoIpLookup function calls this callback straight
	                                // away (e.g. if they have already done the geo ip lookup somewhere else). Using
	                                // setTimeout means that the current thread of execution will finish before executing
	                                // this, which allows the plugin to finish initialising.
	                                setTimeout(function() {
	                                    return forEachInstance("handleAutoCountry");
	                                });
	                            }, function() {
	                                return forEachInstance("rejectAutoCountryPromise");
	                            });
	                        }
	                    }
	                }
	            }, {
	                key: "_initKeyListeners",
	                value: function _initKeyListeners() {
	                    var _this6 = this;
	                    // update flag on keyup
	                    this._handleKeyupEvent = function() {
	                        if (_this6._updateFlagFromNumber(_this6.telInput.value)) {
	                            _this6._triggerCountryChange();
	                        }
	                    };
	                    this.telInput.addEventListener("keyup", this._handleKeyupEvent);
	                    // update flag on cut/paste events (now supported in all major browsers)
	                    this._handleClipboardEvent = function() {
	                        // hack because "paste" event is fired before input is updated
	                        setTimeout(_this6._handleKeyupEvent);
	                    };
	                    this.telInput.addEventListener("cut", this._handleClipboardEvent);
	                    this.telInput.addEventListener("paste", this._handleClipboardEvent);
	                }
	            }, {
	                key: "_cap",
	                value: function _cap(number) {
	                    var max = this.telInput.getAttribute("maxlength");
	                    return max && number.length > max ? number.substr(0, max) : number;
	                }
	            }, {
	                key: "_initBlurListeners",
	                value: function _initBlurListeners() {
	                    var _this7 = this;
	                    // on blur or form submit: if just a dial code then remove it
	                    this._handleSubmitOrBlurEvent = function() {
	                        _this7._removeEmptyDialCode();
	                    };
	                    if (this.telInput.form) this.telInput.form.addEventListener("submit", this._handleSubmitOrBlurEvent);
	                    this.telInput.addEventListener("blur", this._handleSubmitOrBlurEvent);
	                }
	            }, {
	                key: "_removeEmptyDialCode",
	                value: function _removeEmptyDialCode() {
	                    if (this.telInput.value.charAt(0) === "+") {
	                        var numeric = this._getNumeric(this.telInput.value);
	                        // if just a plus, or if just a dial code
	                        if (!numeric || this.selectedCountryData.dialCode === numeric) {
	                            this.telInput.value = "";
	                        }
	                    }
	                }
	            }, {
	                key: "_getNumeric",
	                value: function _getNumeric(s) {
	                    return s.replace(/\D/g, "");
	                }
	            }, {
	                key: "_trigger",
	                value: function _trigger(name) {
	                    // have to use old school document.createEvent as IE11 doesn't support `new Event()` syntax
	                    var e = document.createEvent("Event");
	                    e.initEvent(name, true, true);
	                    // can bubble, and is cancellable
	                    this.telInput.dispatchEvent(e);
	                }
	            }, {
	                key: "_showDropdown",
	                value: function _showDropdown() {
	                    this.countryList.classList.remove("iti__hide");
	                    this.selectedFlag.setAttribute("aria-expanded", "true");
	                    this._setDropdownPosition();
	                    // update highlighting and scroll to active list item
	                    if (this.activeItem) {
	                        this._highlightListItem(this.activeItem, false);
	                        this._scrollTo(this.activeItem, true);
	                    }
	                    // bind all the dropdown-related listeners: mouseover, click, click-off, keydown
	                    this._bindDropdownListeners();
	                    // update the arrow
	                    this.dropdownArrow.classList.add("iti__arrow--up");
	                    this._trigger("open:countrydropdown");
	                }
	            }, {
	                key: "_toggleClass",
	                value: function _toggleClass(el, className, shouldHaveClass) {
	                    if (shouldHaveClass && !el.classList.contains(className)) el.classList.add(className); else if (!shouldHaveClass && el.classList.contains(className)) el.classList.remove(className);
	                }
	            }, {
	                key: "_setDropdownPosition",
	                value: function _setDropdownPosition() {
	                    var _this8 = this;
	                    if (this.options.dropdownContainer) {
	                        this.options.dropdownContainer.appendChild(this.dropdown);
	                    }
	                    if (!this.isMobile) {
	                        var pos = this.telInput.getBoundingClientRect();
	                        // windowTop from https://stackoverflow.com/a/14384091/217866
	                        var windowTop = window.pageYOffset || document.documentElement.scrollTop;
	                        var inputTop = pos.top + windowTop;
	                        var dropdownHeight = this.countryList.offsetHeight;
	                        // dropdownFitsBelow = (dropdownBottom < windowBottom)
	                        var dropdownFitsBelow = inputTop + this.telInput.offsetHeight + dropdownHeight < windowTop + window.innerHeight;
	                        var dropdownFitsAbove = inputTop - dropdownHeight > windowTop;
	                        // by default, the dropdown will be below the input. If we want to position it above the
	                        // input, we add the dropup class.
	                        this._toggleClass(this.countryList, "iti__country-list--dropup", !dropdownFitsBelow && dropdownFitsAbove);
	                        // if dropdownContainer is enabled, calculate postion
	                        if (this.options.dropdownContainer) {
	                            // by default the dropdown will be directly over the input because it's not in the flow.
	                            // If we want to position it below, we need to add some extra top value.
	                            var extraTop = !dropdownFitsBelow && dropdownFitsAbove ? 0 : this.telInput.offsetHeight;
	                            // calculate placement
	                            this.dropdown.style.top = "".concat(inputTop + extraTop, "px");
	                            this.dropdown.style.left = "".concat(pos.left + document.body.scrollLeft, "px");
	                            // close menu on window scroll
	                            this._handleWindowScroll = function() {
	                                return _this8._closeDropdown();
	                            };
	                            window.addEventListener("scroll", this._handleWindowScroll);
	                        }
	                    }
	                }
	            }, {
	                key: "_getClosestListItem",
	                value: function _getClosestListItem(target) {
	                    var el = target;
	                    while (el && el !== this.countryList && !el.classList.contains("iti__country")) {
	                        el = el.parentNode;
	                    }
	                    // if we reached the countryList element, then return null
	                    return el === this.countryList ? null : el;
	                }
	            }, {
	                key: "_bindDropdownListeners",
	                value: function _bindDropdownListeners() {
	                    var _this9 = this;
	                    // when mouse over a list item, just highlight that one
	                    // we add the class "highlight", so if they hit "enter" we know which one to select
	                    this._handleMouseoverCountryList = function(e) {
	                        // handle event delegation, as we're listening for this event on the countryList
	                        var listItem = _this9._getClosestListItem(e.target);
	                        if (listItem) _this9._highlightListItem(listItem, false);
	                    };
	                    this.countryList.addEventListener("mouseover", this._handleMouseoverCountryList);
	                    // listen for country selection
	                    this._handleClickCountryList = function(e) {
	                        var listItem = _this9._getClosestListItem(e.target);
	                        if (listItem) _this9._selectListItem(listItem);
	                    };
	                    this.countryList.addEventListener("click", this._handleClickCountryList);
	                    // click off to close
	                    // (except when this initial opening click is bubbling up)
	                    // we cannot just stopPropagation as it may be needed to close another instance
	                    var isOpening = true;
	                    this._handleClickOffToClose = function() {
	                        if (!isOpening) _this9._closeDropdown();
	                        isOpening = false;
	                    };
	                    document.documentElement.addEventListener("click", this._handleClickOffToClose);
	                    // listen for up/down scrolling, enter to select, or letters to jump to country name.
	                    // use keydown as keypress doesn't fire for non-char keys and we want to catch if they
	                    // just hit down and hold it to scroll down (no keyup event).
	                    // listen on the document because that's where key events are triggered if no input has focus
	                    var query = "";
	                    var queryTimer = null;
	                    this._handleKeydownOnDropdown = function(e) {
	                        // prevent down key from scrolling the whole page,
	                        // and enter key from submitting a form etc
	                        e.preventDefault();
	                        // up and down to navigate
	                        if (e.key === "ArrowUp" || e.key === "Up" || e.key === "ArrowDown" || e.key === "Down") _this9._handleUpDownKey(e.key); else if (e.key === "Enter") _this9._handleEnterKey(); else if (e.key === "Escape") _this9._closeDropdown(); else if (/^[a-zA-ZÀ-ÿа-яА-Я ]$/.test(e.key)) {
	                            // jump to countries that start with the query string
	                            if (queryTimer) clearTimeout(queryTimer);
	                            query += e.key.toLowerCase();
	                            _this9._searchForCountry(query);
	                            // if the timer hits 1 second, reset the query
	                            queryTimer = setTimeout(function() {
	                                query = "";
	                            }, 1e3);
	                        }
	                    };
	                    document.addEventListener("keydown", this._handleKeydownOnDropdown);
	                }
	            }, {
	                key: "_handleUpDownKey",
	                value: function _handleUpDownKey(key) {
	                    var next = key === "ArrowUp" || key === "Up" ? this.highlightedItem.previousElementSibling : this.highlightedItem.nextElementSibling;
	                    if (next) {
	                        // skip the divider
	                        if (next.classList.contains("iti__divider")) {
	                            next = key === "ArrowUp" || key === "Up" ? next.previousElementSibling : next.nextElementSibling;
	                        }
	                        this._highlightListItem(next, true);
	                    }
	                }
	            }, {
	                key: "_handleEnterKey",
	                value: function _handleEnterKey() {
	                    if (this.highlightedItem) this._selectListItem(this.highlightedItem);
	                }
	            }, {
	                key: "_searchForCountry",
	                value: function _searchForCountry(query) {
	                    for (var i = 0; i < this.countries.length; i++) {
	                        if (this._startsWith(this.countries[i].name, query)) {
	                            var listItem = this.countryList.querySelector("#iti-".concat(this.id, "__item-").concat(this.countries[i].iso2));
	                            // update highlighting and scroll
	                            this._highlightListItem(listItem, false);
	                            this._scrollTo(listItem, true);
	                            break;
	                        }
	                    }
	                }
	            }, {
	                key: "_startsWith",
	                value: function _startsWith(a, b) {
	                    return a.substr(0, b.length).toLowerCase() === b;
	                }
	            }, {
	                key: "_updateValFromNumber",
	                value: function _updateValFromNumber(originalNumber) {
	                    var number = originalNumber;
	                    if (this.options.formatOnDisplay && window.intlTelInputUtils && this.selectedCountryData) {
	                        var useNational = !this.options.separateDialCode && (this.options.nationalMode || number.charAt(0) !== "+");
	                        var _intlTelInputUtils$nu = intlTelInputUtils.numberFormat, NATIONAL = _intlTelInputUtils$nu.NATIONAL, INTERNATIONAL = _intlTelInputUtils$nu.INTERNATIONAL;
	                        var format = useNational ? NATIONAL : INTERNATIONAL;
	                        number = intlTelInputUtils.formatNumber(number, this.selectedCountryData.iso2, format);
	                    }
	                    number = this._beforeSetNumber(number);
	                    this.telInput.value = number;
	                }
	            }, {
	                key: "_updateFlagFromNumber",
	                value: function _updateFlagFromNumber(originalNumber) {
	                    // if we're in nationalMode and we already have US/Canada selected, make sure the number starts
	                    // with a +1 so _getDialCode will be able to extract the area code
	                    // update: if we dont yet have selectedCountryData, but we're here (trying to update the flag
	                    // from the number), that means we're initialising the plugin with a number that already has a
	                    // dial code, so fine to ignore this bit
	                    var number = originalNumber;
	                    var selectedDialCode = this.selectedCountryData.dialCode;
	                    var isNanp = selectedDialCode === "1";
	                    if (number && this.options.nationalMode && isNanp && number.charAt(0) !== "+") {
	                        if (number.charAt(0) !== "1") number = "1".concat(number);
	                        number = "+".concat(number);
	                    }
	                    // update flag if user types area code for another country
	                    if (this.options.separateDialCode && selectedDialCode && number.charAt(0) !== "+") {
	                        number = "+".concat(selectedDialCode).concat(number);
	                    }
	                    // try and extract valid dial code from input
	                    var dialCode = this._getDialCode(number);
	                    var numeric = this._getNumeric(number);
	                    var countryCode = null;
	                    if (dialCode) {
	                        var countryCodes = this.countryCodes[this._getNumeric(dialCode)];
	                        // check if the right country is already selected. this should be false if the number is
	                        // longer than the matched dial code because in this case we need to make sure that if
	                        // there are multiple country matches, that the first one is selected (note: we could
	                        // just check that here, but it requires the same loop that we already have later)
	                        var alreadySelected = countryCodes.indexOf(this.selectedCountryData.iso2) !== -1 && numeric.length <= dialCode.length - 1;
	                        var isRegionlessNanpNumber = selectedDialCode === "1" && this._isRegionlessNanp(numeric);
	                        // only update the flag if:
	                        // A) NOT (we currently have a NANP flag selected, and the number is a regionlessNanp)
	                        // AND
	                        // B) the right country is not already selected
	                        if (!isRegionlessNanpNumber && !alreadySelected) {
	                            // if using onlyCountries option, countryCodes[0] may be empty, so we must find the first
	                            // non-empty index
	                            for (var j = 0; j < countryCodes.length; j++) {
	                                if (countryCodes[j]) {
	                                    countryCode = countryCodes[j];
	                                    break;
	                                }
	                            }
	                        }
	                    } else if (number.charAt(0) === "+" && numeric.length) {
	                        // invalid dial code, so empty
	                        // Note: use getNumeric here because the number has not been formatted yet, so could contain
	                        // bad chars
	                        countryCode = "";
	                    } else if (!number || number === "+") {
	                        // empty, or just a plus, so default
	                        countryCode = this.defaultCountry;
	                    }
	                    if (countryCode !== null) {
	                        return this._setFlag(countryCode);
	                    }
	                    return false;
	                }
	            }, {
	                key: "_isRegionlessNanp",
	                value: function _isRegionlessNanp(number) {
	                    var numeric = this._getNumeric(number);
	                    if (numeric.charAt(0) === "1") {
	                        var areaCode = numeric.substr(1, 3);
	                        return regionlessNanpNumbers.indexOf(areaCode) !== -1;
	                    }
	                    return false;
	                }
	            }, {
	                key: "_highlightListItem",
	                value: function _highlightListItem(listItem, shouldFocus) {
	                    var prevItem = this.highlightedItem;
	                    if (prevItem) prevItem.classList.remove("iti__highlight");
	                    this.highlightedItem = listItem;
	                    this.highlightedItem.classList.add("iti__highlight");
	                    if (shouldFocus) this.highlightedItem.focus();
	                }
	            }, {
	                key: "_getCountryData",
	                value: function _getCountryData(countryCode, ignoreOnlyCountriesOption, allowFail) {
	                    var countryList = ignoreOnlyCountriesOption ? allCountries : this.countries;
	                    for (var i = 0; i < countryList.length; i++) {
	                        if (countryList[i].iso2 === countryCode) {
	                            return countryList[i];
	                        }
	                    }
	                    if (allowFail) {
	                        return null;
	                    }
	                    throw new Error("No country data for '".concat(countryCode, "'"));
	                }
	            }, {
	                key: "_setFlag",
	                value: function _setFlag(countryCode) {
	                    var prevCountry = this.selectedCountryData.iso2 ? this.selectedCountryData : {};
	                    // do this first as it will throw an error and stop if countryCode is invalid
	                    this.selectedCountryData = countryCode ? this._getCountryData(countryCode, false, false) : {};
	                    // update the defaultCountry - we only need the iso2 from now on, so just store that
	                    if (this.selectedCountryData.iso2) {
	                        this.defaultCountry = this.selectedCountryData.iso2;
	                    }
	                    this.selectedFlagInner.setAttribute("class", "iti__flag iti__".concat(countryCode));
	                    // update the selected country's title attribute
	                    var title = countryCode ? "".concat(this.selectedCountryData.name, ": +").concat(this.selectedCountryData.dialCode) : "Unknown";
	                    this.selectedFlag.setAttribute("title", title);
	                    if (this.options.separateDialCode) {
	                        var dialCode = this.selectedCountryData.dialCode ? "+".concat(this.selectedCountryData.dialCode) : "";
	                        this.selectedDialCode.innerHTML = dialCode;
	                        // offsetWidth is zero if input is in a hidden container during initialisation
	                        var selectedFlagWidth = this.selectedFlag.offsetWidth || this._getHiddenSelectedFlagWidth();
	                        // add 6px of padding after the grey selected-dial-code box, as this is what we use in the css
	                        this.telInput.style.paddingLeft = "".concat(selectedFlagWidth + 6, "px");
	                    }
	                    // and the input's placeholder
	                    this._updatePlaceholder();
	                    // update the active list item
	                    if (this.options.allowDropdown) {
	                        var prevItem = this.activeItem;
	                        if (prevItem) {
	                            prevItem.classList.remove("iti__active");
	                            prevItem.setAttribute("aria-selected", "false");
	                        }
	                        if (countryCode) {
	                            // check if there is a preferred item first, else fall back to standard
	                            var nextItem = this.countryList.querySelector("#iti-".concat(this.id, "__item-").concat(countryCode, "-preferred")) || this.countryList.querySelector("#iti-".concat(this.id, "__item-").concat(countryCode));
	                            nextItem.setAttribute("aria-selected", "true");
	                            nextItem.classList.add("iti__active");
	                            this.activeItem = nextItem;
	                            this.selectedFlag.setAttribute("aria-activedescendant", nextItem.getAttribute("id"));
	                        }
	                    }
	                    // return if the flag has changed or not
	                    return prevCountry.iso2 !== countryCode;
	                }
	            }, {
	                key: "_getHiddenSelectedFlagWidth",
	                value: function _getHiddenSelectedFlagWidth() {
	                    // to get the right styling to apply, all we need is a shallow clone of the container,
	                    // and then to inject a deep clone of the selectedFlag element
	                    var containerClone = this.telInput.parentNode.cloneNode();
	                    containerClone.style.visibility = "hidden";
	                    document.body.appendChild(containerClone);
	                    var selectedFlagClone = this.selectedFlag.cloneNode(true);
	                    containerClone.appendChild(selectedFlagClone);
	                    var width = selectedFlagClone.offsetWidth;
	                    containerClone.parentNode.removeChild(containerClone);
	                    return width;
	                }
	            }, {
	                key: "_updatePlaceholder",
	                value: function _updatePlaceholder() {
	                    var shouldSetPlaceholder = this.options.autoPlaceholder === "aggressive" || !this.hadInitialPlaceholder && this.options.autoPlaceholder === "polite";
	                    if (window.intlTelInputUtils && shouldSetPlaceholder) {
	                        var numberType = intlTelInputUtils.numberType[this.options.placeholderNumberType];
	                        var placeholder = this.selectedCountryData.iso2 ? intlTelInputUtils.getExampleNumber(this.selectedCountryData.iso2, this.options.nationalMode, numberType) : "";
	                        placeholder = this._beforeSetNumber(placeholder);
	                        if (typeof this.options.customPlaceholder === "function") {
	                            placeholder = this.options.customPlaceholder(placeholder, this.selectedCountryData);
	                        }
	                        this.telInput.setAttribute("placeholder", placeholder);
	                    }
	                }
	            }, {
	                key: "_selectListItem",
	                value: function _selectListItem(listItem) {
	                    // update selected flag and active list item
	                    var flagChanged = this._setFlag(listItem.getAttribute("data-country-code"));
	                    this._closeDropdown();
	                    this._updateDialCode(listItem.getAttribute("data-dial-code"), true);
	                    // focus the input
	                    this.telInput.focus();
	                    // put cursor at end - this fix is required for FF and IE11 (with nationalMode=false i.e. auto
	                    // inserting dial code), who try to put the cursor at the beginning the first time
	                    var len = this.telInput.value.length;
	                    this.telInput.setSelectionRange(len, len);
	                    if (flagChanged) {
	                        this._triggerCountryChange();
	                    }
	                }
	            }, {
	                key: "_closeDropdown",
	                value: function _closeDropdown() {
	                    this.countryList.classList.add("iti__hide");
	                    this.selectedFlag.setAttribute("aria-expanded", "false");
	                    // update the arrow
	                    this.dropdownArrow.classList.remove("iti__arrow--up");
	                    // unbind key events
	                    document.removeEventListener("keydown", this._handleKeydownOnDropdown);
	                    document.documentElement.removeEventListener("click", this._handleClickOffToClose);
	                    this.countryList.removeEventListener("mouseover", this._handleMouseoverCountryList);
	                    this.countryList.removeEventListener("click", this._handleClickCountryList);
	                    // remove menu from container
	                    if (this.options.dropdownContainer) {
	                        if (!this.isMobile) window.removeEventListener("scroll", this._handleWindowScroll);
	                        if (this.dropdown.parentNode) this.dropdown.parentNode.removeChild(this.dropdown);
	                    }
	                    this._trigger("close:countrydropdown");
	                }
	            }, {
	                key: "_scrollTo",
	                value: function _scrollTo(element, middle) {
	                    var container = this.countryList;
	                    // windowTop from https://stackoverflow.com/a/14384091/217866
	                    var windowTop = window.pageYOffset || document.documentElement.scrollTop;
	                    var containerHeight = container.offsetHeight;
	                    var containerTop = container.getBoundingClientRect().top + windowTop;
	                    var containerBottom = containerTop + containerHeight;
	                    var elementHeight = element.offsetHeight;
	                    var elementTop = element.getBoundingClientRect().top + windowTop;
	                    var elementBottom = elementTop + elementHeight;
	                    var newScrollTop = elementTop - containerTop + container.scrollTop;
	                    var middleOffset = containerHeight / 2 - elementHeight / 2;
	                    if (elementTop < containerTop) {
	                        // scroll up
	                        if (middle) newScrollTop -= middleOffset;
	                        container.scrollTop = newScrollTop;
	                    } else if (elementBottom > containerBottom) {
	                        // scroll down
	                        if (middle) newScrollTop += middleOffset;
	                        var heightDifference = containerHeight - elementHeight;
	                        container.scrollTop = newScrollTop - heightDifference;
	                    }
	                }
	            }, {
	                key: "_updateDialCode",
	                value: function _updateDialCode(newDialCodeBare, hasSelectedListItem) {
	                    var inputVal = this.telInput.value;
	                    // save having to pass this every time
	                    var newDialCode = "+".concat(newDialCodeBare);
	                    var newNumber;
	                    if (inputVal.charAt(0) === "+") {
	                        // there's a plus so we're dealing with a replacement (doesn't matter if nationalMode or not)
	                        var prevDialCode = this._getDialCode(inputVal);
	                        if (prevDialCode) {
	                            // current number contains a valid dial code, so replace it
	                            newNumber = inputVal.replace(prevDialCode, newDialCode);
	                        } else {
	                            // current number contains an invalid dial code, so ditch it
	                            // (no way to determine where the invalid dial code ends and the rest of the number begins)
	                            newNumber = newDialCode;
	                        }
	                    } else if (this.options.nationalMode || this.options.separateDialCode) {
	                        // don't do anything
	                        return;
	                    } else {
	                        // nationalMode is disabled
	                        if (inputVal) {
	                            // there is an existing value with no dial code: prefix the new dial code
	                            newNumber = newDialCode + inputVal;
	                        } else if (hasSelectedListItem || !this.options.autoHideDialCode) {
	                            // no existing value and either they've just selected a list item, or autoHideDialCode is
	                            // disabled: insert new dial code
	                            newNumber = newDialCode;
	                        } else {
	                            return;
	                        }
	                    }
	                    this.telInput.value = newNumber;
	                }
	            }, {
	                key: "_getDialCode",
	                value: function _getDialCode(number) {
	                    var dialCode = "";
	                    // only interested in international numbers (starting with a plus)
	                    if (number.charAt(0) === "+") {
	                        var numericChars = "";
	                        // iterate over chars
	                        for (var i = 0; i < number.length; i++) {
	                            var c = number.charAt(i);
	                            // if char is number (https://stackoverflow.com/a/8935649/217866)
	                            if (!isNaN(parseInt(c, 10))) {
	                                numericChars += c;
	                                // if current numericChars make a valid dial code
	                                if (this.countryCodes[numericChars]) {
	                                    // store the actual raw string (useful for matching later)
	                                    dialCode = number.substr(0, i + 1);
	                                }
	                                if (numericChars.length === this.dialCodeMaxLen) {
	                                    break;
	                                }
	                            }
	                        }
	                    }
	                    return dialCode;
	                }
	            }, {
	                key: "_getFullNumber",
	                value: function _getFullNumber() {
	                    var val = this.telInput.value.trim();
	                    var dialCode = this.selectedCountryData.dialCode;
	                    var prefix;
	                    var numericVal = this._getNumeric(val);
	                    if (this.options.separateDialCode && val.charAt(0) !== "+" && dialCode && numericVal) {
	                        // when using separateDialCode, it is visible so is effectively part of the typed number
	                        prefix = "+".concat(dialCode);
	                    } else {
	                        prefix = "";
	                    }
	                    return prefix + val;
	                }
	            }, {
	                key: "_beforeSetNumber",
	                value: function _beforeSetNumber(originalNumber) {
	                    var number = originalNumber;
	                    if (this.options.separateDialCode) {
	                        var dialCode = this._getDialCode(number);
	                        // if there is a valid dial code
	                        if (dialCode) {
	                            // in case _getDialCode returned an area code as well
	                            dialCode = "+".concat(this.selectedCountryData.dialCode);
	                            // a lot of numbers will have a space separating the dial code and the main number, and
	                            // some NANP numbers will have a hyphen e.g. +1 684-733-1234 - in both cases we want to get
	                            // rid of it
	                            // NOTE: don't just trim all non-numerics as may want to preserve an open parenthesis etc
	                            var start = number[dialCode.length] === " " || number[dialCode.length] === "-" ? dialCode.length + 1 : dialCode.length;
	                            number = number.substr(start);
	                        }
	                    }
	                    return this._cap(number);
	                }
	            }, {
	                key: "_triggerCountryChange",
	                value: function _triggerCountryChange() {
	                    this._trigger("countrychange");
	                }
	            }, {
	                key: "handleAutoCountry",
	                value: function handleAutoCountry() {
	                    if (this.options.initialCountry === "auto") {
	                        // we must set this even if there is an initial val in the input: in case the initial val is
	                        // invalid and they delete it - they should see their auto country
	                        this.defaultCountry = window.intlTelInputGlobals.autoCountry;
	                        // if there's no initial value in the input, then update the flag
	                        if (!this.telInput.value) {
	                            this.setCountry(this.defaultCountry);
	                        }
	                        this.resolveAutoCountryPromise();
	                    }
	                }
	            }, {
	                key: "handleUtils",
	                value: function handleUtils() {
	                    // if the request was successful
	                    if (window.intlTelInputUtils) {
	                        // if there's an initial value in the input, then format it
	                        if (this.telInput.value) {
	                            this._updateValFromNumber(this.telInput.value);
	                        }
	                        this._updatePlaceholder();
	                    }
	                    this.resolveUtilsScriptPromise();
	                }
	            }, {
	                key: "destroy",
	                value: function destroy() {
	                    var form = this.telInput.form;
	                    if (this.options.allowDropdown) {
	                        // make sure the dropdown is closed (and unbind listeners)
	                        this._closeDropdown();
	                        this.selectedFlag.removeEventListener("click", this._handleClickSelectedFlag);
	                        this.flagsContainer.removeEventListener("keydown", this._handleFlagsContainerKeydown);
	                        // label click hack
	                        var label = this._getClosestLabel();
	                        if (label) label.removeEventListener("click", this._handleLabelClick);
	                    }
	                    // unbind hiddenInput listeners
	                    if (this.hiddenInput && form) form.removeEventListener("submit", this._handleHiddenInputSubmit);
	                    // unbind autoHideDialCode listeners
	                    if (this.options.autoHideDialCode) {
	                        if (form) form.removeEventListener("submit", this._handleSubmitOrBlurEvent);
	                        this.telInput.removeEventListener("blur", this._handleSubmitOrBlurEvent);
	                    }
	                    // unbind key events, and cut/paste events
	                    this.telInput.removeEventListener("keyup", this._handleKeyupEvent);
	                    this.telInput.removeEventListener("cut", this._handleClipboardEvent);
	                    this.telInput.removeEventListener("paste", this._handleClipboardEvent);
	                    // remove attribute of id instance: data-intl-tel-input-id
	                    this.telInput.removeAttribute("data-intl-tel-input-id");
	                    // remove markup (but leave the original input)
	                    var wrapper = this.telInput.parentNode;
	                    wrapper.parentNode.insertBefore(this.telInput, wrapper);
	                    wrapper.parentNode.removeChild(wrapper);
	                    delete window.intlTelInputGlobals.instances[this.id];
	                }
	            }, {
	                key: "getExtension",
	                value: function getExtension() {
	                    if (window.intlTelInputUtils) {
	                        return intlTelInputUtils.getExtension(this._getFullNumber(), this.selectedCountryData.iso2);
	                    }
	                    return "";
	                }
	            }, {
	                key: "getNumber",
	                value: function getNumber(format) {
	                    if (window.intlTelInputUtils) {
	                        var iso2 = this.selectedCountryData.iso2;
	                        return intlTelInputUtils.formatNumber(this._getFullNumber(), iso2, format);
	                    }
	                    return "";
	                }
	            }, {
	                key: "getNumberType",
	                value: function getNumberType() {
	                    if (window.intlTelInputUtils) {
	                        return intlTelInputUtils.getNumberType(this._getFullNumber(), this.selectedCountryData.iso2);
	                    }
	                    return -99;
	                }
	            }, {
	                key: "getSelectedCountryData",
	                value: function getSelectedCountryData() {
	                    return this.selectedCountryData;
	                }
	            }, {
	                key: "getValidationError",
	                value: function getValidationError() {
	                    if (window.intlTelInputUtils) {
	                        var iso2 = this.selectedCountryData.iso2;
	                        return intlTelInputUtils.getValidationError(this._getFullNumber(), iso2);
	                    }
	                    return -99;
	                }
	            }, {
	                key: "isValidNumber",
	                value: function isValidNumber() {
	                    var val = this._getFullNumber().trim();
	                    var countryCode = this.options.nationalMode ? this.selectedCountryData.iso2 : "";
	                    return window.intlTelInputUtils ? intlTelInputUtils.isValidNumber(val, countryCode) : null;
	                }
	            }, {
	                key: "setCountry",
	                value: function setCountry(originalCountryCode) {
	                    var countryCode = originalCountryCode.toLowerCase();
	                    // check if already selected
	                    if (!this.selectedFlagInner.classList.contains("iti__".concat(countryCode))) {
	                        this._setFlag(countryCode);
	                        this._updateDialCode(this.selectedCountryData.dialCode, false);
	                        this._triggerCountryChange();
	                    }
	                }
	            }, {
	                key: "setNumber",
	                value: function setNumber(number) {
	                    // we must update the flag first, which updates this.selectedCountryData, which is used for
	                    // formatting the number before displaying it
	                    var flagChanged = this._updateFlagFromNumber(number);
	                    this._updateValFromNumber(number);
	                    if (flagChanged) {
	                        this._triggerCountryChange();
	                    }
	                }
	            }, {
	                key: "setPlaceholderNumberType",
	                value: function setPlaceholderNumberType(type) {
	                    this.options.placeholderNumberType = type;
	                    this._updatePlaceholder();
	                }
	            } ]);
	            return Iti;
	        }();
	        /********************
	 *  STATIC METHODS
	 ********************/
	        // get the country data object
	        intlTelInputGlobals.getCountryData = function() {
	            return allCountries;
	        };
	        // inject a <script> element to load utils.js
	        var injectScript = function injectScript(path, handleSuccess, handleFailure) {
	            // inject a new script element into the page
	            var script = document.createElement("script");
	            script.onload = function() {
	                forEachInstance("handleUtils");
	                if (handleSuccess) handleSuccess();
	            };
	            script.onerror = function() {
	                forEachInstance("rejectUtilsScriptPromise");
	                if (handleFailure) handleFailure();
	            };
	            script.className = "iti-load-utils";
	            script.async = true;
	            script.src = path;
	            document.body.appendChild(script);
	        };
	        // load the utils script
	        intlTelInputGlobals.loadUtils = function(path) {
	            // 2 options:
	            // 1) not already started loading (start)
	            // 2) already started loading (do nothing - just wait for the onload callback to fire, which will
	            // trigger handleUtils on all instances, invoking their resolveUtilsScriptPromise functions)
	            if (!window.intlTelInputUtils && !window.intlTelInputGlobals.startedLoadingUtilsScript) {
	                // only do this once
	                window.intlTelInputGlobals.startedLoadingUtilsScript = true;
	                // if we have promises, then return a promise
	                if (typeof Promise !== "undefined") {
	                    return new Promise(function(resolve, reject) {
	                        return injectScript(path, resolve, reject);
	                    });
	                }
	                injectScript(path);
	            }
	            return null;
	        };
	        // default options
	        intlTelInputGlobals.defaults = defaults;
	        // version
	        intlTelInputGlobals.version = "17.0.0";
	        // convenience wrapper
	        return function(input, options) {
	            var iti = new Iti(input, options);
	            iti._init();
	            input.setAttribute("data-intl-tel-input-id", iti.id);
	            window.intlTelInputGlobals.instances[iti.id] = iti;
	            return iti;
	        };
	    }();
	});
	});

	/**
	 * Exposing intl-tel-input as a component
	 */
	var intlTelInput$1 = intlTelInput;

	var $$a = jQuery;
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
	      var $element = _this.$element;

	      var val = _this.$element.val(); // dont do validation until focus out, however we can provide useful info on each type
	      // handle double naughts


	      if (_this.$element.val().startsWith('00')) {
	        val = val.replace('00', '+');
	      }

	      _this.$element.val(val); // Update data attributes


	      _this.updateDataAttributes(); // AFD only gets validated on focusOut


	      $element.data('phone-is-afd-valid', false);

	      _this.clearValidation();

	      if (_this.iti.isValidNumber()) {
	        _this.iti.setNumber(_this.iti.getNumber('2'));
	      }

	      $$a(document).trigger('afd:phoneValidationUpdated', $element);
	    });

	    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onFocusOut", function () {
	      if (typeof _this.$element.data('afd-already-valid') === 'undefined') {
	        _this.$element.data('afd-already-valid', []);
	      }

	      var $element = _this.$element; // we only want to set the invalid state if the user focuses out of the field
	      // first check to see if we can locally confirm email valid via plugin

	      if (_this.iti.isValidNumber()) {
	        if (_this.$element.data('afd-already-valid').indexOf(_this.iti.getNumber()) > -1) {
	          _this.handleValid();

	          $element.data('phone-is-afd-valid', true);
	          $$a(document).trigger('afd:phoneValidationUpdated', $element);
	          return;
	        }

	        $$a(document).trigger('afd:phoneValidationStarted', [$element]);

	        _this.showLoadingSpinner($element, _this.options.phone.loadingSpinner); // if it is a correctly structured phone number then check against PCE


	        var pceValid = _this.validatePhone(_this.iti.getNumber(), _this.countryData.iso3);

	        pceValid.done(function (data) {
	          if (data.Result === '1') {
	            _this.handleValid();

	            $element.data('phone-is-afd-valid', true);
	            $$a(document).trigger('afd:phoneValidationUpdated', $element);

	            var alreadyValid = _this.$element.data('afd-already-valid');

	            if (alreadyValid.indexOf(_this.iti.getNumber()) < 0) {
	              alreadyValid.push(_this.iti.getNumber());

	              _this.$element.data('afd-already-valid', alreadyValid);
	            }
	          } else {
	            _this.handleInvalid(_this.options.phone.invalidPhoneNumberMessage);

	            $element.data('phone-is-afd-valid', false);
	            $$a(document).trigger('afd:phoneValidationUpdated', [_this.$element]);
	          }

	          $$a(document).trigger('afd:phoneValidationSuccess', [data, $element]);

	          _this.hideLoadingSpinner($element, _this.options.phone.loadingSpinner);
	        }).fail(function (err) {
	          console.error(err);
	          $$a(document).trigger('afd:phoneValidationError', [err]);

	          _this.hideLoadingSpinner($element, _this.options.phone.loadingSpinner);
	        });
	      } else {
	        _this.handleInvalid(_this.options.phone.invalidPhoneNumberMessage);

	        $element.data('phone-is-afd-valid', false);
	        $$a(document).trigger('afd:phoneValidationUpdated', [_this.$element]);
	      }
	    });

	    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onCountryChange", function () {
	      var $element = _this.$element;
	      var val = $element.val();
	      _this.countryData = _this.iti.getSelectedCountryData();

	      if (typeof _this.countryData.iso2 !== 'undefined') {
	        // add in ISO 3 number
	        _this.countryData.iso3 = countries$K.alpha2ToAlpha3(_this.countryData.iso2.toUpperCase());
	      } // remove country code if there is one


	      if (typeof _this.countryData.dialCode !== 'undefined' && val.startsWith('+')) {
	        val = val.replace('+' + _this.countryData.dialCode, '');
	      }

	      _this.$element.val(val);

	      _this.updateDataAttributes();

	      $$a(document).trigger('afd:phoneValidationUpdated', $element);
	    });

	    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onCountryControlChange", function (e) {
	      var newCountry = _this.options.phone.countryControlConverter ? _this.options.phone.countryControlConverter(e, countries$K.alpha2ToAlpha3) : _this.formatCountryISO2(e.target.value);

	      _this.iti.setCountry(newCountry);
	    });

	    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "formatCountryISO2", function (country) {
	      if ([2, 3].indexOf(country.length) < 0) {
	        throw 'Value of country field should be either ISO2 or ISo3 format';
	      } else if (country.length === 2) {
	        country = country.toLowerCase();
	      } else {
	        country = countries$K.alpha3ToAlpha2(country).toLowerCase();
	      }

	      return country;
	    });

	    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "setCountryDialingCode", function (phoneNumber, defaultCountryDialingCode) {
	      if (phoneNumber.substr(0, 1) !== '+' && phoneNumber.substr(0, 2 !== '00')) ; else {
	        return phoneNumber;
	      }

	      return defaultCountryDialingCode + phoneNumber;
	    });

	    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "updateDataAttributes", function () {
	      var $element = _this.$element;

	      var numberType = _this.iti.getNumberType();

	      $element.data('phone-is-regex-valid', _this.iti.isValidNumber());
	      $element.data('phone-is-syntax-valid', _this.iti.isValidNumber());
	      $element.data('phone-syntax-valid', _this.iti.isValidNumber());
	      $element.data('phone-region-name', typeof _this.countryData.name !== 'undefined' ? _this.countryData.name : '');
	      $element.data('phone-region', typeof _this.countryData.iso2 !== 'undefined' ? _this.countryData.iso2.toUpperCase() : '');
	      $element.data('phone-region-iso2', typeof _this.countryData.iso2 !== 'undefined' ? _this.countryData.iso2.toUpperCase() : '');
	      $element.data('phone-region-iso3', typeof _this.countryData.iso3 !== 'undefined' ? _this.countryData.iso3 : '');
	      $element.data('phone-number', _this.iti.getNumber());
	      $element.data('phone-number-e164', _this.iti.getNumber());
	      $element.data('phone-number-international', _this.iti.getNumber(1));
	      $element.data('phone-number-national', _this.iti.getNumber(2));
	      $element.data('phone-number-rfc3966', _this.iti.getNumber(3));
	      var numberTypes = ['FIXED_LINE', 'MOBILE', 'FIXED_LINE_OR_MOBILE', 'TOLL_FREE', 'PREMIUM_RATE', 'SHARED_COST', 'VOIP', 'PERSONAL_NUMBER', 'PAGER', 'UAN', 'VOICEMAIL'];
	      $element.data('phone-is-mobile', numberType > -1 ? numberTypes[numberType] === 'MOBILE' : false);
	      $element.data('phone-is-landline', numberType > -1 ? numberTypes[numberType] === 'FIXED_LINE' : false);
	      $element.data('phone-number-type', numberType > -1 ? numberTypes[numberType] : 'UNKNOWN');
	    });

	    _this.controlType = 'phone';
	    return _this;
	  }

	  createClass(AfdPhone, [{
	    key: "init",
	    value: function init() {
	      this.$element.data('phone-is-afd-valid', false); // in this file countryControl refers to an external country control that may be in the form, not the one in the phone input control

	      this.countryControl = $$a(this.options.phone.countryControl);

	      if (this.countryControl && this.countryControl.length === 0) {
	        console.warn('Country control `' + this.options.phone.countryControl + '` not found');
	      }

	      var event = this.eventHandler;
	      event(this.$element, 'keyup', this.onKeyUp);
	      event(this.$element, 'focusout', this.onFocusOut);
	      event(this.countryControl, 'change', this.onCountryControlChange);
	      event(this.$element, 'countrychange', this.onCountryChange);
	      var initValue = this.$element.val();
	      this.iti = intlTelInput$1(this.element, {
	        utilsScript: 'https://cdn.afd.co.uk/plugins/shared/utils.js',
	        separateDialCode: true
	      });
	      this.$element.val(initValue); // set default country

	      this.iti.setNumber(this.options.phone.defaultDialingCode);
	      this.countryData = this.iti.getSelectedCountryData();
	    } // check for validation on each keystroke

	  }, {
	    key: "validatePhone",
	    value: function validatePhone(phone, countryiso) {
	      $$a(document).trigger('afd:phoneValidationStared', this.$element);
	      var requestOptions = this.setupParams({
	        phone: phone,
	        data: 'phone',
	        task: 'full',
	        fields: 'standard',
	        countryiso: countryiso,
	        afdc: this.options.afdc
	      });
	      return $$a.ajax(requestOptions);
	    }
	  }]);

	  return AfdPhone;
	}(afdValidationMixin(AfdControl));

	function initPhone () {
	  var $ = jQuery; // set options

	  var options = $.extend(true, {}, defaults, afdOptions); // assign phone field

	  var $phone = $(this); // Validate that phone field is <input>

	  if (!$phone.is('input')) {
	    throw '<' + $phone.prop('tagName').toLowerCase() + '> is not a valid tag for `[data-afd-control="phone"]`, use <input>';
	  } // initialise the control


	  var phone = new AfdPhone($phone, options);
	  $(document).off('afd:init.afd').on('afd:init.afd', function () {
	    phone.init();
	  });
	  phone.init();
	}

	/**
	 * A specialized version of `_.filter` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function arrayFilter(array, predicate) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      resIndex = 0,
	      result = [];

	  while (++index < length) {
	    var value = array[index];
	    if (predicate(value, index, array)) {
	      result[resIndex++] = value;
	    }
	  }
	  return result;
	}

	var _arrayFilter = arrayFilter;

	/**
	 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;

	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	var _createBaseFor = createBaseFor;

	/**
	 * The base implementation of `baseForOwn` which iterates over `object`
	 * properties returned by `keysFunc` and invokes `iteratee` for each property.
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = _createBaseFor();

	var _baseFor = baseFor;

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	var _baseTimes = baseTimes;

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	var stubFalse_1 = stubFalse;

	var isBuffer_1 = createCommonjsModule(function (module, exports) {
	/** Detect free variable `exports`. */
	var freeExports = exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? _root.Buffer : undefined;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = nativeIsBuffer || stubFalse_1;

	module.exports = isBuffer;
	});

	/** `Object#toString` result references. */
	var argsTag$1 = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag$1 = '[object Function]',
	    mapTag$1 = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag$1 = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag$2 = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag$1 = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag$1 = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag$1] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag$1] =
	typedArrayTags[mapTag$1] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag$1] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag$2] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag$1] = false;

	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike_1(value) &&
	    isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
	}

	var _baseIsTypedArray = baseIsTypedArray;

	/* Node.js helper references. */
	var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;

	var isTypedArray_1 = isTypedArray;

	/** Used for built-in method references. */
	var objectProto$7 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$7 = objectProto$7.hasOwnProperty;

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys(value, inherited) {
	  var isArr = isArray_1(value),
	      isArg = !isArr && isArguments_1(value),
	      isBuff = !isArr && !isArg && isBuffer_1(value),
	      isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
	      skipIndexes = isArr || isArg || isBuff || isType,
	      result = skipIndexes ? _baseTimes(value.length, String) : [],
	      length = result.length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty$7.call(value, key)) &&
	        !(skipIndexes && (
	           // Safari 9 has enumerable `arguments.length` in strict mode.
	           key == 'length' ||
	           // Node.js 0.10 has enumerable non-index properties on buffers.
	           (isBuff && (key == 'offset' || key == 'parent')) ||
	           // PhantomJS 2 has enumerable non-index properties on typed arrays.
	           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
	           // Skip index properties.
	           _isIndex(key, length)
	        ))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	var _arrayLikeKeys = arrayLikeKeys;

	/** Used for built-in method references. */
	var objectProto$8 = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$8;

	  return value === proto;
	}

	var _isPrototype = isPrototype;

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	var _overArg = overArg;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = _overArg(Object.keys, Object);

	var _nativeKeys = nativeKeys;

	/** Used for built-in method references. */
	var objectProto$9 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$8 = objectProto$9.hasOwnProperty;

	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!_isPrototype(object)) {
	    return _nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty$8.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}

	var _baseKeys = baseKeys;

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength_1(value.length) && !isFunction_1(value);
	}

	var isArrayLike_1 = isArrayLike;

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys$1(object) {
	  return isArrayLike_1(object) ? _arrayLikeKeys(object) : _baseKeys(object);
	}

	var keys_1 = keys$1;

	/**
	 * The base implementation of `_.forOwn` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return object && _baseFor(object, iteratee, keys_1);
	}

	var _baseForOwn = baseForOwn;

	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function(collection, iteratee) {
	    if (collection == null) {
	      return collection;
	    }
	    if (!isArrayLike_1(collection)) {
	      return eachFunc(collection, iteratee);
	    }
	    var length = collection.length,
	        index = fromRight ? length : -1,
	        iterable = Object(collection);

	    while ((fromRight ? index-- : ++index < length)) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}

	var _createBaseEach = createBaseEach;

	/**
	 * The base implementation of `_.forEach` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 */
	var baseEach = _createBaseEach(_baseForOwn);

	var _baseEach = baseEach;

	/**
	 * The base implementation of `_.filter` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function baseFilter(collection, predicate) {
	  var result = [];
	  _baseEach(collection, function(value, index, collection) {
	    if (predicate(value, index, collection)) {
	      result.push(value);
	    }
	  });
	  return result;
	}

	var _baseFilter = baseFilter;

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = new _ListCache;
	  this.size = 0;
	}

	var _stackClear = stackClear;

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  var data = this.__data__,
	      result = data['delete'](key);

	  this.size = data.size;
	  return result;
	}

	var _stackDelete = stackDelete;

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  return this.__data__.get(key);
	}

	var _stackGet = stackGet;

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  return this.__data__.has(key);
	}

	var _stackHas = stackHas;

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet(key, value) {
	  var data = this.__data__;
	  if (data instanceof _ListCache) {
	    var pairs = data.__data__;
	    if (!_Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
	      pairs.push([key, value]);
	      this.size = ++data.size;
	      return this;
	    }
	    data = this.__data__ = new _MapCache(pairs);
	  }
	  data.set(key, value);
	  this.size = data.size;
	  return this;
	}

	var _stackSet = stackSet;

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack(entries) {
	  var data = this.__data__ = new _ListCache(entries);
	  this.size = data.size;
	}

	// Add methods to `Stack`.
	Stack.prototype.clear = _stackClear;
	Stack.prototype['delete'] = _stackDelete;
	Stack.prototype.get = _stackGet;
	Stack.prototype.has = _stackHas;
	Stack.prototype.set = _stackSet;

	var _Stack = Stack;

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';

	/**
	 * Adds `value` to the array cache.
	 *
	 * @private
	 * @name add
	 * @memberOf SetCache
	 * @alias push
	 * @param {*} value The value to cache.
	 * @returns {Object} Returns the cache instance.
	 */
	function setCacheAdd(value) {
	  this.__data__.set(value, HASH_UNDEFINED$2);
	  return this;
	}

	var _setCacheAdd = setCacheAdd;

	/**
	 * Checks if `value` is in the array cache.
	 *
	 * @private
	 * @name has
	 * @memberOf SetCache
	 * @param {*} value The value to search for.
	 * @returns {number} Returns `true` if `value` is found, else `false`.
	 */
	function setCacheHas(value) {
	  return this.__data__.has(value);
	}

	var _setCacheHas = setCacheHas;

	/**
	 *
	 * Creates an array cache object to store unique values.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function SetCache(values) {
	  var index = -1,
	      length = values == null ? 0 : values.length;

	  this.__data__ = new _MapCache;
	  while (++index < length) {
	    this.add(values[index]);
	  }
	}

	// Add methods to `SetCache`.
	SetCache.prototype.add = SetCache.prototype.push = _setCacheAdd;
	SetCache.prototype.has = _setCacheHas;

	var _SetCache = SetCache;

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check,
	 *  else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	var _arraySome = arraySome;

	/**
	 * Checks if a `cache` value for `key` exists.
	 *
	 * @private
	 * @param {Object} cache The cache to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function cacheHas(cache, key) {
	  return cache.has(key);
	}

	var _cacheHas = cacheHas;

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG = 1,
	    COMPARE_UNORDERED_FLAG = 2;

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
	  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var index = -1,
	      result = true,
	      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new _SetCache : undefined;

	  stack.set(array, other);
	  stack.set(other, array);

	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, arrValue, index, other, array, stack)
	        : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (seen) {
	      if (!_arraySome(other, function(othValue, othIndex) {
	            if (!_cacheHas(seen, othIndex) &&
	                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
	              return seen.push(othIndex);
	            }
	          })) {
	        result = false;
	        break;
	      }
	    } else if (!(
	          arrValue === othValue ||
	            equalFunc(arrValue, othValue, bitmask, customizer, stack)
	        )) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  stack['delete'](other);
	  return result;
	}

	var _equalArrays = equalArrays;

	/** Built-in value references. */
	var Uint8Array = _root.Uint8Array;

	var _Uint8Array = Uint8Array;

	/**
	 * Converts `map` to its key-value pairs.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the key-value pairs.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);

	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}

	var _mapToArray = mapToArray;

	/**
	 * Converts `set` to an array of its values.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the values.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);

	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}

	var _setToArray = setToArray;

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG$1 = 1,
	    COMPARE_UNORDERED_FLAG$1 = 2;

	/** `Object#toString` result references. */
	var boolTag$1 = '[object Boolean]',
	    dateTag$1 = '[object Date]',
	    errorTag$1 = '[object Error]',
	    mapTag$2 = '[object Map]',
	    numberTag$1 = '[object Number]',
	    regexpTag$1 = '[object RegExp]',
	    setTag$3 = '[object Set]',
	    stringTag$1 = '[object String]',
	    symbolTag$1 = '[object Symbol]';

	var arrayBufferTag$1 = '[object ArrayBuffer]',
	    dataViewTag$2 = '[object DataView]';

	/** Used to convert symbols to primitives and strings. */
	var symbolProto$1 = _Symbol ? _Symbol.prototype : undefined,
	    symbolValueOf = symbolProto$1 ? symbolProto$1.valueOf : undefined;

	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
	  switch (tag) {
	    case dataViewTag$2:
	      if ((object.byteLength != other.byteLength) ||
	          (object.byteOffset != other.byteOffset)) {
	        return false;
	      }
	      object = object.buffer;
	      other = other.buffer;

	    case arrayBufferTag$1:
	      if ((object.byteLength != other.byteLength) ||
	          !equalFunc(new _Uint8Array(object), new _Uint8Array(other))) {
	        return false;
	      }
	      return true;

	    case boolTag$1:
	    case dateTag$1:
	    case numberTag$1:
	      // Coerce booleans to `1` or `0` and dates to milliseconds.
	      // Invalid dates are coerced to `NaN`.
	      return eq_1(+object, +other);

	    case errorTag$1:
	      return object.name == other.name && object.message == other.message;

	    case regexpTag$1:
	    case stringTag$1:
	      // Coerce regexes to strings and treat strings, primitives and objects,
	      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
	      // for more details.
	      return object == (other + '');

	    case mapTag$2:
	      var convert = _mapToArray;

	    case setTag$3:
	      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1;
	      convert || (convert = _setToArray);

	      if (object.size != other.size && !isPartial) {
	        return false;
	      }
	      // Assume cyclic values are equal.
	      var stacked = stack.get(object);
	      if (stacked) {
	        return stacked == other;
	      }
	      bitmask |= COMPARE_UNORDERED_FLAG$1;

	      // Recursively compare objects (susceptible to call stack limits).
	      stack.set(object, other);
	      var result = _equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
	      stack['delete'](object);
	      return result;

	    case symbolTag$1:
	      if (symbolValueOf) {
	        return symbolValueOf.call(object) == symbolValueOf.call(other);
	      }
	  }
	  return false;
	}

	var _equalByTag = equalByTag;

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */
	function arrayPush(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

	var _arrayPush = arrayPush;

	/**
	 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
	 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @param {Function} symbolsFunc The function to get the symbols of `object`.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function baseGetAllKeys(object, keysFunc, symbolsFunc) {
	  var result = keysFunc(object);
	  return isArray_1(object) ? result : _arrayPush(result, symbolsFunc(object));
	}

	var _baseGetAllKeys = baseGetAllKeys;

	/**
	 * This method returns a new empty array.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {Array} Returns the new empty array.
	 * @example
	 *
	 * var arrays = _.times(2, _.stubArray);
	 *
	 * console.log(arrays);
	 * // => [[], []]
	 *
	 * console.log(arrays[0] === arrays[1]);
	 * // => false
	 */
	function stubArray() {
	  return [];
	}

	var stubArray_1 = stubArray;

	/** Used for built-in method references. */
	var objectProto$a = Object.prototype;

	/** Built-in value references. */
	var propertyIsEnumerable$1 = objectProto$a.propertyIsEnumerable;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols = Object.getOwnPropertySymbols;

	/**
	 * Creates an array of the own enumerable symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbols = !nativeGetSymbols ? stubArray_1 : function(object) {
	  if (object == null) {
	    return [];
	  }
	  object = Object(object);
	  return _arrayFilter(nativeGetSymbols(object), function(symbol) {
	    return propertyIsEnumerable$1.call(object, symbol);
	  });
	};

	var _getSymbols = getSymbols;

	/**
	 * Creates an array of own enumerable property names and symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeys(object) {
	  return _baseGetAllKeys(object, keys_1, _getSymbols);
	}

	var _getAllKeys = getAllKeys;

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG$2 = 1;

	/** Used for built-in method references. */
	var objectProto$b = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$9 = objectProto$b.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} stack Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
	  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2,
	      objProps = _getAllKeys(object),
	      objLength = objProps.length,
	      othProps = _getAllKeys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : hasOwnProperty$9.call(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked && stack.get(other)) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);
	  stack.set(other, object);

	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, objValue, key, other, object, stack)
	        : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined
	          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
	          : compared
	        )) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  stack['delete'](other);
	  return result;
	}

	var _equalObjects = equalObjects;

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG$3 = 1;

	/** `Object#toString` result references. */
	var argsTag$2 = '[object Arguments]',
	    arrayTag$1 = '[object Array]',
	    objectTag$2 = '[object Object]';

	/** Used for built-in method references. */
	var objectProto$c = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$a = objectProto$c.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
	 * @param {Function} customizer The function to customize comparisons.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
	  var objIsArr = isArray_1(object),
	      othIsArr = isArray_1(other),
	      objTag = objIsArr ? arrayTag$1 : _getTag(object),
	      othTag = othIsArr ? arrayTag$1 : _getTag(other);

	  objTag = objTag == argsTag$2 ? objectTag$2 : objTag;
	  othTag = othTag == argsTag$2 ? objectTag$2 : othTag;

	  var objIsObj = objTag == objectTag$2,
	      othIsObj = othTag == objectTag$2,
	      isSameTag = objTag == othTag;

	  if (isSameTag && isBuffer_1(object)) {
	    if (!isBuffer_1(other)) {
	      return false;
	    }
	    objIsArr = true;
	    objIsObj = false;
	  }
	  if (isSameTag && !objIsObj) {
	    stack || (stack = new _Stack);
	    return (objIsArr || isTypedArray_1(object))
	      ? _equalArrays(object, other, bitmask, customizer, equalFunc, stack)
	      : _equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
	  }
	  if (!(bitmask & COMPARE_PARTIAL_FLAG$3)) {
	    var objIsWrapped = objIsObj && hasOwnProperty$a.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty$a.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      var objUnwrapped = objIsWrapped ? object.value() : object,
	          othUnwrapped = othIsWrapped ? other.value() : other;

	      stack || (stack = new _Stack);
	      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new _Stack);
	  return _equalObjects(object, other, bitmask, customizer, equalFunc, stack);
	}

	var _baseIsEqualDeep = baseIsEqualDeep;

	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {boolean} bitmask The bitmask flags.
	 *  1 - Unordered comparison
	 *  2 - Partial comparison
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, bitmask, customizer, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObjectLike_1(value) && !isObjectLike_1(other))) {
	    return value !== value && other !== other;
	  }
	  return _baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
	}

	var _baseIsEqual = baseIsEqual;

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG$4 = 1,
	    COMPARE_UNORDERED_FLAG$2 = 2;

	/**
	 * The base implementation of `_.isMatch` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Object} source The object of property values to match.
	 * @param {Array} matchData The property names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, source, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;

	  if (object == null) {
	    return !length;
	  }
	  object = Object(object);
	  while (index--) {
	    var data = matchData[index];
	    if ((noCustomizer && data[2])
	          ? data[1] !== object[data[0]]
	          : !(data[0] in object)
	        ) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];

	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var stack = new _Stack;
	      if (customizer) {
	        var result = customizer(objValue, srcValue, key, object, source, stack);
	      }
	      if (!(result === undefined
	            ? _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$4 | COMPARE_UNORDERED_FLAG$2, customizer, stack)
	            : result
	          )) {
	        return false;
	      }
	    }
	  }
	  return true;
	}

	var _baseIsMatch = baseIsMatch;

	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject_1(value);
	}

	var _isStrictComparable = isStrictComparable;

	/**
	 * Gets the property names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = keys_1(object),
	      length = result.length;

	  while (length--) {
	    var key = result[length],
	        value = object[key];

	    result[length] = [key, value, _isStrictComparable(value)];
	  }
	  return result;
	}

	var _getMatchData = getMatchData;

	/**
	 * A specialized version of `matchesProperty` for source values suitable
	 * for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function matchesStrictComparable(key, srcValue) {
	  return function(object) {
	    if (object == null) {
	      return false;
	    }
	    return object[key] === srcValue &&
	      (srcValue !== undefined || (key in Object(object)));
	  };
	}

	var _matchesStrictComparable = matchesStrictComparable;

	/**
	 * The base implementation of `_.matches` which doesn't clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatches(source) {
	  var matchData = _getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    return _matchesStrictComparable(matchData[0][0], matchData[0][1]);
	  }
	  return function(object) {
	    return object === source || _baseIsMatch(object, source, matchData);
	  };
	}

	var _baseMatches = baseMatches;

	/**
	 * The base implementation of `_.hasIn` without support for deep paths.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHasIn(object, key) {
	  return object != null && key in Object(object);
	}

	var _baseHasIn = baseHasIn;

	/**
	 * Checks if `path` is a direct or inherited property of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
	 *
	 * _.hasIn(object, 'a');
	 * // => true
	 *
	 * _.hasIn(object, 'a.b');
	 * // => true
	 *
	 * _.hasIn(object, ['a', 'b']);
	 * // => true
	 *
	 * _.hasIn(object, 'b');
	 * // => false
	 */
	function hasIn(object, path) {
	  return object != null && _hasPath(object, path, _baseHasIn);
	}

	var hasIn_1 = hasIn;

	/** Used to compose bitmasks for value comparisons. */
	var COMPARE_PARTIAL_FLAG$5 = 1,
	    COMPARE_UNORDERED_FLAG$3 = 2;

	/**
	 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new spec function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  if (_isKey(path) && _isStrictComparable(srcValue)) {
	    return _matchesStrictComparable(_toKey(path), srcValue);
	  }
	  return function(object) {
	    var objValue = get_1(object, path);
	    return (objValue === undefined && objValue === srcValue)
	      ? hasIn_1(object, path)
	      : _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$5 | COMPARE_UNORDERED_FLAG$3);
	  };
	}

	var _baseMatchesProperty = baseMatchesProperty;

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	var identity_1 = identity;

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}

	var _baseProperty = baseProperty;

	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 */
	function basePropertyDeep(path) {
	  return function(object) {
	    return _baseGet(object, path);
	  };
	}

	var _basePropertyDeep = basePropertyDeep;

	/**
	 * Creates a function that returns the value at `path` of a given object.
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Util
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new accessor function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': 2 } },
	 *   { 'a': { 'b': 1 } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b'));
	 * // => [2, 1]
	 *
	 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
	 * // => [1, 2]
	 */
	function property(path) {
	  return _isKey(path) ? _baseProperty(_toKey(path)) : _basePropertyDeep(path);
	}

	var property_1 = property;

	/**
	 * The base implementation of `_.iteratee`.
	 *
	 * @private
	 * @param {*} [value=_.identity] The value to convert to an iteratee.
	 * @returns {Function} Returns the iteratee.
	 */
	function baseIteratee(value) {
	  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
	  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
	  if (typeof value == 'function') {
	    return value;
	  }
	  if (value == null) {
	    return identity_1;
	  }
	  if (typeof value == 'object') {
	    return isArray_1(value)
	      ? _baseMatchesProperty(value[0], value[1])
	      : _baseMatches(value);
	  }
	  return property_1(value);
	}

	var _baseIteratee = baseIteratee;

	/**
	 * Iterates over elements of `collection`, returning an array of all elements
	 * `predicate` returns truthy for. The predicate is invoked with three
	 * arguments: (value, index|key, collection).
	 *
	 * **Note:** Unlike `_.remove`, this method returns a new array.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [predicate=_.identity] The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 * @see _.reject
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney', 'age': 36, 'active': true },
	 *   { 'user': 'fred',   'age': 40, 'active': false }
	 * ];
	 *
	 * _.filter(users, function(o) { return !o.active; });
	 * // => objects for ['fred']
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.filter(users, { 'age': 36, 'active': true });
	 * // => objects for ['barney']
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.filter(users, ['active', false]);
	 * // => objects for ['fred']
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.filter(users, 'active');
	 * // => objects for ['barney']
	 */
	function filter(collection, predicate) {
	  var func = isArray_1(collection) ? _arrayFilter : _baseFilter;
	  return func(collection, _baseIteratee(predicate, 3));
	}

	var filter_1 = filter;

	var $$b = jQuery;

	var AfdCountries =
	/*#__PURE__*/
	function (_addressToolsMixin) {
	  inherits(AfdCountries, _addressToolsMixin);

	  function AfdCountries($element, options) {
	    var _this;

	    classCallCheck(this, AfdCountries);

	    _this = possibleConstructorReturn(this, getPrototypeOf(AfdCountries).call(this, $element, options));

	    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "onChange", function (e) {
	      _this.$element.trigger('afd:countryChanged', [e.target.value]);
	    });

	    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "getCountries", function ($element) {
	      $$b(document).trigger('afd:getCountriesStart');
	      var externalResolver;
	      var outputPromise = new Promise(function (resolve) {
	        externalResolver = resolve;
	      });

	      var requestOptions = _this.setupParams({
	        data: 'list',
	        task: 'listcountries',
	        fields: 'standard',
	        countryISO: 'FRA'
	      });

	      $$b.ajax(requestOptions).done(_this.handleGetCountries.bind(null, externalResolver));
	      return outputPromise;
	    });

	    defineProperty(assertThisInitialized(assertThisInitialized(_this)), "handleGetCountries", function (externalResolver, data) {
	      if (data.status === -2) {
	        var err = typeof data.reason !== 'undefined' ? data.reason : '';
	        err += typeof data.other !== 'undefined' ? ' - ' + data.other : '';
	        throw err;
	      }

	      var countries = data.Item;
	      var preferredCountries = _this.options.country.preferredCountries;
	      $$b.each(preferredCountries, function (index, countryISO) {
	        var filteredCountry = filter_1(countries, {
	          'iso': countryISO
	        });

	        if (filteredCountry.length === 0) {
	          console.warn(countryISO + ' was supplied as a preferredCountry but is not a valid option.  Please use a valid country ISO3');
	          return;
	        }

	        var country = filteredCountry[0];

	        _this.$element.append($$b('<option />').val(country.iso).text(country.name));
	      });
	      $$b.each(countries, function (index, country) {
	        if (preferredCountries.indexOf(country.iso) > -1) {
	          return;
	        }

	        var shouldAppend = _this.options.typeahead.availableCountries.length > 0 && _this.options.typeahead.availableCountries.indexOf(country.iso) > -1 || _this.options.country.availableCountries.length > 0 && _this.options.country.availableCountries.indexOf(country.iso) > -1 || _this.options.typeahead.availableCountries.length < 1 && _this.options.country.availableCountries.length < 1;

	        if (shouldAppend) {
	          _this.$element.append($$b('<option />').val(country.iso).text(country.name));
	        }
	      }); // depricated

	      if (_this.options.defaultCountry) {
	        _this.$element.val(_this.options.defaultCountry);

	        _this.$element.trigger('afd:countryChanged', [_this.$element.val()]);
	      } // should use this


	      if (_this.options.country.defaultCountry) {
	        _this.$element.val(_this.options.country.defaultCountry);

	        _this.$element.trigger('afd:countryChanged', [_this.$element.val()]);
	      }

	      $$b(document).trigger('afd:getCountriesComplete', countries);
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
	}(addressToolsMixin(AfdControl));

	function initCountry (controlType, resolve) {
	  var $ = jQuery;
	  var $this = $(this);

	  var options = $.extend(true, {}, defaults, afdOptions);

	  try {
	    var countries = new AfdCountries($this, options);
	    countries.init().then(function () {
	      resolve();
	    });
	  } catch (e) {
	    console.error('Error initialising country control');
	    console.error(e);
	  }
	}

	var lookupButton = '<button data-afd-control="lookupButton">Lookup</button>';
	var lookupField = '<input class="form-control" data-afd-control="lookupField" name="tiger" id="lookup-field" placeholder="Postcode Lookup">';
	var lookupResult = '<select class="custom-select" data-afd-control="lookupResultsList" multiple="yes"></select>';
	var manualInput = '<div class="afd-manual-input-button" style="display:none;">Manual Input</div>';
	var manualInputSearch = '<div class="afd-manual-input-search-button" style="display:none;">Address Search</div>';
	var searchAgain = '<div class="afd-search-again" style="display:none">Search Again</div>';
	var typeahead = '<div class="afd-typeahead-container afd-form-control form-group">';
	typeahead += '<div class="afd-typeahead-field">';
	typeahead += '<div class="afd-typeahead-query">';
	typeahead += '<input class="form-control" placeholder="Start typing your address" type="search" autocomplete="off" data-afd-control="typeahead" name="lion">';
	typeahead += '</div>';
	typeahead += '</div>';
	typeahead += '</div>';

	var $$c = jQuery;

	var postRender = function postRender(options) {
	  var possibleElements = [['lookup.field', lookupField, 'Lookup Field'], ['lookup.button', lookupButton, 'Lookup Button'], ['lookup.result', lookupResult, 'Lookup Result'], ['lookup.searchAgain', searchAgain, 'Lookup Search Again'], ['lookup.manualInput', manualInput, 'Lookup Manual Input'], ['lookup.manualInputSearch', manualInputSearch, 'Lookup Manual Input Search'], ['typeahead.field', typeahead, 'Typeahead Field'], ['typeahead.searchAgain', searchAgain, 'Typeahead Search Again'], ['typeahead.manualInput', manualInput, 'Typeahead Manual Input'], ['typeahead.manualInputSearch', manualInputSearch, 'Typeahead Manual Input Search']];
	  possibleElements.forEach(function (element) {
	    var optionsPath = element[0];

	    if (has_1(options, optionsPath)) {
	      var elementOptions = get_1(options, optionsPath);
	      var field = has_1(elementOptions, 'template') ? $$c(elementOptions.template) : $$c(element[1]);

	      if (has_1(options, optionsPath + '.text')) {
	        field.text(get_1(options, optionsPath + '.text'));
	      }

	      processElement(field, elementOptions, element[2]);
	    }
	  });
	  var possibleValidationFields = ['email', 'phone', 'account', 'sort', 'card', 'expiry'];
	  possibleValidationFields.forEach(function (control) {
	    if (has_1(options, control)) {
	      var $control = $$c(get_1(options, control + '.selector'));
	      $control.attr('data-afd-control', control);

	      if (has_1(options, control + '.additionalOptions')) {
	        $control.attr('data-afd-additional-options', get_1(options, control + '.additionalOptions'));
	      }
	    }
	  }); //results

	  if (has_1(options, 'results')) {
	    options.results.forEach(function (field) {
	      $$c(field[0]).attr('data-afd-result', field[1]);
	    });
	  }
	};

	var processElement = function processElement($element, options, elementName) {
	  if (has_1(options, 'classes')) {
	    $element.addClass(options.classes);
	  }

	  if (has_1(options, 'containerTemplate')) {
	    var containerAction = has_1(options, 'containerAction') ? options.containerAction : 'after';
	    var $container = $$c(options.containerTemplate);

	    if ($container.filter(options.containerSelector).length > 0) {
	      $container[options.containerAction]($element);
	    } else {
	      $container.find(options.containerSelector)[options.containerAction]($element);
	    }

	    addToDOM($container, options.selector, elementName, options.action);
	  } else {
	    addToDOM($element, options.selector, elementName, options.action);
	  }
	};

	var addToDOM = function addToDOM($el, selector, elementName) {
	  var action = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'after';

	  if (typeof selector === 'undefined') {
	    throw 'Trying to add ' + elementName + ' to the DOM but no selector provided to add to';
	  }

	  $$c(selector)[action]($el);
	};

	function dataDefinition($) {
	  // prevent the init script from running several times if multiple modules are loaded
	  if (typeof window.afdDataInit === 'undefined') {
	    window.afdDataInit = false;
	  } // Data API definitions


	  $(document).ready(function () {
	    if (!window.afdDataInit) {
	      window.afdDataInit = true;
	      $(document).trigger('afd::page_ready');
	    }
	  }); // Set page_ready listener for data definitions

	  $(document).off('afd::page_ready').on('afd::page_ready', function () {
	    // Fields that need to perform ajax requests before the rest of the controls can be initialised
	    var dependantFields = ['country']; // create an array of promises for dependent requests

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
	          initialiseControl($this, controlType, null);
	        }
	      });
	    });
	  });
	}

	function initialiseControl(control, controlType, resolve) {
	  // activate the module on this element according to the data-afd-control
	  try {
	    control.afd(controlType, resolve);
	  } catch (e) {
	    console.error(e);
	  }
	}

	window.afdInitScripts = typeof window.afdInitScripts === 'undefined' ? {
	  lookupButton: null,
	  typeahead: null,
	  reverseGeocodeButton: null,
	  account: null,
	  card: null,
	  email: null,
	  phone: null,
	  country: null
	} : window.afdInitScripts;
	window.afdInitScripts.lookupButton = typeof initLookup !== 'undefined' ? initLookup : window.afdInitScripts.lookupButton ? window.afdInitScripts.lookupButton : null;
	window.afdInitScripts.typeahead = typeof initTypeahead !== 'undefined' ? initTypeahead : window.afdInitScripts.typeahead ? window.afdInitScripts.typeahead : null;
	window.afdInitScripts.reverseGeocodeButton = typeof initReverseGeocode !== 'undefined' ? initReverseGeocode : window.afdInitScripts.reverseGeocodeButton ? window.afdInitScripts.reverseGeocodeButton : null;
	window.afdInitScripts.account = typeof initAccount !== 'undefined' ? initAccount : window.afdInitScripts.account ? window.afdInitScripts.account : null;
	window.afdInitScripts.card = typeof initCard !== 'undefined' ? initCard : window.afdInitScripts.card ? _typeof_1(window.afdInitScripts.card) : null;
	window.afdInitScripts.email = typeof initEmail !== 'undefined' ? initEmail : window.afdInitScripts.email ? window.afdInitScripts.email : null;
	window.afdInitScripts.phone = typeof initPhone !== 'undefined' ? initPhone : window.afdInitScripts.phone ? window.afdInitScripts.phone : null;
	window.afdInitScripts.country = typeof initCountry !== 'undefined' ? initCountry : window.afdInitScripts.country ? window.afdInitScripts.country : null;

	(function ($) {
	  // Init plugin so $('selector').afd('control-name') can work
	  $.fn.afd = function (controlType, resolve) {
	    return this.each(function () {
	      //fields that do not need to be initialised
	      var nonInitFields = ['lookupField', 'lookupResultsList', 'reverseGeocodeResultsList', 'sort', 'expiry', 'cvv'];

	      if (nonInitFields.indexOf(controlType) > -1) {
	        return;
	      } //If invalid field is supplied


	      var validFields = ['typeahead', 'lookupButton', 'country', 'reverseGeocodeButton', 'phone', 'email', 'account', 'card'];

	      if (validFields.indexOf(controlType) === -1) {
	        throw '`' + controlType + '` is not a valid AFD jQuery control.  Please use one of ' + validFields + ',' + nonInitFields;
	      } // if user is trying to init a field that module isn't loaded


	      if (!window.afdInitScripts[controlType]) {
	        throw 'You are trying to intitialise the control `' + controlType + '` but it seems that you have not loaded this module';
	      }

	      try {
	        window.afdInitScripts[controlType].call(this, controlType, resolve, constructor);
	      } catch (err) {
	        console.error('Problem initialising AFD Control');
	        console.error(err);
	      }

	      return this;
	    });
	  }; // Definitions for `data-afd-control=`


	  dataDefinition($); // If this is post render version

	  if (typeof postRender !== 'undefined') {
	    $(document).ready(function () {
	      $(document).trigger('afd::initPostRender');
	    });
	    $(document).on('afd::initPostRender', function () {
	      try {
	        if (typeof afdOptions.postRender === 'undefined') {
	          throw 'Post Render version of plugin used bit no post render options supplied';
	        }

	        postRender(afdOptions.postRender);
	        $(document).trigger('afd:postRenderInitComplete');
	      } catch (e) {
	        console.error(e);
	      }

	      $(document).trigger('afd::page_ready');
	    });
	  }
	})($$1);

})));

