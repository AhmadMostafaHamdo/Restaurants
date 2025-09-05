import Loading from "../feedback/loading/Loading";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import style from "../../pages/auth/style.module.css";
import { Container, Form } from "react-bootstrap";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer } from "react-toastify";
import {
  containerVariants,
  itemVariants,
} from "../../frammer-motion/framerMotion";
import { authThunk } from "../../redux/auth/authThunk/authThunk";
import { updateThunk } from "../../redux/auth/updateThunk/updateThunk";
const { container, register, titleAuth, groupForm, input, btnParent, btn } =
  style;

function AuthForm({ title, fields, buttonText, link, msg }) {
  const { user, loading } = useSelector((state) => state.auth);
  localStorage.setItem("user", user.role);
  const dispatch = useDispatch();
  const initialFormData = fields.reduce((acc, field) => {
    acc[field.label] = "";
    return acc;
  }, {});
  const [formData, setFormData] = useState(initialFormData);
  const [isVisible, setIsVisible] = useState(true);
  const handelChangeInputForm = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    const endpoint = buttonText === "login" ? "login" : "register";
    console.log(endpoint);
    try {
      // buttonText === "update"

      //  await dispatch(updateThunk({ endpoint, formData, id })).unwrap():

      const res = await dispatch(authThunk({ endpoint, formData })).unwrap();
      setTimeout(() => {
        const endpoint = buttonText === "login" ? "login" : "register";
        if (endpoint === "register") {
          window.location.href = "/login";
        } else if (res.data?.user?.role === "admin") {
          window.location.href = "/super-dashboard";
        } else if (res.data?.user?.role === "resturantAdmin") {
          window.location.href = "/dashboard";
        } else if (res.data?.user?.role === "delivery") {
          window.location.href = "/delivery";
        } else {
          window.location.href = "/";
        }
      }, 300);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <ToastContainer />
      <div>
        <Container className={container}>
          <AnimatePresence>
            {isVisible && (
              <motion.div
                style={{ height: title === "register" ? "90vh !import" : "" }}
                className={register}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <motion.h3
                  className={`${titleAuth} fw-bold text-center mb-4`}
                  variants={itemVariants}
                >
                  {title}
                </motion.h3>

                <motion.form variants={itemVariants} onSubmit={handelSubmit}>
                  <motion.p
                    style={{
                      color: "#607D8B",
                      textAlign: "center",
                      fontWeight: "600",
                    }}
                    variants={itemVariants}
                  >
                    {msg}
                  </motion.p>

                  {fields.map((filed, index) => (
                    <motion.div
                      key={index}
                      className={groupForm}
                      variants={itemVariants}
                      custom={index}
                    >
                      <label
                        htmlFor={filed.label}
                        className="d-none d-sm-block"
                      >
                        {filed.label}
                      </label>
                      <input
                        type={filed.type}
                        name={filed.label}
                        id={filed.label}
                        value={formData[filed.label] || ""}
                        onChange={(e) => handelChangeInputForm(e)}
                        placeholder={filed.placeholder}
                        className={input}
                      />
                    </motion.div>
                  ))}

                  <motion.div className={btnParent} variants={itemVariants}>
                    <motion.button
                      type="submit"
                      className={btn}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {buttonText}
                    </motion.button>
                  </motion.div>

                  {(buttonText === "login" || buttonText === "register") && (
                    <motion.p
                      className="my-3 text-center"
                      variants={itemVariants}
                    >
                      By clicking{" "}
                      {buttonText === "login" ? "login" : "register"} you agree
                      to the our terms and Conditions
                    </motion.p>
                  )}

                  <motion.div variants={itemVariants}>
                    {(buttonText === "login" || buttonText === "register") && (
                      <motion.p className="my-4 text-center">
                        Already an account?
                        <Link
                          to={link}
                          style={{ color: "#ff9800", fontWeight: "bold" }}
                          onClick={() => setIsVisible(false)}
                        >
                          {buttonText === "login" ? "Register" : "Login"}
                        </Link>
                      </motion.p>
                    )}
                  </motion.div>
                </motion.form>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </div>
    </Container>
  );
}

export default AuthForm;
