import { useState, useEffect, useRef } from "react"
import { Menu, X, Search, Send, Mic, Smile, Paperclip, MoreVertical, Star, Plus, ThumbsUp, Clock } from "lucide-react"
import ChatImage from '../../../public/chat.webp'
import Group from '../../../public/groups.svg'
import Rectangle from '../../../public/Rectangle 1.png'

export default function Communications() {
  const [isMessagesOpen, setIsMessagesOpen] = useState(true)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [messageText, setMessageText] = useState("")
  const [selectedChat, setSelectedChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [activeFilter, setActiveFilter] = useState("All")
  const [chatList, setChatList] = useState([
    {
      id: 1,
      name: "Discussion 1",
      lastMessage: "Oh, hello! All perfectly. I will check it and get back to you soon.",
      time: "Today | 05:30 PM",
      avatar: Group,
      isStarred: true,
      sender: "Jerry Helfer",
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
      avatar: Group,
      isStarred: false,
      sender: "Jerry Helfer",
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
      avatar: Group,
      isStarred: false,
      sender: "Jerry Helfer",
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
      avatar: Rectangle,
      isStarred: false,
      sender: "Jerry Helfer",
      isOnline: true,
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

  const searchInputRef = useRef(null)
  const messagesEndRef = useRef(null)

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen)
  }

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

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

  return (
    <div className="relative flex h-screen bg-white text-gray-800 rounded-3xl overflow-hidden">
      <h1 className="absolute top-4 left-6 text-2xl font-bold z-50 poppins-thin_600">Discussions</h1>

      {isMessagesOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden transition-opacity duration-500"
          onClick={() => setIsMessagesOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:relative inset-y-0 left-0 md:w-[380px] w-full rounded-tr-3xl rounded-br-3xl transform transition-transform duration-500 ease-in-out ${
          isMessagesOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } bg-white z-40 `}
      >
        <div className="p-4 pt-16 h-full flex flex-col relative">
          <div className="flex items-center p-3 rounded-md bg-[#F9F9F9] justify-between mb-4">
            <div className="flex space-x-2 ">
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

          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-0">
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
                    src={chat.avatar}
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
                    <p className="text-sm flex gap-1  truncate">
                      <span className="poppins-thin_600 text-gray-800">{chat.sender}: </span>
                      <div className="poppins-thin  text-gray-500">{chat.lastMessage}</div>
                    </p>
                  </div>
                  <div className="flex gap-1 poppins-thin mt-3 items-center">
                    <Clock size={18}/>
                  <span className="text-xs poppins-thin text-gray-500">{chat.time}</span>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-yellow-500" onClick={(e) => toggleStar(e, chat.id)}>
                  <Star size={18} className={chat.isStarred ? "fill-yellow-500 text-yellow-500" : ""} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        {!selectedChat && (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <button
              onClick={() => setIsMessagesOpen(true)}
              className="md:hidden absolute top-4 left-4 text-gray-500 hover:text-gray-700"
              aria-label="Open messages"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="mb-5">
              <img
                src={ChatImage}
                alt="Welcome to Discussions"
                className="w-64 h-64 mx-auto"
              />
            </div>
            <p className="md:w-[50%] text-gray-500 text-sm mx-auto w-full">
              Select a discussion from the sidebar to start chatting
            </p>
          </div>
        )}

        {selectedChat && (
          <>
            <div className="flex items-center justify-between rounded-md p-4 bg-[#F9F9F9] ">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMessagesOpen(true)}
                  className="md:hidden text-gray-500 hover:text-gray-700"
                  aria-label="Open messages"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <div className="relative">
                  {<img
                    src={selectedChat.avatar}
                    alt={`${selectedChat.name}'s avatar`}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />}
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
                <button className="text-gray-500 hover:text-gray-700">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 ">
              {messages.map((message) => (
                <div key={message.id} className={`flex gap-3 ${message.isYou ? "justify-end" : ""}`}>
                  {/* {!message.isYou && (
                    <div className="relative">
                      <img
                        src={message.avatar}
                        alt={`${message.sender}'s avatar`}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                    </div>
                  )} */}
                  <div className={`flex flex-col gap-1 ${message.isYou ? "items-end" : ""}`}>
                    <div
                      className={`rounded-xl p-4 text-sm max-w-md ${
                        message.isYou ? "bg-[#0B5D3A] text-white" : "bg-[#E0FBDD]  text-gray-800"
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
                  <button
                    className="text-black"
                  >
                    <ThumbsUp size={20} />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

