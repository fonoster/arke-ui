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

    add = resource => {
    }

    update = resource => {
        const rObj = JSON.parse(resource)
        const t =  rObj.kind.toLowerCase() + 's'
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
            // Notify
        })
    }

    remove = (type, refs) => {
        refs.forEach(ref => {
            const endpoint = getEndpoint(this.apiURL, type + '/'+ ref, '', this.token)
            fetch(endpoint, {
                method: 'DELETE'
            })
            .then(results => {
                return results.json()
            })
            .then(response => {
                // Notify
            })
        })
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
        }).catch(e => {
            console.log(e)
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
