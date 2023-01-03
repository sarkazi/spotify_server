import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { AlbumEntity } from 'src/album/entities/album.entity'
import { PlaylistEntity } from 'src/playlist/entities/playlist.entity'
import { TrackEntity } from 'src/track/entities/track.entity'
import { UserEntity } from 'src/user/entities/user.entity'

export const getTypeOrmConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => ({
  type: 'postgres',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: [UserEntity, AlbumEntity, PlaylistEntity, TrackEntity],
  autoLoadEntities: true,
  synchronize: true,
})
