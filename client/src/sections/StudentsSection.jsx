import React, { useEffect, useState } from "react";
import api from "../api.js";

const StudentsSection = () => {
  const [students, setStudents] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    guardianName: "",
    guardianPhone: "",
    address: "",
    roomId: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      const [studentsRes, roomsRes] = await Promise.all([
        api.get("/students"),
        api.get("/rooms")
      ]);
      setStudents(studentsRes.data);
      setRooms(roomsRes.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post("/students", form);
      setForm({
        name: "",
        email: "",
        phone: "",
        guardianName: "",
        guardianPhone: "",
        address: "",
        roomId: ""
      });
      await loadData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add student");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="section">
      <h2>Students & Room Allocation</h2>
      <div className="section-grid">
        <div className="card">
          <h3>Add student</h3>
          <form className="form" onSubmit={handleSubmit}>
            <div className="grid-2">
              <label>
                Name
                <input name="name" value={form.name} onChange={handleChange} required />
              </label>
              <label>
                Email
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div className="grid-2">
              <label>
                Phone
                <input name="phone" value={form.phone} onChange={handleChange} required />
              </label>
              <label>
                Guardian name
                <input
                  name="guardianName"
                  value={form.guardianName}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="grid-2">
              <label>
                Guardian phone
                <input
                  name="guardianPhone"
                  value={form.guardianPhone}
                  onChange={handleChange}
                />
              </label>
              <label>
                Room
                <select name="roomId" value={form.roomId} onChange={handleChange} required>
                  <option value="">Select room</option>
                  {rooms.map((r) => (
                    <option key={r._id} value={r._id}>
                      {r.roomNumber} (vacant: {r.vacancy})
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <label>
              Address
              <textarea name="address" value={form.address} onChange={handleChange} />
            </label>
            {error && <div className="error-text">{error}</div>}
            <button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
          </form>
        </div>
        <div className="card">
          <h3>Student list</h3>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Room</th>
                  <th>Phone</th>
                  <th>Check-in</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s._id}>
                    <td>{s.name}</td>
                    <td>{s.room?.roomNumber || "-"}</td>
                    <td>{s.phone}</td>
                    <td>{new Date(s.checkInDate).toLocaleDateString()}</td>
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

export default StudentsSection;




