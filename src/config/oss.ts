import OSS from 'ali-oss';

export interface OSSConfig {
  region: string;
  accessKeyId: string;
  accessKeySecret: string;
  bucket: string;
}

export const getOSSConfig = (): OSSConfig => {
  return {
    region: import.meta.env.VITE_OSS_REGION,
    accessKeyId: import.meta.env.VITE_OSS_ACCESS_KEY_ID,
    accessKeySecret: import.meta.env.VITE_OSS_ACCESS_KEY_SECRET,
    bucket: import.meta.env.VITE_OSS_BUCKET,
  };
};

export const createOSSClient = () => {
  const config = getOSSConfig();
  return new OSS({
    region: config.region,
    accessKeyId: config.accessKeyId,
    accessKeySecret: config.accessKeySecret,
    bucket: config.bucket,
  });
};