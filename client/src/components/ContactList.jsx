// src/components/ContactList.jsx - Component to display list of contacts
import ContactCard from './ContactCard';
import './ContactList.css';

export default function ContactList({ contacts, onEdit, onDelete, isLoading }) {
  if (isLoading) {
    return <div className="loading">Loading contacts...</div>;
  }

  if (!contacts || contacts.length === 0) {
    return <div className="no-contacts">No contacts found. Add one to get started!</div>;
  }

  return (
    <div className="contact-list">
      <h2>Your Contacts</h2>
      <div className="contacts-grid">
        {contacts.map((contact) => (
          <ContactCard
            key={contact._id}
            contact={contact}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
