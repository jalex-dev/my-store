const { faker } = require("@faker-js/faker");
const boom = require("@hapi/boom");

class ProductsService{

  constructor(){
    this.products = [];
    this.generate(10);
  }

  generate(limit){

    for (let i=0 ;i<limit;i++){
      this.products.push({
        id : faker.datatype.uuid(),
        name : faker.commerce.productName(),
        price : parseInt(faker.commerce.price(),10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      }) ;
    }
  }
  async create(data){
    const newProduct ={
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  async findAll(size){
    const limit =size|| 10
    return new Promise((resolve,reject)=>{
      setTimeout(()=>{
        this.generate(limit);

        resolve(this.products);
      },5000);
    })

  }

 async findOne(id){
    const product = this.products.find(item => item.id === id);
    if(!product) throw boom.notFound('Could not find Product');

    if (product.isBlock) {
      throw boom.conflict("This product has been blocked");

    }
    return product;

  }

  async update(id,change){
    const index=this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('Could not found the product :(');
    }
    const product = this.products[index];
    this.products[index] = {
      ... product,
      ... change
    };
    return this.products[index];

  }
  delete(id){
    const index=this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('Could not found the product :(');
    }
    this.products.splice(index ,1)
    return id;

  }

}

module.exports = ProductsService;
