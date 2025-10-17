"use client"

import { useState } from "react"
import { Card, Button, Checkbox, message, Typography, Space, Tag } from "antd"
import { CheckCircleOutlined, FileTextOutlined } from "@ant-design/icons"

const { Title, Text } = Typography

const TextContentViewer = ({ content, onComplete, isPolicy = false }) => {
  const [isAcknowledged, setIsAcknowledged] = useState(false)

  const handleAcknowledge = () => {
    if (!isAcknowledged) {
      message.error("Please acknowledge that you have read the content")
      return
    }

    message.success("Content acknowledged!")
    onComplete(content.id)
  }

  return (
    <div className="space-y-6">
      <Card>
        <Title level={3} className="flex items-center space-x-2">
          <FileTextOutlined />
          <span>{content.title}</span>
        </Title>
      </Card>

      <Card>
        <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: content.content?.html || "" }} />
      </Card>

      {isPolicy && (
        <Card title="Acknowledgment Required">
          <Space direction="vertical" className="w-full">
            <Checkbox checked={isAcknowledged} onChange={(e) => setIsAcknowledged(e.target.checked)}>
              I have read and understood this policy
            </Checkbox>

            <Button
              type="primary"
              icon={<CheckCircleOutlined />}
              onClick={handleAcknowledge}
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
      )}
    </div>
  )
}

export default TextContentViewer
