/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react"
import { Card, Button, Slider, Select } from "antd"
import { FontSizeOutlined, BgColorsOutlined, ReadOutlined, PrinterOutlined } from "@ant-design/icons"
import { BookMarked } from "lucide-react"

const { Option } = Select

const TextContent = ({ content, onComplete, isCompleted }) => {
  const [fontSize, setFontSize] = useState(16)
  const [fontFamily, setFontFamily] = useState("serif")
  const [theme, setTheme] = useState("light")
  const [readingTime, setReadingTime] = useState(0)
  const [wordsRead, setWordsRead] = useState(0)

  useEffect(() => {
    // Calculate estimated reading time (average 200 words per minute)
    const text = content.html.replace(/<[^>]*>/g, "")
    const wordCount = text.split(/\s+/).length
    const estimatedTime = Math.ceil(wordCount / 200)
    setReadingTime(estimatedTime)
  }, [content.html])

  const handlePrint = () => {
    const printWindow = window.open("", "_blank")
    printWindow.document.write(`
      <html>
        <head>
          <title>Course Content</title>
          <style>
            body { font-family: ${fontFamily}; font-size: ${fontSize}px; line-height: 1.6; }
            h1, h2, h3 { color: #333; }
            p { margin-bottom: 1em; }
          </style>
        </head>
        <body>
          ${content.html}
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.print()
  }

  const themeStyles = {
    light: {
      background: "#ffffff",
      color: "#333333",
      border: "1px solid #e8e8e8",
    },
    dark: {
      background: "#1f1f1f",
      color: "#ffffff",
      border: "1px solid #404040",
    },
    sepia: {
      background: "#f4f3e8",
      color: "#5c4b37",
      border: "1px solid #d4c5a9",
    },
  }

  const fontFamilyMap = {
    serif: 'Georgia, "Times New Roman", serif',
    "sans-serif": '"Helvetica Neue", Arial, sans-serif',
    monospace: '"Courier New", Courier, monospace',
  }

  return (
    <div className="p-6">
      {/* Reading Controls */}
      <Card className="mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Typography Controls */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FontSizeOutlined />
              <span className="text-sm">Font Size:</span>
              <Slider
                min={12}
                max={24}
                value={fontSize}
                onChange={setFontSize}
                className="w-24"
                tooltip={{ formatter: (value) => `${value}px` }}
              />
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm">Font:</span>
              <Select value={fontFamily} onChange={setFontFamily} className="w-32" size="small">
                <Option value="serif">Serif</Option>
                <Option value="sans-serif">Sans Serif</Option>
                <Option value="monospace">Monospace</Option>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <BgColorsOutlined />
              <span className="text-sm">Theme:</span>
              <Select value={theme} onChange={setTheme} className="w-24" size="small">
                <Option value="light">Light</Option>
                <Option value="dark">Dark</Option>
                <Option value="sepia">Sepia</Option>
              </Select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <div className="text-sm text-gray-500">
              <ReadOutlined className="mr-1" />~{readingTime} min read
            </div>

            <Button icon={<BookMarked />} size="small" title="Bookmark" />

            <Button icon={<PrinterOutlined />} onClick={handlePrint} size="small" title="Print" />
          </div>
        </div>
      </Card>

      {/* Content Area */}
      <Card style={themeStyles[theme]} className="min-h-96">
        <div
          className="prose max-w-none"
          style={{
            fontSize: `${fontSize}px`,
            fontFamily: fontFamilyMap[fontFamily],
            color: themeStyles[theme].color,
            lineHeight: "1.7",
          }}
          dangerouslySetInnerHTML={{ __html: content.html }}
        />
      </Card>

      {/* Reading Progress */}
      <Card className="mt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Reading Progress</span>
            <div className="text-sm text-gray-500">Estimated reading time: {readingTime} minutes</div>
          </div>

          {!isCompleted && (
            <Button type="primary" onClick={onComplete}>
              Mark as Read
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}

export default TextContent
