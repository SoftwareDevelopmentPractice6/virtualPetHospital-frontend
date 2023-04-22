// 数据传输接口

import request from "@/utils/request";

const base = "file/";
// ("http://localhost:8090/api/file/files");

// 上传文件方法
export function uploadFile(file, filePath) {
	const formData = new FormData();
	formData.append("file", file);
	formData.append("filePath", filePath);
	return request({
		url: base + "files",
		method: "post",
		data: formData,
	});
}

// 下载文件方法
export function downloadFile(filePath) {
	return request({
		url: base + "files",
		method: "get",
		params: {
			filePath: filePath,
		},
	});
}

// 删除文件方法
export function deleteFile(filePath) {
	return request({
		url: base + "files",
		method: "delete",
		params: {
			filePath: filePath,
		},
	});
}

// 获取指定路径下全部文件（层级2）
export function getFileLists(directoryPath) {
	return request({
		url: base + "files-list",
		method: "get",
		params: {
			directoryPath: directoryPath,
		},
	});
}

// 图片格式转换
export function convertImage(filePath, expectedFormat) {
	const data = {
		filePath,
		expectedFormat,
	};
	return request({
		url: base + "image",
		method: "put",
		data: data,
	});
}

// 视频格式转换
export function convertVideoToMp4(filePath) {
	const data = {
		filePath,
	};
	return request({
		url: base + "video/mp4",
		method: "put",
		data: data,
	});
}

// 下载路径下全文件
export async function downloadAllFiles(directoryPath) {
	const allFiles = [];
	await this.getFileLists(directoryPath).then((res) => {
		if (res.code === 200) {
			let filePathList = res.data.filePathList;
			filePathList.forEach(async (filePath) => {
				await this.downloadFile(filePath).then((downloadRes) => {
					allFiles.append(downloadRes);
				});
			});
		}
	});

	return allFiles;
}
