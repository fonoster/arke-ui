export const columnDataDomains = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Domain Name' },
    { id: 'uri', numeric: false, disablePadding: false, label: 'URI' },
    { id: 'ref', numeric: false, disablePadding: false, label: 'Ref' },
];

export function domainsStruct(item) {
    return {
        c1: item.metadata.ref,
        c2: JSON.stringify(item),
        c3: item.metadata.name,
        c4: item.spec.context.domainUri
    };
}

export const columnDataAgents = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Agent Name' },
    { id: 'username', numeric: false, disablePadding: false, label: 'Username' },
    { id: 'ref', numeric: false, disablePadding: false, label: 'Ref' },
];

export function agentsStruct(item) {
    return {
        c1: item.metadata.ref,
        c2: JSON.stringify(item),
        c3: item.metadata.name,
        c4: item.spec.credentials.username
    };
}

export const columnDataPeers = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Peer Name' },
    { id: 'username', numeric: false, disablePadding: false, label: 'Username' },
    { id: 'ref', numeric: false, disablePadding: false, label: 'Ref' },
];

export function peersStruct(item) {
    return {
        c1: item.metadata.ref,
        c2: JSON.stringify(item),
        c3: item.metadata.name,
        c4: item.spec.credentials.username
    };
}

export const columnDataGateways = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Gateway' },
    { id: 'username', numeric: false, disablePadding: false, label: 'Username' },
    { id: 'host', numeric: false, disablePadding: false, label: 'Host' },
    { id: 'transport', numeric: false, disablePadding: false, label: 'Transport' },
    { id: 'ref', numeric: false, disablePadding: false, label: 'Ref' },
];

export function gatewaysStruct(item) {
    return {
        c1: item.metadata.ref,
        c2: JSON.stringify(item),
        c3: item.metadata.name,
        c4: item.spec.credentials ? item.spec.credentials.username : '--' ,
        c5: item.spec.host,
        c6: item.spec.transport
    };
}

export const columnDataNumbers = [
    { id: 'number', numeric: false, disablePadding: true, label: 'Number' },
    { id: 'location', numeric: false, disablePadding: false, label: 'Location' },
    { id: 'aorLink', numeric: false, disablePadding: false, label: 'AOR Link' },
    { id: 'ref', numeric: false, disablePadding: false, label: 'Ref' },
];

export function numbersStruct(item) {
    const location = item.metadata.geoInfo.city + ', '
      + item.metadata.geoInfo.country

    return {
        c1: item.metadata.ref,
        c2: JSON.stringify(item),
        c3: item.spec.location.telUrl,
        c4: location,
        c5: item.spec.location.aorLink
    };
}

export const columnDataLocation = [
    { id: 'addressOfRecord', numeric: false, disablePadding: true, label: 'Address Of Record' },
    { id: 'contactInfo', numeric: false, disablePadding: false, label: 'Contact Information' }
];

export function locationStruct(item) {
    return {
        c1: item.addressOfRecord,
        c2: item.contactInfo
    };
}

export const columnDataRegistration = [
    { id: 'host', numeric: false, disablePadding: false, label: 'Host' },
    { id: 'username', numeric: false, disablePadding: true, label: 'Username' },
    { id: 'ipAddress', numeric: false, disablePadding: false, label: 'IP' },
    { id: 'registered', numeric: false, disablePadding: false, label: 'Registered' }
];

export function registrationStruct(item) {
    console.log('item:' + JSON.stringify(item))
    return {
        c1: item.user,
        c2: item.host,
        c3: item.ip,
        c4: item.regOnFormatted,
    };
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
