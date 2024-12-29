# Job Seeking & Recruiting System 🚀👩‍💻👨‍💻

Welcome to the Job Seeking & Recruiting System! 🎉 This is a full-stack web application built using the **PERN stack** (PostgreSQL, Express, React, Node) to connect job seekers and recruiters. 🤝 Whether you're a job seeker looking for your next opportunity or a recruiter looking for talent, this platform provides all the tools you need! 🌟

[Watch Demo](https://www.linkedin.com/posts/muhammad-ali-666b372aa_%F0%9D%90%84%F0%9D%90%B1%F0%9D%90%9C%F0%9D%90%A2%F0%9D%90%AD%F0%9D%90%9E%F0%9D%90%9D-%F0%9D%90%AD%F0%9D%90%A8-%F0%9D%90%AC%F0%9D%90%A1%F0%9D%90%9A%F0%9D%90%AB%F0%9D%90%9E-%F0%9D%90%A6%F0%9D%90%B2-%F0%9D%90%A5-activity-7279147623343665152-WWNu?utm_source=share&utm_medium=member_desktop)

## Features ✨

### 1. **Authentication** 🔐
- **Job Seekers** and **Recruiters** can register and log in. 👤🔑
- JWT (JSON Web Tokens) are used for secure authentication. 🔒

### 2. **User Profiles** 🧑‍💼
- Both job seekers and recruiters can edit their profiles, adding necessary details to help each other stand out! 💼📑
- The profiles include essential information like contact details, experience, skills, etc. 📋

### 3. **Job Ads** 📢
- **Recruiters** can post job advertisements, detailing job descriptions and questions to filter applicants. 📄📝
- **Job Seekers** can browse job ads, apply, and check the status of their applications! 📑✅

### 4. **Application Management** 📬
- **Recruiters** can view and manage job applications in their dashboard. 🎮
- They can **accept** or **reject** applicants based on qualifications and responses to job questions. 🚫✅

### 5. **Job Seeker Dashboard** 📊
- **Job Seekers** have their own dashboard to track the status of all their job applications. 📅🔍
- Notifications 📲 alert job seekers when their applications are accepted, including interview details like location and timing! ⏰

### 6. **Search Functionality** 🔍
- A **search bar** allows users to search for job listings, recruiters, or job seekers and view their profiles. 🔎

### 7. **Job Expiry System** ⏳
- Job ads **expire** automatically after their deadline passes, and are **hidden** from search results. 🕑❌
- Only the **recruiter** who created the job ad can view it once it has expired. 👀

### 8. **Security** 🛡️
- **React Quill** is used for rich text editing in job descriptions and other fields. ✍️
- **DOMPurify** ensures that the content from the editor is sanitized and **free from XSS attacks**. 🛡️

### 9. **Real-time Notifications** 📰
- **React-Toastify** is used to display notifications in real-time for actions such as job application status changes. 🔔

### 10. **Automation with Node-Cron** ⏱️
- **Node-Cron** is used in the backend to automate the process of removing expired job ads from public visibility. 🗑️

## Tech Stack ⚙️

- **Frontend**: 
  - **React** ⚛️
  - **Tailwind CSS** for styling 🌈
  - **Zustand** for state management 🔄
  - **React-Toastify** for toasts 🔥
  - **React-Quill** for rich text editor ✨
  - **DOMPurify** for XSS protection 🔒

- **Backend**: 
  - **Node.js** with **Express** 🖥️
  - **PostgreSQL** with **pg library** 🛠️
  - **JWT Authentication** for secure login 🔑
  - **Node-Cron** for job ad expiration automation ⏰

## Installation 📦

### Prerequisites 🛠️

Make sure you have the following installed on your machine:
- **Node.js** (v14 or above) 🌐
- **PostgreSQL** database 📦
- **npm** or **yarn** (package manager) 📂
