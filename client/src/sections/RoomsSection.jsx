import React, { useEffect, useState } from "react";
import api from "../api.js";

const RoomsSection = ({ onUpdated }) => {
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({
    roomNumber: "",
    capacity: 1,
    type: "hostel"
  });

  const loadRooms = async () => {
    const res = await api.get("/rooms");
    setRooms(res.data);
  };

  useEffect(() => {
    loadRooms();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === "capacity" ? Number(value) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/rooms", form);
    setForm({ roomNumber: "", capacity: 1, type: "hostel" });
    await loadRooms();
    if (onUpdated) onUpdated();
  };

  return (
    <div className="section">
      <h2>Rooms & Vacancy</h2>
      <div className="section-grid">
        <div className="card">
          <h3>Add room</h3>
          <form className="form" onSubmit={handleSubmit}>
            <div className="grid-2">
              <label>
                Room number
                <input
                  name="roomNumber"
                  value={form.roomNumber}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Capacity
                <input
                  name="capacity"
                  type="number"
                  min={1}
                  value={form.capacity}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <label>
              Type
              <select name="type" value={form.type} onChange={handleChange}>
                <option value="hostel">Hostel</option>
                <option value="pg">PG</option>
              </select>
            </label>
            <button type="submit">Save</button>
          </form>
        </div>
        <div className="card">
          <h3>Rooms list</h3>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Room</th>
                  <th>Type</th>
                  <th>Capacity</th>
                  <th>Occupied</th>
                  <th>Vacancy</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((r) => (
                  <tr key={r._id}>
                    <td>{r.roomNumber}</td>
                    <td>{r.type}</td>
                    <td>{r.capacity}</td>
                    <td>{r.occupied}</td>
                    <td>{r.vacancy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomsSection;




