SELECT customer.first_name, customer.last_name, customer.email, address.address, address.address2, address.district, city.city, address.postal_code, country.country FROM customer
JOIN address ON customer.address_id = address.address_id
JOIN city ON address.city_id = city.city_id
JOIN country ON city.country_id = country.country_id
WHERE city.city_id = 312;

SELECT film.title, film.description, film.release_year, film.rating, film.special_features, category.name FROM film
JOIN film_category ON film.film_id = film_category.film_id
JOIN category ON film_category.category_id = category.category_id;

SELECT actor.actor_id, CONCAT(actor.first_name," ",actor.last_name) as actor_name, film.title, film.description, film.release_year FROM actor
JOIN film_actor ON actor.actor_id = film_actor.actor_id
JOIN film ON film_actor.film_id = film.film_id
WHERE actor.actor_id = 5;

SELECT customer.first_name, customer.last_name, customer.email, address.address, address.address2, address.district, city.city, address.postal_code, country.country FROM customer
JOIN address ON customer.address_id = address.address_id
JOIN city ON address.city_id = city.city_id
JOIN country ON city.country_id = country.country_id
WHERE customer.store_id = 1 AND (city.city_id = 1 OR city.city_id = 42 OR city.city_id = 312 OR city.city_id = 459);

SELECT film.title, film.description, film.release_year, film.rating, film.special_features FROM film
JOIN film_actor ON film.film_id = film_actor.film_id
WHERE film.rating = "G" AND film.special_features LIKE "%Behind the Scenes%" AND film_actor.actor_id = 15;

SELECT film.film_id, film.title, actor.actor_id, CONCAT(actor.first_name," ",actor.last_name) as actor_name FROM film
JOIN film_actor ON film.film_id = film_actor.film_id
JOIN actor ON film_actor.actor_id = actor.actor_id
WHERE film.film_id = 369;

SELECT film.title, film.description, film.release_year, film.rating, film.special_features, category.name FROM film
JOIN film_category ON film.film_id = film_category.film_id
JOIN category ON film_category.category_id = category.category_id
WHERE category.name = "Drama" AND film.rental_rate = 2.99;

SELECT film.title, film.description, film.release_year, film.rating, film.special_features, category.name, actor.first_name, actor.last_name FROM film
JOIN film_category ON film.film_id = film_category.film_id
JOIN category ON film_category.category_id = category.category_id
JOIN film_actor ON film.film_id = film_actor.film_id
JOIN actor ON film_actor.actor_id = actor.actor_id
WHERE actor.first_name = "SANDRA" AND actor.last_name = "KILMER" AND category.name = "Action";