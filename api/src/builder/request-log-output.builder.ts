import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

export class RequestLogOutputBuilder {
  private requestUrl: string = '';
  private requestMethod: string = '';
  private requestParams: ParamsDictionary = {};
  private requestQuery: ParsedQs = {};
  private requestBody: any = '';

  setRequestUrl(requestUrl: string): this {
    this.requestUrl = requestUrl;
    return this;
  }
  
  setRequestMethod(requestMethod: string): this {
    this.requestMethod = requestMethod;
    return this;
  }

  setRequestParams(requestParams: ParamsDictionary): this {
    this.requestParams = requestParams;
    return this;
  }

  setRequestQuery(requestQuery: ParsedQs): this {
    this.requestQuery = requestQuery;
    return this;
  }

  setRequestBody(requestBody: any): this {
    this.requestBody = requestBody;
    return this;
  }

  build(): string {
    return `Request -> 
      URL: ${this.requestUrl} 
      Method: ${this.requestMethod} 
      Params: ${JSON.stringify(this.requestParams)} 
      Query: ${JSON.stringify(this.requestQuery)} 
      Body: ${JSON.stringify(this.requestBody)}
    `;
  }
}