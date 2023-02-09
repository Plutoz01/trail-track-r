-- Get all POIs of a given Segment by id as a FeatureCollection;

WITH consts (segment_id) AS (
   values ('496b93c1-887f-408d-9de4-fe4b53db2b80'::uuid)
)
SELECT jsonb_build_object(
	'type', 'FeatureCollection',
	'features', jsonb_agg(
		jsonb_build_object(
			'type', 'Feature',
			'id', p.id,
			'geometry', st_asGeoJson(p.location)::jsonb,
			'properties', json_build_object(
				'name', p.name,
				'relationType', pr.relation_type
			)
		)
	)
) AS pois_of_segment
FROM consts,
	trail_segment_poi_relation pr
LEFT JOIN poi p ON pr.poi_id = p.id
WHERE pr.trail_segment_id = segment_id;

-- Get all POI Points of a given Segment by id as rows of MultiPoint grouped by relation type

WITH consts (segment_id) AS (
   values ('496b93c1-887f-408d-9de4-fe4b53db2b80'::uuid)
)
SELECT pr.trail_segment_id,
	relation_type,
	-- COUNT(pr.poi_id),
	-- ARRAY_AGG(pr.poi_id) AS poi_ids,
	ST_Collect(ARRAY_AGG(p.location)) AS locations
FROM consts,
	trail_segment_poi_relation pr
LEFT JOIN poi p ON pr.poi_id = p.id
WHERE pr.trail_segment_id = segment_id
GROUP BY pr.trail_segment_id, pr.relation_type;
  

--- Should split line for each linestring

WITH data AS (SELECT
  'LINESTRING(0 10, 10 10, 20 15)'::geometry AS line,
  ARRAY[
	  'MULTIPOINT(3 20, 2 0)'::geometry,
	  'MULTIPOINT(7 10)'::geometry
  ] AS points
)

SELECT
	ST_AsText(segment) AS segment,
	ST_AsText(ST_ClosestPoint(segment, ST_Centroid(points[1]))) AS closest,
	ST_Distance(segment, ST_Centroid(points[1]))
FROM (
	SELECT 
		--ST_AsText(ST_Centroid(point)) AS centroid,
		--ST_AsText(ST_ClosestPoint(line, ST_Centroid(point))) AS nearest_point,
		--ST_AsText(ST_Split(line, ST_ClosestPoint(line, ST_Centroid(point)))) AS splitted,
		/*ST_AsText(
			ST_Centroid(
				unnest(points)
			)
		),*/
		(ST_DumpSegments(line)).geom as segment	
	FROM data
) q1, data

/*SELECT ST_AsText(ST_Split(line, point)) AS no_split,
       ST_AsText(ST_Split( ST_Snap(line, point, ), point)) AS split
       FROM data;
	   */