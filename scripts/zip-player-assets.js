const fs = require( 'fs' );
const OSS = require('ali-oss')
const archiver = require('archiver');
const rimraf = require('rimraf');

const { version } = require('../node_modules/mudu-player/package.json');
const AssetsPath = 'mudu-player-assets';
const AssetsPrefix = `mudu-player/${version}/assets`;

const client = new OSS({
  region: process.env.OSS_REGION,
  accessKeyId: process.env.OSS_ID,
  accessKeySecret: process.env.OSS_SECRET,
  bucket: 'mudustatic'
})

async function download () {
  const cssFileName = `mudu-player/${version}/mudu-player.css`;
  // 不带任何参数，默认最多返回100个文件。
  let result = await client.list({
    prefix: AssetsPrefix
  });
  if (result.res.status !== 200) {
    console.log(result.res.statusMessage)
    return;
  }
  result.objects.map(async (object) => {
    const name = object.name.replace(`${AssetsPrefix}/`, '');
    const namePaths = name.split('/');
    namePaths.pop();
    if (namePaths.map(namePath => {
      if (!fs.existsSync(`${AssetsPath}/${namePath}`)) {
        fs.mkdirSync(`${AssetsPath}/${namePath}`);
      }
    }));
    console.log(`正在下载：${object.name}`)
    await client.get(object.name, `${AssetsPath}/${name}`);

  })
  // 样式文件不在assets下，单独下载
  console.log(`正在下载：${cssFileName}`)
  await client.get(cssFileName, `${AssetsPath}/mudu-player.css`);
}

const zip = async () => {
  const output = fs.createWriteStream(`./dist/${AssetsPath}.zip`);
  const zipArchiver = archiver('zip');
  zipArchiver.pipe(output);
  await download();

  zipArchiver.directory(AssetsPath);
  zipArchiver.finalize();

  output.on('close', () => {
    console.log(`打包完成：${AssetsPath}.zip`)
    rimraf(AssetsPath, () => {
      console.log(`清除${AssetsPath}文件夹`)
    });
  })
}

if (fs.existsSync(AssetsPath)) {
  rimraf(AssetsPath, () => {
    console.log(`清除${AssetsPath}文件夹`)
    fs.mkdirSync(AssetsPath);
    zip();
  });
} else {
  fs.mkdirSync(AssetsPath);
  zip();
}







