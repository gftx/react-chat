import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Join.css";

const Join = () => {
	const [name, setName] = useState("");
	const [room, setRoom] = useState("");

	return (
		<div className="join-outer-container">
			<div className="join-inner-container">
				<h1 className="join-heading">Join</h1>
				<p className="join-description">write down your name and room id</p>
				<div className="join-inputs">
					<div>
						<input
							placeholder="name"
							className="join-input"
							type="text"
							onChange={(event) => setName(event.target.value)}
						/>
					</div>
					<div>
						<input
							placeholder="room id"
							className="join-input"
							type="text"
							onChange={(event) => setRoom(event.target.value)}
						/>
					</div>
					<Link
						onClick={(event) =>
							!name || !room ? event.preventDefault() : null
						}
						to={`/chat?name=${name}&room=${room}`}
					>
						<button className="join-button" type="submit">
							sign In
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Join;
