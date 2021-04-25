/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/rxjs/_esm5/internal/Observable.js":
/*!********************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/Observable.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Observable": () => (/* binding */ Observable)
/* harmony export */ });
/* harmony import */ var _util_canReportError__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/canReportError */ "./node_modules/rxjs/_esm5/internal/util/canReportError.js");
/* harmony import */ var _util_toSubscriber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/toSubscriber */ "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js");
/* harmony import */ var _symbol_observable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./symbol/observable */ "./node_modules/rxjs/_esm5/internal/symbol/observable.js");
/* harmony import */ var _util_pipe__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util/pipe */ "./node_modules/rxjs/_esm5/internal/util/pipe.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config */ "./node_modules/rxjs/_esm5/internal/config.js");
/** PURE_IMPORTS_START _util_canReportError,_util_toSubscriber,_symbol_observable,_util_pipe,_config PURE_IMPORTS_END */






var Observable = /*@__PURE__*/function () {
  function Observable(subscribe) {
    this._isScalar = false;

    if (subscribe) {
      this._subscribe = subscribe;
    }
  }

  Observable.prototype.lift = function (operator) {
    var observable = new Observable();
    observable.source = this;
    observable.operator = operator;
    return observable;
  };

  Observable.prototype.subscribe = function (observerOrNext, error, complete) {
    var operator = this.operator;
    var sink = (0,_util_toSubscriber__WEBPACK_IMPORTED_MODULE_0__.toSubscriber)(observerOrNext, error, complete);

    if (operator) {
      sink.add(operator.call(sink, this.source));
    } else {
      sink.add(this.source || _config__WEBPACK_IMPORTED_MODULE_1__.config.useDeprecatedSynchronousErrorHandling && !sink.syncErrorThrowable ? this._subscribe(sink) : this._trySubscribe(sink));
    }

    if (_config__WEBPACK_IMPORTED_MODULE_1__.config.useDeprecatedSynchronousErrorHandling) {
      if (sink.syncErrorThrowable) {
        sink.syncErrorThrowable = false;

        if (sink.syncErrorThrown) {
          throw sink.syncErrorValue;
        }
      }
    }

    return sink;
  };

  Observable.prototype._trySubscribe = function (sink) {
    try {
      return this._subscribe(sink);
    } catch (err) {
      if (_config__WEBPACK_IMPORTED_MODULE_1__.config.useDeprecatedSynchronousErrorHandling) {
        sink.syncErrorThrown = true;
        sink.syncErrorValue = err;
      }

      if ((0,_util_canReportError__WEBPACK_IMPORTED_MODULE_2__.canReportError)(sink)) {
        sink.error(err);
      } else {
        console.warn(err);
      }
    }
  };

  Observable.prototype.forEach = function (next, promiseCtor) {
    var _this = this;

    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function (resolve, reject) {
      var subscription;
      subscription = _this.subscribe(function (value) {
        try {
          next(value);
        } catch (err) {
          reject(err);

          if (subscription) {
            subscription.unsubscribe();
          }
        }
      }, reject, resolve);
    });
  };

  Observable.prototype._subscribe = function (subscriber) {
    var source = this.source;
    return source && source.subscribe(subscriber);
  };

  Observable.prototype[_symbol_observable__WEBPACK_IMPORTED_MODULE_3__.observable] = function () {
    return this;
  };

  Observable.prototype.pipe = function () {
    var operations = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      operations[_i] = arguments[_i];
    }

    if (operations.length === 0) {
      return this;
    }

    return (0,_util_pipe__WEBPACK_IMPORTED_MODULE_4__.pipeFromArray)(operations)(this);
  };

  Observable.prototype.toPromise = function (promiseCtor) {
    var _this = this;

    promiseCtor = getPromiseCtor(promiseCtor);
    return new promiseCtor(function (resolve, reject) {
      var value;

      _this.subscribe(function (x) {
        return value = x;
      }, function (err) {
        return reject(err);
      }, function () {
        return resolve(value);
      });
    });
  };

  Observable.create = function (subscribe) {
    return new Observable(subscribe);
  };

  return Observable;
}();



function getPromiseCtor(promiseCtor) {
  if (!promiseCtor) {
    promiseCtor = _config__WEBPACK_IMPORTED_MODULE_1__.config.Promise || Promise;
  }

  if (!promiseCtor) {
    throw new Error('no Promise impl found');
  }

  return promiseCtor;
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/Observer.js":
/*!******************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/Observer.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "empty": () => (/* binding */ empty)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ "./node_modules/rxjs/_esm5/internal/config.js");
/* harmony import */ var _util_hostReportError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/hostReportError */ "./node_modules/rxjs/_esm5/internal/util/hostReportError.js");
/** PURE_IMPORTS_START _config,_util_hostReportError PURE_IMPORTS_END */


var empty = {
  closed: true,
  next: function next(value) {},
  error: function error(err) {
    if (_config__WEBPACK_IMPORTED_MODULE_0__.config.useDeprecatedSynchronousErrorHandling) {
      throw err;
    } else {
      (0,_util_hostReportError__WEBPACK_IMPORTED_MODULE_1__.hostReportError)(err);
    }
  },
  complete: function complete() {}
};

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/Subscriber.js":
/*!********************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/Subscriber.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Subscriber": () => (/* binding */ Subscriber),
/* harmony export */   "SafeSubscriber": () => (/* binding */ SafeSubscriber)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util/isFunction */ "./node_modules/rxjs/_esm5/internal/util/isFunction.js");
/* harmony import */ var _Observer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Observer */ "./node_modules/rxjs/_esm5/internal/Observer.js");
/* harmony import */ var _Subscription__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Subscription */ "./node_modules/rxjs/_esm5/internal/Subscription.js");
/* harmony import */ var _internal_symbol_rxSubscriber__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../internal/symbol/rxSubscriber */ "./node_modules/rxjs/_esm5/internal/symbol/rxSubscriber.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./config */ "./node_modules/rxjs/_esm5/internal/config.js");
/* harmony import */ var _util_hostReportError__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./util/hostReportError */ "./node_modules/rxjs/_esm5/internal/util/hostReportError.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/** PURE_IMPORTS_START tslib,_util_isFunction,_Observer,_Subscription,_internal_symbol_rxSubscriber,_config,_util_hostReportError PURE_IMPORTS_END */








var Subscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__.__extends(Subscriber, _super);

  function Subscriber(destinationOrNext, error, complete) {
    var _this = _super.call(this) || this;

    _this.syncErrorValue = null;
    _this.syncErrorThrown = false;
    _this.syncErrorThrowable = false;
    _this.isStopped = false;

    switch (arguments.length) {
      case 0:
        _this.destination = _Observer__WEBPACK_IMPORTED_MODULE_1__.empty;
        break;

      case 1:
        if (!destinationOrNext) {
          _this.destination = _Observer__WEBPACK_IMPORTED_MODULE_1__.empty;
          break;
        }

        if (_typeof(destinationOrNext) === 'object') {
          if (destinationOrNext instanceof Subscriber) {
            _this.syncErrorThrowable = destinationOrNext.syncErrorThrowable;
            _this.destination = destinationOrNext;
            destinationOrNext.add(_this);
          } else {
            _this.syncErrorThrowable = true;
            _this.destination = new SafeSubscriber(_this, destinationOrNext);
          }

          break;
        }

      default:
        _this.syncErrorThrowable = true;
        _this.destination = new SafeSubscriber(_this, destinationOrNext, error, complete);
        break;
    }

    return _this;
  }

  Subscriber.prototype[_internal_symbol_rxSubscriber__WEBPACK_IMPORTED_MODULE_2__.rxSubscriber] = function () {
    return this;
  };

  Subscriber.create = function (next, error, complete) {
    var subscriber = new Subscriber(next, error, complete);
    subscriber.syncErrorThrowable = false;
    return subscriber;
  };

  Subscriber.prototype.next = function (value) {
    if (!this.isStopped) {
      this._next(value);
    }
  };

  Subscriber.prototype.error = function (err) {
    if (!this.isStopped) {
      this.isStopped = true;

      this._error(err);
    }
  };

  Subscriber.prototype.complete = function () {
    if (!this.isStopped) {
      this.isStopped = true;

      this._complete();
    }
  };

  Subscriber.prototype.unsubscribe = function () {
    if (this.closed) {
      return;
    }

    this.isStopped = true;

    _super.prototype.unsubscribe.call(this);
  };

  Subscriber.prototype._next = function (value) {
    this.destination.next(value);
  };

  Subscriber.prototype._error = function (err) {
    this.destination.error(err);
    this.unsubscribe();
  };

  Subscriber.prototype._complete = function () {
    this.destination.complete();
    this.unsubscribe();
  };

  Subscriber.prototype._unsubscribeAndRecycle = function () {
    var _parentOrParents = this._parentOrParents;
    this._parentOrParents = null;
    this.unsubscribe();
    this.closed = false;
    this.isStopped = false;
    this._parentOrParents = _parentOrParents;
    return this;
  };

  return Subscriber;
}(_Subscription__WEBPACK_IMPORTED_MODULE_3__.Subscription);



var SafeSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__.__extends(SafeSubscriber, _super);

  function SafeSubscriber(_parentSubscriber, observerOrNext, error, complete) {
    var _this = _super.call(this) || this;

    _this._parentSubscriber = _parentSubscriber;
    var next;
    var context = _this;

    if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_4__.isFunction)(observerOrNext)) {
      next = observerOrNext;
    } else if (observerOrNext) {
      next = observerOrNext.next;
      error = observerOrNext.error;
      complete = observerOrNext.complete;

      if (observerOrNext !== _Observer__WEBPACK_IMPORTED_MODULE_1__.empty) {
        context = Object.create(observerOrNext);

        if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_4__.isFunction)(context.unsubscribe)) {
          _this.add(context.unsubscribe.bind(context));
        }

        context.unsubscribe = _this.unsubscribe.bind(_this);
      }
    }

    _this._context = context;
    _this._next = next;
    _this._error = error;
    _this._complete = complete;
    return _this;
  }

  SafeSubscriber.prototype.next = function (value) {
    if (!this.isStopped && this._next) {
      var _parentSubscriber = this._parentSubscriber;

      if (!_config__WEBPACK_IMPORTED_MODULE_5__.config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
        this.__tryOrUnsub(this._next, value);
      } else if (this.__tryOrSetError(_parentSubscriber, this._next, value)) {
        this.unsubscribe();
      }
    }
  };

  SafeSubscriber.prototype.error = function (err) {
    if (!this.isStopped) {
      var _parentSubscriber = this._parentSubscriber;
      var useDeprecatedSynchronousErrorHandling = _config__WEBPACK_IMPORTED_MODULE_5__.config.useDeprecatedSynchronousErrorHandling;

      if (this._error) {
        if (!useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
          this.__tryOrUnsub(this._error, err);

          this.unsubscribe();
        } else {
          this.__tryOrSetError(_parentSubscriber, this._error, err);

          this.unsubscribe();
        }
      } else if (!_parentSubscriber.syncErrorThrowable) {
        this.unsubscribe();

        if (useDeprecatedSynchronousErrorHandling) {
          throw err;
        }

        (0,_util_hostReportError__WEBPACK_IMPORTED_MODULE_6__.hostReportError)(err);
      } else {
        if (useDeprecatedSynchronousErrorHandling) {
          _parentSubscriber.syncErrorValue = err;
          _parentSubscriber.syncErrorThrown = true;
        } else {
          (0,_util_hostReportError__WEBPACK_IMPORTED_MODULE_6__.hostReportError)(err);
        }

        this.unsubscribe();
      }
    }
  };

  SafeSubscriber.prototype.complete = function () {
    var _this = this;

    if (!this.isStopped) {
      var _parentSubscriber = this._parentSubscriber;

      if (this._complete) {
        var wrappedComplete = function wrappedComplete() {
          return _this._complete.call(_this._context);
        };

        if (!_config__WEBPACK_IMPORTED_MODULE_5__.config.useDeprecatedSynchronousErrorHandling || !_parentSubscriber.syncErrorThrowable) {
          this.__tryOrUnsub(wrappedComplete);

          this.unsubscribe();
        } else {
          this.__tryOrSetError(_parentSubscriber, wrappedComplete);

          this.unsubscribe();
        }
      } else {
        this.unsubscribe();
      }
    }
  };

  SafeSubscriber.prototype.__tryOrUnsub = function (fn, value) {
    try {
      fn.call(this._context, value);
    } catch (err) {
      this.unsubscribe();

      if (_config__WEBPACK_IMPORTED_MODULE_5__.config.useDeprecatedSynchronousErrorHandling) {
        throw err;
      } else {
        (0,_util_hostReportError__WEBPACK_IMPORTED_MODULE_6__.hostReportError)(err);
      }
    }
  };

  SafeSubscriber.prototype.__tryOrSetError = function (parent, fn, value) {
    if (!_config__WEBPACK_IMPORTED_MODULE_5__.config.useDeprecatedSynchronousErrorHandling) {
      throw new Error('bad call');
    }

    try {
      fn.call(this._context, value);
    } catch (err) {
      if (_config__WEBPACK_IMPORTED_MODULE_5__.config.useDeprecatedSynchronousErrorHandling) {
        parent.syncErrorValue = err;
        parent.syncErrorThrown = true;
        return true;
      } else {
        (0,_util_hostReportError__WEBPACK_IMPORTED_MODULE_6__.hostReportError)(err);
        return true;
      }
    }

    return false;
  };

  SafeSubscriber.prototype._unsubscribe = function () {
    var _parentSubscriber = this._parentSubscriber;
    this._context = null;
    this._parentSubscriber = null;

    _parentSubscriber.unsubscribe();
  };

  return SafeSubscriber;
}(Subscriber);



/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/Subscription.js":
/*!**********************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/Subscription.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Subscription": () => (/* binding */ Subscription)
/* harmony export */ });
/* harmony import */ var _util_isArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/isArray */ "./node_modules/rxjs/_esm5/internal/util/isArray.js");
/* harmony import */ var _util_isObject__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./util/isObject */ "./node_modules/rxjs/_esm5/internal/util/isObject.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/isFunction */ "./node_modules/rxjs/_esm5/internal/util/isFunction.js");
/* harmony import */ var _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/UnsubscriptionError */ "./node_modules/rxjs/_esm5/internal/util/UnsubscriptionError.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/** PURE_IMPORTS_START _util_isArray,_util_isObject,_util_isFunction,_util_UnsubscriptionError PURE_IMPORTS_END */





var Subscription = /*@__PURE__*/function () {
  function Subscription(unsubscribe) {
    this.closed = false;
    this._parentOrParents = null;
    this._subscriptions = null;

    if (unsubscribe) {
      this._ctorUnsubscribe = true;
      this._unsubscribe = unsubscribe;
    }
  }

  Subscription.prototype.unsubscribe = function () {
    var errors;

    if (this.closed) {
      return;
    }

    var _a = this,
        _parentOrParents = _a._parentOrParents,
        _ctorUnsubscribe = _a._ctorUnsubscribe,
        _unsubscribe = _a._unsubscribe,
        _subscriptions = _a._subscriptions;

    this.closed = true;
    this._parentOrParents = null;
    this._subscriptions = null;

    if (_parentOrParents instanceof Subscription) {
      _parentOrParents.remove(this);
    } else if (_parentOrParents !== null) {
      for (var index = 0; index < _parentOrParents.length; ++index) {
        var parent_1 = _parentOrParents[index];
        parent_1.remove(this);
      }
    }

    if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(_unsubscribe)) {
      if (_ctorUnsubscribe) {
        this._unsubscribe = undefined;
      }

      try {
        _unsubscribe.call(this);
      } catch (e) {
        errors = e instanceof _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_1__.UnsubscriptionError ? flattenUnsubscriptionErrors(e.errors) : [e];
      }
    }

    if ((0,_util_isArray__WEBPACK_IMPORTED_MODULE_2__.isArray)(_subscriptions)) {
      var index = -1;
      var len = _subscriptions.length;

      while (++index < len) {
        var sub = _subscriptions[index];

        if ((0,_util_isObject__WEBPACK_IMPORTED_MODULE_3__.isObject)(sub)) {
          try {
            sub.unsubscribe();
          } catch (e) {
            errors = errors || [];

            if (e instanceof _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_1__.UnsubscriptionError) {
              errors = errors.concat(flattenUnsubscriptionErrors(e.errors));
            } else {
              errors.push(e);
            }
          }
        }
      }
    }

    if (errors) {
      throw new _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_1__.UnsubscriptionError(errors);
    }
  };

  Subscription.prototype.add = function (teardown) {
    var subscription = teardown;

    if (!teardown) {
      return Subscription.EMPTY;
    }

    switch (_typeof(teardown)) {
      case 'function':
        subscription = new Subscription(teardown);

      case 'object':
        if (subscription === this || subscription.closed || typeof subscription.unsubscribe !== 'function') {
          return subscription;
        } else if (this.closed) {
          subscription.unsubscribe();
          return subscription;
        } else if (!(subscription instanceof Subscription)) {
          var tmp = subscription;
          subscription = new Subscription();
          subscription._subscriptions = [tmp];
        }

        break;

      default:
        {
          throw new Error('unrecognized teardown ' + teardown + ' added to Subscription.');
        }
    }

    var _parentOrParents = subscription._parentOrParents;

    if (_parentOrParents === null) {
      subscription._parentOrParents = this;
    } else if (_parentOrParents instanceof Subscription) {
      if (_parentOrParents === this) {
        return subscription;
      }

      subscription._parentOrParents = [_parentOrParents, this];
    } else if (_parentOrParents.indexOf(this) === -1) {
      _parentOrParents.push(this);
    } else {
      return subscription;
    }

    var subscriptions = this._subscriptions;

    if (subscriptions === null) {
      this._subscriptions = [subscription];
    } else {
      subscriptions.push(subscription);
    }

    return subscription;
  };

  Subscription.prototype.remove = function (subscription) {
    var subscriptions = this._subscriptions;

    if (subscriptions) {
      var subscriptionIndex = subscriptions.indexOf(subscription);

      if (subscriptionIndex !== -1) {
        subscriptions.splice(subscriptionIndex, 1);
      }
    }
  };

  Subscription.EMPTY = function (empty) {
    empty.closed = true;
    return empty;
  }(new Subscription());

  return Subscription;
}();



