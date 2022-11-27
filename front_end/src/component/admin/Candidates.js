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

import { SetPopupContext } from "../../App";

import apiList from "../../lib/apiList";

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

const CandidateTile = (props) => {
  const classes = useStyles();
  const { candidate, getData } = props;
  const setPopup = useContext(SetPopupContext);
  useEffect(() => {
    // getOrgName();
  }, []);
  const [open, setOpen] = useState(false);
  // const [organizationName, setOrganizationName] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const updateStatus = (status) => {
    const statusData = {
      cand_id: candidate.loginId,
      setVerified: status
    };
    axios
      .post(apiList.verfifyCandidate, statusData, {
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
          message: err.response.err,
        });
        console.log(err.response);
      });
  };

  const colorSet = {
    true: "#09BC8A",
    false: "#DC851F"
  };

  const buttonSet = {
    false: (
      <>
        <Grid item xs style={{
          marginRight: "2em",
          maxHeight: "3em",
          maxWidth: "12em",
          padding: "0.4em"
        }}>
          <Button
            className={classes.statusBlock}
            style={{
              background: colorSet["false"],
              color: "#ffffff"
            }}
            onClick={() => updateStatus(true)}
          >
            Not Verified
          </Button>
        </Grid>
      </>
    ),
    true: (
      <>
        <Grid item xs style={{
          marginRight: "2em",
          maxHeight: "3em",
          maxWidth: "12em",
          padding: "0.4em"
        }}>
          <Button
            className={classes.statusBlock}
            style={{
              background: colorSet["true"],
              color: "#ffffff"
            }}
            onClick={() => updateStatus(false)}
          >
            Verified
          </Button>
        </Grid>
      </>
    )
  };

  return (
    <Paper className={classes.jobTileOuter} elevation={3}>
      <Grid container>
        <Grid container item xs={9} spacing={1} direction="column">
          <Grid item>Name: {candidate.name}</Grid>
          <Grid item container xs>
            {buttonSet[candidate.isVerified]}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

const Candidates = (props) => {
  const setPopup = useContext(SetPopupContext);
  const [candidates, setCadidates] = useState([]);

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
        setCadidates(response.data.res);
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
        <Typography variant="h2">Manage Employersd</Typography>
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
        {candidates.length > 0 ? (
          candidates.map((obj) => (
              <CandidateTile candidate={obj} getData={getData}/>
          ))
        ) : (
          <Typography variant="h5" style={{ textAlign: "center" }}>
            No Candidates Found
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default Candidates;
