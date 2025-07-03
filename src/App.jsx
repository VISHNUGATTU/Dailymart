import React from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { Route,Routes } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';
import { useAppContext } from './context/AppContext';
import Login from './components/Login';
import AllProducts from './pages/AllProducts';
import Contact from './components/Contact';
import ProductCategory from './components/ProductCategory';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import AddAddress from './pages/AddAddress';

const App = () => {
  const isSellerPath= useLocation().pathname.includes('seller');
  const {showUserLogin} =useAppContext()

  return (
    <div>
      {isSellerPath ? null : <Navbar />}
      {
        showUserLogin && <Login/> 
      }
      <Toaster/>
      <div className={`${isSellerPath ? '' : 'px-6 md:px-8 lg:px-10 xl:px-14'}`}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<AllProducts/>} />
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/products/:category' element={<ProductCategory />} />
          <Route path='/products/:category/:productId' element={<ProductDetails />} />
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/add-address' element={<AddAddress/>}/>
        </Routes>
      </div>
      {
        !isSellerPath && <Footer />
      }
    </div>
  )
}

export default App;