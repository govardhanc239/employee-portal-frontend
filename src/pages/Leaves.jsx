// import React, { useEffect, useState } from "react";
// import { httpRequest } from "../api/http";
// import CustomTable from "../components/ui/CustomTable";
// import { Modal, Button, Form } from "react-bootstrap";

// const Leaves = () => {
//   const [leaveBalance, setLeaveBalance] = useState(null);
//   const [myLeaves, setMyLeaves] = useState([]);
//   const [showApplyModal, setShowApplyModal] = useState(false);

//   // -----------------------------------
//   // FORM STATE (single object)
//   // -----------------------------------
//   const [form, setForm] = useState({
//     leave_type: "",
//     start_date: "",
//     end_date: "",
//     reason: "",
//     attachment: null,
//   });

//   // -----------------------------------
//   // UNIVERSAL CHANGE HANDLER
//   // -----------------------------------
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: files ? files[0] : value,
//     }));
//   };
//  console.log("Form State:", form);
//   // -----------------------------------
//   // LOAD BALANCE + MY LEAVES
//   // -----------------------------------
//   const loadLeaves = async () => {
//     try {
//       const bal = await httpRequest({ method: "GET", url: "/leaves/balance" });
//       setLeaveBalance(bal);

//       const res = await httpRequest({ method: "GET", url: "/leaves/my-leaves" });
//       setMyLeaves(res || []);
//     } catch (err) {
//       console.error("Leave Load Error:", err.message);
//     }
//   };

//   useEffect(() => {
//     loadLeaves();
//   }, []);

//   // -----------------------------------
// // SUBMIT LEAVE APPLICATION
// // -----------------------------------
// const applyNewLeave = async () => {
//   try {
//     // validation
//     if (!form.leave_type || !form.start_date || !form.end_date || !form.reason) {
//       alert("Please fill all required fields.");
//       return;
//     }

//     // clone object WITHOUT file (backend can't handle it)
//     const payload = { ...form };
//     delete payload.attachment;

//     const res = await httpRequest({
//       method: "POST",
//       url: "/leaves/apply",
//       data: payload,
//       headers: {
//         "Content-Type": "application/json"
//       }
//     });

//     alert("Leave applied successfully!");
//     setShowApplyModal(false);

//     // Reset form
//     setForm({
//       leave_type: "",
//       start_date: "",
//       end_date: "",
//       reason: "",
//       attachment: null,
//     });

//     loadLeaves();

//   } catch (err) {
//     console.error("Apply Leave Error:", err);
//     alert(err?.response?.data?.message || err.message);
//   }
// };

//   // -----------------------------------
//   // TABLE COLUMNS
//   // -----------------------------------
//   const columns = [
//     { label: "Leave Type", field: "leave_type" },
//     { label: "Dates", field: "dates" },
//     { label: "Total Days", field: "total_days" },
//     { label: "Reason", field: "reason" },
//     { label: "Status", field: "status" },
//   ];

//   const tableData = myLeaves.map((l) => ({
//     leave_type: <span className="fw-bold">{l.leave_type}</span>,
//     dates: `${new Date(l.start_date).toLocaleDateString()} → ${new Date(
//       l.end_date
//     ).toLocaleDateString()}`,
//     total_days: l.total_days,
//     reason: l.reason || "-",
//     status:
//       l.status === "approved" ? (
//         <span className="text-success fw-bold">Approved</span>
//       ) : l.status === "rejected" ? (
//         <span className="text-danger fw-bold">Rejected</span>
//       ) : (
//         <span className="text-warning fw-bold">Pending</span>
//       ),
//   }));

//   // -----------------------------------
//   // COMPONENT UI
//   // -----------------------------------
//   return (
//     <div>
//       <h3 className="fw-bold mb-4">My Leaves</h3>

