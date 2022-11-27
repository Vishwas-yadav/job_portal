import { useState, useEffect, useContext } from "react";
import {
  Button,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  Paper,
  TextField,
  Typography,
  Modal,
  Slider,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Checkbox,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from "@material-ui/icons/FilterList";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import { SetPopupContext } from "../App";

import apiList from "../lib/apiList";
import isAuth, { userType } from "../lib/isAuth";

const useStyles = makeStyles((theme) => ({
  body: {
    height: "inherit",
  },
  button: {
    width: "100%",
    height: "100%",
  },
  jobTileOuter: {
    padding: "30px",
    margin: "20px 0",
    boxSizing: "border-box",
    width: "100%",
  },
  popupDialog: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const JobTile = (props) => {


  const classes = useStyles();
  const { job } = props;
  const setPopup = useContext(SetPopupContext);
  useEffect(() => {
    getOrgName();
    if (isAuth()){
      if (userType() !== "employer") 
        getcandId()}
  }, []);

  const [organizationName, setOrganizationName] = useState("");
  const [candId, setCadidId] = useState("");
  const [open, setOpen] = useState(false);
  const [sop, setSop] = useState("");

  const handleClose = () => {
    setOpen(false);
    setSop("");
  };

  const getcandId = () => {
    axios
      .get(apiList.candidateDetails, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data.res);
        let email = localStorage.getItem("email");
        console.log(email)
        let profile = response.data.res
          .filter(x => x.email === email);
        setCadidId(profile[0]._id);
      })
      .catch((err) => {
        console.log(err.res);
        setPopup({
          open: true,
          severity: "error",
          message: "Error",
        });
      });
  };

  const getOrgName = () => {
    axios
      .get(apiList.employerDetails + job.empId, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data.res.organizationName);
        setOrganizationName(response.data.res.organizationName)
      })
      .catch((err) => {
        console.log(err);
        setPopup({
          open: true,
          severity: "error",
          message: "Error",
        });
      });
  }

  const handleApply = () => {
    console.log(job._id);
    axios
      .post(
        `${apiList.jobApply}`,
        {
          jobId: job._id,
          candId: candId,
          applicationStatus: "Applied"
        },
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setPopup({
          open: true,
          severity: "success",
          message: response.data.msg,
        });
        handleClose();
      })
      .catch((err) => {
        console.log(err.response);
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.err,
        });
        handleClose();
      });
  };

  return (
    <Paper className={classes.jobTileOuter} elevation={2}>
      <Grid container>
        <Grid container item xs={10} spacing={1} direction="column">
          <Grid item>
            <Typography variant="h5">{job.jobtitle}</Typography>
          </Grid>
          <Grid item>Salary : &#8377; {job.salary} per month</Grid>
          <Grid item>Description : {job.description}</Grid>
          <Grid item>Qualification : {job.qualification}</Grid>
          <Grid item>Location : {job.joblocation}</Grid>
          <Grid item>Job Sector : {job.jobsector}</Grid>
          <Grid item>Posted by : {organizationName}</Grid>
        </Grid>
        <Grid item xs={1}>
          <Button
            style={{
              maxHeight: "3em"
            }}
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => {
              setOpen(true);
            }}
            disabled={userType() === "employer"}
          >
            Apply
          </Button>
        </Grid>
      </Grid>
      <Modal open={open} onClose={handleClose} className={classes.popupDialog}>
        <Paper
          style={{
            padding: "20px",
            outline: "none",
            display: "flex",
            flexDirection: "column",
            gap: "1em",
            justifyContent: "center",
            minWidth: "50%",
            alignItems: "center",
          }}
        >
          <Grid item>
            <Typography variant="h5">{job.jobtitle}</Typography>
          </Grid>
          <Grid item>Salary : &#8377; {job.salary} per month</Grid>
          <Grid item>Posted by : {organizationName}</Grid>
          <Button
            variant="contained"
            color="primary"
            style={{ padding: "10px 50px" }}
            onClick={() => handleApply()}
          >
            Submit
          </Button>
        </Paper>
      </Modal>
    </Paper>
  );
};

