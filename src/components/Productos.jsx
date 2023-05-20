import React from "react";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../Context/AuthContext";
import { animateScroll as scroll } from "react-scroll";

function Productos() {
  const { token, url, add_product } = useContext(AuthContext);

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [next, setNext]= useState(null)
  const [prev, setPrev]= useState(null)
  const [data, setData] = useState([]);

  useEffect(() => {
    if(loading){
      fetch(url+'api/products/?page='+page,{
        method: "GET",
        headers: {
          Authorization: token
        }
      })
      .then((response)=> response.json())
      .then((data) =>{
        setData(data.results)
        data.next != '' ? setNext(data.next) : setNext(null)
        data.previous != '' ? setPrev(data.previous) : setNext(null)
        setLoading(false)
      })
      .catch((error)=>console.log(error))
    }
  }),[loading];

  const irNext = () => {
    setPage(page +1)
    setLoading(true)
    scroll.scrollToTop()
  }
  const irPrev = () => {
    setPage(page -1)
    setLoading(true)
    scroll.scrollToTop()
  }

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
          className="rounded"
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

  if (loading) {
    return (
    <div className="flex flex-col h-screen justify-center items-center">
      <button className="btn loading">loading</button>
    </div>
    )
  } else {
    return (
      <>
        {token ? (
          <>
            <div
              className="grid grid-cols-3  max-[400px]:grid-cols-2 w-screen">
              {pro}
            </div>
            <div className="flex flex-row w-screen items-center justify-center">
              <div className="btn-group">
                {prev != null ? <button className="btn mr-2" onClick={irPrev}>prev</button> : null}
                <button className="btn btn-ghost">{page}</button>
                {next != null ? <button className="btn ml-2" onClick={irNext}>next</button> : null}
              </div>
            </div>
          </>
        ) : null}
      </>
    );
  }
}

export default Productos;
