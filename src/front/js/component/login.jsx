import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

export function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState(""); // Estado para manejar errores

    const login = async (e) => {
        e.preventDefault();
        const dataSend = {
            email: e.target.email.value,
            password: e.target.password.value,
        };

        const resp = await fetch(process.env.BACKEND_URL + "/api/usuario/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dataSend),
        });

        if (resp.ok) {
            const data = await resp.json();
            console.log("Te has logueado", data);
            localStorage.setItem("token", data[1]);
            console.log("Token guardado en LocalStorage");
            setError(""); 
            navigate("/private");
        } else {
            setError("Credenciales incorrectas. Por favor, inténtalo de nuevo."); 
            console.error("No has podido loguearte, revisa tus credenciales");
        }
    };

    return (
        <div className='d-flex flex-column align-items-center gap-2 mt-5'>
                <div className="right-side d-flex flex-column align-items-center text-center">
                    <h1 className="mb-5">Inicia sesion!</h1>
                    <form className="d-flex flex-column align-items-center gap-2" onSubmit={login}>
                        <div>
                            <label className="form-label" htmlFor="email">Email</label>
                            <input
                                className="form-control"
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Escribe tu email"
                                required
                            />
                        </div>
                        <div>
                            <label className="form-label" htmlFor="password">Contraseña</label>
                            <input
                                className="form-control"
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Contraseña"
                                required
                                autoComplete="current-password"
                            />
                        </div>
                        {error && <p className="text-danger">{error}</p>} 
                        <button className="btn btn-success col-4">Login!</button>
                        
                    </form>
                </div>
            </div>
    );
}