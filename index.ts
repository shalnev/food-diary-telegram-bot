import * as TelegramBot from 'node-telegram-bot-api';
import { record, isRecordFlow } from './record';
import { BOT_COMMANDS, BOT_COMMANDS_LIST } from './dictionaries';
import { MockDatabase } from './mock-database';

const TelegramApi = require('node-telegram-bot-api');

const token = '5459212598:AAGkQdj2_su6yexBPNJyaEjocfFKgqBiHis';

const bot = new TelegramApi(token, {polling: true});

const database = new MockDatabase();

function initCommands() {
  bot.setMyCommands(BOT_COMMANDS);
}

async function messageHandler(msg: TelegramBot.Message) {
  const text = msg.text;
  const chatID = msg.chat.id;
  if (!text) {
    return bot.sendMessage(chatID, 'Я тебя не понимаю')
  }
  if (text === BOT_COMMANDS_LIST.START) {
    return bot.sendMessage(chatID, `Добро пожаловать в пищевой дневник! Здесь будет описание работы бота`);
  }
  if (text === BOT_COMMANDS_LIST.INFO) {
    return bot.sendMessage(chatID, 'Здесь будет описание работы бота');
  }
  if (text === BOT_COMMANDS_LIST.CLEAR) {
    database.clearAll();
    return bot.sendMessage(chatID, 'Базу очистил');
  }
  if (isRecordFlow(text, database)) {
    return record(bot, database, chatID, text);
  }
  return bot.sendMessage(chatID, 'Я тебя не понимаю');
}

function start() {
  initCommands();
  bot.on('message', messageHandler);

/*  bot.on('callback_query', async (msg: TelegramBot.Message & {data: string, message: TelegramBot.Message}) => {
    if (msg.data) {
      const payload = JSON.parse(msg.data);
      const chatID = msg.message?.chat.id;
      if (payload.data?.type === EVENTS.HUNGRY_STATE) {
        await bot.sendMessage(chatID, `Ты выбрал состояние «${payload.text}»`)
        if (payload.data)
          return bot.sendMessage(chatID, 'Состояние после приёма пищи: ', getHungryStateOptions(HUNGRY_STATE_TIME.AFTER));
      }
    }
  })*/
}

start();
