import React, { useState, useEffect } from "react";
import Register from "./Register";
import Login from "./Login";
import "../../styles/access.css";
function Index() {
  const [accessForm, setAccessForm] = useState(false);
  const queryParams = new URLSearchParams(window.location.search);
  useEffect(() => {
    setAccessForm(queryParams.get("form") === "1");
  }, []);

  return (
    <div>
      {accessForm ? (
        <Register setAccessForm={setAccessForm} />
      ) : (
        <Login setAccessForm={setAccessForm} />
      )}
    </div>
  );
}

export default Index;
