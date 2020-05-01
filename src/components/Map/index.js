import React, { useState } from 'react'
import PropTypes from "prop-types";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

const MapBox = ({ latitude, longitude, markers }) => {
    const [viewport, setViewport] = useState({
        latitude: latitude,
        longitude: longitude,
        width: "100%",
        height: "30rem",
        zoom: 12.5
    })

    return (
        <>
        <ReactMapGL
            {...viewport}
            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
            mapStyle="mapbox://styles/darotp/ck94jrgus39pb1js9xpobel3r"
            onViewportChange={viewport => {
                setViewport(viewport);
            }}
        >

            {
            markers.map(marker =>{
            return(
                <Marker key={`${marker.lat}-${marker.long}`} latitude={marker.lat} longitude={marker.long}>
                    <i className="fas fa-map-marker" style={{ color: "#065cf7", fontSize: "1.4rem" }} />
                </Marker>)
            })
            }
            {/* <Popup latitude={54.352024} longitude={18.646639}>opsie</Popup> */}
        </ReactMapGL>
        </>
    )
}

MapBox.defaultProps = {
    markers: []
}

MapBox.propTypes = {
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    markers: PropTypes.array
}

export default MapBox;