import React, {useContext} from "react";
import {FaTrash} from "react-icons/fa";
// import { formatAmount } from '../../../../../utils/formatAmount';
import {Row, Col, Image, Button} from "antd";

import Images from "../../../../../assets/covers/cover_10.jpg";
import {AuthContext} from "../../../context";
import {formatAmount} from "../../../utils/formatAmount";

interface CartCardProps {
	item: {
		_id: string;
		title: string;
		price: number;
		previewVideo?: string;
	};
}

export const CartCard: React.FC<CartCardProps> = ({item}) => {
	const {setCart, cart} = useContext(AuthContext);
	const previewVideo = item?.previewVideo;

	return (
		<div
			style={{
				position: "relative",
				width: "100%",
				height: "100%",
				boxSizing: "border-box",
				margin: "16px 0",
				borderTop: "1px solid #ccc",
				paddingTop: "16px",
			}}
		>
			<Row justify="space-between" align="middle">
				<Col>
					<Row align="middle" gutter={16}>
						<Col>
							{previewVideo ? (
								<video src={previewVideo} controls />
							) : (
								<Image src={Images} />
							)}
						</Col>
						<Col>
							<div style={{marginLeft: "24px", fontWeight: 600}}>
								{item?.title}
							</div>
						</Col>
					</Row>
				</Col>
				<Col>
					<Row align="middle" gutter={24}>
						<Col style={{fontWeight: 600}}>
							₦{formatAmount(item?.price?.toString(), false)}
						</Col>
						<Col>
							<Button
								onClick={() => {
									const updatedCart = cart.filter(it => it._id !== item._id);
									setCart(updatedCart);
									localStorage.setItem(
										"cart",
										JSON.stringify(cart.filter(it => it._id !== item._id))
									);
								}}
								type="primary"
								danger
								icon={<FaTrash />}
							/>
						</Col>
					</Row>
				</Col>
			</Row>
		</div>
	);
};
