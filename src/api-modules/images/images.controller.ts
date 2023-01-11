import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiHeader,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ObjectId } from 'mongodb';
import { CreateImageDto } from './dto/create-image.dto';
import { Image } from './entities/image.entity';
import { ImagesByCategory } from './entities/images-by-category.entity';
import { ImagesService } from './images.service';
import { ParseObjectIdPipe } from '../../pipes/parse-object-id.pipe';

@Controller({
  path: 'images',
  version: '1',
})
@UseGuards(AuthGuard('bearer'))
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiTags('images')
@ApiBearerAuth()
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
  required: true,
  example: 'Bearer AAAA',
})
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  create(
    @Body() createImageDto: CreateImageDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 2000000 }),
          new FileTypeValidator({ fileType: RegExp('image/jpeg|image/png') }),
        ],
      }),
    )
    file: Express.Multer.File = null,
  ): Promise<Image> {
    return this.imagesService.create(createImageDto, file);
  }

  @Get()
  findAll(): Promise<Image[]> {
    return this.imagesService.findAll();
  }

  @Get('/grouped-by-category')
  getGroupedByCategory(): Promise<ImagesByCategory[]> {
    return this.imagesService.getGroupedByCategory();
  }

  @Get(':_id')
  findOne(@Param('_id', ParseObjectIdPipe) _id: ObjectId): Promise<Image> {
    return this.imagesService.findOne(_id);
  }

  @Delete(':_id')
  remove(@Param('_id', ParseObjectIdPipe) _id: ObjectId): Promise<void> {
    return this.imagesService.remove(_id);
  }
}
