import {Link, useNavigate} from "react-router-dom";
import {Row, Col, Typography, Button, Card, Select} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {useState} from "react";
import Navbarin from "../../../layout/Instructor/Navbar";

const {Option} = Select;

interface Product {
	_id: string;
	name: string;
	image: string;
	price: number;
	countInStock: number;
	qty: number;
}

const CartScreen = () => {
	const navigate = useNavigate();
	const [cartItems, setCartItems] = useState<Product[]>([]);

	const handleGoBack = () => {
		navigate(-1);
	};

	const addToCartHandler = (product: Product, qty: number) => {
		setCartItems(oldCartItems =>
			oldCartItems.map(item =>
				item._id === product._id ? {...item, qty} : item
			)
		);
	};

	const removeFromCartHandler = (id: string) => {
		setCartItems(oldCartItems => oldCartItems.filter(item => item._id !== id));
	};

	const checkoutHandler = () => {
		navigate("/app/admn/pharmacy/shipping");
	};

	return (
		<Navbarin title={"Cart management | Kendra LMS"}>
			<div style={{maxWidth: "1200px", margin: "0 auto"}}>
				<Row gutter={16}>
					<Col span={16}>
						<Typography.Title level={4}>Cart</Typography.Title>
						{cartItems.length === 0 ? (
							<div>
								Your cart is currently empty{" "}
								<Link to="#" onClick={handleGoBack}>
									Go Back
								</Link>
							</div>
						) : (
							cartItems.map(item => (
								<Row gutter={16} key={item._id} style={{marginBottom: "16px"}}>
									<Col span={4}>
										<img
											src={item.image}
											alt={item.name}
											style={{width: "100%", height: "auto"}}
										/>
									</Col>
									<Col span={6}>
										<Link to={`/product/${item._id}`}>{item.name}</Link>
									</Col>
									<Col span={4}>${item.price}</Col>
									{/* <Col span={4}>
                    <Select
                      value={item.qty}
                      onChange={(value) => addToCartHandler(item, value)}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <Option key={x + 1} value={x + 1}>
                          {x + 1}
                        </Option>
                      ))}
                    </Select>
                  </Col> */}
									<Col span={4}>
										<Button
											type="primary"
											danger
											icon={<DeleteOutlined />}
											onClick={() => removeFromCartHandler(item._id)}
										/>
									</Col>
								</Row>
							))
						)}
					</Col>
					<Col span={8}>
						<Card>
							<Typography.Title level={5}>
								Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
								items
							</Typography.Title>
							<Typography.Text>
								$
								{cartItems
									.reduce((acc, item) => acc + item.qty * item.price, 0)
									.toFixed(2)}
							</Typography.Text>
							<Button
								type="primary"
								disabled={cartItems.length === 0}
								onClick={checkoutHandler}
								block
							>
								Proceed To Checkout
							</Button>
						</Card>
					</Col>
				</Row>
			</div>
		</Navbarin>
	);
};

export default CartScreen;
