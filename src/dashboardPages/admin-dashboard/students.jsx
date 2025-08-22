"use client"

/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react"
import {
  X,
  Menu,
  Edit,
  MoreVertical,
  Trash2,
  Filter,
  Download,
  Eye,
  Key,
  Power,
  UserCheck,
  ChevronDown,
  ChevronUp,
  Mail,
  Settings,
} from "lucide-react"
import UserManagementModal from "../../components/admin-dashboard/students-components/user-management-modal"
import AddStudentModal from "../../components/admin-dashboard/students-components/add-student-modal"
import BulkAddModal from "../../components/admin-dashboard/students-components/bulk-add-modal"
import AuditLogsModal from "../../components/admin-dashboard/students-components/audit-logs"
import StudentDetailModal from "../../components/admin-dashboard/students-components/student-detail-modal"
import { Table, Button, Tag, Dropdown, Input, Select, Checkbox, Pagination, Card, Avatar, message, Modal } from "antd"
const { Search: AntSearch } = Input
const { Option } = Select
const { confirm } = Modal

const Students = () => {
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [showSidebar, setShowSidebar] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isBulkAddModalOpen, setIsBulkAddModalOpen] = useState(false)
  const [studentToEdit, setStudentToEdit] = useState(null)
  const [profileImage, setProfileImage] = useState(null)
  const [customFields, setCustomFields] = useState([])
  const [showCustomPrompt, setShowCustomPrompt] = useState(false)
  const [customFieldName, setCustomFieldName] = useState("")
  const [customFieldValue, setCustomFieldValue] = useState("")
  const [openDropdownId, setOpenDropdownId] = useState(null)

  const [isResetPasswordModalOpen, setIsResetPasswordModalOpen] = useState(false)
  const [isActivateModalOpen, setIsActivateModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedStudentForAction, setSelectedStudentForAction] = useState(null)

  const [showUserManageModal, setshowUserManageModal] = useState(false)

  const [studentForAction, setStudentForAction] = useState(null)

  // Table and filtering states
  const [viewMode, setViewMode] = useState("table") // "table" or "card"
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudents, setSelectedStudents] = useState([])
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    role: "all",
    status: "all",
    dateRange: "all",
    group: "all",
  })
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("asc")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [showAuditLogs, setShowAuditLogs] = useState(false)
  const [auditLogs, setAuditLogs] = useState([])

  const dropdownRef = useRef(null)

  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [tableLoading, setTableLoading] = useState(false)

  const roleOptions = ["Student", "Admin", "Instructor", "Janitor", "Pharmacist", "Technician", "IT"]
  const statusOptions = ["Active", "Inactive", "Pending", "Suspended"]
  const groupOptions = ["Group A", "Group B", "Group C", "Advanced", "Beginner"]

  const [selectedRole, setSelectedRole] = useState("Student")
  const [selectedStatus, setSelectedStatus] = useState("Active")
  const [selectedGroup, setSelectedGroup] = useState("")

  // Mock students data with extended fields
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      age: 22,
      gender: "Male",
      designation: "Student",
      status: "Active",
      lastLogin: "2025-08-15",
      createdDate: "2025-01-15",
      group: "Group A",
      courses: ["React Basics", "JavaScript Advanced"],
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      achievements: [
        { name: "Quick Learner", icon: null },
        { name: "Team Player", icon: null },
      ],
      certificates: [
        { name: "React Certificate", icon: null },
        { name: "JavaScript Pro", icon: null },
      ],
      progress: {
        groupActivity: 85,
        singleRange1: 70,
        singleRange2: 90,
      },
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      age: 24,
      gender: "Female",
      designation: "Instructor",
      status: "Active",
      lastLogin: "2025-08-17",
      createdDate: "2025-02-10",
      group: "Group B",
      courses: ["Python Fundamentals", "Data Science"],
      description: "Experienced instructor with focus on practical learning approaches.",
      achievements: [
        { name: "Mentor", icon: null },
        { name: "Expert", icon: null },
      ],
      certificates: [
        { name: "Teaching Excellence", icon: null },
        { name: "Data Science Pro", icon: null },
      ],
      progress: {
        groupActivity: 95,
        singleRange1: 88,
        singleRange2: 92,
      },
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.j@example.com",
      age: 20,
      gender: "Male",
      designation: "Student",
      status: "Inactive",
      lastLogin: "2025-07-20",
      createdDate: "2025-03-05",
      group: "Group C",
      courses: ["HTML/CSS Basics"],
      description: "New student focusing on web development fundamentals.",
      achievements: [{ name: "Beginner", icon: null }],
      certificates: [],
      progress: {
        groupActivity: 45,
        singleRange1: 30,
        singleRange2: 55,
      },
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah.w@example.com",
      age: 26,
      gender: "Female",
      designation: "Admin",
      status: "Active",
      lastLogin: "2025-08-18",
      createdDate: "2025-01-01",
      group: "Admin Group",
      courses: ["System Management"],
      description: "System administrator with full platform access.",
      achievements: [
        { name: "Administrator", icon: null },
        { name: "Security Expert", icon: null },
      ],
      certificates: [
        { name: "System Admin Cert", icon: null },
        { name: "Security Specialist", icon: null },
      ],
      progress: {
        groupActivity: 100,
        singleRange1: 95,
        singleRange2: 98,
      },
    },
    {
      id: 5,
      name: "David Brown",
      email: "david.b@example.com",
      age: 23,
      gender: "Male",
      designation: "Student",
      status: "Pending",
      lastLogin: "Never",
      createdDate: "2025-08-10",
      group: "Group A",
      courses: [],
      description: "Recently registered student awaiting approval.",
      achievements: [],
      certificates: [],
      progress: {
        groupActivity: 0,
        singleRange1: 0,
        singleRange2: 0,
      },
    },
  ])

  const openResetPasswordModal = (student) => {
    setSelectedStudentForAction(student)
    setIsResetPasswordModalOpen(true)
    setOpenDropdownId(null)
  }

  const openActivateModal = (student) => {
    setSelectedStudentForAction(student)
    setIsActivateModalOpen(true)
    setOpenDropdownId(null)
  }

  const openDeleteModal = (student) => {
    setSelectedStudentForAction(student)
    setIsDeleteModalOpen(true)
    setOpenDropdownId(null)
  }

  const getActionItems = (student) => [
    {
      key: "view",
      label: (
        <span
          onClick={(e) => {
            e.stopPropagation()
            openModal(student)
          }}
        >
          <Eye className="h-4 w-4 mr-2 inline" />
          View Details
        </span>
      ),
    },
    {
      key: "edit",
      label: (
        <span
          onClick={(e) => {
            e.stopPropagation()
            openEditModal(student, e)
          }}
        >
          <Edit className="h-4 w-4 mr-2 inline" />
          Edit
        </span>
      ),
    },
    {
      key: "resetPassword",
      label: (
        <span
          onClick={(e) => {
            e.stopPropagation()
            openResetPasswordModal(student)
          }}
        >
          <Key className="h-4 w-4 mr-2 inline" />
          Reset Password
        </span>
      ),
    },
    {
      key: "toggleStatus",
      label: (
        <span
          onClick={(e) => {
            e.stopPropagation()
            openActivateModal(student)
          }}
        >
          <Power className="h-4 w-4 mr-2 inline" />
          {student.status === "Active" ? "Deactivate" : "Activate"}
        </span>
      ),
    },
    {
      key: "loginAs",
      label: (
        <span
          onClick={(e) => {
            e.stopPropagation()
            handleLoginAsUser(student.id, e)
          }}
        >
          <UserCheck className="h-4 w-4 mr-2 inline" />
          Login as User
        </span>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "delete",
      label: (
        <span
          onClick={(e) => {
            e.stopPropagation()
            openDeleteModal(student)
          }}
          className="text-red-600"
        >
          <Trash2 className="h-4 w-4 mr-2 inline" />
          Delete
        </span>
      ),
      danger: true,
    },
  ]

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => (
        <div className="flex items-center min-w-0">
          <Avatar size={32} className="mr-2 flex-shrink-0 bg-gray-200 text-gray-700">
            {record.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="font-medium text-gray-900 truncate text-sm">{text}</div>
            <div className="text-xs text-gray-500">ID: {record.id}</div>
          </div>
        </div>
      ),
      width: 160,
      // fixed: "left", // Fix name column on mobile
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      render: (email) => (
        <div className="max-w-[120px] truncate text-sm" title={email}>
          {email}
        </div>
      ),
      width: 140,
    },
    {
      title: "Role",
      dataIndex: "designation",
      key: "designation",
      filters: roleOptions.map((role) => ({ text: role, value: role })),
      onFilter: (value, record) => record.designation === value,
      render: (designation) => {
        let color = "green"
        if (designation === "Admin") color = "red"
        if (designation === "Instructor") color = "blue"
        return (
          <Tag color={color} className="text-xs">
            {designation}
          </Tag>
        )
      },
      width: 90,
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
      width: 90,
    },
    {
      title: "Last Login",
      dataIndex: "lastLogin",
      key: "lastLogin",
      sorter: (a, b) => {
        const dateA = a.lastLogin === "Never" ? new Date(0) : new Date(a.lastLogin)
        const dateB = b.lastLogin === "Never" ? new Date(0) : new Date(b.lastLogin)
        return dateA - dateB
      },
      render: (lastLogin) => (
        <span className="text-xs">{lastLogin === "Never" ? "Never" : new Date(lastLogin).toLocaleDateString()}</span>
      ),
      width: 100,
    },
    {
      title: "Created",
      dataIndex: "createdDate",
      key: "createdDate",
      sorter: (a, b) => new Date(a.createdDate) - new Date(b.createdDate),
      render: (createdDate) => <span className="text-xs">{new Date(createdDate).toLocaleDateString()}</span>,
      width: 90,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Dropdown menu={{ items: getActionItems(record) }} trigger={["click"]} placement="bottomRight">
          <Button type="text" icon={<MoreVertical className="h-4 w-4" />} size="small" />
        </Dropdown>
      ),
      width: 70,
    },
  ]

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdownId(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Add audit log function
  const addAuditLog = (action, targetUser, adminUser = "Current Admin") => {
    const newLog = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      admin: adminUser,
      action: action,
      target: targetUser,
      details: `${action} performed on ${targetUser}`,
    }
    setAuditLogs((prev) => [newLog, ...prev])
  }

  // Filter and sort students
  const filteredStudents = students
    .filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesRole = filters.role === "all" || student.designation === filters.role
      const matchesStatus = filters.status === "all" || student.status === filters.status
      const matchesGroup = filters.group === "all" || student.group === filters.group

      return matchesSearch && matchesRole && matchesStatus && matchesGroup
    })
    .sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]

      if (sortBy === "lastLogin") {
        aValue = aValue === "Never" ? new Date(0) : new Date(aValue)
        bValue = bValue === "Never" ? new Date(0) : new Date(bValue)
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage)

  const handleImageChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setProfileImage(imageUrl)
    }
  }

  const openAddModal = () => {
    setIsAddModalOpen(true)
  }

  const closeAddModal = () => {
    setIsAddModalOpen(false)
    setCustomFields([])
    setProfileImage(null)
  }

  const openEditModal = (student, e) => {
    if (e) e.stopPropagation()
    setStudentToEdit(student)
    setSelectedRole(student.designation)
    setSelectedStatus(student.status)
    setSelectedGroup(student.group)
    setIsEditModalOpen(true)
    setOpenDropdownId(null)
  }

  const closeEditModal = () => {
    setIsEditModalOpen(false)
    setStudentToEdit(null)
    setCustomFields([])
    setProfileImage(null)
  }

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  const toggleDropdown = (studentId, e) => {
    e.stopPropagation()
    setOpenDropdownId(openDropdownId === studentId ? null : studentId)
  }

  const handleDeleteStudent = (studentId, e) => {
    if (e) e.stopPropagation()
    const student = students.find((s) => s.id === studentId)
    openDeleteModal(student)
    setOpenDropdownId(null)
  }

  const handleToggleStatusAction = (student) => {
    openActivateModal(student)
    setOpenDropdownId(null)
  }

  const handleResetPasswordAction = (student) => {
    openResetPasswordModal(student)
    setOpenDropdownId(null)
  }

  const handleLoginAsUser = (studentId, e) => {
    if (e) e.stopPropagation()
    const student = students.find((s) => s.id === studentId)
    addAuditLog("Login as User", student.name)
    message.success(`Logging in as ${student.name}...`)
    setOpenDropdownId(null)
  }

  const addCustomField = () => {
    if (customFieldName.trim()) {
      setCustomFields([...customFields, { name: customFieldName, value: customFieldValue }])
      setCustomFieldName("")
      setCustomFieldValue("")
      setShowCustomPrompt(false)
    }
  }

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedStudents(paginatedStudents.map((s) => s.id))
    } else {
      setSelectedStudents([])
    }
  }

  const exportToCSV = () => {
    const csvContent = [
      ["Name", "Email", "Role", "Status", "Group", "Last Login", "Created"],
      ...students.map((s) => [s.name, s.email, s.designation, s.status, s.group, s.lastLogin, s.createdDate]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "students_export.csv"
    a.click()
    URL.revokeObjectURL(url)
    message.success("Data exported successfully")
  }

  const handleSelectStudent = (studentId, checked) => {
    if (checked) {
      setSelectedStudents((prev) => [...prev, studentId])
    } else {
      setSelectedStudents((prev) => prev.filter((id) => id !== studentId))
    }
  }

  const handleBulkAction = (action) => {
    const selectedStudentNames = students
      .filter((s) => selectedStudents.includes(s.id))
      .map((s) => s.name)
      .join(", ")

    switch (action) {
      case "delete":
        setStudents((prev) => prev.filter((s) => !selectedStudents.includes(s.id)))
        addAuditLog("Bulk Delete", selectedStudentNames)
        break
      case "activate":
        setStudents((prev) => prev.map((s) => (selectedStudents.includes(s.id) ? { ...s, status: "Active" } : s)))
        addAuditLog("Bulk Activate", selectedStudentNames)
        break
      case "deactivate":
        setStudents((prev) => prev.map((s) => (selectedStudents.includes(s.id) ? { ...s, status: "Inactive" } : s)))
        addAuditLog("Bulk Deactivate", selectedStudentNames)
        break
      case "email":
        addAuditLog("Bulk Email", selectedStudentNames)
        alert(`Email sent to ${selectedStudents.length} users`)
        break
    }
    setSelectedStudents([])
  }

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortOrder("asc")
    }
  }

  const openModal = (student) => {
    setSelectedStudent(student)
    document.body.style.overflow = "hidden"
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys)
      setSelectedStudents(selectedRowKeys)
    },
  }

  const handleSortableHeaderClick = (column) => {
    handleSort(column)
  }

  const handleResetPasswordConfirm = () => {
    if (selectedStudentForAction) {
      addAuditLog("Reset Password", selectedStudentForAction.name)
      message.success(`Password reset email sent to ${selectedStudentForAction.email}`)
      setIsResetPasswordModalOpen(false)
      setSelectedStudentForAction(null)
    }
  }

  const handleActivateConfirm = () => {
    if (selectedStudentForAction) {
      const newStatus = selectedStudentForAction.status === "Active" ? "Inactive" : "Active"
      const action = selectedStudentForAction.status === "Active" ? "deactivated" : "activated"

      setStudents((prev) =>
        prev.map((student) =>
          student.id === selectedStudentForAction.id ? { ...student, status: newStatus } : student,
        ),
      )

      addAuditLog(
        selectedStudentForAction.status === "Active" ? "Deactivate User" : "Activate User",
        selectedStudentForAction.name,
      )
      message.success(`User ${selectedStudentForAction.name} has been ${action} successfully`)
      setIsActivateModalOpen(false)
      setSelectedStudentForAction(null)
    }
  }

  const handleDeleteConfirm = () => {
    if (selectedStudentForAction) {
      setStudents((prev) => prev.filter((s) => s.id !== selectedStudentForAction.id))
      addAuditLog("Delete User", selectedStudentForAction.name)
      message.success(`${selectedStudentForAction.name} has been deleted successfully`)
      setIsDeleteModalOpen(false)
      setSelectedStudentForAction(null)
      if (selectedStudent && selectedStudent.id === selectedStudentForAction.id) {
        setSelectedStudent(null)
      }
    }
  }

  const handleDelete = (studentId, studentName) => {
    confirm({
      title: "Delete User",
      content: (
        <div>
          <p>
            Are you sure you want to delete <strong>{studentName}</strong>?
          </p>
          <div
            style={{
              backgroundColor: "#fef2f2",
              border: "1px solid #fecaca",
              borderRadius: "6px",
              padding: "12px",
              marginTop: "12px",
            }}
          >
            <p style={{ color: "#dc2626", fontSize: "14px", margin: 0 }}>
              <strong>Warning:</strong> This action cannot be undone. All user data will be permanently removed.
            </p>
          </div>
        </div>
      ),
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        // Remove student from list
        setStudents((prev) => prev.filter((student) => student.id !== studentId))
        addAuditLog("Delete User", studentName)
        message.success(`User ${studentName} has been deleted successfully`)
        setSelectedStudent(null)
      },
    })
  }

  const closeModal = () => {
    setSelectedStudent(null)
    document.body.style.overflow = "auto"
  }

  const SortableHeader = ({ column, children }) => (
    <th
      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
      onClick={() => handleSortableHeaderClick(column)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        {sortBy === column && (sortOrder === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
      </div>
    </th>
  )

  const handleToggleStatus = (id, name, status) => {
    confirm({
      title: status === "Active" ? "Deactivate User" : "Activate User",
      content: (
        <div>
          <p>
            Are you sure you want to {status === "Active" ? "deactivate" : "activate"} <strong>{name}</strong>?
          </p>
          <div
            style={{
              backgroundColor: status === "Active" ? "#fef2f2" : "#f0fdf4",
              border: status === "Active" ? "1px solid #fecaca" : "1px solid #bbf7d0",
              borderRadius: "6px",
              padding: "12px",
              marginTop: "12px",
            }}
          >
            <p
              style={{
                color: status === "Active" ? "#dc2626" : "#16a34a",
                fontSize: "14px",
                margin: 0,
              }}
            >
              <strong>{status === "Active" ? "Warning:" : "Note:"}</strong>{" "}
              {status === "Active"
                ? "Deactivating this user will prevent them from logging in and accessing the system."
                : "Activating this user will restore their access to the system."}
            </p>
          </div>
        </div>
      ),
      okText: status === "Active" ? "Deactivate" : "Activate",
      okType: status === "Active" ? "danger" : "primary",
      cancelText: "Cancel",
      onOk() {
        const newStatus = status === "Active" ? "Inactive" : "Active"
        setStudents((prev) => prev.map((student) => (student.id === id ? { ...student, status: newStatus } : student)))
        addAuditLog(status === "Active" ? "Deactivate User" : "Activate User", name)
        message.success(`User ${name} has been ${status === "Active" ? "deactivated" : "activated"} successfully`)
        setSelectedStudent(null)
      },
    })
  }

  return (
    <div className="flex rounded-3xl text-black min-h-screen overflow-hidden bg-gray-50">
      <div className="flex-1 min-w-0">
        <div className="w-full mx-auto p-2 sm:p-4 lg:p-6 max-w-full">
          <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6">
            <div className="flex items-center justify-between">
              <h1 className="text-xl md:text-2xl poppins-thin_600">Manage Students/Users</h1>
              <button
                className="p-2 sm:hidden bg-white border border-gray-200 rounded-lg"
                onClick={() => setShowSidebar(!showSidebar)}
              >
                <Menu className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
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

              <button
                onClick={() => setshowUserManageModal(true)}
                className="py-1 px-2 sm:px-3 text-xs sm:text-sm rounded-md bg-white border border-gray-200 hover:bg-gray-50 transition-colors whitespace-nowrap"
              >
                <span className="hidden sm:inline">Manage Users</span>
                <span className="sm:hidden">Manage</span>
              </button>
            </div>
          </div>

          {/* ... existing code for filters and search ... */}

          <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:gap-3 mb-4">
            <div className="flex-1 min-w-0">
              <AntSearch
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: "100%" }}
                size="middle"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Button
                icon={<Filter size={16} />}
                onClick={() => setShowFilters(!showFilters)}
                size="middle"
                className="flex-shrink-0"
              >
                <span className="hidden sm:inline">Filters</span>
              </Button>

              <Button
                icon={<Settings size={16} />}
                onClick={() => setShowAuditLogs(!showAuditLogs)}
                size="middle"
                className="flex-shrink-0"
              >
                <span className="hidden sm:inline">Audit</span>
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

          {/* ... existing code for filters and bulk actions ... */}

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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Group</label>
                  <Select
                    value={filters.group}
                    onChange={(value) => setFilters((prev) => ({ ...prev, group: value }))}
                    style={{ width: "100%" }}
                    size="small"
                  >
                    <Option value="all">All Groups</Option>
                    {groupOptions.map((group) => (
                      <Option key={group} value={group}>
                        {group}
                      </Option>
                    ))}
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                  <Select
                    value={filters.dateRange}
                    onChange={(value) => setFilters((prev) => ({ ...prev, dateRange: value }))}
                    style={{ width: "100%" }}
                    size="small"
                  >
                    <Option value="all">All Time</Option>
                    <Option value="today">Today</Option>
                    <Option value="week">This Week</Option>
                    <Option value="month">This Month</Option>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <Button
                  onClick={() => setFilters({ role: "all", status: "all", dateRange: "all", group: "all" })}
                  type="link"
                  size="small"
                >
                  Clear Filters
                </Button>
              </div>
            </Card>
          )}

          {selectedStudents.length > 0 && (
            <Card className="mb-4 bg-blue-50 border-blue-200" size="small">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span className="text-sm text-blue-700 font-medium">{selectedStudents.length} user(s) selected</span>
                <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
                  <Button
                    onClick={() => handleBulkAction("activate")}
                    icon={<Power size={14} />}
                    size="small"
                    type="primary"
                    ghost
                    className="flex-1 sm:flex-none"
                  >
                    <span className="hidden xs:inline">Activate</span>
                  </Button>
                  <Button
                    onClick={() => handleBulkAction("deactivate")}
                    icon={<Power size={14} />}
                    size="small"
                    style={{ borderColor: "#f97316", color: "#f97316" }}
                    ghost
                    className="flex-1 sm:flex-none"
                  >
                    <span className="hidden xs:inline">Deactivate</span>
                  </Button>
                  <Button
                    onClick={() => handleBulkAction("email")}
                    icon={<Mail size={14} />}
                    size="small"
                    type="primary"
                    ghost
                    className="flex-1 sm:flex-none"
                  >
                    <span className="hidden xs:inline">Email</span>
                  </Button>
                  <Button
                    onClick={() => handleBulkAction("delete")}
                    icon={<Trash2 size={14} />}
                    size="small"
                    danger
                    ghost
                    className="flex-1 sm:flex-none"
                  >
                    <span className="hidden xs:inline">Delete</span>
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Content based on view mode */}
          {viewMode === "table" ? (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto" style={{ WebkitOverflowScrolling: "touch" }}>
                <Table
                  columns={columns}
                  dataSource={filteredStudents}
                  rowKey="id"
                  pagination={{
                    current: currentPage,
                    pageSize: itemsPerPage,
                    total: filteredStudents.length,
                    onChange: (page) => setCurrentPage(page),
                    showSizeChanger: false,
                    showQuickJumper: false,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    size: "small",
                  }}
                  rowSelection={{
                    selectedRowKeys,
                    onChange: (keys, rows) => {
                      setSelectedRowKeys(keys)
                      setSelectedStudents(keys)
                    },
                    onSelectAll: (selected, selectedRows, changeRows) => {
                      if (selected) {
                        const allKeys = filteredStudents.map((student) => student.id)
                        setSelectedRowKeys(allKeys)
                        setSelectedStudents(allKeys)
                      } else {
                        setSelectedRowKeys([])
                        setSelectedStudents([])
                      }
                    },
                  }}
                  scroll={{ x: 600 }}
                  size="small"
                />
              </div>
            </div>
          ) : (
            /* Improved responsive card view layout */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {filteredStudents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((student) => (
                <Card
                  key={student.id}
                  hoverable
                  className="cursor-pointer relative transition-all duration-200 hover:shadow-md"
                  onClick={() => openModal(student)}
                  size="small"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <Checkbox
                        checked={selectedStudents.includes(student.id)}
                        onChange={(e) => {
                          e.stopPropagation()
                          if (e.target.checked) {
                            setSelectedStudents((prev) => [...prev, student.id])
                            setSelectedRowKeys((prev) => [...prev, student.id])
                          } else {
                            setSelectedStudents((prev) => prev.filter((id) => id !== student.id))
                            setSelectedRowKeys((prev) => prev.filter((id) => id !== student.id))
                          }
                        }}
                        className="flex-shrink-0"
                      />
                      <Avatar size={40} className="bg-gray-200 text-gray-700 flex-shrink-0">
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </Avatar>
                    </div>

                    <Dropdown menu={{ items: getActionItems(student) }} trigger={["click"]} placement="bottomRight">
                      <Button
                        type="text"
                        icon={<MoreVertical className="h-4 w-4" />}
                        onClick={(e) => e.stopPropagation()}
                        size="small"
                        className="flex-shrink-0"
                      />
                    </Dropdown>
                  </div>

                  <div className="mb-3 min-w-0">
                    <h3 className="text-base font-semibold truncate">{student.name}</h3>
                    <p className="text-sm text-gray-500 truncate" title={student.email}>
                      {student.email}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mb-3 gap-2">
                    <Tag
                      color={
                        student.designation === "Admin"
                          ? "red"
                          : student.designation === "Instructor"
                            ? "blue"
                            : "green"
                      }
                      className="text-xs flex-shrink-0"
                    >
                      {student.designation}
                    </Tag>
                    <Tag
                      color={
                        student.status === "Active"
                          ? "green"
                          : student.status === "Inactive"
                            ? "red"
                            : student.status === "Pending"
                              ? "orange"
                              : "gray"
                      }
                      className="text-xs flex-shrink-0"
                    >
                      {student.status}
                    </Tag>
                  </div>

                  <div className="text-xs text-gray-500 space-y-1">
                    <div className="truncate">
                      Last Login:{" "}
                      {student.lastLogin === "Never" ? "Never" : new Date(student.lastLogin).toLocaleDateString()}
                    </div>
                    <div className="truncate">Created: {new Date(student.createdDate).toLocaleDateString()}</div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* ... existing code for pagination ... */}

          {viewMode === "card" && (
            <div className="mt-6 flex justify-center">
              <Pagination
                current={currentPage}
                pageSize={itemsPerPage}
                total={filteredStudents.length}
                onChange={(page) => setCurrentPage(page)}
                showSizeChanger={false}
                showQuickJumper={false}
                showTotal={(total, range) => (
                  <span className="text-sm text-gray-500">
                    {range[0]}-{range[1]} of {total}
                  </span>
                )}
                responsive={true}
                showLessItems={true}
                simple={window.innerWidth < 640}
              />
            </div>
          )}

          {/* Student Detail Modal */}
          {selectedStudent && (
            // Updated Student Detail Modal to pass proper handlers
            <StudentDetailModal
              student={selectedStudent}
              onClose={closeModal}
              onEdit={(student) => {
                setStudentToEdit(student)
                setIsEditModalOpen(true)
                setSelectedStudent(null)
              }}
              onResetPassword={(id) => {
                const student = students.find((s) => s.id === id)
                if (student) {
                  handleResetPasswordAction(student)
                }
              }}
              onToggleStatus={(id) => {
                const student = students.find((s) => s.id === id)
                if (student) {
                  const student = students.find((s) => s.id === id)
                  if (student) {
                    handleToggleStatus(student.id, student.name, student.status)
                  }
                }
              }}
              onDelete={(id) => {
                const student = students.find((s) => s.id === id)
                if (student) {
                  handleDelete(student.id, student.name)
                }
              }}
            />
          )}
        </div>
      </div>

      {showAuditLogs && (
        <AuditLogsModal isOpen={showAuditLogs} onClose={() => setShowAuditLogs(false)} auditLogs={auditLogs} />
      )}

      {showUserManageModal && (
        <UserManagementModal
          show={showUserManageModal}
          onClose={() => setshowUserManageModal(false)}
          students={students}
          openAddModal={() => setIsAddModalOpen(true)}
          setIsBulkAddModalOpen={setIsBulkAddModalOpen}
        />
      )}

      {isAddModalOpen && (
        <AddStudentModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          roleOptions={roleOptions}
          statusOptions={statusOptions}
          groupOptions={groupOptions}
          addAuditLog={addAuditLog}
        />
      )}

      {isBulkAddModalOpen && (
        <BulkAddModal
          isOpen={isBulkAddModalOpen}
          onClose={() => setIsBulkAddModalOpen(false)}
          roleOptions={roleOptions}
          statusOptions={statusOptions}
          groupOptions={groupOptions}
          addAuditLog={addAuditLog}
        />
      )}

      {/* ... existing edit modal and other modals ... */}

      {isEditModalOpen && studentToEdit && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6">
              <button onClick={closeEditModal} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
              <h2 className="text-xl font-semibold text-center pr-8">Edit User</h2>
            </div>

            <div className="p-4 sm:p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-3 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                  {profileImage ? (
                    <img
                      src={profileImage || "/placeholder.svg"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-lg sm:text-xl font-medium">
                      {studentToEdit.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label
                      htmlFor="edit-profile-upload"
                      className="cursor-pointer w-full h-full flex items-center justify-center text-white"
                    >
                      <Edit size={18} />
                    </label>
                    <input
                      id="edit-profile-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
                <label
                  htmlFor="edit-profile-upload-btn"
                  className="bg-gray-700 cursor-pointer text-white text-sm py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Change Picture
                </label>
                <input
                  id="edit-profile-upload-btn"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </div>

              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.target)
                  const updatedStudent = {
                    ...studentToEdit,
                    name: `${formData.get("firstName")} ${formData.get("lastName")}`.trim(),
                    email: formData.get("email"),
                    age: Number.parseInt(formData.get("age")),
                    gender: formData.get("gender"),
                    designation: selectedRole,
                    status: selectedStatus,
                    group: selectedGroup,
                    description: formData.get("description"),
                  }

                  setStudents((prev) => prev.map((s) => (s.id === studentToEdit.id ? updatedStudent : s)))
                  addAuditLog("Edit User", updatedStudent.name)
                  message.success(`${updatedStudent.name} has been updated successfully`)
                  closeEditModal()
                }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input
                      name="firstName"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md outline-none text-sm focus:ring-2 focus:ring-blue-500"
                      defaultValue={studentToEdit.name.split(" ")[0] || ""}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input
                      name="lastName"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded-md outline-none text-sm focus:ring-2 focus:ring-blue-500"
                      defaultValue={studentToEdit.name.split(" ").slice(1).join(" ") || ""}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    name="email"
                    type="email"
                    className="w-full p-2 border border-gray-300 rounded-md outline-none text-sm focus:ring-2 focus:ring-blue-500"
                    defaultValue={studentToEdit.email}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input
                      name="age"
                      type="number"
                      className="w-full p-2 border border-gray-300 rounded-md outline-none text-sm focus:ring-2 focus:ring-blue-500"
                      defaultValue={studentToEdit.age}
                      min="1"
                      max="120"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select
                      name="gender"
                      className="w-full p-2 border border-gray-300 rounded-md outline-none text-sm focus:ring-2 focus:ring-blue-500"
                      defaultValue={studentToEdit.gender}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md outline-none text-sm focus:ring-2 focus:ring-blue-500"
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                    >
                      {roleOptions.map((role) => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md outline-none text-sm focus:ring-2 focus:ring-blue-500"
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Group</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md outline-none text-sm focus:ring-2 focus:ring-blue-500"
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                  >
                    <option value="">Select group</option>
                    {groupOptions.map((group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    className="w-full p-2 border border-gray-300 rounded-md outline-none text-sm focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    defaultValue={studentToEdit.description}
                  />
                </div>

                <div className="flex gap-3 justify-end pt-4 border-t">
                  <button
                    type="button"
                    onClick={closeEditModal}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <Modal
        title="Reset Password"
        open={isResetPasswordModalOpen}
        onOk={handleResetPasswordConfirm}
        onCancel={() => {
          setIsResetPasswordModalOpen(false)
          setSelectedStudentForAction(null)
        }}
        okText="Send Reset Email"
        cancelText="Cancel"
        width={500}
      >
        {selectedStudentForAction && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <Avatar size={48} style={{ backgroundColor: "#f3f4f6", color: "#374151" }}>
                {selectedStudentForAction.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Avatar>
              <div>
                <h3 style={{ margin: 0, fontWeight: 500, fontSize: "16px" }}>{selectedStudentForAction.name}</h3>
                <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>{selectedStudentForAction.email}</p>
                <p style={{ margin: 0, fontSize: "12px", color: "#9ca3af" }}>
                  Role: {selectedStudentForAction.designation} | Status: {selectedStudentForAction.status}
                </p>
              </div>
            </div>
            <p style={{ marginBottom: "16px" }}>
              Are you sure you want to reset the password for this user? A password reset email will be sent to their
              registered email address.
            </p>
            <div
              style={{
                backgroundColor: "#fefce8",
                border: "1px solid #fde047",
                borderRadius: "6px",
                padding: "12px",
              }}
            >
              <p style={{ color: "#a16207", fontSize: "14px", margin: 0 }}>
                <strong>Note:</strong> The user will receive an email with instructions to create a new password.
              </p>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        title={selectedStudentForAction?.status === "Active" ? "Deactivate User" : "Activate User"}
        open={isActivateModalOpen}
        onOk={handleActivateConfirm}
        onCancel={() => {
          setIsActivateModalOpen(false)
          setSelectedStudentForAction(null)
        }}
        okText={selectedStudentForAction?.status === "Active" ? "Deactivate User" : "Activate User"}
        okType={selectedStudentForAction?.status === "Active" ? "danger" : "primary"}
        cancelText="Cancel"
        width={500}
      >
        {selectedStudentForAction && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <Avatar size={48} style={{ backgroundColor: "#f3f4f6", color: "#374151" }}>
                {selectedStudentForAction.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Avatar>
              <div>
                <h3 style={{ margin: 0, fontWeight: 500, fontSize: "16px" }}>{selectedStudentForAction.name}</h3>
                <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>{selectedStudentForAction.email}</p>
                <p style={{ margin: 0, fontSize: "12px", color: "#9ca3af" }}>
                  Role: {selectedStudentForAction.designation} | Current Status: {selectedStudentForAction.status}
                </p>
              </div>
            </div>
            <p style={{ marginBottom: "16px" }}>
              Are you sure you want to {selectedStudentForAction.status === "Active" ? "deactivate" : "activate"}{" "}
              <strong>{selectedStudentForAction.name}</strong>?
            </p>
            <div
              style={{
                backgroundColor: selectedStudentForAction.status === "Active" ? "#fef2f2" : "#f0fdf4",
                border: selectedStudentForAction.status === "Active" ? "1px solid #fecaca" : "1px solid #bbf7d0",
                borderRadius: "6px",
                padding: "12px",
              }}
            >
              <p
                style={{
                  color: selectedStudentForAction.status === "Active" ? "#dc2626" : "#16a34a",
                  fontSize: "14px",
                  margin: 0,
                }}
              >
                <strong>{selectedStudentForAction.status === "Active" ? "Warning:" : "Note:"}</strong>{" "}
                {selectedStudentForAction.status === "Active"
                  ? "Deactivating this user will prevent them from logging in and accessing the system."
                  : "Activating this user will restore their access to the system."}
              </p>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        title="Delete User"
        open={isDeleteModalOpen}
        onOk={handleDeleteConfirm}
        onCancel={() => {
          setIsDeleteModalOpen(false)
          setSelectedStudentForAction(null)
        }}
        okText="Delete User"
        okType="danger"
        cancelText="Cancel"
        width={500}
      >
        {selectedStudentForAction && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <Avatar size={48} style={{ backgroundColor: "#f3f4f6", color: "#374151" }}>
                {selectedStudentForAction.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Avatar>
              <div>
                <h3 style={{ margin: 0, fontWeight: 500, fontSize: "16px" }}>{selectedStudentForAction.name}</h3>
                <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>{selectedStudentForAction.email}</p>
                <div style={{ display: "flex", gap: "16px", marginTop: "4px" }}>
                  <p style={{ margin: 0, fontSize: "12px", color: "#9ca3af" }}>
                    Role: {selectedStudentForAction.designation}
                  </p>
                  <p style={{ margin: 0, fontSize: "12px", color: "#9ca3af" }}>
                    Status: {selectedStudentForAction.status}
                  </p>
                  <p style={{ margin: 0, fontSize: "12px", color: "#9ca3af" }}>
                    Group: {selectedStudentForAction.group || "No Group"}
                  </p>
                </div>
                <p style={{ margin: 0, fontSize: "12px", color: "#9ca3af", marginTop: "2px" }}>
                  Last Login: {selectedStudentForAction.lastLogin}
                </p>
              </div>
            </div>
            <p style={{ marginBottom: "16px" }}>
              Are you sure you want to delete <strong>{selectedStudentForAction.name}</strong>?
            </p>
            <div
              style={{
                backgroundColor: "#fef2f2",
                border: "1px solid #fecaca",
                borderRadius: "6px",
                padding: "12px",
              }}
            >
              <p style={{ color: "#dc2626", fontSize: "14px", margin: 0 }}>
                <strong>Warning:</strong> This action cannot be undone. All user data including:
              </p>
              <ul style={{ color: "#dc2626", fontSize: "14px", margin: "8px 0 0 16px", paddingLeft: 0 }}>
                <li>Profile information and settings</li>
                <li>Activity logs and progress data</li>
                <li>Group memberships and permissions</li>
                <li>All associated records</li>
              </ul>
              <p style={{ color: "#dc2626", fontSize: "14px", margin: "8px 0 0 0" }}>
                will be permanently removed from the system.
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Students
