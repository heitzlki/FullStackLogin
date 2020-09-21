import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import BGbubbles from "./BGbubbles";
import  {useMutation} from "@apollo/client";
import {registerMutation} from "../queries/query"; 

function Register() {
	const [variables, setVariables] = useState({
		name: '',
        password: '',
        confirmPassword: '',
	});
	const [errors, setErrors] = useState({});
    
    const history = useHistory();

    const [registerVar] = useMutation(registerMutation, {
        onCompleted(data) {
            //localStorage.setItem('token', data.login.token)
            history.push("/");
        },
        onError(err) {
            try {
                setErrors(err.graphQLErrors[0].extensions.errors.errors);
            } catch {
                console.log(err.graphQLErrors)
            }
            
        }
    });

    const handelSubmit = (e) => {
        e.preventDefault();
        registerVar({variables});
    }
    
    return (
        <div className="App">
            <BGbubbles />
			<div className='area'>
            <p className="title">Register</p>
                <form className="form" onSubmit={handelSubmit}>
                    <div className="field">
                        <input 
                            type="text"
                            className="input" 	
                            id={errors.name && "error"}  
                            value={variables.name}
                            onChange={(e) => {
                                setVariables({name: e.target.value, password: variables.password, confirmPassword: variables.confirmPassword})
                            }}
                        />
                        <lable className="lable" id={errors.name && "error"}>{errors.name ?? "Name"}</lable>
                    </div>
                    <div className="field">
                        <input 
                            type="password" 
                            className="input" 	
                            id={errors.password && "error"}  
                            value={variables.password}
                            onChange={(e) => {
                                setVariables({name: variables.name, password: e.target.value, confirmPassword: variables.confirmPassword})
                            }}
                        />
                        <lable className="lable" id={errors.password && "error"}>{errors.password ?? "Password"}</lable>
                    </div>
                    <div className="field">
                        <input 
                            type="password" 
                            className="input" 	
                            id={errors.confirmPassword && "error"}
                            value={variables.confirmPassword}
                            onChange={(e) => {
                                setVariables({name: variables.name, password: variables.password, confirmPassword: e.target.value})
                            }}
                        />
                        <lable className="lable" id={errors.confirmPassword && "error"}>{errors.confirmPassword ?? "Confirm Password"}</lable>
                    </div>
                    <button className=" input button">Sign In</button>
                </form>
			</div>
            
        </div>
    );
}

export default Register;
