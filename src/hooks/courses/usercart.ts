import {useMutation} from "@tanstack/react-query";
import {message} from "antd";
import {axiosInstance} from "../../axios-Instance";
// import { axiosInstance } from '../../../../axios-Instance';
// import { errorAlert } from '../../../../utils';

const createOrder = async (data: any) => {
	const result = await axiosInstance.post("order", data);

	return result.data;
};

export const useIsUser = () => {
	const {mutateAsync, status, data} = useMutation({
		mutationFn: data => createOrder(data),
		onError(err) {
			message.error(err.message || "An unexpected error occurred.");
		},
	});
	return {
		createOrder: mutateAsync,
		isLoading: status === "pending",
		result: data,
	};
};

// Function to calculate the increased price
export function calculateIncreasedPrice(
	price: number,
	increasePercent: number
) {
	return price * (1 + increasePercent / 100);
}

// Function to display the original and increased prices
export function displayPrices(originalPrice: number, increasedPrice: number) {
	return `NGN${increasedPrice.toFixed(2)} NGN${originalPrice.toFixed(2)}`;
}
