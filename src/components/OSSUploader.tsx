import React, { useState } from 'react';
import { Upload, message, Progress } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { createOSSClient } from '../config/oss';

const { Dragger } = Upload;

interface OSSUploaderProps {
  onSuccess?: (url: string) => void;
}

const OSSUploader: React.FC<OSSUploaderProps> = ({ onSuccess }) => {
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [uploading, setUploading] = useState<boolean>(false);

  const customRequest: UploadProps['customRequest'] = async (options) => {
    const { file, onError, onSuccess } = options;
    
    try {
      setUploading(true);
      const ossClient = createOSSClient();
      const fileName = `uploads/${Date.now()}-${file.name}`;
      
      const result = await ossClient.multipartUpload(fileName, file, {
        progress: (p) => {
          setUploadProgress(Math.floor(p * 100));
        },
      });

      const url = `https://${ossClient.options.bucket}.${ossClient.options.region}.aliyuncs.com/${result.name}`;
      message.success('上传成功！');
      onSuccess?.(result);
      setUploading(false);
      setUploadProgress(0);
      
      if (onSuccess) {
        onSuccess(url);
      }
    } catch (err) {
      console.error('上传失败:', err);
      message.error('上传失败，请重试');
      onError?.(err as Error);
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    customRequest,
    showUploadList: false,
    accept: 'image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx',
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <Dragger {...uploadProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">点击或拖拽文件到此区域上传</p>
        <p className="ant-upload-hint">
          支持图片、视频、音频、PDF和Office文档
        </p>
      </Dragger>
      
      {uploading && (
        <div className="mt-4">
          <Progress percent={uploadProgress} status="active" />
        </div>
      )}
    </div>
  );
};

export default OSSUploader;