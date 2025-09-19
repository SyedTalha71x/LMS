import { useState } from "react"
import { 
  Card, 
  Drawer, 
  Tag, 
  Button, 
  Row, 
  Col, 
  Typography, 
  Space, 
  Descriptions,
} from 'antd'
import { FileTextOutlined, CloseOutlined } from '@ant-design/icons'
import certificates from "../../utils/certificatesData"

const { Title, Text, Paragraph } = Typography

const CertificateProgress = () => {
  const [selectedCertificate, setSelectedCertificate] = useState(null)
  const [isDrawerVisible, setIsDrawerVisible] = useState(false)

 

  const openDrawer = (certificate) => {
    setSelectedCertificate(certificate)
    setIsDrawerVisible(true)
  }

  const closeDrawer = () => {
    setSelectedCertificate(null)
    setIsDrawerVisible(false)
  }

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
    )
  }

  const CertificateImage = ({ title, percentage }) => (
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
      <FileTextOutlined style={{ fontSize: '28px', color: 'white', marginBottom: '8px' }} />
      <Text style={{ 
        color: 'white', 
        fontSize: '14px', 
        fontWeight: 600, 
        textAlign: 'center',
        padding: '0 10px',
        lineHeight: '1.2'
      }}>
        {title}
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
          ✓ Complete
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen p-3">
       <Title level={2} style={{ marginBottom: 32, color: "#262626", fontSize: "28px" }}>
          Certificates Progress
        </Title>

      <Row gutter={[16, 16]}>
        {certificates.map((certificate) => (
          <Col xs={24} sm={12} md={8} key={certificate.id}>
            <Card
              hoverable
              onClick={() => openDrawer(certificate)}
              style={{
                backgroundColor: '#F2F2F2',
                borderRadius: '12px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <CertificateImage title={certificate.title} percentage={certificate.percentage} />
              
              <Title level={5} style={{ marginBottom: '8px', fontWeight: 600 }}>
                {certificate.title}
              </Title>
              
              <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '4px' }}>
                {certificate.percentage}%
              </div>
              
              <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginBottom: '16px' }}>
                of customers recommend this product
              </Text>

              <div>
                <Text strong style={{ fontSize: '14px', display: 'block', marginBottom: '8px' }}>
                  Progress
                </Text>
                
                {renderProgressStages(certificate.completedStages)}
                
                <Text type="secondary" style={{ fontSize: '11px', display: 'block', marginTop: '4px' }}>
                  {certificate.stage}
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
        {selectedCertificate && (
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Header with Certificate Image */}
            <div style={{ padding: '24px', borderBottom: '1px solid #f0f0f0' }}>
              <CertificateImage 
                title={selectedCertificate.title} 
                percentage={selectedCertificate.percentage} 
              />
              <Title level={4} style={{ margin: '0 0 12px 0' }}>
                {selectedCertificate.title}
              </Title>
              <Paragraph style={{ color: '#505050', fontSize: '14px', margin: 0 }}>
                {selectedCertificate.description}
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
                    {selectedCertificate.tags.map((tag, index) => (
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
                        {selectedCertificate.details.studentsEnrolled}
                      </Text>
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={<Text strong style={{ fontSize: '12px', color: '#999' }}>Assign Teacher:</Text>}
                      labelStyle={{ width: '130px' }}
                    >
                      <Text style={{ fontSize: '12px', color: '#666' }}>
                        {selectedCertificate.details.AssignTeacher}
                      </Text>
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={<Text strong style={{ fontSize: '12px', color: '#999' }}>Category:</Text>}
                      labelStyle={{ width: '130px' }}
                    >
                      <Text style={{ fontSize: '12px', color: '#666' }}>
                        {selectedCertificate.details.category}
                      </Text>
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={<Text strong style={{ fontSize: '12px', color: '#999' }}>Location:</Text>}
                      labelStyle={{ width: '130px' }}
                    >
                      <Text style={{ fontSize: '12px', color: '#666' }}>
                        {selectedCertificate.details.location}
                      </Text>
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={<Text strong style={{ fontSize: '12px', color: '#999' }}>Timing:</Text>}
                      labelStyle={{ width: '130px' }}
                    >
                      <Text style={{ fontSize: '12px', color: '#666' }}>
                        {selectedCertificate.details.timing}
                      </Text>
                    </Descriptions.Item>
                    <Descriptions.Item
                      label={<Text strong style={{ fontSize: '12px', color: '#999' }}>Titles:</Text>}
                      labelStyle={{ width: '130px' }}
                    >
                      <Text style={{ fontSize: '12px', color: '#666' }}>
                        {selectedCertificate.details.titles}
                      </Text>
                    </Descriptions.Item>
                  </Descriptions>
                </div>

                <div>
                  <Title level={5} style={{ color: '#666', fontWeight: 800, marginBottom: '12px' }}>
                    Progress
                  </Title>
                  <div>
                    {renderProgressStages(selectedCertificate.completedStages)}
                    <Text type="secondary" style={{ fontSize: '11px', display: 'block', marginTop: '8px' }}>
                      {selectedCertificate.stage} • {selectedCertificate.completedStages}/5 Completed
                    </Text>
                  </div>
                </div>

                <div>
                  <Title level={5} style={{ color: '#666', fontWeight: 800, marginBottom: '12px' }}>
                    Certificate
                  </Title>
                  <Space direction="vertical" size="small" style={{ width: '100%' }}>
                    <Button
                      type="primary"
                      icon={<FileTextOutlined />}
                      disabled={selectedCertificate.percentage !== 100}
                      block
                      style={{
                        backgroundColor: selectedCertificate.percentage === 100 ? '#1E1E1F' : '#1E1E1F',
                        borderColor: '#1E1E1F',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        opacity: selectedCertificate.percentage !== 100 ? 0.5 : 1,
                        height: '40px',
                      }}
                    >
                      {selectedCertificate.percentage === 100 ? "Download Certificate" : "Certificate Locked"}
                    </Button>
                    {selectedCertificate.percentage !== 100 && (
                      <Text type="secondary" style={{ fontSize: '11px', textAlign: 'center', display: 'block' }}>
                        Complete the course to unlock your certificate
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
  )
}

export default CertificateProgress