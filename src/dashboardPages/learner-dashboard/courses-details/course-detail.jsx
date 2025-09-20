
import { useState, useEffect } from "react"
import { Layout, Typography, Button, Progress, Card, Rate, Row, Col, Modal, Input, Form, message } from "antd"
import { ClockCircleOutlined, UserOutlined, StarOutlined } from "@ant-design/icons"
import coursesData from "../../../utils/courseData"
import { useParams } from "react-router-dom"
import VideoPlayer from "../../../components/learner-dashboard/VideoPlayer"
import CourseHeader from "../../../components/learner-dashboard/CourseHeader"
import ContentSidebar from "../../../components/learner-dashboard/ContentSidebar"
import TabContent from "../../../components/learner-dashboard/TabContent"


const { Header, Content } = Layout
const { Title } = Typography

const CourseDetailPage = () => {
  const { id } = useParams()
  const [currentCourse, setCurrentCourse] = useState(null)
  const [currentVideo, setCurrentVideo] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [sidebarVisible, setSidebarVisible] = useState(true)
  const [completedItems, setCompletedItems] = useState(new Set())
  const [activeTab, setActiveTab] = useState("overview")
  const [reviewModalVisible, setReviewModalVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const courseId = Number.parseInt(id) || id
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
      if (window.innerWidth < 768) {
        setSidebarVisible(false)
      }
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
    if (isMobile) {
      setSidebarVisible(false)
    }
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

  const handleDownload = (resource) => {
    if (resource.type === "link") {
      window.open(resource.url || "#", "_blank")
    } else {
      // Create a temporary download link
      const link = document.createElement("a")
      link.href = resource.url || "#"
      link.download = resource.title || "download"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      message.success(`Downloading ${resource.title}...`)
    }
  }

  if (!currentCourse) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <Layout className="min-h-screen">
      <CourseHeader currentCourse={currentCourse} isMobile={isMobile} setSidebarVisible={setSidebarVisible} />

      <Layout>
        <Content className="p-3">
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={sidebarVisible ? 16 : 24}>
              <div className="space-y-6">
                <VideoPlayer currentVideo={currentVideo} isPlaying={isPlaying} togglePlay={togglePlay} />

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

                <TabContent
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  currentCourse={currentCourse}
                  setReviewModalVisible={setReviewModalVisible}
                  handleDownload={handleDownload}
                />
              </div>
            </Col>

            <Col
              xs={24}
              lg={8}
              className={`transition-all duration-500 ease-in-out `}
            >
              <div
                className={`${isMobile ? "fixed inset-0 z-50 bg-white transform transition-transform duration-500 ease-in-out" : "sticky top-4"} ${
                  isMobile && sidebarVisible ? "translate-x-0" : isMobile ? "translate-x-full" : ""
                }`}
              >
                <ContentSidebar
                  currentCourse={currentCourse}
                  isMobile={isMobile}
                  setSidebarVisible={setSidebarVisible}
                  calculateProgress={calculateProgress}
                  completedItems={completedItems}
                  currentVideo={currentVideo}
                  selectVideo={selectVideo}
                  markAsCompleted={markAsCompleted}
                />
              </div>
            </Col>
          </Row>
        </Content>
      </Layout>

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
            <Input.TextArea rows={4} placeholder="Share your experience with this course..." />
          </Form.Item>
        </Form>
      </Modal>

      {isMobile && sidebarVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ease-in-out"
          onClick={() => setSidebarVisible(false)}
        />
      )}
    </Layout>
  )
}

export default CourseDetailPage
