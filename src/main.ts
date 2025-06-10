import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({

      whitelist: true,//limpia la data de la request
      forbidNonWhitelisted:true, //data estricta con los campos que solicita
    })
  )

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
