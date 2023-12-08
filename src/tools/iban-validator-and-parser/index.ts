import { defineTool } from '../tool';
import Bank from '~icons/mdi/bank';
import { translate } from '@/plugins/i18n.plugin';

export const tool = defineTool({
  name: 'IBAN validator and parser',
  path: '/iban-validator-and-parser',
  description: translate('tools.iban-validator-and-parser.description'),
  keywords: ['iban', 'validator', 'and', 'parser', 'bic', 'bank'],
  component: () => import('./iban-validator-and-parser.vue'),
  icon: Bank,
  createdAt: new Date('2023-08-26'),
});
