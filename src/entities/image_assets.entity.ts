import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('image_assets')
export class Image_assets {
  @PrimaryColumn({
    type: 'varchar',
    length: 255,
  })
  image_name: string;

  @Column({
    type: 'mediumblob',
  })
  image: Buffer;
}
