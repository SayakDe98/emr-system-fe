import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import styles from "./Histories.module.css";
import Title from "../components/Title";

const Histories = () => {
  const [histories, setHistories] = useState([]);
  const userId =
    useSelector((state) => state.auth.userId) || localStorage.getItem("userId");
  const [patientId, setPatientId] = useState();
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  useEffect(() => {
    const getPatient = async (userId) => {
      try {
        const patientData = await axios.get(
          `${process.env.REACT_APP_BASE_URL}patient/?user_id=${userId}`
        );
        console.log(patientData.data.data[0]?.id);
        setPatientId(patientData.data.data[0]?.id);
      } catch (error) {
        toast.error(error.message);
      }
    };

    const getAllHistories = async (patientId) => {
      try {
        const histories = await axios.get(
          `${process.env.REACT_APP_BASE_URL}patient_history/?patient_id=${patientId}`
        );
        console.log(histories.data.data);
        setHistories(histories.data.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    getPatient(userId);
    patientId && getAllHistories(patientId);
  }, [userId, patientId]);
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (endIndex < histories.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <Topbar
        signup={false}
        login={false}
        logout={true}
        profile={true}
        home={true}
      />
      <Sidebar />
      <Title titleName="History" />
      {histories.length < 1 && (
        <div className={styles.card} style={{ top: "500px", left: "800px" }}>
          <span style={{ color: "#55637e" }}>No History found...</span>
        </div>
      )}
      {histories.length > 0 && (
        <div className={styles.card}>
          {histories.slice(startIndex, endIndex).map((history, i) => (
            <div className={styles.history} key={i}>
              <div className={styles.heading}>
                <span>History</span>
                <p>{history.id}</p>
              </div>
              <div className={styles.gridContainer}>
                <div className={styles.immunisations}>
                  <p>Immunisations</p>
                  <span>{history.immunisations}</span>
                </div>
                <div className={styles.medicalIssues}>
                  <p>Medical Issues</p>
                  <span>{history.medical_issues}</span>
                </div>
                <div className={styles.operations}>
                  <p>Surgical Operations</p>
                  <span>{history.surgical_operations}</span>
                </div>
                <div className={styles.allergies}>
                  <p>Allergies</p>
                  <span>{history.allergies}</span>
                </div>
                <div className={styles.exercise}>
                  <p>Exercise Frequency</p>
                  <span>{history.exercise_frequency}</span>
                </div>
                <div className={styles.alcohol}>
                  <p>Alcohol</p>
                  {history.drinks_alcohol ? (
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
                  {history.tobacco_used_past ? (
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
                  {history.uses_recreational_drugs ? (
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
                  <span>{history.mental_health_history}</span>
                </div>
                <div className={styles.family}>
                  <p>Family History</p>
                  <span>{history.family_history}</span>
                </div>
                <div className={styles.date}>
                  <i
                    className="fa-regular fa-calendar-days"
                    style={{ color: "#4696ff" }}
                  ></i>
                  <span>{moment(history.date).format("Do MMMM yyyy")}</span>
                </div>
              </div>
            </div>
          ))}
          {histories.slice(startIndex, endIndex).length === 1 ? (
            <div className={styles.buttons}>
              <button
                onClick={handlePreviousPage}
                style={{
                  transform: "none",
                  padding: "5px",
                  //   paddingBottom: "2px",
                  borderRadius: "5px",
                  //   margin: "5px",
                }}
              >
                Previous
              </button>
              <span
                style={{
                  //   margin: "15px",
                  marginRight: "5px",
                  marginLeft: "5px",
                }}
              >
                Page {currentPage}
              </span>
              <button
                onClick={handleNextPage}
                style={{
                  transform: "none",
                  padding: "5px",
                  borderRadius: "5px",
                  //   margin: "5px",
                }}
              >
                Next
              </button>
            </div>
          ) : histories.slice(startIndex, endIndex).length === 2 ? (
            <div className={styles.buttonsMiddle}>
              <button
                onClick={handlePreviousPage}
                style={{
                  transform: "none",
                  padding: "5px",
                  //   paddingBottom: "2px",
                  borderRadius: "5px",
                  //   margin: "5px",
                }}
              >
                Previous
              </button>
              <span
                style={{
                  //   margin: "15px",
                  marginRight: "5px",
                  marginLeft: "5px",
                }}
              >
                Page {currentPage}
              </span>
              <button
                onClick={handleNextPage}
                style={{
                  transform: "none",
                  padding: "5px",
                  borderRadius: "5px",
                  //   margin: "5px",
                }}
              >
                Next
              </button>
            </div>
          ) : (
            <div className={styles.buttonsRight}>
              <button
                onClick={handlePreviousPage}
                style={{
                  transform: "none",
                  padding: "5px",
                  //   paddingBottom: "2px",
                  borderRadius: "5px",
                  //   margin: "5px",
                }}
              >
                Previous
              </button>
              <span
                style={{
                  //   margin: "15px",
                  marginRight: "5px",
                  marginLeft: "5px",
                }}
              >
                Page {currentPage}
              </span>
              <button
                onClick={handleNextPage}
                style={{
                  transform: "none",
                  padding: "5px",
                  borderRadius: "5px",
                  //   margin: "5px",
                }}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Histories;
