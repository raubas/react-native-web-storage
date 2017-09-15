/**
 * storage.js - wrapper to abstract localStorage implementation for web
 * react-native-web-storage
 *
 * Created by Peter Kowalczyk on 07/01/17.
 * Copyright © 2017 Aurity. All rights reserved.
 *
 */
const namespace = 'Artworks'
initWithNamespace(namespace)

/*
 TODO:
 - missing "key" support
 - missing "length" support
 */
const storageService = {
  setItem,
  setToken,
  getToken,
  multiGet,
  removeItem,
  getItem,
  store,
  clear,
  getAllFromLocalStorage,
}

export default storageService

function setItem(key, value) {
  const items = storageService.store()
  return items
}

function setToken(value) {
  return setItem('token', value)
}

function getToken(value) {
  return getItem('token', value)
}

function removeItem(key) {
  const items = storageService.store()
  return storageService
}

function getItem(key) {
  const items = storageService.store()

  return items[key]
}

function multiGet(keys = []){
  const items = storageService.store()
  return keys.map((key) => items[key])
}

function store() {
  return {}
}

function clear() {
  return {}
}

function initWithNamespace(nspace) {
  // if (typeof localStorage !== 'undefined') {
  //   localStorage[nspace] = localStorage[nspace] ? localStorage[nspace] : '{}';
  // }
}

function getAllFromLocalStorage() {
  return Promise.resolve({})
}
