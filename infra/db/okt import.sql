-- convert okt to public schema
INSERT INTO poi
SELECT
	uuid_generate_v7() AS id,
	name || ' (' || (regexp_matches(description, '^.*\((OKTPH_.*)\)$'))[1] || ')' AS name,
	jsonb_build_object(
		'description', description
	) AS properties,
	geom AS location
FROM okt.point;

INSERT INTO trail_segment_group
SELECT id, name, trail_id,
	properties || CASE
		WHEN name = 'OKT-01' THEN'{"start_checkpoint_name": "Írott-kő", "end_checkpoint_name": "Sárvár" }'::jsonb
		WHEN name = 'OKT-02' THEN'{"start_checkpoint_name": "Sárvár", "end_checkpoint_name": "Sümeg" }'::jsonb
		WHEN name = 'OKT-03' THEN'{"start_checkpoint_name": "Sümeg", "end_checkpoint_name": "Keszthely" }'::jsonb
		WHEN name = 'OKT-04' THEN'{"start_checkpoint_name": "Keszthely", "end_checkpoint_name": "Tapolca" }'::jsonb
		WHEN name = 'OKT-05' THEN'{"start_checkpoint_name": "Tapolca", "end_checkpoint_name": "Badacsonytördemic" }'::jsonb
		WHEN name = 'OKT-06' THEN'{"start_checkpoint_name": "Badacsonytördemic", "end_checkpoint_name": "Nagyvázsony" }'::jsonb
		WHEN name = 'OKT-07' THEN'{"start_checkpoint_name": "Nagyvázsony", "end_checkpoint_name": "Városlőd" }'::jsonb
		WHEN name = 'OKT-08' THEN'{"start_checkpoint_name": "Városlőd", "end_checkpoint_name": "Zirc" }'::jsonb
		WHEN name = 'OKT-09' THEN'{"start_checkpoint_name": "Zirc", "end_checkpoint_name": "Bodajk" }'::jsonb
		WHEN name = 'OKT-10' THEN'{"start_checkpoint_name": "Bodajk", "end_checkpoint_name": "Szárliget" }'::jsonb
		WHEN name = 'OKT-11' THEN'{"start_checkpoint_name": "Szárliget", "end_checkpoint_name": "Dorog" }'::jsonb
		WHEN name = 'OKT-12' THEN'{"start_checkpoint_name": "Dorog", "end_checkpoint_name": "Piliscsaba" }'::jsonb
		WHEN name = 'OKT-13' THEN'{"start_checkpoint_name": "Piliscsaba", "end_checkpoint_name": "Hűvösvölgy" }'::jsonb
		WHEN name = 'OKT-14' THEN'{"start_checkpoint_name": "Hűvösvölgy", "end_checkpoint_name": "Rozália téglagyár" }'::jsonb
		WHEN name = 'OKT-15' THEN'{"start_checkpoint_name": "Rozália téglagyár", "end_checkpoint_name": "Dobogókő" }'::jsonb
		WHEN name = 'OKT-16' THEN'{"start_checkpoint_name": "Dobogókő", "end_checkpoint_name": "Visegrád" }'::jsonb
		WHEN name = 'OKT-17' THEN'{"start_checkpoint_name": "Nagymaros", "end_checkpoint_name": "Nógrád" }'::jsonb
		WHEN name = 'OKT-18' THEN'{"start_checkpoint_name": "Nógrád", "end_checkpoint_name": "Becske" }'::jsonb
		WHEN name = 'OKT-19' THEN'{"start_checkpoint_name": "Becske", "end_checkpoint_name": "Mátraverebély" }'::jsonb
		WHEN name = 'OKT-20' THEN'{"start_checkpoint_name": "Mátraverebély", "end_checkpoint_name": "Mátraháza" }'::jsonb
		WHEN name = 'OKT-21' THEN'{"start_checkpoint_name": "Mátraháza", "end_checkpoint_name": "Sirok" }'::jsonb
		WHEN name = 'OKT-22' THEN'{"start_checkpoint_name": "Sirok", "end_checkpoint_name": "Szarvaskő" }'::jsonb
		WHEN name = 'OKT-23' THEN'{"start_checkpoint_name": "Szarvaskő", "end_checkpoint_name": "Putnok" }'::jsonb
		WHEN name = 'OKT-24' THEN'{"start_checkpoint_name": "Putnok", "end_checkpoint_name": "Bódvaszilas" }'::jsonb
		WHEN name = 'OKT-25' THEN'{"start_checkpoint_name": "Bódvaszilas", "end_checkpoint_name": "Boldogkőváralja" }'::jsonb
		WHEN name = 'OKT-26' THEN'{"start_checkpoint_name": "Boldogkőváralja", "end_checkpoint_name": "Nagy-nyugodó" }'::jsonb
		WHEN name = 'OKT-27' THEN'{"start_checkpoint_name": "Nagy-nyugodó", "end_checkpoint_name": "Hollóháza" }'::jsonb
	END AS properties
FROM
(SELECT
	uuid_generate_v7() AS id,
	'OKT-' || lpad(generate_series(1,27)::text, 2, '0') AS name,
	(SELECT id FROM trail WHERE name = 'OKT' LIMIT 1) AS trail_id,
	jsonb_build_object(
		'url', 'https://www.kektura.hu/okt-szakasz/okt-' || lpad(generate_series(1,27)::text, 2, '0')
	) AS properties
 ) q1;
