"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByProduct = exports.Wrapper = void 0;
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
class Wrapper {
    constructor(combination) {
        this.data = combination;
        this.coloredParts = ['shell', 'cabinet'].map(e => {
            const partImage = combination[(e + 'Image')];
            return {
                name: e,
                image: partImage?.[0]?.url,
                color: combination[(e + 'Color')]?.[0]
            };
        });
        this.combinedColor = this.data.combinationColor?.[0] ?? null;
    }
    getID() {
        return this.data.id;
    }
    get combinedImage() {
        return this.data.combinationImage?.[0]?.url;
    }
}
exports.Wrapper = Wrapper;
const getByProduct = async (product) => retrieve(url, `
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
    .then(e => e?.productColorCombinations?.map((e) => new Wrapper(e)));
exports.getByProduct = getByProduct;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kZWxzL0NvbG9yQ29tYmluYXRpb24vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsTUFBTSxRQUFRLEdBQUcsQ0FBQyxHQUFXLEVBQUUsS0FBYSxFQUFFLEVBQUU7SUFDL0MsT0FBTyxLQUFLLENBQUMsR0FBRyxFQUFFO1FBQ2pCLE1BQU0sRUFBRSxNQUFNO1FBQ2QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQzdDLE9BQU8sRUFBRTtZQUNSLGNBQWMsRUFBRSxrQkFBa0I7WUFDbEMsTUFBTSxFQUFFLGtCQUFrQjtTQUMxQjtLQUNELENBQUM7U0FDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDbkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ3BCLENBQUMsQ0FBQTtBQUVELE1BQU0sR0FBRyxHQUFHLDJEQUEyRCxDQUFBO0FBSXZFLE1BQWEsT0FBTztJQU9uQixZQUFZLFdBQTZCO1FBQ3hDLElBQUksQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFBO1FBQ3ZCLElBQUksQ0FBQyxZQUFZLEdBQUksQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQzNELE1BQU0sU0FBUyxHQUNkLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQWtDLENBQUMsQ0FBQTtZQUM1RCxPQUFPO2dCQUNOLElBQUksRUFBRSxDQUFDO2dCQUNQLEtBQUssRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHO2dCQUMxQixLQUFLLEVBQ0osV0FBVyxDQUNWLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBa0MsQ0FDOUMsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUNQLENBQUE7UUFDRixDQUFDLENBQUMsQ0FBQTtRQUNGLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQTtJQUM3RCxDQUFDO0lBbkJELEtBQUs7UUFDSixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFBO0lBQ3BCLENBQUM7SUEyQkQsSUFBSSxhQUFhO1FBQ2hCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQTtJQUM1QyxDQUFDO0NBQ0Q7QUFuQ0QsMEJBbUNDO0FBRU0sTUFBTSxZQUFZLEdBQUcsS0FBSyxFQUFFLE9BQWUsRUFBc0IsRUFBRSxDQUN4RSxRQUFRLENBQ1IsR0FBRyxFQUNIO3dDQUNzQyxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFxQjdDLENBQ2lCO0tBQ2hCLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtJQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDZCxPQUFPLENBQUMsQ0FBQTtBQUNULENBQUMsQ0FBQztLQUNELElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUNULENBQUMsRUFBRSx3QkFBd0IsRUFBRSxHQUFHLENBQy9CLENBQUMsQ0FBbUIsRUFBRSxFQUFFLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQ3ZDLENBQ0QsQ0FBQTtBQW5DVSxRQUFBLFlBQVksZ0JBbUN0QiJ9