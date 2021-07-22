"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostOrderStory = void 0;
var preact_1 = require("preact");
var modules_1 = require("../../modules");
var options_1 = require("../../hooks/options");
var _1 = require(".");
var hooks_1 = require("../../hooks");
exports.default = {
    title: 'Evosus Stories',
    decorators: [
        function (Story) { return (preact_1.h(options_1.OptionsProvider, { nonce: '', siteurl: process.env.STORYBOOK_WP_URL, gsgToken: process.env.STORYBOOK_GSG_TOKEN },
            preact_1.h(hooks_1.evosus.Provider, { access: {
                    companySN: process.env.STORYBOOK_EVOSUS_COMPANY_SN,
                    ticket: process.env.STORYBOOK_EVOSUS_TICKET
                } },
                preact_1.h(modules_1.wc.Provider, { access: {
                        key: process.env.STORYBOOK_WC_KEY,
                        secret: process.env.STORYBOOK_WC_SECRET,
                        url: process.env.STORYBOOK_WP_URL
                    } },
                    preact_1.h(Story, null))))); }
    ]
};
var PostOrderStory = function () { return preact_1.h(_1.PostOrder, null); };
exports.PostOrderStory = PostOrderStory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZXZvc3VzL2NvbXBvbmVudHMvc3RvcnkudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUEwQjtBQUcxQix5Q0FBa0M7QUFFbEMsK0NBQXFEO0FBRXJELHNCQUE2QjtBQUM3QixxQ0FBb0M7QUFFcEMsa0JBQWU7SUFDZCxLQUFLLEVBQUUsZ0JBQWdCO0lBQ3ZCLFVBQVUsRUFBRTtRQUNYLFVBQUMsS0FBWSxJQUFLLE9BQUEsQ0FDakIsV0FBQyx5QkFBZSxJQUNmLEtBQUssRUFBRSxFQUFFLEVBQ1QsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQTBCLEVBQy9DLFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQjtZQUV6QyxXQUFDLGNBQU0sQ0FBQyxRQUFRLElBQ2YsTUFBTSxFQUFFO29CQUNQLFNBQVMsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLDJCQUFxQztvQkFDNUQsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQWlDO2lCQUNyRDtnQkFFRCxXQUFDLFlBQUUsQ0FBQyxRQUFRLElBQ1gsTUFBTSxFQUFFO3dCQUNQLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUEwQjt3QkFDM0MsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQTZCO3dCQUNqRCxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBMEI7cUJBQzNDO29CQUdELFdBQUMsS0FBSyxPQUFHLENBQ0ksQ0FDRyxDQUNELENBQ2xCLEVBeEJpQixDQXdCakI7S0FDRDtDQUNPLENBQUE7QUFFRixJQUFNLGNBQWMsR0FBRyxjQUFNLE9BQUEsV0FBQyxZQUFTLE9BQUcsRUFBYixDQUFhLENBQUE7QUFBcEMsUUFBQSxjQUFjLGtCQUFzQiJ9