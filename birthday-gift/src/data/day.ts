import routes from './routes.json'

// All times are Valencia local time (CET, UTC+1 in November)
export const DAY_START = new Date('2026-11-07T11:00:00+01:00')
export const DINNER_START = new Date('2026-11-07T20:30:00+01:00')
export const DAY_END = new Date('2026-11-08T00:30:00+01:00')

export const TICKETS_URL =
  'https://fareharbor.com/embeds/checkin/myfirstpaella/bookings/81eb870c-d66c-411b-9153-481ab0834686/?language=en-gb&source=email'

export type PlaceId = 'home' | 'church' | 'market' | 'kitchen' | 'bakkali'

export interface Place {
  id: PlaceId
  name: string
  address: string
  icon: string
  coords: [number, number]
}

export const PLACES: Record<PlaceId, Place> = {
  home: {
    id: 'home',
    name: 'Hjemme',
    address: 'Carrer del Compromís de Casp 8, 5. etg, dør 5',
    icon: '🏡',
    coords: [39.4589, -0.38793],
  },
  church: {
    id: 'church',
    name: 'Parròquia de Sant Valeri',
    address: 'Carrer del Pare Perera 6, 46006 València',
    icon: '⛪',
    coords: [39.462703, -0.372236],
  },
  market: {
    id: 'market',
    name: 'Mercat de Russafa',
    address: 'Plaça del Baró de Cortés, 46006 València',
    icon: '🧺',
    coords: [39.46204, -0.37139],
  },
  kitchen: {
    id: 'kitchen',
    name: 'My First Paella – kjøkkenet',
    address: 'Carrer del Penyagolosa 5, 46006 València',
    icon: '🥘',
    coords: [39.460795, -0.364949],
  },
  bakkali: {
    id: 'bakkali',
    name: 'Living Bakkali',
    address: 'Carrer de Xile 9, 46021 València',
    icon: '🏮',
    coords: [39.470752, -0.357098],
  },
}

export type LegId = keyof typeof routes

export interface Leg {
  id: LegId
  label: string
  color: string
  from: PlaceId
  to: PlaceId
  note: string
}

export const LEGS: Leg[] = [
  { id: 'morning', label: 'Morgentur', color: '#1f3a93', from: 'home', to: 'church', note: `${routes.morning.duration} min å gå` },
  { id: 'paella', label: 'Med kokken', color: '#e79a12', from: 'church', to: 'kitchen', note: `kirke → marked → kjøkken · ${routes.paella.duration} min` },
  { id: 'siesta', label: 'Hjem til siesta', color: '#4e7a3a', from: 'kitchen', to: 'home', note: `${routes.siesta.duration} min å gå` },
  { id: 'evening', label: 'Til middag', color: '#c8102e', from: 'home', to: 'bakkali', note: `${routes.evening.duration} min å gå – eller taxi` },
]

export const ROUTES = routes as Record<LegId, { distance: number; duration: number; path: [number, number][] }>

export interface Chapter {
  id: string
  time: string
  kicker: string
  title: string
  text: string
  word: { term: string; meaning: string }
  images: string[]
  place: PlaceId
  // Sky gradient (top, bottom) and sun position along its arc (0 = sunrise, 180 = sunset)
  sky: [string, string]
  sun: number
  night?: boolean
}

