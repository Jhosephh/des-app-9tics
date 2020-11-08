import React, { Component } from 'react';
import './App.css';
import { EmpleadoService } from './Service/EmpleadoService';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Panel} from 'primereact/panel';
import {Menubar} from 'primereact/menubar';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import { Button } from 'primereact/button';
import {Growl} from 'primereact/growl';
import {Menu} from 'primereact/menu';

import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';




export default class App extends Component{


  
  constructor(){
    
    super();
    this.state={
      visible:false,
      empleado: {
        id: null,
        nombre: null,
        aPaterno:null,
        aMaterno:null,

      },
      selectedEmpleado : {}
    };

    

    this.items =[
      {
        label: 'Options',
        items: [{label: 'New', icon: 'pi pi-fw pi-plus',command:()=>{ window.location.hash="/fileupload"; }},
                {label: 'Delete', icon: 'pi pi-fw pi-trash', url: 'http://primetek.com.tr'}]
    },
      {
        label: 'Nuevo Empleado',
        icon: 'pi pi-fw pi-plus',
        command: () => {this.showSaveDialog()} 
      },
      {
        label: 'Editar',
        icon: 'pi pi-fw pi-pencil',
        command: () => {this.showEditDialog()}
      },
      {
        label: 'Eliminar',
        icon: 'pi pi-fw pi-trash',
        command: () => {this.delete()}
      }

    ];

    this.empleadoService = new EmpleadoService();
    this.save= this.save.bind(this);
    
    this.footer = (
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={this.save}/>
      </div>
    );
   
  }

  

