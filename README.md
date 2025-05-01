# Employee360

**Employee360** is an intelligent, full-stack web platform that helps organizations **predict employee attrition**, monitor workforce trends, and optimize retention strategies using machine learning.

> 💼 Designed for HR teams to make smarter, data-driven decisions.

---

## 📌 Features

- 🔐 **Secure Login & Role-based Access** for HR Managers & Admins
- 👤 **Add / Edit / Remove Employees** with all relevant ML fields
- 📊 **Interactive Dashboard** with monthly attrition stats and demographics
- 🧠 **ML-Powered Prediction** with attrition probability and top 3 influencing factors
- 🗃 **Track Attrition by Month** using `leavingMonth` field
- 📤 **Export to Excel** – Easily download filtered employee data
- 💬 **SHAP Explainability** – Understand why attrition is predicted

---

## 🧰 Tech Stack

| Layer        | Technology                         |
|--------------|-------------------------------------|
| Frontend     | React (Vite) + TypeScript + Tailwind CSS |
| Backend      | Node.js + Express.js + MongoDB (Mongoose) |
| ML Service   | Python + Flask + Scikit-learn + SHAP |
| Visualization| Recharts                           |
| Dev Tools    | Docker, Docker Compose, Jenkins, GitHub |

---

## 📂 Project Structure
```
employee360/ 
  ├── frontend/ # React Frontend 
  ├── backend/ # Express Backend  
  ├── model-api/ # Flask ML API   
  ├── docker-compose.yml 
  ├── Jenkinsfile
```

---

## ⚙️ Setup Instructions

### 🚀 Run Locally (Dev Mode)

```bash
# 1. Clone the project
git clone https://github.com/yourusername/employee360.git
cd employee360

# 2. Install backend
cd frontend && npm install

# 3. Install frontend
cd ../frontend && npm install

# 4. Run backend
cd ../backend
npm run dev

# 5. Run ML API
cd ../model-api
pip install -r requirements.txt
python app/main.py

# 6. Run frontend
cd ../frontend
npm run dev
```
## Docker Setup

### Build and run the entire stack
```
docker-compose up --build

```
## 🛠 Jenkins CI/CD Pipeline
Employee360 is fully CI/CD ready with Jenkins and Docker.

### 💡 Jenkinsfile Workflow
```
Clone GitHub repo

Build Docker images using docker-compose build

Deploy services using docker-compose up 
```
