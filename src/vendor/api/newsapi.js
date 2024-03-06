export function topHeadlinesURL(country = "id") {
  const url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${
    import.meta.env.VITE_NEWS_API_KEY
  }`;

  return url;
}

export function allNewsURL(query, page = 1, limit = 12) {
  // pageSize is limit
  const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${
    import.meta.env.VITE_NEWS_API_KEY
  }&pageSize=${limit}&page=${page}`;

  return url;
}
