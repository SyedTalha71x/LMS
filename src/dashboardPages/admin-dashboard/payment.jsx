import { useState } from "react"
import {
  Card,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Table,
  Tag,
  Space,
  Row,
  Col,
  Statistic,
  Divider,
  Typography,
  Tooltip,
  Progress,
  Alert,
  Switch,
  message,
  DatePicker,
} from "antd"
import {
  CreditCardOutlined,
  DownloadOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  StarOutlined,
  StarFilled,
  SettingOutlined,
  CalendarOutlined,
  DollarOutlined,
  FileTextOutlined,
  SafetyOutlined,
  BankOutlined,
  PayCircleOutlined,
  TeamOutlined,

  ExclamationCircleOutlined,
  MailOutlined,
  BellOutlined,
  ReloadOutlined,
} from "@ant-design/icons"

const { Title, Text, Paragraph } = Typography
const { Option } = Select
const { RangePicker } = DatePicker

export default function SubscriptionDashboard() {
  const [manageModalVisible, setManageModalVisible] = useState(false)
  const [addCardModalVisible, setAddCardModalVisible] = useState(false)
  const [editCardModalVisible, setEditCardModalVisible] = useState(false)
  const [planModalVisible, setPlanModalVisible] = useState(false)
  const [billingDateModalVisible, setBillingDateModalVisible] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedCard, setSelectedCard] = useState(null)
  const [form] = Form.useForm()
  const [editForm] = Form.useForm()
  const [planForm] = Form.useForm()
  const [billingForm] = Form.useForm()

  // Sample data
  const subscriptionData = {
    plan: "Professional",
    status: "Active",
    nextPayment: "2025-02-15",
    amount: 29.99,
    billingCycle: "Monthly",
    daysLeft: 18,
  }

  const spendingData = {
    thisMonth: 29.99,
    lastMonth: 29.99,
    thisYear: 359.88,
    avgMonthly: 29.99,
  }

  const adminPaymentData = {
    totalUsers: 1247,
    activeSubscriptions: 1089,
    monthlyRevenue: 32567.43,
    churnRate: 2.3,
    averageRevenuePerUser: 29.91,
    failedPayments: 23,
    refundsThisMonth: 4,
    newSubscriptionsToday: 12,
  }

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "visa",
      last4: "4242",
      expiry: "12/26",
      name: "John Doe",
      isDefault: true,
      brand: "Visa",
    },
    {
      id: 2,
      type: "mastercard",
      last4: "8888",
      expiry: "09/25",
      name: "John Doe",
      isDefault: false,
      brand: "Mastercard",
    },
  ])

  const billingHistory = [
    {
      id: 1,
      date: "2025-01-15",
      description: "Professional Plan - January 2025",
      amount: 29.99,
      status: "Paid",
      invoice: "INV-2025-001",
      paymentMethod: "**** 4242",
    },
    {
      id: 2,
      date: "2024-12-15",
      description: "Professional Plan - December 2024",
      amount: 29.99,
      status: "Paid",
      invoice: "INV-2024-012",
      paymentMethod: "**** 4242",
    },
    {
      id: 3,
      date: "2024-11-15",
      description: "Professional Plan - November 2024",
      amount: 29.99,
      status: "Paid",
      invoice: "INV-2024-011",
      paymentMethod: "**** 8888",
    },
    {
      id: 4,
      date: "2024-10-15",
      description: "Professional Plan - October 2024",
      amount: 29.99,
      status: "Paid",
      invoice: "INV-2024-010",
      paymentMethod: "**** 4242",
    },
  ]

  const handleAddCard = (values) => {
    const newCard = {
      id: Date.now(),
      type: values.cardNumber.startsWith("4") ? "visa" : "mastercard",
      last4: values.cardNumber.slice(-4),
      expiry: values.expiry,
      name: values.cardName,
      isDefault: values.setDefault || paymentMethods.length === 0,
      brand: values.cardNumber.startsWith("4") ? "Visa" : "Mastercard",
    }

    let updatedMethods = [...paymentMethods]
    if (newCard.isDefault) {
      updatedMethods = updatedMethods.map((card) => ({ ...card, isDefault: false }))
    }
    updatedMethods.push(newCard)

    setPaymentMethods(updatedMethods)
    message.success("Payment method added successfully!")
    setAddCardModalVisible(false)
    form.resetFields()
  }

  const handleSetDefault = (cardId) => {
    setPaymentMethods((prev) => prev.map((card) => ({ ...card, isDefault: card.id === cardId })))
    message.success("Default payment method updated!")
  }

  const handleDeleteCard = (card) => {
    Modal.confirm({
      title: "Delete Payment Method",
      icon: <ExclamationCircleOutlined />,
      content: (
        <div style={{ marginTop: 16 }}>
          <p>Are you sure you want to delete this payment method?</p>
          <div
            style={{
              background: "#f5f5f5",
              padding: 12,
              borderRadius: 6,
              marginTop: 12,
            }}
          >
            <Text strong>{card.brand}</Text>
            <br />
            <Text type="secondary">**** **** **** {card.last4}</Text>
            <br />
            <Text type="secondary">Expires {card.expiry}</Text>
            {card.isDefault && (
              <div style={{ marginTop: 4 }}>
                <Tag color="gold" size="small">
                  Default
                </Tag>
              </div>
            )}
          </div>
          {card.isDefault && (
            <Alert
              message="This is your default payment method"
              description="You'll need to set another card as default before deleting this one."
              type="warning"
              size="small"
              style={{ marginTop: 12 }}
            />
          )}
        </div>
      ),
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      width: 400,
      onOk() {
        if (card.isDefault && paymentMethods.length > 1) {
          message.error("Please set another card as default before deleting this one.")
          return
        }
        setPaymentMethods((prev) => prev.filter((c) => c.id !== card.id))
        message.success("Payment method deleted successfully!")
      },
    })
  }

  const handleEditCard = (card) => {
    setSelectedCard(card)
    editForm.setFieldsValue({
      cardName: card.name,
      expiry: card.expiry,
    })
    setEditCardModalVisible(true)
  }

  const handleUpdateCard = (values) => {
    setPaymentMethods((prev) =>
      prev.map((card) =>
        card.id === selectedCard.id ? { ...card, name: values.cardName, expiry: values.expiry } : card,
      ),
    )
    message.success("Payment method updated successfully!")
    setEditCardModalVisible(false)
    editForm.resetFields()
    setSelectedCard(null)
  }

  const handleUpdatePlan = (values) => {
    console.log("Updating plan:", values)
    message.success(`Plan updated to ${values.plan} (${values.billingCycle})!`)
    setPlanModalVisible(false)
    planForm.resetFields()
  }

  const handleChangeBillingDate = (values) => {
    console.log("Changing billing date:", values)
    message.success(`Billing date changed to ${values.billingDate.format("MMMM Do")}!`)
    setBillingDateModalVisible(false)
    billingForm.resetFields()
  }

  const handleDownloadAllInvoices = () => {
    message.loading("Preparing invoice archive...", 2)
    setTimeout(() => {
      message.success("All invoices downloaded successfully!")
    }, 2000)
  }

  const handleEmailNotifications = (checked) => {
    message.success(`Email notifications ${checked ? "enabled" : "disabled"}!`)
  }

  const handleAutoRenewal = (checked) => {
    message.success(`Auto-renewal ${checked ? "enabled" : "disabled"}!`)
  }

  const handlePaymentReminders = (checked) => {
    message.success(`Payment reminders ${checked ? "enabled" : "disabled"}!`)
  }

  const downloadInvoice = (invoice) => {
    message.success(`Downloading ${invoice}...`)
  }

  const billingColumns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => new Date(date).toLocaleDateString(),
      responsive: ["sm"],
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `$${amount.toFixed(2)}`,
      align: "right",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={status === "Paid" ? "green" : "orange"}>{status}</Tag>,
      responsive: ["md"],
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button type="link" icon={<DownloadOutlined />} onClick={() => downloadInvoice(record.invoice)} size="small">
          Download
        </Button>
      ),
      align: "center",
    },
  ]

  const getCardIcon = (type) => {
    const icons = {
      visa: "💳",
      mastercard: "💳",
      amex: "💳",
    }
    return icons[type] || "💳"
  }

  const renderOverview = () => (
    <div>
      {/* Admin Payment Insights */}
      <Card
        title={
          <Space>
            {/* <TrendingUpOutlined style={{ color: "#1890ff" }} /> */}
            Admin Payment Insights
          </Space>
        }
        style={{ marginBottom: 24 }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={8} md={6}>
            <Statistic
              title="Total Users"
              value={adminPaymentData.totalUsers}
              prefix={<TeamOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Col>
          <Col xs={12} sm={8} md={6}>
            <Statistic
              title="Active Subscriptions"
              value={adminPaymentData.activeSubscriptions}
              valueStyle={{ color: "#52c41a" }}
            />
          </Col>
          <Col xs={12} sm={8} md={6}>
            <Statistic
              title="Monthly Revenue"
              value={adminPaymentData.monthlyRevenue}
              prefix="$"
              precision={2}
              valueStyle={{ color: "#52c41a" }}
            />
          </Col>
          <Col xs={12} sm={8} md={6}>
            <Statistic
              title="Churn Rate"
              value={adminPaymentData.churnRate}
              suffix="%"
              valueStyle={{ color: "#faad14" }}
            />
          </Col>
          <Col xs={12} sm={8} md={6}>
            <Statistic title="ARPU" value={adminPaymentData.averageRevenuePerUser} prefix="$" precision={2} />
          </Col>
          <Col xs={12} sm={8} md={6}>
            <Statistic
              title="Failed Payments"
              value={adminPaymentData.failedPayments}
              valueStyle={{ color: "#ff4d4f" }}
            />
          </Col>
          <Col xs={12} sm={8} md={6}>
            <Statistic
              title="Refunds This Month"
              value={adminPaymentData.refundsThisMonth}
              valueStyle={{ color: "#ff7a45" }}
            />
          </Col>
          <Col xs={12} sm={8} md={6}>
            <Statistic
              title="New Today"
              value={adminPaymentData.newSubscriptionsToday}
              valueStyle={{ color: "#1890ff" }}
            />
          </Col>
        </Row>
      </Card>

      {/* Current Subscription */}
      <Card
        title={
          <Space>
            <SafetyOutlined style={{ color: "#52c41a" }} />
            Current Subscription
          </Space>
        }
        style={{ marginBottom: 24 }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Statistic
              title="Plan"
              value={subscriptionData.plan}
              prefix={<StarFilled style={{ color: "#faad14" }} />}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Statistic title="Status" value={subscriptionData.status} valueStyle={{ color: "#52c41a" }} />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Statistic
              title="Next Payment"
              value={new Date(subscriptionData.nextPayment).toLocaleDateString()}
              prefix={<CalendarOutlined />}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Statistic title="Amount" value={subscriptionData.amount} prefix="$" suffix="/month" />
          </Col>
        </Row>

        <Divider />

        <Row align="middle" gutter={16}>
          <Col flex="auto">
            <Text>Days until next payment: </Text>
            <Progress
              percent={(subscriptionData.daysLeft / 30) * 100}
              format={() => `${subscriptionData.daysLeft} days`}
              strokeColor="#1890ff"
            />
          </Col>
        </Row>
      </Card>

      {/* Spending Summary */}
      <Card
        title={
          <Space>
            <DollarOutlined style={{ color: "#1890ff" }} />
            Spending Summary
          </Space>
        }
        style={{ marginBottom: 24 }}
      >
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={6}>
            <Statistic title="This Month" value={spendingData.thisMonth} prefix="$" valueStyle={{ color: "#1890ff" }} />
          </Col>
          <Col xs={12} sm={6}>
            <Statistic title="Last Month" value={spendingData.lastMonth} prefix="$" />
          </Col>
          <Col xs={12} sm={6}>
            <Statistic title="This Year" value={spendingData.thisYear} prefix="$" valueStyle={{ color: "#52c41a" }} />
          </Col>
          <Col xs={12} sm={6}>
            <Statistic title="Avg Monthly" value={spendingData.avgMonthly} prefix="$" />
          </Col>
        </Row>
      </Card>

      {/* Security Notice */}
      <Alert
        message="Secure Payment Processing"
        description="All payment information is encrypted and processed securely. We never store your complete card details."
        type="info"
        icon={<SafetyOutlined />}
        showIcon
        style={{ marginBottom: 24 }}
      />
    </div>
  )

  const renderPaymentMethods = () => (
    <div>
      <div
        style={{
          marginBottom: 16,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <Title level={4} style={{ margin: 0 }}>
          Saved Payment Methods
        </Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setAddCardModalVisible(true)}>
          Add Card
        </Button>
      </div>

      <Row gutter={[16, 16]}>
        {paymentMethods.map((card) => (
          <Col xs={24} sm={12} lg={8} key={card.id} style={{ display: "flex" }}>
            <Card
              size="small"
              style={{ flex: 1 }}
              actions={[
                <Tooltip key="setDefaultTooltip" title={card.isDefault ? "Default card" : "Set as default"}>
                  <Button
                    key="setDefaultButton"
                    type="text"
                    icon={card.isDefault ? <StarFilled style={{ color: "#faad14" }} /> : <StarOutlined />}
                    onClick={() => !card.isDefault && handleSetDefault(card.id)}
                  />
                </Tooltip>,
                <Tooltip key="editTooltip" title="Edit">
                  <Button key="editButton" type="text" icon={<EditOutlined />} onClick={() => handleEditCard(card)} />
                </Tooltip>,
                <Tooltip key="deleteTooltip" title="Delete">
                  <Button
                    key="deleteButton"
                    type="text"
                    icon={<DeleteOutlined />}
                    danger
                    onClick={() => handleDeleteCard(card)}
                  />
                </Tooltip>,
              ]}
            >
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "24px", marginBottom: 8 }}>{getCardIcon(card.type)}</div>
                <Text strong>{card.brand}</Text>
                <br />
                <Text type="secondary">**** **** **** {card.last4}</Text>
                <br />
                <Text type="secondary">Expires {card.expiry}</Text>
                {card.isDefault && (
                  <div style={{ marginTop: 8 }}>
                    <Tag color="gold">Default</Tag>
                  </div>
                )}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )

  const renderBillingHistory = () => (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Title level={4} style={{ margin: 0 }}>
          Billing History
        </Title>
        <Text type="secondary">Download invoices and view payment history</Text>
      </div>

      <Table
        columns={billingColumns}
        dataSource={billingHistory}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        scroll={{ x: 600 }}
        size="middle"
      />
    </div>
  )

  const tabItems = [
    { key: "overview", label: "Dashboard Overview", icon: <DollarOutlined /> },
    { key: "payment-methods", label: "Payment Methods", icon: <CreditCardOutlined /> },
    { key: "billing-history", label: "Billing History", icon: <FileTextOutlined /> },
  ]

  return (
    <div style={{ padding: "16px", minHeight: "100vh" }}>
      {/* Header */}
      <div
        style={{
          marginBottom: 24,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <h1 className="md:text-2xl text-xl poppins-thin_600">Manage Payments</h1>
        </div>
        <Button type="primary" icon={<SettingOutlined />} onClick={() => setManageModalVisible(true)} size="large">
          Manage Account
        </Button>
      </div>

      {/* Tab Navigation */}
      <Card style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {tabItems.map((item) => (
            <Button
              key={item.key}
              type={activeTab === item.key ? "primary" : "default"}
              icon={item.icon}
              onClick={() => setActiveTab(item.key)}
              style={{ marginBottom: "8px" }}
            >
              <span style={{ display: window.innerWidth > 768 ? "inline" : "none" }}>{item.label}</span>
            </Button>
          ))}
        </div>
      </Card>

      {/* Content */}
      <div>
        {activeTab === "overview" && renderOverview()}
        {activeTab === "payment-methods" && renderPaymentMethods()}
        {activeTab === "billing-history" && renderBillingHistory()}
      </div>

      {/* Manage Account Modal */}
      <Modal
        title={
          <Space>
            <SettingOutlined />
            Manage Account
          </Space>
        }
        open={manageModalVisible}
        onCancel={() => setManageModalVisible(false)}
        footer={null}
        width={600}
      >
        <div style={{ padding: "16px 0" }}>
          <Row gutter={[16, 24]}>
            <Col span={24}>
              <Card size="small" title="Quick Actions">
                <Space direction="vertical" style={{ width: "100%" }}>
                  <Button
                    block
                    icon={<CreditCardOutlined />}
                    onClick={() => {
                      setManageModalVisible(false)
                      setAddCardModalVisible(true)
                    }}
                  >
                    Add Payment Method
                  </Button>
                  <Button
                    block
                    icon={<EditOutlined />}
                    onClick={() => {
                      setManageModalVisible(false)
                      setPlanModalVisible(true)
                    }}
                  >
                    Update Subscription Plan
                  </Button>
                  <Button
                    block
                    icon={<CalendarOutlined />}
                    onClick={() => {
                      setManageModalVisible(false)
                      setBillingDateModalVisible(true)
                    }}
                  >
                    Change Billing Date
                  </Button>
                  <Button
                    block
                    icon={<DownloadOutlined />}
                    onClick={() => {
                      setManageModalVisible(false)
                      handleDownloadAllInvoices()
                    }}
                  >
                    Download All Invoices
                  </Button>
                </Space>
              </Card>
            </Col>

            <Col span={24}>
              <Card size="small" title="Account Settings">
                <Space direction="vertical" style={{ width: "100%" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Space>
                      <MailOutlined />
                      <Text>Email Notifications</Text>
                    </Space>
                    <Switch defaultChecked onChange={handleEmailNotifications} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Space>
                      <ReloadOutlined />
                      <Text>Auto-renewal</Text>
                    </Space>
                    <Switch defaultChecked onChange={handleAutoRenewal} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Space>
                      <BellOutlined />
                      <Text>Payment Reminders</Text>
                    </Space>
                    <Switch defaultChecked onChange={handlePaymentReminders} />
                  </div>
                </Space>
              </Card>
            </Col>
          </Row>
        </div>
      </Modal>

      {/* Add Card Modal */}
      <Modal
        title={
          <Space>
            <CreditCardOutlined />
            Add Payment Method
          </Space>
        }
        open={addCardModalVisible}
        onCancel={() => {
          setAddCardModalVisible(false)
          form.resetFields()
        }}
        footer={null}
        width={500}
      >
        <Form form={form} layout="vertical" onFinish={handleAddCard} style={{ marginTop: 16 }}>
          <Form.Item
            name="cardNumber"
            label="Card Number"
            rules={[
              { required: true, message: "Please enter card number" },
              { pattern: /^\d{16}$/, message: "Please enter a valid 16-digit card number" },
            ]}
          >
            <Input placeholder="1234567890123456" maxLength={16} prefix={<CreditCardOutlined />} />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="expiry"
                label="Expiry Date"
                rules={[
                  { required: true, message: "Please enter expiry date" },
                  { pattern: /^(0[1-9]|1[0-2])\/\d{2}$/, message: "Please enter valid MM/YY format" },
                ]}
              >
                <Input placeholder="MM/YY" maxLength={5} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="cvv"
                label="CVV"
                rules={[
                  { required: true, message: "Please enter CVV" },
                  { pattern: /^\d{3,4}$/, message: "Please enter valid CVV" },
                ]}
              >
                <Input placeholder="123" maxLength={4} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="cardName"
            label="Cardholder Name"
            rules={[{ required: true, message: "Please enter cardholder name" }]}
          >
            <Input placeholder="John Doe" />
          </Form.Item>

          <Form.Item name="setDefault" valuePropName="checked">
            <Switch /> <Text style={{ marginLeft: 8 }}>Set as default payment method</Text>
          </Form.Item>

          <Divider>Or pay with</Divider>

          <Space direction="vertical" style={{ width: "100%" }}>
            <Button block icon={<PayCircleOutlined />} style={{ backgroundColor: "#0070ba", color: "white" }}>
              PayPal
            </Button>
            <Button block icon={<BankOutlined />} style={{ backgroundColor: "#635bff", color: "white" }}>
              Stripe
            </Button>
          </Space>

          <div style={{ marginTop: 24, textAlign: "center" }}>
            <Space>
              <Button
                onClick={() => {
                  setAddCardModalVisible(false)
                  form.resetFields()
                }}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Add Payment Method
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>

      {/* Edit Card Modal */}
      <Modal
        title={
          <Space>
            <EditOutlined />
            Edit Payment Method
          </Space>
        }
        open={editCardModalVisible}
        onCancel={() => {
          setEditCardModalVisible(false)
          editForm.resetFields()
          setSelectedCard(null)
        }}
        footer={null}
        width={400}
      >
        <Form form={editForm} layout="vertical" onFinish={handleUpdateCard} style={{ marginTop: 16 }}>
          <Form.Item
            name="cardName"
            label="Cardholder Name"
            rules={[{ required: true, message: "Please enter cardholder name" }]}
          >
            <Input placeholder="John Doe" />
          </Form.Item>

          <Form.Item
            name="expiry"
            label="Expiry Date"
            rules={[
              { required: true, message: "Please enter expiry date" },
              { pattern: /^(0[1-9]|1[0-2])\/\d{2}$/, message: "Please enter valid MM/YY format" },
            ]}
          >
            <Input placeholder="MM/YY" maxLength={5} />
          </Form.Item>

          <div style={{ textAlign: "center", marginTop: 24 }}>
            <Space>
              <Button
                onClick={() => {
                  setEditCardModalVisible(false)
                  editForm.resetFields()
                  setSelectedCard(null)
                }}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Update Card
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>

      {/* Update Plan Modal */}
      <Modal
        title={
          <Space>
            <EditOutlined />
            Update Subscription Plan
          </Space>
        }
        open={planModalVisible}
        onCancel={() => {
          setPlanModalVisible(false)
          planForm.resetFields()
        }}
        footer={null}
        width={500}
      >
        <Form form={planForm} layout="vertical" onFinish={handleUpdatePlan} style={{ marginTop: 16 }}>
          <Form.Item name="plan" label="Select Plan" rules={[{ required: true, message: "Please select a plan" }]}>
            <Select placeholder="Choose your plan">
              <Option value="Basic">Basic - $9.99/month</Option>
              <Option value="Professional">Professional - $29.99/month</Option>
              <Option value="Enterprise">Enterprise - $99.99/month</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="billingCycle"
            label="Billing Cycle"
            rules={[{ required: true, message: "Please select billing cycle" }]}
          >
            <Select placeholder="Choose billing cycle">
              <Option value="Monthly">Monthly</Option>
              <Option value="Yearly">Yearly (Save 20%)</Option>
            </Select>
          </Form.Item>

          <div style={{ textAlign: "center", marginTop: 24 }}>
            <Space>
              <Button
                onClick={() => {
                  setPlanModalVisible(false)
                  planForm.resetFields()
                }}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Update Plan
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>

      {/* Change Billing Date Modal */}
      <Modal
        title={
          <Space>
            <CalendarOutlined />
            Change Billing Date
          </Space>
        }
        open={billingDateModalVisible}
        onCancel={() => {
          setBillingDateModalVisible(false)
          billingForm.resetFields()
        }}
        footer={null}
        width={400}
      >
        <Form form={billingForm} layout="vertical" onFinish={handleChangeBillingDate} style={{ marginTop: 16 }}>
          <Form.Item
            name="billingDate"
            label="New Billing Date"
            rules={[{ required: true, message: "Please select a billing date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Alert
            message="Billing Date Change"
            description="Your next payment will be prorated based on the new billing date."
            type="info"
            style={{ marginBottom: 16 }}
          />

          <div style={{ textAlign: "center" }}>
            <Space>
              <Button
                onClick={() => {
                  setBillingDateModalVisible(false)
                  billingForm.resetFields()
                }}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Change Date
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </div>
  )
}
