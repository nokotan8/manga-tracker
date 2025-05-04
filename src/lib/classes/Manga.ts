class Manga {
    titleEN: string;
    genres: string[];
    authorEN: string;
    status: string;
    numVols: number;
    numChaps: number;
    titleJP?: string;
    authorJP?: string;
    constructor(
        titleEN: string,
        authorEN: string,
        genres: string[],
        status: string,
        numVols: number,
        numChaps: number,
        titleJP?: string,
        authorJP?: string,
    ) {
        this.titleEN = titleEN;
        this.titleJP = titleJP;
        this.genres = genres;
        this.authorEN = authorEN;
        this.authorJP = authorJP;
        this.status = status;
        this.numVols = numVols;
        this.numChaps = numChaps;
    }
}

class UserManga extends Manga {
    currVols: number;
    currChaps: number;
    lists: string[];
    rating?: number;
    constructor(
        titleEN: string,
        genres: string[],
        authorEN: string,
        status: string,
        numVols: number,
        numChaps: number,
        currVols: number,
        currChaps: number,
        lists: string[],
        titleJP?: string,
        authorJP?: string,
        rating?: number,
    ) {
        super(
            titleEN,
            authorEN,
            genres,
            status,
            numVols,
            numChaps,
            titleJP,
            authorJP,
        );
        this.rating = rating;
        this.currVols = currVols;
        this.currChaps = currChaps;
        this.lists = lists;
    }
}

const testMangas: UserManga[] = [];
const testManga: UserManga = new UserManga(
    "horimiya",
    ["romance"],
    "idk",
    "finished",
    20,
    120,
    8,
    10,
    ["reading", "List 1", "List 2"],
    "ホリミヤ",
    "idk",
    8,
);

const testManga2: UserManga = new UserManga(
    "Frieren: Beyond Journey's End",
    ["adventure"],
    "idk",
    "ongoing",
    14,
    100,
    12,
    80,
    ["reading"],
    "葬送のフリーレン",
    "idk",
    10,
);
testMangas.push(testManga, testManga2);
for (let i = 0; i < 30; i++) {
    testMangas.push(testManga);
}

export { Manga, UserManga, testMangas };
