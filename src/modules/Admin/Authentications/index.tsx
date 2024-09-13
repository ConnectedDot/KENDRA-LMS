import React, { useState } from "react";
import { message, Button, Input } from "antd";
import { sendVerificationEmail } from "../../../utils/sendVerificationEmail";

const ResendVerificationEmail = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleResend = async () => {
    setIsLoading(true);
    try {
      const response = await sendVerificationEmail(email);
      message.success(response);
    } catch (error) {
      message.error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Input
        placeholder="Enter user email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button type="primary" onClick={handleResend} loading={isLoading}>
        Resend Verification Email
      </Button>
    </div>
  );
};

export default ResendVerificationEmail;
