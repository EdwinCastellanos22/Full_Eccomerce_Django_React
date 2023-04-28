import React from "react";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../Context/AuthContext";
import logo from  '../assets/react.svg';
import Swal from "sweetalert2";

function Productos() {
  const { token, url } = useContext(AuthContext);
  const [data, setData] = useState([]);

  async function products() {
    if (token) {
      const response = await fetch(url+"api/products/", {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const da = await response.json();
      setData(da);
    } else {
      null
    }
  }

  const agregar = () => {
    Swal.fire({
      icon: 'success',
      text: 'Producto agregado',
      showConfirmButton: false,
      timer: 1000
    })
  }

  useEffect(() => {
    products();
  });

  const pro = data.map((item) => (
    <div className="card  bg-white shadow-xl text-black m-2 max-[400px]:bg-black max-[400px]:text-white max-[400px]:w-32" key={item.pid}>
      <figure><img src={logo} alt="image_product" /></figure>
      <div className="card-body">
        <h2 className="card-title">{item.nombre}</h2>
        <p>{item.descripcion}</p>
        <div className="card-actions justify-end max-[400px]:justify-center">
          <button className="btn btn-primary" onClick={agregar}>Q{item.precio} Comprar</button>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      {token ? (
        <>
          <div className="grid grid-cols-3  max-[400px]:grid-cols-2 w-screen m-2">{pro}</div>
          <div className="flex flex-row w-screen items-center justify-center">
            <div className="btn-group grid grid-cols-2 w-96">
              <button className="btn btn-outline">Previous page</button>
              <button className="btn btn-outline">Next</button>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default Productos;
