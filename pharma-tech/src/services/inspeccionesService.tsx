import axios from "axios";

const API = "http://localhost:3000/api/Inspeccion"; 

export const obtenerInspecciones = async () => {
  const response = await axios.get(API);
  return response.data;
};
