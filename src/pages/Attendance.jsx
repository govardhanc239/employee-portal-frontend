import React, { useEffect, useState } from "react";
import CustomTable from "../components/ui/CustomTable";
import { httpRequest } from "../api/http";
import { Modal, Button, Form } from "react-bootstrap";
import '../styles/Attendance.css';
const Attendance = () => {
  const [records, setRecords] = useState([]);
  const [regularizeModal, setRegularizeModal] = useState(false);

  const [selectedSessionId, setSelectedSessionId] = useState(null);
  const [regOut, setRegOut] = useState("");
  const [reason, setReason] = useState("");

  // ------------------------------
  // LOAD ATTENDANCE LIST
  // ------------------------------
  const loadAttendance = async () => {
    try {
      const res = await httpRequest({
        method: "GET",
        url: "/attendance/list",
      });
      // IMPORTANT FIX
      // const list = Array.isArray(res?.data) ? res.data : [];
      setRecords(res);
    } catch (err) {
      console.error("Attendance Load Error:", err.message);
    }
  };

  useEffect(() => {
    loadAttendance();
  }, []);

  console.log("Records",records)
  // ------------------------------
  // OPEN REGULARIZATION MODAL
  // ------------------------------
  const openRegularize = (sessionId) => {
    setSelectedSessionId(sessionId);
    setRegularizeModal(true);
  };

  // ------------------------------
  // SUBMIT REGULARIZATION
  // ------------------------------
  const submitRegularization = async () => {
    try {
      await httpRequest({
        method: "POST",
        url: `/regularization`,
        data: {
          session_id: selectedSessionId,
          corrected_out: regOut,
          reason,
        },
      });

      alert("Regularization request sent to RM");

      setRegularizeModal(false);
      setRegOut("");
      setReason("");
      loadAttendance();

    } catch (err) {
      alert(err.message);
    }
  };

  // ------------------------------
  // TABLE COLUMNS
  // ------------------------------
  const columns = [
    { label: "Date", field: "date" },
    { label: "Clock In", field: "clock_in" },
    { label: "Clock Out", field: "clock_out" },
    { label: "Status", field: "status" },
    { label: "Reg. Status", field: "reg_status" }, 
    // { label: "Actions", field: "actions" },     

  ];

  // ------------------------------
  // TABLE DATA
  // ------------------------------
  const tableData = records.map((day) => {
  const autoSession = day.sessions?.find((s) => s.is_auto_clockout);
  const regStatus = autoSession?.regularization?.status || null;
  const isLeave = day.leave_type !== null && day.leave_type !== undefined;

  return {
    rowClass: isLeave ? "leave-row" : "",


    date: new Date(day.date).toLocaleDateString(),

    clock_in: day.first_clock_in
      ? new Date(day.first_clock_in).toLocaleTimeString()
      : "-",

    clock_out: day.last_clock_out
      ? new Date(day.last_clock_out).toLocaleTimeString()
      : "-",

    status:
     isLeave ? (
        <span className="text-info fw-bold">On Leave</span>
      ) : day.status === "late" ? (
        <span className="text-danger fw-bold">Late</span>
      ) : (
        <span className="text-success fw-bold">On Time</span>
      ),

      reg_status: (
      <>
        {!autoSession && <span className="text-muted">—</span>}

        {regStatus === "pending" && (
          <span className="badge bg-secondary text-dark">Pending</span>
        )}

        {regStatus === "approved" && (
          <span className="badge bg-success">Approved</span>
        )}

        {regStatus === "rejected" && (
          <span className="badge bg-danger">Rejected</span>
        )}
      </>
    ),

    actions: (
      <>
        {isLeave && <span className="text-muted">—</span>}

    {!isLeave && !autoSession && (
      <span className="text-muted">—</span>
    )}


        {/* Auto clock-out but no request yet → show button */}
        {autoSession && !regStatus && !isLeave && (
          <button
            className="btn btn-sm btn-warning"
            onClick={() => openRegularize(autoSession.id)}
          >
            Regularize
          </button>
        )}
      </>
    ),
  };
});


  return (
    <div>
      <h3 className="fw-bold mb-4">My Attendance</h3>

      <CustomTable
        columns={columns}
        data={tableData}
        renderActions={(row) => row.actions}
      />

      {/* --------------------------
          REGULARIZATION MODAL
      ---------------------------- */}
      <Modal
        show={regularizeModal}
        onHide={() => setRegularizeModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Regularization Request</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Correct Clock-Out Time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={regOut}
                onChange={(e) => setRegOut(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Reason</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setRegularizeModal(false)}>
            Cancel
          </Button>

          <Button variant="primary" onClick={submitRegularization}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Attendance;
