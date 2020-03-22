import { Ingredient } from './../../../data/recipes'
import test from 'ava'
import { aggregateIngredients } from '../dinnerMiddleware'

test('aggregates ingredients properly', t => {
  const numberIngredients: Ingredient[] = [
    { name: 'Frühlingzwiebel', quantity: '1' },
    { name: 'Frühlingzwiebel', quantity: '1' },
    { name: 'Frühlingzwiebel', quantity: '1' },
  ]
  t.deepEqual(aggregateIngredients(numberIngredients), [
    {
      name: 'Frühlingzwiebel',
      quantity: '3',
    },
  ])

  const nonNumberIngredients: Ingredient[] = [
    { name: 'Äpfel', quantity: '1 and half' },
    { name: 'Äpfel', quantity: '1' },
  ]
  t.deepEqual(aggregateIngredients(nonNumberIngredients), [
    {
      name: 'Äpfel',
      quantity: '1 and half, 1',
    },
  ])

  const partialIngredients: Ingredient[] = [
    { name: 'Garlic', quantity: '1.5' },
    { name: 'Garlic', quantity: '3.7' },
  ]
  t.deepEqual(aggregateIngredients(partialIngredients), [
    {
      name: 'Garlic',
      quantity: '5.2',
    },
  ])
})
