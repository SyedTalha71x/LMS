/* eslint-disable no-unused-vars */

import { useState } from "react"
import { Card, Button, Input, Avatar, Tag, Dropdown, Menu, Modal, Rate } from "antd"
import {
  MessageOutlined,
  LikeOutlined,
  DislikeOutlined,
  MoreOutlined,
  FlagOutlined,
  EditOutlined,
  DeleteOutlined,
  PushpinOutlined,
  UserOutlined,
} from "@ant-design/icons"
import moment from "moment"
import { Reply } from "lucide-react"

const { TextArea } = Input

const DiscussionPanel = ({ itemId, itemTitle }) => {
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      content: "Great explanation of React components! The examples really helped me understand the concept better.",
      timestamp: "2024-01-15 10:30",
      likes: 5,
      dislikes: 0,
      replies: [
        {
          id: 11,
          author: "Mike Chen",
          avatar: "/placeholder.svg?height=32&width=32",
          content: "I agree! The visual examples made it much clearer.",
          timestamp: "2024-01-15 11:15",
          likes: 2,
          dislikes: 0,
        },
      ],
      isPinned: false,
      isInstructor: false,
    },
    {
      id: 2,
      author: "John Smith",
      avatar: "/placeholder.svg?height=32&width=32",
      content:
        "Quick clarification on the component lifecycle - this applies to both class and functional components with hooks, correct?",
      timestamp: "2024-01-15 14:20",
      likes: 3,
      dislikes: 0,
      replies: [
        {
          id: 21,
          author: "Dr. Emily Davis",
          avatar: "/placeholder.svg?height=32&width=32",
          content:
            "Excellent question! Yes, the lifecycle concepts apply to both, though the implementation differs. Functional components use useEffect hook to handle lifecycle events.",
          timestamp: "2024-01-15 15:45",
          likes: 8,
          dislikes: 0,
          isInstructor: true,
        },
      ],
      isPinned: true,
      isInstructor: false,
    },
  ])

  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState(null)
  const [replyText, setReplyText] = useState("")
  const [showRatingModal, setShowRatingModal] = useState(false)
  const [contentRating, setContentRating] = useState(0)

  const handleAddComment = () => {
    if (!newComment.trim()) return

    const comment = {
      id: Date.now(),
      author: "Current User",
      avatar: "/placeholder.svg?height=32&width=32",
      content: newComment,
      timestamp: moment().format("YYYY-MM-DD HH:mm"),
      likes: 0,
      dislikes: 0,
      replies: [],
      isPinned: false,
      isInstructor: false,
    }

    setComments([comment, ...comments])
    setNewComment("")
  }

  const handleAddReply = (commentId) => {
    if (!replyText.trim()) return

    const reply = {
      id: Date.now(),
      author: "Current User",
      avatar: "/placeholder.svg?height=32&width=32",
      content: replyText,
      timestamp: moment().format("YYYY-MM-DD HH:mm"),
      likes: 0,
      dislikes: 0,
      isInstructor: false,
    }

    setComments(
      comments.map((comment) =>
        comment.id === commentId ? { ...comment, replies: [...comment.replies, reply] } : comment,
      ),
    )

    setReplyText("")
    setReplyingTo(null)
  }

  const handleLike = (commentId, isReply = false, parentId = null) => {
    if (isReply) {
      setComments(
        comments.map((comment) =>
          comment.id === parentId
            ? {
                ...comment,
                replies: comment.replies.map((reply) =>
                  reply.id === commentId ? { ...reply, likes: reply.likes + 1 } : reply,
                ),
              }
            : comment,
        ),
      )
    } else {
      setComments(
        comments.map((comment) => (comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment)),
      )
    }
  }

  const getActionMenu = (comment) => (
    <Menu>
      <Menu.Item key="reply" icon={<Reply />}>
        Reply
      </Menu.Item>
      <Menu.Item key="flag" icon={<FlagOutlined />}>
        Report
      </Menu.Item>
      {comment.author === "Current User" && (
        <>
          <Menu.Item key="edit" icon={<EditOutlined />}>
            Edit
          </Menu.Item>
          <Menu.Item key="delete" icon={<DeleteOutlined />} danger>
            Delete
          </Menu.Item>
        </>
      )}
    </Menu>
  )

  const renderComment = (comment, isReply = false, parentId = null) => (
    <div key={comment.id} className={`${isReply ? "ml-12 mt-3" : "mb-4"}`}>
      <div className="flex space-x-3">
        <Avatar src={comment.avatar} icon={<UserOutlined />} size={isReply ? "small" : "default"} />
        <div className="flex-1">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-gray-800">{comment.author}</span>
                {comment.isInstructor && (
                  <Tag color="gold" size="small">
                    Instructor
                  </Tag>
                )}
                {comment.isPinned && !isReply && <PushpinOutlined className="text-blue-500" />}
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">{moment(comment.timestamp).fromNow()}</span>
                <Dropdown overlay={getActionMenu(comment)} trigger={["click"]}>
                  <Button type="text" size="small" icon={<MoreOutlined />} />
                </Dropdown>
              </div>
            </div>

            <p className="text-gray-700 mb-2">{comment.content}</p>

            <div className="flex items-center space-x-4">
              <Button
                type="text"
                size="small"
                icon={<LikeOutlined />}
                onClick={() => handleLike(comment.id, isReply, parentId)}
              >
                {comment.likes}
              </Button>
              <Button type="text" size="small" icon={<DislikeOutlined />}>
                {comment.dislikes}
              </Button>
              {!isReply && (
                <Button
                  type="text"
                  size="small"
                  icon={<Reply />}
                  onClick={() => setReplyingTo(comment.id)}
                >
                  Reply
                </Button>
              )}
            </div>
          </div>

          {/* Replies */}
          {!isReply && comment.replies && comment.replies.map((reply) => renderComment(reply, true, comment.id))}

          {/* Reply Input */}
          {replyingTo === comment.id && (
            <div className="mt-3 ml-12">
              <TextArea
                rows={2}
                placeholder="Write a reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="mb-2"
              />
              <div className="flex space-x-2">
                <Button type="primary" size="small" onClick={() => handleAddReply(comment.id)}>
                  Reply
                </Button>
                <Button
                  size="small"
                  onClick={() => {
                    setReplyingTo(null)
                    setReplyText("")
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Discussion Header */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <MessageOutlined className="text-blue-500" />
            <h3 className="text-lg font-semibold">Discussion</h3>
            <Tag color="blue">{comments.length} comments</Tag>
          </div>
          <Button type="link" onClick={() => setShowRatingModal(true)}>
            Rate this content
          </Button>
        </div>

        {/* New Comment Input */}
        <div className="space-y-3">
          <TextArea
            rows={3}
            placeholder="Share your thoughts, ask questions, or help other students..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="flex justify-end">
            <Button type="primary" onClick={handleAddComment} disabled={!newComment.trim()}>
              Post Comment
            </Button>
          </div>
        </div>
      </Card>

      {/* Comments List */}
      <Card title="Comments" className="min-h-64">
        {comments.length > 0 ? (
          <div>
            {comments
              .sort((a, b) => (b.isPinned ? 1 : 0) - (a.isPinned ? 1 : 0))
              .map((comment) => renderComment(comment))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <MessageOutlined className="text-4xl mb-2" />
            <p>No comments yet. Be the first to start the discussion!</p>
          </div>
        )}
      </Card>

      {/* Content Rating Modal */}
      <Modal
        title="Rate This Content"
        open={showRatingModal}
        onCancel={() => setShowRatingModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowRatingModal(false)}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              setShowRatingModal(false)
              // Handle rating submission
            }}
          >
            Submit Rating
          </Button>,
        ]}
      >
        <div className="text-center py-4">
          <h4 className="mb-4">How would you rate this lesson?</h4>
          <Rate value={contentRating} onChange={setContentRating} style={{ fontSize: "24px" }} />
          <div className="mt-4">
            <TextArea rows={3} placeholder="Optional: Share what you liked or what could be improved..." />
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default DiscussionPanel