//       {/* LEAVE BALANCE */}
//       {leaveBalance && (
//         <div className="card p-3 mb-4 shadow-sm">
//           <h5 className="fw-bold">Available Leave Balance</h5>
//           <div className="row mt-2">
//             <div className="col-md-3">
//               <p>Casual Leave: <strong>{leaveBalance.casual_leave}</strong></p>
//             </div>
//             <div className="col-md-3">
//               <p>Sick Leave: <strong>{leaveBalance.sick_leave}</strong></p>
//             </div>
//             <div className="col-md-3">
//               <p>Privilege Leave: <strong>{leaveBalance.privilege_leave}</strong></p>
//             </div>
//             <div className="col-md-3">
//               <p>LOP: <strong>{leaveBalance.lop_leave}</strong></p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* APPLY LEAVE BUTTON */}
//       <div className="d-flex justify-content-end mb-3">
//         <button className="btn btn-primary" onClick={() => setShowApplyModal(true)}>
//           Apply Leave
//         </button>
//       </div>

//       {/* LEAVES TABLE */}
//       <CustomTable columns={columns} data={tableData} />

//       {/* APPLY LEAVE MODAL */}
//       <Modal show={showApplyModal} onHide={() => setShowApplyModal(false)} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Apply for Leave</Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Leave Type</Form.Label>
//               <Form.Select
//                 name="leave_type"
//                 value={form.leave_type}
//                 onChange={handleChange}
//               >
//                 <option value="">Select</option>
//                 <option value="CL">Casual Leave (CL)</option>
//                 <option value="SL">Sick Leave (SL)</option>
//                 <option value="PL">Privilege Leave (PL)</option>
//                 <option value="LOP">Loss of Pay (LOP)</option>
//               </Form.Select>
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Start Date</Form.Label>
//               <Form.Control
//                 type="date"
//                 name="start_date"
//                 value={form.start_date}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>End Date</Form.Label>
//               <Form.Control
//                 type="date"
//                 name="end_date"
//                 value={form.end_date}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Reason</Form.Label>
//               <Form.Control
//                 as="textarea"
//                 rows={3}
//                 name="reason"
//                 value={form.reason}
//                 onChange={handleChange}
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Attachment (Optional)</Form.Label>
//               <Form.Control
//                 type="file"
//                 name="attachment"
//                 onChange={handleChange}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>

//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowApplyModal(false)}>
//             Cancel
//           </Button>
//           <Button variant="primary" onClick={applyNewLeave}>
//             Submit
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default Leaves;



import React, { useEffect, useState } from "react";
import { httpRequest } from "../api/http";
import CustomTable from "../components/ui/CustomTable";
import { Modal, Button, Form } from "react-bootstrap";

