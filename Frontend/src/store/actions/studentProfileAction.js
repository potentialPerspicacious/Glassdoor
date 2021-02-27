import { STUDENT_PROFILE_DATA, STUDENT_DEMOGRAPHICS_DATA } from './types';
import backendServer from '../../webConfig';
import axios from 'axios';

export const getStudentProfile = () => (dispatch) => {
  axios.get(`${backendServer}student/profile/${localStorage.getItem("sql_student_id")}`, 
  {headers: { Authorization: `${localStorage.getItem("token")}` }
  })    
  .then((response) =>
      dispatch({
        type: STUDENT_PROFILE_DATA,
        payload: response.data[0],
      }),
    )
    .catch((error) => {
      console.log(error);
    });
};

export const getStudentDemographics = () => (dispatch) => {
  axios.get(`${backendServer}student/getStudentDemographics/${localStorage.getItem("sql_student_id")}`, 
  {headers: { Authorization: `${localStorage.getItem("token")}` }
  })    
  .then((response) =>
      dispatch({
        type: STUDENT_DEMOGRAPHICS_DATA,
        payload: response.data[0],
      }),
    )
    .catch((error) => {
      console.log(error);
    });
};