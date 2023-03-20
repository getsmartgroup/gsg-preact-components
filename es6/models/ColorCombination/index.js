var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const retrieve = (product) => {
    return fetch(`http://localhost:3000/api/products/${product}/colors`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    })
        .then(e => e.json());
};
export class Wrapper {
    getID() {
        return this.data.id;
    }
    constructor(combination) {
        var _a, _b;
        this.data = combination;
        this.coloredParts = ['shell', 'cabinet'].map(e => {
            var _a;
            const partImage = combination[(e + 'ImageCloudUrl')];
            return {
                name: e,
                image: partImage,
                color: (_a = combination[(e + 'Color')]) === null || _a === void 0 ? void 0 : _a[0]
            };
        });
        this.combinedColor = (_b = (_a = this.data.combinationColor) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : null;
    }
    get combinedImage() {
        var _a, _b;
        return (_b = (_a = this.data.combinationImageCloudUrl) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.url;
    }
}
export const getByProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    return retrieve(product)
        .then(e => {
        console.log(e);
        return e;
    })
        .then(e => {
        var _a;
        return (_a = e === null || e === void 0 ? void 0 : e.productColorCombinations) === null || _a === void 0 ? void 0 : _a.map((e) => new Wrapper(e));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kZWxzL0NvbG9yQ29tYmluYXRpb24vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBRUEsTUFBTSxRQUFRLEdBQUcsQ0FBQyxPQUFlLEVBQUUsRUFBRTtJQUNwQyxPQUFPLEtBQUssQ0FBQyxzQ0FBc0MsT0FBTyxTQUFTLEVBQUU7UUFDcEUsTUFBTSxFQUFFLEtBQUs7UUFDYixPQUFPLEVBQUU7WUFDUixjQUFjLEVBQUUsa0JBQWtCO1lBQ2xDLE1BQU0sRUFBRSxrQkFBa0I7U0FDMUI7S0FDRCxDQUFDO1NBQ0QsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7QUFDckIsQ0FBQyxDQUFBO0FBSUQsTUFBTSxPQUFPLE9BQU87SUFHbkIsS0FBSztRQUNKLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUE7SUFDcEIsQ0FBQztJQUVELFlBQVksV0FBNkI7O1FBQ3hDLElBQUksQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFBO1FBQ3ZCLElBQUksQ0FBQyxZQUFZLEdBQUksQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFOztZQUMzRCxNQUFNLFNBQVMsR0FDZCxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsZUFBZSxDQUFrRCxDQUFDLENBQUE7WUFDcEYsT0FBTztnQkFDTixJQUFJLEVBQUUsQ0FBQztnQkFDUCxLQUFLLEVBQUUsU0FBUztnQkFDaEIsS0FBSyxFQUNKLE1BQUEsV0FBVyxDQUNWLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBa0MsQ0FDOUMsMENBQUcsQ0FBQyxDQUFDO2FBQ1AsQ0FBQTtRQUNGLENBQUMsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFBLE1BQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsMENBQUcsQ0FBQyxDQUFDLG1DQUFJLElBQUksQ0FBQTtJQUM3RCxDQUFDO0lBVUQsSUFBSSxhQUFhOztRQUNoQixPQUFPLE1BQUEsTUFBQSxJQUFJLENBQUMsSUFBSSxDQUFDLHdCQUF3QiwwQ0FBRyxDQUFDLENBQUMsMENBQUUsR0FBRyxDQUFBO0lBQ3BELENBQUM7Q0FDRDtBQUVELE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxDQUFPLE9BQWUsRUFBc0IsRUFBRTtJQUN6RSxPQUFDLFFBQVEsQ0FDUixPQUFPLENBQ1U7U0FDaEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNkLE9BQU8sQ0FBQyxDQUFBO0lBQ1QsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFOztRQUNULE9BQUEsTUFBQSxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsd0JBQXdCLDBDQUFFLEdBQUcsQ0FDL0IsQ0FBQyxDQUFtQixFQUFFLEVBQUUsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FDdkMsQ0FBQTtLQUFBLENBQ0QsQ0FBQTtFQUFBLENBQUEifQ==