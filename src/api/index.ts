
import { TBufferedTransport, TJSONProtocol, XHRConnection, createXHRConnection, createXHRClient } from 'thrift';
import { AuthService, CalendarService, DepartmentService, DocumentPatternService, DocumentService, FilledDocumentPatternService, HandBookService, SecurityClassificationService, UserManagementService } from './data';
import { AUTH_SERVICE_PATH_JSON, CALENDAR_SERVICE_PATH_JSON, DEPARTMENT_SERVICE_PATH_JSON, DOCUMENT_PATTERN_SERVICE_PATH_JSON, DOCUMENT_SERVICE_PATH_JSON, FILLED_DOCUMENT_PATTERN_SERVICE_PATH_JSON, HANDBOOK_SERVICE_PATH_JSON, SECURITY_CLASSIFICATION_SERVICE_PATH_JSON, USER_SERVICE_PATH_JSON } from './data/constants';
import { QueryClient } from '@tanstack/react-query';

let AuthServiceClient: AuthService.Client;
let DocumentServiceClient: DocumentService.Client;
let UserManagementServiceClient: UserManagementService.Client;
let DocumentPatternServiceClient: DocumentPatternService.Client;
let DepartmentServiceClient: DepartmentService.Client;
let HandBookServiceClient: HandBookService.Client;
let SecurityClassificationServiceClient: SecurityClassificationService.Client;
let CalendarServiceClient: CalendarService.Client;
let FilledDocumentPatternServiceClient: FilledDocumentPatternService.Client;

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
  UserManagementServiceClient = createXHRClient(UserManagementService.Client, createConnection(USER_SERVICE_PATH_JSON));
  DepartmentServiceClient = createXHRClient(DepartmentService.Client, createConnection(DEPARTMENT_SERVICE_PATH_JSON));
  HandBookServiceClient = createXHRClient(HandBookService.Client, createConnection(HANDBOOK_SERVICE_PATH_JSON));
  SecurityClassificationServiceClient = createXHRClient(SecurityClassificationService.Client, createConnection(SECURITY_CLASSIFICATION_SERVICE_PATH_JSON));
  CalendarServiceClient = createXHRClient(CalendarService.Client, createConnection(CALENDAR_SERVICE_PATH_JSON));
  //@ts-ignore
  FilledDocumentPatternServiceClient = createXHRClient(FilledDocumentPatternService.Client, createConnection(FILLED_DOCUMENT_PATTERN_SERVICE_PATH_JSON));
};

export {
  initClient,
  AuthServiceClient,
  DocumentServiceClient,
  DocumentPatternServiceClient,
  UserManagementServiceClient,
  DepartmentServiceClient,
  HandBookServiceClient,
  SecurityClassificationServiceClient,
  CalendarServiceClient,
  FilledDocumentPatternServiceClient,
  queryClient
};