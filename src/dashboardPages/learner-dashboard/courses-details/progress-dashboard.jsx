/* eslint-disable no-unused-vars */


import { useState } from "react"
import { Card, Progress, Statistic, Timeline, Badge, Button, Modal, Tabs, Divider } from "antd"
import {
  TrophyOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  StarOutlined,
  DownloadOutlined,
  ShareAltOutlined,
  FireOutlined,
  BookOutlined,
  PlayCircleOutlined,
  QuestionCircleOutlined,
  EditOutlined,
} from "@ant-design/icons"
import moment from "moment"

const { TabPane } = Tabs

const ProgressDashboard = ({ courseData, completedItems, currentModule, currentLesson }) => {
  const [showCertificate, setShowCertificate] = useState(false)
  const [showAchievements, setShowAchievements] = useState(false)

  // Calculate various progress metrics
  const calculateProgress = () => {
    const totalItems = courseData.modules.reduce(
      (total, module) => total + module.lessons.reduce((lessonTotal, lesson) => lessonTotal + lesson.items.length, 0),
      0,
    )

    const completedCount = completedItems.size
    const overallProgress = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0

    // Calculate by content type
    const contentTypes = { video: 0, quiz: 0, assignment: 0, text: 0, pdf: 0, policy: 0 }
    const completedTypes = { video: 0, quiz: 0, assignment: 0, text: 0, pdf: 0, policy: 0 }

    courseData.modules.forEach((module, moduleIndex) => {
      module.lessons.forEach((lesson, lessonIndex) => {
        lesson.items.forEach((item, itemIndex) => {
          contentTypes[item.type]++
          const itemId = `${moduleIndex}-${lessonIndex}-${itemIndex}`
          if (completedItems.has(itemId)) {
            completedTypes[item.type]++
          }
        })
      })
    })

    // Calculate module progress
    const moduleProgress = courseData.modules.map((module, moduleIndex) => {
      let moduleTotal = 0
      let moduleCompleted = 0

      module.lessons.forEach((lesson, lessonIndex) => {
        lesson.items.forEach((item, itemIndex) => {
          moduleTotal++
          const itemId = `${moduleIndex}-${lessonIndex}-${itemIndex}`
          if (completedItems.has(itemId)) {
            moduleCompleted++
          }
        })
      })

      return {
        title: module.title,
        progress: moduleTotal > 0 ? Math.round((moduleCompleted / moduleTotal) * 100) : 0,
        completed: moduleCompleted,
        total: moduleTotal,
      }
    })

    return {
      overall: overallProgress,
      completed: completedCount,
      total: totalItems,
      contentTypes,
      completedTypes,
      moduleProgress,
    }
  }

  const progress = calculateProgress()

  // Mock achievements data
  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Complete your first lesson",
      icon: <PlayCircleOutlined />,
      earned: progress.completed > 0,
      earnedDate: "2024-01-10",
      color: "blue",
    },
    {
      id: 2,
      title: "Quiz Master",
      description: "Pass 3 quizzes with 80% or higher",
      icon: <QuestionCircleOutlined />,
      earned: progress.completedTypes.quiz >= 1,
      earnedDate: "2024-01-12",
      color: "purple",
    },
    {
      id: 3,
      title: "Assignment Ace",
      description: "Submit 5 assignments",
      icon: <EditOutlined />,
      earned: progress.completedTypes.assignment >= 1,
      earnedDate: "2024-01-15",
      color: "green",
    },
    {
      id: 4,
      title: "Halfway Hero",
      description: "Complete 50% of the course",
      icon: <StarOutlined />,
      earned: progress.overall >= 50,
      earnedDate: progress.overall >= 50 ? "2024-01-18" : null,
      color: "orange",
    },
    {
      id: 5,
      title: "Course Champion",
      description: "Complete the entire course",
      icon: <TrophyOutlined />,
      earned: progress.overall >= 100,
      earnedDate: progress.overall >= 100 ? "2024-01-25" : null,
      color: "gold",
    },
  ]

  const earnedAchievements = achievements.filter((a) => a.earned)

  // Mock activity timeline
  const recentActivity = [
    {
      time: "2024-01-15 14:30",
      action: "Completed",
      item: "React Components Deep Dive",
      type: "video",
      icon: <PlayCircleOutlined className="text-blue-500" />,
    },
    {
      time: "2024-01-15 13:45",
      action: "Submitted",
      item: "Setup Assignment",
      type: "assignment",
      icon: <EditOutlined className="text-green-500" />,
    },
    {
      time: "2024-01-14 16:20",
      action: "Passed",
      item: "Prerequisites Quiz",
      type: "quiz",
      icon: <QuestionCircleOutlined className="text-purple-500" />,
    },
    {
      time: "2024-01-14 15:10",
      action: "Read",
      item: "Course Syllabus",
      type: "pdf",
      icon: <BookOutlined className="text-orange-500" />,
    },
  ]

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card>
        <div className="text-center mb-6">
          <Progress
            type="circle"
            percent={progress.overall}
            width={120}
            strokeColor={{
              "0%": "#108ee9",
              "100%": "#87d068",
            }}
            format={(percent) => (
              <div>
                <div className="text-2xl font-bold">{percent}%</div>
                <div className="text-sm text-gray-500">Complete</div>
              </div>
            )}
          />
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <Statistic
            title="Completed"
            value={progress.completed}
            suffix={`/ ${progress.total}`}
            valueStyle={{ color: "#3f8600" }}
            prefix={<CheckCircleOutlined />}
          />
          <Statistic
            title="Current Module"
            value={currentModule + 1}
            suffix={`/ ${courseData.modules.length}`}
            valueStyle={{ color: "#1890ff" }}
            prefix={<BookOutlined />}
          />
          <Statistic
            title="Achievements"
            value={earnedAchievements.length}
            suffix={`/ ${achievements.length}`}
            valueStyle={{ color: "#faad14" }}
            prefix={<TrophyOutlined />}
          />
        </div>
      </Card>

      {/* Content Type Progress */}
      <Card title="Progress by Content Type">
        <div className="space-y-4">
          {Object.entries(progress.contentTypes).map(([type, total]) => {
            const completed = progress.completedTypes[type]
            const percentage = total > 0 ? Math.round((completed / total) * 100) : 0

            const typeConfig = {
              video: { color: "#ff4d4f", icon: <PlayCircleOutlined />, label: "Videos" },
              quiz: { color: "#722ed1", icon: <QuestionCircleOutlined />, label: "Quizzes" },
              assignment: { color: "#13c2c2", icon: <EditOutlined />, label: "Assignments" },
              text: { color: "#52c41a", icon: <BookOutlined />, label: "Reading" },
              pdf: { color: "#fa541c", icon: <BookOutlined />, label: "Documents" },
              policy: { color: "#faad14", icon: <BookOutlined />, label: "Policies" },
            }

            const config = typeConfig[type]

            return total > 0 ? (
              <div key={type} className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 w-24">
                  {config.icon}
                  <span className="text-sm font-medium">{config.label}</span>
                </div>
                <div className="flex-1">
                  <Progress percent={percentage} strokeColor={config.color} size="small" />
                </div>
                <div className="text-sm text-gray-500 w-16">
                  {completed}/{total}
                </div>
              </div>
            ) : null
          })}
        </div>
      </Card>

      {/* Module Progress */}
      <Card title="Module Progress">
        <div className="space-y-4">
          {progress.moduleProgress.map((module, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 w-8">
                <Badge
                  count={index + 1}
                  style={{
                    backgroundColor: index === currentModule ? "#1890ff" : "#d9d9d9",
                    color: index === currentModule ? "#fff" : "#666",
                  }}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">{module.title}</span>
                  <span className="text-sm text-gray-500">
                    {module.completed}/{module.total}
                  </span>
                </div>
                <Progress
                  percent={module.progress}
                  size="small"
                  strokeColor={index === currentModule ? "#1890ff" : "#52c41a"}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )

  const renderActivityTab = () => (
    <div className="space-y-6">
      <Card title="Recent Activity">
        <Timeline>
          {recentActivity.map((activity, index) => (
            <Timeline.Item key={index} dot={activity.icon}>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">{activity.action}</span>
                  <span className="mx-2">•</span>
                  <span>{activity.item}</span>
                </div>
                <span className="text-sm text-gray-500">{moment(activity.time).fromNow()}</span>
              </div>
            </Timeline.Item>
          ))}
        </Timeline>
      </Card>

      {/* Study Streak */}
      <Card title="Study Streak">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <FireOutlined className="text-2xl text-orange-500" />
            <span className="text-3xl font-bold">7</span>
            <span className="text-lg text-gray-600">days</span>
          </div>
          <p className="text-gray-600">Keep it up! You're on a great streak.</p>
        </div>
      </Card>

      {/* Time Spent */}
      <Card title="Time Spent Learning">
        <div className="grid grid-cols-2 gap-4">
          <Statistic
            title="This Week"
            value={12.5}
            suffix="hours"
            precision={1}
            valueStyle={{ color: "#1890ff" }}
            prefix={<ClockCircleOutlined />}
          />
          <Statistic
            title="Total Time"
            value={45.2}
            suffix="hours"
            precision={1}
            valueStyle={{ color: "#52c41a" }}
            prefix={<ClockCircleOutlined />}
          />
        </div>
      </Card>
    </div>
  )

  const renderAchievementsTab = () => (
    <div className="space-y-6">
      <Card title="Your Achievements">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border-2 ${
                achievement.earned ? "border-green-200 bg-green-50" : "border-gray-200 bg-gray-50"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`text-2xl ${achievement.earned ? `text-${achievement.color}-500` : "text-gray-400"}`}>
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold ${achievement.earned ? "text-gray-800" : "text-gray-500"}`}>
                    {achievement.title}
                  </h4>
                  <p className={`text-sm ${achievement.earned ? "text-gray-600" : "text-gray-400"}`}>
                    {achievement.description}
                  </p>
                  {achievement.earned && achievement.earnedDate && (
                    <p className="text-xs text-green-600 mt-1">
                      Earned on {moment(achievement.earnedDate).format("MMM DD, YYYY")}
                    </p>
                  )}
                </div>
                {achievement.earned && <CheckCircleOutlined className="text-green-500 text-xl" />}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )

  const renderCertificateModal = () => (
    <Modal
      title="Course Completion Certificate"
      open={showCertificate}
      onCancel={() => setShowCertificate(false)}
      width={800}
      footer={[
        <Button key="download" type="primary" icon={<DownloadOutlined />}>
          Download Certificate
        </Button>,
        <Button key="share" icon={<ShareAltOutlined />}>
          Share on LinkedIn
        </Button>,
        <Button key="close" onClick={() => setShowCertificate(false)}>
          Close
        </Button>,
      ]}
    >
      <div className="text-center py-8 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
        <div className="border-4 border-gold-400 p-8 bg-white rounded-lg mx-4">
          <TrophyOutlined className="text-6xl text-yellow-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Certificate of Completion</h2>
          <Divider />
          <p className="text-lg text-gray-700 mb-4">This certifies that</p>
          <h3 className="text-xl font-bold text-blue-600 mb-4">[Student Name]</h3>
          <p className="text-lg text-gray-700 mb-4">has successfully completed</p>
          <h4 className="text-lg font-semibold text-gray-800 mb-6">{courseData.title}</h4>
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div>
              <p>Instructor: {courseData.instructor}</p>
            </div>
            <div>
              <p>Date: {moment().format("MMMM DD, YYYY")}</p>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )

  return (
    <div>
      <Tabs defaultActiveKey="overview">
        <TabPane tab="Overview" key="overview">
          {renderOverviewTab()}
        </TabPane>
        <TabPane tab="Activity" key="activity">
          {renderActivityTab()}
        </TabPane>
        <TabPane tab="Achievements" key="achievements">
          {renderAchievementsTab()}
        </TabPane>
      </Tabs>

      {/* Certificate Button */}
      {progress.overall >= 100 && (
        <Card className="mt-6 text-center bg-gradient-to-r from-yellow-50 to-orange-50">
          <TrophyOutlined className="text-4xl text-yellow-500 mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">Congratulations! 🎉</h3>
          <p className="text-gray-600 mb-4">You've completed the entire course. Download your certificate!</p>
          <Button type="primary" size="large" icon={<DownloadOutlined />} onClick={() => setShowCertificate(true)}>
            Get Certificate
          </Button>
        </Card>
      )}

      {renderCertificateModal()}
    </div>
  )
}

export default ProgressDashboard
