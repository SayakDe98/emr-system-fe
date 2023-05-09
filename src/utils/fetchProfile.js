import axios from "axios";
import store from "../store";
import { profileActions } from "../store/profile-slice";

const fetchProfile = (userId) => {
  console.log("fetch profile userid", userId);
  return async (dispatch) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}user/${userId}`
      );
      const data = response.data.data;
      store.dispatch(profileActions.getProfileData(data));
    } catch (error) {
      store.dispatch(profileActions.errorFetchingData(error.message));
    }
  };
};

export default fetchProfile;
