import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import styles from "./Appointments.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import Title from "../components/Title";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const userId =
    useSelector((state) => state.auth.userId) || localStorage.getItem("userId");
  const [patientId, setPatientId] = useState();
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const [patientName, setPatientName] = useState("");
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  useEffect(() => {
    const getPatient = async (userId) => {
      try {
        const patientData = await axios.get(
          `${process.env.REACT_APP_BASE_URL}patient/?user_id=${userId}`
        );
        console.log(patientData.data.data[0]?.id);
        console.log(patientData.data.data[0]?.first_name);

        setPatientName(
          `${patientData.data.data[0]?.first_name} ${patientData.data.data[0]?.last_name}`
        );
        setPatientId(patientData.data.data[0]?.id);
      } catch (error) {
        toast.error(error.message);
      }
    };

    const getAllAppointments = async (patientId) => {
      try {
        const appointment = await axios.get(
          `${process.env.REACT_APP_BASE_URL}appointment/?patient_id=${patientId}`
        );
        console.log(appointment.data.data);
        setAppointments(appointment.data.data);
      } catch (error) {
        toast.error(error.message);
      }
    };

    getPatient(userId);
    patientId && getAllAppointments(patientId);
  }, [userId, patientId]);
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (endIndex < appointments.length) {
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
      <Title titleName="Appointments" />
      {appointments.length < 1 && (
        <div className={styles.card} style={{ top: "500px", left: "800px" }}>
          <span style={{ color: "#55637e" }}>
            No Appointments scheduled till now...
          </span>
        </div>
      )}
      {appointments.length > 0 && (
        <div className={styles.card}>
          {appointments.slice(startIndex, endIndex).map((appointment, i) => (
            <div className={styles.appointment} key={i}>
              <div className={styles.heading}>
                <span>Appointment</span>
                <p>{appointment.id}</p>
              </div>
              <div className={styles.date}>
                <i
                  className="fa-regular fa-calendar-days"
                  style={{ color: "#4696ff" }}
                ></i>
                <span>
                  {moment(appointment.date).format("Do MMMM yyyy")}
                  &nbsp;at&nbsp;
                  {moment(appointment.date).format("h:mm:ss a")}
                </span>
              </div>
              <div className={styles.doctorName}>
                <p>Doctor Name</p>
                <span>
                  {appointment.doctor.first_name +
                    " " +
                    appointment.doctor.last_name}
                </span>
              </div>
              <div className={styles.patientName}>
                <p>Patient Name</p>
                <span style={{ textTransform: "capitalize" }}>
                  {patientName}
                </span>
              </div>
            </div>
          ))}
          {appointments.slice(startIndex, endIndex).length === 1 ? (
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
          ) : appointments.slice(startIndex, endIndex).length === 2 ? (
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

export default Appointments;
