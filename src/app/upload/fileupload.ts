export class FileUpload {
 
    $key: string;
    name: string;
    url: string;
    file: File;
    chantier: string;
 
    constructor(file: File) {
        this.file = file;
    }
}
