[Access-Control-Expose-Headers](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Expose-Headers)

## java后端返回文件流及文件名

```java

@RequestMapping("/download")
public void download(HttpServletResponse response,@RequestBody BaseReq req)throws IOException{
        String uid=req.getUid();
        System.out.println("uid:"+uid+" ==========>");

        // 创建excel文件
        XSSFWorkbook workbook=new XSSFWorkbook();
        // 创建工作页
        XSSFSheet sheet=workbook.createSheet();
        // 设置第一列
        XSSFRow row=sheet.createRow(0);
        XSSFCell c0=row.createCell(0);
        c0.setCellValue("Name");
        XSSFCell c1=row.createCell(1);
        c1.setCellValue("Job");
        XSSFCell c2=row.createCell(2);
        c2.setCellValue("Phone");

        // 模拟数据
        Grape a=new Grape("aaa","driver","1363636363636");

        List<Grape> list=Arrays.asList(a,);

        // 将数据转换到excel文件
        for(int i=0;i<list.size();i++){
        Grape grape=list.get(i);
        XSSFRow rowi=sheet.createRow(i+1);
        XSSFCell ci0=rowi.createCell(0);
        ci0.setCellValue(grape.getName());
        XSSFCell ci1=rowi.createCell(1);
        ci1.setCellValue(grape.getJob());
        XSSFCell ci2=rowi.createCell(2);
        ci2.setCellValue(grape.getPhone());
        }
        response.setHeader("Content-type","application/vnd.ms-excel");
        response.setContentType("application/octet-stream");
        response.setHeader("Content-Disposition","attachment;filename=ffffff.xlsx");

        // 关键代码(Access-Control-Expose-Headers)
        response.addHeader("Access-Control-Expose-Headers","Content-Disposition");
        response.flushBuffer();
        workbook.write(response.getOutputStream());
        }
```

## vue前端获取文件流及文件名

```js
import axios from "axios";
import fileDownload from 'js-file-download'
```

```js
download1()
{
    axios.post("/download", {uid: localStorage.getItem('uid')}, {responseType: 'arraybuffer'}).then(response => {
        let blob = new Blob([response.data], {type: 'application/vnd.ms-excel'})
        let dateTime = new Date()
        let dateTimeStr = dateTime.getFullYear() + '-' + dateTime.getMonth() + '-' + dateTime.getDay()
        // 获取文件名
        let filename = response.headers['content-disposition'].split('=')[1];
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
            window.navigator.msSaveBlob(blob, filename)
        } else {
            var blobURL = window.URL.createObjectURL(blob)// 将blob对象转为一个URL
            var tempLink = document.createElement('a')// 创建一个a标签
            tempLink.style.display = 'none'
            tempLink.href = blobURL
            tempLink.setAttribute('download', filename)// 给a标签添加下载属性
            if (typeof tempLink.download === 'undefined') {
                tempLink.setAttribute('target', '_blank')
            }
            document.body.appendChild(tempLink)// 将a标签添加到body当中
            tempLink.click()// 启动下载
            document.body.removeChild(tempLink)// 下载完毕删除a标签
            window.URL.revokeObjectURL(blobURL)
        }
    })
}
,
```

```js
downloadTemplate()
{
    axios.post("/downloadTemplate", {}, {responseType: 'arraybuffer'}).then(res => {
        let fileName = res.headers['content-disposition'].split('=')[1];
        fileDownload(res.data, fileName)
    })
}
,
```

