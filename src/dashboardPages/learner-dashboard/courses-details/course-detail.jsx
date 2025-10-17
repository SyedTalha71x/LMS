"use client"

import { useState, useEffect } from "react"
import { Layout, Typography, Button, Progress, Card, Rate, Row, Col, Modal, Input, Form, message } from "antd"
import { ClockCircleOutlined, UserOutlined } from "@ant-design/icons"
import coursesData from "../../../utils/courseData"
import { useParams } from "react-router-dom"
import EnhancedVideoPlayer from '../../../components/learner-dashboard/VideoPlayer'
import AssignmentViewer from "../../../components/learner-dashboard/AssignmentViewer"
import QuizViewer from "../../../components/learner-dashboard/QuizViewer"
import PDFViewer from "../../../components/learner-dashboard/PDFViewer"
import TextContentViewer from "../../../components/learner-dashboard/TextContentViewer"
import CourseHeader from '../../../components/learner-dashboard/CourseHeader'
import TabContent from '../../../components/learner-dashboard/TabContent'
import EnhancedContentSidebar from '../../../components/learner-dashboard/ContentSidebar'

const { Header, Content } = Layout
const { Title } = Typography

const CourseDetailPage = () => {
  const { id } = useParams()
  const [currentCourse, setCurrentCourse] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)
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
        const firstItem = firstLesson.items[0]
        if (firstItem) {
          setCurrentItem(firstItem)
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

  const selectItem = (item) => {
    setCurrentItem(item)
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
      const link = document.createElement("a")
      link.href = resource.url || "#"
      link.download = resource.title || "download"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      message.success(`Downloading ${resource.title}...`)
    }
  }

  const renderMainContent = () => {
    if (!currentItem) {
      return (
        <Card>
          <div className="text-center py-12">
            <Title level={4}>Select a lesson to begin</Title>
          </div>
        </Card>
      )
    }

    switch (currentItem.type) {
      case "video":
        return (
          <div className="space-y-6">
            <EnhancedVideoPlayer
              currentVideo={currentItem}
              onComplete={markAsCompleted}
              markAsCompleted={markAsCompleted}
            />
            <Card>
              <Title level={3} className="mb-2">
                {currentItem.title}
              </Title>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <span className="flex items-center space-x-1">
                  <UserOutlined />
                  <span>{currentCourse.instructor}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <ClockCircleOutlined />
                  <span>{currentItem.duration}</span>
                </span>
              </div>
              <Progress percent={calculateProgress()} strokeColor="#52c41a" />
            </Card>
          </div>
        )

      case "assignment":
        return <AssignmentViewer assignment={currentItem} onComplete={markAsCompleted} />

      case "quiz":
        return <QuizViewer quiz={currentItem} onComplete={markAsCompleted} />

      case "pdf":
        return <PDFViewer document={currentItem} onComplete={markAsCompleted} />

      case "text":
        return <TextContentViewer content={currentItem} onComplete={markAsCompleted} />

      case "policy":
        return <TextContentViewer content={currentItem} onComplete={markAsCompleted} isPolicy={true} />

      default:
        return (
          <Card>
            <Title level={4}>{currentItem.title}</Title>
            <p>Content type not supported</p>
          </Card>
        )
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
                {renderMainContent()}

                {currentItem?.type === "video" && (
                  <TabContent
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    currentCourse={currentCourse}
                    setReviewModalVisible={setReviewModalVisible}
                    handleDownload={handleDownload}
                  />
                )}
              </div>
            </Col>

            <Col xs={24} lg={8} className="transition-all duration-500 ease-in-out">
              <div
                className={`${
                  isMobile
                    ? "fixed inset-0 z-50 bg-white transform transition-transform duration-500 ease-in-out"
                    : "sticky top-4"
                } ${isMobile && sidebarVisible ? "translate-x-0" : isMobile ? "translate-x-full" : ""}`}
              >
                <EnhancedContentSidebar
                  currentCourse={currentCourse}
                  isMobile={isMobile}
                  setSidebarVisible={setSidebarVisible}
                  calculateProgress={calculateProgress}
                  completedItems={completedItems}
                  currentItem={currentItem}
                  selectItem={selectItem}
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
