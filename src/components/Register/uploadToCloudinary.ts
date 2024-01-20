const uploadImageToCloudinary = async (imageFile: File, imageName: string, imagePath: string) => {
    const uploadPreset = import.meta.env.VITE_APP_CLOUDINARY_UPLOAD_PRESET
    const cloudName = import.meta.env.VITE_APP_CLOUDINARY_CLOUD_NAME
    try {
        const formData = new FormData()
        formData.append('file', imageFile)
        formData.append('upload_preset', uploadPreset) // Replace with your upload preset name
        formData.append('public_id', `${imagePath}/${imageName}`) // Specify a path and name

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            {
                method: 'POST',
                body: formData,
            }
        )

        if (!response.ok) {
            return null
        }

        const responseData = await response.json()
        return responseData.secure_url // Return the secure URL of the uploaded image
    } catch (error) {
        console.error('Error uploading image:', error)
        return null
    }
}

export default uploadImageToCloudinary