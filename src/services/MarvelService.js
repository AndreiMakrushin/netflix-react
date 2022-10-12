


class MarvelService{
    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok){
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

    getAllCharacters = async () =>{
        const res = await this.getResource('https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=210&apikey=10665551059b31f0791740a3f5626a4e');
        return res.data.results.map(this._transformCharacter());
    }

    getCharacter = async (id) =>{
        const res = await this.getResource(`https://gateway.marvel.com:443/v1/public/characters/${id}?apikey=10665551059b31f0791740a3f5626a4e`);
        return this._transformCharacter(res.data.results[0])
    }
    _transformCharacter = (char) =>{

        return{
            name: char.name,
            description: char.description ? `${char.description.slice(0,210)}`: 'Нет описания',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url
        }
    }
}

export default MarvelService;