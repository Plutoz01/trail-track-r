CREATE OR REPLACE VIEW okt_import.track_splitting_points AS
SELECT p.*
FROM okt_import.point p
LEFT JOIN okt_import.track_limiting_point_names tn ON position(lower(p.name) IN lower(tn.name_fragment)) > 0
WHERE tn IS NULL;
