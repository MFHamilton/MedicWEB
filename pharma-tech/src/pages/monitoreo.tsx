import React, { useEffect, useState } from "react";
import axios from "axios";
import DefaultLayout from "@/layouts/default";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  CalendarDays,
  PackageCheck,
  ClipboardList,
} from "lucide-react";
import MonitoreoMedDropdown from "@/components/monitoreo-med-drop";

interface Postcomercializacion {
  ID_Postcomercializacion: number;
  id_med: number;
  ID_Lote: number;
  ID_Evento: number;
  ID_Inspeccion: number;
  Fecha: string;
  Observaciones: string;
  Estado: string;
}

const COLORS = ["#070357", "#E11D48"];

export default function Monitoreo() {
  const [data, setData] = useState<Postcomercializacion[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/postcomercializacion");
      console.log(" Datos recibidos:", res.data);
      setData(res.data);
    } catch (err) {
      console.error("Error al obtener datos:", err);
    }
  };

  const total = data.length;
  const activos = data.filter((item) => item.Estado === "Activo").length;
  const inactivos = data.filter((item) => item.Estado === "Inactivo").length;
  const eventos = new Set(data.map((item) => item.ID_Evento)).size;
  const lotes = new Set(data.map((item) => item.ID_Lote)).size;
  const medicamentos = new Set(data.map((item) => item.id_med)).size;
  const ultimaFecha =
    data
      .map((item) => new Date(item.Fecha))
      .sort((a, b) => b.getTime() - a.getTime())[0]
      ?.toLocaleDateString() || "-";

  const estadoData = [
    { name: "Activos", value: activos },
    { name: "Inactivos", value: inactivos },
  ];
//
  const eventosData = Object.entries(
    data.reduce((acc: { [key: number]: number }, curr) => {
      acc[curr.ID_Evento] = (acc[curr.ID_Evento] || 0) + 1;
      return acc;
    }, {})
  ).map(([evento, count]) => ({ evento, count }));

  return (
    <DefaultLayout>
    <h1 className="pb-8 m-20px text-texty text-3xl font-bold">Panel de Monitoreo</h1>
    <div className="bg-surface pb-8 m-50px">

        {/* Dropdown + Botones */}
        <MonitoreoMedDropdown onRefresh={fetchData} />

        {/* Widgets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Widget title="Total de Registros" value={total} icon={<ClipboardList />} />
          <Widget title="Activos" value={activos} icon={<PackageCheck />} />
          <Widget title="Inactivos" value={inactivos} icon={<PackageCheck />} />
          <Widget title="Eventos Únicos" value={eventos} icon={<CalendarDays />} />
          <Widget title="Lotes Únicos" value={lotes} icon={<ClipboardList />} />
          <Widget title="Medicamentos Monitoreados" value={medicamentos} icon={<ClipboardList />} />
          <Widget title="Última Fecha de Registro" value={ultimaFecha} icon={<CalendarDays />} />
        </div>

        {/* Gráficas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
          {/* Pastel */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Distribución por Estado</h2>
            <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                    <Pie
                    data={
                        estadoData.length > 0 && (activos + inactivos > 0)
                        ? estadoData
                        : [{ name: "Sin datos", value: 1 }]
                    }
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                    >
                    {(estadoData.length > 0 && (activos + inactivos > 0)
                        ? estadoData
                        : [{ name: "Sin datos", value: 1 }]
                    ).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />

                    ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Barras */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Registros por Evento</h2>
            {eventosData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={eventosData}>
                  <XAxis dataKey="evento" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#070357" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center text-gray-500 h-[250px] flex items-center justify-center">
                No hay eventos registrados.
              </div>
            )}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

function Widget({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: JSX.Element;
}) {
  return (
    <div className="bg-white p-5 shadow-md rounded-xl hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 cursor-pointer">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
        </div>
        <div className="text-blue-600 bg-blue-100 p-2 rounded-full">{icon}</div>
      </div>
    </div>
  );
}