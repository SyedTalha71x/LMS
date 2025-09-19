import { useState } from "react"
import { Card, List, Button, Tag, Input, Select, Modal, Progress } from "antd"
import {
  DownloadOutlined,
  LinkOutlined,
  FileTextOutlined,
  FilePdfOutlined,
  FileZipOutlined,
  SearchOutlined,
  FilterOutlined,
  EyeOutlined,
  BookOutlined,
} from "@ant-design/icons"

const { Search } = Input
const { Option } = Select

const ResourcesPanel = ({ courseData }) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [downloadProgress, setDownloadProgress] = useState({})
  const [previewModal, setPreviewModal] = useState({ visible: false, resource: null })

  const resources = courseData.resources || []

  const getResourceIcon = (type) => {
    const iconMap = {
      pdf: <FilePdfOutlined className="text-red-500" />,
      download: <FileZipOutlined className="text-purple-500" />,
      link: <LinkOutlined className="text-blue-500" />,
      document: <FileTextOutlined className="text-green-500" />,
    }
    return iconMap[type] || <BookOutlined />
  }

  const getResourceTypeLabel = (type) => {
    const labelMap = {
      pdf: "PDF Document",
      download: "Download",
      link: "External Link",
      document: "Document",
    }
    return labelMap[type] || "Resource"
  }

  const handleDownload = (resource) => {
    // Simulate download progress
    setDownloadProgress({ [resource.id]: 0 })

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        const currentProgress = prev[resource.id] || 0
        if (currentProgress >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setDownloadProgress((prev) => {
              const newProgress = { ...prev }
              delete newProgress[resource.id]
              return newProgress
            })
          }, 1000)
          return prev
        }
        return { ...prev, [resource.id]: currentProgress + 10 }
      })
    }, 200)

    // Simulate actual download
    const link = document.createElement("a")
    link.href = resource.url
    link.download = resource.title
    link.click()
  }

  const handlePreview = (resource) => {
    setPreviewModal({ visible: true, resource })
  }

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || resource.type === filterType
    return matchesSearch && matchesFilter
  })

  const resourceTypes = [...new Set(resources.map((r) => r.type))]

  return (
    <div className="space-y-6">
      {/* Resources Header */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <BookOutlined className="text-green-500" />
            <h3 className="text-lg font-semibold">Course Resources</h3>
            <Tag color="green">{resources.length} resources</Tag>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex space-x-4 mb-4">
          <Search
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
            prefix={<SearchOutlined />}
          />
          <Select value={filterType} onChange={setFilterType} className="w-40" suffixIcon={<FilterOutlined />}>
            <Option value="all">All Types</Option>
            {resourceTypes.map((type) => (
              <Option key={type} value={type}>
                {getResourceTypeLabel(type)}
              </Option>
            ))}
          </Select>
        </div>

        <div className="text-sm text-gray-600">
          {filteredResources.length} of {resources.length} resources shown
        </div>
      </Card>

      {/* Resources List */}
      <Card>
        <List
          dataSource={filteredResources}
          renderItem={(resource) => (
            <List.Item
              key={resource.id}
              actions={[
                resource.type === "link" ? (
                  <Button
                    key="open-link" // Added key property
                    type="link"
                    icon={<LinkOutlined />}
                    onClick={() => window.open(resource.url, "_blank")}
                  >
                    Open Link
                  </Button>
                ) : (
                  <div key="action-buttons" className="flex space-x-2">
                    {resource.type === "pdf" && (
                      <Button
                        key="preview-pdf" // Added key property
                        size="small"
                        icon={<EyeOutlined />}
                        onClick={() => handlePreview(resource)}
                      >
                        Preview
                      </Button>
                    )}
                    <Button
                      key="download-resource" // Added key property
                      type="primary"
                      size="small"
                      icon={<DownloadOutlined />}
                      onClick={() => handleDownload(resource)}
                      loading={downloadProgress[resource.id] !== undefined}
                    >
                      {downloadProgress[resource.id] !== undefined ? "Downloading..." : "Download"}
                    </Button>
                  </div>
                ),
              ]}
            >
              <List.Item.Meta
                avatar={getResourceIcon(resource.type)}
                title={
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">{resource.title}</span>
                    <Tag color="blue" size="small">
                      {getResourceTypeLabel(resource.type)}
                    </Tag>
                  </div>
                }
                description={
                  <div>
                    <p className="text-gray-600 mb-2">{resource.description}</p>
                    {downloadProgress[resource.id] !== undefined && (
                      <Progress percent={downloadProgress[resource.id]} size="small" className="w-48" />
                    )}
                  </div>
                }
              />
            </List.Item>
          )}
        />

        {filteredResources.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <BookOutlined className="text-4xl mb-2" />
            <p>No resources found matching your criteria.</p>
          </div>
        )}
      </Card>

      {/* Additional Resources */}
      <Card title="Additional Learning Materials">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Official Documentation</h4>
            <p className="text-blue-700 text-sm mb-3">
              Access the latest official documentation for all technologies covered in this course.
            </p>
            <Button type="link" size="small" icon={<LinkOutlined />}>
              View Documentation
            </Button>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">Community Forum</h4>
            <p className="text-green-700 text-sm mb-3">
              Join discussions with other students and get help from the community.
            </p>
            <Button type="link" size="small" icon={<LinkOutlined />}>
              Visit Forum
            </Button>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-2">Practice Exercises</h4>
            <p className="text-purple-700 text-sm mb-3">Additional coding exercises to reinforce your learning.</p>
            <Button type="link" size="small" icon={<LinkOutlined />}>
              Start Practicing
            </Button>
          </div>

          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-semibold text-orange-800 mb-2">Video Tutorials</h4>
            <p className="text-orange-700 text-sm mb-3">Supplementary video content to enhance your understanding.</p>
            <Button type="link" size="small" icon={<LinkOutlined />}>
              Watch Videos
            </Button>
          </div>
        </div>
      </Card>

      {/* Preview Modal */}
      <Modal
        title={previewModal.resource?.title}
        open={previewModal.visible}
        onCancel={() => setPreviewModal({ visible: false, resource: null })}
        width={800}
        footer={[
          <Button
            key="download"
            type="primary"
            icon={<DownloadOutlined />}
            onClick={() => handleDownload(previewModal.resource)}
          >
            Download
          </Button>,
          <Button key="close" onClick={() => setPreviewModal({ visible: false, resource: null })}>
            Close
          </Button>,
        ]}
      >
        {previewModal.resource && (
          <div className="text-center py-8">
            <FilePdfOutlined className="text-6xl text-red-500 mb-4" />
            <h3 className="text-xl font-semibold mb-2">PDF Preview</h3>
            <p className="text-gray-600 mb-4">{previewModal.resource.description}</p>
            <div className="bg-gray-100 p-8 rounded-lg">
              <p className="text-gray-500">PDF preview would be displayed here in a real implementation.</p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default ResourcesPanel
