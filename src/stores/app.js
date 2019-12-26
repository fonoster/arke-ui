import { decorate, observable } from 'mobx'

class AppStore {
  currentResource = {}
  resourceEditorOpen = false
  aboutDialogOpen = false
  fileUploaderOpen = false
  notificationOpen = false
  notificationMsg = ''
  currentSection = 'domains'

  notify = (msg, time) => {
      this.notificationMsg = msg
      this.setNotificationOpen()
  }

  setNotificationOpen = () => this.notificationOpen = !this.notificationOpen
  setCurrentResource = resource => this.currentResource = resource
  setResourceEditorOpen = () => this.resourceEditorOpen = !this.resourceEditorOpen
  setAboutDialogOpen = () => this.aboutDialogOpen = !this.aboutDialogOpen
  setFileUploaderOpen = () => this.fileUploaderOpen = !this.fileUploaderOpen
  setCurrentSection = section => this.currentSection = section

  getCurrentSection = () => this.currentSection
  getCurrentResource = () => this.currentResource

  isResourceSection = () => this.currentSection === 'domains'  ||
    this.currentSection === 'agents'   ||
    this.currentSection === 'peers'    ||
    this.currentSection === 'gateways' ||
    this.currentSection === 'numbers'

  isLocOrRegSection = () => this.currentSection === 'location'
    || this.currentSection === 'registration'

  isSettingsSection = () => this.currentSection === 'settings'
  isAboutDialogOpen = () => this.aboutDialogOpen
  isResourceEditorOpen = () => this.resourceEditorOpen
  isFileUploaderOpen = () => this.fileUploaderOpen
  isNotificationOpen = () => this.notificationOpen
}

decorate(AppStore, {
    currentResource: observable,
    currentSection: observable,
    resourceEditorOpen: observable,
    aboutDialogOpen: observable,
    fileUploaderOpen: observable,
    notificationMsg: observable,
    notificationOpen: observable
})

export const appStore = new AppStore()
