"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdvancedListTableStory = void 0;
var preact_1 = require("preact");
var modules_1 = require("../../modules");
var _1 = require(".");
var options_1 = require("../../hooks/options");
exports.default = {
    title: 'Order Stories',
    decorators: [
        function (Story) { return (preact_1.h(options_1.OptionsProvider, { nonce: '', siteurl: process.env.STORYBOOK_WP_URL },
            preact_1.h(modules_1.wc.Provider, { access: {
                    key: process.env.STORYBOOK_WC_KEY,
                    secret: process.env.STORYBOOK_WC_SECRET,
                    url: process.env.STORYBOOK_WP_URL
                } },
                preact_1.h(Story, null)))); }
    ]
};
var AdvancedListTableStory = function () { return preact_1.h(_1.AdvancedListTable, null); };
exports.AdvancedListTableStory = AdvancedListTableStory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvd2Mvb3JkZXIvc3RvcnkudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUEwQjtBQUcxQix5Q0FBa0M7QUFFbEMsc0JBQXFDO0FBRXJDLCtDQUFxRDtBQUVyRCxrQkFBZTtJQUNkLEtBQUssRUFBRSxlQUFlO0lBQ3RCLFVBQVUsRUFBRTtRQUNYLFVBQUMsS0FBWSxJQUFLLE9BQUEsQ0FDakIsV0FBQyx5QkFBZSxJQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQTBCO1lBQzFFLFdBQUMsWUFBRSxDQUFDLFFBQVEsSUFDWCxNQUFNLEVBQUU7b0JBQ1AsR0FBRyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQTBCO29CQUMzQyxNQUFNLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBNkI7b0JBQ2pELEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUEwQjtpQkFDM0M7Z0JBR0QsV0FBQyxLQUFLLE9BQUcsQ0FDSSxDQUNHLENBQ2xCLEVBYmlCLENBYWpCO0tBQ0Q7Q0FDTyxDQUFBO0FBRUYsSUFBTSxzQkFBc0IsR0FBRyxjQUFNLE9BQUEsV0FBQyxvQkFBaUIsT0FBRyxFQUFyQixDQUFxQixDQUFBO0FBQXBELFFBQUEsc0JBQXNCLDBCQUE4QiJ9