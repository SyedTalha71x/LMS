"use client"

import { useState, useEffect } from "react"
import {
  Layout,
  Typography,
  Button,
  Progress,
  Collapse,
  Tabs,
  Card,
  Avatar,
  Rate,
  List,
  Divider,
  Row,
  Col,
  Badge,
  Modal,
  Input,
  Form,
  message,
} from "antd"
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  FullscreenOutlined,
  SettingOutlined,
  BookOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
  TrophyOutlined,
  ClockCircleOutlined,
  UserOutlined,
  StarOutlined,
  HeartOutlined,
  ShareAltOutlined,
  DownloadOutlined,
  CheckCircleOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons"
import coursesData from '../../../utils/courseData'
import { useParams } from "react-router-dom"

const { Header, Content, Sider } = Layout
const { Title, Text, Paragraph } = Typography
const { Panel } = Collapse
const { TabPane } = Tabs
const { TextArea } = Input

const CourseDetailPage = () => {
  const {id} = useParams();
  const [currentCourse, setCurrentCourse] = useState(null)
  const [currentVideo, setCurrentVideo] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [completedItems, setCompletedItems] = useState(new Set())
  const [activeTab, setActiveTab] = useState("overview")
  const [reviewModalVisible, setReviewModalVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const courseId = parseInt(id) || id
    const course = coursesData.find((c) => c.id === courseId)
    setCurrentCourse(course)

    // Set first video as default
    if (course && course.modules.length > 0) {
      const firstModule = course.modules[0]
      if (firstModule.lessons.length > 0) {
        const firstLesson = firstModule.lessons[0]
        const firstVideoItem = firstLesson.items.find((item) => item.type === "video")
        if (firstVideoItem) {
          setCurrentVideo(firstVideoItem)
        }
      }
    }

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [id])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const selectVideo = (item) => {
    setCurrentVideo(item)
    setIsPlaying(false)
  }

  const markAsCompleted = (itemId) => {
    setCompletedItems((prev) => new Set([...prev, itemId]))
    message.success("Item marked as completed!")
  }

  const calculateProgress = () => {
    if (!currentCourse) return 0

    let totalItems = 0
    let completedCount = 0

    currentCourse.modules.forEach((module) => {
      module.lessons.forEach((lesson) => {
        totalItems += lesson.items.length
        lesson.items.forEach((item) => {
          if (completedItems.has(item.id)) {
            completedCount++
          }
        })
      })
    })

    return totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0
  }

  const renderVideoPlayer = () => (
    <div className="bg-black rounded-lg overflow-hidden relative group">
      <div className="aspect-video bg-gray-900 flex items-center justify-center relative">
        {currentVideo ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="text-white text-center">
              <div className="text-6xl mb-4">{isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}</div>
              <Title level={4} className="text-white mb-2">
                {currentVideo.title}
              </Title>
              <Text className="text-gray-300">Duration: {currentVideo.duration}</Text>
            </div>

            {/* Video Controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-4">
                  <Button
                    type="text"
                    icon={isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                    onClick={togglePlay}
                    className="text-white hover:text-blue-400"
                    size="large"
                  />
                  <Text className="text-white">0:00 / {currentVideo.duration}</Text>
                </div>
                <div className="flex items-center space-x-2">
                  <Button type="text" icon={<SettingOutlined />} className="text-white hover:text-blue-400" />
                  <Button type="text" icon={<FullscreenOutlined />} className="text-white hover:text-blue-400" />
                </div>
              </div>
              <div className="mt-2">
                <Progress percent={25} showInfo={false} strokeColor="#1890ff" />
              </div>
            </div>
          </>
        ) : (
          <div className="text-white text-center">
            <PlayCircleOutlined className="text-6xl mb-4" />
            <Title level={4} className="text-white">
              Select a video to start learning
            </Title>
          </div>
        )}
      </div>
    </div>
  )

  const renderContentSidebar = () => (
    <div className="h-full bg-white">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-3">
          <Title level={5} className="mb-0">
            Course Content
          </Title>
          {isMobile && <Button type="text" icon={<CloseOutlined />} onClick={() => setSidebarVisible(false)} />}
        </div>
        <div className="mb-3">
          <Progress percent={calculateProgress()} strokeColor="#52c41a" format={(percent) => `${percent}% Complete`} />
        </div>
        <Text type="secondary" className="text-sm">
          {currentCourse?.modules?.length || 0} modules •
          {currentCourse?.modules?.reduce(
            (acc, module) => acc + module.lessons.reduce((lessonAcc, lesson) => lessonAcc + lesson.items.length, 0),
            0,
          ) || 0}{" "}
          items
        </Text>
      </div>

      <div className="overflow-y-auto" style={{ height: "calc(100vh - 200px)" }}>
        <Collapse defaultActiveKey={["0"]} ghost expandIconPosition="right">
          {currentCourse?.modules?.map((module, moduleIndex) => (
            <Panel
              key={moduleIndex}
              header={
                <div className="flex items-center justify-between w-full pr-4">
                  <div>
                    <Text strong className="block">
                      {module.title}
                    </Text>
                    <Text type="secondary" className="text-sm">
                      {module.lessons.reduce((acc, lesson) => acc + lesson.items.length, 0)} items
                    </Text>
                  </div>
                </div>
              }
            >
              {module.lessons.map((lesson, lessonIndex) => (
                <div key={lessonIndex} className="mb-4">
                  <Text strong className="block mb-2 text-gray-700">
                    {lesson.title}
                  </Text>
                  <List
                    size="small"
                    dataSource={lesson.items}
                    renderItem={(item) => (
                      <List.Item
                        className={`cursor-pointer hover:bg-gray-50 px-3 py-2 rounded transition-colors ${
                          currentVideo?.id === item.id ? "bg-blue-50 border-l-4 border-blue-500" : ""
                        }`}
                        onClick={() => item.type === "video" && selectVideo(item)}
                      >
                        <div className="flex items-center justify-between w-full">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              {item.type === "video" && <PlayCircleOutlined className="text-blue-500" />}
                              {item.type === "pdf" && <FileTextOutlined className="text-red-500" />}
                              {item.type === "quiz" && <QuestionCircleOutlined className="text-green-500" />}
                              {item.type === "assignment" && <TrophyOutlined className="text-orange-500" />}
                              {item.type === "text" && <BookOutlined className="text-purple-500" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <Text className="block truncate text-sm">{item.title}</Text>
                              {item.duration && (
                                <Text type="secondary" className="text-xs">
                                  <ClockCircleOutlined className="mr-1" />
                                  {item.duration}
                                </Text>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {completedItems.has(item.id) ? (
                              <CheckCircleOutlined className="text-green-500" />
                            ) : (
                              <Button
                                type="text"
                                size="small"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  markAsCompleted(item.id)
                                }}
                                className="opacity-0 group-hover:opacity-100"
                              >
                                Mark Complete
                              </Button>
                            )}
                          </div>
                        </div>
                      </List.Item>
                    )}
                  />
                </div>
              ))}
            </Panel>
          ))}
        </Collapse>
      </div>
    </div>
  )

  const renderTabContent = () => (
    <Tabs activeKey={activeTab} onChange={setActiveTab} className="mt-6">
      <TabPane tab="Overview" key="overview">
        <div className="space-y-6">
          <div>
            <Title level={4}>About this course</Title>
            <Paragraph className="text-gray-600 leading-relaxed">{currentCourse?.description}</Paragraph>
          </div>

          <div>
            <Title level={4}>What you'll learn</Title>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <CheckCircleOutlined className="text-green-500 mt-1 flex-shrink-0" />
                    <Text>Advanced clinical pharmacy concepts and patient care</Text>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircleOutlined className="text-green-500 mt-1 flex-shrink-0" />
                    <Text>Drug therapy optimization and clinical decision-making</Text>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircleOutlined className="text-green-500 mt-1 flex-shrink-0" />
                    <Text>Therapeutic drug monitoring principles</Text>
                  </li>
                </ul>
              </Col>
              <Col xs={24} md={12}>
                <ul className="space-y-2">
                  <li className="flex items-start space-x-2">
                    <CheckCircleOutlined className="text-green-500 mt-1 flex-shrink-0" />
                    <Text>Pharmacokinetics and pharmacodynamics in practice</Text>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircleOutlined className="text-green-500 mt-1 flex-shrink-0" />
                    <Text>Patient assessment and care planning</Text>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircleOutlined className="text-green-500 mt-1 flex-shrink-0" />
                    <Text>Clinical pharmacy guidelines and best practices</Text>
                  </li>
                </ul>
              </Col>
            </Row>
          </div>

          <div>
            <Title level={4}>Course Resources</Title>
            <List
              dataSource={currentCourse?.resources || []}
              renderItem={(resource) => (
                <List.Item
                  key={resource.id}
                  actions={[
                    <Button key={`download-${resource.id}`} type="link" icon={<DownloadOutlined />}>
                      {resource.type === "link" ? "Visit" : "Download"}
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<FileTextOutlined className="text-blue-500 text-lg" />}
                    title={resource.title}
                    description={resource.description}
                  />
                </List.Item>
              )}
            />
          </div>
        </div>
      </TabPane>

      <TabPane tab="Announcements" key="announcements">
        <div className="space-y-4">
          <Card>
            <div className="flex items-start space-x-3">
              <Avatar src="/api/placeholder/40/40" />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Text strong>{currentCourse?.instructor}</Text>
                  <Text type="secondary">2 days ago</Text>
                </div>
                <Title level={5}>Welcome to the Course!</Title>
                <Paragraph>
                  Welcome everyone to {currentCourse?.title}! I'm excited to have you all here. Please make sure to
                  check the course materials and don't hesitate to ask questions in the Q&A section.
                </Paragraph>
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-start space-x-3">
              <Avatar src="/api/placeholder/40/40" />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Text strong>{currentCourse?.instructor}</Text>
                  <Text type="secondary">1 week ago</Text>
                </div>
                <Title level={5}>Assignment Deadline Reminder</Title>
                <Paragraph>
                  Just a friendly reminder that the first assignment is due next week. Please review the requirements in
                  the course materials section.
                </Paragraph>
              </div>
            </div>
          </Card>
        </div>
      </TabPane>

      <TabPane tab="Reviews" key="reviews">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-4 mb-2">
                <div className="flex items-center space-x-2">
                  <Rate disabled defaultValue={4.5} />
                  <Text strong className="text-lg">
                    4.5
                  </Text>
                </div>
                <Text type="secondary">(1,234 reviews)</Text>
              </div>
              <Button type="primary" onClick={() => setReviewModalVisible(true)}>
                Leave a Review
              </Button>
            </div>
          </div>

          <Divider />

          <div className="space-y-4">
            {[1, 2, 3].map((review) => (
              <Card key={review} className="border-0 shadow-sm">
                <div className="flex items-start space-x-3">
                  <Avatar src={`/api/placeholder/40/40`} />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Text strong>Student {review}</Text>
                      <Rate disabled defaultValue={5} className="text-sm" />
                      <Text type="secondary">2 weeks ago</Text>
                    </div>
                    <Paragraph>
                      Excellent course! The instructor explains complex concepts very clearly and the practical examples
                      are really helpful. Highly recommended for anyone in the pharmaceutical field.
                    </Paragraph>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </TabPane>

      <TabPane tab="Q&A" key="qa">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Title level={4}>Questions & Answers</Title>
            <Button type="primary">Ask a Question</Button>
          </div>

          <div className="space-y-4">
            {[1, 2].map((qa) => (
              <Card key={qa}>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Avatar src={`/api/placeholder/32/32`} />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <Text strong>Student {qa}</Text>
                        <Text type="secondary">3 days ago</Text>
                      </div>
                      <Text>How do I calculate the therapeutic window for a specific drug?</Text>
                    </div>
                  </div>

                  <div className="ml-11 pl-3 border-l-2 border-gray-200">
                    <div className="flex items-start space-x-3">
                      <Avatar src="/api/placeholder/32/32" />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Text strong>{currentCourse?.instructor}</Text>
                          <Badge count="Instructor" className="bg-blue-500" />
                          <Text type="secondary">2 days ago</Text>
                        </div>
                        <Text>
                          Great question! The therapeutic window is calculated by determining the minimum effective
                          concentration and the minimum toxic concentration...
                        </Text>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </TabPane>

      <TabPane tab="Notes" key="notes">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Title level={4}>My Notes</Title>
            <Button type="primary">Add Note</Button>
          </div>

          <div className="text-center py-12">
            <BookOutlined className="text-4xl text-gray-400 mb-4" />
            <Title level={4} type="secondary">
              No notes yet
            </Title>
            <Text type="secondary">
              Start taking notes while watching the videos to keep track of important points.
            </Text>
          </div>
        </div>
      </TabPane>

      <TabPane tab="Learning Tools" key="tools">
        <div className="space-y-6">
          <Title level={4}>Learning Tools</Title>

          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={8}>
              <Card className="text-center hover:shadow-md transition-shadow">
                <DownloadOutlined className="text-3xl text-blue-500 mb-3" />
                <Title level={5}>Download Resources</Title>
                <Text type="secondary">Access course materials offline</Text>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Card className="text-center hover:shadow-md transition-shadow">
                <QuestionCircleOutlined className="text-3xl text-green-500 mb-3" />
                <Title level={5}>Practice Quizzes</Title>
                <Text type="secondary">Test your knowledge</Text>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={8}>
              <Card className="text-center hover:shadow-md transition-shadow">
                <TrophyOutlined className="text-3xl text-orange-500 mb-3" />
                <Title level={5}>Assignments</Title>
                <Text type="secondary">Complete practical exercises</Text>
              </Card>
            </Col>
          </Row>
        </div>
      </TabPane>
    </Tabs>
  )

  if (!currentCourse) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <Layout className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header className="bg-white shadow-sm px-4 lg:px-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {isMobile && <Button type="text" icon={<MenuOutlined />} onClick={() => setSidebarVisible(true)} />}
          <div>
            <Title level={4} className="mb-0 text-gray-800">
              {currentCourse.title}
            </Title>
            <Text type="secondary" className="text-sm">
              by {currentCourse.instructor}
            </Text>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button type="text" icon={<HeartOutlined />} />
          <Button type="text" icon={<ShareAltOutlined />} />
          <Rate disabled defaultValue={4.5} className="text-sm" />
        </div>
      </Header>

      <Layout>
        {/* Main Content */}
        <Content className="p-4 lg:p-6">
          <Row gutter={[24, 24]}>
            {/* Video Section */}
            <Col xs={24} lg={sidebarVisible ? 16 : 24}>
              <div className="space-y-6">
                {renderVideoPlayer()}

                {/* Course Info */}
                <Card>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <Title level={3} className="mb-2">
                        {currentVideo?.title || "Course Introduction"}
                      </Title>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <UserOutlined />
                          <span>{currentCourse.instructor}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <ClockCircleOutlined />
                          <span>{currentCourse.duration}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <StarOutlined />
                          <span>4.5 (1,234 reviews)</span>
                        </span>
                      </div>
                    </div>

                    {!isMobile && (
                      <Button type="default" onClick={() => setSidebarVisible(!sidebarVisible)}>
                        {sidebarVisible ? "Hide" : "Show"} Content
                      </Button>
                    )}
                  </div>

                  <Progress percent={calculateProgress()} strokeColor="#52c41a" className="mb-4" />
                </Card>

                {/* Tabs Content */}
                {renderTabContent()}
              </div>
            </Col>

            {/* Sidebar */}
            {sidebarVisible && (
              <Col xs={24} lg={8}>
                <div className={`${isMobile ? "fixed inset-0 z-50 bg-white" : "sticky top-4"}`}>
                  {renderContentSidebar()}
                </div>
              </Col>
            )}
          </Row>
        </Content>
      </Layout>

      {/* Review Modal */}
      <Modal
        title="Leave a Review"
        open={reviewModalVisible}
        onCancel={() => setReviewModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setReviewModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary">
            Submit Review
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Rating">
            <Rate />
          </Form.Item>
          <Form.Item label="Review">
            <TextArea rows={4} placeholder="Share your experience with this course..." />
          </Form.Item>
        </Form>
      </Modal>

      {/* Mobile Sidebar Overlay */}
      {isMobile && sidebarVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setSidebarVisible(false)} />
      )}
    </Layout>
  )
}

export default CourseDetailPage
