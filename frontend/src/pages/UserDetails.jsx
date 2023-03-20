/* React Libraries */
import React, { useRef, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'
import mapboxgl from 'mapbox-gl';

/* Styles */
import '../assets/styles/UserDetails.css'

/* Material UI Icons */
import VerifiedIcon from '@mui/icons-material/Verified';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CakeIcon from '@mui/icons-material/Cake';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import EmailIcon from '@mui/icons-material/Email';
import PlaceIcon from '@mui/icons-material/Place';

/* Components */
import NavBar from '../components/NavBar'

mapboxgl.accessToken = 'pk.eyJ1Ijoia2F2aWFyYXNhbiIsImEiOiJja21pbmppMXQwaXplMm5vNHR6dGk0d2oyIn0.sZw_1Q-OUOu0FLsLZQyQUA';

function UserDetails() {

  const { state } = useLocation()

  const navigate = useNavigate()
  const { user } = useSelector(
    (state) => state.auth
  )

  let lat, lng, coordinates, regDate, regYear, regMonth, dobDate, dob
  const totalMonths = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const zoom = 6

  const mapContainerRef = useRef(null);

  useEffect(() => {

    if (!user || !state) {
      navigate('/login')
    } else {
      
      /* Rendering map container */
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/outdoors-v11',
        center: [lng, lat],
        zoom: zoom
      });

      new mapboxgl.Marker()
        .setLngLat(coordinates)
        .addTo(map);

      return () => map.remove();
    }
  }, [user, navigate, state])

  /* Preprocessing Prop Values */
  if (state) {
    lat = state.location.coordinates.latitude
    lng = state.location.coordinates.longitude
    coordinates = [Number(lng), Number(lat)]

    regDate = state.registered.date.split("T")[0].split("-")
    regYear = regDate[0]
    regMonth = totalMonths[Number(regDate[1])]
    dobDate = state.dob.date.split("T")[0].split("-")
    dob = dobDate[2] + '-' + dobDate[1] + '-' + dobDate[0]
  }

  return (
    <>
      <NavBar />
      {
        state ? (
          <div style={{ marginBottom: '20px', textAlign: 'right' }} className="user-page">
            {/* <Link to="/contacts" style={{ color: 'white', textDecoration: 'none' }}>Back</Link> */}

            {/* Map Section */}
            <div className='map-container' style={{ marginTop: '10px' }} ref={mapContainerRef} />

            {/* Profile Section */}
            <div className="profile-section">

              {/* Image Rendering On Left */}
              <div className="profile--section--left">
                <img src={state.picture.large} alt='profile-pic' width={200} height={200} className='profile--pic'></img>
              </div>

              {/* Profile Contents On Right */}
              <div style={{ display: 'flex', flexDirection: 'column' }} className="profile--info">
                <div className="profile--section--right">

                  {/* Rendering Values Of Name, Username & DOJ */}
                  <div className="center-col">

                    <div className="name--container">
                      <p className="user--name">{state.name.first} {state.name.last}</p>
                      <VerifiedIcon style={{ color: 'rgb(34,120,207)' }} />
                    </div>

                    <p className="user--username">@{state.login.username} ( {state.gender == 'male' ? 'he/him' : 'she/her'} )</p>

                    <div className="join--date--container">
                      <CalendarMonthIcon className="icon" style={{ color: 'grey' }} />
                      <p className="user--joindate">Joined {regMonth} {regYear}</p>
                    </div>

                  </div>

                  {/* Rendering Values Of DOB, Phone & Email */}
                  <div className="right-col">

                    <div className="dob--container">
                      <CakeIcon className="icon" style={{ color: 'grey' }} />
                      <p className="user--dob">{dob}</p>
                    </div>

                    <div className="ph--container">
                      <SmartphoneIcon className="icon" style={{ color: 'grey' }} />
                      <p className="user--ph">{state.phone}</p>
                    </div>

                    <div className="email--container">
                      <EmailIcon className="icon" style={{ color: 'grey' }} />
                      <p className="user--email">{state.email}</p>
                    </div>

                  </div>
                </div>

                {/* Value Of Location */}
                <div className="place--container">
                  <PlaceIcon className="icon" style={{ color: 'grey' }} />
                  <p className="user--location">From {state.location.city}, {state.location.state}, {state.location.country}</p>
                </div>
              </div>
            </div>
            {/* END OF PROFILE SECTION */}
          </div>
        ) : (<></>)
      }

    </>
  )
}


export default UserDetails