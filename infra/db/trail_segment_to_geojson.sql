SELECT jsonb_build_object(
    'type', 'Feature',
    'id', id,
    'properties', jsonb_build_object(
        'name', name,
        'description', description,
        'url', url
    ),
    'geometry', st_asgeojson(path)::jsonb
    )
FROM trail_segment;