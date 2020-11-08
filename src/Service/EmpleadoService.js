import axios  from 'axios';
  

export class EmpleadoService{
    baseUrl="https://spring-empleado-jglopez.herokuapp.com//api/v1/";

    getAll(){
        return axios.get(this.baseUrl+"listar").then(res => res.data)
    }

    save(empleado){
        return axios.post(this.baseUrl+"save",empleado).then(res => res.data)
    }

    delete(id){
        return axios.get(this.baseUrl+"borrar/"+id).then(res => res.data)
    }
}