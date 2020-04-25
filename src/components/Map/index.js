import React, { useState } from 'react'
import ReactMapGL, { Marker, Popup } from "react-map-gl";

const Map = ({ latitude, longitude }) => {
    const [viewport, setViewport] = useState({
        latitude: latitude,
        longitude: longitude,
        width: "100%",
        height: "30rem",
        zoom: 12.5
    })
    return (
        <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
            onViewportChange={viewport => {
                setViewport(viewport);
            }}
            mapStyle="mapbox://styles/darotp/ck94jrgus39pb1js9xpobel3r"
        >
            <Marker latitude={latitude} longitude={longitude}>
                <i className="fas fa-map-marker" style={{ color: "#065cf7", fontSize: "1.4rem" }} />
            </Marker>
            {/* <Popup latitude={54.352024} longitude={18.646639}>opsie</Popup> */}
        </ReactMapGL>
    )
}

export default Map;