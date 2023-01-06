import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import{ MasterService} from '../service/master.service'
import { Workbook } from 'exceljs';

import * as fs from 'file-saver';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{
  searchForm!: FormGroup;
  hide: boolean = false;
  userlist:any;
  data2:any;
  test:any;
  str3:any;
  constructor(private fb: FormBuilder, private router: Router,private service:MasterService){}
  ngOnInit(){
    this.searchForm=new FormGroup(
      {
        gitorgname: new FormControl('',[Validators.required]),
        searchstring: new FormControl('',[Validators.required]),
        repo: new FormControl(''),
        fextension: new FormControl(''),
        fname: new FormControl('')
      }
    )
  }
  afterLast (value: string, delimiter: string) {  
    value = value || ''
  
    return delimiter === ''
        ? value
        : value.split(delimiter).pop()
  }
  onLogin() {
    if (!this.searchForm.valid) {
      return;
    }
      const org=this.searchForm.value.gitorgname
      const searchstring=this.searchForm.value.searchstring
    this.service.getData(org,searchstring).subscribe(result=>{
        this.userlist=result
        this.userlist=result
     
        //  console.log( this.userlist.items[0].text_matches[0].fragment+"  and     "+this.userlist.items[0].text_matches[1].fragment)
  
         // console.log(Object.keys(this.userlist.items[0].text_matches).length)
          
        // console.log(this.userlist)
        //console.log(this.userlist["items"]);
         //console.log(Object.keys(this.userlist.items[5].text_matches).length);
         this.data2 = this.userlist["items"]
         var employees = []; 
        for (let i in this.data2) {
          var constr:number=0;
          var str1:string="";
          var str2:string="";
          var str3:string="";
          for (let j in Object.keys(this.userlist.items[i].text_matches))
          {
            
            //console.log( this.userlist.items[i].text_matches[j].fragment)
            if(j=="0")
            {
              if(Object.keys(this.userlist.items[i].text_matches).length==1)
              {
                this.str3=this.userlist.items[i].text_matches[0].fragment
              }
              str1=this.userlist.items[i].text_matches[0].fragment
              
            }
           
            if(j=="1")
            {
              str2=this.userlist.items[i].text_matches[1].fragment
              this.str3=str1+" jjjjjjjjjjjjjjjjjjjjjj   "+str2;
            }
            
              
              
           
            
          }
  
  
           const nwex=this.data2[i]["name"];
          // console.log(this.afterLast(nwex, '.') )
           employees.push({name:this.data2[i]["name"],extension:this.afterLast(nwex, '.'),path:this.data2[i]["path"],Imapcted:this.str3});
       }
        console.log(employees);
        this.service.generateExcel(employees);
        //window.location.reload();
     },
     error => {
      alert("something went wrong")
     // window.location.reload();
    },
    () => {
      //this.searchForm.reset()
     // alert("File downloaded successfully")
     // window.location.reload();
      // 'onCompleted' callback.
      // No errors, route to new page here
    }
    )
    
  }

}
