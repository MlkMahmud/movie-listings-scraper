export const movieAlreadyExists = async (collection, { title }) => {
  try {
    const results = await collection.find({ $text: { $search: title } });
    if (results.length > 0) {
      return true;
    }
    return false;
  } catch (e) {
    console.error(e);
    return e;
  }
};

export const appendMovieShowtimes = async (collection, { title }, showtimes) => {
  try {
    await collection.updateOne({ title }, { $push: { showtimes: { $each: showtimes } } });
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const addNewMovie = async (collection, movie) => {
  try {
    await collection.create(movie);
    return true;
  } catch (e) {
    console.error(e);
    return e;
  }
};

export const seedDB = async (collection, movies = []) => {
  try {
    await collection.insertMany(movies);
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const flushDB = async (collection) => {
  try {
    await collection.deleteMany({});
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
};

export const delay = (ms) => (
  new Promise((resolve) => {
    setTimeout(() => resolve(), ms);
  })
);


export const retry = async (fn, attempts = 3, wait = 5000) => {
  try {
    const response = await fn();
    return response;
  } catch (e) {
    if (attempts <= 1) {
      throw Error(e);
    }
    await delay(wait);
    return retry(fn, attempts - 1);
  }
};
