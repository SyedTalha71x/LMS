"use client"

import { Tabs, Card, Typography, Row, Col, List, Button, Avatar, Rate, Divider, Badge } from "antd"
import {
  CheckCircleOutlined,
  FileTextOutlined,
  DownloadOutlined,
  BookOutlined,
  QuestionCircleOutlined,
  TrophyOutlined,
} from "@ant-design/icons"

const { TabPane } = Tabs
const { Title, Text, Paragraph } = Typography

const TabContent = ({ activeTab, setActiveTab, currentCourse, setReviewModalVisible, handleDownload }) => {
  return (
    <div className="md:p-4 p-2">
      <Tabs activeKey={activeTab} onChange={setActiveTab} className="mt-6">
        <TabPane tab="Overview" key="overview">
          <div className="space-y-6">
            <div>
              <Title level={4}>About this course</Title>
              <Paragraph className="text-gray-600 leading-relaxed">{currentCourse?.description}</Paragraph>
            </div>

            <div>
              <Title level={4}>What you'll learn</Title>
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <CheckCircleOutlined className="text-green-500 mt-1 flex-shrink-0" />
                      <Text>Advanced clinical pharmacy concepts and patient care</Text>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircleOutlined className="text-green-500 mt-1 flex-shrink-0" />
                      <Text>Drug therapy optimization and clinical decision-making</Text>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircleOutlined className="text-green-500 mt-1 flex-shrink-0" />
                      <Text>Therapeutic drug monitoring principles</Text>
                    </li>
                  </ul>
                </Col>
                <Col xs={24} md={12}>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <CheckCircleOutlined className="text-green-500 mt-1 flex-shrink-0" />
                      <Text>Pharmacokinetics and pharmacodynamics in practice</Text>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircleOutlined className="text-green-500 mt-1 flex-shrink-0" />
                      <Text>Patient assessment and care planning</Text>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircleOutlined className="text-green-500 mt-1 flex-shrink-0" />
                      <Text>Clinical pharmacy guidelines and best practices</Text>
                    </li>
                  </ul>
                </Col>
              </Row>
            </div>

            <div>
              <Title level={4}>Course Resources</Title>
              <List
                dataSource={currentCourse?.resources || []}
                renderItem={(resource) => (
                  <List.Item
                    key={resource.id}
                    actions={[
                      <Button
                        key={`download-${resource.id}`}
                        type="link"
                        icon={<DownloadOutlined />}
                        onClick={() => handleDownload(resource)}
                      >
                        {resource.type === "link" ? "Visit" : "Download"}
                      </Button>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<FileTextOutlined className="text-blue-500 text-lg" />}
                      title={resource.title}
                      description={resource.description}
                    />
                  </List.Item>
                )}
              />
            </div>
          </div>
        </TabPane>

        <TabPane tab="Announcements" key="announcements">
          <div className="space-y-4">
            <Card>
              <div className="flex items-start space-x-3">
                <Avatar src="/api/placeholder/40/40" />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Text strong>{currentCourse?.instructor}</Text>
                    <Text type="secondary">2 days ago</Text>
                  </div>
                  <Title level={5}>Welcome to the Course!</Title>
                  <Paragraph>
                    Welcome everyone to {currentCourse?.title}! I'm excited to have you all here. Please make sure to
                    check the course materials and don't hesitate to ask questions in the Q&A section.
                  </Paragraph>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-start space-x-3">
                <Avatar src="/api/placeholder/40/40" />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Text strong>{currentCourse?.instructor}</Text>
                    <Text type="secondary">1 week ago</Text>
                  </div>
                  <Title level={5}>Assignment Deadline Reminder</Title>
                  <Paragraph>
                    Just a friendly reminder that the first assignment is due next week. Please review the requirements
                    in the course materials section.
                  </Paragraph>
                </div>
              </div>
            </Card>
          </div>
        </TabPane>

        <TabPane tab="Reviews" key="reviews">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-4 mb-2">
                  <div className="flex items-center space-x-2">
                    <Rate disabled defaultValue={4.5} />
                    <Text strong className="text-lg">
                      4.5
                    </Text>
                  </div>
                  <Text type="secondary">(1,234 reviews)</Text>
                </div>
                <Button type="primary" onClick={() => setReviewModalVisible(true)}>
                  Leave a Review
                </Button>
              </div>
            </div>

            <Divider />

            <div className="space-y-4">
              {[1, 2, 3].map((review) => (
                <Card key={review} className="border-0 shadow-sm">
                  <div className="flex items-start space-x-3">
                    <Avatar src={`/api/placeholder/40/40`} />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Text strong>Student {review}</Text>
                        <Rate disabled defaultValue={5} className="text-sm" />
                        <Text type="secondary">2 weeks ago</Text>
                      </div>
                      <Paragraph>
                        Excellent course! The instructor explains complex concepts very clearly and the practical
                        examples are really helpful. Highly recommended for anyone in the pharmaceutical field.
                      </Paragraph>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabPane>

        <TabPane tab="Q&A" key="qa">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Title level={4}>Questions & Answers</Title>
              <Button type="primary">Ask a Question</Button>
            </div>

            <div className="space-y-4">
              {[1, 2].map((qa) => (
                <Card key={qa}>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Avatar src={`/api/placeholder/32/32`} />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <Text strong>Student {qa}</Text>
                          <Text type="secondary">3 days ago</Text>
                        </div>
                        <Text>How do I calculate the therapeutic window for a specific drug?</Text>
                      </div>
                    </div>

                    <div className="ml-11 pl-3 border-l-2 border-gray-200">
                      <div className="flex items-start space-x-3">
                        <Avatar src="/api/placeholder/32/32" />
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <Text strong>{currentCourse?.instructor}</Text>
                            <Badge count="Instructor" className="bg-blue-500" />
                            <Text type="secondary">2 days ago</Text>
                          </div>
                          <Text>
                            Great question! The therapeutic window is calculated by determining the minimum effective
                            concentration and the minimum toxic concentration...
                          </Text>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </TabPane>


        <TabPane tab="Learning Tools" key="tools">
          <div className="space-y-6">
            <Title level={4}>Learning Tools</Title>

            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} md={8}>
                <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
                  <DownloadOutlined className="text-3xl text-blue-500 mb-3" />
                  <Title level={5}>Download Resources</Title>
                  <Text type="secondary">Access course materials offline</Text>
                </Card>
              </Col>

              <Col xs={24} sm={12} md={8}>
                <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
                  <QuestionCircleOutlined className="text-3xl text-green-500 mb-3" />
                  <Title level={5}>Practice Quizzes</Title>
                  <Text type="secondary">Test your knowledge</Text>
                </Card>
              </Col>

              <Col xs={24} sm={12} md={8}>
                <Card className="text-center hover:shadow-md transition-shadow cursor-pointer">
                  <TrophyOutlined className="text-3xl text-orange-500 mb-3" />
                  <Title level={5}>Assignments</Title>
                  <Text type="secondary">Complete practical exercises</Text>
                </Card>
              </Col>
            </Row>
          </div>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default TabContent
