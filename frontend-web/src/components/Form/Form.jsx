import { Link } from "react-router-dom";
import style from "../../pages/auth/style.module.css";
import { Container, Form } from "react-bootstrap";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

const containerVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20,
      staggerChildren: 0.1,
      when: "beforeChildren",
    },
  },
  exit: {
    opacity: 0,
    y: -50,
    scale: 0.95,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

function AuthForm({ title, fields, buttonText, link, msg }) {
  const [formData, setFormData] = useState({});
  const [isVisible, setIsVisible] = useState(true);

  const handelChangeInputForm = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <div>
        <Container className={container}>
          <AnimatePresence>
            {isVisible && (
              <motion.div
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

                <motion.form variants={itemVariants}>
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
                    </motion.div>
                  ))}

                  <motion.div className={btnParent} variants={itemVariants}>
                    <motion.button
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
                      By clicking {buttonText === "login" ? "login" : "Sign up"}{" "}
                      you agree to the our terms and Conditions
                    </motion.p>
                  )}

                  <motion.div variants={itemVariants}>
                    {(buttonText === "login" || buttonText === "register") && (
                      <motion.p className="my-5 text-center">
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
