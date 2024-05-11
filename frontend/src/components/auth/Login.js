import React, { useEffect, useState } from "react";
import {useDispatch,useSelector} from "react-redux"
import { loginUser } from "../../features/authSlice";
import { StyledForm } from "./styledForm";
import {useNavigate} from "react-router"

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    useEffect(()=>{
        if(auth._id){
            navigate("/cart")
        }
    },[auth._id,navigate])
    
    const [user, setUser] = useState({
       
        email: "",
        password: "",
    });

    const handleSubmit = (e)=>{
        e.preventDefault();
        dispatch(loginUser(user))
    }

    return (
        <>
            <StyledForm action="" onSubmit={handleSubmit}>
                <h2>Login</h2>
                
                <input type="email"
                 placeholder="email"
                 onChange={(e) => setUser({ ...user, email: e.target.value })}
                  />
                <input 
                type="password"
                 placeholder="password"
                 onChange={(e) => setUser({ ...user, password: e.target.value })}
                  />
                <button type="submit">{auth.loginStatus==="pending"?"submittiong...":"Login"}</button>
                {auth.loginStatus==="rejected"?<p>{auth.loginError}</p>:null}
            </StyledForm>
        </>
    );
};

export default Login;