function flattenUnsubscriptionErrors(errors) {
  return errors.reduce(function (errs, err) {
    return errs.concat(err instanceof _util_UnsubscriptionError__WEBPACK_IMPORTED_MODULE_1__.UnsubscriptionError ? err.errors : err);
  }, []);
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/config.js":
/*!****************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/config.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": () => (/* binding */ config)
/* harmony export */ });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var _enable_super_gross_mode_that_will_cause_bad_things = false;
var config = {
  Promise: undefined,

  set useDeprecatedSynchronousErrorHandling(value) {
    if (value) {
      var error = /*@__PURE__*/new Error();
      /*@__PURE__*/

      console.warn('DEPRECATED! RxJS was set to use deprecated synchronous error handling behavior by code at: \n' + error.stack);
    } else if (_enable_super_gross_mode_that_will_cause_bad_things) {
      /*@__PURE__*/
      console.log('RxJS: Back to a better error behavior. Thank you. <3');
    }

    _enable_super_gross_mode_that_will_cause_bad_things = value;
  },

  get useDeprecatedSynchronousErrorHandling() {
    return _enable_super_gross_mode_that_will_cause_bad_things;
  }

};

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/observable/fromEvent.js":
/*!******************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/observable/fromEvent.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fromEvent": () => (/* binding */ fromEvent)
/* harmony export */ });
/* harmony import */ var _Observable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Observable */ "./node_modules/rxjs/_esm5/internal/Observable.js");
/* harmony import */ var _util_isArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../util/isArray */ "./node_modules/rxjs/_esm5/internal/util/isArray.js");
/* harmony import */ var _util_isFunction__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/isFunction */ "./node_modules/rxjs/_esm5/internal/util/isFunction.js");
/* harmony import */ var _operators_map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../operators/map */ "./node_modules/rxjs/_esm5/internal/operators/map.js");
/** PURE_IMPORTS_START _Observable,_util_isArray,_util_isFunction,_operators_map PURE_IMPORTS_END */





var toString = /*@__PURE__*/function () {
  return Object.prototype.toString;
}();

function fromEvent(target, eventName, options, resultSelector) {
  if ((0,_util_isFunction__WEBPACK_IMPORTED_MODULE_0__.isFunction)(options)) {
    resultSelector = options;
    options = undefined;
  }

  if (resultSelector) {
    return fromEvent(target, eventName, options).pipe((0,_operators_map__WEBPACK_IMPORTED_MODULE_1__.map)(function (args) {
      return (0,_util_isArray__WEBPACK_IMPORTED_MODULE_2__.isArray)(args) ? resultSelector.apply(void 0, args) : resultSelector(args);
    }));
  }

  return new _Observable__WEBPACK_IMPORTED_MODULE_3__.Observable(function (subscriber) {
    function handler(e) {
      if (arguments.length > 1) {
        subscriber.next(Array.prototype.slice.call(arguments));
      } else {
        subscriber.next(e);
      }
    }

    setupSubscription(target, eventName, handler, subscriber, options);
  });
}

function setupSubscription(sourceObj, eventName, handler, subscriber, options) {
  var unsubscribe;

  if (isEventTarget(sourceObj)) {
    var source_1 = sourceObj;
    sourceObj.addEventListener(eventName, handler, options);

    unsubscribe = function unsubscribe() {
      return source_1.removeEventListener(eventName, handler, options);
    };
  } else if (isJQueryStyleEventEmitter(sourceObj)) {
    var source_2 = sourceObj;
    sourceObj.on(eventName, handler);

    unsubscribe = function unsubscribe() {
      return source_2.off(eventName, handler);
    };
  } else if (isNodeStyleEventEmitter(sourceObj)) {
    var source_3 = sourceObj;
    sourceObj.addListener(eventName, handler);

    unsubscribe = function unsubscribe() {
      return source_3.removeListener(eventName, handler);
    };
  } else if (sourceObj && sourceObj.length) {
    for (var i = 0, len = sourceObj.length; i < len; i++) {
      setupSubscription(sourceObj[i], eventName, handler, subscriber, options);
    }
  } else {
    throw new TypeError('Invalid event target');
  }

  subscriber.add(unsubscribe);
}

function isNodeStyleEventEmitter(sourceObj) {
  return sourceObj && typeof sourceObj.addListener === 'function' && typeof sourceObj.removeListener === 'function';
}

function isJQueryStyleEventEmitter(sourceObj) {
  return sourceObj && typeof sourceObj.on === 'function' && typeof sourceObj.off === 'function';
}

function isEventTarget(sourceObj) {
  return sourceObj && typeof sourceObj.addEventListener === 'function' && typeof sourceObj.removeEventListener === 'function';
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/operators/map.js":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/operators/map.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "map": () => (/* binding */ map),
/* harmony export */   "MapOperator": () => (/* binding */ MapOperator)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/** PURE_IMPORTS_START tslib,_Subscriber PURE_IMPORTS_END */


function map(project, thisArg) {
  return function mapOperation(source) {
    if (typeof project !== 'function') {
      throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
    }

    return source.lift(new MapOperator(project, thisArg));
  };
}

var MapOperator = /*@__PURE__*/function () {
  function MapOperator(project, thisArg) {
    this.project = project;
    this.thisArg = thisArg;
  }

  MapOperator.prototype.call = function (subscriber, source) {
    return source.subscribe(new MapSubscriber(subscriber, this.project, this.thisArg));
  };

  return MapOperator;
}();



var MapSubscriber = /*@__PURE__*/function (_super) {
  tslib__WEBPACK_IMPORTED_MODULE_0__.__extends(MapSubscriber, _super);

  function MapSubscriber(destination, project, thisArg) {
    var _this = _super.call(this, destination) || this;

    _this.project = project;
    _this.count = 0;
    _this.thisArg = thisArg || _this;
    return _this;
  }

  MapSubscriber.prototype._next = function (value) {
    var result;

    try {
      result = this.project.call(this.thisArg, value, this.count++);
    } catch (err) {
      this.destination.error(err);
      return;
    }

    this.destination.next(result);
  };

  return MapSubscriber;
}(_Subscriber__WEBPACK_IMPORTED_MODULE_1__.Subscriber);

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/symbol/observable.js":
/*!***************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/symbol/observable.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "observable": () => (/* binding */ observable)
/* harmony export */ });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var observable = /*@__PURE__*/function () {
  return typeof Symbol === 'function' && Symbol.observable || '@@observable';
}();

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/symbol/rxSubscriber.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/symbol/rxSubscriber.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "rxSubscriber": () => (/* binding */ rxSubscriber),
/* harmony export */   "$$rxSubscriber": () => (/* binding */ $$rxSubscriber)
/* harmony export */ });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var rxSubscriber = /*@__PURE__*/function () {
  return typeof Symbol === 'function' ? /*@__PURE__*/Symbol('rxSubscriber') : '@@rxSubscriber_' + /*@__PURE__*/Math.random();
}();
var $$rxSubscriber = rxSubscriber;

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/util/UnsubscriptionError.js":
/*!**********************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/util/UnsubscriptionError.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UnsubscriptionError": () => (/* binding */ UnsubscriptionError)
/* harmony export */ });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var UnsubscriptionErrorImpl = /*@__PURE__*/function () {
  function UnsubscriptionErrorImpl(errors) {
    Error.call(this);
    this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function (err, i) {
      return i + 1 + ") " + err.toString();
    }).join('\n  ') : '';
    this.name = 'UnsubscriptionError';
    this.errors = errors;
    return this;
  }

  UnsubscriptionErrorImpl.prototype = /*@__PURE__*/Object.create(Error.prototype);
  return UnsubscriptionErrorImpl;
}();

var UnsubscriptionError = UnsubscriptionErrorImpl;

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/util/canReportError.js":
/*!*****************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/util/canReportError.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "canReportError": () => (/* binding */ canReportError)
/* harmony export */ });
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/** PURE_IMPORTS_START _Subscriber PURE_IMPORTS_END */

function canReportError(observer) {
  while (observer) {
    var _a = observer,
        closed_1 = _a.closed,
        destination = _a.destination,
        isStopped = _a.isStopped;

    if (closed_1 || isStopped) {
      return false;
    } else if (destination && destination instanceof _Subscriber__WEBPACK_IMPORTED_MODULE_0__.Subscriber) {
      observer = destination;
    } else {
      observer = null;
    }
  }

  return true;
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/util/hostReportError.js":
/*!******************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/util/hostReportError.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hostReportError": () => (/* binding */ hostReportError)
/* harmony export */ });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function hostReportError(err) {
  setTimeout(function () {
    throw err;
  }, 0);
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/util/identity.js":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/util/identity.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "identity": () => (/* binding */ identity)
/* harmony export */ });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function identity(x) {
  return x;
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/util/isArray.js":
/*!**********************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/util/isArray.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isArray": () => (/* binding */ isArray)
/* harmony export */ });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
var isArray = /*@__PURE__*/function () {
  return Array.isArray || function (x) {
    return x && typeof x.length === 'number';
  };
}();

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/util/isFunction.js":
/*!*************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/util/isFunction.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isFunction": () => (/* binding */ isFunction)
/* harmony export */ });
/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isFunction(x) {
  return typeof x === 'function';
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/util/isObject.js":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/util/isObject.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isObject": () => (/* binding */ isObject)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/** PURE_IMPORTS_START  PURE_IMPORTS_END */
function isObject(x) {
  return x !== null && _typeof(x) === 'object';
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/util/pipe.js":
/*!*******************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/util/pipe.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "pipe": () => (/* binding */ pipe),
/* harmony export */   "pipeFromArray": () => (/* binding */ pipeFromArray)
/* harmony export */ });
/* harmony import */ var _identity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./identity */ "./node_modules/rxjs/_esm5/internal/util/identity.js");
/** PURE_IMPORTS_START _identity PURE_IMPORTS_END */

function pipe() {
  var fns = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    fns[_i] = arguments[_i];
  }

  return pipeFromArray(fns);
}
function pipeFromArray(fns) {
  if (fns.length === 0) {
    return _identity__WEBPACK_IMPORTED_MODULE_0__.identity;
  }

  if (fns.length === 1) {
    return fns[0];
  }

  return function piped(input) {
    return fns.reduce(function (prev, fn) {
      return fn(prev);
    }, input);
  };
}

/***/ }),

/***/ "./node_modules/rxjs/_esm5/internal/util/toSubscriber.js":
/*!***************************************************************!*\
  !*** ./node_modules/rxjs/_esm5/internal/util/toSubscriber.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "toSubscriber": () => (/* binding */ toSubscriber)
/* harmony export */ });
/* harmony import */ var _Subscriber__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Subscriber */ "./node_modules/rxjs/_esm5/internal/Subscriber.js");
/* harmony import */ var _symbol_rxSubscriber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../symbol/rxSubscriber */ "./node_modules/rxjs/_esm5/internal/symbol/rxSubscriber.js");
/* harmony import */ var _Observer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Observer */ "./node_modules/rxjs/_esm5/internal/Observer.js");
/** PURE_IMPORTS_START _Subscriber,_symbol_rxSubscriber,_Observer PURE_IMPORTS_END */



function toSubscriber(nextOrObserver, error, complete) {
  if (nextOrObserver) {
    if (nextOrObserver instanceof _Subscriber__WEBPACK_IMPORTED_MODULE_0__.Subscriber) {
      return nextOrObserver;
    }

    if (nextOrObserver[_symbol_rxSubscriber__WEBPACK_IMPORTED_MODULE_1__.rxSubscriber]) {
      return nextOrObserver[_symbol_rxSubscriber__WEBPACK_IMPORTED_MODULE_1__.rxSubscriber]();
    }
  }

  if (!nextOrObserver && !error && !complete) {
    return new _Subscriber__WEBPACK_IMPORTED_MODULE_0__.Subscriber(_Observer__WEBPACK_IMPORTED_MODULE_2__.empty);
  }

  return new _Subscriber__WEBPACK_IMPORTED_MODULE_0__.Subscriber(nextOrObserver, error, complete);
}

/***/ }),

/***/ "./node_modules/rxjs/node_modules/tslib/tslib.es6.js":
/*!***********************************************************!*\
  !*** ./node_modules/rxjs/node_modules/tslib/tslib.es6.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__extends": () => (/* binding */ __extends),
/* harmony export */   "__assign": () => (/* binding */ _assign),
/* harmony export */   "__rest": () => (/* binding */ __rest),
/* harmony export */   "__decorate": () => (/* binding */ __decorate),
/* harmony export */   "__param": () => (/* binding */ __param),
/* harmony export */   "__metadata": () => (/* binding */ __metadata),
/* harmony export */   "__awaiter": () => (/* binding */ __awaiter),
/* harmony export */   "__generator": () => (/* binding */ __generator),
/* harmony export */   "__createBinding": () => (/* binding */ __createBinding),
/* harmony export */   "__exportStar": () => (/* binding */ __exportStar),
/* harmony export */   "__values": () => (/* binding */ __values),
/* harmony export */   "__read": () => (/* binding */ __read),
/* harmony export */   "__spread": () => (/* binding */ __spread),
/* harmony export */   "__spreadArrays": () => (/* binding */ __spreadArrays),
/* harmony export */   "__await": () => (/* binding */ __await),
/* harmony export */   "__asyncGenerator": () => (/* binding */ __asyncGenerator),
/* harmony export */   "__asyncDelegator": () => (/* binding */ __asyncDelegator),
/* harmony export */   "__asyncValues": () => (/* binding */ __asyncValues),
/* harmony export */   "__makeTemplateObject": () => (/* binding */ __makeTemplateObject),
/* harmony export */   "__importStar": () => (/* binding */ __importStar),
/* harmony export */   "__importDefault": () => (/* binding */ __importDefault),
/* harmony export */   "__classPrivateFieldGet": () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   "__classPrivateFieldSet": () => (/* binding */ __classPrivateFieldSet)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

/* global Reflect, Promise */
var _extendStatics = function extendStatics(d, b) {
  _extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) {
      if (b.hasOwnProperty(p)) d[p] = b[p];
    }
  };

  return _extendStatics(d, b);
};

function __extends(d, b) {
  _extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var _assign = function __assign() {
  _assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return _assign.apply(this, arguments);
};


function __rest(s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}
function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __param(paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
}
function __metadata(metadataKey, metadataValue) {
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
function __generator(thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}
function __createBinding(o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
}
function __exportStar(m, exports) {
  for (var p in m) {
    if (p !== "default" && !exports.hasOwnProperty(p)) exports[p] = m[p];
  }
}
function __values(o) {
  var s = typeof Symbol === "function" && Symbol.iterator,
      m = s && o[s],
      i = 0;
  if (m) return m.call(o);
  if (o && typeof o.length === "number") return {
    next: function next() {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
  throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) {
      ar.push(r.value);
    }
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
}
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) {
    ar = ar.concat(__read(arguments[i]));
  }

  return ar;
}
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
}
;
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []),
      i,
      q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i;

  function verb(n) {
    if (g[n]) i[n] = function (v) {
      return new Promise(function (a, b) {
        q.push([n, v, a, b]) > 1 || resume(n, v);
      });
    };
  }

  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }

  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }

  function fulfill(value) {
    resume("next", value);
  }

  function reject(value) {
    resume("throw", value);
  }

  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
}
function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function () {
    return this;
  }, i;

  function verb(n, f) {
    i[n] = o[n] ? function (v) {
      return (p = !p) ? {
        value: __await(o[n](v)),
        done: n === "return"
      } : f ? f(v) : v;
    } : f;
  }
}
function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator],
      i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i);

  function verb(n) {
    i[n] = o[n] && function (v) {
      return new Promise(function (resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }

  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function (v) {
      resolve({
        value: v,
        done: d
      });
    }, reject);
  }
}
function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", {
      value: raw
    });
  } else {
    cooked.raw = raw;
  }

  return cooked;
}
;
function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  }
  result["default"] = mod;
  return result;
}
function __importDefault(mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
}
function __classPrivateFieldGet(receiver, privateMap) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  return privateMap.get(receiver);
}
function __classPrivateFieldSet(receiver, privateMap, value) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to set private field on non-instance");
  }

  privateMap.set(receiver, value);
  return value;
}

/***/ }),

/***/ "./css/main.css":
/*!**********************!*\
  !*** ./css/main.css ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/tankbrigade.png":
/*!***********************************!*\
  !*** ./resources/tankbrigade.png ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "e24e6cca025414826060.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*******************************!*\
  !*** ./src/extreem-engine.js ***!
  \*******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _resources_tankbrigade_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../resources/tankbrigade.png */ "./resources/tankbrigade.png");
/* harmony import */ var _css_main_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../css/main.css */ "./css/main.css");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/internal/observable/fromEvent.js");
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @author whtoo
 * @create_date 2013-11-20
 * @revise_date 2021-04-13
 */




var GameManager = function GameManager(render, options) {
  _classCallCheck(this, GameManager);
};

var GraphicRender = /*#__PURE__*/function () {
  function GraphicRender(dom, options) {
    _classCallCheck(this, GraphicRender);

    this._dom = dom || null;
    this._options = options || null;
  }

  _createClass(GraphicRender, [{
    key: "dom",
    get: function get() {
      return this._dom;
    },
    set: function set(dom) {
      this._dom = dom;
    }
  }, {
    key: "options",
    get: function get() {
      return this._options;
    },
    set: function set(options) {
      this._options = options;
    }
  }, {
    key: "render",
    value: function render(renderTree) {}
  }]);

  return GraphicRender;
}();

_defineProperty(GraphicRender, "instance", new GraphicRender(document.getElementById('canvas'), {}));

function setupGame() {
  window.addEventListener('load', eventWindowLoaded, false);

  function eventWindowLoaded() {
    canvasApp();
  }

  function canvasSupport() {
    return true;
  }

  function canvasApp() {
    if (!canvasSupport()) {
      return;
    } else {
      var theCanvas = document.getElementById("canvas");
      window.context = theCanvas.getContext("2d");
      window.gameManager = new GameObjManager();
      window.render = new Render();
      window.apControl = new APWatcher();
    }
  }
}

function KeyInputEvent(key, code) {
  this.key = key;
  this.code = code;
}

function APWatcher() {
  var gm = window.gameManager;
  var body = document.querySelector('body');

  var keyWatchDown = function keyWatchDown(e) {
    var player = gm.gameObjects[0];
    var cmd = gm.cmd;

    if (cmd.stop) {
      cmd.stop = false;
    }

    switch (e.which) {
      case 119:
        console.log('press w');

        if (player.destY > 0) {
          player.rotationAP('w', cmd);
        }

        break;

      case 115:
        console.log('press s');

        if (player.destY < 13) {
          player.rotationAP('s', cmd);
        }

        break;

      case 97:
        console.log('press a');

        if (player.destX > 0) {
          player.rotationAP('a', cmd);
        }

        break;

      case 100:
        console.log('press d');

        if (player.destX < 24) {
          player.rotationAP('d', cmd);
        }

        break;

      default:
        //console.log('press other');
        break;
    }
  };

  var keyWatcherUp = function keyWatcherUp(e) {
    gm.cmd.stop = true;
    gm.cmd.nextX = gm.cmd.nextY = 0;
  };

  body.onkeyup = keyWatcherUp;
  body.onkeypress = keyWatchDown;
}

function GameObjManager() {
  var objList = [];

  for (var i = 0; i < 1; i++) {
    var player = new TankPlayer('Tank' + i, 'w', 0);
    player.animSheet = new SpriteAnimSheet(3, 9, 16);
    objList.push(player);
  }

  this.gameObjects = objList;
  this.cmd = {
    nextX: 0,
    nextY: 0,
    stop: true
  };
  this.isInited = 0;
} //动画图册


