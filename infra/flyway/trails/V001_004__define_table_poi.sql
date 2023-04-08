CREATE TABLE trails.poi
(
    id UUID NOT NULL DEFAULT uuid_generate_v7(),
    name TEXT NOT NULL,
    properties JSONB,
    PRIMARY KEY (id),
    CONSTRAINT poi_name_ukey UNIQUE (name)
);

SELECT AddGeometryColumn ('trails','poi','location',4326,'POINT',2);

GRANT ALL ON TABLE trails.poi TO "trail-svc";
