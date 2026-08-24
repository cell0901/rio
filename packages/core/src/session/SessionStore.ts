import path from "node:path"
import os from "node:os"
import fs from "fs"

export class SessionStore { // every time a rio is on. A new SessionStore is created with that cwd and model. storing session details temp
  // in memory until any first messages is initiated for user
  private session: any;
  private firstMessage = false

  constructor(cwd: string, model: string) { // process.cwd
    this.session = {
      cwd: cwd,
      model: model,
      createdAt: new Date().toISOString(), // to get the year day format
      sessionId: crypto.randomUUID(),
      messages: []
    }
  }

  appendMessage(message: any) {
    this.session.messages.push(message)
    this.writeToFile(message)
  }

  private writeToFile(message: any) {
    const filepath = this.getFilePath()
    // if this is the first time first make that path
    if (!this.firstMessage) { // if this is the first create the file and writeto file
      fs.mkdirSync(filepath)
      fs.writeFileSync(filepath, message)
      this.firstMessage = true
    }
    // else just append the message to  it
    fs.appendFileSync(filepath, message)
  }

  private getFilePath() {
    const date = new Date(this.session.createdAt)
    const year = date.getFullYear().toString()
    const month = String(date.getMonth() + 1).padStart(2, '0') // makes hte month from 5 to 05
    const day = date.getDay().toString()

    return path.join(os.homedir(), ".rio", "sessions", year, month, day, `${this.session.sessionId}.jsonl`)
  }



}
