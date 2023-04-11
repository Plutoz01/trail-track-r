CREATE VIEW okt_import.track_limiting_point_names AS
SELECT name AS name,
	unnest(ARRAY [
		splitted[1],
		splitted[array_upper(splitted, 1)]
	]) AS name_fragment
FROM (
SELECT name,
		string_to_array((REGEXP_MATCHES(name, '^OKT \d\d\. \((.+)\)$'))[1], ' – ') as splitted
FROM okt_import.track t
) q1
