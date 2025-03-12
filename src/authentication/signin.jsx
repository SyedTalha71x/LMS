/* eslint-disable no-unused-vars */
import { useState } from "react";
import Art from "../../public/image.png";
import { ChevronDown } from "lucide-react";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const redirect = () =>{
    window.location.href = "/";
  }

  return (
    <div className="h-screen bg-[#FFFFFF] overflow-hidden flex justify-center items-center p-2"> 
      <div className="flex h-full w-full lg:p-10 md:p-8 sm:p-0 p-0 flex-col lg:flex-row items-center justify-center">

      <div className="hidden lg:block flex-1 p-6">
          <div className="relative h-full w-full">
            <img
              src={Art}
              alt="Fitness enthusiasts working out"
              className="object-cover w-full h-full rounded-2xl"
            />
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center lg:p-16 md:p-14 sm:p-6 p-4">
          <div className="mx-auto w-full max-w-sm lg:max-w-md">
            <h1 className="mb-2 text-3xl text-center  poppins-thin_bold text-black ">
              Welcome Back <span className="inline-block animate-wave"></span>
            </h1>
            <p className="mb-8 login_p login_btn text-gray-400">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Omnis quam sunt possimus labore! Dolorum, nesciunt!
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
              <label htmlFor="email" className="block mb-1 text-sm font-medium">
                Email
              </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-xl  bg-[#F1F1F1] px-4 py-3 text-sm text-black placeholder-gray-500 outline-none"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div>
              <label htmlFor="password" className="block mb-1 text-sm font-medium">
                Password
              </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-xl  bg-[#F1F1F1] px-4 py-3 text-sm text-black placeholder-gray-500 outline-none"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
              <label htmlFor="role" className="block text-sm font-medium">
                Select role
              </label>
              <div className="relative">
                <select
                  id="role"
                  className="w-full appearance-none rounded-md border border-gray-400/40 bg-[#F1F1F1] px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select...
                  </option>
                  <option value="instructor">Instructor</option>
                  <option value="learner">Learner</option>
                  <option value="admin">Admin</option>
                  <option value="superadmin">Super Admin</option>

                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 opacity-50" />
              </div>
            </div>

              <div className="text-right">
                <a href="#" className="text-sm text-[#0B5D3A] hover:text-white">
                  Forgot Password?
                </a>
              </div>

              <button
              onClick={redirect}
                type="submit"
                className="w-full rounded-xl text-sm cursor-pointer bg-[#0B5D3A] px-4 py-3 text-white  transition-all duration-500 ease-in-out"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>

     
      </div>
    </div>
  );
}

export default Signin