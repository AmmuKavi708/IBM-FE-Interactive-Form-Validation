import { useState } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    let errs = {};
    if (!form.name) errs.name = "Name is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    if (form.password.length < 6) errs.password = "Min 6 characters";
    if (form.password !== form.confirm) errs.confirm = "Passwords do not match";
    return errs;
  };

  const checkStrength = (password) => {
    if (password.length < 6) return "Weak";
    if (/^(?=.*[0-9])(?=.*[A-Z])/.test(password)) return "Strong";
    return "Medium";
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      alert("Form submitted successfully ✅");
    }
  };

  const handleReset = () => {
    setForm({ name: "", email: "", password: "", confirm: "" });
    setErrors({});
  };

  return (
    <div className="container">
      <h2>Interactive Form Validation</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
        <p className="error">{errors.name}</p>

        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
        <p className="error">{errors.email}</p>

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />
          <button
            type="button"
            className="toggle-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>
        <p className="error">{errors.password}</p>
        {form.password && <p>Password Strength: {checkStrength(form.password)}</p>}

        <input
          type="password"
          name="confirm"
          placeholder="Confirm Password"
          value={form.confirm}
          onChange={handleChange}
        />
        <p className="error">{errors.confirm}</p>

        <button type="submit">Register</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </form>
    </div>
  );
}

export default App;
