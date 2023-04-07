import React from "react";

export const baseUrl = 'https://auth.nomoreparties.co'

export function register(email, password) {
  return fetch(`${baseUrl}/signup`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({password, email})})

  .then((res) => {
    if (res.ok) { return res.json(); }
    return Promise.reject(`Ошибка: ${res.status}`);})

  .then((res) => { return res })
}

export function authorize(email, password) {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({password, email})})
    
    .then((res) => {if (res.ok) { return res.json(); }})

    .then((data) => { if(data.token) {
        localStorage.setItem('token', data.token)  
        return data}})
    
    .catch(err => console.log(err))
}

export function getContent(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${token}`}})

  .then(res => res.json())
  .then(data => data)
}