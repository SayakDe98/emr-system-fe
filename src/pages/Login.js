import React from "react";
import Card from "../components/Card";
import LoginForm from "../components/LoginForm";
import Topbar from "../components/Topbar";
import styles from "./Login.module.css";

const Login = () => {
  return (
    <div className={styles.login}>
      <Topbar
        signup={true}
        login={false}
        logout={false}
        profile={false}
        home={false}
      />
      <div className={styles.cardContainer}>
        <Card>{<LoginForm />}</Card>
      </div>
    </div>
  );
};

export default Login;
