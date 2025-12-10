import React, { useEffect, useState } from "react";
import { httpRequest } from "../api/http";
import { Tabs, Tab, Modal, Button, Form } from "react-bootstrap";

const TeamLeaves = () => {
  const [pending, setPending] = useState([]);
  const [approved, setApproved] = useState([]);
  const [rejected, setRejected] = useState([]);

  const [selected, setSelected] = useState(null);
  const [comment, setComment] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  // ------------------------------------------------------
  // LOAD ALL LEAVES FOR RM
  // ------------------------------------------------------
  const loadLeaves = async () => {
    const result = await httpRequest({
      method: "GET",
      url: "/leaves/leave-summary",
    });

    setPending(result.pending || []);
    setApproved(result.approved || []);
    setRejected(result.rejected || []);
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  // ------------------------------------------------------
  // OPEN REVIEW MODAL
  // ------------------------------------------------------
  const openReview = (leave) => {
    setSelected(leave);
    setComment("");
    setModalOpen(true);
  };

  // ------------------------------------------------------
  // HANDLE APPROVE/REJECT
  // ------------------------------------------------------
  const handleReview = async (status) => {
    await httpRequest({
      method: "PUT",
      url: `/leaves/review/${selected.id}`,
      data: { status, comment },
    });

    setModalOpen(false);
    loadLeaves();
  };

  // ------------------------------------------------------
  // TABLE RENDER FUNCTION
  // ------------------------------------------------------
  const renderTable = (list, showActions = false) => (
    <table className="table table-bordered mt-3">
      <thead>
        <tr>
          <th>Employee</th>
          <th>Leave Type</th>
          <th>Dates</th>
          <th>Total Days</th>
          <th>Reason</th>
          <th>Status</th>
          {showActions && <th>Action</th>}
        </tr>
      </thead>
      <tbody>
        {list.length === 0 ? (
          <tr>
            <td colSpan={showActions ? 7 : 6} className="text-center text-muted">
              No records found.
            </td>
          </tr>
        ) : (
          list.map((l) => (
            <tr key={l.id}>
              <td>
                {l.employee_name} <br />
                <small className="text-muted">{l.employee_code}</small>
              </td>
              <td>{l.leave_type}</td>
              <td>
                {new Date(l.start_date).toLocaleDateString()} →
                {new Date(l.end_date).toLocaleDateString()}
              </td>
              <td>{l.total_days}</td>
              <td>{l.reason}</td>

              <td>
                <span
                  className={`badge ${
                    l.status === "pending"
                      ? "bg-warning"
                      : l.status === "approved"
                      ? "bg-success"
                      : "bg-danger"
                  }`}
                >
                  {l.status}
                </span>
              </td>

              {showActions && (
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => openReview(l)}
                  >
                    Review
                  </button>
                </td>
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );

  // ------------------------------------------------------

  return (
    <div>
      <h3 className="fw-bold mb-3">Team Leave Requests</h3>

      <Tabs defaultActiveKey="pending" className="mb-3">
        <Tab eventKey="pending" title={`Pending (${pending.length})`}>
          {renderTable(pending, true)}
        </Tab>

        <Tab eventKey="approved" title={`Approved (${approved.length})`}>
          {renderTable(approved)}
        </Tab>

        <Tab eventKey="rejected" title={`Rejected (${rejected.length})`}>
          {renderTable(rejected)}
        </Tab>
      </Tabs>

      {/* -----------------------------------------------
          REVIEW MODAL (Approve / Reject)
      ------------------------------------------------ */}
      <Modal show={modalOpen} centered onHide={() => setModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Review Leave</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {selected && (
            <>
              <p>
                <strong>Employee:</strong> {selected.employee_name}
              </p>
              <p>
                <strong>Leave:</strong> {selected.leave_type}
              </p>
              <p>
                <strong>Requested Days:</strong> {selected.total_days}
              </p>
              <p>
                <strong>Reason:</strong> {selected.reason}
              </p>

              <Form.Group className="mb-3">
                <Form.Label>Comment (optional)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Form.Group>

              <div className="d-flex gap-2 mt-3">
                <Button variant="success" onClick={() => handleReview("approved")}>
                  Approve
                </Button>

                <Button variant="danger" onClick={() => handleReview("rejected")}>
                  Reject
                </Button>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TeamLeaves;
