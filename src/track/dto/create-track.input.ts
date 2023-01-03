import { InputType, Int, Field } from '@nestjs/graphql'
import { MaxLength, IsString } from 'class-validator'
import { AlbumEntity } from 'src/album/entities/album.entity'
import { PlaylistEntity } from 'src/playlist/entities/playlist.entity'

@InputType()
export class CreateTrackInput {
  @Field({ nullable: true })
  album?: number

  @Field()
  playlist: number
}
