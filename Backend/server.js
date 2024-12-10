const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotebv = require('dotenv');
require('dotenv').config();
const nodemailer = require('nodemailer');




const app = express();

const port = 8000;



app.use(cors());
app.use(bodyParser.json());


const route = require('./routes/saleroute'); // Ensure this is the correct path for your routes
const DailyDelivery = require('./models/salesdeliveryorders'); // Update the path as needed
app.use(route); // Use your custom routes

app.post('/api/dailydelivery', async (req, res) => {
    try {
      const dailyDelivery = new DailyDelivery(req.body);
      await dailyDelivery.save();
      res.status(201).json({
        success: true,
        message: 'Daily delivery record added successfully',
        data: dailyDelivery
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Failed to add daily delivery record',
        error: error.message
      });
    }
  });

//accss the routes.js file
const routerPathwhole = require('./routes/routes');
app.use(routerPathwhole);

const routerPathOnline = require('./routes/routesOnline');
app.use(routerPathOnline);

const routerPathNotificationOnline = require('./routes/notificationOnlineO');
app.use(routerPathNotificationOnline);






const URL = "mongodb+srv://malmi:malmi123@cluster0.3dgof.mongodb.net/OrderDB?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(URL, {}).then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.log(err);
})

const SuprouterPath = require('./routes/supplier');
const SuprouterPath1 = require('./routes/order');
const Customerpath2 = require('./routes/customer')
const CusPath1 = require('./routes/inquiry');


app.use(SuprouterPath);
app.use(SuprouterPath1);
app.use(Customerpath2);
app.use(CusPath1);


const InventorypostRoutes = require('./routes/Inventoryroutes');

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the login HTML page
app.use(express.static('public'));

app.use(InventorypostRoutes);

const postRouteemployee = require('./routes/Emproutes')
app.use(postRouteemployee)



const postRoute = require('./routes/deliveryroutes');

app.use(postRoute)

const productRoutes = require('./routes/products.js');

http://localhost:8000/products.

app.use('/products', productRoutes);

const productionRoutes = require('./routes/production.js');
app.use('/production', productionRoutes);



app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})