import React, { useState, useEffect } from "react"

export default function App() {
    const [repositories, setRepositories] = useState([])

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(async () => {
        const response = await fetch(
            "https://api.github.com/users/ddiegoreis/repos"
        )
        const data = await response.json()

        setRepositories(data)
    }, [])

    useEffect(() => {
        const filtered = repositories.filter((repo) => repo.favorite)

        document.title = `Você tem ${filtered.length} ${
            filtered.length === 1 ? "favorito" : "favoritos"
        }`
    }, [repositories])

    function handleFavorite(id) {
        const newRrepositories = repositories.map((repo) => {
            return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo
        })

        setRepositories(newRrepositories)
    }

    return (
        <>
            <h1>
                Você tem {repositories.length}{" "}
                {repositories.length === 1 ? " repositório" : " repositórios"}
            </h1>
            <h2>
                Você tem {repositories.filter((repo) => repo.favorite).length}{" "}
                {repositories.filter((repo) => repo.favorite).length === 1
                    ? "Favorito"
                    : "Favoritos"}
            </h2>
            <ul>
                {repositories.map((repo) => (
                    <li key={repo.id}>
                        {repo.name}
                        {repo.favorite && <span>(Favorito)</span>}
                        <button onClick={() => handleFavorite(repo.id)}>
                            Favoritar
                        </button>
                    </li>
                ))}
            </ul>
        </>
    )
}
