import React from 'react'
import User from '../../public/user people person users man.svg'

const BenefitsLms = () => {
  return (
    <section className="w-full py-16 bg-[#F9FAFC]">
    <div className="md:w-[90%] w-full mx-auto px-6">
      <div className="text-center mb-12 mt-10">
        <h2 className="text-3xl md:text-4xl  mb-4 karma">Benefits of our online LMS</h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
          dolore magna
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
        <div className="flex flex-col items-start rounded-xl  p-8 bg-[#faeeee] text-left">
          <div className="w-16 h-16 bg-[#3D81C2] rounded-xl flex items-center justify-center mb-4">
           <img src={User} className='h-6 w-6' alt="" />
          </div>
          <h3 className="text-xl  mb-2 karma">One on One Monitor</h3>
          <p className="text-gray-600">Lorem ipsum is simply dummy text of the printing and typesetting</p>
        </div>

        <div className="flex flex-col items-start rounded-xl  p-8 bg-[#faeeee] text-left">
          <div className="w-16 h-16 bg-[#99BE47] rounded-lg flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl  mb-2 karma">24/7 Mentor</h3>
          <p className="text-gray-600">Lorem ipsum is simply dummy text of the printing and typesetting</p>
        </div>

        <div className="flex flex-col items-start rounded-xl  p-8 bg-[#faeeee] text-left">
          <div className="w-16 h-16 bg-[#F13B8E] rounded-lg flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
              />
            </svg>
          </div>
          <h3 className="text-xl  mb-2 karma">Whiteboard</h3>
          <p className="text-gray-600">Lorem ipsum is simply dummy text of the printing and typesetting</p>
        </div>

        <div className="flex flex-col items-start rounded-xl  p-8 bg-[#faeeee] text-left">
          <div className="w-16 h-16 bg-[#FB6238] rounded-lg flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-xl  mb-2 karma">Affordable Price</h3>
          <p className="text-gray-600">Lorem ipsum is simply dummy text of the printing and typesetting</p>
        </div>
      </div>
    </div>
  </section>
  )
}

export default BenefitsLms