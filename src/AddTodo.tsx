import { useState, useContext } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Typography, Button, CircularProgress } from "@material-ui/core";
import PaperInput from "./PaperInput";
import { ToDos, useToDos } from "./agent";
import "./App.css";
import "./DarkModeLightMode.scss";
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

function AddTodo() {
  const classes = useStyles();
  const [isAdding, setIsAdding] = useState(false);
  const [newToDo, setNewToDo] = useState("");
  const { brevUrl } = useContext(ConnectedContext);
  const { mutate } = useToDos(brevUrl); // force lists to refresh

  const addToDo = async () => {
    setIsAdding(true);
    await ToDos.add(brevUrl, {
      title: newToDo,
      isComplete: false,
    });
    setIsAdding(false);
    setNewToDo("");
    mutate(undefined);
  };

  return (
    <div className={"addToDo"}>
      <Typography variant="subtitle2" className={classes.moduleHeader}>
        Add ToDo
      </Typography>
      <PaperInput
        placeholder={"new todo"}
        value={newToDo}
        onChange={setNewToDo}
      />
      <Button variant={"outlined"} color={"secondary"} onClick={addToDo}>
        {isAdding ? <CircularProgress /> : "submit"}
      </Button>
    </div>
  );
}

export default AddTodo;
