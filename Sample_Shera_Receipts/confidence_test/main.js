// main.js
const fs = require('fs');
const data = require('./ocr-result.json');

const pages = data.analyzeResult.pages || [];
let confidences = [];

for (const page of pages) {
  if (page.words) {
    for (const w of page.words) {
      if (w.confidence !== undefined) {
        confidences.push([w.confidence, w.content]);
      }
    }
  }
}

const nums = confidences.map(c => c[0]);
const sum = nums.reduce((a, b) => a + b, 0);
const avg = nums.length > 0 ? sum / nums.length : 0;

const listString = confidences
  .map(c => `[ ${c[0]}, "${c[1]}" ]`)
  .join(",\n    ");

const finalString = `{
  "confidence_avg": ${avg},
  "confidence_list": [
    ${listString}
  ]
}`;

fs.writeFileSync('confidence.json', finalString, 'utf8');
