import PlantItem from "./PlantItem";

function PlantList({ plants, setPlants, filter }) {

  const isDue = (plant) => {
    if (!plant.lastWatered) return true;

    const last = new Date(plant.lastWatered);
    const today = new Date();

    last.setHours(0,0,0,0);
    today.setHours(0,0,0,0);

    const diffDays = (today - last) / (1000 * 60 * 60 * 24);

    return diffDays >= plant.wateringInterval;
  };

  const filtered = plants.filter((p) => {
    if (filter === "all") return true;
    if (filter === "due") return isDue(p);
    if (filter === "ok") return !isDue(p);
  });

  return (
    <div className="row g-3">
      {filtered.length === 0 ? (
        <p className="text-center text-muted">
          Bu filtrede bitki yok 🌿
        </p>
      ) : (
        filtered.map((plant) => (
          <div className="col-md-6" key={plant.id}>
            <PlantItem plant={plant} setPlants={setPlants} />
          </div>
        ))
      )}
    </div>
  );
}

export default PlantList;