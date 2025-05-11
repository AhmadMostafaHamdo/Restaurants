import AuthForm from "../../components/Form/Form";
const fields = [
  {
    label: "email",
    type: "email",
    placeholder: "email",
  },
  {
    label: "password",
    type: "password",
    placeholder: "password",
  },
];
function Register() {
  return (
      <AuthForm
        title="login"
        fields={fields}
        buttonText="login"
        link="/register"
      />
  );
}

export default Register;
