//import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

/**
 * Extends this class to allow hide/show default fields from collections
 */
export default abstract class MongoSchema {
  //@ApiProperty({ description: 'Auto-generated id for item' })
  @Expose()
  _id: string;

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;

  @Exclude()
  deleted_at: Date;
}
