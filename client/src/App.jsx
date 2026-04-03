// src/App.jsx - Main app component for Contact Management System
import { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import {
  fetchContacts,
  createContact,
  updateContact,
  deleteContact,
} from './api/contactAPI';
import './App.css';

export default function App() {
  // State for contacts, form visibility, and editing
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingContact, setEditingContact] = useState(null);
  const [activeTab, setActiveTab] = useState('contacts'); // 'contacts' or 'add'

  // Fetch all contacts on component mount
  useEffect(() => {
    loadContacts();
  }, []);

  // Load contacts from API
  const loadContacts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchContacts();
      setContacts(data);
    } catch (err) {
      setError('Failed to load contacts. Please check your backend connection.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form submission (create or update)
  const handleFormSubmit = async (formData) => {
    try {
      if (editingContact) {
        // Update existing contact
        const updatedContact = await updateContact(editingContact._id, formData);
        setContacts(
          contacts.map((contact) =>
            contact._id === editingContact._id ? updatedContact : contact
          )
        );
        setEditingContact(null);
        setActiveTab('contacts'); // Switch to contacts tab after update
      } else {
        // Create new contact
        const newContact = await createContact(formData);
        setContacts([newContact, ...contacts]);
        setActiveTab('contacts'); // Switch to contacts tab after creation
      }

      setError(null);
      alert(editingContact ? 'Contact updated successfully!' : 'Contact added successfully!');
    } catch (err) {
      setError(err.message);
      alert(`Error: ${err.message}`);
    }
  };

  // Handle edit button click
  const handleEdit = (contact) => {
    setEditingContact(contact);
    setActiveTab('add'); // Switch to add tab when editing
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    try {
      await deleteContact(id);
      setContacts(contacts.filter((contact) => contact._id !== id));
      alert('Contact deleted successfully!');
    } catch (err) {
      setError(err.message);
      alert(`Error: ${err.message}`);
    }
  };

  // Handle cancel edit
  const handleCancel = () => {
    setEditingContact(null);
    setActiveTab('contacts');
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>📇 Contact Management System by Vic</h1>
          <p>Manage your contacts efficiently</p>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          {error && <div className="app-error">{error}</div>}

          {/* Tab Navigation */}
          <div className="tab-navigation">
            <button
              className={`tab-button ${activeTab === 'contacts' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('contacts');
                setEditingContact(null);
              }}
            >
              📋 All Contacts
            </button>
            <button
              className={`tab-button ${activeTab === 'add' ? 'active' : ''}`}
              onClick={() => setActiveTab('add')}
            >
              ➕ Add Contact
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'contacts' && (
              <ContactList
                contacts={contacts}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isLoading={isLoading}
              />
            )}

            {activeTab === 'add' && (
              <div className="form-section">
                <ContactForm
                  onSubmit={handleFormSubmit}
                  initialData={editingContact}
                  onCancel={handleCancel}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>&copy; 2026 Contact Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}
