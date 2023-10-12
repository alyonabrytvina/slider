export interface BreedState {
  list: Breed[],
  selectedBreed: string | null,
}

export interface Breed {
  id: string;
  description: string;
  name: string;
  image: {
    url: string;
  }
}

export type BreedListResponse = Breed[];

type BreedUrl = { url: string };
export type BreedResponse = BreedUrl[];
