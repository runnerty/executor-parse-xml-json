"use strict";

var xml2js = require("xml2js");
var fs = require('fs');
var Execution = global.ExecutionClass;

class parseXmlJsonExecutor extends Execution {
  constructor(process) {
    super(process);
  }

  exec(params) {
    var _this = this;
    var endOptions = {end: 'end'};

    function parseToJson(xml) {
      return new Promise(async function (resolve, reject) {
        xml2js.parseString(xml, function (err, result) {
          resolve(result);
        });
      });
    }

    function parseToXml(json) {
      return new Promise(async function (resolve, reject) {
        var builder = new xml2js.Builder();
        var result = builder.buildObject(json);
        resolve(result);
      });
    }

    function evaluateResults(results) {
      if (params.to === "json") {
        endOptions.execute_return = JSON.stringify(results);
        _this.end(endOptions);

      } else if (params.to === "xml") {
        endOptions.execute_return = results;
        _this.end(endOptions);
      }
    }

    if (params.to === 'json') {
      var xml = '';
      if (params.xml) {
        xml = params.xml;
      } else if (params.xml_file) {
        xml = fs.readFileSync(params.xml_file);
      }
      parseToJson(xml)
        .then((results) => {
          evaluateResults(results);
        })
        .catch(function (err) {
          endOptions.end = 'error';
          endOptions.messageLog = `parseToJson: ${err}`;
          endOptions.execute_err_return = `parseToJson: ${err}`;
          _this.end(endOptions);
        });
    } else if (params.to === 'xml') {
      var json = '';
      if (params.json) {
        json = params.json;
      } else if (params.json_file) {
        json = JSON.parse(fs.readFileSync(params.json_file));
      }
      parseToXml(json)
        .then((results) => {
          evaluateResults(results);
        })
        .catch(function (err) {
          endOptions.end = 'error';
          endOptions.messageLog = `parseToXml: ${err}`;
          endOptions.execute_err_return = `parseToXml: ${err}`;
          _this.end(endOptions);
        });
    }
  }
}

module.exports = parseXmlJsonExecutor;