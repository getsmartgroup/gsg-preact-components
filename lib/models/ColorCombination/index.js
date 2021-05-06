"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByProduct = exports.Wrapper = void 0;
const asas_virtuais_ts_1 = require("asas-virtuais-ts");
const asas_virtuais_airtable_1 = require("asas-virtuais-airtable");
const url = 'https://api.baseql.com/airtable/graphql/appMt27Uj2WHfsPP7';
class Wrapper extends asas_virtuais_ts_1.AbstractWrapper {
    constructor(combination) {
        super(combination);
        this.coloredParts = ['shell', 'cabinet'].map(e => {
            const partImage = combination[(e + 'Image')];
            return {
                name: e,
                image: partImage?.[0]?.url,
                color: combination[e]?.[0]
            };
        });
        this.combinedColor = this.data.combinationColor?.[0]?.name
            ? combination
            : null;
    }
    getID() {
        return this.data.id;
    }
    get combinedImage() {
        return this.data.combinationImage?.[0]?.url;
    }
}
exports.Wrapper = Wrapper;
const getByProduct = async (product) => asas_virtuais_airtable_1.BaseQL.retrieve(url, `
	productColorCombinations( product : "${product}" ) {
		id
		shell {
			name
		}
		cabinet {
			name
		}
		combinationImage
		shellImage
		cabinetImage
		combinationColor {
			name
		}
		combinationColorImage
		cabinetColorImage
		shellColorImage
	}
	`)
    .then(e => {
    console.log(e);
    return e;
})
    .then(e => e?.productColorCombinations?.map((e) => new Wrapper(e)));
exports.getByProduct = getByProduct;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kZWxzL0NvbG9yQ29tYmluYXRpb24vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdURBQWtEO0FBQ2xELG1FQUErQztBQUcvQyxNQUFNLEdBQUcsR0FBRywyREFBMkQsQ0FBQTtBQUl2RSxNQUFhLE9BQVEsU0FBUSxrQ0FBaUM7SUFLN0QsWUFBWSxXQUE2QjtRQUN4QyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDbEIsSUFBSSxDQUFDLFlBQVksR0FBSSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDM0QsTUFBTSxTQUFTLEdBQ2QsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBa0MsQ0FBQyxDQUFBO1lBQzVELE9BQU87Z0JBQ04sSUFBSSxFQUFFLENBQUM7Z0JBQ1AsS0FBSyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUc7Z0JBQzFCLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBa0MsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQzNELENBQUE7UUFDRixDQUFDLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUk7WUFDekQsQ0FBQyxDQUFDLFdBQVc7WUFDYixDQUFDLENBQUMsSUFBSSxDQUFBO0lBQ1IsQ0FBQztJQWxCRCxLQUFLO1FBQ0osT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQTtJQUNwQixDQUFDO0lBMEJELElBQUksYUFBYTtRQUNoQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUE7SUFDNUMsQ0FBQztDQUNEO0FBaENELDBCQWdDQztBQUVNLE1BQU0sWUFBWSxHQUFHLEtBQUssRUFBRSxPQUFlLEVBQXNCLEVBQUUsQ0FDeEUsK0JBQU0sQ0FBQyxRQUFRLENBQ2YsR0FBRyxFQUNIO3dDQUNzQyxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFrQjdDLENBQ2lCO0tBQ2hCLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtJQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDZCxPQUFPLENBQUMsQ0FBQTtBQUNULENBQUMsQ0FBQztLQUNELElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUNULENBQUMsRUFBRSx3QkFBd0IsRUFBRSxHQUFHLENBQy9CLENBQUMsQ0FBbUIsRUFBRSxFQUFFLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQ3ZDLENBQ0QsQ0FBQTtBQWhDVSxRQUFBLFlBQVksZ0JBZ0N0QiJ9