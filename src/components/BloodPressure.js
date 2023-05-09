import axios from "axios";
import React, { useEffect, useState } from "react";
import Bar from "./Bar";
import styles from "./BloodPressure.module.css";
import Circle from "./Circle";
const BloodPressure = ({ patientId, dgRep }) => {
  const bp = dgRep && dgRep?.systolic_bp;
  if (!dgRep || !bp) {
    return (
      <div className={styles.heading}>
        <span>No Blood Pressure reports found...</span>
      </div>
    );
  }
  const width = bp && ((bp / 180) * 100).toString() + "%";
  let color;
  if (bp && bp <= 120) {
    color = "green";
  } else if (bp && bp <= 139 && bp > 120) {
    color = "#CC9D06";
  } else if (bp && bp > 139) {
    color = "red";
  }
  // let bp;
  // const [width, setWidth] = useState();
  // const [color, setColor] = useState();
  // useEffect(() => {
  //   const getBp = async (patientId) => {
  //     try {
  //       const diagnosticReport = await axios.get(
  //         `${process.env.REACT_APP_BASE_URL}diagnostic_report/latest/?patient_id=${patientId}`
  //       );
  //       bp = diagnosticReport.data.data?.systolic_bp;
  //       setWidth(bp && ((bp / 180) * 100).toString() + "%");
  //       console.log(width);
  //       if (bp && bp <= 120) {
  //         setColor("green");
  //       } else if (bp && bp <= 139 && bp > 120) {
  //         setColor("#CC9D06");
  //       } else if (bp && bp > 139) {
  //         setColor("red");
  //       }
  //       console.log(bp);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };
  //   getBp(patientId);
  // }, [patientId]);
  return (
    <div className={styles.bp}>
      <div className={styles.heading}>
        <span>Blood pressure</span>
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
        <p>SYS:</p>
        <div className={styles.barAndRange}>
          <Bar width={width} color={color} />
          <div className={styles.range}>
            <p>Min: 120mmHg</p>
            <p>Max: 180 mmHg</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BloodPressure;
