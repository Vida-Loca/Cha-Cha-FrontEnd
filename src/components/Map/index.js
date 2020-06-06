/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Link } from "react-router-dom";

import "./map.scss";

const MapBox = ({
  latitude, longitude, markers, zoom, showPopups,
}) => {
  const [viewport, setViewport] = useState({
    latitude,
    longitude,
    width: "100%",
    height: "30rem",
    zoom,
  });
  const [slectedMark] = useState(8);
  const [allMarker, setMarkers] = useState([]);
  useEffect(() => {
    const newMarkers = markers.map((mark) => ({ ...mark, selected: false }));
    setMarkers(newMarkers);
  }, [slectedMark]);


  const selectmarker = (eventId) => {
    const newMarkers = markers.map((mark) => {
      if (mark.eventId === eventId) {
        return ({ ...mark, selected: true });
      }
      return ({ ...mark, selected: false });
    });
    setMarkers(newMarkers);
  };

  return (
    <>
      <ReactMapGL
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
        mapStyle="mapbox://styles/darotp/ck94jrgus39pb1js9xpobel3r"
        // eslint-disable-next-line no-shadow
        onViewportChange={(viewport) => {
          setViewport(viewport);
        }}
      >

        {
          allMarker.map((marker) => (
            <div key={`map-${marker.eventId}`} className="">
              <Marker latitude={marker.lat} longitude={marker.long}>
                <i
                  onClick={(e) => {
                    e.preventDefault();
                    selectmarker(marker.eventId);
                  }}
                  className="fas fa-map-marker"
                  style={{ color: "#065cf7", fontSize: "1.4rem" }}
                />
              </Marker>
              {
                  (showPopups && marker.selected)
                  && (
                  <Popup key={`pop-${marker.lat}-${marker.long}`} latitude={marker.lat} longitude={marker.long} onClose={() => selectmarker(null)}>
                    <Link to={`/event/${marker.eventId}`}>
                      <div className="popup">
                        <div className="event-name">{marker.eventName}</div>
                        <div className="join-now">join now</div>
                      </div>
                    </Link>
                  </Popup>
                  )
                }

            </div>
          ))
        }
      </ReactMapGL>
    </>
  );
};

MapBox.defaultProps = {
  markers: [],
  zoom: 12.5,
  showPopups: false,
};

MapBox.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  markers: PropTypes.array,
  zoom: PropTypes.number,
  showPopups: PropTypes.bool,
};

export default MapBox;