function SpriteAnimSheet(startAnim, stopAnim, X) {
  this.animationFrames = new Array();
  this.animLength = stopAnim - startAnim + 1;
  this.orderIndex = 0;

  for (var i = 0; i < this.animLength; i++) {
    var item = new SpriteAnimation(X, i + startAnim);
    this.animationFrames.push(item);
  }
}

SpriteAnimSheet.prototype.getFrames = function () {
  return this.animationFrames[this.orderIndex % this.animLength];
}; //单桢动画


function SpriteAnimation(sX, sY) {
  this.sourceDx = sX * 33;
  this.sourceDy = sY * 33;
  this.sourceW = 33;
  this.sourceH = 33;
}

function Player() {
  this.sourceDx = 528;
  this.sourceDy = 99;
  this.sourceW = 33;
  this.sourceH = 33;
  this.animSheet = null;
}

function TankPlayer(tankID, initDirection, isUser) {
  //w 4,d 1,s 2,a 3
  this.direction = initDirection;
  this.tankName = tankID;
  this.isPlayer = isUser; // this.destX = (Math.floor(Math.random()*100) % 23) * 33;
  // 	this.destY = (Math.floor(Math.random()*100) % 13) * 33;

  this.destCook = 33;
  this.destX = 6;
  this.destY = 4;
  this.destW = 33;
  this.destH = 33;
  this.arc = 0;
  this.X = this.destX * this.destCook;
  this.Y = this.destY * this.destCook;
  this.centerX = this.X + this.destW * 0.5;
  this.centerY = this.Y + this.destH * 0.5;
}

TankPlayer.prototype = new Player();
TankPlayer.prototype.constructor = TankPlayer;
TankPlayer.prototype.speedM = 6;

TankPlayer.prototype.updateSelfCoor = function () {
  this.X = this.destX * this.destCook;
  this.Y = this.destY * this.destCook;
  this.centerX = this.X + this.destW * 0.5;
  this.centerY = this.Y + this.destH * 0.5;
};

var per = 0;
per = TankPlayer.prototype.speedM / 60;

TankPlayer.prototype.rotationAP = function (direction, cmd) {
  if (direction != this.direction) {
    cmd.nextX = cmd.nextY = 0;

    switch (direction) {
      case 'w':
        //console.log('press wT');
        this.arc = 270;
        break;

      case 's':
        //console.log('press sT');
        this.arc = 90;
        break;

      case 'a':
        //console.log('press aT');
        this.arc = 180;
        break;

      case 'd':
        //console.log('press dT');
        this.arc = 0;
        break;

      default:
        //console.log('press otherT');
        break;
    }

    this.direction = direction;
  } else {
    if (cmd.stop === false) {
      this.animSheet.orderIndex++;

      switch (direction) {
        case 'w':
          // console.log('press wT');
          cmd.nextY -= per * this.speedM; //this.destY -= this.speed;

          break;

        case 's':
          //console.log('press sT');
          cmd.nextY += per * this.speedM; //this.destY += this.speed;

          break;

        case 'a':
          // console.log('press aT');
          cmd.nextX -= per * this.speedM; //this.destX -= this.speed;

          break;

        case 'd':
          cmd.nextX += per * this.speedM; //console.log('press dT');
          //this.destX +=  this.speed;

          break;

        default:
          //console.log('press otherT');
          break;
      }
    }

    this.direction = direction;
    this.updateSelfCoor();
  }
};

var ImageResouce = /*#__PURE__*/function () {
  function ImageResouce(url) {
    var _this = this;

    _classCallCheck(this, ImageResouce);

    this.url = url;
    this.img = new Image();
    (0,rxjs__WEBPACK_IMPORTED_MODULE_2__.fromEvent)(this.img, 'load').subscribe(function (evt) {
      _this._onLoad(evt);
    });
    this.img.src = this.url;
  }

  _createClass(ImageResouce, [{
    key: "_onLoad",
    value: function _onLoad(evt) {
      if (this.cb) {
        this.cb(this.img);
      }
    }
  }, {
    key: "onLoad",
    value: function onLoad(func) {
      this.cb = func;
    }
  }, {
    key: "image",
    value: function image() {
      return this.img;
    }
  }]);

  return ImageResouce;
}(); //Render Object Def


function Render() {
  var _ = new ImageResouce(_resources_tankbrigade_png__WEBPACK_IMPORTED_MODULE_0__).onLoad(eventShipLoaded.bind(this));

  function eventShipLoaded(res) {
    this.tileSheet = res;
    this.init();
  }
}

window.requestAnimFrame = function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback, element) {
    window.setTimeout(callback, 1000 / 60);
  };
}();

var lastTime = new Date();
var offscreenCanvas = document.createElement('canvas');
offscreenCanvas.width = 800;
offscreenCanvas.height = 500;
var offscreenContext = offscreenCanvas.getContext('2d');

function calculateFps() {
  var now = +new Date(),
      fps = 1000 / (now - lastTime);
  lastTime = now;
  return fps;
}

function offscreenCache(contextRef) {
  offscreenContext.fillStyle = "#aaaaaa";
  var mapRows = 13;
  var mapCols = 24;
  offscreenContext.fillRect(0, 0, (mapCols - 1) * 33, mapRows * 33);
  var mapTitle = contextRef.mapTitle;
  var mapIndexOffset = -1;

  for (var rowCtr = 0; rowCtr < mapRows; rowCtr++) {
    for (var colCtr = 0; colCtr < mapCols; colCtr++) {
      var tileId = mapTitle[rowCtr][colCtr] + mapIndexOffset;
      var sourceX = parseInt(tileId % mapCols) * 33; //tmx use line-based count

      var sourceY = parseInt(tileId / mapCols) * 33; // stretch tile will earase line.

      offscreenContext.drawImage(contextRef.tileSheet, sourceX, sourceY, 32, 32, colCtr * 33, rowCtr * 33, 33, 33);
    }
  }
} //Render Object prototype Def


