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

CREATE TABLE public.trail_segment
(
    id UUID NOT NULL,
    name TEXT NOT NULL,
    properties JSONB,
    trail_segment_group_id UUID NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT trail_segment_group_id_fkey FOREIGN KEY (trail_segment_group_id) REFERENCES trail_segment_group (id)
);

SELECT AddGeometryColumn ('public','trail_segment','path',4326,'LINESTRING',2);