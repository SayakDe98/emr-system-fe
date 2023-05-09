import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BloodPressure from "../components/BloodPressure";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import styles from "./Dashboard.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RespiratoryRate from "../components/RespiratoryRate";
import Encounters from "../components/Encounters";
import fetchProfile from "../utils/fetchProfile";
import History from "../components/History";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [dgRep, setDgRep] = useState();
  const [encounter, setEncounter] = useState();
  const [history, setHistory] = useState();
  const userId =
    useSelector((state) => state.auth.userId) || localStorage.getItem("userId");

  useEffect(() => {
    dispatch(fetchProfile(userId));
  }, [dispatch, userId]);
  const [patientId, setPatientId] = useState();
  const [dob, setDob] = useState();
  useEffect(() => {
    const getPatient = async (userId) => {
      try {
        const patientData = await axios.get(
          `${process.env.REACT_APP_BASE_URL}patient/?user_id=${userId}`
        );
        console.log(patientData.data.data[0]?.id);
        setPatientId(patientData.data.data[0]?.id);
        setDob(patientData.data.data[0]?.dob);
      } catch (error) {
        toast.error(error.message);
      }
    };
    const getLatestDiagnosticReport = async (patientId) => {
      try {
        const diagnosticReport = await axios.get(
          `${process.env.REACT_APP_BASE_URL}diagnostic_report/latest/?patient_id=${patientId}`
        );
        setDgRep(diagnosticReport.data.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    const getLatestEncounter = async (patientId) => {
      try {
        const encounter = await axios.get(
          `${process.env.REACT_APP_BASE_URL}encounter/latest?patient_id=${patientId}`
        );
        console.log(encounter.data.data);
        setEncounter(encounter.data.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    const getLatestPatientHistory = async (patientId) => {
      try {
        const history = await axios.get(
          `${process.env.REACT_APP_BASE_URL}patient_history/latest?patient_id=${patientId}`
        );
        console.log(history.data.data);
        setHistory(history.data.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getPatient(userId);
    patientId && getLatestDiagnosticReport(patientId);
    patientId && getLatestEncounter(patientId);
    patientId && getLatestPatientHistory(patientId);
  }, [userId, patientId, dob]);

  return (
    <>
      <Topbar
        signup={false}
        login={false}
        logout={true}
        profile={true}
        home={false}
      />
      <Sidebar />
      {patientId && (
        <div className={styles.bpCard}>
          <BloodPressure patientId={patientId} dgRep={dgRep} />
        </div>
      )}
      {patientId && dob && (
        <div className={styles.rpCard}>
          <RespiratoryRate patientId={patientId} dgRep={dgRep} dob={dob} />
        </div>
      )}
      {patientId && (
        <div className={styles.encounterCard}>
          <Encounters encounter={encounter} />
        </div>
      )}
      {patientId && (
        <div className={styles.historyCard}>
          <History history={history} />
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Dashboard;
