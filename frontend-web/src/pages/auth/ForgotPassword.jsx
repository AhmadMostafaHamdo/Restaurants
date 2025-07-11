import AuthForm from "../../components/Form/Form";
import { fieldsForgotPassword } from "./fields";

const ForgotPassword = () => {
  return (
    <AuthForm
      title="Forgot Password"
      fields={fieldsForgotPassword}
      buttonText="send"
      link="/register"
      msg="please enter your email to receive a link to create a new  password via email"
    />
  );
};

export default ForgotPassword;
