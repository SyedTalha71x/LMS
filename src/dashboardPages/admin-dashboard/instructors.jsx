import { useState, useMemo } from "react"
import {
  Table,
  Card,
  Button,
  Input,
  Select,
  Tag,
  Avatar,
  Dropdown,
  Row,
  Col,
  Statistic,
  Empty,
  Form,
  Modal,
  message,
  Drawer,
  Divider,
  Radio,
  Typography,
  Timeline,
  Tabs,
  Switch,
} from "antd"
import {
  Search,
  Filter,
  Plus,
  MoreVertical,
  Edit,
  Eye,
  Trash2,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  Key,
  Grid3X3,
  ListIcon,
  Download,
  UploadIcon,
  Power,
  UserCheck,
  ArrowLeft,
} from "lucide-react"

const { Option } = Select
const { TextArea } = Input
const { Text, Title } = Typography
const { TabPane } = Tabs

/* eslint-disable no-unused-vars */

const initialInstructors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@pharmacy.edu",
    phone: "+1 (555) 123-4567",
    employeeId: "INS001",
    address: "123 Medical Center Dr, Healthcare City, HC 12345",
    department: "Clinical Pharmacy",
    designation: "Department Head",
    status: "Active",
    enrollmentStatus: "Teaching",
    lastLogin: "2024-01-15T10:30:00Z",
    createdDate: "2023-06-15T00:00:00Z",
    notes: "Experienced department head with excellent leadership skills",
    groups: ["Senior Faculty", "Curriculum Committee"],
    pharmacy: "Central Pharmacy College",
    specialty: "Clinical Pharmacy",
    studentsCount: 45,
    coursesCount: 8,
    bio: "Dr. Sarah Johnson is a renowned clinical pharmacist with over 15 years of experience in pharmaceutical education and patient care.",
    qualifications: ["PharmD", "PhD in Clinical Pharmacy", "Board Certified Pharmacotherapy Specialist"],
    courses: [
      { id: 1, name: "Advanced Clinical Pharmacy", students: 25, status: "Active" },
      { id: 2, name: "Pharmacotherapy", students: 30, status: "Active" },
      { id: 3, name: "Patient Care Management", students: 20, status: "Active" },
    ],
    permissions: {
      canCreateCourses: true,
      canManageStudents: true,
      canAccessReports: true,
      canManageInstructors: true,
    },
    activityLog: [
      { date: "2024-01-15", action: "Logged in", details: "Accessed dashboard" },
      { date: "2024-01-14", action: "Course Updated", details: "Modified Advanced Clinical Pharmacy syllabus" },
      { date: "2024-01-13", action: "Student Graded", details: "Graded 15 assignments" },
    ],
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    email: "michael.chen@pharmacy.edu",
    phone: "+1 (555) 234-5678",
    employeeId: "INS002",
    address: "456 University Ave, Academic City, AC 67890",
    department: "Pharmaceutical Sciences",
    designation: "Senior Instructor",
    status: "Active",
    enrollmentStatus: "Teaching",
    lastLogin: "2024-01-14T14:20:00Z",
    createdDate: "2023-08-20T00:00:00Z",
    notes: "Research-focused instructor with strong publication record",
    groups: ["Research Committee", "Graduate Faculty"],
    pharmacy: "Metro Pharmacy Institute",
    specialty: "Pharmaceutical Sciences",
    studentsCount: 32,
    coursesCount: 5,
    bio: "Prof. Chen specializes in pharmaceutical research and drug development.",
    qualifications: ["PharmD", "PhD in Pharmaceutical Sciences"],
    courses: [
      { id: 4, name: "Medicinal Chemistry", students: 20, status: "Active" },
      { id: 5, name: "Drug Development", students: 12, status: "Active" },
    ],
    permissions: {
      canCreateCourses: true,
      canManageStudents: true,
      canAccessReports: false,
      canManageInstructors: false,
    },
    activityLog: [
      { date: "2024-01-14", action: "Published research paper", details: "New drug discovery methodology" },
      { date: "2024-01-13", action: "Conducted lab session", details: "Medicinal Chemistry lab" },
    ],
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    email: "emily.rodriguez@pharmacy.edu",
    phone: "+1 (555) 345-6789",
    employeeId: "INS003",
    address: "789 Research Blvd, Science Park, SP 13579",
    department: "Pharmacology",
    designation: "Instructor",
    status: "Pending",
    enrollmentStatus: "Pending",
    lastLogin: "Never",
    createdDate: "2023-09-10T00:00:00Z",
    notes: "New hire, pending orientation completion",
    groups: [],
    pharmacy: "Regional Pharmacy School",
    specialty: "Pharmacology",
    studentsCount: 0,
    coursesCount: 2,
    bio: "Dr. Rodriguez focuses on pharmacological research and toxicology studies.",
    qualifications: ["PharmD", "PhD in Pharmacology"],
    courses: [
      { id: 6, name: "Basic Pharmacology", students: 28, status: "Pending" },
      { id: 7, name: "Toxicology", students: 15, status: "Pending" },
    ],
    permissions: {
      canCreateCourses: false,
      canManageStudents: true,
      canAccessReports: false,
      canManageInstructors: false,
    },
    activityLog: [{ date: "2023-09-10", action: "Account created", details: "Initial setup completed" }],
  },
]

const departmentOptions = ["Clinical Pharmacy", "Pharmaceutical Sciences", "Pharmacology", "Pharmacy Administration"]
const roleOptions = ["Department Head", "Senior Instructor", "Instructor", "Assistant Instructor"]
const statusOptions = ["Active", "Inactive", "Pending", "Suspended"]
const enrollmentStatusOptions = ["Teaching", "Pending", "On Leave", "Retired"]
const pharmacyOptions = ["Central Pharmacy College", "Metro Pharmacy Institute", "Regional Pharmacy School"]

const InstructorsPage = () => {
  const [instructors, setInstructors] = useState(initialInstructors)
  const [showFilters, setShowFilters] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchScope, setSearchScope] = useState("all")
  const [selectedInstructors, setSelectedInstructors] = useState([])
  const [viewMode, setViewMode] = useState("table") // "table" or "card"
  const [filters, setFilters] = useState({
    designation: [],
    status: [],
    department: [],
    enrollmentStatus: [],
    pharmacy: [],
  })

  // Modal states
  const [isAddModalVisible, setIsAddModalVisible] = useState(false)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [isProfileDrawerVisible, setIsProfileDrawerVisible] = useState(false)
  const [isBulkImportVisible, setIsBulkImportVisible] = useState(false)
  const [isAuditLogVisible, setIsAuditLogVisible] = useState(false)
  const [isResetPasswordVisible, setIsResetPasswordVisible] = useState(false)
  const [isDeactivateVisible, setIsDeactivateVisible] = useState(false)
  const [isBulkActionVisible, setIsBulkActionVisible] = useState(false)
  const [bulkActionType, setBulkActionType] = useState("")
  const [currentInstructor, setCurrentInstructor] = useState(null)
  const [currentPage, setCurrentPage] = useState("list")

  // Form instances
  const [form] = Form.useForm()
  const [editForm] = Form.useForm()
  const [resetPasswordForm] = Form.useForm()

  const statistics = useMemo(() => {
    return {
      total: instructors.length,
      active: instructors.filter((i) => i.status === "Active").length,
      pending: instructors.filter((i) => i.status === "Pending").length,
      inactive: instructors.filter((i) => i.status === "Inactive").length,
    }
  }, [instructors])

  const filteredInstructors = useMemo(() => {
    return instructors.filter((instructor) => {
      // Search filter
      const searchFields = {
        all: [instructor.name, instructor.email, instructor.phone, instructor.department, instructor.pharmacy],
        name: [instructor.name],
        email: [instructor.email],
        phone: [instructor.phone],
        department: [instructor.department],
        pharmacy: [instructor.pharmacy],
      }

      const fieldsToSearch = searchFields[searchScope] || searchFields.all
      const matchesSearch =
        searchTerm === "" || fieldsToSearch.some((field) => field?.toLowerCase().includes(searchTerm.toLowerCase()))

      // Filter conditions
      const matchesDesignation =
        filters.designation.length === 0 || filters.designation.includes(instructor.designation)
      const matchesStatus = filters.status.length === 0 || filters.status.includes(instructor.status)
      const matchesDepartment = filters.department.length === 0 || filters.department.includes(instructor.department)
      const matchesEnrollmentStatus =
        filters.enrollmentStatus.length === 0 || filters.enrollmentStatus.includes(instructor.enrollmentStatus)
      const matchesPharmacy = filters.pharmacy.length === 0 || filters.pharmacy.includes(instructor.pharmacy)

      return (
        matchesSearch &&
        matchesDesignation &&
        matchesStatus &&
        matchesDepartment &&
        matchesEnrollmentStatus &&
        matchesPharmacy
      )
    })
  }, [instructors, searchTerm, searchScope, filters])

  const handleViewInstructor = (instructor) => {
    setCurrentInstructor(instructor)
    setIsProfileDrawerVisible(true)
  }

  const handleEditInstructor = (instructor) => {
    setCurrentInstructor(instructor)
    setIsEditModalVisible(true)
    editForm.setFieldsValue({
      name: instructor.name,
      email: instructor.email,
      phone: instructor.phone,
      employeeId: instructor.employeeId,
      address: instructor.address,
      department: instructor.department,
      designation: instructor.designation,
      status: instructor.status,
      enrollmentStatus: instructor.enrollmentStatus,
      pharmacy: instructor.pharmacy,
      bio: instructor.bio,
    })
  }

  const handleDeleteInstructor = (instructor) => {
    Modal.confirm({
      title: "Delete Instructor",
      content: (
        <div>
          <p>
            Are you sure you want to delete <strong>{instructor.name}</strong>?
          </p>
          <p className="text-red-600 mt-2">This action cannot be undone and will:</p>
          <ul className="list-disc list-inside mt-2 text-sm">
            <li>Permanently remove their account and profile</li>
            <li>Unassign them from {instructor.coursesCount} courses</li>
            <li>Affect {instructor.studentsCount} students</li>
            <li>Remove all their activity history</li>
          </ul>
        </div>
      ),
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        message.success(`Instructor ${instructor.name} deleted successfully`)
      },
    })
  }

  const handleBulkActionSelect = (actionType) => {
    if (selectedInstructors.length === 0) {
      message.warning("Please select instructors first")
      return
    }
    setBulkActionType(actionType)
    setIsBulkActionVisible(true)
  }

  const confirmBulkAction = () => {
    const selectedIds = selectedInstructors
    let updatedInstructors = [...instructors]

    switch (bulkActionType) {
      case "activate":
        updatedInstructors = updatedInstructors.map((instructor) =>
          selectedIds.includes(instructor.id) ? { ...instructor, status: "Active" } : instructor,
        )
        message.success(`${selectedIds.length} instructors activated successfully`)
        break
      case "deactivate":
        updatedInstructors = updatedInstructors.map((instructor) =>
          selectedIds.includes(instructor.id) ? { ...instructor, status: "Inactive" } : instructor,
        )
        message.success(`${selectedIds.length} instructors deactivated successfully`)
        break
      case "delete":
        updatedInstructors = updatedInstructors.filter((instructor) => !selectedIds.includes(instructor.id))
        message.success(`${selectedIds.length} instructors deleted successfully`)
        break
    }

    setInstructors(updatedInstructors)
    setSelectedInstructors([])
    setIsBulkActionVisible(false)
  }

  const handleResetPasswordConfirm = (instructor) => {
    setCurrentInstructor(instructor)
    setIsResetPasswordVisible(true)
  }

  const sendResetPasswordEmail = (values) => {
    // Simulate sending reset password email
    message.success(`Password reset email sent to ${currentInstructor.email}`)
    setIsResetPasswordVisible(false)
    resetPasswordForm.resetFields()
  }

  const handleDeactivateConfirm = (instructor) => {
    setCurrentInstructor(instructor)
    setIsDeactivateVisible(true)
  }

  const confirmDeactivate = () => {
    const updatedInstructors = instructors.map((instructor) =>
      instructor.id === currentInstructor.id ? { ...instructor, status: "Inactive" } : instructor,
    )
    setInstructors(updatedInstructors)
    message.success(`${currentInstructor.name} has been deactivated`)
    setIsDeactivateVisible(false)
  }

  const handleToggleStatus = (instructor) => {
    const newStatus = instructor.status === "Active" ? "Inactive" : "Active"
    Modal.confirm({
      title: `${newStatus === "Active" ? "Activate" : "Deactivate"} Instructor`,
      content: (
        <div>
          <p>
            Are you sure you want to {newStatus === "Active" ? "activate" : "deactivate"}{" "}
            <strong>{instructor.name}</strong>?
          </p>
          {newStatus === "Inactive" && (
            <div className="mt-2">
              <p className="text-orange-600">Deactivating will:</p>
              <ul className="list-disc list-inside text-sm">
                <li>Prevent them from logging into the system</li>
                <li>Remove access to assigned courses</li>
                <li>Hide them from student views</li>
              </ul>
            </div>
          )}
        </div>
      ),
      okText: newStatus === "Active" ? "Activate" : "Deactivate",
      okType: newStatus === "Active" ? "primary" : "danger",
      cancelText: "Cancel",
      onOk() {
        message.success(`Instructor ${instructor.name} ${newStatus.toLowerCase()} successfully`)
      },
    })
  }

  const handleLoginAsInstructor = (instructor) => {
    Modal.confirm({
      title: "Login as Instructor",
      content: (
        <div>
          <p>
            You will be logged in as <strong>{instructor.name}</strong> and redirected to their dashboard.
          </p>
          <p className="mt-2 text-yellow-600">This action will be logged for security purposes.</p>
        </div>
      ),
      okText: "Login as Instructor",
      cancelText: "Cancel",
      onOk() {
        message.success(`Logged in as ${instructor.name}`)
      },
    })
  }

  const handleBulkAction = (action) => {
    Modal.confirm({
      title: `Bulk ${action}`,
      content: `Are you sure you want to ${action} ${selectedInstructors.length} selected instructor(s)?`,
      onOk() {
        message.success(`Bulk ${action} completed successfully`)
        setSelectedInstructors([])
      },
    })
  }

  const handleAddInstructor = (values) => {
    console.log("Add instructor:", values)
    message.success("Instructor added successfully")
    setIsAddModalVisible(false)
    form.resetFields()
  }

  const handleUpdateInstructor = (values) => {
    console.log("Update instructor:", values)
    message.success("Instructor updated successfully")
    setIsEditModalVisible(false)
    setCurrentInstructor(null)
    editForm.resetFields()
  }

  const getActionItems = (instructor) => [
    {
      key: "view",
      label: (
        <span onClick={() => handleViewInstructor(instructor)}>
          <Eye className="h-4 w-4 mr-2 inline" />
          View Details
        </span>
      ),
    },
    {
      key: "edit",
      label: (
        <span onClick={() => handleEditInstructor(instructor)}>
          <Edit className="h-4 w-4 mr-2 inline" />
          Edit
        </span>
      ),
    },
    {
      key: "resetPassword",
      label: (
        <span onClick={() => handleResetPasswordConfirm(instructor)}>
          <Key className="h-4 w-4 mr-2 inline" />
          Reset Password
        </span>
      ),
    },
    {
      key: "toggleStatus",
      label: (
        <span onClick={() => handleToggleStatus(instructor)}>
          <Power className="h-4 w-4 mr-2 inline" />
          {instructor.status === "Active" ? "Deactivate" : "Activate"}
        </span>
      ),
    },
    {
      key: "loginAs",
      label: (
        <span onClick={() => handleLoginAsInstructor(instructor)}>
          <UserCheck className="h-4 w-4 mr-2 inline" />
          Login as Instructor
        </span>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "delete",
      label: (
        <span onClick={() => handleDeleteInstructor(instructor)} className="text-red-600">
          <Trash2 className="h-4 w-4 mr-2 inline" />
          Delete
        </span>
      ),
      danger: true,
    },
  ]

  const columns = [
    {
      title: "Instructor",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => (
        <div className="flex items-center min-w-0">
          {/* <Avatar size={32} className="mr-2 flex-shrink-0 bg-gray-200 text-gray-700">
            {record.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </Avatar> */}
          <div className="min-w-0 flex-1">
            <div className="font-medium text-gray-900 truncate text-sm">{text}</div>
            <div className="text-xs text-gray-500">ID: {record.employeeId}</div>
          </div>
        </div>
      ),
      width: 180,
      // fixed: "left",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      render: (email) => (
        <div className="max-w-[150px] truncate text-sm" title={email}>
          {email}
        </div>
      ),
      width: 160,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (phone) => <span className="text-sm">{phone || "N/A"}</span>,
      width: 120,
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      filters: departmentOptions.map((dept) => ({ text: dept, value: dept })),
      onFilter: (value, record) => record.department === value,
      render: (department) => <span className="text-sm">{department}</span>,
      width: 120,
    },
    {
      title: "Role",
      dataIndex: "designation",
      key: "designation",
      filters: roleOptions.map((role) => ({ text: role, value: role })),
      onFilter: (value, record) => record.designation === value,
      render: (designation) => {
        let color = "green"
        if (designation === "Department Head") color = "red"
        if (designation === "Senior Instructor") color = "blue"
        if (designation === "Instructor") color = "purple"
        return (
          <Tag color={color} className="text-xs">
            {designation}
          </Tag>
        )
      },
      width: 100,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: statusOptions.map((status) => ({ text: status, value: status })),
      onFilter: (value, record) => record.status === value,
      render: (status) => {
        let color = "green"
        if (status === "Inactive") color = "red"
        if (status === "Pending") color = "orange"
        if (status === "Suspended") color = "gray"
        return (
          <Tag color={color} className="text-xs">
            {status}
          </Tag>
        )
      },
      width: 100,
    },
    // {
    //   title: "Teaching Status",
    //   dataIndex: "enrollmentStatus",
    //   key: "enrollmentStatus",
    //   filters: enrollmentStatusOptions.map((status) => ({ text: status, value: status })),
    //   onFilter: (value, record) => record.enrollmentStatus === value,
    //   render: (enrollmentStatus) => {
    //     let color = "green"
    //     if (enrollmentStatus === "On Leave") color = "red"
    //     if (enrollmentStatus === "Pending") color = "orange"
    //     if (enrollmentStatus === "Retired") color = "blue"
    //     return (
    //       <Tag color={color} className="text-xs">
    //         {enrollmentStatus}
    //       </Tag>
    //     )
    //   },
    //   width: 110,
    // },
    {
      title: "Students",
      dataIndex: "studentsCount",
      key: "studentsCount",
      sorter: (a, b) => a.studentsCount - b.studentsCount,
      render: (count) => (
        <div className="flex items-center gap-1">
          <Users className="h-3 w-3 text-gray-500" />
          <span className="text-sm">{count}</span>
        </div>
      ),
      width: 80,
    },
    {
      title: "Last Login",
      dataIndex: "lastLogin",
      key: "lastLogin",
      sorter: (a, b) => new Date(a.lastLogin || 0) - new Date(b.lastLogin || 0),
      render: (lastLogin) => (
        <span className="text-xs">{lastLogin === "Never" ? "Never" : new Date(lastLogin).toLocaleDateString()}</span>
      ),
      width: 100,
    },
    {
      title: "Actions",
      key: "actions",
      width: 60,
      render: (_, record) => (
        <Dropdown menu={{ items: getActionItems(record) }} trigger={["click"]}>
          <Button type="text" size="small" icon={<MoreVertical className="h-4 w-4" />} />
        </Dropdown>
      ),
    },
  ]

  const rowSelection = {
    selectedRowKeys: selectedInstructors,
    onChange: (selectedRowKeys) => {
      setSelectedInstructors(selectedRowKeys)
    },
  }

  const AddInstructorPage = () => {
    return (
      <div className="p-3 min-h-screen">
        <div className="">
          <div className="mb-6">
            <Button icon={<ArrowLeft size={16} />} onClick={() => setCurrentPage("list")} className="mb-4">
              Back to Instructors
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Add New Instructor</h1>
            <p className="text-gray-600 mt-1">Create a new instructor account with all necessary details</p>
          </div>

          <Card>
            <Form form={form} layout="vertical" onFinish={handleAddInstructor}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    label="Full Name"
                    rules={[{ required: true, message: "Please enter full name" }]}
                  >
                    <Input placeholder="Enter full name" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: "Please enter email" },
                      { type: "email", message: "Please enter valid email" },
                    ]}
                  >
                    <Input placeholder="Enter email address" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="phone" label="Phone Number">
                    <Input placeholder="Enter phone number" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="employeeId" label="Employee ID">
                    <Input placeholder="Auto-generated if empty" />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="address" label="Address">
                <TextArea rows={2} placeholder="Enter full address" />
              </Form.Item>

              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    name="department"
                    label="Department"
                    rules={[{ required: true, message: "Please select department" }]}
                  >
                    <Select placeholder="Select department">
                      {departmentOptions.map((dept) => (
                        <Option key={dept} value={dept}>
                          {dept}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="designation"
                    label="Role"
                    rules={[{ required: true, message: "Please select role" }]}
                  >
                    <Select placeholder="Select role">
                      {roleOptions.map((role) => (
                        <Option key={role} value={role}>
                          {role}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="pharmacy"
                    label="Pharmacy"
                    rules={[{ required: true, message: "Please select pharmacy" }]}
                  >
                    <Select placeholder="Select pharmacy">
                      {pharmacyOptions.map((pharmacy) => (
                        <Option key={pharmacy} value={pharmacy}>
                          {pharmacy}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="status" label="Status" initialValue="Active">
                    <Select>
                      {statusOptions.map((status) => (
                        <Option key={status} value={status}>
                          {status}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="enrollmentStatus" label="Teaching Status" initialValue="Teaching">
                    <Select>
                      {enrollmentStatusOptions.map((status) => (
                        <Option key={status} value={status}>
                          {status}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="bio" label="Biography">
                <TextArea rows={3} placeholder="Enter instructor biography" />
              </Form.Item>

              <div className="flex justify-end gap-2">
                <Button onClick={() => setCurrentPage("list")}>Cancel</Button>
                <Button type="primary" htmlType="submit">
                  Add Instructor
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    )
  }


  if (currentPage === "add") {
    return <AddInstructorPage />
  }

  return (
    <div className="p-3">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Instructors</h1>
          </div>
          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            <Button
              type="primary"
              icon={<Plus size={16} />}
              onClick={() => setCurrentPage("add")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Add Instructor
            </Button>

            <Button icon={<FileText className="h-4 w-4" />} onClick={() => setIsAuditLogVisible(true)}>
              Audit Log
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <Row gutter={16} className="mb-6">
          <Col xs={12} sm={6}>
            <Card size="small">
              <Statistic title="Total Instructors" value={statistics.total} prefix={<Users className="h-4 w-4" />} />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card size="small">
              <Statistic
                title="Active"
                value={statistics.active}
                prefix={<CheckCircle className="h-4 w-4 text-green-500" />}
                valueStyle={{ color: "#52c41a" }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card size="small">
              <Statistic
                title="Pending"
                value={statistics.pending}
                prefix={<Clock className="h-4 w-4 text-orange-500" />}
                valueStyle={{ color: "#fa8c16" }}
              />
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card size="small">
              <Statistic
                title="Inactive"
                value={statistics.inactive}
                prefix={<AlertCircle className="h-4 w-4 text-red-500" />}
                valueStyle={{ color: "#ff4d4f" }}
              />
            </Card>
          </Col>
        </Row>
      </div>

      {<Card className="mb-4" size="small">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row gap-2 justify-between">
            <div className="flex-1 flex gap-2">
              <Select value={searchScope} onChange={setSearchScope} style={{ width: 120 }} size="small">
                <Option value="all">All Fields</Option>
                <Option value="name">Name</Option>
                <Option value="email">Email</Option>
                <Option value="phone">Phone</Option>
                <Option value="department">Department</Option>
                <Option value="pharmacy">Pharmacy</Option>
              </Select>
              <Input
                placeholder="Search instructors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                prefix={<Search className="h-4 w-4 text-gray-400" />}
                allowClear
                className="flex-1"
                size="small"
              />
            </div>
            <div className="flex gap-2">
              <Radio.Group
                value={viewMode}
                onChange={(e) => setViewMode(e.target.value)}
                size="small"
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
              <Button
                icon={<Filter className="h-4 w-4" />}
                onClick={() => setShowFilters(!showFilters)}
                size="small"
              >
                Filters
              </Button>
            </div>
          </div>

          {selectedInstructors.length > 0 && (
            <div className="flex justify-end items-center gap-2 p-3 bg-blue-50 rounded-lg">
              <Text strong>{selectedInstructors.length} selected</Text>
              <Divider type="vertical" />
              <Button size="small" onClick={() => handleBulkActionSelect("activate")}>
                Activate
              </Button>
              <Button size="small" onClick={() => handleBulkActionSelect("deactivate")}>
                Deactivate
              </Button>
              <Button size="small" danger onClick={() => handleBulkActionSelect("delete")}>
                Delete
              </Button>
              <Button size="small" onClick={() => setSelectedInstructors([])}>
                Clear Selection
              </Button>
            </div>
          )}

          {showFilters && <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            <Select
              mode="multiple"
              placeholder="Role"
              value={filters.designation}
              onChange={(value) => setFilters({ ...filters, designation: value })}
              style={{ width: "100%" }}
              size="small"
              allowClear
            >
              {roleOptions.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>

            <Select
              mode="multiple"
              placeholder="Status"
              value={filters.status}
              onChange={(value) => setFilters({ ...filters, status: value })}
              style={{ width: "100%" }}
              size="small"
              allowClear
            >
              {statusOptions.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>

            <Select
              mode="multiple"
              placeholder="Department"
              value={filters.department}
              onChange={(value) => setFilters({ ...filters, department: value })}
              style={{ width: "100%" }}
              size="small"
              allowClear
            >
              {departmentOptions.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>

            <Select
              mode="multiple"
              placeholder="Enrollment"
              value={filters.enrollmentStatus}
              onChange={(value) => setFilters({ ...filters, enrollmentStatus: value })}
              style={{ width: "100%" }}
              size="small"
              allowClear
            >
              {enrollmentStatusOptions.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>

            <Select
              mode="multiple"
              placeholder="Pharmacy"
              value={filters.pharmacy}
              onChange={(value) => setFilters({ ...filters, pharmacy: value })}
              style={{ width: "100%" }}
              size="small"
              allowClear
            >
              {pharmacyOptions.map((option) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </div>}
        </div>
      </Card>}

      <Card style={{ marginTop: 16 }}>
        {filteredInstructors.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <span>
                {searchTerm || Object.values(filters).some((f) => (Array.isArray(f) ? f.length > 0 : f))
                  ? "No instructors match your search criteria"
                  : "No instructors found"}
              </span>
            }
          />
        ) : (
          <div>
            {viewMode === "table" ? (
              <div className="overflow-x-auto">
                <Table
                  columns={columns}
                  dataSource={filteredInstructors}
                  rowKey="id"
                  pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} instructors`,
                  }}
                  rowSelection={rowSelection}
                  scroll={{ x: 1200 }}
                  size="small"
                />
              </div>
            ) : (
              <div></div>
            )}
          </div>
        )}
      </Card>

      <Modal
        title="Reset Password"
        open={isResetPasswordVisible}
        onCancel={() => setIsResetPasswordVisible(false)}
        footer={null}
        width={400}
      >
        <Form form={resetPasswordForm} layout="vertical" onFinish={sendResetPasswordEmail}>
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <Text>Send password reset email to:</Text>
            <br />
            <Text strong>{currentInstructor?.email}</Text>
          </div>

          <Form.Item name="message" label="Custom Message (Optional)">
            <TextArea rows={3} placeholder="Add a custom message to include in the reset email..." />
          </Form.Item>

          <div className="flex justify-end gap-2">
            <Button onClick={() => setIsResetPasswordVisible(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Send Reset Email
            </Button>
          </div>
        </Form>
      </Modal>

      <Modal
        title="Confirm Deactivation"
        open={isDeactivateVisible}
        onOk={confirmDeactivate}
        onCancel={() => setIsDeactivateVisible(false)}
        okText="Deactivate"
        okButtonProps={{ danger: true }}
      >
        <div className="py-4">
          <Text>Are you sure you want to deactivate this instructor?</Text>
          <div className="mt-3 p-3 bg-gray-50 rounded-lg">
            <Text strong>{currentInstructor?.name}</Text>
            <br />
            <Text type="secondary">{currentInstructor?.email}</Text>
          </div>
          <div className="mt-3">
            <Text type="warning">
              This action will prevent the instructor from accessing the system until reactivated.
            </Text>
          </div>
        </div>
      </Modal>

      <Modal
        title={`Confirm Bulk ${bulkActionType?.charAt(0).toUpperCase() + bulkActionType?.slice(1)}`}
        open={isBulkActionVisible}
        onOk={confirmBulkAction}
        onCancel={() => setIsBulkActionVisible(false)}
        okText={`${bulkActionType?.charAt(0).toUpperCase() + bulkActionType?.slice(1)} Selected`}
        okButtonProps={{ danger: bulkActionType === "delete" }}
      >
        <div className="py-4">
          <Text>
            Are you sure you want to {bulkActionType} {selectedInstructors.length} selected instructor(s)?
          </Text>
          {bulkActionType === "delete" && (
            <div className="mt-3 p-3 bg-red-50 rounded-lg">
              <Text type="danger">
                Warning: This action cannot be undone. All selected instructors will be permanently removed.
              </Text>
            </div>
          )}
        </div>
      </Modal>

      <Modal
        title="Audit Log"
        open={isAuditLogVisible}
        onCancel={() => setIsAuditLogVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsAuditLogVisible(false)}>
            Close
          </Button>,
        ]}
        width={800}
      >
        <div className="space-y-4">

          <Timeline
            items={[
              {
                color: "green",
                children: (
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <Text strong>Instructor Created</Text>
                        <br />
                        <Text type="secondary">John Doe created by Admin</Text>
                      </div>
                      <Text type="secondary" className="text-xs">
                        2 hours ago
                      </Text>
                    </div>
                  </div>
                ),
              },
              {
                color: "blue",
                children: (
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <Text strong>Profile Updated</Text>
                        <br />
                        <Text type="secondary">Jane Smith's department changed to Computer Science</Text>
                      </div>
                      <Text type="secondary" className="text-xs">
                        5 hours ago
                      </Text>
                    </div>
                  </div>
                ),
              },
              {
                color: "orange",
                children: (
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <Text strong>Password Reset</Text>
                        <br />
                        <Text type="secondary">Password reset email sent to mike.johnson@university.edu</Text>
                      </div>
                      <Text type="secondary" className="text-xs">
                        1 day ago
                      </Text>
                    </div>
                  </div>
                ),
              },
              {
                color: "red",
                children: (
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <Text strong>Instructor Deactivated</Text>
                        <br />
                        <Text type="secondary">Sarah Wilson deactivated by Manager</Text>
                      </div>
                      <Text type="secondary" className="text-xs">
                        2 days ago
                      </Text>
                    </div>
                  </div>
                ),
              },
              {
                color: "purple",
                children: (
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <Text strong>Bulk Import</Text>
                        <br />
                        <Text type="secondary">15 instructors imported from CSV file</Text>
                      </div>
                      <Text type="secondary" className="text-xs">
                        3 days ago
                      </Text>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </div>
      </Modal>

      {/* Profile Drawer */}
      <Drawer
        title="Instructor Profile"
        placement="right"
        onClose={() => {
          setIsProfileDrawerVisible(false)
          setCurrentInstructor(null)
        }}
        open={isProfileDrawerVisible}
        width={600}
      >
        {currentInstructor && (
          <div>
            <div className="text-center mb-6">
              <Avatar size={80} className="mb-4 bg-blue-500">
                {currentInstructor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Avatar>
              <h2 className="text-xl font-semibold">{currentInstructor.name}</h2>
              <p className="text-gray-600">{currentInstructor.email}</p>
              <div className="flex justify-center gap-2 mt-2">
                <Tag color={currentInstructor.status === "Active" ? "green" : "red"}>{currentInstructor.status}</Tag>
                <Tag color="blue">{currentInstructor.designation}</Tag>
              </div>
            </div>

            <Tabs defaultActiveKey="details">
              <TabPane tab="Details" key="details">
                <div className="space-y-4">
                  <div>
                    <label className="font-medium text-gray-700">Employee ID:</label>
                    <p>{currentInstructor.employeeId}</p>
                  </div>
                  <div>
                    <label className="font-medium text-gray-700">Phone:</label>
                    <p>{currentInstructor.phone || "N/A"}</p>
                  </div>
                  <div>
                    <label className="font-medium text-gray-700">Department:</label>
                    <p>{currentInstructor.department}</p>
                  </div>
                  <div>
                    <label className="font-medium text-gray-700">Pharmacy:</label>
                    <p>{currentInstructor.pharmacy}</p>
                  </div>
                  <div>
                    <label className="font-medium text-gray-700">Address:</label>
                    <p>{currentInstructor.address || "N/A"}</p>
                  </div>
                  <div>
                    <label className="font-medium text-gray-700">Teaching Status:</label>
                    <p>{currentInstructor.enrollmentStatus}</p>
                  </div>
                  <div>
                    <label className="font-medium text-gray-700">Last Login:</label>
                    <p>
                      {currentInstructor.lastLogin === "Never"
                        ? "Never"
                        : new Date(currentInstructor.lastLogin).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="font-medium text-gray-700">Created:</label>
                    <p>{new Date(currentInstructor.createdDate).toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="font-medium text-gray-700">Notes:</label>
                    <p>{currentInstructor.notes || "No notes available"}</p>
                  </div>
                </div>
              </TabPane>
              <TabPane tab="Courses" key="courses">
                <div>
                  <h4 className="font-medium mb-2">Assigned Courses:</h4>
                  {currentInstructor.courses && currentInstructor.courses.length > 0 ? (
                    <div className="space-y-2">
                      {currentInstructor.courses.map((course) => (
                        <div key={course.id} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-start">
                            <div>
                              <h5 className="font-medium">{course.name}</h5>
                              <p className="text-sm text-gray-600">{course.students} students</p>
                            </div>
                            <Tag color={course.status === "Active" ? "green" : "orange"} size="small">
                              {course.status}
                            </Tag>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No courses assigned</p>
                  )}
                </div>
              </TabPane>
              <TabPane tab="Permissions" key="permissions">
                <div>
                  <h4 className="font-medium mb-2">Role & Permissions:</h4>
                  <div className="space-y-3">
                    <div>
                      <Tag color="blue" className="mb-2">
                        {currentInstructor.designation}
                      </Tag>
                    </div>
                    {currentInstructor.permissions &&
                      Object.entries(currentInstructor.permissions).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-gray-700">
                            {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                          </span>
                          <Switch checked={value} disabled size="small" />
                        </div>
                      ))}
                  </div>
                </div>
              </TabPane>
              <TabPane tab="Activity" key="activity">
                <div>
                  <h4 className="font-medium mb-2">Recent Activity:</h4>
                  {currentInstructor.activityLog && currentInstructor.activityLog.length > 0 ? (
                    <Timeline size="small">
                      {currentInstructor.activityLog.map((activity, index) => (
                        <Timeline.Item key={index}>
                          <div className="text-sm">
                            <div className="font-medium">{activity.action}</div>
                            <div className="text-gray-500">{activity.details}</div>
                            <div className="text-xs text-gray-400 mt-1">{activity.date}</div>
                          </div>
                        </Timeline.Item>
                      ))}
                    </Timeline>
                  ) : (
                    <p className="text-gray-500">No recent activity</p>
                  )}
                </div>
              </TabPane>
            </Tabs>
          </div>
        )}
      </Drawer>

      {/* Edit Modal */}
      <Modal
        title="Edit Instructor"
        open={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false)
          setCurrentInstructor(null)
          editForm.resetFields()
        }}
        footer={null}
        width={800}
      >
        <Form form={editForm} layout="vertical" onFinish={handleUpdateInstructor} className="mt-4">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="name" label="Full Name" rules={[{ required: true, message: "Please enter full name" }]}>
                <Input placeholder="Enter full name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please enter email" },
                  { type: "email", message: "Please enter valid email" },
                ]}
              >
                <Input placeholder="Enter email address" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="phone" label="Phone Number">
                <Input placeholder="Enter phone number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="employeeId" label="Employee ID">
                <Input placeholder="Employee ID" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="address" label="Address">
            <TextArea rows={2} placeholder="Enter full address" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="department"
                label="Department"
                rules={[{ required: true, message: "Please select department" }]}
              >
                <Select placeholder="Select department">
                  {departmentOptions.map((dept) => (
                    <Option key={dept} value={dept}>
                      {dept}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="designation" label="Role" rules={[{ required: true, message: "Please select role" }]}>
                <Select placeholder="Select role">
                  {roleOptions.map((role) => (
                    <Option key={role} value={role}>
                      {role}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item name="status" label="Status" rules={[{ required: true, message: "Please select status" }]}>
                <Select placeholder="Select status">
                  {statusOptions.map((status) => (
                    <Option key={status} value={status}>
                      {status}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="pharmacy" label="Pharmacy">
                <Select placeholder="Select pharmacy">
                  {pharmacyOptions.map((pharmacy) => (
                    <Option key={pharmacy} value={pharmacy}>
                      {pharmacy}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="enrollmentStatus" label="Teaching Status">
                <Select placeholder="Select teaching status">
                  {enrollmentStatusOptions.map((status) => (
                    <Option key={status} value={status}>
                      {status}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="bio" label="Biography">
            <TextArea rows={3} placeholder="Enter instructor biography" />
          </Form.Item>

          <div className="flex justify-end gap-2 mt-6">
            <Button
              onClick={() => {
                setIsEditModalVisible(false)
                setCurrentInstructor(null)
                editForm.resetFields()
              }}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Update Instructor
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

export default InstructorsPage
