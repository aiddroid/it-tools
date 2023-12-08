import { ArrowsShuffle, MapPin } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: 'IP location',
  path: '/ip-location',
  description: translate('tools.ip-location.description'),
  keywords: ['ip', 'location'],
  component: () => import('./ip-location.vue'),
  icon: MapPin,
  createdAt: new Date('2023-12-05'),
});
