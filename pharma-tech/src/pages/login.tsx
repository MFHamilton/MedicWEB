import React, { useState } from "react";
import axios from "axios";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import bgImage from "../assets/login-background.png";
import logo from "../assets/Logo.png";

export default function Login() {
  const [form, setForm] = useState({ id: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Manejar cambios en los campos
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Manejar envío del formulario
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/api/Login", {
        correo: form.id,
        password: form.password,
      });

      // Suponiendo que tu backend devuelve usuario y token
      const { user, token } = response.data;

      // Guardar datos en localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      console.log("✅ Login exitoso:", user);
      window.location.href = "/";
      // Redirigir o navegar (si usás React Router)
      // navigate("/dashboard");

    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        setError("Correo o contraseña incorrectos.");
      } else {
        setError("Correo o contraseña incorrectos.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Panel izquierdo con blur */}
      <div className="w-full md:w-1/2 bg-white/70 backdrop-blur-lg p-10 flex flex-col justify-center">
        {/* Logo */}
        <div className="mb-10 text-center flex flex-col items-center gap-2">
          <img src={logo} alt="Logo" className="w-80 h-30" />
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleLogin}
          className="space-y-5 max-w-sm mx-auto w-full"
        >
          <Input
            name="id"
            label="ID"
            variant="flat"
            value={form.id}
            onChange={handleChange}
          />
          <Input
            name="password"
            label="Contraseña"
            type="password"
            variant="flat"
            value={form.password}
            onChange={handleChange}
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="text-right text-sm text-gray-600">
            <a href="#" className="hover:underline">
              Olvidé mi contraseña
            </a>
          </div>

          <Button
            type="submit"
            variant="flat"
            disabled={loading}
            className="w-full bg-blue-900 text-white font-semibold rounded-md py-2"
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </Button>
        </form>
      </div>

      {/* Fondo derecho sin blur */}
      <div className="hidden md:block md:w-1/2" />
    </div>
  );
}
