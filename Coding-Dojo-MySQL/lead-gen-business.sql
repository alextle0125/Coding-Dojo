SELECT SUM(billing.amount) as total_revenue FROM billing;

SELECT SUM(billing.amount) as total_revenue FROM billing
WHERE billing.client_id = 2;

SELECT sites.domain_name FROM sites
WHERE sites.client_id = 10;

SELECT DATE_FORMAT(sites.created_datetime, '%Y') as 'year',
DATE_FORMAT(sites.created_datetime, '%m') as 'month',
COUNT(sites.site_id) as 'total'
FROM sites
WHERE sites.client_id = 1
GROUP BY DATE_FORMAT(sites.created_datetime, '%Y%m')
ORDER BY sites.created_datetime ASC;
SELECT DATE_FORMAT(sites.created_datetime, '%Y') as 'year',
DATE_FORMAT(sites.created_datetime, '%m') as 'month',
COUNT(sites.site_id) as 'total'
FROM sites
WHERE sites.client_id = 20
GROUP BY DATE_FORMAT(sites.created_datetime, '%Y%m')
ORDER BY sites.created_datetime ASC;

SELECT COUNT(*) as total_leads, sites.domain_name FROM leads
JOIN sites ON leads.site_id = sites.site_id
WHERE sites.created_datetime >= "2011/01/01" AND sites.created_datetime <= "2011/02/15"
GROUP BY sites.site_id;

SELECT COUNT(*) as total_leads, clients.first_name, clients.last_name FROM clients
JOIN sites ON clients.client_id = sites.client_id
JOIN leads ON sites.site_id = leads.site_id
WHERE clients.joined_datetime >= "2011/01/01" AND clients.joined_datetime <= "2011/12/31"
GROUP BY sites.client_id;

SELECT CONCAT(clients.first_name," ",clients.last_name) as client, COUNT(*) as 'total', DATE_FORMAT(sites.created_datetime, '%M') as 'month'
FROM leads
JOIN sites ON leads.site_id = sites.site_id
JOIN clients ON sites.client_id = clients.client_id
WHERE MONTH(sites.created_datetime) >= 1 AND MONTH(sites.created_datetime) <= 6 AND YEAR(sites.created_datetime) = 2011
GROUP BY sites.site_id
ORDER BY sites.created_datetime;