// src/api/contactAPI.js - API utility functions for communicating with the backend
// Uses VITE_API_URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || '/api/contacts';

// Fetch all contacts
export const fetchContacts = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch contacts');
    return await response.json();
  } catch (error) {
    console.error('Error fetching contacts:', error);
    throw error;
  }
};

// Fetch a single contact by ID
export const fetchContactById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('Failed to fetch contact');
    return await response.json();
  } catch (error) {
    console.error('Error fetching contact:', error);
    throw error;
  }
};

// Create a new contact
export const createContact = async (contactData) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData),
    });
    if (!response.ok) throw new Error('Failed to create contact');
    return await response.json();
  } catch (error) {
    console.error('Error creating contact:', error);
    throw error;
  }
};

// Update an existing contact
export const updateContact = async (id, contactData) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contactData),
    });
    if (!response.ok) throw new Error('Failed to update contact');
    return await response.json();
  } catch (error) {
    console.error('Error updating contact:', error);
    throw error;
  }
};

// Delete a contact
export const deleteContact = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete contact');
    return await response.json();
  } catch (error) {
    console.error('Error deleting contact:', error);
    throw error;
  }
};
