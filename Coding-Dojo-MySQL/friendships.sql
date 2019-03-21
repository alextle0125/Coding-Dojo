SELECT Users.first_name, Users.last_name FROM Users
LEFT JOIN Friendships ON Users.id = Friendships.friend_1_id
LEFT JOIN Users as Users2 ON Friendships.friend_2_id = Users2.id
WHERE Users2.first_name = "Kermit";

SELECT * FROM Friendships;

SELECT Users.first_name, Users.last_name, COUNT(*) as total_friends FROM Friendships
JOIN Users ON Friendships.friend_1_id = Users.id
GROUP BY Friendships.friend_1_id
ORDER BY total_friends DESC LIMIT 1;


INSERT INTO Users (first_name, last_name, created_at) VALUES ('Alexander', 'Le', NOW());
INSERT INTO Friendships (friend_1_id, friend_2_id, created_at) VALUES (6, 2, NOW());
INSERT INTO Friendships (friend_1_id, friend_2_id, created_at) VALUES (6, 4, NOW());
INSERT INTO Friendships (friend_1_id, friend_2_id, created_at) VALUES (6, 5, NOW());

SELECT Users.first_name, Users.last_name FROM Users
LEFT JOIN Friendships ON Users.id = Friendships.friend_1_id
LEFT JOIN Users as Users2 ON Friendships.friend_2_id = Users2.id
WHERE Users2.first_name = "Eli"
ORDER BY Users.first_name ASC;

DELETE FROM Friendships
WHERE friend_1_id = (SELECT Users.id FROM Users WHERE Users.first_name="Eli")
AND friend_2_id = (SELECT Users.id FROM Users WHERE Users.first_name="Marky");


SELECT Users.first_name, Users.last_name, Users2.first_name, Users2.last_name FROM Users
JOIN Friendships ON Users.id = Friendships.friend_1_id
JOIN Users as Users2 ON Friendships.friend_2_id = Users2.id;

