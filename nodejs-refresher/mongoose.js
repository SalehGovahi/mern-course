const mongoose = require('mongoose');

const Product = require('./product');

mongoose.connect(
    'mongodb://localhost:27017/Test'
).then(() => {
    console.log('Connected to database!')
}).catch(() => {
    console.log('Connection failed!')
});

const createProduct = async (req, res, next) => {
    const createdProduct = new Product({
        name: req.body.name,
        price: parseFloat(req.body.price)
    });
    const result = await createdProduct.save();

    res.json(result);
};

const getProducts = async (req, res, next) => {
    const products = await Product.find().exec();
    res.json(products);
}

exports.createProduct = createProduct;
exports.getProducts = getProducts;