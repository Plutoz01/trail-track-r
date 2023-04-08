## Source:
OpenStreetMap

## All in one
OSM Relation:
https://www.openstreetmap.org/relation/3020505

GPX export via waymarkedtrails.org (WMT):

UI:

https://hiking.waymarkedtrails.org/#route?id=3020505&type=relation

Download link:

https://hiking.waymarkedtrails.org/api/v1/details/relation/3020505/geometry/gpx

## Splitted by segment groups:
Parent OSM relation:

https://www.openstreetmap.org/relation/6007494

WMT:

https://hiking.waymarkedtrails.org/#route?id=6007494&type=relation


## Overpass turbo queries

All checkpoints:
```
[out:json][timeout:55];
{{geocodeArea:Hungary}}->.searchArea;
(
  node["checkpoint"="hiking"]["course"="Országos Kéktúra"](area.searchArea);
);
out body;
>;
out skel qt;
```

Grouped segments with coordinates
```
[out:json][timeout:20];

relation(6007494);
relation(>>)["type"="route"];

out geom;

```
