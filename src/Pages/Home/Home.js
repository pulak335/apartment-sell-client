import React from 'react';
import Cover from '../../Components/Cover/Cover';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';
import ProductHome from '../../Components/ProductHome.js/ProductHome';
import Review from '../../Components/Review/Review';
import Teams from '../../Components/Teams/Teams';

const Home = () => {
    return (
        <div>
            
            <Navbar/>
            <Cover></Cover>
            <ProductHome></ProductHome>
            <Teams></Teams>
            <Review></Review>
          <Footer/>
        </div>
    );
};

export default Home;