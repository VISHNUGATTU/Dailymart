import React, { useState } from 'react'
import { assets, categories } from '../../assets/assets'

const AddProduct = () => {
    const [files, setFiles] = useState([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [price, setPrice] = useState(0)
    const [offerPrice, setOfferPrice] = useState(0)

    const onSubmitHandler = (e) => {
        e.preventDefault()
    }

    return (
        <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll">
            <div className="flex flex-col md:flex-row items-start justify-between md:gap-10 p-4 md:p-10">
                {/* Form */}
                <form onSubmit={onSubmitHandler} className="space-y-5 max-w-lg w-full">
                    <div>
                        <p className="text-base font-medium">Product Image</p>
                        <div className="flex flex-wrap items-center gap-3 mt-2">
                            {Array(4).fill('').map((_, index) => (
                                <label key={index} htmlFor={`image${index}`}>
                                    <input onChange={(e) => {
                                        const updatedFiles = [...files]
                                        updatedFiles[index] = e.target.files[0]
                                        setFiles(updatedFiles)
                                    }}
                                    accept="image/*" type="file" id={`image${index}`} hidden />
                                    <img className="max-w-24 cursor-pointer" src={files[index]?URL.createObjectURL(files[index]):assets.upload_area} alt="uploadArea" />
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 max-w-md">
                        <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
                        <input onChange={(e) => setName(e.target.value)} value={name}
                        id="product-name" type="text" placeholder="Type here"
                        className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>

                    <div className="flex flex-col gap-1 max-w-md">
                        <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
                        <textarea onChange={(e) => setDescription(e.target.value)} value={description}
                        id="product-description" rows={4}
                        className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
                        placeholder="Type here"></textarea>
                    </div>

                    <div className="w-full flex flex-col gap-1">
                        <label className="text-base font-medium" htmlFor="category">Category</label>
                        <select onChange={(e) => setCategory(e.target.value)} value={category}
                        id="category"
                        className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40">
                            <option value="">Select Category</option>
                            {
                                categories.map((item,index) => (
                                    <option key={index} value={item.path}>{item.path}</option>
                                ))
                            }
                        </select>
                    </div>

                    <div className="flex items-center gap-5 flex-wrap">
                        <div className="flex-1 flex flex-col gap-1 w-32">
                            <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
                            <input onChange={(e) => setPrice(e.target.value)} value={price}
                            id="product-price" type="number" placeholder="0"
                            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                        </div>
                        <div className="flex-1 flex flex-col gap-1 w-32">
                            <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
                            <input onChange={(e) => setOfferPrice(e.target.value)} value={offerPrice}
                            id="offer-price" type="number" placeholder="0"
                            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                        </div>
                    </div>

                    <button className="px-8 py-2.5 bg-primary text-white font-medium rounded cursor-pointer">ADD</button>
                </form>

                {/* Image Section */}
                <div className="hidden md:flex flex-1 justify-center items-center mt-10 md:mt-0">
                    <img src={assets.seller_addproduct} alt="Seller Illustration" className="max-w-xs md:max-w-sm" />
                </div>
            </div>
        </div>
    )
}

export default AddProduct
