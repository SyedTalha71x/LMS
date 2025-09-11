/* eslint-disable no-undef */
import { useState, useEffect } from "react"
import {
  Table,
  Button,
  Input,
  Select,
  Tag,
  Avatar,
  Dropdown,
  Modal,
  Form,
  DatePicker,
  Upload,
  message,
  Popconfirm,
  Card,
  Row,
  Col,
  Statistic,
  Badge,
  Divider,
  Alert,
  Drawer,
  Tabs,
  Timeline,
  Empty,
  Radio,
  Checkbox,
} from "antd"
/* eslint-disable no-unused-vars */
;("use client")

import { useMemo } from "react"
import {
  Search,
  Plus,
  Filter,
  UploadIcon,
  MoreVertical,
  Power,
  Mail,
  Trash2,
  Edit,
  Eye,
  Users,
  Settings,
  Calendar,
  FileText,
  AlertCircle,
  CheckCircle,
  Clock,
  X,
  ArrowLeft,
  Key,
  UserCheck,
} from "lucide-react"
import { ImpersonationBanner, ImpersonationProvider, useImpersonation } from "../../context/impersonation-context"

const { Option } = Select
const { RangePicker } = DatePicker
const { TextArea } = Input
const { TabPane } = Tabs

const initialStudents = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1-555-0123",
    address: "123 Main St, City, State 12345",
    department: "Computer Science",
    employeeId: "EMP001",
    designation: "Student",
    status: "Active",
    enrollmentStatus: "Enrolled",
    lastLogin: "2024-01-15T10:30:00Z",
    createdDate: "2023-09-01T08:00:00Z",
    groups: ["CS-2024", "Advanced Programming"],
    courses: ["React Development", "Database Systems"],
    profileImage: null,
    notes: "Excellent student with strong programming skills",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1-555-0124",
    address: "456 Oak Ave, City, State 12346",
    department: "Mathematics",
    employeeId: "EMP002",
    designation: "Instructor",
    status: "Active",
    enrollmentStatus: "Teaching",
    lastLogin: "2024-01-14T14:20:00Z",
    createdDate: "2023-08-15T09:00:00Z",
    groups: ["Math Faculty", "Research Team"],
    courses: ["Calculus I", "Statistics"],
    profileImage: null,
    notes: "Senior instructor with 10+ years experience",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    phone: "+1-555-0125",
    address: "789 Pine St, City, State 12347",
    department: "Administration",
    employeeId: "EMP003",
    designation: "Admin",
    status: "Inactive",
    enrollmentStatus: "N/A",
    lastLogin: "Never",
    createdDate: "2023-07-01T10:00:00Z",
    groups: ["Admin Staff"],
    courses: [],
    profileImage: null,
    notes: "System administrator",
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice.brown@example.com",
    phone: "+1-555-0126",
    address: "321 Elm St, City, State 12348",
    department: "Computer Science",
    employeeId: "EMP004",
    designation: "Student",
    status: "Pending",
    enrollmentStatus: "Pending",
    lastLogin: "Never",
    createdDate: "2024-01-10T11:00:00Z",
    groups: [],
    courses: [],
    profileImage: null,
    notes: "New student pending approval",
  },
]

const roleOptions = ["Student", "Instructor", "Admin", "TA", "Guest"]
const statusOptions = ["Active", "Inactive", "Pending", "Suspended", "Graduated"]
const enrollmentStatusOptions = ["Enrolled", "Teaching", "Pending", "Dropped", "Completed", "N/A"]
const departmentOptions = [
  "Computer Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Engineering",
  "Business",
  "Administration",
]

const auditLogs = [
  {
    id: "1",
    action: "User Created",
    user: "John Doe",
    performedBy: "Admin User",
    timestamp: "2024-01-15T10:30:00Z",
    details: "New student account created",
  },
  {
    id: "2",
    action: "Status Changed",
    user: "Jane Smith",
    performedBy: "System Admin",
    timestamp: "2024-01-14T14:20:00Z",
    details: "Status changed from Pending to Active",
  },
]

