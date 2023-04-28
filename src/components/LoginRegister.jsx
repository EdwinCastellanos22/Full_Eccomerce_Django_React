import React from "react";
import { useContext, useState } from "react";
import AuthContext from "../Context/AuthContext";
import icon from "../assets/react.png";
import django from "../assets/django.png";

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
          <button className="btn btn-accent m-2" onClick={verifyToken}>
            Check validation token
          </button>
        </>
      ) : (
        <>
          <div className="inline-flex ml-10">
            <img src={icon} alt="react_icon" className="w-32 m-4" />
            <img src={django} alt="django_icon" className="w-32 m-4" />
          </div>
          <h3 className="text-3xl font-mono font-bold text-black">
            <strong>Inicia sesion</strong> o <strong>registrate</strong>
          </h3>
          {/* Modal Login */}
          <label htmlFor="login" className="btn btn-success m-10 text-black">
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

          {/* modal register */}
          <label htmlFor="register" className="btn btn-accent m-10 text-black">
            Register
          </label>

          <input type="checkbox" id="register" className="modal-toggle" />
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
                type="email"
                className="input bordered border-accent text-white m-2"
                placeholder="Email"
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <input
                type="password"
                className="input bordered border-accent text-white m-2"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
              <input
                type="password"
                className="input bordered border-accent text-white m-2"
                placeholder="Repeat Password"
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="modal-action">
                <label htmlFor="register" className="btn btn-warning">
                  Cancelar
                </label>
                <button className="btn btn-success" onClick={login}>
                  Register
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
