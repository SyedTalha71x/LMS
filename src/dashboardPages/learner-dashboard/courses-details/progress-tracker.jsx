
import { Progress, Tooltip, Button, Drawer } from "antd"
import { InfoCircleOutlined } from "@ant-design/icons"
import { useState } from "react"
import ProgressDashboard from "./progress-dashboard"

const ProgressTracker = ({ progress, currentModule, currentLesson, courseData, completedItems }) => {
  const [showDashboard, setShowDashboard] = useState(false)

  const currentModuleTitle = courseData.modules[currentModule]?.title || ""
  const currentLessonTitle = courseData.modules[currentModule]?.lessons[currentLesson]?.title || ""

  return (
    <div className="flex items-center space-x-4">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">Course Progress</span>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
            <Tooltip title="View detailed progress">
              <Button type="text" size="small" icon={<InfoCircleOutlined />} onClick={() => setShowDashboard(true)} />
            </Tooltip>
          </div>
        </div>
        <Progress
          percent={progress}
          size="small"
          strokeColor={{
            "0%": "#108ee9",
            "100%": "#87d068",
          }}
          className="mb-1"
        />
        <div className="text-xs text-gray-500 truncate">
          {currentModuleTitle} → {currentLessonTitle}
        </div>
      </div>

      {/* Progress Dashboard Drawer */}
      <Drawer
        title="Course Progress Dashboard"
        placement="right"
        width={720}
        open={showDashboard}
        onClose={() => setShowDashboard(false)}
      >
        <ProgressDashboard
          courseData={courseData}
          completedItems={completedItems || new Set()}
          currentModule={currentModule}
          currentLesson={currentLesson}
        />
      </Drawer>
    </div>
  )
}

export default ProgressTracker
