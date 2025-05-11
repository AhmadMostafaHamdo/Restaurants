import { Link } from "react-router-dom";
import style from "../../pages/auth/style.module.css";
import { Button, Container, Form } from "react-bootstrap";
import { useState } from "react";
const {
  container,
  register,
  titleAuth,
  groupForm,
  label,
  input,
  btnParent,
  btn,
} = style;
function AuthForm({ title, fields, buttonText, link, msg }) {
  const [formData, setFormData] = useState({});
  const handelChangeInputForm = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <Container className={container}>
      <div className={register}>
        <h3 className={`${titleAuth} fw-bold text-center mb-4`}>{title}</h3>
        <form>
          <p
            style={{ color: "#607D8B", textAlign: "center", fontWeight: "600" }}
          >
            {msg}
          </p>
          {fields.map((filed, index) => (
            <div key={index} className={groupForm}>
              <label htmlFor={label} className="d-none d-sm-block">
                {filed.label}
              </label>
              <input
                type={filed.type}
                name={label}
                id={label}
                value={formData.userName}
                onChange={(e) => handelChangeInputForm(e)}
                placeholder={filed.placeholder}
                className={input}
              />
            </div>
          ))}

          <div className={btnParent}>
            <button className={btn}>{buttonText}</button>
          </div>
          {(buttonText == "login" || buttonText == "register") && (
            <p className="my-3 text-center">
              By clicking {buttonText === "login" ? "login" : "Sign up"} you
              agree to the our terms and Conditions
            </p>
          )}
          <div>
            {(buttonText == "login" || buttonText == "register") && (
              <p className="my-5 text-center">
                Already an account?
                <Link
                  to={link}
                  style={{ color: "#ff9800", fontWeight: "bold" }}
                >
                  {buttonText}
                </Link>
              </p>
            )}
          </div>
        </form>
      </div>
    </Container>
  );
}

export default AuthForm;
