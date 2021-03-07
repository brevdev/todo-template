import React, { useEffect, useState } from "react";
import "../App.css";
import "../DarkModeLightMode.scss";
import Switch from "@material-ui/core/Switch";
import { FormControlLabel } from "@material-ui/core";

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

export default DarkModeSwitcher;
