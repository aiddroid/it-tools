import { HttpRound } from '@vicons/material';
import { defineTool } from '../tool';
import { translate } from '@/plugins/i18n.plugin';

import { codesByCategories } from './http-status-codes.constants';

export const tool = defineTool({
  name: 'HTTP status codes',
  path: '/http-status-codes',
  description: translate('tools.http-status-codes.description'),
  keywords: [
    'http',
    'status',
    'codes',
    ...codesByCategories.flatMap(({ codes }) => codes.flatMap(({ code, name }) => [String(code), name])),
  ],
  component: () => import('./http-status-codes.vue'),
  icon: HttpRound,
  createdAt: new Date('2023-04-13'),
});
