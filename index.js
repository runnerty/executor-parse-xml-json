'use strict';

const xml2js = require('xml2js');
const fs = require('fs');

const Executor = require('@runnerty/module-core').Executor;

class parseXmlJsonExecutor extends Executor {
  constructor(process) {
    super(process);
  }

  async exec(params) {
    const endOptions = { end: 'end' };

    async function parseToJson(xml) {
      try {
        const parser = new xml2js.Parser(params.json_options);
        const result = await parser.parseStringPromise(xml);
        return JSON.stringify(result);
      } catch (err) {
        throw err;
      }
    }

    function parseToXml(json) {
      try {
        const builder = new xml2js.Builder(params.xml_options);
        const result = builder.buildObject(JSON.parse(json));
        return result;
      } catch (err) {
        throw err;
      }
    }

    async function evaluateResults(results) {
      try {
        await fs.promises.writeFile(params.output_file, results, 'utf8');
        endOptions.data_output = results;
        this.end(endOptions);
      } catch (err) {
        throw err;
      }
    }

    // MAIN:
    if (params.to === 'json') {
      try {
        if (!params.xml && !params.xml_file) {
          throw new Error(
            `Parsing to ${params.to}, params xml: ${params.xml} or xml_file: ${params.xml_file} not set correctly`
          );
        }
        let xml = params.xml || '';
        if (params.xml_file) xml = await fs.promises.readFile(params.xml_file);
        const results = await parseToJson(xml);
        await evaluateResults(results);
      } catch (err) {
        endOptions.end = 'error';
        endOptions.messageLog = err;
        endOptions.err_output = err;
        this.end(endOptions);
      }
    } else if (params.to === 'xml') {
      try {
        if (!params.json && !params.json) {
          throw new Error(
            `Parsing to ${params.to}, params json: ${params.xml} or json_file: ${params.xml_file} not set correctly`
          );
        }
        let json = params.json || '';
        if (params.json_file) json = await fs.promises.readFile(params.json_file);
        const results = parseToXml(json);
        await evaluateResults(results);
      } catch (err) {
        endOptions.end = 'error';
        endOptions.messageLog = err;
        endOptions.err_output = err;
        this.end(endOptions);
      }
    } else {
      endOptions.end = 'error';
      endOptions.messageLog = `param 'to': ${params.to} not set correctly use to json/xml`;
      endOptions.err_output = `param 'to': ${params.to} not set correctly use to json/xml`;
      this.end(endOptions);
    }
  }
}

module.exports = parseXmlJsonExecutor;
