/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { 
  Card, 
  Typography, 
  Button, 
  Row,
  Col,
  Progress
} from "antd";
import { 
  BookOutlined,
  FileTextOutlined,
  QuestionCircleOutlined,
  BellOutlined
} from "@ant-design/icons";
import { notificationsData } from "../../utils/notificationsData";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const NotificationPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(notificationsData);


  const handleNotificationClick = (notification) => {
    console.log(notification.type);
  
    if (notification.type === "course") {
      navigate("/learner-dashboard/courses");
    } else if (notification.type === "assignments") {
      navigate("/learner-dashboard/assignments");
    } else if (notification.type === "discussion") {
      navigate("/learner-dashboard/messages");
    }
  };
  

  const getButtonText = (notification) => {
    if (notification.type === "document") return "Documents";
    if (notification.isAssignment) return "Go to Assignment";
    if (notification.isQuiz) return "Take Quiz";
    if (notification.type === "discussion") return "Join Discussion";
    return "Continue Course";
  };

  const getNotificationIcon = (notification) => {
    if (notification.isAssignment) return <FileTextOutlined />;
    if (notification.isQuiz) return <QuestionCircleOutlined />;
    if (notification.type === "discussion") return <BellOutlined />;
    return <BookOutlined />;
  };

  const NotificationImage = ({ title, type, isAssignment, isQuiz }) => (
    <div
      style={{
        width: '100%',
        height: '100px',
        background: '#357ABD',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '16px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '-15px',
          right: '-15px',
          width: '50px',
          height: '50px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-20px',
          left: '-20px',
          width: '60px',
          height: '60px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '50%',
        }}
      />
      {getNotificationIcon({ type, isAssignment, isQuiz })}
      <Text style={{ 
        color: 'white', 
        fontSize: '12px', 
        fontWeight: 600, 
        textAlign: 'center',
        padding: '0 8px',
        lineHeight: '1.2',
        marginTop: '4px'
      }}>
        {title.length > 20 ? title.substring(0, 20) + '...' : title}
      </Text>
    </div>
  );

  return (
    <div className="min-h-screen p-3">
      <div >
        <Title level={2} style={{ marginBottom: '32px', color: "#262626", fontSize: "28px" }}>
          Notifications
        </Title>
        
        <Row gutter={[16, 16]}>
          {notifications.map((notification) => (
            <Col xs={24} sm={12} lg={8} key={notification.id}>
              <Card
                hoverable
                style={{
                  backgroundColor: '#F9F9F9',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  height: '100%',
                }}
                styles={{
                  body: { 
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                  }
                }}
              >
                <div style={{ flex: 1 }}>
                  <NotificationImage 
                    title={notification.title}
                    type={notification.type}
                    isAssignment={notification.isAssignment}
                    isQuiz={notification.isQuiz}
                  />
                  
                  <Title level={5} style={{ 
                    marginBottom: '8px', 
                    fontWeight: 600,
                    fontSize: '16px',
                    lineHeight: '1.4'
                  }}>
                    {notification.title}
                  </Title>
                  
                  {notification.description && (
                    <Text type="secondary" style={{ 
                      fontSize: '13px', 
                      display: 'block', 
                      marginBottom: '12px',
                      lineHeight: '1.4'
                    }}>
                      {notification.description}
                    </Text>
                  )}

                  {notification.date && (
                    <Text type="secondary" style={{ 
                      fontSize: '12px', 
                      display: 'block', 
                      marginBottom: '16px' 
                    }}>
                      {notification.date}
                    </Text>
                  )}

                  {notification.type === "course" && notification.progress !== null && (
                    <div style={{ marginBottom: '20px' }}>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        marginBottom: '8px'
                      }}>
                        <Text strong style={{ fontSize: '12px', color: '#666' }}>
                          Progress
                        </Text>
                        <Text style={{ fontSize: '12px', color: '#666' }}>
                          {notification.progress}%
                        </Text>
                      </div>
                      <Progress 
                        percent={notification.progress} 
                        showInfo={false}
                        strokeColor="#0B5D3A"
                        trailColor="#e5e5e5"
                        size="small"
                      />
                    </div>
                  )}
                </div>

                <Button
                  type="primary"
                  onClick={() => handleNotificationClick(notification)}
                  block
                  style={{
                    backgroundColor: '#1E1E1F',
                    borderColor: '#1E1E1F',
                    fontSize: '13px',
                    fontWeight: 600,
                    height: '38px',
                    borderRadius: '8px',
                    marginTop: 'auto'
                  }}
                >
                  {getButtonText(notification)}
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default NotificationPage;