import { useState, useEffect } from "react";
import config from "./config/appConfig.json";
import DynamicForm from "./components/DynamicForm";
import Login from "./Login";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const entity = config.entities[0];
  const entityName = entity.name;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5001/api/${entityName}`, {
        headers: { Authorization: token },
      });

      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [entityName]);

  const handleAdd = async (formData) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:5001/api/${entityName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setMessage("✅ Data added");
      fetchData();
    }
  };

  const handleCSVUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`http://localhost:5001/upload/${entityName}`, {
      method: "POST",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
      body: formData,
    });

    if (res.ok) {
      setMessage("📂 CSV uploaded");
      fetchData();
    }
  };

  useEffect(() => {
    if (message) {
      const t = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(t);
    }
  }, [message]);

  if (!isLoggedIn) return <Login setIsLoggedIn={setIsLoggedIn} />;

  return (
    <div className="container">

      {/* Navbar */}
      <div className="navbar">
        <h2>{config.appName}</h2>
        <button className="logout-btn" onClick={() => {
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        }}>
          Logout
        </button>
      </div>

      {/* Notification */}
      {message && <div className="alert">{message}</div>}

      <div className="layout">

  {/* LEFT SIDE */}
  <div className="left">
    <div className="card">
      <h3>Upload CSV</h3>
      <input type="file" onChange={handleCSVUpload} />
    </div>

    <div className="card">
      <h3>Add {entity.name}</h3>
      <DynamicForm fields={entity.fields} onSubmit={handleAdd} />
    </div>
  </div>

  {/* RIGHT SIDE */}
  <div className="right">
    <div className="card">
      <h3>Data</h3>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              {entity.fields.map((f, i) => (
                <th key={i}>{f.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={entity.fields.length}>No Data</td>
              </tr>
            ) : (
              data.map((item, i) => (
                <tr key={i}>
                  {entity.fields.map((f, j) => (
                    <td key={j}>{item[f.name]}</td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  </div>

</div>
    </div>
  );
}

export default App;