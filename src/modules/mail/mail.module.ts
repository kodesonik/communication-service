import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailGateway } from './mail.gateway';
import { configuration } from 'src/configs';

@Module({
  imports: [
    ConfigModule.forFeature(configuration),
    MailerModule.forRootAsync({
      imports: [ConfigModule], // Assurez-vous d'importer ConfigModule si vous utilisez ConfigService
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('mail.transport.host'), // Utilisez ConfigService pour accéder aux variables d'environnement
          port: configService.get<number>('mail.transport.port'),
          secure: true,
          auth: {
            user: configService.get<string>('mail.auth.user'),
            pass: configService.get<string>('mail.auth.password'),
          },
        },
      }),
      inject: [ConfigService], // Injectez ConfigService pour l'utiliser dans useFactory
    }),
  ],
  controllers: [MailController, MailGateway],
  providers: [MailService],
})
export class MailModule {}
