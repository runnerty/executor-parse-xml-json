'use strict';

const xml2js = require('xml2js');
const fs = require('fs');

const Executor = require('@runnerty/module-core').Executor;

class parseXmlJsonExecutor extends Executor {
  constructor(process) {
    super(process);
    this.endOptions = { end: 'end' };
  }

  async parseToJson(xml) {
    try {
      const parser = new xml2js.Parser(this.params.json_options);
      const result = await parser.parseStringPromise(xml);
      return JSON.stringify(result);
    } catch (err) {
      throw err;
    }
  }

  parseToXml(json) {
    try {
      const builder = new xml2js.Builder(this.params.xml_options);
      const result = builder.buildObject(JSON.parse(json));
      return result;
    } catch (err) {
      throw err;
    }
  }

  async evaluateResults(results) {
    try {
      await fs.promises.writeFile(this.params.output_file, results, 'utf8');
      this.endOptions.data_output = results;
      this.end(this.endOptions);
    } catch (err) {
      throw err;
    }
  }

  async exec(params) {
    this.params = params;

    if (this.params.to === 'json') {
      try {
        if (!this.params.xml && !this.params.xml_file) {
          throw new Error(
            `Parsing to ${this.params.to}, this.params xml: ${this.params.xml} or xml_file: ${this.params.xml_file} not set correctly`
          );
        }
        let xml = this.params.xml || '';
        if (this.params.xml_file) xml = await fs.promises.readFile(this.params.xml_file);
        const results = await this.parseToJson(xml);
        await this.evaluateResults(results);
      } catch (err) {
        this.endOptions.end = 'error';
        this.endOptions.messageLog = err;
        this.endOptions.err_output = err;
        this.end(this.endOptions);
      }
    } else if (this.params.to === 'xml') {
      try {
        if (!this.params.json && !this.params.json_file) {
          throw new Error(
            `Parsing to ${params.to}, params json: ${params.json} or json_file: ${params.json_file} not set correctly`
          );
        }
        let json = this.params.json || '';
        if (this.params.json_file) json = await fs.promises.readFile(this.params.json_file);
        const results = this.parseToXml(json);
        await this.evaluateResults(results);
      } catch (err) {
        this.endOptions.end = 'error';
        this.endOptions.messageLog = err;
        this.endOptions.err_output = err;
        this.end(this.endOptions);
      }
    } else {
      this.endOptions.end = 'error';
      this.endOptions.messageLog = `param 'to': ${this.params.to} not set correctly use to json/xml`;
      this.endOptions.err_output = `param 'to': ${this.params.to} not set correctly use to json/xml`;
      this.end(this.endOptions);
    }
  }
}

module.exports = parseXmlJsonExecutor;
