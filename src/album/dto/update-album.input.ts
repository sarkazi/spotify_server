import { InputType, Int, Field, ID } from '@nestjs/graphql'
import { IsNumber, MaxLength, MinLength } from 'class-validator'

@InputType()
export class UpdateAlbumInput {
  @Field(() => ID)
  id: number

  @MinLength(2, { message: 'Минимум 2 символов' })
  @MaxLength(20, { message: 'Максимум 20 символа' })
  @Field()
  name: string

  @MinLength(2, { message: 'Минимум 2 символов' })
  @MaxLength(20, { message: 'Максимум 20 символа' })
  @Field()
  artist: string

  @MinLength(30, { message: 'Минимум 30 символов' })
  @MaxLength(1000, { message: 'Максимум 1000 символов' })
  @Field({ nullable: true })
  description?: string

  @Field({ nullable: true })
  coverUrl?: string

  @IsNumber()
  @Field(() => Int, { nullable: true })
  yearOfRelease?: number
}
