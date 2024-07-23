import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/CreateTicket.css';

const CreateTicket = () => {
  const [message, setMessage] = useState('');
  const [activeIndex, setActiveIndex] = useState(0); // Set the default open accordion item

  const handleMessageChange = (value) => {
    setMessage(value);
  };

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: 'How to create a support ticket?',
      answer:
        'To create a support ticket, click on "Create Ticket" and fill in the required fields. Provide detailed information about your issue to help us address it quickly.',
    },
    {
      question: 'What information do I need to provide?',
      answer:
        'You need to provide your email address, a detailed description of your issue, and any relevant attachments that can help us understand the problem better.',
    },
    {
      question: 'How long will it take to get a response?',
      answer:
        'Response times can vary based on the complexity of your issue, but we aim to respond within 24-48 hours. You will receive an email notification once your ticket is updated.',
    },
    {
      question: 'Can I update my ticket after submission?',
      answer:
        'Yes, you can update your ticket by logging into your account and navigating to the "My Tickets" section. Here you can add more information or attachments if needed.',
    },
    {
      question: 'How to check the status of my ticket?',
      answer:
        'You can check the status of your ticket by logging into your account and viewing your ticket history. The status will be updated as we work on your issue.',
    },
  ];

  return (
    <div className='mainContent'>
      <div className='contentContainer'>
        <div className='overview-info'>
          <div className='overview-text'>
            <h1>
              Create Ticket<span className='ticket-id'>#45682</span>
            </h1>
          </div>
          <div className='buttons'>
            <button className='btn-nofocus'>Cancel</button>
            <button className='btn'>Save</button>
          </div>
        </div>

        <div className='ticketgrid-container'>
          <div className='grid-item fields'>
            <div className='form-group'>
              <input type='text' required placeholder='Ticket Title' />
            </div>
            <div className='form-group custom-dropdown'>
              <div className='dropdown-wrapper'>
                <select required>
                  <option value=''>Select Support Type</option>
                  <option value='general'>General</option>
                  <option value='tech-support'>Tech Support</option>
                  <option value='bug-fixes'>Bug Fixes</option>
                  <option value='new-feature'>New Feature</option>
                  <option value='report-abuse'>Report Abuse</option>
                </select>
                <i className='fi fi-rr-angle-small-down'></i>
              </div>
            </div>
            <div className='form-group custom-dropdown'>
              <div className='dropdown-wrapper'>
                <select required>
                  <option value=''>Select Priority</option>
                  <option value='high'>High</option>
                  <option value='medium'>Medium</option>
                  <option value='low'>Low</option>
                </select>
                <i className='fi fi-rr-angle-small-down'></i>
              </div>
            </div>
            <div className='form-group'>
              <ReactQuill
                value={message}
                onChange={handleMessageChange}
                placeholder='Type your message here...'
                style={{ height: '200px' }} // Increased height
              />
            </div>
            <div className='form-group'>
              <label className='custom-file-upload'>
                <input type='file' />
                Upload Files
              </label>
            </div>
          </div>
          <div className='grid-item knowledgebase'>
            <h2>Frequently Asked Questions</h2>
            <div className='accordion'>
              {faqData.map((item, index) => (
                <div key={index} className='accordion-item'>
                  <div
                    className='accordion-title'
                    onClick={() => toggleAccordion(index)}
                  >
                    <h3>{item.question}</h3>
                    <i
                      className={`fi fi-rr-angle-small-${
                        activeIndex === index ? 'up' : 'down'
                      }`}
                    ></i>
                  </div>
                  <div
                    className={`accordion-content ${
                      activeIndex === index ? 'show' : ''
                    }`}
                  >
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
