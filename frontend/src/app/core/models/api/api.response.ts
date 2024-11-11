import { ApiException } from './api.exception';

export class ApiResponse {
  version: string = "";
  statusCode: number = 0;
  isError: boolean = false;
  responseException!: ApiException;
  result: any;
}
