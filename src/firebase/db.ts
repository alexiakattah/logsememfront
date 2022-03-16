import { db } from './firebase';


export const getSigninClient = (userId: string) => {
  return db.ref(`Users/${userId}`).once('value');
};


// export const SigninClientRef = (userId: string) => {
//   return db.ref(`Clients/${userId}`);
// };

export const onceGetAdmins = (userId: string) =>
  db.ref(`Admins/${userId}`).once('value');

export const getAllUsers = () => db.ref('Users');

export const refNode = (nodeRef: string) => db.ref(nodeRef);

export const setToken = (userId: string, token: string)=>{
  db.ref(`Users/${userId}`).update({fcmToken: token})
}