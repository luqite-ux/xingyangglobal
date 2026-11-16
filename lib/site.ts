export const site = {
  url: 'https://xingyangglobal.com',
  displayName: 'Xingyang City Flour Machinery Manufacturing Factory',
  wordmark: { primary: 'XINGYANG', secondary: 'FLOUR MACHINERY' },
  email: 'info@xingyangglobal.com',
  phone: '+86 135 2358 4804',
  phoneHref: 'tel:+8613523584804',
  address: 'Gaocun, Xingyang, Henan, China',
  founded: 2002,
  moq: 'One machine',
  facts: {
    siteArea: '3,000 m²',
    workshops: 2,
    warehouses: 3,
    lines: ['Automated line', 'Customized line'],
    monthlyCapacity: '300 units',
  },
} as const

export const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Applications', href: '/applications' },
  { label: 'Manufacturing', href: '/manufacturing' },
  { label: 'About', href: '/about' },
  { label: 'News', href: '/news' },
  { label: 'Contact', href: '/contact' },
] as const

export const rfqIntents = {
  quote: 'Request a quote',
  'model-selection': 'Model selection',
} as const
export type RfqIntent = keyof typeof rfqIntents
