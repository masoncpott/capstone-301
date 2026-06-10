import { BarChart } from '@mui/x-charts'
import { Paper, Stack, Typography } from '@mui/material'
import { useOutletContext } from 'react-router-dom'
import type { DashboardContext } from '../types'
import { sourceRoi, typeEngagement } from '../lib/metrics'

export function ContentTypePage() {
  const { filteredRecords } = useOutletContext<DashboardContext>()
  const engagement = typeEngagement(filteredRecords)
  const roi = sourceRoi(filteredRecords)

  return (
    <Stack spacing={2}>
      <Typography variant="h4">Content Type Lens</Typography>
      <Typography color="text.secondary">Compare TV shows, movies, and podcasts by engagement and strategy ROI.</Typography>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Engagement by Content Type</Typography>
        <BarChart
          height={320}
          xAxis={[{ scaleType: 'band', data: engagement.map((item) => item.label) }]}
          series={[{ label: 'Views (M)', data: engagement.map((item) => item.total) }]}
        />
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Produced vs Licensed ROI
        </Typography>
        <Stack spacing={1}>
          {roi.map((item) => (
            <Typography key={item.label}>
              {item.label}: {item.roi.toFixed(1)}% ROI
            </Typography>
          ))}
        </Stack>
      </Paper>
    </Stack>
  )
}
