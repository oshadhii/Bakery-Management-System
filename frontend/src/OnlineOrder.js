
import  "./Onlineorder.css";
import { Navigate, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
//import { useCart } from './CartContext';
import  Header from './Header';
import icon from './images/icon.png';
import bun1 from './images/sausagesbun.jpg';
import bun2 from './images/eggbun.jpg';
import bun3 from './images/fishbun.webp';
import bun4 from './images/chickenbun.jpg';
import bun5 from './images/cheeseomletbun.webp';
import bun6 from './images/kibulabun.jpg';
import bun7 from './images/sinisambalbun.webp';
import bun8 from './images/burgerbun.jpg';
import bread1 from './images/whitebread.jpg';
import bread2 from './images/brownbread.jpg';
import bread3 from './images/wheatbread.jpg';
import bread4 from './images/whiteslicebread.jpg';
import pastry1 from './images/fishpastry.jpg';
import pastry2 from './images/chickenpuffpastry.jpg';
import pastry3 from './images/cheesepastry.jpg';
import pastry4 from './images/vegpastry.jpeg';
import dessert1 from './images/eclair.jpg';
import dessert2 from './images/donut.webp';
import dessert3 from './images/chocolateballs.webp';
import dessert4 from './images/applecake.jpg';
import rolls1  from './images/fishroll.jpg';
import rolls2  from './images/eggRoll.jpg';
import rolls3  from './images/chickenEggroll.jpg';
import rolls4  from './images/vegiRoll.webp';
import { useLocation } from 'react-router-dom';

function OnlineOrder(){

    const checkout = useNavigate ();
  
    const location = useLocation();

    const [cartItems, setCartItems] = useState(location.state?.cartItems || []);
  const [showCart, setShowCart] = useState(false);

  // Function to handle adding items to the cart
  /*const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };*/
  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.productName === item.productName);
    if (existingItem) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.productName === item.productName
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCartItems([...cartItems, item]);
    }
  };


  const incrementQuantity = (item) => {
    setCartItems(cartItems.map(cartItem => 
      cartItem.productName === item.productName ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    ));
  };

  const decrementQuantity = (item) => {
    setCartItems(cartItems.map(cartItem => 
      cartItem.productName === item.productName && cartItem.quantity > 1 ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
    ));
  };

  const removeItem = (item) => {
    setCartItems(cartItems.filter(cartItem => cartItem.productName !== item.productName));
};
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
};

