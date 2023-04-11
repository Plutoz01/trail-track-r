CREATE TABLE IF NOT EXISTS okt_import.point
(
    id BIGSERIAL NOT NULL,
	name TEXT NOT NULL,
	ref TEXT,
	url TEXT,
	description TEXT,
	checkpoint_group TEXT NOT NULL,
	properties JSONB,
    PRIMARY KEY (id)
);

SELECT AddGeometryColumn ('okt_import','point','geom',4326,'POINT',2);
