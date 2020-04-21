import React, {useState} from 'react';
import { FiLogIn } from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';

import './styles.css';
import logoImage from '../../assets/logo.svg';
import heroesImage from '../../assets/heroes.png';

export default function Logon(){

    const [id, setId] = useState('');
    const history = useHistory();
    async function handleLogin(e){
        e.preventDefault();

        try {
            const response = api.post('sessions',{id});

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', (await response).data.name);
            console.log(id);
            history.push('/profile');
        } catch (error) {
            alert('Erro ao logar'); // emite o alerta 
            
        }
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImage} alt="Heroes"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input placeholder="Sua Id" value={id} onChange={e => setId(e.target.value)}/>
                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImage} alt="Heroes"/>
        </div>
    );
    
}