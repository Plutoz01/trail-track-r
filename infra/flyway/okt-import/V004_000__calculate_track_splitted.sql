DROP TABLE IF EXISTS okt_import.track_splitted;
SELECT DISTINCT
  q1.track_id,
  q1.name,
  ps.checkpoint_group AS start_checkpoint_group,
  ps.name AS start_point_name,
  pe.checkpoint_group AS end_checkpoint_group,
  pe.name AS end_point_name,
  q1.geom
INTO okt_import.track_splitted
FROM (
	SELECT
		t.id AS track_id,
		t.name,
		(ST_Dump(ST_Split(ST_Snap(t.geom, ST_Collect(p.geom), 1), ST_Collect(p.geom)))).geom AS geom
	FROM
	okt_import.track_splitting_matching_points p
	LEFT JOIN okt_import.track t ON ST_DistanceSpheroid(t.geom, p.geom) < 1
	GROUP BY t.id, t.name
) q1
LEFT JOIN okt_import.point ps ON ST_DistanceSpheroid(ST_StartPoint(q1.geom), ps.geom) < 1000
LEFT JOIN okt_import.point pe ON ST_DistanceSpheroid(ST_EndPoint(q1.geom), pe.geom) < 1000
ORDER BY q1.name, ps.checkpoint_group
