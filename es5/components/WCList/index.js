"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WCList = void 0;
var preact_1 = require("preact");
var wc_1 = require("../../wc");
var react_1 = require("@chakra-ui/react");
var wp_1 = require("../../wp");
var WCList = function (_a) {
    var crud = _a.crud;
    return (preact_1.h(react_1.VStack, null,
        preact_1.h(react_1.Box, null, crud.loading ? preact_1.h(react_1.Spinner, null) : null),
        preact_1.h(wc_1.PaginationProvider, { crud: crud },
            preact_1.h(wc_1.PaginationSearch, null),
            preact_1.h(react_1.VStack, { w: '100%' }, crud.loading ? (preact_1.h(preact_1.Fragment, null,
                preact_1.h(react_1.Skeleton, { w: '100%', height: '20px' }),
                preact_1.h(react_1.Skeleton, { w: '100%', height: '20px' }),
                preact_1.h(react_1.Skeleton, { w: '100%', height: '20px' }))) : (preact_1.h(wc_1.PaginationContent, null, function (object) { return (preact_1.h(react_1.Heading, { w: '100%', textAlign: 'left', size: 'sm' },
                preact_1.h(wp_1.Post.Link, { id: object.id },
                    object.id,
                    ": ",
                    object.name))); }))),
            preact_1.h(wc_1.PaginationNav, null))));
};
exports.WCList = WCList;
exports.default = exports.WCList;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9XQ0xpc3QvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUFvQztBQUNwQywrQkFBOEc7QUFDOUcsMENBQTBFO0FBQzFFLCtCQUErQjtBQUV4QixJQUFNLE1BQU0sR0FBRyxVQUFDLEVBQXlDO1FBQXZDLElBQUksVUFBQTtJQUM1QixPQUFPLENBQ04sV0FBQyxjQUFNO1FBQ04sV0FBQyxXQUFHLFFBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsV0FBQyxlQUFPLE9BQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFPO1FBQzlDLFdBQUMsdUJBQWtCLElBQUMsSUFBSSxFQUFFLElBQUk7WUFDN0IsV0FBQyxxQkFBZ0IsT0FBRztZQUNwQixXQUFDLGNBQU0sSUFBQyxDQUFDLEVBQUMsTUFBTSxJQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQ2YsV0FBQyxpQkFBUTtnQkFDUixXQUFDLGdCQUFRLElBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxHQUFHO2dCQUNuQyxXQUFDLGdCQUFRLElBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxHQUFHO2dCQUNuQyxXQUFDLGdCQUFRLElBQUMsQ0FBQyxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsTUFBTSxHQUFHLENBQ3pCLENBQ1gsQ0FBQyxDQUFDLENBQUMsQ0FDSCxXQUFDLHNCQUFpQixRQUNoQixVQUFDLE1BQVcsSUFBSyxPQUFBLENBQ2pCLFdBQUMsZUFBTyxJQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsSUFBSTtnQkFDM0MsV0FBQyxTQUFJLENBQUMsSUFBSSxJQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsRUFBRTtvQkFDdEIsTUFBTSxDQUFDLEVBQUU7O29CQUFJLE1BQU0sQ0FBQyxJQUFJLENBQ2QsQ0FDSCxDQUNWLEVBTmlCLENBTWpCLENBQ2tCLENBQ3BCLENBQ087WUFDVCxXQUFDLGtCQUFhLE9BQUcsQ0FDRyxDQUNiLENBQ1QsQ0FBQTtBQUNGLENBQUMsQ0FBQTtBQTdCWSxRQUFBLE1BQU0sVUE2QmxCO0FBQ0Qsa0JBQWUsY0FBTSxDQUFBIn0=