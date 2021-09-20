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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordpressDashboardStory = void 0;
var preact_1 = require("preact");
var _1 = __importDefault(require("."));
exports.default = {
    title: 'Wordpress Dashboard Story',
    argTypes: {
        siteurl: { control: { type: 'text' }, name: 'Website URL' },
        gsgToken: { control: { type: 'text' }, name: 'GSG Token' }
    }
};
var Template = function (props) { return preact_1.h(_1.default, __assign({}, props)); };
exports.WordpressDashboardStory = Template.bind({});
exports.WordpressDashboardStory.args = {
    siteurl: process.env.STORYBOOK_WP_URL,
    gsgToken: process.env.STORYBOOK_GSG_TOKEN
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29yZHByZXNzLnN0b3JpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Xb3JkcHJlc3NEYXNoYm9hcmQvd29yZHByZXNzLnN0b3JpZXMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQTBCO0FBRTFCLHVDQUF3RDtBQUV4RCxrQkFBZTtJQUNkLEtBQUssRUFBRSwyQkFBMkI7SUFDbEMsUUFBUSxFQUFFO1FBQ1QsT0FBTyxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUU7UUFDM0QsUUFBUSxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUU7S0FDMUQ7Q0FDTyxDQUFBO0FBRVQsSUFBTSxRQUFRLEdBQWlCLFVBQUEsS0FBSyxJQUFJLE9BQUEsV0FBQyxVQUFrQixlQUFLLEtBQUssRUFBSSxFQUFqQyxDQUFpQyxDQUFBO0FBRTVELFFBQUEsdUJBQXVCLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtBQUN4RCwrQkFBdUIsQ0FBQyxJQUFJLEdBQUc7SUFDOUIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCO0lBQ3JDLFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQjtDQUN6QyxDQUFBIn0=