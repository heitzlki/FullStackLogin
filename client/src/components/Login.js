import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {useLazyQuery} from "@apollo/client";
import BGbubbles from "./BGbubbles";
import {loginQuery} from "../queries/query";

function Login() {
	const [variables, setVariables] = useState({
		name: '',
		password: '',
	});
	const [errors, setErrors] = useState({});
    
    const history = useHistory();

    const [loginVar] = useLazyQuery(loginQuery, {
        onCompleted(data) {
            //localStorage.setItem('token', data.login.token)
            history.push("/");
        },
        onError(err) {
            try {
                setErrors("")
                setErrors(err.graphQLErrors[0].extensions.errors);
            } catch {
                console.log(err)
            }
            
        }
    });

    const handelSubmit = (e) => {
        e.preventDefault();
        loginVar({variables});
    }
    
    return (
        <div className="App">
            <BGbubbles />
			<div className='area'>
            <p className="title">Login</p>
                <form className="form" onSubmit={handelSubmit}>
                    <div className="field">
                        <input 
                            type="text"
                            className="input" 	
                            id={errors.name && "error"}  
                            value={variables.name}
                            onChange={(e) => {
                                setVariables({name: e.target.value, password: variables.password})
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
                                setVariables({name: variables.name, password: e.target.value})
                            }}
                        />
                        <lable className="lable" id={errors.password && "error"}>{errors.password ?? "Password"}</lable>
                    </div>
                    <button className=" input button">Sign In</button>
                </form>
			</div>
            
        </div>
    );
}

export default Login;
