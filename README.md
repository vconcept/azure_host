# Contact Management System - MERN Stack

A full-stack web application built with MongoDB, Express, React, and Node.js for managing contacts. This application allows users to add, view, update, and delete contacts with their name, phone number, and email.

## Project Structure

```
azure_host/
├── server/                 # Backend (Node.js + Express)
│   ├── config/
│   │   └── db.js          # MongoDB connection configuration
│   ├── models/
│   │   └── Contact.js     # Contact mongoose schema
│   ├── routes/
│   │   └── contacts.js    # API endpoints for CRUD operations
│   ├── server.js          # Express server entry point
│   ├── .env               # Environment variables
│   ├── package.json       # Backend dependencies
│   └── .gitignore
│
└── client/                # Frontend (React + Vite)
    ├── src/
    │   ├── components/
    │   │   ├── ContactForm.jsx    # Form component for adding/editing
    │   │   ├── ContactForm.css
    │   │   ├── ContactList.jsx    # List display component
    │   │   ├── ContactList.css
    │   │   ├── ContactCard.jsx    # Individual contact card
    │   │   └── ContactCard.css
    │   ├── api/
    │   │   └── contactAPI.js      # API utility functions
    │   ├── App.jsx                # Main React component
    │   ├── App.css
    │   ├── index.css              # Global styles
    │   └── main.jsx
    ├── .env.local                 # Frontend environment variables
    ├── package.json
    ├── vite.config.js
    └── .gitignore
```

## Features

✅ **Add Contacts** - Create new contacts with name, phone number, and email
✅ **View Contacts** - Display all contacts in a responsive grid layout
✅ **Edit Contacts** - Update existing contact information
✅ **Delete Contacts** - Remove contacts from the database
✅ **Form Validation** - Client-side and server-side validation
✅ **MongoDB Atlas** - Cloud-hosted database integration
✅ **Responsive UI** - Mobile-friendly design with gradient themes
✅ **Error Handling** - Comprehensive error messages and alerts

## Prerequisites

Before running this project, ensure you have:

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)
- **MongoDB Atlas Account** (free tier available at https://www.mongodb.com/cloud/atlas)
- **Git** (optional, for version control)

## Installation & Setup

### 1. Clone the Repository

```bash
cd /path/to/azure_host
```

### 2. Configure MongoDB Atlas

1. Create a MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Create a database user with username and password
4. Get your connection string (should look like):
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/contact_management_db?retryWrites=true&w=majority
   ```

### 3. Setup Backend

```bash
cd server

# Install dependencies
npm install

# Update .env file with your MongoDB URI
# Edit .env and replace the MONGO_URI with your connection string
# MONGODB_URI=mongodb+srv://your_username:your_password@cluster0.xxxxx.mongodb.net/contact_management_db?retryWrites=true&w=majority
```

### 4. Setup Frontend

```bash
cd ../client

# Install dependencies
npm install

# The .env.local file is already configured to use http://localhost:5000/api/contacts
```

## Running the Application

### Start the Backend Server

```bash
cd server
npm start

# Server will start on http://localhost:5000
# You should see: "Backend server running on http://localhost:5000"
```

### Start the Frontend Development Server (in a new terminal)

```bash
cd client
npm run dev

# Frontend will start on http://localhost:5173
# You should see: "Local: http://localhost:5173/"
```

### Access the Application

Open your browser and navigate to:

```
http://localhost:5173
```

## API Endpoints

The backend provides the following REST API endpoints:

### Get All Contacts

```
GET http://localhost:5000/api/contacts
Response: Array of contact objects
```

### Get Single Contact

```
GET http://localhost:5000/api/contacts/:id
Response: Single contact object
```

### Create a New Contact

```
POST http://localhost:5000/api/contacts
Headers: Content-Type: application/json
Body: {
  "name": "John Doe",
  "phoneNumber": "1234567890",
  "email": "john@example.com"
}
Response: Created contact object with _id
```

### Update a Contact

```
PUT http://localhost:5000/api/contacts/:id
Headers: Content-Type: application/json
Body: {
  "name": "Jane Doe",
  "phoneNumber": "0987654321",
  "email": "jane@example.com"
}
Response: Updated contact object
```

### Delete a Contact

```
DELETE http://localhost:5000/api/contacts/:id
Response: { "message": "Contact deleted successfully" }
```

## Testing the Application

### Using the Web Interface

1. **Add a Contact:**
   - Click the "➕ Add New Contact" button
   - Fill in the form with:
     - Name: Your full name (minimum 2 characters)
     - Phone: Your phone number (minimum 10 digits)
     - Email: Your email address
   - Click "Add Contact"

2. **Edit a Contact:**
   - Click the "✏️ Edit" button on any contact card
   - Modify the information
   - Click "Update Contact"

3. **Delete a Contact:**
   - Click the "🗑️ Delete" button on any contact card
   - Confirm the deletion

### Using curl (Command Line)

```bash
# Create a contact
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "phoneNumber": "1234567890",
    "email": "john@example.com"
  }'

