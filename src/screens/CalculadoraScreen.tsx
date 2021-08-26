import React, { useState } from 'react';

import { Text, View } from 'react-native';
import { BotonCalc } from '../components/BotonCalc';
import { styles } from '../theme/AppThem';

export const CalculadoraScreen = () => {

    const [numeroAnterior, setNumeroAnterior] = useState('0');
    const [numero, setNumero] = useState('0');

    const limpiar = () => {
        setNumero('0');
    }

    const armarNumero = ( numeroTexto: string ) => {

        // no aceptar doble punto
        if ( numero.includes('.') && numeroTexto === '.' ) return;

        if ( numero.startsWith('0') || numero.startsWith('-0') ) {

            // punto decimal
            if( numeroTexto === '.' ) {
                setNumero( numero + numeroTexto );
                
                // evaluar si hay otro numero, y hay un punto
            } else if ( numeroTexto === '0' && numero.includes('.') ) {
                setNumero( numero + numeroTexto );
                
                // evaular si es diferente de cero y no tiene un .
            } else if ( numeroTexto !== '0' && !numero.includes('.') ) {
                setNumero( numeroTexto );                
                
                // evitar 000.0
            } else if ( numeroTexto === '0' && !numero.includes('.') ) {
                setNumero( numero );                
            } else {
                setNumero( numero + numeroTexto );
            }           

        } else {
            setNumero( numero + numeroTexto );
        }
        
    }

    const positivoNegativo = () => {
        if ( numero.includes('-') ) {
            setNumero( numero.replace('-', '') );
        } else {
            setNumero( '-' + numero );            
        }
    }

    const btnDelete = () => {

        let negativo = '';
        let numeroTemp = numero;

        if ( numero.includes('-') ) {
            negativo = '-';
            numeroTemp.substr(1);
        }

        if ( numeroTemp.length > 1 ) {
            setNumero( negativo + numeroTemp.slice(0,-1))
        } else {
            setNumero('0');
        }
    }

    return (
        <View style={ styles.calculadoraContainer}>

            <Text style={styles.resultadoPequeno}>{ numeroAnterior }</Text>
            <Text 
                style={styles.resultado}
                numberOfLines={1}
                adjustsFontSizeToFit>
                { numero }
            </Text>

            {/* Fila de botones  */}
            <View style={styles.fila}> 
                <BotonCalc texto="C"   color="#9B9B9B" action={ limpiar } />
                <BotonCalc texto="+/-" color="#9B9B9B" action={ positivoNegativo } />
                <BotonCalc texto="del" color="#9B9B9B" action={ btnDelete } />
                <BotonCalc texto="/"   color="#FF9427" action={ limpiar } />
            </View>
            
            {/* Fila de botones  */}
            <View style={styles.fila}> 
                <BotonCalc texto="7" action={ armarNumero }  />
                <BotonCalc texto="8" action={ armarNumero } />
                <BotonCalc texto="9" action={ armarNumero } />
                <BotonCalc texto="x" color="#FF9427" action={ limpiar } />
            </View>

            {/* Fila de botones  */}
            <View style={styles.fila}> 
                <BotonCalc texto="4" action={ armarNumero } />
                <BotonCalc texto="5" action={ armarNumero } />
                <BotonCalc texto="6" action={ armarNumero } />
                <BotonCalc texto="-" color="#FF9427" action={ limpiar } />
            </View>
            
            {/* Fila de botones  */}
            <View style={styles.fila}> 
                <BotonCalc texto="1"  action={ armarNumero } />
                <BotonCalc texto="2"  action={ armarNumero } />
                <BotonCalc texto="3"  action={ armarNumero } />
                <BotonCalc texto="+"  color="#FF9427" action={ limpiar } />
            </View>

            {/* Fila de botones  */}
            <View style={styles.fila}> 
                <BotonCalc texto="0" action={ armarNumero } ancho />
                <BotonCalc texto="." action={ armarNumero } />
                <BotonCalc texto="=" color="#FF9427" action={ limpiar } />
            </View>
            
        </View>
    )
}