  componentDidMount(){
    this.empleadoService.getAll().then(data => this.setState({empleados: data}))
    }

save(){
  this.empleadoService.save(this.state.empleado).then(data =>{
    this.setState({
      visible: false,
      empleado: {
        id: null,
        nombre: null,
        aPaterno:null,
        aMaterno:null,
        edad: null,
     
      }
    });
    this.growl.show({severity: 'success', detail: 'Se Guardo Correctamente'});
    this.empleadoService.getAll().then(data => this.setState({empleados: data}))
  })
}

delete(){
  if(window.confirm("¿Deseas Eliminar el Registro?")){
      this.empleadoService.delete(this.state.selectedEmpleado.id).then(data=>{
        this.growl.show({severity: 'success', detail: 'Se Elimino Correctamente'});
    this.empleadoService.getAll().then(data => this.setState({empleados: data}));
      });
  }
}


  
  render(){
    return(
      <div style={{width:'80%',margin: '0 auto',marginTop: '20px'}}>
        <Menubar model={this.items}/>
        <br/>
        <Panel header ="Desarrollo de Aplicaciones" >
            <DataTable value={this.state.empleados} selectionMode="single" selection={this.state.selectedEmpleado}
            onSelectionChange={e => this.setState({selectedEmpleado: e.value})} >
              <Column field="id" header="ID"></Column>
              <Column field="nombre" header="Nombre"></Column>
              <Column field="aPaterno" header="APaterno"></Column>
              <Column field="aMaterno" header="AMaterno"></Column>
              <Column field="edad" header="Edad"></Column>
             
        </DataTable>
       </Panel>
       <Dialog header="Crear Empleado" visible={this.state.visible} style={{width: '400px'}} footer={this.footer} modal={true} onHide={() =>
         this.setState({visible: false})}>  

       <span className="p-float-label">
       <InputText value={this.state.empleado.nombre} style={{width : '100%'}}  id="nombre" onChange={(e) => { 
         let val = e.target.value;
         this.setState(prevState =>{
         let empleado = Object.assign({}, prevState.empleado)
         empleado.nombre = val;

         return {empleado};
          })}
         } />
          <label htmlFor="nombre">Nombre</label>
        </span>

          <br/>

        <span className="p-float-label">
       <InputText value={this.state.empleado.aPaterno} style={{width : '100%'}}  id="aPaterno" onChange={(e) => {
          let val = e.target.value;
          this.setState(prevState =>{
         let empleado = Object.assign({}, prevState.empleado)
         empleado.aPaterno = val

         return {empleado};
          })}
         } />
          <label htmlFor="aPaterno">Apellido Paterno</label>
        </span>

        <br/>

        <span className="p-float-label">
       <InputText value={this.state.empleado.aMaterno} style={{width : '100%'}}  id="aMaterno" onChange={(e) => {
          let val = e.target.value;
          this.setState(prevState =>{
         let empleado = Object.assign({}, prevState.empleado)
         empleado.aMaterno = val

         return {empleado};
          })}
         } />
          <label htmlFor="aMaterno">Apellido Materno</label>
        </span>

        <br/>

        <span className="p-float-label">
       <InputText value={this.state.empleado.edad} style={{width : '100%'}}  id="edad" onChange={(e) => {
          let val = e.target.value;
          this.setState(prevState =>{
         let empleado = Object.assign({}, prevState.empleado)
         empleado.edad = val

         return {empleado};
          })}
         } />
          <label htmlFor="edad">Edad</label>
        </span>

        <br/>

        <span className="p-float-label">
       <InputText value={this.state.empleado.sexo} style={{width : '100%'}}  id="sexo" onChange={(e) => {
          let val = e.target.value;
          this.setState(prevState =>{
         let empleado = Object.assign({}, prevState.empleado)
         empleado.sexo = val

         return {empleado};
          })}
         } />
          <label htmlFor="sexo">Sexo</label>
        </span>

        <br/>

        <span className="p-float-label">
       <InputText value={this.state.empleado.estatura} style={{width : '100%'}}  id="estatura" onChange={(e) => {
          let val = e.target.value;
          this.setState(prevState =>{
         let empleado = Object.assign({}, prevState.empleado)
         empleado.estatura = val

         return {empleado};
          })}
         } />
          <label htmlFor="estatura">Estatura</label>
        </span>

        <br/>

        <span className="p-float-label">
       <InputText value={this.state.empleado.rfc} style={{width : '100%'}}  id="rfc" onChange={(e) => {
          let val = e.target.value;
          this.setState(prevState =>{
         let empleado = Object.assign({}, prevState.empleado)
         empleado.rfc = val

         return {empleado};
          })}
         } />
          <label htmlFor="rfc">RFC</label>
        </span>

        <br/>

        <span className="p-float-label">
       <InputText value={this.state.empleado.curp} style={{width : '100%'}}  id="curp" onChange={(e) => {
          let val = e.target.value;
          this.setState(prevState =>{
         let empleado = Object.assign({}, prevState.empleado)
         empleado.curp = val

         return {empleado};
          })}
         } />
          <label htmlFor="curp">Curp</label>
        </span>

        <br/>
        <span className="p-float-label">
       <InputText value={this.state.empleado.nss} style={{width : '100%'}}  id="nss" onChange={(e) => {
          let val = e.target.value;
          this.setState(prevState =>{
         let empleado = Object.assign({}, prevState.empleado)
         empleado.nss = val

         return {empleado};
          })}
         } />
          <label htmlFor="nss">NSS</label>
        </span>

       </Dialog>
       <Growl ref={(el) => this.growl = el} />
       </div>     
    );
  }
  showSaveDialog(){
    this.setState({
      visible:true,
      empleado: {
        id: null,
        nombre: null,
        aPaterno:null,
        aMaterno:null,
        edad: null,
    
      }
    })
  }

  showEditDialog(){
    this.setState({
      visible:true,
      empleado: {
        id: this.state.selectedEmpleado.id,
        nombre: this.state.selectedEmpleado.nombre,
        aPaterno:this.state.selectedEmpleado.aPaterno,
        aMaterno:this.state.selectedEmpleado.aMaterno,
        edad:this.state.selectedEmpleado.edad,
       
      }
    })
  }

}

//export default App;
