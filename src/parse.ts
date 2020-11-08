const freemarker = require('freemarker-parser')
const fs = require('fs')

class FreemarkerDeps {
  templatePath: string;

  constructor(template: string) {
    this.templatePath = template;
  }

  parseFile() {
    const fileContents = fs.readFileSync(this.templatePath, "utf8");
    const parser = new freemarker.Parser();
    const data = parser.parse(fileContents);

    console.log(data.ast);
    console.log(data.tokens);
  }
}

export { FreemarkerDeps };
