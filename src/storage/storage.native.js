/* eslint no-console: 0 */
/**
 * storage.native.js - wrapper to abstract localStorage implementation for react-native
 * react-native-web-storage
 *
 * Created by Peter Kowalczyk on 07/01/17.
 * Copyright © 2017 Aurity. All rights reserved.
 *
 */
import { AsyncStorage } from 'react-native'
import storage from './in-memory-storage.native'

const storageService = {
  setItem,
  removeItem,
  getItem,
  multiGet,
  store: storage.getAll,
  clear,
  setToken,
  getToken,
  getTokenAsync,
  getAllFromLocalStorage,
}


function getAllItemsForKeys(keys) {
  const promiseAll = keys
    .map(key => AsyncStorage
      .getItem(key)
      .then(data => JSON.parse(data))
      .then(data => ({ [key]: data })))

  return Promise
    .all(promiseAll)
    .then(flatMap)
    .catch(error => console.log('Storage ERROR - getAllItemsForKeys!', error))
}

function flatMap(allData) {
  let flatData = {}
  allData.forEach((data) => {
    flatData = { ...flatData, ...data }
  })
  return flatData
}

function setItem(key, value) {
  const valueToSet = JSON.stringify( eval(value) )
  storage.set(key, valueToSet)
  AsyncStorage
    .setItem(key, valueToSet)
    .then(handleSuccess)
    .catch(handleError)
}

function removeItem(key) {
  storage.remove(key)
  AsyncStorage
    .removeItem(key)
    .then(handleSuccess)
    .catch(handleError)
}

function getItem(key) {
  const value = storage.get(key)
  return value ? JSON.parse(value) : value
}

function multiGet(keys = []){
  return keys.map(key => getItem(key))
}

function setToken(value) {
  return setItem('token', value)
}

function getToken(value) {
  return getItem('token', value)
}

function clear() {
  storage.clearAll()
  AsyncStorage
    .clear()
    .then(handleSuccess)
    .catch(handleError)
}

function getTokenAsync() {
  return AsyncStorage
    .getItem('token')
    .then(data => JSON.parse(data))
    .catch(handleError)
}

function getAllFromLocalStorage() {
  return AsyncStorage
    .getAllKeys()
    .then(getAllItemsForKeys)
}

function handleSuccess() {
  return 'Success'
}

function handleError(data) {
  console.warn('AsyncStorage Error', data)
}

export default storageService
