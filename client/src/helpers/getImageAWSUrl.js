const getImageAWSUrl = async (file) => {
  // get secure url from our server
  const { url } = await fetch(`/api/s3/s3url/${file.name}`).then((res) => res.json());
  // post the image directly to s3 bucket
  const response = await fetch(url, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': ['image/svg+xml', 'image/jpg', 'image/JPG', 'image/jpeg', 'image/JPEG', 'image/png', 'image/PNG', 'image/gif', 'image/GIF'],
    },
  });
  return response;
};

export default getImageAWSUrl;