const StudentsManagement = () => {
  const [students, setStudents] = useState(initialStudents)
  const [filteredStudents, setFilteredStudents] = useState(initialStudents)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [selectedStudents, setSelectedStudents] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [viewMode, setViewMode] = useState("table")
  const [isAddModalVisible, setIsAddModalVisible] = useState(false)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [isProfileDrawerVisible, setIsProfileDrawerVisible] = useState(false)
  const [isAdvancedSearchVisible, setIsAdvancedSearchVisible] = useState(false)
  const [isBulkImportVisible, setIsBulkImportVisible] = useState(false)
  const [isAuditLogVisible, setIsAuditLogVisible] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [form] = Form.useForm()
  const [editForm] = Form.useForm()
  const [advancedSearchForm] = Form.useForm()

  const [searchScope, setSearchScope] = useState("all")
  const [filters, setFilters] = useState({
    role: [],
    status: [],
    enrollmentStatus: [],
    department: [],
    dateRange: null,
    groups: [],
  })

  const [currentPage, setCurrentPage] = useState("list") // 'list', 'add', 'edit'
  const [confirmModal, setConfirmModal] = useState({ visible: false, type: "", data: null })
  const [bulkActionModal, setBulkActionModal] = useState({ visible: false, type: "", selectedUsers: [] })

  const [impersonationModal, setImpersonationModal] = useState({
    visible: false,
    user: null,
    reason: "",
  })

  const { startImpersonation, isImpersonating } = useImpersonation()

  const [currentUserRole, setCurrentUserRole] = useState("Super Admin") // You should get this from your actual auth context

  const handleBulkDelete = () => {
    setConfirmModal({
      visible: true,
      type: "bulkDelete",
      data: { selectedUsers: selectedStudents },
      title: "Delete Users",
      content: `Permanently delete ${selectedStudents.length} selected user(s)? This action cannot be undone.`,
      onConfirm: () => {
        const updatedStudents = students.filter((student) => !selectedStudents.includes(student.id))
        setStudents(updatedStudents)
        applyFilters(searchTerm, filters)
        setSelectedRowKeys([])
        setSelectedStudents([])
        message.success(`${selectedStudents.length} user(s) deleted`)
        setConfirmModal({ visible: false, type: "", data: null })
      },
    })
  }

  const handleBulkExport = () => {
    message.success("Exporting selected users...")
  }

  const handleEdit = (student) => {
    setCurrentUser(student)
    setIsEditModalVisible(true)
    editForm.setFieldsValue(student)
  }

  const handleImpersonate = (user) => {
    setImpersonationModal({
      visible: true,
      user: user,
      reason: "",
    })
  }

  const deleteUser = (userId) => {
    const user = students.find((s) => s.id === userId)
    setConfirmModal({
      visible: true,
      type: "delete",
      data: { userId },
      title: "Delete User",
      content: `Are you sure you want to permanently delete "${user?.name}"? This action cannot be undone.`,
      onConfirm: () => {
        const updatedStudents = students.filter((student) => student.id !== userId)
        setStudents(updatedStudents)
        applyFilters(searchTerm, filters)
        message.success("User deleted successfully!")
        setConfirmModal({ visible: false, type: "", data: null })
      },
    })
  }

  const handleImpersonateUser = (user) => {
    setImpersonationModal({
      visible: true,
      user: user,
      reason: "",
    })
  }

  const confirmImpersonation = () => {
    const { user, reason } = impersonationModal

    // Log the impersonation action (you can send this to your backend)
    console.log(
      `Admin impersonation started: ${user.name} (${user.designation}) - Reason: ${reason || "No reason provided"}`,
    )

    startImpersonation(user)
    setImpersonationModal({ visible: false, user: null, reason: "" })
    message.success(`Now impersonating ${user.name}`)
  }

  const cancelImpersonation = () => {
    setImpersonationModal({ visible: false, user: null, reason: "" })
  }

  const handleSearch = (value) => {
    setSearchTerm(value)
    applyFilters(value, filters)
  }

  const applyFilters = (searchTerm, currentFilters) => {
    let filtered = students

    // Apply text search based on scope
    if (searchTerm) {
      filtered = filtered.filter((student) => {
        const searchLower = searchTerm.toLowerCase()
        switch (searchScope) {
          case "name":
            return student.name.toLowerCase().includes(searchLower)
          case "email":
            return student.email.toLowerCase().includes(searchLower)
          case "id":
            return (
              student.id.toLowerCase().includes(searchLower) || student.employeeId.toLowerCase().includes(searchLower)
            )
          default:
            return (
              student.name.toLowerCase().includes(searchLower) ||
              student.email.toLowerCase().includes(searchLower) ||
              student.id.toLowerCase().includes(searchLower) ||
              student.employeeId.toLowerCase().includes(searchLower) ||
              student.department.toLowerCase().includes(searchLower)
            )
        }
      })
    }

    // Apply advanced filters
    if (currentFilters.role.length > 0) {
      filtered = filtered.filter((student) => currentFilters.role.includes(student.designation))
    }
    if (currentFilters.status.length > 0) {
      filtered = filtered.filter((student) => currentFilters.status.includes(student.status))
    }
    if (currentFilters.enrollmentStatus.length > 0) {
      filtered = filtered.filter((student) => currentFilters.enrollmentStatus.includes(student.enrollmentStatus))
    }
    if (currentFilters.department.length > 0) {
      filtered = filtered.filter((student) => currentFilters.department.includes(student.department))
    }
    if (currentFilters.dateRange) {
      const [start, end] = currentFilters.dateRange
      filtered = filtered.filter((student) => {
        const createdDate = new Date(student.createdDate)
        return createdDate >= start && createdDate <= end
      })
    }

    setFilteredStudents(filtered)
  }

  const handleAdvancedSearch = (values) => {
    const newFilters = {
      role: values.role || [],
      status: values.status || [],
      enrollmentStatus: values.enrollmentStatus || [],
      department: values.department || [],
      dateRange: values.dateRange || null,
      groups: values.groups || [],
    }
    setFilters(newFilters)
    applyFilters(searchTerm, newFilters)
    setIsAdvancedSearchVisible(false)
  }

  const clearFilters = () => {
    setFilters({
      role: [],
      status: [],
      enrollmentStatus: [],
      department: [],
      dateRange: null,
      groups: [],
    })
    setSearchTerm("")
    advancedSearchForm.resetFields()
    setFilteredStudents(students)
  }

  const handleAddUser = (values) => {
    const newUser = {
      id: Date.now().toString(),
      name: values.name,
      email: values.email,
      phone: values.phone || "",
      address: values.address || "",
      department: values.department,
      employeeId: values.employeeId || `EMP${Date.now()}`,
      designation: values.designation,
      status: values.status || "Active",
      enrollmentStatus: values.enrollmentStatus || "Enrolled",
      lastLogin: "Never",
      createdDate: new Date().toISOString(),
      groups: values.groups || [],
      courses: values.courses || [],
      profileImage: null,
      notes: values.notes || "",
    }

    const updatedStudents = [...students, newUser]
    setStudents(updatedStudents)
    setFilteredStudents(updatedStudents)
    setCurrentPage("list") // Navigate back to list
    form.resetFields()
    message.success("User added successfully!")

    // Send invitation if requested
    if (values.sendInvitation) {
      message.info(`Invitation email sent to ${values.email}`)
    }
  }

  const handleEditUser = (values) => {
    const updatedStudents = students.map((student) =>
      student.id === currentUser.id ? { ...student, ...values } : student,
    )
    setStudents(updatedStudents)
    applyFilters(searchTerm, filters)
    setCurrentPage("list") // Navigate back to list
    setCurrentUser(null)
    editForm.resetFields()
    message.success("User updated successfully!")
  }

  const viewUserProfile = (user) => {
    setCurrentUser(user)
    setIsProfileDrawerVisible(true)
  }

  const editUser = (user) => {
    setCurrentUser(user)
    editForm.setFieldsValue(user)
    setCurrentPage("edit") // Navigate to edit page
  }

  const deactivateUser = (userId) => {
    setConfirmModal({
      visible: true,
      type: "deactivate",
      data: { userId },
      title: "Deactivate User",
      content: "Are you sure you want to deactivate this user? They will not be able to access the system.",
      onConfirm: () => {
        const updatedStudents = students.map((student) =>
          student.id === userId ? { ...student, status: "Inactive" } : student,
        )
        setStudents(updatedStudents)
        applyFilters(searchTerm, filters)
        message.success("User deactivated successfully!")
        setConfirmModal({ visible: false, type: "", data: null })
      },
    })
  }

  const resetPassword = (userId) => {
    const user = students.find((s) => s.id === userId)
    setConfirmModal({
      visible: true,
      type: "resetPassword",
      data: { userId },
      title: "Reset Password",
      content: `Reset password for "${user?.name}"? A new temporary password will be sent to their email.`,
      onConfirm: () => {
        message.success(`Password reset email sent to ${user?.email}`)
        setConfirmModal({ visible: false, type: "", data: null })
      },
    })
  }

  const handleBulkAction = (action) => {
    const selectedUsers = students.filter((s) => selectedStudents.includes(s.id))

    switch (action) {
      case "activate":
        setConfirmModal({
          visible: true,
          type: "bulkActivate",
          data: { selectedUsers },
          title: "Activate Users",
          content: `Activate ${selectedUsers.length} selected user(s)?`,
          onConfirm: () => {
            const updatedStudents = students.map((student) =>
              selectedStudents.includes(student.id) ? { ...student, status: "Active" } : student,
            )
            setStudents(updatedStudents)
            applyFilters(searchTerm, filters)
            setSelectedRowKeys([])
            setSelectedStudents([])
            message.success(`${selectedUsers.length} user(s) activated`)
            setConfirmModal({ visible: false, type: "", data: null })
          },
        })
        break
      case "deactivate":
        setConfirmModal({
          visible: true,
          type: "bulkDeactivate",
          data: { selectedUsers },
          title: "Deactivate Users",
          content: `Deactivate ${selectedUsers.length} selected user(s)? They will not be able to access the system.`,
          onConfirm: () => {
            const updatedStudents = students.map((student) =>
              selectedStudents.includes(student.id) ? { ...student, status: "Inactive" } : student,
            )
            setStudents(updatedStudents)
            applyFilters(searchTerm, filters)
            setSelectedRowKeys([])
            setSelectedStudents([])
            message.success(`${selectedUsers.length} user(s) deactivated`)
            setConfirmModal({ visible: false, type: "", data: null })
          },
        })
        break
      case "delete":
        setConfirmModal({
          visible: true,
          type: "bulkDelete",
          data: { selectedUsers },
          title: "Delete Users",
          content: `Permanently delete ${selectedUsers.length} selected user(s)? This action cannot be undone.`,
          onConfirm: () => {
            const updatedStudents = students.filter((student) => !selectedStudents.includes(student.id))
            setStudents(updatedStudents)
            applyFilters(searchTerm, filters)
            setSelectedRowKeys([])
            setSelectedStudents([])
            message.success(`${selectedUsers.length} user(s) deleted`)
            setConfirmModal({ visible: false, type: "", data: null })
          },
        })
        break
      case "assignGroup":
        setBulkActionModal({
          visible: true,
          type: "assignGroup",
          selectedUsers: selectedUsers,
        })
        break
      case "enrollCourse":
        setBulkActionModal({
          visible: true,
          type: "enrollCourse",
          selectedUsers: selectedUsers,
        })
        break
      case "changeRole":
        setBulkActionModal({
          visible: true,
          type: "changeRole",
          selectedUsers: selectedUsers,
        })
        break
      case "email":
        setBulkActionModal({
          visible: true,
          type: "sendEmail",
          selectedUsers: selectedUsers,
        })
        break
    }
  }

  const handleBulkGroupAssignment = (values) => {
    const updatedStudents = students.map((student) => {
      if (selectedStudents.includes(student.id)) {
        const newGroups = [...new Set([...(student.groups || []), ...values.groups])]
        return { ...student, groups: newGroups }
      }
      return student
    })
    setStudents(updatedStudents)
    applyFilters(searchTerm, filters)
    setSelectedRowKeys([])
    setSelectedStudents([])
    setBulkActionModal({ visible: false, type: "", selectedUsers: [] })
    message.success(`Groups assigned to ${bulkActionModal.selectedUsers.length} user(s)`)
  }

  const handleBulkCourseEnrollment = (values) => {
    const updatedStudents = students.map((student) => {
      if (selectedStudents.includes(student.id)) {
        const newCourses = [...new Set([...(student.courses || []), ...values.courses])]
        return { ...student, courses: newCourses }
      }
      return student
    })
    setStudents(updatedStudents)
    applyFilters(searchTerm, filters)
    setSelectedRowKeys([])
    setSelectedStudents([])
    setBulkActionModal({ visible: false, type: "", selectedUsers: [] })
    message.success(`Courses enrolled for ${bulkActionModal.selectedUsers.length} user(s)`)
  }

  const handleBulkRoleChange = (values) => {
    const updatedStudents = students.map((student) => {
      if (selectedStudents.includes(student.id)) {
        return { ...student, designation: values.role }
      }
      return student
    })
    setStudents(updatedStudents)
    applyFilters(searchTerm, filters)
    setSelectedRowKeys([])
    setSelectedStudents([])
    setBulkActionModal({ visible: false, type: "", selectedUsers: [] })
    message.success(`Role changed for ${bulkActionModal.selectedUsers.length} user(s)`)
  }

  const handleBulkEmail = (values) => {
    setBulkActionModal({ visible: false, type: "", selectedUsers: [] })
    setSelectedRowKeys([])
    setSelectedStudents([])
    message.success(`Email "${values.subject}" sent to ${bulkActionModal.selectedUsers.length} user(s)`)
  }

  const getActionItems = (record) => [
    {
      key: "view",
      label: (
        <span onClick={() => viewUserProfile(record)}>
          <Eye className="h-4 w-4 mr-2 inline" />
          View Profile
        </span>
      ),
    },
    {
      key: "edit",
      label: (
        <span onClick={() => editUser(record)}>
          <Edit className="h-4 w-4 mr-2 inline" />
          Edit User
        </span>
      ),
    },
    {
      key: "deactivate",
      label: (
        <Popconfirm
          title="Are you sure you want to deactivate this user?"
          onConfirm={() => deactivateUser(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <span>
            <Power className="h-4 w-4 mr-2 inline" />
            Deactivate
          </span>
        </Popconfirm>
      ),
    },
    {
      key: "delete",
      label: (
        <Popconfirm
          title="Are you sure you want to delete this user?"
          onConfirm={() => deleteUser(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <span style={{ color: "red" }}>
            <Trash2 className="h-4 w-4 mr-2 inline" />
            Delete User
          </span>
        </Popconfirm>
      ),
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
        if (designation === "Admin") color = "red"
        if (designation === "Instructor") color = "blue"
        if (designation === "TA") color = "purple"
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
        if (status === "Graduated") color = "blue"
        return (
          <Tag color={color} className="text-xs">
            {status}
          </Tag>
        )
      },
      width: 100,
    },
    {
      title: "Enrollment",
      dataIndex: "enrollmentStatus",
      key: "enrollmentStatus",
      filters: enrollmentStatusOptions.map((status) => ({ text: status, value: status })),
      onFilter: (value, record) => record.enrollmentStatus === value,
      render: (enrollmentStatus) => {
        let color = "green"
        if (enrollmentStatus === "Dropped") color = "red"
        if (enrollmentStatus === "Pending") color = "orange"
        if (enrollmentStatus === "Teaching") color = "blue"
        return (
          <Tag color={color} className="text-xs">
            {enrollmentStatus}
          </Tag>
        )
      },
      width: 110,
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
        <span className="text-xs">
          {lastLogin === "Never" ? <Badge status="default" text="Never" /> : new Date(lastLogin).toLocaleDateString()}
        </span>
      ),
      width: 110,
    },
    {
      title: "Created",
      dataIndex: "createdDate",
      key: "createdDate",
      sorter: (a, b) => new Date(a.createdDate) - new Date(b.createdDate),
      render: (createdDate) => <span className="text-xs">{new Date(createdDate).toLocaleDateString()}</span>,
      width: 100,
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "view",
                label: "View Profile",
                icon: <Eye size={14} />,
                onClick: () => viewUserProfile(record),
              },
              {
                key: "edit",
                label: "Edit User",
                icon: <Edit size={14} />,
                onClick: () => editUser(record),
              },
              {
                key: "reset",
                label: "Reset Password",
                icon: <Key size={14} />,
                onClick: () => resetPassword(record.id),
              },
              ...(currentUserRole === "Admin" || currentUserRole === "Super Admin"
                ? [
                    {
                      key: "impersonate",
                      label: "Login as",
                      icon: <span>🔑</span>,
                      onClick: () => handleImpersonateUser(record),
                    },
                  ]
                : []),
              {
                type: "divider",
              },
              {
                key: "deactivate",
                label: record.status === "Active" ? "Deactivate" : "Activate",
                icon: record.status === "Active" ? <X size={14} /> : <CheckCircle size={14} />,
                onClick: () => (record.status === "Active" ? deactivateUser(record.id) : activateUser(record.id)),
              },
              {
                key: "delete",
                label: "Delete User",
                icon: <Trash2 size={14} />,
                danger: true,
                onClick: () => deleteUser(record.id),
              },
            ],
          }}
          trigger={["click"]}
        >
          <Button type="text" icon={<MoreVertical size={16} />} />
        </Dropdown>
      ),
    },
  ]

  const activateUser = (userId) => {
    setConfirmModal({
      visible: true,
      type: "activate",
      data: { userId },
      title: "Activate User",
      content: "Are you sure you want to activate this user? They will be able to access the system.",
      onConfirm: () => {
        const updatedStudents = students.map((student) =>
          student.id === userId ? { ...student, status: "Active" } : student,
        )
        setStudents(updatedStudents)
        applyFilters(searchTerm, filters)
        message.success("User activated successfully!")
        setConfirmModal({ visible: false, type: "", data: null })
      },
    })
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys)
      setSelectedStudents(selectedRowKeys)
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
  }

  const statistics = useMemo(() => {
    const total = students.length
    const active = students.filter((s) => s.status === "Active").length
    const pending = students.filter((s) => s.status === "Pending").length
    const inactive = students.filter((s) => s.status === "Inactive").length

    return { total, active, pending, inactive }
  }, [students])

  useEffect(() => {
    applyFilters(searchTerm, filters)
  }, [students])

  const handleBulkImport = (info) => {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList)
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`)
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`)
    }
  }

  if (currentPage === "add") {
    return (
      <div className="p-3 min-h-screen">
        <div className="">
          <div className="mb-6">
            <Button icon={<ArrowLeft size={16} />} onClick={() => setCurrentPage("list")} className="mb-4">
              Back to Users
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Add New User</h1>
            <p className="text-gray-600 mt-1">Create a new user account with all necessary details</p>
          </div>

          <Card>
            <Form form={form} layout="vertical" onFinish={handleAddUser}>
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
                  <Form.Item name="employeeId" label="Employee/Student ID">
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
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="enrollmentStatus" label="Enrollment Status" initialValue="Enrolled">
                    <Select>
                      {enrollmentStatusOptions.map((status) => (
                        <Option key={status} value={status}>
                          {status}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="groups" label="Initial Groups">
                    <Select mode="multiple" placeholder="Select groups">
                      <Option value="CS-2024">CS-2024</Option>
                      <Option value="Math Faculty">Math Faculty</Option>
                      <Option value="Research Team">Research Team</Option>
                      <Option value="Admin Staff">Admin Staff</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="courses" label="Initial Courses">
                <Select mode="multiple" placeholder="Select courses">
                  <Option value="React Development">React Development</Option>
                  <Option value="Database Systems">Database Systems</Option>
                  <Option value="Calculus I">Calculus I</Option>
                  <Option value="Statistics">Statistics</Option>
                </Select>
              </Form.Item>

              <Form.Item name="notes" label="Notes">
                <TextArea rows={3} placeholder="Additional notes about the user" />
              </Form.Item>

              <Divider />

              <Form.Item name="passwordOption" label="Password Setup" initialValue="auto">
                <Radio.Group>
                  <Radio value="auto">Auto-generate password</Radio>
                  <Radio value="invitation">Send invitation email</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item name="sendInvitation" valuePropName="checked">
                <Checkbox>Send welcome email with login instructions</Checkbox>
              </Form.Item>

              <div className="flex justify-end gap-2 mt-6">
                <Button onClick={() => setCurrentPage("list")}>Cancel</Button>
                <Button type="primary" htmlType="submit">
                  Add User
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    )
  }

  if (currentPage === "edit") {
    return (
      <div className="p-3 min-h-screen">
        <div className="">
          <div className="mb-6">
            <Button icon={<ArrowLeft size={16} />} onClick={() => setCurrentPage("list")} className="mb-4">
              Back to Users
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Edit User</h1>
            <p className="text-gray-600 mt-1">Update user information and settings</p>
          </div>

          <Card>
            <Form form={editForm} layout="vertical" onFinish={handleEditUser}>
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
                  <Form.Item name="employeeId" label="Employee/Student ID">
                    <Input placeholder="Employee/Student ID" />
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
                  <Form.Item name="status" label="Status">
                    <Select>
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
                  <Form.Item name="enrollmentStatus" label="Enrollment Status">
                    <Select>
                      {enrollmentStatusOptions.map((status) => (
                        <Option key={status} value={status}>
                          {status}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="groups" label="Groups">
                    <Select mode="multiple" placeholder="Select groups">
                      <Option value="CS-2024">CS-2024</Option>
                      <Option value="Math Faculty">Math Faculty</Option>
                      <Option value="Research Team">Research Team</Option>
                      <Option value="Admin Staff">Admin Staff</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="courses" label="Courses">
                <Select mode="multiple" placeholder="Select courses">
                  <Option value="React Development">React Development</Option>
                  <Option value="Database Systems">Database Systems</Option>
                  <Option value="Calculus I">Calculus I</Option>
                  <Option value="Statistics">Statistics</Option>
                </Select>
              </Form.Item>

              <Form.Item name="notes" label="Notes">
                <TextArea rows={3} placeholder="Additional notes about the user" />
              </Form.Item>

              <div className="flex justify-end gap-2 mt-6">
                <Button onClick={() => setCurrentPage("list")}>Cancel</Button>
                <Button type="primary" htmlType="submit">
                  Update User
                </Button>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: isImpersonating ? "60px 24px 24px 24px" : "14px" }}>
      <ImpersonationBanner />

      <div className="  min-h-screen">
        <div className="">
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Manage Users/Students</h1>
              </div>
              <div className="flex items-center gap-3 mt-4 sm:mt-0">
                <Button
                  type="primary"
                  icon={<Plus size={16} />}
                  onClick={() => setCurrentPage("add")} // Navigate to add page
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Add User
                </Button>
                <Button icon={<UploadIcon className="h-4 w-4" />} onClick={() => setIsBulkImportVisible(true)}>
                  Import
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
                  <Statistic title="Total Users" value={statistics.total} prefix={<Users className="h-4 w-4" />} />
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

          <Card className="mb-4" size="small">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 flex gap-2">
                  <Select value={searchScope} onChange={setSearchScope} style={{ width: 120 }} size="small">
                    <Option value="all">All Fields</Option>
                    <Option value="name">Name</Option>
                    <Option value="email">Email</Option>
                    <Option value="id">ID</Option>
                  </Select>
                  <Input
                    placeholder={`Search ${searchScope === "all" ? "users" : searchScope}...`}
                    prefix={<Search className="h-4 w-4 text-gray-400" />}
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="flex-1"
                    size="small"
                  />
                </div>
                <div className="flex gap-2">
                  {/* View Mode Toggle */}
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
                    onClick={() => setIsAdvancedSearchVisible(true)}
                    size="small"
                  >
                    Advanced
                  </Button>
                  <Button onClick={clearFilters} size="small">
                    Clear
                  </Button>
                </div>
              </div>

              {/* Active Filters Display */}
              {(filters.role.length > 0 ||
                filters.status.length > 0 ||
                filters.department.length > 0 ||
                filters.dateRange) && (
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-gray-500">Active filters:</span>
                  {filters.role.map((role) => (
                    <Tag
                      key={role}
                      closable
                      onClose={() => {
                        const newFilters = { ...filters, role: filters.role.filter((r) => r !== role) }
                        setFilters(newFilters)
                        applyFilters(searchTerm, newFilters)
                      }}
                    >
                      Role: {role}
                    </Tag>
                  ))}
                  {filters.status.map((status) => (
                    <Tag
                      key={status}
                      closable
                      onClose={() => {
                        const newFilters = { ...filters, status: filters.status.filter((s) => s !== status) }
                        setFilters(newFilters)
                        applyFilters(searchTerm, newFilters)
                      }}
                    >
                      Status: {status}
                    </Tag>
                  ))}
                  {filters.department.map((dept) => (
                    <Tag
                      key={dept}
                      closable
                      onClose={() => {
                        const newFilters = { ...filters, department: filters.department.filter((d) => d !== dept) }
                        setFilters(newFilters)
                        applyFilters(searchTerm, newFilters)
                      }}
                    >
                      Dept: {dept}
                    </Tag>
                  ))}
                </div>
              )}
            </div>
          </Card>

          {selectedStudents.length > 0 && (
            <Card className="mb-4 bg-blue-50 border-blue-200" size="small">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span className="text-sm text-blue-700 font-medium">{selectedStudents.length} user(s) selected</span>
                <div className="flex items-center gap-2 flex-wrap w-full sm:w-auto">
                  <Button
                    onClick={() => handleBulkAction("activate")}
                    icon={<CheckCircle size={14} />}
                    size="small"
                    type="primary"
                    ghost
                  >
                    Activate
                  </Button>
                  <Button
                    onClick={() => handleBulkAction("deactivate")}
                    icon={<X size={14} />}
                    size="small"
                    style={{ borderColor: "#f97316", color: "#f97316" }}
                    ghost
                  >
                    Deactivate
                  </Button>
                  <Button
                    onClick={() => handleBulkAction("assignGroup")}
                    icon={<Users size={14} />}
                    size="small"
                    type="primary"
                    ghost
                  >
                    Assign Group
                  </Button>
                  <Button
                    onClick={() => handleBulkAction("enrollCourse")}
                    icon={<Calendar size={14} />}
                    size="small"
                    type="primary"
                    ghost
                  >
                    Enroll Course
                  </Button>
                  <Button
                    onClick={() => handleBulkAction("changeRole")}
                    icon={<Settings size={14} />}
                    size="small"
                    type="primary"
                    ghost
                  >
                    Change Role
                  </Button>
                  <Button
                    onClick={() => handleBulkAction("email")}
                    icon={<Mail size={14} />}
                    size="small"
                    type="primary"
                    ghost
                  >
                    Send Email
                  </Button>
                  <Button
                    onClick={() => handleBulkAction("delete")}
                    icon={<Trash2 size={14} />}
                    size="small"
                    danger
                    ghost
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          )}

          <Card style={{ marginTop: 16 }}>
            {filteredStudents.length === 0 ? (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <span>
                    {searchTerm || Object.values(filters).some((f) => (Array.isArray(f) ? f.length > 0 : f))
                      ? "No users match your search criteria"
                      : "No users found"}
                  </span>
                }
              >
                {!searchTerm && !Object.values(filters).some((f) => (Array.isArray(f) ? f.length > 0 : f)) && (
                  <Button type="primary" onClick={() => setIsAddModalVisible(true)}>
                    Add First User
                  </Button>
                )}
              </Empty>
            ) : (
              <div className="">
                {viewMode === "table" ? (
                  <Table
                    columns={columns}
                    dataSource={filteredStudents}
                    rowKey="id"
                    pagination={{
                      total: filteredStudents.length,
                      pageSize: 10,
                      showSizeChanger: true,
                      showQuickJumper: true,
                      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} users`,
                    }}
                    rowSelection={rowSelection}
                    scroll={{ x: 1200 }}
                    size="small"
                  />
                ) : (
                  // Card View Layout
                  <div>
                    {/* Bulk Actions for Card View */}
                    {selectedStudents.length > 0 && (
                      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
                        <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between">
                          <span className="text-sm text-blue-700">
                            {selectedStudents.length} user{selectedStudents.length > 1 ? "s" : ""} selected
                          </span>
                          <div className="flex gap-2 flex-wrap">
                            <Button size="small" onClick={handleBulkDelete} danger>
                              Delete Selected
                            </Button>
                            <Button size="small" onClick={handleBulkExport}>
                              Export Selected
                            </Button>
                            <Button size="small" onClick={() => setSelectedStudents([])}>
                              Clear Selection
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Cards Grid */}
                    <Row gutter={[16, 16]}>
                      {filteredStudents.map((student) => (
                        <Col xs={24} sm={12} lg={8} xl={6} key={student.id}>
                          <Card
                            size="small"
                            className={`h-full transition-all duration-200 hover:shadow-md ${
                              selectedStudents.some((s) => s.id === student.id)
                                ? "border-blue-500 bg-blue-50"
                                : "hover:border-gray-400"
                            }`}
                            bodyStyle={{ padding: "12px" }}
                          >
                            {/* Card Header with Selection */}
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  checked={selectedStudents.some((s) => s.id === student.id)}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setSelectedStudents([...selectedStudents, student])
                                      setSelectedRowKeys([...selectedRowKeys, student.id])
                                    } else {
                                      setSelectedStudents(selectedStudents.filter((s) => s.id !== student.id))
                                      setSelectedRowKeys(selectedRowKeys.filter((key) => key !== student.id))
                                    }
                                  }}
                                />
                                <Avatar
                                  src={student.avatar}
                                  size={32}
                                  style={{ backgroundColor: student.avatar ? "transparent" : "#1890ff" }}
                                >
                                  {!student.avatar && student.name?.charAt(0)?.toUpperCase()}
                                </Avatar>
                              </div>
                              <Dropdown
                                menu={{
                                  items: [
                                    {
                                      key: "view",
                                      label: "View Profile",
                                      icon: <Eye className="h-4 w-4" />,
                                      onClick: () => {
                                        setCurrentUser(student)
                                        setIsProfileDrawerVisible(true)
                                      },
                                    },
                                    {
                                      key: "edit",
                                      label: "Edit",
                                      icon: <Edit className="h-4 w-4" />,
                                      onClick: () => handleEdit(student),
                                    },
                                    {
                                      key: "impersonate",
                                      label: "Impersonate",
                                      icon: <UserCheck className="h-4 w-4" />,
                                      onClick: () => handleImpersonate(student),
                                    },
                                    { type: "divider" },
                                    {
                                      key: "delete",
                                      label: "Delete",
                                      icon: <Trash2 className="h-4 w-4" />,
                                      danger: true,
                                      onClick: () => handleDelete(student.id),
                                    },
                                  ],
                                }}
                                trigger={["click"]}
                              >
                                <Button type="text" size="small" icon={<MoreVertical className="h-4 w-4" />} />
                              </Dropdown>
                            </div>

                            {/* Student Info */}
                            <div className="space-y-2">
                              <div>
                                <div className="font-medium text-gray-900 truncate" title={student.name}>
                                  {student.name}
                                </div>
                                <div className="text-xs text-gray-500 truncate" title={student.email}>
                                  {student.email}
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <Tag
                                  color={
                                    student.role === "Admin"
                                      ? "red"
                                      : student.role === "Teacher"
                                        ? "blue"
                                        : student.role === "Student"
                                          ? "green"
                                          : "default"
                                  }
                                  className="text-xs"
                                >
                                  {student.role}
                                </Tag>
                                <Badge
                                  status={student.status === "Active" ? "success" : "error"}
                                  text={<span className="text-xs">{student.status}</span>}
                                />
                              </div>

                              {student.department && (
                                <div className="text-xs text-gray-600 truncate">
                                  <span className="font-medium">Dept:</span> {student.department}
                                </div>
                              )}

                              {student.phone && (
                                <div className="text-xs text-gray-600 truncate">
                                  <span className="font-medium">Phone:</span> {student.phone}
                                </div>
                              )}

                              <div className="text-xs text-gray-500">
                                <span className="font-medium">ID:</span> {student.id}
                              </div>

                              {student.lastLogin && (
                                <div className="text-xs text-gray-500">
                                  <span className="font-medium">Last Login:</span> {student.lastLogin}
                                </div>
                              )}
                            </div>

                            {/* Quick Actions */}
                            <div className="mt-3 pt-2 border-t border-gray-100">
                              <div className="flex gap-1">
                                <Button
                                  type="text"
                                  size="small"
                                  icon={<Eye className="h-3 w-3" />}
                                  onClick={() => {
                                    setCurrentUser(student)
                                    setIsProfileDrawerVisible(true)
                                  }}
                                  className="flex-1 text-xs"
                                >
                                  View
                                </Button>
                                <Button
                                  type="text"
                                  size="small"
                                  icon={<Edit className="h-4 w-4" />}
                                  onClick={() => handleEdit(student)}
                                  className="flex-1 text-xs"
                                >
                                  Edit
                                </Button>
                                <Button
                                  type="text"
                                  size="small"
                                  icon={<UserCheck className="h-3 w-3" />}
                                  onClick={() => handleImpersonate(student)}
                                  className="flex-1 text-xs"
                                >
                                  Login
                                </Button>
                              </div>
                            </div>
                          </Card>
                        </Col>
                      ))}
                    </Row>

                    {/* Pagination for Card View */}
                    <div className="mt-4 flex justify-center">
                      <div className="bg-white p-2 rounded border">
                        <span className="text-sm text-gray-600">
                          Showing {filteredStudents.length} of {students.length} users
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </Card>

          <Modal
            title="Add New User"
            open={isAddModalVisible}
            onCancel={() => {
              setIsAddModalVisible(false)
              form.resetFields()
            }}
            footer={null}
            width={800}
          >
            <Form form={form} layout="vertical" onFinish={handleAddUser} className="mt-4">
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
                  <Form.Item name="employeeId" label="Employee/Student ID">
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
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="enrollmentStatus" label="Enrollment Status" initialValue="Enrolled">
                    <Select>
                      {enrollmentStatusOptions.map((status) => (
                        <Option key={status} value={status}>
                          {status}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="groups" label="Initial Groups">
                    <Select mode="multiple" placeholder="Select groups">
                      <Option value="CS-2024">CS-2024</Option>
                      <Option value="Math Faculty">Math Faculty</Option>
                      <Option value="Research Team">Research Team</Option>
                      <Option value="Admin Staff">Admin Staff</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="courses" label="Initial Courses">
                <Select mode="multiple" placeholder="Select courses">
                  <Option value="React Development">React Development</Option>
                  <Option value="Database Systems">Database Systems</Option>
                  <Option value="Calculus I">Calculus I</Option>
                  <Option value="Statistics">Statistics</Option>
                </Select>
              </Form.Item>

              <Form.Item name="notes" label="Notes">
                <TextArea rows={3} placeholder="Additional notes about the user" />
              </Form.Item>

              <Divider />

              <Form.Item name="passwordOption" label="Password Setup" initialValue="auto">
                <Radio.Group>
                  <Radio value="auto">Auto-generate password</Radio>
                  <Radio value="invitation">Send invitation email</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item name="sendInvitation" valuePropName="checked">
                <Checkbox>Send welcome email with login instructions</Checkbox>
              </Form.Item>

              <div className="flex justify-end gap-2 mt-6">
                <Button
                  onClick={() => {
                    setIsAddModalVisible(false)
                    form.resetFields()
                  }}
                >
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Add User
                </Button>
              </div>
            </Form>
          </Modal>

          <Modal
            title="Edit User"
            open={isEditModalVisible}
            onCancel={() => {
              setIsEditModalVisible(false)
              setCurrentUser(null)
              editForm.resetFields()
            }}
            footer={null}
            width={800}
          >
            <Form form={editForm} layout="vertical" onFinish={handleEditUser} className="mt-4">
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
                  <Form.Item name="employeeId" label="Employee/Student ID">
                    <Input placeholder="Employee/Student ID" />
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
                  <Form.Item name="status" label="Status">
                    <Select>
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
                  <Form.Item name="enrollmentStatus" label="Enrollment Status">
                    <Select>
                      {enrollmentStatusOptions.map((status) => (
                        <Option key={status} value={status}>
                          {status}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="groups" label="Groups">
                    <Select mode="multiple" placeholder="Select groups">
                      <Option value="CS-2024">CS-2024</Option>
                      <Option value="Math Faculty">Math Faculty</Option>
                      <Option value="Research Team">Research Team</Option>
                      <Option value="Admin Staff">Admin Staff</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="courses" label="Courses">
                <Select mode="multiple" placeholder="Select courses">
                  <Option value="React Development">React Development</Option>
                  <Option value="Database Systems">Database Systems</Option>
                  <Option value="Calculus I">Calculus I</Option>
                  <Option value="Statistics">Statistics</Option>
                </Select>
              </Form.Item>

              <Form.Item name="notes" label="Notes">
                <TextArea rows={3} placeholder="Additional notes about the user" />
              </Form.Item>

              <div className="flex justify-end gap-2 mt-6">
                <Button
                  onClick={() => {
                    setIsEditModalVisible(false)
                    setCurrentUser(null)
                    editForm.resetFields()
                  }}
                >
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Update User
                </Button>
              </div>
            </Form>
          </Modal>

          <Drawer
            title="User Profile"
            placement="right"
            onClose={() => {
              setIsProfileDrawerVisible(false)
              setCurrentUser(null)
            }}
            open={isProfileDrawerVisible}
            width={600}
          >
            {currentUser && (
              <div>
                <div className="text-center mb-6">
                  <Avatar size={80} className="mb-4 bg-blue-500">
                    {currentUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </Avatar>
                  <h2 className="text-xl font-semibold">{currentUser.name}</h2>
                  <p className="text-gray-600">{currentUser.email}</p>
                  <div className="flex justify-center gap-2 mt-2">
                    <Tag color={currentUser.status === "Active" ? "green" : "red"}>{currentUser.status}</Tag>
                    <Tag color="blue">{currentUser.designation}</Tag>
                  </div>
                </div>

                <Tabs defaultActiveKey="details">
                  <TabPane tab="Details" key="details">
                    <div className="space-y-4">
                      <div>
                        <label className="font-medium text-gray-700">Employee ID:</label>
                        <p>{currentUser.employeeId}</p>
                      </div>
                      <div>
                        <label className="font-medium text-gray-700">Phone:</label>
                        <p>{currentUser.phone || "N/A"}</p>
                      </div>
                      <div>
                        <label className="font-medium text-gray-700">Department:</label>
                        <p>{currentUser.department}</p>
                      </div>
                      <div>
                        <label className="font-medium text-gray-700">Address:</label>
                        <p>{currentUser.address || "N/A"}</p>
                      </div>
                      <div>
                        <label className="font-medium text-gray-700">Enrollment Status:</label>
                        <p>{currentUser.enrollmentStatus}</p>
                      </div>
                      <div>
                        <label className="font-medium text-gray-700">Last Login:</label>
                        <p>
                          {currentUser.lastLogin === "Never"
                            ? "Never"
                            : new Date(currentUser.lastLogin).toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <label className="font-medium text-gray-700">Created:</label>
                        <p>{new Date(currentUser.createdDate).toLocaleString()}</p>
                      </div>
                      <div>
                        <label className="font-medium text-gray-700">Notes:</label>
                        <p>{currentUser.notes || "No notes available"}</p>
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tab="Groups" key="groups">
                    <div>
                      <h4 className="font-medium mb-2">Group Memberships:</h4>
                      {currentUser.groups && currentUser.groups.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {currentUser.groups.map((group) => (
                            <Tag key={group} color="blue">
                              {group}
                            </Tag>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500">No groups assigned</p>
                      )}
                    </div>
                  </TabPane>
                  <TabPane tab="Courses" key="courses">
                    <div>
                      <h4 className="font-medium mb-2">Enrolled Courses:</h4>
                      {currentUser.courses && currentUser.courses.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {currentUser.courses.map((course) => (
                            <Tag key={course} color="green">
                              {course}
                            </Tag>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500">No courses assigned</p>
                      )}
                    </div>
                  </TabPane>
                </Tabs>

                <div className="mt-6 flex gap-2">
                  <Button type="primary" onClick={() => editUser(currentUser)}>
                    Edit User
                  </Button>
                  <Button onClick={() => deactivateUser(currentUser.id)}>Deactivate</Button>
                </div>
              </div>
            )}
          </Drawer>

          <Modal
            title="Advanced Search & Filters"
            open={isAdvancedSearchVisible}
            onCancel={() => setIsAdvancedSearchVisible(false)}
            footer={null}
            width={600}
          >
            <Form form={advancedSearchForm} layout="vertical" onFinish={handleAdvancedSearch} className="mt-4">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="role" label="Role">
                    <Select mode="multiple" placeholder="Select roles">
                      {roleOptions.map((role) => (
                        <Option key={role} value={role}>
                          {role}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="status" label="Status">
                    <Select mode="multiple" placeholder="Select status">
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
                  <Form.Item name="enrollmentStatus" label="Enrollment Status">
                    <Select mode="multiple" placeholder="Select enrollment status">
                      {enrollmentStatusOptions.map((status) => (
                        <Option key={status} value={status}>
                          {status}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="department" label="Department">
                    <Select mode="multiple" placeholder="Select departments">
                      {departmentOptions.map((dept) => (
                        <Option key={dept} value={dept}>
                          {dept}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item name="dateRange" label="Creation Date Range">
                <RangePicker style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item name="groups" label="Groups">
                <Select mode="multiple" placeholder="Select groups">
                  <Option value="CS-2024">CS-2024</Option>
                  <Option value="Math Faculty">Math Faculty</Option>
                  <Option value="Research Team">Research Team</Option>
                  <Option value="Admin Staff">Admin Staff</Option>
                </Select>
              </Form.Item>

              <div className="flex justify-end gap-2 mt-6">
                <Button onClick={() => setIsAdvancedSearchVisible(false)}>Cancel</Button>
                <Button
                  onClick={() => {
                    advancedSearchForm.resetFields()
                    clearFilters()
                  }}
                >
                  Clear All
                </Button>
                <Button type="primary" htmlType="submit">
                  Apply Filters
                </Button>
              </div>
            </Form>
          </Modal>

          <Modal
            title="Bulk Import Users"
            open={isBulkImportVisible}
            onCancel={() => setIsBulkImportVisible(false)}
            footer={null}
            width={600}
          >
            <div className="mt-4">
              <p className="mb-4 text-gray-600">Upload a CSV or Excel file to import multiple users at once.</p>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Required Columns:</h4>
                <ul className="text-sm text-gray-600 list-disc list-inside">
                  <li>name (required)</li>
                  <li>email (required)</li>
                  <li>department (required)</li>
                  <li>designation (required)</li>
                  <li>phone (optional)</li>
                  <li>address (optional)</li>
                  <li>status (optional, defaults to Active)</li>
                </ul>
              </div>

              <Upload.Dragger
                name="file"
                multiple={false}
                accept=".csv,.xlsx,.xls"
                onChange={handleBulkImport}
                beforeUpload={() => false}
              >
                <p className="ant-upload-drag-icon">
                  <UploadIcon className="h-12 w-12 mx-auto text-gray-400" />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for CSV and Excel files. Maximum file size: 10MB</p>
              </Upload.Dragger>

              <div className="mt-4 flex justify-end gap-2">
                <Button onClick={() => setIsBulkImportVisible(false)}>Cancel</Button>
                <Button type="link">Download Template</Button>
              </div>
            </div>
          </Modal>

          <Modal
            title="Audit Log"
            open={isAuditLogVisible}
            onCancel={() => setIsAuditLogVisible(false)}
            footer={null}
            width={800}
          >
            <div className="mt-4">
              <Timeline>
                {auditLogs.map((log) => (
                  <Timeline.Item key={log.id}>
                    <div>
                      <div className="font-medium">{log.action}</div>
                      <div className="text-sm text-gray-600">
                        User: {log.user} | Performed by: {log.performedBy}
                      </div>
                      <div className="text-xs text-gray-500">{new Date(log.timestamp).toLocaleString()}</div>
                      <div className="text-sm mt-1">{log.details}</div>
                    </div>
                  </Timeline.Item>
                ))}
              </Timeline>
            </div>
          </Modal>

          <Modal
            title={confirmModal.title}
            open={confirmModal.visible}
            onOk={confirmModal.onConfirm}
            onCancel={() => setConfirmModal({ visible: false, type: "", data: null })}
            okText="Confirm"
            cancelText="Cancel"
            okButtonProps={{
              danger: ["delete", "bulkDelete", "deactivate", "bulkDeactivate"].includes(confirmModal.type),
            }}
          >
            <p>{confirmModal.content}</p>
          </Modal>

          <Modal
            title="Assign Groups"
            open={bulkActionModal.visible && bulkActionModal.type === "assignGroup"}
            onCancel={() => setBulkActionModal({ visible: false, type: "", selectedUsers: [] })}
            footer={null}
            width={500}
          >
            <Form onFinish={handleBulkGroupAssignment} layout="vertical">
              <p className="mb-4 text-gray-600">
                Assign groups to {bulkActionModal.selectedUsers.length} selected user(s)
              </p>
              <Form.Item
                name="groups"
                label="Select Groups"
                rules={[{ required: true, message: "Please select at least one group" }]}
              >
                <Select mode="multiple" placeholder="Select groups to assign">
                  <Option value="CS-2024">CS-2024</Option>
                  <Option value="Math Faculty">Math Faculty</Option>
                  <Option value="Research Team">Research Team</Option>
                  <Option value="Admin Staff">Admin Staff</Option>
                </Select>
              </Form.Item>
              <div className="flex justify-end gap-2">
                <Button onClick={() => setBulkActionModal({ visible: false, type: "", selectedUsers: [] })}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Assign Groups
                </Button>
              </div>
            </Form>
          </Modal>

          <Modal
            title="Enroll in Courses"
            open={bulkActionModal.visible && bulkActionModal.type === "enrollCourse"}
            onCancel={() => setBulkActionModal({ visible: false, type: "", selectedUsers: [] })}
            footer={null}
            width={500}
          >
            <Form onFinish={handleBulkCourseEnrollment} layout="vertical">
              <p className="mb-4 text-gray-600">
                Enroll {bulkActionModal.selectedUsers.length} selected user(s) in courses
              </p>
              <Form.Item
                name="courses"
                label="Select Courses"
                rules={[{ required: true, message: "Please select at least one course" }]}
              >
                <Select mode="multiple" placeholder="Select courses to enroll">
                  <Option value="React Development">React Development</Option>
                  <Option value="Database Systems">Database Systems</Option>
                  <Option value="Calculus I">Calculus I</Option>
                  <Option value="Statistics">Statistics</Option>
                </Select>
              </Form.Item>
              <div className="flex justify-end gap-2">
                <Button onClick={() => setBulkActionModal({ visible: false, type: "", selectedUsers: [] })}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Enroll in Courses
                </Button>
              </div>
            </Form>
          </Modal>

          <Modal
            title="Change Role"
            open={bulkActionModal.visible && bulkActionModal.type === "changeRole"}
            onCancel={() => setBulkActionModal({ visible: false, type: "", selectedUsers: [] })}
            footer={null}
            width={500}
          >
            <Form onFinish={handleBulkRoleChange} layout="vertical">
              <p className="mb-4 text-gray-600">
                Change role for {bulkActionModal.selectedUsers.length} selected user(s)
              </p>
              <Form.Item name="role" label="New Role" rules={[{ required: true, message: "Please select a role" }]}>
                <Select placeholder="Select new role">
                  {roleOptions.map((role) => (
                    <Option key={role} value={role}>
                      {role}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <div className="flex justify-end gap-2">
                <Button onClick={() => setBulkActionModal({ visible: false, type: "", selectedUsers: [] })}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Change Role
                </Button>
              </div>
            </Form>
          </Modal>

          <Modal
            title="Send Email"
            open={bulkActionModal.visible && bulkActionModal.type === "sendEmail"}
            onCancel={() => setBulkActionModal({ visible: false, type: "", selectedUsers: [] })}
            footer={null}
            width={600}
          >
            <Form onFinish={handleBulkEmail} layout="vertical">
              <p className="mb-4 text-gray-600">
                Send email to {bulkActionModal.selectedUsers.length} selected user(s)
              </p>
              <Form.Item
                name="subject"
                label="Subject"
                rules={[{ required: true, message: "Please enter email subject" }]}
              >
                <Input placeholder="Enter email subject" />
              </Form.Item>
              <Form.Item
                name="message"
                label="Message"
                rules={[{ required: true, message: "Please enter email message" }]}
              >
                <TextArea rows={4} placeholder="Enter your message" />
              </Form.Item>
              <div className="flex justify-end gap-2">
                <Button onClick={() => setBulkActionModal({ visible: false, type: "", selectedUsers: [] })}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Send Email
                </Button>
              </div>
            </Form>
          </Modal>
        </div>
      </div>

      <Modal
        title="Confirm User Impersonation"
        open={impersonationModal.visible}
        onOk={confirmImpersonation}
        onCancel={cancelImpersonation}
        okText="Confirm"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
      >
        {impersonationModal.user && (
          <div>
            <Alert
              message="Security Warning"
              description={`You are about to impersonate ${impersonationModal.user.name} (${impersonationModal.user.designation}). All actions are logged.`}
              type="warning"
              showIcon
              style={{ marginBottom: 16 }}
            />

            <div style={{ marginBottom: 16 }}>
              <strong>User Details:</strong>
              <div style={{ marginTop: 8, padding: 12, backgroundColor: "#f5f5f5", borderRadius: 4 }}>
                <div>
                  <strong>Name:</strong> {impersonationModal.user.name}
                </div>
                <div>
                  <strong>Role:</strong> {impersonationModal.user.designation}
                </div>
                <div>
                  <strong>Email:</strong> {impersonationModal.user.email}
                </div>
              </div>
            </div>

            <div>
              <label style={{ display: "block", marginBottom: 8, fontWeight: "bold" }}>
                Reason for Impersonation (Optional):
              </label>
              <Input.TextArea
                rows={3}
                placeholder="Enter reason for impersonation..."
                value={impersonationModal.reason}
                onChange={(e) => setImpersonationModal((prev) => ({ ...prev, reason: e.target.value }))}
              />
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

const StudentsManagementWithImpersonation = () => (
  <ImpersonationProvider>
    <StudentsManagement />
  </ImpersonationProvider>
)

export default StudentsManagementWithImpersonation
