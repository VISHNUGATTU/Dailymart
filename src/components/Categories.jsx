import React from 'react'
import { assets,categories } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const Categories = () => {
    const {navigate} =useAppContext();  
  return (
    <div className='mt-16'>
        <p className='text-2x1 md:text-3x1 font-medium'>Categories</p>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-6 gap-6'>
            {
                categories.map((category, index) => (
                <div key={index} className='group cursor-pointer py-3 px-3 gap-2 rounded-xl flex flex-col justify-center items-center w-34 h-40'
                style={{backgroundColor: category.bgColor}}
                onClick={()=>{
                    navigate(`/products/${category.path.toLowerCase()}`)
                    scrollTo(0,0)
                }}
                >
                <img src={category.image} alt={category.text}
                className='group-hover:scale-108 transition max-w-28'/>
                <p className='text-sm font-medium'>{category.text}</p>
                </div>
                ))
            }
        </div>
    </div>
  )
}

export default Categories