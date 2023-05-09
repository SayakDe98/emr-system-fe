import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import styles from "./Encounters.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import Title from "../components/Title";

const Encounters = () => {
  const [encounters, setEncounters] = useState([]);
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

    const getAllEncounters = async (patientId) => {
      try {
        const encounters = await axios.get(
          `${process.env.REACT_APP_BASE_URL}encounter/?patient_id=${patientId}`
        );
        console.log(encounters.data.data);
        setEncounters(encounters.data.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    getPatient(userId);
    patientId && getAllEncounters(patientId);
  }, [userId, patientId]);
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (endIndex < encounters.length) {
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
      <Title titleName="Encounters" />
      {encounters.length < 1 && (
        <div className={styles.card} style={{ top: "500px", left: "800px" }}>
          <span style={{ color: "#55637e" }}>No Encounters found...</span>
        </div>
      )}
      {encounters.length > 0 && (
        <div className={styles.card}>
          {encounters.slice(startIndex, endIndex).map((encounter, i) => (
            <div className={styles.encounter} key={i}>
              <div className={styles.heading}>
                <span>Encounter</span>
                <p>{encounter.id}</p>
              </div>
              <div className={styles.date}>
                <i
                  className="fa-regular fa-calendar-days"
                  style={{ color: "#4696ff" }}
                ></i>
                <span>{moment(encounter.date).format("Do MMMM yyyy")}</span>
              </div>
              <div className={styles.reason}>
                <p>Reason</p>
                <span>{encounter.reason}</span>
              </div>
              <div className={styles.status}>
                <p>Status</p>
                <span>{encounter.status}</span>
              </div>
              <div className={styles.note}>
                <p>Note</p>
                <span>{encounter.note}</span>
              </div>
            </div>
          ))}
          {encounters.slice(startIndex, endIndex).length === 1 ? (
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
          ) : encounters.slice(startIndex, endIndex).length === 2 ? (
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

export default Encounters;
