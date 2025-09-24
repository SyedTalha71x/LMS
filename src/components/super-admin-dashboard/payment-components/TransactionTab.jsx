import { useState } from "react"
import { Card, Table, Button, Input, Select, DatePicker, Space, Badge, Typography, Tag, message } from "antd"
import { DownloadOutlined, EyeOutlined, FileTextOutlined } from "@ant-design/icons"

const { Title, Text } = Typography
const { Option } = Select
const { RangePicker } = DatePicker

const TransactionsTab = ({ paymentHistory, openInvoiceModal }) => {
  const [searchText, setSearchText] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateRange, setDateRange] = useState(null)

  const handleSearch = (value) => {
    setSearchText(value)
  }

  const handleStatusFilter = (value) => {
    setStatusFilter(value)
  }

  const handleDateRangeChange = (dates) => {
    setDateRange(dates)
  }

  const getFilteredData = () => {
    let filtered = paymentHistory

    // Apply search filter
    if (searchText) {
      filtered = filtered.filter(
        (item) =>
          item.student.toLowerCase().includes(searchText.toLowerCase()) ||
          item.transactionId.toLowerCase().includes(searchText.toLowerCase()) ||
          item.description.toLowerCase().includes(searchText.toLowerCase()),
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((item) => item.status.toLowerCase() === statusFilter.toLowerCase())
    }

    // Apply date range filter
    if (dateRange && dateRange.length === 2) {
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.date)
        return itemDate >= dateRange[0].toDate() && itemDate <= dateRange[1].toDate()
      })
    }

    return filtered
  }

  const handleExportTransactions = () => {
    const filteredData = getFilteredData()

    // Create CSV content
    const headers = ["Transaction ID", "Date", "Client Name", "Amount", "Description", "Payment Method", "Status"]
    const csvContent = [
      headers.join(","),
      ...filteredData.map((row) =>
        [row.transactionId, row.date, row.student, row.amount, row.description, row.paymentMethod, row.status].join(
          ",",
        ),
      ),
    ].join("\n")

    // Create and download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `transactions_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    message.success("Transaction report downloaded successfully!")
  }

  const transactionColumns = [
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
      sorter: (a, b) => a.transactionId.localeCompare(b.transactionId),
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
    },
    {
      title: "Client Name",
      dataIndex: "student",
      key: "student",
      sorter: (a, b) => a.student.localeCompare(b.student),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
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
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button type="link" icon={<EyeOutlined />} onClick={() => openInvoiceModal(record)}>
            View
          </Button>
          <Button type="link" icon={<FileTextOutlined />}>
            Invoice
          </Button>
        </Space>
      ),
    },
  ]

  const filteredData = getFilteredData()

  return (
    <div>
      <Card
        title={
          <Space>
            <Title level={4} style={{ margin: 0 }}>
              All Transactions
            </Title>
            <Badge count={filteredData.length} showZero />
          </Space>
        }
        extra={
          <Space wrap>
            <Input.Search
              placeholder="Search transactions..."
              onSearch={handleSearch}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ width: 250 }}
            />
            <Select value={statusFilter} onChange={handleStatusFilter} style={{ width: 120 }}>
              <Option value="all">All Status</Option>
              <Option value="completed">Completed</Option>
              <Option value="pending">Pending</Option>
              <Option value="failed">Failed</Option>
            </Select>
            <RangePicker onChange={handleDateRangeChange} />
            <Button type="primary" icon={<DownloadOutlined />} onClick={handleExportTransactions}>
              Download Report
            </Button>
          </Space>
        }
      >
        <Table
          columns={transactionColumns}
          dataSource={filteredData}
          scroll={{ x: 1200 }}
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} transactions`,
          }}
        />
      </Card>
    </div>
  )
}

export default TransactionsTab
