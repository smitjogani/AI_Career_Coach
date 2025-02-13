import React from 'react'

const CoverLatter = async({ params }) => {

    const id = await params.id;

    return (
        <div>CoverLatter : {id}</div>
    )
}

export default CoverLatter