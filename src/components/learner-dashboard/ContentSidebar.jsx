import { Button, Typography, Progress, Collapse, List } from "antd"
import {
  CloseOutlined,
  PlayCircleOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
  TrophyOutlined,
  BookOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons"

const { Title, Text } = Typography
const { Panel } = Collapse

const ContentSidebar = ({
  currentCourse,
  isMobile,
  setSidebarVisible,
  calculateProgress,
  completedItems,
  currentVideo,
  selectVideo,
  markAsCompleted,
}) => {
  return (
    <div className="h-full bg-white">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-3">
          <Title level={5} className="mb-0">
            Course Content
          </Title>
          {isMobile && (
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={() => setSidebarVisible(false)}
              className="hover:bg-gray-100"
            />
          )}
        </div>
        <div className="mb-3">
          <Progress percent={calculateProgress()} strokeColor="#52c41a" format={(percent) => `${percent}% Complete`} />
        </div>
        <Text type="secondary" className="text-sm">
          {currentCourse?.modules?.length || 0} modules •{" "}
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
}

export default ContentSidebar
