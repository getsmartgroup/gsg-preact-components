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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSVContentStory = void 0;
var preact_1 = require("preact");
var _1 = require(".");
exports.default = {
    title: 'CSV Content Story',
    argTypes: {
        file: { control: { type: 'text' }, name: 'File' },
        content: { control: { type: 'text' }, name: 'Content' }
    }
};
var Template = function (props) { return preact_1.h(_1.CSVComponent, __assign({}, props)); };
exports.CSVContentStory = Template.bind({});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9DU1ZDb21wb25lbnQvc3RvcnkudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQTBCO0FBRTFCLHNCQUF1QztBQUV2QyxrQkFBZTtJQUNkLEtBQUssRUFBRSxtQkFBbUI7SUFDMUIsUUFBUSxFQUFFO1FBQ1QsSUFBSSxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7UUFDakQsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUU7S0FDdkQ7Q0FDTyxDQUFBO0FBRVQsSUFBTSxRQUFRLEdBQWlCLFVBQUEsS0FBSyxJQUFJLE9BQUEsV0FBQyxlQUFZLGVBQUssS0FBSyxFQUFJLEVBQTNCLENBQTJCLENBQUE7QUFFdEQsUUFBQSxlQUFlLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQSJ9