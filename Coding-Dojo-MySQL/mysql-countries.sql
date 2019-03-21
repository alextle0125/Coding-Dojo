SELECT countries.name, languages.language, languages.percentage FROM countries
JOIN languages ON countries.id = languages.country_id
WHERE languages.language = "Slovene"
ORDER BY languages.percentage DESC;

SELECT countries.name, COUNT(*) as total_cities FROM cities
JOIN countries ON cities.country_id = countries.id
GROUP BY cities.country_id
ORDER BY total_cities DESC;

SELECT cities.name, cities.population FROM cities
JOIN countries ON cities.country_id = countries.id
WHERE countries.name = "Mexico" AND cities.population > 500000
ORDER BY cities.population DESC;

SELECT countries.name, languages.language, languages.percentage FROM countries
JOIN languages ON countries.id = languages.country_id
WHERE languages.percentage > 89.0
ORDER BY countries.name ASC, languages.percentage DESC;

SELECT countries.name, countries.surface_area, countries.population FROM countries
WHERE countries.surface_area < 501 AND countries.population > 100000;

SELECT countries.name FROM countries
WHERE countries.government_form = "Constitutional Monarchy" AND countries.capital > 200 AND countries.life_expectancy > 75;

SELECT countries.name, cities.name, cities.district, cities.population FROM countries
JOIN cities ON countries.id = cities.country_id
WHERE countries.name = "Argentina" AND cities.district = "Buenos Aires" AND cities.population > 500000;

SELECT countries.region, COUNT(*) as total_countries FROM countries
GROUP BY countries.region
ORDER BY total_countries DESC;