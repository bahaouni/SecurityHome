import React, { Component, useEffect } from 'react';
import {  Text, View } from 'react-native';

import { useAuth } from './Auth';





export const Hoc = (Component,navigation)=>{
    
    const AuthComponent =(props)=>{
        const { token } = useAuth();
        useEffect(()=>{

            if (!token){
                navigation.navigate('')  

            }
            else 
            <Component {...props}/>
        },[router])
        return(
            <Component {...props}/>
        )

    }
    return AuthComponent

}
