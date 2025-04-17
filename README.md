# MediVault 🏥

The **MediVault** is a web-based application designed to streamline the management of medical records for doctors and patients. It provides a user-friendly interface for doctors to upload prescriptions and for patients to view their health history and prescriptions.

## Features ✨

### For Doctors 👨‍⚕️:
- 📝 View a list of patients.
- 📤 Upload prescriptions for selected patients.
- 📋 View recent prescriptions.

### For Patients 👩‍⚕️:
- 📄 View recent prescriptions with details such as diagnosis, medications, and notes.
- 📜 Access health history, including ongoing and resolved conditions.

### General 🌐:
- 🔐 Role-based login for doctors and patients.
- 📱 Responsive design using Material-UI.
- 🛠️ Backend API for managing prescriptions and health history.

## Tech Stack 🛠️

### Frontend 🌟:
- **React** ⚛️: For building the user interface.
- **React Router** 🚦: For navigation between views.
- **Material-UI** 🎨: For pre-styled components and responsive design.

### Backend 💻:
- **Express.js** 🚀: For creating RESTful APIs.
- **CORS** 🌍: For handling cross-origin requests.

### Database 🗄️:
- Mock in-memory database (can be replaced with a real database in production).

### Build Tool ⚡:
- **Vite** ⚡: For fast development and optimized builds.

## Installation 🛠️

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/medical-records-system.git
   cd medical-records-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the backend server:
   ```bash
   node server.js
   ```

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

5. Open the application in your browser at [http://localhost:3000](http://localhost:3000).

## Project Structure 📂

```
medical-records-system/
├── index.html
├── package.json
├── server.js
├── vite.config.js
├── src/
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── services/
│   │   └── api.js
│   ├── views/
│   │   ├── DoctorDashboard.jsx
│   │   ├── Login.jsx
│   │   └── PatientDashboard.jsx
```

### Key Files 📄:
- **`src/views/DoctorDashboard.jsx`**: Doctor's dashboard for managing patients and prescriptions.
- **`src/views/PatientDashboard.jsx`**: Patient's dashboard for viewing prescriptions and health history.
- **`src/views/Login.jsx`**: Login page for role-based access.
- **`src/services/api.js`**: API service for interacting with the backend.
- **[`server.js`](vite.config.js)**: Backend server with RESTful APIs.

## API Endpoints 🔗

### Prescriptions:
- **POST** `/api/prescriptions`: 📤 Upload a new prescription.
- **GET** `/api/prescriptions/:patientId`: 📄 Get prescriptions for a specific patient.

### Health History:
- **POST** `/api/health-history/:patientId`: 📝 Add a new health history entry.
- **GET** `/api/health-history/:patientId`: 📜 Get health history for a specific patient.

## Future Enhancements 🚀
- 🔒 Add authentication and authorization.
- 🗄️ Integrate a real database (e.g., MongoDB, PostgreSQL).
- 📂 Add support for uploading and storing medical documents.
- 📊 Implement analytics for doctors and patients.

## License 📜

This project is licensed under the MIT License. See the LICENSE file for details.

---

Feel free to contribute to this project by submitting issues or pull requests! 🤝
