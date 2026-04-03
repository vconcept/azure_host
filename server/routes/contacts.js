// routes/contacts.js - API endpoints for contact management
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// GET all contacts
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts', error: error.message });
  }
});

// GET a single contact by ID
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact', error: error.message });
  }
});

// CREATE a new contact
router.post('/', async (req, res) => {
  try {
    const { name, phoneNumber, email } = req.body;

    // Validate input
    if (!name || !phoneNumber || !email) {
      return res.status(400).json({ message: 'Name, phone number, and email are required' });
    }

    const newContact = new Contact({
      name,
      phoneNumber,
      email,
    });

    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(500).json({ message: 'Error creating contact', error: error.message });
  }
});

// UPDATE a contact by ID
router.put('/:id', async (req, res) => {
  try {
    const { name, phoneNumber, email } = req.body;

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { name, phoneNumber, email },
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact', error: error.message });
  }
});

// DELETE a contact by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);

    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact', error: error.message });
  }
});

module.exports = router;
