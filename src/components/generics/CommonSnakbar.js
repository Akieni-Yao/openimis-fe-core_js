import React, { useState, useCallback } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import CloseIcon from "@material-ui/icons/Close";
import ErrorIcon from "@material-ui/icons/Error";
import WarningIcon from "@material-ui/icons/Warning";
import InfoIcon from "@material-ui/icons/Info";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  snackbar: {
    marginRight: "50px",
    color: "white",
  },
  alert: {
    color: "white",
    display: "flex",
    alignItems: "center",
  },
  copyContainer: {
    display: "flex",
    alignItems: "center",
  },
  copyText: {
    marginLeft: "4px",
  },
  whiteIcon: {
    color: "white",
  },
}));

const CommonSnackbar = ({ open, onClose, message, severity, copyText = "" }) => {
  const [isCopied, setIsCopied] = useState(false);
  const classes = useStyles();

  const handleCopyClick = useCallback(() => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(copyText)
        .then(() => {
          setIsCopied(true);
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
        });
    }
  }, [copyText]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    onClose(event, reason);
    setIsCopied(false);
  };


  const getIcon = () => {
    switch (severity) {
      case "error":
        return <ErrorIcon className={classes.whiteIcon} />;
      case "warning":
        return <WarningIcon className={classes.whiteIcon} />;
      case "info":
        return <InfoIcon className={classes.whiteIcon} />;
      case "success":
        return <CheckCircleIcon className={classes.whiteIcon} />;
      default:
        return null;
    }
  };

  const getBackgroundColor = () => {
    switch (severity) {
      case "error":
        return "#d32f2f";
      case "warning":
        return "#ffa000";
      case "info":
        return "#1976d2";
      case "success":
        return "#4caf50";
      default:
        return "inherit";
    }
  };

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      className={classes.snackbar}
    >
      <Alert
        onClose={handleClose}
        severity={severity || "success"}
        className={classes.alert}
        style={{ backgroundColor: getBackgroundColor() }}
        icon={getIcon()}
        action={
          <>
            {copyText && (
              <div className={classes.copyContainer}>
                <div>{copyText}</div>
                <IconButton size="small" onClick={handleCopyClick} className={classes.copyText} color="inherit">
                  <FileCopyIcon />
                </IconButton>
                {isCopied ? "Copied!" : "Copy"}
              </div>
            )}
            <IconButton size="small" onClick={handleClose} className={classes.copyText} color="inherit">
              <CloseIcon />
            </IconButton>
          </>
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CommonSnackbar;
