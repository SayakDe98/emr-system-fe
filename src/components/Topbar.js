import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from "../store/auth-slice";
import fetchProfile from "../utils/fetchProfile";
import style from "./Topbar.module.css";

const Topbar = ({ signup, login, logout, profile, home }) => {
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const userId =
    useSelector((state) => state.auth.userId) || localStorage.getItem("userId");
  useEffect(() => {
    dispatch(fetchProfile(userId));
  }, [dispatch, userId]);
  const profileData = useSelector((state) => state.profile?.profileData);
  const firstName = profileData?.first_name;
  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    dispatch(authActions.isLoggedIn());
  };
  const searchDataChangeHandler = async (event) => {
    setSearchData(event.target.value);
    console.log(event.target.value);
    if (event.target.value) {
      const results = await axios.get(
        `${process.env.REACT_APP_BASE_URL}doctor/?search=${event.target.value}`
      );
      setSearchResults(results.data.data);
      console.log(searchResults);
    }
    if (!event.target.value) {
      setSearchResults([]);
    }
  };
  const searchDataHandler = async (event) => {
    event.preventDefault();
    const results = await axios.get(
      `${process.env.REACT_APP_BASE_URL}doctor/?search=${searchData}`
    );
    setSearchResults(results.data.data);
    console.log(searchResults);
  };

  //replace a tags with Link
  return (
    <div className={style.topbar}>
      <div className={style.medical}>
        <i
          className="fa-sharp fa-regular fa-hospital"
          style={{ color: "#2784ff", fontSize: 50, marginRight: "40px" }}
        ></i>
        <Link className={style.title} to="/">
          Medical Clinic
        </Link>
      </div>
      {logout && (
        <div className={style.searchContainer}>
          <div className={style.searchbar}>
            <button
              type="submit"
              className={style.search}
              onClick={searchDataHandler}
            >
              <i className="fa fa-search" style={{ fontSize: 20 }}></i>
            </button>
            <input
              placeholder="Search doctor"
              type="search"
              // value={searchData}
              onChange={searchDataChangeHandler}
              style={{ color: "#9daecd" }}
            />
          </div>
          {searchResults && searchResults.length > 0 && (
            <div className={style.searchResults}>
              <ul>
                {searchResults.map((data) => {
                  return (
                    <li
                      key={data.id}
                      style={{
                        margin: 0,
                        padding: 10,
                        borderBottom: "1px solid white",
                        cursor: "pointer",
                      }}
                      onClick={() => console.log(data.id)}
                    >
                      {data.first_name}&nbsp;
                      {data.last_name}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}

      <div className={style.buttons}>
        {signup && (
          <Link className={style.signup} to="/signup">
            Sign up
          </Link>
        )}
        {login && (
          <Link className={style.login} to="/login">
            Log in
          </Link>
        )}
        {home && (
          <Link className={style.login} to="/app">
            Home
          </Link>
        )}
        {profile && (
          <>
            <i
              className="fa-solid fa-bell"
              style={{
                padding: "10px",
                backgroundColor: "#529dff",
                color: "white",
                // border: "1px solid black",
                borderRadius: "15px",
                marginRight: "15px",
              }}
            ></i>
            <Link className={style.login} to="/profile">
              <span>Hello</span>&nbsp;
              {firstName}
            </Link>
          </>
        )}
        {logout && (
          <Link className={style.login} to="/" onClick={logoutHandler}>
            Log out
          </Link>
        )}
      </div>
    </div>
  );
};

export default Topbar;
