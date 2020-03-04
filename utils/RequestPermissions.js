import Constants from 'expo-constants'
import * as Permisstions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'

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
        } else if (Constants.platform.android) {
            const { status } = await Permisstions.askAsync(Permisstions.CAMERA)

            if (status != 'granted') {
                alert('We need permission to access your camera')
            }
        } else if (Constants.platform.web) {
            console.log('Web not implement yet')
        }
    }

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3]
        })

        if (!result.cancelled) {
            return result.uri
        }

        return null
    }
}

RequestPermission.shared = new RequestPermission()
export default RequestPermission
