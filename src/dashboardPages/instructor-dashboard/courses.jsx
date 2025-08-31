/* eslint-disable no-unused-vars */
"use client"

import { useState, useEffect } from "react"
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
  Upload,
  Tabs,
  List,
  Collapse,
  InputNumber,
  Radio,
  Space,
  Checkbox,
  Progress,
  Avatar,
  Tooltip,
  Popconfirm,
  Row,
  Col,
  Divider,
  Typography,
} from "antd"
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  UploadOutlined,
  FilterOutlined,
  UserOutlined,
  BookOutlined,
  FileTextOutlined,
  SettingOutlined,
  TeamOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  MoreOutlined,
  TableOutlined,
  AppstoreOutlined,
  ExportOutlined,
  CopyOutlined,
} from "@ant-design/icons"

import { IoArchiveOutline } from "react-icons/io5";


const { Search } = Input
const { Option } = Select
const { RangePicker } = DatePicker
const { Step } = Steps
const { TabPane } = Tabs
const { Panel } = Collapse
const { TextArea } = Input
const { Title, Text } = Typography

const CoursesManagement = () => {
  // State management
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchText, setSearchText] = useState("")
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [viewMode, setViewMode] = useState("table")
  const [showFilters, setShowFilters] = useState(false)

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isContentEditorOpen, setIsContentEditorOpen] = useState(false)
  const [isEnrollmentModalOpen, setIsEnrollmentModalOpen] = useState(false)
  const [isBulkActionsModalOpen, setIsBulkActionsModalOpen] = useState(false)

  // Form and data states
  const [form] = Form.useForm()
  const [currentStep, setCurrentStep] = useState(0)
  const [courseToEdit, setCourseToEdit] = useState(null)
  const [courseToView, setCourseToView] = useState(null)
  const [courseToEnroll, setCourseToEnroll] = useState(null)
  const [courseModules, setCourseModules] = useState([])

  // Filter states
  const [filters, setFilters] = useState({
    category: "",
    status: "",
    instructor: "",
    dateRange: null,
  })

  // Sample data
  const sampleCourses = [
    {
      id: 1,
      name: "Introduction to React",
      code: "REACT101",
      category: "Web Development",
      instructor: "John Smith",
      status: "Published",
      enrollmentCount: 45,
      maxEnrollment: 50,
      enrollmentType: "Open",
      lastUpdated: "2024-01-15",
      createdDate: "2024-01-01",
      description: "Learn the fundamentals of React development",
      duration: "8 weeks",
      level: "Beginner",
      price: 299,
      thumbnail: "/api/placeholder/300/200",
      modules: 8,
      lessons: 32,
      quizzes: 8,
      assignments: 4,
      progress: 75,
    },
    {
      id: 2,
      name: "Advanced JavaScript",
      code: "JS201",
      category: "Programming",
      instructor: "Sarah Johnson",
      status: "Draft",
      enrollmentCount: 0,
      maxEnrollment: 30,
      enrollmentType: "Restricted",
      lastUpdated: "2024-01-20",
      createdDate: "2024-01-10",
      description: "Master advanced JavaScript concepts and patterns",
      duration: "12 weeks",
      level: "Advanced",
      price: 499,
      thumbnail: "/api/placeholder/300/200",
      modules: 12,
      lessons: 48,
      quizzes: 12,
      assignments: 8,
      progress: 30,
    },
    {
      id: 3,
      name: "UI/UX Design Principles",
      code: "DESIGN101",
      category: "Design",
      instructor: "Mike Wilson",
      status: "Published",
      enrollmentCount: 28,
      maxEnrollment: 35,
      enrollmentType: "Open",
      lastUpdated: "2024-01-18",
      createdDate: "2024-01-05",
      description: "Learn fundamental design principles for digital products",
      duration: "6 weeks",
      level: "Intermediate",
      price: 399,
      thumbnail: "/api/placeholder/300/200",
      modules: 6,
      lessons: 24,
      quizzes: 6,
      assignments: 3,
      progress: 90,
    },
    {
      id: 4,
      name: "Data Science Fundamentals",
      code: "DS101",
      category: "Data Science",
      instructor: "Emily Davis",
      status: "Under Review",
      enrollmentCount: 12,
      maxEnrollment: 25,
      enrollmentType: "Restricted",
      lastUpdated: "2024-01-22",
      createdDate: "2024-01-12",
      description: "Introduction to data science concepts and tools",
      duration: "10 weeks",
      level: "Beginner",
      price: 599,
      thumbnail: "/api/placeholder/300/200",
      modules: 10,
      lessons: 40,
      quizzes: 10,
      assignments: 6,
      progress: 60,
    },
    {
      id: 5,
      name: "Mobile App Development",
      code: "MOBILE201",
      category: "Mobile Development",
      instructor: "David Brown",
      status: "Archived",
      enrollmentCount: 67,
      maxEnrollment: 70,
      enrollmentType: "Closed",
      lastUpdated: "2024-01-10",
      createdDate: "2023-12-01",
      description: "Build native mobile applications for iOS and Android",
      duration: "16 weeks",
      level: "Advanced",
      price: 799,
      thumbnail: "/api/placeholder/300/200",
      modules: 16,
      lessons: 64,
      quizzes: 16,
      assignments: 12,
      progress: 100,
    },
  ]

  // Options for filters
  const categoryOptions = [
    "Web Development",
    "Programming",
    "Design",
    "Data Science",
    "Mobile Development",
    "DevOps",
    "AI/ML",
  ]
  const statusOptions = ["Published", "Draft", "Under Review", "Archived"]
  const instructorOptions = ["John Smith", "Sarah Johnson", "Mike Wilson", "Emily Davis", "David Brown"]
  const levelOptions = ["Beginner", "Intermediate", "Advanced"]

  // Initialize data
  useEffect(() => {
    setCourses(sampleCourses)
  }, [])

  // Multi-step form configuration
  const steps = [
    {
      title: "Basic Info",
      icon: <BookOutlined />,
      description: "Course details",
    },
    {
      title: "Content",
      icon: <FileTextOutlined />,
      description: "Modules & lessons",
    },
    {
      title: "Settings",
      icon: <SettingOutlined />,
      description: "Configuration",
    },
    {
      title: "Enrollment",
      icon: <TeamOutlined />,
      description: "User management",
    },
  ]

  // Filter courses based on search and filters
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchText.toLowerCase()) ||
      course.code.toLowerCase().includes(searchText.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchText.toLowerCase())

    const matchesCategory = !filters.category || course.category === filters.category
    const matchesStatus = !filters.status || course.status === filters.status
    const matchesInstructor = !filters.instructor || course.instructor === filters.instructor

    return matchesSearch && matchesCategory && matchesStatus && matchesInstructor
  })

  // Handle course actions
  const handleView = (course) => {
    setCourseToView(course)
    setIsViewModalOpen(true)
  }

  const handleEdit = (course) => {
    setCourseToEdit(course)
    form.setFieldsValue(course)
    setIsEditModalOpen(true)
  }

  const handleDelete = (course) => {
    setCourses(courses.filter((c) => c.id !== course.id))
    message.success("Course deleted successfully")
  }

  const handleArchive = (course) => {
    setCourses(courses.map((c) => (c.id === course.id ? { ...c, status: "Archived" } : c)))
    message.success("Course archived successfully")
  }

  const handlePublishToggle = (course) => {
    const newStatus = course.status === "Published" ? "Draft" : "Published"
    setCourses(courses.map((c) => (c.id === course.id ? { ...c, status: newStatus } : c)))
    message.success(`Course ${newStatus.toLowerCase()} successfully`)
  }

  const handleDuplicate = (course) => {
    const newCourse = {
      ...course,
      id: Date.now(),
      name: `${course.name} (Copy)`,
      code: `${course.code}_COPY`,
      status: "Draft",
      enrollmentCount: 0,
      createdDate: new Date().toISOString().split("T")[0],
      lastUpdated: new Date().toISOString().split("T")[0],
    }
    setCourses([...courses, newCourse])
    message.success("Course duplicated successfully")
  }

  // Bulk actions
  const handleBulkAction = (action) => {
    const selectedCourses = courses.filter((c) => selectedRowKeys.includes(c.id))

    switch (action) {
      case "publish":
        setCourses(courses.map((c) => (selectedRowKeys.includes(c.id) ? { ...c, status: "Published" } : c)))
        message.success(`${selectedCourses.length} courses published`)
        break
      case "archive":
        setCourses(courses.map((c) => (selectedRowKeys.includes(c.id) ? { ...c, status: "Archived" } : c)))
        message.success(`${selectedCourses.length} courses archived`)
        break
      case "delete":
        setCourses(courses.filter((c) => !selectedRowKeys.includes(c.id)))
        message.success(`${selectedCourses.length} courses deleted`)
        break
      default:
        break
    }
    setSelectedRowKeys([])
    setIsBulkActionsModalOpen(false)
  }

  // Export data
  const exportToCSV = () => {
    const csvContent = [
      ["Name", "Code", "Category", "Instructor", "Status", "Enrollments", "Last Updated"],
      ...filteredCourses.map((course) => [
        course.name,
        course.code,
        course.category,
        course.instructor,
        course.status,
        course.enrollmentCount,
        course.lastUpdated,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "courses.csv"
    a.click()
    window.URL.revokeObjectURL(url)
    message.success("Data exported successfully")
  }

  // Course action menu
  const getActionMenu = (course) => ({
    items: [
      {
        key: "view",
        icon: <EyeOutlined />,
        label: "View Details",
        onClick: () => handleView(course),
      },
      {
        key: "edit",
        icon: <EditOutlined />,
        label: "Edit Course",
        onClick: () => handleEdit(course),
      },
      {
        key: "content",
        icon: <BookOutlined />,
        label: "Edit Content",
        onClick: () => {
          setCourseToEdit(course)
          setIsContentEditorOpen(true)
        },
      },
      {
        key: "enrollment",
        icon: <TeamOutlined />,
        label: "Manage Enrollment",
        onClick: () => {
          setCourseToEnroll(course)
          setIsEnrollmentModalOpen(true)
        },
      },
      {
        type: "divider",
      },
      {
        key: "publish",
        icon: course.status === "Published" ? <ExclamationCircleOutlined /> : <CheckCircleOutlined />,
        label: course.status === "Published" ? "Unpublish" : "Publish",
        onClick: () => handlePublishToggle(course),
      },
      {
        key: "duplicate",
        icon: <CopyOutlined />,
        label: "Duplicate",
        onClick: () => handleDuplicate(course),
      },
      {
        type: "divider",
      },
      {
        key: "archive",
        icon: <IoArchiveOutline />,
        label: "Archive",
        onClick: () => handleArchive(course),
        disabled: course.status === "Archived",
      },
      {
        key: "delete",
        icon: <DeleteOutlined />,
        label: "Delete",
        danger: true,
        onClick: () => {
          Modal.confirm({
            title: "Delete Course",
            content: `Are you sure you want to delete "${course.name}"? This action cannot be undone.`,
            okText: "Delete",
            okType: "danger",
            onOk: () => handleDelete(course),
          })
        },
      },
    ],
  })

  // Table columns
  const columns = [
    {
      title: "Course",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => (
        <div className="flex items-center">
          <Avatar size={48} src={record.thumbnail} icon={<BookOutlined />} className="mr-3" />
          <div>
            <div className="font-medium text-gray-900">{text}</div>
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
            <UserOutlined className="text-gray-500" />
            <span className="font-medium">
              {count}/{record.maxEnrollment}
            </span>
          </div>
          <div className="text-xs text-gray-500">{record.enrollmentType}</div>
        </div>
      ),
    },
    {
      title: "Last Updated",
      dataIndex: "lastUpdated",
      key: "lastUpdated",
      sorter: (a, b) => new Date(a.lastUpdated) - new Date(b.lastUpdated),
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_, record) => (
        <Dropdown menu={getActionMenu(record)} trigger={["click"]}>
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ]

  // Render step content for multi-step form
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
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                  <Select placeholder="Select category">
                    {categoryOptions.map((option) => (
                      <Option key={option} value={option}>
                        {option}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="level" label="Level" rules={[{ required: true }]}>
                  <Select placeholder="Select level">
                    {levelOptions.map((option) => (
                      <Option key={option} value={option}>
                        {option}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="instructor" label="Instructor" rules={[{ required: true }]}>
                  <Select placeholder="Select instructor">
                    {instructorOptions.map((option) => (
                      <Option key={option} value={option}>
                        {option}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="duration" label="Duration" rules={[{ required: true }]}>
                  <Input placeholder="e.g., 8 weeks" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="thumbnail" label="Course Thumbnail">
              <Upload.Dragger>
                <p className="ant-upload-drag-icon">
                  <UploadOutlined style={{ fontSize: "48px", color: "#1890ff" }} />
                </p>
                <p className="ant-upload-text">Click or drag file to upload</p>
                <p className="ant-upload-hint">Support for image files (JPG, PNG, GIF)</p>
              </Upload.Dragger>
            </Form.Item>
          </div>
        )
      case 1:
        return (
          <div className="space-y-4">
            <div className="text-center py-8">
              <BookOutlined style={{ fontSize: "64px", color: "#1890ff" }} />
              <Title level={4}>Content Editor</Title>
              <Text type="secondary">Add modules, lessons, quizzes, and assignments</Text>
              <div className="mt-4">
                <Button type="primary" onClick={() => setIsContentEditorOpen(true)}>
                  Open Content Editor
                </Button>
              </div>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-4">
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="price" label="Price ($)" rules={[{ required: true }]}>
                  <InputNumber min={0} placeholder="0" style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="maxEnrollment" label="Max Enrollment" rules={[{ required: true }]}>
                  <InputNumber min={1} placeholder="50" style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="enrollmentType" label="Enrollment Type" rules={[{ required: true }]}>
              <Radio.Group>
                <Radio value="Open">Open - Anyone can enroll</Radio>
                <Radio value="Restricted">Restricted - Approval required</Radio>
                <Radio value="Closed">Closed - Invitation only</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="status" label="Initial Status" rules={[{ required: true }]}>
              <Radio.Group>
                <Radio value="Draft">Draft - Not visible to students</Radio>
                <Radio value="Published">Published - Available for enrollment</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name="certificate" label="Certificate" valuePropName="checked">
              <Checkbox>Award certificate upon completion</Checkbox>
            </Form.Item>
          </div>
        )
      case 3:
        return (
          <div className="space-y-4">
            <Form.Item name="autoEnroll" label="Auto Enrollment">
              <Select mode="multiple" placeholder="Select groups for auto enrollment">
                <Option value="group1">Engineering Team</Option>
                <Option value="group2">Marketing Team</Option>
                <Option value="group3">Sales Team</Option>
              </Select>
            </Form.Item>
            <Form.Item name="prerequisites" label="Prerequisites">
              <Select mode="multiple" placeholder="Select prerequisite courses">
                <Option value="course1">Introduction to Programming</Option>
                <Option value="course2">Web Fundamentals</Option>
              </Select>
            </Form.Item>
            <Form.Item name="tags" label="Tags">
              <Select mode="tags" placeholder="Add tags for better discoverability">
                <Option value="javascript">JavaScript</Option>
                <Option value="react">React</Option>
                <Option value="frontend">Frontend</Option>
              </Select>
            </Form.Item>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="md:p-6 p-3  min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <Title level={2}>Course Management</Title>
        <Text type="secondary">Manage your courses, content, and enrollments</Text>
      </div>

      {/* Stats Cards */}
      <Row gutter={16} className="mb-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{courses.length}</div>
              <div className="text-sm text-gray-600">Total Courses</div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {courses.filter((c) => c.status === "Published").length}
              </div>
              <div className="text-sm text-gray-600">Published</div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">
                {courses.filter((c) => c.status === "Draft").length}
              </div>
              <div className="text-sm text-gray-600">Draft</div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                {courses.reduce((sum, course) => sum + course.enrollmentCount, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Enrollments</div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Search and Actions */}
      <Card className="mb-6">
        <Row gutter={16} align="middle">
          <Col xs={24} md={12} lg={8}>
            <Search
              placeholder="Search courses by name, code, or instructor..."
              allowClear
              size="large"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Col>
          <Col xs={24} md={12} lg={16} className="text-right">
            <Space wrap>
              <Button
                type={showFilters ? "primary" : "default"}
                icon={<FilterOutlined />}
                onClick={() => setShowFilters(!showFilters)}
              >
                Filters
              </Button>
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("table")}
                  className={`px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm transition-colors ${
                    viewMode === "table" ? "bg-white text-blue-700 shadow-sm" : "text-gray-600"
                  }`}
                >
                  Table
                </button>
                <button
                  onClick={() => setViewMode("card")}
                  className={`px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm transition-colors ${
                    viewMode === "card" ? "bg-white text-blue-700 shadow-sm" : "text-gray-600"
                  }`}
                >
                  Cards
                </button>
              </div>
              <Button icon={<ExportOutlined />} onClick={exportToCSV}>
                Export
              </Button>
              {selectedRowKeys.length > 0 && (
                <Button type="primary" icon={<SettingOutlined />} onClick={() => setIsBulkActionsModalOpen(true)}>
                  Bulk Actions ({selectedRowKeys.length})
                </Button>
              )}
              <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsAddModalOpen(true)}>
                Add Course
              </Button>
            </Space>
          </Col>
        </Row>

        {/* Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t">
            <Row gutter={16}>
              <Col xs={24} sm={12} md={6}>
                <Select
                  placeholder="Category"
                  allowClear
                  style={{ width: "100%" }}
                  value={filters.category}
                  onChange={(value) => setFilters({ ...filters, category: value })}
                >
                  {categoryOptions.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Select
                  placeholder="Status"
                  allowClear
                  style={{ width: "100%" }}
                  value={filters.status}
                  onChange={(value) => setFilters({ ...filters, status: value })}
                >
                  {statusOptions.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Select
                  placeholder="Instructor"
                  allowClear
                  style={{ width: "100%" }}
                  value={filters.instructor}
                  onChange={(value) => setFilters({ ...filters, instructor: value })}
                >
                  {instructorOptions.map((option) => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <RangePicker
                  placeholder={["Start Date", "End Date"]}
                  style={{ width: "100%" }}
                  value={filters.dateRange}
                  onChange={(dates) => setFilters({ ...filters, dateRange: dates })}
                />
              </Col>
            </Row>
          </div>
        )}
      </Card>

      {/* Course List */}
      {viewMode === "table" ? (
        <Card>
          <Table
            columns={columns}
            dataSource={filteredCourses}
            rowKey="id"
            loading={loading}
            pagination={{
              total: filteredCourses.length,
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} courses`,
            }}
            rowSelection={{
              selectedRowKeys,
              onChange: setSelectedRowKeys,
            }}
            scroll={{ x: 1200 }}
          />
        </Card>
      ) : (
        <Row gutter={[16, 16]}>
          {filteredCourses.map((course) => (
            <Col xs={24} sm={12} lg={8} xl={6} key={course.id}>
              <Card
                hoverable
                cover={
                  <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center relative">
                    <BookOutlined style={{ fontSize: "48px", color: "white" }} />
                    <div className="absolute top-2 right-2">
                      <Tag color={course.status === "Published" ? "green" : "orange"}>{course.status}</Tag>
                    </div>
                  </div>
                }
                actions={[
                  <Tooltip key="view" title="View Details">
                    <Button type="text" icon={<EyeOutlined />} onClick={() => handleView(course)} />
                  </Tooltip>,
                  <Tooltip key="edit" title="Edit Course">
                    <Button type="text" icon={<EditOutlined />} onClick={() => handleEdit(course)} />
                  </Tooltip>,
                  <Dropdown key="more" menu={getActionMenu(course)} trigger={["click"]}>
                    <Button type="text" icon={<MoreOutlined />} />
                  </Dropdown>,
                ]}
              >
                <Card.Meta
                  title={course.name}
                  description={
                    <div>
                      <div className="text-sm text-gray-500 mb-2">{course.code}</div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">
                          <UserOutlined /> {course.enrollmentCount}/{course.maxEnrollment}
                        </span>
                        <span className="text-sm font-medium">${course.price}</span>
                      </div>
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}

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
        destroyOnClose
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
          <Button disabled={currentStep === 0} onClick={() => setCurrentStep(currentStep - 1)}>
            Previous
          </Button>

          <div className="flex gap-2">
            {currentStep < steps.length - 1 ? (
              <Button type="primary" onClick={() => setCurrentStep(currentStep + 1)}>
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
                        id: Date.now(),
                        ...values,
                        enrollmentCount: 0,
                        createdDate: new Date().toISOString().split("T")[0],
                        lastUpdated: new Date().toISOString().split("T")[0],
                        modules: 0,
                        lessons: 0,
                        quizzes: 0,
                        assignments: 0,
                        progress: 0,
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
              >
                {courseToEdit ? "Update Course" : "Create Course"}
              </Button>
            )}
          </div>
        </div>
      </Modal>

      {/* Course Details Modal */}
      <Modal
        title="Course Details"
        open={isViewModalOpen}
        onCancel={() => setIsViewModalOpen(false)}
        footer={[
          <Button
            key="edit"
            type="primary"
            onClick={() => {
              setIsViewModalOpen(false)
              handleEdit(courseToView)
            }}
          >
            Edit Course
          </Button>,
        ]}
        width={800}
      >
        {courseToView && (
          <div>
            <Row gutter={16}>
              <Col span={8}>
                <div className="h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
                  <BookOutlined style={{ fontSize: "48px", color: "white" }} />
                </div>
              </Col>
              <Col span={16}>
                <Title level={3}>{courseToView.name}</Title>
                <Text type="secondary">{courseToView.code}</Text>
                <div className="mt-2">
                  <Tag color="blue">{courseToView.category}</Tag>
                  <Tag color={courseToView.status === "Published" ? "green" : "orange"}>{courseToView.status}</Tag>
                </div>
                <div className="mt-4">
                  <Text>{courseToView.description}</Text>
                </div>
              </Col>
            </Row>

            <Divider />

            <Row gutter={16}>
              <Col span={12}>
                <div className="space-y-2">
                  <div>
                    <strong>Instructor:</strong> {courseToView.instructor}
                  </div>
                  <div>
                    <strong>Duration:</strong> {courseToView.duration}
                  </div>
                  <div>
                    <strong>Level:</strong> {courseToView.level}
                  </div>
                  <div>
                    <strong>Price:</strong> ${courseToView.price}
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className="space-y-2">
                  <div>
                    <strong>Enrollment:</strong> {courseToView.enrollmentCount}/{courseToView.maxEnrollment}
                  </div>
                  <div>
                    <strong>Modules:</strong> {courseToView.modules}
                  </div>
                  <div>
                    <strong>Lessons:</strong> {courseToView.lessons}
                  </div>
                  <div>
                    <strong>Quizzes:</strong> {courseToView.quizzes}
                  </div>
                </div>
              </Col>
            </Row>

            <Divider />

            <div>
              <Title level={5}>Course Progress</Title>
              <Progress percent={courseToView.progress} status="active" />
            </div>
          </div>
        )}
      </Modal>

      {/* Content Editor Modal */}
      <Modal
        title="Course Content Editor"
        open={isContentEditorOpen}
        onCancel={() => setIsContentEditorOpen(false)}
        width={1000}
        footer={[
          <Button key="save" type="primary">
            Save Changes
          </Button>,
        ]}
      >
        <Tabs defaultActiveKey="modules">
          <TabPane tab="Modules" key="modules">
            <div className="space-y-4">
              <Button
                type="dashed"
                block
                icon={<PlusOutlined />}
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
                        <DeleteOutlined />
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
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Quizzes</span>
                          <Button size="small" type="dashed">
                            Add Quiz
                          </Button>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium">Assignments</span>
                          <Button size="small" type="dashed">
                            Add Assignment
                          </Button>
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
              <EyeOutlined style={{ fontSize: "64px", color: "#1890ff" }} />
              <Title level={4}>Course Preview</Title>
              <Text type="secondary">Preview how your course will look to students</Text>
            </div>
          </TabPane>
        </Tabs>
      </Modal>

      {/* Enrollment Management Modal */}
      <Modal
        title="Manage Course Enrollment"
        open={isEnrollmentModalOpen}
        onCancel={() => setIsEnrollmentModalOpen(false)}
        width={800}
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
                <span className="font-medium">Total Enrolled: {courseToEnroll?.enrollmentCount || 0}</span>
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
                      avatar={<Avatar icon={<UserOutlined />} />}
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

      {/* Bulk Actions Modal */}
      <Modal
        title="Bulk Actions"
        open={isBulkActionsModalOpen}
        onCancel={() => setIsBulkActionsModalOpen(false)}
        footer={null}
        width={500}
      >
        <div className="space-y-4">
          <div className="text-sm text-gray-600 mb-4">{selectedRowKeys.length} course(s) selected</div>

          <div className="space-y-2">
            <Button block icon={<CheckCircleOutlined />} onClick={() => handleBulkAction("publish")}>
              Publish Selected Courses
            </Button>
            <Button block icon={<IoArchiveOutline />} onClick={() => handleBulkAction("archive")}>
              Archive Selected Courses
            </Button>
            <Popconfirm
              title="Delete Courses"
              description="Are you sure you want to delete the selected courses? This action cannot be undone."
              onConfirm={() => handleBulkAction("delete")}
              okText="Delete"
              okType="danger"
            >
              <Button block danger icon={<DeleteOutlined />}>
                Delete Selected Courses
              </Button>
            </Popconfirm>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default CoursesManagement
