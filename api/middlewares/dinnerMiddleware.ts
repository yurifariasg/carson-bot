import { Ingredient } from './../data/recipes'
import R from 'ramda'
import { recipes } from './../data/recipes'
import { BotContext } from '../types'
import {
  InlineKeyboardButton,
  ExtraEditMessage,
} from 'telegraf/typings/telegram-types'

const SAVED_OPTIONS_KEY = 'savedOptions'
const CHOSEN_OPTIONS_KEY = 'chosenOptions'

const FINISH_OPTION = 'end'

const createDinnerOptions = (): string[] => recipes.map(r => r.name)

const getSavedOptions = (ctx: BotContext): string[] =>
  ctx.session[SAVED_OPTIONS_KEY] ?? []

const getChosenOptions = (ctx: BotContext): string[] =>
  ctx.session[CHOSEN_OPTIONS_KEY] ?? []

const clearOptions = (ctx: BotContext): void => {
  ctx.session[SAVED_OPTIONS_KEY] = null
  ctx.session[CHOSEN_OPTIONS_KEY] = null
}

function createDinnerStr(dinnerOptions: string[] = []): string {
  return `Here are some dinner options${
    dinnerOptions.length > 0 ? '\nChosen so far' : ''
  }${dinnerOptions.map(option => '\n' + option)}`
}

function createInlineKeyboard(
  savedOptions: string[],
  chosenOptions: string[],
): InlineKeyboardButton[][] {
  return savedOptions
    .filter(savedOption => !chosenOptions.includes(savedOption))
    .concat(FINISH_OPTION)
    .map(option => [
      {
        text: option,
        callback_data: option,
      },
    ])
}

const getKeyboardExtraForContext = (ctx: BotContext): ExtraEditMessage => ({
  reply_markup: {
    inline_keyboard: createInlineKeyboard(
      getSavedOptions(ctx),
      getChosenOptions(ctx),
    ),
  },
})

export const dinnerHandler = (ctx: BotContext): void => {
  ctx.session[SAVED_OPTIONS_KEY] = createDinnerOptions()
  ctx.reply(createDinnerStr(), getKeyboardExtraForContext(ctx))
}

const addChosenOption = (ctx: BotContext, option: string): void => {
  ctx.session[CHOSEN_OPTIONS_KEY] = getChosenOptions(ctx).concat(option)
}

function getAllIngredientsFor(options: string[]): Ingredient[] {
  return R.flatten(
    recipes.filter(r => options.includes(r.name)).map(r => r.ingredients),
  )
}

export const dinnerCallback = (ctx: BotContext): void => {
  const chosenOption = ctx.callbackQuery?.data ?? ''

  const chosenFinishOption = chosenOption === FINISH_OPTION
  if (!chosenFinishOption) {
    addChosenOption(ctx, chosenOption)
  }
  const chosenOptions = getChosenOptions(ctx)

  if (chosenFinishOption) {
    const ingredients = getAllIngredientsFor(chosenOptions)
    const ingredientsMessage = ingredients
      .map(i => i.name + ' ' + i.quantity)
      .join('\n')

    const chosenOptionsText = chosenOptions.concat(',')

    ctx.editMessageText(
      `Selected Options: ${chosenOptionsText}\n` +
        'Ingredients:\n' +
        ingredientsMessage,
    )
    clearOptions(ctx)
  } else {
    ctx.editMessageText(
      createDinnerStr(chosenOptions),
      !chosenFinishOption ? getKeyboardExtraForContext(ctx) : undefined,
    )
  }
}
