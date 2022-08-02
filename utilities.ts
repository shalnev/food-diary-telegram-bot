import * as TelegramBot from 'node-telegram-bot-api';

export function getKeyboardButtons(list: string[]) {
    return {
        reply_markup: {
            keyboard: transformListToKeyboardOptions(list),
            one_time_keyboard: true,
        }
    }
}

function transformListToKeyboardOptions(list: string[]): TelegramBot.KeyboardButton[][] {
    return list.map((option: string) => ([{text: option}]));
}