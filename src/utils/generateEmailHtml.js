import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';

export const generateEmailHtml = (templateName, data) => {
  const templatePath = path.resolve('src', 'templates', templateName);

  const file = fs.readFileSync(templatePath, 'utf-8');
  const compileTemplate = handlebars.compile(file);

  return compileTemplate(data);
};
