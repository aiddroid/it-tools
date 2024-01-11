import { isAfter, subWeeks } from 'date-fns';
import type { Website } from './websites.types';

type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export function defineWebsite(website: WithOptional<Website, 'isNew'>) {
  const isNew = website.createdAt ? isAfter(website.createdAt, subWeeks(new Date(), 2)) : false;

  return {
    isNew,
    ...website,
  };
}
