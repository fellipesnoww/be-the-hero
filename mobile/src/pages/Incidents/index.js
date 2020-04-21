import React, {useEffect, useState} from 'react';
import {View, FlatList, Text, Image, TouchableOpacity} from 'react-native';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import LogoImg from '../../assets/logo.png';
import styles from './styles';

import api from '../../services/api';

export default function Incidents(){

    const navigation = useNavigation();
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState('');
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false)

    function navigationToDetail(incident){
        navigation.navigate('Detail', {incident});
    }

    async function loadIncidents(){

        if(loading){
            return;
        }

        if(total > 0 && incidents.length){
            return;
        }

        setLoading(true);

        const response = await api.get('incidents', {
            params: {page}
        });

        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page+1);
        setLoading(true);

    }

    useEffect(() => {

    });
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={LogoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
                </Text>
            </View>

            <Text style={styles.title}>Bem Vindo</Text>
            <Text style={styles.description}>Escolha um dos casos e salve o dia.</Text>

            <FlatList style={styles.incidentList}
                data={incidents}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached ={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({item: incident}) =>(
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}></Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>Valor:</Text>
                        <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</Text>

                        <TouchableOpacity style={styles.detailsButton} onPress={() => navigationToDetail}>
                            <Text style={styles.detailsButtonText}>{incident.value}</Text>
                            <Feather name="arrow-right" size={16} color="#E02041"/>
                        </TouchableOpacity>
                </View>
                )}
            />          
        </View>
    )
}