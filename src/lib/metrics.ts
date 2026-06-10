import type { ContentRecord, DashboardFilters } from '../types'

export function applyFilters(data: ContentRecord[], filters: DashboardFilters): ContentRecord[] {
  return data.filter((item) => {
    const regionMatch = filters.region === 'All' || item.region === filters.region
    const genreMatch = filters.genre === 'All' || item.genre === filters.genre
    const typeMatch = filters.type === 'All' || item.type === filters.type
    const sourceMatch = filters.source === 'All' || item.source === filters.source

    return regionMatch && genreMatch && typeMatch && sourceMatch
  })
}

export function sortRecords(data: ContentRecord[], sortBy: DashboardFilters['sortBy']): ContentRecord[] {
  const sorted = [...data]

  if (sortBy === 'roi') {
    return sorted.sort((a, b) => b.roiPct - a.roiPct)
  }

  if (sortBy === 'cost') {
    return sorted.sort((a, b) => b.costM - a.costM)
  }

  return sorted.sort((a, b) => b.viewsM - a.viewsM)
}

export function summarize(data: ContentRecord[]) {
  const totalViews = data.reduce((sum, item) => sum + item.viewsM, 0)
  const totalCost = data.reduce((sum, item) => sum + item.costM, 0)
  const totalRevenue = data.reduce((sum, item) => sum + item.revenueM, 0)
  const avgRating = data.length > 0 ? data.reduce((sum, item) => sum + item.rating, 0) / data.length : 0
  const roiPct = totalCost > 0 ? ((totalRevenue - totalCost) / totalCost) * 100 : 0

  return {
    totalTitles: data.length,
    totalViews,
    totalCost,
    totalRevenue,
    avgRating,
    roiPct,
  }
}

function groupByKey(data: ContentRecord[], key: keyof ContentRecord, value: keyof ContentRecord) {
  const grouped = new Map<string, number>()

  data.forEach((item) => {
    const group = String(item[key])
    const amount = Number(item[value])
    grouped.set(group, (grouped.get(group) ?? 0) + amount)
  })

  return Array.from(grouped.entries()).map(([label, total]) => ({ label, total: Number(total.toFixed(2)) }))
}

export function genrePopularity(data: ContentRecord[]) {
  return groupByKey(data, 'genre', 'viewsM').sort((a, b) => b.total - a.total)
}

export function typeEngagement(data: ContentRecord[]) {
  return groupByKey(data, 'type', 'viewsM').sort((a, b) => b.total - a.total)
}

export function sourceRoi(data: ContentRecord[]) {
  const grouped = new Map<string, { revenue: number; cost: number }>()

  data.forEach((item) => {
    const current = grouped.get(item.source) ?? { revenue: 0, cost: 0 }
    current.revenue += item.revenueM
    current.cost += item.costM
    grouped.set(item.source, current)
  })

  return Array.from(grouped.entries()).map(([label, totals]) => {
    const roi = totals.cost > 0 ? ((totals.revenue - totals.cost) / totals.cost) * 100 : 0
    return { label, roi: Number(roi.toFixed(1)) }
  })
}

export function regionalTrend(data: ContentRecord[]) {
  const byMonth = new Map<string, number>()

  data.forEach((item) => {
    byMonth.set(item.month, (byMonth.get(item.month) ?? 0) + item.viewsM)
  })

  return Array.from(byMonth.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([month, views]) => ({ month, views: Number(views.toFixed(2)) }))
}

export function topRegionsByGenre(data: ContentRecord[]) {
  const keyMap = new Map<string, number>()

  data.forEach((item) => {
    const key = `${item.genre}::${item.region}`
    keyMap.set(key, (keyMap.get(key) ?? 0) + item.viewsM)
  })

  return Array.from(keyMap.entries())
    .map(([key, totalViews]) => {
      const [genre, region] = key.split('::')
      return { genre, region, totalViews: Number(totalViews.toFixed(2)) }
    })
    .sort((a, b) => b.totalViews - a.totalViews)
    .slice(0, 10)
}
