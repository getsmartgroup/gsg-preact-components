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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = void 0;
var preact_1 = require("preact");
var react_1 = require("@chakra-ui/react");
var options_1 = require("../../hooks/options");
var icons_1 = require("@chakra-ui/icons");
var Link = function (_a) {
    var children = _a.children, id = _a.id, props = __rest(_a, ["children", "id"]);
    var siteurl = options_1.useOptions().siteurl;
    return (preact_1.h(react_1.Link, __assign({ target: '_blank', href: siteurl + ("wp-admin/post.php?post=" + id + "&action=edit") }, props),
        children,
        preact_1.h(icons_1.ExternalLinkIcon, { mx: '2px' })));
};
exports.Link = Link;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvd3AvcG9zdC9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUEwQjtBQUcxQiwwQ0FBcUQ7QUFDckQsK0NBQWdEO0FBQ2hELDBDQUFtRDtBQUU1QyxJQUFNLElBQUksR0FBd0YsVUFBQyxFQUl6RztJQUhBLElBQUEsUUFBUSxjQUFBLEVBQ1IsRUFBRSxRQUFBLEVBQ0MsS0FBSyxjQUhpRyxrQkFJekcsQ0FEUTtJQUVBLElBQUEsT0FBTyxHQUFLLG9CQUFVLEVBQUUsUUFBakIsQ0FBaUI7SUFDaEMsT0FBTyxDQUNOLFdBQUMsWUFBVSxhQUFDLE1BQU0sRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFFLE9BQU8sSUFBRyw0QkFBMEIsRUFBRSxpQkFBYyxDQUFBLElBQU0sS0FBSztRQUMvRixRQUFRO1FBQ1QsV0FBQyx3QkFBZ0IsSUFBQyxFQUFFLEVBQUMsS0FBSyxHQUFHLENBQ2pCLENBQ2IsQ0FBQTtBQUNGLENBQUMsQ0FBQTtBQVpZLFFBQUEsSUFBSSxRQVloQiJ9