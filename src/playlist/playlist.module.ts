import { Module } from '@nestjs/common'
import { PlaylistService } from './playlist.service'
import { PlaylistResolver } from './playlist.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PlaylistEntity } from './entities/playlist.entity'
import { UserModule } from 'src/user/user.module'

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistEntity]), UserModule],
  providers: [PlaylistResolver, PlaylistService],
  exports: [PlaylistService],
})
export class PlaylistModule {}
