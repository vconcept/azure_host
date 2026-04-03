// src/components/ContactCard.jsx - Individual contact card component
import { useState } from 'react';
import './ContactCard.css';

export default function ContactCard({ contact, onEdit, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${contact.name}?`)) {
      setIsDeleting(true);
      try {
        await onDelete(contact._id);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="contact-card">
      <div className="contact-info">
        <h3>{contact.name}</h3>
        <div className="contact-detail">
          <span className="label">Phone:</span>
          <a href={`tel:${contact.phoneNumber}`}>{contact.phoneNumber}</a>
        </div>
        <div className="contact-detail">
          <span className="label">Email:</span>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
        </div>
      </div>
      <div className="contact-actions">
        <button
          className="btn-edit"
          onClick={() => onEdit(contact)}
          title="Edit contact"
        >
          ✏️ Edit
        </button>
        <button
          className="btn-delete"
          onClick={handleDelete}
          disabled={isDeleting}
          title="Delete contact"
        >
          {isDeleting ? '🗑️ Deleting...' : '🗑️ Delete'}
        </button>
      </div>
    </div>
  );
}
