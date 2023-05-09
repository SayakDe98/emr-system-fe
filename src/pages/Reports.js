import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import styles from "./Reports.module.css";

const Reports = () => {
  const [reports, setReports] = useState([]);
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

    const getAllReports = async (patientId) => {
      try {
        const reports = await axios.get(
          `${process.env.REACT_APP_BASE_URL}diagnostic_report/?patient_id=${patientId}`
        );
        console.log(reports.data.data);
        setReports(reports.data.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    getPatient(userId);
    patientId && getAllReports(patientId);
  }, [userId, patientId]);
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (endIndex < reports.length) {
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
      {reports.length < 1 && (
        <div className={styles.card} style={{ top: "500px", left: "800px" }}>
          <span style={{ color: "#55637e" }}>
            No Diagnostic Reports found...
          </span>
        </div>
      )}
      {reports.length > 0 && (
        <div className={styles.card}>
          {reports.slice(startIndex, endIndex).map((report, i) => (
            <div className={styles.reports} key={i}>
              <div className={styles.heading}>
                <span>Diagnostic Report</span>
                <p>{report.id}</p>
              </div>
              <div className={styles.gridContainer}>
                <div className={styles.respiratoryRate}>
                  <p>Respiratory Rate</p>
                  <span>{report.respiratory_rate}</span>
                </div>
                <div className={styles.oxygenSaturation}>
                  <p>Oxygen Saturation</p>
                  <span>{report.oxygen_saturation}</span>
                </div>
                <div className={styles.supplementalOxygen}>
                  <p>Supplemental Oxygen</p>
                  <span>{report.supplemental_oxygen}</span>
                </div>
                <div className={styles.bodyTemperature}>
                  <p>
                    Body Temperature(in <sup>o</sup>C)
                  </p>
                  <span>{report.body_temperature}</span>
                </div>
                <div className={styles.systolicBp}>
                  <p>Systolic BP</p>
                  <span>{report.systolic_bp}</span>
                </div>
                <div className={styles.heart_rate}>
                  <p>Heart Rate</p>
                  <span>{report.heart_rate}</span>
                </div>
                <div className={styles.levelOfConsciousness}>
                  <p>Level Of Consciousness</p>
                  <span>{report.level_of_consciousness}</span>
                </div>
                <div className={styles.doctor}>
                  <p>Doctor</p>
                  <span>
                    {report.doctor.first_name + " " + report.doctor.last_name}
                  </span>
                </div>
                <div className={styles.date}>
                  <i
                    className="fa-regular fa-calendar-days"
                    style={{ color: "#4696ff" }}
                  ></i>
                  <span>{moment(report.date).format("Do MMMM yyyy")}</span>
                </div>
              </div>
            </div>
          ))}
          {reports.slice(startIndex, endIndex).length === 1 ? (
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
          ) : reports.slice(startIndex, endIndex).length === 2 ? (
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

export default Reports;
