import os from "node:os"
import path from "node:path"
// function to get session path to load in the tui. if user decides to resume a session

// Gets the base path for all sessions
export function getSessionPath() {
  return path.join(os.homedir(), ".rio", "sessions")
}

export function getSessionFilePath(sessionId: string, date: Date) {
  const year = date.getFullYear().toString()
  const month = String(date.getMonth() + 1).padStart(2, '0') // makes hte month from 5 to 05
  const day = date.getDay().toString()

  return path.join(getSessionPath(), year, month, day, `${sessionId}.jsonl`)
}