const Leaves = () => {
  const [leaveBalance, setLeaveBalance] = useState(null);
  const [myLeaves, setMyLeaves] = useState([]);
  const [showApplyModal, setShowApplyModal] = useState(false);

  // -----------------------------------
  // FORM STATE (single object)
  // -----------------------------------
  const [form, setForm] = useState({
    leave_type: "",
    start_date: "",
    end_date: "",
    reason: "",
    attachment: null,
  });

  // -----------------------------------
  // UNIVERSAL CHANGE HANDLER (debug safe)
  // -----------------------------------
  const handleChange = (e) => {
    const { name, type, value, files } = e.target;

    // DEBUG HERE
    console.log("Changed Field:", name);
    console.log("Value:", value);
    console.log("Files:", files);

    // For file input
    if (type === "file") {
      const file = files?.[0] || null;

      console.log("Selected File:", file);

      setForm((prev) => ({
        ...prev,
        attachment: file,
      }));
      return;
    }

    // Normal fields
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  console.log("Current Form State:", form);

  // -----------------------------------
  // LOAD BALANCE + MY LEAVES
  // -----------------------------------
  const loadLeaves = async () => {
    try {
      const bal = await httpRequest({ method: "GET", url: "/leaves/balance" });
      setLeaveBalance(bal);

      const res = await httpRequest({ method: "GET", url: "/leaves/my-leaves" });
      setMyLeaves(res || []);
    } catch (err) {
      console.error("Leave Load Error:", err.message);
    }
  };

  useEffect(() => {
    loadLeaves();
  }, []);

  // -----------------------------------
  // SUBMIT LEAVE APPLICATION (NO FORMDATA)
  // -----------------------------------
  const applyNewLeave = async () => {
    try {
      console.log("Submitting Payload:", form);

      const payload = { ...form };

      if (!payload.attachment) {
        delete payload.attachment;
      }

      const res = await httpRequest({
        method: "POST",
        url: "/leaves/apply",
        data: payload,
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Leave applied successfully!");
      setShowApplyModal(false);

      // Reset form
      setForm({
        leave_type: "",
        start_date: "",
        end_date: "",
        reason: "",
        attachment: null,
      });

      loadLeaves();
    } catch (err) {
      console.error("Apply Leave Error:", err);
      alert(err?.response?.data?.message || err.message);
    }
  };

  // -----------------------------------
  // TABLE COLUMNS
  // -----------------------------------
  const columns = [
    { label: "Leave Type", field: "leave_type" },
    { label: "Dates", field: "dates" },
    { label: "Total Days", field: "total_days" },
    { label: "Reason", field: "reason" },
    { label: "Status", field: "status" },
  ];

  const tableData = myLeaves.map((l) => ({
    leave_type: <span className="fw-bold">{l.leave_type}</span>,
    dates: `${new Date(l.start_date).toLocaleDateString()} → ${new Date(
      l.end_date
    ).toLocaleDateString()}`,
    total_days: l.total_days,
    reason: l.reason || "-",
    status:
      l.status === "approved" ? (
        <span className="text-success fw-bold">Approved</span>
      ) : l.status === "rejected" ? (
        <span className="text-danger fw-bold">Rejected</span>
      ) : (
        <span className="text-warning fw-bold">Pending</span>
      ),
  }));

  // -----------------------------------
  // COMPONENT UI
  // -----------------------------------
  return (
    <div>
      <h3 className="fw-bold mb-4">My Leaves</h3>

      {/* LEAVE BALANCE */}
      {leaveBalance && (
        <div className="card p-3 mb-4 shadow-sm">
          <h5 className="fw-bold">Available Leave Balance</h5>
          <div className="row mt-2">
            <div className="col-md-3">
              <p>Casual Leave: <strong>{leaveBalance.casual_leave}</strong></p>
            </div>
            <div className="col-md-3">
              <p>Sick Leave: <strong>{leaveBalance.sick_leave}</strong></p>
            </div>
            <div className="col-md-3">
              <p>Privilege Leave: <strong>{leaveBalance.privilege_leave}</strong></p>
            </div>
            <div className="col-md-3">
              <p>LOP: <strong>{leaveBalance.lop_leave}</strong></p>
            </div>
          </div>
        </div>
      )}

      {/* APPLY LEAVE BUTTON */}
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-primary"
          onClick={() => setShowApplyModal(true)}
        >
          Apply Leave
        </button>
      </div>

      {/* LEAVES TABLE */}
      <CustomTable columns={columns} data={tableData} />

      {/* APPLY LEAVE MODAL */}
      <Modal
        show={showApplyModal}
        onHide={() => setShowApplyModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Apply for Leave</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Leave Type</Form.Label>
              <Form.Select
                name="leave_type"
                value={form.leave_type}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="CL">Casual Leave (CL)</option>
                <option value="SL">Sick Leave (SL)</option>
                <option value="PL">Privilege Leave (PL)</option>
                <option value="LOP">Loss of Pay (LOP)</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="start_date"
                value={form.start_date}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                name="end_date"
                value={form.end_date}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Reason</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="reason"
                value={form.reason}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Attachment (Optional)</Form.Label>
              <Form.Control
                type="file"
                name="attachment"
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowApplyModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={applyNewLeave}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Leaves;
