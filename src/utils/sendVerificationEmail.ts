import { Auth, getAuth, sendEmailVerification } from "firebase/auth";

export const sendVerificationEmail = async (userEmail: string) => {
  const auth = getAuth();
  const user = await getUserByEmail(auth, userEmail);

  if (user !== null && user !== undefined) {
    await sendEmailVerification(user);
    return "Verification email sent successfully.";
  } else {
    throw new Error("User not found.");
  }
};
function getUserByEmail(auth: Auth, userEmail: string) {
  throw new Error("Function not implemented.");
}
