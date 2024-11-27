
--Needed For CalendarEvent insertion to work (since 2024-11-27)
ALTER TABLE CalendarEvent DROP PRIMARY KEY;
ALTER TABLE CalendarEvent
MODIFY COLUMN eventID INT AUTO_INCREMENT PRIMARY KEY;