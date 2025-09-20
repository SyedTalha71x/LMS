"use client"

import { useState, useMemo } from "react"
import {
  Card,
  Row,
  Col,
  Input,
  Select,
  Rate,
  Drawer,
  Progress,
  Tag,
  Button,
  List,
  Typography,
  Space,
} from "antd"
import {
  SearchOutlined,
  UserOutlined,
  ClockCircleOutlined,
  BookOutlined,
  LinkOutlined,
  FileTextOutlined,
  FilterOutlined,
} from "@ant-design/icons"

const { Title, Text, Paragraph } = Typography
const { Option } = Select

const CoursesPage = () => {
  const [courses] = useState([
    {
      id: 1,
      title: "Fundamental I",
      rating: 4.5,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      category: ["Beginner", "Chemistry", "Inorganic"],
      duration: "20 hours",
      courseCode: "CHEM101",
      price: "Free",
      link: "https://example.com",
      progress: 40,
      students: 99,
      level: "Beginner",
      subject: "Chemistry",
    },
    {
      id: 2,
      title: "Advanced Chemistry",
      rating: 4.8,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      category: ["Advanced", "Chemistry", "Organic"],
      duration: "30 hours",
      courseCode: "CHEM201",
      price: "Free",
      link: "https://example.com",
      progress: 65,
      students: 156,
      level: "Advanced",
      subject: "Chemistry",
    },
    {
      id: 3,
      title: "Biology Basics",
      rating: 4.2,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      category: ["Beginner", "Biology"],
      duration: "15 hours",
      courseCode: "BIO101",
      price: "Free",
      link: "https://example.com",
      progress: 20,
      students: 78,
      level: "Beginner",
      subject: "Biology",
    },
    {
      id: 4,
      title: "Physics I",
      rating: 4.7,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      category: ["Intermediate", "Physics"],
      duration: "25 hours",
      courseCode: "PHY101",
      price: "Free",
      link: "https://example.com",
      progress: 50,
      students: 134,
      level: "Intermediate",
      subject: "Physics",
    },
    {
      id: 5,
      title: "Mathematics",
      rating: 4.6,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      category: ["Beginner", "Math"],
      duration: "22 hours",
      courseCode: "MATH101",
      price: "Free",
      link: "https://example.com",
      progress: 30,
      students: 89,
      level: "Beginner",
      subject: "Mathematics",
    },
    {
      id: 6,
      title: "Computer Science",
      rating: 4.9,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      category: ["Advanced", "CS"],
      duration: "40 hours",
      courseCode: "CS101",
      price: "Free",
      link: "https://example.com",
      progress: 75,
      students: 203,
      level: "Advanced",
      subject: "Computer Science",
    },
    {
      id: 7,
      title: "Art History",
      rating: 4.3,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      category: ["Beginner", "Art"],
      duration: "18 hours",
      courseCode: "ART101",
      price: "Free",
      link: "https://example.com",
      progress: 15,
      students: 67,
      level: "Beginner",
      subject: "Art",
    },
    {
      id: 8,
      title: "Economics",
      rating: 4.4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      category: ["Intermediate", "Economics"],
      duration: "28 hours",
      courseCode: "ECON101",
      price: "Free",
      link: "https://example.com",
      progress: 60,
      students: 112,
      level: "Intermediate",
      subject: "Economics",
    },
  ])

  // Filter states
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLevel, setSelectedLevel] = useState("")
  const [selectedSubject, setSelectedSubject] = useState("")
  const [selectedRating, setSelectedRating] = useState("")

  // Drawer state
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)

  // Filter courses based on search and filters
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesLevel = !selectedLevel || course.level === selectedLevel
      const matchesSubject = !selectedSubject || course.subject === selectedSubject
      const matchesRating = !selectedRating || course.rating >= Number.parseFloat(selectedRating)

      return matchesSearch && matchesLevel && matchesSubject && matchesRating
    })
  }, [courses, searchTerm, selectedLevel, selectedSubject, selectedRating])

  // Get unique values for filter options
  const levels = [...new Set(courses.map((course) => course.level))]
  const subjects = [...new Set(courses.map((course) => course.subject))]

  const openCourseDrawer = (course) => {
    setSelectedCourse(course)
    setDrawerVisible(true)
  }

  const closeCourseDrawer = () => {
    setDrawerVisible(false)
    setSelectedCourse(null)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedLevel("")
    setSelectedSubject("")
    setSelectedRating("")
  }

  return (
    <div className="min-h-screen p-3">
      <div>
        <div style={{ marginBottom: "24px" }}>
          <Row justify="space-between" align="middle" style={{ marginBottom: "16px" }}>
            <Col>
              <Title level={2} style={{ margin: 0 }}>
                Courses
              </Title>
            </Col>
          </Row>

          <Card style={{ marginBottom: "24px" }}>
            <Row gutter={[16, 16]} align="middle">
              <Col xs={24} sm={12} md={6}>
                <Input
                  placeholder="Search courses..."
                  prefix={<SearchOutlined />}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  allowClear
                />
              </Col>
              <Col xs={24} sm={12} md={4}>
                <Select
                  placeholder="Level"
                  style={{ width: "100%" }}
                  value={selectedLevel}
                  onChange={setSelectedLevel}
                  allowClear
                >
                  {levels.map((level) => (
                    <Option key={level} value={level}>
                      {level}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col xs={24} sm={12} md={4}>
                <Select
                  placeholder="Subject"
                  style={{ width: "100%" }}
                  value={selectedSubject}
                  onChange={setSelectedSubject}
                  allowClear
                >
                  {subjects.map((subject) => (
                    <Option key={subject} value={subject}>
                      {subject}
                    </Option>
                  ))}
                </Select>
              </Col>
              <Col xs={24} sm={12} md={4}>
                <Select
                  placeholder="Min Rating"
                  style={{ width: "100%" }}
                  value={selectedRating}
                  onChange={setSelectedRating}
                  allowClear
                >
                  <Option value="4.5">4.5+ Stars</Option>
                  <Option value="4.0">4.0+ Stars</Option>
                  <Option value="3.5">3.5+ Stars</Option>
                  <Option value="3.0">3.0+ Stars</Option>
                </Select>
              </Col>
              <Col xs={24} sm={12} md={6}>
                <Space>
                  <Button icon={<FilterOutlined />} onClick={clearFilters}>
                    Clear Filters
                  </Button>
                  <Text type="secondary">
                    {filteredCourses.length} of {courses.length} courses
                  </Text>
                </Space>
              </Col>
            </Row>
          </Card>
        </div>

        {/* Course Cards */}
        <Row gutter={[16, 16]}>
          {filteredCourses.map((course) => (
            <Col xs={24} sm={12} lg={8} xl={8} key={course.id}>
              <Card
                hoverable
                cover={
                  <div
                    style={{
                      height: "200px",
                      background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "18px",
                      fontWeight: "bold",
                      textAlign: "center",
                      padding: "20px",
                    }}
                  >
                    {course.title}
                  </div>
                }
                actions={[
                  <Button key="viewDetails" type="primary" onClick={() => openCourseDrawer(course)}>
                    View Details
                  </Button>,
                ]}
                style={{ height: "100%" }}
              >
                <Card.Meta
                  title={
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Text strong>{course.title}</Text>
                        <Rate disabled defaultValue={course.rating} style={{ fontSize: "12px" }} />
                      </div>
                      <Text type="secondary" style={{ fontSize: "12px" }}>
                        {course.courseCode}
                      </Text>
                    </div>
                  }
                  description={
                    <div>
                      <Paragraph ellipsis={{ rows: 2 }} style={{ marginBottom: "8px" }}>
                        {course.description}
                      </Paragraph>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginTop: "8px",
                        }}
                      >
                        <Space>
                          <UserOutlined />
                          <Text>{course.students}</Text>
                        </Space>
                        <Space>
                          <ClockCircleOutlined />
                          <Text>{course.duration}</Text>
                        </Space>
                      </div>
                      <div style={{ marginTop: "8px" }}>
                        {course.category.slice(0, 2).map((cat) => (
                          <Tag key={cat} size="small">
                            {cat}
                          </Tag>
                        ))}
                      </div>
                    </div>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>

        {filteredCourses.length === 0 && (
          <Card style={{ textAlign: "center", padding: "48px" }}>
            <Title level={4}>No courses found</Title>
            <Text type="secondary">Try adjusting your filters or search terms</Text>
          </Card>
        )}
      </div>

      {/* Course Details Drawer */}
      <Drawer
        title={
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              {selectedCourse?.title.substring(0, 2)}
            </div>
            <Title level={4} style={{ margin: 0 }}>
              {selectedCourse?.title}
            </Title>
          </div>
        }
        placement="right"
        width={600}
        onClose={closeCourseDrawer}
        open={drawerVisible}
      >
        {selectedCourse && (
          <div>
            {/* Course Image */}
            <div
              style={{
                height: "200px",
                background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "24px",
              }}
            >
              {selectedCourse.title}
            </div>

            {/* Description */}
            <div style={{ marginBottom: "24px" }}>
              <Title level={5}>Description</Title>
              <Paragraph>{selectedCourse.description}</Paragraph>
            </div>

            {/* Categories */}
            <div style={{ marginBottom: "24px" }}>
              <Title level={5}>Categories</Title>
              <Space wrap>
                {selectedCourse.category.map((cat) => (
                  <Tag key={cat} color="blue">
                    {cat}
                  </Tag>
                ))}
              </Space>
            </div>

            {/* Course Details */}
            <div style={{ marginBottom: "24px" }}>
              <Title level={5}>Course Details</Title>
              <Row gutter={[16, 8]}>
                <Col span={12}>
                  <Text strong>Duration:</Text>
                </Col>
                <Col span={12}>
                  <Text>{selectedCourse.duration}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Course Code:</Text>
                </Col>
                <Col span={12}>
                  <Text>{selectedCourse.courseCode}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Price:</Text>
                </Col>
                <Col span={12}>
                  <Text>{selectedCourse.price}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Students:</Text>
                </Col>
                <Col span={12}>
                  <Text>{selectedCourse.students}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Rating:</Text>
                </Col>
                <Col span={12}>
                  <Rate disabled defaultValue={selectedCourse.rating} style={{ fontSize: "14px" }} />
                </Col>
              </Row>
            </div>

            {/* Progress */}
            <div style={{ marginBottom: "24px" }}>
              <Title level={5}>Progress</Title>
              <Progress percent={selectedCourse.progress} status="active" strokeColor="#52c41a" />
            </div>

            {/* Course Structure */}
            <div style={{ marginBottom: "24px" }}>
              <Title level={5}>Course Structure</Title>
              <List
                dataSource={[
                  { title: "Module 1: Introduction", lessons: "3 lessons • 45 minutes", status: "completed" },
                  { title: "Module 2: Core Concepts", lessons: "5 lessons • 1.5 hours", status: "progress" },
                  { title: "Module 3: Advanced Topics", lessons: "4 lessons • 2 hours", status: "locked" },
                  { title: "Module 4: Final Project", lessons: "2 lessons • 3 hours", status: "locked" },
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta title={item.title} description={item.lessons} />
                    <Tag
                      color={item.status === "completed" ? "green" : item.status === "progress" ? "orange" : "default"}
                    >
                      {item.status === "completed"
                        ? "Completed"
                        : item.status === "progress"
                          ? "In Progress"
                          : "Locked"}
                    </Tag>
                  </List.Item>
                )}
              />
            </div>

            {/* Actions */}
            <div style={{ marginBottom: "24px" }}>
              <Title level={5}>Actions</Title>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Button type="primary" icon={<FileTextOutlined />} block>
                  View Certificate
                </Button>
                <Button icon={<BookOutlined />} block>
                  View Documentation
                </Button>
                {/* <Button icon={<LinkOutlined />} block>
                  Course Link
                </Button> */}
                {/* <Button danger block>
                  Unsubscribe
                </Button> */}
              </Space>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  )
}

export default CoursesPage