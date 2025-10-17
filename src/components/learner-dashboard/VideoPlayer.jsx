/* eslint-disable no-unused-vars */
"use client"

import { useState, useRef } from "react"
import ReactPlayer from "react-player"
import { Button, Slider, Dropdown, Modal, Input, List, Tooltip, message, Checkbox } from "antd"
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
  BookFilled,
  FileTextOutlined,
} from "@ant-design/icons"  

const EnhancedVideoPlayer = ({ currentVideo, onComplete, markAsCompleted }) => {
  const playerRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [played, setPlayed] = useState(0)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showCaptions, setShowCaptions] = useState(true)
  const [bookmarks, setBookmarks] = useState(currentVideo?.content?.bookmarks || [])
  const [notes, setNotes] = useState([])
  const [showNotesModal, setShowNotesModal] = useState(false)
  const [currentNote, setCurrentNote] = useState("")
  const [showTranscript, setShowTranscript] = useState(false)
  const [showBookmarks, setShowBookmarks] = useState(false)
  const [newBookmark, setNewBookmark] = useState("")
  const containerRef = useRef(null)

  const formatTime = (seconds) => {
    if (!seconds) return "0:00"
    const date = new Date(seconds * 1000)
    const hh = date.getUTCHours()
    const mm = date.getUTCMinutes()
    const ss = ("0" + date.getUTCSeconds()).slice(-2)
    if (hh) {
      return `${hh}:${("0" + mm).slice(-2)}:${ss}`
    }
    return `${mm}:${ss}`
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleProgress = (state) => {
    setPlayed(state.played)
    // Auto-mark complete at 90% watched
    if (state.played >= 0.9 && !currentVideo?.completed) {
      markAsCompleted(currentVideo?.id)
    }
  }

  const handleDuration = (duration) => {
    setDuration(duration)
  }

  const handleSeek = (value) => {
    setPlayed(value)
    playerRef.current.seekTo(value)
  }

  const handleAddBookmark = () => {
    if (newBookmark.trim()) {
      const newBookmarkObj = {
        time: formatTime(duration * played),
        title: newBookmark,
        seconds: duration * played,
      }
      setBookmarks([...bookmarks, newBookmarkObj])
      setNewBookmark("")
      message.success("Bookmark added!")
    }
  }

  const handleAddNote = () => {
    if (currentNote.trim()) {
      const note = {
        id: Date.now(),
        time: formatTime(duration * played),
        content: currentNote,
        timestamp: new Date().toLocaleString(),
      }
      setNotes([...notes, note])
      setCurrentNote("")
      message.success("Note added!")
    }
  }

  const handleBookmarkClick = (bookmark) => {
    playerRef.current.seekTo(bookmark.seconds / duration)
    setIsPlaying(true)
  }

  const handleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen()
      }
    } else {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      }
    }
    setIsFullscreen(!isFullscreen)
  }

  const playbackRateMenu = {
    items: [
      { label: "0.5x", key: "0.5", onClick: () => setPlaybackRate(0.5) },
      { label: "0.75x", key: "0.75", onClick: () => setPlaybackRate(0.75) },
      { label: "1x", key: "1", onClick: () => setPlaybackRate(1) },
      { label: "1.25x", key: "1.25", onClick: () => setPlaybackRate(1.25) },
      { label: "1.5x", key: "1.5", onClick: () => setPlaybackRate(1.5) },
      { label: "2x", key: "2", onClick: () => setPlaybackRate(2) },
    ],
  }

  if (!currentVideo) {
    return (
      <div className="bg-black rounded-lg overflow-hidden aspect-video flex items-center justify-center">
        <div className="text-white text-center">
          <PlayCircleOutlined className="text-6xl mb-4" />
          <p>Select a video to start learning</p>
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="bg-black rounded-lg overflow-hidden">
      <div className="aspect-video bg-gray-900 relative group">
        <ReactPlayer
          ref={playerRef}
          url={currentVideo.content?.videoUrl || "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}
          playing={isPlaying}
          controls={false}
          width="100%"
          height="100%"
          onProgress={handleProgress}
          onDuration={handleDuration}
          playbackRate={playbackRate}
          config={{
            youtube: {
              playerVars: { showinfo: 1, controls: 0, modestbranding: 1 },
            },
          }}
        />

        {/* Video Controls Overlay */}
        <div className="absolute bottom-0 enhanced-video-player left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* Progress Bar */}
          <div className="mb-3">
            <Slider
              min={0}
              max={1}
              step={0.001}
              value={played}
              onChange={handleSeek}
              className="mb-2"
              tooltip={{ formatter: (value) => formatTime(duration * value) }}
            />
            <div className="flex justify-between text-white text-xs">
              <span>{formatTime(duration * played)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center space-x-2">
              <Button
                type="text"
                icon={isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                onClick={handlePlayPause}
                className="text-white hover:text-blue-400"
                size="large"
              />

              <Dropdown menu={playbackRateMenu}>
                <Button type="text" className="text-white hover:text-blue-400">
                  {playbackRate}x
                </Button>
              </Dropdown>

              <Tooltip title="Add Bookmark">
                <Button
                  type="text"
                  onClick={() => setShowBookmarks(!showBookmarks)}
                  className="text-white hover:text-blue-400"
                />
              </Tooltip>

              <Tooltip title="Add Note">
                <Button
                  type="text"
                  icon={<FileTextOutlined />}
                  onClick={() => setShowNotesModal(true)}
                  className="text-white hover:text-blue-400"
                />
              </Tooltip>

              <Tooltip title="Transcript">
                <Button
                  type="text"
                  icon={<FileTextOutlined />}
                  onClick={() => setShowTranscript(!showTranscript)}
                  className="text-white hover:text-blue-400"
                />
              </Tooltip>

              <Checkbox
                checked={showCaptions}
                onChange={(e) => setShowCaptions(e.target.checked)}
                className="text-white"
              >
                CC
              </Checkbox>
            </div>

            <Button
              type="text"
              icon={isFullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
              onClick={handleFullscreen}
              className="text-white hover:text-blue-400"
            />
          </div>
        </div>
      </div>

      {/* Bookmarks Panel */}
      {showBookmarks && (
        <div className="bg-gray-100 p-4 border-t">
          <div className="flex items-center space-x-2 mb-3">
            <Input
              placeholder="Add bookmark..."
              value={newBookmark}
              onChange={(e) => setNewBookmark(e.target.value)}
              onPressEnter={handleAddBookmark}
            />
            <Button type="primary" onClick={handleAddBookmark}>
              Add
            </Button>
          </div>
          <List
            dataSource={bookmarks}
            renderItem={(bookmark) => (
              <List.Item
                key={bookmark.time}
                onClick={() => handleBookmarkClick(bookmark)}
                className="cursor-pointer hover:bg-gray-200 px-2 py-1 rounded"
              >
                <BookFilled className="text-yellow-500 mr-2" />
                <span className="font-mono text-sm">{bookmark.time}</span>
                <span className="ml-2">{bookmark.title}</span>
              </List.Item>
            )}
          />
        </div>
      )}

      {/* Transcript Panel */}
      {showTranscript && (
        <div className="bg-gray-100 p-4 border-t max-h-48 overflow-y-auto">
          <p className="text-sm text-gray-700">
            {currentVideo.content?.transcript || "Transcript not available for this video."}
          </p>
        </div>
      )}

      {/* Notes Modal */}
      <Modal
        title="Add Note"
        open={showNotesModal}
        onCancel={() => setShowNotesModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowNotesModal(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleAddNote}>
            Add Note
          </Button>,
        ]}
      >
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">Time: {formatTime(duration * played)}</p>
            <Input.TextArea
              rows={4}
              placeholder="Write your note here..."
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
            />
          </div>

          {notes.length > 0 && (
            <div>
              <h4 className="font-semibold mb-2">Your Notes</h4>
              <List
                dataSource={notes}
                renderItem={(note) => (
                  <List.Item key={note.id}>
                    <div className="w-full">
                      <div className="flex justify-between items-start">
                        <span className="font-mono text-sm text-blue-600">{note.time}</span>
                        <span className="text-xs text-gray-500">{note.timestamp}</span>
                      </div>
                      <p className="text-sm mt-1">{note.content}</p>
                    </div>
                  </List.Item>
                )}
              />
            </div>
          )}
        </div>
      </Modal>

      
    </div>
  )
}

export default EnhancedVideoPlayer
