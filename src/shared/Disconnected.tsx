import React from "react";
import "../App.css";
import "../DarkModeLightMode.scss";
import { Grid, Typography } from "@material-ui/core";
import Lottie from "lottie-react-web";
import AnimatedAstronaut from "../astronaout.json";

const Disconnected: React.FC = (props) => {
  return (
    <Grid container justify="center" alignItems="center">
      <Grid item xs={12}>
        <div>
          <Lottie
            style={{ width: "375px" }}
            options={{
              animationData: AnimatedAstronaut,
            }}
          />
        </div>
      </Grid>
      <Typography
        style={{ fontSize: "14px" }}
        color="textSecondary"
        gutterBottom
      >
        {"Not connected to your backend..."}
      </Typography>
    </Grid>
  );
};

export default Disconnected;
