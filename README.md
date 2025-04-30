# 🎓 Edviron Frontend Assignment

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

## 🛠️ Tech Stack

- **Frontend**: React.js + Vite  
- **Styling**: Tailwind CSS  
- **Routing & Requests**:
  - React Router  
  - Axios

---

## 📁 Project Structure
<pre lang="text"><code> 📦 EdvironFrontend ├── App.css ├── App.jsx ├── assets │ ├── edviron.svg │ └── react.svg ├── components │ ├── AppBar.jsx │ └── PrivateRoute.jsx ├── data │ └── schools.js ├── index.css ├── main.jsx └── pages ├── Dashboard │ ├── AllOrders.jsx │ ├── DashboardLayout.jsx │ ├── FeeUpdates.jsx │ ├── MakePayment.jsx │ ├── PaymentCallback.jsx │ ├── Profile.jsx │ └── TransactionsTable.jsx ├── Signin.jsx └── Signup.jsx </code></pre>

---

## 🧑‍💻 Setup Instructions

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Getting Started

```bash
git clone https://github.com/slyjain/EdvironFrontend.git
cd EdvironFrontend
npm install
npm run dev
