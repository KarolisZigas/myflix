export const ImdbButton = ({ imdb, image, text }: { imdb: string | null | undefined; image: string; text?: string }) => {
    if (!imdb) {
        return null;
    }

    return (
        <div style={{width: 50, height: 20}}>
            <a target="_blank" rel="noreferrer" href={`https://www.imdb.com/title/${imdb}`}>
                <img style={{width: '100%', height: '100%'}} src={image} alt={text} />
            </a>
            {text}
        </div>
      );
}