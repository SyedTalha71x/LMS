// refercen code for design and antd
/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
"use client"

import { useState } from "react"
import {
  MoreVertical,
  X,
  Edit,
  AlertTriangle,
  Plus,
  Filter,
  Download,
  Eye,
  Power,
  Users,
  BookOpen,
  Trash2,
  Calendar,
  MapPin,
  Clock,
  Hash,
  LinkIcon,
  Settings,
  UserPlus,
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
  Card,
  Avatar,
  Modal,
  message,
  Form,
  Badge,
} from "antd"

const { Search: AntSearch } = Input
const { Option } = Select
const { TextArea } = Input

const GroupCard = ({
  group,
  selectedGroups,
  setSelectedGroups,
  selectedRowKeys,
  setSelectedRowKeys,
  getActionItems,
  openGroupModal,
}) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <Checkbox
          checked={selectedGroups.includes(group.id)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedGroups([...selectedGroups, group.id])
              setSelectedRowKeys([...selectedRowKeys, group.id])
            } else {
              setSelectedGroups(selectedGroups.filter((id) => id !== group.id))
              setSelectedRowKeys(selectedRowKeys.filter((key) => key !== group.id))
            }
          }}
        />
        <Dropdown
          menu={{
            items: getActionItems(group),
          }}
          trigger={["click"]}
        >
          <Button type="text" icon={<MoreVertical size={16} />} />
        </Dropdown>
      </div>

      <div className="flex items-center gap-3 mb-3" onClick={() => openGroupModal(group)} style={{ cursor: "pointer" }}>
        <Avatar size={48} src={group.image} className="bg-gray-200">
          {group.name.charAt(0)}
        </Avatar>
        <div className="flex-1">
          <h3 className="font-medium text-sm">{group.name}</h3>
          <p className="text-xs text-gray-500">{group.groupId}</p>
          <p className="text-xs text-gray-400 truncate">{group.description}</p>
        </div>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-500">Branch:</span>
          <span>{group.branch}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Members:</span>
          <span>
            {group.memberCount}/{group.maxMembers}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Status:</span>
          <Tag color={group.status === "Active" ? "green" : "red"} size="small">
            {group.status}
          </Tag>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Instructor:</span>
          <span className="truncate">{group.instructor}</span>
        </div>
      </div>

      <div className="mt-3">
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div
            className="bg-blue-600 h-1.5 rounded-full"
            style={{ width: `${(group.memberCount / group.maxMembers) * 100}%` }}
          ></div>
        </div>
        <div className="text-xs text-gray-500 mt-1 text-center">
          {Math.round((group.memberCount / group.maxMembers) * 100)}% full
        </div>
      </div>
    </Card>
  )
}

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
  const [showManageGroupsModal, setShowManageGroupsModal] = useState(false)
  const [showGroupDetailsModal, setShowGroupDetailsModal] = useState(false)
  const [showAddMembersModal, setShowAddMembersModal] = useState(false)
  const [selectedGroup, setSelectedGroup] = useState(null)

  // Selection and bulk actions
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [selectedGroups, setSelectedGroups] = useState([])
  const [selectedMembers, setSelectedMembers] = useState([])
  const [availableMembersData, setAvailableMembersData] = useState([])

  // Search and filters
  const [searchTerm, setSearchTerm] = useState("")
  const [searchScope, setSearchScope] = useState("all") // all, name, description, branch, instructor
  const [memberSearchTerm, setMemberSearchTerm] = useState("")
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
  const [formErrors, setFormErrors] = useState({})

  // Enhanced groups data with additional fields
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Advanced React Development",
      groupId: "#GRP001",
      description: "Advanced concepts in React including hooks, context, and performance optimization",
      branch: "Computer Science",
      department: "Software Engineering",
      category: "Programming",
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
      category: "Data Science",
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
      category: "Mobile Development",
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

  // Form state for editing
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    branch: "",
    department: "",
    maxMembers: "",
    instructor: "",
    courses: [],
    tags: [],
    location: "",
    timing: "",
    code: "",
    link: "",
  })

  // Options for filters and forms
  const branchOptions = ["Computer Science", "Mathematics", "Engineering", "Business"]
  const departmentOptions = ["Software Engineering", "Statistics", "Mobile Development", "Web Development"]
  const courseOptions = ["React Fundamentals", "Advanced JavaScript", "Statistics 101", "Python for Data Science"]
  const statusOptions = ["Active", "Inactive", "Archived"]
  const sizeOptions = ["Small (1-10)", "Medium (11-25)", "Large (26-50)", "Extra Large (50+)"]

  // Sample people for member management
  const availableMembers = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", department: "Computer Science" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", department: "Mathematics" },
    { id: 3, name: "Robert Johnson", email: "robert.j@example.com", department: "Engineering" },
    { id: 4, name: "Emily Davis", email: "emily.d@example.com", department: "Business" },
    { id: 5, name: "Michael Wilson", email: "michael.w@example.com", department: "Computer Science" },
  ]

  const [allMembers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", department: "Computer Science" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", department: "Software Engineering" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", department: "Computer Science" },
    { id: 4, name: "Sarah Wilson", email: "sarah@example.com", department: "Data Science" },
    { id: 5, name: "Tom Brown", email: "tom@example.com", department: "Software Engineering" },
    { id: 6, name: "Lisa Davis", email: "lisa@example.com", department: "Computer Science" },
  ])

  // Filter groups based on search and filters
  const filteredGroups = groups.filter((group) => {
    let matchesSearch = true

    if (searchTerm) {
      switch (searchScope) {
        case "name":
          matchesSearch = group.name.toLowerCase().includes(searchTerm.toLowerCase())
          break
        case "description":
          matchesSearch = group.description.toLowerCase().includes(searchTerm.toLowerCase())
          break
        case "branch":
          matchesSearch = group.branch.toLowerCase().includes(searchTerm.toLowerCase())
          break
        case "instructor":
          matchesSearch = group.instructor.toLowerCase().includes(searchTerm.toLowerCase())
          break
        default:
          matchesSearch =
            group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            group.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            group.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
            group.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            group.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      }
    }

    const matchesBranch = filters.branch === "all" || group.branch === filters.branch
    const matchesSize =
      filters.size === "all" ||
      (filters.size === "Small (1-10)" && group.memberCount <= 10) ||
      (filters.size === "Medium (11-25)" && group.memberCount > 10 && group.memberCount <= 25) ||
      (filters.size === "Large (26-50)" && group.memberCount > 25 && group.memberCount <= 50) ||
      (filters.size === "Extra Large (50+)" && group.memberCount > 50)
    const matchesStatus = filters.status === "all" || group.status === filters.status
    const matchesCourse = filters.course === "all" || group.courses.includes(filters.course)

    return matchesSearch && matchesBranch && matchesSize && matchesStatus && matchesCourse
  })

  // Event handlers
  const handleImageChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setProfileImage(imageUrl)
    }
  }

  const handleEditImageChange = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setEditProfileImage(imageUrl)
    }
  }

  const openCreateModal = () => {
    setShowCreateModal(true)
    setProfileImage("/placeholder.svg?height=100&width=100")
  }

  const closeCreateModal = () => {
    setShowCreateModal(false)
    setProfileImage("/placeholder.svg?height=100&width=100")
  }

  const openGroupModal = (group) => {
    setSelectedGroup(group)
    setShowGroupModal(true)
  }

  const closeGroupModal = () => {
    setShowGroupModal(false)
    setSelectedGroup(null)
  }

  const openEditModal = (group) => {
    setSelectedGroup(group)
    setEditProfileImage(group.image)
    setEditForm({
      name: group.name,
      description: group.description,
      branch: group.branch,
      department: group.department,
      maxMembers: group.maxMembers.toString(),
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
  }

  const openDeleteModal = (group) => {
    console.log("Opening delete modal for group:", group) // Debug log
    setSelectedGroup(group)
    setShowDeleteModal(true)
  }

  const closeDeleteModal = () => {
    console.log("Closing delete modal") // Debug log
    setShowDeleteModal(false)
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

  const handleEditFormChange = (e) => {
    const { name, value } = e.target
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleEditSubmit = (e) => {
    e.preventDefault()
    if (!selectedGroup) return

    const updatedGroups = groups.map((group) => {
      if (group.id === selectedGroup.id) {
        return {
          ...group,
          ...editForm,
          maxMembers: Number.parseInt(editForm.maxMembers),
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
    console.log("Deleting group:", selectedGroup) // Debug log
    if (!selectedGroup) {
      console.warn("No group selected for deletion")
      return
    }

    const updatedGroups = groups.filter((group) => group.id !== selectedGroup.id)
    setGroups(updatedGroups)
    closeDeleteModal()
    message.success("Group deleted successfully")
  }

  const handleCreateGroup = (values) => {
    const newGroup = {
      id: groups.length + 1,
      groupId: `#GRP${String(groups.length + 1).padStart(3, "0")}`,
      createdDate: new Date().toISOString().split("T")[0],
      lastModified: new Date().toISOString().split("T")[0],
      status: "Active",
      memberCount: 0,
      progress: 0,
      image: profileImage,
      members: [],
      ...values,
    }

    setGroups([...groups, newGroup])
    closeCreateModal()
    message.success("Group created successfully")
  }

  // Bulk actions
  const handleBulkAction = (action) => {
    switch (action) {
      case "delete":
        Modal.confirm({
          title: `Delete ${selectedGroups.length} group(s)?`,
          content: "This action cannot be undone. All group data will be permanently deleted.",
          okText: "Delete",
          okType: "danger",
          onOk: () => {
            const updatedGroups = groups.filter((group) => !selectedGroups.includes(group.id))
            setGroups(updatedGroups)
            setSelectedGroups([])
            setSelectedRowKeys([])
            message.success(`${selectedGroups.length} group(s) deleted successfully`)
          },
        })
        break
      case "activate":
        const activatedGroups = groups.map((group) =>
          selectedGroups.includes(group.id) ? { ...group, status: "Active" } : group,
        )
        setGroups(activatedGroups)
        message.success(`${selectedGroups.length} group(s) activated`)
        break
      case "deactivate":
        const deactivatedGroups = groups.map((group) =>
          selectedGroups.includes(group.id) ? { ...group, status: "Inactive" } : group,
        )
        setGroups(deactivatedGroups)
        message.success(`${selectedGroups.length} group(s) deactivated`)
        break
      case "addMembers":
        setShowBulkAddModal(true)
        break
      case "assignCourses":
        message.info("Assign courses functionality coming soon")
        break
    }
  }

  const exportToCSV = () => {
    message.success("Groups data exported successfully")
  }

  // Row selection for table
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys)
      setSelectedGroups(selectedRowKeys)
    },
  }

  // Action items for dropdown
  const getActionItems = (group) => [
    {
      key: "view",
      label: (
        <span
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            openGroupModal(group)
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
            e.preventDefault()
            e.stopPropagation()
            openEditModal(group)
          }}
        >
          <Edit className="h-4 w-4 mr-2 inline" />
          Edit Group
        </span>
      ),
    },
    {
      key: "members",
      label: (
        <span
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            openMembersModal(group)
          }}
        >
          <Users className="h-4 w-4 mr-2 inline" />
          Manage Members
        </span>
      ),
    },
    {
      key: "courses",
      label: (
        <span
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            message.info("Course management coming soon")
          }}
        >
          <BookOpen className="h-4 w-4 mr-2 inline" />
          Assign Courses
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
            e.preventDefault()
            e.stopPropagation()
            console.log("Delete clicked for group:", group) // Debug log
            openDeleteModal(group)
          }}
          className="text-red-600 cursor-pointer"
        >
          <Trash2 className="h-4 w-4 mr-2 inline" />
          Delete
        </span>
      ),
      danger: true,
    },
  ]

  const viewGroupDetails = (group) => {
    setSelectedGroup(group)
    setShowGroupDetailsModal(true)
  }

  const openAddMembersModal = (group) => {
    setSelectedGroup(group)
    const groupMemberIds = group.members.map((m) => m.id)
    setAvailableMembersData(allMembers.filter((member) => !groupMemberIds.includes(member.id)))
    setShowAddMembersModal(true)
  }

  const addMembersToGroup = () => {
    if (selectedMembers.length === 0) {
      message.warning("Please select at least one member to add")
      return
    }

    const updatedGroups = groups.map((group) => {
      if (group.id === selectedGroup.id) {
        const newMembers = selectedMembers.map((memberId) => allMembers.find((member) => member.id === memberId))
        return {
          ...group,
          members: [...group.members, ...newMembers],
          memberCount: group.memberCount + newMembers.length,
          lastModified: new Date().toISOString().split("T")[0],
        }
      }
      return group
    })

    setGroups(updatedGroups)
    setSelectedMembers([])
    setShowAddMembersModal(false)
    message.success(`${selectedMembers.length} member(s) added successfully`)
  }

  const removeMemberFromGroup = (groupId, memberId) => {
    const updatedGroups = groups.map((group) => {
      if (group.id === groupId) {
        return {
          ...group,
          members: group.members.filter((member) => member.id !== memberId),
          memberCount: group.memberCount - 1,
          lastModified: new Date().toISOString().split("T")[0],
        }
      }
      return group
    })

    setGroups(updatedGroups)
    message.success("Member removed successfully")
  }

  // Table columns
  const columns = [
    {
      title: "",
      key: "selection",
      width: 50,
      render: (_, record) => (
        <Checkbox
          checked={selectedGroups.includes(record.id)}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedGroups([...selectedGroups, record.id])
              setSelectedRowKeys([...selectedRowKeys, record.id])
            } else {
              setSelectedGroups(selectedGroups.filter((id) => id !== record.id))
              setSelectedRowKeys(selectedRowKeys.filter((key) => key !== record.id))
            }
          }}
        />
      ),
    },
    {
      title: "Group Info",
      key: "groupInfo",
      width: 250,
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <Avatar size={40} style={{ backgroundColor: "#1890ff" }}>
            {record.name.charAt(0)}
          </Avatar>
          <div>
            <div className="font-medium text-sm">{record.name}</div>
            <div className="text-xs text-gray-500">{record.groupId}</div>
            <div className="text-xs text-gray-400 truncate max-w-[200px]">{record.description}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Branch/Department",
      key: "branchDept",
      width: 150,
      render: (_, record) => (
        <div className="text-sm">
          <div className="font-medium">{record.branch}</div>
          <div className="text-gray-500">{record.department}</div>
          {record.category && <div className="text-xs text-blue-600">{record.category}</div>}
        </div>
      ),
    },
    {
      title: "Members",
      key: "members",
      width: 120,
      render: (_, record) => (
        <div className="text-center">
          <div className="text-sm font-medium">
            {record.memberCount}/{record.maxMembers}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
            <div
              className="bg-blue-600 h-1.5 rounded-full"
              style={{ width: `${(record.memberCount / record.maxMembers) * 100}%` }}
            ></div>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {Math.round((record.memberCount / record.maxMembers) * 100)}% full
          </div>
        </div>
      ),
    },
    {
      title: "Dates",
      key: "dates",
      width: 140,
      render: (_, record) => (
        <div className="text-xs">
          <div className="flex items-center gap-1">
            <Calendar size={12} className="text-gray-400" />
            <span>Created: {record.createdDate}</span>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <Clock size={12} className="text-gray-400" />
            <span className="text-gray-500">Modified: {record.lastModified}</span>
          </div>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 80,
      render: (status) => (
        <Tag color={status === "Active" ? "green" : status === "Inactive" ? "red" : "orange"}>{status}</Tag>
      ),
    },
    {
      title: "Instructor",
      dataIndex: "instructor",
      key: "instructor",
      width: 120,
      render: (instructor) => <div className="text-sm">{instructor}</div>,
    },
    {
      title: "Actions",
      key: "actions",
      width: 120,
      render: (_, record) => (
        <Dropdown
          open={openDropdownId === record.id}
          onOpenChange={(open) => setOpenDropdownId(open ? record.id : null)}
          menu={{
            items: [
              {
                key: "view",
                label: "View Details",
                icon: <Eye size={14} />,
                onClick: () => viewGroupDetails(record),
              },
              {
                key: "members",
                label: "Manage Members",
                icon: <Users size={14} />,
                onClick: () => openAddMembersModal(record),
              },
              {
                key: "edit",
                label: "Edit Group",
                icon: <Edit size={14} />,
                onClick: () => openEditModal(record),
              },
              {
                key: "delete",
                label: "Delete Group",
                icon: <Trash2 size={14} />,
                danger: true,
                onClick: () => openDeleteModal(record),
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

  const toggleDropdown = (id, e) => {
    e.stopPropagation()
    setOpenDropdownId(openDropdownId === id ? null : id)
  }

  const handleDropdownClick = (e) => {
    e.stopPropagation()
  }

  const closeDropdown = () => {
    setOpenDropdownId(null)
  }

  return (
    <div className="p-3 min-h-screen">
      <div className="">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Manage Groups</h1>
        </div>

        <Card className="">
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex-1 min-w-[200px]">
              <div className="flex gap-2">
                <Select value={searchScope} onChange={setSearchScope} style={{ width: 120 }} size="middle">
                  <Option value="all">All Fields</Option>
                  <Option value="name">Name</Option>
                  <Option value="description">Description</Option>
                  <Option value="branch">Branch</Option>
                  <Option value="instructor">Instructor</Option>
                </Select>
                <AntSearch
                  placeholder={`Search groups by ${searchScope === "all" ? "name, description, branch, or tags" : searchScope}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ flex: 1 }}
                  allowClear
                />
              </div>
              {searchTerm && (
                <div className="text-xs text-gray-500 mt-1">
                  Searching in:{" "}
                  <span className="font-medium">{searchScope === "all" ? "All Fields" : searchScope}</span>
                  {filteredGroups.length !== groups.length && (
                    <span>
                      {" "}
                      • Found {filteredGroups.length} of {groups.length} groups
                    </span>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button icon={<Filter size={16} />} onClick={() => setShowFilters(!showFilters)}>
                <span className="hidden sm:inline">Filters</span>
                {Object.values(filters).some((f) => f !== "all") && <Badge dot style={{ marginLeft: 4 }} />}
              </Button>

              <Button icon={<Plus size={16} />} onClick={openCreateModal} type="primary">
                <span className="hidden sm:inline">Add Group</span>
              </Button>

              <Button icon={<Download size={16} />} onClick={exportToCSV} type="primary" ghost>
                <span className="hidden sm:inline">Export</span>
              </Button>

            
            </div>
          </div>

          {showFilters && (
            <Card className="mb-4" size="small">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Branch</label>
                  <Select
                    value={filters.branch}
                    onChange={(value) => setFilters({ ...filters, branch: value })}
                    style={{ width: "100%" }}
                  >
                    <Option value="all">All Branches</Option>
                    <Option value="Computer Science">Computer Science</Option>
                    <Option value="Data Science">Data Science</Option>
                    <Option value="Software Engineering">Software Engineering</Option>
                    <Option value="Information Technology">Information Technology</Option>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Group Size</label>
                  <Select
                    value={filters.size}
                    onChange={(value) => setFilters({ ...filters, size: value })}
                    style={{ width: "100%" }}
                  >
                    <Option value="all">All Sizes</Option>
                    <Option value="Small (1-10)">Small (1-10)</Option>
                    <Option value="Medium (11-25)">Medium (11-25)</Option>
                    <Option value="Large (26-50)">Large (26-50)</Option>
                    <Option value="Extra Large (50+)">Extra Large (50+)</Option>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <Select
                    value={filters.status}
                    onChange={(value) => setFilters({ ...filters, status: value })}
                    style={{ width: "100%" }}
                  >
                    <Option value="all">All Status</Option>
                    <Option value="Active">Active</Option>
                    <Option value="Inactive">Inactive</Option>
                    <Option value="Pending">Pending</Option>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Course</label>
                  <Select
                    value={filters.course}
                    onChange={(value) => setFilters({ ...filters, course: value })}
                    style={{ width: "100%" }}
                  >
                    <Option value="all">All Courses</Option>
                    <Option value="React Fundamentals">React Fundamentals</Option>
                    <Option value="Advanced JavaScript">Advanced JavaScript</Option>
                    <Option value="Python Basics">Python Basics</Option>
                    <Option value="Data Analysis">Data Analysis</Option>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end mt-4 gap-2">
                <Button
                  size="small"
                  onClick={() => setFilters({ branch: "all", size: "all", status: "all", course: "all" })}
                >
                  Clear All
                </Button>
                <Button size="small" type="primary" onClick={() => setShowFilters(false)}>
                  Apply Filters
                </Button>
              </div>
            </Card>
          )}

          {/* Bulk Actions */}
          {selectedGroups.length > 0 && (
            <Card className="mb-4 bg-blue-50 border-blue-200" size="small">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <span className="text-sm text-blue-700">{selectedGroups.length} group(s) selected</span>
                <Space wrap>
                  <Button
                    onClick={() => handleBulkAction("activate")}
                    icon={<Power size={14} />}
                    size="small"
                    type="primary"
                    ghost
                  >
                    Activate
                  </Button>
                  <Button
                    onClick={() => handleBulkAction("deactivate")}
                    icon={<Power size={14} />}
                    size="small"
                    style={{ borderColor: "#f97316", color: "#f97316" }}
                    ghost
                  >
                    Deactivate
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
                    onClick={() => handleBulkAction("assignCourses")}
                    icon={<BookOpen size={14} />}
                    size="small"
                    type="primary"
                    ghost
                  >
                    Assign Courses
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
            <Table
              columns={columns}
              dataSource={filteredGroups}
              rowKey="id"
              loading={tableLoading}
              pagination={{
                current: currentPage,
                pageSize: itemsPerPage,
                total: filteredGroups.length,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} groups`,
                onChange: (page, size) => {
                  setCurrentPage(page)
                  setItemsPerPage(size)
                },
              }}
              scroll={{ x: 1200 }}
            />
          ) : (
            /* Card View */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredGroups.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((group) => (
                <GroupCard
                  key={group.id}
                  group={group}
                  selectedGroups={selectedGroups}
                  setSelectedGroups={setSelectedGroups}
                  selectedRowKeys={selectedRowKeys}
                  setSelectedRowKeys={setSelectedRowKeys}
                  getActionItems={getActionItems}
                  openGroupModal={openGroupModal}
                />
              ))}
            </div>
          )}
        </Card>

        <Modal
          title={
            <div className="flex items-center gap-2">
              <Users size={20} />
              <span>Group Details</span>
            </div>
          }
          open={showGroupDetailsModal}
          onCancel={() => setShowGroupDetailsModal(false)}
          width={800}
          footer={[
            <Button key="close" onClick={() => setShowGroupDetailsModal(false)}>
              Close
            </Button>,
            <Button
              key="edit"
              type="primary"
              onClick={() => {
                setShowGroupDetailsModal(false)
                openEditModal(selectedGroup)
              }}
            >
              Edit Group
            </Button>,
          ]}
        >
          {selectedGroup && (
            <div className="space-y-6">
              {/* Group Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Basic Information</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Name:</strong> {selectedGroup.name}
                    </div>
                    <div>
                      <strong>ID:</strong> {selectedGroup.groupId}
                    </div>
                    <div>
                      <strong>Description:</strong> {selectedGroup.description}
                    </div>
                    <div>
                      <strong>Status:</strong>
                      <Tag color={selectedGroup.status === "Active" ? "green" : "red"} className="ml-2">
                        {selectedGroup.status}
                      </Tag>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Organization</h3>
                  <div className="space-y-2 text-sm">
                    <div>
                      <strong>Branch:</strong> {selectedGroup.branch}
                    </div>
                    <div>
                      <strong>Department:</strong> {selectedGroup.department}
                    </div>
                    <div>
                      <strong>Category:</strong> {selectedGroup.category}
                    </div>
                    <div>
                      <strong>Instructor:</strong> {selectedGroup.instructor}
                    </div>
                  </div>
                </div>
              </div>

              {/* Members Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">
                    Members ({selectedGroup.members?.length || 0}/{selectedGroup.maxMembers})
                  </h3>
                  <Button
                    size="small"
                    type="primary"
                    icon={<Plus size={14} />}
                    onClick={() => {
                      setShowGroupDetailsModal(false)
                      openAddMembersModal(selectedGroup)
                    }}
                  >
                    Add Members
                  </Button>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {selectedGroup.members && selectedGroup.members.length > 0 ? (
                    <div className="space-y-2">
                      {selectedGroup.members.map((member) => (
                        <div key={member.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <div className="flex items-center gap-2">
                            <Avatar size={24}>{member.name.charAt(0)}</Avatar>
                            <div>
                              <div className="text-sm font-medium">{member.name}</div>
                              <div className="text-xs text-gray-500">{member.email}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Tag size="small">{member.role || "Student"}</Tag>
                            <Button
                              size="small"
                              type="text"
                              danger
                              icon={<X size={12} />}
                              onClick={() => removeMemberFromGroup(selectedGroup.id, member.id)}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Users size={48} className="mx-auto mb-2 opacity-50" />
                      <p>No members in this group yet</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Courses */}
              <div>
                <h3 className="font-semibold mb-2">Associated Courses</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedGroup.courses?.map((course) => (
                    <Tag key={course} color="blue">
                      {course}
                    </Tag>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Modal>

        <Modal
          title={
            <div className="flex items-center gap-2">
              <UserPlus size={20} />
              <span>Add Members to {selectedGroup?.name}</span>
            </div>
          }
          open={showAddMembersModal}
          onCancel={() => {
            setShowAddMembersModal(false)
            setSelectedMembers([])
            setMemberSearchTerm("")
          }}
          width={600}
          footer={[
            <Button
              key="cancel"
              onClick={() => {
                setShowAddMembersModal(false)
                setSelectedMembers([])
                setMemberSearchTerm("")
              }}
            >
              Cancel
            </Button>,
            <Button key="add" type="primary" onClick={addMembersToGroup} disabled={selectedMembers.length === 0}>
              Add {selectedMembers.length} Member(s)
            </Button>,
          ]}
        >
          <div className="space-y-4">
            <AntSearch
              placeholder="Search available members..."
              value={memberSearchTerm}
              onChange={(e) => setMemberSearchTerm(e.target.value)}
              style={{ width: "100%" }}
            />

            <div className="max-h-80 overflow-y-auto border rounded p-2">
              {availableMembersData
                .filter(
                  (member) =>
                    member.name.toLowerCase().includes(memberSearchTerm.toLowerCase()) ||
                    member.email.toLowerCase().includes(memberSearchTerm.toLowerCase()) ||
                    member.department.toLowerCase().includes(memberSearchTerm.toLowerCase()),
                )
                .map((member) => (
                  <div key={member.id} className="flex items-center p-2 hover:bg-gray-50 rounded">
                    <Checkbox
                      checked={selectedMembers.includes(member.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedMembers([...selectedMembers, member.id])
                        } else {
                          setSelectedMembers(selectedMembers.filter((id) => id !== member.id))
                        }
                      }}
                    />
                    <div className="ml-3 flex items-center gap-2 flex-1">
                      <Avatar size={32}>{member.name.charAt(0)}</Avatar>
                      <div>
                        <div className="text-sm font-medium">{member.name}</div>
                        <div className="text-xs text-gray-500">{member.email}</div>
                        <div className="text-xs text-blue-600">{member.department}</div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {selectedMembers.length > 0 && (
              <div className="bg-blue-50 p-3 rounded">
                <div className="text-sm text-blue-700">{selectedMembers.length} member(s) selected</div>
              </div>
            )}
          </div>
        </Modal>

        {/* Create Group Modal */}
        <Modal title="Create New Group" open={showCreateModal} onCancel={closeCreateModal} footer={null} width={600}>
          <Form layout="vertical" onFinish={handleCreateGroup} className="mt-4">
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-24 h-24 mb-3 bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden">
                <img src={profileImage || "/placeholder.svg"} alt="Group" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <label
                    htmlFor="profile-upload"
                    className="cursor-pointer w-full h-full flex items-center justify-center text-white"
                  >
                    <Edit size={20} />
                  </label>
                  <input
                    id="profile-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </div>
              </div>
              <Button size="small" onClick={() => document.getElementById("profile-upload").click()}>
                Upload Picture
              </Button>
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
            <form onSubmit={handleEditSubmit} className="mt-4">
              <div className="flex flex-col items-center mb-6">
                <div className="relative w-24 h-24 mb-3 bg-gray-100 rounded-2xl flex items-center justify-center overflow-hidden">
                  <img
                    src={editProfileImage || "/placeholder.svg"}
                    alt="Group"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <label
                      htmlFor="edit-profile-upload"
                      className="cursor-pointer w-full h-full flex items-center justify-center text-white"
                    >
                      <Edit size={20} />
                    </label>
                    <input
                      id="edit-profile-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleEditImageChange}
                    />
                  </div>
                </div>
                <Button size="small" onClick={() => document.getElementById("edit-profile-upload").click()}>
                  Change Picture
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Group Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleEditFormChange}
                    className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
                    placeholder="Group Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                  <select
                    name="branch"
                    value={editForm.branch}
                    onChange={handleEditFormChange}
                    className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
                  >
                    {branchOptions.map((branch) => (
                      <option key={branch} value={branch}>
                        {branch}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select
                    name="department"
                    value={editForm.department}
                    onChange={handleEditFormChange}
                    className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
                  >
                    {departmentOptions.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Members</label>
                  <input
                    type="number"
                    name="maxMembers"
                    value={editForm.maxMembers}
                    onChange={handleEditFormChange}
                    className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
                    placeholder="Max Members"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instructor</label>
                  <input
                    type="text"
                    name="instructor"
                    value={editForm.instructor}
                    onChange={handleEditFormChange}
                    className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
                    placeholder="Instructor"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={editForm.location}
                    onChange={handleEditFormChange}
                    className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
                    placeholder="Location"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Timing</label>
                  <input
                    type="text"
                    name="timing"
                    value={editForm.timing}
                    onChange={handleEditFormChange}
                    className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
                    placeholder="Timing"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Group Code</label>
                  <input
                    type="text"
                    name="code"
                    value={editForm.code}
                    onChange={handleEditFormChange}
                    className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
                    placeholder="Group Code"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditFormChange}
                  className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
                  placeholder="Description"
                  rows={3}
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Group Link</label>
                <input
                  type="text"
                  name="link"
                  value={editForm.link}
                  onChange={handleEditFormChange}
                  className="w-full p-3 rounded-xl bg-[#F1F1F1] outline-none text-sm"
                  placeholder="Group Link"
                />
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  type="button"
                  className="bg-gray-200 text-gray-800 text-sm py-2 px-6 rounded-xl hover:bg-gray-300 transition-colors"
                  onClick={closeEditModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#0B5D3A] text-white text-sm py-2 px-6 rounded-xl hover:bg-green-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}
        </Modal>

        {/* Manage Members Modal */}
        <Modal
          title="Manage Group Members"
          open={showMembersModal}
          onCancel={closeMembersModal}
          footer={null}
          width={700}
        >
          {selectedGroup && (
            <div className="mt-4">
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">Add New Members</h3>
                <Select mode="multiple" placeholder="Select members to add" style={{ width: "100%" }} className="mb-4">
                  {availableMembers.map((member) => (
                    <Option key={member.id} value={member.id}>
                      {member.name} ({member.email})
                    </Option>
                  ))}
                </Select>
                <Button type="primary" size="small">
                  Add Selected Members
                </Button>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Current Members ({selectedGroup.members?.length || 0})</h3>
                <div className="max-h-64 overflow-y-auto">
                  {selectedGroup.members?.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-3 border-b">
                      <div className="flex items-center gap-3">
                        <Avatar size={32} className="bg-gray-200">
                          {member.name.charAt(0)}
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-gray-500">{member.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Tag color={member.role === "TA" ? "blue" : "default"}>{member.role}</Tag>
                        <Button
                          type="text"
                          danger
                          size="small"
                          icon={<X size={14} />}
                          onClick={() => message.success(`${member.name} removed from group`)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Modal>

        {/* Delete Confirmation Modal */}
        <Modal
          title={
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Delete Group
            </div>
          }
          open={showDeleteModal}
          onCancel={closeDeleteModal}
          footer={null}
          width={400}
          destroyOnClose={true}
          maskClosable={false}
        >
          {selectedGroup && (
            <div className="mt-4">
              <p className="text-gray-600 mb-4">
                Are you sure you want to delete <strong>{selectedGroup.name}</strong>?
              </p>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <p className="text-red-800 text-sm">
                  <strong>Warning:</strong> This action cannot be undone. All group data, including:
                </p>
                <ul className="text-red-700 text-sm mt-2 ml-4 list-disc">
                  <li>Group information and settings</li>
                  <li>Member associations</li>
                  <li>Course assignments</li>
                  <li>Progress data</li>
                </ul>
                <p className="text-red-800 text-sm mt-2">will be permanently deleted.</p>
              </div>

              <div className="flex justify-end gap-2">
                <Button onClick={closeDeleteModal}>Cancel</Button>
                <Button type="primary" danger onClick={handleDeleteGroup} loading={false}>
                  Delete Group
                </Button>
              </div>
            </div>
          )}
        </Modal>

        {/* Group Details Modal */}
        <Modal title="Group Details" open={showGroupModal} onCancel={closeGroupModal} footer={null} width={600}>
          {selectedGroup && (
            <div className="mt-4">
              <div className="flex items-center gap-4 mb-6">
                <Avatar size={64} src={selectedGroup.image} className="bg-gray-200">
                  {selectedGroup.name.charAt(0)}
                </Avatar>
                <div>
                  <h2 className="text-xl font-semibold">{selectedGroup.name}</h2>
                  <p className="text-gray-500">{selectedGroup.groupId}</p>
                  <Tag color={selectedGroup.status === "Active" ? "green" : "orange"}>{selectedGroup.status}</Tag>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      <strong>Members:</strong> {selectedGroup.memberCount}/{selectedGroup.maxMembers}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      <strong>Location:</strong> {selectedGroup.location}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      <strong>Timing:</strong> {selectedGroup.timing}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Hash className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      <strong>Code:</strong> {selectedGroup.code}
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      <strong>Created:</strong> {selectedGroup.createdDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      <strong>Modified:</strong> {selectedGroup.lastModified}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      <strong>Instructor:</strong> {selectedGroup.instructor}
                    </span>
                  </div>
                  {selectedGroup.link && (
                    <div className="flex items-center gap-2">
                      <LinkIcon className="h-4 w-4 text-gray-500" />
                      <a href={selectedGroup.link} className="text-sm text-blue-600 hover:underline">
                        Group Link
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-gray-600 text-sm">{selectedGroup.description}</p>
              </div>

              {selectedGroup.courses && selectedGroup.courses.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Associated Courses</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedGroup.courses.map((course, index) => (
                      <Tag key={index} color="blue">
                        {course}
                      </Tag>
                    ))}
                  </div>
                </div>
              )}

              {selectedGroup.tags && selectedGroup.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedGroup.tags.map((tag, index) => (
                      <Tag key={index}>{tag}</Tag>
                    ))}
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-medium mb-2">Progress</h3>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: `${selectedGroup.progress}%` }}></div>
                </div>
                <p className="text-sm text-gray-500 mt-1">{selectedGroup.progress}% complete</p>
              </div>

              <div className="flex justify-end gap-2">
                <Button onClick={() => openMembersModal(selectedGroup)} icon={<Users size={16} />}>
                  Manage Members
                </Button>
                <Button onClick={closeGroupModal}>Close</Button>
              </div>
            </div>
          )}
        </Modal>

      </div>
    </div>
  )
}

export default GroupsPage
