export type Recipe = {
  name: string
  ingredients: Ingredient[]
}

export type Ingredient = {
  name: string
  quantity: string
}

export const recipes: Recipe[] = [
  {
    name: 'Camembert mit Honig',
    ingredients: [
      { name: 'Suesskartoffel', quantity: '1' },
      { name: 'Gewuerzmischung Dukkah', quantity: '2g' },
      { name: 'Fruehlingzwiebel', quantity: '1' },
      { name: 'Linsen', quantity: '1' },
      { name: 'Apfel', quantity: '1' },
      { name: 'Camembert', quantity: '2' },
      { name: 'Honig', quantity: '20g' },
      { name: 'Pekannusskerne', quantity: '10g' },
      { name: 'koerniger Senf', quantity: '17g' },
      { name: 'Rotweinessig', quantity: '12ml' },
      { name: 'Rucola', quantity: '50g' },
    ],
  },
  {
    name: 'Galette mit Kraeuterseitling und bacon',
    ingredients: [
      { name: 'Knoblauchzehe', quantity: '1' },
      { name: 'Schmand', quantity: '150' },
      { name: 'Basilikumpaste', quantity: '15ml' },
      { name: 'Quiche-Teig', quantity: '1' },
      { name: 'Baby-Kraeuterseitlinge', quantity: '100g' },
      { name: 'gewuerfelter Bacon', quantity: '50g' },
      { name: 'Bergkaese', quantity: '50g' },
      { name: 'Tomate', quantity: '1' },
      { name: 'Fruehlingzwiebel', quantity: '1' },
      { name: 'Babyspinat', quantity: '75g' },
    ],
  },
  {
    name: 'Süßkartoffel-Hähnchen-Gratin',
    ingredients: [
      { name: 'Süßkartoffel', quantity: '1' },
      { name: 'Packung Hähnchenbrustfilet', quantity: '1' },
      { name: 'Päckchen Gulaschgewürz', quantity: '1' },
      { name: 'Knoblauchzehe', quantity: '1' },
      { name: 'Minigurke', quantity: '1' },
      { name: 'Becher Joghurt', quantity: '1' },
      { name: 'Packung Sweet-Chili-Sauce', quantity: '1' },
      { name: 'Packung Pizzakäse', quantity: '1' },
      { name: 'Tomate', quantity: '1' },
      { name: 'Packung Feldsalat', quantity: '1' },
    ],
  },
]
