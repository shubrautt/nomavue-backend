import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const uploadImagesToS3 = async (
  files: Express.Multer.File[],
  filename: string,
  userId: string
) => {
  try {
    const s3 = new S3Client({
      region: process.env.AWS_REGION as string,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY as string,
        secretAccessKey: process.env.AWS_SECRET_KEY as string,
      },
    });

    const memories = [];

    for (const [index, file] of files.entries()) {
      const key = `uploads/${userId}/${Date.now()}-${filename}-${index + 1}`;

      await s3.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME as string,
          Key: key,
          Body: file.buffer,
          ContentType: file.mimetype,
        })
      );

      const url = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;

      memories.push({ url, key });
    }

    return memories;
  } catch (error) {
    console.log('[ERROR] failed to upload images to S3: ', error);
    throw new Error('Failed to upload images');
  }
};

export { uploadImagesToS3 };
