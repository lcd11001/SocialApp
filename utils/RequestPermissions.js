import Constants from 'expo-constants'
import * as Permisstions from 'expo-permissions'

class RequestPermission {
    constructor() {
        console.log('RequestPermission')
    }

    getPhotoPermission = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permisstions.askAsync(
                Permisstions.CAMERA_ROLL
            )

            if (status != 'granted') {
                alert('We need permission to access your camera roll')
            }
        }

        else if (Constants.platform.android) {
            console.log('Android not implement yet')
        }

        else if (Constants.platform.web) {
            console.log('Web not implement yet')
        }
    }
}

RequestPermission.shared = new RequestPermission()
export default RequestPermission
