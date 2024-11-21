package com.example.sport_event_backend.repository;

import com.example.sport_event_backend.dto.EventCardDTO;
import com.example.sport_event_backend.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    @Query(value = "SELECT * FROM event LIMIT :limit", nativeQuery = true)
    List<Event> findWithLimit(@Param("limit") int limit);

}
