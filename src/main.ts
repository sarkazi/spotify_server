import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()
  app.setGlobalPrefix('api')

  const port = app.get(ConfigService).get('PORT')

  await app.listen(port || 7100, () => console.log(`збс на ${port} порту`))
}
bootstrap()
