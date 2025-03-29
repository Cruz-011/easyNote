import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar, ScrollView, Image, TouchableOpacity } from 'react-native';
import { obterAlunos } from '../storage/alunoStorage';
 
export default function AlunosScreen({ navigation }: any) {
    const [alunos, setAlunos] = useState<string[]>([]);
    
    useEffect(() => {
        obterAlunos().then(setAlunos);
    }, []);
    
    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);
    
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#141414" />
        
            <View style={styles.navbar}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.setaVoltar}>
                    <Text style={styles.setaTexto}>{'<'} </Text>
                </TouchableOpacity>
                <View style={styles.logoContainer}>
                    <Image source={require('../../assets/images/fiap.png')} style={styles.logoGrande} />
                    <Text style={styles.navTitle}>EasyNote</Text>
                </View>
            </View>
        
            <Text style={styles.titulo}>Todos os Alunos</Text>
            <FlatList
                data={alunos}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <Text style={styles.aluno}>{item}</Text>}
            />
        </ScrollView>
    );
    }
    
    const styles = StyleSheet.create({
        container: {
            flexGrow: 1,
            backgroundColor: '#141414',
            padding: 20,
            alignItems: 'center',
        },
        navbar: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
            marginTop: 20,
        },
        logoContainer: {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        setaVoltar: {
            position: 'absolute',
            left: 0,
            paddingLeft: 10,
            zIndex: 1,
        },
        setaTexto: {
            fontSize: 26,
            color: '#fff',
        },
        logoGrande: {
            width:100,
            height: 90,
            resizeMode: 'contain',
            marginRight: 10,
        },
        navTitle: {
            fontSize: 26,
            color: '#fff',
            fontWeight: 'bold',
        },
        titulo: {
            fontSize: 22,
            color: '#fff',
            marginBottom: 20,
        },
        aluno: {
            fontSize: 18,
            color: '#fff',
            backgroundColor: '#1e1e1e',
            padding: 16,
            borderRadius: 8,
            marginBottom: 12,
            width: '100%',
            borderColor: '#333',
            borderWidth: 1,
        },
    });