"use client"

import { Button, Typography, Progress } from "antd"
import { PlayCircleOutlined, PauseCircleOutlined, FullscreenOutlined, SettingOutlined } from "@ant-design/icons"

const { Title, Text } = Typography

const VideoPlayer = ({ currentVideo, isPlaying, togglePlay }) => {
  return (
    <div className="bg-black rounded-lg overflow-hidden relative group video-player">
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
}

export default VideoPlayer
