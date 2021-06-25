"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePromiseCall = void 0;
var react_1 = require("@chakra-ui/react");
var hooks_1 = require("preact/hooks");
var usePromiseCall = function (promiseCall, inputs) {
    if (inputs === void 0) { inputs = []; }
    var _a = hooks_1.useState(null), resolved = _a[0], setResolved = _a[1];
    var _b = hooks_1.useState(null), rejected = _b[0], setRejected = _b[1];
    var _c = react_1.useBoolean(true), loading = _c[0], setLoading = _c[1];
    hooks_1.useEffect(function () {
        setResolved(null);
        setRejected(null);
        setLoading.on();
        if (promiseCall) {
            promiseCall()
                .then(setResolved)
                .catch(setRejected)
                .finally(setLoading.off);
        }
    }, inputs);
    return {
        resolved: resolved,
        rejected: rejected,
        loading: loading
    };
};
exports.usePromiseCall = usePromiseCall;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9va3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaG9va3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMENBQTZDO0FBQzdDLHNDQUFrRDtBQUUzQyxJQUFNLGNBQWMsR0FBRyxVQUFzQixXQUE4QixFQUFFLE1BQWtCO0lBQWxCLHVCQUFBLEVBQUEsV0FBa0I7SUFDL0YsSUFBQSxLQUEwQixnQkFBUSxDQUFXLElBQUksQ0FBQyxFQUFqRCxRQUFRLFFBQUEsRUFBRSxXQUFXLFFBQTRCLENBQUE7SUFDbEQsSUFBQSxLQUEwQixnQkFBUSxDQUFNLElBQUksQ0FBQyxFQUE1QyxRQUFRLFFBQUEsRUFBRSxXQUFXLFFBQXVCLENBQUE7SUFDN0MsSUFBQSxLQUF3QixrQkFBVSxDQUFDLElBQUksQ0FBQyxFQUF2QyxPQUFPLFFBQUEsRUFBRSxVQUFVLFFBQW9CLENBQUE7SUFDOUMsaUJBQVMsQ0FBQztRQUNULFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNqQixXQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDakIsVUFBVSxDQUFDLEVBQUUsRUFBRSxDQUFBO1FBQ2YsSUFBSSxXQUFXLEVBQUU7WUFDaEIsV0FBVyxFQUFFO2lCQUNYLElBQUksQ0FBQyxXQUFXLENBQUM7aUJBQ2pCLEtBQUssQ0FBQyxXQUFXLENBQUM7aUJBQ2xCLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUE7U0FDekI7SUFDRixDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDVixPQUFPO1FBQ04sUUFBUSxVQUFBO1FBQ1IsUUFBUSxVQUFBO1FBQ1IsT0FBTyxTQUFBO0tBQ1AsQ0FBQTtBQUNGLENBQUMsQ0FBQTtBQXBCWSxRQUFBLGNBQWMsa0JBb0IxQiJ9