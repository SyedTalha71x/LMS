/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
import {
  Table,
  Button,
  Input,
  Select,
  Modal,
  Form,
  Avatar,
  Tag,
  Dropdown,
  Space,
  Card,
  Row,
  Col,
  DatePicker,
  message,
  Divider,
  Progress,
  Badge,
} from "antd"
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  FilterOutlined,
  ExportOutlined,
  ReloadOutlined,
  EyeOutlined,
  LockOutlined,
  UnlockOutlined,
} from "@ant-design/icons"
import dayjs from "dayjs"

const { Search } = Input
const { Option } = Select
const { RangePicker } = DatePicker
const { TextArea } = Input

const Students = () => {
  // State management
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  // Modal states
  const [isAddModalVisible, setIsAddModalVisible] = useState(false)
  const [isEditModalVisible, setIsEditModalVisible] = useState(false)
  const [isProfileModalVisible, setIsProfileModalVisible] = useState(false)
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)
  const [isBulkActionModalVisible, setIsBulkActionModalVisible] = useState(false)

  // Current user data
  const [currentUser, setCurrentUser] = useState(null)
  const [editingUser, setEditingUser] = useState(null)

  // Filter states
  const [filters, setFilters] = useState({
    role: "",
    status: "",
    group: "",
    dateRange: null,
  })

  // Form instances
  const [addForm] = Form.useForm()
  const [editForm] = Form.useForm()

  // Options
  const roleOptions = ["Student", "Instructor", "Admin", "Janitor", "Pharmacist", "Technician", "IT"]
  const statusOptions = ["Active", "Inactive", "Pending", "Suspended"]
  const groupOptions = ["Group A", "Group B", "Group C", "Advanced", "Beginner"]

  // Sample data
  useEffect(() => {
    const sampleUsers = [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1234567890",
        role: "Student",
        status: "Active",
        group: "Group A",
        lastLogin: "2024-01-15T10:30:00Z",
        createdDate: "2024-01-01T00:00:00Z",
        avatar: null,
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        achievements: ["Quick Learner", "Team Player", "Consistent"],
        courses: ["React Basics", "JavaScript Advanced", "Node.js"],
        progress: { overall: 75, courses: 3, completed: 2 },
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "+1234567891",
        role: "Instructor",
        status: "Active",
        group: "Group B",
        lastLogin: "2024-01-14T15:45:00Z",
        createdDate: "2023-12-15T00:00:00Z",
        avatar: null,
        description: "Experienced instructor with 5+ years in web development.",
        achievements: ["Expert", "Mentor", "Leader"],
        courses: ["Advanced React", "System Design", "Database Management"],
        progress: { overall: 95, courses: 8, completed: 7 },
      },
      {
        id: 3,
        name: "Mike Johnson",
        email: "mike.johnson@example.com",
        phone: "+1234567892",
        role: "Student",
        status: "Inactive",
        group: "Group A",
        lastLogin: "Never",
        createdDate: "2024-01-10T00:00:00Z",
        avatar: null,
        description: "New student enrolled in web development program.",
        achievements: ["Newcomer"],
        courses: ["HTML/CSS Basics"],
        progress: { overall: 25, courses: 1, completed: 0 },
      },
      {
        id: 4,
        name: "Sarah Wilson",
        email: "sarah.wilson@example.com",
        phone: "+1234567893",
        role: "Admin",
        status: "Active",
        group: "Advanced",
        lastLogin: "2024-01-16T09:15:00Z",
        createdDate: "2023-11-01T00:00:00Z",
        avatar: null,
        description: "System administrator managing platform operations.",
        achievements: ["Administrator", "Problem Solver", "Efficient"],
        courses: ["System Administration", "Security Fundamentals"],
        progress: { overall: 100, courses: 5, completed: 5 },
      },
      {
        id: 5,
        name: "David Brown",
        email: "david.brown@example.com",
        phone: "+1234567894",
        role: "Student",
        status: "Pending",
        group: "Beginner",
        lastLogin: "Never",
        createdDate: "2024-01-16T00:00:00Z",
        avatar: null,
        description: "Pending approval for course enrollment.",
        achievements: [],
        courses: [],
        progress: { overall: 0, courses: 0, completed: 0 },
      },
    ]
    setUsers(sampleUsers)
    setFilteredUsers(sampleUsers)
  }, [])

  // Filter and search logic
  useEffect(() => {
    const filtered = users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesRole = !filters.role || user.role === filters.role
      const matchesStatus = !filters.status || user.status === filters.status
      const matchesGroup = !filters.group || user.group === filters.group

      let matchesDate = true
      if (filters.dateRange && filters.dateRange.length === 2) {
        const userDate = dayjs(user.createdDate)
        matchesDate = userDate.isAfter(filters.dateRange[0]) && userDate.isBefore(filters.dateRange[1])
      }

      return matchesSearch && matchesRole && matchesStatus && matchesGroup && matchesDate
    })
    setFilteredUsers(filtered)
  }, [users, searchTerm, filters])

  // Table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text, record) => (
        <div className="flex items-center">
          <Avatar size={32} src={record.avatar} className="mr-2" style={{ backgroundColor: "#f56a00" }}>
            {record.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </Avatar>
          <div>
            <div className="font-medium">{text}</div>
            <div className="text-xs text-gray-500">ID: {record.id}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      filters: roleOptions.map((role) => ({ text: role, value: role })),
      onFilter: (value, record) => record.role === value,
      render: (role) => {
        const colors = {
          Student: "blue",
          Instructor: "green",
          Admin: "red",
          Janitor: "orange",
          Pharmacist: "purple",
          Technician: "cyan",
          IT: "magenta",
        }
        return <Tag color={colors[role] || "default"}>{role}</Tag>
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: statusOptions.map((status) => ({ text: status, value: status })),
      onFilter: (value, record) => record.status === value,
      render: (status) => {
        const colors = {
          Active: "success",
          Inactive: "default",
          Pending: "warning",
          Suspended: "error",
        }
        return <Badge status={colors[status]} text={status} />
      },
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
      render: (lastLogin) =>
        lastLogin === "Never" ? <span className="text-gray-400">Never</span> : dayjs(lastLogin).format("MMM DD, YYYY"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "view",
                icon: <EyeOutlined />,
                label: "View Profile",
                onClick: () => handleViewProfile(record),
              },
              {
                key: "edit",
                icon: <EditOutlined />,
                label: "Edit User",
                onClick: () => handleEditUser(record),
              },
              {
                type: "divider",
              },
              {
                key: "reset",
                icon: <LockOutlined />,
                label: "Reset Password",
                onClick: () => handleResetPassword(record),
              },
              {
                key: "toggle",
                icon: record.status === "Active" ? <UnlockOutlined /> : <LockOutlined />,
                label: record.status === "Active" ? "Deactivate" : "Activate",
                onClick: () => handleToggleStatus(record),
              },
              {
                type: "divider",
              },
              {
                key: "delete",
                icon: <DeleteOutlined />,
                label: "Delete User",
                danger: true,
                onClick: () => handleDeleteUser(record),
              },
            ],
          }}
          trigger={["click"]}
        >
          <Button type="text" icon={<MoreOutlined />} />
        </Dropdown>
      ),
    },
  ]

  // Row selection
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys) => setSelectedRowKeys(keys),
    onSelectAll: (selected, selectedRows, changeRows) => {
      if (selected) {
        setSelectedRowKeys(filteredUsers.map((user) => user.id))
      } else {
        setSelectedRowKeys([])
      }
    },
  }

  // Handlers
  const handleSearch = (value) => {
    setSearchTerm(value)
  }

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleAddUser = () => {
    setIsAddModalVisible(true)
  }

  const handleViewProfile = (user) => {
    setCurrentUser(user)
    setIsProfileModalVisible(true)
  }

  const handleEditUser = (user) => {
    setEditingUser(user)
    editForm.setFieldsValue(user)
    setIsEditModalVisible(true)
  }

  const handleDeleteUser = (user) => {
    setCurrentUser(user)
    setIsDeleteModalVisible(true)
  }

  const handleResetPassword = (user) => {
    Modal.confirm({
      title: "Reset Password",
      content: `Are you sure you want to reset password for ${user.name}?`,
      onOk: () => {
        message.success(`Password reset email sent to ${user.email}`)
      },
    })
  }

  const handleToggleStatus = (user) => {
    const newStatus = user.status === "Active" ? "Inactive" : "Active"
    Modal.confirm({
      title: `${newStatus === "Active" ? "Activate" : "Deactivate"} User`,
      content: `Are you sure you want to ${newStatus === "Active" ? "activate" : "deactivate"} ${user.name}?`,
      onOk: () => {
        setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u)))
        message.success(`User ${newStatus === "Active" ? "activated" : "deactivated"} successfully`)
      },
    })
  }

  const handleBulkAction = (action) => {
    if (selectedRowKeys.length === 0) {
      message.warning("Please select users first")
      return
    }

    Modal.confirm({
      title: `Bulk ${action}`,
      content: `Are you sure you want to ${action.toLowerCase()} ${selectedRowKeys.length} selected users?`,
      onOk: () => {
        if (action === "Delete") {
          setUsers((prev) => prev.filter((user) => !selectedRowKeys.includes(user.id)))
        } else if (action === "Activate") {
          setUsers((prev) =>
            prev.map((user) => (selectedRowKeys.includes(user.id) ? { ...user, status: "Active" } : user)),
          )
        } else if (action === "Deactivate") {
          setUsers((prev) =>
            prev.map((user) => (selectedRowKeys.includes(user.id) ? { ...user, status: "Inactive" } : user)),
          )
        }
        setSelectedRowKeys([])
        message.success(`Bulk ${action.toLowerCase()} completed successfully`)
      },
    })
  }

  const handleAddSubmit = (values) => {
    const newUser = {
      id: users.length + 1,
      ...values,
      lastLogin: "Never",
      createdDate: new Date().toISOString(),
      avatar: null,
      achievements: [],
      courses: [],
      progress: { overall: 0, courses: 0, completed: 0 },
    }
    setUsers((prev) => [...prev, newUser])
    setIsAddModalVisible(false)
    addForm.resetFields()
    message.success("User added successfully")
  }

  const handleEditSubmit = (values) => {
    setUsers((prev) => prev.map((user) => (user.id === editingUser.id ? { ...user, ...values } : user)))
    setIsEditModalVisible(false)
    setEditingUser(null)
    editForm.resetFields()
    message.success("User updated successfully")
  }

  const handleDeleteConfirm = () => {
    setUsers((prev) => prev.filter((user) => user.id !== currentUser.id))
    setIsDeleteModalVisible(false)
    setCurrentUser(null)
    message.success("User deleted successfully")
  }

  const clearFilters = () => {
    setFilters({
      role: "",
      status: "",
      group: "",
      dateRange: null,
    })
    setSearchTerm("")
  }

  return (
    <div className="md:p-6 p-3">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold">Manage Users</h1>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddUser}>
            Add User
          </Button>
        </div>

        <Row gutter={[16, 16]} align="middle" className="mb-4">
      {/* Search Bar - Larger on desktop */}
      <Col xs={24} sm={24} md={12} lg={14} xl={18}>
        <Search
          placeholder="Search by name or email..."
          allowClear
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: "100%" }}
        />
      </Col>

      {/* Buttons - Smaller but same row on large screens */}
      <Col xs={24} sm={12} md={4} lg={3} xl={2}>
        <Button
          block
          icon={<ReloadOutlined />}
          onClick={() => window.location.reload()}
        >
          Refresh
        </Button>
      </Col>

      <Col xs={24} sm={12} md={4} lg={3} xl={2}>
        <Button block icon={<ExportOutlined />}>
          Export
        </Button>
      </Col>

      <Col xs={24} sm={12} md={4} lg={3} xl={2}>
        <Button
          block
          icon={<FilterOutlined />}
          onClick={() => setShowFilters(!showFilters)}
          type={showFilters ? "primary" : "default"}
        >
          Filters
        </Button>
      </Col>
    </Row>
        {/* Advanced Filters */}
        {showFilters && (
          <Card className="mb-4">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={6}>
                <Select
                  placeholder="Filter by Role"
                  allowClear
                  style={{ width: "100%" }}
                  value={filters.role}
                  onChange={(value) => handleFilterChange("role", value)}
                >
                  {roleOptions.map((role) => (
                    <Option key={role} value={role}>
                      {role}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Select
                  placeholder="Filter by Status"
                  allowClear
                  style={{ width: "100%" }}
                  value={filters.status}
                  onChange={(value) => handleFilterChange("status", value)}
                >
                  {statusOptions.map((status) => (
                    <Option key={status} value={status}>
                      {status}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Select
                  placeholder="Filter by Group"
                  allowClear
                  style={{ width: "100%" }}
                  value={filters.group}
                  onChange={(value) => handleFilterChange("group", value)}
                >
                  {groupOptions.map((group) => (
                    <Option key={group} value={group}>
                      {group}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <RangePicker
                  placeholder={["Start Date", "End Date"]}
                  style={{ width: "100%" }}
                  value={filters.dateRange}
                  onChange={(dates) => handleFilterChange("dateRange", dates)}
                />
              </Col>
            </Row>
            <div className="mt-3">
              <Button onClick={clearFilters} size="small">
                Clear All Filters
              </Button>
            </div>
          </Card>
        )}

        {/* Bulk Actions */}
        {selectedRowKeys.length > 0 && (
          <Card className="mb-4">
            <div className="flex items-center justify-between">
              <span>{selectedRowKeys.length} users selected</span>
              <Space>
                <Button onClick={() => handleBulkAction("Activate")}>Bulk Activate</Button>
                <Button onClick={() => handleBulkAction("Deactivate")}>Bulk Deactivate</Button>
                <Button danger onClick={() => handleBulkAction("Delete")}>
                  Bulk Delete
                </Button>
              </Space>
            </div>
          </Card>
        )}
      </div>

      {/* Users Table */}
      <Card>
        <Table
          columns={columns}
          dataSource={filteredUsers}
          rowKey="id"
          rowSelection={rowSelection}
          loading={loading}
          pagination={{
            total: filteredUsers.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
          }}
          scroll={{ x: 800 }}
        />
      </Card>

      {/* Add User Modal */}
      <Modal
        title="Add New User"
        open={isAddModalVisible}
        onCancel={() => {
          setIsAddModalVisible(false)
          addForm.resetFields()
        }}
        footer={null}
        width={600}
      >
        <Form form={addForm} layout="vertical" onFinish={handleAddSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="name" label="Full Name" rules={[{ required: true, message: "Please enter full name" }]}>
                <Input prefix={<UserOutlined />} placeholder="Enter full name" />
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
                <Input prefix={<MailOutlined />} placeholder="Enter email" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ required: true, message: "Please enter phone number" }]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="Enter phone number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="role" label="Role" rules={[{ required: true, message: "Please select role" }]}>
                <Select placeholder="Select role">
                  {roleOptions.map((role) => (
                    <Option key={role} value={role}>
                      {role}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: "Please select status" }]}
                initialValue="Active"
              >
                <Select placeholder="Select status">
                  {statusOptions.map((status) => (
                    <Option key={status} value={status}>
                      {status}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="group" label="Group" rules={[{ required: true, message: "Please select group" }]}>
                <Select placeholder="Select group">
                  {groupOptions.map((group) => (
                    <Option key={group} value={group}>
                      {group}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="description" label="Description">
            <TextArea rows={3} placeholder="Enter user description" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Create User
              </Button>
              <Button
                onClick={() => {
                  setIsAddModalVisible(false)
                  addForm.resetFields()
                }}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit User Modal */}
      <Modal
        title="Edit User"
        open={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false)
          setEditingUser(null)
          editForm.resetFields()
        }}
        footer={null}
        width={600}
      >
        <Form form={editForm} layout="vertical" onFinish={handleEditSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="name" label="Full Name" rules={[{ required: true, message: "Please enter full name" }]}>
                <Input prefix={<UserOutlined />} placeholder="Enter full name" />
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
                <Input prefix={<MailOutlined />} placeholder="Enter email" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ required: true, message: "Please enter phone number" }]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="Enter phone number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="role" label="Role" rules={[{ required: true, message: "Please select role" }]}>
                <Select placeholder="Select role">
                  {roleOptions.map((role) => (
                    <Option key={role} value={role}>
                      {role}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
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
            <Col span={12}>
              <Form.Item name="group" label="Group" rules={[{ required: true, message: "Please select group" }]}>
                <Select placeholder="Select group">
                  {groupOptions.map((group) => (
                    <Option key={group} value={group}>
                      {group}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="description" label="Description">
            <TextArea rows={3} placeholder="Enter user description" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Update User
              </Button>
              <Button
                onClick={() => {
                  setIsEditModalVisible(false)
                  setEditingUser(null)
                  editForm.resetFields()
                }}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* User Profile Modal */}
      <Modal
        title="User Profile"
        open={isProfileModalVisible}
        onCancel={() => {
          setIsProfileModalVisible(false)
          setCurrentUser(null)
        }}
        footer={[
          <Button
            key="edit"
            type="primary"
            onClick={() => {
              setIsProfileModalVisible(false)
              handleEditUser(currentUser)
            }}
          >
            Edit User
          </Button>,
          <Button
            key="close"
            onClick={() => {
              setIsProfileModalVisible(false)
              setCurrentUser(null)
            }}
          >
            Close
          </Button>,
        ]}
        width={700}
      >
        {currentUser && (
          <div>
            <div className="flex items-center mb-6">
              <Avatar size={80} src={currentUser.avatar} style={{ backgroundColor: "#f56a00" }}>
                {currentUser.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Avatar>
              <div className="ml-4">
                <h2 className="text-xl font-semibold">{currentUser.name}</h2>
                <p className="text-gray-600">{currentUser.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Tag color="blue">{currentUser.role}</Tag>
                  <Badge status={currentUser.status === "Active" ? "success" : "default"} text={currentUser.status} />
                </div>
              </div>
            </div>

            <Divider />

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div>
                  <h4 className="font-medium mb-2">Contact Information</h4>
                  <p>
                    <strong>Phone:</strong> {currentUser.phone}
                  </p>
                  <p>
                    <strong>Group:</strong> {currentUser.group}
                  </p>
                  <p>
                    <strong>Last Login:</strong>{" "}
                    {currentUser.lastLogin === "Never"
                      ? "Never"
                      : dayjs(currentUser.lastLogin).format("MMM DD, YYYY HH:mm")}
                  </p>
                  <p>
                    <strong>Created:</strong> {dayjs(currentUser.createdDate).format("MMM DD, YYYY")}
                  </p>
                </div>
              </Col>
              <Col span={12}>
                <div>
                  <h4 className="font-medium mb-2">Progress Overview</h4>
                  <div className="mb-2">
                    <span>Overall Progress</span>
                    <Progress percent={currentUser.progress.overall} size="small" />
                  </div>
                  <p>
                    <strong>Courses Enrolled:</strong> {currentUser.progress.courses}
                  </p>
                  <p>
                    <strong>Courses Completed:</strong> {currentUser.progress.completed}
                  </p>
                </div>
              </Col>
            </Row>

            <Divider />

            <div className="mb-4">
              <h4 className="font-medium mb-2">Description</h4>
              <p className="text-gray-600">{currentUser.description}</p>
            </div>

            <div className="mb-4">
              <h4 className="font-medium mb-2">Achievements</h4>
              <div className="flex flex-wrap gap-1">
                {currentUser.achievements.map((achievement, index) => (
                  <Tag key={index} color="green">
                    {achievement}
                  </Tag>
                ))}
                {currentUser.achievements.length === 0 && <span className="text-gray-400">No achievements yet</span>}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Enrolled Courses</h4>
              <div className="flex flex-wrap gap-1">
                {currentUser.courses.map((course, index) => (
                  <Tag key={index} color="blue">
                    {course}
                  </Tag>
                ))}
                {currentUser.courses.length === 0 && <span className="text-gray-400">No courses enrolled</span>}
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Delete User"
        open={isDeleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={() => {
          setIsDeleteModalVisible(false)
          setCurrentUser(null)
        }}
        okText="Delete"
        okType="danger"
        cancelText="Cancel"
      >
        {currentUser && (
          <div>
            <p>
              Are you sure you want to delete <strong>{currentUser.name}</strong>?
            </p>
            <p className="text-red-600 text-sm mt-2">
              This action cannot be undone. All user data will be permanently removed.
            </p>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Students
