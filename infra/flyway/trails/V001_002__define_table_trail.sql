CREATE TABLE trails.trail
(
    id UUID NOT NULL DEFAULT uuid_generate_v7(),
    name TEXT NOT NULL,
    properties JSONB,
    PRIMARY KEY (id),
    CONSTRAINT trail_name_ukey UNIQUE (name)
);

GRANT ALL ON TABLE trails.trail TO "trail-svc";
