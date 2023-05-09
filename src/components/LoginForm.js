import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./LoginForm.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Required";
    }
    if (!values.password) {
      errors.password = "Required";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          process.env.REACT_APP_BASE_URL + "user/login",
          values
        );

        if (response.data.success) {
          toast.success(response.data.message, { autoClose: 2000 });
        } else {
          toast.error(response.data.message);
        }
        setTimeout(() => {
          if (response.data.success) {
            resetForm();
            localStorage.setItem("token", response.data.data.token);
            localStorage.setItem(
              "refreshToken",
              response.data.data.refreshToken
            );
            localStorage.setItem("userId", response.data.data.id);
            dispatch(authActions.isLoggedIn());
            navigate("/app");
          }
        }, 3000);
      } catch (error) {
        toast.error(error.message);
      }
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className={style.username}>
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              border: "0px",
              boxShadow:
                "0 2px 7px 0 rgba(0, 0, 0, 0.1), 0 2px 7px 0 rgba(0, 0, 0, 0.1)",
            }}
          />
          {formik.errors.username && formik.touched.username ? (
            <div className={style.errors}>{formik.errors.username}</div>
          ) : null}
        </div>
        <div className={style.password}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{
              border: "0px",
              boxShadow:
                "0 2px 7px 0 rgba(0, 0, 0, 0.1), 0 2px 7px 0 rgba(0, 0, 0, 0.1)",
            }}
          />
          {formik.errors.password && formik.touched.password ? (
            <div className={style.errors}>{formik.errors.password}</div>
          ) : null}
        </div>
        <button type="submit" disabled={!formik.errors}>
          Log In
        </button>
        <div className={style.navigateSignup}>
          <span className={style.navigateSignup}>Don't have an Account?</span>
          <Link to="/signup" className={style.navigateSignupButton}>
            Sign Up
          </Link>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default LoginForm;
