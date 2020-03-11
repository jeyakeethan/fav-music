import {Injectable} from '@angular/core';

export interface Message {
    name: string;
    isFile: boolean;
    isDirectory: boolean;
    fullPath: string;
    filesystem: string;
    nativeURL: string;
}

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor() {
    }

}
