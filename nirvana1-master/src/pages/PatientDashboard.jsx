import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

function PatientDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    name: '',
    date: '',
    time: '09:00', // Default time
    description: '',
    email: '',
    contact: ''
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.role !== "patient") {
        navigate("/Dashboard");
      }
      setUser(parsedUser);
      setNewAppointment(prev => ({ ...prev, email: parsedUser.email, name: parsedUser.name }));
    } else {
      navigate("/SignIn");
    }
  }, [navigate]);

  const currentYear = selectedDate.getFullYear();
  const currentMonth = selectedDate.getMonth();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const formatDateOnly = (d) => {
    const date = new Date(d);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const fetchAppointmentsForMonth = () => {
    if (!user) return;
    const monthStr = (currentMonth + 1).toString().padStart(2, "0");
    const yearStr = currentYear.toString();

    axios
      .get(`http://localhost:8000/api/appointments/month?year=${yearStr}&month=${monthStr}&email=${user.email}`)
      .then((res) => {
        setAppointments(res.data);
      })
      .catch((err) => console.error("Monthly fetch error:", err));
  };

  const handleDateClick = (day) => {
    const newDate = new Date(currentYear, currentMonth, day);
    setSelectedDate(newDate);
  };

  useEffect(() => {
    if (!user) return;
    const dateStr = formatDateOnly(selectedDate);

    axios
      .get(`http://localhost:8000/api/appointments?date=${dateStr}&email=${user.email}`)
      .then((res) => setPatients(res.data))
      .catch((err) => console.error("Fetch error:", err));

    fetchAppointmentsForMonth();
  }, [selectedDate, user, currentMonth, currentYear]);

  const appointmentDates = appointments.map((a) => formatDateOnly(a.date));

  const addAppointment = () => {
    if (!newAppointment.date || !newAppointment.time) {
      alert("Please fill date and time");
      return;
    }

    axios.post('http://localhost:8000/api/appointments/add', newAppointment)
      .then(() => {
        alert("Appointment added!");
        fetchAppointmentsForMonth();
        // optionally refresh day view
        const dateStr = formatDateOnly(selectedDate);
        if (newAppointment.date === dateStr) {
           axios.get(`http://localhost:8000/api/appointments?date=${dateStr}&email=${user.email}`)
             .then((res) => setPatients(res.data));
        }
      })
      .catch(err => console.error("Add error:", err));
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="dashboard-wrapper">
      <div className="sidebar-buttons">
        <button className="sidebar-button" onClick={() => navigate("/")}>🏠 Home</button>
        <button className="sidebar-button" onClick={() => {
           localStorage.removeItem("user");
           navigate("/SignIn");
        }}>🚪 Log out</button>
      </div>

      <main className="main-content">
        <div className="header">
          <img src="/penguin.png" alt="Penguin" className="penguin" />
          <p>Hey <strong>{user.name}</strong>, book an appointment below.</p>
        </div>

        <div className="appointment-form">
          <h4>Request a New Appointment</h4>
          <input type="date" value={newAppointment.date} onChange={(e) => setNewAppointment({ ...newAppointment, date: e.target.value })} />
          <input type="time" value={newAppointment.time} onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })} />
          <input type="text" placeholder="Reason / Description" value={newAppointment.description} onChange={(e) => setNewAppointment({ ...newAppointment, description: e.target.value })} />
          <input type="tel" placeholder="Contact Number" value={newAppointment.contact} onChange={(e) => setNewAppointment({ ...newAppointment, contact: e.target.value })} />
          <button className="slot" onClick={addAppointment}>Request Appointment</button>
        </div>

        <div className="appointment-card">
          <div className="calendar-section">
            <h4>Your Appointments</h4>
            <div className="calendar-nav">
              <button onClick={() => setSelectedDate(new Date(currentYear, currentMonth - 1, 1))}>◀</button>
              <p className="month-label">
                {selectedDate.toLocaleString("default", { month: "long" })} {currentYear}
              </p>
              <button onClick={() => setSelectedDate(new Date(currentYear, currentMonth + 1, 1))}>▶</button>
            </div>

            <div className="calendar-grid">
              {[...Array(daysInMonth)].map((_, i) => {
                const day = i + 1;
                const dayDate = new Date(currentYear, currentMonth, day);
                const dateStr = formatDateOnly(dayDate);

                const hasAppointment = appointmentDates.includes(dateStr);
                const isSelected =
                  selectedDate.getDate() === day &&
                  selectedDate.getMonth() === currentMonth &&
                  selectedDate.getFullYear() === currentYear;

                return (
                  <div
                    key={day}
                    className={`calendar-day ${isSelected ? "selected-day" : ""} ${hasAppointment ? "has-appointment" : ""}`}
                    onClick={() => handleDateClick(day)}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="slots-section">
            <p>{selectedDate.toDateString()}</p>
            {patients.length === 0 ? (
              <p>No appointments requested for this date.</p>
            ) : (
              patients.map((p, i) => (
                <div key={i} className="patient-info">
                  <h3>Appointment Details</h3>
                  <p>🟢 Status: {p.status || "Requested"}</p>
                  <p>{p.description}</p>
                  <p>🗓 {new Date(p.date).toDateString()}</p>
                  <p>⏰ {p.time}</p>
                  <p>📞 {p.contact || "Not provided"}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default PatientDashboard;
