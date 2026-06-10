import { BarChart, LineChart } from '@mui/x-charts'
import { Paper, Stack, Typography } from '@mui/material'
import { useOutletContext } from 'react-router-dom'
import type { DashboardContext } from '../types'
import { regionalTrend } from '../lib/metrics'
import { GENRE_COLORS } from '../data/contentData'

export function RegionPage() {
  const { filteredRecords } = useOutletContext<DashboardContext>()
  const trend = regionalTrend(filteredRecords)

  const byRegion = new Map<string, number>()
  filteredRecords.forEach((item) => {
    byRegion.set(item.region, (byRegion.get(item.region) ?? 0) + item.viewsM)
  })
  const regionRows = Array.from(byRegion.entries()).sort((a, b) => b[1] - a[1])

  return (
    <Stack spacing={2}>
      <Typography variant="h4">Region Lens</Typography>
      <Typography color="text.secondary">Compare regional demand and its movement month to month.</Typography>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Regional Share by Views</Typography>
        <BarChart
          height={330}
          colors={[GENRE_COLORS.colors[0]]}
          xAxis={[{ scaleType: 'band', data: regionRows.map(([region]) => region) }]}
          series={[{ label: 'Views (M)', data: regionRows.map(([, views]) => Number(views.toFixed(1))) }]}
        />
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Trend Timeline</Typography>
        <LineChart
          height={300}
          colors={[GENRE_COLORS.colors[0]]}
          xAxis={[{ scaleType: 'point', data: trend.map((item) => item.month) }]}
          series={[{ label: 'Views (M)', data: trend.map((item) => item.views), area: true }]}
        />
      </Paper>
    </Stack>
  )
}
