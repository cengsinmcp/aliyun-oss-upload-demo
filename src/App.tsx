import React, { useState } from 'react';
import { Card, Typography, List, Image } from 'antd';
import OSSUploader from './components/OSSUploader';

const { Title } = Typography;

const App: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleUploadSuccess = (url: string) => {
    setUploadedFiles((prev) => [...prev, url]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="mb-8">
          <Title level={2} className="text-center mb-8">
            阿里云OSS文件上传示例
          </Title>
          
          <OSSUploader onSuccess={handleUploadSuccess} />
        </Card>

        {uploadedFiles.length > 0 && (
          <Card title="已上传文件">
            <List
              grid={{ gutter: 16, column: 2 }}
              dataSource={uploadedFiles}
              renderItem={(url) => (
                <List.Item>
                  <Card>
                    {url.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                      <Image src={url} alt="上传的图片" />
                    ) : (
                      <div className="text-center">
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          查看文件
                        </a>
                      </div>
                    )}
                  </Card>
                </List.Item>
              )}
            />
          </Card>
        )}
      </div>
    </div>
  );
};

export default App;