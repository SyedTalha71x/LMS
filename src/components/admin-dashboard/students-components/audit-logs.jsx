import { Modal, Table, Tag } from "antd"

export default function AuditLogsModal({ isOpen, onClose, auditLogs }) {
  const columns = [
    {
      title: "Timestamp",
      dataIndex: "timestamp",
      key: "timestamp",
      render: (timestamp) => new Date(timestamp).toLocaleString(),
      sorter: (a, b) => new Date(a.timestamp) - new Date(b.timestamp),
    },
    {
      title: "Admin",
      dataIndex: "admin",
      key: "admin",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (action) => {
        let color = "blue"
        if (action.includes("Delete")) color = "red"
        else if (action.includes("Activate")) color = "green"
        else if (action.includes("Deactivate")) color = "red"

        return <Tag color={color}>{action}</Tag>
      },
    },
    {
      title: "Target",
      dataIndex: "target",
      key: "target",
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
    },
  ]

  return (
    <Modal title="Audit Logs" open={isOpen} onCancel={onClose} width={1000} footer={null}>
      <Table
        columns={columns}
        dataSource={auditLogs}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        locale={{
          emptyText: "No audit logs yet. Actions will be tracked here.",
        }}
      />
    </Modal>
  )
}
