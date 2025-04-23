# 阿里云OSS前端上传示例

这是一个使用React和TypeScript实现的阿里云OSS直传示例项目。

## 功能特点

- 基于React + TypeScript开发
- 使用阿里云OSS Browser SDK
- 支持文件直传
- 展示上传进度
- 支持取消上传
- 上传完成后可预览

## 使用方法

1. 克隆项目：
```bash
git clone https://github.com/cengsinmcp/aliyun-oss-upload-demo.git
cd aliyun-oss-upload-demo
```

2. 安装依赖：
```bash
npm install
```

3. 配置OSS参数：
在 `.env` 文件中配置以下参数：
```
VITE_OSS_REGION=your-region
VITE_OSS_BUCKET=your-bucket
VITE_OSS_ACCESS_KEY_ID=your-access-key-id
VITE_OSS_ACCESS_KEY_SECRET=your-access-key-secret
```

4. 启动开发服务器：
```bash
npm run dev
```

## 注意事项

- 请勿在前端直接使用 AccessKey，生产环境中应该使用STS临时授权
- 本示例仅供学习参考，生产环境使用请注意安全性

## 技术栈

- React 18
- TypeScript
- Vite
- ali-oss
- Ant Design
- TailwindCSS

## License

MIT