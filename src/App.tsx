import { Box, Container, Typography } from '@mui/material'
import { Navigate, Outlet, Route, Routes, useSearchParams } from 'react-router-dom'
import { FilterPanel } from './components/FilterPanel'
import { TopNav } from './components/TopNav'
import { allOptions, contentData } from './data/contentData'
import { applyFilters, sortRecords } from './lib/metrics'
import { ContentTypePage } from './pages/ContentTypePage'
import { DashboardPage } from './pages/DashboardPage'
import { GenrePage } from './pages/GenrePage'
import { RegionPage } from './pages/RegionPage'
import type { DashboardContext, DashboardFilters } from './types'

function App() {
  return (
    <Routes>
      <Route element={<ShellLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="genre" element={<GenrePage />} />
        <Route path="region" element={<RegionPage />} />
        <Route path="type" element={<ContentTypePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

function ShellLayout() {
  const [searchParams, setSearchParams] = useSearchParams()

  const filters: DashboardFilters = {
    region: searchParams.get('region') ?? 'All',
    genre: searchParams.get('genre') ?? 'All',
    type: searchParams.get('type') ?? 'All',
    source: searchParams.get('source') ?? 'All',
    sortBy: (searchParams.get('sortBy') as DashboardFilters['sortBy']) ?? 'popularity',
  }

  const updateFilter = (key: keyof DashboardFilters, value: string) => {
    const next = new URLSearchParams(searchParams)
    next.set(key, value)
    setSearchParams(next, { replace: true })
  }

  const filtered = sortRecords(applyFilters(contentData, filters), filters.sortBy)

  const context: DashboardContext = {
    allRecords: contentData,
    filteredRecords: filtered,
    filters,
    updateFilter,
  }

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <TopNav />
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <Typography variant="overline" color="secondary.main" sx={{ letterSpacing: 2.2 }}>
          STREAMING STRATEGY INTELLIGENCE
        </Typography>
        <FilterPanel filters={filters} options={allOptions} onChange={updateFilter} totalFiltered={filtered.length} />
        <Outlet context={context} />
      </Container>
    </Box>
  )
}

export default App
