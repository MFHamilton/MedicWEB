import React, { useState, useEffect } from "react";
import { Button } from "@heroui/button";
import DefaultLayout from "@/layouts/default";
import axios from "axios";

interface Trial {
  id: string;
  lote: string;
  medication: string;
  phase: string;
  population: string;
  result: string;
}

export default function ClinicalTrials() {
  const [trials, setTrials] = useState<Trial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch trials data from the API
  useEffect(() => {
    axios
      .get("") // Aqui va la URL de la API donde se sacara la data 
      .then((response) => {
        setTrials(response.data); 
        setLoading(false);
      })
      .catch((error) => {
        setError("Error al obtener los datos de los ensayos clínicos.");
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-red">
      <DefaultLayout>
        <h1 className="pb-8 m-20px text-texty text-3xl font-bold">
          Ensayo Clínicos
        </h1>

        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="bg-zinc-50 pb-8 m-50px">
            <div className="flex w-full md:flex-nowrap gap-4">
              <Button className="mt-5 ml-5 mr-5 self-center hover:bg-blue-500" color="primary">
                Buscar
              </Button>
              <Button className="mt-5 ml-5 mr-5 self-center hover:bg-blue-500" color="primary">
                Nuevo ensayo
              </Button>
            </div>

            <div className="mt-5">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border px-4 py-2">ID</th>
                    <th className="border px-4 py-2">Lote</th>
                    <th className="border px-4 py-2">Medicamento</th>
                    <th className="border px-4 py-2">Fase</th>
                    <th className="border px-4 py-2">Población</th>
                    <th className="border px-4 py-2">Resultados</th>
                    <th className="border px-4 py-2">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {trials.map((trial, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{trial.id}</td>
                      <td className="border px-4 py-2">{trial.lote}</td>
                      <td className="border px-4 py-2">{trial.medication}</td>
                      <td className="border px-4 py-2">{trial.phase}</td>
                      <td className="border px-4 py-2">{trial.population}</td>
                      <td className="border px-4 py-2">{trial.result}</td>
                      <td className="border px-4 py-2">
                        <Button className="hover:bg-green-500" color="success">
                          Ver
                        </Button>
                        <Button className="hover:bg-yellow-500 ml-2" color="warning">
                          Editar
                        </Button>
                        <Button className="hover:bg-red-500 ml-2" color="danger">
                          Eliminar
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </DefaultLayout>
    </div>
  );
}
