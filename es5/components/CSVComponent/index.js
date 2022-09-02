"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSVComponent = void 0;
var react_1 = require("@chakra-ui/react");
var preact_1 = require("preact");
var hooks_1 = require("preact/hooks");
var SimpleTable_1 = require("../SimpleTable");
var CSVComponent = function (_a) {
    var file = _a.file, content = _a.content;
    console.log(file, content);
    var _b = (0, hooks_1.useState)([]), headers = _b[0], setHeaders = _b[1];
    var _c = (0, hooks_1.useState)([]), array = _c[0], setArray = _c[1];
    return ((0, preact_1.h)(preact_1.Fragment, null, headers ? ((0, preact_1.h)(SimpleTable_1.SimpleTable, { headers: headers }, array
        ? array.map(function (i) { return ((0, preact_1.h)(react_1.Tr, null, headers.map(function (h) {
            var _a;
            return (h(react_1.Td, null, (_a = i[h]) !== null && _a !== void 0 ? _a : undefined));
        }))); })
        : null)) : null));
};
exports.CSVComponent = CSVComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9DU1ZDb21wb25lbnQvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDBDQUF5QztBQUN6QyxpQ0FBeUQ7QUFDekQsc0NBQXVDO0FBQ3ZDLDhDQUE0QztBQU9yQyxJQUFNLFlBQVksR0FBK0IsVUFBQyxFQUFpQjtRQUFmLElBQUksVUFBQSxFQUFFLE9BQU8sYUFBQTtJQUN2RSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUNwQixJQUFBLEtBQXdCLElBQUEsZ0JBQVEsRUFBVyxFQUFFLENBQUMsRUFBN0MsT0FBTyxRQUFBLEVBQUUsVUFBVSxRQUEwQixDQUFBO0lBQzlDLElBQUEsS0FBb0IsSUFBQSxnQkFBUSxFQUFDLEVBQUUsQ0FBQyxFQUEvQixLQUFLLFFBQUEsRUFBRSxRQUFRLFFBQWdCLENBQUE7SUFDdEMsT0FBTyxDQUNOLGdCQUFDLGlCQUFRLFFBQ1AsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUNWLGdCQUFDLHlCQUFXLElBQUMsT0FBTyxFQUFFLE9BQU8sSUFDM0IsS0FBSztRQUNMLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FDZixnQkFBQyxVQUFFLFFBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUM7O1lBQUksT0FBQSxDQUNqQixFQUFDLFVBQUUsUUFBRSxNQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsbUNBQUksU0FBUyxDQUFNLENBQzVCLENBQUE7U0FBQSxDQUFDLENBQ0UsQ0FDSixFQU5jLENBTWQsQ0FBQztRQUNKLENBQUMsQ0FBQyxJQUFJLENBQ00sQ0FDZCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ0UsQ0FDWCxDQUFBO0FBQ0YsQ0FBQyxDQUFBO0FBckJZLFFBQUEsWUFBWSxnQkFxQnhCIn0=