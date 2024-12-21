import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
 
export const Private = () => {
	const [isLogin, setIsLogin]=useState(false)
	const navigate = useNavigate()

	useEffect(()=>{
		const token =localStorage.getItem('token')
		if(token){
			setIsLogin(true)
		} else{ setIsLogin(false)}

	},[localStorage.getItem('token')])

	const logOut = ()=>{
		localStorage.removeItem('token');
		setIsLogin(false);
		console.log("Se cerro la sesion")
		navigate('/login')
	}

	
	return (
		<div className='d-flex flex-column align-items-center gap-2 mt-5'>
			{(isLogin) ? 
                <div className="mx-auto">
                    <h1>Tienes tu sesion iniciada!</h1>
                    <a className="" href="#" onClick={logOut}>
                        <button type="button" class="btn btn-warning">Cerrar Sesion</button>
                    </a>
                    </div>
			: (<>
				<h1>
				    No has iniciado sesion!
				</h1>
				
				</>)
				}
					
				
		</div>
	);
};