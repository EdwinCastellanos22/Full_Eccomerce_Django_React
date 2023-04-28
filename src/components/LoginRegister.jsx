import React from "react";
import { useContext, useState } from "react";
import AuthContext from "../Context/AuthContext";

export default function LoginRegister() {
  const { loginUser, token, viewToken, verifyToken } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    loginUser(username, password);
  };

  return (
    <div className="tokens">
      {token ? (
        <>
          <button className="btn btn-info m-2" onClick={viewToken}>
            View Token
          </button>
          <button className="btn btn-accent m-2" onClick={verifyToken}>Check validation token</button>
        </>
      ) : (
        <>
          {/* Modal Login */}
          <label htmlFor="login" className="btn btn-outline btn-success m-10">
            Login
          </label>

          <input type="checkbox" id="login" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box">
              <h3 className="text-center text-2xl font-bold text-white font-mono">
                Login
              </h3>
              <input
                type="text"
                className="input bordered border-accent text-white m-2"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <br />
              <input
                type="password"
                className="input bordered border-accent text-white m-2"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="modal-action">
                <label htmlFor="login" className="btn btn-warning">
                  Cancelar
                </label>
                <button className="btn btn-success" onClick={login}>
                  Login
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
