CREATE OR REPLACE VIEW okt_import.track_splitting_matching_points AS
SELECT *
FROM okt_import.point_closest_points p
WHERE p.checkpoint_group IN (
	SELECT checkpoint_group FROM okt_import.track_splitting_points
);
