CREATE TABLE public.trail
(
    id UUID NOT NULL,
    name TEXT NOT NULL,
    properties JSONB,
    PRIMARY KEY (id),
    CONSTRAINT trail_name_ukey UNIQUE (name)
);

CREATE TABLE public.trail_segment_group
(
    id UUID NOT NULL,
    name TEXT NOT NULL,
    trail_id UUID NOT NULL,
    properties JSONB,
    PRIMARY KEY (id),
    CONSTRAINT trail_group_trail_fkey FOREIGN KEY (trail_id) REFERENCES trail (id)
);

CREATE TABLE public.poi
(
    id UUID NOT NULL,
    name TEXT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT poi_name_ukey UNIQUE (name)
);

SELECT AddGeometryColumn ('public','poi','location',4326,'POINT',2);

CREATE TABLE public.trail_segment
(
    id UUID NOT NULL,
    name TEXT NOT NULL,
    properties JSONB,
    trail_segment_group_id UUID NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT trail_segment_group_id_fkey FOREIGN KEY (trail_segment_group_id) REFERENCES trail_segment_group (id),
    CONSTRAINT trail_segment_start_location_id_fkey FOREIGN KEY (start_location_id) REFERENCES poi (id),
    CONSTRAINT trail_segment_end_location_id_fkey FOREIGN KEY (end_location_id) REFERENCES poi (id)
);

SELECT AddGeometryColumn ('public','trail_segment','path',4326,'LINESTRING',2);

CREATE TYPE trail_segment_poi_relation_type AS ENUM ('start', 'end', 'located_along');

CREATE TABLE public.trail_segment_poi_relation
(
    trail_segment_id UUID NOT NULL,
    poi_id UUID NOT NULL,
    relation_type trail_segment_poi_relation_type NOT NULL,
    PRIMARY KEY (trail_segment_id, poi_id, relation_type)
);