"use client"

/* eslint-disable no-unused-vars */
import { useState, useRef } from "react"
import {
  X,
  Menu,
  Edit,
  MoreVertical,
  Trash2,
  Plus,
  Filter,
  Download,
  Upload,
  Eye,
  Key,
  Power,
  UserCheck,
  Mail,
  Users,
} from "lucide-react"
import { Table, Button, Tag, Dropdown, Input, Select, Card, Avatar, Modal, message, Form } from "antd"

const { Search: AntSearch } = Input
const { Option } = Select
const { confirm } = Modal

const InstructorsPage = () => {
  const [selectedInstructor, setSelectedInstructor] = useState(null)
  const [showSidebar, setShowSidebar] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isBulkAddModalOpen, setIsBulkAddModalOpen] = useState(false)
  const [instructorToEdit, setInstructorToEdit] = useState(null)
  const [profileImage, setProfileImage] = useState(null)
  const [showConvertModal, setShowConvertModal] = useState(false)
  const [openDropdownId, setOpenDropdownId] = useState(null)

  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false)
  const [isLoginAsModalOpen, setIsLoginAsModalOpen] = useState(false)
  const [selectedInstructorForAction, setSelectedInstructorForAction] = useState(null)
  const [form] = Form.useForm()

  // Table and filtering states
  const [viewMode, setViewMode] = useState("table") // "table" or "card"
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedInstructors, setSelectedInstructors] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    role: "all",
    status: "all",
    pharmacy: "all",
    specialty: "all",
  })
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(12)
  const [showAuditLogs, setShowAuditLogs] = useState(false)

  const dropdownRef = useRef(null)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [tableLoading, setTableLoading] = useState(false)

  // Mock data with enhanced properties
  const instructors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@pharmacy.edu",
      phone: "+1 (555) 123-4567",
      role: "Department Head",
      pharmacy: "Central Pharmacy",
      specialty: "Clinical Pharmacy",
      status: "Active",
      lastLogin: "2024-01-15T10:30:00Z",
      createdDate: "2023-06-15T00:00:00Z",
      studentsCount: 45,
      coursesAssigned: ["Advanced Clinical Pharmacy", "Pharmacotherapy", "Patient Care"],
      bio: "Dr. Johnson has over 15 years of experience in clinical pharmacy practice and education.",
      permissions: ["Course Management", "Student Assessment", "Curriculum Development"],
      activityLog: [
        { action: "Updated course materials", date: "2024-01-15T09:00:00Z" },
        { action: "Graded assignments", date: "2024-01-14T16:30:00Z" },
      ],
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 2,
      name: "Prof. Michael Chen",
      email: "michael.chen@pharmacy.edu",
      phone: "+1 (555) 234-5678",
      role: "Senior Instructor",
      pharmacy: "North Branch",
      specialty: "Pharmaceutical Sciences",
      status: "Active",
      lastLogin: "2024-01-14T14:20:00Z",
      createdDate: "2023-08-20T00:00:00Z",
      studentsCount: 32,
      coursesAssigned: ["Medicinal Chemistry", "Drug Development"],
      bio: "Prof. Chen specializes in pharmaceutical research and drug development.",
      permissions: ["Course Management", "Research Supervision"],
      activityLog: [
        { action: "Published research paper", date: "2024-01-12T11:00:00Z" },
        { action: "Conducted lab session", date: "2024-01-11T13:45:00Z" },
      ],
      photo: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      email: "emily.rodriguez@pharmacy.edu",
      phone: "+1 (555) 345-6789",
      role: "Lead Instructor",
      pharmacy: "South Branch",
      specialty: "Pharmacology",
      status: "Inactive",
      lastLogin: "Never",
      createdDate: "2023-09-10T00:00:00Z",
      studentsCount: 28,
      coursesAssigned: ["Basic Pharmacology", "Toxicology"],
      bio: "Dr. Rodriguez focuses on pharmacological research and toxicology studies.",
      permissions: ["Course Management", "Student Mentoring"],
      activityLog: [{ action: "Account created", date: "2023-09-10T00:00:00Z" }],
      photo: "https://randomuser.me/api/portraits/women/25.jpg",
    },
  ]

  const [auditLogs, setAuditLogs] = useState([
    {
      id: 1,
      timestamp: "2024-01-15T10:30:00Z",
      action: "Instructor Sarah Johnson logged in",
      user: "System",
    },
  ])

  const pharmacyOptions = ["Central Pharmacy", "North Branch", "South Branch", "East Campus", "West Campus"]
  const roleOptions = ["Instructor", "Senior Instructor", "Lead Instructor", "Department Head"]
  const specialtyOptions = ["Clinical Pharmacy", "Pharmaceutical Sciences", "Pharmacology", "Pharmacy Administration"]
  const statusOptions = ["Active", "Inactive", "Pending", "Suspended"]

  // Filter instructors based on search and filters
  const filteredInstructors = instructors.filter((instructor) => {
    const matchesSearch =
      instructor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.pharmacy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      instructor.specialty.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = filters.role === "all" || instructor.role === filters.role
    const matchesStatus = filters.status === "all" || instructor.status === filters.status
    const matchesPharmacy = filters.pharmacy === "all" || instructor.pharmacy === filters.pharmacy
    const matchesSpecialty = filters.specialty === "all" || instructor.specialty === filters.specialty

    return matchesSearch && matchesRole && matchesStatus && matchesPharmacy && matchesSpecialty
  })

  const handleViewInstructor = (instructor) => {
    setSelectedInstructorForAction(instructor)
    setIsViewModalOpen(true)
  }

  const handleEditInstructor = (instructor) => {
    setInstructorToEdit(instructor)
    setSelectedInstructorForAction(instructor)
    setIsEditModalOpen(true)
    // Pre-fill form with instructor data
    form.setFieldsValue({
      firstName: instructor.name.split(" ")[0],
      lastName: instructor.name.split(" ").slice(1).join(" "),
      email: instructor.email,
      phone: instructor.phone,
      pharmacy: instructor.pharmacy,
      role: instructor.role,
      specialty: instructor.specialty,
      status: instructor.status,
      bio: instructor.bio,
    })
  }

  const handleResetPassword = (instructor) => {
    setSelectedInstructorForAction(instructor)
    setIsResetPasswordModalOpen(true)
  }

  const handleToggleStatus = (instructor) => {
    setSelectedInstructorForAction(instructor)
    setIsStatusModalOpen(true)
  }

  const handleDeleteInstructor = (instructor) => {
    setSelectedInstructorForAction(instructor)
    setIsDeleteModalOpen(true)
  }

  const handleLoginAsInstructor = (instructor) => {
    setSelectedInstructorForAction(instructor)
    setIsLoginAsModalOpen(true)
  }

  const confirmResetPassword = () => {
    message.success(`Password reset email sent to ${selectedInstructorForAction.email}`)
    addAuditLog(
      `Password reset for instructor ${selectedInstructorForAction.name} (ID: ${selectedInstructorForAction.id})`,
    )
    setIsResetPasswordModalOpen(false)
    setSelectedInstructorForAction(null)
  }

  const confirmToggleStatus = () => {
    const newStatus = selectedInstructorForAction.status === "Active" ? "Inactive" : "Active"
    message.success(`Instructor ${selectedInstructorForAction.name} ${newStatus.toLowerCase()} successfully`)
    addAuditLog(`Instructor ${selectedInstructorForAction.name} status changed to ${newStatus}`)
    setIsStatusModalOpen(false)
    setSelectedInstructorForAction(null)
  }

  const confirmDeleteInstructor = () => {
    message.success(`Instructor ${selectedInstructorForAction.name} deleted successfully`)
    addAuditLog(`Instructor ${selectedInstructorForAction.name} (ID: ${selectedInstructorForAction.id}) deleted`)
    setIsDeleteModalOpen(false)
    setSelectedInstructorForAction(null)
  }

  const confirmLoginAsInstructor = () => {
    message.success(`Logged in as ${selectedInstructorForAction.name}`)
    addAuditLog(
      `Admin logged in as instructor ${selectedInstructorForAction.name} (ID: ${selectedInstructorForAction.id})`,
    )
    setIsLoginAsModalOpen(false)
    setSelectedInstructorForAction(null)
  }

  const handleBulkAction = (action) => {
    Modal.confirm({
      title: `Bulk ${action}`,
      content: `Are you sure you want to ${action} ${selectedInstructors.length} selected instructor(s)?`,
      onOk() {
        message.success(`Bulk ${action} completed successfully`)
        setSelectedInstructors([])
        setSelectedRowKeys([])
      },
    })
  }

  const addAuditLog = (action) => {
    const newLog = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      action,
      user: "Admin User",
    }
    setAuditLogs((prev) => [newLog, ...prev])
  }

  const openModal = (instructor) => {
    setSelectedInstructor(instructor)
  }

  const openAddModal = () => {
    setIsAddModalOpen(true)
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false)
    setInstructorToEdit(null)
    setSelectedInstructorForAction(null)
    form.resetFields()
  }

  const exportToCSV = () => {
    message.success("Instructors data exported successfully")
  }

  // Row selection for table
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys)
      setSelectedInstructors(selectedRowKeys)
    },
  }

  const getActionItems = (instructor) => [
    {
      key: "view",
      label: (
        <span onClick={() => handleViewInstructor(instructor)}>
          <Eye className="h-4 w-4 mr-2 inline" />
          View Profile
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
        <span onClick={() => handleResetPassword(instructor)}>
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

  // Table columns
  const columns = [
    {
      title: "Instructor",
      dataIndex: "name",
      key: "name",
      width: 250,
      render: (text, record) => (
        <div className="flex items-center gap-2 min-w-0">
          <Avatar size={32} src={record.photo} className="bg-gray-200 text-gray-700 flex-shrink-0">
            {text
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="font-medium text-sm truncate">{text}</div>
            <div className="text-xs text-gray-500 truncate">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: 120,
      responsive: ["md"],
      render: (role) => (
        <Tag
          size="small"
          color={
            role === "Department Head"
              ? "red"
              : role === "Senior Instructor"
                ? "purple"
                : role === "Lead Instructor"
                  ? "orange"
                  : "blue"
          }
        >
          {role}
        </Tag>
      ),
    },
    {
      title: "Pharmacy",
      dataIndex: "pharmacy",
      key: "pharmacy",
      width: 120,
      // responsive: ["lg"],
    },
    {
      title: "Specialty",
      dataIndex: "specialty",
      key: "specialty",
      width: 140,
      // responsive: ["lg"],
    },
    {
      title: "Students",
      dataIndex: "studentsCount",
      key: "studentsCount",
      width: 80,
      // responsive: ["md"],
      render: (count) => (
        <div className="flex items-center gap-1">
          <Users className="h-3 w-3 text-gray-500" />
          <span className="text-sm">{count}</span>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 80,
      render: (status) => (
        <Tag
          size="small"
          color={
            status === "Active" ? "green" : status === "Inactive" ? "red" : status === "Pending" ? "orange" : "blue"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Last Login",
      dataIndex: "lastLogin",
      key: "lastLogin",
      width: 100,
      // responsive: ["md"],
      render: (lastLogin) => (
        <span className="text-xs">{lastLogin === "Never" ? "Never" : new Date(lastLogin).toLocaleDateString()}</span>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 60,
      // fixed: "right",
      render: (_, record) => (
        <Dropdown menu={{ items: getActionItems(record) }} trigger={["click"]}>
          <Button type="text" size="small" icon={<MoreVertical className="h-4 w-4" />} />
        </Dropdown>
      ),
    },
  ]

  return (
    <div className="flex rounded-3xl text-black min-h-screen bg-gray-50 overflow-hidden">
      <div className="flex-1 min-w-0">
        <div className="w-full mx-auto p-3 sm:p-4 md:p-6 max-w-full">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex items-center justify-between w-full sm:w-auto">
              <h1 className="text-lg sm:text-xl md:text-2xl poppins-thin_600 truncate">Manage Instructors</h1>
              <button
                className="sm:hidden p-2 bg-white border border-gray-200 rounded-lg flex-shrink-0"
                onClick={() => setShowSidebar(!showSidebar)}
              >
                <Menu className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 flex-shrink-0">
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
          </div>

          {/* Search and Actions */}
          <div className="flex flex-col gap-3 mb-4">
            <div className="w-full">
              <AntSearch
                placeholder="Search instructors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: "100%" }}
                size="middle"
              />
            </div>

            <div className="flex items-center justify-end gap-2 overflow-x-auto pb-1">
              <Button
                icon={<Filter size={16} />}
                onClick={() => setShowFilters(!showFilters)}
                size="middle"
                className="flex-shrink-0"
              >
                <span className="hidden sm:inline">Filters</span>
              </Button>

              <Button
                icon={<Plus size={16} />}
                onClick={openAddModal}
                type="primary"
                size="middle"
                className="flex-shrink-0"
              >
                <span className="hidden sm:inline">Add</span>
              </Button>

              <Button
                icon={<Download size={16} />}
                onClick={exportToCSV}
                type="primary"
                ghost
                size="middle"
                className="flex-shrink-0"
              >
                <span className="hidden sm:inline">Export</span>
              </Button>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <Card className="mb-4" size="small">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <Select
                    value={filters.role}
                    onChange={(value) => setFilters((prev) => ({ ...prev, role: value }))}
                    style={{ width: "100%" }}
                    size="small"
                  >
                    <Option value="all">All Roles</Option>
                    {roleOptions.map((role) => (
                      <Option key={role} value={role}>
                        {role}
                      </Option>
                    ))}
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <Select
                    value={filters.status}
                    onChange={(value) => setFilters((prev) => ({ ...prev, status: value }))}
                    style={{ width: "100%" }}
                    size="small"
                  >
                    <Option value="all">All Status</Option>
                    {statusOptions.map((status) => (
                      <Option key={status} value={status}>
                        {status}
                      </Option>
                    ))}
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pharmacy</label>
                  <Select
                    value={filters.pharmacy}
                    onChange={(value) => setFilters((prev) => ({ ...prev, pharmacy: value }))}
                    style={{ width: "100%" }}
                    size="small"
                  >
                    <Option value="all">All Pharmacies</Option>
                    {pharmacyOptions.map((pharmacy) => (
                      <Option key={pharmacy} value={pharmacy}>
                        {pharmacy}
                      </Option>
                    ))}
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
                  <Select
                    value={filters.specialty}
                    onChange={(value) => setFilters((prev) => ({ ...prev, specialty: value }))}
                    style={{ width: "100%" }}
                    size="small"
                  >
                    <Option value="all">All Specialties</Option>
                    {specialtyOptions.map((specialty) => (
                      <Option key={specialty} value={specialty}>
                        {specialty}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <Button
                  onClick={() => setFilters({ role: "all", status: "all", pharmacy: "all", specialty: "all" })}
                  type="link"
                  size="small"
                >
                  Clear Filters
                </Button>
              </div>
            </Card>
          )}

          {/* Bulk Actions */}
          {selectedInstructors.length > 0 && (
            <Card className="mb-4 bg-blue-50 border-blue-200" size="small">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
                <span className="text-sm text-blue-700">{selectedInstructors.length} instructor(s) selected</span>
                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                  <Button
                    onClick={() => handleBulkAction("activate")}
                    icon={<Power size={14} />}
                    size="small"
                    type="primary"
                    ghost
                  >
                    <span className="hidden xs:inline">Activate</span>
                  </Button>
                  <Button
                    onClick={() => handleBulkAction("deactivate")}
                    icon={<Power size={14} />}
                    size="small"
                    style={{ borderColor: "#f97316", color: "#f97316" }}
                    ghost
                  >
                    <span className="hidden xs:inline">Deactivate</span>
                  </Button>
                  <Button
                    onClick={() => handleBulkAction("email")}
                    icon={<Mail size={14} />}
                    size="small"
                    type="primary"
                    ghost
                  >
                    <span className="hidden xs:inline">Email</span>
                  </Button>
                  <Button
                    onClick={() => handleBulkAction("delete")}
                    icon={<Trash2 size={14} />}
                    size="small"
                    danger
                    ghost
                  >
                    <span className="hidden xs:inline">Delete</span>
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Table View */}
          {viewMode === "table" && (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <Table
                  columns={columns}
                  dataSource={instructors}
                  rowKey="id"
                  pagination={{
                    total: instructors.length,
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} instructors`,
                    simple: window.innerWidth < 768,
                    size: "small",
                  }}
                  scroll={{ x: "max-content" }}
                  rowSelection={{
                    selectedRowKeys: selectedInstructors,
                    onChange: setSelectedInstructors,
                  }}
                  size="small"
                />
              </div>
            </div>
          )}

          {/* Card View */}
          {viewMode === "card" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {instructors.map((instructor) => (
                <Card
                  key={instructor.id}
                  className="hover:shadow-md transition-shadow"
                  actions={[
                    <div key="actions" className="flex justify-center items-center gap-3 text-gray-600 px-2">
                      <Eye
                        onClick={() => handleViewInstructor(instructor)}
                        className="cursor-pointer hover:text-blue-500"
                        size={18}
                      />
                      <Edit
                        onClick={() => handleEditInstructor(instructor)}
                        className="cursor-pointer hover:text-green-500"
                        size={18}
                      />
                      <Dropdown menu={{ items: getActionItems(instructor) }} trigger={["click"]} placement="topRight">
                        <MoreVertical className="cursor-pointer hover:text-gray-800" size={18} />
                      </Dropdown>
                    </div>,
                  ]}
                >
                  <Card.Meta
                    avatar={
                      <Avatar size={50} src={instructor.photo}>
                        {instructor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </Avatar>
                    }
                    title={<div className="truncate">{instructor.name}</div>}
                    description={
                      <div className="space-y-2">
                        <div className="text-sm text-gray-600 truncate">{instructor.email}</div>
                        <div className="flex flex-wrap gap-1">
                          <Tag
                            size="small"
                            color={
                              instructor.role === "Department Head"
                                ? "red"
                                : instructor.role === "Senior Instructor"
                                  ? "purple"
                                  : "blue"
                            }
                          >
                            {instructor.role}
                          </Tag>
                          <Tag size="small" color={instructor.status === "Active" ? "green" : "red"}>
                            {instructor.status}
                          </Tag>
                        </div>
                        <div className="text-sm">
                          <div className="truncate">{instructor.pharmacy}</div>
                          <div className="truncate">{instructor.specialty}</div>
                          <div className="flex items-center gap-1 mt-1">
                            <Users className="h-3 w-3" />
                            <span>{instructor.studentsCount} students</span>
                          </div>
                        </div>
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
        title={
          <div className="flex items-center gap-3">
            <Avatar size={40} src={selectedInstructorForAction?.photo}>
              {selectedInstructorForAction?.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="font-semibold truncate">{selectedInstructorForAction?.name}</div>
              <div className="text-sm text-gray-500 truncate">{selectedInstructorForAction?.role}</div>
            </div>
          </div>
        }
        open={isViewModalOpen}
        onCancel={() => {
          setIsViewModalOpen(false)
          setSelectedInstructorForAction(null)
        }}
        footer={[
          <Button
            key="edit"
            type="primary"
            onClick={() => {
              setIsViewModalOpen(false)
              handleEditInstructor(selectedInstructorForAction)
            }}
          >
            Edit Instructor
          </Button>,
          <Button
            key="close"
            onClick={() => {
              setIsViewModalOpen(false)
              setSelectedInstructorForAction(null)
            }}
          >
            Close
          </Button>,
        ]}
        width="95%"
        style={{ maxWidth: 800, top: 20 }}
      >
        {selectedInstructorForAction && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Contact Information</h4>
                <div className="space-y-2">
                  <div className="break-words">
                    <strong>Email:</strong> {selectedInstructorForAction.email}
                  </div>
                  <div>
                    <strong>Phone:</strong> {selectedInstructorForAction.phone}
                  </div>
                  <div>
                    <strong>Status:</strong>
                    <Tag color={selectedInstructorForAction.status === "Active" ? "green" : "red"} className="ml-2">
                      {selectedInstructorForAction.status}
                    </Tag>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Professional Details</h4>
                <div className="space-y-2">
                  <div className="break-words">
                    <strong>Pharmacy:</strong> {selectedInstructorForAction.pharmacy}
                  </div>
                  <div className="break-words">
                    <strong>Specialty:</strong> {selectedInstructorForAction.specialty}
                  </div>
                  <div>
                    <strong>Students:</strong> {selectedInstructorForAction.studentsCount}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Bio</h4>
              <p className="text-gray-700 break-words">{selectedInstructorForAction.bio}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-3">
                Courses Assigned ({selectedInstructorForAction.coursesAssigned?.length || 0})
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedInstructorForAction.coursesAssigned?.map((course, index) => (
                  <Tag key={index} color="blue">
                    {course}
                  </Tag>
                )) || <span className="text-gray-500">No courses assigned</span>}
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        title="Reset Password"
        open={isResetPasswordModalOpen}
        onOk={confirmResetPassword}
        onCancel={() => {
          setIsResetPasswordModalOpen(false)
          setSelectedInstructorForAction(null)
        }}
        okText="Send Reset Email"
        cancelText="Cancel"
        okType="primary"
        width="95%"
        style={{ maxWidth: 500, top: 20 }}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
            <Avatar src={selectedInstructorForAction?.photo}>
              {selectedInstructorForAction?.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="font-semibold truncate">{selectedInstructorForAction?.name}</div>
              <div className="text-sm text-gray-600 truncate">{selectedInstructorForAction?.email}</div>
            </div>
          </div>
          <div className="text-gray-700">
            <p>
              A password reset email will be sent to{" "}
              <strong className="break-words">{selectedInstructorForAction?.email}</strong>.
            </p>
            <p className="mt-2">The instructor will receive instructions to create a new password.</p>
          </div>
        </div>
      </Modal>

      <Modal
        title={`${selectedInstructorForAction?.status === "Active" ? "Deactivate" : "Activate"} Instructor`}
        open={isStatusModalOpen}
        onOk={confirmToggleStatus}
        onCancel={() => {
          setIsStatusModalOpen(false)
          setSelectedInstructorForAction(null)
        }}
        okText={selectedInstructorForAction?.status === "Active" ? "Deactivate" : "Activate"}
        cancelText="Cancel"
        okType={selectedInstructorForAction?.status === "Active" ? "danger" : "primary"}
        width="95%"
        style={{ maxWidth: 600, top: 20 }}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <Avatar src={selectedInstructorForAction?.photo}>
              {selectedInstructorForAction?.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="font-semibold truncate">{selectedInstructorForAction?.name}</div>
              <div className="text-sm text-gray-600 truncate">{selectedInstructorForAction?.role}</div>
              <Tag color={selectedInstructorForAction?.status === "Active" ? "green" : "red"}>
                Current: {selectedInstructorForAction?.status}
              </Tag>
            </div>
          </div>
          <div className="text-gray-700">
            {selectedInstructorForAction?.status === "Active" ? (
              <div>
                <p>Deactivating this instructor will:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                  <li>Prevent them from logging into the system</li>
                  <li>Remove access to assigned courses</li>
                  <li>Hide them from student views</li>
                  <li>Maintain their data for future reactivation</li>
                </ul>
              </div>
            ) : (
              <div>
                <p>Activating this instructor will:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                  <li>Restore their system access</li>
                  <li>Re-enable course assignments</li>
                  <li>Make them visible to students</li>
                  <li>Send them a notification email</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </Modal>

      <Modal
        title="Delete Instructor"
        open={isDeleteModalOpen}
        onOk={confirmDeleteInstructor}
        onCancel={() => {
          setIsDeleteModalOpen(false)
          setSelectedInstructorForAction(null)
        }}
        okText="Delete Instructor"
        cancelText="Cancel"
        okType="danger"
        width="95%"
        style={{ maxWidth: 600, top: 20 }}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg border border-red-200">
            <Avatar src={selectedInstructorForAction?.photo}>
              {selectedInstructorForAction?.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="font-semibold truncate">{selectedInstructorForAction?.name}</div>
              <div className="text-sm text-gray-600 truncate">{selectedInstructorForAction?.email}</div>
              <div className="text-sm text-gray-600 truncate">{selectedInstructorForAction?.role}</div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <div className="text-yellow-600 font-semibold">⚠️ Warning</div>
            </div>
            <p className="text-yellow-800 mt-1">This action cannot be undone!</p>
          </div>

          <div className="text-gray-700">
            <p className="font-semibold mb-2">Deleting this instructor will:</p>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Permanently remove their account and profile</li>
              <li>
                Unassign them from <strong>{selectedInstructorForAction?.coursesAssigned?.length || 0}</strong> courses
              </li>
              <li>
                Affect <strong>{selectedInstructorForAction?.studentsCount || 0}</strong> students
              </li>
              <li>Remove all their activity history</li>
              <li>Delete associated files and documents</li>
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              <strong>Alternative:</strong> Consider deactivating the instructor instead to preserve data while removing
              access.
            </p>
          </div>
        </div>
      </Modal>

      <Modal
        title="Login as Instructor"
        open={isLoginAsModalOpen}
        onOk={confirmLoginAsInstructor}
        onCancel={() => {
          setIsLoginAsModalOpen(false)
          setSelectedInstructorForAction(null)
        }}
        okText="Login as Instructor"
        cancelText="Cancel"
        okType="primary"
        width="95%"
        style={{ maxWidth: 600, top: 20 }}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
            <Avatar src={selectedInstructorForAction?.photo}>
              {selectedInstructorForAction?.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="font-semibold truncate">{selectedInstructorForAction?.name}</div>
              <div className="text-sm text-gray-600 truncate">{selectedInstructorForAction?.email}</div>
              <div className="text-sm text-gray-600 truncate">{selectedInstructorForAction?.role}</div>
            </div>
          </div>

          <div className="text-gray-700">
            <p>You will be logged in as this instructor and will have access to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
              <li>Their dashboard and course materials</li>
              <li>Student interactions and grades</li>
              <li>All instructor-level permissions</li>
              <li>Their personal settings and preferences</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="text-yellow-800 text-sm">
              <strong>Note:</strong> This action will be logged for security purposes. You can return to admin view at
              any time.
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        title="Edit Instructor"
        open={isEditModalOpen}
        onCancel={closeEditModal}
        footer={[
          <Button key="cancel" onClick={closeEditModal}>
            Cancel
          </Button>,
          <Button
            key="save"
            type="primary"
            onClick={() => {
              message.success(`Instructor ${selectedInstructorForAction?.name} updated successfully`)
              addAuditLog(`Instructor ${selectedInstructorForAction?.name} details updated`)
              closeEditModal()
            }}
          >
            Save Changes
          </Button>,
        ]}
        width="95%"
        style={{ maxWidth: 800, top: 20 }}
      >
        <Form form={form} layout="vertical" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item label="First Name" name="firstName" rules={[{ required: true }]}>
              <Input placeholder="First name" />
            </Form.Item>
            <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
              <Input placeholder="Last name" />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
              <Input placeholder="Email address" />
            </Form.Item>
            <Form.Item label="Phone" name="phone">
              <Input placeholder="Phone number" />
            </Form.Item>
            <Form.Item label="Pharmacy" name="pharmacy" rules={[{ required: true }]}>
              <Select placeholder="Select Pharmacy">
                <Option value="Central Pharmacy">Central Pharmacy</Option>
                <Option value="North Branch">North Branch</Option>
                <Option value="South Branch">South Branch</Option>
                <Option value="East Branch">East Branch</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Role" name="role" rules={[{ required: true }]}>
              <Select placeholder="Select Role">
                <Option value="Instructor">Instructor</Option>
                <Option value="Senior Instructor">Senior Instructor</Option>
                <Option value="Lead Instructor">Lead Instructor</Option>
                <Option value="Department Head">Department Head</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Specialty" name="specialty">
              <Select placeholder="Select Specialty">
                <Option value="Clinical Pharmacy">Clinical Pharmacy</Option>
                <Option value="Pharmaceutical Sciences">Pharmaceutical Sciences</Option>
                <Option value="Pharmacology">Pharmacology</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Status" name="status" rules={[{ required: true }]}>
              <Select placeholder="Select Status">
                <Option value="Active">Active</Option>
                <Option value="Inactive">Inactive</Option>
                <Option value="Pending">Pending</Option>
              </Select>
            </Form.Item>
          </div>
          <Form.Item label="Bio" name="bio">
            <Input.TextArea rows={4} placeholder="Brief bio and background" />
          </Form.Item>
        </Form>
      </Modal>

      {/* Add Instructor Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
            <div className="p-3 sm:p-6">
              <div className="flex justify-between items-center mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold">Add New Instructor</h2>
                <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600 p-1">
                  <X className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </div>

              <div className="mb-4 sm:mb-6">
                <div className="flex gap-2 sm:gap-4 mb-4 overflow-x-auto">
                  <button
                    onClick={() => setShowConvertModal(false)}
                    className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap ${!showConvertModal ? "bg-blue-100 text-blue-700" : "bg-gray-100"}`}
                  >
                    Create New Instructor
                  </button>
                  <button
                    onClick={() => setShowConvertModal(true)}
                    className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap ${showConvertModal ? "bg-blue-100 text-blue-700" : "bg-gray-100"}`}
                  >
                    Convert Existing User
                  </button>
                </div>
              </div>

              {!showConvertModal ? (
                /* Create New Instructor Form */
                <form className="space-y-4">
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                      <img
                        src="https://randomuser.me/api/portraits/women/44.jpg"
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      className="bg-[#1E1E1F] text-white px-3 sm:px-4 py-2 cursor-pointer rounded-lg text-xs sm:text-sm flex items-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      Upload Picture
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <input
                        type="text"
                        placeholder="First name"
                        className="w-full px-3 py-2 rounded-xl bg-[#F1F1F1] text-sm outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <input
                        type="text"
                        placeholder="Last name"
                        className="w-full px-3 py-2 rounded-xl bg-[#F1F1F1] text-sm outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        placeholder="Email address"
                        className="w-full px-3 py-2 rounded-xl bg-[#F1F1F1] text-sm outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="Phone number"
                        className="w-full px-3 py-2 rounded-xl bg-[#F1F1F1] text-sm outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pharmacy</label>
                      <select className="w-full px-3 py-2 rounded-xl bg-[#F1F1F1] text-sm outline-none">
                        <option value="">Select Pharmacy</option>
                        {pharmacyOptions.map((pharmacy) => (
                          <option key={pharmacy} value={pharmacy}>
                            {pharmacy}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                      <select className="w-full px-3 py-2 rounded-xl bg-[#F1F1F1] text-sm outline-none">
                        <option value="">Select Role</option>
                        {roleOptions.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Specialty</label>
                      <select className="w-full px-3 py-2 rounded-xl bg-[#F1F1F1] text-sm outline-none">
                        <option value="">Select Specialty</option>
                        {specialtyOptions.map((specialty) => (
                          <option key={specialty} value={specialty}>
                            {specialty}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select className="w-full px-3 py-2 rounded-xl bg-[#F1F1F1] text-sm outline-none">
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                      placeholder="Brief bio and background"
                      rows={3}
                      className="w-full px-3 py-2 rounded-xl bg-[#F1F1F1] text-sm outline-none resize-none"
                    />
                  </div>

                  <div className="flex justify-center items-center">
                    <button
                      type="submit"
                      className="bg-[#0B5D3A] text-white py-2 px-4 sm:px-6 rounded-xl text-sm w-full sm:w-auto font-semibold mt-4 sm:mt-6"
                    >
                      Create Instructor
                    </button>
                  </div>
                </form>
              ) : (
                /* Convert Existing User */
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Search Existing Users</label>
                    <input
                      type="text"
                      placeholder="Search by name or email..."
                      className="w-full px-3 py-2 rounded-xl bg-[#F1F1F1] text-sm outline-none"
                    />
                  </div>

                  <div className="max-h-60 overflow-y-auto border rounded-lg">
                    {/* Mock existing users list */}
                    {[
                      { id: 1, name: "John Smith", email: "john.smith@example.com", role: "Student" },
                      { id: 2, name: "Jane Doe", email: "jane.doe@example.com", role: "Student" },
                      { id: 3, name: "Mike Johnson", email: "mike.johnson@example.com", role: "Student" },
                    ].map((user) => (
                      <div
                        key={user.id}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border-b hover:bg-gray-50 gap-2 sm:gap-0"
                      >
                        <div className="flex-1 min-w-0 w-full sm:w-auto">
                          <div className="font-medium truncate">{user.name}</div>
                          <div className="text-sm text-gray-500 truncate">{user.email}</div>
                          <Tag size="small" color="blue" className="mt-1">
                            {user.role}
                          </Tag>
                        </div>
                        <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm flex-shrink-0 w-full sm:w-auto">
                          Convert
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="text-sm text-gray-600">
                    Select a user to convert them to an instructor. They will retain their existing account but gain
                    instructor permissions.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InstructorsPage
