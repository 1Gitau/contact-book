import React, { useState } from "react";
import useContactStore from "./store/contactStore";
import "./App.css";

const App = () => {
  const [newContact, setNewContact] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const { contacts, addContact, deleteContact, disableContact } =
    useContactStore();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContact({ ...newContact, [name]: value });
  };

  const handleAddContact = () => {
    if (
      newContact.firstName &&
      newContact.lastName &&
      newContact.email &&
      newContact.phone
    ) {
      addContact({ ...newContact, id: Date.now() });
      setNewContact({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      });
    }
  };

  return (
    <div className="app-container">
      <h1>Contact Book</h1>
      <div className="contact-form">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={newContact.firstName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={newContact.lastName}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={newContact.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={newContact.phone}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={handleAddContact}>
          Add Contact
        </button>
      </div>

      <div className="contact-list">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className={`contact-item ${contact.disabled ? "disabled" : ""}`}
          >
            <div>
              <strong>
                {contact.firstName} {contact.lastName}
              </strong>
              <br />
              <span>Email: {contact.email}</span>
              <br />
              <span>Phone: {contact.phone}</span>
            </div>
            <div className="contact-actions">
              <button onClick={() => deleteContact(contact.id)}>Delete</button>
              <button onClick={() => disableContact(contact.id)}>
                {contact.disabled ? "Enable" : "Disable"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