Render.prototype = {
  constructor: Render,
  mapTitle: [[78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 78, 55, 78, 78, 78, 78], [102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 55, 102, 102, 102, 102], [102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 55, 102, 102, 102, 102], [102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 55, 102, 102, 102, 102], [102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 100, 100, 100, 100, 55, 102, 102, 102, 102], [102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 100, 100, 100, 100, 55, 102, 102, 102, 102], [102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 55, 102, 102, 102, 102], [102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 55, 102, 102, 102, 102], [102, 102, 100, 100, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 55, 102, 102, 102, 102], [102, 102, 100, 100, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 55, 102, 102, 102, 102], [102, 102, 100, 100, 102, 102, 102, 102, 60, 60, 60, 60, 102, 102, 102, 102, 102, 102, 55, 102, 102, 102, 102], [102, 102, 102, 102, 102, 102, 102, 102, 60, 74, 74, 60, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102], [102, 102, 102, 102, 102, 102, 102, 102, 60, 74, 74, 60, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102, 102]],
  init: function init() {
    offscreenCache(this);
    window.requestAnimFrame(this.drawScreen); //		this.drawScreen();
  },
  drawScreen: function drawScreen() {
    var tileSheet = window.render.tileSheet;
    window.context.clearRect(0, 0, 800, 600);
    window.render.drawMap(tileSheet);
    window.render.drawPlayer(tileSheet, gameManager.cmd);
    context.fillStyle = 'cornflowerblue';
    context.fillText(calculateFps().toFixed() + ' fps', 20, 60);
    window.requestAnimFrame(Render.prototype.drawScreen.bind(this));
  },
  drawPlayer: function drawPlayer(tileSheet, cmd) {
    var players = window.gameManager.gameObjects;
    var item;

    for (var i = 0; i < players.length; i++) {
      item = players[i];

      if (cmd.stop === false) {
        switch (item.direction) {
          case 'w':
            console.log('press wT');
            cmd.nextY += per;
            item.destY -= per;
            break;

          case 's':
            console.log('press sT');
            cmd.nextY -= per;
            item.destY += per;
            break;

          case 'a':
            console.log('press aT');
            cmd.nextX += per;
            item.destX -= per;
            break;

          case 'd':
            console.log('press aD');
            cmd.nextX -= per;
            item.destX += per;
            break;

          default:
            console.log('press otherT');
            break;
        }
      }

      item.updateSelfCoor();
    }

    var angleInRadians = item.arc / 180 * Math.PI;
    var animFrame = item.animSheet.getFrames(); //            console.log(animFrame);

    window.context.save(); //console.log("X:"+item.centerX+"+Y:"+item.centerY)

    window.context.translate(item.centerX, item.centerY);
    window.context.rotate(angleInRadians);
    window.context.drawImage(tileSheet, animFrame.sourceDx, animFrame.sourceDy, animFrame.sourceW, animFrame.sourceH, -item.destW / 2, -item.destH / 2, item.destW, item.destH);
    window.context.restore();
  },
  drawMap: function drawMap(tileSheet) {
    //draw a background so we can see the Canvas edges 
    window.context.drawImage(offscreenCanvas, 0, 0, offscreenCanvas.width, offscreenCanvas.height);
  }
};
setupGame();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (setupGame);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qc190YW5rX2dhbWUvLi4vc3JjL2ludGVybmFsL09ic2VydmFibGUudHMiLCJ3ZWJwYWNrOi8vanNfdGFua19nYW1lLy4uL3NyYy9pbnRlcm5hbC9PYnNlcnZlci50cyIsIndlYnBhY2s6Ly9qc190YW5rX2dhbWUvLi4vc3JjL2ludGVybmFsL1N1YnNjcmliZXIudHMiLCJ3ZWJwYWNrOi8vanNfdGFua19nYW1lLy4uL3NyYy9pbnRlcm5hbC9TdWJzY3JpcHRpb24udHMiLCJ3ZWJwYWNrOi8vanNfdGFua19nYW1lLy4uL3NyYy9pbnRlcm5hbC9jb25maWcudHMiLCJ3ZWJwYWNrOi8vanNfdGFua19nYW1lLy4uL3NyYy9pbnRlcm5hbC9vYnNlcnZhYmxlL2Zyb21FdmVudC50cyIsIndlYnBhY2s6Ly9qc190YW5rX2dhbWUvLi4vc3JjL2ludGVybmFsL29wZXJhdG9ycy9tYXAudHMiLCJ3ZWJwYWNrOi8vanNfdGFua19nYW1lLy4uL3NyYy9pbnRlcm5hbC9zeW1ib2wvb2JzZXJ2YWJsZS50cyIsIndlYnBhY2s6Ly9qc190YW5rX2dhbWUvLi4vc3JjL2ludGVybmFsL3N5bWJvbC9yeFN1YnNjcmliZXIudHMiLCJ3ZWJwYWNrOi8vanNfdGFua19nYW1lLy4uL3NyYy9pbnRlcm5hbC91dGlsL1Vuc3Vic2NyaXB0aW9uRXJyb3IudHMiLCJ3ZWJwYWNrOi8vanNfdGFua19nYW1lLy4uL3NyYy9pbnRlcm5hbC91dGlsL2NhblJlcG9ydEVycm9yLnRzIiwid2VicGFjazovL2pzX3RhbmtfZ2FtZS8uLi9zcmMvaW50ZXJuYWwvdXRpbC9ob3N0UmVwb3J0RXJyb3IudHMiLCJ3ZWJwYWNrOi8vanNfdGFua19nYW1lLy4uL3NyYy9pbnRlcm5hbC91dGlsL2lkZW50aXR5LnRzIiwid2VicGFjazovL2pzX3RhbmtfZ2FtZS8uLi9zcmMvaW50ZXJuYWwvdXRpbC9pc0FycmF5LnRzIiwid2VicGFjazovL2pzX3RhbmtfZ2FtZS8uLi9zcmMvaW50ZXJuYWwvdXRpbC9pc0Z1bmN0aW9uLnRzIiwid2VicGFjazovL2pzX3RhbmtfZ2FtZS8uLi9zcmMvaW50ZXJuYWwvdXRpbC9pc09iamVjdC50cyIsIndlYnBhY2s6Ly9qc190YW5rX2dhbWUvLi4vc3JjL2ludGVybmFsL3V0aWwvcGlwZS50cyIsIndlYnBhY2s6Ly9qc190YW5rX2dhbWUvLi4vc3JjL2ludGVybmFsL3V0aWwvdG9TdWJzY3JpYmVyLnRzIiwid2VicGFjazovL2pzX3RhbmtfZ2FtZS8uL25vZGVfbW9kdWxlcy9yeGpzL25vZGVfbW9kdWxlcy90c2xpYi90c2xpYi5lczYuanMiLCJ3ZWJwYWNrOi8vanNfdGFua19nYW1lLy4vY3NzL21haW4uY3NzPzFhZDYiLCJ3ZWJwYWNrOi8vanNfdGFua19nYW1lL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2pzX3RhbmtfZ2FtZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vanNfdGFua19nYW1lL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vanNfdGFua19nYW1lL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vanNfdGFua19nYW1lL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vanNfdGFua19nYW1lL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2pzX3RhbmtfZ2FtZS8uL3NyYy9leHRyZWVtLWVuZ2luZS5qcyJdLCJuYW1lcyI6WyJleHRlbmRTdGF0aWNzIiwiZCIsImIiLCJPYmplY3QiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsIkFycmF5IiwicCIsImhhc093blByb3BlcnR5IiwiX19leHRlbmRzIiwiX18iLCJjb25zdHJ1Y3RvciIsInByb3RvdHlwZSIsImNyZWF0ZSIsIl9fYXNzaWduIiwiYXNzaWduIiwidCIsInMiLCJpIiwibiIsImFyZ3VtZW50cyIsImxlbmd0aCIsImNhbGwiLCJhcHBseSIsIl9fcmVzdCIsImUiLCJpbmRleE9mIiwiZ2V0T3duUHJvcGVydHlTeW1ib2xzIiwicHJvcGVydHlJc0VudW1lcmFibGUiLCJfX2RlY29yYXRlIiwiZGVjb3JhdG9ycyIsInRhcmdldCIsImtleSIsImRlc2MiLCJjIiwiciIsImdldE93blByb3BlcnR5RGVzY3JpcHRvciIsIlJlZmxlY3QiLCJkZWNvcmF0ZSIsImRlZmluZVByb3BlcnR5IiwiX19wYXJhbSIsInBhcmFtSW5kZXgiLCJkZWNvcmF0b3IiLCJfX21ldGFkYXRhIiwibWV0YWRhdGFLZXkiLCJtZXRhZGF0YVZhbHVlIiwibWV0YWRhdGEiLCJfX2F3YWl0ZXIiLCJ0aGlzQXJnIiwiX2FyZ3VtZW50cyIsIlAiLCJnZW5lcmF0b3IiLCJhZG9wdCIsInZhbHVlIiwicmVzb2x2ZSIsIlByb21pc2UiLCJyZWplY3QiLCJmdWxmaWxsZWQiLCJzdGVwIiwibmV4dCIsInJlamVjdGVkIiwicmVzdWx0IiwiZG9uZSIsInRoZW4iLCJfX2dlbmVyYXRvciIsImJvZHkiLCJfIiwibGFiZWwiLCJzZW50IiwidHJ5cyIsIm9wcyIsImYiLCJ5IiwiZyIsInZlcmIiLCJTeW1ib2wiLCJpdGVyYXRvciIsInYiLCJvcCIsIlR5cGVFcnJvciIsInBvcCIsInB1c2giLCJfX2NyZWF0ZUJpbmRpbmciLCJvIiwibSIsImsiLCJrMiIsInVuZGVmaW5lZCIsIl9fZXhwb3J0U3RhciIsImV4cG9ydHMiLCJfX3ZhbHVlcyIsIl9fcmVhZCIsImFyIiwiZXJyb3IiLCJfX3NwcmVhZCIsImNvbmNhdCIsIl9fc3ByZWFkQXJyYXlzIiwiaWwiLCJhIiwiaiIsImpsIiwiX19hd2FpdCIsIl9fYXN5bmNHZW5lcmF0b3IiLCJhc3luY0l0ZXJhdG9yIiwicSIsInJlc3VtZSIsInNldHRsZSIsImZ1bGZpbGwiLCJzaGlmdCIsIl9fYXN5bmNEZWxlZ2F0b3IiLCJfX2FzeW5jVmFsdWVzIiwiX19tYWtlVGVtcGxhdGVPYmplY3QiLCJjb29rZWQiLCJyYXciLCJfX2ltcG9ydFN0YXIiLCJtb2QiLCJfX2VzTW9kdWxlIiwiX19pbXBvcnREZWZhdWx0IiwiX19jbGFzc1ByaXZhdGVGaWVsZEdldCIsInJlY2VpdmVyIiwicHJpdmF0ZU1hcCIsImhhcyIsImdldCIsIl9fY2xhc3NQcml2YXRlRmllbGRTZXQiLCJzZXQiLCJHYW1lTWFuYWdlciIsInJlbmRlciIsIm9wdGlvbnMiLCJHcmFwaGljUmVuZGVyIiwiZG9tIiwiX2RvbSIsIl9vcHRpb25zIiwicmVuZGVyVHJlZSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJzZXR1cEdhbWUiLCJ3aW5kb3ciLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnRXaW5kb3dMb2FkZWQiLCJjYW52YXNBcHAiLCJjYW52YXNTdXBwb3J0IiwidGhlQ2FudmFzIiwiY29udGV4dCIsImdldENvbnRleHQiLCJnYW1lTWFuYWdlciIsIkdhbWVPYmpNYW5hZ2VyIiwiUmVuZGVyIiwiYXBDb250cm9sIiwiQVBXYXRjaGVyIiwiS2V5SW5wdXRFdmVudCIsImNvZGUiLCJnbSIsInF1ZXJ5U2VsZWN0b3IiLCJrZXlXYXRjaERvd24iLCJwbGF5ZXIiLCJnYW1lT2JqZWN0cyIsImNtZCIsInN0b3AiLCJ3aGljaCIsImNvbnNvbGUiLCJsb2ciLCJkZXN0WSIsInJvdGF0aW9uQVAiLCJkZXN0WCIsImtleVdhdGNoZXJVcCIsIm5leHRYIiwibmV4dFkiLCJvbmtleXVwIiwib25rZXlwcmVzcyIsIm9iakxpc3QiLCJUYW5rUGxheWVyIiwiYW5pbVNoZWV0IiwiU3ByaXRlQW5pbVNoZWV0IiwiaXNJbml0ZWQiLCJzdGFydEFuaW0iLCJzdG9wQW5pbSIsIlgiLCJhbmltYXRpb25GcmFtZXMiLCJhbmltTGVuZ3RoIiwib3JkZXJJbmRleCIsIml0ZW0iLCJTcHJpdGVBbmltYXRpb24iLCJnZXRGcmFtZXMiLCJzWCIsInNZIiwic291cmNlRHgiLCJzb3VyY2VEeSIsInNvdXJjZVciLCJzb3VyY2VIIiwiUGxheWVyIiwidGFua0lEIiwiaW5pdERpcmVjdGlvbiIsImlzVXNlciIsImRpcmVjdGlvbiIsInRhbmtOYW1lIiwiaXNQbGF5ZXIiLCJkZXN0Q29vayIsImRlc3RXIiwiZGVzdEgiLCJhcmMiLCJZIiwiY2VudGVyWCIsImNlbnRlclkiLCJzcGVlZE0iLCJ1cGRhdGVTZWxmQ29vciIsInBlciIsIkltYWdlUmVzb3VjZSIsInVybCIsImltZyIsIkltYWdlIiwiZnJvbUV2ZW50Iiwic3Vic2NyaWJlIiwiZXZ0IiwiX29uTG9hZCIsInNyYyIsImNiIiwiZnVuYyIsInRhbmticmlnYWRlIiwib25Mb2FkIiwiZXZlbnRTaGlwTG9hZGVkIiwiYmluZCIsInJlcyIsInRpbGVTaGVldCIsImluaXQiLCJyZXF1ZXN0QW5pbUZyYW1lIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwib1JlcXVlc3RBbmltYXRpb25GcmFtZSIsIm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY2FsbGJhY2siLCJlbGVtZW50Iiwic2V0VGltZW91dCIsImxhc3RUaW1lIiwiRGF0ZSIsIm9mZnNjcmVlbkNhbnZhcyIsImNyZWF0ZUVsZW1lbnQiLCJ3aWR0aCIsImhlaWdodCIsIm9mZnNjcmVlbkNvbnRleHQiLCJjYWxjdWxhdGVGcHMiLCJub3ciLCJmcHMiLCJvZmZzY3JlZW5DYWNoZSIsImNvbnRleHRSZWYiLCJmaWxsU3R5bGUiLCJtYXBSb3dzIiwibWFwQ29scyIsImZpbGxSZWN0IiwibWFwVGl0bGUiLCJtYXBJbmRleE9mZnNldCIsInJvd0N0ciIsImNvbEN0ciIsInRpbGVJZCIsInNvdXJjZVgiLCJwYXJzZUludCIsInNvdXJjZVkiLCJkcmF3SW1hZ2UiLCJkcmF3U2NyZWVuIiwiY2xlYXJSZWN0IiwiZHJhd01hcCIsImRyYXdQbGF5ZXIiLCJmaWxsVGV4dCIsInRvRml4ZWQiLCJwbGF5ZXJzIiwiYW5nbGVJblJhZGlhbnMiLCJNYXRoIiwiUEkiLCJhbmltRnJhbWUiLCJz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Q25GLFFBQTlDLEVBQXdEbUYsU0FBUyxDQUFDbEYsUUFBbEUsRUFBNEVrRixTQUFTLENBQUNqRixPQUF0RixFQUErRmlGLFNBQVMsQ0FBQ2hGLE9BQXpHLEVBQWtILENBQUNSLElBQUksQ0FBQ2lCLEtBQU4sR0FBYyxDQUFoSSxFQUFtSSxDQUFDakIsSUFBSSxDQUFDa0IsS0FBTixHQUFjLENBQWpKLEVBQW9KbEIsSUFBSSxDQUFDaUIsS0FBekosRUFBZ0tqQixJQUFJLENBQUNrQixLQUFySztBQUNBOUQsVUFBTSxDQUFDTSxPQUFQLENBQWVrSSxPQUFmO0FBRUgsR0F6RmM7QUEwRmZaLFNBQU8sRUFBRSxpQkFBVXRDLFNBQVYsRUFBcUI7QUFDMUI7QUFFQXRGLFVBQU0sQ0FBQ00sT0FBUCxDQUFlbUgsU0FBZixDQUF5QnRCLGVBQXpCLEVBQTBDLENBQTFDLEVBQTZDLENBQTdDLEVBQ0lBLGVBQWUsQ0FBQ0UsS0FEcEIsRUFDMkJGLGVBQWUsQ0FBQ0csTUFEM0M7QUFHSDtBQWhHYyxDQUFuQjtBQW1HQXZHLFNBQVM7QUFFVCxpRUFBZUEsU0FBZixFIiwiZmlsZSI6ImdhbWUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiogUFVSRV9JTVBPUlRTX1NUQVJUIF91dGlsX2NhblJlcG9ydEVycm9yLF91dGlsX3RvU3Vic2NyaWJlcixfc3ltYm9sX29ic2VydmFibGUsX3V0aWxfcGlwZSxfY29uZmlnIFBVUkVfSU1QT1JUU19FTkQgKi9cbmltcG9ydCB7IGNhblJlcG9ydEVycm9yIH0gZnJvbSAnLi91dGlsL2NhblJlcG9ydEVycm9yJztcbmltcG9ydCB7IHRvU3Vic2NyaWJlciB9IGZyb20gJy4vdXRpbC90b1N1YnNjcmliZXInO1xuaW1wb3J0IHsgb2JzZXJ2YWJsZSBhcyBTeW1ib2xfb2JzZXJ2YWJsZSB9IGZyb20gJy4vc3ltYm9sL29ic2VydmFibGUnO1xuaW1wb3J0IHsgcGlwZUZyb21BcnJheSB9IGZyb20gJy4vdXRpbC9waXBlJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcbnZhciBPYnNlcnZhYmxlID0gLypAX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE9ic2VydmFibGUoc3Vic2NyaWJlKSB7XG4gICAgICAgIHRoaXMuX2lzU2NhbGFyID0gZmFsc2U7XG4gICAgICAgIGlmIChzdWJzY3JpYmUpIHtcbiAgICAgICAgICAgIHRoaXMuX3N1YnNjcmliZSA9IHN1YnNjcmliZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5saWZ0ID0gZnVuY3Rpb24gKG9wZXJhdG9yKSB7XG4gICAgICAgIHZhciBvYnNlcnZhYmxlID0gbmV3IE9ic2VydmFibGUoKTtcbiAgICAgICAgb2JzZXJ2YWJsZS5zb3VyY2UgPSB0aGlzO1xuICAgICAgICBvYnNlcnZhYmxlLm9wZXJhdG9yID0gb3BlcmF0b3I7XG4gICAgICAgIHJldHVybiBvYnNlcnZhYmxlO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24gKG9ic2VydmVyT3JOZXh0LCBlcnJvciwgY29tcGxldGUpIHtcbiAgICAgICAgdmFyIG9wZXJhdG9yID0gdGhpcy5vcGVyYXRvcjtcbiAgICAgICAgdmFyIHNpbmsgPSB0b1N1YnNjcmliZXIob2JzZXJ2ZXJPck5leHQsIGVycm9yLCBjb21wbGV0ZSk7XG4gICAgICAgIGlmIChvcGVyYXRvcikge1xuICAgICAgICAgICAgc2luay5hZGQob3BlcmF0b3IuY2FsbChzaW5rLCB0aGlzLnNvdXJjZSkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc2luay5hZGQodGhpcy5zb3VyY2UgfHwgKGNvbmZpZy51c2VEZXByZWNhdGVkU3luY2hyb25vdXNFcnJvckhhbmRsaW5nICYmICFzaW5rLnN5bmNFcnJvclRocm93YWJsZSkgP1xuICAgICAgICAgICAgICAgIHRoaXMuX3N1YnNjcmliZShzaW5rKSA6XG4gICAgICAgICAgICAgICAgdGhpcy5fdHJ5U3Vic2NyaWJlKHNpbmspKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29uZmlnLnVzZURlcHJlY2F0ZWRTeW5jaHJvbm91c0Vycm9ySGFuZGxpbmcpIHtcbiAgICAgICAgICAgIGlmIChzaW5rLnN5bmNFcnJvclRocm93YWJsZSkge1xuICAgICAgICAgICAgICAgIHNpbmsuc3luY0Vycm9yVGhyb3dhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKHNpbmsuc3luY0Vycm9yVGhyb3duKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IHNpbmsuc3luY0Vycm9yVmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzaW5rO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUuX3RyeVN1YnNjcmliZSA9IGZ1bmN0aW9uIChzaW5rKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3Vic2NyaWJlKHNpbmspO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGlmIChjb25maWcudXNlRGVwcmVjYXRlZFN5bmNocm9ub3VzRXJyb3JIYW5kbGluZykge1xuICAgICAgICAgICAgICAgIHNpbmsuc3luY0Vycm9yVGhyb3duID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzaW5rLnN5bmNFcnJvclZhbHVlID0gZXJyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNhblJlcG9ydEVycm9yKHNpbmspKSB7XG4gICAgICAgICAgICAgICAgc2luay5lcnJvcihlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKGVycik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAobmV4dCwgcHJvbWlzZUN0b3IpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcHJvbWlzZUN0b3IgPSBnZXRQcm9taXNlQ3Rvcihwcm9taXNlQ3Rvcik7XG4gICAgICAgIHJldHVybiBuZXcgcHJvbWlzZUN0b3IoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgdmFyIHN1YnNjcmlwdGlvbjtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbiA9IF90aGlzLnN1YnNjcmliZShmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0KHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCByZWplY3QsIHJlc29sdmUpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlLl9zdWJzY3JpYmUgPSBmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICB2YXIgc291cmNlID0gdGhpcy5zb3VyY2U7XG4gICAgICAgIHJldHVybiBzb3VyY2UgJiYgc291cmNlLnN1YnNjcmliZShzdWJzY3JpYmVyKTtcbiAgICB9O1xuICAgIE9ic2VydmFibGUucHJvdG90eXBlW1N5bWJvbF9vYnNlcnZhYmxlXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5waXBlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgb3BlcmF0aW9ucyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICAgICAgb3BlcmF0aW9uc1tfaV0gPSBhcmd1bWVudHNbX2ldO1xuICAgICAgICB9XG4gICAgICAgIGlmIChvcGVyYXRpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHBpcGVGcm9tQXJyYXkob3BlcmF0aW9ucykodGhpcyk7XG4gICAgfTtcbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS50b1Byb21pc2UgPSBmdW5jdGlvbiAocHJvbWlzZUN0b3IpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcHJvbWlzZUN0b3IgPSBnZXRQcm9taXNlQ3Rvcihwcm9taXNlQ3Rvcik7XG4gICAgICAgIHJldHVybiBuZXcgcHJvbWlzZUN0b3IoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICAgICAgX3RoaXMuc3Vic2NyaWJlKGZ1bmN0aW9uICh4KSB7IHJldHVybiB2YWx1ZSA9IHg7IH0sIGZ1bmN0aW9uIChlcnIpIHsgcmV0dXJuIHJlamVjdChlcnIpOyB9LCBmdW5jdGlvbiAoKSB7IHJldHVybiByZXNvbHZlKHZhbHVlKTsgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgT2JzZXJ2YWJsZS5jcmVhdGUgPSBmdW5jdGlvbiAoc3Vic2NyaWJlKSB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShzdWJzY3JpYmUpO1xuICAgIH07XG4gICAgcmV0dXJuIE9ic2VydmFibGU7XG59KCkpO1xuZXhwb3J0IHsgT2JzZXJ2YWJsZSB9O1xuZnVuY3Rpb24gZ2V0UHJvbWlzZUN0b3IocHJvbWlzZUN0b3IpIHtcbiAgICBpZiAoIXByb21pc2VDdG9yKSB7XG4gICAgICAgIHByb21pc2VDdG9yID0gY29uZmlnLlByb21pc2UgfHwgUHJvbWlzZTtcbiAgICB9XG4gICAgaWYgKCFwcm9taXNlQ3Rvcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIFByb21pc2UgaW1wbCBmb3VuZCcpO1xuICAgIH1cbiAgICByZXR1cm4gcHJvbWlzZUN0b3I7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1PYnNlcnZhYmxlLmpzLm1hcFxuIiwiLyoqIFBVUkVfSU1QT1JUU19TVEFSVCBfY29uZmlnLF91dGlsX2hvc3RSZXBvcnRFcnJvciBQVVJFX0lNUE9SVFNfRU5EICovXG5pbXBvcnQgeyBjb25maWcgfSBmcm9tICcuL2NvbmZpZyc7XG5pbXBvcnQgeyBob3N0UmVwb3J0RXJyb3IgfSBmcm9tICcuL3V0aWwvaG9zdFJlcG9ydEVycm9yJztcbmV4cG9ydCB2YXIgZW1wdHkgPSB7XG4gICAgY2xvc2VkOiB0cnVlLFxuICAgIG5leHQ6IGZ1bmN0aW9uICh2YWx1ZSkgeyB9LFxuICAgIGVycm9yOiBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGlmIChjb25maWcudXNlRGVwcmVjYXRlZFN5bmNocm9ub3VzRXJyb3JIYW5kbGluZykge1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaG9zdFJlcG9ydEVycm9yKGVycik7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7IH1cbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1PYnNlcnZlci5qcy5tYXBcbiIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgdHNsaWIsX3V0aWxfaXNGdW5jdGlvbixfT2JzZXJ2ZXIsX1N1YnNjcmlwdGlvbixfaW50ZXJuYWxfc3ltYm9sX3J4U3Vic2NyaWJlcixfY29uZmlnLF91dGlsX2hvc3RSZXBvcnRFcnJvciBQVVJFX0lNUE9SVFNfRU5EICovXG5pbXBvcnQgKiBhcyB0c2xpYl8xIGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4vdXRpbC9pc0Z1bmN0aW9uJztcbmltcG9ydCB7IGVtcHR5IGFzIGVtcHR5T2JzZXJ2ZXIgfSBmcm9tICcuL09ic2VydmVyJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJy4vU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IHJ4U3Vic2NyaWJlciBhcyByeFN1YnNjcmliZXJTeW1ib2wgfSBmcm9tICcuLi9pbnRlcm5hbC9zeW1ib2wvcnhTdWJzY3JpYmVyJztcbmltcG9ydCB7IGNvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcbmltcG9ydCB7IGhvc3RSZXBvcnRFcnJvciB9IGZyb20gJy4vdXRpbC9ob3N0UmVwb3J0RXJyb3InO1xudmFyIFN1YnNjcmliZXIgPSAvKkBfX1BVUkVfXyovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoU3Vic2NyaWJlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBTdWJzY3JpYmVyKGRlc3RpbmF0aW9uT3JOZXh0LCBlcnJvciwgY29tcGxldGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuc3luY0Vycm9yVmFsdWUgPSBudWxsO1xuICAgICAgICBfdGhpcy5zeW5jRXJyb3JUaHJvd24gPSBmYWxzZTtcbiAgICAgICAgX3RoaXMuc3luY0Vycm9yVGhyb3dhYmxlID0gZmFsc2U7XG4gICAgICAgIF90aGlzLmlzU3RvcHBlZCA9IGZhbHNlO1xuICAgICAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBfdGhpcy5kZXN0aW5hdGlvbiA9IGVtcHR5T2JzZXJ2ZXI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgaWYgKCFkZXN0aW5hdGlvbk9yTmV4dCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5kZXN0aW5hdGlvbiA9IGVtcHR5T2JzZXJ2ZXI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGRlc3RpbmF0aW9uT3JOZXh0ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGVzdGluYXRpb25Pck5leHQgaW5zdGFuY2VvZiBTdWJzY3JpYmVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5zeW5jRXJyb3JUaHJvd2FibGUgPSBkZXN0aW5hdGlvbk9yTmV4dC5zeW5jRXJyb3JUaHJvd2FibGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5kZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uT3JOZXh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVzdGluYXRpb25Pck5leHQuYWRkKF90aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzLnN5bmNFcnJvclRocm93YWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpcy5kZXN0aW5hdGlvbiA9IG5ldyBTYWZlU3Vic2NyaWJlcihfdGhpcywgZGVzdGluYXRpb25Pck5leHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgX3RoaXMuc3luY0Vycm9yVGhyb3dhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBfdGhpcy5kZXN0aW5hdGlvbiA9IG5ldyBTYWZlU3Vic2NyaWJlcihfdGhpcywgZGVzdGluYXRpb25Pck5leHQsIGVycm9yLCBjb21wbGV0ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZVtyeFN1YnNjcmliZXJTeW1ib2xdID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpczsgfTtcbiAgICBTdWJzY3JpYmVyLmNyZWF0ZSA9IGZ1bmN0aW9uIChuZXh0LCBlcnJvciwgY29tcGxldGUpIHtcbiAgICAgICAgdmFyIHN1YnNjcmliZXIgPSBuZXcgU3Vic2NyaWJlcihuZXh0LCBlcnJvciwgY29tcGxldGUpO1xuICAgICAgICBzdWJzY3JpYmVyLnN5bmNFcnJvclRocm93YWJsZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gc3Vic2NyaWJlcjtcbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgdGhpcy5fbmV4dCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgICAgICBpZiAoIXRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICB0aGlzLmlzU3RvcHBlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9lcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5jb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzU3RvcHBlZCkge1xuICAgICAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fY29tcGxldGUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaXNTdG9wcGVkID0gdHJ1ZTtcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS51bnN1YnNjcmliZS5jYWxsKHRoaXMpO1xuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUuX25leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5uZXh0KHZhbHVlKTtcbiAgICB9O1xuICAgIFN1YnNjcmliZXIucHJvdG90eXBlLl9lcnJvciA9IGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgfTtcbiAgICBTdWJzY3JpYmVyLnByb3RvdHlwZS5fY29tcGxldGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24uY29tcGxldGUoKTtcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgIH07XG4gICAgU3Vic2NyaWJlci5wcm90b3R5cGUuX3Vuc3Vic2NyaWJlQW5kUmVjeWNsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9wYXJlbnRPclBhcmVudHMgPSB0aGlzLl9wYXJlbnRPclBhcmVudHM7XG4gICAgICAgIHRoaXMuX3BhcmVudE9yUGFyZW50cyA9IG51bGw7XG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgdGhpcy5jbG9zZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1N0b3BwZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fcGFyZW50T3JQYXJlbnRzID0gX3BhcmVudE9yUGFyZW50cztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICByZXR1cm4gU3Vic2NyaWJlcjtcbn0oU3Vic2NyaXB0aW9uKSk7XG5leHBvcnQgeyBTdWJzY3JpYmVyIH07XG52YXIgU2FmZVN1YnNjcmliZXIgPSAvKkBfX1BVUkVfXyovIChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgdHNsaWJfMS5fX2V4dGVuZHMoU2FmZVN1YnNjcmliZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU2FmZVN1YnNjcmliZXIoX3BhcmVudFN1YnNjcmliZXIsIG9ic2VydmVyT3JOZXh0LCBlcnJvciwgY29tcGxldGUpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuX3BhcmVudFN1YnNjcmliZXIgPSBfcGFyZW50U3Vic2NyaWJlcjtcbiAgICAgICAgdmFyIG5leHQ7XG4gICAgICAgIHZhciBjb250ZXh0ID0gX3RoaXM7XG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKG9ic2VydmVyT3JOZXh0KSkge1xuICAgICAgICAgICAgbmV4dCA9IG9ic2VydmVyT3JOZXh0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9ic2VydmVyT3JOZXh0KSB7XG4gICAgICAgICAgICBuZXh0ID0gb2JzZXJ2ZXJPck5leHQubmV4dDtcbiAgICAgICAgICAgIGVycm9yID0gb2JzZXJ2ZXJPck5leHQuZXJyb3I7XG4gICAgICAgICAgICBjb21wbGV0ZSA9IG9ic2VydmVyT3JOZXh0LmNvbXBsZXRlO1xuICAgICAgICAgICAgaWYgKG9ic2VydmVyT3JOZXh0ICE9PSBlbXB0eU9ic2VydmVyKSB7XG4gICAgICAgICAgICAgICAgY29udGV4dCA9IE9iamVjdC5jcmVhdGUob2JzZXJ2ZXJPck5leHQpO1xuICAgICAgICAgICAgICAgIGlmIChpc0Z1bmN0aW9uKGNvbnRleHQudW5zdWJzY3JpYmUpKSB7XG4gICAgICAgICAgICAgICAgICAgIF90aGlzLmFkZChjb250ZXh0LnVuc3Vic2NyaWJlLmJpbmQoY29udGV4dCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb250ZXh0LnVuc3Vic2NyaWJlID0gX3RoaXMudW5zdWJzY3JpYmUuYmluZChfdGhpcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuX2NvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICBfdGhpcy5fbmV4dCA9IG5leHQ7XG4gICAgICAgIF90aGlzLl9lcnJvciA9IGVycm9yO1xuICAgICAgICBfdGhpcy5fY29tcGxldGUgPSBjb21wbGV0ZTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBTYWZlU3Vic2NyaWJlci5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICBpZiAoIXRoaXMuaXNTdG9wcGVkICYmIHRoaXMuX25leHQpIHtcbiAgICAgICAgICAgIHZhciBfcGFyZW50U3Vic2NyaWJlciA9IHRoaXMuX3BhcmVudFN1YnNjcmliZXI7XG4gICAgICAgICAgICBpZiAoIWNvbmZpZy51c2VEZXByZWNhdGVkU3luY2hyb25vdXNFcnJvckhhbmRsaW5nIHx8ICFfcGFyZW50U3Vic2NyaWJlci5zeW5jRXJyb3JUaHJvd2FibGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9fdHJ5T3JVbnN1Yih0aGlzLl9uZXh0LCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLl9fdHJ5T3JTZXRFcnJvcihfcGFyZW50U3Vic2NyaWJlciwgdGhpcy5fbmV4dCwgdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBTYWZlU3Vic2NyaWJlci5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1N0b3BwZWQpIHtcbiAgICAgICAgICAgIHZhciBfcGFyZW50U3Vic2NyaWJlciA9IHRoaXMuX3BhcmVudFN1YnNjcmliZXI7XG4gICAgICAgICAgICB2YXIgdXNlRGVwcmVjYXRlZFN5bmNocm9ub3VzRXJyb3JIYW5kbGluZyA9IGNvbmZpZy51c2VEZXByZWNhdGVkU3luY2hyb25vdXNFcnJvckhhbmRsaW5nO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2Vycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF1c2VEZXByZWNhdGVkU3luY2hyb25vdXNFcnJvckhhbmRsaW5nIHx8ICFfcGFyZW50U3Vic2NyaWJlci5zeW5jRXJyb3JUaHJvd2FibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3RyeU9yVW5zdWIodGhpcy5fZXJyb3IsIGVycik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX190cnlPclNldEVycm9yKF9wYXJlbnRTdWJzY3JpYmVyLCB0aGlzLl9lcnJvciwgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCFfcGFyZW50U3Vic2NyaWJlci5zeW5jRXJyb3JUaHJvd2FibGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgaWYgKHVzZURlcHJlY2F0ZWRTeW5jaHJvbm91c0Vycm9ySGFuZGxpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBob3N0UmVwb3J0RXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh1c2VEZXByZWNhdGVkU3luY2hyb25vdXNFcnJvckhhbmRsaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIF9wYXJlbnRTdWJzY3JpYmVyLnN5bmNFcnJvclZhbHVlID0gZXJyO1xuICAgICAgICAgICAgICAgICAgICBfcGFyZW50U3Vic2NyaWJlci5zeW5jRXJyb3JUaHJvd24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaG9zdFJlcG9ydEVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgU2FmZVN1YnNjcmliZXIucHJvdG90eXBlLmNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoIXRoaXMuaXNTdG9wcGVkKSB7XG4gICAgICAgICAgICB2YXIgX3BhcmVudFN1YnNjcmliZXIgPSB0aGlzLl9wYXJlbnRTdWJzY3JpYmVyO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2NvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHdyYXBwZWRDb21wbGV0ZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIF90aGlzLl9jb21wbGV0ZS5jYWxsKF90aGlzLl9jb250ZXh0KTsgfTtcbiAgICAgICAgICAgICAgICBpZiAoIWNvbmZpZy51c2VEZXByZWNhdGVkU3luY2hyb25vdXNFcnJvckhhbmRsaW5nIHx8ICFfcGFyZW50U3Vic2NyaWJlci5zeW5jRXJyb3JUaHJvd2FibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3RyeU9yVW5zdWIod3JhcHBlZENvbXBsZXRlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3RyeU9yU2V0RXJyb3IoX3BhcmVudFN1YnNjcmliZXIsIHdyYXBwZWRDb21wbGV0ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNhZmVTdWJzY3JpYmVyLnByb3RvdHlwZS5fX3RyeU9yVW5zdWIgPSBmdW5jdGlvbiAoZm4sIHZhbHVlKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBmbi5jYWxsKHRoaXMuX2NvbnRleHQsIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICBpZiAoY29uZmlnLnVzZURlcHJlY2F0ZWRTeW5jaHJvbm91c0Vycm9ySGFuZGxpbmcpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBob3N0UmVwb3J0RXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgU2FmZVN1YnNjcmliZXIucHJvdG90eXBlLl9fdHJ5T3JTZXRFcnJvciA9IGZ1bmN0aW9uIChwYXJlbnQsIGZuLCB2YWx1ZSkge1xuICAgICAgICBpZiAoIWNvbmZpZy51c2VEZXByZWNhdGVkU3luY2hyb25vdXNFcnJvckhhbmRsaW5nKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2JhZCBjYWxsJyk7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGZuLmNhbGwodGhpcy5fY29udGV4dCwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGlmIChjb25maWcudXNlRGVwcmVjYXRlZFN5bmNocm9ub3VzRXJyb3JIYW5kbGluZykge1xuICAgICAgICAgICAgICAgIHBhcmVudC5zeW5jRXJyb3JWYWx1ZSA9IGVycjtcbiAgICAgICAgICAgICAgICBwYXJlbnQuc3luY0Vycm9yVGhyb3duID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGhvc3RSZXBvcnRFcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIFNhZmVTdWJzY3JpYmVyLnByb3RvdHlwZS5fdW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfcGFyZW50U3Vic2NyaWJlciA9IHRoaXMuX3BhcmVudFN1YnNjcmliZXI7XG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSBudWxsO1xuICAgICAgICB0aGlzLl9wYXJlbnRTdWJzY3JpYmVyID0gbnVsbDtcbiAgICAgICAgX3BhcmVudFN1YnNjcmliZXIudW5zdWJzY3JpYmUoKTtcbiAgICB9O1xuICAgIHJldHVybiBTYWZlU3Vic2NyaWJlcjtcbn0oU3Vic2NyaWJlcikpO1xuZXhwb3J0IHsgU2FmZVN1YnNjcmliZXIgfTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN1YnNjcmliZXIuanMubWFwXG4iLCIvKiogUFVSRV9JTVBPUlRTX1NUQVJUIF91dGlsX2lzQXJyYXksX3V0aWxfaXNPYmplY3QsX3V0aWxfaXNGdW5jdGlvbixfdXRpbF9VbnN1YnNjcmlwdGlvbkVycm9yIFBVUkVfSU1QT1JUU19FTkQgKi9cbmltcG9ydCB7IGlzQXJyYXkgfSBmcm9tICcuL3V0aWwvaXNBcnJheSc7XG5pbXBvcnQgeyBpc09iamVjdCB9IGZyb20gJy4vdXRpbC9pc09iamVjdCc7XG5pbXBvcnQgeyBpc0Z1bmN0aW9uIH0gZnJvbSAnLi91dGlsL2lzRnVuY3Rpb24nO1xuaW1wb3J0IHsgVW5zdWJzY3JpcHRpb25FcnJvciB9IGZyb20gJy4vdXRpbC9VbnN1YnNjcmlwdGlvbkVycm9yJztcbnZhciBTdWJzY3JpcHRpb24gPSAvKkBfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU3Vic2NyaXB0aW9uKHVuc3Vic2NyaWJlKSB7XG4gICAgICAgIHRoaXMuY2xvc2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX3BhcmVudE9yUGFyZW50cyA9IG51bGw7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMgPSBudWxsO1xuICAgICAgICBpZiAodW5zdWJzY3JpYmUpIHtcbiAgICAgICAgICAgIHRoaXMuX2N0b3JVbnN1YnNjcmliZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl91bnN1YnNjcmliZSA9IHVuc3Vic2NyaWJlO1xuICAgICAgICB9XG4gICAgfVxuICAgIFN1YnNjcmlwdGlvbi5wcm90b3R5cGUudW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlcnJvcnM7XG4gICAgICAgIGlmICh0aGlzLmNsb3NlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBfYSA9IHRoaXMsIF9wYXJlbnRPclBhcmVudHMgPSBfYS5fcGFyZW50T3JQYXJlbnRzLCBfY3RvclVuc3Vic2NyaWJlID0gX2EuX2N0b3JVbnN1YnNjcmliZSwgX3Vuc3Vic2NyaWJlID0gX2EuX3Vuc3Vic2NyaWJlLCBfc3Vic2NyaXB0aW9ucyA9IF9hLl9zdWJzY3JpcHRpb25zO1xuICAgICAgICB0aGlzLmNsb3NlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX3BhcmVudE9yUGFyZW50cyA9IG51bGw7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMgPSBudWxsO1xuICAgICAgICBpZiAoX3BhcmVudE9yUGFyZW50cyBpbnN0YW5jZW9mIFN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgX3BhcmVudE9yUGFyZW50cy5yZW1vdmUodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoX3BhcmVudE9yUGFyZW50cyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaW5kZXggPSAwOyBpbmRleCA8IF9wYXJlbnRPclBhcmVudHMubGVuZ3RoOyArK2luZGV4KSB7XG4gICAgICAgICAgICAgICAgdmFyIHBhcmVudF8xID0gX3BhcmVudE9yUGFyZW50c1tpbmRleF07XG4gICAgICAgICAgICAgICAgcGFyZW50XzEucmVtb3ZlKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChpc0Z1bmN0aW9uKF91bnN1YnNjcmliZSkpIHtcbiAgICAgICAgICAgIGlmIChfY3RvclVuc3Vic2NyaWJlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdW5zdWJzY3JpYmUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIF91bnN1YnNjcmliZS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBlcnJvcnMgPSBlIGluc3RhbmNlb2YgVW5zdWJzY3JpcHRpb25FcnJvciA/IGZsYXR0ZW5VbnN1YnNjcmlwdGlvbkVycm9ycyhlLmVycm9ycykgOiBbZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQXJyYXkoX3N1YnNjcmlwdGlvbnMpKSB7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSAtMTtcbiAgICAgICAgICAgIHZhciBsZW4gPSBfc3Vic2NyaXB0aW9ucy5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoKytpbmRleCA8IGxlbikge1xuICAgICAgICAgICAgICAgIHZhciBzdWIgPSBfc3Vic2NyaXB0aW9uc1tpbmRleF07XG4gICAgICAgICAgICAgICAgaWYgKGlzT2JqZWN0KHN1YikpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Yi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvcnMgPSBlcnJvcnMgfHwgW107XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIFVuc3Vic2NyaXB0aW9uRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvcnMgPSBlcnJvcnMuY29uY2F0KGZsYXR0ZW5VbnN1YnNjcmlwdGlvbkVycm9ycyhlLmVycm9ycykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9ycykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFVuc3Vic2NyaXB0aW9uRXJyb3IoZXJyb3JzKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU3Vic2NyaXB0aW9uLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAodGVhcmRvd24pIHtcbiAgICAgICAgdmFyIHN1YnNjcmlwdGlvbiA9IHRlYXJkb3duO1xuICAgICAgICBpZiAoIXRlYXJkb3duKSB7XG4gICAgICAgICAgICByZXR1cm4gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAodHlwZW9mIHRlYXJkb3duKSB7XG4gICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbih0ZWFyZG93bik7XG4gICAgICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgICAgIGlmIChzdWJzY3JpcHRpb24gPT09IHRoaXMgfHwgc3Vic2NyaXB0aW9uLmNsb3NlZCB8fCB0eXBlb2Ygc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdWJzY3JpcHRpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICghKHN1YnNjcmlwdGlvbiBpbnN0YW5jZW9mIFN1YnNjcmlwdGlvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRtcCA9IHN1YnNjcmlwdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24uX3N1YnNjcmlwdGlvbnMgPSBbdG1wXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OiB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd1bnJlY29nbml6ZWQgdGVhcmRvd24gJyArIHRlYXJkb3duICsgJyBhZGRlZCB0byBTdWJzY3JpcHRpb24uJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIF9wYXJlbnRPclBhcmVudHMgPSBzdWJzY3JpcHRpb24uX3BhcmVudE9yUGFyZW50cztcbiAgICAgICAgaWYgKF9wYXJlbnRPclBhcmVudHMgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbi5fcGFyZW50T3JQYXJlbnRzID0gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChfcGFyZW50T3JQYXJlbnRzIGluc3RhbmNlb2YgU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICBpZiAoX3BhcmVudE9yUGFyZW50cyA9PT0gdGhpcykge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdWJzY3JpcHRpb247XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdWJzY3JpcHRpb24uX3BhcmVudE9yUGFyZW50cyA9IFtfcGFyZW50T3JQYXJlbnRzLCB0aGlzXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChfcGFyZW50T3JQYXJlbnRzLmluZGV4T2YodGhpcykgPT09IC0xKSB7XG4gICAgICAgICAgICBfcGFyZW50T3JQYXJlbnRzLnB1c2godGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gc3Vic2NyaXB0aW9uO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdWJzY3JpcHRpb25zID0gdGhpcy5fc3Vic2NyaXB0aW9ucztcbiAgICAgICAgaWYgKHN1YnNjcmlwdGlvbnMgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMgPSBbc3Vic2NyaXB0aW9uXTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHN1YnNjcmlwdGlvbnMucHVzaChzdWJzY3JpcHRpb24pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdWJzY3JpcHRpb247XG4gICAgfTtcbiAgICBTdWJzY3JpcHRpb24ucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChzdWJzY3JpcHRpb24pIHtcbiAgICAgICAgdmFyIHN1YnNjcmlwdGlvbnMgPSB0aGlzLl9zdWJzY3JpcHRpb25zO1xuICAgICAgICBpZiAoc3Vic2NyaXB0aW9ucykge1xuICAgICAgICAgICAgdmFyIHN1YnNjcmlwdGlvbkluZGV4ID0gc3Vic2NyaXB0aW9ucy5pbmRleE9mKHN1YnNjcmlwdGlvbik7XG4gICAgICAgICAgICBpZiAoc3Vic2NyaXB0aW9uSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgc3Vic2NyaXB0aW9ucy5zcGxpY2Uoc3Vic2NyaXB0aW9uSW5kZXgsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBTdWJzY3JpcHRpb24uRU1QVFkgPSAoZnVuY3Rpb24gKGVtcHR5KSB7XG4gICAgICAgIGVtcHR5LmNsb3NlZCA9IHRydWU7XG4gICAgICAgIHJldHVybiBlbXB0eTtcbiAgICB9KG5ldyBTdWJzY3JpcHRpb24oKSkpO1xuICAgIHJldHVybiBTdWJzY3JpcHRpb247XG59KCkpO1xuZXhwb3J0IHsgU3Vic2NyaXB0aW9uIH07XG5mdW5jdGlvbiBmbGF0dGVuVW5zdWJzY3JpcHRpb25FcnJvcnMoZXJyb3JzKSB7XG4gICAgcmV0dXJuIGVycm9ycy5yZWR1Y2UoZnVuY3Rpb24gKGVycnMsIGVycikgeyByZXR1cm4gZXJycy5jb25jYXQoKGVyciBpbnN0YW5jZW9mIFVuc3Vic2NyaXB0aW9uRXJyb3IpID8gZXJyLmVycm9ycyA6IGVycik7IH0sIFtdKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVN1YnNjcmlwdGlvbi5qcy5tYXBcbiIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgIFBVUkVfSU1QT1JUU19FTkQgKi9cbnZhciBfZW5hYmxlX3N1cGVyX2dyb3NzX21vZGVfdGhhdF93aWxsX2NhdXNlX2JhZF90aGluZ3MgPSBmYWxzZTtcbmV4cG9ydCB2YXIgY29uZmlnID0ge1xuICAgIFByb21pc2U6IHVuZGVmaW5lZCxcbiAgICBzZXQgdXNlRGVwcmVjYXRlZFN5bmNocm9ub3VzRXJyb3JIYW5kbGluZyh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBlcnJvciA9IC8qQF9fUFVSRV9fKi8gbmV3IEVycm9yKCk7XG4gICAgICAgICAgICAvKkBfX1BVUkVfXyovIGNvbnNvbGUud2FybignREVQUkVDQVRFRCEgUnhKUyB3YXMgc2V0IHRvIHVzZSBkZXByZWNhdGVkIHN5bmNocm9ub3VzIGVycm9yIGhhbmRsaW5nIGJlaGF2aW9yIGJ5IGNvZGUgYXQ6IFxcbicgKyBlcnJvci5zdGFjayk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoX2VuYWJsZV9zdXBlcl9ncm9zc19tb2RlX3RoYXRfd2lsbF9jYXVzZV9iYWRfdGhpbmdzKSB7XG4gICAgICAgICAgICAvKkBfX1BVUkVfXyovIGNvbnNvbGUubG9nKCdSeEpTOiBCYWNrIHRvIGEgYmV0dGVyIGVycm9yIGJlaGF2aW9yLiBUaGFuayB5b3UuIDwzJyk7XG4gICAgICAgIH1cbiAgICAgICAgX2VuYWJsZV9zdXBlcl9ncm9zc19tb2RlX3RoYXRfd2lsbF9jYXVzZV9iYWRfdGhpbmdzID0gdmFsdWU7XG4gICAgfSxcbiAgICBnZXQgdXNlRGVwcmVjYXRlZFN5bmNocm9ub3VzRXJyb3JIYW5kbGluZygpIHtcbiAgICAgICAgcmV0dXJuIF9lbmFibGVfc3VwZXJfZ3Jvc3NfbW9kZV90aGF0X3dpbGxfY2F1c2VfYmFkX3RoaW5ncztcbiAgICB9LFxufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbmZpZy5qcy5tYXBcbiIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgX09ic2VydmFibGUsX3V0aWxfaXNBcnJheSxfdXRpbF9pc0Z1bmN0aW9uLF9vcGVyYXRvcnNfbWFwIFBVUkVfSU1QT1JUU19FTkQgKi9cbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICcuLi9PYnNlcnZhYmxlJztcbmltcG9ydCB7IGlzQXJyYXkgfSBmcm9tICcuLi91dGlsL2lzQXJyYXknO1xuaW1wb3J0IHsgaXNGdW5jdGlvbiB9IGZyb20gJy4uL3V0aWwvaXNGdW5jdGlvbic7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICcuLi9vcGVyYXRvcnMvbWFwJztcbnZhciB0b1N0cmluZyA9IC8qQF9fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7IH0pKCk7XG5leHBvcnQgZnVuY3Rpb24gZnJvbUV2ZW50KHRhcmdldCwgZXZlbnROYW1lLCBvcHRpb25zLCByZXN1bHRTZWxlY3Rvcikge1xuICAgIGlmIChpc0Z1bmN0aW9uKG9wdGlvbnMpKSB7XG4gICAgICAgIHJlc3VsdFNlbGVjdG9yID0gb3B0aW9ucztcbiAgICAgICAgb3B0aW9ucyA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKHJlc3VsdFNlbGVjdG9yKSB7XG4gICAgICAgIHJldHVybiBmcm9tRXZlbnQodGFyZ2V0LCBldmVudE5hbWUsIG9wdGlvbnMpLnBpcGUobWFwKGZ1bmN0aW9uIChhcmdzKSB7IHJldHVybiBpc0FycmF5KGFyZ3MpID8gcmVzdWx0U2VsZWN0b3IuYXBwbHkodm9pZCAwLCBhcmdzKSA6IHJlc3VsdFNlbGVjdG9yKGFyZ3MpOyB9KSk7XG4gICAgfVxuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZShmdW5jdGlvbiAoc3Vic2NyaWJlcikge1xuICAgICAgICBmdW5jdGlvbiBoYW5kbGVyKGUpIHtcbiAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHN1YnNjcmliZXIubmV4dChlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzZXR1cFN1YnNjcmlwdGlvbih0YXJnZXQsIGV2ZW50TmFtZSwgaGFuZGxlciwgc3Vic2NyaWJlciwgb3B0aW9ucyk7XG4gICAgfSk7XG59XG5mdW5jdGlvbiBzZXR1cFN1YnNjcmlwdGlvbihzb3VyY2VPYmosIGV2ZW50TmFtZSwgaGFuZGxlciwgc3Vic2NyaWJlciwgb3B0aW9ucykge1xuICAgIHZhciB1bnN1YnNjcmliZTtcbiAgICBpZiAoaXNFdmVudFRhcmdldChzb3VyY2VPYmopKSB7XG4gICAgICAgIHZhciBzb3VyY2VfMSA9IHNvdXJjZU9iajtcbiAgICAgICAgc291cmNlT2JqLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBoYW5kbGVyLCBvcHRpb25zKTtcbiAgICAgICAgdW5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBzb3VyY2VfMS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgaGFuZGxlciwgb3B0aW9ucyk7IH07XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzSlF1ZXJ5U3R5bGVFdmVudEVtaXR0ZXIoc291cmNlT2JqKSkge1xuICAgICAgICB2YXIgc291cmNlXzIgPSBzb3VyY2VPYmo7XG4gICAgICAgIHNvdXJjZU9iai5vbihldmVudE5hbWUsIGhhbmRsZXIpO1xuICAgICAgICB1bnN1YnNjcmliZSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNvdXJjZV8yLm9mZihldmVudE5hbWUsIGhhbmRsZXIpOyB9O1xuICAgIH1cbiAgICBlbHNlIGlmIChpc05vZGVTdHlsZUV2ZW50RW1pdHRlcihzb3VyY2VPYmopKSB7XG4gICAgICAgIHZhciBzb3VyY2VfMyA9IHNvdXJjZU9iajtcbiAgICAgICAgc291cmNlT2JqLmFkZExpc3RlbmVyKGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgICAgIHVuc3Vic2NyaWJlID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gc291cmNlXzMucmVtb3ZlTGlzdGVuZXIoZXZlbnROYW1lLCBoYW5kbGVyKTsgfTtcbiAgICB9XG4gICAgZWxzZSBpZiAoc291cmNlT2JqICYmIHNvdXJjZU9iai5sZW5ndGgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHNvdXJjZU9iai5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgc2V0dXBTdWJzY3JpcHRpb24oc291cmNlT2JqW2ldLCBldmVudE5hbWUsIGhhbmRsZXIsIHN1YnNjcmliZXIsIG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGV2ZW50IHRhcmdldCcpO1xuICAgIH1cbiAgICBzdWJzY3JpYmVyLmFkZCh1bnN1YnNjcmliZSk7XG59XG5mdW5jdGlvbiBpc05vZGVTdHlsZUV2ZW50RW1pdHRlcihzb3VyY2VPYmopIHtcbiAgICByZXR1cm4gc291cmNlT2JqICYmIHR5cGVvZiBzb3VyY2VPYmouYWRkTGlzdGVuZXIgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHNvdXJjZU9iai5yZW1vdmVMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJztcbn1cbmZ1bmN0aW9uIGlzSlF1ZXJ5U3R5bGVFdmVudEVtaXR0ZXIoc291cmNlT2JqKSB7XG4gICAgcmV0dXJuIHNvdXJjZU9iaiAmJiB0eXBlb2Ygc291cmNlT2JqLm9uID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBzb3VyY2VPYmoub2ZmID09PSAnZnVuY3Rpb24nO1xufVxuZnVuY3Rpb24gaXNFdmVudFRhcmdldChzb3VyY2VPYmopIHtcbiAgICByZXR1cm4gc291cmNlT2JqICYmIHR5cGVvZiBzb3VyY2VPYmouYWRkRXZlbnRMaXN0ZW5lciA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygc291cmNlT2JqLnJlbW92ZUV2ZW50TGlzdGVuZXIgPT09ICdmdW5jdGlvbic7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1mcm9tRXZlbnQuanMubWFwXG4iLCIvKiogUFVSRV9JTVBPUlRTX1NUQVJUIHRzbGliLF9TdWJzY3JpYmVyIFBVUkVfSU1QT1JUU19FTkQgKi9cbmltcG9ydCAqIGFzIHRzbGliXzEgZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5leHBvcnQgZnVuY3Rpb24gbWFwKHByb2plY3QsIHRoaXNBcmcpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gbWFwT3BlcmF0aW9uKHNvdXJjZSkge1xuICAgICAgICBpZiAodHlwZW9mIHByb2plY3QgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2FyZ3VtZW50IGlzIG5vdCBhIGZ1bmN0aW9uLiBBcmUgeW91IGxvb2tpbmcgZm9yIGBtYXBUbygpYD8nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc291cmNlLmxpZnQobmV3IE1hcE9wZXJhdG9yKHByb2plY3QsIHRoaXNBcmcpKTtcbiAgICB9O1xufVxudmFyIE1hcE9wZXJhdG9yID0gLypAX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIE1hcE9wZXJhdG9yKHByb2plY3QsIHRoaXNBcmcpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0ID0gcHJvamVjdDtcbiAgICAgICAgdGhpcy50aGlzQXJnID0gdGhpc0FyZztcbiAgICB9XG4gICAgTWFwT3BlcmF0b3IucHJvdG90eXBlLmNhbGwgPSBmdW5jdGlvbiAoc3Vic2NyaWJlciwgc291cmNlKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2Uuc3Vic2NyaWJlKG5ldyBNYXBTdWJzY3JpYmVyKHN1YnNjcmliZXIsIHRoaXMucHJvamVjdCwgdGhpcy50aGlzQXJnKSk7XG4gICAgfTtcbiAgICByZXR1cm4gTWFwT3BlcmF0b3I7XG59KCkpO1xuZXhwb3J0IHsgTWFwT3BlcmF0b3IgfTtcbnZhciBNYXBTdWJzY3JpYmVyID0gLypAX19QVVJFX18qLyAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIHRzbGliXzEuX19leHRlbmRzKE1hcFN1YnNjcmliZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTWFwU3Vic2NyaWJlcihkZXN0aW5hdGlvbiwgcHJvamVjdCwgdGhpc0FyZykge1xuICAgICAgICB2YXIgX3RoaXMgPSBfc3VwZXIuY2FsbCh0aGlzLCBkZXN0aW5hdGlvbikgfHwgdGhpcztcbiAgICAgICAgX3RoaXMucHJvamVjdCA9IHByb2plY3Q7XG4gICAgICAgIF90aGlzLmNvdW50ID0gMDtcbiAgICAgICAgX3RoaXMudGhpc0FyZyA9IHRoaXNBcmcgfHwgX3RoaXM7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgTWFwU3Vic2NyaWJlci5wcm90b3R5cGUuX25leHQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgdmFyIHJlc3VsdDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMucHJvamVjdC5jYWxsKHRoaXMudGhpc0FyZywgdmFsdWUsIHRoaXMuY291bnQrKyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgdGhpcy5kZXN0aW5hdGlvbi5lcnJvcihlcnIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGVzdGluYXRpb24ubmV4dChyZXN1bHQpO1xuICAgIH07XG4gICAgcmV0dXJuIE1hcFN1YnNjcmliZXI7XG59KFN1YnNjcmliZXIpKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcC5qcy5tYXBcbiIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgIFBVUkVfSU1QT1JUU19FTkQgKi9cbmV4cG9ydCB2YXIgb2JzZXJ2YWJsZSA9IC8qQF9fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLm9ic2VydmFibGUgfHwgJ0BAb2JzZXJ2YWJsZSc7IH0pKCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1vYnNlcnZhYmxlLmpzLm1hcFxuIiwiLyoqIFBVUkVfSU1QT1JUU19TVEFSVCAgUFVSRV9JTVBPUlRTX0VORCAqL1xuZXhwb3J0IHZhciByeFN1YnNjcmliZXIgPSAvKkBfX1BVUkVfXyovIChmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbidcbiAgICAgICAgPyAvKkBfX1BVUkVfXyovIFN5bWJvbCgncnhTdWJzY3JpYmVyJylcbiAgICAgICAgOiAnQEByeFN1YnNjcmliZXJfJyArIC8qQF9fUFVSRV9fKi8gTWF0aC5yYW5kb20oKTtcbn0pKCk7XG5leHBvcnQgdmFyICQkcnhTdWJzY3JpYmVyID0gcnhTdWJzY3JpYmVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cnhTdWJzY3JpYmVyLmpzLm1hcFxuIiwiLyoqIFBVUkVfSU1QT1JUU19TVEFSVCAgUFVSRV9JTVBPUlRTX0VORCAqL1xudmFyIFVuc3Vic2NyaXB0aW9uRXJyb3JJbXBsID0gLypAX19QVVJFX18qLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFVuc3Vic2NyaXB0aW9uRXJyb3JJbXBsKGVycm9ycykge1xuICAgICAgICBFcnJvci5jYWxsKHRoaXMpO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgPSBlcnJvcnMgP1xuICAgICAgICAgICAgZXJyb3JzLmxlbmd0aCArIFwiIGVycm9ycyBvY2N1cnJlZCBkdXJpbmcgdW5zdWJzY3JpcHRpb246XFxuXCIgKyBlcnJvcnMubWFwKGZ1bmN0aW9uIChlcnIsIGkpIHsgcmV0dXJuIGkgKyAxICsgXCIpIFwiICsgZXJyLnRvU3RyaW5nKCk7IH0pLmpvaW4oJ1xcbiAgJykgOiAnJztcbiAgICAgICAgdGhpcy5uYW1lID0gJ1Vuc3Vic2NyaXB0aW9uRXJyb3InO1xuICAgICAgICB0aGlzLmVycm9ycyA9IGVycm9ycztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIFVuc3Vic2NyaXB0aW9uRXJyb3JJbXBsLnByb3RvdHlwZSA9IC8qQF9fUFVSRV9fKi8gT2JqZWN0LmNyZWF0ZShFcnJvci5wcm90b3R5cGUpO1xuICAgIHJldHVybiBVbnN1YnNjcmlwdGlvbkVycm9ySW1wbDtcbn0pKCk7XG5leHBvcnQgdmFyIFVuc3Vic2NyaXB0aW9uRXJyb3IgPSBVbnN1YnNjcmlwdGlvbkVycm9ySW1wbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVVuc3Vic2NyaXB0aW9uRXJyb3IuanMubWFwXG4iLCIvKiogUFVSRV9JTVBPUlRTX1NUQVJUIF9TdWJzY3JpYmVyIFBVUkVfSU1QT1JUU19FTkQgKi9cbmltcG9ydCB7IFN1YnNjcmliZXIgfSBmcm9tICcuLi9TdWJzY3JpYmVyJztcbmV4cG9ydCBmdW5jdGlvbiBjYW5SZXBvcnRFcnJvcihvYnNlcnZlcikge1xuICAgIHdoaWxlIChvYnNlcnZlcikge1xuICAgICAgICB2YXIgX2EgPSBvYnNlcnZlciwgY2xvc2VkXzEgPSBfYS5jbG9zZWQsIGRlc3RpbmF0aW9uID0gX2EuZGVzdGluYXRpb24sIGlzU3RvcHBlZCA9IF9hLmlzU3RvcHBlZDtcbiAgICAgICAgaWYgKGNsb3NlZF8xIHx8IGlzU3RvcHBlZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGRlc3RpbmF0aW9uICYmIGRlc3RpbmF0aW9uIGluc3RhbmNlb2YgU3Vic2NyaWJlcikge1xuICAgICAgICAgICAgb2JzZXJ2ZXIgPSBkZXN0aW5hdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG9ic2VydmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNhblJlcG9ydEVycm9yLmpzLm1hcFxuIiwiLyoqIFBVUkVfSU1QT1JUU19TVEFSVCAgUFVSRV9JTVBPUlRTX0VORCAqL1xuZXhwb3J0IGZ1bmN0aW9uIGhvc3RSZXBvcnRFcnJvcihlcnIpIHtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHsgdGhyb3cgZXJyOyB9LCAwKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWhvc3RSZXBvcnRFcnJvci5qcy5tYXBcbiIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgIFBVUkVfSU1QT1JUU19FTkQgKi9cbmV4cG9ydCBmdW5jdGlvbiBpZGVudGl0eSh4KSB7XG4gICAgcmV0dXJuIHg7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pZGVudGl0eS5qcy5tYXBcbiIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgIFBVUkVfSU1QT1JUU19FTkQgKi9cbmV4cG9ydCB2YXIgaXNBcnJheSA9IC8qQF9fUFVSRV9fKi8gKGZ1bmN0aW9uICgpIHsgcmV0dXJuIEFycmF5LmlzQXJyYXkgfHwgKGZ1bmN0aW9uICh4KSB7IHJldHVybiB4ICYmIHR5cGVvZiB4Lmxlbmd0aCA9PT0gJ251bWJlcic7IH0pOyB9KSgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNBcnJheS5qcy5tYXBcbiIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgIFBVUkVfSU1QT1JUU19FTkQgKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0Z1bmN0aW9uKHgpIHtcbiAgICByZXR1cm4gdHlwZW9mIHggPT09ICdmdW5jdGlvbic7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc0Z1bmN0aW9uLmpzLm1hcFxuIiwiLyoqIFBVUkVfSU1QT1JUU19TVEFSVCAgUFVSRV9JTVBPUlRTX0VORCAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KHgpIHtcbiAgICByZXR1cm4geCAhPT0gbnVsbCAmJiB0eXBlb2YgeCA9PT0gJ29iamVjdCc7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc09iamVjdC5qcy5tYXBcbiIsIi8qKiBQVVJFX0lNUE9SVFNfU1RBUlQgX2lkZW50aXR5IFBVUkVfSU1QT1JUU19FTkQgKi9cbmltcG9ydCB7IGlkZW50aXR5IH0gZnJvbSAnLi9pZGVudGl0eSc7XG5leHBvcnQgZnVuY3Rpb24gcGlwZSgpIHtcbiAgICB2YXIgZm5zID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgZm5zW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHJldHVybiBwaXBlRnJvbUFycmF5KGZucyk7XG59XG5leHBvcnQgZnVuY3Rpb24gcGlwZUZyb21BcnJheShmbnMpIHtcbiAgICBpZiAoZm5zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gaWRlbnRpdHk7XG4gICAgfVxuICAgIGlmIChmbnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiBmbnNbMF07XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiBwaXBlZChpbnB1dCkge1xuICAgICAgICByZXR1cm4gZm5zLnJlZHVjZShmdW5jdGlvbiAocHJldiwgZm4pIHsgcmV0dXJuIGZuKHByZXYpOyB9LCBpbnB1dCk7XG4gICAgfTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXBpcGUuanMubWFwXG4iLCIvKiogUFVSRV9JTVBPUlRTX1NUQVJUIF9TdWJzY3JpYmVyLF9zeW1ib2xfcnhTdWJzY3JpYmVyLF9PYnNlcnZlciBQVVJFX0lNUE9SVFNfRU5EICovXG5pbXBvcnQgeyBTdWJzY3JpYmVyIH0gZnJvbSAnLi4vU3Vic2NyaWJlcic7XG5pbXBvcnQgeyByeFN1YnNjcmliZXIgYXMgcnhTdWJzY3JpYmVyU3ltYm9sIH0gZnJvbSAnLi4vc3ltYm9sL3J4U3Vic2NyaWJlcic7XG5pbXBvcnQgeyBlbXB0eSBhcyBlbXB0eU9ic2VydmVyIH0gZnJvbSAnLi4vT2JzZXJ2ZXInO1xuZXhwb3J0IGZ1bmN0aW9uIHRvU3Vic2NyaWJlcihuZXh0T3JPYnNlcnZlciwgZXJyb3IsIGNvbXBsZXRlKSB7XG4gICAgaWYgKG5leHRPck9ic2VydmVyKSB7XG4gICAgICAgIGlmIChuZXh0T3JPYnNlcnZlciBpbnN0YW5jZW9mIFN1YnNjcmliZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXh0T3JPYnNlcnZlcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV4dE9yT2JzZXJ2ZXJbcnhTdWJzY3JpYmVyU3ltYm9sXSkge1xuICAgICAgICAgICAgcmV0dXJuIG5leHRPck9ic2VydmVyW3J4U3Vic2NyaWJlclN5bWJvbF0oKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoIW5leHRPck9ic2VydmVyICYmICFlcnJvciAmJiAhY29tcGxldGUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTdWJzY3JpYmVyKGVtcHR5T2JzZXJ2ZXIpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFN1YnNjcmliZXIobmV4dE9yT2JzZXJ2ZXIsIGVycm9yLCBjb21wbGV0ZSk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD10b1N1YnNjcmliZXIuanMubWFwXG4iLCIvKiEgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcclxuQ29weXJpZ2h0IChjKSBNaWNyb3NvZnQgQ29ycG9yYXRpb24uXHJcblxyXG5QZXJtaXNzaW9uIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBhbmQvb3IgZGlzdHJpYnV0ZSB0aGlzIHNvZnR3YXJlIGZvciBhbnlcclxucHVycG9zZSB3aXRoIG9yIHdpdGhvdXQgZmVlIGlzIGhlcmVieSBncmFudGVkLlxyXG5cclxuVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiBBTkQgVEhFIEFVVEhPUiBESVNDTEFJTVMgQUxMIFdBUlJBTlRJRVMgV0lUSFxyXG5SRUdBUkQgVE8gVEhJUyBTT0ZUV0FSRSBJTkNMVURJTkcgQUxMIElNUExJRUQgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFlcclxuQU5EIEZJVE5FU1MuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1IgQkUgTElBQkxFIEZPUiBBTlkgU1BFQ0lBTCwgRElSRUNULFxyXG5JTkRJUkVDVCwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIE9SIEFOWSBEQU1BR0VTIFdIQVRTT0VWRVIgUkVTVUxUSU5HIEZST01cclxuTE9TUyBPRiBVU0UsIERBVEEgT1IgUFJPRklUUywgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIE5FR0xJR0VOQ0UgT1JcclxuT1RIRVIgVE9SVElPVVMgQUNUSU9OLCBBUklTSU5HIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFVTRSBPUlxyXG5QRVJGT1JNQU5DRSBPRiBUSElTIFNPRlRXQVJFLlxyXG4qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiAqL1xyXG4vKiBnbG9iYWwgUmVmbGVjdCwgUHJvbWlzZSAqL1xyXG5cclxudmFyIGV4dGVuZFN0YXRpY3MgPSBmdW5jdGlvbihkLCBiKSB7XHJcbiAgICBleHRlbmRTdGF0aWNzID0gT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8XHJcbiAgICAgICAgKHsgX19wcm90b19fOiBbXSB9IGluc3RhbmNlb2YgQXJyYXkgJiYgZnVuY3Rpb24gKGQsIGIpIHsgZC5fX3Byb3RvX18gPSBiOyB9KSB8fFxyXG4gICAgICAgIGZ1bmN0aW9uIChkLCBiKSB7IGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jcmVhdGVCaW5kaW5nKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHBvcnRTdGFyKG0sIGV4cG9ydHMpIHtcclxuICAgIGZvciAodmFyIHAgaW4gbSkgaWYgKHAgIT09IFwiZGVmYXVsdFwiICYmICFleHBvcnRzLmhhc093blByb3BlcnR5KHApKSBleHBvcnRzW3BdID0gbVtwXTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fdmFsdWVzKG8pIHtcclxuICAgIHZhciBzID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIFN5bWJvbC5pdGVyYXRvciwgbSA9IHMgJiYgb1tzXSwgaSA9IDA7XHJcbiAgICBpZiAobSkgcmV0dXJuIG0uY2FsbChvKTtcclxuICAgIGlmIChvICYmIHR5cGVvZiBvLmxlbmd0aCA9PT0gXCJudW1iZXJcIikgcmV0dXJuIHtcclxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmIChvICYmIGkgPj0gby5sZW5ndGgpIG8gPSB2b2lkIDA7XHJcbiAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiBvICYmIG9baSsrXSwgZG9uZTogIW8gfTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzID8gXCJPYmplY3QgaXMgbm90IGl0ZXJhYmxlLlwiIDogXCJTeW1ib2wuaXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZWFkKG8sIG4pIHtcclxuICAgIHZhciBtID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9bU3ltYm9sLml0ZXJhdG9yXTtcclxuICAgIGlmICghbSkgcmV0dXJuIG87XHJcbiAgICB2YXIgaSA9IG0uY2FsbChvKSwgciwgYXIgPSBbXSwgZTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgd2hpbGUgKChuID09PSB2b2lkIDAgfHwgbi0tID4gMCkgJiYgIShyID0gaS5uZXh0KCkpLmRvbmUpIGFyLnB1c2goci52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBjYXRjaCAoZXJyb3IpIHsgZSA9IHsgZXJyb3I6IGVycm9yIH07IH1cclxuICAgIGZpbmFsbHkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGlmIChyICYmICFyLmRvbmUgJiYgKG0gPSBpW1wicmV0dXJuXCJdKSkgbS5jYWxsKGkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmaW5hbGx5IHsgaWYgKGUpIHRocm93IGUuZXJyb3I7IH1cclxuICAgIH1cclxuICAgIHJldHVybiBhcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkKCkge1xyXG4gICAgZm9yICh2YXIgYXIgPSBbXSwgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgYXIgPSBhci5jb25jYXQoX19yZWFkKGFyZ3VtZW50c1tpXSkpO1xyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0KHYpIHtcclxuICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgX19hd2FpdCA/ICh0aGlzLnYgPSB2LCB0aGlzKSA6IG5ldyBfX2F3YWl0KHYpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0dlbmVyYXRvcih0aGlzQXJnLCBfYXJndW1lbnRzLCBnZW5lcmF0b3IpIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgZyA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSwgaSwgcSA9IFtdO1xyXG4gICAgcmV0dXJuIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlmIChnW25dKSBpW25dID0gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChhLCBiKSB7IHEucHVzaChbbiwgdiwgYSwgYl0pID4gMSB8fCByZXN1bWUobiwgdik7IH0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiByZXN1bWUobiwgdikgeyB0cnkgeyBzdGVwKGdbbl0odikpOyB9IGNhdGNoIChlKSB7IHNldHRsZShxWzBdWzNdLCBlKTsgfSB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKHIpIHsgci52YWx1ZSBpbnN0YW5jZW9mIF9fYXdhaXQgPyBQcm9taXNlLnJlc29sdmUoci52YWx1ZS52KS50aGVuKGZ1bGZpbGwsIHJlamVjdCkgOiBzZXR0bGUocVswXVsyXSwgcik7IH1cclxuICAgIGZ1bmN0aW9uIGZ1bGZpbGwodmFsdWUpIHsgcmVzdW1lKFwibmV4dFwiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHJlamVjdCh2YWx1ZSkgeyByZXN1bWUoXCJ0aHJvd1wiLCB2YWx1ZSk7IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShmLCB2KSB7IGlmIChmKHYpLCBxLnNoaWZ0KCksIHEubGVuZ3RoKSByZXN1bWUocVswXVswXSwgcVswXVsxXSk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXN5bmNEZWxlZ2F0b3Iobykge1xyXG4gICAgdmFyIGksIHA7XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIsIGZ1bmN0aW9uIChlKSB7IHRocm93IGU7IH0pLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuLCBmKSB7IGlbbl0gPSBvW25dID8gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIChwID0gIXApID8geyB2YWx1ZTogX19hd2FpdChvW25dKHYpKSwgZG9uZTogbiA9PT0gXCJyZXR1cm5cIiB9IDogZiA/IGYodikgOiB2OyB9IDogZjsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY1ZhbHVlcyhvKSB7XHJcbiAgICBpZiAoIVN5bWJvbC5hc3luY0l0ZXJhdG9yKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3ltYm9sLmFzeW5jSXRlcmF0b3IgaXMgbm90IGRlZmluZWQuXCIpO1xyXG4gICAgdmFyIG0gPSBvW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSwgaTtcclxuICAgIHJldHVybiBtID8gbS5jYWxsKG8pIDogKG8gPSB0eXBlb2YgX192YWx1ZXMgPT09IFwiZnVuY3Rpb25cIiA/IF9fdmFsdWVzKG8pIDogb1tTeW1ib2wuaXRlcmF0b3JdKCksIGkgPSB7fSwgdmVyYihcIm5leHRcIiksIHZlcmIoXCJ0aHJvd1wiKSwgdmVyYihcInJldHVyblwiKSwgaVtTeW1ib2wuYXN5bmNJdGVyYXRvcl0gPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzOyB9LCBpKTtcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyBpW25dID0gb1tuXSAmJiBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkgeyB2ID0gb1tuXSh2KSwgc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgdi5kb25lLCB2LnZhbHVlKTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHNldHRsZShyZXNvbHZlLCByZWplY3QsIGQsIHYpIHsgUHJvbWlzZS5yZXNvbHZlKHYpLnRoZW4oZnVuY3Rpb24odikgeyByZXNvbHZlKHsgdmFsdWU6IHYsIGRvbmU6IGQgfSk7IH0sIHJlamVjdCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZCwgcmF3KSB7XHJcbiAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsIFwicmF3XCIsIHsgdmFsdWU6IHJhdyB9KTsgfSBlbHNlIHsgY29va2VkLnJhdyA9IHJhdzsgfVxyXG4gICAgcmV0dXJuIGNvb2tlZDtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5jYWxsKG1vZCwgaykpIHJlc3VsdFtrXSA9IG1vZFtrXTtcclxuICAgIHJlc3VsdC5kZWZhdWx0ID0gbW9kO1xyXG4gICAgcmV0dXJuIHJlc3VsdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9faW1wb3J0RGVmYXVsdChtb2QpIHtcclxuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgZGVmYXVsdDogbW9kIH07XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkR2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwKSB7XHJcbiAgICBpZiAoIXByaXZhdGVNYXAuaGFzKHJlY2VpdmVyKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJhdHRlbXB0ZWQgdG8gZ2V0IHByaXZhdGUgZmllbGQgb24gbm9uLWluc3RhbmNlXCIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHByaXZhdGVNYXAuZ2V0KHJlY2VpdmVyKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fY2xhc3NQcml2YXRlRmllbGRTZXQocmVjZWl2ZXIsIHByaXZhdGVNYXAsIHZhbHVlKSB7XHJcbiAgICBpZiAoIXByaXZhdGVNYXAuaGFzKHJlY2VpdmVyKSkge1xyXG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJhdHRlbXB0ZWQgdG8gc2V0IHByaXZhdGUgZmllbGQgb24gbm9uLWluc3RhbmNlXCIpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZU1hcC5zZXQocmVjZWl2ZXIsIHZhbHVlKTtcclxuICAgIHJldHVybiB2YWx1ZTtcclxufVxyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCIvKipcbiAqIEBhdXRob3Igd2h0b29cbiAqIEBjcmVhdGVfZGF0ZSAyMDEzLTExLTIwXG4gKiBAcmV2aXNlX2RhdGUgMjAyMS0wNC0xM1xuICovXG5pbXBvcnQgdGFua2JyaWdhZGUgZnJvbSAnLi4vcmVzb3VyY2VzL3RhbmticmlnYWRlLnBuZyc7XG5pbXBvcnQgJy4uL2Nzcy9tYWluLmNzcyc7XG5pbXBvcnQgeyBmcm9tRXZlbnQgfSBmcm9tICdyeGpzJztcbmNsYXNzIEdhbWVNYW5hZ2VyIHtcbiAgICBjb25zdHJ1Y3RvcihyZW5kZXIsb3B0aW9ucykge1xuXG4gICAgfVxufVxuXG5jbGFzcyBHcmFwaGljUmVuZGVyIHtcbiAgICBjb25zdHJ1Y3Rvcihkb20sb3B0aW9ucykge1xuICAgICAgICB0aGlzLl9kb20gPSBkb20gfHwgbnVsbDtcbiAgICAgICAgdGhpcy5fb3B0aW9ucyA9IG9wdGlvbnMgfHwgbnVsbDtcbiAgICB9XG4gICAgc3RhdGljIGluc3RhbmNlID0gbmV3IEdyYXBoaWNSZW5kZXIoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhbnZhcycpLHt9KTtcblxuICAgIHNldCBkb20oZG9tKSB7XG4gICAgICAgIHRoaXMuX2RvbSA9IGRvbTtcbiAgICB9XG4gICAgZ2V0IGRvbSgpIHsgcmV0dXJuIHRoaXMuX2RvbTsgfVxuXG4gICAgc2V0IG9wdGlvbnMob3B0aW9ucykge1xuICAgICAgICB0aGlzLl9vcHRpb25zID0gb3B0aW9ucztcbiAgICB9XG5cbiAgICBnZXQgb3B0aW9ucygpIHsgcmV0dXJuIHRoaXMuX29wdGlvbnM7IH1cblxuICAgIHJlbmRlcihyZW5kZXJUcmVlKSB7XG5cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNldHVwR2FtZSgpIHtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZXZlbnRXaW5kb3dMb2FkZWQsIGZhbHNlKTtcblxuICAgIGZ1bmN0aW9uIGV2ZW50V2luZG93TG9hZGVkKCkge1xuICAgICAgICBjYW52YXNBcHAoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYW52YXNTdXBwb3J0KCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYW52YXNBcHAoKSB7XG4gICAgICAgIGlmICghY2FudmFzU3VwcG9ydCgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgdGhlQ2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIik7XG4gICAgICAgICAgICB3aW5kb3cuY29udGV4dCA9IHRoZUNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgICAgICB3aW5kb3cuZ2FtZU1hbmFnZXIgPSBuZXcgR2FtZU9iak1hbmFnZXIoKTtcbiAgICAgICAgICAgIHdpbmRvdy5yZW5kZXIgPSBuZXcgUmVuZGVyKCk7XG4gICAgICAgICAgICB3aW5kb3cuYXBDb250cm9sID0gbmV3IEFQV2F0Y2hlcigpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBLZXlJbnB1dEV2ZW50KGtleSxjb2RlKSB7XG4gICAgdGhpcy5rZXkgPSBrZXk7XG4gICAgdGhpcy5jb2RlID0gY29kZTtcbn1cblxuZnVuY3Rpb24gQVBXYXRjaGVyKCkge1xuICAgIHZhciBnbSA9IHdpbmRvdy5nYW1lTWFuYWdlcjtcbiAgICB2YXIgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcbiAgICBsZXQga2V5V2F0Y2hEb3duID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgbGV0IHBsYXllciA9IGdtLmdhbWVPYmplY3RzWzBdO1xuICAgICAgICBsZXQgY21kID0gZ20uY21kO1xuICAgICAgICBpZiAoY21kLnN0b3ApIHtcbiAgICAgICAgICAgIGNtZC5zdG9wID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKGUud2hpY2gpIHtcbiAgICAgICAgICAgIGNhc2UgMTE5OlxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwcmVzcyB3Jyk7XG4gICAgICAgICAgICAgICAgaWYgKHBsYXllci5kZXN0WSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLnJvdGF0aW9uQVAoJ3cnLGNtZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxMTU6XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3ByZXNzIHMnKTtcbiAgICAgICAgICAgICAgICBpZiAocGxheWVyLmRlc3RZIDwgMTMpIHtcbiAgICAgICAgICAgICAgICAgICAgcGxheWVyLnJvdGF0aW9uQVAoJ3MnLGNtZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA5NzpcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncHJlc3MgYScpO1xuICAgICAgICAgICAgICAgIGlmIChwbGF5ZXIuZGVzdFggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXllci5yb3RhdGlvbkFQKCdhJyxjbWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMTAwOlxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwcmVzcyBkJyk7XG4gICAgICAgICAgICAgICAgaWYgKHBsYXllci5kZXN0WCA8IDI0KSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXllci5yb3RhdGlvbkFQKCdkJyxjbWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygncHJlc3Mgb3RoZXInKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH07XG4gICAgbGV0IGtleVdhdGNoZXJVcCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGdtLmNtZC5zdG9wID0gdHJ1ZTtcbiAgICAgICAgZ20uY21kLm5leHRYID0gZ20uY21kLm5leHRZID0gMDtcblxuICAgIH07XG5cbiAgICBib2R5Lm9ua2V5dXAgPSBrZXlXYXRjaGVyVXA7XG4gICAgYm9keS5vbmtleXByZXNzID0ga2V5V2F0Y2hEb3duO1xufVxuXG5mdW5jdGlvbiBHYW1lT2JqTWFuYWdlcigpIHtcbiAgICB2YXIgb2JqTGlzdCA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTsgaSsrKSB7XG4gICAgICAgIHZhciBwbGF5ZXIgPSBuZXcgVGFua1BsYXllcignVGFuaycgKyBpLCAndycsIDApO1xuICAgICAgICBwbGF5ZXIuYW5pbVNoZWV0ID0gbmV3IFNwcml0ZUFuaW1TaGVldCgzLCA5LCAxNik7XG4gICAgICAgIG9iakxpc3QucHVzaChwbGF5ZXIpO1xuICAgIH1cbiAgICB0aGlzLmdhbWVPYmplY3RzID0gb2JqTGlzdDtcbiAgICB0aGlzLmNtZCA9IHtcbiAgICAgICAgbmV4dFg6IDAsXG4gICAgICAgIG5leHRZOiAwLFxuICAgICAgICBzdG9wOiB0cnVlXG4gICAgfTtcbiAgICB0aGlzLmlzSW5pdGVkID0gMDtcbn1cblxuLy/liqjnlLvlm77lhoxcbmZ1bmN0aW9uIFNwcml0ZUFuaW1TaGVldChzdGFydEFuaW0sIHN0b3BBbmltLCBYKSB7XG4gICAgdGhpcy5hbmltYXRpb25GcmFtZXMgPSBuZXcgQXJyYXkoKTtcbiAgICB0aGlzLmFuaW1MZW5ndGggPSBzdG9wQW5pbSAtIHN0YXJ0QW5pbSArIDE7XG4gICAgdGhpcy5vcmRlckluZGV4ID0gMDtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5hbmltTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGl0ZW0gPSBuZXcgU3ByaXRlQW5pbWF0aW9uKFgsIGkgKyBzdGFydEFuaW0pO1xuICAgICAgICB0aGlzLmFuaW1hdGlvbkZyYW1lcy5wdXNoKGl0ZW0pO1xuICAgIH1cbn1cblxuU3ByaXRlQW5pbVNoZWV0LnByb3RvdHlwZS5nZXRGcmFtZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuYW5pbWF0aW9uRnJhbWVzW3RoaXMub3JkZXJJbmRleCAlIHRoaXMuYW5pbUxlbmd0aF07XG59O1xuXG4vL+WNleahouWKqOeUu1xuZnVuY3Rpb24gU3ByaXRlQW5pbWF0aW9uKHNYLCBzWSkge1xuICAgIHRoaXMuc291cmNlRHggPSBzWCAqIDMzO1xuICAgIHRoaXMuc291cmNlRHkgPSBzWSAqIDMzO1xuICAgIHRoaXMuc291cmNlVyA9IDMzO1xuICAgIHRoaXMuc291cmNlSCA9IDMzO1xufVxuXG5mdW5jdGlvbiBQbGF5ZXIoKSB7XG4gICAgdGhpcy5zb3VyY2VEeCA9IDUyODtcbiAgICB0aGlzLnNvdXJjZUR5ID0gOTk7XG4gICAgdGhpcy5zb3VyY2VXID0gMzM7XG4gICAgdGhpcy5zb3VyY2VIID0gMzM7XG4gICAgdGhpcy5hbmltU2hlZXQgPSBudWxsO1xufVxuXG5mdW5jdGlvbiBUYW5rUGxheWVyKHRhbmtJRCwgaW5pdERpcmVjdGlvbiwgaXNVc2VyKSB7XG4gICAgLy93IDQsZCAxLHMgMixhIDNcblxuICAgIHRoaXMuZGlyZWN0aW9uID0gaW5pdERpcmVjdGlvbjtcblxuICAgIHRoaXMudGFua05hbWUgPSB0YW5rSUQ7XG4gICAgdGhpcy5pc1BsYXllciA9IGlzVXNlcjtcbiAgICAvLyB0aGlzLmRlc3RYID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMDApICUgMjMpICogMzM7XG4gICAgLy8gXHR0aGlzLmRlc3RZID0gKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxMDApICUgMTMpICogMzM7XG4gICAgdGhpcy5kZXN0Q29vayA9IDMzO1xuICAgIHRoaXMuZGVzdFggPSA2O1xuICAgIHRoaXMuZGVzdFkgPSA0O1xuICAgIHRoaXMuZGVzdFcgPSAzMztcbiAgICB0aGlzLmRlc3RIID0gMzM7XG4gICAgdGhpcy5hcmMgPSAwO1xuICAgIHRoaXMuWCA9IHRoaXMuZGVzdFggKiB0aGlzLmRlc3RDb29rO1xuICAgIHRoaXMuWSA9IHRoaXMuZGVzdFkgKiB0aGlzLmRlc3RDb29rO1xuICAgIHRoaXMuY2VudGVyWCA9IHRoaXMuWCArIHRoaXMuZGVzdFcgKiAwLjU7XG4gICAgdGhpcy5jZW50ZXJZID0gdGhpcy5ZICsgdGhpcy5kZXN0SCAqIDAuNTtcbn1cblxuVGFua1BsYXllci5wcm90b3R5cGUgPSBuZXcgUGxheWVyKCk7XG5UYW5rUGxheWVyLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFRhbmtQbGF5ZXI7XG5UYW5rUGxheWVyLnByb3RvdHlwZS5zcGVlZE0gPSA2O1xuXG5UYW5rUGxheWVyLnByb3RvdHlwZS51cGRhdGVTZWxmQ29vciA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLlggPSB0aGlzLmRlc3RYICogdGhpcy5kZXN0Q29vaztcbiAgICB0aGlzLlkgPSB0aGlzLmRlc3RZICogdGhpcy5kZXN0Q29vaztcbiAgICB0aGlzLmNlbnRlclggPSB0aGlzLlggKyB0aGlzLmRlc3RXICogMC41O1xuICAgIHRoaXMuY2VudGVyWSA9IHRoaXMuWSArIHRoaXMuZGVzdEggKiAwLjU7XG59O1xuXG5sZXQgcGVyID0gMDtcbnBlciA9IFRhbmtQbGF5ZXIucHJvdG90eXBlLnNwZWVkTSAvIDYwO1xuVGFua1BsYXllci5wcm90b3R5cGUucm90YXRpb25BUCA9IGZ1bmN0aW9uIChkaXJlY3Rpb24sY21kKSB7XG4gICAgaWYgKGRpcmVjdGlvbiAhPSB0aGlzLmRpcmVjdGlvbikge1xuICAgICAgICBjbWQubmV4dFggPSBjbWQubmV4dFkgPSAwO1xuICAgICAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgY2FzZSAndyc6XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygncHJlc3Mgd1QnKTtcbiAgICAgICAgICAgICAgICB0aGlzLmFyYyA9IDI3MDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3MnOlxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3ByZXNzIHNUJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5hcmMgPSA5MDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2EnOlxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3ByZXNzIGFUJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5hcmMgPSAxODA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkJzpcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdwcmVzcyBkVCcpO1xuICAgICAgICAgICAgICAgIHRoaXMuYXJjID0gMDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygncHJlc3Mgb3RoZXJUJyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGNtZC5zdG9wID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5hbmltU2hlZXQub3JkZXJJbmRleCsrO1xuICAgICAgICAgICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBjYXNlICd3JzpcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3ByZXNzIHdUJyk7XG4gICAgICAgICAgICAgICAgICAgIGNtZC5uZXh0WSAtPSBwZXIgKiB0aGlzLnNwZWVkTTtcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmRlc3RZIC09IHRoaXMuc3BlZWQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3MnOlxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdwcmVzcyBzVCcpO1xuICAgICAgICAgICAgICAgICAgICBjbWQubmV4dFkgKz0gcGVyICogdGhpcy5zcGVlZE07XG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5kZXN0WSArPSB0aGlzLnNwZWVkO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdhJzpcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3ByZXNzIGFUJyk7XG4gICAgICAgICAgICAgICAgICAgIGNtZC5uZXh0WCAtPSBwZXIgKiB0aGlzLnNwZWVkTTtcbiAgICAgICAgICAgICAgICAgICAgLy90aGlzLmRlc3RYIC09IHRoaXMuc3BlZWQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2QnOlxuICAgICAgICAgICAgICAgICAgICBjbWQubmV4dFggKz0gcGVyICogdGhpcy5zcGVlZE07XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ3ByZXNzIGRUJyk7XG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5kZXN0WCArPSAgdGhpcy5zcGVlZDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygncHJlc3Mgb3RoZXJUJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgICAgICB0aGlzLnVwZGF0ZVNlbGZDb29yKCk7XG4gICAgfVxuXG59O1xuXG5cbmNsYXNzIEltYWdlUmVzb3VjZSB7XG5cbiAgICBjb25zdHJ1Y3Rvcih1cmwpIHtcbiAgICAgICAgdGhpcy51cmwgPSB1cmw7XG4gICAgICAgIHRoaXMuaW1nID0gbmV3IEltYWdlKCk7XG5cbiAgICAgICAgZnJvbUV2ZW50KHRoaXMuaW1nLCAnbG9hZCcpLnN1YnNjcmliZSgoZXZ0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9vbkxvYWQoZXZ0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuaW1nLnNyYyA9IHRoaXMudXJsO1xuICAgIH1cblxuICAgIF9vbkxvYWQoZXZ0KSB7XG4gICAgICAgIGlmICh0aGlzLmNiKSB7XG4gICAgICAgICAgICB0aGlzLmNiKHRoaXMuaW1nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uTG9hZChmdW5jKSB7XG4gICAgICAgIHRoaXMuY2IgPSBmdW5jO1xuICAgIH1cblxuICAgIGltYWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5pbWc7XG4gICAgfVxufVxuLy9SZW5kZXIgT2JqZWN0IERlZlxuZnVuY3Rpb24gUmVuZGVyKCkge1xuXG4gICAgbGV0IF8gPSBuZXcgSW1hZ2VSZXNvdWNlKHRhbmticmlnYWRlKS5vbkxvYWQoZXZlbnRTaGlwTG9hZGVkLmJpbmQodGhpcykpO1xuXG4gICAgZnVuY3Rpb24gZXZlbnRTaGlwTG9hZGVkKHJlcykge1xuICAgICAgICB0aGlzLnRpbGVTaGVldCA9IHJlcztcbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgfVxuXG59XG5cbndpbmRvdy5yZXF1ZXN0QW5pbUZyYW1lID0gKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fFxuICAgICAgICB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgIHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHxcbiAgICAgICAgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgICAgIGZ1bmN0aW9uIChjYWxsYmFjaywgZWxlbWVudCkge1xuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoY2FsbGJhY2ssIDEwMDAgLyA2MCk7XG4gICAgICAgIH07XG59KSgpO1xuXG52YXIgbGFzdFRpbWUgPSBuZXcgRGF0ZSgpO1xudmFyIG9mZnNjcmVlbkNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuXG5vZmZzY3JlZW5DYW52YXMud2lkdGggPSA4MDA7XG5vZmZzY3JlZW5DYW52YXMuaGVpZ2h0ID0gNTAwO1xudmFyIG9mZnNjcmVlbkNvbnRleHQgPSBvZmZzY3JlZW5DYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuZnVuY3Rpb24gY2FsY3VsYXRlRnBzKCkge1xuICAgIHZhciBub3cgPSAoK25ldyBEYXRlKSxcbiAgICAgICAgZnBzID0gMTAwMCAvIChub3cgLSBsYXN0VGltZSk7XG4gICAgbGFzdFRpbWUgPSBub3c7XG4gICAgcmV0dXJuIGZwcztcbn1cblxuXG5mdW5jdGlvbiBvZmZzY3JlZW5DYWNoZShjb250ZXh0UmVmKSB7XG4gICAgb2Zmc2NyZWVuQ29udGV4dC5maWxsU3R5bGUgPSBcIiNhYWFhYWFcIjtcbiAgICB2YXIgbWFwUm93cyA9IDEzO1xuICAgIHZhciBtYXBDb2xzID0gMjQ7XG5cdG9mZnNjcmVlbkNvbnRleHQuZmlsbFJlY3QoMCwgMCwgKG1hcENvbHMgLSAxKSAqIDMzLCBtYXBSb3dzICogMzMpO1xuXG4gICAgdmFyIG1hcFRpdGxlID0gY29udGV4dFJlZi5tYXBUaXRsZTtcblxuICAgIHZhciBtYXBJbmRleE9mZnNldCA9IC0xO1xuXG4gICAgZm9yICh2YXIgcm93Q3RyID0gMDsgcm93Q3RyIDwgbWFwUm93czsgcm93Q3RyKyspIHtcbiAgICAgICAgZm9yICh2YXIgY29sQ3RyID0gMDsgY29sQ3RyIDwgbWFwQ29sczsgY29sQ3RyKyspIHtcbiAgICAgICAgICAgIHZhciB0aWxlSWQgPSBtYXBUaXRsZVtyb3dDdHJdW2NvbEN0cl0gKyBtYXBJbmRleE9mZnNldDtcbiAgICAgICAgICAgIHZhciBzb3VyY2VYID0gcGFyc2VJbnQodGlsZUlkICUgbWFwQ29scykgKiAzMzsgLy90bXggdXNlIGxpbmUtYmFzZWQgY291bnRcbiAgICAgICAgICAgIHZhciBzb3VyY2VZID0gcGFyc2VJbnQodGlsZUlkIC8gbWFwQ29scykgKiAzMztcbiAgICAgICAgICAgIC8vIHN0cmV0Y2ggdGlsZSB3aWxsIGVhcmFzZSBsaW5lLlxuICAgICAgICAgICAgb2Zmc2NyZWVuQ29udGV4dC5kcmF3SW1hZ2UoY29udGV4dFJlZi50aWxlU2hlZXQsIHNvdXJjZVgsIHNvdXJjZVksIDMyLCAzMiwgY29sQ3RyICogMzMsIHJvd0N0ciAqIDMzLCAzMywgMzMpO1xuICAgICAgICB9XG4gICAgfVxufVxuLy9SZW5kZXIgT2JqZWN0IHByb3RvdHlwZSBEZWZcblJlbmRlci5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IFJlbmRlcixcbiAgICBtYXBUaXRsZTogW1xuICAgICAgICBbNzgsIDc4LCA3OCwgNzgsIDc4LCA3OCwgNzgsIDc4LCA3OCwgNzgsIDc4LCA3OCwgNzgsIDc4LCA3OCwgNzgsIDc4LCA3OCwgNTUsIDc4LCA3OCwgNzgsIDc4XSxcbiAgICAgICAgWzEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDU1LCAxMDIsIDEwMiwgMTAyLCAxMDJdLFxuICAgICAgICBbMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgNTUsIDEwMiwgMTAyLCAxMDIsIDEwMl0sXG4gICAgICAgIFsxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCA1NSwgMTAyLCAxMDIsIDEwMiwgMTAyXSxcbiAgICAgICAgWzEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDAsIDEwMCwgMTAwLCAxMDAsIDU1LCAxMDIsIDEwMiwgMTAyLCAxMDJdLFxuICAgICAgICBbMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMCwgMTAwLCAxMDAsIDEwMCwgNTUsIDEwMiwgMTAyLCAxMDIsIDEwMl0sXG4gICAgICAgIFsxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCA1NSwgMTAyLCAxMDIsIDEwMiwgMTAyXSxcbiAgICAgICAgWzEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDU1LCAxMDIsIDEwMiwgMTAyLCAxMDJdLFxuICAgICAgICBbMTAyLCAxMDIsIDEwMCwgMTAwLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgNTUsIDEwMiwgMTAyLCAxMDIsIDEwMl0sXG4gICAgICAgIFsxMDIsIDEwMiwgMTAwLCAxMDAsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCA1NSwgMTAyLCAxMDIsIDEwMiwgMTAyXSxcbiAgICAgICAgWzEwMiwgMTAyLCAxMDAsIDEwMCwgMTAyLCAxMDIsIDEwMiwgMTAyLCA2MCwgNjAsIDYwLCA2MCwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgNTUsIDEwMiwgMTAyLCAxMDIsIDEwMl0sXG4gICAgICAgIFsxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgNjAsIDc0LCA3NCwgNjAsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyXSxcbiAgICAgICAgWzEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCA2MCwgNzQsIDc0LCA2MCwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDIsIDEwMiwgMTAyLCAxMDJdXG4gICAgXSxcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG9mZnNjcmVlbkNhY2hlKHRoaXMpO1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1GcmFtZSh0aGlzLmRyYXdTY3JlZW4pO1xuICAgICAgICAvL1x0XHR0aGlzLmRyYXdTY3JlZW4oKTtcbiAgICB9LFxuICAgIGRyYXdTY3JlZW46IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRpbGVTaGVldCA9IHdpbmRvdy5yZW5kZXIudGlsZVNoZWV0O1xuICAgICAgICB3aW5kb3cuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgODAwLCA2MDApO1xuXG4gICAgICAgIHdpbmRvdy5yZW5kZXIuZHJhd01hcCh0aWxlU2hlZXQpO1xuXG4gICAgICAgIHdpbmRvdy5yZW5kZXIuZHJhd1BsYXllcih0aWxlU2hlZXQsZ2FtZU1hbmFnZXIuY21kKTtcbiAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSAnY29ybmZsb3dlcmJsdWUnO1xuICAgICAgICBjb250ZXh0LmZpbGxUZXh0KGNhbGN1bGF0ZUZwcygpLnRvRml4ZWQoKSArICcgZnBzJywgMjAsIDYwKTtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltRnJhbWUoUmVuZGVyLnByb3RvdHlwZS5kcmF3U2NyZWVuLmJpbmQodGhpcykpO1xuXG4gICAgfSxcbiAgICBkcmF3UGxheWVyOiBmdW5jdGlvbiAodGlsZVNoZWV0LGNtZCkge1xuICAgICAgICBcbiAgICAgICAgdmFyIHBsYXllcnMgPSB3aW5kb3cuZ2FtZU1hbmFnZXIuZ2FtZU9iamVjdHM7XG4gICAgICAgIHZhciBpdGVtO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGxheWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaXRlbSA9IHBsYXllcnNbaV07XG4gICAgICAgICAgICBpZiAoY21kLnN0b3AgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChpdGVtLmRpcmVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICd3JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwcmVzcyB3VCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY21kLm5leHRZICs9IHBlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uZGVzdFkgLT0gcGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3ByZXNzIHNUJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbWQubmV4dFkgLT0gcGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5kZXN0WSArPSBwZXI7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2EnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3ByZXNzIGFUJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGNtZC5uZXh0WCArPSBwZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmRlc3RYIC09IHBlcjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2QnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3ByZXNzIGFEJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbWQubmV4dFggLT0gcGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5kZXN0WCArPSBwZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncHJlc3Mgb3RoZXJUJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgaXRlbS51cGRhdGVTZWxmQ29vcigpO1xuXG4gICAgICAgIH1cbiAgICAgICAgdmFyIGFuZ2xlSW5SYWRpYW5zID0gaXRlbS5hcmMgLyAxODAgKiBNYXRoLlBJO1xuICAgICAgICB2YXIgYW5pbUZyYW1lID0gaXRlbS5hbmltU2hlZXQuZ2V0RnJhbWVzKCk7XG4gICAgICAgIC8vICAgICAgICAgICAgY29uc29sZS5sb2coYW5pbUZyYW1lKTtcblxuICAgICAgICB3aW5kb3cuY29udGV4dC5zYXZlKCk7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJYOlwiK2l0ZW0uY2VudGVyWCtcIitZOlwiK2l0ZW0uY2VudGVyWSlcbiAgICAgICAgd2luZG93LmNvbnRleHQudHJhbnNsYXRlKGl0ZW0uY2VudGVyWCwgaXRlbS5jZW50ZXJZKTtcbiAgICAgICAgd2luZG93LmNvbnRleHQucm90YXRlKGFuZ2xlSW5SYWRpYW5zKTtcbiAgICAgICAgd2luZG93LmNvbnRleHQuZHJhd0ltYWdlKHRpbGVTaGVldCwgYW5pbUZyYW1lLnNvdXJjZUR4LCBhbmltRnJhbWUuc291cmNlRHksIGFuaW1GcmFtZS5zb3VyY2VXLCBhbmltRnJhbWUuc291cmNlSCwgLWl0ZW0uZGVzdFcgLyAyLCAtaXRlbS5kZXN0SCAvIDIsIGl0ZW0uZGVzdFcsIGl0ZW0uZGVzdEgpO1xuICAgICAgICB3aW5kb3cuY29udGV4dC5yZXN0b3JlKCk7XG5cbiAgICB9LFxuICAgIGRyYXdNYXA6IGZ1bmN0aW9uICh0aWxlU2hlZXQpIHtcbiAgICAgICAgLy9kcmF3IGEgYmFja2dyb3VuZCBzbyB3ZSBjYW4gc2VlIHRoZSBDYW52YXMgZWRnZXMgXG5cbiAgICAgICAgd2luZG93LmNvbnRleHQuZHJhd0ltYWdlKG9mZnNjcmVlbkNhbnZhcywgMCwgMCxcbiAgICAgICAgICAgIG9mZnNjcmVlbkNhbnZhcy53aWR0aCwgb2Zmc2NyZWVuQ2FudmFzLmhlaWdodCk7XG5cbiAgICB9XG59O1xuXG5zZXR1cEdhbWUoKTtcblxuZXhwb3J0IGRlZmF1bHQgc2V0dXBHYW1lOyJdLCJzb3VyY2VSb290IjoiIn0=