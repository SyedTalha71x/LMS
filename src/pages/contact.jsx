import  React from "react"
import { useState } from "react"
import ContactImage from '../../public/rs-layer ⏵ 01_home_education.png.svg'


const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <div className="min-h-screen  flex flex-col items-center py-20 px-4 sm:px-6 lg:px-8">
      <h1 className="text-5xl font-bold text-center text-black karma mb-2">Contact Us</h1>
      <p className="text-center text-gray-600 mb-10 max-w-md">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      </p>

      <div className="w-full max-w-6xl bg-[#F2F2F2] p-5 rounded-xl shadow-sm overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-6 flex items-center justify-center">
            <div className="relative w-full h-full">
              <img
                src={ContactImage}
                alt="Colorful geometric design with team members"
                fill
                className="object-contain h-full w-full"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 p-6 mt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border bg-[#FFFFFF] border-gray-300/40 text-sm rounded-md shadow-sm outline-none karma"
                  placeholder="Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border bg-[#FFFFFF] border-gray-300/40 text-sm rounded-md shadow-sm outline-none karma"
                  placeholder="Email"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-3 py-2 border bg-[#FFFFFF] border-gray-300/40 text-sm rounded-md shadow-sm outline-none karma"
                  placeholder="Message"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-[#0B5D3A] cursor-pointer text-sm rounded-xl text-white font-medium py-2 px-4  transition duration-500 ease-in-out"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage