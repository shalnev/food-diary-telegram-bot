import * as TelegramBot from 'node-telegram-bot-api';

export const HUNGRY_STATES: string[] = [
    'Умираю от голода',
    'Нестерпимо голоден',
    'Хочу есть!',
    'Слегка голоден',
    'Ни сыт ни голоден',
    'Слегка сыт',
    'Сыт',
    'Сыт с избытком',
    'Сильно объелся'
];

export enum TIME_ACTIONS {
    CURRENT = 'Текущее время',
    ADD = 'Добавить своё',
}

export enum BOT_COMMANDS_LIST {
    START = '/start',
    INFO = '/info',
    RECORD = '/record',
    CLEAR = '/clear',
}

export const BOT_COMMANDS: TelegramBot.BotCommand[] = [
    {command: BOT_COMMANDS_LIST.START, description: 'Начальное приветствие'},
    {command: BOT_COMMANDS_LIST.INFO, description: 'Здесь будет описание работы бота'},
    {command: BOT_COMMANDS_LIST.RECORD, description: 'Внести запись'},
    {command: BOT_COMMANDS_LIST.CLEAR, description: 'Очистить базу'},
]




