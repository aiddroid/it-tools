import { ArrowsShuffle } from '@vicons/tabler';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: 'Regex visualization tester',
  path: '/regex-visualization-tester',
  description: translate('tools.regex-visualization-tester.description'),
  keywords: ['regex', 'visualization', 'tester'],
  component: () => import('./regex-visualization-tester.vue'),
  icon: ArrowsShuffle,
  createdAt: new Date('2023-12-10'),
});