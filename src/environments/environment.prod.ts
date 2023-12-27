export const environment = {
    local: false,
    production: true,
};
  
export const enum Protocol {
    http = 'http://',
    https = 'https://',
}

export const enum EntityPath {
    customers = 'localhost:3000'
}

export const url = (
    protocol: Protocol,
    entityPath: EntityPath,
    restUrl?: any
  ) => `${protocol}${entityPath}${restUrl}`;