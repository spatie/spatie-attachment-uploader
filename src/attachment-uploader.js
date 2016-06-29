import { component } from 'dom-component-parser';
import Dropzone from 'dropzone';
import { getIconForFile } from './helpers';
import { translate } from './translations';

const init = () => {

    return component('attachment-uploader', {

        url: 'required',
        name: 'required',
        multiple: false,
        maxFiles: 10,
        maxFilesize: 10,
        parallelUploads: 10,

    }).map(({ node, options }) => createUploader(node, options));
};

export const createUploader = (node, options) => {

    node.innerHTML = `
        <div class="fallback">
            <input type="file" name="${options.name}">
        </div>
        <div class="dz-message" data-dz-message>
            <span>${translate('add')}</span>
        </div>
    `;

    const dropzone = new Dropzone(node, {

        url: options.url,
        uploadMultiple: options.multiple,
        maxFiles: options.maxFiles,
        maxFilesize: options.maxFilesize,
        parallelUploads: options.parallelUploads,

        dictResponseError: translate('error'),
        dictFileTooBig: translate('tooBig', { size: options.maxFilesize }),
    });

    dropzone.on('addedfile', function (file) {

        const previewImage = file.previewElement.getElementsByClassName('dz-image')[0];

        if (!previewImage) return;

        previewImage.innerHTML = `
            <span class="dz-file-thumb">
                <i class="icon-${getIconForFile(file.name)}" aria-hidden="true"></i>
            </span>
        `;

        file.previewElement.appendChild(Dropzone.createElement(`
            <span class="dz-remove"><i class="icon-cancel"></i></span>
        `).addEventListener('click', e => {
            e.preventDefault();
            dropzone.removeFile(file);
        }));
    });

    return dropzone;
};

export default init;
