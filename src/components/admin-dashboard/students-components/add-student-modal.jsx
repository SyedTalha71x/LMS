
import { useState } from "react"
import { Plus } from "lucide-react"
import { Modal, Form, Input, Select, InputNumber, Upload, Button, Avatar, message } from "antd"
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons"

const { Option } = Select
const { TextArea } = Input

export default function AddStudentModal({ isOpen, onClose, roleOptions, statusOptions, groupOptions, addAuditLog }) {
  const [form] = Form.useForm()
  const [profileImage, setProfileImage] = useState(null)
  const [customFields, setCustomFields] = useState([])
  const [showCustomPrompt, setShowCustomPrompt] = useState(false)
  const [customFieldName, setCustomFieldName] = useState("")
  const [customFieldValue, setCustomFieldValue] = useState("")

  const handleImageChange = (info) => {
    if (info.file.status === "done" || info.file.originFileObj) {
      const file = info.file.originFileObj || info.file
      const imageUrl = URL.createObjectURL(file)
      setProfileImage(imageUrl)
    }
  }

  const addCustomField = () => {
    if (customFieldName.trim()) {
      setCustomFields([...customFields, { name: customFieldName, value: customFieldValue }])
      setCustomFieldName("")
      setCustomFieldValue("")
      setShowCustomPrompt(false)
    }
  }

  const removeCustomField = (index) => {
    setCustomFields((prev) => prev.filter((_, i) => i !== index))
  }

  const handleClose = () => {
    form.resetFields()
    setProfileImage(null)
    setCustomFields([])
    setShowCustomPrompt(false)
    setCustomFieldName("")
    setCustomFieldValue("")
    onClose()
  }

  const handleSubmit = (values) => {
    addAuditLog("Create User", `${values.firstName} ${values.lastName}`)
    message.success("User created successfully!")
    handleClose()
  }

  return (
    <Modal
      title="Add New User"
      open={isOpen}
      onCancel={handleClose}
      width={600}
      footer={[
        <Button key="cancel" onClick={handleClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          Create User
        </Button>,
      ]}
    >
      <div style={{ maxHeight: "70vh", overflowY: "auto" }}>
        {/* Profile Picture */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "24px" }}>
          <Avatar
            size={96}
            src={profileImage}
            style={{ backgroundColor: "#f3f4f6", color: "#374151", marginBottom: "12px" }}
          >
            {!profileImage && <span style={{ fontSize: "32px" }}>+</span>}
          </Avatar>
          <Upload showUploadList={false} beforeUpload={() => false} onChange={handleImageChange}>
            <Button icon={<UploadOutlined />}>Upload Picture</Button>
          </Upload>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            role: "Student",
            status: "Active",
          }}
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: "Please enter first name" }]}
          >
            <Input placeholder="Enter first name" />
          </Form.Item>

          <Form.Item label="Last Name" name="lastName" rules={[{ required: true, message: "Please enter last name" }]}>
            <Input placeholder="Enter last name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, type: "email", message: "Please enter valid email" }]}
          >
            <Input placeholder="Enter email address" />
          </Form.Item>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <Form.Item label="Age" name="age">
              <InputNumber placeholder="Enter age" min={1} max={120} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item label="Gender" name="gender">
              <Select placeholder="Select gender">
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
            <Form.Item label="Role" name="role" rules={[{ required: true, message: "Please select role" }]}>
              <Select>
                {roleOptions.map((role) => (
                  <Option key={role} value={role}>
                    {role}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Status" name="status">
              <Select>
                {statusOptions.map((status) => (
                  <Option key={status} value={status}>
                    {status}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <Form.Item label="Group Assignment" name="group">
            <Select placeholder="Select group">
              {groupOptions.map((group) => (
                <Option key={group} value={group}>
                  {group}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Description" name="description">
            <TextArea rows={3} placeholder="Enter user description" />
          </Form.Item>

          {/* Custom Fields */}
          {customFields.length > 0 && (
            <div style={{ marginBottom: "16px" }}>
              <label style={{ display: "block", fontSize: "14px", fontWeight: 500, marginBottom: "8px" }}>
                Custom Fields
              </label>
              {customFields.map((field, index) => (
                <div key={index} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>{field.name}</div>
                    <Input
                      value={field.value}
                      onChange={(e) => {
                        const updated = [...customFields]
                        updated[index].value = e.target.value
                        setCustomFields(updated)
                      }}
                      placeholder={`Enter ${field.name.toLowerCase()}`}
                    />
                  </div>
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => removeCustomField(index)}
                    style={{ alignSelf: "flex-end" }}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Add Custom Field */}
          {showCustomPrompt ? (
            <div
              style={{
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                padding: "16px",
                backgroundColor: "#f9fafb",
                marginBottom: "16px",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <Input
                  placeholder="Field Name"
                  value={customFieldName}
                  onChange={(e) => setCustomFieldName(e.target.value)}
                />
                <Input
                  placeholder="Default Value"
                  value={customFieldValue}
                  onChange={(e) => setCustomFieldValue(e.target.value)}
                />
                <div style={{ display: "flex", gap: "8px" }}>
                  <Button type="primary" onClick={addCustomField}>
                    Add
                  </Button>
                  <Button
                    onClick={() => {
                      setShowCustomPrompt(false)
                      setCustomFieldName("")
                      setCustomFieldValue("")
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <Button
              type="link"
              icon={<Plus size={16} />}
              onClick={() => setShowCustomPrompt(true)}
              style={{ padding: 0, marginBottom: "16px" }}
            >
              Add Custom Field
            </Button>
          )}
        </Form>
      </div>
    </Modal>
  )
}
