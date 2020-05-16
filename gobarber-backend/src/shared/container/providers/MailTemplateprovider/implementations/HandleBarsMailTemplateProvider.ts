import handlebars from 'handlebars';
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IParseMailTemplateProvider from '../models/IMailTemplateProvider';

export default class HandleBarsMailTemplateProvider
  implements IParseMailTemplateProvider {
  public async parser({
    template,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const parseTemplate = handlebars.compile(template);

    return parseTemplate(variables);
  }
}
