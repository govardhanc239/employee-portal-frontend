import React, { useEffect, useState } from "react";
import { FaClock, FaHistory } from "react-icons/fa";
import { httpRequest } from "../api/http";

const ClockInCard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  // New backend structure
  const [day, setDay] = useState(null);
  const [sessions, setSessions] = useState([]);

  const [elapsed, setElapsed] = useState("00:00:00");
  const [showHistory, setShowHistory] = useState(false);

  // Format ms → HH:MM:SS
  const formatTime = (ms) => {
    const sec = Math.floor(ms / 1000);
    const h = String(Math.floor(sec / 3600)).padStart(2, "0");
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  // Fetch today's attendance
  const loadTodayAttendance = async () => {
    try {
      const res = await httpRequest({ method: "GET", url: "/attendance/today" });

      setDay(res.day);           // daily summary
      setSessions(res.sessions); // all sessions
    } catch (err) {
      console.error("Error loading attendance:", err.message);
    }
  };

  // Update current time + timer loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());

      // Timer only runs for active (last) session with no clock_out
      const last = sessions.length > 0 ? sessions[sessions.length - 1] : null;

      if (last && !last.clock_out) {
        const diff = Date.now() - new Date(last.clock_in).getTime();
        setElapsed(formatTime(diff));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [sessions]);

  useEffect(() => {
    loadTodayAttendance();
  }, []);

  // ================= CLOCK IN =================
  const handleClockIn = async () => {
    try {
      await httpRequest({
        method: "POST",
        url: "/attendance/clock-in",
      });

      await loadTodayAttendance();
    } catch (err) {
      alert(err.message);
    }
  };

  // ================= CLOCK OUT =================
  const handleClockOut = async () => {
    try {
      await httpRequest({
        method: "POST",
        url: "/attendance/clock-out",
      });

      await loadTodayAttendance();
    } catch (err) {
      alert(err.message);
    }
  };

  // Determine button state
  const lastSession = sessions.length > 0 ? sessions[sessions.length - 1] : null;
  const canClockIn = !lastSession || lastSession.clock_out !== null;
  const canClockOut = lastSession && lastSession.clock_out === null;

  const formattedCurrentTime = currentTime.toLocaleTimeString();

  return (
    <div>
      {/* History Button */}
      <div className="d-flex justify-content-end">
        <button
          onClick={() => setShowHistory(true)}
          className="btn p-0 text-primary"
          style={{ background: "none", border: "none", fontWeight: "500" }}
        >
          <FaHistory className="me-1" /> History
        </button>
      </div>

      {/* Current Time */}
      <div className="d-flex justify-content-between align-items-center mt-2">
        <div>
          <h5 className="mb-1">Current Time</h5>
          <h3 className="fw-bold">{formattedCurrentTime}</h3>
        </div>
        <FaClock size={40} className="text-danger" />
      </div>

      {/* Active Session Info */}
      {lastSession && (
        <div className="mt-3">
          <p className="m-0">
            <strong>Last Clock-In:</strong>{" "}
            {new Date(lastSession.clock_in).toLocaleTimeString()}
          </p>

          {!lastSession.clock_out && (
            <p className="text-muted m-0">
              Time elapsed: <strong>{elapsed}</strong>
            </p>
          )}

          {lastSession.clock_out && (
            <p className="m-0">
              <strong>Last Clock-Out:</strong>{" "}
              {new Date(lastSession.clock_out).toLocaleTimeString()}
            </p>
          )}
        </div>
      )}

      {/* Action Buttons */}
      {canClockIn && (
        <button
          className="btn btn-primary w-100 mt-4 py-2"
          onClick={handleClockIn}
        >
          Clock In
        </button>
      )}

      {canClockOut && (
        <button
          className="btn btn-danger w-100 mt-4 py-2"
          onClick={handleClockOut}
        >
          Clock Out
        </button>
      )}

      {/* Completed for today (no open sessions but day exists) */}
      {!canClockIn && !canClockOut && day && (
        <button className="btn btn-secondary w-100 mt-4 py-2" disabled>
          Completed for Today
        </button>
      )}

      {/* ========================
          HISTORY MODAL
      ======================== */}
      {showHistory && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.4)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-3 shadow">
              <div className="d-flex justify-content-between mb-2">
                <h5 className="fw-bold">Today's Attendance Sessions</h5>
                <button
                  className="btn btn-close"
                  onClick={() => setShowHistory(false)}
                />
              </div>

              {sessions.length === 0 && (
                <p className="text-center text-muted">No sessions today.</p>
              )}

              {sessions.length > 0 && (
                <div className="list-group">
                  {sessions.map((s, idx) => (
                    <div key={s.id} className="list-group-item py-3">
                      <h6 className="fw-bold">Session {idx + 1}</h6>

                      <p className="m-0">
                        <strong>Clock In:</strong>{" "}
                        {new Date(s.clock_in).toLocaleTimeString()}
                      </p>

                      <p className="m-0">
                        <strong>Clock Out:</strong>{" "}
                        {s.clock_out
                          ? new Date(s.clock_out).toLocaleTimeString()
                          : "-"}
                      </p>

                      <p className="m-0">
                        <strong>Duration:</strong>{" "}
                        {s.duration ? `${s.duration} hrs` : "-"}
                      </p>

                      {s.is_auto_clockout && (
                        <p className="text-danger m-0">
                          Auto Clock-Out Applied
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClockInCard;
