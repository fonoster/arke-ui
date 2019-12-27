import { decorate, observable, when } from 'mobx'
import { getEndpoint } from '../components/common/utils'
import { createData} from '../components/common/dataStruct'
import { appStore } from './app'

class APIStore {
    resources = []
    apiURL = '/api/v1beta1'
    config = {
      spec: {
        restService: {},
        securityContext: {}
      }
    }
    token = ''

    constructor() {
       when(
         () => this.token !== '',
         async() => {
           this.loadConfig()
           // TODO:  This avoid a stream collission with the loadConfig fuction
           // but it feels like a hack. Please take another look at it!
           await setTimeout(()=> {}, 1500)
           if (appStore.getCurrentSection() !== 'settings') {
              this.loadResources(appStore.getCurrentSection())
           }
         }
       )
    }

    update = resource => {
        if (this.doesNotSupportWOOps()) {
            appStore.notify('Operation not supported by data source provider.')
            return
        }
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
            } else if(response.status === 422 && response.data) {
                appStore.notify(response.message + ': ' +  response.data)
            } else {
                appStore.notify(response.message)
            }
            this.loadResources(appStore.getCurrentSection())
        })
    }

    delete = async(type, refs) => {
        if (this.doesNotSupportWOOps()) {
            appStore.notify('Operation not supported by data source provider.')
            return
        }
        const ep = ref => getEndpoint(this.apiURL, type + '/'+ ref, '', this.token)
        let error = []
        for (let i =0; i < refs.length; i++) {
            const stream = await fetch(ep(refs[i]), { method: 'DELETE'})
            const response = await stream.json()
            if (response.status === 405 || response.status === 409) {
                appStore.notify(response.message)
                return
            } else if (response.status !== 200) {
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

    loadResources = async(type) => {
        const t = type === 'registration' ? 'registry' : type
        const endpoint = getEndpoint(this.apiURL, t, '*', this.token)
        const stream = await fetch(endpoint)
        const response = await stream.json()

        if (response.status === 200) {
            const data = []
            if (response && response.data) {
              response.data.forEach(item => {
                  data.push(createData(item, type))
              })
            }
            this.resources = data
        } else {
            appStore.notify(response.message)
        }
    }

    getResources = () => this.resources

    getAPIUrl = () => this.apiURL

    setApiURL = apiURL => this.apiURL = apiURL

    getToken = () => this.token

    setToken = token => this.token = token

    saveConfig = config => {
        if (this.doesNotSupportWOOps()) {
            appStore.notify('Operation not supported by data source provider.')
            return
        }
        const t = 'system/config'
        const endpoint = getEndpoint(this.apiURL, t , '', this.token)
        fetch(endpoint, {
            method: 'PUT',
            body: JSON.stringify(config)
        })
        .then(results => {
            return results.json()
        })
        .then(response => {
            if (response.status === 200) {
                appStore.notify('Updated settings.')
            } else {
                appStore.notify(response.message)
            }
        })
    }

    loadConfig = async() => {
        const t = 'system/config'
        const endpoint = getEndpoint(this.apiURL, t, '*', this.token)
        const stream = await fetch(endpoint)
        const response = await stream.json()

        if (response.status === 200) {
            this.config = response.data
        } else {
            appStore.notify(response.message)
        }
    }

    getConfig = () => this.config

    doesNotSupportWOOps = () => this.config.spec.dataSource.provider === 'files_data_provider'

}

decorate(APIStore, {
    resources: observable,
    token: observable,
    config: observable
})

export const apiStore = new APIStore()
