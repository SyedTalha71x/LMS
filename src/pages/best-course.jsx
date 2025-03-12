import React from 'react'
import Group from '../../public/Group 36.svg'

const BestCourse = () => {
  return (
   <div className="h-full bg-[#F9FAFC]">
         <main className="md:w-[85%] w-full mx-auto px-6 py-8 md:py-24">
           <div className="flex flex-col md:gap-20 gap-0 md:flex-row items-center">
           
   
             <div className="relative">
               <div className="">
                 <img src={Group} className="h-full w-full" alt="" />
               </div>
             </div>

             <div className="md:w-1/2 md:mt-24 mt-12 mb-10 md:mb-0">
               <h1 className="text-3xl md:text-4xl karma lg:text-5xl font-bold text-gray-900 leading-tight mb-2">
               We are Always Ensure Best Course for your learning
               </h1>
               <p className="text-gray-600 mb-6 max-w-md">
               Lorem Ipsum is simply dummy text of the printing and It typesetting industry. Lorem Ipsum has been the  
               </p>
               <button className="bg-[#0B5D3A] cursor-pointer text-sm text-white px-13 py-2 rounded-lg font-medium">
                 CTA
               </button>
             </div>
           </div>
         </main>
       </div>
  )
}

export default BestCourse