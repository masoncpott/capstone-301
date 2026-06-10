import rawData from './json/contentData.json'
import type { ContentRecord } from '../types'

export const contentData = rawData as ContentRecord[]

export const allOptions = {
  region: ['All', ...new Set(contentData.map((item) => item.region))],
  genre: ['All', ...new Set(contentData.map((item) => item.genre))],
  type: ['All', ...new Set(contentData.map((item) => item.type))],
  source: ['All', ...new Set(contentData.map((item) => item.source))],
}
