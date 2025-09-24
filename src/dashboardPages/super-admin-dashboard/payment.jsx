import { useState } from "react"
import {
  Button,
  Modal,
  Form,
  Row,
  Col,
  Input,
  Space,
  Divider,
  Tabs,
  Drawer,
  Typography,
  Table,
  Tag,
  message,
} from "antd"
import { CreditCardOutlined, DownloadOutlined, PrinterOutlined } from "@ant-design/icons"

import OverviewTab from "../../components/super-admin-dashboard/payment-components/OverviewTab"
import TransactionsTab from "../../components/super-admin-dashboard/payment-components/TransactionTab"
import SubscriptionsTab from "../../components/super-admin-dashboard/payment-components/SubscriptionTab"
import AnalyticsTab from "../../components/super-admin-dashboard/payment-components/AnalyticsTab"
import PaymentMethodsSidebar from "../../components/super-admin-dashboard/payment-components/PaymentMethodSidebar"
const { Title, Text } = Typography
const { TabPane } = Tabs

const PaymentManagement = () => {
  const [activeTab, setActiveTab] = useState("overview")
  const [showCardsDrawer, setShowCardsDrawer] = useState(false)
  const [showAddCardModal, setShowAddCardModal] = useState(false)
  const [showInvoiceModal, setShowInvoiceModal] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [form] = Form.useForm()

  // Sample data
  const paymentHistory = [
    {
      id: 1,
      transactionId: "TRX-1001",
      title: "Payment of July 2025",
      date: "2025-11-22",
      cardNumber: "**** **** **** 4878",
      amount: 238,
      status: "Completed",
      student: "John Doe",
      course: "Advanced Web Development",
      paymentMethod: "Credit Card",
      description: "Monthly subscription payment",
    },
    {
      id: 2,
      transactionId: "TRX-1002",
      title: "Payment of Jun 2025",
      date: "2025-11-22",
      cardNumber: "**** **** **** 4878",
      amount: 238,
      status: "Completed",
      student: "Jane Smith",
      course: "UX Design Fundamentals",
      paymentMethod: "PayPal",
      description: "Course enrollment fee",
    },
    {
      id: 3,
      transactionId: "TRX-1003",
      title: "Payment of May 2025",
      date: "2025-11-22",
      cardNumber: "**** **** **** 4878",
      amount: 238,
      status: "Failed",
      student: "Robert Johnson",
      course: "Data Science Bootcamp",
      paymentMethod: "Credit Card",
      description: "Subscription renewal",
    },
    {
      id: 4,
      transactionId: "TRX-1004",
      title: "Payment of April 2025",
      date: "2025-11-22",
      cardNumber: "**** **** **** 4878",
      amount: 238,
      status: "Pending",
      student: "Emily Williams",
      course: "Mobile App Development",
      paymentMethod: "Stripe",
      description: "Course upgrade payment",
    },
  ]

  const subscriptionsData = [
    {
      id: 1,
      clientName: "John Doe",
      plan: "Premium Plan",
      startDate: "2025-01-15",
      endDate: "2025-12-15",
      status: "Active",
      amount: 99.99,
      nextBilling: "2025-12-15",
    },
    {
      id: 2,
      clientName: "Jane Smith",
      plan: "Standard Plan",
      startDate: "2025-02-01",
      endDate: "2025-11-01",
      status: "Expired",
      amount: 49.99,
      nextBilling: null,
    },
    {
      id: 3,
      clientName: "Robert Johnson",
      plan: "Basic Plan",
      startDate: "2025-03-10",
      endDate: "2026-03-10",
      status: "Active",
      amount: 19.99,
      nextBilling: "2025-12-10",
    },
    {
      id: 4,
      clientName: "Emily Williams",
      plan: "Premium Plan",
      startDate: "2025-01-20",
      endDate: "2025-12-20",
      status: "Canceled",
      amount: 99.99,
      nextBilling: null,
    },
  ]

  const analyticsData = {
    totalRevenue: 238400,
    monthlyRecurringRevenue: 24568,
    pendingPayments: 12580,
    activeStudents: 1245,
    invoicesGenerated: 1245,
    revenueGrowth: 12.5,
    churnRate: 3.2,
    arpu: 42.35,
    paymentSuccessRate: 94.8,
    monthlyRevenue: [
      { month: "Jan", amount: 12000 },
      { month: "Feb", amount: 15000 },
      { month: "Mar", amount: 18000 },
      { month: "Apr", amount: 22000 },
      { month: "May", amount: 19000 },
      { month: "Jun", amount: 25000 },
      { month: "Jul", amount: 28000 },
    ],
  }

  const subscriptionPlans = [
    {
      id: 1,
      name: "Basic Plan",
      price: 19.99,
      period: "monthly",
      students: 124,
      revenue: 2478.76,
      renewalRate: 78,
    },
    {
      id: 2,
      name: "Standard Plan",
      price: 49.99,
      period: "monthly",
      students: 356,
      revenue: 17796.44,
      renewalRate: 85,
    },
    {
      id: 3,
      name: "Premium Plan",
      price: 99.99,
      period: "monthly",
      students: 765,
      revenue: 76492.35,
      renewalRate: 92,
    },
  ]

  // Basic transaction columns for overview
  const transactionColumns = [
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Client Name",
      dataIndex: "student",
      key: "student",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `$${amount}`,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const color = status === "Completed" ? "green" : status === "Pending" ? "orange" : "red"
        return <Tag color={color}>{status}</Tag>
      },
    },
  ]

  const openInvoiceModal = (payment) => {
    setSelectedPayment(payment)
    setShowInvoiceModal(true)
  }

  const closeInvoiceModal = () => {
    setShowInvoiceModal(false)
    setSelectedPayment(null)
  }

  return (
    <div className="min-h-screen">
      <div style={{ padding: "10px", minHeight: "100vh" }}>
        <div style={{ maxWidth: "100%", margin: "0 auto" }}>
          <div style={{ marginBottom: "24px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              <Title level={2} style={{ margin: 0 }}>
                Payment Management
              </Title>
              <Button type="primary" icon={<CreditCardOutlined />} onClick={() => setShowCardsDrawer(true)}>
                Manage Cards
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <Tabs activeKey={activeTab} onChange={setActiveTab} size="large">
            <TabPane tab="Overview" key="overview">
              <OverviewTab
                paymentHistory={paymentHistory}
                analyticsData={analyticsData}
                transactionColumns={transactionColumns}
              />
            </TabPane>
            <TabPane tab="Transactions" key="transactions">
              <TransactionsTab paymentHistory={paymentHistory} openInvoiceModal={openInvoiceModal} />
            </TabPane>
            <TabPane tab="Subscriptions" key="subscriptions">
              <SubscriptionsTab
                subscriptionsData={subscriptionsData}
                subscriptionPlans={subscriptionPlans}
                analyticsData={analyticsData}
              />
            </TabPane>
            <TabPane tab="Analytics" key="analytics">
              <AnalyticsTab analyticsData={analyticsData} />
            </TabPane>
          </Tabs>
        </div>
      </div>

      <Drawer
        title="Payment Methods"
        placement="right"
        onClose={() => setShowCardsDrawer(false)}
        open={showCardsDrawer}
        width={400}
      >
        <PaymentMethodsSidebar onClose={() => setShowCardsDrawer(false)} onAddCard={() => setShowAddCardModal(true)} />
      </Drawer>

      {/* Add Card Modal */}
      <Modal
        title="Add Payment Method"
        open={showAddCardModal}
        onCancel={() => setShowAddCardModal(false)}
        footer={null}
        width={500}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={() => {
            message.success("Payment method added successfully!")
            setShowAddCardModal(false)
          }}
        >
          <Form.Item
            label="Card Number"
            name="cardNumber"
            rules={[{ required: true, message: "Please enter card number" }]}
          >
            <Input placeholder="1234 5678 9012 3456" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Expiry Date"
                name="expiryDate"
                rules={[{ required: true, message: "Please enter expiry date" }]}
              >
                <Input placeholder="MM/YY" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="CVV" name="cvv" rules={[{ required: true, message: "Please enter CVV" }]}>
                <Input placeholder="123" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Cardholder Name"
            name="cardholderName"
            rules={[{ required: true, message: "Please enter cardholder name" }]}
          >
            <Input placeholder="John Doe" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Add Card
            </Button>
          </Form.Item>

          <Divider>Or</Divider>

          <Space direction="vertical" style={{ width: "100%" }}>
            <Button block>Connect PayPal</Button>
            <Button block>Connect Stripe</Button>
          </Space>
        </Form>
      </Modal>

      {/* Invoice Modal */}
      <Modal
        title={`Invoice #${selectedPayment?.transactionId}`}
        open={showInvoiceModal}
        onCancel={closeInvoiceModal}
        width={800}
        footer={[
          <Button key="download" icon={<DownloadOutlined />}>
            Download
          </Button>,
          <Button key="print" icon={<PrinterOutlined />}>
            Print
          </Button>,
          <Button key="close" onClick={closeInvoiceModal}>
            Close
          </Button>,
        ]}
      >
        {selectedPayment && (
          <div>
            <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
              <Col span={12}>
                <Title level={5}>From</Title>
                <Text>LMS Admin</Text>
                <br />
                <Text type="secondary">123 Education Street</Text>
                <br />
                <Text type="secondary">Learning City, LC 12345</Text>
                <br />
                <Text type="secondary">admin@lmssystem.com</Text>
              </Col>
              <Col span={12}>
                <Title level={5}>To</Title>
                <Text>{selectedPayment.student}</Text>
                <br />
                <Text type="secondary">Student ID: ST-{selectedPayment.id + 5000}</Text>
                <br />
                <Text type="secondary">student@example.com</Text>
              </Col>
            </Row>

            <Divider />

            <Table
              columns={[
                { title: "Description", dataIndex: "description", key: "description" },
                { title: "Course", dataIndex: "course", key: "course" },
                { title: "Amount", dataIndex: "amount", key: "amount", render: (amount) => `$${amount}` },
              ]}
              dataSource={[
                {
                  key: "1",
                  description: selectedPayment.title,
                  course: selectedPayment.course,
                  amount: selectedPayment.amount,
                },
                {
                  key: "2",
                  description: "Platform Fee",
                  course: "-",
                  amount: 12,
                },
              ]}
              pagination={false}
              summary={() => (
                <Table.Summary>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={2}>
                      <Text strong>Subtotal</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2}>
                      <Text strong>$250</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={2}>
                      <Text strong>Tax (5%)</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2}>
                      <Text strong>$12.50</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0} colSpan={2}>
                      <Text strong>Total</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={2}>
                      <Text strong>$262.50</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </Table.Summary>
              )}
            />

            <Divider />

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Text>
                  <Text strong>Payment Method:</Text> {selectedPayment.paymentMethod}
                </Text>
                <br />
                <Text>
                  <Text strong>Card Number:</Text> {selectedPayment.cardNumber}
                </Text>
              </Col>
              <Col span={12}>
                <Text>
                  <Text strong>Status:</Text>{" "}
                  <Tag
                    color={
                      selectedPayment.status === "Completed"
                        ? "green"
                        : selectedPayment.status === "Pending"
                          ? "orange"
                          : "red"
                    }
                  >
                    {selectedPayment.status}
                  </Tag>
                </Text>
                <br />
                <Text>
                  <Text strong>Transaction ID:</Text> {selectedPayment.transactionId}
                </Text>
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default PaymentManagement
