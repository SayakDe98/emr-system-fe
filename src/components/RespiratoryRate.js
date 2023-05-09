import moment from "moment";
import React from "react";
import Bar from "./Bar";
import Circle from "./Circle";
import styles from "./RespiratoryRate.module.css";

const RespiratoryRate = ({ patientId, dgRep, dob }) => {
  const rp = dgRep && dgRep?.respiratory_rate;
  const maxWidth = 150;
  let min, max, width, color;

  if (!dgRep || !rp) {
    return (
      <div className={styles.heading}>
        <span>No Respiratory rate records found...</span>
      </div>
    );
  }

  if (rp && dob) {
    const today = moment();
    const birthDate = moment(dob);
    const ageInMonths = today.diff(birthDate, "months");
    const ageInYears = today.diff(birthDate, "years");
    width = ((rp / maxWidth) * 100).toString() + "%";
    if (ageInMonths < 12) {
      // the person is less than 1 year old
      // do something...
      min = 30;
      max = 60;

      if (rp > max + 40 || rp < min - 20) {
        color = "red";
      }
      if (rp > max + 20 || rp < min - 10) {
        color = "#CC9D06";
      }
      if (rp <= max && rp >= min) {
        color = "green";
      }
    }
    if (ageInYears >= 1 && ageInYears < 3) {
      // the person is between 1 and 3 years old
      // do something...
      min = 24;
      max = 40;
      if (rp > max + 60 || rp < min - 14) {
        color = "red";
      }
      if (rp > max + 40 || rp < min - 4) {
        color = "#CC9D06";
      }
      if (rp <= max && rp >= min) {
        color = "green";
      }
    }
    if (ageInYears >= 3 && ageInYears < 6) {
      // the person is between 3 and 6 years old
      // do something...
      min = 22;
      max = 34;
      if (rp > max + 66 || rp < min - 12) {
        color = "red";
      }
      if (rp > max + 46 || rp < min - 2) {
        color = "#CC9D06";
      }
      if (rp <= max && rp >= min) {
        color = "green";
      }
    }
    if (ageInYears >= 6 && ageInYears < 12) {
      // the person is between 6 and 12 years old
      // do something...
      min = 18;
      max = 30;
      if (rp > max + 70 || rp < min - 8) {
        color = "red";
      }
      if (rp > max + 50 || rp < min - 4) {
        color = "#CC9D06";
      }
      if (rp <= max && rp >= min) {
        color = "green";
      }
    }
    if (ageInYears >= 12 && ageInYears < 18) {
      // the person is between 12 and 18 years old
      // do something...
      min = 12;
      max = 16;
      if (rp > max + 84 || rp < min - 2) {
        color = "red";
      }
      if (rp > max + 64 || rp < min - 1) {
        color = "#CC9D06";
      }
      if (rp <= max && rp >= min) {
        color = "green";
      }
    }
    if (ageInYears >= 18) {
      // the person is over 18 years old
      // do something...
      min = 12;
      max = 20;
      if (rp > max + 80 || rp < min - 2) {
        color = "red";
      }
      if (rp > max + 60 || rp < min - 1) {
        color = "#CC9D06";
      }
      if (rp <= max && rp >= min) {
        color = "green";
      }
    }
  }
  //   let width = rp && ((rp / 180) * 100).toString() + "%";
  //   let color;
  //   if (bp && bp <= 120) {
  //     color = "green";
  //   } else if (bp && bp <= 139 && bp > 120) {
  //     color = "#CC9D06";
  //   } else if (bp && bp > 139) {
  //     color = "red";
  //   }
  return (
    <div className={styles.res}>
      <div className={styles.heading}>
        <span>Respiratory rate</span>
        <p>Latest</p>
      </div>
      <div className={styles.identities}>
        <div className={styles.identity}>
          <Circle bgColor="green" />
          Normal
        </div>
        <div className={styles.identity}>
          <Circle bgColor="#CC9D06" />
          Warning
        </div>
        <div className={styles.identity}>
          <Circle bgColor="red" />
          Abnormal
        </div>
      </div>
      <div className={styles.data}>
        <p>Bpm:</p>
        <Bar width={width} color={color} height={10} />
      </div>
    </div>
  );
};

export default RespiratoryRate;
