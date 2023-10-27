import React, { useMemo, useState, useEffect } from "react";
import { useHistory } from "../helpers/history";
import { makeStyles } from "@material-ui/styles";
import { Button, Box, Grid, Paper, LinearProgress, Checkbox, FormControlLabel } from "@material-ui/core";
import TextInput from "../components/inputs/TextInput";
import { useTranslations } from "../helpers/i18n";
import { useModulesManager } from "../helpers/modules";
import Helmet from "../helpers/Helmet";
import { useAuthentication } from "../helpers/hooks";
import Contributions from "./../components/generics/Contributions";

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
    width: 100,
  },
}));

const LOGIN_PAGE_CONTRIBUTION_KEY = "core.LoginPage";

const LoginPage = ({ logo }) => {
  const classes = useStyles();
  const history = useHistory();
  const modulesManager = useModulesManager();
  const { formatMessage } = useTranslations("core.LoginPage", modulesManager);
  const [credentials, setCredentials] = useState({});
  const [hasError, setError] = useState(false);
  const auth = useAuthentication();
  const [isAuthenticating, setAuthenticating] = useState(false);

  useEffect(() => {
    if (auth.isAuthenticated) {
      history.push("/");
    }
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setAuthenticating(true);
    if (await auth.login(credentials)) {
      history.push("/");
    } else {
      setError(true);
      setAuthenticating(false);
    }
  };

  const redirectToForgotPassword = (e) => {
    e.preventDefault();
    history.push("/forgot_password");
  };
  const MyBackgroundImage = 'openimis-fe-core_js/src/pages/backgroundNewImage.png';
  return (
    <>
      {isAuthenticating && (
        <Box position="absolute" top={0} left={0} right={0}>
          <LinearProgress className="bootstrap" />
        </Box>
      )}
<div style={{
  background: '#000000B2 0% 0%',
  opacity: '0.9'
  }}>
<div style={{
        height: "100vh", width: "100vw",
        backgroundImage: "url('images/backgroundNewImage.png')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'fill',
      }}>
        <div className={classes.container}>
          <Helmet title={formatMessage("pageTitle")} />

          <Paper className={classes.paper} elevation={2}>
            <form onSubmit={onSubmit}>
              <Box p={6} width={450}>
                <Grid container spacing={2} direction="column" alignItems="stretch" justifyContent="center">
                  <Grid item container direction="row" alignItems="center">
                    <img className={classes.logo} src={logo} style={{ margin: "0 auto" }} />
                    {/* <Box pl={2} fontWeight="fontWeightMedium" fontSize="h4.fontSize">
                    {formatMessage("core.displayAppName")}
                  </Box> */}
                  </Grid>
                  {/* <Grid item>
                    <Text>"Insurance Management System"</Text>
                  </Grid> */}
                  <div style={{
                    textAlign: 'center',
                    font: 'normal normal bold 24px/42px Roboto',
                    color: '#333333',
                    marginTop: "10px"
                  }}>CAMUIMS</div>
                  <Grid item>
                    <TextInput
                      required
                      readOnly={isAuthenticating}
                      label={formatMessage("username.label")}
                      fullWidth
                      defaultValue={credentials.username}
                      onChange={(username) => setCredentials({ ...credentials, username })}
                    />
                  </Grid>
                  <Grid item>
                    <TextInput
                      required
                      readOnly={isAuthenticating}
                      type="password"
                      label={formatMessage("password.label")}
                      fullWidth
                      onChange={(password) => setCredentials({ ...credentials, password })}
                    />
                  </Grid>
                  {hasError && (
                    <Grid item>
                      <Box color="error.main">{formatMessage("authError")}</Box>
                    </Grid>
                  )}
                  <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item xs={6} sx={{ m: 2 }}>
                      <FormControlLabel

                        label={formatMessage("rememberMe")}
                        style={{
                          color: '#999999',
                          fontSize: '14px',
                          fontWeight: 'bold'
                        }}
                        control={
                          <Checkbox
                            color="primary"
                            style={{ paddingLeft: '20px' }}
                          />
                        }
                      />
                    </Grid>
                    <div
                      style={{
                        color: '#00913E',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        textAlign: 'right',
                        paddingRight: '10px'
                      }}
                      onClick={redirectToForgotPassword}
                    >
                      {formatMessage("forgotPassword")}
                    </div>
                    <Contributions
                      contributionKey={LOGIN_PAGE_CONTRIBUTION_KEY}
                      style={{
                        fontSize: '14px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        textAlign: 'right'
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      fullWidth
                      type="submit"
                      disabled={isAuthenticating || !(credentials.username && credentials.password)}
                      color="primary"
                      variant="contained"
                    >
                      {formatMessage("loginBtn")}
                    </Button>
                  </Grid>

                </Grid>
              </Box>
            </form>
          </Paper>
        </div>
      </div>
</div>
    </>
  );
};

export default LoginPage;
