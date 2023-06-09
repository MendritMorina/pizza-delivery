const express = require('express');
const app = express();
const db = require('./db');

// Imports: local files.
const pizzaRoutes = require('./routes/pizzas');
const userRoutes = require('./routes/users');
const orderRoutes =require('./routes/orders')


// Middleware
app.use(express.json());

// Mount routes accordingly.
app.use('/api/pizzas', pizzaRoutes);
app.use('/api/users/', userRoutes);
app.use('/api/orders/', orderRoutes);





// Start the server
db.connection.once('open', () => {
    console.log('Connected to MongoDB');

    const port = 8000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});


