import React, {useContext, useEffect, useState} from "react";
import {
	Table,
	Space,
	Input,
	Button,
	Form,
	Modal,
	Tag,
	Avatar,
	Card,
	Select,
} from "antd";
import type {TableColumnsType, TablePaginationConfig, TableProps} from "antd";
import eye from "../../../../assets/icons/Vector (3).png";
import trash from "../../../../assets/icons/material-symbols_delete-outline.png";
import {
	CloseOutlined,
	PlusCircleFilled,
	SearchOutlined,
} from "@ant-design/icons";
import {useFetchUsers} from "../../hooks/querry";
import {CombinedUserProps} from "../../../../interface";
import {useDeleteUser, useUpdateUser} from "../../hooks";
import SigninModal from "../../../../components/Forms/signdialog";

interface DataType {
	role: string;
	isVerified: boolean;
	status: string;
	isApproved: boolean;
	firstName: string;
	lastName: string;
	email: string;
}

const TableComponent = () => {
	const [confirmLoading, setConfirmLoading] = React.useState(false);
	const [userData, setuserData] = React.useState<CombinedUserProps | null>(
		null
	);
	const [filteredData, setFilteredData] = React.useState<CombinedUserProps[]>(
		[]
	);
	const [searchQuery, setSearchQuery] = React.useState("");

	const {allUsers: DatabaseUsers, isLoading, refetch} = useFetchUsers();

	useEffect(() => {
		setFilteredData(DatabaseUsers);
	}, [DatabaseUsers]);

	useEffect(() => {
		if (searchQuery) {
			const filtered = DatabaseUsers.filter(
				(user: CombinedUserProps) =>
					user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
					user.firstName?.toLowerCase().includes(searchQuery.toLowerCase())
			);
			setFilteredData(filtered);
		} else {
			setFilteredData(DatabaseUsers);
		}
	}, [searchQuery, DatabaseUsers]);

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
	};
	const [modalVisible, setModalVisible] = useState(false);
	const [open, setOpen] = React.useState(false);
	const [isOpen, setIsOpen] = React.useState(false);
	const [newIsOpen, setNewIsOpen] = React.useState(false);
	const [userId, setUserId] = useState<string | null>(null);
	const [form] = Form.useForm();

	const [formData, setFormData] = useState<DataType>({
		role: userData?.role || "",
		isVerified: userData?.isVerified || false,
		status: userData?.status || "",
		isApproved: userData?.isApproved || false,
		firstName: userData?.firstName || "",
		lastName: userData?.lastName || "",
		email: userData?.email || "",
	});

	useEffect(() => {
		form.setFieldsValue({
			role: userData?.role,
			isVerified: userData?.isVerified,
			status: userData?.status,
			isApproved: userData?.isApproved,
			firstName: userData?.firstName,
			lastName: userData?.lastName,
			email: userData?.email,
		});
	}, [userData, form]);

	const {updateUser, isLoading: updateLoading} = useUpdateUser();
	const {
		deleteUser,
		isLoading: isDeletingUser,
		error: deleteUserError,
	} = useDeleteUser();

	const handleSelectChange = (value: any, field: string) => {
		setFormData(prevState => ({
			...prevState,
			[field]: value,
		}));
	};

	const handleEyeClick = (record: CombinedUserProps) => {
		setuserData(record);
		setUserId(record.uid || null);
		setFormData(record as DataType);
		setIsOpen(true);
		setModalVisible(true);
	};

	const showPopconfirm = (record: CombinedUserProps) => {
		setuserData(record);
		setUserId(record.uid || null);
		setOpen(true);
	};

	const handleCancel = () => {
		setOpen(false);
	};

	const handleOk = async () => {
		setConfirmLoading(true);
		if (userId) {
			try {
				await deleteUser(userId);
				setOpen(false);
				refetch();
			} catch (error) {}
		}
		setConfirmLoading(false);
	};

	const handleClose = () => {
		setModalVisible(false);
	};

	const handleCreate = () => {
		setNewIsOpen(true);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (userId) {
			try {
				await updateUser(userId, formData);
				refetch();
				handleClose();
			} catch (error) {}
		} else {
		}
		form.resetFields();
	};
	const [tableProps, setTableProps] = useState<TablePaginationConfig>({
		pageSize: 5,
	});

	const onChange: TableProps<CombinedUserProps>["onChange"] = (
		pagination,
		filters,
		sorter,
		extra
	) => {
		setTableProps(pagination);
	};

	const columns: TableColumnsType<CombinedUserProps> = [
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
			title: "Status",
			dataIndex: "status",
			align: "left",
			key: "status",
			width: 100,
			render: (status: any) => (
				<Tag
					color={
						status === "Active"
							? "green"
							: status === "Pending"
							? "orange"
							: "red"
					}
				>
					{status}
				</Tag>
			),
			filters: [
				{text: "Pending", value: "Pending"},
				{text: "Active", value: "Active"},
				{text: "Inactive", value: "Inactive"},
			],
			filterMode: "menu",
			onFilter: (value: any, record: CombinedUserProps) =>
				record.status === value,
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
				{text: "User", value: "User"},
			],
			filterMode: "menu",
			onFilter: (value: any, record: CombinedUserProps) =>
				record.role === value,
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

	return (
		<div>
			<div className="! flex gap-4 mb-4 mt-4 text-gray-500 dark:text-gray-400"></div>

			<SigninModal
				isOpen={newIsOpen}
				openModal={() => setNewIsOpen(true)}
				closeModal={() => setNewIsOpen(false)}
			/>

			<div className="flex justify-end items-center mb-3">
				<Button
					onClick={handleCreate}
					name="submit"
					type="primary"
					htmlType="submit"
					className="w-40 rounded bg-blue-500 hover:text-black hover:bg-white text-sm"
					style={{
						background:
							"linear-gradient(89.46deg, #39462D 13.05%, #658127 107.23%)",
						color: "white",
					}}
					// loading={updateLoading}
				>
					<PlusCircleFilled /> New user
				</Button>
			</div>

			<div className="mb-24" style={{overflowX: "auto"}}>
				<Card
					className="border  border-gray-950"
					title="User List"
					extra={
						<div className="border flex border-gray-950 rounded-lg relative outline-none">
							<div className=" absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
								<SearchOutlined className="text-gray-400" />
							</div>
							<div className="flex justify-center">
								<input
									onChange={handleSearch}
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
						className="border-gray-950"
						columns={columns}
						dataSource={filteredData}
						size="small"
						rowKey="_id"
						loading={!!isLoading}
						onChange={onChange}
						pagination={{
							pageSizeOptions: ["5", "10", "15"],
							defaultPageSize: 5,
							showSizeChanger: false,
						}}
					/>
				</Card>

				{modalVisible && (
					<div className="fixed inset-0 flex items-end justify-end bg-black bg-opacity-50 z-40">
						<div className="bg-white p-12 rounded-md w-[400px] h-screen relative">
							<CloseOutlined
								className="absolute text-[12px] top-16 right-8 cursor-pointer"
								onClick={handleClose}
							/>
							<h2 className="mb-5 font-inter font-medium text-xl">
								Modify User Data
							</h2>
							<Form
								name="user-userData-form"
								className="bg-white w-full"
								form={form}
								initialValues={formData}
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
											readOnly
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
											readOnly
											className="border-gray-300 rounded-none"
											name="lastName"
											style={{backgroundColor: "#EBE9E9", marginTop: "-2rem"}}
										/>
									</Form.Item>
								</div>

								<Form.Item name="role" label="Role">
									<Select
										onChange={value => handleSelectChange(value, "role")}
										className="border-gray-300 rounded-none"
										style={{backgroundColor: "#EBE9E9", marginTop: "-2rem"}}
									>
										<Select.Option value="Admin">Admin</Select.Option>
										<Select.Option value="Instructor">Instructor</Select.Option>
										<Select.Option value="User">Student</Select.Option>
									</Select>
								</Form.Item>

								<div className="flex">
									<Form.Item
										name="isApproved"
										label="Approved"
										className="mr-5 w-1/2"
									>
										<Select
											onChange={value =>
												handleSelectChange(value, "isApproved")
											}
											className="border-gray-300 rounded-none"
											style={{backgroundColor: "#EBE9E9", marginTop: "-2rem"}}
										>
											<Select.Option value={true}>Approved</Select.Option>
											<Select.Option value={false}>Not Approved</Select.Option>
										</Select>
									</Form.Item>

									<Form.Item
										name="isVerified"
										label="Verified"
										className="w-1/2"
									>
										<Select
											onChange={value =>
												handleSelectChange(value, "isVerified")
											}
											className="border-gray-300 rounded-none"
											style={{backgroundColor: "#EBE9E9", marginTop: "-2rem"}}
										>
											<Select.Option value={true}>Verified</Select.Option>
											<Select.Option value={false}>Not Verified</Select.Option>
										</Select>
									</Form.Item>
								</div>

								<Form.Item
									name="status"
									label="Status"
									rules={[{required: true, message: "Please select a status"}]}
								>
									<Select
										onChange={value => handleSelectChange(value, "status")}
										className="border-gray-300 rounded-none"
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
											loading={updateLoading}
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
							Do you want to delete{" "}
							<span style={{fontWeight: "bold"}}>
								{userData?.firstName} {userData?.lastName}
							</span>
							<span style={{fontWeight: ""}}>'s account permanently. </span>
							<span>Please, be aware this cannot be undone.</span>
						</p>
					</div>
				</Modal>
			</div>
		</div>
	);
};

export default TableComponent;
