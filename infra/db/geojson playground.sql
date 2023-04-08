-- DROP TABLE IF EXISTS okt.merged_point;

SELECT DISTINCT
	first_value(checkpoint_group) OVER w1 AS checkpoint_group,
	first_value(p.name) OVER w1 AS name,
	first_value(stamp_count) OVER w1 AS stamp_count,
	ST_MakeLine(
		first_value(p.geom) OVER w1,
		first_value(ST_ClosestPoint(t.geom, p.geom)) OVER w1
	) AS diff,
	/*first_value(p.geom) OVER w1 AS centroid_point_geom,
	first_value(ST_ClosestPoint(t.geom, p.geom)) OVER w1 AS aligned_geom,*/
	first_value(ST_Distance(ST_ClosestPoint(t.geom, p.geom), p.geom)) OVER w1 AS distance
FROM
(
	SELECT
		checkpoint_group,
		ARRAY_AGG(DISTINCT name) AS name,
		COUNT(id) AS stamp_count,
		ST_Centroid(ST_Collect(geom)) AS geom
	FROM okt_import.point
	GROUP BY checkpoint_group
) p,
okt_import.track t
WINDOW w1 AS
	(PARTITION BY checkpoint_group ORDER BY ST_Distance(ST_ClosestPoint(t.geom, p.geom), p.geom))
ORDER BY checkpoint_group;
