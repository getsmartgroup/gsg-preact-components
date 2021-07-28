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
import { CheckAll, CheckboxIndex } from '../../components/CheckList';
import { SimplePanel } from '../../components/SimpleAccordion';
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
                h(CheckAll, null),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvd2MvcHJvZHVjdC9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBc0IsTUFBTSxrQkFBa0IsQ0FBQTtBQUUzRixPQUFPLEVBQXVDLENBQUMsRUFBRSxNQUFNLFFBQVEsQ0FBQTtBQUMvRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFDN0QsT0FBTyxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQTtBQUNwRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sa0NBQWtDLENBQUE7QUFDOUQsT0FBTyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsTUFBTSxZQUFZLENBQUE7QUFFakQsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLEdBQUcsRUFBRTtJQUM5QixNQUFNLElBQUksR0FBRyxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQTtJQUN4QyxPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUMzQixDQUFDLENBQUE7QUFRRCxNQUFNLENBQUMsTUFBTSxTQUFTLEdBQTZFLENBQUUsRUFBNkIsRUFBRyxFQUFFO1FBQWxDLEVBQUUsUUFBUSxFQUFFLEtBQUssT0FBWSxFQUFQLEtBQUssY0FBM0IscUJBQTZCLENBQUY7SUFFL0gsTUFBTSxPQUFPLEdBQUcsVUFBVSxFQUFFLENBQUE7SUFFNUIsTUFBTSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsR0FBRyxRQUFRLENBQWtDLEVBQUUsQ0FBQyxDQUFBO0lBRXZFLE1BQU0sY0FBYyxHQUFHLFdBQVcsQ0FDakMsR0FBRyxFQUFFO1FBQ0osT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFFLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDekQsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLEVBQUUsQ0FBQTtZQUNyQixJQUFLLEVBQUUsRUFBRztnQkFDVCxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUE7YUFDN0I7aUJBQU07Z0JBQ04sT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUE7YUFDNUI7UUFDRixDQUFDLENBQUUsQ0FBRSxDQUFBO0lBQ04sQ0FBQyxFQUNELENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUNoQixDQUFBO0lBRUQsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxTQUFTLENBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFFLENBQUE7SUFFakcsT0FBTyxDQUNOLEVBQUMsYUFBYSxrQkFBQyxJQUFJLEVBQUMsVUFBVSxFQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsSUFBc0MsRUFBRSxJQUFnQixFQUFFLEVBQUUsR0FBRSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQXdDLEVBQUUsS0FBSyxFQUFFLEtBQUssSUFBTSxLQUFLO1FBQzdMLEVBQUMsV0FBVyxJQUFDLEtBQUssRUFBRSxDQUNuQixFQUFDLE1BQU0sSUFBQyxDQUFDLEVBQUMsTUFBTTtnQkFDZixFQUFDLFFBQVEsT0FBRTtnQkFDWCxFQUFDLEdBQUc7b0JBQ0YsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNOztvQkFBWSxHQUFHO29CQUMxQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU07O29CQUFZLEdBQUc7b0JBQzFDLFFBQVEsQ0FBQyxNQUFNOztvQkFBYSxHQUFHO29CQUMvQixNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsTUFBTTtxQ0FDekM7Z0JBQ04sRUFBQyxNQUFNLE9BQUU7Z0JBQ1IsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLE9BQU8sT0FBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7Z0JBQ3RDLEVBQUMsTUFBTSxJQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxjQUFjLGFBQWtCLENBQ3BFLENBQ1QsSUFDQyxRQUFRLENBQ0ksQ0FDQyxDQUNoQixDQUFBO0FBQ0YsQ0FBQyxDQUFBIn0=