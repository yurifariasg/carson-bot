import { recipes, Ingredient } from './../../data/recipes'
import { flatten, clone } from 'ramda'

export function getAllIngredientsFor(options: string[]): Ingredient[] {
  return flatten(
    recipes.filter(r => options.includes(r.name)).map(r => r.ingredients),
  )
}

const ingredientAlphabeticallySorter = (a: Ingredient, b: Ingredient): number =>
  a.name.localeCompare(b.name)

function aggregateQuantities(quantityA: string, quantityB: string): string {
  const intA = Number(quantityA)
  const intB = Number(quantityB)
  if (intA && intB) {
    return (intA + intB).toString()
  } else {
    return quantityA + ', ' + quantityB
  }
}

export function aggregateIngredients(ingredients: Ingredient[]): Ingredient[] {
  const sortedIngredients = ingredients.sort(ingredientAlphabeticallySorter)
  const aggregateIngredients: Ingredient[] = []
  for (let index = 0; index < sortedIngredients.length; index++) {
    const previousIngredient =
      aggregateIngredients.length > 0
        ? aggregateIngredients[aggregateIngredients.length - 1]
        : undefined
    const ingredient = sortedIngredients[index]
    if (previousIngredient && previousIngredient.name === ingredient.name) {
      previousIngredient.quantity = aggregateQuantities(
        previousIngredient.quantity,
        ingredient.quantity,
      )
    } else {
      aggregateIngredients.push(clone(ingredient))
    }
  }
  return aggregateIngredients
}

export function shiftArrayBy(positions: number, array: any[]): void {
  let i = 0
  while (i < positions) {
    array.push(array.shift()!)
    i++
  }
}
