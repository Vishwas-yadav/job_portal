export const server = "http://localhost:9001";


const apiList = {
  login: `${server}/api/user/login`,
  signup: `${server}/api/user/register`,
  updateProfile: `${server}/api/user/updateprofile`,
  jobs: `${server}/api/jobs/getalljobs/`,
  jobDetails: `${server}/api/jobs/getjobdetails/`,
  jobApply: `${server}/api/apply`,
  jobsApplied: `${server}/api/apply/getappliedjobs/`,
  jobsByEmployer: `${server}/api/jobs/getjobsbyempid/`,
  jobApplications:  `${server}/api/apply/getcandlistforjob/`,
  createJob:  `${server}/api/jobs/`,
  applications: `${server}/api/applications/`,
  evaluateCandidate:  `${server}/api/apply/evaluate/`,
  employerDetails: `${server}/api/employer/`,
  candidateDetails: `${server}/api/candidate/`,
  applicants: `${server}/api/applicants`,
  verfifyEmployer: `${server}/api/admin/verify_emp`,
  verfifyCandidate: `${server}/api/admin/activate_cand`,
};

export default apiList;