const handleCheckout = () => {
        checkout('/CheckoutOrder', { state: { cartItems } });
      };
      const clearCart = () => {
        setCartItems([]);
        setShowCart(false);
      };
    
    
        //const [cartItems, setCartItems, incrementQuantity, decrementQuantity] = useState([]);
        //const [cartItems, addToCart, incrementQuantity, decrementQuantity] = useCart();
    
        // Function to handle adding items to the cart
        /*const addToCart = (item) => {
            setCartItems([...cartItems, item]);
        };*/

        
    

    return(
        <>
         <div className="online">
   <Header/>

            <h1>Our Products</h1>
            <div className="main-content"> 
                 <div id="food-list" className="food-list">
                        <div id="Buns" class="Buns">
                            <p id="category-name">Buns</p>    
                        </div>

                        <div id="Bread" class="Bread">
                            <p id="category-name">Bread</p>    
                        </div>

                        <div id="Pastry" class="Pastry">
                            <p id="category-name">Pastry</p>    
                        </div>

                        <div id="Rolls" class="Rolls">
                            <p id="category-name">Rolls</p>    
                        </div>
                        

                        <div id="desserts" class="desserts">
                            <p id="category-name">desserts</p>
                        </div>

                        

                    
                 </div> 
                 {/*<div className="iconCart">
                <img src={icon}/>
                <div className="totalQuantity">0</div>
                </div>*/}

                <div className="iconCart" onClick={() => setShowCart(!showCart)}>
                        <img src={icon} alt="Cart Icon" />
                        <div className="totalQuantity">{cartItems.length}</div>
                </div>

                 <div className="food-item">
                        <p>Buns</p>
                        <div className="food-items">

                                <div className="food-item-box">
                                        <img src={bun1} className="buns" alt='buns'/>
                                        <div className="box-text">
                                                    <h5 className="Name">Sausage Bun</h5>
                                                    <p className="price">Rs.80</p>
                                                    <button onClick={() => addToCart({ productName:'Sausage Bun', unitPrice: 80, quantity: 1 })}>add to cart</button>   
                                        </div>
                                </div>

                                <div className="food-item-box">
                                        <img src={bun2} className="buns" alt='buns'/>
                                        <div className="box-text">
                                                    <h5>Egg Bun</h5>
                                                    <p>Rs.80</p>
                                                    <button onClick={() => addToCart({ productName: 'Egg Bun', unitPrice: 80, quantity: 1  })}>add to cart</button>   
                                        </div>
                                </div>

                                <div className="food-item-box">
                                        <img src={bun3} className="buns" alt='buns'/>
                                        <div className="box-text">
                                                    <h5>Fish Bun</h5>
                                                    <p>Rs.60</p>
                                                    <button onClick={() => addToCart({ productName: 'Fish Bun', unitPrice: 60, quantity: 1  })}>add to cart</button>   
                                        </div>
                                </div>

                                <div className="food-item-box">
                                        <img src={bun4} className="buns" alt='buns'/>
                                        <div className="box-text">
                                                    <h5>Chicken Bun</h5>
                                                    <p>Rs.100</p>
                                                    <button onClick={() => addToCart({ productName: 'Chicken Bun', unitPrice: 100, quantity: 1  })}>add to cart</button>   
                                        </div>
                                </div>
                      </div>
                      <div className="food-items">
                       
                                    <div className="food-item-box">
                                            <img src={bun5} className="buns" alt='buns'/>
                                            <div className="box-text">
                                                        <h5>Cheese Omlet Bun</h5>
                                                        <p>Rs.150</p>
                                                        <button onClick={() => addToCart({ productName: 'Cheese Bun', unitPrice: 150, quantity: 1  })}>add to cart</button>   
                                            </div>
                                    </div>

                                    <div className="food-item-box">
                                            <img src={bun6} className="buns" alt='buns'/>
                                            <div className="box-text">
                                                        <h5>Kibula Bun</h5>
                                                        <p>Rs.60</p>
                                                        <button onClick={() => addToCart({ productName: 'Kibula Bun', unitPrice: 60, quantity: 1  })}>add to cart</button>   
                                            </div>
                                    </div>

                                    <div className="food-item-box">
                                            <img src={bun7} className="buns" alt='buns'/>
                                            <div className="box-text">
                                                        <h5>Sinisambal Bun</h5>
                                                        <p>Rs.70</p>
                                                        <button onClick={() => addToCart({ productName: 'Sinisambal Bun', unitPrice: 70, quantity: 1  })}>add to cart</button>   
                                            </div>
                                    </div>

                                    <div className="food-item-box">
                                            <img src={bun8} className="buns" alt='buns'/>
                                            <div className="box-text">
                                                        <h5>Burger Bun</h5>
                                                        <p>Rs.200</p>
                                                        <button onClick={() => addToCart({ productName: 'Burger Bun', unitPrice: 200, quantity: 1  })}>add to cart</button>   
                                            </div>
                                    </div>
                       </div> 


                       <p>Bread</p>
                        <div className="food-items">

                                <div className="food-item-box">
                                        <img src={bread1} className="bread" alt='bread'/>
                                        <div className="box-text">
                                                    <h5>White Bread</h5>
                                                    <p>Rs.130</p>
                                                    <button onClick={() => addToCart({ productName: 'White Bread', unitPrice: 130, quantity: 1  })}>add to cart</button>   
                                                    {/*onClick={() => addToCart({ name: 'Sausage Bun', price: 32 })}*/}
                                        </div>
                                </div>

                                <div className="food-item-box">
                                        <img src={bread2} className="bread" alt='bread'/>
                                        <div className="box-text">
                                                    <h5>Brown Bread</h5>
                                                    <p>Rs.150</p>
                                                    <button onClick={() => addToCart({  productName: 'Brown Bread', unitPrice: 150, quantity: 1  })}>add to cart</button>   
                                        </div>
                                </div>

                                <div className="food-item-box">
                                        <img src={bread3} className="bread" alt='bread'/>
                                        <div className="box-text">
                                                    <h5>Wheat Bread</h5>
                                                    <p>Rs.180</p>
                                                    <button onClick={() => addToCart({  productName: 'Wheat Bread', unitPrice: 180, quantity: 1  })}>add to cart</button>   
                                        </div>
                                </div>

                                <div className="food-item-box">
                                        <img src={bread4} className="bread" alt='bread'/>
                                        <div className="box-text">
                                                    <h5>White Slice Bread</h5>
                                                    <p>Rs.200</p>
                                                    <button onClick={() => addToCart({  productName: 'White Slice Bread', unitPrice: 200, quantity: 1  })}>add to cart</button>   
                                        </div>
                                </div>
                      </div>


                      <p>Pastries</p>
                        <div className="food-items">

                                <div className="food-item-box">
                                        <img src={pastry1} className="pastry" alt='pastry'/>
                                        <div className="box-text">
                                                    <h5>Fish Pastry</h5>
                                                    <p>Rs.80</p>
                                                    <button onClick={() => addToCart({  productName: 'Fish Pastry', unitPrice: 80, quantity: 1  })}>add to cart</button>   
                                        </div>
                                </div>

                                <div className="food-item-box">
                                        <img src={pastry2} className="pastry" alt='pastry'/>
                                        <div className="box-text">
                                                    <h5>Chicken Puff</h5>
                                                    <p>Rs.150</p>
                                                    <button onClick={() => addToCart({  productName: 'Chicken Puff', unitPrice: 150, quantity: 1  })}>add to cart</button>   
                                        </div>
                                </div>

                                <div className="food-item-box">
                                        <img src={pastry3} className="pastry" alt='pastry'/>
                                        <div className="box-text">
                                                    <h5>Cheese Pastry</h5>
                                                    <p>Rs.150</p>
                                                    <button onClick={() => addToCart({  productName: 'Cheese Pastry', unitPrice: 150, quantity: 1  })}>add to cart</button>   
                                        </div>
                                </div>

                                <div className="food-item-box">
                                        <img src={pastry4} className="pastry" alt='pastry'/>
                                        <div className="box-text">
                                                    <h5>Veg Pastry</h5>
                                                    <p>Rs.70</p>
                                                    <button onClick={() => addToCart({  productName: 'Veg Pastry', unitPrice: 70, quantity: 1  })}>add to cart</button>   
                                        </div>
                                </div>
                      </div>

                      <p>Rolls</p>
                        <div className="food-items">

                                <div className="food-item-box">
                                <img src={rolls1} className="rolls" alt='rolls'/>
                                        <div className="box-text">
                                                    <h5>Fish Roll</h5>
                                                    <p>Rs.100</p>
                                                    <button  onClick={() => addToCart({  productName: 'Fish Roll', unitPrice: 100, quantity: 1  })}>add to  cart</button>   
                                        </div>
                                </div>

                                <div className="food-item-box">
                                        <img src={rolls2} className="rolls" alt='rolls'/>
                                        <div className="box-text">
                                                    <h5>Egg Roll</h5>
                                                    <p>Rs.120</p>
                                                    <button onClick={() => addToCart({  productName: 'Egg Roll',  unitPrice: 120, quantity: 1  })}>add to  cart</button>   
                                        </div>
                                </div>

                                <div className="food-item-box">
                                        <img src={rolls3} className="rolls" alt='rolls'/>
                                        <div className="box-text">
                                                    <h5>Chicken Egg Roll</h5>
                                                    <p>Rs.140</p>
                                                    <button onClick={() => addToCart({  productName: 'Chicken Egg Roll',  unitPrice: 140, quantity: 1  })}>add to  cart</button>   
                                        </div>
                                </div>

                                <div className="food-item-box">
                                        <img src={rolls4} className="rolls" alt='rolls'/>
                                        <div className="box-text">
                                                    <h5>Vegi Roll</h5>
                                                    <p>Rs.90</p>
                                                    <button onClick={() => addToCart({  productName: 'Vegi Roll',  unitPrice: 90, quantity: 1  })}>add to  cart</button>   
                                        </div>
                                </div>
                      </div>


                      <p>Desserts</p>
                        <div className="food-items">

                                <div className="food-item-box">
                                        <img src={dessert1} className="dessert" alt='dessert'/>
                                        <div className="box-text">
                                                    <h5>Eclair</h5>
                                                    <p>Rs.150</p>
                                                    <button onClick={() => addToCart({  productName: 'Eclair',  unitPrice: 150, quantity: 1  })}>add to  cart</button>   
                                        </div>
                                </div>

                                <div className="food-item-box">
                                        <img src={dessert2} className="dessert" alt='dessert'/>
                                        <div className="box-text">
                                                    <h5>Donut</h5>
                                                    <p>Rs.120</p>
                                                    <button onClick={() => addToCart({  productName: 'Donut',  unitPrice: 120, quantity: 1  })}>add to  cart</button>   
                                        </div>
                                </div>

                                <div className="food-item-box">
                                        <img src={dessert3} className="dessert" alt='dessert'/>
                                        <div className="box-text">
                                                    <h5>Chocolate Ball</h5>
                                                    <p>Rs.100</p>
                                                    <button onClick={() => addToCart({  productName: 'Chocolate Ball',  unitPrice: 100, quantity: 1  })}>add to  cart</button>   
                                        </div>
                                </div>

                                <div className="food-item-box">
                                        <img src={dessert4} className="dessert" alt='dessert'/>
                                        <div className="box-text">
                                                    <h5>Apple Cake</h5>
                                                    <p>Rs.100</p>
                                                    <button onClick={() => addToCart({  productName: 'Apple Cake',  unitPrice: 100, quantity: 1  })}>add to  cart</button>   
                                        </div>
                                </div>
                      </div>












                        </div> 
                        
                       
            </div>  
            {showCart && (
                    <div className="cart">
                        <h2>Cart Items</h2>
                        <ul>
                            {cartItems.map((item, index) => (
                                <li key={index}>
                                        <div className="item-info-name">
                                                {item.productName}   </div>    <div className="item-info-price">Rs.{item.unitPrice}</div> 
                                        
                                        <div className="item-actions">

                                                <button onClick={() => incrementQuantity(item)}>+</button> {item.quantity} {/* = ${item.price * item.quantity} */}
                                                <button onClick={() => decrementQuantity(item)}>-</button>
                                                <button onClick={() => removeItem(item)}>Remove</button>
                                        </div>
                                    
                                </li>

                            ))}

                        </ul>
                        <h3>Total Price: Rs.{getTotalPrice()}</h3>

                        <button type="submit" className="Checkoutbtn" onClick= {handleCheckout}>Checkout</button>
                        <button type="button" className="Cancelbtn" onClick={clearCart}>Cancel</button>
                    </div>
                )}
            {/* Display Cart Items 
            <div className="cart">
                    <h2>Cart Items</h2>
                    <ul>
                        {cartItems.map((item, index) => (
                            <li key={index}>{item.name} - ${item.price} x {item.quantity}
                                <button onClick={() => incrementQuantity(item.quantity)}>+</button>
                                <button onClick={() => decrementQuantity(item.quantity)}>-</button>
                            </li>
                        ))}
                    </ul>
             </div>*/}
            {/*<div className="cart">
                                <h2>Cart Items</h2>
                                <ul>
                                {cartItems.map((item, index) => (
                                        <li key={index}>{item.name} - ${item.price}</li>
                                ))}
                                </ul>
                        </div>*/}
            <button type="submit" className="orderbtn" onClick= {handleCheckout}>Checkout</button>//main contact
            
        </div>   
        </>

    );
}

export default OnlineOrder;