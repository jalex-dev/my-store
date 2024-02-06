const express = require("express");
const router = express.Router();
const { faker } = require("@faker-js/faker");


router.get('/', (req, res) => {
  res.json([
    {
      categories: faker.commerce.productAdjective()
    },
    {
      categories: faker.commerce.productAdjective()
    }
  ])
})

router.get('/:categoryId/products/:productId', (req, res) => {
  const {categoryId,productId}= req.params;
  res.json({categoryId, productId})
});

module.exports= router;
