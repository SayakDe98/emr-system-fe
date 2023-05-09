import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import fetchProfile from "../utils/fetchProfile";
import styles from "./Profile.module.css";

const Profile = () => {
  const dispatch = useDispatch();
  const { profileData, isLoading, error } = useSelector(
    (state) => state.profile
  );
  const userId =
    useSelector((state) => state.auth.userId) || localStorage.getItem("userId");
  console.log("userid profile", userId);
  useEffect(() => {
    dispatch(fetchProfile(userId));
  }, [dispatch, userId]);
  if (isLoading) {
    return (
      <>
        <Topbar logout={true} login={false} signup={false} />
        <Card>
          <p>Loading...</p>;
        </Card>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Topbar logout={true} login={false} signup={false} />
        <Card>
          <p>{error.message}</p>
        </Card>
      </>
    );
  }

  if (!profileData) {
    return (
      <>
        <Topbar logout={true} login={false} signup={false} profile={false} />
        <Card>
          <p>No profiles found!</p>;
        </Card>
      </>
    );
  }
  return (
    <>
      <Topbar logout={true} login={false} signup={false} home={true} />
      <Sidebar />
      <div className={styles.cardContainer}>
        <Card>
          <div className={styles.header}>
            <h4>{profileData.permissions} PROFILE</h4>
            <h2>
              {profileData.first_name} {profileData.last_name}
            </h2>
          </div>
          <div className={styles.row1}>
            <h4>
              <i className="fa-solid fa-user"></i>&nbsp;
              {profileData.username}
            </h4>
            <h4>
              <i
                className={
                  profileData.gender === "Male"
                    ? "fa-solid fa-mars"
                    : profileData.gender === "Female"
                    ? "fa-solid fa-venus"
                    : "fa-solid fa-mars-and-venus"
                }
              ></i>
              &nbsp;
              {profileData.gender}
            </h4>
            <h4>
              <i className="fa-solid fa-baby fa-bounce"></i>&nbsp;
              {moment(profileData.dob).format("Do MMMM yyyy")}
            </h4>
          </div>
          <div className={styles.row2}>
            <h4>State: {profileData.state}</h4>
            <h4>
              <i className="fa-solid fa-city"></i>&nbsp;{profileData.city}
            </h4>
            <h4 className={styles.permissions}>
              <i className="fa-solid fa-user-lock fa-shake"></i>&nbsp;
              {profileData.permissions}
            </h4>
          </div>
          <div className={styles.row3}>
            <h4>
              <i className="fa-solid fa-graduation-cap fa-bounce"></i>&nbsp;
              {profileData.highest_qualification}
            </h4>
            <h4>
              <i className="fa-solid fa-phone fa-bounce"></i>
              &nbsp;{profileData.cellphone}
            </h4>
            <h4>Zip Code: {profileData.zipcode}</h4>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Profile;