# Get all contacts
curl http://localhost:5000/api/contacts

# Update a contact (replace ID with actual contact _id)
curl -X PUT http://localhost:5000/api/contacts/ID \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "phoneNumber": "0987654321",
    "email": "jane@example.com"
  }'

# Delete a contact
curl -X DELETE http://localhost:5000/api/contacts/ID
```

## Validation Rules

### Contact Fields

- **Name**: Required, minimum 2 characters
- **Phone Number**: Required, minimum 10 digits (numeric only)
- **Email**: Required, valid email format

### Error Handling

- All validation errors are displayed in the form
- Server-side validation ensures data integrity
- Network errors are caught and displayed to the user

## Environment Variables

### Server (.env)

```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/contact_management_db?retryWrites=true&w=majority
```

### Client (.env.local)

```
VITE_API_URL=http://localhost:5000/api/contacts
```

## Code Comments

All code files include comprehensive comments explaining:

- Component purpose and functionality
- Function parameters and return values
- Validation logic
- Error handling mechanisms
- API integration details

Comments are added to:

- `server.js` - Server setup and middleware
- `config/db.js` - Database connection
- `models/Contact.js` - Schema definition
- `routes/contacts.js` - API endpoints
- `src/App.jsx` - Main React component
- `src/components/ContactForm.jsx` - Form component
- `src/components/ContactList.jsx` - List component
- `src/components/ContactCard.jsx` - Card component
- `src/api/contactAPI.js` - API utilities

## Technologies Used

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Mongoose** - MongoDB object modeling
- **MongoDB Atlas** - Cloud database
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

### Frontend

- **React** - UI library
- **Vite** - Build tool and dev server
- **JavaScript ES6+** - Modern JavaScript
- **CSS3** - Styling with responsive design

## Troubleshooting

### Backend Issues

**Error: "MongoDB connection failed"**

- Check your MongoDB URI in `.env`
- Ensure MongoDB Atlas cluster is active
- Verify network access (whitelist your IP in Atlas)
- Check username and password are URL-encoded if needed

**Error: "Port 5000 already in use"**

- Change PORT in `.env` to a different value
- Or kill the process using port 5000

### Frontend Issues

**Error: "Failed to load contacts"**

- Ensure backend server is running on port 5000
- Check network tab in browser DevTools
- Verify VITE_API_URL in `.env.local`

**CORS Errors**

- Backend should have CORS enabled (already configured)
- Check if backend server is running

## Performance Optimization

- Contact list is sorted by creation date (newest first)
- Form validation happens on client-side for instant feedback
- API calls use proper HTTP methods (GET, POST, PUT, DELETE)
- Responsive design works on desktop, tablet, and mobile

## Security Considerations

- Passwords and sensitive data should not be stored in contacts
- Environment variables are used for sensitive configuration
- Input validation prevents invalid data storage
- HTTPS should be used in production (configure in .env)

## Future Enhancements

- Contact search and filter functionality
- Contact categories/groups
- Import/export contacts
- Contact avatar/profile pictures
- SMS/Email notifications
- Advanced sorting options
- Multi-user support with authentication
- Backup and restore functionality

## License

This project is open source and available under the ISC License.

## Support

For issues or questions, please refer to the documentation or create an issue in the repository.

---

**Happy Contact Managing! 📇**
