import moment from "moment";
import React from "react";
import styles from "./History.module.css";
//immunisations, medical_issues, surgical_operations, allergies, exercise_frequency, drinks_alcohol, tobacco_used_past, uses_recreational_drugs, mental_health_history, family_history, date
const History = ({ history }) => {
  if (!history) {
    return (
      <div className={styles.heading}>
        <span>No History found...</span>
      </div>
    );
  }
  const {
    immunisations,
    medical_issues,
    surgical_operations,
    allergies,
    exercise_frequency,
    drinks_alcohol,
    tobacco_used_past,
    uses_recreational_drugs,
    mental_health_history,
    family_history,
    date,
  } = history;
  return (
    <div className={styles.history}>
      <div className={styles.heading}>
        <span>History</span>
        <p>Latest</p>
      </div>
      <div className={styles.gridContainer}>
        <div className={styles.immunisations}>
          <p>Immunisations</p>
          <span>{immunisations}</span>
        </div>
        <div className={styles.medicalIssues}>
          <p>Medical Issues</p>
          <span>{medical_issues}</span>
        </div>
        <div className={styles.operations}>
          <p>Surgical Operations</p>
          <span>{surgical_operations}</span>
        </div>
        <div className={styles.allergies}>
          <p>Allergies</p>
          <span>{allergies}</span>
        </div>
        <div className={styles.exercise}>
          <p>Exercise Frequency</p>
          <span>{exercise_frequency}</span>
        </div>
        <div className={styles.alcohol}>
          <p>Alcohol</p>
          {drinks_alcohol ? (
            <i
              className="fa-solid fa-check"
              style={{ color: "green", fontSize: "30px" }}
            ></i>
          ) : (
            <i
              className="fa-sharp fa-solid fa-xmark"
              style={{ color: "red", fontSize: "30px" }}
            ></i>
          )}
        </div>
        <div className={styles.tobacco}>
          <p>Tobacco Used</p>
          {tobacco_used_past ? (
            <i
              className="fa-solid fa-check"
              style={{ color: "green", fontSize: "30px" }}
            ></i>
          ) : (
            <i
              className="fa-sharp fa-solid fa-xmark"
              style={{ color: "red", fontSize: "30px" }}
            ></i>
          )}
        </div>
        <div className={styles.drugs}>
          <p>Recreational Drugs</p>
          {uses_recreational_drugs ? (
            <i
              className="fa-solid fa-check"
              style={{ color: "green", fontSize: "30px" }}
            ></i>
          ) : (
            <i
              className="fa-sharp fa-solid fa-xmark"
              style={{ color: "red", fontSize: "30px" }}
            ></i>
          )}
        </div>
        <div className={styles.mentalHealth}>
          <p>Mental Health History</p>
          <span>{mental_health_history}</span>
        </div>
        <div className={styles.family}>
          <p>Family History</p>
          <span>{family_history}</span>
        </div>
        <div className={styles.date}>
          <i
            className="fa-regular fa-calendar-days"
            style={{ color: "#4696ff" }}
          ></i>
          <span>{moment(date).format("Do MMMM yyyy")}</span>
        </div>
      </div>
    </div>
  );
};

export default History;
