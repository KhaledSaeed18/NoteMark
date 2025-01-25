declare global {
  interface Window {
    // electron: ElectronAPI
    context: {
      // Expose the electronAPI object to the renderer process
  }
}
