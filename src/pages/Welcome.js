import React from "react";
import styles from "./Welcome.module.css";
import clinicLogo from "../assets/clinic.jpeg";
import Topbar from "../components/Topbar";
import { useSelector } from "react-redux";

const Welcome = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const userId = useSelector((state) => state.auth.userId);
  const user = (!!isLoggedIn && !!userId) || false;
  console.log("Log in", user);
  return (
    <div className={styles.container}>
      <Topbar
        signup={!user}
        login={!user}
        logout={user}
        profile={user}
        home={user}
      />
      <div className={styles.welcome}>
        <h1>Welcome to EMR</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed nisi
          tempus, pulvinar mi eget, tempus mauris. Ut tellus magna, pulvinar et
          metus nec, aliquam placerat nibh. Sed fermentum tincidunt aliquam.
          Proin faucibus urna nunc, a egestas lorem pulvinar in. Aliquam lorem
          ante, semper eu sem ut, vehicula iaculis magna. Nulla quam lectus,
          eleifend in leo quis, sagittis euismod urna. Nam luctus purus risus,
          euismod egestas urna eleifend vel. Suspendisse enim augue, fermentum
          lacinia augue eu, dignissim aliquet libero. Etiam a orci sit amet
          risus luctus accumsan vel id ante. Donec sem ipsum, pharetra a
          fermentum non, lobortis quis libero. Nulla eros purus, eleifend vel
          aliquet eu, vestibulum et urna. In facilisis fringilla tempor. Etiam
          in vulputate lorem. Nam vehicula in purus quis dictum. Nunc enim eros,
          interdum ac justo at, sollicitudin cursus dui. Interdum et malesuada
          fames ac ante ipsum primis in faucibus. Sed gravida porttitor turpis,
          sit amet tempus ipsum gravida id. Nam at justo mauris. Etiam facilisis
          pretium bibendum. Maecenas consectetur bibendum massa, eget tempus
          ipsum sollicitudin eu. Proin convallis turpis libero, ut gravida elit
          aliquet at. Suspendisse sed massa at sem venenatis iaculis vitae in
          massa. Sed scelerisque nec arcu quis iaculis. Aenean quis ultrices
          nibh.
        </p>
      </div>
      <div>
        <img src={clinicLogo} alt="clinic" />
      </div>
      <div className={styles.features}>
        <h1>Features of EMR</h1>
        <div className={styles.featuretext}>
          <ul>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut
              tristique lectus, eget pretium libero. Pellentesque et purus
              tristique, hendrerit purus quis, posuere elit.
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut
              tristique lectus, eget pretium libero. Pellentesque et purus
              tristique, hendrerit purus quis, posuere elit.
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut
              tristique lectus, eget pretium libero. Pellentesque et purus
              tristique, hendrerit purus quis, posuere elit.
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut
              tristique lectus, eget pretium libero. Pellentesque et purus
              tristique, hendrerit purus quis, posuere elit.
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut
              tristique lectus, eget pretium libero. Pellentesque et purus
              tristique, hendrerit purus quis, posuere elit.
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut
              tristique lectus, eget pretium libero. Pellentesque et purus
              tristique, hendrerit purus quis, posuere elit.
            </li>
            <li>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut
              tristique lectus, eget pretium libero. Pellentesque et purus
              tristique, hendrerit purus quis, posuere elit.
            </li>
          </ul>
          {/* <img src={doctorLogo}></img> */}
        </div>
      </div>
    </div>
  );
};

export default Welcome;
