const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const { db } = require('./model/_index');

const userRoutes = require('./routes/user.routes');
const sellerRoutes = require('./routes/seller.routes');
const productRoutes = require('./routes/product.routes');
const categoryRoutes = require('./routes/category.routes');
const subCategoryRoutes = require('./routes/subCategory.routes');
const authRoutes = require('./routes/auth.routes');
const cartRoutes = require('./routes/cart.routes');
const soldRoutes = require('./routes/sold.routes');
const imageRoutes = require('./routes/image.routes');
const wishlistRoutes = require('./routes/wishlist.routes');
const adminRoutes = require('./routes/admin.routes');
const commercialRoutes = require('./routes/commercial.routes');



const port = process.env.PORT || 1274;

app.use(cors());
app.use(bodyParser.json({ limit: '50mb' })); // Increase the limit to handle large base64 data
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); 



app.use('/api/auth', authRoutes);
app.use('/api/sellers', sellerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subCategoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/sold', soldRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/commercials', commercialRoutes);




app.listen(port, () => console.log(`Server running on port ${port}`));





