# Plus Size Clothing Store Project

## Description

Welcome to the **SizeUp** clothing store project! This is a single-page application (SPA) e-commerce platform that allows users to browse a catalog of plus-size clothing products, add items to the shopping cart, manage their accounts, and efficiently process orders.

The application is designed to provide an intuitive and responsive user experience, with a robust backend that handles authentication, product management, carts, and orders.

## Features

- **Product Catalog**: Browse categories and products with variants (sizes, colors).
- **Shopping Cart**: Add, update, and remove products from the cart.
- **User Management**: User registration, login, and account management.
- **Orders**: Create and track orders.
- **Secure Authentication**: JWT-based secure sessions.
- **Responsive Interface**: Design adaptable to different devices.

## Technologies Used

### Frontend
- **HTML5**: Application structure.
- **CSS3**: Styles and responsive design.
- **JavaScript (ESM)**: Client logic and event handling.
- **Vite**: Development and fast build tool.

### Backend
- **Node.js**: Server runtime environment.
- **Express.js**: Framework for building the REST API.
- **MySQL**: Relational database for storing products, users, and orders.
- **bcryptjs**: Password encryption.
- **jsonwebtoken**: JWT-based authentication.
- **CORS**: Cross-origin request handling.
- **dotenv**: Environment variable management.

## Project Structure

```
projecto_martha_backend-main/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Business logic for each endpoint
│   │   ├── middleware/      # Authentication middleware
│   │   ├── models/          # Data models and DB connection
│   │   ├── routes/          # API route definitions
│   │   └── server.js        # Server entry point
│   ├── ecommerce.sql        # Database script
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── controllers/     # Controllers for views
│   │   ├── routes/          # Frontend routing
│   │   ├── styles/          # CSS files
│   │   ├── utils/           # Utility functions
│   │   ├── views/           # Application views
│   │   └── main.js          # Frontend entry point
│   ├── index.html
│   └── package.json
├── package.json
└── README.md
```

## Installation and Setup

### Prerequisites
- Node.js (version 14 or higher)
- MySQL (version 8.0 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root of the `backend/` folder with your database configuration:
   ```env
   DB_HOST=localhost
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=ecommerce
   PORT=3000
   JWT_SECRET=your_super_secure_secret_key_2024
   ```

4. Import the SQL script to create the database and tables:
   - Use a tool like phpMyAdmin or run the script in your MySQL terminal:
     ```sql
     SOURCE ecommerce.sql;
     ```

5. Start the backend server:
   ```bash
   npm start
   ```
   The server will run at `http://localhost:3000`.

### Frontend Setup

1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend application:
   ```bash
   npm run dev
   ```
   Open your browser and go to the URL provided by Vite (usually `http://localhost:5173`).

### Verification
- Backend: Visit `http://localhost:3000` to confirm the server is running.
- Frontend: The application should load in your browser with the user interface.

## Deployment

### Backend Deployment

1. **Set up a cloud database**:
   - Use a service like PlanetScale, AWS RDS, or Google Cloud SQL for MySQL.
   - Create a new database and save the credentials (host, user, password, DB name).

2. **Update environment variables**:
   - Modify the `.env` file in the `backend/` folder with production credentials:
     ```env
     DB_HOST=your_production_host
     DB_USER=your_production_user
     DB_PASSWORD=your_production_password
     DB_NAME=your_production_db
     PORT=3000
     JWT_SECRET=your_super_secure_production_secret_key
     ```

3. **Deploy on Heroku** (example):
   - Install the Heroku CLI if not installed: `npm install -g heroku`
   - Create a new app: `heroku create your-backend-app`
   - Configure environment variables in Heroku:
     ```bash
     heroku config:set DB_HOST=your_host
     heroku config:set DB_USER=your_user
     heroku config:set DB_PASSWORD=your_password
     heroku config:set DB_NAME=your_db
     heroku config:set JWT_SECRET=your_secret
     ```
   - Push the code: `git push heroku main`
   - Run DB migrations if needed.

4. **Verify deployment**:
   - Visit the Heroku URL to confirm the API is working.

### Frontend Deployment

1. **Build the application**:
   - Inside the `frontend/` folder, run:
     ```bash
     npm run build
     ```
   - This generates a `dist/` folder with optimized files.

2. **Deploy on Netlify** (example):
   - Upload the `dist/` folder to Netlify (drag & drop on the website).
   - Or connect your Git repository for automatic deployments.
   - Configure the backend API URL in Netlify environment variables if needed.

3. **Verify deployment**:
   - Visit the Netlify URL to confirm the app loads correctly.

### Additional Notes
- Ensure the frontend points to the production backend API URL.
- Use HTTPS in production for security.
- Monitor performance and error logs on your hosting services.

## Usage

Once both servers are running:
1. Register or log in to the application.
2. Browse the product catalog.
3. Add products to the cart.
4. Proceed to checkout to complete your order.

The application uses hash-based routing (#) to navigate between views.

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get a specific product

### Cart
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove cart item

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order

## Contribution

If you want to contribute to this project:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/new-feature`).
3. Make your changes and commit (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a Pull Request.

## License

This project is licensed under the ISC License.

## Credits

This project was developed as part of an e-commerce solution for plus-size clothing stores by:

- **Backend**  
  - Martha Garcia, Clan Ciénaga  
  - Maria Gabriela Yanes, Clan Ciénaga  
  - Yiseth Gutiérrez, Clan Manglar  

- **Frontend**  
  - Kateryn Martinez, Clan Malecón  
  - Isabella Jiménez, Clan Manglar  

Special thanks to:
- The Node.js and React developer communities for their excellent frameworks.
- The contributors of the open-source libraries used in this project.

---

Thank you for using **SizeUp**! If you have any questions or suggestions, feel free to reach out to us.