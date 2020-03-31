import moment from 'moment'

export const columnDataDomains = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Domain Name', pos: 'c1' },
    { id: 'uri', numeric: false, disablePadding: false, label: 'URI', pos: 'c2' },
    { id: 'modified', numeric: false, disablePadding: false, label: 'Modified', pos: 'c3' },
    { id: 'ref', numeric: false, disablePadding: false, label: 'Ref', pos: 'c4' },
]

export function domainsStruct(item) {
    return {
        c1: item.metadata.ref,
        c2: JSON.stringify(item),
        c3: item.metadata.name,
        c4: item.spec.context.domainUri,
        c5: moment(item.metadata.modifiedOn).fromNow()
    }
}

export const columnDataAgents = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Agent Name', pos: 'c1' },
    { id: 'username', numeric: false, disablePadding: false, label: 'Username', pos: 'c2' },
    { id: 'modified', numeric: false, disablePadding: false, label: 'Modified', pos: 'c3'},
    { id: 'ref', numeric: false, disablePadding: false, label: 'Ref', pos: 'c4' },
]

export function agentsStruct(item) {
    return {
        c1: item.metadata.ref,
        c2: JSON.stringify(item),
        c3: item.metadata.name,
        c4: item.spec.credentials.username,
        c5: moment(item.metadata.modifiedOn).fromNow()
    }
}

export const columnDataPeers = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Peer Name', pos: 'c1' },
    { id: 'username', numeric: false, disablePadding: false, label: 'Username', pos: 'c2' },
    { id: 'modified', numeric: false, disablePadding: false, label: 'Modified', pos: 'c3' },
    { id: 'ref', numeric: false, disablePadding: false, label: 'Ref', pos: 'c4' },
]

export function peersStruct(item) {
    return {
        c1: item.metadata.ref,
        c2: JSON.stringify(item),
        c3: item.metadata.name,
        c4: item.spec.credentials.username,
        c5: moment(item.metadata.modifiedOn).fromNow()
    }
}

export const columnDataGateways = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Gateway', pos: 'c1' },
    { id: 'username', numeric: false, disablePadding: false, label: 'Username', pos: 'c2' },
    { id: 'host', numeric: false, disablePadding: false, label: 'Host', pos: 'c3' },
    { id: 'modified', numeric: false, disablePadding: false, label: 'Modified', pos: 'c4' },
    { id: 'ref', numeric: false, disablePadding: false, label: 'Ref', pos: 'c5' },
]

export function gatewaysStruct(item) {
    return {
        c1: item.metadata.ref,
        c2: JSON.stringify(item),
        c3: item.metadata.name,
        c4: !item.spec.credentials || !item.spec.credentials.username
          ? 'None' : item.spec.credentials.username ,
        c5: item.spec.host,
        c6: moment(item.metadata.modifiedOn).fromNow()
    }
}

export const columnDataNumbers = [
    { id: 'number', numeric: false, disablePadding: true, label: 'Number', pos: 'c1' },
    { id: 'location', numeric: false, disablePadding: false, label: 'Location', pos: 'c2' },
    { id: 'aorLink', numeric: false, disablePadding: false, label: 'AOR Link', pos: 'c3' },
    { id: 'modified', numeric: false, disablePadding: false, label: 'Modified', pos: 'c4' },
    { id: 'ref', numeric: false, disablePadding: false, label: 'Ref', pos: 'c5' },
]

export function numbersStruct(item) {
    let location = ''
    if(item.metadata.geoInfo) {
     location = item.metadata.geoInfo.city + ', '
      + item.metadata.geoInfo.country
    }

    return {
        c1: item.metadata.ref,
        c2: JSON.stringify(item),
        c3: item.spec.location.telUrl,
        c4: location,
        c5: item.spec.location.aorLink,
        c6: moment(item.metadata.modifiedOn).fromNow()
    }
}

export const columnDataLocation = [
    { id: 'addressOfRecord', numeric: false, disablePadding: true, label: 'Address Of Record', pos: 'c1' },
    { id: 'contactInfo', numeric: false, disablePadding: false, label: 'Contact Information', pos: 'c2' }
]

export function locationStruct(item) {
    return {
        c1: item.addressOfRecord,
        c2: item.contactInfo
    }
}

export const columnDataRegistration = [
    { id: 'host', numeric: false, disablePadding: false, label: 'Host', pos: 'c1' },
    { id: 'username', numeric: false, disablePadding: true, label: 'Username', pos: 'c2' },
    { id: 'ipAddress', numeric: false, disablePadding: false, label: 'IP', pos: 'c3' },
    { id: 'registered', numeric: false, disablePadding: false, label: 'Registered', pos: 'c4' }
]

export function registrationStruct(item) {
    console.log('item:' + JSON.stringify(item))
    return {
        c1: item.user,
        c2: item.host,
        c3: item.ip,
        c4: item.regOnFormatted,
    }
}

export function getColumnData(section) {
    switch (section) {
      case 'domains':
        return columnDataDomains
      case 'agents':
          return columnDataAgents
      case 'peers':
          return columnDataPeers
      case 'gateways':
          return columnDataGateways
      case 'numbers':
          return columnDataNumbers
      case 'location':
          return columnDataLocation
      case 'registration':
          return columnDataRegistration
      default:
        return columnDataDomains
    }
}

export function createData(item, section) {
    switch (section) {
      case 'domains':
          return domainsStruct(item)
      case 'agents':
          return agentsStruct(item)
      case 'peers':
          return peersStruct(item)
      case 'gateways':
          return gatewaysStruct(item)
      case 'numbers':
          return numbersStruct(item)
      case 'location':
          return locationStruct(item)
      case 'registration':
          return registrationStruct(item)
      default:
        return domainsStruct(item)
    }
}
