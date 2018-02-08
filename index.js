"use strict";

const xml2js = require("xml2js");
const fs = require("fs");

const Execution = global.ExecutionClass;

class parseXmlJsonExecutor extends Execution {
  constructor(process) {
    super(process);
  }

  exec(params) {
    let _this = this;
    let endOptions = { end: "end" };

    function parseToJson(xml) {
      return new Promise(function (resolve, reject) {
        let parser = new xml2js.Parser(params.json_options);
        parser.parseString(xml, function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.stringify(result));
          }
        });
      });
    }

    function parseToXml(json) {
      return new Promise(function (resolve, reject) {
        let builder = new xml2js.Builder(params.xml_options);
        let result = builder.buildObject(JSON.parse(json));
        resolve(result);
      });
    }

    function evaluateResults(results) {
      return new Promise(function (resolve, reject) {
        if (params.output_file) {
          fs.writeFile(params.output_file, results, "utf8", function (err) {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        } else {
          endOptions.data_output = results;
          resolve();
        }
        _this.end(endOptions);
      });
    }

    if (params.to === "json") {
      new Promise(function (resolve, reject) {
        let xml = "";
        if (params.xml) {
          xml = params.xml;
          resolve(xml);
        } else if (params.xml_file) {
          fs.readFile(params.xml_file, function (err, result) {
            if (err) {
              reject(err);
            } else {
              xml = result;
              resolve(xml);
            }
          });
        } else {
          reject(new Error(`Parsing to ${params.to}, params xml: ${params.xml} or xml_file: ${params.xml_file} not set correctly`));
        }
      }).then(xml => {
        parseToJson(xml)
          .then(results => {
            evaluateResults(results)
              .catch(err => {
                endOptions.end = "error";
                endOptions.messageLog = `writeToOutputFileJson: ${err}`;
                endOptions.err_output = `writeToOutputFileJson: ${err}`;
                _this.end(endOptions);
              });
          })
          .catch(err => {
            endOptions.end = "error";
            endOptions.messageLog = `parseToJson: ${err}`;
            endOptions.err_output = `parseToJson: ${err}`;
            _this.end(endOptions);
          });
      }).catch(err => {
        endOptions.end = "error";
        endOptions.messageLog = `readFileToJson: ${err}`;
        endOptions.err_output = `readFileToJson: ${err}`;
        _this.end(endOptions);
      });

    } else if (params.to === "xml") {
      new Promise(function (resolve, reject) {
        let json = "";
        if (params.json) {
          json = params.json;
          resolve(json);
        } else if (params.json_file) {
          fs.readFile(params.json_file, function (err, result) {
            if (err) {
              reject(err);
            } else {
              json = result;
              resolve(json);
            }
          });
        } else {
          reject(new Error(`Parsing to ${params.to}, params json: ${params.json} or json_file: ${params.json_file} not set correctly`));
        }
      }).then(json => {
        parseToXml(json)
          .then(results => {
            evaluateResults(results)
              .catch(err => {
                endOptions.end = "error";
                endOptions.messageLog = `writeToOutputFileXml: ${err}`;
                endOptions.err_output = `writeToOutputFileXml: ${err}`;
                _this.end(endOptions);
              });
          })
          .catch(err => {
            endOptions.end = "error";
            endOptions.messageLog = `parseToXml: ${err}`;
            endOptions.err_output = `parseToXml: ${err}`;
            _this.end(endOptions);
          });
      }).catch(err => {
        endOptions.end = "error";
        endOptions.messageLog = `readFileToXml: ${err}`;
        endOptions.err_output = `readFileToXml: ${err}`;
        _this.end(endOptions);
      });
    } else {
      endOptions.end = "error";
      endOptions.messageLog = `param 'to': ${params.to} not set correctly use to json/xml`;
      endOptions.err_output = `param 'to': ${params.to} not set correctly use to json/xml`;
      _this.end(endOptions);
    }
  }
}

module.exports = parseXmlJsonExecutor;