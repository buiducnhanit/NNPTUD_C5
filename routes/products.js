var express = require('express');
const { ConnectionCheckOutFailedEvent } = require('mongodb');
var router = express.Router();
let productModel = require('../schemas/product')

/* GET users listing. */
router.get('/', async function (req, res, next) {
  let products = await productModel.find({}).populate('category');
  res.status(200).send({
    success: true,
    data: products
  });
});

router.get('/:id', async function (req, res, next) {
  try {
    let product = await productModel.findById(req.params.id).populate('category');
    res.status(200).send({
      success: true,
      data: product
    });
    if (!product) {
      return res.status(404).send({
        success: false,
        message: 'Product not found'
      });
    };
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message
    });
  }
});

router.post('/', async function (req, res, next) {
  try {
    let newProduct = new productModel({
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity,
      category: req.body.category
    })
    await newProduct.save();
    res.status(200).send({
      success: true,
      data: newProduct
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      message: error.message
    });
  }
});

router.put('/:id', async function (req, res, next) {
  try {
    let updatedProduct = await productModel.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        quantity: req.body.quantity,
        imgURL: req.body.imgURL,
        category: req.body.category
      },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).send({
        success: false,
        message: 'Product not found'
      });
    }
    res.status(200).send({
      success: true,
      data: updatedProduct
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message
    });
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    let deletedProduct = await productModel.findByIdAndUpdate(
      req.params.id,
      { isDelete: true },
      { new: true }
    );
    if (!deletedProduct) {
      return res.status(404).send({
        success: false,
        message: 'Product not found'
      });
    }
    res.status(200).send({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
