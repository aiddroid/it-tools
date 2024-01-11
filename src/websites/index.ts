import { defineWebsite } from './website';
import defaultJsonResponse from './data.json';
import type { Website, WebsiteCategory } from './websites.types';

const locale = useStorage('locale')

const websitesResponse = await fetch('https://itoolkit.app/api/v1/websites?lang=' + locale.value).then(response => response.json()).catch(error => {
  return defaultJsonResponse;
});
export const websitesByCategory: WebsiteCategory[] = websitesResponse.data as WebsiteCategory[];
export const websites = websitesByCategory.flatMap(({ components }) => components);
// export const websitesWithCategory = websitesByCategory.flatMap(({ components, name }) =>
//   components.map(website => ({ category: name, ...website })),
// );