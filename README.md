# XML/JSON Parser executor for [Runnerty]:

### Configuration sample:
```json
{
  "id": "parse-xml-json_default",
  "type": "runnerty-executor-parse-xml-json"
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
