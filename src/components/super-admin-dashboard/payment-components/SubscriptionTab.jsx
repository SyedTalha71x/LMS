import { useState } from "react"
import {
  Card,
  Table,
  Button,
  Space,
  Badge,
  Typography,
  Tag,
  Avatar,
  Progress,
  Row,
  Col,
  Dropdown,
  Menu,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  message,
  Statistic,
} from "antd"
import {
  PlusOutlined,
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  CloseOutlined,
  ReloadOutlined,
  FileTextOutlined,
  MoreOutlined,
  DollarOutlined,
} from "@ant-design/icons"
import { TrendingUp, TrendingDown } from "lucide-react"
import dayjs from 'dayjs'

const { Title, Text } = Typography
const { Option } = Select

const SubscriptionsTab = ({ subscriptionsData, subscriptionPlans, analyticsData }) => {
  // Modal states
  const [showAddSubscriptionModal, setShowAddSubscriptionModal] = useState(false)
  const [showEditSubscriptionModal, setShowEditSubscriptionModal] = useState(false)
  const [showEditPlanModal, setShowEditPlanModal] = useState(false)
  const [showViewSubscriptionModal, setShowViewSubscriptionModal] = useState(false)
  const [showRenewSubscriptionModal, setShowRenewSubscriptionModal] = useState(false)
  const [showCancelSubscriptionModal, setShowCancelSubscriptionModal] = useState(false)
  const [showDeleteSubscriptionModal, setShowDeleteSubscriptionModal] = useState(false)
  const [showDeletePlanModal, setShowDeletePlanModal] = useState(false)
  
  // Selected items
  const [selectedSubscription, setSelectedSubscription] = useState(null)
  const [selectedPlan, setSelectedPlan] = useState(null)
  
  // Forms
  const [subscriptionForm] = Form.useForm()
  const [addSubscriptionForm] = Form.useForm()
  const [planForm] = Form.useForm()

  // Local state to manage subscriptions and plans
  const [localSubscriptions, setLocalSubscriptions] = useState(subscriptionsData || [])
  const [localPlans, setLocalPlans] = useState(subscriptionPlans || [])

  // Add Subscription Functions
  const handleAddSubscription = () => {
    setShowAddSubscriptionModal(true)
    addSubscriptionForm.resetFields()
  }

  const handleAddSubscriptionSubmit = (values) => {
    const newSubscription = {
      ...values,
      id: Date.now(), // Simple ID generation
      startDate: values.startDate ? dayjs(values.startDate).format('YYYY-MM-DD') : '',
      endDate: values.endDate ? dayjs(values.endDate).format('YYYY-MM-DD') : '',
      nextBilling: values.endDate ? dayjs(values.endDate).add(1, 'month').format('YYYY-MM-DD') : null,
    }
    
    setLocalSubscriptions([...localSubscriptions, newSubscription])
    console.log("New subscription data:", newSubscription)
    message.success("New subscription added successfully!")
    setShowAddSubscriptionModal(false)
    addSubscriptionForm.resetFields()
  }

  // View Subscription Functions
  const handleViewSubscription = (subscription) => {
    setSelectedSubscription(subscription)
    setShowViewSubscriptionModal(true)
  }

  // Edit Subscription Functions
  const handleEditSubscription = (subscription) => {
    setSelectedSubscription(subscription)
    
    // Properly handle date conversion
    const formValues = {
      ...subscription,
      startDate: subscription.startDate ? dayjs(subscription.startDate) : null,
      endDate: subscription.endDate ? dayjs(subscription.endDate) : null,
    }
    
    subscriptionForm.setFieldsValue(formValues)
    setShowEditSubscriptionModal(true)
  }

  const handleEditSubscriptionSubmit = (values) => {
    const updatedSubscription = {
      ...selectedSubscription,
      ...values,
      startDate: values.startDate ? dayjs(values.startDate).format('YYYY-MM-DD') : '',
      endDate: values.endDate ? dayjs(values.endDate).format('YYYY-MM-DD') : '',
      nextBilling: values.endDate ? dayjs(values.endDate).add(1, 'month').format('YYYY-MM-DD') : null,
    }

    setLocalSubscriptions(prev => 
      prev.map(sub => sub.id === selectedSubscription.id ? updatedSubscription : sub)
    )
    
    console.log("Updated subscription data:", updatedSubscription)
    message.success(`${selectedSubscription?.clientName}'s subscription updated successfully!`)
    setShowEditSubscriptionModal(false)
    setSelectedSubscription(null)
  }

  // Renew Subscription Functions
  const handleRenewSubscription = (subscription) => {
    setSelectedSubscription(subscription)
    setShowRenewSubscriptionModal(true)
  }

  const handleRenewSubscriptionConfirm = () => {
    const renewedSubscription = {
      ...selectedSubscription,
      status: 'Active',
      endDate: dayjs(selectedSubscription.endDate).add(1, 'year').format('YYYY-MM-DD'),
      nextBilling: dayjs(selectedSubscription.endDate).add(1, 'month').format('YYYY-MM-DD'),
    }

    setLocalSubscriptions(prev => 
      prev.map(sub => sub.id === selectedSubscription.id ? renewedSubscription : sub)
    )
    
    message.success(`${selectedSubscription.clientName}'s subscription has been renewed successfully!`)
    setShowRenewSubscriptionModal(false)
    setSelectedSubscription(null)
  }

  // Cancel Subscription Functions
  const handleCancelSubscription = (subscription) => {
    setSelectedSubscription(subscription)
    setShowCancelSubscriptionModal(true)
  }

  const handleCancelSubscriptionConfirm = () => {
    const cancelledSubscription = {
      ...selectedSubscription,
      status: 'Canceled',
    }

    setLocalSubscriptions(prev => 
      prev.map(sub => sub.id === selectedSubscription.id ? cancelledSubscription : sub)
    )
    
    message.success(`${selectedSubscription.clientName}'s subscription has been canceled.`)
    setShowCancelSubscriptionModal(false)
    setSelectedSubscription(null)
  }

  // Delete Subscription Functions
  const handleDeleteSubscription = (subscription) => {
    setSelectedSubscription(subscription)
    setShowDeleteSubscriptionModal(true)
  }

  const handleDeleteSubscriptionConfirm = () => {
    setLocalSubscriptions(prev => prev.filter(sub => sub.id !== selectedSubscription.id))
    message.success(`${selectedSubscription.clientName}'s subscription has been deleted successfully!`)
    setShowDeleteSubscriptionModal(false)
    setSelectedSubscription(null)
  }

  // Generate Invoice Function
  const handleGenerateInvoice = (subscription) => {
    // Simulate invoice generation
    const invoiceData = {
      invoiceNumber: `INV-${Date.now()}`,
      clientName: subscription.clientName,
      amount: subscription.amount,
      plan: subscription.plan,
      date: dayjs().format('YYYY-MM-DD'),
    }
    
    console.log('Generated Invoice:', invoiceData)
    message.success(`Invoice #${invoiceData.invoiceNumber} generated for ${subscription.clientName}'s subscription`)
  }

  // Edit Plan Functions
  const handleEditPlan = (plan) => {
    setSelectedPlan(plan)
    planForm.setFieldsValue(plan)
    setShowEditPlanModal(true)
  }

  const handleEditPlanSubmit = (values) => {
    const updatedPlan = {
      ...selectedPlan,
      ...values,
    }

    setLocalPlans(prev => 
      prev.map(plan => plan.id === selectedPlan.id ? updatedPlan : plan)
    )
    
    console.log("Updated plan data:", updatedPlan)
    message.success(`${selectedPlan?.name} updated successfully!`)
    setShowEditPlanModal(false)
    setSelectedPlan(null)
  }

  // Delete Plan Functions
  const handleDeletePlan = (plan) => {
    setSelectedPlan(plan)
    setShowDeletePlanModal(true)
  }

  const handleDeletePlanConfirm = () => {
    setLocalPlans(prev => prev.filter(p => p.id !== selectedPlan.id))
    message.success(`${selectedPlan.name} has been deleted successfully!`)
    setShowDeletePlanModal(false)
    setSelectedPlan(null)
  }

  const subscriptionColumns = [
    {
      title: "Client Name",
      dataIndex: "clientName",
      key: "clientName",
      render: (name) => (
        <Space>
          <Avatar icon={<UserOutlined />} />
          <Text strong>{name}</Text>
        </Space>
      ),
    },
    {
      title: "Subscription Plan",
      dataIndex: "plan",
      key: "plan",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color =
          status === "Active" ? "green" : status === "Pending" ? "orange" : status === "Expired" ? "red" : "default"
        return <Tag color={color}>{status}</Tag>
      },
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `$${amount}`,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => {
        const menu = (
          <Menu>
            <Menu.Item key="view" icon={<EyeOutlined />} onClick={() => handleViewSubscription(record)}>
              View Details
            </Menu.Item>
            <Menu.Item key="modify" icon={<EditOutlined />} onClick={() => handleEditSubscription(record)}>
              Modify Plan
            </Menu.Item>
            <Menu.Item key="renew" icon={<ReloadOutlined />} onClick={() => handleRenewSubscription(record)}>
              Renew Subscription
            </Menu.Item>
            <Menu.Item key="cancel" icon={<CloseOutlined />} onClick={() => handleCancelSubscription(record)}>
              Cancel
            </Menu.Item>
            <Menu.Item key="invoice" icon={<FileTextOutlined />} onClick={() => handleGenerateInvoice(record)}>
              Generate Invoice
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="delete" icon={<DeleteOutlined />} danger onClick={() => handleDeleteSubscription(record)}>
              Delete Subscription
            </Menu.Item>
          </Menu>
        )

        return (
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button icon={<MoreOutlined />} />
          </Dropdown>
        )
      },
    },
  ]

  return (
    <div>
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={24}>
          <Card
            title={
              <Space>
                <Title level={4} style={{ margin: 0 }}>
                  Client Subscriptions
                </Title>
                <Badge count={localSubscriptions.length} showZero />
              </Space>
            }
            extra={
              <Button type="primary" icon={<PlusOutlined />} onClick={handleAddSubscription}>
                Add New Subscription
              </Button>
            }
          >
            <Table
              columns={subscriptionColumns}
              dataSource={localSubscriptions}
              rowKey="id"
              scroll={{ x: 1000 }}
              pagination={{
                showSizeChanger: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} subscriptions`,
              }}
            />
          </Card>
        </Col>
      </Row>

      {/* Subscription Plans Overview */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={24}>
          <Card title="Subscription Plans Overview">
            <Row gutter={[16, 16]}>
              {localPlans.map((plan) => (
                <Col xs={24} md={8} key={plan.id}>
                  <Card size="small">
                    <Space direction="vertical" style={{ width: "100%" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Title level={5} style={{ margin: 0 }}>
                          {plan.name}
                        </Title>
                        <Space>
                          <Button type="text" icon={<EditOutlined />} onClick={() => handleEditPlan(plan)} />
                          <Button type="text" icon={<DeleteOutlined />} danger onClick={() => handleDeletePlan(plan)} />
                        </Space>
                      </div>
                      <Text strong style={{ fontSize: "24px" }}>
                        ${plan.price}
                        <Text type="secondary" style={{ fontSize: "14px" }}>
                          /{plan.period}
                        </Text>
                      </Text>
                      <div>
                        <Text type="secondary">Active Students: </Text>
                        <Text strong>{plan.students}</Text>
                      </div>
                      <div>
                        <Text type="secondary">Total Revenue: </Text>
                        <Text strong>${plan.revenue?.toLocaleString() || 0}</Text>
                      </div>
                      <div>
                        <Text type="secondary">Renewal Rate: </Text>
                        <Text strong>{plan.renewalRate || 0}%</Text>
                        <Progress percent={plan.renewalRate || 0} size="small" />
                      </div>
                    </Space>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Subscription Analytics */}
      <Card title="Subscription Analytics">
        <Row gutter={[16, 16]}>
          <Col xs={24} md={8}>
            <Card size="small" style={{ backgroundColor: "#f6f6f6" }}>
              <Statistic
                title="Monthly Recurring Revenue"
                value={analyticsData?.monthlyRecurringRevenue || 0}
                prefix={<DollarOutlined />}
                suffix={
                  <Space>
                    <TrendingUp style={{ color: "#52c41a" }} />
                    <Text type="success">+8.2%</Text>
                  </Space>
                }
              />
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card size="small" style={{ backgroundColor: "#f6f6f6" }}>
              <Statistic
                title="Average Revenue Per User"
                value={analyticsData?.arpu || 0}
                prefix={<DollarOutlined />}
                suffix={
                  <Space>
                    <TrendingUp style={{ color: "#52c41a" }} />
                    <Text type="success">+2.1%</Text>
                  </Space>
                }
              />
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card size="small" style={{ backgroundColor: "#f6f6f6" }}>
              <Statistic
                title="Churn Rate"
                value={analyticsData?.churnRate || 0}
                suffix={
                  <Space>
                    <Text>%</Text>
                    <TrendingDown style={{ color: "#ff4d4f" }} />
                    <Text type="danger">+0.5%</Text>
                  </Space>
                }
              />
            </Card>
          </Col>
        </Row>
      </Card>

      {/* Add New Subscription Modal */}
      <Modal
        title="Add New Subscription"
        open={showAddSubscriptionModal}
        onCancel={() => setShowAddSubscriptionModal(false)}
        footer={null}
        width={600}
      >
        <Form form={addSubscriptionForm} layout="vertical" onFinish={handleAddSubscriptionSubmit}>
          <Form.Item
            label="Client Name"
            name="clientName"
            rules={[{ required: true, message: "Please enter client name" }]}
          >
            <Input placeholder="Enter client name" />
          </Form.Item>

          <Form.Item
            label="Subscription Plan"
            name="plan"
            rules={[{ required: true, message: "Please select a plan" }]}
          >
            <Select placeholder="Select a plan">
              <Option value="Basic Plan">Basic Plan</Option>
              <Option value="Standard Plan">Standard Plan</Option>
              <Option value="Premium Plan">Premium Plan</Option>
            </Select>
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Start Date"
                name="startDate"
                rules={[{ required: true, message: "Please select start date" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="End Date"
                name="endDate"
                rules={[{ required: true, message: "Please select end date" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Status" name="status" rules={[{ required: true, message: "Please select status" }]}>
            <Select placeholder="Select status">
              <Option value="Active">Active</Option>
              <Option value="Pending">Pending</Option>
              <Option value="Expired">Expired</Option>
              <Option value="Canceled">Canceled</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Amount" name="amount" rules={[{ required: true, message: "Please enter amount" }]}>
            <Input prefix="$" type="number" step="0.01" placeholder="0.00" />
          </Form.Item>

          <Form.Item>
            <Space style={{ width: "100%", justifyContent: "flex-end" }}>
              <Button onClick={() => setShowAddSubscriptionModal(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Add Subscription
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* View Subscription Details Modal */}
      <Modal
        title={`Subscription Details - ${selectedSubscription?.clientName}`}
        open={showViewSubscriptionModal}
        onCancel={() => setShowViewSubscriptionModal(false)}
        footer={
          <Button type="primary" onClick={() => setShowViewSubscriptionModal(false)}>
            Close
          </Button>
        }
        width={600}
      >
        {selectedSubscription && (
          <div style={{ marginTop: 16 }}>
            <p>
              <strong>Plan:</strong> {selectedSubscription.plan}
            </p>
            <p>
              <strong>Start Date:</strong> {selectedSubscription.startDate}
            </p>
            <p>
              <strong>End Date:</strong> {selectedSubscription.endDate}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <Tag
                color={
                  selectedSubscription.status === "Active" 
                    ? "green" 
                    : selectedSubscription.status === "Pending" 
                    ? "orange" 
                    : "red"
                }
              >
                {selectedSubscription.status}
              </Tag>
            </p>
            <p>
              <strong>Amount:</strong> ${selectedSubscription.amount}
            </p>
            <p>
              <strong>Next Billing:</strong> {selectedSubscription.nextBilling || "N/A"}
            </p>
          </div>
        )}
      </Modal>

      {/* Edit Subscription Modal */}
      <Modal
        title="Edit Subscription"
        open={showEditSubscriptionModal}
        onCancel={() => setShowEditSubscriptionModal(false)}
        footer={null}
        width={600}
      >
        <Form form={subscriptionForm} layout="vertical" onFinish={handleEditSubscriptionSubmit}>
          <Form.Item
            label="Client Name"
            name="clientName"
            rules={[{ required: true, message: "Please enter client name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Subscription Plan"
            name="plan"
            rules={[{ required: true, message: "Please select a plan" }]}
          >
            <Select>
              <Option value="Basic Plan">Basic Plan</Option>
              <Option value="Standard Plan">Standard Plan</Option>
              <Option value="Premium Plan">Premium Plan</Option>
            </Select>
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Start Date"
                name="startDate"
                rules={[{ required: true, message: "Please select start date" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="End Date"
                name="endDate"
                rules={[{ required: true, message: "Please select end date" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Status" name="status" rules={[{ required: true, message: "Please select status" }]}>
            <Select>
              <Option value="Active">Active</Option>
              <Option value="Pending">Pending</Option>
              <Option value="Expired">Expired</Option>
              <Option value="Canceled">Canceled</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Amount" name="amount" rules={[{ required: true, message: "Please enter amount" }]}>
            <Input prefix="$" type="number" step="0.01" />
          </Form.Item>

          <Form.Item>
            <Space style={{ width: "100%", justifyContent: "flex-end" }}>
              <Button onClick={() => setShowEditSubscriptionModal(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Update Subscription
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Renew Subscription Modal */}
      <Modal
        title="Renew Subscription"
        open={showRenewSubscriptionModal}
        onOk={handleRenewSubscriptionConfirm}
        onCancel={() => setShowRenewSubscriptionModal(false)}
        okText="Renew"
        cancelText="Cancel"
        okType="primary"
      >
        <p>Are you sure you want to renew <strong>{selectedSubscription?.clientName}'s</strong> subscription?</p>
        <p>This will extend the subscription for another year and set the status to Active.</p>
      </Modal>

      {/* Cancel Subscription Modal */}
      <Modal
        title="Cancel Subscription"
        open={showCancelSubscriptionModal}
        onOk={handleCancelSubscriptionConfirm}
        onCancel={() => setShowCancelSubscriptionModal(false)}
        okText="Cancel Subscription"
        cancelText="Keep Active"
        okType="danger"
      >
        <p>Are you sure you want to cancel <strong>{selectedSubscription?.clientName}'s</strong> subscription?</p>
        <p><strong>Warning:</strong> This action will change the subscription status to "Canceled". This action cannot be undone.</p>
      </Modal>

      {/* Delete Subscription Modal */}
      <Modal
        title="Delete Subscription"
        open={showDeleteSubscriptionModal}
        onOk={handleDeleteSubscriptionConfirm}
        onCancel={() => setShowDeleteSubscriptionModal(false)}
        okText="Delete"
        cancelText="Cancel"
        okType="danger"
      >
        <p>Are you sure you want to delete <strong>{selectedSubscription?.clientName}'s</strong> subscription?</p>
        <p><strong>Warning:</strong> This action cannot be undone. All subscription data will be permanently removed.</p>
      </Modal>

      {/* Edit Plan Modal */}
      <Modal
        title="Edit Subscription Plan"
        open={showEditPlanModal}
        onCancel={() => setShowEditPlanModal(false)}
        footer={null}
        width={500}
      >
        <Form form={planForm} layout="vertical" onFinish={handleEditPlanSubmit}>
          <Form.Item label="Plan Name" name="name" rules={[{ required: true, message: "Please enter plan name" }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Price" name="price" rules={[{ required: true, message: "Please enter price" }]}>
            <Input prefix="$" type="number" step="0.01" />
          </Form.Item>

          <Form.Item
            label="Billing Period"
            name="period"
            rules={[{ required: true, message: "Please select billing period" }]}
          >
            <Select>
              <Option value="monthly">Monthly</Option>
              <Option value="quarterly">Quarterly</Option>
              <Option value="yearly">Yearly</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space style={{ width: "100%", justifyContent: "flex-end" }}>
              <Button onClick={() => setShowEditPlanModal(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Update Plan
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Delete Plan Modal */}
      <Modal
        title="Delete Plan"
        open={showDeletePlanModal}
        onOk={handleDeletePlanConfirm}
        onCancel={() => setShowDeletePlanModal(false)}
        okText="Delete Plan"
        cancelText="Cancel"
        okType="danger"
      >
        <p>Are you sure you want to delete the <strong>{selectedPlan?.name}</strong>?</p>
        <p>This will affect <strong>{selectedPlan?.students}</strong> students.</p>
        <p><strong>Warning:</strong> This action cannot be undone.</p>
      </Modal>
    </div>
  )
}

export default SubscriptionsTab