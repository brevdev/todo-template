import React, { useEffect, useState } from "react";
import "./App.css";
import "./DarkModeLightMode.scss";
import PaperInput from "./PaperInput";
import Switch from "@material-ui/core/Switch";
import {
  createStyles,
  FormControlLabel,
  Grid,
  Checkbox,
  makeStyles,
  Typography,
  Button,
  CircularProgress,
} from "@material-ui/core";
import Lottie from "lottie-react-web";
import AnimatedAstronaut from "./astronaout.json";
import { ToDos, useToDos } from "./agent";

const useStyles = makeStyles((theme) =>
  createStyles({
    grids: {
      marginBottom: "11px",
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

function App() {
  const classes = useStyles();
  const [brevUrl, setBrevUrl] = useState("");
  const [newToDo, setNewToDo] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [api, setApi] = useState("/api/Todo");
  const [isBrevHookedUp, setIsBrevHookedUp] = useState(false);
  const { todos } = useToDos(api);

  useEffect(() => {
    setApi(brevUrl.split("brev.dev")[0] + "brev.dev/api/Todo");
  }, [brevUrl]);

  const addToDo = async () => {
    setIsAdding(true);
    await ToDos.add(brevUrl, {
      title: newToDo,
      isComplete: false,
    });
    setIsAdding(false);
    setNewToDo("");
  };

  useEffect(() => {
    const validateBrevURL = async () => {
      if (brevUrl.includes(".brev.dev")) {
        let url = brevUrl.split("brev.dev")[0] + "brev.dev/ping";
        const noCacheHeaders = new Headers();
        noCacheHeaders.append("pragma", "no-cache");
        noCacheHeaders.append("cache-control", "no-store");
        let request = new Request(url, {
          method: "GET",
          headers: noCacheHeaders,
          body: undefined,
          mode: "no-cors",
        });

        let response = await fetch(request);
        console.log(response);
        if (response.status !== 404) {
          setIsBrevHookedUp(true);
        } else {
          setIsBrevHookedUp(false);
        }
      } else {
        setIsBrevHookedUp(false);
      }
    };
    const delayDebounceFn = setTimeout(() => {
      validateBrevURL();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [brevUrl]);

  return (
    <div className="App">
      <DarkModeSwitcher>
        <div className={"headers"}>
          <Typography
            variant="subtitle2"
            className={classes.moduleHeader}
            style={{ color: isBrevHookedUp ? "#6ca7b2" : "#ff5c6cff" }}
          >
            {isBrevHookedUp
              ? "Connected to your Brev backend ✅ "
              : "1️⃣ Paste Your Brev URL Below"}
          </Typography>
          <PaperInput
            placeholder={"Your Backend URL"}
            value={brevUrl}
            onChange={setBrevUrl}
          />
        </div>
        {isBrevHookedUp && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "10%",
              width: "50%",
              marginLeft: "25%",
            }}
          >
            <Typography variant="subtitle2" className={classes.moduleHeader}>
              Add ToDo
            </Typography>
            <PaperInput
              placeholder={"new todo"}
              value={newToDo}
              onChange={(s) => setNewToDo(s)}
            />
            <Button variant={"outlined"} color={"secondary"} onClick={addToDo}>
              {isAdding ? <CircularProgress /> : "submit"}
            </Button>
          </div>
        )}
        <header className="App-header">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            {!isBrevHookedUp && <FloatyAstronaut />}

            {isBrevHookedUp && (
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
                      <ToDoItem
                        id={td.id}
                        isComplete={td.isComplete}
                        title={td.title}
                        brevUrl={brevUrl}
                      />
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
                      <ToDoItem
                        id={td.id}
                        isComplete={td.isComplete}
                        title={td.title}
                        brevUrl={brevUrl}
                      />
                    );
                  } else return "";
                })}
              </>
            )}
          </div>
        </header>
      </DarkModeSwitcher>
    </div>
  );
}

export default App;

interface IToDo {
  id: string;
  title: string;
  isComplete: boolean;
  brevUrl: string;
}

const ToDoItem: React.FC<IToDo> = (props) => {
  const [checked, setChecked] = React.useState(props.isComplete);

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    await ToDos.changeStatus(props.brevUrl, props.id, event.target.checked);
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

const FloatyAstronaut: React.FC = (props) => {
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
const DarkModeSwitcher: React.FC = (props) => {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.body.classList.add("Dark-Mode");
      document.body.classList.remove("Light-Mode");
    } else {
      document.body.classList.add("Light-Mode");
      document.body.classList.remove("Dark-Mode");
    }
  }, [dark]);

  return (
    <>
      {" "}
      <FormControlLabel
        control={
          <Switch
            checked={dark}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setDark(event?.target.checked)
            }
            name="checkedA"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
        }
        label="Dark Mode"
      />
      {props.children}
    </>
  );
};
