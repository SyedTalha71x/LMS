/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
import { Card, Button, Radio, Checkbox, Progress, Steps, Alert, Statistic, Tag } from "antd"
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  QuestionCircleOutlined,
  TrophyOutlined,
  ReloadOutlined,
  EyeOutlined,
} from "@ant-design/icons"

const { Step } = Steps
const { Countdown } = Statistic

const QuizContent = ({ content, onComplete, isCompleted }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(content.timeLimit || 0)
  const [quizStarted, setQuizStarted] = useState(false)
  const [showReview, setShowReview] = useState(false)
  const [score, setScore] = useState(0)
  const [passed, setPassed] = useState(false)

  const questions = content.questions || []
  const totalQuestions = questions.length
  const passingScore = content.passingScore || 70

  useEffect(() => {
    let timer
    if (quizStarted && timeRemaining > 0 && !showResults) {
      timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleSubmitQuiz()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [quizStarted, timeRemaining, showResults])

  const handleStartQuiz = () => {
    setQuizStarted(true)
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setShowReview(false)
    setTimeRemaining(content.timeLimit || 0)
  }

  const handleAnswerChange = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleQuestionJump = (questionIndex) => {
    setCurrentQuestion(questionIndex)
  }

  const calculateScore = () => {
    let correctAnswers = 0

    questions.forEach((question) => {
      const userAnswer = answers[question.id]

      if (question.type === "multiple-choice") {
        if (userAnswer === question.correct) {
          correctAnswers++
        }
      } else if (question.type === "multiple-select") {
        const correctSet = new Set(question.correct)
        const userSet = new Set(userAnswer || [])

        if (correctSet.size === userSet.size && [...correctSet].every((x) => userSet.has(x))) {
          correctAnswers++
        }
      }
    })

    return Math.round((correctAnswers / totalQuestions) * 100)
  }

  const handleSubmitQuiz = () => {
    const finalScore = calculateScore()
    setScore(finalScore)
    setPassed(finalScore >= passingScore)
    setShowResults(true)

    if (finalScore >= passingScore) {
      onComplete()
    }
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getAnsweredCount = () => {
    return Object.keys(answers).length
  }

  const isQuestionAnswered = (questionIndex) => {
    const question = questions[questionIndex]
    return answers[question.id] !== undefined
  }

  const renderQuestionNavigation = () => (
    <Card title="Question Navigation" size="small" className="mb-4">
      <div className="grid grid-cols-5 gap-2">
        {questions.map((question, index) => (
          <Button
            key={index}
            size="small"
            type={currentQuestion === index ? "primary" : "default"}
            className={`${isQuestionAnswered(index) ? "border-green-500" : ""}`}
            onClick={() => handleQuestionJump(index)}
          >
            {index + 1}
            {isQuestionAnswered(index) && <CheckCircleOutlined className="ml-1 text-green-500" />}
          </Button>
        ))}
      </div>
      <div className="mt-3 text-sm text-gray-600">
        Answered: {getAnsweredCount()} / {totalQuestions}
      </div>
    </Card>
  )

  const renderQuestion = (question, index) => {
    const userAnswer = answers[question.id]

    return (
      <Card key={question.id} className="mb-4">
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <Tag color="blue">
              Question {index + 1} of {totalQuestions}
            </Tag>
            <Tag color={question.type === "multiple-choice" ? "green" : "purple"}>
              {question.type === "multiple-choice" ? "Single Choice" : "Multiple Choice"}
            </Tag>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{question.question}</h3>
        </div>

        <div className="space-y-3">
          {question.type === "multiple-choice" ? (
            <Radio.Group
              value={userAnswer}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              className="w-full"
            >
              <div className="space-y-2">
                {question.options.map((option, optionIndex) => (
                  <Radio key={optionIndex} value={optionIndex} className="block p-3 border rounded hover:bg-gray-50">
                    {option}
                  </Radio>
                ))}
              </div>
            </Radio.Group>
          ) : (
            <Checkbox.Group
              value={userAnswer || []}
              onChange={(values) => handleAnswerChange(question.id, values)}
              className="w-full"
            >
              <div className="space-y-2">
                {question.options.map((option, optionIndex) => (
                  <Checkbox key={optionIndex} value={optionIndex} className="block p-3 border rounded hover:bg-gray-50">
                    {option}
                  </Checkbox>
                ))}
              </div>
            </Checkbox.Group>
          )}
        </div>
      </Card>
    )
  }

  const renderResults = () => (
    <div className="space-y-6">
      <Card className="text-center">
        <div className="mb-4">
          {passed ? (
            <TrophyOutlined className="text-6xl text-yellow-500 mb-4" />
          ) : (
            <CloseCircleOutlined className="text-6xl text-red-500 mb-4" />
          )}
        </div>

        <h2 className="text-2xl font-bold mb-2">{passed ? "Congratulations!" : "Quiz Not Passed"}</h2>

        <p className="text-gray-600 mb-4">
          {passed
            ? "You have successfully completed the quiz!"
            : `You need ${passingScore}% to pass. You can retake the quiz.`}
        </p>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{score}%</div>
            <div className="text-sm text-gray-600">Your Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{Math.round((score / 100) * totalQuestions)}</div>
            <div className="text-sm text-gray-600">Correct Answers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">{totalQuestions}</div>
            <div className="text-sm text-gray-600">Total Questions</div>
          </div>
        </div>

        <div className="flex justify-center space-x-4">
          <Button icon={<EyeOutlined />} onClick={() => setShowReview(true)}>
            Review Answers
          </Button>
          {!passed && (
            <Button type="primary" icon={<ReloadOutlined />} onClick={handleStartQuiz}>
              Retake Quiz
            </Button>
          )}
        </div>
      </Card>
    </div>
  )

  const renderReview = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Answer Review</h3>
        <Button onClick={() => setShowReview(false)}>Back to Results</Button>
      </div>

      {questions.map((question, index) => {
        const userAnswer = answers[question.id]
        const isCorrect =
          question.type === "multiple-choice"
            ? userAnswer === question.correct
            : JSON.stringify(userAnswer?.sort()) === JSON.stringify(question.correct.sort())

        return (
          <Card key={question.id} className={`border-l-4 ${isCorrect ? "border-green-500" : "border-red-500"}`}>
            <div className="flex items-start justify-between mb-3">
              <h4 className="font-semibold">
                Question {index + 1}: {question.question}
              </h4>
              {isCorrect ? (
                <CheckCircleOutlined className="text-green-500 text-xl" />
              ) : (
                <CloseCircleOutlined className="text-red-500 text-xl" />
              )}
            </div>

            <div className="space-y-2">
              <div>
                <span className="font-medium text-gray-700">Your Answer: </span>
                <span className={isCorrect ? "text-green-600" : "text-red-600"}>
                  {question.type === "multiple-choice"
                    ? question.options[userAnswer] || "Not answered"
                    : userAnswer?.map((i) => question.options[i]).join(", ") || "Not answered"}
                </span>
              </div>

              {!isCorrect && (
                <div>
                  <span className="font-medium text-gray-700">Correct Answer: </span>
                  <span className="text-green-600">
                    {question.type === "multiple-choice"
                      ? question.options[question.correct]
                      : question.correct.map((i) => question.options[i]).join(", ")}
                  </span>
                </div>
              )}
            </div>
          </Card>
        )
      })}
    </div>
  )

  if (!quizStarted && !showResults) {
    return (
      <div className="p-6">
        <Card className="text-center">
          <QuestionCircleOutlined className="text-6xl text-blue-500 mb-4" />
          <h2 className="text-2xl font-bold mb-4">Quiz Instructions</h2>

          <div className="space-y-4 mb-6 text-left max-w-2xl mx-auto">
            <Alert
              message="Quiz Information"
              description={
                <div className="space-y-2">
                  <div>• Total Questions: {totalQuestions}</div>
                  <div>• Time Limit: {formatTime(content.timeLimit || 0)}</div>
                  <div>• Passing Score: {passingScore}%</div>
                  <div>• You can navigate between questions during the quiz</div>
                  <div>• Make sure to answer all questions before submitting</div>
                </div>
              }
              type="info"
              showIcon
            />
          </div>

          <Button type="primary" size="large" onClick={handleStartQuiz} icon={<ClockCircleOutlined />}>
            Start Quiz
          </Button>
        </Card>
      </div>
    )
  }

  if (showResults) {
    return <div className="p-6">{showReview ? renderReview() : renderResults()}</div>
  }

  return (
    <div className="p-6">
      {/* Quiz Header */}
      <Card className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold">Quiz in Progress</h2>
            <Tag color="blue">
              Question {currentQuestion + 1} of {totalQuestions}
            </Tag>
          </div>

          <div className="flex items-center space-x-4">
            {timeRemaining > 0 && (
              <div className="flex items-center space-x-2">
                <ClockCircleOutlined className="text-red-500" />
                <Countdown
                  value={Date.now() + timeRemaining * 1000}
                  format="mm:ss"
                  valueStyle={{ fontSize: "16px", color: timeRemaining < 60 ? "#ff4d4f" : "#1890ff" }}
                />
              </div>
            )}
          </div>
        </div>

        <Progress
          percent={Math.round(((currentQuestion + 1) / totalQuestions) * 100)}
          className="mt-4"
          strokeColor={{
            "0%": "#108ee9",
            "100%": "#87d068",
          }}
        />
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Quiz Area */}
        <div className="lg:col-span-3">
          {renderQuestion(questions[currentQuestion], currentQuestion)}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between">
            <Button onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
              Previous
            </Button>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {getAnsweredCount()} of {totalQuestions} answered
              </span>

              {currentQuestion === totalQuestions - 1 ? (
                <Button type="primary" onClick={handleSubmitQuiz} disabled={getAnsweredCount() === 0}>
                  Submit Quiz
                </Button>
              ) : (
                <Button type="primary" onClick={handleNextQuestion}>
                  Next
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {renderQuestionNavigation()}

          <Card title="Quiz Progress" size="small">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Completed:</span>
                <span>
                  {getAnsweredCount()}/{totalQuestions}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Remaining:</span>
                <span>{totalQuestions - getAnsweredCount()}</span>
              </div>
              {timeRemaining > 0 && (
                <div className="flex justify-between text-sm">
                  <span>Time Left:</span>
                  <span className={timeRemaining < 60 ? "text-red-500" : ""}>{formatTime(timeRemaining)}</span>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default QuizContent
