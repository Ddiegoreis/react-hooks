import React, { useState, useEffect } from "react"

export default function App() {
    const [localization, setLocalization] = useState([])

    useEffect(() => {
        const watchId = navigator.geolocation.watchPosition(
            handlePositionReceived
        )

        return () => navigator.geolocation.clearWatch(watchId)
    }, [])

    function handlePositionReceived({ coords }) {
        const { latitude, longitude } = coords

        setLocalization({ latitude, longitude })
    }

    return (
        <>
            Latitude: {parseFloat(localization.latitude).toFixed(2)} <br />
            Longitude: {parseFloat(localization.longitude).toFixed(2)}
        </>
    )
}
