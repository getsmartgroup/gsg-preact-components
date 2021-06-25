import { useBoolean } from '@chakra-ui/react';
import { useEffect, useState } from 'preact/hooks';
export const usePromiseCall = (promiseCall, inputs = []) => {
    const [resolved, setResolved] = useState(null);
    const [rejected, setRejected] = useState(null);
    const [loading, setLoading] = useBoolean(true);
    useEffect(() => {
        setResolved(null);
        setRejected(null);
        setLoading.on();
        if (promiseCall) {
            promiseCall()
                .then(setResolved)
                .catch(setRejected)
                .finally(setLoading.off);
        }
    }, inputs);
    return {
        resolved,
        rejected,
        loading
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9va3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaG9va3MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGtCQUFrQixDQUFBO0FBQzdDLE9BQU8sRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sY0FBYyxDQUFBO0FBRWxELE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRyxDQUFzQixXQUE4QixFQUFFLFNBQWdCLEVBQUUsRUFBRSxFQUFFO0lBQ3pHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLEdBQUcsUUFBUSxDQUFXLElBQUksQ0FBQyxDQUFBO0lBQ3hELE1BQU0sQ0FBQyxRQUFRLEVBQUUsV0FBVyxDQUFDLEdBQUcsUUFBUSxDQUFNLElBQUksQ0FBQyxDQUFBO0lBQ25ELE1BQU0sQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzlDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7UUFDZCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDakIsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2pCLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQTtRQUNmLElBQUksV0FBVyxFQUFFO1lBQ2hCLFdBQVcsRUFBRTtpQkFDWCxJQUFJLENBQUMsV0FBVyxDQUFDO2lCQUNqQixLQUFLLENBQUMsV0FBVyxDQUFDO2lCQUNsQixPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1NBQ3pCO0lBQ0YsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQ1YsT0FBTztRQUNOLFFBQVE7UUFDUixRQUFRO1FBQ1IsT0FBTztLQUNQLENBQUE7QUFDRixDQUFDLENBQUEifQ==