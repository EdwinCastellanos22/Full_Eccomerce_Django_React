import React from 'react'
import { useState } from "react";
import AuthContext from "../Context/AuthContext";
import { useContext, useEffect } from "react";
import {FaUserAlt} from 'react-icons/fa';
import {FiLogOut} from 'react-icons/fi';
import {FiDelete} from "react-icons/fi"

function Navbar() {

  const { logout, user, token, getCart, cart, delete_product} = useContext(AuthContext);

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


  const data = cart.map((item) => (
    <tr key={item.cid}>
      <td>{item.producto.nombre}</td>
      <td>{item.producto.precio}</td>
      <td>{item.cantidad}</td>
      <td>{item.precio_total}</td>
      <td><FiDelete onClick={delete_product.bind(this, item.cid)}/></td>
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
                  <table className="table w-full text-white bg-black">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Precio Total</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {data}
                    </tbody>
                  </table>
                  <div className="moda-action">
                    <label htmlFor="modal-cart" className="btn text-white">
                      Salir
                    </label>
                    <button className="btn btn-accent m-2">Q0 Pagar</button>
                  </div>
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