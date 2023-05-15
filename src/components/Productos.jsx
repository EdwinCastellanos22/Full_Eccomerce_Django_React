import React from "react";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../Context/AuthContext";

function Productos() {
  const { token, url, add_product } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [next, setNext] = useState("");
  const [prev, setprev] = useState("");
  const [urls, setUrls] = useState(url + "api/products/");

  const irNext = () => {
    setUrls(next);
  };

  const irPrev = () => {
    setUrls(prev);
  };

  async function products() {
    if (token) {
      const response = await fetch(urls, {
        method: "GET",
        headers: {
          Authorization: token,
        },
      });
      const da = await response.json();
      setData(da.results);
      await da.next != null ? setNext(da.next) : null;
      await da.previous != null ? setprev(da.previous) : null;
    } else {
      null;
    }
  }

  useEffect(() => {
    products();
  });

  const pro = data.map((item) => (
    <div
      className="card place-items-center bg-white shadow-xl text-black m-3 max-[400px]:bg-black max-[400px]:text-white max-[400px]:w-32"
      key={item.pid}
      id={item.pid}
    >
      <figure>
        <img
          src={"https://picsum.photos/id/" + item.pid + "/300/300"}
          alt="image_product"
          className="rounded mt-2"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{item.nombre}</h2>
        <p>{item.descripcion}</p>
        <div className="card-actions justify-center">
          <button
            className="btn btn-primary"
            onClick={add_product.bind(this, item.pid)}
          >
            Q{item.precio} Agregar
          </button>
        </div>
      </div>
    </div>
  ));

  return (
    <>
      {token ? (
        <>
          <div className="grid grid-cols-3  max-[400px]:grid-cols-2 w-screen">
            {pro}
          </div>
          <div className="flex flex-row w-screen items-center justify-center">
            <div className="btn-group grid grid-cols-2 w-96">
              {prev != "" ? (
                <button className="btn btn-outline" onClick={irPrev}>
                  Previous page
                </button>
              ) : null}
              {next != "" ? (
                <button className="btn btn-outline" onClick={irNext}>
                  Next
                </button>
              ) : null}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default Productos;