//   const classes = useStyles();
//   const { open, handleClose, searchOptions, setSearchOptions, getData } = props;
//   return (
//     <Modal open={open} onClose={handleClose} className={classes.popupDialog}>
//       <Paper
//         style={{
//           padding: "50px",
//           outline: "none",
//           minWidth: "50%",
//         }}
//       >
//         <Grid container direction="column" alignItems="center" spacing={3}>
//           <Grid container item alignItems="center">
//             <Grid item xs={3}>
//               Job Type
//             </Grid>
//             <Grid
//               container
//               item
//               xs={9}
//               justify="space-around"
//             // alignItems="center"
//             >
//               <Grid item>
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       name="fullTime"
//                       checked={searchOptions.jobType.fullTime}
//                       onChange={(event) => {
//                         setSearchOptions({
//                           ...searchOptions,
//                           jobType: {
//                             ...searchOptions.jobType,
//                             [event.target.name]: event.target.checked,
//                           },
//                         });
//                       }}
//                     />
//                   }
//                   label="Full Time"
//                 />
//               </Grid>
//               <Grid item>
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       name="partTime"
//                       checked={searchOptions.jobType.partTime}
//                       onChange={(event) => {
//                         setSearchOptions({
//                           ...searchOptions,
//                           jobType: {
//                             ...searchOptions.jobType,
//                             [event.target.name]: event.target.checked,
//                           },
//                         });
//                       }}
//                     />
//                   }
//                   label="Part Time"
//                 />
//               </Grid>
//               <Grid item>
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       name="wfh"
//                       checked={searchOptions.jobType.wfh}
//                       onChange={(event) => {
//                         setSearchOptions({
//                           ...searchOptions,
//                           jobType: {
//                             ...searchOptions.jobType,
//                             [event.target.name]: event.target.checked,
//                           },
//                         });
//                       }}
//                     />
//                   }
//                   label="Work From Home"
//                 />
//               </Grid>
//             </Grid>
//           </Grid>
//           <Grid container item alignItems="center">
//             <Grid item xs={3}>
//               Salary
//             </Grid>
//             <Grid item xs={9}>
//               <Slider
//                 valueLabelDisplay="auto"
//                 valueLabelFormat={(value) => {
//                   return value * (100000 / 100);
//                 }}
//                 marks={[
//                   { value: 0, label: "0" },
//                   { value: 100, label: "100000" },
//                 ]}
//                 value={searchOptions.salary}
//                 onChange={(event, value) =>
//                   setSearchOptions({
//                     ...searchOptions,
//                     salary: value,
//                   })
//                 }
//               />
//             </Grid>
//           </Grid>
//           <Grid container item alignItems="center">
//             <Grid item xs={3}>
//               Duration
//             </Grid>
//             <Grid item xs={9}>
//               <TextField
//                 select
//                 label="Duration"
//                 variant="outlined"
//                 fullWidth
//                 value={searchOptions.duration}
//                 onChange={(event) =>
//                   setSearchOptions({
//                     ...searchOptions,
//                     duration: event.target.value,
//                   })
//                 }
//               >
//                 <MenuItem value="0">All</MenuItem>
//                 <MenuItem value="1">1</MenuItem>
//                 <MenuItem value="2">2</MenuItem>
//                 <MenuItem value="3">3</MenuItem>
//                 <MenuItem value="4">4</MenuItem>
//                 <MenuItem value="5">5</MenuItem>
//                 <MenuItem value="6">6</MenuItem>
//                 <MenuItem value="7">7</MenuItem>
//               </TextField>
//             </Grid>
//           </Grid>
//           <Grid container item alignItems="center">
//             <Grid item xs={3}>
//               Sort
//             </Grid>
//             <Grid item container direction="row" xs={9}>
//               <Grid
//                 item
//                 container
//                 xs={4}
//                 justify="space-around"
//                 alignItems="center"
//                 style={{ border: "1px solid #D1D1D1", borderRadius: "5px" }}
//               >
//                 <Grid item>
//                   <Checkbox
//                     name="salary"
//                     checked={searchOptions.sort.salary.status}
//                     onChange={(event) =>
//                       setSearchOptions({
//                         ...searchOptions,
//                         sort: {
//                           ...searchOptions.sort,
//                           salary: {
//                             ...searchOptions.sort.salary,
//                             status: event.target.checked,
//                           },
//                         },
//                       })
//                     }
//                     id="salary"
//                   />
//                 </Grid>
//                 <Grid item>
//                   <label for="salary">
//                     <Typography>Salary</Typography>
//                   </label>
//                 </Grid>
//                 <Grid item>
//                   <IconButton
//                     disabled={!searchOptions.sort.salary.status}
//                     onClick={() => {
//                       setSearchOptions({
//                         ...searchOptions,
//                         sort: {
//                           ...searchOptions.sort,
//                           salary: {
//                             ...searchOptions.sort.salary,
//                             desc: !searchOptions.sort.salary.desc,
//                           },
//                         },
//                       });
//                     }}
//                   >
//                     {searchOptions.sort.salary.desc ? (
//                       <ArrowDownwardIcon />
//                     ) : (
//                       <ArrowUpwardIcon />
//                     )}
//                   </IconButton>
//                 </Grid>
//               </Grid>
//               <Grid
//                 item
//                 container
//                 xs={4}
//                 justify="space-around"
//                 alignItems="center"
//                 style={{ border: "1px solid #D1D1D1", borderRadius: "5px" }}
//               >
//                 <Grid item>
//                   <Checkbox
//                     name="duration"
//                     checked={searchOptions.sort.duration.status}
//                     onChange={(event) =>
//                       setSearchOptions({
//                         ...searchOptions,
//                         sort: {
//                           ...searchOptions.sort,
//                           duration: {
//                             ...searchOptions.sort.duration,
//                             status: event.target.checked,
//                           },
//                         },
//                       })
//                     }
//                     id="duration"
//                   />
//                 </Grid>
//                 <Grid item>
//                   <label for="duration">
//                     <Typography>Duration</Typography>
//                   </label>
//                 </Grid>
//                 <Grid item>
//                   <IconButton
//                     disabled={!searchOptions.sort.duration.status}
//                     onClick={() => {
//                       setSearchOptions({
//                         ...searchOptions,
//                         sort: {
//                           ...searchOptions.sort,
//                           duration: {
//                             ...searchOptions.sort.duration,
//                             desc: !searchOptions.sort.duration.desc,
//                           },
//                         },
//                       });
//                     }}
//                   >
//                     {searchOptions.sort.duration.desc ? (
//                       <ArrowDownwardIcon />
//                     ) : (
//                       <ArrowUpwardIcon />
//                     )}
//                   </IconButton>
//                 </Grid>
//               </Grid>
//               <Grid
//                 item
//                 container
//                 xs={4}
//                 justify="space-around"
//                 alignItems="center"
//                 style={{ border: "1px solid #D1D1D1", borderRadius: "5px" }}
//               >
//                 <Grid item>
//                   <Checkbox
//                     name="rating"
//                     checked={searchOptions.sort.rating.status}
//                     onChange={(event) =>
//                       setSearchOptions({
//                         ...searchOptions,
//                         sort: {
//                           ...searchOptions.sort,
//                           rating: {
//                             ...searchOptions.sort.rating,
//                             status: event.target.checked,
//                           },
//                         },
//                       })
//                     }
//                     id="rating"
//                   />
//                 </Grid>
//                 <Grid item>
//                   <label for="rating">
//                     <Typography>Rating</Typography>
//                   </label>
//                 </Grid>
//                 <Grid item>
//                   <IconButton
//                     disabled={!searchOptions.sort.rating.status}
//                     onClick={() => {
//                       setSearchOptions({
//                         ...searchOptions,
//                         sort: {
//                           ...searchOptions.sort,
//                           rating: {
//                             ...searchOptions.sort.rating,
//                             desc: !searchOptions.sort.rating.desc,
//                           },
//                         },
//                       });
//                     }}
//                   >
//                     {searchOptions.sort.rating.desc ? (
//                       <ArrowDownwardIcon />
//                     ) : (
//                       <ArrowUpwardIcon />
//                     )}
//                   </IconButton>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Grid>

//           <Grid item>
//             <Button
//               variant="contained"
//               color="primary"
//               style={{ padding: "3px 3px"}}
//               onClick={() => getData()}
//             >
//               Apply
//             </Button>
//           </Grid>
//         </Grid>
//       </Paper>
//     </Modal>
//   );
// };

const Home = (props) => {
  const [jobs, setJobs] = useState([]);

  const setPopup = useContext(SetPopupContext);
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(apiList.jobs, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data.res);
        setJobs(response.data.res)
      })
      .catch((err) => {
        console.log(err);
        setPopup({
          open: true,
          severity: "error",
          message: "Error",
        });
      });
  };

  return (
    <>
      <Grid
        container
        item
        direction="column"
        alignItems="center"
        style={{ padding: "30px", minHeight: "93vh" }}
      >
        <Grid
          item
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item xs>
            <Typography variant="h2">Jobs</Typography>
          </Grid>
        </Grid>

        <Grid
          container
          item
          xs
          direction="column"
          alignItems="stretch"
          justify="center"
        >
          {jobs.length > 0 ? (
            jobs.map((job) => {
              return <JobTile job={job} />;
            })
          ) : (
            <Typography variant="h5" style={{ textAlign: "center" }}>
              No jobs found
            </Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
