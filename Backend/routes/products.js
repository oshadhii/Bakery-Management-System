const router = require('express').Router();
let Product = require("../models/Product.js");

http://localhost:8000/products/insert

router.route('/insert').post((req, res) => {
    const productCode = req.body.productCode;
    const productName = req.body.productName;
    const description = req.body.description;
    const cost = Number(req.body.cost);
    const category = req.body.category;    

    const newProduct = new Product({
        productCode,
        productName,
        description,
        cost,
        category
    })

    newProduct.save().then(() => {
        res.json("Product Added");
    }).catch(err => {
        console.log(err);
    })
})

http://localhost:8000/products/

router.route('/').get((req, res) =>{
    Product.find().then((products) => {
        res.json(products);
    }).catch(err => {
        console.log(err);
    })
})

http://localhost:8000/products/update/8jhedvcjhewchvdchj

router.route('/update/:id').put(async(req, res) =>{
    let productId = req.params.id;
    const {productCode, productName, description, cost, category} = req.body;

    const updateProduct = {
        productCode,
        productName,
        description,
        cost,
        category
    }

    const update = await Product.findByIdAndUpdate(productId, updateProduct)
    .then(() => {
        res.status(200).send({status: "Product Updated"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with updating data", error: err.message});
    })
})

http://localhost:8000/products/delete/655dhchjdcjhdbkcbd

router.route('/delete/:id').delete(async(req, res) =>{
    let productId = req.params.id;

    await Product.findByIdAndDelete(productId)
    .then(() => {
        res.status(200).send({status: "Product Deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error with delete product", error: err.message});
    })
})  

http://localhost:8000/655dhchjdcjhdbkcbd

router.route('/:id').get(async (req, res) => {
    let productId = req.params.id;
    
    await Product.findById(productId)
        .then((product) => {
            if (!product) {
                return res.status(404).send({ status: "Product not found" });
            }
            res.status(200).send(product);
        })
        .catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with fetching product", error: err.message });
        });
});

/*--------------------------Login-----------------------------*/
// Routes

/**
 * @route   POST /ProductUser
 * @desc    Create a new user
 * @access  Public
 */
router.post('/InventoryUser', async (req, res) => {
    const { username, password } = req.body;
  
    // Simple validation
    if (!username || !password) {
      return res.status(400).json({ message: 'Please enter both username and password' });
    }
  
    try {
      // Check if user already exists
      const existingUser = await ProductUser.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
  
      // Create new user
      const newUser = new ProductUser({
        username,
        password
      });
  
      // Save user to database
      await newUser.save();
  
      res.status(201).json({ message: 'User created successfully' });
  
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  /**
   * @route   POST /login
   * @desc    Authenticate user and return success message
   * @access  Public
   */
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    // Simple validation
    if (!username || !password) {
      return res.status(400).json({ message: 'Please enter both username and password' });
    }
  
    try {
      // Check for existing user
      const user = await ProductUser.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Validate password
      const isMatch = await user.isValidPassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
  
      // Successful login
      res.status(200).json({ message: `Welcome, ${user.username}! You have successfully logged in.` });
  
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  /**
   * @route   GET /inventory-data
   * @desc    Retrieve inventory data (protected route)
   * @access  Public for simplicity
   */
  router.get('/Product-data', (req, res) => {
    // For simplicity, we're not implementing authentication here
    res.json({ data: 'Here is your product data!' });
  });

module.exports = router;
