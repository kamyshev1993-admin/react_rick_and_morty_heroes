import {type ErrorResponse, type HeroesResponse, HeroState} from "../types.ts";


export async function getHeroes(
    name: string,
    heroState: HeroState,
    page: number
): Promise<HeroesResponse> {
    const url = new URL("https://rickandmortyapi.com/api/character")

    url.searchParams.set("name", name)
    url.searchParams.set("page", page.toString())
    // Если с веба передали All, то не передаем статус в параметрах
    if (heroState !== HeroState.All) {
        url.searchParams.set("status", heroState)
    }

    const request = new Request(url)
    const response: Response = await fetch(request)

    if (!response.ok) {
        const errorResponse = await response.json() as ErrorResponse
        throw new Error(errorResponse.error)
    }

    return await response.json() as HeroesResponse
}