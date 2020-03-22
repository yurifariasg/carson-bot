import { recipes } from '../../data/recipes'
import { BotContext } from '../../types'
import {
  InlineKeyboardButton,
  ExtraEditMessage,
  ParseMode,
} from 'telegraf/typings/telegram-types'
import {
  aggregateIngredients,
  getAllIngredientsFor,
  shiftArrayBy,
} from './dinnerUtils'

const SAVED_OPTIONS_KEY = 'savedOptions'
const CHOSEN_OPTIONS_KEY = 'chosenOptions'

const PARSE_MODE: ParseMode = 'Markdown'

const MAX_OPTIONS = 2
const FINISH_OPTION = 'finish'
const MORE_OPTION = 'more...'

// TODO: Future, add algorithm to change ordering of these.
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
    dinnerOptions.length > 0 ? '\n\n*Chosen so far*' : ''
  }${dinnerOptions.map(option => '\n' + option)}\n`
}

function createInlineKeyboard(
  savedOptions: string[],
): InlineKeyboardButton[][] {
  return savedOptions
    .slice(0, MAX_OPTIONS)
    .map(option => [
      {
        text: option,
        callback_data: option,
      },
    ])
    .concat([
      [
        { text: FINISH_OPTION, callback_data: FINISH_OPTION },
        { text: MORE_OPTION, callback_data: MORE_OPTION },
      ],
    ])
}

const getKeyboardExtraForContext = (
  savedOptions: string[],
): ExtraEditMessage => ({
  reply_markup: {
    inline_keyboard: createInlineKeyboard(savedOptions),
  },
  parse_mode: PARSE_MODE,
})

export const dinnerHandler = (ctx: BotContext): void => {
  ctx.session[SAVED_OPTIONS_KEY] = createDinnerOptions()
  ctx.reply(createDinnerStr(), getKeyboardExtraForContext(getSavedOptions(ctx)))
}

const addChosenOptionToSession = (ctx: BotContext, option: string): void => {
  ctx.session[CHOSEN_OPTIONS_KEY] = getChosenOptions(ctx).concat(option)
  const newSavedOptions = getSavedOptions(ctx).filter(
    savedOption => !option.includes(savedOption),
  )
  ctx.session[SAVED_OPTIONS_KEY] = newSavedOptions
}

function handleFinishOption(ctx: BotContext): void {
  const chosenOptions = getChosenOptions(ctx)

  const ingredients = aggregateIngredients(getAllIngredientsFor(chosenOptions))
  const ingredientsMessage = ingredients
    .map(i => `*${i.name}* ${i.quantity}`)
    .join('\n')

  if (chosenOptions.length > 0) {
    ctx.editMessageText(
      `*Selected Options*\n${chosenOptions.join('\n')}\n\n` +
        ingredientsMessage,
      { parse_mode: PARSE_MODE },
    )
  } else {
    ctx.editMessageText('No options selected')
  }
  clearOptions(ctx)
}

function handleMoreOption(ctx: BotContext): void {
  const chosenOptions = getChosenOptions(ctx)
  const savedOptions = getSavedOptions(ctx)

  shiftArrayBy(MAX_OPTIONS, savedOptions)

  ctx.session[SAVED_OPTIONS_KEY] = savedOptions

  ctx.editMessageText(
    createDinnerStr(chosenOptions),
    getKeyboardExtraForContext(savedOptions),
  )
}

export const dinnerCallback = (ctx: BotContext): void => {
  const chosenOption = ctx.callbackQuery?.data ?? ''

  if (chosenOption === FINISH_OPTION) {
    handleFinishOption(ctx)
  } else if (chosenOption === MORE_OPTION) {
    handleMoreOption(ctx)
  } else {
    addChosenOptionToSession(ctx, chosenOption)
    const chosenOptions = getChosenOptions(ctx)
    ctx.editMessageText(
      createDinnerStr(chosenOptions),
      getKeyboardExtraForContext(getSavedOptions(ctx)),
    )
  }
}
