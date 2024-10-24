import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/CreateTicket.css";
import { get, post } from "../../services/api.js";
import { jwtDecode } from "jwt-decode";

const CreateTicket = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [formData, setFormData] = useState({
    subject: "",
    group: "",
    priority: "",
    message: "",
    files: null,
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [ticketID, setTicketID] = useState("");

  const faqData = [
    {
      question: "How to create a support ticket?",
      answer:
        'To create a support ticket, click on "Create Ticket" and fill in the required fields. Provide detailed information about your issue to help us address it quickly.',
    },
    {
      question: "What information do I need to provide?",
      answer:
        "You need to provide your email address, a detailed description of your issue, and any relevant attachments that can help us understand the problem better.",
    },
    {
      question: "How long will it take to get a response?",
      answer:
        "Response times can vary based on the complexity of your issue, but we aim to respond within 24-48 hours. You will receive an email notification once your ticket is updated.",
    },
    {
      question: "Can I update my ticket after submission?",
      answer:
        'Yes, you can update your ticket by logging into your account and navigating to the "My Tickets" section. Here you can add more information or attachments if needed.',
    },
    {
      question: "How to check the status of my ticket?",
      answer:
        "You can check the status of your ticket by logging into your account and viewing your ticket history. The status will be updated as we work on your issue.",
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.subject.trim()) {
      newErrors.subject = "Please fill this field";
    }
    if (!formData.group.trim()) {
      newErrors.group = "Please select an option field";
    }
    if (!formData.priority.trim()) {
      newErrors.priority = "Please select an option field";
    }
    if (formData.message.length < 6) {
      newErrors.message = "Please fill this field";
    }
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("subject", formData.subject);
    formDataToSend.append("group", formData.group);
    formDataToSend.append("priority", formData.priority);
    formDataToSend.append("message", formData.message);

    const token = jwtDecode(localStorage.getItem("token"));
    formDataToSend.append("requester", token.name);

    if (formData.files) {
      for (let i = 0; i < formData.files.length; i++) {
        formDataToSend.append("files", formData.files[i]);
      }
    }

    const response = await post("create-ticket", formDataToSend);

    if (response.success) {
      setSuccessMessage(response.message);
    } else {
      const apiErrors = errors;
      apiErrors.api = response.message;
      setErrors(apiErrors);
    }
  };

  useEffect(() => {
    async function getTicketID() {
      const res = await get("new-ticket-id");
      if (res.success) {
        setTicketID(res.data);
      } else {
        setTicketID(0);
      }
    }

    getTicketID();
  }, []);

  return (
    <div className="mainContent">
      <div className="contentContainer">
        <div className="overview-info">
          <div className="overview-text">
            <h1>
              Create Ticket<span className="ticket-id">#{ticketID}</span>
            </h1>
          </div>
          <div className="buttons">
            <button className="btn-nofocus">Cancel</button>
            <button className="btn" onClick={handleSubmit}>
              Save
            </button>
          </div>
          {errors.api && <span>{errors.api}</span>}
          {successMessage.length > 0 && <span>{successMessage}</span>}
        </div>

        <div className="ticketgrid-container">
          <div className="grid-item fields">
            <div className="form-group">
              <input
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                name="subject"
                value={formData.subject}
                type="text"
                required
                placeholder="Ticket Title"
              />
              {errors.subject && <span>{errors.subject}</span>}
            </div>
            <div className="form-group custom-dropdown">
              <div className="dropdown-wrapper">
                <select
                  name="group"
                  onChange={(e) => {
                    const selectedText =
                      e.target.options[e.target.selectedIndex].innerText;
                    setFormData({ ...formData, group: selectedText });
                  }}
                  value={formData.group}
                  required>
                  <option value="">Select Support Type</option>
                  <option value="General">General</option>
                  <option value="Tech Support">Tech Support</option>
                  <option value="Bug Fixes">Bug Fixes</option>
                  <option value="New Feature">New Feature</option>
                  <option value="Report Abuse">Report Abuse</option>
                </select>
                <i className="fi fi-rr-angle-small-down"></i>
              </div>
              {errors.group && <span>{errors.group}</span>}
            </div>
            <div className="form-group custom-dropdown">
              <div className="dropdown-wrapper">
                <select
                  name="priority"
                  onChange={(e) => {
                    setFormData({ ...formData, priority: e.target.value });
                  }}
                  value={formData.priority}
                  required>
                  <option value="">Select Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <i className="fi fi-rr-angle-small-down"></i>
              </div>
              {errors.priority && <span>{errors.priority}</span>}
            </div>
            <div className="form-group">
              <ReactQuill
                value={formData.message}
                onChange={(value) =>
                  setFormData({ ...formData, message: value })
                }
                placeholder="Type your message here..."
              />
              {errors.message && <span>{errors.message}</span>}
            </div>
            <div className="form-group">
              <input
                name="files"
                id="file"
                type="file"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    files: e.target.files,
                  })
                }
                multiple
              />
              <label htmlFor="file" className="custom-file-upload">
                Upload Files
              </label>
              {formData.files &&
                Object.keys(formData.files).map((file, i) => {
                  return <div key={i}>{formData.files[file].name},</div>;
                })}
            </div>
          </div>
          <div className="grid-item knowledgebase">
            <h2>Frequently Asked Questions</h2>
            <div className="accordion">
              {faqData.map((item, index) => (
                <div key={index} className="accordion-item">
                  <div
                    className="accordion-title"
                    onClick={() => toggleAccordion(index)}>
                    <h3>{item.question}</h3>
                    <i
                      className={`fi fi-rr-angle-small-${
                        activeIndex === index ? "up" : "down"
                      }`}></i>
                  </div>
                  <div
                    className={`accordion-content ${
                      activeIndex === index ? "show" : ""
                    }`}>
                    <p>{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;
