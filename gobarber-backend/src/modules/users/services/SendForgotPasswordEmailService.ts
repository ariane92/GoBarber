import { injectable, inject } from 'tsyringe';
// import User from '../infra/typeorm/entities/User';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUserRepository';
import IUsersTokenRepository from '../repositories/IUserTokensRepository';

interface IRequestDTO {
  email: string;
}
@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UsersTokenRepository')
    private usersTokenRepository: IUsersTokenRepository,
  ) {}

  public async execute({ email }: IRequestDTO): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists');
    }

    await this.usersTokenRepository.generate(user.id);

    this.mailProvider.sendMail(
      email,
      'pedido de recuperação de senha recebido',
    );
  }
}

export default SendForgotPasswordEmailService;
