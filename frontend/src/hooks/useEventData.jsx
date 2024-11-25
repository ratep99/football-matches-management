import { useState, useEffect } from 'react';
import { getEventById } from '../services/eventService';

const useEventData = (eventId) => {
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const data = await getEventById(eventId);
        setEventData(data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    fetchEventData();
  }, [eventId]);

  return { eventData, loading, error, setEventData };
};

export default useEventData;
