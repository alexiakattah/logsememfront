import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const normalConfig = {
  apiKey: "AIzaSyBPK3_AsfbkL78rSqd8eA-7x4hx20ps5g4",
  authDomain: "appsemem-5aa83.firebaseapp.com",
  databaseURL: "https://appsemem-5aa83-default-rtdb.firebaseio.com",
  projectId: "appsemem-5aa83",
  storageBucket: "appsemem-5aa83.appspot.com",
  messagingSenderId: "102020443598",
  appId: "1:102020443598:web:319df24574965275e44f9f"
}

// Api de Homologação

const homApiConfig = {
  apiKey: "AIzaSyBPK3_AsfbkL78rSqd8eA-7x4hx20ps5g4",
  authDomain: "appsemem-5aa83.firebaseapp.com",
  databaseURL: "https://appsemem-5aa83-default-rtdb.firebaseio.com",
  projectId: "appsemem-5aa83",
  storageBucket: "appsemem-5aa83.appspot.com",
  messagingSenderId: "102020443598",
  appId: "1:102020443598:web:319df24574965275e44f9f"
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
