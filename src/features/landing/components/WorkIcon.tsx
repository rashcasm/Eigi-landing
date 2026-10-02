const PATHS = {
  person: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM5 21v-3c0-3 3-4 7-4s7 1 7 4v3',
  computer: 'M6 6h12v12H6zM9 9h6v6H9zM9 3v3m6-3v3M9 18v3m6-3v3M3 9h3m-3 6h3m12-6h3m-3 6h3',
  support: 'M5 5h14v10H9l-4 4V5Zm4 4h6m-6 3h4',
  sales: 'M5 17 11 11l4 4 5-8m-6 0h6v6M4 4v16h16',
  operations: 'M8 3h8v4H8zM6 5H4v16h16V5h-2M8 12h8m-8 4h5',
  product: 'm9 7-5 5 5 5m6-10 5 5-5 5M13 4l-2 16',
  people: 'M9 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8v-2c0-3 3-4 7-4s7 1 7 4v2m0-16a4 4 0 0 1 0 8m3 3c2 1 3 2 3 5',
  check: 'm5 12 4 4L19 6',
} as const

export function WorkIcon({ name }: { name: keyof typeof PATHS }) {
  return <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={PATHS[name]} /></svg>
}
