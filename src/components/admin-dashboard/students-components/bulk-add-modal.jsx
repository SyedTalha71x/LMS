/* eslint-disable no-unused-vars */
import { Modal, Upload as AntUpload, Button, Typography, message } from "antd"
import { InboxOutlined } from "@ant-design/icons"

const { Dragger } = AntUpload
const { Text, Title } = Typography

export default function BulkAddModal({ isOpen, onClose, roleOptions, statusOptions, groupOptions, addAuditLog }) {
  const uploadProps = {
    name: "file",
    multiple: false,
    accept: ".csv",
    beforeUpload: (file) => {
      const isCSV = file.type === "text/csv" || file.name.endsWith(".csv")
      if (!isCSV) {
        message.error("You can only upload CSV files!")
        return false
      }
      message.success(`${file.name} file selected successfully.`)
      addAuditLog("Bulk Import", file.name)
      return false // Prevent actual upload
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files)
    },
  }

  const downloadTemplate = () => {
    // Create CSV template
    const headers = ["Name", "Email", "Role", "Status", "Group", "Age", "Gender", "Description"]
    const csvContent =
      headers.join(",") + "\n" + "John Doe,john@example.com,Student,Active,Group A,25,Male,Sample description"

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "bulk_users_template.csv"
    a.click()
    window.URL.revokeObjectURL(url)

    message.success("Template downloaded successfully!")
  }

  return (
    <Modal
      title="Bulk Add Users"
      open={isOpen}
      onCancel={onClose}
      width={600}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="template" type="primary" onClick={downloadTemplate}>
          Download Template
        </Button>,
      ]}
    >
      <div style={{ marginBottom: "24px" }}>
        <Dragger {...uploadProps} style={{ padding: "40px 20px" }}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined style={{ fontSize: "48px", color: "#d1d5db" }} />
          </p>
          <p className="ant-upload-text" style={{ fontSize: "16px", marginBottom: "8px" }}>
            Click or drag CSV file to this area to upload
          </p>
          <p className="ant-upload-hint" style={{ fontSize: "14px", color: "#6b7280" }}>
            Support for a single CSV file upload. Select your file with user data.
          </p>
        </Dragger>
      </div>

      <div style={{ backgroundColor: "#f9fafb", padding: "16px", borderRadius: "8px", border: "1px solid #e5e7eb" }}>
        <Title level={5} style={{ marginBottom: "8px" }}>
          Required columns:
        </Title>
        <Text
          code
          style={{
            display: "block",
            backgroundColor: "white",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #d1d5db",
          }}
        >
          Name,Email,Role,Status,Group,Age,Gender,Description
        </Text>
      </div>
    </Modal>
  )
}
