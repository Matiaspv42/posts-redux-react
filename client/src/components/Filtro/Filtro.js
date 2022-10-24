import './filtro.css'
import { useDispatch } from 'react-redux'
import { addFilter } from '../../store'
import { useState } from 'react'

export default function Filtro(){
    const dispatch = useDispatch()
    const [filterInput, setFilterInput] = useState('')

    const handleFiltrar = () =>{
        dispatch(addFilter(filterInput))
    }

    const onInputChange = (e) =>{
        const {name, value} = e.target;
        setFilterInput({... filterInput, [name]: value})
    }
    return(
        <div className="Filtro">
            <input type="text" name="filter" id="" placeholder="Filtrar por nombre" onChange={onInputChange}/>
            <button className='regularButton' onClick={handleFiltrar}>Filtrar</button>
        </div>
    )
}