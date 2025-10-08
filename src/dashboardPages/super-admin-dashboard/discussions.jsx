import { useState, useEffect, useRef } from "react"
import { Menu, Search, Plus, ThumbsUp, Clock, Paperclip, X, Smile } from "lucide-react"

export default function Discussion() {
  const [isMessagesOpen, setIsMessagesOpen] = useState(true)
  const [messageText, setMessageText] = useState("")
  const [selectedAdmin, setSelectedAdmin] = useState(null)
  const [messages, setMessages] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFiles, setSelectedFiles] = useState([])

  const [adminList, setAdminList] = useState([
    {
      id: 1,
      name: "John Smith",
      role: "Admin",
      lastMessage: "I'll review the reports and get back to you.",
      time: "Today | 02:30 PM",
      avatar: "/Rectangle 1.png",
      isOnline: true,
      messages: [
        {
          id: 1,
          sender: "John Smith",
          content: "Hello! I've completed the user verification process.",
          time: "02:15 PM",
          isYou: false,
        },
        {
          id: 2,
          sender: "You",
          content: "Great! Can you send me the summary report?",
          time: "02:20 PM",
          isYou: true,
        },
        {
          id: 3,
          sender: "John Smith",
          content: "I'll review the reports and get back to you.",
          time: "02:30 PM",
          isYou: false,
        },
      ],
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Admin",
      lastMessage: "The new features are ready for deployment.",
      time: "Today | 01:45 PM",
      avatar: "/Rectangle 1.png",
      isOnline: true,
      messages: [
        {
          id: 1,
          sender: "Sarah Johnson",
          content: "The new features are ready for deployment.",
          time: "01:45 PM",
          isYou: false,
        },
      ],
    },
    {
      id: 3,
      name: "Mike Peters",
      role: "Admin",
      lastMessage: "I've updated the user permissions as requested.",
      time: "Yesterday | 11:20 AM",
      avatar: "/Rectangle 1.png",
      isOnline: false,
      messages: [
        {
          id: 1,
          sender: "You",
          content: "Can you update the permissions for the new users?",
          time: "Yesterday | 11:00 AM",
          isYou: true,
        },
        {
          id: 2,
          sender: "Mike Peters",
          content: "I've updated the user permissions as requested.",
          time: "Yesterday | 11:20 AM",
          isYou: false,
        },
      ],
    },
    {
      id: 4,
      name: "Lisa Wong",
      role: "Admin",
      lastMessage: "Thanks! I'll handle it right away.",
      time: "Yesterday | 09:15 AM",
      avatar: "/Rectangle 1.png",
      isOnline: false,
      messages: [
        {
          id: 1,
          sender: "Lisa Wong",
          content: "Thanks! I'll handle it right away.",
          time: "Yesterday | 09:15 AM",
          isYou: false,
        },
      ],
    },
  ])

  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])
  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files)
    setSelectedFiles([...selectedFiles, ...files])
  }

  const removeFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index))
  }


  const handleSendMessage = () => {
    if ((!messageText.trim() && selectedFiles.length === 0) || !selectedAdmin) return

    const newMessage = {
      id: messages.length + 1,
      sender: "You",
      content: messageText,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isYou: true,
      files: selectedFiles.map(file => ({ name: file.name, size: file.size, type: file.type }))
    }

    setMessages([...messages, newMessage])
    const lastMessageText = messageText || `Sent ${selectedFiles.length} file(s)`
    setMessageText("")
    setSelectedFiles([])

    setAdminList((prevList) =>
      prevList.map((admin) =>
        admin.id === selectedAdmin.id
          ? { ...admin, lastMessage: lastMessageText, time: "Just now", messages: [...admin.messages, newMessage] }
          : admin,
      ),
    )
  }

  const handleAdminSelect = (admin) => {
    setSelectedAdmin(admin)
    setMessages(admin.messages || [])
    setIsMessagesOpen(false)
  }

  const filteredAdmins = adminList.filter((admin) =>
    admin.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  return (
    <div className="relative flex flex-col md:h-[90vh] h-auto bg-white text-gray-800 rounded-3xl overflow-hidden">
      

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
          } bg-white z-40 flex flex-col`}
          style={{ top: "auto", height: "calc(100% - 73px)" }}
        >
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Discussions with Admins</h2>
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search admins..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-400/50 bg-white rounded-xl text-sm outline-none"
              />
              <Search className="absolute left-3 top-3.5 h-4 w-4 text-gray-500" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4">
            {filteredAdmins.map((admin) => (
              <div
                key={admin.id}
                className={`flex items-start gap-3 p-4 border-b border-gray-200 ${
                  selectedAdmin?.id === admin.id ? "bg-green-50" : "hover:bg-gray-50"
                } cursor-pointer relative group`}
                onClick={() => handleAdminSelect(admin)}
              >
                <div className="relative">
                  <img
                    src={admin.avatar || "/placeholder.svg"}
                    alt={`${admin.name}'s avatar`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {admin.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium truncate">{admin.name}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">{admin.role}</p>
                  <p className="text-sm text-gray-600 truncate">{admin.lastMessage}</p>
                  <div className="flex gap-1 items-center mt-2">
                    <Clock size={14} className="text-gray-400" />
                    <span className="text-xs text-gray-500">{admin.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col min-w-0">
          {!selectedAdmin && (
            <div className="flex flex-col items-center justify-center h-full text-center p-6">
              <button
                onClick={() => setIsMessagesOpen(true)}
                className="md:hidden absolute top-6 left-4 text-gray-500 hover:text-gray-700"
                aria-label="Open messages"
              >
                <Menu className="w-6 h-6" />
              </button>
              <div className="mb-5">
                <div className="w-64 h-64 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-32 h-32 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-semibold mb-2">Select an Admin to Chat</h2>
              <p className="md:w-[50%] text-gray-500 text-sm mx-auto w-full">
                Choose an admin from the sidebar to start a conversation
              </p>
            </div>
          )}

          {selectedAdmin && (
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
                      src={selectedAdmin.avatar || "/placeholder.svg"}
                      alt={`${selectedAdmin.name}'s avatar`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {selectedAdmin.isOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <span className="font-medium block">{selectedAdmin.name}</span>
                    <span className="text-sm text-gray-500">{selectedAdmin.role}</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message) => (
                  <div key={message.id} className={`flex gap-3 ${message.isYou ? "justify-end" : ""}`}>
                    <div className={`flex flex-col gap-1 ${message.isYou ? "items-end" : ""}`}>
                      <div
                        className={`rounded-xl p-4 text-sm max-w-md ${
                          message.isYou ? "bg-[#0B5D3A] text-white" : "bg-white text-gray-800 shadow-sm"
                        }`}
                      >
                        {message.content && <p>{message.content}</p>}
                        {message.files && message.files.length > 0 && (
                          <div className="mt-2 space-y-2">
                            {message.files.map((file, index) => (
                              <div key={index} className={`flex items-center gap-2 p-2 rounded-lg ${message.isYou ? 'bg-white/20' : 'bg-gray-100'}`}>
                                <Paperclip size={16} />
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs truncate">{file.name}</p>
                                  <p className="text-xs opacity-70">{formatFileSize(file.size)}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-gray-500">{message.time}</span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-4 bg-[#F9F9F9] rounded-md">
                {selectedFiles.length > 0 && (
                  <div className="mb-2 flex flex-wrap gap-2">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center gap-2 bg-white rounded-lg p-2 text-sm">
                        <Paperclip size={16} className="text-gray-500" />
                        <span className="text-xs max-w-[150px] truncate">{file.name}</span>
                        <button
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
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
                  <div className="flex items-center gap-2">
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                    <button 
                      className="text-black hover:text-gray-600"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Paperclip size={20} />
                    </button>
                    <button
                      className="p-1 bg-black text-white rounded-full"
                      aria-label="Send message"
                      onClick={handleSendMessage}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <button className="text-black hover:text-gray-600">
                      <ThumbsUp size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}