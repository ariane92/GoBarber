import fs from 'fs';
import aws, { S3 } from 'aws-sdk';
import path from 'path';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

export default class DiskStorageProvides implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: '',
    });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originalPath, {
      encoding: 'utf-8',
    });

    await this.client
      .putObject({
        Bucket: 'non-existing',
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
      })
      .promise();

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}
