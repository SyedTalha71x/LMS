import { Plus, Upload } from "lucide-react"
import { Modal, Button, Statistic, Row, Col } from "antd"

export default function UserManagementModal({ show, onClose, students, openAddModal, setIsBulkAddModalOpen }) {
  return (
    <Modal
      title="User Management"
      open={show}
      onCancel={onClose}
      width={600}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Close
        </Button>,
      ]}
    >
      <div style={{ marginBottom: "24px" }}>
        <Row gutter={16}>
          <Col span={6}>
            <Statistic title="Total Users" value={students.length} />
          </Col>
          <Col span={6}>
            <Statistic
              title="Active"
              value={students.filter((s) => s.status === "Active").length}
              valueStyle={{ color: "#16a34a" }}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="Inactive"
              value={students.filter((s) => s.status === "Inactive").length}
              valueStyle={{ color: "#dc2626" }}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="Pending"
              value={students.filter((s) => s.status === "Pending").length}
              valueStyle={{ color: "#ea580c" }}
            />
          </Col>
        </Row>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <Button
          type="primary"
          icon={<Plus size={16} />}
          onClick={() => {
            openAddModal()
            onClose()
          }}
          block
        >
          Add Single User
        </Button>

        <Button
          type="primary"
          style={{ backgroundColor: "#16a34a" }}
          icon={<Upload size={16} />}
          onClick={() => {
            setIsBulkAddModalOpen(true)
            onClose()
          }}
          block
        >
          Bulk Add Users
        </Button>
      </div>
    </Modal>
  )
}
