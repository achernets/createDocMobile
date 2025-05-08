/* eslint-disable no-console */
import https from 'https';
import fs from 'fs';
import { generate } from '@creditkarma/thrift-typescript'
import { readdirSync } from 'fs'
import replace from 'replace-in-file';

const initFile = 'Kaz_api.thrift';
const host = 'https://total.almexecm.com:10443';
const coreUrl = '/kaz-server-dev1/';
const dir = 'Thrift/';
const saveUrl = `${dir}files/`;

const download = (url, name) => {
  return new Promise(function (resolve, reject) {
    https.get(`${host}${url}${name}?t=${new Date().getTime()}`, function (response) {
      if (response.statusCode !== 200) {
        reject();
      } else {
        const file = fs.createWriteStream(`${saveUrl}${name}`);
        response.pipe(file);
        file.on('finish', function () {
          resolve('ok');
        });
      }
    }).on('error', function (err) {
      reject(err);
    });
  });
};

const generateThriftFiles = async () => {
  await download(coreUrl, initFile);
  const files_api = fs.readFileSync(`${saveUrl}${initFile}`);
  const urls = {
    core: {
      url: coreUrl,
      modules: files_api.toString().match(/"(\w*\s+'|:?)(.*?).thrift"/g).map(item => item.replace(/"/g, ''))
    }
  };

  const arrayUrls = Object.keys(urls).reduce((array, key) => {
    urls[key].modules.map(item => {
      array.push({
        url: urls[key].url,
        name: item
      });
      return item;
    });
    return array;
  }, []);

  const Logs = [];
  await (Promise.all(arrayUrls.map(async (item) => {
    try {
      await download(item.url, item.name);
      Logs.push({
        name: item.name,
        type: 'success'
      });
    } catch (error) {
      Logs.push({
        name: item.name,
        type: 'error'
      });
    }
  })));

  let files = readdirSync('Thrift/files/').filter(file => file.match(/.*\.(thrift?)/ig));

  await (replace({
    files: `${saveUrl}*.thrift`,
    ignore: [
      `${saveUrl}Kaz_NotificationService.thrift`
    ],
    from: new RegExp('\\bDocument\\b', 'gm'),
    to: 'ADocument'
  }));

  await (replace({
    files: `${saveUrl}*.thrift`,
    ignore: [
      `${saveUrl}Kaz_NotificationService.thrift`
    ],
    from: new RegExp('\\/\\** ADocument\\b', 'gm'),
    to: '/** Document'
  }));
  
  await (replace({
    files: `${saveUrl}*.thrift`,
    from: /\/\*\* \*\//g,
    to: '/** без описания */'
  }));

  await (replace({
    files: `${saveUrl}*.thrift`,
    from: /com.devtech.kaz.thrift.gen/g,
    to: 'core'
  }));

  generate({
    rootDir: '.',
    sourceDir: 'Thrift/files/',
    outDir: 'src/api/data',
    target: 'apache',
    files: files,
    fallbackNamespace: 'none'
  })

  await (replace({
    files: [`src/api/data/*.ts`],
    from: /import Int64 = require\("node-int64"\);/g,
    to: 'import { Int64 } from "thrift";'
  }));

  await (replace({
    files: [`src/api/data/kazDate.ts`, `src/api/data/count.ts`],
    from: /import \* as thrift from "thrift";/g,
    to: ''
  }));

  Logs.filter(item => item.type === 'error').map(item => console.log('\x1b[31m', 'File error', `"${item.name}"`, '\x1b[0m'));
};

generateThriftFiles();

