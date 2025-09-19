import { useState } from "react";
import { 
  Input, 
  Button, 
  Card, 
  Modal, 
  Form, 
  Row, 
  Col, 
  Avatar, 
  Typography, 
  Space,
  Flex,
  message
} from "antd";
import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import { Navigate, useNavigate } from "react-router-dom";

const { Title, Text, Paragraph } = Typography;
const { Search } = Input;

const GroupsPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  
  const [groups] = useState([
    {
      id: 1,
      name: "Group 1",
      subtitle: "Collaborative project",
      title: "Collaborative work",
      type: "ORGANIZATION",
      description: "When share in work-type spaces, when share completed.",
      members: [1, 2, 3, 4, 5],
      avatar: "https://via.placeholder.com/64/4CAF50/white?text=G1"
    },
    {
      id: 2,
      name: "Group 2",
      subtitle: "Design Team",
      title: "Creative Solutions",
      type: "ORGANIZATION",
      description: "Innovative design solutions for modern challenges.",
      members: [1, 2, 3, 4, 5, 6],
      avatar: "https://via.placeholder.com/64/2196F3/white?text=G2"
    },
    {
      id: 3,
      name: "Group 3",
      subtitle: "Development Team",
      title: "Tech Innovation",
      type: "ORGANIZATION",
      description: "Building next-generation applications and solutions.",
      members: [1, 2, 3, 4],
      avatar: "https://via.placeholder.com/64/FF9800/white?text=G3"
    },
    {
      id: 4,
      name: "Group 4",
      subtitle: "Marketing Team",
      title: "Brand Strategy",
      type: "ORGANIZATION",
      description: "Creating compelling brand narratives and strategies.",
      members: [1, 2, 3, 4, 5, 6, 7],
      avatar: "https://via.placeholder.com/64/9C27B0/white?text=G4"
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      console.log("Form values:", values);
      message.success("Successfully joined the group!");
      form.resetFields();
      setIsModalVisible(false);
      // Handle join group logic here
    }).catch((error) => {
      console.log("Validation failed:", error);
    });
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleGroupClick = () => {
    navigate('/learner-dashboard/messages')
  };

  const handleSearch = (value) => {
    setSearchValue(value);
    // Handle search logic here
  };

  // Filter groups based on search
  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchValue.toLowerCase()) ||
    group.title.toLowerCase().includes(searchValue.toLowerCase()) ||
    group.description.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="min-h-screen p-3">
      {/* Header Section */}
      <div style={{ marginBottom: "24px" }}>
        <Flex 
          justify="space-between" 
          align="center" 
          wrap="wrap" 
          gap="16px"
          style={{ marginBottom: "16px" }}
        >
          <Title level={2} style={{ margin: 0, fontWeight: 600 }}>
            Groups
          </Title>
          
          <Flex gap="12px" align="center" wrap="wrap">
            <Search
              placeholder="Search groups..."
              allowClear
              enterButton={<SearchOutlined />}
              size="large"
              onSearch={handleSearch}
              onChange={(e) => setSearchValue(e.target.value)}
              style={{ 
                width: "280px",
                minWidth: "200px"
              }}
            />
            <Button
              type="primary"
              icon={<UserAddOutlined />}
              size="large"
              onClick={showModal}
             
            >
              Join Group
            </Button>
          </Flex>
        </Flex>
      </div>

      <Row gutter={[16, 16]}>
  {filteredGroups.map((group) => (
    <Col xs={24} sm={12} md={12} lg={8} xl={8} key={group.id}>
      <GroupCard 
        group={group} 
        onClick={() => handleGroupClick()} 
      />
    </Col>
  ))}
</Row>


      {/* Join Group Modal */}
      <Modal
        title={
          <Title level={4} style={{ margin: 0, fontWeight: 600 }}>
            Join Group
          </Title>
        }
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Join Group"
        cancelText="Cancel"
        okButtonProps={{
          style: {
            background: "#0B5D3A",
            borderColor: "#0B5D3A",
            fontWeight: 600
          }
        }}
        width={400}
        centered
      >
        <Form
          form={form}
          layout="vertical"
          style={{ marginTop: "16px" }}
        >
          <Form.Item
            label="Group Link"
            name="link"
            rules={[
              { required: true, message: "Please enter the group link" },
              { type: "url", message: "Please enter a valid URL" }
            ]}
          >
            <Input 
              placeholder="Enter group invitation link"
              size="large"
            />
          </Form.Item>
          
          <Form.Item
            label="Access Code"
            name="code"
            rules={[
              { required: true, message: "Please enter the access code" }
            ]}
          >
            <Input 
              placeholder="Enter group access code"
              size="large"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

const GroupCard = ({ group, onClick }) => {
  return (
    <Card
      hoverable
      onClick={onClick}
      style={{
        borderRadius: "16px",
        border: "none",
        background: "#f9f9f9",
        height: "280px",
        cursor: "pointer",
        transition: "all 0.3s ease"
      }}
      bodyStyle={{ padding: "20px", height: "100%" }}
      styles={{
        body: {
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }
      }}
    >
      <div>
        {/* Group Header */}
        <Flex align="center" gap="12px" style={{ marginBottom: "16px" }}>
          <Avatar
            size={48}
            src={group.avatar}
            style={{
              backgroundColor: "#0B5D3A",
              fontSize: "18px",
              fontWeight: "bold"
            }}
          >
            {group.name.charAt(0)}
          </Avatar>
          <div>
            <Title level={5} style={{ margin: 0, fontWeight: 600 }}>
              {group.name}
            </Title>
            <Text type="secondary" style={{ fontSize: "12px" }}>
              {group.subtitle}
            </Text>
          </div>
        </Flex>

        {/* Group Content */}
        <div style={{ marginBottom: "16px" }}>
          <Title level={4} style={{ margin: "0 0 8px 0", fontWeight: 500 }}>
            {group.title}
          </Title>
          <Text 
            type="secondary" 
            style={{ 
              fontSize: "10px", 
              textTransform: "uppercase", 
              letterSpacing: "0.5px",
              display: "block",
              marginBottom: "8px"
            }}
          >
            {group.type}
          </Text>
          <Paragraph
            ellipsis={{ rows: 2 }}
            style={{ 
              fontSize: "13px", 
              color: "#666",
              margin: 0
            }}
          >
            {group.description}
          </Paragraph>
        </div>
      </div>

      {/* Members Avatars */}
      <Flex justify="center" align="center">
        <Avatar.Group 
          maxCount={5}
          maxStyle={{ 
            color: "#0B5D3A", 
            backgroundColor: "#e6f3ed",
            fontSize: "12px"
          }}
        >
          {group.members.map((member, index) => (
            <Avatar
              key={member}
              size={32}
              style={{
                backgroundColor: `hsl(${(index * 137.5) % 360}, 50%, 50%)`,
                fontSize: "12px",
                fontWeight: "bold"
              }}
            >
              {`U${member}`}
            </Avatar>
          ))}
        </Avatar.Group>
      </Flex>
    </Card>
  );
};

export default GroupsPage;