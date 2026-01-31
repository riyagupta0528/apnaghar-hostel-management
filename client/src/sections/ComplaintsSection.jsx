import React, { useEffect, useState } from "react";
import api from "../api.js";

const ComplaintsSection = () => {
  const [complaints, setComplaints] = useState([]);
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    student: "",
    title: "",
    description: "",
    priority: "medium"
  });

  const loadData = async () => {
    const [complaintsRes, studentsRes] = await Promise.all([
      api.get("/complaints"),
      api.get("/students")
    ]);
    setComplaints(complaintsRes.data);
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
    await api.post("/complaints", form);
    setForm({ student: "", title: "", description: "", priority: "medium" });
    await loadData();
  };

  const updateStatus = async (id, status) => {
    await api.patch(`/complaints/${id}`, { status });
    await loadData();
  };

  return (
    <div className="section">
      <h2>Complaints</h2>
      <div className="section-grid">
        <div className="card">
          <h3>Log complaint</h3>
          <form className="form" onSubmit={handleSubmit}>
            <label>
              Student (optional)
              <select name="student" value={form.student} onChange={handleChange}>
                <option value="">General</option>
                {students.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Title
              <input name="title" value={form.title} onChange={handleChange} required />
            </label>
            <label>
              Description
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
              />
            </label>
            <label>
              Priority
              <select name="priority" value={form.priority} onChange={handleChange}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
            <button type="submit">Save</button>
          </form>
        </div>
        <div className="card">
          <h3>Complaints list</h3>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Student</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((c) => (
                  <tr key={c._id}>
                    <td>{c.title}</td>
                    <td>{c.student?.name || "-"}</td>
                    <td>{c.priority}</td>
                    <td>{c.status}</td>
                    <td>
                      <div className="btn-row">
                        <button onClick={() => updateStatus(c._id, "in_progress")}>
                          In progress
                        </button>
                        <button onClick={() => updateStatus(c._id, "resolved")}>Resolved</button>
                      </div>
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

export default ComplaintsSection;




