import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import StudentHome from './Student/LandingPage/home_student';
import StudentProfile from './Student/Profile/profile_student';
import StudentResume from './Student/Resume/resume_student';
import StudentJobPreferences from './Student/JobPreferences/jobpreferences';
import StudentDemographics from './Student/Demographics/demographics';
import SalaryContribution from './Student/Contributions/salaries';
import ReviewContribution from './Student/Contributions/reviews';
import PhotosContribution from './Student/Contributions/photos';
import InterviewContribution from './Student/Contributions/interviews';
import Login from './Student/Login/Login';
import CompanyLogin from './Employer/Login/companyLogin';
import companyProfile from './Employer/Profile/companyProfile';
import updateCompany from './Employer/Profile/profileUpdate';
import AddJob from './Employer/Jobs/AddJob';
import Jobs from './Employer/Jobs/Jobs';
import companyReviews from './Employer/Reviews/companyReviews';
import AddInterview from './Student/Interview/AddInterview';
import ApplicantDetails from './Employer/Jobs/ApplicantDetails';
import StudentProfileReadonly from './Student/Profile/profile_student_readonly';
import SearchJob from './Student/Search/search_jobs';
import SearchCompany from './Student/Search/search_company';
import SearchInterview from './Student/Search/search_interview';
import ReviewTab from './Student/Reviews/ReviewTab';
import AddReview from './Student/Reviews/AddReview';
import SalaryTab from './Student/Salary/AddSalary';
import companyReport from './Employer/Report/companyReport';
import adminCompanyProfile from './Admin/companyProfile/adminCompany';
import HomeTabs from './Student/Tabs/homeTabs';
import SearchSalary from './Student/Search/search_salary';
import searchAdminCompany from './Admin/companyProfile/searchAdminCompany';
import adminCompanyReview from './Admin/companyProfile/adminCompanyReview';
import adminCompanyReport from './Admin/companyProfile/statistics';
//import adminDemographics from './Admin/companyProfile/demographics';
import nonUserLanding from './nonUser/landingPage';
import nonUserCompanyReview from './nonUser/nonUserReviews';
import CompanyOverview from './Student/CompanyOverview/companyOverview';
import JobsTab from './Student/Jobs/jobsTab';
import JobDetails from './Student/Job/JobDetails';
import PhotosTab from './Student/Photos/photosTab';
import JobHome from './Student/Job/JobHome';
import AnalyticsHome from './Admin/Dashboard/analyticsHome';
import InterviewList from './Student/Interview/InterviewList';
import InterviewAnswers from './Student/Interview/InterviewAnswers';
import adminReview from './Admin/reviewsPhotos/allReviews';
import adminPhotos from './Admin/reviewsPhotos/allPhotos';
import AppliedJobs from './Student/Job/AppliedJobs';

class Main extends Component {
  render() {
    return (
      <div>
        <Route exact path='/signup' component={Login} />
        <Route exact path='/student/home' component={StudentHome} />
        <Route exact path='/student/profile' component={StudentProfile} />
        <Route exact path='/student/resume' component={StudentResume} />
        <Route
          exact
          path='/student/jobPreference'
          component={StudentJobPreferences}
        />
        <Route
          exact
          path='/student/demographics'
          component={StudentDemographics}
        />
        <Route
          exact
          path='/student/contributions/salaries'
          component={SalaryContribution}
        />
        <Route
          exact
          path='/student/contributions/reviews'
          component={ReviewContribution}
        />
        <Route
          exact
          path='/student/contributions/interviews'
          component={InterviewContribution}
        />
        <Route
          exact
          path='/student/contributions/photos'
          component={PhotosContribution}
        />
        <Route exact path='/student/login' component={Login} />
        <Route exact path='/company/login' component={CompanyLogin} />
        <Route exact path='/company/home' component={companyProfile} />
        <Route exact path='/company/profileUpdate' component={updateCompany} />
        <Route exact path='/company/addjob' component={AddJob} />
        <Route exact path='/company/jobs' component={Jobs} />
        <Route
          exact
          path='/company/jobs/applicantdetails'
          component={ApplicantDetails}
        />
        <Route
          exact
          path='/company/jobs/applicantdetails/viewapplicant'
          component={StudentProfileReadonly}
        />
        <Route exact path='/company/reviews' component={companyReviews} />
        <Route exact path='/student/interview/add' component={AddInterview} />
        <Route exact path='/student/interview/list' component={InterviewList} />
        <Route
          exact
          path='/student/interview/answers'
          component={InterviewAnswers}
        />
        <Route
          exact
          path='/student/search/job/:keyword'
          component={SearchJob}
        />
        <Route
          exact
          path='/student/search/company/:keyword'
          component={SearchCompany}
        />
        <Route
          exact
          path='/student/search/interview/:keyword'
          component={SearchInterview}
        />
        <Route
          exact
          path='/student/search/salary/:keyword'
          component={SearchSalary}
        />
        <Route
          exact
          path='/student/reviews/:companyName'
          component={ReviewTab}
        />
        <Route exact path='/student/addreviews' component={AddReview} />
        <Route exact path='/company/report/:title' component={companyReport} />
        <Route
          exact
          path='/student/salary/:companyName'
          component={SalaryTab}
        />
        <Route
          exact
          path='/student/companyoverview/:companyID'
          component={CompanyOverview}
        />
        <Route exact path='/student/jobs/:companyName' component={JobsTab} />
        <Route exact path='/student/tabs' component={HomeTabs} />
        <Route exact path='/student/tabs/photos' component={PhotosTab} />
        <Route exact path='/student/job/jobdetails' component={JobDetails} />
        <Route exact path='/admin/home' component={AnalyticsHome} />
        <Route
          exact
          path='/admin/companyProfile'
          component={adminCompanyProfile}
        />
        <Route
          exact
          path='/admin/search/company/:keyword'
          component={searchAdminCompany}
        />
        <Route
          exact
          path='/admin/companyReview/:companyName'
          component={adminCompanyReview}
        />
        <Route
          exact
          path='/admin/statistics/:companyName'
          component={adminCompanyReport}
        />
        <Route exact path='/admin/allReviews' component={adminReview} />
        <Route exact path='/' component={nonUserLanding} />
        <Route
          exact
          path='/reviews/:companyName'
          component={nonUserCompanyReview}
        />
        <Route exact path='/admin/allPhotos' component={adminPhotos} />
        <Route exact path='/student/job/home' component={JobHome} />
        <Route exact path='/student/job/appliedJobs' component={AppliedJobs} />
      </div>
    );
  }
}

export default Main;
