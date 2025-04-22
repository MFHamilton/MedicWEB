// pages/index.tsx
import React, { useEffect, useState } from "react";
import DefaultLayout from "@/layouts/default";
import {
  Card, CardHeader, CardBody, Button, Divider, Input
} from "@heroui/react";
import { Link } from "react-router-dom";
import {
  Stethoscope, Warehouse, ShieldCheck
} from "lucide-react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell
} from "recharts";
import axios from "axios";

export default function HomePage() {
  const [ensayos, setEnsayos] = useState([]);
  const [tipoEventos, setTipoEventos] = useState([]);
  const [medIndex, setMedIndex] = useState(0);
  const [provIndex, setProvIndex] = useState(0);
  const [inspIndex, setInspIndex] = useState(0);
  interface Medicamento {
    med_nombre: string;
    tipom_nombre: string;
    pro_nombre: string;
  }

  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([]);
  interface Proveedor {
    pro_ubicacion: string;
    pro_historial: string;
    pro_estado: number;
  }

  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [inspecciones, setInspecciones] = useState([]);
  const COLORS = ["#0ea5e9", "#1d4ed8"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ens, tipoEvt, meds, provs, insps] = await Promise.all([
          axios.get("http://localhost:3000/api/EnsayoClinico"),
          axios.get("http://localhost:3000/api/TipoEvento"),
          axios.get("http://localhost:3000/api/Meds"),
          axios.get("http://localhost:3000/api/Provd"),
          axios.get("http://localhost:3000/api/Inspeccion")
        ]);
        setEnsayos(ens.data);
        setTipoEventos(tipoEvt.data);
        setMedicamentos(meds.data);
        setProveedores(provs.data);
        setInspecciones(insps.data);
      } catch (err) {
        console.error("Error al cargar datos:", err);
      }
    };
    fetchData();
  }, []);

  const NumericInput = ({ value, onChange, title }) => (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{title}</label>
      <Input
        type="number"
        min={0}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );

  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {/* Medicamentos */}
        <Card className="flex flex-col justify-between">
          <CardHeader className="flex items-center gap-2">
            <Stethoscope className="text-primary w-6 h-6" />
            <h2 className="text-lg font-semibold">Medicamentos</h2>
          </CardHeader>
          
          <CardBody className="flex flex-col justify-between h-full">
            <div className="space-y-2">
              <NumericInput value={medIndex} onChange={setMedIndex} title="Medicamento" />
              <input readOnly value={medicamentos[medIndex]?.med_nombre || ""} placeholder="Nombre" className="w-full border px-2 py-1 rounded" />
              <input readOnly value={medicamentos[medIndex]?.tipom_nombre || ""} placeholder="Tipo" className="w-full border px-2 py-1 rounded" />
              <input readOnly value={medicamentos[medIndex]?.pro_nombre || ""} placeholder="Proveedor" className="w-full border px-2 py-1 rounded" />
            </div>
            <div className="mt-auto flex justify-end pt-4">
              <Link to="/medicamentos">
                <Button size="sm" color="primary" variant="shadow" radius="sm">
                  Ir a medicamentos
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>

        {/* Proveedores */}
        <Card className="flex flex-col justify-between">
          <CardHeader className="flex items-center gap-2">
            <Warehouse className="text-primary w-6 h-6" />
            <h2 className="text-lg font-semibold">Proveedores</h2>
          </CardHeader>
          
          <CardBody className="flex flex-col justify-between h-full">
            <div className="space-y-2">
              <NumericInput value={provIndex} onChange={setProvIndex} title="Proveedor" />
              <input readOnly value={proveedores[provIndex]?.pro_ubicacion || ""} placeholder="Ubicación" className="w-full border px-2 py-1 rounded" />
              <input readOnly value={proveedores[provIndex]?.pro_historial || ""} placeholder="Historial" className="w-full border px-2 py-1 rounded" />
              <input readOnly value={proveedores[provIndex]?.pro_estado === 1 ? "Activo" : proveedores[provIndex]?.pro_estado === 0 ? "Inactivo" : ""} placeholder="Estado" className="w-full border px-2 py-1 rounded" />
            </div>
            <div className="mt-auto flex justify-end pt-4">
              <Link to="/proveedores">
                <Button size="sm" color="primary" variant="shadow" radius="sm">
                  Ir a proveedores
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>

        {/* Inspecciones */}
        <Card className="flex flex-col justify-between">
          <CardHeader className="flex items-center gap-2">
            <ShieldCheck className="text-primary w-6 h-6" />
            <h2 className="text-lg font-semibold">Inspecciones</h2>
          </CardHeader>
          
          <CardBody className="flex flex-col justify-between h-full">
            <div className="space-y-2">
              <NumericInput value={inspIndex} onChange={setInspIndex} title="Inspección" />
              <input readOnly value={inspecciones[inspIndex]?.ins_fecha || ""} placeholder="Fecha" className="w-full border px-2 py-1 rounded" />
              <input readOnly value={inspecciones[inspIndex]?.ins_requisitos || ""} placeholder="Requisitos" className="w-full border px-2 py-1 rounded" />
              <input readOnly value={inspecciones[inspIndex]?.ins_observaciones || ""} placeholder="Observaciones" className="w-full border px-2 py-1 rounded" />
            </div>
            <div className="mt-auto flex justify-end pt-4">
              <Link to="/inspecciones">
                <Button size="sm" color="primary" variant="shadow" radius="sm">
                  Ir a inspecciones
                </Button>
              </Link>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ensayos por fase */}
        <Card>
          <CardHeader><h3 className="text-lg font-semibold">Ensayos por Fase</h3></CardHeader>
          
          <CardBody>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={Object.entries(ensayos.reduce((acc, cur) => {
                const fase = cur.ens_fase || "Sin Fase";
                acc[fase] = (acc[fase] || 0) + 1;
                return acc;
              }, {})).map(([name, total]) => ({ name, total }))}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#0ea5e9" />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-end mt-4">
              <Link to="/ensayoclinico"><Button color="primary" size="sm" radius="sm" variant="shadow">Ir a Ensayos</Button></Link>
            </div>
          </CardBody>
        </Card>

        {/* Tipos de Evento */}
        <Card>
          <CardHeader><h3 className="text-lg font-semibold">Tipos de Evento</h3></CardHeader>
          
          <CardBody>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={tipoEventos.map(evt => ({ name: evt.nombre_evento, value: 1 }))} cx="50%" cy="50%" outerRadius={100} label dataKey="value">
                  {tipoEventos.map((_, index) => (<Cell key={index} fill={COLORS[index % COLORS.length]} />))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-end mt-4">
              <Link to="/monitoreo"><Button color="primary" size="sm" radius="sm" variant="shadow">Ir a Monitoreo</Button></Link>
            </div>
          </CardBody>
        </Card>
      </div>
    </DefaultLayout>
  );
}
