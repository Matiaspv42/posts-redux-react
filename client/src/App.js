import './App.css';
import Filtro from './components/Filtro/Filtro';
import Lista from './components/Lista/Lista';
import Formulario from './components/Formulario/Formulario';
import { Provider } from 'react-redux'
import { store } from './store';

export default function App() {
  const posts = [
    {
      id:1,
      nombre: 'post',
      descripcion: 'este es un post'
    },
    {
      id:2,
      nombre: 'post2',
      descripcion: 'este es un post de prueba'
    },
    {
      id:3,
      nombre: 'postsss',
      descripcion: 'este es un postddd'
    },
    {
      id:4,
      nombre: 'bingus',
      descripcion: 'este es un postddd'
    },
    {
      id:3,
      nombre: 'grace',
      descripcion: 'este es un postddd'
    }
  ]
  return (
    <div className="App">
      <Provider store = {store}>
        <div className="Content">
          <Filtro />
          <Lista posts={posts}/>
          <Formulario />
        </div>
      </ Provider>
    </div>
  );
}

