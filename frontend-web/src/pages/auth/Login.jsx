import AuthForm from "../../components/Form/Form";
import { fieldsLogin } from "./fields";
function Login() {
  return (
    <AuthForm
      title="login"
      fields={fieldsLogin}
      buttonText="login"
      link="/register"
    />
  );
}

export default Login;
