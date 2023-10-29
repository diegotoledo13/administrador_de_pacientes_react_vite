import React from 'react'
import { useState, useEffect } from 'react'
import Error from './Error';

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fecha, setFecha] = useState("");
  const [sintomas, setSintoma] = useState("");
  const [error, setError] = useState(false);

  useEffect(()=>{
    if (Object.keys(paciente).length > 0){
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintoma(paciente.sintomas)
    }
  },[paciente]);

  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36)
    return random + fecha
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if([nombre, propietario, email, fecha, sintomas].includes('')) {
      setError(true)
      return;
    }  
    const objetoPaciente = {
      nombre,
      propietario, 
      email, 
      fecha, 
      sintomas
    }
    if (paciente.id){
      objetoPaciente.id = paciente.id
      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)
      setPacientes(pacientesActualizados);
      setPaciente({})
    }
    else {
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente]);
    }
    setError(false)
    setNombre('');
    setPropietario('');
    setEmail('');
    setFecha('');
    setSintoma('');
  }


  return (
    <div className=' md:w-1/2 lg:w-2/5 mx-5'>
      <h1 className=' font-black text-3xl text-center'>Seguimiento pacientes</h1>
      <p className=' text-lg mt-5 text-center mb-10 '>Añade Pacientes y {""}
        <span className=' text-indigo-600 font-bold'>Administralo</span>
      </p>
      <form onSubmit={handleSubmit} className=' bg-white shadow-md rounded-lg py-10 px-5 mb-10'>
      
      {error && (
       <Error
       mensaje="Todos los campos son obligatorios"
       />
      )}

        <div className=' mb-5'>
          <label htmlFor='Mascota' className=' font-bold block text-gray-700 uppercase'>Nombre de Mascota</label>
          <input id='Mascota' className=' border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' type="text" placeholder='Nombre de la Mascota' value={nombre} onChange={(e) => setNombre(e.target.value) }/>
        </div>
        <div className=' mb-5'>
          <label htmlFor='Propietario' className=' font-bold block text-gray-700 uppercase'>Nombre de Propietario</label>
          <input id='Propietario' className=' border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' type="text" placeholder='Nombre del Propietario' value={propietario} onChange={(e) => setPropietario(e.target.value) }/>
        </div>
        <div className=' mb-5'>
          <label htmlFor='Email' className=' font-bold block text-gray-700 uppercase'>Email</label>
          <input id='Email' className=' border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' type="email" placeholder='Email Contacto Propietaro' value={email} onChange={(e) => setEmail(e.target.value) }/>
        </div>
        <div className=' mb-5'>
          <label htmlFor='Alta' className=' font-bold block text-gray-700 uppercase'>Alta</label>
          <input id='Alta' className=' border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' type="date" value={fecha} onChange={(e) => setFecha(e.target.value) }/>
        </div>
        <div className=' mb-5'>
          <label htmlFor='Alta' className=' font-bold block text-gray-700 uppercase'>Síntomas</label>
          <textarea id="Sintomas" className=' border-2 w-full p-2 mt-2 placeholder-gra rounded-md' placeholder='Describe los síntomas' value={sintomas} onChange={(e) => setSintoma(e.target.value) }></textarea>
        </div>
        <input type="submit" className=' bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-opacity' value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'} />
      </form>
    </div>
  )
}

export default Formulario