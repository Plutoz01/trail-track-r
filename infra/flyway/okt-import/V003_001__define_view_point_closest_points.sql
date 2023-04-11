CREATE OR REPLACE VIEW okt_import.point_closest_points AS
SELECT DISTINCT first_value(p.checkpoint_group) OVER w1 AS checkpoint_group,
  first_value(p.names) OVER w1 AS names,
  first_value(st_closestpoint(t.geom, p.geom)) OVER w1 AS geom,
  first_value(st_distance(st_closestpoint(t.geom, p.geom), p.geom)) OVER w1 AS distance
FROM
  okt_import.point_centroids p,
  okt_import.track t
WINDOW w1 AS(PARTITION BY p.checkpoint_group ORDER BY (st_distance(st_closestpoint(t.geom, p.geom), p.geom)))
