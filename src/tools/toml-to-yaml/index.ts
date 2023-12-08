import { defineTool } from '../tool';
import BracketIcon from '~icons/mdi/code-brackets';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: 'TOML to YAML',
  path: '/toml-to-yaml',
  description: translate('tools.toml-to-yaml.description'),
  keywords: ['toml', 'yaml', 'convert', 'online', 'transform', 'parse'],
  component: () => import('./toml-to-yaml.vue'),
  icon: BracketIcon,
  createdAt: new Date('2023-06-23'),
});
