import {type ChangeEvent, useEffect, useState} from "react";
import * as React from "react";
import {type Hero, type HeroesResponse, HeroState} from "./types.ts";
import {GetHeroes} from "./api/Heroes";
import './App.css';

type SelectOnChangeParams = {
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

type InputOnChangeParams = {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}


function HeroStateSelect({onChange}: SelectOnChangeParams) {
    return <div className="heroStateSelect">
        <select
            defaultValue={HeroState.All}
            onChange={onChange}
        >
            <option value={HeroState.Alive}>Alive</option>
            <option value={HeroState.Dead}>Dead</option>
            <option value={HeroState.Unknown}>Unknown</option>
            <option value={HeroState.All}>All</option>
        </select>
    </div>
}

function HeroNameInput({onChange}: InputOnChangeParams) {
    return <div className="heroNameInput">
        <input
            type="text"
            placeholder="Enter task name"
            onChange={onChange}
        />
    </div>
}

export default function HeroApp() {
    const [heroState, setHeroState] = useState<HeroState>(HeroState.All)
    const [heroName, setHeroName] = useState("")

    const [heroes, setHeroes] = useState<Hero[]>([])
    const [page, setPage] = useState(1)
    const [pages, setPages] = useState(1)


    function handleHeroSelectChange(elem: React.ChangeEvent<HTMLSelectElement>) {
        const elemValue = elem.target.value as HeroState
        if (Object.values(HeroState).includes(elemValue)) {
            setHeroState(elemValue)
        } else {
            console.error("Incorrect target name " + elemValue)
        }
    }

    useEffect((): void => {
        async function loadHeroes() {
            try {
                const response: HeroesResponse = await GetHeroes(heroName, heroState, page)
                setHeroes(response.results)
                setPages(response.info.pages)
            } catch (error) {
                setHeroes([])
                setPages(1)
            }
        }

        void loadHeroes()
    }, [heroName, heroState, page])

    return (
        <div className="hero-app">
            <HeroStateSelect onChange={(elem: React.ChangeEvent<HTMLSelectElement>) => handleHeroSelectChange(elem)}/>
            <HeroNameInput onChange={(elem: React.ChangeEvent<HTMLInputElement>) => setHeroName(elem.target.value)}/>
            <div className="heroes-list">
                {heroes.length > 0 ? (
                    heroes.map(hero => (
                        <div key={hero.id} className="heroes">
                            <h2>
                                {hero.name}
                                <span className="hero-status">
                        {hero.status}
                    </span>
                            </h2>
                        </div>
                    ))
                ) : (
                    <div className="no-results">No results</div>
                )}
            </div>

            {heroes.length > 0 && (
                <div className="pagination">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        Previous
                    </button>

                    <span> {" "}Page {page} of {pages}{" "} </span>

                    <button
                        disabled={page === pages}
                        onClick={() => setPage(page + 1)}
                    >
                        Next
                    </button>
                </div>
            )}

        </div>
    );
}