import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      // width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      // color: "#333333",
      flex: 1,
    },
    iconButton: {
      padding: 10,
      color: "#6ca7b2",
    },
    divider: {
      height: 28,
      margin: 4,
    },
  })
);

interface PaperInputProps {
  value: string;
  placeholder: string;
  onChange: (s: string) => void;
}

function PaperInput(props: PaperInputProps) {
  const classes = useStyles();

  return (
    <>
      <Paper className={"Paper-Input"} elevation={0} style={{ width: "75%" }}>
        <InputBase
          className={classes.input}
          placeholder={props.placeholder}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          inputProps={{ "aria-label": "Your endpoint URL" }}
        />
      </Paper>
    </>
  );
}
// })

// PaperInput.defaultProps = {
//   width: "400px",
// };
export default PaperInput;
