"use client"

// refercen code for design and oevrview

/* eslint-disable no-unused-vars */
import { useState } from "react"
import {
  Edit,
  MoreVertical,
  Trash2,
  Plus,
  Filter,
  Download,
  Upload,
  Eye,
  Copy,
  Archive,
  Users,
  BookOpen,
  Settings,
  ChevronRight,
  ChevronLeft,
  Save,
  Play,
  Pause,
  FileText,
  MoreHorizontal,
} from "lucide-react"
import {
  Table,
  Button,
  Tag,
  Dropdown,
  Input,
  Select,
  Card,
  Modal,
  message,
  DatePicker,
  Steps,
  Form,
  Upload as AntUpload,
  Tabs,
  List,
  Collapse,
  InputNumber,
  Radio,
  Space,
  Alert,
} from "antd"
import { CheckOutlined, InboxOutlined, DeleteOutlined } from "@ant-design/icons"

const { Search: AntSearch } = Input
const { Option } = Select
const { RangePicker } = DatePicker
const { Step } = Steps
const { TabPane } = Tabs
const { Panel } = Collapse
const { TextArea } = Input
const { Search } = Input

export default function CoursesManagement() {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [showSidebar, setShowSidebar] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isEnrollmentModalOpen, setIsEnrollmentModalOpen] = useState(false)
  const [isContentEditorOpen, setIsContentEditorOpen] = useState(false)
  const [courseToEdit, setCourseToEdit] = useState(null)
  const [courseToEnroll, setCourseToEnroll] = useState(null)
  const [profileImage, setProfileImage] = useState(null)
  const [openDropdownId, setOpenDropdownId] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [isManageModalOpen, setIsManageModalOpen] = useState(false)
  const [isImportModalOpen, setIsImportModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [courseToDelete, setCourseToDelete] = useState(null)

  // Table and filtering states
  const [viewMode, setViewMode] = useState("table")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCourses, setSelectedCourses] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    category: "all",
    status: "all",
    instructor: "all",
    enrollmentType: "all",
    dateRange: null,
  })
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(12)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [tableLoading, setTableLoading] = useState(false)
  const [searchText, setSearchText] = useState("")

  // Form states
  const [form] = Form.useForm()
  const [courseModules, setCourseModules] = useState([])
  const [selectedModule, setSelectedModule] = useState(null)

  const [confirmModal, setConfirmModal] = useState({
    visible: false,
    action: "",
    title: "",
    content: "",
    onConfirm: null,
  })

  const [isSuperImportModalOpen, setIsSuperImportModalOpen] = useState(false)

  const categoryOptions = [
    "Programming",
    "Data Science",
    "Web Development",
    "Mobile Development",
    "AI/ML",
    "Cybersecurity",
    "UI/UX Design",
  ]
  const statusOptions = ["Draft", "Published", "Archived", "Under Review"]
  const instructorOptions = [
    "Dr. Smith",
    "Dr. Johnson",
    "Prof. Williams",
    "Dr. Brown",
    "Dr. Miller",
    "Prof. Davis",
    "Dr. Wilson",
    "Prof. Taylor",
  ]
  const enrollmentTypeOptions = ["Free", "Paid", "Invite Only", "Premium"]

  // Mock courses data
  const [courses, setCourses] = useState([
    {
      id: "1",
      name: "Advanced React Development",
      code: "REACT301",
      category: "Web Development",
      instructor: "Dr. Smith",
      lastUpdated: "2024-01-15",
      status: "Published",
      enrollmentCount: 245,
      enrollmentType: "Paid",
      price: 299,
      duration: "8 weeks",
      level: "Advanced",
      description: "Master advanced React concepts including hooks, context, performance optimization, and testing.",
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfCscjolutCHBMeWTsabdBsWZ1oPd2NMLGUw&s",
      modules: [
        { id: 1, title: "Advanced Hooks", lessons: 8, duration: "2 hours" },
        { id: 2, title: "State Management", lessons: 6, duration: "1.5 hours" },
        { id: 3, title: "Performance Optimization", lessons: 5, duration: "1 hour" },
      ],
    },
    {
      id: "2",
      name: "Python Data Science Fundamentals",
      code: "PY101",
      category: "Data Science",
      instructor: "Prof. Williams",
      lastUpdated: "2024-01-12",
      status: "Published",
      enrollmentCount: 189,
      enrollmentType: "Free",
      price: 0,
      duration: "6 weeks",
      level: "Beginner",
      description: "Learn Python programming fundamentals with focus on data science applications.",
      thumbnail:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png",
      modules: [
        { id: 1, title: "Python Basics", lessons: 10, duration: "3 hours" },
        { id: 2, title: "Data Manipulation", lessons: 8, duration: "2.5 hours" },
      ],
    },
    {
      id: "3",
      name: "Machine Learning Masterclass",
      code: "ML401",
      category: "AI/ML",
      instructor: "Dr. Miller",
      lastUpdated: "2024-01-10",
      status: "Draft",
      enrollmentCount: 0,
      enrollmentType: "Premium",
      price: 599,
      duration: "12 weeks",
      level: "Advanced",
      description:
        "Comprehensive machine learning course covering algorithms, implementation, and real-world applications.",
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-JdkYAHxO_Urunj0GGdxAdFpKk5W3m-mxBg&s",
      modules: [],
    },
    {
      id: "4",
      name: "UI/UX Design Principles",
      code: "UX201",
      category: "UI/UX Design",
      instructor: "Prof. Davis",
      lastUpdated: "2024-01-08",
      status: "Published",
      enrollmentCount: 156,
      enrollmentType: "Paid",
      price: 199,
      duration: "4 weeks",
      level: "Intermediate",
      description: "Learn fundamental UI/UX design principles and create user-centered designs.",
      thumbnail: "https://img.freepik.com/free-vector/gradient-ui-ux-background_23-2149052117.jpg",
      modules: [
        { id: 1, title: "Design Fundamentals", lessons: 6, duration: "2 hours" },
        { id: 2, title: "User Research", lessons: 4, duration: "1.5 hours" },
      ],
    },
    {
      id: "5",
      name: "Cybersecurity Essentials",
      code: "SEC101",
      category: "Cybersecurity",
      instructor: "Prof. Taylor",
      lastUpdated: "2024-01-05",
      status: "Archived",
      enrollmentCount: 89,
      enrollmentType: "Invite Only",
      price: 0,
      duration: "6 weeks",
      level: "Beginner",
      description: "Essential cybersecurity concepts and practices for beginners.",
      thumbnail: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCHn68-VsE7VrVPrsb3x0IoqFFNVUTxzVLgQ&s",
      modules: [],
    },
  ])

  // demo Super Admin courses catalog for importing
  const superAdminCourses = [
    {
      id: "sa-1",
      name: "JavaScript Essentials (Super Admin)",
      code: "SA-JS101",
      category: "Programming",
      instructor: "Super Admin",
      lastUpdated: "2024-12-01",
      status: "Draft",
      enrollmentCount: 0,
      enrollmentType: "Free",
      price: 0,
      duration: "4 weeks",
      level: "Beginner",
      description: "Core JavaScript fundamentals curated by Super Admin.",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
      modules: [
        { id: 1, title: "Variables & Types", lessons: 5, duration: "1 hour" },
        { id: 2, title: "Functions & Scope", lessons: 6, duration: "1.5 hours" },
      ],
    },
    {
      id: "sa-2",
      name: "Intro to SQL (Super Admin)",
      code: "SA-SQL100",
      category: "Data Science",
      instructor: "Super Admin",
      lastUpdated: "2024-11-20",
      status: "Draft",
      enrollmentCount: 0,
      enrollmentType: "Free",
      price: 0,
      duration: "3 weeks",
      level: "Beginner",
      description: "Learn SQL basics: SELECTs, JOINs, and aggregations.",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/8/87/Sql_data_base_with_logo.png",
      modules: [
        { id: 1, title: "SELECT Basics", lessons: 4, duration: "50 mins" },
        { id: 2, title: "JOINs", lessons: 5, duration: "1 hour" },
      ],
    },
    {
      id: "sa-3",
      name: "Git & GitHub Crash Course (Super Admin)",
      code: "SA-GIT101",
      category: "Programming",
      instructor: "Super Admin",
      lastUpdated: "2024-10-10",
      status: "Draft",
      enrollmentCount: 0,
      enrollmentType: "Free",
      price: 0,
      duration: "2 weeks",
      level: "Beginner",
      description: "Version control essentials with Git and collaboration on GitHub.",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Git_icon.svg",
      modules: [
        { id: 1, title: "Git Basics", lessons: 3, duration: "40 mins" },
        { id: 2, title: "Branches & Merges", lessons: 4, duration: "55 mins" },
      ],
    },
  ]

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Course Published",
      message: "Advanced React Development has been published successfully",
      time: "2 hours ago",
      type: "success",
    },
    {
      id: 2,
      title: "New Enrollment",
      message: "25 new students enrolled in Python Data Science",
      time: "4 hours ago",
      type: "info",
    },
  ])

  // Filter courses based on search and filters
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = filters.category === "all" || course.category === filters.category
    const matchesStatus = filters.status === "all" || course.status === filters.status
    const matchesInstructor = filters.instructor === "all" || course.instructor === filters.instructor
    const matchesEnrollmentType = filters.enrollmentType === "all" || course.enrollmentType === filters.enrollmentType

    return matchesSearch && matchesCategory && matchesStatus && matchesInstructor && matchesEnrollmentType
  })

  // Action handlers
  const handleViewCourse = (course) => {
    setSelectedCourse(course)
  }

  const handleEditCourse = (course) => {
    setCourseToEdit(course)
    setIsEditModalOpen(true)
    form.setFieldsValue(course)
  }

  const handleDuplicateCourse = (course) => {
    const duplicatedCourse = {
      ...course,
      id: Date.now().toString(),
      name: `${course.name} (Copy)`,
      code: `${course.code}_COPY`,
      status: "Draft",
      enrollmentCount: 0,
      lastUpdated: new Date().toISOString().split("T")[0],
    }
    setCourses([...courses, duplicatedCourse])
    message.success("Course duplicated successfully")
  }

  const handleToggleStatus = (courseId, newStatus) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId
          ? { ...course, status: newStatus, lastUpdated: new Date().toISOString().split("T")[0] }
          : course,
      ),
    )
    message.success(`Course ${newStatus.toLowerCase()} successfully`)
  }

  const handleArchiveCourse = (courseId) => {
    handleToggleStatus(courseId, "Archived")
  }

  const handleImportCourses = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result)
        if (Array.isArray(importedData)) {
          const newCourses = importedData.map((course) => ({
            ...course,
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            lastUpdated: new Date().toISOString().split("T")[0],
            enrollmentCount: course.enrollmentCount || 0,
            modules: course.modules || [],
          }))
          setCourses([...courses, ...newCourses])
          message.success(`Successfully imported ${newCourses.length} courses`)
          setIsImportModalOpen(false)
        } else {
          message.error("Invalid file format. Please upload a valid JSON file with courses array.")
        }
      } catch (error) {
        message.error("Error parsing file. Please ensure it's a valid JSON format.")
      }
    }
    reader.readAsText(file)
    return false // Prevent default upload behavior
  }

  const handleDeleteCourse = (course) => {
    setCourseToDelete(course)
    setIsDeleteModalOpen(true)
  }

  const confirmDeleteCourse = () => {
    if (courseToDelete) {
      setCourses(courses.filter((course) => course.id !== courseToDelete.id))
      message.success("Course deleted successfully")
      setIsDeleteModalOpen(false)
      setCourseToDelete(null)
    }
  }

  const handleEnrollmentManagement = (course) => {
    setCourseToEnroll(course)
    setIsEnrollmentModalOpen(true)
  }

  const handleContentEditor = (course) => {
    setSelectedCourse(course)
    setCourseModules(course.modules || [])
    setIsContentEditorOpen(true)
  }

  const exportToCSV = () => {
    message.success("Courses data exported successfully")
  }

  const handleBulkAction = (action) => {
    if (selectedCourses.length === 0) {
      message.warning("Please select courses first")
      return
    }

    let title, content, onConfirm

    switch (action) {
      case "publish":
        title = "Publish Courses"
        content = `Are you sure you want to publish ${selectedCourses.length} selected course(s)?`
        onConfirm = () => {
          setCourses(
            courses.map((course) =>
              selectedCourses.includes(course.id) ? { ...course, status: "Published" } : course,
            ),
          )
          message.success(`${selectedCourses.length} courses published`)
          setSelectedCourses([])
          setSelectedRowKeys([])
          setConfirmModal({ visible: false })
        }
        break
      case "archive":
        title = "Archive Courses"
        content = `Are you sure you want to archive ${selectedCourses.length} selected course(s)?`
        onConfirm = () => {
          setCourses(
            courses.map((course) => (selectedCourses.includes(course.id) ? { ...course, status: "Archived" } : course)),
          )
          message.success(`${selectedCourses.length} courses archived`)
          setSelectedCourses([])
          setSelectedRowKeys([])
          setConfirmModal({ visible: false })
        }
        break
      case "delete":
        title = "Delete Courses"
        content = `Are you sure you want to permanently delete ${selectedCourses.length} selected course(s)? This action cannot be undone.`
        onConfirm = () => {
          setCourses(courses.filter((course) => !selectedCourses.includes(course.id)))
          message.success(`${selectedCourses.length} courses deleted`)
          setSelectedCourses([])
          setSelectedRowKeys([])
          setConfirmModal({ visible: false })
        }
        break
    }

    setConfirmModal({
      visible: true,
      action,
      title,
      content,
      onConfirm,
    })
  }

  // Row selection for table
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys)
      setSelectedCourses(selectedRowKeys)
    },
  }

  // Action items for dropdown
  const getActionItems = (course) => [
    {
      key: "view",
      label: (
        <span onClick={() => handleViewCourse(course)}>
          <Eye className="h-4 w-4 mr-2 inline" />
          View Details
        </span>
      ),
    },
    {
      key: "edit",
      label: (
        <span onClick={() => handleEditCourse(course)}>
          <Edit className="h-4 w-4 mr-2 inline" />
          Edit Course
        </span>
      ),
    },
    {
      key: "content",
      label: (
        <span onClick={() => handleContentEditor(course)}>
          <BookOpen className="h-4 w-4 mr-2 inline" />
          Content Editor
        </span>
      ),
    },
    {
      key: "duplicate",
      label: (
        <span onClick={() => handleDuplicateCourse(course)}>
          <Copy className="h-4 w-4 mr-2 inline" />
          Duplicate
        </span>
      ),
    },
    {
      key: "enrollment",
      label: (
        <span onClick={() => handleEnrollmentManagement(course)}>
          <Users className="h-4 w-4 mr-2 inline" />
          Manage Enrollment
        </span>
      ),
    },
    {
      key: "toggleStatus",
      label: (
        <span onClick={() => handleToggleStatus(course.id, course.status === "Published" ? "Draft" : "Published")}>
          {course.status === "Published" ? (
            <Pause className="h-4 w-4 mr-2 inline" />
          ) : (
            <Play className="h-4 w-4 mr-2 inline" />
          )}
          {course.status === "Published" ? "Unpublish" : "Publish"}
        </span>
      ),
    },
    {
      key: "archive",
      label: (
        <span onClick={() => handleArchiveCourse(course.id)}>
          <Archive className="h-4 w-4 mr-2 inline" />
          Archive
        </span>
      ),
    },
    {
      key: "delete",
      label: (
        <span className="text-red-600" onClick={() => handleDeleteCourse(course)}>
          <Trash2 className="h-4 w-4 mr-2 inline" />
          Delete
        </span>
      ),
    },
  ]

  // Table columns
  const columns = [
    {
      title: "Course",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => (
        <div className="flex items-center">
          <img
            src={record.thumbnail || "/placeholder.svg"}
            alt={record.name}
            className="w-12 h-12 rounded-lg object-cover mr-3"
          />
          <div>
            <div className="font-medium text-gray-900">
              {text}{" "}
              {record.importedFromSuperAdmin ? (
                <Tag color="purple" className="ml-1">
                  Super Admin
                </Tag>
              ) : null}
            </div>
            <div className="text-sm text-gray-500">{record.code}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      filters: categoryOptions.map((category) => ({ text: category, value: category })),
      onFilter: (value, record) => record.category === value,
      render: (category) => <Tag color="blue">{category}</Tag>,
    },
    {
      title: "Instructor",
      dataIndex: "instructor",
      key: "instructor",
      filters: instructorOptions.map((instructor) => ({ text: instructor, value: instructor })),
      onFilter: (value, record) => record.instructor === value,
    },
    {
      title: "Last Updated",
      dataIndex: "lastUpdated",
      key: "lastUpdated",
      sorter: (a, b) => new Date(a.lastUpdated) - new Date(b.lastUpdated),
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: statusOptions.map((status) => ({ text: status, value: status })),
      onFilter: (value, record) => record.status === value,
      render: (status) => {
        let color = "green"
        if (status === "Draft") color = "orange"
        if (status === "Archived") color = "red"
        if (status === "Under Review") color = "blue"
        return <Tag color={color}>{status}</Tag>
      },
    },
    {
      title: "Enrollment",
      dataIndex: "enrollmentCount",
      key: "enrollmentCount",
      sorter: (a, b) => a.enrollmentCount - b.enrollmentCount,
      render: (count, record) => (
        <div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-gray-500" />
            <span className="font-medium">{count}</span>
          </div>
          <div className="text-xs text-gray-500">{record.enrollmentType}</div>
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Dropdown menu={{ items: getActionItems(record) }} trigger={["click"]} placement="bottomRight">
          <Button type="text" icon={<MoreVertical className="h-4 w-4" />} />
        </Dropdown>
      ),
    },
  ]

  // Multi-step form steps
  const steps = [
    { title: "Basic Info", icon: <FileText className="h-4 w-4" /> },
    { title: "Content", icon: <BookOpen className="h-4 w-4" /> },
    { title: "Settings", icon: <Settings className="h-4 w-4" /> },
    { title: "Enrollment", icon: <Users className="h-4 w-4" /> },
  ]

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <Form.Item name="name" label="Course Name" rules={[{ required: true }]}>
              <Input placeholder="Enter course name" />
            </Form.Item>
            <Form.Item name="code" label="Course Code" rules={[{ required: true }]}>
              <Input placeholder="Enter course code" />
            </Form.Item>
            <Form.Item name="description" label="Description" rules={[{ required: true }]}>
              <TextArea rows={4} placeholder="Enter course description" />
            </Form.Item>
            <Form.Item name="category" label="Category" rules={[{ required: true }]}>
              <Select placeholder="Select category">
                {categoryOptions.map((option) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="instructor" label="Instructor" rules={[{ required: true }]}>
              <Select placeholder="Select instructor">
                {instructorOptions.map((option) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="thumbnail" label="Course Thumbnail">
              <AntUpload.Dragger>
                <p className="ant-upload-drag-icon">
                  <Upload className="h-8 w-8 mx-auto text-gray-400" />
                </p>
                <p className="ant-upload-text">Click or drag file to upload</p>
              </AntUpload.Dragger>
            </Form.Item>
          </div>
        )
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center py-8">
              <BookOpen className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-2">Content Editor</h3>
              <p className="text-gray-500 mb-4">Add modules, lessons, quizzes, and assignments</p>
              <Button type="primary" onClick={() => setIsContentEditorOpen(true)}>
                Open Content Editor
              </Button>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <Form.Item name="duration" label="Duration">
              <Input placeholder="e.g., 8 weeks" />
            </Form.Item>
            <Form.Item name="level" label="Difficulty Level">
              <Select placeholder="Select level">
                <Option value="Beginner">Beginner</Option>
                <Option value="Intermediate">Intermediate</Option>
                <Option value="Advanced">Advanced</Option>
              </Select>
            </Form.Item>
            <Form.Item name="status" label="Initial Status">
              <Radio.Group>
                <Radio value="Draft">Draft</Radio>
                <Radio value="Under Review">Under Review</Radio>
                <Radio value="Published">Published</Radio>
              </Radio.Group>
            </Form.Item>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <Form.Item name="enrollmentType" label="Enrollment Type" rules={[{ required: true }]}>
              <Radio.Group>
                <Radio value="Free">Free</Radio>
                <Radio value="Paid">Paid</Radio>
                <Radio value="Invite Only">Invite Only</Radio>
                <Radio value="Premium">Premium</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="price" label="Price (if paid)">
              <InputNumber
                style={{ width: "100%" }}
                formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                placeholder="0.00"
              />
            </Form.Item>
            <Form.Item name="maxEnrollments" label="Maximum Enrollments">
              <InputNumber style={{ width: "100%" }} placeholder="Leave empty for unlimited" />
            </Form.Item>
          </div>
        )
      default:
        return null
    }
  }

  const getStatusColor = (status) => {
    if (status === "Published") return "green"
    if (status === "Draft") return "orange"
    return "red"
  }

  const handleView = (course) => {
    setSelectedCourse(course)
  }

  const handleEdit = (course) => {
    setCourseToEdit(course)
    setIsEditModalOpen(true)
    form.setFieldsValue(course)
  }

  const handleDuplicate = (course) => {
    const duplicatedCourse = {
      ...course,
      id: Date.now().toString(),
      name: `${course.name} (Copy)`,
      code: `${course.code}_COPY`,
      status: "Draft",
      enrollmentCount: 0,
      lastUpdated: new Date().toISOString().split("T")[0],
    }
    setCourses([...courses, duplicatedCourse])
    message.success("Course duplicated successfully")
  }

  const handleArchive = (course) => {
    setCourses(courses.map((c) => (c.id === course.id ? { ...c, status: "Archived" } : c)))
    message.success("Course archived successfully")
  }

  const handleDelete = (course) => {
    handleDeleteCourse(course)
  }

  const importOneSuperCourse = (course) => {
    const alreadyImported = courses.some((c) => c.code === course.code)
    if (alreadyImported) {
      message.info(`${course.name} already imported`)
      return
    }
    const newCourse = {
      ...course,
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      importedFromSuperAdmin: true,
      lastUpdated: new Date().toISOString().split("T")[0],
      enrollmentCount: course.enrollmentCount || 0,
      modules: course.modules || [],
    }
    setCourses([...courses, newCourse])
    message.success(`Imported ${course.name}`)
  }

  const importAllSuperCourses = () => {
    const existingCodes = new Set(courses.map((c) => c.code))
    const toImport = superAdminCourses.filter((c) => !existingCodes.has(c.code))
    if (toImport.length === 0) {
      message.info("All Super Admin courses are already imported")
      return
    }
    const mapped = toImport.map((c) => ({
      ...c,
      id: Date.now().toString() + Math.random().toString(36).slice(2),
      importedFromSuperAdmin: true,
      lastUpdated: new Date().toISOString().split("T")[0],
      enrollmentCount: c.enrollmentCount || 0,
      modules: c.modules || [],
    }))
    setCourses([...courses, ...mapped])
    message.success(`Imported ${mapped.length} Super Admin course(s)`)
    setIsSuperImportModalOpen(false)
  }

  return (
    <div className="">
      <div className="w-full">
        <div className=" px-4 md:px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="md:text-2xl text-xl font-semibold">Manage Courses</h1>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button type="default" icon={<Download />} onClick={exportToCSV} className="flex-1 sm:flex-none">
                Export Data
              </Button>
              <Button
                type="default"
                icon={<Upload />}
                onClick={() => setIsImportModalOpen(true)}
                className="flex-1 sm:flex-none"
              >
                Import Courses
              </Button>
              {/* CHANGE: add 'Import Super Admin' button in header actions */}
              <Button
                type="default"
                icon={<Download />}
                onClick={() => setIsSuperImportModalOpen(true)}
                className="flex-1 sm:flex-none"
              >
                Import Super Admin
              </Button>
              <Button
                type="default"
                icon={<Settings />}
                onClick={() => setIsManageModalOpen(true)}
                className="flex-1 sm:flex-none"
              >
                Manage
              </Button>
              <Button
                type="primary"
                icon={<Plus />}
                onClick={() => setIsAddModalOpen(true)}
                className="flex-1 sm:flex-none"
              >
                Add Course
              </Button>
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-600">{courses.length}</div>
              <div className="text-sm text-gray-600">Total Courses</div>
            </Card>
            <Card className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-green-600">
                {courses.filter((c) => c.status === "Published").length}
              </div>
              <div className="text-sm text-gray-600">Published</div>
            </Card>
            <Card className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-orange-600">
                {courses.filter((c) => c.status === "Draft").length}
              </div>
              <div className="text-sm text-gray-600">Draft</div>
            </Card>
            <Card className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-purple-600">
                {courses.reduce((sum, course) => sum + course.enrollmentCount, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Enrollments</div>
            </Card>
          </div>

          <Card className="mb-6">
            <div className="flex flex-col items-center lg:flex-row gap-4">
              <div className="flex-1">
                <Search
                  placeholder="Search courses by name, code, or instructor..."
                  allowClear
                  size="large"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  type={showFilters ? "primary" : "default"}
                  icon={<Filter />}
                  onClick={() => setShowFilters(!showFilters)}
                  className="min-w-[100px]"
                >
                  Filters
                </Button>

                <Radio.Group
                  value={viewMode}
                  onChange={(e) => setViewMode(e.target.value)}
                  size="medium"
                  buttonStyle="solid"
                >
                  <Radio.Button value="table">
                    <div className="flex items-center gap-1">
                      <span className="">Table</span>
                    </div>
                  </Radio.Button>
                  <Radio.Button value="card">
                    <div className="flex items-center gap-1">
                      <span className="">Cards</span>
                    </div>
                  </Radio.Button>
                </Radio.Group>
              </div>
            </div>

            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                  <Select
                    placeholder="Category"
                    allowClear
                    value={filters.category}
                    onChange={(value) => setFilters({ ...filters, category: value })}
                    className="w-full"
                    options={[
                      { value: "Programming", label: "Programming" },
                      { value: "Design", label: "Design" },
                      { value: "Business", label: "Business" },
                      { value: "Marketing", label: "Marketing" },
                      { value: "Data Science", label: "Data Science" },
                    ]}
                  />
                  <Select
                    placeholder="Status"
                    allowClear
                    value={filters.status}
                    onChange={(value) => setFilters({ ...filters, status: value })}
                    className="w-full"
                    options={[
                      { value: "Draft", label: "Draft" },
                      { value: "Published", label: "Published" },
                      { value: "Archived", label: "Archived" },
                    ]}
                  />
                  <Select
                    placeholder="Instructor"
                    allowClear
                    value={filters.instructor}
                    onChange={(value) => setFilters({ ...filters, instructor: value })}
                    className="w-full"
                    options={[
                      { value: "John Smith", label: "John Smith" },
                      { value: "Sarah Johnson", label: "Sarah Johnson" },
                      { value: "Mike Chen", label: "Mike Chen" },
                    ]}
                  />
                  <Select
                    placeholder="Enrollment Type"
                    allowClear
                    value={filters.enrollmentType}
                    onChange={(value) => setFilters({ ...filters, enrollmentType: value })}
                    className="w-full"
                    options={[
                      { value: "Free", label: "Free" },
                      { value: "Paid", label: "Paid" },
                      { value: "Invite", label: "Invite Only" },
                    ]}
                  />
                  <DatePicker
                    placeholder="Start Date"
                    value={filters.startDate}
                    onChange={(date) => setFilters({ ...filters, startDate: date })}
                    className="w-full"
                  />
                  <DatePicker
                    placeholder="End Date"
                    value={filters.endDate}
                    onChange={(date) => setFilters({ ...filters, endDate: date })}
                    className="w-full"
                  />
                </div>
              </div>
            )}
          </Card>

          {selectedCourses.length > 0 && (
            <Card className="mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-600">{selectedCourses.length} course(s) selected</span>
                  <Button
                    type="text"
                    size="small"
                    onClick={() => {
                      setSelectedCourses([])
                      setSelectedRowKeys([])
                    }}
                  >
                    Clear selection
                  </Button>
                </div>
                <Space>
                  <Button type="primary" icon={<CheckOutlined />} onClick={() => handleBulkAction("publish")}>
                    Publish
                  </Button>
                  <Button icon={<InboxOutlined />} onClick={() => handleBulkAction("archive")}>
                    Archive
                  </Button>
                  <Button danger icon={<DeleteOutlined />} onClick={() => handleBulkAction("delete")}>
                    Delete
                  </Button>
                </Space>
              </div>
            </Card>
          )}

          {viewMode === "table" ? (
            <Card>
              <div className="overflow-x-auto">
                <Table
                  columns={columns}
                  dataSource={filteredCourses}
                  rowKey="id"
                  pagination={{
                    total: filteredCourses.length,
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} courses`,
                    responsive: true,
                  }}
                  rowSelection={{
                    selectedRowKeys,
                    onChange: (selectedRowKeys, selectedRows) => {
                      setSelectedRowKeys(selectedRowKeys)
                      setSelectedCourses(selectedRowKeys)
                    },
                  }}
                  scroll={{ x: 1200 }}
                  size="middle"
                />
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card
                  key={course.id}
                  hoverable
                  className="h-full"
                  cover={
                    <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                      <span className="text-white text-lg font-semibold">{course.name}</span>
                    </div>
                  }
                  actions={[
                    <Button type="text" icon={<Eye />} onClick={() => handleView(course)} key="view">
                      View
                    </Button>,
                    <Button type="text" icon={<Edit />} onClick={() => handleEdit(course)} key="edit">
                      Edit
                    </Button>,
                    <Dropdown
                      menu={{
                        items: [
                          { key: "duplicate", label: "Duplicate", icon: <Copy /> },
                          { key: "archive", label: "Archive", icon: <Archive /> },
                          { key: "delete", label: "Delete", icon: <Trash2 />, danger: true },
                        ],
                        onClick: ({ key }) => {
                          if (key === "duplicate") handleDuplicate(course)
                          else if (key === "archive") handleArchive(course)
                          else if (key === "delete") handleDelete(course)
                        },
                      }}
                      key="more"
                    >
                      <Button type="text" icon={<MoreHorizontal />}>
                        More
                      </Button>
                    </Dropdown>,
                  ]}
                >
                  <Card.Meta
                    title={
                      <div className="flex items-center justify-between">
                        <span className="truncate">{course.name}</span>
                        <Tag color={getStatusColor(course.status)}>{course.status}</Tag>
                      </div>
                    }
                    description={
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600">Code: {course.code}</div>
                        <div className="text-sm text-gray-600">Category: {course.category}</div>
                        <div className="text-sm text-gray-600">Instructor: {course.instructor}</div>
                        <div className="text-sm text-gray-600">Enrollments: {course.enrollmentCount}</div>
                        <div className="text-sm text-gray-500">Updated: {course.lastUpdated}</div>
                      </div>
                    }
                  />
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <Modal
        title={confirmModal.title}
        open={confirmModal.visible}
        onOk={confirmModal.onConfirm}
        onCancel={() => setConfirmModal({ visible: false })}
        okText="Confirm"
        cancelText="Cancel"
        okButtonProps={{
          danger: confirmModal.action === "delete",
        }}
      >
        <p>{confirmModal.content}</p>
        {confirmModal.action === "delete" && (
          <Alert
            message="Warning"
            description="This action is permanent and cannot be undone."
            type="warning"
            showIcon
            className="mt-3"
          />
        )}
      </Modal>

      <Modal
        title="Import Courses"
        open={isImportModalOpen}
        onCancel={() => setIsImportModalOpen(false)}
        footer={null}
        width={600}
      >
        <div className="space-y-6">
          <div className="text-center">
            <Upload className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">Import Courses from JSON</h3>
            <p className="text-gray-500 mb-4">
              Upload a JSON file containing course data to import multiple courses at once.
            </p>
          </div>

          <AntUpload.Dragger accept=".json" beforeUpload={handleImportCourses} showUploadList={false} className="mb-4">
            <p className="ant-upload-drag-icon">
              <Upload className="h-8 w-8 mx-auto text-gray-400" />
            </p>
            <p className="ant-upload-text">Click or drag JSON file to upload</p>
            <p className="ant-upload-hint">
              Support for single JSON file upload only. File should contain an array of course objects.
            </p>
          </AntUpload.Dragger>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Expected JSON Format:</h4>
            <pre className="text-xs bg-white p-2 rounded border overflow-x-auto">
              {`[
  {
    "name": "Course Name",
    "code": "COURSE101",
    "category": "Programming",
    "instructor": "Dr. Smith",
    "description": "Course description",
    "status": "Draft",
    "enrollmentType": "Free",
    "price": 0,
    "duration": "4 weeks",
    "level": "Beginner"
  }
]`}
            </pre>
          </div>

          <div className="flex justify-end gap-2">
            <Button onClick={() => setIsImportModalOpen(false)}>Cancel</Button>
            <Button
              type="primary"
              onClick={() => {
                message.info("Please select a JSON file to import")
              }}
            >
              Download Sample
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        title="Confirm Course Deletion"
        open={isDeleteModalOpen}
        onCancel={() => {
          setIsDeleteModalOpen(false)
          setCourseToDelete(null)
        }}
        footer={[
          <Button
            key="cancel"
            onClick={() => {
              setIsDeleteModalOpen(false)
              setCourseToDelete(null)
            }}
          >
            Cancel
          </Button>,
          <Button key="delete" type="primary" danger onClick={confirmDeleteCourse}>
            Yes, Delete Course
          </Button>,
        ]}
        width={500}
        centered
      >
        {courseToDelete && (
          <div className="space-y-4">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-red-100 p-3 rounded-full">
                <Trash2 className="h-8 w-8 text-red-600" />
              </div>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete "{courseToDelete.name}"?</h3>
              <p className="text-gray-600 mb-4">
                This action cannot be undone. All course content, modules, and learner data will be permanently removed.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Course Code:</span>
                <span className="text-gray-900">{courseToDelete.code}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Category:</span>
                <span className="text-gray-900">{courseToDelete.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Instructor:</span>
                <span className="text-gray-900">{courseToDelete.instructor}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Current Enrollments:</span>
                <span className="text-gray-900 font-semibold">{courseToDelete.enrollmentCount} students</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Status:</span>
                <Tag color={courseToDelete.status === "Published" ? "green" : "orange"}>{courseToDelete.status}</Tag>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-800">
                    <strong>Warning:</strong> Deleting this course will also remove all associated modules, lessons,
                    quizzes, assignments, and student progress data.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Overlay for mobile sidebar */}

      {/* Add/Edit Course Modal */}
      <Modal
        title={courseToEdit ? "Edit Course" : "Add New Course"}
        open={isAddModalOpen || isEditModalOpen}
        onCancel={() => {
          setIsAddModalOpen(false)
          setIsEditModalOpen(false)
          setCourseToEdit(null)
          setCurrentStep(0)
          form.resetFields()
        }}
        footer={null}
        width={800}
        className="course-modal"
      >
        <div className="mb-6">
          <Steps current={currentStep} size="small">
            {steps.map((step, index) => (
              <Step key={index} title={step.title} icon={step.icon} />
            ))}
          </Steps>
        </div>

        <Form form={form} layout="vertical" className="max-h-96 overflow-y-auto">
          {renderStepContent()}
        </Form>

        <div className="flex justify-between mt-6 pt-4 border-t">
          <Button
            disabled={currentStep === 0}
            onClick={() => setCurrentStep(currentStep - 1)}
            icon={<ChevronLeft className="h-4 w-4" />}
          >
            Previous
          </Button>

          <div className="flex gap-2">
            {currentStep < steps.length - 1 ? (
              <Button
                type="primary"
                onClick={() => setCurrentStep(currentStep + 1)}
                icon={<ChevronRight className="h-4 w-4" />}
                iconPosition="end"
              >
                Next
              </Button>
            ) : (
              <Button
                type="primary"
                onClick={() => {
                  form.validateFields().then((values) => {
                    if (courseToEdit) {
                      setCourses(
                        courses.map((course) =>
                          course.id === courseToEdit.id
                            ? { ...course, ...values, lastUpdated: new Date().toISOString().split("T")[0] }
                            : course,
                        ),
                      )
                      message.success("Course updated successfully")
                    } else {
                      const newCourse = {
                        id: Date.now().toString(),
                        ...values,
                        enrollmentCount: 0,
                        lastUpdated: new Date().toISOString().split("T")[0],
                        modules: [],
                      }
                      setCourses([...courses, newCourse])
                      message.success("Course created successfully")
                    }
                    setIsAddModalOpen(false)
                    setIsEditModalOpen(false)
                    setCourseToEdit(null)
                    setCurrentStep(0)
                    form.resetFields()
                  })
                }}
                icon={<Save className="h-4 w-4" />}
              >
                {courseToEdit ? "Update Course" : "Create Course"}
              </Button>
            )}
          </div>
        </div>
      </Modal>

      {/* Course Details Modal */}
      {selectedCourse && !isContentEditorOpen && (
        <Modal
          title="Course Details"
          open={!!selectedCourse}
          onCancel={() => setSelectedCourse(null)}
          footer={[
            <Button key="edit" type="primary" onClick={() => handleEditCourse(selectedCourse)}>
              Edit Course
            </Button>,
            <Button key="content" onClick={() => handleContentEditor(selectedCourse)}>
              Content Editor
            </Button>,
          ]}
          width={600}
        >
          <div className="space-y-4">
            <img
              src={selectedCourse.thumbnail || "/placeholder.svg"}
              alt={selectedCourse.name}
              className="w-full h-48 object-cover rounded-lg"
            />

            <div>
              <h3 className="text-lg font-semibold mb-2">{selectedCourse.name}</h3>
              <p className="text-gray-600 mb-4">{selectedCourse.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm font-medium text-gray-500">Course Code:</span>
                <p className="text-sm">{selectedCourse.code}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Category:</span>
                <p className="text-sm">{selectedCourse.category}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Instructor:</span>
                <p className="text-sm">{selectedCourse.instructor}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Duration:</span>
                <p className="text-sm">{selectedCourse.duration}</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Enrollment:</span>
                <p className="text-sm">{selectedCourse.enrollmentCount} students</p>
              </div>
              <div>
                <span className="text-sm font-medium text-gray-500">Status:</span>
                <Tag color={selectedCourse.status === "Published" ? "green" : "orange"}>{selectedCourse.status}</Tag>
              </div>
            </div>

            {selectedCourse.modules && selectedCourse.modules.length > 0 && (
              <div>
                <h4 className="font-medium mb-2">Course Modules</h4>
                <List
                  size="small"
                  dataSource={selectedCourse.modules}
                  renderItem={(module) => (
                    <List.Item>
                      <div className="flex justify-between w-full">
                        <span>{module.title}</span>
                        <span className="text-gray-500 text-sm">
                          {module.lessons} lessons • {module.duration}
                        </span>
                      </div>
                    </List.Item>
                  )}
                />
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Content Editor Modal */}
      {isContentEditorOpen && (
        <Modal
          title="Content Editor"
          open={isContentEditorOpen}
          onCancel={() => setIsContentEditorOpen(false)}
          width={1000}
          footer={[
            <Button
              key="save"
              type="primary"
              onClick={() => {
                if (selectedCourse) {
                  setCourses(
                    courses.map((course) =>
                      course.id === selectedCourse.id ? { ...course, modules: courseModules } : course,
                    ),
                  )
                  message.success("Course content updated successfully")
                }
                setIsContentEditorOpen(false)
              }}
            >
              Save Content
            </Button>,
          ]}
        >
          <Tabs defaultActiveKey="modules">
            <TabPane tab="Modules" key="modules">
              <div className="space-y-4">
                <Button
                  type="dashed"
                  block
                  icon={<Plus />}
                  onClick={() => {
                    const newModule = {
                      id: Date.now(),
                      title: `Module ${courseModules.length + 1}`,
                      lessons: 0,
                      duration: "0 hours",
                      content: [],
                    }
                    setCourseModules([...courseModules, newModule])
                  }}
                >
                  Add Module
                </Button>

                <Collapse>
                  {courseModules.map((module, index) => (
                    <Panel
                      header={
                        <div className="flex justify-between items-center">
                          <span>{module.title}</span>
                          <span className="text-gray-500 text-sm">{module.lessons} lessons</span>
                        </div>
                      }
                      key={module.id}
                      extra={
                        <Button
                          type="text"
                          danger
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation()
                            setCourseModules(courseModules.filter((m) => m.id !== module.id))
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      }
                    >
                      <div className="space-y-4">
                        <Input
                          value={module.title}
                          onChange={(e) => {
                            setCourseModules(
                              courseModules.map((m) => (m.id === module.id ? { ...m, title: e.target.value } : m)),
                            )
                          }}
                          placeholder="Module title"
                        />

                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Lessons</span>
                            <Button size="small" type="dashed">
                              Add Lesson
                            </Button>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Quizzes</span>
                              <Button size="small" type="dashed">
                                Add Quiz
                              </Button>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Assignments</span>
                              <Button size="small" type="dashed">
                                Add Assignment
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Panel>
                  ))}
                </Collapse>
              </div>
            </TabPane>

            <TabPane tab="Preview" key="preview">
              <div className="text-center py-8">
                <Eye className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-2">Course Preview</h3>
                <p className="text-gray-500">Preview how your course will look to students</p>
              </div>
            </TabPane>
          </Tabs>
        </Modal>
      )}

      {/* Enrollment Management Modal */}
      {isEnrollmentModalOpen && courseToEnroll && (
        <Modal
          title="Manage Enrollment"
          open={isEnrollmentModalOpen}
          onCancel={() => {
            setIsEnrollmentModalOpen(false)
            setCourseToEnroll(null)
          }}
          width={600}
          footer={[
            <Button key="save" type="primary">
              Save Changes
            </Button>,
          ]}
        >
          <Tabs defaultActiveKey="enroll">
            <TabPane tab="Enroll Users" key="enroll">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Users</label>
                  <Select
                    mode="multiple"
                    placeholder="Search and select users to enroll"
                    style={{ width: "100%" }}
                    options={[
                      { value: "user1", label: "John Doe (john@example.com)" },
                      { value: "user2", label: "Jane Smith (jane@example.com)" },
                      { value: "user3", label: "Bob Johnson (bob@example.com)" },
                    ]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Or Select Groups</label>
                  <Select
                    mode="multiple"
                    placeholder="Select groups to enroll"
                    style={{ width: "100%" }}
                    options={[
                      { value: "group1", label: "Engineering Team" },
                      { value: "group2", label: "Marketing Team" },
                      { value: "group3", label: "Sales Team" },
                    ]}
                  />
                </div>
              </div>
            </TabPane>

            <TabPane tab="Current Enrollments" key="current">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total Enrolled: {courseToEnroll.enrollmentCount}</span>
                  <Button size="small" danger>
                    Unenroll Selected
                  </Button>
                </div>

                <List
                  size="small"
                  dataSource={[
                    { name: "John Doe", email: "john@example.com", enrolledDate: "2024-01-15", progress: 45 },
                    { name: "Jane Smith", email: "jane@example.com", enrolledDate: "2024-01-12", progress: 78 },
                    { name: "Bob Johnson", email: "bob@example.com", enrolledDate: "2024-01-10", progress: 23 },
                  ]}
                  renderItem={(item) => (
                    <List.Item
                      actions={[
                        <Button key="unenroll" size="small" danger type="text">
                          Unenroll
                        </Button>,
                      ]}
                    >
                      <List.Item.Meta
                        title={item.name}
                        description={`${item.email} • Enrolled: ${item.enrolledDate} • Progress: ${item.progress}%`}
                      />
                    </List.Item>
                  )}
                />
              </div>
            </TabPane>
          </Tabs>
        </Modal>
      )}
      {/* Super Admin Import Modal */}
      <Modal
        title="Import Super Admin Courses"
        open={isSuperImportModalOpen}
        onCancel={() => setIsSuperImportModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsSuperImportModalOpen(false)}>
            Cancel
          </Button>,
          <Button key="importAll" type="primary" onClick={importAllSuperCourses}>
            Import All
          </Button>,
        ]}
        width={700}
      >
        <div className="space-y-6">
          <div className="text-center">
            <Upload className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">Import Courses from Super Admin Catalog</h3>
            <p className="text-gray-500 mb-4">
              Select courses from the Super Admin catalog to import into your system.
            </p>
          </div>
          <List
            size="small"
            bordered
            dataSource={superAdminCourses}
            renderItem={(course) => (
              <List.Item
                actions={[
                  <Button
                    key="import"
                    size="small"
                    type="primary"
                    onClick={() => importOneSuperCourse(course)}
                    disabled={courses.some((c) => c.code === course.code)}
                  >
                    {courses.some((c) => c.code === course.code) ? "Imported" : "Import"}
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <img
                      src={course.thumbnail || "/placeholder.svg"}
                      alt={course.name}
                      className="w-10 h-10 rounded-md object-cover"
                    />
                  }
                  title={course.name}
                  description={`${course.category} - ${course.instructor}`}
                />
              </List.Item>
            )}
          />
        </div>
      </Modal>
    </div>
  )
}
