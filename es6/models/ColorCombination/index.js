var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const retrieve = (url, query) => {
    return fetch(url, {
        method: 'POST',
        body: JSON.stringify({ query: `{${query}}` }),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        }
    })
        .then(e => e.json())
        .then(e => e.data);
};
const url = 'https://api.baseql.com/airtable/graphql/appMt27Uj2WHfsPP7';
export class Wrapper {
    constructor(combination) {
        var _a, _b;
        this.data = combination;
        this.coloredParts = ['shell', 'cabinet'].map(e => {
            var _a, _b;
            const partImage = combination[(e + 'Image')];
            return {
                name: e,
                image: (_a = partImage === null || partImage === void 0 ? void 0 : partImage[0]) === null || _a === void 0 ? void 0 : _a.url,
                color: (_b = combination[(e + 'Color')]) === null || _b === void 0 ? void 0 : _b[0]
            };
        });
        this.combinedColor = (_b = (_a = this.data.combinationColor) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : null;
    }
    getID() {
        return this.data.id;
    }
    get combinedImage() {
        var _a, _b;
        return (_b = (_a = this.data.combinationImage) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.url;
    }
}
export const getByProduct = (product) => __awaiter(void 0, void 0, void 0, function* () {
    return retrieve(url, `
	productColorCombinations( product : "${product}" ) {
		id
		shellColor {
			id
			name
			image
		}
		cabinetColor {
			id
			name
			image
		}
		combinationImage
		shellImage
		cabinetImage
		combinationColor {
			id
			name
			image
		}
	}
	`)
        .then(e => {
        console.log(e);
        return e;
    })
        .then(e => {
        var _a;
        return (_a = e === null || e === void 0 ? void 0 : e.productColorCombinations) === null || _a === void 0 ? void 0 : _a.map((e) => new Wrapper(e));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kZWxzL0NvbG9yQ29tYmluYXRpb24vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBRUEsTUFBTSxRQUFRLEdBQUcsQ0FBQyxHQUFXLEVBQUUsS0FBYSxFQUFFLEVBQUU7SUFDL0MsT0FBTyxLQUFLLENBQUMsR0FBRyxFQUFFO1FBQ2pCLE1BQU0sRUFBRSxNQUFNO1FBQ2QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQzdDLE9BQU8sRUFBRTtZQUNSLGNBQWMsRUFBRSxrQkFBa0I7WUFDbEMsTUFBTSxFQUFFLGtCQUFrQjtTQUMxQjtLQUNELENBQUM7U0FDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDbkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ3BCLENBQUMsQ0FBQTtBQUVELE1BQU0sR0FBRyxHQUFHLDJEQUEyRCxDQUFBO0FBSXZFLE1BQU0sT0FBTyxPQUFPO0lBT25CLFlBQVksV0FBNkI7O1FBQ3hDLElBQUksQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFBO1FBQ3ZCLElBQUksQ0FBQyxZQUFZLEdBQUksQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFOztZQUMzRCxNQUFNLFNBQVMsR0FDZCxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFrQyxDQUFDLENBQUE7WUFDNUQsT0FBTztnQkFDTixJQUFJLEVBQUUsQ0FBQztnQkFDUCxLQUFLLEVBQUUsTUFBQSxTQUFTLGFBQVQsU0FBUyx1QkFBVCxTQUFTLENBQUcsQ0FBQyxDQUFDLDBDQUFFLEdBQUc7Z0JBQzFCLEtBQUssRUFDSixNQUFBLFdBQVcsQ0FDVixDQUFDLENBQUMsR0FBRyxPQUFPLENBQWtDLENBQzlDLDBDQUFHLENBQUMsQ0FBQzthQUNQLENBQUE7UUFDRixDQUFDLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBQSxNQUFBLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLDBDQUFHLENBQUMsQ0FBQyxtQ0FBSSxJQUFJLENBQUE7SUFDN0QsQ0FBQztJQW5CRCxLQUFLO1FBQ0osT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQTtJQUNwQixDQUFDO0lBMkJELElBQUksYUFBYTs7UUFDaEIsT0FBTyxNQUFBLE1BQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsMENBQUcsQ0FBQyxDQUFDLDBDQUFFLEdBQUcsQ0FBQTtJQUM1QyxDQUFDO0NBQ0Q7QUFFRCxNQUFNLENBQUMsTUFBTSxZQUFZLEdBQUcsQ0FBTyxPQUFlLEVBQXNCLEVBQUU7SUFDekUsT0FBQyxRQUFRLENBQ1IsR0FBRyxFQUNIO3dDQUNzQyxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFxQjdDLENBQ2lCO1NBQ2hCLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDZCxPQUFPLENBQUMsQ0FBQTtJQUNULENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTs7UUFDVCxPQUFBLE1BQUEsQ0FBQyxhQUFELENBQUMsdUJBQUQsQ0FBQyxDQUFFLHdCQUF3QiwwQ0FBRSxHQUFHLENBQy9CLENBQUMsQ0FBbUIsRUFBRSxFQUFFLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQ3ZDLENBQUE7S0FBQSxDQUNELENBQUE7RUFBQSxDQUFBIn0=