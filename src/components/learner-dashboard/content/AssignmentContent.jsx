/* eslint-disable no-unused-vars */
import { useState } from "react"
import { Card, Button, Upload, Input, Alert, Tag, Progress, Tabs, Table, Rate, Modal, Select, message } from "antd"
import {
  UploadOutlined,
  FileTextOutlined,
  SaveOutlined,
  SendOutlined,
  EyeOutlined,
  EditOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  StarOutlined,
  CommentOutlined,
} from "@ant-design/icons"
import moment from "moment"

const { TextArea } = Input
const { TabPane } = Tabs
const { Option } = Select

const AssignmentContent = ({ content, onComplete, isCompleted }) => {
  const [activeTab, setActiveTab] = useState("instructions")
  const [textSubmission, setTextSubmission] = useState("")
  const [fileList, setFileList] = useState([])
  const [isDraft, setIsDraft] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)
  const [submissions, setSubmissions] = useState([
    {
      id: 1,
      date: "2024-01-10",
      type: "Draft",
      status: "saved",
      grade: null,
      feedback: null,
    },
  ])

  // Mock data for demonstration
  const mockFeedback = {
    grade: 85,
    maxPoints: content.maxPoints || 100,
    feedback:
      "Great work on the setup! Your screenshots clearly show all required installations. Consider adding version numbers in your documentation for better clarity.",
    rubricScores:
      content.rubric?.map((item, index) => ({
        ...item,
        score: index === 0 ? 3 : index === 1 ? 3 : 2.5,
      })) || [],
    submittedDate: "2024-01-12",
    gradedDate: "2024-01-14",
    instructor: "John Smith",
  }

  const dueDate = moment(content.dueDate)
  const isOverdue = moment().isAfter(dueDate)
  const daysUntilDue = dueDate.diff(moment(), "days")

  const handleFileUpload = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  const handleSaveDraft = () => {
    setIsDraft(true)
    const newSubmission = {
      id: submissions.length + 1,
      date: moment().format("YYYY-MM-DD"),
      type: "Draft",
      status: "saved",
      grade: null,
      feedback: null,
    }
    setSubmissions([...submissions, newSubmission])
    message.success("Draft saved successfully!")
  }

  const handleSubmitAssignment = () => {
    if (!textSubmission.trim() && fileList.length === 0) {
      message.error("Please provide either text submission or upload files")
      return
    }

    setIsSubmitted(true)
    const newSubmission = {
      id: submissions.length + 1,
      date: moment().format("YYYY-MM-DD"),
      type: "Final Submission",
      status: "submitted",
      grade: null,
      feedback: null,
    }
    setSubmissions([...submissions, newSubmission])
    message.success("Assignment submitted successfully!")
    onComplete()
  }

  const renderInstructions = () => (
    <div className="space-y-6">
      <Card>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Assignment Instructions</h3>
          <div className="flex items-center space-x-4 mb-4">
            <Tag color={isOverdue ? "red" : daysUntilDue <= 3 ? "orange" : "green"}>
              Due: {dueDate.format("MMM DD, YYYY")}
            </Tag>
            <Tag color="blue">Max Points: {content.maxPoints}</Tag>
            <Tag color="purple">
              {content.submissionTypes?.includes("file") && content.submissionTypes?.includes("text")
                ? "File & Text Submission"
                : content.submissionTypes?.includes("file")
                  ? "File Submission"
                  : "Text Submission"}
            </Tag>
          </div>

          {isOverdue && (
            <Alert
              message="Assignment Overdue"
              description="This assignment is past its due date. Late submissions may be penalized."
              type="error"
              showIcon
              className="mb-4"
            />
          )}

          {daysUntilDue <= 3 && daysUntilDue > 0 && (
            <Alert
              message="Due Soon"
              description={`This assignment is due in ${daysUntilDue} day${daysUntilDue !== 1 ? "s" : ""}.`}
              type="warning"
              showIcon
              className="mb-4"
            />
          )}
        </div>

        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed">{content.instructions}</p>
        </div>
      </Card>

      {/* Rubric */}
      {content.rubric && (
        <Card title="Grading Rubric">
          <Table
            dataSource={content.rubric.map((item, index) => ({ ...item, key: index }))}
            columns={[
              {
                title: "Criteria",
                dataIndex: "criteria",
                key: "criteria",
                width: "70%",
              },
              {
                title: "Points",
                dataIndex: "points",
                key: "points",
                width: "30%",
                render: (points) => <Tag color="blue">{points} pts</Tag>,
              },
            ]}
            pagination={false}
            size="small"
          />
          <div className="mt-4 text-sm text-gray-600">
            Total Points: {content.rubric.reduce((sum, item) => sum + item.points, 0)}
          </div>
        </Card>
      )}
    </div>
  )

  const renderSubmission = () => (
    <div className="space-y-6">
      {/* Submission Status */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Submit Assignment</h3>
          <div className="flex items-center space-x-2">
            {isSubmitted ? (
              <Tag color="success" icon={<CheckCircleOutlined />}>
                Submitted
              </Tag>
            ) : isDraft ? (
              <Tag color="processing" icon={<SaveOutlined />}>
                Draft Saved
              </Tag>
            ) : (
              <Tag color="default" icon={<EditOutlined />}>
                Not Started
              </Tag>
            )}
          </div>
        </div>

        {/* Text Submission */}
        {content.submissionTypes?.includes("text") && (
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Text Submission</h4>
            <TextArea
              rows={8}
              placeholder="Enter your assignment response here..."
              value={textSubmission}
              onChange={(e) => setTextSubmission(e.target.value)}
              disabled={isSubmitted}
            />
          </div>
        )}

        {/* File Upload */}
        {content.submissionTypes?.includes("file") && (
          <div className="mb-6">
            <h4 className="font-semibold mb-2">File Upload</h4>
            <Upload
              multiple
              fileList={fileList}
              onChange={handleFileUpload}
              beforeUpload={() => false}
              disabled={isSubmitted}
            >
              <Button icon={<UploadOutlined />} disabled={isSubmitted}>
                Select Files
              </Button>
            </Upload>
            <div className="text-sm text-gray-500 mt-2">
              Supported formats: PDF, DOC, DOCX, TXT, ZIP (Max 10MB per file)
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center space-x-4">
          <Button icon={<SaveOutlined />} onClick={handleSaveDraft} disabled={isSubmitted}>
            Save Draft
          </Button>
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSubmitAssignment}
            disabled={isSubmitted || (!textSubmission.trim() && fileList.length === 0)}
          >
            Submit Assignment
          </Button>
        </div>
      </Card>

      {/* Submission History */}
      <Card title="Submission History">
        <Table
          dataSource={submissions}
          columns={[
            {
              title: "Date",
              dataIndex: "date",
              key: "date",
              render: (date) => moment(date).format("MMM DD, YYYY"),
            },
            {
              title: "Type",
              dataIndex: "type",
              key: "type",
              render: (type) => <Tag color={type === "Final Submission" ? "green" : "blue"}>{type}</Tag>,
            },
            {
              title: "Status",
              dataIndex: "status",
              key: "status",
              render: (status) => {
                const statusConfig = {
                  saved: { color: "processing", icon: <SaveOutlined />, text: "Saved" },
                  submitted: { color: "success", icon: <CheckCircleOutlined />, text: "Submitted" },
                  graded: { color: "purple", icon: <StarOutlined />, text: "Graded" },
                }
                const config = statusConfig[status]
                return (
                  <Tag color={config.color} icon={config.icon}>
                    {config.text}
                  </Tag>
                )
              },
            },
            {
              title: "Grade",
              dataIndex: "grade",
              key: "grade",
              render: (grade) => (grade ? `${grade}/${content.maxPoints}` : "-"),
            },
            {
              title: "Actions",
              key: "actions",
              render: (_, record) => (
                <div className="space-x-2">
                  <Button size="small" icon={<EyeOutlined />}>
                    View
                  </Button>
                  {record.feedback && (
                    <Button size="small" icon={<CommentOutlined />} onClick={() => setShowFeedback(true)}>
                      Feedback
                    </Button>
                  )}
                </div>
              ),
            },
          ]}
          pagination={false}
          size="small"
        />
      </Card>
    </div>
  )

  const renderGrades = () => (
    <div className="space-y-6">
      {isSubmitted ? (
        <Card>
          <div className="text-center mb-6">
            <ClockCircleOutlined className="text-4xl text-blue-500 mb-2" />
            <h3 className="text-xl font-semibold mb-2">Grading in Progress</h3>
            <p className="text-gray-600">Your assignment has been submitted and is being reviewed by the instructor.</p>
          </div>

          {/* Mock graded assignment for demonstration */}
          <Button type="primary" onClick={() => setShowFeedback(true)} className="w-full">
            View Sample Feedback (Demo)
          </Button>
        </Card>
      ) : (
        <Card>
          <div className="text-center">
            <ExclamationCircleOutlined className="text-4xl text-gray-400 mb-2" />
            <h3 className="text-xl font-semibold mb-2">No Grades Available</h3>
            <p className="text-gray-600">Submit your assignment to receive a grade and feedback.</p>
          </div>
        </Card>
      )}
    </div>
  )

  const renderFeedbackModal = () => (
    <Modal
      title="Assignment Feedback"
      open={showFeedback}
      onCancel={() => setShowFeedback(false)}
      footer={[
        <Button key="close" onClick={() => setShowFeedback(false)}>
          Close
        </Button>,
      ]}
      width={800}
    >
      <div className="space-y-6">
        {/* Grade Summary */}
        <Card>
          <div className="text-center mb-4">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {mockFeedback.grade}/{mockFeedback.maxPoints}
            </div>
            <Rate disabled value={Math.round((mockFeedback.grade / mockFeedback.maxPoints) * 5)} />
            <div className="text-sm text-gray-600 mt-2">
              Grade: {Math.round((mockFeedback.grade / mockFeedback.maxPoints) * 100)}%
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium">Submitted:</span> {mockFeedback.submittedDate}
            </div>
            <div>
              <span className="font-medium">Graded:</span> {mockFeedback.gradedDate}
            </div>
            <div>
              <span className="font-medium">Instructor:</span> {mockFeedback.instructor}
            </div>
            <div>
              <span className="font-medium">Status:</span>
              <Tag color="success" className="ml-2">
                Graded
              </Tag>
            </div>
          </div>
        </Card>

        {/* Rubric Scores */}
        <Card title="Detailed Rubric Scores">
          <Table
            dataSource={mockFeedback.rubricScores}
            columns={[
              {
                title: "Criteria",
                dataIndex: "criteria",
                key: "criteria",
              },
              {
                title: "Points Earned",
                dataIndex: "score",
                key: "score",
                render: (score, record) => (
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">{score}</span>
                    <span className="text-gray-500">/ {record.points}</span>
                    <Progress
                      percent={Math.round((score / record.points) * 100)}
                      size="small"
                      className="w-20"
                      showInfo={false}
                    />
                  </div>
                ),
              },
            ]}
            pagination={false}
            size="small"
          />
        </Card>

        {/* Instructor Feedback */}
        <Card title="Instructor Feedback">
          <div className="bg-blue-50 p-4 rounded-lg">
            <CommentOutlined className="text-blue-500 mr-2" />
            <span className="text-gray-800">{mockFeedback.feedback}</span>
          </div>
        </Card>
      </div>
    </Modal>
  )

  return (
    <div className="p-6">
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Instructions" key="instructions" icon={<FileTextOutlined />}>
          {renderInstructions()}
        </TabPane>
        <TabPane tab="Submit" key="submission" icon={<UploadOutlined />}>
          {renderSubmission()}
        </TabPane>
        <TabPane tab="Grades" key="grades" icon={<StarOutlined />}>
          {renderGrades()}
        </TabPane>
      </Tabs>

      {renderFeedbackModal()}
    </div>
  )
}

export default AssignmentContent
