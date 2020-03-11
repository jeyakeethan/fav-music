import {Component} from '@angular/core';
import {DataService, Message} from '../services/data.service';
import {File} from '@ionic-native/file/ngx';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    private folders = [{
        isFile: false,
        isDirectory: true,
        name: 'name of the directory',
        fullPath: '/nameof the folder',
        filesystem: '<FileSystem:sdcard>',
        nativeURL: 'file:///storage/emulated0/Download'
    }, {
        isFile: true,
        isDirectory: false,
        name: 'name of the file',
        fullPath: '/Download/sample.pdf',
        filesystem: '<FileSystem:sdcard>',
        nativeURL: 'file:///storage/emulated0/Download/sample.pdf'
    }, {
        isFile: false,
        isDirectory: true,
        name: 'name of the directory',
        fullPath: '/nameof the folder',
        filesystem: '<FileSystem:sdcard>',
        nativeURL: 'file:///storage/emulated0/Download'
    }, {
        isFile: true,
        isDirectory: false,
        name: 'name of the file',
        fullPath: '/Download/sample.pdf',
        filesystem: '<FileSystem:sdcard>',
        nativeURL: 'file:///storage/emulated0/Download/sample.pdf'
    }, {    // and so on
    }];

    constructor(private data: DataService,
                private internalSD: any, // File,
    ) {
    }

    listDir = async (path, dirName) => {
        this.folders = await this.listDirHelper(path, dirName);
        console.log('Folders who have mp3 files', this.folders);
    }

    listDirHelper = async (path, dirName) => {
        const currentFolder = {
            path,
            dirName,
            children: []
        };

        return await this.internalSD
            .listDir(path, dirName)
            .then(async entries => {
                let containsMP3 = false;

                for (const entry of entries) {
                    if (entry.isDirectory === false) {
                        const isMP3 = entry.fullPath.lastIndexOf('.mp3');
                        if (!(isMP3 !== -1 && isMP3 + 4 === entry.fullPath.length)) {
                            continue;
                        }
                        containsMP3 = true;
                    } else {
                        const subDir = await this.listDirHelper(entry.nativeURL, entry.name);
                        if (subDir !== false) {
                            currentFolder.children.push(subDir);
                        }
                    }
                }

                if (currentFolder.children.length === 0 && containsMP3 === false) {
                    return false;
                }

                return currentFolder;
            })
            .catch((err) => {
                console.log('error in listing directory', err);
            });
    }

    refresh(ev) {
        setTimeout(() => {
            ev.detail.complete();
        }, 3000);
    }

}
