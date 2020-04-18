import React from 'react'
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

const Map = () => {
    return (
        <GoogleMap defaultZoom={10} defaultCenter={{ lat: 54.356030, lng: 18.646120 }} />
    )
}
const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;