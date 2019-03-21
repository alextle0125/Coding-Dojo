SELECT * FROM twitter.tweets;

INSERT INTO twitter.tweets (id, tweet, user_id, created_at, updated_at) VALUES ('13', 'Happy Birthday!', '3', NOW(), NOW());

UPDATE twitter.tweets SET tweet = 'Happy Birthday, Ninja!' WHERE (`id` = '13');

DELETE FROM twitter.tweets WHERE (id = '13');

