
import { TBufferedTransport, TJSONProtocol, XHRConnection, createXHRConnection, createXHRClient } from 'thrift';
import { AuthService, DocumentPatternService, DocumentService, UserManagementService } from './data';
import { AUTH_SERVICE_PATH_JSON, DOCUMENT_PATTERN_SERVICE_PATH_JSON, DOCUMENT_SERVICE_PATH_JSON, USER_SERVICE_PATH_JSON } from './data/constants';
import { QueryClient } from '@tanstack/react-query';

let AuthServiceClient: AuthService.Client;
let DocumentServiceClient: DocumentService.Client;
let UserManagementServiceClient: UserManagementService.Client;
let DocumentPatternServiceClient: DocumentPatternService.Client;

// Create a client
const queryClient = new QueryClient();

const initClient = (url: string, port: number, https: boolean, path: string) => {

  const createConnection = (clientJson: string): XHRConnection => createXHRConnection(url, port, {
    transport: TBufferedTransport,
    protocol: TJSONProtocol,
    https: https,
    path: `/${path}/thrift/${clientJson}`,
    headers: {}
  });


  DocumentServiceClient = createXHRClient(DocumentService.Client, createConnection(DOCUMENT_SERVICE_PATH_JSON));
  DocumentPatternServiceClient = createXHRClient(DocumentPatternService.Client, createConnection(DOCUMENT_PATTERN_SERVICE_PATH_JSON));
  AuthServiceClient = createXHRClient(AuthService.Client, createConnection(AUTH_SERVICE_PATH_JSON));
  UserManagementServiceClient =  createXHRClient(UserManagementService.Client, createConnection(USER_SERVICE_PATH_JSON));
};

export {
  initClient,
  AuthServiceClient,
  DocumentServiceClient,
  DocumentPatternServiceClient,
  UserManagementServiceClient,
  queryClient
};