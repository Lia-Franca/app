export const environment = {
    local: true,
    production: false,
};
  
export const enum Protocol {
    http = 'http://',
    https = 'https://',
}

export const enum EntityPath {
    api = 'localhost:3000'
}

export const url = (
    protocol: Protocol,
    entityPath: EntityPath,
    restUrl?: any
  ) => `${protocol}${entityPath}${restUrl}`;