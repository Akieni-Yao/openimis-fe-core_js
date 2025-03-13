import React, { useState } from "react";

import { makeStyles } from "@material-ui/styles";
import { Button, Box, Grid, Paper, Typography } from "@material-ui/core";
import TextInput from "../components/inputs/TextInput";
import { useTranslations } from "../helpers/i18n";
import { useModulesManager } from "../helpers/modules";
import Helmet from "../helpers/Helmet";
import { useGraphqlMutation, useGraphqlMutation2 } from "../helpers/hooks";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: theme.paper.loginPaper,
  logo: {
    maxHeight: 100,
  },
}));

const ForgotPasswordPage = (props) => {
  const classes = useStyles();
  const modulesManager = useModulesManager();
  const { formatMessage } = useTranslations("core.ForgotPasswordPage", modulesManager);
  const [email, setEmail] = useState();
  const [isDone, setDone] = useState(false);
  const [error, setError] = useState(null);
  const history = useHistory();
  const { isLoading, mutate } = useGraphqlMutation2(
    `
    mutation newPasswordRequest($email: String!, $fromWhatEnv: String!) {
      newPasswordRequest(email: $email, fromWhatEnv: $fromWhatEnv) {
        success
        message
      }
    }
  `,
    {
      wait: false,
    },
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await mutate({ email, fromWhatEnv: "imis" }, true);
    console.log("res", res);
    if (res?.newPasswordRequest?.success) {
      await setDone(true);
    } else {
      setError(res?.newPasswordRequest?.message || "An error occurred, be sure to use a valid email");
    }
  };

  const handleBackToLogin = () => {
    // Use the history object to navigate to the LoginPage route
    history.push("/login");
  };

  return (
    <>
      <div
        style={{
          background: "#000000B2 0% 0%",
          opacity: "0.9",
        }}
      >
        <div
          style={{
            height: "100vh",
            width: "100vw",
            backgroundImage: `url(${props.backgroundImage})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "fill",
          }}
        ></div>
        <div className={classes.container}>
          <Helmet title={formatMessage("pageTitle")} />
          <Paper className={classes.paper} elevation={2}>
            <form onSubmit={onSubmit}>
              <Box p={6} width={530}>
                {!isDone && (
                  <Grid container spacing={2} direction="column" alignItems="stretch">
                    <Grid item container direction="row" alignItems="center">
                      <img className={classes.logo} src={props.logo} style={{ margin: "0 auto" }} />
                    </Grid>
                    <div
                      style={{
                        textAlign: "center",
                        font: "normal normal bold 24px/42px Roboto",
                        color: "#333333",
                        marginTop: "10px",
                      }}
                    >
                      {formatMessage("recoverTitle")}
                    </div>

                    <Grid item>
                      <TextInput
                        required
                        type="email"
                        label={"Email"}
                        fullWidth
                        onChange={(email) => setEmail(email)}
                      />
                    </Grid>

                    {error && (
                      <Grid item>
                        <Box color="error.main">{error}</Box>
                      </Grid>
                    )}
                    <Grid item>
                      <Button
                        fullWidth
                        type="submit"
                        disabled={!email || isLoading}
                        color="primary"
                        variant="contained"
                      >
                        {formatMessage("submitBtn")}
                      </Button>
                    </Grid>
                    <Grid item container direction="row" alignItems="center">
                      <Button
                        startIcon={<ArrowBackIcon />}
                        color="success"
                        variant="text"
                        style={{ margin: "0 auto", color: "#00913E", font: "normal normal medium 15px/28px Roboto" }}
                        onClick={handleBackToLogin}
                      >
                        {formatMessage("backButton")}
                      </Button>
                    </Grid>
                  </Grid>
                )}

                {isDone && (
                  // <h1>{formatMessage("done")}</h1>

                  <Grid container spacing={2} direction="column" alignItems="stretch" style={{ borderRadius: "16px" }}>
                    <Grid item container direction="row" alignItems="center">
                      <img className={classes.logo} src={props.logo} style={{ margin: "0 auto" }} />
                    </Grid>
                    <div
                      style={{
                        textAlign: "center",
                        font: "normal normal bold 24px/34px Roboto",
                        color: "#333333",
                        marginTop: "10px",
                      }}
                    >
                      {formatMessage("done.Verification")}
                    </div>
                    <div
                      style={{
                        textAlign: "center",
                        font: "normal normal normal 15px/34px Roboto",
                        color: "#333333",
                        marginTop: "10px",
                      }}
                    >
                      {formatMessage("done.Administrator")}
                    </div>
                    <Grid item container direction="row" alignItems="center">
                      <Button
                        startIcon={<ArrowBackIcon />}
                        color="success"
                        variant="text"
                        style={{ margin: "0 auto", color: "#00913E", font: "normal normal medium 15px/28px Roboto" }}
                        onClick={handleBackToLogin}
                      >
                        {formatMessage("backButton")}
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </Box>
            </form>
          </Paper>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
