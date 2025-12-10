import React, { useEffect, useState } from "react";
import { httpRequest } from "../api/http";
import { Button, Modal, Form } from "react-bootstrap";

const TeamRegularizations = () => {
  const [requests, setRequests] = useState([]);
  const [selected, setSelected] = useState(null);
  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);

  const loadRequests = async () => {
    const data = await httpRequest({ method: "GET", url: "/regularization/team" });
    setRequests(data);
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const openModal = (req) => {
    setSelected(req);
    setShow(true);
  };

  const handleReview = async (status) => {
    await httpRequest({
      method: "PUT",
      url: `/regularization/review/${selected.id}`,
      data: { status, comment },
    });

    setShow(false);
    setComment("");
    loadRequests();
  };

  return (
    <div>
      <h3 className="mb-3">Team Regularization Requests</h3>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Date</th>
            <th>Clock In</th>
            <th>Auto Clock Out</th>
            <th>Requested Out</th>
            <th>Status</th>
            <th>Review</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((r) => (
            <tr key={r.id}>
              <td>{r.employee_name}</td>
              <td>{new Date(r.date).toLocaleDateString()}</td>
              <td>{new Date(r.clock_in).toLocaleTimeString()}</td>
              <td>{new Date(r.clock_out).toLocaleTimeString()}</td>
              <td>{new Date(r.requested_out).toLocaleTimeString()}</td>
              <td>
                <span className={`badge 
                  ${r.status === "pending" ? "bg-warning" :
                   r.status === "approved" ? "bg-success" : "bg-danger"}`}>
                  {r.status}
                </span>
              </td>
              <td>
                <button className="btn btn-primary btn-sm" onClick={() => openModal(r)}>
                  Review
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Review Modal */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Review Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Requested Out Time:</strong> {selected && new Date(selected.requested_out).toLocaleTimeString()}</p>
          <p><strong>Reason:</strong> {selected && selected.reason}</p>

          <Form.Group>
            <Form.Label>Comment</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Form.Group>

          <div className="d-flex gap-2 mt-3">
            <Button variant="success" onClick={() => handleReview("approved")}>Approve</Button>
            <Button variant="danger" onClick={() => handleReview("rejected")}>Reject</Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default TeamRegularizations;
