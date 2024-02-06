const express = require("express");
const router = express.Router();
const ProductsService = require('./../services/producto.service');

const validatorHandler = require('./../middlewares/validator.handler')
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/products.schema')
const serviceProducto = new ProductsService();

// Mock data for users and products
router.get("/", async (req, res) => {
  //llamada a una api o base de datos para obtener los productos
  const { size } = req.query;
  const products = await serviceProducto.findAll(size);
  res.status(200).json(products);
});

router.get("/filter", (req, res) => {
  res.send("yo soy un fileter")
});

router.get("/:id",
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    let data = {
      products: [
        { "id": 1, "name": "Producto 1", "description": "Descripcion del producto uno", "price": 25 },
        { "id": 2, "name": "Producto 2", "description": "Descripcion del producto dos", "price": 48 }

      ]
    }
    try {
      let id = req.params.id;
      let product = await serviceProducto.findOne(id);

      res.json(product);
    } catch (error) {
      next(error);

    }



  });

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await serviceProducto.create(body);
    res.status(201).json({
      message: 'created',
      newProduct
    })
  });

router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const productUpdate = await serviceProducto.update(id, body);
      res.json({
        message: 'update',
        productUpdate,
        id
      })
    } catch (error) {
      next(error);
    }

  });

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'update',
    data: body,
    id
  })
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const deleted = serviceProducto.delete(id);
  res.json({
    message: 'deleted',
    deleted
  })
});

module.exports = router;
