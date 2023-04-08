CREATE TYPE trails.trail_segment_poi_relation_type AS ENUM ('start', 'end', 'located_along');

CREATE TABLE trails.trail_segment_poi_relation
(
    trail_segment_id UUID NOT NULL,
    poi_id UUID NOT NULL,
    relation_type trail_segment_poi_relation_type NOT NULL,
    PRIMARY KEY (trail_segment_id, poi_id, relation_type)
);

GRANT USAGE ON TYPE trails.trail_segment_poi_relation_type TO "trail-svc";
GRANT ALL ON TABLE trails.trail_segment_poi_relation TO "trail-svc";
