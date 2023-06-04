export interface Root {
    results: Result[]
  }
  
  export interface Result {
    hits: any[]
    nbHits: number
    page: number
    nbPages: number
    hitsPerPage: number
    facets: Facets
    exhaustiveFacetsCount: boolean
    exhaustiveNbHits: boolean
    exhaustiveTypo: boolean
    exhaustive: Exhaustive
    query: string
    params: string
    index: string
    renderingContent: RenderingContent
    processingTimeMS: number
    processingTimingsMS: ProcessingTimingsMs
    serverTimeMS: number
  }
  
  export interface Facets {
    "facets.Category": FacetsCategory
  }
  
  export interface FacetsCategory {
    [key: string]: number;
  }
  
  export interface Exhaustive {
    facetsCount: boolean
    nbHits: boolean
    typo: boolean
  }
  
  export interface RenderingContent {}
  
  export interface ProcessingTimingsMs {
    afterFetch: AfterFetch
    fetch: Fetch
    getIdx: GetIdx
    request: Request
    total: number
  }
  
  export interface AfterFetch {
    dedupFacets: number
    total: number
  }
  
  export interface Fetch {
    total: number
  }
  
  export interface GetIdx {
    load: Load
    total: number
  }
  
  export interface Load {
    total: number
  }
  
  export interface Request {
    roundTrip: number
  }
  