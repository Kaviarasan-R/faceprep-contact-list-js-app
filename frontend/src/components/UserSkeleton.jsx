/* React Libraries */ 
import React from 'react'
import Skeleton from 'react-loading-skeleton'

/* Styles */
import '../assets/styles/UserSkeleton.css'

function UserSkeleton({ cards }) {
    /* Adding Dynamic Number Of Skeleton Cards To The Component */ 
    let card = []
    Array(cards).fill(0).map((item, i) => {
        card.push(
            <div className='card-skeleton' key={i}>
                <div className='left-col'>
                    <Skeleton circle width={40} height={40} />
                </div>
                <div className='right-col'>
                    <Skeleton count={4} style={{ marginBottom: ".6rem" }} />
                </div>
            </div>
        )
    })
    return (<>{card}</>)

}

export default UserSkeleton