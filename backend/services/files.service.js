"use strict";

const fs = require("fs");
const path = require("path");
const pathToAssets = "assets/";
const uploadPath = path.join(__dirname, "../public/uploads/");

module.exports = {
  
	name: "files",

	actions: {

		/** Creates a new folder under /assets
		 * returns a resolved promise if the folder is successfully created,
		 * or if the folder already exists.
		 * 
		 */
		createFolder: {

			params: {
				foldername: "string", // The path of the folder to be deleted
			},

			handler ({params: {foldername}}) {

				const folderpath = path.join(pathToAssets, foldername);
	
				if( fs.existsSync(folderpath) ) {
					return Promise.resolve();
				} else {
					fs.mkdir(folderpath, {recursive: true}, err => {
						if (err) {
							return Promise.resolve(err);
						}
						return Promise.resolve();
					});
	
				}
	
			},

		},

		deleteFolderRecursive({params: {folderPath}}) {

			folderPath = path.join(pathToAssets, folderPath);

			let files = [];

			if( fs.existsSync(folderPath) ) {
				files = fs.readdirSync(folderPath);
        
				files.forEach(function(filename){
					let curPath = path.join(pathToAssets, folderPath, filename);
					if(fs.lstatSync(curPath).isDirectory()) { // recurse
						this.actions.deleteFolderRecursive(curPath);
					} else { 
						fs.unlinkSync(curPath);
					}
				});
				
				fs.rmdirSync(folderPath);
			}
		},
    
		/** Deletes a folder under /assets/ and returns a 
		 * resolved promis if the folder has been successfully deleted
		 * or if the folder did not exist in the first place.
		 * 
		 */
		deleteFolder: {
			params: {
				foldername: "string", // The path of the folder to be deleted
			},

			handler ({params: {foldername}}) {

				this.actions.deleteFolderRecursive(foldername);
				// const folderpath = path.join(pathToAssets, foldername);

				// if( !fs.existsSync(folderpath) ) {
				// 	return Promise.resolve();
				// } else {
				// 	fs.rmdir(folderpath, {recursive: true}, err => {
				// 		if (err) return Promise.reject(err);
				// 		return Promise.resolve();
				// 	});
				// }

			},
		},

		/** Rename a folder from srcPath to destPath
		 * This is equivalent to moveFolder
		 */
		renameFolder: {

			params: {
				srcPath: "string", // The path of the source folder
				destPath: "string", // The path of the destination folder
			},

			handler({params: {srcPath, destPath}}) {

				srcPath   = path.join(pathToAssets,srcPath);
				destPath  = path.join(pathToAssets,destPath);

				if( fs.existsSync(srcPath) ) {

					if(fs.existsSync(destPath)) {
						Promise.resolve();
					} else {
						fs.rename(srcPath, destPath, (err) => {
							if (err) Promise.reject(err);
							Promise.resolve();
						});
					}

				} else {
					Promise.reject("Source Folder does not exist: " + srcPath);
				}

			},
		},

		/** * Copy the content of srcPath to destPath */
		copyFolder: {

			params: {
				srcPath: "string", 
				destPath: "string", 
			},
			
			handler({params: {srcPath, destPath}}) {

				srcPath   = path.join(pathToAssets,srcPath);
				destPath  = path.join(pathToAssets,destPath);

				if(fs.existsSync(srcPath) ) {
					fs.copyFile(srcPath, destPath, (err) => {
						if (err) Promise.reject(err);
						Promise.resolve();
					});
				} else {
					Promise.reject("The source Folder does not exist: " + srcPath);
				}

			},
		},

		/** Create a file
		 * 
		 */
		createFile: {
			params: {
				folder: "string",
				filename: "string",
			},

			handler ({params: {foldername, filename, blob}}) {

				const filepath = path.join(pathToAssets, foldername, filename);

				if(fs.existsSync(filepath)) {
					return Promise.resolve("File already exists: " + filepath);
				} else {
					fs.writeFile(filepath, blob, err => {
						if(err) Promise.reject(err);
						Promise.resolve();
					});
				}

			},
		},

		/** 
		 * Delete the file in the given folder
		 */
		deleteFile: {

			params: {
				foldername: "string",
				filename: "string",
			},
			
			handler({params: {foldername, filename}}) {

				const filepath = path.join(pathToAssets, foldername, filename);

				if(fs.existsSync(filepath)) {
					fs.unlink(filepath, (err) => {
						if (err) Promise.reject(err);
						Promise.resolve();
					});
				} else {
					Promise.resolve();
				}
			},
		},

		/** Copy a srcFile to destFile, overwrite destPath if it already exists
		 */
		copyFile: {
			params: {
				srcPath: "string",
				destPath: "string",
			},
			
			handler({params: {srcPath, destPath}}) {

				srcPath   = path.join(pathToAssets, srcPath);
				destPath  = path.join(pathToAssets, destPath);

				if( fs.existsSync(srcPath) ) {

					fs.copyFile(srcPath, destPath, (err) => {
						if (err) Promise.reject(err);
						Promise.resolve();
					});

				} else {
					Promise.reject("Source file does not exist: ", srcPath);
				}
			},
		},

		/**
		 * Rename a file
		 * 
		 */
		renameFile: {
			params: {
				oldPath: "string",
				newPath: "string",
			},
			
			handler({params: {oldPath, newPath}}) {

				oldPath  = path.join(pathToAssets, oldPath);
				newPath  = path.join(pathToAssets, newPath);

				fs.rename(oldPath, newPath, (err) => {
					if (err) Promise.reject(err);
					Promise.resolve();
				});

			},
		},

		deleteAllFiles () {
			this.unseed();
			return this.actions.find();
		},

		/**
		 * Save a blob into a given file
		 * 
		 * @param {string} foldername, 
		 * @param {string} filename, 
		 * @param {Blob} blob, 
		 * 
		 */
		saveBlob: {
			
			async handler(ctx) {

				console.log( ctx.params);

				const {foldername, filename, blob} = ctx.params;
				const result = await saveFile(blob, path.join(pathToAssets, foldername, filename));
				
				return ctx.params;
			},
		},

		saveBlob: {
			async handler({params: {foldername, filename, blob}}) {

		    const result = {foldername, filename, blob}
		    console.log({foldername, filename, blob})
				// const result = await saveFile(blob, path.join(pathToAssets, foldername, filename));
				return {result};
				
			},
		},

		/** triggered by the gatewayservice in route.uploads
     * as a callback. Once the gateway has uploaded a file
     * this call back is then trggered
     * 
     * 
     */
		save: {

			rest: "POST|PUT /save",

			handler(ctx) {
        
				const {params, meta} = ctx;
				const {file, props: {id, type, key}} = params;
				const destPath = path.join(uploadPath, file.originalFilename);
				const buffer = fs.readFileSync(file.path);
				const payload = {
					id,
					[key]: `/uploads/${file.originalFilename}`
				};
        
				fs.writeFile(destPath, buffer, (err) => {
					err && Promise.reject(err);

					return ctx.call(`${type}.update`, payload);
				});
			},
		},
	},

	created() {
		if (!fs.existsSync(uploadPath)) {
			fs.mkdirSync(uploadPath);
		}
	},
  
};