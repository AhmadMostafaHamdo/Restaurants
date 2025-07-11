import AuthForm from "../../components/Form/Form";
import { fieldsRegister } from "./fields";
function Register() {
  return (
    <>
      <AuthForm
        title="register"
        fields={fieldsRegister}
        buttonText="register"
        link="/login"
      />
      <div></div>
    </>
  );
}

export default Register;
