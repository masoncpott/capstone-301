import { BarChart, LineChart, PieChart } from '@mui/x-charts'
import { Box, Chip, Paper, Stack, Typography } from '@mui/material'
import { useOutletContext } from 'react-router-dom'
import type { DashboardContext } from '../types'
import { regionalTrend, sourceRoi, summarize } from '../lib/metrics'
import { GENRE_COLORS } from '../data/contentData'

function formatMillions(value: number) {
  return `${value.toFixed(1)}M`
}

export function DashboardPage() {
  const { allRecords, filteredRecords } = useOutletContext<DashboardContext>()

  const summary = summarize(filteredRecords)
  const genreData = buildAlphabeticalGenreSeries(allRecords, filteredRecords)
  const sourceData = sourceRoi(filteredRecords)
  const trendData = regionalTrend(filteredRecords)

  return (
    <Stack spacing={2}>
      <Typography variant="h4">Executive Dashboard</Typography>
      <Typography color="text.secondary">
        Popularity, ROI, and trend intelligence to guide where to produce, where to license, and where to pull back.
      </Typography>

      <Box sx={{ display: 'grid', gap: 1.5, gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' } }}>
        <KpiCard title="Total Titles" value={String(summary.totalTitles)} />
        <KpiCard title="Views" value={formatMillions(summary.totalViews)} />
        <KpiCard title="Net ROI" value={`${summary.roiPct.toFixed(1)}%`} />
        <KpiCard title="Avg Rating" value={summary.avgRating.toFixed(1)} />
      </Box>

      <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', lg: '1.3fr 1fr' } }}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Popular Genres by Views
          </Typography>
          <BarChart
            height={320}
            xAxis={[{
              scaleType: 'band',
              data: genreData.map((item) => item.label),
              colorMap: GENRE_COLORS,
            }]}
            series={[{ label: 'Views (M)', data: genreData.map((item) => item.total) }]}
          />
        </Paper>

        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            ROI by Catalog Strategy
          </Typography>
          <PieChart
            height={320}
            colors={GENRE_COLORS.colors}
            series={[
              {
                data: sourceData.map((item, index) => ({ id: index, label: item.label, value: Math.max(item.roi, 0.1) })),
              },
            ]}
          />
          <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
            {sourceData.map((item) => (
              <Chip key={item.label} label={`${item.label}: ${item.roi.toFixed(1)}% ROI`} color="primary" variant="outlined" />
            ))}
          </Stack>
        </Paper>
      </Box>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Regional Popularity Trend Over Time
        </Typography>
        <LineChart
          height={300}
          colors={[GENRE_COLORS.colors[0]]}
          xAxis={[{ scaleType: 'point', data: trendData.map((item) => item.month) }]}
          series={[{ label: 'Views (M)', data: trendData.map((item) => item.views), area: true }]}
        />
      </Paper>
    </Stack>
  )
}

function buildAlphabeticalGenreSeries(allRecords: DashboardContext['allRecords'], filteredRecords: DashboardContext['filteredRecords']) {
  const allGenres = [...new Set(allRecords.map((item) => item.genre))].sort((a, b) => a.localeCompare(b))
  const viewsByGenre = new Map<string, number>()

  filteredRecords.forEach((item) => {
    viewsByGenre.set(item.genre, (viewsByGenre.get(item.genre) ?? 0) + item.viewsM)
  })

  return allGenres.map((genre) => ({ label: genre, total: Number((viewsByGenre.get(genre) ?? 0).toFixed(2)) }))
}

function KpiCard({ title, value }: { title: string; value: string }) {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="body2" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="h5">{value}</Typography>
    </Paper>
  )
}
