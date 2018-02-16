import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
declare var jquery:any;
declare var $ :any;
import { TotemSocketService } from './../totem-socket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  agents:any;
  msg:string;
  alerta=true;
  tipo:any;
  private layout: any = 'alphanumeric';
  constructor(public sails:TotemSocketService, private ref:ChangeDetectorRef) {
    this.agents={
      'A':0,
      'B':0,
      'C':0
    };
  }

  ngOnInit() {
      $("#default").keyboard();
    this.sails.conectToTotem()
    .subscribe(data=>{
      console.log(data.verb);
      if(data.verb=="joined"){
        this.agents=data.agents
        this.agentsInit(data.agents)
      }else if(data.verb=="agent_logeed"){
        this.agents[data.type]++;
      }else if(data.verb=="agent_logout"){
        this.agents[data.type]--;
      }else if(data.verb=="alert"){
        this.shotAlert(data);
      }
      this.ref.detectChanges();
    })
  }

  agentsInit(agents){
    this.agents=agents;
  }
  shotAlert(data){
    console.log('data', data);
    if(data.msg == 1){
      this.agents['A']++;
    }
  }
  getmsg(){
    this.sails.sendMsg();
  }
  sendMensaje(msg){
    this.alerta=false;
    this.sails.sendMensaje(msg);
  }

  llamar(){
    let msj = {'tipo':this.tipo,'curp':$("#default").val()}
    this.sendMensaje(msj);
  }
  focus(tipo){
    this.tipo = tipo;
    setTimeout(function(){
        $("#default").focus();
    }, 500);
  }

}
