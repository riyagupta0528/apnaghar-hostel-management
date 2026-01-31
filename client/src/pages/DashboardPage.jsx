import React, { useEffect, useState } from "react";
import api from "../api.js";
import StudentsSection from "../sections/StudentsSection.jsx";
import RoomsSection from "../sections/RoomsSection.jsx";
import RentSection from "../sections/RentSection.jsx";
import ComplaintsSection from "../sections/ComplaintsSection.jsx";
import VisitorsSection from "../sections/VisitorsSection.jsx";
import NotificationsSection from "../sections/NotificationsSection.jsx";

const DashboardPage = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [vacancyStats, setVacancyStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const adminName = localStorage.getItem("adminName") || "Admin";

  const fetchVacancy = async () => {
    setLoading(true);
    try {
      const res = await api.get("/students/stats/vacancy");
      setVacancyStats(res.data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVacancy();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case "students":
        return <StudentsSection />;
      case "rooms":
        return <RoomsSection onUpdated={fetchVacancy} />;
      case "rent":
        return <RentSection />;
      case "complaints":
        return <ComplaintsSection />;
      case "visitors":
        return <VisitorsSection />;
      case "notifications":
        return <NotificationsSection />;
      default:
        return (
          <div className="overview-grid">
            <div className="card">
              <h3>Vacancy status</h3>
              {loading && <p>Loading...</p>}
              {vacancyStats && (
                <ul>
                  <li>Total rooms: {vacancyStats.totalRooms}</li>
                  <li>Total beds: {vacancyStats.totalBeds}</li>
                  <li>Occupied beds: {vacancyStats.occupiedBeds}</li>
                  <li>Vacant beds: {vacancyStats.vacantBeds}</li>
                </ul>
              )}
            </div>
            <div className="card">
              <h3>Quick actions</h3>
              <button onClick={() => setActiveTab("students")}>Add student & allocate room</button>
              <button onClick={() => setActiveTab("rent")}>Record payment</button>
              <button onClick={() => setActiveTab("complaints")}>View complaints</button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="dashboard">
      <header className="topbar">
        <div>
          <h1 style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <img
              src="/apnaghar-icon.svg"
              alt="ApnaGhar logo"
              style={{ width: 28, height: 28, borderRadius: "999px" }}
            />
            ApnaGhar
          </h1>
          <div className="topbar-subtitle">Welcome, {adminName}</div>
        </div>
        <button className="ghost" onClick={onLogout}>
          Logout
        </button>
      </header>
      <div className="layout">
        <nav className="sidebar">
          <button
            className={activeTab === "overview" ? "active" : ""}
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button
            className={activeTab === "students" ? "active" : ""}
            onClick={() => setActiveTab("students")}
          >
            Students
          </button>
          <button
            className={activeTab === "rooms" ? "active" : ""}
            onClick={() => setActiveTab("rooms")}
          >
            Rooms
          </button>
          <button
            className={activeTab === "rent" ? "active" : ""}
            onClick={() => setActiveTab("rent")}
          >
            Rent & Payments
          </button>
          <button
            className={activeTab === "complaints" ? "active" : ""}
            onClick={() => setActiveTab("complaints")}
          >
            Complaints
          </button>
          <button
            className={activeTab === "visitors" ? "active" : ""}
            onClick={() => setActiveTab("visitors")}
          >
            Visitors
          </button>
          <button
            className={activeTab === "notifications" ? "active" : ""}
            onClick={() => setActiveTab("notifications")}
          >
            Notifications
          </button>
        </nav>
        <main className="content">{renderContent()}</main>
      </div>
    </div>
  );
};

export default DashboardPage;




