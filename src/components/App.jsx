import React from "react";
import AuthContext from "../Context/AuthContext";
import { useContext, useEffect } from "react";
import LoginRegister from "./LoginRegister";
import Productos from "./Productos";
const App = () => {
  const { logout, user, token, url, getCart, cart, paypal } = useContext(AuthContext);

  var user_username = "";
  user ? (user_username = user.username) : null;

  const showCart = async () => {
    token ?
    await getCart()
    : null
  };

  useEffect(()=>{
    showCart()
  })

  var price= 0
  const data = cart.map((item, index) => (
    <>
    <ol key={index}>
      <li>{item.producto}</li>
      <li>{item.cantidad}</li>
    </ol>
    </>
  ));

  return (
    <>
      <div className="navbar text-white p-2">
        <div className="navbar-start">
          {user_username ? (
            <button
              className="btn-ghost text-xl m-2 shadow-sm"
              style={{ textTransform: "uppercase" }}
            >
              {user_username}
            </button>
          ) : null}
        </div>

        <div className="navbar-center">
          {token ? (
            <>
              <label htmlFor="modal-cart">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </label>

              <input
                type="checkbox"
                name="modal-cart"
                id="modal-cart"
                className="modal-toggle"
              />
              <div className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                  <h1>Cart</h1>
                  <div className="">{data}</div>
                  <div className="moda-action">
                    <label htmlFor="modal-cart" className="btn">
                      Salir
                    </label>
                    <button className="btn btn-accent m-2">Q{price} Pagar</button>
                  </div>
                </div>
              </div>
            </>
          ) : null}
        </div>

        <div className="navbar-end">
          {token ? (
            <button className="btn btn-warning m-2" onClick={logout}>
              Logout
            </button>
          ) : null}
        </div>
      </div>

      <div className="flex flex-col text-white">
        <h1 className="text-3xl font-mono font-bold animate-pulse text-center">
          Dango-Rest-Framework
        </h1>
        <div className="paypalButtons"></div>

        <Productos />
        <LoginRegister />
      </div>
    </>
  );
};

export default App;
