import { decorate, observable } from 'mobx'

class AppStore {
  currentResource = void(0)
  resourceEditorOpen = false

  setCurrentResource = resource => this.currentResource = resource
  getCurrentResource = () => this.currentResource

  isResourceEditorOpen = () => this.resourceEditorOpen
  setResourceEditorOpen = () => this.resourceEditorOpen = !this.resourceEditorOpen
}
decorate(AppStore, {
    currentResource: observable,
    resourceEditorOpen: observable
})

export const appStore = new AppStore()
