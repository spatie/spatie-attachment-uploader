
[<img src="https://github-ads.s3.eu-central-1.amazonaws.com/support-ukraine.svg?t=1" />](https://supportukrainenow.org)

# spatie-attachment-uploader

[![Latest Version on NPM](https://img.shields.io/npm/v/@spatie/attachment-uploader.svg?style=flat-square)](https://www.npmjs.com/package/@spatie/attachment-uploader)
[![Software License](https://img.shields.io/badge/license-MIT-brightgreen.svg?style=flat-square)](LICENSE.md)

```js
import attachmentUploader from 'spatie-attachment-uploader';

attachmentUploader.init();
```

```html
<div
    class="js-attachment-uploader"
    data-name="attachments"
    data-url="{{ action('MyController@uploadAttachment') }}"
    data-multiple
></div>
```

Available options:

- `name`
- `url`
- `multiple`
- `max-files`
- `max-filesize`
- `parallel-uploads`

Spatie is a webdesign agency based in Antwerp, Belgium. You'll find an overview of all our open source projects [on our website](https://spatie.be/opensource).

## Support us

[<img src="https://github-ads.s3.eu-central-1.amazonaws.com/spatie-attachment-uploader.jpg?t=1" width="419px" />](https://spatie.be/github-ad-click/spatie-attachment-uploader)

We invest a lot of resources into creating [best in class open source packages](https://spatie.be/open-source). You can support us by [buying one of our paid products](https://spatie.be/open-source/support-us).

We highly appreciate you sending us a postcard from your hometown, mentioning which of our package(s) you are using. You'll find our address on [our contact page](https://spatie.be/about-us). We publish all received postcards on [our virtual postcard wall](https://spatie.be/open-source/postcards).

## Install

This package is custom built for [Spatie](https://spatie.be) projects and is therefore not registered on npm.
In order to install it via npm you have to go through out registry:

```bash
npm set registry https://npm.spatie.be
npm set ca null
```

Or you can require the package straight from Github:

```bash
npm install spatie-custom/spatie-attachment-uploader
```

## Usage

```js
import attachmentUploader from 'spatie-attachment-uploader';

attachmentUploader.init();
```

```html
<div
    class="js-attachment-uploader"
    data-name="attachments"
    data-url="{{ action('MyController@uploadAttachment') }}"
    data-multiple
></div>
```

If you want to manually register uploader, you can use the `createUploader` function:

```js
import { createUploader } from 'spatie-attachment-uploader';

createUploader(element, options);
```

### Options

Options get passed down to Dropzone. Their [docs](http://www.dropzonejs.com/#configuration) have a full reference.

### Server setup

```php
public function uploadAttachment()
{
    try {

        // Get your `$model`...

        $file = request()->file('file');

        if (!$model) throw new Exception('No model in session');
        if (!$file) throw new Exception('No file in the request');

        $media = $model->addMedia($file)->toCollection('attachments');

        return response()->json(['id' => $media->id], Response::HTTP_OK);

    } catch (Exception $e) {
        return response(null, Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}
```

When handling the form response, remember to remove the deleted media that was previously uploaded:

```php
$attachments = collect($request->get('attachments'));

$model->getMedia('attachments')->reject(function (Media $media) use ($attachments) {
    return $attachments->contains($media->id);
})->each(function (Media $media) {
    $media->delete();
});
```

## Change log

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Testing

``` bash
$ npm run test
```

## Contributing

Please see [CONTRIBUTING](https://github.com/spatie/.github/blob/main/CONTRIBUTING.md) for details.

## Security

If you discover any security related issues, please contact [Sebastian De Deyne](https://github.com/sebastiandedeyne) instead of using the issue tracker.

## Credits

- [Sebastian De Deyne](https://github.com/sebastiandedeyne)
- [All Contributors](../../contributors)

## About Spatie
Spatie is a webdesign agency based in Antwerp, Belgium. You'll find an overview of all our open source projects [on our website](https://spatie.be/opensource).

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
