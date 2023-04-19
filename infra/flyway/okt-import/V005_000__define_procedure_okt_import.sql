DROP PROCEDURE IF EXISTS okt_import.import_okt_to_trails;

CREATE PROCEDURE okt_import.import_okt_to_trails(truncate_target BOOL = FALSE)
LANGUAGE plpgsql
AS $$
DECLARE
	OKT_NAME CONSTANT TEXT := 'Országos Kéktúra (OKT)';
	okt_trail_id UUID;
	GEOM_SIMPLIFY_TOLERANCE CONSTANT FLOAT := 0.0001;
BEGIN
	IF truncate_target THEN
	  RAISE info 'truncating target tables...';
		TRUNCATE
			trails.trail,
			trails.trail_segment_group,
			trails.trail_segment,
			trails.poi,
			trails.trail_segment_poi_relation
		CASCADE;
	END IF;


	RAISE info 'inserting data to "trails" schema...';
	INSERT INTO trails.trail (name, properties)
	VALUES (OKT_NAME, jsonb_build_object(
			'length', (SELECT round((SUM(ST_Length(geom::geography))/1000)::numeric, 2) FROM okt_import.track),
			'url', 'https://www.kektura.hu'
		));

	okt_trail_id := ( SELECT id FROM trails.trail WHERE name = OKT_NAME);
	RAISE info 'okt trail id: %', okt_trail_id;


	INSERT INTO trails.trail_segment_group (name, trail_id, properties)
	SELECT
		name,
		okt_trail_id,
		jsonb_build_object(
			'length', round((ST_Length(geom::geography)/1000)::numeric, 2),
			'url', 'https://www.kektura.hu/okt-szakasz/okt-' || LPAD(id::TEXT, 2, '0')
		) AS properties
	FROM okt_import.track;


	INSERT INTO trails.trail_segment (name, trail_segment_group_id, properties, path)
	SELECT
		start_point_name || ' - ' || end_point_name AS name,
		sg.id AS trail_segment_group_id,
		jsonb_build_object(
			'length', round((ST_Length(t.geom::geography)/1000)::numeric, 2)
		) AS properties,
		ST_Simplify(t.geom, GEOM_SIMPLIFY_TOLERANCE) AS path
	FROM okt_import.track_splitted t
	LEFT OUTER JOIN trails.trail_segment_group sg ON t.name = sg.name;

	RAISE INFO 'import process done.';
END
$$;

-- CALL okt_import.import_okt_to_trails(true);
