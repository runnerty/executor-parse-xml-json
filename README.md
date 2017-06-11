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

### Plan sample (with files):
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


[Runnerty]: http://www.runnerty.io