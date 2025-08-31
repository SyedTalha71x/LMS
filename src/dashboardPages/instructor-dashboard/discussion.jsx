"use client"

/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react"
import {
  Menu,
  X,
  Search,
  Mic,
  Smile,
  MoreVertical,
  Star,
  Plus,
  Clock,
  Edit,
  Pin,
  Trash2,
  Flag,
  Users,
  Download,
  Archive,
  MessageSquare,
  BookOpen,
  Hash,
  Filter,
  Paperclip,
  Send,
  Eye,
  AlertTriangle,
  Settings,
} from "lucide-react"
import Image23 from "../../../public/default.png"

export default function EnhancedDiscussion() {
  const [isMessagesOpen, setIsMessagesOpen] = useState(true)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [messageText, setMessageText] = useState("")
  const [selectedChat, setSelectedChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [activeFilter, setActiveFilter] = useState("All")
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [activeDropdownId, setActiveDropdownId] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false)
  const [showArchiveConfirmModal, setShowArchiveConfirmModal] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [showParticipantsModal, setShowParticipantsModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [discussionToDelete, setDiscussionToDelete] = useState(null)
  const [discussionToArchive, setDiscussionToArchive] = useState(null)
  const [messageToReport, setMessageToReport] = useState(null)
  const [discussionType, setDiscussionType] = useState("General")
  const [selectedCourse, setSelectedCourse] = useState("")
  const [selectedGroup, setSelectedGroup] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [isModerated, setIsModerated] = useState("")
  const [isLocked, setIsLocked] = useState(false)
  const [profileImage, setProfileImage] = useState(Image23)

  const [chatList, setChatList] = useState([
    {
      id: 1,
      name: "React Development Best Practices",
      lastMessage: "Great discussion about hooks and state management!",
      time: "Today | 05:30 PM",
      avatar: "/groups.svg",
      isStarred: true,
      sender: "Jerry Helfer",
      type: "Course",
      course: "Web Development",
      isModerated: true,
      isLocked: false,
      unreadCount: 3,
      participants: [
        { id: 1, name: "Jerry Helfer", avatar: "/Rectangle 1.png", role: "Instructor" },
        { id: 2, name: "Sarah Johnson", avatar: "/groups.svg", role: "Student" },
        { id: 3, name: "Mike Peters", avatar: "/groups.svg", role: "Student" },
        { id: 4, name: "Lisa Wong", avatar: "/groups.svg", role: "Student" },
        { id: 5, name: "David Chen", avatar: "/groups.svg", role: "Student" },
      ],
      messages: [
        {
          id: 1,
          sender: "Jerry Helfer",
          content:
            "Let's discuss the best practices for React development. What are your thoughts on using hooks vs class components?",
          time: "05:30 PM",
          isYou: false,
          isPinned: true,
          reactions: [
            { emoji: "👍", count: 5 },
            { emoji: "💡", count: 2 },
          ],
        },
        {
          id: 2,
          sender: "You",
          content:
            "I think hooks provide a cleaner and more functional approach. They make state management much easier!",
          time: "05:31 PM",
          isYou: true,
          isPinned: false,
          reactions: [{ emoji: "👍", count: 3 }],
        },
      ],
    },
    {
      id: 2,
      name: "Project Team Alpha",
      lastMessage: "Meeting scheduled for tomorrow at 2 PM",
      time: "Today | 04:15 PM",
      avatar: "/groups.svg",
      isStarred: false,
      sender: "Sarah Johnson",
      type: "Group",
      group: "Team Alpha",
      isModerated: false,
      isLocked: false,
      unreadCount: 1,
      participants: [
        { id: 1, name: "Jerry Helfer", avatar: "/Rectangle 1.png", role: "Team Lead" },
        { id: 2, name: "Sarah Johnson", avatar: "/groups.svg", role: "Developer" },
        { id: 6, name: "Alex Smith", avatar: "/groups.svg", role: "Designer" },
      ],
      messages: [
        {
          id: 1,
          sender: "Sarah Johnson",
          content: "Meeting scheduled for tomorrow at 2 PM. Please review the project requirements beforehand.",
          time: "04:15 PM",
          isYou: false,
          isPinned: false,
          reactions: [],
        },
      ],
    },
    {
      id: 3,
      name: "General Discussion",
      lastMessage: "Welcome everyone to our community!",
      time: "Yesterday | 11:20 AM",
      avatar: "/groups.svg",
      isStarred: false,
      sender: "Admin",
      type: "General",
      isModerated: true,
      isLocked: false,
      unreadCount: 0,
      participants: [
        { id: 1, name: "Admin", avatar: "/Rectangle 1.png", role: "Administrator" },
        { id: 2, name: "Jerry Helfer", avatar: "/Rectangle 1.png", role: "User" },
        { id: 3, name: "Sarah Johnson", avatar: "/groups.svg", role: "User" },
      ],
      messages: [
        {
          id: 1,
          sender: "Admin",
          content: "Welcome everyone to our community! Feel free to introduce yourselves and ask questions.",
          time: "11:20 AM",
          isYou: false,
          isPinned: true,
          reactions: [{ emoji: "👋", count: 8 }],
        },
      ],
    },
  ])

  const filterOptions = [
    { key: "All", label: "All", icon: MessageSquare },
    { key: "Unread", label: "Unread", icon: Eye },
    { key: "Starred", label: "Starred", icon: Star },
    { key: "Course", label: "Course", icon: BookOpen },
    { key: "Group", label: "Group", icon: Hash },
    { key: "General", label: "General", icon: MessageSquare },
    { key: "Archived", label: "Archived", icon: Archive },
  ]

  const courses = ["Web Development", "Data Science", "Mobile Development", "UI/UX Design"]
  const groups = ["Team Alpha", "Team Beta", "Research Group", "Study Group"]

  const searchInputRef = useRef(null)
  const messagesEndRef = useRef(null)
  const dropdownRef = useRef(null)
  const chatDropdownRef = useRef(null)

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  // useEffect(() => {
  //   if (messagesEndRef.current) {
  //     messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  //   }
  // }, [messages])

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
      isPinned: false,
      reactions: [],
    }

    setMessages([...messages, newMessage])
    setMessageText("")

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

  const handlePinMessage = (messageId) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) => (msg.id === messageId ? { ...msg, isPinned: !msg.isPinned } : msg)),
    )
  }

  const handleDeleteMessage = (messageId) => {
    setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== messageId))
  }

  const handleReportMessage = (message) => {
    setMessageToReport(message)
    setShowReportModal(true)
  }

  const handleDeleteDiscussion = (discussion) => {
    setDiscussionToDelete(discussion)
    setShowDeleteConfirmModal(true)
  }

  const handleArchiveDiscussion = (discussion) => {
    setDiscussionToArchive(discussion)
    setShowArchiveConfirmModal(true)
  }

  const confirmDeleteDiscussion = () => {
    setChatList((prevList) => prevList.filter((chat) => chat.id !== discussionToDelete.id))
    setShowDeleteConfirmModal(false)
    setDiscussionToDelete(null)
    if (selectedChat?.id === discussionToDelete?.id) {
      setSelectedChat(null)
    }
  }

  const confirmArchiveDiscussion = () => {
    setChatList((prevList) =>
      prevList.map((chat) => (chat.id === discussionToArchive.id ? { ...chat, isArchived: true } : chat)),
    )
    setShowArchiveConfirmModal(false)
    setDiscussionToArchive(null)
  }

  const handleExportDiscussion = () => {
    if (!selectedChat) return

    const discussionData = {
      title: selectedChat.name,
      participants: selectedChat.participants,
      messages: messages,
      exportDate: new Date().toISOString(),
    }

    const dataStr = JSON.stringify(discussionData, null, 2)
    const dataBlob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${selectedChat.name.replace(/\s+/g, "_")}_discussion.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleEditDiscussion = () => {
    setShowEditModal(true)
  }

  const filteredChats = chatList
    .filter((chat) => {
      if (activeFilter === "All") return !chat.isArchived
      if (activeFilter === "Unread") return chat.unreadCount > 0
      if (activeFilter === "Starred") return chat.isStarred
      if (activeFilter === "Course") return chat.type === "Course"
      if (activeFilter === "Group") return chat.type === "Group"
      if (activeFilter === "General") return chat.type === "General"
      if (activeFilter === "Archived") return chat.isArchived
      return true
    })
    .filter((chat) => {
      if (!searchQuery) return true
      return (
        chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })

  return (
    <div className="relative flex flex-col md:h-[93vh] h-auto bg-white text-gray-800 rounded-3xl overflow-hidden">
      <div className="w-full p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
          <h1 className="text-xl sm:text-2xl font-bold poppins-thin_600">Discussions</h1>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-[#0B5D3A] text-white px-3 py-2 sm:px-4 sm:py-2 rounded-md text-sm font-medium flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <Plus size={16} />
            <span className="sm:inline">Create Discussion</span>
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {isMessagesOpen && (
          <div
            className="fixed inset-0 bg-black/20 z-30 lg:hidden transition-opacity duration-500"
            onClick={() => setIsMessagesOpen(false)}
            aria-hidden="true"
          />
        )}

        <div
          className={`fixed lg:relative inset-y-0 left-0 lg:w-[380px] xl:w-[420px] w-full sm:w-[380px] rounded-tr-3xl rounded-br-3xl transform transition-transform duration-500 ease-in-out ${
            isMessagesOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          } bg-white z-40 flex flex-col`}
          style={{ top: "auto", height: "calc(100% - 73px)" }}
        >
          <div className="p-2 sm:p-3">
            <div className="flex items-center p-2 sm:p-3 rounded-md bg-[#F9F9F9] justify-between mb-4">
              <div className="flex space-x-1 overflow-x-auto scrollbar-hide flex-1 mr-2">
                {filterOptions.slice(0, 4).map((filter) => {
                  const IconComponent = filter.icon
                  return (
                    <button
                      key={filter.key}
                      className={`px-2 py-2 sm:px-3 sm:py-2 rounded-xl text-xs flex items-center gap-1 whitespace-nowrap transition-colors ${
                        activeFilter === filter.key
                          ? "bg-black text-white"
                          : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      }`}
                      onClick={() => setActiveFilter(filter.key)}
                    >
                      <IconComponent size={14} />
                      <span className="hidden sm:inline">{filter.label}</span>
                    </button>
                  )
                })}
              </div>
              <div className="relative flex-shrink-0">
                <button
                  className="text-gray-500 p-1 hover:text-gray-700 transition-colors"
                  onClick={() => setActiveDropdownId(activeDropdownId === "filter-menu" ? null : "filter-menu")}
                >
                  <Filter size={16} />
                </button>
                {activeDropdownId === "filter-menu" && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 py-1 border">
                    {filterOptions.slice(4).map((filter) => {
                      const IconComponent = filter.icon
                      return (
                        <button
                          key={filter.key}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors"
                          onClick={() => {
                            setActiveFilter(filter.key)
                            setActiveDropdownId(null)
                          }}
                        >
                          <IconComponent size={14} />
                          {filter.label}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search discussions..."
                className="w-full px-4 py-3 pl-10 border border-gray-400/50 bg-white rounded-xl text-sm outline-none focus:border-[#0B5D3A] focus:ring-1 focus:ring-[#0B5D3A] transition-colors"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar px-2 sm:px-4">
            {filteredChats.map((chat) => (
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
                    <div className="flex items-center gap-2">
                      <span className="poppins-thin_500 truncate">{chat.name}</span>
                      {chat.isModerated && <Settings size={12} className="text-orange-500" />}
                      {chat.isLocked && <X size={12} className="text-red-500" />}
                    </div>
                   
                  </div>
                  <div className="flex items-center mt-2">
                    <p className="text-sm flex gap-1 truncate">
                      <span className="poppins-thin_600 text-gray-800">{chat.sender}: </span>
                      <div className="poppins-thin text-gray-500">{chat.lastMessage}</div>
                    </p>
                  </div>
                  <div className="flex gap-1 poppins-thin mt-3 items-center justify-between">
                  <div className="flex items-center gap-2">
                    
                  <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span className="text-xs poppins-thin text-gray-500">{chat.time}</span>
                    </div>
                    <div>
                       {chat.unreadCount > 0 && (
                      <span className="bg-[#0B5D3A] text-white text-xs rounded-full px-2 py-1 text-center">
                        {chat.unreadCount}
                      </span>
                    )}
                    </div>
                    </div>

                  
                    <div className="flex items-center gap-1">
                      <Users size={12} className="text-gray-400" />
                      <span className="text-xs text-gray-400">{chat.participants.length}</span>
                    </div>
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
            <div className="flex flex-col items-center justify-center h-full text-center p-4 sm:p-6">
              <button
                onClick={() => setIsMessagesOpen(true)}
                className="lg:hidden absolute top-4 sm:top-6 left-4 text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Open messages"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="mb-5">
                <img src="/chat.webp" alt="Welcome to Discussions" className="w-48 h-48 sm:w-64 sm:h-64 mx-auto" />
              </div>
              <p className="lg:w-[50%] text-gray-500 text-sm mx-auto w-full px-4">
                Select a discussion from the sidebar to start participating in conversations
              </p>
            </div>
          )}

          {selectedChat && (
            <>
              <div className="flex items-center justify-between rounded-md p-3 sm:p-4 bg-[#F9F9F9]">
                <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                  <button
                    onClick={() => setIsMessagesOpen(true)}
                    className="lg:hidden text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0"
                    aria-label="Open messages"
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                  <div className="relative flex-shrink-0">
                    <img
                      src={selectedChat.avatar || "/placeholder.svg"}
                      alt={`${selectedChat.name}'s avatar`}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium block truncate text-sm sm:text-base">{selectedChat.name}</span>
                      
                    </div>
                    <span className="text-xs sm:text-sm text-gray-500">
                      {selectedChat.participants.length} participants
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                  <button
                    className="text-gray-500 hover:text-gray-700 p-1 transition-colors"
                    onClick={() => setShowParticipantsModal(true)}
                  >
                    <Users size={18} />
                  </button>
                  <button className="text-gray-500 hover:text-gray-700 p-1 transition-colors">
                    <Star size={18} className={selectedChat.isStarred ? "fill-yellow-500 text-yellow-500" : ""} />
                  </button>
                  <div className="relative flex items-center">
                    <button
                      className="hover:text-gray-700 z-10 p-1"
                      aria-label="Search conversation"
                      onClick={handleSearchClick}
                    >
                      <Search className="w-5 h-5" />
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
                      className="text-gray-500 hover:text-gray-700 p-1"
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveDropdownId(activeDropdownId === "chat-menu" ? null : "chat-menu")
                      }}
                    >
                      <MoreVertical size={18} />
                    </button>
                    {activeDropdownId === "chat-menu" && (
                      <div
                        ref={chatDropdownRef}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 py-1 border"
                      >
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors"
                          onClick={() => {
                            setShowDetailsModal(true)
                            setActiveDropdownId(null)
                          }}
                        >
                          <Eye size={14} />
                          View Details
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors"
                          onClick={() => {
                            setShowParticipantsModal(true)
                            setActiveDropdownId(null)
                          }}
                        >
                          <Users size={14} />
                          View Participants
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors"
                          onClick={() => {
                            handleEditDiscussion()
                            setActiveDropdownId(null)
                          }}
                        >
                          <Edit size={14} />
                          Edit Discussion
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors"
                          onClick={() => {
                            handleExportDiscussion()
                            setActiveDropdownId(null)
                          }}
                        >
                          <Download size={14} />
                          Export Discussion
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors"
                          onClick={() => {
                            handleArchiveDiscussion(selectedChat)
                            setActiveDropdownId(null)
                          }}
                        >
                          <Archive size={14} />
                          Archive Discussion
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                          onClick={() => {
                            handleDeleteDiscussion(selectedChat)
                            setActiveDropdownId(null)
                          }}
                        >
                          <Trash2 size={14} />
                          Delete Discussion
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex gap-2 sm:gap-3 ${message.isYou ? "justify-end" : ""} group`}>
                    <div className={`flex flex-col gap-1 ${message.isYou ? "items-end" : ""} max-w-[85%] sm:max-w-md`}>
                      {message.isPinned && (
                        <div className="flex items-center gap-1 text-xs text-yellow-600 mb-1">
                          <Pin size={12} />
                          Pinned Message
                        </div>
                      )}
                      <div
                        className={`rounded-xl p-3 sm:p-4 text-sm relative ${
                          message.isYou ? "bg-[#0B5D3A] text-white" : "bg-[#E0FBDD] text-gray-800"
                        }`}
                      >
                        <p className="break-words">{message.content}</p>

                        {message.reactions && message.reactions.length > 0 && (
                          <div className="flex gap-1 mt-2 flex-wrap">
                            {message.reactions.map((reaction, index) => (
                              <span
                                key={index}
                                className="bg-white/20 rounded-full px-2 py-1 text-xs flex items-center gap-1 cursor-pointer hover:bg-white/30"
                              >
                                {reaction.emoji} {reaction.count}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="relative">
                            <button
                              className="text-gray-400 hover:text-gray-600 p-1 transition-colors"
                              onClick={() =>
                                setActiveDropdownId(
                                  activeDropdownId === `msg-${message.id}` ? null : `msg-${message.id}`,
                                )
                              }
                            >
                              <MoreVertical size={14} />
                            </button>
                            {activeDropdownId === `msg-${message.id}` && (
                              <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg z-50 py-1 border">
                                <button
                                  className="block w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors"
                                  onClick={() => {
                                    handlePinMessage(message.id)
                                    setActiveDropdownId(null)
                                  }}
                                >
                                  <Pin size={12} />
                                  {message.isPinned ? "Unpin" : "Pin"}
                                </button>
                                <button
                                  className="block w-full text-left px-3 py-2 text-xs text-gray-700 hover:bg-gray-100 flex items-center gap-2 transition-colors"
                                  onClick={() => {
                                    handleReportMessage(message)
                                    setActiveDropdownId(null)
                                  }}
                                >
                                  <Flag size={12} />
                                  Report
                                </button>
                                <button
                                  className="block w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                                  onClick={() => {
                                    handleDeleteMessage(message.id)
                                    setActiveDropdownId(null)
                                  }}
                                >
                                  <Trash2 size={12} />
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{message.time}</span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-3 sm:p-4 bg-[#F9F9F9] rounded-md">
                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl p-2">
                  <button className="text-black hover:text-gray-600 transition-colors flex-shrink-0">
                    <Paperclip size={18} />
                  </button>
                  <button className="text-black hover:text-gray-600 transition-colors flex-shrink-0">
                    <Smile size={18} />
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
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      className="p-2 bg-[#0B5D3A] text-white rounded-full hover:bg-green-700 transition-colors"
                      aria-label="Send message"
                      onClick={handleSendMessage}
                    >
                      <Send className="w-4 h-4" />
                    </button>
                    <button className="text-black hover:text-gray-600 transition-colors">
                      <Mic size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {showDetailsModal && selectedChat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md mx-4 overflow-hidden">
            <div className="p-4 sm:p-6 relative">
              <button
                onClick={() => setShowDetailsModal(false)}
                className="absolute top-3 right-3 cursor-pointer bg-black p-1 text-sm rounded-md text-white z-10"
              >
                <X size={15} />
              </button>

              <div className="flex items-center space-x-3 mb-6">
                <img
                  src={selectedChat.avatar || "/placeholder.svg"}
                  alt={selectedChat.name}
                  className="w-16 h-16 rounded-full"
                />
                <div>
                  <h2 className="text-lg font-semibold">{selectedChat.name}</h2>
                  <p className="text-sm text-gray-500">{selectedChat.type} Discussion</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Participants:</span>
                  <span className="text-gray-600">{selectedChat.participants.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Type:</span>
                  <span className="text-gray-600">{selectedChat.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Moderated:</span>
                  <span className="text-gray-600">{selectedChat.isModerated ? "Yes" : "No"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Status:</span>
                  <span className="text-gray-600">{selectedChat.isLocked ? "Locked" : "Active"}</span>
                </div>
                {selectedChat.course && (
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Course:</span>
                    <span className="text-gray-600">{selectedChat.course}</span>
                  </div>
                )}
                {selectedChat.group && (
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">Group:</span>
                    <span className="text-gray-600">{selectedChat.group}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  className="flex-1 bg-[#0B5D3A] text-white py-2 px-4 text-sm rounded-xl hover:bg-green-700 transition-colors"
                  onClick={() => {
                    setShowDetailsModal(false)
                    setShowEditModal(true)
                  }}
                >
                  Edit Discussion
                </button>
                <button
                  className="bg-red-500 text-white py-2 px-4 text-sm rounded-xl hover:bg-red-600 transition-colors"
                  onClick={() => {
                    setShowDetailsModal(false)
                    handleDeleteDiscussion(selectedChat)
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="fixed inset-0 bg-black/60" onClick={toggleCreateModal}></div>
          <div className="bg-white rounded-lg w-full max-w-md relative p-4 sm:p-7 mx-4 z-10 max-h-[90vh] overflow-y-auto">
            <button
              onClick={toggleCreateModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-6">Create New Discussion</h2>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Discussion Type</label>
                <div className="flex flex-col sm:flex-row gap-2">
                  {["General", "Course", "Group"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                        discussionType === type
                          ? "bg-[#0B5D3A] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      onClick={() => setDiscussionType(type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm focus:bg-white focus:ring-2 focus:ring-[#0B5D3A] transition-colors"
                  placeholder="Discussion title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm h-24 resize-none focus:bg-white focus:ring-2 focus:ring-[#0B5D3A] transition-colors"
                  placeholder="What would you like to discuss?"
                />
              </div>

              {discussionType === "Course" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Course</label>
                  <select
                    className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm focus:bg-white focus:ring-2 focus:ring-[#0B5D3A] transition-colors"
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                  >
                    <option value="">Choose a course</option>
                    {courses.map((course) => (
                      <option key={course} value={course}>
                        {course}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {discussionType === "Group" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Select Group</label>
                  <select
                    className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm focus:bg-white focus:ring-2 focus:ring-[#0B5D3A] transition-colors"
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                  >
                    <option value="">Choose a group</option>
                    {groups.map((group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Add Participants</label>
                <input
                  type="text"
                  className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm focus:bg-white focus:ring-2 focus:ring-[#0B5D3A] transition-colors"
                  placeholder="Search and add participants"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isModerated}
                    onChange={(e) => setIsModerated(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">Moderated</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isLocked}
                    onChange={(e) => setIsLocked(e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm text-gray-700">Locked</span>
                </label>
              </div>

              <div className="pt-4 flex justify-center">
                <button
                  type="button"
                  className="w-full bg-[#0B5D3A] text-white text-sm py-3 px-6 rounded-xl hover:bg-green-700 transition-colors"
                  onClick={toggleCreateModal}
                >
                  Create Discussion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showParticipantsModal && selectedChat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md mx-4 overflow-hidden max-h-[80vh]">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Participants</h3>
                <button onClick={() => setShowParticipantsModal(false)} className="text-gray-500 hover:text-gray-700">
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="p-4 overflow-y-auto max-h-96">
              {selectedChat.participants.map((participant) => (
                <div key={participant.id} className="flex items-center gap-3 py-3 border-b last:border-b-0">
                  <img
                    src={participant.avatar || "/placeholder.svg"}
                    alt={participant.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{participant.name}</p>
                    <p className="text-xs text-gray-500">{participant.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showEditModal && selectedChat && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="fixed inset-0 bg-black/60" onClick={() => setShowEditModal(false)}></div>
          <div className="bg-white rounded-lg w-full max-w-md relative p-4 sm:p-7 mx-4 z-10 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowEditModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-semibold mb-6">Edit Discussion</h2>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm focus:bg-white focus:ring-2 focus:ring-[#0B5D3A] transition-colors"
                  defaultValue={selectedChat.name}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm h-24 resize-none focus:bg-white focus:ring-2 focus:ring-[#0B5D3A] transition-colors"
                  placeholder="Discussion description"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked={selectedChat.isModerated} className="rounded" />
                  <span className="text-sm text-gray-700">Moderated</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked={selectedChat.isLocked} className="rounded" />
                  <span className="text-sm text-gray-700">Locked</span>
                </label>
              </div>

              <div className="pt-4 flex gap-2">
                <button
                  type="button"
                  className="flex-1 bg-gray-200 text-gray-800 text-sm py-3 px-6 rounded-xl hover:bg-gray-300 transition-colors"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="flex-1 bg-[#0B5D3A] text-white text-sm py-3 px-6 rounded-xl hover:bg-green-700 transition-colors"
                  onClick={() => setShowEditModal(false)}
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteConfirmModal && discussionToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-sm mx-4 p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="text-red-500" size={24} />
              <h3 className="text-lg font-semibold">Delete Discussion</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{discussionToDelete.name}"? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                onClick={() => {
                  setShowDeleteConfirmModal(false)
                  setDiscussionToDelete(null)
                }}
              >
                Cancel
              </button>
              <button
                className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                onClick={confirmDeleteDiscussion}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showArchiveConfirmModal && discussionToArchive && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-sm mx-4 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Archive className="text-orange-500" size={24} />
              <h3 className="text-lg font-semibold">Archive Discussion</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to archive "{discussionToArchive.name}"? You can restore it later.
            </p>
            <div className="flex gap-3">
              <button
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                onClick={() => {
                  setShowArchiveConfirmModal(false)
                  setDiscussionToArchive(null)
                }}
              >
                Cancel
              </button>
              <button
                className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
                onClick={confirmArchiveDiscussion}
              >
                Archive
              </button>
            </div>
          </div>
        </div>
      )}

      {showReportModal && messageToReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Report Message</h3>
              <button
                onClick={() => {
                  setShowReportModal(false)
                  setMessageToReport(null)
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Message from {messageToReport.sender}:</p>
              <p className="text-sm mt-1">{messageToReport.content}</p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Reason for reporting:</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg">
                <option>Inappropriate content</option>
                <option>Spam</option>
                <option>Harassment</option>
                <option>Off-topic</option>
                <option>Other</option>
              </select>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional details (optional):</label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg h-20 resize-none"
                placeholder="Provide more context..."
              />
            </div>
            <div className="flex gap-3">
              <button
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                onClick={() => {
                  setShowReportModal(false)
                  setMessageToReport(null)
                }}
              >
                Cancel
              </button>
              <button
                className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                onClick={() => {
                  setShowReportModal(false)
                  setMessageToReport(null)
                }}
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
