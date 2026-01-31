import React, { useEffect, useState } from "react";
import api from "../api.js";

const VisitorsSection = () => {
  const [visitors, setVisitors] = useState([]);
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    visitingStudent: "",
    purpose: ""
  });

  const loadData = async () => {
    const [visitorsRes, studentsRes] = await Promise.all([
      api.get("/visitors"),
      api.get("/students")
    ]);
    setVisitors(visitorsRes.data);
    setStudents(studentsRes.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/visitors", form);
    setForm({ name: "", phone: "", visitingStudent: "", purpose: "" });
    await loadData();
  };

  const markExit = async (id) => {
    await api.patch(`/visitors/${id}/exit`);
    await loadData();
  };

  return (
    <div className="section">
      <h2>Visitors</h2>
      <div className="section-grid">
        <div className="card">
          <h3>Log visitor</h3>
          <form className="form" onSubmit={handleSubmit}>
            <label>
              Name
              <input name="name" value={form.name} onChange={handleChange} required />
            </label>
            <label>
              Phone
              <input name="phone" value={form.phone} onChange={handleChange} />
            </label>
            <label>
              Visiting student
              <select
                name="visitingStudent"
                value={form.visitingStudent}
                onChange={handleChange}
              >
                <option value="">Select student</option>
                {students.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Purpose
              <input name="purpose" value={form.purpose} onChange={handleChange} />
            </label>
            <button type="submit">Save</button>
          </form>
        </div>
        <div className="card">
          <h3>Visitors log</h3>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Student</th>
                  <th>In</th>
                  <th>Out</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {visitors.map((v) => (
                  <tr key={v._id}>
                    <td>{v.name}</td>
                    <td>{v.visitingStudent?.name || "-"}</td>
                    <td>{new Date(v.inTime).toLocaleString()}</td>
                    <td>{v.outTime ? new Date(v.outTime).toLocaleString() : "In hostel"}</td>
                    <td>
                      {!v.outTime && <button onClick={() => markExit(v._id)}>Mark exit</button>}
                    </td>
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

export default VisitorsSection;




