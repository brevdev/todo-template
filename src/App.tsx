import { useContext } from "react";
import "./App.css";
import "./DarkModeLightMode.scss";
import AddTodo from "./AddTodo";
import TodoViewer from "./TodoViewer";
import ConfigSettings from "./shared/ConfigSettings";
import Disconnected from "./shared/Disconnected";
import DarkModeSwitcher from "./shared/DarkModeSwitcher";
import ConnectedContextProvider, { ConnectedContext } from "./ConnectedContext";
import ForkMeBanner from "./shared/ForkMeBanner";

function App() {
  return (
    <ConnectedContextProvider>
      <ForkMeBanner />

      <TodoApp />
    </ConnectedContextProvider>
  );
}

export default App;

function TodoApp() {
  const { isBrevHookedUp } = useContext(ConnectedContext);

  return (
    <div className="App">
      <DarkModeSwitcher>
        <ConfigSettings />

        <header className="App-header">
          {isBrevHookedUp && <AddTodo />}
          <div className={"content"}>
            {!isBrevHookedUp && <Disconnected />}
            {isBrevHookedUp && <TodoViewer />}
          </div>
        </header>
      </DarkModeSwitcher>
    </div>
  );
}
