import { useState } from "react";
import PlantInterface from "../interfaces/PlantInterface";

function PlantForm({ setPlants }) {
  const [name, setName] = useState("");
  const [interval, setIntervalValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (interval <= 0) {
      alert("Sulama aralığı 1 günden küçük olamaz!");
      return;
    }

    const newPlant = PlantInterface();
    newPlant.name = name;
    newPlant.wateringInterval = Number(interval);
      
    setPlants((prev) => [...prev, newPlant]);

    setName("");
    setIntervalValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-3 rounded-4 shadow-sm bg-white bg-opacity-75">
      <div className="row g-2">

        <div className="col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Bitki adı"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="col-md-4">
          <input
            type="number"
            min="1" 
            className="form-control"
            placeholder="Sulama (gün)"
            value={interval}
            onChange={(e) => setIntervalValue(e.target.value)}
            required
          />
        </div>

        <div className="col-md-3">
          <button className="btn btn-success w-100">
            Ekle
          </button>
        </div>

      </div>
    </form>
  );
}

export default PlantForm;