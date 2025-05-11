import AuthForm from "../../components/Form/Form";

const fields = [
  {
    label: "email",
    type: "email",
    placeholder: "email",
  },
];
const ForgotPassword = () => {
  return (
    <AuthForm
      title="Forgot Password"
      fields={fields}
      buttonText="send"
      link="/register"
      msg="please enter your email to receive a link to create a new  password via email"
    />
  );
};

export default ForgotPassword;
