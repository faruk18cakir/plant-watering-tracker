import { useState, useEffect } from "react";
import PlantForm from "../components/PlantForm";
import PlantList from "../components/PlantList";

function Home() {

  const [plants, setPlants] = useState(() => {
    const stored = localStorage.getItem("plants");
    return stored ? JSON.parse(stored) : [];
  });

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("plants", JSON.stringify(plants));
  }, [plants]);

  const getStats = () => {
    let due = 0;
    let ok = 0;

    plants.forEach((p) => {

      if (!p.lastWatered) {
        due++;
        return;
      }

      const last = new Date(p.lastWatered);
      const today = new Date();

      last.setHours(0,0,0,0);
      today.setHours(0,0,0,0);

      const diffDays =
        (today - last) / (1000 * 60 * 60 * 24);

      if (diffDays >= p.wateringInterval) due++;
      else ok++;
    });

    return {
      total: plants.length,
      due,
      ok
    };
  };

  const stats = getStats();

  return (
    <div className="container py-4">

      <h1 className="text-center mb-4 fw-bold">
        🌱 Plant Tracker
      </h1>

      {/* DASHBOARD */}
      <div className="row g-3 mb-4">

        <div className="col-md-4">
          <div className="card border-0 rounded-4 shadow-sm bg-white bg-opacity-75 p-3 text-center">
            <h6>Toplam Bitki</h6>
            <h3>{stats.total}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 rounded-4 shadow-sm bg-white bg-opacity-75 p-3 text-center">
            <h6>Sulanacak</h6>
            <h3>{stats.due}</h3>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card border-0 rounded-4 shadow-sm bg-white bg-opacity-75 p-3 text-center">
            <h6>Sağlıklı</h6>
            <h3>{stats.ok}</h3>
          </div>
        </div>

      </div>

      <PlantForm setPlants={setPlants} />

      {/* FILTER */}
      <div className="d-flex justify-content-center gap-2 mb-4">

        <button
          className={`btn btn-sm px-3 rounded-pill shadow-sm ${
            filter === "all"
              ? "btn-dark"
              : "btn-dark opacity-50"
          }`}
          onClick={() => setFilter("all")}
        >
          Hepsi
        </button>

        <button
          className={`btn btn-sm px-3 rounded-pill shadow-sm ${
            filter === "due"
              ? "btn-danger"
              : "btn-danger opacity-50"
          }`}
          onClick={() => setFilter("due")}
        >
          Sulanacak
        </button>

        <button
          className={`btn btn-sm px-3 rounded-pill shadow-sm ${
            filter === "ok"
              ? "btn-success"
              : "btn-success opacity-50"
          }`}
          onClick={() => setFilter("ok")}
        >
          Sağlıklı
        </button>

      </div>

      <PlantList
        plants={plants}
        setPlants={setPlants}
        filter={filter}
      />

    </div>
  );
}

export default Home;