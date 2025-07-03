import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
const ProductDetails = () => {

    const {products, navigate, currency, addToCart} = useAppContext()
    const { category, productId } = useParams();
    const navigateFallback = useNavigate();
    const finalNavigate = navigate || navigateFallback;

    const product = products.find((item) => String(item._id) === String(productId));
    const [relatedProducts, setRelatedProducts] =useState([]);
    const [thumbnail, setThumbnail] = useState(null);
    
    useEffect(() => {
        if(products.length>0 && product)
        {
            let productsCopy=products.slice();
            productsCopy=productsCopy.filter((item) => product.category === item.category && item._id !== product._id);
            setRelatedProducts(productsCopy.slice(0,5));
        }
    }, [products, product]);

    useEffect(() => {
        if(product?.image?.length > 0){
            setThumbnail(product.image[0]);
        }
    },[product]);

    if (!product && products.length === 0) return <div className="mt-12 text-center">Loading...</div>;
    if (!product) return <div className="mt-12 text-center text-gray-500">Product not found.</div>;

    return product && (
        <div className="mt-12">
            <p>
                <Link to={'/'}>Home</Link> /
                <Link to={'/products'}> Products</Link> /
                <Link to={`/products/${product.category.toLowerCase()}`}> {product.category}</Link> /
                <span className="text-primary"> {product.name}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-16 mt-4">
                <div className="flex gap-3">
                    <div className="flex flex-col gap-3">
                        {product.image.map((image, index) => (
                            <div key={index} onClick={() => setThumbnail(image)} className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer" >
                                <img src={image} alt={`Thumbnail ${index + 1}`} />
                            </div>
                        ))}
                    </div>

                    <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
                        <img src={thumbnail} alt="Selected product" />
                    </div>
                </div>

                <div className="text-sm w-full md:w-1/2">
                    <h1 className="text-3xl font-medium">{product.name}</h1>

                    <div className="flex items-center gap-0.5 mt-1">
                        {Array(5).fill('').map((_, i) => (
                            
                            <img key={i} src={i<4?assets.star_icon:assets.star_dull_icon} className='md:w-4 w-3.5 '/>
                            
                        ))}
                        <p className="text-base ml-2">(4)</p>
                    </div>

                    <div className="mt-6">
                        <p className="text-gray-500/70 line-through">MRP: {currency}{product.price}</p>
                        <p className="text-2xl font-medium">MRP: {currency}{product.offerPrice}</p>
                        <span className="text-gray-500/70">(inclusive of all taxes)</span>
                    </div>

                    <p className="text-base font-medium mt-6">About Product</p>
                    <ul className="list-disc ml-4 text-gray-500/70">
                        {product.description.map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>

                    <div className="flex items-center mt-10 gap-4 text-base">
                        <button onClick={()=>{addToCart(product._id)}} className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition" >
                            Add to Cart
                        </button>
                        <button onClick={()=>{addToCart(product._id);finalNavigate('/cart')}} className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white hover:bg-primary-dull transition" >
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
            <div className='mt-16'>
              <div className="flex flex-col items-start w-max group">
            <p className="text-2xl font-medium uppercase relative cursor-pointer items-center">
              Related Products
                <span className="absolute left-0 -bottom-1 h-0.5 bg-primary rounded-full transition-all duration-500 ease-in-out w-6 group-hover:w-full"></span>
            </p>
            </div>
          {
            relatedProducts.length>0 ?(<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mt-6">
        {
          relatedProducts.filter((product) => product.inStock).map((product, index) => (
            <ProductCard key={index } product={product} />
          ))
        }
      </div>):(
        <div className="flex items-center justify-center h-[60vh]">
          <p className='text-2xl font-medium text-primary'>No Products Found in this Category</p>
        </div>
      )
          }   
            <div className='text-center'>
                <button onClick={()=>{finalNavigate('/products');scrollTo(0,0)}} className='mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded text-primary hover:bg-primary/10 transition '>
                    See More
            </button>
            </div>
            </div>
        
        </div>
    );
};

export default ProductDetails
