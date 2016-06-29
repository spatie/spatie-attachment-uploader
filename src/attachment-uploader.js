import $ from 'jquery';
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

    $(node).html(`
        <div class="fallback">
            <input type="file" name="${options.name}[]">
        </div>
        <div class="dz-message" data-dz-message>
            <span>${translate('add', { size: options.maxFilesize })}</span>
        </div>
    `);

    const dropzone = new Dropzone(node, {

        url: options.url,
        uploadMultiple: options.multiple,
        maxFiles: options.maxFiles,
        maxFilesize: options.maxFilesize,
        parallelUploads: options.parallelUploads,

        dictResponseError: translate('error.generic'),
        dictFileTooBig: translate('error.tooBig', { size: options.maxFilesize }),
    });

    const $export = $('<div></div>').appendTo(node);

    dropzone.on('addedfile', file => {

        const $previewImage = $(file.previewElement).find('.dz-image');

        $previewImage.html(`
            <span class="dz-file-thumb">
                <i class="icon-${getIconForFile(file.name)}" aria-hidden="true"></i>
            </span>
        `);

        $export.append($(`<input name="${options.name}" type="hidden" value="${1}">`));

        const $removeButton = $(`
            <span class="dz-remove">
                <i class="icon-cancel"></i>
            </span>
        `).appendTo(file.previewElement);

        $removeButton.on('click', e => {
            e.preventDefault();
            dropzone.removeFile(file);
            $export.find(`[value="${1}"]`).remove();
        });
    });

    return dropzone;
};

export default init;
