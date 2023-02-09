-- tracks
CREATE TABLE IF NOT EXISTS okt.track
(
    id BIGSERIAL NOT NULL,
    geojson jsonb NOT NULL,
    PRIMARY KEY (id)
)

SELECT AddGeometryColumn ('okt','track','geom',4326,'LINESTRING',2);

INSERT INTO okt.track(geojson) VALUES (
	'<COPY GPX converted tracks.geojson here>'
);


UPDATE okt.track
 SET geom =
(SELECT ST_LineMerge(ST_GeomFromGeoJSON(jsonb_path_query(geojson, '$.features[*].geometry'))))


-- points
CREATE TABLE IF NOT EXISTS okt.point
(
    id BIGSERIAL NOT NULL,
	name TEXT NOT NULL,
	description TEXT,
    PRIMARY KEY (id)
);

SELECT AddGeometryColumn ('okt','point','geom',4326,'POINT',2);

WITH data AS (
SELECT '
    <COPY GPX converted waypoints.geojson here>
'::jsonb AS geojson)
INSERT INTO okt.point
SELECT
	nextval('okt.point_id_seq') AS id,
	point #>> '{properties, name}' AS name,
	point #>> '{properties, desc}' AS description,
	ST_GeomFromGeoJSON(point -> 'geometry') AS geom
FROM (
	SELECT jsonb_path_query(geojson, '$.features[*]') AS point FROM data
) q1;

DROP TABLE IF EXISTS okt.merged_point;

SELECT name, ST_ClosestPoint(t.geom, p.geom) AS geom
INTO okt.merged_point
FROM 
(
	SELECT name,
	ST_Centroid(ST_Collect(geom)) AS geom
	FROM okt.point GROUP BY name
) p, okt.track t


CREATE TABLE okt.splitted_track
(
    id bigserial NOT NULL,
    checkpoints text[],
    PRIMARY KEY (id)
);
SELECT AddGeometryColumn ('okt','splitted_track','geom',4326,'LINESTRING',2);

TRUNCATE okt.splitted_track;

INSERT INTO okt.splitted_track
WITH lines AS (SELECT geom FROM okt.track LIMIT 1),
	points AS (SELECT geom FROM okt.merged_point) 
SELECT
	nextval('okt.splitted_track_id_seq') AS id,
	NULL AS checkpoints,
	(ST_Dump(ST_Split(ST_Snap(lines.geom, q1.geom, 0.0000001), q1.geom))).geom
FROM lines,
(SELECT ST_Collect(points.geom) AS geom FROM points) q1;

UPDATE okt.splitted_track st
SET checkpoints = q1.checkpoints
FROM (
	SELECT t.id, array_agg(p.name) AS checkpoints
	FROM okt.merged_point p, okt.splitted_track t,
	LATERAL ST_Distance(t.geom, p.geom) AS dist
	WHERE dist < 0.00001
	GROUP BY t.id
) q1
WHERE q1.id = st.id;

DELETE FROM okt.splitted_track
WHERE array_length(checkpoints, 1) = 1;
