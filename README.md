# QuickLink

A robust, flexible, and user-friendly URL Shortening service built with TypeScript, React, JavaScript, and Tailwind CSS. QuickLink empowers users to convert long URLs into compact, shareable links, complete with analytics and custom management features. Perfect for personal use, startups, or as a learning resource for full-stack web development.

---

## 🚀 Features

- **Shorten Any URL**  
  Instantly transform lengthy URLs into concise, easy-to-share short links.

- **Custom Aliases**  
  Create personalized, human-readable short codes or let the system auto-generate them.

- **Automatic Redirection**  
  Visitors to a short URL are seamlessly redirected to the original link.

- **Analytics Dashboard**  
  Track visits, referrers, and usage statistics for each short URL.

- **RESTful API**  
  Integrate URL shortening and analytics into your own applications via a simple HTTP API.

- **User Interface**  
  Clean, responsive web UI for shortening links, viewing analytics, and managing URLs.

- **Security**  
  Comprehensive input validation and error handling throughout.

---

## 🛠️ Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Redux (state management)
- **Backend:** Node.js (Express)
- **Database:** MongoDB Atlas
- **Other:** REST API, JWT, bcrypt

---

## 📖 How It Works

1. **Submit a URL**  
   Use the web UI or API to submit a long URL (optionally with a custom alias).

2. **Short Link Generation**  
   The backend generates a unique or custom short code and stores the mapping in the database.

3. **Redirection**  
   When a user accesses the short URL, the service looks up the code and redirects to the original URL.

4. **View Analytics**  
   The system logs visits and exposes analytics per link.

---

## 🌐 Web Interface

- **Home:**
  ![Home Screenshot](https://github.com/user-attachments/assets/f95d0fa4-6c14-4ae3-b102-de139c7d6d23)
  ![Home Screenshot 2](https://github.com/user-attachments/assets/cfd506ae-6972-4fc8-9015-934c9cb20fc0)

- **Analytics:**
  ![Analytics Screenshot](https://github.com/user-attachments/assets/942a5891-8f26-48dd-8a77-565c73de8b4e)

- **Shorten URL:**
  ![Shorten URL Screenshot](https://github.com/user-attachments/assets/db9cef49-5c62-44c1-8737-b720a462598f)

---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Anupam2005-tech/URLShortner.git
   cd URLShortner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   - Create a `.env` file (`PORT`, `DATABASE_URI`, `ORIGIN`, etc.)
    

4. **Run the Application**
   ```bash
   npm start
   ```
   The server will start on `http://localhost:8000` (or your configured port).

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository and create a pull request.  
Open an issue to discuss new features or report bugs.

---

## 📄 License

[MIT](LICENSE)

---

## 🗨️ Contact

For questions, feedback, or support, open an [issue](https://github.com/Anupam2005-tech/URLShortner/issues) or contact [Anupam2005-tech](https://github.com/Anupam2005-tech).
