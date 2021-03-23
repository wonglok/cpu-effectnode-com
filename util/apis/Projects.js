export const create = async ({ userID, displayName, ...data }) => {
  if (!userID) {
    throw new Error("cannot create without userID");
  }

  if (!displayName) {
    throw new Error("cannot create without displayName");
  }

  let res = fetch("/api/app/projects/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userID,
      displayName,
      ...data,
    }),
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  }).then((e) => e.json());

  return res;
};

/*
const formData = new FormData();
const photos = document.querySelector('input[type="file"][multiple]');

formData.append('title', 'My Vegas Vacation');
for (let i = 0; i < photos.files.length; i++) {
  formData.append('photos', photos.files[i]);
}

fetch('https://example.com/posts', {
  headers: {
    "Content-Type": "multipart/form-data",
  },
  method: 'POST',
  body: formData,
})
.then(response => response.json())
*/
