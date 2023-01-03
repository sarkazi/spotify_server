import { ObjectType, Field, Int } from '@nestjs/graphql'
import { TrackEntity } from 'src/track/entities/track.entity'
import { Base } from 'src/utils/base'
import { Column, Entity, ManyToOne } from 'typeorm'

@ObjectType()
@Entity('albums')
export class AlbumEntity extends Base {
  @Field()
  @Column()
  artist: string

  @Field()
  @Column()
  name: string

  @Field()
  @Column({ name: 'year_of_release', nullable: true })
  yearOfRelease?: number

  @Field()
  @Column({ nullable: true })
  description?: string

  @Field()
  @Column({ name: 'count_tracks', default: 0 })
  countTrack: number

  @Field(() => TrackEntity)
  @ManyToOne(() => TrackEntity, (track) => track.album)
  tracks: TrackEntity[]

  @Field()
  @Column({ name: 'cover_url', nullable: true })
  coverUrl?: string
}
