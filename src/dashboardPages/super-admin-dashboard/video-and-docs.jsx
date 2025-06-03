/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
import { Search, Bell, ChevronRight, X, Users, Edit, FileText, Video, Trash2, Eye } from "lucide-react"
import VideoImage from '../../../public/4e133b3f4d79273195437a1b3deb8ab3a39da29c.png'

export default function VideosAndDocs() {
    const [isNotificationOpen, setIsNotificationOpen] = useState(false)
    const [selectedVideo, setSelectedVideo] = useState(null)
    const [selectedDoc, setSelectedDoc] = useState(null)
    const [isMobile, setIsMobile] = useState(false)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [editItemType, setEditItemType] = useState(null) // 'video' or 'doc'
    const [editItemId, setEditItemId] = useState(null)
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        tags: "",
        category: "",
        file: null,
    })

    // Check if screen is mobile
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        // Initial check
        checkIfMobile()

        // Add event listener for window resize
        window.addEventListener("resize", checkIfMobile)

        // Clean up
        return () => window.removeEventListener("resize", checkIfMobile)
    }, [])

    const [videos, setVideos] = useState([
        {
            id: 1,
            title: "Introduction to React",
            description: "Learn the basics of React framework",
            tags: "react, frontend",
            category: "Tutorial",
            date: "2025-05-15",
            image: VideoImage
        },
        {
            id: 2,
            title: "Advanced CSS Techniques",
            description: "Master modern CSS layouts and animations",
            tags: "css, design",
            category: "Tutorial",
            date: "2025-05-10",
            image: VideoImage
        },
    ])

    const [docs, setDocs] = useState([
        {
            id: 1,
            title: "Project Documentation",
            description: "Complete guide to project setup and architecture",
            tags: "documentation, guide",
            category: "Reference",
            date: "2025-05-20",
        },
        {
            id: 2,
            title: "API Specifications",
            description: "Detailed API endpoints and usage examples",
            tags: "api, backend",
            category: "Reference",
            date: "2025-05-18",
        },
    ])

    const notifications = [
        {
            id: 1,
            title: "New Video Uploaded",
            time: "now",
            message: "A new tutorial video has been added to the platform",
        },
    ]

    const categories = ["Tutorial", "Lecture", "Reference", "Guide"]

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            file: e.target.files[0],
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Form submitted:", formData)

        if (isEditModalOpen && editItemType) {
            // Handle edit submission
            if (editItemType === "video") {
                const updatedVideos = videos.map((item) =>
                    item.id === editItemId
                        ? {
                            ...item,
                            title: formData.title || item.title,
                            description: formData.description || item.description,
                            tags: formData.tags || item.tags,
                            category: formData.category || item.category,
                        }
                        : item,
                )
                setVideos(updatedVideos)
            } else if (editItemType === "doc") {
                const updatedDocs = docs.map((item) =>
                    item.id === editItemId
                        ? {
                            ...item,
                            title: formData.title || item.title,
                            description: formData.description || item.description,
                            tags: formData.tags || item.tags,
                            category: formData.category || item.category,
                        }
                        : item,
                )
                setDocs(updatedDocs)
            }
            setIsEditModalOpen(false)
        } else {
            // Handle new item submission
            const newItem = {
                id: formData.category === "video" ? videos.length + 1 : docs.length + 1,
                title: formData.title,
                description: formData.description,
                tags: formData.tags,
                category: formData.category,
                date: new Date().toISOString().split("T")[0], // Today's date
            }

            if (formData.category === "video") {
                setVideos([...videos, newItem])
            } else if (formData.category === "doc") {
                setDocs([...docs, newItem])
            }
            setIsAddModalOpen(false)
        }

        // Reset form
        setFormData({
            title: "",
            description: "",
            tags: "",
            category: "",
            file: null,
        })
    }

    const openEditModal = (item, type) => {
        setEditItemType(type)
        setEditItemId(item.id)
        setFormData({
            title: item.title,
            description: item.description,
            tags: item.tags,
            category: item.category,
            file: null,
        })
        setIsEditModalOpen(true)
    }

    const deleteItem = (id, type) => {
        if (type === "video") {
            setVideos(videos.filter((item) => item.id !== id))
            setSelectedVideo(null)
        } else if (type === "doc") {
            setDocs(docs.filter((item) => item.id !== id))
            setSelectedDoc(null)
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
            {isNotificationOpen && isMobile && (
                <div className="fixed inset-0 bg-black/50 z-20" onClick={() => setIsNotificationOpen(false)} />
            )}

            <div className="md:p-4 p-2">
                <div className="max-w-4xl mr-auto flex flex-col gap-4 md:flex-row md:items-center items-start justify-between">
                    <h1 className="text-2xl poppins-thin_600">Videos & Docs</h1>

                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <div className="relative flex-1 max-w-md">
                            <input
                                type="text"
                                placeholder="Search"
                                className="pl-10 pr-4 py-2 rounded-xl text-sm bg-gray-100 w-full focus:outline-none"
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        </div>

                        {isMobile && (
                            <button
                                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                                className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                            >
                                <Bell className="h-5 w-5 text-gray-600" />
                                <span className="absolute top-0 right-0 h-2 w-2 bg-green-500 rounded-full"></span>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex flex-1 overflow-hidden">
                <main
                    className={`flex-1 md:p-6 p-3 overflow-y-auto ${isMobile && isNotificationOpen ? "hidden md:block" : ""}`}
                >
                    <div className="container mx-auto">
                        <section className="mb-10">
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-xl poppins-thin_600">Videos</h1>
                                <button
                                    onClick={() => {
                                        setFormData({
                                            ...formData,
                                            category: "video",
                                        })
                                        setIsAddModalOpen(true)
                                    }}
                                    className="text-sm bg-[#0B5D3A] text-white px-4 py-1.5 rounded-lg hover:bg-opacity-90"
                                >
                                    Upload Video
                                </button>
                            </div>
                            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                                {videos.map((video) => (
                                    <div key={video.id} className="bg-[#f8f3f3] p-6 rounded-lg flex flex-col">
                                        <div className="mb-4 w-full overflow-hidden rounded-md">
                                            <img
                                                src={video.image}
                                                alt={video.title}
                                                className="w-full object-cover aspect-video rounded-md"
                                            />
                                        </div>
                                        <div className="flex items-center justify-between gap-2 ">
                                            {/* <Video className="h-5 w-5 text-gray-600" /> */}
                                            <h3 className="poppins-thin_500 text-lg">{video.title}</h3>
                                            <div className="flex space-x-2 ">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    openEditModal(video, "video")
                                                }}
                                                className="p-1.5 bg-gray-200 rounded-full hover:bg-gray-300"
                                            >
                                                <Edit className="h-3.5 w-3.5 text-gray-700" />
                                            </button>
                                        </div>
                                        </div>
                                       
                                        <p className="text-gray-800 poppins-thin text-sm mb-4">{video.description}</p>
                                        <div className="flex justify-between items-center mt-auto">
                                            <span className="text-xs text-gray-500">{video.date}</span>
                                            <button
                                                className="flex items-center bg-[#272829] text-white cursor-pointer py-2 px-4 rounded-xl text-xs poppins-thin_bold"
                                                onClick={() => setSelectedVideo(video)}
                                            >
                                                View details 
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </section>

                        <section className="mt-[6%]">
                            <div className="flex justify-between items-center mb-4">
                                <h1 className="text-xl poppins-thin_600">Documents</h1>
                                <button
                                    onClick={() => {
                                        setFormData({
                                            ...formData,
                                            category: "doc",
                                        })
                                        setIsAddModalOpen(true)
                                    }}
                                    className="text-sm bg-[#0B5D3A] text-white px-4 py-1.5 rounded-lg hover:bg-opacity-90"
                                >
                                    Upload Docs
                                </button>
                            </div>
                            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                                {docs.map((doc) => (
                                    <div key={doc.id} className="bg-[#f8f3f3] p-4 rounded-lg">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-2">
                                                <FileText className="h-5 w-5 text-gray-600" />
                                                <h3 className="poppins-thin_500 text-lg">{doc.title}</h3>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        openEditModal(doc, "doc")
                                                    }}
                                                    className="p-1.5 bg-gray-200 rounded-full hover:bg-gray-300"
                                                >
                                                    <Edit className="h-3.5 w-3.5 text-gray-700" />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-gray-800 text-sm poppins-thin mb-2">{doc.description}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-gray-500">{doc.date}</span>
                                            <button
                                                className="flex items-center bg-[#272829] text-white cursor-pointer py-2 px-4 rounded-xl text-xs poppins-thin_bold"
                                                onClick={() => setSelectedDoc(doc)}
                                            >
                                                View details   
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </main>

                <aside
                    className={`
            ${isMobile
                            ? "fixed inset-y-0 right-0 z-50 w-80 transform transition-transform duration-500 ease-in-out shadow-lg"
                            : "w-90 "
                        }
            ${isNotificationOpen || !isMobile ? "translate-x-0" : "translate-x-full"}
            bg-white overflow-y-auto
          `}
                >
                    <div className="flex justify-end items-end p-3">
                        {isMobile && (
                            <button
                                onClick={() => setIsNotificationOpen(false)}
                                className="p-1 flex justify-end items-end rounded-full hover:bg-gray-100"
                            >
                                <X className="h-5 w-5 text-gray-600" />
                            </button>
                        )}
                    </div>
                    <div className="p-6 ">
                        <h1 className="text-xl poppins-thin_600">Create Entity</h1>
                        <div className="mt-4">
                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="w-full py-2 bg-[#0B5D3A] text-sm px-7 text-white rounded-xl font-semibold hover:bg-opacity-90 transition-colors"
                            >
                                Upload video/docs
                            </button>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl poppins-thin_600">Notification</h2>
                        </div>

                        <div className="space-y-4">
                            {notifications.map((notification) => (
                                <div key={notification.id} className="bg-[#EDEDEDE0] p-4 rounded-md">
                                    <div className="flex items-start mb-2">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                                                <span className="font-medium">{notification.title}</span>
                                                <span className="text-xs text-gray-500">{notification.time}</span>
                                            </div>
                                        </div>
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <ChevronRight className="h-5 w-5" />
                                        </button>
                                    </div>
                                    <p className="text-sm text-gray-600">{notification.message}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>

            {/* Video Details Modal */}
            {selectedVideo && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-full max-w-md m-4 relative">
                        <button
                            onClick={() => setSelectedVideo(null)}
                            className="absolute top-4 right-4 text-white rounded-md cursor-pointer p-1 bg-black hover:bg-gray-800"
                        >
                            <X className="h-4 w-4" />
                        </button>

                        <div className="p-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-md text-[#161736] mb-2 poppins-thin_bold flex items-center gap-2">
                                    <Video className="h-5 w-5" /> {selectedVideo.title}
                                </h2>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => {
                                            setSelectedVideo(null)
                                            openEditModal(selectedVideo, "video")
                                        }}
                                        className="p-1.5 bg-gray-200 rounded-full hover:bg-gray-300"
                                        title="Edit Video"
                                    >
                                        <Edit className="h-4 w-4 text-gray-700" />
                                    </button>
                                </div>
                            </div>

                            <h3 className="text-md mt-4 text-gray-600 poppins-thin_800 mb-2">Description</h3>
                            <p className="text-sm mt-3 text-gray-600 mb-4">{selectedVideo.description}</p>

                            <div className="grid grid-cols-1 gap-2 mb-4 text-sm">
                                <div className="flex gap-4">
                                    <p className="text-gray-600 font-semibold w-20">Date</p>
                                    <p className="text-gray-700 text-sm">{new Date(selectedVideo.date).toLocaleDateString()}</p>
                                </div>
                                <div className="flex gap-4">
                                    <p className="text-gray-600 font-semibold w-20">Category</p>
                                    <p className="text-gray-700 text-sm">{selectedVideo.category}</p>
                                </div>
                                <div className="flex gap-4">
                                    <p className="text-gray-600 font-semibold w-20">Tags</p>
                                    <p className="text-gray-700 text-sm">{selectedVideo.tags}</p>
                                </div>
                            </div>

                            <div className="flex flex-col justify-start items-start gap-3">
                                <button className="bg-[#1E1E1F] poppins-thin_600 text-white text-xs py-2 cursor-pointer px-6 rounded-lg hover:bg-opacity-90 transition-colors w-full md:w-auto flex items-center gap-2">
                                    <Eye className="h-4 w-4" /> View Video
                                </button>

                                <button
                                    onClick={() => deleteItem(selectedVideo.id, "video")}
                                    className="bg-[#C77373] poppins-thin_600 text-white text-xs py-2 cursor-pointer px-6 rounded-lg hover:bg-opacity-90 transition-colors w-full md:w-auto flex items-center gap-2"
                                >
                                    <Trash2 className="h-4 w-4" /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Doc Details Modal */}
            {selectedDoc && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-full max-w-md m-4 relative">
                        <button
                            onClick={() => setSelectedDoc(null)}
                            className="absolute top-4 right-4 text-white rounded-md cursor-pointer p-1 bg-black hover:bg-gray-800"
                        >
                            <X className="h-4 w-4" />
                        </button>

                        <div className="p-6">
                            <div className="flex justify-between items-center">
                                <h2 className="text-md text-[#161736] mb-2 poppins-thin_bold flex items-center gap-2">
                                    <FileText className="h-5 w-5" /> {selectedDoc.title}
                                </h2>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => {
                                            setSelectedDoc(null)
                                            openEditModal(selectedDoc, "doc")
                                        }}
                                        className="p-1.5 bg-gray-200 rounded-full hover:bg-gray-300"
                                        title="Edit Document"
                                    >
                                        <Edit className="h-4 w-4 text-gray-700" />
                                    </button>
                                </div>
                            </div>

                            <h3 className="text-md mt-4 text-gray-600 poppins-thin_800 mb-2">Description</h3>
                            <p className="text-sm mt-3 text-gray-600 mb-4">{selectedDoc.description}</p>

                            <div className="grid grid-cols-1 gap-2 mb-4 text-sm">
                                <div className="flex gap-4">
                                    <p className="text-gray-600 font-semibold w-20">Date</p>
                                    <p className="text-gray-700 text-sm">{new Date(selectedDoc.date).toLocaleDateString()}</p>
                                </div>
                                <div className="flex gap-4">
                                    <p className="text-gray-600 font-semibold w-20">Category</p>
                                    <p className="text-gray-700 text-sm">{selectedDoc.category}</p>
                                </div>
                                <div className="flex gap-4">
                                    <p className="text-gray-600 font-semibold w-20">Tags</p>
                                    <p className="text-gray-700 text-sm">{selectedDoc.tags}</p>
                                </div>
                            </div>

                            <h3 className="text-md mt-10 text-gray-600 poppins-thin_800 mb-2">Documentation</h3>
                            <div className="flex flex-col justify-start items-start gap-3">
                                <button className="bg-[#1E1E1F] poppins-thin_600 text-white text-xs py-2 cursor-pointer px-6 rounded-lg hover:bg-opacity-90 transition-colors w-full md:w-auto flex items-center gap-2">
                                    <Eye className="h-4 w-4" /> View PDF
                                </button>

                                <button
                                    onClick={() => deleteItem(selectedDoc.id, "doc")}
                                    className="bg-[#C77373] poppins-thin_600 text-white text-xs py-2 cursor-pointer px-6 rounded-lg hover:bg-opacity-90 transition-colors w-full md:w-auto flex items-center gap-2"
                                >
                                    <Trash2 className="h-4 w-4" /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-full max-w-md m-4 relative p-8">
                        <button
                            onClick={() => setIsAddModalOpen(false)}
                            className="absolute top-4 right-4 text-white rounded-md cursor-pointer p-1 bg-black hover:bg-gray-800"
                        >
                            <X className="h-4 w-4" />
                        </button>

                        <h2 className="text-xl font-semibold mb-4 text-center">
                            {formData.category === "video" ? "Upload New Video" : "Upload New Document"}
                        </h2>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4 mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title:</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="Title"
                                    className="w-full p-2 bg-[#F1F1F1] text-sm outline-none rounded-md"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Description"
                                    className="w-full p-2 bg-[#F1F1F1] text-sm outline-none rounded-md"
                                    rows={3}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                                <input
                                    type="text"
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleInputChange}
                                    placeholder="Tags (comma separated)"
                                    className="w-full p-2 bg-[#F1F1F1] text-sm outline-none rounded-md"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full p-2 bg-[#F1F1F1] text-sm outline-none rounded-md"
                                    required
                                >
                                    <option value="" disabled>
                                        Select category
                                    </option>
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {formData.category === "video" ? "Upload video" : "Upload document"}
                                </label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                                    required
                                />
                            </div>

                            <div className="flex justify-center items-center gap-4 flex-col sm:flex-row">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-6 py-2 text-sm bg-gray-200 text-gray-800 rounded-xl w-full sm:w-auto hover:bg-gray-300 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 text-sm bg-[#0B5D3A] text-white rounded-xl w-full sm:w-auto hover:bg-opacity-90 transition-colors"
                                >
                                    {formData.category === "video" ? "Upload Video" : "Upload Document"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg w-full max-w-md m-4 relative p-8">
                        <button
                            onClick={() => setIsEditModalOpen(false)}
                            className="absolute top-4 right-4 text-white rounded-md cursor-pointer p-1 bg-black hover:bg-gray-800"
                        >
                            <X className="h-4 w-4" />
                        </button>

                        <h2 className="text-xl font-semibold mb-4 text-center">
                            {editItemType === "video" ? "Edit Video" : "Edit Document"}
                        </h2>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4 mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title:</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="Title"
                                    className="w-full p-2 bg-[#F1F1F1] text-sm outline-none rounded-md"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Description"
                                    className="w-full p-2 bg-[#F1F1F1] text-sm outline-none rounded-md"
                                    rows={3}
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                                <input
                                    type="text"
                                    name="tags"
                                    value={formData.tags}
                                    onChange={handleInputChange}
                                    placeholder="Tags (comma separated)"
                                    className="w-full p-2 bg-[#F1F1F1] text-sm outline-none rounded-md"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full p-2 bg-[#F1F1F1] text-sm outline-none rounded-md"
                                    required
                                >
                                    {categories.map((category) => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Replace {editItemType === "video" ? "video" : "document"} (optional)
                                </label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                                />
                            </div>

                            <div className="flex justify-center items-center gap-4 flex-col sm:flex-row">
                                <button
                                    type="button"
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-6 py-2 text-sm bg-gray-200 text-gray-800 rounded-xl w-full sm:w-auto hover:bg-gray-300 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 text-sm bg-[#0B5D3A] text-white rounded-xl w-full sm:w-auto hover:bg-opacity-90 transition-colors"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}