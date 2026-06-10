import { faker } from '@faker-js/faker'
import fs from 'node:fs'
import path from 'node:path'

faker.seed(301)

const genres = ['Drama', 'Sci-Fi', 'Comedy', 'Documentary', 'Thriller', 'Fantasy']
const types = ['TV Show', 'Movie', 'Podcast']
const regions = ['North America', 'Latin America', 'Europe', 'APAC', 'Middle East & Africa']
const sources = ['Produced', 'Licensed']
const months = [
  '2025-01',
  '2025-02',
  '2025-03',
  '2025-04',
  '2025-05',
  '2025-06',
  '2025-07',
  '2025-08',
  '2025-09',
  '2025-10',
  '2025-11',
  '2025-12',
  '2026-01',
  '2026-02',
  '2026-03',
  '2026-04',
  '2026-05',
]

const contentData = []

for (let i = 0; i < 320; i += 1) {
  const source = faker.helpers.arrayElement(sources)
  const type = faker.helpers.arrayElement(types)
  const genre = faker.helpers.arrayElement(genres)
  const region = faker.helpers.arrayElement(regions)
  const month = faker.helpers.arrayElement(months)

  const baseCost = source === 'Produced' ? faker.number.float({ min: 22, max: 170, fractionDigits: 2 }) : faker.number.float({ min: 3, max: 65, fractionDigits: 2 })
  const baseViews = faker.number.float({ min: 0.6, max: 18.5, fractionDigits: 2 })
  const qualityScore = faker.number.float({ min: 5.3, max: 9.7, fractionDigits: 1 })

  const boostFromType = type === 'TV Show' ? 1.22 : type === 'Movie' ? 1.1 : 0.84
  const boostFromGenre = genre === 'Sci-Fi' || genre === 'Thriller' ? 1.13 : genre === 'Documentary' ? 0.82 : 1
  const regionFactor =
    region === 'North America'
      ? 1.18
      : region === 'Europe'
        ? 1.07
        : region === 'APAC'
          ? 1.1
          : region === 'Latin America'
            ? 0.92
            : 0.87

  const revenueM = Number((baseViews * boostFromType * boostFromGenre * regionFactor * faker.number.float({ min: 2.1, max: 5.4, fractionDigits: 2 })).toFixed(2))
  const costM = Number(baseCost.toFixed(2))
  const viewsM = Number((baseViews * regionFactor).toFixed(2))

  contentData.push({
    id: `CNT-${String(i + 1).padStart(4, '0')}`,
    title: faker.music.songName(),
    genre,
    type,
    region,
    source,
    releaseYear: faker.number.int({ min: 2016, max: 2026 }),
    month,
    viewsM,
    completionRate: faker.number.float({ min: 0.36, max: 0.98, fractionDigits: 2 }),
    rating: qualityScore,
    costM,
    revenueM,
    roiPct: Number((((revenueM - costM) / costM) * 100).toFixed(1)),
  })
}

const outputPath = path.resolve(process.cwd(), 'src/data/json/contentData.json')
fs.writeFileSync(outputPath, `${JSON.stringify(contentData, null, 2)}\n`, 'utf8')

console.log(`Generated ${contentData.length} records at ${outputPath}`)
