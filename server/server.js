const express = require('express');
const mysql = require('mysql2/promise'); // Import mysql2/promise
const cors = require('cors');
const multer = require('multer');
const excelToJson = require('convert-excel-to-json');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3001;

app.use(cors());
const jwtSecret = 'your_jwt_secret_key';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'inventory',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('excelFile');

app.use(express.json());

// Get all products
app.get('/products', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [results] = await connection.query('SELECT * FROM products');
        connection.release();
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error connecting to database' });
    }
});

// Add a new product
app.post('/products', async (req, res) => {
    const { name, expiry_date, quantity, perishable, delivery_status } = req.body;
    const expirydate = expiry_date || null;
    try {
        const connection = await pool.getConnection();
        await connection.query('INSERT INTO products (name, expiry_date, quantity, perishable, delivery_status) VALUES (?, ?, ?, ?, ?)',
            [name, expirydate, quantity, perishable, delivery_status]);
        connection.release();
        res.status(200).json({ message: 'Product added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error adding product to the database' });
    }
});

// Upload Excel data to add products
app.post('/upload', upload, async (req, res) => {
    try {
        let excelData = null;

        // Check if an Excel file was uploaded
        if (req.file) {
            // Parse Excel data
            excelData = excelToJson({
                source: req.file.buffer,
                header: { rows: 1 },
                columnToKey: {
                    A: 'name',
                    B: 'expiry_date',
                    C: 'perishable',
                    D: 'delivery_status',
                    E: 'quantity',
                },
            });
        }

        // Insert Excel data into the database
        if (excelData) {
            const sheetData = excelData.Sheet1;
            const connection = await pool.getConnection();
            for (const row of sheetData) {
                await connection.query(
                    'INSERT INTO products (name, expiry_date, perishable, delivery_status, quantity) VALUES (?, ?, ?, ?, ?)',
                    [row.name, row.expiry_date, row.perishable, row.delivery_status, row.quantity]
                );
            }
            connection.release();
        }

        res.status(200).json({ message: 'Data uploaded successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a product
app.put('/products/:id', async (req, res) => {
    const productId = req.params.id;
    const { name, expiry_date, perishable, delivery_status, quantity } = req.body;

    try {
        const connection = await pool.getConnection();
        const [result] = await connection.query('UPDATE products SET name=?, expiry_date=?, perishable=?, delivery_status=?, quantity=? WHERE id=?',
            [name, expiry_date, perishable, delivery_status, quantity, productId]);
        connection.release();

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        console.log('Product updated successfully');
        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Error updating product' });
    }
});

// Get product quantities for the dashboard
app.get('/dashboard', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [result] = await connection.query('SELECT name, quantity FROM products');
        connection.release();
        res.json(result);
    } catch (error) {
        console.error('Error fetching product quantities:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Endpoint to get delivered products
app.get('/delivered-products', (req, res) => {
    const query = "SELECT * FROM products WHERE delivery_status = 'delivered'";
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching delivered products:', err);
            res.status(500).json({ error: 'Error fetching delivered products' });
            return;
        }
        res.json(results);
    });
});
app.post('/register', async (req, res) => {
    const { username, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const connection = await pool.getConnection();
        await connection.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, role]);
        connection.release();
        res.status(200).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error registering user' });
    }
});
// User login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const connection = await pool.getConnection();
        const [results] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
        connection.release();

        if (results.length === 0) {
            console.error('Login error: Invalid username');
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            console.error('Login error: Invalid password');
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, jwtSecret, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
