import { BarChart } from '@mui/x-charts'
import { Paper, Stack, Typography } from '@mui/material'
import { useOutletContext } from 'react-router-dom'
import type { DashboardContext } from '../types'
import { genrePopularity, topRegionsByGenre } from '../lib/metrics'

export function GenrePage() {
  const { filteredRecords } = useOutletContext<DashboardContext>()
  const genreData = genrePopularity(filteredRecords)
  const topCrossovers = topRegionsByGenre(filteredRecords)

  return (
    <Stack spacing={2}>
      <Typography variant="h4">Genre Lens</Typography>
      <Typography color="text.secondary">Spot top-performing genres and the regions where each genre wins.</Typography>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Genre Popularity</Typography>
        <BarChart
          height={340}
          xAxis={[{ scaleType: 'band', data: genreData.map((item) => item.label) }]}
          series={[{ label: 'Views (M)', data: genreData.map((item) => item.total) }]}
        />
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Top Genre x Region Opportunities
        </Typography>
        <Stack spacing={1}>
          {topCrossovers.map((item) => (
            <Typography key={`${item.genre}-${item.region}`} variant="body2">
              {item.genre} in {item.region}: {item.totalViews.toFixed(1)}M views
            </Typography>
          ))}
        </Stack>
      </Paper>
    </Stack>
  )
}
