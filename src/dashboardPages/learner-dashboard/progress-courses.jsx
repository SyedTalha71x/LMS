/* eslint-disable no-unused-vars */
"use client"

/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useMemo } from "react"
import {
  Card,
  Progress,
  Button,
  Select,
  Input,
  Badge,
  Drawer,
  Row,
  Col,
  List,
  Avatar,
  Tag,
  Empty,
  Space,
  Divider,
  Typography,
  Descriptions,
  Tabs,
} from "antd"
import {
  AppstoreOutlined,
  UnorderedListOutlined,
  SearchOutlined,
  PlayCircleOutlined,
  BookOutlined,
  ClockCircleOutlined,
  UserOutlined,
  EnvironmentOutlined,
  FileTextOutlined,
  FilterOutlined,
} from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { courses } from "../../utils/courses"

const { Option } = Select
const { Search } = Input
const { Title, Text, Paragraph } = Typography
const { TabPane } = Tabs

const CoursesProgress = () => {
  const navigate = useNavigate(); // Use the useNavigate hook
  const [viewMode, setViewMode] = useState("grid") // 'grid' or 'list'
  const [sortBy, setSortBy] = useState("name")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterType, setFilterType] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [drawerVisible, setDrawerVisible] = useState(false)


  const handleCourseClick = (course) => {
    // navigate(`/learner-dashboard/course-details/${course.id}`);
  }


  const categories = [...new Set(courses.map((course) => course.category))]

  const filteredAndSortedCourses = useMemo(() => {
    const filtered = courses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = filterStatus === "all" || course.status === filterStatus
      const matchesType = filterType === "all" || course.type === filterType
      const matchesCategory = filterCategory === "all" || course.category === filterCategory

      return matchesSearch && matchesStatus && matchesType && matchesCategory
    })

    // Sort courses
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.title.localeCompare(b.title)
        case "lastAccessed":
          if (!a.lastAccessed && !b.lastAccessed) return 0
          if (!a.lastAccessed) return 1
          if (!b.lastAccessed) return -1
          return new Date(b.lastAccessed) - new Date(a.lastAccessed)
        case "dueDate":
          return new Date(a.dueDate) - new Date(b.dueDate)
        case "progress":
          return b.progress - a.progress
        case "startDate":
          return new Date(b.startDate) - new Date(a.startDate)
        default:
          return 0
      }
    })

    return filtered
  }, [courses, searchTerm, filterStatus, filterType, filterCategory, sortBy])

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "success"
      case "in-progress":
        return "processing"
      case "not-started":
        return "default"
      default:
        return "default"
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "completed":
        return "Completed"
      case "in-progress":
        return "In Progress"
      case "not-started":
        return "Not Started"
      default:
        return "Unknown"
    }
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "mandatory":
        return "red"
      case "optional":
        return "blue"
      case "elective":
        return "green"
      default:
        return "default"
    }
  }

  const openDrawer = (course) => {
    setSelectedCourse(course)
    setDrawerVisible(true)
  }

  const closeDrawer = () => {
    setSelectedCourse(null)
    setDrawerVisible(false)
  }

  const getContinueButtonText = (course) => {
    if (course.status === "completed") return "Review"
    if (course.status === "not-started") return "Start Course"
    return "Continue"
  }

  const getContinueButtonIcon = (course) => {
    if (course.status === "completed") return <BookOutlined />
    return <PlayCircleOutlined />
  }

  const DefaultCourseImage = ({ title, style }) => (
    <div
      style={{
        ...style,
        background: "linear-gradient(135deg, #1890ff 0%, #096dd9 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: "18px",
        fontWeight: "bold",
        textAlign: "center",
        padding: "20px",
        lineHeight: "1.2",
        textShadow: "0 2px 4px rgba(0,0,0,0.3)",
      }}
    >
      {title}
    </div>
  )

  const CourseCard = ({ course }) => (
    <Card
      hoverable
      cover={
        <div style={{ height: 220, overflow: "hidden", position: "relative" }}>
          {course.image ? (
            <img
              alt={course.title}
              src={course.image || "/placeholder.svg"}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.3s ease",
              }}
              onError={(e) => {
                e.target.style.display = "none"
                e.target.nextSibling.style.display = "flex"
              }}
            />
          ) : null}
          <DefaultCourseImage
            title={course.title}
            style={{
              width: "100%",
              height: "100%",
              position: course.image ? "absolute" : "static",
              top: 0,
              left: 0,
              display: course.image ? "none" : "flex",
            }}
          />
        </div>
      }
      actions={[
        <Button
          key="continue-button"
          type="primary"
          icon={getContinueButtonIcon(course)}
          onClick={(e) => {
            e.stopPropagation();
            handleCourseClick(course); 
          }}
          style={{
            borderRadius: "6px",
            fontWeight: "500",
            boxShadow: "0 2px 4px rgba(24, 144, 255, 0.2)",
          }}
        >
          {getContinueButtonText(course)}
        </Button>,
      ]}
      onClick={() => openDrawer(course)}
      style={{
        marginBottom: 24,
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      bodyStyle={{
        padding: "20px",
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
      className="course-card"
    >
      <div style={{ marginBottom: 12 }}>
        <Space wrap>
          <Badge
            status={getStatusColor(course.status)}
            text={getStatusText(course.status)}
            style={{ fontSize: "12px" }}
          />
          <Tag
            color={getTypeColor(course.type)}
            style={{
              borderRadius: "4px",
              fontSize: "10px",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            {course.type}
          </Tag>
        </Space>
      </div>

      <Title
        level={4}
        style={{
          marginBottom: 8,
          fontSize: "16px",
          lineHeight: "1.4",
          color: "#262626",
          minHeight: "44px",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {course.title}
      </Title>

      <Text
        type="secondary"
        style={{
          fontSize: "11px",
          fontWeight: "500",
          color: "#8c8c8c",
          marginBottom: "8px",
          display: "block",
        }}
      >
        {course.code}
      </Text>

      <Paragraph
        ellipsis={{ rows: 2 }}
        style={{
          marginTop: 0,
          marginBottom: 16,
          fontSize: "13px",
          lineHeight: "1.5",
          color: "#595959",
          flex: 1,
          minHeight: "40px",
        }}
      >
        {course.description}
      </Paragraph>

      <div style={{ marginTop: "auto" }}>
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <Text strong style={{ fontSize: "12px", color: "#262626" }}>
              Progress
            </Text>
            <Text strong style={{ fontSize: "12px", color: "#1890ff" }}>
              {course.progress}%
            </Text>
          </div>
          <Progress
            percent={course.progress}
            size="small"
            strokeColor={{
              "0%": "#1890ff",
              "100%": "#52c41a",
            }}
            trailColor="#f0f0f0"
            strokeWidth={6}
          />
        </div>

        <div style={{ marginBottom: 8 }}>
          <Space size="small" style={{ fontSize: "12px" }}>
            <UserOutlined style={{ color: "#8c8c8c" }} />
            <Text type="secondary" style={{ fontSize: "12px" }}>
              {course.trainer}
            </Text>
          </Space>
        </div>

        {course.dueDate && (
          <div>
            <Space size="small" style={{ fontSize: "12px" }}>
              <ClockCircleOutlined style={{ color: "#8c8c8c" }} />
              <Text type="secondary" style={{ fontSize: "12px" }}>
                Due: {new Date(course.dueDate).toLocaleDateString()}
              </Text>
            </Space>
          </div>
        )}
      </div>
    </Card>
  )

  // Course List Item Component
  const CourseListItem = ({ course }) => (
    <List.Item
      key={course.id}
      actions={[
        <Button
          key="continue-button"
          type="primary"
          size="small"
          icon={getContinueButtonIcon(course)}
          onClick={(e) => {
            e.stopPropagation();
            handleCourseClick(course); 
          }}
          style={{
            borderRadius: "6px",
            fontWeight: "500",
          }}
        >
          {getContinueButtonText(course)}
        </Button>,
      ]}
      onClick={() => openDrawer(course)}
      style={{
        cursor: "pointer",
        padding: "20px 0",
        borderRadius: "8px",
        transition: "background-color 0.2s ease",
      }}
      className="course-list-item"
    >
      <List.Item.Meta
        avatar={
          course.image ? (
            <Avatar size={80} src={course.image} icon={<BookOutlined />} style={{ borderRadius: "8px" }} />
          ) : (
            <div style={{ width: 80, height: 80, borderRadius: "8px", overflow: "hidden" }}>
              <DefaultCourseImage title={course.title} style={{ width: "100%", height: "100%", fontSize: "12px" }} />
            </div>
          )
        }
        title={
          <div>
            <Space wrap>
              <Title level={5} style={{ margin: 0, fontSize: "16px", color: "#262626" }}>
                {course.title}
              </Title>
              <Tag color={getTypeColor(course.type)} size="small">
                {course.type.toUpperCase()}
              </Tag>
              <Badge status={getStatusColor(course.status)} text={getStatusText(course.status)} />
            </Space>
            <div style={{ marginTop: 4 }}>
              <Text type="secondary" style={{ fontSize: "12px", fontWeight: "500" }}>
                {course.code}
              </Text>
            </div>
          </div>
        }
        description={
          <div>
            <Paragraph ellipsis={{ rows: 1 }} style={{ margin: "8px 0", fontSize: "13px", color: "#595959" }}>
              {course.description}
            </Paragraph>
            <Space size="large" wrap>
              <Space size="small">
                <UserOutlined style={{ color: "#8c8c8c" }} />
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  {course.trainer}
                </Text>
              </Space>
              {course.dueDate && (
                <Space size="small">
                  <ClockCircleOutlined style={{ color: "#8c8c8c" }} />
                  <Text type="secondary" style={{ fontSize: "12px" }}>
                    Due: {new Date(course.dueDate).toLocaleDateString()}
                  </Text>
                </Space>
              )}
              <Space size="small">
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  Progress:
                </Text>
                <Progress percent={course.progress} size="small" style={{ width: 100 }} />
                <Text type="secondary" style={{ fontSize: "12px", fontWeight: "500" }}>
                  {course.progress}%
                </Text>
              </Space>
            </Space>
          </div>
        }
      />
    </List.Item>
  )

  return (
    <div className="min-h-screen p-3">
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        <Title level={2} style={{ marginBottom: 32, color: "#262626", fontSize: "28px" }}>
          My Courses
        </Title>

        <div
          style={{
            background: "white",
            padding: "24px",
            borderRadius: "12px",
            marginBottom: 32,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
          }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Search
                placeholder="Search courses..."
                prefix={<SearchOutlined />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                allowClear
                style={{ borderRadius: "8px" }}
              />
            </Col>

            <Col xs={12} sm={6} md={4}>
              <Select
                placeholder="Sort by"
                value={sortBy}
                onChange={setSortBy}
                style={{ width: "100%", borderRadius: "8px" }}
              >
                <Option value="name">Name</Option>
                <Option value="lastAccessed">Last Accessed</Option>
                <Option value="dueDate">Due Date</Option>
                <Option value="progress">Progress</Option>
                <Option value="startDate">Start Date</Option>
              </Select>
            </Col>

            <Col xs={12} sm={6} md={4}>
              <Select
                placeholder="Status"
                value={filterStatus}
                onChange={setFilterStatus}
                style={{ width: "100%" }}
                suffixIcon={<FilterOutlined />}
              >
                <Option value="all">All Status</Option>
                <Option value="in-progress">In Progress</Option>
                <Option value="not-started">Not Started</Option>
                <Option value="completed">Completed</Option>
              </Select>
            </Col>

            <Col xs={12} sm={6} md={4}>
              <Select placeholder="Type" value={filterType} onChange={setFilterType} style={{ width: "100%" }}>
                <Option value="all">All Types</Option>
                <Option value="mandatory">Mandatory</Option>
                <Option value="optional">Optional</Option>
                <Option value="elective">Elective</Option>
              </Select>
            </Col>

            <Col xs={12} sm={6} md={4}>
              <Select
                placeholder="Category"
                value={filterCategory}
                onChange={setFilterCategory}
                style={{ width: "100%" }}
              >
                <Option value="all">All Categories</Option>
                {categories.map((category) => (
                  <Option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Option>
                ))}
              </Select>
            </Col>

            <Col xs={12} sm={6} md={2}>
              <Button.Group style={{ width: "100%" }}>
                <Button
                  type={viewMode === "grid" ? "primary" : "default"}
                  icon={<AppstoreOutlined />}
                  onClick={() => setViewMode("grid")}
                  style={{ borderRadius: "8px 0 0 8px" }}
                />
                <Button
                  type={viewMode === "list" ? "primary" : "default"}
                  icon={<UnorderedListOutlined />}
                  onClick={() => setViewMode("list")}
                  style={{ borderRadius: "0 8px 8px 0" }}
                />
              </Button.Group>
            </Col>
          </Row>
        </div>

        {filteredAndSortedCourses.length === 0 ? (
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "60px 24px",
              textAlign: "center",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
            }}
          >
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <div>
                  <Title level={4} style={{ color: "#8c8c8c" }}>
                    No courses found
                  </Title>
                  <Paragraph style={{ color: "#bfbfbf", marginBottom: 24 }}>
                    {searchTerm || filterStatus !== "all" || filterType !== "all" || filterCategory !== "all"
                      ? "Try adjusting your search or filters to find courses."
                      : "You haven't enrolled in any courses yet."}
                  </Paragraph>
                  <Button type="primary" size="large" style={{ borderRadius: "8px" }}>
                    Browse Course Catalog
                  </Button>
                </div>
              }
            />
          </div>
        ) : (
          <>
            {viewMode === "grid" ? (
              <Row gutter={[24, 24]}>
                {filteredAndSortedCourses.map((course) => (
                  <Col key={course.id} xs={24} sm={12} md={8} lg={8} xl={8}>
                    <CourseCard course={course} />
                  </Col>
                ))}
              </Row>
            ) : (
              <div
                style={{
                  background: "white",
                  borderRadius: "12px",
                  padding: "24px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
                }}
              >
                <List
                  itemLayout="vertical"
                  dataSource={filteredAndSortedCourses}
                  renderItem={(course) => <CourseListItem course={course} />}
                />
              </div>
            )}
          </>
        )}

        <Drawer
          title={null}
          placement="right"
          width={600}
          open={drawerVisible}
          onClose={closeDrawer}
          bodyStyle={{ padding: "24px" }}
          headerStyle={{ display: "none" }}
          style={{ borderRadius: "12px 0 0 12px" }}
        >
          {selectedCourse && (
            <div>
              <div style={{ textAlign: "center", marginBottom: 32 }}>
                <div style={{ height: 200, borderRadius: 12, overflow: "hidden", marginBottom: 20 }}>
                  {selectedCourse.image ? (
                    <img
                      src={selectedCourse.image || "/placeholder.svg"}
                      alt={selectedCourse.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      onError={(e) => {
                        e.target.style.display = "none"
                        e.target.nextSibling.style.display = "flex"
                      }}
                    />
                  ) : null}
                  <DefaultCourseImage
                    title={selectedCourse.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      fontSize: "20px",
                      display: selectedCourse.image ? "none" : "flex",
                    }}
                  />
                </div>
                <Title level={3} style={{ marginBottom: 8, color: "#262626" }}>
                  {selectedCourse.title}
                </Title>
                <Text type="secondary" style={{ fontSize: "14px", fontWeight: "500" }}>
                  {selectedCourse.code}
                </Text>
                <div style={{ marginTop: 12 }}>
                  <Space>
                    <Badge status={getStatusColor(selectedCourse.status)} text={getStatusText(selectedCourse.status)} />
                    <Tag color={getTypeColor(selectedCourse.type)}>{selectedCourse.type.toUpperCase()}</Tag>
                  </Space>
                </div>
              </div>

              <Tabs defaultActiveKey="overview" size="small">
                <TabPane tab="Overview" key="overview">
                  <Paragraph style={{ fontSize: "14px", lineHeight: "1.6", color: "#595959" }}>
                    {selectedCourse.description}
                  </Paragraph>

                  <Divider />

                  <Title level={5}>Course Progress</Title>
                  <Progress
                    percent={selectedCourse.progress}
                    strokeColor={{
                      "0%": "#108ee9",
                      "100%": "#87d068",
                    }}
                    strokeWidth={8}
                  />
                  <Text style={{ fontSize: "13px", color: "#8c8c8c" }}>
                    {selectedCourse.completedModules} of {selectedCourse.modules} modules completed
                  </Text>

                  <Divider />

                  <Title level={5}>Tags</Title>
                  <Space wrap>
                    {selectedCourse.tags.map((tag) => (
                      <Tag key={tag} color="blue" style={{ borderRadius: "4px" }}>
                        {tag}
                      </Tag>
                    ))}
                  </Space>
                </TabPane>

                <TabPane tab="Details" key="details">
                  <Descriptions column={1} size="small" bordered>
                    <Descriptions.Item label="Instructor">
                      <Space>
                        <UserOutlined />
                        {selectedCourse.trainer}
                      </Space>
                    </Descriptions.Item>
                    <Descriptions.Item label="Students Enrolled">{selectedCourse.studentsEnrolled}</Descriptions.Item>
                    <Descriptions.Item label="Location">
                      <Space>
                        <EnvironmentOutlined />
                        {selectedCourse.location}
                      </Space>
                    </Descriptions.Item>
                    <Descriptions.Item label="Schedule">
                      <Space>
                        <ClockCircleOutlined />
                        {selectedCourse.timing}
                      </Space>
                    </Descriptions.Item>
                    <Descriptions.Item label="Duration">{selectedCourse.duration}</Descriptions.Item>
                    <Descriptions.Item label="Start Date">
                      {new Date(selectedCourse.startDate).toLocaleDateString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="Due Date">
                      {new Date(selectedCourse.dueDate).toLocaleDateString()}
                    </Descriptions.Item>
                    {selectedCourse.lastAccessed && (
                      <Descriptions.Item label="Last Accessed">
                        {new Date(selectedCourse.lastAccessed).toLocaleDateString()}
                      </Descriptions.Item>
                    )}
                  </Descriptions>
                </TabPane>

                <TabPane tab="Materials" key="materials">
                  <Title level={5}>Course Materials</Title>
                  <List
                    size="small"
                    dataSource={selectedCourse.materials}
                    renderItem={(material) => (
                      <List.Item
                        key={material.name}
                        actions={[
                          <Button key={material.name} type="link" size="small" icon={<FileTextOutlined />}>
                            View
                          </Button>,
                        ]}
                      >
                        <List.Item.Meta
                          avatar={<FileTextOutlined style={{ fontSize: 20, color: "#1890ff" }} />}
                          title={<Text style={{ fontSize: "14px" }}>{material.name}</Text>}
                          description={
                            <Space>
                              <Tag color="blue" size="small">
                                {material.type}
                              </Tag>
                              {material.size && (
                                <Text type="secondary" style={{ fontSize: "12px" }}>
                                  {material.size}
                                </Text>
                              )}
                              {material.duration && (
                                <Text type="secondary" style={{ fontSize: "12px" }}>
                                  {material.duration}
                                </Text>
                              )}
                              {material.count && (
                                <Text type="secondary" style={{ fontSize: "12px" }}>
                                  {material.count}
                                </Text>
                              )}
                            </Space>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </TabPane>
              </Tabs>

              <div style={{ textAlign: "center", marginTop: 32, paddingTop: 20, borderTop: "1px solid #f0f0f0" }}>
                <Button
                  type="primary"
                  size="large"
                  icon={getContinueButtonIcon(selectedCourse)}
                  style={{
                    borderRadius: "8px",
                    padding: "8px 32px",
                    height: "auto",
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                >
                  {getContinueButtonText(selectedCourse)}
                </Button>
              </div>
            </div>
          )}
        </Drawer>
      </div>

      <style jsx>{`
        .course-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15) !important;
        }
        
        .course-card:hover .ant-card-cover img {
          transform: scale(1.05);
        }
        
        .course-list-item:hover {
          background-color: #fafafa;
        }
        
        @media (max-width: 768px) {
          .course-card {
            margin-bottom: 16px;
          }
        }
        
        @media (max-width: 576px) {
          .ant-col {
            margin-bottom: 16px;
          }
        }
      `}</style>
    </div>
  )
}

export default CoursesProgress
