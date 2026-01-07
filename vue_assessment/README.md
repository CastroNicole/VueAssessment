# Vue Contact List Assessment

A comprehensive contact management application built with Vue 3, featuring full CRUD operations, state management with Pinia, routing with Vue Router, and styled with Tailwind CSS.

## Features

✅ **Component Reusability** - Modular Vue components for maintainability  
✅ **Smart/Dumb Component Design** - Proper parent-child communication with props & emit  
✅ **State Management** - Pinia for efficient global state management  
✅ **Vue Router** - Navigation between different views/pages with 404 handling  
✅ **HTTP CRUD Operations** - Full Create, Read, Update, Delete functionality  
✅ **Form Validation** - Client-side validation with error messages  
✅ **Responsive Design** - Tailwind CSS for modern, responsive UI  
✅ **Card & Table Views** - Toggle between different contact display modes  
✅ **Mock Backend** - JSON Server for API simulation  

## Project Setup

### Prerequisites
- Node.js (v20.19.0 or higher)

### Installation

1. Install dependencies:
```bash
npm install
```

## Running the Application

You need to run **TWO terminals** simultaneously:

### Terminal 1: JSON Server (Mock Backend)
```bash
npm run server
```
This starts the JSON Server on http://localhost:3000

### Terminal 2: Vite Dev Server (Frontend)
```bash
npm run dev
```
This starts the Vue app on http://localhost:5173 (or another port if 5173 is busy)

## Project Structure

```
vue_assessment/
├── src/
│   ├── components/
│   │   ├── Homepage/           # Main page with contact list
│   │   ├── ContactCard/        # Card view component
│   │   ├── ContactTable/       # Table view component
│   │   ├── ContactInfo/        # Individual contact view page
│   │   ├── Modals/
│   │   │   ├── FormModal/      # Add/Edit contact form
│   │   │   └── DeleteModal/    # Delete confirmation modal
│   │   └── NotFound/           # 404 page
│   ├── stores/
│   │   └── contactStore.js     # Pinia store for state management
│   ├── router/
│   │   └── index.js            # Vue Router configuration
│   ├── App.vue                 # Root component
│   ├── main.js                 # App entry point
│   └── style.css               # Tailwind CSS imports
├── db.json                     # JSON Server database
└── tailwind.config.js          # Tailwind configuration
```

## Features Breakdown

### 1. Contact List Views
- **Card View**: Grid layout displaying contacts as cards
- **Table View**: Tabular layout with sortable columns
- Toggle between views with icon buttons

### 2. CRUD Operations
- **Create**: Add new contacts with validation
- **Read**: View all contacts and individual contact details
- **Update**: Edit existing contact information
- **Delete**: Remove contacts with confirmation modal

### 3. Form Validation
- Required field validation
- Email format validation
- Real-time error messages
- Visual feedback for validation states

### 4. Routing
- `/` - Homepage with contact list
- `/contact/:id` - Individual contact details
- `/*` - 404 Not Found page

### 5. State Management
- Centralized state with Pinia
- Async API calls
- Alert notifications
- Loading states

## Technologies Used

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next generation frontend tooling
- **Pinia** - State management
- **Vue Router** - Official routing library
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **JSON Server** - Mock REST API

## Build for Production

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

## Assessment Criteria Compliance

✅ **Component Reusability** - All components are modular and reusable  
✅ **Smart/Dumb Design** - Proper encapsulation with props & emit  
✅ **State Management** - Pinia for global state  
✅ **Vue Router** - Full routing implementation  
✅ **HTTP CRUD** - Complete CRUD with Axios  
✅ **Form Validation** - Client-side validation with error handling  
✅ **UI/UX** - Tailwind CSS with responsive design  
✅ **404 Page** - Custom not found page

## Notes

- The application uses JSON Server as a mock backend
- All contact data persists in `db.json`
- Form validation includes required fields and email format checking
- Success/error alerts appear for all CRUD operations
- The design follows modern UI/UX principles with Tailwind CSS
