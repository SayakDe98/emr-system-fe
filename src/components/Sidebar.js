import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import fetchProfile from "../utils/fetchProfile";
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;
  console.log(location.pathname);
  const navigate = useNavigate();
  const userId =
    useSelector((state) => state.auth.userId) || localStorage.getItem("userId");
  console.log("userID sidebar", userId);
  const { profileData } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProfile(userId));
  }, [dispatch, userId]);
  return (
    <div className={styles.sidebar}>
      {/* <div className={styles.header}>
        {profileData && profileData.permissions === "ADMIN" && (
          <div className={styles.headerGroup}>
            <i className="fa fa-solid fa-user-shield"></i>
            <span>ADMIN</span>
          </div>
        )}
        {profileData && profileData.permissions === "PATIENT" && (
          <div className={styles.headerGroup}>
            <i className="fa fa-solid fa-bed"></i>
            <span>PATIENT</span>
          </div>
        )}
        {profileData && profileData.permissions === "DOCTOR" && (
          <div className={styles.headerGroup}>
            <i className="fa fa-solid fa-user-doctor"></i>
            <span>DOCTOR</span>
          </div>
        )}
      </div> */}
      <div className={styles.pages}>
        <ul>
          {profileData &&
            profileData.permissions !== "DOCTOR" &&
            path !== "/encounters" && (
              <li onClick={() => navigate("/encounters")}>Encounters</li>
            )}
          {profileData &&
            profileData.permissions !== "DOCTOR" &&
            path === "/encounters" && (
              <>
                <li
                  className={styles.currentPage}
                  onClick={() => navigate("/encounters")}
                >
                  Encounters
                </li>
              </>
            )}
          {profileData &&
            profileData.permissions !== "DOCTOR" &&
            path !== "/histories" && (
              <li onClick={() => navigate("/histories")}>History</li>
            )}
          {profileData &&
            profileData.permissions !== "DOCTOR" &&
            path === "/histories" && (
              <>
                <li
                  className={styles.currentPage}
                  onClick={() => navigate("/histories")}
                >
                  History
                </li>
              </>
            )}
          {profileData &&
            profileData.permissions !== "DOCTOR" &&
            path !== "/reports" && (
              <li onClick={() => navigate("/reports")}>Diagnostic Report</li>
            )}
          {profileData &&
            profileData.permissions !== "DOCTOR" &&
            path === "/reports" && (
              <li
                className={styles.currentPage}
                onClick={() => navigate("/reports")}
              >
                Diagnostic Report
              </li>
            )}
          {profileData &&
            profileData.permissions !== "DOCTOR" &&
            path !== "/reminders" && (
              <li onClick={() => navigate("/reminders")}>
                Medication Reminders
              </li>
            )}
          {profileData &&
            profileData.permissions !== "DOCTOR" &&
            path === "/reminders" && (
              <li
                className={styles.currentPage}
                onClick={() => navigate("/reminders")}
              >
                Medication Reminders
              </li>
            )}
          {path !== "/appointments" && (
            <li onClick={() => navigate("/appointments")}>Appointments</li>
          )}
          {path === "/appointments" && (
            <li
              className={styles.currentPage}
              onClick={() => navigate("/appointments")}
            >
              Appointments
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
