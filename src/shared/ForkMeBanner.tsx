import React from "react";
import "../App.css";

const ForkMeBanner: React.FC = () => {
  return (
    <span id="forkongithub">
      <a
        target="_blank"
        rel="noreferrer"
        href="https://github.com/brevdev/todo-template"
      >
        Fork me on GitHub
      </a>
    </span>
  );
};

export default ForkMeBanner;
