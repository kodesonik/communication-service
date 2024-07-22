export class CreateMailDto {
  readonly subject: string;
  readonly message: string;
  readonly emails: string[];
  readonly sendingDate?: string;
}
