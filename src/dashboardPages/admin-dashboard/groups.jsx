/* eslint-disable no-unused-vars */
"use client"

import { useState } from "react"
import {
  MoreVertical,
  Edit,
  AlertTriangle,
  Plus,
  Filter,
  Download,
  Eye,
  Users,
  BookOpen,
  Trash2,
  Settings,
  CheckCircle,
  XCircle,
} from "lucide-react"
import {
  Table,
  Button,
  Space,
  Tag,
  Dropdown,
  Input,
  Select,
  Checkbox,
  Pagination,
  Card,
  Avatar,
  Modal,
  message,
  Form,
  Upload,
  Progress,
  Divider,
  List,
  Typography,
  Row,
  Col,
} from "antd"
import { UploadOutlined } from "@ant-design/icons"

const { Search: AntSearch } = Input
const { Option } = Select
const { TextArea } = Input
const { Title, Text } = Typography

const GroupsPage = () => {
  // View and UI state
  const [viewMode, setViewMode] = useState("table")
  const [showFilters, setShowFilters] = useState(false)
  const [tableLoading, setTableLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showGroupModal, setShowGroupModal] = useState(false)
  const [showMembersModal, setShowMembersModal] = useState(false)
  const [showBulkAddModal, setShowBulkAddModal] = useState(false)
  const [showBulkAssignCoursesModal, setShowBulkAssignCoursesModal] = useState(false)
  const [showAssignCoursesModal, setShowAssignCoursesModal] = useState(false)
  const [showManageGroupsModal, setShowManageGroupsModal] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState(null)

  // Selection and bulk actions
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [selectedGroups, setSelectedGroups] = useState([])

  const [showBulkDeleteConfirm, setShowBulkDeleteConfirm] = useState(false);




  // Search and filters
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    branch: "all",
    size: "all",
    status: "all",
    course: "all",
  })

  // Form states
  const [profileImage, setProfileImage] = useState("/placeholder.svg?height=100&width=100")
  const [editProfileImage, setEditProfileImage] = useState(null)
  const [openDropdownId, setOpenDropdownId] = useState(null)
  const [createForm] = Form.useForm()
  const [editForm] = Form.useForm()

  // Enhanced groups data with additional fields
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Advanced React Development",
      groupId: "#GRP001",
      description: "Advanced concepts in React including hooks, context, and performance optimization",
      branch: "Computer Science",
      department: "Software Engineering",
      memberCount: 25,
      maxMembers: 30,
      createdDate: "2024-01-15",
      lastModified: "2024-01-20",
      status: "Active",
      instructor: "Dr. Sarah Johnson",
      courses: ["React Fundamentals", "Advanced JavaScript"],
      tags: ["Programming", "Frontend", "JavaScript"],
      location: "Room 301",
      timing: "Mon, Wed 2:00 PM - 4:00 PM",
      code: "REACT2024",
      link: "https://classroom.example.com/react-advanced",
      progress: 75,
      image: "/placeholder.svg?height=64&width=64",
      members: [
        { id: 1, name: "John Doe", email: "john@example.com", role: "Student" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Student" },
        { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "TA" },
      ],
    },
    {
      id: 2,
      name: "Data Science Fundamentals",
      groupId: "#GRP002",
      description: "Introduction to data science, statistics, and machine learning concepts",
      branch: "Mathematics",
      department: "Statistics",
      memberCount: 18,
      maxMembers: 25,
      createdDate: "2024-01-10",
      lastModified: "2024-01-18",
      status: "Active",
      instructor: "Prof. Michael Chen",
      courses: ["Statistics 101", "Python for Data Science"],
      tags: ["Data Science", "Statistics", "Python"],
      location: "Lab 205",
      timing: "Tue, Thu 10:00 AM - 12:00 PM",
      code: "DS2024",
      link: "https://classroom.example.com/data-science",
      progress: 60,
      image: "/placeholder.svg?height=64&width=64",
      members: [
        { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Student" },
        { id: 5, name: "Bob Wilson", email: "bob@example.com", role: "Student" },
      ],
    },
    {
      id: 3,
      name: "Mobile App Development",
      groupId: "#GRP003",
      description: "Cross-platform mobile development using React Native and Flutter",
      branch: "Computer Science",
      department: "Mobile Development",
      memberCount: 22,
      maxMembers: 28,
      createdDate: "2024-01-05",
      lastModified: "2024-01-22",
      status: "Active",
      instructor: "Dr. Emily Rodriguez",
      courses: ["React Native Basics", "Flutter Development"],
      tags: ["Mobile", "React Native", "Flutter"],
      location: "Room 405",
      timing: "Fri 1:00 PM - 5:00 PM",
      code: "MOBILE2024",
      link: "https://classroom.example.com/mobile-dev",
      progress: 45,
      image: "/placeholder.svg?height=64&width=64",
      members: [
        { id: 6, name: "Chris Davis", email: "chris@example.com", role: "Student" },
        { id: 7, name: "Diana Lee", email: "diana@example.com", role: "Student" },
      ],
    },
  ])

  // Options for filters and forms
  const branchOptions = ["Computer Science", "Mathematics", "Engineering", "Business"]
  const departmentOptions = ["Software Engineering", "Statistics", "Mobile Development", "Web Development"]
  const courseOptions = ["React Fundamentals", "Advanced JavaScript", "Statistics 101", "Python for Data Science"]
  const statusOptions = ["Active", "Inactive", "Archived"]
  const sizeOptions = ["Small (1-10)", "Medium (11-25)", "Large (26-50)", "Extra Large (50+)"]

  // Sample people for member management
  const availableMembers = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", role: "Student" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", role: "Student" },
    { id: 3, name: "Robert Johnson", email: "robert.j@example.com", role: "Student" },
    { id: 4, name: "Emily Davis", email: "emily.d@example.com", role: "Student" },
    { id: 5, name: "Michael Wilson", email: "michael.w@example.com", role: "TA" },
    { id: 6, name: "Sarah Brown", email: "sarah.b@example.com", role: "Student" },
    { id: 7, name: "David Lee", email: "david.l@example.com", role: "Student" },
    { id: 8, name: "Lisa Wang", email: "lisa.w@example.com", role: "Student" },
  ]

  // Modal handlers
  const openCreateModal = () => {
    setShowCreateModal(true)
    createForm.resetFields()
    setProfileImage("/placeholder.svg?height=100&width=100")
  }

  const closeCreateModal = () => {
    setShowCreateModal(false)
    createForm.resetFields()
    setProfileImage("/placeholder.svg?height=100&width=100")
  }

  const openEditModal = (group) => {
    setSelectedGroup(group)
    setEditProfileImage(group.image)
    editForm.setFieldsValue({
      name: group.name,
      description: group.description,
      branch: group.branch,
      department: group.department,
      maxMembers: group.maxMembers,
      instructor: group.instructor,
      courses: group.courses,
      tags: group.tags,
      location: group.location,
      timing: group.timing,
      code: group.code,
      link: group.link,
    })
    setShowEditModal(true)
  }

  const closeEditModal = () => {
    setShowEditModal(false)
    setSelectedGroup(null)
    setEditProfileImage(null)
    editForm.resetFields()
  }

  const openDeleteModal = (group) => {
    setSelectedGroup(group)
    setShowDeleteModal(true)
  }

  const closeDeleteModal = () => {
    setShowDeleteModal(false)
    setSelectedGroup(null)
  }

  const openGroupModal = (group) => {
    setSelectedGroup(group)
    setShowGroupModal(true)
  }

  const closeGroupModal = () => {
    setShowGroupModal(false)
    setSelectedGroup(null)
  }

  const openMembersModal = (group) => {
    setSelectedGroup(group)
    setShowMembersModal(true)
  }

  const closeMembersModal = () => {
    setShowMembersModal(false)
    setSelectedGroup(null)
  }

  const openManageGroupsModal = () => {
    setShowManageGroupsModal(true)
  }

  const closeManageGroupsModal = () => {
    setShowManageGroupsModal(false)
  }

  // Image upload handlers
  const handleImageChange = (info) => {
    if (info.file.status === "done" || info.file.originFileObj) {
      const file = info.file.originFileObj || info.file
      const imageUrl = URL.createObjectURL(file)
      setProfileImage(imageUrl)
    }
  }

  const handleEditImageChange = (info) => {
    if (info.file.status === "done" || info.file.originFileObj) {
      const file = info.file.originFileObj || info.file
      const imageUrl = URL.createObjectURL(file)
      setEditProfileImage(imageUrl)
    }
  }

  // CRUD operations
  const handleCreateGroup = (values) => {
    const newGroup = {
      id: groups.length + 1,
      groupId: `#GRP${String(groups.length + 1).padStart(3, "0")}`,
      createdDate: new Date().toISOString().split("T")[0],
      lastModified: new Date().toISOString().split("T")[0],
      status: "Active",
      memberCount: values.initialMembers ? values.initialMembers.length : 0,
      progress: 0,
      image: profileImage,
      members: values.initialMembers
        ? availableMembers.filter((member) => values.initialMembers.includes(member.id))
        : [],
      tags: values.tags || [],
      ...values,
    }

    setGroups([...groups, newGroup])
    closeCreateModal()
    message.success("Group created successfully")
  }

  const handleEditSubmit = (values) => {
    if (!selectedGroup) return

    const updatedGroups = groups.map((group) => {
      if (group.id === selectedGroup.id) {
        return {
          ...group,
          ...values,
          maxMembers: Number.parseInt(values.maxMembers),
          image: editProfileImage || group.image,
          lastModified: new Date().toISOString().split("T")[0],
        }
      }
      return group
    })

    setGroups(updatedGroups)
    closeEditModal()
    message.success("Group updated successfully")
  }

  const handleDeleteGroup = () => {
    if (!selectedGroup) {
      console.warn("No group selected for deletion")
      return
    }

    const updatedGroups = groups.filter((group) => group.id !== selectedGroup.id)
    setGroups(updatedGroups)
    closeDeleteModal()
    message.success("Group deleted successfully")
  }

  // Member management
  const handleAddMember = (groupId, memberId) => {
    const member = availableMembers.find((m) => m.id === memberId)
    if (!member) return

    const updatedGroups = groups.map((group) => {
      if (group.id === groupId) {
        const memberExists = group.members.some((m) => m.id === memberId)
        if (!memberExists) {
          return {
            ...group,
            members: [...group.members, member],
            memberCount: group.memberCount + 1,
            lastModified: new Date().toISOString().split("T")[0],
          }
        }
      }
      return group
    })

    setGroups(updatedGroups)
    message.success(`${member.name} added to group`)
  }

  const handleRemoveMember = (groupId, memberId) => {
    const updatedGroups = groups.map((group) => {
      if (group.id === groupId) {
        const updatedMembers = group.members.filter((m) => m.id !== memberId)
        return {
          ...group,
          members: updatedMembers,
          memberCount: updatedMembers.length,
          lastModified: new Date().toISOString().split("T")[0],
        }
      }
      return group
    })

    setGroups(updatedGroups)
    message.success("Member removed from group")
  }

  // Bulk actions
  const handleBulkAction = (action) => {
    switch (action) {
      case "activate":
        {
          const updatedActiveGroups = groups.map((group) => {
            if (selectedGroups.includes(group.id)) {
              return { ...group, status: "Active" };
            }
            return group;
          });
          setGroups(updatedActiveGroups);
          setSelectedGroups([]);
          setSelectedRowKeys([]);
          message.success(`${selectedGroups.length} group(s) activated successfully`);
          break;
        }

      case "deactivate":
        {
          const updatedInactiveGroups = groups.map((group) => {
            if (selectedGroups.includes(group.id)) {
              return { ...group, status: "Inactive" };
            }
            return group;
          });
          setGroups(updatedInactiveGroups);
          setSelectedGroups([]);
          setSelectedRowKeys([]);
          message.success(`${selectedGroups.length} group(s) deactivated successfully`);
          break;
        }

      case "delete":
        setShowBulkDeleteConfirm(true);
        break;

      case "assignCourses":
        setShowBulkAssignCoursesModal(true);
        break;

      case "addMembers":
        setShowBulkAddModal(true);
        break;

      default:
        break;
    }
  };

  const handleBulkAssignCourses = (courseIds) => {
    const updatedGroups = groups.map((group) => {
      if (selectedGroups.includes(group.id)) {
        const existingCourses = group.courses || []
        const newCourses = [...new Set([...existingCourses, ...courseIds])]
        return {
          ...group,
          courses: newCourses,
          lastModified: new Date().toISOString().split("T")[0],
        }
      }
      return group
    })

    setGroups(updatedGroups)
    setSelectedGroups([])
    setSelectedRowKeys([])
    setShowBulkAssignCoursesModal(false)
    message.success(`Courses assigned to ${selectedGroups.length} group(s) successfully`)
  }

  const exportToCSV = () => {
    const csvContent = [
      ["Name", "Group ID", "Branch", "Department", "Members", "Status", "Created", "Modified"],
      ...filteredGroups.map((group) => [
        group.name,
        group.groupId,
        group.branch,
        group.department,
        `${group.memberCount}/${group.maxMembers}`,
        group.status,
        group.createdDate,
        group.lastModified,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "groups.csv"
    a.click()
    URL.revokeObjectURL(url)
    message.success("Groups data exported successfully")
  }

  // Filter and search logic
  const filteredGroups = groups.filter((group) => {
    const matchesSearch =
      searchTerm === "" ||
      group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesBranch = filters.branch === "all" || group.branch === filters.branch
    const matchesStatus = filters.status === "all" || group.status === filters.status
    const matchesCourse = filters.course === "all" || group.courses.includes(filters.course)

    let matchesSize = true
    if (filters.size !== "all") {
      const memberCount = group.memberCount
      switch (filters.size) {
        case "Small (1-10)":
          matchesSize = memberCount >= 1 && memberCount <= 10
          break
        case "Medium (11-25)":
          matchesSize = memberCount >= 11 && memberCount <= 25
          break
        case "Large (26-50)":
          matchesSize = memberCount >= 26 && memberCount <= 50
          break
        case "Extra Large (50+)":
          matchesSize = memberCount > 50
          break
      }
    }

    return matchesSearch && matchesBranch && matchesStatus && matchesCourse && matchesSize
  })

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedGroups = filteredGroups.slice(startIndex, endIndex)

  // Action items for dropdown
  const getActionItems = (group) => [
    {
      key: "view",
      label: "View Details",
      icon: <Eye className="h-4 w-4" />,
      onClick: (e) => {
        e?.stopPropagation?.()
        openGroupModal(group)
      },
    },
    {
      key: "edit",
      label: "Edit Group",
      icon: <Edit className="h-4 w-4" />,
      onClick: (e) => {
        e?.stopPropagation?.()
        openEditModal(group)
      },
    },
    {
      key: "members",
      label: "Manage Members",
      icon: <Users className="h-4 w-4" />,
      onClick: (e) => {
        e?.stopPropagation?.()
        openMembersModal(group)
      },
    },
    {
      key: "courses",
      label: "Assign Courses",
      icon: <BookOpen className="h-4 w-4" />,
      onClick: (e) => {
        e?.stopPropagation?.()
        openAssignCoursesModal(group)
      },
    },
    {
      type: "divider",
    },
    {
      key: "delete",
      label: "Delete Group",
      icon: <Trash2 className="h-4 w-4" />,
      danger: true,
      onClick: (e) => {
        e?.stopPropagation?.()
        openDeleteModal(group)
      },
    },
  ]

  const openAssignCoursesModal = (group) => {
    setSelectedGroup(group)
    setShowAssignCoursesModal(true)
  }

  const closeAssignCoursesModal = () => {
    setShowAssignCoursesModal(false)
    setSelectedGroup(null)
  }

  const handleAssignCourses = (courseIds) => {
    if (!selectedGroup) return

    const updatedGroups = groups.map((group) => {
      if (group.id === selectedGroup.id) {
        const existingCourses = group.courses || []
        const newCourses = [...new Set([...existingCourses, ...courseIds])]
        return {
          ...group,
          courses: newCourses,
          lastModified: new Date().toISOString().split("T")[0],
        }
      }
      return group
    })

    setGroups(updatedGroups)
    closeAssignCoursesModal()
    message.success("Courses assigned successfully")
  }

  // Table columns
  const columns = [
    {
      title: "Group",
      dataIndex: "name",
      key: "name",
      width: 250,
      render: (text, record) => (
        <div className="flex items-center gap-3">
          <Avatar size={40} src={record.image} className="bg-gray-200">
            {text.charAt(0)}
          </Avatar>
          <div>
            <div className="font-medium text-gray-900">{text}</div>
            <div className="text-sm text-gray-500">{record.groupId}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 200,
      render: (text) => (
        <div className="text-sm text-gray-600 line-clamp-2" title={text}>
          {text}
        </div>
      ),
    },
    {
      title: "Branch/Dept",
      key: "branch",
      width: 150,
      render: (_, record) => (
        <div>
          <div className="text-sm font-medium">{record.branch}</div>
          <div className="text-xs text-gray-500">{record.department}</div>
        </div>
      ),
    },
    {
      title: "Members",
      key: "members",
      width: 100,
      render: (_, record) => (
        <div className="text-center">
          <div className="text-sm font-medium">
            {record.memberCount}/{record.maxMembers}
          </div>
          <Progress
            percent={(record.memberCount / record.maxMembers) * 100}
            size="small"
            showInfo={false}
            strokeColor="#1890ff"
          />
        </div>
      ),
    },
    {
      title: "Created/Modified",
      key: "dates",
      width: 120,
      render: (_, record) => (
        <div className="text-xs">
          <div>Created: {record.createdDate}</div>
          <div className="text-gray-500">Modified: {record.lastModified}</div>
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
          style={{
            backgroundColor: status === "Active" ? "#f6ffed" : status === "Inactive" ? "#fff7e6" : "#fff2f0",
            borderColor: status === "Active" ? "#b7eb8f" : status === "Inactive" ? "#ffd591" : "#ffb3b3",
            color: status === "Active" ? "#52c41a" : status === "Inactive" ? "#fa8c16" : "#ff4d4f",
          }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 60,
      render: (_, record) => (
        <Dropdown menu={{ items: getActionItems(record) }} trigger={["click"]}>
          <Button type="text" icon={<MoreVertical className="h-4 w-4" />} />
        </Dropdown>
      ),
    },
  ]

  // Row selection for table
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys)
      setSelectedGroups(selectedRowKeys)
    },
  }

  const bulkActions = [
    {
      key: "activate",
      label: "Activate Groups",
      icon: <CheckCircle className="h-4 w-4" />,
    },
    {
      key: "deactivate",
      label: "Deactivate Groups",
      icon: <XCircle className="h-4 w-4" />,
    },
    {
      key: "delete",
      label: "Delete Groups",
      icon: <Trash2 className="h-4 w-4" />,
      danger: true,
    },
    {
      key: "assignCourses",
      label: "Assign Courses",
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      key: "addMembers",
      label: "Add Members",
      icon: <Users className="h-4 w-4" />,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen relative">
      <Modal
        title={`Delete ${selectedGroups.length} group(s)?`}
        open={showBulkDeleteConfirm}
        onCancel={() => setShowBulkDeleteConfirm(false)}
        onOk={() => {
          const updatedGroups = groups.filter((group) => !selectedGroups.includes(group.id));
          setGroups(updatedGroups);
          setSelectedGroups([]);
          setSelectedRowKeys([]);
          setShowBulkDeleteConfirm(false);
          message.success(`${selectedGroups.length} group(s) deleted successfully`);
        }}
        okText="Delete"
        okType="danger"
      >
        <div className="flex flex-col items-center py-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <p className="text-center text-gray-600 mb-2">
            Are you sure you want to delete {selectedGroups.length} selected group(s)?
          </p>
          <p className="text-center text-gray-500 text-sm">
            This action cannot be undone. All group data will be permanently deleted.
          </p>
        </div>
      </Modal>
      <div className="flex-1">
        <div className="max-w-full w-full mx-auto p-3">
          {/* Header */}
          <div className="flex justify-between md:items-center items-start flex-col gap-4 w-full md:flex-row mb-6">
            <div className="flex items-center justify-between w-full gap-4">
              <h1 className="md:text-2xl text-xl font-semibold">Manage Groups</h1>
              <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("table")}
                  className={`px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm transition-colors ${viewMode === "table" ? "bg-white text-blue-700 shadow-sm" : "text-gray-600"
                    }`}
                >
                  Table
                </button>
                <button
                  onClick={() => setViewMode("card")}
                  className={`px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm transition-colors ${viewMode === "card" ? "bg-white text-blue-700 shadow-sm" : "text-gray-600"
                    }`}
                >
                  Cards
                </button>
              </div>
            </div>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center w-full gap-3 flex-wrap mb-4">
            <div className="flex-1 min-w-[200px]">
              <AntSearch
                placeholder="Search groups by name, description, branch, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: "100%" }}
              />
            </div>

            <div className="flex items-center gap-2">
              <Button icon={<Filter size={16} />} onClick={() => setShowFilters(!showFilters)}>
                <span className="hidden sm:inline">Filters</span>
              </Button>

              <Button icon={<Plus size={16} />} onClick={openCreateModal} type="primary">
                <span className="hidden sm:inline">Add Group</span>
              </Button>

              <Button icon={<Download size={16} />} onClick={exportToCSV} type="primary" ghost>
                <span className="hidden sm:inline">Export</span>
              </Button>

              <Button icon={<Settings size={16} />} onClick={openManageGroupsModal} type="default">
                <span className="hidden sm:inline">Manage Groups</span>
              </Button>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <Card className="mb-4" size="small">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                  <Select
                    value={filters.branch}
                    onChange={(value) => setFilters((prev) => ({ ...prev, branch: value }))}
                    style={{ width: "100%" }}
                    size="small"
                  >
                    <Option value="all">All Branches</Option>
                    {branchOptions.map((branch) => (
                      <Option key={branch} value={branch}>
                        {branch}
                      </Option>
                    ))}
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Group Size</label>
                  <Select
                    value={filters.size}
                    onChange={(value) => setFilters((prev) => ({ ...prev, size: value }))}
                    style={{ width: "100%" }}
                    size="small"
                  >
                    <Option value="all">All Sizes</Option>
                    {sizeOptions.map((size) => (
                      <Option key={size} value={size}>
                        {size}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                  <Select
                    value={filters.course}
                    onChange={(value) => setFilters((prev) => ({ ...prev, course: value }))}
                    style={{ width: "100%" }}
                    size="small"
                  >
                    <Option value="all">All Courses</Option>
                    {courseOptions.map((course) => (
                      <Option key={course} value={course}>
                        {course}
                      </Option>
                    ))}
                  </Select>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <Button
                  onClick={() => setFilters({ branch: "all", size: "all", status: "all", course: "all" })}
                  type="link"
                  size="small"
                >
                  Clear Filters
                </Button>
              </div>
            </Card>
          )}

          {/* Bulk Actions */}
          {selectedGroups.length > 1 && (
            <Card className="mb-4 bg-blue-50 border-blue-200" size="small">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <span className="text-sm text-blue-700">{selectedGroups.length} group(s) selected</span>
                <Space wrap>
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
                    icon={<XCircle size={14} />}
                    size="small"
                    type="primary"
                    danger
                    ghost
                  >
                    Deactivate
                  </Button>
                  <Button
                    onClick={() => handleBulkAction("assignCourses")}
                    icon={<BookOpen size={14} />}
                    size="small"
                    type="primary"
                    ghost
                  >
                    Assign Courses
                  </Button>
                  <Button
                    onClick={() => handleBulkAction("addMembers")}
                    icon={<Users size={14} />}
                    size="small"
                    type="primary"
                    ghost
                  >
                    Add Members
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
                </Space>
              </div>
            </Card>
          )}

          {/* Content based on view mode */}
          {viewMode === "table" ? (
            <Card>
              <Table
                columns={columns}
                dataSource={paginatedGroups}
                rowKey="id"
                rowSelection={rowSelection}
                pagination={false}
                loading={tableLoading}
                scroll={{ x: 800 }}
              />
              <div className="flex justify-between items-center mt-4">
                <div className="text-sm text-gray-500">
                  Showing {startIndex + 1} to {Math.min(endIndex, filteredGroups.length)} of {filteredGroups.length}{" "}
                  groups
                </div>
                <Pagination
                  current={currentPage}
                  total={filteredGroups.length}
                  pageSize={itemsPerPage}
                  showSizeChanger
                  showQuickJumper
                  onChange={(page, size) => {
                    setCurrentPage(page)
                    setItemsPerPage(size)
                  }}
                />
              </div>
            </Card>
          ) : (
            <div>
              <Row gutter={[16, 16]}>
                {paginatedGroups.map((group) => (
                  <Col key={group.id} xs={24} sm={12} lg={8} xl={6}>
                    <GroupCard
                      group={group}
                      selectedGroups={selectedGroups}
                      setSelectedGroups={setSelectedGroups}
                      selectedRowKeys={selectedRowKeys}
                      setSelectedRowKeys={setSelectedRowKeys}
                      getActionItems={getActionItems}
                      openGroupModal={openGroupModal}
                    />
                  </Col>
                ))}
              </Row>
              <div className="flex justify-center mt-6">
                <Pagination
                  current={currentPage}
                  total={filteredGroups.length}
                  pageSize={itemsPerPage}
                  showSizeChanger
                  showQuickJumper
                  onChange={(page, size) => {
                    setCurrentPage(page)
                    setItemsPerPage(size)
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Group Modal */}
      <Modal title="Create New Group" open={showCreateModal} onCancel={closeCreateModal} footer={null} width={600}>
        <Form form={createForm} layout="vertical" onFinish={handleCreateGroup} className="mt-4">
          <div className="flex flex-col items-center mb-6">
            <div className="relative w-24 h-24 mb-3 bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden">
              <img src={profileImage || "/placeholder.svg"} alt="Group" className="w-full h-full object-cover" />
            </div>
            <Upload showUploadList={false} beforeUpload={() => false} onChange={handleImageChange}>
              <Button size="small" icon={<UploadOutlined />}>
                Upload Picture
              </Button>
            </Upload>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item label="Group Name" name="name" rules={[{ required: true, message: "Please enter group name" }]}>
              <Input placeholder="Enter group name" />
            </Form.Item>

            <Form.Item label="Branch" name="branch" rules={[{ required: true, message: "Please select branch" }]}>
              <Select placeholder="Select branch">
                {branchOptions.map((branch) => (
                  <Option key={branch} value={branch}>
                    {branch}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              label="Department"
              name="department"
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

            <Form.Item
              label="Max Members"
              name="maxMembers"
              rules={[{ required: true, message: "Please enter max members" }]}
            >
              <Input type="number" placeholder="Enter max members" />
            </Form.Item>

            <Form.Item
              label="Instructor"
              name="instructor"
              rules={[{ required: true, message: "Please enter instructor name" }]}
            >
              <Input placeholder="Enter instructor name" />
            </Form.Item>

            <Form.Item label="Location" name="location">
              <Input placeholder="Enter location" />
            </Form.Item>

            <Form.Item label="Timing" name="timing">
              <Input placeholder="e.g., Mon, Wed 2:00 PM - 4:00 PM" />
            </Form.Item>

            <Form.Item label="Group Code" name="code">
              <Input placeholder="Enter group code" />
            </Form.Item>
          </div>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <TextArea rows={3} placeholder="Enter group description" />
          </Form.Item>

          <Form.Item label="Associated Courses" name="courses">
            <Select mode="multiple" placeholder="Select courses">
              {courseOptions.map((course) => (
                <Option key={course} value={course}>
                  {course}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Tags" name="tags">
            <Select mode="tags" placeholder="Enter tags">
              <Option value="Programming">Programming</Option>
              <Option value="Frontend">Frontend</Option>
              <Option value="Backend">Backend</Option>
              <Option value="Mobile">Mobile</Option>
              <Option value="Data Science">Data Science</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Initial Members" name="initialMembers">
            <Select mode="multiple" placeholder="Select initial members">
              {availableMembers.map((member) => (
                <Option key={member.id} value={member.id}>
                  {member.name} ({member.email})
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Group Link" name="link">
            <Input placeholder="Enter group link (optional)" />
          </Form.Item>

          <div className="flex justify-end gap-2 mt-6">
            <Button onClick={closeCreateModal}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Create Group
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Edit Group Modal */}
      <Modal title="Edit Group" open={showEditModal} onCancel={closeEditModal} footer={null} width={600}>
        {selectedGroup && (
          <Form form={editForm} layout="vertical" onFinish={handleEditSubmit} className="mt-4">
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-24 h-24 mb-3 bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden">
                <img src={editProfileImage || "/placeholder.svg"} alt="Group" className="w-full h-full object-cover" />
              </div>
              <Upload showUploadList={false} beforeUpload={() => false} onChange={handleEditImageChange}>
                <Button size="small" icon={<UploadOutlined />}>
                  Change Picture
                </Button>
              </Upload>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                label="Group Name"
                name="name"
                rules={[{ required: true, message: "Please enter group name" }]}
              >
                <Input placeholder="Enter group name" />
              </Form.Item>

              <Form.Item label="Branch" name="branch" rules={[{ required: true, message: "Please select branch" }]}>
                <Select placeholder="Select branch">
                  {branchOptions.map((branch) => (
                    <Option key={branch} value={branch}>
                      {branch}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Department"
                name="department"
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

              <Form.Item
                label="Max Members"
                name="maxMembers"
                rules={[{ required: true, message: "Please enter max members" }]}
              >
                <Input type="number" placeholder="Enter max members" />
              </Form.Item>

              <Form.Item
                label="Instructor"
                name="instructor"
                rules={[{ required: true, message: "Please enter instructor name" }]}
              >
                <Input placeholder="Enter instructor name" />
              </Form.Item>

              <Form.Item label="Location" name="location">
                <Input placeholder="Enter location" />
              </Form.Item>

              <Form.Item label="Timing" name="timing">
                <Input placeholder="e.g., Mon, Wed 2:00 PM - 4:00 PM" />
              </Form.Item>

              <Form.Item label="Group Code" name="code">
                <Input placeholder="Enter group code" />
              </Form.Item>
            </div>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please enter description" }]}
            >
              <TextArea rows={3} placeholder="Enter group description" />
            </Form.Item>

            <Form.Item label="Associated Courses" name="courses">
              <Select mode="multiple" placeholder="Select courses">
                {courseOptions.map((course) => (
                  <Option key={course} value={course}>
                    {course}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Tags" name="tags">
              <Select mode="tags" placeholder="Enter tags">
                <Option value="Programming">Programming</Option>
                <Option value="Frontend">Frontend</Option>
                <Option value="Backend">Backend</Option>
                <Option value="Mobile">Mobile</Option>
                <Option value="Data Science">Data Science</Option>
              </Select>
            </Form.Item>

            <Form.Item label="Group Link" name="link">
              <Input placeholder="Enter group link (optional)" />
            </Form.Item>

            <div className="flex justify-end gap-2 mt-6">
              <Button onClick={closeEditModal}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
            </div>
          </Form>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Delete Group"
        open={showDeleteModal}
        onCancel={closeDeleteModal}
        footer={[
          <Button key="cancel" onClick={closeDeleteModal}>
            Cancel
          </Button>,
          <Button key="delete" type="primary" danger onClick={handleDeleteGroup}>
            Delete Group
          </Button>,
        ]}
      >
        {selectedGroup && (
          <div className="flex flex-col items-center py-4">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
            <p className="text-center text-gray-600 mb-2">
              Are you sure you want to delete <span className="font-semibold">{selectedGroup.name}</span>?
            </p>
            <p className="text-center text-gray-500 text-sm">
              This action cannot be undone. All group data will be permanently deleted.
            </p>
          </div>
        )}
      </Modal>

      {/* Group Details Modal */}
      <Modal
        title="Group Details"
        open={showGroupModal}
        onCancel={closeGroupModal}
        footer={[
          <Button key="close" onClick={closeGroupModal}>
            Close
          </Button>,
          <Button
            key="edit"
            type="primary"
            onClick={() => {
              closeGroupModal()
              openEditModal(selectedGroup)
            }}
          >
            Edit Group
          </Button>,
        ]}
        width={700}
      >
        {selectedGroup && (
          <div className="py-4">
            <div className="flex items-center gap-4 mb-6">
              <Avatar size={64} src={selectedGroup.image} className="bg-gray-200">
                {selectedGroup.name.charAt(0)}
              </Avatar>
              <div>
                <Title level={3} className="mb-1">
                  {selectedGroup.name}
                </Title>
                <Text type="secondary">{selectedGroup.groupId}</Text>
                <div className="mt-2">
                  <Tag
                    style={{
                      backgroundColor: selectedGroup.status === "Active" ? "#f6ffed" : "#fff7e6",
                      borderColor: selectedGroup.status === "Active" ? "#b7eb8f" : "#ffd591",
                      color: selectedGroup.status === "Active" ? "#52c41a" : "#fa8c16",
                    }}
                  >
                    {selectedGroup.status}
                  </Tag>
                </div>
              </div>
            </div>

            <Divider />

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div className="space-y-3">
                  <div>
                    <Text strong>Description:</Text>
                    <div className="mt-1">{selectedGroup.description}</div>
                  </div>
                  <div>
                    <Text strong>Branch:</Text>
                    <div className="mt-1">{selectedGroup.branch}</div>
                  </div>
                  <div>
                    <Text strong>Department:</Text>
                    <div className="mt-1">{selectedGroup.department}</div>
                  </div>
                  <div>
                    <Text strong>Instructor:</Text>
                    <div className="mt-1">{selectedGroup.instructor}</div>
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div className="space-y-3">
                  <div>
                    <Text strong>Members:</Text>
                    <div className="mt-1">
                      {selectedGroup.memberCount}/{selectedGroup.maxMembers}
                    </div>
                  </div>
                  <div>
                    <Text strong>Location:</Text>
                    <div className="mt-1">{selectedGroup.location || "Not specified"}</div>
                  </div>
                  <div>
                    <Text strong>Timing:</Text>
                    <div className="mt-1">{selectedGroup.timing || "Not specified"}</div>
                  </div>
                  <div>
                    <Text strong>Code:</Text>
                    <div className="mt-1">{selectedGroup.code || "Not specified"}</div>
                  </div>
                </div>
              </Col>
            </Row>

            <Divider />

            <div className="mb-4">
              <Text strong>Progress:</Text>
              <Progress percent={selectedGroup.progress} className="mt-2" />
            </div>

            <div className="mb-4">
              <Text strong>Associated Courses:</Text>
              <div className="mt-2">
                {selectedGroup.courses.map((course, index) => (
                  <Tag key={index} className="mb-1">
                    {course}
                  </Tag>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <Text strong>Tags:</Text>
              <div className="mt-2">
                {selectedGroup.tags.map((tag, index) => (
                  <Tag
                    key={index}
                    className="mb-1"
                    style={{
                      backgroundColor: "#f0f5ff",
                      borderColor: "#adc6ff",
                      color: "#1890ff",
                    }}
                  >
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <Text strong>Members ({selectedGroup.members.length}):</Text>
                <Button size="small" onClick={() => openMembersModal(selectedGroup)}>
                  Manage Members
                </Button>
              </div>
              <List
                size="small"
                dataSource={selectedGroup.members}
                renderItem={(member) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar size="small">{member.name.charAt(0)}</Avatar>}
                      title={member.name}
                      description={member.email}
                    />
                    <Tag size="small">{member.role}</Tag>
                  </List.Item>
                )}
              />
            </div>
          </div>
        )}
      </Modal>

      {/* Members Management Modal */}
      <Modal
        title="Manage Members"
        open={showMembersModal}
        onCancel={closeMembersModal}
        footer={[
          <Button key="close" onClick={closeMembersModal}>
            Close
          </Button>,
        ]}
        width={600}
      >
        {selectedGroup && (
          <div className="py-4">
            <div className="mb-4">
              <Text strong>Add New Member:</Text>
              <Select
                placeholder="Select a member to add"
                style={{ width: "100%", marginTop: 8 }}
                onChange={(memberId) => {
                  handleAddMember(selectedGroup.id, memberId)
                }}
                value={undefined}
              >
                {availableMembers
                  .filter((member) => !selectedGroup.members.some((m) => m.id === member.id))
                  .map((member) => (
                    <Option key={member.id} value={member.id}>
                      {member.name} ({member.email})
                    </Option>
                  ))}
              </Select>
            </div>

            <Divider />

            <div>
              <Text strong>Current Members ({selectedGroup.members.length}):</Text>
              <List
                className="mt-3"
                dataSource={selectedGroup.members}
                renderItem={(member) => (
                  <List.Item
                    actions={[
                      <Button
                        key="remove"
                        size="small"
                        danger
                        onClick={() => handleRemoveMember(selectedGroup.id, member.id)}
                      >
                        Remove
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar>{member.name.charAt(0)}</Avatar>}
                      title={member.name}
                      description={member.email}
                    />
                    <Tag>{member.role}</Tag>
                  </List.Item>
                )}
              />
            </div>
          </div>
        )}
      </Modal>

      {/* Bulk Add Members Modal */}
      <Modal
        title="Add Members to Selected Groups"
        open={showBulkAddModal}
        onCancel={() => setShowBulkAddModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowBulkAddModal(false)}>
            Cancel
          </Button>,
          <Button
            key="add"
            type="primary"
            onClick={() => {
              setShowBulkAddModal(false)
              message.success("Members added to selected groups")
            }}
          >
            Add Members
          </Button>,
        ]}
      >
        <div className="py-4">
          <Text>Select members to add to {selectedGroups.length} selected group(s):</Text>
          <Select mode="multiple" placeholder="Select members" style={{ width: "100%", marginTop: 16 }}>
            {availableMembers.map((member) => (
              <Option key={member.id} value={member.id}>
                {member.name} ({member.email})
              </Option>
            ))}
          </Select>
        </div>
      </Modal>

      {/* Manage Groups Modal */}
      <Modal
        title="Manage Groups Settings"
        open={showManageGroupsModal}
        onCancel={closeManageGroupsModal}
        footer={[
          <Button key="close" onClick={closeManageGroupsModal}>
            Close
          </Button>,
        ]}
      >
        <div className="py-4">
          <div className="space-y-4">
            <div>
              <Text strong>Group Statistics:</Text>
              <div className="mt-2 space-y-2">
                <div>Total Groups: {groups.length}</div>
                <div>Active Groups: {groups.filter((g) => g.status === "Active").length}</div>
                <div>Inactive Groups: {groups.filter((g) => g.status === "Inactive").length}</div>
                <div>Total Members: {groups.reduce((sum, g) => sum + g.memberCount, 0)}</div>
              </div>
            </div>
            <Divider />
            <div>
              <Text strong>Quick Actions:</Text>
              <div className="mt-2 space-y-2">
                <Button block onClick={exportToCSV}>
                  Export All Groups
                </Button>
                <Button block onClick={() => message.info("Archive old groups functionality coming soon")}>
                  Archive Old Groups
                </Button>
                <Button block onClick={() => message.info("Generate reports functionality coming soon")}>
                  Generate Reports
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Bulk Assign Courses Modal */}
      <Modal
        title="Assign Courses to Selected Groups"
        open={showBulkAssignCoursesModal}
        onCancel={() => setShowBulkAssignCoursesModal(false)}
        footer={null}
        width={500}
      >
        <Form layout="vertical" onFinish={(values) => handleBulkAssignCourses(values.courses)} className="mt-4">
          <Form.Item
            label="Select Courses"
            name="courses"
            rules={[{ required: true, message: "Please select at least one course" }]}
          >
            <Select mode="multiple" placeholder="Select courses to assign">
              {courseOptions.map((course) => (
                <Option key={course} value={course}>
                  {course}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <div className="flex justify-end gap-2 mt-6">
            <Button onClick={() => setShowBulkAssignCoursesModal(false)}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Assign Courses
            </Button>
          </div>
        </Form>
      </Modal>

      {/* Individual Assign Courses Modal */}
      <Modal
        title={`Assign Courses to ${selectedGroup?.name}`}
        open={showAssignCoursesModal}
        onCancel={closeAssignCoursesModal}
        footer={null}
        width={500}
      >
        <Form
          layout="vertical"
          onFinish={(values) => handleAssignCourses(values.courses)}
          className="mt-4"
          initialValues={{ courses: selectedGroup?.courses || [] }}
        >
          <Form.Item
            label="Select Courses"
            name="courses"
            rules={[{ required: true, message: "Please select at least one course" }]}
          >
            <Select mode="multiple" placeholder="Select courses to assign">
              {courseOptions.map((course) => (
                <Option key={course} value={course}>
                  {course}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <div className="flex justify-end gap-2 mt-6">
            <Button onClick={closeAssignCoursesModal}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Assign Courses
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  )
}

// Enhanced GroupCard component for card view
function GroupCard({
  group,
  selectedGroups,
  setSelectedGroups,
  selectedRowKeys,
  setSelectedRowKeys,
  getActionItems,
  openGroupModal,
}) {
  const actionItems = getActionItems(group)

  return (
    <Card hoverable className="cursor-pointer relative" onClick={() => openGroupModal(group)}>
      {/* Top row: Checkbox + Avatar + 3 dots */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <Checkbox
            checked={selectedGroups.includes(group.id)}
            onChange={(e) => {
              e.stopPropagation()
              if (e.target.checked) {
                setSelectedGroups((prev) => [...prev, group.id])
                setSelectedRowKeys((prev) => [...prev, group.id])
              } else {
                setSelectedGroups((prev) => prev.filter((id) => id !== group.id))
                setSelectedRowKeys((prev) => prev.filter((id) => id !== group.id))
              }
            }}
          />
          <Avatar size={48} src={group.image} className="bg-gray-200 text-gray-700">
            {group.name.charAt(0)}
          </Avatar>
        </div>

        {/* Three dots dropdown right side */}
        <Dropdown menu={{ items: actionItems }} trigger={["click"]} placement="bottomRight">
          <Button type="text" icon={<MoreVertical className="h-4 w-4" />} onClick={(e) => e.stopPropagation()} />
        </Dropdown>
      </div>

      {/* Group details */}
      <div className="mb-3">
        <h3 className="font-semibold text-lg mb-1">{group.name}</h3>
        <p className="text-sm text-gray-500 mb-2">{group.groupId}</p>
        <p className="text-sm text-gray-600 line-clamp-2 mb-2">{group.description}</p>

        <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
          <span>{group.branch}</span>
          <span>•</span>
          <span>
            {group.memberCount}/{group.maxMembers} members
          </span>
        </div>

        <div className="flex items-center justify-between">
          <Tag
            style={{
              backgroundColor: group.status === "Active" ? "#f6ffed" : "#fff7e6",
              borderColor: group.status === "Active" ? "#b7eb8f" : "#ffd591",
              color: group.status === "Active" ? "#52c41a" : "#fa8c16",
            }}
          >
            {group.status}
          </Tag>
          <div className="text-xs text-gray-500">Modified: {group.lastModified}</div>
        </div>

        {/* Progress bar */}
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Progress</span>
            <span>{group.progress}%</span>
          </div>
          <Progress percent={group.progress} size="small" showInfo={false} />
        </div>

        {/* Tags */}
        {group.tags && group.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {group.tags.slice(0, 3).map((tag, index) => (
              <Tag key={index} size="small">
                {tag}
              </Tag>
            ))}
            {group.tags.length > 3 && <Tag size="small">+{group.tags.length - 3} more</Tag>}
          </div>
        )}
      </div>


    </Card>
  )
}

export default GroupsPage
