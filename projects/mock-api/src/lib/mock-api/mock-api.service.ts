import { Injectable } from '@angular/core';
import { compact, fromPairs } from 'lodash-es';
import { MockApiHandler } from './mock-api.request-handler';
import { MockApiMethods } from './mock-api.types';

@Injectable({
    providedIn: 'root'
})
export class MockApiService {
    private _handlers: { [key: string]: Map<string, MockApiHandler> } = {
        'delete': new Map<string, MockApiHandler>(),
        'get': new Map<string, MockApiHandler>(),
        'patch': new Map<string, MockApiHandler>(),
        'post': new Map<string, MockApiHandler>(),
        'put': new Map<string, MockApiHandler>()
    };

    constructor() {
    }

    /**
     * Find the handler from the service
     * with the given method and url
     *
     * @param method
     * @param url
     */
    findHandler(method: string, url: string): { handler: MockApiHandler | undefined; urlParams: { [key: string]: string } } {
        // Prepare the return object
        const matchingHandler: { handler: MockApiHandler | undefined; urlParams: { [key: string]: string } } = {
            handler: undefined,
            urlParams: {}
        };

        // Split the url
        const urlParts = url.split('/');

        // Get all related request handlers
        const handlers = this._handlers[method.toLowerCase()];

        // Iterate through the handlers
        handlers.forEach((handler, handlerUrl) => {

            // Skip if there is already a matching handler
            if (matchingHandler.handler) {
                return;
            }

            // Split the handler url
            const handlerUrlParts = handlerUrl.split('/');

            // Skip if the lengths of the urls we are comparing are not the same
            if (urlParts.length !== handlerUrlParts.length) {
                return;
            }

            // Compare
            const matches = handlerUrlParts.every((handlerUrlPart, index) => handlerUrlPart === urlParts[index] || handlerUrlPart.startsWith(':'));

            // If there is a match...
            if (matches) {
                // Assign the matching handler
                matchingHandler.handler = handler;

                // Extract and assign the parameters
                matchingHandler.urlParams = fromPairs(compact(handlerUrlParts.map((handlerUrlPart, index) =>
                    handlerUrlPart.startsWith(':') ? [handlerUrlPart.substring(1), urlParts[index]] : undefined
                )));
            }
        });

        return matchingHandler;
    }

    /**
     * Register a DELETE request handler
     *
     * @param url - URL address of the mocked API endpoint
     * @param delay - Delay of the response in milliseconds
     */
    onDelete(url: string, delay?: number): MockApiHandler {
        return this._registerHandler('delete', url, delay);
    }

    /**
     * Register a GET request handler
     *
     * @param url - URL address of the mocked API endpoint
     * @param delay - Delay of the response in milliseconds
     */
    onGet(url: string, delay?: number): MockApiHandler {
        return this._registerHandler('get', url, delay);
    }

    /**
     * Register a PATCH request handler
     *
     * @param url - URL address of the mocked API endpoint
     * @param delay - Delay of the response in milliseconds
     */
    onPatch(url: string, delay?: number): MockApiHandler {
        return this._registerHandler('patch', url, delay);
    }

    /**
     * Register a POST request handler
     *
     * @param url - URL address of the mocked API endpoint
     * @param delay - Delay of the response in milliseconds
     */
    onPost(url: string, delay?: number): MockApiHandler {
        return this._registerHandler('post', url, delay);
    }

    /**
     * Register a PUT request handler
     *
     * @param url - URL address of the mocked API endpoint
     * @param delay - Delay of the response in milliseconds
     */
    onPut(url: string, delay?: number): MockApiHandler {
        return this._registerHandler('put', url, delay);
    }

    /**
     * Register and return a new instance of the handler
     *
     * @param method
     * @param url
     * @param delay
     * @private
     */
    private _registerHandler(method: MockApiMethods, url: string, delay?: number): MockApiHandler {
        // Create a new instance of FuseMockApiRequestHandler
        const fuseMockHttp = new MockApiHandler(url, delay);

        // Store the handler to access it from the interceptor
        this._handlers[method].set(url, fuseMockHttp);

        return fuseMockHttp;
    }
}
