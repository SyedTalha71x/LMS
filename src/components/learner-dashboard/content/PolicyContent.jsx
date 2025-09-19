
import { useState } from "react"
import { Card, Checkbox, Button, Alert, Divider } from "antd"
import { CheckCircleOutlined, FileProtectOutlined } from "@ant-design/icons"

const PolicyContent = ({ content, onComplete, isCompleted }) => {
  const [agreed, setAgreed] = useState(false)
  const [submitted, setSubmitted] = useState(isCompleted)

  const handleSubmit = () => {
    if (agreed) {
      setSubmitted(true)
      onComplete()
    }
  }

  return (
    <div className="p-6">
      <Card>
        <div className="text-center mb-6">
          <FileProtectOutlined className="text-4xl text-yellow-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{content.title}</h2>
          <p className="text-gray-600">Please read and acknowledge the following policy to continue.</p>
        </div>

        {content.required && (
          <Alert
            message="Required Acknowledgment"
            description="You must read and agree to this policy to proceed with the course."
            type="warning"
            showIcon
            className="mb-6"
          />
        )}

        <div className="bg-gray-50 p-6 rounded-lg mb-6 max-h-96 overflow-y-auto">
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content.content }} />
        </div>

        {submitted ? (
          <div className="text-center">
            <CheckCircleOutlined className="text-4xl text-green-500 mb-4" />
            <h3 className="text-xl font-semibold text-green-600 mb-2">Policy Acknowledged</h3>
            <p className="text-gray-600">
              You have successfully acknowledged this policy on {new Date().toLocaleDateString()}.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <Divider />

            <div className="flex items-start space-x-3">
              <Checkbox checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1" />
              <div className="flex-1">
                <p className="text-gray-700">
                  I have read and understand the above policy. I agree to comply with all terms and conditions outlined
                  in this document.
                </p>
              </div>
            </div>

            <div className="text-center pt-4">
              <Button
                type="primary"
                size="large"
                onClick={handleSubmit}
                disabled={!agreed}
                icon={<CheckCircleOutlined />}
              >
                I Acknowledge and Agree
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  )
}

export default PolicyContent
