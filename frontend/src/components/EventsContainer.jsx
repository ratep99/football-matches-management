import React from 'react'
import { getAllEvents } from '../services/eventService';
import { useState, useEffect} from 'react'
import EventCard from './EventCard';
const EventsContainer = () => {
    const [events, setEvents] = useState([]);


    useEffect( () => { 
        const fetchEvents = async () => {
        try{
        const data = await getAllEvents();
        setEvents(data);
        }
        catch(error){
            console.log('Error fetching data',error);
        } finally{
            setLoading(false);
        }
        }
        fetchEvents();
    },[])

  return (
    <section className="bg-white px-4 py-10">
    <div className="container-xl lg:container m-auto">
      <h2 className="text-3xl font-bold text-[#ff0000] mb-6 text-center">
       All Events
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <>
          {events.map((event) => (
          <EventCard key={event.id} event={event}/>
        ))}
          </>
        
      </div>
    </div>
  </section>
  )
}

export default EventsContainer

/** {isHome? 'Recent Jobs':'All Jobs'} */