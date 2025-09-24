/* eslint-disable no-unused-vars */
import { useState } from "react"
import {
  Card,
  Input,
  Button,
  Select,
  Modal,
  Form,
  Upload,
  Statistic,
  Dropdown,
  Menu,
  Tag,
  Progress,
  Tabs,
  Table,
  Space,
  Typography,
  Row,
  Col,
  Avatar,
  Divider,
  Badge,
  Drawer,
  message,
} from "antd"
import {
  SearchOutlined,
  PlusOutlined,
  MoreOutlined,
  EditOutlined,
  LoginOutlined,
  DeleteOutlined,
  UserOutlined,
  BookOutlined,
  CreditCardOutlined,
  UploadOutlined,
  EyeOutlined,
  StopOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons"

const { Option } = Select
const { Title, Text } = Typography
const { TabPane } = Tabs
const { confirm } = Modal

export default function ClientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterPlan, setFilterPlan] = useState("all")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showDetailsDrawer, setShowDetailsDrawer] = useState(false)
  const [showEditDrawer, setShowEditDrawer] = useState(false)
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showDeactivateModal, setShowDeactivateModal] = useState(false)
  const [form] = Form.useForm()

  const clients = [
    {
      id: "1",
      organizationName: "MedCare Pharmacy",
      logo: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=100&h=100&fit=crop&crop=center",
      primaryContact: "Dr. Sarah Johnson",
      email: "sarah@medcare.com",
      phone: "+1 (555) 123-4567",
      subscriptionPlan: "Premium",
      subscriptionStatus: "Active",
      activeUsers: 45,
      coursesEnrolled: 12,
      lastActivity: "2024-01-15",
      totalRevenue: 15420,
      address: "123 Healthcare Ave, Medical District",
      establishedDate: "2018-03-15",
      licenseNumber: "PH-2018-001234",
      specialties: ["General Medicine", "Pediatrics", "Geriatrics"],
      paymentMethods: [
        { type: "Credit Card", last4: "4532", expiry: "12/25" },
        { type: "Bank Transfer", account: "****1234" },
      ],
      recentPayments: [
        { date: "2024-01-01", amount: 299, status: "Paid", invoice: "INV-001" },
        { date: "2023-12-01", amount: 299, status: "Paid", invoice: "INV-002" },
      ],
      users: [
        { name: "Dr. Sarah Johnson", role: "Admin", status: "Active" },
        { name: "Nurse Mary Smith", role: "User", status: "Active" },
        { name: "Tech John Doe", role: "User", status: "Inactive" },
      ],
      courses: [
        { name: "Pharmacy Management", progress: 85, enrolled: 25 },
        { name: "Drug Safety", progress: 92, enrolled: 30 },
        { name: "Patient Care", progress: 78, enrolled: 20 },
      ],
    },
    {
      id: "2",
      organizationName: "HealthPlus Pharmacy",
      logo: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop&crop=center",
      primaryContact: "Dr. Michael Chen",
      email: "michael@healthplus.com",
      phone: "+1 (555) 987-6543",
      subscriptionPlan: "Standard",
      subscriptionStatus: "Active",
      activeUsers: 28,
      coursesEnrolled: 8,
      lastActivity: "2024-01-14",
      totalRevenue: 8960,
      address: "456 Wellness Blvd, Health Center",
      establishedDate: "2020-07-22",
      licenseNumber: "PH-2020-005678",
      specialties: ["Cardiology", "Diabetes Care"],
      paymentMethods: [{ type: "Credit Card", last4: "8765", expiry: "09/26" }],
      recentPayments: [
        { date: "2024-01-01", amount: 199, status: "Paid", invoice: "INV-003" },
        { date: "2023-12-01", amount: 199, status: "Paid", invoice: "INV-004" },
      ],
      users: [
        { name: "Dr. Michael Chen", role: "Admin", status: "Active" },
        { name: "Pharmacist Lisa Wong", role: "User", status: "Active" },
      ],
      courses: [
        { name: "Clinical Pharmacy", progress: 67, enrolled: 15 },
        { name: "Medication Therapy", progress: 89, enrolled: 18 },
      ],
    },
    {
      id: "3",
      organizationName: "Community Health Pharmacy",
      logo: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=100&h=100&fit=crop&crop=center",
      primaryContact: "Dr. Emily Rodriguez",
      email: "emily@communityhp.com",
      phone: "+1 (555) 456-7890",
      subscriptionPlan: "Basic",
      subscriptionStatus: "Trial",
      activeUsers: 12,
      coursesEnrolled: 5,
      lastActivity: "2024-01-13",
      totalRevenue: 2980,
      address: "789 Community St, Downtown",
      establishedDate: "2022-11-10",
      licenseNumber: "PH-2022-009876",
      specialties: ["Community Health", "Preventive Care"],
      paymentMethods: [],
      recentPayments: [],
      users: [{ name: "Dr. Emily Rodriguez", role: "Admin", status: "Active" }],
      courses: [{ name: "Community Pharmacy", progress: 45, enrolled: 8 }],
    },
  ]

  const [clientsData, setClientsData] = useState(clients)


  const filteredClients = clientsData.filter((client) => {
    const matchesSearch =
      client.organizationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.primaryContact.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.subscriptionPlan.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || client.subscriptionStatus.toLowerCase() === filterStatus
    const matchesPlan = filterPlan === "all" || client.subscriptionPlan.toLowerCase() === filterPlan

    return matchesSearch && matchesStatus && matchesPlan
  })

  // Handle Edit Client
  const handleEditClient = (client) => {
    setSelectedClient(client)
    // Pre-fill form with client data
    form.setFieldsValue({
      organizationName: client.organizationName,
      licenseNumber: client.licenseNumber,
      primaryContact: client.primaryContact,
      email: client.email,
      phone: client.phone,
      subscriptionPlan: client.subscriptionPlan,
      address: client.address,
      specialties: client.specialties,
    })
    setShowEditDrawer(true)
  }

  // Handle View Details
  const handleViewDetails = (client) => {
    setSelectedClient(client)
    setShowDetailsDrawer(true)
  }

  // Handle Manage Subscription
  const handleManageSubscription = (client) => {
    setSelectedClient(client)
    setShowSubscriptionModal(true)
  }

  // Handle Login as Admin
  const handleLoginAsAdmin = (client) => {
    message.info(`Logging in as admin for ${client.organizationName}...`)
    // Add your login logic here
  }

  const handleDeactivateConfirm = () => {
    if (selectedClient) {
      setClientsData((prev) =>
        prev.map((c) =>
          c.id === selectedClient.id
            ? { ...c, subscriptionStatus: "Inactive" }
            : c
        )
      )
      message.success(`${selectedClient.organizationName} has been deactivated`)
      setShowDeactivateModal(false)
      setSelectedClient(null)
    }
  }
  

  const handleDeleteConfirm = () => {
    if (selectedClient) {
      setClientsData((prev) => prev.filter((c) => c.id !== selectedClient.id))
      message.success(`${selectedClient.organizationName} has been deleted`)
      setShowDeleteModal(false)
      setSelectedClient(null)
    }
  }

  const handleDeactivate = (client) => {
    setSelectedClient(client)
    setShowDeactivateModal(true)
  }
  
  const handleDelete = (client) => {
    setSelectedClient(client)
    setShowDeleteModal(true)
  }
  
  

  const handleEditSubmit = (values) => {
    message.success(`${values.organizationName} has been updated successfully`)
    setShowEditDrawer(false)
    setSelectedClient(null)
    form.resetFields()
  }

  const handleSubscriptionUpdate = (values) => {
    message.success(`Subscription updated for ${selectedClient?.organizationName}`)
    setShowSubscriptionModal(false)
    setSelectedClient(null)
  }

  const getQuickActionsMenu = (client) => (
    <Menu>
      <Menu.Item
        key="edit"
        icon={<EditOutlined />}
        onClick={() => handleEditClient(client)}
      >
        Edit Organization
      </Menu.Item>
      <Menu.Item
        key="subscription"
        icon={<CreditCardOutlined />}
        onClick={() => handleManageSubscription(client)}
      >
        Manage Subscription
      </Menu.Item>
      <Menu.Item
        key="login"
        icon={<LoginOutlined />}
        onClick={() => handleLoginAsAdmin(client)}
      >
        Login as Admin
      </Menu.Item>
      <Menu.Item
        key="deactivate"
        icon={<StopOutlined />}
        onClick={() => handleDeactivate(client)}   
      >
        Deactivate
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="delete"
        icon={<DeleteOutlined />}
        danger
        onClick={() => handleDelete(client)}   
      >
        Delete
      </Menu.Item>
    </Menu>
  )
  

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "success"
      case "trial":
        return "warning"
      case "inactive":
        return "default"
      case "expired":
        return "error"
      default:
        return "default"
    }
  }

  const getPlanColor = (plan) => {
    switch (plan.toLowerCase()) {
      case "premium":
        return "gold"
      case "standard":
        return "blue"
      case "basic":
        return "green"
      default:
        return "default"
    }
  }

  return (
    <div className="min-h-screen  p-3">
      <div className="">
        {/* Header */}
        <div className="mb-5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <Title level={1} className="!text-foreground !mb-2">
                Clients & Pharmacies
              </Title>
              <Text className="text-muted-foreground">Manage your pharmacy clients and their subscriptions</Text>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row mb-5 gap-3">
          <Input
            placeholder="Search by organization, contact, or plan..."
            prefix={<SearchOutlined />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-80 text-sm"
            size="large"
          />

          <Select
            placeholder="Filter by Status"
            value={filterStatus}
            onChange={setFilterStatus}
            className="w-full sm:w-40 text-sm"
            size="large"
          >
            <Option value="all">All Status</Option>
            <Option value="active">Active</Option>
            <Option value="trial">Trial</Option>
            <Option value="inactive">Inactive</Option>
            <Option value="expired">Expired</Option>
          </Select>

          <Select
            placeholder="Filter by Plan"
            value={filterPlan}
            onChange={setFilterPlan}
            className="w-full sm:w-40"
            size="large"
            style={{ fontSize: '14px' }}
          >
            <Option value="all">All Plans</Option>
            <Option value="premium">Premium</Option>
            <Option value="standard">Standard</Option>
            <Option value="basic">Basic</Option>
          </Select>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={() => setShowCreateModal(true)}
            className="w-full sm:w-auto"
            style={{ fontSize: '14px' }}
          >
            Add New Client
          </Button>
        </div>

        {/* Client Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <Card
              key={client.id}
              className="hover:shadow-lg transition-all duration-300 border-border"
              actions={[
                <Button
                  key="view-details"
                  type="text"
                  icon={<EyeOutlined />}
                  onClick={() => handleViewDetails(client)}
                  className="text-primary"
                >
                  View Details
                </Button>,
              ]}
              extra={
                <Dropdown overlay={getQuickActionsMenu(client)} trigger={["click"]}>
                  <Button type="text" icon={<MoreOutlined />} />
                </Dropdown>
              }
            >
              <div className="text-center mb-4">
                <Avatar size={80} src={client.logo} className="mb-3 border-2 border-border" />
                <Title level={4} className="!text-card-foreground !mb-1">
                  {client.organizationName}
                </Title>
                <Text className="text-muted-foreground">{client.primaryContact}</Text>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Text className="text-muted-foreground">Status:</Text>
                  <Tag color={getStatusColor(client.subscriptionStatus)}>{client.subscriptionStatus}</Tag>
                </div>

                <div className="flex justify-between items-center">
                  <Text className="text-muted-foreground">Plan:</Text>
                  <Tag color={getPlanColor(client.subscriptionPlan)}>{client.subscriptionPlan}</Tag>
                </div>

                <Divider className="!my-4 !border-border" />

                <Row gutter={16}>
                  <Col span={8}>
                    <Statistic
                      title="Active Users"
                      value={client.activeUsers}
                      prefix={<UserOutlined />}
                      valueStyle={{ fontSize: "16px", color: "#22c55e" }}
                    />
                  </Col>
                  <Col span={8}>
                    <Statistic
                      title="Courses"
                      value={client.coursesEnrolled}
                      prefix={<BookOutlined />}
                      valueStyle={{ fontSize: "16px", color: "#3b82f6" }}
                    />
                  </Col>
                  <Col span={8}>
                    <Statistic
                      title="Revenue"
                      value={client.totalRevenue}
                      prefix="$"
                      valueStyle={{ fontSize: "16px", color: "#f59e0b" }}
                    />
                  </Col>
                </Row>
              </div>
            </Card>
          ))}
        </div>

        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <Text className="text-muted-foreground text-lg">No clients found matching your search criteria.</Text>
          </div>
        )}

        <Modal
          title="Add New Client"
          open={showCreateModal}
          onCancel={() => {
            setShowCreateModal(false)
          }}
          footer={null}
          width={600}
          className="dark-modal"
        >
          <Form layout="vertical" className="mt-6">
            <div className="text-center mb-6">
              <Upload name="logo" listType="picture-card" className="avatar-uploader" showUploadList={false}>
                <div>
                  <UploadOutlined />
                  <div className="mt-2">Upload Logo</div>
                </div>
              </Upload>
            </div>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Organization Name" required>
                  <Input placeholder="Enter organization name" size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="License Number" required>
                  <Input placeholder="Enter license number" size="large" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Primary Contact" required>
                  <Input placeholder="Enter contact name" size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Email" required>
                  <Input type="email" placeholder="Enter email" size="large" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label="Phone" required>
                  <Input placeholder="Enter phone number" size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Subscription Plan" required>
                  <Select placeholder="Select plan" size="large">
                    <Option value="basic">Basic</Option>
                    <Option value="standard">Standard</Option>
                    <Option value="premium">Premium</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            <Form.Item label="Address">
              <Input.TextArea placeholder="Enter full address" rows={3} />
            </Form.Item>

            <Form.Item label="Specialties">
              <Select mode="multiple" placeholder="Select specialties" size="large">
                <Option value="general">General Medicine</Option>
                <Option value="pediatrics">Pediatrics</Option>
                <Option value="geriatrics">Geriatrics</Option>
                <Option value="cardiology">Cardiology</Option>
                <Option value="diabetes">Diabetes Care</Option>
                <Option value="community">Community Health</Option>
              </Select>
            </Form.Item>

            <div className="flex justify-end gap-3 mt-6">
              <Button onClick={() => setShowCreateModal(false)}>Cancel</Button>
              <Button type="primary">Create Client</Button>
            </div>
          </Form>
        </Modal>

        <Drawer
          title={
            <div className="flex items-center justify-between">
              <span>Client Details</span>
              <Button
                type="text"
                icon={<CloseOutlined />}
                onClick={() => setShowDetailsDrawer(false)}
              />
            </div>
          }
          placement="right"
          width={900}
          open={showDetailsDrawer}
          onClose={() => {
            setShowDetailsDrawer(false)
            setSelectedClient(null)
          }}
          closable={false}
        >
          {selectedClient && (
            <div>
              {/* Header */}
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-border">
                <Avatar size={64} src={selectedClient.logo} />
                <div className="flex-1">
                  <Title level={3} className="!text-card-foreground !mb-1">
                    {selectedClient.organizationName}
                  </Title>
                  <Text className="text-muted-foreground">
                    {selectedClient.primaryContact} • {selectedClient.email}
                  </Text>
                  <div className="flex gap-2 mt-2">
                    <Tag color={getStatusColor(selectedClient.subscriptionStatus)}>
                      {selectedClient.subscriptionStatus}
                    </Tag>
                    <Tag color={getPlanColor(selectedClient.subscriptionPlan)}>{selectedClient.subscriptionPlan}</Tag>
                  </div>
                </div>
                <Space>
                  <Button icon={<EditOutlined />} onClick={() => handleEditClient(selectedClient)}>Edit</Button>
                  <Button icon={<LoginOutlined />} type="primary" onClick={() => handleLoginAsAdmin(selectedClient)}>
                    Login as Admin
                  </Button>
                </Space>
              </div>

              {/* Tabs */}
              <Tabs defaultActiveKey="overview">
                <TabPane tab="Overview" key="overview">
                  <Row gutter={24}>
                    <Col span={12}>
                      <Card title="Organization Profile" className="mb-4">
                        <div className="space-y-3">
                          <div>
                            <Text strong>Address:</Text>
                            <br />
                            <Text>{selectedClient.address}</Text>
                          </div>
                          <div>
                            <Text strong>License Number:</Text>
                            <br />
                            <Text>{selectedClient.licenseNumber}</Text>
                          </div>
                          <div>
                            <Text strong>Established:</Text>
                            <br />
                            <Text>{selectedClient.establishedDate}</Text>
                          </div>
                          <div>
                            <Text strong>Specialties:</Text>
                            <br />
                            <div className="flex flex-wrap gap-1 mt-1">
                              {selectedClient.specialties.map((specialty, index) => (
                                <Tag key={index}>{specialty}</Tag>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Col>
                    <Col span={12}>
                      <Card title="Key Metrics" className="mb-4">
                        <Row gutter={16}>
                          <Col span={12}>
                            <Statistic
                              title="Active Users"
                              value={selectedClient.activeUsers}
                              prefix={<UserOutlined />}
                            />
                          </Col>
                          <Col span={12}>
                            <Statistic
                              title="Courses Enrolled"
                              value={selectedClient.coursesEnrolled}
                              prefix={<BookOutlined />}
                            />
                          </Col>
                        </Row>
                        <Row gutter={16} className="mt-4">
                          <Col span={12}>
                            <Statistic title="Total Revenue" value={selectedClient.totalRevenue} prefix="$" />
                          </Col>
                          <Col span={12}>
                            <Statistic title="Last Activity" value={selectedClient.lastActivity} />
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  </Row>
                </TabPane>

                <TabPane tab="Subscription & Billing" key="billing">
                  <Row gutter={24}>
                    <Col span={12}>
                      <Card title="Subscription Details" className="mb-4">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <Text>Current Plan:</Text>
                            <Tag color={getPlanColor(selectedClient.subscriptionPlan)}>
                              {selectedClient.subscriptionPlan}
                            </Tag>
                          </div>
                          <div className="flex justify-between">
                            <Text>Status:</Text>
                            <Tag color={getStatusColor(selectedClient.subscriptionStatus)}>
                              {selectedClient.subscriptionStatus}
                            </Tag>
                          </div>
                          <div className="flex justify-between">
                            <Text>Next Billing:</Text>
                            <Text>Feb 1, 2024</Text>
                          </div>
                        </div>
                      </Card>

                      <Card title="Payment Methods">
                        {selectedClient.paymentMethods.length > 0 ? (
                          <div className="space-y-2">
                            {selectedClient.paymentMethods.map((method, index) => (
                              <div
                                key={index}
                                className="flex justify-between items-center p-2 border border-border rounded"
                              >
                                <div>
                                  <Text strong>{method.type}</Text>
                                  <br />
                                  <Text className="text-muted-foreground">
                                    {method.last4 ? `****${method.last4}` : method.account}
                                  </Text>
                                </div>
                                {method.expiry && <Text className="text-muted-foreground">Exp: {method.expiry}</Text>}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <Text className="text-muted-foreground">No payment methods added</Text>
                        )}
                      </Card>
                    </Col>
                    <Col span={12}>
                      <Card title="Payment History">
                        {selectedClient.recentPayments.length > 0 ? (
                          <Table
                            dataSource={selectedClient.recentPayments}
                            columns={[
                              { title: "Date", dataIndex: "date", key: "date" },
                              { title: "Amount", dataIndex: "amount", key: "amount", render: (amount) => `$${amount}` },
                              {
                                title: "Status",
                                dataIndex: "status",
                                key: "status",
                                render: (status) => <Tag color="success">{status}</Tag>,
                              },
                              { title: "Invoice", dataIndex: "invoice", key: "invoice" },
                            ]}
                            pagination={false}
                            size="small"
                          />
                        ) : (
                          <Text className="text-muted-foreground">No payment history</Text>
                        )}
                      </Card>
                    </Col>
                  </Row>
                </TabPane>

                <TabPane tab="Users & Courses" key="users">
                  <Row gutter={24}>
                    <Col span={12}>
                      <Card title="Users Overview">
                        <Table
                          dataSource={selectedClient.users}
                          columns={[
                            { title: "Name", dataIndex: "name", key: "name" },
                            { title: "Role", dataIndex: "role", key: "role" },
                            {
                              title: "Status",
                              dataIndex: "status",
                              key: "status",
                              render: (status) => (
                                <Badge status={status === "Active" ? "success" : "default"} text={status} />
                              ),
                            },
                          ]}
                          pagination={false}
                          size="small"
                        />
                      </Card>
                    </Col>
                    <Col span={12}>
                      <Card title="Courses Overview">
                        <div className="space-y-4">
                          {selectedClient.courses.map((course, index) => (
                            <div key={index}>
                              <div className="flex justify-between mb-1">
                                <Text strong>{course.name}</Text>
                                <Text className="text-muted-foreground">{course.enrolled} enrolled</Text>
                              </div>
                              <Progress percent={course.progress} size="small" strokeColor="#22c55e" />
                            </div>
                          ))}
                        </div>
                      </Card>
                    </Col>
                  </Row>
                </TabPane>

                <TabPane tab="Activity Log" key="activity">
                  <Card title="Recent Activity">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-3 border border-border rounded">
                        <div className="w-2 h-2 bg-accent rounded-full"></div>
                        <div className="flex-1">
                          <Text>User login: Dr. Sarah Johnson</Text>
                          <br />
                          <Text className="text-muted-foreground text-sm">2 hours ago</Text>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 border border-border rounded">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <div className="flex-1">
                          <Text>Course completed: Drug Safety</Text>
                          <br />
                          <Text className="text-muted-foreground text-sm">1 day ago</Text>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 border border-border rounded">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <div className="flex-1">
                          <Text>Payment processed: $299</Text>
                          <br />
                          <Text className="text-muted-foreground text-sm">3 days ago</Text>
                        </div>
                      </div>
                    </div>
                  </Card>
                </TabPane>
              </Tabs>
            </div>
          )}
        </Drawer>

        <Drawer
          style={{ zIndex: 1000 }}
          title={
            <div className="flex items-center  justify-between">
              <span>Edit Client</span>
              <Button
                type="text"
                icon={<CloseOutlined />}
                onClick={() => setShowEditDrawer(false)}
              />
            </div>
          }
          placement="right"
          width={600}
          open={showEditDrawer}
          onClose={() => {
            setShowEditDrawer(false)
            setSelectedClient(null)
            form.resetFields()
          }}
          closable={false}
        >
          {selectedClient && (
            <div>
              {/* Header */}
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-border">
                <Avatar size={64} src={selectedClient.logo} />
                <div className="flex-1">
                  <Title level={4} className="!text-card-foreground !mb-1">
                    Edit {selectedClient.organizationName}
                  </Title>
                  <Text className="text-muted-foreground">Update organization information</Text>
                </div>
              </div>

              <Form
                form={form}
                layout="vertical"
                onFinish={handleEditSubmit}
                className="space-y-4"
              >
                <div className="text-center mb-6">
                  <Upload name="logo" listType="picture-card" className="avatar-uploader" showUploadList={false}>
                    <Avatar size={80} src={selectedClient.logo} />
                  </Upload>
                  <Text className="text-muted-foreground text-sm block mt-2">Click to change logo</Text>
                </div>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="organizationName"
                      label="Organization Name"
                      rules={[{ required: true, message: 'Please enter organization name' }]}
                    >
                      <Input placeholder="Enter organization name" size="large" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="licenseNumber"
                      label="License Number"
                      rules={[{ required: true, message: 'Please enter license number' }]}
                    >
                      <Input placeholder="Enter license number" size="large" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="primaryContact"
                      label="Primary Contact"
                      rules={[{ required: true, message: 'Please enter contact name' }]}
                    >
                      <Input placeholder="Enter contact name" size="large" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={[
                        { required: true, message: 'Please enter email' },
                        { type: 'email', message: 'Please enter valid email' }
                      ]}
                    >
                      <Input type="email" placeholder="Enter email" size="large" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      name="phone"
                      label="Phone"
                      rules={[{ required: true, message: 'Please enter phone number' }]}
                    >
                      <Input placeholder="Enter phone number" size="large" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="subscriptionPlan"
                      label="Subscription Plan"
                      rules={[{ required: true, message: 'Please select a plan' }]}
                    >
                      <Select placeholder="Select plan" size="large">
                        <Option value="basic">Basic</Option>
                        <Option value="standard">Standard</Option>
                        <Option value="premium">Premium</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="address"
                  label="Address"
                >
                  <Input.TextArea placeholder="Enter full address" rows={3} />
                </Form.Item>

                <Form.Item
                  name="specialties"
                  label="Specialties"
                >
                  <Select mode="multiple" placeholder="Select specialties" size="large">
                    <Option value="General Medicine">General Medicine</Option>
                    <Option value="Pediatrics">Pediatrics</Option>
                    <Option value="Geriatrics">Geriatrics</Option>
                    <Option value="Cardiology">Cardiology</Option>
                    <Option value="Diabetes Care">Diabetes Care</Option>
                    <Option value="Community Health">Community Health</Option>
                    <Option value="Preventive Care">Preventive Care</Option>
                  </Select>
                </Form.Item>

                <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-border">
                  <Button onClick={() => setShowEditDrawer(false)}>Cancel</Button>
                  <Button type="primary" htmlType="submit">Update Client</Button>
                </div>
              </Form>
            </div>
          )}
        </Drawer>

        <Modal
          title="Manage Subscription"
          open={showSubscriptionModal}
          onCancel={() => {
            setShowSubscriptionModal(false)
            setSelectedClient(null)
          }}
          footer={null}
          width={600}
          className="dark-modal"
        >
          {selectedClient && (
            <div>
              {/* Current Subscription Info */}
              <div className="mb-6 rounded-lg">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar size={48} src={selectedClient.logo} />
                  <div>
                    <Title level={4} className="!mb-1">{selectedClient.organizationName}</Title>
                    <Text className="text-muted-foreground">{selectedClient.primaryContact}</Text>
                  </div>
                </div>

                <Row gutter={16}>
                  <Col span={8}>
                    <Text className="text-muted-foreground">Current Plan</Text>
                    <div>
                      <Tag color={getPlanColor(selectedClient.subscriptionPlan)} className="text-sm">
                        {selectedClient.subscriptionPlan}
                      </Tag>
                    </div>
                  </Col>
                  <Col span={8}>
                    <Text className="text-muted-foreground">Status</Text>
                    <div>
                      <Tag color={getStatusColor(selectedClient.subscriptionStatus)} className="text-sm">
                        {selectedClient.subscriptionStatus}
                      </Tag>
                    </div>
                  </Col>
                  <Col span={8}>
                    <Text className="text-muted-foreground">Monthly Revenue</Text>
                    <div>
                      <Text strong className="text-lg">${selectedClient.subscriptionPlan === 'Premium' ? '299' : selectedClient.subscriptionPlan === 'Standard' ? '199' : '99'}</Text>
                    </div>
                  </Col>
                </Row>
              </div>

              <Form layout="vertical" onFinish={handleSubscriptionUpdate}>
                <Form.Item
                  name="newPlan"
                  label="Change Subscription Plan"
                  initialValue={selectedClient.subscriptionPlan.toLowerCase()}
                >
                  <Select size="large">
                    <Option value="basic">
                      <div className="flex justify-between">
                        <span>Basic Plan</span>
                        <span className="text-muted-foreground">$99/month</span>
                      </div>
                    </Option>
                    <Option value="standard">
                      <div className="flex justify-between">
                        <span>Standard Plan</span>
                        <span className="text-muted-foreground">$199/month</span>
                      </div>
                    </Option>
                    <Option value="premium">
                      <div className="flex justify-between">
                        <span>Premium Plan</span>
                        <span className="text-muted-foreground">$299/month</span>
                      </div>
                    </Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="subscriptionStatus"
                  label="Subscription Status"
                  initialValue={selectedClient.subscriptionStatus.toLowerCase()}
                >
                  <Select size="large">
                    <Option value="active">Active</Option>
                    <Option value="trial">Trial</Option>
                    <Option value="inactive">Inactive</Option>
                    <Option value="expired">Expired</Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Billing Information">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Text>Next Billing Date:</Text>
                      <Text strong>February 1, 2024</Text>
                    </div>
                    <div className="flex justify-between items-center">
                      <Text>Billing Cycle:</Text>
                      <Text>Monthly</Text>
                    </div>
                    <div className="flex justify-between items-center">
                      <Text>Auto-renewal:</Text>
                      <Text className="text-green-600">Enabled</Text>
                    </div>
                  </div>
                </Form.Item>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded p-3 mb-4">
                  <Text className="text-sm">
                    <strong>Note:</strong> Changes to the subscription plan will take effect from the next billing cycle.
                    The client will be notified of any changes via email.
                  </Text>
                </div>

                <div className="flex justify-end gap-3">
                  <Button onClick={() => setShowSubscriptionModal(false)}>Cancel</Button>
                  <Button type="primary" htmlType="submit">Update Subscription</Button>
                </div>
              </Form>
            </div>
          )}
        </Modal>

       {/* Deactivate Modal */}
<Modal
  title={`Deactivate ${selectedClient?.organizationName}?`}
  open={showDeactivateModal}
  onOk={handleDeactivateConfirm}
  onCancel={() => setShowDeactivateModal(false)}
  okText="Yes, Deactivate"
  okType="danger"
  cancelText="Cancel"
>
  <p>
    Are you sure you want to deactivate this client? They will lose access to all services immediately.
  </p>
</Modal>

{/* Delete Modal */}
<Modal
  title={`Delete ${selectedClient?.organizationName}?`}
  open={showDeleteModal}
  onOk={handleDeleteConfirm}
  onCancel={() => setShowDeleteModal(false)}
  okText="Yes, Delete"
  okType="danger"
  cancelText="Cancel"
>
  <p>
    Are you sure you want to permanently delete this client? This action cannot be undone.
  </p>
</Modal>



      </div>
    </div>
  )
}