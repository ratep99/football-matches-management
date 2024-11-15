-- Insert Teams
INSERT INTO events_db.team (team_id, name, official_name, slug, abbreviation, team_country_code, stage_position) VALUES
(1, 'Al Shabab', 'Al Shabab FC', 'al-shabab-fc', 'SHA', 'KSA', NULL),
(2, 'Nasaf', 'FC Nasaf', 'fc-nasaf-qarshi', 'NAS', 'UZB', NULL),
(3, 'Al Hilal', 'Al Hilal Saudi FC', 'al-hilal-saudi-fc', 'HIL', 'KSA', NULL),
(4, 'Shabab Al Ahli', 'SHABAB AL AHLI DUBAI', 'shabab-al-ahli-club', 'SAH', 'UAE', NULL),
(5, 'FC Barcelona', 'Futbol Club Barcelona', 'fc-barcelona', 'FCB', 'ESP', NULL),
(6, 'Real Madrid', 'Real Madrid CF', 'real-madrid-cf', 'RM', 'ESP', NULL),
(7, 'Bayern Munich', 'FC Bayern Munich', 'bayern-munich', 'FCB', 'GER', NULL),
(8, 'Manchester United', 'Manchester United FC', 'manchester-united-fc', 'MU', 'ENG', NULL);

-- Insert Stadiums
INSERT INTO events_db.stadium (stadium_id, name, location, capacity, surface_type) VALUES
(1, 'King Saud University Stadium', 'Riyadh, Saudi Arabia', 25000, 'grass'),
(2, 'Markaziy Stadium', 'Karshi, Uzbekistan', 25000, 'grass'),
(3, 'King Fahd International Stadium', 'Riyadh, Saudi Arabia', 68000, 'grass'),
(4, 'Al Maktoum Stadium', 'Dubai, UAE', 25000, 'artificial');

-- Insert Competitions
INSERT INTO events_db.competition (competition_id, name) VALUES
('afc-champions-league', 'AFC Champions League'),
('uefa-champions-league', 'UEFA Champions League');

-- Insert Stages
INSERT INTO events_db.stage (stage_id, name, ordering) VALUES
('ROUND OF 16', 'ROUND OF 16', 4),
('GROUP STAGE', 'GROUP STAGE', 1);

-- Insert Events
INSERT INTO events_db.event (event_id, season, status, timeVenueUtc, dateVenue, stadium_id, home_team_id, away_team_id, competition_id, stage_id) VALUES
(1, 2024, 'played', '00:00:00', '2024-01-03', 1, 1, 2, 'afc-champions-league', 'ROUND OF 16'),
(2, 2024, 'scheduled', '16:00:00', '2024-01-03', 2, 3, 4, 'afc-champions-league', 'ROUND OF 16'),
(3, 2024, 'played', '20:00:00', '2024-01-04', 3, 5, 6, 'uefa-champions-league', 'ROUND OF 16'),
(4, 2024, 'scheduled', '18:00:00', '2024-01-05', 4, 7, 8, 'uefa-champions-league', 'GROUP STAGE');

-- Insert Results
INSERT INTO events_db.result (result_id, event_id, home_goals, away_goals, winner, message) VALUES
(1, 1, 1, 2, 'Nasaf', 'No message'),
(2, 2, 3, 1, 'Al Hilal', 'No message'),
(3, 3, 2, 2, 'Draw', 'No message'),
(4, 4, 1, 0, 'Manchester United', 'No message');

-- Insert Players
INSERT INTO events_db.player (player_id, name, team_id) VALUES
(1, 'Mohammed Al-Fayez', 1),
(2, 'Ali Akhmedov', 2),
(3, 'Salman Al-Dosari', 3),
(4, 'Ahmad Khalil', 4),
(5, 'Lionel Messi', 5),
(6, 'Cristiano Ronaldo', 6),
(7, 'Robert Lewandowski', 7),
(8, 'Bruno Fernandes', 8);

-- Insert Goals
INSERT INTO events_db.goal (goal_id, result_id, player_id, team_id, time_scored) VALUES
(1, 1, 1, 1, '00:15:00'),
(2, 1, 2, 2, '00:35:00'),
(3, 2, 3, 3, '00:20:00'),
(4, 3, 5, 5, '00:50:00'),
(5, 3, 6, 6, '01:10:00'),
(6, 4, 7, 7, '01:00:00'),
(7, 4, 8, 8, '02:00:00');

-- Insert Cards
INSERT INTO events_db.card (card_id, type, result_id, player_id, timestamp) VALUES
(1, 'yellow', 1, 1, '00:12:00'),
(2, 'yellow', 1, 2, '00:32:00'),
(3, 'red', 2, 4, '01:25:00'),
(4, 'yellow', 3, 6, '01:50:00'),
(5, 'yellow', 4, 7, '02:30:00');
