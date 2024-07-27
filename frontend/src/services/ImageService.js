export const uploadImageHandler = async (files, folder, token) => {
    try {
      const imageFormData = new FormData();
      for (let i = 0; i < files.length; i++) {
        imageFormData.append('images', files[i]);
      }
      imageFormData.append('folder', folder);
  
      const imageResponse = await fetch('https://eatwave-api.onrender.com/upload-image', {
        method: 'POST',
        headers: {
          'Authorization': token ? `Bearer ${token}` : ''
        },
        body: imageFormData
      });
  
      if (!imageResponse.ok) {
        throw new Error("Can't save image, try again later");
      }
  
      const imageResult = await imageResponse.json();
      return imageResult.imageUrls; 
    } 
    catch (err) {
      console.log(err); 
      throw new Error("Image upload failed");
    }
  };
  
  export const deleteImageHandler = async(previousImageUrl, token) => {
    if(previousImageUrl){
        //Splitting along '/'
        const urlParts = previousImageUrl.split('/');
        //PublicId with file extension
        let publicIdWithExtension = urlParts.pop(); 
        //Removing file extension
        const publicId = publicIdWithExtension.split('.').slice(0, -1).join('.');
            await fetch('https://eatwave-api.onrender.com/delete-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token? `Bearer ${token}`: ''
                },
                body: JSON.stringify({ public_id: publicId })
            })
        }
  }