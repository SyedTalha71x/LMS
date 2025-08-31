// refercen code

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
} from "lucide-react"

export default function DiscussionsEnhanced() {
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
  const [discussionToDelete, setDiscussionToDelete] = useState(null)
  const [discussionToArchive, setDiscussionToArchive] = useState(null)
  const [messageToReport, setMessageToReport] = useState(null)
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=96&width=96")
  const [discussionType, setDiscussionType] = useState("General")
  const [selectedCourse, setSelectedCourse] = useState("")
  const [selectedGroup, setSelectedGroup] = useState("")
  const [showRichEditor, setShowRichEditor] = useState(false)

  const [chatList, setChatList] = useState([
    {
      id: 1,
      name: "React Development Discussion",
      lastMessage: "Great insights on hooks! Let's continue this tomorrow.",
      time: "Today | 05:30 PM",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh8JCBB6fpR2c_22ISMeGDLWtJWcTGI5RELA&s",
      isStarred: true,
      isPinned: true,
      isArchived: false,
      type: "Course",
      course: "Web Development",
      group: null,
      status: "Active",
      unreadCount: 3,
      sender: "Jerry Helfer",
      participants: [
        {
          id: 1,
          name: "Jerry Helfer",
          avatar:
            "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png",
          role: "Instructor",
        },
        {
          id: 2,
          name: "Sarah Johnson",
          avatar:
            "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png",
          role: "Student",
        },
        {
          id: 3,
          name: "Mike Peters",
          avatar:
            "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png",
          role: "Student",
        },
        {
          id: 4,
          name: "Lisa Wong",
          avatar:
            "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png",
          role: "Student",
        },
        {
          id: 5,
          name: "David Chen",
          avatar:
            "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png",
          role: "Student",
        },
      ],
      messages: [
        {
          id: 1,
          sender: "Jerry Helfer",
          content:
            "Hey everyone! Let's discuss the latest React hooks patterns. What are your thoughts on useCallback vs useMemo?",
          time: "05:25 PM",
          isYou: false,
          isPinned: false,
          reactions: [{ emoji: "👍", count: 5, users: ["Sarah", "Mike", "Lisa", "David", "You"] }],
        },
        {
          id: 2,
          sender: "Sarah Johnson",
          content:
            "I think useCallback is better for function memoization while useMemo is great for expensive calculations.",
          time: "05:28 PM",
          isYou: false,
          isPinned: false,
          reactions: [{ emoji: "💡", count: 3, users: ["Jerry", "Mike", "You"] }],
        },
        {
          id: 3,
          sender: "You",
          content:
            "Great insights! I've been using useCallback for event handlers and it's really improved performance.",
          time: "05:30 PM",
          isYou: true,
          isPinned: false,
          reactions: [],
        },
      ],
    },
    {
      id: 2,
      name: "Project Team Alpha",
      lastMessage: "Meeting scheduled for tomorrow at 2 PM",
      time: "Today | 04:45 PM",
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcOEeDQDajGhHIxpAIsb14DgVorPdxoqWRVQ&s",
      isStarred: false,
      isPinned: false,
      isArchived: false,
      type: "Group",
      course: null,
      group: "Team Alpha",
      status: "Active",
      unreadCount: 1,
      sender: "Mike Peters",
      participants: [
        {
          id: 1,
          name: "Mike Peters",
          avatar:
            "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png",
          role: "Team Lead",
        },
        {
          id: 2,
          name: "Sarah Johnson",
          avatar:
            "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png",
          role: "Developer",
        },
        {
          id: 3,
          name: "You",
          avatar:
            "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png",
          role: "Developer",
        },
      ],
      messages: [
        {
          id: 1,
          sender: "Mike Peters",
          content: "Team meeting scheduled for tomorrow at 2 PM. Please prepare your progress reports.",
          time: "04:45 PM",
          isYou: false,
          isPinned: true,
          reactions: [{ emoji: "✅", count: 2, users: ["Sarah", "You"] }],
        },
      ],
    },
    {
      id: 3,
      name: "General Announcements",
      lastMessage: "New course materials available in the library",
      time: "Yesterday | 11:30 AM",
      avatar:
        "https://resources.finalsite.net/images/v1649774880/issaquah/x4c7ttw0d8jbfhnjkbd4/GeneralAnnouncement.png",
      isStarred: false,
      isPinned: false,
      isArchived: false,
      type: "General",
      course: null,
      group: null,
      status: "Active",
      unreadCount: 0,
      sender: "Admin",
      participants: [
        {
          id: 1,
          name: "Admin",
          avatar:
            "https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-avatar-profile-picture-male-icon.png",
          role: "Administrator",
        },
      ],
      messages: [
        {
          id: 1,
          sender: "Admin",
          content: "New course materials have been added to the digital library. Check them out!",
          time: "11:30 AM",
          isYou: false,
          isPinned: true,
          reactions: [{ emoji: "📚", count: 12, users: ["Multiple users"] }],
        },
      ],
    },
  ])

  const filterOptions = [
    { key: "All", label: "All", icon: MessageSquare },
    { key: "Unread", label: "Unread", icon: Eye },
    { key: "Active", label: "Active", icon: Users },
    { key: "Archived", label: "Archived", icon: Archive },
    { key: "Course", label: "By Course", icon: BookOpen },
    { key: "Group", label: "By Group", icon: Hash },
  ]

  const courses = ["Web Development", "Data Science", "Mobile Development", "UI/UX Design"]
  const groups = ["Team Alpha", "Team Beta", "Study Group 1", "Project Team"]

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

  const handlePinMessage = (messageId) => {
    setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, isPinned: !msg.isPinned } : msg)))
  }

  const handleDeleteMessage = (messageId) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== messageId))
  }

  const handleReportMessage = (message) => {
    setMessageToReport(message)
    setShowReportModal(true)
  }

  const handleArchiveDiscussion = (discussion) => {
    setDiscussionToArchive(discussion)
    setShowArchiveConfirmModal(true)
  }

  const handleDeleteDiscussion = (discussion) => {
    setDiscussionToDelete(discussion)
    setShowDeleteConfirmModal(true)
  }

  const confirmArchive = () => {
    setChatList((prev) =>
      prev.map((chat) =>
        chat.id === discussionToArchive.id ? { ...chat, isArchived: true, status: "Archived" } : chat,
      ),
    )
    setShowArchiveConfirmModal(false)
    setDiscussionToArchive(null)
  }

  const confirmDelete = () => {
    setChatList((prev) => prev.filter((chat) => chat.id !== discussionToDelete.id))
    setShowDeleteConfirmModal(false)
    setDiscussionToDelete(null)
    if (selectedChat?.id === discussionToDelete?.id) {
      setSelectedChat(null)
    }
  }

  const handleExportDiscussion = () => {
    const discussionData = {
      name: selectedChat.name,
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
  }

  const getFilteredChats = () => {
    return chatList.filter((chat) => {
      switch (activeFilter) {
        case "Unread":
          return chat.unreadCount > 0
        case "Active":
          return chat.status === "Active"
        case "Archived":
          return chat.isArchived
        case "Course":
          return chat.type === "Course"
        case "Group":
          return chat.type === "Group"
        default:
          return !chat.isArchived
      }
    })
  }

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
              />
              <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar px-2 sm:px-4">
            {getFilteredChats().map((chat) => (
              <div
                key={chat.id}
                className={`flex items-start gap-3 p-3 sm:p-4 border-b border-gray-200 ${
                  selectedChat?.id === chat.id ? "bg-green-50" : "hover:bg-gray-50"
                } cursor-pointer relative group transition-colors`}
                onClick={() => handleChatSelect(chat)}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={chat.avatar || "/placeholder.svg"}
                    alt={`${chat.name}'s avatar`}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  {chat.isPinned && (
                    <Pin size={12} className="absolute -top-1 -right-1 text-yellow-500 fill-yellow-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <span className="poppins-thin_500 truncate text-sm sm:text-base">{chat.name}</span>
                      {chat.type === "Course" && <BookOpen size={12} className="text-blue-500 flex-shrink-0" />}
                      {chat.type === "Group" && <Hash size={12} className="text-green-500 flex-shrink-0" />}
                      {chat.type === "General" && <MessageSquare size={12} className="text-gray-500 flex-shrink-0" />}
                    </div>
                  </div>

                  <div className="flex items-center mt-1">
                    <p className="text-xs sm:text-sm flex gap-1 truncate">
                      <span className="poppins-thin_600 text-gray-800 flex-shrink-0">{chat.sender}: </span>
                      <div className="poppins-thin text-gray-500 truncate">{chat.lastMessage}</div>
                    </p>
                  </div>

                  <div className="flex gap-2 items-center mt-2">
                    <div className="flex gap-1 poppins-thin items-center">
                      <Clock size={12} />
                      <span className="text-xs poppins-thin text-gray-500">{chat.time}</span>
                    </div>
                  </div>

                  <div className="mt-2 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      {(chat.course || chat.group) && (
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600 truncate">
                          {chat.course || chat.group}
                        </span>
                      )}
                    </div>
                    {chat.unreadCount > 0 && (
                      <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center flex-shrink-0">
                        {chat.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center flex-shrink-0">
                  <button
                    className="text-gray-400 hover:text-yellow-500 mr-2 transition-colors"
                    onClick={(e) => toggleStar(e, chat.id)}
                  >
                    <Star size={16} className={chat.isStarred ? "fill-yellow-500 text-yellow-500" : ""} />
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
                <img
                  src="https://www.nicepng.com/png/detail/906-9064939_discussion-icon.png"
                  alt="Welcome to Discussions"
                  className="w-48 h-48 sm:w-64 sm:h-64 mx-auto"
                />
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
                      {/* {selectedChat.type === "Course" && <BookOpen size={14} className="text-blue-500 flex-shrink-0" />}
                      {selectedChat.type === "Group" && <Hash size={14} className="text-green-500 flex-shrink-0" />}
                      {selectedChat.type === "General" && (
                        <MessageSquare size={14} className="text-gray-500 flex-shrink-0" />
                      )} */}
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
                    <Users size={18}  />
                  </button>
                  <button className="text-gray-500 hover:text-gray-700 p-1 transition-colors">
                    <Star
                      size={18}
                      className={selectedChat.isStarred ? "fill-yellow-500 text-yellow-500" : ""}
                    />
                  </button>
              
                  <div className="relative">
                    <button
                      className="text-gray-500 hover:text-gray-700 p-1 transition-colors"
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
                                className="bg-white/20 rounded-full px-2 py-1 text-xs flex items-center gap-1"
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
                    <Smile size={18}  />
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
                className="absolute top-3 right-3 sm:top-4 sm:right-4 cursor-pointer bg-black p-1 text-sm rounded-md text-white z-10 transition-colors hover:bg-gray-800"
              >
                <X size={15} />
              </button>

              <div className="flex items-center space-x-3 mb-6">
                <img
                  src={selectedChat.avatar || "/placeholder.svg"}
                  alt={selectedChat.name}
                  className="w-12 h-12 rounded-full flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg font-semibold truncate">{selectedChat.name}</h2>
                  <p className="text-sm text-gray-500">{selectedChat.type} Discussion</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Participants</p>
                  <p className="text-sm text-gray-500">{selectedChat.participants.length} members</p>
                </div>

                {selectedChat.course && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">Course</p>
                    <p className="text-sm text-gray-500">{selectedChat.course}</p>
                  </div>
                )}

                {selectedChat.group && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">Group</p>
                    <p className="text-sm text-gray-500">{selectedChat.group}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm font-medium text-gray-700">Status</p>
                  <p className="text-sm text-gray-500">{selectedChat.status}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 mt-6">
                <button
                  className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 text-sm rounded-lg hover:bg-gray-200 transition-colors"
                  onClick={() => setShowParticipantsModal(true)}
                >
                  View Participants
                </button>
                <button
                  className="flex-1 bg-[#C77373] text-white py-2 px-4 text-sm rounded-lg hover:bg-red-600 transition-colors"
                  onClick={() => handleDeleteDiscussion(selectedChat)}
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
          <div className="bg-white rounded-lg w-full max-w-md mx-4 overflow-hidden">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Participants</h2>
                <button
                  onClick={() => setShowParticipantsModal(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-3 max-h-60 overflow-y-auto">
                {selectedChat.participants.map((participant) => (
                  <div key={participant.id} className="flex items-center gap-3">
                    <img
                      src={participant.avatar || "/placeholder.svg"}
                      alt={participant.name}
                      className="w-8 h-8 rounded-full flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{participant.name}</p>
                      <p className="text-xs text-gray-500">{participant.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {showDeleteConfirmModal && discussionToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md mx-4 p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="text-red-500 flex-shrink-0" size={24} />
              <h2 className="text-lg font-semibold">Delete Discussion</h2>
            </div>

            <p className="text-gray-600 mb-6 text-sm sm:text-base">
              Are you sure you want to delete "{discussionToDelete.name}"? This action cannot be undone and all messages
              will be permanently lost.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                onClick={() => setShowDeleteConfirmModal(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showArchiveConfirmModal && discussionToArchive && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md mx-4 p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <Archive className="text-orange-500 flex-shrink-0" size={24} />
              <h2 className="text-lg font-semibold">Archive Discussion</h2>
            </div>

            <p className="text-gray-600 mb-6 text-sm sm:text-base">
              Are you sure you want to archive "{discussionToArchive.name}"? The discussion will be moved to archived
              discussions and participants won't be able to send new messages.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                onClick={() => setShowArchiveConfirmModal(false)}
              >
                Cancel
              </button>
              <button
                className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
                onClick={confirmArchive}
              >
                Archive
              </button>
            </div>
          </div>
        </div>
      )}

      {showReportModal && messageToReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md mx-4 p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <Flag className="text-red-500 flex-shrink-0" size={24} />
              <h2 className="text-lg font-semibold">Report Message</h2>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Message from {messageToReport.sender}:</p>
              <div className="bg-gray-100 p-3 rounded-lg text-sm break-words">{messageToReport.content}</div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Reason for reporting</label>
              <select className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#0B5D3A] focus:border-[#0B5D3A] transition-colors">
                <option>Inappropriate content</option>
                <option>Spam</option>
                <option>Harassment</option>
                <option>Off-topic</option>
                <option>Other</option>
              </select>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                onClick={() => setShowReportModal(false)}
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
                Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
