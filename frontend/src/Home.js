import { Navigate, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Header from "./Header";
import bakeryimg from './images/background-bakerynew.png';
import backgroundimg from './images/background-bakery4bg.jpg';
import aboutus from './images/aboutus_img.png';
import backgroundmain from './images/background_bun4.png';
import logoB from './images/logoBkery.png';
import buns from './images/burgerbun.jpg';
import breads from './images/wheatbread.jpg';
import Cakes from './images/cake.jpg';
import Sweetes from './images/donut.webp';
import discount from './images/15Off.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

import './Home.css';


function Home(){
    const product = useNavigate();
    const Navigate = useNavigate();
    return(
        <div className="Home">
                    <Header/>

                    <section className="home-section" id="home">
                
                            <div className="home-text">
                                <h3 >Welcome</h3>
                                <h1 className='h1Home'>Expertly Baked Delights</h1>
                                <p>Bite into delightful suprices. Bake your heart out <br/> Baked with love.Enrich every moment</p>
                                <a href="#" onClick={ ()=> product ('/Online')} className="btn">Our Products</a>
                            </div>

                            <div className="home-img">
                                <img src={backgroundmain}/>
                            </div>


                            
                    </section>

        <section className="about" id="about">
		<div className="about-img">
			<img src={logoB}/>
		</div>

		<div className="about-text">
			<h3>About Us</h3>
			<h2>Miyurasa Bakers</h2>
			<p>Founded in 2009, Miyurasa Bakers began as a dream to bring the authentic taste of home-baked goodness to our community. With recipes passed down through generations, we blend time-honored techniques with a touch of innovation, ensuring that every product that leaves our ovens is a testament to our passion and dedication.</p>
			
		</div>

        </section>

        <div className="product_catlog">
        <h1>Our Product Catelog<span></span></h1>

        <div className="catlog_box">
            <div className="product">
                <img src={buns}/>

                <div className="info">
                    <h2 className="name">Buns</h2>
                </div>

            </div>

            <div className="product">
                <img src={breads}/>

                <div className="info">
                    <h2 className="name">Breads</h2>
                </div>

            </div>

            <div className="product">
                <img src={Cakes}/>

                <div className="info">
                    <h2 className="name">Cakes</h2>
                </div>

            </div>

            <div className="product">
                <img src={Sweetes}/>

                <div className="info">
                    <h2 className="name">Sweets</h2>
                </div>

            </div>

        </div>

    </div>



    
		<section className='section4'>
			<div className="newsletter-content">
				<div className="news-img">
					{/*<img src={discount}/>*/}
				</div>

				<div className="news-text">
                <h3 class="flex-space">
                    <span>Checkout Now and Receive</span>
                    <span>Place an inquiry</span>
                    
                </h3>                
                 <h2 class="flex-space-2">
                    <h2>Get 20% Off your first Order</h2>
                    <button className='inquirybtn'onClick={()=>Navigate('./InquiryForm')}>inquiry</button>
                </h2>
					
					<p>Enter your email for exclusive offer. You'll receive an email shortly with your unique code</p>
				</div>
                

				<div className="letter">
					
						<input type="email" name="email" placeholder="Your Email" required/>
						<input className= "subscribe" type="submit" value="Subscribe" required/>
					
				</div>
			</div>
		
            </section>

            







	
    <footer>
        <div className="main_footer">

            <div className="footer_tag">
                <h2>Location</h2>
                <p>No 123,</p>
                <p>Sadasarana Mawatha</p>
                <p>Rilaulla</p>
                <p>Kandana</p>
            
            </div>
            <div className="footer_tag">
                <h2>Contact Us</h2>
                <p>011-2345678</p>
                <p>071-2345678</p>
                <p>miyurasaBakers@gmail.com</p>
        
            </div>
            
            <div className="footer_tag">
                <h2>Our Service</h2>
                <p>Fast Delivery</p>
                <p>Easy Payments</p>
                <p>24 x 7 Service</p>
            </div>

            <div className="footer_tag">
                <h2>Follow Us</h2>
                
                        <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
                        <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
                        <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
    
            </div>
            

        </div>

        
    </footer>

    

        </div>

    );
}

export default Home;