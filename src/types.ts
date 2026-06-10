export type ContentType = 'TV Show' | 'Movie' | 'Podcast'
export type ContentSource = 'Produced' | 'Licensed'

export interface ContentRecord {
  id: string
  title: string
  genre: string
  type: ContentType
  region: string
  source: ContentSource
  releaseYear: number
  month: string
  viewsM: number
  completionRate: number
  rating: number
  costM: number
  revenueM: number
  roiPct: number
}

export interface DashboardFilters {
  region: string
  genre: string
  type: string
  source: string
  sortBy: 'popularity' | 'roi' | 'cost'
}

export interface DashboardContext {
  allRecords: ContentRecord[]
  filteredRecords: ContentRecord[]
  filters: DashboardFilters
  updateFilter: (key: keyof DashboardFilters, value: string) => void
}
