import { useState } from "react"
import { Search, MoreVertical, Bell, X, Menu, Plus } from "lucide-react"
import Image from '../../../public/image.svg'
import UserGroups from '../../../public/avatar-group.png'

const GroupsPage = () => {
  const [groups] = useState([
    {
      id: 1,
      name: "Group 1",
      subtitle: "Collaborative project",
      title: "Collaborative work",
      type: "ORGANIZATION",
      description: "When share in work-type spaces, when share completed.",
      members: [1, 2, 3, 4, 5],
    },
    {
      id: 2,
      name: "Group 1",
      subtitle: "Collaborative project",
      title: "Collaborative work",
      type: "ORGANIZATION",
      description: "When share in work-type spaces, when share completed.",
      members: [1, 2, 3, 4, 5],
    },
    {
      id: 3,
      name: "Group 1",
      subtitle: "Collaborative project",
      title: "Collaborative work",
      type: "ORGANIZATION",
      description: "When share in work-type spaces, when share completed.",
      members: [1, 2, 3, 4, 5],
    },
    {
      id: 4,
      name: "Group 1",
      subtitle: "Collaborative project",
      title: "Collaborative work",
      type: "ORGANIZATION",
      description: "When share in work-type spaces, when share completed.",
      members: [1, 2, 3, 4, 5],
    },
  ])

  // State for sidebar visibility on mobile
  const [showSidebar, setShowSidebar] = useState(false)
  
  // State for modal visibility
  const [showModal, setShowModal] = useState(false)

  // Toggle functions
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen relative">
      <div className="flex-1 p-4 md:p-6">
        <div className="flex justify-between items-center flex-col gap-4 w-full md:flex-row mb-6">
          <h1 className="text-2xl poppins-thin_600">Groups</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-[#F9F9F9] outline-none rounded-2xl text-sm w-48 md:w-64"
              />
            </div>
            <button 
              className="p-2 md:hidden bg-[#F9F9F9] rounded-full"
              onClick={toggleSidebar}
            >
              <Menu className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {groups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium poppins-thin_600">Add Entity</h2>
              <button onClick={toggleModal} className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1 text-sm">Link</label>
                <input
                  type="text"
                  className="w-full p-3 text-sm bg-gray-100 rounded-md outline-none"
                  placeholder="link"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1 text-sm">Code</label>
                <input
                  type="text"
                  className="w-full p-3 text-sm bg-gray-100 rounded-md outline-none"
                  placeholder="Enter code"
                />
              </div>
              
              <button
                type="submit"
                className="w-full py-2 text-sm bg-[#0B5D3A] text-white rounded-md font-medium"
              >
                Join code 
              </button>
            </form>
          </div>
        </div>
      )}

      {showSidebar && (
        <div 
          className="fixed inset-0 bg-black/50 bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <div 
        className={`fixed md:static top-0 right-0 h-full z-40 w-80 bg-white p-4 md:p-6 transform transition-transform duration-500 ease-in-out ${
          showSidebar ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex justify-end items-center mb-4 md:hidden">
          {/* <h2 className="font-medium">Notifications</h2> */}
          <button onClick={toggleSidebar} className="p-1">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div>
          <h1 className="font-bold mb-4">Add Entity</h1>
        </div>

        <div className="">
          {/* <h1 className="poppins-thin_600 text-black mb-6" onClick={toggleModal}>Join Group</h1> */}
          <button onClick={toggleModal} className="w-full md:w-auto py-2 bg-[#0B5D3A] text-sm px-7 text-white rounded-xl mb-6 font-semibold">Join group</button>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-medium mb-4 poppins-thin_600">Notification</h2>
          <div className="flex items-start gap-2 text-sm bg-[#F9F9F9] p-3 rounded-xl text-gray-600">
            <div className="mt-1">
              <Bell className="h-4 w-4 text-green-500" />
            </div>
            <p>
              You have been invited to collaborate on a new project. Accept the invitation to join the collaborative
              workspace and start working on the project.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function GroupCard({ group }) {
  return (
    <div className="bg-[#F9F9F9] rounded-2xl p-8">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="relative w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
            <img
              src={Image}
              alt={group.name}
              className="object-cover h-full w-full"
            />
          </div>
          <div>
            <h3 className="poppins-thin_600">{group.name}</h3>
            <p className="text-sm text-gray-500 poppins-thin">{group.subtitle}</p>
          </div>
        </div>
        <button className="text-gray-400">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-bold mb-1 poppins-thin">{group.title}</h2>
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 mt-2 poppins-thin">{group.type}</p>
        <p className="text-sm text-gray-800 poppins-thin mt-5">{group.description}</p>
      </div>

      <div className="flex -space-x-2 justify-center items-center">
        {group.members.map((member) => (
          <div key={member} className="relative w-10 h-10 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
            <img 
              src={UserGroups}
              width={32}
              height={32}
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default GroupsPage