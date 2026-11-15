/* Pakistan ADM1 outlines (geoBoundaries gbOpen, CC BY 4.0), simplified and projected. */
export const MAP_W = 1000;
export const MAP_H = 916;
const LON0 = 60.5, LAT1 = 37.2, K = 0.866025, S = 66.362100;
/** Project lon/lat to map SVG coordinates. */
export function project(lon: number, lat: number): [number, number] {
  return [(lon - LON0) * K * S, (LAT1 - lat) * S];
}
export const PROVINCES: { name: string; d: string }[] = [
  { name: "Balochistan", d: "" },
  { name: "Sindh", d: "" },
  { name: "Gilgit-Baltistan", d: "" },
  { name: "Azad Kashmir", d: "" },
  { name: "Khyber Pakhtunkhwa", d: "" },
  { name: "Punjab", d: "" },
  { name: "Islamabad Capital Territory", d: "" },
];
