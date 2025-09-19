

import { useState } from "react"
import { Card, Button, Slider, Input, Tooltip } from "antd"
import {
  ZoomInOutlined,
  ZoomOutOutlined,
  DownloadOutlined,
  PrinterOutlined,
  LeftOutlined,
  RightOutlined,
  FileTextOutlined,
} from "@ant-design/icons"

const PDFViewer = ({ content, onComplete, isCompleted }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [zoom, setZoom] = useState(100)
  const [searchTerm, setSearchTerm] = useState("")

  const totalPages = content.pages || 1

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const handleZoomChange = (value) => {
    setZoom(value)
  }

  const downloadPDF = () => {
    // Simulate PDF download
    const link = document.createElement("a")
    link.href = content.pdfUrl || "/placeholder.pdf"
    link.download = "document.pdf"
    link.click()
  }

  const printPDF = () => {
    window.print()
  }

  return (
    <div className="p-6">
      {/* PDF Toolbar */}
      <Card className="mb-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Navigation Controls */}
          <div className="flex items-center space-x-2">
            <Button
              icon={<LeftOutlined />}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              size="small"
            />

            <div className="flex items-center space-x-2">
              <Input
                value={currentPage}
                onChange={(e) => handlePageChange(Number.parseInt(e.target.value) || 1)}
                className="w-16 text-center"
                size="small"
              />
              <span className="text-sm text-gray-500">of {totalPages}</span>
            </div>

            <Button
              icon={<RightOutlined />}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              size="small"
            />
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center space-x-2">
            <Button icon={<ZoomOutOutlined />} onClick={() => handleZoomChange(Math.max(50, zoom - 25))} size="small" />

            <Slider
              min={50}
              max={200}
              value={zoom}
              onChange={handleZoomChange}
              className="w-24"
              tooltip={{ formatter: (value) => `${value}%` }}
            />

            <Button icon={<ZoomInOutlined />} onClick={() => handleZoomChange(Math.min(200, zoom + 25))} size="small" />

            <span className="text-sm text-gray-500 min-w-12">{zoom}%</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Input.Search
              placeholder="Search in document..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-48"
              size="small"
            />

            <Tooltip title="Download PDF">
              <Button icon={<DownloadOutlined />} onClick={downloadPDF} size="small" />
            </Tooltip>

            <Tooltip title="Print PDF">
              <Button icon={<PrinterOutlined />} onClick={printPDF} size="small" />
            </Tooltip>
          </div>
        </div>
      </Card>

      {/* PDF Viewer */}
      <Card className="min-h-96">
        <div
          className="flex justify-center items-center bg-gray-100 rounded-lg p-8"
          style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
        >
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full">
            {/* Simulated PDF Content */}
            <div className="space-y-6">
              <div className="text-center border-b pb-4">
                <FileTextOutlined className="text-4xl text-blue-500 mb-2" />
                <h2 className="text-2xl font-bold text-gray-800">Course Syllabus</h2>
                <p className="text-gray-600">Advanced Web Development Masterclass</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">Course Overview</h3>
                <p className="text-gray-700 leading-relaxed">
                  This comprehensive course covers modern web development techniques using React, Node.js, and other
                  cutting-edge technologies. Students will learn to build full-stack applications from scratch.
                </p>

                <h3 className="text-xl font-semibold text-gray-800">Learning Objectives</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Master React fundamentals and advanced concepts</li>
                  <li>Build RESTful APIs with Node.js and Express</li>
                  <li>Implement authentication and authorization</li>
                  <li>Deploy applications to production environments</li>
                  <li>Follow best practices for code organization and testing</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-800">Course Structure</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800">Module 1</h4>
                    <p className="text-blue-700 text-sm">Introduction & Setup</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800">Module 2</h4>
                    <p className="text-green-700 text-sm">React Fundamentals</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800">Module 3</h4>
                    <p className="text-purple-700 text-sm">Backend Development</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800">Module 4</h4>
                    <p className="text-orange-700 text-sm">Deployment & Testing</p>
                  </div>
                </div>
              </div>

              <div className="text-center text-sm text-gray-500 border-t pt-4">
                Page {currentPage} of {totalPages}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Reading Progress */}
      <Card className="mt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Reading Progress</span>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500">{Math.round((currentPage / totalPages) * 100)}% Complete</div>
            {!isCompleted && currentPage === totalPages && (
              <Button type="primary" onClick={onComplete}>
                Mark as Read
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default PDFViewer
