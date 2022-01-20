import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const normalConfig = {
  apiKey: 'AIzaSyBjlMX6-kkk5QBPwW1d1mVQQRmBxnM80GU',
  authDomain: 'appsemem.firebaseapp.com',
  databaseURL: 'https://appsemem-default-rtdb.firebaseio.com',
  projectId: 'appsemem',
  storageBucket: 'appsemem.appspot.com',
  messagingSenderId: '778448237603',
  appId: '1:778448237603:web:e1e43101f775e289816d96',
}

// Api de Homologação

const homApiConfig = {
  apiKey: 'AIzaSyBjlMX6-kkk5QBPwW1d1mVQQRmBxnM80GU',
  authDomain: 'appsemem.firebaseapp.com',
  databaseURL: 'https://appsemem-default-rtdb.firebaseio.com',
  projectId: 'appsemem',
  storageBucket: 'appsemem.appspot.com',
  messagingSenderId: '778448237603',
  appId: '1:778448237603:web:e1e43101f775e289816d96',
}

let config = normalConfig

if (process.env.NODE_ENV === 'production') {
  config = homApiConfig
} else if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  config = homApiConfig
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const db = firebase.database()
const auth = firebase.auth()

export { db, auth, firebase }
