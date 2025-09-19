
import { Card, Button, Tag } from "antd"
import {
  PlayCircleOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
  EditOutlined,
  BookOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons"
import DiscussionPanel from "./discussion-panel"
import ResourcesPanel from "./resources-panel"
import PolicyContent from "../../../components/learner-dashboard/content/PolicyContent"
import AssignmentContent from "../../../components/learner-dashboard/content/AssignmentContent"
import QuizContent from "../../../components/learner-dashboard/content/QuizContent"
import TextContent from "../../../components/learner-dashboard/content/TextContent"
import PDFViewer from "../../../components/learner-dashboard/content/PDFViewer"
import VideoPlayer from "../../../components/learner-dashboard/content/VideoPlayer"

const ContentArea = ({
  currentItem,
  moduleIndex,
  lessonIndex,
  itemIndex,
  onComplete,
  completedItems,
  courseData, // Added courseData prop for resources
}) => {
  if (!currentItem) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center text-gray-500">
          <BookOutlined className="text-4xl mb-4" />
          <p>Select a lesson item to begin</p>
        </div>
      </div>
    )
  }

  const itemId = `${moduleIndex}-${lessonIndex}-${itemIndex}`
  const isCompleted = completedItems.has(itemId)

  const getContentIcon = (type) => {
    const iconMap = {
      video: <PlayCircleOutlined className="text-red-500" />,
      pdf: <FileTextOutlined className="text-orange-500" />,
      quiz: <QuestionCircleOutlined className="text-purple-500" />,
      assignment: <EditOutlined className="text-cyan-500" />,
      text: <BookOutlined className="text-green-500" />,
      policy: <ExclamationCircleOutlined className="text-yellow-500" />,
    }
    return iconMap[type] || <BookOutlined />
  }

  const getContentTypeLabel = (type) => {
    const labelMap = {
      video: "Video Lesson",
      pdf: "PDF Document",
      quiz: "Quiz",
      assignment: "Assignment",
      text: "Reading Material",
      policy: "Policy Agreement",
    }
    return labelMap[type] || "Content"
  }

  const renderContent = () => {
    switch (currentItem.type) {
      case "video":
        return (
          <VideoPlayer
            content={currentItem.content}
            onComplete={() => onComplete(moduleIndex, lessonIndex, itemIndex)}
            isCompleted={isCompleted}
          />
        )
      case "pdf":
        return (
          <PDFViewer
            content={currentItem.content}
            onComplete={() => onComplete(moduleIndex, lessonIndex, itemIndex)}
            isCompleted={isCompleted}
          />
        )
      case "text":
        return (
          <TextContent
            content={currentItem.content}
            onComplete={() => onComplete(moduleIndex, lessonIndex, itemIndex)}
            isCompleted={isCompleted}
          />
        )
      case "quiz":
        return (
          <QuizContent
            content={currentItem.content}
            onComplete={() => onComplete(moduleIndex, lessonIndex, itemIndex)}
            isCompleted={isCompleted}
          />
        )
      case "assignment":
        return (
          <AssignmentContent
            content={currentItem.content}
            onComplete={() => onComplete(moduleIndex, lessonIndex, itemIndex)}
            isCompleted={isCompleted}
          />
        )
      case "policy":
        return (
          <PolicyContent
            content={currentItem.content}
            onComplete={() => onComplete(moduleIndex, lessonIndex, itemIndex)}
            isCompleted={isCompleted}
          />
        )
      default:
        return <div>Unsupported content type</div>
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Content Header */}
      <Card className="mb-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {getContentIcon(currentItem.type)}
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-1">{currentItem.title}</h1>
              <div className="flex items-center space-x-3">
                <Tag color="blue">{getContentTypeLabel(currentItem.type)}</Tag>
                {currentItem.duration && <Tag color="green">{currentItem.duration}</Tag>}
                {isCompleted && (
                  <Tag color="success" icon={<CheckCircleOutlined />}>
                    Completed
                  </Tag>
                )}
              </div>
            </div>
          </div>

          {!isCompleted && (
            <Button
              type="primary"
              icon={<CheckCircleOutlined />}
              onClick={() => onComplete(moduleIndex, lessonIndex, itemIndex)}
            >
              Mark Complete
            </Button>
          )}
        </div>
      </Card>

      {/* Content Body */}
      <div className="bg-white rounded-lg shadow-sm mb-6">{renderContent()}</div>

      {/* Discussion Section */}
      <div className="mb-6">
        <DiscussionPanel itemId={currentItem?.id} itemTitle={currentItem?.title} />
      </div>

      {/* Resources Section */}
      <div>
        <ResourcesPanel courseData={courseData} />
      </div>
    </div>
  )
}

export default ContentArea
