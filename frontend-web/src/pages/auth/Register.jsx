import { Link } from "react-router-dom";
import style from "./style.module.css";
import { Button, Container, Form } from "react-bootstrap";
import { useState } from "react";
const { container, register, title, groupForm, label, input, btnParent, btn } =
  style;
function Register() {
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
    phone: "",
  });
  const handelChangeInputForm = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <Container className={container}>
      <div className={register}>
        <h3 className={`${title} fw-bold text-center mb-4`}>
          create a new account
        </h3>
        <form>
          <div className={groupForm}>
            <label htmlFor="user" className="d-none d-sm-block">
              UserName
            </label>
            <input
              type="text"
              name="userName"
              id="user"
              value={form.userName}
              onChange={(e) => handelChangeInputForm(e)}
              placeholder="userName"
              className={input}
            />
          </div>
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
              placeholder="email"
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
              placeholder="password"
              name="password"
              className={input}
              onChange={(e) => handelChangeInputForm(e)}
            />
          </div>
          <div className={groupForm}>
            <label htmlFor="phone" className="d-none d-sm-block">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              value={form.phone}
              placeholder="phone"
              name="phone"
              className={input}
              onChange={(e) => handelChangeInputForm(e)}
            />
          </div>
          <div className={btnParent}>
            <button className={btn}>Register</button>
          </div>
          <div>
            <p className="my-3 text-center">
              By clicking Sign up you agree to the our terms and Conditions
            </p>
          </div>
          <div>
            <p className="my-5 text-center">
              Already an account?{" "}
              <Link
                to="/Login"
                style={{ color: "#ff9800", fontWeight: "bold" }}
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default Register;
