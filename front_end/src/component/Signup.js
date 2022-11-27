import { useState, useContext } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  makeStyles,
  Paper,
  MenuItem,
  Input,
} from "@material-ui/core";
import axios from "axios";
import { Redirect } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import DescriptionIcon from "@material-ui/icons/Description";
import FaceIcon from "@material-ui/icons/Face";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import DatePicker from 'react-date-picker';
import PasswordInput from "../lib/PasswordInput";
import EmailInput from "../lib/EmailInput";
import FileUploadInput from "../lib/FileUploadInput";
import { SetPopupContext } from "../App";

import apiList from "../lib/apiList";
import isAuth from "../lib/isAuth";

const useStyles = makeStyles((theme) => ({
  body: {
    padding: "60px 60px",
  },
  inputBox: {
    width: "400px",
  },
  submitButton: {
    width: "400px",
  },
}));

const MultifieldInputWorkExperience = (props) => {
  const classes = useStyles();
  const { workExperience, setWorkExperience } = props;
  const { newExp, setNewExp } = useState('');
  return (
    <>
      {workExperience.map((obj, key) => (
        <Grid
          container
          className={classes.inputBox}
          key={key}
          style={{ paddingLeft: 0, paddingRight: 0 }}
        >
          <Grid item>
            <TextField
              style={{ marginBottom: 3 }}
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

const Login = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);

  const [loggedin, setLoggedin] = useState(isAuth());

  const [signupDetails, setSignupDetails] = useState({
    email: "",
    password: "",
    name: "",
    role: 'candidate',
    dob: '',
    address: '',
    contact: '',
    fathersName: '',
    education: [
      "intermediate:",
      "Highschool:",
      "Btech:"
    ],
    workExperience: [],
    skills: [],
    picture: 'a',
    resume: 'a',
    organizationName: "",
    website: ''
  });

  const [contact, setContact] = useState("");
  const [dob, setDob] = useState("");
  const [organizationName, setOrganizationName] = useState("");

  const [education, setEducation] = useState([]);

  const [workExperience, setWorkExperience] = useState([]);

  const [inputErrorHandler, setInputErrorHandler] = useState({
    email: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    password: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    name: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    address: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    }
  });

  const handleInput = (key, value) => {
    setSignupDetails({
      ...signupDetails,
      [key]: value,
    });
  };

  const handleEducationInput = (key, value) => {
    let newDetails = signupDetails;
    newDetails.education.concat(key + ":" + value)
    console.log(newDetails)
    setSignupDetails({
      ...newDetails
    });
  };

  const handleInputError = (key, status, message) => {
    setInputErrorHandler({
      ...inputErrorHandler,
      [key]: {
        required: true,
        untouched: false,
        error: status,
        message: message,
      },
    });
  };

  const handleLogin = () => {

    const tmpErrorHandler = {};
    Object.keys(inputErrorHandler).forEach((obj) => {
      if (inputErrorHandler[obj].required && inputErrorHandler[obj].untouched) {
        tmpErrorHandler[obj] = {
          required: true,
          untouched: false,
          error: true,
          message: `${obj[0].toUpperCase() + obj.substr(1)} is required`,
        };
      } else {
        tmpErrorHandler[obj] = inputErrorHandler[obj];
      }
    });


    let updatedDetails = {
      ...signupDetails,
      workExperience: workExperience,
      dob: dob
    };

    if (contact !== "") {
      updatedDetails = {
        ...updatedDetails,
        contact: `+${contact}`,
      };
    } else {
      updatedDetails = {
        ...updatedDetails,
        contact: "",
      };
    }

    console.log(updatedDetails);

    setSignupDetails(updatedDetails);

    const verified = !Object.keys(tmpErrorHandler).some((obj) => {
      return tmpErrorHandler[obj].error;
    });

    if (verified) {
      axios
        .post(apiList.signup, updatedDetails)
        .then((response) => {
          localStorage.setItem("token", response.data.res);
          localStorage.setItem("email", updatedDetails.email);
          localStorage.setItem("type", updatedDetails.role);
          localStorage.setItem("id", response.data.userId);
          setLoggedin(isAuth());
          setPopup({
            open: true,
            severity: "success",
            message: "Registered successfully",
          });
          console.log(response);
        })
        .catch((err) => {
          setPopup({
            open: true,
            severity: "error",
            message: err.response.err,
          });
          console.log(err.response);
        });
    } else {
      setInputErrorHandler(tmpErrorHandler);
      setPopup({
        open: true,
        severity: "error",
        message: "Incorrect Input",
      });
    }
  };

  const handleLoginEmployer = () => {
    const tmpErrorHandler = {};
    Object.keys(inputErrorHandler).forEach((obj) => {
      if (inputErrorHandler[obj].required && inputErrorHandler[obj].untouched) {
        tmpErrorHandler[obj] = {
          required: true,
          untouched: false,
          error: true,
          message: `${obj[0].toUpperCase() + obj.substr(1)} is required`,
        };
      } else {
        tmpErrorHandler[obj] = inputErrorHandler[obj];
      }
    });

    let updatedDetails = {
      ...signupDetails,
    };
    if (contact !== "") {
      updatedDetails = {
        ...signupDetails,
        contact: `+${contact}`,
      };
    } else {
      updatedDetails = {
        ...signupDetails,
        contact: "",
      };
    }

    setSignupDetails(updatedDetails);

    const verified = !Object.keys(tmpErrorHandler).some((obj) => {
      return tmpErrorHandler[obj].error;
    });

    console.log(updatedDetails);

    if (verified) {
      axios
        .post(apiList.signup, updatedDetails)
        .then((response) => {
          // localStorage.setItem("token", response.data.res);
          // localStorage.setItem("email", updatedDetails.email);
          // localStorage.setItem("type", updatedDetails.role);
          // localStorage.setItem("id", response.data.userId);
          setLoggedin(true);
          setPopup({
            open: true,
            severity: "success",
            message: "Registered successfully",
          });
          console.log(response);
        })
        .catch((err) => {
          setPopup({
            open: true,
            severity: "error",
            message: err.response.data.message,
          });
          console.log(err.response);
        });
    } else {
      setInputErrorHandler(tmpErrorHandler);
      setPopup({
        open: true,
        severity: "error",
        message: "Incorrect Input",
      });
    }
  };

  return loggedin ? (
    <Redirect to="/" />
  ) : (
    <Paper elevation={3} className={classes.body}>
      <Grid container direction="column" spacing={4} alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h2">
            Signup
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            select
            label="Category"
            variant="outlined"
            className={classes.inputBox}
            value={signupDetails.role}
            onChange={(event) => {
              handleInput("role", event.target.value);
            }}
          >
            <MenuItem value="candidate">Candidate</MenuItem>
            <MenuItem value="employer">Employer</MenuItem>
          </TextField>
        </Grid>
        <Grid item>
          <TextField
            label="Name"
            value={signupDetails.name}
            onChange={(event) => handleInput("name", event.target.value)}
            className={classes.inputBox}
            error={inputErrorHandler.name.error}
            helperText={inputErrorHandler.name.message}
            onBlur={(event) => {
              if (event.target.value === "") {
                handleInputError("name", true, "Name is required");
              } else {
                handleInputError("name", false, "");
              }
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <EmailInput
            label="Email"
            value={signupDetails.email}
            onChange={(event) => handleInput("email", event.target.value)}
            inputErrorHandler={inputErrorHandler}
            handleInputError={handleInputError}
            className={classes.inputBox}
            required={true}
          />
        </Grid>
        <Grid item>
          <PasswordInput
            label="Password"
            value={signupDetails.password}
            onChange={(event) => handleInput("password", event.target.value)}
            className={classes.inputBox}
            error={inputErrorHandler.password.error}
            helperText={inputErrorHandler.password.message}
            onBlur={(event) => {
              if (event.target.value === "") {
                handleInputError("password", true, "Password is required");
              } else {
                handleInputError("password", false, "");
              }
            }}
          />
        </Grid>

        <Grid item>
          <TextField
            label="Address"
            value={signupDetails.address}
            onChange={(event) => handleInput("address", event.target.value)}
            className={classes.inputBox}
            error={inputErrorHandler.address.error}
            helperText={inputErrorHandler.address.message}
            onBlur={(event) => {
              if (event.target.value === "") {
                handleInputError("address", true, "Address is required");
              } else {
                handleInputError("address", false, "");
              }
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <PhoneInput
            country={"in"}
            value={contact}
            onChange={(contact) => setContact(contact)}
          />
        </Grid>
        {signupDetails.role === "candidate" ? (
          <>
            <Grid item container direction="column" spacing={4} alignItems="center" className={classes.inputBox}>
              <span>
                Date of Birth
              </span>
              <DatePicker value={dob}
                label="Date of Birth"
                onChange={(dob) => setDob(dob)} />
            </Grid>
            <Grid item>
              <TextField
                label="Father's Name"
                value={signupDetails.fathersName}
                onChange={(event) => handleInput("fathersName", event.target.value)}
                className={classes.inputBox}
                // error={inputErrorHandler.fathersName.error}
                // helperText={inputErrorHandler.fathersName.message}
                variant="outlined"
              />
            </Grid>
            <Grid
              container
              className={classes.inputBox}
              style={{ paddingLeft: 0, paddingRight: 0 }}
            >
              <Grid item >
                <TextField
                  style={{ marginBottom: 3 }}
                  label={`Institution Name Intermediate`}
                  className={classes.inputBox}
                  value={education[0]}
                  onChange={(event) => {
                    handleEducationInput("intermediate", event.target.value)
                  }}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid
              container
              className={classes.inputBox}
              style={{ paddingLeft: 0, paddingRight: 0 }}
            >
              <Grid item >
                <TextField
                  style={{ marginBottom: 3 }}
                  label={`Institution Name Highschool`}
                  className={classes.inputBox}
                  value={education[1]}
                  onChange={(event) => {
                    handleEducationInput("Highschool", event.target.value)
                  }}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid
              container
              className={classes.inputBox}
              style={{ paddingLeft: 0, paddingRight: 0 }}
            >
              <Grid item >
                <TextField
                  style={{ marginBottom: 3 }}
                  label={`Institution Name BTech`}
                  className={classes.inputBox}
                  value={education[2]}
                  onChange={(event) => {
                    handleEducationInput("Btech", event.target.value)
                  }}
                  variant="outlined"
                />
              </Grid>
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
                onChange={(chips) =>
                  setSignupDetails({ ...signupDetails, skills: chips })
                }
              />
            </Grid>
          </>
        ) : (
          <>
            <Grid item>
              <TextField
                label="Organization Name"
                value={signupDetails.organizationName}
                onChange={(event) => handleInput("organizationName", event.target.value)}
                className={classes.inputBox}
                variant="outlined"
              />
            </Grid>
          </>
        )}

        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              signupDetails.role === "candidate"
                ? handleLogin()
                : handleLoginEmployer();
            }}
            className={classes.submitButton}
          >
            Signup
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Login;