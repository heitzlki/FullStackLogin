import React from "react";
import { useHistory } from "react-router-dom";
import BGbubbles from "./BGbubbles";

function Home() {
    const history = useHistory();
    return (
		<div className="App">
			<BGbubbles />
			<div className='area'>
				<p className="title">Home</p>
				<div className="form">
					<button className="button input" onClick={() => {history.push("/login")}}>Login</button>
					<button className="button input" onClick={() => {history.push("/register")}}>Register</button>
				</div>
			</div>
		</div>
    );
}

export default Home;
