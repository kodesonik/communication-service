import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from 'src/shared/config/configuration';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forFeature(configuration),
    MailerModule.forRootAsync({
      imports: [ConfigModule], // Assurez-vous d'importer ConfigModule si vous utilisez ConfigService
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('mail.host'), // Utilisez ConfigService pour accéder aux variables d'environnement
          port: configService.get<number>('mail.port'),
          secure: true,
          auth: {
            user: configService.get<string>('mail.username'),
            pass: configService.get<string>('mail.password'),
          },
        },
      }),
      inject: [ConfigService], // Injectez ConfigService pour l'utiliser dans useFactory
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
