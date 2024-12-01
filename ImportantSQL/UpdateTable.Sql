
--Needed For CalendarEvent insertion to work (since 2024-11-27)
ALTER TABLE CalendarEvent DROP PRIMARY KEY;
ALTER TABLE CalendarEvent
MODIFY COLUMN eventID INT AUTO_INCREMENT PRIMARY KEY;


<-- Necessary Changes to Make Manage Students Admin function work -->
-- Step 1: Drop foreign keys
ALTER TABLE CalendarEvent DROP FOREIGN KEY calendarevent_ibfk_2;
ALTER TABLE EmergencyContact DROP FOREIGN KEY emergencycontact_ibfk_1;
ALTER TABLE StudentCourse DROP FOREIGN KEY studentcourse_ibfk_1;

-- Step 2: Modify the studentID column to AUTO_INCREMENT
ALTER TABLE Student MODIFY COLUMN studentID INT AUTO_INCREMENT;

-- Step 3: Re-add foreign keys
ALTER TABLE CalendarEvent
ADD CONSTRAINT calendarevent_ibfk_2 FOREIGN KEY (studentID) REFERENCES Student(studentID);

ALTER TABLE EmergencyContact
ADD CONSTRAINT emergencycontact_ibfk_1 FOREIGN KEY (studentID) REFERENCES Student(studentID);

ALTER TABLE StudentCourse
ADD CONSTRAINT studentcourse_ibfk_1 FOREIGN KEY (studentID) REFERENCES Student(studentID);

-- Step 4: Fix Deletions so they cascade

ALTER TABLE CalendarEvent DROP FOREIGN KEY calendarevent_ibfk_2;
ALTER TABLE CalendarEvent
ADD CONSTRAINT calendarevent_ibfk_2 FOREIGN KEY (studentID) REFERENCES Student(studentID) ON DELETE CASCADE;

ALTER TABLE EmergencyContact DROP FOREIGN KEY emergencycontact_ibfk_1;
ALTER TABLE EmergencyContact
ADD CONSTRAINT emergencycontact_ibfk_1 FOREIGN KEY (studentID) REFERENCES Student(studentID) ON DELETE CASCADE;

ALTER TABLE StudentCourse DROP FOREIGN KEY studentcourse_ibfk_1;
ALTER TABLE StudentCourse
ADD CONSTRAINT studentcourse_ibfk_1 FOREIGN KEY (studentID) REFERENCES Student(studentID) ON DELETE CASCADE;
