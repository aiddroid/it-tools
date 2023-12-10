import { Replace } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: 'Text to HEX',
  path: '/text-to-hex',
  description: translate('tools.text-to-hex.description'),
  keywords: ['text', 'to', 'hex'],
  component: () => import('./text-to-hex.vue'),
  icon: Replace,
  createdAt: new Date('2023-12-06'),
});