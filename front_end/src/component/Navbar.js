import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  makeStyles,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

import isAuth, { userType } from "../lib/isAuth";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Navbar = (props) => {
  const classes = useStyles();
  let history = useHistory();

  const handleClick = (location) => {
    console.log(location);
    history.push(location);
  };

  const getUser = () => {
    if (userType() === "employer") {
      return (
        <>
          {/* <Button color="inherit" onClick={() => handleClick("/home")}>
            Jobs
          </Button> */}
          <Button color="inherit" onClick={() => handleClick("/addjob")}>
            Add Jobs
          </Button>
          <Button color="inherit" onClick={() => handleClick("/myjobs")}>
            Posted Jobs
          </Button>
          {/* <Button color="inherit" onClick={() => handleClick("/employees")}>
            Employees
          </Button> */}
          <Button color="inherit" onClick={() => handleClick("/profile")}>
            Profile
          </Button>
          <Button color="inherit" onClick={() => handleClick("/logout")}>
            Logout
          </Button>
        </>
      )
    } else if (userType() === "candidate") {
      return (
        <>
          <Button color="inherit" onClick={() => handleClick("/home")}>
            Jobs
          </Button>
          <Button
            color="inherit"
            onClick={() => handleClick("/applications")}
          >
            Applications
          </Button>
          <Button color="inherit" onClick={() => handleClick("/profile")}>
            Profile
          </Button>
          <Button color="inherit" onClick={() => handleClick("/logout")}>
            Logout
          </Button>
        </>
      )
    } else if (userType() === "admin") {
      return (
        <>
          <Button color="inherit" onClick={() => handleClick("/employers")}>
            Employers
          </Button>
          <Button color="inherit" onClick={() => handleClick("/candidates")}>
            Candidates
          </Button>
          <Button color="inherit" onClick={() => handleClick("/logout")}>
            Logout
          </Button>
        </>
      )
    }
  }

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Job Portal
        </Typography>
        {isAuth() ? (
          <>{getUser()}</>
        ) : (
          <>
            <Button color="inherit" onClick={() => handleClick("/login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => handleClick("/signup")}>
              Signup
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
