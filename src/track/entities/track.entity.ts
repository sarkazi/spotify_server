import { ObjectType, Field, Int } from '@nestjs/graphql'
import { AlbumEntity } from 'src/album/entities/album.entity'
import { PlaylistEntity } from 'src/playlist/entities/playlist.entity'
import { Base } from 'src/utils/base'
import { Column, Entity, ManyToOne } from 'typeorm'

@ObjectType()
@Entity('tracks')
export class TrackEntity extends Base {
  @Field()
  @Column()
  artist: string

  @Field()
  @Column()
  name: string

  @Field(() => Int)
  @Column({ default: 0 })
  duration: number

  @Field(() => Int)
  @Column({ default: 0 })
  total_count: number

  @Field(() => PlaylistEntity)
  @ManyToOne(() => PlaylistEntity, (playlist) => playlist.tracks)
  playlist: PlaylistEntity

  @Field(() => AlbumEntity, { nullable: true })
  @ManyToOne(() => AlbumEntity, (album) => album.tracks)
  album?: AlbumEntity

  @Field()
  @Column({ name: 'cover_url', nullable: true })
  coverUrl: string
}
