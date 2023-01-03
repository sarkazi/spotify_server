import { Module } from '@nestjs/common'
import { AlbumService } from './album.service'
import { AlbumResolver } from './album.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AlbumEntity } from './entities/album.entity'

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity])],
  providers: [AlbumResolver, AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
