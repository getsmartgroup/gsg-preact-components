var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// prettier-ignore
export const addAsyncHook = (f, effect, capture, filter, final, early) => {
    return ((...p) => __awaiter(void 0, void 0, void 0, function* () {
        let res;
        const params = filter ? filter(...p) : p;
        try {
            if (early) {
                res = yield early(...params);
            }
            if (res === undefined) {
                res = yield f(...params);
            }
            res = yield effect(res);
        }
        catch (error) {
            if (capture)
                capture(error);
        }
        finally {
            if (final)
                final(res);
        }
        return res;
    }));
};
export const addSafeHook = (f, effect, capture, filter, final, early) => {
    return ((...p) => __awaiter(void 0, void 0, void 0, function* () {
        let res;
        if (filter)
            filter(...p);
        const params = p;
        try {
            if (early)
                early(...params);
            res = yield f(...params);
            if (effect)
                effect(res);
        }
        catch (error) {
            if (capture)
                capture(error);
        }
        finally {
            if (final)
                final(res);
        }
        return res;
    }));
};
export const chunk = (array, size) => Array.from(Array(Math.ceil(array.length / size)).keys()).map(i => array.slice(i * size, i * size + size));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbW1vbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFHQSxrQkFBa0I7QUFDbEIsTUFBTSxDQUFDLE1BQU0sWUFBWSxHQUFHLENBQzNCLENBQUksRUFDSixNQUF3QyxFQUN4QyxPQUE4QixFQUM5QixNQUErQyxFQUMvQyxLQUE0QixFQUM1QixLQUE0QixFQUMzQixFQUFFO0lBQ0gsT0FBTyxDQUFDLENBQU8sR0FBRyxDQUFRLEVBQUUsRUFBRTtRQUM3QixJQUFJLEdBQUcsQ0FBQTtRQUNQLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUksQ0FBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDM0QsSUFBSTtZQUNILElBQUksS0FBSyxFQUFFO2dCQUNWLEdBQUcsR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFBO2FBQzVCO1lBQ0QsSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO2dCQUN0QixHQUFHLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQTthQUN4QjtZQUNELEdBQUcsR0FBRyxNQUFNLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtTQUN2QjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2YsSUFBSSxPQUFPO2dCQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUMzQjtnQkFBUztZQUNULElBQUksS0FBSztnQkFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7U0FDckI7UUFDRCxPQUFPLEdBQUcsQ0FBQTtJQUNYLENBQUMsQ0FBQSxDQUFNLENBQUE7QUFDUixDQUFDLENBQUE7QUFFRCxNQUFNLENBQUMsTUFBTSxXQUFXLEdBQUcsQ0FDMUIsQ0FBSSxFQUNKLE1BQXdDLEVBQ3hDLE9BQThCLEVBQzlCLE1BQXFDLEVBQ3JDLEtBQTRCLEVBQzVCLEtBQTRCLEVBQzNCLEVBQUU7SUFDSCxPQUFPLENBQUMsQ0FBTyxHQUFHLENBQVEsRUFBRSxFQUFFO1FBQzdCLElBQUksR0FBRyxDQUFBO1FBQ1AsSUFBSyxNQUFNO1lBQ1YsTUFBTSxDQUFDLEdBQUksQ0FBbUIsQ0FBQyxDQUFBO1FBQ2hDLE1BQU0sTUFBTSxHQUFHLENBQUMsQ0FBQTtRQUNoQixJQUFJO1lBQ0gsSUFBSSxLQUFLO2dCQUNSLEtBQUssQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFBO1lBQ2pCLEdBQUcsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFBO1lBQ3hCLElBQUssTUFBTTtnQkFDVixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7U0FDWjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2YsSUFBSSxPQUFPO2dCQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUMzQjtnQkFBUztZQUNULElBQUksS0FBSztnQkFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7U0FDckI7UUFDRCxPQUFPLEdBQUcsQ0FBQTtJQUNYLENBQUMsQ0FBQSxDQUFNLENBQUE7QUFDUixDQUFDLENBQUE7QUFFRCxNQUFNLENBQUMsTUFBTSxLQUFLLEdBQUcsQ0FBSSxLQUFVLEVBQUUsSUFBWSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUEifQ==