'use server'

import axios from "axios";

export default async function ApiYoutube(query, maxResults) {
    const API_KEY = process.env.API_KEY_YOUTUBE;
    const API_URL = 'https://www.googleapis.com/youtube/v3/search';

    try {
        const response = await axios.get(`${API_URL}?part=snippet&maxResults=${maxResults}&q=${query}&type=video&key=${API_KEY}`);
        console.log(response.data)
    } catch (error) {
        console.error('Erro ao chamar API do YouTube:', error);
        throw error;
    }
}

/*
const lista = response.data.items.map(item => ({
            nome: item.snippet.title,
            caminho: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            artista: item.snippet.channelTitle,
            thumb: item.snippet.thumbnails.default.url
        }));

        return lista;
*/