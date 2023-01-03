import { ObjectType, Field, Int } from '@nestjs/graphql'
import { TrackEntity } from 'src/track/entities/track.entity'
import { UserEntity } from 'src/user/entities/user.entity'
import { Base } from 'src/utils/base'
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm'

@ObjectType()
@Entity('playlists')
export class PlaylistEntity extends Base {
  @Field()
  @Column()
  name: string

  @Field(() => UserEntity)
  @ManyToOne(() => UserEntity, (user) => user.playlists)
  user: UserEntity

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string

  @Field()
  @Column({ name: 'count_tracks', default: 0 })
  countTracks: number

  @Field(() => TrackEntity)
  @OneToMany(() => TrackEntity, (track) => track.playlist)
  tracks: TrackEntity[]
}
