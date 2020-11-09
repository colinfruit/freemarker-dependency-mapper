import {Command, flags} from '@oclif/command'
import { Tree } from './tree';
import { image } from './graph';

class FreemarkerDependencyMapper extends Command {
  static description = 'Generate a visualization of the dependency tree of a FreeMarker template'

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    help: flags.help({char: 'h'}),
    // flag with a value (-n, --name=VALUE)
    name: flags.string({char: 'n', description: 'name to print'}),
    // flag for ftl template path
    template: flags.string({char: 't', description: 'ftl template path'}),
    dir: flags.string({char: 'd', description: 'ftl base path[s]'}),
    // TODO make this work for all img formats
    output: flags.string({char: 'o', description: 'output path'})
  }

  async run() {
    const {flags} = this.parse(FreemarkerDependencyMapper)

    if (flags.template && flags.dir && flags.output) {
      const dir = flags.dir.split(",");
      const deps = new Tree(flags.template, dir);
      const tree = deps.generateTree();
      image(tree, flags.output);
    } else {
      throw new Error("you must supply a template, dir, and output flags!");
    }
  }
}

export = FreemarkerDependencyMapper
