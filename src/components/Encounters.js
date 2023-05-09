import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import styles from "./Encounters.module.css";

//reason, status, note, date
const Encounters = ({ encounter }) => {
  const [note, setNote] = useState((encounter && encounter.note) || "");
  if (!encounter) {
    return (
      <div className={styles.heading}>
        <span>No Encounters found...</span>
      </div>
    );
  }
  const { date, reason, status, id } = encounter;
  console.log(note);
  const submitNoteHandler = async (event) => {
    event.preventDefault();

    // if (note !== event.target.value) {
    try {
      console.log(event.target.value);
      const res = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}encounter/${id}`,
        { note: event.target.value }
      );
      console.log("res:", res);
    } catch (error) {
      console.log(error.message);
    }
    // }
  };
  return (
    <div className={styles.encounter}>
      <div className={styles.heading}>
        <span>Encounters</span>
        <p>Latest</p>
      </div>
      <div className={styles.date}>
        <i
          className="fa-regular fa-calendar-days"
          style={{ color: "#4696ff" }}
        ></i>
        <span>{moment(date).format("Do MMMM yyyy")}</span>
      </div>
      <div className={styles.reason}>
        <p>Reason</p>
        <span>{reason}</span>
      </div>
      <div className={styles.status}>
        <p>Status</p>
        <span>{status}</span>
      </div>
      <div className={styles.note}>
        <p>Note</p>
        <input
          type="text"
          placeholder="Write a note"
          onChange={(event) => setNote(event.target.value)}
          value={(!note && encounter?.note) || note}
          onBlur={submitNoteHandler}
          style={{
            boxShadow:
              "0 2px 7px 0 rgba(0, 0, 0, 0.1), 0 2px 7px 0 rgba(0, 0, 0, 0.1)",
          }}
        />
      </div>
    </div>
  );
};

export default Encounters;
