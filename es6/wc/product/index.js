import { useWC, useRestClient } from '../context';
export const useProduct = () => {
    const crud = useWC().client.Product.crud;
    return useRestClient(crud);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvd2MvcHJvZHVjdC9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsTUFBTSxZQUFZLENBQUE7QUFFakQsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLEdBQUcsRUFBRTtJQUM5QixNQUFNLElBQUksR0FBRyxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQTtJQUN4QyxPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUMzQixDQUFDLENBQUEifQ==