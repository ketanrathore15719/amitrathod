const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const indexRouter = require('./routes/index');
const productsRouter = require('./routes/products');

const app = express();

// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/assian-paint-shop', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });
mongoose.connect('mongodb+srv://therealrathore:q94BB11oMAZTHxPc@cluster0.anaamsn.mongodb.net/paint-shop?retryWrites=true&w=majority&appName=Cluster0')

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// View Engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', indexRouter);
app.use('/products', productsRouter);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
