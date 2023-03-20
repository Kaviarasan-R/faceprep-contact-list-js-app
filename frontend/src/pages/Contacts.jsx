/* React Libraries */
import React, { useState, useRef, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

/* Services */
import useContactSearch from '../services/useContactSearch'

/* Components */
import UserCard from '../components/UserCard'
import UserSkeleton from '../components/UserSkeleton'
import NavBar from '../components/NavBar'

/* Styles */
import '../assets/styles/Contacts.css'

function ContactList() {

    const navigate = useNavigate()

    /* States */
    const [pageNumber, setPageNumber] = useState(1)

    const { user } = useSelector(
        (state) => state.auth
    )

    /* UseEffect for redirect users if they're not logged in */
    useEffect(() => {
        if(!user) {
            navigate('/login')
        }
    }, [user])

    /* Destructuring Values From Component */
    const { loading, error, contacts, hasMore } = useContactSearch(pageNumber)

    /* Refs & Callbacks for getting last page number */
    const observer = useRef()
    const lastContactElementRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prevPageNumber => prevPageNumber + 1)
            }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    return (
        <>
            <NavBar />
            <div className='contact-page'>
                <h1 style={{ marginBottom: "1.5rem" }}>Contacts</h1>
                <div className='user-container'>
                    {loading && <UserSkeleton cards={20} />}
                    {
                        contacts.map((contact, index) => {
                            if (contacts.length === index + 1) {
                                return <UserCard ref={lastContactElementRef} user={contact} key={index} />
                            } else {
                                return <UserCard user={contact} key={index} />
                            }
                        })
                    }
                    {loading && <UserSkeleton cards={2} />}
                    <div>{error && 'ERROR'}</div>
                </div>
            </div>
        </>
    )
}

export default ContactList