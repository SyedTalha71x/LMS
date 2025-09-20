
import { Button, Typography } from "antd"
import { MenuOutlined } from "@ant-design/icons"
import { Menu } from "lucide-react"

const { Title, Text } = Typography

const CourseHeader = ({ currentCourse, isMobile, setSidebarVisible }) => {
  return (
    <div className="bg-[#357ABD] shadow-lg px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {isMobile && (
            <Menu
              type="text"
              onClick={() => setSidebarVisible(true)}
              className="hover:bg-blue-700 text-white border-none"
            />
          )}
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
            <Title level={isMobile ? 4 : 2} className="!text-white !mb-0 font-bold">
              {currentCourse.title}
            </Title>
            <Text className="!text-blue-100 text-sm sm:text-base">by {currentCourse.instructor}</Text>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseHeader
