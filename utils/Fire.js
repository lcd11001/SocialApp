import { firebaseConfig } from '../config'
import * as firebase from 'firebase'

class Fire {
    constructor() {
        console.log('Fire')
        firebase.initializeApp(firebaseConfig)
        console.log('Fire store', this.firestore)
    }

    addPost = async ({ text, localUri }) => {
        const remoteUri =
            localUri != null ? await this.uploadPhotoAsync(localUri) : null

        /**
         * you have to create Firebase Database
         * then, create 'post' collection with appropriate fields
         * next, create rules which allow read/write permission
         */
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
        return new Promise(async (res, rej) => {
            const response = await fetch(uri)
            const file = await response.blob()

            const path =
                file.type === 'image/jpeg'
                    ? `photo/${this.uid}/${this.timestamp}.jpg`
                    : `photo/${this.uid}/${this.timestamp}.png`

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
