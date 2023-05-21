import React from 'react';
import { loadScript } from '@paypal/paypal-js';
import AuthContext from "../Context/AuthContext";
import { useContext, useEffect } from "react";
import {FaUserAlt} from 'react-icons/fa';
import {FiLogOut} from 'react-icons/fi';
import {FiDelete} from "react-icons/fi";

function Navbar() {

  const { logout, user, token, getCart, cart, delete_product, pagototal } = useContext(AuthContext);

  const userID =
      "AVwDIRtg-Io9_mJ7wJs-HnwSMc8cE68DMWTL5wW3osC8JomuNtlwPXfySwnQ25yO8VY19dQhXphFHi4C";

  var user_username = "";
  user ? (user_username = user.username) : null;

  const showCart = async () => {
    token ?
    await getCart()
    : null
  };


  useEffect(()=>{
    loadScript({"client-id":userID})
    .then((paypal) => {
      paypal.Buttons({
        style:{
          layout: "horizontal",
          color: "white",
          label: "paypal",
        }
      }).render("#paypal")
    })
    showCart()
  },[])


  const data = cart.map((item) => (
    <tr key={item.cid}>
      <td>{item.producto.nombre}</td>
      <td>Q{item.producto.precio}</td>
      <td>{item.cantidad}</td>
      <td><FiDelete onClick={delete_product.bind(this, item.cid, item.producto.precio)}/></td>
    </tr>
  ));

  return (
    <div className={token ? "navbar text-black bg-slate-200" : "hidden"}>
        <div className="navbar-start">
          {user_username ? (
            <>
            <span
              className="btn-ghost text-xl m-2 shadow-sm"
            >
              <FaUserAlt/>
            </span>
            <span>{user_username}</span>
            </>
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
                <div className="modal-box w-11/12 max-w-5xl bg-slate-300 text-black">
                  <h1 className="text-2xl font-mono font-bold self-center">Mi Carrito</h1>
                  { pagototal > 0 ? (
                    <>
                    <table className="table w-full text-white bg-black">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {data}
                    </tbody>
                  </table>
                  <div className="modal-action">
                    <div className="">
                      <button className='btn btn-ghost'>Total: Q{(pagototal/1).toFixed(2)}</button>
                    <div className="w-32 m-2" id='paypal'></div>
                    <label htmlFor="modal-cart" className="btn text-white m-2">
                      Salir
                    </label>
                    </div>
                  </div>
                  </>
                  ): (
                    <>
                    <div className="flex justify-center items-center h-full">
                      <h4 className="text-xl font-bold">Agrega productos a el carrito!!</h4>
                    </div>
                    <div className="modal-action">
                      <label htmlFor="modal-cart" className='btn text-white'>Salir</label>
                    </div>
                    </>
                  )}
                  
                </div>
              </div>
            </>
          ) : null}
        </div>

        <div className="navbar-end">
          {token ? (
            <button className="btn btn-warning m-2" onClick={logout}>
              <FiLogOut />
            </button>
          ) : null}
        </div>
      </div>
  )
}

export default Navbar;