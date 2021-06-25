import { h } from 'preact';
import { rb } from 'gsg-integrations';
import { usePromiseCall } from '../../hooks';
import { useCallback, useState } from 'preact/hooks';
import { Button, Heading, VStack } from '@chakra-ui/react';
import { SimpleAccordion, SimplePanel } from '../SimpleAccordion';
import RadioOptions from '../RadioOptions';
const RBDashboard = ({ rbC, wcC }) => {
    const depts = usePromiseCall(useCallback(rbC.getDepartments, [rbC]), [rbC]);
    const [dept, setDept] = useState(null);
    const cats = usePromiseCall(useCallback(dept ? rbC.getCategories.bind(null, dept) : () => Promise.resolve([]), [dept]), [dept]);
    const [cat, setCat] = useState(null);
    const syncProducts = useCallback(() => {
        if (!dept || !cat) {
            return;
        }
        rbC.getProducts(dept, cat).then(rb.syncProductsWithWooCommerce);
    }, [dept, cat]);
    return (h(VStack, null,
        h(Heading, null, "RB Integration Dashboard"),
        h(SimpleAccordion, null,
            h(SimplePanel, { title: 'Sync Products' },
                h(VStack, null,
                    depts.resolved ? (h(RadioOptions, { onChange: setDept, options: depts.resolved })) : ('Loading Deparments'),
                    cats.resolved ? h(RadioOptions, { cats: setCat, options: cats.resolved }) : 'Loading Categories',
                    h(Button, { onChange: syncProducts, disabled: !dept || !cat }, "Sync Products"))))));
};
export default RBDashboard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9SQkRhc2hib2FyZC9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUF1QixDQUFDLEVBQUUsTUFBTSxRQUFRLENBQUE7QUFDL0MsT0FBTyxFQUFFLEVBQUUsRUFBTSxNQUFNLGtCQUFrQixDQUFBO0FBQ3pDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxhQUFhLENBQUE7QUFDNUMsT0FBTyxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsTUFBTSxjQUFjLENBQUE7QUFDcEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sa0JBQWtCLENBQUE7QUFDMUQsT0FBTyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQTtBQUNqRSxPQUFPLFlBQVksTUFBTSxpQkFBaUIsQ0FBQTtBQU8xQyxNQUFNLFdBQVcsR0FBK0IsQ0FBQyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFO0lBQ2hFLE1BQU0sS0FBSyxHQUFHLGNBQWMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQzNFLE1BQU0sQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUcsUUFBUSxDQUFnQixJQUFJLENBQUMsQ0FBQTtJQUNyRCxNQUFNLElBQUksR0FBRyxjQUFjLENBQzFCLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQzFGLENBQUMsSUFBSSxDQUFDLENBQ04sQ0FBQTtJQUNELE1BQU0sQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFnQixJQUFJLENBQUMsQ0FBQTtJQUNuRCxNQUFNLFlBQVksR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFO1FBQ3JDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDbEIsT0FBTTtTQUNOO1FBQ0QsR0FBRyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQyxDQUFBO0lBQ2hFLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBQ2YsT0FBTyxDQUNOLEVBQUMsTUFBTTtRQUNOLEVBQUMsT0FBTyxtQ0FBbUM7UUFDM0MsRUFBQyxlQUFlO1lBQ2YsRUFBQyxXQUFXLElBQUMsS0FBSyxFQUFDLGVBQWU7Z0JBQ2pDLEVBQUMsTUFBTTtvQkFDTCxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUNqQixFQUFDLFlBQVksSUFBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsUUFBUSxHQUFJLENBQzVELENBQUMsQ0FBQyxDQUFDLENBQ0gsb0JBQW9CLENBQ3BCO29CQUNBLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUMsWUFBWSxJQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLEdBQUksQ0FBQyxDQUFDLENBQUMsb0JBQW9CO29CQUM5RixFQUFDLE1BQU0sSUFBQyxRQUFRLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxDQUFDLElBQUksSUFBSSxDQUFDLEdBQUcsb0JBRTlDLENBQ0QsQ0FDSSxDQUNHLENBQ1YsQ0FDVCxDQUFBO0FBQ0YsQ0FBQyxDQUFBO0FBQ0QsZUFBZSxXQUFXLENBQUEifQ==