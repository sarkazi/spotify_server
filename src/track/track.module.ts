import { Module } from '@nestjs/common'
import { TrackService } from './track.service'
import { TrackResolver } from './track.resolver'
import { AlbumModule } from 'src/album/album.module'
import { PlaylistModule } from 'src/playlist/playlist.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TrackEntity } from './entities/track.entity'
import { PlaylistEntity } from 'src/playlist/entities/playlist.entity'
import { AlbumEntity } from 'src/album/entities/album.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([TrackEntity, PlaylistEntity, AlbumEntity]),
    AlbumModule,
    PlaylistModule,
  ],
  providers: [TrackResolver, TrackService],
})
export class TrackModule {}
