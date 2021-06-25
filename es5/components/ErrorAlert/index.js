"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("@chakra-ui/react");
var preact_1 = require("preact");
var ErrorAlert = function (_a) {
    var children = _a.children;
    return (preact_1.h(react_1.Alert, { status: 'error' },
        preact_1.h(react_1.AlertIcon, null),
        preact_1.h(react_1.AlertTitle, { mr: 2 }, children),
        preact_1.h(react_1.AlertDescription, null)));
};
exports.default = ErrorAlert;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9FcnJvckFsZXJ0L2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBDQUFpRjtBQUNqRixpQ0FBK0M7QUFFL0MsSUFBTSxVQUFVLEdBQXdCLFVBQUMsRUFBWTtRQUFWLFFBQVEsY0FBQTtJQUFPLE9BQUEsQ0FDekQsV0FBQyxhQUFLLElBQUMsTUFBTSxFQUFDLE9BQU87UUFDcEIsV0FBQyxpQkFBUyxPQUFHO1FBQ2IsV0FBQyxrQkFBVSxJQUFDLEVBQUUsRUFBRSxDQUFDLElBQUcsUUFBUSxDQUFjO1FBQzFDLFdBQUMsd0JBQWdCLE9BQW9CLENBQzlCLENBQ1I7QUFOeUQsQ0FNekQsQ0FBQTtBQUVELGtCQUFlLFVBQVUsQ0FBQSJ9