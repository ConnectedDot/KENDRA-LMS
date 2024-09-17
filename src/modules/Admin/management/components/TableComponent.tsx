import React, {useContext, useEffect, useState} from "react";
import {
	Table,
	Space,
	Input,
	Button,
	Form,
	Modal,
	Tag,
	DatePicker,
	TimePicker,
	Avatar,
	Card,
	Select,
} from "antd";
import type {
	DatePickerProps,
	TableColumnsType,
	TablePaginationConfig,
	TableProps,
} from "antd";
import eye from "../../../../assets/icons/Vector (3).png";
import trash from "../../../../assets/icons/material-symbols_delete-outline.png";
import {useIsFetching, useIsMutating} from "@tanstack/react-query";
import {CloseOutlined} from "@ant-design/icons";
import type {TimePickerProps} from "antd";
import {Dayjs} from "dayjs";
import {useFetchUsers} from "../../hooks/querry";

interface FormData {
	commodity: any;
	previous_price: string;
	new_price: string;
	effective_date: string;
	effective_time: string;
	reason_for_change: string;
	tags: string[];
	name: any;
}
interface DataType {
	email: string;
	firstName: string;
	lastName: string;
	role: string;
	isVerified: boolean;
	password: string;
	gender: string;
	photo: string;
	registeredAt?: Date | string;
}

