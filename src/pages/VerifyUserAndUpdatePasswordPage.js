import React, { useState, useMemo, useEffect } from "react";

import { makeStyles } from "@material-ui/styles";
import { Button, Box, Grid, Paper } from "@material-ui/core";
import TextInput from "../components/inputs/TextInput";
import { useTranslations } from "../helpers/i18n";
import { useModulesManager } from "../helpers/modules";
import { useHistory } from "../helpers/history";
import Helmet from "../helpers/Helmet";
import { useGraphqlMutation2 } from "../helpers/hooks";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    top: "20%",
    left: 0,
    right: 0,
    margin: "auto",
    display: "flex",
    justifyContent: "center",
  },
  paper: theme.paper.paper,
  logo: {
    maxHeight: 100,
  },
  setBox: {
    boxShadow: "0px 0px 0px #eee",
  },
}));

const VerifyUserAndUpdatePasswordPage = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const modulesManager = useModulesManager();
  const { formatMessage } = useTranslations("core.SetPasswordPage", modulesManager);
  const [credentials, setCredentials] = useState({});
  const [error, setError] = useState();

  const { mutate } = useGraphqlMutation2(
    `
      mutation verifyUserAndUpdatePassword($password: String!, $token: String!, $userId: String!) {
        verifyUserAndUpdatePassword(password: $password, token: $token, userId: $userId) {
          success
          message
        }
      }
    `,
    { wait: false },
  );

  useEffect(() => {
    const search = new URLSearchParams(location.search);
    setCredentials({
      token: search.get("token"),
      username: search.get("username"),
      userId: search.get("user_id"),
    });
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (isValid) {
      const result = await mutate(
        {
          password: credentials.password,
          username: credentials.username,
          token: credentials.token,
          userId: credentials.userId,
        },
        true,
      );
      if (result?.verifyUserAndUpdatePassword.success) {
        history.push("/");
      } else {
        setError(result?.verifyUserAndUpdatePassword.error || formatMessage("error"));
      }
    }
  };

  const isValid = useMemo(
    () =>
      credentials.confirmPassword &&
      credentials.password &&
      credentials.password === credentials.confirmPassword &&
      credentials.username &&
      credentials.token,
    [credentials],
  );

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
          <Paper className={`${classes.paper} ${classes.setBox}`} elevation={2}>
            <form onSubmit={onSubmit}>
              <Box p={6} width={530}>
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
                    {formatMessage("pageTitle")}
                  </div>
                  <Grid item>
                    <TextInput
                      required
                      type="text"
                      label={formatMessage("username.label")}
                      fullWidth
                      value={credentials.username}
                      readOnly={true}
                    />
                  </Grid>
                  <Grid item>
                    <TextInput
                      required
                      type="password"
                      label={formatMessage("password.label")}
                      fullWidth
                      onChange={(password) => setCredentials({ ...credentials, password })}
                    />
                  </Grid>
                  <Grid item>
                    <TextInput
                      required
                      type="password"
                      label={formatMessage("confirmPassword.label")}
                      fullWidth
                      onChange={(confirmPassword) => setCredentials({ ...credentials, confirmPassword })}
                    />
                  </Grid>
                  {error && (
                    <Grid item>
                      <Box color="error.main">{error}</Box>
                    </Grid>
                  )}

                  <Grid item>
                    <Button fullWidth type="submit" disabled={!isValid} color="primary" variant="contained">
                      {formatMessage("submitBtn")}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </form>
          </Paper>
        </div>
      </div>
    </>
  );
};

export default VerifyUserAndUpdatePasswordPage;
