import { useState } from "react"
import { Card, Table, Button, Input, Statistic, Space, Row, Col, Typography } from "antd"
import { FilterOutlined, DollarOutlined, WalletOutlined, UserOutlined, FileTextOutlined } from "@ant-design/icons"
import { TrendingUp } from "lucide-react"

const { Title, Text } = Typography

const OverviewTab = ({ paymentHistory, analyticsData, transactionColumns }) => {
  const [searchText, setSearchText] = useState("")

  const handleSearch = (value) => {
    setSearchText(value)
  }

  // Filter data based on search
  const filteredData = paymentHistory.filter(
    (item) =>
      item.student.toLowerCase().includes(searchText.toLowerCase()) ||
      item.transactionId.toLowerCase().includes(searchText.toLowerCase()),
  )

  return (
    <div>
      {/* Key Metrics */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={analyticsData.totalRevenue}
              precision={0}
              prefix={<DollarOutlined />}
              suffix={
                <Space>
                  <TrendingUp style={{ color: "#52c41a" }} />
                  <Text type="success">+{analyticsData.revenueGrowth}%</Text>
                </Space>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Monthly Recurring Revenue"
              value={analyticsData.monthlyRecurringRevenue}
              precision={0}
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
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Pending Payments"
              value={analyticsData.pendingPayments}
              precision={0}
              prefix={<WalletOutlined />}
              suffix={<Text type="warning">12 transactions</Text>}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Students"
              value={analyticsData.activeStudents}
              prefix={<UserOutlined />}
              suffix={
                <Space>
                  <TrendingUp style={{ color: "#52c41a" }} />
                  <Text type="success">+85 this month</Text>
                </Space>
              }
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Invoices Generated"
              value={analyticsData.invoicesGenerated}
              prefix={<FileTextOutlined />}
              suffix={<Text type="secondary">Last: 2 hours ago</Text>}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Title level={5} style={{ margin: 0, marginBottom: 8 }}>
              Platform Balance
            </Title>
            <Statistic
              value={53000}
              precision={0}
              prefix={<DollarOutlined />}
              suffix={<Text type="success">Available</Text>}
            />
          </Card>
        </Col>
      </Row>

      {/* Recent Transactions */}
      <Card
        title="Recent Transactions"
        extra={
          <Space>
            <Input.Search
              placeholder="Search transactions..."
              onSearch={handleSearch}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ width: 200 }}
            />
            <Button icon={<FilterOutlined />} />
          </Space>
        }
      >
        <Table
          columns={transactionColumns.slice(0, -1)} // Remove actions column for overview
          dataSource={filteredData.slice(0, 4)}
          pagination={false}
          scroll={{ x: 800 }}
        />
      </Card>
    </div>
  )
}

export default OverviewTab
