# Managio

A full-stack web application built to help small-scale business owners manage their **warehouse stocks**, **purchase and sales records**, and view **basic business statistics** — all in one place.

## 🚀 Features

- 📋 Track product inventory across warehouses
- 🛒 Manage purchases and sales transactions
- 📊 View simple statistics on sales, purchases, and stock levels
- 💻 Built with separate `client` and `server` structure for clean modular development

## 🏗️ Tech Stack

- **Frontend**: React (located in `/client`)
- **Backend**: Node.js + Express (located in `/server`)

## 📦 Installation

To install all required dependencies for the entire project (root, client, and server):

```bash
npm run initialize
```

## 🔑 Environment Variables

This project requires certain environment variables to be configured for proper functionality. A sample `.envSample` file is provided in the root directory to guide you.

### Steps to Configure:
1. **Copy the `.envSample` file**:
   ```bash
   cp .envSample .env
   ```
   On Windows, you can manually duplicate the file and rename it to `.env`.

2. **Edit the `.env` file**:
   Open the `.env` file in your preferred text editor and replace the placeholder values with your actual credentials and configuration details.

3. **Save the file** and ensure it is not committed to version control by keeping `.env` in the `.gitignore` file.

## 🧪 Scripts

| Script              | Description                                     |
|---------------------|-------------------------------------------------|
| `npm run client`    | Starts the frontend (React)                     |
| `npm run server`    | Starts the backend (Express)                    |
| `npm run dev`       | Starts both client and server concurrently      |
| `npm run initialize`| Installs all dependencies (root, client, server)|