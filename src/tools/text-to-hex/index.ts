import { Replace } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Text to Hex',
  path: '/text-to-hex',
  description: 'Convert text to its Hex(Hexadecimal, base-16 number system) representation and vice versa.',
  keywords: ['text', 'to', 'hex'],
  component: () => import('./text-to-hex.vue'),
  icon: Replace,
  createdAt: new Date('2023-12-06'),
});