import { ObjectId } from 'mongodb';
import { CurrentSchedule } from '../api-modules/current-schedules/entities/current-schedule.entity';
import { Image } from '../api-modules/images/entities/image.entity';
import {
  Schedule,
  SubDocumentImage,
} from '../api-modules/schedules/entities/schedule.entity';
import sampleImageBase64 from './sample-image-base64';

export class MockFactory {
  static sampleCategories = ['CrossFit', 'Other', 'Private Session', 'Zumba'];

  static randomString(): string {
    return (Math.random() + 1).toString(36).substring(2);
  }

  static randomMongoIdValue(): string {
    return new ObjectId().toString();
  }

  static randomCategory(): string {
    const randomNumber = Math.floor(
      Math.random() * this.sampleCategories.length,
    );
    return this.sampleCategories[randomNumber];
  }

  static randomHexaColor(): string {
    return '#' + Math.random().toString(16).slice(-6);
  }

  static currentSchedule(): CurrentSchedule {
    const currentSchedule: CurrentSchedule = new CurrentSchedule();
    currentSchedule.scheduleId = this.randomMongoIdValue();
    currentSchedule.imageId = this.randomMongoIdValue();
    currentSchedule.title = this.randomString();
    currentSchedule.category = this.randomCategory();
    currentSchedule.backgroundColor = this.randomHexaColor();
    currentSchedule.scheduledAt = new Date();
    currentSchedule.data = sampleImageBase64;

    return currentSchedule;
  }

  static schedule(): Schedule {
    const subDocumentImage = new SubDocumentImage();
    subDocumentImage._id = this.randomMongoIdValue();
    subDocumentImage.title = this.randomString();
    subDocumentImage.category = this.randomCategory();
    subDocumentImage.backgroundColor = this.randomHexaColor();
    const now = new Date();
    const schedule: Schedule = new Schedule();
    schedule._id = this.randomMongoIdValue();
    schedule.image = subDocumentImage;
    schedule.scheduledAt = new Date();
    schedule.createdAt = now;
    schedule.updatedAt = now;

    return schedule;
  }

  static image(): Image {
    const now = new Date();
    const image: Image = new Image();
    image._id = this.randomMongoIdValue();
    image.title = this.randomString();
    image.category = this.randomCategory();
    image.backgroundColor = this.randomHexaColor();
    image.data = sampleImageBase64;
    image.createdAt = now;
    image.updatedAt = now;

    return image;
  }
}
