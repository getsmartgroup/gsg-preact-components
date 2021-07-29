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
import { Box, Button, HStack, Spacer, Spinner } from '@chakra-ui/react';
import { h } from 'preact';
import { useCallback, useMemo, useState } from 'preact/hooks';
import { CheckboxIndexAll, CheckboxIndex } from '@components/CheckboxIndex';
import { SimplePanel } from '@components/SimpleAccordion';
import { useWC, useRestClient } from '../context';
export const useProduct = () => {
    const crud = useWC().client.Product.crud;
    return useRestClient(crud);
};
export const PreImport = (_a) => {
    var { children, index } = _a, props = __rest(_a, ["children", "index"]);
    const Product = useProduct();
    const [value, setValue] = useState({});
    const importProducts = useCallback(() => {
        return Promise.all(Object.values(value).map((product) => {
            const id = product.id;
            if (id) {
                Product.crud.put(id, product);
            }
            else {
                Product.crud.create(product);
            }
        }));
    }, [Product, value]);
    const existing = useMemo(() => Object.values(value).filter(p => p.id !== undefined), [value]);
    return (h(CheckboxIndex, Object.assign({ name: 'products', onChangeIndex: ((data, _ids) => { setValue(data); }), index: index }, props),
        h(SimplePanel, { title: (h(HStack, { w: '100%' },
                h(CheckboxIndexAll, null),
                h(Box, null,
                    Object.values(index).length,
                    " products,",
                    ' ',
                    Object.values(value).length,
                    " selected,",
                    ' ',
                    existing.length,
                    " to update,",
                    ' ',
                    Object.values(value).length - existing.length,
                    " to be created"),
                h(Spacer, null),
                Product.loading ? (h(Spinner, null)) : null,
                h(Button, { disabled: Product.loading, onClick: importProducts }, "Import"))) }, children)));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvd2MvcHJvZHVjdC9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBc0IsTUFBTSxrQkFBa0IsQ0FBQTtBQUUzRixPQUFPLEVBQXVDLENBQUMsRUFBRSxNQUFNLFFBQVEsQ0FBQTtBQUMvRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFDN0QsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGFBQWEsRUFBRSxNQUFNLDJCQUEyQixDQUFBO0FBQzNFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQTtBQUN6RCxPQUFPLEVBQUUsS0FBSyxFQUFFLGFBQWEsRUFBRSxNQUFNLFlBQVksQ0FBQTtBQUVqRCxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUcsR0FBRyxFQUFFO0lBQzlCLE1BQU0sSUFBSSxHQUFHLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFBO0lBQ3hDLE9BQU8sYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQzNCLENBQUMsQ0FBQTtBQVFELE1BQU0sQ0FBQyxNQUFNLFNBQVMsR0FBNkUsQ0FBRSxFQUE2QixFQUFHLEVBQUU7UUFBbEMsRUFBRSxRQUFRLEVBQUUsS0FBSyxPQUFZLEVBQVAsS0FBSyxjQUEzQixxQkFBNkIsQ0FBRjtJQUUvSCxNQUFNLE9BQU8sR0FBRyxVQUFVLEVBQUUsQ0FBQTtJQUU1QixNQUFNLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxHQUFHLFFBQVEsQ0FBa0MsRUFBRSxDQUFDLENBQUE7SUFFdkUsTUFBTSxjQUFjLEdBQUcsV0FBVyxDQUNqQyxHQUFHLEVBQUU7UUFDSixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUN6RCxNQUFNLEVBQUUsR0FBRyxPQUFPLENBQUMsRUFBRSxDQUFBO1lBQ3JCLElBQUssRUFBRSxFQUFHO2dCQUNULE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQTthQUM3QjtpQkFBTTtnQkFDTixPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTthQUM1QjtRQUNGLENBQUMsQ0FBRSxDQUFFLENBQUE7SUFDTixDQUFDLEVBQ0QsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQ2hCLENBQUE7SUFFRCxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUUsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLFNBQVMsQ0FBRSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUUsQ0FBQTtJQUVqRyxPQUFPLENBQ04sRUFBQyxhQUFhLGtCQUFDLElBQUksRUFBQyxVQUFVLEVBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxJQUFzQyxFQUFFLElBQWdCLEVBQUUsRUFBRSxHQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFBLENBQUMsQ0FBd0MsRUFBRSxLQUFLLEVBQUUsS0FBSyxJQUFNLEtBQUs7UUFDN0wsRUFBQyxXQUFXLElBQUMsS0FBSyxFQUFFLENBQ25CLEVBQUMsTUFBTSxJQUFDLENBQUMsRUFBQyxNQUFNO2dCQUNmLEVBQUMsZ0JBQWdCLE9BQUU7Z0JBQ25CLEVBQUMsR0FBRztvQkFDRixNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU07O29CQUFZLEdBQUc7b0JBQzFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTTs7b0JBQVksR0FBRztvQkFDMUMsUUFBUSxDQUFDLE1BQU07O29CQUFhLEdBQUc7b0JBQy9CLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNO3FDQUN6QztnQkFDTixFQUFDLE1BQU0sT0FBRTtnQkFDUixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsT0FBTyxPQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTtnQkFDdEMsRUFBQyxNQUFNLElBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLGNBQWMsYUFBa0IsQ0FDcEUsQ0FDVCxJQUNDLFFBQVEsQ0FDSSxDQUNDLENBQ2hCLENBQUE7QUFDRixDQUFDLENBQUEifQ==