# 🎓 Edviron Frontend Assignment

🌐 **Live Site**: [https://your-live-site-link.com](https://your-live-site-link.com)
> A responsive and user-friendly interface for the **School Payments and Dashboard** application. This platform allows students to pay school fees, trustees to monitor their respective school’s transactions, and admins to oversee all schools — ensuring secure, role-based, and organized management of education payments.

---

## 🚀 Features

- **Role-Based Access Control (RBAC)** with 3 roles:
  - 👨‍🎓 **Student**:  
    - Can only pay fees for their own school.
    - Fee payment is fixed based on the school’s fee structure × number of months — avoiding discrepancies like underpayment or overpayment.
    - Can view all their previous transactions for transparency and clarity.
  - 🏫 **Trustee**:  
    - Can view payments made **only** to their associated school.
    - No access to data of other schools, ensuring data privacy and relevance.
  - 🛡️ **Admin**:  
    - Has access to **all** transactions.
    - Can monitor payments across every school listed on the platform.

- **Transaction Dashboard**:
  - Filter, sort, search, and paginate through payment history.
  - View individual or aggregated data based on role.

---

## 📄 Pages

### 1. Signup Pages
- **Student Signup**
  ![Student Signup Page](https://i.imgur.com/NjZZNM7.png)
- **Trustee Signup**
  ![Trustee Signup Page](https://i.imgur.com/mNXUZbb.png)
- **Admin Signup**
  ![Admin Signup Page](https://i.imgur.com/bgFp97m.png)

### 2. Signin Page
![Sign in Page](https://i.imgur.com/2gN5dSZ.png)

### 3. Profile Pages
- **Student Profile**
  ![Student Profile](https://i.imgur.com/UntaWBR.png)

### 4. Make Payment Flow
- **Before Payment**
  ![Before Payment](https://i.imgur.com/cCS9V8G.png)
- **During Payment**
  ![During Payment](https://i.imgur.com/ZvDLiOv.png)
- **After Payment**
  ![After Payment](https://i.imgur.com/3SIOGAe.png)

### 5. Trustee Fee Update Page
![Trustee Fee Update Page](https://i.imgur.com/JZnKKWW.png)

### 6. Admin Fee Overview Page
![Admin Fee Page](https://i.imgur.com/yCPzapF.png)

---

## 🛠️ Tech Stack

- **Frontend**: React.js + Vite  
- **Styling**: Tailwind CSS  
- **Routing & Requests**:
  - React Router  
  - Axios

---

## 📁 Project Structure

```text
📦 EdvironFrontend
├── App.css
├── App.jsx
├── assets
│   ├── edviron.svg
│   └── react.svg
├── components
│   ├── AppBar.jsx
│   └── PrivateRoute.jsx
├── data
│   └── schools.js
├── index.css
├── main.jsx
└── pages
    ├── Dashboard
    │   ├── AllOrders.jsx
    │   ├── DashboardLayout.jsx
    │   ├── FeeUpdates.jsx
    │   ├── MakePayment.jsx
    │   ├── PaymentCallback.jsx
    │   ├── Profile.jsx
    │   └── TransactionsTable.jsx
    ├── Signin.jsx
    └── Signup.jsx

```

##  🧑‍💻 Setup Instructions

```bash
git clone https://github.com/slyjain/EdvironFrontend.git
cd EdvironFrontend
npm install
npm run dev
