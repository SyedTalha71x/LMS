import { Edit, Key, Power, Trash2 } from "lucide-react"
import { Modal, Avatar, Tag, Button, Progress } from "antd"

export default function StudentDetailModal({ student, onClose, onEdit, onResetPassword, onToggleStatus, onDelete }) {
  if (!student) return null

  return (
    <Modal
      title={
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Avatar size={64} style={{ backgroundColor: "#f3f4f6", color: "#374151" }}>
            {student.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </Avatar>
          <div>
            <h2 style={{ margin: 0, fontSize: "24px", fontWeight: 600 }}>{student.name}</h2>
            <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>{student.email}</p>
            <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>
              {student.age} years old • {student.gender}
            </p>
            <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
              <Tag
                color={
                  student.designation === "Admin" ? "red" : student.designation === "Instructor" ? "blue" : "green"
                }
              >
                {student.designation}
              </Tag>
              <Tag
                color={
                  student.status === "Active"
                    ? "green"
                    : student.status === "Inactive"
                      ? "red"
                      : student.status === "Pending"
                        ? "orange"
                        : "default"
                }
              >
                {student.status}
              </Tag>
            </div>
          </div>
        </div>
      }
      open={true}
      onCancel={onClose}
      width={800}
      footer={[
        <Button key="edit" type="primary" icon={<Edit size={16} />} onClick={() => onEdit(student)}>
          Edit User
        </Button>,
        <Button
          key="reset"
          style={{ backgroundColor: "#ea580c" }}
          type="primary"
          icon={<Key size={16} />}
          onClick={() => onResetPassword(student.id)}
        >
          Reset Password
        </Button>,
        <Button
          key="toggle"
          type="primary"
          style={{
            backgroundColor: student.status === "Active" ? "#dc2626" : "#16a34a",
          }}
          icon={<Power size={16} />}
          onClick={() => onToggleStatus(student.id)}
        >
          {student.status === "Active" ? "Deactivate" : "Activate"}
        </Button>,
        <Button key="delete" danger type="primary" icon={<Trash2 size={16} />} onClick={() => onDelete(student.id)}>
          Delete
        </Button>,
      ]}
    >
      <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
        {/* Account Info + Courses */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>
              Account Information
            </h3>
            <div style={{ fontSize: "14px", lineHeight: "1.6" }}>
              <div>
                <span style={{ color: "#6b7280" }}>Email:</span> {student.email}
              </div>
              <div>
                <span style={{ color: "#6b7280" }}>Group:</span> {student.group}
              </div>
              <div>
                <span style={{ color: "#6b7280" }}>Last Login:</span>{" "}
                {student.lastLogin === "Never" ? "Never" : new Date(student.lastLogin).toLocaleDateString()}
              </div>
              <div>
                <span style={{ color: "#6b7280" }}>Created:</span> {new Date(student.createdDate).toLocaleDateString()}
              </div>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: "14px", fontWeight: 500, color: "#374151", marginBottom: "8px" }}>
              Enrolled Courses
            </h3>
            <div>
              {student.courses.length > 0 ? (
                student.courses.map((course, index) => (
                  <Tag key={index} color="blue" style={{ marginBottom: "4px" }}>
                    {course}
                  </Tag>
                ))
              ) : (
                <span style={{ fontSize: "14px", color: "#6b7280" }}>No courses enrolled</span>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: "24px" }}>
          <h3 style={{ fontSize: "18px", color: "#374151", fontWeight: 600, marginBottom: "8px" }}>Description</h3>
          <p style={{ fontSize: "14px", color: "#6b7280" }}>{student.description}</p>
        </div>

        {/* Achievements */}
        <div style={{ marginBottom: "24px" }}>
          <h3 style={{ fontSize: "18px", color: "#374151", fontWeight: 600, marginBottom: "8px" }}>Achievements</h3>
          <div>
            {student.achievements.length > 0 ? (
              student.achievements.map((achievement, index) => (
                <Tag key={index} color="gold" style={{ marginBottom: "4px" }}>
                  {achievement.name}
                </Tag>
              ))
            ) : (
              <span style={{ fontSize: "14px", color: "#6b7280" }}>No achievements yet</span>
            )}
          </div>
        </div>

        {/* Certificates */}
        <div style={{ marginBottom: "24px" }}>
          <h3 style={{ fontSize: "18px", color: "#374151", fontWeight: 600, marginBottom: "8px" }}>Certificates</h3>
          <div>
            {student.certificates.length > 0 ? (
              student.certificates.map((certificate, index) => (
                <Tag key={index} color="purple" style={{ marginBottom: "4px" }}>
                  {certificate.name}
                </Tag>
              ))
            ) : (
              <span style={{ fontSize: "14px", color: "#6b7280" }}>No certificates earned</span>
            )}
          </div>
        </div>

        {/* Progress Bars */}
        <div>
          <h3 style={{ fontSize: "18px", color: "#374151", fontWeight: 600, marginBottom: "16px" }}>Progress</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontSize: "14px", color: "#000" }}>Group Activity</span>
                <span style={{ fontSize: "14px", color: "#374151" }}>{student.progress.groupActivity}%</span>
              </div>
              <Progress percent={student.progress.groupActivity} strokeColor="#2563eb" />
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontSize: "14px", color: "#000" }}>Individual Performance 1</span>
                <span style={{ fontSize: "14px", color: "#6b7280" }}>{student.progress.singleRange1}%</span>
              </div>
              <Progress percent={student.progress.singleRange1} strokeColor="#16a34a" />
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontSize: "14px", color: "#000" }}>Individual Performance 2</span>
                <span style={{ fontSize: "14px", color: "#6b7280" }}>{student.progress.singleRange2}%</span>
              </div>
              <Progress percent={student.progress.singleRange2} strokeColor="#9333ea" />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
