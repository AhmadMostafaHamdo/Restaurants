import AuthForm from "../../components/Form/Form";
const fields = [
  {
    label: "userName",
    type: "text",
    placeholder: "userName",
  },
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
  {
    label: "phone",
    type: "text",
    placeholder: "phone",
  },
];
function Register() {
  return (
    <>
      <AuthForm
        title="create a new account"
        fields={fields}
        buttonText="register"
        link="/login"
      />
      <div>
      </div>
      
    </>
  );
}

export default Register;
