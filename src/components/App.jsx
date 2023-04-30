import React from "react";
import LoginRegister from "./LoginRegister";
import Productos from "./Productos";
import Navbar from "../utils/Navbar";

import { useContext } from "react";
import AuthContext from "../Context/AuthContext";

const App = () => {

  const {token}= useContext(AuthContext);

  return (
    <>
      <Navbar />
      <div className="flex flex-col text-black bg-slate-300 max-[400px]:w-screen">
        <h1 className="text-3xl font-mono font-bold animate-pulse text-center m-2">
          Django-Rest-Framework x React
        </h1>

        <Productos />
        <div className={token ? "flex flex-col":"flex flex-col justify-center items-center h-screen"}id="token_login">
        <LoginRegister />
        </div>
      </div>
    </>
  );
};

export default App;
