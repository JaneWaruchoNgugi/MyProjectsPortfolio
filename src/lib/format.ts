const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const parse = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number)
  return { y, m: m - 1, d }
}
export const monthLabel = (iso: string) => {
  const { y, m } = parse(iso)
  return `${months[m]} ${y}`
}
export const dayLabel = (iso: string) => {
  const { y, m, d } = parse(iso)
  return `${d} ${months[m]} ${y}`
}
export const monthsBetween = (a: string, b: Date) => {
  const p = parse(a)
  return (b.getFullYear() - p.y) * 12 + (b.getMonth() - p.m) + 1
}
export const host = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '')
