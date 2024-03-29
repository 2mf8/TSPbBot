import Long from "long";
import {Bot} from "../bot/Bot";
import { Message, MessageReceipt } from "../proto/onebot_base";
import {toLong} from "./convertLong";

export class Msg {
  public messageList: Message[];

  constructor(){
    this.messageList = [];
  }

  static builder(): Msg {
    return new Msg()
  }

  text(text: string): Msg {
    this.messageList.push({
      type: "text",
      data: {
        "text": text
      }
    })
    return this
  }

  tts(text: string): Msg {
    this.messageList.push({
      type: "tts",
      data: {
        "text": text
      }
    })
    return this
  }

  record(url: string): Msg {
    this.messageList.push({
      type: "record",
      data: {
        "url": url
      }
    })
    return this
  }

  at(qq: Long | string | number): Msg {
    this.messageList.push({
      type: "at",
      data: {
        "qq": toLong(qq).toString()
      }
    })
    return this
  }

  atAll(): Msg {
    this.messageList.push({
      type: "at",
      data: {
        "qq": "all"
      }
    })
    return this
  }

  dice(value: number): Msg {
    this.messageList.push({
      type: "dice",
      data: {
        "value": value.toString()
      }
    })
    return this
  }

  face(id: number): Msg {
    this.messageList.push({
      type: "face",
      data: {
        "id": id.toString()
      }
    })
    return this
  }

  flash(url: string): Msg {
    this.messageList.push({
      type: "image",
      data: {
        "url": url,
        "type": "flash"
      }
    })
    return this
  }

  show(url: string, effectId: number = 40000): Msg {
    this.messageList.push({
      type: "image",
      data: {
        "url": url,
        "type": "show",
        "effect_id": effectId.toString()
      }
    })
    return this
  }

  share(url: string, title: string, content: string, image: string): Msg {
    this.messageList.push({
      type: "share",
      data: {
        "url": url,
        "title": title,
        "content": content,
        "image": image,
      }
    })
    return this
  }

  lightApp(content: string): Msg {
    this.messageList.push(({
      type: "light_app",
      data: {
        "content": content
      }
    }))
    return this
  }

  xml(id: number, content: string): Msg {
    this.messageList.push({
      type: "service",
      data: {
        "sub_type": "xml",
        "id": id.toString(),
        "content": content
      }
    })
    return this
  }

  json(id: number, content: string): Msg {
    this.messageList.push({
      type: "service",
      data: {
        "sub_type": "json",
        "id": id.toString(),
        "content": content
      }
    })
    return this
  }

  image(url: string): Msg {
    this.messageList.push({
      type: "image",
      data: {
        "url": url
      }
    })
    return this
  }

  /** GMC 专用 */
  reply(messageId: number): Msg {
    this.messageList.push({
      type: "reply",
      data: {
        "message_id": messageId.toString()
      }
    })
    return this
  }

  /** GMC 1.1.0 以上版本和pbrq皆可用 */
  replyByMessageReceipt(messageId: MessageReceipt): Msg {
    this.messageList.push({
      type: "reply",
      data: {
        "message_id": messageId.toString()
      }
    })
    return this
  }

  sleep(time: Long): Msg {
    this.messageList.push({
      type: "sleep",
      data: {
        "time": time.toString()
      }
    })
    return this
  }

  video(url: string, cover: string, cache: boolean = true): Msg {
    this.messageList.push({
      type: "video",
      data: {
        "url": url,
        "cover": cover,
        "cache": cache ? "1" : "0"
      }
    })
    return this
  }

  gift(qq: Long | number | string, id: number): Msg {
    this.messageList.push({
      type: "gift",
      data: {
        "qq": qq.toString(),
        "id": id.toString(),
      }
    })
    return this
  }

  poke(qq: Long | number | string): Msg {
    this.messageList.push({
      type: "poke",
      data: {
        "qq": qq.toString(),
      }
    })
    return this
  }

  sendToGroup(bot: Bot, groupId: Long | string | number, autoEscape: boolean = true): Msg {
    bot.sendGroupMessage(toLong(groupId), this, autoEscape)
    return this
  }

  sendToFriend(bot: Bot, userId: Long | string | number, autoEscape: boolean = true): Msg {
    bot.sendPrivateMessage(toLong(userId), this, autoEscape)
    return this
  }
}
