import { firebaseConfig } from '../config'
import * as firebase from 'firebase'

class Fire {
    constructor() {
        console.log('Fire')
        firebase.initializeApp(firebaseConfig)
    }

    addPost = async ({ text, localUri }) => {
        const remoteUri = await this.uploadPhotoAsync(localUri)

        return new Promise((res, rej) => {
            this.firestore
                .collection('post')
                .add({
                    text: text,
                    uid: this.uid,
                    timestamp: this.timestamp,
                    image: remoteUri
                })
                .then(ref => {
                    res(ref)
                })
                .catch(err => {
                    rej(err)
                })
        })
    }

    uploadPhotoAsync = async uri => {
        const path = `photo/${this.uid}/${this.timestamp}.jpg`

        return new Promise(async (res, rej) => {
            const response = await fetch(uri)
            const file = await response.blob()

            let upload = firebase
                .storage()
                .ref(path)
                .put(file)

            upload.on(
                'state_changed',
                snapshot => {},
                error => {
                    rej(error)
                },
                async () => {
                    const url = await upload.snapshot.ref.getDownloadURL()
                    res(url)
                }
            )
        })
    }

    get firestore() {
        return firebase.firestore()
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid
    }

    get timestamp() {
        return Date.now()
    }
}

Fire.shared = new Fire()
export default Fire
