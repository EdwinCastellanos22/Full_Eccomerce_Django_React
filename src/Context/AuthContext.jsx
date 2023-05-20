import React, { Children } from "react";
import { useState, useEffect } from "react";
import { createContext } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { loadScript } from "@paypal/paypal-js";
import jwtdecode from "jwt-decode";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ Children }) => {
  const [loading, setLoading] = useState(true);
  const url = "https://pempi22.pythonanywhere.com/";

  const [cart, setCart] = useState([]);
  const [cartName, setCartName]= useState([])

  const [token, setToken] = useState(() =>
    localStorage.getItem("token")
      ? "Bearer " + localStorage.getItem("token")
      : null
  );

  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtdecode(localStorage.getItem("authTokens"))
      : null
  );

  const [data, setData] = useState({});

  const headers = {
    Authorrization: token,
  };

  const loginUser = async (username, password) => {
    const response = await fetch(url + "api/token/", {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await response.json();
    if (response.status === 200) {
      setToken("Bearer " + data.access);
      setAuthToken(data);
      setUser(jwtdecode(data.access));
      localStorage.setItem("token", data.access);
      localStorage.setItem("authTokens", JSON.stringify(data));

      Swal.fire({
        icon: "success",
        title: "Hola",
        text: "Bienvenido",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      console.log(response);
    }
  };

  const registerUser = async (username, password, password2, email) => {
    const response = await fetch(url + "api/register/", {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        password2: password2,
        email: email,
      }),
    });
    const data = await response.json();
    if (response.status === 201) {
      Swal.fire({
        icon: "success",
        title: "Hecho",
        text: "Cuenta creada con exito!!",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ha ocurrido un error",
        timer: 2000,
        showConfirmButton: false,
      });
      console.log(response);
      console.log(data);
      console.log(password);
    }
  };

  const logout = () => {
    const token = localStorage.getItem("token");
    token
      ? (localStorage.removeItem("token"),
        localStorage.removeItem("authTokens"),
        setUser(null),
        setAuthToken(null),
        setToken(null),
        Swal.fire({
          icon: "info",
          title: "Logout",
          text: "Has salido Correctamente",
          timer: 1500,
          showConfirmButton: false,
        }))
      : Swal.fire({
          icon: "error",
          title: "Logout",
          text: "Aun no has iniciado sesion",
          timer: 1500,
          showConfirmButton: false,
        });
  };

  const paypal = () => {
    const userID =
      "AVwDIRtg-Io9_mJ7wJs-HnwSMc8cE68DMWTL5wW3osC8JomuNtlwPXfySwnQ25yO8VY19dQhXphFHi4C";

    loadScript({
      "client-id": userID,
    })
      .then((paypal) => {
        paypal
          .Buttons({
            style: {
              layout: "horizontal",
              color: "blue",
              shape: "pill",
              label: "paypal",
            },
            createOrder(data, actions) {
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    amount: {
                      value: "10.50",
                    },
                    description: "Pago Sistema",
                  },
                ],
              });
            },
            onApprove(data, actions) {
              return actions.order.capture().then((details) => {
                Swal.fire({
                  icon: "success",
                  title: "Pago Completado",
                  text: `Pago realizado por ${details.payer.name.given_name}`,
                  timer: 1500,
                });
                console.log("No.Orden: " + data.orderID);
              });
            },
          })
          .render(".paypalButtons");
      })
      .catch((error) => console.error(error));
  };

  const verifyToken = async () => {
    if(token){
      fetch(url+'api/token/verify/',{
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          'token': localStorage.getItem('token')
        })
      })
      .then((response) => {
        if(response.status != 200){
          localStorage.removeItem("token")
          localStorage.removeItem("authTokens")
          setUser(null)
          setAuthToken(null)
          setToken(null)
        }
      })
    }
  };

  const getCart = async () => {
    const response = await fetch(url + "api/car/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });
    const data = await response.json();
    if (response.status == 200) {
      await setCart(data);
    } else {
      console.log("Error");
    }
  };

  // Agregar Producto al Carrito
  const add_product = async  (pid) => {
    const response= await fetch(url +"api/car/", {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "pid":pid
      })
    });
    response.status == 201 ?
    Swal.fire({
      icon: "success",
      text: `Producto agregado!!`,
      showConfirmButton: false,
      timer: 1000,
    })
    : 
    Swal.fire({
      icon: "error",
      text: `Ha ocurrido un error!!`,
      showConfirmButton: false,
      timer: 1000,
    })
  };

  // Eliminar Producto
  const delete_product= async(cid) =>{
    const response= await fetch(url+"api/car/", {
      method: "DELETE",
      headers: {
        Authorization: token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "cid": cid
      })
    })
    response.status == 204 ? 
    Swal.fire({
      icon: "success",
      title: "Eliminado",
      text: "Se ha eliminado el producto!!",
      showConfirmButton: false,
      timer: 2000,
    }):
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Error!!",
      showConfirmButton: false,
      timer: 2000,
    });
  }

  const contextData = {
    user,
    setUser,
    authToken,
    setAuthToken,
    loginUser,
    logout,
    paypal,
    token,
    setToken,
    registerUser,
    url,
    getCart,
    cart,
    cartName,
    add_product,
    delete_product,
  };

  useEffect(() => {
    if (authToken) {
      setUser(jwtdecode(authToken.access));
      verifyToken()
    }
    setLoading(false);
  }, [authToken, loading]);

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : Children}
    </AuthContext.Provider>
  );
};
