import { decorate, observable, when } from 'mobx'
import { getEndpoint } from '../components/common/utils'
import { createData} from '../components/common/dataStruct'
import { appStore } from './app'

class APIStore {
    resourceType = ''
    resources = []
    apiURL = '/api/v1beta1'
    token = ''

    constructor() {
       when(
         () => this.resourceType !== appStore.getCurrentSection() && this.token !== '',
         () => {
           this.loadResources(appStore.getCurrentSection())
           this.resourceType = appStore.getCurrentSection()
         }
       )
    }

    update = resource => {
        let rObj
        try {
            rObj = JSON.parse(resource)
        } catch(e) {
            appStore.notify('Malformed document.')
            return
        }
        const t = appStore.getCurrentSection()
        const endpoint = getEndpoint(this.apiURL,
          t + '/' + rObj.metadata.ref, '', this.token)
        fetch(endpoint, {
            method: 'PUT',
            body: resource
        })
        .then(results => {
            return results.json()
        })
        .then(response => {
            if (response.status === 200) {
                appStore.notify('Updated resource.')
            } else {
                appStore.notify(response.message)
            }
            this.loadResources(appStore.getCurrentSection())
        })
    }

    delete = async(type, refs) => {
        const ep = ref => getEndpoint(this.apiURL, type + '/'+ ref, '', this.token)
        let error = []
        for (let i =0; i < refs.length; i++) {
            const response = await fetch(ep(refs[i]), { method: 'DELETE'})
            if (response.status !== 200) {
                error.push(response.message)
            }
        }
        this.loadResources(appStore.getCurrentSection())
        if (error.length > 0) {
            appStore.notify('An error occurred while deleting the resources.')
        } else {
            appStore.notify(`${refs.length} ${appStore.getCurrentSection()} removed.`)
        }
    }

    loadResources = type => {
        const t = type === 'registration' ? 'registry' : type
        const endpoint = getEndpoint(this.apiURL, t, '*', this.token)

        fetch(endpoint)
        .then(results => {
            return results.json()
        }).then(resources => {
            const data = []
            if (resources && resources.data) {
              resources.data.forEach(item => {
                  data.push(createData(item, type))
              })
            }
            this.resources = data
        })
    }

    getResources = () => this.resources

    getAPIUrl = () => this.apiURL

    setApiURL = apiURL => this.apiURL = apiURL

    getToken = () => this.token

    setToken = token => this.token = token

}

decorate(APIStore, {
    resources: observable,
    token: observable
})

export const apiStore = new APIStore()
