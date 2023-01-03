import { ObjectType, Field, Int } from '@nestjs/graphql'
import { PlaylistEntity } from 'src/playlist/entities/playlist.entity'
import { Base } from 'src/utils/base'
import { Column, Entity, JoinColumn, OneToMany } from 'typeorm'

@ObjectType()
@Entity('users')
export class UserEntity extends Base {
  @Field()
  @Column()
  username: string

  @Field()
  @Column()
  password: string

  @Field()
  @Column()
  email: string

  @Field()
  @Column({ default: false, name: 'is_admin' })
  isAdmin: boolean

  @Field(() => PlaylistEntity)
  @OneToMany(() => PlaylistEntity, (playlist) => playlist.user)
  @JoinColumn({ name: 'playlists' })
  playlists: PlaylistEntity[]

  @Field()
  @Column({ name: 'avatar_url', nullable: true })
  avatarUrl: string
}
