import { Braces } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: 'JSON Validator',
  path: '/json-validator',
  description: translate('tools.json-validator.description'),
  keywords: ['json', 'validator'],
  component: () => import('./json-validator.vue'),
  icon: Braces,
  createdAt: new Date('2023-12-15'),
});
