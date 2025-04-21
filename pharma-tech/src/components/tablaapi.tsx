import { useEffect, useState } from "react";
import DynamicTable from "./table";

type Column = {
  key: string;
  label: string;
};

type Row = {
  key: string;
  [key: string]: any;
};

type Props = {
  endpoint: string; 
  columns: Column[]; 
  transformData?: (data: any[]) => Row[]; 
};

export default function TablaAPI({ endpoint, columns, transformData }: Props) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(endpoint);
        const data = await res.json();

        const formatted = transformData
          ? transformData(data)
          : data.map((item: any, index: number) => ({
              key: item.id?.toString() || index.toString(),
              ...item,
            }));

        setRows(formatted);
      } catch (err) {
        console.error(err);
        setError("Error cargando los datos.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, transformData]);

  if (loading) return <div>Cargando datos...</div>;
  if (error) return <div>{error}</div>;

  return <DynamicTable columns={columns} rows={rows} />;
}
