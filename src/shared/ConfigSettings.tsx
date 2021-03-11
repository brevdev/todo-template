import { useContext, useEffect, useState } from "react";
import "../App.css";
import "../DarkModeLightMode.scss";
import { createStyles, makeStyles, Typography } from "@material-ui/core";
import PaperInput from "../PaperInput";
import { ConnectedContext } from "../ConnectedContext";

const useStyles = makeStyles((theme) =>
  createStyles({
    moduleHeader: {
      textAlign: "left",
      fontSize: "1rem",
      fontWeight: 700,
      lineHeight: "1.5rem",
      padding: "6px 24px 6px 16px",
    },
  })
);

const ConfigSettings: React.FC = (props) => {
  const [brevUrl, setBrevUrl] = useState("");
  const { setBrevUrl: setContextUrl, isBrevHookedUp } = useContext(
    ConnectedContext
  );

  const classes = useStyles();

  useEffect(() => {
    let cached_url = localStorage.getItem("brev_url");
    if (cached_url !== null) {
      setBrevUrl(cached_url);
    }
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setContextUrl(brevUrl);
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [brevUrl, setContextUrl]);

  return (
    <div className={"headers"}>
      <Typography
        variant="subtitle2"
        className={classes.moduleHeader}
        style={{ color: isBrevHookedUp ? "#6ca7b2" : "#ff5c6c" }}
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
  );
};

export default ConfigSettings;
