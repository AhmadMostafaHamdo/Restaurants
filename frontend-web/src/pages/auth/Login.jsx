import { Link } from "react-router-dom";
const { container, register, title, groupForm, input } = style;
import style from "./style.module.css";
import { Container } from "react-bootstrap";
import { useState } from "react";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handelChangeInputForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  console.log(form);
  return (
    <Container className={container}>
      <div className={register}>
        <h3 className={`${title} fw-bold text-center`}>Login</h3>
        <form>
          <div className={groupForm}>
            <label
              htmlFor="ema className={label}il"
              className="d-none d-sm-block"
            >
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              value={form.email}
              className={input}
              onChange={(e) => handelChangeInputForm(e)}
            />
          </div>
          <div className={groupForm}>
            <label htmlFor="password" className="d-none d-sm-block">
              Password
            </label>
            <input
              type="text"
              id="password"
              value={form.password}
              name="password"
              className={input}
              onChange={(e) => handelChangeInputForm(e)}
            />
          </div>
          <div>
            <p className="my-5 text-center">
              Don,t Have an Account ?
              <Link
                to="/register"
                style={{
                  color: "#ff9800",
                  fontWeight: "bold",
                  marginLeft: "3px",
                }}
              >
                register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default Login;