export const CHAPTERS: Chapter[] = [
  {
    id: 'church',
    time: '11:00',
    kicker: 'Morgen',
    title: 'Vi møtes ved Sant Valeri',
    text: `Dagen starter ved kirkedøra til Parròquia de Sant Valeri, midt i Russafa. Vi går hjemmefra rundt 10:30 – en ${routes.morning.duration} minutters morgentur, med tid til en cortado på veien.`,
    word: { term: 'Bon dia!', meaning: 'God morgen – på valenciansk.' },
    images: ['/images/church.jpg'],
    place: 'church',
    sky: ['#9fd3f2', '#fff4dc'],
    sun: 35,
  },
  {
    id: 'market',
    time: '≈ 11:15',
    kicker: 'Markedet',
    title: 'Handletur i Mercat de Russafa',
    text: 'Sammen med en lokal kokk handler vi råvarene selv: grønne bønner, garrofó, tomater, safran og rosmarin. Vi lærer hva som hører hjemme i en ekte paella – og hva som absolutt ikke gjør det (ingen chorizo!).',
    word: { term: 'Garrofó', meaning: 'De store, flate hvite bønnene som gjør paella valenciana til nettopp valenciana.' },
    images: ['/images/market.jpg', '/images/peppers.jpg'],
    place: 'market',
    sky: ['#7cc2ea', '#fff0c4'],
    sun: 55,
  },
  {
    id: 'tapas',
    time: '≈ 12:00',
    kicker: 'Tapas',
    title: 'Tapas & sangria',
    text: 'På kjøkkenet i Carrer del Penyagolosa venter patatas bravas, dampede blåskjell, manchego, skinke og oliven – med sangria eller øl. Litt påfyll før vi setter i gang.',
    word: { term: 'Salut!', meaning: 'Skål!' },
    images: ['/images/bravas.jpg'],
    place: 'kitchen',
    sky: ['#5fb0e2', '#ffe6a3'],
    sun: 80,
  },
  {
    id: 'paella',
    time: '≈ 12:30 – 14:30',
    kicker: 'Hovedretten',
    title: 'Vår aller første paella',
    text: 'Steg for steg, ved siden av en profesjonell kokk, lager vi vår egen paella fra bunnen av. Så spiser vi den med valenciansk tomatsalat, lokal vin, coca de llanda og frukt – og avslutter med mistela, kaffe og cazalla.',
    word: { term: 'Socarrat', meaning: 'Den sprø, karamelliserte risskorpen i bunnen av pannen. Den skal vi slåss om.' },
    images: ['/images/paella.jpg'],
    place: 'kitchen',
    sky: ['#f6c25e', '#fde4b0'],
    sun: 105,
  },
  {
    id: 'siesta',
    time: '15:00',
    kicker: 'Ettermiddag',
    title: 'Migdiada',
    text: `Mette og fornøyde spaserer vi hjem (${routes.siesta.duration} min – vi trenger det). Resten av ettermiddagen er hellig: sofa, siesta og kanskje litt sol på balkongen i femte etasje.`,
    word: { term: 'Migdiada', meaning: 'Siesta – på valenciansk.' },
    images: ['/images/micalet.jpg'],
    place: 'home',
    sky: ['#f39a5b', '#fbd3a6'],
    sun: 150,
  },
  {
    id: 'dinner',
    time: '20:30',
    kicker: 'Kveld',
    title: 'Middag på Living Bakkali',
    text: 'Når mørket har senket seg, pynter vi oss og drar til Living Bakkali i Carrer de Xile – «en reise til Orienten uten å forlate Valencia». Valencianske råvarer møter japanske smaker, i et rom fullt av detaljer. Bord for to.',
    word: { term: 'Bon profit!', meaning: 'Velbekomme!' },
    images: ['/images/twilight.jpg'],
    place: 'bakkali',
    sky: ['#121c4a', '#3d2a6b'],
    sun: 180,
    night: true,
  },
]

export const TIMELINE: { time: string; text: string; place: PlaceId; at: Date }[] = [
  { time: '10:30', text: 'Vi går hjemmefra', place: 'home', at: new Date('2026-11-07T10:30:00+01:00') },
  { time: '11:00', text: 'Møtes ved Sant Valeri', place: 'church', at: new Date('2026-11-07T11:00:00+01:00') },
  { time: '11:15', text: 'Mercat de Russafa', place: 'market', at: new Date('2026-11-07T11:15:00+01:00') },
  { time: '12:00', text: 'Tapas & sangria', place: 'kitchen', at: new Date('2026-11-07T12:00:00+01:00') },
  { time: '12:30', text: 'Vi lager paella', place: 'kitchen', at: new Date('2026-11-07T12:30:00+01:00') },
  { time: '14:30', text: 'Hjem til migdiada', place: 'home', at: new Date('2026-11-07T14:30:00+01:00') },
  { time: '20:30', text: 'Middag på Living Bakkali', place: 'bakkali', at: DINNER_START },
]
