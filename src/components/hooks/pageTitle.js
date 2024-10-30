import { Box, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import UsePageTitle from "./usePageTitle";

const useStyles = makeStyles((theme) => ({
  container: theme.page,
}));

function PageTitle() {
  const classes = useStyles();
  const page = UsePageTitle();

  return (
    <Grid container className={classes.container} spacing={2}>
      <Grid item xs={12}>
        <Box mt={2}>
          <Typography variant="body1">{page.parent}</Typography>
          <Typography variant="h4">{page.title}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default PageTitle;
