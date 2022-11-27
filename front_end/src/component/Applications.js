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
import axios from "axios";

import { SetPopupContext } from "../App";

import apiList from "../lib/apiList";

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
}));

const ApplicationTile = (props) => {
  const classes = useStyles();
  const { application } = props;
  const setPopup = useContext(SetPopupContext);
  useEffect(() => {
    getOrgName();
  }, []);
  const [open, setOpen] = useState(false);
  const [organizationName, setOrganizationName] = useState("");

  const getOrgName = () => {
    axios
      .get(apiList.employerDetails + application.empId, {
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

  const handleClose = () => {
    setOpen(false);
  };

  const colorSet = {
    Applied: "#3454D1",
    Shortlisted: "#DC851F",
    Accepted: "#09BC8A",
    Rejected: "#D1345B",
    Deleted: "#B49A67",
    Cancelled: "#FF8484",
    Finished: "#4EA5D9",
    Testing: "#3454D1"
  };

  const getStatus = () => {
    if (application.applicationStatus in colorSet) {
      return (
        <Paper
          container
          item
          className={classes.statusBlock}
          style={{
            background: colorSet[application.applicationStatus],
            color: "#ffffff",
            padding: "1em",
            textAlign: "center",
            maxHeight: "3em",
            maxWidth: "7em",
            marginTop: "1em"
          }}
        >
          {application.applicationStatus}
        </Paper>
      )
    } else {
      return (
        <Paper
          container
          item
          className={classes.statusBlock}
          style={{
            background: colorSet["Applied"],
            color: "#ffffff",
            padding: "1em",
            textAlign: "center",
            maxHeight: "3em",
            maxWidth: "7em",
            marginTop: "1em"
          }}
        >
          {application.applicationStatus}
        </Paper>

      )
    }
  }

  return (
    <Paper className={classes.jobTileOuter} elevation={3}>
      <Grid container>
        <Grid container item xs={9} spacing={1} direction="column">
          <Grid item>
            <Typography variant="h5">{application.jobtitle}</Typography>
          </Grid>
          <Grid item>Salary : &#8377; {application.salary} per month</Grid>
          <Grid item>Description : {application.description}</Grid>
          <Grid item>Qualification : {application.qualification}</Grid>
          <Grid item>Location : {application.joblocation}</Grid>
          <Grid item>Job Sector : {application.jobsector}</Grid>
          <Grid item>Posted by : {organizationName}</Grid>
        </Grid>
        {getStatus()}
      </Grid>
    </Paper>
  );
};

const Applications = (props) => {
  const setPopup = useContext(SetPopupContext);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {

    axios
      .get(apiList.candidateDetails, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data.res);
        let email = localStorage.getItem("email");
        let profile = response.data.res
          .filter(x => x.email === email);
        console.log(profile[0]._id);
        let candId = profile[0]._id;
        axios
          .get(apiList.jobsApplied + candId, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((response) => {
            console.log(response.data.res);
            setApplications(response.data.res);
          })
          .catch((err) => {
            // console.log(err.response);
            console.log(err.response.data);
            setPopup({
              open: true,
              severity: "error",
              message: "Error",
            });
          });

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

  return (
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
              <ApplicationTile application={obj} />
          ))
        ) : (
          <Typography variant="h5" style={{ textAlign: "center" }}>
            No Applications Found
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default Applications;
