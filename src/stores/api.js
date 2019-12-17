import { decorate, observable, when } from 'mobx'
import { getEndpoint } from '../components/common/utils'
import { createData} from '../components/common/dataStruct'
import { appStore } from './app'

class APIStore {
    resourceType = ''
    resources = []
    apiURL = '/api/v1beta1'
    token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiJ9.xZoFy3fXRptGpOad74RVxp5j_TZ31mD-Kuqw6PS5NfgsqWZiWWgxypi9ApFKqjWXOXwNp8HiaxgzlfmWP9w1eg'

    constructor() {
       when(
         () => this.resourceType !== appStore.getCurrentSection(),
         () => {
           this.loadResources(appStore.getCurrentSection())
           this.resourceType = appStore.getCurrentSection()
         }
       )
    }

    add = resource => {}

    updated = resource => {}

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
        const r = type === 'registration' ? 'registry' : type
        const endpoint = getEndpoint(this.apiURL, r, '*', this.token)

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

    getToken = () => this.token

    /*if (getParameterByName('token')) {
        this.setState({token:getParameterByName('token')})
    }*/

    /*if (getParameterByName('apiURL')) {
        this.setState({apiURL:getParameterByName('apiURL')})
    }*/
}

decorate(APIStore, {
    resources: observable,
    token: observable
})

export const apiStore = new APIStore()
