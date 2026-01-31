import React, { useEffect, useState } from "react";
import api from "../api.js";

const NotificationsSection = () => {
  const [notifications, setNotifications] = useState([]);
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    message: "",
    audience: "all",
    student: ""
  });

  const loadData = async () => {
    const [notifRes, studentsRes] = await Promise.all([
      api.get("/notifications"),
      api.get("/students")
    ]);
    setNotifications(notifRes.data);
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
    await api.post("/notifications", form);
    setForm({ title: "", message: "", audience: "all", student: "" });
    await loadData();
  };

  const markRead = async (id) => {
    await api.patch(`/notifications/${id}/read`);
    await loadData();
  };

  return (
    <div className="section">
      <h2>Notifications</h2>
      <div className="section-grid">
        <div className="card">
          <h3>Send notice</h3>
          <form className="form" onSubmit={handleSubmit}>
            <label>
              Title
              <input name="title" value={form.title} onChange={handleChange} required />
            </label>
            <label>
              Message
              <textarea name="message" value={form.message} onChange={handleChange} required />
            </label>
            <label>
              Audience
              <select name="audience" value={form.audience} onChange={handleChange}>
                <option value="all">All students</option>
                <option value="single">Single student</option>
              </select>
            </label>
            {form.audience === "single" && (
              <label>
                Student
                <select name="student" value={form.student} onChange={handleChange} required>
                  <option value="">Select student</option>
                  {students.map((s) => (
                    <option key={s._id} value={s._id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <button type="submit">Send</button>
          </form>
        </div>
        <div className="card">
          <h3>Recent notifications</h3>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Audience</th>
                  <th>Student</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {notifications.map((n) => (
                  <tr key={n._id}>
                    <td>{n.title}</td>
                    <td>{n.audience}</td>
                    <td>{n.student?.name || "-"}</td>
                    <td>{n.isRead ? "Read" : "Unread"}</td>
                    <td>{new Date(n.createdAt).toLocaleString()}</td>
                    <td>
                      {!n.isRead && <button onClick={() => markRead(n._id)}>Mark read</button>}
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

export default NotificationsSection;




