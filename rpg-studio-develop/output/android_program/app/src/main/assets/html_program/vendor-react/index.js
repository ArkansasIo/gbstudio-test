(self["webpackChunkgb_studio"] = self["webpackChunkgb_studio"] || []).push([[967],{

/***/ 19906:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   y$: () => (/* binding */ createStore)
/* harmony export */ });
/* unused harmony exports __DO_NOT_USE__ActionTypes, applyMiddleware, bindActionCreators, combineReducers, compose, legacy_createStore */


/**
 * Adapted from React: https://github.com/facebook/react/blob/master/packages/shared/formatProdErrorMessage.js
 *
 * Do not require this module directly! Use normal throw error calls. These messages will be replaced with error codes
 * during build.
 * @param {number} code
 */
function formatProdErrorMessage(code) {
  return "Minified Redux error #" + code + "; visit https://redux.js.org/Errors?code=" + code + " for the full message or " + 'use the non-minified dev environment for full errors. ';
}

// Inlined version of the `symbol-observable` polyfill
var $$observable = (function () {
  return typeof Symbol === 'function' && Symbol.observable || '@@observable';
})();

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var randomString = function randomString() {
  return Math.random().toString(36).substring(7).split('').join('.');
};

var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}

// Inlined / shortened version of `kindOf` from https://github.com/jonschlinkert/kind-of
function miniKindOf(val) {
  if (val === void 0) return 'undefined';
  if (val === null) return 'null';
  var type = typeof val;

  switch (type) {
    case 'boolean':
    case 'string':
    case 'number':
    case 'symbol':
    case 'function':
      {
        return type;
      }
  }

  if (Array.isArray(val)) return 'array';
  if (isDate(val)) return 'date';
  if (isError(val)) return 'error';
  var constructorName = ctorName(val);

  switch (constructorName) {
    case 'Symbol':
    case 'Promise':
    case 'WeakMap':
    case 'WeakSet':
    case 'Map':
    case 'Set':
      return constructorName;
  } // other


  return type.slice(8, -1).toLowerCase().replace(/\s/g, '');
}

function ctorName(val) {
  return typeof val.constructor === 'function' ? val.constructor.name : null;
}

function isError(val) {
  return val instanceof Error || typeof val.message === 'string' && val.constructor && typeof val.constructor.stackTraceLimit === 'number';
}

function isDate(val) {
  if (val instanceof Date) return true;
  return typeof val.toDateString === 'function' && typeof val.getDate === 'function' && typeof val.setDate === 'function';
}

function kindOf(val) {
  var typeOfVal = typeof val;

  if (false) {}

  return typeOfVal;
}

/**
 * @deprecated
 *
 * **We recommend using the `configureStore` method
 * of the `@reduxjs/toolkit` package**, which replaces `createStore`.
 *
 * Redux Toolkit is our recommended approach for writing Redux logic today,
 * including store setup, reducers, data fetching, and more.
 *
 * **For more details, please read this Redux docs page:**
 * **https://redux.js.org/introduction/why-rtk-is-redux-today**
 *
 * `configureStore` from Redux Toolkit is an improved version of `createStore` that
 * simplifies setup and helps avoid common bugs.
 *
 * You should not be using the `redux` core package by itself today, except for learning purposes.
 * The `createStore` method from the core `redux` package will not be removed, but we encourage
 * all users to migrate to using Redux Toolkit for all Redux code.
 *
 * If you want to use `createStore` without this visual deprecation warning, use
 * the `legacy_createStore` import instead:
 *
 * `import { legacy_createStore as createStore} from 'redux'`
 *
 */

function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
    throw new Error( true ? formatProdErrorMessage(0) : 0);
  }

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error( true ? formatProdErrorMessage(1) : 0);
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error( true ? formatProdErrorMessage(2) : 0);
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;
  /**
   * This makes a shallow copy of currentListeners so we can use
   * nextListeners as a temporary list while dispatching.
   *
   * This prevents any bugs around consumers calling
   * subscribe/unsubscribe in the middle of a dispatch.
   */

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */


  function getState() {
    if (isDispatching) {
      throw new Error( true ? formatProdErrorMessage(3) : 0);
    }

    return currentState;
  }
  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */


  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error( true ? formatProdErrorMessage(4) : 0);
    }

    if (isDispatching) {
      throw new Error( true ? formatProdErrorMessage(5) : 0);
    }

    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error( true ? formatProdErrorMessage(6) : 0);
      }

      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
      currentListeners = null;
    };
  }
  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */


  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error( true ? formatProdErrorMessage(7) : 0);
    }

    if (typeof action.type === 'undefined') {
      throw new Error( true ? formatProdErrorMessage(8) : 0);
    }

    if (isDispatching) {
      throw new Error( true ? formatProdErrorMessage(9) : 0);
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }
  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */


  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error( true ? formatProdErrorMessage(10) : 0);
    }

    currentReducer = nextReducer; // This action has a similiar effect to ActionTypes.INIT.
    // Any reducers that existed in both the new and old rootReducer
    // will receive the previous state. This effectively populates
    // the new state tree with any relevant data from the old one.

    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */


  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new Error( true ? formatProdErrorMessage(11) : 0);
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe: unsubscribe
        };
      }
    }, _ref[$$observable] = function () {
      return this;
    }, _ref;
  } // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.


  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[$$observable] = observable, _ref2;
}
/**
 * Creates a Redux store that holds the state tree.
 *
 * **We recommend using `configureStore` from the
 * `@reduxjs/toolkit` package**, which replaces `createStore`:
 * **https://redux.js.org/introduction/why-rtk-is-redux-today**
 *
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */

var legacy_createStore = (/* unused pure expression or super */ null && (createStore));

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */


  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {} // eslint-disable-line no-empty

}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!isPlainObject(inputState)) {
    return "The " + argumentName + " has unexpected type of \"" + kindOf(inputState) + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join('", "') + "\"");
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });
  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });
  if (action && action.type === ActionTypes.REPLACE) return;

  if (unexpectedKeys.length > 0) {
    return "Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " + ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored.");
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, {
      type: ActionTypes.INIT
    });

    if (typeof initialState === 'undefined') {
      throw new Error( true ? formatProdErrorMessage(12) : 0);
    }

    if (typeof reducer(undefined, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === 'undefined') {
      throw new Error( true ? formatProdErrorMessage(13) : 0);
    }
  });
}
/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */


function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};

  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (false) {}

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  var finalReducerKeys = Object.keys(finalReducers); // This is used to make sure we don't warn about the same
  // keys multiple times.

  var unexpectedKeyCache;

  if (false) {}

  var shapeAssertionError;

  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (false) { var warningMessage; }

    var hasChanged = false;
    var nextState = {};

    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);

      if (typeof nextStateForKey === 'undefined') {
        var actionType = action && action.type;
        throw new Error( true ? formatProdErrorMessage(14) : 0);
      }

      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}

function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}
/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass an action creator as the first argument,
 * and get a dispatch wrapped function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */


function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error( true ? formatProdErrorMessage(16) : 0);
  }

  var boundActionCreators = {};

  for (var key in actionCreators) {
    var actionCreator = actionCreators[key];

    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }

  return boundActionCreators;
}

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */
function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */

function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function () {
      var store = createStore.apply(void 0, arguments);

      var _dispatch = function dispatch() {
        throw new Error( true ? formatProdErrorMessage(15) : 0);
      };

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store.dispatch);
      return _objectSpread(_objectSpread({}, store), {}, {
        dispatch: _dispatch
      });
    };
  };
}




/***/ }),

/***/ 14116:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   borderBoxWarn: () => (/* binding */ borderBoxWarn),
/* harmony export */   "default": () => (/* binding */ useDimensions),
/* harmony export */   observerErr: () => (/* binding */ observerErr)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(96540);


function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

var useLatest = (function (val) {
  var ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(val);
  ref.current = val;
  return ref;
});

var observerErr = "💡 react-cool-dimensions: the browser doesn't support Resize Observer, please use polyfill: https://github.com/wellyshen/react-cool-dimensions#resizeobserver-polyfill";
var borderBoxWarn = "💡 react-cool-dimensions: the browser doesn't support border-box size, fallback to content-box size. Please see: https://github.com/wellyshen/react-cool-dimensions#border-box-size-measurement";
var getCurrentBreakpoint = function getCurrentBreakpoint(bps, w) {
  var curBp = "";
  var max = -1;
  Object.keys(bps).forEach(function (key) {
    var val = bps[key];
    if (w >= val && val > max) {
      curBp = key;
      max = val;
    }
  });
  return curBp;
};
var useDimensions = function useDimensions(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
    useBorderBoxSize = _ref.useBorderBoxSize,
    breakpoints = _ref.breakpoints,
    updateOnBreakpointChange = _ref.updateOnBreakpointChange,
    shouldUpdate = _ref.shouldUpdate,
    onResize = _ref.onResize,
    polyfill = _ref.polyfill;
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
      currentBreakpoint: "",
      width: null,
      height: null
    }),
    state = _useState[0],
    setState = _useState[1];
  var prevSizeRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({});
  var prevBreakpointRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  var observerRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  var warnedRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);
  var ref = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)();
  var onResizeRef = useLatest(onResize);
  var shouldUpdateRef = useLatest(shouldUpdate);
  var unobserve = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (observerRef.current) observerRef.current.disconnect();
  }, []);
  var observe = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (element) {
    if (element && element !== ref.current) {
      unobserve();
      ref.current = element;
      setState({
        currentBreakpoint: "",
        width: element.clientWidth,
        height: element.clientHeight
      });
    }
    if (observerRef.current && ref.current) observerRef.current.observe(ref.current);
  }, [unobserve]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if ((!("ResizeObserver" in window) || !("ResizeObserverEntry" in window)) && !polyfill) {
      console.error(observerErr);
      return function () {
        return null;
      };
    }
    var raf = null;

    // eslint-disable-next-line compat/compat
    observerRef.current = new (polyfill || ResizeObserver)(function (_ref2) {
      var entry = _ref2[0];
      raf = requestAnimationFrame(function () {
        var contentBoxSize = entry.contentBoxSize,
          borderBoxSize = entry.borderBoxSize,
          contentRect = entry.contentRect;
        var boxSize = contentBoxSize;
        if (useBorderBoxSize) if (borderBoxSize) {
          boxSize = borderBoxSize;
        } else if (!warnedRef.current) {
          console.warn(borderBoxWarn);
          warnedRef.current = true;
        }
        // @juggle/resize-observer polyfill has different data structure
        boxSize = Array.isArray(boxSize) ? boxSize[0] : boxSize;
        var width = boxSize ? boxSize.inlineSize : contentRect.width;
        var height = boxSize ? boxSize.blockSize : contentRect.height;
        if (width === prevSizeRef.current.width && height === prevSizeRef.current.height) return;
        prevSizeRef.current = {
          width: width,
          height: height
        };
        var e = {
          currentBreakpoint: "",
          width: width,
          height: height,
          entry: entry,
          observe: observe,
          unobserve: unobserve
        };
        if (breakpoints) {
          e.currentBreakpoint = getCurrentBreakpoint(breakpoints, width);
          if (e.currentBreakpoint !== prevBreakpointRef.current) {
            if (onResizeRef.current) onResizeRef.current(e);
            prevBreakpointRef.current = e.currentBreakpoint;
          }
        } else if (onResizeRef.current) {
          onResizeRef.current(e);
        }
        var next = {
          currentBreakpoint: e.currentBreakpoint,
          width: width,
          height: height,
          entry: entry
        };
        if (shouldUpdateRef.current && !shouldUpdateRef.current(next)) return;
        if (!shouldUpdateRef.current && breakpoints && updateOnBreakpointChange) {
          setState(function (prev) {
            return prev.currentBreakpoint !== next.currentBreakpoint ? next : prev;
          });
          return;
        }
        setState(next);
      });
    });
    observe();
    return function () {
      unobserve();
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
  // eslint-disable-next-line react-hooks/exhaustive-deps
  JSON.stringify(breakpoints), useBorderBoxSize, observe, unobserve, updateOnBreakpointChange]);
  return _extends({}, state, {
    observe: observe,
    unobserve: unobserve
  });
};


//# sourceMappingURL=index.esm.js.map


/***/ }),

/***/ 88218:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   g: () => (/* binding */ isFirefox),
/* harmony export */   n: () => (/* binding */ isSafari)
/* harmony export */ });
/* harmony import */ var _utils_js_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(99613);

var isFirefox = (0,_utils_js_utils__WEBPACK_IMPORTED_MODULE_0__/* .memoize */ .Bj)(function () {
  return /firefox/i.test(navigator.userAgent);
});
var isSafari = (0,_utils_js_utils__WEBPACK_IMPORTED_MODULE_0__/* .memoize */ .Bj)(function () {
  return Boolean(window.safari);
});

/***/ }),

/***/ 6951:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: () => (/* binding */ EnterLeaveCounter)
/* harmony export */ });
if (175 == __webpack_require__.j) {
	/* harmony import */ var _utils_js_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(99613);
}
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var EnterLeaveCounter = /*#__PURE__*/(/* runtime-dependent pure expression or super */ 175 == __webpack_require__.j ? (function () {
  function EnterLeaveCounter(isNodeInDocument) {
    _classCallCheck(this, EnterLeaveCounter);

    this.entered = [];
    this.isNodeInDocument = isNodeInDocument;
  }

  _createClass(EnterLeaveCounter, [{
    key: "enter",
    value: function enter(enteringNode) {
      var _this = this;

      var previousLength = this.entered.length;

      var isNodeEntered = function isNodeEntered(node) {
        return _this.isNodeInDocument(node) && (!node.contains || node.contains(enteringNode));
      };

      this.entered = (0,_utils_js_utils__WEBPACK_IMPORTED_MODULE_0__/* .union */ .KC)(this.entered.filter(isNodeEntered), [enteringNode]);
      return previousLength === 0 && this.entered.length > 0;
    }
  }, {
    key: "leave",
    value: function leave(leavingNode) {
      var previousLength = this.entered.length;
      this.entered = (0,_utils_js_utils__WEBPACK_IMPORTED_MODULE_0__/* .without */ .FF)(this.entered.filter(this.isNodeInDocument), leavingNode);
      return previousLength > 0 && this.entered.length === 0;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.entered = [];
    }
  }]);

  return EnterLeaveCounter;
}()) : null);

/***/ }),

/***/ 94256:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   f: () => (/* binding */ HTML5BackendImpl)
/* harmony export */ });
if (175 == __webpack_require__.j) {
	/* harmony import */ var _EnterLeaveCounter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6951);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _OffsetUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(25592);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _NativeDragSources__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(19326);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _NativeTypes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(50052);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _OptionsReader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(73029);
}
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }






var HTML5BackendImpl = /*#__PURE__*/(/* runtime-dependent pure expression or super */ 175 == __webpack_require__.j ? (function () {
  function HTML5BackendImpl(manager, globalContext, options) {
    var _this = this;

    _classCallCheck(this, HTML5BackendImpl);

    this.sourcePreviewNodes = new Map();
    this.sourcePreviewNodeOptions = new Map();
    this.sourceNodes = new Map();
    this.sourceNodeOptions = new Map();
    this.dragStartSourceIds = null;
    this.dropTargetIds = [];
    this.dragEnterTargetIds = [];
    this.currentNativeSource = null;
    this.currentNativeHandle = null;
    this.currentDragSourceNode = null;
    this.altKeyPressed = false;
    this.mouseMoveTimeoutTimer = null;
    this.asyncEndDragFrameId = null;
    this.dragOverTargetIds = null;

    this.getSourceClientOffset = function (sourceId) {
      var source = _this.sourceNodes.get(sourceId);

      return source && (0,_OffsetUtils__WEBPACK_IMPORTED_MODULE_0__/* .getNodeClientOffset */ .Dg)(source) || null;
    };

    this.endDragNativeItem = function () {
      if (!_this.isDraggingNativeItem()) {
        return;
      }

      _this.actions.endDrag();

      if (_this.currentNativeHandle) {
        _this.registry.removeSource(_this.currentNativeHandle);
      }

      _this.currentNativeHandle = null;
      _this.currentNativeSource = null;
    };

    this.isNodeInDocument = function (node) {
      // Check the node either in the main document or in the current context
      return Boolean(node && _this.document && _this.document.body && document.body.contains(node));
    };

    this.endDragIfSourceWasRemovedFromDOM = function () {
      var node = _this.currentDragSourceNode;

      if (node == null || _this.isNodeInDocument(node)) {
        return;
      }

      if (_this.clearCurrentDragSourceNode() && _this.monitor.isDragging()) {
        _this.actions.endDrag();
      }
    };

    this.handleTopDragStartCapture = function () {
      _this.clearCurrentDragSourceNode();

      _this.dragStartSourceIds = [];
    };

    this.handleTopDragStart = function (e) {
      if (e.defaultPrevented) {
        return;
      }

      var dragStartSourceIds = _this.dragStartSourceIds;
      _this.dragStartSourceIds = null;
      var clientOffset = (0,_OffsetUtils__WEBPACK_IMPORTED_MODULE_0__/* .getEventClientOffset */ .b$)(e); // Avoid crashing if we missed a drop event or our previous drag died

      if (_this.monitor.isDragging()) {
        _this.actions.endDrag();
      } // Don't publish the source just yet (see why below)


      _this.actions.beginDrag(dragStartSourceIds || [], {
        publishSource: false,
        getSourceClientOffset: _this.getSourceClientOffset,
        clientOffset: clientOffset
      });

      var dataTransfer = e.dataTransfer;
      var nativeType = (0,_NativeDragSources__WEBPACK_IMPORTED_MODULE_1__/* .matchNativeItemType */ .c)(dataTransfer);

      if (_this.monitor.isDragging()) {
        if (dataTransfer && typeof dataTransfer.setDragImage === 'function') {
          // Use custom drag image if user specifies it.
          // If child drag source refuses drag but parent agrees,
          // use parent's node as drag image. Neither works in IE though.
          var sourceId = _this.monitor.getSourceId();

          var sourceNode = _this.sourceNodes.get(sourceId);

          var dragPreview = _this.sourcePreviewNodes.get(sourceId) || sourceNode;

          if (dragPreview) {
            var _this$getCurrentSourc = _this.getCurrentSourcePreviewNodeOptions(),
                anchorX = _this$getCurrentSourc.anchorX,
                anchorY = _this$getCurrentSourc.anchorY,
                offsetX = _this$getCurrentSourc.offsetX,
                offsetY = _this$getCurrentSourc.offsetY;

            var anchorPoint = {
              anchorX: anchorX,
              anchorY: anchorY
            };
            var offsetPoint = {
              offsetX: offsetX,
              offsetY: offsetY
            };
            var dragPreviewOffset = (0,_OffsetUtils__WEBPACK_IMPORTED_MODULE_0__/* .getDragPreviewOffset */ .yA)(sourceNode, dragPreview, clientOffset, anchorPoint, offsetPoint);
            dataTransfer.setDragImage(dragPreview, dragPreviewOffset.x, dragPreviewOffset.y);
          }
        }

        try {
          // Firefox won't drag without setting data
          dataTransfer === null || dataTransfer === void 0 ? void 0 : dataTransfer.setData('application/json', {});
        } catch (err) {// IE doesn't support MIME types in setData
        } // Store drag source node so we can check whether
        // it is removed from DOM and trigger endDrag manually.


        _this.setCurrentDragSourceNode(e.target); // Now we are ready to publish the drag source.. or are we not?


        var _this$getCurrentSourc2 = _this.getCurrentSourcePreviewNodeOptions(),
            captureDraggingState = _this$getCurrentSourc2.captureDraggingState;

        if (!captureDraggingState) {
          // Usually we want to publish it in the next tick so that browser
          // is able to screenshot the current (not yet dragging) state.
          //
          // It also neatly avoids a situation where render() returns null
          // in the same tick for the source element, and browser freaks out.
          setTimeout(function () {
            return _this.actions.publishDragSource();
          }, 0);
        } else {
          // In some cases the user may want to override this behavior, e.g.
          // to work around IE not supporting custom drag previews.
          //
          // When using a custom drag layer, the only way to prevent
          // the default drag preview from drawing in IE is to screenshot
          // the dragging state in which the node itself has zero opacity
          // and height. In this case, though, returning null from render()
          // will abruptly end the dragging, which is not obvious.
          //
          // This is the reason such behavior is strictly opt-in.
          _this.actions.publishDragSource();
        }
      } else if (nativeType) {
        // A native item (such as URL) dragged from inside the document
        _this.beginDragNativeItem(nativeType);
      } else if (dataTransfer && !dataTransfer.types && (e.target && !e.target.hasAttribute || !e.target.hasAttribute('draggable'))) {
        // Looks like a Safari bug: dataTransfer.types is null, but there was no draggable.
        // Just let it drag. It's a native type (URL or text) and will be picked up in
        // dragenter handler.
        return;
      } else {
        // If by this time no drag source reacted, tell browser not to drag.
        e.preventDefault();
      }
    };

    this.handleTopDragEndCapture = function () {
      if (_this.clearCurrentDragSourceNode() && _this.monitor.isDragging()) {
        // Firefox can dispatch this event in an infinite loop
        // if dragend handler does something like showing an alert.
        // Only proceed if we have not handled it already.
        _this.actions.endDrag();
      }
    };

    this.handleTopDragEnterCapture = function (e) {
      _this.dragEnterTargetIds = [];

      var isFirstEnter = _this.enterLeaveCounter.enter(e.target);

      if (!isFirstEnter || _this.monitor.isDragging()) {
        return;
      }

      var dataTransfer = e.dataTransfer;
      var nativeType = (0,_NativeDragSources__WEBPACK_IMPORTED_MODULE_1__/* .matchNativeItemType */ .c)(dataTransfer);

      if (nativeType) {
        // A native item (such as file or URL) dragged from outside the document
        _this.beginDragNativeItem(nativeType, dataTransfer);
      }
    };

    this.handleTopDragEnter = function (e) {
      var dragEnterTargetIds = _this.dragEnterTargetIds;
      _this.dragEnterTargetIds = [];

      if (!_this.monitor.isDragging()) {
        // This is probably a native item type we don't understand.
        return;
      }

      _this.altKeyPressed = e.altKey; // If the target changes position as the result of `dragenter`, `dragover` might still
      // get dispatched despite target being no longer there. The easy solution is to check
      // whether there actually is a target before firing `hover`.

      if (dragEnterTargetIds.length > 0) {
        _this.actions.hover(dragEnterTargetIds, {
          clientOffset: (0,_OffsetUtils__WEBPACK_IMPORTED_MODULE_0__/* .getEventClientOffset */ .b$)(e)
        });
      }

      var canDrop = dragEnterTargetIds.some(function (targetId) {
        return _this.monitor.canDropOnTarget(targetId);
      });

      if (canDrop) {
        // IE requires this to fire dragover events
        e.preventDefault();

        if (e.dataTransfer) {
          e.dataTransfer.dropEffect = _this.getCurrentDropEffect();
        }
      }
    };

    this.handleTopDragOverCapture = function () {
      _this.dragOverTargetIds = [];
    };

    this.handleTopDragOver = function (e) {
      var dragOverTargetIds = _this.dragOverTargetIds;
      _this.dragOverTargetIds = [];

      if (!_this.monitor.isDragging()) {
        // This is probably a native item type we don't understand.
        // Prevent default "drop and blow away the whole document" action.
        e.preventDefault();

        if (e.dataTransfer) {
          e.dataTransfer.dropEffect = 'none';
        }

        return;
      }

      _this.altKeyPressed = e.altKey;

      _this.actions.hover(dragOverTargetIds || [], {
        clientOffset: (0,_OffsetUtils__WEBPACK_IMPORTED_MODULE_0__/* .getEventClientOffset */ .b$)(e)
      });

      var canDrop = (dragOverTargetIds || []).some(function (targetId) {
        return _this.monitor.canDropOnTarget(targetId);
      });

      if (canDrop) {
        // Show user-specified drop effect.
        e.preventDefault();

        if (e.dataTransfer) {
          e.dataTransfer.dropEffect = _this.getCurrentDropEffect();
        }
      } else if (_this.isDraggingNativeItem()) {
        // Don't show a nice cursor but still prevent default
        // "drop and blow away the whole document" action.
        e.preventDefault();
      } else {
        e.preventDefault();

        if (e.dataTransfer) {
          e.dataTransfer.dropEffect = 'none';
        }
      }
    };

    this.handleTopDragLeaveCapture = function (e) {
      if (_this.isDraggingNativeItem()) {
        e.preventDefault();
      }

      var isLastLeave = _this.enterLeaveCounter.leave(e.target);

      if (!isLastLeave) {
        return;
      }

      if (_this.isDraggingNativeItem()) {
        setTimeout(function () {
          return _this.endDragNativeItem();
        }, 0);
      }
    };

    this.handleTopDropCapture = function (e) {
      _this.dropTargetIds = [];

      if (_this.isDraggingNativeItem()) {
        var _this$currentNativeSo;

        e.preventDefault();
        (_this$currentNativeSo = _this.currentNativeSource) === null || _this$currentNativeSo === void 0 ? void 0 : _this$currentNativeSo.loadDataTransfer(e.dataTransfer);
      }

      _this.enterLeaveCounter.reset();
    };

    this.handleTopDrop = function (e) {
      var dropTargetIds = _this.dropTargetIds;
      _this.dropTargetIds = [];

      _this.actions.hover(dropTargetIds, {
        clientOffset: (0,_OffsetUtils__WEBPACK_IMPORTED_MODULE_0__/* .getEventClientOffset */ .b$)(e)
      });

      _this.actions.drop({
        dropEffect: _this.getCurrentDropEffect()
      });

      if (_this.isDraggingNativeItem()) {
        _this.endDragNativeItem();
      } else if (_this.monitor.isDragging()) {
        _this.actions.endDrag();
      }
    };

    this.handleSelectStart = function (e) {
      var target = e.target; // Only IE requires us to explicitly say
      // we want drag drop operation to start

      if (typeof target.dragDrop !== 'function') {
        return;
      } // Inputs and textareas should be selectable


      if (target.tagName === 'INPUT' || target.tagName === 'SELECT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
        return;
      } // For other targets, ask IE
      // to enable drag and drop


      e.preventDefault();
      target.dragDrop();
    };

    this.options = new _OptionsReader__WEBPACK_IMPORTED_MODULE_2__/* .OptionsReader */ .s(globalContext, options);
    this.actions = manager.getActions();
    this.monitor = manager.getMonitor();
    this.registry = manager.getRegistry();
    this.enterLeaveCounter = new _EnterLeaveCounter__WEBPACK_IMPORTED_MODULE_3__/* .EnterLeaveCounter */ .C(this.isNodeInDocument);
  }
  /**
   * Generate profiling statistics for the HTML5Backend.
   */


  _createClass(HTML5BackendImpl, [{
    key: "profile",
    value: function profile() {
      var _this$dragStartSource, _this$dragOverTargetI;

      return {
        sourcePreviewNodes: this.sourcePreviewNodes.size,
        sourcePreviewNodeOptions: this.sourcePreviewNodeOptions.size,
        sourceNodeOptions: this.sourceNodeOptions.size,
        sourceNodes: this.sourceNodes.size,
        dragStartSourceIds: ((_this$dragStartSource = this.dragStartSourceIds) === null || _this$dragStartSource === void 0 ? void 0 : _this$dragStartSource.length) || 0,
        dropTargetIds: this.dropTargetIds.length,
        dragEnterTargetIds: this.dragEnterTargetIds.length,
        dragOverTargetIds: ((_this$dragOverTargetI = this.dragOverTargetIds) === null || _this$dragOverTargetI === void 0 ? void 0 : _this$dragOverTargetI.length) || 0
      };
    } // public for test

  }, {
    key: "window",
    get: function get() {
      return this.options.window;
    }
  }, {
    key: "document",
    get: function get() {
      return this.options.document;
    }
    /**
     * Get the root element to use for event subscriptions
     */

  }, {
    key: "rootElement",
    get: function get() {
      return this.options.rootElement;
    }
  }, {
    key: "setup",
    value: function setup() {
      var root = this.rootElement;

      if (root === undefined) {
        return;
      }

      if (root.__isReactDndBackendSetUp) {
        throw new Error('Cannot have two HTML5 backends at the same time.');
      }

      root.__isReactDndBackendSetUp = true;
      this.addEventListeners(root);
    }
  }, {
    key: "teardown",
    value: function teardown() {
      var root = this.rootElement;

      if (root === undefined) {
        return;
      }

      root.__isReactDndBackendSetUp = false;
      this.removeEventListeners(this.rootElement);
      this.clearCurrentDragSourceNode();

      if (this.asyncEndDragFrameId) {
        var _this$window;

        (_this$window = this.window) === null || _this$window === void 0 ? void 0 : _this$window.cancelAnimationFrame(this.asyncEndDragFrameId);
      }
    }
  }, {
    key: "connectDragPreview",
    value: function connectDragPreview(sourceId, node, options) {
      var _this2 = this;

      this.sourcePreviewNodeOptions.set(sourceId, options);
      this.sourcePreviewNodes.set(sourceId, node);
      return function () {
        _this2.sourcePreviewNodes.delete(sourceId);

        _this2.sourcePreviewNodeOptions.delete(sourceId);
      };
    }
  }, {
    key: "connectDragSource",
    value: function connectDragSource(sourceId, node, options) {
      var _this3 = this;

      this.sourceNodes.set(sourceId, node);
      this.sourceNodeOptions.set(sourceId, options);

      var handleDragStart = function handleDragStart(e) {
        return _this3.handleDragStart(e, sourceId);
      };

      var handleSelectStart = function handleSelectStart(e) {
        return _this3.handleSelectStart(e);
      };

      node.setAttribute('draggable', 'true');
      node.addEventListener('dragstart', handleDragStart);
      node.addEventListener('selectstart', handleSelectStart);
      return function () {
        _this3.sourceNodes.delete(sourceId);

        _this3.sourceNodeOptions.delete(sourceId);

        node.removeEventListener('dragstart', handleDragStart);
        node.removeEventListener('selectstart', handleSelectStart);
        node.setAttribute('draggable', 'false');
      };
    }
  }, {
    key: "connectDropTarget",
    value: function connectDropTarget(targetId, node) {
      var _this4 = this;

      var handleDragEnter = function handleDragEnter(e) {
        return _this4.handleDragEnter(e, targetId);
      };

      var handleDragOver = function handleDragOver(e) {
        return _this4.handleDragOver(e, targetId);
      };

      var handleDrop = function handleDrop(e) {
        return _this4.handleDrop(e, targetId);
      };

      node.addEventListener('dragenter', handleDragEnter);
      node.addEventListener('dragover', handleDragOver);
      node.addEventListener('drop', handleDrop);
      return function () {
        node.removeEventListener('dragenter', handleDragEnter);
        node.removeEventListener('dragover', handleDragOver);
        node.removeEventListener('drop', handleDrop);
      };
    }
  }, {
    key: "addEventListeners",
    value: function addEventListeners(target) {
      // SSR Fix (https://github.com/react-dnd/react-dnd/pull/813
      if (!target.addEventListener) {
        return;
      }

      target.addEventListener('dragstart', this.handleTopDragStart);
      target.addEventListener('dragstart', this.handleTopDragStartCapture, true);
      target.addEventListener('dragend', this.handleTopDragEndCapture, true);
      target.addEventListener('dragenter', this.handleTopDragEnter);
      target.addEventListener('dragenter', this.handleTopDragEnterCapture, true);
      target.addEventListener('dragleave', this.handleTopDragLeaveCapture, true);
      target.addEventListener('dragover', this.handleTopDragOver);
      target.addEventListener('dragover', this.handleTopDragOverCapture, true);
      target.addEventListener('drop', this.handleTopDrop);
      target.addEventListener('drop', this.handleTopDropCapture, true);
    }
  }, {
    key: "removeEventListeners",
    value: function removeEventListeners(target) {
      // SSR Fix (https://github.com/react-dnd/react-dnd/pull/813
      if (!target.removeEventListener) {
        return;
      }

      target.removeEventListener('dragstart', this.handleTopDragStart);
      target.removeEventListener('dragstart', this.handleTopDragStartCapture, true);
      target.removeEventListener('dragend', this.handleTopDragEndCapture, true);
      target.removeEventListener('dragenter', this.handleTopDragEnter);
      target.removeEventListener('dragenter', this.handleTopDragEnterCapture, true);
      target.removeEventListener('dragleave', this.handleTopDragLeaveCapture, true);
      target.removeEventListener('dragover', this.handleTopDragOver);
      target.removeEventListener('dragover', this.handleTopDragOverCapture, true);
      target.removeEventListener('drop', this.handleTopDrop);
      target.removeEventListener('drop', this.handleTopDropCapture, true);
    }
  }, {
    key: "getCurrentSourceNodeOptions",
    value: function getCurrentSourceNodeOptions() {
      var sourceId = this.monitor.getSourceId();
      var sourceNodeOptions = this.sourceNodeOptions.get(sourceId);
      return _objectSpread({
        dropEffect: this.altKeyPressed ? 'copy' : 'move'
      }, sourceNodeOptions || {});
    }
  }, {
    key: "getCurrentDropEffect",
    value: function getCurrentDropEffect() {
      if (this.isDraggingNativeItem()) {
        // It makes more sense to default to 'copy' for native resources
        return 'copy';
      }

      return this.getCurrentSourceNodeOptions().dropEffect;
    }
  }, {
    key: "getCurrentSourcePreviewNodeOptions",
    value: function getCurrentSourcePreviewNodeOptions() {
      var sourceId = this.monitor.getSourceId();
      var sourcePreviewNodeOptions = this.sourcePreviewNodeOptions.get(sourceId);
      return _objectSpread({
        anchorX: 0.5,
        anchorY: 0.5,
        captureDraggingState: false
      }, sourcePreviewNodeOptions || {});
    }
  }, {
    key: "isDraggingNativeItem",
    value: function isDraggingNativeItem() {
      var itemType = this.monitor.getItemType();
      return Object.keys(_NativeTypes__WEBPACK_IMPORTED_MODULE_4__).some(function (key) {
        return _NativeTypes__WEBPACK_IMPORTED_MODULE_4__[key] === itemType;
      });
    }
  }, {
    key: "beginDragNativeItem",
    value: function beginDragNativeItem(type, dataTransfer) {
      this.clearCurrentDragSourceNode();
      this.currentNativeSource = (0,_NativeDragSources__WEBPACK_IMPORTED_MODULE_1__/* .createNativeDragSource */ .h)(type, dataTransfer);
      this.currentNativeHandle = this.registry.addSource(type, this.currentNativeSource);
      this.actions.beginDrag([this.currentNativeHandle]);
    }
  }, {
    key: "setCurrentDragSourceNode",
    value: function setCurrentDragSourceNode(node) {
      var _this5 = this;

      this.clearCurrentDragSourceNode();
      this.currentDragSourceNode = node; // A timeout of > 0 is necessary to resolve Firefox issue referenced
      // See:
      //   * https://github.com/react-dnd/react-dnd/pull/928
      //   * https://github.com/react-dnd/react-dnd/issues/869

      var MOUSE_MOVE_TIMEOUT = 1000; // Receiving a mouse event in the middle of a dragging operation
      // means it has ended and the drag source node disappeared from DOM,
      // so the browser didn't dispatch the dragend event.
      //
      // We need to wait before we start listening for mousemove events.
      // This is needed because the drag preview needs to be drawn or else it fires an 'mousemove' event
      // immediately in some browsers.
      //
      // See:
      //   * https://github.com/react-dnd/react-dnd/pull/928
      //   * https://github.com/react-dnd/react-dnd/issues/869
      //

      this.mouseMoveTimeoutTimer = setTimeout(function () {
        var _this5$rootElement;

        return (_this5$rootElement = _this5.rootElement) === null || _this5$rootElement === void 0 ? void 0 : _this5$rootElement.addEventListener('mousemove', _this5.endDragIfSourceWasRemovedFromDOM, true);
      }, MOUSE_MOVE_TIMEOUT);
    }
  }, {
    key: "clearCurrentDragSourceNode",
    value: function clearCurrentDragSourceNode() {
      if (this.currentDragSourceNode) {
        this.currentDragSourceNode = null;

        if (this.rootElement) {
          var _this$window2;

          (_this$window2 = this.window) === null || _this$window2 === void 0 ? void 0 : _this$window2.clearTimeout(this.mouseMoveTimeoutTimer || undefined);
          this.rootElement.removeEventListener('mousemove', this.endDragIfSourceWasRemovedFromDOM, true);
        }

        this.mouseMoveTimeoutTimer = null;
        return true;
      }

      return false;
    }
  }, {
    key: "handleDragStart",
    value: function handleDragStart(e, sourceId) {
      if (e.defaultPrevented) {
        return;
      }

      if (!this.dragStartSourceIds) {
        this.dragStartSourceIds = [];
      }

      this.dragStartSourceIds.unshift(sourceId);
    }
  }, {
    key: "handleDragEnter",
    value: function handleDragEnter(e, targetId) {
      this.dragEnterTargetIds.unshift(targetId);
    }
  }, {
    key: "handleDragOver",
    value: function handleDragOver(e, targetId) {
      if (this.dragOverTargetIds === null) {
        this.dragOverTargetIds = [];
      }

      this.dragOverTargetIds.unshift(targetId);
    }
  }, {
    key: "handleDrop",
    value: function handleDrop(e, targetId) {
      this.dropTargetIds.unshift(targetId);
    }
  }]);

  return HTML5BackendImpl;
}()) : null);

/***/ }),

/***/ 4584:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   f: () => (/* binding */ MonotonicInterpolant)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MonotonicInterpolant = /*#__PURE__*/(/* runtime-dependent pure expression or super */ 175 == __webpack_require__.j ? (function () {
  function MonotonicInterpolant(xs, ys) {
    _classCallCheck(this, MonotonicInterpolant);

    var length = xs.length; // Rearrange xs and ys so that xs is sorted

    var indexes = [];

    for (var i = 0; i < length; i++) {
      indexes.push(i);
    }

    indexes.sort(function (a, b) {
      return xs[a] < xs[b] ? -1 : 1;
    }); // Get consecutive differences and slopes

    var dys = [];
    var dxs = [];
    var ms = [];
    var dx;
    var dy;

    for (var _i = 0; _i < length - 1; _i++) {
      dx = xs[_i + 1] - xs[_i];
      dy = ys[_i + 1] - ys[_i];
      dxs.push(dx);
      dys.push(dy);
      ms.push(dy / dx);
    } // Get degree-1 coefficients


    var c1s = [ms[0]];

    for (var _i2 = 0; _i2 < dxs.length - 1; _i2++) {
      var m2 = ms[_i2];
      var mNext = ms[_i2 + 1];

      if (m2 * mNext <= 0) {
        c1s.push(0);
      } else {
        dx = dxs[_i2];
        var dxNext = dxs[_i2 + 1];
        var common = dx + dxNext;
        c1s.push(3 * common / ((common + dxNext) / m2 + (common + dx) / mNext));
      }
    }

    c1s.push(ms[ms.length - 1]); // Get degree-2 and degree-3 coefficients

    var c2s = [];
    var c3s = [];
    var m;

    for (var _i3 = 0; _i3 < c1s.length - 1; _i3++) {
      m = ms[_i3];
      var c1 = c1s[_i3];
      var invDx = 1 / dxs[_i3];

      var _common = c1 + c1s[_i3 + 1] - m - m;

      c2s.push((m - c1 - _common) * invDx);
      c3s.push(_common * invDx * invDx);
    }

    this.xs = xs;
    this.ys = ys;
    this.c1s = c1s;
    this.c2s = c2s;
    this.c3s = c3s;
  }

  _createClass(MonotonicInterpolant, [{
    key: "interpolate",
    value: function interpolate(x) {
      var xs = this.xs,
          ys = this.ys,
          c1s = this.c1s,
          c2s = this.c2s,
          c3s = this.c3s; // The rightmost point in the dataset should give an exact result

      var i = xs.length - 1;

      if (x === xs[i]) {
        return ys[i];
      } // Search for the interval x is in, returning the corresponding y if x is one of the original xs


      var low = 0;
      var high = c3s.length - 1;
      var mid;

      while (low <= high) {
        mid = Math.floor(0.5 * (low + high));
        var xHere = xs[mid];

        if (xHere < x) {
          low = mid + 1;
        } else if (xHere > x) {
          high = mid - 1;
        } else {
          return ys[mid];
        }
      }

      i = Math.max(0, high); // Interpolate

      var diff = x - xs[i];
      var diffSq = diff * diff;
      return ys[i] + c1s[i] * diff + c2s[i] * diffSq + c3s[i] * diff * diffSq;
    }
  }]);

  return MonotonicInterpolant;
}()) : null);

/***/ }),

/***/ 42424:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   x: () => (/* binding */ NativeDragSource)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var NativeDragSource = /*#__PURE__*/(/* runtime-dependent pure expression or super */ 175 == __webpack_require__.j ? (function () {
  function NativeDragSource(config) {
    _classCallCheck(this, NativeDragSource);

    this.config = config;
    this.item = {};
    this.initializeExposedProperties();
  }

  _createClass(NativeDragSource, [{
    key: "initializeExposedProperties",
    value: function initializeExposedProperties() {
      var _this = this;

      Object.keys(this.config.exposeProperties).forEach(function (property) {
        Object.defineProperty(_this.item, property, {
          configurable: true,
          enumerable: true,
          get: function get() {
            // eslint-disable-next-line no-console
            console.warn("Browser doesn't allow reading \"".concat(property, "\" until the drop event."));
            return null;
          }
        });
      });
    }
  }, {
    key: "loadDataTransfer",
    value: function loadDataTransfer(dataTransfer) {
      var _this2 = this;

      if (dataTransfer) {
        var newProperties = {};
        Object.keys(this.config.exposeProperties).forEach(function (property) {
          newProperties[property] = {
            value: _this2.config.exposeProperties[property](dataTransfer, _this2.config.matchesTypes),
            configurable: true,
            enumerable: true
          };
        });
        Object.defineProperties(this.item, newProperties);
      }
    }
  }, {
    key: "canDrag",
    value: function canDrag() {
      return true;
    }
  }, {
    key: "beginDrag",
    value: function beginDrag() {
      return this.item;
    }
  }, {
    key: "isDragging",
    value: function isDragging(monitor, handle) {
      return handle === monitor.getSourceId();
    }
  }, {
    key: "endDrag",
    value: function endDrag() {// empty
    }
  }]);

  return NativeDragSource;
}()) : null);

/***/ }),

/***/ 19326:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: () => (/* binding */ matchNativeItemType),
/* harmony export */   h: () => (/* binding */ createNativeDragSource)
/* harmony export */ });
if (175 == __webpack_require__.j) {
	/* harmony import */ var _nativeTypesConfig__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(97338);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _NativeDragSource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42424);
}


function createNativeDragSource(type, dataTransfer) {
  var result = new _NativeDragSource__WEBPACK_IMPORTED_MODULE_0__/* .NativeDragSource */ .x(_nativeTypesConfig__WEBPACK_IMPORTED_MODULE_1__/* .nativeTypesConfig */ .l[type]);
  result.loadDataTransfer(dataTransfer);
  return result;
}
function matchNativeItemType(dataTransfer) {
  if (!dataTransfer) {
    return null;
  }

  var dataTransferTypes = Array.prototype.slice.call(dataTransfer.types || []);
  return Object.keys(_nativeTypesConfig__WEBPACK_IMPORTED_MODULE_1__/* .nativeTypesConfig */ .l).filter(function (nativeItemType) {
    var matchesTypes = _nativeTypesConfig__WEBPACK_IMPORTED_MODULE_1__/* .nativeTypesConfig */ .l[nativeItemType].matchesTypes;
    return matchesTypes.some(function (t) {
      return dataTransferTypes.indexOf(t) > -1;
    });
  })[0] || null;
}

/***/ }),

/***/ 97338:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  l: () => (/* binding */ nativeTypesConfig)
});

// EXTERNAL MODULE: ./node_modules/react-dnd-html5-backend/dist/esm/NativeTypes.js
var NativeTypes = __webpack_require__(50052);
;// CONCATENATED MODULE: ./node_modules/react-dnd-html5-backend/dist/esm/NativeDragSources/getDataFromDataTransfer.js
function getDataFromDataTransfer(dataTransfer, typesToTry, defaultValue) {
  var result = typesToTry.reduce(function (resultSoFar, typeToTry) {
    return resultSoFar || dataTransfer.getData(typeToTry);
  }, '');
  return result != null ? result : defaultValue;
}
;// CONCATENATED MODULE: ./node_modules/react-dnd-html5-backend/dist/esm/NativeDragSources/nativeTypesConfig.js
var _nativeTypesConfig;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var nativeTypesConfig = (_nativeTypesConfig = {}, _defineProperty(_nativeTypesConfig, NativeTypes.FILE, {
  exposeProperties: {
    files: function files(dataTransfer) {
      return Array.prototype.slice.call(dataTransfer.files);
    },
    items: function items(dataTransfer) {
      return dataTransfer.items;
    }
  },
  matchesTypes: ['Files']
}), _defineProperty(_nativeTypesConfig, NativeTypes.HTML, {
  exposeProperties: {
    html: function html(dataTransfer, matchesTypes) {
      return getDataFromDataTransfer(dataTransfer, matchesTypes, '');
    }
  },
  matchesTypes: ['Html', 'text/html']
}), _defineProperty(_nativeTypesConfig, NativeTypes.URL, {
  exposeProperties: {
    urls: function urls(dataTransfer, matchesTypes) {
      return getDataFromDataTransfer(dataTransfer, matchesTypes, '').split('\n');
    }
  },
  matchesTypes: ['Url', 'text/uri-list']
}), _defineProperty(_nativeTypesConfig, NativeTypes.TEXT, {
  exposeProperties: {
    text: function text(dataTransfer, matchesTypes) {
      return getDataFromDataTransfer(dataTransfer, matchesTypes, '');
    }
  },
  matchesTypes: ['Text', 'text/plain']
}), _nativeTypesConfig);

/***/ }),

/***/ 50052:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FILE: () => (/* binding */ FILE),
/* harmony export */   HTML: () => (/* binding */ HTML),
/* harmony export */   TEXT: () => (/* binding */ TEXT),
/* harmony export */   URL: () => (/* binding */ URL)
/* harmony export */ });
var FILE = '__NATIVE_FILE__';
var URL = '__NATIVE_URL__';
var TEXT = '__NATIVE_TEXT__';
var HTML = '__NATIVE_HTML__';

/***/ }),

/***/ 25592:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Dg: () => (/* binding */ getNodeClientOffset),
/* harmony export */   b$: () => (/* binding */ getEventClientOffset),
/* harmony export */   yA: () => (/* binding */ getDragPreviewOffset)
/* harmony export */ });
if (175 == __webpack_require__.j) {
	/* harmony import */ var _BrowserDetector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(88218);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _MonotonicInterpolant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4584);
}


var ELEMENT_NODE = 1;
function getNodeClientOffset(node) {
  var el = node.nodeType === ELEMENT_NODE ? node : node.parentElement;

  if (!el) {
    return null;
  }

  var _el$getBoundingClient = el.getBoundingClientRect(),
      top = _el$getBoundingClient.top,
      left = _el$getBoundingClient.left;

  return {
    x: left,
    y: top
  };
}
function getEventClientOffset(e) {
  return {
    x: e.clientX,
    y: e.clientY
  };
}

function isImageNode(node) {
  var _document$documentEle;

  return node.nodeName === 'IMG' && ((0,_BrowserDetector__WEBPACK_IMPORTED_MODULE_0__/* .isFirefox */ .g)() || !((_document$documentEle = document.documentElement) !== null && _document$documentEle !== void 0 && _document$documentEle.contains(node)));
}

function getDragPreviewSize(isImage, dragPreview, sourceWidth, sourceHeight) {
  var dragPreviewWidth = isImage ? dragPreview.width : sourceWidth;
  var dragPreviewHeight = isImage ? dragPreview.height : sourceHeight; // Work around @2x coordinate discrepancies in browsers

  if ((0,_BrowserDetector__WEBPACK_IMPORTED_MODULE_0__/* .isSafari */ .n)() && isImage) {
    dragPreviewHeight /= window.devicePixelRatio;
    dragPreviewWidth /= window.devicePixelRatio;
  }

  return {
    dragPreviewWidth: dragPreviewWidth,
    dragPreviewHeight: dragPreviewHeight
  };
}

function getDragPreviewOffset(sourceNode, dragPreview, clientOffset, anchorPoint, offsetPoint) {
  // The browsers will use the image intrinsic size under different conditions.
  // Firefox only cares if it's an image, but WebKit also wants it to be detached.
  var isImage = isImageNode(dragPreview);
  var dragPreviewNode = isImage ? sourceNode : dragPreview;
  var dragPreviewNodeOffsetFromClient = getNodeClientOffset(dragPreviewNode);
  var offsetFromDragPreview = {
    x: clientOffset.x - dragPreviewNodeOffsetFromClient.x,
    y: clientOffset.y - dragPreviewNodeOffsetFromClient.y
  };
  var sourceWidth = sourceNode.offsetWidth,
      sourceHeight = sourceNode.offsetHeight;
  var anchorX = anchorPoint.anchorX,
      anchorY = anchorPoint.anchorY;

  var _getDragPreviewSize = getDragPreviewSize(isImage, dragPreview, sourceWidth, sourceHeight),
      dragPreviewWidth = _getDragPreviewSize.dragPreviewWidth,
      dragPreviewHeight = _getDragPreviewSize.dragPreviewHeight;

  var calculateYOffset = function calculateYOffset() {
    var interpolantY = new _MonotonicInterpolant__WEBPACK_IMPORTED_MODULE_1__/* .MonotonicInterpolant */ .f([0, 0.5, 1], [// Dock to the top
    offsetFromDragPreview.y, // Align at the center
    offsetFromDragPreview.y / sourceHeight * dragPreviewHeight, // Dock to the bottom
    offsetFromDragPreview.y + dragPreviewHeight - sourceHeight]);
    var y = interpolantY.interpolate(anchorY); // Work around Safari 8 positioning bug

    if ((0,_BrowserDetector__WEBPACK_IMPORTED_MODULE_0__/* .isSafari */ .n)() && isImage) {
      // We'll have to wait for @3x to see if this is entirely correct
      y += (window.devicePixelRatio - 1) * dragPreviewHeight;
    }

    return y;
  };

  var calculateXOffset = function calculateXOffset() {
    // Interpolate coordinates depending on anchor point
    // If you know a simpler way to do this, let me know
    var interpolantX = new _MonotonicInterpolant__WEBPACK_IMPORTED_MODULE_1__/* .MonotonicInterpolant */ .f([0, 0.5, 1], [// Dock to the left
    offsetFromDragPreview.x, // Align at the center
    offsetFromDragPreview.x / sourceWidth * dragPreviewWidth, // Dock to the right
    offsetFromDragPreview.x + dragPreviewWidth - sourceWidth]);
    return interpolantX.interpolate(anchorX);
  }; // Force offsets if specified in the options.


  var offsetX = offsetPoint.offsetX,
      offsetY = offsetPoint.offsetY;
  var isManualOffsetX = offsetX === 0 || offsetX;
  var isManualOffsetY = offsetY === 0 || offsetY;
  return {
    x: isManualOffsetX ? offsetX : calculateXOffset(),
    y: isManualOffsetY ? offsetY : calculateYOffset()
  };
}

/***/ }),

/***/ 73029:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   s: () => (/* binding */ OptionsReader)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var OptionsReader = /*#__PURE__*/(/* runtime-dependent pure expression or super */ 175 == __webpack_require__.j ? (function () {
  function OptionsReader(globalContext, options) {
    _classCallCheck(this, OptionsReader);

    this.ownerDocument = null;
    this.globalContext = globalContext;
    this.optionsArgs = options;
  }

  _createClass(OptionsReader, [{
    key: "window",
    get: function get() {
      if (this.globalContext) {
        return this.globalContext;
      } else if (typeof window !== 'undefined') {
        return window;
      }

      return undefined;
    }
  }, {
    key: "document",
    get: function get() {
      var _this$globalContext;

      if ((_this$globalContext = this.globalContext) !== null && _this$globalContext !== void 0 && _this$globalContext.document) {
        return this.globalContext.document;
      } else if (this.window) {
        return this.window.document;
      } else {
        return undefined;
      }
    }
  }, {
    key: "rootElement",
    get: function get() {
      var _this$optionsArgs;

      return ((_this$optionsArgs = this.optionsArgs) === null || _this$optionsArgs === void 0 ? void 0 : _this$optionsArgs.rootElement) || this.window;
    }
  }]);

  return OptionsReader;
}()) : null);

/***/ }),

/***/ 84750:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   n: () => (/* binding */ getEmptyImage)
/* harmony export */ });
var emptyImage;
function getEmptyImage() {
  if (!emptyImage) {
    emptyImage = new Image();
    emptyImage.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
  }

  return emptyImage;
}

/***/ }),

/***/ 46740:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HTML5Backend: () => (/* binding */ HTML5Backend),
/* harmony export */   NativeTypes: () => (/* reexport module object */ _NativeTypes__WEBPACK_IMPORTED_MODULE_1__),
/* harmony export */   getEmptyImage: () => (/* reexport safe */ _getEmptyImage__WEBPACK_IMPORTED_MODULE_0__.n)
/* harmony export */ });
if (175 == __webpack_require__.j) {
	/* harmony import */ var _HTML5BackendImpl__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(94256);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _NativeTypes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(50052);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _getEmptyImage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(84750);
}




var HTML5Backend = function createBackend(manager, context, options) {
  return new _HTML5BackendImpl__WEBPACK_IMPORTED_MODULE_2__/* .HTML5BackendImpl */ .f(manager, context, options);
};

/***/ }),

/***/ 99613:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Bj: () => (/* binding */ memoize),
/* harmony export */   FF: () => (/* binding */ without),
/* harmony export */   KC: () => (/* binding */ union)
/* harmony export */ });
// cheap lodash replacements
function memoize(fn) {
  var result = null;

  var memoized = function memoized() {
    if (result == null) {
      result = fn();
    }

    return result;
  };

  return memoized;
}
/**
 * drop-in replacement for _.without
 */

function without(items, item) {
  return items.filter(function (i) {
    return i !== item;
  });
}
function union(itemsA, itemsB) {
  var set = new Set();

  var insertItem = function insertItem(item) {
    return set.add(item);
  };

  itemsA.forEach(insertItem);
  itemsB.forEach(insertItem);
  var result = [];
  set.forEach(function (key) {
    return result.push(key);
  });
  return result;
}

/***/ }),

/***/ 30653:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   M: () => (/* binding */ DndContext)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(96540);

/**
 * Create the React Context
 */

var DndContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)({
  dragDropManager: undefined
});

/***/ }),

/***/ 14853:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Q: () => (/* binding */ DndProvider)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74848);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(96540);
/* harmony import */ var dnd_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(55430);
/* harmony import */ var _DndContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(30653);
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }





var refCount = 0;
var INSTANCE_SYM = Symbol.for('__REACT_DND_CONTEXT_INSTANCE__');
/**
 * A React component that provides the React-DnD context
 */

var DndProvider = (0,react__WEBPACK_IMPORTED_MODULE_1__.memo)(function DndProvider(_ref) {
  var children = _ref.children,
      props = _objectWithoutProperties(_ref, ["children"]);

  var _getDndContextValue = getDndContextValue(props),
      _getDndContextValue2 = _slicedToArray(_getDndContextValue, 2),
      manager = _getDndContextValue2[0],
      isGlobalInstance = _getDndContextValue2[1]; // memoized from props

  /**
   * If the global context was used to store the DND context
   * then where theres no more references to it we should
   * clean it up to avoid memory leaks
   */


  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(function () {
    if (isGlobalInstance) {
      var context = getGlobalContext();
      ++refCount;
      return function () {
        if (--refCount === 0) {
          context[INSTANCE_SYM] = null;
        }
      };
    }
  }, []);
  return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_DndContext__WEBPACK_IMPORTED_MODULE_2__/* .DndContext */ .M.Provider, Object.assign({
    value: manager
  }, {
    children: children
  }), void 0);
});

function getDndContextValue(props) {
  if ('manager' in props) {
    var _manager = {
      dragDropManager: props.manager
    };
    return [_manager, false];
  }

  var manager = createSingletonDndContext(props.backend, props.context, props.options, props.debugMode);
  var isGlobalInstance = !props.context;
  return [manager, isGlobalInstance];
}

function createSingletonDndContext(backend) {
  var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : getGlobalContext();
  var options = arguments.length > 2 ? arguments[2] : undefined;
  var debugMode = arguments.length > 3 ? arguments[3] : undefined;
  var ctx = context;

  if (!ctx[INSTANCE_SYM]) {
    ctx[INSTANCE_SYM] = {
      dragDropManager: (0,dnd_core__WEBPACK_IMPORTED_MODULE_3__/* .createDragDropManager */ .b)(backend, context, options, debugMode)
    };
  }

  return ctx[INSTANCE_SYM];
}

function getGlobalContext() {
  return typeof __webpack_require__.g !== 'undefined' ? __webpack_require__.g : window;
}

/***/ }),

/***/ 46923:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I: () => (/* binding */ DragPreviewImage)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(96540);

/**
 * A utility for rendering a drag preview image
 */

var DragPreviewImage = (0,react__WEBPACK_IMPORTED_MODULE_0__.memo)(function DragPreviewImage(_ref) {
  var connect = _ref.connect,
      src = _ref.src;
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    if (typeof Image === 'undefined') return;
    var connected = false;
    var img = new Image();
    img.src = src;

    img.onload = function () {
      connect(img);
      connected = true;
    };

    return function () {
      if (connected) {
        connect(null);
      }
    };
  });
  return null;
});

/***/ }),

/***/ 37998:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ic: () => (/* reexport safe */ _DragPreviewImage__WEBPACK_IMPORTED_MODULE_2__.I),
/* harmony export */   Mp: () => (/* reexport safe */ _DndContext__WEBPACK_IMPORTED_MODULE_0__.M),
/* harmony export */   QP: () => (/* reexport safe */ _DndProvider__WEBPACK_IMPORTED_MODULE_1__.Q)
/* harmony export */ });
if (175 == __webpack_require__.j) {
	/* harmony import */ var _DndContext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(30653);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _DndProvider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14853);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _DragPreviewImage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(46923);
}




/***/ }),

/***/ 53936:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   M: () => (/* binding */ DragLayer)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74848);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(96540);
if (175 == __webpack_require__.j) {
	/* harmony import */ var _react_dnd_shallowequal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(49194);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _react_dnd_invariant__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(72954);
}
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4146);
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_2__);
if (175 == __webpack_require__.j) {
	/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(30653);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(79602);
}
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }








/**
 * @param collect The props collector function
 * @param options The DnD options
 */

function DragLayer(collect) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  (0,_utils__WEBPACK_IMPORTED_MODULE_3__/* .checkDecoratorArguments */ .cl)('DragLayer', 'collect[, options]', collect, options);
  (0,_react_dnd_invariant__WEBPACK_IMPORTED_MODULE_4__/* .invariant */ .V)(typeof collect === 'function', 'Expected "collect" provided as the first argument to DragLayer to be a function that collects props to inject into the component. ', 'Instead, received %s. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-layer', collect);
  (0,_react_dnd_invariant__WEBPACK_IMPORTED_MODULE_4__/* .invariant */ .V)((0,_utils__WEBPACK_IMPORTED_MODULE_3__/* .isPlainObject */ .Qd)(options), 'Expected "options" provided as the second argument to DragLayer to be a plain object when specified. ' + 'Instead, received %s. Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-layer', options);
  return function decorateLayer(DecoratedComponent) {
    var Decorated = DecoratedComponent;
    var _options$arePropsEqua = options.arePropsEqual,
        arePropsEqual = _options$arePropsEqua === void 0 ? _react_dnd_shallowequal__WEBPACK_IMPORTED_MODULE_5__/* .shallowEqual */ .b : _options$arePropsEqua;
    var displayName = Decorated.displayName || Decorated.name || 'Component';

    var DragLayerContainer = /*#__PURE__*/function (_Component) {
      _inherits(DragLayerContainer, _Component);

      var _super = _createSuper(DragLayerContainer);

      function DragLayerContainer() {
        var _this;

        _classCallCheck(this, DragLayerContainer);

        _this = _super.apply(this, arguments);
        _this.isCurrentlyMounted = false;
        _this.ref = (0,react__WEBPACK_IMPORTED_MODULE_1__.createRef)();

        _this.handleChange = function () {
          if (!_this.isCurrentlyMounted) {
            return;
          }

          var nextState = _this.getCurrentState();

          if (!(0,_react_dnd_shallowequal__WEBPACK_IMPORTED_MODULE_5__/* .shallowEqual */ .b)(nextState, _this.state)) {
            _this.setState(nextState);
          }
        };

        return _this;
      }

      _createClass(DragLayerContainer, [{
        key: "getDecoratedComponentInstance",
        value: function getDecoratedComponentInstance() {
          (0,_react_dnd_invariant__WEBPACK_IMPORTED_MODULE_4__/* .invariant */ .V)(this.ref.current, 'In order to access an instance of the decorated component, it must either be a class component or use React.forwardRef()');
          return this.ref.current;
        }
      }, {
        key: "shouldComponentUpdate",
        value: function shouldComponentUpdate(nextProps, nextState) {
          return !arePropsEqual(nextProps, this.props) || !(0,_react_dnd_shallowequal__WEBPACK_IMPORTED_MODULE_5__/* .shallowEqual */ .b)(nextState, this.state);
        }
      }, {
        key: "componentDidMount",
        value: function componentDidMount() {
          this.isCurrentlyMounted = true;
          this.handleChange();
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          this.isCurrentlyMounted = false;

          if (this.unsubscribeFromOffsetChange) {
            this.unsubscribeFromOffsetChange();
            this.unsubscribeFromOffsetChange = undefined;
          }

          if (this.unsubscribeFromStateChange) {
            this.unsubscribeFromStateChange();
            this.unsubscribeFromStateChange = undefined;
          }
        }
      }, {
        key: "render",
        value: function render() {
          var _this2 = this;

          return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_core__WEBPACK_IMPORTED_MODULE_6__/* .DndContext */ .M.Consumer, {
            children: function children(_ref) {
              var dragDropManager = _ref.dragDropManager;

              if (dragDropManager === undefined) {
                return null;
              }

              _this2.receiveDragDropManager(dragDropManager); // Let componentDidMount fire to initialize the collected state


              if (!_this2.isCurrentlyMounted) {
                return null;
              }

              return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Decorated, Object.assign({}, _this2.props, _this2.state, {
                ref: (0,_utils__WEBPACK_IMPORTED_MODULE_3__/* .isRefable */ .Yy)(Decorated) ? _this2.ref : null
              }), void 0);
            }
          }, void 0);
        }
      }, {
        key: "receiveDragDropManager",
        value: function receiveDragDropManager(dragDropManager) {
          if (this.manager !== undefined) {
            return;
          }

          this.manager = dragDropManager;
          (0,_react_dnd_invariant__WEBPACK_IMPORTED_MODULE_4__/* .invariant */ .V)(_typeof(dragDropManager) === 'object', 'Could not find the drag and drop manager in the context of %s. ' + 'Make sure to render a DndProvider component in your top-level component. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/troubleshooting#could-not-find-the-drag-and-drop-manager-in-the-context', displayName, displayName);
          var monitor = this.manager.getMonitor();
          this.unsubscribeFromOffsetChange = monitor.subscribeToOffsetChange(this.handleChange);
          this.unsubscribeFromStateChange = monitor.subscribeToStateChange(this.handleChange);
        }
      }, {
        key: "getCurrentState",
        value: function getCurrentState() {
          if (!this.manager) {
            return {};
          }

          var monitor = this.manager.getMonitor();
          return collect(monitor, this.props);
        }
      }]);

      return DragLayerContainer;
    }(react__WEBPACK_IMPORTED_MODULE_1__.Component);

    DragLayerContainer.displayName = "DragLayer(".concat(displayName, ")");
    DragLayerContainer.DecoratedComponent = DecoratedComponent;
    return hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_2___default()(DragLayerContainer, DecoratedComponent);
  };
}

/***/ }),

/***/ 13952:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I: () => (/* binding */ DragSource)
/* harmony export */ });
if (175 == __webpack_require__.j) {
	/* harmony import */ var _react_dnd_invariant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(72954);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _internals__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(39756);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _internals__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(32465);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _internals__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(37704);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(79602);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _decorateHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(58270);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _createSourceFactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(39286);
}





/**
 * Decorates a component as a dragsource
 * @param type The dragsource type
 * @param spec The drag source specification
 * @param collect The props collector function
 * @param options DnD options
 */

function DragSource(type, spec, collect) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  (0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .checkDecoratorArguments */ .cl)('DragSource', 'type, spec, collect[, options]', type, spec, collect, options);
  var getType = type;

  if (typeof type !== 'function') {
    (0,_react_dnd_invariant__WEBPACK_IMPORTED_MODULE_1__/* .invariant */ .V)((0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .isValidType */ .NE)(type), 'Expected "type" provided as the first argument to DragSource to be ' + 'a string, or a function that returns a string given the current props. ' + 'Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', type);

    getType = function getType() {
      return type;
    };
  }

  (0,_react_dnd_invariant__WEBPACK_IMPORTED_MODULE_1__/* .invariant */ .V)((0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .isPlainObject */ .Qd)(spec), 'Expected "spec" provided as the second argument to DragSource to be ' + 'a plain object. Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', spec);
  var createSource = (0,_createSourceFactory__WEBPACK_IMPORTED_MODULE_2__/* .createSourceFactory */ .C)(spec);
  (0,_react_dnd_invariant__WEBPACK_IMPORTED_MODULE_1__/* .invariant */ .V)(typeof collect === 'function', 'Expected "collect" provided as the third argument to DragSource to be ' + 'a function that returns a plain object of props to inject. ' + 'Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', collect);
  (0,_react_dnd_invariant__WEBPACK_IMPORTED_MODULE_1__/* .invariant */ .V)((0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .isPlainObject */ .Qd)(options), 'Expected "options" provided as the fourth argument to DragSource to be ' + 'a plain object when specified. ' + 'Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', collect);
  return function decorateSource(DecoratedComponent) {
    return (0,_decorateHandler__WEBPACK_IMPORTED_MODULE_3__/* .decorateHandler */ .A)({
      containerDisplayName: 'DragSource',
      createHandler: createSource,
      registerHandler: _internals__WEBPACK_IMPORTED_MODULE_4__/* .registerSource */ .V,
      createConnector: function createConnector(backend) {
        return new _internals__WEBPACK_IMPORTED_MODULE_5__/* .SourceConnector */ .b(backend);
      },
      createMonitor: function createMonitor(manager) {
        return new _internals__WEBPACK_IMPORTED_MODULE_6__/* .DragSourceMonitorImpl */ .G(manager);
      },
      DecoratedComponent: DecoratedComponent,
      getType: getType,
      collect: collect,
      options: options
    });
  };
}

/***/ }),

/***/ 18099:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   T: () => (/* binding */ DropTarget)
/* harmony export */ });
if (175 == __webpack_require__.j) {
	/* harmony import */ var _react_dnd_invariant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(72954);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _internals__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(39756);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _internals__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(39801);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _internals__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(90341);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(79602);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _decorateHandler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(58270);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _createTargetFactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(31930);
}






/**
 * @param type The accepted target type
 * @param spec The DropTarget specification
 * @param collect The props collector function
 * @param options Options
 */

function DropTarget(type, spec, collect) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  (0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .checkDecoratorArguments */ .cl)('DropTarget', 'type, spec, collect[, options]', type, spec, collect, options);
  var getType = type;

  if (typeof type !== 'function') {
    (0,_react_dnd_invariant__WEBPACK_IMPORTED_MODULE_1__/* .invariant */ .V)((0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .isValidType */ .NE)(type, true), 'Expected "type" provided as the first argument to DropTarget to be ' + 'a string, an array of strings, or a function that returns either given ' + 'the current props. Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target', type);

    getType = function getType() {
      return type;
    };
  }

  (0,_react_dnd_invariant__WEBPACK_IMPORTED_MODULE_1__/* .invariant */ .V)((0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .isPlainObject */ .Qd)(spec), 'Expected "spec" provided as the second argument to DropTarget to be ' + 'a plain object. Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target', spec);
  var createTarget = (0,_createTargetFactory__WEBPACK_IMPORTED_MODULE_2__/* .createTargetFactory */ .i)(spec);
  (0,_react_dnd_invariant__WEBPACK_IMPORTED_MODULE_1__/* .invariant */ .V)(typeof collect === 'function', 'Expected "collect" provided as the third argument to DropTarget to be ' + 'a function that returns a plain object of props to inject. ' + 'Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target', collect);
  (0,_react_dnd_invariant__WEBPACK_IMPORTED_MODULE_1__/* .invariant */ .V)((0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .isPlainObject */ .Qd)(options), 'Expected "options" provided as the fourth argument to DropTarget to be ' + 'a plain object when specified. ' + 'Instead, received %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target', collect);
  return function decorateTarget(DecoratedComponent) {
    return (0,_decorateHandler__WEBPACK_IMPORTED_MODULE_3__/* .decorateHandler */ .A)({
      containerDisplayName: 'DropTarget',
      createHandler: createTarget,
      registerHandler: _internals__WEBPACK_IMPORTED_MODULE_4__/* .registerTarget */ .l,
      createMonitor: function createMonitor(manager) {
        return new _internals__WEBPACK_IMPORTED_MODULE_5__/* .DropTargetMonitorImpl */ .b(manager);
      },
      createConnector: function createConnector(backend) {
        return new _internals__WEBPACK_IMPORTED_MODULE_6__/* .TargetConnector */ .P(backend);
      },
      DecoratedComponent: DecoratedComponent,
      getType: getType,
      collect: collect,
      options: options
    });
  };
}

/***/ }),

/***/ 39286:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: () => (/* binding */ createSourceFactory)
/* harmony export */ });
if (175 == __webpack_require__.j) {
	/* harmony import */ var _react_dnd_invariant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(72954);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(79602);
}
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var ALLOWED_SPEC_METHODS = (/* runtime-dependent pure expression or super */ 175 == __webpack_require__.j ? (['canDrag', 'beginDrag', 'isDragging', 'endDrag']) : null);
var REQUIRED_SPEC_METHODS = (/* runtime-dependent pure expression or super */ 175 == __webpack_require__.j ? (['beginDrag']) : null);

var SourceImpl = /*#__PURE__*/(/* runtime-dependent pure expression or super */ 175 == __webpack_require__.j ? (function () {
  function SourceImpl(spec, monitor, ref) {
    var _this = this;

    _classCallCheck(this, SourceImpl);

    this.props = null;

    this.beginDrag = function () {
      if (!_this.props) {
        return;
      }

      var item = _this.spec.beginDrag(_this.props, _this.monitor, _this.ref.current);

      if (false) {}

      return item;
    };

    this.spec = spec;
    this.monitor = monitor;
    this.ref = ref;
  }

  _createClass(SourceImpl, [{
    key: "receiveProps",
    value: function receiveProps(props) {
      this.props = props;
    }
  }, {
    key: "canDrag",
    value: function canDrag() {
      if (!this.props) {
        return false;
      }

      if (!this.spec.canDrag) {
        return true;
      }

      return this.spec.canDrag(this.props, this.monitor);
    }
  }, {
    key: "isDragging",
    value: function isDragging(globalMonitor, sourceId) {
      if (!this.props) {
        return false;
      }

      if (!this.spec.isDragging) {
        return sourceId === globalMonitor.getSourceId();
      }

      return this.spec.isDragging(this.props, this.monitor);
    }
  }, {
    key: "endDrag",
    value: function endDrag() {
      if (!this.props) {
        return;
      }

      if (!this.spec.endDrag) {
        return;
      }

      this.spec.endDrag(this.props, this.monitor, (0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .getDecoratedComponent */ .PQ)(this.ref));
    }
  }]);

  return SourceImpl;
}()) : null);

function createSourceFactory(spec) {
  Object.keys(spec).forEach(function (key) {
    (0,_react_dnd_invariant__WEBPACK_IMPORTED_MODULE_1__/* .invariant */ .V)(ALLOWED_SPEC_METHODS.indexOf(key) > -1, 'Expected the drag source specification to only have ' + 'some of the following keys: %s. ' + 'Instead received a specification with an unexpected "%s" key. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', ALLOWED_SPEC_METHODS.join(', '), key);
    (0,_react_dnd_invariant__WEBPACK_IMPORTED_MODULE_1__/* .invariant */ .V)(typeof spec[key] === 'function', 'Expected %s in the drag source specification to be a function. ' + 'Instead received a specification with %s: %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', key, key, spec[key]);
  });
  REQUIRED_SPEC_METHODS.forEach(function (key) {
    (0,_react_dnd_invariant__WEBPACK_IMPORTED_MODULE_1__/* .invariant */ .V)(typeof spec[key] === 'function', 'Expected %s in the drag source specification to be a function. ' + 'Instead received a specification with %s: %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source', key, key, spec[key]);
  });
  return function createSource(monitor, ref) {
    return new SourceImpl(spec, monitor, ref);
  };
}

/***/ }),

/***/ 31930:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   i: () => (/* binding */ createTargetFactory)
/* harmony export */ });
if (175 == __webpack_require__.j) {
	/* harmony import */ var _react_dnd_invariant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(72954);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(79602);
}
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var ALLOWED_SPEC_METHODS = (/* runtime-dependent pure expression or super */ 175 == __webpack_require__.j ? (['canDrop', 'hover', 'drop']) : null);

var TargetImpl = /*#__PURE__*/(/* runtime-dependent pure expression or super */ 175 == __webpack_require__.j ? (function () {
  function TargetImpl(spec, monitor, ref) {
    _classCallCheck(this, TargetImpl);

    this.props = null;
    this.spec = spec;
    this.monitor = monitor;
    this.ref = ref;
  }

  _createClass(TargetImpl, [{
    key: "receiveProps",
    value: function receiveProps(props) {
      this.props = props;
    }
  }, {
    key: "receiveMonitor",
    value: function receiveMonitor(monitor) {
      this.monitor = monitor;
    }
  }, {
    key: "canDrop",
    value: function canDrop() {
      if (!this.spec.canDrop) {
        return true;
      }

      return this.spec.canDrop(this.props, this.monitor);
    }
  }, {
    key: "hover",
    value: function hover() {
      if (!this.spec.hover || !this.props) {
        return;
      }

      this.spec.hover(this.props, this.monitor, (0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .getDecoratedComponent */ .PQ)(this.ref));
    }
  }, {
    key: "drop",
    value: function drop() {
      if (!this.spec.drop) {
        return undefined;
      }

      var dropResult = this.spec.drop(this.props, this.monitor, this.ref.current);

      if (false) {}

      return dropResult;
    }
  }]);

  return TargetImpl;
}()) : null);

function createTargetFactory(spec) {
  Object.keys(spec).forEach(function (key) {
    (0,_react_dnd_invariant__WEBPACK_IMPORTED_MODULE_1__/* .invariant */ .V)(ALLOWED_SPEC_METHODS.indexOf(key) > -1, 'Expected the drop target specification to only have ' + 'some of the following keys: %s. ' + 'Instead received a specification with an unexpected "%s" key. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target', ALLOWED_SPEC_METHODS.join(', '), key);
    (0,_react_dnd_invariant__WEBPACK_IMPORTED_MODULE_1__/* .invariant */ .V)(typeof spec[key] === 'function', 'Expected %s in the drop target specification to be a function. ' + 'Instead received a specification with %s: %s. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target', key, key, spec[key]);
  });
  return function createTarget(monitor, ref) {
    return new TargetImpl(spec, monitor, ref);
  };
}

/***/ }),

/***/ 58270:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ decorateHandler)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(74848);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(96540);
if (175 == __webpack_require__.j) {
	/* harmony import */ var _react_dnd_shallowequal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(49194);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _react_dnd_invariant__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(72954);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(30653);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _disposables__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(45596);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(79602);
}
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4146);
/* harmony import */ var hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_2__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }










function decorateHandler(_ref) {
  var DecoratedComponent = _ref.DecoratedComponent,
      createHandler = _ref.createHandler,
      createMonitor = _ref.createMonitor,
      createConnector = _ref.createConnector,
      registerHandler = _ref.registerHandler,
      containerDisplayName = _ref.containerDisplayName,
      getType = _ref.getType,
      collect = _ref.collect,
      options = _ref.options;
  var _options$arePropsEqua = options.arePropsEqual,
      arePropsEqual = _options$arePropsEqua === void 0 ? _react_dnd_shallowequal__WEBPACK_IMPORTED_MODULE_3__/* .shallowEqual */ .b : _options$arePropsEqua;
  var Decorated = DecoratedComponent;
  var displayName = DecoratedComponent.displayName || DecoratedComponent.name || 'Component';

  var DragDropContainer = /*#__PURE__*/function (_Component) {
    _inherits(DragDropContainer, _Component);

    var _super = _createSuper(DragDropContainer);

    function DragDropContainer(props) {
      var _this;

      _classCallCheck(this, DragDropContainer);

      _this = _super.call(this, props);
      _this.decoratedRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.createRef)();

      _this.handleChange = function () {
        var nextState = _this.getCurrentState();

        if (!(0,_react_dnd_shallowequal__WEBPACK_IMPORTED_MODULE_3__/* .shallowEqual */ .b)(nextState, _this.state)) {
          _this.setState(nextState);
        }
      };

      _this.disposable = new _disposables__WEBPACK_IMPORTED_MODULE_4__/* .SerialDisposable */ .DS();

      _this.receiveProps(props);

      _this.dispose();

      return _this;
    }

    _createClass(DragDropContainer, [{
      key: "getHandlerId",
      value: function getHandlerId() {
        return this.handlerId;
      }
    }, {
      key: "getDecoratedComponentInstance",
      value: function getDecoratedComponentInstance() {
        (0,_react_dnd_invariant__WEBPACK_IMPORTED_MODULE_5__/* .invariant */ .V)(this.decoratedRef.current, 'In order to access an instance of the decorated component, it must either be a class component or use React.forwardRef()');
        return this.decoratedRef.current;
      }
    }, {
      key: "shouldComponentUpdate",
      value: function shouldComponentUpdate(nextProps, nextState) {
        return !arePropsEqual(nextProps, this.props) || !(0,_react_dnd_shallowequal__WEBPACK_IMPORTED_MODULE_3__/* .shallowEqual */ .b)(nextState, this.state);
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        this.disposable = new _disposables__WEBPACK_IMPORTED_MODULE_4__/* .SerialDisposable */ .DS();
        this.currentType = undefined;
        this.receiveProps(this.props);
        this.handleChange();
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        if (!arePropsEqual(this.props, prevProps)) {
          this.receiveProps(this.props);
          this.handleChange();
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        this.dispose();
      }
    }, {
      key: "receiveProps",
      value: function receiveProps(props) {
        if (!this.handler) {
          return;
        }

        this.handler.receiveProps(props);
        this.receiveType(getType(props));
      }
    }, {
      key: "receiveType",
      value: function receiveType(type) {
        if (!this.handlerMonitor || !this.manager || !this.handlerConnector) {
          return;
        }

        if (type === this.currentType) {
          return;
        }

        this.currentType = type;

        var _registerHandler = registerHandler(type, this.handler, this.manager),
            _registerHandler2 = _slicedToArray(_registerHandler, 2),
            handlerId = _registerHandler2[0],
            unregister = _registerHandler2[1];

        this.handlerId = handlerId;
        this.handlerMonitor.receiveHandlerId(handlerId);
        this.handlerConnector.receiveHandlerId(handlerId);
        var globalMonitor = this.manager.getMonitor();
        var unsubscribe = globalMonitor.subscribeToStateChange(this.handleChange, {
          handlerIds: [handlerId]
        });
        this.disposable.setDisposable(new _disposables__WEBPACK_IMPORTED_MODULE_4__/* .CompositeDisposable */ .ke(new _disposables__WEBPACK_IMPORTED_MODULE_4__/* .Disposable */ .jG(unsubscribe), new _disposables__WEBPACK_IMPORTED_MODULE_4__/* .Disposable */ .jG(unregister)));
      }
    }, {
      key: "dispose",
      value: function dispose() {
        this.disposable.dispose();

        if (this.handlerConnector) {
          this.handlerConnector.receiveHandlerId(null);
        }
      }
    }, {
      key: "getCurrentState",
      value: function getCurrentState() {
        if (!this.handlerConnector) {
          return {};
        }

        var nextState = collect(this.handlerConnector.hooks, this.handlerMonitor, this.props);

        if (false) {}

        return nextState;
      }
    }, {
      key: "render",
      value: function render() {
        var _this2 = this;

        return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_core__WEBPACK_IMPORTED_MODULE_6__/* .DndContext */ .M.Consumer, {
          children: function children(_ref2) {
            var dragDropManager = _ref2.dragDropManager;

            _this2.receiveDragDropManager(dragDropManager);

            if (typeof requestAnimationFrame !== 'undefined') {
              requestAnimationFrame(function () {
                var _this2$handlerConnect;

                return (_this2$handlerConnect = _this2.handlerConnector) === null || _this2$handlerConnect === void 0 ? void 0 : _this2$handlerConnect.reconnect();
              });
            }

            return (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Decorated, Object.assign({}, _this2.props, _this2.getCurrentState(), {
              // NOTE: if Decorated is a Function Component, decoratedRef will not be populated unless it's a refforwarding component.
              ref: (0,_utils__WEBPACK_IMPORTED_MODULE_7__/* .isRefable */ .Yy)(Decorated) ? _this2.decoratedRef : null
            }), void 0);
          }
        }, void 0);
      }
    }, {
      key: "receiveDragDropManager",
      value: function receiveDragDropManager(dragDropManager) {
        if (this.manager !== undefined) {
          return;
        }

        (0,_react_dnd_invariant__WEBPACK_IMPORTED_MODULE_5__/* .invariant */ .V)(dragDropManager !== undefined, 'Could not find the drag and drop manager in the context of %s. ' + 'Make sure to render a DndProvider component in your top-level component. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/troubleshooting#could-not-find-the-drag-and-drop-manager-in-the-context', displayName, displayName);

        if (dragDropManager === undefined) {
          return;
        }

        this.manager = dragDropManager;
        this.handlerMonitor = createMonitor(dragDropManager);
        this.handlerConnector = createConnector(dragDropManager.getBackend());
        this.handler = createHandler(this.handlerMonitor, this.decoratedRef);
      }
    }]);

    return DragDropContainer;
  }(react__WEBPACK_IMPORTED_MODULE_1__.Component);

  DragDropContainer.DecoratedComponent = DecoratedComponent;
  DragDropContainer.displayName = "".concat(containerDisplayName, "(").concat(displayName, ")");
  return hoist_non_react_statics__WEBPACK_IMPORTED_MODULE_2___default()(DragDropContainer, DecoratedComponent);
}

/***/ }),

/***/ 45596:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DS: () => (/* binding */ SerialDisposable),
/* harmony export */   jG: () => (/* binding */ Disposable),
/* harmony export */   ke: () => (/* binding */ CompositeDisposable)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(79602);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


/**
 * Provides a set of static methods for creating Disposables.
 * @param {Function} action Action to run during the first call to dispose.
 * The action is guaranteed to be run at most once.
 */

var Disposable = /*#__PURE__*/function () {
  function Disposable(action) {
    _classCallCheck(this, Disposable);

    this.isDisposed = false;
    this.action = (0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .isFunction */ .Tn)(action) ? action : _utils__WEBPACK_IMPORTED_MODULE_0__/* .noop */ .lQ;
  }
  /**
   * Validates whether the given object is a disposable
   * @param {Object} Object to test whether it has a dispose method
   * @returns {Boolean} true if a disposable object, else false.
   */


  _createClass(Disposable, [{
    key: "dispose",
    value:
    /** Performs the task of cleaning up resources. */
    function dispose() {
      if (!this.isDisposed) {
        this.action();
        this.isDisposed = true;
      }
    }
  }], [{
    key: "isDisposable",
    value: function isDisposable(d) {
      return Boolean(d && (0,_utils__WEBPACK_IMPORTED_MODULE_0__/* .isFunction */ .Tn)(d.dispose));
    }
  }, {
    key: "_fixup",
    value: function _fixup(result) {
      return Disposable.isDisposable(result) ? result : Disposable.empty;
    }
    /**
     * Creates a disposable object that invokes the specified action when disposed.
     * @param {Function} dispose Action to run during the first call to dispose.
     * The action is guaranteed to be run at most once.
     * @return {Disposable} The disposable object that runs the given action upon disposal.
     */

  }, {
    key: "create",
    value: function create(action) {
      return new Disposable(action);
    }
  }]);

  return Disposable;
}();
/**
 * Gets the disposable that does nothing when disposed.
 */

Disposable.empty = {
  dispose: _utils__WEBPACK_IMPORTED_MODULE_0__/* .noop */ .lQ
};
/**
 * Represents a group of disposable resources that are disposed together.
 * @constructor
 */

var CompositeDisposable = /*#__PURE__*/(/* runtime-dependent pure expression or super */ 175 == __webpack_require__.j ? (function () {
  function CompositeDisposable() {
    _classCallCheck(this, CompositeDisposable);

    this.isDisposed = false;

    for (var _len = arguments.length, disposables = new Array(_len), _key = 0; _key < _len; _key++) {
      disposables[_key] = arguments[_key];
    }

    this.disposables = disposables;
  }
  /**
   * Adds a disposable to the CompositeDisposable or disposes the disposable if the CompositeDisposable is disposed.
   * @param {Any} item Disposable to add.
   */


  _createClass(CompositeDisposable, [{
    key: "add",
    value: function add(item) {
      if (this.isDisposed) {
        item.dispose();
      } else {
        this.disposables.push(item);
      }
    }
    /**
     * Removes and disposes the first occurrence of a disposable from the CompositeDisposable.
     * @param {Any} item Disposable to remove.
     * @returns {Boolean} true if found; false otherwise.
     */

  }, {
    key: "remove",
    value: function remove(item) {
      var shouldDispose = false;

      if (!this.isDisposed) {
        var idx = this.disposables.indexOf(item);

        if (idx !== -1) {
          shouldDispose = true;
          this.disposables.splice(idx, 1);
          item.dispose();
        }
      }

      return shouldDispose;
    }
    /**
     *  Disposes all disposables in the group and removes them from the group but
     *  does not dispose the CompositeDisposable.
     */

  }, {
    key: "clear",
    value: function clear() {
      if (!this.isDisposed) {
        var len = this.disposables.length;
        var currentDisposables = new Array(len);

        for (var i = 0; i < len; i++) {
          currentDisposables[i] = this.disposables[i];
        }

        this.disposables = [];

        for (var _i = 0; _i < len; _i++) {
          currentDisposables[_i].dispose();
        }
      }
    }
    /**
     *  Disposes all disposables in the group and removes them from the group.
     */

  }, {
    key: "dispose",
    value: function dispose() {
      if (!this.isDisposed) {
        this.isDisposed = true;
        var len = this.disposables.length;
        var currentDisposables = new Array(len);

        for (var i = 0; i < len; i++) {
          currentDisposables[i] = this.disposables[i];
        }

        this.disposables = [];

        for (var _i2 = 0; _i2 < len; _i2++) {
          currentDisposables[_i2].dispose();
        }
      }
    }
  }]);

  return CompositeDisposable;
}()) : null);
/**
 * Represents a disposable resource whose underlying disposable resource can
 * be replaced by another disposable resource, causing automatic disposal of
 * the previous underlying disposable resource.
 */

var SerialDisposable = /*#__PURE__*/(/* runtime-dependent pure expression or super */ 175 == __webpack_require__.j ? (function () {
  function SerialDisposable() {
    _classCallCheck(this, SerialDisposable);

    this.isDisposed = false;
  }
  /**
   * Gets the underlying disposable.
   * @returns {Any} the underlying disposable.
   */


  _createClass(SerialDisposable, [{
    key: "getDisposable",
    value: function getDisposable() {
      return this.current;
    }
  }, {
    key: "setDisposable",
    value: function setDisposable(value) {
      var shouldDispose = this.isDisposed;

      if (!shouldDispose) {
        var old = this.current;
        this.current = value;

        if (old) {
          old.dispose();
        }
      }

      if (shouldDispose && value) {
        value.dispose();
      }
    }
    /** Performs the task of cleaning up resources. */

  }, {
    key: "dispose",
    value: function dispose() {
      if (!this.isDisposed) {
        this.isDisposed = true;
        var old = this.current;
        this.current = undefined;

        if (old) {
          old.dispose();
        }
      }
    }
  }]);

  return SerialDisposable;
}()) : null);

/***/ }),

/***/ 54279:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I4: () => (/* reexport safe */ _DragSource__WEBPACK_IMPORTED_MODULE_0__.I),
/* harmony export */   Mf: () => (/* reexport safe */ _DragLayer__WEBPACK_IMPORTED_MODULE_2__.M),
/* harmony export */   Tl: () => (/* reexport safe */ _DropTarget__WEBPACK_IMPORTED_MODULE_1__.T)
/* harmony export */ });
if (175 == __webpack_require__.j) {
	/* harmony import */ var _DragSource__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13952);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _DropTarget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18099);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _DragLayer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(53936);
}





/***/ }),

/***/ 79602:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NE: () => (/* binding */ isValidType),
/* harmony export */   PQ: () => (/* binding */ getDecoratedComponent),
/* harmony export */   Qd: () => (/* binding */ isPlainObject),
/* harmony export */   Tn: () => (/* binding */ isFunction),
/* harmony export */   Yy: () => (/* binding */ isRefable),
/* harmony export */   cl: () => (/* binding */ checkDecoratorArguments),
/* harmony export */   lQ: () => (/* binding */ noop)
/* harmony export */ });
/* unused harmony exports isClassComponent, isRefForwardingComponent */
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function getDecoratedComponent(instanceRef) {
  var currentRef = instanceRef.current;

  if (currentRef == null) {
    return null;
  } else if (currentRef.decoratedRef) {
    // go through the private field in decorateHandler to avoid the invariant hit
    return currentRef.decoratedRef.current;
  } else {
    return currentRef;
  }
}
function isClassComponent(Component) {
  return Component && Component.prototype && typeof Component.prototype.render === 'function';
}
function isRefForwardingComponent(C) {
  var _item$$$typeof;

  var item = C;
  return (item === null || item === void 0 ? void 0 : (_item$$$typeof = item.$$typeof) === null || _item$$$typeof === void 0 ? void 0 : _item$$$typeof.toString()) === 'Symbol(react.forward_ref)';
}
function isRefable(C) {
  return isClassComponent(C) || isRefForwardingComponent(C);
}
function checkDecoratorArguments(functionName, signature) {
  if (false) { var arg, i; }
}
function isFunction(input) {
  return typeof input === 'function';
}
function noop() {// noop
}

function isObjectLike(input) {
  return _typeof(input) === 'object' && input !== null;
}

function isPlainObject(input) {
  if (!isObjectLike(input)) {
    return false;
  }

  if (Object.getPrototypeOf(input) === null) {
    return true;
  }

  var proto = input;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(input) === proto;
}
function isValidType(type, allowArray) {
  return typeof type === 'string' || _typeof(type) === 'symbol' || !!allowArray && Array.isArray(type) && type.every(function (t) {
    return isValidType(t, false);
  });
}

/***/ }),

/***/ 4899:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Hd: () => (/* reexport safe */ _useDrop__WEBPACK_IMPORTED_MODULE_1__.H),
/* harmony export */   V7: () => (/* reexport safe */ _useDragLayer__WEBPACK_IMPORTED_MODULE_2__.V),
/* harmony export */   i3: () => (/* reexport safe */ _useDrag__WEBPACK_IMPORTED_MODULE_0__.i),
/* harmony export */   uF: () => (/* reexport safe */ _useDragDropManager__WEBPACK_IMPORTED_MODULE_3__.u)
/* harmony export */ });
if (175 == __webpack_require__.j) {
	/* harmony import */ var _useDrag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(54209);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _useDrop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9982);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _useDragLayer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(33085);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _useDragDropManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(43716);
}






/***/ }),

/***/ 33523:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   j: () => (/* binding */ useCollectedProps)
/* harmony export */ });
if (175 == __webpack_require__.j) {
	/* harmony import */ var _useMonitorOutput__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(59881);
}

function useCollectedProps(collector, monitor, connector) {
  return (0,_useMonitorOutput__WEBPACK_IMPORTED_MODULE_0__/* .useMonitorOutput */ .F)(monitor, collector || function () {
    return {};
  }, function () {
    return connector.reconnect();
  });
}

/***/ }),

/***/ 39937:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F: () => (/* binding */ useCollector)
/* harmony export */ });
/* harmony import */ var fast_deep_equal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(32017);
/* harmony import */ var fast_deep_equal__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fast_deep_equal__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(96540);
if (175 == __webpack_require__.j) {
	/* harmony import */ var _useIsomorphicLayoutEffect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(48030);
}
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




/**
 *
 * @param monitor The monitor to collect state from
 * @param collect The collecting function
 * @param onUpdate A method to invoke when updates occur
 */

function useCollector(monitor, collect, onUpdate) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(function () {
    return collect(monitor);
  }),
      _useState2 = _slicedToArray(_useState, 2),
      collected = _useState2[0],
      setCollected = _useState2[1];

  var updateCollected = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(function () {
    var nextValue = collect(monitor); // This needs to be a deep-equality check because some monitor-collected values
    // include XYCoord objects that may be equivalent, but do not have instance equality.

    if (!fast_deep_equal__WEBPACK_IMPORTED_MODULE_0___default()(collected, nextValue)) {
      setCollected(nextValue);

      if (onUpdate) {
        onUpdate();
      }
    }
  }, [collected, monitor, onUpdate]); // update the collected properties after react renders.
  // Note that the "Dustbin Stress Test" fails if this is not
  // done when the component updates

  (0,_useIsomorphicLayoutEffect__WEBPACK_IMPORTED_MODULE_2__/* .useIsomorphicLayoutEffect */ .E)(updateCollected);
  return [collected, updateCollected];
}

/***/ }),

/***/ 43716:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   u: () => (/* binding */ useDragDropManager)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(96540);
if (175 == __webpack_require__.j) {
	/* harmony import */ var _react_dnd_invariant__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(72954);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(30653);
}



/**
 * A hook to retrieve the DragDropManager from Context
 */

function useDragDropManager() {
  var _useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_core__WEBPACK_IMPORTED_MODULE_1__/* .DndContext */ .M),
      dragDropManager = _useContext.dragDropManager;

  (0,_react_dnd_invariant__WEBPACK_IMPORTED_MODULE_2__/* .invariant */ .V)(dragDropManager != null, 'Expected drag drop context');
  return dragDropManager;
}

/***/ }),

/***/ 33085:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V: () => (/* binding */ useDragLayer)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(96540);
if (175 == __webpack_require__.j) {
	/* harmony import */ var _useDragDropManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(43716);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _useCollector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(39937);
}
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




/**
 * useDragLayer Hook
 * @param collector The property collector
 */

function useDragLayer(collect) {
  var dragDropManager = (0,_useDragDropManager__WEBPACK_IMPORTED_MODULE_1__/* .useDragDropManager */ .u)();
  var monitor = dragDropManager.getMonitor();

  var _useCollector = (0,_useCollector__WEBPACK_IMPORTED_MODULE_2__/* .useCollector */ .F)(monitor, collect),
      _useCollector2 = _slicedToArray(_useCollector, 2),
      collected = _useCollector2[0],
      updateCollected = _useCollector2[1];

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    return monitor.subscribeToOffsetChange(updateCollected);
  });
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    return monitor.subscribeToStateChange(updateCollected);
  });
  return collected;
}

/***/ }),

/***/ 68968:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   c: () => (/* binding */ DragSourceImpl)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DragSourceImpl = /*#__PURE__*/(/* runtime-dependent pure expression or super */ 175 == __webpack_require__.j ? (function () {
  function DragSourceImpl(spec, monitor, connector) {
    _classCallCheck(this, DragSourceImpl);

    this.spec = spec;
    this.monitor = monitor;
    this.connector = connector;
  }

  _createClass(DragSourceImpl, [{
    key: "beginDrag",
    value: function beginDrag() {
      var _result;

      var spec = this.spec;
      var monitor = this.monitor;
      var result = null;

      if (_typeof(spec.item) === 'object') {
        result = spec.item;
      } else if (typeof spec.item === 'function') {
        result = spec.item(monitor);
      } else {
        result = {};
      }

      return (_result = result) !== null && _result !== void 0 ? _result : null;
    }
  }, {
    key: "canDrag",
    value: function canDrag() {
      var spec = this.spec;
      var monitor = this.monitor;

      if (typeof spec.canDrag === 'boolean') {
        return spec.canDrag;
      } else if (typeof spec.canDrag === 'function') {
        return spec.canDrag(monitor);
      } else {
        return true;
      }
    }
  }, {
    key: "isDragging",
    value: function isDragging(globalMonitor, target) {
      var spec = this.spec;
      var monitor = this.monitor;
      var isDragging = spec.isDragging;
      return isDragging ? isDragging(monitor) : target === globalMonitor.getSourceId();
    }
  }, {
    key: "endDrag",
    value: function endDrag() {
      var spec = this.spec;
      var monitor = this.monitor;
      var connector = this.connector;
      var end = spec.end;

      if (end) {
        end(monitor.getItem(), monitor);
      }

      connector.reconnect();
    }
  }]);

  return DragSourceImpl;
}()) : null);

/***/ }),

/***/ 33197:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _: () => (/* binding */ useConnectDragPreview),
/* harmony export */   f: () => (/* binding */ useConnectDragSource)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(96540);

function useConnectDragSource(connector) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return connector.hooks.dragSource();
  }, [connector]);
}
function useConnectDragPreview(connector) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return connector.hooks.dragPreview();
  }, [connector]);
}

/***/ }),

/***/ 54209:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   i: () => (/* reexport safe */ _useDrag__WEBPACK_IMPORTED_MODULE_0__.i)
/* harmony export */ });
if (175 == __webpack_require__.j) {
	/* harmony import */ var _useDrag__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(43216);
}


/***/ }),

/***/ 43216:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   i: () => (/* binding */ useDrag)
/* harmony export */ });
if (175 == __webpack_require__.j) {
	/* harmony import */ var _useRegisteredDragSource__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(32221);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _useOptionalFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95532);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _useDragSourceMonitor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(90631);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _useDragSourceConnector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(51322);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _useCollectedProps__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(33523);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _connectors__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(33197);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _react_dnd_invariant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(72954);
}







/**
 * useDragSource hook
 * @param sourceSpec The drag source specification (object or function, function preferred)
 * @param deps The memoization deps array to use when evaluating spec changes
 */

function useDrag(specArg, deps) {
  var spec = (0,_useOptionalFactory__WEBPACK_IMPORTED_MODULE_0__/* .useOptionalFactory */ .I)(specArg, deps);
  (0,_react_dnd_invariant__WEBPACK_IMPORTED_MODULE_1__/* .invariant */ .V)(!spec.begin, "useDrag::spec.begin was deprecated in v14. Replace spec.begin() with spec.item(). (see more here - https://react-dnd.github.io/react-dnd/docs/api/use-drag)");
  var monitor = (0,_useDragSourceMonitor__WEBPACK_IMPORTED_MODULE_2__/* .useDragSourceMonitor */ .P)();
  var connector = (0,_useDragSourceConnector__WEBPACK_IMPORTED_MODULE_3__/* .useDragSourceConnector */ .e)(spec.options, spec.previewOptions);
  (0,_useRegisteredDragSource__WEBPACK_IMPORTED_MODULE_4__/* .useRegisteredDragSource */ .t)(spec, monitor, connector);
  return [(0,_useCollectedProps__WEBPACK_IMPORTED_MODULE_5__/* .useCollectedProps */ .j)(spec.collect, monitor, connector), (0,_connectors__WEBPACK_IMPORTED_MODULE_6__/* .useConnectDragSource */ .f)(connector), (0,_connectors__WEBPACK_IMPORTED_MODULE_6__/* .useConnectDragPreview */ ._)(connector)];
}

/***/ }),

/***/ 5057:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B: () => (/* binding */ useDragSource)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(96540);
if (175 == __webpack_require__.j) {
	/* harmony import */ var _DragSourceImpl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(68968);
}


function useDragSource(spec, monitor, connector) {
  var handler = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return new _DragSourceImpl__WEBPACK_IMPORTED_MODULE_1__/* .DragSourceImpl */ .c(spec, monitor, connector);
  }, [monitor, connector]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    handler.spec = spec;
  }, [spec]);
  return handler;
}

/***/ }),

/***/ 51322:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   e: () => (/* binding */ useDragSourceConnector)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(96540);
if (175 == __webpack_require__.j) {
	/* harmony import */ var _internals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(32465);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _useDragDropManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(43716);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _useIsomorphicLayoutEffect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(48030);
}




function useDragSourceConnector(dragSourceOptions, dragPreviewOptions) {
  var manager = (0,_useDragDropManager__WEBPACK_IMPORTED_MODULE_1__/* .useDragDropManager */ .u)();
  var connector = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return new _internals__WEBPACK_IMPORTED_MODULE_2__/* .SourceConnector */ .b(manager.getBackend());
  }, [manager]);
  (0,_useIsomorphicLayoutEffect__WEBPACK_IMPORTED_MODULE_3__/* .useIsomorphicLayoutEffect */ .E)(function () {
    connector.dragSourceOptions = dragSourceOptions || null;
    connector.reconnect();
  }, [connector, dragSourceOptions]);
  (0,_useIsomorphicLayoutEffect__WEBPACK_IMPORTED_MODULE_3__/* .useIsomorphicLayoutEffect */ .E)(function () {
    connector.dragPreviewOptions = dragPreviewOptions || null;
    connector.reconnect();
  }, [connector, dragPreviewOptions]);
  return connector;
}

/***/ }),

/***/ 90631:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ useDragSourceMonitor)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(96540);
if (175 == __webpack_require__.j) {
	/* harmony import */ var _internals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(37704);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _useDragDropManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(43716);
}



function useDragSourceMonitor() {
  var manager = (0,_useDragDropManager__WEBPACK_IMPORTED_MODULE_1__/* .useDragDropManager */ .u)();
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return new _internals__WEBPACK_IMPORTED_MODULE_2__/* .DragSourceMonitorImpl */ .G(manager);
  }, [manager]);
}

/***/ }),

/***/ 84840:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   g: () => (/* binding */ useDragType)
/* harmony export */ });
if (175 == __webpack_require__.j) {
	/* harmony import */ var _react_dnd_invariant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(72954);
}
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(96540);


function useDragType(spec) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    var result = spec.type;
    (0,_react_dnd_invariant__WEBPACK_IMPORTED_MODULE_1__/* .invariant */ .V)(result != null, 'spec.type must be defined');
    return result;
  }, [spec]);
}

/***/ }),

/***/ 32221:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   t: () => (/* binding */ useRegisteredDragSource)
/* harmony export */ });
if (175 == __webpack_require__.j) {
	/* harmony import */ var _internals__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(39756);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _useIsomorphicLayoutEffect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(48030);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _useDragSource__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5057);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _useDragDropManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(43716);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _useDragType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(84840);
}
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






function useRegisteredDragSource(spec, monitor, connector) {
  var manager = (0,_useDragDropManager__WEBPACK_IMPORTED_MODULE_0__/* .useDragDropManager */ .u)();
  var handler = (0,_useDragSource__WEBPACK_IMPORTED_MODULE_1__/* .useDragSource */ .B)(spec, monitor, connector);
  var itemType = (0,_useDragType__WEBPACK_IMPORTED_MODULE_2__/* .useDragType */ .g)(spec);
  (0,_useIsomorphicLayoutEffect__WEBPACK_IMPORTED_MODULE_3__/* .useIsomorphicLayoutEffect */ .E)(function registerDragSource() {
    if (itemType != null) {
      var _registerSource = (0,_internals__WEBPACK_IMPORTED_MODULE_4__/* .registerSource */ .V)(itemType, handler, manager),
          _registerSource2 = _slicedToArray(_registerSource, 2),
          handlerId = _registerSource2[0],
          unregister = _registerSource2[1];

      monitor.receiveHandlerId(handlerId);
      connector.receiveHandlerId(handlerId);
      return unregister;
    }
  }, [manager, monitor, connector, handler, itemType]);
}

/***/ }),

/***/ 69866:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   r: () => (/* binding */ DropTargetImpl)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DropTargetImpl = /*#__PURE__*/(/* runtime-dependent pure expression or super */ 175 == __webpack_require__.j ? (function () {
  function DropTargetImpl(spec, monitor) {
    _classCallCheck(this, DropTargetImpl);

    this.spec = spec;
    this.monitor = monitor;
  }

  _createClass(DropTargetImpl, [{
    key: "canDrop",
    value: function canDrop() {
      var spec = this.spec;
      var monitor = this.monitor;
      return spec.canDrop ? spec.canDrop(monitor.getItem(), monitor) : true;
    }
  }, {
    key: "hover",
    value: function hover() {
      var spec = this.spec;
      var monitor = this.monitor;

      if (spec.hover) {
        spec.hover(monitor.getItem(), monitor);
      }
    }
  }, {
    key: "drop",
    value: function drop() {
      var spec = this.spec;
      var monitor = this.monitor;

      if (spec.drop) {
        return spec.drop(monitor.getItem(), monitor);
      }
    }
  }]);

  return DropTargetImpl;
}()) : null);

/***/ }),

/***/ 32400:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   u: () => (/* binding */ useConnectDropTarget)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(96540);

function useConnectDropTarget(connector) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return connector.hooks.dropTarget();
  }, [connector]);
}

/***/ }),

/***/ 9982:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   H: () => (/* reexport safe */ _useDrop__WEBPACK_IMPORTED_MODULE_0__.H)
/* harmony export */ });
if (175 == __webpack_require__.j) {
	/* harmony import */ var _useDrop__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(31344);
}


/***/ }),

/***/ 32785:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   e: () => (/* binding */ useAccept)
/* harmony export */ });
if (175 == __webpack_require__.j) {
	/* harmony import */ var _react_dnd_invariant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(72954);
}
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(96540);


/**
 * Internal utility hook to get an array-version of spec.accept.
 * The main utility here is that we aren't creating a new array on every render if a non-array spec.accept is passed in.
 * @param spec
 */

function useAccept(spec) {
  var accept = spec.accept;
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    (0,_react_dnd_invariant__WEBPACK_IMPORTED_MODULE_1__/* .invariant */ .V)(spec.accept != null, 'accept must be defined');
    return Array.isArray(accept) ? accept : [accept];
  }, [accept]);
}

/***/ }),

/***/ 31344:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   H: () => (/* binding */ useDrop)
/* harmony export */ });
if (175 == __webpack_require__.j) {
	/* harmony import */ var _useRegisteredDropTarget__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(43521);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _useOptionalFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(95532);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _useDropTargetMonitor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(75999);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _useDropTargetConnector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5282);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _useCollectedProps__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(33523);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _connectors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(32400);
}






/**
 * useDropTarget Hook
 * @param spec The drop target specification (object or function, function preferred)
 * @param deps The memoization deps array to use when evaluating spec changes
 */

function useDrop(specArg, deps) {
  var spec = (0,_useOptionalFactory__WEBPACK_IMPORTED_MODULE_0__/* .useOptionalFactory */ .I)(specArg, deps);
  var monitor = (0,_useDropTargetMonitor__WEBPACK_IMPORTED_MODULE_1__/* .useDropTargetMonitor */ .y)();
  var connector = (0,_useDropTargetConnector__WEBPACK_IMPORTED_MODULE_2__/* .useDropTargetConnector */ .D)(spec.options);
  (0,_useRegisteredDropTarget__WEBPACK_IMPORTED_MODULE_3__/* .useRegisteredDropTarget */ .y)(spec, monitor, connector);
  return [(0,_useCollectedProps__WEBPACK_IMPORTED_MODULE_4__/* .useCollectedProps */ .j)(spec.collect, monitor, connector), (0,_connectors__WEBPACK_IMPORTED_MODULE_5__/* .useConnectDropTarget */ .u)(connector)];
}

/***/ }),

/***/ 37049:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ useDropTarget)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(96540);
if (175 == __webpack_require__.j) {
	/* harmony import */ var _DropTargetImpl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(69866);
}


function useDropTarget(spec, monitor) {
  var dropTarget = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return new _DropTargetImpl__WEBPACK_IMPORTED_MODULE_1__/* .DropTargetImpl */ .r(spec, monitor);
  }, [monitor]);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {
    dropTarget.spec = spec;
  }, [spec]);
  return dropTarget;
}

/***/ }),

/***/ 5282:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ useDropTargetConnector)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(96540);
if (175 == __webpack_require__.j) {
	/* harmony import */ var _internals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(90341);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _useDragDropManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(43716);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _useIsomorphicLayoutEffect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(48030);
}




function useDropTargetConnector(options) {
  var manager = (0,_useDragDropManager__WEBPACK_IMPORTED_MODULE_1__/* .useDragDropManager */ .u)();
  var connector = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return new _internals__WEBPACK_IMPORTED_MODULE_2__/* .TargetConnector */ .P(manager.getBackend());
  }, [manager]);
  (0,_useIsomorphicLayoutEffect__WEBPACK_IMPORTED_MODULE_3__/* .useIsomorphicLayoutEffect */ .E)(function () {
    connector.dropTargetOptions = options || null;
    connector.reconnect();
  }, [options]);
  return connector;
}

/***/ }),

/***/ 75999:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   y: () => (/* binding */ useDropTargetMonitor)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(96540);
if (175 == __webpack_require__.j) {
	/* harmony import */ var _internals__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(39801);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _useDragDropManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(43716);
}



function useDropTargetMonitor() {
  var manager = (0,_useDragDropManager__WEBPACK_IMPORTED_MODULE_1__/* .useDragDropManager */ .u)();
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return new _internals__WEBPACK_IMPORTED_MODULE_2__/* .DropTargetMonitorImpl */ .b(manager);
  }, [manager]);
}

/***/ }),

/***/ 43521:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   y: () => (/* binding */ useRegisteredDropTarget)
/* harmony export */ });
if (175 == __webpack_require__.j) {
	/* harmony import */ var _internals__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(39756);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _useDragDropManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(43716);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _useIsomorphicLayoutEffect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(48030);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _useAccept__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(32785);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _useDropTarget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(37049);
}
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }






function useRegisteredDropTarget(spec, monitor, connector) {
  var manager = (0,_useDragDropManager__WEBPACK_IMPORTED_MODULE_0__/* .useDragDropManager */ .u)();
  var dropTarget = (0,_useDropTarget__WEBPACK_IMPORTED_MODULE_1__/* .useDropTarget */ .A)(spec, monitor);
  var accept = (0,_useAccept__WEBPACK_IMPORTED_MODULE_2__/* .useAccept */ .e)(spec);
  (0,_useIsomorphicLayoutEffect__WEBPACK_IMPORTED_MODULE_3__/* .useIsomorphicLayoutEffect */ .E)(function registerDropTarget() {
    var _registerTarget = (0,_internals__WEBPACK_IMPORTED_MODULE_4__/* .registerTarget */ .l)(accept, dropTarget, manager),
        _registerTarget2 = _slicedToArray(_registerTarget, 2),
        handlerId = _registerTarget2[0],
        unregister = _registerTarget2[1];

    monitor.receiveHandlerId(handlerId);
    connector.receiveHandlerId(handlerId);
    return unregister;
  }, [manager, monitor, dropTarget, connector, accept.map(function (a) {
    return a.toString();
  }).join('|')]);
}

/***/ }),

/***/ 48030:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E: () => (/* binding */ useIsomorphicLayoutEffect)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(96540);
 // suppress the useLayoutEffect warning on server side.

var useIsomorphicLayoutEffect = typeof window !== 'undefined' ? react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect : react__WEBPACK_IMPORTED_MODULE_0__.useEffect;

/***/ }),

/***/ 59881:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F: () => (/* binding */ useMonitorOutput)
/* harmony export */ });
if (175 == __webpack_require__.j) {
	/* harmony import */ var _useIsomorphicLayoutEffect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(48030);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _useCollector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39937);
}
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



function useMonitorOutput(monitor, collect, onCollect) {
  var _useCollector = (0,_useCollector__WEBPACK_IMPORTED_MODULE_0__/* .useCollector */ .F)(monitor, collect, onCollect),
      _useCollector2 = _slicedToArray(_useCollector, 2),
      collected = _useCollector2[0],
      updateCollected = _useCollector2[1];

  (0,_useIsomorphicLayoutEffect__WEBPACK_IMPORTED_MODULE_1__/* .useIsomorphicLayoutEffect */ .E)(function subscribeToMonitorStateChange() {
    var handlerId = monitor.getHandlerId();

    if (handlerId == null) {
      return;
    }

    return monitor.subscribeToStateChange(updateCollected, {
      handlerIds: [handlerId]
    });
  }, [monitor, updateCollected]);
  return collected;
}

/***/ }),

/***/ 95532:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I: () => (/* binding */ useOptionalFactory)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(96540);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }


function useOptionalFactory(arg, deps) {
  var memoDeps = _toConsumableArray(deps || []);

  if (deps == null && typeof arg !== 'function') {
    memoDeps.push(arg);
  }

  return (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(function () {
    return typeof arg === 'function' ? arg() : arg;
  }, memoDeps);
}

/***/ }),

/***/ 89628:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DndContext: () => (/* reexport safe */ _core__WEBPACK_IMPORTED_MODULE_0__.Mp),
/* harmony export */   DndProvider: () => (/* reexport safe */ _core__WEBPACK_IMPORTED_MODULE_0__.QP),
/* harmony export */   DragLayer: () => (/* reexport safe */ _decorators__WEBPACK_IMPORTED_MODULE_1__.Mf),
/* harmony export */   DragPreviewImage: () => (/* reexport safe */ _core__WEBPACK_IMPORTED_MODULE_0__.Ic),
/* harmony export */   DragSource: () => (/* reexport safe */ _decorators__WEBPACK_IMPORTED_MODULE_1__.I4),
/* harmony export */   DropTarget: () => (/* reexport safe */ _decorators__WEBPACK_IMPORTED_MODULE_1__.Tl),
/* harmony export */   useDrag: () => (/* reexport safe */ _hooks__WEBPACK_IMPORTED_MODULE_2__.i3),
/* harmony export */   useDragDropManager: () => (/* reexport safe */ _hooks__WEBPACK_IMPORTED_MODULE_2__.uF),
/* harmony export */   useDragLayer: () => (/* reexport safe */ _hooks__WEBPACK_IMPORTED_MODULE_2__.V7),
/* harmony export */   useDrop: () => (/* reexport safe */ _hooks__WEBPACK_IMPORTED_MODULE_2__.Hd)
/* harmony export */ });
if (175 == __webpack_require__.j) {
	/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(37998);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _decorators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(54279);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _hooks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4899);
}





/***/ }),

/***/ 37704:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   G: () => (/* binding */ DragSourceMonitorImpl)
/* harmony export */ });
if (175 == __webpack_require__.j) {
	/* harmony import */ var _react_dnd_invariant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(72954);
}
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var isCallingCanDrag = false;
var isCallingIsDragging = false;
var DragSourceMonitorImpl = /*#__PURE__*/(/* runtime-dependent pure expression or super */ 175 == __webpack_require__.j ? (function () {
  function DragSourceMonitorImpl(manager) {
    _classCallCheck(this, DragSourceMonitorImpl);

    this.sourceId = null;
    this.internalMonitor = manager.getMonitor();
  }

  _createClass(DragSourceMonitorImpl, [{
    key: "receiveHandlerId",
    value: function receiveHandlerId(sourceId) {
      this.sourceId = sourceId;
    }
  }, {
    key: "getHandlerId",
    value: function getHandlerId() {
      return this.sourceId;
    }
  }, {
    key: "canDrag",
    value: function canDrag() {
      (0,_react_dnd_invariant__WEBPACK_IMPORTED_MODULE_0__/* .invariant */ .V)(!isCallingCanDrag, 'You may not call monitor.canDrag() inside your canDrag() implementation. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor');

      try {
        isCallingCanDrag = true;
        return this.internalMonitor.canDragSource(this.sourceId);
      } finally {
        isCallingCanDrag = false;
      }
    }
  }, {
    key: "isDragging",
    value: function isDragging() {
      if (!this.sourceId) {
        return false;
      }

      (0,_react_dnd_invariant__WEBPACK_IMPORTED_MODULE_0__/* .invariant */ .V)(!isCallingIsDragging, 'You may not call monitor.isDragging() inside your isDragging() implementation. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drag-source-monitor');

      try {
        isCallingIsDragging = true;
        return this.internalMonitor.isDraggingSource(this.sourceId);
      } finally {
        isCallingIsDragging = false;
      }
    }
  }, {
    key: "subscribeToStateChange",
    value: function subscribeToStateChange(listener, options) {
      return this.internalMonitor.subscribeToStateChange(listener, options);
    }
  }, {
    key: "isDraggingSource",
    value: function isDraggingSource(sourceId) {
      return this.internalMonitor.isDraggingSource(sourceId);
    }
  }, {
    key: "isOverTarget",
    value: function isOverTarget(targetId, options) {
      return this.internalMonitor.isOverTarget(targetId, options);
    }
  }, {
    key: "getTargetIds",
    value: function getTargetIds() {
      return this.internalMonitor.getTargetIds();
    }
  }, {
    key: "isSourcePublic",
    value: function isSourcePublic() {
      return this.internalMonitor.isSourcePublic();
    }
  }, {
    key: "getSourceId",
    value: function getSourceId() {
      return this.internalMonitor.getSourceId();
    }
  }, {
    key: "subscribeToOffsetChange",
    value: function subscribeToOffsetChange(listener) {
      return this.internalMonitor.subscribeToOffsetChange(listener);
    }
  }, {
    key: "canDragSource",
    value: function canDragSource(sourceId) {
      return this.internalMonitor.canDragSource(sourceId);
    }
  }, {
    key: "canDropOnTarget",
    value: function canDropOnTarget(targetId) {
      return this.internalMonitor.canDropOnTarget(targetId);
    }
  }, {
    key: "getItemType",
    value: function getItemType() {
      return this.internalMonitor.getItemType();
    }
  }, {
    key: "getItem",
    value: function getItem() {
      return this.internalMonitor.getItem();
    }
  }, {
    key: "getDropResult",
    value: function getDropResult() {
      return this.internalMonitor.getDropResult();
    }
  }, {
    key: "didDrop",
    value: function didDrop() {
      return this.internalMonitor.didDrop();
    }
  }, {
    key: "getInitialClientOffset",
    value: function getInitialClientOffset() {
      return this.internalMonitor.getInitialClientOffset();
    }
  }, {
    key: "getInitialSourceClientOffset",
    value: function getInitialSourceClientOffset() {
      return this.internalMonitor.getInitialSourceClientOffset();
    }
  }, {
    key: "getSourceClientOffset",
    value: function getSourceClientOffset() {
      return this.internalMonitor.getSourceClientOffset();
    }
  }, {
    key: "getClientOffset",
    value: function getClientOffset() {
      return this.internalMonitor.getClientOffset();
    }
  }, {
    key: "getDifferenceFromInitialOffset",
    value: function getDifferenceFromInitialOffset() {
      return this.internalMonitor.getDifferenceFromInitialOffset();
    }
  }]);

  return DragSourceMonitorImpl;
}()) : null);

/***/ }),

/***/ 39801:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   b: () => (/* binding */ DropTargetMonitorImpl)
/* harmony export */ });
if (175 == __webpack_require__.j) {
	/* harmony import */ var _react_dnd_invariant__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(72954);
}
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var isCallingCanDrop = false;
var DropTargetMonitorImpl = /*#__PURE__*/(/* runtime-dependent pure expression or super */ 175 == __webpack_require__.j ? (function () {
  function DropTargetMonitorImpl(manager) {
    _classCallCheck(this, DropTargetMonitorImpl);

    this.targetId = null;
    this.internalMonitor = manager.getMonitor();
  }

  _createClass(DropTargetMonitorImpl, [{
    key: "receiveHandlerId",
    value: function receiveHandlerId(targetId) {
      this.targetId = targetId;
    }
  }, {
    key: "getHandlerId",
    value: function getHandlerId() {
      return this.targetId;
    }
  }, {
    key: "subscribeToStateChange",
    value: function subscribeToStateChange(listener, options) {
      return this.internalMonitor.subscribeToStateChange(listener, options);
    }
  }, {
    key: "canDrop",
    value: function canDrop() {
      // Cut out early if the target id has not been set. This should prevent errors
      // where the user has an older version of dnd-core like in
      // https://github.com/react-dnd/react-dnd/issues/1310
      if (!this.targetId) {
        return false;
      }

      (0,_react_dnd_invariant__WEBPACK_IMPORTED_MODULE_0__/* .invariant */ .V)(!isCallingCanDrop, 'You may not call monitor.canDrop() inside your canDrop() implementation. ' + 'Read more: http://react-dnd.github.io/react-dnd/docs/api/drop-target-monitor');

      try {
        isCallingCanDrop = true;
        return this.internalMonitor.canDropOnTarget(this.targetId);
      } finally {
        isCallingCanDrop = false;
      }
    }
  }, {
    key: "isOver",
    value: function isOver(options) {
      if (!this.targetId) {
        return false;
      }

      return this.internalMonitor.isOverTarget(this.targetId, options);
    }
  }, {
    key: "getItemType",
    value: function getItemType() {
      return this.internalMonitor.getItemType();
    }
  }, {
    key: "getItem",
    value: function getItem() {
      return this.internalMonitor.getItem();
    }
  }, {
    key: "getDropResult",
    value: function getDropResult() {
      return this.internalMonitor.getDropResult();
    }
  }, {
    key: "didDrop",
    value: function didDrop() {
      return this.internalMonitor.didDrop();
    }
  }, {
    key: "getInitialClientOffset",
    value: function getInitialClientOffset() {
      return this.internalMonitor.getInitialClientOffset();
    }
  }, {
    key: "getInitialSourceClientOffset",
    value: function getInitialSourceClientOffset() {
      return this.internalMonitor.getInitialSourceClientOffset();
    }
  }, {
    key: "getSourceClientOffset",
    value: function getSourceClientOffset() {
      return this.internalMonitor.getSourceClientOffset();
    }
  }, {
    key: "getClientOffset",
    value: function getClientOffset() {
      return this.internalMonitor.getClientOffset();
    }
  }, {
    key: "getDifferenceFromInitialOffset",
    value: function getDifferenceFromInitialOffset() {
      return this.internalMonitor.getDifferenceFromInitialOffset();
    }
  }]);

  return DropTargetMonitorImpl;
}()) : null);

/***/ }),

/***/ 32465:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   b: () => (/* binding */ SourceConnector)
/* harmony export */ });
if (175 == __webpack_require__.j) {
	/* harmony import */ var _wrapConnectorHooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58400);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _isRef__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(43472);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _react_dnd_shallowequal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(49194);
}
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var SourceConnector = /*#__PURE__*/(/* runtime-dependent pure expression or super */ 175 == __webpack_require__.j ? (function () {
  function SourceConnector(backend) {
    var _this = this;

    _classCallCheck(this, SourceConnector);

    this.hooks = (0,_wrapConnectorHooks__WEBPACK_IMPORTED_MODULE_0__/* .wrapConnectorHooks */ .i)({
      dragSource: function dragSource(node, options) {
        _this.clearDragSource();

        _this.dragSourceOptions = options || null;

        if ((0,_isRef__WEBPACK_IMPORTED_MODULE_1__/* .isRef */ .i)(node)) {
          _this.dragSourceRef = node;
        } else {
          _this.dragSourceNode = node;
        }

        _this.reconnectDragSource();
      },
      dragPreview: function dragPreview(node, options) {
        _this.clearDragPreview();

        _this.dragPreviewOptions = options || null;

        if ((0,_isRef__WEBPACK_IMPORTED_MODULE_1__/* .isRef */ .i)(node)) {
          _this.dragPreviewRef = node;
        } else {
          _this.dragPreviewNode = node;
        }

        _this.reconnectDragPreview();
      }
    });
    this.handlerId = null; // The drop target may either be attached via ref or connect function

    this.dragSourceRef = null;
    this.dragSourceOptionsInternal = null; // The drag preview may either be attached via ref or connect function

    this.dragPreviewRef = null;
    this.dragPreviewOptionsInternal = null;
    this.lastConnectedHandlerId = null;
    this.lastConnectedDragSource = null;
    this.lastConnectedDragSourceOptions = null;
    this.lastConnectedDragPreview = null;
    this.lastConnectedDragPreviewOptions = null;
    this.backend = backend;
  }

  _createClass(SourceConnector, [{
    key: "receiveHandlerId",
    value: function receiveHandlerId(newHandlerId) {
      if (this.handlerId === newHandlerId) {
        return;
      }

      this.handlerId = newHandlerId;
      this.reconnect();
    }
  }, {
    key: "connectTarget",
    get: function get() {
      return this.dragSource;
    }
  }, {
    key: "dragSourceOptions",
    get: function get() {
      return this.dragSourceOptionsInternal;
    },
    set: function set(options) {
      this.dragSourceOptionsInternal = options;
    }
  }, {
    key: "dragPreviewOptions",
    get: function get() {
      return this.dragPreviewOptionsInternal;
    },
    set: function set(options) {
      this.dragPreviewOptionsInternal = options;
    }
  }, {
    key: "reconnect",
    value: function reconnect() {
      this.reconnectDragSource();
      this.reconnectDragPreview();
    }
  }, {
    key: "reconnectDragSource",
    value: function reconnectDragSource() {
      var dragSource = this.dragSource; // if nothing has changed then don't resubscribe

      var didChange = this.didHandlerIdChange() || this.didConnectedDragSourceChange() || this.didDragSourceOptionsChange();

      if (didChange) {
        this.disconnectDragSource();
      }

      if (!this.handlerId) {
        return;
      }

      if (!dragSource) {
        this.lastConnectedDragSource = dragSource;
        return;
      }

      if (didChange) {
        this.lastConnectedHandlerId = this.handlerId;
        this.lastConnectedDragSource = dragSource;
        this.lastConnectedDragSourceOptions = this.dragSourceOptions;
        this.dragSourceUnsubscribe = this.backend.connectDragSource(this.handlerId, dragSource, this.dragSourceOptions);
      }
    }
  }, {
    key: "reconnectDragPreview",
    value: function reconnectDragPreview() {
      var dragPreview = this.dragPreview; // if nothing has changed then don't resubscribe

      var didChange = this.didHandlerIdChange() || this.didConnectedDragPreviewChange() || this.didDragPreviewOptionsChange();

      if (didChange) {
        this.disconnectDragPreview();
      }

      if (!this.handlerId) {
        return;
      }

      if (!dragPreview) {
        this.lastConnectedDragPreview = dragPreview;
        return;
      }

      if (didChange) {
        this.lastConnectedHandlerId = this.handlerId;
        this.lastConnectedDragPreview = dragPreview;
        this.lastConnectedDragPreviewOptions = this.dragPreviewOptions;
        this.dragPreviewUnsubscribe = this.backend.connectDragPreview(this.handlerId, dragPreview, this.dragPreviewOptions);
      }
    }
  }, {
    key: "didHandlerIdChange",
    value: function didHandlerIdChange() {
      return this.lastConnectedHandlerId !== this.handlerId;
    }
  }, {
    key: "didConnectedDragSourceChange",
    value: function didConnectedDragSourceChange() {
      return this.lastConnectedDragSource !== this.dragSource;
    }
  }, {
    key: "didConnectedDragPreviewChange",
    value: function didConnectedDragPreviewChange() {
      return this.lastConnectedDragPreview !== this.dragPreview;
    }
  }, {
    key: "didDragSourceOptionsChange",
    value: function didDragSourceOptionsChange() {
      return !(0,_react_dnd_shallowequal__WEBPACK_IMPORTED_MODULE_2__/* .shallowEqual */ .b)(this.lastConnectedDragSourceOptions, this.dragSourceOptions);
    }
  }, {
    key: "didDragPreviewOptionsChange",
    value: function didDragPreviewOptionsChange() {
      return !(0,_react_dnd_shallowequal__WEBPACK_IMPORTED_MODULE_2__/* .shallowEqual */ .b)(this.lastConnectedDragPreviewOptions, this.dragPreviewOptions);
    }
  }, {
    key: "disconnectDragSource",
    value: function disconnectDragSource() {
      if (this.dragSourceUnsubscribe) {
        this.dragSourceUnsubscribe();
        this.dragSourceUnsubscribe = undefined;
      }
    }
  }, {
    key: "disconnectDragPreview",
    value: function disconnectDragPreview() {
      if (this.dragPreviewUnsubscribe) {
        this.dragPreviewUnsubscribe();
        this.dragPreviewUnsubscribe = undefined;
        this.dragPreviewNode = null;
        this.dragPreviewRef = null;
      }
    }
  }, {
    key: "dragSource",
    get: function get() {
      return this.dragSourceNode || this.dragSourceRef && this.dragSourceRef.current;
    }
  }, {
    key: "dragPreview",
    get: function get() {
      return this.dragPreviewNode || this.dragPreviewRef && this.dragPreviewRef.current;
    }
  }, {
    key: "clearDragSource",
    value: function clearDragSource() {
      this.dragSourceNode = null;
      this.dragSourceRef = null;
    }
  }, {
    key: "clearDragPreview",
    value: function clearDragPreview() {
      this.dragPreviewNode = null;
      this.dragPreviewRef = null;
    }
  }]);

  return SourceConnector;
}()) : null);

/***/ }),

/***/ 90341:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ TargetConnector)
/* harmony export */ });
if (175 == __webpack_require__.j) {
	/* harmony import */ var _react_dnd_shallowequal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(49194);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _wrapConnectorHooks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(58400);
}
if (175 == __webpack_require__.j) {
	/* harmony import */ var _isRef__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(43472);
}
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




var TargetConnector = /*#__PURE__*/(/* runtime-dependent pure expression or super */ 175 == __webpack_require__.j ? (function () {
  function TargetConnector(backend) {
    var _this = this;

    _classCallCheck(this, TargetConnector);

    this.hooks = (0,_wrapConnectorHooks__WEBPACK_IMPORTED_MODULE_0__/* .wrapConnectorHooks */ .i)({
      dropTarget: function dropTarget(node, options) {
        _this.clearDropTarget();

        _this.dropTargetOptions = options;

        if ((0,_isRef__WEBPACK_IMPORTED_MODULE_1__/* .isRef */ .i)(node)) {
          _this.dropTargetRef = node;
        } else {
          _this.dropTargetNode = node;
        }

        _this.reconnect();
      }
    });
    this.handlerId = null; // The drop target may either be attached via ref or connect function

    this.dropTargetRef = null;
    this.dropTargetOptionsInternal = null;
    this.lastConnectedHandlerId = null;
    this.lastConnectedDropTarget = null;
    this.lastConnectedDropTargetOptions = null;
    this.backend = backend;
  }

  _createClass(TargetConnector, [{
    key: "connectTarget",
    get: function get() {
      return this.dropTarget;
    }
  }, {
    key: "reconnect",
    value: function reconnect() {
      // if nothing has changed then don't resubscribe
      var didChange = this.didHandlerIdChange() || this.didDropTargetChange() || this.didOptionsChange();

      if (didChange) {
        this.disconnectDropTarget();
      }

      var dropTarget = this.dropTarget;

      if (!this.handlerId) {
        return;
      }

      if (!dropTarget) {
        this.lastConnectedDropTarget = dropTarget;
        return;
      }

      if (didChange) {
        this.lastConnectedHandlerId = this.handlerId;
        this.lastConnectedDropTarget = dropTarget;
        this.lastConnectedDropTargetOptions = this.dropTargetOptions;
        this.unsubscribeDropTarget = this.backend.connectDropTarget(this.handlerId, dropTarget, this.dropTargetOptions);
      }
    }
  }, {
    key: "receiveHandlerId",
    value: function receiveHandlerId(newHandlerId) {
      if (newHandlerId === this.handlerId) {
        return;
      }

      this.handlerId = newHandlerId;
      this.reconnect();
    }
  }, {
    key: "dropTargetOptions",
    get: function get() {
      return this.dropTargetOptionsInternal;
    },
    set: function set(options) {
      this.dropTargetOptionsInternal = options;
    }
  }, {
    key: "didHandlerIdChange",
    value: function didHandlerIdChange() {
      return this.lastConnectedHandlerId !== this.handlerId;
    }
  }, {
    key: "didDropTargetChange",
    value: function didDropTargetChange() {
      return this.lastConnectedDropTarget !== this.dropTarget;
    }
  }, {
    key: "didOptionsChange",
    value: function didOptionsChange() {
      return !(0,_react_dnd_shallowequal__WEBPACK_IMPORTED_MODULE_2__/* .shallowEqual */ .b)(this.lastConnectedDropTargetOptions, this.dropTargetOptions);
    }
  }, {
    key: "disconnectDropTarget",
    value: function disconnectDropTarget() {
      if (this.unsubscribeDropTarget) {
        this.unsubscribeDropTarget();
        this.unsubscribeDropTarget = undefined;
      }
    }
  }, {
    key: "dropTarget",
    get: function get() {
      return this.dropTargetNode || this.dropTargetRef && this.dropTargetRef.current;
    }
  }, {
    key: "clearDropTarget",
    value: function clearDropTarget() {
      this.dropTargetRef = null;
      this.dropTargetNode = null;
    }
  }]);

  return TargetConnector;
}()) : null);

/***/ }),

/***/ 43472:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   i: () => (/* binding */ isRef)
/* harmony export */ });
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function isRef(obj) {
  return (// eslint-disable-next-line no-prototype-builtins
    obj !== null && _typeof(obj) === 'object' && Object.prototype.hasOwnProperty.call(obj, 'current')
  );
}

/***/ }),

/***/ 39756:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V: () => (/* binding */ registerSource),
/* harmony export */   l: () => (/* binding */ registerTarget)
/* harmony export */ });
function registerTarget(type, target, manager) {
  var registry = manager.getRegistry();
  var targetId = registry.addTarget(type, target);
  return [targetId, function () {
    return registry.removeTarget(targetId);
  }];
}
function registerSource(type, source, manager) {
  var registry = manager.getRegistry();
  var sourceId = registry.addSource(type, source);
  return [sourceId, function () {
    return registry.removeSource(sourceId);
  }];
}

/***/ }),

/***/ 58400:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   i: () => (/* binding */ wrapConnectorHooks)
/* harmony export */ });
if (175 == __webpack_require__.j) {
	/* harmony import */ var _react_dnd_invariant__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(72954);
}
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(96540);



function throwIfCompositeComponentElement(element) {
  // Custom components can no longer be wrapped directly in React DnD 2.0
  // so that we don't need to depend on findDOMNode() from react-dom.
  if (typeof element.type === 'string') {
    return;
  }

  var displayName = element.type.displayName || element.type.name || 'the component';
  throw new Error('Only native element nodes can now be passed to React DnD connectors.' + "You can either wrap ".concat(displayName, " into a <div>, or turn it into a ") + 'drag source or a drop target itself.');
}

function wrapHookToRecognizeElement(hook) {
  return function () {
    var elementOrNode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    // When passed a node, call the hook straight away.
    if (!(0,react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(elementOrNode)) {
      var node = elementOrNode;
      hook(node, options); // return the node so it can be chained (e.g. when within callback refs
      // <div ref={node => connectDragSource(connectDropTarget(node))}/>

      return node;
    } // If passed a ReactElement, clone it and attach this function as a ref.
    // This helps us achieve a neat API where user doesn't even know that refs
    // are being used under the hood.


    var element = elementOrNode;
    throwIfCompositeComponentElement(element); // When no options are passed, use the hook directly

    var ref = options ? function (node) {
      return hook(node, options);
    } : hook;
    return cloneWithRef(element, ref);
  };
}

function wrapConnectorHooks(hooks) {
  var wrappedHooks = {};
  Object.keys(hooks).forEach(function (key) {
    var hook = hooks[key]; // ref objects should be passed straight through without wrapping

    if (key.endsWith('Ref')) {
      wrappedHooks[key] = hooks[key];
    } else {
      var wrappedHook = wrapHookToRecognizeElement(hook);

      wrappedHooks[key] = function () {
        return wrappedHook;
      };
    }
  });
  return wrappedHooks;
}

function setRef(ref, node) {
  if (typeof ref === 'function') {
    ref(node);
  } else {
    ref.current = node;
  }
}

function cloneWithRef(element, newRef) {
  var previousRef = element.ref;
  (0,_react_dnd_invariant__WEBPACK_IMPORTED_MODULE_1__/* .invariant */ .V)(typeof previousRef !== 'string', 'Cannot connect React DnD to an element with an existing string ref. ' + 'Please convert it to use a callback ref instead, or wrap it into a <span> or <div>. ' + 'Read more: https://reactjs.org/docs/refs-and-the-dom.html#callback-refs');

  if (!previousRef) {
    // When there is no ref on the element, use the new ref directly
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(element, {
      ref: newRef
    });
  } else {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(element, {
      ref: function ref(node) {
        setRef(previousRef, node);
        setRef(newRef, node);
      }
    });
  }
}

/***/ }),

/***/ 22551:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/
var aa=__webpack_require__(96540),ca=__webpack_require__(20194);function p(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var da=new Set,ea={};function fa(a,b){ha(a,b);ha(a+"Capture",b)}
function ha(a,b){ea[a]=b;for(a=0;a<b.length;a++)da.add(b[a])}
var ia=!("undefined"===typeof window||"undefined"===typeof window.document||"undefined"===typeof window.document.createElement),ja=Object.prototype.hasOwnProperty,ka=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,la=
{},ma={};function oa(a){if(ja.call(ma,a))return!0;if(ja.call(la,a))return!1;if(ka.test(a))return ma[a]=!0;la[a]=!0;return!1}function pa(a,b,c,d){if(null!==c&&0===c.type)return!1;switch(typeof b){case "function":case "symbol":return!0;case "boolean":if(d)return!1;if(null!==c)return!c.acceptsBooleans;a=a.toLowerCase().slice(0,5);return"data-"!==a&&"aria-"!==a;default:return!1}}
function qa(a,b,c,d){if(null===b||"undefined"===typeof b||pa(a,b,c,d))return!0;if(d)return!1;if(null!==c)switch(c.type){case 3:return!b;case 4:return!1===b;case 5:return isNaN(b);case 6:return isNaN(b)||1>b}return!1}function v(a,b,c,d,e,f,g){this.acceptsBooleans=2===b||3===b||4===b;this.attributeName=d;this.attributeNamespace=e;this.mustUseProperty=c;this.propertyName=a;this.type=b;this.sanitizeURL=f;this.removeEmptyString=g}var z={};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a){z[a]=new v(a,0,!1,a,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(a){var b=a[0];z[b]=new v(b,1,!1,a[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(a){z[a]=new v(a,2,!1,a.toLowerCase(),null,!1,!1)});
["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(a){z[a]=new v(a,2,!1,a,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a){z[a]=new v(a,3,!1,a.toLowerCase(),null,!1,!1)});
["checked","multiple","muted","selected"].forEach(function(a){z[a]=new v(a,3,!0,a,null,!1,!1)});["capture","download"].forEach(function(a){z[a]=new v(a,4,!1,a,null,!1,!1)});["cols","rows","size","span"].forEach(function(a){z[a]=new v(a,6,!1,a,null,!1,!1)});["rowSpan","start"].forEach(function(a){z[a]=new v(a,5,!1,a.toLowerCase(),null,!1,!1)});var ra=/[\-:]([a-z])/g;function sa(a){return a[1].toUpperCase()}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a){var b=a.replace(ra,
sa);z[b]=new v(b,1,!1,a,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a){var b=a.replace(ra,sa);z[b]=new v(b,1,!1,a,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(a){var b=a.replace(ra,sa);z[b]=new v(b,1,!1,a,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(a){z[a]=new v(a,1,!1,a.toLowerCase(),null,!1,!1)});
z.xlinkHref=new v("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(a){z[a]=new v(a,1,!1,a.toLowerCase(),null,!0,!0)});
function ta(a,b,c,d){var e=z.hasOwnProperty(b)?z[b]:null;if(null!==e?0!==e.type:d||!(2<b.length)||"o"!==b[0]&&"O"!==b[0]||"n"!==b[1]&&"N"!==b[1])qa(b,c,e,d)&&(c=null),d||null===e?oa(b)&&(null===c?a.removeAttribute(b):a.setAttribute(b,""+c)):e.mustUseProperty?a[e.propertyName]=null===c?3===e.type?!1:"":c:(b=e.attributeName,d=e.attributeNamespace,null===c?a.removeAttribute(b):(e=e.type,c=3===e||4===e&&!0===c?"":""+c,d?a.setAttributeNS(d,b,c):a.setAttribute(b,c)))}
var ua=aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,va=Symbol.for("react.element"),wa=Symbol.for("react.portal"),ya=Symbol.for("react.fragment"),za=Symbol.for("react.strict_mode"),Aa=Symbol.for("react.profiler"),Ba=Symbol.for("react.provider"),Ca=Symbol.for("react.context"),Da=Symbol.for("react.forward_ref"),Ea=Symbol.for("react.suspense"),Fa=Symbol.for("react.suspense_list"),Ga=Symbol.for("react.memo"),Ha=Symbol.for("react.lazy");Symbol.for("react.scope");Symbol.for("react.debug_trace_mode");
var Ia=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden");Symbol.for("react.cache");Symbol.for("react.tracing_marker");var Ja=Symbol.iterator;function Ka(a){if(null===a||"object"!==typeof a)return null;a=Ja&&a[Ja]||a["@@iterator"];return"function"===typeof a?a:null}var A=Object.assign,La;function Ma(a){if(void 0===La)try{throw Error();}catch(c){var b=c.stack.trim().match(/\n( *(at )?)/);La=b&&b[1]||""}return"\n"+La+a}var Na=!1;
function Oa(a,b){if(!a||Na)return"";Na=!0;var c=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(b)if(b=function(){throw Error();},Object.defineProperty(b.prototype,"props",{set:function(){throw Error();}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(b,[])}catch(l){var d=l}Reflect.construct(a,[],b)}else{try{b.call()}catch(l){d=l}a.call(b.prototype)}else{try{throw Error();}catch(l){d=l}a()}}catch(l){if(l&&d&&"string"===typeof l.stack){for(var e=l.stack.split("\n"),
f=d.stack.split("\n"),g=e.length-1,h=f.length-1;1<=g&&0<=h&&e[g]!==f[h];)h--;for(;1<=g&&0<=h;g--,h--)if(e[g]!==f[h]){if(1!==g||1!==h){do if(g--,h--,0>h||e[g]!==f[h]){var k="\n"+e[g].replace(" at new "," at ");a.displayName&&k.includes("<anonymous>")&&(k=k.replace("<anonymous>",a.displayName));return k}while(1<=g&&0<=h)}break}}}finally{Na=!1,Error.prepareStackTrace=c}return(a=a?a.displayName||a.name:"")?Ma(a):""}
function Pa(a){switch(a.tag){case 5:return Ma(a.type);case 16:return Ma("Lazy");case 13:return Ma("Suspense");case 19:return Ma("SuspenseList");case 0:case 2:case 15:return a=Oa(a.type,!1),a;case 11:return a=Oa(a.type.render,!1),a;case 1:return a=Oa(a.type,!0),a;default:return""}}
function Qa(a){if(null==a)return null;if("function"===typeof a)return a.displayName||a.name||null;if("string"===typeof a)return a;switch(a){case ya:return"Fragment";case wa:return"Portal";case Aa:return"Profiler";case za:return"StrictMode";case Ea:return"Suspense";case Fa:return"SuspenseList"}if("object"===typeof a)switch(a.$$typeof){case Ca:return(a.displayName||"Context")+".Consumer";case Ba:return(a._context.displayName||"Context")+".Provider";case Da:var b=a.render;a=a.displayName;a||(a=b.displayName||
b.name||"",a=""!==a?"ForwardRef("+a+")":"ForwardRef");return a;case Ga:return b=a.displayName||null,null!==b?b:Qa(a.type)||"Memo";case Ha:b=a._payload;a=a._init;try{return Qa(a(b))}catch(c){}}return null}
function Ra(a){var b=a.type;switch(a.tag){case 24:return"Cache";case 9:return(b.displayName||"Context")+".Consumer";case 10:return(b._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return a=b.render,a=a.displayName||a.name||"",b.displayName||(""!==a?"ForwardRef("+a+")":"ForwardRef");case 7:return"Fragment";case 5:return b;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Qa(b);case 8:return b===za?"StrictMode":"Mode";case 22:return"Offscreen";
case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if("function"===typeof b)return b.displayName||b.name||null;if("string"===typeof b)return b}return null}function Sa(a){switch(typeof a){case "boolean":case "number":case "string":case "undefined":return a;case "object":return a;default:return""}}
function Ta(a){var b=a.type;return(a=a.nodeName)&&"input"===a.toLowerCase()&&("checkbox"===b||"radio"===b)}
function Ua(a){var b=Ta(a)?"checked":"value",c=Object.getOwnPropertyDescriptor(a.constructor.prototype,b),d=""+a[b];if(!a.hasOwnProperty(b)&&"undefined"!==typeof c&&"function"===typeof c.get&&"function"===typeof c.set){var e=c.get,f=c.set;Object.defineProperty(a,b,{configurable:!0,get:function(){return e.call(this)},set:function(a){d=""+a;f.call(this,a)}});Object.defineProperty(a,b,{enumerable:c.enumerable});return{getValue:function(){return d},setValue:function(a){d=""+a},stopTracking:function(){a._valueTracker=
null;delete a[b]}}}}function Va(a){a._valueTracker||(a._valueTracker=Ua(a))}function Wa(a){if(!a)return!1;var b=a._valueTracker;if(!b)return!0;var c=b.getValue();var d="";a&&(d=Ta(a)?a.checked?"true":"false":a.value);a=d;return a!==c?(b.setValue(a),!0):!1}function Xa(a){a=a||("undefined"!==typeof document?document:void 0);if("undefined"===typeof a)return null;try{return a.activeElement||a.body}catch(b){return a.body}}
function Ya(a,b){var c=b.checked;return A({},b,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=c?c:a._wrapperState.initialChecked})}function Za(a,b){var c=null==b.defaultValue?"":b.defaultValue,d=null!=b.checked?b.checked:b.defaultChecked;c=Sa(null!=b.value?b.value:c);a._wrapperState={initialChecked:d,initialValue:c,controlled:"checkbox"===b.type||"radio"===b.type?null!=b.checked:null!=b.value}}function ab(a,b){b=b.checked;null!=b&&ta(a,"checked",b,!1)}
function bb(a,b){ab(a,b);var c=Sa(b.value),d=b.type;if(null!=c)if("number"===d){if(0===c&&""===a.value||a.value!=c)a.value=""+c}else a.value!==""+c&&(a.value=""+c);else if("submit"===d||"reset"===d){a.removeAttribute("value");return}b.hasOwnProperty("value")?cb(a,b.type,c):b.hasOwnProperty("defaultValue")&&cb(a,b.type,Sa(b.defaultValue));null==b.checked&&null!=b.defaultChecked&&(a.defaultChecked=!!b.defaultChecked)}
function db(a,b,c){if(b.hasOwnProperty("value")||b.hasOwnProperty("defaultValue")){var d=b.type;if(!("submit"!==d&&"reset"!==d||void 0!==b.value&&null!==b.value))return;b=""+a._wrapperState.initialValue;c||b===a.value||(a.value=b);a.defaultValue=b}c=a.name;""!==c&&(a.name="");a.defaultChecked=!!a._wrapperState.initialChecked;""!==c&&(a.name=c)}
function cb(a,b,c){if("number"!==b||Xa(a.ownerDocument)!==a)null==c?a.defaultValue=""+a._wrapperState.initialValue:a.defaultValue!==""+c&&(a.defaultValue=""+c)}var eb=Array.isArray;
function fb(a,b,c,d){a=a.options;if(b){b={};for(var e=0;e<c.length;e++)b["$"+c[e]]=!0;for(c=0;c<a.length;c++)e=b.hasOwnProperty("$"+a[c].value),a[c].selected!==e&&(a[c].selected=e),e&&d&&(a[c].defaultSelected=!0)}else{c=""+Sa(c);b=null;for(e=0;e<a.length;e++){if(a[e].value===c){a[e].selected=!0;d&&(a[e].defaultSelected=!0);return}null!==b||a[e].disabled||(b=a[e])}null!==b&&(b.selected=!0)}}
function gb(a,b){if(null!=b.dangerouslySetInnerHTML)throw Error(p(91));return A({},b,{value:void 0,defaultValue:void 0,children:""+a._wrapperState.initialValue})}function hb(a,b){var c=b.value;if(null==c){c=b.children;b=b.defaultValue;if(null!=c){if(null!=b)throw Error(p(92));if(eb(c)){if(1<c.length)throw Error(p(93));c=c[0]}b=c}null==b&&(b="");c=b}a._wrapperState={initialValue:Sa(c)}}
function ib(a,b){var c=Sa(b.value),d=Sa(b.defaultValue);null!=c&&(c=""+c,c!==a.value&&(a.value=c),null==b.defaultValue&&a.defaultValue!==c&&(a.defaultValue=c));null!=d&&(a.defaultValue=""+d)}function jb(a){var b=a.textContent;b===a._wrapperState.initialValue&&""!==b&&null!==b&&(a.value=b)}function kb(a){switch(a){case "svg":return"http://www.w3.org/2000/svg";case "math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}
function lb(a,b){return null==a||"http://www.w3.org/1999/xhtml"===a?kb(b):"http://www.w3.org/2000/svg"===a&&"foreignObject"===b?"http://www.w3.org/1999/xhtml":a}
var mb,nb=function(a){return"undefined"!==typeof MSApp&&MSApp.execUnsafeLocalFunction?function(b,c,d,e){MSApp.execUnsafeLocalFunction(function(){return a(b,c,d,e)})}:a}(function(a,b){if("http://www.w3.org/2000/svg"!==a.namespaceURI||"innerHTML"in a)a.innerHTML=b;else{mb=mb||document.createElement("div");mb.innerHTML="<svg>"+b.valueOf().toString()+"</svg>";for(b=mb.firstChild;a.firstChild;)a.removeChild(a.firstChild);for(;b.firstChild;)a.appendChild(b.firstChild)}});
function ob(a,b){if(b){var c=a.firstChild;if(c&&c===a.lastChild&&3===c.nodeType){c.nodeValue=b;return}}a.textContent=b}
var pb={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,
zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},qb=["Webkit","ms","Moz","O"];Object.keys(pb).forEach(function(a){qb.forEach(function(b){b=b+a.charAt(0).toUpperCase()+a.substring(1);pb[b]=pb[a]})});function rb(a,b,c){return null==b||"boolean"===typeof b||""===b?"":c||"number"!==typeof b||0===b||pb.hasOwnProperty(a)&&pb[a]?(""+b).trim():b+"px"}
function sb(a,b){a=a.style;for(var c in b)if(b.hasOwnProperty(c)){var d=0===c.indexOf("--"),e=rb(c,b[c],d);"float"===c&&(c="cssFloat");d?a.setProperty(c,e):a[c]=e}}var tb=A({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});
function ub(a,b){if(b){if(tb[a]&&(null!=b.children||null!=b.dangerouslySetInnerHTML))throw Error(p(137,a));if(null!=b.dangerouslySetInnerHTML){if(null!=b.children)throw Error(p(60));if("object"!==typeof b.dangerouslySetInnerHTML||!("__html"in b.dangerouslySetInnerHTML))throw Error(p(61));}if(null!=b.style&&"object"!==typeof b.style)throw Error(p(62));}}
function vb(a,b){if(-1===a.indexOf("-"))return"string"===typeof b.is;switch(a){case "annotation-xml":case "color-profile":case "font-face":case "font-face-src":case "font-face-uri":case "font-face-format":case "font-face-name":case "missing-glyph":return!1;default:return!0}}var wb=null;function xb(a){a=a.target||a.srcElement||window;a.correspondingUseElement&&(a=a.correspondingUseElement);return 3===a.nodeType?a.parentNode:a}var yb=null,zb=null,Ab=null;
function Bb(a){if(a=Cb(a)){if("function"!==typeof yb)throw Error(p(280));var b=a.stateNode;b&&(b=Db(b),yb(a.stateNode,a.type,b))}}function Eb(a){zb?Ab?Ab.push(a):Ab=[a]:zb=a}function Fb(){if(zb){var a=zb,b=Ab;Ab=zb=null;Bb(a);if(b)for(a=0;a<b.length;a++)Bb(b[a])}}function Gb(a,b){return a(b)}function Hb(){}var Ib=!1;function Jb(a,b,c){if(Ib)return a(b,c);Ib=!0;try{return Gb(a,b,c)}finally{if(Ib=!1,null!==zb||null!==Ab)Hb(),Fb()}}
function Kb(a,b){var c=a.stateNode;if(null===c)return null;var d=Db(c);if(null===d)return null;c=d[b];a:switch(b){case "onClick":case "onClickCapture":case "onDoubleClick":case "onDoubleClickCapture":case "onMouseDown":case "onMouseDownCapture":case "onMouseMove":case "onMouseMoveCapture":case "onMouseUp":case "onMouseUpCapture":case "onMouseEnter":(d=!d.disabled)||(a=a.type,d=!("button"===a||"input"===a||"select"===a||"textarea"===a));a=!d;break a;default:a=!1}if(a)return null;if(c&&"function"!==
typeof c)throw Error(p(231,b,typeof c));return c}var Lb=!1;if(ia)try{var Mb={};Object.defineProperty(Mb,"passive",{get:function(){Lb=!0}});window.addEventListener("test",Mb,Mb);window.removeEventListener("test",Mb,Mb)}catch(a){Lb=!1}function Nb(a,b,c,d,e,f,g,h,k){var l=Array.prototype.slice.call(arguments,3);try{b.apply(c,l)}catch(m){this.onError(m)}}var Ob=!1,Pb=null,Qb=!1,Rb=null,Sb={onError:function(a){Ob=!0;Pb=a}};function Tb(a,b,c,d,e,f,g,h,k){Ob=!1;Pb=null;Nb.apply(Sb,arguments)}
function Ub(a,b,c,d,e,f,g,h,k){Tb.apply(this,arguments);if(Ob){if(Ob){var l=Pb;Ob=!1;Pb=null}else throw Error(p(198));Qb||(Qb=!0,Rb=l)}}function Vb(a){var b=a,c=a;if(a.alternate)for(;b.return;)b=b.return;else{a=b;do b=a,0!==(b.flags&4098)&&(c=b.return),a=b.return;while(a)}return 3===b.tag?c:null}function Wb(a){if(13===a.tag){var b=a.memoizedState;null===b&&(a=a.alternate,null!==a&&(b=a.memoizedState));if(null!==b)return b.dehydrated}return null}function Xb(a){if(Vb(a)!==a)throw Error(p(188));}
function Yb(a){var b=a.alternate;if(!b){b=Vb(a);if(null===b)throw Error(p(188));return b!==a?null:a}for(var c=a,d=b;;){var e=c.return;if(null===e)break;var f=e.alternate;if(null===f){d=e.return;if(null!==d){c=d;continue}break}if(e.child===f.child){for(f=e.child;f;){if(f===c)return Xb(e),a;if(f===d)return Xb(e),b;f=f.sibling}throw Error(p(188));}if(c.return!==d.return)c=e,d=f;else{for(var g=!1,h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling}if(!g){for(h=f.child;h;){if(h===
c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling}if(!g)throw Error(p(189));}}if(c.alternate!==d)throw Error(p(190));}if(3!==c.tag)throw Error(p(188));return c.stateNode.current===c?a:b}function Zb(a){a=Yb(a);return null!==a?$b(a):null}function $b(a){if(5===a.tag||6===a.tag)return a;for(a=a.child;null!==a;){var b=$b(a);if(null!==b)return b;a=a.sibling}return null}
var ac=ca.unstable_scheduleCallback,bc=ca.unstable_cancelCallback,cc=ca.unstable_shouldYield,dc=ca.unstable_requestPaint,B=ca.unstable_now,ec=ca.unstable_getCurrentPriorityLevel,fc=ca.unstable_ImmediatePriority,gc=ca.unstable_UserBlockingPriority,hc=ca.unstable_NormalPriority,ic=ca.unstable_LowPriority,jc=ca.unstable_IdlePriority,kc=null,lc=null;function mc(a){if(lc&&"function"===typeof lc.onCommitFiberRoot)try{lc.onCommitFiberRoot(kc,a,void 0,128===(a.current.flags&128))}catch(b){}}
var oc=Math.clz32?Math.clz32:nc,pc=Math.log,qc=Math.LN2;function nc(a){a>>>=0;return 0===a?32:31-(pc(a)/qc|0)|0}var rc=64,sc=4194304;
function tc(a){switch(a&-a){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return a&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return a&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;
default:return a}}function uc(a,b){var c=a.pendingLanes;if(0===c)return 0;var d=0,e=a.suspendedLanes,f=a.pingedLanes,g=c&268435455;if(0!==g){var h=g&~e;0!==h?d=tc(h):(f&=g,0!==f&&(d=tc(f)))}else g=c&~e,0!==g?d=tc(g):0!==f&&(d=tc(f));if(0===d)return 0;if(0!==b&&b!==d&&0===(b&e)&&(e=d&-d,f=b&-b,e>=f||16===e&&0!==(f&4194240)))return b;0!==(d&4)&&(d|=c&16);b=a.entangledLanes;if(0!==b)for(a=a.entanglements,b&=d;0<b;)c=31-oc(b),e=1<<c,d|=a[c],b&=~e;return d}
function vc(a,b){switch(a){case 1:case 2:case 4:return b+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return b+5E3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}
function wc(a,b){for(var c=a.suspendedLanes,d=a.pingedLanes,e=a.expirationTimes,f=a.pendingLanes;0<f;){var g=31-oc(f),h=1<<g,k=e[g];if(-1===k){if(0===(h&c)||0!==(h&d))e[g]=vc(h,b)}else k<=b&&(a.expiredLanes|=h);f&=~h}}function xc(a){a=a.pendingLanes&-1073741825;return 0!==a?a:a&1073741824?1073741824:0}function yc(){var a=rc;rc<<=1;0===(rc&4194240)&&(rc=64);return a}function zc(a){for(var b=[],c=0;31>c;c++)b.push(a);return b}
function Ac(a,b,c){a.pendingLanes|=b;536870912!==b&&(a.suspendedLanes=0,a.pingedLanes=0);a=a.eventTimes;b=31-oc(b);a[b]=c}function Bc(a,b){var c=a.pendingLanes&~b;a.pendingLanes=b;a.suspendedLanes=0;a.pingedLanes=0;a.expiredLanes&=b;a.mutableReadLanes&=b;a.entangledLanes&=b;b=a.entanglements;var d=a.eventTimes;for(a=a.expirationTimes;0<c;){var e=31-oc(c),f=1<<e;b[e]=0;d[e]=-1;a[e]=-1;c&=~f}}
function Cc(a,b){var c=a.entangledLanes|=b;for(a=a.entanglements;c;){var d=31-oc(c),e=1<<d;e&b|a[d]&b&&(a[d]|=b);c&=~e}}var C=0;function Dc(a){a&=-a;return 1<a?4<a?0!==(a&268435455)?16:536870912:4:1}var Ec,Fc,Gc,Hc,Ic,Jc=!1,Kc=[],Lc=null,Mc=null,Nc=null,Oc=new Map,Pc=new Map,Qc=[],Rc="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Sc(a,b){switch(a){case "focusin":case "focusout":Lc=null;break;case "dragenter":case "dragleave":Mc=null;break;case "mouseover":case "mouseout":Nc=null;break;case "pointerover":case "pointerout":Oc.delete(b.pointerId);break;case "gotpointercapture":case "lostpointercapture":Pc.delete(b.pointerId)}}
function Tc(a,b,c,d,e,f){if(null===a||a.nativeEvent!==f)return a={blockedOn:b,domEventName:c,eventSystemFlags:d,nativeEvent:f,targetContainers:[e]},null!==b&&(b=Cb(b),null!==b&&Fc(b)),a;a.eventSystemFlags|=d;b=a.targetContainers;null!==e&&-1===b.indexOf(e)&&b.push(e);return a}
function Uc(a,b,c,d,e){switch(b){case "focusin":return Lc=Tc(Lc,a,b,c,d,e),!0;case "dragenter":return Mc=Tc(Mc,a,b,c,d,e),!0;case "mouseover":return Nc=Tc(Nc,a,b,c,d,e),!0;case "pointerover":var f=e.pointerId;Oc.set(f,Tc(Oc.get(f)||null,a,b,c,d,e));return!0;case "gotpointercapture":return f=e.pointerId,Pc.set(f,Tc(Pc.get(f)||null,a,b,c,d,e)),!0}return!1}
function Vc(a){var b=Wc(a.target);if(null!==b){var c=Vb(b);if(null!==c)if(b=c.tag,13===b){if(b=Wb(c),null!==b){a.blockedOn=b;Ic(a.priority,function(){Gc(c)});return}}else if(3===b&&c.stateNode.current.memoizedState.isDehydrated){a.blockedOn=3===c.tag?c.stateNode.containerInfo:null;return}}a.blockedOn=null}
function Xc(a){if(null!==a.blockedOn)return!1;for(var b=a.targetContainers;0<b.length;){var c=Yc(a.domEventName,a.eventSystemFlags,b[0],a.nativeEvent);if(null===c){c=a.nativeEvent;var d=new c.constructor(c.type,c);wb=d;c.target.dispatchEvent(d);wb=null}else return b=Cb(c),null!==b&&Fc(b),a.blockedOn=c,!1;b.shift()}return!0}function Zc(a,b,c){Xc(a)&&c.delete(b)}function $c(){Jc=!1;null!==Lc&&Xc(Lc)&&(Lc=null);null!==Mc&&Xc(Mc)&&(Mc=null);null!==Nc&&Xc(Nc)&&(Nc=null);Oc.forEach(Zc);Pc.forEach(Zc)}
function ad(a,b){a.blockedOn===b&&(a.blockedOn=null,Jc||(Jc=!0,ca.unstable_scheduleCallback(ca.unstable_NormalPriority,$c)))}
function bd(a){function b(b){return ad(b,a)}if(0<Kc.length){ad(Kc[0],a);for(var c=1;c<Kc.length;c++){var d=Kc[c];d.blockedOn===a&&(d.blockedOn=null)}}null!==Lc&&ad(Lc,a);null!==Mc&&ad(Mc,a);null!==Nc&&ad(Nc,a);Oc.forEach(b);Pc.forEach(b);for(c=0;c<Qc.length;c++)d=Qc[c],d.blockedOn===a&&(d.blockedOn=null);for(;0<Qc.length&&(c=Qc[0],null===c.blockedOn);)Vc(c),null===c.blockedOn&&Qc.shift()}var cd=ua.ReactCurrentBatchConfig,dd=!0;
function ed(a,b,c,d){var e=C,f=cd.transition;cd.transition=null;try{C=1,fd(a,b,c,d)}finally{C=e,cd.transition=f}}function gd(a,b,c,d){var e=C,f=cd.transition;cd.transition=null;try{C=4,fd(a,b,c,d)}finally{C=e,cd.transition=f}}
function fd(a,b,c,d){if(dd){var e=Yc(a,b,c,d);if(null===e)hd(a,b,d,id,c),Sc(a,d);else if(Uc(e,a,b,c,d))d.stopPropagation();else if(Sc(a,d),b&4&&-1<Rc.indexOf(a)){for(;null!==e;){var f=Cb(e);null!==f&&Ec(f);f=Yc(a,b,c,d);null===f&&hd(a,b,d,id,c);if(f===e)break;e=f}null!==e&&d.stopPropagation()}else hd(a,b,d,null,c)}}var id=null;
function Yc(a,b,c,d){id=null;a=xb(d);a=Wc(a);if(null!==a)if(b=Vb(a),null===b)a=null;else if(c=b.tag,13===c){a=Wb(b);if(null!==a)return a;a=null}else if(3===c){if(b.stateNode.current.memoizedState.isDehydrated)return 3===b.tag?b.stateNode.containerInfo:null;a=null}else b!==a&&(a=null);id=a;return null}
function jd(a){switch(a){case "cancel":case "click":case "close":case "contextmenu":case "copy":case "cut":case "auxclick":case "dblclick":case "dragend":case "dragstart":case "drop":case "focusin":case "focusout":case "input":case "invalid":case "keydown":case "keypress":case "keyup":case "mousedown":case "mouseup":case "paste":case "pause":case "play":case "pointercancel":case "pointerdown":case "pointerup":case "ratechange":case "reset":case "resize":case "seeked":case "submit":case "touchcancel":case "touchend":case "touchstart":case "volumechange":case "change":case "selectionchange":case "textInput":case "compositionstart":case "compositionend":case "compositionupdate":case "beforeblur":case "afterblur":case "beforeinput":case "blur":case "fullscreenchange":case "focus":case "hashchange":case "popstate":case "select":case "selectstart":return 1;case "drag":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "mousemove":case "mouseout":case "mouseover":case "pointermove":case "pointerout":case "pointerover":case "scroll":case "toggle":case "touchmove":case "wheel":case "mouseenter":case "mouseleave":case "pointerenter":case "pointerleave":return 4;
case "message":switch(ec()){case fc:return 1;case gc:return 4;case hc:case ic:return 16;case jc:return 536870912;default:return 16}default:return 16}}var kd=null,ld=null,md=null;function nd(){if(md)return md;var a,b=ld,c=b.length,d,e="value"in kd?kd.value:kd.textContent,f=e.length;for(a=0;a<c&&b[a]===e[a];a++);var g=c-a;for(d=1;d<=g&&b[c-d]===e[f-d];d++);return md=e.slice(a,1<d?1-d:void 0)}
function od(a){var b=a.keyCode;"charCode"in a?(a=a.charCode,0===a&&13===b&&(a=13)):a=b;10===a&&(a=13);return 32<=a||13===a?a:0}function pd(){return!0}function qd(){return!1}
function rd(a){function b(b,d,e,f,g){this._reactName=b;this._targetInst=e;this.type=d;this.nativeEvent=f;this.target=g;this.currentTarget=null;for(var c in a)a.hasOwnProperty(c)&&(b=a[c],this[c]=b?b(f):f[c]);this.isDefaultPrevented=(null!=f.defaultPrevented?f.defaultPrevented:!1===f.returnValue)?pd:qd;this.isPropagationStopped=qd;return this}A(b.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():"unknown"!==typeof a.returnValue&&
(a.returnValue=!1),this.isDefaultPrevented=pd)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():"unknown"!==typeof a.cancelBubble&&(a.cancelBubble=!0),this.isPropagationStopped=pd)},persist:function(){},isPersistent:pd});return b}
var sd={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(a){return a.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},td=rd(sd),ud=A({},sd,{view:0,detail:0}),vd=rd(ud),wd,xd,yd,Ad=A({},ud,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:zd,button:0,buttons:0,relatedTarget:function(a){return void 0===a.relatedTarget?a.fromElement===a.srcElement?a.toElement:a.fromElement:a.relatedTarget},movementX:function(a){if("movementX"in
a)return a.movementX;a!==yd&&(yd&&"mousemove"===a.type?(wd=a.screenX-yd.screenX,xd=a.screenY-yd.screenY):xd=wd=0,yd=a);return wd},movementY:function(a){return"movementY"in a?a.movementY:xd}}),Bd=rd(Ad),Cd=A({},Ad,{dataTransfer:0}),Dd=rd(Cd),Ed=A({},ud,{relatedTarget:0}),Fd=rd(Ed),Gd=A({},sd,{animationName:0,elapsedTime:0,pseudoElement:0}),Hd=rd(Gd),Id=A({},sd,{clipboardData:function(a){return"clipboardData"in a?a.clipboardData:window.clipboardData}}),Jd=rd(Id),Kd=A({},sd,{data:0}),Ld=rd(Kd),Md={Esc:"Escape",
Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Nd={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",
119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Od={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Pd(a){var b=this.nativeEvent;return b.getModifierState?b.getModifierState(a):(a=Od[a])?!!b[a]:!1}function zd(){return Pd}
var Qd=A({},ud,{key:function(a){if(a.key){var b=Md[a.key]||a.key;if("Unidentified"!==b)return b}return"keypress"===a.type?(a=od(a),13===a?"Enter":String.fromCharCode(a)):"keydown"===a.type||"keyup"===a.type?Nd[a.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:zd,charCode:function(a){return"keypress"===a.type?od(a):0},keyCode:function(a){return"keydown"===a.type||"keyup"===a.type?a.keyCode:0},which:function(a){return"keypress"===
a.type?od(a):"keydown"===a.type||"keyup"===a.type?a.keyCode:0}}),Rd=rd(Qd),Sd=A({},Ad,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Td=rd(Sd),Ud=A({},ud,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:zd}),Vd=rd(Ud),Wd=A({},sd,{propertyName:0,elapsedTime:0,pseudoElement:0}),Xd=rd(Wd),Yd=A({},Ad,{deltaX:function(a){return"deltaX"in a?a.deltaX:"wheelDeltaX"in a?-a.wheelDeltaX:0},
deltaY:function(a){return"deltaY"in a?a.deltaY:"wheelDeltaY"in a?-a.wheelDeltaY:"wheelDelta"in a?-a.wheelDelta:0},deltaZ:0,deltaMode:0}),Zd=rd(Yd),$d=[9,13,27,32],ae=ia&&"CompositionEvent"in window,be=null;ia&&"documentMode"in document&&(be=document.documentMode);var ce=ia&&"TextEvent"in window&&!be,de=ia&&(!ae||be&&8<be&&11>=be),ee=String.fromCharCode(32),fe=!1;
function ge(a,b){switch(a){case "keyup":return-1!==$d.indexOf(b.keyCode);case "keydown":return 229!==b.keyCode;case "keypress":case "mousedown":case "focusout":return!0;default:return!1}}function he(a){a=a.detail;return"object"===typeof a&&"data"in a?a.data:null}var ie=!1;function je(a,b){switch(a){case "compositionend":return he(b);case "keypress":if(32!==b.which)return null;fe=!0;return ee;case "textInput":return a=b.data,a===ee&&fe?null:a;default:return null}}
function ke(a,b){if(ie)return"compositionend"===a||!ae&&ge(a,b)?(a=nd(),md=ld=kd=null,ie=!1,a):null;switch(a){case "paste":return null;case "keypress":if(!(b.ctrlKey||b.altKey||b.metaKey)||b.ctrlKey&&b.altKey){if(b.char&&1<b.char.length)return b.char;if(b.which)return String.fromCharCode(b.which)}return null;case "compositionend":return de&&"ko"!==b.locale?null:b.data;default:return null}}
var le={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function me(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return"input"===b?!!le[a.type]:"textarea"===b?!0:!1}function ne(a,b,c,d){Eb(d);b=oe(b,"onChange");0<b.length&&(c=new td("onChange","change",null,c,d),a.push({event:c,listeners:b}))}var pe=null,qe=null;function re(a){se(a,0)}function te(a){var b=ue(a);if(Wa(b))return a}
function ve(a,b){if("change"===a)return b}var we=!1;if(ia){var xe;if(ia){var ye="oninput"in document;if(!ye){var ze=document.createElement("div");ze.setAttribute("oninput","return;");ye="function"===typeof ze.oninput}xe=ye}else xe=!1;we=xe&&(!document.documentMode||9<document.documentMode)}function Ae(){pe&&(pe.detachEvent("onpropertychange",Be),qe=pe=null)}function Be(a){if("value"===a.propertyName&&te(qe)){var b=[];ne(b,qe,a,xb(a));Jb(re,b)}}
function Ce(a,b,c){"focusin"===a?(Ae(),pe=b,qe=c,pe.attachEvent("onpropertychange",Be)):"focusout"===a&&Ae()}function De(a){if("selectionchange"===a||"keyup"===a||"keydown"===a)return te(qe)}function Ee(a,b){if("click"===a)return te(b)}function Fe(a,b){if("input"===a||"change"===a)return te(b)}function Ge(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}var He="function"===typeof Object.is?Object.is:Ge;
function Ie(a,b){if(He(a,b))return!0;if("object"!==typeof a||null===a||"object"!==typeof b||null===b)return!1;var c=Object.keys(a),d=Object.keys(b);if(c.length!==d.length)return!1;for(d=0;d<c.length;d++){var e=c[d];if(!ja.call(b,e)||!He(a[e],b[e]))return!1}return!0}function Je(a){for(;a&&a.firstChild;)a=a.firstChild;return a}
function Ke(a,b){var c=Je(a);a=0;for(var d;c;){if(3===c.nodeType){d=a+c.textContent.length;if(a<=b&&d>=b)return{node:c,offset:b-a};a=d}a:{for(;c;){if(c.nextSibling){c=c.nextSibling;break a}c=c.parentNode}c=void 0}c=Je(c)}}function Le(a,b){return a&&b?a===b?!0:a&&3===a.nodeType?!1:b&&3===b.nodeType?Le(a,b.parentNode):"contains"in a?a.contains(b):a.compareDocumentPosition?!!(a.compareDocumentPosition(b)&16):!1:!1}
function Me(){for(var a=window,b=Xa();b instanceof a.HTMLIFrameElement;){try{var c="string"===typeof b.contentWindow.location.href}catch(d){c=!1}if(c)a=b.contentWindow;else break;b=Xa(a.document)}return b}function Ne(a){var b=a&&a.nodeName&&a.nodeName.toLowerCase();return b&&("input"===b&&("text"===a.type||"search"===a.type||"tel"===a.type||"url"===a.type||"password"===a.type)||"textarea"===b||"true"===a.contentEditable)}
function Oe(a){var b=Me(),c=a.focusedElem,d=a.selectionRange;if(b!==c&&c&&c.ownerDocument&&Le(c.ownerDocument.documentElement,c)){if(null!==d&&Ne(c))if(b=d.start,a=d.end,void 0===a&&(a=b),"selectionStart"in c)c.selectionStart=b,c.selectionEnd=Math.min(a,c.value.length);else if(a=(b=c.ownerDocument||document)&&b.defaultView||window,a.getSelection){a=a.getSelection();var e=c.textContent.length,f=Math.min(d.start,e);d=void 0===d.end?f:Math.min(d.end,e);!a.extend&&f>d&&(e=d,d=f,f=e);e=Ke(c,f);var g=Ke(c,
d);e&&g&&(1!==a.rangeCount||a.anchorNode!==e.node||a.anchorOffset!==e.offset||a.focusNode!==g.node||a.focusOffset!==g.offset)&&(b=b.createRange(),b.setStart(e.node,e.offset),a.removeAllRanges(),f>d?(a.addRange(b),a.extend(g.node,g.offset)):(b.setEnd(g.node,g.offset),a.addRange(b)))}b=[];for(a=c;a=a.parentNode;)1===a.nodeType&&b.push({element:a,left:a.scrollLeft,top:a.scrollTop});"function"===typeof c.focus&&c.focus();for(c=0;c<b.length;c++)a=b[c],a.element.scrollLeft=a.left,a.element.scrollTop=a.top}}
var Pe=ia&&"documentMode"in document&&11>=document.documentMode,Qe=null,Re=null,Se=null,Te=!1;
function Ue(a,b,c){var d=c.window===c?c.document:9===c.nodeType?c:c.ownerDocument;Te||null==Qe||Qe!==Xa(d)||(d=Qe,"selectionStart"in d&&Ne(d)?d={start:d.selectionStart,end:d.selectionEnd}:(d=(d.ownerDocument&&d.ownerDocument.defaultView||window).getSelection(),d={anchorNode:d.anchorNode,anchorOffset:d.anchorOffset,focusNode:d.focusNode,focusOffset:d.focusOffset}),Se&&Ie(Se,d)||(Se=d,d=oe(Re,"onSelect"),0<d.length&&(b=new td("onSelect","select",null,b,c),a.push({event:b,listeners:d}),b.target=Qe)))}
function Ve(a,b){var c={};c[a.toLowerCase()]=b.toLowerCase();c["Webkit"+a]="webkit"+b;c["Moz"+a]="moz"+b;return c}var We={animationend:Ve("Animation","AnimationEnd"),animationiteration:Ve("Animation","AnimationIteration"),animationstart:Ve("Animation","AnimationStart"),transitionend:Ve("Transition","TransitionEnd")},Xe={},Ye={};
ia&&(Ye=document.createElement("div").style,"AnimationEvent"in window||(delete We.animationend.animation,delete We.animationiteration.animation,delete We.animationstart.animation),"TransitionEvent"in window||delete We.transitionend.transition);function Ze(a){if(Xe[a])return Xe[a];if(!We[a])return a;var b=We[a],c;for(c in b)if(b.hasOwnProperty(c)&&c in Ye)return Xe[a]=b[c];return a}var $e=Ze("animationend"),af=Ze("animationiteration"),bf=Ze("animationstart"),cf=Ze("transitionend"),df=new Map,ef="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ff(a,b){df.set(a,b);fa(b,[a])}for(var gf=0;gf<ef.length;gf++){var hf=ef[gf],jf=hf.toLowerCase(),kf=hf[0].toUpperCase()+hf.slice(1);ff(jf,"on"+kf)}ff($e,"onAnimationEnd");ff(af,"onAnimationIteration");ff(bf,"onAnimationStart");ff("dblclick","onDoubleClick");ff("focusin","onFocus");ff("focusout","onBlur");ff(cf,"onTransitionEnd");ha("onMouseEnter",["mouseout","mouseover"]);ha("onMouseLeave",["mouseout","mouseover"]);ha("onPointerEnter",["pointerout","pointerover"]);
ha("onPointerLeave",["pointerout","pointerover"]);fa("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));fa("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));fa("onBeforeInput",["compositionend","keypress","textInput","paste"]);fa("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));fa("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var lf="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),mf=new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
function nf(a,b,c){var d=a.type||"unknown-event";a.currentTarget=c;Ub(d,b,void 0,a);a.currentTarget=null}
function se(a,b){b=0!==(b&4);for(var c=0;c<a.length;c++){var d=a[c],e=d.event;d=d.listeners;a:{var f=void 0;if(b)for(var g=d.length-1;0<=g;g--){var h=d[g],k=h.instance,l=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;nf(e,h,l);f=k}else for(g=0;g<d.length;g++){h=d[g];k=h.instance;l=h.currentTarget;h=h.listener;if(k!==f&&e.isPropagationStopped())break a;nf(e,h,l);f=k}}}if(Qb)throw a=Rb,Qb=!1,Rb=null,a;}
function D(a,b){var c=b[of];void 0===c&&(c=b[of]=new Set);var d=a+"__bubble";c.has(d)||(pf(b,a,2,!1),c.add(d))}function qf(a,b,c){var d=0;b&&(d|=4);pf(c,a,d,b)}var rf="_reactListening"+Math.random().toString(36).slice(2);function sf(a){if(!a[rf]){a[rf]=!0;da.forEach(function(b){"selectionchange"!==b&&(mf.has(b)||qf(b,!1,a),qf(b,!0,a))});var b=9===a.nodeType?a:a.ownerDocument;null===b||b[rf]||(b[rf]=!0,qf("selectionchange",!1,b))}}
function pf(a,b,c,d){switch(jd(b)){case 1:var e=ed;break;case 4:e=gd;break;default:e=fd}c=e.bind(null,b,c,a);e=void 0;!Lb||"touchstart"!==b&&"touchmove"!==b&&"wheel"!==b||(e=!0);d?void 0!==e?a.addEventListener(b,c,{capture:!0,passive:e}):a.addEventListener(b,c,!0):void 0!==e?a.addEventListener(b,c,{passive:e}):a.addEventListener(b,c,!1)}
function hd(a,b,c,d,e){var f=d;if(0===(b&1)&&0===(b&2)&&null!==d)a:for(;;){if(null===d)return;var g=d.tag;if(3===g||4===g){var h=d.stateNode.containerInfo;if(h===e||8===h.nodeType&&h.parentNode===e)break;if(4===g)for(g=d.return;null!==g;){var k=g.tag;if(3===k||4===k)if(k=g.stateNode.containerInfo,k===e||8===k.nodeType&&k.parentNode===e)return;g=g.return}for(;null!==h;){g=Wc(h);if(null===g)return;k=g.tag;if(5===k||6===k){d=f=g;continue a}h=h.parentNode}}d=d.return}Jb(function(){var d=f,e=xb(c),g=[];
a:{var h=df.get(a);if(void 0!==h){var k=td,n=a;switch(a){case "keypress":if(0===od(c))break a;case "keydown":case "keyup":k=Rd;break;case "focusin":n="focus";k=Fd;break;case "focusout":n="blur";k=Fd;break;case "beforeblur":case "afterblur":k=Fd;break;case "click":if(2===c.button)break a;case "auxclick":case "dblclick":case "mousedown":case "mousemove":case "mouseup":case "mouseout":case "mouseover":case "contextmenu":k=Bd;break;case "drag":case "dragend":case "dragenter":case "dragexit":case "dragleave":case "dragover":case "dragstart":case "drop":k=
Dd;break;case "touchcancel":case "touchend":case "touchmove":case "touchstart":k=Vd;break;case $e:case af:case bf:k=Hd;break;case cf:k=Xd;break;case "scroll":k=vd;break;case "wheel":k=Zd;break;case "copy":case "cut":case "paste":k=Jd;break;case "gotpointercapture":case "lostpointercapture":case "pointercancel":case "pointerdown":case "pointermove":case "pointerout":case "pointerover":case "pointerup":k=Td}var t=0!==(b&4),J=!t&&"scroll"===a,x=t?null!==h?h+"Capture":null:h;t=[];for(var w=d,u;null!==
w;){u=w;var F=u.stateNode;5===u.tag&&null!==F&&(u=F,null!==x&&(F=Kb(w,x),null!=F&&t.push(tf(w,F,u))));if(J)break;w=w.return}0<t.length&&(h=new k(h,n,null,c,e),g.push({event:h,listeners:t}))}}if(0===(b&7)){a:{h="mouseover"===a||"pointerover"===a;k="mouseout"===a||"pointerout"===a;if(h&&c!==wb&&(n=c.relatedTarget||c.fromElement)&&(Wc(n)||n[uf]))break a;if(k||h){h=e.window===e?e:(h=e.ownerDocument)?h.defaultView||h.parentWindow:window;if(k){if(n=c.relatedTarget||c.toElement,k=d,n=n?Wc(n):null,null!==
n&&(J=Vb(n),n!==J||5!==n.tag&&6!==n.tag))n=null}else k=null,n=d;if(k!==n){t=Bd;F="onMouseLeave";x="onMouseEnter";w="mouse";if("pointerout"===a||"pointerover"===a)t=Td,F="onPointerLeave",x="onPointerEnter",w="pointer";J=null==k?h:ue(k);u=null==n?h:ue(n);h=new t(F,w+"leave",k,c,e);h.target=J;h.relatedTarget=u;F=null;Wc(e)===d&&(t=new t(x,w+"enter",n,c,e),t.target=u,t.relatedTarget=J,F=t);J=F;if(k&&n)b:{t=k;x=n;w=0;for(u=t;u;u=vf(u))w++;u=0;for(F=x;F;F=vf(F))u++;for(;0<w-u;)t=vf(t),w--;for(;0<u-w;)x=
vf(x),u--;for(;w--;){if(t===x||null!==x&&t===x.alternate)break b;t=vf(t);x=vf(x)}t=null}else t=null;null!==k&&wf(g,h,k,t,!1);null!==n&&null!==J&&wf(g,J,n,t,!0)}}}a:{h=d?ue(d):window;k=h.nodeName&&h.nodeName.toLowerCase();if("select"===k||"input"===k&&"file"===h.type)var na=ve;else if(me(h))if(we)na=Fe;else{na=De;var xa=Ce}else(k=h.nodeName)&&"input"===k.toLowerCase()&&("checkbox"===h.type||"radio"===h.type)&&(na=Ee);if(na&&(na=na(a,d))){ne(g,na,c,e);break a}xa&&xa(a,h,d);"focusout"===a&&(xa=h._wrapperState)&&
xa.controlled&&"number"===h.type&&cb(h,"number",h.value)}xa=d?ue(d):window;switch(a){case "focusin":if(me(xa)||"true"===xa.contentEditable)Qe=xa,Re=d,Se=null;break;case "focusout":Se=Re=Qe=null;break;case "mousedown":Te=!0;break;case "contextmenu":case "mouseup":case "dragend":Te=!1;Ue(g,c,e);break;case "selectionchange":if(Pe)break;case "keydown":case "keyup":Ue(g,c,e)}var $a;if(ae)b:{switch(a){case "compositionstart":var ba="onCompositionStart";break b;case "compositionend":ba="onCompositionEnd";
break b;case "compositionupdate":ba="onCompositionUpdate";break b}ba=void 0}else ie?ge(a,c)&&(ba="onCompositionEnd"):"keydown"===a&&229===c.keyCode&&(ba="onCompositionStart");ba&&(de&&"ko"!==c.locale&&(ie||"onCompositionStart"!==ba?"onCompositionEnd"===ba&&ie&&($a=nd()):(kd=e,ld="value"in kd?kd.value:kd.textContent,ie=!0)),xa=oe(d,ba),0<xa.length&&(ba=new Ld(ba,a,null,c,e),g.push({event:ba,listeners:xa}),$a?ba.data=$a:($a=he(c),null!==$a&&(ba.data=$a))));if($a=ce?je(a,c):ke(a,c))d=oe(d,"onBeforeInput"),
0<d.length&&(e=new Ld("onBeforeInput","beforeinput",null,c,e),g.push({event:e,listeners:d}),e.data=$a)}se(g,b)})}function tf(a,b,c){return{instance:a,listener:b,currentTarget:c}}function oe(a,b){for(var c=b+"Capture",d=[];null!==a;){var e=a,f=e.stateNode;5===e.tag&&null!==f&&(e=f,f=Kb(a,c),null!=f&&d.unshift(tf(a,f,e)),f=Kb(a,b),null!=f&&d.push(tf(a,f,e)));a=a.return}return d}function vf(a){if(null===a)return null;do a=a.return;while(a&&5!==a.tag);return a?a:null}
function wf(a,b,c,d,e){for(var f=b._reactName,g=[];null!==c&&c!==d;){var h=c,k=h.alternate,l=h.stateNode;if(null!==k&&k===d)break;5===h.tag&&null!==l&&(h=l,e?(k=Kb(c,f),null!=k&&g.unshift(tf(c,k,h))):e||(k=Kb(c,f),null!=k&&g.push(tf(c,k,h))));c=c.return}0!==g.length&&a.push({event:b,listeners:g})}var xf=/\r\n?/g,yf=/\u0000|\uFFFD/g;function zf(a){return("string"===typeof a?a:""+a).replace(xf,"\n").replace(yf,"")}function Af(a,b,c){b=zf(b);if(zf(a)!==b&&c)throw Error(p(425));}function Bf(){}
var Cf=null,Df=null;function Ef(a,b){return"textarea"===a||"noscript"===a||"string"===typeof b.children||"number"===typeof b.children||"object"===typeof b.dangerouslySetInnerHTML&&null!==b.dangerouslySetInnerHTML&&null!=b.dangerouslySetInnerHTML.__html}
var Ff="function"===typeof setTimeout?setTimeout:void 0,Gf="function"===typeof clearTimeout?clearTimeout:void 0,Hf="function"===typeof Promise?Promise:void 0,Jf="function"===typeof queueMicrotask?queueMicrotask:"undefined"!==typeof Hf?function(a){return Hf.resolve(null).then(a).catch(If)}:Ff;function If(a){setTimeout(function(){throw a;})}
function Kf(a,b){var c=b,d=0;do{var e=c.nextSibling;a.removeChild(c);if(e&&8===e.nodeType)if(c=e.data,"/$"===c){if(0===d){a.removeChild(e);bd(b);return}d--}else"$"!==c&&"$?"!==c&&"$!"!==c||d++;c=e}while(c);bd(b)}function Lf(a){for(;null!=a;a=a.nextSibling){var b=a.nodeType;if(1===b||3===b)break;if(8===b){b=a.data;if("$"===b||"$!"===b||"$?"===b)break;if("/$"===b)return null}}return a}
function Mf(a){a=a.previousSibling;for(var b=0;a;){if(8===a.nodeType){var c=a.data;if("$"===c||"$!"===c||"$?"===c){if(0===b)return a;b--}else"/$"===c&&b++}a=a.previousSibling}return null}var Nf=Math.random().toString(36).slice(2),Of="__reactFiber$"+Nf,Pf="__reactProps$"+Nf,uf="__reactContainer$"+Nf,of="__reactEvents$"+Nf,Qf="__reactListeners$"+Nf,Rf="__reactHandles$"+Nf;
function Wc(a){var b=a[Of];if(b)return b;for(var c=a.parentNode;c;){if(b=c[uf]||c[Of]){c=b.alternate;if(null!==b.child||null!==c&&null!==c.child)for(a=Mf(a);null!==a;){if(c=a[Of])return c;a=Mf(a)}return b}a=c;c=a.parentNode}return null}function Cb(a){a=a[Of]||a[uf];return!a||5!==a.tag&&6!==a.tag&&13!==a.tag&&3!==a.tag?null:a}function ue(a){if(5===a.tag||6===a.tag)return a.stateNode;throw Error(p(33));}function Db(a){return a[Pf]||null}var Sf=[],Tf=-1;function Uf(a){return{current:a}}
function E(a){0>Tf||(a.current=Sf[Tf],Sf[Tf]=null,Tf--)}function G(a,b){Tf++;Sf[Tf]=a.current;a.current=b}var Vf={},H=Uf(Vf),Wf=Uf(!1),Xf=Vf;function Yf(a,b){var c=a.type.contextTypes;if(!c)return Vf;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}
function Zf(a){a=a.childContextTypes;return null!==a&&void 0!==a}function $f(){E(Wf);E(H)}function ag(a,b,c){if(H.current!==Vf)throw Error(p(168));G(H,b);G(Wf,c)}function bg(a,b,c){var d=a.stateNode;b=b.childContextTypes;if("function"!==typeof d.getChildContext)return c;d=d.getChildContext();for(var e in d)if(!(e in b))throw Error(p(108,Ra(a)||"Unknown",e));return A({},c,d)}
function cg(a){a=(a=a.stateNode)&&a.__reactInternalMemoizedMergedChildContext||Vf;Xf=H.current;G(H,a);G(Wf,Wf.current);return!0}function dg(a,b,c){var d=a.stateNode;if(!d)throw Error(p(169));c?(a=bg(a,b,Xf),d.__reactInternalMemoizedMergedChildContext=a,E(Wf),E(H),G(H,a)):E(Wf);G(Wf,c)}var eg=null,fg=!1,gg=!1;function hg(a){null===eg?eg=[a]:eg.push(a)}function ig(a){fg=!0;hg(a)}
function jg(){if(!gg&&null!==eg){gg=!0;var a=0,b=C;try{var c=eg;for(C=1;a<c.length;a++){var d=c[a];do d=d(!0);while(null!==d)}eg=null;fg=!1}catch(e){throw null!==eg&&(eg=eg.slice(a+1)),ac(fc,jg),e;}finally{C=b,gg=!1}}return null}var kg=[],lg=0,mg=null,ng=0,og=[],pg=0,qg=null,rg=1,sg="";function tg(a,b){kg[lg++]=ng;kg[lg++]=mg;mg=a;ng=b}
function ug(a,b,c){og[pg++]=rg;og[pg++]=sg;og[pg++]=qg;qg=a;var d=rg;a=sg;var e=32-oc(d)-1;d&=~(1<<e);c+=1;var f=32-oc(b)+e;if(30<f){var g=e-e%5;f=(d&(1<<g)-1).toString(32);d>>=g;e-=g;rg=1<<32-oc(b)+e|c<<e|d;sg=f+a}else rg=1<<f|c<<e|d,sg=a}function vg(a){null!==a.return&&(tg(a,1),ug(a,1,0))}function wg(a){for(;a===mg;)mg=kg[--lg],kg[lg]=null,ng=kg[--lg],kg[lg]=null;for(;a===qg;)qg=og[--pg],og[pg]=null,sg=og[--pg],og[pg]=null,rg=og[--pg],og[pg]=null}var xg=null,yg=null,I=!1,zg=null;
function Ag(a,b){var c=Bg(5,null,null,0);c.elementType="DELETED";c.stateNode=b;c.return=a;b=a.deletions;null===b?(a.deletions=[c],a.flags|=16):b.push(c)}
function Cg(a,b){switch(a.tag){case 5:var c=a.type;b=1!==b.nodeType||c.toLowerCase()!==b.nodeName.toLowerCase()?null:b;return null!==b?(a.stateNode=b,xg=a,yg=Lf(b.firstChild),!0):!1;case 6:return b=""===a.pendingProps||3!==b.nodeType?null:b,null!==b?(a.stateNode=b,xg=a,yg=null,!0):!1;case 13:return b=8!==b.nodeType?null:b,null!==b?(c=null!==qg?{id:rg,overflow:sg}:null,a.memoizedState={dehydrated:b,treeContext:c,retryLane:1073741824},c=Bg(18,null,null,0),c.stateNode=b,c.return=a,a.child=c,xg=a,yg=
null,!0):!1;default:return!1}}function Dg(a){return 0!==(a.mode&1)&&0===(a.flags&128)}function Eg(a){if(I){var b=yg;if(b){var c=b;if(!Cg(a,b)){if(Dg(a))throw Error(p(418));b=Lf(c.nextSibling);var d=xg;b&&Cg(a,b)?Ag(d,c):(a.flags=a.flags&-4097|2,I=!1,xg=a)}}else{if(Dg(a))throw Error(p(418));a.flags=a.flags&-4097|2;I=!1;xg=a}}}function Fg(a){for(a=a.return;null!==a&&5!==a.tag&&3!==a.tag&&13!==a.tag;)a=a.return;xg=a}
function Gg(a){if(a!==xg)return!1;if(!I)return Fg(a),I=!0,!1;var b;(b=3!==a.tag)&&!(b=5!==a.tag)&&(b=a.type,b="head"!==b&&"body"!==b&&!Ef(a.type,a.memoizedProps));if(b&&(b=yg)){if(Dg(a))throw Hg(),Error(p(418));for(;b;)Ag(a,b),b=Lf(b.nextSibling)}Fg(a);if(13===a.tag){a=a.memoizedState;a=null!==a?a.dehydrated:null;if(!a)throw Error(p(317));a:{a=a.nextSibling;for(b=0;a;){if(8===a.nodeType){var c=a.data;if("/$"===c){if(0===b){yg=Lf(a.nextSibling);break a}b--}else"$"!==c&&"$!"!==c&&"$?"!==c||b++}a=a.nextSibling}yg=
null}}else yg=xg?Lf(a.stateNode.nextSibling):null;return!0}function Hg(){for(var a=yg;a;)a=Lf(a.nextSibling)}function Ig(){yg=xg=null;I=!1}function Jg(a){null===zg?zg=[a]:zg.push(a)}var Kg=ua.ReactCurrentBatchConfig;
function Lg(a,b,c){a=c.ref;if(null!==a&&"function"!==typeof a&&"object"!==typeof a){if(c._owner){c=c._owner;if(c){if(1!==c.tag)throw Error(p(309));var d=c.stateNode}if(!d)throw Error(p(147,a));var e=d,f=""+a;if(null!==b&&null!==b.ref&&"function"===typeof b.ref&&b.ref._stringRef===f)return b.ref;b=function(a){var b=e.refs;null===a?delete b[f]:b[f]=a};b._stringRef=f;return b}if("string"!==typeof a)throw Error(p(284));if(!c._owner)throw Error(p(290,a));}return a}
function Mg(a,b){a=Object.prototype.toString.call(b);throw Error(p(31,"[object Object]"===a?"object with keys {"+Object.keys(b).join(", ")+"}":a));}function Ng(a){var b=a._init;return b(a._payload)}
function Og(a){function b(b,c){if(a){var d=b.deletions;null===d?(b.deletions=[c],b.flags|=16):d.push(c)}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b){a=Pg(a,b);a.index=0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return b.flags|=1048576,c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.flags|=2,c):d;b.flags|=2;return c}function g(b){a&&
null===b.alternate&&(b.flags|=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag)return b=Qg(c,a.mode,d),b.return=a,b;b=e(b,c);b.return=a;return b}function k(a,b,c,d){var f=c.type;if(f===ya)return m(a,b,c.props.children,d,c.key);if(null!==b&&(b.elementType===f||"object"===typeof f&&null!==f&&f.$$typeof===Ha&&Ng(f)===b.type))return d=e(b,c.props),d.ref=Lg(a,b,c),d.return=a,d;d=Rg(c.type,c.key,c.props,null,a.mode,d);d.ref=Lg(a,b,c);d.return=a;return d}function l(a,b,c,d){if(null===b||4!==b.tag||
b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==c.implementation)return b=Sg(c,a.mode,d),b.return=a,b;b=e(b,c.children||[]);b.return=a;return b}function m(a,b,c,d,f){if(null===b||7!==b.tag)return b=Tg(c,a.mode,d,f),b.return=a,b;b=e(b,c);b.return=a;return b}function q(a,b,c){if("string"===typeof b&&""!==b||"number"===typeof b)return b=Qg(""+b,a.mode,c),b.return=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case va:return c=Rg(b.type,b.key,b.props,null,a.mode,c),
c.ref=Lg(a,null,b),c.return=a,c;case wa:return b=Sg(b,a.mode,c),b.return=a,b;case Ha:var d=b._init;return q(a,d(b._payload),c)}if(eb(b)||Ka(b))return b=Tg(b,a.mode,c,null),b.return=a,b;Mg(a,b)}return null}function r(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c&&""!==c||"number"===typeof c)return null!==e?null:h(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case va:return c.key===e?k(a,b,c,d):null;case wa:return c.key===e?l(a,b,c,d):null;case Ha:return e=c._init,r(a,
b,e(c._payload),d)}if(eb(c)||Ka(c))return null!==e?null:m(a,b,c,d,null);Mg(a,c)}return null}function y(a,b,c,d,e){if("string"===typeof d&&""!==d||"number"===typeof d)return a=a.get(c)||null,h(b,a,""+d,e);if("object"===typeof d&&null!==d){switch(d.$$typeof){case va:return a=a.get(null===d.key?c:d.key)||null,k(b,a,d,e);case wa:return a=a.get(null===d.key?c:d.key)||null,l(b,a,d,e);case Ha:var f=d._init;return y(a,b,c,f(d._payload),e)}if(eb(d)||Ka(d))return a=a.get(c)||null,m(b,a,d,e,null);Mg(b,d)}return null}
function n(e,g,h,k){for(var l=null,m=null,u=g,w=g=0,x=null;null!==u&&w<h.length;w++){u.index>w?(x=u,u=null):x=u.sibling;var n=r(e,u,h[w],k);if(null===n){null===u&&(u=x);break}a&&u&&null===n.alternate&&b(e,u);g=f(n,g,w);null===m?l=n:m.sibling=n;m=n;u=x}if(w===h.length)return c(e,u),I&&tg(e,w),l;if(null===u){for(;w<h.length;w++)u=q(e,h[w],k),null!==u&&(g=f(u,g,w),null===m?l=u:m.sibling=u,m=u);I&&tg(e,w);return l}for(u=d(e,u);w<h.length;w++)x=y(u,e,w,h[w],k),null!==x&&(a&&null!==x.alternate&&u.delete(null===
x.key?w:x.key),g=f(x,g,w),null===m?l=x:m.sibling=x,m=x);a&&u.forEach(function(a){return b(e,a)});I&&tg(e,w);return l}function t(e,g,h,k){var l=Ka(h);if("function"!==typeof l)throw Error(p(150));h=l.call(h);if(null==h)throw Error(p(151));for(var u=l=null,m=g,w=g=0,x=null,n=h.next();null!==m&&!n.done;w++,n=h.next()){m.index>w?(x=m,m=null):x=m.sibling;var t=r(e,m,n.value,k);if(null===t){null===m&&(m=x);break}a&&m&&null===t.alternate&&b(e,m);g=f(t,g,w);null===u?l=t:u.sibling=t;u=t;m=x}if(n.done)return c(e,
m),I&&tg(e,w),l;if(null===m){for(;!n.done;w++,n=h.next())n=q(e,n.value,k),null!==n&&(g=f(n,g,w),null===u?l=n:u.sibling=n,u=n);I&&tg(e,w);return l}for(m=d(e,m);!n.done;w++,n=h.next())n=y(m,e,w,n.value,k),null!==n&&(a&&null!==n.alternate&&m.delete(null===n.key?w:n.key),g=f(n,g,w),null===u?l=n:u.sibling=n,u=n);a&&m.forEach(function(a){return b(e,a)});I&&tg(e,w);return l}function J(a,d,f,h){"object"===typeof f&&null!==f&&f.type===ya&&null===f.key&&(f=f.props.children);if("object"===typeof f&&null!==f){switch(f.$$typeof){case va:a:{for(var k=
f.key,l=d;null!==l;){if(l.key===k){k=f.type;if(k===ya){if(7===l.tag){c(a,l.sibling);d=e(l,f.props.children);d.return=a;a=d;break a}}else if(l.elementType===k||"object"===typeof k&&null!==k&&k.$$typeof===Ha&&Ng(k)===l.type){c(a,l.sibling);d=e(l,f.props);d.ref=Lg(a,l,f);d.return=a;a=d;break a}c(a,l);break}else b(a,l);l=l.sibling}f.type===ya?(d=Tg(f.props.children,a.mode,h,f.key),d.return=a,a=d):(h=Rg(f.type,f.key,f.props,null,a.mode,h),h.ref=Lg(a,d,f),h.return=a,a=h)}return g(a);case wa:a:{for(l=f.key;null!==
d;){if(d.key===l)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){c(a,d.sibling);d=e(d,f.children||[]);d.return=a;a=d;break a}else{c(a,d);break}else b(a,d);d=d.sibling}d=Sg(f,a.mode,h);d.return=a;a=d}return g(a);case Ha:return l=f._init,J(a,d,l(f._payload),h)}if(eb(f))return n(a,d,f,h);if(Ka(f))return t(a,d,f,h);Mg(a,f)}return"string"===typeof f&&""!==f||"number"===typeof f?(f=""+f,null!==d&&6===d.tag?(c(a,d.sibling),d=e(d,f),d.return=a,a=d):
(c(a,d),d=Qg(f,a.mode,h),d.return=a,a=d),g(a)):c(a,d)}return J}var Ug=Og(!0),Vg=Og(!1),Wg=Uf(null),Xg=null,Yg=null,Zg=null;function $g(){Zg=Yg=Xg=null}function ah(a){var b=Wg.current;E(Wg);a._currentValue=b}function bh(a,b,c){for(;null!==a;){var d=a.alternate;(a.childLanes&b)!==b?(a.childLanes|=b,null!==d&&(d.childLanes|=b)):null!==d&&(d.childLanes&b)!==b&&(d.childLanes|=b);if(a===c)break;a=a.return}}
function ch(a,b){Xg=a;Zg=Yg=null;a=a.dependencies;null!==a&&null!==a.firstContext&&(0!==(a.lanes&b)&&(dh=!0),a.firstContext=null)}function eh(a){var b=a._currentValue;if(Zg!==a)if(a={context:a,memoizedValue:b,next:null},null===Yg){if(null===Xg)throw Error(p(308));Yg=a;Xg.dependencies={lanes:0,firstContext:a}}else Yg=Yg.next=a;return b}var fh=null;function gh(a){null===fh?fh=[a]:fh.push(a)}
function hh(a,b,c,d){var e=b.interleaved;null===e?(c.next=c,gh(b)):(c.next=e.next,e.next=c);b.interleaved=c;return ih(a,d)}function ih(a,b){a.lanes|=b;var c=a.alternate;null!==c&&(c.lanes|=b);c=a;for(a=a.return;null!==a;)a.childLanes|=b,c=a.alternate,null!==c&&(c.childLanes|=b),c=a,a=a.return;return 3===c.tag?c.stateNode:null}var jh=!1;function kh(a){a.updateQueue={baseState:a.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}
function lh(a,b){a=a.updateQueue;b.updateQueue===a&&(b.updateQueue={baseState:a.baseState,firstBaseUpdate:a.firstBaseUpdate,lastBaseUpdate:a.lastBaseUpdate,shared:a.shared,effects:a.effects})}function mh(a,b){return{eventTime:a,lane:b,tag:0,payload:null,callback:null,next:null}}
function nh(a,b,c){var d=a.updateQueue;if(null===d)return null;d=d.shared;if(0!==(K&2)){var e=d.pending;null===e?b.next=b:(b.next=e.next,e.next=b);d.pending=b;return ih(a,c)}e=d.interleaved;null===e?(b.next=b,gh(d)):(b.next=e.next,e.next=b);d.interleaved=b;return ih(a,c)}function oh(a,b,c){b=b.updateQueue;if(null!==b&&(b=b.shared,0!==(c&4194240))){var d=b.lanes;d&=a.pendingLanes;c|=d;b.lanes=c;Cc(a,c)}}
function ph(a,b){var c=a.updateQueue,d=a.alternate;if(null!==d&&(d=d.updateQueue,c===d)){var e=null,f=null;c=c.firstBaseUpdate;if(null!==c){do{var g={eventTime:c.eventTime,lane:c.lane,tag:c.tag,payload:c.payload,callback:c.callback,next:null};null===f?e=f=g:f=f.next=g;c=c.next}while(null!==c);null===f?e=f=b:f=f.next=b}else e=f=b;c={baseState:d.baseState,firstBaseUpdate:e,lastBaseUpdate:f,shared:d.shared,effects:d.effects};a.updateQueue=c;return}a=c.lastBaseUpdate;null===a?c.firstBaseUpdate=b:a.next=
b;c.lastBaseUpdate=b}
function qh(a,b,c,d){var e=a.updateQueue;jh=!1;var f=e.firstBaseUpdate,g=e.lastBaseUpdate,h=e.shared.pending;if(null!==h){e.shared.pending=null;var k=h,l=k.next;k.next=null;null===g?f=l:g.next=l;g=k;var m=a.alternate;null!==m&&(m=m.updateQueue,h=m.lastBaseUpdate,h!==g&&(null===h?m.firstBaseUpdate=l:h.next=l,m.lastBaseUpdate=k))}if(null!==f){var q=e.baseState;g=0;m=l=k=null;h=f;do{var r=h.lane,y=h.eventTime;if((d&r)===r){null!==m&&(m=m.next={eventTime:y,lane:0,tag:h.tag,payload:h.payload,callback:h.callback,
next:null});a:{var n=a,t=h;r=b;y=c;switch(t.tag){case 1:n=t.payload;if("function"===typeof n){q=n.call(y,q,r);break a}q=n;break a;case 3:n.flags=n.flags&-65537|128;case 0:n=t.payload;r="function"===typeof n?n.call(y,q,r):n;if(null===r||void 0===r)break a;q=A({},q,r);break a;case 2:jh=!0}}null!==h.callback&&0!==h.lane&&(a.flags|=64,r=e.effects,null===r?e.effects=[h]:r.push(h))}else y={eventTime:y,lane:r,tag:h.tag,payload:h.payload,callback:h.callback,next:null},null===m?(l=m=y,k=q):m=m.next=y,g|=r;
h=h.next;if(null===h)if(h=e.shared.pending,null===h)break;else r=h,h=r.next,r.next=null,e.lastBaseUpdate=r,e.shared.pending=null}while(1);null===m&&(k=q);e.baseState=k;e.firstBaseUpdate=l;e.lastBaseUpdate=m;b=e.shared.interleaved;if(null!==b){e=b;do g|=e.lane,e=e.next;while(e!==b)}else null===f&&(e.shared.lanes=0);rh|=g;a.lanes=g;a.memoizedState=q}}
function sh(a,b,c){a=b.effects;b.effects=null;if(null!==a)for(b=0;b<a.length;b++){var d=a[b],e=d.callback;if(null!==e){d.callback=null;d=c;if("function"!==typeof e)throw Error(p(191,e));e.call(d)}}}var th={},uh=Uf(th),vh=Uf(th),wh=Uf(th);function xh(a){if(a===th)throw Error(p(174));return a}
function yh(a,b){G(wh,b);G(vh,a);G(uh,th);a=b.nodeType;switch(a){case 9:case 11:b=(b=b.documentElement)?b.namespaceURI:lb(null,"");break;default:a=8===a?b.parentNode:b,b=a.namespaceURI||null,a=a.tagName,b=lb(b,a)}E(uh);G(uh,b)}function zh(){E(uh);E(vh);E(wh)}function Ah(a){xh(wh.current);var b=xh(uh.current);var c=lb(b,a.type);b!==c&&(G(vh,a),G(uh,c))}function Bh(a){vh.current===a&&(E(uh),E(vh))}var L=Uf(0);
function Ch(a){for(var b=a;null!==b;){if(13===b.tag){var c=b.memoizedState;if(null!==c&&(c=c.dehydrated,null===c||"$?"===c.data||"$!"===c.data))return b}else if(19===b.tag&&void 0!==b.memoizedProps.revealOrder){if(0!==(b.flags&128))return b}else if(null!==b.child){b.child.return=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return null;b=b.return}b.sibling.return=b.return;b=b.sibling}return null}var Dh=[];
function Eh(){for(var a=0;a<Dh.length;a++)Dh[a]._workInProgressVersionPrimary=null;Dh.length=0}var Fh=ua.ReactCurrentDispatcher,Gh=ua.ReactCurrentBatchConfig,Hh=0,M=null,N=null,O=null,Ih=!1,Jh=!1,Kh=0,Lh=0;function P(){throw Error(p(321));}function Mh(a,b){if(null===b)return!1;for(var c=0;c<b.length&&c<a.length;c++)if(!He(a[c],b[c]))return!1;return!0}
function Nh(a,b,c,d,e,f){Hh=f;M=b;b.memoizedState=null;b.updateQueue=null;b.lanes=0;Fh.current=null===a||null===a.memoizedState?Oh:Ph;a=c(d,e);if(Jh){f=0;do{Jh=!1;Kh=0;if(25<=f)throw Error(p(301));f+=1;O=N=null;b.updateQueue=null;Fh.current=Qh;a=c(d,e)}while(Jh)}Fh.current=Rh;b=null!==N&&null!==N.next;Hh=0;O=N=M=null;Ih=!1;if(b)throw Error(p(300));return a}function Sh(){var a=0!==Kh;Kh=0;return a}
function Th(){var a={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};null===O?M.memoizedState=O=a:O=O.next=a;return O}function Uh(){if(null===N){var a=M.alternate;a=null!==a?a.memoizedState:null}else a=N.next;var b=null===O?M.memoizedState:O.next;if(null!==b)O=b,N=a;else{if(null===a)throw Error(p(310));N=a;a={memoizedState:N.memoizedState,baseState:N.baseState,baseQueue:N.baseQueue,queue:N.queue,next:null};null===O?M.memoizedState=O=a:O=O.next=a}return O}
function Vh(a,b){return"function"===typeof b?b(a):b}
function Wh(a){var b=Uh(),c=b.queue;if(null===c)throw Error(p(311));c.lastRenderedReducer=a;var d=N,e=d.baseQueue,f=c.pending;if(null!==f){if(null!==e){var g=e.next;e.next=f.next;f.next=g}d.baseQueue=e=f;c.pending=null}if(null!==e){f=e.next;d=d.baseState;var h=g=null,k=null,l=f;do{var m=l.lane;if((Hh&m)===m)null!==k&&(k=k.next={lane:0,action:l.action,hasEagerState:l.hasEagerState,eagerState:l.eagerState,next:null}),d=l.hasEagerState?l.eagerState:a(d,l.action);else{var q={lane:m,action:l.action,hasEagerState:l.hasEagerState,
eagerState:l.eagerState,next:null};null===k?(h=k=q,g=d):k=k.next=q;M.lanes|=m;rh|=m}l=l.next}while(null!==l&&l!==f);null===k?g=d:k.next=h;He(d,b.memoizedState)||(dh=!0);b.memoizedState=d;b.baseState=g;b.baseQueue=k;c.lastRenderedState=d}a=c.interleaved;if(null!==a){e=a;do f=e.lane,M.lanes|=f,rh|=f,e=e.next;while(e!==a)}else null===e&&(c.lanes=0);return[b.memoizedState,c.dispatch]}
function Xh(a){var b=Uh(),c=b.queue;if(null===c)throw Error(p(311));c.lastRenderedReducer=a;var d=c.dispatch,e=c.pending,f=b.memoizedState;if(null!==e){c.pending=null;var g=e=e.next;do f=a(f,g.action),g=g.next;while(g!==e);He(f,b.memoizedState)||(dh=!0);b.memoizedState=f;null===b.baseQueue&&(b.baseState=f);c.lastRenderedState=f}return[f,d]}function Yh(){}
function Zh(a,b){var c=M,d=Uh(),e=b(),f=!He(d.memoizedState,e);f&&(d.memoizedState=e,dh=!0);d=d.queue;$h(ai.bind(null,c,d,a),[a]);if(d.getSnapshot!==b||f||null!==O&&O.memoizedState.tag&1){c.flags|=2048;bi(9,ci.bind(null,c,d,e,b),void 0,null);if(null===Q)throw Error(p(349));0!==(Hh&30)||di(c,b,e)}return e}function di(a,b,c){a.flags|=16384;a={getSnapshot:b,value:c};b=M.updateQueue;null===b?(b={lastEffect:null,stores:null},M.updateQueue=b,b.stores=[a]):(c=b.stores,null===c?b.stores=[a]:c.push(a))}
function ci(a,b,c,d){b.value=c;b.getSnapshot=d;ei(b)&&fi(a)}function ai(a,b,c){return c(function(){ei(b)&&fi(a)})}function ei(a){var b=a.getSnapshot;a=a.value;try{var c=b();return!He(a,c)}catch(d){return!0}}function fi(a){var b=ih(a,1);null!==b&&gi(b,a,1,-1)}
function hi(a){var b=Th();"function"===typeof a&&(a=a());b.memoizedState=b.baseState=a;a={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Vh,lastRenderedState:a};b.queue=a;a=a.dispatch=ii.bind(null,M,a);return[b.memoizedState,a]}
function bi(a,b,c,d){a={tag:a,create:b,destroy:c,deps:d,next:null};b=M.updateQueue;null===b?(b={lastEffect:null,stores:null},M.updateQueue=b,b.lastEffect=a.next=a):(c=b.lastEffect,null===c?b.lastEffect=a.next=a:(d=c.next,c.next=a,a.next=d,b.lastEffect=a));return a}function ji(){return Uh().memoizedState}function ki(a,b,c,d){var e=Th();M.flags|=a;e.memoizedState=bi(1|b,c,void 0,void 0===d?null:d)}
function li(a,b,c,d){var e=Uh();d=void 0===d?null:d;var f=void 0;if(null!==N){var g=N.memoizedState;f=g.destroy;if(null!==d&&Mh(d,g.deps)){e.memoizedState=bi(b,c,f,d);return}}M.flags|=a;e.memoizedState=bi(1|b,c,f,d)}function mi(a,b){return ki(8390656,8,a,b)}function $h(a,b){return li(2048,8,a,b)}function ni(a,b){return li(4,2,a,b)}function oi(a,b){return li(4,4,a,b)}
function pi(a,b){if("function"===typeof b)return a=a(),b(a),function(){b(null)};if(null!==b&&void 0!==b)return a=a(),b.current=a,function(){b.current=null}}function qi(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return li(4,4,pi.bind(null,b,a),c)}function ri(){}function si(a,b){var c=Uh();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Mh(b,d[1]))return d[0];c.memoizedState=[a,b];return a}
function ti(a,b){var c=Uh();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Mh(b,d[1]))return d[0];a=a();c.memoizedState=[a,b];return a}function ui(a,b,c){if(0===(Hh&21))return a.baseState&&(a.baseState=!1,dh=!0),a.memoizedState=c;He(c,b)||(c=yc(),M.lanes|=c,rh|=c,a.baseState=!0);return b}function vi(a,b){var c=C;C=0!==c&&4>c?c:4;a(!0);var d=Gh.transition;Gh.transition={};try{a(!1),b()}finally{C=c,Gh.transition=d}}function wi(){return Uh().memoizedState}
function xi(a,b,c){var d=yi(a);c={lane:d,action:c,hasEagerState:!1,eagerState:null,next:null};if(zi(a))Ai(b,c);else if(c=hh(a,b,c,d),null!==c){var e=R();gi(c,a,d,e);Bi(c,b,d)}}
function ii(a,b,c){var d=yi(a),e={lane:d,action:c,hasEagerState:!1,eagerState:null,next:null};if(zi(a))Ai(b,e);else{var f=a.alternate;if(0===a.lanes&&(null===f||0===f.lanes)&&(f=b.lastRenderedReducer,null!==f))try{var g=b.lastRenderedState,h=f(g,c);e.hasEagerState=!0;e.eagerState=h;if(He(h,g)){var k=b.interleaved;null===k?(e.next=e,gh(b)):(e.next=k.next,k.next=e);b.interleaved=e;return}}catch(l){}finally{}c=hh(a,b,e,d);null!==c&&(e=R(),gi(c,a,d,e),Bi(c,b,d))}}
function zi(a){var b=a.alternate;return a===M||null!==b&&b===M}function Ai(a,b){Jh=Ih=!0;var c=a.pending;null===c?b.next=b:(b.next=c.next,c.next=b);a.pending=b}function Bi(a,b,c){if(0!==(c&4194240)){var d=b.lanes;d&=a.pendingLanes;c|=d;b.lanes=c;Cc(a,c)}}
var Rh={readContext:eh,useCallback:P,useContext:P,useEffect:P,useImperativeHandle:P,useInsertionEffect:P,useLayoutEffect:P,useMemo:P,useReducer:P,useRef:P,useState:P,useDebugValue:P,useDeferredValue:P,useTransition:P,useMutableSource:P,useSyncExternalStore:P,useId:P,unstable_isNewReconciler:!1},Oh={readContext:eh,useCallback:function(a,b){Th().memoizedState=[a,void 0===b?null:b];return a},useContext:eh,useEffect:mi,useImperativeHandle:function(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return ki(4194308,
4,pi.bind(null,b,a),c)},useLayoutEffect:function(a,b){return ki(4194308,4,a,b)},useInsertionEffect:function(a,b){return ki(4,2,a,b)},useMemo:function(a,b){var c=Th();b=void 0===b?null:b;a=a();c.memoizedState=[a,b];return a},useReducer:function(a,b,c){var d=Th();b=void 0!==c?c(b):b;d.memoizedState=d.baseState=b;a={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:a,lastRenderedState:b};d.queue=a;a=a.dispatch=xi.bind(null,M,a);return[d.memoizedState,a]},useRef:function(a){var b=
Th();a={current:a};return b.memoizedState=a},useState:hi,useDebugValue:ri,useDeferredValue:function(a){return Th().memoizedState=a},useTransition:function(){var a=hi(!1),b=a[0];a=vi.bind(null,a[1]);Th().memoizedState=a;return[b,a]},useMutableSource:function(){},useSyncExternalStore:function(a,b,c){var d=M,e=Th();if(I){if(void 0===c)throw Error(p(407));c=c()}else{c=b();if(null===Q)throw Error(p(349));0!==(Hh&30)||di(d,b,c)}e.memoizedState=c;var f={value:c,getSnapshot:b};e.queue=f;mi(ai.bind(null,d,
f,a),[a]);d.flags|=2048;bi(9,ci.bind(null,d,f,c,b),void 0,null);return c},useId:function(){var a=Th(),b=Q.identifierPrefix;if(I){var c=sg;var d=rg;c=(d&~(1<<32-oc(d)-1)).toString(32)+c;b=":"+b+"R"+c;c=Kh++;0<c&&(b+="H"+c.toString(32));b+=":"}else c=Lh++,b=":"+b+"r"+c.toString(32)+":";return a.memoizedState=b},unstable_isNewReconciler:!1},Ph={readContext:eh,useCallback:si,useContext:eh,useEffect:$h,useImperativeHandle:qi,useInsertionEffect:ni,useLayoutEffect:oi,useMemo:ti,useReducer:Wh,useRef:ji,useState:function(){return Wh(Vh)},
useDebugValue:ri,useDeferredValue:function(a){var b=Uh();return ui(b,N.memoizedState,a)},useTransition:function(){var a=Wh(Vh)[0],b=Uh().memoizedState;return[a,b]},useMutableSource:Yh,useSyncExternalStore:Zh,useId:wi,unstable_isNewReconciler:!1},Qh={readContext:eh,useCallback:si,useContext:eh,useEffect:$h,useImperativeHandle:qi,useInsertionEffect:ni,useLayoutEffect:oi,useMemo:ti,useReducer:Xh,useRef:ji,useState:function(){return Xh(Vh)},useDebugValue:ri,useDeferredValue:function(a){var b=Uh();return null===
N?b.memoizedState=a:ui(b,N.memoizedState,a)},useTransition:function(){var a=Xh(Vh)[0],b=Uh().memoizedState;return[a,b]},useMutableSource:Yh,useSyncExternalStore:Zh,useId:wi,unstable_isNewReconciler:!1};function Ci(a,b){if(a&&a.defaultProps){b=A({},b);a=a.defaultProps;for(var c in a)void 0===b[c]&&(b[c]=a[c]);return b}return b}function Di(a,b,c,d){b=a.memoizedState;c=c(d,b);c=null===c||void 0===c?b:A({},b,c);a.memoizedState=c;0===a.lanes&&(a.updateQueue.baseState=c)}
var Ei={isMounted:function(a){return(a=a._reactInternals)?Vb(a)===a:!1},enqueueSetState:function(a,b,c){a=a._reactInternals;var d=R(),e=yi(a),f=mh(d,e);f.payload=b;void 0!==c&&null!==c&&(f.callback=c);b=nh(a,f,e);null!==b&&(gi(b,a,e,d),oh(b,a,e))},enqueueReplaceState:function(a,b,c){a=a._reactInternals;var d=R(),e=yi(a),f=mh(d,e);f.tag=1;f.payload=b;void 0!==c&&null!==c&&(f.callback=c);b=nh(a,f,e);null!==b&&(gi(b,a,e,d),oh(b,a,e))},enqueueForceUpdate:function(a,b){a=a._reactInternals;var c=R(),d=
yi(a),e=mh(c,d);e.tag=2;void 0!==b&&null!==b&&(e.callback=b);b=nh(a,e,d);null!==b&&(gi(b,a,d,c),oh(b,a,d))}};function Fi(a,b,c,d,e,f,g){a=a.stateNode;return"function"===typeof a.shouldComponentUpdate?a.shouldComponentUpdate(d,f,g):b.prototype&&b.prototype.isPureReactComponent?!Ie(c,d)||!Ie(e,f):!0}
function Gi(a,b,c){var d=!1,e=Vf;var f=b.contextType;"object"===typeof f&&null!==f?f=eh(f):(e=Zf(b)?Xf:H.current,d=b.contextTypes,f=(d=null!==d&&void 0!==d)?Yf(a,e):Vf);b=new b(c,f);a.memoizedState=null!==b.state&&void 0!==b.state?b.state:null;b.updater=Ei;a.stateNode=b;b._reactInternals=a;d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=e,a.__reactInternalMemoizedMaskedChildContext=f);return b}
function Hi(a,b,c,d){a=b.state;"function"===typeof b.componentWillReceiveProps&&b.componentWillReceiveProps(c,d);"function"===typeof b.UNSAFE_componentWillReceiveProps&&b.UNSAFE_componentWillReceiveProps(c,d);b.state!==a&&Ei.enqueueReplaceState(b,b.state,null)}
function Ii(a,b,c,d){var e=a.stateNode;e.props=c;e.state=a.memoizedState;e.refs={};kh(a);var f=b.contextType;"object"===typeof f&&null!==f?e.context=eh(f):(f=Zf(b)?Xf:H.current,e.context=Yf(a,f));e.state=a.memoizedState;f=b.getDerivedStateFromProps;"function"===typeof f&&(Di(a,b,f,c),e.state=a.memoizedState);"function"===typeof b.getDerivedStateFromProps||"function"===typeof e.getSnapshotBeforeUpdate||"function"!==typeof e.UNSAFE_componentWillMount&&"function"!==typeof e.componentWillMount||(b=e.state,
"function"===typeof e.componentWillMount&&e.componentWillMount(),"function"===typeof e.UNSAFE_componentWillMount&&e.UNSAFE_componentWillMount(),b!==e.state&&Ei.enqueueReplaceState(e,e.state,null),qh(a,c,e,d),e.state=a.memoizedState);"function"===typeof e.componentDidMount&&(a.flags|=4194308)}function Ji(a,b){try{var c="",d=b;do c+=Pa(d),d=d.return;while(d);var e=c}catch(f){e="\nError generating stack: "+f.message+"\n"+f.stack}return{value:a,source:b,stack:e,digest:null}}
function Ki(a,b,c){return{value:a,source:null,stack:null!=c?c:null,digest:null!=b?b:null}}function Li(a,b){try{console.error(b.value)}catch(c){setTimeout(function(){throw c;})}}var Mi="function"===typeof WeakMap?WeakMap:Map;function Ni(a,b,c){c=mh(-1,c);c.tag=3;c.payload={element:null};var d=b.value;c.callback=function(){Oi||(Oi=!0,Pi=d);Li(a,b)};return c}
function Qi(a,b,c){c=mh(-1,c);c.tag=3;var d=a.type.getDerivedStateFromError;if("function"===typeof d){var e=b.value;c.payload=function(){return d(e)};c.callback=function(){Li(a,b)}}var f=a.stateNode;null!==f&&"function"===typeof f.componentDidCatch&&(c.callback=function(){Li(a,b);"function"!==typeof d&&(null===Ri?Ri=new Set([this]):Ri.add(this));var c=b.stack;this.componentDidCatch(b.value,{componentStack:null!==c?c:""})});return c}
function Si(a,b,c){var d=a.pingCache;if(null===d){d=a.pingCache=new Mi;var e=new Set;d.set(b,e)}else e=d.get(b),void 0===e&&(e=new Set,d.set(b,e));e.has(c)||(e.add(c),a=Ti.bind(null,a,b,c),b.then(a,a))}function Ui(a){do{var b;if(b=13===a.tag)b=a.memoizedState,b=null!==b?null!==b.dehydrated?!0:!1:!0;if(b)return a;a=a.return}while(null!==a);return null}
function Vi(a,b,c,d,e){if(0===(a.mode&1))return a===b?a.flags|=65536:(a.flags|=128,c.flags|=131072,c.flags&=-52805,1===c.tag&&(null===c.alternate?c.tag=17:(b=mh(-1,1),b.tag=2,nh(c,b,1))),c.lanes|=1),a;a.flags|=65536;a.lanes=e;return a}var Wi=ua.ReactCurrentOwner,dh=!1;function Xi(a,b,c,d){b.child=null===a?Vg(b,null,c,d):Ug(b,a.child,c,d)}
function Yi(a,b,c,d,e){c=c.render;var f=b.ref;ch(b,e);d=Nh(a,b,c,d,f,e);c=Sh();if(null!==a&&!dh)return b.updateQueue=a.updateQueue,b.flags&=-2053,a.lanes&=~e,Zi(a,b,e);I&&c&&vg(b);b.flags|=1;Xi(a,b,d,e);return b.child}
function $i(a,b,c,d,e){if(null===a){var f=c.type;if("function"===typeof f&&!aj(f)&&void 0===f.defaultProps&&null===c.compare&&void 0===c.defaultProps)return b.tag=15,b.type=f,bj(a,b,f,d,e);a=Rg(c.type,null,d,b,b.mode,e);a.ref=b.ref;a.return=b;return b.child=a}f=a.child;if(0===(a.lanes&e)){var g=f.memoizedProps;c=c.compare;c=null!==c?c:Ie;if(c(g,d)&&a.ref===b.ref)return Zi(a,b,e)}b.flags|=1;a=Pg(f,d);a.ref=b.ref;a.return=b;return b.child=a}
function bj(a,b,c,d,e){if(null!==a){var f=a.memoizedProps;if(Ie(f,d)&&a.ref===b.ref)if(dh=!1,b.pendingProps=d=f,0!==(a.lanes&e))0!==(a.flags&131072)&&(dh=!0);else return b.lanes=a.lanes,Zi(a,b,e)}return cj(a,b,c,d,e)}
function dj(a,b,c){var d=b.pendingProps,e=d.children,f=null!==a?a.memoizedState:null;if("hidden"===d.mode)if(0===(b.mode&1))b.memoizedState={baseLanes:0,cachePool:null,transitions:null},G(ej,fj),fj|=c;else{if(0===(c&1073741824))return a=null!==f?f.baseLanes|c:c,b.lanes=b.childLanes=1073741824,b.memoizedState={baseLanes:a,cachePool:null,transitions:null},b.updateQueue=null,G(ej,fj),fj|=a,null;b.memoizedState={baseLanes:0,cachePool:null,transitions:null};d=null!==f?f.baseLanes:c;G(ej,fj);fj|=d}else null!==
f?(d=f.baseLanes|c,b.memoizedState=null):d=c,G(ej,fj),fj|=d;Xi(a,b,e,c);return b.child}function gj(a,b){var c=b.ref;if(null===a&&null!==c||null!==a&&a.ref!==c)b.flags|=512,b.flags|=2097152}function cj(a,b,c,d,e){var f=Zf(c)?Xf:H.current;f=Yf(b,f);ch(b,e);c=Nh(a,b,c,d,f,e);d=Sh();if(null!==a&&!dh)return b.updateQueue=a.updateQueue,b.flags&=-2053,a.lanes&=~e,Zi(a,b,e);I&&d&&vg(b);b.flags|=1;Xi(a,b,c,e);return b.child}
function hj(a,b,c,d,e){if(Zf(c)){var f=!0;cg(b)}else f=!1;ch(b,e);if(null===b.stateNode)ij(a,b),Gi(b,c,d),Ii(b,c,d,e),d=!0;else if(null===a){var g=b.stateNode,h=b.memoizedProps;g.props=h;var k=g.context,l=c.contextType;"object"===typeof l&&null!==l?l=eh(l):(l=Zf(c)?Xf:H.current,l=Yf(b,l));var m=c.getDerivedStateFromProps,q="function"===typeof m||"function"===typeof g.getSnapshotBeforeUpdate;q||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||
(h!==d||k!==l)&&Hi(b,g,d,l);jh=!1;var r=b.memoizedState;g.state=r;qh(b,d,g,e);k=b.memoizedState;h!==d||r!==k||Wf.current||jh?("function"===typeof m&&(Di(b,c,m,d),k=b.memoizedState),(h=jh||Fi(b,c,h,d,r,k,l))?(q||"function"!==typeof g.UNSAFE_componentWillMount&&"function"!==typeof g.componentWillMount||("function"===typeof g.componentWillMount&&g.componentWillMount(),"function"===typeof g.UNSAFE_componentWillMount&&g.UNSAFE_componentWillMount()),"function"===typeof g.componentDidMount&&(b.flags|=4194308)):
("function"===typeof g.componentDidMount&&(b.flags|=4194308),b.memoizedProps=d,b.memoizedState=k),g.props=d,g.state=k,g.context=l,d=h):("function"===typeof g.componentDidMount&&(b.flags|=4194308),d=!1)}else{g=b.stateNode;lh(a,b);h=b.memoizedProps;l=b.type===b.elementType?h:Ci(b.type,h);g.props=l;q=b.pendingProps;r=g.context;k=c.contextType;"object"===typeof k&&null!==k?k=eh(k):(k=Zf(c)?Xf:H.current,k=Yf(b,k));var y=c.getDerivedStateFromProps;(m="function"===typeof y||"function"===typeof g.getSnapshotBeforeUpdate)||
"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==q||r!==k)&&Hi(b,g,d,k);jh=!1;r=b.memoizedState;g.state=r;qh(b,d,g,e);var n=b.memoizedState;h!==q||r!==n||Wf.current||jh?("function"===typeof y&&(Di(b,c,y,d),n=b.memoizedState),(l=jh||Fi(b,c,l,d,r,n,k)||!1)?(m||"function"!==typeof g.UNSAFE_componentWillUpdate&&"function"!==typeof g.componentWillUpdate||("function"===typeof g.componentWillUpdate&&g.componentWillUpdate(d,n,k),"function"===typeof g.UNSAFE_componentWillUpdate&&
g.UNSAFE_componentWillUpdate(d,n,k)),"function"===typeof g.componentDidUpdate&&(b.flags|=4),"function"===typeof g.getSnapshotBeforeUpdate&&(b.flags|=1024)):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=1024),b.memoizedProps=d,b.memoizedState=n),g.props=d,g.state=n,g.context=k,d=l):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&r===
a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&r===a.memoizedState||(b.flags|=1024),d=!1)}return jj(a,b,c,d,f,e)}
function jj(a,b,c,d,e,f){gj(a,b);var g=0!==(b.flags&128);if(!d&&!g)return e&&dg(b,c,!1),Zi(a,b,f);d=b.stateNode;Wi.current=b;var h=g&&"function"!==typeof c.getDerivedStateFromError?null:d.render();b.flags|=1;null!==a&&g?(b.child=Ug(b,a.child,null,f),b.child=Ug(b,null,h,f)):Xi(a,b,h,f);b.memoizedState=d.state;e&&dg(b,c,!0);return b.child}function kj(a){var b=a.stateNode;b.pendingContext?ag(a,b.pendingContext,b.pendingContext!==b.context):b.context&&ag(a,b.context,!1);yh(a,b.containerInfo)}
function lj(a,b,c,d,e){Ig();Jg(e);b.flags|=256;Xi(a,b,c,d);return b.child}var mj={dehydrated:null,treeContext:null,retryLane:0};function nj(a){return{baseLanes:a,cachePool:null,transitions:null}}
function oj(a,b,c){var d=b.pendingProps,e=L.current,f=!1,g=0!==(b.flags&128),h;(h=g)||(h=null!==a&&null===a.memoizedState?!1:0!==(e&2));if(h)f=!0,b.flags&=-129;else if(null===a||null!==a.memoizedState)e|=1;G(L,e&1);if(null===a){Eg(b);a=b.memoizedState;if(null!==a&&(a=a.dehydrated,null!==a))return 0===(b.mode&1)?b.lanes=1:"$!"===a.data?b.lanes=8:b.lanes=1073741824,null;g=d.children;a=d.fallback;return f?(d=b.mode,f=b.child,g={mode:"hidden",children:g},0===(d&1)&&null!==f?(f.childLanes=0,f.pendingProps=
g):f=pj(g,d,0,null),a=Tg(a,d,c,null),f.return=b,a.return=b,f.sibling=a,b.child=f,b.child.memoizedState=nj(c),b.memoizedState=mj,a):qj(b,g)}e=a.memoizedState;if(null!==e&&(h=e.dehydrated,null!==h))return rj(a,b,g,d,h,e,c);if(f){f=d.fallback;g=b.mode;e=a.child;h=e.sibling;var k={mode:"hidden",children:d.children};0===(g&1)&&b.child!==e?(d=b.child,d.childLanes=0,d.pendingProps=k,b.deletions=null):(d=Pg(e,k),d.subtreeFlags=e.subtreeFlags&14680064);null!==h?f=Pg(h,f):(f=Tg(f,g,c,null),f.flags|=2);f.return=
b;d.return=b;d.sibling=f;b.child=d;d=f;f=b.child;g=a.child.memoizedState;g=null===g?nj(c):{baseLanes:g.baseLanes|c,cachePool:null,transitions:g.transitions};f.memoizedState=g;f.childLanes=a.childLanes&~c;b.memoizedState=mj;return d}f=a.child;a=f.sibling;d=Pg(f,{mode:"visible",children:d.children});0===(b.mode&1)&&(d.lanes=c);d.return=b;d.sibling=null;null!==a&&(c=b.deletions,null===c?(b.deletions=[a],b.flags|=16):c.push(a));b.child=d;b.memoizedState=null;return d}
function qj(a,b){b=pj({mode:"visible",children:b},a.mode,0,null);b.return=a;return a.child=b}function sj(a,b,c,d){null!==d&&Jg(d);Ug(b,a.child,null,c);a=qj(b,b.pendingProps.children);a.flags|=2;b.memoizedState=null;return a}
function rj(a,b,c,d,e,f,g){if(c){if(b.flags&256)return b.flags&=-257,d=Ki(Error(p(422))),sj(a,b,g,d);if(null!==b.memoizedState)return b.child=a.child,b.flags|=128,null;f=d.fallback;e=b.mode;d=pj({mode:"visible",children:d.children},e,0,null);f=Tg(f,e,g,null);f.flags|=2;d.return=b;f.return=b;d.sibling=f;b.child=d;0!==(b.mode&1)&&Ug(b,a.child,null,g);b.child.memoizedState=nj(g);b.memoizedState=mj;return f}if(0===(b.mode&1))return sj(a,b,g,null);if("$!"===e.data){d=e.nextSibling&&e.nextSibling.dataset;
if(d)var h=d.dgst;d=h;f=Error(p(419));d=Ki(f,d,void 0);return sj(a,b,g,d)}h=0!==(g&a.childLanes);if(dh||h){d=Q;if(null!==d){switch(g&-g){case 4:e=2;break;case 16:e=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:e=32;break;case 536870912:e=268435456;break;default:e=0}e=0!==(e&(d.suspendedLanes|g))?0:e;
0!==e&&e!==f.retryLane&&(f.retryLane=e,ih(a,e),gi(d,a,e,-1))}tj();d=Ki(Error(p(421)));return sj(a,b,g,d)}if("$?"===e.data)return b.flags|=128,b.child=a.child,b=uj.bind(null,a),e._reactRetry=b,null;a=f.treeContext;yg=Lf(e.nextSibling);xg=b;I=!0;zg=null;null!==a&&(og[pg++]=rg,og[pg++]=sg,og[pg++]=qg,rg=a.id,sg=a.overflow,qg=b);b=qj(b,d.children);b.flags|=4096;return b}function vj(a,b,c){a.lanes|=b;var d=a.alternate;null!==d&&(d.lanes|=b);bh(a.return,b,c)}
function wj(a,b,c,d,e){var f=a.memoizedState;null===f?a.memoizedState={isBackwards:b,rendering:null,renderingStartTime:0,last:d,tail:c,tailMode:e}:(f.isBackwards=b,f.rendering=null,f.renderingStartTime=0,f.last=d,f.tail=c,f.tailMode=e)}
function xj(a,b,c){var d=b.pendingProps,e=d.revealOrder,f=d.tail;Xi(a,b,d.children,c);d=L.current;if(0!==(d&2))d=d&1|2,b.flags|=128;else{if(null!==a&&0!==(a.flags&128))a:for(a=b.child;null!==a;){if(13===a.tag)null!==a.memoizedState&&vj(a,c,b);else if(19===a.tag)vj(a,c,b);else if(null!==a.child){a.child.return=a;a=a.child;continue}if(a===b)break a;for(;null===a.sibling;){if(null===a.return||a.return===b)break a;a=a.return}a.sibling.return=a.return;a=a.sibling}d&=1}G(L,d);if(0===(b.mode&1))b.memoizedState=
null;else switch(e){case "forwards":c=b.child;for(e=null;null!==c;)a=c.alternate,null!==a&&null===Ch(a)&&(e=c),c=c.sibling;c=e;null===c?(e=b.child,b.child=null):(e=c.sibling,c.sibling=null);wj(b,!1,e,c,f);break;case "backwards":c=null;e=b.child;for(b.child=null;null!==e;){a=e.alternate;if(null!==a&&null===Ch(a)){b.child=e;break}a=e.sibling;e.sibling=c;c=e;e=a}wj(b,!0,c,null,f);break;case "together":wj(b,!1,null,null,void 0);break;default:b.memoizedState=null}return b.child}
function ij(a,b){0===(b.mode&1)&&null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2)}function Zi(a,b,c){null!==a&&(b.dependencies=a.dependencies);rh|=b.lanes;if(0===(c&b.childLanes))return null;if(null!==a&&b.child!==a.child)throw Error(p(153));if(null!==b.child){a=b.child;c=Pg(a,a.pendingProps);b.child=c;for(c.return=b;null!==a.sibling;)a=a.sibling,c=c.sibling=Pg(a,a.pendingProps),c.return=b;c.sibling=null}return b.child}
function yj(a,b,c){switch(b.tag){case 3:kj(b);Ig();break;case 5:Ah(b);break;case 1:Zf(b.type)&&cg(b);break;case 4:yh(b,b.stateNode.containerInfo);break;case 10:var d=b.type._context,e=b.memoizedProps.value;G(Wg,d._currentValue);d._currentValue=e;break;case 13:d=b.memoizedState;if(null!==d){if(null!==d.dehydrated)return G(L,L.current&1),b.flags|=128,null;if(0!==(c&b.child.childLanes))return oj(a,b,c);G(L,L.current&1);a=Zi(a,b,c);return null!==a?a.sibling:null}G(L,L.current&1);break;case 19:d=0!==(c&
b.childLanes);if(0!==(a.flags&128)){if(d)return xj(a,b,c);b.flags|=128}e=b.memoizedState;null!==e&&(e.rendering=null,e.tail=null,e.lastEffect=null);G(L,L.current);if(d)break;else return null;case 22:case 23:return b.lanes=0,dj(a,b,c)}return Zi(a,b,c)}var zj,Aj,Bj,Cj;
zj=function(a,b){for(var c=b.child;null!==c;){if(5===c.tag||6===c.tag)a.appendChild(c.stateNode);else if(4!==c.tag&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return}c.sibling.return=c.return;c=c.sibling}};Aj=function(){};
Bj=function(a,b,c,d){var e=a.memoizedProps;if(e!==d){a=b.stateNode;xh(uh.current);var f=null;switch(c){case "input":e=Ya(a,e);d=Ya(a,d);f=[];break;case "select":e=A({},e,{value:void 0});d=A({},d,{value:void 0});f=[];break;case "textarea":e=gb(a,e);d=gb(a,d);f=[];break;default:"function"!==typeof e.onClick&&"function"===typeof d.onClick&&(a.onclick=Bf)}ub(c,d);var g;c=null;for(l in e)if(!d.hasOwnProperty(l)&&e.hasOwnProperty(l)&&null!=e[l])if("style"===l){var h=e[l];for(g in h)h.hasOwnProperty(g)&&
(c||(c={}),c[g]="")}else"dangerouslySetInnerHTML"!==l&&"children"!==l&&"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&"autoFocus"!==l&&(ea.hasOwnProperty(l)?f||(f=[]):(f=f||[]).push(l,null));for(l in d){var k=d[l];h=null!=e?e[l]:void 0;if(d.hasOwnProperty(l)&&k!==h&&(null!=k||null!=h))if("style"===l)if(h){for(g in h)!h.hasOwnProperty(g)||k&&k.hasOwnProperty(g)||(c||(c={}),c[g]="");for(g in k)k.hasOwnProperty(g)&&h[g]!==k[g]&&(c||(c={}),c[g]=k[g])}else c||(f||(f=[]),f.push(l,
c)),c=k;else"dangerouslySetInnerHTML"===l?(k=k?k.__html:void 0,h=h?h.__html:void 0,null!=k&&h!==k&&(f=f||[]).push(l,k)):"children"===l?"string"!==typeof k&&"number"!==typeof k||(f=f||[]).push(l,""+k):"suppressContentEditableWarning"!==l&&"suppressHydrationWarning"!==l&&(ea.hasOwnProperty(l)?(null!=k&&"onScroll"===l&&D("scroll",a),f||h===k||(f=[])):(f=f||[]).push(l,k))}c&&(f=f||[]).push("style",c);var l=f;if(b.updateQueue=l)b.flags|=4}};Cj=function(a,b,c,d){c!==d&&(b.flags|=4)};
function Dj(a,b){if(!I)switch(a.tailMode){case "hidden":b=a.tail;for(var c=null;null!==b;)null!==b.alternate&&(c=b),b=b.sibling;null===c?a.tail=null:c.sibling=null;break;case "collapsed":c=a.tail;for(var d=null;null!==c;)null!==c.alternate&&(d=c),c=c.sibling;null===d?b||null===a.tail?a.tail=null:a.tail.sibling=null:d.sibling=null}}
function S(a){var b=null!==a.alternate&&a.alternate.child===a.child,c=0,d=0;if(b)for(var e=a.child;null!==e;)c|=e.lanes|e.childLanes,d|=e.subtreeFlags&14680064,d|=e.flags&14680064,e.return=a,e=e.sibling;else for(e=a.child;null!==e;)c|=e.lanes|e.childLanes,d|=e.subtreeFlags,d|=e.flags,e.return=a,e=e.sibling;a.subtreeFlags|=d;a.childLanes=c;return b}
function Ej(a,b,c){var d=b.pendingProps;wg(b);switch(b.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return S(b),null;case 1:return Zf(b.type)&&$f(),S(b),null;case 3:d=b.stateNode;zh();E(Wf);E(H);Eh();d.pendingContext&&(d.context=d.pendingContext,d.pendingContext=null);if(null===a||null===a.child)Gg(b)?b.flags|=4:null===a||a.memoizedState.isDehydrated&&0===(b.flags&256)||(b.flags|=1024,null!==zg&&(Fj(zg),zg=null));Aj(a,b);S(b);return null;case 5:Bh(b);var e=xh(wh.current);
c=b.type;if(null!==a&&null!=b.stateNode)Bj(a,b,c,d,e),a.ref!==b.ref&&(b.flags|=512,b.flags|=2097152);else{if(!d){if(null===b.stateNode)throw Error(p(166));S(b);return null}a=xh(uh.current);if(Gg(b)){d=b.stateNode;c=b.type;var f=b.memoizedProps;d[Of]=b;d[Pf]=f;a=0!==(b.mode&1);switch(c){case "dialog":D("cancel",d);D("close",d);break;case "iframe":case "object":case "embed":D("load",d);break;case "video":case "audio":for(e=0;e<lf.length;e++)D(lf[e],d);break;case "source":D("error",d);break;case "img":case "image":case "link":D("error",
d);D("load",d);break;case "details":D("toggle",d);break;case "input":Za(d,f);D("invalid",d);break;case "select":d._wrapperState={wasMultiple:!!f.multiple};D("invalid",d);break;case "textarea":hb(d,f),D("invalid",d)}ub(c,f);e=null;for(var g in f)if(f.hasOwnProperty(g)){var h=f[g];"children"===g?"string"===typeof h?d.textContent!==h&&(!0!==f.suppressHydrationWarning&&Af(d.textContent,h,a),e=["children",h]):"number"===typeof h&&d.textContent!==""+h&&(!0!==f.suppressHydrationWarning&&Af(d.textContent,
h,a),e=["children",""+h]):ea.hasOwnProperty(g)&&null!=h&&"onScroll"===g&&D("scroll",d)}switch(c){case "input":Va(d);db(d,f,!0);break;case "textarea":Va(d);jb(d);break;case "select":case "option":break;default:"function"===typeof f.onClick&&(d.onclick=Bf)}d=e;b.updateQueue=d;null!==d&&(b.flags|=4)}else{g=9===e.nodeType?e:e.ownerDocument;"http://www.w3.org/1999/xhtml"===a&&(a=kb(c));"http://www.w3.org/1999/xhtml"===a?"script"===c?(a=g.createElement("div"),a.innerHTML="<script>\x3c/script>",a=a.removeChild(a.firstChild)):
"string"===typeof d.is?a=g.createElement(c,{is:d.is}):(a=g.createElement(c),"select"===c&&(g=a,d.multiple?g.multiple=!0:d.size&&(g.size=d.size))):a=g.createElementNS(a,c);a[Of]=b;a[Pf]=d;zj(a,b,!1,!1);b.stateNode=a;a:{g=vb(c,d);switch(c){case "dialog":D("cancel",a);D("close",a);e=d;break;case "iframe":case "object":case "embed":D("load",a);e=d;break;case "video":case "audio":for(e=0;e<lf.length;e++)D(lf[e],a);e=d;break;case "source":D("error",a);e=d;break;case "img":case "image":case "link":D("error",
a);D("load",a);e=d;break;case "details":D("toggle",a);e=d;break;case "input":Za(a,d);e=Ya(a,d);D("invalid",a);break;case "option":e=d;break;case "select":a._wrapperState={wasMultiple:!!d.multiple};e=A({},d,{value:void 0});D("invalid",a);break;case "textarea":hb(a,d);e=gb(a,d);D("invalid",a);break;default:e=d}ub(c,e);h=e;for(f in h)if(h.hasOwnProperty(f)){var k=h[f];"style"===f?sb(a,k):"dangerouslySetInnerHTML"===f?(k=k?k.__html:void 0,null!=k&&nb(a,k)):"children"===f?"string"===typeof k?("textarea"!==
c||""!==k)&&ob(a,k):"number"===typeof k&&ob(a,""+k):"suppressContentEditableWarning"!==f&&"suppressHydrationWarning"!==f&&"autoFocus"!==f&&(ea.hasOwnProperty(f)?null!=k&&"onScroll"===f&&D("scroll",a):null!=k&&ta(a,f,k,g))}switch(c){case "input":Va(a);db(a,d,!1);break;case "textarea":Va(a);jb(a);break;case "option":null!=d.value&&a.setAttribute("value",""+Sa(d.value));break;case "select":a.multiple=!!d.multiple;f=d.value;null!=f?fb(a,!!d.multiple,f,!1):null!=d.defaultValue&&fb(a,!!d.multiple,d.defaultValue,
!0);break;default:"function"===typeof e.onClick&&(a.onclick=Bf)}switch(c){case "button":case "input":case "select":case "textarea":d=!!d.autoFocus;break a;case "img":d=!0;break a;default:d=!1}}d&&(b.flags|=4)}null!==b.ref&&(b.flags|=512,b.flags|=2097152)}S(b);return null;case 6:if(a&&null!=b.stateNode)Cj(a,b,a.memoizedProps,d);else{if("string"!==typeof d&&null===b.stateNode)throw Error(p(166));c=xh(wh.current);xh(uh.current);if(Gg(b)){d=b.stateNode;c=b.memoizedProps;d[Of]=b;if(f=d.nodeValue!==c)if(a=
xg,null!==a)switch(a.tag){case 3:Af(d.nodeValue,c,0!==(a.mode&1));break;case 5:!0!==a.memoizedProps.suppressHydrationWarning&&Af(d.nodeValue,c,0!==(a.mode&1))}f&&(b.flags|=4)}else d=(9===c.nodeType?c:c.ownerDocument).createTextNode(d),d[Of]=b,b.stateNode=d}S(b);return null;case 13:E(L);d=b.memoizedState;if(null===a||null!==a.memoizedState&&null!==a.memoizedState.dehydrated){if(I&&null!==yg&&0!==(b.mode&1)&&0===(b.flags&128))Hg(),Ig(),b.flags|=98560,f=!1;else if(f=Gg(b),null!==d&&null!==d.dehydrated){if(null===
a){if(!f)throw Error(p(318));f=b.memoizedState;f=null!==f?f.dehydrated:null;if(!f)throw Error(p(317));f[Of]=b}else Ig(),0===(b.flags&128)&&(b.memoizedState=null),b.flags|=4;S(b);f=!1}else null!==zg&&(Fj(zg),zg=null),f=!0;if(!f)return b.flags&65536?b:null}if(0!==(b.flags&128))return b.lanes=c,b;d=null!==d;d!==(null!==a&&null!==a.memoizedState)&&d&&(b.child.flags|=8192,0!==(b.mode&1)&&(null===a||0!==(L.current&1)?0===T&&(T=3):tj()));null!==b.updateQueue&&(b.flags|=4);S(b);return null;case 4:return zh(),
Aj(a,b),null===a&&sf(b.stateNode.containerInfo),S(b),null;case 10:return ah(b.type._context),S(b),null;case 17:return Zf(b.type)&&$f(),S(b),null;case 19:E(L);f=b.memoizedState;if(null===f)return S(b),null;d=0!==(b.flags&128);g=f.rendering;if(null===g)if(d)Dj(f,!1);else{if(0!==T||null!==a&&0!==(a.flags&128))for(a=b.child;null!==a;){g=Ch(a);if(null!==g){b.flags|=128;Dj(f,!1);d=g.updateQueue;null!==d&&(b.updateQueue=d,b.flags|=4);b.subtreeFlags=0;d=c;for(c=b.child;null!==c;)f=c,a=d,f.flags&=14680066,
g=f.alternate,null===g?(f.childLanes=0,f.lanes=a,f.child=null,f.subtreeFlags=0,f.memoizedProps=null,f.memoizedState=null,f.updateQueue=null,f.dependencies=null,f.stateNode=null):(f.childLanes=g.childLanes,f.lanes=g.lanes,f.child=g.child,f.subtreeFlags=0,f.deletions=null,f.memoizedProps=g.memoizedProps,f.memoizedState=g.memoizedState,f.updateQueue=g.updateQueue,f.type=g.type,a=g.dependencies,f.dependencies=null===a?null:{lanes:a.lanes,firstContext:a.firstContext}),c=c.sibling;G(L,L.current&1|2);return b.child}a=
a.sibling}null!==f.tail&&B()>Gj&&(b.flags|=128,d=!0,Dj(f,!1),b.lanes=4194304)}else{if(!d)if(a=Ch(g),null!==a){if(b.flags|=128,d=!0,c=a.updateQueue,null!==c&&(b.updateQueue=c,b.flags|=4),Dj(f,!0),null===f.tail&&"hidden"===f.tailMode&&!g.alternate&&!I)return S(b),null}else 2*B()-f.renderingStartTime>Gj&&1073741824!==c&&(b.flags|=128,d=!0,Dj(f,!1),b.lanes=4194304);f.isBackwards?(g.sibling=b.child,b.child=g):(c=f.last,null!==c?c.sibling=g:b.child=g,f.last=g)}if(null!==f.tail)return b=f.tail,f.rendering=
b,f.tail=b.sibling,f.renderingStartTime=B(),b.sibling=null,c=L.current,G(L,d?c&1|2:c&1),b;S(b);return null;case 22:case 23:return Hj(),d=null!==b.memoizedState,null!==a&&null!==a.memoizedState!==d&&(b.flags|=8192),d&&0!==(b.mode&1)?0!==(fj&1073741824)&&(S(b),b.subtreeFlags&6&&(b.flags|=8192)):S(b),null;case 24:return null;case 25:return null}throw Error(p(156,b.tag));}
function Ij(a,b){wg(b);switch(b.tag){case 1:return Zf(b.type)&&$f(),a=b.flags,a&65536?(b.flags=a&-65537|128,b):null;case 3:return zh(),E(Wf),E(H),Eh(),a=b.flags,0!==(a&65536)&&0===(a&128)?(b.flags=a&-65537|128,b):null;case 5:return Bh(b),null;case 13:E(L);a=b.memoizedState;if(null!==a&&null!==a.dehydrated){if(null===b.alternate)throw Error(p(340));Ig()}a=b.flags;return a&65536?(b.flags=a&-65537|128,b):null;case 19:return E(L),null;case 4:return zh(),null;case 10:return ah(b.type._context),null;case 22:case 23:return Hj(),
null;case 24:return null;default:return null}}var Jj=!1,U=!1,Kj="function"===typeof WeakSet?WeakSet:Set,V=null;function Lj(a,b){var c=a.ref;if(null!==c)if("function"===typeof c)try{c(null)}catch(d){W(a,b,d)}else c.current=null}function Mj(a,b,c){try{c()}catch(d){W(a,b,d)}}var Nj=!1;
function Oj(a,b){Cf=dd;a=Me();if(Ne(a)){if("selectionStart"in a)var c={start:a.selectionStart,end:a.selectionEnd};else a:{c=(c=a.ownerDocument)&&c.defaultView||window;var d=c.getSelection&&c.getSelection();if(d&&0!==d.rangeCount){c=d.anchorNode;var e=d.anchorOffset,f=d.focusNode;d=d.focusOffset;try{c.nodeType,f.nodeType}catch(F){c=null;break a}var g=0,h=-1,k=-1,l=0,m=0,q=a,r=null;b:for(;;){for(var y;;){q!==c||0!==e&&3!==q.nodeType||(h=g+e);q!==f||0!==d&&3!==q.nodeType||(k=g+d);3===q.nodeType&&(g+=
q.nodeValue.length);if(null===(y=q.firstChild))break;r=q;q=y}for(;;){if(q===a)break b;r===c&&++l===e&&(h=g);r===f&&++m===d&&(k=g);if(null!==(y=q.nextSibling))break;q=r;r=q.parentNode}q=y}c=-1===h||-1===k?null:{start:h,end:k}}else c=null}c=c||{start:0,end:0}}else c=null;Df={focusedElem:a,selectionRange:c};dd=!1;for(V=b;null!==V;)if(b=V,a=b.child,0!==(b.subtreeFlags&1028)&&null!==a)a.return=b,V=a;else for(;null!==V;){b=V;try{var n=b.alternate;if(0!==(b.flags&1024))switch(b.tag){case 0:case 11:case 15:break;
case 1:if(null!==n){var t=n.memoizedProps,J=n.memoizedState,x=b.stateNode,w=x.getSnapshotBeforeUpdate(b.elementType===b.type?t:Ci(b.type,t),J);x.__reactInternalSnapshotBeforeUpdate=w}break;case 3:var u=b.stateNode.containerInfo;1===u.nodeType?u.textContent="":9===u.nodeType&&u.documentElement&&u.removeChild(u.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(p(163));}}catch(F){W(b,b.return,F)}a=b.sibling;if(null!==a){a.return=b.return;V=a;break}V=b.return}n=Nj;Nj=!1;return n}
function Pj(a,b,c){var d=b.updateQueue;d=null!==d?d.lastEffect:null;if(null!==d){var e=d=d.next;do{if((e.tag&a)===a){var f=e.destroy;e.destroy=void 0;void 0!==f&&Mj(b,c,f)}e=e.next}while(e!==d)}}function Qj(a,b){b=b.updateQueue;b=null!==b?b.lastEffect:null;if(null!==b){var c=b=b.next;do{if((c.tag&a)===a){var d=c.create;c.destroy=d()}c=c.next}while(c!==b)}}function Rj(a){var b=a.ref;if(null!==b){var c=a.stateNode;switch(a.tag){case 5:a=c;break;default:a=c}"function"===typeof b?b(a):b.current=a}}
function Sj(a){var b=a.alternate;null!==b&&(a.alternate=null,Sj(b));a.child=null;a.deletions=null;a.sibling=null;5===a.tag&&(b=a.stateNode,null!==b&&(delete b[Of],delete b[Pf],delete b[of],delete b[Qf],delete b[Rf]));a.stateNode=null;a.return=null;a.dependencies=null;a.memoizedProps=null;a.memoizedState=null;a.pendingProps=null;a.stateNode=null;a.updateQueue=null}function Tj(a){return 5===a.tag||3===a.tag||4===a.tag}
function Uj(a){a:for(;;){for(;null===a.sibling;){if(null===a.return||Tj(a.return))return null;a=a.return}a.sibling.return=a.return;for(a=a.sibling;5!==a.tag&&6!==a.tag&&18!==a.tag;){if(a.flags&2)continue a;if(null===a.child||4===a.tag)continue a;else a.child.return=a,a=a.child}if(!(a.flags&2))return a.stateNode}}
function Vj(a,b,c){var d=a.tag;if(5===d||6===d)a=a.stateNode,b?8===c.nodeType?c.parentNode.insertBefore(a,b):c.insertBefore(a,b):(8===c.nodeType?(b=c.parentNode,b.insertBefore(a,c)):(b=c,b.appendChild(a)),c=c._reactRootContainer,null!==c&&void 0!==c||null!==b.onclick||(b.onclick=Bf));else if(4!==d&&(a=a.child,null!==a))for(Vj(a,b,c),a=a.sibling;null!==a;)Vj(a,b,c),a=a.sibling}
function Wj(a,b,c){var d=a.tag;if(5===d||6===d)a=a.stateNode,b?c.insertBefore(a,b):c.appendChild(a);else if(4!==d&&(a=a.child,null!==a))for(Wj(a,b,c),a=a.sibling;null!==a;)Wj(a,b,c),a=a.sibling}var X=null,Xj=!1;function Yj(a,b,c){for(c=c.child;null!==c;)Zj(a,b,c),c=c.sibling}
function Zj(a,b,c){if(lc&&"function"===typeof lc.onCommitFiberUnmount)try{lc.onCommitFiberUnmount(kc,c)}catch(h){}switch(c.tag){case 5:U||Lj(c,b);case 6:var d=X,e=Xj;X=null;Yj(a,b,c);X=d;Xj=e;null!==X&&(Xj?(a=X,c=c.stateNode,8===a.nodeType?a.parentNode.removeChild(c):a.removeChild(c)):X.removeChild(c.stateNode));break;case 18:null!==X&&(Xj?(a=X,c=c.stateNode,8===a.nodeType?Kf(a.parentNode,c):1===a.nodeType&&Kf(a,c),bd(a)):Kf(X,c.stateNode));break;case 4:d=X;e=Xj;X=c.stateNode.containerInfo;Xj=!0;
Yj(a,b,c);X=d;Xj=e;break;case 0:case 11:case 14:case 15:if(!U&&(d=c.updateQueue,null!==d&&(d=d.lastEffect,null!==d))){e=d=d.next;do{var f=e,g=f.destroy;f=f.tag;void 0!==g&&(0!==(f&2)?Mj(c,b,g):0!==(f&4)&&Mj(c,b,g));e=e.next}while(e!==d)}Yj(a,b,c);break;case 1:if(!U&&(Lj(c,b),d=c.stateNode,"function"===typeof d.componentWillUnmount))try{d.props=c.memoizedProps,d.state=c.memoizedState,d.componentWillUnmount()}catch(h){W(c,b,h)}Yj(a,b,c);break;case 21:Yj(a,b,c);break;case 22:c.mode&1?(U=(d=U)||null!==
c.memoizedState,Yj(a,b,c),U=d):Yj(a,b,c);break;default:Yj(a,b,c)}}function ak(a){var b=a.updateQueue;if(null!==b){a.updateQueue=null;var c=a.stateNode;null===c&&(c=a.stateNode=new Kj);b.forEach(function(b){var d=bk.bind(null,a,b);c.has(b)||(c.add(b),b.then(d,d))})}}
function ck(a,b){var c=b.deletions;if(null!==c)for(var d=0;d<c.length;d++){var e=c[d];try{var f=a,g=b,h=g;a:for(;null!==h;){switch(h.tag){case 5:X=h.stateNode;Xj=!1;break a;case 3:X=h.stateNode.containerInfo;Xj=!0;break a;case 4:X=h.stateNode.containerInfo;Xj=!0;break a}h=h.return}if(null===X)throw Error(p(160));Zj(f,g,e);X=null;Xj=!1;var k=e.alternate;null!==k&&(k.return=null);e.return=null}catch(l){W(e,b,l)}}if(b.subtreeFlags&12854)for(b=b.child;null!==b;)dk(b,a),b=b.sibling}
function dk(a,b){var c=a.alternate,d=a.flags;switch(a.tag){case 0:case 11:case 14:case 15:ck(b,a);ek(a);if(d&4){try{Pj(3,a,a.return),Qj(3,a)}catch(t){W(a,a.return,t)}try{Pj(5,a,a.return)}catch(t){W(a,a.return,t)}}break;case 1:ck(b,a);ek(a);d&512&&null!==c&&Lj(c,c.return);break;case 5:ck(b,a);ek(a);d&512&&null!==c&&Lj(c,c.return);if(a.flags&32){var e=a.stateNode;try{ob(e,"")}catch(t){W(a,a.return,t)}}if(d&4&&(e=a.stateNode,null!=e)){var f=a.memoizedProps,g=null!==c?c.memoizedProps:f,h=a.type,k=a.updateQueue;
a.updateQueue=null;if(null!==k)try{"input"===h&&"radio"===f.type&&null!=f.name&&ab(e,f);vb(h,g);var l=vb(h,f);for(g=0;g<k.length;g+=2){var m=k[g],q=k[g+1];"style"===m?sb(e,q):"dangerouslySetInnerHTML"===m?nb(e,q):"children"===m?ob(e,q):ta(e,m,q,l)}switch(h){case "input":bb(e,f);break;case "textarea":ib(e,f);break;case "select":var r=e._wrapperState.wasMultiple;e._wrapperState.wasMultiple=!!f.multiple;var y=f.value;null!=y?fb(e,!!f.multiple,y,!1):r!==!!f.multiple&&(null!=f.defaultValue?fb(e,!!f.multiple,
f.defaultValue,!0):fb(e,!!f.multiple,f.multiple?[]:"",!1))}e[Pf]=f}catch(t){W(a,a.return,t)}}break;case 6:ck(b,a);ek(a);if(d&4){if(null===a.stateNode)throw Error(p(162));e=a.stateNode;f=a.memoizedProps;try{e.nodeValue=f}catch(t){W(a,a.return,t)}}break;case 3:ck(b,a);ek(a);if(d&4&&null!==c&&c.memoizedState.isDehydrated)try{bd(b.containerInfo)}catch(t){W(a,a.return,t)}break;case 4:ck(b,a);ek(a);break;case 13:ck(b,a);ek(a);e=a.child;e.flags&8192&&(f=null!==e.memoizedState,e.stateNode.isHidden=f,!f||
null!==e.alternate&&null!==e.alternate.memoizedState||(fk=B()));d&4&&ak(a);break;case 22:m=null!==c&&null!==c.memoizedState;a.mode&1?(U=(l=U)||m,ck(b,a),U=l):ck(b,a);ek(a);if(d&8192){l=null!==a.memoizedState;if((a.stateNode.isHidden=l)&&!m&&0!==(a.mode&1))for(V=a,m=a.child;null!==m;){for(q=V=m;null!==V;){r=V;y=r.child;switch(r.tag){case 0:case 11:case 14:case 15:Pj(4,r,r.return);break;case 1:Lj(r,r.return);var n=r.stateNode;if("function"===typeof n.componentWillUnmount){d=r;c=r.return;try{b=d,n.props=
b.memoizedProps,n.state=b.memoizedState,n.componentWillUnmount()}catch(t){W(d,c,t)}}break;case 5:Lj(r,r.return);break;case 22:if(null!==r.memoizedState){gk(q);continue}}null!==y?(y.return=r,V=y):gk(q)}m=m.sibling}a:for(m=null,q=a;;){if(5===q.tag){if(null===m){m=q;try{e=q.stateNode,l?(f=e.style,"function"===typeof f.setProperty?f.setProperty("display","none","important"):f.display="none"):(h=q.stateNode,k=q.memoizedProps.style,g=void 0!==k&&null!==k&&k.hasOwnProperty("display")?k.display:null,h.style.display=
rb("display",g))}catch(t){W(a,a.return,t)}}}else if(6===q.tag){if(null===m)try{q.stateNode.nodeValue=l?"":q.memoizedProps}catch(t){W(a,a.return,t)}}else if((22!==q.tag&&23!==q.tag||null===q.memoizedState||q===a)&&null!==q.child){q.child.return=q;q=q.child;continue}if(q===a)break a;for(;null===q.sibling;){if(null===q.return||q.return===a)break a;m===q&&(m=null);q=q.return}m===q&&(m=null);q.sibling.return=q.return;q=q.sibling}}break;case 19:ck(b,a);ek(a);d&4&&ak(a);break;case 21:break;default:ck(b,
a),ek(a)}}function ek(a){var b=a.flags;if(b&2){try{a:{for(var c=a.return;null!==c;){if(Tj(c)){var d=c;break a}c=c.return}throw Error(p(160));}switch(d.tag){case 5:var e=d.stateNode;d.flags&32&&(ob(e,""),d.flags&=-33);var f=Uj(a);Wj(a,f,e);break;case 3:case 4:var g=d.stateNode.containerInfo,h=Uj(a);Vj(a,h,g);break;default:throw Error(p(161));}}catch(k){W(a,a.return,k)}a.flags&=-3}b&4096&&(a.flags&=-4097)}function hk(a,b,c){V=a;ik(a,b,c)}
function ik(a,b,c){for(var d=0!==(a.mode&1);null!==V;){var e=V,f=e.child;if(22===e.tag&&d){var g=null!==e.memoizedState||Jj;if(!g){var h=e.alternate,k=null!==h&&null!==h.memoizedState||U;h=Jj;var l=U;Jj=g;if((U=k)&&!l)for(V=e;null!==V;)g=V,k=g.child,22===g.tag&&null!==g.memoizedState?jk(e):null!==k?(k.return=g,V=k):jk(e);for(;null!==f;)V=f,ik(f,b,c),f=f.sibling;V=e;Jj=h;U=l}kk(a,b,c)}else 0!==(e.subtreeFlags&8772)&&null!==f?(f.return=e,V=f):kk(a,b,c)}}
function kk(a){for(;null!==V;){var b=V;if(0!==(b.flags&8772)){var c=b.alternate;try{if(0!==(b.flags&8772))switch(b.tag){case 0:case 11:case 15:U||Qj(5,b);break;case 1:var d=b.stateNode;if(b.flags&4&&!U)if(null===c)d.componentDidMount();else{var e=b.elementType===b.type?c.memoizedProps:Ci(b.type,c.memoizedProps);d.componentDidUpdate(e,c.memoizedState,d.__reactInternalSnapshotBeforeUpdate)}var f=b.updateQueue;null!==f&&sh(b,f,d);break;case 3:var g=b.updateQueue;if(null!==g){c=null;if(null!==b.child)switch(b.child.tag){case 5:c=
b.child.stateNode;break;case 1:c=b.child.stateNode}sh(b,g,c)}break;case 5:var h=b.stateNode;if(null===c&&b.flags&4){c=h;var k=b.memoizedProps;switch(b.type){case "button":case "input":case "select":case "textarea":k.autoFocus&&c.focus();break;case "img":k.src&&(c.src=k.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(null===b.memoizedState){var l=b.alternate;if(null!==l){var m=l.memoizedState;if(null!==m){var q=m.dehydrated;null!==q&&bd(q)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;
default:throw Error(p(163));}U||b.flags&512&&Rj(b)}catch(r){W(b,b.return,r)}}if(b===a){V=null;break}c=b.sibling;if(null!==c){c.return=b.return;V=c;break}V=b.return}}function gk(a){for(;null!==V;){var b=V;if(b===a){V=null;break}var c=b.sibling;if(null!==c){c.return=b.return;V=c;break}V=b.return}}
function jk(a){for(;null!==V;){var b=V;try{switch(b.tag){case 0:case 11:case 15:var c=b.return;try{Qj(4,b)}catch(k){W(b,c,k)}break;case 1:var d=b.stateNode;if("function"===typeof d.componentDidMount){var e=b.return;try{d.componentDidMount()}catch(k){W(b,e,k)}}var f=b.return;try{Rj(b)}catch(k){W(b,f,k)}break;case 5:var g=b.return;try{Rj(b)}catch(k){W(b,g,k)}}}catch(k){W(b,b.return,k)}if(b===a){V=null;break}var h=b.sibling;if(null!==h){h.return=b.return;V=h;break}V=b.return}}
var lk=Math.ceil,mk=ua.ReactCurrentDispatcher,nk=ua.ReactCurrentOwner,ok=ua.ReactCurrentBatchConfig,K=0,Q=null,Y=null,Z=0,fj=0,ej=Uf(0),T=0,pk=null,rh=0,qk=0,rk=0,sk=null,tk=null,fk=0,Gj=Infinity,uk=null,Oi=!1,Pi=null,Ri=null,vk=!1,wk=null,xk=0,yk=0,zk=null,Ak=-1,Bk=0;function R(){return 0!==(K&6)?B():-1!==Ak?Ak:Ak=B()}
function yi(a){if(0===(a.mode&1))return 1;if(0!==(K&2)&&0!==Z)return Z&-Z;if(null!==Kg.transition)return 0===Bk&&(Bk=yc()),Bk;a=C;if(0!==a)return a;a=window.event;a=void 0===a?16:jd(a.type);return a}function gi(a,b,c,d){if(50<yk)throw yk=0,zk=null,Error(p(185));Ac(a,c,d);if(0===(K&2)||a!==Q)a===Q&&(0===(K&2)&&(qk|=c),4===T&&Ck(a,Z)),Dk(a,d),1===c&&0===K&&0===(b.mode&1)&&(Gj=B()+500,fg&&jg())}
function Dk(a,b){var c=a.callbackNode;wc(a,b);var d=uc(a,a===Q?Z:0);if(0===d)null!==c&&bc(c),a.callbackNode=null,a.callbackPriority=0;else if(b=d&-d,a.callbackPriority!==b){null!=c&&bc(c);if(1===b)0===a.tag?ig(Ek.bind(null,a)):hg(Ek.bind(null,a)),Jf(function(){0===(K&6)&&jg()}),c=null;else{switch(Dc(d)){case 1:c=fc;break;case 4:c=gc;break;case 16:c=hc;break;case 536870912:c=jc;break;default:c=hc}c=Fk(c,Gk.bind(null,a))}a.callbackPriority=b;a.callbackNode=c}}
function Gk(a,b){Ak=-1;Bk=0;if(0!==(K&6))throw Error(p(327));var c=a.callbackNode;if(Hk()&&a.callbackNode!==c)return null;var d=uc(a,a===Q?Z:0);if(0===d)return null;if(0!==(d&30)||0!==(d&a.expiredLanes)||b)b=Ik(a,d);else{b=d;var e=K;K|=2;var f=Jk();if(Q!==a||Z!==b)uk=null,Gj=B()+500,Kk(a,b);do try{Lk();break}catch(h){Mk(a,h)}while(1);$g();mk.current=f;K=e;null!==Y?b=0:(Q=null,Z=0,b=T)}if(0!==b){2===b&&(e=xc(a),0!==e&&(d=e,b=Nk(a,e)));if(1===b)throw c=pk,Kk(a,0),Ck(a,d),Dk(a,B()),c;if(6===b)Ck(a,d);
else{e=a.current.alternate;if(0===(d&30)&&!Ok(e)&&(b=Ik(a,d),2===b&&(f=xc(a),0!==f&&(d=f,b=Nk(a,f))),1===b))throw c=pk,Kk(a,0),Ck(a,d),Dk(a,B()),c;a.finishedWork=e;a.finishedLanes=d;switch(b){case 0:case 1:throw Error(p(345));case 2:Pk(a,tk,uk);break;case 3:Ck(a,d);if((d&130023424)===d&&(b=fk+500-B(),10<b)){if(0!==uc(a,0))break;e=a.suspendedLanes;if((e&d)!==d){R();a.pingedLanes|=a.suspendedLanes&e;break}a.timeoutHandle=Ff(Pk.bind(null,a,tk,uk),b);break}Pk(a,tk,uk);break;case 4:Ck(a,d);if((d&4194240)===
d)break;b=a.eventTimes;for(e=-1;0<d;){var g=31-oc(d);f=1<<g;g=b[g];g>e&&(e=g);d&=~f}d=e;d=B()-d;d=(120>d?120:480>d?480:1080>d?1080:1920>d?1920:3E3>d?3E3:4320>d?4320:1960*lk(d/1960))-d;if(10<d){a.timeoutHandle=Ff(Pk.bind(null,a,tk,uk),d);break}Pk(a,tk,uk);break;case 5:Pk(a,tk,uk);break;default:throw Error(p(329));}}}Dk(a,B());return a.callbackNode===c?Gk.bind(null,a):null}
function Nk(a,b){var c=sk;a.current.memoizedState.isDehydrated&&(Kk(a,b).flags|=256);a=Ik(a,b);2!==a&&(b=tk,tk=c,null!==b&&Fj(b));return a}function Fj(a){null===tk?tk=a:tk.push.apply(tk,a)}
function Ok(a){for(var b=a;;){if(b.flags&16384){var c=b.updateQueue;if(null!==c&&(c=c.stores,null!==c))for(var d=0;d<c.length;d++){var e=c[d],f=e.getSnapshot;e=e.value;try{if(!He(f(),e))return!1}catch(g){return!1}}}c=b.child;if(b.subtreeFlags&16384&&null!==c)c.return=b,b=c;else{if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return!0;b=b.return}b.sibling.return=b.return;b=b.sibling}}return!0}
function Ck(a,b){b&=~rk;b&=~qk;a.suspendedLanes|=b;a.pingedLanes&=~b;for(a=a.expirationTimes;0<b;){var c=31-oc(b),d=1<<c;a[c]=-1;b&=~d}}function Ek(a){if(0!==(K&6))throw Error(p(327));Hk();var b=uc(a,0);if(0===(b&1))return Dk(a,B()),null;var c=Ik(a,b);if(0!==a.tag&&2===c){var d=xc(a);0!==d&&(b=d,c=Nk(a,d))}if(1===c)throw c=pk,Kk(a,0),Ck(a,b),Dk(a,B()),c;if(6===c)throw Error(p(345));a.finishedWork=a.current.alternate;a.finishedLanes=b;Pk(a,tk,uk);Dk(a,B());return null}
function Qk(a,b){var c=K;K|=1;try{return a(b)}finally{K=c,0===K&&(Gj=B()+500,fg&&jg())}}function Rk(a){null!==wk&&0===wk.tag&&0===(K&6)&&Hk();var b=K;K|=1;var c=ok.transition,d=C;try{if(ok.transition=null,C=1,a)return a()}finally{C=d,ok.transition=c,K=b,0===(K&6)&&jg()}}function Hj(){fj=ej.current;E(ej)}
function Kk(a,b){a.finishedWork=null;a.finishedLanes=0;var c=a.timeoutHandle;-1!==c&&(a.timeoutHandle=-1,Gf(c));if(null!==Y)for(c=Y.return;null!==c;){var d=c;wg(d);switch(d.tag){case 1:d=d.type.childContextTypes;null!==d&&void 0!==d&&$f();break;case 3:zh();E(Wf);E(H);Eh();break;case 5:Bh(d);break;case 4:zh();break;case 13:E(L);break;case 19:E(L);break;case 10:ah(d.type._context);break;case 22:case 23:Hj()}c=c.return}Q=a;Y=a=Pg(a.current,null);Z=fj=b;T=0;pk=null;rk=qk=rh=0;tk=sk=null;if(null!==fh){for(b=
0;b<fh.length;b++)if(c=fh[b],d=c.interleaved,null!==d){c.interleaved=null;var e=d.next,f=c.pending;if(null!==f){var g=f.next;f.next=e;d.next=g}c.pending=d}fh=null}return a}
function Mk(a,b){do{var c=Y;try{$g();Fh.current=Rh;if(Ih){for(var d=M.memoizedState;null!==d;){var e=d.queue;null!==e&&(e.pending=null);d=d.next}Ih=!1}Hh=0;O=N=M=null;Jh=!1;Kh=0;nk.current=null;if(null===c||null===c.return){T=1;pk=b;Y=null;break}a:{var f=a,g=c.return,h=c,k=b;b=Z;h.flags|=32768;if(null!==k&&"object"===typeof k&&"function"===typeof k.then){var l=k,m=h,q=m.tag;if(0===(m.mode&1)&&(0===q||11===q||15===q)){var r=m.alternate;r?(m.updateQueue=r.updateQueue,m.memoizedState=r.memoizedState,
m.lanes=r.lanes):(m.updateQueue=null,m.memoizedState=null)}var y=Ui(g);if(null!==y){y.flags&=-257;Vi(y,g,h,f,b);y.mode&1&&Si(f,l,b);b=y;k=l;var n=b.updateQueue;if(null===n){var t=new Set;t.add(k);b.updateQueue=t}else n.add(k);break a}else{if(0===(b&1)){Si(f,l,b);tj();break a}k=Error(p(426))}}else if(I&&h.mode&1){var J=Ui(g);if(null!==J){0===(J.flags&65536)&&(J.flags|=256);Vi(J,g,h,f,b);Jg(Ji(k,h));break a}}f=k=Ji(k,h);4!==T&&(T=2);null===sk?sk=[f]:sk.push(f);f=g;do{switch(f.tag){case 3:f.flags|=65536;
b&=-b;f.lanes|=b;var x=Ni(f,k,b);ph(f,x);break a;case 1:h=k;var w=f.type,u=f.stateNode;if(0===(f.flags&128)&&("function"===typeof w.getDerivedStateFromError||null!==u&&"function"===typeof u.componentDidCatch&&(null===Ri||!Ri.has(u)))){f.flags|=65536;b&=-b;f.lanes|=b;var F=Qi(f,h,b);ph(f,F);break a}}f=f.return}while(null!==f)}Sk(c)}catch(na){b=na;Y===c&&null!==c&&(Y=c=c.return);continue}break}while(1)}function Jk(){var a=mk.current;mk.current=Rh;return null===a?Rh:a}
function tj(){if(0===T||3===T||2===T)T=4;null===Q||0===(rh&268435455)&&0===(qk&268435455)||Ck(Q,Z)}function Ik(a,b){var c=K;K|=2;var d=Jk();if(Q!==a||Z!==b)uk=null,Kk(a,b);do try{Tk();break}catch(e){Mk(a,e)}while(1);$g();K=c;mk.current=d;if(null!==Y)throw Error(p(261));Q=null;Z=0;return T}function Tk(){for(;null!==Y;)Uk(Y)}function Lk(){for(;null!==Y&&!cc();)Uk(Y)}function Uk(a){var b=Vk(a.alternate,a,fj);a.memoizedProps=a.pendingProps;null===b?Sk(a):Y=b;nk.current=null}
function Sk(a){var b=a;do{var c=b.alternate;a=b.return;if(0===(b.flags&32768)){if(c=Ej(c,b,fj),null!==c){Y=c;return}}else{c=Ij(c,b);if(null!==c){c.flags&=32767;Y=c;return}if(null!==a)a.flags|=32768,a.subtreeFlags=0,a.deletions=null;else{T=6;Y=null;return}}b=b.sibling;if(null!==b){Y=b;return}Y=b=a}while(null!==b);0===T&&(T=5)}function Pk(a,b,c){var d=C,e=ok.transition;try{ok.transition=null,C=1,Wk(a,b,c,d)}finally{ok.transition=e,C=d}return null}
function Wk(a,b,c,d){do Hk();while(null!==wk);if(0!==(K&6))throw Error(p(327));c=a.finishedWork;var e=a.finishedLanes;if(null===c)return null;a.finishedWork=null;a.finishedLanes=0;if(c===a.current)throw Error(p(177));a.callbackNode=null;a.callbackPriority=0;var f=c.lanes|c.childLanes;Bc(a,f);a===Q&&(Y=Q=null,Z=0);0===(c.subtreeFlags&2064)&&0===(c.flags&2064)||vk||(vk=!0,Fk(hc,function(){Hk();return null}));f=0!==(c.flags&15990);if(0!==(c.subtreeFlags&15990)||f){f=ok.transition;ok.transition=null;
var g=C;C=1;var h=K;K|=4;nk.current=null;Oj(a,c);dk(c,a);Oe(Df);dd=!!Cf;Df=Cf=null;a.current=c;hk(c,a,e);dc();K=h;C=g;ok.transition=f}else a.current=c;vk&&(vk=!1,wk=a,xk=e);f=a.pendingLanes;0===f&&(Ri=null);mc(c.stateNode,d);Dk(a,B());if(null!==b)for(d=a.onRecoverableError,c=0;c<b.length;c++)e=b[c],d(e.value,{componentStack:e.stack,digest:e.digest});if(Oi)throw Oi=!1,a=Pi,Pi=null,a;0!==(xk&1)&&0!==a.tag&&Hk();f=a.pendingLanes;0!==(f&1)?a===zk?yk++:(yk=0,zk=a):yk=0;jg();return null}
function Hk(){if(null!==wk){var a=Dc(xk),b=ok.transition,c=C;try{ok.transition=null;C=16>a?16:a;if(null===wk)var d=!1;else{a=wk;wk=null;xk=0;if(0!==(K&6))throw Error(p(331));var e=K;K|=4;for(V=a.current;null!==V;){var f=V,g=f.child;if(0!==(V.flags&16)){var h=f.deletions;if(null!==h){for(var k=0;k<h.length;k++){var l=h[k];for(V=l;null!==V;){var m=V;switch(m.tag){case 0:case 11:case 15:Pj(8,m,f)}var q=m.child;if(null!==q)q.return=m,V=q;else for(;null!==V;){m=V;var r=m.sibling,y=m.return;Sj(m);if(m===
l){V=null;break}if(null!==r){r.return=y;V=r;break}V=y}}}var n=f.alternate;if(null!==n){var t=n.child;if(null!==t){n.child=null;do{var J=t.sibling;t.sibling=null;t=J}while(null!==t)}}V=f}}if(0!==(f.subtreeFlags&2064)&&null!==g)g.return=f,V=g;else b:for(;null!==V;){f=V;if(0!==(f.flags&2048))switch(f.tag){case 0:case 11:case 15:Pj(9,f,f.return)}var x=f.sibling;if(null!==x){x.return=f.return;V=x;break b}V=f.return}}var w=a.current;for(V=w;null!==V;){g=V;var u=g.child;if(0!==(g.subtreeFlags&2064)&&null!==
u)u.return=g,V=u;else b:for(g=w;null!==V;){h=V;if(0!==(h.flags&2048))try{switch(h.tag){case 0:case 11:case 15:Qj(9,h)}}catch(na){W(h,h.return,na)}if(h===g){V=null;break b}var F=h.sibling;if(null!==F){F.return=h.return;V=F;break b}V=h.return}}K=e;jg();if(lc&&"function"===typeof lc.onPostCommitFiberRoot)try{lc.onPostCommitFiberRoot(kc,a)}catch(na){}d=!0}return d}finally{C=c,ok.transition=b}}return!1}function Xk(a,b,c){b=Ji(c,b);b=Ni(a,b,1);a=nh(a,b,1);b=R();null!==a&&(Ac(a,1,b),Dk(a,b))}
function W(a,b,c){if(3===a.tag)Xk(a,a,c);else for(;null!==b;){if(3===b.tag){Xk(b,a,c);break}else if(1===b.tag){var d=b.stateNode;if("function"===typeof b.type.getDerivedStateFromError||"function"===typeof d.componentDidCatch&&(null===Ri||!Ri.has(d))){a=Ji(c,a);a=Qi(b,a,1);b=nh(b,a,1);a=R();null!==b&&(Ac(b,1,a),Dk(b,a));break}}b=b.return}}
function Ti(a,b,c){var d=a.pingCache;null!==d&&d.delete(b);b=R();a.pingedLanes|=a.suspendedLanes&c;Q===a&&(Z&c)===c&&(4===T||3===T&&(Z&130023424)===Z&&500>B()-fk?Kk(a,0):rk|=c);Dk(a,b)}function Yk(a,b){0===b&&(0===(a.mode&1)?b=1:(b=sc,sc<<=1,0===(sc&130023424)&&(sc=4194304)));var c=R();a=ih(a,b);null!==a&&(Ac(a,b,c),Dk(a,c))}function uj(a){var b=a.memoizedState,c=0;null!==b&&(c=b.retryLane);Yk(a,c)}
function bk(a,b){var c=0;switch(a.tag){case 13:var d=a.stateNode;var e=a.memoizedState;null!==e&&(c=e.retryLane);break;case 19:d=a.stateNode;break;default:throw Error(p(314));}null!==d&&d.delete(b);Yk(a,c)}var Vk;
Vk=function(a,b,c){if(null!==a)if(a.memoizedProps!==b.pendingProps||Wf.current)dh=!0;else{if(0===(a.lanes&c)&&0===(b.flags&128))return dh=!1,yj(a,b,c);dh=0!==(a.flags&131072)?!0:!1}else dh=!1,I&&0!==(b.flags&1048576)&&ug(b,ng,b.index);b.lanes=0;switch(b.tag){case 2:var d=b.type;ij(a,b);a=b.pendingProps;var e=Yf(b,H.current);ch(b,c);e=Nh(null,b,d,a,e,c);var f=Sh();b.flags|=1;"object"===typeof e&&null!==e&&"function"===typeof e.render&&void 0===e.$$typeof?(b.tag=1,b.memoizedState=null,b.updateQueue=
null,Zf(d)?(f=!0,cg(b)):f=!1,b.memoizedState=null!==e.state&&void 0!==e.state?e.state:null,kh(b),e.updater=Ei,b.stateNode=e,e._reactInternals=b,Ii(b,d,a,c),b=jj(null,b,d,!0,f,c)):(b.tag=0,I&&f&&vg(b),Xi(null,b,e,c),b=b.child);return b;case 16:d=b.elementType;a:{ij(a,b);a=b.pendingProps;e=d._init;d=e(d._payload);b.type=d;e=b.tag=Zk(d);a=Ci(d,a);switch(e){case 0:b=cj(null,b,d,a,c);break a;case 1:b=hj(null,b,d,a,c);break a;case 11:b=Yi(null,b,d,a,c);break a;case 14:b=$i(null,b,d,Ci(d.type,a),c);break a}throw Error(p(306,
d,""));}return b;case 0:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Ci(d,e),cj(a,b,d,e,c);case 1:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Ci(d,e),hj(a,b,d,e,c);case 3:a:{kj(b);if(null===a)throw Error(p(387));d=b.pendingProps;f=b.memoizedState;e=f.element;lh(a,b);qh(b,d,null,c);var g=b.memoizedState;d=g.element;if(f.isDehydrated)if(f={element:d,isDehydrated:!1,cache:g.cache,pendingSuspenseBoundaries:g.pendingSuspenseBoundaries,transitions:g.transitions},b.updateQueue.baseState=
f,b.memoizedState=f,b.flags&256){e=Ji(Error(p(423)),b);b=lj(a,b,d,c,e);break a}else if(d!==e){e=Ji(Error(p(424)),b);b=lj(a,b,d,c,e);break a}else for(yg=Lf(b.stateNode.containerInfo.firstChild),xg=b,I=!0,zg=null,c=Vg(b,null,d,c),b.child=c;c;)c.flags=c.flags&-3|4096,c=c.sibling;else{Ig();if(d===e){b=Zi(a,b,c);break a}Xi(a,b,d,c)}b=b.child}return b;case 5:return Ah(b),null===a&&Eg(b),d=b.type,e=b.pendingProps,f=null!==a?a.memoizedProps:null,g=e.children,Ef(d,e)?g=null:null!==f&&Ef(d,f)&&(b.flags|=32),
gj(a,b),Xi(a,b,g,c),b.child;case 6:return null===a&&Eg(b),null;case 13:return oj(a,b,c);case 4:return yh(b,b.stateNode.containerInfo),d=b.pendingProps,null===a?b.child=Ug(b,null,d,c):Xi(a,b,d,c),b.child;case 11:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Ci(d,e),Yi(a,b,d,e,c);case 7:return Xi(a,b,b.pendingProps,c),b.child;case 8:return Xi(a,b,b.pendingProps.children,c),b.child;case 12:return Xi(a,b,b.pendingProps.children,c),b.child;case 10:a:{d=b.type._context;e=b.pendingProps;f=b.memoizedProps;
g=e.value;G(Wg,d._currentValue);d._currentValue=g;if(null!==f)if(He(f.value,g)){if(f.children===e.children&&!Wf.current){b=Zi(a,b,c);break a}}else for(f=b.child,null!==f&&(f.return=b);null!==f;){var h=f.dependencies;if(null!==h){g=f.child;for(var k=h.firstContext;null!==k;){if(k.context===d){if(1===f.tag){k=mh(-1,c&-c);k.tag=2;var l=f.updateQueue;if(null!==l){l=l.shared;var m=l.pending;null===m?k.next=k:(k.next=m.next,m.next=k);l.pending=k}}f.lanes|=c;k=f.alternate;null!==k&&(k.lanes|=c);bh(f.return,
c,b);h.lanes|=c;break}k=k.next}}else if(10===f.tag)g=f.type===b.type?null:f.child;else if(18===f.tag){g=f.return;if(null===g)throw Error(p(341));g.lanes|=c;h=g.alternate;null!==h&&(h.lanes|=c);bh(g,c,b);g=f.sibling}else g=f.child;if(null!==g)g.return=f;else for(g=f;null!==g;){if(g===b){g=null;break}f=g.sibling;if(null!==f){f.return=g.return;g=f;break}g=g.return}f=g}Xi(a,b,e.children,c);b=b.child}return b;case 9:return e=b.type,d=b.pendingProps.children,ch(b,c),e=eh(e),d=d(e),b.flags|=1,Xi(a,b,d,c),
b.child;case 14:return d=b.type,e=Ci(d,b.pendingProps),e=Ci(d.type,e),$i(a,b,d,e,c);case 15:return bj(a,b,b.type,b.pendingProps,c);case 17:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Ci(d,e),ij(a,b),b.tag=1,Zf(d)?(a=!0,cg(b)):a=!1,ch(b,c),Gi(b,d,e),Ii(b,d,e,c),jj(null,b,d,!0,a,c);case 19:return xj(a,b,c);case 22:return dj(a,b,c)}throw Error(p(156,b.tag));};function Fk(a,b){return ac(a,b)}
function $k(a,b,c,d){this.tag=a;this.key=c;this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null;this.index=0;this.ref=null;this.pendingProps=b;this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=d;this.subtreeFlags=this.flags=0;this.deletions=null;this.childLanes=this.lanes=0;this.alternate=null}function Bg(a,b,c,d){return new $k(a,b,c,d)}function aj(a){a=a.prototype;return!(!a||!a.isReactComponent)}
function Zk(a){if("function"===typeof a)return aj(a)?1:0;if(void 0!==a&&null!==a){a=a.$$typeof;if(a===Da)return 11;if(a===Ga)return 14}return 2}
function Pg(a,b){var c=a.alternate;null===c?(c=Bg(a.tag,b,a.key,a.mode),c.elementType=a.elementType,c.type=a.type,c.stateNode=a.stateNode,c.alternate=a,a.alternate=c):(c.pendingProps=b,c.type=a.type,c.flags=0,c.subtreeFlags=0,c.deletions=null);c.flags=a.flags&14680064;c.childLanes=a.childLanes;c.lanes=a.lanes;c.child=a.child;c.memoizedProps=a.memoizedProps;c.memoizedState=a.memoizedState;c.updateQueue=a.updateQueue;b=a.dependencies;c.dependencies=null===b?null:{lanes:b.lanes,firstContext:b.firstContext};
c.sibling=a.sibling;c.index=a.index;c.ref=a.ref;return c}
function Rg(a,b,c,d,e,f){var g=2;d=a;if("function"===typeof a)aj(a)&&(g=1);else if("string"===typeof a)g=5;else a:switch(a){case ya:return Tg(c.children,e,f,b);case za:g=8;e|=8;break;case Aa:return a=Bg(12,c,b,e|2),a.elementType=Aa,a.lanes=f,a;case Ea:return a=Bg(13,c,b,e),a.elementType=Ea,a.lanes=f,a;case Fa:return a=Bg(19,c,b,e),a.elementType=Fa,a.lanes=f,a;case Ia:return pj(c,e,f,b);default:if("object"===typeof a&&null!==a)switch(a.$$typeof){case Ba:g=10;break a;case Ca:g=9;break a;case Da:g=11;
break a;case Ga:g=14;break a;case Ha:g=16;d=null;break a}throw Error(p(130,null==a?a:typeof a,""));}b=Bg(g,c,b,e);b.elementType=a;b.type=d;b.lanes=f;return b}function Tg(a,b,c,d){a=Bg(7,a,d,b);a.lanes=c;return a}function pj(a,b,c,d){a=Bg(22,a,d,b);a.elementType=Ia;a.lanes=c;a.stateNode={isHidden:!1};return a}function Qg(a,b,c){a=Bg(6,a,null,b);a.lanes=c;return a}
function Sg(a,b,c){b=Bg(4,null!==a.children?a.children:[],a.key,b);b.lanes=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}
function al(a,b,c,d,e){this.tag=b;this.containerInfo=a;this.finishedWork=this.pingCache=this.current=this.pendingChildren=null;this.timeoutHandle=-1;this.callbackNode=this.pendingContext=this.context=null;this.callbackPriority=0;this.eventTimes=zc(0);this.expirationTimes=zc(-1);this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0;this.entanglements=zc(0);this.identifierPrefix=d;this.onRecoverableError=e;this.mutableSourceEagerHydrationData=
null}function bl(a,b,c,d,e,f,g,h,k){a=new al(a,b,c,h,k);1===b?(b=1,!0===f&&(b|=8)):b=0;f=Bg(3,null,null,b);a.current=f;f.stateNode=a;f.memoizedState={element:d,isDehydrated:c,cache:null,transitions:null,pendingSuspenseBoundaries:null};kh(f);return a}function cl(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:wa,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}}
function dl(a){if(!a)return Vf;a=a._reactInternals;a:{if(Vb(a)!==a||1!==a.tag)throw Error(p(170));var b=a;do{switch(b.tag){case 3:b=b.stateNode.context;break a;case 1:if(Zf(b.type)){b=b.stateNode.__reactInternalMemoizedMergedChildContext;break a}}b=b.return}while(null!==b);throw Error(p(171));}if(1===a.tag){var c=a.type;if(Zf(c))return bg(a,c,b)}return b}
function el(a,b,c,d,e,f,g,h,k){a=bl(c,d,!0,a,e,f,g,h,k);a.context=dl(null);c=a.current;d=R();e=yi(c);f=mh(d,e);f.callback=void 0!==b&&null!==b?b:null;nh(c,f,e);a.current.lanes=e;Ac(a,e,d);Dk(a,d);return a}function fl(a,b,c,d){var e=b.current,f=R(),g=yi(e);c=dl(c);null===b.context?b.context=c:b.pendingContext=c;b=mh(f,g);b.payload={element:a};d=void 0===d?null:d;null!==d&&(b.callback=d);a=nh(e,b,g);null!==a&&(gi(a,e,g,f),oh(a,e,g));return g}
function gl(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return a.child.stateNode;default:return a.child.stateNode}}function hl(a,b){a=a.memoizedState;if(null!==a&&null!==a.dehydrated){var c=a.retryLane;a.retryLane=0!==c&&c<b?c:b}}function il(a,b){hl(a,b);(a=a.alternate)&&hl(a,b)}function jl(){return null}var kl="function"===typeof reportError?reportError:function(a){console.error(a)};function ll(a){this._internalRoot=a}
ml.prototype.render=ll.prototype.render=function(a){var b=this._internalRoot;if(null===b)throw Error(p(409));fl(a,b,null,null)};ml.prototype.unmount=ll.prototype.unmount=function(){var a=this._internalRoot;if(null!==a){this._internalRoot=null;var b=a.containerInfo;Rk(function(){fl(null,a,null,null)});b[uf]=null}};function ml(a){this._internalRoot=a}
ml.prototype.unstable_scheduleHydration=function(a){if(a){var b=Hc();a={blockedOn:null,target:a,priority:b};for(var c=0;c<Qc.length&&0!==b&&b<Qc[c].priority;c++);Qc.splice(c,0,a);0===c&&Vc(a)}};function nl(a){return!(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType)}function ol(a){return!(!a||1!==a.nodeType&&9!==a.nodeType&&11!==a.nodeType&&(8!==a.nodeType||" react-mount-point-unstable "!==a.nodeValue))}function pl(){}
function ql(a,b,c,d,e){if(e){if("function"===typeof d){var f=d;d=function(){var a=gl(g);f.call(a)}}var g=el(b,d,a,0,null,!1,!1,"",pl);a._reactRootContainer=g;a[uf]=g.current;sf(8===a.nodeType?a.parentNode:a);Rk();return g}for(;e=a.lastChild;)a.removeChild(e);if("function"===typeof d){var h=d;d=function(){var a=gl(k);h.call(a)}}var k=bl(a,0,!1,null,null,!1,!1,"",pl);a._reactRootContainer=k;a[uf]=k.current;sf(8===a.nodeType?a.parentNode:a);Rk(function(){fl(b,k,c,d)});return k}
function rl(a,b,c,d,e){var f=c._reactRootContainer;if(f){var g=f;if("function"===typeof e){var h=e;e=function(){var a=gl(g);h.call(a)}}fl(b,g,a,e)}else g=ql(c,b,a,e,d);return gl(g)}Ec=function(a){switch(a.tag){case 3:var b=a.stateNode;if(b.current.memoizedState.isDehydrated){var c=tc(b.pendingLanes);0!==c&&(Cc(b,c|1),Dk(b,B()),0===(K&6)&&(Gj=B()+500,jg()))}break;case 13:Rk(function(){var b=ih(a,1);if(null!==b){var c=R();gi(b,a,1,c)}}),il(a,1)}};
Fc=function(a){if(13===a.tag){var b=ih(a,134217728);if(null!==b){var c=R();gi(b,a,134217728,c)}il(a,134217728)}};Gc=function(a){if(13===a.tag){var b=yi(a),c=ih(a,b);if(null!==c){var d=R();gi(c,a,b,d)}il(a,b)}};Hc=function(){return C};Ic=function(a,b){var c=C;try{return C=a,b()}finally{C=c}};
yb=function(a,b,c){switch(b){case "input":bb(a,c);b=c.name;if("radio"===c.type&&null!=b){for(c=a;c.parentNode;)c=c.parentNode;c=c.querySelectorAll("input[name="+JSON.stringify(""+b)+'][type="radio"]');for(b=0;b<c.length;b++){var d=c[b];if(d!==a&&d.form===a.form){var e=Db(d);if(!e)throw Error(p(90));Wa(d);bb(d,e)}}}break;case "textarea":ib(a,c);break;case "select":b=c.value,null!=b&&fb(a,!!c.multiple,b,!1)}};Gb=Qk;Hb=Rk;
var sl={usingClientEntryPoint:!1,Events:[Cb,ue,Db,Eb,Fb,Qk]},tl={findFiberByHostInstance:Wc,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"};
var ul={bundleType:tl.bundleType,version:tl.version,rendererPackageName:tl.rendererPackageName,rendererConfig:tl.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:ua.ReactCurrentDispatcher,findHostInstanceByFiber:function(a){a=Zb(a);return null===a?null:a.stateNode},findFiberByHostInstance:tl.findFiberByHostInstance||
jl,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if("undefined"!==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__){var vl=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!vl.isDisabled&&vl.supportsFiber)try{kc=vl.inject(ul),lc=vl}catch(a){}}exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=sl;
exports.createPortal=function(a,b){var c=2<arguments.length&&void 0!==arguments[2]?arguments[2]:null;if(!nl(b))throw Error(p(200));return cl(a,b,null,c)};exports.createRoot=function(a,b){if(!nl(a))throw Error(p(299));var c=!1,d="",e=kl;null!==b&&void 0!==b&&(!0===b.unstable_strictMode&&(c=!0),void 0!==b.identifierPrefix&&(d=b.identifierPrefix),void 0!==b.onRecoverableError&&(e=b.onRecoverableError));b=bl(a,1,!1,null,null,c,!1,d,e);a[uf]=b.current;sf(8===a.nodeType?a.parentNode:a);return new ll(b)};
exports.findDOMNode=function(a){if(null==a)return null;if(1===a.nodeType)return a;var b=a._reactInternals;if(void 0===b){if("function"===typeof a.render)throw Error(p(188));a=Object.keys(a).join(",");throw Error(p(268,a));}a=Zb(b);a=null===a?null:a.stateNode;return a};exports.flushSync=function(a){return Rk(a)};exports.hydrate=function(a,b,c){if(!ol(b))throw Error(p(200));return rl(null,a,b,!0,c)};
exports.hydrateRoot=function(a,b,c){if(!nl(a))throw Error(p(405));var d=null!=c&&c.hydratedSources||null,e=!1,f="",g=kl;null!==c&&void 0!==c&&(!0===c.unstable_strictMode&&(e=!0),void 0!==c.identifierPrefix&&(f=c.identifierPrefix),void 0!==c.onRecoverableError&&(g=c.onRecoverableError));b=el(b,null,a,1,null!=c?c:null,e,!1,f,g);a[uf]=b.current;sf(a);if(d)for(a=0;a<d.length;a++)c=d[a],e=c._getVersion,e=e(c._source),null==b.mutableSourceEagerHydrationData?b.mutableSourceEagerHydrationData=[c,e]:b.mutableSourceEagerHydrationData.push(c,
e);return new ml(b)};exports.render=function(a,b,c){if(!ol(b))throw Error(p(200));return rl(null,a,b,!1,c)};exports.unmountComponentAtNode=function(a){if(!ol(a))throw Error(p(40));return a._reactRootContainer?(Rk(function(){rl(null,null,a,!1,function(){a._reactRootContainer=null;a[uf]=null})}),!0):!1};exports.unstable_batchedUpdates=Qk;
exports.unstable_renderSubtreeIntoContainer=function(a,b,c,d){if(!ol(c))throw Error(p(200));if(null==a||void 0===a._reactInternals)throw Error(p(38));return rl(a,b,c,!1,d)};exports.version="18.3.1-next-f1338f8080-20240426";


/***/ }),

/***/ 5338:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var m = __webpack_require__(40961);
if (true) {
  exports.createRoot = m.createRoot;
  exports.hydrateRoot = m.hydrateRoot;
} else { var i; }


/***/ }),

/***/ 40961:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function checkDCE() {
  /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
  if (
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === 'undefined' ||
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== 'function'
  ) {
    return;
  }
  if (false) {}
  try {
    // Verify that the code above has been dead code eliminated (DCE'd).
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    // DevTools shouldn't crash React, no matter what.
    // We should still report in case we break this code.
    console.error(err);
  }
}

if (true) {
  // DCE check should happen before ReactDOM bundle executes so that
  // DevTools can report bad minification during injection.
  checkDCE();
  module.exports = __webpack_require__(22551);
} else {}


/***/ }),

/***/ 98731:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function f(a,b){var c=a.length;a.push(b);a:for(;0<c;){var d=c-1>>>1,e=a[d];if(0<g(e,b))a[d]=b,a[c]=e,c=d;else break a}}function h(a){return 0===a.length?null:a[0]}function k(a){if(0===a.length)return null;var b=a[0],c=a.pop();if(c!==b){a[0]=c;a:for(var d=0,e=a.length,w=e>>>1;d<w;){var m=2*(d+1)-1,C=a[m],n=m+1,x=a[n];if(0>g(C,c))n<e&&0>g(x,C)?(a[d]=x,a[n]=c,d=n):(a[d]=C,a[m]=c,d=m);else if(n<e&&0>g(x,c))a[d]=x,a[n]=c,d=n;else break a}}return b}
function g(a,b){var c=a.sortIndex-b.sortIndex;return 0!==c?c:a.id-b.id}if("object"===typeof performance&&"function"===typeof performance.now){var l=performance;exports.unstable_now=function(){return l.now()}}else{var p=Date,q=p.now();exports.unstable_now=function(){return p.now()-q}}var r=[],t=[],u=1,v=null,y=3,z=!1,A=!1,B=!1,D="function"===typeof setTimeout?setTimeout:null,E="function"===typeof clearTimeout?clearTimeout:null,F="undefined"!==typeof setImmediate?setImmediate:null;
"undefined"!==typeof navigator&&void 0!==navigator.scheduling&&void 0!==navigator.scheduling.isInputPending&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function G(a){for(var b=h(t);null!==b;){if(null===b.callback)k(t);else if(b.startTime<=a)k(t),b.sortIndex=b.expirationTime,f(r,b);else break;b=h(t)}}function H(a){B=!1;G(a);if(!A)if(null!==h(r))A=!0,I(J);else{var b=h(t);null!==b&&K(H,b.startTime-a)}}
function J(a,b){A=!1;B&&(B=!1,E(L),L=-1);z=!0;var c=y;try{G(b);for(v=h(r);null!==v&&(!(v.expirationTime>b)||a&&!M());){var d=v.callback;if("function"===typeof d){v.callback=null;y=v.priorityLevel;var e=d(v.expirationTime<=b);b=exports.unstable_now();"function"===typeof e?v.callback=e:v===h(r)&&k(r);G(b)}else k(r);v=h(r)}if(null!==v)var w=!0;else{var m=h(t);null!==m&&K(H,m.startTime-b);w=!1}return w}finally{v=null,y=c,z=!1}}var N=!1,O=null,L=-1,P=5,Q=-1;
function M(){return exports.unstable_now()-Q<P?!1:!0}function R(){if(null!==O){var a=exports.unstable_now();Q=a;var b=!0;try{b=O(!0,a)}finally{b?S():(N=!1,O=null)}}else N=!1}var S;if("function"===typeof F)S=function(){F(R)};else if("undefined"!==typeof MessageChannel){var T=new MessageChannel,U=T.port2;T.port1.onmessage=R;S=function(){U.postMessage(null)}}else S=function(){D(R,0)};function I(a){O=a;N||(N=!0,S())}function K(a,b){L=D(function(){a(exports.unstable_now())},b)}
exports.unstable_IdlePriority=5;exports.unstable_ImmediatePriority=1;exports.unstable_LowPriority=4;exports.unstable_NormalPriority=3;exports.unstable_Profiling=null;exports.unstable_UserBlockingPriority=2;exports.unstable_cancelCallback=function(a){a.callback=null};exports.unstable_continueExecution=function(){A||z||(A=!0,I(J))};
exports.unstable_forceFrameRate=function(a){0>a||125<a?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):P=0<a?Math.floor(1E3/a):5};exports.unstable_getCurrentPriorityLevel=function(){return y};exports.unstable_getFirstCallbackNode=function(){return h(r)};exports.unstable_next=function(a){switch(y){case 1:case 2:case 3:var b=3;break;default:b=y}var c=y;y=b;try{return a()}finally{y=c}};exports.unstable_pauseExecution=function(){};
exports.unstable_requestPaint=function(){};exports.unstable_runWithPriority=function(a,b){switch(a){case 1:case 2:case 3:case 4:case 5:break;default:a=3}var c=y;y=a;try{return b()}finally{y=c}};
exports.unstable_scheduleCallback=function(a,b,c){var d=exports.unstable_now();"object"===typeof c&&null!==c?(c=c.delay,c="number"===typeof c&&0<c?d+c:d):c=d;switch(a){case 1:var e=-1;break;case 2:e=250;break;case 5:e=1073741823;break;case 4:e=1E4;break;default:e=5E3}e=c+e;a={id:u++,callback:b,priorityLevel:a,startTime:c,expirationTime:e,sortIndex:-1};c>d?(a.sortIndex=c,f(t,a),null===h(r)&&a===h(t)&&(B?(E(L),L=-1):B=!0,K(H,c-d))):(a.sortIndex=e,f(r,a),A||z||(A=!0,I(J)));return a};
exports.unstable_shouldYield=M;exports.unstable_wrapCallback=function(a){var b=y;return function(){var c=y;y=b;try{return a.apply(this,arguments)}finally{y=c}}};


/***/ }),

/***/ 20194:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(98731);
} else {}


/***/ }),

/***/ 22799:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?
Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;
function z(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}exports.AsyncMode=l;exports.ConcurrentMode=m;exports.ContextConsumer=k;exports.ContextProvider=h;exports.Element=c;exports.ForwardRef=n;exports.Fragment=e;exports.Lazy=t;exports.Memo=r;exports.Portal=d;
exports.Profiler=g;exports.StrictMode=f;exports.Suspense=p;exports.isAsyncMode=function(a){return A(a)||z(a)===l};exports.isConcurrentMode=A;exports.isContextConsumer=function(a){return z(a)===k};exports.isContextProvider=function(a){return z(a)===h};exports.isElement=function(a){return"object"===typeof a&&null!==a&&a.$$typeof===c};exports.isForwardRef=function(a){return z(a)===n};exports.isFragment=function(a){return z(a)===e};exports.isLazy=function(a){return z(a)===t};
exports.isMemo=function(a){return z(a)===r};exports.isPortal=function(a){return z(a)===d};exports.isProfiler=function(a){return z(a)===g};exports.isStrictMode=function(a){return z(a)===f};exports.isSuspense=function(a){return z(a)===p};
exports.isValidElementType=function(a){return"string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v)};exports.typeOf=z;


/***/ }),

/***/ 44363:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(22799);
} else {}


/***/ }),

/***/ 76687:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  Mention: () => (/* binding */ Mention),
  MentionsInput: () => (/* binding */ MentionsInput$1)
});

// EXTERNAL MODULE: ./node_modules/react-mentions/node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js
var arrayWithoutHoles = __webpack_require__(91799);
// EXTERNAL MODULE: ./node_modules/react-mentions/node_modules/@babel/runtime/helpers/esm/iterableToArray.js
var iterableToArray = __webpack_require__(23113);
// EXTERNAL MODULE: ./node_modules/react-mentions/node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
var nonIterableSpread = __webpack_require__(61811);
;// CONCATENATED MODULE: ./node_modules/react-mentions/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js



function _toConsumableArray(arr) {
  return (0,arrayWithoutHoles/* default */.A)(arr) || (0,iterableToArray/* default */.A)(arr) || (0,nonIterableSpread/* default */.A)();
}
;// CONCATENATED MODULE: ./node_modules/react-mentions/node_modules/@babel/runtime/helpers/esm/extends.js
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}
;// CONCATENATED MODULE: ./node_modules/react-mentions/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
;// CONCATENATED MODULE: ./node_modules/react-mentions/node_modules/@babel/runtime/helpers/esm/createClass.js
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
// EXTERNAL MODULE: ./node_modules/react-mentions/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
var assertThisInitialized = __webpack_require__(20589);
// EXTERNAL MODULE: ./node_modules/react-mentions/node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
var setPrototypeOf = __webpack_require__(84306);
;// CONCATENATED MODULE: ./node_modules/react-mentions/node_modules/@babel/runtime/helpers/esm/inherits.js

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
  if (superClass) (0,setPrototypeOf/* default */.A)(subClass, superClass);
}
// EXTERNAL MODULE: ./node_modules/react-mentions/node_modules/@babel/runtime/helpers/esm/typeof.js
var esm_typeof = __webpack_require__(77128);
;// CONCATENATED MODULE: ./node_modules/react-mentions/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js


function _possibleConstructorReturn(self, call) {
  if (call && ((0,esm_typeof/* default */.A)(call) === "object" || typeof call === "function")) {
    return call;
  }

  return (0,assertThisInitialized/* default */.A)(self);
}
;// CONCATENATED MODULE: ./node_modules/react-mentions/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
;// CONCATENATED MODULE: ./node_modules/react-mentions/node_modules/@babel/runtime/helpers/esm/defineProperty.js
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
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(96540);
// EXTERNAL MODULE: ./node_modules/invariant/browser.js
var browser = __webpack_require__(20311);
var browser_default = /*#__PURE__*/__webpack_require__.n(browser);
// EXTERNAL MODULE: ./node_modules/react-mentions/node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
var arrayWithHoles = __webpack_require__(54597);
// EXTERNAL MODULE: ./node_modules/react-mentions/node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
var iterableToArrayLimit = __webpack_require__(85742);
// EXTERNAL MODULE: ./node_modules/react-mentions/node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
var nonIterableRest = __webpack_require__(93278);
;// CONCATENATED MODULE: ./node_modules/react-mentions/node_modules/@babel/runtime/helpers/esm/slicedToArray.js



function _slicedToArray(arr, i) {
  return (0,arrayWithHoles/* default */.A)(arr) || (0,iterableToArrayLimit/* default */.A)(arr, i) || (0,nonIterableRest/* default */.A)();
}
// EXTERNAL MODULE: ./node_modules/react-mentions/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
var objectWithoutPropertiesLoose = __webpack_require__(92151);
;// CONCATENATED MODULE: ./node_modules/react-mentions/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = (0,objectWithoutPropertiesLoose/* default */.A)(source, excluded);
  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}
// EXTERNAL MODULE: ./node_modules/substyle/es6/index.js + 15 modules
var es6 = __webpack_require__(95146);
// EXTERNAL MODULE: ./node_modules/substyle/es6/inline.js
var inline = __webpack_require__(83094);
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(5556);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(40961);
;// CONCATENATED MODULE: ./node_modules/react-mentions/dist/react-mentions.esm.js

















// escape RegExp special characters https://stackoverflow.com/a/9310752/5142490
var escapeRegex = function escapeRegex(str) {
  return str.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

var PLACEHOLDERS = {
  id: '__id__',
  display: '__display__'
};

var findPositionOfCapturingGroup = function findPositionOfCapturingGroup(markup, parameterName) {
  browser_default()(parameterName === 'id' || parameterName === 'display', "Second arg must be either \"id\" or \"display\", got: \"".concat(parameterName, "\"")); // find positions of placeholders in the markup

  var indexDisplay = markup.indexOf(PLACEHOLDERS.display);
  var indexId = markup.indexOf(PLACEHOLDERS.id); // set indices to null if not found

  if (indexDisplay < 0) indexDisplay = null;
  if (indexId < 0) indexId = null; // markup must contain one of the mandatory placeholders

  browser_default()(indexDisplay !== null || indexId !== null, "The markup '".concat(markup, "' does not contain either of the placeholders '__id__' or '__display__'"));

  if (indexDisplay !== null && indexId !== null) {
    // both placeholders are used, return 0 or 1 depending on the position of the requested parameter
    return parameterName === 'id' && indexId <= indexDisplay || parameterName === 'display' && indexDisplay <= indexId ? 0 : 1;
  } // just one placeholder is being used, we'll use the captured string for both parameters


  return 0;
};

var combineRegExps = function combineRegExps(regExps) {
  var serializedRegexParser = /^\/(.+)\/(\w+)?$/;
  return new RegExp(regExps.map(function (regex) {
    var _serializedRegexParse = serializedRegexParser.exec(regex.toString()),
        _serializedRegexParse2 = _slicedToArray(_serializedRegexParse, 3),
        regexString = _serializedRegexParse2[1],
        regexFlags = _serializedRegexParse2[2];

    browser_default()(!regexFlags, "RegExp flags are not supported. Change /".concat(regexString, "/").concat(regexFlags, " into /").concat(regexString, "/"));
    return "(".concat(regexString, ")");
  }).join('|'), 'g');
};

var countPlaceholders = function countPlaceholders(markup) {
  var count = 0;
  if (markup.indexOf('__id__') >= 0) count++;
  if (markup.indexOf('__display__') >= 0) count++;
  return count;
};

var emptyFn = function emptyFn() {}; // Finds all occurrences of the markup in the value and calls the `markupIteratee` callback for each of them.
// The optional `textIteratee` callback is called for each plain text ranges in between these markup occurrences.


var iterateMentionsMarkup = function iterateMentionsMarkup(value, config, markupIteratee) {
  var textIteratee = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : emptyFn;
  var regex = combineRegExps(config.map(function (c) {
    return c.regex;
  }));
  var accOffset = 2; // first is whole match, second is the for the capturing group of first regexp component

  var captureGroupOffsets = config.map(function (_ref) {
    var markup = _ref.markup;
    var result = accOffset; // + 1 is for the capturing group we add around each regexp component in combineRegExps

    accOffset += countPlaceholders(markup) + 1;
    return result;
  });
  var match;
  var start = 0;
  var currentPlainTextIndex = 0; // detect all mention markup occurrences in the value and iterate the matches

  while ((match = regex.exec(value)) !== null) {
    var offset = captureGroupOffsets.find(function (o) {
      return !!match[o];
    }); // eslint-disable-line no-loop-func

    var mentionChildIndex = captureGroupOffsets.indexOf(offset);
    var _config$mentionChildI = config[mentionChildIndex],
        markup = _config$mentionChildI.markup,
        displayTransform = _config$mentionChildI.displayTransform;
    var idPos = offset + findPositionOfCapturingGroup(markup, 'id');
    var displayPos = offset + findPositionOfCapturingGroup(markup, 'display');
    var id = match[idPos];
    var display = displayTransform(id, match[displayPos]);
    var substr = value.substring(start, match.index);
    textIteratee(substr, start, currentPlainTextIndex);
    currentPlainTextIndex += substr.length;
    markupIteratee(match[0], match.index, currentPlainTextIndex, id, display, mentionChildIndex, start);
    currentPlainTextIndex += display.length;
    start = regex.lastIndex;
  }

  if (start < value.length) {
    textIteratee(value.substring(start), start, currentPlainTextIndex);
  }
};

var getPlainText = function getPlainText(value, config) {
  var result = '';
  iterateMentionsMarkup(value, config, function (match, index, plainTextIndex, id, display) {
    result += display;
  }, function (plainText) {
    result += plainText;
  });
  return result;
};

// in the marked up value string.
// If the passed character index lies inside a mention, the value of `inMarkupCorrection` defines the
// correction to apply:
//   - 'START' to return the index of the mention markup's first char (default)
//   - 'END' to return the index after its last char
//   - 'NULL' to return null

var mapPlainTextIndex = function mapPlainTextIndex(value, config, indexInPlainText) {
  var inMarkupCorrection = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'START';

  if (typeof indexInPlainText !== 'number') {
    return indexInPlainText;
  }

  var result;

  var textIteratee = function textIteratee(substr, index, substrPlainTextIndex) {
    if (result !== undefined) return;

    if (substrPlainTextIndex + substr.length >= indexInPlainText) {
      // found the corresponding position in the current plain text range
      result = index + indexInPlainText - substrPlainTextIndex;
    }
  };

  var markupIteratee = function markupIteratee(markup, index, mentionPlainTextIndex, id, display, childIndex, lastMentionEndIndex) {
    if (result !== undefined) return;

    if (mentionPlainTextIndex + display.length > indexInPlainText) {
      // found the corresponding position inside current match,
      // return the index of the first or after the last char of the matching markup
      // depending on whether the `inMarkupCorrection`
      if (inMarkupCorrection === 'NULL') {
        result = null;
      } else {
        result = index + (inMarkupCorrection === 'END' ? markup.length : 0);
      }
    }
  };

  iterateMentionsMarkup(value, config, markupIteratee, textIteratee); // when a mention is at the end of the value and we want to get the caret position
  // at the end of the string, result is undefined

  return result === undefined ? value.length : result;
};

var spliceString = function spliceString(str, start, end, insert) {
  return str.substring(0, start) + insert + str.substring(end);
};

// guided by the textarea text selection ranges before and after the change

var applyChangeToValue = function applyChangeToValue(value, plainTextValue, _ref, config) {
  var selectionStartBefore = _ref.selectionStartBefore,
      selectionEndBefore = _ref.selectionEndBefore,
      selectionEndAfter = _ref.selectionEndAfter;
  var oldPlainTextValue = getPlainText(value, config);
  var lengthDelta = oldPlainTextValue.length - plainTextValue.length;

  if (selectionStartBefore === 'undefined') {
    selectionStartBefore = selectionEndAfter + lengthDelta;
  }

  if (selectionEndBefore === 'undefined') {
    selectionEndBefore = selectionStartBefore;
  } // Fixes an issue with replacing combined characters for complex input. Eg like acented letters on OSX


  if (selectionStartBefore === selectionEndBefore && selectionEndBefore === selectionEndAfter && oldPlainTextValue.length === plainTextValue.length) {
    selectionStartBefore = selectionStartBefore - 1;
  } // extract the insertion from the new plain text value


  var insert = plainTextValue.slice(selectionStartBefore, selectionEndAfter); // handling for Backspace key with no range selection

  var spliceStart = Math.min(selectionStartBefore, selectionEndAfter);
  var spliceEnd = selectionEndBefore;

  if (selectionStartBefore === selectionEndAfter) {
    // handling for Delete key with no range selection
    spliceEnd = Math.max(selectionEndBefore, selectionStartBefore + lengthDelta);
  }

  var mappedSpliceStart = mapPlainTextIndex(value, config, spliceStart, 'START');
  var mappedSpliceEnd = mapPlainTextIndex(value, config, spliceEnd, 'END');
  var controlSpliceStart = mapPlainTextIndex(value, config, spliceStart, 'NULL');
  var controlSpliceEnd = mapPlainTextIndex(value, config, spliceEnd, 'NULL');
  var willRemoveMention = controlSpliceStart === null || controlSpliceEnd === null;
  var newValue = spliceString(value, mappedSpliceStart, mappedSpliceEnd, insert);

  if (!willRemoveMention) {
    // test for auto-completion changes
    var controlPlainTextValue = getPlainText(newValue, config);

    if (controlPlainTextValue !== plainTextValue) {
      // some auto-correction is going on
      // find start of diff
      spliceStart = 0;

      while (plainTextValue[spliceStart] === controlPlainTextValue[spliceStart]) {
        spliceStart++;
      } // extract auto-corrected insertion


      insert = plainTextValue.slice(spliceStart, selectionEndAfter); // find index of the unchanged remainder

      spliceEnd = oldPlainTextValue.lastIndexOf(plainTextValue.substring(selectionEndAfter)); // re-map the corrected indices

      mappedSpliceStart = mapPlainTextIndex(value, config, spliceStart, 'START');
      mappedSpliceEnd = mapPlainTextIndex(value, config, spliceEnd, 'END');
      newValue = spliceString(value, mappedSpliceStart, mappedSpliceEnd, insert);
    }
  }

  return newValue;
};

// returns a the index of of the first char of the mention in the plain text.
// If indexInPlainText does not lie inside a mention, returns indexInPlainText.

var findStartOfMentionInPlainText = function findStartOfMentionInPlainText(value, config, indexInPlainText) {
  var result = indexInPlainText;
  var foundMention = false;

  var markupIteratee = function markupIteratee(markup, index, mentionPlainTextIndex, id, display, childIndex, lastMentionEndIndex) {
    if (mentionPlainTextIndex <= indexInPlainText && mentionPlainTextIndex + display.length > indexInPlainText) {
      result = mentionPlainTextIndex;
      foundMention = true;
    }
  };

  iterateMentionsMarkup(value, config, markupIteratee);

  if (foundMention) {
    return result;
  }
};

var getMentions = function getMentions(value, config) {
  var mentions = [];
  iterateMentionsMarkup(value, config, function (match, index, plainTextIndex, id, display, childIndex, start) {
    mentions.push({
      id: id,
      display: display,
      childIndex: childIndex,
      index: index,
      plainTextIndex: plainTextIndex
    });
  });
  return mentions;
};

var getSuggestionHtmlId = function getSuggestionHtmlId(prefix, id) {
  return "".concat(prefix, "-").concat(id);
};

var countSuggestions = function countSuggestions(suggestions) {
  return Object.values(suggestions).reduce(function (acc, _ref) {
    var results = _ref.results;
    return acc + results.length;
  }, 0);
};

var getEndOfLastMention = function getEndOfLastMention(value, config) {
  var mentions = getMentions(value, config);
  var lastMention = mentions[mentions.length - 1];
  return lastMention ? lastMention.plainTextIndex + lastMention.display.length : 0;
};

var markupToRegex = function markupToRegex(markup) {
  var escapedMarkup = escapeRegex(markup);
  var charAfterDisplay = markup[markup.indexOf(PLACEHOLDERS.display) + PLACEHOLDERS.display.length];
  var charAfterId = markup[markup.indexOf(PLACEHOLDERS.id) + PLACEHOLDERS.id.length];
  return new RegExp(escapedMarkup.replace(PLACEHOLDERS.display, "([^".concat(escapeRegex(charAfterDisplay || ''), "]+?)")).replace(PLACEHOLDERS.id, "([^".concat(escapeRegex(charAfterId || ''), "]+?)")));
};

var readConfigFromChildren = function readConfigFromChildren(children) {
  return react.Children.toArray(children).map(function (_ref) {
    var _ref$props = _ref.props,
        markup = _ref$props.markup,
        regex = _ref$props.regex,
        displayTransform = _ref$props.displayTransform;
    return {
      markup: markup,
      regex: regex ? coerceCapturingGroups(regex, markup) : markupToRegex(markup),
      displayTransform: displayTransform || function (id, display) {
        return display || id;
      }
    };
  });
}; // make sure that the custom regex defines the correct number of capturing groups


var coerceCapturingGroups = function coerceCapturingGroups(regex, markup) {
  var numberOfGroups = new RegExp(regex.toString() + '|').exec('').length - 1;
  var numberOfPlaceholders = countPlaceholders(markup);
  browser_default()(numberOfGroups === numberOfPlaceholders, "Number of capturing groups in RegExp ".concat(regex.toString(), " (").concat(numberOfGroups, ") does not match the number of placeholders in the markup '").concat(markup, "' (").concat(numberOfPlaceholders, ")"));
  return regex;
};

var makeMentionsMarkup = function makeMentionsMarkup(markup, id, display) {
  return markup.replace(PLACEHOLDERS.id, id).replace(PLACEHOLDERS.display, display);
};

// This contains all the latin letters and the regex that match these letters with diacritics
// https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
var lettersDiacritics = [{
  base: 'A',
  letters: /(&#65;|&#9398;|&#65313;|&#192;|&#193;|&#194;|&#7846;|&#7844;|&#7850;|&#7848;|&#195;|&#256;|&#258;|&#7856;|&#7854;|&#7860;|&#7858;|&#550;|&#480;|&#196;|&#478;|&#7842;|&#197;|&#506;|&#461;|&#512;|&#514;|&#7840;|&#7852;|&#7862;|&#7680;|&#260;|&#570;|&#11375;|[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F])/g
}, {
  base: 'AA',
  letters: /(&#42802;|[\uA732])/g
}, {
  base: 'AE',
  letters: /(&#198;|&#508;|&#482;|[\u00C6\u01FC\u01E2])/g
}, {
  base: 'AO',
  letters: /(&#42804;|[\uA734])/g
}, {
  base: 'AU',
  letters: /(&#42806;|[\uA736])/g
}, {
  base: 'AV',
  letters: /(&#42808;|&#42810;|[\uA738\uA73A])/g
}, {
  base: 'AY',
  letters: /(&#42812;|[\uA73C])/g
}, {
  base: 'B',
  letters: /(&#66;|&#9399;|&#65314;|&#7682;|&#7684;|&#7686;|&#579;|&#386;|&#385;|[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181])/g
}, {
  base: 'C',
  letters: /(&#67;|&#9400;|&#65315;|&#262;|&#264;|&#266;|&#268;|&#199;|&#7688;|&#391;|&#571;|&#42814;|[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E])/g
}, {
  base: 'D',
  letters: /(&#68;|&#9401;|&#65316;|&#7690;|&#270;|&#7692;|&#7696;|&#7698;|&#7694;|&#272;|&#395;|&#394;|&#393;|&#42873;|&#208;|[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779\u00D0])/g
}, {
  base: 'DZ',
  letters: /(&#497;|&#452;|[\u01F1\u01C4])/g
}, {
  base: 'Dz',
  letters: /(&#498;|&#453;|[\u01F2\u01C5])/g
}, {
  base: 'E',
  letters: /(&#69;|&#9402;|&#65317;|&#200;|&#201;|&#202;|&#7872;|&#7870;|&#7876;|&#7874;|&#7868;|&#274;|&#7700;|&#7702;|&#276;|&#278;|&#203;|&#7866;|&#282;|&#516;|&#518;|&#7864;|&#7878;|&#552;|&#7708;|&#280;|&#7704;|&#7706;|&#400;|&#398;|[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E])/g
}, {
  base: 'F',
  letters: /(&#70;|&#9403;|&#65318;|&#7710;|&#401;|&#42875;|[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B])/g
}, {
  base: 'G',
  letters: /(&#71;|&#9404;|&#65319;|&#500;|&#284;|&#7712;|&#286;|&#288;|&#486;|&#290;|&#484;|&#403;|&#42912;|&#42877;|&#42878;|[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E])/g
}, {
  base: 'H',
  letters: /(&#72;|&#9405;|&#65320;|&#292;|&#7714;|&#7718;|&#542;|&#7716;|&#7720;|&#7722;|&#294;|&#11367;|&#11381;|&#42893;|[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D])/g
}, {
  base: 'I',
  letters: /(&#73;|&#9406;|&#65321;|&#204;|&#205;|&#206;|&#296;|&#298;|&#300;|&#304;|&#207;|&#7726;|&#7880;|&#463;|&#520;|&#522;|&#7882;|&#302;|&#7724;|&#407;|[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197])/g
}, {
  base: 'J',
  letters: /(&#74;|&#9407;|&#65322;|&#308;|&#584;|[\u004A\u24BF\uFF2A\u0134\u0248])/g
}, {
  base: 'K',
  letters: /(&#75;|&#9408;|&#65323;|&#7728;|&#488;|&#7730;|&#310;|&#7732;|&#408;|&#11369;|&#42816;|&#42818;|&#42820;|&#42914;|[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2])/g
}, {
  base: 'L',
  letters: /(&#76;|&#9409;|&#65324;|&#319;|&#313;|&#317;|&#7734;|&#7736;|&#315;|&#7740;|&#7738;|&#321;|&#573;|&#11362;|&#11360;|&#42824;|&#42822;|&#42880;|[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780])/g
}, {
  base: 'LJ',
  letters: /(&#455;|[\u01C7])/g
}, {
  base: 'Lj',
  letters: /(&#456;|[\u01C8])/g
}, {
  base: 'M',
  letters: /(&#77;|&#9410;|&#65325;|&#7742;|&#7744;|&#7746;|&#11374;|&#412;|[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C])/g
}, {
  base: 'N',
  letters: /(&#78;|&#9411;|&#65326;|&#504;|&#323;|&#209;|&#7748;|&#327;|&#7750;|&#325;|&#7754;|&#7752;|&#544;|&#413;|&#42896;|&#42916;|&#330;|[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4\u014A])/g
}, {
  base: 'NJ',
  letters: /(&#458;|[\u01CA])/g
}, {
  base: 'Nj',
  letters: /(&#459;|[\u01CB])/g
}, {
  base: 'O',
  letters: /(&#79;|&#9412;|&#65327;|&#210;|&#211;|&#212;|&#7890;|&#7888;|&#7894;|&#7892;|&#213;|&#7756;|&#556;|&#7758;|&#332;|&#7760;|&#7762;|&#334;|&#558;|&#560;|&#214;|&#554;|&#7886;|&#336;|&#465;|&#524;|&#526;|&#416;|&#7900;|&#7898;|&#7904;|&#7902;|&#7906;|&#7884;|&#7896;|&#490;|&#492;|&#216;|&#510;|&#390;|&#415;|&#42826;|&#42828;|[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C])/g
}, {
  base: 'OE',
  letters: /(&#338;|[\u0152])/g
}, {
  base: 'OI',
  letters: /(&#418;|[\u01A2])/g
}, {
  base: 'OO',
  letters: /(&#42830;|[\uA74E])/g
}, {
  base: 'OU',
  letters: /(&#546;|[\u0222])/g
}, {
  base: 'P',
  letters: /(&#80;|&#9413;|&#65328;|&#7764;|&#7766;|&#420;|&#11363;|&#42832;|&#42834;|&#42836;|[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754])/g
}, {
  base: 'Q',
  letters: /(&#81;|&#9414;|&#65329;|&#42838;|&#42840;|&#586;|[\u0051\u24C6\uFF31\uA756\uA758\u024A])/g
}, {
  base: 'R',
  letters: /(&#82;|&#9415;|&#65330;|&#340;|&#7768;|&#344;|&#528;|&#530;|&#7770;|&#7772;|&#342;|&#7774;|&#588;|&#11364;|&#42842;|&#42918;|&#42882;|[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782])/g
}, {
  base: 'S',
  letters: /(&#83;|&#9416;|&#65331;|&#7838;|&#346;|&#7780;|&#348;|&#7776;|&#352;|&#7782;|&#7778;|&#7784;|&#536;|&#350;|&#11390;|&#42920;|&#42884;|[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784])/g
}, {
  base: 'T',
  letters: /(&#84;|&#9417;|&#65332;|&#7786;|&#356;|&#7788;|&#538;|&#354;|&#7792;|&#7790;|&#358;|&#428;|&#430;|&#574;|&#42886;|[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786])/g
}, {
  base: 'TH',
  letters: /(&#222;|[\u00DE])/g
}, {
  base: 'TZ',
  letters: /(&#42792;|[\uA728])/g
}, {
  base: 'U',
  letters: /(&#85;|&#9418;|&#65333;|&#217;|&#218;|&#219;|&#360;|&#7800;|&#362;|&#7802;|&#364;|&#220;|&#475;|&#471;|&#469;|&#473;|&#7910;|&#366;|&#368;|&#467;|&#532;|&#534;|&#431;|&#7914;|&#7912;|&#7918;|&#7916;|&#7920;|&#7908;|&#7794;|&#370;|&#7798;|&#7796;|&#580;|[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244])/g
}, {
  base: 'V',
  letters: /(&#86;|&#9419;|&#65334;|&#7804;|&#7806;|&#434;|&#42846;|&#581;|[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245])/g
}, {
  base: 'VY',
  letters: /(&#42848;|[\uA760])/g
}, {
  base: 'W',
  letters: /(&#87;|&#9420;|&#65335;|&#7808;|&#7810;|&#372;|&#7814;|&#7812;|&#7816;|&#11378;|[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72])/g
}, {
  base: 'X',
  letters: /(&#88;|&#9421;|&#65336;|&#7818;|&#7820;|[\u0058\u24CD\uFF38\u1E8A\u1E8C])/g
}, {
  base: 'Y',
  letters: /(&#89;|&#9422;|&#65337;|&#7922;|&#221;|&#374;|&#7928;|&#562;|&#7822;|&#376;|&#7926;|&#7924;|&#435;|&#590;|&#7934;|[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE])/g
}, {
  base: 'Z',
  letters: /(&#90;|&#9423;|&#65338;|&#377;|&#7824;|&#379;|&#381;|&#7826;|&#7828;|&#437;|&#548;|&#11391;|&#11371;|&#42850;|[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762])/g
}, {
  base: 'a',
  letters: /(&#97;|&#9424;|&#65345;|&#7834;|&#224;|&#225;|&#226;|&#7847;|&#7845;|&#7851;|&#7849;|&#227;|&#257;|&#259;|&#7857;|&#7855;|&#7861;|&#7859;|&#551;|&#481;|&#228;|&#479;|&#7843;|&#229;|&#507;|&#462;|&#513;|&#515;|&#7841;|&#7853;|&#7863;|&#7681;|&#261;|&#11365;|&#592;|[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250])/g
}, {
  base: 'aa',
  letters: /(&#42803;|[\uA733])/g
}, {
  base: 'ae',
  letters: /(&#230;|&#509;|&#483;|[\u00E6\u01FD\u01E3])/g
}, {
  base: 'ao',
  letters: /(&#42805;|[\uA735])/g
}, {
  base: 'au',
  letters: /(&#42807;|[\uA737])/g
}, {
  base: 'av',
  letters: /(&#42809;|&#42811;|[\uA739\uA73B])/g
}, {
  base: 'ay',
  letters: /(&#42813;|[\uA73D])/g
}, {
  base: 'b',
  letters: /(&#98;|&#9425;|&#65346;|&#7683;|&#7685;|&#7687;|&#384;|&#387;|&#595;|[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253])/g
}, {
  base: 'c',
  letters: /(&#99;|&#9426;|&#65347;|&#263;|&#265;|&#267;|&#269;|&#231;|&#7689;|&#392;|&#572;|&#42815;|&#8580;|[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184])/g
}, {
  base: 'd',
  letters: /(&#100;|&#9427;|&#65348;|&#7691;|&#271;|&#7693;|&#7697;|&#7699;|&#7695;|&#273;|&#396;|&#598;|&#599;|&#42874;|&#240;|[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A\u00F0])/g
}, {
  base: 'dz',
  letters: /(&#499;|&#454;|[\u01F3\u01C6])/g
}, {
  base: 'e',
  letters: /(&#101;|&#9428;|&#65349;|&#232;|&#233;|&#234;|&#7873;|&#7871;|&#7877;|&#7875;|&#7869;|&#275;|&#7701;|&#7703;|&#277;|&#279;|&#235;|&#7867;|&#283;|&#517;|&#519;|&#7865;|&#7879;|&#553;|&#7709;|&#281;|&#7705;|&#7707;|&#583;|&#603;|&#477;|[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD])/g
}, {
  base: 'f',
  letters: /(&#102;|&#9429;|&#65350;|&#7711;|&#402;|&#42876;|[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C])/g
}, {
  base: 'g',
  letters: /(&#103;|&#9430;|&#65351;|&#501;|&#285;|&#7713;|&#287;|&#289;|&#487;|&#291;|&#485;|&#608;|&#42913;|&#7545;|&#42879;|[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F])/g
}, {
  base: 'h',
  letters: /(&#104;|&#9431;|&#65352;|&#293;|&#7715;|&#7719;|&#543;|&#7717;|&#7721;|&#7723;|&#7830;|&#295;|&#11368;|&#11382;|&#613;|[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265])/g
}, {
  base: 'hv',
  letters: /(&#405;|[\u0195])/g
}, {
  base: 'i',
  letters: /(&#105;|&#9432;|&#65353;|&#236;|&#237;|&#238;|&#297;|&#299;|&#301;|&#239;|&#7727;|&#7881;|&#464;|&#521;|&#523;|&#7883;|&#303;|&#7725;|&#616;|&#305;|[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131])/g
}, {
  base: 'ij',
  letters: /(&#307;|[\u0133])/g
}, {
  base: 'j',
  letters: /(&#106;|&#9433;|&#65354;|&#309;|&#496;|&#585;|[\u006A\u24D9\uFF4A\u0135\u01F0\u0249])/g
}, {
  base: 'k',
  letters: /(&#107;|&#9434;|&#65355;|&#7729;|&#489;|&#7731;|&#311;|&#7733;|&#409;|&#11370;|&#42817;|&#42819;|&#42821;|&#42915;|[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3])/g
}, {
  base: 'l',
  letters: /(&#108;|&#9435;|&#65356;|&#320;|&#314;|&#318;|&#7735;|&#7737;|&#316;|&#7741;|&#7739;|&#322;|&#410;|&#619;|&#11361;|&#42825;|&#42881;|&#42823;|[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u0142\u019A\u026B\u2C61\uA749\uA781\uA747])/g
}, {
  base: 'lj',
  letters: /(&#457;|[\u01C9])/g
}, {
  base: 'm',
  letters: /(&#109;|&#9436;|&#65357;|&#7743;|&#7745;|&#7747;|&#625;|&#623;|[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F])/g
}, {
  base: 'n',
  letters: /(&#110;|&#9437;|&#65358;|&#505;|&#324;|&#241;|&#7749;|&#328;|&#7751;|&#326;|&#7755;|&#7753;|&#414;|&#626;|&#329;|&#42897;|&#42917;|&#331;|[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5\u014B])/g
}, {
  base: 'nj',
  letters: /(&#460;|[\u01CC])/g
}, {
  base: 'o',
  letters: /(&#111;|&#9438;|&#65359;|&#242;|&#243;|&#244;|&#7891;|&#7889;|&#7895;|&#7893;|&#245;|&#7757;|&#557;|&#7759;|&#333;|&#7761;|&#7763;|&#335;|&#559;|&#561;|&#246;|&#555;|&#7887;|&#337;|&#466;|&#525;|&#527;|&#417;|&#7901;|&#7899;|&#7905;|&#7903;|&#7907;|&#7885;|&#7897;|&#491;|&#493;|&#248;|&#511;|&#596;|&#42827;|&#42829;|&#629;|[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275])/g
}, {
  base: 'oe',
  letters: /(&#339;|[\u0153])/g
}, {
  base: 'oi',
  letters: /(&#419;|[\u01A3])/g
}, {
  base: 'ou',
  letters: /(&#547;|[\u0223])/g
}, {
  base: 'oo',
  letters: /(&#42831;|[\uA74F])/g
}, {
  base: 'p',
  letters: /(&#112;|&#9439;|&#65360;|&#7765;|&#7767;|&#421;|&#7549;|&#42833;|&#42835;|&#42837;|[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755])/g
}, {
  base: 'q',
  letters: /(&#113;|&#9440;|&#65361;|&#587;|&#42839;|&#42841;|[\u0071\u24E0\uFF51\u024B\uA757\uA759])/g
}, {
  base: 'r',
  letters: /(&#114;|&#9441;|&#65362;|&#341;|&#7769;|&#345;|&#529;|&#531;|&#7771;|&#7773;|&#343;|&#7775;|&#589;|&#637;|&#42843;|&#42919;|&#42883;|[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783])/g
}, {
  base: 's',
  letters: /(&#115;|&#9442;|&#65363;|&#347;|&#7781;|&#349;|&#7777;|&#353;|&#7783;|&#7779;|&#7785;|&#537;|&#351;|&#575;|&#42921;|&#42885;|&#7835;|&#383;|[\u0073\u24E2\uFF53\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B\u017F])/g
}, {
  base: 'ss',
  letters: /(&#223;|[\u00DF])/g
}, {
  base: 't',
  letters: /(&#116;|&#9443;|&#65364;|&#7787;|&#7831;|&#357;|&#7789;|&#539;|&#355;|&#7793;|&#7791;|&#359;|&#429;|&#648;|&#11366;|&#42887;|[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787])/g
}, {
  base: 'th',
  letters: /(&#254;|[\u00FE])/g
}, {
  base: 'tz',
  letters: /(&#42793;|[\uA729])/g
}, {
  base: 'u',
  letters: /(&#117;|&#9444;|&#65365;|&#249;|&#250;|&#251;|&#361;|&#7801;|&#363;|&#7803;|&#365;|&#252;|&#476;|&#472;|&#470;|&#474;|&#7911;|&#367;|&#369;|&#468;|&#533;|&#535;|&#432;|&#7915;|&#7913;|&#7919;|&#7917;|&#7921;|&#7909;|&#7795;|&#371;|&#7799;|&#7797;|&#649;|[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289])/g
}, {
  base: 'v',
  letters: /(&#118;|&#9445;|&#65366;|&#7805;|&#7807;|&#651;|&#42847;|&#652;|[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C])/g
}, {
  base: 'vy',
  letters: /(&#42849;|[\uA761])/g
}, {
  base: 'w',
  letters: /(&#119;|&#9446;|&#65367;|&#7809;|&#7811;|&#373;|&#7815;|&#7813;|&#7832;|&#7817;|&#11379;|[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73])/g
}, {
  base: 'x',
  letters: /(&#120;|&#9447;|&#65368;|&#7819;|&#7821;|[\u0078\u24E7\uFF58\u1E8B\u1E8D])/g
}, {
  base: 'y',
  letters: /(&#121;|&#9448;|&#65369;|&#7923;|&#253;|&#375;|&#7929;|&#563;|&#7823;|&#255;|&#7927;|&#7833;|&#7925;|&#436;|&#591;|&#7935;|[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF])/g
}, {
  base: 'z',
  letters: /(&#122;|&#9449;|&#65370;|&#378;|&#7825;|&#380;|&#382;|&#7827;|&#7829;|&#438;|&#549;|&#576;|&#11372;|&#42851;|[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763])/g
}];

var removeAccents = function removeAccents(str) {
  var formattedStr = str;
  lettersDiacritics.forEach(function (letterDiacritics) {
    formattedStr = formattedStr.replace(letterDiacritics.letters, letterDiacritics.base);
  });
  return formattedStr;
};

var normalizeString = function normalizeString(str) {
  return removeAccents(str).toLowerCase();
};

var getSubstringIndex = function getSubstringIndex(str, substr, ignoreAccents) {
  if (!ignoreAccents) {
    return str.toLowerCase().indexOf(substr.toLowerCase());
  }

  return normalizeString(str).indexOf(normalizeString(substr));
};

var isIE = function isIE() {
  return !!document.documentMode;
};

var isNumber = function isNumber(val) {
  return typeof val === 'number';
};

var keys = function keys(obj) {
  return obj === Object(obj) ? Object.keys(obj) : [];
};

var omit = function omit(obj) {
  var _ref;

  for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }

  var keys = (_ref = []).concat.apply(_ref, rest);

  return Object.keys(obj).reduce(function (acc, k) {
    if (obj.hasOwnProperty(k) && !keys.includes(k) && obj[k] !== undefined) {
      acc[k] = obj[k];
    }

    return acc;
  }, {});
};

var _excluded = ["style", "className", "classNames"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function createDefaultStyle(defaultStyle, getModifiers) {
  var enhance = function enhance(ComponentToWrap) {
    var DefaultStyleEnhancer = function DefaultStyleEnhancer(_ref) {
      var style = _ref.style,
          className = _ref.className,
          classNames = _ref.classNames,
          rest = _objectWithoutProperties(_ref, _excluded);

      var modifiers = getModifiers ? getModifiers(rest) : undefined;
      var styles = (0,es6["default"])(defaultStyle, {
        style: style,
        className: className,
        classNames: classNames
      }, modifiers);
      return /*#__PURE__*/react.createElement(ComponentToWrap, _extends({}, rest, {
        style: styles
      }));
    };

    var displayName = ComponentToWrap.displayName || ComponentToWrap.name || 'Component';
    DefaultStyleEnhancer.displayName = "defaultStyle(".concat(displayName, ")"); // return DefaultStyleEnhancer

    return /*#__PURE__*/react.forwardRef(function (props, ref) {
      return DefaultStyleEnhancer(_objectSpread(_objectSpread({}, props), {}, {
        ref: ref
      }));
    });
  };

  return enhance;
}

var _generateComponentKey = function _generateComponentKey(usedKeys, id) {
  if (!usedKeys.hasOwnProperty(id)) {
    usedKeys[id] = 0;
  } else {
    usedKeys[id]++;
  }

  return id + '_' + usedKeys[id];
};

function Highlighter(_ref) {
  var selectionStart = _ref.selectionStart,
      selectionEnd = _ref.selectionEnd,
      _ref$value = _ref.value,
      value = _ref$value === void 0 ? '' : _ref$value,
      onCaretPositionChange = _ref.onCaretPositionChange,
      containerRef = _ref.containerRef,
      children = _ref.children,
      singleLine = _ref.singleLine,
      style = _ref.style;

  var _useState = (0,react.useState)({
    left: undefined,
    top: undefined
  }),
      _useState2 = _slicedToArray(_useState, 2),
      position = _useState2[0],
      setPosition = _useState2[1];

  var _useState3 = (0,react.useState)(),
      _useState4 = _slicedToArray(_useState3, 2),
      caretElement = _useState4[0],
      setCaretElement = _useState4[1];

  (0,react.useEffect)(function () {
    notifyCaretPosition();
  });

  var notifyCaretPosition = function notifyCaretPosition() {
    if (!caretElement) {
      return;
    }

    var offsetLeft = caretElement.offsetLeft,
        offsetTop = caretElement.offsetTop;

    if (position.left === offsetLeft && position.top === offsetTop) {
      return;
    }

    var newPosition = {
      left: offsetLeft,
      top: offsetTop
    };
    setPosition(newPosition);
    onCaretPositionChange(newPosition);
  };

  var config = readConfigFromChildren(children);
  var caretPositionInMarkup;

  if (selectionEnd === selectionStart) {
    caretPositionInMarkup = mapPlainTextIndex(value, config, selectionStart, 'START');
  }

  var resultComponents = [];
  var componentKeys = {};
  var components = resultComponents;
  var substringComponentKey = 0;

  var textIteratee = function textIteratee(substr, index, indexInPlainText) {
    // check whether the caret element has to be inserted inside the current plain substring
    if (isNumber(caretPositionInMarkup) && caretPositionInMarkup >= index && caretPositionInMarkup <= index + substr.length) {
      // if yes, split substr at the caret position and insert the caret component
      var splitIndex = caretPositionInMarkup - index;
      components.push(renderSubstring(substr.substring(0, splitIndex), substringComponentKey)); // add all following substrings and mention components as children of the caret component

      components = [renderSubstring(substr.substring(splitIndex), substringComponentKey)];
    } else {
      components.push(renderSubstring(substr, substringComponentKey));
    }

    substringComponentKey++;
  };

  var mentionIteratee = function mentionIteratee(markup, index, indexInPlainText, id, display, mentionChildIndex, lastMentionEndIndex) {
    var key = _generateComponentKey(componentKeys, id);

    components.push(getMentionComponentForMatch(id, display, mentionChildIndex, key));
  };

  var renderSubstring = function renderSubstring(string, key) {
    // set substring span to hidden, so that Emojis are not shown double in Mobile Safari
    return /*#__PURE__*/react.createElement("span", _extends({}, style('substring'), {
      key: key
    }), string);
  };

  var getMentionComponentForMatch = function getMentionComponentForMatch(id, display, mentionChildIndex, key) {
    var props = {
      id: id,
      display: display,
      key: key
    };
    var child = react.Children.toArray(children)[mentionChildIndex];
    return /*#__PURE__*/react.cloneElement(child, props);
  };

  var renderHighlighterCaret = function renderHighlighterCaret(children) {
    return /*#__PURE__*/react.createElement("span", _extends({}, style('caret'), {
      ref: setCaretElement,
      key: "caret"
    }), children);
  };

  iterateMentionsMarkup(value, config, mentionIteratee, textIteratee); // append a span containing a space, to ensure the last text line has the correct height

  components.push(' ');

  if (components !== resultComponents) {
    // if a caret component is to be rendered, add all components that followed as its children
    resultComponents.push(renderHighlighterCaret(components));
  }

  return /*#__PURE__*/react.createElement("div", _extends({}, style, {
    ref: containerRef
  }), resultComponents);
}

Highlighter.propTypes = {
  selectionStart: (prop_types_default()).number,
  selectionEnd: (prop_types_default()).number,
  value: (prop_types_default()).string.isRequired,
  onCaretPositionChange: (prop_types_default()).func.isRequired,
  containerRef: prop_types_default().oneOfType([(prop_types_default()).func, prop_types_default().shape({
    current: typeof Element === 'undefined' ? (prop_types_default()).any : prop_types_default().instanceOf(Element)
  })]),
  children: prop_types_default().oneOfType([(prop_types_default()).element, prop_types_default().arrayOf((prop_types_default()).element)]).isRequired
};
var styled = createDefaultStyle({
  position: 'relative',
  boxSizing: 'border-box',
  width: '100%',
  color: 'transparent',
  overflow: 'hidden',
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  border: '1px solid transparent',
  textAlign: 'start',
  '&singleLine': {
    whiteSpace: 'pre',
    wordWrap: null
  },
  substring: {
    visibility: 'hidden'
  }
}, function (props) {
  return {
    '&singleLine': props.singleLine
  };
});
var Highlighter$1 = styled(Highlighter);

function Suggestion(_ref) {
  var id = _ref.id,
      focused = _ref.focused,
      ignoreAccents = _ref.ignoreAccents,
      index = _ref.index,
      onClick = _ref.onClick,
      onMouseEnter = _ref.onMouseEnter,
      query = _ref.query,
      renderSuggestion = _ref.renderSuggestion,
      suggestion = _ref.suggestion,
      style = _ref.style,
      className = _ref.className,
      classNames = _ref.classNames;
  var rest = {
    onClick: onClick,
    onMouseEnter: onMouseEnter
  };

  var renderContent = function renderContent() {
    var display = getDisplay();
    var highlightedDisplay = renderHighlightedDisplay(display);

    if (renderSuggestion) {
      return renderSuggestion(suggestion, query, highlightedDisplay, index, focused);
    }

    return highlightedDisplay;
  };

  var getDisplay = function getDisplay() {
    if (typeof suggestion === 'string') {
      return suggestion;
    }

    var id = suggestion.id,
        display = suggestion.display;

    if (id === undefined || !display) {
      return id;
    }

    return display;
  };

  var renderHighlightedDisplay = function renderHighlightedDisplay(display) {
    var i = getSubstringIndex(display, query, ignoreAccents);

    if (i === -1) {
      return /*#__PURE__*/react.createElement("span", style('display'), display);
    }

    return /*#__PURE__*/react.createElement("span", style('display'), display.substring(0, i), /*#__PURE__*/react.createElement("b", style('highlight'), display.substring(i, i + query.length)), display.substring(i + query.length));
  };

  return /*#__PURE__*/react.createElement("li", _extends({
    id: id,
    role: "option",
    "aria-selected": focused
  }, rest, style), renderContent());
}

Suggestion.propTypes = {
  id: (prop_types_default()).string.isRequired,
  query: (prop_types_default()).string.isRequired,
  index: (prop_types_default()).number.isRequired,
  ignoreAccents: (prop_types_default()).bool,
  suggestion: prop_types_default().oneOfType([(prop_types_default()).string, prop_types_default().shape({
    id: prop_types_default().oneOfType([(prop_types_default()).string, (prop_types_default()).number]).isRequired,
    display: (prop_types_default()).string
  })]).isRequired,
  renderSuggestion: (prop_types_default()).func,
  focused: (prop_types_default()).bool
};
var styled$1 = createDefaultStyle({
  cursor: 'pointer'
}, function (props) {
  return {
    '&focused': props.focused
  };
});
var Suggestion$1 = styled$1(Suggestion);

function LoadingIndicator(_ref) {
  var style = _ref.style,
      className = _ref.className,
      classNames = _ref.classNames;
  var styles = (0,es6["default"])(defaultstyle, {
    style: style,
    className: className,
    classNames: classNames
  });
  var spinnerStyles = styles('spinner');
  return /*#__PURE__*/react.createElement("div", styles, /*#__PURE__*/react.createElement("div", spinnerStyles, /*#__PURE__*/react.createElement("div", spinnerStyles(['element', 'element1'])), /*#__PURE__*/react.createElement("div", spinnerStyles(['element', 'element2'])), /*#__PURE__*/react.createElement("div", spinnerStyles(['element', 'element3'])), /*#__PURE__*/react.createElement("div", spinnerStyles(['element', 'element4'])), /*#__PURE__*/react.createElement("div", spinnerStyles(['element', 'element5']))));
}

var defaultstyle = {};

function SuggestionsOverlay(_ref) {
  var id = _ref.id,
      _ref$suggestions = _ref.suggestions,
      suggestions = _ref$suggestions === void 0 ? {} : _ref$suggestions,
      a11ySuggestionsListLabel = _ref.a11ySuggestionsListLabel,
      focusIndex = _ref.focusIndex,
      position = _ref.position,
      left = _ref.left,
      right = _ref.right,
      top = _ref.top,
      scrollFocusedIntoView = _ref.scrollFocusedIntoView,
      isLoading = _ref.isLoading,
      isOpened = _ref.isOpened,
      _ref$onSelect = _ref.onSelect,
      onSelect = _ref$onSelect === void 0 ? function () {
    return null;
  } : _ref$onSelect,
      ignoreAccents = _ref.ignoreAccents,
      containerRef = _ref.containerRef,
      children = _ref.children,
      style = _ref.style,
      customSuggestionsContainer = _ref.customSuggestionsContainer,
      onMouseDown = _ref.onMouseDown,
      onMouseEnter = _ref.onMouseEnter;

  var _useState = (0,react.useState)(undefined),
      _useState2 = _slicedToArray(_useState, 2),
      ulElement = _useState2[0],
      setUlElement = _useState2[1];

  (0,react.useEffect)(function () {
    if (!ulElement || ulElement.offsetHeight >= ulElement.scrollHeight || !scrollFocusedIntoView) {
      return;
    }

    var scrollTop = ulElement.scrollTop;

    var _ulElement$children$f = ulElement.children[focusIndex].getBoundingClientRect(),
        top = _ulElement$children$f.top,
        bottom = _ulElement$children$f.bottom;

    var _ulElement$getBoundin = ulElement.getBoundingClientRect(),
        topContainer = _ulElement$getBoundin.top;

    top = top - topContainer + scrollTop;
    bottom = bottom - topContainer + scrollTop;

    if (top < scrollTop) {
      ulElement.scrollTop = top;
    } else if (bottom > ulElement.offsetHeight) {
      ulElement.scrollTop = bottom - ulElement.offsetHeight;
    }
  }, [focusIndex, scrollFocusedIntoView, ulElement]);

  var renderSuggestions = function renderSuggestions() {
    var suggestionsToRender = /*#__PURE__*/react.createElement("ul", _extends({
      ref: setUlElement,
      id: id,
      role: "listbox",
      "aria-label": a11ySuggestionsListLabel
    }, style('list')), Object.values(suggestions).reduce(function (accResults, _ref2) {
      var results = _ref2.results,
          queryInfo = _ref2.queryInfo;
      return [].concat(_toConsumableArray(accResults), _toConsumableArray(results.map(function (result, index) {
        return renderSuggestion(result, queryInfo, accResults.length + index);
      })));
    }, []));
    if (customSuggestionsContainer) return customSuggestionsContainer(suggestionsToRender);
    return suggestionsToRender;
  };

  var renderSuggestion = function renderSuggestion(result, queryInfo, index) {
    var isFocused = index === focusIndex;
    var childIndex = queryInfo.childIndex,
        query = queryInfo.query;
    var renderSuggestion = react.Children.toArray(children)[childIndex].props.renderSuggestion;
    return /*#__PURE__*/react.createElement(Suggestion$1, {
      style: style('item'),
      key: "".concat(childIndex, "-").concat(getID(result)),
      id: getSuggestionHtmlId(id, index),
      query: query,
      index: index,
      ignoreAccents: ignoreAccents,
      renderSuggestion: renderSuggestion,
      suggestion: result,
      focused: isFocused,
      onClick: function onClick() {
        return select(result, queryInfo);
      },
      onMouseEnter: function onMouseEnter() {
        return handleMouseEnter(index);
      }
    });
  };

  var renderLoadingIndicator = function renderLoadingIndicator() {
    if (!isLoading) {
      return;
    }

    return /*#__PURE__*/react.createElement(LoadingIndicator, {
      style: style('loadingIndicator')
    });
  };

  var handleMouseEnter = function handleMouseEnter(index, ev) {
    if (onMouseEnter) {
      onMouseEnter(index);
    }
  };

  var select = function select(suggestion, queryInfo) {
    onSelect(suggestion, queryInfo);
  };

  var getID = function getID(suggestion) {
    if (typeof suggestion === 'string') {
      return suggestion;
    }

    return suggestion.id;
  };

  if (!isOpened) {
    return null;
  }

  return /*#__PURE__*/react.createElement("div", _extends({}, (0,inline/* default */.A)({
    position: position || 'absolute',
    left: left,
    right: right,
    top: top
  }, style), {
    onMouseDown: onMouseDown,
    ref: containerRef
  }), renderSuggestions(), renderLoadingIndicator());
}

SuggestionsOverlay.propTypes = {
  id: (prop_types_default()).string.isRequired,
  suggestions: (prop_types_default()).object.isRequired,
  a11ySuggestionsListLabel: (prop_types_default()).string,
  focusIndex: (prop_types_default()).number,
  position: (prop_types_default()).string,
  left: (prop_types_default()).number,
  right: (prop_types_default()).number,
  top: (prop_types_default()).number,
  scrollFocusedIntoView: (prop_types_default()).bool,
  isLoading: (prop_types_default()).bool,
  isOpened: (prop_types_default()).bool.isRequired,
  onSelect: (prop_types_default()).func,
  ignoreAccents: (prop_types_default()).bool,
  customSuggestionsContainer: (prop_types_default()).func,
  containerRef: prop_types_default().oneOfType([(prop_types_default()).func, prop_types_default().shape({
    current: typeof Element === 'undefined' ? (prop_types_default()).any : prop_types_default().instanceOf(Element)
  })])
};
var styled$2 = createDefaultStyle({
  zIndex: 1,
  backgroundColor: 'white',
  marginTop: 14,
  minWidth: 100,
  list: {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  }
});
var SuggestionsOverlay$1 = styled$2(SuggestionsOverlay);

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
var makeTriggerRegex = function makeTriggerRegex(trigger) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (trigger instanceof RegExp) {
    return trigger;
  } else {
    var allowSpaceInQuery = options.allowSpaceInQuery;
    var escapedTriggerChar = escapeRegex(trigger); // first capture group is the part to be replaced on completion
    // second capture group is for extracting the search query

    return new RegExp("(?:^|\\s)(".concat(escapedTriggerChar, "([^").concat(allowSpaceInQuery ? '' : '\\s').concat(escapedTriggerChar, "]*))$"));
  }
};

var getDataProvider = function getDataProvider(data, ignoreAccents) {
  if (data instanceof Array) {
    // if data is an array, create a function to query that
    return function (query, callback) {
      var results = [];

      for (var i = 0, l = data.length; i < l; ++i) {
        var display = data[i].display || data[i].id;

        if (getSubstringIndex(display, query, ignoreAccents) >= 0) {
          results.push(data[i]);
        }
      }

      return results;
    };
  } else {
    // expect data to be a query function
    return data;
  }
};

var KEY = {
  TAB: 9,
  RETURN: 13,
  ESC: 27,
  UP: 38,
  DOWN: 40
};
var isComposing = false;
var propTypes = {
  /**
   * If set to `true` a regular text input element will be rendered
   * instead of a textarea
   */
  singleLine: (prop_types_default()).bool,
  allowSpaceInQuery: (prop_types_default()).bool,
  allowSuggestionsAboveCursor: (prop_types_default()).bool,
  forceSuggestionsAboveCursor: (prop_types_default()).bool,
  ignoreAccents: (prop_types_default()).bool,
  a11ySuggestionsListLabel: (prop_types_default()).string,
  value: (prop_types_default()).string,
  onKeyDown: (prop_types_default()).func,
  customSuggestionsContainer: (prop_types_default()).func,
  onSelect: (prop_types_default()).func,
  onBlur: (prop_types_default()).func,
  onChange: (prop_types_default()).func,
  suggestionsPortalHost: typeof Element === 'undefined' ? (prop_types_default()).any : prop_types_default().PropTypes.instanceOf(Element),
  inputRef: prop_types_default().oneOfType([(prop_types_default()).func, prop_types_default().shape({
    current: typeof Element === 'undefined' ? (prop_types_default()).any : prop_types_default().instanceOf(Element)
  })]),
  children: prop_types_default().oneOfType([(prop_types_default()).element, prop_types_default().arrayOf((prop_types_default()).element)]).isRequired
};

var MentionsInput = /*#__PURE__*/function (_React$Component) {
  _inherits(MentionsInput, _React$Component);

  var _super = _createSuper(MentionsInput);

  function MentionsInput(_props) {
    var _this;

    _classCallCheck(this, MentionsInput);

    _this = _super.call(this, _props);

    _defineProperty((0,assertThisInitialized/* default */.A)(_this), "setContainerElement", function (el) {
      _this.containerElement = el;
    });

    _defineProperty((0,assertThisInitialized/* default */.A)(_this), "getInputProps", function () {
      var _this$props = _this.props,
          readOnly = _this$props.readOnly,
          disabled = _this$props.disabled,
          style = _this$props.style; // pass all props that neither we, nor substyle, consume through to the input control

      var props = omit(_this.props, ['style', 'classNames', 'className'], // substyle props
      keys(propTypes));
      return _objectSpread$1(_objectSpread$1(_objectSpread$1(_objectSpread$1({}, props), style('input')), {}, {
        value: _this.getPlainText(),
        onScroll: _this.updateHighlighterScroll
      }, !readOnly && !disabled && {
        onChange: _this.handleChange,
        onSelect: _this.handleSelect,
        onKeyDown: _this.handleKeyDown,
        onBlur: _this.handleBlur,
        onCompositionStart: _this.handleCompositionStart,
        onCompositionEnd: _this.handleCompositionEnd
      }), _this.isOpened() && {
        role: 'combobox',
        'aria-controls': _this.uuidSuggestionsOverlay,
        'aria-expanded': true,
        'aria-autocomplete': 'list',
        'aria-haspopup': 'listbox',
        'aria-activedescendant': getSuggestionHtmlId(_this.uuidSuggestionsOverlay, _this.state.focusIndex)
      });
    });

    _defineProperty((0,assertThisInitialized/* default */.A)(_this), "renderControl", function () {
      var _this$props2 = _this.props,
          singleLine = _this$props2.singleLine,
          style = _this$props2.style;

      var inputProps = _this.getInputProps();

      return /*#__PURE__*/react.createElement("div", style('control'), _this.renderHighlighter(), singleLine ? _this.renderInput(inputProps) : _this.renderTextarea(inputProps));
    });

    _defineProperty((0,assertThisInitialized/* default */.A)(_this), "renderInput", function (props) {
      return /*#__PURE__*/react.createElement("input", _extends({
        type: "text",
        ref: _this.setInputRef
      }, props));
    });

    _defineProperty((0,assertThisInitialized/* default */.A)(_this), "renderTextarea", function (props) {
      return /*#__PURE__*/react.createElement("textarea", _extends({
        ref: _this.setInputRef
      }, props));
    });

    _defineProperty((0,assertThisInitialized/* default */.A)(_this), "setInputRef", function (el) {
      _this.inputElement = el;
      var inputRef = _this.props.inputRef;

      if (typeof inputRef === 'function') {
        inputRef(el);
      } else if (inputRef) {
        inputRef.current = el;
      }
    });

    _defineProperty((0,assertThisInitialized/* default */.A)(_this), "setSuggestionsElement", function (el) {
      _this.suggestionsElement = el;
    });

    _defineProperty((0,assertThisInitialized/* default */.A)(_this), "renderSuggestionsOverlay", function () {
      if (!isNumber(_this.state.selectionStart)) {
        // do not show suggestions when the input does not have the focus
        return null;
      }

      var _this$state$suggestio = _this.state.suggestionsPosition,
          position = _this$state$suggestio.position,
          left = _this$state$suggestio.left,
          top = _this$state$suggestio.top,
          right = _this$state$suggestio.right;
      var suggestionsNode = /*#__PURE__*/react.createElement(SuggestionsOverlay$1, {
        id: _this.uuidSuggestionsOverlay,
        style: _this.props.style('suggestions'),
        position: position,
        left: left,
        top: top,
        right: right,
        focusIndex: _this.state.focusIndex,
        scrollFocusedIntoView: _this.state.scrollFocusedIntoView,
        containerRef: _this.setSuggestionsElement,
        suggestions: _this.state.suggestions,
        customSuggestionsContainer: _this.props.customSuggestionsContainer,
        onSelect: _this.addMention,
        onMouseDown: _this.handleSuggestionsMouseDown,
        onMouseEnter: _this.handleSuggestionsMouseEnter,
        isLoading: _this.isLoading(),
        isOpened: _this.isOpened(),
        ignoreAccents: _this.props.ignoreAccents,
        a11ySuggestionsListLabel: _this.props.a11ySuggestionsListLabel
      }, _this.props.children);

      if (_this.props.suggestionsPortalHost) {
        return /*#__PURE__*/react_dom.createPortal(suggestionsNode, _this.props.suggestionsPortalHost);
      } else {
        return suggestionsNode;
      }
    });

    _defineProperty((0,assertThisInitialized/* default */.A)(_this), "renderHighlighter", function () {
      var _this$state = _this.state,
          selectionStart = _this$state.selectionStart,
          selectionEnd = _this$state.selectionEnd;
      var _this$props3 = _this.props,
          singleLine = _this$props3.singleLine,
          children = _this$props3.children,
          value = _this$props3.value,
          style = _this$props3.style;
      return /*#__PURE__*/react.createElement(Highlighter$1, {
        containerRef: _this.setHighlighterElement,
        style: style('highlighter'),
        value: value,
        singleLine: singleLine,
        selectionStart: selectionStart,
        selectionEnd: selectionEnd,
        onCaretPositionChange: _this.handleCaretPositionChange
      }, children);
    });

    _defineProperty((0,assertThisInitialized/* default */.A)(_this), "setHighlighterElement", function (el) {
      _this.highlighterElement = el;
    });

    _defineProperty((0,assertThisInitialized/* default */.A)(_this), "handleCaretPositionChange", function (position) {
      _this.setState({
        caretPosition: position
      });
    });

    _defineProperty((0,assertThisInitialized/* default */.A)(_this), "getPlainText", function () {
      return getPlainText(_this.props.value || '', readConfigFromChildren(_this.props.children));
    });

    _defineProperty((0,assertThisInitialized/* default */.A)(_this), "executeOnChange", function (event) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      if (_this.props.onChange) {
        var _this$props4;

        return (_this$props4 = _this.props).onChange.apply(_this$props4, [event].concat(args));
      }

      if (_this.props.valueLink) {
        var _this$props$valueLink;

        return (_this$props$valueLink = _this.props.valueLink).requestChange.apply(_this$props$valueLink, [event.target.value].concat(args));
      }
    });

    _defineProperty((0,assertThisInitialized/* default */.A)(_this), "handleChange", function (ev) {
      isComposing = false;

      if (isIE()) {
        // if we are inside iframe, we need to find activeElement within its contentDocument
        var currentDocument = document.activeElement && document.activeElement.contentDocument || document;

        if (currentDocument.activeElement !== ev.target) {
          // fix an IE bug (blur from empty input element with placeholder attribute trigger "input" event)
          return;
        }
      }

      var value = _this.props.value || '';
      var config = readConfigFromChildren(_this.props.children);
      var newPlainTextValue = ev.target.value;
      var selectionStartBefore = _this.state.selectionStart;

      if (selectionStartBefore == null) {
        selectionStartBefore = ev.target.selectionStart;
      }

      var selectionEndBefore = _this.state.selectionEnd;

      if (selectionEndBefore == null) {
        selectionEndBefore = ev.target.selectionEnd;
      } // Derive the new value to set by applying the local change in the textarea's plain text


      var newValue = applyChangeToValue(value, newPlainTextValue, {
        selectionStartBefore: selectionStartBefore,
        selectionEndBefore: selectionEndBefore,
        selectionEndAfter: ev.target.selectionEnd
      }, config); // In case a mention is deleted, also adjust the new plain text value

      newPlainTextValue = getPlainText(newValue, config); // Save current selection after change to be able to restore caret position after rerendering

      var selectionStart = ev.target.selectionStart;
      var selectionEnd = ev.target.selectionEnd;
      var setSelectionAfterMentionChange = false; // Adjust selection range in case a mention will be deleted by the characters outside of the
      // selection range that are automatically deleted

      var startOfMention = findStartOfMentionInPlainText(value, config, selectionStart);

      if (startOfMention !== undefined && _this.state.selectionEnd > startOfMention) {
        // only if a deletion has taken place
        selectionStart = startOfMention + (ev.nativeEvent.data ? ev.nativeEvent.data.length : 0);
        selectionEnd = selectionStart;
        setSelectionAfterMentionChange = true;
      }

      _this.setState({
        selectionStart: selectionStart,
        selectionEnd: selectionEnd,
        setSelectionAfterMentionChange: setSelectionAfterMentionChange
      });

      var mentions = getMentions(newValue, config);

      if (ev.nativeEvent.isComposing && selectionStart === selectionEnd) {
        _this.updateMentionsQueries(_this.inputElement.value, selectionStart);
      } // Propagate change
      // let handleChange = this.getOnChange(this.props) || emptyFunction;


      var eventMock = {
        target: {
          value: newValue
        }
      }; // this.props.onChange.call(this, eventMock, newValue, newPlainTextValue, mentions);

      _this.executeOnChange(eventMock, newValue, newPlainTextValue, mentions);
    });

    _defineProperty((0,assertThisInitialized/* default */.A)(_this), "handleSelect", function (ev) {
      // keep track of selection range / caret position
      _this.setState({
        selectionStart: ev.target.selectionStart,
        selectionEnd: ev.target.selectionEnd
      }); // do nothing while a IME composition session is active


      if (isComposing) return; // refresh suggestions queries

      var el = _this.inputElement;

      if (ev.target.selectionStart === ev.target.selectionEnd) {
        _this.updateMentionsQueries(el.value, ev.target.selectionStart);
      } else {
        _this.clearSuggestions();
      } // sync highlighters scroll position


      _this.updateHighlighterScroll();

      _this.props.onSelect(ev);
    });

    _defineProperty((0,assertThisInitialized/* default */.A)(_this), "handleKeyDown", function (ev) {
      // do not intercept key events if the suggestions overlay is not shown
      var suggestionsCount = countSuggestions(_this.state.suggestions);

      if (suggestionsCount === 0 || !_this.suggestionsElement) {
        _this.props.onKeyDown(ev);

        return;
      }

      if (Object.values(KEY).indexOf(ev.keyCode) >= 0) {
        ev.preventDefault();
        ev.stopPropagation();
      }

      switch (ev.keyCode) {
        case KEY.ESC:
          {
            _this.clearSuggestions();

            return;
          }

        case KEY.DOWN:
          {
            _this.shiftFocus(+1);

            return;
          }

        case KEY.UP:
          {
            _this.shiftFocus(-1);

            return;
          }

        case KEY.RETURN:
          {
            _this.selectFocused();

            return;
          }

        case KEY.TAB:
          {
            _this.selectFocused();

            return;
          }

        default:
          {
            return;
          }
      }
    });

    _defineProperty((0,assertThisInitialized/* default */.A)(_this), "shiftFocus", function (delta) {
      var suggestionsCount = countSuggestions(_this.state.suggestions);

      _this.setState({
        focusIndex: (suggestionsCount + _this.state.focusIndex + delta) % suggestionsCount,
        scrollFocusedIntoView: true
      });
    });

    _defineProperty((0,assertThisInitialized/* default */.A)(_this), "selectFocused", function () {
      var _this$state2 = _this.state,
          suggestions = _this$state2.suggestions,
          focusIndex = _this$state2.focusIndex;
      var _Object$values$reduce = Object.values(suggestions).reduce(function (acc, _ref) {
        var results = _ref.results,
            queryInfo = _ref.queryInfo;
        return [].concat(_toConsumableArray(acc), _toConsumableArray(results.map(function (result) {
          return {
            result: result,
            queryInfo: queryInfo
          };
        })));
      }, [])[focusIndex],
          result = _Object$values$reduce.result,
          queryInfo = _Object$values$reduce.queryInfo;

      _this.addMention(result, queryInfo);

      _this.setState({
        focusIndex: 0
      });
    });

    _defineProperty((0,assertThisInitialized/* default */.A)(_this), "handleBlur", function (ev) {
      var clickedSuggestion = _this._suggestionsMouseDown;
      _this._suggestionsMouseDown = false; // only reset selection if the mousedown happened on an element
      // other than the suggestions overlay

      if (!clickedSuggestion) {
        _this.setState({
          selectionStart: null,
          selectionEnd: null
        });
      }

      window.setTimeout(function () {
        _this.updateHighlighterScroll();
      }, 1);

      _this.props.onBlur(ev, clickedSuggestion);
    });

    _defineProperty((0,assertThisInitialized/* default */.A)(_this), "handleSuggestionsMouseDown", function (ev) {
      _this._suggestionsMouseDown = true;
    });

    _defineProperty((0,assertThisInitialized/* default */.A)(_this), "handleSuggestionsMouseEnter", function (focusIndex) {
      _this.setState({
        focusIndex: focusIndex,
        scrollFocusedIntoView: false
      });
    });

    _defineProperty((0,assertThisInitialized/* default */.A)(_this), "updateSuggestionsPosition", function () {
      var caretPosition = _this.state.caretPosition;
      var _this$props5 = _this.props,
          suggestionsPortalHost = _this$props5.suggestionsPortalHost,
          allowSuggestionsAboveCursor = _this$props5.allowSuggestionsAboveCursor,
          forceSuggestionsAboveCursor = _this$props5.forceSuggestionsAboveCursor;

      if (!caretPosition || !_this.suggestionsElement) {
        return;
      }

      var suggestions = _this.suggestionsElement;
      var highlighter = _this.highlighterElement; // first get viewport-relative position (highlighter is offsetParent of caret):

      var caretOffsetParentRect = highlighter.getBoundingClientRect();
      var caretHeight = getComputedStyleLengthProp(highlighter, 'font-size');
      var viewportRelative = {
        left: caretOffsetParentRect.left + caretPosition.left,
        top: caretOffsetParentRect.top + caretPosition.top + caretHeight
      };
      var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

      if (!suggestions) {
        return;
      }

      var position = {}; // if suggestions menu is in a portal, update position to be releative to its portal node

      if (suggestionsPortalHost) {
        position.position = 'fixed';
        var left = viewportRelative.left;
        var top = viewportRelative.top; // absolute/fixed positioned elements are positioned according to their entire box including margins; so we remove margins here:

        left -= getComputedStyleLengthProp(suggestions, 'margin-left');
        top -= getComputedStyleLengthProp(suggestions, 'margin-top'); // take into account highlighter/textinput scrolling:

        left -= highlighter.scrollLeft;
        top -= highlighter.scrollTop; // guard for mentions suggestions list clipped by right edge of window

        var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

        if (left + suggestions.offsetWidth > viewportWidth) {
          position.left = Math.max(0, viewportWidth - suggestions.offsetWidth);
        } else {
          position.left = left;
        } // guard for mentions suggestions list clipped by bottom edge of window if allowSuggestionsAboveCursor set to true.
        // Move the list up above the caret if it's getting cut off by the bottom of the window, provided that the list height
        // is small enough to NOT cover up the caret


        if (allowSuggestionsAboveCursor && top + suggestions.offsetHeight > viewportHeight && suggestions.offsetHeight < top - caretHeight || forceSuggestionsAboveCursor) {
          position.top = Math.max(0, top - suggestions.offsetHeight - caretHeight);
        } else {
          position.top = top;
        }
      } else {
        var _left = caretPosition.left - highlighter.scrollLeft;

        var _top = caretPosition.top - highlighter.scrollTop; // guard for mentions suggestions list clipped by right edge of window


        if (_left + suggestions.offsetWidth > _this.containerElement.offsetWidth) {
          position.right = 0;
        } else {
          position.left = _left;
        } // guard for mentions suggestions list clipped by bottom edge of window if allowSuggestionsAboveCursor set to true.
        // move the list up above the caret if it's getting cut off by the bottom of the window, provided that the list height
        // is small enough to NOT cover up the caret


        if (allowSuggestionsAboveCursor && viewportRelative.top - highlighter.scrollTop + suggestions.offsetHeight > viewportHeight && suggestions.offsetHeight < caretOffsetParentRect.top - caretHeight - highlighter.scrollTop || forceSuggestionsAboveCursor) {
          position.top = _top - suggestions.offsetHeight - caretHeight;
        } else {
          position.top = _top;
        }
      }

      if (position.left === _this.state.suggestionsPosition.left && position.top === _this.state.suggestionsPosition.top && position.position === _this.state.suggestionsPosition.position) {
        return;
      }

      _this.setState({
        suggestionsPosition: position
      });
    });

    _defineProperty((0,assertThisInitialized/* default */.A)(_this), "updateHighlighterScroll", function () {
      var input = _this.inputElement;
      var highlighter = _this.highlighterElement;

      if (!input || !highlighter) {
        // since the invocation of this function is deferred,
        // the whole component may have been unmounted in the meanwhile
        return;
      }

      highlighter.scrollLeft = input.scrollLeft;
      highlighter.scrollTop = input.scrollTop;
      highlighter.height = input.height;
    });

    _defineProperty((0,assertThisInitialized/* default */.A)(_this), "handleCompositionStart", function () {
      isComposing = true;
    });

    _defineProperty((0,assertThisInitialized/* default */.A)(_this), "handleCompositionEnd", function () {
      isComposing = false;
    });

    _defineProperty((0,assertThisInitialized/* default */.A)(_this), "setSelection", function (selectionStart, selectionEnd) {
      if (selectionStart === null || selectionEnd === null) return;
      var el = _this.inputElement;

      if (el.setSelectionRange) {
        el.setSelectionRange(selectionStart, selectionEnd);
      } else if (el.createTextRange) {
        var range = el.createTextRange();
        range.collapse(true);
        range.moveEnd('character', selectionEnd);
        range.moveStart('character', selectionStart);
        range.select();
      }
    });

    _defineProperty((0,assertThisInitialized/* default */.A)(_this), "updateMentionsQueries", function (plainTextValue, caretPosition) {
      // Invalidate previous queries. Async results for previous queries will be neglected.
      _this._queryId++;
      _this.suggestions = {};

      _this.setState({
        suggestions: {}
      });

      var value = _this.props.value || '';
      var children = _this.props.children;
      var config = readConfigFromChildren(children);
      var positionInValue = mapPlainTextIndex(value, config, caretPosition, 'NULL'); // If caret is inside of mention, do not query

      if (positionInValue === null) {
        return;
      } // Extract substring in between the end of the previous mention and the caret


      var substringStartIndex = getEndOfLastMention(value.substring(0, positionInValue), config);
      var substring = plainTextValue.substring(substringStartIndex, caretPosition); // Check if suggestions have to be shown:
      // Match the trigger patterns of all Mention children on the extracted substring

      react.Children.forEach(children, function (child, childIndex) {
        if (!child) {
          return;
        }

        var regex = makeTriggerRegex(child.props.trigger, _this.props);
        var match = substring.match(regex);

        if (match) {
          var querySequenceStart = substringStartIndex + substring.indexOf(match[1], match.index);

          _this.queryData(match[2], childIndex, querySequenceStart, querySequenceStart + match[1].length, plainTextValue);
        }
      });
    });

    _defineProperty((0,assertThisInitialized/* default */.A)(_this), "clearSuggestions", function () {
      // Invalidate previous queries. Async results for previous queries will be neglected.
      _this._queryId++;
      _this.suggestions = {};

      _this.setState({
        suggestions: {},
        focusIndex: 0
      });
    });

    _defineProperty((0,assertThisInitialized/* default */.A)(_this), "queryData", function (query, childIndex, querySequenceStart, querySequenceEnd, plainTextValue) {
      var _this$props6 = _this.props,
          children = _this$props6.children,
          ignoreAccents = _this$props6.ignoreAccents;
      var mentionChild = react.Children.toArray(children)[childIndex];
      var provideData = getDataProvider(mentionChild.props.data, ignoreAccents);
      var syncResult = provideData(query, _this.updateSuggestions.bind(null, _this._queryId, childIndex, query, querySequenceStart, querySequenceEnd, plainTextValue));

      if (syncResult instanceof Array) {
        _this.updateSuggestions(_this._queryId, childIndex, query, querySequenceStart, querySequenceEnd, plainTextValue, syncResult);
      }
    });

    _defineProperty((0,assertThisInitialized/* default */.A)(_this), "updateSuggestions", function (queryId, childIndex, query, querySequenceStart, querySequenceEnd, plainTextValue, results) {
      // neglect async results from previous queries
      if (queryId !== _this._queryId) return; // save in property so that multiple sync state updates from different mentions sources
      // won't overwrite each other

      _this.suggestions = _objectSpread$1(_objectSpread$1({}, _this.suggestions), {}, _defineProperty({}, childIndex, {
        queryInfo: {
          childIndex: childIndex,
          query: query,
          querySequenceStart: querySequenceStart,
          querySequenceEnd: querySequenceEnd,
          plainTextValue: plainTextValue
        },
        results: results
      }));
      var focusIndex = _this.state.focusIndex;
      var suggestionsCount = countSuggestions(_this.suggestions);

      _this.setState({
        suggestions: _this.suggestions,
        focusIndex: focusIndex >= suggestionsCount ? Math.max(suggestionsCount - 1, 0) : focusIndex
      });
    });

    _defineProperty((0,assertThisInitialized/* default */.A)(_this), "addMention", function (_ref2, _ref3) {
      var id = _ref2.id,
          display = _ref2.display;
      var childIndex = _ref3.childIndex,
          querySequenceStart = _ref3.querySequenceStart,
          querySequenceEnd = _ref3.querySequenceEnd,
          plainTextValue = _ref3.plainTextValue;
      // Insert mention in the marked up value at the correct position
      var value = _this.props.value || '';
      var config = readConfigFromChildren(_this.props.children);
      var mentionsChild = react.Children.toArray(_this.props.children)[childIndex];
      var _mentionsChild$props = mentionsChild.props,
          markup = _mentionsChild$props.markup,
          displayTransform = _mentionsChild$props.displayTransform,
          appendSpaceOnAdd = _mentionsChild$props.appendSpaceOnAdd,
          onAdd = _mentionsChild$props.onAdd;
      var start = mapPlainTextIndex(value, config, querySequenceStart, 'START');
      var end = start + querySequenceEnd - querySequenceStart;
      var insert = makeMentionsMarkup(markup, id, display);

      if (appendSpaceOnAdd) {
        insert += ' ';
      }

      var newValue = spliceString(value, start, end, insert); // Refocus input and set caret position to end of mention

      _this.inputElement.focus();

      var displayValue = displayTransform(id, display);

      if (appendSpaceOnAdd) {
        displayValue += ' ';
      }

      var newCaretPosition = querySequenceStart + displayValue.length;

      _this.setState({
        selectionStart: newCaretPosition,
        selectionEnd: newCaretPosition,
        setSelectionAfterMentionChange: true
      }); // Propagate change


      var eventMock = {
        target: {
          value: newValue
        }
      };
      var mentions = getMentions(newValue, config);
      var newPlainTextValue = spliceString(plainTextValue, querySequenceStart, querySequenceEnd, displayValue);

      _this.executeOnChange(eventMock, newValue, newPlainTextValue, mentions);

      if (onAdd) {
        onAdd(id, display, start, end);
      } // Make sure the suggestions overlay is closed


      _this.clearSuggestions();
    });

    _defineProperty((0,assertThisInitialized/* default */.A)(_this), "isLoading", function () {
      var isLoading = false;
      react.Children.forEach(_this.props.children, function (child) {
        isLoading = isLoading || child && child.props.isLoading;
      });
      return isLoading;
    });

    _defineProperty((0,assertThisInitialized/* default */.A)(_this), "isOpened", function () {
      return isNumber(_this.state.selectionStart) && (countSuggestions(_this.state.suggestions) !== 0 || _this.isLoading());
    });

    _defineProperty((0,assertThisInitialized/* default */.A)(_this), "_queryId", 0);

    _this.suggestions = {};
    _this.uuidSuggestionsOverlay = Math.random().toString(16).substring(2);
    _this.handleCopy = _this.handleCopy.bind((0,assertThisInitialized/* default */.A)(_this));
    _this.handleCut = _this.handleCut.bind((0,assertThisInitialized/* default */.A)(_this));
    _this.handlePaste = _this.handlePaste.bind((0,assertThisInitialized/* default */.A)(_this));
    _this.state = {
      focusIndex: 0,
      selectionStart: null,
      selectionEnd: null,
      suggestions: {},
      caretPosition: null,
      suggestionsPosition: {},
      setSelectionAfterHandlePaste: false
    };
    return _this;
  }

  _createClass(MentionsInput, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener('copy', this.handleCopy);
      document.addEventListener('cut', this.handleCut);
      document.addEventListener('paste', this.handlePaste);
      this.updateSuggestionsPosition();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      // Update position of suggestions unless this componentDidUpdate was
      // triggered by an update to suggestionsPosition.
      if (prevState.suggestionsPosition === this.state.suggestionsPosition) {
        this.updateSuggestionsPosition();
      } // maintain selection in case a mention is added/removed causing
      // the cursor to jump to the end


      if (this.state.setSelectionAfterMentionChange) {
        this.setState({
          setSelectionAfterMentionChange: false
        });
        this.setSelection(this.state.selectionStart, this.state.selectionEnd);
      }

      if (this.state.setSelectionAfterHandlePaste) {
        this.setState({
          setSelectionAfterHandlePaste: false
        });
        this.setSelection(this.state.selectionStart, this.state.selectionEnd);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('copy', this.handleCopy);
      document.removeEventListener('cut', this.handleCut);
      document.removeEventListener('paste', this.handlePaste);
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/react.createElement("div", _extends({
        ref: this.setContainerElement
      }, this.props.style), this.renderControl(), this.renderSuggestionsOverlay());
    }
  }, {
    key: "handlePaste",
    value: function handlePaste(event) {
      if (event.target !== this.inputElement) {
        return;
      }

      if (!this.supportsClipboardActions(event)) {
        return;
      }

      event.preventDefault();
      var _this$state3 = this.state,
          selectionStart = _this$state3.selectionStart,
          selectionEnd = _this$state3.selectionEnd;
      var _this$props7 = this.props,
          value = _this$props7.value,
          children = _this$props7.children;
      var config = readConfigFromChildren(children);
      var markupStartIndex = mapPlainTextIndex(value, config, selectionStart, 'START');
      var markupEndIndex = mapPlainTextIndex(value, config, selectionEnd, 'END');
      var pastedMentions = event.clipboardData.getData('text/react-mentions');
      var pastedData = event.clipboardData.getData('text/plain');
      var newValue = spliceString(value, markupStartIndex, markupEndIndex, pastedMentions || pastedData).replace(/\r/g, '');
      var newPlainTextValue = getPlainText(newValue, config);
      var eventMock = {
        target: _objectSpread$1(_objectSpread$1({}, event.target), {}, {
          value: newValue
        })
      };
      this.executeOnChange(eventMock, newValue, newPlainTextValue, getMentions(newValue, config)); // Move the cursor position to the end of the pasted data

      var startOfMention = findStartOfMentionInPlainText(value, config, selectionStart);
      var nextPos = (startOfMention || selectionStart) + getPlainText(pastedMentions || pastedData, config).length;
      this.setState({
        selectionStart: nextPos,
        selectionEnd: nextPos,
        setSelectionAfterHandlePaste: true
      });
    }
  }, {
    key: "saveSelectionToClipboard",
    value: function saveSelectionToClipboard(event) {
      // use the actual selectionStart & selectionEnd instead of the one stored
      // in state to ensure copy & paste also works on disabled inputs & textareas
      var selectionStart = this.inputElement.selectionStart;
      var selectionEnd = this.inputElement.selectionEnd;
      var _this$props8 = this.props,
          children = _this$props8.children,
          value = _this$props8.value;
      var config = readConfigFromChildren(children);
      var markupStartIndex = mapPlainTextIndex(value, config, selectionStart, 'START');
      var markupEndIndex = mapPlainTextIndex(value, config, selectionEnd, 'END');
      event.clipboardData.setData('text/plain', event.target.value.slice(selectionStart, selectionEnd));
      event.clipboardData.setData('text/react-mentions', value.slice(markupStartIndex, markupEndIndex));
    }
  }, {
    key: "supportsClipboardActions",
    value: function supportsClipboardActions(event) {
      return !!event.clipboardData;
    }
  }, {
    key: "handleCopy",
    value: function handleCopy(event) {
      if (event.target !== this.inputElement) {
        return;
      }

      if (!this.supportsClipboardActions(event)) {
        return;
      }

      event.preventDefault();
      this.saveSelectionToClipboard(event);
    }
  }, {
    key: "handleCut",
    value: function handleCut(event) {
      if (event.target !== this.inputElement) {
        return;
      }

      if (!this.supportsClipboardActions(event)) {
        return;
      }

      event.preventDefault();
      this.saveSelectionToClipboard(event);
      var _this$state4 = this.state,
          selectionStart = _this$state4.selectionStart,
          selectionEnd = _this$state4.selectionEnd;
      var _this$props9 = this.props,
          children = _this$props9.children,
          value = _this$props9.value;
      var config = readConfigFromChildren(children);
      var markupStartIndex = mapPlainTextIndex(value, config, selectionStart, 'START');
      var markupEndIndex = mapPlainTextIndex(value, config, selectionEnd, 'END');
      var newValue = [value.slice(0, markupStartIndex), value.slice(markupEndIndex)].join('');
      var newPlainTextValue = getPlainText(newValue, config);
      var eventMock = {
        target: _objectSpread$1(_objectSpread$1({}, event.target), {}, {
          value: newPlainTextValue
        })
      };
      this.executeOnChange(eventMock, newValue, newPlainTextValue, getMentions(value, config));
    } // Handle input element's change event

  }]);

  return MentionsInput;
}(react.Component);
/**
 * Returns the computed length property value for the provided element.
 * Note: According to spec and testing, can count on length values coming back in pixels. See https://developer.mozilla.org/en-US/docs/Web/CSS/used_value#Difference_from_computed_value
 */


_defineProperty(MentionsInput, "propTypes", propTypes);

_defineProperty(MentionsInput, "defaultProps", {
  ignoreAccents: false,
  singleLine: false,
  allowSuggestionsAboveCursor: false,
  onKeyDown: function onKeyDown() {
    return null;
  },
  onSelect: function onSelect() {
    return null;
  },
  onBlur: function onBlur() {
    return null;
  }
});

var getComputedStyleLengthProp = function getComputedStyleLengthProp(forElement, propertyName) {
  var length = parseFloat(window.getComputedStyle(forElement, null).getPropertyValue(propertyName));
  return isFinite(length) ? length : 0;
};

var isMobileSafari = typeof navigator !== 'undefined' && /iPhone|iPad|iPod/i.test(navigator.userAgent);
var styled$3 = createDefaultStyle({
  position: 'relative',
  overflowY: 'visible',
  input: {
    display: 'block',
    width: '100%',
    position: 'absolute',
    margin: 0,
    top: 0,
    left: 0,
    boxSizing: 'border-box',
    backgroundColor: 'transparent',
    fontFamily: 'inherit',
    fontSize: 'inherit',
    letterSpacing: 'inherit'
  },
  '&multiLine': {
    input: _objectSpread$1({
      height: '100%',
      bottom: 0,
      overflow: 'hidden',
      resize: 'none'
    }, isMobileSafari ? {
      marginTop: 1,
      marginLeft: -3
    } : null)
  }
}, function (_ref4) {
  var singleLine = _ref4.singleLine;
  return {
    '&singleLine': singleLine,
    '&multiLine': !singleLine
  };
});
var MentionsInput$1 = styled$3(MentionsInput);

var defaultStyle = {
  fontWeight: 'inherit'
};

var Mention = function Mention(_ref) {
  var display = _ref.display,
      style = _ref.style,
      className = _ref.className,
      classNames = _ref.classNames;
  var styles = (0,es6["default"])(defaultStyle, {
    style: style,
    className: className,
    classNames: classNames
  });
  return /*#__PURE__*/react.createElement("strong", styles, display);
};

Mention.propTypes = {
  /**
   * Called when a new mention is added in the input
   *
   * Example:
   *
   * ```js
   * function(id, display) {
   *   console.log("user " + display + " was mentioned!");
   * }
   * ```
   */
  onAdd: (prop_types_default()).func,
  onRemove: (prop_types_default()).func,
  renderSuggestion: (prop_types_default()).func,
  trigger: prop_types_default().oneOfType([(prop_types_default()).string, prop_types_default().instanceOf(RegExp)]),
  markup: (prop_types_default()).string,
  displayTransform: (prop_types_default()).func,

  /**
   * If set to `true` spaces will not interrupt matching suggestions
   */
  allowSpaceInQuery: (prop_types_default()).bool,
  isLoading: (prop_types_default()).bool
};
Mention.defaultProps = {
  trigger: '@',
  markup: '@[__display__](__id__)',
  displayTransform: function displayTransform(id, display) {
    return display || id;
  },
  onAdd: function onAdd() {
    return null;
  },
  onRemove: function onRemove() {
    return null;
  },
  renderSuggestion: null,
  isLoading: false,
  appendSpaceOnAdd: false
};




/***/ }),

/***/ 54597:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ _arrayWithHoles)
/* harmony export */ });
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

/***/ }),

/***/ 91799:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ _arrayWithoutHoles)
/* harmony export */ });
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

/***/ }),

/***/ 20589:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ _assertThisInitialized)
/* harmony export */ });
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

/***/ }),

/***/ 23113:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ _iterableToArray)
/* harmony export */ });
function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

/***/ }),

/***/ 85742:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ _iterableToArrayLimit)
/* harmony export */ });
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

/***/ }),

/***/ 93278:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ _nonIterableRest)
/* harmony export */ });
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

/***/ }),

/***/ 61811:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ _nonIterableSpread)
/* harmony export */ });
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

/***/ }),

/***/ 92151:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ _objectWithoutPropertiesLoose)
/* harmony export */ });
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

/***/ }),

/***/ 84306:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ _setPrototypeOf)
/* harmony export */ });
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

/***/ }),

/***/ 77128:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ _typeof)
/* harmony export */ });
function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

/***/ }),

/***/ 20465:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var React = __importStar(__webpack_require__(96540));
var utils_1 = __webpack_require__(21813);
var types_1 = __webpack_require__(58105);
var INCREASE_KEYS = ["ArrowRight", "ArrowUp", "k", "PageUp"];
var DECREASE_KEYS = ["ArrowLeft", "ArrowDown", "j", "PageDown"];
var Range = /** @class */ (function (_super) {
    __extends(Range, _super);
    function Range(props) {
        var _this = _super.call(this, props) || this;
        _this.trackRef = React.createRef();
        _this.thumbRefs = [];
        _this.state = {
            draggedTrackPos: [-1, -1],
            draggedThumbIndex: -1,
            thumbZIndexes: new Array(_this.props.values.length).fill(0).map(function (t, i) { return i; }),
            isChanged: false,
            markOffsets: [],
        };
        _this.getOffsets = function () {
            var _a = _this.props, direction = _a.direction, values = _a.values, min = _a.min, max = _a.max;
            var trackElement = _this.trackRef.current;
            if (!trackElement) {
                console.warn("No track element found.");
                return [];
            }
            var trackRect = trackElement.getBoundingClientRect();
            var trackPadding = (0, utils_1.getPaddingAndBorder)(trackElement);
            return _this.getThumbs().map(function (thumb, index) {
                var thumbOffsets = { x: 0, y: 0 };
                var thumbRect = thumb.getBoundingClientRect();
                var thumbMargins = (0, utils_1.getMargin)(thumb);
                switch (direction) {
                    case types_1.Direction.Right:
                        thumbOffsets.x = (thumbMargins.left + trackPadding.left) * -1;
                        thumbOffsets.y =
                            ((thumbRect.height - trackRect.height) / 2 + trackPadding.top) * -1;
                        thumbOffsets.x +=
                            trackRect.width * (0, utils_1.relativeValue)(values[index], min, max) -
                                thumbRect.width / 2;
                        return thumbOffsets;
                    case types_1.Direction.Left:
                        thumbOffsets.x = (thumbMargins.right + trackPadding.right) * -1;
                        thumbOffsets.y =
                            ((thumbRect.height - trackRect.height) / 2 + trackPadding.top) * -1;
                        thumbOffsets.x +=
                            trackRect.width -
                                trackRect.width * (0, utils_1.relativeValue)(values[index], min, max) -
                                thumbRect.width / 2;
                        return thumbOffsets;
                    case types_1.Direction.Up:
                        thumbOffsets.x =
                            ((thumbRect.width - trackRect.width) / 2 +
                                thumbMargins.left +
                                trackPadding.left) *
                                -1;
                        thumbOffsets.y = -trackPadding.left;
                        thumbOffsets.y +=
                            trackRect.height -
                                trackRect.height * (0, utils_1.relativeValue)(values[index], min, max) -
                                thumbRect.height / 2;
                        return thumbOffsets;
                    case types_1.Direction.Down:
                        thumbOffsets.x =
                            ((thumbRect.width - trackRect.width) / 2 +
                                thumbMargins.left +
                                trackPadding.left) *
                                -1;
                        thumbOffsets.y = -trackPadding.left;
                        thumbOffsets.y +=
                            trackRect.height * (0, utils_1.relativeValue)(values[index], min, max) -
                                thumbRect.height / 2;
                        return thumbOffsets;
                    default:
                        return (0, utils_1.assertUnreachable)(direction);
                }
            });
        };
        _this.getThumbs = function () {
            if (_this.trackRef && _this.trackRef.current) {
                return Array.from(_this.trackRef.current.children).filter(function (el) {
                    return el.hasAttribute("aria-valuenow");
                });
            }
            console.warn("No thumbs found in the track container. Did you forget to pass & spread the `props` param in renderTrack?");
            return [];
        };
        _this.getTargetIndex = function (e) {
            return _this.getThumbs().findIndex(function (child) { return child === e.target || child.contains(e.target); });
        };
        _this.addTouchEvents = function (e) {
            document.addEventListener("touchmove", _this.schdOnTouchMove, {
                passive: false,
            });
            document.addEventListener("touchend", _this.schdOnEnd, {
                passive: false,
            });
            document.addEventListener("touchcancel", _this.schdOnEnd, {
                passive: false,
            });
        };
        _this.addMouseEvents = function (e) {
            document.addEventListener("mousemove", _this.schdOnMouseMove);
            document.addEventListener("mouseup", _this.schdOnEnd);
        };
        _this.onMouseDownTrack = function (e) {
            var _a;
            if (e.button !== 0 || (0, utils_1.isIOS)())
                return;
            e.persist();
            e.preventDefault();
            _this.addMouseEvents(e.nativeEvent);
            if (_this.props.values.length > 1 && _this.props.draggableTrack) {
                if (_this.thumbRefs.some(function (thumbRef) { var _a; return (_a = thumbRef.current) === null || _a === void 0 ? void 0 : _a.contains(e.target); }))
                    return;
                // handle dragging the whole track
                _this.setState({
                    draggedTrackPos: [e.clientX, e.clientY],
                }, function () { return _this.onMove(e.clientX, e.clientY); });
            }
            else {
                // get the index of the thumb that is closest to the place where the track is clicked
                var draggedThumbIndex = (0, utils_1.getClosestThumbIndex)(_this.thumbRefs.map(function (t) { return t.current; }), e.clientX, e.clientY, _this.props.direction);
                // move the thumb which is closest to the place where the track is clicked
                (_a = _this.thumbRefs[draggedThumbIndex].current) === null || _a === void 0 ? void 0 : _a.focus();
                _this.setState({
                    draggedThumbIndex: draggedThumbIndex,
                }, function () { return _this.onMove(e.clientX, e.clientY); });
            }
        };
        _this.onResize = function () {
            (0, utils_1.translateThumbs)(_this.getThumbs(), _this.getOffsets(), _this.props.rtl);
            _this.calculateMarkOffsets();
        };
        _this.onTouchStartTrack = function (e) {
            var _a;
            e.persist();
            _this.addTouchEvents(e.nativeEvent);
            if (_this.props.values.length > 1 && _this.props.draggableTrack) {
                if (_this.thumbRefs.some(function (thumbRef) { var _a; return (_a = thumbRef.current) === null || _a === void 0 ? void 0 : _a.contains(e.target); }))
                    return;
                // handle dragging the whole track
                _this.setState({
                    draggedTrackPos: [e.touches[0].clientX, e.touches[0].clientY],
                }, function () { return _this.onMove(e.touches[0].clientX, e.touches[0].clientY); });
            }
            else {
                // get the index of the thumb that is closest to the place where the track is clicked
                var draggedThumbIndex = (0, utils_1.getClosestThumbIndex)(_this.thumbRefs.map(function (t) { return t.current; }), e.touches[0].clientX, e.touches[0].clientY, _this.props.direction);
                // move the thumb which is closest to the place where the track is clicked
                (_a = _this.thumbRefs[draggedThumbIndex].current) === null || _a === void 0 ? void 0 : _a.focus();
                _this.setState({
                    draggedThumbIndex: draggedThumbIndex,
                }, function () { return _this.onMove(e.touches[0].clientX, e.touches[0].clientY); });
            }
        };
        _this.onMouseOrTouchStart = function (e) {
            if (_this.props.disabled)
                return;
            var isTouch = (0, utils_1.isTouchEvent)(e);
            if (!isTouch && e.button !== 0)
                return;
            var index = _this.getTargetIndex(e);
            if (index === -1)
                return;
            if (isTouch) {
                _this.addTouchEvents(e);
            }
            else {
                _this.addMouseEvents(e);
            }
            _this.setState({
                draggedThumbIndex: index,
                thumbZIndexes: _this.state.thumbZIndexes.map(function (t, i) {
                    if (i === index) {
                        return Math.max.apply(Math, _this.state.thumbZIndexes);
                    }
                    return t <= _this.state.thumbZIndexes[index] ? t : t - 1;
                }),
            });
        };
        _this.onMouseMove = function (e) {
            e.preventDefault();
            _this.onMove(e.clientX, e.clientY);
        };
        _this.onTouchMove = function (e) {
            e.preventDefault();
            _this.onMove(e.touches[0].clientX, e.touches[0].clientY);
        };
        _this.onKeyDown = function (e) {
            var _a = _this.props, values = _a.values, onChange = _a.onChange, step = _a.step, rtl = _a.rtl, direction = _a.direction;
            var isChanged = _this.state.isChanged;
            var index = _this.getTargetIndex(e.nativeEvent);
            var inverter = rtl || direction === types_1.Direction.Left || direction === types_1.Direction.Down
                ? -1
                : 1;
            if (index === -1)
                return;
            if (INCREASE_KEYS.includes(e.key)) {
                e.preventDefault();
                _this.setState({
                    draggedThumbIndex: index,
                    isChanged: true,
                });
                onChange((0, utils_1.replaceAt)(values, index, _this.normalizeValue(values[index] + inverter * (e.key === "PageUp" ? step * 10 : step), index)));
            }
            else if (DECREASE_KEYS.includes(e.key)) {
                e.preventDefault();
                _this.setState({
                    draggedThumbIndex: index,
                    isChanged: true,
                });
                onChange((0, utils_1.replaceAt)(values, index, _this.normalizeValue(values[index] -
                    inverter * (e.key === "PageDown" ? step * 10 : step), index)));
            }
            else if (e.key === "Tab") {
                _this.setState({ draggedThumbIndex: -1 }, function () {
                    // If key pressed when thumb was moving, fire onFinalChange
                    if (isChanged) {
                        _this.fireOnFinalChange();
                    }
                });
            }
            else {
                if (isChanged) {
                    _this.fireOnFinalChange();
                }
            }
        };
        _this.onKeyUp = function (e) {
            var isChanged = _this.state.isChanged;
            _this.setState({
                draggedThumbIndex: -1,
            }, function () {
                if (isChanged) {
                    _this.fireOnFinalChange();
                }
            });
        };
        _this.onMove = function (clientX, clientY) {
            var _a = _this.state, draggedThumbIndex = _a.draggedThumbIndex, draggedTrackPos = _a.draggedTrackPos;
            var _b = _this.props, direction = _b.direction, min = _b.min, max = _b.max, onChange = _b.onChange, values = _b.values, step = _b.step, rtl = _b.rtl;
            if (draggedThumbIndex === -1 &&
                draggedTrackPos[0] === -1 &&
                draggedTrackPos[1] === -1)
                return null;
            var trackElement = _this.trackRef.current;
            // If component was closed down prematurely, A last onMove could be triggered based on requestAnimationFrame()
            if (!trackElement)
                return null;
            var trackRect = trackElement.getBoundingClientRect();
            var trackLength = (0, utils_1.isVertical)(direction)
                ? trackRect.height
                : trackRect.width;
            if (draggedTrackPos[0] !== -1 && draggedTrackPos[1] !== -1) {
                // calculate how much it moved since the last update
                var dX = clientX - draggedTrackPos[0];
                var dY = clientY - draggedTrackPos[1];
                // calculate the delta of the value
                var deltaValue = 0;
                switch (direction) {
                    case types_1.Direction.Right:
                    case types_1.Direction.Left:
                        deltaValue = (dX / trackLength) * (max - min);
                        break;
                    case types_1.Direction.Down:
                    case types_1.Direction.Up:
                        deltaValue = (dY / trackLength) * (max - min);
                        break;
                    default:
                        (0, utils_1.assertUnreachable)(direction);
                }
                // invert for RTL
                if (rtl) {
                    deltaValue *= -1;
                }
                if (Math.abs(deltaValue) >= step / 2) {
                    // adjust delta so it fits into the range
                    for (var i = 0; i < _this.thumbRefs.length; i++) {
                        if ((values[i] === max && Math.sign(deltaValue) === 1) ||
                            (values[i] === min && Math.sign(deltaValue) === -1))
                            return;
                        var thumbValue = values[i] + deltaValue;
                        if (thumbValue > max)
                            deltaValue = max - values[i];
                        else if (thumbValue < min)
                            deltaValue = min - values[i];
                    }
                    // add the delta to each thumb
                    var newValues = values.slice(0);
                    for (var i = 0; i < _this.thumbRefs.length; i++) {
                        newValues = (0, utils_1.replaceAt)(newValues, i, _this.normalizeValue(values[i] + deltaValue, i));
                    }
                    _this.setState({
                        draggedTrackPos: [clientX, clientY],
                    });
                    onChange(newValues);
                }
            }
            else {
                var newValue = 0;
                switch (direction) {
                    case types_1.Direction.Right:
                        newValue =
                            ((clientX - trackRect.left) / trackLength) * (max - min) + min;
                        break;
                    case types_1.Direction.Left:
                        newValue =
                            ((trackLength - (clientX - trackRect.left)) / trackLength) *
                                (max - min) +
                                min;
                        break;
                    case types_1.Direction.Down:
                        newValue =
                            ((clientY - trackRect.top) / trackLength) * (max - min) + min;
                        break;
                    case types_1.Direction.Up:
                        newValue =
                            ((trackLength - (clientY - trackRect.top)) / trackLength) *
                                (max - min) +
                                min;
                        break;
                    default:
                        (0, utils_1.assertUnreachable)(direction);
                }
                // invert for RTL
                if (rtl) {
                    newValue = max + min - newValue;
                }
                if (Math.abs(values[draggedThumbIndex] - newValue) >= step / 2) {
                    onChange((0, utils_1.replaceAt)(values, draggedThumbIndex, _this.normalizeValue(newValue, draggedThumbIndex)));
                }
            }
        };
        _this.normalizeValue = function (value, index) {
            var _a = _this.props, min = _a.min, max = _a.max, step = _a.step, allowOverlap = _a.allowOverlap, values = _a.values;
            return (0, utils_1.normalizeValue)(value, index, min, max, step, allowOverlap, values);
        };
        _this.onEnd = function (e) {
            e.preventDefault();
            document.removeEventListener("mousemove", _this.schdOnMouseMove);
            document.removeEventListener("touchmove", _this.schdOnTouchMove);
            document.removeEventListener("mouseup", _this.schdOnEnd);
            document.removeEventListener("touchend", _this.schdOnEnd);
            document.removeEventListener("touchcancel", _this.schdOnEnd);
            if (_this.state.draggedThumbIndex === -1 &&
                _this.state.draggedTrackPos[0] === -1 &&
                _this.state.draggedTrackPos[1] === -1)
                return null;
            _this.setState({ draggedThumbIndex: -1, draggedTrackPos: [-1, -1] }, function () {
                _this.fireOnFinalChange();
            });
        };
        _this.fireOnFinalChange = function () {
            _this.setState({ isChanged: false });
            var _a = _this.props, onFinalChange = _a.onFinalChange, values = _a.values;
            if (onFinalChange) {
                onFinalChange(values);
            }
        };
        _this.updateMarkRefs = function (props) {
            if (!props.renderMark) {
                // don't create mark refs unless we are rendering marks
                _this.numOfMarks = undefined;
                _this.markRefs = undefined;
                return;
            }
            _this.numOfMarks = (props.max - props.min) / _this.props.step;
            _this.markRefs = [];
            for (var i = 0; i < _this.numOfMarks + 1; i++) {
                _this.markRefs[i] = React.createRef();
            }
        };
        _this.calculateMarkOffsets = function () {
            if (!_this.props.renderMark ||
                !_this.trackRef ||
                !_this.numOfMarks ||
                !_this.markRefs ||
                _this.trackRef.current === null)
                return;
            var elStyles = window.getComputedStyle(_this.trackRef.current);
            var trackWidth = parseInt(elStyles.width, 10);
            var trackHeight = parseInt(elStyles.height, 10);
            var paddingLeft = parseInt(elStyles.paddingLeft, 10);
            var paddingTop = parseInt(elStyles.paddingTop, 10);
            var res = [];
            for (var i = 0; i < _this.numOfMarks + 1; i++) {
                var markHeight = 9999;
                var markWidth = 9999;
                if (_this.markRefs[i].current) {
                    var markRect = _this.markRefs[i].current.getBoundingClientRect();
                    markHeight = markRect.height;
                    markWidth = markRect.width;
                }
                if (_this.props.direction === types_1.Direction.Left ||
                    _this.props.direction === types_1.Direction.Right) {
                    res.push([
                        Math.round((trackWidth / _this.numOfMarks) * i + paddingLeft - markWidth / 2),
                        -Math.round((markHeight - trackHeight) / 2),
                    ]);
                }
                else {
                    res.push([
                        Math.round((trackHeight / _this.numOfMarks) * i + paddingTop - markHeight / 2),
                        -Math.round((markWidth - trackWidth) / 2),
                    ]);
                }
            }
            _this.setState({ markOffsets: res });
        };
        if (props.step === 0) {
            throw new Error('"step" property should be a positive number');
        }
        _this.schdOnMouseMove = (0, utils_1.schd)(_this.onMouseMove);
        _this.schdOnTouchMove = (0, utils_1.schd)(_this.onTouchMove);
        _this.schdOnEnd = (0, utils_1.schd)(_this.onEnd);
        _this.thumbRefs = props.values.map(function () { return React.createRef(); });
        _this.updateMarkRefs(props);
        return _this;
    }
    Range.prototype.componentDidMount = function () {
        var _this = this;
        var _a = this.props, values = _a.values, min = _a.min, step = _a.step;
        this.resizeObserver = window.ResizeObserver
            ? new window.ResizeObserver(this.onResize)
            : {
                observe: function () { return window.addEventListener("resize", _this.onResize); },
                unobserve: function () { return window.removeEventListener("resize", _this.onResize); },
            };
        document.addEventListener("touchstart", this.onMouseOrTouchStart, {
            passive: false,
        });
        document.addEventListener("mousedown", this.onMouseOrTouchStart, {
            passive: false,
        });
        !this.props.allowOverlap && (0, utils_1.checkInitialOverlap)(this.props.values);
        this.props.values.forEach(function (value) {
            return (0, utils_1.checkBoundaries)(value, _this.props.min, _this.props.max);
        });
        this.resizeObserver.observe(this.trackRef.current);
        (0, utils_1.translateThumbs)(this.getThumbs(), this.getOffsets(), this.props.rtl);
        this.calculateMarkOffsets();
        values.forEach(function (value) {
            if (!(0, utils_1.isStepDivisible)(min, value, step)) {
                console.warn("The `values` property is in conflict with the current `step`, `min`, and `max` properties. Please provide values that are accessible using the min, max, and step values.");
            }
        });
    };
    Range.prototype.componentDidUpdate = function (prevProps, prevState) {
        var _a = this.props, max = _a.max, min = _a.min, step = _a.step, values = _a.values, rtl = _a.rtl;
        if (prevProps.max !== max ||
            prevProps.min !== min ||
            prevProps.step !== step) {
            this.updateMarkRefs(this.props);
        }
        (0, utils_1.translateThumbs)(this.getThumbs(), this.getOffsets(), rtl);
        // ensure offsets are calculated when the refs for the marks have been created
        // and those refs have been mounted to the dom
        // on the state update in calculateOffsets with new markOffsets are calculated
        if (prevProps.max !== max ||
            prevProps.min !== min ||
            prevProps.step !== step ||
            prevState.markOffsets.length !== this.state.markOffsets.length) {
            this.calculateMarkOffsets();
            values.forEach(function (value) {
                if (!(0, utils_1.isStepDivisible)(min, value, step)) {
                    console.warn("The `values` property is in conflict with the current `step`, `min`, and `max` properties. Please provide values that are accessible using the min, max, and step values.");
                }
            });
        }
    };
    Range.prototype.componentWillUnmount = function () {
        var options = {
            passive: false,
        };
        document.removeEventListener("mousedown", this.onMouseOrTouchStart, options);
        // These need to be removed!!
        document.removeEventListener("mousemove", this.schdOnMouseMove);
        document.removeEventListener("touchmove", this.schdOnTouchMove);
        document.removeEventListener("touchstart", this.onMouseOrTouchStart);
        document.removeEventListener("mouseup", this.schdOnEnd);
        document.removeEventListener("touchend", this.schdOnEnd);
        this.resizeObserver.unobserve(this.trackRef.current);
    };
    Range.prototype.render = function () {
        var _this = this;
        var _a = this.props, label = _a.label, labelledBy = _a.labelledBy, renderTrack = _a.renderTrack, renderThumb = _a.renderThumb, _b = _a.renderMark, renderMark = _b === void 0 ? function () { return null; } : _b, values = _a.values, min = _a.min, max = _a.max, allowOverlap = _a.allowOverlap, disabled = _a.disabled;
        var _c = this.state, draggedThumbIndex = _c.draggedThumbIndex, thumbZIndexes = _c.thumbZIndexes, markOffsets = _c.markOffsets;
        return renderTrack({
            props: {
                style: {
                    // creates stacking context that prevents z-index applied to thumbs
                    // interfere with other elements
                    transform: "scale(1)",
                    cursor: draggedThumbIndex > -1
                        ? "grabbing"
                        : this.props.draggableTrack
                            ? (0, utils_1.isVertical)(this.props.direction)
                                ? "ns-resize"
                                : "ew-resize"
                            : values.length === 1 && !disabled
                                ? "pointer"
                                : "inherit",
                },
                onMouseDown: disabled ? utils_1.voidFn : this.onMouseDownTrack,
                onTouchStart: disabled ? utils_1.voidFn : this.onTouchStartTrack,
                ref: this.trackRef,
            },
            isDragged: this.state.draggedThumbIndex > -1,
            disabled: disabled,
            children: __spreadArray(__spreadArray([], markOffsets.map(function (offset, index, arr) {
                return renderMark({
                    props: {
                        style: _this.props.direction === types_1.Direction.Left ||
                            _this.props.direction === types_1.Direction.Right
                            ? {
                                position: "absolute",
                                left: "".concat(offset[0], "px"),
                                marginTop: "".concat(offset[1], "px"),
                            }
                            : {
                                position: "absolute",
                                top: "".concat(offset[0], "px"),
                                marginLeft: "".concat(offset[1], "px"),
                            },
                        key: "mark".concat(index),
                        ref: _this.markRefs[index],
                    },
                    index: index,
                });
            }), true), values.map(function (value, index) {
                var isDragged = _this.state.draggedThumbIndex === index;
                return renderThumb({
                    index: index,
                    value: value,
                    isDragged: isDragged,
                    props: {
                        style: {
                            position: "absolute",
                            zIndex: thumbZIndexes[index],
                            cursor: disabled ? "inherit" : isDragged ? "grabbing" : "grab",
                            userSelect: "none",
                            touchAction: "none",
                            WebkitUserSelect: "none",
                            MozUserSelect: "none",
                            msUserSelect: "none",
                        },
                        key: index,
                        tabIndex: disabled ? undefined : 0,
                        "aria-valuemax": allowOverlap ? max : values[index + 1] || max,
                        "aria-valuemin": allowOverlap ? min : values[index - 1] || min,
                        "aria-valuenow": value,
                        draggable: false,
                        ref: _this.thumbRefs[index],
                        "aria-label": label,
                        "aria-labelledby": labelledBy,
                        role: "slider",
                        onKeyDown: disabled ? utils_1.voidFn : _this.onKeyDown,
                        onKeyUp: disabled ? utils_1.voidFn : _this.onKeyUp,
                    },
                });
            }), true),
        });
    };
    Range.defaultProps = {
        label: "Accessibility label",
        labelledBy: null,
        step: 1,
        direction: types_1.Direction.Right,
        rtl: false,
        disabled: false,
        allowOverlap: false,
        draggableTrack: false,
        min: 0,
        max: 100,
    };
    return Range;
}(React.Component));
exports["default"] = Range;


/***/ }),

/***/ 60124:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkValuesAgainstBoundaries = exports.relativeValue = exports.useThumbOverlap = exports.Direction = exports.getTrackBackground = exports.Range = void 0;
var Range_1 = __importDefault(__webpack_require__(20465));
exports.Range = Range_1.default;
var utils_1 = __webpack_require__(21813);
Object.defineProperty(exports, "getTrackBackground", ({ enumerable: true, get: function () { return utils_1.getTrackBackground; } }));
Object.defineProperty(exports, "useThumbOverlap", ({ enumerable: true, get: function () { return utils_1.useThumbOverlap; } }));
Object.defineProperty(exports, "relativeValue", ({ enumerable: true, get: function () { return utils_1.relativeValue; } }));
Object.defineProperty(exports, "checkValuesAgainstBoundaries", ({ enumerable: true, get: function () { return utils_1.checkValuesAgainstBoundaries; } }));
var types_1 = __webpack_require__(58105);
Object.defineProperty(exports, "Direction", ({ enumerable: true, get: function () { return types_1.Direction; } }));


/***/ }),

/***/ 58105:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Direction = void 0;
var Direction;
(function (Direction) {
    Direction["Right"] = "to right";
    Direction["Left"] = "to left";
    Direction["Down"] = "to bottom";
    Direction["Up"] = "to top";
})(Direction || (exports.Direction = Direction = {}));


/***/ }),

/***/ 21813:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isIOS = exports.useThumbOverlap = exports.assertUnreachable = exports.voidFn = exports.getTrackBackground = exports.replaceAt = exports.schd = exports.translate = exports.getClosestThumbIndex = exports.translateThumbs = exports.getPaddingAndBorder = exports.getMargin = exports.checkInitialOverlap = exports.checkValuesAgainstBoundaries = exports.checkBoundaries = exports.isVertical = exports.relativeValue = exports.normalizeValue = exports.isStepDivisible = exports.isTouchEvent = exports.getStepDecimals = void 0;
var react_1 = __webpack_require__(96540);
var types_1 = __webpack_require__(58105);
var getStepDecimals = function (step) {
    var decimals = step.toString().split(".")[1];
    return decimals ? decimals.length : 0;
};
exports.getStepDecimals = getStepDecimals;
function isTouchEvent(event) {
    return ((event.touches && event.touches.length) ||
        (event.changedTouches && event.changedTouches.length));
}
exports.isTouchEvent = isTouchEvent;
function isStepDivisible(min, max, step) {
    var res = (max - min) / step;
    var precision = 8;
    var roundedRes = Number(res.toFixed(precision));
    return parseInt(roundedRes.toString(), 10) === roundedRes;
}
exports.isStepDivisible = isStepDivisible;
function normalizeValue(value, index, min, max, step, allowOverlap, values) {
    var BIG_NUM = 10e10;
    value = Math.round(value * BIG_NUM) / BIG_NUM;
    if (!allowOverlap) {
        var prev = values[index - 1];
        var next = values[index + 1];
        if (prev && prev > value)
            return prev;
        if (next && next < value)
            return next;
    }
    if (value > max)
        return max;
    if (value < min)
        return min;
    // `remainder` is a difference between the given value and a full step value
    // that is closest lower to the given value and is in the range between the min value
    // and the given value
    var remainder = Math.floor(value * BIG_NUM - min * BIG_NUM) % Math.floor(step * BIG_NUM);
    var closestLowerNum = Math.floor(value * BIG_NUM - Math.abs(remainder));
    var rounded = remainder === 0 ? value : closestLowerNum / BIG_NUM;
    // Values with a remainder `< step/2` are rounded to the closest lower value
    // while values with a remainder `= > step/2` are rounded to the closest bigger value
    var res = Math.abs(remainder / BIG_NUM) < step / 2 ? rounded : rounded + step;
    var decimalPlaces = (0, exports.getStepDecimals)(step);
    return parseFloat(res.toFixed(decimalPlaces));
}
exports.normalizeValue = normalizeValue;
function relativeValue(value, min, max) {
    return (value - min) / (max - min);
}
exports.relativeValue = relativeValue;
function isVertical(direction) {
    return direction === types_1.Direction.Up || direction === types_1.Direction.Down;
}
exports.isVertical = isVertical;
function checkBoundaries(value, min, max) {
    if (min >= max) {
        throw new RangeError("min (".concat(min, ") is equal/bigger than max (").concat(max, ")"));
    }
    if (value < min) {
        throw new RangeError("value (".concat(value, ") is smaller than min (").concat(min, ")"));
    }
    if (value > max) {
        throw new RangeError("value (".concat(value, ") is bigger than max (").concat(max, ")"));
    }
}
exports.checkBoundaries = checkBoundaries;
function checkValuesAgainstBoundaries(value, min, max) {
    if (value < min) {
        // set selectedValue to min
        return min;
    }
    if (value > max) {
        // set selectedValue to max
        return max;
    }
    else {
        return value;
    }
}
exports.checkValuesAgainstBoundaries = checkValuesAgainstBoundaries;
function checkInitialOverlap(values) {
    if (values.length < 2)
        return;
    if (!values.slice(1).every(function (item, i) { return values[i] <= item; })) {
        throw new RangeError("values={[".concat(values, "]} needs to be sorted when allowOverlap={false}"));
    }
}
exports.checkInitialOverlap = checkInitialOverlap;
function getMargin(element) {
    var style = window.getComputedStyle(element);
    return {
        top: parseInt(style["margin-top"], 10),
        bottom: parseInt(style["margin-bottom"], 10),
        left: parseInt(style["margin-left"], 10),
        right: parseInt(style["margin-right"], 10),
    };
}
exports.getMargin = getMargin;
function getPaddingAndBorder(element) {
    var style = window.getComputedStyle(element);
    return {
        top: parseInt(style["padding-top"], 10) +
            parseInt(style["border-top-width"], 10),
        bottom: parseInt(style["padding-bottom"], 10) +
            parseInt(style["border-bottom-width"], 10),
        left: parseInt(style["padding-left"], 10) +
            parseInt(style["border-left-width"], 10),
        right: parseInt(style["padding-right"], 10) +
            parseInt(style["border-right-width"], 10),
    };
}
exports.getPaddingAndBorder = getPaddingAndBorder;
function translateThumbs(elements, offsets, rtl) {
    var inverter = rtl ? -1 : 1;
    elements.forEach(function (element, index) {
        return translate(element, inverter * offsets[index].x, offsets[index].y);
    });
}
exports.translateThumbs = translateThumbs;
/**
 * Util function for calculating the index of the thumb that is closes to a given position
 * @param thumbs - array of Thumb element to calculate the distance from
 * @param clientX - target x position (mouse/touch)
 * @param clientY - target y position (mouse/touch)
 * @param direction - the direction of the track
 */
function getClosestThumbIndex(thumbs, clientX, clientY, direction) {
    var thumbIndex = 0;
    var minThumbDistance = getThumbDistance(thumbs[0], clientX, clientY, direction);
    for (var i = 1; i < thumbs.length; i++) {
        var thumbDistance = getThumbDistance(thumbs[i], clientX, clientY, direction);
        if (thumbDistance < minThumbDistance) {
            minThumbDistance = thumbDistance;
            thumbIndex = i;
        }
    }
    return thumbIndex;
}
exports.getClosestThumbIndex = getClosestThumbIndex;
function translate(element, x, y) {
    element.style.transform = "translate(".concat(x, "px, ").concat(y, "px)");
}
exports.translate = translate;
// adapted from https://github.com/alexreardon/raf-schd
var schd = function (fn) {
    var lastArgs = [];
    var frameId = null;
    var wrapperFn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        lastArgs = args;
        if (frameId) {
            return;
        }
        frameId = requestAnimationFrame(function () {
            frameId = null;
            fn.apply(void 0, lastArgs);
        });
    };
    return wrapperFn;
};
exports.schd = schd;
function replaceAt(values, index, value) {
    var ret = values.slice(0);
    ret[index] = value;
    return ret;
}
exports.replaceAt = replaceAt;
function getTrackBackground(_a) {
    var values = _a.values, colors = _a.colors, min = _a.min, max = _a.max, _b = _a.direction, direction = _b === void 0 ? types_1.Direction.Right : _b, _c = _a.rtl, rtl = _c === void 0 ? false : _c;
    if (rtl && direction === types_1.Direction.Right) {
        direction = types_1.Direction.Left;
    }
    else if (rtl && types_1.Direction.Left) {
        direction = types_1.Direction.Right;
    }
    // sort values ascending
    var progress = values
        .slice(0)
        .sort(function (a, b) { return a - b; })
        .map(function (value) { return ((value - min) / (max - min)) * 100; });
    var middle = progress.reduce(function (acc, point, index) {
        return "".concat(acc, ", ").concat(colors[index], " ").concat(point, "%, ").concat(colors[index + 1], " ").concat(point, "%");
    }, "");
    return "linear-gradient(".concat(direction, ", ").concat(colors[0], " 0%").concat(middle, ", ").concat(colors[colors.length - 1], " 100%)");
}
exports.getTrackBackground = getTrackBackground;
function voidFn() { }
exports.voidFn = voidFn;
function assertUnreachable(x) {
    throw new Error("Didn't expect to get here");
}
exports.assertUnreachable = assertUnreachable;
/**
 * Util function for grabbing the true largest width of a thumb
 * including the label
 * @param thumbEl - Thumb element to grab the largest width from
 * @param value - Thumb value, not label value
 * @param separator - Label separator value
 */
var getThumbWidth = function (thumbEl, value, separator, decimalPlaces, valueToLabel) {
    if (valueToLabel === void 0) { valueToLabel = function (value) { return value; }; }
    var width = Math.ceil(__spreadArray([thumbEl], Array.from(thumbEl.children), true).reduce(function (width, el) {
        var elWidth = Math.ceil(el.getBoundingClientRect().width);
        /**
         * If a label contains a merged label value, it won't return the true
         * label width for that Thumb. Clone the label and change the value
         * to that individual Thumb value in order to grab the true width.
         */
        if (el.innerText &&
            el.innerText.includes(separator) &&
            el.childElementCount === 0) {
            var elClone = el.cloneNode(true);
            elClone.innerHTML = valueToLabel(value.toFixed(decimalPlaces));
            elClone.style.visibility = "hidden";
            document.body.appendChild(elClone);
            elWidth = Math.ceil(elClone.getBoundingClientRect().width);
            document.body.removeChild(elClone);
        }
        return elWidth > width ? elWidth : width;
    }, thumbEl.getBoundingClientRect().width));
    return width;
};
/**
 * Bulk of logic for thumb overlaps
 * Consider a scenario with 5 thumbs;
 * Thumb 1 overlaps with thumb 0 and thumb 2
 * Thumb 2 overlaps with thumb 3
 * We need an array that contains [0, 1, 2, 3]
 * The function needs to return the directly overlapping thumbs
 * and all thumbs overlapping linked to those and so on
 * @param index - Thumb index calculating overlaps for
 * @param offsets - Current Array of Thumb offsets for Range
 * @param thumbs - Array of Thumb elements
 * @param values - Array of Thumb values
 * @param separator - String separator for merged label values
 * @returns overlaps - Array of all overlapping thumbs from the index
 */
var getOverlaps = function (index, offsets, thumbs, values, separator, decimalPlaces, valueToLabel) {
    if (valueToLabel === void 0) { valueToLabel = function (value) { return value; }; }
    var overlaps = [];
    /**
     * Recursive function for building the overlaps Array
     * If an overlap is found, find the overlaps for that overlap
     * @param thumbIndex current Thumb index to find overlaps from
     */
    var buildOverlaps = function (thumbIndex) {
        var thumbXWidth = getThumbWidth(thumbs[thumbIndex], values[thumbIndex], separator, decimalPlaces, valueToLabel);
        var thumbX = offsets[thumbIndex].x;
        /**
         * Iterate through the Thumb offsets, if there is a match
         * add the thumbIndex and siblingIndex to the overlaps Array
         *
         * Then build overlaps from the overlapping siblingIndex
         */
        offsets.forEach(function (_a, siblingIndex) {
            var siblingX = _a.x;
            var siblingWidth = getThumbWidth(thumbs[siblingIndex], values[siblingIndex], separator, decimalPlaces, valueToLabel);
            if (thumbIndex !== siblingIndex &&
                ((thumbX >= siblingX && thumbX <= siblingX + siblingWidth) ||
                    (thumbX + thumbXWidth >= siblingX &&
                        thumbX + thumbXWidth <= siblingX + siblingWidth))) {
                if (!overlaps.includes(siblingIndex)) {
                    overlaps.push(thumbIndex);
                    overlaps.push(siblingIndex);
                    overlaps = __spreadArray(__spreadArray([], overlaps, true), [thumbIndex, siblingIndex], false);
                    buildOverlaps(siblingIndex);
                }
            }
        });
    };
    buildOverlaps(index);
    // Sort and remove duplicates from the built overlaps
    return Array.from(new Set(overlaps.sort()));
};
/**
 * A custom React Hook for calculating whether a thumb overlaps
 * another and whether labels could/should merge.
 * @param rangeRef - React ref value of Range component
 * @param values - current Range values Array
 * @param index - thumb index
 * @param step - step value, used to calculate the number of decimal places
 * @param separator - string to separate thumb values
 * @returns label value + styling for thumb label
 */
var useThumbOverlap = function (rangeRef, values, index, step, separator, valueToLabel) {
    if (step === void 0) { step = 0.1; }
    if (separator === void 0) { separator = " - "; }
    if (valueToLabel === void 0) { valueToLabel = function (value) { return value; }; }
    var decimalPlaces = (0, exports.getStepDecimals)(step);
    // Create initial label style and value. Label value defaults to thumb value
    var _a = (0, react_1.useState)({}), labelStyle = _a[0], setLabelStyle = _a[1];
    var _b = (0, react_1.useState)(valueToLabel(values[index].toFixed(decimalPlaces))), labelValue = _b[0], setLabelValue = _b[1];
    // When the rangeRef or values change, update the Thumb label values and styling
    (0, react_1.useEffect)(function () {
        if (rangeRef) {
            var thumbs = rangeRef.getThumbs();
            if (thumbs.length < 1)
                return;
            var newStyle = {};
            var offsets_1 = rangeRef.getOffsets();
            /**
             * Get any overlaps for the given Thumb index. This must return all linked
             * Thumbs. So if there are 4 Thumbs and Thumbs 2, 3 and 4 overlap. If we are
             * getting the overlaps for Thumb 1 and it overlaps only Thumb 2, we must get
             * 2, 3 and 4 also.
             */
            var overlaps = getOverlaps(index, offsets_1, thumbs, values, separator, decimalPlaces, valueToLabel);
            // Set a default label value of the Thumb value
            var labelValue_1 = valueToLabel(values[index].toFixed(decimalPlaces));
            /**
             * If there are overlaps for the Thumb, we need to calculate the correct
             * Label value along with the relevant styling. We only want to show a Label
             * for the left most Thumb in an overlapping set.
             * All other Thumbs will be set to display: none.
             */
            if (overlaps.length) {
                /**
                 * Get an Array of the offsets for the overlapping Thumbs
                 * This is so we can determine if the Thumb we are looking at
                 * is the left most thumb in an overlapping set
                 */
                var offsetsX = overlaps.reduce(function (a, c, i, s) {
                    return a.length ? __spreadArray(__spreadArray([], a, true), [offsets_1[s[i]].x], false) : [offsets_1[s[i]].x];
                }, []);
                /**
                 * If our Thumb is the left most Thumb, we can build a Label value
                 * and set the style for that Label
                 */
                if (Math.min.apply(Math, offsetsX) === offsets_1[index].x) {
                    /**
                     * First calculate the Label value. To do this,
                     * grab all the values for the Thumbs in our overlaps.
                     * Then convert that to a Set and sort it whilst removing duplicates.
                     */
                    var labelValues_1 = [];
                    overlaps.forEach(function (thumb) {
                        labelValues_1.push(values[thumb].toFixed(decimalPlaces));
                    });
                    /**
                     *  Update the labelValue with the resulting Array
                     *  joined by our defined separator
                     */
                    labelValue_1 = Array.from(new Set(labelValues_1.sort(function (a, b) { return parseFloat(a) - parseFloat(b); })))
                        .map(valueToLabel)
                        .join(separator);
                    /**
                     * Lastly, build the label styling. The label styling will
                     * position the label and apply a transform so that it's centered.
                     * We want the center point between the left edge of the left most Thumb
                     * and the right edge of the right most Thumb.
                     */
                    var first = Math.min.apply(Math, offsetsX);
                    var last = Math.max.apply(Math, offsetsX);
                    var lastWidth = thumbs[overlaps[offsetsX.indexOf(last)]].getBoundingClientRect()
                        .width;
                    newStyle.left = "".concat(Math.abs(first - (last + lastWidth)) / 2, "px");
                    newStyle.transform = "translate(-50%, 0)";
                }
                else {
                    // If the Thumb isn't the left most Thumb, hide the Label!
                    newStyle.visibility = "hidden";
                }
            }
            // Update the label value and style
            setLabelValue(labelValue_1);
            setLabelStyle(newStyle);
        }
    }, [rangeRef, values]);
    return [labelValue, labelStyle];
};
exports.useThumbOverlap = useThumbOverlap;
/**
 * Util function for calculating the distance of the center of a thumb
 * form a given mouse/touch target's position
 * @param thumbEl - Thumb element to calculate the distance from
 * @param clientX - target x position (mouse/touch)
 * @param clientY - target y position (mouse/touch)
 * @param direction - the direction of the track
 */
function getThumbDistance(thumbEl, clientX, clientY, direction) {
    var _a = thumbEl.getBoundingClientRect(), left = _a.left, top = _a.top, width = _a.width, height = _a.height;
    return isVertical(direction)
        ? Math.abs(clientY - (top + height / 2))
        : Math.abs(clientX - (left + width / 2));
}
var isIOS = function () {
    var _a;
    // @ts-ignore
    var platform = ((_a = navigator.userAgentData) === null || _a === void 0 ? void 0 : _a.platform) || navigator.platform;
    return ([
        "iPad Simulator",
        "iPhone Simulator",
        "iPod Simulator",
        "iPad",
        "iPhone",
        "iPod",
    ].includes(platform) ||
        // iPad on iOS 13 detection
        (navigator.userAgent.includes("Mac") && "ontouchend" in document));
};
exports.isIOS = isIOS;


/***/ }),

/***/ 73729:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

if (true) {
  module.exports = __webpack_require__(37372)
} else {}

/***/ }),

/***/ 12689:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ CreatableSelect$1),
  useCreatable: () => (/* reexport */ useCreatable)
});

// EXTERNAL MODULE: ./node_modules/react-select/node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__(65166);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(96540);
// EXTERNAL MODULE: ./node_modules/react-select/dist/Select-49a62830.esm.js + 9 modules
var Select_49a62830_esm = __webpack_require__(93153);
// EXTERNAL MODULE: ./node_modules/react-select/dist/useStateManager-7e1e8489.esm.js
var useStateManager_7e1e8489_esm = __webpack_require__(52836);
// EXTERNAL MODULE: ./node_modules/react-select/node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__(47029);
// EXTERNAL MODULE: ./node_modules/react-select/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__(34644);
// EXTERNAL MODULE: ./node_modules/react-select/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js + 1 modules
var objectWithoutProperties = __webpack_require__(35412);
// EXTERNAL MODULE: ./node_modules/react-select/dist/index-a301f526.esm.js + 1 modules
var index_a301f526_esm = __webpack_require__(71332);
;// CONCATENATED MODULE: ./node_modules/react-select/dist/useCreatable-d97ef2c9.esm.js







var _excluded = ["allowCreateWhileLoading", "createOptionPosition", "formatCreateLabel", "isValidNewOption", "getNewOptionData", "onCreateOption", "options", "onChange"];
var compareOption = function compareOption() {
  var inputValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var option = arguments.length > 1 ? arguments[1] : undefined;
  var accessors = arguments.length > 2 ? arguments[2] : undefined;
  var candidate = String(inputValue).toLowerCase();
  var optionValue = String(accessors.getOptionValue(option)).toLowerCase();
  var optionLabel = String(accessors.getOptionLabel(option)).toLowerCase();
  return optionValue === candidate || optionLabel === candidate;
};
var builtins = {
  formatCreateLabel: function formatCreateLabel(inputValue) {
    return "Create \"".concat(inputValue, "\"");
  },
  isValidNewOption: function isValidNewOption(inputValue, selectValue, selectOptions, accessors) {
    return !(!inputValue || selectValue.some(function (option) {
      return compareOption(inputValue, option, accessors);
    }) || selectOptions.some(function (option) {
      return compareOption(inputValue, option, accessors);
    }));
  },
  getNewOptionData: function getNewOptionData(inputValue, optionLabel) {
    return {
      label: optionLabel,
      value: inputValue,
      __isNew__: true
    };
  }
};
function useCreatable(_ref) {
  var _ref$allowCreateWhile = _ref.allowCreateWhileLoading,
    allowCreateWhileLoading = _ref$allowCreateWhile === void 0 ? false : _ref$allowCreateWhile,
    _ref$createOptionPosi = _ref.createOptionPosition,
    createOptionPosition = _ref$createOptionPosi === void 0 ? 'last' : _ref$createOptionPosi,
    _ref$formatCreateLabe = _ref.formatCreateLabel,
    formatCreateLabel = _ref$formatCreateLabe === void 0 ? builtins.formatCreateLabel : _ref$formatCreateLabe,
    _ref$isValidNewOption = _ref.isValidNewOption,
    isValidNewOption = _ref$isValidNewOption === void 0 ? builtins.isValidNewOption : _ref$isValidNewOption,
    _ref$getNewOptionData = _ref.getNewOptionData,
    getNewOptionData = _ref$getNewOptionData === void 0 ? builtins.getNewOptionData : _ref$getNewOptionData,
    onCreateOption = _ref.onCreateOption,
    _ref$options = _ref.options,
    propsOptions = _ref$options === void 0 ? [] : _ref$options,
    propsOnChange = _ref.onChange,
    restSelectProps = (0,objectWithoutProperties/* default */.A)(_ref, _excluded);
  var _restSelectProps$getO = restSelectProps.getOptionValue,
    getOptionValue$1 = _restSelectProps$getO === void 0 ? Select_49a62830_esm.g : _restSelectProps$getO,
    _restSelectProps$getO2 = restSelectProps.getOptionLabel,
    getOptionLabel$1 = _restSelectProps$getO2 === void 0 ? Select_49a62830_esm.b : _restSelectProps$getO2,
    inputValue = restSelectProps.inputValue,
    isLoading = restSelectProps.isLoading,
    isMulti = restSelectProps.isMulti,
    value = restSelectProps.value,
    name = restSelectProps.name;
  var newOption = (0,react.useMemo)(function () {
    return isValidNewOption(inputValue, (0,index_a301f526_esm.H)(value), propsOptions, {
      getOptionValue: getOptionValue$1,
      getOptionLabel: getOptionLabel$1
    }) ? getNewOptionData(inputValue, formatCreateLabel(inputValue)) : undefined;
  }, [formatCreateLabel, getNewOptionData, getOptionLabel$1, getOptionValue$1, inputValue, isValidNewOption, propsOptions, value]);
  var options = (0,react.useMemo)(function () {
    return (allowCreateWhileLoading || !isLoading) && newOption ? createOptionPosition === 'first' ? [newOption].concat((0,toConsumableArray/* default */.A)(propsOptions)) : [].concat((0,toConsumableArray/* default */.A)(propsOptions), [newOption]) : propsOptions;
  }, [allowCreateWhileLoading, createOptionPosition, isLoading, newOption, propsOptions]);
  var onChange = (0,react.useCallback)(function (newValue, actionMeta) {
    if (actionMeta.action !== 'select-option') {
      return propsOnChange(newValue, actionMeta);
    }
    var valueArray = Array.isArray(newValue) ? newValue : [newValue];
    if (valueArray[valueArray.length - 1] === newOption) {
      if (onCreateOption) onCreateOption(inputValue);else {
        var newOptionData = getNewOptionData(inputValue, inputValue);
        var newActionMeta = {
          action: 'create-option',
          name: name,
          option: newOptionData
        };
        propsOnChange((0,index_a301f526_esm.D)(isMulti, [].concat((0,toConsumableArray/* default */.A)((0,index_a301f526_esm.H)(value)), [newOptionData]), newOptionData), newActionMeta);
      }
      return;
    }
    propsOnChange(newValue, actionMeta);
  }, [getNewOptionData, inputValue, isMulti, name, newOption, onCreateOption, propsOnChange, value]);
  return (0,objectSpread2/* default */.A)((0,objectSpread2/* default */.A)({}, restSelectProps), {}, {
    options: options,
    onChange: onChange
  });
}



// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(40961);
// EXTERNAL MODULE: ./node_modules/use-isomorphic-layout-effect/dist/use-isomorphic-layout-effect.browser.esm.js
var use_isomorphic_layout_effect_browser_esm = __webpack_require__(27003);
;// CONCATENATED MODULE: ./node_modules/react-select/creatable/dist/react-select-creatable.esm.js

























var CreatableSelect = /*#__PURE__*/(0,react.forwardRef)(function (props, ref) {
  var creatableProps = (0,useStateManager_7e1e8489_esm.u)(props);
  var selectProps = useCreatable(creatableProps);
  return /*#__PURE__*/react.createElement(Select_49a62830_esm.S, (0,esm_extends/* default */.A)({
    ref: ref
  }, selectProps));
});
var CreatableSelect$1 = CreatableSelect;




/***/ }),

/***/ 93153:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  S: () => (/* binding */ Select),
  b: () => (/* binding */ getOptionLabel$1),
  c: () => (/* binding */ createFilter),
  d: () => (/* binding */ defaultTheme),
  g: () => (/* binding */ getOptionValue$1),
  m: () => (/* binding */ mergeStyles)
});

// UNUSED EXPORTS: a

// EXTERNAL MODULE: ./node_modules/react-select/node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__(65166);
// EXTERNAL MODULE: ./node_modules/react-select/node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__(47029);
;// CONCATENATED MODULE: ./node_modules/react-select/node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}

// EXTERNAL MODULE: ./node_modules/react-select/node_modules/@babel/runtime/helpers/esm/toPropertyKey.js + 1 modules
var toPropertyKey = __webpack_require__(39434);
;// CONCATENATED MODULE: ./node_modules/react-select/node_modules/@babel/runtime/helpers/esm/createClass.js

function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, (0,toPropertyKey/* default */.A)(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}

;// CONCATENATED MODULE: ./node_modules/react-select/node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}

;// CONCATENATED MODULE: ./node_modules/react-select/node_modules/@babel/runtime/helpers/esm/inherits.js

function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && _setPrototypeOf(t, e);
}

;// CONCATENATED MODULE: ./node_modules/react-select/node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js
function _getPrototypeOf(t) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, _getPrototypeOf(t);
}

;// CONCATENATED MODULE: ./node_modules/react-select/node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
    return !!t;
  })();
}

// EXTERNAL MODULE: ./node_modules/react-select/node_modules/@babel/runtime/helpers/esm/typeof.js
var esm_typeof = __webpack_require__(65710);
;// CONCATENATED MODULE: ./node_modules/react-select/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}

;// CONCATENATED MODULE: ./node_modules/react-select/node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js


function _possibleConstructorReturn(t, e) {
  if (e && ("object" == (0,esm_typeof/* default */.A)(e) || "function" == typeof e)) return e;
  if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
  return _assertThisInitialized(t);
}

;// CONCATENATED MODULE: ./node_modules/react-select/node_modules/@babel/runtime/helpers/esm/createSuper.js



function _createSuper(t) {
  var r = _isNativeReflectConstruct();
  return function () {
    var e,
      o = _getPrototypeOf(t);
    if (r) {
      var s = _getPrototypeOf(this).constructor;
      e = Reflect.construct(o, arguments, s);
    } else e = o.apply(this, arguments);
    return _possibleConstructorReturn(this, e);
  };
}

// EXTERNAL MODULE: ./node_modules/react-select/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js + 3 modules
var toConsumableArray = __webpack_require__(34644);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(96540);
// EXTERNAL MODULE: ./node_modules/react-select/dist/index-a301f526.esm.js + 1 modules
var index_a301f526_esm = __webpack_require__(71332);
// EXTERNAL MODULE: ./node_modules/@emotion/react/dist/emotion-react.browser.esm.js
var emotion_react_browser_esm = __webpack_require__(17437);
// EXTERNAL MODULE: ./node_modules/memoize-one/dist/memoize-one.esm.js
var memoize_one_esm = __webpack_require__(41811);
// EXTERNAL MODULE: ./node_modules/react-select/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js + 1 modules
var objectWithoutProperties = __webpack_require__(35412);
;// CONCATENATED MODULE: ./node_modules/react-select/dist/Select-49a62830.esm.js














function _EMOTION_STRINGIFIED_CSS_ERROR__$2() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

// Assistive text to describe visual elements. Hidden for sighted users.
var _ref =  true ? {
  name: "7pg0cj-a11yText",
  styles: "label:a11yText;z-index:9999;border:0;clip:rect(1px, 1px, 1px, 1px);height:1px;width:1px;position:absolute;overflow:hidden;padding:0;white-space:nowrap"
} : 0;
var A11yText = function A11yText(props) {
  return (0,emotion_react_browser_esm/* jsx */.Y)("span", (0,esm_extends/* default */.A)({
    css: _ref
  }, props));
};
var A11yText$1 = A11yText;

var defaultAriaLiveMessages = {
  guidance: function guidance(props) {
    var isSearchable = props.isSearchable,
      isMulti = props.isMulti,
      tabSelectsValue = props.tabSelectsValue,
      context = props.context,
      isInitialFocus = props.isInitialFocus;
    switch (context) {
      case 'menu':
        return "Use Up and Down to choose options, press Enter to select the currently focused option, press Escape to exit the menu".concat(tabSelectsValue ? ', press Tab to select the option and exit the menu' : '', ".");
      case 'input':
        return isInitialFocus ? "".concat(props['aria-label'] || 'Select', " is focused ").concat(isSearchable ? ',type to refine list' : '', ", press Down to open the menu, ").concat(isMulti ? ' press left to focus selected values' : '') : '';
      case 'value':
        return 'Use left and right to toggle between focused values, press Backspace to remove the currently focused value';
      default:
        return '';
    }
  },
  onChange: function onChange(props) {
    var action = props.action,
      _props$label = props.label,
      label = _props$label === void 0 ? '' : _props$label,
      labels = props.labels,
      isDisabled = props.isDisabled;
    switch (action) {
      case 'deselect-option':
      case 'pop-value':
      case 'remove-value':
        return "option ".concat(label, ", deselected.");
      case 'clear':
        return 'All selected options have been cleared.';
      case 'initial-input-focus':
        return "option".concat(labels.length > 1 ? 's' : '', " ").concat(labels.join(','), ", selected.");
      case 'select-option':
        return isDisabled ? "option ".concat(label, " is disabled. Select another option.") : "option ".concat(label, ", selected.");
      default:
        return '';
    }
  },
  onFocus: function onFocus(props) {
    var context = props.context,
      focused = props.focused,
      options = props.options,
      _props$label2 = props.label,
      label = _props$label2 === void 0 ? '' : _props$label2,
      selectValue = props.selectValue,
      isDisabled = props.isDisabled,
      isSelected = props.isSelected,
      isAppleDevice = props.isAppleDevice;
    var getArrayIndex = function getArrayIndex(arr, item) {
      return arr && arr.length ? "".concat(arr.indexOf(item) + 1, " of ").concat(arr.length) : '';
    };
    if (context === 'value' && selectValue) {
      return "value ".concat(label, " focused, ").concat(getArrayIndex(selectValue, focused), ".");
    }
    if (context === 'menu' && isAppleDevice) {
      var disabled = isDisabled ? ' disabled' : '';
      var status = "".concat(isSelected ? ' selected' : '').concat(disabled);
      return "".concat(label).concat(status, ", ").concat(getArrayIndex(options, focused), ".");
    }
    return '';
  },
  onFilter: function onFilter(props) {
    var inputValue = props.inputValue,
      resultsMessage = props.resultsMessage;
    return "".concat(resultsMessage).concat(inputValue ? ' for search term ' + inputValue : '', ".");
  }
};

var LiveRegion = function LiveRegion(props) {
  var ariaSelection = props.ariaSelection,
    focusedOption = props.focusedOption,
    focusedValue = props.focusedValue,
    focusableOptions = props.focusableOptions,
    isFocused = props.isFocused,
    selectValue = props.selectValue,
    selectProps = props.selectProps,
    id = props.id,
    isAppleDevice = props.isAppleDevice;
  var ariaLiveMessages = selectProps.ariaLiveMessages,
    getOptionLabel = selectProps.getOptionLabel,
    inputValue = selectProps.inputValue,
    isMulti = selectProps.isMulti,
    isOptionDisabled = selectProps.isOptionDisabled,
    isSearchable = selectProps.isSearchable,
    menuIsOpen = selectProps.menuIsOpen,
    options = selectProps.options,
    screenReaderStatus = selectProps.screenReaderStatus,
    tabSelectsValue = selectProps.tabSelectsValue,
    isLoading = selectProps.isLoading;
  var ariaLabel = selectProps['aria-label'];
  var ariaLive = selectProps['aria-live'];

  // Update aria live message configuration when prop changes
  var messages = (0,react.useMemo)(function () {
    return (0,objectSpread2/* default */.A)((0,objectSpread2/* default */.A)({}, defaultAriaLiveMessages), ariaLiveMessages || {});
  }, [ariaLiveMessages]);

  // Update aria live selected option when prop changes
  var ariaSelected = (0,react.useMemo)(function () {
    var message = '';
    if (ariaSelection && messages.onChange) {
      var option = ariaSelection.option,
        selectedOptions = ariaSelection.options,
        removedValue = ariaSelection.removedValue,
        removedValues = ariaSelection.removedValues,
        value = ariaSelection.value;
      // select-option when !isMulti does not return option so we assume selected option is value
      var asOption = function asOption(val) {
        return !Array.isArray(val) ? val : null;
      };

      // If there is just one item from the action then get its label
      var selected = removedValue || option || asOption(value);
      var label = selected ? getOptionLabel(selected) : '';

      // If there are multiple items from the action then return an array of labels
      var multiSelected = selectedOptions || removedValues || undefined;
      var labels = multiSelected ? multiSelected.map(getOptionLabel) : [];
      var onChangeProps = (0,objectSpread2/* default */.A)({
        // multiSelected items are usually items that have already been selected
        // or set by the user as a default value so we assume they are not disabled
        isDisabled: selected && isOptionDisabled(selected, selectValue),
        label: label,
        labels: labels
      }, ariaSelection);
      message = messages.onChange(onChangeProps);
    }
    return message;
  }, [ariaSelection, messages, isOptionDisabled, selectValue, getOptionLabel]);
  var ariaFocused = (0,react.useMemo)(function () {
    var focusMsg = '';
    var focused = focusedOption || focusedValue;
    var isSelected = !!(focusedOption && selectValue && selectValue.includes(focusedOption));
    if (focused && messages.onFocus) {
      var onFocusProps = {
        focused: focused,
        label: getOptionLabel(focused),
        isDisabled: isOptionDisabled(focused, selectValue),
        isSelected: isSelected,
        options: focusableOptions,
        context: focused === focusedOption ? 'menu' : 'value',
        selectValue: selectValue,
        isAppleDevice: isAppleDevice
      };
      focusMsg = messages.onFocus(onFocusProps);
    }
    return focusMsg;
  }, [focusedOption, focusedValue, getOptionLabel, isOptionDisabled, messages, focusableOptions, selectValue, isAppleDevice]);
  var ariaResults = (0,react.useMemo)(function () {
    var resultsMsg = '';
    if (menuIsOpen && options.length && !isLoading && messages.onFilter) {
      var resultsMessage = screenReaderStatus({
        count: focusableOptions.length
      });
      resultsMsg = messages.onFilter({
        inputValue: inputValue,
        resultsMessage: resultsMessage
      });
    }
    return resultsMsg;
  }, [focusableOptions, inputValue, menuIsOpen, messages, options, screenReaderStatus, isLoading]);
  var isInitialFocus = (ariaSelection === null || ariaSelection === void 0 ? void 0 : ariaSelection.action) === 'initial-input-focus';
  var ariaGuidance = (0,react.useMemo)(function () {
    var guidanceMsg = '';
    if (messages.guidance) {
      var context = focusedValue ? 'value' : menuIsOpen ? 'menu' : 'input';
      guidanceMsg = messages.guidance({
        'aria-label': ariaLabel,
        context: context,
        isDisabled: focusedOption && isOptionDisabled(focusedOption, selectValue),
        isMulti: isMulti,
        isSearchable: isSearchable,
        tabSelectsValue: tabSelectsValue,
        isInitialFocus: isInitialFocus
      });
    }
    return guidanceMsg;
  }, [ariaLabel, focusedOption, focusedValue, isMulti, isOptionDisabled, isSearchable, menuIsOpen, messages, selectValue, tabSelectsValue, isInitialFocus]);
  var ScreenReaderText = (0,emotion_react_browser_esm/* jsx */.Y)(react.Fragment, null, (0,emotion_react_browser_esm/* jsx */.Y)("span", {
    id: "aria-selection"
  }, ariaSelected), (0,emotion_react_browser_esm/* jsx */.Y)("span", {
    id: "aria-focused"
  }, ariaFocused), (0,emotion_react_browser_esm/* jsx */.Y)("span", {
    id: "aria-results"
  }, ariaResults), (0,emotion_react_browser_esm/* jsx */.Y)("span", {
    id: "aria-guidance"
  }, ariaGuidance));
  return (0,emotion_react_browser_esm/* jsx */.Y)(react.Fragment, null, (0,emotion_react_browser_esm/* jsx */.Y)(A11yText$1, {
    id: id
  }, isInitialFocus && ScreenReaderText), (0,emotion_react_browser_esm/* jsx */.Y)(A11yText$1, {
    "aria-live": ariaLive,
    "aria-atomic": "false",
    "aria-relevant": "additions text",
    role: "log"
  }, isFocused && !isInitialFocus && ScreenReaderText));
};
var LiveRegion$1 = LiveRegion;

var diacritics = [{
  base: 'A',
  letters: "A\u24B6\uFF21\xC0\xC1\xC2\u1EA6\u1EA4\u1EAA\u1EA8\xC3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\xC4\u01DE\u1EA2\xC5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F"
}, {
  base: 'AA',
  letters: "\uA732"
}, {
  base: 'AE',
  letters: "\xC6\u01FC\u01E2"
}, {
  base: 'AO',
  letters: "\uA734"
}, {
  base: 'AU',
  letters: "\uA736"
}, {
  base: 'AV',
  letters: "\uA738\uA73A"
}, {
  base: 'AY',
  letters: "\uA73C"
}, {
  base: 'B',
  letters: "B\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181"
}, {
  base: 'C',
  letters: "C\u24B8\uFF23\u0106\u0108\u010A\u010C\xC7\u1E08\u0187\u023B\uA73E"
}, {
  base: 'D',
  letters: "D\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779"
}, {
  base: 'DZ',
  letters: "\u01F1\u01C4"
}, {
  base: 'Dz',
  letters: "\u01F2\u01C5"
}, {
  base: 'E',
  letters: "E\u24BA\uFF25\xC8\xC9\xCA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\xCB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E"
}, {
  base: 'F',
  letters: "F\u24BB\uFF26\u1E1E\u0191\uA77B"
}, {
  base: 'G',
  letters: "G\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E"
}, {
  base: 'H',
  letters: "H\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D"
}, {
  base: 'I',
  letters: "I\u24BE\uFF29\xCC\xCD\xCE\u0128\u012A\u012C\u0130\xCF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197"
}, {
  base: 'J',
  letters: "J\u24BF\uFF2A\u0134\u0248"
}, {
  base: 'K',
  letters: "K\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2"
}, {
  base: 'L',
  letters: "L\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780"
}, {
  base: 'LJ',
  letters: "\u01C7"
}, {
  base: 'Lj',
  letters: "\u01C8"
}, {
  base: 'M',
  letters: "M\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C"
}, {
  base: 'N',
  letters: "N\u24C3\uFF2E\u01F8\u0143\xD1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4"
}, {
  base: 'NJ',
  letters: "\u01CA"
}, {
  base: 'Nj',
  letters: "\u01CB"
}, {
  base: 'O',
  letters: "O\u24C4\uFF2F\xD2\xD3\xD4\u1ED2\u1ED0\u1ED6\u1ED4\xD5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\xD6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\xD8\u01FE\u0186\u019F\uA74A\uA74C"
}, {
  base: 'OI',
  letters: "\u01A2"
}, {
  base: 'OO',
  letters: "\uA74E"
}, {
  base: 'OU',
  letters: "\u0222"
}, {
  base: 'P',
  letters: "P\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754"
}, {
  base: 'Q',
  letters: "Q\u24C6\uFF31\uA756\uA758\u024A"
}, {
  base: 'R',
  letters: "R\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782"
}, {
  base: 'S',
  letters: "S\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784"
}, {
  base: 'T',
  letters: "T\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786"
}, {
  base: 'TZ',
  letters: "\uA728"
}, {
  base: 'U',
  letters: "U\u24CA\uFF35\xD9\xDA\xDB\u0168\u1E78\u016A\u1E7A\u016C\xDC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244"
}, {
  base: 'V',
  letters: "V\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245"
}, {
  base: 'VY',
  letters: "\uA760"
}, {
  base: 'W',
  letters: "W\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72"
}, {
  base: 'X',
  letters: "X\u24CD\uFF38\u1E8A\u1E8C"
}, {
  base: 'Y',
  letters: "Y\u24CE\uFF39\u1EF2\xDD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE"
}, {
  base: 'Z',
  letters: "Z\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762"
}, {
  base: 'a',
  letters: "a\u24D0\uFF41\u1E9A\xE0\xE1\xE2\u1EA7\u1EA5\u1EAB\u1EA9\xE3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\xE4\u01DF\u1EA3\xE5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250"
}, {
  base: 'aa',
  letters: "\uA733"
}, {
  base: 'ae',
  letters: "\xE6\u01FD\u01E3"
}, {
  base: 'ao',
  letters: "\uA735"
}, {
  base: 'au',
  letters: "\uA737"
}, {
  base: 'av',
  letters: "\uA739\uA73B"
}, {
  base: 'ay',
  letters: "\uA73D"
}, {
  base: 'b',
  letters: "b\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253"
}, {
  base: 'c',
  letters: "c\u24D2\uFF43\u0107\u0109\u010B\u010D\xE7\u1E09\u0188\u023C\uA73F\u2184"
}, {
  base: 'd',
  letters: "d\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A"
}, {
  base: 'dz',
  letters: "\u01F3\u01C6"
}, {
  base: 'e',
  letters: "e\u24D4\uFF45\xE8\xE9\xEA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\xEB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD"
}, {
  base: 'f',
  letters: "f\u24D5\uFF46\u1E1F\u0192\uA77C"
}, {
  base: 'g',
  letters: "g\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F"
}, {
  base: 'h',
  letters: "h\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265"
}, {
  base: 'hv',
  letters: "\u0195"
}, {
  base: 'i',
  letters: "i\u24D8\uFF49\xEC\xED\xEE\u0129\u012B\u012D\xEF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131"
}, {
  base: 'j',
  letters: "j\u24D9\uFF4A\u0135\u01F0\u0249"
}, {
  base: 'k',
  letters: "k\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3"
}, {
  base: 'l',
  letters: "l\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747"
}, {
  base: 'lj',
  letters: "\u01C9"
}, {
  base: 'm',
  letters: "m\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F"
}, {
  base: 'n',
  letters: "n\u24DD\uFF4E\u01F9\u0144\xF1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5"
}, {
  base: 'nj',
  letters: "\u01CC"
}, {
  base: 'o',
  letters: "o\u24DE\uFF4F\xF2\xF3\xF4\u1ED3\u1ED1\u1ED7\u1ED5\xF5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\xF6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\xF8\u01FF\u0254\uA74B\uA74D\u0275"
}, {
  base: 'oi',
  letters: "\u01A3"
}, {
  base: 'ou',
  letters: "\u0223"
}, {
  base: 'oo',
  letters: "\uA74F"
}, {
  base: 'p',
  letters: "p\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755"
}, {
  base: 'q',
  letters: "q\u24E0\uFF51\u024B\uA757\uA759"
}, {
  base: 'r',
  letters: "r\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783"
}, {
  base: 's',
  letters: "s\u24E2\uFF53\xDF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B"
}, {
  base: 't',
  letters: "t\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787"
}, {
  base: 'tz',
  letters: "\uA729"
}, {
  base: 'u',
  letters: "u\u24E4\uFF55\xF9\xFA\xFB\u0169\u1E79\u016B\u1E7B\u016D\xFC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289"
}, {
  base: 'v',
  letters: "v\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C"
}, {
  base: 'vy',
  letters: "\uA761"
}, {
  base: 'w',
  letters: "w\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73"
}, {
  base: 'x',
  letters: "x\u24E7\uFF58\u1E8B\u1E8D"
}, {
  base: 'y',
  letters: "y\u24E8\uFF59\u1EF3\xFD\u0177\u1EF9\u0233\u1E8F\xFF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF"
}, {
  base: 'z',
  letters: "z\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763"
}];
var anyDiacritic = new RegExp('[' + diacritics.map(function (d) {
  return d.letters;
}).join('') + ']', 'g');
var diacriticToBase = {};
for (var i = 0; i < diacritics.length; i++) {
  var diacritic = diacritics[i];
  for (var j = 0; j < diacritic.letters.length; j++) {
    diacriticToBase[diacritic.letters[j]] = diacritic.base;
  }
}
var stripDiacritics = function stripDiacritics(str) {
  return str.replace(anyDiacritic, function (match) {
    return diacriticToBase[match];
  });
};

var memoizedStripDiacriticsForInput = (0,memoize_one_esm/* default */.A)(stripDiacritics);
var trimString = function trimString(str) {
  return str.replace(/^\s+|\s+$/g, '');
};
var defaultStringify = function defaultStringify(option) {
  return "".concat(option.label, " ").concat(option.value);
};
var createFilter = function createFilter(config) {
  return function (option, rawInput) {
    // eslint-disable-next-line no-underscore-dangle
    if (option.data.__isNew__) return true;
    var _ignoreCase$ignoreAcc = (0,objectSpread2/* default */.A)({
        ignoreCase: true,
        ignoreAccents: true,
        stringify: defaultStringify,
        trim: true,
        matchFrom: 'any'
      }, config),
      ignoreCase = _ignoreCase$ignoreAcc.ignoreCase,
      ignoreAccents = _ignoreCase$ignoreAcc.ignoreAccents,
      stringify = _ignoreCase$ignoreAcc.stringify,
      trim = _ignoreCase$ignoreAcc.trim,
      matchFrom = _ignoreCase$ignoreAcc.matchFrom;
    var input = trim ? trimString(rawInput) : rawInput;
    var candidate = trim ? trimString(stringify(option)) : stringify(option);
    if (ignoreCase) {
      input = input.toLowerCase();
      candidate = candidate.toLowerCase();
    }
    if (ignoreAccents) {
      input = memoizedStripDiacriticsForInput(input);
      candidate = stripDiacritics(candidate);
    }
    return matchFrom === 'start' ? candidate.substr(0, input.length) === input : candidate.indexOf(input) > -1;
  };
};

var _excluded = ["innerRef"];
function DummyInput(_ref) {
  var innerRef = _ref.innerRef,
    props = (0,objectWithoutProperties/* default */.A)(_ref, _excluded);
  // Remove animation props not meant for HTML elements
  var filteredProps = (0,index_a301f526_esm.r)(props, 'onExited', 'in', 'enter', 'exit', 'appear');
  return (0,emotion_react_browser_esm/* jsx */.Y)("input", (0,esm_extends/* default */.A)({
    ref: innerRef
  }, filteredProps, {
    css: /*#__PURE__*/(0,emotion_react_browser_esm/* css */.AH)({
      label: 'dummyInput',
      // get rid of any default styles
      background: 0,
      border: 0,
      // important! this hides the flashing cursor
      caretColor: 'transparent',
      fontSize: 'inherit',
      gridArea: '1 / 1 / 2 / 3',
      outline: 0,
      padding: 0,
      // important! without `width` browsers won't allow focus
      width: 1,
      // remove cursor on desktop
      color: 'transparent',
      // remove cursor on mobile whilst maintaining "scroll into view" behaviour
      left: -100,
      opacity: 0,
      position: 'relative',
      transform: 'scale(.01)'
    },  true ? "" : 0,  true ? "" : 0)
  }));
}

var cancelScroll = function cancelScroll(event) {
  if (event.cancelable) event.preventDefault();
  event.stopPropagation();
};
function useScrollCapture(_ref) {
  var isEnabled = _ref.isEnabled,
    onBottomArrive = _ref.onBottomArrive,
    onBottomLeave = _ref.onBottomLeave,
    onTopArrive = _ref.onTopArrive,
    onTopLeave = _ref.onTopLeave;
  var isBottom = (0,react.useRef)(false);
  var isTop = (0,react.useRef)(false);
  var touchStart = (0,react.useRef)(0);
  var scrollTarget = (0,react.useRef)(null);
  var handleEventDelta = (0,react.useCallback)(function (event, delta) {
    if (scrollTarget.current === null) return;
    var _scrollTarget$current = scrollTarget.current,
      scrollTop = _scrollTarget$current.scrollTop,
      scrollHeight = _scrollTarget$current.scrollHeight,
      clientHeight = _scrollTarget$current.clientHeight;
    var target = scrollTarget.current;
    var isDeltaPositive = delta > 0;
    var availableScroll = scrollHeight - clientHeight - scrollTop;
    var shouldCancelScroll = false;

    // reset bottom/top flags
    if (availableScroll > delta && isBottom.current) {
      if (onBottomLeave) onBottomLeave(event);
      isBottom.current = false;
    }
    if (isDeltaPositive && isTop.current) {
      if (onTopLeave) onTopLeave(event);
      isTop.current = false;
    }

    // bottom limit
    if (isDeltaPositive && delta > availableScroll) {
      if (onBottomArrive && !isBottom.current) {
        onBottomArrive(event);
      }
      target.scrollTop = scrollHeight;
      shouldCancelScroll = true;
      isBottom.current = true;

      // top limit
    } else if (!isDeltaPositive && -delta > scrollTop) {
      if (onTopArrive && !isTop.current) {
        onTopArrive(event);
      }
      target.scrollTop = 0;
      shouldCancelScroll = true;
      isTop.current = true;
    }

    // cancel scroll
    if (shouldCancelScroll) {
      cancelScroll(event);
    }
  }, [onBottomArrive, onBottomLeave, onTopArrive, onTopLeave]);
  var onWheel = (0,react.useCallback)(function (event) {
    handleEventDelta(event, event.deltaY);
  }, [handleEventDelta]);
  var onTouchStart = (0,react.useCallback)(function (event) {
    // set touch start so we can calculate touchmove delta
    touchStart.current = event.changedTouches[0].clientY;
  }, []);
  var onTouchMove = (0,react.useCallback)(function (event) {
    var deltaY = touchStart.current - event.changedTouches[0].clientY;
    handleEventDelta(event, deltaY);
  }, [handleEventDelta]);
  var startListening = (0,react.useCallback)(function (el) {
    // bail early if no element is available to attach to
    if (!el) return;
    var notPassive = index_a301f526_esm.s ? {
      passive: false
    } : false;
    el.addEventListener('wheel', onWheel, notPassive);
    el.addEventListener('touchstart', onTouchStart, notPassive);
    el.addEventListener('touchmove', onTouchMove, notPassive);
  }, [onTouchMove, onTouchStart, onWheel]);
  var stopListening = (0,react.useCallback)(function (el) {
    // bail early if no element is available to detach from
    if (!el) return;
    el.removeEventListener('wheel', onWheel, false);
    el.removeEventListener('touchstart', onTouchStart, false);
    el.removeEventListener('touchmove', onTouchMove, false);
  }, [onTouchMove, onTouchStart, onWheel]);
  (0,react.useEffect)(function () {
    if (!isEnabled) return;
    var element = scrollTarget.current;
    startListening(element);
    return function () {
      stopListening(element);
    };
  }, [isEnabled, startListening, stopListening]);
  return function (element) {
    scrollTarget.current = element;
  };
}

var STYLE_KEYS = ['boxSizing', 'height', 'overflow', 'paddingRight', 'position'];
var LOCK_STYLES = {
  boxSizing: 'border-box',
  // account for possible declaration `width: 100%;` on body
  overflow: 'hidden',
  position: 'relative',
  height: '100%'
};
function preventTouchMove(e) {
  e.preventDefault();
}
function allowTouchMove(e) {
  e.stopPropagation();
}
function preventInertiaScroll() {
  var top = this.scrollTop;
  var totalScroll = this.scrollHeight;
  var currentScroll = top + this.offsetHeight;
  if (top === 0) {
    this.scrollTop = 1;
  } else if (currentScroll === totalScroll) {
    this.scrollTop = top - 1;
  }
}

// `ontouchstart` check works on most browsers
// `maxTouchPoints` works on IE10/11 and Surface
function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints;
}
var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
var activeScrollLocks = 0;
var listenerOptions = {
  capture: false,
  passive: false
};
function useScrollLock(_ref) {
  var isEnabled = _ref.isEnabled,
    _ref$accountForScroll = _ref.accountForScrollbars,
    accountForScrollbars = _ref$accountForScroll === void 0 ? true : _ref$accountForScroll;
  var originalStyles = (0,react.useRef)({});
  var scrollTarget = (0,react.useRef)(null);
  var addScrollLock = (0,react.useCallback)(function (touchScrollTarget) {
    if (!canUseDOM) return;
    var target = document.body;
    var targetStyle = target && target.style;
    if (accountForScrollbars) {
      // store any styles already applied to the body
      STYLE_KEYS.forEach(function (key) {
        var val = targetStyle && targetStyle[key];
        originalStyles.current[key] = val;
      });
    }

    // apply the lock styles and padding if this is the first scroll lock
    if (accountForScrollbars && activeScrollLocks < 1) {
      var currentPadding = parseInt(originalStyles.current.paddingRight, 10) || 0;
      var clientWidth = document.body ? document.body.clientWidth : 0;
      var adjustedPadding = window.innerWidth - clientWidth + currentPadding || 0;
      Object.keys(LOCK_STYLES).forEach(function (key) {
        var val = LOCK_STYLES[key];
        if (targetStyle) {
          targetStyle[key] = val;
        }
      });
      if (targetStyle) {
        targetStyle.paddingRight = "".concat(adjustedPadding, "px");
      }
    }

    // account for touch devices
    if (target && isTouchDevice()) {
      // Mobile Safari ignores { overflow: hidden } declaration on the body.
      target.addEventListener('touchmove', preventTouchMove, listenerOptions);

      // Allow scroll on provided target
      if (touchScrollTarget) {
        touchScrollTarget.addEventListener('touchstart', preventInertiaScroll, listenerOptions);
        touchScrollTarget.addEventListener('touchmove', allowTouchMove, listenerOptions);
      }
    }

    // increment active scroll locks
    activeScrollLocks += 1;
  }, [accountForScrollbars]);
  var removeScrollLock = (0,react.useCallback)(function (touchScrollTarget) {
    if (!canUseDOM) return;
    var target = document.body;
    var targetStyle = target && target.style;

    // safely decrement active scroll locks
    activeScrollLocks = Math.max(activeScrollLocks - 1, 0);

    // reapply original body styles, if any
    if (accountForScrollbars && activeScrollLocks < 1) {
      STYLE_KEYS.forEach(function (key) {
        var val = originalStyles.current[key];
        if (targetStyle) {
          targetStyle[key] = val;
        }
      });
    }

    // remove touch listeners
    if (target && isTouchDevice()) {
      target.removeEventListener('touchmove', preventTouchMove, listenerOptions);
      if (touchScrollTarget) {
        touchScrollTarget.removeEventListener('touchstart', preventInertiaScroll, listenerOptions);
        touchScrollTarget.removeEventListener('touchmove', allowTouchMove, listenerOptions);
      }
    }
  }, [accountForScrollbars]);
  (0,react.useEffect)(function () {
    if (!isEnabled) return;
    var element = scrollTarget.current;
    addScrollLock(element);
    return function () {
      removeScrollLock(element);
    };
  }, [isEnabled, addScrollLock, removeScrollLock]);
  return function (element) {
    scrollTarget.current = element;
  };
}

function _EMOTION_STRINGIFIED_CSS_ERROR__$1() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
var blurSelectInput = function blurSelectInput(event) {
  var element = event.target;
  return element.ownerDocument.activeElement && element.ownerDocument.activeElement.blur();
};
var _ref2$1 =  true ? {
  name: "1kfdb0e",
  styles: "position:fixed;left:0;bottom:0;right:0;top:0"
} : 0;
function ScrollManager(_ref) {
  var children = _ref.children,
    lockEnabled = _ref.lockEnabled,
    _ref$captureEnabled = _ref.captureEnabled,
    captureEnabled = _ref$captureEnabled === void 0 ? true : _ref$captureEnabled,
    onBottomArrive = _ref.onBottomArrive,
    onBottomLeave = _ref.onBottomLeave,
    onTopArrive = _ref.onTopArrive,
    onTopLeave = _ref.onTopLeave;
  var setScrollCaptureTarget = useScrollCapture({
    isEnabled: captureEnabled,
    onBottomArrive: onBottomArrive,
    onBottomLeave: onBottomLeave,
    onTopArrive: onTopArrive,
    onTopLeave: onTopLeave
  });
  var setScrollLockTarget = useScrollLock({
    isEnabled: lockEnabled
  });
  var targetRef = function targetRef(element) {
    setScrollCaptureTarget(element);
    setScrollLockTarget(element);
  };
  return (0,emotion_react_browser_esm/* jsx */.Y)(react.Fragment, null, lockEnabled && (0,emotion_react_browser_esm/* jsx */.Y)("div", {
    onClick: blurSelectInput,
    css: _ref2$1
  }), children(targetRef));
}

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }
var _ref2 =  true ? {
  name: "1a0ro4n-requiredInput",
  styles: "label:requiredInput;opacity:0;pointer-events:none;position:absolute;bottom:0;left:0;right:0;width:100%"
} : 0;
var RequiredInput = function RequiredInput(_ref) {
  var name = _ref.name,
    onFocus = _ref.onFocus;
  return (0,emotion_react_browser_esm/* jsx */.Y)("input", {
    required: true,
    name: name,
    tabIndex: -1,
    "aria-hidden": "true",
    onFocus: onFocus,
    css: _ref2
    // Prevent `Switching from uncontrolled to controlled` error
    ,
    value: "",
    onChange: function onChange() {}
  });
};
var RequiredInput$1 = RequiredInput;

/// <reference types="user-agent-data-types" />

function testPlatform(re) {
  var _window$navigator$use;
  return typeof window !== 'undefined' && window.navigator != null ? re.test(((_window$navigator$use = window.navigator['userAgentData']) === null || _window$navigator$use === void 0 ? void 0 : _window$navigator$use.platform) || window.navigator.platform) : false;
}
function isIPhone() {
  return testPlatform(/^iPhone/i);
}
function isMac() {
  return testPlatform(/^Mac/i);
}
function isIPad() {
  return testPlatform(/^iPad/i) ||
  // iPadOS 13 lies and says it's a Mac, but we can distinguish by detecting touch support.
  isMac() && navigator.maxTouchPoints > 1;
}
function isIOS() {
  return isIPhone() || isIPad();
}
function isAppleDevice() {
  return isMac() || isIOS();
}

var formatGroupLabel = function formatGroupLabel(group) {
  return group.label;
};
var getOptionLabel$1 = function getOptionLabel(option) {
  return option.label;
};
var getOptionValue$1 = function getOptionValue(option) {
  return option.value;
};
var isOptionDisabled = function isOptionDisabled(option) {
  return !!option.isDisabled;
};

var defaultStyles = {
  clearIndicator: index_a301f526_esm.a,
  container: index_a301f526_esm.b,
  control: index_a301f526_esm.d,
  dropdownIndicator: index_a301f526_esm.e,
  group: index_a301f526_esm.g,
  groupHeading: index_a301f526_esm.f,
  indicatorsContainer: index_a301f526_esm.i,
  indicatorSeparator: index_a301f526_esm.h,
  input: index_a301f526_esm.j,
  loadingIndicator: index_a301f526_esm.l,
  loadingMessage: index_a301f526_esm.k,
  menu: index_a301f526_esm.m,
  menuList: index_a301f526_esm.n,
  menuPortal: index_a301f526_esm.o,
  multiValue: index_a301f526_esm.p,
  multiValueLabel: index_a301f526_esm.q,
  multiValueRemove: index_a301f526_esm.t,
  noOptionsMessage: index_a301f526_esm.u,
  option: index_a301f526_esm.v,
  placeholder: index_a301f526_esm.w,
  singleValue: index_a301f526_esm.x,
  valueContainer: index_a301f526_esm.y
};
// Merge Utility
// Allows consumers to extend a base Select with additional styles

function mergeStyles(source) {
  var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  // initialize with source styles
  var styles = (0,objectSpread2/* default */.A)({}, source);

  // massage in target styles
  Object.keys(target).forEach(function (keyAsString) {
    var key = keyAsString;
    if (source[key]) {
      styles[key] = function (rsCss, props) {
        return target[key](source[key](rsCss, props), props);
      };
    } else {
      styles[key] = target[key];
    }
  });
  return styles;
}

var colors = {
  primary: '#2684FF',
  primary75: '#4C9AFF',
  primary50: '#B2D4FF',
  primary25: '#DEEBFF',
  danger: '#DE350B',
  dangerLight: '#FFBDAD',
  neutral0: 'hsl(0, 0%, 100%)',
  neutral5: 'hsl(0, 0%, 95%)',
  neutral10: 'hsl(0, 0%, 90%)',
  neutral20: 'hsl(0, 0%, 80%)',
  neutral30: 'hsl(0, 0%, 70%)',
  neutral40: 'hsl(0, 0%, 60%)',
  neutral50: 'hsl(0, 0%, 50%)',
  neutral60: 'hsl(0, 0%, 40%)',
  neutral70: 'hsl(0, 0%, 30%)',
  neutral80: 'hsl(0, 0%, 20%)',
  neutral90: 'hsl(0, 0%, 10%)'
};
var borderRadius = 4;
// Used to calculate consistent margin/padding on elements
var baseUnit = 4;
// The minimum height of the control
var controlHeight = 38;
// The amount of space between the control and menu */
var menuGutter = baseUnit * 2;
var spacing = {
  baseUnit: baseUnit,
  controlHeight: controlHeight,
  menuGutter: menuGutter
};
var defaultTheme = {
  borderRadius: borderRadius,
  colors: colors,
  spacing: spacing
};

var defaultProps = {
  'aria-live': 'polite',
  backspaceRemovesValue: true,
  blurInputOnSelect: (0,index_a301f526_esm.z)(),
  captureMenuScroll: !(0,index_a301f526_esm.z)(),
  classNames: {},
  closeMenuOnSelect: true,
  closeMenuOnScroll: false,
  components: {},
  controlShouldRenderValue: true,
  escapeClearsValue: false,
  filterOption: createFilter(),
  formatGroupLabel: formatGroupLabel,
  getOptionLabel: getOptionLabel$1,
  getOptionValue: getOptionValue$1,
  isDisabled: false,
  isLoading: false,
  isMulti: false,
  isRtl: false,
  isSearchable: true,
  isOptionDisabled: isOptionDisabled,
  loadingMessage: function loadingMessage() {
    return 'Loading...';
  },
  maxMenuHeight: 300,
  minMenuHeight: 140,
  menuIsOpen: false,
  menuPlacement: 'bottom',
  menuPosition: 'absolute',
  menuShouldBlockScroll: false,
  menuShouldScrollIntoView: !(0,index_a301f526_esm.A)(),
  noOptionsMessage: function noOptionsMessage() {
    return 'No options';
  },
  openMenuOnFocus: false,
  openMenuOnClick: true,
  options: [],
  pageSize: 5,
  placeholder: 'Select...',
  screenReaderStatus: function screenReaderStatus(_ref) {
    var count = _ref.count;
    return "".concat(count, " result").concat(count !== 1 ? 's' : '', " available");
  },
  styles: {},
  tabIndex: 0,
  tabSelectsValue: true,
  unstyled: false
};
function toCategorizedOption(props, option, selectValue, index) {
  var isDisabled = _isOptionDisabled(props, option, selectValue);
  var isSelected = _isOptionSelected(props, option, selectValue);
  var label = getOptionLabel(props, option);
  var value = getOptionValue(props, option);
  return {
    type: 'option',
    data: option,
    isDisabled: isDisabled,
    isSelected: isSelected,
    label: label,
    value: value,
    index: index
  };
}
function buildCategorizedOptions(props, selectValue) {
  return props.options.map(function (groupOrOption, groupOrOptionIndex) {
    if ('options' in groupOrOption) {
      var categorizedOptions = groupOrOption.options.map(function (option, optionIndex) {
        return toCategorizedOption(props, option, selectValue, optionIndex);
      }).filter(function (categorizedOption) {
        return isFocusable(props, categorizedOption);
      });
      return categorizedOptions.length > 0 ? {
        type: 'group',
        data: groupOrOption,
        options: categorizedOptions,
        index: groupOrOptionIndex
      } : undefined;
    }
    var categorizedOption = toCategorizedOption(props, groupOrOption, selectValue, groupOrOptionIndex);
    return isFocusable(props, categorizedOption) ? categorizedOption : undefined;
  }).filter(index_a301f526_esm.K);
}
function buildFocusableOptionsFromCategorizedOptions(categorizedOptions) {
  return categorizedOptions.reduce(function (optionsAccumulator, categorizedOption) {
    if (categorizedOption.type === 'group') {
      optionsAccumulator.push.apply(optionsAccumulator, (0,toConsumableArray/* default */.A)(categorizedOption.options.map(function (option) {
        return option.data;
      })));
    } else {
      optionsAccumulator.push(categorizedOption.data);
    }
    return optionsAccumulator;
  }, []);
}
function buildFocusableOptionsWithIds(categorizedOptions, optionId) {
  return categorizedOptions.reduce(function (optionsAccumulator, categorizedOption) {
    if (categorizedOption.type === 'group') {
      optionsAccumulator.push.apply(optionsAccumulator, (0,toConsumableArray/* default */.A)(categorizedOption.options.map(function (option) {
        return {
          data: option.data,
          id: "".concat(optionId, "-").concat(categorizedOption.index, "-").concat(option.index)
        };
      })));
    } else {
      optionsAccumulator.push({
        data: categorizedOption.data,
        id: "".concat(optionId, "-").concat(categorizedOption.index)
      });
    }
    return optionsAccumulator;
  }, []);
}
function buildFocusableOptions(props, selectValue) {
  return buildFocusableOptionsFromCategorizedOptions(buildCategorizedOptions(props, selectValue));
}
function isFocusable(props, categorizedOption) {
  var _props$inputValue = props.inputValue,
    inputValue = _props$inputValue === void 0 ? '' : _props$inputValue;
  var data = categorizedOption.data,
    isSelected = categorizedOption.isSelected,
    label = categorizedOption.label,
    value = categorizedOption.value;
  return (!shouldHideSelectedOptions(props) || !isSelected) && _filterOption(props, {
    label: label,
    value: value,
    data: data
  }, inputValue);
}
function getNextFocusedValue(state, nextSelectValue) {
  var focusedValue = state.focusedValue,
    lastSelectValue = state.selectValue;
  var lastFocusedIndex = lastSelectValue.indexOf(focusedValue);
  if (lastFocusedIndex > -1) {
    var nextFocusedIndex = nextSelectValue.indexOf(focusedValue);
    if (nextFocusedIndex > -1) {
      // the focused value is still in the selectValue, return it
      return focusedValue;
    } else if (lastFocusedIndex < nextSelectValue.length) {
      // the focusedValue is not present in the next selectValue array by
      // reference, so return the new value at the same index
      return nextSelectValue[lastFocusedIndex];
    }
  }
  return null;
}
function getNextFocusedOption(state, options) {
  var lastFocusedOption = state.focusedOption;
  return lastFocusedOption && options.indexOf(lastFocusedOption) > -1 ? lastFocusedOption : options[0];
}
var getFocusedOptionId = function getFocusedOptionId(focusableOptionsWithIds, focusedOption) {
  var _focusableOptionsWith;
  var focusedOptionId = (_focusableOptionsWith = focusableOptionsWithIds.find(function (option) {
    return option.data === focusedOption;
  })) === null || _focusableOptionsWith === void 0 ? void 0 : _focusableOptionsWith.id;
  return focusedOptionId || null;
};
var getOptionLabel = function getOptionLabel(props, data) {
  return props.getOptionLabel(data);
};
var getOptionValue = function getOptionValue(props, data) {
  return props.getOptionValue(data);
};
function _isOptionDisabled(props, option, selectValue) {
  return typeof props.isOptionDisabled === 'function' ? props.isOptionDisabled(option, selectValue) : false;
}
function _isOptionSelected(props, option, selectValue) {
  if (selectValue.indexOf(option) > -1) return true;
  if (typeof props.isOptionSelected === 'function') {
    return props.isOptionSelected(option, selectValue);
  }
  var candidate = getOptionValue(props, option);
  return selectValue.some(function (i) {
    return getOptionValue(props, i) === candidate;
  });
}
function _filterOption(props, option, inputValue) {
  return props.filterOption ? props.filterOption(option, inputValue) : true;
}
var shouldHideSelectedOptions = function shouldHideSelectedOptions(props) {
  var hideSelectedOptions = props.hideSelectedOptions,
    isMulti = props.isMulti;
  if (hideSelectedOptions === undefined) return isMulti;
  return hideSelectedOptions;
};
var instanceId = 1;
var Select = /*#__PURE__*/function (_Component) {
  _inherits(Select, _Component);
  var _super = _createSuper(Select);
  // Misc. Instance Properties
  // ------------------------------

  // TODO

  // Refs
  // ------------------------------

  // Lifecycle
  // ------------------------------

  function Select(_props) {
    var _this;
    _classCallCheck(this, Select);
    _this = _super.call(this, _props);
    _this.state = {
      ariaSelection: null,
      focusedOption: null,
      focusedOptionId: null,
      focusableOptionsWithIds: [],
      focusedValue: null,
      inputIsHidden: false,
      isFocused: false,
      selectValue: [],
      clearFocusValueOnUpdate: false,
      prevWasFocused: false,
      inputIsHiddenAfterUpdate: undefined,
      prevProps: undefined,
      instancePrefix: ''
    };
    _this.blockOptionHover = false;
    _this.isComposing = false;
    _this.commonProps = void 0;
    _this.initialTouchX = 0;
    _this.initialTouchY = 0;
    _this.openAfterFocus = false;
    _this.scrollToFocusedOptionOnUpdate = false;
    _this.userIsDragging = void 0;
    _this.isAppleDevice = isAppleDevice();
    _this.controlRef = null;
    _this.getControlRef = function (ref) {
      _this.controlRef = ref;
    };
    _this.focusedOptionRef = null;
    _this.getFocusedOptionRef = function (ref) {
      _this.focusedOptionRef = ref;
    };
    _this.menuListRef = null;
    _this.getMenuListRef = function (ref) {
      _this.menuListRef = ref;
    };
    _this.inputRef = null;
    _this.getInputRef = function (ref) {
      _this.inputRef = ref;
    };
    _this.focus = _this.focusInput;
    _this.blur = _this.blurInput;
    _this.onChange = function (newValue, actionMeta) {
      var _this$props = _this.props,
        onChange = _this$props.onChange,
        name = _this$props.name;
      actionMeta.name = name;
      _this.ariaOnChange(newValue, actionMeta);
      onChange(newValue, actionMeta);
    };
    _this.setValue = function (newValue, action, option) {
      var _this$props2 = _this.props,
        closeMenuOnSelect = _this$props2.closeMenuOnSelect,
        isMulti = _this$props2.isMulti,
        inputValue = _this$props2.inputValue;
      _this.onInputChange('', {
        action: 'set-value',
        prevInputValue: inputValue
      });
      if (closeMenuOnSelect) {
        _this.setState({
          inputIsHiddenAfterUpdate: !isMulti
        });
        _this.onMenuClose();
      }
      // when the select value should change, we should reset focusedValue
      _this.setState({
        clearFocusValueOnUpdate: true
      });
      _this.onChange(newValue, {
        action: action,
        option: option
      });
    };
    _this.selectOption = function (newValue) {
      var _this$props3 = _this.props,
        blurInputOnSelect = _this$props3.blurInputOnSelect,
        isMulti = _this$props3.isMulti,
        name = _this$props3.name;
      var selectValue = _this.state.selectValue;
      var deselected = isMulti && _this.isOptionSelected(newValue, selectValue);
      var isDisabled = _this.isOptionDisabled(newValue, selectValue);
      if (deselected) {
        var candidate = _this.getOptionValue(newValue);
        _this.setValue((0,index_a301f526_esm.B)(selectValue.filter(function (i) {
          return _this.getOptionValue(i) !== candidate;
        })), 'deselect-option', newValue);
      } else if (!isDisabled) {
        // Select option if option is not disabled
        if (isMulti) {
          _this.setValue((0,index_a301f526_esm.B)([].concat((0,toConsumableArray/* default */.A)(selectValue), [newValue])), 'select-option', newValue);
        } else {
          _this.setValue((0,index_a301f526_esm.C)(newValue), 'select-option');
        }
      } else {
        _this.ariaOnChange((0,index_a301f526_esm.C)(newValue), {
          action: 'select-option',
          option: newValue,
          name: name
        });
        return;
      }
      if (blurInputOnSelect) {
        _this.blurInput();
      }
    };
    _this.removeValue = function (removedValue) {
      var isMulti = _this.props.isMulti;
      var selectValue = _this.state.selectValue;
      var candidate = _this.getOptionValue(removedValue);
      var newValueArray = selectValue.filter(function (i) {
        return _this.getOptionValue(i) !== candidate;
      });
      var newValue = (0,index_a301f526_esm.D)(isMulti, newValueArray, newValueArray[0] || null);
      _this.onChange(newValue, {
        action: 'remove-value',
        removedValue: removedValue
      });
      _this.focusInput();
    };
    _this.clearValue = function () {
      var selectValue = _this.state.selectValue;
      _this.onChange((0,index_a301f526_esm.D)(_this.props.isMulti, [], null), {
        action: 'clear',
        removedValues: selectValue
      });
    };
    _this.popValue = function () {
      var isMulti = _this.props.isMulti;
      var selectValue = _this.state.selectValue;
      var lastSelectedValue = selectValue[selectValue.length - 1];
      var newValueArray = selectValue.slice(0, selectValue.length - 1);
      var newValue = (0,index_a301f526_esm.D)(isMulti, newValueArray, newValueArray[0] || null);
      _this.onChange(newValue, {
        action: 'pop-value',
        removedValue: lastSelectedValue
      });
    };
    _this.getFocusedOptionId = function (focusedOption) {
      return getFocusedOptionId(_this.state.focusableOptionsWithIds, focusedOption);
    };
    _this.getFocusableOptionsWithIds = function () {
      return buildFocusableOptionsWithIds(buildCategorizedOptions(_this.props, _this.state.selectValue), _this.getElementId('option'));
    };
    _this.getValue = function () {
      return _this.state.selectValue;
    };
    _this.cx = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return index_a301f526_esm.E.apply(void 0, [_this.props.classNamePrefix].concat(args));
    };
    _this.getOptionLabel = function (data) {
      return getOptionLabel(_this.props, data);
    };
    _this.getOptionValue = function (data) {
      return getOptionValue(_this.props, data);
    };
    _this.getStyles = function (key, props) {
      var unstyled = _this.props.unstyled;
      var base = defaultStyles[key](props, unstyled);
      base.boxSizing = 'border-box';
      var custom = _this.props.styles[key];
      return custom ? custom(base, props) : base;
    };
    _this.getClassNames = function (key, props) {
      var _this$props$className, _this$props$className2;
      return (_this$props$className = (_this$props$className2 = _this.props.classNames)[key]) === null || _this$props$className === void 0 ? void 0 : _this$props$className.call(_this$props$className2, props);
    };
    _this.getElementId = function (element) {
      return "".concat(_this.state.instancePrefix, "-").concat(element);
    };
    _this.getComponents = function () {
      return (0,index_a301f526_esm.F)(_this.props);
    };
    _this.buildCategorizedOptions = function () {
      return buildCategorizedOptions(_this.props, _this.state.selectValue);
    };
    _this.getCategorizedOptions = function () {
      return _this.props.menuIsOpen ? _this.buildCategorizedOptions() : [];
    };
    _this.buildFocusableOptions = function () {
      return buildFocusableOptionsFromCategorizedOptions(_this.buildCategorizedOptions());
    };
    _this.getFocusableOptions = function () {
      return _this.props.menuIsOpen ? _this.buildFocusableOptions() : [];
    };
    _this.ariaOnChange = function (value, actionMeta) {
      _this.setState({
        ariaSelection: (0,objectSpread2/* default */.A)({
          value: value
        }, actionMeta)
      });
    };
    _this.onMenuMouseDown = function (event) {
      if (event.button !== 0) {
        return;
      }
      event.stopPropagation();
      event.preventDefault();
      _this.focusInput();
    };
    _this.onMenuMouseMove = function (event) {
      _this.blockOptionHover = false;
    };
    _this.onControlMouseDown = function (event) {
      // Event captured by dropdown indicator
      if (event.defaultPrevented) {
        return;
      }
      var openMenuOnClick = _this.props.openMenuOnClick;
      if (!_this.state.isFocused) {
        if (openMenuOnClick) {
          _this.openAfterFocus = true;
        }
        _this.focusInput();
      } else if (!_this.props.menuIsOpen) {
        if (openMenuOnClick) {
          _this.openMenu('first');
        }
      } else {
        if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
          _this.onMenuClose();
        }
      }
      if (event.target.tagName !== 'INPUT' && event.target.tagName !== 'TEXTAREA') {
        event.preventDefault();
      }
    };
    _this.onDropdownIndicatorMouseDown = function (event) {
      // ignore mouse events that weren't triggered by the primary button
      if (event && event.type === 'mousedown' && event.button !== 0) {
        return;
      }
      if (_this.props.isDisabled) return;
      var _this$props4 = _this.props,
        isMulti = _this$props4.isMulti,
        menuIsOpen = _this$props4.menuIsOpen;
      _this.focusInput();
      if (menuIsOpen) {
        _this.setState({
          inputIsHiddenAfterUpdate: !isMulti
        });
        _this.onMenuClose();
      } else {
        _this.openMenu('first');
      }
      event.preventDefault();
    };
    _this.onClearIndicatorMouseDown = function (event) {
      // ignore mouse events that weren't triggered by the primary button
      if (event && event.type === 'mousedown' && event.button !== 0) {
        return;
      }
      _this.clearValue();
      event.preventDefault();
      _this.openAfterFocus = false;
      if (event.type === 'touchend') {
        _this.focusInput();
      } else {
        setTimeout(function () {
          return _this.focusInput();
        });
      }
    };
    _this.onScroll = function (event) {
      if (typeof _this.props.closeMenuOnScroll === 'boolean') {
        if (event.target instanceof HTMLElement && (0,index_a301f526_esm.G)(event.target)) {
          _this.props.onMenuClose();
        }
      } else if (typeof _this.props.closeMenuOnScroll === 'function') {
        if (_this.props.closeMenuOnScroll(event)) {
          _this.props.onMenuClose();
        }
      }
    };
    _this.onCompositionStart = function () {
      _this.isComposing = true;
    };
    _this.onCompositionEnd = function () {
      _this.isComposing = false;
    };
    _this.onTouchStart = function (_ref2) {
      var touches = _ref2.touches;
      var touch = touches && touches.item(0);
      if (!touch) {
        return;
      }
      _this.initialTouchX = touch.clientX;
      _this.initialTouchY = touch.clientY;
      _this.userIsDragging = false;
    };
    _this.onTouchMove = function (_ref3) {
      var touches = _ref3.touches;
      var touch = touches && touches.item(0);
      if (!touch) {
        return;
      }
      var deltaX = Math.abs(touch.clientX - _this.initialTouchX);
      var deltaY = Math.abs(touch.clientY - _this.initialTouchY);
      var moveThreshold = 5;
      _this.userIsDragging = deltaX > moveThreshold || deltaY > moveThreshold;
    };
    _this.onTouchEnd = function (event) {
      if (_this.userIsDragging) return;

      // close the menu if the user taps outside
      // we're checking on event.target here instead of event.currentTarget, because we want to assert information
      // on events on child elements, not the document (which we've attached this handler to).
      if (_this.controlRef && !_this.controlRef.contains(event.target) && _this.menuListRef && !_this.menuListRef.contains(event.target)) {
        _this.blurInput();
      }

      // reset move vars
      _this.initialTouchX = 0;
      _this.initialTouchY = 0;
    };
    _this.onControlTouchEnd = function (event) {
      if (_this.userIsDragging) return;
      _this.onControlMouseDown(event);
    };
    _this.onClearIndicatorTouchEnd = function (event) {
      if (_this.userIsDragging) return;
      _this.onClearIndicatorMouseDown(event);
    };
    _this.onDropdownIndicatorTouchEnd = function (event) {
      if (_this.userIsDragging) return;
      _this.onDropdownIndicatorMouseDown(event);
    };
    _this.handleInputChange = function (event) {
      var prevInputValue = _this.props.inputValue;
      var inputValue = event.currentTarget.value;
      _this.setState({
        inputIsHiddenAfterUpdate: false
      });
      _this.onInputChange(inputValue, {
        action: 'input-change',
        prevInputValue: prevInputValue
      });
      if (!_this.props.menuIsOpen) {
        _this.onMenuOpen();
      }
    };
    _this.onInputFocus = function (event) {
      if (_this.props.onFocus) {
        _this.props.onFocus(event);
      }
      _this.setState({
        inputIsHiddenAfterUpdate: false,
        isFocused: true
      });
      if (_this.openAfterFocus || _this.props.openMenuOnFocus) {
        _this.openMenu('first');
      }
      _this.openAfterFocus = false;
    };
    _this.onInputBlur = function (event) {
      var prevInputValue = _this.props.inputValue;
      if (_this.menuListRef && _this.menuListRef.contains(document.activeElement)) {
        _this.inputRef.focus();
        return;
      }
      if (_this.props.onBlur) {
        _this.props.onBlur(event);
      }
      _this.onInputChange('', {
        action: 'input-blur',
        prevInputValue: prevInputValue
      });
      _this.onMenuClose();
      _this.setState({
        focusedValue: null,
        isFocused: false
      });
    };
    _this.onOptionHover = function (focusedOption) {
      if (_this.blockOptionHover || _this.state.focusedOption === focusedOption) {
        return;
      }
      var options = _this.getFocusableOptions();
      var focusedOptionIndex = options.indexOf(focusedOption);
      _this.setState({
        focusedOption: focusedOption,
        focusedOptionId: focusedOptionIndex > -1 ? _this.getFocusedOptionId(focusedOption) : null
      });
    };
    _this.shouldHideSelectedOptions = function () {
      return shouldHideSelectedOptions(_this.props);
    };
    _this.onValueInputFocus = function (e) {
      e.preventDefault();
      e.stopPropagation();
      _this.focus();
    };
    _this.onKeyDown = function (event) {
      var _this$props5 = _this.props,
        isMulti = _this$props5.isMulti,
        backspaceRemovesValue = _this$props5.backspaceRemovesValue,
        escapeClearsValue = _this$props5.escapeClearsValue,
        inputValue = _this$props5.inputValue,
        isClearable = _this$props5.isClearable,
        isDisabled = _this$props5.isDisabled,
        menuIsOpen = _this$props5.menuIsOpen,
        onKeyDown = _this$props5.onKeyDown,
        tabSelectsValue = _this$props5.tabSelectsValue,
        openMenuOnFocus = _this$props5.openMenuOnFocus;
      var _this$state = _this.state,
        focusedOption = _this$state.focusedOption,
        focusedValue = _this$state.focusedValue,
        selectValue = _this$state.selectValue;
      if (isDisabled) return;
      if (typeof onKeyDown === 'function') {
        onKeyDown(event);
        if (event.defaultPrevented) {
          return;
        }
      }

      // Block option hover events when the user has just pressed a key
      _this.blockOptionHover = true;
      switch (event.key) {
        case 'ArrowLeft':
          if (!isMulti || inputValue) return;
          _this.focusValue('previous');
          break;
        case 'ArrowRight':
          if (!isMulti || inputValue) return;
          _this.focusValue('next');
          break;
        case 'Delete':
        case 'Backspace':
          if (inputValue) return;
          if (focusedValue) {
            _this.removeValue(focusedValue);
          } else {
            if (!backspaceRemovesValue) return;
            if (isMulti) {
              _this.popValue();
            } else if (isClearable) {
              _this.clearValue();
            }
          }
          break;
        case 'Tab':
          if (_this.isComposing) return;
          if (event.shiftKey || !menuIsOpen || !tabSelectsValue || !focusedOption ||
          // don't capture the event if the menu opens on focus and the focused
          // option is already selected; it breaks the flow of navigation
          openMenuOnFocus && _this.isOptionSelected(focusedOption, selectValue)) {
            return;
          }
          _this.selectOption(focusedOption);
          break;
        case 'Enter':
          if (event.keyCode === 229) {
            // ignore the keydown event from an Input Method Editor(IME)
            // ref. https://www.w3.org/TR/uievents/#determine-keydown-keyup-keyCode
            break;
          }
          if (menuIsOpen) {
            if (!focusedOption) return;
            if (_this.isComposing) return;
            _this.selectOption(focusedOption);
            break;
          }
          return;
        case 'Escape':
          if (menuIsOpen) {
            _this.setState({
              inputIsHiddenAfterUpdate: false
            });
            _this.onInputChange('', {
              action: 'menu-close',
              prevInputValue: inputValue
            });
            _this.onMenuClose();
          } else if (isClearable && escapeClearsValue) {
            _this.clearValue();
          }
          break;
        case ' ':
          // space
          if (inputValue) {
            return;
          }
          if (!menuIsOpen) {
            _this.openMenu('first');
            break;
          }
          if (!focusedOption) return;
          _this.selectOption(focusedOption);
          break;
        case 'ArrowUp':
          if (menuIsOpen) {
            _this.focusOption('up');
          } else {
            _this.openMenu('last');
          }
          break;
        case 'ArrowDown':
          if (menuIsOpen) {
            _this.focusOption('down');
          } else {
            _this.openMenu('first');
          }
          break;
        case 'PageUp':
          if (!menuIsOpen) return;
          _this.focusOption('pageup');
          break;
        case 'PageDown':
          if (!menuIsOpen) return;
          _this.focusOption('pagedown');
          break;
        case 'Home':
          if (!menuIsOpen) return;
          _this.focusOption('first');
          break;
        case 'End':
          if (!menuIsOpen) return;
          _this.focusOption('last');
          break;
        default:
          return;
      }
      event.preventDefault();
    };
    _this.state.instancePrefix = 'react-select-' + (_this.props.instanceId || ++instanceId);
    _this.state.selectValue = (0,index_a301f526_esm.H)(_props.value);
    // Set focusedOption if menuIsOpen is set on init (e.g. defaultMenuIsOpen)
    if (_props.menuIsOpen && _this.state.selectValue.length) {
      var focusableOptionsWithIds = _this.getFocusableOptionsWithIds();
      var focusableOptions = _this.buildFocusableOptions();
      var optionIndex = focusableOptions.indexOf(_this.state.selectValue[0]);
      _this.state.focusableOptionsWithIds = focusableOptionsWithIds;
      _this.state.focusedOption = focusableOptions[optionIndex];
      _this.state.focusedOptionId = getFocusedOptionId(focusableOptionsWithIds, focusableOptions[optionIndex]);
    }
    return _this;
  }
  _createClass(Select, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.startListeningComposition();
      this.startListeningToTouch();
      if (this.props.closeMenuOnScroll && document && document.addEventListener) {
        // Listen to all scroll events, and filter them out inside of 'onScroll'
        document.addEventListener('scroll', this.onScroll, true);
      }
      if (this.props.autoFocus) {
        this.focusInput();
      }

      // Scroll focusedOption into view if menuIsOpen is set on mount (e.g. defaultMenuIsOpen)
      if (this.props.menuIsOpen && this.state.focusedOption && this.menuListRef && this.focusedOptionRef) {
        (0,index_a301f526_esm.I)(this.menuListRef, this.focusedOptionRef);
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props6 = this.props,
        isDisabled = _this$props6.isDisabled,
        menuIsOpen = _this$props6.menuIsOpen;
      var isFocused = this.state.isFocused;
      if (
      // ensure focus is restored correctly when the control becomes enabled
      isFocused && !isDisabled && prevProps.isDisabled ||
      // ensure focus is on the Input when the menu opens
      isFocused && menuIsOpen && !prevProps.menuIsOpen) {
        this.focusInput();
      }
      if (isFocused && isDisabled && !prevProps.isDisabled) {
        // ensure select state gets blurred in case Select is programmatically disabled while focused
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          isFocused: false
        }, this.onMenuClose);
      } else if (!isFocused && !isDisabled && prevProps.isDisabled && this.inputRef === document.activeElement) {
        // ensure select state gets focused in case Select is programatically re-enabled while focused (Firefox)
        // eslint-disable-next-line react/no-did-update-set-state
        this.setState({
          isFocused: true
        });
      }

      // scroll the focused option into view if necessary
      if (this.menuListRef && this.focusedOptionRef && this.scrollToFocusedOptionOnUpdate) {
        (0,index_a301f526_esm.I)(this.menuListRef, this.focusedOptionRef);
        this.scrollToFocusedOptionOnUpdate = false;
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.stopListeningComposition();
      this.stopListeningToTouch();
      document.removeEventListener('scroll', this.onScroll, true);
    }

    // ==============================
    // Consumer Handlers
    // ==============================
  }, {
    key: "onMenuOpen",
    value: function onMenuOpen() {
      this.props.onMenuOpen();
    }
  }, {
    key: "onMenuClose",
    value: function onMenuClose() {
      this.onInputChange('', {
        action: 'menu-close',
        prevInputValue: this.props.inputValue
      });
      this.props.onMenuClose();
    }
  }, {
    key: "onInputChange",
    value: function onInputChange(newValue, actionMeta) {
      this.props.onInputChange(newValue, actionMeta);
    }

    // ==============================
    // Methods
    // ==============================
  }, {
    key: "focusInput",
    value: function focusInput() {
      if (!this.inputRef) return;
      this.inputRef.focus();
    }
  }, {
    key: "blurInput",
    value: function blurInput() {
      if (!this.inputRef) return;
      this.inputRef.blur();
    }

    // aliased for consumers
  }, {
    key: "openMenu",
    value: function openMenu(focusOption) {
      var _this2 = this;
      var _this$state2 = this.state,
        selectValue = _this$state2.selectValue,
        isFocused = _this$state2.isFocused;
      var focusableOptions = this.buildFocusableOptions();
      var openAtIndex = focusOption === 'first' ? 0 : focusableOptions.length - 1;
      if (!this.props.isMulti) {
        var selectedIndex = focusableOptions.indexOf(selectValue[0]);
        if (selectedIndex > -1) {
          openAtIndex = selectedIndex;
        }
      }

      // only scroll if the menu isn't already open
      this.scrollToFocusedOptionOnUpdate = !(isFocused && this.menuListRef);
      this.setState({
        inputIsHiddenAfterUpdate: false,
        focusedValue: null,
        focusedOption: focusableOptions[openAtIndex],
        focusedOptionId: this.getFocusedOptionId(focusableOptions[openAtIndex])
      }, function () {
        return _this2.onMenuOpen();
      });
    }
  }, {
    key: "focusValue",
    value: function focusValue(direction) {
      var _this$state3 = this.state,
        selectValue = _this$state3.selectValue,
        focusedValue = _this$state3.focusedValue;

      // Only multiselects support value focusing
      if (!this.props.isMulti) return;
      this.setState({
        focusedOption: null
      });
      var focusedIndex = selectValue.indexOf(focusedValue);
      if (!focusedValue) {
        focusedIndex = -1;
      }
      var lastIndex = selectValue.length - 1;
      var nextFocus = -1;
      if (!selectValue.length) return;
      switch (direction) {
        case 'previous':
          if (focusedIndex === 0) {
            // don't cycle from the start to the end
            nextFocus = 0;
          } else if (focusedIndex === -1) {
            // if nothing is focused, focus the last value first
            nextFocus = lastIndex;
          } else {
            nextFocus = focusedIndex - 1;
          }
          break;
        case 'next':
          if (focusedIndex > -1 && focusedIndex < lastIndex) {
            nextFocus = focusedIndex + 1;
          }
          break;
      }
      this.setState({
        inputIsHidden: nextFocus !== -1,
        focusedValue: selectValue[nextFocus]
      });
    }
  }, {
    key: "focusOption",
    value: function focusOption() {
      var direction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'first';
      var pageSize = this.props.pageSize;
      var focusedOption = this.state.focusedOption;
      var options = this.getFocusableOptions();
      if (!options.length) return;
      var nextFocus = 0; // handles 'first'
      var focusedIndex = options.indexOf(focusedOption);
      if (!focusedOption) {
        focusedIndex = -1;
      }
      if (direction === 'up') {
        nextFocus = focusedIndex > 0 ? focusedIndex - 1 : options.length - 1;
      } else if (direction === 'down') {
        nextFocus = (focusedIndex + 1) % options.length;
      } else if (direction === 'pageup') {
        nextFocus = focusedIndex - pageSize;
        if (nextFocus < 0) nextFocus = 0;
      } else if (direction === 'pagedown') {
        nextFocus = focusedIndex + pageSize;
        if (nextFocus > options.length - 1) nextFocus = options.length - 1;
      } else if (direction === 'last') {
        nextFocus = options.length - 1;
      }
      this.scrollToFocusedOptionOnUpdate = true;
      this.setState({
        focusedOption: options[nextFocus],
        focusedValue: null,
        focusedOptionId: this.getFocusedOptionId(options[nextFocus])
      });
    }
  }, {
    key: "getTheme",
    value:
    // ==============================
    // Getters
    // ==============================

    function getTheme() {
      // Use the default theme if there are no customisations.
      if (!this.props.theme) {
        return defaultTheme;
      }
      // If the theme prop is a function, assume the function
      // knows how to merge the passed-in default theme with
      // its own modifications.
      if (typeof this.props.theme === 'function') {
        return this.props.theme(defaultTheme);
      }
      // Otherwise, if a plain theme object was passed in,
      // overlay it with the default theme.
      return (0,objectSpread2/* default */.A)((0,objectSpread2/* default */.A)({}, defaultTheme), this.props.theme);
    }
  }, {
    key: "getCommonProps",
    value: function getCommonProps() {
      var clearValue = this.clearValue,
        cx = this.cx,
        getStyles = this.getStyles,
        getClassNames = this.getClassNames,
        getValue = this.getValue,
        selectOption = this.selectOption,
        setValue = this.setValue,
        props = this.props;
      var isMulti = props.isMulti,
        isRtl = props.isRtl,
        options = props.options;
      var hasValue = this.hasValue();
      return {
        clearValue: clearValue,
        cx: cx,
        getStyles: getStyles,
        getClassNames: getClassNames,
        getValue: getValue,
        hasValue: hasValue,
        isMulti: isMulti,
        isRtl: isRtl,
        options: options,
        selectOption: selectOption,
        selectProps: props,
        setValue: setValue,
        theme: this.getTheme()
      };
    }
  }, {
    key: "hasValue",
    value: function hasValue() {
      var selectValue = this.state.selectValue;
      return selectValue.length > 0;
    }
  }, {
    key: "hasOptions",
    value: function hasOptions() {
      return !!this.getFocusableOptions().length;
    }
  }, {
    key: "isClearable",
    value: function isClearable() {
      var _this$props7 = this.props,
        isClearable = _this$props7.isClearable,
        isMulti = _this$props7.isMulti;

      // single select, by default, IS NOT clearable
      // multi select, by default, IS clearable
      if (isClearable === undefined) return isMulti;
      return isClearable;
    }
  }, {
    key: "isOptionDisabled",
    value: function isOptionDisabled(option, selectValue) {
      return _isOptionDisabled(this.props, option, selectValue);
    }
  }, {
    key: "isOptionSelected",
    value: function isOptionSelected(option, selectValue) {
      return _isOptionSelected(this.props, option, selectValue);
    }
  }, {
    key: "filterOption",
    value: function filterOption(option, inputValue) {
      return _filterOption(this.props, option, inputValue);
    }
  }, {
    key: "formatOptionLabel",
    value: function formatOptionLabel(data, context) {
      if (typeof this.props.formatOptionLabel === 'function') {
        var _inputValue = this.props.inputValue;
        var _selectValue = this.state.selectValue;
        return this.props.formatOptionLabel(data, {
          context: context,
          inputValue: _inputValue,
          selectValue: _selectValue
        });
      } else {
        return this.getOptionLabel(data);
      }
    }
  }, {
    key: "formatGroupLabel",
    value: function formatGroupLabel(data) {
      return this.props.formatGroupLabel(data);
    }

    // ==============================
    // Mouse Handlers
    // ==============================
  }, {
    key: "startListeningComposition",
    value:
    // ==============================
    // Composition Handlers
    // ==============================

    function startListeningComposition() {
      if (document && document.addEventListener) {
        document.addEventListener('compositionstart', this.onCompositionStart, false);
        document.addEventListener('compositionend', this.onCompositionEnd, false);
      }
    }
  }, {
    key: "stopListeningComposition",
    value: function stopListeningComposition() {
      if (document && document.removeEventListener) {
        document.removeEventListener('compositionstart', this.onCompositionStart);
        document.removeEventListener('compositionend', this.onCompositionEnd);
      }
    }
  }, {
    key: "startListeningToTouch",
    value:
    // ==============================
    // Touch Handlers
    // ==============================

    function startListeningToTouch() {
      if (document && document.addEventListener) {
        document.addEventListener('touchstart', this.onTouchStart, false);
        document.addEventListener('touchmove', this.onTouchMove, false);
        document.addEventListener('touchend', this.onTouchEnd, false);
      }
    }
  }, {
    key: "stopListeningToTouch",
    value: function stopListeningToTouch() {
      if (document && document.removeEventListener) {
        document.removeEventListener('touchstart', this.onTouchStart);
        document.removeEventListener('touchmove', this.onTouchMove);
        document.removeEventListener('touchend', this.onTouchEnd);
      }
    }
  }, {
    key: "renderInput",
    value:
    // ==============================
    // Renderers
    // ==============================
    function renderInput() {
      var _this$props8 = this.props,
        isDisabled = _this$props8.isDisabled,
        isSearchable = _this$props8.isSearchable,
        inputId = _this$props8.inputId,
        inputValue = _this$props8.inputValue,
        tabIndex = _this$props8.tabIndex,
        form = _this$props8.form,
        menuIsOpen = _this$props8.menuIsOpen,
        required = _this$props8.required;
      var _this$getComponents = this.getComponents(),
        Input = _this$getComponents.Input;
      var _this$state4 = this.state,
        inputIsHidden = _this$state4.inputIsHidden,
        ariaSelection = _this$state4.ariaSelection;
      var commonProps = this.commonProps;
      var id = inputId || this.getElementId('input');

      // aria attributes makes the JSX "noisy", separated for clarity
      var ariaAttributes = (0,objectSpread2/* default */.A)((0,objectSpread2/* default */.A)((0,objectSpread2/* default */.A)({
        'aria-autocomplete': 'list',
        'aria-expanded': menuIsOpen,
        'aria-haspopup': true,
        'aria-errormessage': this.props['aria-errormessage'],
        'aria-invalid': this.props['aria-invalid'],
        'aria-label': this.props['aria-label'],
        'aria-labelledby': this.props['aria-labelledby'],
        'aria-required': required,
        role: 'combobox',
        'aria-activedescendant': this.isAppleDevice ? undefined : this.state.focusedOptionId || ''
      }, menuIsOpen && {
        'aria-controls': this.getElementId('listbox')
      }), !isSearchable && {
        'aria-readonly': true
      }), this.hasValue() ? (ariaSelection === null || ariaSelection === void 0 ? void 0 : ariaSelection.action) === 'initial-input-focus' && {
        'aria-describedby': this.getElementId('live-region')
      } : {
        'aria-describedby': this.getElementId('placeholder')
      });
      if (!isSearchable) {
        // use a dummy input to maintain focus/blur functionality
        return /*#__PURE__*/react.createElement(DummyInput, (0,esm_extends/* default */.A)({
          id: id,
          innerRef: this.getInputRef,
          onBlur: this.onInputBlur,
          onChange: index_a301f526_esm.J,
          onFocus: this.onInputFocus,
          disabled: isDisabled,
          tabIndex: tabIndex,
          inputMode: "none",
          form: form,
          value: ""
        }, ariaAttributes));
      }
      return /*#__PURE__*/react.createElement(Input, (0,esm_extends/* default */.A)({}, commonProps, {
        autoCapitalize: "none",
        autoComplete: "off",
        autoCorrect: "off",
        id: id,
        innerRef: this.getInputRef,
        isDisabled: isDisabled,
        isHidden: inputIsHidden,
        onBlur: this.onInputBlur,
        onChange: this.handleInputChange,
        onFocus: this.onInputFocus,
        spellCheck: "false",
        tabIndex: tabIndex,
        form: form,
        type: "text",
        value: inputValue
      }, ariaAttributes));
    }
  }, {
    key: "renderPlaceholderOrValue",
    value: function renderPlaceholderOrValue() {
      var _this3 = this;
      var _this$getComponents2 = this.getComponents(),
        MultiValue = _this$getComponents2.MultiValue,
        MultiValueContainer = _this$getComponents2.MultiValueContainer,
        MultiValueLabel = _this$getComponents2.MultiValueLabel,
        MultiValueRemove = _this$getComponents2.MultiValueRemove,
        SingleValue = _this$getComponents2.SingleValue,
        Placeholder = _this$getComponents2.Placeholder;
      var commonProps = this.commonProps;
      var _this$props9 = this.props,
        controlShouldRenderValue = _this$props9.controlShouldRenderValue,
        isDisabled = _this$props9.isDisabled,
        isMulti = _this$props9.isMulti,
        inputValue = _this$props9.inputValue,
        placeholder = _this$props9.placeholder;
      var _this$state5 = this.state,
        selectValue = _this$state5.selectValue,
        focusedValue = _this$state5.focusedValue,
        isFocused = _this$state5.isFocused;
      if (!this.hasValue() || !controlShouldRenderValue) {
        return inputValue ? null : /*#__PURE__*/react.createElement(Placeholder, (0,esm_extends/* default */.A)({}, commonProps, {
          key: "placeholder",
          isDisabled: isDisabled,
          isFocused: isFocused,
          innerProps: {
            id: this.getElementId('placeholder')
          }
        }), placeholder);
      }
      if (isMulti) {
        return selectValue.map(function (opt, index) {
          var isOptionFocused = opt === focusedValue;
          var key = "".concat(_this3.getOptionLabel(opt), "-").concat(_this3.getOptionValue(opt));
          return /*#__PURE__*/react.createElement(MultiValue, (0,esm_extends/* default */.A)({}, commonProps, {
            components: {
              Container: MultiValueContainer,
              Label: MultiValueLabel,
              Remove: MultiValueRemove
            },
            isFocused: isOptionFocused,
            isDisabled: isDisabled,
            key: key,
            index: index,
            removeProps: {
              onClick: function onClick() {
                return _this3.removeValue(opt);
              },
              onTouchEnd: function onTouchEnd() {
                return _this3.removeValue(opt);
              },
              onMouseDown: function onMouseDown(e) {
                e.preventDefault();
              }
            },
            data: opt
          }), _this3.formatOptionLabel(opt, 'value'));
        });
      }
      if (inputValue) {
        return null;
      }
      var singleValue = selectValue[0];
      return /*#__PURE__*/react.createElement(SingleValue, (0,esm_extends/* default */.A)({}, commonProps, {
        data: singleValue,
        isDisabled: isDisabled
      }), this.formatOptionLabel(singleValue, 'value'));
    }
  }, {
    key: "renderClearIndicator",
    value: function renderClearIndicator() {
      var _this$getComponents3 = this.getComponents(),
        ClearIndicator = _this$getComponents3.ClearIndicator;
      var commonProps = this.commonProps;
      var _this$props10 = this.props,
        isDisabled = _this$props10.isDisabled,
        isLoading = _this$props10.isLoading;
      var isFocused = this.state.isFocused;
      if (!this.isClearable() || !ClearIndicator || isDisabled || !this.hasValue() || isLoading) {
        return null;
      }
      var innerProps = {
        onMouseDown: this.onClearIndicatorMouseDown,
        onTouchEnd: this.onClearIndicatorTouchEnd,
        'aria-hidden': 'true'
      };
      return /*#__PURE__*/react.createElement(ClearIndicator, (0,esm_extends/* default */.A)({}, commonProps, {
        innerProps: innerProps,
        isFocused: isFocused
      }));
    }
  }, {
    key: "renderLoadingIndicator",
    value: function renderLoadingIndicator() {
      var _this$getComponents4 = this.getComponents(),
        LoadingIndicator = _this$getComponents4.LoadingIndicator;
      var commonProps = this.commonProps;
      var _this$props11 = this.props,
        isDisabled = _this$props11.isDisabled,
        isLoading = _this$props11.isLoading;
      var isFocused = this.state.isFocused;
      if (!LoadingIndicator || !isLoading) return null;
      var innerProps = {
        'aria-hidden': 'true'
      };
      return /*#__PURE__*/react.createElement(LoadingIndicator, (0,esm_extends/* default */.A)({}, commonProps, {
        innerProps: innerProps,
        isDisabled: isDisabled,
        isFocused: isFocused
      }));
    }
  }, {
    key: "renderIndicatorSeparator",
    value: function renderIndicatorSeparator() {
      var _this$getComponents5 = this.getComponents(),
        DropdownIndicator = _this$getComponents5.DropdownIndicator,
        IndicatorSeparator = _this$getComponents5.IndicatorSeparator;

      // separator doesn't make sense without the dropdown indicator
      if (!DropdownIndicator || !IndicatorSeparator) return null;
      var commonProps = this.commonProps;
      var isDisabled = this.props.isDisabled;
      var isFocused = this.state.isFocused;
      return /*#__PURE__*/react.createElement(IndicatorSeparator, (0,esm_extends/* default */.A)({}, commonProps, {
        isDisabled: isDisabled,
        isFocused: isFocused
      }));
    }
  }, {
    key: "renderDropdownIndicator",
    value: function renderDropdownIndicator() {
      var _this$getComponents6 = this.getComponents(),
        DropdownIndicator = _this$getComponents6.DropdownIndicator;
      if (!DropdownIndicator) return null;
      var commonProps = this.commonProps;
      var isDisabled = this.props.isDisabled;
      var isFocused = this.state.isFocused;
      var innerProps = {
        onMouseDown: this.onDropdownIndicatorMouseDown,
        onTouchEnd: this.onDropdownIndicatorTouchEnd,
        'aria-hidden': 'true'
      };
      return /*#__PURE__*/react.createElement(DropdownIndicator, (0,esm_extends/* default */.A)({}, commonProps, {
        innerProps: innerProps,
        isDisabled: isDisabled,
        isFocused: isFocused
      }));
    }
  }, {
    key: "renderMenu",
    value: function renderMenu() {
      var _this4 = this;
      var _this$getComponents7 = this.getComponents(),
        Group = _this$getComponents7.Group,
        GroupHeading = _this$getComponents7.GroupHeading,
        Menu = _this$getComponents7.Menu,
        MenuList = _this$getComponents7.MenuList,
        MenuPortal = _this$getComponents7.MenuPortal,
        LoadingMessage = _this$getComponents7.LoadingMessage,
        NoOptionsMessage = _this$getComponents7.NoOptionsMessage,
        Option = _this$getComponents7.Option;
      var commonProps = this.commonProps;
      var focusedOption = this.state.focusedOption;
      var _this$props12 = this.props,
        captureMenuScroll = _this$props12.captureMenuScroll,
        inputValue = _this$props12.inputValue,
        isLoading = _this$props12.isLoading,
        loadingMessage = _this$props12.loadingMessage,
        minMenuHeight = _this$props12.minMenuHeight,
        maxMenuHeight = _this$props12.maxMenuHeight,
        menuIsOpen = _this$props12.menuIsOpen,
        menuPlacement = _this$props12.menuPlacement,
        menuPosition = _this$props12.menuPosition,
        menuPortalTarget = _this$props12.menuPortalTarget,
        menuShouldBlockScroll = _this$props12.menuShouldBlockScroll,
        menuShouldScrollIntoView = _this$props12.menuShouldScrollIntoView,
        noOptionsMessage = _this$props12.noOptionsMessage,
        onMenuScrollToTop = _this$props12.onMenuScrollToTop,
        onMenuScrollToBottom = _this$props12.onMenuScrollToBottom;
      if (!menuIsOpen) return null;

      // TODO: Internal Option Type here
      var render = function render(props, id) {
        var type = props.type,
          data = props.data,
          isDisabled = props.isDisabled,
          isSelected = props.isSelected,
          label = props.label,
          value = props.value;
        var isFocused = focusedOption === data;
        var onHover = isDisabled ? undefined : function () {
          return _this4.onOptionHover(data);
        };
        var onSelect = isDisabled ? undefined : function () {
          return _this4.selectOption(data);
        };
        var optionId = "".concat(_this4.getElementId('option'), "-").concat(id);
        var innerProps = {
          id: optionId,
          onClick: onSelect,
          onMouseMove: onHover,
          onMouseOver: onHover,
          tabIndex: -1,
          role: 'option',
          'aria-selected': _this4.isAppleDevice ? undefined : isSelected // is not supported on Apple devices
        };

        return /*#__PURE__*/react.createElement(Option, (0,esm_extends/* default */.A)({}, commonProps, {
          innerProps: innerProps,
          data: data,
          isDisabled: isDisabled,
          isSelected: isSelected,
          key: optionId,
          label: label,
          type: type,
          value: value,
          isFocused: isFocused,
          innerRef: isFocused ? _this4.getFocusedOptionRef : undefined
        }), _this4.formatOptionLabel(props.data, 'menu'));
      };
      var menuUI;
      if (this.hasOptions()) {
        menuUI = this.getCategorizedOptions().map(function (item) {
          if (item.type === 'group') {
            var _data = item.data,
              options = item.options,
              groupIndex = item.index;
            var groupId = "".concat(_this4.getElementId('group'), "-").concat(groupIndex);
            var headingId = "".concat(groupId, "-heading");
            return /*#__PURE__*/react.createElement(Group, (0,esm_extends/* default */.A)({}, commonProps, {
              key: groupId,
              data: _data,
              options: options,
              Heading: GroupHeading,
              headingProps: {
                id: headingId,
                data: item.data
              },
              label: _this4.formatGroupLabel(item.data)
            }), item.options.map(function (option) {
              return render(option, "".concat(groupIndex, "-").concat(option.index));
            }));
          } else if (item.type === 'option') {
            return render(item, "".concat(item.index));
          }
        });
      } else if (isLoading) {
        var message = loadingMessage({
          inputValue: inputValue
        });
        if (message === null) return null;
        menuUI = /*#__PURE__*/react.createElement(LoadingMessage, commonProps, message);
      } else {
        var _message = noOptionsMessage({
          inputValue: inputValue
        });
        if (_message === null) return null;
        menuUI = /*#__PURE__*/react.createElement(NoOptionsMessage, commonProps, _message);
      }
      var menuPlacementProps = {
        minMenuHeight: minMenuHeight,
        maxMenuHeight: maxMenuHeight,
        menuPlacement: menuPlacement,
        menuPosition: menuPosition,
        menuShouldScrollIntoView: menuShouldScrollIntoView
      };
      var menuElement = /*#__PURE__*/react.createElement(index_a301f526_esm.M, (0,esm_extends/* default */.A)({}, commonProps, menuPlacementProps), function (_ref4) {
        var ref = _ref4.ref,
          _ref4$placerProps = _ref4.placerProps,
          placement = _ref4$placerProps.placement,
          maxHeight = _ref4$placerProps.maxHeight;
        return /*#__PURE__*/react.createElement(Menu, (0,esm_extends/* default */.A)({}, commonProps, menuPlacementProps, {
          innerRef: ref,
          innerProps: {
            onMouseDown: _this4.onMenuMouseDown,
            onMouseMove: _this4.onMenuMouseMove
          },
          isLoading: isLoading,
          placement: placement
        }), /*#__PURE__*/react.createElement(ScrollManager, {
          captureEnabled: captureMenuScroll,
          onTopArrive: onMenuScrollToTop,
          onBottomArrive: onMenuScrollToBottom,
          lockEnabled: menuShouldBlockScroll
        }, function (scrollTargetRef) {
          return /*#__PURE__*/react.createElement(MenuList, (0,esm_extends/* default */.A)({}, commonProps, {
            innerRef: function innerRef(instance) {
              _this4.getMenuListRef(instance);
              scrollTargetRef(instance);
            },
            innerProps: {
              role: 'listbox',
              'aria-multiselectable': commonProps.isMulti,
              id: _this4.getElementId('listbox')
            },
            isLoading: isLoading,
            maxHeight: maxHeight,
            focusedOption: focusedOption
          }), menuUI);
        }));
      });

      // positioning behaviour is almost identical for portalled and fixed,
      // so we use the same component. the actual portalling logic is forked
      // within the component based on `menuPosition`
      return menuPortalTarget || menuPosition === 'fixed' ? /*#__PURE__*/react.createElement(MenuPortal, (0,esm_extends/* default */.A)({}, commonProps, {
        appendTo: menuPortalTarget,
        controlElement: this.controlRef,
        menuPlacement: menuPlacement,
        menuPosition: menuPosition
      }), menuElement) : menuElement;
    }
  }, {
    key: "renderFormField",
    value: function renderFormField() {
      var _this5 = this;
      var _this$props13 = this.props,
        delimiter = _this$props13.delimiter,
        isDisabled = _this$props13.isDisabled,
        isMulti = _this$props13.isMulti,
        name = _this$props13.name,
        required = _this$props13.required;
      var selectValue = this.state.selectValue;
      if (required && !this.hasValue() && !isDisabled) {
        return /*#__PURE__*/react.createElement(RequiredInput$1, {
          name: name,
          onFocus: this.onValueInputFocus
        });
      }
      if (!name || isDisabled) return;
      if (isMulti) {
        if (delimiter) {
          var value = selectValue.map(function (opt) {
            return _this5.getOptionValue(opt);
          }).join(delimiter);
          return /*#__PURE__*/react.createElement("input", {
            name: name,
            type: "hidden",
            value: value
          });
        } else {
          var input = selectValue.length > 0 ? selectValue.map(function (opt, i) {
            return /*#__PURE__*/react.createElement("input", {
              key: "i-".concat(i),
              name: name,
              type: "hidden",
              value: _this5.getOptionValue(opt)
            });
          }) : /*#__PURE__*/react.createElement("input", {
            name: name,
            type: "hidden",
            value: ""
          });
          return /*#__PURE__*/react.createElement("div", null, input);
        }
      } else {
        var _value = selectValue[0] ? this.getOptionValue(selectValue[0]) : '';
        return /*#__PURE__*/react.createElement("input", {
          name: name,
          type: "hidden",
          value: _value
        });
      }
    }
  }, {
    key: "renderLiveRegion",
    value: function renderLiveRegion() {
      var commonProps = this.commonProps;
      var _this$state6 = this.state,
        ariaSelection = _this$state6.ariaSelection,
        focusedOption = _this$state6.focusedOption,
        focusedValue = _this$state6.focusedValue,
        isFocused = _this$state6.isFocused,
        selectValue = _this$state6.selectValue;
      var focusableOptions = this.getFocusableOptions();
      return /*#__PURE__*/react.createElement(LiveRegion$1, (0,esm_extends/* default */.A)({}, commonProps, {
        id: this.getElementId('live-region'),
        ariaSelection: ariaSelection,
        focusedOption: focusedOption,
        focusedValue: focusedValue,
        isFocused: isFocused,
        selectValue: selectValue,
        focusableOptions: focusableOptions,
        isAppleDevice: this.isAppleDevice
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$getComponents8 = this.getComponents(),
        Control = _this$getComponents8.Control,
        IndicatorsContainer = _this$getComponents8.IndicatorsContainer,
        SelectContainer = _this$getComponents8.SelectContainer,
        ValueContainer = _this$getComponents8.ValueContainer;
      var _this$props14 = this.props,
        className = _this$props14.className,
        id = _this$props14.id,
        isDisabled = _this$props14.isDisabled,
        menuIsOpen = _this$props14.menuIsOpen;
      var isFocused = this.state.isFocused;
      var commonProps = this.commonProps = this.getCommonProps();
      return /*#__PURE__*/react.createElement(SelectContainer, (0,esm_extends/* default */.A)({}, commonProps, {
        className: className,
        innerProps: {
          id: id,
          onKeyDown: this.onKeyDown
        },
        isDisabled: isDisabled,
        isFocused: isFocused
      }), this.renderLiveRegion(), /*#__PURE__*/react.createElement(Control, (0,esm_extends/* default */.A)({}, commonProps, {
        innerRef: this.getControlRef,
        innerProps: {
          onMouseDown: this.onControlMouseDown,
          onTouchEnd: this.onControlTouchEnd
        },
        isDisabled: isDisabled,
        isFocused: isFocused,
        menuIsOpen: menuIsOpen
      }), /*#__PURE__*/react.createElement(ValueContainer, (0,esm_extends/* default */.A)({}, commonProps, {
        isDisabled: isDisabled
      }), this.renderPlaceholderOrValue(), this.renderInput()), /*#__PURE__*/react.createElement(IndicatorsContainer, (0,esm_extends/* default */.A)({}, commonProps, {
        isDisabled: isDisabled
      }), this.renderClearIndicator(), this.renderLoadingIndicator(), this.renderIndicatorSeparator(), this.renderDropdownIndicator())), this.renderMenu(), this.renderFormField());
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      var prevProps = state.prevProps,
        clearFocusValueOnUpdate = state.clearFocusValueOnUpdate,
        inputIsHiddenAfterUpdate = state.inputIsHiddenAfterUpdate,
        ariaSelection = state.ariaSelection,
        isFocused = state.isFocused,
        prevWasFocused = state.prevWasFocused,
        instancePrefix = state.instancePrefix;
      var options = props.options,
        value = props.value,
        menuIsOpen = props.menuIsOpen,
        inputValue = props.inputValue,
        isMulti = props.isMulti;
      var selectValue = (0,index_a301f526_esm.H)(value);
      var newMenuOptionsState = {};
      if (prevProps && (value !== prevProps.value || options !== prevProps.options || menuIsOpen !== prevProps.menuIsOpen || inputValue !== prevProps.inputValue)) {
        var focusableOptions = menuIsOpen ? buildFocusableOptions(props, selectValue) : [];
        var focusableOptionsWithIds = menuIsOpen ? buildFocusableOptionsWithIds(buildCategorizedOptions(props, selectValue), "".concat(instancePrefix, "-option")) : [];
        var focusedValue = clearFocusValueOnUpdate ? getNextFocusedValue(state, selectValue) : null;
        var focusedOption = getNextFocusedOption(state, focusableOptions);
        var focusedOptionId = getFocusedOptionId(focusableOptionsWithIds, focusedOption);
        newMenuOptionsState = {
          selectValue: selectValue,
          focusedOption: focusedOption,
          focusedOptionId: focusedOptionId,
          focusableOptionsWithIds: focusableOptionsWithIds,
          focusedValue: focusedValue,
          clearFocusValueOnUpdate: false
        };
      }
      // some updates should toggle the state of the input visibility
      var newInputIsHiddenState = inputIsHiddenAfterUpdate != null && props !== prevProps ? {
        inputIsHidden: inputIsHiddenAfterUpdate,
        inputIsHiddenAfterUpdate: undefined
      } : {};
      var newAriaSelection = ariaSelection;
      var hasKeptFocus = isFocused && prevWasFocused;
      if (isFocused && !hasKeptFocus) {
        // If `value` or `defaultValue` props are not empty then announce them
        // when the Select is initially focused
        newAriaSelection = {
          value: (0,index_a301f526_esm.D)(isMulti, selectValue, selectValue[0] || null),
          options: selectValue,
          action: 'initial-input-focus'
        };
        hasKeptFocus = !prevWasFocused;
      }

      // If the 'initial-input-focus' action has been set already
      // then reset the ariaSelection to null
      if ((ariaSelection === null || ariaSelection === void 0 ? void 0 : ariaSelection.action) === 'initial-input-focus') {
        newAriaSelection = null;
      }
      return (0,objectSpread2/* default */.A)((0,objectSpread2/* default */.A)((0,objectSpread2/* default */.A)({}, newMenuOptionsState), newInputIsHiddenState), {}, {
        prevProps: props,
        ariaSelection: newAriaSelection,
        prevWasFocused: hasKeptFocus
      });
    }
  }]);
  return Select;
}(react.Component);
Select.defaultProps = defaultProps;




/***/ }),

/***/ 71332:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ isMobileDevice),
  B: () => (/* binding */ multiValueAsValue),
  C: () => (/* binding */ singleValueAsValue),
  D: () => (/* binding */ valueTernary),
  E: () => (/* binding */ classNames),
  F: () => (/* binding */ defaultComponents),
  G: () => (/* binding */ isDocumentElement),
  H: () => (/* binding */ cleanValue),
  I: () => (/* binding */ scrollIntoView),
  J: () => (/* binding */ noop),
  K: () => (/* binding */ notNullish),
  M: () => (/* binding */ MenuPlacer),
  a: () => (/* binding */ clearIndicatorCSS),
  b: () => (/* binding */ containerCSS),
  c: () => (/* binding */ components),
  d: () => (/* binding */ css$1),
  e: () => (/* binding */ dropdownIndicatorCSS),
  f: () => (/* binding */ groupHeadingCSS),
  g: () => (/* binding */ groupCSS),
  h: () => (/* binding */ indicatorSeparatorCSS),
  i: () => (/* binding */ indicatorsContainerCSS),
  j: () => (/* binding */ inputCSS),
  k: () => (/* binding */ loadingMessageCSS),
  l: () => (/* binding */ loadingIndicatorCSS),
  m: () => (/* binding */ menuCSS),
  n: () => (/* binding */ menuListCSS),
  o: () => (/* binding */ menuPortalCSS),
  p: () => (/* binding */ multiValueCSS),
  q: () => (/* binding */ multiValueLabelCSS),
  r: () => (/* binding */ removeProps),
  s: () => (/* binding */ supportsPassiveEvents),
  t: () => (/* binding */ multiValueRemoveCSS),
  u: () => (/* binding */ noOptionsMessageCSS),
  v: () => (/* binding */ optionCSS),
  w: () => (/* binding */ placeholderCSS),
  x: () => (/* binding */ css),
  y: () => (/* binding */ valueContainerCSS),
  z: () => (/* binding */ isTouchCapable)
});

// UNUSED EXPORTS: L

// EXTERNAL MODULE: ./node_modules/react-select/node_modules/@babel/runtime/helpers/esm/objectSpread2.js
var objectSpread2 = __webpack_require__(47029);
// EXTERNAL MODULE: ./node_modules/react-select/node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__(65166);
// EXTERNAL MODULE: ./node_modules/@emotion/react/dist/emotion-react.browser.esm.js
var emotion_react_browser_esm = __webpack_require__(17437);
// EXTERNAL MODULE: ./node_modules/react-select/node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 3 modules
var slicedToArray = __webpack_require__(2482);
// EXTERNAL MODULE: ./node_modules/react-select/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js + 1 modules
var objectWithoutProperties = __webpack_require__(35412);
// EXTERNAL MODULE: ./node_modules/react-select/node_modules/@babel/runtime/helpers/esm/typeof.js
var esm_typeof = __webpack_require__(65710);
;// CONCATENATED MODULE: ./node_modules/react-select/node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js
function _taggedTemplateLiteral(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, {
    raw: {
      value: Object.freeze(t)
    }
  }));
}

// EXTERNAL MODULE: ./node_modules/react-select/node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__(88097);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(96540);
// EXTERNAL MODULE: ./node_modules/react-dom/index.js
var react_dom = __webpack_require__(40961);
// EXTERNAL MODULE: ./node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs + 2 modules
var floating_ui_dom = __webpack_require__(6492);
// EXTERNAL MODULE: ./node_modules/use-isomorphic-layout-effect/dist/use-isomorphic-layout-effect.browser.esm.js
var use_isomorphic_layout_effect_browser_esm = __webpack_require__(27003);
;// CONCATENATED MODULE: ./node_modules/react-select/dist/index-a301f526.esm.js













var _excluded$4 = ["className", "clearValue", "cx", "getStyles", "getClassNames", "getValue", "hasValue", "isMulti", "isRtl", "options", "selectOption", "selectProps", "setValue", "theme"];
// ==============================
// NO OP
// ==============================

var noop = function noop() {};

// ==============================
// Class Name Prefixer
// ==============================

/**
 String representation of component state for styling with class names.

 Expects an array of strings OR a string/object pair:
 - className(['comp', 'comp-arg', 'comp-arg-2'])
   @returns 'react-select__comp react-select__comp-arg react-select__comp-arg-2'
 - className('comp', { some: true, state: false })
   @returns 'react-select__comp react-select__comp--some'
*/
function applyPrefixToName(prefix, name) {
  if (!name) {
    return prefix;
  } else if (name[0] === '-') {
    return prefix + name;
  } else {
    return prefix + '__' + name;
  }
}
function classNames(prefix, state) {
  for (var _len = arguments.length, classNameList = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    classNameList[_key - 2] = arguments[_key];
  }
  var arr = [].concat(classNameList);
  if (state && prefix) {
    for (var key in state) {
      if (state.hasOwnProperty(key) && state[key]) {
        arr.push("".concat(applyPrefixToName(prefix, key)));
      }
    }
  }
  return arr.filter(function (i) {
    return i;
  }).map(function (i) {
    return String(i).trim();
  }).join(' ');
}
// ==============================
// Clean Value
// ==============================

var cleanValue = function cleanValue(value) {
  if (isArray(value)) return value.filter(Boolean);
  if ((0,esm_typeof/* default */.A)(value) === 'object' && value !== null) return [value];
  return [];
};

// ==============================
// Clean Common Props
// ==============================

var cleanCommonProps = function cleanCommonProps(props) {
  //className
  props.className;
    props.clearValue;
    props.cx;
    props.getStyles;
    props.getClassNames;
    props.getValue;
    props.hasValue;
    props.isMulti;
    props.isRtl;
    props.options;
    props.selectOption;
    props.selectProps;
    props.setValue;
    props.theme;
    var innerProps = (0,objectWithoutProperties/* default */.A)(props, _excluded$4);
  return (0,objectSpread2/* default */.A)({}, innerProps);
};

// ==============================
// Get Style Props
// ==============================

var getStyleProps = function getStyleProps(props, name, classNamesState) {
  var cx = props.cx,
    getStyles = props.getStyles,
    getClassNames = props.getClassNames,
    className = props.className;
  return {
    css: getStyles(name, props),
    className: cx(classNamesState !== null && classNamesState !== void 0 ? classNamesState : {}, getClassNames(name, props), className)
  };
};

// ==============================
// Handle Input Change
// ==============================

function handleInputChange(inputValue, actionMeta, onInputChange) {
  if (onInputChange) {
    var _newValue = onInputChange(inputValue, actionMeta);
    if (typeof _newValue === 'string') return _newValue;
  }
  return inputValue;
}

// ==============================
// Scroll Helpers
// ==============================

function isDocumentElement(el) {
  return [document.documentElement, document.body, window].indexOf(el) > -1;
}

// Normalized Scroll Top
// ------------------------------

function normalizedHeight(el) {
  if (isDocumentElement(el)) {
    return window.innerHeight;
  }
  return el.clientHeight;
}

// Normalized scrollTo & scrollTop
// ------------------------------

function getScrollTop(el) {
  if (isDocumentElement(el)) {
    return window.pageYOffset;
  }
  return el.scrollTop;
}
function scrollTo(el, top) {
  // with a scroll distance, we perform scroll on the element
  if (isDocumentElement(el)) {
    window.scrollTo(0, top);
    return;
  }
  el.scrollTop = top;
}

// Get Scroll Parent
// ------------------------------

function getScrollParent(element) {
  var style = getComputedStyle(element);
  var excludeStaticParent = style.position === 'absolute';
  var overflowRx = /(auto|scroll)/;
  if (style.position === 'fixed') return document.documentElement;
  for (var parent = element; parent = parent.parentElement;) {
    style = getComputedStyle(parent);
    if (excludeStaticParent && style.position === 'static') {
      continue;
    }
    if (overflowRx.test(style.overflow + style.overflowY + style.overflowX)) {
      return parent;
    }
  }
  return document.documentElement;
}

// Animated Scroll To
// ------------------------------

/**
  @param t: time (elapsed)
  @param b: initial value
  @param c: amount of change
  @param d: duration
*/
function easeOutCubic(t, b, c, d) {
  return c * ((t = t / d - 1) * t * t + 1) + b;
}
function animatedScrollTo(element, to) {
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 200;
  var callback = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : noop;
  var start = getScrollTop(element);
  var change = to - start;
  var increment = 10;
  var currentTime = 0;
  function animateScroll() {
    currentTime += increment;
    var val = easeOutCubic(currentTime, start, change, duration);
    scrollTo(element, val);
    if (currentTime < duration) {
      window.requestAnimationFrame(animateScroll);
    } else {
      callback(element);
    }
  }
  animateScroll();
}

// Scroll Into View
// ------------------------------

function scrollIntoView(menuEl, focusedEl) {
  var menuRect = menuEl.getBoundingClientRect();
  var focusedRect = focusedEl.getBoundingClientRect();
  var overScroll = focusedEl.offsetHeight / 3;
  if (focusedRect.bottom + overScroll > menuRect.bottom) {
    scrollTo(menuEl, Math.min(focusedEl.offsetTop + focusedEl.clientHeight - menuEl.offsetHeight + overScroll, menuEl.scrollHeight));
  } else if (focusedRect.top - overScroll < menuRect.top) {
    scrollTo(menuEl, Math.max(focusedEl.offsetTop - overScroll, 0));
  }
}

// ==============================
// Get bounding client object
// ==============================

// cannot get keys using array notation with DOMRect
function getBoundingClientObj(element) {
  var rect = element.getBoundingClientRect();
  return {
    bottom: rect.bottom,
    height: rect.height,
    left: rect.left,
    right: rect.right,
    top: rect.top,
    width: rect.width
  };
}

// ==============================
// Touch Capability Detector
// ==============================

function isTouchCapable() {
  try {
    document.createEvent('TouchEvent');
    return true;
  } catch (e) {
    return false;
  }
}

// ==============================
// Mobile Device Detector
// ==============================

function isMobileDevice() {
  try {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  } catch (e) {
    return false;
  }
}

// ==============================
// Passive Event Detector
// ==============================

// https://github.com/rafgraph/detect-it/blob/main/src/index.ts#L19-L36
var passiveOptionAccessed = false;
var options = {
  get passive() {
    return passiveOptionAccessed = true;
  }
};
// check for SSR
var w = typeof window !== 'undefined' ? window : {};
if (w.addEventListener && w.removeEventListener) {
  w.addEventListener('p', noop, options);
  w.removeEventListener('p', noop, false);
}
var supportsPassiveEvents = passiveOptionAccessed;
function notNullish(item) {
  return item != null;
}
function isArray(arg) {
  return Array.isArray(arg);
}
function valueTernary(isMulti, multiValue, singleValue) {
  return isMulti ? multiValue : singleValue;
}
function singleValueAsValue(singleValue) {
  return singleValue;
}
function multiValueAsValue(multiValue) {
  return multiValue;
}
var removeProps = function removeProps(propsObj) {
  for (var _len2 = arguments.length, properties = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    properties[_key2 - 1] = arguments[_key2];
  }
  var propsMap = Object.entries(propsObj).filter(function (_ref) {
    var _ref2 = (0,slicedToArray/* default */.A)(_ref, 1),
      key = _ref2[0];
    return !properties.includes(key);
  });
  return propsMap.reduce(function (newProps, _ref3) {
    var _ref4 = (0,slicedToArray/* default */.A)(_ref3, 2),
      key = _ref4[0],
      val = _ref4[1];
    newProps[key] = val;
    return newProps;
  }, {});
};

var _excluded$3 = ["children", "innerProps"],
  _excluded2$1 = ["children", "innerProps"];
function getMenuPlacement(_ref) {
  var preferredMaxHeight = _ref.maxHeight,
    menuEl = _ref.menuEl,
    minHeight = _ref.minHeight,
    preferredPlacement = _ref.placement,
    shouldScroll = _ref.shouldScroll,
    isFixedPosition = _ref.isFixedPosition,
    controlHeight = _ref.controlHeight;
  var scrollParent = getScrollParent(menuEl);
  var defaultState = {
    placement: 'bottom',
    maxHeight: preferredMaxHeight
  };

  // something went wrong, return default state
  if (!menuEl || !menuEl.offsetParent) return defaultState;

  // we can't trust `scrollParent.scrollHeight` --> it may increase when
  // the menu is rendered
  var _scrollParent$getBoun = scrollParent.getBoundingClientRect(),
    scrollHeight = _scrollParent$getBoun.height;
  var _menuEl$getBoundingCl = menuEl.getBoundingClientRect(),
    menuBottom = _menuEl$getBoundingCl.bottom,
    menuHeight = _menuEl$getBoundingCl.height,
    menuTop = _menuEl$getBoundingCl.top;
  var _menuEl$offsetParent$ = menuEl.offsetParent.getBoundingClientRect(),
    containerTop = _menuEl$offsetParent$.top;
  var viewHeight = isFixedPosition ? window.innerHeight : normalizedHeight(scrollParent);
  var scrollTop = getScrollTop(scrollParent);
  var marginBottom = parseInt(getComputedStyle(menuEl).marginBottom, 10);
  var marginTop = parseInt(getComputedStyle(menuEl).marginTop, 10);
  var viewSpaceAbove = containerTop - marginTop;
  var viewSpaceBelow = viewHeight - menuTop;
  var scrollSpaceAbove = viewSpaceAbove + scrollTop;
  var scrollSpaceBelow = scrollHeight - scrollTop - menuTop;
  var scrollDown = menuBottom - viewHeight + scrollTop + marginBottom;
  var scrollUp = scrollTop + menuTop - marginTop;
  var scrollDuration = 160;
  switch (preferredPlacement) {
    case 'auto':
    case 'bottom':
      // 1: the menu will fit, do nothing
      if (viewSpaceBelow >= menuHeight) {
        return {
          placement: 'bottom',
          maxHeight: preferredMaxHeight
        };
      }

      // 2: the menu will fit, if scrolled
      if (scrollSpaceBelow >= menuHeight && !isFixedPosition) {
        if (shouldScroll) {
          animatedScrollTo(scrollParent, scrollDown, scrollDuration);
        }
        return {
          placement: 'bottom',
          maxHeight: preferredMaxHeight
        };
      }

      // 3: the menu will fit, if constrained
      if (!isFixedPosition && scrollSpaceBelow >= minHeight || isFixedPosition && viewSpaceBelow >= minHeight) {
        if (shouldScroll) {
          animatedScrollTo(scrollParent, scrollDown, scrollDuration);
        }

        // we want to provide as much of the menu as possible to the user,
        // so give them whatever is available below rather than the minHeight.
        var constrainedHeight = isFixedPosition ? viewSpaceBelow - marginBottom : scrollSpaceBelow - marginBottom;
        return {
          placement: 'bottom',
          maxHeight: constrainedHeight
        };
      }

      // 4. Forked beviour when there isn't enough space below

      // AUTO: flip the menu, render above
      if (preferredPlacement === 'auto' || isFixedPosition) {
        // may need to be constrained after flipping
        var _constrainedHeight = preferredMaxHeight;
        var spaceAbove = isFixedPosition ? viewSpaceAbove : scrollSpaceAbove;
        if (spaceAbove >= minHeight) {
          _constrainedHeight = Math.min(spaceAbove - marginBottom - controlHeight, preferredMaxHeight);
        }
        return {
          placement: 'top',
          maxHeight: _constrainedHeight
        };
      }

      // BOTTOM: allow browser to increase scrollable area and immediately set scroll
      if (preferredPlacement === 'bottom') {
        if (shouldScroll) {
          scrollTo(scrollParent, scrollDown);
        }
        return {
          placement: 'bottom',
          maxHeight: preferredMaxHeight
        };
      }
      break;
    case 'top':
      // 1: the menu will fit, do nothing
      if (viewSpaceAbove >= menuHeight) {
        return {
          placement: 'top',
          maxHeight: preferredMaxHeight
        };
      }

      // 2: the menu will fit, if scrolled
      if (scrollSpaceAbove >= menuHeight && !isFixedPosition) {
        if (shouldScroll) {
          animatedScrollTo(scrollParent, scrollUp, scrollDuration);
        }
        return {
          placement: 'top',
          maxHeight: preferredMaxHeight
        };
      }

      // 3: the menu will fit, if constrained
      if (!isFixedPosition && scrollSpaceAbove >= minHeight || isFixedPosition && viewSpaceAbove >= minHeight) {
        var _constrainedHeight2 = preferredMaxHeight;

        // we want to provide as much of the menu as possible to the user,
        // so give them whatever is available below rather than the minHeight.
        if (!isFixedPosition && scrollSpaceAbove >= minHeight || isFixedPosition && viewSpaceAbove >= minHeight) {
          _constrainedHeight2 = isFixedPosition ? viewSpaceAbove - marginTop : scrollSpaceAbove - marginTop;
        }
        if (shouldScroll) {
          animatedScrollTo(scrollParent, scrollUp, scrollDuration);
        }
        return {
          placement: 'top',
          maxHeight: _constrainedHeight2
        };
      }

      // 4. not enough space, the browser WILL NOT increase scrollable area when
      // absolutely positioned element rendered above the viewport (only below).
      // Flip the menu, render below
      return {
        placement: 'bottom',
        maxHeight: preferredMaxHeight
      };
    default:
      throw new Error("Invalid placement provided \"".concat(preferredPlacement, "\"."));
  }
  return defaultState;
}

// Menu Component
// ------------------------------

function alignToControl(placement) {
  var placementToCSSProp = {
    bottom: 'top',
    top: 'bottom'
  };
  return placement ? placementToCSSProp[placement] : 'bottom';
}
var coercePlacement = function coercePlacement(p) {
  return p === 'auto' ? 'bottom' : p;
};
var menuCSS = function menuCSS(_ref2, unstyled) {
  var _objectSpread2;
  var placement = _ref2.placement,
    _ref2$theme = _ref2.theme,
    borderRadius = _ref2$theme.borderRadius,
    spacing = _ref2$theme.spacing,
    colors = _ref2$theme.colors;
  return (0,objectSpread2/* default */.A)((_objectSpread2 = {
    label: 'menu'
  }, (0,defineProperty/* default */.A)(_objectSpread2, alignToControl(placement), '100%'), (0,defineProperty/* default */.A)(_objectSpread2, "position", 'absolute'), (0,defineProperty/* default */.A)(_objectSpread2, "width", '100%'), (0,defineProperty/* default */.A)(_objectSpread2, "zIndex", 1), _objectSpread2), unstyled ? {} : {
    backgroundColor: colors.neutral0,
    borderRadius: borderRadius,
    boxShadow: '0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1)',
    marginBottom: spacing.menuGutter,
    marginTop: spacing.menuGutter
  });
};
var PortalPlacementContext = /*#__PURE__*/(0,react.createContext)(null);

// NOTE: internal only
var MenuPlacer = function MenuPlacer(props) {
  var children = props.children,
    minMenuHeight = props.minMenuHeight,
    maxMenuHeight = props.maxMenuHeight,
    menuPlacement = props.menuPlacement,
    menuPosition = props.menuPosition,
    menuShouldScrollIntoView = props.menuShouldScrollIntoView,
    theme = props.theme;
  var _ref3 = (0,react.useContext)(PortalPlacementContext) || {},
    setPortalPlacement = _ref3.setPortalPlacement;
  var ref = (0,react.useRef)(null);
  var _useState = (0,react.useState)(maxMenuHeight),
    _useState2 = (0,slicedToArray/* default */.A)(_useState, 2),
    maxHeight = _useState2[0],
    setMaxHeight = _useState2[1];
  var _useState3 = (0,react.useState)(null),
    _useState4 = (0,slicedToArray/* default */.A)(_useState3, 2),
    placement = _useState4[0],
    setPlacement = _useState4[1];
  var controlHeight = theme.spacing.controlHeight;
  (0,use_isomorphic_layout_effect_browser_esm/* default */.A)(function () {
    var menuEl = ref.current;
    if (!menuEl) return;

    // DO NOT scroll if position is fixed
    var isFixedPosition = menuPosition === 'fixed';
    var shouldScroll = menuShouldScrollIntoView && !isFixedPosition;
    var state = getMenuPlacement({
      maxHeight: maxMenuHeight,
      menuEl: menuEl,
      minHeight: minMenuHeight,
      placement: menuPlacement,
      shouldScroll: shouldScroll,
      isFixedPosition: isFixedPosition,
      controlHeight: controlHeight
    });
    setMaxHeight(state.maxHeight);
    setPlacement(state.placement);
    setPortalPlacement === null || setPortalPlacement === void 0 ? void 0 : setPortalPlacement(state.placement);
  }, [maxMenuHeight, menuPlacement, menuPosition, menuShouldScrollIntoView, minMenuHeight, setPortalPlacement, controlHeight]);
  return children({
    ref: ref,
    placerProps: (0,objectSpread2/* default */.A)((0,objectSpread2/* default */.A)({}, props), {}, {
      placement: placement || coercePlacement(menuPlacement),
      maxHeight: maxHeight
    })
  });
};
var Menu = function Menu(props) {
  var children = props.children,
    innerRef = props.innerRef,
    innerProps = props.innerProps;
  return (0,emotion_react_browser_esm/* jsx */.Y)("div", (0,esm_extends/* default */.A)({}, getStyleProps(props, 'menu', {
    menu: true
  }), {
    ref: innerRef
  }, innerProps), children);
};
var Menu$1 = Menu;

// ==============================
// Menu List
// ==============================

var menuListCSS = function menuListCSS(_ref4, unstyled) {
  var maxHeight = _ref4.maxHeight,
    baseUnit = _ref4.theme.spacing.baseUnit;
  return (0,objectSpread2/* default */.A)({
    maxHeight: maxHeight,
    overflowY: 'auto',
    position: 'relative',
    // required for offset[Height, Top] > keyboard scroll
    WebkitOverflowScrolling: 'touch'
  }, unstyled ? {} : {
    paddingBottom: baseUnit,
    paddingTop: baseUnit
  });
};
var MenuList = function MenuList(props) {
  var children = props.children,
    innerProps = props.innerProps,
    innerRef = props.innerRef,
    isMulti = props.isMulti;
  return (0,emotion_react_browser_esm/* jsx */.Y)("div", (0,esm_extends/* default */.A)({}, getStyleProps(props, 'menuList', {
    'menu-list': true,
    'menu-list--is-multi': isMulti
  }), {
    ref: innerRef
  }, innerProps), children);
};

// ==============================
// Menu Notices
// ==============================

var noticeCSS = function noticeCSS(_ref5, unstyled) {
  var _ref5$theme = _ref5.theme,
    baseUnit = _ref5$theme.spacing.baseUnit,
    colors = _ref5$theme.colors;
  return (0,objectSpread2/* default */.A)({
    textAlign: 'center'
  }, unstyled ? {} : {
    color: colors.neutral40,
    padding: "".concat(baseUnit * 2, "px ").concat(baseUnit * 3, "px")
  });
};
var noOptionsMessageCSS = noticeCSS;
var loadingMessageCSS = noticeCSS;
var NoOptionsMessage = function NoOptionsMessage(_ref6) {
  var _ref6$children = _ref6.children,
    children = _ref6$children === void 0 ? 'No options' : _ref6$children,
    innerProps = _ref6.innerProps,
    restProps = (0,objectWithoutProperties/* default */.A)(_ref6, _excluded$3);
  return (0,emotion_react_browser_esm/* jsx */.Y)("div", (0,esm_extends/* default */.A)({}, getStyleProps((0,objectSpread2/* default */.A)((0,objectSpread2/* default */.A)({}, restProps), {}, {
    children: children,
    innerProps: innerProps
  }), 'noOptionsMessage', {
    'menu-notice': true,
    'menu-notice--no-options': true
  }), innerProps), children);
};
var LoadingMessage = function LoadingMessage(_ref7) {
  var _ref7$children = _ref7.children,
    children = _ref7$children === void 0 ? 'Loading...' : _ref7$children,
    innerProps = _ref7.innerProps,
    restProps = (0,objectWithoutProperties/* default */.A)(_ref7, _excluded2$1);
  return (0,emotion_react_browser_esm/* jsx */.Y)("div", (0,esm_extends/* default */.A)({}, getStyleProps((0,objectSpread2/* default */.A)((0,objectSpread2/* default */.A)({}, restProps), {}, {
    children: children,
    innerProps: innerProps
  }), 'loadingMessage', {
    'menu-notice': true,
    'menu-notice--loading': true
  }), innerProps), children);
};

// ==============================
// Menu Portal
// ==============================

var menuPortalCSS = function menuPortalCSS(_ref8) {
  var rect = _ref8.rect,
    offset = _ref8.offset,
    position = _ref8.position;
  return {
    left: rect.left,
    position: position,
    top: offset,
    width: rect.width,
    zIndex: 1
  };
};
var MenuPortal = function MenuPortal(props) {
  var appendTo = props.appendTo,
    children = props.children,
    controlElement = props.controlElement,
    innerProps = props.innerProps,
    menuPlacement = props.menuPlacement,
    menuPosition = props.menuPosition;
  var menuPortalRef = (0,react.useRef)(null);
  var cleanupRef = (0,react.useRef)(null);
  var _useState5 = (0,react.useState)(coercePlacement(menuPlacement)),
    _useState6 = (0,slicedToArray/* default */.A)(_useState5, 2),
    placement = _useState6[0],
    setPortalPlacement = _useState6[1];
  var portalPlacementContext = (0,react.useMemo)(function () {
    return {
      setPortalPlacement: setPortalPlacement
    };
  }, []);
  var _useState7 = (0,react.useState)(null),
    _useState8 = (0,slicedToArray/* default */.A)(_useState7, 2),
    computedPosition = _useState8[0],
    setComputedPosition = _useState8[1];
  var updateComputedPosition = (0,react.useCallback)(function () {
    if (!controlElement) return;
    var rect = getBoundingClientObj(controlElement);
    var scrollDistance = menuPosition === 'fixed' ? 0 : window.pageYOffset;
    var offset = rect[placement] + scrollDistance;
    if (offset !== (computedPosition === null || computedPosition === void 0 ? void 0 : computedPosition.offset) || rect.left !== (computedPosition === null || computedPosition === void 0 ? void 0 : computedPosition.rect.left) || rect.width !== (computedPosition === null || computedPosition === void 0 ? void 0 : computedPosition.rect.width)) {
      setComputedPosition({
        offset: offset,
        rect: rect
      });
    }
  }, [controlElement, menuPosition, placement, computedPosition === null || computedPosition === void 0 ? void 0 : computedPosition.offset, computedPosition === null || computedPosition === void 0 ? void 0 : computedPosition.rect.left, computedPosition === null || computedPosition === void 0 ? void 0 : computedPosition.rect.width]);
  (0,use_isomorphic_layout_effect_browser_esm/* default */.A)(function () {
    updateComputedPosition();
  }, [updateComputedPosition]);
  var runAutoUpdate = (0,react.useCallback)(function () {
    if (typeof cleanupRef.current === 'function') {
      cleanupRef.current();
      cleanupRef.current = null;
    }
    if (controlElement && menuPortalRef.current) {
      cleanupRef.current = (0,floating_ui_dom/* autoUpdate */.ll)(controlElement, menuPortalRef.current, updateComputedPosition, {
        elementResize: 'ResizeObserver' in window
      });
    }
  }, [controlElement, updateComputedPosition]);
  (0,use_isomorphic_layout_effect_browser_esm/* default */.A)(function () {
    runAutoUpdate();
  }, [runAutoUpdate]);
  var setMenuPortalElement = (0,react.useCallback)(function (menuPortalElement) {
    menuPortalRef.current = menuPortalElement;
    runAutoUpdate();
  }, [runAutoUpdate]);

  // bail early if required elements aren't present
  if (!appendTo && menuPosition !== 'fixed' || !computedPosition) return null;

  // same wrapper element whether fixed or portalled
  var menuWrapper = (0,emotion_react_browser_esm/* jsx */.Y)("div", (0,esm_extends/* default */.A)({
    ref: setMenuPortalElement
  }, getStyleProps((0,objectSpread2/* default */.A)((0,objectSpread2/* default */.A)({}, props), {}, {
    offset: computedPosition.offset,
    position: menuPosition,
    rect: computedPosition.rect
  }), 'menuPortal', {
    'menu-portal': true
  }), innerProps), children);
  return (0,emotion_react_browser_esm/* jsx */.Y)(PortalPlacementContext.Provider, {
    value: portalPlacementContext
  }, appendTo ? /*#__PURE__*/(0,react_dom.createPortal)(menuWrapper, appendTo) : menuWrapper);
};

// ==============================
// Root Container
// ==============================

var containerCSS = function containerCSS(_ref) {
  var isDisabled = _ref.isDisabled,
    isRtl = _ref.isRtl;
  return {
    label: 'container',
    direction: isRtl ? 'rtl' : undefined,
    pointerEvents: isDisabled ? 'none' : undefined,
    // cancel mouse events when disabled
    position: 'relative'
  };
};
var SelectContainer = function SelectContainer(props) {
  var children = props.children,
    innerProps = props.innerProps,
    isDisabled = props.isDisabled,
    isRtl = props.isRtl;
  return (0,emotion_react_browser_esm/* jsx */.Y)("div", (0,esm_extends/* default */.A)({}, getStyleProps(props, 'container', {
    '--is-disabled': isDisabled,
    '--is-rtl': isRtl
  }), innerProps), children);
};

// ==============================
// Value Container
// ==============================

var valueContainerCSS = function valueContainerCSS(_ref2, unstyled) {
  var spacing = _ref2.theme.spacing,
    isMulti = _ref2.isMulti,
    hasValue = _ref2.hasValue,
    controlShouldRenderValue = _ref2.selectProps.controlShouldRenderValue;
  return (0,objectSpread2/* default */.A)({
    alignItems: 'center',
    display: isMulti && hasValue && controlShouldRenderValue ? 'flex' : 'grid',
    flex: 1,
    flexWrap: 'wrap',
    WebkitOverflowScrolling: 'touch',
    position: 'relative',
    overflow: 'hidden'
  }, unstyled ? {} : {
    padding: "".concat(spacing.baseUnit / 2, "px ").concat(spacing.baseUnit * 2, "px")
  });
};
var ValueContainer = function ValueContainer(props) {
  var children = props.children,
    innerProps = props.innerProps,
    isMulti = props.isMulti,
    hasValue = props.hasValue;
  return (0,emotion_react_browser_esm/* jsx */.Y)("div", (0,esm_extends/* default */.A)({}, getStyleProps(props, 'valueContainer', {
    'value-container': true,
    'value-container--is-multi': isMulti,
    'value-container--has-value': hasValue
  }), innerProps), children);
};

// ==============================
// Indicator Container
// ==============================

var indicatorsContainerCSS = function indicatorsContainerCSS() {
  return {
    alignItems: 'center',
    alignSelf: 'stretch',
    display: 'flex',
    flexShrink: 0
  };
};
var IndicatorsContainer = function IndicatorsContainer(props) {
  var children = props.children,
    innerProps = props.innerProps;
  return (0,emotion_react_browser_esm/* jsx */.Y)("div", (0,esm_extends/* default */.A)({}, getStyleProps(props, 'indicatorsContainer', {
    indicators: true
  }), innerProps), children);
};

var _templateObject;
var _excluded$2 = ["size"],
  _excluded2 = ["innerProps", "isRtl", "size"];
function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

// ==============================
// Dropdown & Clear Icons
// ==============================
var _ref2 =  true ? {
  name: "8mmkcg",
  styles: "display:inline-block;fill:currentColor;line-height:1;stroke:currentColor;stroke-width:0"
} : 0;
var Svg = function Svg(_ref) {
  var size = _ref.size,
    props = (0,objectWithoutProperties/* default */.A)(_ref, _excluded$2);
  return (0,emotion_react_browser_esm/* jsx */.Y)("svg", (0,esm_extends/* default */.A)({
    height: size,
    width: size,
    viewBox: "0 0 20 20",
    "aria-hidden": "true",
    focusable: "false",
    css: _ref2
  }, props));
};
var CrossIcon = function CrossIcon(props) {
  return (0,emotion_react_browser_esm/* jsx */.Y)(Svg, (0,esm_extends/* default */.A)({
    size: 20
  }, props), (0,emotion_react_browser_esm/* jsx */.Y)("path", {
    d: "M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"
  }));
};
var DownChevron = function DownChevron(props) {
  return (0,emotion_react_browser_esm/* jsx */.Y)(Svg, (0,esm_extends/* default */.A)({
    size: 20
  }, props), (0,emotion_react_browser_esm/* jsx */.Y)("path", {
    d: "M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"
  }));
};

// ==============================
// Dropdown & Clear Buttons
// ==============================

var baseCSS = function baseCSS(_ref3, unstyled) {
  var isFocused = _ref3.isFocused,
    _ref3$theme = _ref3.theme,
    baseUnit = _ref3$theme.spacing.baseUnit,
    colors = _ref3$theme.colors;
  return (0,objectSpread2/* default */.A)({
    label: 'indicatorContainer',
    display: 'flex',
    transition: 'color 150ms'
  }, unstyled ? {} : {
    color: isFocused ? colors.neutral60 : colors.neutral20,
    padding: baseUnit * 2,
    ':hover': {
      color: isFocused ? colors.neutral80 : colors.neutral40
    }
  });
};
var dropdownIndicatorCSS = baseCSS;
var DropdownIndicator = function DropdownIndicator(props) {
  var children = props.children,
    innerProps = props.innerProps;
  return (0,emotion_react_browser_esm/* jsx */.Y)("div", (0,esm_extends/* default */.A)({}, getStyleProps(props, 'dropdownIndicator', {
    indicator: true,
    'dropdown-indicator': true
  }), innerProps), children || (0,emotion_react_browser_esm/* jsx */.Y)(DownChevron, null));
};
var clearIndicatorCSS = baseCSS;
var ClearIndicator = function ClearIndicator(props) {
  var children = props.children,
    innerProps = props.innerProps;
  return (0,emotion_react_browser_esm/* jsx */.Y)("div", (0,esm_extends/* default */.A)({}, getStyleProps(props, 'clearIndicator', {
    indicator: true,
    'clear-indicator': true
  }), innerProps), children || (0,emotion_react_browser_esm/* jsx */.Y)(CrossIcon, null));
};

// ==============================
// Separator
// ==============================

var indicatorSeparatorCSS = function indicatorSeparatorCSS(_ref4, unstyled) {
  var isDisabled = _ref4.isDisabled,
    _ref4$theme = _ref4.theme,
    baseUnit = _ref4$theme.spacing.baseUnit,
    colors = _ref4$theme.colors;
  return (0,objectSpread2/* default */.A)({
    label: 'indicatorSeparator',
    alignSelf: 'stretch',
    width: 1
  }, unstyled ? {} : {
    backgroundColor: isDisabled ? colors.neutral10 : colors.neutral20,
    marginBottom: baseUnit * 2,
    marginTop: baseUnit * 2
  });
};
var IndicatorSeparator = function IndicatorSeparator(props) {
  var innerProps = props.innerProps;
  return (0,emotion_react_browser_esm/* jsx */.Y)("span", (0,esm_extends/* default */.A)({}, innerProps, getStyleProps(props, 'indicatorSeparator', {
    'indicator-separator': true
  })));
};

// ==============================
// Loading
// ==============================

var loadingDotAnimations = (0,emotion_react_browser_esm/* keyframes */.i7)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  0%, 80%, 100% { opacity: 0; }\n  40% { opacity: 1; }\n"])));
var loadingIndicatorCSS = function loadingIndicatorCSS(_ref5, unstyled) {
  var isFocused = _ref5.isFocused,
    size = _ref5.size,
    _ref5$theme = _ref5.theme,
    colors = _ref5$theme.colors,
    baseUnit = _ref5$theme.spacing.baseUnit;
  return (0,objectSpread2/* default */.A)({
    label: 'loadingIndicator',
    display: 'flex',
    transition: 'color 150ms',
    alignSelf: 'center',
    fontSize: size,
    lineHeight: 1,
    marginRight: size,
    textAlign: 'center',
    verticalAlign: 'middle'
  }, unstyled ? {} : {
    color: isFocused ? colors.neutral60 : colors.neutral20,
    padding: baseUnit * 2
  });
};
var LoadingDot = function LoadingDot(_ref6) {
  var delay = _ref6.delay,
    offset = _ref6.offset;
  return (0,emotion_react_browser_esm/* jsx */.Y)("span", {
    css: /*#__PURE__*/(0,emotion_react_browser_esm/* css */.AH)({
      animation: "".concat(loadingDotAnimations, " 1s ease-in-out ").concat(delay, "ms infinite;"),
      backgroundColor: 'currentColor',
      borderRadius: '1em',
      display: 'inline-block',
      marginLeft: offset ? '1em' : undefined,
      height: '1em',
      verticalAlign: 'top',
      width: '1em'
    },  true ? "" : 0,  true ? "" : 0)
  });
};
var LoadingIndicator = function LoadingIndicator(_ref7) {
  var innerProps = _ref7.innerProps,
    isRtl = _ref7.isRtl,
    _ref7$size = _ref7.size,
    size = _ref7$size === void 0 ? 4 : _ref7$size,
    restProps = (0,objectWithoutProperties/* default */.A)(_ref7, _excluded2);
  return (0,emotion_react_browser_esm/* jsx */.Y)("div", (0,esm_extends/* default */.A)({}, getStyleProps((0,objectSpread2/* default */.A)((0,objectSpread2/* default */.A)({}, restProps), {}, {
    innerProps: innerProps,
    isRtl: isRtl,
    size: size
  }), 'loadingIndicator', {
    indicator: true,
    'loading-indicator': true
  }), innerProps), (0,emotion_react_browser_esm/* jsx */.Y)(LoadingDot, {
    delay: 0,
    offset: isRtl
  }), (0,emotion_react_browser_esm/* jsx */.Y)(LoadingDot, {
    delay: 160,
    offset: true
  }), (0,emotion_react_browser_esm/* jsx */.Y)(LoadingDot, {
    delay: 320,
    offset: !isRtl
  }));
};

var css$1 = function css(_ref, unstyled) {
  var isDisabled = _ref.isDisabled,
    isFocused = _ref.isFocused,
    _ref$theme = _ref.theme,
    colors = _ref$theme.colors,
    borderRadius = _ref$theme.borderRadius,
    spacing = _ref$theme.spacing;
  return (0,objectSpread2/* default */.A)({
    label: 'control',
    alignItems: 'center',
    cursor: 'default',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    minHeight: spacing.controlHeight,
    outline: '0 !important',
    position: 'relative',
    transition: 'all 100ms'
  }, unstyled ? {} : {
    backgroundColor: isDisabled ? colors.neutral5 : colors.neutral0,
    borderColor: isDisabled ? colors.neutral10 : isFocused ? colors.primary : colors.neutral20,
    borderRadius: borderRadius,
    borderStyle: 'solid',
    borderWidth: 1,
    boxShadow: isFocused ? "0 0 0 1px ".concat(colors.primary) : undefined,
    '&:hover': {
      borderColor: isFocused ? colors.primary : colors.neutral30
    }
  });
};
var Control = function Control(props) {
  var children = props.children,
    isDisabled = props.isDisabled,
    isFocused = props.isFocused,
    innerRef = props.innerRef,
    innerProps = props.innerProps,
    menuIsOpen = props.menuIsOpen;
  return (0,emotion_react_browser_esm/* jsx */.Y)("div", (0,esm_extends/* default */.A)({
    ref: innerRef
  }, getStyleProps(props, 'control', {
    control: true,
    'control--is-disabled': isDisabled,
    'control--is-focused': isFocused,
    'control--menu-is-open': menuIsOpen
  }), innerProps, {
    "aria-disabled": isDisabled || undefined
  }), children);
};
var Control$1 = Control;

var _excluded$1 = ["data"];
var groupCSS = function groupCSS(_ref, unstyled) {
  var spacing = _ref.theme.spacing;
  return unstyled ? {} : {
    paddingBottom: spacing.baseUnit * 2,
    paddingTop: spacing.baseUnit * 2
  };
};
var Group = function Group(props) {
  var children = props.children,
    cx = props.cx,
    getStyles = props.getStyles,
    getClassNames = props.getClassNames,
    Heading = props.Heading,
    headingProps = props.headingProps,
    innerProps = props.innerProps,
    label = props.label,
    theme = props.theme,
    selectProps = props.selectProps;
  return (0,emotion_react_browser_esm/* jsx */.Y)("div", (0,esm_extends/* default */.A)({}, getStyleProps(props, 'group', {
    group: true
  }), innerProps), (0,emotion_react_browser_esm/* jsx */.Y)(Heading, (0,esm_extends/* default */.A)({}, headingProps, {
    selectProps: selectProps,
    theme: theme,
    getStyles: getStyles,
    getClassNames: getClassNames,
    cx: cx
  }), label), (0,emotion_react_browser_esm/* jsx */.Y)("div", null, children));
};
var groupHeadingCSS = function groupHeadingCSS(_ref2, unstyled) {
  var _ref2$theme = _ref2.theme,
    colors = _ref2$theme.colors,
    spacing = _ref2$theme.spacing;
  return (0,objectSpread2/* default */.A)({
    label: 'group',
    cursor: 'default',
    display: 'block'
  }, unstyled ? {} : {
    color: colors.neutral40,
    fontSize: '75%',
    fontWeight: 500,
    marginBottom: '0.25em',
    paddingLeft: spacing.baseUnit * 3,
    paddingRight: spacing.baseUnit * 3,
    textTransform: 'uppercase'
  });
};
var GroupHeading = function GroupHeading(props) {
  var _cleanCommonProps = cleanCommonProps(props);
    _cleanCommonProps.data;
    var innerProps = (0,objectWithoutProperties/* default */.A)(_cleanCommonProps, _excluded$1);
  return (0,emotion_react_browser_esm/* jsx */.Y)("div", (0,esm_extends/* default */.A)({}, getStyleProps(props, 'groupHeading', {
    'group-heading': true
  }), innerProps));
};
var Group$1 = Group;

var _excluded = ["innerRef", "isDisabled", "isHidden", "inputClassName"];
var inputCSS = function inputCSS(_ref, unstyled) {
  var isDisabled = _ref.isDisabled,
    value = _ref.value,
    _ref$theme = _ref.theme,
    spacing = _ref$theme.spacing,
    colors = _ref$theme.colors;
  return (0,objectSpread2/* default */.A)((0,objectSpread2/* default */.A)({
    visibility: isDisabled ? 'hidden' : 'visible',
    // force css to recompute when value change due to @emotion bug.
    // We can remove it whenever the bug is fixed.
    transform: value ? 'translateZ(0)' : ''
  }, containerStyle), unstyled ? {} : {
    margin: spacing.baseUnit / 2,
    paddingBottom: spacing.baseUnit / 2,
    paddingTop: spacing.baseUnit / 2,
    color: colors.neutral80
  });
};
var spacingStyle = {
  gridArea: '1 / 2',
  font: 'inherit',
  minWidth: '2px',
  border: 0,
  margin: 0,
  outline: 0,
  padding: 0
};
var containerStyle = {
  flex: '1 1 auto',
  display: 'inline-grid',
  gridArea: '1 / 1 / 2 / 3',
  gridTemplateColumns: '0 min-content',
  '&:after': (0,objectSpread2/* default */.A)({
    content: 'attr(data-value) " "',
    visibility: 'hidden',
    whiteSpace: 'pre'
  }, spacingStyle)
};
var inputStyle = function inputStyle(isHidden) {
  return (0,objectSpread2/* default */.A)({
    label: 'input',
    color: 'inherit',
    background: 0,
    opacity: isHidden ? 0 : 1,
    width: '100%'
  }, spacingStyle);
};
var Input = function Input(props) {
  var cx = props.cx,
    value = props.value;
  var _cleanCommonProps = cleanCommonProps(props),
    innerRef = _cleanCommonProps.innerRef,
    isDisabled = _cleanCommonProps.isDisabled,
    isHidden = _cleanCommonProps.isHidden,
    inputClassName = _cleanCommonProps.inputClassName,
    innerProps = (0,objectWithoutProperties/* default */.A)(_cleanCommonProps, _excluded);
  return (0,emotion_react_browser_esm/* jsx */.Y)("div", (0,esm_extends/* default */.A)({}, getStyleProps(props, 'input', {
    'input-container': true
  }), {
    "data-value": value || ''
  }), (0,emotion_react_browser_esm/* jsx */.Y)("input", (0,esm_extends/* default */.A)({
    className: cx({
      input: true
    }, inputClassName),
    ref: innerRef,
    style: inputStyle(isHidden),
    disabled: isDisabled
  }, innerProps)));
};
var Input$1 = Input;

var multiValueCSS = function multiValueCSS(_ref, unstyled) {
  var _ref$theme = _ref.theme,
    spacing = _ref$theme.spacing,
    borderRadius = _ref$theme.borderRadius,
    colors = _ref$theme.colors;
  return (0,objectSpread2/* default */.A)({
    label: 'multiValue',
    display: 'flex',
    minWidth: 0
  }, unstyled ? {} : {
    backgroundColor: colors.neutral10,
    borderRadius: borderRadius / 2,
    margin: spacing.baseUnit / 2
  });
};
var multiValueLabelCSS = function multiValueLabelCSS(_ref2, unstyled) {
  var _ref2$theme = _ref2.theme,
    borderRadius = _ref2$theme.borderRadius,
    colors = _ref2$theme.colors,
    cropWithEllipsis = _ref2.cropWithEllipsis;
  return (0,objectSpread2/* default */.A)({
    overflow: 'hidden',
    textOverflow: cropWithEllipsis || cropWithEllipsis === undefined ? 'ellipsis' : undefined,
    whiteSpace: 'nowrap'
  }, unstyled ? {} : {
    borderRadius: borderRadius / 2,
    color: colors.neutral80,
    fontSize: '85%',
    padding: 3,
    paddingLeft: 6
  });
};
var multiValueRemoveCSS = function multiValueRemoveCSS(_ref3, unstyled) {
  var _ref3$theme = _ref3.theme,
    spacing = _ref3$theme.spacing,
    borderRadius = _ref3$theme.borderRadius,
    colors = _ref3$theme.colors,
    isFocused = _ref3.isFocused;
  return (0,objectSpread2/* default */.A)({
    alignItems: 'center',
    display: 'flex'
  }, unstyled ? {} : {
    borderRadius: borderRadius / 2,
    backgroundColor: isFocused ? colors.dangerLight : undefined,
    paddingLeft: spacing.baseUnit,
    paddingRight: spacing.baseUnit,
    ':hover': {
      backgroundColor: colors.dangerLight,
      color: colors.danger
    }
  });
};
var MultiValueGeneric = function MultiValueGeneric(_ref4) {
  var children = _ref4.children,
    innerProps = _ref4.innerProps;
  return (0,emotion_react_browser_esm/* jsx */.Y)("div", innerProps, children);
};
var MultiValueContainer = MultiValueGeneric;
var MultiValueLabel = MultiValueGeneric;
function MultiValueRemove(_ref5) {
  var children = _ref5.children,
    innerProps = _ref5.innerProps;
  return (0,emotion_react_browser_esm/* jsx */.Y)("div", (0,esm_extends/* default */.A)({
    role: "button"
  }, innerProps), children || (0,emotion_react_browser_esm/* jsx */.Y)(CrossIcon, {
    size: 14
  }));
}
var MultiValue = function MultiValue(props) {
  var children = props.children,
    components = props.components,
    data = props.data,
    innerProps = props.innerProps,
    isDisabled = props.isDisabled,
    removeProps = props.removeProps,
    selectProps = props.selectProps;
  var Container = components.Container,
    Label = components.Label,
    Remove = components.Remove;
  return (0,emotion_react_browser_esm/* jsx */.Y)(Container, {
    data: data,
    innerProps: (0,objectSpread2/* default */.A)((0,objectSpread2/* default */.A)({}, getStyleProps(props, 'multiValue', {
      'multi-value': true,
      'multi-value--is-disabled': isDisabled
    })), innerProps),
    selectProps: selectProps
  }, (0,emotion_react_browser_esm/* jsx */.Y)(Label, {
    data: data,
    innerProps: (0,objectSpread2/* default */.A)({}, getStyleProps(props, 'multiValueLabel', {
      'multi-value__label': true
    })),
    selectProps: selectProps
  }, children), (0,emotion_react_browser_esm/* jsx */.Y)(Remove, {
    data: data,
    innerProps: (0,objectSpread2/* default */.A)((0,objectSpread2/* default */.A)({}, getStyleProps(props, 'multiValueRemove', {
      'multi-value__remove': true
    })), {}, {
      'aria-label': "Remove ".concat(children || 'option')
    }, removeProps),
    selectProps: selectProps
  }));
};
var MultiValue$1 = MultiValue;

var optionCSS = function optionCSS(_ref, unstyled) {
  var isDisabled = _ref.isDisabled,
    isFocused = _ref.isFocused,
    isSelected = _ref.isSelected,
    _ref$theme = _ref.theme,
    spacing = _ref$theme.spacing,
    colors = _ref$theme.colors;
  return (0,objectSpread2/* default */.A)({
    label: 'option',
    cursor: 'default',
    display: 'block',
    fontSize: 'inherit',
    width: '100%',
    userSelect: 'none',
    WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)'
  }, unstyled ? {} : {
    backgroundColor: isSelected ? colors.primary : isFocused ? colors.primary25 : 'transparent',
    color: isDisabled ? colors.neutral20 : isSelected ? colors.neutral0 : 'inherit',
    padding: "".concat(spacing.baseUnit * 2, "px ").concat(spacing.baseUnit * 3, "px"),
    // provide some affordance on touch devices
    ':active': {
      backgroundColor: !isDisabled ? isSelected ? colors.primary : colors.primary50 : undefined
    }
  });
};
var Option = function Option(props) {
  var children = props.children,
    isDisabled = props.isDisabled,
    isFocused = props.isFocused,
    isSelected = props.isSelected,
    innerRef = props.innerRef,
    innerProps = props.innerProps;
  return (0,emotion_react_browser_esm/* jsx */.Y)("div", (0,esm_extends/* default */.A)({}, getStyleProps(props, 'option', {
    option: true,
    'option--is-disabled': isDisabled,
    'option--is-focused': isFocused,
    'option--is-selected': isSelected
  }), {
    ref: innerRef,
    "aria-disabled": isDisabled
  }, innerProps), children);
};
var Option$1 = Option;

var placeholderCSS = function placeholderCSS(_ref, unstyled) {
  var _ref$theme = _ref.theme,
    spacing = _ref$theme.spacing,
    colors = _ref$theme.colors;
  return (0,objectSpread2/* default */.A)({
    label: 'placeholder',
    gridArea: '1 / 1 / 2 / 3'
  }, unstyled ? {} : {
    color: colors.neutral50,
    marginLeft: spacing.baseUnit / 2,
    marginRight: spacing.baseUnit / 2
  });
};
var Placeholder = function Placeholder(props) {
  var children = props.children,
    innerProps = props.innerProps;
  return (0,emotion_react_browser_esm/* jsx */.Y)("div", (0,esm_extends/* default */.A)({}, getStyleProps(props, 'placeholder', {
    placeholder: true
  }), innerProps), children);
};
var Placeholder$1 = Placeholder;

var css = function css(_ref, unstyled) {
  var isDisabled = _ref.isDisabled,
    _ref$theme = _ref.theme,
    spacing = _ref$theme.spacing,
    colors = _ref$theme.colors;
  return (0,objectSpread2/* default */.A)({
    label: 'singleValue',
    gridArea: '1 / 1 / 2 / 3',
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }, unstyled ? {} : {
    color: isDisabled ? colors.neutral40 : colors.neutral80,
    marginLeft: spacing.baseUnit / 2,
    marginRight: spacing.baseUnit / 2
  });
};
var SingleValue = function SingleValue(props) {
  var children = props.children,
    isDisabled = props.isDisabled,
    innerProps = props.innerProps;
  return (0,emotion_react_browser_esm/* jsx */.Y)("div", (0,esm_extends/* default */.A)({}, getStyleProps(props, 'singleValue', {
    'single-value': true,
    'single-value--is-disabled': isDisabled
  }), innerProps), children);
};
var SingleValue$1 = SingleValue;

var components = {
  ClearIndicator: ClearIndicator,
  Control: Control$1,
  DropdownIndicator: DropdownIndicator,
  DownChevron: DownChevron,
  CrossIcon: CrossIcon,
  Group: Group$1,
  GroupHeading: GroupHeading,
  IndicatorsContainer: IndicatorsContainer,
  IndicatorSeparator: IndicatorSeparator,
  Input: Input$1,
  LoadingIndicator: LoadingIndicator,
  Menu: Menu$1,
  MenuList: MenuList,
  MenuPortal: MenuPortal,
  LoadingMessage: LoadingMessage,
  NoOptionsMessage: NoOptionsMessage,
  MultiValue: MultiValue$1,
  MultiValueContainer: MultiValueContainer,
  MultiValueLabel: MultiValueLabel,
  MultiValueRemove: MultiValueRemove,
  Option: Option$1,
  Placeholder: Placeholder$1,
  SelectContainer: SelectContainer,
  SingleValue: SingleValue$1,
  ValueContainer: ValueContainer
};
var defaultComponents = function defaultComponents(props) {
  return (0,objectSpread2/* default */.A)((0,objectSpread2/* default */.A)({}, components), props.components);
};




/***/ }),

/***/ 46005:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NonceProvider: () => (/* binding */ NonceProvider),
/* harmony export */   components: () => (/* reexport safe */ _index_a301f526_esm_js__WEBPACK_IMPORTED_MODULE_4__.c),
/* harmony export */   createFilter: () => (/* reexport safe */ _Select_49a62830_esm_js__WEBPACK_IMPORTED_MODULE_2__.c),
/* harmony export */   "default": () => (/* binding */ StateManagedSelect$1),
/* harmony export */   defaultTheme: () => (/* reexport safe */ _Select_49a62830_esm_js__WEBPACK_IMPORTED_MODULE_2__.d),
/* harmony export */   mergeStyles: () => (/* reexport safe */ _Select_49a62830_esm_js__WEBPACK_IMPORTED_MODULE_2__.m),
/* harmony export */   useStateManager: () => (/* reexport safe */ _useStateManager_7e1e8489_esm_js__WEBPACK_IMPORTED_MODULE_0__.u)
/* harmony export */ });
/* harmony import */ var _useStateManager_7e1e8489_esm_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(52836);
/* harmony import */ var _babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(65166);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(96540);
/* harmony import */ var _Select_49a62830_esm_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(93153);
/* harmony import */ var _emotion_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(87195);
/* harmony import */ var _emotion_cache__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(55655);
/* harmony import */ var _index_a301f526_esm_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(71332);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(40961);
/* harmony import */ var use_isomorphic_layout_effect__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(27003);


























var StateManagedSelect = /*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(function (props, ref) {
  var baseSelectProps = (0,_useStateManager_7e1e8489_esm_js__WEBPACK_IMPORTED_MODULE_0__.u)(props);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_Select_49a62830_esm_js__WEBPACK_IMPORTED_MODULE_2__.S, (0,_babel_runtime_helpers_esm_extends__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A)({
    ref: ref
  }, baseSelectProps));
});
var StateManagedSelect$1 = StateManagedSelect;

var NonceProvider = (function (_ref) {
  var nonce = _ref.nonce,
    children = _ref.children,
    cacheKey = _ref.cacheKey;
  var emotionCache = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(function () {
    return (0,_emotion_cache__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)({
      key: cacheKey,
      nonce: nonce
    });
  }, [cacheKey, nonce]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement(_emotion_react__WEBPACK_IMPORTED_MODULE_8__.C, {
    value: emotionCache
  }, children);
});




/***/ }),

/***/ 52836:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   u: () => (/* binding */ useStateManager)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(47029);
/* harmony import */ var _babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2482);
/* harmony import */ var _babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(35412);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(96540);





var _excluded = ["defaultInputValue", "defaultMenuIsOpen", "defaultValue", "inputValue", "menuIsOpen", "onChange", "onInputChange", "onMenuClose", "onMenuOpen", "value"];
function useStateManager(_ref) {
  var _ref$defaultInputValu = _ref.defaultInputValue,
    defaultInputValue = _ref$defaultInputValu === void 0 ? '' : _ref$defaultInputValu,
    _ref$defaultMenuIsOpe = _ref.defaultMenuIsOpen,
    defaultMenuIsOpen = _ref$defaultMenuIsOpe === void 0 ? false : _ref$defaultMenuIsOpe,
    _ref$defaultValue = _ref.defaultValue,
    defaultValue = _ref$defaultValue === void 0 ? null : _ref$defaultValue,
    propsInputValue = _ref.inputValue,
    propsMenuIsOpen = _ref.menuIsOpen,
    propsOnChange = _ref.onChange,
    propsOnInputChange = _ref.onInputChange,
    propsOnMenuClose = _ref.onMenuClose,
    propsOnMenuOpen = _ref.onMenuOpen,
    propsValue = _ref.value,
    restSelectProps = (0,_babel_runtime_helpers_esm_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .A)(_ref, _excluded);
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(propsInputValue !== undefined ? propsInputValue : defaultInputValue),
    _useState2 = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(_useState, 2),
    stateInputValue = _useState2[0],
    setStateInputValue = _useState2[1];
  var _useState3 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(propsMenuIsOpen !== undefined ? propsMenuIsOpen : defaultMenuIsOpen),
    _useState4 = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(_useState3, 2),
    stateMenuIsOpen = _useState4[0],
    setStateMenuIsOpen = _useState4[1];
  var _useState5 = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(propsValue !== undefined ? propsValue : defaultValue),
    _useState6 = (0,_babel_runtime_helpers_esm_slicedToArray__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .A)(_useState5, 2),
    stateValue = _useState6[0],
    setStateValue = _useState6[1];
  var onChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (value, actionMeta) {
    if (typeof propsOnChange === 'function') {
      propsOnChange(value, actionMeta);
    }
    setStateValue(value);
  }, [propsOnChange]);
  var onInputChange = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function (value, actionMeta) {
    var newValue;
    if (typeof propsOnInputChange === 'function') {
      newValue = propsOnInputChange(value, actionMeta);
    }
    setStateInputValue(newValue !== undefined ? newValue : value);
  }, [propsOnInputChange]);
  var onMenuOpen = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (typeof propsOnMenuOpen === 'function') {
      propsOnMenuOpen();
    }
    setStateMenuIsOpen(true);
  }, [propsOnMenuOpen]);
  var onMenuClose = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(function () {
    if (typeof propsOnMenuClose === 'function') {
      propsOnMenuClose();
    }
    setStateMenuIsOpen(false);
  }, [propsOnMenuClose]);
  var inputValue = propsInputValue !== undefined ? propsInputValue : stateInputValue;
  var menuIsOpen = propsMenuIsOpen !== undefined ? propsMenuIsOpen : stateMenuIsOpen;
  var value = propsValue !== undefined ? propsValue : stateValue;
  return (0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)((0,_babel_runtime_helpers_esm_objectSpread2__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)({}, restSelectProps), {}, {
    inputValue: inputValue,
    menuIsOpen: menuIsOpen,
    onChange: onChange,
    onInputChange: onInputChange,
    onMenuClose: onMenuClose,
    onMenuOpen: onMenuOpen,
    value: value
  });
}




/***/ }),

/***/ 26069:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var React = __importStar(__webpack_require__(96540));
var KEYCODE_Y = 89;
var KEYCODE_Z = 90;
var KEYCODE_M = 77;
var KEYCODE_PARENS = 57;
var KEYCODE_BRACKETS = 219;
var KEYCODE_QUOTE = 222;
var KEYCODE_BACK_QUOTE = 192;
var HISTORY_LIMIT = 100;
var HISTORY_TIME_GAP = 3000;
var isWindows = typeof window !== 'undefined' &&
    'navigator' in window &&
    /Win/i.test(navigator.platform);
var isMacLike = typeof window !== 'undefined' &&
    'navigator' in window &&
    /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);
var className = 'npm__react-simple-code-editor__textarea';
var cssText = /* CSS */ "\n/**\n * Reset the text fill color so that placeholder is visible\n */\n.".concat(className, ":empty {\n  -webkit-text-fill-color: inherit !important;\n}\n\n/**\n * Hack to apply on some CSS on IE10 and IE11\n */\n@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n  /**\n    * IE doesn't support '-webkit-text-fill-color'\n    * So we use 'color: transparent' to make the text transparent on IE\n    * Unlike other browsers, it doesn't affect caret color in IE\n    */\n  .").concat(className, " {\n    color: transparent !important;\n  }\n\n  .").concat(className, "::selection {\n    background-color: #accef7 !important;\n    color: transparent !important;\n  }\n}\n");
var Editor = React.forwardRef(function Editor(props, ref) {
    var autoFocus = props.autoFocus, disabled = props.disabled, form = props.form, highlight = props.highlight, _a = props.ignoreTabKey, ignoreTabKey = _a === void 0 ? false : _a, _b = props.insertSpaces, insertSpaces = _b === void 0 ? true : _b, maxLength = props.maxLength, minLength = props.minLength, name = props.name, onBlur = props.onBlur, onClick = props.onClick, onFocus = props.onFocus, onKeyDown = props.onKeyDown, onKeyUp = props.onKeyUp, onValueChange = props.onValueChange, _c = props.padding, padding = _c === void 0 ? 0 : _c, placeholder = props.placeholder, preClassName = props.preClassName, readOnly = props.readOnly, required = props.required, style = props.style, _d = props.tabSize, tabSize = _d === void 0 ? 2 : _d, textareaClassName = props.textareaClassName, textareaId = props.textareaId, value = props.value, rest = __rest(props, ["autoFocus", "disabled", "form", "highlight", "ignoreTabKey", "insertSpaces", "maxLength", "minLength", "name", "onBlur", "onClick", "onFocus", "onKeyDown", "onKeyUp", "onValueChange", "padding", "placeholder", "preClassName", "readOnly", "required", "style", "tabSize", "textareaClassName", "textareaId", "value"]);
    var historyRef = React.useRef({
        stack: [],
        offset: -1,
    });
    var inputRef = React.useRef(null);
    var _e = React.useState(true), capture = _e[0], setCapture = _e[1];
    var contentStyle = {
        paddingTop: typeof padding === 'object' ? padding.top : padding,
        paddingRight: typeof padding === 'object' ? padding.right : padding,
        paddingBottom: typeof padding === 'object' ? padding.bottom : padding,
        paddingLeft: typeof padding === 'object' ? padding.left : padding,
    };
    var highlighted = highlight(value);
    var getLines = function (text, position) {
        return text.substring(0, position).split('\n');
    };
    var recordChange = React.useCallback(function (record, overwrite) {
        var _a, _b, _c;
        if (overwrite === void 0) { overwrite = false; }
        var _d = historyRef.current, stack = _d.stack, offset = _d.offset;
        if (stack.length && offset > -1) {
            // When something updates, drop the redo operations
            historyRef.current.stack = stack.slice(0, offset + 1);
            // Limit the number of operations to 100
            var count = historyRef.current.stack.length;
            if (count > HISTORY_LIMIT) {
                var extras = count - HISTORY_LIMIT;
                historyRef.current.stack = stack.slice(extras, count);
                historyRef.current.offset = Math.max(historyRef.current.offset - extras, 0);
            }
        }
        var timestamp = Date.now();
        if (overwrite) {
            var last = historyRef.current.stack[historyRef.current.offset];
            if (last && timestamp - last.timestamp < HISTORY_TIME_GAP) {
                // A previous entry exists and was in short interval
                // Match the last word in the line
                var re = /[^a-z0-9]([a-z0-9]+)$/i;
                // Get the previous line
                var previous = (_a = getLines(last.value, last.selectionStart)
                    .pop()) === null || _a === void 0 ? void 0 : _a.match(re);
                // Get the current line
                var current = (_b = getLines(record.value, record.selectionStart)
                    .pop()) === null || _b === void 0 ? void 0 : _b.match(re);
                if ((previous === null || previous === void 0 ? void 0 : previous[1]) && ((_c = current === null || current === void 0 ? void 0 : current[1]) === null || _c === void 0 ? void 0 : _c.startsWith(previous[1]))) {
                    // The last word of the previous line and current line match
                    // Overwrite previous entry so that undo will remove whole word
                    historyRef.current.stack[historyRef.current.offset] = __assign(__assign({}, record), { timestamp: timestamp });
                    return;
                }
            }
        }
        // Add the new operation to the stack
        historyRef.current.stack.push(__assign(__assign({}, record), { timestamp: timestamp }));
        historyRef.current.offset++;
    }, []);
    var recordCurrentState = React.useCallback(function () {
        var input = inputRef.current;
        if (!input)
            return;
        // Save current state of the input
        var value = input.value, selectionStart = input.selectionStart, selectionEnd = input.selectionEnd;
        recordChange({
            value: value,
            selectionStart: selectionStart,
            selectionEnd: selectionEnd,
        });
    }, [recordChange]);
    var updateInput = function (record) {
        var input = inputRef.current;
        if (!input)
            return;
        // Update values and selection state
        input.value = record.value;
        input.selectionStart = record.selectionStart;
        input.selectionEnd = record.selectionEnd;
        onValueChange === null || onValueChange === void 0 ? void 0 : onValueChange(record.value);
    };
    var applyEdits = function (record) {
        // Save last selection state
        var input = inputRef.current;
        var last = historyRef.current.stack[historyRef.current.offset];
        if (last && input) {
            historyRef.current.stack[historyRef.current.offset] = __assign(__assign({}, last), { selectionStart: input.selectionStart, selectionEnd: input.selectionEnd });
        }
        // Save the changes
        recordChange(record);
        updateInput(record);
    };
    var undoEdit = function () {
        var _a = historyRef.current, stack = _a.stack, offset = _a.offset;
        // Get the previous edit
        var record = stack[offset - 1];
        if (record) {
            // Apply the changes and update the offset
            updateInput(record);
            historyRef.current.offset = Math.max(offset - 1, 0);
        }
    };
    var redoEdit = function () {
        var _a = historyRef.current, stack = _a.stack, offset = _a.offset;
        // Get the next edit
        var record = stack[offset + 1];
        if (record) {
            // Apply the changes and update the offset
            updateInput(record);
            historyRef.current.offset = Math.min(offset + 1, stack.length - 1);
        }
    };
    var handleKeyDown = function (e) {
        if (onKeyDown) {
            onKeyDown(e);
            if (e.defaultPrevented) {
                return;
            }
        }
        if (e.key === 'Escape') {
            e.currentTarget.blur();
        }
        var _a = e.currentTarget, value = _a.value, selectionStart = _a.selectionStart, selectionEnd = _a.selectionEnd;
        var tabCharacter = (insertSpaces ? ' ' : '\t').repeat(tabSize);
        if (e.key === 'Tab' && !ignoreTabKey && capture) {
            // Prevent focus change
            e.preventDefault();
            if (e.shiftKey) {
                // Unindent selected lines
                var linesBeforeCaret = getLines(value, selectionStart);
                var startLine_1 = linesBeforeCaret.length - 1;
                var endLine_1 = getLines(value, selectionEnd).length - 1;
                var nextValue = value
                    .split('\n')
                    .map(function (line, i) {
                    if (i >= startLine_1 &&
                        i <= endLine_1 &&
                        line.startsWith(tabCharacter)) {
                        return line.substring(tabCharacter.length);
                    }
                    return line;
                })
                    .join('\n');
                if (value !== nextValue) {
                    var startLineText = linesBeforeCaret[startLine_1];
                    applyEdits({
                        value: nextValue,
                        // Move the start cursor if first line in selection was modified
                        // It was modified only if it started with a tab
                        selectionStart: (startLineText === null || startLineText === void 0 ? void 0 : startLineText.startsWith(tabCharacter))
                            ? selectionStart - tabCharacter.length
                            : selectionStart,
                        // Move the end cursor by total number of characters removed
                        selectionEnd: selectionEnd - (value.length - nextValue.length),
                    });
                }
            }
            else if (selectionStart !== selectionEnd) {
                // Indent selected lines
                var linesBeforeCaret = getLines(value, selectionStart);
                var startLine_2 = linesBeforeCaret.length - 1;
                var endLine_2 = getLines(value, selectionEnd).length - 1;
                var startLineText = linesBeforeCaret[startLine_2];
                applyEdits({
                    value: value
                        .split('\n')
                        .map(function (line, i) {
                        if (i >= startLine_2 && i <= endLine_2) {
                            return tabCharacter + line;
                        }
                        return line;
                    })
                        .join('\n'),
                    // Move the start cursor by number of characters added in first line of selection
                    // Don't move it if it there was no text before cursor
                    selectionStart: startLineText && /\S/.test(startLineText)
                        ? selectionStart + tabCharacter.length
                        : selectionStart,
                    // Move the end cursor by total number of characters added
                    selectionEnd: selectionEnd + tabCharacter.length * (endLine_2 - startLine_2 + 1),
                });
            }
            else {
                var updatedSelection = selectionStart + tabCharacter.length;
                applyEdits({
                    // Insert tab character at caret
                    value: value.substring(0, selectionStart) +
                        tabCharacter +
                        value.substring(selectionEnd),
                    // Update caret position
                    selectionStart: updatedSelection,
                    selectionEnd: updatedSelection,
                });
            }
        }
        else if (e.key === 'Backspace') {
            var hasSelection = selectionStart !== selectionEnd;
            var textBeforeCaret = value.substring(0, selectionStart);
            if (textBeforeCaret.endsWith(tabCharacter) && !hasSelection) {
                // Prevent default delete behaviour
                e.preventDefault();
                var updatedSelection = selectionStart - tabCharacter.length;
                applyEdits({
                    // Remove tab character at caret
                    value: value.substring(0, selectionStart - tabCharacter.length) +
                        value.substring(selectionEnd),
                    // Update caret position
                    selectionStart: updatedSelection,
                    selectionEnd: updatedSelection,
                });
            }
        }
        else if (e.key === 'Enter') {
            // Ignore selections
            if (selectionStart === selectionEnd) {
                // Get the current line
                var line = getLines(value, selectionStart).pop();
                var matches = line === null || line === void 0 ? void 0 : line.match(/^\s+/);
                if (matches === null || matches === void 0 ? void 0 : matches[0]) {
                    e.preventDefault();
                    // Preserve indentation on inserting a new line
                    var indent = '\n' + matches[0];
                    var updatedSelection = selectionStart + indent.length;
                    applyEdits({
                        // Insert indentation character at caret
                        value: value.substring(0, selectionStart) +
                            indent +
                            value.substring(selectionEnd),
                        // Update caret position
                        selectionStart: updatedSelection,
                        selectionEnd: updatedSelection,
                    });
                }
            }
        }
        else if (e.keyCode === KEYCODE_PARENS ||
            e.keyCode === KEYCODE_BRACKETS ||
            e.keyCode === KEYCODE_QUOTE ||
            e.keyCode === KEYCODE_BACK_QUOTE) {
            var chars = void 0;
            if (e.keyCode === KEYCODE_PARENS && e.shiftKey) {
                chars = ['(', ')'];
            }
            else if (e.keyCode === KEYCODE_BRACKETS) {
                if (e.shiftKey) {
                    chars = ['{', '}'];
                }
                else {
                    chars = ['[', ']'];
                }
            }
            else if (e.keyCode === KEYCODE_QUOTE) {
                if (e.shiftKey) {
                    chars = ['"', '"'];
                }
                else {
                    chars = ["'", "'"];
                }
            }
            else if (e.keyCode === KEYCODE_BACK_QUOTE && !e.shiftKey) {
                chars = ['`', '`'];
            }
            // If text is selected, wrap them in the characters
            if (selectionStart !== selectionEnd && chars) {
                e.preventDefault();
                applyEdits({
                    value: value.substring(0, selectionStart) +
                        chars[0] +
                        value.substring(selectionStart, selectionEnd) +
                        chars[1] +
                        value.substring(selectionEnd),
                    // Update caret position
                    selectionStart: selectionStart,
                    selectionEnd: selectionEnd + 2,
                });
            }
        }
        else if ((isMacLike
            ? // Trigger undo with ⌘+Z on Mac
                e.metaKey && e.keyCode === KEYCODE_Z
            : // Trigger undo with Ctrl+Z on other platforms
                e.ctrlKey && e.keyCode === KEYCODE_Z) &&
            !e.shiftKey &&
            !e.altKey) {
            e.preventDefault();
            undoEdit();
        }
        else if ((isMacLike
            ? // Trigger redo with ⌘+Shift+Z on Mac
                e.metaKey && e.keyCode === KEYCODE_Z && e.shiftKey
            : isWindows
                ? // Trigger redo with Ctrl+Y on Windows
                    e.ctrlKey && e.keyCode === KEYCODE_Y
                : // Trigger redo with Ctrl+Shift+Z on other platforms
                    e.ctrlKey && e.keyCode === KEYCODE_Z && e.shiftKey) &&
            !e.altKey) {
            e.preventDefault();
            redoEdit();
        }
        else if (e.keyCode === KEYCODE_M &&
            e.ctrlKey &&
            (isMacLike ? e.shiftKey : true)) {
            e.preventDefault();
            // Toggle capturing tab key so users can focus away
            setCapture(function (prev) { return !prev; });
        }
    };
    var handleChange = function (e) {
        var _a = e.currentTarget, value = _a.value, selectionStart = _a.selectionStart, selectionEnd = _a.selectionEnd;
        recordChange({
            value: value,
            selectionStart: selectionStart,
            selectionEnd: selectionEnd,
        }, true);
        onValueChange(value);
    };
    React.useEffect(function () {
        recordCurrentState();
    }, [recordCurrentState]);
    React.useImperativeHandle(ref, function () {
        return {
            get session() {
                return {
                    history: historyRef.current,
                };
            },
            set session(session) {
                historyRef.current = session.history;
            },
        };
    }, []);
    return (React.createElement("div", __assign({}, rest, { style: __assign(__assign({}, styles.container), style) }),
        React.createElement("pre", __assign({ className: preClassName, "aria-hidden": "true", style: __assign(__assign(__assign({}, styles.editor), styles.highlight), contentStyle) }, (typeof highlighted === 'string'
            ? { dangerouslySetInnerHTML: { __html: highlighted + '<br />' } }
            : { children: highlighted }))),
        React.createElement("textarea", { ref: function (c) { return (inputRef.current = c); }, style: __assign(__assign(__assign({}, styles.editor), styles.textarea), contentStyle), className: className + (textareaClassName ? " ".concat(textareaClassName) : ''), id: textareaId, value: value, onChange: handleChange, onKeyDown: handleKeyDown, onClick: onClick, onKeyUp: onKeyUp, onFocus: onFocus, onBlur: onBlur, disabled: disabled, form: form, maxLength: maxLength, minLength: minLength, name: name, placeholder: placeholder, readOnly: readOnly, required: required, autoFocus: autoFocus, autoCapitalize: "off", autoComplete: "off", autoCorrect: "off", spellCheck: false, "data-gramm": false }),
        React.createElement("style", { dangerouslySetInnerHTML: { __html: cssText } })));
});
var styles = {
    container: {
        position: 'relative',
        textAlign: 'left',
        boxSizing: 'border-box',
        padding: 0,
        overflow: 'hidden',
    },
    textarea: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        resize: 'none',
        color: 'inherit',
        overflow: 'hidden',
        MozOsxFontSmoothing: 'grayscale',
        WebkitFontSmoothing: 'antialiased',
        WebkitTextFillColor: 'transparent',
    },
    highlight: {
        position: 'relative',
        pointerEvents: 'none',
    },
    editor: {
        margin: 0,
        border: 0,
        background: 'none',
        boxSizing: 'inherit',
        display: 'inherit',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        fontStyle: 'inherit',
        fontVariantLigatures: 'inherit',
        fontWeight: 'inherit',
        letterSpacing: 'inherit',
        lineHeight: 'inherit',
        tabSize: 'inherit',
        textIndent: 'inherit',
        textRendering: 'inherit',
        textTransform: 'inherit',
        whiteSpace: 'pre-wrap',
        wordBreak: 'keep-all',
        overflowWrap: 'break-word',
    },
};
exports["default"] = Editor;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 68178:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  FixedSizeGrid: () => (/* binding */ FixedSizeGrid),
  FixedSizeList: () => (/* binding */ FixedSizeList),
  VariableSizeGrid: () => (/* binding */ VariableSizeGrid),
  VariableSizeList: () => (/* binding */ VariableSizeList),
  areEqual: () => (/* binding */ areEqual),
  shouldComponentUpdate: () => (/* binding */ shouldComponentUpdate)
});

;// CONCATENATED MODULE: ./node_modules/react-window/node_modules/@babel/runtime/helpers/esm/extends.js
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}
;// CONCATENATED MODULE: ./node_modules/react-window/node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}
;// CONCATENATED MODULE: ./node_modules/react-window/node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}
;// CONCATENATED MODULE: ./node_modules/react-window/node_modules/memoize-one/dist/memoize-one.esm.js
function areInputsEqual(newInputs, lastInputs) {
    if (newInputs.length !== lastInputs.length) {
        return false;
    }
    for (var i = 0; i < newInputs.length; i++) {
        if (newInputs[i] !== lastInputs[i]) {
            return false;
        }
    }
    return true;
}

function memoizeOne(resultFn, isEqual) {
    if (isEqual === void 0) { isEqual = areInputsEqual; }
    var lastThis;
    var lastArgs = [];
    var lastResult;
    var calledOnce = false;
    function memoized() {
        var newArgs = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            newArgs[_i] = arguments[_i];
        }
        if (calledOnce && lastThis === this && isEqual(newArgs, lastArgs)) {
            return lastResult;
        }
        lastResult = resultFn.apply(this, newArgs);
        calledOnce = true;
        lastThis = this;
        lastArgs = newArgs;
        return lastResult;
    }
    return memoized;
}

/* harmony default export */ const memoize_one_esm = (memoizeOne);

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(96540);
;// CONCATENATED MODULE: ./node_modules/react-window/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}
;// CONCATENATED MODULE: ./node_modules/react-window/dist/index.esm.js







// Animation frame based implementation of setTimeout.
// Inspired by Joe Lambert, https://gist.github.com/joelambert/1002116#file-requesttimeout-js
var hasNativePerformanceNow = typeof performance === 'object' && typeof performance.now === 'function';
var now = hasNativePerformanceNow ? function () {
  return performance.now();
} : function () {
  return Date.now();
};
function cancelTimeout(timeoutID) {
  cancelAnimationFrame(timeoutID.id);
}
function requestTimeout(callback, delay) {
  var start = now();

  function tick() {
    if (now() - start >= delay) {
      callback.call(null);
    } else {
      timeoutID.id = requestAnimationFrame(tick);
    }
  }

  var timeoutID = {
    id: requestAnimationFrame(tick)
  };
  return timeoutID;
}

var size = -1; // This utility copied from "dom-helpers" package.

function getScrollbarSize(recalculate) {
  if (recalculate === void 0) {
    recalculate = false;
  }

  if (size === -1 || recalculate) {
    var div = document.createElement('div');
    var style = div.style;
    style.width = '50px';
    style.height = '50px';
    style.overflow = 'scroll';
    document.body.appendChild(div);
    size = div.offsetWidth - div.clientWidth;
    document.body.removeChild(div);
  }

  return size;
}
var cachedRTLResult = null; // TRICKY According to the spec, scrollLeft should be negative for RTL aligned elements.
// Chrome does not seem to adhere; its scrollLeft values are positive (measured relative to the left).
// Safari's elastic bounce makes detecting this even more complicated wrt potential false positives.
// The safest way to check this is to intentionally set a negative offset,
// and then verify that the subsequent "scroll" event matches the negative offset.
// If it does not match, then we can assume a non-standard RTL scroll implementation.

function getRTLOffsetType(recalculate) {
  if (recalculate === void 0) {
    recalculate = false;
  }

  if (cachedRTLResult === null || recalculate) {
    var outerDiv = document.createElement('div');
    var outerStyle = outerDiv.style;
    outerStyle.width = '50px';
    outerStyle.height = '50px';
    outerStyle.overflow = 'scroll';
    outerStyle.direction = 'rtl';
    var innerDiv = document.createElement('div');
    var innerStyle = innerDiv.style;
    innerStyle.width = '100px';
    innerStyle.height = '100px';
    outerDiv.appendChild(innerDiv);
    document.body.appendChild(outerDiv);

    if (outerDiv.scrollLeft > 0) {
      cachedRTLResult = 'positive-descending';
    } else {
      outerDiv.scrollLeft = 1;

      if (outerDiv.scrollLeft === 0) {
        cachedRTLResult = 'negative';
      } else {
        cachedRTLResult = 'positive-ascending';
      }
    }

    document.body.removeChild(outerDiv);
    return cachedRTLResult;
  }

  return cachedRTLResult;
}

var IS_SCROLLING_DEBOUNCE_INTERVAL = 150;

var defaultItemKey = function defaultItemKey(_ref) {
  var columnIndex = _ref.columnIndex,
      data = _ref.data,
      rowIndex = _ref.rowIndex;
  return rowIndex + ":" + columnIndex;
}; // In DEV mode, this Set helps us only log a warning once per component instance.
// This avoids spamming the console every time a render happens.


var devWarningsOverscanCount = null;
var devWarningsOverscanRowsColumnsCount = null;
var devWarningsTagName = null;

if (false) {}

function createGridComponent(_ref2) {
  var _class;

  var getColumnOffset = _ref2.getColumnOffset,
      getColumnStartIndexForOffset = _ref2.getColumnStartIndexForOffset,
      getColumnStopIndexForStartIndex = _ref2.getColumnStopIndexForStartIndex,
      getColumnWidth = _ref2.getColumnWidth,
      getEstimatedTotalHeight = _ref2.getEstimatedTotalHeight,
      getEstimatedTotalWidth = _ref2.getEstimatedTotalWidth,
      getOffsetForColumnAndAlignment = _ref2.getOffsetForColumnAndAlignment,
      getOffsetForRowAndAlignment = _ref2.getOffsetForRowAndAlignment,
      getRowHeight = _ref2.getRowHeight,
      getRowOffset = _ref2.getRowOffset,
      getRowStartIndexForOffset = _ref2.getRowStartIndexForOffset,
      getRowStopIndexForStartIndex = _ref2.getRowStopIndexForStartIndex,
      initInstanceProps = _ref2.initInstanceProps,
      shouldResetStyleCacheOnItemSizeChange = _ref2.shouldResetStyleCacheOnItemSizeChange,
      validateProps = _ref2.validateProps;
  return _class = /*#__PURE__*/function (_PureComponent) {
    _inheritsLoose(Grid, _PureComponent);

    // Always use explicit constructor for React components.
    // It produces less code after transpilation. (#26)
    // eslint-disable-next-line no-useless-constructor
    function Grid(props) {
      var _this;

      _this = _PureComponent.call(this, props) || this;
      _this._instanceProps = initInstanceProps(_this.props, _assertThisInitialized(_this));
      _this._resetIsScrollingTimeoutId = null;
      _this._outerRef = void 0;
      _this.state = {
        instance: _assertThisInitialized(_this),
        isScrolling: false,
        horizontalScrollDirection: 'forward',
        scrollLeft: typeof _this.props.initialScrollLeft === 'number' ? _this.props.initialScrollLeft : 0,
        scrollTop: typeof _this.props.initialScrollTop === 'number' ? _this.props.initialScrollTop : 0,
        scrollUpdateWasRequested: false,
        verticalScrollDirection: 'forward'
      };
      _this._callOnItemsRendered = void 0;
      _this._callOnItemsRendered = memoize_one_esm(function (overscanColumnStartIndex, overscanColumnStopIndex, overscanRowStartIndex, overscanRowStopIndex, visibleColumnStartIndex, visibleColumnStopIndex, visibleRowStartIndex, visibleRowStopIndex) {
        return _this.props.onItemsRendered({
          overscanColumnStartIndex: overscanColumnStartIndex,
          overscanColumnStopIndex: overscanColumnStopIndex,
          overscanRowStartIndex: overscanRowStartIndex,
          overscanRowStopIndex: overscanRowStopIndex,
          visibleColumnStartIndex: visibleColumnStartIndex,
          visibleColumnStopIndex: visibleColumnStopIndex,
          visibleRowStartIndex: visibleRowStartIndex,
          visibleRowStopIndex: visibleRowStopIndex
        });
      });
      _this._callOnScroll = void 0;
      _this._callOnScroll = memoize_one_esm(function (scrollLeft, scrollTop, horizontalScrollDirection, verticalScrollDirection, scrollUpdateWasRequested) {
        return _this.props.onScroll({
          horizontalScrollDirection: horizontalScrollDirection,
          scrollLeft: scrollLeft,
          scrollTop: scrollTop,
          verticalScrollDirection: verticalScrollDirection,
          scrollUpdateWasRequested: scrollUpdateWasRequested
        });
      });
      _this._getItemStyle = void 0;

      _this._getItemStyle = function (rowIndex, columnIndex) {
        var _this$props = _this.props,
            columnWidth = _this$props.columnWidth,
            direction = _this$props.direction,
            rowHeight = _this$props.rowHeight;

        var itemStyleCache = _this._getItemStyleCache(shouldResetStyleCacheOnItemSizeChange && columnWidth, shouldResetStyleCacheOnItemSizeChange && direction, shouldResetStyleCacheOnItemSizeChange && rowHeight);

        var key = rowIndex + ":" + columnIndex;
        var style;

        if (itemStyleCache.hasOwnProperty(key)) {
          style = itemStyleCache[key];
        } else {
          var _offset = getColumnOffset(_this.props, columnIndex, _this._instanceProps);

          var isRtl = direction === 'rtl';
          itemStyleCache[key] = style = {
            position: 'absolute',
            left: isRtl ? undefined : _offset,
            right: isRtl ? _offset : undefined,
            top: getRowOffset(_this.props, rowIndex, _this._instanceProps),
            height: getRowHeight(_this.props, rowIndex, _this._instanceProps),
            width: getColumnWidth(_this.props, columnIndex, _this._instanceProps)
          };
        }

        return style;
      };

      _this._getItemStyleCache = void 0;
      _this._getItemStyleCache = memoize_one_esm(function (_, __, ___) {
        return {};
      });

      _this._onScroll = function (event) {
        var _event$currentTarget = event.currentTarget,
            clientHeight = _event$currentTarget.clientHeight,
            clientWidth = _event$currentTarget.clientWidth,
            scrollLeft = _event$currentTarget.scrollLeft,
            scrollTop = _event$currentTarget.scrollTop,
            scrollHeight = _event$currentTarget.scrollHeight,
            scrollWidth = _event$currentTarget.scrollWidth;

        _this.setState(function (prevState) {
          if (prevState.scrollLeft === scrollLeft && prevState.scrollTop === scrollTop) {
            // Scroll position may have been updated by cDM/cDU,
            // In which case we don't need to trigger another render,
            // And we don't want to update state.isScrolling.
            return null;
          }

          var direction = _this.props.direction; // TRICKY According to the spec, scrollLeft should be negative for RTL aligned elements.
          // This is not the case for all browsers though (e.g. Chrome reports values as positive, measured relative to the left).
          // It's also easier for this component if we convert offsets to the same format as they would be in for ltr.
          // So the simplest solution is to determine which browser behavior we're dealing with, and convert based on it.

          var calculatedScrollLeft = scrollLeft;

          if (direction === 'rtl') {
            switch (getRTLOffsetType()) {
              case 'negative':
                calculatedScrollLeft = -scrollLeft;
                break;

              case 'positive-descending':
                calculatedScrollLeft = scrollWidth - clientWidth - scrollLeft;
                break;
            }
          } // Prevent Safari's elastic scrolling from causing visual shaking when scrolling past bounds.


          calculatedScrollLeft = Math.max(0, Math.min(calculatedScrollLeft, scrollWidth - clientWidth));
          var calculatedScrollTop = Math.max(0, Math.min(scrollTop, scrollHeight - clientHeight));
          return {
            isScrolling: true,
            horizontalScrollDirection: prevState.scrollLeft < scrollLeft ? 'forward' : 'backward',
            scrollLeft: calculatedScrollLeft,
            scrollTop: calculatedScrollTop,
            verticalScrollDirection: prevState.scrollTop < scrollTop ? 'forward' : 'backward',
            scrollUpdateWasRequested: false
          };
        }, _this._resetIsScrollingDebounced);
      };

      _this._outerRefSetter = function (ref) {
        var outerRef = _this.props.outerRef;
        _this._outerRef = ref;

        if (typeof outerRef === 'function') {
          outerRef(ref);
        } else if (outerRef != null && typeof outerRef === 'object' && outerRef.hasOwnProperty('current')) {
          outerRef.current = ref;
        }
      };

      _this._resetIsScrollingDebounced = function () {
        if (_this._resetIsScrollingTimeoutId !== null) {
          cancelTimeout(_this._resetIsScrollingTimeoutId);
        }

        _this._resetIsScrollingTimeoutId = requestTimeout(_this._resetIsScrolling, IS_SCROLLING_DEBOUNCE_INTERVAL);
      };

      _this._resetIsScrolling = function () {
        _this._resetIsScrollingTimeoutId = null;

        _this.setState({
          isScrolling: false
        }, function () {
          // Clear style cache after state update has been committed.
          // This way we don't break pure sCU for items that don't use isScrolling param.
          _this._getItemStyleCache(-1);
        });
      };

      return _this;
    }

    Grid.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
      validateSharedProps(nextProps, prevState);
      validateProps(nextProps);
      return null;
    };

    var _proto = Grid.prototype;

    _proto.scrollTo = function scrollTo(_ref3) {
      var scrollLeft = _ref3.scrollLeft,
          scrollTop = _ref3.scrollTop;

      if (scrollLeft !== undefined) {
        scrollLeft = Math.max(0, scrollLeft);
      }

      if (scrollTop !== undefined) {
        scrollTop = Math.max(0, scrollTop);
      }

      this.setState(function (prevState) {
        if (scrollLeft === undefined) {
          scrollLeft = prevState.scrollLeft;
        }

        if (scrollTop === undefined) {
          scrollTop = prevState.scrollTop;
        }

        if (prevState.scrollLeft === scrollLeft && prevState.scrollTop === scrollTop) {
          return null;
        }

        return {
          horizontalScrollDirection: prevState.scrollLeft < scrollLeft ? 'forward' : 'backward',
          scrollLeft: scrollLeft,
          scrollTop: scrollTop,
          scrollUpdateWasRequested: true,
          verticalScrollDirection: prevState.scrollTop < scrollTop ? 'forward' : 'backward'
        };
      }, this._resetIsScrollingDebounced);
    };

    _proto.scrollToItem = function scrollToItem(_ref4) {
      var _ref4$align = _ref4.align,
          align = _ref4$align === void 0 ? 'auto' : _ref4$align,
          columnIndex = _ref4.columnIndex,
          rowIndex = _ref4.rowIndex;
      var _this$props2 = this.props,
          columnCount = _this$props2.columnCount,
          height = _this$props2.height,
          rowCount = _this$props2.rowCount,
          width = _this$props2.width;
      var _this$state = this.state,
          scrollLeft = _this$state.scrollLeft,
          scrollTop = _this$state.scrollTop;
      var scrollbarSize = getScrollbarSize();

      if (columnIndex !== undefined) {
        columnIndex = Math.max(0, Math.min(columnIndex, columnCount - 1));
      }

      if (rowIndex !== undefined) {
        rowIndex = Math.max(0, Math.min(rowIndex, rowCount - 1));
      }

      var estimatedTotalHeight = getEstimatedTotalHeight(this.props, this._instanceProps);
      var estimatedTotalWidth = getEstimatedTotalWidth(this.props, this._instanceProps); // The scrollbar size should be considered when scrolling an item into view,
      // to ensure it's fully visible.
      // But we only need to account for its size when it's actually visible.

      var horizontalScrollbarSize = estimatedTotalWidth > width ? scrollbarSize : 0;
      var verticalScrollbarSize = estimatedTotalHeight > height ? scrollbarSize : 0;
      this.scrollTo({
        scrollLeft: columnIndex !== undefined ? getOffsetForColumnAndAlignment(this.props, columnIndex, align, scrollLeft, this._instanceProps, verticalScrollbarSize) : scrollLeft,
        scrollTop: rowIndex !== undefined ? getOffsetForRowAndAlignment(this.props, rowIndex, align, scrollTop, this._instanceProps, horizontalScrollbarSize) : scrollTop
      });
    };

    _proto.componentDidMount = function componentDidMount() {
      var _this$props3 = this.props,
          initialScrollLeft = _this$props3.initialScrollLeft,
          initialScrollTop = _this$props3.initialScrollTop;

      if (this._outerRef != null) {
        var outerRef = this._outerRef;

        if (typeof initialScrollLeft === 'number') {
          outerRef.scrollLeft = initialScrollLeft;
        }

        if (typeof initialScrollTop === 'number') {
          outerRef.scrollTop = initialScrollTop;
        }
      }

      this._callPropsCallbacks();
    };

    _proto.componentDidUpdate = function componentDidUpdate() {
      var direction = this.props.direction;
      var _this$state2 = this.state,
          scrollLeft = _this$state2.scrollLeft,
          scrollTop = _this$state2.scrollTop,
          scrollUpdateWasRequested = _this$state2.scrollUpdateWasRequested;

      if (scrollUpdateWasRequested && this._outerRef != null) {
        // TRICKY According to the spec, scrollLeft should be negative for RTL aligned elements.
        // This is not the case for all browsers though (e.g. Chrome reports values as positive, measured relative to the left).
        // So we need to determine which browser behavior we're dealing with, and mimic it.
        var outerRef = this._outerRef;

        if (direction === 'rtl') {
          switch (getRTLOffsetType()) {
            case 'negative':
              outerRef.scrollLeft = -scrollLeft;
              break;

            case 'positive-ascending':
              outerRef.scrollLeft = scrollLeft;
              break;

            default:
              var clientWidth = outerRef.clientWidth,
                  scrollWidth = outerRef.scrollWidth;
              outerRef.scrollLeft = scrollWidth - clientWidth - scrollLeft;
              break;
          }
        } else {
          outerRef.scrollLeft = Math.max(0, scrollLeft);
        }

        outerRef.scrollTop = Math.max(0, scrollTop);
      }

      this._callPropsCallbacks();
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      if (this._resetIsScrollingTimeoutId !== null) {
        cancelTimeout(this._resetIsScrollingTimeoutId);
      }
    };

    _proto.render = function render() {
      var _this$props4 = this.props,
          children = _this$props4.children,
          className = _this$props4.className,
          columnCount = _this$props4.columnCount,
          direction = _this$props4.direction,
          height = _this$props4.height,
          innerRef = _this$props4.innerRef,
          innerElementType = _this$props4.innerElementType,
          innerTagName = _this$props4.innerTagName,
          itemData = _this$props4.itemData,
          _this$props4$itemKey = _this$props4.itemKey,
          itemKey = _this$props4$itemKey === void 0 ? defaultItemKey : _this$props4$itemKey,
          outerElementType = _this$props4.outerElementType,
          outerTagName = _this$props4.outerTagName,
          rowCount = _this$props4.rowCount,
          style = _this$props4.style,
          useIsScrolling = _this$props4.useIsScrolling,
          width = _this$props4.width;
      var isScrolling = this.state.isScrolling;

      var _this$_getHorizontalR = this._getHorizontalRangeToRender(),
          columnStartIndex = _this$_getHorizontalR[0],
          columnStopIndex = _this$_getHorizontalR[1];

      var _this$_getVerticalRan = this._getVerticalRangeToRender(),
          rowStartIndex = _this$_getVerticalRan[0],
          rowStopIndex = _this$_getVerticalRan[1];

      var items = [];

      if (columnCount > 0 && rowCount) {
        for (var _rowIndex = rowStartIndex; _rowIndex <= rowStopIndex; _rowIndex++) {
          for (var _columnIndex = columnStartIndex; _columnIndex <= columnStopIndex; _columnIndex++) {
            items.push((0,react.createElement)(children, {
              columnIndex: _columnIndex,
              data: itemData,
              isScrolling: useIsScrolling ? isScrolling : undefined,
              key: itemKey({
                columnIndex: _columnIndex,
                data: itemData,
                rowIndex: _rowIndex
              }),
              rowIndex: _rowIndex,
              style: this._getItemStyle(_rowIndex, _columnIndex)
            }));
          }
        }
      } // Read this value AFTER items have been created,
      // So their actual sizes (if variable) are taken into consideration.


      var estimatedTotalHeight = getEstimatedTotalHeight(this.props, this._instanceProps);
      var estimatedTotalWidth = getEstimatedTotalWidth(this.props, this._instanceProps);
      return (0,react.createElement)(outerElementType || outerTagName || 'div', {
        className: className,
        onScroll: this._onScroll,
        ref: this._outerRefSetter,
        style: _extends({
          position: 'relative',
          height: height,
          width: width,
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          willChange: 'transform',
          direction: direction
        }, style)
      }, (0,react.createElement)(innerElementType || innerTagName || 'div', {
        children: items,
        ref: innerRef,
        style: {
          height: estimatedTotalHeight,
          pointerEvents: isScrolling ? 'none' : undefined,
          width: estimatedTotalWidth
        }
      }));
    };

    _proto._callPropsCallbacks = function _callPropsCallbacks() {
      var _this$props5 = this.props,
          columnCount = _this$props5.columnCount,
          onItemsRendered = _this$props5.onItemsRendered,
          onScroll = _this$props5.onScroll,
          rowCount = _this$props5.rowCount;

      if (typeof onItemsRendered === 'function') {
        if (columnCount > 0 && rowCount > 0) {
          var _this$_getHorizontalR2 = this._getHorizontalRangeToRender(),
              _overscanColumnStartIndex = _this$_getHorizontalR2[0],
              _overscanColumnStopIndex = _this$_getHorizontalR2[1],
              _visibleColumnStartIndex = _this$_getHorizontalR2[2],
              _visibleColumnStopIndex = _this$_getHorizontalR2[3];

          var _this$_getVerticalRan2 = this._getVerticalRangeToRender(),
              _overscanRowStartIndex = _this$_getVerticalRan2[0],
              _overscanRowStopIndex = _this$_getVerticalRan2[1],
              _visibleRowStartIndex = _this$_getVerticalRan2[2],
              _visibleRowStopIndex = _this$_getVerticalRan2[3];

          this._callOnItemsRendered(_overscanColumnStartIndex, _overscanColumnStopIndex, _overscanRowStartIndex, _overscanRowStopIndex, _visibleColumnStartIndex, _visibleColumnStopIndex, _visibleRowStartIndex, _visibleRowStopIndex);
        }
      }

      if (typeof onScroll === 'function') {
        var _this$state3 = this.state,
            _horizontalScrollDirection = _this$state3.horizontalScrollDirection,
            _scrollLeft = _this$state3.scrollLeft,
            _scrollTop = _this$state3.scrollTop,
            _scrollUpdateWasRequested = _this$state3.scrollUpdateWasRequested,
            _verticalScrollDirection = _this$state3.verticalScrollDirection;

        this._callOnScroll(_scrollLeft, _scrollTop, _horizontalScrollDirection, _verticalScrollDirection, _scrollUpdateWasRequested);
      }
    } // Lazily create and cache item styles while scrolling,
    // So that pure component sCU will prevent re-renders.
    // We maintain this cache, and pass a style prop rather than index,
    // So that List can clear cached styles and force item re-render if necessary.
    ;

    _proto._getHorizontalRangeToRender = function _getHorizontalRangeToRender() {
      var _this$props6 = this.props,
          columnCount = _this$props6.columnCount,
          overscanColumnCount = _this$props6.overscanColumnCount,
          overscanColumnsCount = _this$props6.overscanColumnsCount,
          overscanCount = _this$props6.overscanCount,
          rowCount = _this$props6.rowCount;
      var _this$state4 = this.state,
          horizontalScrollDirection = _this$state4.horizontalScrollDirection,
          isScrolling = _this$state4.isScrolling,
          scrollLeft = _this$state4.scrollLeft;
      var overscanCountResolved = overscanColumnCount || overscanColumnsCount || overscanCount || 1;

      if (columnCount === 0 || rowCount === 0) {
        return [0, 0, 0, 0];
      }

      var startIndex = getColumnStartIndexForOffset(this.props, scrollLeft, this._instanceProps);
      var stopIndex = getColumnStopIndexForStartIndex(this.props, startIndex, scrollLeft, this._instanceProps); // Overscan by one item in each direction so that tab/focus works.
      // If there isn't at least one extra item, tab loops back around.

      var overscanBackward = !isScrolling || horizontalScrollDirection === 'backward' ? Math.max(1, overscanCountResolved) : 1;
      var overscanForward = !isScrolling || horizontalScrollDirection === 'forward' ? Math.max(1, overscanCountResolved) : 1;
      return [Math.max(0, startIndex - overscanBackward), Math.max(0, Math.min(columnCount - 1, stopIndex + overscanForward)), startIndex, stopIndex];
    };

    _proto._getVerticalRangeToRender = function _getVerticalRangeToRender() {
      var _this$props7 = this.props,
          columnCount = _this$props7.columnCount,
          overscanCount = _this$props7.overscanCount,
          overscanRowCount = _this$props7.overscanRowCount,
          overscanRowsCount = _this$props7.overscanRowsCount,
          rowCount = _this$props7.rowCount;
      var _this$state5 = this.state,
          isScrolling = _this$state5.isScrolling,
          verticalScrollDirection = _this$state5.verticalScrollDirection,
          scrollTop = _this$state5.scrollTop;
      var overscanCountResolved = overscanRowCount || overscanRowsCount || overscanCount || 1;

      if (columnCount === 0 || rowCount === 0) {
        return [0, 0, 0, 0];
      }

      var startIndex = getRowStartIndexForOffset(this.props, scrollTop, this._instanceProps);
      var stopIndex = getRowStopIndexForStartIndex(this.props, startIndex, scrollTop, this._instanceProps); // Overscan by one item in each direction so that tab/focus works.
      // If there isn't at least one extra item, tab loops back around.

      var overscanBackward = !isScrolling || verticalScrollDirection === 'backward' ? Math.max(1, overscanCountResolved) : 1;
      var overscanForward = !isScrolling || verticalScrollDirection === 'forward' ? Math.max(1, overscanCountResolved) : 1;
      return [Math.max(0, startIndex - overscanBackward), Math.max(0, Math.min(rowCount - 1, stopIndex + overscanForward)), startIndex, stopIndex];
    };

    return Grid;
  }(react.PureComponent), _class.defaultProps = {
    direction: 'ltr',
    itemData: undefined,
    useIsScrolling: false
  }, _class;
}

var validateSharedProps = function validateSharedProps(_ref5, _ref6) {
  var children = _ref5.children,
      direction = _ref5.direction,
      height = _ref5.height,
      innerTagName = _ref5.innerTagName,
      outerTagName = _ref5.outerTagName,
      overscanColumnsCount = _ref5.overscanColumnsCount,
      overscanCount = _ref5.overscanCount,
      overscanRowsCount = _ref5.overscanRowsCount,
      width = _ref5.width;
  var instance = _ref6.instance;

  if (false) {}
};

var DEFAULT_ESTIMATED_ITEM_SIZE = 50;

var getEstimatedTotalHeight = function getEstimatedTotalHeight(_ref, _ref2) {
  var rowCount = _ref.rowCount;
  var rowMetadataMap = _ref2.rowMetadataMap,
      estimatedRowHeight = _ref2.estimatedRowHeight,
      lastMeasuredRowIndex = _ref2.lastMeasuredRowIndex;
  var totalSizeOfMeasuredRows = 0; // Edge case check for when the number of items decreases while a scroll is in progress.
  // https://github.com/bvaughn/react-window/pull/138

  if (lastMeasuredRowIndex >= rowCount) {
    lastMeasuredRowIndex = rowCount - 1;
  }

  if (lastMeasuredRowIndex >= 0) {
    var itemMetadata = rowMetadataMap[lastMeasuredRowIndex];
    totalSizeOfMeasuredRows = itemMetadata.offset + itemMetadata.size;
  }

  var numUnmeasuredItems = rowCount - lastMeasuredRowIndex - 1;
  var totalSizeOfUnmeasuredItems = numUnmeasuredItems * estimatedRowHeight;
  return totalSizeOfMeasuredRows + totalSizeOfUnmeasuredItems;
};

var getEstimatedTotalWidth = function getEstimatedTotalWidth(_ref3, _ref4) {
  var columnCount = _ref3.columnCount;
  var columnMetadataMap = _ref4.columnMetadataMap,
      estimatedColumnWidth = _ref4.estimatedColumnWidth,
      lastMeasuredColumnIndex = _ref4.lastMeasuredColumnIndex;
  var totalSizeOfMeasuredRows = 0; // Edge case check for when the number of items decreases while a scroll is in progress.
  // https://github.com/bvaughn/react-window/pull/138

  if (lastMeasuredColumnIndex >= columnCount) {
    lastMeasuredColumnIndex = columnCount - 1;
  }

  if (lastMeasuredColumnIndex >= 0) {
    var itemMetadata = columnMetadataMap[lastMeasuredColumnIndex];
    totalSizeOfMeasuredRows = itemMetadata.offset + itemMetadata.size;
  }

  var numUnmeasuredItems = columnCount - lastMeasuredColumnIndex - 1;
  var totalSizeOfUnmeasuredItems = numUnmeasuredItems * estimatedColumnWidth;
  return totalSizeOfMeasuredRows + totalSizeOfUnmeasuredItems;
};

var getItemMetadata = function getItemMetadata(itemType, props, index, instanceProps) {
  var itemMetadataMap, itemSize, lastMeasuredIndex;

  if (itemType === 'column') {
    itemMetadataMap = instanceProps.columnMetadataMap;
    itemSize = props.columnWidth;
    lastMeasuredIndex = instanceProps.lastMeasuredColumnIndex;
  } else {
    itemMetadataMap = instanceProps.rowMetadataMap;
    itemSize = props.rowHeight;
    lastMeasuredIndex = instanceProps.lastMeasuredRowIndex;
  }

  if (index > lastMeasuredIndex) {
    var offset = 0;

    if (lastMeasuredIndex >= 0) {
      var itemMetadata = itemMetadataMap[lastMeasuredIndex];
      offset = itemMetadata.offset + itemMetadata.size;
    }

    for (var i = lastMeasuredIndex + 1; i <= index; i++) {
      var size = itemSize(i);
      itemMetadataMap[i] = {
        offset: offset,
        size: size
      };
      offset += size;
    }

    if (itemType === 'column') {
      instanceProps.lastMeasuredColumnIndex = index;
    } else {
      instanceProps.lastMeasuredRowIndex = index;
    }
  }

  return itemMetadataMap[index];
};

var findNearestItem = function findNearestItem(itemType, props, instanceProps, offset) {
  var itemMetadataMap, lastMeasuredIndex;

  if (itemType === 'column') {
    itemMetadataMap = instanceProps.columnMetadataMap;
    lastMeasuredIndex = instanceProps.lastMeasuredColumnIndex;
  } else {
    itemMetadataMap = instanceProps.rowMetadataMap;
    lastMeasuredIndex = instanceProps.lastMeasuredRowIndex;
  }

  var lastMeasuredItemOffset = lastMeasuredIndex > 0 ? itemMetadataMap[lastMeasuredIndex].offset : 0;

  if (lastMeasuredItemOffset >= offset) {
    // If we've already measured items within this range just use a binary search as it's faster.
    return findNearestItemBinarySearch(itemType, props, instanceProps, lastMeasuredIndex, 0, offset);
  } else {
    // If we haven't yet measured this high, fallback to an exponential search with an inner binary search.
    // The exponential search avoids pre-computing sizes for the full set of items as a binary search would.
    // The overall complexity for this approach is O(log n).
    return findNearestItemExponentialSearch(itemType, props, instanceProps, Math.max(0, lastMeasuredIndex), offset);
  }
};

var findNearestItemBinarySearch = function findNearestItemBinarySearch(itemType, props, instanceProps, high, low, offset) {
  while (low <= high) {
    var middle = low + Math.floor((high - low) / 2);
    var currentOffset = getItemMetadata(itemType, props, middle, instanceProps).offset;

    if (currentOffset === offset) {
      return middle;
    } else if (currentOffset < offset) {
      low = middle + 1;
    } else if (currentOffset > offset) {
      high = middle - 1;
    }
  }

  if (low > 0) {
    return low - 1;
  } else {
    return 0;
  }
};

var findNearestItemExponentialSearch = function findNearestItemExponentialSearch(itemType, props, instanceProps, index, offset) {
  var itemCount = itemType === 'column' ? props.columnCount : props.rowCount;
  var interval = 1;

  while (index < itemCount && getItemMetadata(itemType, props, index, instanceProps).offset < offset) {
    index += interval;
    interval *= 2;
  }

  return findNearestItemBinarySearch(itemType, props, instanceProps, Math.min(index, itemCount - 1), Math.floor(index / 2), offset);
};

var getOffsetForIndexAndAlignment = function getOffsetForIndexAndAlignment(itemType, props, index, align, scrollOffset, instanceProps, scrollbarSize) {
  var size = itemType === 'column' ? props.width : props.height;
  var itemMetadata = getItemMetadata(itemType, props, index, instanceProps); // Get estimated total size after ItemMetadata is computed,
  // To ensure it reflects actual measurements instead of just estimates.

  var estimatedTotalSize = itemType === 'column' ? getEstimatedTotalWidth(props, instanceProps) : getEstimatedTotalHeight(props, instanceProps);
  var maxOffset = Math.max(0, Math.min(estimatedTotalSize - size, itemMetadata.offset));
  var minOffset = Math.max(0, itemMetadata.offset - size + scrollbarSize + itemMetadata.size);

  if (align === 'smart') {
    if (scrollOffset >= minOffset - size && scrollOffset <= maxOffset + size) {
      align = 'auto';
    } else {
      align = 'center';
    }
  }

  switch (align) {
    case 'start':
      return maxOffset;

    case 'end':
      return minOffset;

    case 'center':
      return Math.round(minOffset + (maxOffset - minOffset) / 2);

    case 'auto':
    default:
      if (scrollOffset >= minOffset && scrollOffset <= maxOffset) {
        return scrollOffset;
      } else if (minOffset > maxOffset) {
        // Because we only take into account the scrollbar size when calculating minOffset
        // this value can be larger than maxOffset when at the end of the list
        return minOffset;
      } else if (scrollOffset < minOffset) {
        return minOffset;
      } else {
        return maxOffset;
      }

  }
};

var VariableSizeGrid = /*#__PURE__*/createGridComponent({
  getColumnOffset: function getColumnOffset(props, index, instanceProps) {
    return getItemMetadata('column', props, index, instanceProps).offset;
  },
  getColumnStartIndexForOffset: function getColumnStartIndexForOffset(props, scrollLeft, instanceProps) {
    return findNearestItem('column', props, instanceProps, scrollLeft);
  },
  getColumnStopIndexForStartIndex: function getColumnStopIndexForStartIndex(props, startIndex, scrollLeft, instanceProps) {
    var columnCount = props.columnCount,
        width = props.width;
    var itemMetadata = getItemMetadata('column', props, startIndex, instanceProps);
    var maxOffset = scrollLeft + width;
    var offset = itemMetadata.offset + itemMetadata.size;
    var stopIndex = startIndex;

    while (stopIndex < columnCount - 1 && offset < maxOffset) {
      stopIndex++;
      offset += getItemMetadata('column', props, stopIndex, instanceProps).size;
    }

    return stopIndex;
  },
  getColumnWidth: function getColumnWidth(props, index, instanceProps) {
    return instanceProps.columnMetadataMap[index].size;
  },
  getEstimatedTotalHeight: getEstimatedTotalHeight,
  getEstimatedTotalWidth: getEstimatedTotalWidth,
  getOffsetForColumnAndAlignment: function getOffsetForColumnAndAlignment(props, index, align, scrollOffset, instanceProps, scrollbarSize) {
    return getOffsetForIndexAndAlignment('column', props, index, align, scrollOffset, instanceProps, scrollbarSize);
  },
  getOffsetForRowAndAlignment: function getOffsetForRowAndAlignment(props, index, align, scrollOffset, instanceProps, scrollbarSize) {
    return getOffsetForIndexAndAlignment('row', props, index, align, scrollOffset, instanceProps, scrollbarSize);
  },
  getRowOffset: function getRowOffset(props, index, instanceProps) {
    return getItemMetadata('row', props, index, instanceProps).offset;
  },
  getRowHeight: function getRowHeight(props, index, instanceProps) {
    return instanceProps.rowMetadataMap[index].size;
  },
  getRowStartIndexForOffset: function getRowStartIndexForOffset(props, scrollTop, instanceProps) {
    return findNearestItem('row', props, instanceProps, scrollTop);
  },
  getRowStopIndexForStartIndex: function getRowStopIndexForStartIndex(props, startIndex, scrollTop, instanceProps) {
    var rowCount = props.rowCount,
        height = props.height;
    var itemMetadata = getItemMetadata('row', props, startIndex, instanceProps);
    var maxOffset = scrollTop + height;
    var offset = itemMetadata.offset + itemMetadata.size;
    var stopIndex = startIndex;

    while (stopIndex < rowCount - 1 && offset < maxOffset) {
      stopIndex++;
      offset += getItemMetadata('row', props, stopIndex, instanceProps).size;
    }

    return stopIndex;
  },
  initInstanceProps: function initInstanceProps(props, instance) {
    var _ref5 = props,
        estimatedColumnWidth = _ref5.estimatedColumnWidth,
        estimatedRowHeight = _ref5.estimatedRowHeight;
    var instanceProps = {
      columnMetadataMap: {},
      estimatedColumnWidth: estimatedColumnWidth || DEFAULT_ESTIMATED_ITEM_SIZE,
      estimatedRowHeight: estimatedRowHeight || DEFAULT_ESTIMATED_ITEM_SIZE,
      lastMeasuredColumnIndex: -1,
      lastMeasuredRowIndex: -1,
      rowMetadataMap: {}
    };

    instance.resetAfterColumnIndex = function (columnIndex, shouldForceUpdate) {
      if (shouldForceUpdate === void 0) {
        shouldForceUpdate = true;
      }

      instance.resetAfterIndices({
        columnIndex: columnIndex,
        shouldForceUpdate: shouldForceUpdate
      });
    };

    instance.resetAfterRowIndex = function (rowIndex, shouldForceUpdate) {
      if (shouldForceUpdate === void 0) {
        shouldForceUpdate = true;
      }

      instance.resetAfterIndices({
        rowIndex: rowIndex,
        shouldForceUpdate: shouldForceUpdate
      });
    };

    instance.resetAfterIndices = function (_ref6) {
      var columnIndex = _ref6.columnIndex,
          rowIndex = _ref6.rowIndex,
          _ref6$shouldForceUpda = _ref6.shouldForceUpdate,
          shouldForceUpdate = _ref6$shouldForceUpda === void 0 ? true : _ref6$shouldForceUpda;

      if (typeof columnIndex === 'number') {
        instanceProps.lastMeasuredColumnIndex = Math.min(instanceProps.lastMeasuredColumnIndex, columnIndex - 1);
      }

      if (typeof rowIndex === 'number') {
        instanceProps.lastMeasuredRowIndex = Math.min(instanceProps.lastMeasuredRowIndex, rowIndex - 1);
      } // We could potentially optimize further by only evicting styles after this index,
      // But since styles are only cached while scrolling is in progress-
      // It seems an unnecessary optimization.
      // It's unlikely that resetAfterIndex() will be called while a user is scrolling.


      instance._getItemStyleCache(-1);

      if (shouldForceUpdate) {
        instance.forceUpdate();
      }
    };

    return instanceProps;
  },
  shouldResetStyleCacheOnItemSizeChange: false,
  validateProps: function validateProps(_ref7) {
    var columnWidth = _ref7.columnWidth,
        rowHeight = _ref7.rowHeight;

    if (false) {}
  }
});

var IS_SCROLLING_DEBOUNCE_INTERVAL$1 = 150;

var defaultItemKey$1 = function defaultItemKey(index, data) {
  return index;
}; // In DEV mode, this Set helps us only log a warning once per component instance.
// This avoids spamming the console every time a render happens.


var devWarningsDirection = null;
var devWarningsTagName$1 = null;

if (false) {}

function createListComponent(_ref) {
  var _class;

  var getItemOffset = _ref.getItemOffset,
      getEstimatedTotalSize = _ref.getEstimatedTotalSize,
      getItemSize = _ref.getItemSize,
      getOffsetForIndexAndAlignment = _ref.getOffsetForIndexAndAlignment,
      getStartIndexForOffset = _ref.getStartIndexForOffset,
      getStopIndexForStartIndex = _ref.getStopIndexForStartIndex,
      initInstanceProps = _ref.initInstanceProps,
      shouldResetStyleCacheOnItemSizeChange = _ref.shouldResetStyleCacheOnItemSizeChange,
      validateProps = _ref.validateProps;
  return _class = /*#__PURE__*/function (_PureComponent) {
    _inheritsLoose(List, _PureComponent);

    // Always use explicit constructor for React components.
    // It produces less code after transpilation. (#26)
    // eslint-disable-next-line no-useless-constructor
    function List(props) {
      var _this;

      _this = _PureComponent.call(this, props) || this;
      _this._instanceProps = initInstanceProps(_this.props, _assertThisInitialized(_this));
      _this._outerRef = void 0;
      _this._resetIsScrollingTimeoutId = null;
      _this.state = {
        instance: _assertThisInitialized(_this),
        isScrolling: false,
        scrollDirection: 'forward',
        scrollOffset: typeof _this.props.initialScrollOffset === 'number' ? _this.props.initialScrollOffset : 0,
        scrollUpdateWasRequested: false
      };
      _this._callOnItemsRendered = void 0;
      _this._callOnItemsRendered = memoize_one_esm(function (overscanStartIndex, overscanStopIndex, visibleStartIndex, visibleStopIndex) {
        return _this.props.onItemsRendered({
          overscanStartIndex: overscanStartIndex,
          overscanStopIndex: overscanStopIndex,
          visibleStartIndex: visibleStartIndex,
          visibleStopIndex: visibleStopIndex
        });
      });
      _this._callOnScroll = void 0;
      _this._callOnScroll = memoize_one_esm(function (scrollDirection, scrollOffset, scrollUpdateWasRequested) {
        return _this.props.onScroll({
          scrollDirection: scrollDirection,
          scrollOffset: scrollOffset,
          scrollUpdateWasRequested: scrollUpdateWasRequested
        });
      });
      _this._getItemStyle = void 0;

      _this._getItemStyle = function (index) {
        var _this$props = _this.props,
            direction = _this$props.direction,
            itemSize = _this$props.itemSize,
            layout = _this$props.layout;

        var itemStyleCache = _this._getItemStyleCache(shouldResetStyleCacheOnItemSizeChange && itemSize, shouldResetStyleCacheOnItemSizeChange && layout, shouldResetStyleCacheOnItemSizeChange && direction);

        var style;

        if (itemStyleCache.hasOwnProperty(index)) {
          style = itemStyleCache[index];
        } else {
          var _offset = getItemOffset(_this.props, index, _this._instanceProps);

          var size = getItemSize(_this.props, index, _this._instanceProps); // TODO Deprecate direction "horizontal"

          var isHorizontal = direction === 'horizontal' || layout === 'horizontal';
          var isRtl = direction === 'rtl';
          var offsetHorizontal = isHorizontal ? _offset : 0;
          itemStyleCache[index] = style = {
            position: 'absolute',
            left: isRtl ? undefined : offsetHorizontal,
            right: isRtl ? offsetHorizontal : undefined,
            top: !isHorizontal ? _offset : 0,
            height: !isHorizontal ? size : '100%',
            width: isHorizontal ? size : '100%'
          };
        }

        return style;
      };

      _this._getItemStyleCache = void 0;
      _this._getItemStyleCache = memoize_one_esm(function (_, __, ___) {
        return {};
      });

      _this._onScrollHorizontal = function (event) {
        var _event$currentTarget = event.currentTarget,
            clientWidth = _event$currentTarget.clientWidth,
            scrollLeft = _event$currentTarget.scrollLeft,
            scrollWidth = _event$currentTarget.scrollWidth;

        _this.setState(function (prevState) {
          if (prevState.scrollOffset === scrollLeft) {
            // Scroll position may have been updated by cDM/cDU,
            // In which case we don't need to trigger another render,
            // And we don't want to update state.isScrolling.
            return null;
          }

          var direction = _this.props.direction;
          var scrollOffset = scrollLeft;

          if (direction === 'rtl') {
            // TRICKY According to the spec, scrollLeft should be negative for RTL aligned elements.
            // This is not the case for all browsers though (e.g. Chrome reports values as positive, measured relative to the left).
            // It's also easier for this component if we convert offsets to the same format as they would be in for ltr.
            // So the simplest solution is to determine which browser behavior we're dealing with, and convert based on it.
            switch (getRTLOffsetType()) {
              case 'negative':
                scrollOffset = -scrollLeft;
                break;

              case 'positive-descending':
                scrollOffset = scrollWidth - clientWidth - scrollLeft;
                break;
            }
          } // Prevent Safari's elastic scrolling from causing visual shaking when scrolling past bounds.


          scrollOffset = Math.max(0, Math.min(scrollOffset, scrollWidth - clientWidth));
          return {
            isScrolling: true,
            scrollDirection: prevState.scrollOffset < scrollOffset ? 'forward' : 'backward',
            scrollOffset: scrollOffset,
            scrollUpdateWasRequested: false
          };
        }, _this._resetIsScrollingDebounced);
      };

      _this._onScrollVertical = function (event) {
        var _event$currentTarget2 = event.currentTarget,
            clientHeight = _event$currentTarget2.clientHeight,
            scrollHeight = _event$currentTarget2.scrollHeight,
            scrollTop = _event$currentTarget2.scrollTop;

        _this.setState(function (prevState) {
          if (prevState.scrollOffset === scrollTop) {
            // Scroll position may have been updated by cDM/cDU,
            // In which case we don't need to trigger another render,
            // And we don't want to update state.isScrolling.
            return null;
          } // Prevent Safari's elastic scrolling from causing visual shaking when scrolling past bounds.


          var scrollOffset = Math.max(0, Math.min(scrollTop, scrollHeight - clientHeight));
          return {
            isScrolling: true,
            scrollDirection: prevState.scrollOffset < scrollOffset ? 'forward' : 'backward',
            scrollOffset: scrollOffset,
            scrollUpdateWasRequested: false
          };
        }, _this._resetIsScrollingDebounced);
      };

      _this._outerRefSetter = function (ref) {
        var outerRef = _this.props.outerRef;
        _this._outerRef = ref;

        if (typeof outerRef === 'function') {
          outerRef(ref);
        } else if (outerRef != null && typeof outerRef === 'object' && outerRef.hasOwnProperty('current')) {
          outerRef.current = ref;
        }
      };

      _this._resetIsScrollingDebounced = function () {
        if (_this._resetIsScrollingTimeoutId !== null) {
          cancelTimeout(_this._resetIsScrollingTimeoutId);
        }

        _this._resetIsScrollingTimeoutId = requestTimeout(_this._resetIsScrolling, IS_SCROLLING_DEBOUNCE_INTERVAL$1);
      };

      _this._resetIsScrolling = function () {
        _this._resetIsScrollingTimeoutId = null;

        _this.setState({
          isScrolling: false
        }, function () {
          // Clear style cache after state update has been committed.
          // This way we don't break pure sCU for items that don't use isScrolling param.
          _this._getItemStyleCache(-1, null);
        });
      };

      return _this;
    }

    List.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
      validateSharedProps$1(nextProps, prevState);
      validateProps(nextProps);
      return null;
    };

    var _proto = List.prototype;

    _proto.scrollTo = function scrollTo(scrollOffset) {
      scrollOffset = Math.max(0, scrollOffset);
      this.setState(function (prevState) {
        if (prevState.scrollOffset === scrollOffset) {
          return null;
        }

        return {
          scrollDirection: prevState.scrollOffset < scrollOffset ? 'forward' : 'backward',
          scrollOffset: scrollOffset,
          scrollUpdateWasRequested: true
        };
      }, this._resetIsScrollingDebounced);
    };

    _proto.scrollToItem = function scrollToItem(index, align) {
      if (align === void 0) {
        align = 'auto';
      }

      var _this$props2 = this.props,
          itemCount = _this$props2.itemCount,
          layout = _this$props2.layout;
      var scrollOffset = this.state.scrollOffset;
      index = Math.max(0, Math.min(index, itemCount - 1)); // The scrollbar size should be considered when scrolling an item into view, to ensure it's fully visible.
      // But we only need to account for its size when it's actually visible.
      // This is an edge case for lists; normally they only scroll in the dominant direction.

      var scrollbarSize = 0;

      if (this._outerRef) {
        var outerRef = this._outerRef;

        if (layout === 'vertical') {
          scrollbarSize = outerRef.scrollWidth > outerRef.clientWidth ? getScrollbarSize() : 0;
        } else {
          scrollbarSize = outerRef.scrollHeight > outerRef.clientHeight ? getScrollbarSize() : 0;
        }
      }

      this.scrollTo(getOffsetForIndexAndAlignment(this.props, index, align, scrollOffset, this._instanceProps, scrollbarSize));
    };

    _proto.componentDidMount = function componentDidMount() {
      var _this$props3 = this.props,
          direction = _this$props3.direction,
          initialScrollOffset = _this$props3.initialScrollOffset,
          layout = _this$props3.layout;

      if (typeof initialScrollOffset === 'number' && this._outerRef != null) {
        var outerRef = this._outerRef; // TODO Deprecate direction "horizontal"

        if (direction === 'horizontal' || layout === 'horizontal') {
          outerRef.scrollLeft = initialScrollOffset;
        } else {
          outerRef.scrollTop = initialScrollOffset;
        }
      }

      this._callPropsCallbacks();
    };

    _proto.componentDidUpdate = function componentDidUpdate() {
      var _this$props4 = this.props,
          direction = _this$props4.direction,
          layout = _this$props4.layout;
      var _this$state = this.state,
          scrollOffset = _this$state.scrollOffset,
          scrollUpdateWasRequested = _this$state.scrollUpdateWasRequested;

      if (scrollUpdateWasRequested && this._outerRef != null) {
        var outerRef = this._outerRef; // TODO Deprecate direction "horizontal"

        if (direction === 'horizontal' || layout === 'horizontal') {
          if (direction === 'rtl') {
            // TRICKY According to the spec, scrollLeft should be negative for RTL aligned elements.
            // This is not the case for all browsers though (e.g. Chrome reports values as positive, measured relative to the left).
            // So we need to determine which browser behavior we're dealing with, and mimic it.
            switch (getRTLOffsetType()) {
              case 'negative':
                outerRef.scrollLeft = -scrollOffset;
                break;

              case 'positive-ascending':
                outerRef.scrollLeft = scrollOffset;
                break;

              default:
                var clientWidth = outerRef.clientWidth,
                    scrollWidth = outerRef.scrollWidth;
                outerRef.scrollLeft = scrollWidth - clientWidth - scrollOffset;
                break;
            }
          } else {
            outerRef.scrollLeft = scrollOffset;
          }
        } else {
          outerRef.scrollTop = scrollOffset;
        }
      }

      this._callPropsCallbacks();
    };

    _proto.componentWillUnmount = function componentWillUnmount() {
      if (this._resetIsScrollingTimeoutId !== null) {
        cancelTimeout(this._resetIsScrollingTimeoutId);
      }
    };

    _proto.render = function render() {
      var _this$props5 = this.props,
          children = _this$props5.children,
          className = _this$props5.className,
          direction = _this$props5.direction,
          height = _this$props5.height,
          innerRef = _this$props5.innerRef,
          innerElementType = _this$props5.innerElementType,
          innerTagName = _this$props5.innerTagName,
          itemCount = _this$props5.itemCount,
          itemData = _this$props5.itemData,
          _this$props5$itemKey = _this$props5.itemKey,
          itemKey = _this$props5$itemKey === void 0 ? defaultItemKey$1 : _this$props5$itemKey,
          layout = _this$props5.layout,
          outerElementType = _this$props5.outerElementType,
          outerTagName = _this$props5.outerTagName,
          style = _this$props5.style,
          useIsScrolling = _this$props5.useIsScrolling,
          width = _this$props5.width;
      var isScrolling = this.state.isScrolling; // TODO Deprecate direction "horizontal"

      var isHorizontal = direction === 'horizontal' || layout === 'horizontal';
      var onScroll = isHorizontal ? this._onScrollHorizontal : this._onScrollVertical;

      var _this$_getRangeToRend = this._getRangeToRender(),
          startIndex = _this$_getRangeToRend[0],
          stopIndex = _this$_getRangeToRend[1];

      var items = [];

      if (itemCount > 0) {
        for (var _index = startIndex; _index <= stopIndex; _index++) {
          items.push((0,react.createElement)(children, {
            data: itemData,
            key: itemKey(_index, itemData),
            index: _index,
            isScrolling: useIsScrolling ? isScrolling : undefined,
            style: this._getItemStyle(_index)
          }));
        }
      } // Read this value AFTER items have been created,
      // So their actual sizes (if variable) are taken into consideration.


      var estimatedTotalSize = getEstimatedTotalSize(this.props, this._instanceProps);
      return (0,react.createElement)(outerElementType || outerTagName || 'div', {
        className: className,
        onScroll: onScroll,
        ref: this._outerRefSetter,
        style: _extends({
          position: 'relative',
          height: height,
          width: width,
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          willChange: 'transform',
          direction: direction
        }, style)
      }, (0,react.createElement)(innerElementType || innerTagName || 'div', {
        children: items,
        ref: innerRef,
        style: {
          height: isHorizontal ? '100%' : estimatedTotalSize,
          pointerEvents: isScrolling ? 'none' : undefined,
          width: isHorizontal ? estimatedTotalSize : '100%'
        }
      }));
    };

    _proto._callPropsCallbacks = function _callPropsCallbacks() {
      if (typeof this.props.onItemsRendered === 'function') {
        var itemCount = this.props.itemCount;

        if (itemCount > 0) {
          var _this$_getRangeToRend2 = this._getRangeToRender(),
              _overscanStartIndex = _this$_getRangeToRend2[0],
              _overscanStopIndex = _this$_getRangeToRend2[1],
              _visibleStartIndex = _this$_getRangeToRend2[2],
              _visibleStopIndex = _this$_getRangeToRend2[3];

          this._callOnItemsRendered(_overscanStartIndex, _overscanStopIndex, _visibleStartIndex, _visibleStopIndex);
        }
      }

      if (typeof this.props.onScroll === 'function') {
        var _this$state2 = this.state,
            _scrollDirection = _this$state2.scrollDirection,
            _scrollOffset = _this$state2.scrollOffset,
            _scrollUpdateWasRequested = _this$state2.scrollUpdateWasRequested;

        this._callOnScroll(_scrollDirection, _scrollOffset, _scrollUpdateWasRequested);
      }
    } // Lazily create and cache item styles while scrolling,
    // So that pure component sCU will prevent re-renders.
    // We maintain this cache, and pass a style prop rather than index,
    // So that List can clear cached styles and force item re-render if necessary.
    ;

    _proto._getRangeToRender = function _getRangeToRender() {
      var _this$props6 = this.props,
          itemCount = _this$props6.itemCount,
          overscanCount = _this$props6.overscanCount;
      var _this$state3 = this.state,
          isScrolling = _this$state3.isScrolling,
          scrollDirection = _this$state3.scrollDirection,
          scrollOffset = _this$state3.scrollOffset;

      if (itemCount === 0) {
        return [0, 0, 0, 0];
      }

      var startIndex = getStartIndexForOffset(this.props, scrollOffset, this._instanceProps);
      var stopIndex = getStopIndexForStartIndex(this.props, startIndex, scrollOffset, this._instanceProps); // Overscan by one item in each direction so that tab/focus works.
      // If there isn't at least one extra item, tab loops back around.

      var overscanBackward = !isScrolling || scrollDirection === 'backward' ? Math.max(1, overscanCount) : 1;
      var overscanForward = !isScrolling || scrollDirection === 'forward' ? Math.max(1, overscanCount) : 1;
      return [Math.max(0, startIndex - overscanBackward), Math.max(0, Math.min(itemCount - 1, stopIndex + overscanForward)), startIndex, stopIndex];
    };

    return List;
  }(react.PureComponent), _class.defaultProps = {
    direction: 'ltr',
    itemData: undefined,
    layout: 'vertical',
    overscanCount: 2,
    useIsScrolling: false
  }, _class;
} // NOTE: I considered further wrapping individual items with a pure ListItem component.
// This would avoid ever calling the render function for the same index more than once,
// But it would also add the overhead of a lot of components/fibers.
// I assume people already do this (render function returning a class component),
// So my doing it would just unnecessarily double the wrappers.

var validateSharedProps$1 = function validateSharedProps(_ref2, _ref3) {
  var children = _ref2.children,
      direction = _ref2.direction,
      height = _ref2.height,
      layout = _ref2.layout,
      innerTagName = _ref2.innerTagName,
      outerTagName = _ref2.outerTagName,
      width = _ref2.width;
  var instance = _ref3.instance;

  if (false) { var isHorizontal; }
};

var DEFAULT_ESTIMATED_ITEM_SIZE$1 = 50;

var getItemMetadata$1 = function getItemMetadata(props, index, instanceProps) {
  var _ref = props,
      itemSize = _ref.itemSize;
  var itemMetadataMap = instanceProps.itemMetadataMap,
      lastMeasuredIndex = instanceProps.lastMeasuredIndex;

  if (index > lastMeasuredIndex) {
    var offset = 0;

    if (lastMeasuredIndex >= 0) {
      var itemMetadata = itemMetadataMap[lastMeasuredIndex];
      offset = itemMetadata.offset + itemMetadata.size;
    }

    for (var i = lastMeasuredIndex + 1; i <= index; i++) {
      var size = itemSize(i);
      itemMetadataMap[i] = {
        offset: offset,
        size: size
      };
      offset += size;
    }

    instanceProps.lastMeasuredIndex = index;
  }

  return itemMetadataMap[index];
};

var findNearestItem$1 = function findNearestItem(props, instanceProps, offset) {
  var itemMetadataMap = instanceProps.itemMetadataMap,
      lastMeasuredIndex = instanceProps.lastMeasuredIndex;
  var lastMeasuredItemOffset = lastMeasuredIndex > 0 ? itemMetadataMap[lastMeasuredIndex].offset : 0;

  if (lastMeasuredItemOffset >= offset) {
    // If we've already measured items within this range just use a binary search as it's faster.
    return findNearestItemBinarySearch$1(props, instanceProps, lastMeasuredIndex, 0, offset);
  } else {
    // If we haven't yet measured this high, fallback to an exponential search with an inner binary search.
    // The exponential search avoids pre-computing sizes for the full set of items as a binary search would.
    // The overall complexity for this approach is O(log n).
    return findNearestItemExponentialSearch$1(props, instanceProps, Math.max(0, lastMeasuredIndex), offset);
  }
};

var findNearestItemBinarySearch$1 = function findNearestItemBinarySearch(props, instanceProps, high, low, offset) {
  while (low <= high) {
    var middle = low + Math.floor((high - low) / 2);
    var currentOffset = getItemMetadata$1(props, middle, instanceProps).offset;

    if (currentOffset === offset) {
      return middle;
    } else if (currentOffset < offset) {
      low = middle + 1;
    } else if (currentOffset > offset) {
      high = middle - 1;
    }
  }

  if (low > 0) {
    return low - 1;
  } else {
    return 0;
  }
};

var findNearestItemExponentialSearch$1 = function findNearestItemExponentialSearch(props, instanceProps, index, offset) {
  var itemCount = props.itemCount;
  var interval = 1;

  while (index < itemCount && getItemMetadata$1(props, index, instanceProps).offset < offset) {
    index += interval;
    interval *= 2;
  }

  return findNearestItemBinarySearch$1(props, instanceProps, Math.min(index, itemCount - 1), Math.floor(index / 2), offset);
};

var getEstimatedTotalSize = function getEstimatedTotalSize(_ref2, _ref3) {
  var itemCount = _ref2.itemCount;
  var itemMetadataMap = _ref3.itemMetadataMap,
      estimatedItemSize = _ref3.estimatedItemSize,
      lastMeasuredIndex = _ref3.lastMeasuredIndex;
  var totalSizeOfMeasuredItems = 0; // Edge case check for when the number of items decreases while a scroll is in progress.
  // https://github.com/bvaughn/react-window/pull/138

  if (lastMeasuredIndex >= itemCount) {
    lastMeasuredIndex = itemCount - 1;
  }

  if (lastMeasuredIndex >= 0) {
    var itemMetadata = itemMetadataMap[lastMeasuredIndex];
    totalSizeOfMeasuredItems = itemMetadata.offset + itemMetadata.size;
  }

  var numUnmeasuredItems = itemCount - lastMeasuredIndex - 1;
  var totalSizeOfUnmeasuredItems = numUnmeasuredItems * estimatedItemSize;
  return totalSizeOfMeasuredItems + totalSizeOfUnmeasuredItems;
};

var VariableSizeList = /*#__PURE__*/createListComponent({
  getItemOffset: function getItemOffset(props, index, instanceProps) {
    return getItemMetadata$1(props, index, instanceProps).offset;
  },
  getItemSize: function getItemSize(props, index, instanceProps) {
    return instanceProps.itemMetadataMap[index].size;
  },
  getEstimatedTotalSize: getEstimatedTotalSize,
  getOffsetForIndexAndAlignment: function getOffsetForIndexAndAlignment(props, index, align, scrollOffset, instanceProps, scrollbarSize) {
    var direction = props.direction,
        height = props.height,
        layout = props.layout,
        width = props.width; // TODO Deprecate direction "horizontal"

    var isHorizontal = direction === 'horizontal' || layout === 'horizontal';
    var size = isHorizontal ? width : height;
    var itemMetadata = getItemMetadata$1(props, index, instanceProps); // Get estimated total size after ItemMetadata is computed,
    // To ensure it reflects actual measurements instead of just estimates.

    var estimatedTotalSize = getEstimatedTotalSize(props, instanceProps);
    var maxOffset = Math.max(0, Math.min(estimatedTotalSize - size, itemMetadata.offset));
    var minOffset = Math.max(0, itemMetadata.offset - size + itemMetadata.size + scrollbarSize);

    if (align === 'smart') {
      if (scrollOffset >= minOffset - size && scrollOffset <= maxOffset + size) {
        align = 'auto';
      } else {
        align = 'center';
      }
    }

    switch (align) {
      case 'start':
        return maxOffset;

      case 'end':
        return minOffset;

      case 'center':
        return Math.round(minOffset + (maxOffset - minOffset) / 2);

      case 'auto':
      default:
        if (scrollOffset >= minOffset && scrollOffset <= maxOffset) {
          return scrollOffset;
        } else if (scrollOffset < minOffset) {
          return minOffset;
        } else {
          return maxOffset;
        }

    }
  },
  getStartIndexForOffset: function getStartIndexForOffset(props, offset, instanceProps) {
    return findNearestItem$1(props, instanceProps, offset);
  },
  getStopIndexForStartIndex: function getStopIndexForStartIndex(props, startIndex, scrollOffset, instanceProps) {
    var direction = props.direction,
        height = props.height,
        itemCount = props.itemCount,
        layout = props.layout,
        width = props.width; // TODO Deprecate direction "horizontal"

    var isHorizontal = direction === 'horizontal' || layout === 'horizontal';
    var size = isHorizontal ? width : height;
    var itemMetadata = getItemMetadata$1(props, startIndex, instanceProps);
    var maxOffset = scrollOffset + size;
    var offset = itemMetadata.offset + itemMetadata.size;
    var stopIndex = startIndex;

    while (stopIndex < itemCount - 1 && offset < maxOffset) {
      stopIndex++;
      offset += getItemMetadata$1(props, stopIndex, instanceProps).size;
    }

    return stopIndex;
  },
  initInstanceProps: function initInstanceProps(props, instance) {
    var _ref4 = props,
        estimatedItemSize = _ref4.estimatedItemSize;
    var instanceProps = {
      itemMetadataMap: {},
      estimatedItemSize: estimatedItemSize || DEFAULT_ESTIMATED_ITEM_SIZE$1,
      lastMeasuredIndex: -1
    };

    instance.resetAfterIndex = function (index, shouldForceUpdate) {
      if (shouldForceUpdate === void 0) {
        shouldForceUpdate = true;
      }

      instanceProps.lastMeasuredIndex = Math.min(instanceProps.lastMeasuredIndex, index - 1); // We could potentially optimize further by only evicting styles after this index,
      // But since styles are only cached while scrolling is in progress-
      // It seems an unnecessary optimization.
      // It's unlikely that resetAfterIndex() will be called while a user is scrolling.

      instance._getItemStyleCache(-1);

      if (shouldForceUpdate) {
        instance.forceUpdate();
      }
    };

    return instanceProps;
  },
  shouldResetStyleCacheOnItemSizeChange: false,
  validateProps: function validateProps(_ref5) {
    var itemSize = _ref5.itemSize;

    if (false) {}
  }
});

var FixedSizeGrid = /*#__PURE__*/createGridComponent({
  getColumnOffset: function getColumnOffset(_ref, index) {
    var columnWidth = _ref.columnWidth;
    return index * columnWidth;
  },
  getColumnWidth: function getColumnWidth(_ref2, index) {
    var columnWidth = _ref2.columnWidth;
    return columnWidth;
  },
  getRowOffset: function getRowOffset(_ref3, index) {
    var rowHeight = _ref3.rowHeight;
    return index * rowHeight;
  },
  getRowHeight: function getRowHeight(_ref4, index) {
    var rowHeight = _ref4.rowHeight;
    return rowHeight;
  },
  getEstimatedTotalHeight: function getEstimatedTotalHeight(_ref5) {
    var rowCount = _ref5.rowCount,
        rowHeight = _ref5.rowHeight;
    return rowHeight * rowCount;
  },
  getEstimatedTotalWidth: function getEstimatedTotalWidth(_ref6) {
    var columnCount = _ref6.columnCount,
        columnWidth = _ref6.columnWidth;
    return columnWidth * columnCount;
  },
  getOffsetForColumnAndAlignment: function getOffsetForColumnAndAlignment(_ref7, columnIndex, align, scrollLeft, instanceProps, scrollbarSize) {
    var columnCount = _ref7.columnCount,
        columnWidth = _ref7.columnWidth,
        width = _ref7.width;
    var lastColumnOffset = Math.max(0, columnCount * columnWidth - width);
    var maxOffset = Math.min(lastColumnOffset, columnIndex * columnWidth);
    var minOffset = Math.max(0, columnIndex * columnWidth - width + scrollbarSize + columnWidth);

    if (align === 'smart') {
      if (scrollLeft >= minOffset - width && scrollLeft <= maxOffset + width) {
        align = 'auto';
      } else {
        align = 'center';
      }
    }

    switch (align) {
      case 'start':
        return maxOffset;

      case 'end':
        return minOffset;

      case 'center':
        // "Centered" offset is usually the average of the min and max.
        // But near the edges of the list, this doesn't hold true.
        var middleOffset = Math.round(minOffset + (maxOffset - minOffset) / 2);

        if (middleOffset < Math.ceil(width / 2)) {
          return 0; // near the beginning
        } else if (middleOffset > lastColumnOffset + Math.floor(width / 2)) {
          return lastColumnOffset; // near the end
        } else {
          return middleOffset;
        }

      case 'auto':
      default:
        if (scrollLeft >= minOffset && scrollLeft <= maxOffset) {
          return scrollLeft;
        } else if (minOffset > maxOffset) {
          // Because we only take into account the scrollbar size when calculating minOffset
          // this value can be larger than maxOffset when at the end of the list
          return minOffset;
        } else if (scrollLeft < minOffset) {
          return minOffset;
        } else {
          return maxOffset;
        }

    }
  },
  getOffsetForRowAndAlignment: function getOffsetForRowAndAlignment(_ref8, rowIndex, align, scrollTop, instanceProps, scrollbarSize) {
    var rowHeight = _ref8.rowHeight,
        height = _ref8.height,
        rowCount = _ref8.rowCount;
    var lastRowOffset = Math.max(0, rowCount * rowHeight - height);
    var maxOffset = Math.min(lastRowOffset, rowIndex * rowHeight);
    var minOffset = Math.max(0, rowIndex * rowHeight - height + scrollbarSize + rowHeight);

    if (align === 'smart') {
      if (scrollTop >= minOffset - height && scrollTop <= maxOffset + height) {
        align = 'auto';
      } else {
        align = 'center';
      }
    }

    switch (align) {
      case 'start':
        return maxOffset;

      case 'end':
        return minOffset;

      case 'center':
        // "Centered" offset is usually the average of the min and max.
        // But near the edges of the list, this doesn't hold true.
        var middleOffset = Math.round(minOffset + (maxOffset - minOffset) / 2);

        if (middleOffset < Math.ceil(height / 2)) {
          return 0; // near the beginning
        } else if (middleOffset > lastRowOffset + Math.floor(height / 2)) {
          return lastRowOffset; // near the end
        } else {
          return middleOffset;
        }

      case 'auto':
      default:
        if (scrollTop >= minOffset && scrollTop <= maxOffset) {
          return scrollTop;
        } else if (minOffset > maxOffset) {
          // Because we only take into account the scrollbar size when calculating minOffset
          // this value can be larger than maxOffset when at the end of the list
          return minOffset;
        } else if (scrollTop < minOffset) {
          return minOffset;
        } else {
          return maxOffset;
        }

    }
  },
  getColumnStartIndexForOffset: function getColumnStartIndexForOffset(_ref9, scrollLeft) {
    var columnWidth = _ref9.columnWidth,
        columnCount = _ref9.columnCount;
    return Math.max(0, Math.min(columnCount - 1, Math.floor(scrollLeft / columnWidth)));
  },
  getColumnStopIndexForStartIndex: function getColumnStopIndexForStartIndex(_ref10, startIndex, scrollLeft) {
    var columnWidth = _ref10.columnWidth,
        columnCount = _ref10.columnCount,
        width = _ref10.width;
    var left = startIndex * columnWidth;
    var numVisibleColumns = Math.ceil((width + scrollLeft - left) / columnWidth);
    return Math.max(0, Math.min(columnCount - 1, startIndex + numVisibleColumns - 1 // -1 is because stop index is inclusive
    ));
  },
  getRowStartIndexForOffset: function getRowStartIndexForOffset(_ref11, scrollTop) {
    var rowHeight = _ref11.rowHeight,
        rowCount = _ref11.rowCount;
    return Math.max(0, Math.min(rowCount - 1, Math.floor(scrollTop / rowHeight)));
  },
  getRowStopIndexForStartIndex: function getRowStopIndexForStartIndex(_ref12, startIndex, scrollTop) {
    var rowHeight = _ref12.rowHeight,
        rowCount = _ref12.rowCount,
        height = _ref12.height;
    var top = startIndex * rowHeight;
    var numVisibleRows = Math.ceil((height + scrollTop - top) / rowHeight);
    return Math.max(0, Math.min(rowCount - 1, startIndex + numVisibleRows - 1 // -1 is because stop index is inclusive
    ));
  },
  initInstanceProps: function initInstanceProps(props) {// Noop
  },
  shouldResetStyleCacheOnItemSizeChange: true,
  validateProps: function validateProps(_ref13) {
    var columnWidth = _ref13.columnWidth,
        rowHeight = _ref13.rowHeight;

    if (false) {}
  }
});

var FixedSizeList = /*#__PURE__*/createListComponent({
  getItemOffset: function getItemOffset(_ref, index) {
    var itemSize = _ref.itemSize;
    return index * itemSize;
  },
  getItemSize: function getItemSize(_ref2, index) {
    var itemSize = _ref2.itemSize;
    return itemSize;
  },
  getEstimatedTotalSize: function getEstimatedTotalSize(_ref3) {
    var itemCount = _ref3.itemCount,
        itemSize = _ref3.itemSize;
    return itemSize * itemCount;
  },
  getOffsetForIndexAndAlignment: function getOffsetForIndexAndAlignment(_ref4, index, align, scrollOffset, instanceProps, scrollbarSize) {
    var direction = _ref4.direction,
        height = _ref4.height,
        itemCount = _ref4.itemCount,
        itemSize = _ref4.itemSize,
        layout = _ref4.layout,
        width = _ref4.width;
    // TODO Deprecate direction "horizontal"
    var isHorizontal = direction === 'horizontal' || layout === 'horizontal';
    var size = isHorizontal ? width : height;
    var lastItemOffset = Math.max(0, itemCount * itemSize - size);
    var maxOffset = Math.min(lastItemOffset, index * itemSize);
    var minOffset = Math.max(0, index * itemSize - size + itemSize + scrollbarSize);

    if (align === 'smart') {
      if (scrollOffset >= minOffset - size && scrollOffset <= maxOffset + size) {
        align = 'auto';
      } else {
        align = 'center';
      }
    }

    switch (align) {
      case 'start':
        return maxOffset;

      case 'end':
        return minOffset;

      case 'center':
        {
          // "Centered" offset is usually the average of the min and max.
          // But near the edges of the list, this doesn't hold true.
          var middleOffset = Math.round(minOffset + (maxOffset - minOffset) / 2);

          if (middleOffset < Math.ceil(size / 2)) {
            return 0; // near the beginning
          } else if (middleOffset > lastItemOffset + Math.floor(size / 2)) {
            return lastItemOffset; // near the end
          } else {
            return middleOffset;
          }
        }

      case 'auto':
      default:
        if (scrollOffset >= minOffset && scrollOffset <= maxOffset) {
          return scrollOffset;
        } else if (scrollOffset < minOffset) {
          return minOffset;
        } else {
          return maxOffset;
        }

    }
  },
  getStartIndexForOffset: function getStartIndexForOffset(_ref5, offset) {
    var itemCount = _ref5.itemCount,
        itemSize = _ref5.itemSize;
    return Math.max(0, Math.min(itemCount - 1, Math.floor(offset / itemSize)));
  },
  getStopIndexForStartIndex: function getStopIndexForStartIndex(_ref6, startIndex, scrollOffset) {
    var direction = _ref6.direction,
        height = _ref6.height,
        itemCount = _ref6.itemCount,
        itemSize = _ref6.itemSize,
        layout = _ref6.layout,
        width = _ref6.width;
    // TODO Deprecate direction "horizontal"
    var isHorizontal = direction === 'horizontal' || layout === 'horizontal';
    var offset = startIndex * itemSize;
    var size = isHorizontal ? width : height;
    var numVisibleItems = Math.ceil((size + scrollOffset - offset) / itemSize);
    return Math.max(0, Math.min(itemCount - 1, startIndex + numVisibleItems - 1 // -1 is because stop index is inclusive
    ));
  },
  initInstanceProps: function initInstanceProps(props) {// Noop
  },
  shouldResetStyleCacheOnItemSizeChange: true,
  validateProps: function validateProps(_ref7) {
    var itemSize = _ref7.itemSize;

    if (false) {}
  }
});

// Pulled from react-compat
// https://github.com/developit/preact-compat/blob/7c5de00e7c85e2ffd011bf3af02899b63f699d3a/src/index.js#L349
function shallowDiffers(prev, next) {
  for (var attribute in prev) {
    if (!(attribute in next)) {
      return true;
    }
  }

  for (var _attribute in next) {
    if (prev[_attribute] !== next[_attribute]) {
      return true;
    }
  }

  return false;
}

var _excluded = ["style"],
    _excluded2 = ["style"];
// It knows to compare individual style props and ignore the wrapper object.
// See https://reactjs.org/docs/react-api.html#reactmemo

function areEqual(prevProps, nextProps) {
  var prevStyle = prevProps.style,
      prevRest = _objectWithoutPropertiesLoose(prevProps, _excluded);

  var nextStyle = nextProps.style,
      nextRest = _objectWithoutPropertiesLoose(nextProps, _excluded2);

  return !shallowDiffers(prevStyle, nextStyle) && !shallowDiffers(prevRest, nextRest);
}

// It knows to compare individual style props and ignore the wrapper object.
// See https://reactjs.org/docs/react-component.html#shouldcomponentupdate

function shouldComponentUpdate(nextProps, nextState) {
  return !areEqual(this.props, nextProps) || shallowDiffers(this.state, nextState);
}


//# sourceMappingURL=index.esm.js.map


/***/ }),

/***/ 65153:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=6)}([function(e,t){e.exports=__webpack_require__(96540)},function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"c",(function(){return u})),n.d(t,"d",(function(){return c})),n.d(t,"b",(function(){return s}));var r=n(0),o=function(e,t){for(var n=0,r=t.length,o=e.length;n<r;n++,o++)e[o]=t[n];return e};function i(e){return void 0!==((e=e||[])[0]||{}).options?e.reduce((function(e,t){return e+t.options.length}),0):e.length}function u(e){return e.reduce((function(e,t){if(null!=t.props.children&&"string"==typeof t.props.children)return o(o([],e),[t]);var n=t.props.children,i=void 0===n?[]:n;return o(o(o([],e),[r.cloneElement(t,{type:"group"},[])]),i)}),[])}function a(e){return!0===e.props.isFocused}function c(e){return Math.max(e.findIndex(a),0)}function s(e){var t=e.groupHeadingStyles,n=e.noOptionsMsgStyles,r=e.optionStyles,o=e.loadingMsgStyles;return function(e){var i=e.props,u=i.type,a=i.children,c=i.inputValue,s=i.selectProps,f=s.noOptionsMessage,l=s.loadingMessage;if("group"===u){var p=t.height;return void 0===p?25:p}if("option"===u){var d=r.height;return void 0===d?35:d}if("function"==typeof f&&a===f({inputValue:c})){var g=n.height;return void 0===g?35:g}if("function"==typeof l&&a===l({inputValue:c})){var y=o.height;return void 0===y?35:y}return 35}}},function(e,t,n){"use strict";var r=n(1),o=n(0),i=n(5),u=function(){return(u=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},a=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n};function c(e){var t=e.data,n=e.index,r=e.setMeasuredHeight,i=o.useRef(null);return o.useLayoutEffect((function(){if(i.current){var e=i.current.getBoundingClientRect().height;r({index:n,measuredHeight:e})}}),[i.current]),o.createElement("div",{key:"option-"+n,ref:i},t)}t.a=function(e){var t=o.useMemo((function(){var t=o.Children.toArray(e.children),n=t[0]||{};if(o.isValidElement(n)){var i=n.props,u=(void 0===i?{}:i).data,a=(void 0===u?{}:u).options,c=(void 0===a?[]:a).length>0,s=c&&Object(r.c)(t);return c?s:t}return[]}),[e.children]),n=e.getStyles,s=n("groupHeading",e),f=n("loadingMessage",e),l=n("noOptionsMessage",e),p=n("option",e),d=Object(r.b)({groupHeadingStyles:s,noOptionsMsgStyles:l,optionStyles:p,loadingMsgStyles:f}),g=o.useMemo((function(){return t.map(d)}),[t]),y=o.useMemo((function(){return Object(r.d)(t)}),[t]),v=t.length,h=o.useState({}),m=h[0],O=h[1],b=n("menuList",e),x=b.maxHeight,M=b.paddingBottom,j=void 0===M?0:M,S=b.paddingTop,w=void 0===S?0:S,P=a(b,["maxHeight","paddingBottom","paddingTop"]),E=o.useMemo((function(){return g.reduce((function(e,t,n){return m[n]?e+m[n]:e+t}),0)}),[g,m]),_=E+j+w,H=Math.min(x,_),T=Math.floor(E/v),R=e.innerRef,I=e.selectProps||{},L=I.classNamePrefix,V=I.isMulti,q=o.useRef(null);o.useEffect((function(){O({})}),[e.children]);var z=function(e){var t=e.index,n=e.measuredHeight;void 0!==m[t]&&m[t]===n||(O((function(e){var r;return u(u({},e),((r={})[t]=n,r))})),q.current&&q.current.resetAfterIndex(t))};return o.useEffect((function(){y>=0&&null!==q.current&&q.current.scrollToItem(y)}),[y,t,q]),o.createElement(i.VariableSizeList,{className:L?L+"__menu-list"+(V?" "+L+"__menu-list--is-multi":""):"",style:P,ref:q,outerRef:R,estimatedItemSize:T,innerElementType:o.forwardRef((function(e,t){var n=e.style,r=a(e,["style"]);return o.createElement("div",u({ref:t,style:u(u({},n),{height:parseFloat(n.height)+j+w+"px"})},r))})),height:H,width:"100%",itemCount:v,itemData:t,itemSize:function(e){return m[e]||g[e]}},(function(e){var t=e.data,n=e.index,r=e.style;return o.createElement("div",{style:u(u({},r),{top:parseFloat(r.top.toString())+w+"px"})},o.createElement(c,{data:t[n],index:n,setMeasuredHeight:z}))}))}},function(e,t){e.exports=__webpack_require__(46005)},function(e,t,n){"use strict";var r=n(2),o=n(0),i=n(3),u=n.n(i),a=n(1),c=function(){return(c=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},s=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]])}return n};t.a=o.forwardRef((function(e,t){var n=e.windowThreshold,i=void 0===n?100:n,f=s(e,["windowThreshold"]),l=o.useMemo((function(){return Object(a.a)(f.options)}),[f.options])>=i;return o.createElement(u.a,c({},f,{components:c(c({},f.components),l?{MenuList:r.a}:{}),ref:t}))}))},function(e,t){e.exports=__webpack_require__(68178)},function(e,t,n){"use strict";n.r(t);var r=n(4),o=n(3);for(var i in o)["default","WindowedMenuList"].indexOf(i)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(i);var u=n(2);n.d(t,"WindowedMenuList",(function(){return u.a})),t.default=r.a}]);

/***/ }),

/***/ 21020:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f=__webpack_require__(96540),k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};
function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a)void 0===d[b]&&(d[b]=a[b]);return{$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}__webpack_unused_export__=l;exports.jsx=q;__webpack_unused_export__=q;


/***/ }),

/***/ 15287:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l=Symbol.for("react.element"),n=Symbol.for("react.portal"),p=Symbol.for("react.fragment"),q=Symbol.for("react.strict_mode"),r=Symbol.for("react.profiler"),t=Symbol.for("react.provider"),u=Symbol.for("react.context"),v=Symbol.for("react.forward_ref"),w=Symbol.for("react.suspense"),x=Symbol.for("react.memo"),y=Symbol.for("react.lazy"),z=Symbol.iterator;function A(a){if(null===a||"object"!==typeof a)return null;a=z&&a[z]||a["@@iterator"];return"function"===typeof a?a:null}
var B={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},C=Object.assign,D={};function E(a,b,e){this.props=a;this.context=b;this.refs=D;this.updater=e||B}E.prototype.isReactComponent={};
E.prototype.setState=function(a,b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,a,b,"setState")};E.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};function F(){}F.prototype=E.prototype;function G(a,b,e){this.props=a;this.context=b;this.refs=D;this.updater=e||B}var H=G.prototype=new F;
H.constructor=G;C(H,E.prototype);H.isPureReactComponent=!0;var I=Array.isArray,J=Object.prototype.hasOwnProperty,K={current:null},L={key:!0,ref:!0,__self:!0,__source:!0};
function M(a,b,e){var d,c={},k=null,h=null;if(null!=b)for(d in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(k=""+b.key),b)J.call(b,d)&&!L.hasOwnProperty(d)&&(c[d]=b[d]);var g=arguments.length-2;if(1===g)c.children=e;else if(1<g){for(var f=Array(g),m=0;m<g;m++)f[m]=arguments[m+2];c.children=f}if(a&&a.defaultProps)for(d in g=a.defaultProps,g)void 0===c[d]&&(c[d]=g[d]);return{$$typeof:l,type:a,key:k,ref:h,props:c,_owner:K.current}}
function N(a,b){return{$$typeof:l,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function O(a){return"object"===typeof a&&null!==a&&a.$$typeof===l}function escape(a){var b={"=":"=0",":":"=2"};return"$"+a.replace(/[=:]/g,function(a){return b[a]})}var P=/\/+/g;function Q(a,b){return"object"===typeof a&&null!==a&&null!=a.key?escape(""+a.key):b.toString(36)}
function R(a,b,e,d,c){var k=typeof a;if("undefined"===k||"boolean"===k)a=null;var h=!1;if(null===a)h=!0;else switch(k){case "string":case "number":h=!0;break;case "object":switch(a.$$typeof){case l:case n:h=!0}}if(h)return h=a,c=c(h),a=""===d?"."+Q(h,0):d,I(c)?(e="",null!=a&&(e=a.replace(P,"$&/")+"/"),R(c,b,e,"",function(a){return a})):null!=c&&(O(c)&&(c=N(c,e+(!c.key||h&&h.key===c.key?"":(""+c.key).replace(P,"$&/")+"/")+a)),b.push(c)),1;h=0;d=""===d?".":d+":";if(I(a))for(var g=0;g<a.length;g++){k=
a[g];var f=d+Q(k,g);h+=R(k,b,e,f,c)}else if(f=A(a),"function"===typeof f)for(a=f.call(a),g=0;!(k=a.next()).done;)k=k.value,f=d+Q(k,g++),h+=R(k,b,e,f,c);else if("object"===k)throw b=String(a),Error("Objects are not valid as a React child (found: "+("[object Object]"===b?"object with keys {"+Object.keys(a).join(", ")+"}":b)+"). If you meant to render a collection of children, use an array instead.");return h}
function S(a,b,e){if(null==a)return a;var d=[],c=0;R(a,d,"","",function(a){return b.call(e,a,c++)});return d}function T(a){if(-1===a._status){var b=a._result;b=b();b.then(function(b){if(0===a._status||-1===a._status)a._status=1,a._result=b},function(b){if(0===a._status||-1===a._status)a._status=2,a._result=b});-1===a._status&&(a._status=0,a._result=b)}if(1===a._status)return a._result.default;throw a._result;}
var U={current:null},V={transition:null},W={ReactCurrentDispatcher:U,ReactCurrentBatchConfig:V,ReactCurrentOwner:K};function X(){throw Error("act(...) is not supported in production builds of React.");}
exports.Children={map:S,forEach:function(a,b,e){S(a,function(){b.apply(this,arguments)},e)},count:function(a){var b=0;S(a,function(){b++});return b},toArray:function(a){return S(a,function(a){return a})||[]},only:function(a){if(!O(a))throw Error("React.Children.only expected to receive a single React element child.");return a}};exports.Component=E;exports.Fragment=p;exports.Profiler=r;exports.PureComponent=G;exports.StrictMode=q;exports.Suspense=w;
exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=W;exports.act=X;
exports.cloneElement=function(a,b,e){if(null===a||void 0===a)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+a+".");var d=C({},a.props),c=a.key,k=a.ref,h=a._owner;if(null!=b){void 0!==b.ref&&(k=b.ref,h=K.current);void 0!==b.key&&(c=""+b.key);if(a.type&&a.type.defaultProps)var g=a.type.defaultProps;for(f in b)J.call(b,f)&&!L.hasOwnProperty(f)&&(d[f]=void 0===b[f]&&void 0!==g?g[f]:b[f])}var f=arguments.length-2;if(1===f)d.children=e;else if(1<f){g=Array(f);
for(var m=0;m<f;m++)g[m]=arguments[m+2];d.children=g}return{$$typeof:l,type:a.type,key:c,ref:k,props:d,_owner:h}};exports.createContext=function(a){a={$$typeof:u,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null};a.Provider={$$typeof:t,_context:a};return a.Consumer=a};exports.createElement=M;exports.createFactory=function(a){var b=M.bind(null,a);b.type=a;return b};exports.createRef=function(){return{current:null}};
exports.forwardRef=function(a){return{$$typeof:v,render:a}};exports.isValidElement=O;exports.lazy=function(a){return{$$typeof:y,_payload:{_status:-1,_result:a},_init:T}};exports.memo=function(a,b){return{$$typeof:x,type:a,compare:void 0===b?null:b}};exports.startTransition=function(a){var b=V.transition;V.transition={};try{a()}finally{V.transition=b}};exports.unstable_act=X;exports.useCallback=function(a,b){return U.current.useCallback(a,b)};exports.useContext=function(a){return U.current.useContext(a)};
exports.useDebugValue=function(){};exports.useDeferredValue=function(a){return U.current.useDeferredValue(a)};exports.useEffect=function(a,b){return U.current.useEffect(a,b)};exports.useId=function(){return U.current.useId()};exports.useImperativeHandle=function(a,b,e){return U.current.useImperativeHandle(a,b,e)};exports.useInsertionEffect=function(a,b){return U.current.useInsertionEffect(a,b)};exports.useLayoutEffect=function(a,b){return U.current.useLayoutEffect(a,b)};
exports.useMemo=function(a,b){return U.current.useMemo(a,b)};exports.useReducer=function(a,b,e){return U.current.useReducer(a,b,e)};exports.useRef=function(a){return U.current.useRef(a)};exports.useState=function(a){return U.current.useState(a)};exports.useSyncExternalStore=function(a,b,e){return U.current.useSyncExternalStore(a,b,e)};exports.useTransition=function(){return U.current.useTransition()};exports.version="18.3.1";


/***/ }),

/***/ 96540:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(15287);
} else {}


/***/ }),

/***/ 74848:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(21020);
} else {}


/***/ }),

/***/ 54785:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ActionCreators = exports.ActionTypes = void 0;
var ActionTypes = {
  UNDO: '@@redux-undo/UNDO',
  REDO: '@@redux-undo/REDO',
  JUMP_TO_FUTURE: '@@redux-undo/JUMP_TO_FUTURE',
  JUMP_TO_PAST: '@@redux-undo/JUMP_TO_PAST',
  JUMP: '@@redux-undo/JUMP',
  CLEAR_HISTORY: '@@redux-undo/CLEAR_HISTORY'
};
exports.ActionTypes = ActionTypes;
var ActionCreators = {
  undo: function undo() {
    return {
      type: ActionTypes.UNDO
    };
  },
  redo: function redo() {
    return {
      type: ActionTypes.REDO
    };
  },
  jumpToFuture: function jumpToFuture(index) {
    return {
      type: ActionTypes.JUMP_TO_FUTURE,
      index: index
    };
  },
  jumpToPast: function jumpToPast(index) {
    return {
      type: ActionTypes.JUMP_TO_PAST,
      index: index
    };
  },
  jump: function jump(index) {
    return {
      type: ActionTypes.JUMP,
      index: index
    };
  },
  clearHistory: function clearHistory() {
    return {
      type: ActionTypes.CLEAR_HISTORY
    };
  }
};
exports.ActionCreators = ActionCreators;

/***/ }),

/***/ 96453:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.set = set;
exports.start = start;
exports.end = end;
exports.log = log;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var __DEBUG__;

var displayBuffer;
var colors = {
  prevState: '#9E9E9E',
  action: '#03A9F4',
  nextState: '#4CAF50'
};
/* istanbul ignore next: debug messaging is not tested */

function initBuffer() {
  displayBuffer = {
    header: [],
    prev: [],
    action: [],
    next: [],
    msgs: []
  };
}
/* istanbul ignore next: debug messaging is not tested */


function printBuffer() {
  var _displayBuffer = displayBuffer,
      header = _displayBuffer.header,
      prev = _displayBuffer.prev,
      next = _displayBuffer.next,
      action = _displayBuffer.action,
      msgs = _displayBuffer.msgs;

  if (console.group) {
    var _console, _console2, _console3, _console4, _console5;

    (_console = console).groupCollapsed.apply(_console, _toConsumableArray(header));

    (_console2 = console).log.apply(_console2, _toConsumableArray(prev));

    (_console3 = console).log.apply(_console3, _toConsumableArray(action));

    (_console4 = console).log.apply(_console4, _toConsumableArray(next));

    (_console5 = console).log.apply(_console5, _toConsumableArray(msgs));

    console.groupEnd();
  } else {
    var _console6, _console7, _console8, _console9, _console10;

    (_console6 = console).log.apply(_console6, _toConsumableArray(header));

    (_console7 = console).log.apply(_console7, _toConsumableArray(prev));

    (_console8 = console).log.apply(_console8, _toConsumableArray(action));

    (_console9 = console).log.apply(_console9, _toConsumableArray(next));

    (_console10 = console).log.apply(_console10, _toConsumableArray(msgs));
  }
}
/* istanbul ignore next: debug messaging is not tested */


function colorFormat(text, color, obj) {
  return ["%c".concat(text), "color: ".concat(color, "; font-weight: bold"), obj];
}
/* istanbul ignore next: debug messaging is not tested */


function start(action, state) {
  initBuffer();

  if (__DEBUG__) {
    if (console.group) {
      displayBuffer.header = ['%credux-undo', 'font-style: italic', 'action', action.type];
      displayBuffer.action = colorFormat('action', colors.action, action);
      displayBuffer.prev = colorFormat('prev history', colors.prevState, state);
    } else {
      displayBuffer.header = ['redux-undo action', action.type];
      displayBuffer.action = ['action', action];
      displayBuffer.prev = ['prev history', state];
    }
  }
}
/* istanbul ignore next: debug messaging is not tested */


function end(nextState) {
  if (__DEBUG__) {
    if (console.group) {
      displayBuffer.next = colorFormat('next history', colors.nextState, nextState);
    } else {
      displayBuffer.next = ['next history', nextState];
    }

    printBuffer();
  }
}
/* istanbul ignore next: debug messaging is not tested */


function log() {
  if (__DEBUG__) {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    displayBuffer.msgs = displayBuffer.msgs.concat([].concat(args, ['\n']));
  }
}
/* istanbul ignore next: debug messaging is not tested */


function set(debug) {
  __DEBUG__ = debug;
}

/***/ }),

/***/ 95075:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.parseActions = parseActions;
exports.isHistory = isHistory;
exports.includeAction = includeAction;
exports.excludeAction = excludeAction;
exports.combineFilters = combineFilters;
exports.groupByActionTypes = groupByActionTypes;
exports.newHistory = newHistory;

// parseActions helper: takes a string (or array)
//                      and makes it an array if it isn't yet
function parseActions(rawActions) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (Array.isArray(rawActions)) {
    return rawActions;
  } else if (typeof rawActions === 'string') {
    return [rawActions];
  }

  return defaultValue;
} // isHistory helper: check for a valid history object


function isHistory(history) {
  return typeof history.present !== 'undefined' && typeof history.future !== 'undefined' && typeof history.past !== 'undefined' && Array.isArray(history.future) && Array.isArray(history.past);
} // includeAction helper: whitelist actions to be added to the history


function includeAction(rawActions) {
  var actions = parseActions(rawActions);
  return function (action) {
    return actions.indexOf(action.type) >= 0;
  };
} // excludeAction helper: blacklist actions from being added to the history


function excludeAction(rawActions) {
  var actions = parseActions(rawActions);
  return function (action) {
    return actions.indexOf(action.type) < 0;
  };
} // combineFilters helper: combine multiple filters to one


function combineFilters() {
  for (var _len = arguments.length, filters = new Array(_len), _key = 0; _key < _len; _key++) {
    filters[_key] = arguments[_key];
  }

  return filters.reduce(function (prev, curr) {
    return function (action, currentState, previousHistory) {
      return prev(action, currentState, previousHistory) && curr(action, currentState, previousHistory);
    };
  }, function () {
    return true;
  });
}

function groupByActionTypes(rawActions) {
  var actions = parseActions(rawActions);
  return function (action) {
    return actions.indexOf(action.type) >= 0 ? action.type : null;
  };
}

function newHistory(past, present, future) {
  var group = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  return {
    past: past,
    present: present,
    future: future,
    group: group,
    _latestUnfiltered: present,
    index: past.length,
    limit: past.length + future.length + 1
  };
}

/***/ }),

/***/ 3618:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "ActionTypes", ({
  enumerable: true,
  get: function get() {
    return _actions.ActionTypes;
  }
}));
Object.defineProperty(exports, "ActionCreators", ({
  enumerable: true,
  get: function get() {
    return _actions.ActionCreators;
  }
}));
Object.defineProperty(exports, "parseActions", ({
  enumerable: true,
  get: function get() {
    return _helpers.parseActions;
  }
}));
Object.defineProperty(exports, "isHistory", ({
  enumerable: true,
  get: function get() {
    return _helpers.isHistory;
  }
}));
Object.defineProperty(exports, "includeAction", ({
  enumerable: true,
  get: function get() {
    return _helpers.includeAction;
  }
}));
Object.defineProperty(exports, "excludeAction", ({
  enumerable: true,
  get: function get() {
    return _helpers.excludeAction;
  }
}));
Object.defineProperty(exports, "combineFilters", ({
  enumerable: true,
  get: function get() {
    return _helpers.combineFilters;
  }
}));
Object.defineProperty(exports, "groupByActionTypes", ({
  enumerable: true,
  get: function get() {
    return _helpers.groupByActionTypes;
  }
}));
Object.defineProperty(exports, "newHistory", ({
  enumerable: true,
  get: function get() {
    return _helpers.newHistory;
  }
}));
Object.defineProperty(exports, "default", ({
  enumerable: true,
  get: function get() {
    return _reducer["default"];
  }
}));

var _actions = __webpack_require__(54785);

var _helpers = __webpack_require__(95075);

var _reducer = _interopRequireDefault(__webpack_require__(50190));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/***/ }),

/***/ 50190:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = undoable;

var debug = _interopRequireWildcard(__webpack_require__(96453));

var _actions = __webpack_require__(54785);

var _helpers = __webpack_require__(95075);

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function createHistory(state, ignoreInitialState) {
  // ignoreInitialState essentially prevents the user from undoing to the
  // beginning, in the case that the undoable reducer handles initialization
  // in a way that can't be redone simply
  var history = (0, _helpers.newHistory)([], state, []);

  if (ignoreInitialState) {
    history._latestUnfiltered = null;
  }

  return history;
} // insert: insert `state` into history, which means adding the current state
//         into `past`, setting the new `state` as `present` and erasing
//         the `future`.


function insert(history, state, limit, group) {
  var lengthWithoutFuture = history.past.length + 1;
  debug.log('inserting', state);
  debug.log('new free: ', limit - lengthWithoutFuture);
  var past = history.past,
      _latestUnfiltered = history._latestUnfiltered;
  var isHistoryOverflow = limit && limit <= lengthWithoutFuture;
  var pastSliced = past.slice(isHistoryOverflow ? 1 : 0);
  var newPast = _latestUnfiltered != null ? [].concat(_toConsumableArray(pastSliced), [_latestUnfiltered]) : pastSliced;
  return (0, _helpers.newHistory)(newPast, state, [], group);
} // jumpToFuture: jump to requested index in future history


function jumpToFuture(history, index) {
  if (index < 0 || index >= history.future.length) return history;
  var past = history.past,
      future = history.future,
      _latestUnfiltered = history._latestUnfiltered;
  var newPast = [].concat(_toConsumableArray(past), [_latestUnfiltered], _toConsumableArray(future.slice(0, index)));
  var newPresent = future[index];
  var newFuture = future.slice(index + 1);
  return (0, _helpers.newHistory)(newPast, newPresent, newFuture);
} // jumpToPast: jump to requested index in past history


function jumpToPast(history, index) {
  if (index < 0 || index >= history.past.length) return history;
  var past = history.past,
      future = history.future,
      _latestUnfiltered = history._latestUnfiltered;
  var newPast = past.slice(0, index);
  var newFuture = [].concat(_toConsumableArray(past.slice(index + 1)), [_latestUnfiltered], _toConsumableArray(future));
  var newPresent = past[index];
  return (0, _helpers.newHistory)(newPast, newPresent, newFuture);
} // jump: jump n steps in the past or forward


function jump(history, n) {
  if (n > 0) return jumpToFuture(history, n - 1);
  if (n < 0) return jumpToPast(history, history.past.length + n);
  return history;
} // helper to dynamically match in the reducer's switch-case


function actionTypeAmongClearHistoryType(actionType, clearHistoryType) {
  return clearHistoryType.indexOf(actionType) > -1 ? actionType : !actionType;
} // redux-undo higher order reducer


function undoable(reducer) {
  var rawConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  debug.set(rawConfig.debug);

  var config = _objectSpread({
    limit: undefined,
    filter: function filter() {
      return true;
    },
    groupBy: function groupBy() {
      return null;
    },
    undoType: _actions.ActionTypes.UNDO,
    redoType: _actions.ActionTypes.REDO,
    jumpToPastType: _actions.ActionTypes.JUMP_TO_PAST,
    jumpToFutureType: _actions.ActionTypes.JUMP_TO_FUTURE,
    jumpType: _actions.ActionTypes.JUMP,
    neverSkipReducer: false,
    ignoreInitialState: false,
    syncFilter: false
  }, rawConfig, {
    initTypes: (0, _helpers.parseActions)(rawConfig.initTypes, ['@@redux-undo/INIT']),
    clearHistoryType: (0, _helpers.parseActions)(rawConfig.clearHistoryType, [_actions.ActionTypes.CLEAR_HISTORY])
  }); // Allows the user to call the reducer with redux-undo specific actions


  var skipReducer = config.neverSkipReducer ? function (res, action) {
    for (var _len = arguments.length, slices = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      slices[_key - 2] = arguments[_key];
    }

    return _objectSpread({}, res, {
      present: reducer.apply(void 0, [res.present, action].concat(slices))
    });
  } : function (res) {
    return res;
  };
  var initialState;
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    debug.start(action, state);
    var history = state;

    for (var _len2 = arguments.length, slices = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
      slices[_key2 - 2] = arguments[_key2];
    }

    if (!initialState) {
      debug.log('history is uninitialized');

      if (state === undefined) {
        var createHistoryAction = {
          type: '@@redux-undo/CREATE_HISTORY'
        };
        var start = reducer.apply(void 0, [state, createHistoryAction].concat(slices));
        history = createHistory(start, config.ignoreInitialState);
        debug.log('do not set initialState on probe actions');
        debug.end(history);
        return history;
      } else if ((0, _helpers.isHistory)(state)) {
        history = initialState = config.ignoreInitialState ? state : (0, _helpers.newHistory)(state.past, state.present, state.future);
        debug.log('initialHistory initialized: initialState is a history', initialState);
      } else {
        history = initialState = createHistory(state, config.ignoreInitialState);
        debug.log('initialHistory initialized: initialState is not a history', initialState);
      }
    }

    var res;

    switch (action.type) {
      case undefined:
        return history;

      case config.undoType:
        res = jump(history, -1);
        debug.log('perform undo');
        debug.end(res);
        return skipReducer.apply(void 0, [res, action].concat(slices));

      case config.redoType:
        res = jump(history, 1);
        debug.log('perform redo');
        debug.end(res);
        return skipReducer.apply(void 0, [res, action].concat(slices));

      case config.jumpToPastType:
        res = jumpToPast(history, action.index);
        debug.log("perform jumpToPast to ".concat(action.index));
        debug.end(res);
        return skipReducer.apply(void 0, [res, action].concat(slices));

      case config.jumpToFutureType:
        res = jumpToFuture(history, action.index);
        debug.log("perform jumpToFuture to ".concat(action.index));
        debug.end(res);
        return skipReducer.apply(void 0, [res, action].concat(slices));

      case config.jumpType:
        res = jump(history, action.index);
        debug.log("perform jump to ".concat(action.index));
        debug.end(res);
        return skipReducer.apply(void 0, [res, action].concat(slices));

      case actionTypeAmongClearHistoryType(action.type, config.clearHistoryType):
        res = createHistory(history.present, config.ignoreInitialState);
        debug.log('perform clearHistory');
        debug.end(res);
        return skipReducer.apply(void 0, [res, action].concat(slices));

      default:
        res = reducer.apply(void 0, [history.present, action].concat(slices));

        if (config.initTypes.some(function (actionType) {
          return actionType === action.type;
        })) {
          debug.log('reset history due to init action');
          debug.end(initialState);
          return initialState;
        }

        if (history._latestUnfiltered === res) {
          // Don't handle this action. Do not call debug.end here,
          // because this action should not produce side effects to the console
          return history;
        }
        /* eslint-disable-next-line no-case-declarations */


        var filtered = typeof config.filter === 'function' && !config.filter(action, res, history);

        if (filtered) {
          // if filtering an action, merely update the present
          var filteredState = (0, _helpers.newHistory)(history.past, res, history.future, history.group);

          if (!config.syncFilter) {
            filteredState._latestUnfiltered = history._latestUnfiltered;
          }

          debug.log('filter ignored action, not storing it in past');
          debug.end(filteredState);
          return filteredState;
        }
        /* eslint-disable-next-line no-case-declarations */


        var group = config.groupBy(action, res, history);

        if (group != null && group === history.group) {
          // if grouping with the previous action, only update the present
          var groupedState = (0, _helpers.newHistory)(history.past, res, history.future, history.group);
          debug.log('groupBy grouped the action with the previous action');
          debug.end(groupedState);
          return groupedState;
        } // If the action wasn't filtered or grouped, insert normally


        history = insert(history, res, config.limit, group);
        debug.log('inserted new state into history');
        debug.end(history);
        return history;
    }
  };
}

/***/ }),

/***/ 37372:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
var ze=Object.create;var Y=Object.defineProperty;var He=Object.getOwnPropertyDescriptor;var Be=Object.getOwnPropertyNames;var Ke=Object.getPrototypeOf,Xe=Object.prototype.hasOwnProperty;var Ge=(e,t)=>{for(var o in t)Y(e,o,{get:t[o],enumerable:!0})},ye=(e,t,o,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let r of Be(t))!Xe.call(e,r)&&r!==o&&Y(e,r,{get:()=>t[r],enumerable:!(n=He(t,r))||n.enumerable});return e};var me=(e,t,o)=>(o=e!=null?ze(Ke(e)):{},ye(t||!e||!e.__esModule?Y(o,"default",{value:e,enumerable:!0}):o,e)),Je=e=>ye(Y({},"__esModule",{value:!0}),e);var Nt={};Ge(Nt,{Provider:()=>Ue,ReactReduxContext:()=>f,batch:()=>vt,connect:()=>We,createDispatchHook:()=>Pe,createSelectorHook:()=>ae,createStoreHook:()=>j,shallowEqual:()=>g,useDispatch:()=>je,useSelector:()=>we,useStore:()=>J});module.exports=Je(Nt);var qe=me(__webpack_require__(96540)),$e=__webpack_require__(78418);var z=me(__webpack_require__(96540)),a="default"in z?z.default:z;var se=Symbol.for("react-redux-context"),pe=typeof globalThis<"u"?globalThis:{};function Ze(){if(!a.createContext)return{};let e=pe[se]??(pe[se]=new Map),t=e.get(a.createContext);return t||(t=a.createContext(null),e.set(a.createContext,t)),t}var f=Ze();var H=()=>{throw new Error("uSES not initialized!")};function V(e=f){return function(){return a.useContext(e)}}var B=V();var he=H,xe=e=>{he=e},Qe=(e,t)=>e===t;function ae(e=f){let t=e===f?B:V(e),o=(n,r={})=>{let{equalityFn:s=Qe,devModeChecks:c={}}=typeof r=="function"?{equalityFn:r}:r,{store:u,subscription:i,getServerState:p,stabilityCheck:P,identityFunctionCheck:l}=t(),T=a.useRef(!0),w=a.useCallback({[n.name](D){let d=n(D);if(false){}return d}}[n.name],[n,P,c.stabilityCheck]),y=he(i.addNestedSub,u.getState,p||u.getState,w,s);return a.useDebugValue(y),y};return Object.assign(o,{withTypes:()=>o}),o}var we=ae();var et=Symbol.for("react.element"),tt=Symbol.for("react.portal"),ot=Symbol.for("react.fragment"),rt=Symbol.for("react.strict_mode"),nt=Symbol.for("react.profiler"),st=Symbol.for("react.provider"),pt=Symbol.for("react.context"),at=Symbol.for("react.server_context"),Ce=Symbol.for("react.forward_ref"),ct=Symbol.for("react.suspense"),it=Symbol.for("react.suspense_list"),ce=Symbol.for("react.memo"),ut=Symbol.for("react.lazy"),Xt=Symbol.for("react.offscreen"),Gt=Symbol.for("react.client.reference"),Oe=Ce,be=ce;function Pt(e){if(typeof e=="object"&&e!==null){let t=e.$$typeof;switch(t){case et:{let o=e.type;switch(o){case ot:case nt:case rt:case ct:case it:return o;default:{let n=o&&o.$$typeof;switch(n){case at:case pt:case Ce:case ut:case ce:case st:return n;default:return t}}}}case tt:return t}}}function De(e){return Pt(e)===ce}function lt(e,t,o,n,{areStatesEqual:r,areOwnPropsEqual:s,areStatePropsEqual:c}){let u=!1,i,p,P,l,T;function w(S,m){return i=S,p=m,P=e(i,p),l=t(n,p),T=o(P,l,p),u=!0,T}function y(){return P=e(i,p),t.dependsOnOwnProps&&(l=t(n,p)),T=o(P,l,p),T}function D(){return e.dependsOnOwnProps&&(P=e(i,p)),t.dependsOnOwnProps&&(l=t(n,p)),T=o(P,l,p),T}function d(){let S=e(i,p),m=!c(S,P);return P=S,m&&(T=o(P,l,p)),T}function x(S,m){let C=!s(m,p),q=!r(S,i,m,p);return i=S,p=m,C&&q?y():C?D():q?d():T}return function(m,C){return u?x(m,C):w(m,C)}}function ie(e,{initMapStateToProps:t,initMapDispatchToProps:o,initMergeProps:n,...r}){let s=t(e,r),c=o(e,r),u=n(e,r);return lt(s,c,u,e,r)}function ue(e,t){let o={};for(let n in e){let r=e[n];typeof r=="function"&&(o[n]=(...s)=>t(r(...s)))}return o}function W(e){return function(o){let n=e(o);function r(){return n}return r.dependsOnOwnProps=!1,r}}function Re(e){return e.dependsOnOwnProps?!!e.dependsOnOwnProps:e.length!==1}function K(e,t){return function(n,{displayName:r}){let s=function(u,i){return s.dependsOnOwnProps?s.mapToProps(u,i):s.mapToProps(u,void 0)};return s.dependsOnOwnProps=!0,s.mapToProps=function(u,i){s.mapToProps=e,s.dependsOnOwnProps=Re(e);let p=s(u,i);return typeof p=="function"&&(s.mapToProps=p,s.dependsOnOwnProps=Re(p),p=s(u,i)),p},s}}function A(e,t){return(o,n)=>{throw new Error(`Invalid value of type ${typeof e} for ${t} argument when connecting component ${n.wrappedComponentName}.`)}}function Me(e){return e&&typeof e=="object"?W(t=>ue(e,t)):e?typeof e=="function"?K(e,"mapDispatchToProps"):A(e,"mapDispatchToProps"):W(t=>({dispatch:t}))}function ge(e){return e?typeof e=="function"?K(e,"mapStateToProps"):A(e,"mapStateToProps"):W(()=>({}))}function dt(e,t,o){return{...o,...e,...t}}function Tt(e){return function(o,{displayName:n,areMergedPropsEqual:r}){let s=!1,c;return function(i,p,P){let l=e(i,p,P);return s?r(l,c)||(c=l):(s=!0,c=l),c}}}function Ee(e){return e?typeof e=="function"?Tt(e):A(e,"mergeProps"):()=>dt}function X(e){e()}function ft(){let e=null,t=null;return{clear(){e=null,t=null},notify(){X(()=>{let o=e;for(;o;)o.callback(),o=o.next})},get(){let o=[],n=e;for(;n;)o.push(n),n=n.next;return o},subscribe(o){let n=!0,r=t={callback:o,next:null,prev:t};return r.prev?r.prev.next=r:e=r,function(){!n||e===null||(n=!1,r.next?r.next.prev=r.prev:t=r.prev,r.prev?r.prev.next=r.next:e=r.next)}}}}var ke={notify(){},get:()=>[]};function G(e,t){let o,n=ke,r=0,s=!1;function c(D){P();let d=n.subscribe(D),x=!1;return()=>{x||(x=!0,d(),l())}}function u(){n.notify()}function i(){y.onStateChange&&y.onStateChange()}function p(){return s}function P(){r++,o||(o=t?t.addNestedSub(i):e.subscribe(i),n=ft())}function l(){r--,o&&r===0&&(o(),o=void 0,n.clear(),n=ke)}function T(){s||(s=!0,P())}function w(){s&&(s=!1,l())}let y={addNestedSub:c,notifyNestedSubs:u,handleChangeWrapper:i,isSubscribed:p,trySubscribe:T,tryUnsubscribe:w,getListeners:()=>n};return y}var St=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",yt=typeof navigator<"u"&&navigator.product==="ReactNative",F=St||yt?a.useLayoutEffect:a.useEffect;function Ae(e,t){return e===t?e!==0||t!==0||1/e===1/t:e!==e&&t!==t}function g(e,t){if(Ae(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;let o=Object.keys(e),n=Object.keys(t);if(o.length!==n.length)return!1;for(let r=0;r<o.length;r++)if(!Object.prototype.hasOwnProperty.call(t,o[r])||!Ae(e[o[r]],t[o[r]]))return!1;return!0}var mt={childContextTypes:!0,contextType:!0,contextTypes:!0,defaultProps:!0,displayName:!0,getDefaultProps:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,mixins:!0,propTypes:!0,type:!0},ht={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},xt={$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},_e={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},wt={[Oe]:xt,[be]:_e};function Fe(e){return De(e)?_e:wt[e.$$typeof]||mt}var Ct=Object.defineProperty,Ot=Object.getOwnPropertyNames,ve=Object.getOwnPropertySymbols,bt=Object.getOwnPropertyDescriptor,Dt=Object.getPrototypeOf,Ne=Object.prototype;function U(e,t){if(typeof t!="string"){if(Ne){let s=Dt(t);s&&s!==Ne&&U(e,s)}let o=Ot(t);ve&&(o=o.concat(ve(t)));let n=Fe(e),r=Fe(t);for(let s=0;s<o.length;++s){let c=o[s];if(!ht[c]&&!(r&&r[c])&&!(n&&n[c])){let u=bt(t,c);try{Ct(e,c,u)}catch{}}}}return e}var Ie=H,Ve=e=>{Ie=e};var Rt=[null,null];function Mt(e,t,o){F(()=>e(...t),o)}function gt(e,t,o,n,r,s){e.current=n,o.current=!1,r.current&&(r.current=null,s())}function Et(e,t,o,n,r,s,c,u,i,p,P){if(!e)return()=>{};let l=!1,T=null,w=()=>{if(l||!u.current)return;let D=t.getState(),d,x;try{d=n(D,r.current)}catch(S){x=S,T=S}x||(T=null),d===s.current?c.current||p():(s.current=d,i.current=d,c.current=!0,P())};return o.onStateChange=w,o.trySubscribe(),w(),()=>{if(l=!0,o.tryUnsubscribe(),o.onStateChange=null,T)throw T}}function kt(e,t){return e===t}function At(e,t,o,{pure:n,areStatesEqual:r=kt,areOwnPropsEqual:s=g,areStatePropsEqual:c=g,areMergedPropsEqual:u=g,forwardRef:i=!1,context:p=f}={}){let P=p,l=ge(e),T=Me(t),w=Ee(o),y=!!e;return d=>{let x=d.displayName||d.name||"Component",S=`Connect(${x})`,m={shouldHandleStateChanges:y,displayName:S,wrappedComponentName:x,WrappedComponent:d,initMapStateToProps:l,initMapDispatchToProps:T,initMergeProps:w,areStatesEqual:r,areStatePropsEqual:c,areOwnPropsEqual:s,areMergedPropsEqual:u};function C(O){let[E,Z,R]=a.useMemo(()=>{let{reactReduxForwardedRef:h,...k}=O;return[O.context,h,k]},[O]),v=a.useMemo(()=>{let h=P;return E?.Consumer,h},[E,P]),b=a.useContext(v),N=!!O.store&&!!O.store.getState&&!!O.store.dispatch,Le=!!b&&!!b.store,M=N?O.store:b.store,le=Le?b.getServerState:M.getState,Q=a.useMemo(()=>ie(M.dispatch,m),[M]),[_,de]=a.useMemo(()=>{if(!y)return Rt;let h=G(M,N?void 0:b.subscription),k=h.notifyNestedSubs.bind(h);return[h,k]},[M,N,b]),Te=a.useMemo(()=>N?b:{...b,subscription:_},[N,b,_]),ee=a.useRef(void 0),te=a.useRef(R),I=a.useRef(void 0),fe=a.useRef(!1),oe=a.useRef(!1),re=a.useRef(void 0);F(()=>(oe.current=!0,()=>{oe.current=!1}),[]);let Se=a.useMemo(()=>()=>I.current&&R===te.current?I.current:Q(M.getState(),R),[M,R]),Ye=a.useMemo(()=>k=>_?Et(y,M,_,Q,te,ee,fe,oe,I,de,k):()=>{},[_]);Mt(gt,[te,ee,fe,R,I,de]);let L;try{L=Ie(Ye,Se,le?()=>Q(le(),R):Se)}catch(h){throw re.current&&(h.message+=`
The error may be correlated with this previous error:
${re.current.stack}

`),h}F(()=>{re.current=void 0,I.current=void 0,ee.current=L});let ne=a.useMemo(()=>a.createElement(d,{...L,ref:Z}),[Z,d,L]);return a.useMemo(()=>y?a.createElement(v.Provider,{value:Te},ne):ne,[v,ne,Te])}let $=a.memo(C);if($.WrappedComponent=d,$.displayName=C.displayName=S,i){let E=a.forwardRef(function(R,v){return a.createElement($,{...R,reactReduxForwardedRef:v})});return E.displayName=S,E.WrappedComponent=d,U(E,d)}return U($,d)}}var We=At;function Ft({store:e,context:t,children:o,serverState:n,stabilityCheck:r="once",identityFunctionCheck:s="once"}){let c=a.useMemo(()=>{let p=G(e);return{store:e,subscription:p,getServerState:n?()=>n:void 0,stabilityCheck:r,identityFunctionCheck:s}},[e,n,r,s]),u=a.useMemo(()=>e.getState(),[e]);return F(()=>{let{subscription:p}=c;return p.onStateChange=p.notifyNestedSubs,p.trySubscribe(),u!==e.getState()&&p.notifyNestedSubs(),()=>{p.tryUnsubscribe(),p.onStateChange=void 0}},[c,u]),a.createElement((t||f).Provider,{value:c},o)}var Ue=Ft;function j(e=f){let t=e===f?B:V(e),o=()=>{let{store:n}=t();return n};return Object.assign(o,{withTypes:()=>o}),o}var J=j();function Pe(e=f){let t=e===f?J:j(e),o=()=>t().dispatch;return Object.assign(o,{withTypes:()=>o}),o}var je=Pe();var vt=X;xe($e.useSyncExternalStoreWithSelector);Ve(qe.useSyncExternalStore);0&&(0);
//# sourceMappingURL=react-redux.production.min.cjs.map

/***/ }),

/***/ 29069:
/***/ ((module) => {

"use strict";

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  thunk: () => thunk,
  withExtraArgument: () => withExtraArgument
});
module.exports = __toCommonJS(src_exports);
function createThunkMiddleware(extraArgument) {
  const middleware = ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === "function") {
      return action(dispatch, getState, extraArgument);
    }
    return next(action);
  };
  return middleware;
}
var thunk = createThunkMiddleware();
var withExtraArgument = createThunkMiddleware;
// Annotate the CommonJS export names for ESM import in node:
0 && (0);


/***/ }),

/***/ 28895:
/***/ ((module) => {

"use strict";

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  __DO_NOT_USE__ActionTypes: () => actionTypes_default,
  applyMiddleware: () => applyMiddleware,
  bindActionCreators: () => bindActionCreators,
  combineReducers: () => combineReducers,
  compose: () => compose,
  createStore: () => createStore,
  isAction: () => isAction,
  isPlainObject: () => isPlainObject,
  legacy_createStore: () => legacy_createStore
});
module.exports = __toCommonJS(src_exports);

// src/utils/formatProdErrorMessage.ts
function formatProdErrorMessage(code) {
  return `Minified Redux error #${code}; visit https://redux.js.org/Errors?code=${code} for the full message or use the non-minified dev environment for full errors. `;
}

// src/utils/symbol-observable.ts
var $$observable = /* @__PURE__ */ (() => typeof Symbol === "function" && Symbol.observable || "@@observable")();
var symbol_observable_default = $$observable;

// src/utils/actionTypes.ts
var randomString = () => Math.random().toString(36).substring(7).split("").join(".");
var ActionTypes = {
  INIT: `@@redux/INIT${/* @__PURE__ */ randomString()}`,
  REPLACE: `@@redux/REPLACE${/* @__PURE__ */ randomString()}`,
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${randomString()}`
};
var actionTypes_default = ActionTypes;

// src/utils/isPlainObject.ts
function isPlainObject(obj) {
  if (typeof obj !== "object" || obj === null)
    return false;
  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(obj) === proto || Object.getPrototypeOf(obj) === null;
}

// src/utils/kindOf.ts
function miniKindOf(val) {
  if (val === void 0)
    return "undefined";
  if (val === null)
    return "null";
  const type = typeof val;
  switch (type) {
    case "boolean":
    case "string":
    case "number":
    case "symbol":
    case "function": {
      return type;
    }
  }
  if (Array.isArray(val))
    return "array";
  if (isDate(val))
    return "date";
  if (isError(val))
    return "error";
  const constructorName = ctorName(val);
  switch (constructorName) {
    case "Symbol":
    case "Promise":
    case "WeakMap":
    case "WeakSet":
    case "Map":
    case "Set":
      return constructorName;
  }
  return Object.prototype.toString.call(val).slice(8, -1).toLowerCase().replace(/\s/g, "");
}
function ctorName(val) {
  return typeof val.constructor === "function" ? val.constructor.name : null;
}
function isError(val) {
  return val instanceof Error || typeof val.message === "string" && val.constructor && typeof val.constructor.stackTraceLimit === "number";
}
function isDate(val) {
  if (val instanceof Date)
    return true;
  return typeof val.toDateString === "function" && typeof val.getDate === "function" && typeof val.setDate === "function";
}
function kindOf(val) {
  let typeOfVal = typeof val;
  if (false) {}
  return typeOfVal;
}

// src/createStore.ts
function createStore(reducer, preloadedState, enhancer) {
  if (typeof reducer !== "function") {
    throw new Error( true ? formatProdErrorMessage(2) : 0);
  }
  if (typeof preloadedState === "function" && typeof enhancer === "function" || typeof enhancer === "function" && typeof arguments[3] === "function") {
    throw new Error( true ? formatProdErrorMessage(0) : 0);
  }
  if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
    enhancer = preloadedState;
    preloadedState = void 0;
  }
  if (typeof enhancer !== "undefined") {
    if (typeof enhancer !== "function") {
      throw new Error( true ? formatProdErrorMessage(1) : 0);
    }
    return enhancer(createStore)(reducer, preloadedState);
  }
  let currentReducer = reducer;
  let currentState = preloadedState;
  let currentListeners = /* @__PURE__ */ new Map();
  let nextListeners = currentListeners;
  let listenerIdCounter = 0;
  let isDispatching = false;
  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = /* @__PURE__ */ new Map();
      currentListeners.forEach((listener, key) => {
        nextListeners.set(key, listener);
      });
    }
  }
  function getState() {
    if (isDispatching) {
      throw new Error( true ? formatProdErrorMessage(3) : 0);
    }
    return currentState;
  }
  function subscribe(listener) {
    if (typeof listener !== "function") {
      throw new Error( true ? formatProdErrorMessage(4) : 0);
    }
    if (isDispatching) {
      throw new Error( true ? formatProdErrorMessage(5) : 0);
    }
    let isSubscribed = true;
    ensureCanMutateNextListeners();
    const listenerId = listenerIdCounter++;
    nextListeners.set(listenerId, listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }
      if (isDispatching) {
        throw new Error( true ? formatProdErrorMessage(6) : 0);
      }
      isSubscribed = false;
      ensureCanMutateNextListeners();
      nextListeners.delete(listenerId);
      currentListeners = null;
    };
  }
  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error( true ? formatProdErrorMessage(7) : 0);
    }
    if (typeof action.type === "undefined") {
      throw new Error( true ? formatProdErrorMessage(8) : 0);
    }
    if (typeof action.type !== "string") {
      throw new Error( true ? formatProdErrorMessage(17) : 0);
    }
    if (isDispatching) {
      throw new Error( true ? formatProdErrorMessage(9) : 0);
    }
    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }
    const listeners = currentListeners = nextListeners;
    listeners.forEach((listener) => {
      listener();
    });
    return action;
  }
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== "function") {
      throw new Error( true ? formatProdErrorMessage(10) : 0);
    }
    currentReducer = nextReducer;
    dispatch({
      type: actionTypes_default.REPLACE
    });
  }
  function observable() {
    const outerSubscribe = subscribe;
    return {
      /**
       * The minimal observable subscription method.
       * @param observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe(observer) {
        if (typeof observer !== "object" || observer === null) {
          throw new Error( true ? formatProdErrorMessage(11) : 0);
        }
        function observeState() {
          const observerAsObserver = observer;
          if (observerAsObserver.next) {
            observerAsObserver.next(getState());
          }
        }
        observeState();
        const unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe
        };
      },
      [symbol_observable_default]() {
        return this;
      }
    };
  }
  dispatch({
    type: actionTypes_default.INIT
  });
  const store = {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [symbol_observable_default]: observable
  };
  return store;
}
function legacy_createStore(reducer, preloadedState, enhancer) {
  return createStore(reducer, preloadedState, enhancer);
}

// src/utils/warning.ts
function warning(message) {
  if (typeof console !== "undefined" && typeof console.error === "function") {
    console.error(message);
  }
  try {
    throw new Error(message);
  } catch (e) {
  }
}

// src/combineReducers.ts
function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  const reducerKeys = Object.keys(reducers);
  const argumentName = action && action.type === actionTypes_default.INIT ? "preloadedState argument passed to createStore" : "previous state received by the reducer";
  if (reducerKeys.length === 0) {
    return "Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";
  }
  if (!isPlainObject(inputState)) {
    return `The ${argumentName} has unexpected type of "${kindOf(inputState)}". Expected argument to be an object with the following keys: "${reducerKeys.join('", "')}"`;
  }
  const unexpectedKeys = Object.keys(inputState).filter((key) => !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key]);
  unexpectedKeys.forEach((key) => {
    unexpectedKeyCache[key] = true;
  });
  if (action && action.type === actionTypes_default.REPLACE)
    return;
  if (unexpectedKeys.length > 0) {
    return `Unexpected ${unexpectedKeys.length > 1 ? "keys" : "key"} "${unexpectedKeys.join('", "')}" found in ${argumentName}. Expected to find one of the known reducer keys instead: "${reducerKeys.join('", "')}". Unexpected keys will be ignored.`;
  }
}
function assertReducerShape(reducers) {
  Object.keys(reducers).forEach((key) => {
    const reducer = reducers[key];
    const initialState = reducer(void 0, {
      type: actionTypes_default.INIT
    });
    if (typeof initialState === "undefined") {
      throw new Error( true ? formatProdErrorMessage(12) : 0);
    }
    if (typeof reducer(void 0, {
      type: actionTypes_default.PROBE_UNKNOWN_ACTION()
    }) === "undefined") {
      throw new Error( true ? formatProdErrorMessage(13) : 0);
    }
  });
}
function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers);
  const finalReducers = {};
  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i];
    if (false) {}
    if (typeof reducers[key] === "function") {
      finalReducers[key] = reducers[key];
    }
  }
  const finalReducerKeys = Object.keys(finalReducers);
  let unexpectedKeyCache;
  if (false) {}
  let shapeAssertionError;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }
  return function combination(state = {}, action) {
    if (shapeAssertionError) {
      throw shapeAssertionError;
    }
    if (false) {}
    let hasChanged = false;
    const nextState = {};
    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i];
      const reducer = finalReducers[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === "undefined") {
        const actionType = action && action.type;
        throw new Error( true ? formatProdErrorMessage(14) : 0);
      }
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}

// src/bindActionCreators.ts
function bindActionCreator(actionCreator, dispatch) {
  return function(...args) {
    return dispatch(actionCreator.apply(this, args));
  };
}
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === "function") {
    return bindActionCreator(actionCreators, dispatch);
  }
  if (typeof actionCreators !== "object" || actionCreators === null) {
    throw new Error( true ? formatProdErrorMessage(16) : 0);
  }
  const boundActionCreators = {};
  for (const key in actionCreators) {
    const actionCreator = actionCreators[key];
    if (typeof actionCreator === "function") {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}

// src/compose.ts
function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

// src/applyMiddleware.ts
function applyMiddleware(...middlewares) {
  return (createStore2) => (reducer, preloadedState) => {
    const store = createStore2(reducer, preloadedState);
    let dispatch = () => {
      throw new Error( true ? formatProdErrorMessage(15) : 0);
    };
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args)
    };
    const chain = middlewares.map((middleware) => middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);
    return {
      ...store,
      dispatch
    };
  };
}

// src/utils/isAction.ts
function isAction(action) {
  return isPlainObject(action) && "type" in action && typeof action.type === "string";
}
// Annotate the CommonJS export names for ESM import in node:
0 && (0);
//# sourceMappingURL=redux.cjs.map

/***/ }),

/***/ 77987:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ _arrayLikeToArray)
/* harmony export */ });
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}


/***/ }),

/***/ 88097:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ _defineProperty)
/* harmony export */ });
/* harmony import */ var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(39434);

function _defineProperty(e, r, t) {
  return (r = (0,_toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}


/***/ }),

/***/ 65166:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ _extends)
/* harmony export */ });
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}


/***/ }),

/***/ 47029:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ _objectSpread2)
/* harmony export */ });
/* harmony import */ var _defineProperty_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(88097);

function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), !0).forEach(function (r) {
      (0,_defineProperty_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}


/***/ }),

/***/ 35412:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ _objectWithoutProperties)
});

;// CONCATENATED MODULE: ./node_modules/react-select/node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (e.includes(n)) continue;
    t[n] = r[n];
  }
  return t;
}

;// CONCATENATED MODULE: ./node_modules/react-select/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js

function _objectWithoutProperties(e, t) {
  if (null == e) return {};
  var o,
    r,
    i = _objectWithoutPropertiesLoose(e, t);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(e);
    for (r = 0; r < s.length; r++) o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}


/***/ }),

/***/ 2482:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ _slicedToArray)
});

;// CONCATENATED MODULE: ./node_modules/react-select/node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}

;// CONCATENATED MODULE: ./node_modules/react-select/node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}

// EXTERNAL MODULE: ./node_modules/react-select/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
var unsupportedIterableToArray = __webpack_require__(25134);
;// CONCATENATED MODULE: ./node_modules/react-select/node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

;// CONCATENATED MODULE: ./node_modules/react-select/node_modules/@babel/runtime/helpers/esm/slicedToArray.js




function _slicedToArray(r, e) {
  return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || (0,unsupportedIterableToArray/* default */.A)(r, e) || _nonIterableRest();
}


/***/ }),

/***/ 34644:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ _toConsumableArray)
});

// EXTERNAL MODULE: ./node_modules/react-select/node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
var arrayLikeToArray = __webpack_require__(77987);
;// CONCATENATED MODULE: ./node_modules/react-select/node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js

function _arrayWithoutHoles(r) {
  if (Array.isArray(r)) return (0,arrayLikeToArray/* default */.A)(r);
}

;// CONCATENATED MODULE: ./node_modules/react-select/node_modules/@babel/runtime/helpers/esm/iterableToArray.js
function _iterableToArray(r) {
  if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}

// EXTERNAL MODULE: ./node_modules/react-select/node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js
var unsupportedIterableToArray = __webpack_require__(25134);
;// CONCATENATED MODULE: ./node_modules/react-select/node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

;// CONCATENATED MODULE: ./node_modules/react-select/node_modules/@babel/runtime/helpers/esm/toConsumableArray.js




function _toConsumableArray(r) {
  return _arrayWithoutHoles(r) || _iterableToArray(r) || (0,unsupportedIterableToArray/* default */.A)(r) || _nonIterableSpread();
}


/***/ }),

/***/ 39434:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  A: () => (/* binding */ toPropertyKey)
});

// EXTERNAL MODULE: ./node_modules/react-select/node_modules/@babel/runtime/helpers/esm/typeof.js
var esm_typeof = __webpack_require__(65710);
;// CONCATENATED MODULE: ./node_modules/react-select/node_modules/@babel/runtime/helpers/esm/toPrimitive.js

function toPrimitive(t, r) {
  if ("object" != (0,esm_typeof/* default */.A)(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != (0,esm_typeof/* default */.A)(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}

;// CONCATENATED MODULE: ./node_modules/react-select/node_modules/@babel/runtime/helpers/esm/toPropertyKey.js


function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == (0,esm_typeof/* default */.A)(i) ? i : i + "";
}


/***/ }),

/***/ 65710:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ _typeof)
/* harmony export */ });
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}


/***/ }),

/***/ 25134:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ _unsupportedIterableToArray)
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(77987);

function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A)(r, a) : void 0;
  }
}


/***/ })

}]);
//# sourceMappingURL=index.js.map