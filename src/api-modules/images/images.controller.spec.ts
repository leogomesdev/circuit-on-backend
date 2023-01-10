import { Test, TestingModule } from '@nestjs/testing';
import { MockFactory } from '../../test/mock.factory';
import { Image } from './entities/image.entity';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';

describe('ImagesController', () => {
  let controller: ImagesController;
  let service: ImagesService;

  const mockImagesService = () => ({
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    getGroupedByCategory: jest.fn(),
    remove: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagesController],
      providers: [
        {
          provide: ImagesService,
          useFactory: mockImagesService,
        },
      ],
    }).compile();

    controller = module.get<ImagesController>(ImagesController);
    service = module.get<ImagesService>(ImagesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('calls service.findAll()', async () => {
      await controller.findAll();

      expect(service.findAll).toHaveBeenCalledTimes(1);
      expect(service.findAll).toHaveBeenCalledWith();
    });

    it('returns an array of Image', async () => {
      const imagesList: Image[] = [];
      for (let i = 0; i < 2; i++) {
        imagesList.push(MockFactory.image());
      }

      service.findAll = jest.fn().mockResolvedValue(imagesList);

      const result: Image[] = await controller.findAll();

      expect(result).toEqual(imagesList);
    });
  });
});
