import { useState } from "react"
import {
  Layout,
  Card,
  Button,
  Input,
  Tabs,
  List,
  Avatar,
  Badge,
  Dropdown,
  Modal,
  Form,
  Select,
  DatePicker,
  Radio,
  Tag,
  Space,
  Typography,
  Divider,
  Upload,
  message,
  Drawer,
} from "antd"
import {
  BellOutlined,
  SearchOutlined,
  MoreOutlined,
  SendOutlined,
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
  EyeOutlined,
  SaveOutlined,
  ScheduleOutlined,
  UserOutlined,
  TeamOutlined,
  NotificationOutlined,
  SettingOutlined,
  InboxOutlined,
  MenuOutlined,
  CheckOutlined,
  InboxOutlined as ArchiveOutlined,
} from "@ant-design/icons"

const { Content } = Layout
const { Title, Text, Paragraph } = Typography
const { Option } = Select
const { TextArea } = Input

const NotificationPage = () => {
  const [activeMainTab, setActiveMainTab] = useState("notifications")
  const [activeTab, setActiveTab] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedNotification, setSelectedNotification] = useState(null)
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [form] = Form.useForm()
  const [messageContent, setMessageContent] = useState("")
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "System Maintenance Scheduled",
      description: "Scheduled maintenance will occur this weekend",
      senderType: "System",
      sender: "System Administrator",
      recipients: ["All Users"],
      recipientCount: 1250,
      timestamp: "2024-01-15T10:30:00Z",
      status: "sent",
      type: "system",
      deliveryMethod: "in-app",
      priority: "high",
      content:
        "We will be performing scheduled maintenance on our servers this weekend from 2 AM to 6 AM EST. During this time, some services may be temporarily unavailable.",
      isRead: false,
      isArchived: false,
    },
    {
      id: 2,
      title: "New Course Available",
      description: "Advanced React Development course is now live",
      senderType: "Admin",
      sender: "Course Administrator",
      recipients: ["Students", "Premium Users"],
      recipientCount: 450,
      timestamp: "2024-01-14T15:45:00Z",
      status: "sent",
      type: "announcement",
      deliveryMethod: "email",
      priority: "medium",
      content:
        "We are excited to announce the launch of our new Advanced React Development course. This comprehensive course covers hooks, context, and advanced patterns.",
      isRead: true,
      isArchived: false,
    },
    {
      id: 3,
      title: "Weekly Newsletter",
      description: "Your weekly digest of platform updates",
      senderType: "Marketing",
      sender: "Marketing Team",
      recipients: ["All Subscribers"],
      recipientCount: 2100,
      timestamp: "2024-01-13T09:00:00Z",
      status: "scheduled",
      type: "announcement",
      deliveryMethod: "email",
      priority: "low",
      content: "This week in our platform: new features, user spotlights, and upcoming events.",
      isRead: false,
      isArchived: false,
      scheduledFor: "2024-01-20T09:00:00Z",
    },
    {
      id: 4,
      title: "Security Alert",
      description: "Unusual login activity detected",
      senderType: "Security",
      sender: "Security System",
      recipients: ["john.doe@example.com"],
      recipientCount: 1,
      timestamp: "2024-01-12T14:20:00Z",
      status: "sent",
      type: "alert",
      deliveryMethod: "in-app",
      priority: "high",
      content:
        "We detected unusual login activity on your account. If this was not you, please change your password immediately.",
      isRead: false,
      isArchived: true,
    },
  ])

  const [drafts, setDrafts] = useState([])

  const getFilteredNotifications = () => {
    let filtered = notifications

    switch (activeTab) {
      case "announcements":
        filtered = filtered.filter((n) => n.type === "announcement" && !n.isArchived)
        break
      case "alerts":
        filtered = filtered.filter((n) => (n.type === "alert" || n.type === "system") && !n.isArchived)
        break
      case "scheduled":
        filtered = filtered.filter((n) => n.status === "scheduled" && !n.isArchived)
        break
      case "archived":
        filtered = filtered.filter((n) => n.isArchived)
        break
      default:
        filtered = filtered.filter((n) => !n.isArchived)
        break
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (n) =>
          n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          n.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          n.sender.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    return filtered
  }

  const getStatusColor = (status) => {
    const colors = {
      sent: "success",
      scheduled: "warning",
      draft: "default",
      failed: "error",
    }
    return colors[status] || "default"
  }

  const getPriorityTag = (priority) => {
    const priorityConfig = {
      high: { color: "red", text: "HIGH" },
      medium: { color: "orange", text: "MEDIUM" },
      low: { color: "geekblue", text: "LOW" },
    }
    const config = priorityConfig[priority] || { color: "default", text: "UNKNOWN" }
    return <Tag color={config.color}>{config.text}</Tag>
  }

  const getSenderIcon = (senderType) => {
    const icons = {
      System: <SettingOutlined />,
      Admin: <UserOutlined />,
      Marketing: <NotificationOutlined />,
      Security: <BellOutlined />,
    }
    return icons[senderType] || <UserOutlined />
  }

  const handleCreateNotification = (values) => {
    const newNotification = {
      id: Date.now(),
      title: values.title,
      description: values.description,
      content: messageContent,
      senderType: "Admin",
      sender: "Current User",
      recipients: values.recipients,
      recipientCount: values.recipients.length * 100,
      timestamp: values.scheduleType === "now" ? new Date().toISOString() : values.scheduledDate?.toISOString(),
      status: values.scheduleType === "now" ? "sent" : "scheduled",
      type: "announcement",
      deliveryMethod: values.deliveryMethod,
      priority: values.priority || "medium",
      isRead: false,
      isArchived: false,
      scheduledFor: values.scheduleType === "later" ? values.scheduledDate?.toISOString() : null,
    }

    if (values.saveAsDraft) {
      setDrafts([...drafts, { ...newNotification, status: "draft" }])
      message.success("Notification saved as draft")
    } else {
      setNotifications([newNotification, ...notifications])
      message.success("Notification sent successfully")
      setActiveMainTab("notifications")
    }

    form.resetFields()
    setMessageContent("")
  }

  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id))
    message.success("Notification deleted")
    setShowDetailModal(false)
  }

  const handleDuplicateNotification = (notification) => {
    const duplicated = {
      ...notification,
      id: Date.now(),
      title: `Copy of ${notification.title}`,
      timestamp: new Date().toISOString(),
      status: "draft",
      isRead: false,
      isArchived: false,
    }
    setDrafts([duplicated, ...drafts])
    message.success("Notification duplicated as draft")
  }

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ))
    message.success("Notification marked as read")
  }

  const handleMarkAsUnread = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isRead: false } : n
    ))
    message.success("Notification marked as unread")
  }

  const handleArchiveNotification = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isArchived: true } : n
    ))
    message.success("Notification archived")
  }

  const handleUnarchiveNotification = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, isArchived: false } : n
    ))
    message.success("Notification unarchived")
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })))
    message.success("All notifications marked as read")
  }

  const getDropdownItems = (notification) => [
    {
      key: "view",
      icon: <EyeOutlined />,
      label: "View Details",
      onClick: () => {
        setSelectedNotification(notification)
        setShowDetailModal(true)
      },
    },
    {
      key: "mark-read",
      icon: <CheckOutlined />,
      label: notification.isRead ? "Mark as Unread" : "Mark as Read",
      onClick: () => {
        if (notification.isRead) {
          handleMarkAsUnread(notification.id)
        } else {
          handleMarkAsRead(notification.id)
        }
      },
    },
    {
      key: "archive",
      icon: <ArchiveOutlined />,
      label: notification.isArchived ? "Unarchive" : "Archive",
      onClick: () => {
        if (notification.isArchived) {
          handleUnarchiveNotification(notification.id)
        } else {
          handleArchiveNotification(notification.id)
        }
      },
    },
    {
      key: "edit",
      icon: <EditOutlined />,
      label: "Edit",
      onClick: () => {
        form.setFieldsValue({
          title: notification.title,
          description: notification.description,
          recipients: notification.recipients,
          deliveryMethod: notification.deliveryMethod,
          priority: notification.priority,
        })
        setMessageContent(notification.content)
        setActiveMainTab("send")
      },
    },
    {
      key: "duplicate",
      icon: <CopyOutlined />,
      label: "Duplicate",
      onClick: () => handleDuplicateNotification(notification),
    },
    {
      key: "delete",
      icon: <DeleteOutlined />,
      label: "Delete",
      danger: true,
      onClick: () => {
        Modal.confirm({
          title: "Delete Notification",
          content: "Are you sure you want to delete this notification?",
          onOk: () => handleDeleteNotification(notification.id),
        })
      },
    },
  ]

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString()
  }

  const SidebarContent = () => (
    <div>
      <Title level={4}>Quick Actions</Title>

      <Button
        type="primary"
        size="large"
        icon={<SendOutlined />}
        onClick={() => {
          setActiveMainTab("send")
          setDrawerVisible(false)
        }}
        style={{
          width: "100%",
          height: "60px",
          fontSize: "16px",
          fontWeight: "bold",
          marginBottom: "24px",
        }}
      >
        Send Notification
      </Button>

      <Button
        type="default"
        size="large"
        icon={<CheckOutlined />}
        onClick={handleMarkAllAsRead}
        style={{
          width: "100%",
          height: "50px",
          fontSize: "14px",
          marginBottom: "24px",
        }}
      >
        Mark All as Read
      </Button>

      {drafts.length > 0 && (
        <div style={{ marginBottom: "24px" }}>
          <Title level={5}>Drafts ({drafts.length})</Title>
          <List
            size="small"
            dataSource={drafts}
            renderItem={(draft) => (
              <List.Item
                key={draft.id}
                actions={[
                  <Button
                    key={`edit-${draft.id}`}
                    type="text"
                    size="small"
                    icon={<EditOutlined />}
                    onClick={() => {
                      form.setFieldsValue({
                        title: draft.title,
                        description: draft.description,
                        recipients: draft.recipients,
                        deliveryMethod: draft.deliveryMethod,
                        priority: draft.priority,
                      })
                      setMessageContent(draft.content)
                      setActiveMainTab("send")
                      setDrawerVisible(false)
                    }}
                  />,
                ]}
              >
                <List.Item.Meta
                  title={<Text ellipsis>{draft.title}</Text>}
                  description={
                    <Text type="secondary" ellipsis>
                      {draft.description}
                    </Text>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      )}

      <div>
        <Title level={5}>Statistics</Title>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Card size="small">
            <Text strong>Total Sent: </Text>
            <Text>{notifications.filter((n) => n.status === "sent" && !n.isArchived).length}</Text>
          </Card>
          <Card size="small">
            <Text strong>Scheduled: </Text>
            <Text>{notifications.filter((n) => n.status === "scheduled" && !n.isArchived).length}</Text>
          </Card>
          <Card size="small">
            <Text strong>Unread: </Text>
            <Text>{notifications.filter((n) => !n.isRead && !n.isArchived).length}</Text>
          </Card>
          <Card size="small">
            <Text strong>Archived: </Text>
            <Text>{notifications.filter((n) => n.isArchived).length}</Text>
          </Card>
          <Card size="small">
            <Text strong>Drafts: </Text>
            <Text>{drafts.length}</Text>
          </Card>
        </Space>
      </div>
    </div>
  )

  const SendNotificationContent = () => (
    <div >
      
      <Form form={form} layout="vertical" onFinish={handleCreateNotification}>
        <Form.Item
          name="title"
          label="Notification Title"
          rules={[{ required: true, message: "Please enter a title" }]}
        >
          <Input placeholder="Enter notification title" size="large" />
        </Form.Item>

        <Form.Item
          name="description"
          label="Short Description"
          rules={[{ required: true, message: "Please enter a description" }]}
        >
          <TextArea rows={2} placeholder="Brief description of the notification" size="large" />
        </Form.Item>

        <Form.Item label="Message Content" required>
          <TextArea
            value={messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
            rows={8}
            placeholder="Enter your detailed message content here..."
            style={{ fontSize: "14px" }}
            size="large"
          />
          <div style={{ marginTop: "8px", color: "#666", fontSize: "12px" }}>
            Tip: You can use basic formatting like line breaks and paragraphs
          </div>
        </Form.Item>

        <Form.Item
          name="recipients"
          label="Recipient Selection"
          rules={[{ required: true, message: "Please select recipients" }]}
        >
          <Select mode="multiple" placeholder="Select recipients" size="large">
            <Option value="All Admins">All Admins</Option>
            <Option value="All Users">All Users</Option>
            <Option value="Students">Students</Option>
            <Option value="Instructors">Instructors</Option>
            <Option value="Premium Users">Premium Users</Option>
            <Option value="Marketing List">Marketing List</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="deliveryMethod"
          label="Delivery Method"
          rules={[{ required: true, message: "Please select delivery method" }]}
        >
          <Radio.Group size="large">
            <Radio value="in-app">In-App Only</Radio>
            <Radio value="email">Email Only</Radio>
            <Radio value="both">Both In-App & Email</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="priority" label="Priority Level" initialValue="medium">
          <Select size="large">
            <Option value="low">Low</Option>
            <Option value="medium">Medium</Option>
            <Option value="high">High</Option>
          </Select>
        </Form.Item>

        <Form.Item name="scheduleType" label="Scheduling Options" initialValue="now">
          <Radio.Group size="large">
            <Radio value="now">Send Now</Radio>
            <Radio value="later">Schedule for Later</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) => prevValues.scheduleType !== currentValues.scheduleType}
        >
          {({ getFieldValue }) =>
            getFieldValue("scheduleType") === "later" ? (
              <Form.Item
                name="scheduledDate"
                label="Scheduled Date & Time"
                rules={[{ required: true, message: "Please select date and time" }]}
              >
                <DatePicker showTime style={{ width: "100%" }} size="large" />
              </Form.Item>
            ) : null
          }
        </Form.Item>

        <Form.Item name="attachments" label="Attachments">
          <Upload.Dragger multiple beforeUpload={() => false} listType="text">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag files to upload</p>
            <p className="ant-upload-hint">Support for images, documents, and other files</p>
          </Upload.Dragger>
        </Form.Item>

        <Form.Item>
          <Space wrap size="large">
            <Button type="primary" htmlType="submit" icon={<SendOutlined />} size="large">
              Send Notification
            </Button>
            <Button
              icon={<SaveOutlined />}
              size="large"
              onClick={() => {
                form.setFieldsValue({ saveAsDraft: true })
                form.submit()
              }}
            >
              Save as Draft
            </Button>
            <Button size="large" onClick={() => setActiveMainTab("notifications")}>
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  )

  const NotificationsContent = () => (
    <div>
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: "24px",
        flexWrap: "wrap",
        gap: "12px"
      }}>
        <Title level={2} style={{ margin: 0, fontSize: 'clamp(20px, 5vw, 32px)' }}>
          Notifications
        </Title>
        <Space wrap>
          <Button 
            type="default" 
            icon={<CheckOutlined />} 
            onClick={handleMarkAllAsRead}
            style={{ minWidth: '100px' }}
          >
            Mark All Read
          </Button>
          <Button 
            type="primary" 
            icon={<MenuOutlined />} 
            onClick={() => setDrawerVisible(true)}
            style={{ minWidth: '100px' }}
          >
            Manage
          </Button>
        </Space>
      </div>

      <div style={{ marginBottom: "16px" }}>
        <Input
          placeholder="Search notifications..." 
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '100%', maxWidth: '400px' }}
        />
      </div>

      <Tabs 
        activeKey={activeTab} 
        onChange={setActiveTab} 
        style={{ marginBottom: "24px" }}
        size="small"
      >
        <Tabs.TabPane tab="All" key="all" />
        <Tabs.TabPane tab="Announcements" key="announcements" />
        <Tabs.TabPane tab="Alerts" key="alerts" />
        <Tabs.TabPane tab="Scheduled" key="scheduled" />
        <Tabs.TabPane tab="Archived" key="archived" />
      </Tabs>

      <List
        itemLayout="vertical"
        dataSource={getFilteredNotifications()}
        renderItem={(notification) => (
          <List.Item
            key={notification.id}
            style={{
              background: notification.isArchived ? '#f9f9f9' : (notification.isRead ? "#fafafa" : "#fff"),
              border: notification.isArchived ? '1px solid #d9d9d9' : 
                      (notification.isRead ? "1px solid #f0f0f0" : "1px solid #1890ff"),
              borderRadius: "8px",
              marginBottom: "12px",
              padding: "16px",
              position: "relative",
              opacity: notification.isArchived ? 0.8 : 1,
            }}
          >
            {notification.isArchived && (
              <div style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                background: '#fa8c16',
                color: 'white',
                padding: '2px 8px',
                borderRadius: '4px',
                fontSize: '10px',
                fontWeight: 'bold'
              }}>
                ARCHIVED
              </div>
            )}
            
            <div style={{ 
              position: "absolute", 
              top: notification.isArchived ? "32px" : "16px", 
              right: "16px",
              zIndex: 1
            }}>
              <Dropdown 
                menu={{ items: getDropdownItems(notification) }} 
                trigger={["click"]}
                placement="bottomRight"
              >
                <Button type="text" icon={<MoreOutlined />} />
              </Dropdown>
            </div>
            
            <List.Item.Meta
              avatar={
                <Badge dot={!notification.isRead && !notification.isArchived}>
                  <Avatar icon={getSenderIcon(notification.senderType)} />
                </Badge>
              }
              title={
                <div style={{ paddingRight: '40px' }}>
                  <Space wrap style={{ marginBottom: '8px' }}>
                    <Text strong style={{ fontSize: 'clamp(14px, 3vw, 16px)' }}>
                      {notification.title}
                    </Text>
                    <Tag color={getStatusColor(notification.status)} style={{ fontSize: '11px' }}>
                      {notification.status.toUpperCase()}
                    </Tag>
                    {getPriorityTag(notification.priority)}
                  </Space>
                </div>
              }
              description={
                <Space direction="vertical" size="small" style={{ width: '100%', paddingRight: '40px' }}>
                  <Text style={{ fontSize: 'clamp(12px, 2.5vw, 14px)' }}>{notification.description}</Text>
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: '8px',
                    fontSize: 'clamp(10px, 2vw, 12px)'
                  }}>
                    <Text type="secondary">From: {notification.sender}</Text>
                    <Divider type="vertical" style={{ margin: '0 4px' }} />
                    <Text type="secondary">
                      <TeamOutlined /> {notification.recipientCount} recipients
                    </Text>
                    <Divider type="vertical" style={{ margin: '0 4px' }} />
                    <Text type="secondary">{formatTimestamp(notification.timestamp)}</Text>
                    {notification.scheduledFor && (
                      <>
                        <Divider type="vertical" style={{ margin: '0 4px' }} />
                        <Text type="secondary">
                          <ScheduleOutlined /> Scheduled: {formatTimestamp(notification.scheduledFor)}
                        </Text>
                      </>
                    )}
                  </div>
                </Space>
              }
            />
          </List.Item>
        )}
      />
    </div>
  )

  return (
    <Layout className="min-h-screen" style={{ padding: '3px', background: 'transparent' }}>
      <Content style={{ padding: '0 12px', background: 'transparent' }}>
        <div style={{ maxWidth: '100%', background: 'transparent' }}>
          <Tabs 
            activeKey={activeMainTab} 
            onChange={setActiveMainTab}
            style={{ marginBottom: "24px" }}
            tabBarStyle={{ marginBottom: '20px' }}
            items={[
              {
                key: "notifications",
                label: "Notifications",
                children: <NotificationsContent />
              },
              {
                key: "send",
                label: "Send Notification",
                children: <SendNotificationContent />
              }
            ]}
          />
        </div>
      </Content>

      <Drawer
        title="Manage Notifications"
        placement="right"
        width={350}
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        styles={{ body: { padding: '24px', background: 'transparent' } }}
      >
        <SidebarContent />
      </Drawer>

      <Modal
        title="Notification Details"
        open={showDetailModal}
        onCancel={() => setShowDetailModal(false)}
        width="90%"
        style={{ maxWidth: '700px' }}
        footer={[
          <Button
            key="mark-read"
            icon={<CheckOutlined />}
            onClick={() => {
              if (selectedNotification) {
                if (selectedNotification.isRead) {
                  handleMarkAsUnread(selectedNotification.id)
                } else {
                  handleMarkAsRead(selectedNotification.id)
                }
                setShowDetailModal(false)
              }
            }}
          >
            {selectedNotification?.isRead ? "Mark as Unread" : "Mark as Read"}
          </Button>,
          <Button
            key="archive"
            icon={<ArchiveOutlined />}
            onClick={() => {
              if (selectedNotification) {
                if (selectedNotification.isArchived) {
                  handleUnarchiveNotification(selectedNotification.id)
                } else {
                  handleArchiveNotification(selectedNotification.id)
                }
                setShowDetailModal(false)
              }
            }}
          >
            {selectedNotification?.isArchived ? "Unarchive" : "Archive"}
          </Button>,
          <Button
            key="edit"
            icon={<EditOutlined />}
            onClick={() => {
              if (selectedNotification) {
                form.setFieldsValue({
                  title: selectedNotification.title,
                  description: selectedNotification.description,
                  recipients: selectedNotification.recipients,
                  deliveryMethod: selectedNotification.deliveryMethod,
                  priority: selectedNotification.priority,
                })
                setMessageContent(selectedNotification.content)
                setShowDetailModal(false)
                setActiveMainTab("send")
              }
            }}
          >
            Edit
          </Button>,
          <Button
            key="duplicate"
            icon={<CopyOutlined />}
            onClick={() => {
              if (selectedNotification) {
                handleDuplicateNotification(selectedNotification)
                setShowDetailModal(false)
              }
            }}
          >
            Duplicate
          </Button>,
          <Button
            key="delete"
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              if (selectedNotification) {
                Modal.confirm({
                  title: "Delete Notification",
                  content: "Are you sure you want to delete this notification?",
                  onOk: () => handleDeleteNotification(selectedNotification.id),
                })
              }
            }}
          >
            Delete
          </Button>,
          <Button key="close" onClick={() => setShowDetailModal(false)}>
            Close
          </Button>,
        ]}
      >
        {selectedNotification && (
          <div>
            <Title level={4} style={{ fontSize: 'clamp(16px, 4vw, 20px)' }}>
              {selectedNotification.title}
            </Title>

            <Card style={{ marginBottom: "16px" }}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <div>
                  <Text strong>Sender: </Text>
                  <Text>
                    {selectedNotification.sender} ({selectedNotification.senderType})
                  </Text>
                </div>
                <div>
                  <Text strong>Recipients: </Text>
                  <Text>
                    {selectedNotification.recipients.join(", ")} ({selectedNotification.recipientCount} total)
                  </Text>
                </div>
                <div>
                  <Text strong>Sent: </Text>
                  <Text>{formatTimestamp(selectedNotification.timestamp)}</Text>
                </div>
                <div>
                  <Text strong>Status: </Text>
                  <Tag color={getStatusColor(selectedNotification.status)}>
                    {selectedNotification.status.toUpperCase()}
                  </Tag>
                </div>
                <div>
                  <Text strong>Priority: </Text>
                  {getPriorityTag(selectedNotification.priority)}
                </div>
                <div>
                  <Text strong>Delivery Method: </Text>
                  <Text>{selectedNotification.deliveryMethod}</Text>
                </div>
                <div>
                  <Text strong>Read Status: </Text>
                  <Tag color={selectedNotification.isRead ? "green" : "orange"}>
                    {selectedNotification.isRead ? "READ" : "UNREAD"}
                  </Tag>
                </div>
                <div>
                  <Text strong>Archive Status: </Text>
                  <Tag color={selectedNotification.isArchived ? "orange" : "blue"}>
                    {selectedNotification.isArchived ? "ARCHIVED" : "ACTIVE"}
                  </Tag>
                </div>
                {selectedNotification.scheduledFor && (
                  <div>
                    <Text strong>Scheduled For: </Text>
                    <Text>{formatTimestamp(selectedNotification.scheduledFor)}</Text>
                  </div>
                )}
              </Space>
            </Card>

            <Title level={5} style={{ fontSize: 'clamp(14px, 3vw, 16px)' }}>Message Content</Title>
            <Card>
              <Paragraph style={{ whiteSpace: "pre-wrap", fontSize: 'clamp(12px, 2.5vw, 14px)' }}>
                {selectedNotification.content}
              </Paragraph>
            </Card>
          </div>
        )}
      </Modal>
    </Layout>
  )
}

export default NotificationPage