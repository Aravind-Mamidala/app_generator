import { useState } from "react";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = async () => {
    try {
      const url = isSignup
        ? "http://localhost:5001/auth/signup"
        : "http://localhost:5001/auth/login";

      console.log("Calling:", url);

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      console.log("Response:", data); // 🔥 VERY IMPORTANT

      // SIGNUP FLOW
      if (isSignup) {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Signup successful, now login");
          setIsSignup(false);
        }
      }

      // LOGIN FLOW
      else {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setIsLoggedIn(true); // 🔥 THIS IS CRITICAL
        } else {
          alert(data.error || "Login failed");
        }
      }

    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>{isSignup ? "Signup" : "Login"}</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>
        {isSignup ? "Signup" : "Login"}
      </button>

      <br /><br />

      <p
        style={{ cursor: "pointer", color: "blue" }}
        onClick={() => setIsSignup(!isSignup)}
      >
        {isSignup
          ? "Already have account? Login"
          : "New user? Signup"}
      </p>
    </div>
  );
}

export default Login;