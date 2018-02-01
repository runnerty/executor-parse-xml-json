"use strict";

const xml2js = require("xml2js");
const fs = require('fs');

const Execution = global.ExecutionClass;

class parseXmlJsonExecutor extends Execution {
  constructor(process) {
    super(process);
  }

  exec(params) {
    let _this = this;
    let endOptions = {end: 'end'};

    function parseToJson(xml) {
      return new Promise(async function (resolve, reject) {
        let parser = new xml2js.Parser();
        parser.parseString(xml, function(err, result) {
          resolve(result);
        });
      });
    }

    function parseToXml(json) {
      return new Promise(async function (resolve, reject) {
        let builder = new xml2js.Builder();
        let result = builder.buildObject(json);
        resolve(result);
      });
    }

    function evaluateResults(results) {
      if (params.to === "json") {
        endOptions.data_output = JSON.stringify(results);
        _this.end(endOptions);

      } else if (params.to === "xml") {
        endOptions.data_output = results;
        _this.end(endOptions);
      }
    }

    if (params.to === 'json') {
      let xml = '';
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
          endOptions.err_output = `parseToJson: ${err}`;
          _this.end(endOptions);
        });
    } else if (params.to === 'xml') {
      let json = '';
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
          endOptions.err_output = `parseToXml: ${err}`;
          _this.end(endOptions);
        });
    }
  }
}

module.exports = parseXmlJsonExecutor;