import { Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async send(createMailDto: CreateMailDto) {
    try {
      const promises = [];
      createMailDto.emails.map((email) =>
        promises.push(
          this.mailerService.sendMail({
            from: process.env.EMAIL_SENDER || 'BKG SPEED',
            to: email,
            subject: createMailDto.subject,
            text: createMailDto.message,
          }),
        ),
      );
      return Promise.all(promises);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async sendOtp(data: { otp: string; to: string }) {
    return await this.send({
      emails: [data.to],
      subject: 'OTP',
      message: `Your OTP is ${data.otp}`,
    });
  }

  findAll() {
    return `This action returns all mail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mail`;
  }

  update(id: number, updateMailDto: UpdateMailDto) {
    return `This action updates a #${id} mail`;
  }

  remove(id: number) {
    return `This action removes a #${id} mail`;
  }
}
