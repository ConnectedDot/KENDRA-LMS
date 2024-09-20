import React, {useCallback, useContext} from "react";
import {Button, Layout, Typography, Row, Col, Card, Spin} from "antd";
import {useNavigate} from "react-router-dom";
import {usePaystackPayment} from "react-paystack";
import {useQueryClient} from "@tanstack/react-query";
import {AuthContext} from "../../context";
import {CartCard} from "./components/cartcard";
import {EmptyCart} from "./components/emptycart";
import {queryKeys} from "../../react-query/constants";
import {PrivatePaths} from "../../routes/path";
import {MdArrowBack} from "react-icons/md";
import {formatAmount} from "../../utils/formatAmount";
import {useIsUser} from "../../hooks/courses/usercart";

const {Content} = Layout;
const {Title, Text} = Typography;

const CartPage: React.FC = () => {
	const {cart, user, setCart, setIsSignIn} = useContext(
		AuthContext
	) as unknown as {
		cart: Array<{price: number; _id: string; image: string; title: string}>;
		user: {email: string};
		setCart: React.Dispatch<React.SetStateAction<any[]>>;
		setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>;
	};
	const {createOrder, isLoading} = useIsUser();
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const handleGoBack = () => {
		navigate(-1);
	};

	const amount = useCallback(
		() => cart.map(it => it.price).reduce((a, b) => Number(a) + Number(b), 0),
		[cart]
	);

	const init = usePaystackPayment({
		amount: Number(amount()) * 100,
		email: user?.email,
		label: "Course purchase",
		publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY || "",
		onSuccess: () => {},
		onClose: () => {},
	});

	const data = {
		price: amount(),
		email: user?.email,
		items: cart.map(it => ({type: "Course", source: it._id, Image: it.image})),
	};

	return (
		<Layout>
			<Content style={{padding: "0 50px"}}>
				<Row
					justify="space-between"
					align="middle"
					style={{marginBottom: "20px"}}
				>
					<button
						className="flex items-center mb-1 text-sm gap-3 font-medium text-gray-700 rounded-xl py-2 px-4 dark:bg-white dark:text-gray-600 dark:hover:text-black"
						onClick={handleGoBack}
					>
						<MdArrowBack /> Go Back
					</button>
				</Row>
				<Row justify="center" style={{height: "70vh", background: "#f0f2f5"}}>
					<Col span={18}>
						<Card title="Cart" bordered={false} style={{width: "100%"}}>
							<Text strong>
								{cart?.length > 1
									? `${cart?.length} courses`
									: `${cart?.length} course`}{" "}
								in the cart
							</Text>
							<br />
							<br />
							{cart?.length > 0 ? (
								cart.map(item => (
									<CartCard
										item={{...item, title: item.title || "Untitled"}}
										key={item?._id}
									/>
								))
							) : (
								<EmptyCart />
							)}
							<Card
								style={{marginTop: "20px", backgroundColor: "#fafafa"}}
								bodyStyle={{padding: "20px"}}
							>
								<Row justify="space-between" align="middle">
									<Title level={4}>Sub Total</Title>
									<Title level={4}>₦{formatAmount(amount()?.toString())}</Title>
								</Row>
								<Button
									type="primary"
									block
									size="large"
									loading={isLoading}
									onClick={() => {
										if (!amount()) return;
										if (user) {
											createOrder(data as any).then((res: any) => {
												init();
											});
										} else {
											setIsSignIn(true);
										}
									}}
								>
									Place order
								</Button>
							</Card>
						</Card>
					</Col>
				</Row>
			</Content>
		</Layout>
	);
};

export default CartPage;
