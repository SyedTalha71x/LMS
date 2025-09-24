import { useState } from "react"
import {
  Card,
  Button,
  Select,
  Space,
  Row,
  Col,
  Statistic,
  Progress,
  Typography,
  DatePicker,
  Tooltip,
  message,
} from "antd"
import { ExportOutlined, BarChartOutlined, PieChartOutlined, DownloadOutlined } from "@ant-design/icons"

const { Text } = Typography
const { Option } = Select
const { RangePicker } = DatePicker

const AnalyticsTab = ({ analyticsData }) => {
  const [dateRange, setDateRange] = useState("monthly")

  const handleExportReport = () => {
    // Create analytics report data
    const reportData = {
      dateRange,
      paymentSuccessRate: analyticsData.paymentSuccessRate,
      averageRevenuePerUser: analyticsData.arpu,
      churnRate: analyticsData.churnRate,
      revenueGrowth: analyticsData.revenueGrowth,
      monthlyRevenue: analyticsData.monthlyRevenue,
      generatedAt: new Date().toISOString(),
    }

    // Create and download JSON report
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: "application/json" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `analytics_report_${new Date().toISOString().split("T")[0]}.json`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    message.success("Analytics report exported successfully!")
  }

  const handleGenerateReport = () => {
    message.success("Custom report generated successfully!")
  }

  const handleExportCSV = () => {
    const csvContent = [
      ["Metric", "Value"],
      ["Payment Success Rate", `${analyticsData.paymentSuccessRate}%`],
      ["Average Revenue Per User", `$${analyticsData.arpu}`],
      ["Churn Rate", `${analyticsData.churnRate}%`],
      ["Revenue Growth", `${analyticsData.revenueGrowth}%`],
      ...analyticsData.monthlyRevenue.map((item) => [item.month, `$${item.amount}`]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `analytics_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    message.success("CSV exported successfully!")
  }

  return (
    <div>
      <Card
        title="Payment Analytics & Insights"
        extra={
          <Space>
            <Select value={dateRange} onChange={setDateRange} style={{ width: 150 }}>
              <Option value="weekly">Last 7 days</Option>
              <Option value="monthly">Last 30 days</Option>
              <Option value="quarterly">Last 90 days</Option>
              <Option value="yearly">Last 12 months</Option>
            </Select>
            <Button type="primary" icon={<ExportOutlined />} onClick={handleExportReport}>
              Export Report
            </Button>
          </Space>
        }
      >
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          {/* Key Performance Indicators */}
          <Col xs={24} sm={12} lg={6}>
            <Card size="small">
              <Statistic
                title="Payment Success Rate"
                value={analyticsData.paymentSuccessRate}
                suffix="%"
                valueStyle={{ color: "#52c41a" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card size="small">
              <Statistic
                title="Average Revenue Per Client"
                value={analyticsData.arpu}
                prefix="$"
                valueStyle={{ color: "#1890ff" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card size="small">
              <Statistic
                title="Churn Rate"
                value={analyticsData.churnRate}
                suffix="%"
                valueStyle={{ color: "#ff4d4f" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <Card size="small">
              <Statistic
                title="Revenue Growth"
                value={analyticsData.revenueGrowth}
                suffix="%"
                valueStyle={{ color: "#52c41a" }}
              />
            </Card>
          </Col>
        </Row>

        {/* Revenue Trend Chart */}
        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} lg={12}>
            <Card title="Revenue Trend" extra={<BarChartOutlined />}>
              <div
                style={{
                  height: 300,
                  display: "flex",
                  alignItems: "end",
                  justifyContent: "space-between",
                  padding: "20px 0",
                }}
              >
                {analyticsData.monthlyRevenue.map((item, index) => (
                  <div key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                    <Tooltip title={`$${item.amount.toLocaleString()}`}>
                      <div
                        style={{
                          width: "30px",
                          height: `${(item.amount / 30000) * 200}px`,
                          backgroundColor: "#1890ff",
                          borderRadius: "2px 2px 0 0",
                          marginBottom: "8px",
                          cursor: "pointer",
                        }}
                      />
                    </Tooltip>
                    <Text style={{ fontSize: "12px" }}>{item.month}</Text>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
          <Col xs={24} lg={12}>
            <Card title="Payment Methods Distribution" extra={<PieChartOutlined />}>
              <div style={{ padding: "20px 0" }}>
                <Space direction="vertical" style={{ width: "100%" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <Text>Credit Card</Text>
                      <Text strong>65%</Text>
                    </div>
                    <Progress percent={65} strokeColor="#1890ff" />
                  </div>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <Text>PayPal</Text>
                      <Text strong>25%</Text>
                    </div>
                    <Progress percent={25} strokeColor="#52c41a" />
                  </div>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                      <Text>Stripe</Text>
                      <Text strong>10%</Text>
                    </div>
                    <Progress percent={10} strokeColor="#722ed1" />
                  </div>
                </Space>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Customizable Reports Section */}
        <Card title="Customizable Reports" style={{ marginBottom: 16 }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Text strong>Generate Custom Report</Text>
                <Select placeholder="Select report type" style={{ width: "100%" }}>
                  <Option value="revenue">Revenue Analysis</Option>
                  <Option value="subscription">Subscription Metrics</Option>
                  <Option value="churn">Churn Analysis</Option>
                  <Option value="payment">Payment Success Rates</Option>
                </Select>
                <RangePicker style={{ width: "100%" }} />
                <Button type="primary" block onClick={handleGenerateReport}>
                  Generate Report
                </Button>
              </Space>
            </Col>
            <Col xs={24} md={12}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Text strong>Data Export Options</Text>
                <Button block icon={<DownloadOutlined />} onClick={handleExportCSV}>
                  Export as CSV
                </Button>
                <Button block icon={<DownloadOutlined />}>
                  Export as PDF
                </Button>
                <Button block icon={<DownloadOutlined />}>
                  Export as Excel
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>
      </Card>
    </div>
  )
}

export default AnalyticsTab
