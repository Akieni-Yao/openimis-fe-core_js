import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch,useSelector } from "react-redux";
import { IconButton } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import { CheckAssignedProfile, logout } from "../actions";
import { useHistory } from "../helpers/history";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(2),
    color: theme.palette.secondary.main,
  },
}));

const LogoutButton = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const useridlocal = localStorage.getItem("userId");
  const userid = useSelector((store) => store.admin.user?.id);
  // console.log("userid",useSelector((store) => store.admin),'useridlocal',useridlocal);
  const onClick = async () => {
    const response = await dispatch(CheckAssignedProfile(useridlocal));
    if (!!response.payload.data.checkAssignedProfiles.status) {
      await dispatch(logout());
      history.push("/");
    }
  };

  const classes = useStyles();

  return (
    <IconButton className={classes.button} onClick={onClick}>
      <ExitToApp />
    </IconButton>
  );
};

export default LogoutButton;
