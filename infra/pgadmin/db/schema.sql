-- install uuid v7 generator script from: https://gist.github.com/kjmph/5bd772b2c2df145aa645b837da7eca74


CREATE TABLE public.trail
(
    id UUID NOT NULL DEFAULT uuid_generate_v7(),
    name TEXT NOT NULL,
    properties JSONB,
    PRIMARY KEY (id),
    CONSTRAINT trail_name_ukey UNIQUE (name)
);

CREATE TABLE public.trail_segment_group
(
    id UUID NOT NULL DEFAULT uuid_generate_v7(),
    name TEXT NOT NULL,
    trail_id UUID NOT NULL,
    properties JSONB,
    PRIMARY KEY (id),
    CONSTRAINT trail_group_trail_fkey FOREIGN KEY (trail_id) REFERENCES trail (id)
);

CREATE TABLE public.poi
(
    id UUID NOT NULL DEFAULT uuid_generate_v7(),
    name TEXT NOT NULL,
    properties JSONB,
    PRIMARY KEY (id),
    CONSTRAINT poi_name_ukey UNIQUE (name)
);

SELECT AddGeometryColumn ('public','poi','location',4326,'POINT',2);

CREATE TABLE public.trail_segment
(
    id UUID NOT NULL DEFAULT uuid_generate_v7(),
    name TEXT NOT NULL,
    properties JSONB,
    trail_segment_group_id UUID NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT trail_segment_group_id_fkey FOREIGN KEY (trail_segment_group_id) REFERENCES trail_segment_group (id)
);

SELECT AddGeometryColumn ('public','trail_segment','path',4326,'LINESTRING',2);

DROP TYPE IF EXISTS trail_segment_poi_relation_type;
CREATE TYPE trail_segment_poi_relation_type AS ENUM ('start', 'end', 'located_along');

CREATE TABLE public.trail_segment_poi_relation
(
    trail_segment_id UUID NOT NULL,
    poi_id UUID NOT NULL,
    relation_type trail_segment_poi_relation_type NOT NULL,
    PRIMARY KEY (trail_segment_id, poi_id, relation_type)
);