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
        nonce: { control: { type: 'text' }, name: 'Wordpress Nonce' },
        siteurl: { control: { type: 'text' }, name: 'Website URL' },
        cookieHash: { control: { type: 'text' }, name: 'Cookies Hash' },
        cookieValue: { control: { type: 'text' }, name: 'Cookies Value' }
    }
};
var Template = function (props) { return preact_1.h(_1.default, __assign({}, props)); };
exports.WordpressDashboardStory = Template.bind({});
exports.WordpressDashboardStory.args = {
    siteurl: process.env.STORYBOOK_WP_URL,
    nonce: process.env.STORYBOOK_WP_NONCE,
    cookieHash: process.env.STORYBOOK_WP_COOKIE_HASH,
    cookieValue: process.env.STORYBOOK_WP_COOKIE_VALUE
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9Xb3JkcHJlc3NEYXNoYm9hcmQvc3RvcnkudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUNBQTBCO0FBRTFCLHVDQUF3RDtBQUV4RCxrQkFBZTtJQUNkLEtBQUssRUFBRSwyQkFBMkI7SUFDbEMsUUFBUSxFQUFFO1FBQ1QsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxpQkFBaUIsRUFBRTtRQUM3RCxPQUFPLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRTtRQUMzRCxVQUFVLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRTtRQUMvRCxXQUFXLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRTtLQUNqRTtDQUNPLENBQUE7QUFFVCxJQUFNLFFBQVEsR0FBaUIsVUFBQSxLQUFLLElBQUksT0FBQSxXQUFDLFVBQWtCLGVBQUssS0FBSyxFQUFJLEVBQWpDLENBQWlDLENBQUE7QUFFNUQsUUFBQSx1QkFBdUIsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0FBQ3hELCtCQUF1QixDQUFDLElBQUksR0FBRztJQUM5QixPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0I7SUFDckMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCO0lBQ3JDLFVBQVUsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QjtJQUNoRCxXQUFXLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUI7Q0FDbEQsQ0FBQSJ9