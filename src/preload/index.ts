import { contextBridge } from 'electron'

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

try {
  contextBridge.exposeInMainWorld('context', {
    // Expose the electronAPI object to the renderer process
  })
} catch (error) {
  console.error(error)
}
