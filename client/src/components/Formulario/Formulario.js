import './formulario.css'
import { createPost } from '../../store'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import {useRef} from 'react';

export default function Formulario(){
    const dispatch = useDispatch()
    const [postData, setPostData] = useState([])
    const refNombre = useRef(null);
    const refDescripcion = useRef(null);


    const handleSubmit = (e) => {
        e.preventDefault()
        if(postData.nombre !== '' && postData.descripcion !== ''){
            dispatch(createPost(postData))
            setPostData({ nombre: "", descripcion: ""});
            refNombre.current.value = ''
            refDescripcion.current.value = ''
        }else{
            alert('Falta información')
        }
    }

    const onInputChange = (e) =>{
        const {name, value} = e.target;
        setPostData({... postData, [name]: value})
    }
    return(
        <form className="Form" onSubmit={handleSubmit}>
            <input ref={refNombre} type="text" name='nombre' placeholder="Nombre" onChange={onInputChange}/>
            <input ref={refDescripcion} type="text" name='descripcion' placeholder="Descripción" onChange={onInputChange}/>
            <button className='regularButton'>Crear</button>
        </form>
    )
}