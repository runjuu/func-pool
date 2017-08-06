'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

Object.defineProperty(exports, "__esModule", { value: true });

var FuncPool = function () {
    function FuncPool() {
        classCallCheck(this, FuncPool);

        this.updatePool = [];
        this.update = this.update.bind(this);
        this.autoRun = this.autoRun.bind(this);
        this.removeFromAutoRun = this.removeFromAutoRun.bind(this);
    }

    createClass(FuncPool, [{
        key: "clear",
        value: function clear() {
            this.updatePool = [];
        }
    }, {
        key: "update",
        value: function update() {
            var result = [];
            try {
                this.updatePool.forEach(function (func) {
                    if (typeof func === 'function') result.push(func());
                });
                return Promise.resolve(result);
            } catch (err) {
                return Promise.reject(err);
            }
        }
    }, {
        key: "removeFromAutoRun",
        value: function removeFromAutoRun(func) {
            if (FuncPool.checkType(func)) {
                var index = this.updatePool.findIndex(function (oldFunc) {
                    return oldFunc === func;
                });
                if (index > -1) this.updatePool.splice(index, 1);
            }
            return this.updatePool.slice(0);
        }
    }, {
        key: "autoRun",
        value: function autoRun(func) {
            var _this = this;

            if (FuncPool.checkType(func)) {
                if (Array.isArray(func)) {
                    func.forEach(function (funcInArray) {
                        return _this.autoRun(funcInArray);
                    });
                } else {
                    if (this.updatePool.includes(func)) this.removeFromAutoRun(func);
                    this.updatePool.push(func);
                }
            }
            return this.updatePool.slice(0);
        }
    }], [{
        key: "checkType",
        value: function checkType(func) {
            if (func === undefined || typeof func === 'function' || Array.isArray(func)) return func;
            throw new TypeError('FuncPool accept a function as a parameter');
        }
    }]);
    return FuncPool;
}();

exports.default = FuncPool;
