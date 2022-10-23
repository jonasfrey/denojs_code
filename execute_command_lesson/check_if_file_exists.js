

// // var pathFound = existsSync("/usr/bin/gphoto2")
// // var pathFound = existsSync("/usr/bin/xev")
// var pathFound = existsSync("/usr/bin/ab")
// // cp /usr/bin/gphoto2 /home/ubuntuuser/
// // var pathFound = existsSync("/home/ubuntuuser/gphoto2")
// console.log(pathFound)



// const pathFound = await Deno.stat("/usr/bin/gphoto2").then(() => true).catch(() => false)
// console.log(pathFound)


// export function ensureFileSync(filePath: string): void {
//     try {
//       // if file exists
//       const stat = Deno.lstatSync(filePath);
//       if (!stat.isFile) {
//         throw new Error(
//           `Ensure path exists, expected 'file', got '${getFileInfoType(stat)}'`,
//         );
//       }
//     } catch (err) {
//       // if file not exists
//       if (err instanceof Deno.errors.NotFound) {
//         // ensure dir exists
//         ensureDirSync(path.dirname(filePath));
//         // create file
//         Deno.writeFileSync(filePath, new Uint8Array());
//         return;
//       }
//       throw err;
//     }
//   }

try{
    const o_stat = Deno.lstatSync("/usr/bin/gphoto2")
    console.log(o_stat)
}catch(err){
    if(err instanceof Deno.errors.NotFound){
        console.log("file not found")
    }
}