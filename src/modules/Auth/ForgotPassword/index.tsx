import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Divider, Form, Input, message } from "antd";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e?: any) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    setIsLoading(true);

    const auth = getAuth();
    const email = formData.email;
    sendPasswordResetEmail(auth, email)
      .then(() => {
        message.success("Password reset email sent successfully");
        setIsLoading(false);
        navigate("/login");
      })
      .catch((error: { code: any; message: any }) => {
        setIsLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        message.error(errorMessage);
        // ..
      });
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <Card
        style={{
          borderRadius: "",
          boxShadow:
            "rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
        }}
      >
        <div className="w-[300px] flex-col items-center justify-center p-5">
          <div className="mb-5  text-3xl font-bold text-black">
            Recover password
          </div>
          <div className="mb-8 text-sm font-medium text-black">
            Enter the email address associated with your account and we'll send
            you a link to reset your password.
          </div>
          <Form
            name="forgor-password"
            className="bg-white"
            form={form}
            variant="outlined"
            layout="vertical"
            requiredMark={false}
            onFinish={handleSubmit}
          >
            <Form.Item
              name="email"
              rules={[{ required: true }]}
              help=""
              label="Email"
            >
              <Input
                className="rounded border-gray-300"
                name="email"
                placeholder="Enter Email"
                onChange={handleInputChange}
              />
            </Form.Item>

            <div className="mt-6 mb-5">
              <Button
                loading={Boolean(isLoading)}
                type="text"
                htmlType="submit"
                style={{ borderRadius: "0" }}
                className="flex w-full justify-center bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Submit
              </Button>
            </div>

            <Divider className="!text-xs">OR</Divider>

            <div className="mb-3 mt-3 flex flex-col items-center gap-1">
              <div className="flex items-center gap-1 border-gray-400 border-l-gray-500">
                <Link
                  to="/login"
                  className="text-sm font-bold text-blue-500 hover:text-black"
                >
                  Return to login
                </Link>
              </div>
            </div>
          </Form>
        </div>
      </Card>
    </div>
  );
}
