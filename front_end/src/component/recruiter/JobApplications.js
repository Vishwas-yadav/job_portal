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
  Avatar,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";
import FilterListIcon from "@material-ui/icons/FilterList";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import { SetPopupContext } from "../../App";

import apiList, { server } from "../../lib/apiList";

const useStyles = makeStyles((theme) => ({
  body: {
    height: "inherit",
  },
  statusBlock: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textTransform: "uppercase",
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
  avatar: {
    width: theme.spacing(17),
    height: theme.spacing(17),
  },
}));

const ApplicationTile = (props) => {
  const classes = useStyles();
  const { application, jobId, getData } = props;
  const setPopup = useContext(SetPopupContext);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const colorSet = {
    applied: "#3454D1",
    shortlisted: "#DC851F",
    accepted: "#09BC8A",
    rejected: "#D1345B",
    deleted: "#B49A67",
    cancelled: "#FF8484",
    finished: "#4EA5D9",
  };


  const updateStatus = (status) => {
    const statusData = {
      applicationStatus: status,
      jobId: jobId,
      candId: application._id
    };
    axios
      .post(apiList.evaluateCandidate, statusData, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setPopup({
          open: true,
          severity: "success",
          message: response.data.message,
        });
        getData();
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
        console.log(err.response);
      });
  };

  const buttonSet = {
    Applied: (
      <>
        <Grid item xs style={{
          marginRight: "2em",
          maxHeight: "3em",
          maxWidth: "12em"
        }}>
          <Button
            className={classes.statusBlock}
            style={{
              background: colorSet["shortlisted"],
              color: "#ffffff"
            }}
            onClick={() => updateStatus("Shortlisted")}
          >
            Shortlist
          </Button>
        </Grid>
        <Grid item xs style={{
          marginRight: "2em",
          maxHeight: "3em",
          maxWidth: "12em"
        }}>
          <Button
            className={classes.statusBlock}
            style={{
              background: colorSet["rejected"],
              color: "#ffffff",
            }}
            onClick={() => updateStatus("Rejected")}
          >
            Reject
          </Button>
        </Grid>
      </>
    ),
    Shortlisted: (
      <>
        <Grid item xs
          style={{
            marginRight: "2em",
            maxHeight: "3em",
            maxWidth: "12em"
          }}>
          <Button
            className={classes.statusBlock}
            style={{
              background: colorSet["accepted"],
              color: "#ffffff"
            }}
            onClick={() => updateStatus("Accepted")}
          >
            Accept
          </Button>
        </Grid>
        <Grid item xs style={{
          marginRight: "2em",
          maxHeight: "3em",
          maxWidth: "12em"
        }}>
          <Button
            className={classes.statusBlock}
            style={{
              background: colorSet["Rejected"],
              color: "#ffffff",
            }}
            onClick={() => updateStatus("rejected")}
          >
            Reject
          </Button>
        </Grid>
      </>
    ),
    Rejected: (
      <>
        <Grid item xs style={{
          marginRight: "2em",
          maxHeight: "3em",
          maxWidth: "12em"
        }}>
          <Paper
            className={classes.statusBlock}
            style={{
              background: colorSet["rejected"],
              color: "#ffffff",
            }}
          >
            Rejected
          </Paper>
        </Grid>
      </>
    ),
    Accepted: (
      <>
        <Grid item xs style={{
          marginRight: "2em",
          maxHeight: "3em",
          maxWidth: "12em"
        }}>
          <Paper
            className={classes.statusBlock}
            style={{
              background: colorSet["accepted"],
              color: "#ffffff",
            }}
          >
            Accepted
          </Paper>
        </Grid>
      </>
    ),
    Cancelled: (
      <>
        <Grid item xs style={{
          marginRight: "2em",
          maxHeight: "3em",
          maxWidth: "12em"
        }}>
          <Paper
            className={classes.statusBlock}
            style={{
              background: colorSet["cancelled"],
              color: "#ffffff",
            }}
          >
            Cancelled
          </Paper>
        </Grid>
      </>
    ),
    Finished: (
      <>
        <Grid item xs style={{
          marginRight: "2em",
          maxHeight: "3em",
          maxWidth: "12em"
        }}>
          <Paper
            className={classes.statusBlock}
            style={{
              background: colorSet["finished"],
              color: "#ffffff",
            }}
          >
            Finished
          </Paper>
        </Grid>
      </>
    ),
  };

  const getButtonSet = () => {
    if (application.applicationStatus in buttonSet) {
      return (<>
        <Grid item container xs>
          {buttonSet[application.applicationStatus]}
        </Grid>
      </>);
    } else {
      return (<>
        <Grid item xs>
          <Paper
            className={classes.statusBlock}
            style={{
              background: colorSet["finished"],
              color: "#ffffff",
              maxHeight: "3em",
              maxWidth: "12em"
            }}
          >
            {application.applicationStatus}
          </Paper>
        </Grid>
      </>)
    }
  }

  return (
    <Paper className={classes.jobTileOuter} elevation={3}>
      <Grid container>
        <Grid
          item
          xs={2}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <Avatar
            src={`${server}${application.jobApplicant.profile}`}
            className={classes.avatar}
          /> */}
        </Grid>
        <Grid container item xs={7} spacing={1} direction="column">
          <Grid item>
            <Typography variant="h5">
              {application.name}
            </Typography>
            <Grid item>Salary : &#8377; {application.salary} per month</Grid>
            <Grid item>Description : {application.description}</Grid>
            <Grid item>Qualification : {application.qualification}</Grid>
            <Grid item>Location : {application.joblocation}</Grid>
            <Grid item>Job Sector : {application.jobsector}</Grid>
          </Grid>
          <Grid item>
            {application.skills.map((skill) => (
              <Chip label={skill} style={{ marginRight: "2px" }} />
            ))}
          </Grid>
        </Grid>
        <Grid item container direction="column" xs={3}>
          {getButtonSet()}
        </Grid>
      </Grid>
      <Modal open={open} onClose={handleClose} className={classes.popupDialog}>
        <Paper
          style={{
            padding: "20px",
            outline: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minWidth: "30%",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            style={{ padding: "10px 50px" }}
          >
            Submit
          </Button>
        </Paper>
      </Modal>
    </Paper>
  );
};

const JobApplications = (props) => {
  const setPopup = useContext(SetPopupContext);
  const [applications, setApplications] = useState([]);
  const { jobId } = useParams();
  const [filterOpen, setFilterOpen] = useState(false);
  const [searchOptions, setSearchOptions] = useState({
    status: {
      all: false,
      applied: false,
      shortlisted: false,
    },
    sort: {
      "jobApplicant.name": {
        status: false,
        desc: false,
      },
      dateOfApplication: {
        status: true,
        desc: true,
      },
      "jobApplicant.rating": {
        status: false,
        desc: false,
      },
    },
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(apiList.jobApplications + jobId, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data.res);
        setApplications(response.data.res);
      })
      .catch((err) => {
        console.log(err.response);
        // console.log(err.response.data);
        setApplications([]);
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
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
        <Grid item>
          <Typography variant="h2">Applications</Typography>
        </Grid>
        <Grid
          container
          item
          xs
          direction="column"
          style={{ width: "100%" }}
          alignItems="stretch"
          justify="center"
        >
          {applications.length > 0 ? (
            applications.map((obj) => (
              <Grid item>
                {/* {console.log(obj)} */}
                <ApplicationTile application={obj} jobId={jobId} getData={getData} />
              </Grid>
            ))
          ) : (
            <Typography variant="h5" style={{ textAlign: "center" }}>
              No Applications Found
            </Typography>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default JobApplications;
