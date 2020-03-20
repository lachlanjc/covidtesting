import fetch from 'isomorphic-unfetch'

export const getJSON = url => fetch(url).then(r => r.json())
