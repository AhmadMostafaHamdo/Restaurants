import { fieldsRegister } from "../../../../pages/auth/fields";
import AuthForm from "../../../Form/Form";

const CreateUser = () => {
  return (
    <AuthForm
      title="Create User"
      fields={fieldsRegister}
      buttonText="create"
      link="/super-dashboard/users"
    />
  );
};
export default CreateUser;
