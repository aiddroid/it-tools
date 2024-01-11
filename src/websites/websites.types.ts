import type { Component } from 'vue';

export interface Website {
  name: string
  url: string
  description: string
  keywords: string[]
  logoUrl: string
  isNew: boolean
  createdAt?: Date
}

export interface WebsiteCategory {
  name: string
  components: Website[]
}

// export type WebsiteWithCategory = Website & { category: string };
