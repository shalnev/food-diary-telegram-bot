import { getKeyboardButtons } from './utilities';
import { HUNGRY_STATES, BOT_COMMANDS_LIST, TIME_ACTIONS } from './dictionaries';
import * as TelegramBot from 'node-telegram-bot-api';
import { MockDatabase } from './mock-database';

export function record(bot: TelegramBot, database: MockDatabase, chatID: number, text: string): Promise<TelegramBot.Message> | undefined {
    if (text === BOT_COMMANDS_LIST.RECORD) {
        return bot.sendMessage(chatID, 'Состояние до приёма пищи:', getKeyboardButtons(HUNGRY_STATES));
    }

    if (isHungryStateBefore(text, database)) {
        database.add(text);
        return bot.sendMessage(chatID, 'Состояние после приема пищи:', getKeyboardButtons(HUNGRY_STATES));
    }
    if (isHungryStateAfter(text, database)) {
        database.add(text);
        return bot.sendMessage(chatID, 'Когда поели?', getKeyboardButtons([TIME_ACTIONS.CURRENT, TIME_ACTIONS.ADD]));
    }
    if (isTimeAction(text)) {
        if (text === TIME_ACTIONS.CURRENT) {
            database.add(Date.now());
            return bot.sendMessage(chatID, 'Что съели?');
        }
        if (text === TIME_ACTIONS.ADD) {
            return bot.sendMessage(chatID, 'Этот функционал бота ещё не сделан');
        }
    }
    const res = isFoodShouldBeNext(database);
    if (res) {
        database.add(text);
        return bot.sendMessage(chatID, `Вот ваша запись: ${database.source.toString()}`)
    }
}

export function isRecordFlow(text: string, database: MockDatabase): boolean {
    return text === BOT_COMMANDS_LIST.RECORD || isHungryStateMessage(text) || isTimeAction(text) || isFoodShouldBeNext(database);
}

function isHungryStateMessage(text: string): boolean {
    return HUNGRY_STATES.includes(text);
}

function isHungryStateBefore(text: string, database: MockDatabase): boolean {
    return isHungryStateMessage(text) && database.source.length === 0;
}

function isHungryStateAfter(text: string, database: MockDatabase): boolean {
    return database.source.every(isHungryStateMessage) && database.source.length === 1;
}

function isTimeAction(text: string): boolean {
    return Object.values(TIME_ACTIONS).includes(text as TIME_ACTIONS);
}

function isFoodShouldBeNext(database: MockDatabase) {
    return database.source.length === 3;
}