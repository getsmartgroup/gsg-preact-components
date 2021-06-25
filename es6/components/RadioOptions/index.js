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
import { Radio, RadioGroup, SimpleGrid } from '@chakra-ui/react';
import { h } from 'preact';
const RadioOptions = (_a) => {
    var _b;
    var { options } = _a, props = __rest(_a, ["options"]);
    return (h(RadioGroup, Object.assign({}, props),
        h(SimpleGrid, { columns: 2 }, Array.isArray(options)
            ? options.map(value => h(Radio, { value: value }, value))
            : (_b = Object.entries(options)) === null || _b === void 0 ? void 0 : _b.map(([value, label]) => h(Radio, { value: value }, label)))));
};
export default RadioOptions;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9SYWRpb09wdGlvbnMvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFDaEUsT0FBTyxFQUF1QyxDQUFDLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFFL0QsTUFBTSxZQUFZLEdBRWIsQ0FBQyxFQUFxQixFQUFFLEVBQUU7O1FBQXpCLEVBQUUsT0FBTyxPQUFZLEVBQVAsS0FBSyxjQUFuQixXQUFxQixDQUFGO0lBQ3hCLE9BQU8sQ0FDTixFQUFDLFVBQVUsb0JBQUssS0FBSztRQUNwQixFQUFDLFVBQVUsSUFBQyxPQUFPLEVBQUUsQ0FBQyxJQUNwQixLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztZQUN0QixDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEVBQUMsS0FBSyxJQUFDLEtBQUssRUFBRSxLQUFLLElBQUcsS0FBSyxDQUFTLENBQUM7WUFDNUQsQ0FBQyxDQUFDLE1BQUEsTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsMENBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUMsS0FBSyxJQUFDLEtBQUssRUFBRSxLQUFLLElBQUcsS0FBSyxDQUFTLENBQUMsQ0FDN0UsQ0FDRCxDQUNiLENBQUE7QUFDRixDQUFDLENBQUE7QUFFRCxlQUFlLFlBQVksQ0FBQSJ9