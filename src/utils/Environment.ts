export enum ENVIRONMENTS {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
  LOCAL = 'local'
}

const EnvironmentUrl = {
  [ENVIRONMENTS.PRODUCTION]: 'https://labs.kabila.app/api',
  [ENVIRONMENTS.DEVELOPMENT]: 'https://dev-labs.kabila.app/api',
  [ENVIRONMENTS.LOCAL]: 'http://127.0.0.1'
};

export function getBaseUrl(environment: ENVIRONMENTS, localPort?: string) {
  if (environment == ENVIRONMENTS.LOCAL) {
    return `${EnvironmentUrl[environment]}:${localPort}/api`;
  }
  return EnvironmentUrl[environment];
}
