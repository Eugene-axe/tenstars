export default async function(fd) {
  const imgbantoken = process.env.IMG_BAN_TOKEN;

  const response = await fetch('https://api.imageban.ru/v1', {
    headers: {
      Authorization: `TOKEN ${imgbantoken}`
    },
    method: 'POST',
    body: fd
  });
  return await response.json();
}
