export function topHeadlinesURL(country = "id") {
  const url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${
    import.meta.env.VITE_NEWS_API_KEY
  }`;

  return url;
}

export function allNewsURL(query) {
  const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${
    import.meta.env.VITE_NEWS_API_KEY
  }`;

  return url;
}
