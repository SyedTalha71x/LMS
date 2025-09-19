
import { useState } from "react"
import { Tree, Progress, Badge } from "antd"
import {
  PlayCircleOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
  EditOutlined,
  BookOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons"

const NavigationSidebar = ({
  courseData,
  currentModule,
  currentLesson,
  currentItem,
  completedItems,
  onNavigate,
  collapsed,
}) => {
  const [expandedKeys, setExpandedKeys] = useState(["module-0", "lesson-0-0"])

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

  const getProgressIcon = (moduleIndex, lessonIndex, itemIndex) => {
    const itemId = `${moduleIndex}-${lessonIndex}-${itemIndex}`
    const isCompleted = completedItems.has(itemId)
    const isCurrent = moduleIndex === currentModule && lessonIndex === currentLesson && itemIndex === currentItem

    if (isCompleted) {
      return <CheckCircleOutlined className="text-green-500" />
    } else if (isCurrent) {
      return <ClockCircleOutlined className="text-blue-500" />
    } else {
      return <div className="w-3 h-3 border-2 border-gray-300 rounded-full" />
    }
  }

  const calculateModuleProgress = (moduleIndex) => {
    const module = courseData.modules[moduleIndex]
    let totalItems = 0
    let completedCount = 0

    module.lessons.forEach((lesson, lessonIndex) => {
      lesson.items.forEach((item, itemIndex) => {
        totalItems++
        const itemId = `${moduleIndex}-${lessonIndex}-${itemIndex}`
        if (completedItems.has(itemId)) {
          completedCount++
        }
      })
    })

    return totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0
  }

  const calculateLessonProgress = (moduleIndex, lessonIndex) => {
    const lesson = courseData.modules[moduleIndex].lessons[lessonIndex]
    const totalItems = lesson.items.length
    let completedCount = 0

    lesson.items.forEach((item, itemIndex) => {
      const itemId = `${moduleIndex}-${lessonIndex}-${itemIndex}`
      if (completedItems.has(itemId)) {
        completedCount++
      }
    })

    return totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0
  }

  const buildTreeData = () => {
    return courseData.modules.map((module, moduleIndex) => ({
      title: (
        <div className="flex items-center justify-between py-1">
          <div className="flex items-center space-x-2 flex-1">
            <span className="font-semibold text-gray-800 truncate">
              {collapsed ? `M${moduleIndex + 1}` : module.title}
            </span>
          </div>
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <Progress percent={calculateModuleProgress(moduleIndex)} size="small" className="w-16" showInfo={false} />
              <Badge
                count={`${calculateModuleProgress(moduleIndex)}%`}
                style={{ backgroundColor: calculateModuleProgress(moduleIndex) === 100 ? "#52c41a" : "#1890ff" }}
              />
            </div>
          )}
        </div>
      ),
      key: `module-${moduleIndex}`,
      children: module.lessons.map((lesson, lessonIndex) => ({
        title: (
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center space-x-2 flex-1">
              <span className="text-gray-700 truncate">{collapsed ? `L${lessonIndex + 1}` : lesson.title}</span>
            </div>
            {!collapsed && (
              <div className="flex items-center space-x-2">
                <Progress
                  percent={calculateLessonProgress(moduleIndex, lessonIndex)}
                  size="small"
                  className="w-12"
                  showInfo={false}
                />
              </div>
            )}
          </div>
        ),
        key: `lesson-${moduleIndex}-${lessonIndex}`,
        children: lesson.items.map((item, itemIndex) => ({
          title: (
            <div
              className={`flex items-center space-x-2 py-2 px-2 rounded cursor-pointer transition-colors ${
                moduleIndex === currentModule && lessonIndex === currentLesson && itemIndex === currentItem
                  ? "bg-blue-50 border-l-4 border-blue-500"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => onNavigate(moduleIndex, lessonIndex, itemIndex)}
            >
              <div className="flex items-center space-x-2 flex-1">
                {getProgressIcon(moduleIndex, lessonIndex, itemIndex)}
                {!collapsed && getContentIcon(item.type)}
                <span className="text-sm text-gray-600 truncate">{collapsed ? `${itemIndex + 1}` : item.title}</span>
              </div>
              {!collapsed && item.duration && <span className="text-xs text-gray-400">{item.duration}</span>}
            </div>
          ),
          key: `item-${moduleIndex}-${lessonIndex}-${itemIndex}`,
          isLeaf: true,
        })),
      })),
    }))
  }

  return (
    <div className="h-full flex flex-col">
      {/* Course Header */}
      <div className="p-4 border-b bg-gray-50">
        {!collapsed ? (
          <div>
            <h3 className="font-bold text-lg text-gray-800 mb-1 line-clamp-2">{courseData.title}</h3>
            <p className="text-sm text-gray-600 mb-2">by {courseData.instructor}</p>
            <div className="flex items-center space-x-2">
              <Progress
                percent={Math.round(
                  (completedItems.size /
                    courseData.modules.reduce(
                      (total, module) =>
                        total + module.lessons.reduce((lessonTotal, lesson) => lessonTotal + lesson.items.length, 0),
                      0,
                    )) *
                    100,
                )}
                size="small"
                className="flex-1"
              />
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm mb-2">
              {courseData.title.charAt(0)}
            </div>
            <Progress
              type="circle"
              percent={Math.round(
                (completedItems.size /
                  courseData.modules.reduce(
                    (total, module) =>
                      total + module.lessons.reduce((lessonTotal, lesson) => lessonTotal + lesson.items.length, 0),
                    0,
                  )) *
                  100,
              )}
              width={40}
              format={(percent) => `${percent}%`}
            />
          </div>
        )}
      </div>

      {/* Navigation Tree */}
      <div className="flex-1 overflow-auto p-2">
        <Tree
          treeData={buildTreeData()}
          expandedKeys={expandedKeys}
          onExpand={setExpandedKeys}
          showLine={false}
          showIcon={false}
          selectable={false}
          className="custom-tree"
        />
      </div>

      {/* Quick Stats */}
      {!collapsed && (
        <div className="p-4 border-t bg-gray-50">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-blue-600">{completedItems.size}</div>
              <div className="text-xs text-gray-600">Completed</div>
            </div>
            <div>
              <div className="text-lg font-bold text-gray-600">
                {courseData.modules.reduce(
                  (total, module) =>
                    total + module.lessons.reduce((lessonTotal, lesson) => lessonTotal + lesson.items.length, 0),
                  0,
                ) - completedItems.size}
              </div>
              <div className="text-xs text-gray-600">Remaining</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NavigationSidebar
