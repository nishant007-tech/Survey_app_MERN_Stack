import React from 'react'
import Loader from "react-loader-spinner";

function ShowLoader() {
    return (
        <div className="loader">
            <Loader
                type="Puff"
                color="#f74046"
                height={100}
                width={100}
            />
        </div>
    )
}

export default ShowLoader
