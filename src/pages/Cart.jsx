// Cart.jsx
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { assets, dummyAddress } from '../assets/assets';

const Cart = () => {
    const {
        products, currency, cartItems, removeFromCart,
        getCartCount, getCartAmount, updateCartItem, navigate
    } = useAppContext();

    const [cartArray, setCartArray] = useState([]);
    const [addresses, setAddresses] = useState(dummyAddress);
    const [showAddress, setShowAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(dummyAddress[0]);
    const [paymentOption, setPaymentOption] = useState("COD");

    const getCart = (customCart = cartItems) => {
        const tempArray = [];
        for (const key in customCart) {
            const product = products.find((item) => item._id === key);
            if (product) {
                const newProduct = { ...product, quantity: customCart[key] };
                tempArray.push(newProduct);
            }
        }
        setCartArray(tempArray);
    };

    useEffect(() => {
        if (products.length > 0) {
            getCart();
        }
    }, [products, cartItems]);

    const placeOrder = () => {
        alert("Order placed successfully!");
    };

    const cartAmount = getCartAmount();
    const tax = Math.floor(cartAmount * 2) / 100;
    const total = cartAmount + tax;

    return products.length > 0 ? (
        <div className="flex flex-col md:flex-row mt-16">
            <div className='flex-1 max-w-4xl'>
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart <span className="text-sm text-primary">{getCartCount()} Items</span>
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {cartArray.map((product, index) => (
                    <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                        <div className="flex items-center md:gap-6 gap-3">
                            <div onClick={() => { navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0, 0) }} className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded">
                                <img className="max-w-full h-full object-cover" src={product.image[0]} alt={product.name} />
                            </div>
                            <div>
                                <p className="hidden md:block font-semibold">{product.name}</p>
                                <div className="font-normal text-gray-500/70">
                                    <p>Weight: <span>{product.weight || "N/A"}</span></p>
                                </div>
                            </div>
                        </div>
                        <p className="text-center">{currency}{(product.offerPrice * product.quantity).toFixed(2)}</p>
                        <div className="flex items-center justify-center space-x-4">
                            <button
                                onClick={() => {
                                    const newQty = cartItems[product._id] - 1;
                                    if (newQty <= 0) {
                                        removeFromCart(product._id);
                                    } else {
                                        updateCartItem(product._id, newQty);
                                    }
                                }}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 text-white text-lg hover:bg-red-600"
                            >
                                –
                            </button>
                            <span className="w-6 text-center text-gray-800 font-medium">{cartItems[product._id]}</span>
                            <button
                                onClick={() => updateCartItem(product._id, cartItems[product._id] + 1)}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-green-500 text-white text-lg hover:bg-green-600"
                            >
                                +
                            </button>
                        </div>
                    </div>
                ))}

                <button onClick={() => { navigate('/products'); scrollTo(0, 0); }} className="group cursor-pointer flex items-center mt-8 gap-2 text-primary font-medium">
                    <img className='group-hover:-translate-x-1 transition' src={assets.arrow_right_icon_colored} alt="arrow" />
                    Continue Shopping
                </button>
            </div>

            <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                <hr className="border-gray-300 my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">Delivery Address</p>
                    <div className="relative flex justify-between items-start mt-2">
                        <p className="text-gray-500">
                            {selectedAddress ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.country}` : "No address found"}
                        </p>
                        <button onClick={() => setShowAddress(!showAddress)} className="text-primary hover:underline cursor-pointer">
                            Change
                        </button>
                        {showAddress && (
                            <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full z-10">
                                {addresses.map((address, index) => (
                                    <p key={index} onClick={() => {
                                        setShowAddress(false);
                                        setSelectedAddress(address);
                                    }} className="text-gray-500 p-2 hover:bg-gray-100 cursor-pointer">
                                        {address.street}, {address.city}, {address.state}, {address.country}
                                    </p>
                                ))}
                                <p onClick={() => { setShowAddress(false); navigate('add-address'); }} className="text-white bg-primary text-center cursor-pointer p-2 hover:bg-primary-dull">
                                    Add address
                                </p>
                            </div>
                        )}
                    </div>

                    <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
                    <select onChange={e => setPaymentOption(e.target.value)} className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online">Online Payment</option>
                    </select>
                </div>

                <hr className="border-gray-300" />

                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between"><span>Price</span><span>{currency}{cartAmount}</span></p>
                    <p className="flex justify-between"><span>Delivery Fee</span><span className="text-green-600">Free</span></p>
                    <p className="flex justify-between"><span>Tax (2%)</span><span>{currency}{tax}</span></p>
                    <p className="flex justify-between text-lg font-medium mt-3"><span>Total Amount:</span><span>{currency}{total}</span></p>
                </div>

                <button onClick={placeOrder} className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium hover:bg-primary-dull transition">
                    {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
                </button>
            </div>
        </div>
    ) : null;
};

export default Cart;
