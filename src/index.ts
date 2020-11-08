import {Command, flags} from '@oclif/command'
import { FreemarkerDeps } from './freemarkerDeps';

class FreemarkerDependencyMapper extends Command {
  static description = 'describe the command here'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag for ftl template path
    template: flags.string({char: 't', description: 'ftl template path'}),
    dir: flags.string({char: 'd', description: 'ftl base path[s]'}),
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(FreemarkerDependencyMapper)

    if (flags.template && flags.dir) {
      const dir = flags.dir.split(",");
      dir.forEach((path: string) => this.log("path", path));
      const deps = new FreemarkerDeps(flags.template, dir);
      deps.generateTree();
    } else {
      throw new Error("you must supply a template and dir args!");
    }
  }
}

export = FreemarkerDependencyMapper
