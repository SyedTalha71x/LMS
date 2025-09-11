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
  Tooltip,
  Divider,
  Switch,
  Steps,
  InputNumber,
  Checkbox,
  Progress,
  Drawer,
  List,
  Avatar,
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
  DownloadOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  CheckSquareOutlined,
  SendOutlined,
} from "@ant-design/icons"

import dayjs from "dayjs"

const { Search: AntSearch } = Input
const { Title, Text, Paragraph } = Typography
const { TextArea } = Input
const { Option } = Select
const { Step } = Steps
const { TabPane } = Tabs

export default function AssignmentsManager() {
  const [activeTab, setActiveTab] = useState("assignments")
  const [searchTerm, setSearchTerm] = useState("")
  const [courseFilter, setCourseFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [instructorFilter, setInstructorFilter] = useState("")
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isGradeModalOpen, setIsGradeModalOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const [selectedAssignment, setSelectedAssignment] = useState(null)
  const [editingAssignment, setEditingAssignment] = useState(null)

  const [form] = Form.useForm()
  const [editForm] = Form.useForm()
  const [gradeForm] = Form.useForm()

  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Physics Assignment 1",
      description: "Complete problems 1-15 from Chapter 3. Show all work and calculations.",
      course: "Physics I",
      dueDate: "2025-03-31",
      status: "Published",
      submissions: 12,
      totalStudents: 25,
      points: 100,
      instructor: "Dr. Smith",
      createdAt: "2025-01-15",
      submissionSettings: {
        allowLateSubmissions: true,
        maxAttempts: 3,
        fileTypes: ["pdf", "doc", "docx"],
      },
      gradingSettings: {
        gradingType: "points",
        passingGrade: 70,
        rubric: "Standard rubric",
      },
    },
    {
      id: 2,
      title: "Lab Report - Motion",
      description: "Write a comprehensive lab report on projectile motion experiment.",
      course: "Physics I",
      dueDate: "2025-02-28",
      status: "Completed",
      submissions: 20,
      totalStudents: 20,
      points: 150,
      instructor: "Dr. Johnson",
      createdAt: "2025-01-20",
      submissionSettings: {
        allowLateSubmissions: false,
        maxAttempts: 1,
        fileTypes: ["pdf"],
      },
      gradingSettings: {
        gradingType: "points",
        passingGrade: 75,
      },
    },
  ])

  const [quizzes, setQuizzes] = useState([
    {
      id: 1,
      title: "Midterm Quiz - Mechanics",
      description: "Multiple choice quiz covering chapters 1-5 of mechanics.",
      course: "Physics I",
      dueDate: "2025-04-15",
      status: "Published",
      submissions: 18,
      totalStudents: 30,
      points: 50,
      instructor: "Dr. Smith",
      createdAt: "2025-02-01",
      submissionSettings: {
        allowLateSubmissions: false,
        maxAttempts: 2,
        timeLimit: 60,
      },
      gradingSettings: {
        gradingType: "points",
        passingGrade: 70,
        autoGrade: true,
      },
    },
    {
      id: 2,
      title: "Quick Assessment - Forces",
      description: "Short quiz on Newton's laws and force calculations.",
      course: "Physics I",
      dueDate: "2025-03-20",
      status: "Draft",
      submissions: 0,
      totalStudents: 25,
      points: 25,
      instructor: "Dr. Johnson",
      createdAt: "2025-02-10",
      submissionSettings: {
        allowLateSubmissions: true,
        maxAttempts: 1,
        timeLimit: 30,
      },
      gradingSettings: {
        gradingType: "points",
        passingGrade: 60,
        autoGrade: true,
      },
    },
  ])

  const [students] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      submissionDate: "2025-01-20",
      grade: 85,
      status: "graded",
      attempts: 1,
      feedback: "Good work overall",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      submissionDate: "2025-01-21",
      status: "submitted",
      attempts: 1,
    },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", status: "pending", attempts: 0 },
  ])

  const courses = ["Physics I", "Chemistry I", "Mathematics", "Biology"]
  const instructors = ["Dr. Smith", "Dr. Johnson", "Prof. Williams", "Dr. Brown"]

  const getStatusColor = (status) => {
    switch (status) {
      case "Published":
        return "green"
      case "Draft":
        return "orange"
      case "Completed":
        return "blue"
      case "Overdue":
        return "red"
      default:
        return "default"
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case "Published":
        return <CheckCircleOutlined />
      case "Draft":
        return <ClockCircleOutlined />
      case "Completed":
        return <CheckCircleOutlined />
      case "Overdue":
        return <ExclamationCircleOutlined />
      default:
        return null
    }
  }

  const getCurrentData = () => {
    return activeTab === "assignments" ? assignments : quizzes
  }

  const filteredData = getCurrentData().filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCourse = !courseFilter || item.course === courseFilter
    const matchesStatus = !statusFilter || item.status === statusFilter
    const matchesInstructor = !instructorFilter || item.instructor === instructorFilter

    return matchesSearch && matchesCourse && matchesStatus && matchesInstructor
  })

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <Space direction="vertical" size={0}>
          <Text strong>{text}</Text>
          <Text type="secondary" style={{ fontSize: "12px" }}>
            <BookOutlined /> {record.course}
          </Text>
        </Space>
      ),
    },
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
      filters: courses.map((course) => ({ text: course, value: course })),
      onFilter: (value, record) => record.course === value,
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
      sorter: (a, b) => dayjs(a.dueDate).unix() - dayjs(b.dueDate).unix(),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={getStatusColor(status)} icon={getStatusIcon(status)}>
          {status}
        </Tag>
      ),
      filters: [
        { text: "Published", value: "Published" },
        { text: "Draft", value: "Draft" },
        { text: "Completed", value: "Completed" },
        { text: "Overdue", value: "Overdue" },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: "Submissions",
      key: "submissions",
      render: (_, record) => (
        <Space>
          <Progress
            percent={Math.round((record.submissions / record.totalStudents) * 100)}
            size="small"
            style={{ width: 60 }}
          />
          <Text>
            {record.submissions}/{record.totalStudents}
          </Text>
        </Space>
      ),
      sorter: (a, b) => a.submissions / a.totalStudents - b.submissions / b.totalStudents,
    },
    {
      title: "Points",
      dataIndex: "points",
      key: "points",
      sorter: (a, b) => a.points - b.points,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Tooltip title="View Details">
            <Button type="text" icon={<EyeOutlined />} onClick={() => showDetails(record)} />
          </Tooltip>
          <Tooltip title="Edit">
            <Button type="text" icon={<EditOutlined />} onClick={() => openEditModal(record)} />
          </Tooltip>
          <Tooltip title="Grade Submissions">
            <Button type="text" icon={<CheckSquareOutlined />} onClick={() => openGradeModal(record)} />
          </Tooltip>
          <Tooltip title="Publish/Unpublish">
            <Switch
              size="small"
              checked={record.status === "Published"}
              onChange={(checked) => togglePublishStatus(record.id, checked)}
            />
          </Tooltip>
          <Popconfirm
            title={`Delete ${activeTab === "assignments" ? "Assignment" : "Quiz"}`}
            description={`Are you sure you want to delete this ${activeTab === "assignments" ? "assignment" : "quiz"}?`}
            onConfirm={() => deleteItem(record.id)}
            okText="Yes"
            cancelText="No"
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

  const showDetails = (assignment) => {
    setSelectedAssignment(assignment)
    setIsDetailModalOpen(true)
  }

  const openEditModal = (assignment) => {
    setEditingAssignment(assignment)
    editForm.setFieldsValue({
      title: assignment.title,
      description: assignment.description,
      course: assignment.course,
      dueDate: dayjs(assignment.dueDate),
      points: assignment.points,
      instructor: assignment.instructor,
      allowLateSubmissions: assignment.submissionSettings.allowLateSubmissions,
      maxAttempts: assignment.submissionSettings.maxAttempts,
      fileTypes: assignment.submissionSettings.fileTypes,
      gradingType: assignment.gradingSettings.gradingType,
      passingGrade: assignment.gradingSettings.passingGrade,
    })
    setIsEditModalOpen(true)
  }

  const openGradeModal = (assignment) => {
    setSelectedAssignment(assignment)
    setIsGradeModalOpen(true)
  }

  const togglePublishStatus = (id, published) => {
    if (activeTab === "assignments") {
      setAssignments((prev) =>
        prev.map((assignment) =>
          assignment.id === id ? { ...assignment, status: published ? "Published" : "Draft" } : assignment,
        ),
      )
    } else {
      setQuizzes((prev) =>
        prev.map((quiz) => (quiz.id === id ? { ...quiz, status: published ? "Published" : "Draft" } : quiz)),
      )
    }
    message.success(
      `${activeTab === "assignments" ? "Assignment" : "Quiz"} ${published ? "published" : "unpublished"} successfully!`,
    )
  }

  const deleteItem = (id) => {
    if (activeTab === "assignments") {
      setAssignments((prev) => prev.filter((assignment) => assignment.id !== id))
    } else {
      setQuizzes((prev) => prev.filter((quiz) => quiz.id !== id))
    }
    message.success(`${activeTab === "assignments" ? "Assignment" : "Quiz"} deleted successfully!`)
  }

  const handleBulkDelete = () => {
    if (activeTab === "assignments") {
      setAssignments((prev) => prev.filter((assignment) => !selectedRowKeys.includes(assignment.id)))
    } else {
      setQuizzes((prev) => prev.filter((quiz) => !selectedRowKeys.includes(quiz.id)))
    }
    setSelectedRowKeys([])
    message.success(`${selectedRowKeys.length} ${activeTab} deleted successfully!`)
  }

  const handleBulkPublish = (publish) => {
    if (activeTab === "assignments") {
      setAssignments((prev) =>
        prev.map((assignment) =>
          selectedRowKeys.includes(assignment.id)
            ? { ...assignment, status: publish ? "Published" : "Draft" }
            : assignment,
        ),
      )
    } else {
      setQuizzes((prev) =>
        prev.map((quiz) =>
          selectedRowKeys.includes(quiz.id) ? { ...quiz, status: publish ? "Published" : "Draft" } : quiz,
        ),
      )
    }
    setSelectedRowKeys([])
    message.success(`${selectedRowKeys.length} ${activeTab} ${publish ? "published" : "unpublished"} successfully!`)
  }

  const handleAddSubmit = (values) => {
    try {
      const newItem = {
        id: getCurrentData().length + 1,
        title: values.title,
        description: values.description,
        course: values.course,
        dueDate: values.dueDate.format("YYYY-MM-DD"),
        status: "Draft",
        submissions: 0,
        totalStudents: 25,
        points: values.points,
        instructor: values.instructor,
        createdAt: dayjs().format("YYYY-MM-DD"),
        submissionSettings: {
          allowLateSubmissions: values.allowLateSubmissions || false,
          maxAttempts: values.maxAttempts || 1,
          ...(activeTab === "assignments"
            ? { fileTypes: values.fileTypes || ["pdf"] }
            : { timeLimit: values.timeLimit || 60 }),
        },
        gradingSettings: {
          gradingType: values.gradingType || "points",
          passingGrade: values.passingGrade || 70,
          ...(activeTab === "assignments" ? { rubric: values.rubric } : { autoGrade: values.autoGrade || true }),
        },
      }

      if (activeTab === "assignments") {
        setAssignments([...assignments, newItem])
      } else {
        setQuizzes([...quizzes, newItem])
      }

      message.success(`${activeTab === "assignments" ? "Assignment" : "Quiz"} created successfully!`)
      setIsAddModalOpen(false)
      setCurrentStep(0)
      form.resetFields()
    } catch (error) {
      message.error(`Failed to create ${activeTab === "assignments" ? "assignment" : "quiz"}. Please try again.`)
    }
  }

  const handleEditSubmit = (values) => {
    if (!editingAssignment) return

    try {
      const updatedItem = {
        ...editingAssignment,
        title: values.title,
        description: values.description,
        course: values.course,
        dueDate: values.dueDate.format("YYYY-MM-DD"),
        points: values.points,
        instructor: values.instructor,
        submissionSettings: {
          allowLateSubmissions: values.allowLateSubmissions,
          maxAttempts: values.maxAttempts,
          ...(activeTab === "assignments" ? { fileTypes: values.fileTypes } : { timeLimit: values.timeLimit }),
        },
        gradingSettings: {
          gradingType: values.gradingType,
          passingGrade: values.passingGrade,
          ...(activeTab === "assignments" ? { rubric: values.rubric } : { autoGrade: values.autoGrade }),
        },
      }

      if (activeTab === "assignments") {
        setAssignments((prev) =>
          prev.map((assignment) => (assignment.id === editingAssignment.id ? updatedItem : assignment)),
        )
      } else {
        setQuizzes((prev) => prev.map((quiz) => (quiz.id === editingAssignment.id ? updatedItem : quiz)))
      }

      message.success(`${activeTab === "assignments" ? "Assignment" : "Quiz"} updated successfully!`)
      setIsEditModalOpen(false)
      editForm.resetFields()
    } catch (error) {
      message.error(`Failed to update ${activeTab === "assignments" ? "assignment" : "quiz"}. Please try again.`)
    }
  }

  const renderAddWizardContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <Form.Item
              name="title"
              label={`${activeTab === "assignments" ? "Assignment" : "Quiz"} Title`}
              rules={[{ required: true }]}
            >
              <Input placeholder={`Enter ${activeTab === "assignments" ? "assignment" : "quiz"} title`} />
            </Form.Item>
            <Form.Item name="description" label="Description" rules={[{ required: true }]}>
              <TextArea
                rows={4}
                placeholder={`Enter ${activeTab === "assignments" ? "assignment" : "quiz"} description`}
              />
            </Form.Item>
            <Form.Item name="course" label="Course" rules={[{ required: true }]}>
              <Select placeholder="Select course">
                {courses.map((course) => (
                  <Option key={course} value={course}>
                    {course}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="instructor" label="Instructor" rules={[{ required: true }]}>
              <Select placeholder="Select instructor">
                {instructors.map((instructor) => (
                  <Option key={instructor} value={instructor}>
                    {instructor}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="dueDate" label="Due Date" rules={[{ required: true }]}>
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="points" label="Total Points" rules={[{ required: true }]}>
              <InputNumber min={1} style={{ width: "100%" }} />
            </Form.Item>
          </>
        )
      case 1:
        return (
          <>
            <Form.Item name="allowLateSubmissions" valuePropName="checked">
              <Checkbox>Allow late submissions</Checkbox>
            </Form.Item>
            <Form.Item name="maxAttempts" label="Maximum Attempts">
              <InputNumber min={1} max={10} defaultValue={1} />
            </Form.Item>
            {activeTab === "assignments" ? (
              <>
                <Form.Item name="fileTypes" label="Allowed File Types">
                  <Select mode="multiple" placeholder="Select file types">
                    <Option value="pdf">PDF</Option>
                    <Option value="doc">DOC</Option>
                    <Option value="docx">DOCX</Option>
                    <Option value="txt">TXT</Option>
                    <Option value="jpg">JPG</Option>
                    <Option value="png">PNG</Option>
                  </Select>
                </Form.Item>
                <Form.Item name="file" label="Assignment Materials">
                  <Upload>
                    <Button icon={<UploadOutlined />}>Upload Files</Button>
                  </Upload>
                </Form.Item>
              </>
            ) : (
              <Form.Item name="timeLimit" label="Time Limit (minutes)">
                <InputNumber min={5} max={300} defaultValue={60} />
              </Form.Item>
            )}
          </>
        )
      case 2:
        return (
          <>
            <Form.Item name="gradingType" label="Grading Type" rules={[{ required: true }]}>
              <Select defaultValue="points">
                <Option value="points">Points</Option>
                <Option value="percentage">Percentage</Option>
                <Option value="letter">Letter Grade</Option>
              </Select>
            </Form.Item>
            <Form.Item name="passingGrade" label="Passing Grade" rules={[{ required: true }]}>
              <InputNumber min={0} max={100} defaultValue={70} />
            </Form.Item>
            {activeTab === "assignments" ? (
              <Form.Item name="rubric" label="Grading Rubric">
                <TextArea rows={4} placeholder="Enter grading rubric (optional)" />
              </Form.Item>
            ) : (
              <Form.Item name="autoGrade" valuePropName="checked" initialValue={true}>
                <Checkbox>Enable automatic grading</Checkbox>
              </Form.Item>
            )}
          </>
        )
      default:
        return null
    }
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedKeys) => {
      setSelectedRowKeys(selectedKeys)
    },
  }

  return (
    <div className="border-none p-2 min-h-screen">
      <Card>
        <Row justify="space-between" align="middle" style={{ marginBottom: "24px" }}>
          <Col>
            <Title level={2}>Assignment & Quiz Management</Title>
          </Col>
        </Row>

        {/* Search and Filters */}
        <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
          <Col xs={24} sm={12} md={8}>
            <AntSearch
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              placeholder="Filter by Course"
              value={courseFilter}
              onChange={setCourseFilter}
              allowClear
              style={{ width: "100%" }}
            >
              {courses.map((course) => (
                <Option key={course} value={course}>
                  {course}
                </Option>
              ))}
            </Select>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              placeholder="Filter by Status"
              value={statusFilter}
              onChange={setStatusFilter}
              allowClear
              style={{ width: "100%" }}
            >
              <Option value="Published">Published</Option>
              <Option value="Draft">Draft</Option>
              <Option value="Completed">Completed</Option>
              <Option value="Overdue">Overdue</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select
              placeholder="Filter by Instructor"
              value={instructorFilter}
              onChange={setInstructorFilter}
              allowClear
              style={{ width: "100%" }}
            >
              {instructors.map((instructor) => (
                <Option key={instructor} value={instructor}>
                  {instructor}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>

        {/* Bulk Actions */}
        {selectedRowKeys.length > 0 && (
          <Row style={{ marginBottom: "16px" }}>
            <Col>
              <Space>
                <Text>Selected {selectedRowKeys.length} items</Text>
                <Button size="small" onClick={() => handleBulkPublish(true)}>
                  Bulk Publish
                </Button>
                <Button size="small" onClick={() => handleBulkPublish(false)}>
                  Bulk Unpublish
                </Button>
                <Popconfirm title={`Delete selected ${activeTab}?`} onConfirm={handleBulkDelete} okType="danger">
                  <Button size="small" danger>
                    Bulk Delete
                  </Button>
                </Popconfirm>
              </Space>
            </Col>
          </Row>
        )}

        <Tabs
          activeKey={activeTab}
          onChange={(key) => {
            setActiveTab(key)
            setSelectedRowKeys([])
            setSearchTerm("")
            setCourseFilter("")
            setStatusFilter("")
            setInstructorFilter("")
          }}
          tabBarExtraContent={
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsAddModalOpen(true)}>
              Add {activeTab === "assignments" ? "Assignment" : "Quiz"}
            </Button>
          }
        >
          <TabPane
            tab={
              <span>
                Assignments
              </span>
            }
            key="assignments"
          >
            <Table
              columns={columns}
              dataSource={filteredData}
              rowKey="id"
              rowSelection={rowSelection}
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
                Quizzes
              </span>
            }
            key="quizzes"
          >
            <Table
              columns={columns}
              dataSource={filteredData}
              rowKey="id"
              rowSelection={rowSelection}
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

      {/* Add Modal */}
      <Modal
        title={`Add New ${activeTab === "assignments" ? "Assignment" : "Quiz"}`}
        open={isAddModalOpen}
        onCancel={() => {
          setIsAddModalOpen(false)
          setCurrentStep(0)
          form.resetFields()
        }}
        footer={null}
        width={700}
      >
        <Steps current={currentStep} style={{ marginBottom: "24px" }}>
          <Step title="Basic Info" icon={<FileTextOutlined />} />
          <Step title="Submission Settings" icon={<UploadOutlined />} />
          <Step title="Grading & Feedback" icon={<CheckSquareOutlined />} />
        </Steps>

        <Form form={form} layout="vertical" onFinish={handleAddSubmit}>
          {renderAddWizardContent()}

          <Form.Item style={{ marginTop: "24px", textAlign: "right" }}>
            <Space>
              {currentStep > 0 && <Button onClick={() => setCurrentStep(currentStep - 1)}>Previous</Button>}
              {currentStep < 2 ? (
                <Button type="primary" onClick={() => setCurrentStep(currentStep + 1)}>
                  Next
                </Button>
              ) : (
                <Button type="primary" htmlType="submit">
                  Create {activeTab === "assignments" ? "Assignment" : "Quiz"}
                </Button>
              )}
              <Button
                onClick={() => {
                  setIsAddModalOpen(false)
                  setCurrentStep(0)
                  form.resetFields()
                }}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        title={`Edit ${activeTab === "assignments" ? "Assignment" : "Quiz"}`}
        open={isEditModalOpen}
        onCancel={() => {
          setIsEditModalOpen(false)
          editForm.resetFields()
        }}
        footer={null}
        width={700}
      >
        <Form form={editForm} layout="vertical" onFinish={handleEditSubmit}>
          <Form.Item
            name="title"
            label={`${activeTab === "assignments" ? "Assignment" : "Quiz"} Title`}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <TextArea rows={4} />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="course" label="Course" rules={[{ required: true }]}>
                <Select>
                  {courses.map((course) => (
                    <Option key={course} value={course}>
                      {course}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="instructor" label="Instructor" rules={[{ required: true }]}>
                <Select>
                  {instructors.map((instructor) => (
                    <Option key={instructor} value={instructor}>
                      {instructor}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="dueDate" label="Due Date" rules={[{ required: true }]}>
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="points" label="Total Points" rules={[{ required: true }]}>
                <InputNumber min={1} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Divider>Submission Settings</Divider>
          <Form.Item name="allowLateSubmissions" valuePropName="checked">
            <Checkbox>Allow late submissions</Checkbox>
          </Form.Item>
          <Form.Item name="maxAttempts" label="Maximum Attempts">
            <InputNumber min={1} max={10} />
          </Form.Item>
          {activeTab === "quizzes" && (
            <Form.Item name="timeLimit" label="Time Limit (minutes)">
              <InputNumber min={5} max={300} />
            </Form.Item>
          )}

          <Divider>Grading Settings</Divider>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="gradingType" label="Grading Type">
                <Select>
                  <Option value="points">Points</Option>
                  <Option value="percentage">Percentage</Option>
                  <Option value="letter">Letter Grade</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="passingGrade" label="Passing Grade">
                <InputNumber min={0} max={100} />
              </Form.Item>
            </Col>
          </Row>
          {activeTab === "quizzes" && (
            <Form.Item name="autoGrade" valuePropName="checked">
              <Checkbox>Enable automatic grading</Checkbox>
            </Form.Item>
          )}

          <Form.Item style={{ textAlign: "right", marginTop: "24px" }}>
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

      {/* Details Modal */}
      <Modal
        title={
          <Space>
            <EyeOutlined />
            {activeTab === "assignments" ? "Assignment" : "Quiz"} Details
          </Space>
        }
        open={isDetailModalOpen}
        onCancel={() => setIsDetailModalOpen(false)}
        footer={
          <Space>
            <Button onClick={() => setIsDetailModalOpen(false)}>Close</Button>
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => {
                setIsDetailModalOpen(false)
                if (selectedAssignment) openEditModal(selectedAssignment)
              }}
            >
              Edit
            </Button>
          </Space>
        }
        width={800}
      >
        {selectedAssignment && (
          <div>
            <Title level={4}>{selectedAssignment.title}</Title>
            <Paragraph>{selectedAssignment.description}</Paragraph>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card size="small" title="Basic Information">
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <div>
                      <Text strong>Course:</Text> {selectedAssignment.course}
                    </div>
                    <div>
                      <Text strong>Instructor:</Text> {selectedAssignment.instructor}
                    </div>
                    <div>
                      <Text strong>Points:</Text> {selectedAssignment.points}
                    </div>
                    <div>
                      <Text strong>Status:</Text>{" "}
                      <Tag color={getStatusColor(selectedAssignment.status)}>{selectedAssignment.status}</Tag>
                    </div>
                  </Space>
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small" title="Timeline & Progress">
                  <Space direction="vertical" style={{ width: "100%" }}>
                    <div>
                      <Text strong>Due Date:</Text> {dayjs(selectedAssignment.dueDate).format("MMM DD, YYYY")}
                    </div>
                    <div>
                      <Text strong>Created:</Text> {dayjs(selectedAssignment.createdAt).format("MMM DD, YYYY")}
                    </div>
                    <div>
                      <Text strong>Submissions:</Text>
                      <Progress
                        percent={Math.round((selectedAssignment.submissions / selectedAssignment.totalStudents) * 100)}
                        size="small"
                        style={{ marginLeft: 8, width: 100 }}
                      />
                      <Text style={{ marginLeft: 8 }}>
                        {selectedAssignment.submissions}/{selectedAssignment.totalStudents}
                      </Text>
                    </div>
                  </Space>
                </Card>
              </Col>
            </Row>

            <Divider />
            <Space>
              <Button
                icon={<CheckSquareOutlined />}
                onClick={() => {
                  setIsDetailModalOpen(false)
                  openGradeModal(selectedAssignment)
                }}
              >
                Grade Submissions
              </Button>
              <Button icon={<DownloadOutlined />}>Download Materials</Button>
              <Button icon={<SendOutlined />}>Send Reminder</Button>
            </Space>
          </div>
        )}
      </Modal>

      {/* Grade Submissions Drawer */}
      <Drawer
        title={`Grade ${activeTab === "assignments" ? "Assignment" : "Quiz"} Submissions`}
        placement="right"
        onClose={() => setIsGradeModalOpen(false)}
        open={isGradeModalOpen}
        width={600}
      >
        {selectedAssignment && (
          <div>
            <Card size="small" style={{ marginBottom: 16 }}>
              <Title level={5}>{selectedAssignment.title}</Title>
              <Text type="secondary">Total Points: {selectedAssignment.points}</Text>
            </Card>

            <List
              itemLayout="horizontal"
              dataSource={students}
              renderItem={(student) => (
                <List.Item key={student.id}>
                  <List.Item.Meta
                    avatar={<Avatar icon={<UserOutlined />} />}
                    title={student.name}
                    description={
                      <Space direction="vertical" size={0}>
                        <Text type="secondary">{student.email}</Text>
                        {student.submissionDate && (
                          <Text type="secondary">
                            Submitted: {dayjs(student.submissionDate).format("MMM DD, YYYY")}
                          </Text>
                        )}
                        {student.grade && (
                          <Text strong>
                            Grade: {student.grade}/{selectedAssignment.points}
                          </Text>
                        )}
                      </Space>
                    }
                  />
                  <div>
                    <Tag
                      color={student.status === "graded" ? "green" : student.status === "submitted" ? "blue" : "orange"}
                    >
                      {student.status.toUpperCase()}
                    </Tag>
                  </div>
                  <List.Item
                    actions={[
                      <Button
                        key={`grade-${student.id}`}
                        type={student.status === "graded" ? "default" : "primary"}
                        size="small"
                        onClick={() => {
                          Modal.info({
                            title: `Grade ${student.name}`,
                            width: 500,
                            content: (
                              <Form layout="vertical" style={{ marginTop: 16 }}>
                                <Form.Item label="Grade" name="grade">
                                  <InputNumber
                                    min={0}
                                    max={selectedAssignment.points}
                                    defaultValue={student.grade}
                                    style={{ width: "100%" }}
                                  />
                                </Form.Item>
                                <Form.Item label="Feedback" name="feedback">
                                  <TextArea
                                    rows={4}
                                    defaultValue={student.feedback}
                                    placeholder="Enter feedback for the student..."
                                  />
                                </Form.Item>
                              </Form>
                            ),
                            onOk() {
                              message.success(`Grade saved for ${student.name}`)
                            },
                          })
                        }}
                      >
                        {student.status === "graded" ? "Update Grade" : "Grade"}
                      </Button>,
                    ]}
                  ></List.Item>
                </List.Item>
              )}
            />
          </div>
        )}
      </Drawer>
    </div>
  )
}