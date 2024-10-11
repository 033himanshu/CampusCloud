# Campus Cloud Backend

The **Campus Cloud Backend** is a comprehensive server-side implementation designed to streamline academic and administrative processes in an educational institution. This system is built with **Node.js**, **Express**, **MongoDB**, and various cloud services such as **Cloudinary** for file management. The platform offers distinct roles for **administrators**, **teachers**, and **students**, with specific functionalities tailored to their needs. Each user role has controlled access, enabling a robust and secure system for managing educational workflows.

This project is built using the **Model-View-Controller (MVC)** architecture, ensuring clean code separation and maintainability. Below is a detailed description of each aspect of the project.

This backend project is designed to be scalable and extendable. It can handle multiple departments, courses, and users, providing a full-fledged academic solution for institutions of all sizes. The system’s modular structure allows developers to easily add new features and customize existing ones for specific institutional needs.

---

## Key Features and Functionalities

### 1. User Roles and Authentication
- **Admin**:
  - Register and manage students and teachers.
  - Create and manage courses, subjects, and departments.
  - Assign roles and handle user permissions.
  
- **HoD (Head of Department)**:
  - Assign teachers to subjects and manage their course loads.
  - Oversee department-specific academic activities.
  
- **Teachers**:
  - Manage their assigned classes, upload materials, and track student progress.
  - Create announcements, quizzes, and assessments for students.
  
- **Students**:
  - Access course materials, take quizzes, and view announcements.
  - Check their attendance, scores, and interact with available resources.

Authentication is handled through **JWT tokens** for secure access and role-based authorization across the system.

---

### 2. Models and Schema Definitions
The platform utilizes **Mongoose** to model and interact with the **MongoDB** database. Some key schemas include:

- **User**: Defines a user's basic properties such as name, email, password (hashed), and role.
- **Course**: Represents courses offered by the institution, with fields for course name, department, and maximum semesters.
- **Department**: Contains information about each department, including the HoD responsible for it.
- **Subject**: Includes the subject name, course association, and assigned teachers.
- **Class**: Represents a class for a subject, linking students and materials to it.
- **Material**: Stores uploaded files such as documents, presentations, or videos for classes.
- **Quiz**: Tracks quizzes for students, including their scores, answers, and whether they’ve attempted it.
- **Announcement**: Stores notifications and updates for students and teachers.

---

### 3. File Uploads and Material Management
Teachers can upload files and materials for their classes, which are stored using **Cloudinary** cloud storage. The backend handles the following tasks:

- **Material Upload**: Teachers can upload files (PDFs, presentations, videos) for students.
- **File Management**: Uploaded files are managed efficiently, allowing the system to delete or update files using Cloudinary’s API.
- **Cloudinary Integration**: Utilizes Cloudinary for storing files and media securely in the cloud, ensuring files are accessible and efficiently managed.

---

### 4. Quizzes and Assessments
The **Quiz** feature allows teachers to create quizzes related to their subjects. It includes:

- **Quiz Schema**: Tracks students’ attempts, answers, and scores.
- **Score Management**: Provides analytics such as minimum, maximum, and average scores for student evaluation.
- **Automated Grading**: Teachers can create quizzes that are automatically graded based on predefined answers.

---

### 5. Announcements and Notifications
- **Announcements**: Teachers and admins can post announcements, which are automatically delivered to relevant students.
- **Notifications**: Students and teachers receive notifications for important updates, class materials, announcements, and new quizzes.

The system ensures that announcements are properly targeted and delivered only to the relevant users.

---

### 6. Attendance Tracking
The system can track student attendance across classes. Students can view their attendance records, and teachers can manage them.

- **Attendance Schema**: Stores attendance details, which are populated for individual students.
- **Class Association**: Attendance is linked to specific classes and subjects, allowing detailed tracking.

---

### 7. Security and Validation
- **JWT Authentication**: Ensures only authorized users can access specific routes and functionalities.
- **Data Validation**: Utilizes validation libraries and custom validators to ensure clean data entry, preventing invalid records from entering the system.

---

### 8. REST API Structure
The backend is designed as a **RESTful API**, following best practices for managing routes and responses. The system includes the following route structures:

- **User Routes**: Handles registration, login, and role-based access.
- **Admin Routes**: Manages courses, students, teachers, and announcements.
- **Teacher Routes**: Allows teachers to upload materials, create quizzes, and manage classes.
- **Student Routes**: Enables students to view materials, take quizzes, and track their academic progress.

---

### 9. Error Handling
The system has a robust error-handling mechanism. It uses a custom **ApiError** class to handle various errors gracefully:

- **404 Errors**: Triggered when resources like courses or users are not found.
- **403 Errors**: Used when an unauthorized user attempts to access or modify data.
- **500 Errors**: Catches any internal server errors that occur.

---

## Technologies Used

- **Node.js**: Server-side JavaScript runtime.
- **Express.js**: Web framework for building the REST API.
- **MongoDB**: NoSQL database for data storage.
- **Mongoose**: ODM for MongoDB, used for schema modeling and data interaction.
- **JWT**: For secure token-based authentication.
- **Cloudinary**: Cloud service for managing file uploads.
- **Multer**: Middleware for handling file uploads.
- **Dotenv**: For managing environment variables securely.
