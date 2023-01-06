import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
//import * as fs from 'file-saver';
import { FileSaverService } from 'ngx-filesaver';
import { DatePipe } from '@angular/common';
import { Workbook } from 'exceljs';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MasterService  {

  constructor(private http:HttpClient,private filesaver:FileSaverService) { }
  

  //apiurl="https://api.github.com/search/code?q=Guna+org:infosys001"
  apiurl="https://api.github.com/search/code?"


  getData(gitorg:string,searchstring:string){
  console.log(gitorg)
  console.log(searchstring)
    const headers = new HttpHeaders({
      Authorization: "Basic dGhhdml0aWd1bmE6Z2hwX2lQUlpWSE9rTG9kSW1LdHBiWkhvR3NNTkZNVlpScjJnNEhkWg==",
      Accept:'application/vnd.github.text-match+json'
    });
    this.apiurl=this.apiurl+"q="+searchstring+"+org:"+gitorg
    console.log(this.apiurl)
    return this.http.get(this.apiurl, {headers})
  }

  listUsers = []

   generateExcel(userlist: any)
  {
    
    console.log(typeof(userlist))
  
 
    const title = 'Matched strings in a Github files';
    const header = ['Name', 'Extension', 'Path', 'Imapcted'];
   
  
    // Create workbook and worksheet
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');


// Add Row and formatting
    const titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Comic Sans MS', family: 4, size: 16, underline: 'double', bold: true };
    worksheet.addRow([]);
   


// Add Image
 


// Blank Row
    worksheet.addRow([]);

// Add Header Row
    const headerRow = worksheet.addRow(header);

// Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
  cell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFFFFF00' },
    bgColor: { argb: 'FF0000FF' }
  };
  cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
});
// worksheet.addRows(data);
for (let x1 of userlist)
{
  let x2=Object.keys(x1);
  let temp=[]
  for(let y of x2)
  {
    temp.push(x1[y])
  }
  worksheet.addRow(temp)
}

// Add Data and Conditional Formatting
   
    worksheet.getColumn(1).width = 30;
    worksheet.getColumn(2).width = 20;
    worksheet.getColumn(3).width = 35;
    worksheet.getColumn(4).width = 200;
    worksheet.addRow([]);


// Footer Row
    const footerRow = worksheet.addRow(['This is system generated excel sheet.']);
    footerRow.getCell(1).fill = {
  type: 'pattern',
  pattern: 'solid',
  fgColor: { argb: 'FFCCFFE5' }
};
    footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

// Merge Cells
    worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);

// Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data: any) => {
  const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  this.filesaver.save(blob,"demofile")
  window.location.reload();
 // fs.saveAs(blob, 'Matched strings.xlsx');
});

  }
}
