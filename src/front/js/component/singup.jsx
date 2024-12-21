import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function Singup(){
    const [email, setEmail] =useState("")
    const [password, setPassword] =useState("")
    const [errorMessage, setErrorMessage] = useState(""); 
    const navigate = useNavigate()

    const createUser = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setErrorMessage("Por favor, completa todos los campos requeridos.");
            return;
        }

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        const response = await fetch(process.env.BACKEND_URL + '/api/usuario',{
            method: 'POST',
            body: formData
        })

        if (response.ok) {
            const user = await response.json();
            console.log('Usuario creado exitosamente:', user);
            navigate('/login')
        } else {
            const errorMessage = await response.text();
            console.log('Error al crear usuario:', errorMessage);
        }
        
    }

    return (
    <div>
        <div className='d-flex flex-column align-items-center gap-2 mt-5'>
            <h1>Crear un usuario!</h1>
            <form className='d-flex flex-column align-items-center gap-2' onSubmit={createUser}>
                <label className="form-label" htmlFor="email">Email:</label>
                <input className="form-control" type="email" id='email' placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                <label className="form-label" htmlFor="password">Contraseña:</label>
                <input className="form-control" type="password" id='password' placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
                <button  className='btn btn-success col-5' type="submit">SingUp</button>
            </form>
        </div>
    </div>    
    );
}