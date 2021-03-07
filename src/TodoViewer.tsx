import React, { useContext, useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  Typography,
  CircularProgress,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { ToDos, useToDos } from "./agent";
import { ConnectedContext } from "./ConnectedContext";

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
    moduleHeader: {
      textAlign: "left",
      // fontSize: "0.875rem",
      fontSize: "1rem",
      fontWeight: 700,
      lineHeight: "1.5rem",
      padding: "6px 24px 6px 16px",
    },
  })
);

function TodoViewer() {
  const classes = useStyles();
  const { brevUrl } = useContext(ConnectedContext);
  const { todos, isLoading } = useToDos(brevUrl);

  if (isLoading) {
    return (
      <>
        <Typography
          variant="subtitle2"
          className={classes.moduleHeader}
          style={{ color: "#6ca7b2" }}
        >
          My ToDos:
        </Typography>
        <CircularProgress style={{ margin: "auto" }} />
        <Typography
          variant="subtitle2"
          className={classes.moduleHeader}
          style={{ color: "#a5b6b9" }}
        >
          Completed ToDos:
        </Typography>
        <CircularProgress style={{ margin: "auto" }} />
      </>
    );
  }

  return (
    <>
      <Typography
        variant="subtitle2"
        className={classes.moduleHeader}
        style={{ color: "#6ca7b2" }}
      >
        My ToDos:
      </Typography>
      {todos.map((td) => {
        if (!td.isComplete) {
          return (
            <ToDoItem id={td.id} isComplete={td.isComplete} title={td.title} />
          );
        } else return "";
      })}
      <Typography
        variant="subtitle2"
        className={classes.moduleHeader}
        style={{ color: "#a5b6b9" }}
      >
        Completed ToDos:
      </Typography>
      {todos.map((td) => {
        if (td.isComplete) {
          return (
            <ToDoItem id={td.id} isComplete={td.isComplete} title={td.title} />
          );
        } else return "";
      })}
    </>
  );
}

export default TodoViewer;

interface TodoProps {
  id: string;
  title: string;
  isComplete: boolean;
}

const ToDoItem: React.FC<TodoProps> = (props) => {
  const [checked, setChecked] = useState(props.isComplete);
  const { brevUrl } = useContext(ConnectedContext);
  const { mutate } = useToDos(brevUrl); // force lists to refresh

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    await ToDos.changeStatus(brevUrl, props.id, event.target.checked);
    mutate(undefined);
  };

  return (
    <FormControlLabel
      control={
        <Checkbox
          color={"default"}
          checked={checked}
          onChange={handleChange}
          name="checked"
        />
      }
      className={props.isComplete ? "completed-todo" : ""}
      label={props.title}
    />
  );
};
