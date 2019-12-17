import { decorate, observable } from 'mobx'

class AppStore {
  currentResource = {}
  resourceEditorOpen = false
  aboutDialogOpen = false
  fileUploaderOpen = false
  currentSection = 'domains'

  setCurrentResource = resource => this.currentResource = resource
  setResourceEditorOpen = () => this.resourceEditorOpen = !this.resourceEditorOpen
  setAboutDialogOpen = () => this.aboutDialogOpen = !this.aboutDialogOpen
  setFileUploaderOpen = () => this.fileUploaderOpen = !this.fileUploaderOpen
  setCurrentSection = section => this.currentSection = section

  getCurrentSection = () => this.currentSection
  getCurrentResource = () => this.currentResource

  isResourceSection = () => {
      if (this.currentSection === 'domains'  ||
          this.currentSection === 'agents'   ||
          this.currentSection === 'peers'    ||
          this.currentSection === 'gateways' ||
          this.currentSection === 'numbers') {
            return true
      }
      return false
  }
  isAboutDialogOpen = () => this.aboutDialogOpen
  isResourceEditorOpen = () => this.resourceEditorOpen
  isFileUploaderOpen = () => this.fileUploaderOpen
}

decorate(AppStore, {
    currentResource: observable,
    resourceEditorOpen: observable,
    aboutDialogOpen: observable,
    currentSection: observable,
    fileUploaderOpen: observable
})

export const appStore = new AppStore()
