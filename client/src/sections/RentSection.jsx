import React, { useEffect, useState } from "react";
import api from "../api.js";

const RentSection = () => {
  const [students, setStudents] = useState([]);
  const [rents, setRents] = useState([]);
  const [form, setForm] = useState({
    student: "",
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    amount: 0,
    status: "paid"
  });

  const loadData = async () => {
    const [studentsRes, rentsRes] = await Promise.all([
      api.get("/students"),
      api.get("/rent", { params: { month: form.month, year: form.year } })
    ]);
    setStudents(studentsRes.data);
    setRents(rentsRes.data);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "month" || name === "year" || name === "amount" ? Number(value) : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/rent", form);
    await loadData();
  };

  return (
    <div className="section">
      <h2>Rent & Payments</h2>
      <div className="section-grid">
        <div className="card">
          <h3>Record payment</h3>
          <form className="form" onSubmit={handleSubmit}>
            <label>
              Student
              <select name="student" value={form.student} onChange={handleChange} required>
                <option value="">Select student</option>
                {students.map((s) => (
                  <option key={s._id} value={s._id}>
                    {s.name} ({s.room?.roomNumber})
                  </option>
                ))}
              </select>
            </label>
            <div className="grid-3">
              <label>
                Month
                <input
                  name="month"
                  type="number"
                  min={1}
                  max={12}
                  value={form.month}
                  onChange={handleChange}
                />
              </label>
              <label>
                Year
                <input
                  name="year"
                  type="number"
                  value={form.year}
                  onChange={handleChange}
                />
              </label>
              <label>
                Amount
                <input
                  name="amount"
                  type="number"
                  value={form.amount}
                  onChange={handleChange}
                />
              </label>
            </div>
            <label>
              Status
              <select name="status" value={form.status} onChange={handleChange}>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
            </label>
            <button type="submit">Save</button>
          </form>
        </div>
        <div className="card">
          <h3>Payments for month</h3>
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Room</th>
                  <th>Month</th>
                  <th>Year</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {rents.map((r) => (
                  <tr key={r._id}>
                    <td>{r.student?.name}</td>
                    <td>{r.student?.room?.roomNumber}</td>
                    <td>{r.month}</td>
                    <td>{r.year}</td>
                    <td>{r.amount}</td>
                    <td>{r.status}</td>
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

export default RentSection;