const TableComponent = () => {
	const [confirmLoading, setConfirmLoading] = React.useState(false);
	const [configuration, setConfiguration] = React.useState<DataType | null>(
		null
	);

	const [mappedData, setMappedData] = useState<DataType[]>([]);
	const [filterData, setFilterData] = useState<DataType[]>([]);

	const [modalVisible, setModalVisible] = useState(false);
	const [open, setOpen] = React.useState(false);
	const [isOpen, setIsOpen] = React.useState(false);
	const loading = useIsFetching();

	const isLoading = useIsMutating();
	const [form] = Form.useForm();

	const [showCalendar, setShowCalendar] = useState(false);

	const [formData, setFormData] = useState<FormData>({
		commodity: "",
		previous_price: "",
		new_price: "",
		effective_date: "",
		effective_time: "",
		reason_for_change: "",
		tags: [],
		name: "",
	});

	const DatabaseUsers = useFetchUsers();

	console.log(DatabaseUsers, "users");

	const handleEyeClick = (record: DataType) => {
		setConfiguration(record);
		setIsOpen(true);
		setModalVisible(true);
	};

	const showPopconfirm = (record: DataType) => {
		setConfiguration(record);
		setOpen(true);
	};

	const handleCancel = () => {
		setOpen(false);
	};

	const handleOk = () => {
		setConfirmLoading(true);
		setTimeout(() => {
			setOpen(false);
			setConfirmLoading(false);
		}, 2000);
		if (configuration) {
			setOpen(false);
			// Delete(configuration?._id);
		}
	};

	useEffect(() => {
		if (DatabaseUsers) {
			setMappedData(DatabaseUsers);
		}
	}, []);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {name, value} = e.target;
		setFormData({...formData, [name]: value});
	};

	const handleDateInput = (
		value: DatePickerProps["value"],
		dateString: string | string[]
	) => {
		if (typeof dateString === "string") {
			setFormData({
				...formData,
				effective_date: dateString ? dateString : "",
			});
		}
	};
	const handleTimeChange = (
		value: TimePickerProps["value"],
		timeString: string | string[]
	) => {
		if (typeof timeString === "string") {
			setFormData({
				...formData,
				effective_time: timeString ? timeString : "",
			});
		}
	};

	const [tableProps, setTableProps] = useState<TablePaginationConfig>({
		pageSize: 5,
	});

	const onChange: TableProps<DataType>["onChange"] = (
		pagination,
		filters,
		sorter,
		extra
	) => {
		setTableProps(pagination);
	};

	// const columns: TableColumnsType<DataType> = [
	//   {
	//     title: "S/N",
	//     dataIndex: "number",
	//     width: 80,
	//     key: "number",
	//     align: "center",
	//     render: (text, record, index) => {
	//       const pageNumber = tableProps.current || 1;
	//       const pageSize = tableProps.pageSize || 5;
	//       return (pageNumber - 1) * pageSize + index + 1;
	//     },
	//   },
	//   {
	//     title: "Commodity",
	//     dataIndex: ["commodity", "commodityId", "name"],
	//     align: "left",
	//     key: "name",
	//     width: 150,
	//     render: text => (
	//       <div style={{height: "40px", display: "flex", alignItems: "center"}}>
	//         {text}
	//       </div>
	//     ),
	//     filters: mappedData
	//       ?.map((c: any) => c?.commodity?.commodityId?.name)
	//       ?.filter(
	//         (value: string, index: number, self: string[]) =>
	//           self.indexOf(value) === index
	//       )
	//       .map((name: string) => ({
	//         text: name,
	//         value: name,
	//       })),
	//     filterMode: "menu",
	//     filterSearch: true,
	//     onFilter: (value: React.Key | boolean, record: DataType) => {
	//       if (typeof value === "string") {
	//         return record?.commodity?.commodityId?.name?.includes(value);
	//       }
	//       return false;
	//     },
	//   },
	//   {
	//     title: "Previous Price",
	//     dataIndex: "previous_price",
	//     align: "left",
	//     key: "previous_price",
	//     width: 150,
	//     render: text => (
	//       <div style={{height: "40px", display: "flex", alignItems: "center"}}>
	//         {text?.toLocaleString()}
	//       </div>
	//     ),
	//   },
	//   {
	//     title: "Current Price",
	//     dataIndex: "new_price",
	//     align: "left",
	//     key: "current_price",
	//     width: 150,
	//     render: text => (
	//       <div style={{height: "40px", display: "flex", alignItems: "center"}}>
	//         {text?.toLocaleString()}
	//       </div>
	//     ),
	//   },
	//   {
	//     title: "Effective Date",
	//     dataIndex: "effective_date",
	//     align: "left",
	//     width: 150,
	//     key: "effective_date",
	//     render: text => (
	//       <div style={{height: "40px", display: "flex", alignItems: "center"}}>
	//         {text}
	//       </div>
	//     ),
	//   },
	//   {
	//     title: "Effective Time",
	//     dataIndex: "effective_time",
	//     align: "left",
	//     key: "effective_time",
	//     width: 150,
	//     render: text => {
	//       const [hours, minutes] = text?.split(":");
	//       const hourNumber = Number(hours);
	//       const formattedTime = `${
	//         hourNumber > 12 ? hourNumber - 12 : hourNumber
	//       }:${minutes} ${hourNumber >= 12 ? "PM" : "AM"}`;

	//       return (
	//         <div style={{height: "40px", display: "flex", alignItems: "center"}}>
	//           {formattedTime}
	//         </div>
	//       );
	//     },
	//   },
	//   {
	//     title: "Status",
	//     dataIndex: "status",
	//     align: "left",
	//     key: "status",
	//     width: 150,
	//     render: status => {
	//       let color;
	//       if (status === "Pending") {
	//         color = "red";
	//       } else if (status === "Completed") {
	//         color = "green";
	//       } else {
	//         color = "red";
	//       }
	//       return <Tag color={color}>{status.toUpperCase()}</Tag>;
	//     },
	//     filters: [
	//       {
	//         text: "Pending",
	//         value: "Pending",
	//       },
	//       {
	//         text: "Completed",
	//         value: "Completed",
	//       },
	//     ],
	//     filterMode: "menu",
	//     onFilter: (value: React.Key | boolean, record: DataType) => {
	//       if (typeof value === "string") {
	//         return record.status === value;
	//       }
	//       return false;
	//     },
	//   },
	//   {
	//     title: "Actions",
	//     dataIndex: "actions",
	//     align: "left",
	//     key: "action",
	//     width: 150,
	//     render: (_, record) => (
	//       <Space size="middle">
	//         <img
	//           src={eye}
	//           alt="View"
	//           style={{width: "20px", cursor: "pointer"}}
	//           onClick={() => handleEyeClick(record)}
	//         />
	//         <img
	//           src={trash}
	//           alt="Delete"
	//           style={{width: "20px", cursor: "pointer"}}
	//           onClick={() => showPopconfirm(record)}
	//         />
	//       </Space>
	//     ),
	//   },
	//   {
	//     title: "Avatar",
	//     dataIndex: "photo",
	//     align: "left",
	//     key: "avatar",
	//     width: 150,
	//     render: photo => (
	//       <div style={{height: "40px", display: "flex", alignItems: "center"}}>
	//         <Avatar src={photo} />
	//       </div>
	//     ),
	//   },
	// ];

	const columns: TableColumnsType<DataType> = [
		{
			title: "S/N",
			dataIndex: "number",
			width: 80,
			key: "number",
			align: "center",
			render: (text: any, record: any, index: number) => {
				const pageNumber = tableProps.current || 1;
				const pageSize = tableProps.pageSize || 5;
				return (pageNumber - 1) * pageSize + index + 1;
			},
		},
		{
			title: "Avatar",
			dataIndex: "photo",
			align: "left",
			key: "photo",
			width: 150,
			render: (photo: string | undefined) => (
				<div style={{height: "40px", display: "flex", alignItems: "center"}}>
					<Avatar src={photo} />
				</div>
			),
		},
		{
			title: "Email",
			dataIndex: "email",
			align: "left",
			key: "email",
			width: 200,
			render: (text: string | undefined) => (
				<div style={{height: "40px", display: "flex", alignItems: "center"}}>
					{text}
				</div>
			),
		},
		{
			title: "Display Name",
			dataIndex: "displayName",
			align: "left",
			key: "displayName",
			width: 150,
			render: (text: string | undefined) => (
				<div style={{height: "40px", display: "flex", alignItems: "center"}}>
					{text}
				</div>
			),
		},
		{
			title: "First Name",
			dataIndex: "firstName",
			align: "left",
			key: "firstName",
			width: 150,
			render: (text: string | undefined) => (
				<div style={{height: "40px", display: "flex", alignItems: "center"}}>
					{text}
				</div>
			),
		},
		{
			title: "Last Name",
			dataIndex: "lastName",
			align: "left",
			key: "lastName",
			width: 150,
			render: (text: string | undefined) => (
				<div style={{height: "40px", display: "flex", alignItems: "center"}}>
					{text}
				</div>
			),
		},
		{
			title: "Role",
			dataIndex: "role",
			align: "left",
			key: "role",
			width: 150,
			render: (text: string | undefined) => (
				<div style={{height: "40px", display: "flex", alignItems: "center"}}>
					{text}
				</div>
			),
			filters: [
				{text: "Admin", value: "Admin"},
				{text: "Instructor", value: "Instructor"},
				{text: "Student", value: "Student"},
			],
			filterMode: "menu",
			onFilter: (value: any, record: {role: any}) => record.role === value,
		},
		{
			title: "Verified",
			dataIndex: "isVerified",
			align: "left",
			key: "isVerified",
			width: 100,
			render: (isVerified: any) => (
				<Tag color={isVerified ? "green" : "red"}>
					{isVerified ? "Verified" : "Not Verified"}
				</Tag>
			),
		},

		{
			title: "Actions",
			dataIndex: "actions",
			align: "left",
			key: "actions",
			width: 150,
			render: (_: any, record: any) => (
				<Space size="middle">
					<img
						src={eye}
						alt="View"
						style={{width: "20px", cursor: "pointer"}}
						onClick={() => handleEyeClick(record)}
					/>
					<img
						src={trash}
						alt="Delete"
						style={{width: "20px", cursor: "pointer"}}
						onClick={() => showPopconfirm(record)}
					/>
				</Space>
			),
		},
	];

	const handleClose = () => {
		setModalVisible(false);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		const {
			new_price,
			effective_date,
			effective_time,

			reason_for_change,
		} = formData;
		const data = new FormData();
		// data.append("commodity", configuration?._id);
		// data.append("previous_price", configuration?.previous_price);
		data.append("new_price", new_price);
		data.append("effective_date", effective_date);
		data.append("effective_time", effective_time);
		data.append("reason_for_change", reason_for_change);
		// await mutate(data as any);
		// successAlert("commodity Updated Successfully");
		handleClose();
		form.resetFields();
		setModalVisible(false);
	};

	return (
		<div>
			<div className="! flex gap-4 mb-4 mt-4 text-gray-500 dark:text-gray-400"></div>

			<></>

			<div className="mb-24" style={{overflowX: "auto"}}>
				<Card
					title="User List"
					extra={
						// <Button type="primary" onClick={() => {}}>
						// 	New
						// </Button>

						<div className="border flex border-gray-950 rounded-lg relative outline-none">
							<div className=" absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
								<svg
									className="w-5 h-5 text-gray-500 dark:text-gray-400"
									aria-hidden="true"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										fill-rule="evenodd"
										d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
										clip-rule="evenodd"
									></path>
								</svg>
							</div>
							<div className="flex justify-center">
								<input
									type="text"
									id="table-search"
									className="block p-2 ps-10 text-sm rounded-lg w-80"
									placeholder="Search for items"
								/>
							</div>
						</div>
					}
				>
					<Table
						className=""
						columns={columns}
						dataSource={DatabaseUsers}
						size="small"
						rowKey="_id"
						loading={!!loading}
						onChange={onChange}
						pagination={{
							pageSizeOptions: ["5", "10", "15"],
							defaultPageSize: 5,
							showSizeChanger: false,
						}}
					/>
				</Card>

				{modalVisible && (
					<div className="fixed inset-0 flex items-end justify-end bg-black bg-opacity-50 z-10">
						<div className="bg-white p-12 rounded-md w-[400px] h-screen relative">
							<CloseOutlined
								className="absolute text-[12px] top-16 right-8 cursor-pointer"
								onClick={handleClose}
							/>
							<h2 className="mb-5 font-inter font-medium text-xl">
								User Configuration
							</h2>
							<Form
								name="user-configuration-form"
								className="bg-white w-full"
								form={form}
								// onFinish={mutate}
								requiredMark={false}
								variant="borderless"
								layout="vertical"
								size="middle"
								scrollToFirstError={true}
							>
								<Form.Item
									name="email"
									label="Email"
									rules={[{required: true, message: "Please input an email"}]}
								>
									<Input
										readOnly
										className="border-gray-300 rounded-none"
										style={{backgroundColor: "#EBE9E9", marginTop: "-2rem"}}
									/>
								</Form.Item>

								<Form.Item
									name="displayName"
									label="Display Name"
									rules={[
										{required: true, message: "Please input a display name"},
									]}
								>
									<Input
										onChange={handleInputChange}
										className="border-gray-300 rounded-none"
										name="displayName"
										style={{backgroundColor: "#EBE9E9", marginTop: "-2rem"}}
									/>
								</Form.Item>

								<div className="flex">
									<Form.Item
										name="firstName"
										label="First Name"
										className="mr-5"
										rules={[
											{required: true, message: "Please input a first name"},
										]}
									>
										<Input
											onChange={handleInputChange}
											className="border-gray-300 rounded-none"
											name="firstName"
											style={{backgroundColor: "#EBE9E9", marginTop: "-2rem"}}
										/>
									</Form.Item>

									<Form.Item
										name="lastName"
										label="Last Name"
										rules={[
											{required: true, message: "Please input a last name"},
										]}
									>
										<Input
											onChange={handleInputChange}
											className="border-gray-300 rounded-none"
											name="lastName"
											style={{backgroundColor: "#EBE9E9", marginTop: "-2rem"}}
										/>
									</Form.Item>
								</div>

								<Form.Item
									name="role"
									label="Role"
									rules={[{required: true, message: "Please select a role"}]}
								>
									<Select
										onChange={handleInputChange}
										className="border-gray-300 rounded-none"
										// name="role"
										style={{backgroundColor: "#EBE9E9", marginTop: "-2rem"}}
									>
										<Select.Option value="Admin">Admin</Select.Option>
										<Select.Option value="Instructor">Instructor</Select.Option>
										<Select.Option value="Student">Student</Select.Option>
									</Select>
								</Form.Item>

								<Form.Item
									name="isVerified"
									label="Verified"
									rules={[
										{
											required: true,
											message: "Please select verification status",
										},
									]}
								>
									<Select
										onChange={handleInputChange}
										className="border-gray-300 rounded-none"
										// name="isVerified"
										style={{backgroundColor: "#EBE9E9", marginTop: "-2rem"}}
									>
										<Select.Option value={true}>Verified</Select.Option>
										<Select.Option value={false}>Not Verified</Select.Option>
									</Select>
								</Form.Item>

								<Form.Item
									name="registeredAt"
									label="Registered At"
									rules={[
										{
											required: true,
											message: "Please select a registration date",
										},
									]}
								>
									<DatePicker
										onChange={handleDateInput}
										className="border-gray-300 rounded-none"
										name="registeredAt"
										style={{backgroundColor: "#EBE9E9", marginTop: "-2rem"}}
									/>
								</Form.Item>

								<Form.Item
									name="status"
									label="Status"
									rules={[{required: true, message: "Please select a status"}]}
								>
									<Select
										onChange={handleInputChange}
										className="border-gray-300 rounded-none"
										// name="status"
										style={{backgroundColor: "#EBE9E9", marginTop: "-2rem"}}
									>
										<Select.Option value="Pending">Pending</Select.Option>
										<Select.Option value="Active">Active</Select.Option>
										<Select.Option value="Inactive">Inactive</Select.Option>
									</Select>
								</Form.Item>

								<div className="text-left">
									<Form.Item>
										<Button
											onClick={handleSubmit}
											name="submit"
											type="primary"
											htmlType="submit"
											className="w-40 rounded bg-blue-500 hover:text-black hover:bg-white text-sm"
											style={{
												background:
													"linear-gradient(89.46deg, #39462D 13.05%, #658127 107.23%)",
												color: "white",
											}}
											loading={isLoading > 0}
										>
											Submit
										</Button>
									</Form.Item>
								</div>
							</Form>
						</div>
					</div>
				)}

				<Modal
					title="Are you sure?"
					open={open}
					onOk={handleOk}
					okButtonProps={{
						loading: confirmLoading,
						className: "!bg-[#39462D]",
					}}
					onCancel={handleCancel}
					width={400}
					centered
				>
					<div className="mt-5 ">
						<p className="mb-4">
							{" "}
							Do you want to delete commodity{" "}
							<span style={{fontWeight: "bold"}}>
								{/* {configuration?.commodity?.commodityId?.name} */}
							</span>
						</p>
					</div>
				</Modal>
			</div>
		</div>
	);
};

export default TableComponent;
