import { Box, FormControl, InputLabel, MenuItem, Paper, Select, Stack, Typography } from '@mui/material'
import type { DashboardFilters } from '../types'

interface FilterPanelProps {
  filters: DashboardFilters
  options: {
    region: string[]
    genre: string[]
    type: string[]
    source: string[]
  }
  onChange: (key: keyof DashboardFilters, value: string) => void
  totalFiltered: number
}

export function FilterPanel({ filters, options, onChange, totalFiltered }: FilterPanelProps) {
  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={1.5}
        sx={{ alignItems: { xs: 'stretch', md: 'center' } }}
      >
        <Typography variant="subtitle1" sx={{ minWidth: 130 }}>
          Global Filters
        </Typography>

        <FilterSelect label="Region" value={filters.region} options={options.region} onChange={(value) => onChange('region', value)} />
        <FilterSelect label="Genre" value={filters.genre} options={options.genre} onChange={(value) => onChange('genre', value)} />
        <FilterSelect label="Type" value={filters.type} options={options.type} onChange={(value) => onChange('type', value)} />
        <FilterSelect label="Source" value={filters.source} options={options.source} onChange={(value) => onChange('source', value)} />
        <FilterSelect
          label="Sort"
          value={filters.sortBy}
          options={['popularity', 'roi', 'cost']}
          onChange={(value) => onChange('sortBy', value)}
        />

        <Box sx={{ ml: 'auto', px: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Matching titles
          </Typography>
          <Typography variant="h6">{totalFiltered}</Typography>
        </Box>
      </Stack>
    </Paper>
  )
}

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
}) {
  return (
    <FormControl size="small" sx={{ minWidth: { xs: '100%', md: 150 } }}>
      <InputLabel>{label}</InputLabel>
      <Select label={label} value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
