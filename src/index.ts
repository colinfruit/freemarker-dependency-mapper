import {Command, flags} from '@oclif/command'
import { FreemarkerDeps } from './parse';

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
  }

  static args = [{name: 'file'}]

  async run() {
    const {args, flags} = this.parse(FreemarkerDependencyMapper)

    if (flags.template) {
      const deps = new FreemarkerDeps(flags.template);
      deps.parseFile();
    } else {
      throw new Error("you must supply a template arg!");
    }
  }
}

export = FreemarkerDependencyMapper
