export const checkError = (json) => {
  if (json.isError) {
    return Promise.reject(json.message);
  } else {
    return json;
  }
};

export const makeJSON = (e) => {
  try {
    return e.json();
  } catch (e) {
    return Promise.reject("bad json");
  }
};

export const create = async ({
  userID,
  displayName = "Empty Project",
  ...data
}) => {
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
  })
    .then(makeJSON)
    .then(checkError);

  return res;
};

export const list = async ({
  userID,
  pageAt,
  perPage,
  published = undefined,
  search = undefined,
}) => {
  let res = fetch("/api/app/projects/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userID,
      pageAt,
      perPage,
      published,
      search,
    }),
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  })
    .then(makeJSON)
    .then(checkError);

  return res;
};

export const remove = async ({ _id, userID }) => {
  let res = fetch("/api/app/projects/remove", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id,
      userID,
    }),
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  })
    .then(makeJSON)
    .then(checkError);

  return res;
};

export const update = async ({ _id, updates, userID }) => {
  let res = fetch("/api/app/projects/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id,
      userID,
      updates,
    }),
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  })
    .then(makeJSON)
    .then(checkError);

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
