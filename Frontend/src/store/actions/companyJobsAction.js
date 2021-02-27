import {
  NEW_JOB_POSTING,
  GET_ALL_JOBS,
  GET_JOB_APPLICANT_DETAILS,
  UPDATE_APPLICANT_STATUS,
} from './types';
import backendServer from '../../webConfig';
import axios from 'axios';

export const insertNewJobDetails = (jobData) => (dispatch) => {
  axios.defaults.headers.common['authorization'] = localStorage.getItem(
    'token',
  );
  axios
    .post(`${backendServer}glassdoor/jobs/`, jobData)
    .then((response) =>
      dispatch({
        type: NEW_JOB_POSTING,
        payload: response.data,
      }),
    )
    .catch((error) => {
      console.log(error);
    });
};

export const getAllJobs = (args) => (dispatch) => {
  axios.defaults.headers.common['authorization'] = localStorage.getItem(
    'token',
  );
  axios
    .get(`${backendServer}glassdoor/jobs/${args}/fetchjobs/`)
    .then((response) =>
      dispatch({
        type: GET_ALL_JOBS,
        payload: response.data,
      }),
    )
    .catch((error) => {
      console.log(error);
    });
};

export const getJobApplicantDetails = (args) => (dispatch) => {
  axios.defaults.headers.common['authorization'] = localStorage.getItem(
    'token',
  );
  axios
    .get(`${backendServer}glassdoor/jobs/${args}/applicantdetails/`)
    .then((response) =>
      dispatch({
        type: GET_JOB_APPLICANT_DETAILS,
        payload: response.data,
      }),
    )
    .catch((error) => {
      console.log(error);
    });
};

export const updateApplicantStatus = (args) => (dispatch) => {
  axios.defaults.headers.common['authorization'] = localStorage.getItem(
    'token',
  );
  axios
    .post(`${backendServer}glassdoor/jobs/applicantstatus/update`, args)
    .then((response) =>
      dispatch({
        type: UPDATE_APPLICANT_STATUS,
        payload: response.data,
      }),
    )
    .catch((error) => {
      console.log(error);
    });
};
