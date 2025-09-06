# Category & Product Management System

A Node.js web application built with Express.js and Sequelize ORM for managing categories and products with a MySQL database. The application provides REST APIs and a simple HTML frontend for CRUD operations.

## 🚀 Features

- **Category Management**: Create, read, update, and delete categories
- **Product Management**: Manage products with category associations
- **Soft Delete**: Items are marked as deleted rather than permanently removed
- **Pagination**: Product listing with pagination support
- **RESTful APIs**: Well-structured API endpoints
- **Frontend Interface**: HTML pages for easy interaction
- **Database Migrations**: Automated database schema management

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js
- **ORM**: Sequelize
- **Database**: MySQL
- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Environment**: dotenv for configuration management

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MySQL](https://www.mysql.com/) (v5.7 or higher)
- [Git](https://git-scm.com/) (optional, for cloning)

## 🔧 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Jayesh2016-J/Machine-Test.git
cd Machine-Test
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Database Setup

Create a MySQL database for the application:
```sql
CREATE DATABASE your_database_name;
```

### 4. Environment Configuration

Create a `.env` file in the root directory and configure your database connection:

```env
# Database Configuration
USER_NAME=your_mysql_username
PASSWORD=your_mysql_password
DATABASE=your_database_name
HOST=localhost
PORT=3306
DIALECT=mysql

# Application Configuration
NODE_ENV=development
```

**Example `.env` file:**
```env
USER_NAME=root
PASSWORD=yourpassword
DATABASE=category_product_db
HOST=localhost
PORT=3306
DIALECT=mysql
NODE_ENV=development
```

### 5. Run Database Migrations

Execute the following commands to create the database tables:

```bash
# Run migrations to create tables
npx sequelize-cli db:migrate
```

This will create the following tables:
- `categories` - Stores category information
- `products` - Stores product information with category references

### 6. Start the Application

```bash
# For development (with auto-restart)
npm run dev

# Or run directly
npm start
```

The server will start on `http://localhost:3000`

## 📚 API Endpoints

### Categories

| Method | Endpoint | Description | Body Parameters |
|--------|----------|-------------|-----------------|
| GET | `/categories` | Get all categories | - |
| POST | `/categories` | Create a new category | `{ "CategoryName": "string" }` |
| PUT | `/categories/update` | Update a category | `{ "id": number, "CategoryName": "string" }` |
| DELETE | `/categories/:id` | Delete a category | - |

### Products

| Method | Endpoint | Description | Query Parameters | Body Parameters |
|--------|----------|-------------|------------------|-----------------|
| GET | `/products` | Get products with pagination | `page`, `pageSize`, `CategoryId` | - |
| POST | `/products` | Create a new product | - | `{ "ProductName": "string", "CategoryId": number }` |
| PUT | `/products/update` | Update a product | - | `{ "ProductId": number, "ProductName": "string", "CategoryId": number }` |
| DELETE | `/products/:id` | Delete a product | - | - |

## 🌐 Frontend Pages

Access the frontend interfaces:

- **Categories Management**: `http://localhost:3000/categories.html`
- **Products Management**: `http://localhost:3000/products.html`
- **API Test**: `http://localhost:3000/` (shows "NodeJS MVC App Running")

## 📁 Project Structure

```
Machine-Test/
├── config/
│   └── config.js              # Database configuration
├── controllers/
│   ├── categoryController.js  # Category business logic
│   └── productRoutes.js       # Product business logic
├── migrations/
│   ├── 20250904171018-createCategoryTable.js
│   └── 20250904171528-createtableProduct.js
├── models/
│   ├── categories.js          # Category model
│   ├── products.js            # Product model
│   └── index.js               # Sequelize initialization
├── public/
│   ├── categories.html        # Category management UI
│   └── products.html          # Product management UI
├── routes/
│   ├── categoryRoutes.js      # Category routes
│   └── productRoutes.js       # Product routes
├── app.js                     # Main application file
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## 🗄️ Database Schema

### Categories Table
- `CategoryId` (INT, Primary Key, Auto Increment)
- `CategoryName` (VARCHAR(255), Not Null)
- `isDeleted` (BOOLEAN, Default: false)
- `createdAt` (DATETIME)
- `updatedAt` (DATETIME)

### Products Table
- `ProductId` (INT, Primary Key, Auto Increment)
- `ProductName` (VARCHAR(255), Not Null)
- `CategoryId` (INT, Foreign Key to Categories)
- `isDeleted` (BOOLEAN, Default: false)
- `createdAt` (DATETIME)
- `updatedAt` (DATETIME)

## 🔍 API Usage Examples

### Create a Category
```bash
curl -X POST http://localhost:3000/categories \
  -H "Content-Type: application/json" \
  -d '{"CategoryName": "Electronics"}'
```

### Get All Categories
```bash
curl http://localhost:3000/categories
```

### Create a Product
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"ProductName": "Smartphone", "CategoryId": 1}'
```

### Get Products with Pagination
```bash
curl "http://localhost:3000/products?page=1&pageSize=10&CategoryId=1"
```

## 🧪 Testing

You can test the application using:

1. **Frontend Interface**: Use the HTML pages at `/categories.html` and `/products.html`
2. **API Testing Tools**: Use Postman, curl, or any REST client
3. **Browser**: Navigate to `http://localhost:3000` to see the basic response

## 🚨 Troubleshooting

### Common Issues

1. **Database Connection Error**:
   - Verify MySQL is running
   - Check `.env` file configuration
   - Ensure database exists

2. **Migration Errors**:
   - Check database permissions
   - Verify Sequelize CLI is installed globally: `npm install -g sequelize-cli`

3. **Port Already in Use**:
   - Change the PORT in `app.js` or kill the process using port 3000

4. **Module Not Found**:
   - Run `npm install` to ensure all dependencies are installed

### Environment Variables

If you encounter issues with environment variables:
```bash
# Check if .env file exists and has correct format
cat .env

# Ensure dotenv is installed
npm install dotenv
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 📞 Support

If you encounter any issues or have questions:
1. Check the troubleshooting section above
2. Verify your environment configuration
3. Ensure all prerequisites are installed correctly

---

**Happy Coding! 🎉**