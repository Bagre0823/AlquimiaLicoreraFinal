
import { useEffect, useState } from "react";
import PersonasList from "./PersonasList";

const PersonasContainer = () => {

  // ================= ESTADOS =================

  const [personas, setPersonas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // ================= OBTENER PERSONAS DESDE JSON =================

  useEffect(() => {

    fetch("/datos/Personas.json")
      .then((res) => {

        if (!res.ok) {
          throw new Error("No se pudieron cargar las personas");
        }

        return res.json();
      })

      .then((datos) => setPersonas(datos))

      .catch((error) => setError(error.message))

      .finally(() => setCargando(false));

  }, []);

  // ================= ESTADOS DE CARGA Y ERROR =================

  if (cargando) {
    return <p className="estado-carga">Cargando personas...</p>;
  }

  if (error) {
    return <p className="estado-error">{error}</p>;
  }

  // ================= LISTADO DE PERSONAS =================

  return <PersonasList personas={personas} />;
};

export default PersonasContainer;
