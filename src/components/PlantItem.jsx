import { useState } from "react";

function PlantItem({ plant, setPlants }) {

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(plant.name);
  const [editInterval, setEditInterval] = useState(plant.wateringInterval);

  const [undo, setUndo] = useState(null);

  const handleDelete = () => {
    setPlants((prev) => prev.filter((p) => p.id !== plant.id));
  };

  const handleWater = () => {
    const today = new Date().toISOString().split("T")[0];

    const previousDate = plant.lastWatered;

    setPlants((prev) =>
      prev.map((p) =>
        p.id === plant.id
          ? { ...p, lastWatered: today }
          : p
      )
    );

    const timeoutId = setTimeout(() => {
      setUndo(null);
    }, 5000);

    setUndo({
      previousDate,
      timeoutId,
    });
  };

  const handleUndo = () => {
    if (!undo) return;

    clearTimeout(undo.timeoutId);

    setPlants((prev) =>
      prev.map((p) =>
        p.id === plant.id
          ? { ...p, lastWatered: undo.previousDate }
          : p
      )
    );

    setUndo(null);
  };

  const handleDateChange = (e) => {
    const value = e.target.value;

    setPlants((prev) =>
      prev.map((p) =>
        p.id === plant.id
          ? { ...p, lastWatered: value }
          : p
      )
    );
  };

  const handleSave = () => {
    setPlants((prev) =>
      prev.map((p) =>
        p.id === plant.id
          ? {
              ...p,
              name: editName,
              wateringInterval: Number(editInterval),
            }
          : p
      )
    );

    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditName(plant.name);
    setEditInterval(plant.wateringInterval);
    setIsEditing(false);
  };

  // 📊 DATE CALC
  const getDateInfo = () => {
    if (!plant.lastWatered) {
      return {
        remainingDays: null,
        nextDate: null,
        isDue: false,
        progress: 0,
      };
    }

    const last = new Date(plant.lastWatered);
    const today = new Date();

    last.setHours(0,0,0,0);
    today.setHours(0,0,0,0);

    const diffDays = (today - last) / (1000 * 60 * 60 * 24);

    const progress = Math.min(
      100,
      Math.max(0, (diffDays / plant.wateringInterval) * 100)
    );

    const next = new Date(last);
    next.setDate(last.getDate() + plant.wateringInterval);

    const remaining = plant.wateringInterval - diffDays;

    return {
      remainingDays: Math.max(0, Math.ceil(remaining)),
      nextDate: next.toISOString().split("T")[0],
      isDue: remaining <= 0,
      progress,
    };
  };

  const { remainingDays, nextDate, isDue, progress } = getDateInfo();

  return (
    <div className={`card mb-3 border-0 rounded-4 shadow-sm ${isDue ? "border-danger border-2" : ""}`}>
      <div className="card-body">

        {/* EDIT MODE */}
        {isEditing ? (
          <div className="row g-2">
            <div className="col-md-4">
              <input
                className="form-control"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <input
                type="number"
                min="1"
                className="form-control"
                value={editInterval}
                onChange={(e) => setEditInterval(e.target.value)}
              />
            </div>

            <div className="col-md-5 d-flex gap-2">
              <button className="btn btn-success" onClick={handleSave}>
                Kaydet
              </button>

              <button className="btn btn-secondary" onClick={handleCancel}>
                İptal
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* HEADER */}
            <div className="d-flex justify-content-between">

              <div>
                <h5 className="fw-bold">
                  {plant.name}
                  {isDue && (
                    <span className="badge rounded-pill bg-danger ms-2">
                      Sulama Gerekli!
                    </span>
                  )}
                </h5>

                <small className="text-muted">
                  Bitki {plant.wateringInterval} günde bir sulanmalı!
                </small>

                <div className="mt-2">

                  {/* PROGRESS BAR 🔥 */}
                  <div className="mb-2">
                    <div className="progress" style={{ height: "8px" }}>
                      <div
                        className={`progress-bar ${
                          isDue ? "bg-danger" : "bg-success"
                        }`}
                        role="progressbar"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <small className="text-muted">
                      Azalan Su Seviyesi: %{Math.round(progress)}
                    </small>
                  </div>

                  <div>
                    <span className="badge text-dark" 
                          style={{ 
                            backgroundColor: "#d7f6f9", 
                            border: "1px solid #ddd" }}>
                      📅 Son Sulama: {plant.lastWatered || "Yok"}
                    </span>
                  </div>

                  <div className="mt-1">
                    <span className="badge"
                        style={{
                          backgroundColor: "#e8f5e9",
                          color: "#2c4f2d",
                          border: "1px solid #c8e6c9"
                        }}>
                      ⏭️ Sonraki Sulama: {nextDate || "Belirsiz"}
                    </span>
                  </div>

                  {remainingDays !== null && (
                    <div className="mt-1">
                      <span className={`badge ${isDue ? "bg-danger" : "bg-success"}`}>
                        {isDue
                          ? "Geçti"
                          : `${remainingDays} gün kaldı`}
                      </span>
                    </div>
                  )}

                </div>
              </div>

              {/* ACTIONS */}
              <div className="d-flex flex-column gap-2">

                <button
                  className="btn btn-custom-warning btn-sm rounded-3 shadow-sm"
                  onClick={() => setIsEditing(true)}
                >
                  ✏️
                </button>

                <button
                  className="btn btn-success btn-sm rounded-3 shadow-sm"
                  onClick={handleWater}
                >
                  💧
                </button>

                <button
                  className="btn btn-danger btn-sm rounded-3 shadow-sm"
                  onClick={handleDelete}
                >
                  🗑
                </button>

              </div>

            </div>

            {/* DATE INPUT */}
            <div className="mt-3">
              <input
                type="date"
                className="form-control"
                value={plant.lastWatered || ""}
                onChange={handleDateChange}
              />

              <div className="form-text">
                Son sulama tarihini güncelleyebilirsin.
              </div>
            </div>

            {/* UNDO */}
            {undo && (
              <div className="alert alert-warning mt-3 d-flex justify-content-between align-items-center">
                <span>Değişiklik yapıldı</span>

                <button
                  className="btn btn-sm btn-dark"
                  onClick={handleUndo}
                >
                  Geri Al
                </button>
              </div>
            )}

          </>
        )}

      </div>
    </div>
  );
}

export default PlantItem;