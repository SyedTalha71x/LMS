"use client"
import { useState, useEffect, useRef } from "react"
import { Menu, X, Search, Send, Plus } from "lucide-react"
import GroupImage from '../../../public/groups.svg'

export default function Communications() {
  const [isMessagesOpen, setIsMessagesOpen] = useState(true)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [messageText, setMessageText] = useState("")
  const [selectedChat, setSelectedChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [chatList, setChatList] = useState([
    {
      id: 1,
      name: "Discussion 1",
      lastMessage: "Oh, hello! All perfectly. I will check it and get back to you soon.",
      time: "Today | 05:30 PM",
      avatar: GroupImage,
      messages: [
        {
          id: 1,
          sender: "Other",
          content: "Oh, hello! All perfectly. I will check it and get back to you soon.",
          time: "05:30 PM",
        },
        { id: 2, sender: "You", content: "Hi, sure! Let me know if you need any clarification.", time: "05:31 PM" },
      ],
    },
    {
      id: 2,
      name: "Discussion 2",
      lastMessage: "Hey! Did you finish the Hi-Fi wireframes for Beta app design?",
      time: "Yesterday",
      avatar: GroupImage,
      messages: [
        {
          id: 1,
          sender: "Other",
          content: "Hey! Did you finish the Hi-Fi wireframes for Beta app design?",
          time: "Yesterday",
        },
      ],
    },
    {
      id: 3,
      name: "Discussion 3",
      lastMessage: "Great! I'll review it and get back to you with feedback.",
      time: "Mar 12",
      avatar: GroupImage,
      messages: [
        { id: 1, sender: "Other", content: "Great! I'll review it and get back to you with feedback.", time: "Mar 12" },
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

  return (
    <div className="relative flex h-screen bg-white text-gray-800 rounded-3xl overflow-hidden">
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
        } bg-white z-40 border-r border-gray-200`}
      >
        <div className="p-4 h-full flex flex-col relative">
        <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Discussions</h1>
            <button
              onClick={() => setIsMessagesOpen(false)}
              className="md:hidden text-gray-500 hover:text-gray-700"
              aria-label="Close messages"
            >
              <X className="w-6 h-6" />
            </button>
          </div>


          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 pl-10 border border-gray-200 bg-white rounded-xl text-sm outline-none"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2">
            {chatList.map((chat) => (
              <div
                key={chat.id}
                className={`flex items-start gap-3 p-4 border-b border-gray-200 ${
                  selectedChat?.id === chat.id ? "bg-gray-50" : "hover:bg-gray-50"
                } cursor-pointer relative group`}
                onClick={() => handleChatSelect(chat)}
              >
                <img
                  src={chat.avatar || "/placeholder.svg"}
                  alt={`${chat.name}'s avatar`}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium truncate">{chat.name}</span>
                    <span className="text-xs text-gray-500">{chat.time}</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">{chat.lastMessage}</p>
                </div>
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
                src="/placeholder.svg?height=200&width=200"
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
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMessagesOpen(true)}
                  className="md:hidden text-gray-500 hover:text-gray-700"
                  aria-label="Open messages"
                >
                  <Menu className="w-6 h-6" />
                </button>
                <img
                  src={selectedChat.avatar || "/placeholder.svg"}
                  alt={`${selectedChat.name}'s avatar`}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <span className="font-medium">{selectedChat.name}</span>
              </div>
              <div className="flex items-center gap-2">
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
                <button
                  className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
                  onClick={() => setSelectedChat(null)}
                  aria-label="Close current chat"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div key={message.id} className={`flex gap-3 ${message.sender === "You" ? "justify-end" : ""}`}>
                  <div className={`flex flex-col gap-1 ${message.sender === "You" ? "items-end" : ""}`}>
                    <div
                      className={`rounded-xl p-3 text-sm max-w-md ${
                        message.sender === "You"
                          ? "bg-green-500 text-white"
                          : "bg-white border border-gray-200 text-gray-800"
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

            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl p-2">
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
                <div className="flex items-center gap-1">
                  <button>
                    <Plus size={20} className="cursor-pointer text-gray-500" />
                  </button>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-full"
                    aria-label="Send message"
                    onClick={handleSendMessage}
                  >
                    <Send className="w-5 h-5 text-gray-500" />
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

