CREATE TABLE trails.trail_segment_group
(
    id UUID NOT NULL DEFAULT uuid_generate_v7(),
    name TEXT NOT NULL,
    trail_id UUID NOT NULL,
    properties JSONB,
    PRIMARY KEY (id),
    CONSTRAINT trail_group_trail_fkey FOREIGN KEY (trail_id) REFERENCES trails.trail (id)
);

GRANT ALL ON TABLE trails.trail_segment_group TO "trail-svc";

