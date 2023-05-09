import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import styles from "./Reminders.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import Title from "../components/Title";

const Reminders = () => {
  const [histories, setHistories] = useState([]);
  const [reminders, setReminders] = useState([]);
  const userId =
    useSelector((state) => state.auth.userId) || localStorage.getItem("userId");
  const [patientId, setPatientId] = useState();
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [done, setDone] = useState(false);

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
        setDone(true);
      } catch (error) {
        toast.error(error.message);
      }
    };

    const getAllReminders = async (patientHistoryId) => {
      try {
        const reminders = await axios.get(
          `${process.env.REACT_APP_BASE_URL}medication_usage/?patient_history_id=${patientHistoryId}`
        );
        console.log("reminders", reminders.data.data);
        setReminders((current) => [...current, ...reminders.data.data]);
      } catch (error) {
        toast.error(error.message);
      }
    };

    getPatient(userId);
    patientId && getAllHistories(patientId);
    patientId &&
      done &&
      histories.length > 0 &&
      histories.map((history) => {
        getAllReminders(history.id);
      });
  }, [userId, patientId, done]);
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (endIndex < reminders.length) {
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
      <Title titleName="Reminders" />
      {reminders.length < 1 && (
        <div className={styles.card} style={{ top: "500px", left: "800px" }}>
          <span style={{ color: "#55637e" }}>No Reminders found...</span>
        </div>
      )}
      {reminders.length > 0 && (
        <div className={styles.card}>
          {reminders.slice(startIndex, endIndex).map((reminder, i) => (
            <div className={styles.reminder} key={i}>
              <div className={styles.heading}>
                <span>Reminder</span>
              </div>
              <div className={styles.date}>
                <i
                  className="fa-regular fa-calendar-days"
                  style={{ color: "#4696ff" }}
                ></i>
                <span>{moment(reminder.date).format("Do MMMM yyyy")}</span>
              </div>
              <div className={styles.name}>
                <p>Medicine Name</p>
                <span>{reminder.medication_name}</span>
              </div>
              <div className={styles.frequency}>
                <p>Medication Frequency</p>
                <span>{reminder.medication_frequency}</span>
              </div>
            </div>
          ))}
          {reminders.slice(startIndex, endIndex).length === 1 ? (
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
          ) : reminders.slice(startIndex, endIndex).length === 2 ? (
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

export default Reminders;
