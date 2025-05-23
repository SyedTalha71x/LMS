/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react"
import { Menu, X, Search, Mic, Smile, MoreVertical, Star, Plus, ThumbsUp, Clock, Edit } from "lucide-react"
import Image23 from "../../../public/default.png";


export default function Discussion() {
  const [isMessagesOpen, setIsMessagesOpen] = useState(true)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [messageText, setMessageText] = useState("")
  const [selectedChat, setSelectedChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [activeFilter, setActiveFilter] = useState("All")
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [activeDropdownId, setActiveDropdownId] = useState(null)
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [profileImage, setProfileImage] = useState(Image23);
  const [chatList, setChatList] = useState([
    {
      id: 1,
      name: "Discussion 1",
      lastMessage: "Oh, hello! All perfectly. I will check it and get back to you soon.",
      time: "Today | 05:30 PM",
      avatar: "/groups.svg",
      isStarred: true,
      sender: "Jerry Helfer",
      participants: [
        { id: 1, name: "Jerry Helfer", avatar: "/Rectangle 1.png" },
        { id: 2, name: "Sarah Johnson", avatar: "/groups.svg" },
        { id: 3, name: "Mike Peters", avatar: "/groups.svg" },
        { id: 4, name: "Lisa Wong", avatar: "/groups.svg" },
        { id: 5, name: "David Chen", avatar: "/groups.svg" },
      ],
      messages: [
        {
          id: 1,
          sender: "Jerry Helfer",
          content: "Hey! Did you finish the Hi-FI wireframes for flora app design?",
          time: "05:30 PM",
          isYou: false,
        },
        {
          id: 2,
          sender: "You",
          content: "Oh, hello! All perfectly. I will check it and get back to you soon.",
          time: "05:31 PM",
          isYou: true,
        },
      ],
    },
    {
      id: 2,
      name: "Group 1",
      lastMessage: "Hey! Did you finish the Hi-FI wireframes for flora app design?",
      time: "Today | 05:30 PM",
      avatar: "/groups.svg",
      isStarred: false,
      sender: "Jerry Helfer",
      participants: [
        { id: 1, name: "Jerry Helfer", avatar: "/Rectangle 1.png" },
        { id: 2, name: "Sarah Johnson", avatar: "/groups.svg" },
      ],
      messages: [
        {
          id: 1,
          sender: "Jerry Helfer",
          content: "Hey! Did you finish the Hi-FI wireframes for flora app design?",
          time: "Today | 05:30 PM",
          isYou: false,
        },
        {
          id: 2,
          sender: "You",
          content: "Oh, hello! All perfectly. I will check it and get back to you soon.",
          time: "04:45 PM",
          isYou: true,
        },
      ],
    },
    {
      id: 3,
      name: "Group 1",
      lastMessage: "Hey! Did you finish the Hi-FI wireframes for flora app design?",
      time: "Today | 05:30 PM",
      avatar: "/groups.svg",
      isStarred: false,
      sender: "Jerry Helfer",
      participants: [
        { id: 1, name: "Jerry Helfer", avatar: "/Rectangle 1.png" },
        { id: 2, name: "Sarah Johnson", avatar: "/groups.svg" },
      ],
      messages: [
        {
          id: 1,
          sender: "Jerry Helfer",
          content: "Hey! Did you finish the Hi-FI wireframes for flora app design?",
          time: "Today | 05:30 PM",
          isYou: false,
        },
        {
          id: 2,
          sender: "You",
          content: "Oh, hello! All perfectly. I will check it and get back to you soon.",
          time: "04:45 PM",
          isYou: true,
        },
      ],
    },
    {
      id: 4,
      name: "Jerry Helfer",
      lastMessage: "Hey! Did you finish the Hi-FI wireframes for flora app design?",
      time: "Today | 05:30 PM",
      avatar: "/Rectangle 1.png",
      isStarred: false,
      sender: "Jerry Helfer",
      isOnline: true,
      participants: [{ id: 1, name: "Jerry Helfer", avatar: "/Rectangle 1.png" }],
      messages: [
        {
          id: 1,
          sender: "Jerry Helfer",
          content: "Hey! Did you finish the Hi-FI wireframes for flora app design?",
          time: "Today | 05:30 PM",
          isYou: false,
        },
        {
          id: 2,
          sender: "You",
          content: "Oh, hello! All perfectly. I will check it and get back to you soon.",
          time: "04:45 PM",
          isYou: true,
        },
      ],
    },
  ])

  const handleImageChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setProfileImage(imageUrl)
    }
  }

  const toggleCreateModal = () => {
    setShowCreateModal(!showCreateModal)
  }

  const searchInputRef = useRef(null)
  const messagesEndRef = useRef(null)
  const dropdownRef = useRef(null)
  const chatDropdownRef = useRef(null)

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdownId(null)
      }
      if (chatDropdownRef.current && !chatDropdownRef.current.contains(event.target)) {
        setActiveDropdownId(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSendMessage = () => {
    if (!messageText.trim() || !selectedChat) return

    const newMessage = {
      id: messages.length + 1,
      sender: "You",
      content: messageText,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isYou: true,
    }

    setMessages([...messages, newMessage])
    setMessageText("")

    // Update the chat list with the new message
    setChatList((prevList) =>
      prevList.map((chat) =>
        chat.id === selectedChat.id
          ? { ...chat, lastMessage: messageText, time: "Just now", messages: [...chat.messages, newMessage] }
          : chat,
      ),
    )
  }

  const handleChatSelect = (chat) => {
    setSelectedChat(chat)
    setMessages(chat.messages || [])
    setIsMessagesOpen(false)
  }

  const toggleStar = (e, chatId) => {
    e.stopPropagation()
    setChatList((prevList) =>
      prevList.map((chat) => (chat.id === chatId ? { ...chat, isStarred: !chat.isStarred } : chat)),
    )
  }

  const toggleDropdown = (e, chatId) => {
    e.stopPropagation()
    setActiveDropdownId(activeDropdownId === chatId ? null : chatId)
  }

  const handleViewDetails = (e, chat) => {
    e.stopPropagation()
    setSelectedChat(chat)
    setShowDetailsModal(true)
    setActiveDropdownId(null)
  }

  return (
    <div className="relative flex flex-col h-screen bg-white text-gray-800 rounded-3xl overflow-hidden">
    <div className="w-full p-3">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold poppins-thin_600">Discussions</h1>
        <button
          onClick={()=>setShowCreateModal(true)}
          className="bg-[#0B5D3A] text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Create Discussion
        </button>
      </div>
    </div>
    
    <div className="flex flex-1 overflow-hidden">
      {isMessagesOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden transition-opacity duration-500"
          onClick={() => setIsMessagesOpen(false)}
          aria-hidden="true"
        />
      )}
      
      <div
        className={`fixed md:relative inset-y-0 left-0 md:w-[380px] w-full rounded-tr-3xl rounded-br-3xl transform transition-transform duration-500 ease-in-out ${
          isMessagesOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } bg-white z-40 flex flex-col `}
        style={{ top: "auto", height: "calc(100% - 73px)" }} 
      >
        <div className="p-2">
          <div className="flex items-center p-3 rounded-md bg-[#F9F9F9] justify-between mb-4">
            <div className="flex space-x-2">
              <button
                className={`px-6 py-2 rounded-xl text-sm ${activeFilter === "All" ? "bg-black text-white" : "bg-gray-100 text-gray-800"}`}
                onClick={() => setActiveFilter("All")}
              >
                All
              </button>
              <button
                className={`px-6 py-2 rounded-xl border border-slate-950 text-sm ${activeFilter === "Unread" ? "bg-black text-white" : "bg-transparent text-gray-800"}`}
                onClick={() => setActiveFilter("Unread")}
              >
                Unread
              </button>
            </div>
            <button className="text-gray-500">
              <MoreVertical size={20} />
            </button>
          </div>
  
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-3 pl-10 border border-gray-400/50 bg-white rounded-xl text-sm outline-none"
            />
            <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
          </div>
        </div>
  
        {/* Discussion list */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-4">
          {chatList.map((chat) => (
            <div
              key={chat.id}
              className={`flex items-start gap-3 p-4 border-b border-gray-200 ${
                selectedChat?.id === chat.id ? "bg-green-50" : "hover:bg-gray-50"
              } cursor-pointer relative group`}
              onClick={() => handleChatSelect(chat)}
            >
              <div className="relative">
                <img
                  src={chat.avatar || "/placeholder.svg"}
                  alt={`${chat.name}'s avatar`}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="poppins-thin_500 truncate">{chat.name}</span>
                </div>
                <div className="flex items-center mt-2">
                  <p className="text-sm flex gap-1 truncate">
                    <span className="poppins-thin_600 text-gray-800">{chat.sender}: </span>
                    <div className="poppins-thin text-gray-500">{chat.lastMessage}</div>
                  </p>
                </div>
                <div className="flex gap-1 poppins-thin mt-3 items-center">
                  <Clock size={18} />
                  <span className="text-xs poppins-thin text-gray-500">{chat.time}</span>
                </div>
              </div>
              <div className="flex items-center">
                <button className="text-gray-400 hover:text-yellow-500 mr-2" onClick={(e) => toggleStar(e, chat.id)}>
                  <Star size={18} className={chat.isStarred ? "fill-yellow-500 text-yellow-500" : ""} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
  
      <div className="flex-1 flex flex-col min-w-0">
        {!selectedChat && (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <button
              onClick={() => setIsMessagesOpen(true)}
              className="md:hidden absolute top-6 left-4 text-gray-500 hover:text-gray-700"
              aria-label="Open messages"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="mb-5">
              <img src="/chat.webp" alt="Welcome to Discussions" className="w-64 h-64 mx-auto" />
            </div>
            <p className="md:w-[50%] text-gray-500 text-sm mx-auto w-full">
              Select a discussion from the sidebar to start chatting
            </p>
          </div>
        )}
  
        {selectedChat && (
          <>
            <div className="flex items-center justify-between rounded-md p-4 bg-[#F9F9F9]">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMessagesOpen(true)}
                  className="md:hidden text-gray-500 hover:text-gray-700"
                  aria-label="Open messages"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <div className="relative">
                  <img
                    src={selectedChat.avatar || "/placeholder.svg"}
                    alt={`${selectedChat.name}'s avatar`}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <span className="font-medium block">{selectedChat.name}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-gray-500 hover:text-gray-700">
                  <Star size={20} className={selectedChat.isStarred ? "fill-yellow-500 text-yellow-500" : ""} />
                </button>
                <div className="relative flex items-center">
                  <button
                    className="hover:text-gray-700 z-10"
                    aria-label="Search conversation"
                    onClick={handleSearchClick}
                  >
                    <Search className="w-6 h-6" />
                  </button>
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search..."
                    className="absolute right-0 bg-gray-100 text-gray-800 rounded-md py-1 px-2 text-sm focus:outline-none search-input-animation"
                    style={{
                      width: isSearchOpen ? 200 : 0,
                      opacity: isSearchOpen ? 1 : 0,
                      visibility: isSearchOpen ? "visible" : "hidden",
                    }}
                  />
                </div>
                <div className="relative">
                  <button 
                    className="text-gray-500 hover:text-gray-700" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveDropdownId(activeDropdownId === "chat-menu" ? null : "chat-menu");
                    }}
                  >
                    <MoreVertical size={20} />
                  </button>
                  {activeDropdownId === "chat-menu" && (
                    <div
                      ref={chatDropdownRef}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 py-1"
                    >
                      <button
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => {
                          setShowDetailsModal(true);
                          setActiveDropdownId(null);
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
  
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex gap-3 ${message.isYou ? "justify-end" : ""}`}>
                  <div className={`flex flex-col gap-1 ${message.isYou ? "items-end" : ""}`}>
                    <div
                      className={`rounded-xl p-4 text-sm max-w-md ${
                        message.isYou ? "bg-[#0B5D3A] text-white" : "bg-[#E0FBDD] text-gray-800"
                      }`}
                    >
                      <p>{message.content}</p>
                    </div>
                    <span className="text-xs text-gray-500">{message.time}</span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
  
            <div className="p-4 bg-[#F9F9F9] rounded-md">
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl p-2">
                <button className="text-black">
                  <Smile size={20} />
                </button>
                <input
                  type="text"
                  placeholder="Type your message here..."
                  className="flex-1 bg-transparent focus:outline-none text-sm min-w-0"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                />
                <div className="flex items-center gap-2">
                  <button
                    className="p-1 bg-black text-white rounded-full"
                    aria-label="Send message"
                    onClick={handleSendMessage}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button className="text-black">
                    <Mic size={20} />
                  </button>
                  <button className="text-black">
                    <ThumbsUp size={20} />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  
    {showDetailsModal && selectedChat && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-md mx-4 overflow-hidden">
          <div className="p-4 relative">
            <button
              onClick={() => setShowDetailsModal(false)}
              className="absolute top-3 right-3 cursor-pointer bg-black p-1 text-sm rounded-md text-white z-10"
            >
              <X size={15} />
            </button>
  
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex -space-x-2">
                {selectedChat.participants.slice(0, 5).map((participant, index) => (
                  <img
                    key={participant.id}
                    src={participant.avatar}
                    alt={participant.name}
                    className="w-8 h-8 rounded-full border-2 border-white"
                  />
                ))}
              </div>
              <h2 className="text-lg poppins-thin_500">{selectedChat.name}</h2>
            </div>
  
            <div className="mb-4">
              <p className="text-gray-700 mt-10 flex gap-5 md:text-sm text-xs font-bold">
                Students Enrolled: <span className="font-medium text-sm text-gray-500">10</span>
              </p>
              <p className="text-gray-700 mt-2 flex gap-5 md:text-sm text-xs font-bold">
                Link:{" "}
                <a href="#" className="font-medium text-sm text-gray-500">
                  https://mydiscussion.com
                </a>
              </p>
            </div>
  
            <button className="w-auto bg-[#C77373] text-white py-2 px-6 text-sm rounded-xl cursor-pointer transition-colors">
              Delete
            </button>
          </div>
        </div>
      </div>
    )}

{showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black/60" onClick={toggleCreateModal}></div>
          <div className="bg-white rounded-lg w-full max-w-md relative p-7 mx-4 z-10">
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
                  Upload Icon
                </label>
                <input
                  id="profile-upload-btn"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>
              {profileImage !== Image23 && <p className="text-green-600 text-xs mt-1">New image selected</p>}
            </div>

            <form className="space-y-4 custom-scrollbar overflow-y-auto max-h-[50vh]">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
                  placeholder="First Name "
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Discussion</label>
                <input
                  type="text"
                  className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
                  placeholder="Discussion"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Add People</label>
                <input
                  type="text"
                  className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
                  placeholder="Add People"
                />
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
                  Create Discussion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
  </div>
  )
}