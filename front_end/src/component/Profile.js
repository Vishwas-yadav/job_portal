import { useContext, useEffect, useState } from "react";
import {
  Button,
  Grid,
  Typography,
  Modal,
  Paper,
  makeStyles,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import ChipInput from "material-ui-chip-input";
import FileUploadInput from "../lib/FileUploadInput";
import DescriptionIcon from "@material-ui/icons/Description";
import FaceIcon from "@material-ui/icons/Face";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { SetPopupContext } from "../App";

import apiList from "../lib/apiList";
import { userType } from "../lib/isAuth";

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


const MultifieldInputWorkExperience = (props) => {
  const classes = useStyles();
  const { workExperience, setWorkExperience } = props;
  const { newExp, setNewExp } = useState('');
  return (
    <>
      {workExperience.map((obj, key) => (
        <Grid item>
          <TextField
            style={{ marginBottom: 3, width: "100%" }}
            label={`Work Experience #${key + 1}`}
            className={classes.inputBox}
            value={workExperience[key]}
            onChange={(event) => {
              const newWork = [...workExperience];
              newWork[key] = event.target.value;
              setWorkExperience(newWork);
            }}
            variant="outlined"
          />
        </Grid>
      ))}
      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          onClick={() =>
            setWorkExperience([
              ...workExperience,
              "",
            ])
          }
          className={classes.inputBox}
        >
          Add work experience
        </Button>
      </Grid>
    </>
  );
};

const Profile = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);
  const [userData, setUserData] = useState();
  const [jobs, setJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [contact, setContact] = useState("");
  const [workExperience, setWorkExperience] = useState([]);
  const [profileDetails, setProfileDetails] = useState({
    email: "",
    name: "",
    role: localStorage.getItem("type"),
    dob: '',
    address: '',
    contact: '',
    fathersName: '',
    education: [
      "",
      "",
      ""
    ],
    workExperience: [],
    skills: [],
    picture: '',
    resume: '',
    organizationName: "",
    website: ''
  });

  const [education, setEducation] = useState([]);

  const handleInput = (key, value) => {
    setProfileDetails({
      ...profileDetails,
      [key]: value,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    if (userType() === "candidate") {
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
          setProfileDetails(
            {
              ...profile[0],
              role: localStorage.getItem("type")
            });
          setWorkExperience(profile[0].workExperience)
          console.log(profileDetails)
        })
        .catch((err) => {
          console.log(err.res);
          setPopup({
            open: true,
            severity: "error",
            message: "Error",
          });
        })
    } else {
      axios
        .get(apiList.employerDetails, {
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
          setProfileDetails(
            {
              ...profile[0],
              role: localStorage.getItem("type")
            });
          console.log(profileDetails)
        })
        .catch((err) => {
          console.log(err.res);
          setPopup({
            open: true,
            severity: "error",
            message: "Error",
          });
        })
    }
  };


  const handleEducationInput = (key, value) => {
    let newDetails = profileDetails;
    newDetails.education[key] = value;
    setProfileDetails({
      ...newDetails
    });
    console.log(profileDetails)
  };

  const handleUpdate = () => {
    console.log(education);

    let updatedDetails = {
      ...profileDetails,
      workExperience: workExperience
    };

    axios
      .post(apiList.updateProfile, updatedDetails, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setPopup({
          open: true,
          severity: "success",
          message: response.data.msg,
        });
        getData();
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: "Error: Unable to update",
        });
        console.log(err);
      });
    setOpen(false);
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
          <Typography variant="h2">Profile</Typography>
        </Grid>
        <Grid item xs>
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
            <Grid container direction="column" alignItems="stretch" spacing={3} style={{minWidth: "50vw"}}>
              {userType() === "candidate" ? (
                <>
                  <Grid item>
                    <TextField
                      label="Name"
                      value={profileDetails.name}
                      onChange={(event) => handleInput("name", event.target.value)}
                      className={classes.inputBox}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label="Email"
                      value={profileDetails.email}
                      onChange={(event) => handleInput("email", event.target.value)}
                      className={classes.inputBox}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label="Address"
                      value={profileDetails.address}
                      onChange={(event) => handleInput("address", event.target.value)}
                      className={classes.inputBox}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label="Father's Name"
                      value={profileDetails.fathersName}
                      onChange={(event) => handleInput("fathersName", event.target.value)}
                      className={classes.inputBox}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item >
                    <TextField
                      style={{ marginBottom: 3 }}
                      label="Institution Name Intermediate"
                      className={classes.inputBox}
                      value={profileDetails.education[0]}
                      onChange={(event) => {
                        handleEducationInput(0, event.target.value)
                      }}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item >
                    <TextField
                      style={{ marginBottom: 3 }}
                      label="Institution Name Highschool"
                      className={classes.inputBox}
                      value={profileDetails.education[1]}
                      onChange={(event) => {
                        handleEducationInput(1, event.target.value)
                      }}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item >
                    <TextField
                      style={{ marginBottom: 3 }}
                      label="Institution Name BTech"
                      className={classes.inputBox}
                      value={profileDetails.education[2]}
                      onChange={(event) => {
                        handleEducationInput(2, event.target.value)
                      }}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <MultifieldInputWorkExperience
                    workExperience={workExperience}
                    setWorkExperience={setWorkExperience}
                  />
                  <Grid item>
                    <ChipInput
                      className={classes.inputBox}
                      label="Skills"
                      variant="outlined"
                      helperText="Press enter to add skills"
                      value={profileDetails.skills}
                      onAdd={(chip) =>
                        setProfileDetails({
                          ...profileDetails,
                          skills: [...profileDetails.skills, chip],
                        })
                      }
                      onDelete={(chip, index) => {
                        let skills = profileDetails.skills;
                        skills.splice(index, 1);
                        setProfileDetails({
                          ...profileDetails,
                          skills: skills,
                        });
                      }}
                      fullWidth
                    />
                  </Grid></>
              ) : (
                <>
                  <Grid item>
                    <TextField
                      label="Name"
                      value={profileDetails.name}
                      onChange={(event) => handleInput("name", event.target.value)}
                      className={classes.inputBox}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label="Email"
                      value={profileDetails.email}
                      onChange={(event) => handleInput("email", event.target.value)}
                      className={classes.inputBox}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label="Organization Name"
                      value={profileDetails.organizationName}
                      onChange={(event) => handleInput("organizationName", event.target.value)}
                      className={classes.inputBox}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label="Address"
                      value={profileDetails.address}
                      onChange={(event) => handleInput("address", event.target.value)}
                      className={classes.inputBox}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <TextField
                      label="Website"
                      value={profileDetails.website}
                      onChange={(event) => handleInput("website", event.target.value)}
                      className={classes.inputBox}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                </>)}
            </Grid>
            <Button
              variant="contained"
              color="primary"
              style={{ padding: "10px 50px", marginTop: "30px" }}
              onClick={() => handleUpdate()}
            >
              Update Details
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Profile;
