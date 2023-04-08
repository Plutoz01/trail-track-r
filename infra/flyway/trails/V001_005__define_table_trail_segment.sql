CREATE TABLE trails.trail_segment
(
    id UUID NOT NULL DEFAULT uuid_generate_v7(),
    name TEXT NOT NULL,
    properties JSONB,
    trail_segment_group_id UUID NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT trail_segment_group_id_fkey FOREIGN KEY (trail_segment_group_id) REFERENCES trails.trail_segment_group (id)
);

SELECT AddGeometryColumn ('trails','trail_segment','path',4326,'LINESTRING',2);

GRANT ALL ON TABLE trails.trail_segment TO "trail-svc";
