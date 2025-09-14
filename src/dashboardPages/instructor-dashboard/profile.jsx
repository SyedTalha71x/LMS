"use client"

import { useState } from "react"
import {
  Card,
  Tabs,
  Avatar,
  Tag,
  Row,
  Col,
  Statistic,
  Timeline,
  Table,
  Progress,
  Space,
  Typography,
  List,
  Rate,
  Empty,
} from "antd"
import {
  UserOutlined,
  BookOutlined,
  ClockCircleOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  TeamOutlined,
  TrophyOutlined,
  CalendarOutlined,
  FileTextOutlined,
} from "@ant-design/icons"

const { TabPane } = Tabs
const { Title, Text, Paragraph } = Typography

// Mock data for the logged-in instructor
const instructorData = {
  id: 1,
  name: "Dr. Sarah Johnson",
  email: "sarah.johnson@pharmacy.edu",
  phone: "+1 (555) 123-4567",
  employeeId: "INS001",
  address: "123 Medical Center Dr, Healthcare City, HC 12345",
  department: "Clinical Pharmacy",
  designation: "Department Head",
  status: "Active",
  enrollmentStatus: "Teaching",
  lastLogin: "2024-01-15T10:30:00Z",
  createdDate: "2023-06-15T00:00:00Z",
  bio: "Dr. Sarah Johnson is a renowned clinical pharmacist with over 15 years of experience in pharmaceutical education and patient care. She specializes in clinical pharmacy practice and has published numerous research papers in the field.",
  qualifications: ["PharmD", "PhD in Clinical Pharmacy", "Board Certified Pharmacotherapy Specialist"],
  specialty: "Clinical Pharmacy",
  experience: "15+ years",
  rating: 4.8,
  totalStudents: 145,
  activeCourses: 3,
  completedCourses: 12,
  courses: [
    {
      id: 1,
      name: "Advanced Clinical Pharmacy",
      students: 25,
      status: "Active",
      progress: 65,
      startDate: "2024-01-10",
      endDate: "2024-05-15",
      schedule: "Mon, Wed, Fri - 10:00 AM",
    },
    {
      id: 2,
      name: "Pharmacotherapy",
      students: 30,
      status: "Active",
      progress: 45,
      startDate: "2024-01-15",
      endDate: "2024-06-20",
      schedule: "Tue, Thu - 2:00 PM",
    },
    {
      id: 3,
      name: "Patient Care Management",
      students: 20,
      status: "Active",
      progress: 80,
      startDate: "2023-12-01",
      endDate: "2024-04-30",
      schedule: "Wed - 9:00 AM",
    },
  ],
  activityLog: [
    {
      date: "2024-01-15",
      action: "Logged in",
      details: "Accessed dashboard",
      type: "login",
      time: "10:30 AM",
    },
    {
      date: "2024-01-14",
      action: "Course Updated",
      details: "Modified Advanced Clinical Pharmacy syllabus",
      type: "course",
      time: "3:45 PM",
    },
    {
      date: "2024-01-13",
      action: "Student Graded",
      details: "Graded 15 assignments for Pharmacotherapy course",
      type: "grading",
      time: "11:20 AM",
    },
    {
      date: "2024-01-12",
      action: "Meeting Attended",
      details: "Department faculty meeting",
      type: "meeting",
      time: "2:00 PM",
    },
    {
      date: "2024-01-11",
      action: "Resource Added",
      details: "Uploaded new study materials for Patient Care Management",
      type: "resource",
      time: "4:15 PM",
    },
  ],
  achievements: [
    {
      title: "Excellence in Teaching Award",
      year: "2023",
      description: "Outstanding performance in student education",
    },
    { title: "Research Publication", year: "2023", description: "Published 3 papers in peer-reviewed journals" },
    { title: "Student Mentor of the Year", year: "2022", description: "Recognized for exceptional student mentorship" },
  ],
}

