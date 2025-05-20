/* eslint-disable no-unused-vars */
import { useState } from "react";
import { X, Bell } from "lucide-react";
import ProfileImage from '../../../public/image (2).png'

function Profile() {

  return (
    <div className=" rounded-3xl   min-h-screen relative">
            <h1 className="  text-black text-2xl p-4 poppins-thin_600">Profile</h1>

      <main className="lg:w-[40%] w-full  mx-auto">
        <div className="p-2 md:p-6">
          <div className="flex items-center justify-between mb-8">
          </div>

          <div className="mb-8 flex flex-col justify-center items-center">
            <div className="flex items-center justify-center flex-col">
              <div className="w-24 h-24 rounded-2xl overflow-hidden mb-4">
                <img src={ProfileImage} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <button className="bg-[#1E1E1F] open_sans_font text-white px-6 text-sm py-1.5 rounded-xl  transition-colors duration-200">
                Upload picture
              </button>
            </div>
          </div>

          <div className="max-h-[calc(100vh-300px)  overflow-y-auto pr-4 custom-scrollbar">
            <form className="space-y-6 w-full max-w-md p-2 open_sans_font">
              <div className="space-y-4">
                {[
                  { label: "First Name", id: "firstName", type: "text", placeholder: "First name" },
                  { label: "Last Name", id: "lastName", type: "text", placeholder: "Last name" },
                  { label: "Email", id: "email", type: "email", placeholder: "Email" },
                  { label: "Input", id: "input", type: "text", placeholder: "Input" },
                ].map(({ label, id, type, placeholder }) => (
                  <div key={id}>
                    <label htmlFor={id} className="block text-sm font-medium mb-2">
                      {label}
                    </label>
                    <input
                      type={type}
                      id={id}
                      className="w-full px-4 py-3 rounded-xl  bg-[#F1F1F1] border-none outline-none text-sm transition-colors duration-200 focus:ring-2 focus:ring-blue-500"
                      placeholder={placeholder}
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone No
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="countryCode"
                      className="w-20 px-4 py-3 rounded-xl bg-[#F1F1F1] border-none outline-none text-sm transition-colors duration-200 focus:ring-2 focus:ring-blue-500"
                      placeholder="+1"
                    />
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 rounded-xl bg-[#F1F1F1] border-none outline-none text-sm transition-colors duration-200 focus:ring-2 focus:ring-blue-500"
                      placeholder="Phone number"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>

    </div>
  );
}

export default Profile;