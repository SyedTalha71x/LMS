/* eslint-disable no-unused-vars */
import { useState } from "react";
import { X, Bell, ChevronRight, Menu } from "lucide-react";
import ProfileImage from '../../../public/image (2).png'

function Profile() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const [notifications, setNotifications] = useState([
        {
            id: 1,
            name: "Dr. Smith",
            time: "Now",
            message:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
        {
            id: 2,
            name: "Dr. Smith",
            time: "Now",
            message:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        },
    ])

    return (
        <div className="flex rounded-3xl    min-h-screen relative">
            <div className="flex-1">


                <div className="flex items-center    md:gap-0 gap-3  justify-between mb-6">
                    <h1 className="text-black md:p-6 p-0 text-2xl poppins-thin_600">My Profile</h1>

                    <button
                        className="md:hidden p-2 rounded-md hover:bg-gray-100"
                        onClick={toggleSidebar}
                    >
                        <Menu size={24} />
                    </button>
                </div>
                <main className="lg:w-[50%] w-full  mr-auto">
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

            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 bg-opacity-50 z-10 md:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}

            <div
                className={`
          fixed top-0 right-0 bottom-0 w-[320px] bg-white p-6 z-40 
          lg:static lg:w-96 lg:block lg:rounded-3xl
          transform ${sidebarOpen
                        ? "translate-x-0"
                        : "translate-x-full lg:translate-x-0"
                    }
          transition-all duration-500 ease-in-out
          overflow-y-auto
        `}
            >
                <div className="flex justify-end items-center mb-4 lg:hidden">
                    <button onClick={toggleSidebar} className="p-1">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <div className="">
                    <h2 className="text-xl poppins-thin_600 mb-4">Notification</h2>
                    <div className="space-y-4">
                        {notifications.map((notification) => (
                            <div key={notification.id} className="pb-4 bg-[#EDEDEDE0] p-3 rounded-md">
                                <div className="flex items-start mb-1">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-1">
                                            <span className="h-2 w-2 bg-[#0B5D3A] rounded-full"></span>
                                            <div className="text-sm">Title</div>
                                            <span className="font-medium">{notification.title}</span>
                                            <span className="text-xs text-gray-500">{notification.time}</span>
                                        </div>
                                    </div>
                                    <button className="text-gray-400 hover:text-gray-600">
                                        <ChevronRight className="h-5 w-5" />
                                    </button>
                                </div>
                                <div>
                                    <span className="poppins-thin text-gray-900 text-md">Hi Name!</span>
                                </div>
                                <p className="text-sm text-gray-600">{notification.message}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Profile;