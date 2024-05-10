// src/FindUserId.js
import React, { useState } from "react";
import axios from "axios";

const FindUserId = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async event => {
    event.preventDefault();
    setError("");
    setUserId(null);

    try {
      const response = await axios.get("http://localhost:3001/users", {
        params: { name, email },
      });

      const user = response.data.find(user => user.name === name && user.email === email);

      if (user) {
        setUserId(user.userId);
      } else {
        setError("User not found");
      }
    } catch (error) {
      setError("Error fetching user data");
    }
  };

  return (
    <div>
      <h1>Find User ID</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <button type="submit">Find ID</button>
      </form>
      {userId && <p>User ID: {userId}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default FindUserId;
