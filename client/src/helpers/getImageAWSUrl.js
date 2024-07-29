const getImageAWSUrl = async (file) => {
  // get secure url from our server
  const { url } = await fetch(`/api/s3/s3url/${file.name}`).then((res) => res.json());
  // post the image directly to s3 bucket
  const contenttype = file.name.split('.').pop() === 'svg' ? 'image/svg+xml' : 'image/*';
  const response = await fetch(url, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': contenttype
    },
  });
  return response;
};

export default getImageAWSUrl;

