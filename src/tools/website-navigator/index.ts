import { World } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: 'Website navigator',
  path: '/website-navigator',
  description: translate('tools.website-navigator.description'),
  keywords: ['website', 'navigator'],
  component: () => import('./website-navigator.vue'),
  icon: World,
  createdAt: new Date('2024-01-06'),
});
