"use client"

import { useState } from "react"
import { Card, Button, Checkbox, message, Spin, Typography, Space, Tag } from "antd"
import { DownloadOutlined, CheckCircleOutlined, FileTextOutlined } from "@ant-design/icons"

const { Title, Text } = Typography

const PDFViewer = ({ document, onComplete }) => {
  const [isAcknowledged, setIsAcknowledged] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleAcknowledge = () => {
    if (!isAcknowledged) {
      message.error("Please acknowledge that you have read the document")
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      message.success("Document acknowledged!")
      onComplete(document.id)
    }, 1000)
  }

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = document.content?.pdfUrl || "#"
    link.download = document.title || "document.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    message.success("Download started!")
  }

  return (
    <div className="space-y-6">
      {/* Document Header */}
      <Card>
        <div className="flex items-start justify-between">
          <div>
            <Title level={3} className="flex items-center space-x-2">
              <FileTextOutlined />
              <span>{document.title}</span>
            </Title>
            <Text type="secondary">{document.content?.pages || "N/A"} pages</Text>
          </div>
          <Button icon={<DownloadOutlined />} onClick={handleDownload}>
            Download PDF
          </Button>
        </div>
      </Card>

      {/* PDF Viewer */}
      <Card title="Document Preview">
        <div className="bg-gray-100 rounded-lg p-8 text-center min-h-96 flex items-center justify-center">
          <Spin spinning={isLoading}>
            <div className="text-center">
              <FileTextOutlined className="text-6xl text-gray-400 mb-4" />
              <p className="text-gray-600">PDF Preview</p>
              <p className="text-sm text-gray-500 mt-2">Click "Download PDF" to view the full document</p>
            </div>
          </Spin>
        </div>
      </Card>

      {/* Acknowledgment */}
      <Card title="Acknowledgment Required">
        <Space direction="vertical" className="w-full">
          <Checkbox checked={isAcknowledged} onChange={(e) => setIsAcknowledged(e.target.checked)}>
            I have read and understood the document
          </Checkbox>

          <Button
            type="primary"
            icon={<CheckCircleOutlined />}
            onClick={handleAcknowledge}
            loading={isLoading}
            disabled={!isAcknowledged}
            block
          >
            Mark as Complete
          </Button>

          {isAcknowledged && (
            <Tag color="green" icon={<CheckCircleOutlined />}>
              Ready to submit
            </Tag>
          )}
        </Space>
      </Card>
    </div>
  )
}

export default PDFViewer
