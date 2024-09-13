const express = require('express');
const cors = require('cors');
const app = express();
const { db} = require('./model/_index');



const userRoutes = require('./routes/user.routes');
const sellerRoutes = require('./routes/seller.routes');
const productRoutes = require('./routes/product.routes');

const port = 1274;

app.use(cors());
app.use(express.json());

app.use('/api/sellers', sellerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);



app.listen(port, () => console.log(`Server running on port ${port}`));







