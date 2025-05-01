class Manga {
    nameEN: string;
    genres: string[];
    authorEN: string;
    status: string;
    numVols: number;
    numChaps: number;
    nameJP?: string;
    authorJP?: string;
    constructor(
        nameEN: string,
        authorEN: string,
        genres: string[],
        status: string,
        numVols: number,
        numChaps: number,
        nameJP?: string,
        authorJP?: string,
    ) {
        this.nameEN = nameEN;
        this.nameJP = nameJP;
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
        nameEN: string,
        genres: string[],
        authorEN: string,
        status: string,
        numVols: number,
        numChaps: number,
        currVols: number,
        currChaps: number,
        lists: string[],
        nameJP?: string,
        authorJP?: string,
        rating?: number,
    ) {
        super(
            nameEN,
            authorEN,
            genres,
            status,
            numVols,
            numChaps,
            nameJP,
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
    ["Reading", "List 1", "List 2"],
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
    ["Reading"],
    "葬送のフリーレン",
    "idk",
    10,
);
testMangas.push(testManga, testManga2);
for (let i = 0; i < 20; i++) {
    testMangas.push(testManga);
}

export { Manga, UserManga, testMangas };
