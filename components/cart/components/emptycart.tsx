import React from "react";
import {Row, Col} from "antd";

export const EmptyCart: React.FC = () => {
	return (
		<Row
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<Col style={{marginTop: "24px"}}>Cart is empty</Col>
		</Row>
	);
};
