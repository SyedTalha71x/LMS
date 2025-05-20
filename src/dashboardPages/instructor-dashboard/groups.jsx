/* eslint-disable no-unused-vars */
import { useState } from "react"
import { Search, MoreVertical, X, Menu, Edit, ChevronDown, ChevronRight, AlertTriangle } from "lucide-react"
import Image from "../../../public/image.svg"
import UserGroups from "../../../public/avatar-group.png"
import ProfilePicture from "../../../public/image (4).png"
import EditIcon from "../../../public/Group.png"

const GroupsPage = () => {
  const [showSidebar, setShowSidebar] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showGroupModal, setShowGroupModal] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState(null)
  const [profileImage, setProfileImage] = useState(ProfilePicture)
  const [openDropdownId, setOpenDropdownId] = useState(null)
  const [editProfileImage, setEditProfileImage] = useState(null)

  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Group1",
      groupId: "#12028",
      subtitle: "Collaborative project",
      title: "Collaborative work",
      type: "Introduction",
      description: "Minim dolor in amet nulla laboris enim dolore consequat..",
      members: [1, 2, 3, 4, 5],
      studentsEnrolled: 22,
      link: "https://12345678901/",
      code: "12345",
      location: "Himmel",
      timing: "12:00 PM - 01:00 PM",
      takes: "Details",
      progress: 40,
      image: Image,
    },
    {
      id: 2,
      name: "Group2",
      groupId: "#12029",
      subtitle: "Collaborative project",
      title: "Collaborative work",
      type: "Introduction",
      description: "Minim dolor in amet nulla laboris enim dolore consequat..",
      members: [1, 2, 3, 4, 5],
      studentsEnrolled: 18,
      link: "https://12345678902/",
      code: "12346",
      location: "Himmel",
      timing: "02:00 PM - 03:00 PM",
      takes: "Details",
      progress: 65,
      image: Image,
    },
    {
      id: 3,
      name: "Group3",
      groupId: "#12030",
      subtitle: "Collaborative project",
      title: "Collaborative work",
      type: "Introduction",
      description: "Minim dolor in amet nulla laboris enim dolore consequat..",
      members: [1, 2, 3, 4, 5],
      studentsEnrolled: 15,
      link: "https://12345678903/",
      code: "12347",
      location: "Himmel",
      timing: "04:00 PM - 05:00 PM",
      takes: "Details",
      progress: 30,
      image: Image,
    },
    {
      id: 4,
      name: "Group4",
      groupId: "#12031",
      subtitle: "Collaborative project",
      title: "Collaborative work",
      type: "Introduction",
      description: "Minim dolor in amet nulla laboris enim dolore consequat..",
      members: [1, 2, 3, 4, 5],
      studentsEnrolled: 20,
      link: "https://12345678904/",
      code: "12348",
      location: "Himmel",
      timing: "06:00 PM - 07:00 PM",
      takes: "Details",
      progress: 50,
      image: Image,
    },
  ])

  // Form state for editing
  const [editForm, setEditForm] = useState({
    name: "",
    groupId: "",
    subtitle: "",
    title: "",
    type: "",
    description: "",
    link: "",
    code: "",
    location: "",
    timing: "",
    takes: "",
  })

  const handleImageChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setProfileImage(imageUrl)
    }
  }

  const handleEditImageChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setEditProfileImage(imageUrl)
    }
  }

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  const toggleCreateModal = () => {
    setShowCreateModal(!showCreateModal)
  }

  const openGroupModal = (group) => {
    setSelectedGroup(group)
    setShowGroupModal(true)
  }

  const closeGroupModal = () => {
    setShowGroupModal(false)
    setSelectedGroup(null)
  }

  const openEditModal = (group) => {
    setSelectedGroup(group)
    setEditProfileImage(group.image)
    setEditForm({
      name: group.name,
      groupId: group.groupId,
      subtitle: group.subtitle,
      title: group.title,
      type: group.type,
      description: group.description,
      link: group.link,
      code: group.code,
      location: group.location,
      timing: group.timing,
      takes: group.takes,
    })
    setShowEditModal(true)
  }

  const closeEditModal = () => {
    setShowEditModal(false)
    setSelectedGroup(null)
    setEditProfileImage(null)
  }

  const openDeleteModal = (group) => {
    setSelectedGroup(group)
    setShowDeleteModal(true)
  }

  const closeDeleteModal = () => {
    setShowDeleteModal(false)
    setSelectedGroup(null)
  }

  const handleEditFormChange = (e) => {
    const { name, value } = e.target
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    if (!selectedGroup) return

    // Update the group with edited values
    const updatedGroups = groups.map((group) => {
      if (group.id === selectedGroup.id) {
        return {
          ...group,
          ...editForm,
          image: editProfileImage || group.image,
        }
      }
      return group
    })

    setGroups(updatedGroups)
    closeEditModal()
    // Show success message
    alert("Group updated successfully")
  }

  const handleDeleteGroup = () => {
    if (!selectedGroup) return

    // Filter out the selected group
    const updatedGroups = groups.filter((group) => group.id !== selectedGroup.id)
    setGroups(updatedGroups)
    closeDeleteModal()
    // Show success message
    alert("Group deleted successfully")
  }

  const toggleDropdown = (id, e) => {
    e.stopPropagation() // Prevent card click event
    setOpenDropdownId(openDropdownId === id ? null : id)
  }

  const handleDropdownClick = (e) => {
    e.stopPropagation() // Prevent closing when clicking inside dropdown
  }

  // Close dropdown when clicking outside
  const closeDropdown = () => {
    setOpenDropdownId(null)
  }

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      name: "Dr. Smith",
      time: "Now",
      message:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ])

  // Sample people for dropdown
  const people = [
    { id: 1, name: "John Doe", email: "john.doe@example.com" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com" },
    { id: 3, name: "Robert Johnson", email: "robert.j@example.com" },
    { id: 4, name: "Emily Davis", email: "emily.d@example.com" },
    { id: 5, name: "Michael Wilson", email: "michael.w@example.com" },
  ]

  return (
    <div className="flex flex-col md:flex-row min-h-screen relative" onClick={closeDropdown}>
      <div className="flex-1 p-2 md:p-6">
        <div className="flex justify-between md:items-center items-start flex-col gap-4 w-full md:flex-row mb-6">
          <h1 className="text-2xl poppins-thin_600">Groups</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-[#F9F9F9] outline-none rounded-2xl text-sm w-full md:w-64"
              />
            </div>
            <button className="p-4 md:hidden bg-[#F9F9F9] rounded-full" onClick={toggleSidebar}>
              <Menu className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {groups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              onClick={() => openGroupModal(group)}
              openDropdownId={openDropdownId}
              toggleDropdown={toggleDropdown}
              handleDropdownClick={handleDropdownClick}
              viewDetails={() => openGroupModal(group)}
              editGroup={() => openEditModal(group)}
              deleteGroup={() => openDeleteModal(group)}
            />
          ))}
        </div>
      </div>

      {/* Create Group Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md relative p-7 mx-4">
            <button onClick={toggleCreateModal} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>

            <div className="flex flex-col items-center mb-6">
              <div className="relative w-24 h-24 mb-3 bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden">
                <img src={profileImage || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <label
                    htmlFor="profile-upload"
                    className="cursor-pointer w-full h-full flex items-center justify-center text-white"
                  >
                    <Edit size={20} />
                  </label>
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
              <div className="mb-2">
                <label
                  htmlFor="profile-upload-btn"
                  className="bg-[#1E1E1F] cursor-pointer text-white text-sm py-2 px-7 rounded-xl block"
                >
                  Upload picture
                </label>
                <input
                  id="profile-upload-btn"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
              {profileImage !== ProfilePicture && <p className="text-green-600 text-xs mt-1">New image selected</p>}
            </div>

            <form className="space-y-4 custom-scrollbar overflow-y-auto max-h-[50vh]">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
                  placeholder="Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Group Key</label>
                <input
                  type="text"
                  className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
                  placeholder="Group Key"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Add People</label>
                <div className="relative">
                  <select
                    className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm appearance-none"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select people
                    </option>
                    {people.map((person) => (
                      <option key={person.id} value={person.id}>
                        {person.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4 pointer-events-none" />
                </div>
              </div>
              <div className="flex justify-center items-center mt-2">
                <span className="text-sm text-gray-700">Or</span>
              </div>

              <div>
                <input
                  type="text"
                  className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
                  placeholder="Link"
                />
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  className="md:w-auto w-full bg-[#0B5D3A] text-white text-sm py-2 px-6 rounded-xl hover:bg-green-700 transition-colors"
                  onClick={toggleCreateModal}
                >
                  Create Group
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Group Modal */}
      {showEditModal && selectedGroup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md relative p-7 mx-4">
            <button onClick={closeEditModal} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold text-center mb-4 poppins-thin_600">Edit Group</h2>

            <div className="flex flex-col items-center mb-6">
              <div className="relative w-24 h-24 mb-3 bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden">
                <img src={editProfileImage || "/placeholder.svg"} alt="Group" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <label
                    htmlFor="edit-profile-upload"
                    className="cursor-pointer w-full h-full flex items-center justify-center text-white"
                  >
                    <Edit size={20} />
                  </label>
                  <input
                    id="edit-profile-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleEditImageChange}
                  />
                </div>
              </div>
              <div className="mb-2">
                <label
                  htmlFor="edit-profile-upload-btn"
                  className="bg-[#1E1E1F] cursor-pointer text-white text-sm py-2 px-7 rounded-xl block"
                >
                  Change picture
                </label>
                <input
                  id="edit-profile-upload-btn"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleEditImageChange}
                />
              </div>
              {editProfileImage !== selectedGroup.image && (
                <p className="text-green-600 text-xs mt-1">New image selected</p>
              )}
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4 custom-scrollbar overflow-y-auto max-h-[50vh]">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditFormChange}
                  className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
                  placeholder="Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Group Key</label>
                <input
                  type="text"
                  name="groupId"
                  value={editForm.groupId}
                  onChange={handleEditFormChange}
                  className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
                  placeholder="Group Key"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                <input
                  type="text"
                  name="subtitle"
                  value={editForm.subtitle}
                  onChange={handleEditFormChange}
                  className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
                  placeholder="Subtitle"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={editForm.title}
                  onChange={handleEditFormChange}
                  className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
                  placeholder="Title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <input
                  type="text"
                  name="type"
                  value={editForm.type}
                  onChange={handleEditFormChange}
                  className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
                  placeholder="Type"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditFormChange}
                  className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
                  placeholder="Description"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Link</label>
                <input
                  type="text"
                  name="link"
                  value={editForm.link}
                  onChange={handleEditFormChange}
                  className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
                  placeholder="Link"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
                <input
                  type="text"
                  name="code"
                  value={editForm.code}
                  onChange={handleEditFormChange}
                  className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
                  placeholder="Code"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={editForm.location}
                  onChange={handleEditFormChange}
                  className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
                  placeholder="Location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Timing</label>
                <input
                  type="text"
                  name="timing"
                  value={editForm.timing}
                  onChange={handleEditFormChange}
                  className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
                  placeholder="Timing"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Takes</label>
                <input
                  type="text"
                  name="takes"
                  value={editForm.takes}
                  onChange={handleEditFormChange}
                  className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
                  placeholder="Takes"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Manage Participants</label>
                <div className="relative">
                  <select
                    className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm appearance-none"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Add participant
                    </option>
                    {people.map((person) => (
                      <option key={person.id} value={person.id}>
                        {person.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2 mt-2">
                <p className="text-sm font-medium text-gray-700">Current Participants:</p>
                <div className="max-h-32 overflow-y-auto bg-gray-50 rounded-xl p-2">
                  {people.slice(0, selectedGroup.members.length).map((person) => (
                    <div key={person.id} className="flex items-center justify-between p-2 hover:bg-gray-100 rounded">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
                          <img
                            src={UserGroups || "/placeholder.svg"}
                            alt={person.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-sm">{person.name}</span>
                      </div>
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-700"
                        onClick={(e) => e.preventDefault()}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  className="bg-gray-200 text-gray-800 text-sm py-2 px-6 rounded-xl hover:bg-gray-300 transition-colors"
                  onClick={closeEditModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#0B5D3A] text-white text-sm py-2 px-6 rounded-xl hover:bg-green-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedGroup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md relative p-7 mx-4">
            <div className="flex flex-col items-center mb-6">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold text-center mb-2 poppins-thin_600">Delete Group</h2>
              <p className="text-center text-gray-600">
                Are you sure you want to delete <span className="font-semibold">{selectedGroup.name}</span>? This action
                cannot be undone.
              </p>
            </div>

            <div className="flex flex-col space-y-3">
              <button
                onClick={handleDeleteGroup}
                className="w-full bg-red-600 text-white text-sm py-3 rounded-xl hover:bg-red-700 transition-colors"
              >
                Delete Group
              </button>
              <button
                onClick={closeDeleteModal}
                className="w-full bg-gray-200 text-gray-800 text-sm py-3 rounded-xl hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Group Details Modal */}
      {showGroupModal && selectedGroup && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md relative p-6 mx-4 max-h-[75vh] custom-scrollbar overflow-y-auto">
            <button
              onClick={closeGroupModal}
              className="absolute top-3 right-3 cursor-pointer bg-black p-1 text-sm rounded-md text-white z-10"
            >
              <X size={15} />
            </button>

            <div className="flex justify-start items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
                <img
                  src={selectedGroup.image || "/placeholder.svg"}
                  alt={selectedGroup.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <h2 className="text-md poppins-thin_500">{selectedGroup.name}</h2>
                <p className="text-gray-500 text-sm poppins-thin_500">{selectedGroup.groupId}</p>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg text-gray-700 poppins-thin_800 mb-2">Group key</h3>
              <p className="text-sm text-gray-600 poppins-thin_500 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </p>

              <div className="space-y-3 mt-10">
                <div className="flex justify-start items-center gap-4">
                  <span className="text-gray-700 md:text-sm text-xs font-bold">Students Enrolled:</span>
                  <span className="text-gray-500 md:text-sm text-xs font-bold">{selectedGroup.studentsEnrolled}</span>
                </div>

                <div className="flex justify-start items-center gap-4">
                  <span className="text-gray-700 md:text-sm text-xs font-bold">Link:</span>
                  <span className="text-gray-500 md:text-sm text-xs font-bold">{selectedGroup.link}</span>
                </div>

                <div className="flex justify-start items-center gap-4">
                  <span className="text-gray-700 md:text-sm text-xs font-bold">Code:</span>
                  <span className="text-gray-500 md:text-sm text-xs font-bold">{selectedGroup.code}</span>
                </div>

                <div className="flex justify-start items-center gap-4">
                  <span className="text-gray-700 md:text-sm text-xs font-bold">Location:</span>
                  <span className="text-gray-500 md:text-sm text-xs font-bold">{selectedGroup.location}</span>
                </div>

                <div className="flex justify-start items-center gap-4">
                  <span className="text-gray-700 md:text-sm text-xs font-bold">Timing:</span>
                  <span className="text-gray-500 md:text-sm text-xs font-bold">{selectedGroup.timing}</span>
                </div>

                <div className="flex justify-start items-center gap-4">
                  <span className="text-gray-700 md:text-sm text-xs font-bold">Takes:</span>
                  <span className="text-gray-500 md:text-sm text-xs font-bold">{selectedGroup.takes}</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg text-gray-700 poppins-thin_800 mb-2">Participants</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {people.slice(0, selectedGroup.members.length).map((participant) => (
                  <div key={participant.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                        <img
                          src={UserGroups || "/placeholder.svg"}
                          alt={participant.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{participant.name}</p>
                        <p className="text-xs text-gray-500">{participant.email}</p>
                      </div>
                    </div>
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">Student</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg text-gray-700 poppins-thin_800 mb-2">Progress</h3>

              <div className="mb-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-gray-800 poppins-thin_600">Group activity</span>
                  <span className="text-xs text-gray-400 poppins-thin_600">{selectedGroup.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: `${selectedGroup.progress}%` }}></div>
                </div>
              </div>
            </div>

            <div className="mb-2">
              <h3 className="text-lg text-gray-700 poppins-thin_800 mb-2">Actions</h3>

              <div className="flex flex-col justify-start items-start gap-2">
                <button className="bg-[#1E1E1F] text-white poppins-thin_500 px-5 text-sm py-1.5 rounded-xl">
                  View
                </button>
                <button
                  onClick={() => {
                    closeGroupModal()
                    openEditModal(selectedGroup)
                  }}
                  className="bg-[#0B5D3A] text-white poppins-thin_500 px-5 text-sm py-1.5 rounded-xl"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    closeGroupModal()
                    openDeleteModal(selectedGroup)
                  }}
                  className="bg-[#C77373] text-white poppins-thin_500 px-5 text-sm py-1.5 rounded-xl"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSidebar && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-40 md:hidden" onClick={toggleSidebar}></div>
      )}

      <div
        className={`fixed md:static top-0 right-0 h-full z-40 w-90 bg-white p-4 md:p-6 transform transition-transform duration-500 ease-in-out ${
          showSidebar ? "translate-x-0" : "translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex justify-end items-center mb-4 md:hidden">
          <button onClick={toggleSidebar} className="p-1">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div>
          <h1 className="text-lg poppins-thin_600 mb-4">Add Entity</h1>
        </div>

        <div className="">
          <button
            onClick={toggleCreateModal}
            className="w-full md:w-auto py-2 bg-[#0B5D3A] text-sm px-7 text-white rounded-xl mb-6 font-semibold"
          >
            Add group
          </button>
        </div>

        <div className="">
          <h2 className="text-lg poppins-thin_600 mb-4">Notification</h2>
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
  )
}

function GroupCard({
  group,
  openDropdownId,
  toggleDropdown,
  handleDropdownClick,
  viewDetails,
  editGroup,
  deleteGroup,
}) {
  return (
    <div className="bg-[#F9F9F9] rounded-2xl p-8 cursor-pointer">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="relative w-16 h-16 rounded-full bg-gray-200 overflow-hidden">
            <img src={group.image || "/placeholder.svg"} alt={group.name} className="object-cover h-full w-full" />
          </div>
          <div>
            <h3 className="poppins-thin_600">{group.name}</h3>
            <p className="text-sm text-gray-500 poppins-thin">{group.subtitle}</p>
          </div>
        </div>
        <div className="relative">
          <button className="" onClick={(e) => toggleDropdown(group.id, e)}>
            <MoreVertical className="h-5 w-5" />
          </button>

          {/* Dropdown menu */}
          {openDropdownId === group.id && (
            <div
              className="absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white z-10"
              onClick={handleDropdownClick}
            >
              <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  onClick={(e) => {
                    e.stopPropagation()
                    viewDetails()
                  }}
                >
                  View Details
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  onClick={(e) => {
                    e.stopPropagation()
                    editGroup()
                  }}
                >
                  Edit Group
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  role="menuitem"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteGroup()
                  }}
                >
                  Delete Group
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl mb-1 poppins-thin_500">{group.title}</h2>
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 mt-2 poppins-thin">{group.type}</p>
        <p className="text-sm text-gray-800 poppins-thin mt-5">{group.description}</p>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex">
          {group.members.map((member) => (
            <div
              key={member}
              className="relative w-10 h-10 rounded-full bg-gray-200 border-2 border-white overflow-hidden"
            >
              <div>
                <img
                  src={UserGroups || "/placeholder.svg"}
                  width={32}
                  height={32}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>
        <div>
          <button
            className="flex cursor-pointer items-center gap-2 text-sm"
            onClick={(e) => {
              e.stopPropagation()
              editGroup()
            }}
          >
            <img src={EditIcon || "/placeholder.svg"} alt="Edit" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default GroupsPage
