import { Photo } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Photo exif reader',
  path: '/photo-exif-reader',
  description: '',
  keywords: ['photo', 'exif', 'reader'],
  component: () => import('./photo-exif-reader.vue'),
  icon: Photo,
  createdAt: new Date('2023-12-12'),
});
