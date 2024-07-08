import axios from 'axios';

export default async function conversor(videoId) {
    try {
        const response = await axios.post(
            'https://mp3-player-back.vercel.app/teste', // Corrigido o caminho do endpoint
            {
                videoUrl: videoId
            },
            {
                responseType: 'arraybuffer'
            }
        );

        const blob = new Blob([response.data], { type: 'audio/mpeg' });
        return URL.createObjectURL(blob);
        
    } catch (error) {
        console.log('Erro na requisição:', error);
        return null; // Trate o erro de acordo com sua lógica de aplicativo
    }
}