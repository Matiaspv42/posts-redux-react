import {useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react'
import { selectAllPosts, getPostsError, getPostsStatus, fetchPosts, deletePost } from '../../store'
import './lista.css'
import { render } from 'react-dom'

export default function Lista(props){
    const dispatch = useDispatch()

    const posts = useSelector(selectAllPosts)
    const postsStatus = useSelector(getPostsStatus)
    const postsError = useSelector(getPostsError)

    const filtro = useSelector(state => state.filter)
    useEffect(()=>{
        if (postsStatus === 'idle'){
            dispatch(fetchPosts())
        }
    }, [postsStatus,dispatch])

    const handleDelete = (id) =>{
        dispatch(deletePost(id))
    }

    if(filtro.filter.filter){
        return(
            <div className="Lista">
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.filter(post=>post.nombre.toLowerCase().includes(filtro.filter.filter.toLowerCase())).map(post => (
                            <tr key={post.id}>
                                <td>{post.nombre}</td>
                                <td>{post.descripcion}</td>
                                <td><button className="deleteButton" id={'deleteButton_'+post?.id} onClick={()=>handleDelete(post?.id)}><span className='whiteFont'>Borrar</span></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }else{
        return(
            <div className="Lista">
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map(post => (
                            <tr key={post.id}>
                                <td>{post?.nombre}</td>
                                <td>{post?.descripcion}</td>
                                <td><button className="deleteButton" id={'deleteButton_'+post?.id} onClick={()=>handleDelete(post?.id)}><span className='whiteFont'>Borrar</span></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
    
}