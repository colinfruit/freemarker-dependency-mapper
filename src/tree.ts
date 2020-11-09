const freemarker = require('freemarker-parser')
const fs = require('fs')

class Tree {
  templatePath: string;
  baseDir: any;

  static isInclude(token: any) {
    return (token.type == "Directive" && token.text == "include");
  }

  static isImport(token: any) {
    return (token.type == "Directive" && token.text == "import");
  }

  constructor(template: string, baseDir: any) {
    this.templatePath = template;
    this.baseDir = baseDir;
  }

  /**
  	 * Generate a tree of dependencies for the provided
     * FreeMarker template
     * @params {String | undefined} path
  	 * @return {Array} tokens
  	 */
  getDeps(path: string | undefined) {
    let fileContents;
    this.baseDir.forEach((dir: string) => {
      if (fs.existsSync(`${dir}${path}`)) {
        fileContents = fs.readFileSync(`${dir}${path}`, "utf8");
      }
    });
    if (!fileContents) {
      return [];
    }
    const parser = new freemarker.Parser();
    const data = parser.parse(fileContents);

    // TODO: clean this up
    let includes = data.tokens.filter((token: any) => Tree.isInclude(token)).map((token: any) => (token.params.replace(/"/g, '').replace(/'/g, '').replace(/ /g, '')));
    let imports = data.tokens.filter((token: any) => Tree.isImport(token)).map((token: any) => {
      let match = /\/.*\.[\w:]+/.exec(token.params);
      if (match && match[0] !== 'undefined') {
        return match[0];
      } else {
        return false;
      }
    }).filter((x: any) => (x != false ));
    return includes.concat(imports);
  }

  /**
  	 * Generate a tree of dependencies for the provided
     * FreeMarker template
     * @params {String} path
  	 * @return {Object} file tree
  	 */
  generateTree(path: string = this.templatePath) {
    const tree = { filename: path, dependencies: [] };
    let deps = this.getDeps(path);
    tree.dependencies = deps.map((dep: string) => {
      return this.generateTree(dep);
    });
    return tree;
  }
}

export { Tree };
