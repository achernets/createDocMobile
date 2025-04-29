import * as fs from 'fs';
import * as path from 'path';

function processFile(filePath: string) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // 1. Замінюємо типи Int64 -> number
  content = content.replace(/\bInt64\b/g, 'number');

  // 2. Замінюємо виклики .readI64() -> .readI64().toNumber()
  content = content.replace(
    /(\w+)\.readI64\(\)/g,
    '($1.readI64() as any).toNumber()'
  );

  // 3. Прибираємо імпорт Int64, якщо він більше не використовується
  content = content.replace(
    /import\s+\{\s*Int64\s*\}\s+from\s+["']int64-buffer["'];?\n?/,
    ''
  );

  fs.writeFileSync(filePath, content, 'utf-8');
}

function processDirectory(dirPath: string) {
  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (file.endsWith('.ts')) {
      processFile(fullPath);
    }
  }
}

// 🔧 Використання:
const generatedPath = path.resolve('./data'); // або ./gen-ts
processDirectory(generatedPath);
console.log('✅ i64 patched to number in Thrift files');