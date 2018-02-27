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
  agents:number;
  msg:string;
  socketId:string;
  alerta=true;
  tipo:any;
  clients:any;
  atendido:boolean=false;
  private layout: any = 'alphanumeric';
  constructor(public sails:TotemSocketService, private ref:ChangeDetectorRef) {
    this.agents=0;
  }

  ngOnInit() {
      $("#default").keyboard();
    this.sails.conectToTotem()
    .subscribe(data=>{
      console.log(data);
      if(data.verb=="joined"){
        this.agents=data.agents
        this.clients=data.totems
        this.socketId=data.socketID
      }else if(data.verb=="agent_logeed"){
        this.agents++;
      }else if(data.verb=="agent_logout"){
        this.agents--;
      }else if(data.verb=="alert_totem"){
        //this.shotAlert(data);
        if(this.atendido){
          if(this.socketId==data.socketId){
            this.atendido=false;
            alert('Tu turno');
          }else{
            this.getPosition()
          }  
        }        
      }else if(data.verb=="totem_call"){
        this.clients.push(data.totem);
      }
      this.ref.detectChanges();
    })
  }

  agentsInit(agents){
    this.agents=agents;
  }
  /*shotAlert(data){
    console.log('data', data);
    if(data.msg == 1){
      this.agents['A']++;
    }
  }*/
  getmsg(){
    this.sails.sendMsg();
  }
  sendMensaje(msg){
    this.alerta=false;
    this.sails.sendMensaje(msg);
  }

  llamar(){
    let msj = {type:this.tipo,curp:$("#default").val(), socketId:this.socketId}
    console.log(msj);
    this.sails.totemLogIn(msj);
    this.atendido=true;
  }
  focus(tipo){
    this.tipo = tipo;
    setTimeout(function(){
        $("#default").focus();
    }, 500);
  }
  getPosition(){
    this.tipo
    let position=0;
    for(let x in this.clients){
      if( this.clients[x].type == this.tipo){
        if( this.clients[x].socketID == this.socketId){
          position++;
          break;
        }else{
          position++;
        }
      }
    }
    alert('eres el: '+ position +' en la fila');
  }

}
