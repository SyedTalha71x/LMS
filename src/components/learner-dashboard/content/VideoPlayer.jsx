/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react"
import { Card, Button, Slider, Select, Collapse, List, Modal, Input } from "antd"
import {
  PlayCircleOutlined,
  PauseOutlined,
  SoundOutlined,
  FullscreenOutlined,
  SettingOutlined,
} from "@ant-design/icons"
import { BookMarked } from "lucide-react"

const { Panel } = Collapse
const { Option } = Select
const { TextArea } = Input

const VideoPlayer = ({ content, onComplete, isCompleted }) => {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [quality, setQuality] = useState("720p")
  const [showCaptions, setShowCaptions] = useState(true)
  const [showTranscript, setShowTranscript] = useState(false)
  const [bookmarks, setBookmarks] = useState(content.bookmarks || [])
  const [showQuizModal, setShowQuizModal] = useState(false)
  const [currentQuiz, setCurrentQuiz] = useState(null)
  const [notes, setNotes] = useState("")

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      const updateTime = () => setCurrentTime(video.currentTime)
      const updateDuration = () => setDuration(video.duration)

      video.addEventListener("timeupdate", updateTime)
      video.addEventListener("loadedmetadata", updateDuration)

      // Check for embedded quizzes
      if (content.embeddedQuizzes) {
        content.embeddedQuizzes.forEach((quiz) => {
          if (Math.abs(video.currentTime - parseTime(quiz.time)) < 1) {
            setCurrentQuiz(quiz)
            setShowQuizModal(true)
            video.pause()
            setIsPlaying(false)
          }
        })
      }

      return () => {
        video.removeEventListener("timeupdate", updateTime)
        video.removeEventListener("loadedmetadata", updateDuration)
      }
    }
  }, [content.embeddedQuizzes])

  const parseTime = (timeString) => {
    const parts = timeString.split(":")
    return Number.parseInt(parts[0]) * 60 + Number.parseInt(parts[1])
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const togglePlay = () => {
    const video = videoRef.current
    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (value) => {
    const video = videoRef.current
    video.currentTime = value
    setCurrentTime(value)
  }

  const handleVolumeChange = (value) => {
    const video = videoRef.current
    video.volume = value
    setVolume(value)
  }

  const jumpToBookmark = (time) => {
    const video = videoRef.current
    video.currentTime = parseTime(time)
    setCurrentTime(parseTime(time))
  }

  const addBookmark = () => {
    const newBookmark = {
      time: formatTime(currentTime),
      title: `Bookmark at ${formatTime(currentTime)}`,
    }
    setBookmarks([...bookmarks, newBookmark])
  }

  const toggleFullscreen = () => {
    const video = videoRef.current
    if (video.requestFullscreen) {
      video.requestFullscreen()
    }
  }

  return (
    <div className="p-6">
      {/* Video Player */}
      <div className="relative bg-black rounded-lg overflow-hidden mb-6">
        <video
          ref={videoRef}
          className="w-full h-96 object-contain"
          src="/placeholder.mp4"
          poster="/video-thumbnail.png"
        />

        {/* Video Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          {/* Progress Bar */}
          <Slider
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            tooltip={{ formatter: formatTime }}
            className="mb-4"
          />

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                type="text"
                icon={isPlaying ? <PauseOutlined /> : <PlayCircleOutlined />}
                onClick={togglePlay}
                className="text-white hover:text-blue-400"
                size="large"
              />

              <div className="flex items-center space-x-2">
                <SoundOutlined className="text-white" />
                <Slider min={0} max={1} step={0.1} value={volume} onChange={handleVolumeChange} className="w-20" />
              </div>

              <span className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <Select value={quality} onChange={setQuality} size="small" className="w-20">
                <Option value="480p">480p</Option>
                <Option value="720p">720p</Option>
                <Option value="1080p">1080p</Option>
              </Select>

              <Button
                type="text"
                icon={<BookMarked />}
                onClick={addBookmark}
                className="text-white hover:text-blue-400"
                title="Add Bookmark"
              />

              <Button
                type="text"
                icon={<SettingOutlined />}
                className="text-white hover:text-blue-400"
                title="Settings"
              />

              <Button
                type="text"
                icon={<FullscreenOutlined />}
                onClick={toggleFullscreen}
                className="text-white hover:text-blue-400"
                title="Fullscreen"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Video Features */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Collapse defaultActiveKey={["captions"]} className="mb-4">
            {content.captions && (
              <Panel header="Captions & Transcript" key="captions">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Show Captions</span>
                    <Button
                      type={showCaptions ? "primary" : "default"}
                      size="small"
                      onClick={() => setShowCaptions(!showCaptions)}
                    >
                      {showCaptions ? "On" : "Off"}
                    </Button>
                  </div>

                  {content.transcript && (
                    <div>
                      <Button type="link" onClick={() => setShowTranscript(!showTranscript)}>
                        {showTranscript ? "Hide" : "Show"} Transcript
                      </Button>

                      {showTranscript && (
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg max-h-64 overflow-y-auto">
                          <p className="text-sm text-gray-700 leading-relaxed">{content.transcript}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </Panel>
            )}

            <Panel header="Notes" key="notes">
              <TextArea
                rows={4}
                placeholder="Take notes while watching..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </Panel>
          </Collapse>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Bookmarks */}
          {bookmarks.length > 0 && (
            <Card title="Bookmarks" size="small">
              <List
                size="small"
                dataSource={bookmarks}
                renderItem={(bookmark, index) => (
                  <List.Item
                    key={index}
                    actions={[
                      <Button type="link" size="small" onClick={() => jumpToBookmark(bookmark.time)}>
                        Jump to
                      </Button>,
                    ]}
                  >
                    <div>
                      <div className="font-medium">{bookmark.title}</div>
                      <div className="text-sm text-gray-500">{bookmark.time}</div>
                    </div>
                  </List.Item>
                )}
              />
            </Card>
          )}

          {/* Video Info */}
          <Card title="Video Information" size="small">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Duration:</span>
                <span>{formatTime(duration)}</span>
              </div>
              <div className="flex justify-between">
                <span>Quality:</span>
                <span>{quality}</span>
              </div>
              <div className="flex justify-between">
                <span>Captions:</span>
                <span>{content.captions ? "Available" : "Not Available"}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Embedded Quiz Modal */}
      <Modal title="Video Quiz" open={showQuizModal} onCancel={() => setShowQuizModal(false)} footer={null} width={600}>
        {currentQuiz && (
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">{currentQuiz.question}</h3>
            <div className="space-y-2">
              {currentQuiz.options.map((option, index) => (
                <Button
                  key={index}
                  block
                  className="text-left"
                  onClick={() => {
                    if (index === currentQuiz.correct) {
                      setShowQuizModal(false)
                      videoRef.current.play()
                      setIsPlaying(true)
                    }
                  }}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default VideoPlayer
