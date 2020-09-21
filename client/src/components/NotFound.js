import React from "react";
import { useHistory } from "react-router-dom";
import BGbubbles from "./BGbubbles";

function NotFound() {
    const history = useHistory();
    return (
		<div className="App">
			<BGbubbles />
			<div className='area'>
				<p className="title">404</p>
				<div className="form">
					<button className="button input" onClick={() => {history.push("/")}}>Home</button>
				</div>
			</div>
		</div>
    );
}

export default NotFound;
