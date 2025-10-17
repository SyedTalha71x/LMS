"use client"

import { useState, useEffect } from "react"
import { Card, Button, Radio, Checkbox, Progress, Modal, message, Typography, Space, Tag, Divider, Result } from "antd"
import { CheckCircleOutlined, ClockCircleOutlined, ArrowRightOutlined, ArrowLeftOutlined } from "@ant-design/icons"

const { Title, Text, Paragraph } = Typography

const QuizViewer = ({ quiz, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(quiz.content.timeLimit)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)

  const questions = quiz.content.questions || []
  const currentQuestion = questions[currentQuestionIndex]
  const totalQuestions = questions.length

  // Timer effect
  useEffect(() => {
    if (timeLeft <= 0 && !isSubmitted) {
      handleSubmitQuiz()
      return
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [timeLeft, isSubmitted])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  const handleAnswerChange = (value) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value,
    })
  }

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  const calculateScore = () => {
    let correctCount = 0
    questions.forEach((question) => {
      const userAnswer = answers[question.id]
      if (question.type === "multiple-choice") {
        if (userAnswer === question.correct) {
          correctCount++
        }
      } else if (question.type === "multiple-select") {
        if (
          Array.isArray(userAnswer) &&
          Array.isArray(question.correct) &&
          userAnswer.length === question.correct.length &&
          userAnswer.every((ans) => question.correct.includes(ans))
        ) {
          correctCount++
        }
      }
    })
    return Math.round((correctCount / totalQuestions) * 100)
  }

  const handleSubmitQuiz = () => {
    Modal.confirm({
      title: "Submit Quiz",
      content: `You have answered ${Object.keys(answers).length} out of ${totalQuestions} questions. Are you sure you want to submit?`,
      okText: "Submit",
      cancelText: "Cancel",
      onOk() {
        const finalScore = calculateScore()
        setScore(finalScore)
        setIsSubmitted(true)
        setShowResults(true)
        onComplete(quiz.id)
        message.success("Quiz submitted successfully!")
      },
    })
  }

  if (showResults) {
    const passed = score >= quiz.content.passingScore
    return (
      <Card>
        <Result
          status={passed ? "success" : "error"}
          title={passed ? "Quiz Passed!" : "Quiz Failed"}
          subTitle={`Your Score: ${score}% (Passing Score: ${quiz.content.passingScore}%)`}
          extra={[
            <Button type="primary" key="review" onClick={() => setShowResults(false)}>
              Review Answers
            </Button>,
          ]}
        />
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Quiz Header */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div>
            <Title level={3}>{quiz.title}</Title>
            <div className="flex items-center space-x-4 text-gray-600">
              <span className="flex items-center space-x-1">
                <ClockCircleOutlined />
                <span>Time Left: {formatTime(timeLeft)}</span>
              </span>
              <span>Passing Score: {quiz.content.passingScore}%</span>
              <span>Attempts: {quiz.content.attempts || "Unlimited"}</span>
            </div>
          </div>
        </div>

        <Divider />

        <div>
          <Title level={5}>Instructions</Title>
          <Paragraph>
            This quiz contains {totalQuestions} questions. You have {formatTime(quiz.content.timeLimit)} to complete it.
            You must score at least {quiz.content.passingScore}% to pass.
          </Paragraph>
        </div>
      </Card>

      {/* Progress */}
      <Card>
        <div className="flex items-center justify-between mb-2">
          <Text strong>
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </Text>
          <Text type="secondary">{Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)}% Complete</Text>
        </div>
        <Progress percent={Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100)} />
      </Card>

      {/* Question */}
      <Card>
        <Title level={4}>{currentQuestion?.question}</Title>

        <div className="space-y-3 my-6">
          {currentQuestion?.type === "multiple-choice" && (
            <Radio.Group
              value={answers[currentQuestion.id]}
              onChange={(e) => handleAnswerChange(e.target.value)}
              className="w-full"
            >
              <Space direction="vertical" className="w-full">
                {currentQuestion.options.map((option, index) => (
                  <Radio key={index} value={index} className="w-full">
                    {option}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          )}

          {currentQuestion?.type === "multiple-select" && (
            <Checkbox.Group
              value={answers[currentQuestion.id] || []}
              onChange={(value) => handleAnswerChange(value)}
              className="w-full"
            >
              <Space direction="vertical" className="w-full">
                {currentQuestion.options.map((option, index) => (
                  <Checkbox key={index} value={index} className="w-full">
                    {option}
                  </Checkbox>
                ))}
              </Space>
            </Checkbox.Group>
          )}
        </div>

        {answers[currentQuestion?.id] !== undefined && (
          <Tag color="green" icon={<CheckCircleOutlined />}>
            Answered
          </Tag>
        )}
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button icon={<ArrowLeftOutlined />} onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
          Previous
        </Button>

        <div className="flex space-x-2">
          {Array.from({ length: totalQuestions }).map((_, index) => (
            <Button
              key={index}
              type={currentQuestionIndex === index ? "primary" : "default"}
              onClick={() => setCurrentQuestionIndex(index)}
              className="w-10 h-10 p-0"
            >
              {index + 1}
            </Button>
          ))}
        </div>

        <div className="flex space-x-2">
          <Button
            icon={<ArrowRightOutlined />}
            onClick={handleNext}
            disabled={currentQuestionIndex === totalQuestions - 1}
          >
            Next
          </Button>
          <Button type="primary" onClick={handleSubmitQuiz}>
            Submit Quiz
          </Button>
        </div>
      </div>
    </div>
  )
}

export default QuizViewer
