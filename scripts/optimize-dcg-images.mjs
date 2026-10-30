import sharp from 'sharp';
import { readdir, stat, unlink } from 'node:fs/promises';
import { join, extname, basename } from 'node:path';
const dir='public/assets/selfhosted';
const files=(await readdir(dir)).filter(name=>extname(name).toLowerCase()==='.png').sort();
if(files.length!==12)throw new Error('Expected 12 archived AI artworks, found '+files.length);
let originals=0,optimized=0;
for(const file of files){
  const source=join(dir,file),output=join(dir,basename(file,'.png')+'.webp');
  const size=(await stat(source)).size;
  await sharp(source,{failOn:'error'}).rotate().resize({width:1680,withoutEnlargement:true,fit:'inside'}).webp({quality:81,effort:5,smartSubsample:true}).toFile(output);
  const meta=await sharp(output).metadata();
  if(meta.format!=='webp'||meta.width<650||meta.height<400)throw new Error('Invalid optimized image '+file);
  const targetSize=(await stat(output)).size;
  if(targetSize>size)throw new Error('Optimized image larger than source: '+file);
  originals+=size;optimized+=targetSize;
  await unlink(source);
  console.log(JSON.stringify({file,format:'webp',width:meta.width,height:meta.height,bytesBefore:size,bytesAfter:targetSize}));
}
console.log('OPTIMIZED',files.length,'from',(originals/1024/1024).toFixed(2),'MiB to',(optimized/1024/1024).toFixed(2),'MiB');
