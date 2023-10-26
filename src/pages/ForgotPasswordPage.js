import React, { useState } from "react";

import { makeStyles } from "@material-ui/styles";
import { Button, Box, Grid, Paper, Typography } from "@material-ui/core";
import TextInput from "../components/inputs/TextInput";
import { useTranslations } from "../helpers/i18n";
import { useModulesManager } from "../helpers/modules";
import Helmet from "../helpers/Helmet";
import { useGraphqlMutation } from "../helpers/hooks";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';

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
  const [username, setUsername] = useState();
  const [isDone, setDone] = useState(false);
  const history = useHistory();
  const { isLoading, mutate } = useGraphqlMutation(
    `
    mutation resetPassword($input: ResetPasswordMutationInput!) {
      resetPassword(input: $input) {
        clientMutationId
        success
        error
      }
    }
  `,
    {
      wait: false,
    },
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    await mutate({ username });
    await setDone(true);
  };

  const handleBackToLogin = () => {
    // Use the history object to navigate to the LoginPage route
    history.push('/login');
  };

  return (
    <>
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
        }}></div>
      <div className={classes.container}>
        <Helmet title={formatMessage("pageTitle")} />
        <Paper className={classes.paper} elevation={2}>
          <form onSubmit={onSubmit}>
            <Box p={3} width={500}>
              {!isDone && (
                <Grid container spacing={2} direction="column" alignItems="stretch">
                  <Grid item container direction="row" alignItems="center">
                    <img className={classes.logo} src={props.logo} style={{ margin: "0 auto" }} />
                  </Grid>
                  <div style={{
                      textAlign: 'center',
                      font: 'normal normal bold 24px/42px Roboto',
                      color: '#333333',
                      marginTop: "10px"
                    }}>{formatMessage("recoverTitle")}</div>
                  {/* <Grid item>
                    <h1>{formatMessage("recoverTitle")}</h1>
                  </Grid> */}
                  {/* <Grid item>
                    <Typography>{formatMessage("explanationMessage")}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>{formatMessage("contactAdministrator")}</Typography>
                  </Grid> */}
                  <Grid item>
                    <TextInput
                      required
                      readOnly={isLoading}
                      label={formatMessage("username.label")}
                      fullWidth
                      onChange={(username) => setUsername(username)}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      fullWidth
                      type="submit"
                      disabled={!username || isLoading}
                      color="primary"
                      variant="contained"
                    >
                      {formatMessage("submitBtn")}
                    </Button>
                  </Grid>
                  <Grid item container direction="row" alignItems="center">
                    <Button
                      startIcon={<ArrowBackIcon/>}
                      color="success"
                      variant="text"
                      style={{ margin: "0 auto",
                    color: '#00913E',
                    font: 'normal normal medium 15px/28px Roboto'
                    }}
                    onClick={handleBackToLogin}
                    >
                      Back to Login
                    </Button>
                  </Grid>
                </Grid>
              )}

              {isDone && 
              
              // <h1>{formatMessage("done")}</h1>
              

              <Grid container spacing={2} direction="column" alignItems="stretch" style={{ borderRadius: '16px' }}>
              <Grid item container direction="row" alignItems="center">
                <img className={classes.logo} src={props.logo} style={{ margin: "0 auto" }} />
              </Grid>
              <div style={{
                  textAlign: 'center',
                  font: 'normal normal bold 24px/42px Roboto',
                  color: '#333333',
                  marginTop: "10px"
                }}>An e-mail with Verification link has been sent to your e-mail address.</div>
              <div style={{
                  textAlign: 'center',
                  font: 'normal normal normal 15px/34px Roboto',
                  color: '#333333',
                  marginTop: "10px"
                }}>If you do not receive an e-mail, please check with your administrator.</div>
              <Grid item container direction="row" alignItems="center">
                <Button
                  startIcon={<ArrowBackIcon/>}
                  color="success"
                  variant="text"
                  style={{ margin: "0 auto",
                color: '#00913E',
                font: 'normal normal medium 15px/28px Roboto'
                }}
                onClick={handleBackToLogin}
                >
                  Back to Login
                </Button>
              </Grid>
            </Grid>
              }
            </Box>
          </form>
        </Paper>
      </div>
      </div>
      
    </>
  );
};

export default ForgotPasswordPage;
