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
## Pages
1. Signup page:
 1. Student
 ![Student Signup Page](https://i.imgur.com/NjZZNM7.png)
 2. Trustee
 ![Trustee Signup Page](https://i.imgur.com/mNXUZbb.png)
 3. Admin
![Admin Signup Page](https://i.imgur.com/bgFp97m.png)
    
2. Signin page:
![Sign in Page](https://i.imgur.com/2gN5dSZ.png)
3. Profile Pages:
    1. Student
    ![Student Profile](https://i.imgur.com/UntaWBR.png)
    2. Trustee
    ![Project Structure](https://i.imgur.com/IhM0twV.png)
    3. Admin
    ![Project Structure](https://i.imgur.com/IhM0twV.png)
4. Make Payment
    1. Before payment 
    ![Project Structure](https://i.imgur.com/cCS9V8G.png)
    2. During payment
    ![Project Structure](https://i.imgur.com/ZvDLiOv.png)
    3. After Payment
    ![Project Structure](https://i.imgur.com/IhM0twV.png)
5. Trustee Fees Update Page
    ![Project Structure](https://i.imgur.com/IhM0twV.png)
6. Admin Fees Page
    ![Project Structure](https://i.imgur.com/IhM0twV.png)

## 🛠️ Tech Stack

- **Frontend**: React.js + Vite  
- **Styling**: Tailwind CSS  
- **Routing & Requests**:
  - React Router  
  - Axios

---

## 📁 Project Structure
![Project Structure](https://i.imgur.com/IhM0twV.png)

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
