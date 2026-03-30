# MyContacts

A contact management web application built with React. Create, view, edit, and delete contacts with an intuitive interface featuring search, sorting, and form validation.

This project was developed as part of the **Fullstack JavaScript course** by [Mateus Silva](https://jstack.com.br).

## Features

- **Contact List** - View all contacts with name, email, phone, and category
- **Search** - Real-time search by contact name
- **Sorting** - Toggle between ascending and descending order
- **Create Contact** - Add new contacts with a validated form
- **Edit Contact** - Update existing contact information
- **Delete Contact** - Remove contacts from the list
- **Form Validation** - Required fields, email validation, and phone formatting
- **Loading States** - Visual feedback during API requests

## Tech Stack

- **React** 17.0.2
- **React Router DOM** 5.3.0
- **Styled Components** 6.3.11
- **Create React App** 5.0.1

## Prerequisites

- Node.js
- Yarn or npm
- Backend API running on `http://localhost:3001`

## Getting Started

1. Install dependencies:

```bash
yarn install
```

2. Start the development server:

```bash
yarn start
```

The app will open at [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command | Description |
|---------|-------------|
| `yarn start` | Run the app in development mode |
| `yarn build` | Build the app for production |
| `yarn test` | Launch the test runner |

## Project Structure

```
src/
├── assets/          # Images, icons, and global styles
├── components/      # Reusable UI components
│   ├── App/         # Main app wrapper with routing and theming
│   ├── Button.js    # Styled button (default and danger variants)
│   ├── ContactForm/ # Form for creating/editing contacts
│   ├── FormGroup/   # Form field wrapper with error display
│   ├── Header/      # Logo header
│   ├── Input.js     # Styled input field
│   ├── Loader/      # Loading spinner overlay (portal-based)
│   ├── Modal/       # Modal dialog
│   ├── PageHeader/  # Page header with back navigation
│   └── Select.js    # Styled select dropdown
├── hooks/           # Custom React hooks
├── pages/           # Route pages
│   ├── Home/        # Contact list with search and sort
│   ├── NewContact/  # Create contact form
│   └── EditContact/ # Edit contact form
├── services/        # API communication layer
└── utils/           # Utility functions
```
