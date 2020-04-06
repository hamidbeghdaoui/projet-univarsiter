
const TypeFilePosible = (typeFile, ImageOuFile) => {
    const arrayTypeFile =
        [
            "application/pdf",
            "application/zip",
            'application/x-zip',
            'application/x-zip-compressed',
            'application/s-compressed',
            'multipart/x-zip',
            'application/x-rar',
            'application/rar',
            'application/x-rar-compressed',
            "application/msword",
            "application/vnd.ms-excel",
            "application/vnd.ms-powerpoint",
            'text/plain',
            "image/gif",
            "image/png",
            'image/tiff',
            'image/svg+xml',
            'image/jpeg',
            'image/pjpeg',
            'image/x-icon',
            'image/x-ico',
            'image/x-png',
            'application/json',
            "text/css",
            'text/html'
        ];

    const arrayTypeImage =
        [
            "image/gif",
            "image/png",
            'image/tiff',
            'image/jpeg',
            'image/pjpeg',
            'image/x-icon',
            'image/x-ico',
            'image/x-png'
        ];
    if (ImageOuFile === 'file') return arrayTypeFile.includes(typeFile);
    if (ImageOuFile === 'image') return arrayTypeImage.includes(typeFile);


}


export default TypeFilePosible;





