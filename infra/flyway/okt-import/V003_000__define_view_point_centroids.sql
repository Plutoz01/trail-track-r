CREATE OR REPLACE VIEW okt_import.point_centroids AS
SELECT checkpoint_group,
  array_agg(DISTINCT name) AS names,
  count(id) AS stamp_count,
  count(DISTINCT name) AS distinct_stamp_names,
  st_setsrid(st_centroid(st_collect(geom)), 4326) AS geom
FROM okt_import.point
GROUP BY checkpoint_group;
