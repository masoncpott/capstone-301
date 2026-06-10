import rawData from './json/contentData.json'
import type { ContentRecord } from '../types'

export const contentData = rawData as ContentRecord[]

export const allOptions = {
  region: ['All', ...new Set(contentData.map((item) => item.region))],
  genre: ['All', ...new Set(contentData.map((item) => item.genre))],
  type: ['All', ...new Set(contentData.map((item) => item.type))],
  source: ['All', ...new Set(contentData.map((item) => item.source))],
}

export const GENRE_COLORS = {
  type: 'ordinal' as const,
  values: ['Comedy', 'Documentary', 'Drama', 'Fantasy', 'Sci-Fi', 'Thriller'],
  colors: [
    '#3BBDB5', // Comedy - Vibrant Teal (from starting palette)
    '#F4527F', // Documentary - Rose Pink (from starting palette)
    '#F12B87', // Drama - Deep Magenta (from starting palette)
    '#311057', // Fantasy - Rich Dark Purple (from starting palette)
    '#480A51', // Sci-Fi - Deep Plum (from starting palette)
    '#a04cc8', // Thriller - Orchid Purple (built from starting palette)
  ],
}

