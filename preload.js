const path = require('path')
const notifier = require('node-notifier')
const { contextBridge } = require('electron')
function notice ({ title, message }) {
  notifier.notify({
    title,
    message,
    icon: path.join(__dirname, 'icon.png')
  })
}
contextBridge.exposeInMainWorld('electronApi', {
  notice: ({ title, message }) => {
    notice({ title, message })
  },
  openExternal: (url) => {
    require('electron').shell.openExternal(url)
  }
})
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }
  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})
