import React, { useState, useEffect } from "react";
interface ConnectedContextType {
  brevUrl: string;
  setBrevUrl: (url: string) => void;
  isBrevHookedUp: boolean;
}

export const ConnectedContext = React.createContext<ConnectedContextType>({
  brevUrl: "",
  setBrevUrl: (url: string) => null,
  isBrevHookedUp: false,
});

// interface ConnectedContextState {
//   brevUrl: string;
//   setBrevUrl: (url: string) => void;
//   isBrevHookedUp: boolean;
// }

const ConnectedContextProvider: React.FC = (props) => {
  const [brevUrl, setBrevUrl] = useState("");
  const [isBrevHookedUp, setIsBrevHookedUp] = useState(false);

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
          localStorage.setItem("brev_url", brevUrl);
        } else {
          setIsBrevHookedUp(false);
          localStorage.removeItem("brev_url");
        }
      } else {
        setIsBrevHookedUp(false);
        localStorage.removeItem("brev_url");
      }
    };
    validateBrevURL();
  }, [brevUrl]);

  return (
    <ConnectedContext.Provider
      value={{
        brevUrl: brevUrl,
        setBrevUrl: setBrevUrl,
        isBrevHookedUp: isBrevHookedUp,
      }}
    >
      {props.children}
    </ConnectedContext.Provider>
  );
};

export default ConnectedContextProvider;
