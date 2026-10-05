export enum HeroState {
    Alive = 'alive',
    Dead = 'dead',
    Unknown = 'unknown',
    All = 'all',
}

export type Hero = {
    id: number
    name: string
    status: 'Alive' | 'Dead' | 'unknown'
}

export type HeroesResponse = {
    info: {
        count: number
        pages: number
        next: string | null
        prev: string | null
    }
    results: Hero[]
}