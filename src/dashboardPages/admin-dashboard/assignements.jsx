/* eslint-disable no-unused-vars */
"use client"

import { useState } from "react"
import {
  Tabs,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  Upload,
  Space,
  Tag,
  Card,
  Row,
  Col,
  Typography,
  Popconfirm,
  message,
  Badge,
  Tooltip,
  Divider,
} from "antd"
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  FileTextOutlined,
  CalendarOutlined,
  BookOutlined,
  UploadOutlined,
  EyeOutlined,
  BellOutlined,
  SearchOutlined,
} from "@ant-design/icons"
const { Search: AntSearch } = Input

import dayjs from "dayjs"

const { TabPane } = Tabs
const { Title, Text, Paragraph } = Typography
const { TextArea } = Input
const { Option } = Select

export default function AssignmentQuizManager() {
  const [searchTerm, setsearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("assignments")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [editItemType, setEditItemType] = useState(null)
  const [editItemId, setEditItemId] = useState(null)
  const [selectedItem, setSelectedItem] = useState(null)
  const [form] = Form.useForm()
  const [editForm] = Form.useForm()
  const [assignForm] = Form.useForm()

  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Physics Assignment 1",
      description: "Complete problems 1-15 from Chapter 3. Show all work and calculations.",
      status: "Active",
      dueDate: "2025-03-31",
      startDate: "2025-03-01",
      subject: "Physics I",
      assignedTo: ["Group1", "Group2"],
      submissionCount: 12,
      totalStudents: 25,
      createdAt: "2025-01-15",
    },
    {
      id: 2,
      title: "Lab Report - Motion",
      description: "Write a comprehensive lab report on projectile motion experiment.",
      status: "Completed",
      dueDate: "2025-02-28",
      startDate: "2025-02-01",
      subject: "Physics I",
      assignedTo: ["Group1"],
      submissionCount: 20,
      totalStudents: 20,
      createdAt: "2025-01-20",
    },
  ])

  const [quizzes, setQuizzes] = useState([
    {
      id: 1,
      title: "Midterm Quiz - Mechanics",
      description: "Multiple choice quiz covering chapters 1-5 of mechanics.",
      status: "Active",
      dueDate: "2025-04-15",
      startDate: "2025-04-01",
      subject: "Physics I",
      assignedTo: ["Group2", "Group3"],
      submissionCount: 18,
      totalStudents: 30,
      createdAt: "2025-02-01",
    },
    {
      id: 2,
      title: "Quick Assessment - Forces",
      description: "Short quiz on Newton's laws and force calculations.",
      status: "Draft",
      dueDate: "2025-03-20",
      startDate: "2025-03-15",
      subject: "Physics I",
      assignedTo: [],
      submissionCount: 0,
      totalStudents: 0,
      createdAt: "2025-02-10",
    },
  ])

  const groups = [
    { id: 1, name: "Group1", studentCount: 20 },
    { id: 2, name: "Group2", studentCount: 25 },
    { id: 3, name: "Group3", studentCount: 18 },
    { id: 4, name: "Group4", studentCount: 22 },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "green"
      case "Completed":
        return "blue"
      case "Draft":
        return "orange"
      case "Overdue":
        return "red"
      default:
        return "default"
    }
  }

  const assignmentColumns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <Space direction="vertical" size={0}>
          <Text strong>{text}</Text>
          <Text type="secondary" style={{ fontSize: "12px" }}>
            <BookOutlined /> {record.subject}
          </Text>
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={getStatusColor(status)}>{status}</Tag>,
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (date) => (
        <Space>
          <CalendarOutlined />
          {dayjs(date).format("MMM DD, YYYY")}
        </Space>
      ),
    },
    {
      title: "Submissions",
      key: "submissions",
      render: (_, record) => (
        <Space>
          <Badge count={record.submissionCount} showZero />
          <Text type="secondary">/ {record.totalStudents}</Text>
        </Space>
      ),
    },
    {
      title: "Assigned Groups",
      dataIndex: "assignedTo",
      key: "assignedTo",
      render: (groups) => (
        <Space wrap>
          {groups.length > 0 ? (
            groups.map((group) => (
              <Tag key={group} icon={<UserOutlined />} color="blue">
                {group}
              </Tag>
            ))
          ) : (
            <Text type="secondary">Not assigned</Text>
          )}
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="View Details">
            <Button type="text" icon={<EyeOutlined />} onClick={() => showDetails(record, "assignment")} />
          </Tooltip>
          <Tooltip title="Edit">
            <Button type="text" icon={<EditOutlined />} onClick={() => openEditModal(record, "assignment")} />
          </Tooltip>
          <Tooltip title="Assign to Groups">
            <Button type="text" icon={<UserOutlined />} onClick={() => openAssignModal(record, "assignment")} />
          </Tooltip>
          <Popconfirm
            title="Delete Assignment"
            description="Are you sure you want to delete this assignment? This action cannot be undone."
            onConfirm={() => deleteItem(record.id, "assignment")}
            okText="Yes, Delete"
            cancelText="Cancel"
            okType="danger"
          >
            <Tooltip title="Delete">
              <Button type="text" danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const quizColumns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <Space direction="vertical" size={0}>
          <Text strong>{text}</Text>
          <Text type="secondary" style={{ fontSize: "12px" }}>
            <BookOutlined /> {record.subject}
          </Text>
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={getStatusColor(status)}>{status}</Tag>,
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (date) => (
        <Space>
          <CalendarOutlined />
          {dayjs(date).format("MMM DD, YYYY")}
        </Space>
      ),
    },
    {
      title: "Submissions",
      key: "submissions",
      render: (_, record) => (
        <Space>
          <Badge count={record.submissionCount} showZero />
          <Text type="secondary">/ {record.totalStudents}</Text>
        </Space>
      ),
    },
    {
      title: "Assigned Groups",
      dataIndex: "assignedTo",
      key: "assignedTo",
      render: (groups) => (
        <Space wrap>
          {groups.length > 0 ? (
            groups.map((group) => (
              <Tag key={group} icon={<UserOutlined />} color="purple">
                {group}
              </Tag>
            ))
          ) : (
            <Text type="secondary">Not assigned</Text>
          )}
        </Space>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="View Details">
            <Button type="text" icon={<EyeOutlined />} onClick={() => showDetails(record, "quiz")} />
          </Tooltip>
          <Tooltip title="Edit">
            <Button type="text" icon={<EditOutlined />} onClick={() => openEditModal(record, "quiz")} />
          </Tooltip>
          <Tooltip title="Assign to Groups">
            <Button type="text" icon={<UserOutlined />} onClick={() => openAssignModal(record, "quiz")} />
          </Tooltip>
          <Popconfirm
            title="Delete Quiz"
            description="Are you sure you want to delete this quiz? This action cannot be undone."
            onConfirm={() => deleteItem(record.id, "quiz")}
            okText="Yes, Delete"
            cancelText="Cancel"
            okType="danger"
          >
            <Tooltip title="Delete">
              <Button type="text" danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const showDetails = (item, type) => {
    setSelectedItem({ ...item, type })
    setIsDetailsModalOpen(true)
  }

  const openEditModal = (item, type) => {
    setEditItemType(type)
    setEditItemId(item.id)
    editForm.setFieldsValue({
      title: item.title,
      description: item.description,
      subject: item.subject,
      dueDate: dayjs(item.dueDate),
      startDate: dayjs(item.startDate),
    })
    setIsEditModalOpen(true)
  }

  const openAssignModal = (item, type) => {
    setEditItemType(type)
    setEditItemId(item.id)
    assignForm.setFieldsValue({
      groups: item.assignedTo,
    })
    setIsAssignModalOpen(true)
  }

  const handleAddSubmit = async (values) => {
    try {
      const newItem = {
        id: activeTab === "assignments" ? assignments.length + 1 : quizzes.length + 1,
        title: values.title,
        description: values.description,
        status: "Draft",
        dueDate: values.dueDate.format("YYYY-MM-DD"),
        startDate: values.startDate.format("YYYY-MM-DD"),
        subject: values.subject,
        assignedTo: [],
        submissionCount: 0,
        totalStudents: 0,
        createdAt: dayjs().format("YYYY-MM-DD"),
      }

      if (activeTab === "assignments") {
        setAssignments([...assignments, newItem])
        message.success("Assignment created successfully!")
      } else {
        setQuizzes([...quizzes, newItem])
        message.success("Quiz created successfully!")
      }

      setIsAddModalOpen(false)
      form.resetFields()
    } catch (error) {
      message.error("Failed to create item. Please try again.")
    }
  }

  const handleEditSubmit = async (values) => {
    try {
      if (editItemType === "assignment") {
        const updatedAssignments = assignments.map((item) =>
          item.id === editItemId
            ? {
                ...item,
                title: values.title,
                description: values.description,
                subject: values.subject,
                dueDate: values.dueDate.format("YYYY-MM-DD"),
                startDate: values.startDate.format("YYYY-MM-DD"),
              }
            : item,
        )
        setAssignments(updatedAssignments)
        message.success("Assignment updated successfully!")
      } else {
        const updatedQuizzes = quizzes.map((item) =>
          item.id === editItemId
            ? {
                ...item,
                title: values.title,
                description: values.description,
                subject: values.subject,
                dueDate: values.dueDate.format("YYYY-MM-DD"),
                startDate: values.startDate.format("YYYY-MM-DD"),
              }
            : item,
        )
        setQuizzes(updatedQuizzes)
        message.success("Quiz updated successfully!")
      }

      setIsEditModalOpen(false)
      editForm.resetFields()
    } catch (error) {
      message.error("Failed to update item. Please try again.")
    }
  }

  const handleAssignSubmit = async (values) => {
    try {
      if (editItemType === "assignment") {
        const updatedAssignments = assignments.map((item) =>
          item.id === editItemId ? { ...item, assignedTo: values.groups || [] } : item,
        )
        setAssignments(updatedAssignments)
        message.success("Assignment groups updated successfully!")
      } else {
        const updatedQuizzes = quizzes.map((item) =>
          item.id === editItemId ? { ...item, assignedTo: values.groups || [] } : item,
        )
        setQuizzes(updatedQuizzes)
        message.success("Quiz groups updated successfully!")
      }

      setIsAssignModalOpen(false)
      assignForm.resetFields()
    } catch (error) {
      message.error("Failed to update group assignments. Please try again.")
    }
  }

  const deleteItem = (id, type) => {
    try {
      if (type === "assignment") {
        setAssignments(assignments.filter((item) => item.id !== id))
        message.success("Assignment deleted successfully!")
      } else {
        setQuizzes(quizzes.filter((item) => item.id !== id))
        message.success("Quiz deleted successfully!")
      }
    } catch (error) {
      message.error("Failed to delete item. Please try again.")
    }
  }

  return (
    <div style={{ padding: "14px", minHeight: "100vh" }}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card>
            <Row justify="space-between" align="middle" style={{ marginBottom: "24px" }}>
              <Col>
                <h1 className="md:text-2xl text-xl font-bold poppins-thin_600 ">Manage Assignements & Quiz</h1>
              </Col>
             
            </Row>

            <div className="flex-1 min-w-0">
              <AntSearch
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setsearchTerm(e.target.value)}
                style={{ width: "100%" }}
                size="middle"
              />
            </div>


                  

            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              tabBarExtraContent={
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsAddModalOpen(true)}>
                  Add {activeTab === "assignments" ? "Assignment" : "Quiz"}
                </Button>
              }
            >
              <TabPane
                tab={
                  <span>
                    <FileTextOutlined />
                    Assignments ({assignments.length})
                  </span>
                }
                key="assignments"
              >
                <Table
                  columns={assignmentColumns}
                  dataSource={assignments}
                  rowKey="id"
                  pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} assignments`,
                  }}
                  scroll={{ x: 1200 }}
                />
              </TabPane>

              <TabPane
                tab={
                  <span>
                    <BookOutlined />
                    Quizzes ({quizzes.length})
                  </span>
                }
                key="quizzes"
              >
                <Table
                  columns={quizColumns}
                  dataSource={quizzes}
                  rowKey="id"
                  pagination={{
                    pageSize: 10,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} quizzes`,
                  }}
                  scroll={{ x: 1200 }}
                />
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>

      <Modal
        title={
          <Space>
            <PlusOutlined />
            Add New {activeTab === "assignments" ? "Assignment" : "Quiz"}
          </Space>
        }
        open={isAddModalOpen}
        onCancel={() => {
          setIsAddModalOpen(false)
          form.resetFields()
        }}
        footer={null}
        width={600}
      >
        <Form form={form} layout="vertical" onFinish={handleAddSubmit} requiredMark={false}>
          <Form.Item name="title" label="Title" rules={[{ required: true, message: "Please enter a title" }]}>
            <Input placeholder="Enter title" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <TextArea rows={4} placeholder="Enter description" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="subject" label="Subject" rules={[{ required: true, message: "Please enter subject" }]}>
                <Input placeholder="e.g., Physics I" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="startDate"
                label="Start Date"
                rules={[{ required: true, message: "Please select start date" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="dueDate" label="Due Date" rules={[{ required: true, message: "Please select due date" }]}>
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="file" label="Upload File">
            <Upload>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
            <Space>
              <Button
                onClick={() => {
                  setIsAddModalOpen(false)
                  form.resetFields()
                }}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Create {activeTab === "assignments" ? "Assignment" : "Quiz"}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={
          <Space>
            <EditOutlined />
            Edit {editItemType === "assignment" ? "Assignment" : "Quiz"}
          </Space>
        }
        open={isEditModalOpen}
        onCancel={() => {
          setIsEditModalOpen(false)
          editForm.resetFields()
        }}
        footer={null}
        width={600}
      >
        <Form form={editForm} layout="vertical" onFinish={handleEditSubmit} requiredMark={false}>
          <Form.Item name="title" label="Title" rules={[{ required: true, message: "Please enter a title" }]}>
            <Input placeholder="Enter title" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: "Please enter a description" }]}
          >
            <TextArea rows={4} placeholder="Enter description" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="subject" label="Subject" rules={[{ required: true, message: "Please enter subject" }]}>
                <Input placeholder="e.g., Physics I" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="startDate"
                label="Start Date"
                rules={[{ required: true, message: "Please select start date" }]}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="dueDate" label="Due Date" rules={[{ required: true, message: "Please select due date" }]}>
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item name="file" label="Replace File (Optional)">
            <Upload>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
            <Space>
              <Button
                onClick={() => {
                  setIsEditModalOpen(false)
                  editForm.resetFields()
                }}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Save Changes
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={
          <Space>
            <UserOutlined />
            Assign {editItemType === "assignment" ? "Assignment" : "Quiz"} to Groups
          </Space>
        }
        open={isAssignModalOpen}
        onCancel={() => {
          setIsAssignModalOpen(false)
          assignForm.resetFields()
        }}
        footer={null}
        width={500}
      >
        <Form form={assignForm} layout="vertical" onFinish={handleAssignSubmit}>
          <Form.Item name="groups" label="Select Groups">
            <Select mode="multiple" placeholder="Select groups to assign" style={{ width: "100%" }}>
              {groups.map((group) => (
                <Option key={group.id} value={group.name}>
                  <Space>
                    <UserOutlined />
                    {group.name}
                    <Text type="secondary">({group.studentCount} students)</Text>
                  </Space>
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
            <Space>
              <Button
                onClick={() => {
                  setIsAssignModalOpen(false)
                  assignForm.resetFields()
                }}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Save Assignment
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={
          <Space>
            <EyeOutlined />
            {selectedItem?.type === "assignment" ? "Assignment" : "Quiz"} Details
          </Space>
        }
        open={isDetailsModalOpen}
        onCancel={() => setIsDetailsModalOpen(false)}
        footer={
          <Space>
            <Button onClick={() => setIsDetailsModalOpen(false)}>Close</Button>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => {
                setIsDetailsModalOpen(false)
                openEditModal(selectedItem, selectedItem?.type)
              }}
            >
              Edit
            </Button>
          </Space>
        }
        width={700}
      >
        {selectedItem && (
          <div>
            <Title level={4}>{selectedItem.title}</Title>
            <Paragraph>{selectedItem.description}</Paragraph>

            <Divider />

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card size="small" title="Basic Information">
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <div>
                      <Text strong>Subject:</Text> {selectedItem.subject}
                    </div>
                    <div>
                      <Text strong>Status:</Text>{" "}
                      <Tag color={getStatusColor(selectedItem.status)}>{selectedItem.status}</Tag>
                    </div>
                    <div>
                      <Text strong>Created:</Text> {dayjs(selectedItem.createdAt).format("MMM DD, YYYY")}
                    </div>
                  </Space>
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small" title="Timeline">
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <div>
                      <Text strong>Start Date:</Text> {dayjs(selectedItem.startDate).format("MMM DD, YYYY")}
                    </div>
                    <div>
                      <Text strong>Due Date:</Text> {dayjs(selectedItem.dueDate).format("MMM DD, YYYY")}
                    </div>
                    <div>
                      <Text strong>Days Remaining:</Text> {dayjs(selectedItem.dueDate).diff(dayjs(), "days")} days
                    </div>
                  </Space>
                </Card>
              </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
              <Col span={12}>
                <Card size="small" title="Submissions">
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <div>
                      <Text strong>Submitted:</Text> {selectedItem.submissionCount}
                    </div>
                    <div>
                      <Text strong>Total Students:</Text> {selectedItem.totalStudents}
                    </div>
                    <div>
                      <Text strong>Completion Rate:</Text>{" "}
                      {selectedItem.totalStudents > 0
                        ? Math.round((selectedItem.submissionCount / selectedItem.totalStudents) * 100)
                        : 0}
                      %
                    </div>
                  </Space>
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small" title="Assigned Groups">
                  <Space wrap>
                    {selectedItem.assignedTo.length > 0 ? (
                      selectedItem.assignedTo.map((group) => (
                        <Tag key={group} icon={<UserOutlined />} color="blue">
                          {group}
                        </Tag>
                      ))
                    ) : (
                      <Text type="secondary">Not assigned to any groups</Text>
                    )}
                  </Space>
                </Card>
              </Col>
            </Row>

            <Divider />

            <Space>
              <Button icon={<FileTextOutlined />}>View Submissions</Button>
              <Button icon={<UploadOutlined />}>Download Materials</Button>
            </Space>
          </div>
        )}
      </Modal>
    </div>
  )
}
