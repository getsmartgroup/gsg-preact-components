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
export const getByProduct = async (product) => retrieve(url, `
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kZWxzL0NvbG9yQ29tYmluYXRpb24vaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsTUFBTSxRQUFRLEdBQUcsQ0FBQyxHQUFXLEVBQUUsS0FBYSxFQUFFLEVBQUU7SUFDL0MsT0FBTyxLQUFLLENBQUMsR0FBRyxFQUFFO1FBQ2pCLE1BQU0sRUFBRSxNQUFNO1FBQ2QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQzdDLE9BQU8sRUFBRTtZQUNSLGNBQWMsRUFBRSxrQkFBa0I7WUFDbEMsTUFBTSxFQUFFLGtCQUFrQjtTQUMxQjtLQUNELENBQUM7U0FDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDbkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ3BCLENBQUMsQ0FBQTtBQUVELE1BQU0sR0FBRyxHQUFHLDJEQUEyRCxDQUFBO0FBSXZFLE1BQU0sT0FBTyxPQUFPO0lBT25CLFlBQVksV0FBNkI7UUFDeEMsSUFBSSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUE7UUFDdkIsSUFBSSxDQUFDLFlBQVksR0FBSSxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDM0QsTUFBTSxTQUFTLEdBQ2QsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBa0MsQ0FBQyxDQUFBO1lBQzVELE9BQU87Z0JBQ04sSUFBSSxFQUFFLENBQUM7Z0JBQ1AsS0FBSyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUc7Z0JBQzFCLEtBQUssRUFDSixXQUFXLENBQ1YsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFrQyxDQUM5QyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ1AsQ0FBQTtRQUNGLENBQUMsQ0FBQyxDQUFBO1FBQ0YsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFBO0lBQzdELENBQUM7SUFuQkQsS0FBSztRQUNKLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUE7SUFDcEIsQ0FBQztJQTJCRCxJQUFJLGFBQWE7UUFDaEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFBO0lBQzVDLENBQUM7Q0FDRDtBQUVELE1BQU0sQ0FBQyxNQUFNLFlBQVksR0FBRyxLQUFLLEVBQUUsT0FBZSxFQUFzQixFQUFFLENBQ3hFLFFBQVEsQ0FDUixHQUFHLEVBQ0g7d0NBQ3NDLE9BQU87Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztFQXFCN0MsQ0FDaUI7S0FDaEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO0lBQ1QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNkLE9BQU8sQ0FBQyxDQUFBO0FBQ1QsQ0FBQyxDQUFDO0tBQ0QsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQ1QsQ0FBQyxFQUFFLHdCQUF3QixFQUFFLEdBQUcsQ0FDL0IsQ0FBQyxDQUFtQixFQUFFLEVBQUUsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FDdkMsQ0FDRCxDQUFBIn0=