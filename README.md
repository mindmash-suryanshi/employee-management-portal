# Employee Management Portal

A responsive React-based Employee Management Portal for managing
employees, attendance, leave requests, timesheets, and profile
information through a clean and reusable admin dashboard interface.

## ✨ Features

### Authentication

- Login using the DummyJSON authentication API
- Protected routes
- Local Storage-based authentication session
- Logout functionality

### Dashboard

- Total employees
- Present employees
- Absent employees
- Pending leave requests
- Pending timesheets
- Recent employee activities
- Responsive dashboard layout

### Employee Management

- View all employees
- Search employees
- Filter by department and job title
- Sort employees
- View employee profiles
- Add employees
- Edit employee information
- Delete employees
- Pagination

### Attendance

- Daily attendance summary
- Present/absent status
- Employee search and status filtering
- Monthly attendance detail
- Check-in and check-out information
- Responsive attendance tables

### Leave Management

- Leave summary
- Pending, approved, and rejected requests
- Apply for leave
- Approve or reject leave requests
- Leave history
- Upcoming holidays
- Leave filtering and pagination
- Local Storage persistence

### Timesheets

- Total, pending, approved, and rejected timesheets
- Filter by status
- View timesheet details
- Approve/reject timesheets
- Pagination
- Responsive table with mobile scrolling

### Profile

- View personal information
- Contact information
- Employment information
- Edit profile details
- Profile data persisted through Local Storage

### UI & Responsiveness

- Responsive layout across desktop, tablet, and mobile
- Reusable UI components
- MUI icons and components
- Custom 404 page
- Page fade-in transitions
- Mobile-friendly tables with controlled horizontal scrolling
- Consistent color system and spacing

## 🛠️ Tech Stack

- React
- JavaScript
- HTML5
- CSS3
- React Router
- Material UI (MUI)
- Vite
- DummyJSON API
- Local Storage
- Mock JSON data

## 📁 Project Structure

```text
src/
├── components/
│   ├── Attendance/
│   ├── Employee/
│   ├── Leave/
│   ├── Profile/
│   ├── Timesheet/
│   ├── MainLayout/
│   └── ...
│
├── data/
│   └── attendanceData.js
│
├── hooks/
│   ├── useAttendance.js
│   ├── useEmployees.js
│   ├── useEmployeeFilters.js
│   ├── useLeaves.js
│   ├── useProfile.js
│   └── ...
│
├── pages/
│   ├── Login.jsx
│   ├── Dashboard.jsx
│   ├── Employees.jsx
│   ├── EmployeeProfile.jsx
│   ├── AddEmployee.jsx
│   ├── EditEmployee.jsx
│   ├── Attendance.jsx
│   ├── Leaves.jsx
│   ├── Timesheets.jsx
│   ├── Profile.jsx
│   └── NotFound.jsx
│
├── services/
│   ├── authService.js
│   ├── employeeService.js
│   ├── attendanceService.js
│   ├── leaveService.js
│   └── ...
│
├── styles/
│   ├── Dashboard.css
│   ├── Employees.css
│   ├── Attendance.css
│   ├── Profile.css
│   └── ...
│
├── utils/
│   ├── storage.js
│   └── mockData/
│
├── routes/
│   ├── AppRoutes.jsx
│   └── ProtectedRoute.jsx
│
├── App.jsx
└── main.jsx

public/
└── favicon.png
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd <your-project-folder>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Vite will provide the local development URL in the terminal.

### 4. Build for production

```bash
npm run build
```

### 5. Preview the production build

```bash
npm run preview
```

## 🔌 APIs & Data

The project uses:

- **DummyJSON Authentication API** for login
- **DummyJSON Users API** for employee data
- Local mock data for attendance, leaves, timesheets, and recent
  activities
- Local Storage for authentication and mutable leave/profile data

API calls are kept inside service files so that components remain
focused on presentation and application logic.

## 🧭 Routes

Route Page

---

`/login` Login
`/dashboard` Dashboard
`/employees` Employee List
`/employees/:id` Employee Profile
`/add-employee` Add Employee
`/edit-employee/:id` Edit Employee
`/attendance` Attendance
`/leaves` Leave Management
`/timesheets` Timesheets
`/profile` My Profile
`/*` Custom 404

## 🎨 Design System

The portal follows a clean blue-based admin dashboard design.

Purpose Color

---

Primary `#2563EB`
Secondary `#3B82F6`
Success `#22C55E`
Danger `#EF4444`
Background `#F8FAFC`
Border `#E5E7EB`

Reusable components and separate CSS files are used to keep the project
maintainable and consistent.

## 📱 Responsive Design

The portal is designed to work across:

- Desktop
- Laptop
- Tablet
- Mobile

Tables use internal horizontal scrolling on smaller screens where
necessary, while desktop layouts use the available content width without
unnecessary horizontal scrollbars.

## 💾 Data Persistence

Local Storage is used for selected application state, including:

- Authentication session
- Leave requests and status updates
- Profile updates

Mock attendance and timesheet data are used for demonstration purposes.

## 🔒 Route Protection

Protected application pages are wrapped with a protected route that
checks whether an authenticated user exists in Local Storage.

Unauthenticated users are redirected to the login page.

## 🧩 Reusable Components

The project uses reusable components for common UI and functionality,
including:

- Stat Cards
- Search Bar
- Filter Select
- Tables
- Pagination
- Form Fields
- Sidebar
- Navbar
- Confirmation Dialog
- Page Transitions
- Profile components

This keeps the pages modular and makes future changes easier to
maintain.

## 👩‍💻 Author

**Suryanshi Sharma**
