import { useState } from "react";
import "../App.css"

export default function DynamicForm({ fields, onSubmit }) {
  const [formData, setFormData] = useState({});

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!Object.keys(formData).length) return alert("Fill form");
        onSubmit(formData);
      }}
      className="form"
    >
      {fields.map((field, i) => (
        <div key={i} className="form-group">
          <label>{field.name}</label>

          {field.type === "select" ? (
            <select onChange={(e) => handleChange(field.name, e.target.value)}>
              <option value="">Select</option>
              {field.options.map((o, j) => (
                <option key={j}>{o}</option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          )}
        </div>
      ))}

      <button className="btn">Submit</button>
    </form>
  );
}