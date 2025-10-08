"use client"

/* eslint-disable no-unused-vars */
import { useState } from "react"
import {
  Button,
  Card,
  Input,
  Modal,
  Form,
  Select,
  Upload,
  message,
  Dropdown,
  Space,
  Divider,
  Typography,
  Tabs,
  Tag,
  Progress,
  Statistic,
  Avatar,
  List,
  Badge,
  Row,
  Col,
} from "antd"
import {
  SearchOutlined,
  UploadOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  FileTextOutlined,
  VideoCameraOutlined,
  PlusOutlined,
  DragOutlined,
  SaveOutlined,
  SendOutlined,
  BookOutlined,
  QuestionCircleOutlined,
  FileOutlined,
  LinkOutlined,
  ArrowLeftOutlined,
  UserOutlined,
  PlayCircleOutlined,
  DownloadOutlined,
  CopyOutlined,
  SettingOutlined,
  FolderOutlined,
  RightOutlined,
  DownOutlined,
  MenuOutlined,
  UpOutlined,
} from "@ant-design/icons"
import { newDocsData, newVideosData } from "../../utils/videosData"

const { Search } = Input
const { Option } = Select
const { TextArea } = Input
const { Title, Text } = Typography
const { TabPane } = Tabs

export default function VideosAndDocs() {
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [selectedDoc, setSelectedDoc] = useState(null)
  const [selectedContent, setSelectedContent] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isContentDetailOpen, setIsContentDetailOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [editItemType, setEditItemType] = useState(null)
  const [editItemId, setEditItemId] = useState(null)
  const [editContentItem, setEditContentItem] = useState(null)
  const [deleteItemData, setDeleteItemData] = useState(null)
  const [previewMode, setPreviewMode] = useState(false)
  const [draggedItem, setDraggedItem] = useState(null)
  const [dragOverIndex, setDragOverIndex] = useState(null)
  const [currentView, setCurrentView] = useState("main") // 'main' or 'detail'
  const [selectedContentForDetail, setSelectedContentForDetail] = useState(null)
  const [expandedModules, setExpandedModules] = useState(new Set())
  const [playingVideoId, setPlayingVideoId] = useState(null)
  const [form] = Form.useForm()
  const [contentItemForm] = Form.useForm()
  const [editContentItemForm] = Form.useForm()

  const [searchQuery, setSearchQuery] = useState("")

  // Add these state variables near your existing state declarations (around line 40)
  const [isAddContentItemModalOpen, setIsAddContentItemModalOpen] = useState(false)
  const [isEditContentItemModalOpen, setIsEditContentItemModalOpen] = useState(false)
  const [isDetailAddContentItemModalOpen, setIsDetailAddContentItemModalOpen] = useState(false)
  const [isDetailEditContentItemModalOpen, setIsDetailEditContentItemModalOpen] = useState(false)

  const [videos, setVideos] = useState(newVideosData)
  const [docs, setDocs] = useState(newDocsData)

  const [contentStructure, setContentStructure] = useState([
    {
      id: "1",
      type: "module",
      title: "Getting Started",
      order: 1,
      expanded: true,
      description: "Introduction and basic concepts",
      children: [
        {
          id: "1-1",
          type: "video",
          title: "Introduction Video",
          order: 1,
          parentId: "1",
          description: "Course overview video",
        },
        {
          id: "1-2",
          type: "document",
          title: "Course Materials",
          order: 2,
          parentId: "1",
          description: "Downloadable resources",
        },
      ],
    },
    {
      id: "2",
      type: "module",
      title: "Advanced Topics",
      order: 2,
      expanded: false,
      description: "Deep dive into advanced concepts",
      children: [
        {
          id: "2-1",
          type: "text",
          title: "Text Lesson",
          order: 1,
          parentId: "2",
          description: "Written content lesson",
        },
        {
          id: "2-2",
          type: "quiz",
          title: "Knowledge Check",
          order: 2,
          parentId: "2",
          description: "Quiz with 5 questions",
        },
      ],
    },
  ])

  const categories = ["Tutorial", "Lecture", "Reference", "Guide"]

  const contentTypes = [
    { key: "module", label: "Module/Folder", icon: <FolderOutlined /> },
    { key: "video", label: "Video", icon: <VideoCameraOutlined /> },
    { key: "document", label: "Document", icon: <FileTextOutlined /> },
    { key: "text", label: "Text Lesson", icon: <BookOutlined /> },
    { key: "quiz", label: "Quiz", icon: <QuestionCircleOutlined /> },
    { key: "assignment", label: "Assignment", icon: <FileOutlined /> },
    { key: "link", label: "External Link", icon: <LinkOutlined /> },
  ]

  const handleSearch = (value) => {
    setSearchQuery(value)
  }

  const handleAddVideo = () => {
    setIsAddModalOpen(true)
    form.setFieldsValue({ type: "video" })
  }

  const handleAddDoc = () => {
    setIsAddModalOpen(true)
    form.setFieldsValue({ type: "document" })
  }

  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.tags.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredDocs = docs.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSubmit = (values) => {
    if (isEditModalOpen && editItemType) {
      // Handle edit submission
      if (editItemType === "video") {
        const updatedVideos = videos.map((item) =>
          item.id === editItemId ? { ...item, ...values, id: editItemId } : item,
        )
        setVideos(updatedVideos)
      } else if (editItemType === "document") {
        const updatedDocs = docs.map((item) => (item.id === editItemId ? { ...item, ...values, id: editItemId } : item))
        setDocs(updatedDocs)
      }
      setIsEditModalOpen(false)
      message.success("Item updated successfully!")
    } else {
      // Handle new item submission
      const newItem = {
        id: values.type === "video" ? videos.length + 1 : docs.length + 1,
        ...values,
        date: new Date().toISOString().split("T")[0],
        usageStats: {
          totalViews: 0,
          activeUsers: 0,
          completionRate: 0,
          lastAccessed: new Date().toISOString().split("T")[0],
        },
      }

      if (values.type === "video") {
        setVideos([...videos, newItem])
      } else if (values.type === "document") {
        setDocs([...docs, newItem])
      }
      setIsAddModalOpen(false)
      message.success("Item added successfully!")
    }
    form.resetFields()
  }

  const openEditModal = (item, type) => {
    setEditItemType(type)
    setEditItemId(item.id)
    form.setFieldsValue(item)
    setIsEditModalOpen(true)
  }

  const showDeleteModal = (id, type, title) => {
    setDeleteItemData({ id, type, title })
    setIsDeleteModalOpen(true)
  }

  const handleDeleteConfirm = () => {
    const { id, type } = deleteItemData
    if (type === "video") {
      setVideos(videos.filter((item) => item.id !== id))
      setSelectedVideo(null)
    } else if (type === "document") {
      setDocs(docs.filter((item) => item.id !== id))
      setSelectedDoc(null)
    }
    setIsDeleteModalOpen(false)
    setDeleteItemData(null)
    message.success("Item deleted successfully!")
  }

  const openContentDetail = (item, type) => {
    setSelectedContent({ ...item, type })
    setIsContentDetailOpen(true)
  }

  const openDetailPage = (item, type) => {
    setSelectedContentForDetail({ ...item, type })
    setCurrentView("detail")
  }

  const toggleModule = (moduleId) => {
    const newExpanded = new Set(expandedModules)
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId)
    } else {
      newExpanded.add(moduleId)
    }
    setExpandedModules(newExpanded)
  }

  const handleDragStart = (item, index) => {
    setDraggedItem({ item, index })
  }

  const handleDragOver = (e, index) => {
    e.preventDefault()
    setDragOverIndex(index)
  }

  const handleDragLeave = () => {
    setDragOverIndex(null)
  }

  const handleDrop = (e, dropIndex) => {
    e.preventDefault()

    if (!draggedItem || draggedItem.index === dropIndex) {
      setDraggedItem(null)
      setDragOverIndex(null)
      return
    }

    const items = [...contentStructure]
    const draggedContent = items[draggedItem.index]

    // Remove the dragged item
    items.splice(draggedItem.index, 1)

    // Insert at new position
    items.splice(dropIndex, 0, draggedContent)

    // Update order numbers
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index + 1,
    }))

    setContentStructure(updatedItems)
    setDraggedItem(null)
    setDragOverIndex(null)
    message.success("Content reordered successfully!")
  }

  const addContentToStructure = (type, parentId = null) => {
    setIsAddContentItemModalOpen(true)
    contentItemForm.setFieldsValue({ type, parentId })
  }

  const handleAddContentItem = (values) => {
    const newContent = {
      id: Date.now().toString(),
      ...values,
    }

    setContentStructure((prev) => {
      if (values.parentId) {
        return prev.map((m) => {
          if (m.id === values.parentId) {
            const children = updateOrders([...(m.children || []), { ...newContent, parentId: values.parentId }])
            return { ...m, children }
          }
          return m
        })
      }
      // root add
      return updateOrders([...prev, { ...newContent, parentId: null }])
    })

    setIsAddContentItemModalOpen(false)
    contentItemForm.resetFields()
    message.success("Content item added successfully!")
  }

  const editContentItemHandlerDetail = (item, parentId = null) => {
    setEditContentItem(item)
    setEditIsChild(!!parentId)
    setEditParentId(parentId)
    editContentItemForm.setFieldsValue(item)
    setIsDetailEditContentItemModalOpen(true)
  }

  const editContentItemHandler = (item, parentId = null) => {
    setEditContentItem(item)
    setEditIsChild(!!parentId)
    setEditParentId(parentId)
    editContentItemForm.setFieldsValue(item)
    setIsEditContentItemModalOpen(true)
  }

  const handleEditContentItem = (values) => {
    setContentStructure((prev) => {
      if (editIsChild && editParentId) {
        return prev.map((m) => {
          if (m.id !== editParentId) return m
          const children = (m.children || []).map((c) => (c.id === editContentItem.id ? { ...c, ...values } : c))
          return { ...m, children }
        })
      }
      return prev.map((i) => (i.id === editContentItem.id ? { ...i, ...values } : i))
    })
    setIsEditContentItemModalOpen(false)
    setEditContentItem(null)
    setEditIsChild(false)
    setEditParentId(null)
    editContentItemForm.resetFields()
    message.success("Content item updated successfully!")
  }

  const handleEditContentItemDetail = (values) => {
    setContentStructure((prev) => {
      if (editIsChild && editParentId) {
        return prev.map((m) => {
          if (m.id !== editParentId) return m
          const children = (m.children || []).map((c) => (c.id === editContentItem.id ? { ...c, ...values } : c))
          return { ...m, children }
        })
      }
      return prev.map((i) => (i.id === editContentItem.id ? { ...i, ...values } : i))
    })
    setIsDetailEditContentItemModalOpen(false)
    setEditContentItem(null)
    setEditIsChild(false)
    setEditParentId(null)
    editContentItemForm.resetFields()
    message.success("Content item updated successfully!")
  }

  const removeChildFromStructure = (parentId, id) => {
    setContentStructure((prev) =>
      prev.map((m) => {
        if (m.id !== parentId) return m
        const children = updateOrders((m.children || []).filter((c) => c.id !== id))
        return { ...m, children }
      }),
    )
    message.success("Content removed from structure!")
  }

  const duplicateChildContentItem = (parentId, item) => {
    const duplicatedItem = {
      ...item,
      id: `${Date.now()}-${Math.random()}`,
      title: `${item.title} (Copy)`,
    }
    setContentStructure((prev) =>
      prev.map((m) => {
        if (m.id !== parentId) return m
        const children = updateOrders([...(m.children || []), duplicatedItem])
        return { ...m, children }
      }),
    )
    message.success("Content item duplicated successfully!")
  }

  const buildMoveMenu = (currentParentId, itemId) => ({
    items: [
      {
        key: "root",
        label: "Move to Root",
        onClick: () => moveItemInStructure(itemId, currentParentId, null),
      },
      ...contentStructure
        .filter((m) => m.type === "module")
        .map((m) => ({
          key: m.id,
          label: `Move to ${m.title}`,
          onClick: () => moveItemInStructure(itemId, currentParentId, m.id),
        })),
    ],
  })

  const [editIsChild, setEditIsChild] = useState(false)
  const [editParentId, setEditParentId] = useState(null)

  const updateOrders = (arr) => arr.map((x, i) => ({ ...x, order: i + 1 }))

  const moveItemInStructure = (itemId, fromParentId = null, toParentId = null) => {
    setContentStructure((prev) => {
      let movingItem = null
      let next = prev.map((m) => ({ ...m, children: m.children ? [...m.children] : [] }))

      if (!fromParentId) {
        // remove from root
        const idx = next.findIndex((i) => i.id === itemId)
        if (idx > -1) {
          movingItem = next[idx]
          next.splice(idx, 1)
          next = updateOrders(next)
        }
      } else {
        // remove from a module's children
        next = next.map((m) => {
          if (m.id === fromParentId) {
            const idx = (m.children || []).findIndex((c) => c.id === itemId)
            if (idx > -1) {
              movingItem = m.children[idx]
              const children = [...m.children]
              children.splice(idx, 1)
              return { ...m, children: updateOrders(children) }
            }
          }
          return m
        })
      }

      if (!movingItem) return prev

      // add to target
      if (!toParentId) {
        // to root
        const root = updateOrders([...next, { ...movingItem, parentId: null }])
        return root
      }

      return next.map((m) => {
        if (m.id === toParentId) {
          const children = updateOrders([...(m.children || []), { ...movingItem, parentId: toParentId }])
          return { ...m, children }
        }
        return m
      })
    })
    message.success("Content moved successfully!")
  }

  const reorderRootItem = (index, direction) => {
    setContentStructure((prev) => {
      const items = [...prev]
      const target = direction === "up" ? index - 1 : index + 1
      if (target < 0 || target >= items.length) return prev
      const temp = items[index]
      items[index] = items[target]
      items[target] = temp
      return updateOrders(items)
    })
  }

  const reorderChildItem = (parentId, index, direction) => {
    setContentStructure((prev) =>
      prev.map((m) => {
        if (m.id !== parentId) return m
        const children = [...(m.children || [])]
        const target = direction === "up" ? index - 1 : index + 1
        if (target < 0 || target >= children.length) return m
        const temp = children[index]
        children[index] = children[target]
        children[target] = temp
        return { ...m, children: updateOrders(children) }
      }),
    )
  }

  // Fix for undeclared variables: duplicateContentItem, removeContentFromStructure, detailAddContentMenu, playVideo, handleAddContentItemDetail, addContentMenu
  const duplicateContentItem = (item) => {
    const duplicatedItem = {
      ...item,
      id: `${Date.now()}-${Math.random()}`,
      title: `${item.title} (Copy)`,
    }
    setContentStructure((prev) =>
      prev.map((m) => {
        if (m.id === item.parentId) {
          const children = updateOrders([...(m.children || []), duplicatedItem])
          return { ...m, children }
        }
        return m
      }),
    )
    message.success("Content item duplicated successfully!")
  }

  const removeContentFromStructure = (id) => {
    setContentStructure((prev) => prev.filter((item) => item.id !== id))
    message.success("Content removed from structure!")
  }

  const detailAddContentMenu = {
    items: [
      {
        key: "add-module",
        label: "Module/Folder",
        icon: <FolderOutlined />,
        onClick: () => setIsDetailAddContentItemModalOpen(true),
      },
      {
        key: "add-video",
        label: "Video",
        icon: <VideoCameraOutlined />,
        onClick: () => setIsDetailAddContentItemModalOpen(true),
      },
      {
        key: "add-document",
        label: "Document",
        icon: <FileTextOutlined />,
        onClick: () => setIsDetailAddContentItemModalOpen(true),
      },
      {
        key: "add-text",
        label: "Text Lesson",
        icon: <BookOutlined />,
        onClick: () => setIsDetailAddContentItemModalOpen(true),
      },
      {
        key: "add-quiz",
        label: "Quiz",
        icon: <QuestionCircleOutlined />,
        onClick: () => setIsDetailAddContentItemModalOpen(true),
      },
      {
        key: "add-assignment",
        label: "Assignment",
        icon: <FileOutlined />,
        onClick: () => setIsDetailAddContentItemModalOpen(true),
      },
      {
        key: "add-link",
        label: "External Link",
        icon: <LinkOutlined />,
        onClick: () => setIsDetailAddContentItemModalOpen(true),
      },
    ],
  }

  const playVideo = (videoId) => {
    setPlayingVideoId(videoId)
  }

  const handleAddContentItemDetail = (values) => {
    const newContent = {
      id: Date.now().toString(),
      ...values,
      parentId: selectedContentForDetail?.id, // Assuming we are adding to the currently viewed module
    }

    setContentStructure((prev) => {
      return prev.map((m) => {
        if (m.id === newContent.parentId) {
          const children = updateOrders([...(m.children || []), newContent])
          return { ...m, children }
        }
        return m
      })
    })

    setIsDetailAddContentItemModalOpen(false)
    contentItemForm.resetFields()
    message.success("Content item added successfully!")
  }

  const addContentMenu = {
    items: [
      {
        key: "add-module",
        label: "Module/Folder",
        icon: <FolderOutlined />,
        onClick: () => addContentToStructure("module"),
      },
      {
        key: "add-video",
        label: "Video",
        icon: <VideoCameraOutlined />,
        onClick: () => addContentToStructure("video"),
      },
      {
        key: "add-document",
        label: "Document",
        icon: <FileTextOutlined />,
        onClick: () => addContentToStructure("document"),
      },
      {
        key: "add-text",
        label: "Text Lesson",
        icon: <BookOutlined />,
        onClick: () => addContentToStructure("text"),
      },
      {
        key: "add-quiz",
        label: "Quiz",
        icon: <QuestionCircleOutlined />,
        onClick: () => addContentToStructure("quiz"),
      },
      {
        key: "add-assignment",
        label: "Assignment",
        icon: <FileOutlined />,
        onClick: () => addContentToStructure("assignment"),
      },
      {
        key: "add-link",
        label: "External Link",
        icon: <LinkOutlined />,
        onClick: () => addContentToStructure("link"),
      },
    ],
  }

  const renderContentStructureItem = (item, index) => (
    <div key={item.id} className="mb-2">
      <div
        draggable
        onDragStart={() => handleDragStart(item, index)}
        onDragOver={(e) => handleDragOver(e, index)}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, index)}
        className={`
          p-3 bg-white border rounded-lg flex flex-col sm:flex-row sm:items-center justify-between cursor-move transition-all
          ${draggedItem?.index === index ? "opacity-50" : ""}
          ${dragOverIndex === index ? "border-blue-500 border-2 bg-blue-50" : "shadow-sm hover:shadow-md"}
        `}
      >
        <div className="flex items-center gap-3 mb-2 sm:mb-0">
          <DragOutlined className="text-gray-400" />
          {item.type === "module" && (
            <Button
              type="text"
              size="small"
              icon={expandedModules.has(item.id) ? <DownOutlined /> : <RightOutlined />}
              onClick={() => toggleModule(item.id)}
            />
          )}
          {contentTypes.find((type) => type.key === item.type)?.icon}
          <div className="flex flex-col">
            <Text strong>{item.title}</Text>
            {item.description && (
              <Text type="secondary" className="text-xs">
                {item.description}
              </Text>
            )}
          </div>
          <Tag color={item.type === "module" ? "blue" : item.type === "video" ? "red" : "green"}>{item.type}</Tag>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Text type="secondary" className="hidden sm:block">
            Order: {item.order}
          </Text>

          <Button
            size="small"
            icon={<UpOutlined />}
            onClick={() => reorderRootItem(index, "up")}
            disabled={index === 0}
          />
          <Button
            size="small"
            icon={<DownOutlined />}
            onClick={() => reorderRootItem(index, "down")}
            disabled={index === contentStructure.length - 1}
          />

          <Dropdown menu={buildMoveMenu(null, item.id)} trigger={["click"]} placement="bottomRight">
            <Button size="small" icon={<MenuOutlined />}>
              Move To
            </Button>
          </Dropdown>

          {item.type === "module" && (
            <Dropdown
              menu={{
                items: contentTypes.map((type) => ({
                  key: type.key,
                  label: type.label,
                  icon: type.icon,
                  onClick: () => addContentToStructure(type.key, item.id),
                })),
              }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <Button size="small" type="dashed" icon={<PlusOutlined />}>
                Add Inside
              </Button>
            </Dropdown>
          )}

          <Button size="small" icon={<EditOutlined />} onClick={() => editContentItemHandlerDetail(item)} />
          <Button size="small" icon={<CopyOutlined />} onClick={() => duplicateContentItem(item)} />
          <Button size="small" danger icon={<DeleteOutlined />} onClick={() => removeContentFromStructure(item.id)} />
        </div>
      </div>

      {/* Render children if it's a module and expanded */}
      {item.type === "module" && expandedModules.has(item.id) && item.children && (
        <div className="ml-4 sm:ml-8 mt-2 space-y-2">
          {item.children.map((child, childIndex) => (
            <div
              key={child.id}
              className="p-2 bg-gray-50 border rounded-lg flex flex-col sm:flex-row sm:items-center justify-between"
            >
              <div className="flex items-center gap-3 mb-2 sm:mb-0">
                <DragOutlined className="text-gray-400" />
                {contentTypes.find((type) => type.key === child.type)?.icon}
                <div className="flex flex-col">
                  <Text>{child.title}</Text>
                  {child.description && (
                    <Text type="secondary" className="text-xs">
                      {child.description}
                    </Text>
                  )}
                </div>
                <Tag size="small">{child.type}</Tag>
              </div>
              <div className="flex items-center gap-1 flex-wrap">
                <Text type="secondary" className="hidden sm:block mr-2">
                  Order: {child.order}
                </Text>

                <Button
                  size="small"
                  icon={<UpOutlined />}
                  onClick={() => reorderChildItem(item.id, childIndex, "up")}
                  disabled={childIndex === 0}
                />
                <Button
                  size="small"
                  icon={<DownOutlined />}
                  onClick={() => reorderChildItem(item.id, childIndex, "down")}
                  disabled={childIndex === item.children.length - 1}
                />

                <Dropdown menu={buildMoveMenu(item.id, child.id)} trigger={["click"]} placement="bottomRight">
                  <Button size="small" icon={<MenuOutlined />}>
                    Move To
                  </Button>
                </Dropdown>

                <Button
                  size="small"
                  icon={<EditOutlined />}
                  onClick={() => editContentItemHandlerDetail(child, item.id)}
                />
                <Button
                  size="small"
                  icon={<CopyOutlined />}
                  onClick={() => duplicateChildContentItem(item.id, child)}
                />
                <Button
                  size="small"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => removeChildFromStructure(item.id, child.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  if (currentView === "detail" && selectedContentForDetail) {
    return (
      <>
        <div className="min-h-screen p-3">
          <div className="mb-6">
            <Button icon={<ArrowLeftOutlined />} onClick={() => setCurrentView("main")} className="mb-4">
              Back to Videos & Docs
            </Button>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <Title level={2} className="!mb-0">
                {selectedContentForDetail.title}
              </Title>
              {/* <div className="flex items-center gap-2">
              <Text>Preview Mode</Text>
              <Switch checked={previewMode} onChange={setPreviewMode} size="small" />
            </div> */}
            </div>
          </div>

          <Row gutter={[24, 24]}>
            <Col xs={24} lg={16}>
              <Tabs defaultActiveKey="structure">
                <TabPane tab="Content Structure" key="structure">
                  <Card
                    title="Learning Units"
                    extra={
                      <Space wrap>
                        <Dropdown menu={detailAddContentMenu} trigger={["click"]}>
                          <Button type="primary" icon={<PlusOutlined />}>
                            Add Content
                          </Button>
                        </Dropdown>
                        <Button icon={<SaveOutlined />} className="hidden sm:inline-flex">
                          Save Draft
                        </Button>
                        <Button type="primary" icon={<SendOutlined />} className="hidden sm:inline-flex">
                          Publish Update
                        </Button>
                      </Space>
                    }
                  >
                    <div className="space-y-2">
                      {contentStructure.map((item, index) => renderContentStructureItem(item, index))}
                      {contentStructure.length === 0 && (
                        <div className="text-center py-8 text-gray-400">
                          No content items yet. Add some content to get started.
                        </div>
                      )}
                    </div>
                  </Card>
                </TabPane>
                <TabPane tab="Settings" key="settings">
                  <Card title="Content Settings">
                    <Form layout="vertical">
                      <Form.Item label="Title" initialValue={selectedContentForDetail.title}>
                        <Input />
                      </Form.Item>
                      <Form.Item label="Description" initialValue={selectedContentForDetail.description}>
                        <TextArea rows={3} />
                      </Form.Item>
                      <Form.Item label="Tags" initialValue={selectedContentForDetail.tags}>
                        <Input />
                      </Form.Item>
                      <Form.Item label="Category" initialValue={selectedContentForDetail.category}>
                        <Select>
                          {categories.map((category) => (
                            <Option key={category} value={category}>
                              {category}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Form>
                  </Card>
                </TabPane>
              </Tabs>
            </Col>

            <Col xs={24} lg={8}>
              <div className="space-y-4">
                {/* Preview/Thumbnail */}
                <Card title="Preview">
                  {selectedContentForDetail.type === "video" && (
                    <div className="text-center">
                      {playingVideoId === selectedContentForDetail.id ? (
                        <video
                          src={selectedContentForDetail.videoUrl}
                          controls
                          className="w-full h-auto rounded-lg mb-3"
                          autoPlay
                        >
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <>
                          <img
                            src={selectedContentForDetail.thumbnail || "https://via.placeholder.com/400x300"}
                            alt="Thumbnail"
                            className="w-full h-auto rounded-lg mb-3"
                          />
                          <Button
                            type="primary"
                            icon={<PlayCircleOutlined />}
                            size="large"
                            onClick={() => playVideo(selectedContentForDetail.id)}
                          >
                            Play Video
                          </Button>
                        </>
                      )}
                    </div>
                  )}
                  {selectedContentForDetail.type === "document" && (
                    <div className="text-center p-8 bg-gray-50 rounded-lg">
                      <FileTextOutlined className="text-6xl text-gray-400 mb-3" />
                      <div className="space-y-2">
                        <Button type="primary" icon={<EyeOutlined />}>
                          View Document
                        </Button>
                        <br />
                        <Button icon={<DownloadOutlined />}>Download</Button>
                      </div>
                    </div>
                  )}
                </Card>

                {/* Usage Statistics */}
                <Card title="Usage Statistics">
                  <div className="space-y-4">
                    <Statistic
                      title="Total Views"
                      value={selectedContentForDetail.usageStats?.totalViews || 0}
                      prefix={<EyeOutlined />}
                    />
                    <Statistic
                      title="Active Users"
                      value={selectedContentForDetail.usageStats?.activeUsers || 0}
                      prefix={<UserOutlined />}
                    />
                    <div>
                      <Text strong>Completion Rate</Text>
                      <Progress
                        percent={selectedContentForDetail.usageStats?.completionRate || 0}
                        size="small"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Text type="secondary">Last Accessed: </Text>
                      <Text>{selectedContentForDetail.usageStats?.lastAccessed || "Never"}</Text>
                    </div>
                  </div>
                </Card>

                {/* Active Users */}
                <Card title="Recent Users" size="small">
                  <List
                    size="small"
                    dataSource={[
                      { name: "John Doe", progress: 75, lastSeen: "2h ago" },
                      { name: "Jane Smith", progress: 100, lastSeen: "1d ago" },
                      { name: "Mike Johnson", progress: 45, lastSeen: "3h ago" },
                    ]}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar icon={<UserOutlined />} size="small" />}
                          title={<Text className="text-sm">{item.name}</Text>}
                          description={
                            <div>
                              <Progress percent={item.progress} size="small" />
                              <Text type="secondary" className="text-xs">
                                {item.lastSeen}
                              </Text>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              </div>
            </Col>
          </Row>
        </div>
        {/* Detail Page Add Content Item Modal */}
        <Modal
          title="Add Content Item"
          open={isDetailAddContentItemModalOpen}
          onCancel={() => {
            setIsDetailAddContentItemModalOpen(false)
            contentItemForm.resetFields()
          }}
          footer={null}
          width="90%"
          style={{ maxWidth: 500 }}
        >
          <Form form={contentItemForm} layout="vertical" onFinish={handleAddContentItemDetail} className="mt-4">
            <Form.Item name="parentId" style={{ display: "none" }}>
              <Input />
            </Form.Item>

            <Form.Item
              name="type"
              label="Content Type"
              rules={[{ required: true, message: "Please select content type!" }]}
            >
              <Select placeholder="Select content type">
                {contentTypes.map((type) => (
                  <Option key={type.key} value={type.key}>
                    <Space>
                      {type.icon}
                      {type.label}
                    </Space>
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="title" label="Title" rules={[{ required: true, message: "Please enter title!" }]}>
              <Input placeholder="Enter title" />
            </Form.Item>

            <Form.Item name="description" label="Description">
              <TextArea rows={2} placeholder="Enter description (optional)" />
            </Form.Item>

            <Form.Item shouldUpdate={(prevValues, curValues) => prevValues.type !== curValues.type}>
              {({ getFieldValue }) => {
                const selectedType = getFieldValue("type")

                if (selectedType === "document" || selectedType === "video") {
                  return (
                    <Form.Item name="file" label="Upload File">
                      <Upload.Dragger name="file" multiple={false} beforeUpload={() => false} className="!bg-gray-50">
                        <p className="ant-upload-drag-icon">
                          <UploadOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to upload</p>
                        <p className="ant-upload-hint">Support for a single file</p>
                      </Upload.Dragger>
                    </Form.Item>
                  )
                }

                if (selectedType === "link") {
                  return (
                    <Form.Item name="url" label="URL" rules={[{ required: true, message: "Please enter URL!" }]}>
                      <Input placeholder="https://example.com" />
                    </Form.Item>
                  )
                }

                if (selectedType === "text") {
                  return (
                    <Form.Item name="content" label="Text Content">
                      <TextArea rows={4} placeholder="Enter text content" />
                    </Form.Item>
                  )
                }

                if (selectedType === "quiz") {
                  return (
                    <Form.Item name="questions" label="Number of Questions">
                      <Input type="number" placeholder="5" />
                    </Form.Item>
                  )
                }

                return null
              }}
            </Form.Item>

            <Form.Item className="mb-0 flex justify-end">
              <Space>
                <Button
                  onClick={() => {
                    setIsDetailAddContentItemModalOpen(false)
                    contentItemForm.resetFields()
                  }}
                >
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Add Item
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>

        {/* Detail Page Edit Content Item Modal */}
        <Modal
          title="Edit Content Item"
          open={isDetailEditContentItemModalOpen}
          onCancel={() => {
            setIsDetailEditContentItemModalOpen(false)
            setEditContentItem(null)
            editContentItemForm.resetFields()
          }}
          footer={null}
          width="90%"
          style={{ maxWidth: 500 }}
        >
          <Form form={editContentItemForm} layout="vertical" onFinish={handleEditContentItemDetail} className="mt-4">
            <Form.Item name="title" label="Title" rules={[{ required: true, message: "Please enter title!" }]}>
              <Input placeholder="Enter title" />
            </Form.Item>

            <Form.Item name="description" label="Description">
              <TextArea rows={2} placeholder="Enter description (optional)" />
            </Form.Item>

            <Form.Item className="mb-0 flex justify-end">
              <Space>
                <Button
                  onClick={() => {
                    setIsDetailEditContentItemModalOpen(false)
                    setEditContentItem(null)
                    editContentItemForm.resetFields()
                  }}
                >
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Save Changes
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </>
    )
  }

  return (
    <div className="min-h-screen p-3">
      <div className="">
        <div className="">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6 gap-4">
            <Title level={2} className="!mb-0">
              Videos & Docs
            </Title>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Search
                placeholder="Search videos and docs..."
                allowClear
                style={{ width: "100%", maxWidth: 300 }}
                prefix={<SearchOutlined />}
                onChange={(e) => handleSearch(e.target.value)}
                onSearch={handleSearch}
              />
              {/* <div className="flex items-center gap-2">
                <Text>Preview Mode</Text>
                <Switch checked={previewMode} onChange={setPreviewMode} size="small" />
              </div> */}
            </div>
          </div>

          <Card
            className="mb-6"
            title="Content Structure"
            extra={
              <Space wrap>
                <Dropdown menu={addContentMenu} trigger={["click"]}>
                  <Button type="primary" icon={<PlusOutlined />}>
                    Add Content
                  </Button>
                </Dropdown>
                <Button icon={<SaveOutlined />} className="hidden sm:inline-flex">
                  Save Draft
                </Button>
                <Button type="primary" icon={<SendOutlined />} className="hidden sm:inline-flex">
                  Publish Update
                </Button>
              </Space>
            }
          >
            <div className="space-y-2">
              {contentStructure.map((item, index) => renderContentStructureItem(item, index))}
              {contentStructure.length === 0 && (
                <div className="text-center py-8 text-gray-400">
                  No content items yet. Add some content to get started.
                </div>
              )}
            </div>
          </Card>

          <div className="mt-5">
            <Card
              className="mb-6"
              title="Videos"
              extra={
                <Button type="primary" icon={<UploadOutlined />} onClick={handleAddVideo}>
                  Upload Video
                </Button>
              }
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredVideos.map((video) => (
                  <Card
                    key={video.id}
                    hoverable
                    className="overflow-hidden"
                    cover={
                      <div className="h-48 bg-gray-200 flex items-center justify-center relative">
                        <img src={video.thumbnail || "/placeholder.svg"} className="w-full h-full object-cover" />
                        <Button
                          type="primary"
                          shape="circle"
                          size="large"
                          icon={<PlayCircleOutlined />}
                          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                          onClick={(e) => {
                            e.stopPropagation()
                            playVideo(video.id)
                            openDetailPage(video, "video")
                          }}
                        />
                      </div>
                    }
                    actions={[
                      <Button
                        key="view-details"
                        type="text"
                        icon={<EyeOutlined />}
                        onClick={() => openContentDetail(video, "video")}
                        className="text-xs sm:text-sm"
                      >
                        <span className="hidden sm:inline">Quick View</span>
                      </Button>,
                      <Button
                        key="detail-page"
                        type="text"
                        icon={<SettingOutlined />}
                        onClick={() => openDetailPage(video, "video")}
                        className="text-xs sm:text-sm"
                      >
                        <span className="hidden sm:inline">Detail Page</span>
                      </Button>,
                      <Button
                        key="edit-video"
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => openEditModal(video, "video")}
                        className="text-xs sm:text-sm"
                      />,
                    ]}
                  >
                    <Card.Meta
                      avatar={<VideoCameraOutlined className="text-blue-500" />}
                      title={<span className="text-sm sm:text-base">{video.title}</span>}
                      description={
                        <div>
                          <Text type="secondary" className="block mb-2 text-xs sm:text-sm">
                            {video.description}
                          </Text>
                          <div className="flex justify-between items-center">
                            <Text type="secondary" className="text-xs">
                              {video.date}
                            </Text>
                            <Badge count={video.usageStats.activeUsers} showZero color="blue">
                              <UserOutlined className="text-gray-400" />
                            </Badge>
                          </div>
                        </div>
                      }
                    />
                  </Card>
                ))}
              </div>
            </Card>
          </div>

          <div className="mt-5">
            <Card
              title="Documents"
              extra={
                <Button type="primary" icon={<UploadOutlined />} onClick={handleAddDoc}>
                  Upload Docs
                </Button>
              }
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredDocs.map((doc) => (
                  <Card
                    key={doc.id}
                    hoverable
                    actions={[
                      <Button
                        key="view-details"
                        type="text"
                        icon={<EyeOutlined />}
                        onClick={() => openContentDetail(doc, "document")}
                        className="text-xs sm:text-sm"
                      >
                        <span className="hidden sm:inline">Quick View</span>
                      </Button>,
                      <Button
                        key="detail-page"
                        type="text"
                        icon={<SettingOutlined />}
                        onClick={() => openDetailPage(doc, "document")}
                        className="text-xs sm:text-sm"
                      >
                        <span className="hidden sm:inline">Detail Page</span>
                      </Button>,
                      <Button
                        key="edit-doc"
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => openEditModal(doc, "document")}
                        className="text-xs sm:text-sm"
                      />,
                    ]}
                  >
                    <Card.Meta
                      avatar={<FileTextOutlined className="text-green-500" />}
                      title={<span className="text-sm sm:text-base">{doc.title}</span>}
                      description={
                        <div>
                          <Text type="secondary" className="block mb-2 text-xs sm:text-sm">
                            {doc.description}
                          </Text>
                          <div className="flex justify-between items-center">
                            <Text type="secondary" className="text-xs">
                              {doc.date}
                            </Text>
                            <Badge count={doc.usageStats.activeUsers} showZero color="green">
                              <UserOutlined className="text-gray-400" />
                            </Badge>
                          </div>
                        </div>
                      }
                    />
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            {selectedContent?.type === "video" ? <VideoCameraOutlined /> : <FileTextOutlined />}
            Content Quick View
          </div>
        }
        open={isContentDetailOpen}
        onCancel={() => setIsContentDetailOpen(false)}
        width="90%"
        style={{ maxWidth: 800 }}
        footer={[
          <Button
            key="detail"
            icon={<SettingOutlined />}
            onClick={() => {
              setIsContentDetailOpen(false)
              openDetailPage(selectedContent, selectedContent?.type)
            }}
          >
            <span className="hidden sm:inline">Open Detail Page</span>
            <span className="sm:hidden">Detail</span>
          </Button>,
          <Button
            key="edit"
            icon={<EditOutlined />}
            onClick={() => {
              setIsContentDetailOpen(false)
              openEditModal(selectedContent, selectedContent?.type)
            }}
          >
            Edit
          </Button>,
          <Button
            key="delete"
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              setIsContentDetailOpen(false)
              showDeleteModal(selectedContent?.id, selectedContent?.type, selectedContent?.title)
            }}
          >
            Delete
          </Button>,
          <Button
            key="view"
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => {
              if (selectedContent?.type === "video") {
                playVideo(selectedContent.id)
              }
            }}
          >
            {selectedContent?.type === "video" ? "Watch Video" : "View Document"}
          </Button>,
        ]}
      >
        {selectedContent && (
          <div className="space-y-4">
            <div>
              <Title level={4}>{selectedContent.title}</Title>
              <Text type="secondary">{selectedContent.description}</Text>
            </div>

            <Divider />

            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Text strong>Date:</Text>
                    <br />
                    <Text>{new Date(selectedContent.date).toLocaleDateString()}</Text>
                  </div>
                  <div>
                    <Text strong>Category:</Text>
                    <br />
                    <Text>{selectedContent.category}</Text>
                  </div>
                  <div>
                    <Text strong>Tags:</Text>
                    <br />
                    <Text>{selectedContent.tags}</Text>
                  </div>
                  <div>
                    <Text strong>Type:</Text>
                    <br />
                    <Text className="capitalize">{selectedContent.type}</Text>
                  </div>
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div className="space-y-3">
                  <Statistic
                    title="Total Views"
                    value={selectedContent.usageStats?.totalViews || 0}
                    prefix={<EyeOutlined />}
                  />
                  <Statistic
                    title="Active Users"
                    value={selectedContent.usageStats?.activeUsers || 0}
                    prefix={<UserOutlined />}
                  />
                  <div>
                    <Text strong>Completion Rate</Text>
                    <Progress percent={selectedContent.usageStats?.completionRate || 0} size="small" className="mt-1" />
                  </div>
                </div>
              </Col>
            </Row>

            {selectedContent.type === "video" && (
              <div>
                <Text strong>Video Preview:</Text>
                <div className="mt-2">
                  {playingVideoId === selectedContent.id ? (
                    <video
                      src={selectedContent.videoUrl}
                      controls
                      className="w-full max-w-md h-auto rounded-lg"
                      autoPlay
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div className="relative">
                      <img
                        src={selectedContent.thumbnail || "https://via.placeholder.com/400x300"}
                        alt="Thumbnail"
                        className="w-full max-w-md h-auto rounded-lg"
                      />
                      <Button
                        type="primary"
                        shape="circle"
                        size="large"
                        icon={<PlayCircleOutlined />}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        onClick={() => playVideo(selectedContent.id)}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Add/Upload Modal */}
      <Modal
        title={isEditModalOpen ? "Edit Content" : "Upload New Content"}
        open={isAddModalOpen || isEditModalOpen}
        onCancel={() => {
          setIsAddModalOpen(false)
          setIsEditModalOpen(false)
          form.resetFields()
        }}
        footer={null}
        width="90%"
        style={{ maxWidth: 600 }}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit} className="mt-4">
          {!isEditModalOpen && (
            <Form.Item
              name="type"
              label="Content Type"
              rules={[{ required: true, message: "Please select content type!" }]}
            >
              <Select placeholder="Select content type">
                <Option value="video">Video</Option>
                <Option value="document">Document</Option>
              </Select>
            </Form.Item>
          )}

          <Form.Item name="title" label="Title" rules={[{ required: true, message: "Please enter title!" }]}>
            <Input placeholder="Enter title" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter description!" }]}
          >
            <TextArea rows={3} placeholder="Enter description" />
          </Form.Item>

          <Form.Item name="tags" label="Tags">
            <Input placeholder="Enter tags (comma separated)" />
          </Form.Item>

          <Form.Item name="category" label="Category" rules={[{ required: true, message: "Please select category!" }]}>
            <Select placeholder="Select category">
              {categories.map((category) => (
                <Option key={category} value={category}>
                  {category}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="file"
            label="Upload File"
            rules={!isEditModalOpen ? [{ required: true, message: "Please upload a file!" }] : []}
          >
            <Upload.Dragger name="file" multiple={false} beforeUpload={() => false} className="!bg-gray-50">
              <p className="ant-upload-drag-icon">
                <UploadOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                Support for single file upload. {isEditModalOpen && "(Optional - leave empty to keep current file)"}
              </p>
            </Upload.Dragger>
          </Form.Item>

          <Form.Item className="mb-0 flex justify-end">
            <Space>
              <Button
                onClick={() => {
                  setIsAddModalOpen(false)
                  setIsEditModalOpen(false)
                  form.resetFields()
                }}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                {isEditModalOpen ? "Save Changes" : "Upload"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Delete"
        open={isDeleteModalOpen}
        onOk={handleDeleteConfirm}
        onCancel={() => {
          setIsDeleteModalOpen(false)
          setDeleteItemData(null)
        }}
        okText="Delete"
        okType="danger"
        cancelText="Cancel"
        width="90%"
        style={{ maxWidth: 400 }}
      >
        <p>
          Are you sure you want to delete <strong>"{deleteItemData?.title}"</strong>?
        </p>
        <p className="text-gray-500">This action cannot be undone.</p>
      </Modal>

      {/* Add Content Item Modal */}
      <Modal
        title="Add Content Item"
        open={isAddContentItemModalOpen}
        onCancel={() => {
          setIsAddContentItemModalOpen(false)
          contentItemForm.resetFields()
        }}
        footer={null}
        width="90%"
        style={{ maxWidth: 500 }}
      >
        <Form form={contentItemForm} layout="vertical" onFinish={handleAddContentItem} className="mt-4">
          <Form.Item name="parentId" style={{ display: "none" }}>
            <Input />
          </Form.Item>

          <Form.Item
            name="type"
            label="Content Type"
            rules={[{ required: true, message: "Please select content type!" }]}
          >
            <Select placeholder="Select content type">
              {contentTypes.map((type) => (
                <Option key={type.key} value={type.key}>
                  <Space>
                    {type.icon}
                    {type.label}
                  </Space>
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="title" label="Title" rules={[{ required: true, message: "Please enter title!" }]}>
            <Input placeholder="Enter title" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <TextArea rows={2} placeholder="Enter description (optional)" />
          </Form.Item>

          <Form.Item shouldUpdate={(prevValues, curValues) => prevValues.type !== curValues.type}>
            {({ getFieldValue }) => {
              const selectedType = getFieldValue("type")

              if (selectedType === "document" || selectedType === "video") {
                return (
                  <Form.Item name="file" label="Upload File">
                    <Upload.Dragger name="file" multiple={false} beforeUpload={() => false} className="!bg-gray-50">
                      <p className="ant-upload-drag-icon">
                        <UploadOutlined />
                      </p>
                      <p className="ant-upload-text">Click or drag file to upload</p>
                      <p className="ant-upload-hint">Support for a single file</p>
                    </Upload.Dragger>
                  </Form.Item>
                )
              }

              if (selectedType === "link") {
                return (
                  <Form.Item name="url" label="URL" rules={[{ required: true, message: "Please enter URL!" }]}>
                    <Input placeholder="https://example.com" />
                  </Form.Item>
                )
              }

              if (selectedType === "text") {
                return (
                  <Form.Item name="content" label="Text Content">
                    <TextArea rows={4} placeholder="Enter text content" />
                  </Form.Item>
                )
              }

              if (selectedType === "quiz") {
                return (
                  <Form.Item name="questions" label="Number of Questions">
                    <Input type="number" placeholder="5" />
                  </Form.Item>
                )
              }

              return null
            }}
          </Form.Item>

          <Form.Item className="mb-0 flex justify-end">
            <Space>
              <Button
                onClick={() => {
                  setIsAddContentItemModalOpen(false)
                  contentItemForm.resetFields()
                }}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Add Item
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Content Item Modal */}
      <Modal
        title="Edit Content Item"
        open={isEditContentItemModalOpen}
        onCancel={() => {
          setIsEditContentItemModalOpen(false)
          setEditContentItem(null)
          editContentItemForm.resetFields()
        }}
        footer={null}
        width="90%"
        style={{ maxWidth: 500 }}
      >
        <Form form={editContentItemForm} layout="vertical" onFinish={handleEditContentItem} className="mt-4">
          <Form.Item name="title" label="Title" rules={[{ required: true, message: "Please enter title!" }]}>
            <Input placeholder="Enter title" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <TextArea rows={2} placeholder="Enter description (optional)" />
          </Form.Item>

          <Form.Item className="mb-0 flex justify-end">
            <Space>
              <Button
                onClick={() => {
                  setIsEditContentItemModalOpen(false)
                  setEditContentItem(null)
                  editContentItemForm.resetFields()
                }}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
