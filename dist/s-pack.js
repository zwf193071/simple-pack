(function(modules) {
    var installedModules = {};

    function __spack_require__(moduleId) {

        if(installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        };

        modules[moduleId].call(module.exports, module, module.exports, __spack_require__);

        module.l = true;

        return module.exports;
    }


    __spack_require__.m = modules;

    __spack_require__.c = installedModules;

    __spack_require__.d = function(exports, name, getter) {
        if(!__spack_require__.o(exports, name)) {
            Object.defineProperty(exports, name, { enumerable: true, get: getter });
        }
    };

    __spack_require__.r = function(exports) {
        if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
            Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
        }
        Object.defineProperty(exports, '__esModule', { value: true });
    };


    __spack_require__.t = function(value, mode) {
        if(mode & 1) value = __spack_require__(value);
        if(mode & 8) return value;
        if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
        var ns = Object.create(null);
        __spack_require__.r(ns);
        Object.defineProperty(ns, 'default', { enumerable: true, value: value });
        if(mode & 2 && typeof value != 'string') for(var key in value) __spack_require__.d(ns, key, function(key) { return
        value[key]; }.bind(null, key));
        return ns;
    };

    __spack_require__.n = function(module) {
        var getter = module && module.__esModule ?
        function getDefault() { return module['default']; } :
        function getModuleExports() { return module; };
        __spack_require__.d(getter, 'a', getter);
        return getter;
    };

    __spack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

    __spack_require__.p = "";


    return __spack_require__(__spack_require__.s = "./example\entry.js");
})
({

    
        "./example\entry.js":
        (function(module, exports, __spack_require__) {
            eval(`"use strict";

var _person = _interopRequireDefault(__spack_require__("./example\\person.js"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

console.log(_person["default"]);`);
        }),
    
        "./example\person.js":
        (function(module, exports, __spack_require__) {
            eval(`"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _name = __spack_require__("./example\\name.js");

var _default = "hello ".concat(_name.name, "!");

exports["default"] = _default;`);
        }),
    
        "./example\name.js":
        (function(module, exports, __spack_require__) {
            eval(`"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.name = void 0;
var name = 'Wenfang Zhu';
exports.name = name;`);
        }),
    

});