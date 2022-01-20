import { auth, db, firebase } from './firebase'

interface UserAuthProps {
  clientId: string
  cpf: string
  createdAt: number
  email: string
  master: boolean
  name: string
  uid: string
  updatedAt: number
}
interface DoSignInWithEmailAndPasswordProps {
  code: number
  message: string
  success: boolean
  data: UserAuthProps | undefined
}

// create user
export const doCreateUserWithEmailAndPassword = (
 
  email: string,
  password: string
) => auth.createUserWithEmailAndPassword(email, password)

// Sign Up
export const logoutAfterCreated = () => auth.signOut()

export function getAuthPlayer() {
  return auth.currentUser
}

// Sign In user client
export function doSignInWithEmailAndPassword(email: string, password: string) {
  return new Promise<DoSignInWithEmailAndPasswordProps>(
    async (resolve, reject) => {
      try {
        const { user } = await auth.signInWithEmailAndPassword(email, password)

        if (!user) {
          resolve({
            code: 200,
            message: 'E-mail e/ou senha não informados!',
            success: false,
            data: undefined,
          })
          return
        }

        const userSnapshot = await db
          .ref(`Users/${user.uid}`)
          .once('value')
          .then((userSnapshot) => userSnapshot.val())

        if (userSnapshot) {
          return resolve({
            code: 200,
            message: `User localizado com sucesso`,
            success: true,
            data: userSnapshot,
          })
        } else {
          console.log('usuario nao pertence a nenhum cliente')
          return reject({
            code: 200,
            message: `User não localizado`,
            success: false,
          })
        }
      } catch (error) {
        // console.log('erro doSignInWithEmailAndPassword-->', error);
        reject(error)
      }
    }
  )
}

// Sign In admin
export const doSignInWithEmailAndPasswordAdmin = (
  email: string,
  password: string
) => auth.signInWithEmailAndPassword(email, password)

// Sign out
export const doSignOut = () => auth.signOut()

// Password Reset
export const doPasswordReset = (email: string) =>
  auth.sendPasswordResetEmail(email)

// Password Change
export const doPasswordUpdate = (password: string) =>
  auth.currentUser!.updatePassword(password)

// Get Auth User
export const getAuthUser = () => auth.currentUser

export const getAuthUserToken = () => {
  return new Promise((resolve, reject) => {
    auth
      .currentUser!.getIdToken()
      .then((authToken) => {
        const stringToken = `APPSEMEM ${authToken}`
        resolve(stringToken)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

// Boolean to check if user is logged
export const userLogged = () => auth.currentUser !== null

//update password
export const updatePassword = (
  currentPassword: string,
  newPassword: string,
  confirmNewPassword: string
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = auth.currentUser!
      const credential = firebase.auth.EmailAuthProvider.credential(
        user.email!,
        currentPassword
      )

      user
        .reauthenticateWithCredential(credential)
        .then(() => {
          if (newPassword !== confirmNewPassword) {
            console.log('Senha nova e senha de confirmação não são iguais.')
            return reject({
              message: 'Senha nova e senha de confirmação não são iguais.',
              success: false,
            })
          } else {
            user
              .updatePassword(confirmNewPassword)
              .then(() => {
                return resolve({
                  message: 'Senha alterada com sucesso.',
                  success: true,
                })
              })
              .catch((error) => {
                console.log('Erro ao alterar a senha.', error)
                return reject({
                  message: 'Erro ao alterar a senha.',
                  success: false,
                })
              })
          }
        })
        .catch((error) => {
          console.log('Senha atual não confere.', error)
          return reject({
            message: 'Senha atual não confere.',
            success: false,
          })
        })
    } catch (error) {
      return reject({
        message: 'Não foi possível alterar a senha',
        success: false,
      })
    }
  })
}
