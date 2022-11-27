import { useContext, useEffect, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Modal,
  Paper,
  makeStyles,
  TextField,
  MenuItem,
} from "@material-ui/core";
import axios from "axios";
import ChipInput from "material-ui-chip-input";

import { SetPopupContext } from "../../App";

import apiList from "../../lib/apiList";

const useStyles = makeStyles((theme) => ({
  body: {
    height: "inherit",
  },
  popupDialog: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // padding: "30px",
  },
}));

const CreateJobs = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);
  useEffect(() => {
    getData();
  }, []);
  const [empId, setEmpId] = useState("")
  const [jobDetails, setJobDetails] = useState({
    jobtitle: "",
    description: "",
    qualification: "",
    salary: 0,
    joblocation: "",
    jobsector: "",
    empId: "",
  });


  const getData = () => {
    axios
      .get(apiList.employerDetails, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data.res);
        let email = localStorage.getItem("email");
        let profile = response.data.res
          .filter(x => x.email === email);
        setJobDetails({
            ...jobDetails,
            "empId": profile[0]._id,
          });
        console.log(jobDetails)
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

  const handleInput = (key, value) => {
    setJobDetails({
      ...jobDetails,
      [key]: value,
    });
  };

  const handleUpdate = () => {
    console.log(jobDetails);
    axios
      .post(apiList.createJob, jobDetails, {
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
        setJobDetails({
          jobtitle: "",
          description: "",
          qualification: "",
          salary: 0,
          joblocation: "",
          jobsector: ""
        });
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

  return (
    <>
      <Grid
        container
        item
        direction="column"
        alignItems="center"
        style={{ padding: "30px", minHeight: "93vh", width: "" }}
      >
        <Grid item>
          <Typography variant="h2">Add Job</Typography>
        </Grid>
        <Grid item container xs direction="column" justify="center">
          <Grid item>
            <Paper
              style={{
                padding: "20px",
                outline: "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid
                container
                direction="column"
                alignItems="stretch"
                spacing={3}
              >
                <Grid item>
                  <TextField
                    label="Title"
                    value={jobDetails.jobtitle}
                    onChange={(event) =>
                      handleInput("jobtitle", event.target.value)
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Description"
                    value={jobDetails.description}
                    onChange={(event) =>
                      handleInput("description", event.target.value)
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Qualification"
                    value={jobDetails.qualification}
                    onChange={(event) =>
                      handleInput("qualification", event.target.value)
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Salary"
                    type="number"
                    value={jobDetails.salary}
                    onChange={(event) =>
                      handleInput("salary", event.target.value)
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Location"
                    value={jobDetails.joblocation}
                    onChange={(event) =>
                      handleInput("joblocation", event.target.value)
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    label="Sector"
                    value={jobDetails.jobsector}
                    onChange={(event) =>
                      handleInput("jobsector", event.target.value)
                    }
                    variant="outlined"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                style={{ padding: "10px 50px", marginTop: "30px" }}
                onClick={() => handleUpdate()}
              >
                Create Job
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default CreateJobs;
