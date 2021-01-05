<p align="center">
  <a href="http://runnerty.io">
    <img height="257" src="https://runnerty.io/assets/header/logo-stroked.png">
  </a>
  <p align="center">A new way for processes managing</p>
</p>

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Dependency Status][david-badge]][david-badge-url] 
<a href="#badge">
  <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg">
</a>

# XML/JSON Parser executor for [Runnerty]:

### Installation:
Through NPM

```bash
npm i @runnerty/executor-parse-xml-json
```

You can also add modules to your project with [runnerty-cli]

```bash
npx runnerty-cli add @runnerty/executor-parse-xml-json
```

This command installs the module in your project, adds example configuration in your `config.json` and creates an example plan of use.

If you have installed [runnerty-cli] globally you can include the module with this command:

```bash
rty add @runnerty/executor-parse-xml-json
```

### Configuration sample:
```json
{
  "id": "parse-xml-json_default",
  "type": "@runnerty-executor-parse-xml-json"
}
```

### Plan sample:
```json
{
  "id":"parse-xml-json_default",
  "to": "xml",
  "json": {
    "title": "Hello world",
    "description": "Example for XML/JSON parser executor"
  }
}
```

```json
{
  "id":"parse-xml-json_default",
  "to": "json",
  "xml": "<?xml version='1.0' encoding='UTF-8' standalone='yes'?><root><title>Hello world</title><description>Example for XML/JSON parser executor</description></root>"
}
```

### Plan sample using input files:
```json
{
  "id":"parse-xml-json_default",
  "to": "xml",
  "json_file": "./test/sample.json"
}
```

```json
{
  "id":"parse-xml-json_default",
  "to": "json",
  "xml_file": "./test/sample.xml"
}
```

### Plan sample using output file:
```json
{
  "id": "parse-xml-json_default",
  "to": "json",
  "xml_file": "./test/sample.xml",
  "output_file": "./test/output.json"
}
```

### Plan sample using options object for json:
```json
{
  "id": "parse-xml-json_default",
  "to": "json",
  "xml_file": "./test/sample.xml",
  "output_file": "./test/output.json",
  "json_options": {
    "attrkey": "attribute",
    "charkey": "value"
  }
}
```
### Plan sample using options object for xml:
```json
{
  "id": "parse-xml-json_default",
  "to": "xml",
  "json_file": "./test/sample.json",
  "output_file": "./test/output.xml",
  "xml_options": {
    "headless": true,
    "cdata": true
  }
}
```
Options definitions for `json_options` and `xml_options` params can be found here:
- [json_options]
- [xml_options]

[json_options]: https://github.com/Leonidas-from-XIV/node-xml2js#options
[xml_options]: https://github.com/Leonidas-from-XIV/node-xml2js#options-for-the-builder-class
[Runnerty]: http://www.runnerty.io
[downloads-image]: https://img.shields.io/npm/dm/@runnerty/executor-parse-xml-json.svg
[npm-url]: https://www.npmjs.com/package/@runnerty/executor-parse-xml-json
[npm-image]: https://img.shields.io/npm/v/@runnerty/executor-parse-xml-json.svg
[david-badge]: https://david-dm.org/runnerty/executor-parse-xml-json.svg
[david-badge-url]: https://david-dm.org/runnerty/executor-parse-xml-json
[config.json]: http://docs.runnerty.io/config/
[plan.json]: http://docs.runnerty.io/plan/
