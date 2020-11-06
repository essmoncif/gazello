import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectionService } from './connection.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: ConnectionService
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