const InstructorProfile = () => {
  const [activeTab, setActiveTab] = useState("overview")

  const getActivityIcon = (type) => {
    switch (type) {
      case "login":
        return <UserOutlined className="text-blue-500" />
      case "course":
        return <BookOutlined className="text-green-500" />
      case "grading":
        return <FileTextOutlined className="text-orange-500" />
      case "meeting":
        return <TeamOutlined className="text-purple-500" />
      case "resource":
        return <TrophyOutlined className="text-red-500" />
      default:
        return <ClockCircleOutlined className="text-gray-500" />
    }
  }

  const courseColumns = [
    {
      title: "Course Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Students",
      dataIndex: "students",
      key: "students",
      render: (count) => (
        <Space>
          <TeamOutlined />
          {count}
        </Space>
      ),
    },
    {
      title: "Progress",
      dataIndex: "progress",
      key: "progress",
      render: (progress) => (
        <Progress percent={progress} size="small" status={progress === 100 ? "success" : "active"} />
      ),
    },
    {
      title: "Schedule",
      dataIndex: "schedule",
      key: "schedule",
      render: (schedule) => (
        <Space>
          <CalendarOutlined />
          <Text type="secondary">{schedule}</Text>
        </Space>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={status === "Active" ? "green" : "orange"}>{status}</Tag>,
    },
  ]

  return (
    <div className="min-h-screen p-3">
      <div className="">
        <Card className="mb-6">
          <Row gutter={[24, 24]} align="middle">
            <Col xs={24} sm={24} md={8} lg={6} className="text-center md:text-left">
              <Avatar
                size={120}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-2xl font-bold mb-4"
              >
                {instructorData.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </Avatar>
              <div className="mt-4">
                <Rate disabled defaultValue={instructorData.rating} className="text-sm" />
                <Text className="block text-gray-500 mt-1">{instructorData.rating}/5.0 Rating</Text>
              </div>
            </Col>

            <Col xs={24} sm={24} md={16} lg={18}>
              <div className="text-center md:text-left">
                <Title level={2} className="mb-2">
                  {instructorData.name}
                </Title>
                <Text className="text-lg text-gray-600 block mb-3">{instructorData.designation}</Text>
                <Space wrap className="mb-4">
                  <Tag color="blue" className="px-3 py-1">
                    {instructorData.department}
                  </Tag>
                  <Tag color="green" className="px-3 py-1">
                    {instructorData.status}
                  </Tag>
                  <Tag color="purple" className="px-3 py-1">
                    {instructorData.specialty}
                  </Tag>
                </Space>

                <Row gutter={[16, 16]} className="mt-4">
                  <Col xs={12} sm={6}>
                    <Statistic
                      title="Total Students"
                      value={instructorData.totalStudents}
                      prefix={<TeamOutlined />}
                      valueStyle={{ color: "#1890ff" }}
                    />
                  </Col>
                  <Col xs={12} sm={6}>
                    <Statistic
                      title="Active Courses"
                      value={instructorData.activeCourses}
                      prefix={<BookOutlined />}
                      valueStyle={{ color: "#52c41a" }}
                    />
                  </Col>
                  <Col xs={12} sm={6}>
                    <Statistic
                      title="Experience"
                      value={instructorData.experience}
                      prefix={<TrophyOutlined />}
                      valueStyle={{ color: "#fa8c16" }}
                    />
                  </Col>
                  <Col xs={12} sm={6}>
                    <Statistic
                      title="Completed Courses"
                      value={instructorData.completedCourses}
                      prefix={<FileTextOutlined />}
                      valueStyle={{ color: "#722ed1" }}
                    />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Card>


<div className="mt-5">


        <Card className="">
          <Tabs activeKey={activeTab} onChange={setActiveTab} size="large" className="instructor-profile-tabs">
            <TabPane
              tab={
                <span>
                  Overview
                </span>
              }
              key="overview"
            >
              <Row gutter={[24, 24]}>
                <Col xs={24} lg={12}>
                  <Card title="Personal Information" className="h-full">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <MailOutlined className="text-blue-500" />
                        <div>
                          <Text type="secondary" className="block text-sm">
                            Email
                          </Text>
                          <Text copyable>{instructorData.email}</Text>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <PhoneOutlined className="text-green-500" />
                        <div>
                          <Text type="secondary" className="block text-sm">
                            Phone
                          </Text>
                          <Text copyable>{instructorData.phone}</Text>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <HomeOutlined className="text-orange-500" />
                        <div>
                          <Text type="secondary" className="block text-sm">
                            Address
                          </Text>
                          <Text>{instructorData.address}</Text>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <UserOutlined className="text-purple-500" />
                        <div>
                          <Text type="secondary" className="block text-sm">
                            Employee ID
                          </Text>
                          <Text>{instructorData.employeeId}</Text>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Col>

                <Col xs={24} lg={12}>
                  <Card title="Professional Details" className="h-full">
                    <div className="space-y-4">
                      <div>
                        <Text type="secondary" className="block text-sm mb-1">
                          Bio
                        </Text>
                        <Paragraph ellipsis={{ rows: 4, expandable: true }}>{instructorData.bio}</Paragraph>
                      </div>

                      <div>
                        <Text type="secondary" className="block text-sm mb-2">
                          Qualifications
                        </Text>
                        <Space wrap>
                          {instructorData.qualifications.map((qual, index) => (
                            <Tag key={index} color="blue" className="mb-1">
                              {qual}
                            </Tag>
                          ))}
                        </Space>
                      </div>

                      <div>
                        <Text type="secondary" className="block text-sm mb-1">
                          Last Login
                        </Text>
                        <Text>{new Date(instructorData.lastLogin).toLocaleString()}</Text>
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>

              {/* Achievements Section */}
              <Card title="Recent Achievements" className="mt-6">
                <List
                  dataSource={instructorData.achievements}
                  renderItem={(achievement) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar icon={<TrophyOutlined />} className="bg-yellow-500" />}
                        title={
                          <Text strong>
                            {achievement.title} ({achievement.year})
                          </Text>
                        }
                        description={achievement.description}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </TabPane>

            <TabPane
              tab={
                <span>
                  My Courses
                </span>
              }
              key="courses"
            >
              <div className="mb-6">
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={8}>
                    <Card className="text-center">
                      <Statistic
                        title="Active Courses"
                        value={instructorData.activeCourses}
                        valueStyle={{ color: "#52c41a" }}
                      />
                    </Card>
                  </Col>
                  <Col xs={24} sm={8}>
                    <Card className="text-center">
                      <Statistic
                        title="Total Students"
                        value={instructorData.totalStudents}
                        valueStyle={{ color: "#1890ff" }}
                      />
                    </Card>
                  </Col>
                  <Col xs={24} sm={8}>
                    <Card className="text-center">
                      <Statistic title="Avg. Progress" value={63} suffix="%" valueStyle={{ color: "#fa8c16" }} />
                    </Card>
                  </Col>
                </Row>
              </div>

              <Card title="Course Details">
                <div className="overflow-x-auto">
                  <Table
                    dataSource={instructorData.courses}
                    columns={courseColumns}
                    rowKey="id"
                    pagination={false}
                    className="responsive-table"
                  />
                </div>
              </Card>
            </TabPane>

            <TabPane
              tab={
                <span>
                  Activity Log
                </span>
              }
              key="activity"
            >
              <Card title="Recent Activities">
                {instructorData.activityLog.length > 0 ? (
                  <Timeline mode="left" className="mt-4">
                    {instructorData.activityLog.map((activity, index) => (
                      <Timeline.Item key={index} dot={getActivityIcon(activity.type)}>
                        <div className="pb-4">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                            <Text strong className="text-base">
                              {activity.action}
                            </Text>
                            <Space className="text-sm text-gray-500">
                              <CalendarOutlined />
                              {activity.date}
                              <ClockCircleOutlined />
                              {activity.time}
                            </Space>
                          </div>
                          <Text type="secondary">{activity.details}</Text>
                        </div>
                      </Timeline.Item>
                    ))}
                  </Timeline>
                ) : (
                  <Empty description="No recent activities" />
                )}
              </Card>
            </TabPane>
          </Tabs>
        </Card>
        </div>
      </div>
    </div>
  )
}

export default InstructorProfile
