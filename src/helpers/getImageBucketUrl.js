const getImageBucketUrl = async (file) => {
  // get secure url from our server
  const response = await fetch(`${process.env.REACT_APP_PORTFOLIO_SERVER}/api/bucket/bucketurl`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fileName: file.name }),
  });

  // grab raw text first so you can debug non-JSON responses
  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : {};
  } catch (e) {
    console.error('Failed to parse JSON from server response:', text);
    throw new Error(`Invalid JSON response from server: ${text}`);
  }
  if (!response.ok) {
    console.error('Server returned error:', response.status, data);
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }
  // post the image directly to supabase bucket
  const contenttype = file.name.split('.').pop() === 'svg' ? 'image/svg+xml' : 'image/*';
  const respBucket = await fetch(data.signedUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': contenttype,
    },
  });
  return respBucket;
};

export default getImageBucketUrl;
