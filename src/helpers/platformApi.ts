import isElectron from 'is-electron'

export const notice = ({ title, message }:{title:string, message:string}) => {
  if (isElectron()) {
    // const { ipcRenderer } = window.require('electron')
    // console.log('🚀 ~ file: platformApi.ts ~ line 6 ~ notice ~ ipcRenderer', ipcRenderer)
    // ipcRenderer.sendSync('notice', '发个同步消息')
    window.electronApi.notice({ title, message })
  } else {
    const notification = new Notification(title, { body: message })
  }
}
export const openExternal = (url:string) => {
  if (isElectron()) {
    window.electronApi.openExternal(url)
  } else {
    window.open(url, '_blank')
  }
}
