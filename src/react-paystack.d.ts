declare module "react-paystack" {
	import * as React from "react";

	interface PaystackProps {
		label: string;
		email: string;
		amount: number;
		publicKey: string;
		text?: string;
		onSuccess: (reference: any) => void;
		onClose: () => void;
	}

	export const PaystackButton: React.FC<PaystackProps>;
	export const usePaystackPayment: (options: PaystackProps) => () => void;
}
