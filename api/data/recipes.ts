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
      { name: 'Süßkartoffel', quantity: '1' },
      { name: 'Gewürzmischung Dukkah', quantity: '2g' },
      { name: 'Frühlingzwiebel', quantity: '1' },
      { name: 'Linsen', quantity: '1' },
      { name: 'Apfel', quantity: '1' },
      { name: 'Camembert', quantity: '2' },
      { name: 'Honig', quantity: '20g' },
      { name: 'Pekannusskerne', quantity: '10g' },
      { name: 'körniger Senf', quantity: '17g' },
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
      { name: 'Baby-Kräuterseitlinge', quantity: '100g' },
      { name: 'gewürfelter Bacon', quantity: '50g' },
      { name: 'Bergkäse', quantity: '50g' },
      { name: 'Tomate', quantity: '1' },
      { name: 'Frühlingzwiebel', quantity: '1' },
      { name: 'Babyspinat', quantity: '75g' },
    ],
  },
  {
    name: 'Süßkartoffel-Hähnchen-Gratin',
    ingredients: [
      { name: 'Süßkartoffel', quantity: '1' },
      { name: 'Hähnchenbrustfilet', quantity: '1 Packung' },
      { name: 'Gulaschgewürz', quantity: '1 Päckchen' },
      { name: 'Knoblauchzehe', quantity: '1' },
      { name: 'Minigurke', quantity: '1' },
      { name: 'Joghurt', quantity: '1 Becher' },
      { name: 'Sweet-Chili-Sauce', quantity: '1 Packung' },
      { name: 'Pizzakäse', quantity: '1 Packung' },
      { name: 'Tomate', quantity: '1' },
      { name: 'Feldsalat', quantity: '1 Packung' },
    ],
  },
]
