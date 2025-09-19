import React, { useState } from "react";
import { 
  Card, 
  Drawer, 
  Typography, 
  Tag, 
  Button, 
  Space,
  Row,
  Col,
  Descriptions
} from "antd";
import { 
  FileTextOutlined,
  CloseOutlined,
  TrophyOutlined
} from "@ant-design/icons";

const { Title, Text, Paragraph } = Typography;

const BadgesProgress = () => {
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);

  const badges = [
    {
      id: 1,
      title: "Professional Integrity Badge",
      description: "Demonstrates mastery of pharmaceutical integrity principles, ethical decision-making, and professional research standards. This badge validates your commitment to maintaining the highest standards in pharmaceutical practice.",
      percentage: 40,
      completedStages: 2,
      stage: "In Progress - Module 3",
      tags: ["Integrity", "Pharmacy", "Research"],
      details: {
        studentsEnrolled: "1,247",
        assignTeacher: "Dr. Sarah Johnson", // Fixed capitalization
        category: "Professional Development",
        location: "Online/Hybrid",
        timing: "Self-paced",
        titles: "Ethics in Pharmaceutical Practice"
      },
      documentation: "integrity_badge_requirements.pdf"
    },
    {
      id: 2,
      title: "Chemical Analysis Expert",
      description: "Advanced certification in pharmaceutical chemical analysis techniques, including spectroscopy, chromatography, and quality control methodologies for drug development and manufacturing.",
      percentage: 65,
      completedStages: 3,
      stage: "In Progress - Module 4",
      tags: ["Chemistry", "Analysis", "Research"],
      details: {
        studentsEnrolled: "856",
        assignTeacher: "Prof. Michael Chen", // Fixed capitalization
        category: "Technical Skills",
        location: "Laboratory + Online",
        timing: "16 weeks",
        titles: "Advanced Analytical Chemistry"
      },
      documentation: "chemistry_badge_requirements.pdf"
    },
    {
      id: 3,
      title: "Clinical Excellence Badge",
      description: "Recognition for outstanding clinical pharmacy practice, patient care excellence, and ethical healthcare delivery. Validates expertise in clinical decision-making and patient interaction.",
      percentage: 100, // Changed to 100 to demonstrate earned badge
      completedStages: 5, // Changed to 5 for complete
      stage: "Completed",
      tags: ["Clinical", "Patient Care", "Ethics"],
      details: {
        studentsEnrolled: "692",
        assignTeacher: "Dr. Emily Rodriguez", // Fixed capitalization
        category: "Clinical Practice",
        location: "Hospital-based",
        timing: "12 weeks",
        titles: "Clinical Pharmacy Excellence"
      },
      documentation: "clinical_badge_requirements.pdf"
    },
    {
      id: 4,
      title: "Regulatory Compliance Specialist",
      description: "Comprehensive understanding of pharmaceutical regulations, FDA guidelines, and international compliance standards. Essential for careers in regulatory affairs and quality assurance.",
      percentage: 20,
      completedStages: 1,
      stage: "Getting Started - Module 2",
      tags: ["Regulations", "Compliance", "Guidelines"],
      details: {
        studentsEnrolled: "1,125",
        assignTeacher: "Dr. Robert Kim", // Fixed capitalization
        category: "Regulatory Affairs",
        location: "Online",
        timing: "8 weeks",
        titles: "Pharmaceutical Regulations & Compliance"
      },
      documentation: "regulatory_badge_requirements.pdf"
    },
    {
      id: 5,
      title: "Advanced Pharmacology Research",
      description: "Distinguished recognition for advanced pharmacological research capabilities, drug discovery methodologies, and contribution to pharmaceutical science literature.",
      percentage: 75,
      completedStages: 4,
      stage: "Research Project Phase",
      tags: ["Pharmacology", "Research", "Advanced"],
      details: {
        studentsEnrolled: "324",
        assignTeacher: "Dr. Lisa Zhang", // Fixed capitalization
        category: "Research",
        location: "Research Lab + Online",
        timing: "20 weeks",
        titles: "Advanced Pharmacological Research"
      },
      documentation: "research_badge_requirements.pdf"
    },
    {
      id: 6,
      title: "Manufacturing Excellence GMP",
      description: "Expertise in Good Manufacturing Practices (GMP), quality systems, and pharmaceutical manufacturing processes. Critical for careers in pharmaceutical production and quality control.",
      percentage: 50,
      completedStages: 2,
      stage: "In Progress - Module 3",
      tags: ["Manufacturing", "Quality", "GMP"],
      details: {
        studentsEnrolled: "978",
        assignTeacher: "Dr. James Wilson", // Fixed capitalization
        category: "Manufacturing",
        location: "Manufacturing Facility + Online",
        timing: "14 weeks",
        titles: "GMP and Manufacturing Excellence"
      },
      documentation: "gmp_badge_requirements.pdf"
    },
  ];

  const openDrawer = (badge) => {
    setSelectedBadge(badge);
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
    setSelectedBadge(null);
  };

  const renderProgressStages = (completedStages) => {
    return (
      <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
        {[1, 2, 3, 4, 5].map((stage) => (
          <div
            key={stage}
            style={{
              height: '8px',
              flex: 1,
              backgroundColor: stage <= completedStages ? '#0B5D3A' : '#d9d9d9',
              borderRadius: stage === 1 ? '4px 0 0 4px' : stage === 5 ? '0 4px 4px 0' : '0',
            }}
          />
        ))}
      </div>
    );
  };

  const BadgeImage = ({ title, percentage }) => (
    <div
      style={{
        width: '100%',
        height: '120px',
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
          top: '-20px',
          right: '-20px',
          width: '60px',
          height: '60px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-30px',
          left: '-30px',
          width: '80px',
          height: '80px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '50%',
        }}
      />
      <TrophyOutlined style={{ fontSize: '28px', color: 'white', marginBottom: '8px' }} />
      <Text style={{ 
        color: 'white', 
        fontSize: '14px', 
        fontWeight: 600, 
        textAlign: 'center',
        padding: '0 10px',
        lineHeight: '1.2'
      }}>
        {title.length > 25 ? title.substring(0, 25) + '...' : title}
      </Text>
      {percentage === 100 && (
        <div
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: '#52c41a',
            color: 'white',
            fontSize: '10px',
            padding: '2px 6px',
            borderRadius: '10px',
            fontWeight: 'bold',
          }}
        >
          ✓ Earned
        </div>
      )}
    </div>
  );

  const handleViewRequirements = (documentation) => {
    // Simulate file viewing - in real app, this would open a PDF or navigate to requirements page
    alert(`Opening ${documentation}...`);
  };

  const handleClaimBadge = (badgeTitle) => {
    // Simulate badge claiming - in real app, this would trigger badge earning process
    alert(`Congratulations! You've claimed the ${badgeTitle}!`);
  };

  return (
    <div style={{ minHeight: '100vh', padding: '12px' }}>
      <Title level={2} style={{ marginBottom: '32px', color: "#262626", fontSize: "28px" }}>
        Badges Progress
      </Title>
      
      <Row gutter={[16, 16]}>
        {badges.map((badge) => (
          <Col xs={24} sm={12} md={8} key={badge.id}>
            <Card
              hoverable
              onClick={() => openDrawer(badge)}
              style={{
                backgroundColor: '#F2F2F2',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              styles={{
                body: { padding: '20px' }
              }}
            >
              <BadgeImage title={badge.title} percentage={badge.percentage} />
              
              <Title level={5} style={{ marginBottom: '8px', fontWeight: 600 }}>
                {badge.title}
              </Title>
              
              <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '4px' }}>
                {badge.percentage}%
              </div>
              
              <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '16px' }}>
                completion progress towards badge
              </Text>

              <div>
                <Text strong style={{ fontSize: '14px', display: 'block', marginBottom: '8px' }}>
                  Progress
                </Text>
                
                {renderProgressStages(badge.completedStages)}
                
                <Text type="secondary" style={{ fontSize: '11px', display: 'block', marginTop: '4px' }}>
                  {badge.stage}
                </Text>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Drawer
        title={null}
        placement="right"
        onClose={closeDrawer}
        open={isDrawerVisible}
        width={450}
        closeIcon={<CloseOutlined style={{ 
          color: 'white', 
          backgroundColor: '#000', 
          padding: '6px', 
          borderRadius: '4px',
          fontSize: '14px'
        }} />}
        styles={{
          body: { padding: '0' }
        }}
      >
        {selectedBadge && (
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Header with Badge Image */}
            <div style={{ padding: '24px', borderBottom: '1px solid #f0f0f0' }}>
              <BadgeImage 
                title={selectedBadge.title} 
                percentage={selectedBadge.percentage} 
              />
              <Title level={4} style={{ margin: '0 0 12px 0' }}>
                {selectedBadge.title}
              </Title>
              <Paragraph style={{ color: '#505050', fontSize: '14px', margin: 0 }}>
                {selectedBadge.description}
              </Paragraph>
            </div>

            {/* Scrollable Content */}
            <div style={{ 
              flex: 1, 
              overflowY: 'auto', 
              padding: '24px',
            }}>
              <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <div>
                  <Title level={5} style={{ color: '#666', fontWeight: 800, marginBottom: '12px' }}>
                    Tags
                  </Title>
                  <Space wrap>
                    {selectedBadge.tags.map((tag, index) => (
                      <Tag
                        key={index}
                        style={{
                          backgroundColor: '#f5f5f5',
                          color: '#666',
                          fontSize: '12px',
                          padding: '4px 12px',
                          borderRadius: '12px',
                          border: 'none',
                        }}
                      >
                        {tag}
                      </Tag>
                    ))}
                  </Space>
                </div>

                <div>
                  <Title level={5} style={{ color: '#666', fontWeight: 800, marginBottom: '12px' }}>
                    Details
                  </Title>
                  <Descriptions column={1} size="small" colon={false}>
                    <Descriptions.Item
                      label={<Text strong style={{ fontSize: '12px', color: '#999' }}>Students Enrolled:</Text>}
                      labelStyle={{ width: '130px' }}
                    >
                      <Text style={{ fontSize: '12px', color: '#666' }}>
                        {selectedBadge.details.studentsEnrolled}
                      </Text>
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={<Text strong style={{ fontSize: '12px', color: '#999' }}>Assign Teacher:</Text>}
                      labelStyle={{ width: '130px' }}
                    >
                      <Text style={{ fontSize: '12px', color: '#666' }}>
                        {selectedBadge.details.assignTeacher}
                      </Text>
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={<Text strong style={{ fontSize: '12px', color: '#999' }}>Category:</Text>}
                      labelStyle={{ width: '130px' }}
                    >
                      <Text style={{ fontSize: '12px', color: '#666' }}>
                        {selectedBadge.details.category}
                      </Text>
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={<Text strong style={{ fontSize: '12px', color: '#999' }}>Location:</Text>}
                      labelStyle={{ width: '130px' }}
                    >
                      <Text style={{ fontSize: '12px', color: '#666' }}>
                        {selectedBadge.details.location}
                      </Text>
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={<Text strong style={{ fontSize: '12px', color: '#999' }}>Timing:</Text>}
                      labelStyle={{ width: '130px' }}
                    >
                      <Text style={{ fontSize: '12px', color: '#666' }}>
                        {selectedBadge.details.timing}
                      </Text>
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={<Text strong style={{ fontSize: '12px', color: '#999' }}>Titles:</Text>}
                      labelStyle={{ width: '130px' }}
                    >
                      <Text style={{ fontSize: '12px', color: '#666' }}>
                        {selectedBadge.details.titles}
                      </Text>
                    </Descriptions.Item>
                  </Descriptions>
                </div>

                <div>
                  <Title level={5} style={{ color: '#666', fontWeight: 800, marginBottom: '12px' }}>
                    Progress
                  </Title>
                  <div>
                    {renderProgressStages(selectedBadge.completedStages)}
                    <Text type="secondary" style={{ fontSize: '11px', display: 'block', marginTop: '8px' }}>
                      {selectedBadge.stage} • {selectedBadge.completedStages}/5 Completed
                    </Text>
                  </div>
                </div>

                <div>
                  <Title level={5} style={{ color: '#666', fontWeight: 800, marginBottom: '12px' }}>
                    Badge Requirements
                  </Title>
                  <Space direction="vertical" size="small" style={{ width: '100%' }}>
                    <Button
                      type="primary"
                      icon={<FileTextOutlined />}
                      block
                      style={{
                        backgroundColor: '#1E1E1F',
                        borderColor: '#1E1E1F',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        height: '40px',
                      }}
                      onClick={() => handleViewRequirements(selectedBadge.documentation)}
                    >
                      View Requirements
                    </Button>
                    
                    <Button
                      type="default"
                      icon={<TrophyOutlined />}
                      disabled={selectedBadge.percentage !== 100}
                      block
                      style={{
                        fontSize: '12px',
                        fontWeight: 'bold',
                        height: '40px',
                        marginTop: '8px',
                        opacity: selectedBadge.percentage !== 100 ? 0.5 : 1,
                      }}
                      onClick={() => handleClaimBadge(selectedBadge.title)}
                    >
                      {selectedBadge.percentage === 100 ? "Claim Badge" : "Badge Locked"}
                    </Button>
                    
                    {selectedBadge.percentage !== 100 && (
                      <Text type="secondary" style={{ fontSize: '11px', textAlign: 'center', display: 'block' }}>
                        Complete all requirements to earn your badge
                      </Text>
                    )}
                  </Space>
                </div>
              </Space>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};

export default BadgesProgress;