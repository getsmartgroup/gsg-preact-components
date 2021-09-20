"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var preact_1 = require("preact");
var modules_1 = require("../../modules");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvd2Mvb3JkZXIvc3RvcnkudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaUNBQTBCO0FBRzFCLHlDQUFrQztBQUVsQywrQ0FBcUQ7QUFFckQsa0JBQWU7SUFDZCxLQUFLLEVBQUUsZUFBZTtJQUN0QixVQUFVLEVBQUU7UUFDWCxVQUFDLEtBQVksSUFBSyxPQUFBLENBQ2pCLFdBQUMseUJBQWUsSUFBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUEwQjtZQUMxRSxXQUFDLFlBQUUsQ0FBQyxRQUFRLElBQ1gsTUFBTSxFQUFFO29CQUNQLEdBQUcsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUEwQjtvQkFDM0MsTUFBTSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQTZCO29CQUNqRCxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBMEI7aUJBQzNDO2dCQUdELFdBQUMsS0FBSyxPQUFHLENBQ0ksQ0FDRyxDQUNsQixFQWJpQixDQWFqQjtLQUNEO0NBQ08sQ0FBQSJ9