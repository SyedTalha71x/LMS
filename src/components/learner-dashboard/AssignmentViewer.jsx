/* eslint-disable no-unused-vars */
"use client"

import { useState } from "react"
import { Card, Button, Input, Upload, Table, Modal, Tag, Divider, message, Progress, Typography, Row, Col } from "antd"
import {
  UploadOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  TrophyOutlined,
  SaveOutlined,
  SendOutlined,
} from "@ant-design/icons"

const { Title, Text, Paragraph } = Typography

const AssignmentViewer = ({ assignment, onComplete }) => {
  const [submissionType, setSubmissionType] = useState("text")
  const [textSubmission, setTextSubmission] = useState("")
  const [fileList, setFileList] = useState([])
  const [urlSubmission, setUrlSubmission] = useState("")
  const [isDraft, setIsDraft] = useState(true)
  const [submissions, setSubmissions] = useState([])
  const [showSubmissionHistory, setShowSubmissionHistory] = useState(false)
  const [showFeedback, setShowFeedback] = useState(false)

  const handleSaveDraft = () => {
    const draft = {
      id: Date.now(),
      type: submissionType,
      content: submissionType === "text" ? textSubmission : submissionType === "url" ? urlSubmission : fileList,
      savedAt: new Date().toLocaleString(),
      status: "draft",
    }
    setSubmissions([...submissions, draft])
    message.success("Draft saved successfully!")
  }

  const handleSubmit = () => {
    if (submissionType === "text" && !textSubmission.trim()) {
      message.error("Please enter your submission text")
      return
    }
    if (submissionType === "file" && fileList.length === 0) {
      message.error("Please upload a file")
      return
    }
    if (submissionType === "url" && !urlSubmission.trim()) {
      message.error("Please enter a URL")
      return
    }

    Modal.confirm({
      title: "Submit Assignment",
      content: "Are you sure you want to submit this assignment? You can still edit it after submission.",
      okText: "Submit",
      cancelText: "Cancel",
      onOk() {
        const submission = {
          id: Date.now(),
          type: submissionType,
          content: submissionType === "text" ? textSubmission : submissionType === "url" ? urlSubmission : fileList,
          submittedAt: new Date().toLocaleString(),
          status: "submitted",
          grade: null,
          feedback: null,
        }
        setSubmissions([...submissions, submission])
        setIsDraft(false)
        message.success("Assignment submitted successfully!")
        onComplete(assignment.id)
      },
    })
  }

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
  }

  const rubricColumns = [
    {
      title: "Criteria",
      dataIndex: "criteria",
      key: "criteria",
    },
    {
      title: "Points",
      dataIndex: "points",
      key: "points",
      align: "right",
    },
  ]

  const submissionColumns = [
    {
      title: "Submitted At",
      dataIndex: "submittedAt",
      key: "submittedAt",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => <Tag color="blue">{type}</Tag>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={status === "submitted" ? "green" : "orange"}>{status}</Tag>,
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
      render: (grade) => (grade ? `${grade}/${assignment.maxPoints}` : "Pending"),
    },
  ]

  const latestSubmission = submissions.length > 0 ? submissions[submissions.length - 1] : null

  return (
    <div className="space-y-6">
      {/* Assignment Header */}
      <Card>
        <div className="flex items-start justify-between mb-4">
          <div>
            <Title level={3}>{assignment.title}</Title>
            <div className="flex items-center space-x-4 text-gray-600">
              <span className="flex items-center space-x-1">
                <ClockCircleOutlined />
                <span>Due: {assignment.dueDate}</span>
              </span>
              <span className="flex items-center space-x-1">
                <TrophyOutlined />
                <span>{assignment.maxPoints} points</span>
              </span>
            </div>
          </div>
          {latestSubmission?.status === "submitted" && (
            <Tag color="green" icon={<CheckCircleOutlined />}>
              Submitted
            </Tag>
          )}
        </div>

        <Divider />

        <div>
          <Title level={5}>Instructions</Title>
          <Paragraph>{assignment.instructions}</Paragraph>
        </div>

        {assignment.rubric && (
          <div>
            <Title level={5}>Grading Rubric</Title>
            <Table
              columns={rubricColumns}
              dataSource={assignment.rubric}
              pagination={false}
              size="small"
              rowKey="criteria"
            />
          </div>
        )}
      </Card>

      {/* Submission Form */}
      <Card title="Submit Your Work">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Submission Type</label>
            <div className="flex space-x-2">
              {assignment.submissionTypes.includes("text") && (
                <Button
                  type={submissionType === "text" ? "primary" : "default"}
                  onClick={() => setSubmissionType("text")}
                >
                  Text
                </Button>
              )}
              {assignment.submissionTypes.includes("file") && (
                <Button
                  type={submissionType === "file" ? "primary" : "default"}
                  onClick={() => setSubmissionType("file")}
                >
                  File Upload
                </Button>
              )}
              {assignment.submissionTypes.includes("url") && (
                <Button
                  type={submissionType === "url" ? "primary" : "default"}
                  onClick={() => setSubmissionType("url")}
                >
                  URL
                </Button>
              )}
            </div>
          </div>

          {submissionType === "text" && (
            <Input.TextArea
              rows={8}
              placeholder="Enter your submission here..."
              value={textSubmission}
              onChange={(e) => setTextSubmission(e.target.value)}
            />
          )}

          {submissionType === "file" && (
            <Upload fileList={fileList} onChange={handleUploadChange} beforeUpload={() => false}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          )}

          {submissionType === "url" && (
            <Input
              placeholder="Enter URL..."
              value={urlSubmission}
              onChange={(e) => setUrlSubmission(e.target.value)}
            />
          )}

          <div className="flex space-x-2">
            <Button icon={<SaveOutlined />} onClick={handleSaveDraft}>
              Save as Draft
            </Button>
            <Button type="primary" icon={<SendOutlined />} onClick={handleSubmit}>
              Submit Assignment
            </Button>
          </div>
        </div>
      </Card>

      {/* Submission History */}
      {submissions.length > 0 && (
        <Card title="Submission History">
          <Table columns={submissionColumns} dataSource={submissions} pagination={false} size="small" rowKey="id" />
        </Card>
      )}

      {/* Grade & Feedback */}
      {latestSubmission?.grade && (
        <Card title="Grade & Feedback" className="border-l-4 border-green-500">
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600">
                  {latestSubmission.grade}/{assignment.maxPoints}
                </div>
                <Progress
                  type="circle"
                  percent={Math.round((latestSubmission.grade / assignment.maxPoints) * 100)}
                  width={80}
                />
              </div>
            </Col>
            <Col xs={24} sm={12}>
              <div>
                <Title level={5}>Instructor Feedback</Title>
                <Paragraph>{latestSubmission.feedback || "No feedback provided yet."}</Paragraph>
              </div>
            </Col>
          </Row>
        </Card>
      )}
    </div>
  )
}

export default AssignmentViewer
