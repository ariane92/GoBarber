import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IParseMailTemplateProvider from '../models/IMailTemplateProvider';

export default class FakeMailTemplateProvider
  implements IParseMailTemplateProvider {
  public async parser({ template }: IParseMailTemplateDTO): Promise<string> {
    return template;
  }
}
