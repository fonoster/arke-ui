import { ipv4 } from 'ip-address-utils'
import isValid from 'is-valid-path'

export function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

export function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[[]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export function getEndpoint (apiURL, resource, filter, token) {
    let endpoint = apiURL + '/' + resource

    if (filter) {
        endpoint = endpoint + '?filter=' + filter
    }

    if (token) {
        filter ? endpoint = endpoint + '&token=' + token : endpoint = endpoint + '?token=' + token
    }

    return endpoint
}

export const hasValue = field => field && field.length > 0

export const isValidIp = field => !hasValue(field) || ipv4.isValid(field)

export const isValidPort = field => !hasValue(field) || !isNaN(field)

export const isValidPath = field => !hasValue(field) || isValid(field)

export const isValidTimeout = field => !hasValue(field) || !isNaN(field)

// TODO: Considered the maximum allowed thread number
export const isValidThreadNumber = field => !hasValue(field) || !isNaN(field)

export const isValidSubnets = s => {
    if (!hasValue(s)) return true
    const subnets = s.toString().split('\n')
    return subnets.filter(subnet => ipv4.isSubnet(subnet)).length
      === subnets.length
}

export const isValidDSParameter = dsParameter => {
    if (!hasValue(dsParameter)) return true
    const parameters = dsParameter.split(',')
    return parameters.filter(parameter =>
      parameter.split('=').length === 1 ||
      parameter.split('=')[1].length === 0 ||
      !isNaN(parameter.split('=')[0])).length === 0
}
