export const MOROCCAN_CITIES = [
  "Casablanca",
  "Rabat",
  "Marrakech",
  "Agadir",
  "Fès",
  "Tanger",
  "Meknès",
  "Oujda",
  "Kénitra",
  "Tétouan",
  "El Jadida",
  "Safi",
  "Mohammedia",
  "Béni Mellal",
  "Nador",
  "Taza",
  "Khouribga",
  "Settat",
  "Laâyoune",
  "Dakhla",
] as const

export type MoroccanCity = typeof MOROCCAN_CITIES[number]

export const CITIES_WITH_EMOJI = MOROCCAN_CITIES.map((city) => ({
  value: city,
  label: city,
}))

