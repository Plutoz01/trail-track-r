CREATE TABLE okt_import.track
(
    id BIGSERIAL NOT NULL,
    name TEXT NOT NULL,
    PRIMARY KEY (id)
);

SELECT AddGeometryColumn ('okt_import','track','geom',4326,'LINESTRING',2);
