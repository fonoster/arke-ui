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
        c4: item.spec.credentials.username,
        c5: item.spec.host,
        c6: item.spec.transport
    };
}

export const columnDataNumbers = [
    { id: 'number', numeric: false, disablePadding: true, label: 'Number' },
    { id: 'username', numeric: false, disablePadding: false, label: 'Username' },
    { id: 'ref', numeric: false, disablePadding: false, label: 'Ref' },
];

export function numbersStruct(item) {
    return {
        c1: item.metadata.ref,
        c2: JSON.stringify(item),
        c3: item.metadata.name,
        c4: item.spec.credentials.username
    };
}

export function getColumnData(resource) {
    switch (resource) {
      case 'domains':
        return columnDataDomains
        break;
      case 'agents':
          return columnDataAgents
          break;
      case 'peers':
          return columnDataPeers
          break;
      case 'gateways':
          return columnDataGateways
          break;
      case 'numbers':
          return columnDataNumbers
          break;
      default:
        return columnDataDomains
    }
}

export function createData(item, resource) {
    switch (resource) {
      case 'domains':
          return domainsStruct(item)
          break;
      case 'agents':
          return agentsStruct(item)
          break;
      case 'peers':
          return peersStruct(item)
          break;
      case 'gateways':
          return gatewaysStruct(item)
          break;
      case 'numbers':
          return numbersStruct(item)
          break;
      default:
        return domainsStruct(item)
    }
}
