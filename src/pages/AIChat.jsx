import React, { useState } from "react";
import { askAI } from "../api/ai";
import CustomTable from "../components/ui/CustomTable";

/* ======================================
   AUTO COLUMN GENERATOR
====================================== */

const generateColumnsFromData = (data) => {
  if (!Array.isArray(data) || data.length === 0) return [];

  return Object.keys(data[0]).map((key) => ({
    label: key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase()),
    field: key
  }));
};

/* ======================================
   AUTO DESCRIPTION GENERATOR
====================================== */

const generateDescriptionFromData = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    return "Here is the requested data.";
  }

  const sample = data[0];

  if (sample.leave_type) return "Here are your leave requests.";
  if (sample.clock_in || sample.clock_out) return "Here is your attendance.";
  if (sample.employee_id && sample.leave_type)
    return "Here are your team's leave requests.";
  if (sample.employee_id && (sample.clock_in || sample.clock_out))
    return "Here is your team's attendance.";

  return "Here is the requested information.";
};

/* ======================================
   AI CHAT COMPONENT
====================================== */

const AIChat = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const send = async () => {
    if (!input.trim()) return;

    const userText = input; // ✅ store before clearing
    setInput(""); // ✅ CLEAR IMMEDIATELY

    const myMsg = { role: "user", text: userText };
    setMessages((prev) => [...prev, myMsg]);

    const res = await askAI(userText);
    console.log("AI response", res);

    let botMsg;

    /* ✅ TABLE RESPONSE */
    if (Array.isArray(res)) {
      const autoColumns = generateColumnsFromData(res);
      const description = generateDescriptionFromData(res);

      botMsg = {
        role: "bot",
        type: "table",
        data: res,
        columns: autoColumns,
        description
      };

    /* ✅ OBJECT / CARD RESPONSE */
    } else if (typeof res === "object" && res !== null) {
      botMsg = {
        role: "bot",
        type: "card",
        data: res,
        description: "Here is the requested information."
      };

    /* ✅ TEXT RESPONSE */
    } else {
      botMsg = {
        role: "bot",
        type: "text",
        text: String(res)
      };
    }

    setMessages((prev) => [...prev, botMsg]);
  };

  /* ✅ ENTER KEY HANDLER */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      send();
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="fw-bold mb-3">AI Assistant</h3>

      <div
        className="chat-box p-3 border rounded"
        style={{ height: 400, overflowY: "auto" }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 my-2 rounded ${
              msg.role === "user" ? "bg-primary text-white" : "bg-light"
            }`}
          >
            {/* ✅ TABLE MESSAGE */}
            {msg.role === "bot" && msg.type === "table" ? (
              <div>
                <div className="fw-semibold mb-2 text-muted">
                  {msg.description}
                </div>
                <CustomTable columns={msg.columns} data={msg.data} />
              </div>

            /* ✅ CARD MESSAGE */
            ) : msg.role === "bot" && msg.type === "card" ? (
              <div>
                <div className="fw-semibold mb-2 text-muted">
                  {msg.description}
                </div>
                <div className="card p-2">
                  {Object.entries(msg.data).map(([key, value]) => (
                    <div key={key}>
                      <strong>{key}:</strong> {String(value)}
                    </div>
                  ))}
                </div>
              </div>

            /* ✅ TEXT MESSAGE */
            ) : (
              msg.text
            )}
          </div>
        ))}
      </div>

      {/* ✅ INPUT AREA */}
      <div className="d-flex mt-3">
        <input
          className="form-control"
          placeholder="Ask me anything…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="btn btn-success ms-2" onClick={send}>
          Send
        </button>
      </div>
    </div>
  );
};

export default AIChat;
