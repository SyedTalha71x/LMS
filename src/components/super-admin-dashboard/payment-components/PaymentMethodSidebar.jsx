import { Button, Card, Space, Typography, Divider, Switch } from "antd"
import {
  CloseOutlined,
  CreditCardOutlined,
  WalletOutlined,
  DollarOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons"

const { Title, Text } = Typography

const PaymentMethodsSidebar = ({ onClose, onAddCard }) => {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <Title level={4} style={{ margin: 0 }}>
          Payment Methods
        </Title>
        <Button type="text" icon={<CloseOutlined />} onClick={onClose} />
      </div>

      <Button type="primary" block style={{ marginBottom: "24px" }} onClick={onAddCard}>
        Add Payment Method
      </Button>

      <Divider orientation="left">Saved Cards</Divider>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Card size="small">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Space>
              <CreditCardOutlined style={{ fontSize: "24px", color: "#1890ff" }} />
              <div>
                <Text strong>**** **** **** 4878</Text>
                <br />
                <Text type="secondary">Expires 12/26</Text>
              </div>
            </Space>
            <Space>
              <Button type="text" icon={<EditOutlined />} />
              <Button type="text" icon={<DeleteOutlined />} danger />
            </Space>
          </div>
        </Card>

        <Card size="small">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Space>
              <CreditCardOutlined style={{ fontSize: "24px", color: "#722ed1" }} />
              <div>
                <Text strong>**** **** **** 4289</Text>
                <br />
                <Text type="secondary">Expires 08/27</Text>
              </div>
            </Space>
            <Space>
              <Button type="text" icon={<EditOutlined />} />
              <Button type="text" icon={<DeleteOutlined />} danger />
            </Space>
          </div>
        </Card>
      </Space>

      <Divider orientation="left">Payment Gateways</Divider>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Card size="small">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Space>
              <CreditCardOutlined style={{ color: "#1890ff" }} />
              <div>
                <Text strong>Stripe</Text>
                <br />
                <Text type="success">Connected</Text>
              </div>
            </Space>
            <Switch checked />
          </div>
        </Card>

        <Card size="small">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Space>
              <WalletOutlined style={{ color: "#1890ff" }} />
              <div>
                <Text strong>PayPal</Text>
                <br />
                <Text type="success">Connected</Text>
              </div>
            </Space>
            <Switch checked />
          </div>
        </Card>

        <Card size="small">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Space>
              <DollarOutlined style={{ color: "#8c8c8c" }} />
              <div>
                <Text strong>Square</Text>
                <br />
                <Text type="secondary">Not connected</Text>
              </div>
            </Space>
            <Switch />
          </div>
        </Card>
      </Space>
    </div>
  )
}

export default PaymentMethodsSidebar
