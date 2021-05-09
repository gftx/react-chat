import React from "react";
import "./TextContainer.css";

const TextContainer = ({ users }) => (
	<div className="text-container">
		<div>
			<div>Realtime Chat Application </div>
			<div>Created with React, Express, Node and Socket.IO </div>
		</div>
    {
      users
        ? (
          <div>
            <h1>People currently chatting:</h1>
            <div className="active-container">
              <h2>
                {users.map(({name}) => (
                  <div key={name} className="active-item">
                    {name} - is online
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
	</div>
);

export default TextContainer;
