import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./SignupForm.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignupForm = () => {
  const navigate = useNavigate();
  const validate = (values) => {
    const errors = {};

    if (!values.firstName) {
      errors.firstName = "Required";
    }
    if (!values.lastName) {
      errors.lastName = "Required";
    }
    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Required";
    }
    if (!values.city) {
      errors.city = "Required";
    }
    if (!values.state) {
      errors.state = "Required";
    }
    if (!values.gender) {
      errors.gender = "Required";
    }
    if (!values.cellphone) {
      errors.cellphone = "Required";
    }
    if (!values.dob) {
      errors.dob = "Required";
    }
    if (!values.highestQualification) {
      errors.highestQualification = "Required";
    }
    if (!values.permissions) {
      errors.permissions = "Required";
    }
    if (!values.username) {
      errors.username = "Required";
    }
    if (!values.zipcode) {
      errors.zipcode = "Required";
    } else if (values.zipcode < 100000 || values.zipcode > 999999) {
      errors.zipcode = "Zipcode must be 6 digits long";
    }

    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      password: "",
      permissions: "",
      username: "",
      gender: "",
      dob: "",
      city: "",
      state: "",
      zipcode: "",
      cellphone: "",
      highestQualification: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: async (values, { resetForm }) => {
      // alert(JSON.stringify(values, null, 2));
      try {
        const payload = {
          first_name: values.firstName,
          last_name: values.lastName,
          username: values.username,
          permissions: values.permissions,
          password: values.password,
          gender: values.gender,
          dob: values.dob,
          city: values.city,
          zipcode: values.zipcode,
          state: values.state,
          cellphone: values.cellphone,
          highest_qualification: values.highestQualification,
        };
        const response = await axios.post(
          process.env.REACT_APP_BASE_URL + "user",
          payload
        );
        if (response.data.success) {
          toast.success(response.data.message, { autoClose: 2000 });
        } else {
          toast.error(response.data.message);
        }
        // alert(JSON.stringify(response.data.message));

        if (response.data.success) {
          resetForm();
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit} className={style.form}>
        <div className={style.name}>
          <div className={style.firstName}>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              placeholder="Please enter your first name"
              style={{
                border: "0px",
                boxShadow:
                  "0 2px 7px 0 rgba(0, 0, 0, 0.1), 0 2px 7px 0 rgba(0, 0, 0, 0.1)",
              }}
            />
            {formik.errors.firstName && formik.touched.firstName ? (
              <div className={style.errors}>{formik.errors.firstName}</div>
            ) : null}
          </div>
          <div className={style.lastName}>
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              placeholder="Please enter your last name"
              style={{
                border: "0px",
                boxShadow:
                  "0 2px 7px 0 rgba(0, 0, 0, 0.1), 0 2px 7px 0 rgba(0, 0, 0, 0.1)",
              }}
            />
            {formik.errors.lastName && formik.touched.lastName ? (
              <div className={style.errors}>{formik.errors.lastName}</div>
            ) : null}
          </div>
        </div>
        <div className={style.usernameAndPermissions}>
          <div className={style.username}>
            <label>Username</label>
            <input
              type="text"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              placeholder="Please enter an username"
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
          <div className={style.permissions}>
            <label className={style.permissionsLabel}>Permissions</label>
            <div className={style.permissionsOptions}>
              <div className={style.customControl}>
                <input
                  id="ADMIN"
                  type="radio"
                  value="ADMIN"
                  name="permissions"
                  onChange={formik.handleChange}
                  defaultChecked={formik.values.permissions === "ADMIN"}
                />
                <label className={style.customControlLabel} htmlFor="ADMIN">
                  ADMIN
                </label>
              </div>
              <div className={style.customControl}>
                <input
                  id="PATIENT"
                  type="radio"
                  value="PATIENT"
                  name="permissions"
                  onChange={formik.handleChange}
                  defaultChecked={formik.values.permissions === "PATIENT"}
                />
                <label className={style.customControlLabel} htmlFor="PATIENT">
                  PATIENT
                </label>
              </div>
              <div className={style.customControl}>
                <input
                  id="DOCTOR"
                  type="radio"
                  value="DOCTOR"
                  name="permissions"
                  onChange={formik.handleChange}
                  defaultChecked={formik.values.permissions === "DOCTOR"}
                />
                <label className={style.customControlLabel} htmlFor="DOCTOR">
                  DOCTOR
                </label>
              </div>
              {formik.errors.permissions && formik.touched.permissions ? (
                <div className={style.errors}>{formik.errors.permissions}</div>
              ) : null}
            </div>
          </div>
        </div>
        <div className={style.gender}>
          <label>Gender</label>
          <div className={style.genderOptions}>
            <div className={style.customControl}>
              <input
                id="Male"
                type="radio"
                value="Male"
                name="gender"
                onChange={formik.handleChange}
                checked={formik.values.gender === "Male"}
              />
              <label className={style.customControlLabel} htmlFor="male">
                Male
              </label>
            </div>
            <div className={style.customControl}>
              <input
                id="Female"
                type="radio"
                value="Female"
                name="gender"
                onChange={formik.handleChange}
                checked={formik.values.gender === "Female"}
              />
              <label className={style.customControlLabel} htmlFor="Female">
                Female
              </label>
            </div>
            <div className={style.customControl}>
              <input
                id="Other"
                type="radio"
                value="Other"
                name="gender"
                onChange={formik.handleChange}
                checked={formik.values.gender === "Other"}
              />
              <label className={style.customControlLabel} htmlFor="Other">
                Other
              </label>
            </div>
            {formik.errors.gender && formik.touched.gender ? (
              <div className={style.errors}>{formik.errors.gender}</div>
            ) : null}
          </div>
        </div>
        <div className={style.passwordRow}>
          <div className={style.password}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="Please enter a password"
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
          <div className={style.confirmPassword}>
            <label>Re Enter Password</label>
            <input
              type="password"
              name="confirmPassword"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              placeholder="Please re-enter your password"
              style={{
                border: "0px",
                boxShadow:
                  "0 2px 7px 0 rgba(0, 0, 0, 0.1), 0 2px 7px 0 rgba(0, 0, 0, 0.1)",
              }}
            />
            {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
              <div className={style.errors}>
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>
        </div>
        <div className={style.dobAndCity}>
          <div className={style.dob}>
            <label>Date Of Birth</label>
            <input
              type="date"
              name="dob"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.dob}
              placeholder="dd/mm/yyyy"
              style={{
                border: "0px",
                boxShadow:
                  "0 2px 7px 0 rgba(0, 0, 0, 0.1), 0 2px 7px 0 rgba(0, 0, 0, 0.1)",
              }}
            />
            {formik.errors.dob && formik.touched.dob ? (
              <div className={style.errors}>{formik.errors.dob}</div>
            ) : null}
          </div>
          <div className={style.city}>
            <label>City</label>
            <input
              type="text"
              name="city"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.city}
              placeholder="Please enter your city"
              style={{
                border: "0px",
                boxShadow:
                  "0 2px 7px 0 rgba(0, 0, 0, 0.1), 0 2px 7px 0 rgba(0, 0, 0, 0.1)",
              }}
            />
            {formik.errors.city && formik.touched.city ? (
              <div className={style.errors}>{formik.errors.city}</div>
            ) : null}
          </div>
        </div>
        <div className={style.stateAndZipcode}>
          <div className={style.state}>
            <label>State</label>
            <input
              type="text"
              name="state"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.state}
              placeholder="Please enter your State"
              style={{
                border: "0px",
                boxShadow:
                  "0 2px 7px 0 rgba(0, 0, 0, 0.1), 0 2px 7px 0 rgba(0, 0, 0, 0.1)",
              }}
            />
            {formik.errors.state && formik.touched.state ? (
              <div className={style.errors}>{formik.errors.state}</div>
            ) : null}
          </div>
          <div className={style.zipcode}>
            <label>Zip Code</label>
            <input
              type="number"
              name="zipcode"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.zipcode}
              placeholder="Please enter your zip code"
              style={{
                border: "0px",
                boxShadow:
                  "0 2px 7px 0 rgba(0, 0, 0, 0.1), 0 2px 7px 0 rgba(0, 0, 0, 0.1)",
              }}
            />
            {formik.errors.zipcode && formik.touched.zipcode ? (
              <div className={style.errors}>{formik.errors.zipcode}</div>
            ) : null}
          </div>
        </div>
        <div className={style.cellNumberAndHighestQualification}>
          <div className={style.cellNumber}>
            <label>Phone Number</label>
            <input
              type="number"
              name="cellphone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.cellphone}
              placeholder="Please enter your Phone Number"
              style={{
                border: "0px",
                boxShadow:
                  "0 2px 7px 0 rgba(0, 0, 0, 0.1), 0 2px 7px 0 rgba(0, 0, 0, 0.1)",
              }}
            />
            {formik.errors.cellphone && formik.touched.cellphone ? (
              <div className={style.errors}>{formik.errors.cellphone}</div>
            ) : null}
          </div>
          <div className={style.highestQualification}>
            <label>Highest Qualification</label>
            <input
              type="text"
              name="highestQualification"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.highestQualification}
              placeholder="Please enter your highest Qualification"
              style={{
                border: "0px",
                boxShadow:
                  "0 2px 7px 0 rgba(0, 0, 0, 0.1), 0 2px 7px 0 rgba(0, 0, 0, 0.1)",
              }}
            />
            {formik.errors.highestQualification &&
            formik.touched.highestQualification ? (
              <div className={style.errors}>
                {formik.errors.highestQualification}
              </div>
            ) : null}
          </div>
        </div>
        <button type="submit" disabled={!formik.errors}>
          Sign Up
        </button>
        <div className={style.navigateLogin}>
          <span className={style.navigateLogin}>Already have an Account?</span>
          <Link to="/login" className={style.navigateLoginButton}>
            Log In
          </Link>
        </div>
      </form>
    </>
  );
};

export default SignupForm;
