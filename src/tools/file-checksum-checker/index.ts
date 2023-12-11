import { FileCheck } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'File checksum checker',
  path: '/file-checksum-checker',
  description: '',
  keywords: ['file', 'checksum', 'checker'],
  component: () => import('./file-checksum-checker.vue'),
  icon: FileCheck,
  createdAt: new Date('2023-12-11'),
});
