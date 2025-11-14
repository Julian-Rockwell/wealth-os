// Script to update all transaction dates in sampleData.ts
// Run with: node scripts/updateSampleDataDates.js

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/utils/sampleData.ts');

console.log('Reading sampleData.ts...');
let content = fs.readFileSync(filePath, 'utf-8');

console.log('Updating dates...');
// Update dates in reverse order to avoid double replacements
// 2025-10-XX -> 2025-11-XX
content = content.replace(/2025-10-/g, '2025-11-');
// 2025-09-XX -> 2025-10-XX  
content = content.replace(/2025-09-/g, '2025-10-');
// 2025-08-XX -> 2025-09-XX
content = content.replace(/2025-08-/g, '2025-09-');

console.log('Updating transaction IDs...');
// Reynolds family (t_)
content = content.replace(/t_202510/g, 't_202511');
content = content.replace(/t_202509/g, 't_202510');
content = content.replace(/t_202508/g, 't_202509');

// Johnson family (tj_)
content = content.replace(/tj_202510/g, 'tj_202511');
content = content.replace(/tj_202509/g, 'tj_202510');
content = content.replace(/tj_202508/g, 'tj_202509');

// Austin family (ta_)
content = content.replace(/ta_202510/g, 'ta_202511');
content = content.replace(/ta_202509/g, 'ta_202510');
content = content.replace(/ta_202508/g, 'ta_202509');

// Phoenix family (tp_)
content = content.replace(/tp_202510/g, 'tp_202511');
content = content.replace(/tp_202509/g, 'tp_202510');
content = content.replace(/tp_202508/g, 'tp_202509');

console.log('Writing updated file...');
fs.writeFileSync(filePath, content, 'utf-8');

console.log('✅ Successfully updated all dates in sampleData.ts!');
console.log('   - 2025-08-XX → 2025-09-XX');
console.log('   - 2025-09-XX → 2025-10-XX');
console.log('   - 2025-10-XX → 2025-11-XX');
console.log('   - Transaction IDs updated for all 4 families');
